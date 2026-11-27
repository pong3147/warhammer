import React, { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  state: any;
  engine: any;
  data: any;
  onOpenChronicle: () => void;
  onCopyObituary: () => void;
  onRestartRandom: () => void;
  onRestartCustom: () => void;
  onClose: () => void;
}

export default function ObituaryModal({
  open,
  state,
  engine,
  data,
  onOpenChronicle,
  onCopyObituary,
  onRestartRandom,
  onRestartCustom,
  onClose
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const isVisible = Boolean(open && state);

  useEffect(() => {
    const bgTargets = [
      document.querySelector(".skip-link"),
      document.querySelector(".top-header"),
      document.querySelector(".site-footer"),
      document.getElementById("game-surface")
    ].filter(Boolean) as HTMLElement[];

    if (!isVisible) {
      for (const el of bgTargets) el.removeAttribute("inert");
      return;
    }

    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    for (const el of bgTargets) el.setAttribute("inert", "");
    titleRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        const outsideModal = !active || !modalRef.current.contains(active);

        if (e.shiftKey) {
          if (outsideModal || active === first || active === titleRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (outsideModal || active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      for (const el of bgTargets) el.removeAttribute("inert");
      const prev = lastFocusedRef.current;
      if (prev && document.contains(prev) && !modalRef.current?.contains(prev)) {
        prev.focus();
      } else {
        const fallback =
          document.getElementById("recent-chronicle-heading") ||
          document.getElementById("heading-control") ||
          document.getElementById("start-heading");
        if (fallback instanceof HTMLElement) fallback.focus();
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const grade = state.finalGrade || engine.evaluateLifeGrade(state);
  const alignInfo = engine.getAlignmentInfo(state);
  const chap = state.chapterId ? engine.getChapter(state.chapterId) : null;
  const careerTrail = (state.careerHistory || [state.careerId])
    .filter((id: string) => id && id !== "child")
    .map((id: string) => engine.getCareer(id).name);
  const visitedNames = (state.visitedWorlds || [state.homeWorldId]).map(
    (id: string) => engine.getWorld(id).name
  );
  const metNames = (state.metCharacters || [])
    .map((id: string) => engine.getCharacter(id))
    .filter(Boolean)
    .map((c: any) => c.name);
  const tlNames = (state.seenTimeline || [])
    .map((id: string) => data.TIMELINE.find((t: any) => t.id === id))
    .filter(Boolean)
    .map((t: any) => `${engine.formatImperialYear(t.year)} ${t.title}`);

  return (
    <div
      id="obit-backdrop"
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="obit-title"
      aria-hidden="false"
    >
      <div className="obituary-modal" ref={modalRef}>
        <div id="obit-rank" className="obit-rank">
          {grade.rank} — {grade.title}
          {state.difficulty === "grimdark" ? " [그림다크 기록]" : ""}
        </div>
        <h2 id="obit-title" ref={titleRef} className="obit-title" tabIndex={-1}>
          {state.name} ({state.age}세)
        </h2>
        <p id="obit-verdict" className="obit-verdict">
          {grade.verdict}
        </p>

        <div id="obit-body">
          <div className="obit-meta">
            <div>
              <strong>최종 신분:</strong> {engine.getCareerDisplayTitle(state)}
              {chap ? ` (${chap.name})` : ""}
            </div>
            <div>
              <strong>생애 기간:</strong> {engine.formatImperialYear(state.birthYear)} ~{" "}
              {engine.formatImperialDate(state.year, state.quarter)}
            </div>
            <div>
              <strong>사인:</strong> {state.deathCause}
            </div>
            <div>
              <strong>도덕 성향:</strong> {alignInfo.fullLabel} ({alignInfo.detail})
            </div>
            {careerTrail.length > 1 && (
              <div>
                <strong>거쳐 온 진로:</strong>{" "}
                {careerTrail.map((name: string, i: number) => (
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
            <div>
              <strong>방문 행성 ({visitedNames.length}):</strong> {visitedNames.join(", ")}
            </div>
            <div>
              <strong>조우한 네임드 인물 ({metNames.length}):</strong>{" "}
              {metNames.length ? metNames.join(", ") : "없음"}
            </div>
            <div>
              <strong>목격한 역사 대사건 ({tlNames.length}):</strong>{" "}
              {tlNames.length ? tlNames.join(" / ") : "없음"}
            </div>
          </div>

          <div className="obit-stats-row">
            {Object.values(engine.STAT_META).map((m: any) => (
              <div key={m.key} className="meta-box">
                <span className="meta-label">{m.name}</span>
                <span className="meta-val">{Math.round(state.stats[m.key] || 0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "20px",
            flexWrap: "wrap"
          }}
        >
          <button id="btn-obit-chronicle" type="button" className="btn-ghost" onClick={onOpenChronicle}>
            전체 인생 기록서 읽기
          </button>
          <button id="btn-obit-copy" type="button" className="btn-ghost" onClick={onCopyObituary}>
            부고·기록 복사
          </button>
          <button id="btn-obit-random" type="button" className="btn-primary" onClick={onRestartRandom}>
            새 운명으로 다시 태어나기
          </button>
          <button id="btn-obit-custom" type="button" className="btn-gold" onClick={onRestartCustom}>
            지정 출생으로 다시 시작
          </button>
          <button id="btn-obit-close" type="button" className="btn-ghost" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
