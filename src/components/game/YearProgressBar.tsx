import React, { useEffect, useRef } from "react";
import { SPEED_MS } from "./types";

interface Props {
  speed: number;
  active: boolean;
  hasPendingEvent: boolean;
  alive: boolean;
  resetToken: number;
  onQuarterElapsed: () => void;
}

/**
 * 시각 전용 분기 진행 바.
 * performance.now() 실측 경과(50ms 주기)와 DOM ref 직접 갱신 + aria-hidden="true"로
 * 16배속(1,250ms/분기) 정밀도를 유지하면서 메인 React 트리 리렌더와 스크린 리더 잡음을 원천 차단한다.
 */
export default function YearProgressBar({
  speed,
  active,
  hasPendingEvent,
  alive,
  resetToken,
  onQuarterElapsed
}: Props) {
  const fillRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const secRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const cbRef = useRef(onQuarterElapsed);
  cbRef.current = onQuarterElapsed;

  const paint = (elapsedMs: number) => {
    const duration = SPEED_MS[speed] || SPEED_MS[1];
    const clamped = Math.min(duration, Math.max(0, elapsedMs));
    const pct = speed > 0 ? Math.min(100, (clamped / duration) * 100) : 0;
    if (fillRef.current) fillRef.current.style.width = `${pct.toFixed(1)}%`;
    if (secRef.current) {
      const decimals = duration % 100 !== 0 ? 2 : 1;
      secRef.current.textContent = `${(clamped / 1000).toFixed(decimals)} / ${(duration / 1000).toFixed(decimals)}초`;
    }
    if (labelRef.current) {
      if (!alive) labelRef.current.textContent = "생애 종료";
      else if (hasPendingEvent) labelRef.current.textContent = "사건 선택 대기 중";
      else if (speed === 0) labelRef.current.textContent = "일시정지됨";
      else labelRef.current.textContent = `${speed}배속 자동 진행 중`;
    }
  };

  useEffect(() => {
    elapsedRef.current = 0;
    paint(0);
  }, [resetToken, speed, alive, hasPendingEvent]);

  useEffect(() => {
    if (!active || !alive || hasPendingEvent || speed <= 0) {
      paint(elapsedRef.current);
      return;
    }
    const duration = SPEED_MS[speed] || SPEED_MS[1];
    let lastNow = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      elapsedRef.current += Math.max(0, now - lastNow);
      lastNow = now;
      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        paint(0);
        cbRef.current();
      } else {
        paint(elapsedRef.current);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [speed, active, alive, hasPendingEvent]);

  return (
    <div className="year-progress-wrap" aria-hidden="true">
      <div className="year-progress-head">
        <span id="year-progress-label" ref={labelRef}>
          대기 중
        </span>
        <span id="year-progress-sec" ref={secRef}>
          0.0 / 20.0초
        </span>
      </div>
      <div className="year-progress-track">
        <div id="year-progress-fill" ref={fillRef} className="year-progress-fill" style={{ width: "0%" }} />
      </div>
    </div>
  );
}
