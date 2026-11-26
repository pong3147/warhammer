const EVENT_DIR_ORDER = ["careers", "chapters", "worlds", "themes"];

function sortEventEntries(entries) {
  return [...entries].sort(([pathA], [pathB]) => {
    const cleanA = pathA.replace(/^\.\/events\//, "");
    const cleanB = pathB.replace(/^\.\/events\//, "");
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

function sortChronicleEntries(entries) {
  return [...entries].sort(([pathA], [pathB]) => {
    const depthA = pathA.split("/").length;
    const depthB = pathB.split("/").length;
    if (depthA !== depthB) return depthA - depthB;
    return pathA.localeCompare(pathB, "en");
  });
}

const eventModules = import.meta.glob("./events/**/*.js", { eager: true });
const chronModules = import.meta.glob("./chronicles/**/*.js", { eager: true });

export const EVENTS = [];
for (const [, mod] of sortEventEntries(Object.entries(eventModules))) {
  if (Array.isArray(mod.default)) EVENTS.push(...mod.default);
}

export const CHRONICLES = [];
for (const [, mod] of sortChronicleEntries(Object.entries(chronModules))) {
  if (Array.isArray(mod.default)) CHRONICLES.push(...mod.default);
}
