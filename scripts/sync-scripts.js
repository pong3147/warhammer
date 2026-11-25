#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 데이터 <script> 태그 자동 동기화 유틸리티 (Node.js 전용)
 * data/events/ 및 data/chronicles/ 하위 폴더의 모든 .js 파일을 재귀 스캔해
 * index.html의 마커 구간(DATA-EVENTS, DATA-CHRONICLES)에 클래식 <script> 태그를 자동 반영한다.
 *
 * 사용법:
 *   node scripts/sync-scripts.js          # index.html 동기화
 *   node scripts/sync-scripts.js --check  # 변경 필요 여부만 검사 (CI/QA용)
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");

const EVENT_DIR_ORDER = ["careers", "chapters", "worlds", "themes"];

function collectJsFiles(relDir) {
  const absDir = path.join(ROOT, relDir);
  if (!fs.existsSync(absDir)) return [];
  const results = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.isFile() && ent.name.endsWith(".js")) {
        results.push(path.relative(ROOT, full).split(path.sep).join("/"));
      }
    }
  }
  walk(absDir);
  return results;
}

function sortEventFiles(files) {
  return [...files].sort((a, b) => {
    const segA = a.replace(/^data\/events\//, "").split("/");
    const segB = b.replace(/^data\/events\//, "").split("/");
    const dirA = segA.length > 1 ? segA[0] : "";
    const dirB = segB.length > 1 ? segB[0] : "";
    const idxA = EVENT_DIR_ORDER.indexOf(dirA);
    const idxB = EVENT_DIR_ORDER.indexOf(dirB);
    const rankA = idxA === -1 ? 999 : idxA;
    const rankB = idxB === -1 ? 999 : idxB;
    if (rankA !== rankB) return rankA - rankB;
    return a.localeCompare(b, "en");
  });
}

function sortChronicleFiles(files) {
  return [...files].sort((a, b) => {
    const depthA = a.split("/").length;
    const depthB = b.split("/").length;
    if (depthA !== depthB) return depthA - depthB;
    return a.localeCompare(b, "en");
  });
}

function replaceMarkerBlock(html, markerName, scriptPaths) {
  const startMarker = `<!-- ${markerName}:START -->`;
  const endMarker = `<!-- ${markerName}:END -->`;
  const re = new RegExp(`([ \\t]*${startMarker})[\\s\\S]*?([ \\t]*${endMarker})`);
  if (!re.test(html)) {
    throw new Error(`Missing marker block ${startMarker} ... ${endMarker} in index.html`);
  }
  const tags = scriptPaths.map((p) => `  <script src="./${p}"></script>`).join("\n");
  return html.replace(re, `$1\n${tags}\n$2`);
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const eventFiles = sortEventFiles(collectJsFiles("data/events"));
  const chronFiles = sortChronicleFiles(collectJsFiles("data/chronicles"));

  const normalizeEol = (s) => s.replace(/\r\n/g, "\n");
  const original = fs.readFileSync(INDEX_PATH, "utf8");
  const normalizedOrig = normalizeEol(original);
  let updated = replaceMarkerBlock(normalizedOrig, "DATA-EVENTS", eventFiles);
  updated = replaceMarkerBlock(updated, "DATA-CHRONICLES", chronFiles);

  if (checkOnly) {
    if (updated !== normalizedOrig) {
      console.error("[sync-scripts] index.html is out of sync with data/events/ or data/chronicles/. Run: node scripts/sync-scripts.js");
      process.exit(1);
    }
    console.log(`[sync-scripts] OK: index.html matches ${eventFiles.length} event files and ${chronFiles.length} chronicle files.`);
    return;
  }

  if (updated !== original) {
    fs.writeFileSync(INDEX_PATH, updated, "utf8");
    console.log(`[sync-scripts] Updated index.html (${eventFiles.length} event scripts, ${chronFiles.length} chronicle scripts).`);
  } else {
    console.log(`[sync-scripts] Already up to date (${eventFiles.length} event scripts, ${chronFiles.length} chronicle scripts).`);
  }
}

main();
