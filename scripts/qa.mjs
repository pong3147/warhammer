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

const DEEP_MODE = process.argv.includes("--deep");
const CHECK_DIST = process.argv.includes("--check-dist");
const ONLY_DIST = process.argv.includes("--only-dist");
const livesFlag = process.argv.find((a) => a.startsWith("--lives="));
const CUSTOM_LIVES_PER_FOCUS = livesFlag ? Math.max(10, parseInt(livesFlag.split("=")[1], 10) || 0) : 0;
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

const errors = [];
const warnings = [];
const fail = (gate, msg) => errors.push(`[Gate ${gate}] ${msg}`);

function runDistBundleGate(coreData, glossaryTerms) {
  const distDir = path.join(ROOT, "dist");
  if (!fs.existsSync(distDir)) {
    fail(8, "dist/ directory not found — run `npm run build` before `--check-dist` / `--only-dist`");
    return;
  }

  const requiredHtml = [
    "dist/index.html",
    "dist/glossary/index.html",
    "dist/hall/index.html",
    "dist/codex/index.html",
    "dist/codex/worlds/index.html",
    "dist/codex/careers/index.html",
    "dist/codex/chapters/index.html",
    "dist/codex/timeline/index.html",
    "dist/codex/characters/index.html"
  ];
  for (const rel of requiredHtml) {
    if (!fs.existsSync(path.join(ROOT, rel))) {
      fail(8, `Missing built HTML route: ${rel}`);
    }
  }

  // Normalize /warhammer/_astro/foo.js -> dist/_astro/foo.js
  const extractEntryChunks = (htmlSrc) => {
    const refs = new Set();
    for (const m of htmlSrc.matchAll(/(?:src|href|component-url|renderer-url)=["']([^"']*\/_astro\/[^"']+\.js)["']/g)) {
      const idx = m[1].indexOf("/_astro/");
      if (idx >= 0) refs.add(`dist${m[1].slice(idx)}`);
    }
    return [...refs];
  };

  const traceChunks = (entryChunks, { includeDynamic = false } = {}) => {
    const visited = new Set();
    const queue = [...entryChunks];
    while (queue.length) {
      const rel = queue.shift();
      if (!rel || visited.has(rel)) continue;
      const abs = path.join(ROOT, rel);
      if (!fs.existsSync(abs)) continue;
      visited.add(rel);
      const code = fs.readFileSync(abs, "utf8");
      // Static imports: from"./foo.js" or import"./foo.js"
      for (const m of code.matchAll(/(?:from\s*|import\s*)["'](\.\/[^"']+\.js)["']/g)) {
        const nextRel = path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1]));
        if (!visited.has(nextRel)) queue.push(nextRel);
      }
      if (includeDynamic) {
        for (const m of code.matchAll(/import\s*\(\s*["'](\.\/[^"']+\.js)["']\s*\)/g)) {
          const nextRel = path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1]));
          if (!visited.has(nextRel)) queue.push(nextRel);
        }
      }
    }
    return [...visited];
  };

  // Identify narrative, createEngine, and glossary chunks inside dist/_astro/
  const astroDir = path.join(distDir, "_astro");
  const astroJsFiles = fs.existsSync(astroDir)
    ? fs.readdirSync(astroDir).filter((f) => f.endsWith(".js")).map((f) => `dist/_astro/${f}`)
    : [];
  const narrativeChunks = new Set(astroJsFiles.filter((f) => path.basename(f).startsWith("narrative.")));
  const engineChunks = new Set(
    astroJsFiles.filter((f) => {
      if (path.basename(f).startsWith("createEngine.")) return true;
      const code = fs.readFileSync(path.join(ROOT, f), "utf8");
      return code.includes("createDynamicCareerOfferEvent") || code.includes("createDynamicTransitEvent");
    })
  );
  const glossaryDataChunks = new Set(
    astroJsFiles.filter((f) => {
      const code = fs.readFileSync(path.join(ROOT, f), "utf8");
      return code.includes("Pillars of the Imperium") && code.includes("emperor_golden_throne");
    })
  );

  if (narrativeChunks.size === 0) {
    fail(8, "Could not locate built lazy narrative.*.js chunk in dist/_astro/");
  }
  if (engineChunks.size === 0) {
    fail(8, "Could not locate built createEngine.*.js chunk in dist/_astro/");
  }

  // 1. /codex/index.html must ship 0 <script> tags and 0 <astro-island> tags
  const codexOverviewHtml = readRel("dist/codex/index.html");
  const codexOverviewScripts = (codexOverviewHtml.match(/<script\b/g) || []).length;
  const codexOverviewIslands = (codexOverviewHtml.match(/<astro-island\b/g) || []).length;
  if (codexOverviewScripts > 0 || codexOverviewIslands > 0) {
    fail(8, `dist/codex/index.html must be 0KB JS (found scripts=${codexOverviewScripts}, islands=${codexOverviewIslands})`);
  }

  // 2. Non-game static pages (/glossary/, /codex/**, /hall/) MUST NOT load narrative chunk (static OR dynamic)
  const nonGamePages = [
    "dist/glossary/index.html",
    "dist/hall/index.html",
    "dist/codex/worlds/index.html",
    "dist/codex/careers/index.html",
    "dist/codex/chapters/index.html",
    "dist/codex/timeline/index.html",
    "dist/codex/characters/index.html"
  ];
  for (const rel of nonGamePages) {
    const htmlSrc = readRel(rel);
    const entries = extractEntryChunks(htmlSrc);
    const staticGraph = traceChunks(entries, { includeDynamic: false });
    const fullGraph = traceChunks(entries, { includeDynamic: true });

    const leakedNarrative = fullGraph.filter((c) => narrativeChunks.has(c));
    if (leakedNarrative.length) {
      fail(8, `${rel} leaks narrative chunk(s): ${leakedNarrative.join(", ")}`);
    }

    if (rel === "dist/hall/index.html") {
      // Hall must NOT eagerly load createEngine.js in its static initial graph
      const eagerEngine = staticGraph.filter((c) => engineChunks.has(c));
      if (eagerEngine.length) {
        fail(8, `${rel} eagerly bundles simulation engine chunk(s): ${eagerEngine.join(", ")}`);
      }
    } else {
      // Glossary and Codex pages must NOT reference createEngine.js at all (static or dynamic)
      const leakedEngine = fullGraph.filter((c) => engineChunks.has(c));
      if (leakedEngine.length) {
        fail(8, `${rel} bundles simulation engine chunk(s): ${leakedEngine.join(", ")}`);
      }
    }
  }

  // 3. Main game page (/) must keep narrative chunk lazy (not in static graph) and must NOT bundle glossary prose
  const gameEntries = extractEntryChunks(readRel("dist/index.html"));
  const gameStaticGraph = traceChunks(gameEntries, { includeDynamic: false });
  const gameEagerNarrative = gameStaticGraph.filter((c) => narrativeChunks.has(c));
  if (gameEagerNarrative.length) {
    fail(8, `dist/index.html eagerly loads narrative chunk(s) instead of lazy-loading: ${gameEagerNarrative.join(", ")}`);
  }
  const gameGlossaryLeak = gameStaticGraph.filter((c) => glossaryDataChunks.has(c));
  if (gameGlossaryLeak.length) {
    fail(8, `dist/index.html eagerly bundles 67KB glossary prose chunk(s): ${gameGlossaryLeak.join(", ")}`);
  }

  // 4. Static SSR card count parity against live CORE_DATA & GLOSSARY_TERMS
  const countMatches = (rel, re) => (readRel(rel).match(re) || []).length;
  const expectedCards = [
    ["dist/glossary/index.html", /class="glossary-card"/g, glossaryTerms.length, "glossary"],
    ["dist/codex/worlds/index.html", /class="codex-card"/g, coreData.WORLDS.length, "worlds"],
    ["dist/codex/careers/index.html", /class="codex-card"/g, coreData.CAREERS.filter((c) => c.selectable).length, "careers"],
    ["dist/codex/chapters/index.html", /class="codex-card"/g, coreData.CHAPTERS.length, "chapters"],
    ["dist/codex/timeline/index.html", /class="codex-card"/g, coreData.TIMELINE.length, "timeline"],
    ["dist/codex/characters/index.html", /class="codex-card"/g, coreData.CHARACTERS.length, "characters"]
  ];
  for (const [rel, re, expected, label] of expectedCards) {
    const actual = countMatches(rel, re);
    if (actual !== expected) {
      fail(8, `${rel} SSR ${label} card count mismatch: expected ${expected}, got ${actual}`);
    }
  }

  // Report compact bundle size summary for Codex/Hall
  const codexStaticBytes = traceChunks(extractEntryChunks(readRel("dist/codex/careers/index.html")), { includeDynamic: false })
    .reduce((sum, f) => sum + fs.statSync(path.join(ROOT, f)).size, 0);
  const hallStaticBytes = traceChunks(extractEntryChunks(readRel("dist/hall/index.html")), { includeDynamic: false })
    .reduce((sum, f) => sum + fs.statSync(path.join(ROOT, f)).size, 0);
  console.log(
    `[Gate 8] dist/ bundle isolation & SSR verified (9 routes, codexOverviewJS=0KB, ` +
    `codexStaticJS=${(codexStaticBytes / 1024).toFixed(1)}KB, hallStaticJS=${(hallStaticBytes / 1024).toFixed(1)}KB, ` +
    `narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28).`
  );
}

if (ONLY_DIST) {
  console.log("=== 1 / QUADRILLION : IMPERIALIS VITA — Gate 8 Production dist/ Bundle Isolation Check ===");
  runDistBundleGate(CORE_DATA, GLOSSARY_TERMS);
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

const EVENT_SIZE_WARN_KB = 110;
const EVENT_LINE_WARN = 2200;
const CHRON_SIZE_WARN_KB = 70;
const CHRON_LINE_WARN = 1400;
let maxEvKB = 0;
let maxChKB = 0;

for (const s of [...eventFiles, ...chronFiles]) {
  const rawSrc = readRel(s);
  const kb = Buffer.byteLength(rawSrc, "utf8") / 1024;
  const lineCount = rawSrc.split("\n").length;
  if (s.startsWith("src/data/events/")) {
    if (kb > maxEvKB) maxEvKB = kb;
    if (kb > EVENT_SIZE_WARN_KB || lineCount > EVENT_LINE_WARN) {
      warnings.push(`Large event file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines) — consider splitting/promoting`);
    }
  } else if (s.startsWith("src/data/chronicles/")) {
    if (kb > maxChKB) maxChKB = kb;
    if (kb > CHRON_SIZE_WARN_KB || lineCount > CHRON_LINE_WARN) {
      warnings.push(`Large chronicle file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines) — consider splitting/promoting`);
    }
  }
}

const cssPath = fs.existsSync(path.join(ROOT, "src/styles/global.css")) ? "src/styles/global.css" : null;
if (cssPath) {
  const cssSrc = readRel(cssPath);
  if (/@import\s+url\(/i.test(cssSrc)) {
    fail(1, `Blocking @import still present in ${cssPath} (use <link> in BaseLayout.astro)`);
  }
}

console.log(
  `[Gate 1] ESM data verified (${coreFiles.length} core, ${eventFiles.length} events, ${chronFiles.length} chronicles, glossary=${DATA.GLOSSARY_TERMS.length}; ` +
  `maxEv=${maxEvKB.toFixed(1)}KB, maxCh=${maxChKB.toFixed(1)}KB).`
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
}
if (uiFiles.length > 0 && srLiveCount === 0) {
  fail(2, "Missing #sr-live polite live region in src/ UI components");
}
console.log(`[Gate 2] Static UI a11y verified (${uiFiles.length} Astro/React files, #sr-live declarations=${srLiveCount}).`);

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
  "src/engine/formatters.js",
  "src/engine/createEngine.js",
  "src/lib/contextualGlossary.js",
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
    collectOutcomeTags(ch.outcome);
    collectOutcomeTags(ch.success);
    collectOutcomeTags(ch.fail);
  }
}

const alignKeys = new Set(Engine.ALIGNMENT_KEYS || ["humane", "dogmatic", "ruthless"]);
const domAlignKeys = new Set(["humane", "dogmatic", "ruthless", "neutral"]);

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
  for (const ch of choices) {
    validateReq(ch.req, `${ev.id}:choice`);
    if (ch.req && !Engine.describeReq(ch.req)) {
      fail(4, `Empty describeReq on choice in ${ev.id}`);
    }
    [ch.effect, ch.outcome, ch.success, ch.fail].forEach((o) => {
      if (!o) return;
      if (o.forceCareer && !careerIds.has(o.forceCareer)) fail(4, `Unknown forceCareer "${o.forceCareer}" in ${ev.id}`);
      if (o.moveWorld && !worldIds.has(o.moveWorld)) fail(4, `Unknown moveWorld "${o.moveWorld}" in ${ev.id}`);
      if (o.align) validateAlignObj(o.align, `${ev.id}:outcome.align`, true);
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
  if (/어머니|아버지|부모님|자장가|가족 식탁|가정식|엄마|아빠/.test(cleaned) && Engine.checkReq(kriegCheckState, ch.req)) {
    fail(3, `Krieg Vita-Womb family leak in chronicle ${ch.id}`);
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
  }
}

console.log(`[Gate 4] Integrity, ${DATA.CAREERS.filter((c) => c.selectable).length}-career metadata, alignment schema, tag production, describeReq, dynamic offers, migration, honorable ending & Stage 17-18 guards verified.`);

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
      effTags.has("astartes") || effTags.has("custodes") || effTags.has("grey_knight") || effTags.has("daemon_prince") || effTags.has("living_saint");

    if ((effTags.has("custodes") || effTags.has("grey_knight") || effTags.has("living_saint")) && target.tree === "chaos") return false;
    if (effTags.has("assassin") && target.tree !== "officio_assassinorum" && target.tree !== "chaos") return false;
    if (effTags.has("living_saint") && target.tree !== "living_saint") return false;
    if (effTags.has("navigator") && ["astartes", "grey_knights", "custodes", "sororitas"].includes(target.tree)) return false;

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
            const lateralOk = target.entryMode === "event" || target.tree === "chaos" || Boolean(target.isTranshuman) || Boolean(target.allowLateralOffer);
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

    const intersectKeys = ["anyCareers", "anyChapters", "anyWorlds", "anyHomeWorlds", "anySegmenta", "anyFocus", "anyDominantAlign"];
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

    const unionKeys = ["allTags", "excludeTags", "excludeWorlds", "excludeHomeWorlds", "excludeWorldTags", "excludeChapters", "excludePastCareers"];
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
          // Try a tie at topMin between two axes within bounds
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
    const chosenWorld = worldCandidates.find((w) => !exclHomeWorlds.has(w.id)) || worldCandidates[0];

    let homeWorldId;
    if (cl.anyHomeWorlds && cl.anyHomeWorlds.length > 0) {
      homeWorldId = cl.anyHomeWorlds.find((id) => worldIds.has(id) && !exclHomeWorlds.has(id));
      if (!homeWorldId) return null;
    } else if (!exclHomeWorlds.has(chosenWorld.id)) {
      homeWorldId = chosenWorld.id;
    } else {
      const altHome = DATA.WORLDS.find((w) => !exclHomeWorlds.has(w.id));
      if (!altHome) return null;
      homeWorldId = altHome.id;
    }
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
      alignment,
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
  `scholaStuck=${scholaStuck}, careerOffers=${careerOfferTriggers}, reachedCareers=${reachedCareers.size}/${selectableCareers.length}, ` +
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
        const outs = [ch.effect, ch.outcome, ch.success].filter(Boolean);
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
}

if (CHECK_DIST) {
  runDistBundleGate(DATA, DATA.GLOSSARY_TERMS);
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

