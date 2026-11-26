import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORE_DATA, coreEngine } from "../../data/index.js";
import {
  applyImportedBackup,
  buildBackupPayload,
  clearHall,
  downloadTextFile,
  loadHall
} from "../../lib/storage";

export default function HallOfSoulsApp() {
  const [list, setList] = useState<any[]>([]);
  const [clearArmed, setClearArmed] = useState(false);
  const [liveMsg, setLiveMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const clearTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const seqRef = useRef(0);

  const announce = useCallback((msg: string) => {
    if (!msg) return;
    seqRef.current += 1;
    setLiveMsg(msg + (seqRef.current % 2 === 0 ? "\u200B" : ""));
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
    setList(loadHall());
    return () => {
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const selectableCareers = useMemo(
    () => CORE_DATA.CAREERS.filter((c: any) => c.selectable),
    []
  );

  const stats = useMemo(() => {
    const uniqueWorlds = new Set(
      list
        .flatMap((x) =>
          Array.isArray(x.visitedWorlds) && x.visitedWorlds.length ? x.visitedWorlds : [x.homeWorldId]
        )
        .filter(Boolean)
    );
    const uniqueCareers = new Set(
      list
        .flatMap((x) =>
          Array.isArray(x.careerHistory) && x.careerHistory.length ? x.careerHistory : [x.careerId]
        )
        .filter((id) => id && id !== "child")
    );
    const uniqueChapters = new Set(list.map((x) => x.chapterId).filter(Boolean));
    const uniqueTimeline = new Set(list.flatMap((x) => x.seenTimeline || []));
    const uniqueChars = new Set(list.flatMap((x) => x.metCharacters || []));

    const totalTargets =
      CORE_DATA.WORLDS.length +
      selectableCareers.length +
      CORE_DATA.CHAPTERS.length +
      CORE_DATA.TIMELINE.length +
      CORE_DATA.CHARACTERS.length;
    const totalCollected =
      uniqueWorlds.size +
      uniqueCareers.size +
      uniqueChapters.size +
      uniqueTimeline.size +
      uniqueChars.size;
    const totalPct = totalTargets > 0 ? Math.round((totalCollected / totalTargets) * 100) : 0;

    return {
      uniqueWorlds,
      uniqueCareers,
      uniqueChapters,
      uniqueTimeline,
      uniqueChars,
      totalTargets,
      totalCollected,
      totalPct,
      missingCareers: selectableCareers.filter((c: any) => !uniqueCareers.has(c.id)),
      missingChapters: CORE_DATA.CHAPTERS.filter((ch: any) => !uniqueChapters.has(ch.id)),
      missingChars: CORE_DATA.CHARACTERS.filter((c: any) => !uniqueChars.has(c.id)),
      missingTimeline: CORE_DATA.TIMELINE.filter((t: any) => !uniqueTimeline.has(t.id)),
      missingWorlds: CORE_DATA.WORLDS.filter((w: any) => !uniqueWorlds.has(w.id))
    };
  }, [list, selectableCareers]);

  const handleExportBackup = () => {
    const payload = buildBackupPayload(null, coreEngine);
    const dateStamp = new Date().toISOString().slice(0, 10);
    downloadTextFile(
      `imperialis_vita_backup_${dateStamp}.json`,
      JSON.stringify(payload, null, 2),
      "application/json;charset=utf-8"
    );
    showToast(
      `저장본 백업을 내보냈다 (영혼 ${payload.hall.length}명${payload.activeState ? ", 진행 중 생애 포함" : ""}).`,
      true
    );
  };

  const handleImportFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = applyImportedBackup(String(reader.result || ""), coreEngine);
      if (!res.ok) {
        showToast(res.error || "백업 불러오기에 실패했다.", true);
        return;
      }
      setList(loadHall());
      showToast(
        `백업을 불러왔다 (영혼 ${res.restoredHallCount}명${res.restoredActive ? `, 진행 중 생애 '${res.restoredActive.name}' 복원` : ""}).`,
        true
      );
    };
    reader.readAsText(file, "utf-8");
  };

  const handleClearHall = () => {
    if (!clearArmed) {
      setClearArmed(true);
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = window.setTimeout(() => {
        setClearArmed(false);
      }, 5000);
      showToast("정말 영혼의 전당 기록을 모두 삭제하려면 5초 안에 한 번 더 누르라.", true);
      return;
    }
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
    setClearArmed(false);
    clearHall();
    setList([]);
    showToast("영혼의 전당 기록을 초기화했다.", true);
  };

  return (
    <>
      <div id="sr-live" className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </div>

      <section className="panel" aria-labelledby="heading-hall">
        <div className="panel-header">
          <h2 id="heading-hall" className="panel-title">
            영혼의 전당 (역대 생애 기록)
          </h2>
          <div className="header-btn-group">
            <button id="btn-export-save" type="button" className="btn-ghost" onClick={handleExportBackup}>
              저장본 백업 (.json)
            </button>
            <button
              id="btn-import-save"
              type="button"
              className="btn-ghost"
              onClick={() => fileInputRef.current?.click()}
            >
              백업 불러오기 (.json)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              id="inp-import-save"
              accept=".json,application/json"
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleImportFile(file);
                e.target.value = "";
              }}
            />
            <button id="btn-clear-hall" type="button" className="btn-ghost" onClick={handleClearHall}>
              {clearArmed ? "초기화 재확인 (5초 내 다시 선택)" : "기록 초기화"}
            </button>
          </div>
        </div>

        <div id="hall-summary" className="hall-summary-grid">
          <div className="meta-box">
            <span className="meta-label">기록된 생애 수</span>
            <span className="meta-val">{list.length}명</span>
          </div>
          <div className="meta-box">
            <span className="meta-label">탐방한 행성</span>
            <span className="meta-val">
              {stats.uniqueWorlds.size} / {CORE_DATA.WORLDS.length}
            </span>
          </div>
          <div className="meta-box">
            <span className="meta-label">달성한 병종·계급</span>
            <span className="meta-val">
              {stats.uniqueCareers.size} / {selectableCareers.length}
            </span>
          </div>
          <div className="meta-box">
            <span className="meta-label">서약한 챕터</span>
            <span className="meta-val">
              {stats.uniqueChapters.size} / {CORE_DATA.CHAPTERS.length}
            </span>
          </div>
          <div className="meta-box">
            <span className="meta-label">목격한 역사 / 인물</span>
            <span className="meta-val">
              역사 {stats.uniqueTimeline.size}/{CORE_DATA.TIMELINE.length} · 인물{" "}
              {stats.uniqueChars.size}/{CORE_DATA.CHARACTERS.length}
            </span>
          </div>
        </div>

        <div id="hall-codex-wrap">
          <details className="hall-codex-box">
            <summary>
              제국 도감 달성 현황 및 미수집 해금 힌트 — 전체 수집률 {stats.totalPct}% (
              {stats.totalCollected} / {stats.totalTargets})
            </summary>
            <div className="hall-codex-body">
              <div className="hall-codex-group">
                <h3>미달성 병종·계급 ({stats.missingCareers.length}종 남음)</h3>
                {stats.missingCareers.length ? (
                  <ul className="hall-hint-list">
                    {stats.missingCareers.map((c: any) => (
                      <li key={c.id}>
                        <strong>{c.name}</strong> ({c.treeName || c.faction} · Tier {c.tier}
                        {c.entryMode === "event" ? " · 발탁 이벤트" : ""}) —{" "}
                        {coreEngine.describeReq(c.req) || "조건 없음"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "12px", color: "var(--cogitator)" }}>
                    모든 선택 가능 병종·계급({selectableCareers.length}종)을 달성했다.
                  </p>
                )}
              </div>

              <div className="hall-codex-group">
                <h3>미서약 챕터 ({stats.missingChapters.length}개 남음)</h3>
                {stats.missingChapters.length ? (
                  <ul className="hall-hint-list">
                    {stats.missingChapters.map((ch: any) => (
                      <li key={ch.id}>
                        <strong>{ch.name}</strong> — 프라이마크 {ch.primarch} · 모성 {ch.homeworld}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "12px", color: "var(--cogitator)" }}>
                    {CORE_DATA.CHAPTERS.length}대 아스타르테스 챕터에 모두 서약했다.
                  </p>
                )}
              </div>

              <div className="hall-codex-group">
                <h3>미조우 네임드 인물 ({stats.missingChars.length}명 남음)</h3>
                {stats.missingChars.length ? (
                  <ul className="hall-hint-list">
                    {stats.missingChars.map((c: any) => (
                      <li key={c.id}>
                        <strong>{c.name}</strong> — {c.faction} ({c.era})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "12px", color: "var(--cogitator)" }}>
                    {CORE_DATA.CHARACTERS.length}인의 전설적 인물과 모두 조우했다.
                  </p>
                )}
              </div>

              <div className="hall-codex-group">
                <h3>미목격 역사 대사건 ({stats.missingTimeline.length}건 남음)</h3>
                {stats.missingTimeline.length ? (
                  <ul className="hall-hint-list">
                    {stats.missingTimeline.map((t: any) => (
                      <li key={t.id}>
                        <strong>
                          {coreEngine.formatImperialYear(t.year)} {t.title}
                        </strong>{" "}
                        — {t.scope}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "12px", color: "var(--cogitator)" }}>
                    M41~M42 {CORE_DATA.TIMELINE.length}대 역사 사건을 모두 목격했다.
                  </p>
                )}
              </div>

              <div className="hall-codex-group">
                <h3>미방문 행성 ({stats.missingWorlds.length}곳 남음)</h3>
                {stats.missingWorlds.length ? (
                  <ul className="hall-hint-list">
                    {stats.missingWorlds.map((w: any) => (
                      <li key={w.id}>
                        <strong>{w.name}</strong> — {w.worldClass} ({coreEngine.getWorldShortTag(w)})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "12px", color: "var(--cogitator)" }}>
                    {CORE_DATA.WORLDS.length}개 제국 행성을 모두 탐방했다.
                  </p>
                )}
              </div>
            </div>
          </details>
        </div>

        <div id="hall-list" className="codex-grid">
          {list.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>
              아직 기록된 영혼이 없다. 인류제국에서 첫 생애를 살아 보라.
            </p>
          ) : (
            list.map((item) => {
              const visitedNames = (
                Array.isArray(item.visitedWorlds) && item.visitedWorlds.length
                  ? item.visitedWorlds
                  : [item.homeWorldId]
              )
                .filter(Boolean)
                .map((id: string) => coreEngine.getWorld(id).name);
              const careerPathNames = (
                Array.isArray(item.careerHistory) && item.careerHistory.length
                  ? item.careerHistory
                  : [item.careerId]
              )
                .filter((id: string) => id && id !== "child")
                .map((id: string) => coreEngine.getCareer(id).name);
              const tlNames = (item.seenTimeline || [])
                .map((id: string) => CORE_DATA.TIMELINE.find((t: any) => t.id === id))
                .filter(Boolean)
                .map((t: any) => `${coreEngine.formatImperialYear(t.year)} ${t.title}`);
              const charNames = (item.metCharacters || [])
                .map((id: string) => coreEngine.getCharacter(id))
                .filter(Boolean)
                .map((c: any) => c.name);
              const chap = item.chapterId ? coreEngine.getChapter(item.chapterId) : null;
              const tagNames = (item.tags || []).map((t: string) => coreEngine.TAG_LABELS[t] || t);
              const alignInfo = item.alignment
                ? coreEngine.getAlignmentInfo({ alignment: item.alignment })
                : null;

              return (
                <article key={item.id} className="codex-card">
                  <div>
                    <h3>
                      {item.name} ({item.age}세)
                    </h3>
                    <div className="codex-en">
                      {coreEngine.formatImperialYear(item.birthYear)} ~{" "}
                      {coreEngine.formatImperialYear(item.deathYear)} · {item.careerTitle}
                    </div>
                    <div className="codex-body">
                      <p style={{ color: "var(--gold)", marginBottom: "4px" }}>
                        {item.grade ? item.grade.title : ""}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--text-sub)" }}>{item.deathCause}</p>
                      <details className="hall-detail">
                        <summary>상세 생애 조서 펼치기</summary>
                        <div className="hall-detail-body">
                          {item.grade && item.grade.verdict && (
                            <p className="hall-verdict">{item.grade.verdict}</p>
                          )}
                          {item.stats && (
                            <div className="hall-mini-stats">
                              {Object.values(coreEngine.STAT_META).map((m: any) => (
                                <span key={m.key} className="hall-mini-stat">
                                  <span>{m.name}</span>
                                  <strong>
                                    {item.stats[m.key] !== undefined ? item.stats[m.key] : "-"}
                                  </strong>
                                </span>
                              ))}
                            </div>
                          )}
                          {alignInfo && (
                            <div>
                              <strong>도덕 성향:</strong> {alignInfo.fullLabel} ({alignInfo.detail})
                            </div>
                          )}
                          {careerPathNames.length > 1 && (
                            <div>
                              <strong>거쳐 간 계급 ({careerPathNames.length}):</strong>{" "}
                              {careerPathNames.map((name: string, i: number) => (
                                <React.Fragment key={`${name}-${i}`}>
                                  {i > 0 && (
                                    <>
                                      <span aria-hidden="true"> · </span>
                                      <span className="sr-only">, 다음 </span>
                                    </>
                                  )}
                                  {name}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                          {chap && (
                            <div>
                              <strong>소속 챕터:</strong> {chap.name}
                            </div>
                          )}
                          <div>
                            <strong>방문 행성 ({visitedNames.length}):</strong>{" "}
                            {visitedNames.join(", ")}
                          </div>
                          <div>
                            <strong>목격한 역사 ({tlNames.length}):</strong>{" "}
                            {tlNames.length ? tlNames.join(" / ") : "없음"}
                          </div>
                          <div>
                            <strong>조우한 인물 ({charNames.length}):</strong>{" "}
                            {charNames.length ? charNames.join(", ") : "없음"}
                          </div>
                          {tagNames.length > 0 && (
                            <div>
                              <strong>주요 이력:</strong> {tagNames.join(", ")}
                            </div>
                          )}
                        </div>
                      </details>
                    </div>
                  </div>
                  <div className="codex-foot">
                    <span>출생: {coreEngine.getWorld(item.homeWorldId).name}</span>
                    <span>
                      역사 {(item.seenTimeline || []).length}건 · 인물{" "}
                      {(item.metCharacters || []).length}명
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <div id="toast-msg" className={`toast-msg${toastVisible ? " show" : ""}`} aria-hidden="true">
        {toastMsg}
      </div>
    </>
  );
}
