import React, { useEffect, useRef } from "react";
import { formatRollOutcomeLabel } from "../../engine/formatters.js";

interface Props {
  state: any;
  engine: any;
  onChoose: (choiceIdx: number) => void;
}

export default function ActiveEventPanel({ state, engine, onChoose }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ev = state.pendingEvent;
  const lastRoll = state.lastRoll;

  useEffect(() => {
    if (ev && headingRef.current) {
      headingRef.current.focus();
    }
  }, [ev]);

  const namedChars = ev
    ? (ev.characters || []).map((cid: string) => engine.getCharacter(cid)).filter(Boolean)
    : [];
  const hasPrevMetList = Boolean(ev && Array.isArray(ev.previouslyMetCharacters));
  const prevMetSet = hasPrevMetList
    ? new Set<string>(ev.previouslyMetCharacters)
    : new Set<string>(Array.isArray(state.metCharacters) ? state.metCharacters : []);
  const tagSet = !hasPrevMetList
    ? new Set<string>(Array.isArray(state.tags) ? state.tags : [])
    : null;
  const isRepeatEncounter =
    namedChars.length > 0 &&
    namedChars.every((c: any) =>
      hasPrevMetList
        ? prevMetSet.has(c.id)
        : prevMetSet.has(c.id) || Boolean(tagSet && tagSet.has(`met_${c.id}`))
    );
  const alignMeta = ev && ev.alignBias && engine.ALIGNMENT_META ? engine.ALIGNMENT_META[ev.alignBias] : null;
  const rollLabel = lastRoll
    ? lastRoll.statName ||
      (lastRoll.statKey && engine.STAT_META[lastRoll.statKey]?.name) ||
      lastRoll.statKey ||
      "특성치"
    : "";

  return (
    <>
      {lastRoll ? (
        <div id="roll-banner" className={`roll-banner ${lastRoll.success ? "ok" : "fail"}`}>
          직전 판정 ({rollLabel}): d100 굴림 <strong>{lastRoll.roll}</strong> / 목표{" "}
          <strong>{lastRoll.target}</strong> {formatRollOutcomeLabel(lastRoll)}
        </div>
      ) : (
        <div id="roll-banner" className="roll-banner" style={{ display: "none" }} />
      )}

      <div id="active-event-wrap">
        {ev && (
          <section
            className={`event-box${ev.isTimeline ? " timeline-event" : ""}`}
            aria-labelledby="active-event-heading"
          >
            <h2 id="active-event-heading" ref={headingRef} className="event-title" tabIndex={-1}>
              진행 중인 사건: {ev.title}
            </h2>

            <div className="event-badges">
              <span className={`ev-badge${ev.isTimeline ? " timeline" : ""}`}>
                {ev.isTimeline
                  ? `역사 대사건 · ${engine.formatImperialYear(ev.year)}`
                  : ev.category || "분기 사건"}
              </span>
              {alignMeta && (
                <span className={`ev-badge align-${ev.alignBias}`}>{alignMeta.biasLabel}</span>
              )}
              {ev.reqLabel ? (
                <span className="ev-badge">조건: {ev.reqLabel}</span>
              ) : ev.scope ? (
                <span className="ev-badge">범위: {ev.scope}</span>
              ) : null}
              {namedChars.map((c: any) => (
                <span key={c.id} className="ev-badge character" aria-hidden="true">
                  인물: {c.name}
                </span>
              ))}
            </div>

            {namedChars.length > 0 && (
              <details
                key={`${ev.id}-${isRepeatEncounter ? "repeat" : "first"}`}
                open={!isRepeatEncounter}
                className="named-spotlight"
              >
                <summary className="named-spotlight-summary">
                  <span className="named-spotlight-kicker">
                    {isRepeatEncounter ? "재조우 인물 소개" : "인물 소개"}
                  </span>{" "}
                  <span className="named-spotlight-names">
                    {namedChars.map((c: any) => c.name).join(" · ")}
                  </span>
                </summary>
                <div className="named-spotlight-body">
                  {namedChars.map((c: any) => (
                    <article key={c.id} className="named-profile-card">
                      <div className="named-profile-head">
                        <h3 className="named-profile-name">{c.name}</h3>
                        <span className="named-profile-en" aria-hidden="true">
                          {c.en}
                        </span>
                      </div>
                      <div className="named-profile-meta">
                        {c.title} · {c.faction} · 활동기 {c.era}
                      </div>
                      <blockquote className="named-profile-quote">"{c.quote}"</blockquote>
                      <p className="named-profile-desc">{c.desc}</p>
                      <div className="named-profile-source">출처: {c.source}</div>
                    </article>
                  ))}
                </div>
              </details>
            )}

            <p className="event-text">{ev.text}</p>

            <div className="event-choices">
              {(ev.choices || []).map((ch: any, idx: number) => {
                const unlocked = engine.checkReq(state, ch.req);
                let oddsNode: React.ReactNode = <span className="choice-odds">확정</span>;
                if (!unlocked) {
                  oddsNode = (
                    <span className="choice-odds locked">잠김 · {engine.describeReq(ch.req)}</span>
                  );
                } else if (ch.check) {
                  const preview = engine.computeCheckPreview
                    ? engine.computeCheckPreview(state, ch.check)
                    : {
                        statName:
                          (engine.STAT_META[ch.check.stat] && engine.STAT_META[ch.check.stat].name) ||
                          ch.check.stat,
                        target: engine.clamp(
                          Math.round((state.stats[ch.check.stat] || 20) + (ch.check.diff || 0)),
                          5,
                          90
                        ),
                        capped: false,
                        modText: ""
                      };
                  oddsNode = (
                    <span className="choice-odds">
                      {preview.statName} 성공률 {preview.target}%
                      {preview.capped ? " (상한)" : ""}
                      {preview.modText ? ` · ${preview.modText}` : ""}
                    </span>
                  );
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    className="choice-btn"
                    data-choice={idx}
                    disabled={!unlocked}
                    onClick={() => onChoose(idx)}
                  >
                    <span>{ch.label}</span>{" "}
                    {oddsNode}
                  </button>
                );
              })}
            </div>

            {ev.source && <div className="event-source">참조 출처: {ev.source}</div>}
          </section>
        )}
      </div>
    </>
  );
}
