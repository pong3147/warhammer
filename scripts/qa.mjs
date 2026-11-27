#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 상설 자동 QA 검증 스위트 (ESM · Node.js 22+)
 * AGENTS.md 6장 7대 게이트, 워해머 40k 개념 사전(GLOSSARY) 무결성, 정적 접근성 규칙,
 * 프로덕션 dist/ 번들 격리(Gate 8) 및 심층 밸런스를 검증한다.
 * 실행:
 *   node scripts/qa.mjs                  # 기본 6대 게이트 + 300생애 시뮬레이션 (5초점 x 60)
 *   node scripts/qa.mjs --deep           # 6대 게이트 + Gate 7(전직 그래프 모순 · 전수 합성 도달성 · 1,500생애 심층 감사)
 *   node scripts/qa.mjs --check-dist     # 기본 게이트 + Gate 8(dist/ 번들 격리 · SSR 카드 수량 검증)
 *   node scripts/qa.mjs --only-dist      # 빌드 직후 Gate 8(dist/ 번들 격리 · SSR 카드 수량)만 고속 검증
 *   node scripts/qa.mjs --deep --lives=N # --deep 정적 감사 + 초점당 N생애(총 6xN생애) 맞춤형 밸런스 감사
 */
import fs from "node:fs";
import path from "node:path";
import { collectDirFiles, loadNodeImperiumRuntime, ROOT } from "./_loadNodeData.mjs";
import {
  CAREER_TREE_GLOSSARY,
  CONTEXTUAL_GLOSSARY_LABELS,
  ORIGIN_GLOSSARY,
  TRAIT_GLOSSARY
} from "../src/lib/contextualGlossary.js";
import { CORE_DATA } from "../src/data/core/index.js";
import { GLOSSARY_TERMS } from "../src/data/glossary.js";
import {
  UNBOUND_CAREERS,
  CLOSED_VOW_TREES,
  isUnboundCareer,
  isClosedVowCrossBlocked,
  isCareerTransitionBlockedPure,
  isManualCareerAllowedPure,
  evaluateDynamicOfferEligibilityPure
} from "../src/engine/careerRules.js";
import { runDistBundleGate } from "./qa/distGate.mjs";
import { runPersonaAuditGate } from "./qa/personaGate.mjs";

const DEEP_MODE = process.argv.includes("--deep");
const CHECK_DIST = process.argv.includes("--check-dist");
const ONLY_DIST = process.argv.includes("--only-dist");
const livesFlag = process.argv.find((a) => a.startsWith("--lives="));
const CUSTOM_LIVES_PER_FOCUS = livesFlag ? Math.max(10, parseInt(livesFlag.split("=")[1], 10) || 0) : 0;
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

const errors = [];
const warnings = [];
const fail = (gate, msg) => errors.push(`[Gate ${gate}] ${msg}`);

if (ONLY_DIST) {
  console.log("=== 1 / QUADRILLION : IMPERIALIS VITA — Gate 8 Production dist/ Bundle Isolation Check ===");
  runDistBundleGate({ rootDir: ROOT, readRel, fail, coreData: CORE_DATA, glossaryTerms: GLOSSARY_TERMS });
  console.log(`\n=== DIST CHECK SUMMARY: ${errors.length} ERRORS ===`);
  if (errors.length) {
    errors.forEach((e) => console.error("  ERROR: " + e));
    process.exit(1);
  }
  console.log("GATE 8 (PRODUCTION DIST BUNDLE ISOLATION & SSR) PASSED WITH 0 ERRORS.");
  process.exit(0);
}

console.log(
  `=== 1 / QUADRILLION : IMPERIALIS VITA — QA Regression Suite (ESM)${DEEP_MODE ? " [DEEP MODE]" : ""} ===`
);

// ============================================================================
// Gate 1: ESM 데이터 로드 · 파일 크기 상한 · CSS 검증
// ============================================================================
const runtime = await loadNodeImperiumRuntime();
const { DATA, Engine, coreFiles, eventFiles, chronFiles, eventSourceByIndex, chronSourceByIndex } = runtime;
const engineFiles = collectDirFiles("src/engine", [".js"]);

if (coreFiles.length === 0) fail(1, `No core data files found under ${path.join(ROOT, "src/data/core")}`);
if (eventFiles.length === 0 || DATA.EVENTS.length === 0) fail(1, `No event data loaded (files=${eventFiles.length}, events=${DATA.EVENTS.length})`);
if (chronFiles.length === 0 || DATA.CHRONICLES.length === 0) fail(1, `No chronicle data loaded (files=${chronFiles.length}, chronicles=${DATA.CHRONICLES.length})`);
if (engineFiles.length === 0) fail(1, `No engine files found under ${path.join(ROOT, "src/engine")}`);

// Stage 19-D3 unified size discipline: core/events/engine = 110KB·2200L hard cap (95KB·1950L warn); chronicles = 70KB·1400L (58KB·1200L warn)
const STD_MAX_KB = 110;
const STD_MAX_LINES = 2200;
const STD_WARN_KB = 95;
const STD_WARN_LINES = 1950;
const CHRON_MAX_KB = 70;
const CHRON_MAX_LINES = 1400;
const CHRON_WARN_KB = 58;
const CHRON_WARN_LINES = 1200;
let maxEvKB = 0;
let maxChKB = 0;
let maxCoreKB = 0;
let maxEngineKB = 0;

for (const s of [...coreFiles, "src/data/glossary.js", ...eventFiles, ...chronFiles, ...engineFiles]) {
  if (!fs.existsSync(path.join(ROOT, s))) continue;
  const rawSrc = readRel(s);
  const kb = Buffer.byteLength(rawSrc, "utf8") / 1024;
  const lineCount = rawSrc.split("\n").length;
  if (s.startsWith("src/data/chronicles/")) {
    if (kb > maxChKB) maxChKB = kb;
    if (kb > CHRON_MAX_KB || lineCount > CHRON_MAX_LINES) {
      fail(1, `Chronicle file exceeds 70KB/1400L limit: ${s} (${kb.toFixed(1)}KB, ${lineCount} lines)`);
    } else if (kb >= CHRON_WARN_KB || lineCount >= CHRON_WARN_LINES) {
      warnings.push(`Near-limit chronicle file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines / limit 70KB·1400L)`);
    }
  } else {
    let kindLabel = "file";
    if (s.startsWith("src/engine/")) {
      if (kb > maxEngineKB) maxEngineKB = kb;
      kindLabel = "engine";
    } else if (s.startsWith("src/data/core/") || s === "src/data/glossary.js") {
      if (kb > maxCoreKB) maxCoreKB = kb;
      kindLabel = s === "src/data/glossary.js" ? "glossary" : "core";
    } else if (s.startsWith("src/data/events/")) {
      if (kb > maxEvKB) maxEvKB = kb;
      kindLabel = "event";
    }
    if (kb > STD_MAX_KB || lineCount > STD_MAX_LINES) {
      fail(1, `${kindLabel} file exceeds unified 110KB/2200L limit: ${s} (${kb.toFixed(1)}KB, ${lineCount} lines)`);
    } else if (kb >= STD_WARN_KB || lineCount >= STD_WARN_LINES) {
      warnings.push(`Near-limit ${kindLabel} file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines / limit 110KB·2200L)`);
    }
  }
}

const cssPath = fs.existsSync(path.join(ROOT, "src/styles/global.css")) ? "src/styles/global.css" : null;
if (!cssPath) {
  fail(1, `Missing required stylesheet src/styles/global.css (ROOT=${ROOT})`);
} else {
  const cssSrc = readRel(cssPath);
  if (/@import\s+url\(/i.test(cssSrc)) {
    fail(1, `Blocking @import still present in ${cssPath} (use <link> in BaseLayout.astro)`);
  }
}

console.log(
  `[Gate 1] ESM data verified (${coreFiles.length} core, ${eventFiles.length} events, ${chronFiles.length} chronicles, ${engineFiles.length} engine, glossary=${DATA.GLOSSARY_TERMS.length}; ` +
  `maxCore=${maxCoreKB.toFixed(1)}KB, maxEngine=${maxEngineKB.toFixed(1)}KB, maxEv=${maxEvKB.toFixed(1)}KB, maxCh=${maxChKB.toFixed(1)}KB).`
);

// ============================================================================
// Gate 2: Astro/React 소스 정적 접근성 불변식 검증
// ============================================================================
const uiFiles = [
  ...collectDirFiles("src/layouts", [".astro"]),
  ...collectDirFiles("src/pages", [".astro"]),
  ...collectDirFiles("src/components", [".tsx", ".ts", ".jsx", ".js"])
];

let srLiveCount = 0;
if (uiFiles.length === 0) {
  fail(2, `No Astro/React UI files found under ${path.join(ROOT, "src")} (ROOT=${ROOT})`);
}
const FORBIDDEN_STATIC_ENGINE_RE = /\bfrom\s+["'][^"']*\/engine\/(?:createEngine|reqEvaluator|careerRules|careerActions|endings|travel|statCaps)\.js["']/;
const FORBIDDEN_DYNAMIC_ENGINE_RE = /\bimport\s*\(\s*["'][^"']*\/engine\/(?:createEngine|reqEvaluator|careerRules|careerActions|endings|travel|statCaps)\.js["']\s*\)/;
for (const f of uiFiles) {
  const src = readRel(f);
  // Single-letter keyboard shortcut ban (only Escape allowed)
  if (/addEventListener\s*\(\s*["']keydown["']/.test(src) || /onKeyDown/.test(src)) {
    const keyMatches = [...src.matchAll(/\.key\s*===\s*["']([^"']+)["']/g)].map((m) => m[1]);
    const badKeys = keyMatches.filter((k) => k.length === 1 && /[a-zA-Z]/.test(k));
    if (badKeys.length) {
      fail(2, `Forbidden single-letter key shortcut(s) in ${f}: ${badKeys.join(", ")}`);
    }
  }
  const liveMatches = src.match(/id=["']sr-live["']/g);
  if (liveMatches) srLiveCount += liveMatches.length;

  // Stage 19-D3 source-level static page engine isolation guard (catches tree-shaken named imports even after Rolldown minification)
  const isCodexOrGlossary =
    f.startsWith("src/pages/codex/") ||
    f.startsWith("src/pages/glossary/") ||
    f.startsWith("src/components/codex/") ||
    f.startsWith("src/components/glossary/");
  const isHall = f.startsWith("src/pages/hall/") || f.startsWith("src/components/hall/");
  if (isCodexOrGlossary && (FORBIDDEN_STATIC_ENGINE_RE.test(src) || FORBIDDEN_DYNAMIC_ENGINE_RE.test(src))) {
    fail(2, `Static Codex/Glossary file ${f} must not import simulation engine modules (use src/engine/formatters.js only)`);
  }
  if (isHall && FORBIDDEN_STATIC_ENGINE_RE.test(src)) {
    fail(2, `Hall file ${f} must not statically import simulation engine modules (only lazy dynamic import() of createEngine.js is allowed)`);
  }
}
if (srLiveCount === 0) {
  fail(2, "Missing #sr-live polite live region in src/ UI components");
}
// Stage 19-D1 static named spotlight a11y invariant (multi-line & attribute-order safe)
const activePanelPath = "src/components/game/ActiveEventPanel.tsx";
if (fs.existsSync(path.join(ROOT, activePanelPath))) {
  const apSrc = readRel(activePanelPath);
  const detailsMatch = apSrc.match(/<details\b[\s\S]*?>/g)?.find((tag) => /className=["'][^"']*\bnamed-spotlight\b/.test(tag));
  if (!detailsMatch) {
    fail(2, `${activePanelPath} missing <details className="named-spotlight"> element`);
  } else {
    if (/\bopen(?=\s|>|\/)/.test(detailsMatch) || /\bopen=\{true\}/.test(detailsMatch)) {
      fail(2, `${activePanelPath} hardcodes always-open named spotlight (must expand on first encounter and collapse on repeat encounter)`);
    }
    if (/\baria-label=/.test(detailsMatch)) {
      fail(2, `${activePanelPath} <details className="named-spotlight"> must not duplicate <summary> with aria-label`);
    }
  }
  const badgeMatch = apSrc.match(/<span\b[\s\S]*?>/g)?.find((tag) => /className=["'][^"']*\bev-badge\s+character\b/.test(tag));
  if (!badgeMatch || !/\baria-hidden=["']true["']/.test(badgeMatch)) {
    fail(2, `${activePanelPath} visual .ev-badge.character must carry aria-hidden="true" to avoid triple name announcement`);
  }
}
console.log(`[Gate 2] Static UI a11y & source import isolation verified (${uiFiles.length} Astro/React files, #sr-live declarations=${srLiveCount}).`);

// ============================================================================
// Gate 3: 나무위키 금지 구표기 · 장식 기호 금지 검사 (전 데이터 + 개념 사전 + UI)
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

const scanFiles = [
  ...coreFiles,
  "src/data/glossary.js",
  ...eventFiles,
  ...chronFiles,
  ...engineFiles,
  "src/lib/contextualGlossary.js",
  "src/lib/storage.ts",
  ...uiFiles
].filter((f) => fs.existsSync(path.join(ROOT, f)));

for (const f of scanFiles) {
  const txt = readRel(f);
  for (const re of forbiddenTerms) {
    const m = txt.match(re);
    if (m) fail(3, `Forbidden spelling "${m[0]}" in ${f}`);
  }
  const sm = txt.match(forbiddenSymbols);
  if (sm) fail(3, `Forbidden decorative symbol "${[...new Set(sm)].join("")}" in ${f}`);
}
console.log(`[Gate 3] Naming standard & decorative symbol scan complete (${scanFiles.length} files).`);

console.log(
  `[Data] WORLDS=${DATA.WORLDS.length}, ORIGINS=${DATA.ORIGINS.length}, TRAITS=${DATA.TRAITS.length}, ` +
  `CAREERS=${DATA.CAREERS.length}, CHAPTERS=${DATA.CHAPTERS.length}, CHARACTERS=${DATA.CHARACTERS.length}, ` +
  `TIMELINE=${DATA.TIMELINE.length}, EVENTS=${DATA.EVENTS.length}, CHRONICLES=${DATA.CHRONICLES.length}, ` +
  `GLOSSARY=${DATA.GLOSSARY_TERMS.length}`
);

// ============================================================================
// Gate 4G: 워해머 40k 주요 개념 사전 (GLOSSARY) & 상황별 매핑 무결성 검증
// ============================================================================
{
  const catIds = new Set(DATA.GLOSSARY_CATEGORIES.map((c) => c.id));
  const termIds = new Set();
  const validWorldIds = new Set(DATA.WORLDS.map((w) => w.id));
  const validOriginIds = new Set(DATA.ORIGINS.map((o) => o.id));
  const validTraitIds = new Set(DATA.TRAITS.map((t) => t.id));
  const selectableTrees = new Set(DATA.CAREERS.filter((c) => c.selectable).map((c) => c.tree));
  const validTreeIds = new Set([...selectableTrees].map((t) => `tree-${t}`));
  const validChapterIds = new Set(DATA.CHAPTERS.map((c) => c.id));
  const validTimelineIds = new Set(DATA.TIMELINE.map((t) => t.id));
  const validCharIds = new Set(DATA.CHARACTERS.map((c) => c.id));

  for (const item of DATA.GLOSSARY_TERMS) {
    if (!item || !item.id) {
      fail(4, "Glossary term missing id");
      continue;
    }
    if (termIds.has(item.id)) fail(4, `Duplicate glossary id "${item.id}"`);
    termIds.add(item.id);
    if (!catIds.has(item.category)) fail(4, `Glossary "${item.id}" references unknown category "${item.category}"`);
    for (const reqField of ["term", "en", "summary", "body", "inGameNote", "source"]) {
      if (!item[reqField] || typeof item[reqField] !== "string" || !item[reqField].trim()) {
        fail(4, `Glossary "${item.id}" missing required field "${reqField}"`);
      }
    }
  }
  for (const item of DATA.GLOSSARY_TERMS) {
    for (const relId of item.relatedGlossaryIds || []) {
      if (!termIds.has(relId)) fail(4, `Glossary "${item.id}" links to unknown relatedGlossaryId "${relId}"`);
      if (relId === item.id) fail(4, `Glossary "${item.id}" self-references in relatedGlossaryIds`);
    }
    for (const link of item.relatedCodexLinks || []) {
      const m = /^\/codex\/(worlds|careers|chapters|timeline|characters)\/(?:#([a-zA-Z0-9_-]+))?$/.exec(link.href || "");
      if (!m) {
        fail(4, `Glossary "${item.id}" has invalid codex link href "${link.href}"`);
        continue;
      }
      const [, section, anchor] = m;
      if (anchor) {
        const ok =
          (section === "worlds" && validWorldIds.has(anchor)) ||
          (section === "careers" && validTreeIds.has(anchor)) ||
          (section === "chapters" && validChapterIds.has(anchor)) ||
          (section === "timeline" && validTimelineIds.has(anchor)) ||
          (section === "characters" && validCharIds.has(anchor));
        if (!ok) fail(4, `Glossary "${item.id}" links to unknown codex anchor "${link.href}"`);
      }
    }
  }
  // Contextual DossierPanel glossary mapping validation
  for (const gid of Object.keys(CONTEXTUAL_GLOSSARY_LABELS)) {
    if (!termIds.has(gid)) fail(4, `contextualGlossary.js references unknown glossary id "${gid}"`);
  }
  for (const tree of selectableTrees) {
    const gid = CAREER_TREE_GLOSSARY[tree];
    if (!gid) fail(4, `contextualGlossary.js missing CAREER_TREE_GLOSSARY mapping for tree "${tree}"`);
    else if (!termIds.has(gid) || !CONTEXTUAL_GLOSSARY_LABELS[gid]) {
      fail(4, `contextualGlossary.js CAREER_TREE_GLOSSARY["${tree}"] -> invalid glossary id "${gid}"`);
    }
  }
  for (const [oid, gid] of Object.entries(ORIGIN_GLOSSARY)) {
    if (!validOriginIds.has(oid)) fail(4, `contextualGlossary.js ORIGIN_GLOSSARY unknown originId "${oid}"`);
    if (!termIds.has(gid) || !CONTEXTUAL_GLOSSARY_LABELS[gid]) {
      fail(4, `contextualGlossary.js ORIGIN_GLOSSARY["${oid}"] -> invalid glossary id "${gid}"`);
    }
  }
  for (const [tid, gid] of Object.entries(TRAIT_GLOSSARY)) {
    if (!validTraitIds.has(tid)) fail(4, `contextualGlossary.js TRAIT_GLOSSARY unknown traitId "${tid}"`);
    if (!termIds.has(gid) || !CONTEXTUAL_GLOSSARY_LABELS[gid]) {
      fail(4, `contextualGlossary.js TRAIT_GLOSSARY["${tid}"] -> invalid glossary id "${gid}"`);
    }
  }
  console.log(
    `[Gate 4G] Glossary verified (${DATA.GLOSSARY_CATEGORIES.length} categories, ${DATA.GLOSSARY_TERMS.length} terms, ` +
    `contextual mappings=${Object.keys(CONTEXTUAL_GLOSSARY_LABELS).length}, all 21 career trees valid).`
  );
}

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
  "clade_vindicare",
  "clade_callidus",
  "clade_eversor",
  "clade_culexus",
  ...DATA.ORIGINS.flatMap((o) => o.tags || []),
  ...DATA.TRAITS.flatMap((t) => t.tags || []),
  ...DATA.CAREERS.flatMap((c) => (c.onJoin && c.onJoin.addTags) || []),
  ...DATA.CHAPTERS.map((ch) => `chapter_${ch.id}`)
]);

function collectOutcomeTags(out) {
  if (!out) return;
  (out.addTags || []).forEach((t) => producedTags.add(t));
}
for (const ev of [...DATA.EVENTS, ...DATA.TIMELINE]) {
  for (const ch of (ev.choices || [])) {
    collectOutcomeTags(ch.effect);
    collectOutcomeTags(ch.success);
    collectOutcomeTags(ch.fail);
    collectOutcomeTags(ch.critSuccess);
    collectOutcomeTags(ch.critFail);
  }
}

const alignKeys = new Set(Engine.ALIGNMENT_KEYS || ["humane", "dogmatic", "ruthless"]);
const domAlignKeys = new Set(["humane", "dogmatic", "ruthless", "neutral"]);
const socialTierOrder = Engine.SOCIAL_TIER_ORDER || ["underclass", "common", "elite", "apex"];
const socialTierSet = new Set(socialTierOrder);
const lifeRealmSet = new Set(Engine.LIFE_REALM_KEYS || ["civilian", "cloistered", "military", "void", "mechanicus", "heretic"]);
const bodyClassSet = new Set(Engine.BODY_CLASS_KEYS || ["mortal", "augmetic", "transhuman", "dreadnought", "daemonic"]);
const careerTreeSet = new Set(DATA.CAREERS.map((c) => c.tree).filter(Boolean));

function validateAlignObj(obj, owner, allowNegative) {
  if (!obj) return;
  if (typeof obj !== "object" || Array.isArray(obj)) {
    fail(4, `Invalid align object in ${owner}`);
    return;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (!alignKeys.has(k)) fail(4, `Unknown alignment key "${k}" in ${owner}`);
    if (typeof v !== "number" || !Number.isFinite(v)) {
      fail(4, `Non-numeric alignment value "${v}" for "${k}" in ${owner}`);
    } else if (!allowNegative && (v < 0 || v > 100)) {
      fail(4, `Out-of-bounds alignment threshold ${v} for "${k}" in ${owner}`);
    } else if (allowNegative && (v < -100 || v > 100)) {
      fail(4, `Out-of-bounds alignment delta ${v} for "${k}" in ${owner}`);
    }
  }
}

function validateReq(req, owner) {
  if (!req) return;
  (req.anyWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown world "${w}" in ${owner}`); });
  (req.anyHomeWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown homeWorld "${w}" in ${owner}`); });
  (req.excludeWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown excludeWorld "${w}" in ${owner}`); });
  (req.excludeHomeWorlds || []).forEach((w) => { if (!worldIds.has(w)) fail(4, `Unknown excludeHomeWorld "${w}" in ${owner}`); });
  (req.anyCareers || []).forEach((c) => { if (!careerIds.has(c)) fail(4, `Unknown career "${c}" in ${owner}`); });
  (req.anyPastCareers || []).forEach((c) => { if (!careerIds.has(c)) fail(4, `Unknown pastCareer "${c}" in ${owner}`); });
  (req.excludePastCareers || []).forEach((c) => { if (!careerIds.has(c)) fail(4, `Unknown excludePastCareer "${c}" in ${owner}`); });
  (req.anyTrees || []).forEach((t) => { if (!careerTreeSet.has(t)) fail(4, `Unknown anyTree "${t}" in ${owner}`); });
  (req.excludeTrees || []).forEach((t) => { if (!careerTreeSet.has(t)) fail(4, `Unknown excludeTree "${t}" in ${owner}`); });
  if (req.maxCareerTier !== undefined && (typeof req.maxCareerTier !== "number" || req.maxCareerTier < 0 || req.maxCareerTier > 6)) {
    fail(4, `Invalid maxCareerTier "${req.maxCareerTier}" in ${owner}`);
  }
  if (req.minSocialTier && !socialTierSet.has(req.minSocialTier)) fail(4, `Unknown minSocialTier "${req.minSocialTier}" in ${owner}`);
  if (req.maxSocialTier && !socialTierSet.has(req.maxSocialTier)) fail(4, `Unknown maxSocialTier "${req.maxSocialTier}" in ${owner}`);
  if (req.minSocialTier && req.maxSocialTier && socialTierOrder.indexOf(req.minSocialTier) > socialTierOrder.indexOf(req.maxSocialTier)) {
    fail(4, `Contradictory minSocialTier "${req.minSocialTier}" > maxSocialTier "${req.maxSocialTier}" in ${owner}`);
  }
  (req.anySocialTiers || []).forEach((s) => { if (!socialTierSet.has(s)) fail(4, `Unknown socialTier "${s}" in ${owner}`); });
  (req.anyRealms || []).forEach((r) => { if (!lifeRealmSet.has(r)) fail(4, `Unknown realm "${r}" in ${owner}`); });
  (req.excludeRealms || []).forEach((r) => { if (!lifeRealmSet.has(r)) fail(4, `Unknown excludeRealm "${r}" in ${owner}`); });
  (req.anyBodyClasses || []).forEach((b) => { if (!bodyClassSet.has(b)) fail(4, `Unknown bodyClass "${b}" in ${owner}`); });
  (req.excludeBodyClasses || []).forEach((b) => { if (!bodyClassSet.has(b)) fail(4, `Unknown excludeBodyClass "${b}" in ${owner}`); });
  (req.anyChapters || []).forEach((c) => { if (!chapterIds.has(c)) fail(4, `Unknown chapter "${c}" in ${owner}`); });
  (req.excludeChapters || []).forEach((c) => { if (!chapterIds.has(c)) fail(4, `Unknown excludeChapter "${c}" in ${owner}`); });
  (req.anySegmenta || []).forEach((s) => { if (!segIds.has(s)) fail(4, `Unknown segmentum "${s}" in ${owner}`); });
  (req.anyFocus || []).forEach((f) => { if (!focusIds.has(f)) fail(4, `Unknown focus "${f}" in ${owner}`); });
  if (req.minAlign) validateAlignObj(req.minAlign, `${owner}.minAlign`, false);
  if (req.maxAlign) validateAlignObj(req.maxAlign, `${owner}.maxAlign`, false);
  if (req.minAlign && req.maxAlign) {
    for (const k of Object.keys(req.minAlign)) {
      if (req.maxAlign[k] !== undefined && req.minAlign[k] > req.maxAlign[k]) {
        fail(4, `Contradictory minAlign > maxAlign for "${k}" in ${owner}`);
      }
    }
  }
  (req.anyDominantAlign || []).forEach((a) => {
    if (!domAlignKeys.has(a)) fail(4, `Unknown dominant alignment "${a}" in ${owner}`);
  });
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
  if (ev.alignBias && !alignKeys.has(ev.alignBias)) {
    fail(4, `Unknown alignBias "${ev.alignBias}" on event ${ev.id}`);
  }
  (ev.characters || []).forEach((cid) => {
    if (!charIds.has(cid)) fail(4, `Unknown character "${cid}" in ${ev.id}`);
  });
  const choices = ev.choices || [];
  if (choices.filter((ch) => !ch.req).length === 0) {
    fail(5, `Softlock risk (0 unconditional choices) in ${ev.id}`);
  }
  const validStatKeys = new Set(Object.keys(Engine.STAT_META || {}));
  for (const ch of choices) {
    validateReq(ch.req, `${ev.id}:choice`);
    if (ch.req && !Engine.describeReq(ch.req)) {
      fail(4, `Empty describeReq on choice in ${ev.id}`);
    }
    if (ch.outcome !== undefined) {
      fail(4, `Choice in ${ev.id} uses dead field "outcome" (engine reads "effect" or "success"/"fail")`);
    }
    if (ch.check) {
      if (!validStatKeys.has(ch.check.stat)) {
        fail(4, `Invalid check.stat "${ch.check.stat}" in ${ev.id}`);
      }
      if (!ch.success || !ch.fail) {
        fail(4, `Checked choice in ${ev.id} missing required success/fail outcome`);
      }
    } else if (!ch.effect && !ch.success) {
      fail(4, `Unchecked choice in ${ev.id} missing effect/success outcome`);
    }
    if ((ch.critSuccess || ch.critFail) && !ch.check) {
      fail(4, `Choice in ${ev.id} defines critSuccess/critFail without a d100 check`);
    }
    [ch.effect, ch.success, ch.fail, ch.critSuccess, ch.critFail].forEach((o) => {
      if (!o) return;
      if (typeof o.text !== "string" || !o.text.trim()) {
        fail(4, `Missing or empty outcome.text in ${ev.id}`);
      }
      if (o.stats) {
        for (const sk of Object.keys(o.stats)) {
          if (!validStatKeys.has(sk)) fail(4, `Unknown outcome.stats key "${sk}" in ${ev.id}`);
        }
      }
      if (o.forceCareer && !careerIds.has(o.forceCareer)) fail(4, `Unknown forceCareer "${o.forceCareer}" in ${ev.id}`);
      if (o.moveWorld && !worldIds.has(o.moveWorld)) fail(4, `Unknown moveWorld "${o.moveWorld}" in ${ev.id}`);
      if (o.align) validateAlignObj(o.align, `${ev.id}:outcome.align`, true);
      (o.addTags || []).forEach((t) => {
        if (!t.startsWith("met_") && !t.startsWith("chapter_") && !tagLabels[t]) {
          fail(4, `Missing TAG_LABELS for added tag "${t}" in ${ev.id}`);
        }
      });
      (o.removeTags || []).forEach((t) => {
        if (!tagLabels[t]) {
          fail(4, `Missing TAG_LABELS for removed tag "${t}" in ${ev.id}`);
        }
      });
    });
  }
}

// Stage 21 invariants: 23 world perks, 12 traits (weights=100), 12 acquired traits, statCaps & removeTags
if (DATA.TRAITS.length !== 12) {
  fail(4, `Stage 21 expected 12 TRAITS, found ${DATA.TRAITS.length}`);
}
const traitWeightSum = DATA.TRAITS.reduce((acc, t) => acc + (t.weight || 0), 0);
if (Math.abs(traitWeightSum - 100) > 0.01) {
  fail(4, `Stage 21 TRAITS weight sum must equal 100 (got ${traitWeightSum})`);
}
for (const w of DATA.WORLDS) {
  if (!w.perk || !w.perk.name || !w.perk.desc) {
    fail(4, `Stage 21 world "${w.id}" missing lifetime perk metadata`);
  }
}
for (const tr of DATA.TRAITS) {
  if (!tr.talent || !tr.talent.name || !tr.talent.desc) {
    fail(4, `Stage 21 trait "${tr.id}" missing talent metadata`);
  }
}
{
  const childCapProbe = Engine.createCharacter({
    mode: "custom",
    worldId: "generic_civilised",
    originId: "imperial_citizen",
    traitId: "none",
    eraId: "armageddon",
    gender: "male"
  });
  const childWsCap = Engine.getStatCap(childCapProbe, "WS");
  if (childWsCap > 50) {
    fail(4, `Stage 21 child baseline WS cap expected <=50, got ${childWsCap}`);
  }
  childCapProbe.stats.WS = childWsCap;
  const overGain = Engine.applyDiminishedStatGain(childCapProbe, "WS", 5, "event");
  if (overGain !== 0 || childCapProbe.stats.WS !== childWsCap) {
    fail(4, `Stage 21 statCap hard ceiling failed: overGain=${overGain}, WS=${childCapProbe.stats.WS}`);
  }
  // removeTags + augmetics/penance healing test
  const healProbe = Engine.createCharacter({
    mode: "custom",
    worldId: "terra",
    originId: "planetary_noble",
    traitId: "none",
    eraId: "armageddon",
    gender: "female"
  });
  healProbe.age = 26;
  healProbe.careerId = "administratum";
  healProbe.stats.Inf = 60;
  healProbe.corruption = 20;
  healProbe.tags.push("crippled_limb", "shell_shocked");
  const penRes = Engine.performAction(healProbe, "penance");
  if (!penRes.ok || healProbe.tags.includes("shell_shocked")) {
    fail(4, "Stage 21 penance failed to heal shell_shocked");
  }
  const augRes = Engine.performAction(healProbe, "augmetics");
  if (!augRes.ok || healProbe.tags.includes("crippled_limb")) {
    fail(4, "Stage 21 augmetics failed to heal crippled_limb");
  }
}

// Krieg Vita-Womb family leak scan across all chronicles & events (child & adult)
const KRIEG_FAMILY_RE = /어머니|아버지|부모님|자장가|가족 식탁|가정식|엄마|아빠/;
const kriegCheckState = Engine.createCharacter({
  mode: "custom",
  worldId: "krieg",
  originId: "imperial_citizen",
  traitId: "none",
  eraId: "armageddon",
  gender: "male"
});
for (const ch of DATA.CHRONICLES) {
  validateReq(ch.req, ch.id);
  if (ch.alignBias && !alignKeys.has(ch.alignBias)) {
    fail(4, `Unknown alignBias "${ch.alignBias}" on chronicle ${ch.id}`);
  }
  if (ch.effects) {
    fail(4, `Chronicle ${ch.id} uses plural "effects" instead of "effect"`);
  }
  if (ch.effect && ch.effect.align) {
    validateAlignObj(ch.effect.align, `${ch.id}:effect.align`, true);
  }
  kriegCheckState.age = Math.max(1, (ch.req && ch.req.minAge) || 5);
  const cleaned = (ch.text || "").replace(/어머니의 품 대신/g, "");
  if (KRIEG_FAMILY_RE.test(cleaned) && Engine.checkReq(kriegCheckState, ch.req)) {
    fail(3, `Krieg Vita-Womb family leak in chronicle ${ch.id}`);
  }
}
const kriegAdultState = Engine.createCharacter({
  mode: "custom",
  worldId: "krieg",
  originId: "imperial_citizen",
  traitId: "none",
  eraId: "armageddon",
  gender: "male"
});
kriegAdultState.careerId = "astra_militarum";
kriegAdultState.tags = [...new Set([...kriegAdultState.tags, "militarum"])];
for (const ev of DATA.EVENTS) {
  const testAges = [
    Math.max(1, (ev.req && ev.req.minAge) || 10),
    Math.max(18, (ev.req && ev.req.minAge) || 25)
  ];
  for (const age of testAges) {
    const st = age < 14 ? kriegCheckState : kriegAdultState;
    st.age = age;
    st.year = st.birthYear + age;
    if (!Engine.checkReq(st, ev.req)) continue;
    const parts = [ev.title || "", ev.text || ""];
    for (const ch of ev.choices || []) {
      if (ch.req && !Engine.checkReq(st, ch.req)) continue;
      parts.push(ch.label || "");
      for (const o of [ch.effect, ch.success, ch.fail, ch.critSuccess, ch.critFail]) {
        if (o && o.text) parts.push(o.text);
      }
    }
    const cleaned = parts.join(" ").replace(/어머니의 품 대신/g, "");
    if (KRIEG_FAMILY_RE.test(cleaned)) {
      fail(3, `Krieg Vita-Womb family leak in event ${ev.id} (age ${age})`);
      break;
    }
  }
}

// Unit test: forceCareer downgrade protection, Astartes chaos redirect, dynamic offers, anyPastCareers, apex obituaries, save migration, honorable ending, status summary, Stage 16.5 alignment
{
  const cust = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "terra_high_blood", traitId: "none", eraId: "armageddon", gender: "male" });
  if (cust.saveVersion !== Engine.SAVE_VERSION) {
    fail(4, `createCharacter missing saveVersion (got ${cust.saveVersion}, expected ${Engine.SAVE_VERSION})`);
  }
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

  const marine = Engine.createCharacter({ mode: "custom", worldId: "macragge", originId: "underhive_scum", traitId: "none", eraId: "armageddon", gender: "male" });
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

  const recruit = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "underhive_scum", traitId: "none", eraId: "armageddon", gender: "male" });
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
  const gen = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "militarum_family", traitId: "none", eraId: "armageddon", gender: "male" });
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
  const dp = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "underhive_scum", traitId: "none", eraId: "armageddon", gender: "male" });
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

  // Stage 16.2 / 16.5: migrateState legacy save compatibility (including alignment backfill)
  const legacyRaw = {
    id: "soul_legacy_test",
    name: "구버전 테스트",
    gender: "male",
    birthYear: 985,
    year: 1005,
    age: 20,
    alive: true,
    worldId: "baal",
    homeWorldId: "baal",
    originId: "imperial_citizen",
    traitId: "none",
    careerId: "astra_militarum",
    stats: { WS: 40, BS: 42 },
    logs: []
  };
  const migrated = Engine.migrateState(legacyRaw);
  if (
    !migrated ||
    migrated.saveVersion !== Engine.SAVE_VERSION ||
    !migrated.tags.includes("imperial_nihilus") ||
    !migrated.declinedCareers ||
    migrated.stats.Int !== 25 ||
    !migrated.alignment ||
    migrated.alignment.humane !== 0 ||
    migrated.alignment.dogmatic !== 0 ||
    migrated.alignment.ruthless !== 0
  ) {
    fail(4, `migrateState failed to upgrade legacy save properly`);
  }

  // Stage 16.2: Honorable retirement / ending event (cancel keeps alive, confirm ends cleanly with obituary)
  cust.age = 220;
  if (!Engine.canRetireHonorably(cust).ok) {
    fail(4, `220-year-old Custodes should qualify for honorable ending`);
  }
  const openRes = Engine.performAction(cust, "retire_honorable");
  if (!openRes.ok || !cust.pendingEvent || !cust.pendingEvent.isHonorableEnding) {
    fail(4, `performAction(retire_honorable) did not open honorable ending event`);
  }
  Engine.resolvePendingChoice(cust, 1); // Cancel choice
  if (!cust.alive) fail(4, `Honorable ending cancel choice killed character`);
  Engine.performAction(cust, "retire_honorable");
  Engine.resolvePendingChoice(cust, 0); // Confirm honorable retirement
  if (cust.alive || !cust.finalGrade || !cust.finalGrade.rank.includes("TEN THOUSAND")) {
    fail(4, `Honorable ending confirm choice failed to conclude Custodes life cleanly`);
  }

  // Stage 16.2 / 16.5: buildStatusSummary screen reader clarity check
  const summary = Engine.buildStatusSummary(gen);
  if (!summary || !summary.includes(gen.name) || !summary.includes("도덕 성향") || forbiddenSymbols.test(summary)) {
    fail(4, `buildStatusSummary invalid or missing alignment/contains forbidden symbols: "${summary}"`);
  }

  // Stage 16.5: 3-way Alignment Engine Unit Tests
  const aTest = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "underhive_scum", traitId: "none", eraId: "armageddon", gender: "male" });
  aTest.age = 26;
  const info0 = Engine.getAlignmentInfo(aTest);
  if (info0.dominant !== "neutral" || info0.tier !== 0 || info0.label !== "실리적 중립") {
    fail(4, `Initial alignment info mismatch: ${JSON.stringify(info0)}`);
  }
  Engine.applyAlignDelta(aTest, { humane: 20, dogmatic: 20, ruthless: -5 });
  const infoTie = Engine.getAlignmentInfo(aTest);
  if (infoTie.dominant !== "neutral" || !infoTie.tied || infoTie.label !== "갈등하는 신념" || aTest.alignment.ruthless !== 0) {
    fail(4, `Tied alignment or clamp mismatch: ${JSON.stringify(infoTie)}`);
  }
  Engine.applyAlignDelta(aTest, { humane: 160 });
  if (aTest.alignment.humane !== 100 || Engine.getAlignmentInfo(aTest).dominant !== "humane" || Engine.getAlignmentInfo(aTest).tier !== 3) {
    fail(4, `Alignment upper clamp or tier 3 mismatch: ${JSON.stringify(Engine.getAlignmentInfo(aTest))}`);
  }
  if (!Engine.checkReq(aTest, { minAlign: { humane: 60 }, maxAlign: { ruthless: 10 }, anyDominantAlign: ["humane"] })) {
    fail(4, `checkReq alignment conditions failed on valid state`);
  }
  if (Engine.checkReq(aTest, { anyDominantAlign: ["ruthless"] })) {
    fail(4, `checkReq anyDominantAlign matched wrong dominant alignment`);
  }
  const descAlign = Engine.describeReq({ minAlign: { humane: 20 }, maxAlign: { ruthless: 15 }, anyDominantAlign: ["humane"] });
  if (!descAlign || !descAlign.includes("자비") || !descAlign.includes("암흑")) {
    fail(4, `describeReq alignment formatting failed: "${descAlign}"`);
  }

  // Underhive boss offer blocked for humane dominant
  aTest.careerId = "underhive_ganger";
  aTest.stats = { WS: 60, BS: 50, T: 55, Ag: 55, Int: 50, WP: 50, Fel: 60, Inf: 65 };
  const blockedCrimeOffer = Engine.createDynamicCareerOfferEvent(aTest, null, { forceOffer: true, targetCareerId: "hive_crime_lord" });
  if (blockedCrimeOffer && blockedCrimeOffer.offeredCareerId === "hive_crime_lord") {
    fail(4, `Humane dominant character was offered hive_crime_lord`);
  }

  // Ruthless secular villain separation, chaos_cultist shortcut (corr>=35 + ruthless>=40), obituary epilogue & penance shift
  const ruth = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "underhive_scum", traitId: "none", eraId: "armageddon", gender: "male" });
  ruth.age = 30;
  ruth.careerId = "menial_worker";
  ruth.corruption = 18;
  ruth.alignment = { humane: 0, dogmatic: 5, ruthless: 40 };
  if (Engine.checkReq(ruth, Engine.getCareer("chaos_cultist").req)) {
    fail(4, `Low-corruption secular ruthless character (corr=18) should not unlock chaos_cultist`);
  }
  const ruthGrade = Engine.evaluateLifeGrade(ruth);
  if (!ruthGrade.verdict.includes("세속적 악인")) {
    fail(4, `Secular ruthless obituary epilogue missing: "${ruthGrade.verdict}"`);
  }
  ruth.corruption = 36;
  if (!Engine.checkReq(ruth, Engine.getCareer("chaos_cultist").req)) {
    fail(4, `Ruthless >= 40 + corruption >= 35 shortcut failed to unlock chaos_cultist`);
  }
  ruth.year = 960;
  const penRes = Engine.performAction(ruth, "penance");
  if (!penRes.ok || ruth.alignment.ruthless !== 37 || ruth.alignment.dogmatic !== 6) {
    fail(4, `Penance failed to shift ruthless(-3) / dogmatic(+1): ${JSON.stringify(ruth.alignment)}`);
  }

  // Red-Team regression: Custodes, Grey Knight & Living Saint remain incorruptible even under forbidden focus
  for (const [cid, tag] of [["adeptus_custodes", "custodes"], ["grey_knight", "grey_knight"], ["living_saint", "living_saint"]]) {
    const inc = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "terra_high_blood", traitId: "none", eraId: "armageddon", gender: "male" });
    inc.age = 40;
    inc.careerId = cid;
    inc.tags.push(tag, "transhuman");
    inc.corruption = 0;
    inc.focus = "forbidden";
    for (let q = 0; q < 30; q++) {
      inc.pendingEvent = null;
      inc.wounds = inc.maxWounds;
      Engine.advanceQuarter(inc);
      inc.pendingEvent = null;
    }
    if (!inc.alive || inc.corruption !== 0) {
      fail(4, `Incorruptible ${cid} gained corruption under forbidden focus (alive=${inc.alive}, corr=${inc.corruption})`);
    }
  }

  // Stage 17: Officio Assassinorum clade choice (normal & blank -> Culexus + real attemptCareerChange auto-open + isolation), Living Saint real acceptCareerOffer & aspect SSOT, Knight High Queen title & generic_knight travel
  {
    const assNorm = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "schola_progenium", traitId: "none", eraId: "armageddon", gender: "female" });
    assNorm.age = 16;
    assNorm.stats = { WS: 50, BS: 52, T: 45, Ag: 99, Int: 45, WP: 52, Fel: 40, Inf: 35 };
    const origRand = Math.random;
    Math.random = () => 0.1; // guarantee trialCheck pass
    let joinRes;
    try {
      joinRes = Engine.attemptCareerChange(assNorm, "assassin_initiate");
    } finally {
      Math.random = origRand;
    }
    if (!joinRes || !joinRes.ok || !assNorm.pendingEvent || !(assNorm.pendingEvent.id || "").startsWith("dyn_assassin_clade_")) {
      fail(4, `attemptCareerChange(assassin_initiate) did not auto-open dyn_assassin_clade event`);
    }
    Engine.resolvePendingChoice(assNorm, 0);
    if (!assNorm.tags.includes("clade_vindicare")) {
      fail(4, `Resolving Vindicare choice did not grant clade_vindicare tag`);
    }
    // Isolation check: assassin must be blocked from manual non-assassin career change
    assNorm.age = 20;
    assNorm.stats = { WS: 70, BS: 70, T: 70, Ag: 70, Int: 70, WP: 70, Fel: 70, Inf: 70 };
    const escRes = Engine.attemptCareerChange(assNorm, "commissar");
    if (escRes.ok) {
      fail(4, `Assassin initiate was allowed to escape into commissar via attemptCareerChange`);
    }

    const assBlank = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "schola_progenium", traitId: "blank", eraId: "armageddon", gender: "male" });
    assBlank.age = 16;
    assBlank.stats = { WS: 50, BS: 50, T: 45, Ag: 56, Int: 45, WP: 52, Fel: 30, Inf: 35 };
    const culexEv = Engine.createAssassinCladeEvent(assBlank);
    if (!culexEv || !culexEv.choices.some((ch) => ch.effect && (ch.effect.addTags || []).includes("clade_culexus"))) {
      fail(4, `Blank assassin initiate was not offered Culexus clade`);
    }

    // Living Saint real acceptCareerOffer + aspect priority SSOT (wrath tag overrides humane alignment consistently)
    const snt = Engine.createCharacter({ mode: "custom", worldId: "ophelia7", originId: "ecclesiarchy_novice", traitId: "emperor_blessed", eraId: "armageddon", gender: "female" });
    snt.age = 36;
    snt.careerId = "saint_vessel";
    snt.tags.push("saint_vessel", "living_miracle", "align_beacon_mercy");
    snt.faith = 97;
    snt.corruption = 0;
    snt.alignment = { humane: 70, dogmatic: 10, ruthless: 0 };
    snt.stats = { WS: 75, BS: 65, T: 65, Ag: 65, Int: 70, WP: 99, Fel: 82, Inf: 75 };
    const sntOffer = Engine.createDynamicCareerOfferEvent(snt, null, { forceOffer: true, targetCareerId: "living_saint" });
    if (!sntOffer || sntOffer.offeredCareerId !== "living_saint") {
      fail(4, `createDynamicCareerOfferEvent failed to offer living_saint to eligible saint_vessel`);
    }
    snt.pendingEvent = sntOffer;
    Math.random = () => 0.1;
    try {
      Engine.resolvePendingChoice(snt, 0);
    } finally {
      Math.random = origRand;
    }
    if (snt.careerId !== "living_saint" || !snt.tags.includes("living_saint") || !snt.tags.includes("transhuman")) {
      fail(4, `Resolving living_saint offer did not transition cleanly via applyCareerJoinEffects`);
    }
    // Check explicit wrath tag beats humane dominant across title, action, and obituary
    snt.tags.push("saint_wrath_aspect");
    const wrathTitle = Engine.getCareerDisplayTitle(snt);
    const wrathAct = Engine.getCareerAction(snt);
    const wrathGrade = Engine.evaluateLifeGrade(snt);
    if (!wrathTitle.includes("심판의 성광") || !wrathAct.name.includes("심판의 성광") || !wrathGrade.title.includes("심판의 불꽃")) {
      fail(4, `Living Saint aspect priority mismatch: title="${wrathTitle}", act="${wrathAct && wrathAct.name}", obit="${wrathGrade.title}"`);
    }
    snt.tags = snt.tags.filter((t) => t !== "saint_wrath_aspect");
    snt.tags.push("saint_mercy_aspect");
    const sntGrade = Engine.evaluateLifeGrade(snt);
    if (!sntGrade.rank.includes("LIVING SAINT")) {
      fail(4, `Living Saint obituary rank mismatch: ${sntGrade.rank}`);
    }
    const sntTitle = Engine.getCareerDisplayTitle(snt);
    if (!sntTitle.includes("살아 있는 성녀") || !sntTitle.includes("자비의 성광")) {
      fail(4, `Female humane Living Saint display title mismatch: "${sntTitle}"`);
    }
    snt.age = 60;
    if (!Engine.canRetireHonorably(snt).ok) {
      fail(4, `Tier 6 Living Saint at age 60 should qualify for honorable ending`);
    }

    // Knight High Queen gender display title & generic_knight travel candidate
    const kq = Engine.createCharacter({ mode: "custom", worldId: "generic_knight", originId: "knight_house", traitId: "none", eraId: "armageddon", gender: "female" });
    kq.age = 42;
    kq.careerId = "knight_high_king";
    kq.tags.push("knight_high_king", "imperial_knight");
    const kqTitle = Engine.getCareerDisplayTitle(kq);
    if (!kqTitle.includes("하이 퀸")) {
      fail(4, `Female knight_high_king display title mismatch: "${kqTitle}"`);
    }
    const travFromTerra = Engine.getTravelCandidateWorlds(gen);
    if (!travFromTerra.some((w) => w.id === "generic_knight")) {
      fail(4, `generic_knight missing from getTravelCandidateWorlds`);
    }

    // Stage 18: 100% named character encounter, real met_* production & chronicle coverage + live preset->war simulation + obituary priority
    const allEvAndTl = [...DATA.EVENTS, ...DATA.TIMELINE];
    for (const ch of DATA.CHARACTERS) {
      const appeared = allEvAndTl.some((ev) => Array.isArray(ev.characters) && ev.characters.includes(ch.id));
      if (!appeared) fail(4, `Named character "${ch.id}" (${ch.name}) has 0 event/timeline appearances`);
      const metTag = `met_${ch.id}`;
      if (!producedTags.has(metTag)) fail(4, `Named character "${ch.id}" (${ch.name}) has 0 choice outcomes producing ${metTag}`);
      const hasMetChron = DATA.CHRONICLES.some((c) => {
        const r = c.req || {};
        return (Array.isArray(r.allTags) && r.allTags.includes(metTag)) ||
               (Array.isArray(r.anyTags) && r.anyTags.includes(metTag));
      });
      if (!hasMetChron) fail(4, `Named character "${ch.id}" (${ch.name}) has 0 ${metTag} chronicle follow-ups`);
    }
    const eraWarChecks = [
      { eraId: "gothic_war", tlId: "tl_gothic_war", worldId: "cadia" },
      { eraId: "first_armageddon", tlId: "tl_first_armageddon_shame", worldId: "armageddon" }
    ];
    for (const check of eraWarChecks) {
      const preset = (Engine.ERA_PRESETS || []).find((p) => p.id === check.eraId);
      const tl = DATA.TIMELINE.find((t) => t.id === check.tlId);
      if (!preset) fail(4, `Missing Stage 18 era preset "${check.eraId}"`);
      if (!tl) fail(4, `Missing Stage 18 timeline war "${check.tlId}"`);
      if (preset && tl) {
        const minReach = preset.maxYear + 14;
        const maxReach = preset.minYear + 45;
        if (tl.year < minReach || tl.year > maxReach) {
          fail(4, `Era preset "${check.eraId}" (${preset.minYear}~${preset.maxYear}) cannot naturally reach ${check.tlId} (${tl.year}; expected ${minReach}~${maxReach})`);
        }
        // Live runtime simulation confirming the preset actually fires the target war
        let fired = false;
        for (let trial = 0; trial < 10 && !fired; trial++) {
          const st = Engine.createCharacter({ mode: "custom", worldId: check.worldId, originId: "imperial_citizen", traitId: "none", eraId: check.eraId, gender: "male" });
          let q = 0;
          while (st.alive && st.year <= (tl.endYear || tl.year) + 1 && q < 180) {
            Engine.advanceQuarter(st, { fastChildhood: true });
            while (st.alive && st.pendingEvent) {
              if (st.pendingEvent.id === check.tlId) fired = true;
              const opts = st.pendingEvent.choices || [];
              const safeIdx = opts.findIndex((c) => !c.req);
              Engine.resolvePendingChoice(st, safeIdx >= 0 ? safeIdx : 0);
            }
            q++;
          }
          if (st.triggeredTimeline && st.triggeredTimeline.includes(check.tlId)) fired = true;
        }
        if (!fired) fail(4, `Era preset "${check.eraId}" failed to fire ${check.tlId} across 10 live simulation trials`);
      }
    }
    // Direct met_<id> tag must beat global dispatch metCharacters in obituary epilogue
    const epiTest = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "imperial_citizen", traitId: "none", eraId: "cadia_rift", gender: "male" });
    epiTest.metCharacters = ["abaddon", "guilliman", "trazyn"];
    epiTest.tags.push("met_trazyn");
    const epiText = Engine.evaluateLifeGrade(epiTest).verdict || "";
    if (!epiText.includes("솔렘나스")) {
      fail(4, `Direct met_trazyn epilogue was masked by global metCharacters: "${epiText}"`);
    }

    // Stage 19-S1: Declarative stratification unit tests (socialTier / lifeRealm / bodyClass / excludeTrees / maxCareerTier)
    const s19Desc = Engine.describeReq({
      minSocialTier: "common",
      maxSocialTier: "elite",
      anyRealms: ["civilian"],
      anyBodyClasses: ["mortal"],
      maxCareerTier: 3
    });
    if (!s19Desc || !s19Desc.includes("신분 계층") || !s19Desc.includes("생활권") || !s19Desc.includes("신체 분류") || !s19Desc.includes("Tier 3")) {
      fail(4, `describeReq failed for Stage 19-S1 stratification keys: "${s19Desc}"`);
    }
    const s19ExclDesc = Engine.describeReq({ excludeRealms: ["cloistered"], excludeBodyClasses: ["dreadnought"], excludeTrees: ["astartes"] });
    if (!s19ExclDesc) fail(4, `describeReq returned empty string for exclude-only stratification req`);

    const nobleKid = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "terra_high_blood", traitId: "none", eraId: "armageddon", gender: "male" });
    nobleKid.age = 7;
    const nobleStrat = Engine.getStratification(nobleKid);
    if (nobleStrat.socialTier !== "elite" || nobleStrat.lifeRealm !== "civilian" || nobleStrat.bodyClass !== "mortal") {
      fail(4, `Terra high-blood kid stratification mismatch: ${JSON.stringify(nobleStrat)}`);
    }
    if (Engine.checkReq(nobleKid, { maxSocialTier: "common" })) {
      fail(4, `Terra high-blood kid should fail maxSocialTier: "common"`);
    }
    if (!Engine.checkReq(nobleKid, { minSocialTier: "elite", anyRealms: ["civilian"], anyBodyClasses: ["mortal"] })) {
      fail(4, `Terra high-blood kid should pass elite/civilian/mortal stratification check`);
    }

    // Stage 19-S2: SAVE_VERSION 4, 14-17 noble apprenticeship, admission exam & cooldowns, sworn lock & scout offer, canAccessWorld & forced travel lock, diminished growth & computeCheckPreview
    if (Engine.SAVE_VERSION !== 4) {
      fail(4, `Expected SAVE_VERSION === 4 for Stage 19-S2, got ${Engine.SAVE_VERSION}`);
    }
    const legV3 = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    delete legV3.careerRetryAfter;
    delete legV3.lastCareerChangeYear;
    legV3.saveVersion = 3;
    const migV4 = Engine.migrateState(legV3);
    if (!migV4 || migV4.saveVersion !== 4 || typeof migV4.careerRetryAfter !== "object" || migV4.lastCareerChangeYear !== -999) {
      fail(4, `SAVE_VERSION 3 -> 4 migration failed for careerRetryAfter/lastCareerChangeYear`);
    }

    // Rule 1: planetary_noble stays child during ages 14-18 (allows minAge:18 institutions!), auto-assigns administratum at age 19; navigator still assigns at 14
    const nob14 = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "planetary_noble", traitId: "none", eraId: "armageddon", gender: "male" });
    nob14.age = 13;
    nob14.quarter = 3;
    nob14.year = nob14.birthYear + 13;
    Engine.advanceQuarter(nob14);
    if (nob14.age !== 14 || nob14.careerId !== "child") {
      fail(4, `Planetary noble should remain child during 14-18 apprenticeship, got careerId=${nob14.careerId}`);
    }
    nob14.pendingEvent = null;
    nob14.age = 17;
    nob14.quarter = 3;
    nob14.year = nob14.birthYear + 17;
    nob14.wounds = 100;
    Engine.advanceQuarter(nob14);
    if (nob14.age !== 18 || nob14.careerId !== "child") {
      fail(4, `Planetary noble at age 18 should still have full age-18 window to choose minAge:18 institutions, got ${nob14.careerId}`);
    }
    nob14.pendingEvent = null;
    nob14.age = 18;
    nob14.quarter = 3;
    nob14.year = nob14.birthYear + 18;
    nob14.wounds = 100;
    Engine.advanceQuarter(nob14);
    if (nob14.age !== 19 || nob14.careerId !== "administratum") {
      fail(4, `Planetary noble still child entering age 19 should auto-assign to administratum, got ${nob14.careerId}`);
    }
    const nav14 = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "navigator_house", traitId: "none", eraId: "armageddon", gender: "female" });
    nav14.age = 13;
    nav14.quarter = 3;
    nav14.year = nav14.birthYear + 13;
    Engine.advanceQuarter(nav14);
    if (nav14.careerId !== "nav_apprentice") {
      fail(4, `Navigator origin should auto-assign to nav_apprentice at 14, got ${nav14.careerId}`);
    }

    // Rule 2: Non-lethal d100 admission exam (40-88%), 2-yr retry cooldown, 2-yr minimum service cooldown, sworn horizontal lock, closed-vow guard, psyker demotion guard & scout offer exemption
    const appSt = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    appSt.age = 20;
    appSt.year = 960;
    appSt.careerId = "menial_worker";
    appSt.careerHistory = ["child", "menial_worker"];
    appSt.stats = { WS: 42, BS: 42, T: 42, Ag: 42, Int: 46, WP: 44, Fel: 42, Inf: 55 };
    const admPrev = Engine.getAdmissionPreview(appSt, "administratum");
    if (!admPrev || admPrev.target < 40 || admPrev.target > 88) {
      fail(4, `getAdmissionPreview target out of [40,88] range: ${JSON.stringify(admPrev)}`);
    }
    Math.random = () => 0.99; // force admission failure
    let admFailRes;
    try {
      admFailRes = Engine.attemptCareerChange(appSt, "administratum");
    } finally {
      Math.random = origRand;
    }
    if (!admFailRes || admFailRes.ok || !admFailRes.denied || !appSt.alive || appSt.careerRetryAfter.administratum !== 962) {
      fail(4, `Admission failure must be non-lethal and set 2-yr retry cooldown: ${JSON.stringify(admFailRes)}`);
    }
    const retryBlocked = Engine.attemptCareerChange(appSt, "administratum");
    if (retryBlocked.ok || !retryBlocked.cooldown) {
      fail(4, `Immediate retry after admission failure was not blocked by 2-yr retry cooldown`);
    }
    appSt.year = 962;
    Math.random = () => 0.01; // force admission pass
    let admPassRes;
    try {
      admPassRes = Engine.attemptCareerChange(appSt, "administratum");
    } finally {
      Math.random = origRand;
    }
    if (!admPassRes || !admPassRes.ok || appSt.careerId !== "administratum" || appSt.lastCareerChangeYear !== 962) {
      fail(4, `Admission pass failed to join administratum and record lastCareerChangeYear: ${JSON.stringify(admPassRes)}`);
    }
    // Sworn institution horizontal shopping must be blocked manually even after cooldown
    appSt.year = 965;
    appSt.stats.WP = 55;
    appSt.stats.WS = 55;
    appSt.stats.Inf = 58;
    const horizBlocked = Engine.attemptCareerChange(appSt, "arbites");
    if (horizBlocked.ok || Engine.isManualCareerAllowed(appSt, Engine.getCareer("arbites"))) {
      fail(4, `Sworn institution (administratum) was allowed manual horizontal transfer to arbites`);
    }
    // Previously held career repeat must be rejected in attemptCareerChange
    const repeatBlocked = Engine.attemptCareerChange(appSt, "menial_worker");
    if (repeatBlocked.ok) {
      fail(4, `attemptCareerChange allowed re-joining previously held career menial_worker`);
    }
    // Apex Tier 5/6 latent psyker must NOT be allowed to manually demote into Tier-3 sanctioned_psyker
    const apexPsy = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "planetary_noble", traitId: "psyker", eraId: "armageddon", gender: "male" });
    apexPsy.age = 45;
    apexPsy.careerId = "inquisitor";
    apexPsy.stats.WP = 70;
    if (Engine.isManualCareerAllowed(apexPsy, Engine.getCareer("sanctioned_psyker"))) {
      fail(4, `Tier 5 inquisitor was allowed manual demotion into Tier 3 sanctioned_psyker`);
    }
    // Closed-vow order (mechanicus) must NOT be scouted into unrelated mundane careers like arbites
    const mechSt = Engine.createCharacter({ mode: "custom", worldId: "mars", originId: "mechanicus_menial", traitId: "none", eraId: "armageddon", gender: "male" });
    mechSt.age = 24;
    mechSt.year = 960;
    mechSt.careerId = "skitarii";
    mechSt.careerHistory = ["child", "skitarii"];
    mechSt.tags.push("mechanicus", "bionic");
    mechSt.stats = { WS: 50, BS: 50, T: 50, Ag: 50, Int: 55, WP: 55, Fel: 50, Inf: 60 };
    const badScout = Engine.createDynamicCareerOfferEvent(mechSt, null, { forceOffer: true, ignoreCooldown: true, targetCareerId: "arbites" });
    if (badScout && badScout.offeredCareerId === "arbites") {
      fail(4, `Closed-vow Skitarii was poached into unrelated arbites via Scout Invitation`);
    }
    // Same-tree 2-yr minimum service cooldown enforcement
    appSt.lastCareerChangeYear = 965;
    appSt.careerId = "astra_militarum";
    appSt.careerHistory = ["child", "astra_militarum"];
    appSt.stats = { WS: 50, BS: 50, T: 50, Ag: 50, Int: 50, WP: 50, Fel: 50, Inf: 55 };
    const servBlocked = Engine.attemptCareerChange(appSt, "militarum_sergeant");
    if (servBlocked.ok || !servBlocked.cooldown) {
      fail(4, `Same-tree manual promotion within 2-yr minimum service period was not blocked`);
    }
    // Dynamic Scout Invitation bypasses manual horizontal lock & 2-yr service cooldown
    const scoutEv = Engine.createDynamicCareerOfferEvent(appSt, null, { forceOffer: true, ignoreCooldown: true, targetCareerId: "arbites" });
    if (!scoutEv || !scoutEv.isScoutOffer || scoutEv.offeredCareerId !== "arbites") {
      fail(4, `createDynamicCareerOfferEvent failed to generate cross-institution Scout Invitation for arbites`);
    }
    appSt.pendingEvent = scoutEv;
    Engine.resolvePendingChoice(appSt, 0);
    if (appSt.careerId !== "arbites") {
      fail(4, `Accepting Scout Invitation did not bypass manual lock and transition to arbites`);
    }

    // Rule 3: canAccessWorld matrix (Treaty of Mars, Imperial Fists Terra, Chapter homeworlds), forced-duty travel lock, Chaos transit isolation, noble Inf scope, 4yr/3yr cooldown
    const civTrav = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    civTrav.age = 24;
    civTrav.year = 950;
    civTrav.careerId = "menial_worker";
    civTrav.faith = 40;
    civTrav.stats.Inf = 25;
    for (const restrictedId of ["baal", "fenris", "nocturne", "terra", "mars", "krieg", "catachan"]) {
      if (Engine.canAccessWorld(civTrav, restrictedId).allowed) {
        fail(4, `Ordinary civilian (faith 40, Inf 25) should be denied access to ${restrictedId}`);
      }
    }
    if (!Engine.canAccessWorld(civTrav, "armageddon").allowed) {
      fail(4, `Ordinary civilian should be allowed access to armageddon`);
    }
    // Blood Angels chapter match -> Baal allowed, Fenris denied; Imperial Fists scout -> Terra allowed
    const baSt = Engine.createCharacter({ mode: "custom", worldId: "macragge", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    baSt.age = 60;
    baSt.year = 950;
    baSt.careerId = "astartes_brother";
    baSt.chapterId = "blood_angels";
    baSt.tags.push("astartes", "transhuman");
    if (!Engine.canAccessWorld(baSt, "baal").allowed || Engine.canAccessWorld(baSt, "fenris").allowed) {
      fail(4, `Blood Angels brother access mismatch (baal allowed, fenris denied in peacetime)`);
    }
    const ifScout = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "imperial_citizen", traitId: "geneseed_compatible", eraId: "armageddon", gender: "male" });
    ifScout.age = 17;
    ifScout.careerId = "astartes_scout";
    ifScout.chapterId = "imperial_fists";
    if (!Engine.canAccessWorld(ifScout, "terra").allowed) {
      fail(4, `Imperial Fists scout should be allowed access to Terra`);
    }
    // Noble with Inf >= 45 -> Terra & Mars allowed, galaxy scope; Inf < 45 -> near scope & Terra/Mars denied
    const nobTrav = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "planetary_noble", traitId: "none", eraId: "armageddon", gender: "female" });
    nobTrav.age = 22;
    nobTrav.year = 950;
    nobTrav.careerId = "menial_worker";
    nobTrav.faith = 40;
    nobTrav.stats.Inf = 38;
    if (Engine.getTravelProfile(nobTrav).scope !== "near" || Engine.canAccessWorld(nobTrav, "terra").allowed || Engine.canAccessWorld(nobTrav, "mars").allowed) {
      fail(4, `Noble with Inf 38 should have near scope and be denied Terra/Mars petition`);
    }
    nobTrav.stats.Inf = 48;
    if (Engine.getTravelProfile(nobTrav).scope !== "galaxy" || !Engine.canAccessWorld(nobTrav, "terra").allowed || !Engine.canAccessWorld(nobTrav, "mars").allowed) {
      fail(4, `Noble with Inf 48 should have galaxy scope and pass Terra/Mars petition`);
    }
    // Devout pilgrimage (faith >= 65) unlocks Terra, but Treaty of Mars blocks Imperial Cult pilgrimage on Mars
    civTrav.faith = 68;
    if (!Engine.canAccessWorld(civTrav, "terra").allowed || Engine.canAccessWorld(civTrav, "mars").allowed) {
      fail(4, `Devout citizen (faith 68) must be allowed on Terra and denied Imperial Cult pilgrimage on Mars (Treaty of Mars)`);
    }
    // Forced-duty soldier travel locked manually
    const grdLock = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "militarum_family", traitId: "none", eraId: "armageddon", gender: "male" });
    grdLock.age = 20;
    grdLock.careerId = "astra_militarum";
    const grdProf = Engine.getTravelProfile(grdLock);
    if (grdProf.canAttempt || !grdProf.forcedLock || Engine.getTravelCandidateWorlds(grdLock).length !== 0) {
      fail(4, `Forced-duty astra_militarum must lock manual travel selection`);
    }
    // Cooldown 4yr for mid, 3yr for autonomous
    const midCd = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    midCd.age = 25;
    midCd.year = 963;
    midCd.lastTravelYear = 960;
    midCd.careerId = "imperial_navy";
    if (Engine.getTravelProfile(midCd).canAttempt) {
      fail(4, `Mid-tier travel cooldown must be 4 years (year 963 after 960 should still be blocked)`);
    }
    midCd.careerId = "rogue_trader";
    if (!Engine.getTravelProfile(midCd).canAttempt) {
      fail(4, `Autonomous travel cooldown must be 3 years (year 963 after 960 should be open)`);
    }

    // Pillar 4: Zero-decay diminished stat gain & computeCheckPreview SSOT (90% cap + modifiers + Chaos corruption exemption)
    const dimSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    dimSt.careerId = "menial_worker";
    dimSt.stats.Inf = 86;
    const passAt86 = Engine.applyDiminishedStatGain(dimSt, "Inf", 2, "passive");
    if (passAt86 !== 0 || dimSt.stats.Inf !== 86) {
      fail(4, `Non-specialty mortal passive gain at 86 must be 0 (zero decay), got delta=${passAt86}`);
    }
    dimSt.careerId = "master_of_administratum";
    dimSt.stats.Inf = 92;
    const evAt92 = Engine.applyDiminishedStatGain(dimSt, "Inf", 1, "event");
    if (evAt92 < 1 || dimSt.stats.Inf !== 93) {
      fail(4, `Branching event gain at 92 must still grant at least +1 (Tier 6 reachability), got delta=${evAt92}`);
    }
    const chkSt = Engine.createCharacter({ mode: "custom", worldId: "baal", originId: "planetary_noble", traitId: "none", eraId: "indomitus", gender: "male" });
    chkSt.age = 45;
    chkSt.careerId = "inquisitor"; // Tier 5 -> 고위 난제 -9
    chkSt.wounds = 40; // 부상 -8
    chkSt.corruption = 50; // 워프 오염 -8
    chkSt.tags.push("inquisitor", "imperial_nihilus"); // 임페리움 니힐루스 -5
    chkSt.stats.Int = 95;
    const prevCheck = Engine.computeCheckPreview(chkSt, { stat: "Int", diff: 0 });
    if (prevCheck.modifiers.length !== 4 || prevCheck.target !== 65) {
      fail(4, `computeCheckPreview situational modifiers mismatch (Tier 5): ${JSON.stringify(prevCheck)}`);
    }
    chkSt.careerId = "inquisition_interrogator"; // Tier 4 -> 고위 난제 -5
    const prevCheckT4 = Engine.computeCheckPreview(chkSt, { stat: "Int", diff: 0 });
    if (prevCheckT4.modifiers.length !== 4 || prevCheckT4.target !== 69) {
      fail(4, `computeCheckPreview situational modifiers mismatch (Tier 4): ${JSON.stringify(prevCheckT4)}`);
    }
    // Chaos Lord at high corruption must NOT receive corruption penalty
    chkSt.careerId = "chaos_lord";
    chkSt.wounds = 100;
    chkSt.corruption = 85;
    chkSt.tags = ["heretic", "chaos_aligned", "chaos_lord"];
    const chaosPrev = Engine.computeCheckPreview(chkSt, { stat: "WP", diff: 0 });
    if (chaosPrev.modifiers.some((m) => m.label.includes("오염"))) {
      fail(4, `Chaos Lord should be exempt from corruption check penalty: ${JSON.stringify(chaosPrev)}`);
    }
    chkSt.wounds = 100;
    chkSt.corruption = 0;
    chkSt.tags = [];
    chkSt.careerId = "menial_worker";
    chkSt.stats.Int = 100;
    const capPrev = Engine.computeCheckPreview(chkSt, { stat: "Int", diff: 20 });
    const capRoll = Engine.rollD100(chkSt, { stat: "Int", diff: 20 });
    if (capPrev.target !== 90 || !capPrev.capped || capRoll.target !== capPrev.target) {
      fail(4, `computeCheckPreview cap/SSOT sync failed: preview=${capPrev.target}, roll=${capRoll.target}`);
    }

    // Red-Team P1-1: getContextualOptions must pass real alignInfo (with .dominant) to isCareerTransitionBlocked
    const humGang = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "underhive_scum", traitId: "none", eraId: "armageddon", gender: "male" });
    humGang.age = 22;
    humGang.year = 962;
    humGang.careerId = "underhive_ganger";
    humGang.careerHistory = ["child", "underhive_ganger"];
    humGang.stats = { WS: 55, BS: 45, T: 45, Ag: 50, Int: 40, WP: 45, Fel: 50, Inf: 55 };
    humGang.alignment = { humane: 35, dogmatic: 0, ruthless: 0 };
    const humOpts = Engine.getContextualOptions(humGang);
    if (humOpts.unlockedCareers.some((c) => c.id === "underhive_boss")) {
      fail(4, `Humane underhive_ganger must NOT see underhive_boss in getContextualOptions.unlockedCareers`);
    }
    humGang.careerId = "underhive_boss";
    humGang.age = 30;
    const humBossOpts = Engine.getContextualOptions(humGang);
    if (humBossOpts.readyEventCareers.some((c) => c.id === "hive_crime_lord")) {
      fail(4, `Humane underhive_boss must NOT see hive_crime_lord in getContextualOptions.readyEventCareers`);
    }

    // Red-Team P1-2: Closed-vow orders blocked from event-mode cross-offers (crime lord/governor/general) and manual rt_seneschal escape
    const sorTest = Engine.createCharacter({ mode: "custom", worldId: "ophelia7", originId: "planetary_noble", traitId: "none", eraId: "armageddon", gender: "female" });
    sorTest.age = 30;
    sorTest.year = 970;
    sorTest.careerId = "adepta_sororitas";
    sorTest.careerHistory = ["child", "sororitas_novitiate", "adepta_sororitas"];
    sorTest.tags.push("sororitas", "rogue_trader_blood");
    sorTest.stats = { WS: 62, BS: 55, T: 55, Ag: 52, Int: 55, WP: 65, Fel: 62, Inf: 65 };
    sorTest.alignment = { humane: 0, dogmatic: 0, ruthless: 45 };
    if (Engine.isManualCareerAllowed(sorTest, Engine.getCareer("rt_seneschal"))) {
      fail(4, `Closed-vow adepta_sororitas must NOT be allowed manual rt_seneschal transition`);
    }
    const sorCrimeOffer = Engine.createDynamicCareerOfferEvent(sorTest, null, { forceOffer: true, ignoreCooldown: true, targetCareerId: "hive_crime_lord" });
    if (sorCrimeOffer && sorCrimeOffer.offeredCareerId === "hive_crime_lord") {
      fail(4, `Closed-vow adepta_sororitas must NOT receive hive_crime_lord offer`);
    }
    const kngTest = Engine.createCharacter({ mode: "custom", worldId: "generic_knight", originId: "knight_house", traitId: "none", eraId: "armageddon", gender: "male" });
    kngTest.age = 45;
    kngTest.year = 975;
    kngTest.careerId = "knight_scion";
    kngTest.careerHistory = ["child", "knight_squire", "knight_scion"];
    kngTest.tags.push("imperial_knight", "imperial_military", "noble");
    kngTest.stats = { WS: 75, BS: 65, T: 65, Ag: 60, Int: 78, WP: 75, Fel: 80, Inf: 90 };
    const kngGovOffer = Engine.createDynamicCareerOfferEvent(kngTest, null, { forceOffer: true, ignoreCooldown: true, targetCareerId: "planetary_governor" });
    if (kngGovOffer && kngGovOffer.offeredCareerId === "planetary_governor") {
      fail(4, `Closed-vow knight_scion must NOT receive planetary_governor offer`);
    }
    const kngGenOffer = Engine.createDynamicCareerOfferEvent(kngTest, null, { forceOffer: true, ignoreCooldown: true, targetCareerId: "militarum_general" });
    if (kngGenOffer && kngGenOffer.offeredCareerId === "militarum_general") {
      fail(4, `Closed-vow knight_scion must NOT receive militarum_general offer`);
    }

    // Red-Team P1-3: Survived dynamic trialFailFor must set 2-yr careerRetryAfter blocking same-quarter manual retry
    const triSt = Engine.createCharacter({ mode: "custom", worldId: "macragge", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    triSt.age = 16;
    triSt.year = 956;
    triSt.careerId = "pdf_trooper";
    triSt.wounds = 100;
    triSt.stats = { WS: 60, BS: 55, T: 60, Ag: 55, Int: 45, WP: 55, Fel: 40, Inf: 35 };
    triSt.pendingEvent = Engine.createDynamicCareerOfferEvent(triSt, null, { forceOffer: true, ignoreCooldown: true, targetCareerId: "astartes_scout" });
    if (triSt.pendingEvent && triSt.pendingEvent.offeredCareerId === "astartes_scout") {
      const savedRnd = Math.random;
      Math.random = () => 0.99; // fail d100 trialCheck AND survive failDeathChance (< 0.25)
      try {
        Engine.resolvePendingChoice(triSt, 0);
      } finally {
        Math.random = savedRnd;
      }
      if (!triSt.alive || triSt.careerRetryAfter.astartes_scout !== 958) {
        fail(4, `Survived dynamic trialFailFor must set careerRetryAfter to year+2 (958), got alive=${triSt.alive}, retry=${triSt.careerRetryAfter.astartes_scout}`);
      }
      const sameQRetry = Engine.attemptCareerChange(triSt, "astartes_scout");
      if (sameQRetry.ok || !sameQRetry.cooldown) {
        fail(4, `Same-quarter manual retry after failed dynamic trialCheck must be blocked by cooldown: ${JSON.stringify(sameQRetry)}`);
      }
    }

    // Red-Team P2-4: Feral world commoner travel blocked + Tanith pre-destruction warp time-dilation blocked
    const feralSt = Engine.createCharacter({ mode: "custom", worldId: "generic_feral", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
    feralSt.age = 22;
    feralSt.careerId = "menial_worker";
    feralSt.stats.Inf = 35;
    if (Engine.getTravelProfile(feralSt).canAttempt) {
      fail(4, `Commoner on generic_feral must not be allowed manual pilgrim ship travel`);
    }
    const tanithWorld = Engine.getWorld("tanith");
    const tanSt = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "militarum_family", traitId: "none", eraId: "sabbat", gender: "male" });
    tanSt.year = 764;
    tanSt.age = 24;
    for (let k = 0; k < 20; k++) {
      const warpEv = Engine.createWarpAnomalyTransitEvent(tanSt, tanithWorld);
      if (warpEv && warpEv.id && warpEv.id.includes("dilation")) {
        fail(4, `Tanith warp anomaly at year 764 must NOT trigger time dilation past destroyedYear 765`);
      }
    }

    // Stage 19-A: Named spotlight cardinality discipline (AGENTS.md 2.2(6): <=1 per TIMELINE/normal event, <=2 only in named_crossover.js)
    for (const tl of DATA.TIMELINE) {
      const cnt = Array.isArray(tl.characters) ? tl.characters.length : 0;
      if (cnt > 1) {
        fail(4, `TIMELINE "${tl.id}" violates AGENTS.md 2.2(6) single-spotlight rule (${cnt} characters: ${tl.characters.join(", ")})`);
      }
    }
    DATA.EVENTS.forEach((ev, idx) => {
      const cnt = Array.isArray(ev.characters) ? ev.characters.length : 0;
      const srcFile = eventSourceByIndex[idx] || "";
      const isCrossover = srcFile === "src/data/events/themes/named_crossover.js";
      if (!isCrossover && cnt > 1) {
        fail(4, `Non-crossover event "${ev.id}" (${srcFile}) has ${cnt} characters (max 1 allowed outside named_crossover.js)`);
      }
      if (isCrossover && cnt > 2) {
        fail(4, `Crossover event "${ev.id}" has ${cnt} characters (max 2 allowed)`);
      }
    });
    const requiredS19aXovers = [
      "ev_s19a_xover_yarrick_ghazghkull",
      "ev_s19a_xover_creed_celestine",
      "ev_s19a_xover_dante_guilliman",
      "ev_s19a_xover_guilliman_cawl",
      "ev_s19a_xover_calgar_abaddon",
      "ev_s19a_xover_guilliman_mortarion"
    ];
    for (const xid of requiredS19aXovers) {
      const ev = DATA.EVENTS.find((e) => e.id === xid);
      if (!ev || !Array.isArray(ev.characters) || ev.characters.length !== 2) {
        fail(4, `Missing or malformed Stage 19-A 2-person crossover "${xid}"`);
      }
    }

    // Stage 19-B: Chronological integrity of split TIMELINE modules & shared resolveFactionEndingKey SSOT
    for (let i = 1; i < DATA.TIMELINE.length; i++) {
      if (DATA.TIMELINE[i].year < DATA.TIMELINE[i - 1].year) {
        fail(4, `Split TIMELINE order regressed: ${DATA.TIMELINE[i - 1].id}(${DATA.TIMELINE[i - 1].year}) -> ${DATA.TIMELINE[i].id}(${DATA.TIMELINE[i].year})`);
      }
    }
    const factionMatrix = [
      { careerId: "daemon_prince", tags: ["heretic", "daemon_prince"], expected: "daemon_prince" },
      { careerId: "chaos_lord", tags: ["heretic", "chaos_lord"], expected: "chaos_heretic" },
      { careerId: "living_saint", tags: ["living_saint"], expected: "living_saint" },
      { careerId: "saint_vessel", tags: ["saint_vessel", "saint_spark"], expected: "imperial_standard" },
      { careerId: "custodes_captain_general", tags: ["custodes", "captain_general", "high_lord_terra"], expected: "custodes" },
      { careerId: "astartes_brother", tags: ["astartes", "dreadnought"], expected: "dreadnought" },
      { careerId: "gk_supreme_grand_master", tags: ["grey_knight", "gk_supreme_master"], expected: "grey_knight" },
      { careerId: "astartes_captain", tags: ["astartes", "astartes_captain"], expected: "astartes" },
      { careerId: "knight_high_king", tags: ["imperial_knight", "knight_high_king"], expected: "imperial_knight" },
      { careerId: "grand_master_of_assassins", tags: ["assassin", "grand_master_assassins", "high_lord_terra"], expected: "officio_assassinorum" },
      { careerId: "nav_novator", tags: ["navigator", "nav_novator"], expected: "navis_navigator" },
      { careerId: "inquisitor", tags: ["inquisitor", "navigator", "navis_officer"], expected: "inquisition" },
      { careerId: "rogue_trader", tags: ["rogue_trader", "navigator", "navis_officer", "planetary_governor"], expected: "rogue_trader" },
      { careerId: "planetary_governor", tags: ["planetary_governor"], expected: "governor" },
      { careerId: "fabricator_general", tags: ["mechanicus", "magos", "fabricator_general", "high_lord_terra"], expected: "mechanicus" },
      { careerId: "master_of_administratum", tags: ["administratum", "high_lord_terra"], expected: "imperial_standard" }
    ];
    for (const row of factionMatrix) {
      if (Engine.getCareer(row.careerId).id !== row.careerId) {
        fail(4, `Stage 19-B factionMatrix references unknown careerId "${row.careerId}"`);
      }
      const fSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "imperial_citizen", traitId: "none", eraId: "indomitus", gender: "female" });
      fSt.age = 70;
      fSt.faith = 85;
      fSt.careerId = row.careerId;
      fSt.tags = [...new Set([...fSt.tags, ...row.tags])];
      const resolved = Engine.resolveFactionEndingKey(fSt);
      if (resolved !== row.expected) {
        fail(4, `resolveFactionEndingKey(${row.careerId}) expected "${row.expected}", got "${resolved}"`);
      }
      const honEv = Engine.createHonorableEndingEvent(fSt);
      const grade = Engine.evaluateLifeGrade(fSt);
      if (!honEv || !honEv.title || !grade || !grade.rank || !grade.title) {
        fail(4, `Honorable ending or obituary failed for faction "${row.expected}" (${row.careerId})`);
      }
      // P1-1 regression: unascended mortal saint_vessel must NOT receive Golden Apotheosis
      if (row.careerId === "saint_vessel" && grade.rank.includes("GOLDEN APOTHEOSIS")) {
        fail(4, `Unascended mortal saint_vessel erroneously received GOLDEN APOTHEOSIS rank`);
      }
      // P1-2 regression: nav_senior -> inquisitor/rogue_trader must NOT downgrade to Navigator obituary
      if (row.careerId === "inquisitor" && !grade.rank.includes("ROSETTE")) {
        fail(4, `Cross-career nav_senior -> inquisitor did not get Inquisitor obituary: "${grade.rank}"`);
      }
      if (row.careerId === "rogue_trader" && !grade.rank.includes("WARRANT OF TRADE")) {
        fail(4, `Cross-career nav_senior/governor -> rogue_trader did not get Rogue Trader obituary: "${grade.rank}"`);
      }
    }

    // Stage 19-C: 100% echo coverage for all 28 named characters & standardized met_<id> solo duplicate guards across ALL non-crossover single-character events
    const echoIds = [
      "ev_s4_met_primarchs_echo",
      "ev_s4_met_commanders_echo",
      "ev_s4_met_shadows_echo",
      "ev_s4_met_nemesis_echo"
    ];
    const echoCoveredTags = new Set();
    for (const eid of echoIds) {
      const ev = DATA.EVENTS.find((e) => e.id === eid);
      if (!ev) {
        fail(4, `Missing named echo event "${eid}"`);
      } else {
        for (const t of (ev.req && ev.req.anyTags) || []) echoCoveredTags.add(t);
      }
    }
    for (const ch of DATA.CHARACTERS) {
      const metTag = `met_${ch.id}`;
      if (!echoCoveredTags.has(metTag)) {
        fail(4, `Named character "${ch.id}" (${ch.name}) is missing from ev_s4_met_*_echo anyTags (${metTag})`);
      }
    }
    // Intentional institutional re-encounter whitelist (e.g., High Lord council with Regent Guilliman)
    const INTENTIONAL_REENCOUNTER_WHITELIST = new Set(["ev_s14_hl_regent_guilliman"]);
    DATA.EVENTS.forEach((ev, idx) => {
      const srcFile = eventSourceByIndex[idx] || "";
      if (srcFile === "src/data/events/themes/named_crossover.js") return;
      if (INTENTIONAL_REENCOUNTER_WHITELIST.has(ev.id)) return;
      if (Array.isArray(ev.characters) && ev.characters.length === 1) {
        const expectedGuard = `met_${ev.characters[0]}`;
        const excl = (ev.req && ev.req.excludeTags) || [];
        if (!excl.includes(expectedGuard)) {
          fail(4, `Single-character event "${ev.id}" (${srcFile}) is missing duplicate guard "${expectedGuard}" in req.excludeTags`);
        }
      }
    });

    // Stage 19-D: previouslyMetCharacters capture contract, arcs_focus -> focus/origins_tags split, careers 4-way barrel & careerRules SSOT
    const d1First = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "imperial_citizen", traitId: "none", eraId: "cadia_rift", gender: "male" });
    d1First.age = 20;
    d1First.year = 999;
    d1First.quarter = 1;
    d1First.careerId = "astra_militarum";
    const d1FirstRes = Engine.advanceQuarter(d1First);
    if (
      d1FirstRes.status !== "event" ||
      !d1First.pendingEvent ||
      d1First.pendingEvent.id !== "tl_fall_of_cadia" ||
      !Array.isArray(d1First.pendingEvent.previouslyMetCharacters) ||
      d1First.pendingEvent.previouslyMetCharacters.length !== 0 ||
      !d1First.metCharacters.includes("creed")
    ) {
      fail(4, "Stage 19-D1 first-encounter previouslyMetCharacters capture contract failed on tl_fall_of_cadia");
    }
    const d1Repeat = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "imperial_citizen", traitId: "none", eraId: "cadia_rift", gender: "male" });
    d1Repeat.age = 20;
    d1Repeat.year = 999;
    d1Repeat.quarter = 1;
    d1Repeat.careerId = "astra_militarum";
    d1Repeat.metCharacters = ["creed"];
    const d1RepeatRes = Engine.advanceQuarter(d1Repeat);
    if (
      d1RepeatRes.status !== "event" ||
      !d1Repeat.pendingEvent ||
      d1Repeat.pendingEvent.id !== "tl_fall_of_cadia" ||
      !Array.isArray(d1Repeat.pendingEvent.previouslyMetCharacters) ||
      d1Repeat.pendingEvent.previouslyMetCharacters.join(",") !== "creed"
    ) {
      fail(4, "Stage 19-D1 repeat-encounter previouslyMetCharacters capture contract failed on tl_fall_of_cadia");
    }
    if (eventFiles.includes("src/data/events/themes/arcs_focus.js")) {
      fail(4, "Stage 19-D2 legacy src/data/events/themes/arcs_focus.js should have been split into focus.js + origins_tags.js");
    }
    if (!eventFiles.includes("src/data/events/themes/focus.js") || !eventFiles.includes("src/data/events/themes/origins_tags.js")) {
      fail(4, "Stage 19-D2 split event files focus.js / origins_tags.js missing");
    }
    if (
      !isClosedVowCrossBlocked(Engine.getCareer("adepta_sororitas"), Engine.getCareer("hive_crime_lord")) ||
      isClosedVowCrossBlocked(Engine.getCareer("adepta_sororitas"), Engine.getCareer("inquisition_acolyte"))
    ) {
      fail(4, "Stage 19-D3 careerRules.js isClosedVowCrossBlocked SSOT invariant failed");
    }

    // Stage 20-A: M41 timeline endYear reachability (sabbat/vraks/badab) & optional critSuccess/critFail branching contract
    const tlSabbat = DATA.TIMELINE.find((t) => t.id === "tl_sabbat_crusade");
    const tlVraks = DATA.TIMELINE.find((t) => t.id === "tl_vraks_siege");
    const tlBadab = DATA.TIMELINE.find((t) => t.id === "tl_badab_war");
    if (!tlSabbat || (tlSabbat.endYear || 0) < 770) {
      fail(4, `Stage 20-A tl_sabbat_crusade must cover >= 770.M41 so sabbat preset (birth 745-749) reaches it at age 14+`);
    }
    if (!tlVraks || (tlVraks.endYear || 0) < 830) {
      fail(4, `Stage 20-A tl_vraks_siege must cover canon 813-830.M41 (got endYear=${tlVraks && tlVraks.endYear})`);
    }
    if (!tlBadab || (tlBadab.endYear || 0) < 912) {
      fail(4, `Stage 20-A tl_badab_war must cover canon 901-912.M41 (got endYear=${tlBadab && tlBadab.endYear})`);
    }
    const sabTest = Engine.createCharacter({ mode: "custom", worldId: "generic_civilised", originId: "militarum_family", traitId: "none", eraId: "sabbat", gender: "male" });
    sabTest.segmentum = "pacificus";
    sabTest.age = 15;
    sabTest.year = sabTest.birthYear + 15;
    sabTest.quarter = 1;
    sabTest.careerId = "astra_militarum";
    sabTest.tags.push("militarum");
    const sabRes = Engine.advanceQuarter(sabTest);
    if (sabRes.status !== "event" || !sabTest.pendingEvent || sabTest.pendingEvent.id !== "tl_sabbat_crusade") {
      fail(4, `Stage 20-A sabbat preset failed to trigger tl_sabbat_crusade at age 15 (year=${sabTest.year}, got=${sabTest.pendingEvent && sabTest.pendingEvent.id})`);
    }

    // Optional critSuccess / critFail branching & fallback contract
    const origRandom = Math.random;
    try {
      const mkCritState = () => {
        const cs = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
        cs.age = 25;
        cs.stats.Int = 50;
        return cs;
      };
      const critEv = {
        id: "qa_s20_crit_test",
        title: "QA Crit Branch Test",
        choices: [{
          label: "[지성 판정] 테스트",
          check: { stat: "Int", diff: 0 },
          critSuccess: { text: "CRIT_OK", stats: { Int: 4 } },
          success: { text: "NORM_OK", stats: { Int: 1 } },
          fail: { text: "NORM_FAIL", wounds: -5 },
          critFail: { text: "CRIT_FAIL", wounds: -12 }
        }]
      };
      const fallbackEv = {
        id: "qa_s20_crit_fallback_test",
        title: "QA Crit Fallback Test",
        choices: [{
          label: "[지성 판정] 폴백",
          check: { stat: "Int", diff: 0 },
          success: { text: "FALLBACK_OK", stats: { Int: 1 } },
          fail: { text: "FALLBACK_FAIL", wounds: -5 }
        }]
      };
      Math.random = () => 0.01; // roll = 2 (critSuccess)
      const sCritOk = mkCritState();
      sCritOk.pendingEvent = critEv;
      const rCritOk = Engine.resolvePendingChoice(sCritOk, 0);
      if (!rCritOk || !rCritOk.rollResult.critSuccess || rCritOk.outcome.text !== "CRIT_OK") {
        fail(4, "Stage 20-A optional choice.critSuccess did not trigger on roll <= 5");
      }
      const sFallbackOk = mkCritState();
      sFallbackOk.pendingEvent = fallbackEv;
      const rFallbackOk = Engine.resolvePendingChoice(sFallbackOk, 0);
      if (!rFallbackOk || !rFallbackOk.rollResult.critSuccess || rFallbackOk.outcome.text !== "FALLBACK_OK") {
        fail(4, "Stage 20-A choice without critSuccess did not fall back to choice.success");
      }
      Math.random = () => 0.98; // roll = 99 (critFail)
      const sCritFail = mkCritState();
      sCritFail.pendingEvent = critEv;
      const rCritFail = Engine.resolvePendingChoice(sCritFail, 0);
      if (!rCritFail || !rCritFail.rollResult.critFail || rCritFail.outcome.text !== "CRIT_FAIL") {
        fail(4, "Stage 20-A optional choice.critFail did not trigger on roll >= 96");
      }
      const sFallbackFail = mkCritState();
      sFallbackFail.pendingEvent = fallbackEv;
      const rFallbackFail = Engine.resolvePendingChoice(sFallbackFail, 0);
      if (!rFallbackFail || !rFallbackFail.rollResult.critFail || rFallbackFail.outcome.text !== "FALLBACK_FAIL") {
        fail(4, "Stage 20-A choice without critFail did not fall back to choice.fail");
      }

      // Red-Team P1-3 regression: incorruptible transhuman must NOT print false "오염 +N" in deltaText
      const incSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "terra_high_blood", traitId: "none", eraId: "indomitus", gender: "male" });
      incSt.careerId = "adeptus_custodes";
      incSt.tags.push("custodes", "transhuman");
      incSt.corruption = 0;
      incSt.pendingEvent = {
        id: "qa_s20_incorr_delta",
        title: "QA Incorruptible Delta Test",
        choices: [{ label: "test", effect: { text: "워프 돌풍을 견뎠다.", corruption: 7, stats: { WP: 2 } } }]
      };
      Engine.resolvePendingChoice(incSt, 0);
      if (incSt.corruption !== 0 || (incSt.logs[0]?.deltaText || "").includes("오염")) {
        fail(4, `Stage 20 Red-Team P1-3: incorruptible Custodes logged false corruption deltaText="${incSt.logs[0]?.deltaText}" (corr=${incSt.corruption})`);
      }
    } finally {
      Math.random = origRandom;
    }
  }
}

console.log(`[Gate 4] Integrity, ${DATA.CAREERS.filter((c) => c.selectable).length}-career metadata, alignment schema, tag production, describeReq, dynamic offers, migration, honorable ending & Stage 17-20A guards verified.`);

// ============================================================================
// Gate 4P: 대표 페르소나 신분·생활권·신체 정합성 & 최소 풀 하한(>= 8) 검증 (모듈 위임)
// ============================================================================
runPersonaAuditGate({ DATA, Engine, fail });

// ============================================================================
// Gate 5: 소프트락 · 유년기 풀(22행성 각 4+) · fastChildhood · 2400로그 보존 · 중복률
// ============================================================================
let minAge2 = 999;
let minAge10 = 999;
for (const w of DATA.WORLDS) {
  const st = Engine.createCharacter({ mode: "custom", worldId: w.id, originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
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
    if (ch.check) sc = Engine.computeCheckPreview(st, ch.check).target;
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
  const fastSt = Engine.createCharacter({ mode: "custom", worldId: "cadia", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
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
  const longSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "planetary_noble", traitId: "none", eraId: "eisenhorn", gender: "male" });
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
      [ch.effect, ch.success, ch.fail, ch.critSuccess, ch.critFail].forEach((o) => {
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

  // SSOT sanity check against src/engine/careerRules.js
  if (!UNBOUND_CAREERS.size || !CLOSED_VOW_TREES.size || !isUnboundCareer("child")) {
    fail(7, "careerRules.js SSOT exports (UNBOUND_CAREERS / CLOSED_VOW_TREES / isUnboundCareer) are invalid");
  }

  function canDirectStep(curr, target, baseGender, baseTags, baseTranshuman) {
    if (!curr || !target || curr.id === target.id) return false;
    const tGender = target.req && target.req.gender ? target.req.gender : null;
    if (baseGender && tGender && baseGender !== tGender) return false;

    const effTags = new Set([...baseTags, ...careerPermTags(curr)]);
    const effTranshuman = baseTranshuman || Boolean(curr.isTranshuman) ||
      effTags.has("astartes") || effTags.has("custodes") || effTags.has("grey_knight") || effTags.has("daemon_prince") || effTags.has("living_saint");

    if (isCareerTransitionBlockedPure(effTags, curr, target, null)) return false;

    // 1) Manual open transition (SSOT: src/engine/careerRules.js isManualCareerAllowedPure)
    if (target.selectable && target.entryMode === "open") {
      if (reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
        if (isManualCareerAllowedPure(effTags, curr, target)) {
          return true;
        }
      }
    }

    // 2) Dynamic career offer transition (SSOT: src/engine/careerRules.js evaluateDynamicOfferEligibilityPure)
    if (reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
      const offerRes = evaluateDynamicOfferEligibilityPure(effTags, curr, target, {
        checkDestOriginTags: false,
        checkScoutQualification: false
      });
      if (offerRes.allowed) return true;
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
      startTags.has("astartes") || startTags.has("custodes") || startTags.has("grey_knight") || startTags.has("daemon_prince") || startTags.has("living_saint");

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
    ["adepta_sororitas", "hive_crime_lord", false],
    ["tech_priest", "hive_crime_lord", false],
    ["knight_scion", "planetary_governor", false],
    ["knight_scion", "militarum_general", false],
    ["astartes_brother", "planetary_governor", false],
    ["nav_apprentice", "paternoval_envoy", true],
    ["nav_apprentice", "adeptus_custodes", false],
    ["nav_apprentice", "astartes_scout", false],
    ["assassin_initiate", "grand_master_of_assassins", true],
    ["assassin_initiate", "commissar", false],
    ["assassin_initiate", "inquisition_acolyte", false],
    ["knight_squire", "knight_high_king", true],
    ["adepta_sororitas", "living_saint", true],
    ["living_saint", "chaos_cultist", false]
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
    const minKeys = ["maxAge", "maxYear", "maxFaith", "maxCorruption", "maxWounds", "maxCareerTier"];
    for (const k of maxKeys) {
      if (b[k] !== undefined) out[k] = out[k] !== undefined ? Math.max(out[k], b[k]) : b[k];
    }
    for (const k of minKeys) {
      if (b[k] !== undefined) out[k] = out[k] !== undefined ? Math.min(out[k], b[k]) : b[k];
    }

    if (b.minSocialTier) {
      if (!out.minSocialTier || socialTierOrder.indexOf(b.minSocialTier) > socialTierOrder.indexOf(out.minSocialTier)) {
        out.minSocialTier = b.minSocialTier;
      }
    }
    if (b.maxSocialTier) {
      if (!out.maxSocialTier || socialTierOrder.indexOf(b.maxSocialTier) < socialTierOrder.indexOf(out.maxSocialTier)) {
        out.maxSocialTier = b.maxSocialTier;
      }
    }
    if (out.minSocialTier && out.maxSocialTier && socialTierOrder.indexOf(out.minSocialTier) > socialTierOrder.indexOf(out.maxSocialTier)) {
      return null;
    }

    if (b.difficulty) {
      if (out.difficulty && out.difficulty !== b.difficulty) return null;
      out.difficulty = b.difficulty;
    }
    if (b.gender) {
      if (out.gender && out.gender !== b.gender) return null;
      out.gender = b.gender;
    }
    if (b.greatRift !== undefined) {
      if (out.greatRift !== undefined && out.greatRift !== b.greatRift) return null;
      out.greatRift = b.greatRift;
    }

    const intersectKeys = ["anyCareers", "anyTrees", "anyChapters", "anyWorlds", "anyHomeWorlds", "anySegmenta", "anyFocus", "anyDominantAlign", "anySocialTiers", "anyRealms", "anyBodyClasses"];
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

    const unionKeys = ["allTags", "excludeTags", "excludeWorlds", "excludeHomeWorlds", "excludeWorldTags", "excludeChapters", "excludePastCareers", "excludeRealms", "excludeBodyClasses", "excludeTrees"];
    for (const k of unionKeys) {
      if (b[k]) out[k] = [...new Set([...(out[k] || []), ...b[k]])];
    }

    if (b.stats) {
      out.stats = Object.assign({}, out.stats || {});
      for (const sk of Object.keys(b.stats)) {
        out.stats[sk] = out.stats[sk] !== undefined ? Math.max(out.stats[sk], b.stats[sk]) : b.stats[sk];
      }
    }
    if (b.minAlign) {
      out.minAlign = Object.assign({}, out.minAlign || {});
      for (const ak of Object.keys(b.minAlign)) {
        out.minAlign[ak] = out.minAlign[ak] !== undefined ? Math.max(out.minAlign[ak], b.minAlign[ak]) : b.minAlign[ak];
      }
    }
    if (b.maxAlign) {
      out.maxAlign = Object.assign({}, out.maxAlign || {});
      for (const ak of Object.keys(b.maxAlign)) {
        out.maxAlign[ak] = out.maxAlign[ak] !== undefined ? Math.min(out.maxAlign[ak], b.maxAlign[ak]) : b.maxAlign[ak];
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

    const minA = { humane: 0, dogmatic: 0, ruthless: 0 };
    const maxA = { humane: 100, dogmatic: 100, ruthless: 100 };
    for (const ak of ["humane", "dogmatic", "ruthless"]) {
      if (cl.minAlign && cl.minAlign[ak] !== undefined) minA[ak] = Math.max(minA[ak], cl.minAlign[ak]);
      if (cl.maxAlign && cl.maxAlign[ak] !== undefined) maxA[ak] = Math.min(maxA[ak], cl.maxAlign[ak]);
      if (minA[ak] > maxA[ak]) return null;
    }
    let alignment = { humane: minA.humane, dogmatic: minA.dogmatic, ruthless: minA.ruthless };
    if (cl.anyDominantAlign && cl.anyDominantAlign.length > 0) {
      let solved = null;
      for (const dom of cl.anyDominantAlign) {
        if (dom === "neutral") {
          const topMin = Math.max(minA.humane, minA.dogmatic, minA.ruthless);
          if (topMin < 15) {
            solved = { humane: minA.humane, dogmatic: minA.dogmatic, ruthless: minA.ruthless };
            break;
          }
          const pairs = [["humane", "dogmatic", "ruthless"], ["humane", "ruthless", "dogmatic"], ["dogmatic", "ruthless", "humane"]];
          for (const [k1, k2, k3] of pairs) {
            const v = Math.max(15, minA[k1], minA[k2], minA[k3]);
            if (v <= maxA[k1] && v <= maxA[k2] && minA[k3] <= v) {
              const cand = { [k1]: v, [k2]: v, [k3]: minA[k3] };
              if (Engine.getAlignmentInfo({ alignment: cand }).dominant === "neutral") {
                solved = cand;
                break;
              }
            }
          }
          if (solved) break;
        } else {
          const others = ["humane", "dogmatic", "ruthless"].filter((k) => k !== dom);
          const needed = Math.max(15, minA[dom], minA[others[0]] + 1, minA[others[1]] + 1);
          if (needed <= maxA[dom]) {
            solved = { [dom]: needed, [others[0]]: minA[others[0]], [others[1]]: minA[others[1]] };
            break;
          }
        }
      }
      if (!solved) return null;
      alignment = solved;
    }

    const exclWorlds = new Set(cl.excludeWorlds || []);
    const exclHomeWorlds = new Set(cl.excludeHomeWorlds || []);
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

    const exclChapters = new Set(cl.excludeChapters || []);
    let chapterId = null;
    if (cl.anyChapters) {
      const validCh = cl.anyChapters.find((cid) => chapterIds.has(cid) && !exclChapters.has(cid));
      if (!validCh) return null;
      chapterId = validCh;
    }

    const exclTags = new Set(cl.excludeTags || []);
    const baseTagSet = new Set(cl.allTags || []);
    for (const t of baseTagSet) {
      if (exclTags.has(t)) return null;
    }
    for (const grp of (cl._anyTagGroups || [])) {
      const picked = grp.find((t) => !exclTags.has(t));
      if (!picked) return null;
      baseTagSet.add(picked);
    }

    const exclPast = new Set(cl.excludePastCareers || []);
    const exclTrees = new Set(cl.excludeTrees || []);
    const needsStratSearch = Boolean(
      cl.minSocialTier || cl.maxSocialTier || cl.anySocialTiers ||
      cl.anyRealms || cl.excludeRealms ||
      cl.anyBodyClasses || cl.excludeBodyClasses ||
      cl.excludeTrees || cl.maxCareerTier !== undefined
    );

    const buildCareerCandidates = () => {
      const list = [];
      if (cl.anyCareers) {
        for (const cid of cl.anyCareers) {
          const co = careerById.get(cid);
          if (!co || exclPast.has(cid)) continue;
          if (exclTrees.has(co.tree)) continue;
          if (cl.anyTrees && !cl.anyTrees.includes(co.tree)) continue;
          if (cl.maxCareerTier !== undefined && (co.tier || 0) > cl.maxCareerTier) continue;
          list.push(co);
        }
        return list;
      }
      if (cl.anyTrees) {
        for (const co of DATA.CAREERS) {
          if (exclPast.has(co.id) || exclTrees.has(co.tree)) continue;
          if (!cl.anyTrees.includes(co.tree)) continue;
          if (cl.maxCareerTier !== undefined && (co.tier || 0) > cl.maxCareerTier) continue;
          list.push(co);
        }
        return list;
      }
      const preferredIds = age < 14
        ? ["child"]
        : ["menial_worker", "astra_militarum", "underhive_ganger", "administratum", "imperial_navy", "tech_priest", "ecclesiarchy_priest", "militarum_officer", "inquisitor", "astartes_brother", "adeptus_custodes", "chaos_cultist", "daemon_prince", "child"];
      const seen = new Set();
      for (const pid of preferredIds) {
        const co = careerById.get(pid);
        if (co && !exclPast.has(co.id) && !exclTrees.has(co.tree) && (cl.maxCareerTier === undefined || (co.tier || 0) <= cl.maxCareerTier)) {
          list.push(co);
          seen.add(co.id);
        }
      }
      if (needsStratSearch || list.length === 0) {
        for (const co of DATA.CAREERS) {
          if (seen.has(co.id) || exclPast.has(co.id) || exclTrees.has(co.tree)) continue;
          if (cl.maxCareerTier !== undefined && (co.tier || 0) > cl.maxCareerTier) continue;
          list.push(co);
          seen.add(co.id);
        }
      }
      return list;
    };

    const careerCandidates = buildCareerCandidates();
    if (careerCandidates.length === 0) return null;

    const extraTagVariants = needsStratSearch
      ? [[], ["lowborn"], ["noble"], ["bionic"], ["dreadnought"], ["astartes", "transhuman"], ["daemon_prince"], ["schola"], ["voidborn"], ["mechanicus_blood"], ["heretic"]]
      : [[]];

    const worldTryList = needsStratSearch
      ? [
          ...worldCandidates.filter((w) => !exclHomeWorlds.has(w.id)),
          ...worldCandidates.filter((w) => exclHomeWorlds.has(w.id))
        ].slice(0, 8)
      : [worldCandidates.find((w) => !exclHomeWorlds.has(w.id)) || worldCandidates[0]];

    const focus = (cl.anyFocus && cl.anyFocus[0]) || "survival";
    const stats = { WS: 50, BS: 50, T: 50, Ag: 50, Int: 50, WP: 50, Fel: 50, Inf: 50 };
    if (cl.stats) {
      for (const sk of Object.keys(cl.stats)) stats[sk] = Math.max(stats[sk] || 50, cl.stats[sk]);
    }

    const stratReqOnly = needsStratSearch ? {
      minSocialTier: cl.minSocialTier,
      maxSocialTier: cl.maxSocialTier,
      anySocialTiers: cl.anySocialTiers,
      anyRealms: cl.anyRealms,
      excludeRealms: cl.excludeRealms,
      anyBodyClasses: cl.anyBodyClasses,
      excludeBodyClasses: cl.excludeBodyClasses,
      excludeTrees: cl.excludeTrees,
      maxCareerTier: cl.maxCareerTier
    } : null;

    for (const co of careerCandidates) {
      const careerId = co.id;
      const pastHistory = [careerId];
      if (!exclPast.has("child") && careerId !== "child") pastHistory.unshift("child");
      let pastOk = true;
      for (const grp of (cl._anyPastGroups || [])) {
        const pickedPast = grp.find((p) => {
          if (exclPast.has(p)) return false;
          const reach = reachableFrom.get(p);
          return p === careerId || (reach && reach.has(careerId));
        });
        if (!pickedPast) { pastOk = false; break; }
        if (!pastHistory.includes(pickedPast)) pastHistory.push(pickedPast);
      }
      if (!pastOk) continue;

      const gender = cl.gender || (co.req && co.req.gender) || "male";
      for (const chosenWorld of worldTryList) {
        let homeWorldId;
        if (cl.anyHomeWorlds && cl.anyHomeWorlds.length > 0) {
          homeWorldId = cl.anyHomeWorlds.find((id) => worldIds.has(id) && !exclHomeWorlds.has(id));
          if (!homeWorldId) continue;
        } else if (!exclHomeWorlds.has(chosenWorld.id)) {
          homeWorldId = chosenWorld.id;
        } else {
          const altHome = DATA.WORLDS.find((w) => !exclHomeWorlds.has(w.id));
          if (!altHome) continue;
          homeWorldId = altHome.id;
        }
        if (!worldIds.has(homeWorldId)) continue;

        for (const extraTags of extraTagVariants) {
          if (extraTags.some((t) => exclTags.has(t))) continue;
          const tagArr = [...new Set([...baseTagSet, ...extraTags])];
          const candidateState = {
            alive: true,
            difficulty: cl.difficulty || "standard",
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
            alignment,
            tags: tagArr,
            globalFlags: {
              greatRiftOpened: cl.greatRift !== undefined ? cl.greatRift : year >= 999
            }
          };
          if (!stratReqOnly || Engine.checkReq(candidateState, stratReqOnly)) {
            return candidateState;
          }
        }
      }
    }
    return null;
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

  // Gate 7D: 전 91직군 승급 간선(A -> B) 스탯 상한 무결성 증명 (데드락 0건)
  let checkedEdges = 0;
  for (const b of selectableCareers) {
    const reqStats = (b.req && b.req.stats) || {};
    const statEntries = Object.entries(reqStats);
    if (statEntries.length === 0) continue;
    const prevSet = new Set();
    if (b.req && Array.isArray(b.req.anyCareers)) {
      b.req.anyCareers.forEach((id) => prevSet.add(id));
    }
    if (b.req && Array.isArray(b.req.or)) {
      for (const br of b.req.or) {
        if (br && Array.isArray(br.anyCareers)) br.anyCareers.forEach((id) => prevSet.add(id));
      }
    }
    if (prevSet.size === 0) continue;
    for (const prevId of prevSet) {
      const a = DATA.CAREERS.find((c) => c.id === prevId);
      if (!a) continue;
      checkedEdges++;
      const probe = {
        age: Math.max(20, (b.req && b.req.minAge) || 20),
        careerId: a.id,
        worldId: "generic_civilised",
        homeWorldId: "generic_civilised",
        traitId: "none",
        tags: [...((a.onJoin && a.onJoin.addTags) || [])],
        augmeticsCount: a.tree === "mechanicus" ? 1 : 0,
        stats: { WS: 25, BS: 25, T: 25, Ag: 25, Int: 25, WP: 25, Fel: 25, Inf: 25 }
      };
      for (const [sk, minVal] of statEntries) {
        const cap = Engine.getStatCap(probe, sk);
        if (cap < minVal) {
          fail(7, `Gate 7D promotion cap deadlock: ${a.id} (${sk} cap=${cap}) -> ${b.id} (requires ${sk}>=${minVal})`);
        }
      }
    }
  }
  console.log(`[Gate 7D] Promotion-cap integrity proved (${checkedEdges} direct edges, 0 cap deadlocks).`);
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
let childStuck = 0;
let s8Triggers = 0;
let careerOfferTriggers = 0;
const reachedCareers = new Set();
const seenEvents = new Set();
const tierReached = { 4: 0, 5: 0, 6: 0 };
const alignDist = { humane: 0, dogmatic: 0, ruthless: 0, neutral: 0 };
const milestones = {
  highLord: 0,
  governor: 0,
  rogueTrader: 0,
  astartes: 0,
  custodes: 0,
  greyKnight: 0,
  navigator: 0,
  assassin: 0,
  knight: 0,
  livingSaint: 0,
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
      if (st.age >= 19 && st.careerId === "child") {
        childStuck++;
        if (st.tags.includes("schola")) scholaStuck++;
      }
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
    const domAlign = Engine.getAlignmentInfo(st).dominant;
    alignDist[domAlign] = (alignDist[domAlign] || 0) + 1;
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
      if (st.tags.includes("navigator")) milestones.navigator++;
      if (st.tags.includes("assassin")) milestones.assassin++;
      if (st.tags.includes("imperial_knight")) milestones.knight++;
      if (st.tags.includes("living_saint")) milestones.livingSaint++;
      if (st.tags.includes("heretic") || st.tags.includes("chaos_aligned")) { milestones.chaos++; heretic++; }
      if (st.tags.includes("daemon_prince")) milestones.daemonPrince++;
    }
    allAges.push(st.age);
    if (!st.tags.includes("astartes") && !st.tags.includes("custodes") && !st.tags.includes("rejuvenat") && !st.tags.includes("daemon_prince") && !st.tags.includes("living_saint") && !st.tags.includes("navigator")) {
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
if (childStuck > 0) fail(6, `character remained child past age 18 in ${childStuck} quarters`);
if (careerOfferTriggers === 0) fail(6, `No dynamic career offers triggered across ${totalSimLives} simulated lives`);

// 1,000-quarter engine CPU benchmark
const benchSt = Engine.createCharacter({ mode: "custom", worldId: "terra", originId: "planetary_noble", traitId: "none", eraId: "armageddon", gender: "male" });
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
  `childStuck=${childStuck}, careerOffers=${careerOfferTriggers}, reachedCareers=${reachedCareers.size}/${selectableCareers.length}, ` +
  `s8Crises=${s8Triggers} (avg ${(s8Triggers / totalSimLives).toFixed(1)}/life), 1000q=${benchMs.toFixed(1)}ms`
);
if (DEEP_MODE) {
  console.log(
    `  [Deep Distribution] naturalEvents=${seenEvents.size}/${DATA.EVENTS.length} | ` +
    `Align(H=${alignDist.humane}, D=${alignDist.dogmatic}, R=${alignDist.ruthless}, N=${alignDist.neutral}) | ` +
    `T4+=${tierReached[4]}, T5+=${tierReached[5]}, T6=${tierReached[6]} | ` +
    `HighLord=${milestones.highLord}, Gov=${milestones.governor}, RT=${milestones.rogueTrader}, ` +
    `Astartes=${milestones.astartes}, Custodes=${milestones.custodes}, GK=${milestones.greyKnight}, ` +
    `Nav=${milestones.navigator}, Ass=${milestones.assassin}, Knight=${milestones.knight}, Saint=${milestones.livingSaint}, ` +
    `Chaos=${milestones.chaos}, DaemonPrince=${milestones.daemonPrince}`
  );

  // Stage 16.5: 3-way comparative alignment roleplay bias check (when biased events exist for all 3 axes)
  const biasedCounts = {
    humane: DATA.EVENTS.filter((e) => e.alignBias === "humane").length,
    dogmatic: DATA.EVENTS.filter((e) => e.alignBias === "dogmatic").length,
    ruthless: DATA.EVENTS.filter((e) => e.alignBias === "ruthless").length
  };
  if (biasedCounts.humane >= 4 && biasedCounts.dogmatic >= 4 && biasedCounts.ruthless >= 4) {
    const pickAlignedChoice = (st, targetAxis) => {
      const choices = (st.pendingEvent && st.pendingEvent.choices) || [];
      const others = ["humane", "dogmatic", "ruthless"].filter((k) => k !== targetAxis);
      let bestIdx = -1;
      let bestScore = -9999;
      for (let idx = 0; idx < choices.length; idx++) {
        const ch = choices[idx];
        if (!Engine.checkReq(st, ch.req)) continue;
        const outs = [ch.effect, ch.success].filter(Boolean);
        let netAlign = null;
        for (const o of outs) {
          if (o.align) {
            const gain = o.align[targetAxis] || 0;
            const rival = Math.max(0, o.align[others[0]] || 0) + Math.max(0, o.align[others[1]] || 0);
            const cur = gain - rival * 0.5;
            if (netAlign === null || cur > netAlign) netAlign = cur;
          }
        }
        let sc = netAlign !== null ? netAlign * 20 : 0;
        if (ch.effect && ch.effect.instantDeath) sc -= 1000;
        if (netAlign === null) {
          if (ch.check) sc = ((st.stats[ch.check.stat] || 20) + (ch.check.diff || 0)) * 0.15;
          else sc = 4;
        }
        if (sc > bestScore) {
          bestScore = sc;
          bestIdx = idx;
        }
      }
      return bestIdx >= 0 ? bestIdx : choices.findIndex((ch) => !ch.req);
    };
    const compSummary = [];
    for (const targetAxis of ["humane", "dogmatic", "ruthless"]) {
      const seenBias = { humane: 0, dogmatic: 0, ruthless: 0 };
      let domMatched = 0;
      const COMP_LIVES = 45;
      for (let i = 0; i < COMP_LIVES; i++) {
        const st = Engine.createCharacter({ mode: "custom", worldId: "necromunda", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
        st.focus = targetAxis === "dogmatic" ? "faith" : targetAxis === "ruthless" ? "politics" : "survival";
        let steps = 0;
        while (st.alive && steps < 900) {
          steps++;
          Engine.advanceQuarter(st);
          while (st.alive && st.pendingEvent) {
            const b = st.pendingEvent.alignBias;
            if (b && seenBias[b] !== undefined) seenBias[b]++;
            Engine.resolvePendingChoice(st, pickAlignedChoice(st, targetAxis));
          }
        }
        if (Engine.getAlignmentInfo(st).dominant === targetAxis) domMatched++;
      }
      compSummary.push(`${targetAxis}(dom=${domMatched}/${COMP_LIVES}, H:${seenBias.humane}/D:${seenBias.dogmatic}/R:${seenBias.ruthless})`);
      const others = ["humane", "dogmatic", "ruthless"].filter((k) => k !== targetAxis);
      if (domMatched < Math.floor(COMP_LIVES * 0.35)) {
        fail(7, `Alignment roleplay "${targetAxis}" reached dominant in only ${domMatched}/${COMP_LIVES} lives`);
      }
      if (seenBias[targetAxis] <= seenBias[others[0]] || seenBias[targetAxis] <= seenBias[others[1]]) {
        fail(7, `Alignment bias weighting failed for "${targetAxis}": ${JSON.stringify(seenBias)}`);
      }
    }
    console.log(`  [Alignment Comparative] ${compSummary.join(" | ")}`);
  }

  // Stage 22-C: Grimdark Mode 300-life dual-mode probe & req.difficulty isolation check
  const grimdarkOnlyIds = new Set(
    DATA.EVENTS.filter((e) => e.req && e.req.difficulty === "grimdark").map((e) => e.id)
  );
  let standardGrimLeaks = 0;
  for (const eid of seenEvents) {
    if (grimdarkOnlyIds.has(eid)) standardGrimLeaks++;
  }
  if (standardGrimLeaks > 0) {
    fail(7, `Grimdark-only events leaked into standard mode simulation (${standardGrimLeaks} leaks)`);
  }

  const GRIM_LIVES = 300;
  const grimAges = [];
  const grimReached = new Set();
  let grimViolent = 0;
  let grimEventsHit = 0;
  let grimMaxRep = 0;
  for (let i = 0; i < GRIM_LIVES; i++) {
    const st = Engine.createCharacter({ mode: "random", difficulty: "grimdark" });
    st.focus = focuses[i % focuses.length];
    let steps = 0;
    while (st.alive && steps < 1800) {
      steps++;
      Engine.advanceQuarter(st);
      while (st.alive && st.pendingEvent) {
        if (grimdarkOnlyIds.has(st.pendingEvent.id)) grimEventsHit++;
        Engine.resolvePendingChoice(st, pickSmartChoice(st));
      }
    }
    grimAges.push(st.age);
    if (!/노환|고령|수명/.test(st.deathCause || "")) grimViolent++;
    for (const cid of (st.careerHistory || [st.careerId])) {
      if (cid && cid !== "child") grimReached.add(cid);
    }
    for (const cnt of Object.values(st.eventCounts || {})) {
      if (cnt > grimMaxRep) grimMaxRep = cnt;
    }
  }
  grimAges.sort((a, b) => a - b);
  const grimMedAge = grimAges[Math.floor(grimAges.length / 2)];
  if (grimEventsHit === 0) fail(7, "Grimdark-only events never triggered in 300 grimdark lives");
  if (grimMaxRep > 2) fail(7, `Grimdark mode event repeat exceeded 2: ${grimMaxRep}`);
  console.log(
    `  [Grimdark Probe] ${GRIM_LIVES} lives: medAge=${grimMedAge}, violent=${Math.round((grimViolent / GRIM_LIVES) * 100)}%, ` +
    `grimdarkEvents=${grimEventsHit}, reachedCareers=${grimReached.size}/${selectableCareers.length}, standardLeaks=${standardGrimLeaks}`
  );
}

if (CHECK_DIST) {
  runDistBundleGate({ rootDir: ROOT, readRel, fail, coreData: DATA, glossaryTerms: DATA.GLOSSARY_TERMS });
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

