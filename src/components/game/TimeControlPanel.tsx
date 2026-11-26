import React from "react";
import { withBase } from "../../lib/links";
import type { UserPrefs } from "../../lib/storage";
import { SPEED_OPTIONS } from "./types";
import YearProgressBar from "./YearProgressBar";

interface Props {
  speed: number;
  alive: boolean;
  hasPendingEvent: boolean;
  activeView: boolean;
  prefs: UserPrefs;
  progressResetToken: number;
  onSetSpeed: (speed: number) => void;
  onStepQuarter: () => void;
  onFastForward: () => void;
  onTogglePref: (key: keyof UserPrefs, checked: boolean) => void;
  onStatusSummary: () => void;
  onNewLife: () => void;
  onQuarterElapsed: () => void;
}

export default function TimeControlPanel({
  speed,
  alive,
  hasPendingEvent,
  activeView,
  prefs,
  progressResetToken,
  onSetSpeed,
  onStepQuarter,
  onFastForward,
  onTogglePref,
  onStatusSummary,
  onNewLife,
  onQuarterElapsed
}: Props) {
  return (
    <>
      <div className="panel-header" style={{ marginBottom: "10px" }}>
        <h2 id="heading-control" className="panel-title" tabIndex={-1}>
          시간 제어 및 삶의 초점
        </h2>
        <div className="header-btn-group">
          <button id="btn-status-summary" type="button" className="btn-ghost" onClick={onStatusSummary}>
            현재 상태 요약 듣기
          </button>
          <a
            className="btn-ghost"
            style={{ textDecoration: "none" }}
            href={withBase("/glossary/")}
            target="_blank"
            rel="noopener noreferrer"
          >
            개념 사전 (새 탭)
          </a>
          <button id="btn-new-life" type="button" className="btn-ghost" onClick={onNewLife}>
            새 인생 시작
          </button>
        </div>
      </div>

      <div className="control-box">
        <div className="control-bar">
          <div className="speed-group" role="group" aria-label="진행 속도">
            <button
              id="btn-pause"
              type="button"
              className={`btn-ghost${speed === 0 ? " active" : ""}`}
              aria-pressed={speed === 0}
              onClick={() => onSetSpeed(0)}
            >
              일시정지
            </button>
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.speed}
                id={opt.id}
                type="button"
                className={`btn-ghost${speed === opt.speed ? " active" : ""}`}
                aria-pressed={speed === opt.speed}
                onClick={() => onSetSpeed(opt.speed)}
              >
                {opt.label}
              </button>
            ))}
            <button id="btn-step" type="button" className="btn-gold" onClick={onStepQuarter}>
              다음 분기 진행
            </button>
            <button id="btn-fast-forward" type="button" className="btn-ghost" onClick={onFastForward}>
              다음 사건까지 진행
            </button>
          </div>

          <div className="pref-toggles">
            <label className="live-toggle">
              <input
                type="checkbox"
                id="chk-sr-announce"
                checked={prefs.srAnnounce}
                onChange={(e) => onTogglePref("srAnnounce", e.target.checked)}
              />
              <span>새 기록 자동 알림</span>
            </label>
            <label className="live-toggle">
              <input
                type="checkbox"
                id="chk-fast-childhood"
                checked={prefs.fastChildhood}
                onChange={(e) => onTogglePref("fastChildhood", e.target.checked)}
              />
              <span>유년기 빠른 진행 (0~13세 연 1분기)</span>
            </label>
            <label className="live-toggle">
              <input
                type="checkbox"
                id="chk-career-alert"
                checked={prefs.careerAlert}
                onChange={(e) => onTogglePref("careerAlert", e.target.checked)}
              />
              <span>새 진로 해금 시 알림·일시정지</span>
            </label>
          </div>
        </div>

        <YearProgressBar
          speed={speed}
          active={activeView}
          hasPendingEvent={hasPendingEvent}
          alive={alive}
          resetToken={progressResetToken}
          onQuarterElapsed={onQuarterElapsed}
        />
      </div>
    </>
  );
}
