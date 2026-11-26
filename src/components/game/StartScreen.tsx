import React, { useState } from "react";
import { CORE_DATA, coreEngine } from "../../data/index.js";
import { withBase } from "../../lib/links";
import type { StartConfig } from "./types";

interface Props {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  savedSummary: any | null;
  narrativeLoading: boolean;
  onStart: (config: StartConfig) => void;
  onResume: () => void;
  onDiscardSaved: () => void;
}

export default function StartScreen({
  headingRef,
  savedSummary,
  narrativeLoading,
  onStart,
  onResume,
  onDiscardSaved
}: Props) {
  const [eraId, setEraId] = useState(coreEngine.ERA_PRESETS[0]?.id || "armageddon");
  const [worldId, setWorldId] = useState(CORE_DATA.WORLDS[0]?.id || "terra");
  const [originId, setOriginId] = useState(CORE_DATA.ORIGINS[0]?.id || "imperial_citizen");
  const [traitId, setTraitId] = useState(CORE_DATA.TRAITS[0]?.id || "none");
  const [gender, setGender] = useState("random");
  const [name, setName] = useState("");

  const savedWorld = savedSummary ? coreEngine.getWorld(savedSummary.worldId) : null;
  const savedCareerTitle = savedSummary ? coreEngine.getCareerDisplayTitle(savedSummary) : "";

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
              onClick={onResume}
            >
              이어하기
            </button>
            <button id="btn-discard-saved" type="button" className="btn-ghost" onClick={onDiscardSaved}>
              저장 삭제
            </button>
          </div>
        </div>
      )}

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
              <li>21개 세력 91종 풀 계급도(테라의 하이 로드 12석 완비·임페리얼 나이트·리빙 세인트·데몬 프린스) 및 발탁·평행 횡단 이벤트</li>
              <li>23개 행성·직군·챕터·시기·3대 도덕 성향(자비·교조·암흑) 796종 연대기 및 699종 분기·역사 사건</li>
              <li>9대 아스타르테스 챕터 서약 · 28인 네임드 조우 · 8대 특성치(d100 판정)</li>
            </ul>
          </div>
          <button
            id="btn-start-random"
            type="button"
            className="btn-primary"
            disabled={narrativeLoading}
            onClick={() => onStart({ mode: "random" })}
          >
            무작위 운명으로 탄생하기
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
              onStart({
                mode: "custom",
                eraId,
                worldId,
                originId,
                traitId,
                gender,
                customName: name.trim()
              })
            }
          >
            지정된 운명으로 탄생하기
          </button>
        </div>
      </div>
    </section>
  );
}
