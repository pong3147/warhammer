#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 상설 자동 QA 검증 스위트 (Node.js 전용)
 * 브라우저(index.html)에는 로드되지 않으며, AGENTS.md 6장 6대 게이트 및 확장 불변 조건을 검증한다.
 * 실행:
 *   node scripts/qa.js                  # 기본 6대 게이트 + 300생애 시뮬레이션 (5초점 x 60)
 *   node scripts/qa.js --deep           # 6대 게이트 + Gate 7(전직 그래프 모순 · 전수 합성 도달성 · 1,500생애 심층 감사)
 *   node scripts/qa.js --deep --lives=N # --deep 정적 감사 + 초점당 N생애(총 6xN생애) 맞춤형 밸런스 감사
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DEEP_MODE = process.argv.includes("--deep");
const livesFlag = process.argv.find((a) => a.startsWith("--lives="));
const CUSTOM_LIVES_PER_FOCUS = livesFlag ? Math.max(10, parseInt(livesFlag.split("=")[1], 10) || 0) : 0;
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

const errors = [];
const warnings = [];
const fail = (gate, msg) => errors.push(`[Gate ${gate}] ${msg}`);

console.log(
  `=== 1 / QUADRILLION : IMPERIALIS VITA — QA Regression Suite${DEEP_MODE ? " [DEEP MODE]" : ""} ===`
);

// ============================================================================
// Gate 1: index.html 스크립트 실존 · 로드 순서 · 고아 파일 · 구문 · 크기 상한 · CSS 확인
// ============================================================================
const html = readRel("index.html");
const scripts = [...html.matchAll(/<script\s+src="\.\/([^"]+)"><\/script>/g)].map((m) => m[1]);
const scriptSet = new Set(scripts);

function collectDirJs(relDir) {
  const abs = path.join(ROOT, relDir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  (function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile() && ent.name.endsWith(".js")) {
        out.push(path.relative(ROOT, full).split(path.sep).join("/"));
      }
    }
  })(abs);
  return out.sort();
}

const expectedPrefix = [
  "data/worlds.js",
  "data/origins.js",
  "data/careers.js",
  "data/chapters.js",
  "data/characters.js",
  "data/timeline.js",
  "data/tags.js"
];
expectedPrefix.forEach((p, idx) => {
  if (scripts[idx] !== p) fail(1, `Script order mismatch at index ${idx}: expected ${p}, got ${scripts[idx]}`);
});
if (scripts[scripts.length - 2] !== "js/engine.js" || scripts[scripts.length - 1] !== "js/ui.js") {
  fail(1, `Final scripts must be js/engine.js -> js/ui.js`);
}

// Check that all event scripts precede all chronicle scripts
let seenChronScript = false;
for (const s of scripts) {
  if (s.startsWith("data/chronicles/")) seenChronScript = true;
  else if (seenChronScript && s.startsWith("data/events/")) {
    fail(1, `Event script "${s}" appears after chronicle scripts in index.html`);
  }
}

// Orphan .js detection in data/events/ and data/chronicles/
const diskEventFiles = collectDirJs("data/events");
const diskChronFiles = collectDirJs("data/chronicles");
for (const f of [...diskEventFiles, ...diskChronFiles]) {
  if (!scriptSet.has(f)) {
    fail(1, `Unregistered orphan data file not loaded in index.html: ${f} (run: node scripts/sync-scripts.js)`);
  }
}

const EVENT_SIZE_WARN_KB = 110;
const EVENT_LINE_WARN = 2200;
const CHRON_SIZE_WARN_KB = 70;
const CHRON_LINE_WARN = 1400;
let maxEvKB = 0;
let maxChKB = 0;

for (const s of scripts) {
  const full = path.join(ROOT, s);
  if (!fs.existsSync(full)) {
    fail(1, `Missing script referenced in index.html: ${s}`);
    continue;
  }
  const rawSrc = fs.readFileSync(full, "utf8");
  try {
    new vm.Script(rawSrc, { filename: s });
  } catch (e) {
    fail(1, `Syntax error in ${s}: ${e.message}`);
  }
  const kb = Buffer.byteLength(rawSrc, "utf8") / 1024;
  const lineCount = rawSrc.split("\n").length;
  if (s.startsWith("data/events/")) {
    if (kb > maxEvKB) maxEvKB = kb;
    if (kb > EVENT_SIZE_WARN_KB || lineCount > EVENT_LINE_WARN) {
      warnings.push(`Large event file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines) — consider splitting/promoting`);
    }
  } else if (s.startsWith("data/chronicles/")) {
    if (kb > maxChKB) maxChKB = kb;
    if (kb > CHRON_SIZE_WARN_KB || lineCount > CHRON_LINE_WARN) {
      warnings.push(`Large chronicle file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines) — consider splitting/promoting`);
    }
  }
}

const cssSrc = readRel("styles.css");
if (/@import\s+url\(/i.test(cssSrc)) {
  fail(1, `Blocking @import still present in styles.css (should be <link> in index.html)`);
}
if (!/fonts\.googleapis\.com/.test(html)) {
  warnings.push("Google Fonts <link> not found in index.html");
}

console.log(
  `[Gate 1] Scripts verified (${scripts.length} files: ${diskEventFiles.length} events, ${diskChronFiles.length} chronicles; ` +
  `maxEv=${maxEvKB.toFixed(1)}KB, maxCh=${maxChKB.toFixed(1)}KB), orphans=0, syntax & CSS checked.`
);

// ============================================================================
// Gate 2: js/ui.js 모든 #id 셀렉터 DOM 존재 대조
// ============================================================================
const uiSrc = readRel("js/ui.js");
const uiIds = new Set([...uiSrc.matchAll(/\$\(\s*["']#([a-zA-Z0-9_-]+)/g)].map((m) => m[1]));
const htmlIds = new Set([...html.matchAll(/\bid="([a-zA-Z0-9_-]+)"/g)].map((m) => m[1]));
const uiDynIds = new Set([...uiSrc.matchAll(/\bid="([a-zA-Z0-9_-]+)"/g)].map((m) => m[1]));

for (const id of uiIds) {
  if (!htmlIds.has(id) && !uiDynIds.has(id)) {
    fail(2, `Missing DOM element #${id} referenced in js/ui.js`);
  }
}
console.log(`[Gate 2] UI #id parity verified (${uiIds.size} selectors checked).`);

// ============================================================================
// Gate 3: 나무위키 금지 구표기 · 장식 기호 금지 검사
// ============================================================================
const forbiddenTerms = [
  /어뎁투스/g,
  /아비테스/g,
  /어드미니스트라툼/g,
  /스콜라 프로게니움/g,
  /임페리움 상투스/g,
  /세그멘툼 퍼시피쿠스/g,
  /키카트릭스 말레딕툼/g,
  /배드압/g,
  /루그프트 휴론/g,
  /트라잔 발로리스/g,
  /워처스 액스/g,
  /로건 그림나르/g,
  /시기스문트/g,
  /라이온 엘'존슨/g,
  /더 록/g,
  /캣찬 데블/g,
  /스피드 프리크/g,
  /크리그 데스 코어/g,
  /발할란 빙하/g,
  /보스트로얀 장자/g,
  /타니스 제1유일/g
];
const forbiddenSymbols = /[★↗←✓↑↓]/g;

for (const f of [...scripts, "index.html"]) {
  const txt = readRel(f);
  for (const re of forbiddenTerms) {
    const m = txt.match(re);
    if (m) fail(3, `Forbidden spelling "${m[0]}" in ${f}`);
  }
  const sm = txt.match(forbiddenSymbols);
  if (sm) fail(3, `Forbidden decorative symbol "${[...new Set(sm)].join("")}" in ${f}`);
}
console.log(`[Gate 3] Naming standard & decorative symbol scan complete.`);

// ============================================================================
// Load data + engine into global.window (with per-file source tracking)
// ============================================================================
global.window = global;
const eventSourceByIndex = [];
const chronSourceByIndex = [];
for (const s of scripts) {
  if (s === "js/ui.js") continue;
  const prevE = (global.IMPERIUM_DATA && global.IMPERIUM_DATA.EVENTS ? global.IMPERIUM_DATA.EVENTS.length : 0);
  const prevC = (global.IMPERIUM_DATA && global.IMPERIUM_DATA.CHRONICLES ? global.IMPERIUM_DATA.CHRONICLES.length : 0);
  require(path.join(ROOT, s));
  const nowE = (global.IMPERIUM_DATA && global.IMPERIUM_DATA.EVENTS ? global.IMPERIUM_DATA.EVENTS.length : 0);
  const nowC = (global.IMPERIUM_DATA && global.IMPERIUM_DATA.CHRONICLES ? global.IMPERIUM_DATA.CHRONICLES.length : 0);
  for (let i = prevE; i < nowE; i++) eventSourceByIndex[i] = s;
  for (let i = prevC; i < nowC; i++) chronSourceByIndex[i] = s;
}
const DATA = global.IMPERIUM_DATA;
const Engine = global.ImperiumEngine;

console.log(
  `[Data] WORLDS=${DATA.WORLDS.length}, ORIGINS=${DATA.ORIGINS.length}, TRAITS=${DATA.TRAITS.length}, ` +
  `CAREERS=${DATA.CAREERS.length}, CHAPTERS=${DATA.CHAPTERS.length}, CHARACTERS=${DATA.CHARACTERS.length}, ` +
  `TIMELINE=${DATA.TIMELINE.length}, EVENTS=${DATA.EVENTS.length}, CHRONICLES=${DATA.CHRONICLES.length}`
);

// ============================================================================
// Gate 4: ID 중복 · 참조 무결성 · 미생산 태그 · TAG_LABELS · describeReq · 연표 정렬
// ============================================================================
const checkUnique = (arr, label, sourceList) => {
  const seen = new Map();
  arr.forEach((item, idx) => {
    const src = sourceList ? sourceList[idx] : null;
    if (!item || !item.id) fail(4, `Missing id in ${label}${src ? ` (${src})` : ""}`);
    else if (seen.has(item.id)) {
      const firstSrc = seen.get(item.id);
      fail(4, `Duplicate id "${item.id}" in ${label}${src ? ` (${firstSrc} vs ${src})` : ""}`);
    } else {
      seen.set(item.id, src || label);
    }
  });
};
checkUnique(DATA.WORLDS, "WORLDS");
checkUnique(DATA.ORIGINS, "ORIGINS");
checkUnique(DATA.TRAITS, "TRAITS");
checkUnique(DATA.CAREERS, "CAREERS");
checkUnique(DATA.CHAPTERS, "CHAPTERS");
checkUnique(DATA.CHARACTERS, "CHARACTERS");
checkUnique(DATA.TIMELINE, "TIMELINE");
checkUnique(DATA.EVENTS, "EVENTS", eventSourceByIndex);
checkUnique(DATA.CHRONICLES, "CHRONICLES", chronSourceByIndex);

// TIMELINE chronological order
for (let i = 1; i < DATA.TIMELINE.length; i++) {
  if (DATA.TIMELINE[i].year < DATA.TIMELINE[i - 1].year) {
    fail(4, `TIMELINE out of chronological order: ${DATA.TIMELINE[i - 1].id}(${DATA.TIMELINE[i - 1].year}) -> ${DATA.TIMELINE[i].id}(${DATA.TIMELINE[i].year})`);
  }
}

const worldIds = new Set(DATA.WORLDS.map((w) => w.id));
const careerIds = new Set(DATA.CAREERS.map((c) => c.id));
const chapterIds = new Set(DATA.CHAPTERS.map((c) => c.id));
const charIds = new Set(DATA.CHARACTERS.map((c) => c.id));
const segIds = new Set(Object.keys(DATA.SEGMENTA));
const focusIds = new Set(Object.keys(Engine.FOCUSES));
const tagLabels = Engine.TAG_LABELS;

const producedTags = new Set([
  "imperial_nihilus",
  "bionic",
  "rejuvenat",
  ...DATA.ORIGINS.flatMap((o) => o.tags || []),
  ...DATA.TRAITS.flatMap((t) => t.tags || []),
  ...DATA.CAREERS.flatMap((c) => (c.onJoin && c.onJoin.addTags) || []),
  ...DATA.CHAPTERS.map((ch) => `chapter_${ch.id}`),
  ...DATA.CHARACTERS.map((c) => `met_${c.id}`)
]);

function collectOutcomeTags(out) {
  if (!out) return;
  (out.addTags || []).forEach((t) => producedTags.add(t));
}
for (const ev of [...DATA.EVENTS, ...DATA.TIMELINE]) {
  for (const ch of (ev.choices || [])) {
    collectOutcomeTags(ch.effect);
    collectOutcomeTags(ch.outcome);
    collectOutcomeTags(ch.success);
    collectOutcomeTags(ch.fail);
  }
}

function validateReq(req, owner) {
  if (!req) return;
  (req.anyWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown world "${w}" in ${owner}`); });
  (req.anyHomeWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown homeWorld "${w}" in ${owner}`); });
  (req.excludeWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown excludeWorld "${w}" in ${owner}`); });
  (req.anyCareers || []).forEach((c) => { if (!careerIds.has(c)) fail(4, `Unknown career "${c}" in ${owner}`); });
  (req.anyPastCareers || []).forEach((c) => { if (!careerIds.has(c)) fail(4, `Unknown pastCareer "${c}" in ${owner}`); });
  (req.excludePastCareers || []).forEach((c) => { if (!careerIds.has(c)) fail(4, `Unknown excludePastCareer "${c}" in ${owner}`); });
  (req.anyChapters || []).forEach((c) => { if (!chapterIds.has(c)) fail(4, `Unknown chapter "${c}" in ${owner}`); });
  (req.excludeChapters || []).forEach((c) => { if (!chapterIds.has(c)) fail(4, `Unknown excludeChapter "${c}" in ${owner}`); });
  (req.anySegmenta || []).forEach((s) => { if (!segIds.has(s)) fail(4, `Unknown segmentum "${s}" in ${owner}`); });
  (req.anyFocus || []).forEach((f) => { if (!focusIds.has(f)) fail(4, `Unknown focus "${f}" in ${owner}`); });
  (req.or || []).forEach((sub) => validateReq(sub, `${owner}.or`));

  const checkTagList = (list) => (list || []).forEach((t) => {
    if (!t.startsWith("met_") && !t.startsWith("chapter_") && !tagLabels[t]) {
      fail(4, `Missing TAG_LABELS entry for "${t}" in ${owner}`);
    }
    if (!producedTags.has(t)) {
      fail(4, `Unproduced tag "${t}" referenced in ${owner}`);
    }
  });
  checkTagList(req.allTags);
  checkTagList(req.anyTags);
  checkTagList(req.excludeTags);
}

for (const c of DATA.CAREERS) {
  validateReq(c.req, `career:${c.id}`);
  if (c.req && !Engine.describeReq(c.req)) {
    fail(4, `Empty describeReq for career:${c.id}`);
  }
  if (!c.tree || !c.treeName) fail(4, `Missing tree/treeName on career:${c.id}`);
  if (!["open", "event"].includes(c.entryMode)) fail(4, `Invalid entryMode "${c.entryMode}" on career:${c.id}`);
  if (!c.transitTier || !c.actionGroup) fail(4, `Missing transitTier/actionGroup on career:${c.id}`);
  if (c.onJoin && c.onJoin.addTags) {
    c.onJoin.addTags.forEach((t) => {
      if (!t.startsWith("met_") && !t.startsWith("chapter_") && !tagLabels[t]) {
        fail(4, `Missing TAG_LABELS for career.onJoin tag "${t}" on career:${c.id}`);
      }
    });
  }
}

for (const ev of [...DATA.EVENTS, ...DATA.TIMELINE]) {
  validateReq(ev.req || ev.filter, ev.id);
  (ev.characters || []).forEach((cid) => {
    if (!charIds.has(cid)) fail(4, `Unknown character "${cid}" in ${ev.id}`);
  });
  const choices = ev.choices || [];
  if (choices.filter((ch) => !ch.req).length === 0) {
    fail(5, `Softlock risk (0 unconditional choices) in ${ev.id}`);
  }
  for (const ch of choices) {
    validateReq(ch.req, `${ev.id}:choice`);
    if (ch.req && !Engine.describeReq(ch.req)) {
      fail(4, `Empty describeReq on choice in ${ev.id}`);
    }
    [ch.effect, ch.outcome, ch.success, ch.fail].forEach((o) => {
      if (!o) return;
      if (o.forceCareer && !careerIds.has(o.forceCareer)) fail(4, `Unknown forceCareer "${o.forceCareer}" in ${ev.id}`);
      if (o.moveWorld && !worldIds.has(o.moveWorld)) fail(4, `Unknown moveWorld "${o.moveWorld}" in ${ev.id}`);
      (o.addTags || []).forEach((t) => {
        if (!t.startsWith("met_") && !t.startsWith("chapter_") && !tagLabels[t]) {
          fail(4, `Missing TAG_LABELS for added tag "${t}" in ${ev.id}`);
        }
      });
    });
  }
}

// Krieg Vita-Womb family leak scan across all chronicles & events
const kriegCheckState = Engine.createCharacter({
  mode: "custom",
  worldId: "krieg",
  originId: "hive_worker",
  traitId: "iron_will",
  eraId: "m41_late",
  gender: "male"
});
for (const ch of DATA.CHRONICLES) {
  validateReq(ch.req, ch.id);
  kriegCheckState.age = Math.max(1, (ch.req && ch.req.minAge) || 5);
  const cleaned = (ch.text || "").replace(/어머니의 품 대신/g, "");
  if (/어머니|아버지|부모님|자장가|가족 식탁|가정식|엄마|아빠/.test(cleaned) && Engine.checkReq(kriegCheckState, ch.req)) {
    fail(3, `Krieg Vita-Womb family leak in chronicle ${ch.id}`);
  }
}

// Unit test: forceCareer downgrade protection, Astartes chaos redirect, dynamic offers, anyPastCareers, apex obituaries
{
  const cust = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "terra_highborn", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  cust.careerId = "adeptus_custodes";
  cust.tags.push("custodes", "transhuman");
  cust.pendingEvent = {
    id: "qa_downgrade_test",
    title: "QA Downgrade Test",
    choices: [{ label: "test", effect: { text: "ok", forceCareer: "pdf_trooper" } }]
  };
  Engine.resolvePendingChoice(cust, 0);
  if (cust.careerId !== "adeptus_custodes") {
    fail(4, `forceCareer downgraded custodes to ${cust.careerId}`);
  }
  cust.pendingEvent = {
    id: "qa_custodes_corrupt_test",
    title: "QA Custodes Incorruptible Test",
    choices: [{ label: "test", effect: { text: "ok", forceCareer: "chaos_cultist" } }]
  };
  Engine.resolvePendingChoice(cust, 0);
  if (cust.careerId !== "adeptus_custodes") {
    fail(4, `forceCareer corrupted custodes to ${cust.careerId}`);
  }

  const marine = Engine.createCharacter({ mode: "custom", worldId: "macragge", originId: "hive_worker", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  marine.age = 40;
  marine.careerId = "astartes_brother";
  marine.careerHistory = ["child", "astartes_scout", "astartes_brother"];
  marine.tags.push("astartes", "transhuman");
  marine.corruption = 60;
  if (Engine.checkReq(marine, Engine.getCareer("chaos_cultist").req)) {
    fail(4, `Astartes should not qualify for mortal chaos_cultist`);
  }
  if (!Engine.checkReq(marine, Engine.getCareer("renegade_marine").req)) {
    fail(4, `Corrupted Astartes failed to qualify for renegade_marine`);
  }
  marine.pendingEvent = {
    id: "qa_csm_redirect_test",
    title: "QA CSM Redirect Test",
    choices: [{ label: "test", effect: { text: "ok", forceCareer: "chaos_cultist" } }]
  };
  Engine.resolvePendingChoice(marine, 0);
  if (marine.careerId !== "renegade_marine") {
    fail(4, `forceCareer chaos_cultist on Astartes did not redirect to renegade_marine (got ${marine.careerId})`);
  }

  const recruit = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "hive_worker", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  recruit.careerId = "menial_worker";
  recruit.pendingEvent = {
    id: "qa_tag_sync_test",
    title: "QA Tag Sync Test",
    choices: [{ label: "test", effect: { text: "ok", forceCareer: "astra_militarum" } }]
  };
  Engine.resolvePendingChoice(recruit, 0);
  if (recruit.careerId !== "astra_militarum" || !recruit.tags.includes("militarum")) {
    fail(4, `forceCareer failed to merge onJoin.addTags for astra_militarum`);
  }

  // anyPastCareers + excludePastCareers + dynamic career offer accept/decline cooldown
  const gen = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "military_family", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  gen.age = 56;
  gen.careerId = "militarum_general";
  gen.careerHistory = ["child", "astra_militarum", "militarum_sergeant", "militarum_officer", "militarum_general"];
  gen.stats = { WS: 65, BS: 70, T: 60, Ag: 55, Int: 86, WP: 86, Fel: 84, Inf: 92 };
  if (!Engine.checkReq(gen, { anyPastCareers: ["astra_militarum"], excludePastCareers: ["underhive_ganger"] })) {
    fail(4, `anyPastCareers/excludePastCareers check failed`);
  }
  if (!Engine.describeReq({ anyPastCareers: ["astra_militarum"] })) {
    fail(4, `describeReq failed for anyPastCareers`);
  }
  if (Engine.attemptCareerChange(gen, "planetary_governor").ok) {
    fail(4, `Manual attemptCareerChange allowed event-only planetary_governor`);
  }
  const wmOffer = Engine.createDynamicCareerOfferEvent(gen, null, { forceOffer: true, targetCareerId: "warmaster" });
  if (!wmOffer || wmOffer.offeredCareerId !== "warmaster" || wmOffer.choices.length < 2 || !wmOffer.choices[0].check) {
    fail(4, `createDynamicCareerOfferEvent failed to generate warmaster trial offer`);
  }
  gen.pendingEvent = wmOffer;
  Engine.resolvePendingChoice(gen, 1); // Decline warmaster
  if (gen.declinedCareers.warmaster !== gen.year) {
    fail(4, `Declining dynamic career offer did not record cooldown`);
  }
  const reOffer = Engine.createDynamicCareerOfferEvent(gen, null, { forceOffer: true, targetCareerId: "warmaster" });
  if (reOffer && reOffer.offeredCareerId === "warmaster") {
    fail(4, `Declined career was immediately re-offered within 8-year cooldown`);
  }
  const govOffer = Engine.createDynamicCareerOfferEvent(gen, null, { forceOffer: true, targetCareerId: "planetary_governor" });
  if (!govOffer || govOffer.offeredCareerId !== "planetary_governor" || govOffer.choices[0].check) {
    fail(4, `createDynamicCareerOfferEvent failed to generate deterministic planetary_governor offer`);
  }
  gen.pendingEvent = govOffer;
  Engine.resolvePendingChoice(gen, 0); // Deterministic accept (no trialCheck)
  if (gen.careerId !== "planetary_governor" || !gen.tags.includes("planetary_governor") || !gen.careerHistory.includes("planetary_governor")) {
    fail(4, `Accepting dynamic career offer failed to transition to planetary_governor`);
  }

  // Apex obituaries & Daemon Prince corruption-100 immunity
  const dp = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "hive_worker", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  dp.age = 80;
  dp.careerId = "daemon_prince";
  dp.tags.push("daemon_prince", "heretic", "chaos_aligned", "mark_khorne");
  dp.corruption = 100;
  Engine.advanceQuarter(dp);
  if (!dp.alive || dp.corruption !== 99) {
    fail(4, `Daemon Prince failed corruption-100 immunity (alive=${dp.alive}, corr=${dp.corruption})`);
  }
  const dpGrade = Engine.evaluateLifeGrade(dp);
  if (!dpGrade.rank.includes("DAEMON PRINCE")) fail(4, `Daemon Prince obituary rank mismatch: ${dpGrade.rank}`);
  const govGrade = Engine.evaluateLifeGrade(gen);
  if (!govGrade.rank.includes("IMPERIAL COMMANDER")) fail(4, `Planetary Governor obituary rank mismatch: ${govGrade.rank}`);
  gen.careerId = "warmaster";
  gen.tags.push("warmaster");
  const wmGrade = Engine.evaluateLifeGrade(gen);
  if (!wmGrade.rank.includes("WARMASTER")) fail(4, `Warmaster obituary rank mismatch: ${wmGrade.rank}`);
}

console.log(`[Gate 4] Integrity, 78-career metadata, tag production, describeReq, dynamic offers, and apex guards verified.`);

// ============================================================================
// Gate 5: 소프트락 · 유년기 풀(22행성 각 4+) · fastChildhood · 2400로그 보존 · 중복률
// ============================================================================
let minAge2 = 999;
let minAge10 = 999;
for (const w of DATA.WORLDS) {
  const st = Engine.createCharacter({ mode: "custom", worldId: w.id, originId: "hive_worker", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  st.age = 2;
  const c2 = DATA.CHRONICLES.filter((c) => Engine.checkReq(st, c.req)).length;
  st.age = 10;
  const c10 = DATA.CHRONICLES.filter((c) => Engine.checkReq(st, c.req)).length;
  if (c2 < 4) fail(5, `World ${w.id} age 2 chronicle pool < 4 (${c2})`);
  if (c10 < 4) fail(5, `World ${w.id} age 10 chronicle pool < 4 (${c10})`);
  minAge2 = Math.min(minAge2, c2);
  minAge10 = Math.min(minAge10, c10);
}

function pickSmartChoice(st) {
  let bestIdx = -1;
  let bestScore = -9999;
  const choices = (st.pendingEvent && st.pendingEvent.choices) || [];
  for (let idx = 0; idx < choices.length; idx++) {
    const ch = choices[idx];
    if (!Engine.checkReq(st, ch.req)) continue;
    let sc = 50;
    if (ch.check) sc = (st.stats[ch.check.stat] || 20) + (ch.check.diff || 0);
    else if (ch.effect && ch.effect.instantDeath) sc = -500;
    else if (ch.effect && (ch.effect.wounds || 0) < 0) sc = 45 + ch.effect.wounds;
    if (sc > bestScore) {
      bestScore = sc;
      bestIdx = idx;
    }
  }
  return bestIdx >= 0 ? bestIdx : choices.findIndex((ch) => !ch.req);
}

// fastChildhood unit test
{
  const fastSt = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "hive_worker", traitId: "iron_will", eraId: "m41_late", gender: "male" });
  let ticks = 0;
  while (fastSt.alive && fastSt.age < 13 && ticks < 40) {
    Engine.advanceQuarter(fastSt, { fastChildhood: true });
    while (fastSt.alive && fastSt.pendingEvent) Engine.resolvePendingChoice(fastSt, pickSmartChoice(fastSt));
    ticks++;
  }
  if (ticks > 16) fail(5, `fastChildhood took ${ticks} ticks to reach age 13 (expected <= 16)`);
}

// 2400-log birth preservation unit test
{
  const longSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "planetary_noble", traitId: "iron_will", eraId: "m41_early", gender: "male" });
  longSt.careerId = "adeptus_custodes";
  longSt.tags.push("custodes", "transhuman");
  const birthLog = longSt.logs[0];
  for (let i = 0; i < 2520; i++) {
    longSt.alive = true;
    longSt.wounds = 100;
    longSt.corruption = 0;
    longSt.pendingEvent = null;
    Engine.advanceQuarter(longSt);
    longSt.pendingEvent = null;
  }
  if (longSt.logs.length > 2400) fail(5, `Log retention exceeded 2400 (${longSt.logs.length})`);
  if (!longSt.logs.includes(birthLog)) fail(5, `Birth log was pruned at 2400 cap`);
}

// Childhood duplication rate across 100 lives
let kidTotal = 0;
let kidDup = 0;
for (let i = 0; i < 100; i++) {
  const st = Engine.createCharacter({ mode: "random" });
  const seenText = new Set();
  let g = 0;
  while (st.alive && st.age < 14 && g < 80) {
    g++;
    Engine.advanceQuarter(st);
    while (st.alive && st.pendingEvent) Engine.resolvePendingChoice(st, pickSmartChoice(st));
  }
  for (const l of st.logs) {
    if (l.kind === "chronicle" || l.kind === "chronicle-grim") {
      kidTotal++;
      if (seenText.has(l.text)) kidDup++;
      seenText.add(l.text);
    }
  }
}
const kidDupRate = kidTotal ? (kidDup / kidTotal) * 100 : 0;
if (kidDupRate > 30) fail(5, `Childhood duplication rate ${kidDupRate.toFixed(1)}% exceeded 30%`);
console.log(`[Gate 5] Softlocks=0, childhood pool min(age2=${minAge2}, age10=${minAge10}), dupRate=${kidDupRate.toFixed(1)}%, 2400-log birth preserved.`);

// ============================================================================
// Gate 7A/7B (--deep 우선 실행): 전직 그래프 모순 · 전수 합성 도달성 감사 (Fail-Fast)
// ============================================================================
const careerById = new Map(DATA.CAREERS.map((c) => [c.id, c]));
const selectableCareers = DATA.CAREERS.filter((c) => c.selectable);

if (DEEP_MODE) {
  console.log("\n--- [Gate 7A/7B: Static Graph & Full-Corpus Reachability (--deep)] ---");

  // 7A. Career Transition Reachability Graph & anyPastCareers Contradiction Audit
  const forceCareerTargets = new Set();
  for (const ev of [...DATA.EVENTS, ...DATA.TIMELINE]) {
    for (const ch of (ev.choices || [])) {
      [ch.effect, ch.outcome, ch.success, ch.fail].forEach((o) => {
        if (o && o.forceCareer) forceCareerTargets.add(o.forceCareer);
      });
    }
  }

  function careerPermTags(c) {
    const out = new Set();
    if (c && c.onJoin && Array.isArray(c.onJoin.addTags)) {
      for (const t of c.onJoin.addTags) {
        if (t !== "imperial_nihilus") out.add(t);
      }
    }
    return out;
  }

  function reqCompatibleWithBase(req, currId, baseGender, baseTags) {
    if (!req) return true;
    if (req.gender && baseGender && req.gender !== baseGender) return false;
    if (req.excludeTags && req.excludeTags.some((t) => baseTags.has(t))) return false;
    if (req.anyCareers && !req.anyCareers.includes(currId)) return false;
    if (req.or && req.or.length > 0) {
      const anyBranchOk = req.or.some((sub) => reqCompatibleWithBase(sub, currId, baseGender, baseTags));
      if (!anyBranchOk) return false;
    }
    return true;
  }

  function canDirectStep(curr, target, baseGender, baseTags, baseTranshuman) {
    if (!curr || !target || curr.id === target.id) return false;
    const tGender = target.req && target.req.gender ? target.req.gender : null;
    if (baseGender && tGender && baseGender !== tGender) return false;

    const effTags = new Set([...baseTags, ...careerPermTags(curr)]);
    const effTranshuman = baseTranshuman || Boolean(curr.isTranshuman) ||
      effTags.has("astartes") || effTags.has("custodes") || effTags.has("grey_knight") || effTags.has("daemon_prince");

    if ((effTags.has("custodes") || effTags.has("grey_knight")) && target.tree === "chaos") return false;

    // 1) Manual open transition
    if (target.selectable && target.entryMode === "open") {
      if (reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
        if (!effTranshuman || Boolean(target.isTranshuman) || target.tree === "chaos") return true;
        if (!target.req || !target.req.excludeTags || !target.req.excludeTags.some((t) => effTags.has(t))) return true;
      }
    }

    // 2) Dynamic career offer transition
    if (target.selectable && target.tier >= 2 && reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
      if (curr.id === "child") {
        if (Boolean(target.isTranshuman) || target.tier >= 3) return true;
      } else {
        if (!effTranshuman || Boolean(target.isTranshuman)) {
          if (target.tree === curr.tree) {
            if (target.tier >= curr.tier) return true;
          } else {
            const tierOk = target.tier >= curr.tier || target.tree === "chaos";
            const lateralOk = target.entryMode === "event" || target.tree === "chaos" || Boolean(target.isTranshuman);
            if (tierOk && lateralOk) return true;
          }
        }
      }
    }

    // 3) Event forceCareer transition (with Astartes chaos_cultist -> renegade_marine redirect)
    const forcedDirectly = forceCareerTargets.has(target.id);
    const forcedViaRedirect = target.id === "renegade_marine" && forceCareerTargets.has("chaos_cultist") && effTags.has("astartes");
    if (forcedDirectly || forcedViaRedirect) {
      const targetIsTranshuman = Boolean(target.isTranshuman);
      const isDowngrade = (effTranshuman && !targetIsTranshuman && target.tree !== "chaos") ||
        (target.tier < curr.tier && target.tree !== "chaos");
      if (!isDowngrade) {
        if (!(target.id === "chaos_cultist" && effTags.has("astartes"))) return true;
      }
    }

    return false;
  }

  const reachableFrom = new Map();
  for (const start of DATA.CAREERS) {
    const startGender = start.req && start.req.gender ? start.req.gender : null;
    const startTags = careerPermTags(start);
    const startTranshuman = Boolean(start.isTranshuman) ||
      startTags.has("astartes") || startTags.has("custodes") || startTags.has("grey_knight") || startTags.has("daemon_prince");

    const visited = new Set([start.id]);
    const queue = [start];
    while (queue.length > 0) {
      const curr = queue.shift();
      for (const next of DATA.CAREERS) {
        if (visited.has(next.id)) continue;
        if (canDirectStep(curr, next, startGender, startTags, startTranshuman)) {
          visited.add(next.id);
          queue.push(next);
        }
      }
    }
    reachableFrom.set(start.id, visited);
  }

  // Graph sanity checks (prevents silent drift of the graph analyzer itself)
  const graphChecks = [
    ["astra_militarum", "warmaster", true],
    ["astra_militarum", "planetary_governor", true],
    ["astartes_brother", "renegade_marine", true],
    ["astartes_brother", "daemon_prince", true],
    ["adeptus_custodes", "chaos_cultist", false],
    ["adeptus_custodes", "daemon_prince", false],
    ["grey_knight", "renegade_marine", false],
    ["adepta_sororitas", "astartes_brother", false],
    ["astartes_brother", "planetary_governor", false]
  ];
  for (const [fromId, toId, expected] of graphChecks) {
    const actual = reachableFrom.has(fromId) && reachableFrom.get(fromId).has(toId);
    if (actual !== expected) {
      fail(7, `Career graph sanity mismatch: ${fromId} -> ${toId} expected=${expected}, got=${actual}`);
    }
  }

  let pastCareerChecks = 0;
  function auditPastCareerReq(req, owner, parentCareers) {
    if (!req) return;
    const curList = req.anyCareers || parentCareers || null;
    if (req.anyPastCareers) {
      pastCareerChecks++;
      const excl = new Set(req.excludePastCareers || []);
      const validPast = req.anyPastCareers.filter((p) => !excl.has(p));
      if (validPast.length === 0) {
        fail(7, `Contradictory anyPastCareers vs excludePastCareers in ${owner}`);
      } else if (curList && curList.length > 0) {
        let pairOk = false;
        for (const p of validPast) {
          const reach = reachableFrom.get(p);
          for (const c of curList) {
            if (p === c || (reach && reach.has(c))) {
              pairOk = true;
              break;
            }
          }
          if (pairOk) break;
        }
        if (!pairOk) {
          fail(7, `Unreachable (anyPastCareers=[${validPast.join(",")}] -> anyCareers=[${curList.join(",")}]) in ${owner}`);
        }
      }
    }
    if (req.or) {
      req.or.forEach((sub, idx) => auditPastCareerReq(sub, `${owner}.or[${idx}]`, curList));
    }
  }

  // 7B. Full-Corpus Synthetic Reachability Prover
  function intersectArrays(a, b) {
    if (!a) return b ? [...b] : null;
    if (!b) return [...a];
    const setB = new Set(b);
    return a.filter((x) => setB.has(x));
  }

  function mergeFlatReq(a, b) {
    if (!a) return b ? Object.assign({}, b) : {};
    if (!b) return Object.assign({}, a);
    const out = Object.assign({}, a);

    const maxKeys = ["minAge", "minYear", "minFaith", "minCorruption", "minWounds"];
    const minKeys = ["maxAge", "maxYear", "maxFaith", "maxCorruption", "maxWounds"];
    for (const k of maxKeys) {
      if (b[k] !== undefined) out[k] = out[k] !== undefined ? Math.max(out[k], b[k]) : b[k];
    }
    for (const k of minKeys) {
      if (b[k] !== undefined) out[k] = out[k] !== undefined ? Math.min(out[k], b[k]) : b[k];
    }

    if (b.gender) {
      if (out.gender && out.gender !== b.gender) return null;
      out.gender = b.gender;
    }
    if (b.greatRift !== undefined) {
      if (out.greatRift !== undefined && out.greatRift !== b.greatRift) return null;
      out.greatRift = b.greatRift;
    }

    const intersectKeys = ["anyCareers", "anyChapters", "anyWorlds", "anyHomeWorlds", "anySegmenta", "anyFocus"];
    for (const k of intersectKeys) {
      if (b[k]) {
        const merged = intersectArrays(out[k], b[k]);
        if (merged.length === 0) return null;
        out[k] = merged;
      }
    }

    out._anyTagGroups = [...(a._anyTagGroups || (a.anyTags ? [a.anyTags] : [])), ...(b._anyTagGroups || (b.anyTags ? [b.anyTags] : []))];
    out._anyWorldTagGroups = [...(a._anyWorldTagGroups || (a.anyWorldTags ? [a.anyWorldTags] : [])), ...(b._anyWorldTagGroups || (b.anyWorldTags ? [b.anyWorldTags] : []))];
    out._anyPastGroups = [...(a._anyPastGroups || (a.anyPastCareers ? [a.anyPastCareers] : [])), ...(b._anyPastGroups || (b.anyPastCareers ? [b.anyPastCareers] : []))];
    delete out.anyTags;
    delete out.anyWorldTags;
    delete out.anyPastCareers;

    const unionKeys = ["allTags", "excludeTags", "excludeWorlds", "excludeWorldTags", "excludeChapters", "excludePastCareers"];
    for (const k of unionKeys) {
      if (b[k]) out[k] = [...new Set([...(out[k] || []), ...b[k]])];
    }

    if (b.stats) {
      out.stats = Object.assign({}, out.stats || {});
      for (const sk of Object.keys(b.stats)) {
        out.stats[sk] = out.stats[sk] !== undefined ? Math.max(out.stats[sk], b.stats[sk]) : b.stats[sk];
      }
    }
    delete out.or;
    return out;
  }

  function expandClauses(req) {
    if (!req) return [{}];
    const base = Object.assign({}, req);
    const orBranches = base.or;
    delete base.or;
    const baseFlat = mergeFlatReq({}, base);
    if (!baseFlat) return [];
    if (!orBranches || orBranches.length === 0) return [baseFlat];

    const results = [];
    for (const branch of orBranches) {
      const subClauses = expandClauses(branch);
      for (const sc of subClauses) {
        const merged = mergeFlatReq(baseFlat, sc);
        if (merged) results.push(merged);
      }
    }
    return results;
  }

  function synthesizeClauseState(cl) {
    const minAge = cl.minAge !== undefined ? cl.minAge : 0;
    const maxAge = cl.maxAge !== undefined ? cl.maxAge : 400;
    if (minAge > maxAge) return null;
    const age = cl.minAge !== undefined ? cl.minAge : Math.min(25, maxAge);

    let minYear = cl.minYear !== undefined ? cl.minYear : 100;
    let maxYear = cl.maxYear !== undefined ? cl.maxYear : 1040;
    if (cl.greatRift === true) minYear = Math.max(minYear, 999);
    if (cl.greatRift === false) maxYear = Math.min(maxYear, 998);
    if (minYear > maxYear) return null;
    const year = minYear;

    const minFaith = cl.minFaith !== undefined ? cl.minFaith : 0;
    const maxFaith = cl.maxFaith !== undefined ? cl.maxFaith : 100;
    if (minFaith > maxFaith) return null;
    const faith = minFaith;

    const minCorr = cl.minCorruption !== undefined ? cl.minCorruption : 0;
    const maxCorr = cl.maxCorruption !== undefined ? cl.maxCorruption : 100;
    if (minCorr > maxCorr) return null;
    const corruption = minCorr;

    const minWounds = cl.minWounds !== undefined ? cl.minWounds : 1;
    const maxWounds = cl.maxWounds !== undefined ? cl.maxWounds : 200;
    if (minWounds > maxWounds) return null;
    const wounds = minWounds;

    const exclWorlds = new Set(cl.excludeWorlds || []);
    const exclWorldTags = new Set(cl.excludeWorldTags || []);
    const worldCandidates = DATA.WORLDS.filter((w) => {
      if (cl.anyWorlds && !cl.anyWorlds.includes(w.id)) return false;
      if (exclWorlds.has(w.id)) return false;
      if (cl.anySegmenta && !cl.anySegmenta.includes(w.segmentum)) return false;
      if (exclWorldTags.size && (w.tags || []).some((t) => exclWorldTags.has(t))) return false;
      for (const grp of (cl._anyWorldTagGroups || [])) {
        if (!grp.some((t) => (w.tags || []).includes(t))) return false;
      }
      return true;
    });
    if (worldCandidates.length === 0) return null;
    const chosenWorld = worldCandidates[0];

    const homeWorldId = (cl.anyHomeWorlds && cl.anyHomeWorlds.length > 0) ? cl.anyHomeWorlds[0] : chosenWorld.id;
    if (!worldIds.has(homeWorldId)) return null;

    const exclChapters = new Set(cl.excludeChapters || []);
    let chapterId = null;
    if (cl.anyChapters) {
      const validCh = cl.anyChapters.find((cid) => chapterIds.has(cid) && !exclChapters.has(cid));
      if (!validCh) return null;
      chapterId = validCh;
    }

    const exclTags = new Set(cl.excludeTags || []);
    const tagSet = new Set(cl.allTags || []);
    for (const t of tagSet) {
      if (exclTags.has(t)) return null;
    }
    for (const grp of (cl._anyTagGroups || [])) {
      const picked = grp.find((t) => !exclTags.has(t));
      if (!picked) return null;
      tagSet.add(picked);
    }

    const exclPast = new Set(cl.excludePastCareers || []);
    let careerId = "astra_militarum";
    if (cl.anyCareers) {
      const validCur = cl.anyCareers.find((cid) => !exclPast.has(cid));
      if (!validCur) return null;
      careerId = validCur;
    } else if (exclPast.has(careerId)) {
      const alt = DATA.CAREERS.find((c) => !exclPast.has(c.id));
      if (!alt) return null;
      careerId = alt.id;
    }

    const pastHistory = [careerId];
    if (!exclPast.has("child") && careerId !== "child") pastHistory.unshift("child");
    for (const grp of (cl._anyPastGroups || [])) {
      const pickedPast = grp.find((p) => {
        if (exclPast.has(p)) return false;
        const reach = reachableFrom.get(p);
        return p === careerId || (reach && reach.has(careerId));
      });
      if (!pickedPast) return null;
      if (!pastHistory.includes(pickedPast)) pastHistory.push(pickedPast);
    }

    const gender = cl.gender || (careerById.get(careerId) && careerById.get(careerId).req && careerById.get(careerId).req.gender) || "male";
    const focus = (cl.anyFocus && cl.anyFocus[0]) || "survival";
    const stats = { WS: 50, BS: 50, T: 50, Ag: 50, Int: 50, WP: 50, Fel: 50, Inf: 50 };
    if (cl.stats) {
      for (const sk of Object.keys(cl.stats)) stats[sk] = Math.max(stats[sk] || 50, cl.stats[sk]);
    }

    return {
      alive: true,
      age,
      year,
      quarter: 1,
      gender,
      worldId: chosenWorld.id,
      homeWorldId,
      segmentum: chosenWorld.segmentum,
      careerId,
      careerHistory: pastHistory,
      chapterId,
      focus,
      stats,
      faith,
      corruption,
      wounds,
      maxWounds: Math.max(100, wounds),
      tags: [...tagSet],
      globalFlags: {
        greatRiftOpened: cl.greatRift !== undefined ? cl.greatRift : year >= 999
      }
    };
  }

  function proveReachable(req, owner, origReqForCheck) {
    if (!req) return true;
    const clauses = expandClauses(req);
    for (const cl of clauses) {
      const st = synthesizeClauseState(cl);
      if (st && Engine.checkReq(st, origReqForCheck || req)) return true;
    }
    fail(7, `Synthetically unreachable requirement in ${owner}`);
    return false;
  }

  let synthChecked = 0;
  for (let i = 0; i < DATA.EVENTS.length; i++) {
    const ev = DATA.EVENTS[i];
    const src = eventSourceByIndex[i] || "EVENTS";
    const owner = `${ev.id} (${src})`;
    auditPastCareerReq(ev.req, owner, null);
    synthChecked++;
    proveReachable(ev.req, owner, ev.req);
    (ev.choices || []).forEach((ch, idx) => {
      if (!ch.req) return;
      const chOwner = `${ev.id}:choice[${idx}] (${src})`;
      auditPastCareerReq(ch.req, chOwner, ev.req && ev.req.anyCareers ? ev.req.anyCareers : null);
      synthChecked++;
      const combined = ev.req ? { or: expandClauses(ev.req).flatMap((ec) => expandClauses(ch.req).map((cc) => mergeFlatReq(ec, cc)).filter(Boolean)) } : ch.req;
      let ok = false;
      const clauses = combined.or ? combined.or : expandClauses(combined);
      for (const cl of clauses) {
        const st = synthesizeClauseState(cl);
        if (st && Engine.checkReq(st, ev.req) && Engine.checkReq(st, ch.req)) { ok = true; break; }
      }
      if (!ok) fail(7, `Choice unreachable under parent event req in ${chOwner}`);
    });
  }

  for (const tl of DATA.TIMELINE) {
    const owner = `timeline:${tl.id}`;
    auditPastCareerReq(tl.filter, owner, null);
    synthChecked++;
    proveReachable(tl.filter, owner, tl.filter);
    (tl.choices || []).forEach((ch, idx) => {
      if (!ch.req) return;
      const chOwner = `timeline:${tl.id}:choice[${idx}]`;
      auditPastCareerReq(ch.req, chOwner, tl.filter && tl.filter.anyCareers ? tl.filter.anyCareers : null);
      synthChecked++;
      let ok = false;
      const parentClauses = expandClauses(tl.filter);
      const childClauses = expandClauses(ch.req);
      for (const ec of parentClauses) {
        for (const cc of childClauses) {
          const merged = mergeFlatReq(ec, cc);
          if (!merged) continue;
          const st = synthesizeClauseState(merged);
          if (st && Engine.checkReq(st, tl.filter) && Engine.checkReq(st, ch.req)) { ok = true; break; }
        }
        if (ok) break;
      }
      if (!ok) fail(7, `Timeline choice unreachable under parent filter in ${chOwner}`);
    });
  }

  for (let i = 0; i < DATA.CHRONICLES.length; i++) {
    const ch = DATA.CHRONICLES[i];
    const src = chronSourceByIndex[i] || "CHRONICLES";
    const owner = `${ch.id} (${src})`;
    auditPastCareerReq(ch.req, owner, null);
    synthChecked++;
    proveReachable(ch.req, owner, ch.req);
  }

  for (const c of DATA.CAREERS) {
    if (!c.req) continue;
    synthChecked++;
    proveReachable(c.req, `career:${c.id}`, c.req);
  }

  function reqMentionsCareer(req, cid) {
    if (!req) return false;
    if (req.anyCareers && req.anyCareers.includes(cid)) return true;
    if (req.or && req.or.some((sub) => reqMentionsCareer(sub, cid))) return true;
    return false;
  }

  let careersWithEvents = 0;
  let careersWithChrons = 0;
  for (const c of selectableCareers) {
    const hasEv = DATA.EVENTS.some((ev) => reqMentionsCareer(ev.req, c.id));
    const hasCh = DATA.CHRONICLES.some((ch) => reqMentionsCareer(ch.req, c.id));
    if (hasEv) careersWithEvents++;
    if (hasCh) careersWithChrons++;
  }

  console.log(
    `[Gate 7A/7B] Career graph verified (${DATA.CAREERS.length} nodes, ${pastCareerChecks} anyPastCareers checks), ` +
    `synthetic reachability proved (${synthChecked} req specs), ` +
    `directCareerMatch(events=${careersWithEvents}/${selectableCareers.length}, chronicles=${careersWithChrons}/${selectableCareers.length}).`
  );
}

// ============================================================================
// Gate 6 / 7C: 멀티-초점 스트레스 시뮬레이션 (기본 300생애 / --deep 1,500생애) & 1,000분기 벤치마크
// ============================================================================
const focuses = DEEP_MODE
  ? ["survival", "combat", "lore", "faith", "politics", "forbidden"]
  : ["survival", "combat", "lore", "faith", "politics"];
const LIVES_PER_FOCUS = CUSTOM_LIVES_PER_FOCUS || (DEEP_MODE ? 250 : 60);
const totalSimLives = focuses.length * LIVES_PER_FOCUS;

let maxRepeat = 0;
let nihilusMismatch = 0;
let scholaStuck = 0;
let s8Triggers = 0;
let careerOfferTriggers = 0;
const reachedCareers = new Set();
const seenEvents = new Set();
const tierReached = { 4: 0, 5: 0, 6: 0 };
const milestones = {
  highLord: 0,
  governor: 0,
  rogueTrader: 0,
  astartes: 0,
  custodes: 0,
  greyKnight: 0,
  chaos: 0,
  daemonPrince: 0
};

for (const foc of focuses) {
  const allAges = [];
  const mortalAges = [];
  let violent = 0;
  let heretic = 0;
  for (let i = 0; i < LIVES_PER_FOCUS; i++) {
    const st = Engine.createCharacter({ mode: "random" });
    st.focus = foc;
    let steps = 0;
    while (st.alive && steps < 2400) {
      steps++;
      Engine.advanceQuarter(st);
      if (st.globalFlags.greatRiftOpened) {
        const w = Engine.getWorld(st.worldId);
        const seg = DATA.SEGMENTA[st.segmentum];
        const expected = Boolean(w.nihilusOverride || (seg && seg.nihilusAfterRift));
        if (st.tags.includes("imperial_nihilus") !== expected) nihilusMismatch++;
      }
      if (st.age >= 19 && st.careerId === "child" && st.tags.includes("schola")) scholaStuck++;
      while (st.alive && st.pendingEvent) {
        if ((st.pendingEvent.id || "").startsWith("ev_s8_crisis_")) s8Triggers++;
        if (st.pendingEvent.isCareerOffer) careerOfferTriggers++;
        Engine.resolvePendingChoice(st, pickSmartChoice(st));
      }
    }
    let maxTier = 0;
    for (const cid of (st.careerHistory || [st.careerId])) {
      if (!cid || cid === "child") continue;
      reachedCareers.add(cid);
      const co = careerById.get(cid);
      if (co && co.tier > maxTier) maxTier = co.tier;
    }
    if (DEEP_MODE) {
      if (maxTier >= 4) tierReached[4]++;
      if (maxTier >= 5) tierReached[5]++;
      if (maxTier >= 6) tierReached[6]++;
      if (st.tags.includes("high_lord_terra")) milestones.highLord++;
      if (st.tags.includes("planetary_governor") || st.tags.includes("sector_lord")) milestones.governor++;
      if (st.tags.includes("rogue_trader")) milestones.rogueTrader++;
      if (st.tags.includes("astartes")) milestones.astartes++;
      if (st.tags.includes("custodes")) milestones.custodes++;
      if (st.tags.includes("grey_knight")) milestones.greyKnight++;
      if (st.tags.includes("heretic") || st.tags.includes("chaos_aligned")) { milestones.chaos++; heretic++; }
      if (st.tags.includes("daemon_prince")) milestones.daemonPrince++;
    }
    allAges.push(st.age);
    if (!st.tags.includes("astartes") && !st.tags.includes("custodes") && !st.tags.includes("rejuvenat") && !st.tags.includes("daemon_prince")) {
      mortalAges.push(st.age);
    }
    if (!/노환|고령|수명/.test(st.deathCause || "")) violent++;
    for (const [eid, cnt] of Object.entries(st.eventCounts || {})) {
      if (DEEP_MODE) seenEvents.add(eid);
      if (cnt > maxRepeat) maxRepeat = cnt;
    }
  }
  allAges.sort((a, b) => a - b);
  mortalAges.sort((a, b) => a - b);
  const allMed = allAges[Math.floor(allAges.length / 2)];
  const mortMed = mortalAges.length ? mortalAges[Math.floor(mortalAges.length / 2)] : 0;
  const hereticCol = DEEP_MODE ? ` heretic=${String(Math.round((heretic / LIVES_PER_FOCUS) * 100)).padStart(2)}%` : "";
  console.log(
    `  Focus=${foc.padEnd(9)} allMed=${String(allMed).padStart(3)} ` +
    `mortalMed=${String(mortMed).padStart(3)} (n=${String(mortalAges.length).padStart(3)}) ` +
    `violent=${String(Math.round((violent / LIVES_PER_FOCUS) * 100)).padStart(2)}%${hereticCol}`
  );
}

if (maxRepeat > 2) fail(6, `Event repeat count exceeded 2: ${maxRepeat}`);
if (nihilusMismatch > 0) fail(6, `imperial_nihilus mismatch detected in ${nihilusMismatch} quarters`);
if (scholaStuck > 0) fail(6, `schola career remained child past age 18 in ${scholaStuck} quarters`);
if (careerOfferTriggers === 0) fail(6, `No dynamic career offers triggered across ${totalSimLives} simulated lives`);

// 1,000-quarter engine CPU benchmark
const benchSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "planetary_noble", traitId: "iron_will", eraId: "m41_late", gender: "male" });
benchSt.careerId = "inquisitor";
benchSt.tags.push("inquisitor", "rosette", "ordo_hereticus", "rejuvenat");
const t0 = performance.now();
for (let i = 0; i < 1000; i++) {
  benchSt.alive = true;
  benchSt.wounds = 100;
  benchSt.corruption = 0;
  benchSt.pendingEvent = null;
  Engine.advanceQuarter(benchSt);
  benchSt.pendingEvent = null;
}
const benchMs = performance.now() - t0;

console.log(
  `[Gate 6${DEEP_MODE ? "/7C" : ""}] ${totalSimLives} lives complete: maxRepeat=${maxRepeat}, nihilusMismatch=${nihilusMismatch}, ` +
  `scholaStuck=${scholaStuck}, careerOffers=${careerOfferTriggers}, reachedCareers=${reachedCareers.size}/${selectableCareers.length}, ` +
  `s8Crises=${s8Triggers} (avg ${(s8Triggers / totalSimLives).toFixed(1)}/life), 1000q=${benchMs.toFixed(1)}ms`
);
if (DEEP_MODE) {
  console.log(
    `  [Deep Distribution] naturalEvents=${seenEvents.size}/${DATA.EVENTS.length} | ` +
    `T4+=${tierReached[4]}, T5+=${tierReached[5]}, T6=${tierReached[6]} | ` +
    `HighLord=${milestones.highLord}, Gov=${milestones.governor}, RT=${milestones.rogueTrader}, ` +
    `Astartes=${milestones.astartes}, Custodes=${milestones.custodes}, GK=${milestones.greyKnight}, ` +
    `Chaos=${milestones.chaos}, DaemonPrince=${milestones.daemonPrince}`
  );
}

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.forEach((w) => console.log("  - " + w));
}

console.log(`\n=== QA SUMMARY: ${errors.length} ERRORS ===`);
if (errors.length) {
  errors.forEach((e) => console.error("  ERROR: " + e));
  process.exit(1);
}
console.log(DEEP_MODE ? "ALL 7 QA GATES (INCLUDING --deep) PASSED WITH 0 ERRORS." : "ALL 6 QA GATES PASSED WITH 0 ERRORS.");
