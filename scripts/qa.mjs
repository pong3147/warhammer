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
      for (const m of code.matchAll(/(?:from\s*|import\s*)["'`](\.\/[^"'`]+\.js)["'`]/g)) {
        const nextRel = path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1]));
        if (!visited.has(nextRel)) queue.push(nextRel);
      }
      if (includeDynamic) {
        // Vite 8 / Rolldown emits backtick literals in dynamic imports: import(`./chunk.js`)
        for (const m of code.matchAll(/import\s*\(\s*["'`](\.\/[^"'`]+\.js)["'`]\s*\)/g)) {
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
    if (entries.length === 0) {
      fail(8, `${rel} had 0 traced entry chunks (check Astro island HTML attributes in extractEntryChunks)`);
    }
    const staticGraph = traceChunks(entries, { includeDynamic: false });
    const fullGraph = traceChunks(entries, { includeDynamic: true });

    const leakedNarrative = fullGraph.filter((c) => narrativeChunks.has(c));
    if (leakedNarrative.length) {
      fail(8, `${rel} leaks narrative chunk(s): ${leakedNarrative.join(", ")}`);
    }

    if (rel === "dist/hall/index.html") {
      // Hall must NOT eagerly load createEngine.js in its static initial graph, and SHOULD resolve it dynamically
      const eagerEngine = staticGraph.filter((c) => engineChunks.has(c));
      if (eagerEngine.length) {
        fail(8, `${rel} eagerly bundles simulation engine chunk(s): ${eagerEngine.join(", ")}`);
      }
      const lazyEngine = fullGraph.filter((c) => engineChunks.has(c));
      if (lazyEngine.length === 0) {
        fail(8, `${rel} dynamic import tracer failed to detect lazy createEngine chunk (check Rolldown/Vite output syntax)`);
      }
    } else {
      // Glossary and Codex pages must NOT reference createEngine.js at all (static or dynamic)
      const leakedEngine = fullGraph.filter((c) => engineChunks.has(c));
      if (leakedEngine.length) {
        fail(8, `${rel} bundles simulation engine chunk(s): ${leakedEngine.join(", ")}`);
      }
    }
  }

  // 3. Main game page (/) must keep narrative chunk lazy (not in static graph, present in dynamic graph) and must NOT bundle glossary prose
  const gameEntries = extractEntryChunks(readRel("dist/index.html"));
  if (gameEntries.length === 0) {
    fail(8, "dist/index.html had 0 traced entry chunks (check Astro island HTML attributes in extractEntryChunks)");
  }
  const gameStaticGraph = traceChunks(gameEntries, { includeDynamic: false });
  const gameFullGraph = traceChunks(gameEntries, { includeDynamic: true });
  const gameEagerNarrative = gameStaticGraph.filter((c) => narrativeChunks.has(c));
  if (gameEagerNarrative.length) {
    fail(8, `dist/index.html eagerly loads narrative chunk(s) instead of lazy-loading: ${gameEagerNarrative.join(", ")}`);
  }
  const gameLazyNarrative = gameFullGraph.filter((c) => narrativeChunks.has(c));
  if (gameLazyNarrative.length === 0) {
    fail(8, "dist/index.html dynamic import tracer failed to detect lazy narrative chunk (check Rolldown/Vite output syntax)");
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

if (coreFiles.length === 0) fail(1, `No core data files found under ${path.join(ROOT, "src/data/core")}`);
if (eventFiles.length === 0 || DATA.EVENTS.length === 0) fail(1, `No event data loaded (files=${eventFiles.length}, events=${DATA.EVENTS.length})`);
if (chronFiles.length === 0 || DATA.CHRONICLES.length === 0) fail(1, `No chronicle data loaded (files=${chronFiles.length}, chronicles=${DATA.CHRONICLES.length})`);

const EVENT_SIZE_WARN_KB = 110;
const EVENT_LINE_WARN = 2200;
const CHRON_SIZE_WARN_KB = 70;
const CHRON_LINE_WARN = 1400;
const CORE_SIZE_WARN_KB = 95;
const CORE_LINE_WARN = 1900;
const CAREERS_SIZE_WARN_KB = 165;
const CAREERS_LINE_WARN = 3300;
const ENGINE_SIZE_WARN_KB = 260;
const ENGINE_LINE_WARN = 5400;
let maxEvKB = 0;
let maxChKB = 0;
let maxCoreKB = 0;
let engineKB = 0;

for (const s of [...coreFiles, ...eventFiles, ...chronFiles, "src/engine/createEngine.js"]) {
  if (!fs.existsSync(path.join(ROOT, s))) continue;
  const rawSrc = readRel(s);
  const kb = Buffer.byteLength(rawSrc, "utf8") / 1024;
  const lineCount = rawSrc.split("\n").length;
  if (s === "src/engine/createEngine.js") {
    engineKB = kb;
    if (kb > ENGINE_SIZE_WARN_KB || lineCount > ENGINE_LINE_WARN) {
      warnings.push(`Large engine file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines) — consider extracting sub-modules`);
    }
  } else if (s.startsWith("src/data/core/")) {
    if (kb > maxCoreKB) maxCoreKB = kb;
    const isCareers = s === "src/data/core/careers.js";
    const kbLim = isCareers ? CAREERS_SIZE_WARN_KB : CORE_SIZE_WARN_KB;
    const lineLim = isCareers ? CAREERS_LINE_WARN : CORE_LINE_WARN;
    if (kb > kbLim || lineCount > lineLim) {
      warnings.push(`Large core file ${s} (${kb.toFixed(1)}KB, ${lineCount} lines) — consider splitting`);
    }
  } else if (s.startsWith("src/data/events/")) {
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
if (!cssPath) {
  fail(1, `Missing required stylesheet src/styles/global.css (ROOT=${ROOT})`);
} else {
  const cssSrc = readRel(cssPath);
  if (/@import\s+url\(/i.test(cssSrc)) {
    fail(1, `Blocking @import still present in ${cssPath} (use <link> in BaseLayout.astro)`);
  }
}

console.log(
  `[Gate 1] ESM data verified (${coreFiles.length} core, ${eventFiles.length} events, ${chronFiles.length} chronicles, glossary=${DATA.GLOSSARY_TERMS.length}; ` +
  `maxCore=${maxCoreKB.toFixed(1)}KB, engine=${engineKB.toFixed(1)}KB, maxEv=${maxEvKB.toFixed(1)}KB, maxCh=${maxChKB.toFixed(1)}KB).`
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
if (srLiveCount === 0) {
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
    collectOutcomeTags(ch.outcome);
    collectOutcomeTags(ch.success);
    collectOutcomeTags(ch.fail);
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
  }
}

console.log(`[Gate 4] Integrity, ${DATA.CAREERS.filter((c) => c.selectable).length}-career metadata, alignment schema, tag production, describeReq, dynamic offers, migration, honorable ending & Stage 17-19C guards verified.`);

// ============================================================================
// Gate 4P: 15종 대표 페르소나 + 타 행성 방문·성인 귀족 신분·생활권·신체 정합성 & 최소 풀 하한(>= 8) 검증
// ============================================================================
{
  const makePersonaState = (opts) => {
    const st = Engine.createCharacter({
      mode: "custom",
      worldId: opts.worldId,
      originId: opts.originId,
      traitId: opts.traitId || "none",
      eraId: opts.eraId || "armageddon",
      gender: opts.gender || "male"
    });
    st.age = opts.age;
    st.year = st.birthYear + st.age;
    if (opts.careerId) st.careerId = opts.careerId;
    if (opts.chapterId) {
      st.chapterId = opts.chapterId;
      st.chapterName = Engine.getChapter(opts.chapterId)?.name || null;
    }
    if (opts.tags) st.tags = [...new Set([...st.tags, ...opts.tags])];
    if (opts.faith !== undefined) st.faith = opts.faith;
    if (opts.corruption !== undefined) st.corruption = opts.corruption;
    if (opts.stats) st.stats = { ...st.stats, ...opts.stats };
    return st;
  };

  const NOBLE_KID_BAN = /시체 전분|배급 통조림|배급소에 줄|양철 식기|훔친.*배급빵|장터 골목|장터 구석|구역 광장|동네 광장|구역 메디카에|낡은 주사기|골목을 뛰어|물펌프|심부름을 도맡|돌팔매|새총|하층 하이브의 유독 매연|로우 고딕 낱말|합성 배급표/;
  const SCHOLA_KID_BAN = /어머니|아버지|부모님|엄마|아빠|가족 식탁|가정식|배급 통조림|배급소에 줄|양철 식기|훔친.*배급빵|장터 골목|장터 구석|동네 광장|구역 메디카에|골목을 뛰어|물펌프|심부름을 도맡|돌팔매|새총/;
  const KRIEG_KID_BAN = /어머니|아버지|부모님|자장가|가족 식탁|가정식|엄마|아빠|장터|숨바꼭질|골목을 뛰어|배급 통조림/;
  const VOID_KID_BAN = /들판|숲|산성비|비바람|계절이 바뀔|악천후|밤하늘을 가로지르는|돌팔매|새총|동네 광장|구역 광장|구역의 작은 신당|장터 골목|골목을 뛰어/;
  const ASTARTES_BAN = /시체 전분|배급소|배급표|세입자|강제 징발|증조부|증조할아버지|구걸|결근|노점상|화장실|상관의 취향|아마섹.*상납|울부짖으며|겁에 질려 도망|혼인|결혼|동기들이 하나둘 앓아|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명/;
  const DREADNOUGHT_BAN = /시체 전분|배급소|배급표|식당|술잔|선술집|침상|침대|구두|장화|손가락|세수|거울 속 내 눈동자|전술 드레드노트 아머|크룩스 테르미나투스|파워 아머 앞에|드롭 포드 안전벨트|볼터의 약실을 직접|동기들이 하나둘 앓아|상관의 취향|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|생체 폐를 유지/;
  const CUSTODES_BAN = /시체 전분|배급소|배급표|강제 징발|증조부|증조할아버지|구걸|결근|세입자|노점상|화장실|상관의 취향|서보스컬이 골목|오염의 징후|향불 냄새가 역겹|눈동자에.*보랏빛|동기들이 하나둘 앓아|수천 년 전 포도주를 곁들이|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명|생체 폐를 유지/;
  const GK_BAN = /시체 전분|배급소|배급표|강제 징발|증조부|증조할아버지|구걸|결근|세입자|노점상|화장실|상관의 취향|서보스컬이 골목|오염의 징후|향불 냄새가 역겹|눈동자에.*보랏빛|동기들이 하나둘 앓아|순례자 가족을 보았다|순례자들을 청소 서비터|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명/;
  const HIGH_LORD_BAN = /시체 전분|배급소|배급표|배급된 회색|강제 징발|결근|세입자|증조부|증조할아버지|구걸|노점상|화장실|서보스컬이 골목|하층 4개 구역의 식수|전표 4,000장에 붉은 밀랍|전임 하이 로드의 서명|옆 책상에서 50년째|다음 책상으로 넘겼다|암시장 중개인|상관의 취향|사흘을 굶었다|배급 빵 두 덩이/;
  const SAINT_BAN = /시체 전분|배급소|배급표|강제 징발|결근|세입자|증조부|증조할아버지|구걸|노점상|화장실|서보스컬이 골목|상관의 취향|오염의 징후|향불 냄새가 역겹|눈동자에.*보랏빛|암시장 중개인|암시장 자극제|소모품 인력을 미리|동료를 제물로|난민의 마지막 재산|쉰다섯을 넘긴 노구|리주버냇|수명 연장 시술 제안|동기들이 하나둘 앓아|직무 유기로 고발|교대 근무가 끝난|배급 빵 두 덩이/;
  const DP_BAN = /시체 전분|배급소|배급표|배급된 회색|강제 징발|결근|세입자|증조부|증조할아버지|구걸|노점상|화장실|황제께 맹세|아퀼라 성호|성수를 뿌|기도문을 외|아르비테스.*끌려|쥐고기 꼬치|쉰다섯을 넘긴 노구|서툴게 경례|선술집|동기들이 하나둘 앓아|방독면 필터|탐조등 점등|성당 사제가 미사|향불 냄새가 역겹.*고개를 숙였다|교대 시각을 알|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명/;

  const personas = [
    { id: "terra_high_kid", label: "테라 고위 귀족 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "terra", originId: "terra_high_blood" }, ban: NOBLE_KID_BAN },
    { id: "hive_noble_kid", label: "하이브 귀족 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "necromunda", originId: "planetary_noble" }, ban: NOBLE_KID_BAN },
    { id: "rt_scion_kid", label: "로그 트레이더 방계 유아 (하이브 출생)", ages: [2, 5, 8, 11], expected: { socialTier: "elite", lifeRealm: "void", bodyClass: "mortal" }, cfg: { worldId: "generic_hive", originId: "rogue_trader_scion" }, ban: new RegExp(NOBLE_KID_BAN.source + "|" + VOID_KID_BAN.source) },
    { id: "schola_kid", label: "스콜라 유아", ages: [2, 5, 8, 11], expected: { socialTier: "common", lifeRealm: "cloistered", bodyClass: "mortal" }, cfg: { worldId: "ophelia7", originId: "schola_progenium" }, ban: SCHOLA_KID_BAN, clean: (t) => t.replace(/순직한 부모/g, "") },
    { id: "knight_kid", label: "기사 가문 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "generic_knight", originId: "knight_house" }, ban: NOBLE_KID_BAN },
    { id: "nav_kid", label: "항법사 가문 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", lifeRealm: "cloistered", bodyClass: "mortal" }, cfg: { worldId: "terra", originId: "navigator_house" }, ban: new RegExp(NOBLE_KID_BAN.source + "|정상 인류' 판정") },
    { id: "krieg_kid", label: "크리그 유아", ages: [2, 5, 8, 11], expected: { socialTier: "common", lifeRealm: "military", bodyClass: "mortal" }, cfg: { worldId: "krieg", originId: "imperial_citizen" }, ban: KRIEG_KID_BAN, clean: (t) => t.replace(/어머니의 품 대신/g, "") },
    { id: "void_kid", label: "보이드본 유아", ages: [2, 5, 8, 11], expected: { socialTier: "common", lifeRealm: "void", bodyClass: "mortal" }, cfg: { worldId: "voidborn", originId: "imperial_citizen" }, ban: VOID_KID_BAN },
    { id: "astartes", label: "아스타르테스", ages: [80], expected: { socialTier: "apex", lifeRealm: "military", bodyClass: "transhuman" }, cfg: { worldId: "macragge", originId: "imperial_citizen", careerId: "astartes_brother", chapterId: "ultramarines", tags: ["astartes", "transhuman", "battle_brother"], stats: { WS: 75, BS: 75, T: 75, WP: 75, Inf: 55 } }, ban: ASTARTES_BAN, visitWorlds: ["krieg", "catachan", "baal", "mars"] },
    { id: "dreadnought", label: "드레드노트", ages: [220], expected: { socialTier: "apex", lifeRealm: "military", bodyClass: "dreadnought" }, cfg: { worldId: "macragge", originId: "imperial_citizen", careerId: "astartes_veteran", chapterId: "ultramarines", tags: ["astartes", "transhuman", "dreadnought", "battle_brother"], stats: { WS: 80, BS: 78, T: 85, WP: 82, Inf: 65 } }, ban: DREADNOUGHT_BAN, visitWorlds: ["krieg", "catachan", "baal", "mars"] },
    { id: "custodes", label: "쿠스토데스", ages: [120], expected: { socialTier: "apex", lifeRealm: "cloistered", bodyClass: "transhuman" }, cfg: { worldId: "terra", originId: "terra_high_blood", careerId: "adeptus_custodes", tags: ["custodes", "transhuman"], stats: { WS: 90, BS: 85, T: 90, WP: 90, Int: 85, Inf: 80 } }, ban: CUSTODES_BAN, visitWorlds: ["krieg", "catachan", "baal", "mars"] },
    { id: "grey_knight", label: "그레이 나이트", ages: [90], expected: { socialTier: "apex", lifeRealm: "cloistered", bodyClass: "transhuman" }, cfg: { worldId: "terra", originId: "imperial_citizen", traitId: "psyker", careerId: "grey_knight", tags: ["astartes", "grey_knight", "transhuman"], faith: 90, stats: { WS: 80, BS: 75, T: 80, WP: 90, Int: 75, Inf: 65 } }, ban: GK_BAN, visitWorlds: ["krieg", "catachan", "baal"] },
    { id: "high_lord", label: "테라 하이 로드", ages: [62], expected: { socialTier: "apex", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "terra", originId: "planetary_noble", careerId: "master_of_administratum", tags: ["administratum", "high_lord_terra"], stats: { Int: 92, Fel: 88, WP: 84, Inf: 96 } }, ban: HIGH_LORD_BAN },
    { id: "living_saint", label: "살아 있는 성인", ages: [65], expected: { socialTier: "apex", lifeRealm: "cloistered", bodyClass: "transhuman" }, cfg: { worldId: "ophelia7", originId: "ecclesiarchy_novice", traitId: "emperor_blessed", careerId: "living_saint", gender: "female", faith: 98, tags: ["living_miracle", "saint_vessel", "living_saint", "transhuman"], stats: { WS: 85, WP: 98, Fel: 90, Inf: 88 } }, ban: SAINT_BAN },
    { id: "daemon_prince", label: "데몬 프린스", ages: [150], expected: { socialTier: "apex", lifeRealm: "heretic", bodyClass: "daemonic" }, cfg: { worldId: "necromunda", originId: "underhive_scum", careerId: "daemon_prince", corruption: 95, faith: 0, tags: ["heretic", "chaos_aligned", "mark_khorne", "daemon_prince", "transhuman"], stats: { WS: 95, T: 92, WP: 88, Inf: 85 } }, ban: DP_BAN, visitWorlds: ["krieg", "catachan"] }
  ];

  let totalCollisions = 0;
  let minPersonaPool = 999;
  for (const p of personas) {
    const matchedChronIds = new Set();
    const matchedEventIds = new Set();
    for (const age of p.ages) {
      const st = makePersonaState({ ...p.cfg, age });
      const strat = Engine.getStratification(st);
      if (
        strat.socialTier !== p.expected.socialTier ||
        strat.lifeRealm !== p.expected.lifeRealm ||
        strat.bodyClass !== p.expected.bodyClass
      ) {
        fail("4P", `Persona ${p.id}(age ${age}) stratification mismatch: got ${JSON.stringify(strat)}, expected ${JSON.stringify(p.expected)}`);
      }
      for (const ch of DATA.CHRONICLES) {
        if (!Engine.checkReq(st, ch.req)) continue;
        matchedChronIds.add(ch.id);
        const rawText = p.clean ? p.clean(ch.text || "") : (ch.text || "");
        const m = rawText.match(p.ban);
        if (m) {
          totalCollisions++;
          fail("4P", `Persona ${p.id}(age ${age}) leaked chronicle ${ch.id} [matched "${m[0]}"]`);
        }
      }
      for (const ev of DATA.EVENTS) {
        if (!Engine.checkReq(st, ev.req)) continue;
        matchedEventIds.add(ev.id);
        const rawText = p.clean ? p.clean(`${ev.title || ""} ${ev.text || ""}`) : `${ev.title || ""} ${ev.text || ""}`;
        const m = rawText.match(p.ban);
        if (m) {
          totalCollisions++;
          fail("4P", `Persona ${p.id}(age ${age}) leaked event ${ev.id} [matched "${m[0]}"]`);
        }
      }
      for (const vw of p.visitWorlds || []) {
        const vst = makePersonaState({ ...p.cfg, age });
        vst.worldId = vw;
        for (const ch of DATA.CHRONICLES) {
          if (!Engine.checkReq(vst, ch.req)) continue;
          const rawText = p.clean ? p.clean(ch.text || "") : (ch.text || "");
          const m = rawText.match(p.ban);
          if (m) {
            totalCollisions++;
            fail("4P", `Persona ${p.id}(visiting ${vw}) leaked chronicle ${ch.id} [matched "${m[0]}"]`);
          }
        }
      }
    }
    const poolSize = matchedChronIds.size;
    if (poolSize < minPersonaPool) minPersonaPool = poolSize;
    if (poolSize < 8) {
      fail("4P", `Persona ${p.id} (${p.label}) chronicle pool < 8 (got ${poolSize})`);
    }
  }
  // Adult elite/cloistered snapshot must never trigger common-worker servitor event
  const servEv = DATA.EVENTS.find((e) => e.id === "ev_absurd_servitor_sentence");
  if (servEv) {
    const adultElites = [
      makePersonaState({ worldId: "necromunda", originId: "planetary_noble", age: 25, careerId: "administratum" }),
      makePersonaState({ worldId: "ophelia7", originId: "schola_progenium", age: 24, gender: "female", careerId: "adepta_sororitas", tags: ["sororitas"] }),
      makePersonaState({ worldId: "generic_knight", originId: "knight_house", age: 26, careerId: "knight_scion", tags: ["imperial_knight"] })
    ];
    for (const st of adultElites) {
      if (Engine.checkReq(st, servEv.req)) {
        totalCollisions++;
        fail("4P", `Adult elite/cloistered (${st.originId}/${st.careerId}) leaked ev_absurd_servitor_sentence`);
      }
    }
  }
  console.log(`[Gate 4P] 15-persona + cross-world/adult-elite stratification & forbidden-leak audit complete (collisions=${totalCollisions}, minChroniclePool=${minPersonaPool} >= 8).`);
}

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

    const closedTrees = ["sororitas", "mechanicus", "navis_navigator", "imperial_knight", "psyker"];

    // 1) Manual open transition (mirrors Stage 19-S2 isManualCareerAllowed)
    if (target.selectable && target.entryMode === "open") {
      if (reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
        const manualAllowed =
          Engine.isUnboundCareer(curr.id)
            ? (curr.id === "child" || target.tier >= curr.tier || target.tree === "chaos")
            : (
                (target.tree === curr.tree && target.tier >= curr.tier) ||
                target.tree === "chaos" ||
                Boolean(target.isTranshuman) ||
                (target.tree === "psyker" && target.tier >= curr.tier) ||
                (target.id === "rt_seneschal" && target.tier >= curr.tier && (curr.tree === "navis_navigator" || !closedTrees.includes(curr.tree)))
              );
        if (manualAllowed && (!effTranshuman || Boolean(target.isTranshuman) || target.tree === "chaos")) {
          return true;
        }
      }
    }

    // 2) Dynamic career offer transition (including Stage 19-S2 cross-institution Scout Invitation & closed-vow guard)
    if (target.selectable && target.tier >= 2 && reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
      if (curr.id === "child") {
        if (Boolean(target.isTranshuman) || target.tier >= 3) return true;
      } else {
        if (!effTranshuman || Boolean(target.isTranshuman)) {
          if (target.tree === curr.tree) {
            if (target.tier >= curr.tier) return true;
          } else {
            const closedSrcBlocked =
              closedTrees.includes(curr.tree) &&
              target.tree !== "inquisition" &&
              target.tree !== "living_saint" &&
              target.tree !== "chaos" &&
              !Boolean(target.isTranshuman) &&
              !(curr.tree === "navis_navigator" && target.tree === "rogue_trader");
            if (closedSrcBlocked) return false;
            const tierOk = target.tier >= curr.tier || target.tree === "chaos";
            const lateralOk =
              target.entryMode === "event" ||
              target.tree === "chaos" ||
              Boolean(target.isTranshuman) ||
              Boolean(target.allowLateralOffer) ||
              (!Engine.isUnboundCareer(target.id) && target.entryMode === "open" && !effTranshuman && (!Engine.isUnboundCareer(curr.id) || curr.id === "pdf_trooper"));
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

    if (b.gender) {
      if (out.gender && out.gender !== b.gender) return null;
      out.gender = b.gender;
    }
    if (b.greatRift !== undefined) {
      if (out.greatRift !== undefined && out.greatRift !== b.greatRift) return null;
      out.greatRift = b.greatRift;
    }

    const intersectKeys = ["anyCareers", "anyChapters", "anyWorlds", "anyHomeWorlds", "anySegmenta", "anyFocus", "anyDominantAlign", "anySocialTiers", "anyRealms", "anyBodyClasses"];
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

