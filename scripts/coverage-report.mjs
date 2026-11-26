#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 콘텐츠 공백 · 다양성 매트릭스 계측 스크립트 (ESM · Node.js 22+)
 * 목적: 메인 컨텍스트 오염 없이 0.2초 만에 직군·행성·챕터·네임드·연령대·성향·초점·시대별
 *      직접 수록 밀도와 하위 공백 Top 15를 산출해 기획 의사결정에 제공한다.
 *
 * 사용법:
 *   node scripts/coverage-report.mjs [--top=15]
 */
import { loadNodeImperiumRuntime } from "./_loadNodeData.mjs";

const topFlag = process.argv.find((a) => a.startsWith("--top="));
const TOP_N = topFlag ? Math.max(5, parseInt(topFlag.split("=")[1], 10) || 15) : 15;

const { DATA, Engine } = await loadNodeImperiumRuntime();

function reqHas(req, field, val) {
  if (!req) return false;
  if (Array.isArray(req[field]) && req[field].includes(val)) return true;
  if (Array.isArray(req.or)) return req.or.some((sub) => reqHas(sub, field, val));
  return false;
}

function reqAgeRange(req) {
  let minA = 0;
  let maxA = 9999;
  if (req && req.minAge !== undefined) minA = Math.max(minA, req.minAge);
  if (req && req.maxAge !== undefined) maxA = Math.min(maxA, req.maxAge);
  return [minA, maxA];
}

const selectableCareers = DATA.CAREERS.filter((c) => c.selectable);
console.log(
  `=== IMPERIALIS VITA COVERAGE MATRIX ===\n` +
  `Totals: WORLDS=${DATA.WORLDS.length}, ORIGINS=${DATA.ORIGINS.length}, CAREERS=${selectableCareers.length} (+child), ` +
  `CHAPTERS=${DATA.CHAPTERS.length}, CHARACTERS=${DATA.CHARACTERS.length}, TIMELINE=${DATA.TIMELINE.length}, ` +
  `EVENTS=${DATA.EVENTS.length} (total w/TL=${DATA.EVENTS.length + DATA.TIMELINE.length}), CHRONICLES=${DATA.CHRONICLES.length}, GLOSSARY=${DATA.GLOSSARY_TERMS.length}\n`
);

// 1. Per-Career Density
const careerRows = selectableCareers.map((c) => {
  const directEv = DATA.EVENTS.filter((e) => reqHas(e.req, "anyCareers", c.id)).length;
  const pastEv = DATA.EVENTS.filter((e) => reqHas(e.req, "anyPastCareers", c.id)).length;
  const directCh = DATA.CHRONICLES.filter((ch) => reqHas(ch.req, "anyCareers", c.id)).length;
  const pastCh = DATA.CHRONICLES.filter((ch) => reqHas(ch.req, "anyPastCareers", c.id)).length;
  return { id: c.id, tree: c.tree, tier: c.tier, directEv, pastEv, directCh, pastCh, total: directEv + directCh };
});
const thinnestCareers = [...careerRows].sort((a, b) => a.directEv - b.directEv || a.directCh - b.directCh || a.tier - b.tier);
console.log(`--- [1] Thinnest Careers (Bottom ${TOP_N} by direct events / chronicles) ---`);
for (const r of thinnestCareers.slice(0, TOP_N)) {
  console.log(
    `  ${r.id.padEnd(28)} T${r.tier} (${r.tree.padEnd(20)}) | directEv=${String(r.directEv).padStart(2)}, pastEv=${String(r.pastEv).padStart(2)}, directCh=${String(r.directCh).padStart(2)}, pastCh=${String(r.pastCh).padStart(2)}`
  );
}

// 2. Per-World Density (direct anyWorlds + world-tag matched)
function reqHasAnyWorldTag(req, tags) {
  if (!req || !tags || !tags.length) return false;
  if (Array.isArray(req.anyWorldTags) && req.anyWorldTags.some((t) => tags.includes(t))) return true;
  if (Array.isArray(req.or)) return req.or.some((sub) => reqHasAnyWorldTag(sub, tags));
  return false;
}

const worldRows = DATA.WORLDS.map((w) => {
  const anyWorldEv = DATA.EVENTS.filter((e) => reqHas(e.req, "anyWorlds", w.id)).length;
  const tagEv = DATA.EVENTS.filter((e) => !reqHas(e.req, "anyWorlds", w.id) && reqHasAnyWorldTag(e.req, w.tags)).length;
  const homeEv = DATA.EVENTS.filter((e) => reqHas(e.req, "anyHomeWorlds", w.id)).length;
  const childCh = DATA.CHRONICLES.filter((ch) => (reqHas(ch.req, "anyWorlds", w.id) || reqHasAnyWorldTag(ch.req, w.tags)) && reqAgeRange(ch.req)[1] <= 13).length;
  const adultCh = DATA.CHRONICLES.filter((ch) => (reqHas(ch.req, "anyWorlds", w.id) || reqHasAnyWorldTag(ch.req, w.tags)) && reqAgeRange(ch.req)[0] >= 14).length;
  return { id: w.id, named: w.named, anyWorldEv, tagEv, homeEv, childCh, adultCh, totalEv: anyWorldEv + tagEv };
});
console.log(`\n--- [2] World Density (Sorted by direct+tag events) ---`);
for (const r of [...worldRows].sort((a, b) => a.totalEv - b.totalEv || a.adultCh - b.adultCh)) {
  console.log(
    `  ${r.id.padEnd(20)} ${r.named ? "named  " : "generic"} | anyWorldEv=${String(r.anyWorldEv).padStart(2)}, tagEv=${String(r.tagEv).padStart(2)}, homeEv=${String(r.homeEv).padStart(2)}, childCh=${String(r.childCh).padStart(2)}, adultCh=${String(r.adultCh).padStart(2)}`
  );
}

// 3. Per-Chapter Density
console.log(`\n--- [3] Chapter Density ---`);
for (const ch of DATA.CHAPTERS) {
  const evCnt = DATA.EVENTS.filter((e) => reqHas(e.req, "anyChapters", ch.id)).length;
  const chCnt = DATA.CHRONICLES.filter((x) => reqHas(x.req, "anyChapters", ch.id)).length;
  console.log(`  ${ch.id.padEnd(18)} | events=${String(evCnt).padStart(2)}, chronicles=${String(chCnt).padStart(2)}`);
}

// 4. Per-Age-Band Density (items with explicit minAge/maxAge anchored in band)
const bands = [
  { label: "0-5세 (유아)", min: 0, max: 5 },
  { label: "6-13세 (아동)", min: 6, max: 13 },
  { label: "14-22세 (초년)", min: 14, max: 22 },
  { label: "23-45세 (청장년)", min: 23, max: 45 },
  { label: "46-65세 (중노년)", min: 46, max: 65 },
  { label: "66-100세 (고령)", min: 66, max: 100 },
  { label: "101세+ (초장수)", min: 101, max: 9999 }
];
function anchoredInBand(req, b) {
  if (!req || (req.minAge === undefined && req.maxAge === undefined)) return false;
  const mn = req.minAge;
  const mx = req.maxAge;
  if (mx !== undefined && mx <= b.max && mx >= b.min) return true;
  if (mn !== undefined && mn >= b.min && mn <= b.max) return true;
  return false;
}
console.log(`\n--- [4] Age-Band Anchored Content (explicit minAge/maxAge) ---`);
for (const b of bands) {
  const narrowEv = DATA.EVENTS.filter((e) => anchoredInBand(e.req, b)).length;
  const narrowCh = DATA.CHRONICLES.filter((c) => anchoredInBand(c.req, b)).length;
  console.log(`  ${b.label.padEnd(16)} | anchoredEv=${String(narrowEv).padStart(3)}, anchoredCh=${String(narrowCh).padStart(3)}`);
}

// 5. Alignment & Focus Density
console.log(`\n--- [5] Alignment & Focus Density ---`);
for (const ax of Engine.ALIGNMENT_KEYS || ["humane", "dogmatic", "ruthless"]) {
  const biasEv = DATA.EVENTS.filter((e) => e.alignBias === ax).length;
  const biasCh = DATA.CHRONICLES.filter((c) => c.alignBias === ax).length;
  console.log(`  alignBias=${ax.padEnd(10)} | events=${String(biasEv).padStart(3)}, chronicles=${String(biasCh).padStart(3)}`);
}
for (const fk of Object.keys(Engine.FOCUSES || {})) {
  const focEv = DATA.EVENTS.filter((e) => reqHas(e.req, "anyFocus", fk)).length;
  const focCh = DATA.CHRONICLES.filter((c) => reqHas(c.req, "anyFocus", fk)).length;
  console.log(`  focus=${fk.padEnd(14)} | events=${String(focEv).padStart(3)}, chronicles=${String(focCh).padStart(3)}`);
}

// 6. Named Characters Coverage (Standalone encounter & met_* chronicle)
const missingNamedEv = [];
const missingNamedCh = [];
for (const ch of DATA.CHARACTERS) {
  const hasEv = DATA.EVENTS.some((e) => (e.characters || []).includes(ch.id));
  const hasCh = DATA.CHRONICLES.some((x) => reqHas(x.req, "allTags", `met_${ch.id}`) || reqHas(x.req, "anyTags", `met_${ch.id}`));
  if (!hasEv) missingNamedEv.push(ch.id);
  if (!hasCh) missingNamedCh.push(ch.id);
}
console.log(
  `\n--- [6] Named Characters Coverage (${DATA.CHARACTERS.length} total) ---\n` +
  `  Standalone/Event appearances missing: ${missingNamedEv.length ? missingNamedEv.join(", ") : "NONE (100%)"}\n` +
  `  met_* chronicle follow-ups missing:   ${missingNamedCh.length ? missingNamedCh.join(", ") : "NONE (100%)"}`
);

// 7. Era Preset Timeline Density
console.log(`\n--- [7] Era Presets (Timeline wars within +45 yrs of birth) ---`);
for (const ep of Engine.ERA_PRESETS || []) {
  const mid = Math.round((ep.minYear + ep.maxYear) / 2);
  const wars = DATA.TIMELINE.filter((t) => t.year >= mid + 12 && t.year <= mid + 55).map((t) => `${t.id}(${t.year})`);
  console.log(`  ${ep.id.padEnd(18)} (~${String(mid).padStart(4)}) | reachableWars=${wars.length}: ${wars.slice(0, 6).join(", ")}${wars.length > 6 ? " ..." : ""}`);
}
