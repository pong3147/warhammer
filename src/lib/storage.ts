export const STORAGE_KEY = "imperium_vita_hall_v1";
export const ACTIVE_SAVE_KEY = "imperium_vita_active_v1";
export const PREFS_KEY = "imperium_vita_prefs_v1";

export interface UserPrefs {
  srAnnounce: boolean;
  fastChildhood: boolean;
  careerAlert: boolean;
}

export const DEFAULT_PREFS: UserPrefs = {
  srAnnounce: true,
  fastChildhood: false,
  careerAlert: false
};

export function loadPrefs(): UserPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    const saved = raw ? JSON.parse(raw) : null;
    if (saved && typeof saved === "object") {
      return {
        srAnnounce: saved.srAnnounce !== false,
        fastChildhood: Boolean(saved.fastChildhood),
        careerAlert: Boolean(saved.careerAlert)
      };
    }
  } catch {
    // ignore storage errors
  }
  return { ...DEFAULT_PREFS };
}

export function savePrefs(prefs: UserPrefs): boolean {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    return true;
  } catch {
    return false;
  }
}

export function saveActiveState(state: any, engine: any): boolean {
  if (!state) return false;
  try {
    state.saveVersion = engine.SAVE_VERSION;
    if (state.alive) {
      localStorage.setItem(ACTIVE_SAVE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(ACTIVE_SAVE_KEY);
    }
    return true;
  } catch {
    return false;
  }
}

export function loadActiveState(engine: any): any | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const migrated = engine.migrateState(parsed);
    if (!migrated || !migrated.alive || !migrated.name) return null;
    return migrated;
  } catch {
    return null;
  }
}

export function clearActiveState(): void {
  try {
    localStorage.removeItem(ACTIVE_SAVE_KEY);
  } catch {
    // ignore
  }
}

const HALL_STAT_KEYS = ["WS", "BS", "T", "Ag", "Int", "WP", "Fel", "Inf"] as const;
const FORBIDDEN_PROTO_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export interface HallEntry {
  id: string;
  name: string;
  mode: string;
  difficulty?: "standard" | "grimdark";
  age: number;
  birthYear: number;
  deathYear: number;
  homeWorldId: string;
  visitedWorlds: string[];
  careerId: string;
  careerHistory: string[];
  careerTitle: string;
  chapterId: string | null;
  deathCause: string;
  seenTimeline: string[];
  metCharacters: string[];
  tags: string[];
  stats?: Record<string, number>;
  alignment?: { humane: number; dogmatic: number; ruthless: number };
  faith: number;
  corruption: number;
  grade: { rank?: string; title?: string; verdict?: string; score?: number } | null;
}

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return Boolean(val) && typeof val === "object" && !Array.isArray(val);
}

function parseFiniteNumber(val: unknown): number | null {
  const n = typeof val === "number" ? val : typeof val === "string" && val.trim() !== "" ? Number(val) : NaN;
  return Number.isFinite(n) ? n : null;
}

function asFiniteNumber(val: unknown, fallback: number, min = -Infinity, max = Infinity): number {
  const n = parseFiniteNumber(val);
  if (n === null) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function asStringList(val: unknown, maxLen: number): string[] {
  if (!Array.isArray(val)) return [];
  const out: string[] = [];
  for (const item of val) {
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed.length > 0 && trimmed.length <= 120 && !FORBIDDEN_PROTO_KEYS.has(trimmed)) {
        out.push(trimmed);
        if (out.length >= maxLen) break;
      }
    }
  }
  return out;
}

function asSafeText(val: unknown, fallback = "", maxLen = 600): string {
  if (typeof val !== "string") return fallback;
  return val.trim().slice(0, maxLen);
}

export function sanitizeHallEntry(raw: unknown): HallEntry | null {
  if (!isPlainObject(raw)) return null;
  const r = raw;
  const id = asSafeText(r.id, "", 120);
  const name = asSafeText(r.name, "", 120);
  if (!id || !name) return null;

  const age = asFiniteNumber(r.age, 0, 0, 100000);
  const parsedBirth = parseFiniteNumber(r.birthYear);
  const parsedDeath = parseFiniteNumber(r.deathYear);
  const birthYear =
    parsedBirth !== null
      ? asFiniteNumber(parsedBirth, 960, 0, 200000)
      : parsedDeath !== null
        ? Math.max(0, asFiniteNumber(parsedDeath, 999, 0, 200000) - age)
        : 960;
  const deathYear =
    parsedDeath !== null
      ? asFiniteNumber(parsedDeath, birthYear + age, 0, 200000)
      : birthYear + age;

  const homeWorldId = asSafeText(r.homeWorldId, "generic_hive", 80) || "generic_hive";
  const visitedRaw = asStringList(r.visitedWorlds, 40);
  const visitedWorlds = visitedRaw.length ? visitedRaw : [homeWorldId];

  const careerId = asSafeText(r.careerId, "child", 80) || "child";
  const historyRaw = asStringList(r.careerHistory, 40);
  const careerHistory = historyRaw.length ? historyRaw : [careerId];

  let stats: Record<string, number> | undefined;
  if (isPlainObject(r.stats)) {
    const cleanStats: Record<string, number> = {};
    for (const k of HALL_STAT_KEYS) {
      const num = parseFiniteNumber(r.stats[k]);
      if (num !== null) {
        cleanStats[k] = asFiniteNumber(num, 0, 0, 200);
      }
    }
    if (Object.keys(cleanStats).length > 0) stats = cleanStats;
  }

  let alignment: { humane: number; dogmatic: number; ruthless: number } | undefined;
  if (isPlainObject(r.alignment)) {
    alignment = {
      humane: asFiniteNumber(r.alignment.humane, 0, 0, 100),
      dogmatic: asFiniteNumber(r.alignment.dogmatic, 0, 0, 100),
      ruthless: asFiniteNumber(r.alignment.ruthless, 0, 0, 100)
    };
  }

  let grade: HallEntry["grade"] = null;
  if (isPlainObject(r.grade)) {
    const cleanGrade: NonNullable<HallEntry["grade"]> = {};
    if (typeof r.grade.rank === "string" && r.grade.rank.trim()) cleanGrade.rank = asSafeText(r.grade.rank, "", 100);
    if (typeof r.grade.title === "string" && r.grade.title.trim()) cleanGrade.title = asSafeText(r.grade.title, "", 200);
    if (typeof r.grade.verdict === "string" && r.grade.verdict.trim()) cleanGrade.verdict = asSafeText(r.grade.verdict, "", 800);
    const parsedScore = parseFiniteNumber(r.grade.score);
    if (parsedScore !== null) cleanGrade.score = asFiniteNumber(parsedScore, 0, -10000, 100000);
    if (Object.keys(cleanGrade).length > 0) grade = cleanGrade;
  }

  const chapterRaw = asSafeText(r.chapterId, "", 80);

  return {
    id,
    name,
    mode: r.mode === "custom" ? "custom" : "random",
    difficulty: r.difficulty === "grimdark" ? "grimdark" : "standard",
    age,
    birthYear,
    deathYear,
    homeWorldId,
    visitedWorlds,
    careerId,
    careerHistory,
    careerTitle: asSafeText(r.careerTitle, "", 160),
    chapterId: chapterRaw && !FORBIDDEN_PROTO_KEYS.has(chapterRaw) ? chapterRaw : null,
    deathCause: asSafeText(r.deathCause, "", 400),
    seenTimeline: asStringList(r.seenTimeline, 60),
    metCharacters: asStringList(r.metCharacters, 60),
    tags: asStringList(r.tags, 24),
    ...(stats ? { stats } : {}),
    ...(alignment ? { alignment } : {}),
    faith: asFiniteNumber(r.faith, 0, 0, 100),
    corruption: asFiniteNumber(r.corruption, 0, 0, 100),
    grade
  };
}

export function loadHall(): HallEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const byId = new Map<string, HallEntry>();
    for (const item of parsed) {
      const clean = sanitizeHallEntry(item);
      if (clean && !byId.has(clean.id)) byId.set(clean.id, clean);
    }
    return Array.from(byId.values()).slice(0, 60);
  } catch {
    return [];
  }
}

export function saveToHall(charState: any, engine: any): boolean {
  const list = loadHall();
  if (list.some((x) => x.id === charState.id)) return true;
  const grade = charState.finalGrade || engine.evaluateLifeGrade(charState);
  const clean = sanitizeHallEntry({
    id: charState.id,
    name: charState.name,
    mode: charState.mode,
    difficulty: charState.difficulty === "grimdark" ? "grimdark" : "standard",
    age: charState.age,
    birthYear: charState.birthYear,
    deathYear: charState.year,
    homeWorldId: charState.homeWorldId,
    visitedWorlds: [...(charState.visitedWorlds || [charState.homeWorldId])],
    careerId: charState.careerId,
    careerHistory: [...(charState.careerHistory || [charState.careerId])],
    careerTitle: engine.getCareerDisplayTitle(charState),
    chapterId: charState.chapterId,
    deathCause: charState.deathCause,
    seenTimeline: [...(charState.seenTimeline || [])],
    metCharacters: [...(charState.metCharacters || [])],
    tags: [...(charState.tags || [])].slice(0, 24),
    stats: { ...(charState.stats || {}) },
    alignment: engine.normalizeAlignment(charState),
    faith: charState.faith,
    corruption: charState.corruption,
    grade
  });
  if (!clean) return false;
  list.unshift(clean);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 60)));
    return true;
  } catch {
    return false;
  }
}

export function clearHall(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function buildBackupPayload(activeState: any | null, engine: any): Record<string, any> {
  const storedActive = activeState && activeState.alive ? activeState : loadActiveState(engine);
  return {
    app: "1 / QUADRILLION : IMPERIALIS VITA",
    backupVersion: 1,
    saveVersion: engine.SAVE_VERSION,
    exportedAt: new Date().toISOString(),
    prefs: loadPrefs(),
    activeState: storedActive,
    hall: loadHall()
  };
}

export interface ImportBackupResult {
  ok: boolean;
  error?: string;
  restoredHallCount: number;
  skippedHallCount?: number;
  restoredActive: any | null;
  restoredPrefs: UserPrefs | null;
}

export function applyImportedBackup(rawText: string, engine: any): ImportBackupResult {
  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    return { ok: false, error: "올바른 JSON 백업 파일이 아니다.", restoredHallCount: 0, skippedHallCount: 0, restoredActive: null, restoredPrefs: null };
  }

  const hasHallArray = isPlainObject(data) && Array.isArray(data.hall);
  const hasPrefsObj = isPlainObject(data) && isPlainObject(data.prefs);
  const hasActiveObj = isPlainObject(data) && isPlainObject(data.activeState);

  if (!isPlainObject(data) || (!hasHallArray && !hasPrefsObj && !hasActiveObj)) {
    return { ok: false, error: "백업 파일 형식이 맞지 않는다.", restoredHallCount: 0, skippedHallCount: 0, restoredActive: null, restoredPrefs: null };
  }

  // Validate and prepare all sections before mutating localStorage (avoid partial writes on malformed activeState)
  let skippedHallCount = 0;
  let validImportedHall = 0;
  let mergedHall: HallEntry[] | null = null;
  let restoredHallCount = 0;

  if (hasHallArray) {
    const importedClean: HallEntry[] = [];
    for (const rawItem of data.hall as unknown[]) {
      const clean = sanitizeHallEntry(rawItem);
      if (clean) {
        importedClean.push(clean);
      } else {
        skippedHallCount++;
      }
    }
    validImportedHall = importedClean.length;
    const existing = loadHall();
    const byId = new Map<string, HallEntry>();
    for (const item of [...importedClean, ...existing]) {
      if (!byId.has(item.id)) byId.set(item.id, item);
    }
    if (validImportedHall > 0 || (data.hall as unknown[]).length === 0) {
      mergedHall = Array.from(byId.values()).slice(0, 60);
      restoredHallCount = mergedHall.length;
    } else {
      restoredHallCount = existing.length;
    }
  }

  let preparedPrefs: UserPrefs | null = null;
  if (hasPrefsObj) {
    const p = data.prefs as Record<string, unknown>;
    preparedPrefs = {
      srAnnounce: p.srAnnounce !== false,
      fastChildhood: Boolean(p.fastChildhood),
      careerAlert: Boolean(p.careerAlert)
    };
  }

  let preparedActive: any | null = null;
  if (hasActiveObj) {
    try {
      const migrated = engine.migrateState(data.activeState);
      if (migrated && migrated.alive && typeof migrated.name === "string" && migrated.name.trim()) {
        preparedActive = migrated;
      }
    } catch {
      preparedActive = null;
    }
  }

  const hasLegitEmptyHall = hasHallArray && (data.hall as unknown[]).length === 0;
  const hasRestorableSection = validImportedHall > 0 || hasLegitEmptyHall || preparedPrefs !== null || preparedActive !== null;
  if (!hasRestorableSection) {
    return {
      ok: false,
      error: "유효한 영혼의 전당 또는 생애 기록을 찾을 수 없는 손상된 백업 파일이다.",
      restoredHallCount: 0,
      skippedHallCount,
      restoredActive: null,
      restoredPrefs: null
    };
  }

  if (mergedHall !== null) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedHall));
    } catch {
      return { ok: false, error: "브라우저 저장 공간 부족으로 영혼의 전당을 불러오지 못했다.", restoredHallCount: 0, skippedHallCount, restoredActive: null, restoredPrefs: null };
    }
  }

  if (preparedPrefs) {
    savePrefs(preparedPrefs);
  }

  if (preparedActive) {
    if (!saveActiveState(preparedActive, engine)) {
      return { ok: false, error: "브라우저 저장 공간 부족으로 진행 중 생애를 복원하지 못했다.", restoredHallCount, skippedHallCount, restoredActive: null, restoredPrefs: preparedPrefs };
    }
  }

  return { ok: true, restoredHallCount, skippedHallCount, restoredActive: preparedActive, restoredPrefs: preparedPrefs };
}

export function downloadTextFile(filename: string, content: string, mime = "text/plain;charset=utf-8"): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
