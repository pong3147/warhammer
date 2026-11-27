import React, { useEffect, useRef, useState } from "react";
import { CORE_DATA, coreEngine } from "../../data/index.js";
import { CODEX_COUNTS } from "../../lib/codexMeta";
import { withBase } from "../../lib/links";
import type { StartConfig } from "./types";

interface Props {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  savedSummary: any | null;
  narrativeLoading: boolean;
  narrativeCounts?: { events: number; chronicles: number } | null;
  onStart: (config: StartConfig) => void;
  onResume: () => void;
  onDiscardSaved: () => void;
  onNotify?: (msg: string) => void;
}

type ArmedAction = "discard" | "random" | "custom" | null;

export default function StartScreen({
  headingRef,
  savedSummary,
  narrativeLoading,
  narrativeCounts,
  onStart,
  onResume,
  onDiscardSaved,
  onNotify
}: Props) {
  const [eraId, setEraId] = useState(coreEngine.ERA_PRESETS[0]?.id || "armageddon");
  const [worldId, setWorldId] = useState(CORE_DATA.WORLDS[0]?.id || "terra");
  const [originId, setOriginId] = useState(CORE_DATA.ORIGINS[0]?.id || "imperial_citizen");
  const [traitId, setTraitId] = useState(CORE_DATA.TRAITS[0]?.id || "none");
  const [gender, setGender] = useState("random");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState<"standard" | "grimdark">("standard");
  const [armedAction, setArmedAction] = useState<ArmedAction>(null);
  const armTimerRef = useRef<number | null>(null);

  const clearArm = () => {
    if (armTimerRef.current !== null) {
      window.clearTimeout(armTimerRef.current);
      armTimerRef.current = null;
    }
    setArmedAction(null);
  };

  useEffect(() => {
    clearArm();
  }, [savedSummary]);

  useEffect(() => {
    return () => {
      if (armTimerRef.current !== null) {
        window.clearTimeout(armTimerRef.current);
        armTimerRef.current = null;
      }
    };
  }, []);

  const armForConfirm = (kind: Exclude<ArmedAction, null>, notice: string) => {
    if (armTimerRef.current !== null) window.clearTimeout(armTimerRef.current);
    setArmedAction(kind);
    armTimerRef.current = window.setTimeout(() => {
      armTimerRef.current = null;
      setArmedAction(null);
    }, 5000);
    onNotify?.(notice);
  };

  const savedWorld = savedSummary ? coreEngine.getWorld(savedSummary.worldId) : null;
  const savedCareerTitle = savedSummary ? coreEngine.getCareerDisplayTitle(savedSummary) : "";

  const handleDiscardClick = () => {
    if (armedAction !== "discard") {
      armForConfirm(
        "discard",
        `진행 중인 '${savedSummary?.name || "영혼"}'의 저장본을 영구 삭제하려면 5초 안에 한 번 더 누르라.`
      );
      return;
    }
    clearArm();
    onDiscardSaved();
  };

  const handleStartWithGuard = (kind: "random" | "custom", config: StartConfig) => {
    if (savedSummary && armedAction !== kind) {
      armForConfirm(
        kind,
        `진행 중인 '${savedSummary.name}'의 생애가 삭제된다. 덮어쓰고 새 인생을 시작하려면 5초 안에 한 번 더 누르라.`
      );
      return;
    }
    clearArm();
    onStart(config);
  };

  return (
    <section id="start-screen" className="sanctum-hero" aria-labelledby="start-heading">
      <div className="hero-top">
        <svg
          width="56"
          height="56"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon points="32,2 60,18 60,46 32,62 4,46 4,18" stroke="#d6b15e" strokeWidth="2" fill="#14110e" />
          <circle cx="32" cy="32" r="20" stroke="#6b542b" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M14 25 L27 29 L32 15 L37 29 L50 25 L41 37 L44 49 L32 41 L20 49 L23 37 Z" fill="#d6b15e" />
        </svg>
        <h2 id="start-heading" ref={headingRef} className="hero-h2" tabIndex={-1}>
          새로운 영혼 탄생
        </h2>
        <p className="hero-quote">
          41번째 천년기의 암흑 속에는 오직 전쟁뿐이다. 인류제국 100만 행성, 수천조 영혼 가운데 단 하나로 태어나
          흐르는 연대기와 선택 속에서 그대만의 운명을 개척하라.
        </p>
      </div>

      <nav className="quick-lore-bar" aria-label="입문 안내 바로가기">
        <span>워해머 40,000 세계관 용어가 낯설다면 개념 사전과 제국 코덱스를 참고하라.</span>
        <div className="quick-lore-links">
          <a
            className="btn-ghost"
            style={{ textDecoration: "none" }}
            href={withBase("/glossary/")}
            target="_blank"
            rel="noopener noreferrer"
          >
            워해머 개념 사전 (새 탭)
          </a>
          <a
            className="btn-ghost"
            style={{ textDecoration: "none" }}
            href={withBase("/codex/")}
            target="_blank"
            rel="noopener noreferrer"
          >
            제국 코덱스 (새 탭)
          </a>
        </div>
      </nav>

      {narrativeLoading && (
        <div className="loading-banner">제국 연대기 및 분기 사건 데이터를 불러오는 중...</div>
      )}

      {savedSummary && (
        <div id="resume-banner" className="resume-banner" aria-live="off">
          <div className="resume-banner-info">
            <h3>진행 중이던 생애 기록 발견</h3>
            <p>
              {savedSummary.name} ({savedSummary.age}세 ·{" "}
              {coreEngine.formatImperialDate(savedSummary.year, savedSummary.quarter)}) · {savedCareerTitle} ·{" "}
              {savedWorld ? savedWorld.name : ""} · 생명력 {savedSummary.wounds}/{savedSummary.maxWounds} · 신앙{" "}
              {savedSummary.faith} · 오염 {savedSummary.corruption} · 누적 기록{" "}
              {(savedSummary.logs || []).length}건
            </p>
          </div>
          <div className="resume-banner-actions">
            <button
              id="btn-resume-saved"
              type="button"
              className="btn-primary"
              disabled={narrativeLoading}
              onClick={() => {
                clearArm();
                onResume();
              }}
            >
              이어하기
            </button>
            <button id="btn-discard-saved" type="button" className="btn-ghost" onClick={handleDiscardClick}>
              {armedAction === "discard" ? "삭제 재확인 (5초 내 다시 선택)" : "저장 삭제"}
            </button>
          </div>
        </div>
      )}

      <fieldset
        id="difficulty-fieldset"
        aria-describedby="difficulty-desc"
        style={{
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "10px 14px",
          marginBottom: "14px",
          background: "rgba(18, 15, 12, 0.72)"
        }}
      >
        <legend style={{ padding: "0 6px", fontWeight: 700, color: "var(--gold)" }}>
          난이도 모드 선택
        </legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <input
              id="rad-diff-standard"
              type="radio"
              name="difficulty"
              value="standard"
              checked={difficulty === "standard"}
              onChange={() => setDifficulty("standard")}
            />
            <span>표준 모드 (균형 잡힌 제국 생애)</span>
          </label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <input
              id="rad-diff-grimdark"
              type="radio"
              name="difficulty"
              value="grimdark"
              checked={difficulty === "grimdark"}
              onChange={() => setDifficulty("grimdark")}
            />
            <span>그림다크 모드 (1 / QUADRILLION 하드코어)</span>
          </label>
        </div>
        <p id="difficulty-desc" style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>
          {difficulty === "grimdark"
            ? "하층민 출생 비중·정규 기관 입단 장벽(-12%)·전선 치사율·공략형 억까 사건이 크게 강화된다."
            : "워해머 40k 표준 난이도로 다양한 출신과 승급 경로를 균형 있게 체험한다."}
        </p>
      </fieldset>

      <div className="mode-grid">
        <div className="mode-card destiny">
          <div>
            <h3>운명 모드 (무작위 출생)</h3>
            <p>
              제국의 인구 확률에 몸을 맡긴다. 행성·신분·시대에 맞는 연대기 기록과 자연스러운 선택지가 차례로
              펼쳐진다.
            </p>
            <ul className="feature-list">
              <li>1년 = 60초 (1배속 · 1년 3분기 · 2/4/8/16배속 자유 전환)</li>
              <li>
                {CODEX_COUNTS.factions}개 세력 {CODEX_COUNTS.careers}종 풀 계급도(테라의 하이 로드 12석 완비·임페리얼
                나이트·리빙 세인트·데몬 프린스) 및 발탁·평행 횡단 이벤트
              </li>
              <li>
                {CODEX_COUNTS.worlds}개 행성·직군·챕터·시기·3대 도덕 성향(자비·교조·암흑){" "}
                {narrativeCounts
                  ? `${narrativeCounts.chronicles}종 연대기 및 ${narrativeCounts.events}종 분기·역사 사건`
                  : "다채로운 연대기 및 분기·역사 사건"}
              </li>
              <li>
                {CODEX_COUNTS.chapters}대 아스타르테스 챕터 서약 · {CODEX_COUNTS.characters}인 네임드 조우 · 8대
                특성치(d100 판정)
              </li>
            </ul>
          </div>
          <button
            id="btn-start-random"
            type="button"
            className="btn-primary"
            disabled={narrativeLoading}
            onClick={() => handleStartWithGuard("random", { mode: "random", difficulty })}
          >
            {armedAction === "random" ? "기존 저장본 덮어쓰고 탄생 (5초 내 다시 선택)" : "무작위 운명으로 탄생하기"}
          </button>
        </div>

        <div className="mode-card">
          <div>
            <h3>지정 출생 모드 (직접 설정)</h3>
            <p>원하는 시대, 행성, 신분, 선천 자질을 직접 선택해 시작한다.</p>
            <div className="custom-form">
              <div className="form-group full">
                <label htmlFor="sel-era">출생 시대</label>
                <select id="sel-era" value={eraId} onChange={(e) => setEraId(e.target.value)}>
                  {coreEngine.ERA_PRESETS.map((e: any) => (
                    <option key={e.id} value={e.id}>
                      {e.name} — {e.desc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sel-world">출생 행성</label>
                <select id="sel-world" value={worldId} onChange={(e) => setWorldId(e.target.value)}>
                  {CORE_DATA.WORLDS.map((w: any) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.worldClass.split(" ")[0]})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sel-origin">출생 신분</label>
                <select id="sel-origin" value={originId} onChange={(e) => setOriginId(e.target.value)}>
                  {CORE_DATA.ORIGINS.map((o: any) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sel-trait">선천 자질</label>
                <select id="sel-trait" value={traitId} onChange={(e) => setTraitId(e.target.value)}>
                  {CORE_DATA.TRAITS.map((t: any) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sel-gender">성별</label>
                <select id="sel-gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="random">무작위</option>
                  <option value="male">남성 (아스타르테스·그레이 나이트 가능)</option>
                  <option value="female">여성 (아뎁타 소로리타스 가능)</option>
                </select>
              </div>
              <div className="form-group full">
                <label htmlFor="inp-name">이름 (비워 두면 자동 생성)</label>
                <input
                  id="inp-name"
                  type="text"
                  placeholder="예: 카시안 크로우스"
                  maxLength={28}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            id="btn-start-custom"
            type="button"
            className="btn-gold"
            disabled={narrativeLoading}
            onClick={() =>
              handleStartWithGuard("custom", {
                mode: "custom",
                difficulty,
                eraId,
                worldId,
                originId,
                traitId,
                gender,
                customName: name.trim()
              })
            }
          >
            {armedAction === "custom" ? "기존 저장본 덮어쓰고 시작 (5초 내 다시 선택)" : "지정된 운명으로 탄생하기"}
          </button>
        </div>
      </div>
    </section>
  );
}
