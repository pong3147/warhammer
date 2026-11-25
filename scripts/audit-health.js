#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 레드팀 헬스 체크 & 퍼징 스크립트 (Node.js 전용)
 * 목적: L3/L4 단계 완료 시 무작위 플레이·세이브 왕복 퍼징, 초장수 분포·명예 마감 탈출성,
 *      UI 포커스 위험 패턴 정적 스캔, 파일 크기 선제 경고를 3~5초 내 계측해
 *      iv_redteam_reviewer에게 객관적 실측 근거를 제공한다.
 * 실행: node scripts/audit-health.js [--lives=200]
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const livesFlag = process.argv.find((a) => a.startsWith("--lives="));
const FUZZ_LIVES = livesFlag ? Math.max(40, parseInt(livesFlag.split("=")[1], 10) || 200) : 200;
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

// Load scripts in exact index.html order
const html = readRel("index.html");
const scripts = [...html.matchAll(/<script\s+src="\.\/([^"]+)"><\/script>/g)].map((m) => m[1]);

const warningsCaught = [];
const origWarn = console.warn;
console.warn = (...args) => {
  warningsCaught.push(args.join(" "));
};

global.window = global;
for (const s of scripts) {
  if (s === "js/ui.js") continue;
  require(path.join(ROOT, s));
}

const DATA = global.IMPERIUM_DATA;
const Engine = global.ImperiumEngine;

console.log(`=== IMPERIALIS VITA — RED-TEAM HEALTH & FUZZ REPORT (${FUZZ_LIVES} lives) ===`);

// 1. Random play + save/migrate roundtrip fuzzing
let crashes = 0;
let softlocks = 0;
let migrateFailures = 0;
let maxJsonBytes = 0;
let totalJsonBytes = 0;
let jsonSamples = 0;
let age300Plus = 0;
let age500Plus = 0;
let age1000Plus = 0;
let age500Retireable = 0;
let maxAgeSeen = 0;
const ages = [];

for (let i = 0; i < FUZZ_LIVES; i++) {
  try {
    let st = Engine.createCharacter({ mode: "random" });
    const focusKeys = Object.keys(Engine.FOCUSES);
    st.focus = focusKeys[Math.floor(Math.random() * focusKeys.length)];

    let steps = 0;
    while (st.alive && steps < 3600) {
      steps++;
      if (steps % 12 === 0 && Math.random() < 0.35) {
        st.focus = focusKeys[Math.floor(Math.random() * focusKeys.length)];
      }
      if (steps % 7 === 0) {
        const serialized = JSON.stringify(st);
        const bytes = Buffer.byteLength(serialized, "utf8");
        if (bytes > maxJsonBytes) maxJsonBytes = bytes;
        totalJsonBytes += bytes;
        jsonSamples++;
        const restored = Engine.migrateState(JSON.parse(serialized));
        if (!restored || restored.id !== st.id || restored.saveVersion !== Engine.SAVE_VERSION) {
          migrateFailures++;
        } else {
          st = restored;
        }
      }

      // Occasionally take random open career change
      if (steps % 9 === 0 && !st.pendingEvent) {
        const opts = Engine.getContextualOptions(st);
        if (opts.unlockedCareers.length > 0 && Math.random() < 0.45) {
          const pickC = opts.unlockedCareers[Math.floor(Math.random() * opts.unlockedCareers.length)];
          Engine.attemptCareerChange(st, pickC.id);
        }
      }

      if (st.alive && !st.pendingEvent) {
        Engine.advanceQuarter(st);
      }

      let guard = 0;
      while (st.alive && st.pendingEvent && guard < 12) {
        guard++;
        const choices = st.pendingEvent.choices || [];
        const validIdx = [];
        for (let ci = 0; ci < choices.length; ci++) {
          if (Engine.checkReq(st, choices[ci].req)) validIdx.push(ci);
        }
        if (validIdx.length === 0) {
          softlocks++;
          st.pendingEvent = null;
          break;
        }
        const chosen = validIdx[Math.floor(Math.random() * validIdx.length)];
        Engine.resolvePendingChoice(st, chosen);
      }
    }

    ages.push(st.age);
    if (st.age > maxAgeSeen) maxAgeSeen = st.age;
    if (st.age >= 300) age300Plus++;
    if (st.age >= 500) {
      age500Plus++;
      if (!st.alive || Engine.canRetireHonorably(st).ok) age500Retireable++;
    }
    if (st.age >= 1000) age1000Plus++;
  } catch (err) {
    crashes++;
    origWarn("[FUZZ CRASH]", err && err.stack ? err.stack : err);
  }
}

console.warn = origWarn;
ages.sort((a, b) => a - b);
const medAge = ages.length ? ages[Math.floor(ages.length / 2)] : 0;
const avgJsonKB = jsonSamples ? (totalJsonBytes / jsonSamples / 1024).toFixed(1) : "0.0";
const maxJsonKB = (maxJsonBytes / 1024).toFixed(1);

console.log(
  `[Fuzz] lives=${FUZZ_LIVES}, crashes=${crashes}, softlocks=${softlocks}, ` +
  `migrateFailures=${migrateFailures}, unknownIdWarnings=${warningsCaught.length}`
);
console.log(
  `[Longevity] medAge=${medAge}, maxAge=${maxAgeSeen}, age300+=${age300Plus}, ` +
  `age500+=${age500Plus} (retireExitOK=${age500Retireable}/${age500Plus}), age1000+=${age1000Plus}`
);
console.log(`[SaveSize] avg=${avgJsonKB}KB, max=${maxJsonKB}KB (samples=${jsonSamples})`);

// 2. UI focus & a11y static risk scan
const uiSrc = readRel("js/ui.js");
const uiRisks = [];
if (!/lastCareersSignature/.test(uiSrc)) uiRisks.push("Missing lastCareersSignature guard in js/ui.js");
if (!/lastActionsSignature/.test(uiSrc)) uiRisks.push("Missing lastActionsSignature guard in js/ui.js");
if (!/insertAdjacentHTML\s*\(\s*["']afterbegin["']/.test(uiSrc)) uiRisks.push("renderRecentLogs not using incremental prepend");
if (/addEventListener\s*\(\s*["']keydown["']/.test(uiSrc)) {
  // Ensure no single-letter key shortcuts were introduced (only Escape/Tab allowed)
  const keyMatches = [...uiSrc.matchAll(/e\.key\s*===\s*["']([^"']+)["']/g)].map((m) => m[1]);
  const badKeys = keyMatches.filter((k) => k.length === 1 && /[a-zA-Z]/.test(k));
  if (badKeys.length) uiRisks.push(`Forbidden single-letter key shortcut(s) in js/ui.js: ${badKeys.join(", ")}`);
}
console.log(`[UI-A11y Static] risks=${uiRisks.length}${uiRisks.length ? " -> " + uiRisks.join(" | ") : " (OK)"}`);

// 3. File size proximity watch (>95KB events / >58KB chronicles)
const nearLimit = [];
for (const s of scripts) {
  if (!s.startsWith("data/events/") && !s.startsWith("data/chronicles/")) continue;
  const raw = readRel(s);
  const kb = Buffer.byteLength(raw, "utf8") / 1024;
  const lines = raw.split("\n").length;
  if (s.startsWith("data/events/") && (kb >= 95 || lines >= 1950)) {
    nearLimit.push(`${s} (${kb.toFixed(1)}KB, ${lines}L / limit 110KB·2200L)`);
  } else if (s.startsWith("data/chronicles/") && (kb >= 58 || lines >= 1200)) {
    nearLimit.push(`${s} (${kb.toFixed(1)}KB, ${lines}L / limit 70KB·1400L)`);
  }
}
console.log(`[Size Watch] nearLimit=${nearLimit.length}${nearLimit.length ? " -> " + nearLimit.join(" | ") : " (all comfortable)"}`);

if (crashes > 0 || softlocks > 0 || migrateFailures > 0 || warningsCaught.length > 0 || uiRisks.length > 0) {
  if (warningsCaught.length) {
    console.error("Unknown ID warnings:", [...new Set(warningsCaught)].slice(0, 10));
  }
  process.exit(1);
}
console.log("HEALTH CHECK PASSED (0 crashes, 0 softlocks, 0 migrate failures, 0 unknown-ID warnings, 0 UI a11y risks).");
