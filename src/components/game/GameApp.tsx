import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORE_DATA, coreEngine, loadFullGameRuntime } from "../../data/index.js";
import { formatRollOutcomeLabel } from "../../engine/formatters.js";
import { buildPlainTextChronicle, copyTextWithFallback } from "../../lib/chronicleText";
import {
  clearActiveState,
  downloadTextFile,
  loadActiveState,
  loadPrefs,
  saveActiveState,
  savePrefs,
  saveToHall,
  type UserPrefs
} from "../../lib/storage";
import ActiveEventPanel from "./ActiveEventPanel";
import AutonomousPanel from "./AutonomousPanel";
import DossierPanel from "./DossierPanel";
import FocusGrid from "./FocusGrid";
import FullChronicleView from "./FullChronicleView";
import ObituaryModal from "./ObituaryModal";
import RecentChronicleList from "./RecentChronicleList";
import StartScreen from "./StartScreen";
import TimeControlPanel from "./TimeControlPanel";
import type { StartConfig } from "./types";

export interface NarrativeCounts {
  events: number;
  chronicles: number;
}

export interface GameAppProps {
  engineOverride?: any;
  dataOverride?: any;
  narrativeCounts?: NarrativeCounts;
}

export default function GameApp({ engineOverride, dataOverride, narrativeCounts }: GameAppProps = {}) {
  const [runtime, setRuntime] = useState<{ engine: any; data: any } | null>(() =>
    engineOverride && dataOverride ? { engine: engineOverride, data: dataOverride } : null
  );
  const [narrativeLoading, setNarrativeLoading] = useState(false);

  const [state, setState] = useState<any | null>(null);
  const [renderRev, setRenderRev] = useState(0);
  const [speed, setSpeedState] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"play" | "chronicle">("play");
  const [obitOpen, setObitOpen] = useState(false);
  const [prefs, setPrefs] = useState<UserPrefs>(() => loadPrefs());
  const [savedSummary, setSavedSummary] = useState<any | null>(null);
  const [liveMsg, setLiveMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [progressResetToken, setProgressResetToken] = useState(0);

  const stateRef = useRef<any | null>(null);
  stateRef.current = state;
  const speedRef = useRef<number>(speed);
  speedRef.current = speed;
  const prefsRef = useRef<UserPrefs>(prefs);
  prefsRef.current = prefs;
  const runtimeRef = useRef<{ engine: any; data: any } | null>(runtime);
  runtimeRef.current = runtime;

  const startHeadingRef = useRef<HTMLHeadingElement>(null);
  const announceSeqRef = useRef(0);
  const toastTimerRef = useRef<number | null>(null);
  const storageWarnedRef = useRef(false);
  const knownUnlockedRef = useRef<Set<string>>(new Set());

  const bump = useCallback(() => setRenderRev((n) => n + 1), []);

  const announce = useCallback((msg: string) => {
    if (!msg) return;
    announceSeqRef.current += 1;
    const suffix = announceSeqRef.current % 2 === 0 ? "\u200B" : "";
    setLiveMsg(msg + suffix);
  }, []);

  const showToast = useCallback(
    (msg: string, speak = true) => {
      setToastMsg(msg);
      setToastVisible(true);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToastVisible(false), 2800);
      if (speak) announce(msg);
    },
    [announce]
  );

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  const persistState = useCallback(
    (charState: any | null, eng: any) => {
      if (!charState || !eng) return;
      const ok = saveActiveState(charState, eng);
      if (!ok && !storageWarnedRef.current) {
        storageWarnedRef.current = true;
        showToast("브라우저 저장 공간이 부족해 자동 저장에 실패했다. 영혼의 전당에서 백업을 권장한다.", true);
      }
    },
    [showToast]
  );

  const ensureRuntime = useCallback(async () => {
    if (runtimeRef.current) return runtimeRef.current;
    setNarrativeLoading(true);
    announce("제국 연대기 및 분기 사건 데이터를 불러오는 중이다.");
    try {
      const loaded = await loadFullGameRuntime();
      runtimeRef.current = loaded;
      setRuntime(loaded);
      return loaded;
    } finally {
      setNarrativeLoading(false);
    }
  }, [announce]);

  // 마운트 시 기존 진행 저장본 확인 + 2.3MB 사건/연대기 청크 백그라운드 프리로드
  useEffect(() => {
    const existing = loadActiveState(engineOverride || coreEngine);
    if (existing) setSavedSummary(existing);
    if (!engineOverride) {
      loadFullGameRuntime()
        .then((loaded) => {
          runtimeRef.current = loaded;
          setRuntime(loaded);
        })
        .catch(() => {
          // 시작 버튼 클릭 시 재시도
        });
    }
  }, [engineOverride]);

  // 페이지 이탈 시 안전 자동 저장
  useEffect(() => {
    const handleUnload = () => {
      if (stateRef.current && runtimeRef.current) {
        saveActiveState(stateRef.current, runtimeRef.current.engine);
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, []);

  // 상단 Astro 헤더 상태 알약 동기화
  useEffect(() => {
    const hdrYear = document.getElementById("hdr-year");
    const hdrRealm = document.getElementById("hdr-realm");
    if (!hdrYear || !hdrRealm) return;
    if (!state || !runtime) {
      hdrYear.textContent = "대기 중 · M41";
      hdrRealm.textContent = "임페리움 상크투스";
      hdrRealm.className = "status-pill";
      return;
    }
    const { engine } = runtime;
    hdrYear.textContent = `${engine.formatImperialDate(state.year, state.quarter)} · ${state.age}세`;
    if (state.tags.includes("imperial_nihilus")) {
      hdrRealm.textContent = "임페리움 니힐루스 (암흑 제국)";
      hdrRealm.className = "status-pill nihilus";
    } else if (state.globalFlags && state.globalFlags.greatRiftOpened) {
      hdrRealm.textContent = "임페리움 상크투스 (대균열 이후)";
      hdrRealm.className = "status-pill";
    } else {
      hdrRealm.textContent = "임페리움 상크투스";
      hdrRealm.className = "status-pill";
    }
  }, [state, runtime, renderRev]);

  const getActionableUnlockedIds = useCallback((charState: any, eng: any) => {
    const opts = eng.getContextualOptions(charState);
    const serviceLeft = opts.manualCareerCooldownLeft || 0;
    const retryMap = opts.careerRetryAfter || {};
    return (opts.unlockedCareers || []).filter((c: any) => {
      const retryLeft = Number.isFinite(retryMap[c.id]) ? Math.max(0, retryMap[c.id] - charState.year) : 0;
      const blockedByService = !c.isTranshuman && c.tree !== "chaos" && serviceLeft > 0;
      return retryLeft === 0 && !blockedByService;
    });
  }, []);

  const syncKnownUnlocked = useCallback((charState: any, eng: any) => {
    if (!charState || !charState.alive) {
      knownUnlockedRef.current = new Set();
      return;
    }
    const actionable = getActionableUnlockedIds(charState, eng);
    knownUnlockedRef.current = new Set(actionable.map((c: any) => c.id));
  }, [getActionableUnlockedIds]);

  const detectNewCareerUnlocks = useCallback((charState: any, eng: any) => {
    if (!charState || !charState.alive) return [];
    const actionable = getActionableUnlockedIds(charState, eng);
    const newly: any[] = [];
    for (const c of actionable) {
      if (!knownUnlockedRef.current.has(c.id)) newly.push(c);
    }
    knownUnlockedRef.current = new Set(actionable.map((c: any) => c.id));
    return newly;
  }, [getActionableUnlockedIds]);

  const handleSetSpeed = useCallback(
    (nextSpeed: number) => {
      const cur = stateRef.current;
      if (nextSpeed > 0 && cur && cur.pendingEvent) {
        showToast("진행 중인 사건의 선택지를 먼저 결정하라.", true);
        return;
      }
      if (nextSpeed > 0 && cur && !cur.alive) {
        showToast("이미 종료된 생애다.", true);
        return;
      }
      setSpeedState(nextSpeed);
      setProgressResetToken((t) => t + 1);
      if (nextSpeed === 0 && cur && runtimeRef.current) {
        persistState(cur, runtimeRef.current.engine);
      }
    },
    [persistState, showToast]
  );

  const handleDeath = useCallback(
    (charState: any, eng: any) => {
      setSpeedState(0);
      saveToHall(charState, eng);
      clearActiveState();
      setSavedSummary(null);
      setObitOpen(true);
      announce(`${charState.name}, ${charState.age}세로 생애 마감. 사인: ${charState.deathCause}`);
    },
    [announce]
  );

  const stepOneQuarter = useCallback(() => {
    const cur = stateRef.current;
    const rt = runtimeRef.current;
    if (!cur || !rt || !cur.alive) {
      setSpeedState(0);
      return;
    }
    if (cur.pendingEvent) {
      setSpeedState(0);
      return;
    }

    const { engine } = rt;
    const prevTopLog = cur.logs[0] || null;
    const res = engine.advanceQuarter(cur, { fastChildhood: prefsRef.current.fastChildhood });
    setProgressResetToken((t) => t + 1);

    if (res.status === "dead" || !cur.alive) {
      bump();
      handleDeath(cur, engine);
      return;
    }

    const newlyUnlocked = detectNewCareerUnlocks(cur, engine);
    const shouldPersist = res.status === "event" || Boolean(res.isNewYear);

    if (res.status === "event" && cur.pendingEvent) {
      setSpeedState(0);
      persistState(cur, engine);
      bump();
      if (prefsRef.current.srAnnounce) {
        announce(`진행 중인 사건 발생: ${cur.pendingEvent.title}`);
      }
      return;
    }

    if (newlyUnlocked.length > 0 && prefsRef.current.careerAlert) {
      setSpeedState(0);
      persistState(cur, engine);
      bump();
      showToast(
        `새 진로 해금: ${newlyUnlocked.map((c) => c.name).join(", ")}. 자율 선택에서 확인하라.`,
        true
      );
      return;
    }

    if (shouldPersist) persistState(cur, engine);
    bump();

    if (prefsRef.current.srAnnounce && cur.logs[0] && cur.logs[0] !== prevTopLog) {
      const top = cur.logs[0];
      if (top) announce(`${top.year}, ${top.age}세: ${top.text}`);
    }
  }, [announce, bump, detectNewCareerUnlocks, handleDeath, persistState, showToast]);

  const handleFastForward = useCallback(() => {
    const cur = stateRef.current;
    const rt = runtimeRef.current;
    if (!cur || !rt || !cur.alive) {
      showToast("진행할 수 있는 생애가 없다.", true);
      return;
    }
    if (cur.pendingEvent) {
      showToast("먼저 현재 사건의 선택지를 결정하라.", true);
      return;
    }
    const { engine } = rt;
    setSpeedState(0);
    let advanced = 0;
    let unlockedNames: string[] = [];

    for (let i = 0; i < 30; i++) {
      const res = engine.advanceQuarter(cur, { fastChildhood: prefsRef.current.fastChildhood });
      advanced++;
      if (res.status === "dead" || !cur.alive) {
        bump();
        handleDeath(cur, engine);
        return;
      }
      const newly = detectNewCareerUnlocks(cur, engine);
      if (newly.length > 0 && prefsRef.current.careerAlert) {
        unlockedNames = newly.map((c) => c.name);
        break;
      }
      if (res.status === "event" && cur.pendingEvent) break;
    }

    persistState(cur, engine);
    setProgressResetToken((t) => t + 1);
    bump();

    if (cur.pendingEvent) {
      announce(`${advanced}분기 진행 후 사건 발생: ${cur.pendingEvent.title}`);
    } else if (unlockedNames.length > 0) {
      showToast(`${advanced}분기 진행 후 새 진로 해금: ${unlockedNames.join(", ")}`, true);
    } else {
      showToast(
        `${advanced}분기 진행 완료 (${engine.formatImperialDate(cur.year, cur.quarter)}, ${cur.age}세). 특별한 분기 사건은 없었다.`,
        true
      );
    }
  }, [announce, bump, detectNewCareerUnlocks, handleDeath, persistState, showToast]);

  const startWithRuntime = useCallback(
    (rt: { engine: any; data: any }, config: StartConfig) => {
      const charState = rt.engine.createCharacter(config);
      stateRef.current = charState;
      setState(charState);
      setObitOpen(false);
      setViewMode("play");
      setSpeedState(1);
      setProgressResetToken((t) => t + 1);
      syncKnownUnlocked(charState, rt.engine);
      persistState(charState, rt.engine);
      setSavedSummary(null);
      bump();
      const homeWorld = rt.engine.getWorld(charState.homeWorldId);
      announce(
        `${charState.name} 탄생. ${homeWorld.name}, ${rt.engine.formatImperialYear(charState.birthYear)}. 1배속으로 생애를 시작한다.`
      );
      window.setTimeout(() => {
        if (!stateRef.current?.pendingEvent) {
          const target =
            document.getElementById("recent-chronicle-heading") ||
            document.getElementById("heading-control");
          if (target instanceof HTMLElement) target.focus();
        }
      }, 0);
    },
    [announce, bump, persistState, syncKnownUnlocked]
  );

  const handleStartGame = useCallback(
    (config: StartConfig) => {
      if (runtimeRef.current) {
        startWithRuntime(runtimeRef.current, config);
        return;
      }
      void ensureRuntime()
        .then((rt) => startWithRuntime(rt, config))
        .catch(() => {
          showToast("사건 데이터를 불러오지 못했다. 잠시 후 다시 시도하라.", true);
        });
    },
    [ensureRuntime, showToast, startWithRuntime]
  );

  const resumeWithRuntime = useCallback(
    (rt: { engine: any; data: any }) => {
      const restored = loadActiveState(rt.engine);
      if (!restored) {
        setSavedSummary(null);
        showToast("이어할 수 있는 저장본이 없다.", true);
        return;
      }
      stateRef.current = restored;
      setState(restored);
      setObitOpen(false);
      setViewMode("play");
      setSpeedState(0);
      setProgressResetToken((t) => t + 1);
      syncKnownUnlocked(restored, rt.engine);
      setSavedSummary(null);
      bump();
      showToast(`${restored.name} (${restored.age}세)의 생애를 일시정지 상태로 불러왔다.`, true);
      window.setTimeout(() => {
        if (!stateRef.current?.pendingEvent) {
          const target =
            document.getElementById("heading-control") ||
            document.getElementById("recent-chronicle-heading");
          if (target instanceof HTMLElement) target.focus();
        }
      }, 0);
    },
    [bump, showToast, syncKnownUnlocked]
  );

  const handleResumeSaved = useCallback(() => {
    if (runtimeRef.current) {
      resumeWithRuntime(runtimeRef.current);
      return;
    }
    void ensureRuntime()
      .then((rt) => resumeWithRuntime(rt))
      .catch(() => {
        showToast("사건 데이터를 불러오지 못했다. 잠시 후 다시 시도하라.", true);
      });
  }, [ensureRuntime, resumeWithRuntime, showToast]);

  const handleDiscardSaved = useCallback(() => {
    clearActiveState();
    setSavedSummary(null);
    showToast("진행 중이던 저장본을 삭제했다.", true);
    window.setTimeout(() => {
      startHeadingRef.current?.focus();
    }, 0);
  }, [showToast]);

  const handleNewLife = useCallback(() => {
    const cur = stateRef.current;
    const rt = runtimeRef.current;
    setSpeedState(0);
    if (cur && cur.alive && rt) {
      persistState(cur, rt.engine);
      setSavedSummary(cur);
    } else {
      setSavedSummary(loadActiveState(rt ? rt.engine : coreEngine));
    }
    stateRef.current = null;
    setState(null);
    setObitOpen(false);
    setViewMode("play");
    announce("새로운 영혼 탄생 화면으로 돌아왔다.");
    window.setTimeout(() => {
      startHeadingRef.current?.focus();
    }, 0);
  }, [announce, persistState]);

  const handleSelectFocus = useCallback(
    (focusId: string) => {
      const cur = stateRef.current;
      const rt = runtimeRef.current;
      if (!cur || !rt || !cur.alive) return;
      cur.focus = focusId;
      persistState(cur, rt.engine);
      bump();
      const meta = rt.engine.FOCUSES[focusId];
      if (meta) showToast(`연간 삶의 초점을 변경했다: ${meta.name}.`, true);
    },
    [bump, persistState, showToast]
  );

  const handleChooseEvent = useCallback(
    (choiceIdx: number) => {
      const cur = stateRef.current;
      const rt = runtimeRef.current;
      if (!cur || !rt || !cur.pendingEvent) return;
      const prevTopLog = cur.logs[0];
      const res = rt.engine.resolvePendingChoice(cur, choiceIdx);
      if (!res) {
        showToast("선택할 수 없는 선택지다.", true);
        return;
      }
      if (!cur.alive) {
        bump();
        handleDeath(cur, rt.engine);
        return;
      }
      syncKnownUnlocked(cur, rt.engine);
      persistState(cur, rt.engine);
      bump();
      const top = cur.logs[0];
      if (top && top !== prevTopLog) {
        const rollPrefix = top.meta
          ? `${formatRollOutcomeLabel(top.meta)}(${top.meta.roll}/${top.meta.target}). `
          : "";
        announce(`${rollPrefix}${top.text}${top.deltaText ? " 변화: " + top.deltaText : ""}`);
      }
      if (!cur.pendingEvent) {
        window.setTimeout(() => {
          const target = document.getElementById("recent-chronicle-heading");
          if (target instanceof HTMLElement) target.focus();
        }, 0);
      }
    },
    [announce, bump, handleDeath, persistState, showToast, syncKnownUnlocked]
  );

  const handleApplyCareer = useCallback(
    (careerId: string) => {
      const cur = stateRef.current;
      const rt = runtimeRef.current;
      if (!cur || !rt || !cur.alive) return;
      if (cur.pendingEvent) {
        showToast("먼저 현재 진행 중인 사건을 해결하라.", true);
        return;
      }
      const res = rt.engine.attemptCareerChange(cur, careerId);
      if (!cur.alive || (res && res.dead)) {
        bump();
        handleDeath(cur, rt.engine);
        return;
      }
      if (!res || !res.ok) {
        persistState(cur, rt.engine);
        bump();
        showToast((res && (res.msg || res.reason)) || "지원할 수 없다.", true);
        return;
      }
      syncKnownUnlocked(cur, rt.engine);
      persistState(cur, rt.engine);
      bump();
      if (cur.pendingEvent) {
        setSpeedState(0);
        announce(`진행 중인 사건 발생: ${cur.pendingEvent.title}`);
      } else {
        showToast(res.msg || "전직을 완료했다.", true);
      }
    },
    [announce, bump, handleDeath, persistState, showToast, syncKnownUnlocked]
  );

  const handlePerformAction = useCallback(
    (actionId: string) => {
      const cur = stateRef.current;
      const rt = runtimeRef.current;
      if (!cur || !rt || !cur.alive) return;
      if (cur.pendingEvent) {
        showToast("먼저 현재 진행 중인 사건을 해결하라.", true);
        return;
      }
      const res = rt.engine.performAction(cur, actionId);
      if (!cur.alive || (res && res.dead)) {
        bump();
        handleDeath(cur, rt.engine);
        return;
      }
      if (!res || !res.ok) {
        persistState(cur, rt.engine);
        bump();
        showToast((res && (res.msg || res.reason)) || "수행할 수 없다.", true);
        return;
      }
      syncKnownUnlocked(cur, rt.engine);
      persistState(cur, rt.engine);
      bump();
      if (cur.pendingEvent) {
        setSpeedState(0);
        announce(`진행 중인 사건 발생: ${cur.pendingEvent.title}`);
      } else {
        showToast(res.msg || "행동을 완료했다.", true);
      }
    },
    [announce, bump, handleDeath, persistState, showToast, syncKnownUnlocked]
  );

  const handleAttemptTravel = useCallback(
    (targetWorldId: string) => {
      const cur = stateRef.current;
      const rt = runtimeRef.current;
      if (!cur || !rt || !cur.alive) return;
      if (cur.pendingEvent) {
        showToast("먼저 현재 진행 중인 사건을 해결하라.", true);
        return;
      }
      const res = rt.engine.performAction(cur, "travel", targetWorldId);
      if (!cur.alive || (res && res.dead)) {
        bump();
        handleDeath(cur, rt.engine);
        return;
      }
      if (!res || !res.ok) {
        persistState(cur, rt.engine);
        bump();
        showToast((res && (res.msg || res.reason)) || "이동할 수 없다.", true);
        return;
      }
      syncKnownUnlocked(cur, rt.engine);
      persistState(cur, rt.engine);
      bump();
      if (cur.pendingEvent) {
        setSpeedState(0);
        announce(`진행 중인 사건 발생: ${cur.pendingEvent.title}`);
      } else {
        showToast(res.msg || "성간 이동을 마쳤다.", true);
      }
    },
    [announce, bump, handleDeath, persistState, showToast, syncKnownUnlocked]
  );

  const handleTogglePref = useCallback(
    (key: keyof UserPrefs, checked: boolean) => {
      const next = { ...prefsRef.current, [key]: checked };
      prefsRef.current = next;
      setPrefs(next);
      savePrefs(next);
      if (key === "careerAlert" && checked && stateRef.current && runtimeRef.current) {
        syncKnownUnlocked(stateRef.current, runtimeRef.current.engine);
      }
    },
    [syncKnownUnlocked]
  );

  const handleStatusSummary = useCallback(() => {
    const cur = stateRef.current;
    const rt = runtimeRef.current;
    if (!cur || !rt) {
      announce("현재 진행 중인 생애가 없다.");
      return;
    }
    announce(rt.engine.buildStatusSummary(cur));
  }, [announce]);

  const handleCopyChronicle = useCallback(async () => {
    const cur = stateRef.current;
    const rt = runtimeRef.current;
    if (!cur || !rt) return;
    const text = buildPlainTextChronicle(cur, rt.engine, rt.data);
    const ok = await copyTextWithFallback(text);
    showToast(ok ? "전체 생애 기록서를 클립보드에 복사했다." : "클립보드 복사에 실패했다.", true);
  }, [showToast]);

  const handleExportTxt = useCallback(() => {
    const cur = stateRef.current;
    const rt = runtimeRef.current;
    if (!cur || !rt) return;
    const text = buildPlainTextChronicle(cur, rt.engine, rt.data);
    const safeName = (cur.name || "imperial_soul").replace(/[^가-힣a-zA-Z0-9_-]/g, "_");
    downloadTextFile(`imperialis_vita_${safeName}_${cur.age}yr.txt`, text);
    showToast("생애 기록서 텍스트 파일을 저장했다.", true);
  }, [showToast]);

  const contextualOptions = useMemo(() => {
    if (!state || !runtime) return null;
    return runtime.engine.getContextualOptions(state);
  }, [state, runtime, renderRev]);

  const openChronicleView = useCallback(() => {
    if (speedRef.current > 0) setSpeedState(0);
    setObitOpen(false);
    setViewMode("chronicle");
  }, []);

  const handleBackToGame = useCallback(() => {
    setViewMode("play");
    window.setTimeout(() => {
      const target =
        document.getElementById("btn-open-full-chronicle") ||
        document.getElementById("recent-chronicle-heading");
      if (target instanceof HTMLElement) target.focus();
    }, 0);
  }, []);

  const handleCloseObituary = useCallback(() => {
    setObitOpen(false);
  }, []);

  const handleRestartRandom = useCallback(() => {
    const prevDifficulty = stateRef.current?.difficulty === "grimdark" ? "grimdark" : "standard";
    handleStartGame({ mode: "random", difficulty: prevDifficulty });
  }, [handleStartGame]);

  const effectiveNarrativeCounts = useMemo<NarrativeCounts | null>(() => {
    const d = runtime?.data || dataOverride;
    if (d && Array.isArray(d.EVENTS) && Array.isArray(d.CHRONICLES)) {
      return {
        events: d.EVENTS.length + (Array.isArray(d.TIMELINE) ? d.TIMELINE.length : CORE_DATA.TIMELINE.length),
        chronicles: d.CHRONICLES.length
      };
    }
    return narrativeCounts || null;
  }, [runtime, dataOverride, narrativeCounts]);

  const handleStartScreenNotify = useCallback(
    (msg: string) => {
      showToast(msg, true);
    },
    [showToast]
  );

  return (
    <>
      <div id="sr-live" className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </div>

      <div id="game-surface">
        {!state || !runtime ? (
          <StartScreen
            headingRef={startHeadingRef}
            savedSummary={savedSummary}
            narrativeLoading={narrativeLoading}
            narrativeCounts={effectiveNarrativeCounts}
            onStart={handleStartGame}
            onResume={handleResumeSaved}
            onDiscardSaved={handleDiscardSaved}
            onNotify={handleStartScreenNotify}
          />
        ) : viewMode === "chronicle" ? (
          <FullChronicleView
            state={state}
            engine={runtime.engine}
            onCopyChronicle={handleCopyChronicle}
            onExportTxt={handleExportTxt}
            onBackToGame={handleBackToGame}
            onAnnounce={announce}
          />
        ) : (
          <div id="play-dashboard" className="game-grid">
            <DossierPanel state={state} engine={runtime.engine} />

            <section className="panel" aria-labelledby="heading-control">
              <TimeControlPanel
                speed={speed}
                alive={state.alive}
                hasPendingEvent={Boolean(state.pendingEvent)}
                activeView={viewMode === "play"}
                prefs={prefs}
                progressResetToken={progressResetToken}
                onSetSpeed={handleSetSpeed}
                onStepQuarter={stepOneQuarter}
                onFastForward={handleFastForward}
                onTogglePref={handleTogglePref}
                onStatusSummary={handleStatusSummary}
                onNewLife={handleNewLife}
                onQuarterElapsed={stepOneQuarter}
              />

              <FocusGrid
                currentFocus={state.focus}
                focuses={runtime.engine.FOCUSES}
                onSelectFocus={handleSelectFocus}
              />

              <ActiveEventPanel state={state} engine={runtime.engine} onChoose={handleChooseEvent} />

              <RecentChronicleList logs={state.logs || []} onOpenFullChronicle={openChronicleView} />
            </section>

            {contextualOptions && (
              <AutonomousPanel
                state={state}
                engine={runtime.engine}
                options={contextualOptions}
                hasPendingEvent={Boolean(state.pendingEvent)}
                onApplyCareer={handleApplyCareer}
                onPerformAction={handlePerformAction}
                onAttemptTravel={handleAttemptTravel}
                onAnnounce={announce}
              />
            )}
          </div>
        )}
      </div>

      <ObituaryModal
        open={obitOpen}
        state={state}
        engine={runtime?.engine || coreEngine}
        data={runtime?.data || CORE_DATA}
        onOpenChronicle={openChronicleView}
        onCopyObituary={handleCopyChronicle}
        onRestartRandom={handleRestartRandom}
        onRestartCustom={handleNewLife}
        onClose={handleCloseObituary}
      />

      <div id="toast-msg" className={`toast-msg${toastVisible ? " show" : ""}`} aria-hidden="true">
        {toastMsg}
      </div>
    </>
  );
}
