// 직군 서약 격리 · 입단 심사 · 동적 발탁/스카우트 · 수동 전직 · 챕터/템플 서약 모듈 (엔진 · QA Gate 7A 단일 정본)
import {
  STAT_META,
  clamp,
  getAlignmentInfo
} from "./formatters.js";

export const UNBOUND_CAREERS = new Set([
  "child",
  "menial_worker",
  "underhive_ganger",
  "underhive_boss",
  "guild_artisan",
  "pdf_trooper"
]);

export const CLOSED_VOW_TREES = new Set([
  "sororitas",
  "mechanicus",
  "navis_navigator",
  "imperial_knight",
  "psyker"
]);

export const NOBLE_HIDDEN_LOW_CAREERS = new Set([
  "menial_worker",
  "underhive_ganger",
  "pdf_trooper",
  "astra_militarum",
  "skitarii"
]);

const ENLISTED_MILITARUM_CAREERS = new Set([
  "astra_militarum",
  "militarum_sergeant",
  "pdf_trooper",
  "tempestus_scion"
]);

export function isParachuteNobleOfficer(state, targetCareerId) {
  if (!state || targetCareerId !== "militarum_officer") return false;
  const tags = Array.isArray(state.tags) ? state.tags : [];
  if (!tags.includes("noble") || tags.includes("disowned_noble")) return false;
  const history = Array.isArray(state.careerHistory) ? state.careerHistory : [state.careerId];
  return !history.some((cid) => ENLISTED_MILITARUM_CAREERS.has(cid));
}

export function isUnboundCareer(careerId) {
  return UNBOUND_CAREERS.has(careerId);
}

export function isIncorruptibleTags(tags) {
  if (!tags) return false;
  if (tags instanceof Set) {
    return tags.has("custodes") || tags.has("grey_knight") || tags.has("living_saint");
  }
  return Array.isArray(tags) && (tags.includes("custodes") || tags.includes("grey_knight") || tags.includes("living_saint"));
}

export function isDirectSuccessorReq(curId, req) {
  if (!req) return false;
  if (req.anyCareers && req.anyCareers.includes(curId)) return true;
  if (Array.isArray(req.or)) {
    for (let i = 0; i < req.or.length; i++) {
      if (isDirectSuccessorReq(curId, req.or[i])) return true;
    }
  }
  return false;
}

export function isClosedVowCrossBlocked(curCareer, targetCareer, isDirectCrossLink = null) {
  if (!curCareer || !targetCareer) return false;
  if (curCareer.id === "child" || targetCareer.tree === curCareer.tree) return false;
  if (!CLOSED_VOW_TREES.has(curCareer.tree)) return false;
  const directLink = isDirectCrossLink !== null
    ? Boolean(isDirectCrossLink)
    : isDirectSuccessorReq(curCareer.id, targetCareer.req);
  return (
    !directLink &&
    targetCareer.tree !== "inquisition" &&
    targetCareer.tree !== "living_saint" &&
    targetCareer.tree !== "chaos" &&
    !Boolean(targetCareer.isTranshuman) &&
    !(curCareer.tree === "navis_navigator" && targetCareer.tree === "rogue_trader")
  );
}

export function isCareerTransitionBlockedPure(tags, curCareer, targetCareer, alignInfo = null) {
  if (!curCareer || !targetCareer) return true;
  const hasTag = (t) => (tags instanceof Set ? tags.has(t) : Array.isArray(tags) && tags.includes(t));
  const curIsTranshuman =
    Boolean(curCareer.isTranshuman) ||
    hasTag("astartes") ||
    hasTag("custodes") ||
    hasTag("grey_knight") ||
    hasTag("daemon_prince") ||
    hasTag("living_saint");
  if (hasTag("assassin") && targetCareer.tree !== "officio_assassinorum" && targetCareer.tree !== "chaos") return true;
  if (hasTag("living_saint") && targetCareer.tree !== "living_saint") return true;
  if (hasTag("navigator") && ["astartes", "grey_knights", "custodes", "sororitas", "psyker"].includes(targetCareer.tree)) return true;
  if (curCareer.id !== "child" && curIsTranshuman && !targetCareer.isTranshuman && targetCareer.tree !== "chaos") return true;
  if (isIncorruptibleTags(tags) && targetCareer.tree === "chaos") return true;
  if (
    alignInfo &&
    (targetCareer.id === "hive_crime_lord" || targetCareer.id === "underhive_boss") &&
    (alignInfo.dominant === "humane" || alignInfo.dominant === "dogmatic")
  ) return true;
  return false;
}

export function isManualCareerAllowedPure(tags, curCareer, targetCareer) {
  if (!curCareer || !targetCareer || !targetCareer.selectable) return false;
  if (targetCareer.entryMode === "event") return false;
  if (curCareer.id === targetCareer.id) return false;
  if (isCareerTransitionBlockedPure(tags, curCareer, targetCareer)) return false;
  const hasTag = (t) => (tags instanceof Set ? tags.has(t) : Array.isArray(tags) && tags.includes(t));
  // 귀족 · 로그 트레이더 · 테라 고위 귀족(!disowned_noble)은 수동 전직 창에서 하위·사병 직군을 숨긴다
  const isUpperNoblePatronage =
    (hasTag("noble") || hasTag("rogue_trader_blood") || hasTag("terra_elite")) &&
    !hasTag("disowned_noble") &&
    !hasTag("abhuman");
  if (isUpperNoblePatronage && NOBLE_HIDDEN_LOW_CAREERS.has(targetCareer.id)) {
    return false;
  }
  // 비구속 초년·민간·방위군 신분은 자격이 열리는 모든 open 직군에 자유 지원 가능
  if (UNBOUND_CAREERS.has(curCareer.id)) {
    return curCareer.id === "child" || targetCareer.tier >= curCareer.tier || targetCareer.tree === "chaos";
  }
  // 로그 트레이더 방계 혈손·직계 연계·항법사 가문은 폐쇄 서약 기관이 아닐 때(또는 항법사) 세네샬 전환 허용
  if (
    targetCareer.id === "rt_seneschal" &&
    targetCareer.tier >= curCareer.tier &&
    (
      curCareer.tree === "navis_navigator" ||
      (!CLOSED_VOW_TREES.has(curCareer.tree) && (isDirectSuccessorReq(curCareer.id, targetCareer.req) || hasTag("rogue_trader_blood")))
    )
  ) {
    return true;
  }
  // 정규 서약 기관 복무 중에는 같은 트리 승급 · 카오스 · 초인 · 동급 이상 사이커만 직접 전환 허용 (타 기관 수평 이직 쇼핑 차단)
  if (targetCareer.tree === curCareer.tree && targetCareer.tier >= curCareer.tier) return true;
  if (targetCareer.tree === "chaos") return true;
  if (Boolean(targetCareer.isTranshuman)) return true;
  if (targetCareer.tree === "psyker" && targetCareer.tier >= curCareer.tier) return true;
  return false;
}

export function evaluateDynamicOfferEligibilityPure(tags, curCareer, targetCareer, options = {}) {
  if (!curCareer || !targetCareer || !targetCareer.selectable || targetCareer.id === curCareer.id || targetCareer.tier < 2) {
    return { allowed: false, isScoutOffer: false, isDirectCrossLink: false };
  }
  if (targetCareer.id === "chaos_cultist" && curCareer.tier >= 4) {
    return { allowed: false, isScoutOffer: false, isDirectCrossLink: false };
  }
  const hasTag = (t) => (tags instanceof Set ? tags.has(t) : Array.isArray(tags) && tags.includes(t));
  const curIsTranshuman =
    Boolean(curCareer.isTranshuman) ||
    hasTag("astartes") ||
    hasTag("custodes") ||
    hasTag("grey_knight") ||
    hasTag("daemon_prince") ||
    hasTag("living_saint");

  if (curCareer.id === "child") {
    const ok = Boolean(targetCareer.isTranshuman) || targetCareer.tier >= 3;
    return { allowed: ok, isScoutOffer: false, isDirectCrossLink: false };
  }
  if (curIsTranshuman && !targetCareer.isTranshuman) {
    return { allowed: false, isScoutOffer: false, isDirectCrossLink: false };
  }
  if (targetCareer.tree === curCareer.tree) {
    const directNext = targetCareer.tier > curCareer.tier || (targetCareer.tier === curCareer.tier && isDirectSuccessorReq(curCareer.id, targetCareer.req));
    return { allowed: directNext, isScoutOffer: false, isDirectCrossLink: false };
  }
  if (targetCareer.tier < curCareer.tier && targetCareer.tree !== "chaos") {
    return { allowed: false, isScoutOffer: false, isDirectCrossLink: false };
  }
  const isDirectCrossLink = isDirectSuccessorReq(curCareer.id, targetCareer.req);
  // 종신 폐쇄 서약 기관(소로리타스·기계교·항법사·기사 가문·사이커)은 정사적 예외(이단심문소·리빙 세인트·카오스·초인 승격·항법사->로그트레이더·직계 연계) 외 모든 타 기관 발탁·초빙 원천 차단
  if (isClosedVowCrossBlocked(curCareer, targetCareer, isDirectCrossLink)) {
    return { allowed: false, isScoutOffer: false, isDirectCrossLink };
  }
  const lateralAllowed =
    targetCareer.entryMode === "event" ||
    targetCareer.tree === "chaos" ||
    Boolean(targetCareer.isTranshuman) ||
    Boolean(targetCareer.allowLateralOffer);
  if (lateralAllowed) {
    return { allowed: true, isScoutOffer: false, isDirectCrossLink };
  }
  // 정규 서약 기관 복무 중 타 기관이 먼저 찾아오는 특별 초빙 · 차출 경로
  // 비혈통·비연계 외부인이 폐쇄 서약 기관으로 무분별하게 초빙되는 것도 차단
  const checkDestOriginTags = options.checkDestOriginTags !== false;
  const closedDestBlocked =
    checkDestOriginTags &&
    !isDirectCrossLink &&
    (
      (targetCareer.tree === "mechanicus" && !hasTag("mechanicus") && !hasTag("mechanicus_blood")) ||
      (targetCareer.tree === "navis_navigator" && !hasTag("navigator")) ||
      (targetCareer.tree === "imperial_knight" && !hasTag("knight_blood")) ||
      (targetCareer.tree === "sororitas" && !hasTag("schola") && !hasTag("pious") && !hasTag("saint_spark"))
    );
  const scoutBaseOk =
    !closedDestBlocked &&
    !UNBOUND_CAREERS.has(targetCareer.id) &&
    targetCareer.entryMode === "open" &&
    !curIsTranshuman &&
    targetCareer.tier >= curCareer.tier &&
    (!UNBOUND_CAREERS.has(curCareer.id) || curCareer.id === "pdf_trooper");
  if (!scoutBaseOk) {
    return { allowed: false, isScoutOffer: false, isDirectCrossLink };
  }
  if (options.checkScoutQualification) {
    const stats = options.stats || {};
    const alignInfo = options.alignInfo || { dominant: "neutral" };
    const isAlignMatch =
      (alignInfo.dominant === "dogmatic" && ["commissariat", "sororitas", "arbites", "inquisition"].includes(targetCareer.tree)) ||
      (alignInfo.dominant === "humane" && ["ecclesiarchy", "inquisition"].includes(targetCareer.tree)) ||
      (alignInfo.dominant === "ruthless" && ["rogue_trader", "officio_assassinorum", "inquisition"].includes(targetCareer.tree));
    const isHighInqFit = targetCareer.id === "inquisition_acolyte" && (stats.Int || 0) >= 45 && (stats.WP || 0) >= 45;
    const qualified = !UNBOUND_CAREERS.has(curCareer.id)
      ? ((stats.Inf || 0) >= 52 || isAlignMatch || isDirectCrossLink || isHighInqFit)
      : (isDirectCrossLink || isHighInqFit);
    return { allowed: qualified, isScoutOffer: qualified, isDirectCrossLink };
  }
  return { allowed: true, isScoutOffer: true, isDirectCrossLink };
}

export function getPrimaryAdmissionStat(career) {
  const reqStats = career && career.req && career.req.stats;
  if (reqStats && Object.keys(reqStats).length > 0) {
    return Object.entries(reqStats).sort((a, b) => b[1] - a[1])[0];
  }
  const orList = career && career.req && career.req.or;
  if (Array.isArray(orList)) {
    for (let i = 0; i < orList.length; i++) {
      const branch = orList[i];
      if (branch && branch.stats && Object.keys(branch.stats).length > 0) {
        return Object.entries(branch.stats).sort((a, b) => b[1] - a[1])[0];
      }
    }
  }
  const growth = career && career.annualGrowth;
  if (growth && Object.keys(growth).length > 0) {
    const top = Object.entries(growth).sort((a, b) => b[1] - a[1])[0][0];
    return [top, 30];
  }
  return ["Int", 30];
}

export function createCareerRulesModule(deps) {
  const {
    DATA,
    getWorld,
    getCareer,
    describeReq,
    applyAlignDelta,
    randInt,
    pickWeighted,
    makeReqContext,
    getCareerDisplayTitle,
    checkReq,
    applyDiminishedStatGain,
    rollD100,
    addLog,
    isIncorruptibleState,
    applyOutcome,
    finalizeDeath
  } = deps;

  function isCareerTransitionBlocked(state, targetCareer, curCareer = null, alignInfo = null) {
    if (!state || !targetCareer) return true;
    const cur = curCareer || getCareer(state.careerId);
    const aInfo = alignInfo || getAlignmentInfo(state);
    return isCareerTransitionBlockedPure(state.tags || [], cur, targetCareer, aInfo);
  }

  function isManualCareerAllowed(state, targetCareer, curCareer = null) {
    if (!state || !targetCareer) return false;
    const cur = curCareer || getCareer(state.careerId);
    return isManualCareerAllowedPure(state.tags || [], cur, targetCareer);
  }

  function createChapterSelectionEvent(state) {
    const chapters = DATA.CHAPTERS || [];
    if (!chapters.length) return null;

    const preferredId = state.homeWorldId === "terra"
      ? "imperial_fists"
      : (chapters.find((c) => c.homeworldId && c.homeworldId === state.homeWorldId)?.id || null);

    const ordered = [...chapters].sort((a, b) => {
      if (a.id === preferredId) return -1;
      if (b.id === preferredId) return 1;
      return 0;
    });

    const choices = ordered.map((ch) => {
      const rec = ch.id === preferredId ? " (고향 징병 챕터 · 추천)" : "";
      const modPreview = Object.entries(ch.statMods || {})
        .map(([k, v]) => `${(STAT_META[k] && STAT_META[k].name) || k} ${v > 0 ? "+" + v : v}`)
        .join(", ");
      const faithPart = ch.faithBonus ? `, 신앙 +${ch.faithBonus}` : "";
      const choice = {
        label: `${ch.name}${rec} — 프라이마크 ${ch.primarch} (${modPreview}${faithPart})`,
        effect: {
          chooseChapter: ch.id,
          text: `[${ch.name}] 챕터에 영원한 충성의 서약을 올렸다! 전투 함성: "${ch.battleCry}" — ${ch.desc}`,
          stats: ch.statMods || {},
          faith: ch.faithBonus || 0
        }
      };
      if (ch.allowPsyker === false) {
        choice.req = { excludeTags: ["psyker"] };
      }
      return choice;
    });

    return {
      id: `dyn_chapter_oath_${state.year}`,
      isTimeline: false,
      category: "챕터 서약",
      reqLabel: "아뎁투스 아스타르테스 입단",
      title: "스페이스 마린 챕터 서약 — 어느 형제단의 진시드를 이을 것인가",
      text: "초인 장기 이식을 견뎌 낸 그대 앞에 인류제국을 대표하는 전설적 아스타르테스 챕터들의 군기가 펼쳐졌다. 어느 프라이마크의 유산과 전투 교리를 계승할지 선택하라. 선택한 챕터에 따라 능력치와 고유 스토리 이벤트가 해금된다.",
      choices,
      source: "Codex: Space Marines / First & Second Founding Chapters"
    };
  }

  function hasAssassinClade(state) {
    const tags = (state && state.tags) || [];
    return (
      tags.includes("clade_vindicare") ||
      tags.includes("clade_callidus") ||
      tags.includes("clade_eversor") ||
      tags.includes("clade_culexus")
    );
  }

  function createAssassinCladeEvent(state) {
    if (!state || hasAssassinClade(state)) return null;
    const isBlank = (state.tags || []).includes("blank");
    const choices = [
      {
        label: "빈디카레 템플 — 초장거리 저격과 일발일살의 침묵 (사격 +8, 민첩 +4, 의지 +4)",
        effect: {
          text: "빈디카레 템플의 검은 스텔스 슈트를 입고 엑시투스 라이플과 영혼을 일체화하는 고독한 저격수의 길에 서약했다.",
          stats: { BS: 8, Ag: 4, WP: 4 },
          addTags: ["clade_vindicare"]
        }
      },
      {
        label: "칼리두스 템플 — 폴리모르핀 변신과 적진 심장부 잠입 (교섭 +8, 지성 +5, 민첩 +4)",
        effect: {
          text: "폴리모르핀 생체 변형 약물과 크탄 페이즈 소드를 하사받으며 칼리두스 템플의 천의 얼굴을 지닌 침투 암살자로 거듭났다.",
          stats: { Fel: 8, Int: 5, Ag: 4 },
          addTags: ["clade_callidus"]
        }
      },
      {
        label: "에버서 템플 — 광란 전투 약물과 공포의 섬멸전 (백병 +9, 강인 +6, 민첩 +4, 암흑 +4)",
        effect: {
          text: "심장에 생체 폭탄과 광란 약물 주입관을 이식받고 에버서 템플의 통제 불능한 살육 폭풍으로 다시 태어났다.",
          stats: { WS: 9, T: 6, Ag: 4 },
          align: { ruthless: 4 },
          addTags: ["clade_eversor"]
        }
      },
      {
        label: isBlank
          ? "쿨렉수스 템플 (블랭크 전용 · 추천) — 영혼 없는 공포의 사이커 처형자 (의지 +10, 지성 +6, 민첩 +4)"
          : "쿨렉수스 템플 (블랭크 자질 필수) — 사이커와 악마를 소멸시키는 공허의 처형자",
        req: { allTags: ["blank"] },
        effect: {
          text: "이단 사이커의 심장을 멈추는 아니무스 스페쿨룸 투구를 쓰고 쿨렉수스 템플의 살아 있는 공허로 서약했다.",
          stats: { WP: 10, Int: 6, Ag: 4 },
          corruptionReset: true,
          addTags: ["clade_culexus"]
        }
      }
    ];

    if (isBlank) {
      const cul = choices.pop();
      choices.unshift(cul);
    }

    return {
      id: `dyn_assassin_clade_${state.year}`,
      isTimeline: false,
      category: "템플 배정",
      reqLabel: "오피시오 아사시노룸 입단",
      title: "오피시오 아사시노룸 — 4대 암살 템플 서약",
      text: "테라의 은밀한 지하 성소에서 네 명의 그림자 대리인이 그대의 적성 기록을 내려다보고 있다. 한 번 각인된 신경 개조는 되돌릴 수 없다. 어느 암살 템플의 칼날이 되어 황제의 적들을 지워 낼 것인가.",
      choices,
      source: "Codex: Imperial Agents / Officio Assassinorum Lore"
    };
  }

  function applyCareerJoinEffects(state, oj) {
    if (!oj) return null;
    let appliedStats = null;
    if (oj.stats) {
      appliedStats = {};
      for (const [k, delta] of Object.entries(oj.stats)) {
        if (state.stats[k] !== undefined) {
          const actual = applyDiminishedStatGain(state, k, delta, "join");
          if (actual !== 0) appliedStats[k] = actual;
        }
      }
    }
    if (oj.woundsBonus) {
      state.maxWounds += oj.woundsBonus;
      state.wounds = clamp(state.wounds + oj.woundsBonus, 1, state.maxWounds);
    }
    if (oj.faith) {
      state.faith = clamp(state.faith + oj.faith, 0, 100);
    }
    if (oj.corruption) {
      const incorruptible = isIncorruptibleState(state);
      if (!(incorruptible && oj.corruption > 0)) {
        state.corruption = clamp(state.corruption + oj.corruption, 0, 100);
      }
    }
    if (oj.corruptionReset) {
      state.corruption = 0;
    }
    if (oj.align) {
      applyAlignDelta(state, oj.align);
    }
    if (oj.lifeBonusExtra || oj.extraLifeBonus) {
      state.extraLifeBonus += (oj.lifeBonusExtra || oj.extraLifeBonus);
    }
    if (oj.addTags) {
      for (const t of oj.addTags) {
        if (!state.tags.includes(t)) state.tags.push(t);
      }
    }
    if (isIncorruptibleState(state) && state.corruption > 0) {
      state.corruption = 0;
    }
    return appliedStats ? Object.assign({}, oj, { stats: appliedStats }) : oj;
  }

  function getAdmissionPreview(state, careerOrId) {
    if (!state) return null;
    const targetCareer = typeof careerOrId === "string" ? getCareer(careerOrId) : careerOrId;
    const curCareer = getCareer(state.careerId);
    if (!targetCareer || !curCareer) return null;
    if (!UNBOUND_CAREERS.has(curCareer.id)) return null;
    if (UNBOUND_CAREERS.has(targetCareer.id)) return null;
    if (targetCareer.trialCheck || targetCareer.tree === "chaos") return null;

    const [statKey, reqMin] = getPrimaryAdmissionStat(targetCareer);
    const statVal = (state.stats && state.stats[statKey]) || 25;
    const tags = state.tags || [];
    const pedigreeBonus =
      (tags.includes("noble") && ["administratum", "navy", "militarum", "rogue_trader", "arbites"].includes(targetCareer.tree)) ||
      (tags.includes("schola") && ["commissariat", "sororitas", "militarum", "inquisition", "arbites"].includes(targetCareer.tree)) ||
      (tags.includes("mechanicus_blood") && targetCareer.tree === "mechanicus") ||
      (tags.includes("pious") && ["ecclesiarchy", "sororitas"].includes(targetCareer.tree)) ||
      (tags.includes("military_blood") && ["militarum", "navy", "commissariat"].includes(targetCareer.tree)) ||
      (tags.includes("knight_blood") && targetCareer.tree === "imperial_knight") ||
      (tags.includes("rogue_trader_blood") && targetCareer.tree === "rogue_trader") ||
      (tags.includes("navigator") && targetCareer.tree === "navis_navigator")
        ? 8
        : 0;
    const homeId = state.homeWorldId || state.worldId;
    const homeBonus =
      (homeId === "terra" && targetCareer.tier >= 3) ? 5 :
      (homeId === "cadia" && targetCareer.tree === "militarum") ? 5 :
      (homeId === "generic_civilised") ? 4 : 0;
    const traitBonus =
      ((tags.includes("prodigy") || tags.includes("savant_genius")) && ["militarum", "navy", "inquisition", "administratum"].includes(targetCareer.tree)) ? 8 : 0;
    const tierPenalty = Math.max(0, (targetCareer.tier - 2) * 8);
    const diffPenalty = state.difficulty === "grimdark" ? 12 : 0;
    const raw = 58 + (statVal - reqMin) * 1.1 + pedigreeBonus + homeBonus + traitBonus - tierPenalty - diffPenalty;
    const minTarget = state.difficulty === "grimdark" ? 28 : 40;
    const maxTarget = state.difficulty === "grimdark" ? 80 : 88;
    const target = clamp(Math.round(raw), minTarget, maxTarget);
    const meta = STAT_META[statKey] || { name: statKey };
    return {
      statKey,
      statName: meta.name,
      target,
      pedigreeBonus
    };
  }

  function createDynamicCareerOfferEvent(state, reqCtx = null, options = {}) {
    if (!state || !state.alive || state.pendingEvent) return null;

    const ctx = reqCtx || makeReqContext(state);
    const cur = getCareer(state.careerId);
    const minOfferGap = cur.id === "child" ? 1 : (cur.tier >= 5 ? 7 : 4);
    if (!options.forceOffer && state.year - (state.lastCareerOfferYear ?? -999) < minOfferGap) return null;

    const history = state.careerHistory || [state.careerId];
    const declined = state.declinedCareers || {};
    const alignInfo = getAlignmentInfo(state);

    const candidates = [];
    for (let i = 0; i < DATA.CAREERS.length; i++) {
      const c = DATA.CAREERS[i];
      if (!c.selectable || c.id === state.careerId || c.tier < 2) continue;
      if (history.includes(c.id)) continue;
      if (!options.ignoreCooldown && declined[c.id] !== undefined && state.year - declined[c.id] < 8) continue;
      if (isCareerTransitionBlocked(state, c, cur, alignInfo)) continue;
      if (!checkReq(state, c.req, ctx)) continue;

      const offerCheck = evaluateDynamicOfferEligibilityPure(state.tags || [], cur, c, {
        checkDestOriginTags: true,
        checkScoutQualification: true,
        stats: state.stats,
        alignInfo
      });
      if (!offerCheck.allowed) continue;
      const isScoutOffer = offerCheck.isScoutOffer;
      const isDirectCrossLink = offerCheck.isDirectCrossLink;

      let w = 14;
      let prob = 0.04;
      if (c.id === "daemon_prince") {
        w = 90;
        prob = 0.28;
      } else if (c.id === "living_saint") {
        w = 45;
        prob = 0.08;
      } else if (c.id === "saint_vessel") {
        const hasMiracleSpark = state.tags.includes("living_miracle") || state.tags.includes("saint_spark");
        w = hasMiracleSpark ? 14 : 6;
        prob = hasMiracleSpark ? 0.024 : 0.008;
      } else if (c.id === "assassin_initiate") {
        const isBlank = state.tags.includes("blank");
        const isFreak = state.tags.includes("freak_physique");
        w = isBlank || isFreak ? 32 : 14;
        prob = isBlank || isFreak ? 0.10 : 0.025;
      } else if (c.tier >= 6) {
        w = 35;
        prob = 0.025;
      } else if (Boolean(c.isTranshuman)) {
        const hasBodyAnomaly = state.tags.includes("freak_physique") || state.tags.includes("alpha_plus_psyker");
        w = hasBodyAnomaly ? 68 : 50;
        prob = hasBodyAnomaly ? 0.34 : 0.24;
      } else if (c.tree === "chaos") {
        w = 34;
        prob = 0.12;
      } else if (c.tree === cur.tree && c.entryMode === "event") {
        w = 40;
        prob = 0.11;
      } else if (c.tree === cur.tree) {
        w = 12;
        prob = 0.04;
      } else if (c.entryMode === "event") {
        w = cur.tier >= 5 ? 8 : 14;
        prob = cur.tier >= 5 ? 0.022 : 0.032;
      } else if (isScoutOffer) {
        w = isDirectCrossLink ? 14 : 10;
        prob = cur.tier >= 5 ? 0.018 : 0.032;
      }
      if (state.tags.includes("savant_genius") && ["inquisition", "administratum", "governor", "militarum", "mechanicus", "rogue_trader"].includes(c.tree)) {
        w = Math.round(w * 1.6);
        prob = Math.min(0.45, prob * 1.4);
      }
      if (state.tags.includes("omega_pariah") && (c.tree === "officio_assassinorum" || c.tree === "inquisition")) {
        w = Math.round(w * 1.6);
        prob = Math.min(0.45, prob * 1.4);
      }
      if (alignInfo.dominant === "dogmatic" && ["commissariat", "sororitas", "arbites", "inquisition", "living_saint"].includes(c.tree)) {
        w = Math.round(w * 1.35);
      } else if (alignInfo.dominant === "humane" && (c.tree === "ecclesiarchy" || c.tree === "living_saint")) {
        w = Math.round(w * 1.35);
      } else if (alignInfo.dominant === "ruthless" && (c.id === "hive_crime_lord" || c.id === "underhive_boss" || c.tree === "chaos" || c.tree === "rogue_trader" || c.tree === "officio_assassinorum")) {
        w = Math.round(w * 1.4);
      }
      candidates.push({ item: c, w, prob, isScoutOffer });
    }

    if (!candidates.length) return null;

    if (!options.forceOffer) {
      const maxProb = candidates.reduce((m, x) => Math.max(m, x.prob), 0);
      if (Math.random() >= maxProb) return null;
    }

    const pickedEntry = options.targetCareerId
      ? (candidates.find((x) => x.item.id === options.targetCareerId) || pickWeighted(candidates, "w"))
      : pickWeighted(candidates, "w");
    const picked = pickedEntry.item;
    const isScoutOffer = Boolean(pickedEntry.isScoutOffer);

    state.lastCareerOfferYear = state.year;

    const curTitle = getCareerDisplayTitle(state, cur);
    const nextTitle = getCareerDisplayTitle(state, picked);
    const isLateral = cur.id !== "child" && picked.tree !== cur.tree;
    const category = picked.tree === "chaos"
      ? (picked.id === "daemon_prince" ? "승천의 의식" : "암흑의 부름")
      : (picked.tree === "living_saint"
        ? "황제의 성광"
        : (picked.tier >= 6
          ? "제국 최고위 추대"
          : (isScoutOffer ? "타 기관 초빙 · 차출" : (isLateral ? "평행 횡단 · 특임 발탁" : "승급 · 진로 발탁"))));

    const lifeStr = picked.lifeBonus >= 0 ? `+${picked.lifeBonus}년` : `${picked.lifeBonus}년`;
    const joinPreview = picked.onJoin && picked.onJoin.stats
      ? Object.entries(picked.onJoin.stats)
          .filter(([, d]) => d !== 0)
          .slice(0, 4)
          .map(([k, d]) => `${(STAT_META[k] && STAT_META[k].name) || k} ${d > 0 ? "+" + d : d}`)
          .join(", ")
      : "";
    const bonusSummary = joinPreview ? `수명 보정 ${lifeStr} · ${joinPreview}` : `수명 보정 ${lifeStr}`;

    const pitch = isScoutOffer
      ? `[${curTitle}] 복무 중 쌓은 평판과 역량이 타 기관 상부에 닿아 [${nextTitle}] 직위로의 특별 초빙 · 차출 영장이 도착했다. 일반 전직 제한이나 최소 복무 대기 기간과 무관하게 즉시 전배할 수 있다.`
      : (picked.offerPitch || `그대의 능력과 이력이 상부에 닿아 [${nextTitle}] 직책이 공식 제안되었다.`);
    const eventText = `${pitch}\n\n[제안 직책: ${nextTitle} · ${picked.faction} · Tier ${picked.tier}] ${picked.desc} (${bonusSummary})`;

    const choices = [];
    if (picked.trialCheck) {
      const tc = picked.trialCheck;
      const statMeta = STAT_META[tc.stat] || { name: tc.stat };
      const checkObj = { stat: tc.stat, diff: tc.diff || 0 };
      if (tc.geneseedTrial || picked.tree === "astartes" || picked.tree === "grey_knights") {
        checkObj.geneseedTrial = true;
      }
      choices.push({
        label: `[시련 도전 · ${statMeta.name} 판정] ${tc.title}에 응해 ${nextTitle} 직위에 도전한다`,
        check: checkObj,
        success: {
          acceptCareerOffer: picked.id,
          text: `[${tc.title}] 시련을 돌파하고 마침내 [${nextTitle}] 직위에 취임했다!`
        },
        fail: {
          trialFailFor: picked.id,
          wounds: -28,
          text: `[${tc.title}] 시련에서 탈락해 깊은 상처를 입었으나, 간신히 목숨을 건져 [${curTitle}] 직위로 복귀했다.`
        }
      });
    } else {
      choices.push({
        label: isScoutOffer
          ? `[초빙 수락 · 전배] 영장을 수락하고 ${nextTitle} 직위에 취임한다`
          : `[승급 · 수임] 제안을 수락하고 ${nextTitle} 직위에 취임한다`,
        effect: {
          acceptCareerOffer: picked.id,
          text: `[${curTitle}]의 이력을 뒤로하고 새로운 직책 [${nextTitle}] 자리에 당당히 취임했다!`
        }
      });
    }

    choices.push({
      label: `제안을 정중히 사양하고 현재 [${curTitle}] 직책을 유지한다 (8년간 재제안 보류)`,
      effect: {
        declineCareerOffer: picked.id,
        text: `[${nextTitle}] 발탁 제안을 고사하고 지금의 [${curTitle}] 자리를 지키기로 결단했다.`,
        stats: { WP: 1 }
      }
    });

    return {
      id: `dyn_career_offer_${picked.id}_${state.year}`,
      isTimeline: false,
      isCareerOffer: true,
      isScoutOffer,
      offeredCareerId: picked.id,
      category,
      reqLabel: `${picked.treeName || picked.faction} · Tier ${picked.tier}${picked.trialCheck ? " · 시련 판정" : (isScoutOffer ? " · 타 기관 초빙" : "")}`,
      title: picked.offerTitle || (isScoutOffer ? `타 기관 특별 초빙 — ${nextTitle}` : `진로 발탁 제안 — ${nextTitle}`),
      text: eventText,
      choices,
      source: picked.source || "Imperium Hierarchy"
    };
  }


  function attemptCareerChange(state, careerId) {
    if (!state.alive || state.pendingEvent) return { ok: false, msg: "현재 진행 중인 사건을 먼저 해결해야 한다." };
    const career = getCareer(careerId);
    const curCareer = getCareer(state.careerId);
    if (!career || !career.selectable) return { ok: false, msg: "선택할 수 없는 병종이다." };
    if (career.entryMode === "event") {
      return { ok: false, msg: "해당 상위·특임 직책은 조건 달성 시 임명·발탁 이벤트를 통해 수임할 수 있다." };
    }
    if (state.careerId === career.id) return { ok: false, msg: "이미 해당 직군에 복무 중이다." };
    if (Array.isArray(state.careerHistory) && state.careerHistory.includes(career.id)) {
      return { ok: false, msg: "이미 역임한 직군으로 다시 돌아갈 수 없다." };
    }
    if (isCareerTransitionBlocked(state, career, curCareer)) {
      return { ok: false, msg: "현재 소속 기관의 비밀 서약·초인 위상 또는 성향 제약으로 해당 직군에 지원할 수 없다." };
    }
    if (!isManualCareerAllowed(state, career, curCareer)) {
      return {
        ok: false,
        msg: "정규 서약 기관 복무 중에는 타 기관으로 직접 이직할 수 없다. 같은 기관 승급 또는 타 기관의 초빙·차출 사건을 기다리라."
      };
    }

    const lastChange = Number.isFinite(state.lastCareerChangeYear) ? state.lastCareerChangeYear : -999;
    if (!career.isTranshuman && career.tree !== "chaos" && state.year - lastChange < 2) {
      const left = 2 - (state.year - lastChange);
      return {
        ok: false,
        cooldown: true,
        msg: `최소 복무 기간(2년)이 지나야 다른 전직을 신청할 수 있다 (${left}년 남음).`
      };
    }

    const retryMap = state.careerRetryAfter || {};
    if (Number.isFinite(retryMap[career.id]) && state.year < retryMap[career.id]) {
      const left = retryMap[career.id] - state.year;
      return {
        ok: false,
        cooldown: true,
        msg: `[${career.name}] 재지원 대기 중이다 (${left}년 후 재도전 가능).`
      };
    }

    if (!checkReq(state, career.req)) return { ok: false, msg: `요구 조건 미달: ${describeReq(career.req)}` };

    // 선발 시련(Trial)이 있는 특수 병종
    if (career.trialCheck) {
      const roll = rollD100(state, career.trialCheck);
      state.lastRoll = roll;
      if (!roll.success) {
        const died = Math.random() < (career.trialCheck.failDeathChance || 0.25);
        if (died) {
          const cause = career.trialCheck.failDeathCause || `${career.trialCheck.title} 도중 치명적 거부 반응으로 순직`;
          addLog(state, `[${career.trialCheck.title}] 시련 실패! 가혹한 의식을 견디지 못하고 쓰러졌다.`, "death", roll);
          finalizeDeath(state, cause);
          return { ok: false, dead: true, roll, msg: `${career.trialCheck.title}에서 실패하여 사망했다.` };
        }
        state.wounds = clamp(state.wounds - 28, 5, state.maxWounds);
        state.careerRetryAfter = state.careerRetryAfter || {};
        state.careerRetryAfter[career.id] = state.year + 2;
        addLog(state, `[${career.trialCheck.title}] 시련에서 탈락해 큰 부상을 입었으나 목숨은 건졌다.`, "danger", roll);
        return { ok: false, roll, msg: `시련 탈락! (주사위 ${roll.roll} / 목표 ${roll.target}) 부상을 입었고 2년 후 재도전할 수 있다.` };
      }
      addLog(state, `[${career.trialCheck.title}] 극악의 시련을 돌파했다!`, "success", roll);
    } else {
      // 비구속 초년·민간에서 정규 서약 기관 첫 입단 시 비치명적 d100 입단 심사 적용
      const admission = getAdmissionPreview(state, career);
      if (admission) {
        const roll = randInt(1, 100);
        const success = roll <= admission.target;
        const rollMeta = {
          statKey: admission.statKey,
          statName: `${admission.statName} 입단 심사`,
          target: admission.target,
          roll,
          success,
          critSuccess: roll <= 5,
          critFail: roll >= 96,
          diff: 0
        };
        state.lastRoll = rollMeta;
        if (!success) {
          state.careerRetryAfter = state.careerRetryAfter || {};
          state.careerRetryAfter[career.id] = state.year + 2;
          addLog(
            state,
            `[${career.name}] 입단 심사에서 탈락했다. 역량을 더 다진 뒤 2년 후에 재지원할 수 있다.`,
            "danger",
            rollMeta,
            { badge: "입단 심사 탈락" }
          );
          return {
            ok: false,
            denied: true,
            roll: rollMeta,
            msg: `[${career.name}] 입단 심사 탈락 (주사위 ${roll} / 목표 ${admission.target}). 2년 후 재지원할 수 있다.`
          };
        }
        addLog(
          state,
          `[${career.name}] 입단 심사를 우수한 성적으로 통과했다!`,
          "success",
          rollMeta,
          { badge: "입단 심사 합격" }
        );
      }
    }

    const grantNobleCommission = isParachuteNobleOfficer(state, career.id);
    state.careerId = career.id;
    if (!UNBOUND_CAREERS.has(career.id)) {
      state.lastCareerChangeYear = state.year;
    }
    if (!state.careerHistory.includes(career.id)) state.careerHistory.push(career.id);
    if (career.useChapterName && !state.chapterName) {
      const hw = getWorld(state.homeWorldId);
      state.chapterName = hw.astartesChapter || "울트라마린 후계 챕터";
    }

    if (career.onJoin) {
      const joinOutcome = Object.assign(
        {
          text: grantNobleCommission
            ? `병졸 복무를 거치지 않고 가문의 후광으로 [${getCareerDisplayTitle(state, career)}] 자리에 직통 임관했다!`
            : `새로운 직책 [${getCareerDisplayTitle(state, career)}] 자리에 취임했다!`
        },
        career.onJoin
      );
      if (grantNobleCommission) {
        joinOutcome.addTags = Array.from(new Set([...(career.onJoin.addTags || []), "noble_commission"]));
      }
      applyOutcome(state, joinOutcome, null, "join");
    } else {
      if (grantNobleCommission && !state.tags.includes("noble_commission")) {
        state.tags.push("noble_commission");
      }
      addLog(state, `새로운 직책 [${getCareerDisplayTitle(state, career)}] 자리에 취임했다!`, "career");
    }

    if (career.id === "astartes_scout" && !state.chapterId && state.alive && !state.pendingEvent) {
      const chapEv = createChapterSelectionEvent(state);
      if (chapEv) state.pendingEvent = chapEv;
    } else if (career.id === "assassin_initiate" && !hasAssassinClade(state) && state.alive && !state.pendingEvent) {
      const cladeEv = createAssassinCladeEvent(state);
      if (cladeEv) state.pendingEvent = cladeEv;
    }

    return { ok: true, career, openedEvent: state.pendingEvent || null };
  }

  function createComingOfAgeEvent(state) {
    if (!state) return null;
    const tags = Array.isArray(state.tags) ? state.tags : [];
    const hasRtBlood = tags.includes("rogue_trader_blood");
    const isTerraHigh = tags.includes("terra_elite");
    const isVoid = state.worldId === "voidborn";

    const sceneIntro = isVoid
      ? hasRtBlood
        ? "가문 기함의 원로 회랑에서 성년 서약식이 열렸다. 선단의 회계장부와 무역 영장 사본, 그리고 제국 함대 추천서가 눈앞에 놓였다."
        : "가문 주력선의 원로 회랑에서 성년 서약식이 열렸다. 성간 차터 상단 문서와 제국 함대 사관 추천서가 눈앞에 놓였다."
      : isTerraHigh
      ? "황궁 외곽 고위 귀족 저택의 대리석 홀에서 성년 선포식이 열렸다. 테라 상류 가문의 문장을 단 추천서들이 은쟁반 위에 줄지어 놓였다."
      : "가문의 상층 응접실에서 성년 수습의 마침표를 찍는 가문 평의회가 열렸다. 가주와 원로들이 그대의 앞길을 가를 임명장과 추천서를 내밀었다.";

    const choices = [];
    if (hasRtBlood) {
      choices.push({
        label: "[가문 승계] 로그 트레이더 기함 수석 참모 '세네샬' 직책으로 취임한다",
        req: { allTags: ["rogue_trader_blood"], excludeTags: ["heretic", "abhuman"] },
        effect: {
          acceptCareerOffer: "rt_seneschal",
          text: "가문의 무역 영장을 보좌하는 기함 수석 참모 '세네샬'로 정식 취임했다. 변경 성계의 부와 음모가 눈앞에 펼쳐진다."
        }
      });
    }

    choices.push(
      {
        label: "[가문 행정] 가문 추천장을 받아 아드미니스트라툼 서기관으로 임관한다",
        req: { excludeTags: ["heretic", "abhuman"] },
        effect: {
          acceptCareerOffer: "administratum",
          text: "가문의 인맥과 보증을 등에 업고 제국 아드미니스트라툼 정규 서기관으로 임관했다. 거대한 관료제의 사다리에 첫발을 올렸다."
        }
      },
      {
        label: "[낙하산 임관] 사병 복무 없이 아스트라 밀리타룸 위관 장교로 직통 임관한다",
        req: { excludeTags: ["heretic", "abhuman"] },
        effect: {
          acceptCareerOffer: "militarum_officer",
          addTags: ["noble_commission"],
          text: "병졸 계급을 거치지 않고 가문의 후광으로 연대 위관 장교에 직통 임관했다. 전선 고참병들의 싸늘한 시선 속에서 지휘권을 증명해야 한다."
        }
      },
      {
        label: "[함대 임관] 제국 해군 사관 추천서를 받아 임페리얼 네이비에 입대한다",
        req: { excludeTags: ["heretic", "abhuman"] },
        effect: {
          acceptCareerOffer: "imperial_navy",
          text: "제국 해군 사관 추천서를 받아 순양함 함교의 초급 사관으로 편입되었다. 성간 함대의 엄혹한 규율이 그대를 맞이한다."
        }
      },
      {
        label: "[이단 도피] 이미 찍힌 이단 낙인을 감추고 지하 카오스 밀교단으로 스며든다",
        req: { allTags: ["heretic"] },
        effect: {
          acceptCareerOffer: "chaos_cultist",
          text: "정규 제국 기관의 문이 닫히자, 가문의 어두운 밀실 통로를 빠져나와 카오스 밀교단의 그림자 속으로 몸을 숨겼다."
        }
      },
      {
        label: "[가문 의절] 가문의 특권과 작위를 포기하고 밑바닥에서 자립한다 (하위 직군 해금 · 권위 -15)",
        effect: {
          forceCareer: "menial_worker",
          addTags: ["disowned_noble"],
          removeTags: ["noble", "wealthy", "terra_elite", "rogue_trader_blood"],
          stats: { Inf: -15, WP: 4 },
          align: { humane: 2 },
          text: "가문의 인장을 바닥에 내려놓고 의절을 선언했다. 재산과 특권은 몰수당했으나, 이제 누구의 꼭두각시도 아닌 몸으로 노동자·갱단·방위군·가드 사병까지 스스로 길을 고를 수 있다."
        }
      }
    );

    return {
      id: `dyn_coming_of_age_noble_${state.year}`,
      isTimeline: false,
      isComingOfAge: true,
      category: "성년 진로 결단",
      reqLabel: "18세 귀족 가문 수습 종료",
      title: "성년의 기로 — 가문의 유산과 스스로 택할 운명",
      text: `${sceneIntro} 만 18세 성년에 이른 지금, 가문이 마련해 둔 엘리트 임관 경로를 따를지, 아니면 특권을 모두 벗어 던지고 밑바닥에서 제 힘으로 살아갈지 결단할 때다.`,
      choices,
      source: "Dark Heresy 2e: Highborn / Rogue Trader Core Rulebook"
    };
  }


  return {
    UNBOUND_CAREERS,
    CLOSED_VOW_TREES,
    NOBLE_HIDDEN_LOW_CAREERS,
    isUnboundCareer,
    isParachuteNobleOfficer,
    isDirectSuccessorReq,
    isClosedVowCrossBlocked,
    isCareerTransitionBlocked,
    isManualCareerAllowed,
    getPrimaryAdmissionStat,
    getAdmissionPreview,
    createChapterSelectionEvent,
    hasAssassinClade,
    createAssassinCladeEvent,
    createComingOfAgeEvent,
    applyCareerJoinEffects,
    createDynamicCareerOfferEvent,
    attemptCareerChange
  };
}
