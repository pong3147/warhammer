import React from "react";
import { getContextualGlossaryRefs } from "../../lib/contextualGlossary.js";
import { withBase } from "../../lib/links";

interface Props {
  state: any;
  engine: any;
}

function cleanShortOrigin(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").split(" · ")[0].trim();
}

function cleanShortTrait(name: string): string {
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

export default function DossierPanel({ state, engine }: Props) {
  const world = engine.getWorld(state.worldId);
  const career = engine.getCareer(state.careerId);
  const origin = engine.getOrigin(state.originId);
  const trait = engine.getTrait(state.traitId);
  const chap = state.chapterId ? engine.getChapter(state.chapterId) : null;
  const maxLife = engine.computeLifeExpectancy(state);
  const glossaryRefs = getContextualGlossaryRefs(state, career, world);

  const woundsPct = Math.max(0, Math.min(100, Math.round((state.wounds / Math.max(1, state.maxWounds)) * 100)));
  const faithPct = Math.max(0, Math.min(100, Math.round(state.faith)));
  const corrPct = Math.max(0, Math.min(100, Math.round(state.corruption)));

  const alignInfo = engine.getAlignmentInfo(state);
  const sH = alignInfo.scores.humane;
  const sD = alignInfo.scores.dogmatic;
  const sR = alignInfo.scores.ruthless;
  const sumA = sH + sD + sR;
  const pH = sumA > 0 ? (sH / sumA) * 100 : 33.3;
  const pD = sumA > 0 ? (sD / sumA) * 100 : 33.3;
  const pR = sumA > 0 ? Math.max(0, 100 - pH - pD) : 33.4;

  const isSupernatural =
    state.tags.includes("astartes") ||
    state.tags.includes("custodes") ||
    state.tags.includes("daemon_prince");

  return (
    <aside className="panel" aria-labelledby="heading-dossier">
      <div className="panel-header">
        <h2 id="heading-dossier" className="panel-title">
          인물 상태
        </h2>
        <span id="lbl-mode-badge" className="ev-badge">
          {state.mode === "random" ? "운명" : "지정"}
          {!state.alive ? " · 사망" : ""}
        </span>
      </div>

      <div id="char-name" className="char-name">
        {state.name} ({state.gender === "male" ? "남" : "여"})
      </div>
      <div id="char-career" className="char-career">
        {engine.getCareerDisplayTitle(state)}
      </div>
      {chap && (
        <div id="char-chapter-cry" className="char-chapter-cry">
          "{chap.battleCry}"
        </div>
      )}

      <dl className="char-meta-grid">
        <div className="meta-box">
          <dt className="meta-label">현재 시점</dt>
          <dd id="meta-age" className="meta-val">
            {state.age}세 ({engine.formatImperialDate(state.year, state.quarter)})
          </dd>
        </div>
        <div className="meta-box">
          <dt className="meta-label">기대수명</dt>
          <dd id="meta-lifespan" className="meta-val">
            {isSupernatural ? `${maxLife}세 이상 (초장수)` : `약 ${maxLife}세`}
          </dd>
        </div>
        <div className="meta-box">
          <dt className="meta-label">현재 행성</dt>
          <dd id="meta-world" className="meta-val">
            {world.name}
          </dd>
        </div>
        <div className="meta-box">
          <dt className="meta-label">출생 / 자질</dt>
          <dd id="meta-origin" className="meta-val">
            {cleanShortOrigin(origin.name)} / {cleanShortTrait(trait.name)}
          </dd>
        </div>
      </dl>

      <div className="vital-block">
        <div className="vital-row">
          <span>생명력</span>
          <strong id="val-wounds">
            {Math.round(state.wounds)} / {Math.round(state.maxWounds)}
          </strong>
        </div>
        <div className="vital-bar" aria-hidden="true">
          <div id="bar-wounds" className="vital-fill wounds" style={{ width: `${woundsPct}%` }} />
        </div>
      </div>

      <div className="vital-block">
        <div className="vital-row">
          <span>황제 신앙</span>
          <strong id="val-faith">{Math.round(state.faith)} / 100</strong>
        </div>
        <div className="vital-bar" aria-hidden="true">
          <div id="bar-faith" className="vital-fill faith" style={{ width: `${faithPct}%` }} />
        </div>
      </div>

      <div className="vital-block">
        <div className="vital-row">
          <span>워프 오염</span>
          <strong id="val-corruption">{Math.round(state.corruption)} / 100</strong>
        </div>
        <div className="vital-bar" aria-hidden="true">
          <div id="bar-corruption" className="vital-fill corruption" style={{ width: `${corrPct}%` }} />
        </div>
      </div>

      <div className="vital-block align-block">
        <div className="vital-row">
          <span>도덕 성향</span>
          <strong id="val-alignment">{alignInfo.fullLabel}</strong>
        </div>
        <div id="val-alignment-detail" className="align-detail">
          {alignInfo.detail}
        </div>
        <div className="align-tri-bar" aria-hidden="true">
          <div id="bar-align-humane" className="align-seg humane" style={{ width: `${pH.toFixed(1)}%` }} />
          <div id="bar-align-dogmatic" className="align-seg dogmatic" style={{ width: `${pD.toFixed(1)}%` }} />
          <div id="bar-align-ruthless" className="align-seg ruthless" style={{ width: `${pR.toFixed(1)}%` }} />
        </div>
      </div>

      <h3 className="sub-panel-title">8대 특성치</h3>
      <dl id="stats-grid" className="stats-grid">
        {Object.values(engine.STAT_META).map((m: any) => {
          const val = Math.round(state.stats[m.key] || 0);
          return (
            <div key={m.key} className="stat-item" title={m.desc}>
              <div className="stat-top">
                <dt className="stat-key">
                  {m.name}
                  <span aria-hidden="true"> ({m.key})</span>
                </dt>
                <dd className="stat-num">{val}</dd>
              </div>
              <div className="stat-mini-bar" aria-hidden="true">
                <div className="stat-mini-fill" style={{ width: `${Math.min(100, val)}%` }} />
              </div>
            </div>
          );
        })}
      </dl>

      <h3 className="sub-panel-title">보유 이력 및 특성</h3>
      <ul id="tag-cloud" className="tag-cloud">
        {(state.tags || []).length === 0 ? (
          <li className="tag-chip">특이 이력 없음</li>
        ) : (
          state.tags.map((t: string) => (
            <li
              key={t}
              className={`tag-chip${t.startsWith("mark_") || t === "heretic" || t === "wanted_by_inquisition" ? " danger" : ""}`}
            >
              {engine.TAG_LABELS[t] || t}
            </li>
          ))
        )}
      </ul>

      {glossaryRefs.length > 0 && (
        <nav
          id="dossier-glossary"
          className="dossier-glossary"
          aria-labelledby="heading-dossier-glossary"
        >
          <h3 id="heading-dossier-glossary" className="sub-panel-title">
            현재 상황 관련 개념 사전
          </h3>
          <ul className="dossier-glossary-list">
            {glossaryRefs.map((ref) => (
              <li key={ref.id}>
                <a
                  className="dossier-glossary-link"
                  href={withBase(`/glossary/#${ref.id}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ref.label} (새 탭)
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
