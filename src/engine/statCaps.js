// 종족 · 계급 · 전공 · 모성 · 선천 재능 · 후천 특성 이중 스탯 상한 및 특전 SSOT (Stage 21 · Stage 23.5)
import { STAT_META, clamp, computeBodyClass } from "./formatters.js";
import { isIncorruptibleTags } from "./careerRules.js";

export const PHYSICAL_STATS = new Set(["WS", "BS", "T", "Ag"]);
export const MENTAL_STATS = new Set(["Int", "WP", "Fel", "Inf"]);

// 4대 규격 외 특이점 태그 효과 (출생 자질과 중복 적용 방지를 위해 별도 맵으로 관리)
export const ANOMALY_TAG_EFFECTS = {
  alpha_plus_psyker: {
    key: "alpha_plus_psyker",
    name: "알파 플러스 사이커",
    summary: "의지 상한 +20 · 지성 상한 +8",
    capMods: { WP: 20, Int: 8 }
  },
  freak_physique: {
    key: "freak_physique",
    name: "규격 외 피지컬",
    summary: "백병·강인 상한 +14 · 민첩 상한 +12 · 사격 상한 +8",
    capMods: { WS: 14, BS: 8, T: 14, Ag: 12 }
  },
  savant_genius: {
    key: "savant_genius",
    name: "전략·지성 사반트",
    summary: "지성·교섭 상한 +16 · 권위 상한 +10",
    capMods: { Int: 16, Fel: 16, Inf: 10 }
  },
  omega_pariah: {
    key: "omega_pariah",
    name: "절대 무혼(오메가-마이너스)",
    summary: "의지 상한 +18 · 교섭 상한 -20 · 워프 오염 85% 감쇠",
    capMods: { WP: 18, Fel: -20 }
  }
};

export function getAwakenedAnomalies(state) {
  const tags = (state && Array.isArray(state.tags)) ? state.tags : [];
  const birthTraitId = (state && state.traitId) || "none";
  const res = [];
  for (const [key, eff] of Object.entries(ANOMALY_TAG_EFFECTS)) {
    if (tags.includes(key) && birthTraitId !== key) {
      res.push(eff);
    }
  }
  return res;
}

// 12대 후천 특성 (긍정 6 · 부정 6) — 치유/극복/상실(removeTags)과 실시간 연동
export const ACQUIRED_TRAIT_EFFECTS = {
  iron_nerves: {
    key: "iron_nerves",
    name: "강철의 신경",
    kind: "positive",
    summary: "의지 상한 +4 · 공포/의지 판정 +5",
    capMods: { WP: 4 },
    checkMods: { WP: 5 }
  },
  blade_master: {
    key: "blade_master",
    name: "검성의 경지",
    kind: "positive",
    summary: "백병 상한 +5 · 백병 판정 +5",
    capMods: { WS: 5 },
    checkMods: { WS: 5 }
  },
  deadeye_marksman: {
    key: "deadeye_marksman",
    name: "백발백중 명사수",
    kind: "positive",
    summary: "사격 상한 +5 · 사격 판정 +5",
    capMods: { BS: 5 },
    checkMods: { BS: 5 }
  },
  silver_tongue: {
    key: "silver_tongue",
    name: "은빛 혀",
    kind: "positive",
    summary: "교섭 상한 +5 · 권위 상한 +4 · 교섭 판정 +5",
    capMods: { Fel: 5, Inf: 4 },
    checkMods: { Fel: 5 }
  },
  tactician_eye: {
    key: "tactician_eye",
    name: "백전노장의 전술안",
    kind: "positive",
    summary: "지성 상한 +5 · 지성 판정 +5",
    capMods: { Int: 5 },
    checkMods: { Int: 5 }
  },
  battle_hardened: {
    key: "battle_hardened",
    name: "백전의 생존자",
    kind: "positive",
    summary: "강인 상한 +5 · 환경 위험 25% 경감",
    capMods: { T: 5 },
    hazardMult: 0.75
  },
  crippled_limb: {
    key: "crippled_limb",
    name: "불구",
    kind: "negative",
    summary: "민첩 상한 -8 · 백병 상한 -5 (기계교 의체로 치유 가능)",
    capMods: { Ag: -8, WS: -5 }
  },
  shell_shocked: {
    key: "shell_shocked",
    name: "포탄 충격",
    kind: "negative",
    summary: "의지 상한 -8 · 공포/의지 판정 -6 (성당 정화 고행으로 극복 가능)",
    capMods: { WP: -8 },
    checkMods: { WP: -6 }
  },
  warp_scarred: {
    key: "warp_scarred",
    name: "워프 흉터",
    kind: "negative",
    summary: "교섭 상한 -6 · 연간 오염 +1 (성당 정화 고행으로 정화 가능)",
    capMods: { Fel: -6 },
    corrDelta: 1
  },
  chronic_toxins: {
    key: "chronic_toxins",
    name: "만성 독소",
    kind: "negative",
    summary: "강인 상한 -7 · 연간 회복 -1 (의체/리주버냇으로 치유 가능)",
    capMods: { T: -7 },
    healMod: -1
  },
  notorious_ruthless: {
    key: "notorious_ruthless",
    name: "악명 높은 냉혈한",
    kind: "negative",
    summary: "교섭 상한 -6 · 권위 상한 +4",
    capMods: { Fel: -6, Inf: 4 }
  },
  imperial_debt: {
    key: "imperial_debt",
    name: "거액의 채무",
    kind: "negative",
    summary: "권위 상한 -8 · 권위 판정 -5",
    capMods: { Inf: -8 },
    checkMods: { Inf: -5 }
  }
};

export const ACQUIRED_TRAIT_KEYS = Object.keys(ACQUIRED_TRAIT_EFFECTS);

export function getAcquiredTraits(state) {
  const tags = (state && Array.isArray(state.tags)) ? state.tags : [];
  const res = [];
  for (let i = 0; i < tags.length; i++) {
    const eff = ACQUIRED_TRAIT_EFFECTS[tags[i]];
    if (eff) res.push(eff);
  }
  return res;
}

export function getSpecialtyStatSet(career) {
  const set = new Set();
  if (!career) return set;
  if (career.annualGrowth) {
    for (const [k, v] of Object.entries(career.annualGrowth)) {
      if (v > 0) set.add(k);
    }
  }
  if (career.req && career.req.stats) {
    for (const [k, v] of Object.entries(career.req.stats)) {
      if (v > 0) set.add(k);
    }
  }
  return set;
}

function isChildApprentice(state, tags) {
  if (!state || state.careerId !== "child") return false;
  return (
    state.age >= 14 &&
    (tags.includes("noble") || tags.includes("schola") || tags.includes("terra_elite") || tags.includes("knight_blood"))
  );
}

function getBasePhysicalCap(state, career, tags) {
  const cid = (career && career.id) || (state && state.careerId) || "child";
  const tree = (career && career.tree) || "civil";
  const tier = (career && career.tier) || 1;
  const bodyClass = computeBodyClass(state, career);

  if (cid === "child") {
    return isChildApprentice(state, tags) ? 54 : 44;
  }
  if (cid === "daemon_prince" || tags.includes("daemon_prince") || bodyClass === "daemonic") {
    return 100;
  }
  if (cid === "living_saint" || tags.includes("living_saint")) {
    return 92;
  }
  if (tree === "custodes" || tags.includes("custodes")) {
    if (cid === "custodes_captain_general") return 100;
    if (cid === "custodes_warden" || cid === "custodes_shield_captain") return 95;
    return 90;
  }
  if (tree === "grey_knights" || tags.includes("grey_knight")) {
    if (cid === "gk_supreme_grand_master") return 94;
    if (cid === "gk_paladin" || cid === "gk_grand_master") return 90;
    return 84;
  }
  if (
    tree === "astartes" ||
    tags.includes("astartes") ||
    cid === "renegade_marine" ||
    cid === "chaos_lord" ||
    tags.includes("renegade_marine") ||
    tags.includes("chaos_lord")
  ) {
    let base = 82;
    if (cid === "chapter_master" || bodyClass === "dreadnought" || tags.includes("dreadnought")) base = 92;
    else if (cid === "astartes_veteran" || cid === "astartes_captain" || cid === "chaos_lord" || tags.includes("chaos_lord")) base = 88;
    else if (cid === "astartes_scout") base = 74;
    if (tags.includes("primaris")) base = Math.min(94, base + 2);
    return base;
  }
  if (tree === "officio_assassinorum" || tags.includes("assassin")) {
    if (cid === "grand_master_of_assassins") return 82;
    if (cid === "assassin_operative") return 78;
    return 66;
  }
  if (cid === "saint_vessel" || tags.includes("saint_vessel")) {
    return 74;
  }
  if (cid === "chaos_cultist") return 58;
  if (cid === "chaos_champion") return 66;

  // 일반 필멸자
  if (tier >= 6) return 70;
  if (tier >= 4) return 66;
  if (tier === 3) return 62;
  return 55;
}

function getBaseMentalCap(state, career, statKey, tags) {
  const cid = (career && career.id) || (state && state.careerId) || "child";
  const tree = (career && career.tree) || "civil";
  const tier = (career && career.tier) || 1;
  const specSet = getSpecialtyStatSet(career);
  const isSpec = specSet.has(statKey);

  if (cid === "child") {
    if (isChildApprentice(state, tags)) return 56;
    return isSpec ? 46 : 42;
  }
  if (cid === "daemon_prince" || tags.includes("daemon_prince")) {
    return 100;
  }
  if (tree === "grey_knights" && statKey === "WP") {
    if (cid === "gk_supreme_grand_master") return 98;
    if (cid === "gk_paladin" || cid === "gk_grand_master") return 94;
    return 86;
  }

  let cap;
  if (tier >= 6) cap = isSpec ? 100 : 80;
  else if (tier === 5) cap = isSpec ? 92 : 74;
  else if (tier === 4) {
    if (isSpec && (cid === "militarum_general" || cid === "primaris_psyker" || cid === "assassin_operative")) {
      cap = 88;
    } else {
      cap = isSpec ? 82 : 66;
    }
  } else if (tier === 3) {
    cap = isSpec ? 72 : 58;
  } else {
    cap = isSpec ? 60 : 50;
  }

  // T5 특화 예외 (기계교 Int, 성녀 그릇 WP)
  if (tier === 5) {
    if (tree === "mechanicus" && statKey === "Int") cap = Math.max(cap, 94);
    if (cid === "saint_vessel" && statKey === "WP") cap = Math.max(cap, 94);
  }
  return cap;
}

export function getStatCap(state, statKey, deps) {
  if (!state || !STAT_META[statKey]) return 100;
  const getWorld = deps && deps.getWorld;
  const getCareer = deps && deps.getCareer;
  const getTrait = deps && deps.getTrait;

  const career = getCareer ? getCareer(state.careerId) : null;
  const homeWorld = getWorld ? getWorld(state.homeWorldId || state.worldId) : null;
  const trait = getTrait ? getTrait(state.traitId || "none") : null;
  const tags = Array.isArray(state.tags) ? state.tags : [];
  const cid = (career && career.id) || state.careerId || "child";
  const tree = (career && career.tree) || "civil";
  const tier = (career && career.tier) || 1;
  const isPhysical = PHYSICAL_STATS.has(statKey);

  let baseCap = isPhysical
    ? getBasePhysicalCap(state, career, tags)
    : getBaseMentalCap(state, career, statKey, tags);

  // 특이 직군/장비/의체 보정
  if (cid === "assassin_operative" && (statKey === "Ag" || statKey === "WS")) {
    baseCap = Math.max(baseCap, 80);
  }
  const hasBionic = tags.includes("bionic") || tree === "mechanicus" || (state.augmeticsCount || 0) > 0;
  if (hasBionic && (statKey === "T" || statKey === "BS") && cid !== "child") {
    if (baseCap < 85) baseCap += 5;
  }
  const hasPowerArmor =
    tags.includes("power_armor") ||
    (tree === "sororitas" && tier >= 4) ||
    (tree === "imperial_knight" && tier >= 4);
  if (hasPowerArmor && (statKey === "WS" || statKey === "BS") && cid !== "child") {
    if (baseCap < 85) baseCap += 2;
  }

  // 모성 평생 특전 capMods
  const worldMod = (homeWorld && homeWorld.capMods && homeWorld.capMods[statKey]) || 0;
  // 선천 재능 capMods
  const traitMod = (trait && trait.capMods && trait.capMods[statKey]) || 0;
  // 후천 각성 특이점 태그 capMods (출생 자질과 동일 ID면 중복 가산 금지)
  let anomalyTagMod = 0;
  for (const [aKey, aEff] of Object.entries(ANOMALY_TAG_EFFECTS)) {
    if (tags.includes(aKey) && (!trait || trait.id !== aKey)) {
      anomalyTagMod += (aEff.capMods && aEff.capMods[statKey]) || 0;
    }
  }
  // 12종 후천 특성 capMods
  let acquiredMod = 0;
  for (let i = 0; i < tags.length; i++) {
    const eff = ACQUIRED_TRAIT_EFFECTS[tags[i]];
    if (eff && eff.capMods && eff.capMods[statKey]) {
      acquiredMod += eff.capMods[statKey];
    }
  }

  let total = baseCap + worldMod + traitMod + anomalyTagMod + acquiredMod;

  // 종족별 중첩 상한 안전선: 일반 필멸자(초인/암살청/성녀그릇 제외)는 모성+재능+후천 중첩 시에도 초인 영역 침범 차단
  const isSuperOrSpecialBody =
    cid === "daemon_prince" ||
    cid === "living_saint" ||
    cid === "saint_vessel" ||
    Boolean(career && career.isTranshuman) ||
    tree === "custodes" ||
    tree === "grey_knights" ||
    tree === "astartes" ||
    tree === "officio_assassinorum" ||
    tags.includes("astartes") ||
    tags.includes("custodes") ||
    tags.includes("grey_knight") ||
    tags.includes("living_saint") ||
    tags.includes("daemon_prince") ||
    tags.includes("renegade_marine") ||
    tags.includes("chaos_lord") ||
    tags.includes("assassin");

  if (isPhysical && !isSuperOrSpecialBody && cid !== "child") {
    const hasFreak = tags.includes("freak_physique") || (trait && trait.id === "freak_physique");
    const mortalCeiling = hasFreak ? 86 : 76;
    if (total > mortalCeiling) total = mortalCeiling;
  }

  return clamp(Math.round(total), 20, 100);
}

export function getAllStatCaps(state, deps) {
  const caps = {};
  for (const key of Object.keys(STAT_META)) {
    caps[key] = getStatCap(state, key, deps);
  }
  return caps;
}

export function scalePositiveCorruption(state, rawCorr) {
  if (!Number.isFinite(rawCorr) || rawCorr <= 0) return rawCorr || 0;
  const tags = (state && Array.isArray(state.tags)) ? state.tags : [];
  if (isIncorruptibleTags(tags)) return 0;
  const homeWorldId = (state && (state.homeWorldId || state.worldId)) || "";
  let val = rawCorr;
  if (tags.includes("omega_pariah")) val = Math.floor(val * 0.15);
  else if (tags.includes("blank")) val = Math.floor(val * 0.5);
  if (val > 0 && homeWorldId === "ophelia7") val = Math.floor(val * 0.85);
  return Math.max(0, val);
}

export function scaleWoundDamage(state, rawDelta) {
  if (!Number.isFinite(rawDelta) || rawDelta >= 0) return rawDelta || 0;
  const tags = (state && Array.isArray(state.tags)) ? state.tags : [];
  if (tags.includes("ogryn") || (state && state.traitId === "abhuman_ogryn")) {
    return Math.min(-1, Math.round(rawDelta * 0.8));
  }
  return rawDelta;
}

export function isTraitImmune(state, traitTag, getCareer = null) {
  if (!state || !traitTag) return false;
  const tags = Array.isArray(state.tags) ? state.tags : [];
  const homeWorldId = state.homeWorldId || state.worldId;
  if (traitTag === "shell_shocked") {
    const career = getCareer ? getCareer(state.careerId) : null;
    return (
      homeWorldId === "krieg" ||
      Boolean(career && career.isTranshuman) ||
      tags.includes("astartes") ||
      tags.includes("custodes") ||
      tags.includes("grey_knight") ||
      tags.includes("dreadnought") ||
      tags.includes("living_saint") ||
      tags.includes("daemon_prince")
    );
  }
  if (traitTag === "warp_scarred") {
    return (
      isIncorruptibleTags(tags) ||
      tags.includes("blank") ||
      tags.includes("omega_pariah")
    );
  }
  return false;
}
