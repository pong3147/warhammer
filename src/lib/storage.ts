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

export function loadHall(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveToHall(charState: any, engine: any): boolean {
  const list = loadHall();
  if (list.some((x) => x.id === charState.id)) return true;
  const grade = charState.finalGrade || engine.evaluateLifeGrade(charState);
  list.unshift({
    id: charState.id,
    name: charState.name,
    mode: charState.mode,
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
    tags: [...(charState.tags || [])].slice(0, 14),
    stats: { ...(charState.stats || {}) },
    alignment: engine.normalizeAlignment(charState),
    faith: charState.faith,
    corruption: charState.corruption,
    grade
  });
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
  restoredActive: any | null;
  restoredPrefs: UserPrefs | null;
}

export function applyImportedBackup(rawText: string, engine: any): ImportBackupResult {
  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch {
    return { ok: false, error: "올바른 JSON 백업 파일이 아니다.", restoredHallCount: 0, restoredActive: null, restoredPrefs: null };
  }
  if (!data || typeof data !== "object" || (!Array.isArray(data.hall) && !data.activeState && !data.prefs)) {
    return { ok: false, error: "백업 파일 형식이 맞지 않는다.", restoredHallCount: 0, restoredActive: null, restoredPrefs: null };
  }

  let restoredHallCount = 0;
  let restoredActive: any | null = null;
  let restoredPrefs: UserPrefs | null = null;

  if (Array.isArray(data.hall)) {
    const existing = loadHall();
    const byId = new Map<string, any>();
    for (const item of [...data.hall, ...existing]) {
      if (item && item.id && !byId.has(item.id)) byId.set(item.id, item);
    }
    const merged = Array.from(byId.values()).slice(0, 60);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      return { ok: false, error: "브라우저 저장 공간 부족으로 영혼의 전당을 불러오지 못했다.", restoredHallCount: 0, restoredActive: null, restoredPrefs: null };
    }
    restoredHallCount = merged.length;
  }

  if (data.prefs && typeof data.prefs === "object") {
    restoredPrefs = {
      srAnnounce: data.prefs.srAnnounce !== false,
      fastChildhood: Boolean(data.prefs.fastChildhood),
      careerAlert: Boolean(data.prefs.careerAlert)
    };
    savePrefs(restoredPrefs);
  }

  if (data.activeState && typeof data.activeState === "object") {
    const migrated = engine.migrateState(data.activeState);
    if (migrated && migrated.alive && migrated.name) {
      if (!saveActiveState(migrated, engine)) {
        return { ok: false, error: "브라우저 저장 공간 부족으로 진행 중 생애를 복원하지 못했다.", restoredHallCount, restoredActive: null, restoredPrefs };
      }
      restoredActive = migrated;
    }
  }

  return { ok: true, restoredHallCount, restoredActive, restoredPrefs };
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
