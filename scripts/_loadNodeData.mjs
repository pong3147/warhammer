import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CORE_DATA } from "../src/data/core/index.js";
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from "../src/data/glossary.js";
import { createImperiumEngine } from "../src/engine/createEngine.js";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
export const EVENT_DIR_ORDER = ["careers", "chapters", "worlds", "themes"];

export function collectDirFiles(relDir, exts = [".js"]) {
  const abs = path.join(ROOT, relDir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  (function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile() && exts.some((ext) => ent.name.endsWith(ext))) {
        out.push(path.relative(ROOT, full).split(path.sep).join("/"));
      }
    }
  })(abs);
  return out.sort();
}

export function sortEventFiles(files) {
  return [...files].sort((a, b) => {
    const cleanA = a.replace(/^src\/data\/events\//, "");
    const cleanB = b.replace(/^src\/data\/events\//, "");
    const segA = cleanA.split("/");
    const segB = cleanB.split("/");
    const dirA = segA.length > 1 ? segA[0] : "";
    const dirB = segB.length > 1 ? segB[0] : "";
    const idxA = EVENT_DIR_ORDER.indexOf(dirA);
    const idxB = EVENT_DIR_ORDER.indexOf(dirB);
    const rankA = idxA === -1 ? 999 : idxA;
    const rankB = idxB === -1 ? 999 : idxB;
    if (rankA !== rankB) return rankA - rankB;
    return cleanA.localeCompare(cleanB, "en");
  });
}

export function sortChronicleFiles(files) {
  return [...files].sort((a, b) => {
    const depthA = a.split("/").length;
    const depthB = b.split("/").length;
    if (depthA !== depthB) return depthA - depthB;
    return a.localeCompare(b, "en");
  });
}

export async function loadNodeImperiumRuntime() {
  const eventFiles = sortEventFiles(collectDirFiles("src/data/events", [".js"]));
  const chronFiles = sortChronicleFiles(collectDirFiles("src/data/chronicles", [".js"]));
  const coreFiles = collectDirFiles("src/data/core", [".js"]);

  const EVENTS = [];
  const eventSourceByIndex = [];
  for (const rel of eventFiles) {
    const mod = await import(pathToFileURL(path.join(ROOT, rel)).href);
    const arr = Array.isArray(mod.default) ? mod.default : [];
    for (const item of arr) {
      eventSourceByIndex.push(rel);
      EVENTS.push(item);
    }
  }

  const CHRONICLES = [];
  const chronSourceByIndex = [];
  for (const rel of chronFiles) {
    const mod = await import(pathToFileURL(path.join(ROOT, rel)).href);
    const arr = Array.isArray(mod.default) ? mod.default : [];
    for (const item of arr) {
      chronSourceByIndex.push(rel);
      CHRONICLES.push(item);
    }
  }

  const DATA = {
    ...CORE_DATA,
    EVENTS,
    CHRONICLES,
    GLOSSARY_CATEGORIES,
    GLOSSARY_TERMS
  };
  const Engine = createImperiumEngine(DATA);

  return {
    ROOT,
    DATA,
    Engine,
    coreFiles,
    eventFiles,
    chronFiles,
    eventSourceByIndex,
    chronSourceByIndex
  };
}
