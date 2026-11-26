import React, { useEffect, useMemo, useRef, useState } from "react";
import { formatRollOutcomeLabel } from "../../engine/formatters.js";
import { getLifeChapter } from "../../lib/chronicleText";

interface Props {
  state: any;
  engine: any;
  onCopyChronicle: () => void;
  onExportTxt: () => void;
  onBackToGame: () => void;
  onAnnounce: (msg: string) => void;
}

export default function FullChronicleView({
  state,
  engine,
  onCopyChronicle,
  onExportTxt,
  onBackToGame,
  onAnnounce
}: Props) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<"all" | "chronicle" | "major">("all");
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const filteredLogs = useMemo(() => {
    let logs = [...(state.logs || [])];
    if (order === "asc") logs.reverse();
    if (filter === "chronicle") logs = logs.filter((l) => l.kind === "chronicle");
    else if (filter === "major") logs = logs.filter((l) => l.kind !== "chronicle");
    return logs;
  }, [state.logs, order, filter]);

  const chapters = useMemo(() => {
    const groups: { title: string; items: any[] }[] = [];
    let current: { title: string; items: any[] } | null = null;
    for (const item of filteredLogs) {
      const ch = getLifeChapter(item.age);
      if (!current || current.title !== ch) {
        current = { title: ch, items: [] };
        groups.push(current);
      }
      current.items.push(item);
    }
    return groups;
  }, [filteredLogs]);

  const homeWorld = engine.getWorld(state.homeWorldId);
  const curWorld = engine.getWorld(state.worldId);
  const alignInfo = engine.getAlignmentInfo(state);

  const handleToggleOrder = () => {
    const next = order === "asc" ? "desc" : "asc";
    setOrder(next);
    onAnnounce(
      next === "asc"
        ? "기록을 출생순으로 정렬했다."
        : "기록을 최신순으로 정렬했다."
    );
  };

  const handleFilterChange = (next: "all" | "chronicle" | "major", label: string) => {
    setFilter(next);
    onAnnounce(`${label} 필터를 적용했다.`);
  };

  return (
    <section id="view-chronicle" className="view-section active" aria-labelledby="chron-char-title">
      <div className="panel chronicle-page">
        <div className="chronicle-hero-bar">
          <div>
            <h2 id="chron-char-title" ref={titleRef} className="chron-title" tabIndex={-1}>
              {state.name}의 전체 인생 기록서
            </h2>
            <p id="chron-char-sub" className="chron-sub">
              {engine.getCareerDisplayTitle(state)} · {engine.formatImperialYear(state.birthYear)} ~{" "}
              {engine.formatImperialDate(state.year, state.quarter)} ({state.age}세 ·{" "}
              {state.alive ? "생존" : "사망"}) · 출생 {homeWorld.name} / 현재 {curWorld.name} · 성향{" "}
              {alignInfo.fullLabel}
            </p>
          </div>
          <div className="chron-controls">
            <button id="btn-chron-order" type="button" className="btn-gold" onClick={handleToggleOrder}>
              {order === "asc" ? "정렬: 출생순 (0세부터)" : "정렬: 최신순 (현재부터)"}
            </button>
            <button id="btn-copy-chronicle" type="button" className="btn-ghost" onClick={onCopyChronicle}>
              기록 텍스트 복사
            </button>
            <button id="btn-export-chronicle" type="button" className="btn-ghost" onClick={onExportTxt}>
              .txt 파일 저장
            </button>
            <button id="btn-back-to-game" type="button" className="btn-ghost" onClick={onBackToGame}>
              시뮬레이션으로 복귀
            </button>
          </div>
        </div>

        <div className="chron-filter-bar" id="full-log-filters" role="group" aria-label="기록 필터">
          {(
            [
              ["all", "전체 기록"],
              ["chronicle", "일상 · 부조리"],
              ["major", "중대 사건 · 전직"]
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`btn-ghost${filter === key ? " active" : ""}`}
              data-flfilter={key}
              aria-pressed={filter === key}
              onClick={() => handleFilterChange(key, label)}
            >
              {label}
            </button>
          ))}
          <span
            id="full-log-count"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--gold)",
              marginLeft: "auto"
            }}
          >
            {filteredLogs.length}건
          </span>
        </div>

        <div id="full-chronicle-body" className="full-chronicle-body">
          {chapters.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>선택한 분류의 기록이 아직 없다.</p>
          ) : (
            chapters.map((ch, idx) => (
              <div key={`${ch.title}-${idx}`} className="chron-chapter">
                <h3 className="chapter-heading">{ch.title}</h3>
                <ul className="log-list">
                  {ch.items.map((item, j) => (
                    <li key={j} className={`log-item ${item.kind}`}>
                      <div className="log-head">
                        <span>
                          {item.year}, {item.age}세
                          {item.badge ? (
                            <>
                              {" "}
                              <span className="log-badge">{item.badge}</span>
                            </>
                          ) : null}
                        </span>
                        {item.meta ? (
                          <span>
                            d100 {item.meta.roll}/{item.meta.target}{" "}
                            {formatRollOutcomeLabel(item.meta)}
                          </span>
                        ) : null}
                      </div>
                      <div>{item.text}</div>
                      {item.deltaText ? <div className="log-delta">{item.deltaText}</div> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
