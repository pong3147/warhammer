// Gate 8: 프로덕션 dist/ 번들 격리 · 분할 엔진 청크 감시 · SSR 카드 수량 검증 모듈
import fs from "node:fs";
import path from "node:path";

export function runDistBundleGate({ rootDir, readRel, fail, coreData, glossaryTerms }) {
  const distDir = path.join(rootDir, "dist");
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
    if (!fs.existsSync(path.join(rootDir, rel))) {
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
      const abs = path.join(rootDir, rel);
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

  // Identify narrative, simulation engine (7 split modules), and glossary chunks inside dist/_astro/
  const astroDir = path.join(distDir, "_astro");
  const astroJsFiles = fs.existsSync(astroDir)
    ? fs.readdirSync(astroDir).filter((f) => f.endsWith(".js")).map((f) => `dist/_astro/${f}`)
    : [];
  const narrativeChunks = new Set(astroJsFiles.filter((f) => path.basename(f).startsWith("narrative.")));
  const ENGINE_CHUNK_PREFIXES = [
    "createEngine.",
    "reqEvaluator.",
    "careerRules.",
    "careerActions.",
    "endings.",
    "travel.",
    "statCaps.",
    "centenarianOps."
  ];
  const ENGINE_CHUNK_SIGNATURES = [
    "createDynamicCareerOfferEvent",
    "createDynamicTransitEvent",
    "createHonorableEndingEvent",
    "getCareerAction",
    "UNBOUND_CAREERS",
    "CLOSED_VOW_TREES",
    "buildPoolIndex",
    "ACQUIRED_TRAIT_EFFECTS"
  ];
  const engineChunks = new Set(
    astroJsFiles.filter((f) => {
      const base = path.basename(f);
      if (ENGINE_CHUNK_PREFIXES.some((prefix) => base.startsWith(prefix))) return true;
      const code = fs.readFileSync(path.join(rootDir, f), "utf8");
      return ENGINE_CHUNK_SIGNATURES.some((sig) => code.includes(sig));
    })
  );
  const glossaryDataChunks = new Set(
    astroJsFiles.filter((f) => {
      const code = fs.readFileSync(path.join(rootDir, f), "utf8");
      return code.includes("Pillars of the Imperium") && code.includes("emperor_golden_throne");
    })
  );

  if (narrativeChunks.size === 0) {
    fail(8, "Could not locate built lazy narrative.*.js chunk in dist/_astro/");
  }
  if (engineChunks.size === 0) {
    fail(8, "Could not locate built engine chunk(s) (createEngine/reqEvaluator/careerRules/careerActions/endings/travel) in dist/_astro/");
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
      // Hall must NOT eagerly load simulation engine in its static initial graph, and SHOULD resolve it dynamically
      const eagerEngine = staticGraph.filter((c) => engineChunks.has(c));
      if (eagerEngine.length) {
        fail(8, `${rel} eagerly bundles simulation engine chunk(s): ${eagerEngine.join(", ")}`);
      }
      const lazyEngine = fullGraph.filter((c) => engineChunks.has(c));
      if (lazyEngine.length === 0) {
        fail(8, `${rel} dynamic import tracer failed to detect lazy createEngine chunk (check Rolldown/Vite output syntax)`);
      }
    } else {
      // Glossary and Codex pages must NOT reference simulation engine at all (static or dynamic)
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
    .reduce((sum, f) => sum + fs.statSync(path.join(rootDir, f)).size, 0);
  const hallStaticBytes = traceChunks(extractEntryChunks(readRel("dist/hall/index.html")), { includeDynamic: false })
    .reduce((sum, f) => sum + fs.statSync(path.join(rootDir, f)).size, 0);
  console.log(
    `[Gate 8] dist/ bundle isolation & SSR verified (9 routes, codexOverviewJS=0KB, ` +
    `codexStaticJS=${(codexStaticBytes / 1024).toFixed(1)}KB, hallStaticJS=${(hallStaticBytes / 1024).toFixed(1)}KB, ` +
    `narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards ${expectedCards.map((c) => c[2]).join("/")}).`
  );
}
