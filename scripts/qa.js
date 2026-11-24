#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 상설 자동 QA 검증 스위트 (Node.js 전용)
 * 브라우저(index.html)에는 로드되지 않으며, AGENTS.md 6장 6대 게이트 및 확장 불변 조건을 검증한다.
 * 실행: node scripts/qa.js
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

const errors = [];
const warnings = [];
const fail = (gate, msg) => errors.push(`[Gate ${gate}] ${msg}`);

console.log("=== 1 / QUADRILLION : IMPERIALIS VITA — QA Regression Suite ===");

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
// Gate 6: 300생애 멀티-초점 스트레스 시뮬레이션 & 1,000분기 성능 벤치마크
// ============================================================================
const focuses = ["survival", "combat", "lore", "faith", "politics"];
const LIVES_PER_FOCUS = 60;
let maxRepeat = 0;
let nihilusMismatch = 0;
let scholaStuck = 0;
let s8Triggers = 0;
let careerOfferTriggers = 0;
const reachedCareers = new Set();

for (const foc of focuses) {
  const allAges = [];
  const mortalAges = [];
  let violent = 0;
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
    (st.careerHistory || [st.careerId]).forEach((cid) => { if (cid && cid !== "child") reachedCareers.add(cid); });
    allAges.push(st.age);
    if (!st.tags.includes("astartes") && !st.tags.includes("custodes") && !st.tags.includes("rejuvenat")) {
      mortalAges.push(st.age);
    }
    if (!/노환|고령|수명/.test(st.deathCause || "")) violent++;
    for (const cnt of Object.values(st.eventCounts || {})) maxRepeat = Math.max(maxRepeat, cnt);
  }
  allAges.sort((a, b) => a - b);
  mortalAges.sort((a, b) => a - b);
  const allMed = allAges[Math.floor(allAges.length / 2)];
  const mortMed = mortalAges.length ? mortalAges[Math.floor(mortalAges.length / 2)] : 0;
  console.log(
    `  Focus=${foc.padEnd(8)} allMed=${String(allMed).padStart(3)} ` +
    `mortalMed=${String(mortMed).padStart(3)} (n=${String(mortalAges.length).padStart(2)}) ` +
    `violent=${Math.round((violent / LIVES_PER_FOCUS) * 100)}%`
  );
}

if (maxRepeat > 2) fail(6, `Event repeat count exceeded 2: ${maxRepeat}`);
if (nihilusMismatch > 0) fail(6, `imperial_nihilus mismatch detected in ${nihilusMismatch} quarters`);
if (scholaStuck > 0) fail(6, `schola career remained child past age 18 in ${scholaStuck} quarters`);
if (careerOfferTriggers === 0) fail(6, `No dynamic career offers triggered across 300 simulated lives`);

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
  `[Gate 6] 300 lives complete: maxRepeat=${maxRepeat}, nihilusMismatch=${nihilusMismatch}, ` +
  `scholaStuck=${scholaStuck}, careerOffers=${careerOfferTriggers}, reachedCareers=${reachedCareers.size}/${DATA.CAREERS.length - 1}, ` +
  `s8Crises=${s8Triggers} (avg ${(s8Triggers / (LIVES_PER_FOCUS * focuses.length)).toFixed(1)}/life), ` +
  `1000q=${benchMs.toFixed(1)}ms`
);

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.forEach((w) => console.log("  - " + w));
}

console.log(`\n=== QA SUMMARY: ${errors.length} ERRORS ===`);
if (errors.length) {
  errors.forEach((e) => console.error("  ERROR: " + e));
  process.exit(1);
}
console.log("ALL 6 QA GATES PASSED WITH 0 ERRORS.");
