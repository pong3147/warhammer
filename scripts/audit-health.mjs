#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 레드팀 헬스 체크 · 결정론적 시드 퍼징 (ESM · Node.js 22+)
 * 목적: L3/L4 단계 완료 및 CI 실행 시 아래 3대 엔진/저장 축을 계측·검증한다.
 *      (행동형 UI 포커스·스크린 리더 접근성 테스트 10종+는 `npm test` Vitest + React Testing Library에서 수행)
 *      1. 결정론적 시드(--seed=) 기반 무작위 플레이(전직·자율행동·성간이동·세이브/마이그레이션 왕복·명예 마감 실실행)
 *      2. 저장 크기 상한(2,048KB), 500세+ 명예 마감 실탈출 100%, 비초인 필멸자 300세 이상치, 초인 오염 면역 불변식
 *      3. 파일 크기 용량 상한 근접 경고 (>95KB 사건 / >58KB 연대기)
 *
 * 사용법:
 *   node scripts/audit-health.mjs [--lives=200] [--seed=123456789]
 */
import fs from "node:fs";
import path from "node:path";
import { collectDirFiles, loadNodeImperiumRuntime, ROOT } from "./_loadNodeData.mjs";

const livesFlag = process.argv.find((a) => a.startsWith("--lives="));
const seedFlag = process.argv.find((a) => a.startsWith("--seed="));
const FUZZ_LIVES = livesFlag ? Math.max(40, parseInt(livesFlag.split("=")[1], 10) || 200) : 200;
const SEED = seedFlag
  ? (parseInt(seedFlag.split("=")[1], 10) >>> 0)
  : (((Date.now() & 0xffffffff) ^ ((process.pid * 2654435761) >>> 0)) >>> 0);

const MAX_SAVE_BYTES = 2 * 1024 * 1024;
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

function createMulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

Math.random = createMulberry32(SEED);

const warningsCaught = [];
const origWarn = console.warn;
console.warn = (...args) => {
  warningsCaught.push(args.join(" "));
};

const { DATA, Engine, coreFiles, eventFiles, chronFiles } = await loadNodeImperiumRuntime();

if (
  coreFiles.length === 0 ||
  eventFiles.length === 0 ||
  chronFiles.length === 0 ||
  !DATA.EVENTS.length ||
  !DATA.CHRONICLES.length
) {
  console.error(
    `HEALTH CHECK FAILED (empty runtime dataset: core=${coreFiles.length}, eventFiles=${eventFiles.length}, ` +
    `chronFiles=${chronFiles.length}, events=${DATA.EVENTS.length}, chronicles=${DATA.CHRONICLES.length}, ROOT=${ROOT})`
  );
  process.exit(1);
}

console.log(`=== IMPERIALIS VITA — RED-TEAM HEALTH & FUZZ REPORT (${FUZZ_LIVES} lives, ESM) ===`);
console.log(`[Seed] seed=${SEED} (repro: node scripts/audit-health.mjs --lives=${FUZZ_LIVES} --seed=${SEED})`);

let crashes = 0;
let softlocks = 0;
let migrateFailures = 0;
let incorruptibleCorrupted = 0;
let actionsExecuted = 0;
let travelsAttempted = 0;
let maxJsonBytes = 0;
let totalJsonBytes = 0;
let jsonSamples = 0;
let age300Plus = 0;
let age500Plus = 0;
let age1000Plus = 0;
let age500RetireExecutedOK = 0;
let age500RetireFailed = 0;
let mortalOver300 = 0;
let maxAgeSeen = 0;
let logCharSum = 0;
let logCharSamples = 0;
let maxLogChars = 0;
let maxAdultQuietQ = 0;
let maxQuietCareer = "none";
let maxQuietAge = 0;
let namedSpotlightEvents = 0;
let repeatSpotlightEvents = 0;
let missingPrevMetSpotlights = 0;
let maxSpotlightCards = 0;
let timelineMultiSpotlights = 0;
const ages = [];

// addLog uses state.logs.unshift(...), so newest entries sit at index 0 up to prevTop
const sampleNewLogs = (st, prevTop) => {
  const logs = st.logs || [];
  for (let li = 0; li < logs.length; li++) {
    if (logs[li] === prevTop) break;
    const txt = (logs[li] && typeof logs[li].text === "string") ? logs[li].text : "";
    if (!txt) continue;
    logCharSum += txt.length;
    logCharSamples++;
    if (txt.length > maxLogChars) maxLogChars = txt.length;
  }
};

for (let i = 0; i < FUZZ_LIVES; i++) {
  try {
    let st = Engine.createCharacter({ mode: "random" });
    const focusKeys = Object.keys(Engine.FOCUSES);
    st.focus = focusKeys[Math.floor(Math.random() * focusKeys.length)];
    let testedRetireAt500 = false;
    let quietStreak = 0;

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

      if (steps % 9 === 0 && !st.pendingEvent) {
        const opts = Engine.getContextualOptions(st);
        if (opts.unlockedCareers.length > 0 && Math.random() < 0.4) {
          const pickC = opts.unlockedCareers[Math.floor(Math.random() * opts.unlockedCareers.length)];
          Engine.attemptCareerChange(st, pickC.id);
        }
        if (st.alive && !st.pendingEvent) {
          const playableActions = (opts.actions || []).filter((a) => a.id !== "retire_honorable");
          if (playableActions.length > 0 && Math.random() < 0.35) {
            const pickA = playableActions[Math.floor(Math.random() * playableActions.length)];
            const actRes = Engine.performAction(st, pickA.id);
            if (actRes && actRes.ok) actionsExecuted++;
          }
        }
        if (
          st.alive &&
          !st.pendingEvent &&
          opts.travelProfile &&
          opts.travelProfile.canAttempt &&
          opts.travelWorlds.length > 0 &&
          Math.random() < 0.2
        ) {
          const pickW = opts.travelWorlds[Math.floor(Math.random() * opts.travelWorlds.length)];
          Engine.performAction(st, "travel", pickW.id);
          travelsAttempted++;
        }
      }

      if (st.alive && !st.pendingEvent && st.age >= 500 && !testedRetireAt500) {
        testedRetireAt500 = true;
        const clone = Engine.migrateState(JSON.parse(JSON.stringify(st)));
        const openRes = Engine.performAction(clone, "retire_honorable");
        if (openRes && openRes.ok && clone.pendingEvent && clone.pendingEvent.isHonorableEnding) {
          Engine.resolvePendingChoice(clone, 0);
          if (!clone.alive && clone.finalGrade && clone.finalGrade.rank) {
            age500RetireExecutedOK++;
          } else {
            age500RetireFailed++;
          }
        } else {
          age500RetireFailed++;
        }
      }

      if (st.alive && !st.pendingEvent) {
        const prevTop = (st.logs && st.logs[0]) || null;
        Engine.advanceQuarter(st);
        sampleNewLogs(st, prevTop);
        if (st.age >= 14 && st.age <= 100) {
          if (st.pendingEvent) {
            quietStreak = 0;
          } else {
            quietStreak++;
            if (quietStreak > maxAdultQuietQ) {
              maxAdultQuietQ = quietStreak;
              maxQuietCareer = st.careerId;
              maxQuietAge = st.age;
            }
          }
        }
      }

      let guard = 0;
      while (st.alive && st.pendingEvent && guard < 12) {
        guard++;
        const ev = st.pendingEvent;
        const evChars = Array.isArray(ev.characters) ? ev.characters : [];
        if (evChars.length > 0) {
          namedSpotlightEvents++;
          if (evChars.length > maxSpotlightCards) maxSpotlightCards = evChars.length;
          if (ev.isTimeline && evChars.length > 1) timelineMultiSpotlights++;
          if (!Array.isArray(ev.previouslyMetCharacters)) {
            missingPrevMetSpotlights++;
          } else if (evChars.every((cid) => ev.previouslyMetCharacters.includes(cid))) {
            repeatSpotlightEvents++;
          }
        }
        const choices = ev.choices || [];
        const validIdx = [];
        for (let ci = 0; ci < choices.length; ci++) {
          if (Engine.checkReq(st, choices[ci].req)) validIdx.push(ci);
        }
        if (validIdx.length === 0) {
          softlocks++;
          st.pendingEvent = null;
          break;
        }
        const prevTop = (st.logs && st.logs[0]) || null;
        const chosen = validIdx[Math.floor(Math.random() * validIdx.length)];
        Engine.resolvePendingChoice(st, chosen);
        sampleNewLogs(st, prevTop);
      }

      if ((st.tags.includes("custodes") || st.tags.includes("grey_knight") || st.tags.includes("living_saint")) && st.corruption > 0) {
        incorruptibleCorrupted++;
      }
    }

    ages.push(st.age);
    if (st.age > maxAgeSeen) maxAgeSeen = st.age;
    if (st.age >= 300) {
      age300Plus++;
      const hasLongevity = ["astartes", "custodes", "grey_knight", "daemon_prince", "dreadnought", "rejuvenat", "bionic", "transhuman", "navigator", "living_saint"]
        .some((t) => st.tags.includes(t));
      if (!hasLongevity) mortalOver300++;
    }
    if (st.age >= 500) {
      age500Plus++;
      if (!testedRetireAt500) {
        if (!st.alive) {
          age500RetireExecutedOK++;
        } else {
          const clone = Engine.migrateState(JSON.parse(JSON.stringify(st)));
          clone.pendingEvent = null;
          const openRes = Engine.performAction(clone, "retire_honorable");
          if (openRes && openRes.ok && clone.pendingEvent) {
            Engine.resolvePendingChoice(clone, 0);
            if (!clone.alive && clone.finalGrade) age500RetireExecutedOK++;
            else age500RetireFailed++;
          } else {
            age500RetireFailed++;
          }
        }
      }
    }
    if (st.age >= 1000) age1000Plus++;
  } catch (err) {
    crashes++;
    origWarn("[FUZZ CRASH]", err && err.stack ? err.stack : err);
  }
}

// Stage 19-C: Deterministic listening & ending-parity probes for Stage 17-18 apex high-rank careers
const FORBIDDEN_SYM_RE = /[★↗←✓↑↓]/;
const apexSpecs = [
  { careerId: "master_of_administratum", worldId: "terra", originId: "terra_high_blood", gender: "female", age: 65, tags: ["administratum", "high_lord_terra"], expectedKey: "imperial_standard" },
  { careerId: "living_saint", worldId: "ophelia7", originId: "ecclesiarchy_novice", gender: "female", age: 65, tags: ["living_saint", "saint_mercy_aspect"], expectedKey: "living_saint" },
  { careerId: "knight_high_king", worldId: "generic_knight", originId: "knight_house", gender: "female", age: 100, tags: ["imperial_knight", "knight_high_king"], expectedKey: "imperial_knight" },
  { careerId: "nav_novator", worldId: "terra", originId: "navigator_house", gender: "male", age: 100, tags: ["navigator", "nav_novator"], expectedKey: "navis_navigator" },
  { careerId: "paternoval_envoy", worldId: "terra", originId: "navigator_house", gender: "male", age: 65, tags: ["navigator", "paternoval_envoy", "high_lord_terra"], expectedKey: "navis_navigator" },
  { careerId: "grand_master_of_assassins", worldId: "terra", originId: "schola_progenium", gender: "male", age: 65, tags: ["assassin", "clade_vindicare", "grand_master_assassins", "high_lord_terra"], expectedKey: "officio_assassinorum" },
  { careerId: "fabricator_general", worldId: "mars", originId: "mechanicus_menial", gender: "male", age: 65, tags: ["mechanicus", "magos", "fabricator_general", "high_lord_terra"], expectedKey: "mechanicus" },
  { careerId: "custodes_captain_general", worldId: "terra", originId: "terra_high_blood", gender: "male", age: 65, tags: ["custodes", "captain_general", "high_lord_terra"], expectedKey: "custodes" }
];
let apexProbesOK = 0;
let apexProbeFailures = 0;
const apexProbeIssues = [];
for (const spec of apexSpecs) {
  const p = Engine.createCharacter({
    mode: "custom",
    worldId: spec.worldId,
    originId: spec.originId,
    traitId: "none",
    eraId: "indomitus",
    gender: spec.gender
  });
  p.age = spec.age;
  p.year = p.birthYear + spec.age;
  p.careerId = spec.careerId;
  p.tags = [...new Set([...p.tags, ...spec.tags])];
  const summary = Engine.buildStatusSummary(p);
  const fKey = Engine.resolveFactionEndingKey(p);
  const canRet = Engine.canRetireHonorably(p);
  const honEv = Engine.createHonorableEndingEvent(p);
  const grade = Engine.evaluateLifeGrade(p);
  const combined = `${summary} ${honEv.title} ${honEv.text} ${grade.rank} ${grade.title} ${grade.verdict}`;
  const issues = [];
  if (Engine.getCareer(spec.careerId).id !== spec.careerId) issues.push(`unknownCareer=${spec.careerId}`);
  if (!summary || summary.length > 320) issues.push(`summaryLen=${summary ? summary.length : 0}`);
  if (fKey !== spec.expectedKey) issues.push(`factionKey=${fKey}!=${spec.expectedKey}`);
  if (!canRet || !canRet.ok) issues.push(`canRetireHonorably=false`);
  if (!honEv || !honEv.choices || honEv.choices.length < 2) issues.push(`honorableChoices<2`);
  if (!grade || !grade.rank || !grade.title || !grade.verdict) issues.push(`missingGrade`);
  if (/undefined|NaN/.test(combined) || FORBIDDEN_SYM_RE.test(combined)) issues.push(`dirtyText`);
  if (issues.length === 0) {
    apexProbesOK++;
  } else {
    apexProbeFailures++;
    apexProbeIssues.push(`${spec.careerId}: ${issues.join(", ")}`);
  }
}

console.warn = origWarn;
ages.sort((a, b) => a - b);
const medAge = ages.length ? ages[Math.floor(ages.length / 2)] : 0;
const avgJsonKB = jsonSamples ? (totalJsonBytes / jsonSamples / 1024).toFixed(1) : "0.0";
const maxJsonKB = (maxJsonBytes / 1024).toFixed(1);
const avgLogChars = logCharSamples ? (logCharSum / logCharSamples).toFixed(1) : "0.0";
const saveCapExceeded = maxJsonBytes > MAX_SAVE_BYTES;

console.log(
  `[Fuzz] lives=${FUZZ_LIVES}, crashes=${crashes}, softlocks=${softlocks}, ` +
  `migrateFailures=${migrateFailures}, unknownIdWarnings=${warningsCaught.length}, ` +
  `incorruptibleLeaks=${incorruptibleCorrupted}, actions=${actionsExecuted}, travels=${travelsAttempted}`
);
console.log(
  `[Longevity] medAge=${medAge}, maxAge=${maxAgeSeen}, age300+=${age300Plus}, ` +
  `age500+=${age500Plus} (retireExecOK=${age500RetireExecutedOK}/${age500Plus}, fail=${age500RetireFailed}), ` +
  `age1000+=${age1000Plus}, mortalOver300=${mortalOver300}`
);
console.log(
  `[Listening Rhythm] avgLogChars=${avgLogChars}, maxLogChars=${maxLogChars}, maxAdultQuietQ=${maxAdultQuietQ}(${maxQuietCareer}@${maxQuietAge}), ` +
  `namedSpotlights=${namedSpotlightEvents}(repeat=${repeatSpotlightEvents}, missingPrevMet=${missingPrevMetSpotlights}), maxSpotlightCards=${maxSpotlightCards}, ` +
  `timelineMultiSpotlights=${timelineMultiSpotlights}, apexProbesOK=${apexProbesOK}/${apexSpecs.length}`
);
console.log(
  `[SaveSize] avg=${avgJsonKB}KB, max=${maxJsonKB}KB / limit ${(MAX_SAVE_BYTES / 1024).toFixed(0)}KB ` +
  `(samples=${jsonSamples})${saveCapExceeded ? " [EXCEEDED!]" : ""}`
);

const engineFiles = collectDirFiles("src/engine", [".js"]);
const nearLimit = [];
for (const s of [...coreFiles, "src/data/glossary.js", ...eventFiles, ...chronFiles, ...engineFiles]) {
  if (!fs.existsSync(path.join(ROOT, s))) continue;
  const raw = readRel(s);
  const kb = Buffer.byteLength(raw, "utf8") / 1024;
  const lines = raw.split("\n").length;
  if (s.startsWith("src/data/chronicles/")) {
    if (kb >= 58 || lines >= 1200) {
      nearLimit.push(`${s} (${kb.toFixed(1)}KB, ${lines}L / limit 70KB·1400L)`);
    }
  } else if (kb >= 95 || lines >= 1950) {
    nearLimit.push(`${s} (${kb.toFixed(1)}KB, ${lines}L / limit 110KB·2200L)`);
  }
}
console.log(`[Size Watch] nearLimit=${nearLimit.length}${nearLimit.length ? " -> " + nearLimit.join(" | ") : " (all comfortable)"}`);

const hardFailures = [];
if (crashes > 0) hardFailures.push(`crashes=${crashes}`);
if (softlocks > 0) hardFailures.push(`softlocks=${softlocks}`);
if (migrateFailures > 0) hardFailures.push(`migrateFailures=${migrateFailures}`);
if (warningsCaught.length > 0) hardFailures.push(`unknownIdWarnings=${warningsCaught.length}`);
if (incorruptibleCorrupted > 0) hardFailures.push(`incorruptibleLeaks=${incorruptibleCorrupted}`);
if (age500RetireFailed > 0) hardFailures.push(`retireExecFailed=${age500RetireFailed}`);
if (mortalOver300 > 0) hardFailures.push(`mortalOver300=${mortalOver300}`);
if (saveCapExceeded) hardFailures.push(`maxSaveSize=${maxJsonKB}KB > 2048KB`);
if (timelineMultiSpotlights > 0) hardFailures.push(`timelineMultiSpotlights=${timelineMultiSpotlights}`);
if (missingPrevMetSpotlights > 0) hardFailures.push(`missingPrevMetSpotlights=${missingPrevMetSpotlights}`);
if (maxSpotlightCards > 2) hardFailures.push(`maxSpotlightCards=${maxSpotlightCards} > 2`);
if (apexProbeFailures > 0) hardFailures.push(`apexProbeFailures=${apexProbeFailures} (${apexProbeIssues.join("; ")})`);

if (hardFailures.length > 0) {
  if (warningsCaught.length) {
    console.error("Unknown ID warnings:", [...new Set(warningsCaught)].slice(0, 10));
  }
  console.error(`HEALTH CHECK FAILED (${hardFailures.join(", ")}) — repro: node scripts/audit-health.mjs --lives=${FUZZ_LIVES} --seed=${SEED}`);
  process.exit(1);
}
console.log(
  `HEALTH CHECK PASSED (seed=${SEED}, 0 crashes, 0 softlocks, 0 migrate failures, 0 unknown-ID warnings, ` +
  `0 incorruptible leaks, retireExec=${age500RetireExecutedOK}/${age500Plus}, maxSpotlight=${maxSpotlightCards}, ` +
  `apexProbes=${apexProbesOK}/${apexSpecs.length}, maxSave=${maxJsonKB}KB<=2048KB).`
);
