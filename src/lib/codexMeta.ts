import { CORE_DATA } from "../data/core/index.js";

export const TREE_ORDER = [
  "civil",
  "militarum",
  "commissariat",
  "sororitas",
  "ecclesiarchy",
  "astartes",
  "grey_knights",
  "custodes",
  "inquisition",
  "mechanicus",
  "navy",
  "arbites",
  "administratum",
  "governor",
  "rogue_trader",
  "psyker",
  "navis_navigator",
  "officio_assassinorum",
  "imperial_knight",
  "living_saint",
  "chaos"
] as const;

export function groupCareersByTree(careers: any[]) {
  const map = new Map<string, { tree: string; treeName: string; list: any[] }>();
  for (const c of careers) {
    const key = c.tree || "other";
    if (!map.has(key)) {
      map.set(key, { tree: key, treeName: c.treeName || c.faction || key, list: [] });
    }
    map.get(key)!.list.push(c);
  }
  const groups = Array.from(map.values());
  groups.sort((a, b) => {
    const ia = TREE_ORDER.indexOf(a.tree as any);
    const ib = TREE_ORDER.indexOf(b.tree as any);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  for (const g of groups) {
    g.list.sort((a, b) => (a.tier || 0) - (b.tier || 0));
  }
  return groups;
}

const selectableCareers = CORE_DATA.CAREERS.filter((c: any) => c.selectable);
const uniqueTrees = new Set(selectableCareers.map((c: any) => c.tree));

export const CODEX_COUNTS = {
  worlds: CORE_DATA.WORLDS.length,
  segmenta: Object.keys(CORE_DATA.SEGMENTA).length,
  origins: CORE_DATA.ORIGINS.length,
  traits: CORE_DATA.TRAITS.length,
  careers: selectableCareers.length,
  factions: uniqueTrees.size,
  chapters: CORE_DATA.CHAPTERS.length,
  timeline: CORE_DATA.TIMELINE.length,
  characters: CORE_DATA.CHARACTERS.length
} as const;
