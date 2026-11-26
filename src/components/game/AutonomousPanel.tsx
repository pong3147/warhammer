import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { groupCareersByTree } from "../../lib/codexMeta";

interface Props {
  state: any;
  engine: any;
  options: any;
  hasPendingEvent: boolean;
  onApplyCareer: (careerId: string) => void;
  onPerformAction: (actionId: string) => void;
  onAttemptTravel: (targetWorldId: string) => void;
  onAnnounce: (msg: string) => void;
}

function getScopeDescription(scope?: string): string {
  if (scope === "galaxy") return "은하 전역 성역으로 이동 또는 파견을 청원할 수 있다.";
  if (scope === "near") return "같은 성역 또는 인접 성역의 행성으로만 이동을 청원할 수 있다.";
  return "";
}

export default function AutonomousPanel({
  state,
  engine,
  options,
  hasPendingEvent,
  onApplyCareer,
  onPerformAction,
  onAttemptTravel,
  onAnnounce
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const careersWrapRef = useRef<HTMLDivElement>(null);
  const actionsWrapRef = useRef<HTMLDivElement>(null);
  const travelWrapRef = useRef<HTMLDivElement>(null);
  const selfActionInitiatedRef = useRef(false);
  const [selectedWorldId, setSelectedWorldId] = useState<string>("");

  // 렌더 커밋 직전의 포커스 대상을 동기적으로 포착해, 자동 틱 중 목록 변동·소멸 시 포커스를 안전하게 복원한다.
  const activeEl = typeof document !== "undefined" ? document.activeElement : null;
  let focusedBeforeCommit: { kind: "career" | "action" | "travel"; id: string } | null = null;
  if (activeEl instanceof HTMLElement) {
    if (activeEl.dataset.cid && careersWrapRef.current?.contains(activeEl)) {
      focusedBeforeCommit = { kind: "career", id: activeEl.dataset.cid };
    } else if (activeEl.dataset.aid && actionsWrapRef.current?.contains(activeEl)) {
      focusedBeforeCommit = { kind: "action", id: activeEl.dataset.aid };
    } else if (
      (activeEl.id === "sel-travel-world" || activeEl.id === "btn-travel-go") &&
      travelWrapRef.current?.contains(activeEl)
    ) {
      focusedBeforeCommit = { kind: "travel", id: activeEl.id };
    }
  }

  const unlockedCareers: any[] = options.unlockedCareers || [];
  const readyEventCareers: any[] = options.readyEventCareers || [];
  const nearCareers: any[] = options.nearCareers || [];
  const lockedCareers: any[] = options.lockedCareers || [];
  const actions: any[] = options.actions || [];
  const travelProfile = options.travelProfile;
  const travelWorlds: any[] = options.travelWorlds || [];
  const manualCareerCooldownLeft: number = options.manualCareerCooldownLeft || 0;
  const careerRetryAfter: Record<string, number> = options.careerRetryAfter || {};
  const isSwornInstitution: boolean = Boolean(options.isSwornInstitution);
  const isNobleApprentice =
    state.careerId === "child" &&
    state.age >= 14 &&
    state.age <= 18 &&
    Array.isArray(state.tags) &&
    state.tags.includes("noble") &&
    !state.tags.includes("schola");
  const isScholaCadet =
    state.careerId === "child" &&
    state.age >= 14 &&
    state.age <= 18 &&
    Array.isArray(state.tags) &&
    state.tags.includes("schola");
  const isAbhuman = Array.isArray(state.tags) && state.tags.includes("abhuman");
  const isHeretic = Array.isArray(state.tags) && state.tags.includes("heretic");

  const effectiveTargetWorldId = useMemo(() => {
    if (selectedWorldId && travelWorlds.some((w) => w.id === selectedWorldId)) {
      return selectedWorldId;
    }
    return travelWorlds[0]?.id || "";
  }, [selectedWorldId, travelWorlds]);

  const travelEval = useMemo(() => {
    if (!effectiveTargetWorldId || !travelProfile?.canAttempt) return null;
    return engine.evaluateTravelAttempt(state, effectiveTargetWorldId);
  }, [engine, state, options, effectiveTargetWorldId, travelProfile?.canAttempt]);

  const groupedLocked = useMemo(() => groupCareersByTree(lockedCareers), [lockedCareers]);

  const careerSig = unlockedCareers
    .map((c) => {
      const retryLeft = Number.isFinite(careerRetryAfter[c.id])
        ? Math.max(0, careerRetryAfter[c.id] - state.year)
        : 0;
      const serviceLeft = !c.isTranshuman && c.tree !== "chaos" ? manualCareerCooldownLeft : 0;
      return `${c.id}:${retryLeft > 0 || serviceLeft > 0 ? "lock" : "open"}`;
    })
    .join(",");
  const actionSig = actions.map((a) => a.id).join(",");
  const travelCanAttempt = Boolean(travelProfile?.canAttempt && travelWorlds.length > 0);

  useLayoutEffect(() => {
    const initiatedByUserClick = selfActionInitiatedRef.current;

    if (!focusedBeforeCommit || !state.alive || hasPendingEvent) return;

    if (focusedBeforeCommit.kind === "career" && careersWrapRef.current) {
      const sameBtn = careersWrapRef.current.querySelector<HTMLButtonElement>(
        `.btn-apply-career[data-cid="${focusedBeforeCommit.id}"]`
      );
      if (sameBtn && !sameBtn.disabled) {
        if (document.activeElement !== sameBtn) sameBtn.focus();
        return;
      }
      const nextBtn = careersWrapRef.current.querySelector<HTMLButtonElement>(
        ".btn-apply-career:not(:disabled)"
      );
      if (nextBtn) {
        nextBtn.focus();
        if (!initiatedByUserClick) {
          onAnnounce(`도전 가능한 진로 목록이 갱신되어 초점을 옮겼다: ${nextBtn.textContent || ""}`);
        }
      } else if (headingRef.current) {
        headingRef.current.focus();
        if (!initiatedByUserClick) {
          onAnnounce("지금 선택 가능한 진로가 없어 자율 선택 제목으로 초점을 옮겼다.");
        }
      }
      return;
    }

    if (focusedBeforeCommit.kind === "action" && actionsWrapRef.current) {
      const sameBtn = actionsWrapRef.current.querySelector<HTMLButtonElement>(
        `.btn-auto-action[data-aid="${focusedBeforeCommit.id}"]`
      );
      if (sameBtn && !sameBtn.disabled) {
        if (document.activeElement !== sameBtn) sameBtn.focus();
        return;
      }
      const nextBtn = actionsWrapRef.current.querySelector<HTMLButtonElement>(
        ".btn-auto-action:not(:disabled)"
      );
      if (nextBtn) {
        nextBtn.focus();
        if (!initiatedByUserClick) {
          onAnnounce(`특수 행동 목록이 갱신되어 초점을 옮겼다: ${nextBtn.textContent || ""}`);
        }
      } else if (headingRef.current) {
        headingRef.current.focus();
        if (!initiatedByUserClick) {
          onAnnounce("가능한 특수 행동이 소진되어 자율 선택 제목으로 초점을 옮겼다.");
        }
      }
      return;
    }

    if (focusedBeforeCommit.kind === "travel" && !travelCanAttempt && headingRef.current) {
      headingRef.current.focus();
      if (!initiatedByUserClick) {
        onAnnounce("성간 이동이 제한되어 자율 선택 제목으로 초점을 옮겼다.");
      }
    }
  }, [careerSig, actionSig, travelCanAttempt, state.alive, hasPendingEvent]);

  // 목록 시그니처가 변하지 않은 클릭(시련 탈락, 이동 거절 등) 직후에도 플래그가 잔류하지 않도록 매 커밋 후 초기화한다.
  useLayoutEffect(() => {
    selfActionInitiatedRef.current = false;
  });

  return (
    <aside className="panel right-panel" aria-labelledby="heading-auto">
      <div className="panel-header">
        <h2 id="heading-auto" ref={headingRef} className="panel-title" tabIndex={-1}>
          자율 선택
        </h2>
        <span className="hint-inline">현재 가능한 선택지만 표시</span>
      </div>

      {/* 1. 도전 가능한 진로 · 승급 */}
      <div className="auto-section">
        <h3 className="auto-section-title">지금 도전 가능한 진로 · 승급</h3>
        <div id="auto-careers-wrap" className="career-list" ref={careersWrapRef}>
          {isNobleApprentice && (
            <div className="ready-offer-box" role="note">
              <strong>귀족 가문 수습 기간 ({state.age}세 / 14~18세)</strong>
              <p>
                원하는 제국 정규 기관을 직접 선택해 지원할 수 있다. 만 18세까지 선택하지 않으면{" "}
                {isHeretic
                  ? "이미 이단 낙인이 찍혀 지하 카오스 밀교단에 의탁하게 된다."
                  : isAbhuman
                  ? "행성 방위군(PDF) 기간병으로 자동 편입된다."
                  : "아드미니스트라툼 서기관으로 자동 임관한다."}
              </p>
            </div>
          )}

          {isScholaCadet && (
            <div className="ready-offer-box" role="note">
              <strong>스콜라 프로제니움 생도 ({state.age}세 / 14~18세)</strong>
              <p>
                자격이 열린 엘리트 기관에 직접 지원할 수 있다. 만 18세까지 선택하지 않으면 적성에
                따라 자동 배치된다.
              </p>
            </div>
          )}

          {manualCareerCooldownLeft > 0 && (
            <div className="ready-offer-box" role="note">
              <strong>정규 기관 최소 복무 기간 ({manualCareerCooldownLeft}년 남음)</strong>
              <p>
                신규 취임 후 2년간은 일반 전직이 대기 상태다. 상부 발탁·초빙 사건과 초인·카오스
                전환은 예외다.
              </p>
            </div>
          )}

          {readyEventCareers.length > 0 && (
            <div className="ready-offer-box" role="note">
              <strong>임명 · 발탁 제안 대기 ({readyEventCareers.length}종)</strong>
              <p>
                {readyEventCareers
                  .slice(0, 3)
                  .map((c) => `${c.name}(Tier ${c.tier})`)
                  .join(", ")}
                {readyEventCareers.length > 3 ? ` 외 ${readyEventCareers.length - 3}종` : ""} 자격을
                충족했다. 분기 진행 중 발탁·승급 사건으로 자연스럽게 제안된다.
              </p>
            </div>
          )}

          {unlockedCareers.length > 0 ? (
            unlockedCareers.map((c) => {
              const admission = engine.getAdmissionPreview
                ? engine.getAdmissionPreview(state, c)
                : null;
              const trialPreview =
                !admission && c.trialCheck && engine.computeCheckPreview
                  ? engine.computeCheckPreview(state, c.trialCheck)
                  : null;
              const retryLeft = Number.isFinite(careerRetryAfter[c.id])
                ? Math.max(0, careerRetryAfter[c.id] - state.year)
                : 0;
              const serviceLeft =
                !c.isTranshuman && c.tree !== "chaos" ? manualCareerCooldownLeft : 0;
              const isLockedByCooldown = retryLeft > 0 || serviceLeft > 0;
              const btnText =
                retryLeft > 0
                  ? `${c.name} 재지원 대기 (${retryLeft}년 후)`
                  : serviceLeft > 0
                  ? `${c.name} 최소 복무 대기 (${serviceLeft}년 남음)`
                  : admission
                  ? `${c.name} 입단 심사 지원 (${admission.target}%)`
                  : trialPreview
                  ? `${c.name} 선발 시련 도전 (${trialPreview.target}%)`
                  : `${c.name} 지원 / 전직하기`;

              return (
                <div key={c.id} className="career-card unlocked">
                  <div className="career-top">
                    <span className="career-name">{c.name}</span>
                    <span className="career-faction">
                      {c.faction} · Tier {c.tier}
                    </span>
                  </div>
                  <p className="career-desc">{c.desc}</p>
                  {admission && (
                    <p className="career-req">
                      입단 심사: {admission.statName} 성공률 {admission.target}% (탈락 시 2년 재지원
                      대기)
                    </p>
                  )}
                  {trialPreview && (
                    <p className="career-req">
                      선발 시련: {trialPreview.statName} 성공률 {trialPreview.target}%
                      {trialPreview.capped ? " (상한)" : ""} (실패 시 부상 또는 순직 위험 · 2년 재도전 대기)
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn-gold btn-apply-career"
                    data-cid={c.id}
                    disabled={isLockedByCooldown}
                    onClick={() => {
                      selfActionInitiatedRef.current = true;
                      onApplyCareer(c.id);
                    }}
                  >
                    {btnText}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="auto-empty">
              {state.age < 14 ? (
                <p>현재 유년기({state.age}세)다. 만 14세가 되면 직무에 편입된다.</p>
              ) : nearCareers.length > 0 ? (
                <>
                  <p style={{ marginBottom: "6px" }}>
                    {isSwornInstitution
                      ? "정규 서약 기관 복무 중에는 같은 기관 승급 또는 타 기관의 초빙 사건으로 전직한다. 가까운 목표 진로:"
                      : "지금 즉시 지원 가능한 새 입문 직군은 없다. 가까운 목표 진로:"}
                  </p>
                  <ul className="near-list">
                    {nearCareers.map((nc) => (
                      <li key={nc.id}>
                        <strong>{nc.name}</strong>: {engine.describeReq(nc.req)}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>현재 신분에서 즉시 전환 가능한 상위 입문 직군이 없다. 공훈과 사건을 통해 승급 기회를 기다리라.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. 가능한 제국 특수 행동 */}
      <div
        id="auto-actions-section"
        className="auto-section"
        style={{ display: actions.length > 0 ? "block" : "none" }}
      >
        <h3 className="auto-section-title">가능한 제국 특수 행동</h3>
        <div id="auto-actions-wrap" className="career-list" ref={actionsWrapRef}>
          {actions.map((a) => (
            <div key={a.id} className="career-card unlocked">
              <div className="career-top">
                <span className="career-name">{a.name}</span>
              </div>
              <p className="career-desc">{a.desc}</p>
              <button
                type="button"
                className="btn-ghost btn-auto-action"
                data-aid={a.id}
                onClick={() => {
                  selfActionInitiatedRef.current = true;
                  onPerformAction(a.id);
                }}
              >
                {a.btnLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 성간 이동 · 전출 청원 */}
      <div className="auto-section">
        <h3 className="auto-section-title">성간 이동 · 전출 청원</h3>
        <div id="auto-travel-wrap" ref={travelWrapRef}>
          {!travelProfile ? null : !travelProfile.canAttempt ? (
            <div className="travel-authority-box">
              <div className="travel-auth-label">{travelProfile.authority || "성간 이동 제한"}</div>
              <p className="travel-note">{travelProfile.reason}</p>
            </div>
          ) : travelWorlds.length === 0 ? (
            <div className="travel-authority-box">
              <div className="travel-auth-label">{travelProfile.authority}</div>
              <p className="travel-note">
                현재 신분·출입 자격 및 항행 범위 안에서 선택 가능한 목적 행성이 없다.
              </p>
            </div>
          ) : (
            <div className="travel-authority-box">
              <div className="travel-auth-label">{travelProfile.authority}</div>
              {getScopeDescription(travelProfile.scope) && (
                <p className="travel-note">{getScopeDescription(travelProfile.scope)}</p>
              )}

              <div className="travel-row">
                <label htmlFor="sel-travel-world" className="sr-only">
                  목적지 행성 선택
                </label>
                <select
                  id="sel-travel-world"
                  value={effectiveTargetWorldId}
                  onChange={(e) => setSelectedWorldId(e.target.value)}
                >
                  {travelWorlds.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({engine.getWorldShortTag(w)})
                    </option>
                  ))}
                </select>
                <button
                  id="btn-travel-go"
                  type="button"
                  className="btn-ghost"
                  disabled={!effectiveTargetWorldId || Boolean(travelEval && !travelEval.valid)}
                  onClick={() => {
                    if (!effectiveTargetWorldId) return;
                    selfActionInitiatedRef.current = true;
                    onAttemptTravel(effectiveTargetWorldId);
                  }}
                >
                  {travelProfile.actionLabel || "성간 이동 / 전출 시도"}
                </button>
              </div>

              {travelEval && (
                <p
                  id="travel-preview-text"
                  className={`travel-odds-preview${!travelEval.autoApprove && travelEval.chance < 35 ? " low" : ""}`}
                >
                  {!travelEval.valid
                    ? travelEval.reason || "선택한 행성으로 이동할 수 없다."
                    : travelEval.autoApprove
                    ? `${engine.getWorld(effectiveTargetWorldId).name} 방면 즉시 출항 가능 (${travelEval.distanceLabel || "은하 항로"}).`
                    : `${engine.getWorld(effectiveTargetWorldId).name} 전출 승인율 ${travelEval.chance}% (${travelEval.distanceLabel || "타 성역"})`}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. 잠긴 전체 진로 조건 미리보기 */}
      <details className="locked-accordion" id="locked-careers-details">
        <summary>
          잠긴 전체 진로 조건 미리보기 (<span id="locked-career-count">{lockedCareers.length}종</span>)
        </summary>
        <div id="all-careers-preview" className="career-list compact-preview">
          {groupedLocked.map((g) => (
            <details key={g.tree} className="career-tree-group">
              <summary>
                {g.treeName} ({g.list.length}종)
              </summary>
              <div className="career-tree-body">
                {g.list.map((c) => (
                  <div key={c.id} className="career-card">
                    <div className="career-top">
                      <span className="career-name">{c.name}</span>
                      <span className="career-faction">
                        Tier {c.tier} · {c.entryMode === "event" ? "발탁" : "지원"}
                      </span>
                    </div>
                    <div className="career-req">조건: {engine.describeReq(c.req) || "조건 없음"}</div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </details>
    </aside>
  );
}
