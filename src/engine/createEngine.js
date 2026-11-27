import {
  ALIGNMENT_KEYS,
  ALIGNMENT_META,
  BODY_CLASS_KEYS,
  BODY_CLASS_LABELS,
  FACTION_ENDING_KEYS,
  FOCUSES,
  LIFE_REALM_KEYS,
  LIFE_REALM_LABELS,
  QUARTER_LABELS,
  SAVE_VERSION,
  SOCIAL_TIER_LABELS,
  SOCIAL_TIER_ORDER,
  STAT_META,
  clamp,
  computeBodyClass,
  createCoreFormatters,
  formatImperialDate,
  formatImperialYear,
  getAlignmentInfo,
  getWorldShortTag,
  normalizeAlignment,
  resolveFactionEndingKey
} from "./formatters.js";
import { createReqEvaluatorModule } from "./reqEvaluator.js";
import { createEndingsModule } from "./endings.js";
import { createTravelModule } from "./travel.js";
import {
  UNBOUND_CAREERS,
  isUnboundCareer,
  isIncorruptibleTags,
  isDirectSuccessorReq,
  isClosedVowCrossBlocked,
  createCareerRulesModule
} from "./careerRules.js";
import { createCareerActionsModule } from "./careerActions.js";
import {
  ACQUIRED_TRAIT_EFFECTS,
  ANOMALY_TAG_EFFECTS,
  getAcquiredTraits,
  getAwakenedAnomalies,
  getSpecialtyStatSet,
  getStatCap,
  getAllStatCaps,
  scalePositiveCorruption,
  scaleWoundDamage,
  isTraitImmune as isTraitImmunePure
} from "./statCaps.js";
import { createDynamicCentenarianEvent } from "./centenarianOps.js";

export function createImperiumEngine(DATA) {
  function warnUnknownId(kind, id) {
    if (typeof console !== "undefined" && typeof console.warn === "function") {
      console.warn(`[Imperialis Vita] Unknown ${kind} ID "${id}" — falling back to default.`);
    }
  }

  function applyAlignDelta(state, deltaObj) {
    if (!state || !deltaObj || typeof deltaObj !== "object") return;
    const cur = normalizeAlignment(state);
    for (let i = 0; i < ALIGNMENT_KEYS.length; i++) {
      const k = ALIGNMENT_KEYS[i];
      const d = deltaObj[k];
      if (d) cur[k] = clamp(Math.round(cur[k] + d), 0, 100);
    }
    state.alignment = cur;
  }

  const ERA_PRESETS = [
    { id: "random", name: "무작위 격동기 (M41 말)", minYear: 930, maxYear: 994, desc: "아마겟돈 전쟁, 카디아 붕괴, 대균열, 인도미투스 성전을 관통하는 핵심 시대." },
    { id: "gothic_war", name: "고딕 전쟁기 (120.M41 · 제12차 블랙 크루세이드)", minYear: 118, maxYear: 123, desc: "139~151.M41 레이븐스버그 제독과 약탈자 아바돈이 블랙스톤 요새를 두고 격돌하는 제국 해군 대혈전의 시대." },
    { id: "eisenhorn", name: "아이젠혼 시대 (225.M41 · 스카루스)", minYear: 222, maxYear: 228, desc: "240.M41~500.M41 오르도 제노스 이단심문관 그레고르 아이젠혼이 활약하던 M41 초중반 시대." },
    { id: "first_armageddon", name: "제1차 아마겟돈과 수치의 달들 (424.M41)", minYear: 422, maxYear: 427, desc: "444.M41 앙그론의 침공과 스페이스 울프 대 이단심문소의 비극적 대립 '수치의 달들'을 정면으로 겪는 시대." },
    { id: "sabbat", name: "사바트 성전기 (746.M41)", minYear: 745, maxYear: 749, desc: "755.M41 사바트 월드 성전 선포와 765.M41 타니스 멸망(이브람 건트)을 겪는 시대." },
    { id: "badab", name: "바답 전쟁기 (882.M41)", minYear: 880, maxYear: 885, desc: "901~912.M41 마엘스트롬 반역과 스페이스 마린 내전을 목격하는 시대." },
    { id: "armageddon", name: "제2·3차 아마겟돈 격동기 (915.M41)", minYear: 913, maxYear: 917, desc: "931.M41 케인의 발할라 제597연대와 941.M41 야릭·단테의 제2차 아마겟돈 전쟁을 맞는 시대." },
    { id: "cadia_rift", name: "카디아 붕괴와 대균열 직전 (980.M41)", minYear: 979, maxYear: 981, desc: "19세 무렵 999.M41 카디아 최후, 바알의 파괴, 사자의 문과 인도미투스 성전을 정면 돌파하는 시대." },
    { id: "indomitus", name: "인도미투스 성전 시대 (998.M41)", minYear: 996, maxYear: 1002, desc: "대균열 이후 프라이머리스, 옥타리우스, 역병 전쟁, 비질루스, 파리아 넥서스, 라이온 귀환, 4차 타이라니드 전쟁의 시대." }
  ];

  const coreFmt = createCoreFormatters(DATA);
  const {
    TAG_LABELS,
    WORLD_TAG_LABELS,
    WORLD_BY_ID,
    ORIGIN_BY_ID,
    TRAIT_BY_ID,
    CAREER_BY_ID,
    CHAR_BY_ID,
    CHAPTER_BY_ID,
    getWorld,
    getOrigin,
    getTrait,
    getCareer,
    getCharacter,
    getChapter,
    getCareerShortName,
    describeReq
  } = coreFmt;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickWeighted(items, weightKey = "weight") {
    const total = items.reduce((sum, item) => sum + (item[weightKey] ?? 1), 0);
    let r = Math.random() * total;
    for (const item of items) {
      r -= (item[weightKey] ?? 1);
      if (r <= 0) return item;
    }
    return items[items.length - 1];
  }

  const reqEvalMod = createReqEvaluatorModule({ DATA, getWorld, getCareer });
  const {
    EVENT_BY_ID,
    getEventBuckets,
    getChronicleBuckets,
    getStratification,
    makeReqContext,
    checkReq
  } = reqEvalMod;

  function getLivingSaintAspect(state) {
    const tags = (state && state.tags) || [];
    if (tags.includes("saint_mercy_aspect") && !tags.includes("saint_wrath_aspect")) return "mercy";
    if (tags.includes("saint_wrath_aspect") && !tags.includes("saint_mercy_aspect")) return "wrath";
    const dom = getAlignmentInfo(state).dominant;
    if (dom === "humane") return "mercy";
    if (dom === "dogmatic") return "wrath";
    return "neutral";
  }

  function getCareerDisplayTitle(state, careerObj) {
    const c = careerObj || getCareer(state.careerId);
    const w = getWorld(state.homeWorldId);
    const tags = (state && state.tags) || [];
    if (c.id === "knight_high_king") {
      return state.gender === "female" ? "하이 퀸 (기사 행성 대군주)" : "하이 킹 (기사 행성 대군주)";
    }
    if (c.id === "assassin_operative") {
      if (tags.includes("clade_vindicare")) return "빈디카레 어쌔신 (오피시오 아사시노룸)";
      if (tags.includes("clade_callidus")) return "칼리두스 어쌔신 (오피시오 아사시노룸)";
      if (tags.includes("clade_eversor")) return "에버서 어쌔신 (오피시오 아사시노룸)";
      if (tags.includes("clade_culexus")) return "쿨렉수스 어쌔신 (오피시오 아사시노룸)";
    }
    if (c.id === "living_saint") {
      const baseTitle = state.gender === "female" ? "살아 있는 성녀" : "살아 있는 성인";
      const aspect = getLivingSaintAspect(state);
      if (aspect === "mercy") return `${baseTitle} — 자비의 성광`;
      if (aspect === "wrath") return `${baseTitle} — 심판의 성광`;
      return `${baseTitle} (임페리얼 리빙 세인트)`;
    }
    if (c.useRegimentName && w.guardRegiment) {
      return c.titleSuffix ? `${w.guardRegiment} ${c.titleSuffix}` : `${w.guardRegiment}`;
    }
    if (c.useChapterName) {
      const chap = state.chapterName || w.astartesChapter || "제국 아스타르테스 챕터";
      return c.titleSuffix ? `${chap} ${c.titleSuffix}` : `${chap} ${c.name}`;
    }
    return c.name;
  }

  function syncImperialNihilus(state) {
    if (!state || !state.globalFlags) return;
    if (state.year >= 999 && !state.globalFlags.greatRiftOpened) {
      state.globalFlags.greatRiftOpened = true;
    }
    if (!state.globalFlags.greatRiftOpened) return;
    const w = getWorld(state.worldId);
    const seg = DATA.SEGMENTA[state.segmentum];
    const isNihilus = Boolean((w && w.nihilusOverride) || (seg && seg.nihilusAfterRift));
    const idx = state.tags.indexOf("imperial_nihilus");
    if (isNihilus && idx === -1) {
      state.tags.push("imperial_nihilus");
    } else if (!isNihilus && idx !== -1) {
      state.tags.splice(idx, 1);
    }
  }

  function applyDiminishedStatGain(state, statKey, rawGain, sourceType = "event") {
    if (!state || !state.stats || state.stats[statKey] === undefined) return 0;
    const cur = state.stats[statKey];
    if (!Number.isFinite(rawGain) || rawGain === 0) return 0;
    if (rawGain < 0) {
      const next = clamp(Math.round(cur + rawGain), 5, 100);
      state.stats[statKey] = next;
      return next - cur;
    }

    const cap = getStatCap(state, statKey, { getWorld, getCareer, getTrait });
    if (cur >= cap) return 0;

    const career = getCareer(state.careerId);
    const homeWorld = getWorld(state.homeWorldId || state.worldId);
    const tags = state.tags || [];
    const bodyClass = computeBodyClass(state, career);
    const reqStats = (career && career.req && career.req.stats) || {};
    const growthStats = (career && career.annualGrowth) || {};
    const isSpecialty = Boolean(
      (growthStats[statKey] && growthStats[statKey] > 0) ||
      (reqStats[statKey] && reqStats[statKey] > 0)
    );
    const isEliteBody = bodyClass === "transhuman" || bodyClass === "dreadnought" || bodyClass === "daemonic";
    const isMechInt = statKey === "Int" && ((career && career.tree === "mechanicus") || tags.includes("mechanicus"));
    const ratio = cur / Math.max(1, cap);

    if (sourceType === "passive") {
      let mult = 1.0;
      if (ratio < 0.58) mult = 1.0;
      else if (ratio < 0.78) mult = isSpecialty ? 0.75 : 0.45;
      else if (ratio < 0.92) mult = isSpecialty ? 0.50 : 0.20;
      else mult = ((career && career.tier >= 5 && isSpecialty) || (isEliteBody && isSpecialty) || isMechInt) ? 0.30 : 0;

      if (mult > 0) {
        if ((tags.includes("prodigy") || tags.includes("savant_genius")) && (statKey === "Int" || statKey === "BS")) {
          mult *= 1.25;
        }
        if (tags.includes("psyker") && statKey === "WP") {
          mult *= 1.2;
        }
        if (homeWorld && homeWorld.id === "macragge" && (statKey === "Int" || statKey === "Fel" || statKey === "Inf")) {
          mult *= 1.15;
        } else if (homeWorld && homeWorld.id === "fenris" && statKey === "WS") {
          mult *= 1.15;
        }
      }

      const eff = rawGain * mult;
      if (eff <= 0) return 0;
      const whole = Math.floor(eff);
      const frac = eff - whole;
      const gain = whole + (Math.random() < frac ? 1 : 0);
      if (gain <= 0) return 0;
      const next = clamp(cur + gain, 5, cap);
      state.stats[statKey] = next;
      return next - cur;
    }

    let mult = 1.0;
    if (sourceType === "join") {
      mult = ratio >= 0.92 ? 0.75 : 1.0;
    } else {
      if (ratio < 0.80) mult = 1.0;
      else if (ratio < 0.92) mult = 0.75;
      else mult = 0.50;
    }

    const scaled = Math.max(1, Math.round(rawGain * mult));
    const next = clamp(cur + scaled, 5, cap);
    state.stats[statKey] = next;
    return next - cur;
  }

  function computeCheckPreview(state, check) {
    const statKey = check && check.stat ? check.stat : "Int";
    const meta = STAT_META[statKey] || { name: statKey, key: statKey };
    const base = state && state.stats && Number.isFinite(state.stats[statKey]) ? state.stats[statKey] : 20;
    const diff = check && Number.isFinite(check.diff) ? check.diff : 0;
    const tags = (state && state.tags) || [];
    const career = state ? getCareer(state.careerId) : null;
    const homeWorld = state ? getWorld(state.homeWorldId || state.worldId) : null;
    const modifiers = [];

    if (diff !== 0) {
      modifiers.push({ label: diff > 0 ? "상황 유리" : "난이도", value: diff });
    }

    const wounds = state && Number.isFinite(state.wounds) ? state.wounds : 100;
    let woundPenalty = wounds <= 25 ? -16 : (wounds <= 50 ? -8 : 0);
    if (woundPenalty < 0 && homeWorld && homeWorld.id === "catachan" && (statKey === "WS" || statKey === "T")) {
      woundPenalty = Math.round(woundPenalty * 0.5);
    }
    if (woundPenalty < 0) {
      modifiers.push({ label: wounds <= 25 ? "중상" : "부상", value: woundPenalty });
    }

    const corruption = state && Number.isFinite(state.corruption) ? state.corruption : 0;
    const isChaosCareer = Boolean(career && career.tree === "chaos");
    const ignoreCorrPenalty = tags.includes("daemon_prince") || isChaosCareer || tags.includes("blank") || tags.includes("omega_pariah");
    if (!ignoreCorrPenalty) {
      if (corruption >= 75) {
        modifiers.push({ label: "심각한 오염", value: -15 });
      } else if (corruption >= 45) {
        modifiers.push({ label: "워프 오염", value: -8 });
      }
    }

    if (tags.includes("imperial_nihilus")) {
      modifiers.push({ label: "임페리움 니힐루스", value: -5 });
    }

    const tier = career ? career.tier : 1;
    if (tier >= 5) {
      modifiers.push({ label: "고위 난제", value: -9 });
    } else if (tier >= 4) {
      modifiers.push({ label: "고위 난제", value: -5 });
    }

    // 모성 · 선천 자질 · 후천 특성 판정 보정
    if (homeWorld) {
      if (homeWorld.id === "krieg" && statKey === "WP") {
        modifiers.push({ label: "비타-움의 무감각", value: 5 });
      } else if (homeWorld.id === "cadia" && statKey === "WP") {
        modifiers.push({ label: "카디아는 버틴다", value: 6 });
      } else if (homeWorld.id === "tanith" && (statKey === "Ag" || statKey === "BS")) {
        modifiers.push({ label: "유령의 발걸음", value: 5 });
      } else if (homeWorld.id === "voidborn" && (statKey === "Int" || statKey === "Ag")) {
        modifiers.push({ label: "성간 항해의 감각", value: 6 });
      } else if (homeWorld.id === "vostroya" && statKey === "BS") {
        modifiers.push({ label: "장자의 가보 화기", value: 3 });
      }
    }
    if (tags.includes("ratling") && (statKey === "BS" || statKey === "Ag")) {
      modifiers.push({ label: "래틀링 감각", value: 6 });
    }
    if (
      check &&
      check.geneseedTrial &&
      (tags.includes("geneseed_compatible") || (state && state.traitId === "geneseed_compatible"))
    ) {
      modifiers.push({ label: "진시드 적합", value: 8 });
    }
    for (let i = 0; i < tags.length; i++) {
      const at = ACQUIRED_TRAIT_EFFECTS[tags[i]];
      if (at && at.checkMods && at.checkMods[statKey]) {
        modifiers.push({ label: at.name, value: at.checkMods[statKey] });
      }
    }

    const modSum = modifiers.reduce((acc, m) => acc + m.value, 0);
    const raw = base + modSum;
    const compressed = raw > 70 ? 70 + (raw - 70) * 0.5 : raw;
    const target = clamp(Math.round(compressed), 5, 90);
    const modText = modifiers
      .map((m) => `${m.label} ${m.value > 0 ? "+" + m.value : m.value}`)
      .join(", ");

    return {
      statKey,
      statName: meta.name,
      base,
      diff,
      modifiers,
      raw: Math.round(raw),
      compressed: raw > 70,
      capped: target === 90,
      target,
      modText
    };
  }

  function rollD100(state, check) {
    const preview = computeCheckPreview(state, check);
    const roll = randInt(1, 100);
    const success = roll <= preview.target;
    const critSuccess = roll <= 5;
    const critFail = roll >= 96;
    return {
      statKey: preview.statKey,
      statName: preview.statName,
      target: preview.target,
      roll,
      success,
      critSuccess,
      critFail,
      diff: preview.diff,
      modifiers: preview.modifiers
    };
  }

  function generateName(gender, world) {
    if (world.id === "krieg") {
      const base = DATA.NAMES.kriegNumbers[randInt(0, DATA.NAMES.kriegNumbers.length - 1)];
      return `병사 ${base}-${randInt(10, 99)}`;
    }
    const firstPool = gender === "female" ? DATA.NAMES.female : DATA.NAMES.male;
    const first = firstPool[randInt(0, firstPool.length - 1)];
    const sur = DATA.NAMES.surnames[randInt(0, DATA.NAMES.surnames.length - 1)];
    return `${first} ${sur}`;
  }

  function computeLifeExpectancy(state) {
    const world = getWorld(state.worldId);
    const homeWorld = getWorld(state.homeWorldId || state.worldId);
    const origin = getOrigin(state.originId);
    const career = getCareer(state.careerId);
    const tMod = clamp(Math.floor(((state.stats.T || 25) - 25) * 0.35), -8, 18);
    const homeLifePerk = homeWorld.id === "generic_agri" ? 5 : (homeWorld.id === "generic_paradise" ? 8 : 0);
    return Math.max(24, Math.round(
      world.baseLifeExpectancy +
      (origin.lifeMod || 0) +
      (career.lifeBonus || 0) +
      (state.extraLifeBonus || 0) +
      homeLifePerk +
      tMod
    ));
  }

  function createCharacter(config = {}) {
    const mode = config.mode || "random";
    const difficulty = config.difficulty === "grimdark" ? "grimdark" : "standard";

    // 1. 시대 / 출생 연도
    let birthYear;
    if (mode === "custom" && config.eraId) {
      let preset = ERA_PRESETS.find((e) => e.id === config.eraId);
      if (!preset) {
        warnUnknownId("eraId", config.eraId);
        preset = ERA_PRESETS[0];
      }
      birthYear = randInt(preset.minYear, preset.maxYear);
    } else {
      // 운명 모드: 85% 확률로 카디아/아마겟돈/대균열을 관통하는 핵심 격동기, 15% 확률로 사바트~바답 시대
      birthYear = Math.random() < 0.85 ? randInt(935, 992) : randInt(745, 934);
    }

    // 2. 행성 선택 (이미 파괴된 행성 고증 보정)
    let world;
    if (mode === "custom" && config.worldId && config.worldId !== "random") {
      if (!WORLD_BY_ID.has(config.worldId)) warnUnknownId("worldId", config.worldId);
      world = getWorld(config.worldId);
      if (world.destroyedYear && birthYear >= world.destroyedYear - 4) {
        birthYear = world.destroyedYear - 18;
      }
    } else {
      const validWorlds = DATA.WORLDS.filter((w) => !w.destroyedYear || birthYear < w.destroyedYear - 5);
      world = pickWeighted(validWorlds, "spawnWeight");
    }

    // 세그멘툼 결정
    const segKeys = Object.keys(DATA.SEGMENTA);
    const segmentum = world.segmentum === "random" ? segKeys[randInt(0, segKeys.length - 1)] : world.segmentum;

    // 3. 성별
    const gender = (mode === "custom" && config.gender && config.gender !== "random")
      ? config.gender
      : (Math.random() < 0.5 ? "male" : "female");

    // 4. 출생 신분
    let origin;
    if (mode === "custom" && config.originId && config.originId !== "random") {
      if (!ORIGIN_BY_ID.has(config.originId)) warnUnknownId("originId", config.originId);
      origin = getOrigin(config.originId);
    } else {
      const worldTags = world.tags || [];
      const eligibleOrigins = DATA.ORIGINS.filter((o) => {
        if (o.worldFilter && !o.worldFilter.includes(world.id)) return false;
        if (o.excludeWorlds && o.excludeWorlds.includes(world.id)) return false;
        if (o.excludeWorldTags && o.excludeWorldTags.some((wt) => worldTags.includes(wt))) return false;
        return true;
      });
      const basePool = eligibleOrigins.length ? eligibleOrigins : DATA.ORIGINS;
      if (difficulty === "grimdark") {
        const grimPool = basePool.map((o) => {
          const isCommoner = (o.tags || []).some((t) => t === "lowborn" || t === "citizen");
          return { item: o, w: (o.weight || 1) * (isCommoner ? 2.6 : 1) };
        });
        origin = pickWeighted(grimPool, "w").item;
      } else {
        origin = pickWeighted(basePool, "weight");
      }
    }

    // 5. 선천 자질
    let trait;
    if (mode === "custom" && config.traitId && config.traitId !== "random") {
      if (!TRAIT_BY_ID.has(config.traitId)) warnUnknownId("traitId", config.traitId);
      trait = getTrait(config.traitId);
    } else {
      let eligibleTraits = DATA.TRAITS;
      if (origin && origin.id === "navigator_house") {
        const blocked = new Set(["blank", "omega_pariah", "abhuman_ogryn", "abhuman_ratling", "psyker", "alpha_plus_psyker"]);
        eligibleTraits = DATA.TRAITS.filter((t) => !blocked.has(t.id));
      }
      trait = pickWeighted(eligibleTraits, "weight");
    }

    // 6. 8대 고증 특성치 생성 (Dark Heresy 2d10+18 스타일 + 보정)
    const stats = {};
    for (const key of Object.keys(STAT_META)) {
      const base = 18 + randInt(1, 10) + randInt(1, 10);
      const wMod = (world.statMods && world.statMods[key]) || 0;
      const oMod = (origin.statMods && origin.statMods[key]) || 0;
      const tMod = (trait.statMods && trait.statMods[key]) || 0;
      stats[key] = clamp(base + wMod + oMod + tMod, 8, 85);
    }

    const tags = Array.from(new Set([...(origin.tags || []), ...(trait.tags || [])]));
    const capProbeState = {
      age: 0,
      careerId: "child",
      worldId: world.id,
      homeWorldId: world.id,
      traitId: trait.id,
      tags,
      augmeticsCount: 0
    };
    for (const key of Object.keys(STAT_META)) {
      const cap = getStatCap(capProbeState, key, { getWorld, getCareer, getTrait });
      stats[key] = clamp(stats[key], 8, cap);
    }

    const name = (mode === "custom" && config.customName && config.customName.trim())
      ? config.customName.trim()
      : generateName(gender, world);

    const faith = clamp(48 + (origin.faithMod || 0) + (trait.faithBonus || 0), 5, 100);
    const corruption = clamp(trait.corruptionStart || 0, 0, 100);
    const maxWounds = tags.includes("ogryn") ? 120 : 100;
    const wounds = clamp(82 + Math.floor((stats.T - 25) / 2) + (tags.includes("ogryn") ? 15 : 0), 65, maxWounds);

    const state = {
      saveVersion: SAVE_VERSION,
      id: `soul_${Date.now()}_${randInt(100, 999)}`,
      mode,
      difficulty,
      name,
      gender,
      birthYear,
      year: birthYear,
      quarter: 1,
      age: 0,
      alive: true,
      deathCause: null,
      worldId: world.id,
      homeWorldId: world.id,
      visitedWorlds: [world.id],
      segmentum,
      originId: origin.id,
      traitId: trait.id,
      careerId: "child",
      careerHistory: ["child"],
      chapterId: null,
      chapterName: world.astartesChapter || null,
      focus: "survival",
      stats,
      wounds,
      maxWounds,
      faith,
      corruption,
      alignment: { humane: 0, dogmatic: 0, ruthless: 0 },
      extraLifeBonus: 0,
      rejuvenatCount: 0,
      augmeticsCount: 0,
      lastRejuvenatAge: -99,
      lastAugmeticsAge: -99,
      lastPenanceYear: -999,
      lastTravelYear: -999,
      lastCareerActionYear: -999,
      lastCareerOfferYear: -999,
      lastCareerChangeYear: -999,
      lastCentenarianOpYear: -999,
      recentCentenarianOps: [],
      careerRetryAfter: {},
      declinedCareers: {},
      tags,
      seenEvents: [],
      recentEvents: [],
      eventCounts: {},
      seenTimeline: [],
      heardNews: [],
      recentChronicles: [],
      metCharacters: [],
      globalFlags: {
        greatRiftOpened: birthYear >= 999
      },
      pendingEvent: null,
      lastRoll: null,
      logs: []
    };

    syncImperialNihilus(state);

    const birthLogText = world.id === "krieg"
      ? `${formatImperialYear(birthYear)} — 크리그 지하 비타-움(인공 배양실)에서 ${name}(${gender === "male" ? "남" : "여"})이(가) 배양·등록되었다. 배속 분류: [${origin.name}] · 선천 자질: [${trait.name}].`
      : `${formatImperialYear(birthYear)} — ${world.name}(${world.worldClass})의 ${origin.name} 가정에서 ${name}(${gender === "male" ? "남" : "여"})이(가) 태어났다. 선천 자질: [${trait.name}].`;

    addLog(state, birthLogText, "birth");

    return state;
  }

  function migrateState(raw) {
    if (
      !raw ||
      typeof raw !== "object" ||
      Array.isArray(raw) ||
      !raw.id ||
      !raw.stats ||
      typeof raw.stats !== "object" ||
      Array.isArray(raw.stats) ||
      !Array.isArray(raw.logs)
    ) {
      return null;
    }
    const st = raw;
    if (!WORLD_BY_ID.has(st.worldId)) {
      warnUnknownId("worldId", st.worldId);
      st.worldId = DATA.WORLDS[0].id;
    }
    if (!WORLD_BY_ID.has(st.homeWorldId)) {
      st.homeWorldId = st.worldId;
    }
    if (!ORIGIN_BY_ID.has(st.originId)) {
      warnUnknownId("originId", st.originId);
      st.originId = DATA.ORIGINS[0].id;
    }
    if (!TRAIT_BY_ID.has(st.traitId)) {
      warnUnknownId("traitId", st.traitId);
      st.traitId = DATA.TRAITS[0].id;
    }
    if (!CAREER_BY_ID.has(st.careerId)) {
      warnUnknownId("careerId", st.careerId);
      st.careerId = "child";
    }
    if (st.chapterId && !CHAPTER_BY_ID.has(st.chapterId)) {
      warnUnknownId("chapterId", st.chapterId);
      st.chapterId = null;
    }
    if (!DATA.SEGMENTA[st.segmentum]) {
      const curW = getWorld(st.worldId);
      st.segmentum = curW.segmentum === "random" ? "solar" : curW.segmentum;
    }
    if (typeof st.focus !== "string" || !Object.prototype.hasOwnProperty.call(FOCUSES, st.focus)) {
      st.focus = "survival";
    }
    st.difficulty = st.difficulty === "grimdark" ? "grimdark" : "standard";
    const finiteNum = (v) => (v !== null && v !== "" && typeof v !== "boolean" ? Number(v) : NaN);
    const qNum = finiteNum(st.quarter);
    st.quarter = Number.isFinite(qNum) ? clamp(Math.floor(qNum), 1, 3) : 1;
    const ageNum = finiteNum(st.age);
    st.age = Number.isFinite(ageNum) ? clamp(Math.floor(ageNum), 0, 5000) : 0;
    const birthYearNum = finiteNum(st.birthYear);
    st.birthYear = Number.isFinite(birthYearNum) ? Math.floor(birthYearNum) : 980;
    const yearNum = finiteNum(st.year);
    st.year = Number.isFinite(yearNum) ? Math.floor(yearNum) : st.birthYear + st.age;
    const maxWNum = finiteNum(st.maxWounds);
    st.maxWounds = Number.isFinite(maxWNum) ? clamp(Math.round(maxWNum), 50, 500) : 100;
    const woundsNum = finiteNum(st.wounds);
    st.wounds = Number.isFinite(woundsNum) ? clamp(Math.round(woundsNum), 0, st.maxWounds) : st.maxWounds;
    const faithNum = finiteNum(st.faith);
    st.faith = Number.isFinite(faithNum) ? clamp(Math.round(faithNum), 0, 100) : 50;
    const corrNum = finiteNum(st.corruption);
    st.corruption = Number.isFinite(corrNum) ? clamp(Math.round(corrNum), 0, 100) : 0;
    st.alignment = normalizeAlignment(st);

    for (const key of Object.keys(STAT_META)) {
      if (!Number.isFinite(st.stats[key])) st.stats[key] = 25;
      else st.stats[key] = clamp(Math.round(st.stats[key]), 5, 100);
    }

    const extraLifeNum = finiteNum(st.extraLifeBonus);
    st.extraLifeBonus = Number.isFinite(extraLifeNum) ? clamp(Math.round(extraLifeNum), -100, 3000) : 0;
    const rejNum = finiteNum(st.rejuvenatCount);
    st.rejuvenatCount = Number.isFinite(rejNum) ? clamp(Math.floor(rejNum), 0, 10) : 0;
    const augNum = finiteNum(st.augmeticsCount);
    st.augmeticsCount = Number.isFinite(augNum) ? clamp(Math.floor(augNum), 0, 10) : 0;
    st.lastRejuvenatAge = Number.isFinite(st.lastRejuvenatAge) ? st.lastRejuvenatAge : -99;
    st.lastAugmeticsAge = Number.isFinite(st.lastAugmeticsAge) ? st.lastAugmeticsAge : -99;
    st.lastPenanceYear = Number.isFinite(st.lastPenanceYear) ? st.lastPenanceYear : -999;
    st.lastTravelYear = Number.isFinite(st.lastTravelYear) ? st.lastTravelYear : -999;
    st.lastCareerActionYear = Number.isFinite(st.lastCareerActionYear) ? st.lastCareerActionYear : -999;
    st.lastCareerOfferYear = Number.isFinite(st.lastCareerOfferYear) ? st.lastCareerOfferYear : -999;
    st.lastCareerChangeYear = Number.isFinite(st.lastCareerChangeYear) ? st.lastCareerChangeYear : -999;
    st.lastCentenarianOpYear = Number.isFinite(st.lastCentenarianOpYear) ? st.lastCentenarianOpYear : -999;
    if (!Array.isArray(st.recentCentenarianOps)) st.recentCentenarianOps = [];
    if (!st.careerRetryAfter || typeof st.careerRetryAfter !== "object" || Array.isArray(st.careerRetryAfter)) st.careerRetryAfter = {};
    if (!st.declinedCareers || typeof st.declinedCareers !== "object" || Array.isArray(st.declinedCareers)) st.declinedCareers = {};
    if (!st.eventCounts || typeof st.eventCounts !== "object" || Array.isArray(st.eventCounts)) st.eventCounts = {};
    if (!st.globalFlags || typeof st.globalFlags !== "object") {
      st.globalFlags = { greatRiftOpened: st.year >= 999 };
    }
    if (!Array.isArray(st.visitedWorlds) || !st.visitedWorlds.length) st.visitedWorlds = [st.worldId];
    if (!Array.isArray(st.careerHistory) || !st.careerHistory.length) st.careerHistory = [st.careerId];
    if (!Array.isArray(st.tags)) st.tags = [];
    if (!Array.isArray(st.seenEvents)) st.seenEvents = [];
    if (!Array.isArray(st.recentEvents)) st.recentEvents = [];
    if (!Array.isArray(st.seenTimeline)) st.seenTimeline = [];
    if (!Array.isArray(st.heardNews)) st.heardNews = [];
    if (!Array.isArray(st.recentChronicles)) st.recentChronicles = [];
    if (!Array.isArray(st.metCharacters)) st.metCharacters = [];
    st.logs = st.logs.filter(
      (entry) => entry && typeof entry === "object" && !Array.isArray(entry) && typeof entry.text === "string"
    );

    if (st.pendingEvent) {
      if (
        typeof st.pendingEvent !== "object" ||
        Array.isArray(st.pendingEvent) ||
        !Array.isArray(st.pendingEvent.choices)
      ) {
        st.pendingEvent = null;
      } else {
        st.pendingEvent.choices = st.pendingEvent.choices.filter(
          (ch) => ch && typeof ch === "object" && !Array.isArray(ch) && typeof ch.label === "string"
        );
        if (st.pendingEvent.choices.length === 0) {
          st.pendingEvent = null;
        }
      }
    }
    if (
      st.lastRoll &&
      (typeof st.lastRoll !== "object" ||
        Array.isArray(st.lastRoll) ||
        !Number.isFinite(st.lastRoll.roll) ||
        !Number.isFinite(st.lastRoll.target))
    ) {
      st.lastRoll = null;
    }

    syncImperialNihilus(st);
    st.saveVersion = SAVE_VERSION;
    return st;
  }

  const MAX_LOGS = 2400;
  const PRUNABLE_LOG_KINDS = new Set(["chronicle", "chronicle-grim", "normal"]);

  function addLog(state, text, kind = "normal", meta = null, extra = null) {
    state.logs.unshift({
      year: formatImperialDate(state.year, state.quarter || 1),
      age: state.age,
      text,
      kind,
      meta,
      badge: extra && extra.badge ? extra.badge : null,
      deltaText: extra && extra.deltaText ? extra.deltaText : null,
      chronicleId: extra && extra.chronicleId ? extra.chronicleId : null
    });
    if (state.logs.length > MAX_LOGS) {
      let removeIdx = -1;
      for (let i = state.logs.length - 1; i >= 0; i--) {
        if (PRUNABLE_LOG_KINDS.has(state.logs[i].kind)) {
          removeIdx = i;
          break;
        }
      }
      if (removeIdx !== -1) state.logs.splice(removeIdx, 1);
      else state.logs.pop();
    }
  }

  function formatDeltaText(eff) {
    if (!eff) return "";
    const parts = [];
    if (eff.stats) {
      for (const [k, d] of Object.entries(eff.stats)) {
        if (!d) continue;
        const m = STAT_META[k];
        parts.push(`${m ? m.name : k} ${d > 0 ? "+" + d : d}`);
      }
    }
    if (eff.wounds) parts.push(`생명력 ${eff.wounds > 0 ? "+" + eff.wounds : eff.wounds}`);
    if (eff.faith) parts.push(`신앙 ${eff.faith > 0 ? "+" + eff.faith : eff.faith}`);
    if (eff.corruption) parts.push(`오염 ${eff.corruption > 0 ? "+" + eff.corruption : eff.corruption}`);
    if (eff.align) {
      for (const [k, d] of Object.entries(eff.align)) {
        if (!d) continue;
        const am = ALIGNMENT_META[k];
        parts.push(`${am ? am.name : k} ${d > 0 ? "+" + d : d}`);
      }
    }
    if (eff.warpYearShift) parts.push(`워프 시간 왜곡 +${eff.warpYearShift}년`);
    if (Array.isArray(eff.addTags)) {
      for (let i = 0; i < eff.addTags.length; i++) {
        const at = ACQUIRED_TRAIT_EFFECTS[eff.addTags[i]];
        if (at) parts.push(`특성 획득: ${at.name}(${at.summary})`);
      }
    }
    if (Array.isArray(eff.removeTags)) {
      for (let i = 0; i < eff.removeTags.length; i++) {
        const at = ACQUIRED_TRAIT_EFFECTS[eff.removeTags[i]];
        if (at) {
          parts.push(at.kind === "negative" ? `특성 치유: ${at.name}` : `특성 상실: ${at.name}`);
        }
      }
    }
    return parts.join(" · ");
  }


  function isIncorruptibleState(state) {
    return isIncorruptibleTags(state && state.tags);
  }

  function isTraitImmune(state, traitTag) {
    return isTraitImmunePure(state, traitTag, getCareer);
  }

  const endingsMod = createEndingsModule({
    getWorld,
    getCareer,
    getCharacter,
    getCareerShortName,
    describeReq,
    getLivingSaintAspect,
    getCareerDisplayTitle,
    computeLifeExpectancy,
    addLog,
    getContextualOptions: (st) => getContextualOptions(st)
  });
  const {
    canRetireHonorably,
    createHonorableEndingEvent,
    buildStatusSummary,
    evaluateLifeGrade,
    finalizeDeath
  } = endingsMod;

  const travelMod = createTravelModule({
    DATA,
    getWorld,
    getCareer,
    randInt
  });
  const {
    canAccessWorld,
    getTravelProfile,
    evaluateTravelAttempt,
    getTravelCandidateWorlds,
    createWarpAnomalyTransitEvent,
    createDynamicTransitEvent
  } = travelMod;

  const careerRulesMod = createCareerRulesModule({
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
    applyOutcome: (...args) => applyOutcome(...args),
    finalizeDeath
  });
  const {
    isCareerTransitionBlocked,
    isManualCareerAllowed,
    getAdmissionPreview,
    createChapterSelectionEvent,
    hasAssassinClade,
    createAssassinCladeEvent,
    applyCareerJoinEffects,
    createDynamicCareerOfferEvent,
    attemptCareerChange
  } = careerRulesMod;

  function applyOutcome(state, outcome, rollInfo = null, statSource = "event") {
    if (!outcome) return;

    if (outcome.chooseChapter) {
      const chap = getChapter(outcome.chooseChapter);
      if (chap) {
        state.chapterId = chap.id;
        state.chapterName = chap.name;
      }
    }

    let appliedOutcomeStats = null;
    if (outcome.stats) {
      appliedOutcomeStats = {};
      for (const [k, delta] of Object.entries(outcome.stats)) {
        if (state.stats[k] !== undefined) {
          const actual = applyDiminishedStatGain(state, k, delta, statSource);
          if (actual !== 0) appliedOutcomeStats[k] = actual;
        }
      }
    }
    if (outcome.woundsBonus) {
      state.maxWounds += outcome.woundsBonus;
      state.wounds = clamp(state.wounds + outcome.woundsBonus, 1, state.maxWounds);
    }
    let appliedOutcomeWounds = outcome.wounds || 0;
    if (outcome.wounds) {
      appliedOutcomeWounds = outcome.wounds < 0 ? scaleWoundDamage(state, outcome.wounds) : outcome.wounds;
      state.wounds = clamp(state.wounds + appliedOutcomeWounds, 0, state.maxWounds);
    }
    if (outcome.faith) {
      state.faith = clamp(state.faith + outcome.faith, 0, 100);
    }
    let appliedOutcomeCorr = outcome.corruption || 0;
    if (outcome.corruption) {
      if (outcome.corruption > 0) {
        appliedOutcomeCorr = scalePositiveCorruption(state, outcome.corruption);
        if (appliedOutcomeCorr > 0) {
          state.corruption = clamp(state.corruption + appliedOutcomeCorr, 0, 100);
        }
      } else {
        state.corruption = clamp(state.corruption + outcome.corruption, 0, 100);
      }
    }
    if (outcome.corruptionReset) {
      state.corruption = 0;
    }
    if (outcome.align) {
      applyAlignDelta(state, outcome.align);
    }
    if (outcome.lifeBonusExtra || outcome.extraLifeBonus) {
      state.extraLifeBonus += (outcome.lifeBonusExtra || outcome.extraLifeBonus);
    }
    if (outcome.incrementRejuvenat) {
      state.rejuvenatCount = (state.rejuvenatCount || 0) + 1;
      state.lastRejuvenatAge = state.age;
    }
    const addedTagsForDelta = [];
    if (outcome.addTags) {
      for (const t of outcome.addTags) {
        if (isTraitImmune(state, t, getCareer)) continue;
        if (!state.tags.includes(t)) {
          state.tags.push(t);
          if (ACQUIRED_TRAIT_EFFECTS[t]) addedTagsForDelta.push(t);
        }
        if (t.startsWith("met_")) {
          const cid = t.replace("met_", "");
          if (!state.metCharacters.includes(cid)) state.metCharacters.push(cid);
        }
      }
    }
    const removedTagsForDelta = [];
    if (outcome.removeTags) {
      for (const t of outcome.removeTags) {
        const idx = state.tags.indexOf(t);
        if (idx !== -1) {
          state.tags.splice(idx, 1);
          if (ACQUIRED_TRAIT_EFFECTS[t]) removedTagsForDelta.push(t);
        }
      }
    }
    if (outcome.moveWorld) {
      const nextWorld = getWorld(outcome.moveWorld);
      state.worldId = nextWorld.id;
      if (!state.visitedWorlds.includes(nextWorld.id)) state.visitedWorlds.push(nextWorld.id);
      if (nextWorld.segmentum !== "random") state.segmentum = nextWorld.segmentum;
      syncImperialNihilus(state);
    }
    if (outcome.warpYearShift && Number.isInteger(outcome.warpYearShift)) {
      state.year += outcome.warpYearShift;
      syncImperialNihilus(state);
    }
    if (outcome.declineCareerOffer) {
      state.declinedCareers = state.declinedCareers || {};
      state.declinedCareers[outcome.declineCareerOffer] = state.year;
    }

    if (outcome.trialFailFor) {
      const failedCareer = getCareer(outcome.trialFailFor);
      const tc = failedCareer && failedCareer.trialCheck;
      state.declinedCareers = state.declinedCareers || {};
      state.declinedCareers[outcome.trialFailFor] = failedCareer && failedCareer.tier >= 6 ? state.year + 8 : state.year;
      state.careerRetryAfter = state.careerRetryAfter || {};
      state.careerRetryAfter[outcome.trialFailFor] = state.year + 2;
      if (tc && Math.random() < (tc.failDeathChance || 0.25)) {
        const cause = tc.failDeathCause || `${tc.title} 도중 치명적 거부 반응으로 순직`;
        addLog(state, `[${tc.title}] 시련 실패! ${cause}`, "death", rollInfo, { badge: "시련 실패" });
        finalizeDeath(state, cause);
        return;
      }
    }

    let acceptedJoinEff = null;
    if (outcome.acceptCareerOffer) {
      const targetCareer = getCareer(outcome.acceptCareerOffer);
      if (targetCareer && targetCareer.selectable) {
        state.careerId = targetCareer.id;
        if (!UNBOUND_CAREERS.has(targetCareer.id)) {
          state.lastCareerChangeYear = state.year;
        }
        if (!state.careerHistory.includes(targetCareer.id)) state.careerHistory.push(targetCareer.id);
        if (targetCareer.useChapterName && !state.chapterName) {
          const hw = getWorld(state.homeWorldId);
          state.chapterName = hw.astartesChapter || "울트라마린 후계 챕터";
        }
        if (targetCareer.onJoin) {
          acceptedJoinEff = applyCareerJoinEffects(state, targetCareer.onJoin);
        }
      }
    }

    if (outcome.forceCareer) {
      let resolvedId = outcome.forceCareer;
      if (resolvedId === "chaos_cultist" && state.tags.includes("astartes") && !isIncorruptibleState(state)) {
        resolvedId = "renegade_marine";
      }
      const targetCareer = getCareer(resolvedId);
      const curCareer = getCareer(state.careerId);
      const isTranshuman = Boolean(curCareer.isTranshuman) || state.tags.includes("astartes") || state.tags.includes("custodes") || state.tags.includes("grey_knight") || state.tags.includes("daemon_prince") || state.tags.includes("living_saint");
      const targetIsTranshuman = Boolean(targetCareer.isTranshuman);
      const isIncorruptible = isIncorruptibleState(state) && targetCareer.tree === "chaos";
      const isChaosDemotion = curCareer.tree === "chaos" && targetCareer.tree === "chaos" && curCareer.tier >= targetCareer.tier;
      const isSecretLocked =
        (state.tags.includes("assassin") && targetCareer.tree !== "officio_assassinorum" && targetCareer.tree !== "chaos") ||
        (state.tags.includes("living_saint") && targetCareer.tree !== "living_saint");
      const preventDowngrade =
        isIncorruptible ||
        isChaosDemotion ||
        isSecretLocked ||
        (targetCareer.tree !== "chaos" &&
        (curCareer.tier > targetCareer.tier || (isTranshuman && !targetIsTranshuman)));

      if (!preventDowngrade) {
        state.careerId = targetCareer.id;
        if (!UNBOUND_CAREERS.has(targetCareer.id)) {
          state.lastCareerChangeYear = state.year;
        }
        if (!state.careerHistory.includes(targetCareer.id)) state.careerHistory.push(targetCareer.id);
        if (targetCareer.useChapterName && !state.chapterName) {
          const hw = getWorld(state.homeWorldId);
          state.chapterName = hw.astartesChapter || "제국 아스타르테스 챕터";
        }
        if (targetCareer.onJoin && targetCareer.onJoin.addTags) {
          for (const t of targetCareer.onJoin.addTags) {
            if (!state.tags.includes(t)) state.tags.push(t);
          }
        }
      }
    }

    if (state.tags.includes("daemon_prince") && state.corruption >= 100) {
      state.corruption = 99;
    }
    if (isIncorruptibleState(state) && state.corruption >= 100) {
      state.corruption = 0;
    }

    const logKind = outcome.instantDeath
      ? "death"
      : (outcome.chooseChapter || outcome.acceptCareerOffer ? "career" : (rollInfo ? (rollInfo.success ? "success" : "danger") : "event"));
    const outcomeForDelta = Object.assign(
      {},
      outcome,
      appliedOutcomeStats ? { stats: appliedOutcomeStats } : null,
      outcome.wounds ? { wounds: appliedOutcomeWounds } : null,
      outcome.corruption ? { corruption: appliedOutcomeCorr } : null,
      { addTags: addedTagsForDelta, removeTags: removedTagsForDelta }
    );
    const deltaText = formatDeltaText(acceptedJoinEff || outcomeForDelta);
    addLog(state, outcome.text, logKind, rollInfo, {
      badge: outcome.instantDeath ? "최후의 기록" : (outcome.chooseChapter ? "챕터 서약" : (outcome.acceptCareerOffer ? "진로 발탁 · 승급" : (rollInfo ? "판정 결과" : "분기 기록"))),
      deltaText
    });

    if (outcome.instantDeath) {
      finalizeDeath(state, outcome.instantDeath);
    } else if (state.wounds <= 0) {
      finalizeDeath(state, "치명적인 부상과 가혹한 시련을 견디지 못하고 순직");
    } else if (state.corruption >= 100 && !state.tags.includes("daemon_prince") && !isIncorruptibleState(state)) {
      finalizeDeath(state, "워프 오염이 임계치를 돌파하여 카오스 스폰으로 변이 후 정화됨");
    } else if ((outcome.forceCareer === "astartes_scout" || outcome.acceptCareerOffer === "astartes_scout") && state.careerId === "astartes_scout" && !state.chapterId && !state.pendingEvent) {
      const chapEv = createChapterSelectionEvent(state);
      if (chapEv) state.pendingEvent = chapEv;
    } else if ((outcome.forceCareer === "assassin_initiate" || outcome.acceptCareerOffer === "assassin_initiate") && state.careerId === "assassin_initiate" && !hasAssassinClade(state) && !state.pendingEvent) {
      const cladeEv = createAssassinCladeEvent(state);
      if (cladeEv) state.pendingEvent = cladeEv;
    }
  }

  function resolvePendingChoice(state, choiceIndex) {
    if (!state.pendingEvent || !state.alive) return null;
    const ev = state.pendingEvent;
    const choice = ev.choices[choiceIndex];
    if (!choice) return null;
    if (choice.req && !checkReq(state, choice.req)) return null;

    if (ev.setGlobalFlag) {
      state.globalFlags[ev.setGlobalFlag] = true;
    }

    let rollResult = null;
    let outcome = null;

    if (choice.check) {
      rollResult = rollD100(state, choice.check);
      outcome = rollResult.success
        ? (rollResult.critSuccess && choice.critSuccess ? choice.critSuccess : choice.success)
        : (rollResult.critFail && choice.critFail ? choice.critFail : choice.fail);
    } else {
      outcome = choice.effect || choice.success;
    }

    state.lastRoll = rollResult;
    state.pendingEvent = null;

    applyOutcome(state, outcome, rollResult);
    if (ev.setGlobalFlag === "greatRiftOpened") {
      syncImperialNihilus(state);
    }

    return {
      eventTitle: ev.title,
      choiceLabel: choice.label,
      rollResult,
      outcome
    };
  }

  function applyChronicle(state, reqCtx) {
    const ctx = reqCtx || makeReqContext(state);
    const buckets = getChronicleBuckets(state);
    const pool = [];
    for (let b = 0; b < buckets.length; b++) {
      const arr = buckets[b];
      for (let i = 0; i < arr.length; i++) {
        if (checkReq(state, arr[i].req, ctx)) pool.push(arr[i]);
      }
    }
    if (pool.length === 0) {
      addLog(state, generateDailyFlavor(state), "normal", null, { badge: "일상 기록" });
      return;
    }

    const recent = state.recentChronicles || [];
    const recentSet = new Set(recent);
    const shortLimit = Math.min(8, Math.max(1, pool.length - 1));
    const shortRecentSet = new Set(recent.slice(0, shortLimit));
    const fresh = [];
    const notRecentShort = [];
    for (let i = 0; i < pool.length; i++) {
      const ch = pool[i];
      if (!recentSet.has(ch.id)) fresh.push(ch);
      if (!shortRecentSet.has(ch.id)) notRecentShort.push(ch);
    }
    const candidates = fresh.length > 0 ? fresh : (notRecentShort.length > 0 ? notRecentShort : pool);

    // priority 가중치: 현재 행성/직업 초고유(3)=9, 특화(2)=3, 일반 부조리(1)=1.2 + 성향 alignBias
    const alignInfo = getAlignmentInfo(state);
    const weighted = candidates.map((ch) => {
      let w = ch.priority === 3 ? 9 : ch.priority === 2 ? 3 : 1.2;
      if (ch.req && ch.req.anyWorlds && ch.req.anyWorlds.includes(state.worldId)) w *= 1.35;
      if (ch.req && ch.req.anyChapters && state.chapterId && ch.req.anyChapters.includes(state.chapterId)) w *= 1.5;
      if (ch.req && (ch.req.minYear !== undefined || ch.req.maxYear !== undefined)) w *= 1.35;
      if (ch.alignBias && alignInfo.dominant !== "neutral") {
        if (ch.alignBias === alignInfo.dominant) w *= 2.0;
        else w *= 0.45;
      }
      return { item: ch, w };
    });
    const picked = pickWeighted(weighted, "w").item;

    state.recentChronicles = [picked.id, ...recent].slice(0, 28);

    const eff = picked.effect || {};
    let appliedStats = null;
    if (eff.stats) {
      appliedStats = {};
      const entries = Object.entries(eff.stats);
      const hasNeg = entries.some(([, v]) => v < 0);
      const specSet = getSpecialtyStatSet(getCareer(state.careerId));
      for (const [k, delta] of entries) {
        if (state.stats[k] === undefined) continue;
        if (hasNeg || delta < 0) {
          const cappedDelta = delta > 0 ? Math.min(delta, 2) : delta;
          const actual = applyDiminishedStatGain(state, k, cappedDelta, "passive");
          if (actual !== 0) appliedStats[k] = actual;
        } else {
          const isSpec = specSet.has(k);
          const prob = isSpec ? (picked.priority === 3 ? 0.60 : 0.42) : 0.16;
          if (Math.random() < prob) {
            const cappedDelta = isSpec ? Math.min(delta, 2) : Math.min(delta, 1);
            const actual = applyDiminishedStatGain(state, k, cappedDelta, "passive");
            if (actual !== 0) appliedStats[k] = actual;
          }
        }
      }
    }
    let appliedChronWounds = eff.wounds || 0;
    if (eff.wounds) {
      appliedChronWounds = eff.wounds < 0 ? scaleWoundDamage(state, eff.wounds) : eff.wounds;
      const floor = appliedChronWounds < 0 ? Math.min(state.wounds, 5) : 0;
      state.wounds = clamp(state.wounds + appliedChronWounds, floor, state.maxWounds);
    }
    if (eff.faith) {
      state.faith = clamp(state.faith + eff.faith, 0, 100);
    }
    let appliedChronCorr = eff.corruption || 0;
    if (eff.corruption) {
      if (eff.corruption > 0) {
        appliedChronCorr = scalePositiveCorruption(state, eff.corruption);
        if (appliedChronCorr > 0) {
          state.corruption = clamp(state.corruption + appliedChronCorr, 0, 99);
        }
      } else {
        state.corruption = clamp(state.corruption + eff.corruption, 0, 99);
      }
    }
    if (eff.align) {
      applyAlignDelta(state, eff.align);
    }
    const removedChronTags = [];
    if (eff.removeTags) {
      for (const t of eff.removeTags) {
        const idx = state.tags.indexOf(t);
        if (idx !== -1) {
          state.tags.splice(idx, 1);
          if (ACQUIRED_TRAIT_EFFECTS[t]) removedChronTags.push(t);
        }
      }
    }

    const effForDelta = Object.assign(
      {},
      eff,
      appliedStats ? { stats: appliedStats } : null,
      eff.wounds ? { wounds: appliedChronWounds } : null,
      eff.corruption ? { corruption: appliedChronCorr } : null,
      { removeTags: removedChronTags }
    );
    const deltaText = formatDeltaText(effForDelta);
    const kind = (appliedChronWounds < 0) || appliedChronCorr > 0
      ? "chronicle-grim"
      : "chronicle";

    addLog(state, picked.text, kind, null, {
      badge: picked.badge || "제국 일상",
      deltaText,
      chronicleId: picked.id
    });
  }

  function generateDailyFlavor(state) {
    const world = getWorld(state.worldId);
    const career = getCareer(state.careerId);
    const focus = FOCUSES[state.focus];

    if (state.age < 12) {
      return `${world.name}의 하늘 아래서 황제 찬송가와 생존 수칙을 익히며 자랐다.`;
    }
    if (state.tags.includes("astartes")) {
      return `챕터의 전투 교리와 무구 정비를 반복하며 끝없는 성전을 준비했다.`;
    }
    if (state.tags.includes("custodes")) {
      return `황궁의 금빛 회랑에서 철학과 무예를 연마하며 황금 옥좌를 수호했다.`;
    }
    if (state.tags.includes("living_saint")) {
      return `황제의 성광을 품고 절망에 빠진 제국 전선들을 순례하며 기적을 이어 갔다.`;
    }
    return `[${getCareerDisplayTitle(state, career)}] 복무 중 '${focus.name}'에 매진하며 한 해를 넘겼다.`;
  }

  function advanceQuarter(state, options = {}) {
    if (!state.alive || state.pendingEvent) return { status: "blocked" };

    // 1년 = 3분기(상반기/중반기/하반기). 선택형 유년기 빠른 진행 활성화 시 0~13세 구간은 연 1분기(새해 즉시 진행)!
    let isNewYear = false;
    const fastKid = Boolean(options && options.fastChildhood && state.age < 13);
    if (fastKid || !state.quarter || state.quarter >= 3) {
      state.quarter = 1;
      state.age += 1;
      state.year += 1;
      isNewYear = true;
    } else {
      state.quarter += 1;
    }

    const world = getWorld(state.worldId);
    const focus = FOCUSES[state.focus] || FOCUSES.survival;

    if (isNewYear) {
      // 14세 도달 시 출신 배경에 맞는 자연스러운 첫 직무 편입
      if (state.age === 14 && state.careerId === "child") {
        const knightSquireCareer = getCareer("knight_squire");
        if (state.tags.includes("navigator")) {
          state.careerId = "nav_apprentice";
          state.lastCareerChangeYear = state.year;
          state.careerHistory.push("nav_apprentice");
          if (!state.tags.includes("voidborn")) state.tags.push("voidborn");
          addLog(state, "14세가 되어 나비스 노빌리테 가문의 항법탑에 올라 견습 항법사로 첫 성간 항로를 배웠다.", "career", null, { badge: "직무 편입" });
        } else if (state.tags.includes("knight_blood") && knightSquireCareer && checkReq(state, knightSquireCareer.req)) {
          state.careerId = "knight_squire";
          state.lastCareerChangeYear = state.year;
          state.careerHistory.push("knight_squire");
          if (!state.tags.includes("imperial_knight")) state.tags.push("imperial_knight");
          if (!state.tags.includes("imperial_military")) state.tags.push("imperial_military");
          addLog(state, "14세가 되어 기사 가문의 종자 서약을 올리고 아미저 보행 병기의 헬름 메카니쿰 훈련에 돌입했다.", "career", null, { badge: "직무 편입" });
        } else if (
          state.tags.includes("mechanicus_blood") &&
          !state.tags.includes("abhuman") &&
          !state.tags.includes("psyker") &&
          !state.tags.includes("navigator")
        ) {
          state.careerId = "skitarii";
          state.lastCareerChangeYear = state.year;
          state.careerHistory.push("skitarii");
          if (!state.tags.includes("mechanicus")) state.tags.push("mechanicus");
          if (!state.tags.includes("bionic")) state.tags.push("bionic");
          addLog(state, "14세가 되어 기계교 견습 과정을 마치고 스키타리 예비대에 편입되었다.", "career", null, { badge: "직무 편입" });
        } else if (state.tags.includes("noble")) {
          addLog(
            state,
            "14세가 되어 귀족 가문의 수습 기간에 들어갔다. 만 18세 기간까지 아드미니스트라툼·군·해군·국교·아르비테스 등 원하는 제국 정규 기관을 직접 선택해 지원할 수 있다.",
            "career",
            null,
            { badge: "가문 수습" }
          );
        } else if (state.tags.includes("military_blood")) {
          state.careerId = "pdf_trooper";
          state.careerHistory.push("pdf_trooper");
          addLog(state, "14세가 되어 가문의 전통에 따라 행성 방위군(PDF) 소년병으로 입대했다.", "career", null, { badge: "직무 편입" });
        } else if (!state.tags.includes("schola")) {
          state.careerId = "menial_worker";
          state.careerHistory.push("menial_worker");
          addLog(state, "성년 노동 연령에 도달해 제국 시민으로서 첫 작업 배치를 받았다. 스탯을 키워 다양한 병종에 지원할 수 있다.", "career", null, { badge: "직무 편입" });
        }
      }

      // 19세 진입 시 스콜라 프로제니움 · 귀족 가문 수습 종료 자동 배치 (18세 1년간 minAge:18 기관 직접 지원 창구 보장 + 영구 child 고착 방지)
      if (state.age >= 19 && state.careerId === "child") {
        let gradCareerId = "pdf_trooper";
        let gradMsg = "스콜라 프로제니움 과정을 수료하고 행성 방위군(PDF) 기간병으로 배치되었다. 이제 커미사르·사이온·소로리타스·심문소 등 상위 진로를 노릴 수 있다.";
        if (state.tags.includes("heretic")) {
          gradCareerId = "chaos_cultist";
          gradMsg = "이미 이단 낙인이 찍혀 정규 제국 기관 입단이 막히자 지하 카오스 밀교단에 몸을 의탁했다.";
        } else if (state.tags.includes("schola")) {
          if (
            state.faith >= 55 &&
            state.stats.WP >= 38 &&
            !state.tags.includes("abhuman") &&
            !state.tags.includes("psyker") &&
            !state.tags.includes("navigator") &&
            !state.tags.includes("mutant_sanctioned")
          ) {
            gradCareerId = "ecclesiarchy_priest";
            gradMsg = "스콜라 프로제니움 신학 과정을 우수한 성적으로 수료해 에클레시아키 사제로 서품되었다.";
          } else if (state.stats.Int >= 38 && !state.tags.includes("abhuman")) {
            gradCareerId = "administratum";
            gradMsg = "스콜라 프로제니움 행정 과정을 수료해 아드미니스트라툼 서기관으로 임관했다.";
          }
        } else if (state.tags.includes("noble")) {
          if (!state.tags.includes("abhuman")) {
            gradCareerId = "administratum";
            gradMsg = "가문 수습 기간을 마치고 제국 아드미니스트라툼 서기관으로 정규 임관했다.";
          } else {
            gradCareerId = "pdf_trooper";
            gradMsg = "가문 수습 기간을 마치고 행성 방위군(PDF) 기간병으로 편입되었다.";
          }
        } else {
          gradCareerId = "menial_worker";
          gradMsg = "성년에 도달해 제국 시민으로서 정규 직무에 편입되었다.";
        }
        const gradCareer = getCareer(gradCareerId);
        state.careerId = gradCareer.id;
        if (!UNBOUND_CAREERS.has(gradCareer.id)) {
          state.lastCareerChangeYear = state.year;
        }
        if (!state.careerHistory.includes(gradCareer.id)) state.careerHistory.push(gradCareer.id);
        if (gradCareer.onJoin && gradCareer.onJoin.addTags) {
          for (const t of gradCareer.onJoin.addTags) {
            if (!state.tags.includes(t)) state.tags.push(t);
          }
        }
        addLog(state, gradMsg, "career", null, { badge: "졸업 배치" });
      }

      const activeCareer = getCareer(state.careerId);

      // 연간 스탯 성장 (초점 + 현재 병종 — 수확 체감 적용, 억지 하락 0건)
      for (const key of Object.keys(STAT_META)) {
        const fGain = (focus.statDelta && focus.statDelta[key]) || 0;
        const cGain = (activeCareer.annualGrowth && activeCareer.annualGrowth[key]) || 0;
        const raw = fGain + cGain;
        if (raw > 0) {
          applyDiminishedStatGain(state, key, raw, "passive");
        }
      }

      // 하이브리드 체력 회복 · 노화 양극화 보정 · 선천/후천/모성 특전
      const homeWorld = getWorld(state.homeWorldId || state.worldId);
      const lifeExp = computeLifeExpectancy(state);
      let baseNaturalHeal = state.age <= lifeExp * 0.72 ? 3 : 0;
      if (state.tags.includes("geneseed_compatible") && state.age <= lifeExp * 0.85) baseNaturalHeal += 1;
      if (homeWorld.id === "necromunda" && state.age <= lifeExp * 0.8) baseNaturalHeal += 1;
      if (state.tags.includes("chronic_toxins")) baseNaturalHeal = Math.max(0, baseNaturalHeal - 1);
      let focusHeal = focus.woundsDelta || 0;
      if (focusHeal > 0) {
        if (state.age > lifeExp * 0.95) focusHeal = 0;
        else if (state.age > lifeExp * 0.82) focusHeal = Math.floor(focusHeal * 0.5);
      }
      state.wounds = clamp(state.wounds + baseNaturalHeal + focusHeal, 0, state.maxWounds);
      const faithGain = (focus.faithDelta || 0) + (homeWorld.id === "ophelia7" && (focus.faithDelta || 0) > 0 ? 1 : 0);
      state.faith = clamp(state.faith + faithGain, 0, 100);
      const rawCorrDelta = (focus.corruptionDelta || 0) + (state.tags.includes("warp_scarred") ? 1 : 0);
      if (rawCorrDelta > 0) {
        const cappedRaw = state.age < 12 ? Math.min(rawCorrDelta, 2) : rawCorrDelta;
        let effCorrDelta = scalePositiveCorruption(state, cappedRaw);
        if (state.tags.includes("heretic") || state.tags.includes("chaos_aligned")) {
          if (state.corruption >= 92) effCorrDelta = 0;
          else if (state.corruption >= 80) effCorrDelta = Math.min(effCorrDelta, 2);
        }
        if (effCorrDelta > 0) state.corruption = clamp(state.corruption + effCorrDelta, 0, 100);
      } else if (rawCorrDelta < 0) {
        state.corruption = clamp(state.corruption + rawCorrDelta, 0, 100);
      }

      if (state.year >= 999 && !state.globalFlags.greatRiftOpened) {
        state.globalFlags.greatRiftOpened = true;
        syncImperialNihilus(state);
      }

      // 노화 처리 (기대수명 초과 시 점진적 비선형 노화, 초인은 절반 속도)
      if (state.age > lifeExp * 0.78) {
        const overRatio = (state.age - lifeExp * 0.78) / Math.max(10, lifeExp * 0.28);
        const isTranshuman = state.tags.includes("transhuman");
        const ageDamage = Math.max(1, Math.round((2.6 * overRatio + 3.2 * overRatio * overRatio) * (isTranshuman ? 0.45 : 1.0)));
        state.wounds = clamp(state.wounds - ageDamage, 0, state.maxWounds);
      }

      const nihilusHaz = state.tags.includes("imperial_nihilus") ? 0.008 : 0;
      let perkHazMult = 1.0;
      if (homeWorld.id === "catachan" && ((world.tags && (world.tags.includes("death") || world.tags.includes("feral"))))) perkHazMult *= 0.5;
      if (homeWorld.id === "armageddon") perkHazMult *= 0.85;
      if (state.tags.includes("battle_hardened")) perkHazMult *= 0.75;
      if (state.tags.includes("saint_spark") && state.faith >= 70) perkHazMult *= 0.8;
      const diffHazMult =
        state.difficulty === "grimdark"
          ? ["child", "menial_worker", "pdf_trooper", "astra_militarum"].includes(state.careerId)
            ? 1.55
            : 1.25
          : 1.0;
      const totalHazard = Math.max(
        0.002,
        (world.annualHazard + (activeCareer.hazardMod || 0) + nihilusHaz) *
          (focus.hazardMult || 1) *
          perkHazMult *
          diffHazMult
      );

      if (Math.random() < totalHazard * 2.0) {
        const rawDmg = randInt(5, 13);
        const dmg = -scaleWoundDamage(state, -rawDmg);
        state.wounds = clamp(state.wounds - dmg, 0, state.maxWounds);
        addLog(state, `${world.name}의 가혹한 환경과 직무 위험 속에 부상·질환을 입었다.`, "danger", null, {
          badge: "환경 위험",
          deltaText: `생명력 -${dmg}`
        });
      }
    }

    function captureAndRegisterEventCharacters(ev) {
      const chars = Array.isArray(ev && ev.characters) ? ev.characters : [];
      if (!chars.length) return null;
      const metList = Array.isArray(state.metCharacters) ? state.metCharacters : (state.metCharacters = []);
      const tags = Array.isArray(state.tags) ? state.tags : [];
      const previouslyMetCharacters = chars.filter(
        (cid) => metList.includes(cid) || tags.includes(`met_${cid}`)
      );
      for (const cid of chars) {
        if (!metList.includes(cid)) metList.push(cid);
      }
      return previouslyMetCharacters;
    }

    // 아스타르테스 드레드노트 긴급 발동 체크
    if (state.wounds <= 38 && state.wounds > 0 && state.tags.includes("astartes") && !state.tags.includes("dreadnought") && !state.seenEvents.includes("ev_dreadnought_choice")) {
      const dreadEv = EVENT_BY_ID.get("ev_dreadnought_choice");
      if (dreadEv) {
        state.seenEvents.push(dreadEv.id);
        const previouslyMetCharacters = captureAndRegisterEventCharacters(dreadEv);
        state.pendingEvent = Object.assign(
          { isTimeline: false },
          dreadEv,
          previouslyMetCharacters ? { previouslyMetCharacters } : null
        );
        return { status: "event", event: state.pendingEvent };
      }
    }

    // 사망 체크
    const lifeExpNow = computeLifeExpectancy(state);
    if (state.wounds <= 0) {
      const cause = state.age >= lifeExpNow * 0.85
        ? `향년 ${state.age}세, ${world.name}에서 노환과 오랜 상처 끝에 황제의 품으로 영면`
        : `${world.name}의 가혹한 환경과 과로·부상을 이기지 못하고 생을 마감`;
      finalizeDeath(state, cause);
      return { status: "dead" };
    }
    if (state.tags.includes("daemon_prince") && state.corruption >= 100) {
      state.corruption = 99;
    }
    if (isIncorruptibleState(state) && state.corruption >= 100) {
      state.corruption = 0;
    }
    if (state.corruption >= 100 && !state.tags.includes("daemon_prince") && !isIncorruptibleState(state)) {
      finalizeDeath(state, "워프 오염이 한계를 넘어 육신이 카오스 스폰으로 붕괴됨");
      return { status: "dead" };
    }

    const reqCtx = makeReqContext(state);

    // 1순위: 역사 연표(TIMELINE) 직접 체험 + 타 행성/성역 원격 아스트로패스 속보 전파
    for (const tl of DATA.TIMELINE) {
      const maxYear = tl.exactYear ? tl.year : (tl.endYear || tl.year + 1);
      if (state.year >= tl.year && state.year <= maxYear && !state.seenTimeline.includes(tl.id)) {
        if (checkReq(state, tl.filter, reqCtx)) {
          state.seenTimeline.push(tl.id);
          if (!state.heardNews.includes(tl.id)) state.heardNews.push(tl.id);
          const previouslyMetCharacters = captureAndRegisterEventCharacters(tl);
          state.pendingEvent = Object.assign(
            { isTimeline: true, category: "역사 사건" },
            tl,
            previouslyMetCharacters ? { previouslyMetCharacters } : null
          );
          return { status: "event", event: state.pendingEvent };
        }
      }
      if (
        isNewYear &&
        state.year === tl.year &&
        tl.dispatchText &&
        state.age >= 6 &&
        !state.seenTimeline.includes(tl.id) &&
        !state.heardNews.includes(tl.id) &&
        !reqCtx.worldTagSet.has("feral")
      ) {
        const reaches =
          tl.dispatchScope === "galaxy" ||
          (tl.dispatchScope === "sector" && (tl.dispatchSegmenta || []).includes(state.segmentum));
        if (reaches) {
          state.heardNews.push(tl.id);
          addLog(state, tl.dispatchText, "event", null, {
            badge: tl.dispatchScope === "galaxy" ? "은하 속보" : "성역 속보"
          });
        }
      }
    }

    // 1.5순위: 동적 승급 · 평행 횡단 · 최고위 추대 진로 제안 이벤트
    if (state.age >= 10) {
      const offerEv = createDynamicCareerOfferEvent(state, reqCtx);
      if (offerEv) {
        state.pendingEvent = offerEv;
        return { status: "event", event: state.pendingEvent };
      }
    }

    // 2순위: 동적 조건 이벤트(EVENTS) 발동 — 확률 선판정으로 미발동 분기(~72%)의 전체 스캔 생략!
    const eventChance = state.age >= 12 && state.age <= 18 ? 0.34 : 0.28;
    if (Math.random() < eventChance) {
      const countsMap = state.eventCounts || {};
      const seenSet = new Set(state.seenEvents || []);
      const recentEvs = state.recentEvents || [];
      const recentSet = new Set(recentEvs);
      const recentShortSet = new Set(recentEvs.slice(0, 6));
      const freshEvents = [];
      const shortFreshEvents = [];

      const buckets = getEventBuckets(state);
      for (let b = 0; b < buckets.length; b++) {
        const arr = buckets[b];
        for (let i = 0; i < arr.length; i++) {
          const ev = arr[i];
          if (ev.once && seenSet.has(ev.id)) continue;
          const limit = ev.once ? 1 : (ev.maxRepeats || 2);
          if ((countsMap[ev.id] || 0) >= limit) continue;
          if (!checkReq(state, ev.req, reqCtx)) continue;
          if (!recentSet.has(ev.id)) freshEvents.push(ev);
          if (!recentShortSet.has(ev.id)) shortFreshEvents.push(ev);
        }
      }

      const eventPool = freshEvents.length > 0 ? freshEvents : shortFreshEvents;
      if (eventPool.length > 0) {
        const hasChaosMark =
          reqCtx.tagSet.has("mark_khorne") ||
          reqCtx.tagSet.has("mark_tzeentch") ||
          reqCtx.tagSet.has("mark_nurgle") ||
          reqCtx.tagSet.has("mark_slaanesh");
        const needsChaosMark = reqCtx.tagSet.has("heretic") && !hasChaosMark;
        const alignInfo = getAlignmentInfo(state);
        const alignBoost = alignInfo.tier >= 3 ? 2.6 : alignInfo.tier === 2 ? 2.1 : 1.7;
        const weightedPool = eventPool.map((ev) => {
          let w = ev.weight || 15;
          const isWorldSpecific = ev.req && ev.req.anyWorlds && ev.req.anyWorlds.includes(state.worldId);
          const isCareerSpecific = ev.req && ev.req.anyCareers && ev.req.anyCareers.includes(state.careerId);
          const isPastContrast = ev.req && Array.isArray(ev.req.anyPastCareers) && ev.req.anyPastCareers.length > 0;
          const isChapterSpecific = ev.req && ev.req.anyChapters && state.chapterId && ev.req.anyChapters.includes(state.chapterId);
          const isEraSpecific = ev.req && (ev.req.minYear !== undefined || ev.req.maxYear !== undefined);
          const isNamedEncounter = Array.isArray(ev.characters) && ev.characters.length > 0;
          if (needsChaosMark && ev.id === "ev_chaos_whispers") w *= 5.0;
          else if (isChapterSpecific || isNamedEncounter) w *= 3.0;
          else if (isPastContrast) w *= 2.8;
          else if (isWorldSpecific || isCareerSpecific || isEraSpecific) w *= 2.6;
          if (ev.alignBias && alignInfo.dominant !== "neutral") {
            if (ev.alignBias === alignInfo.dominant) w *= alignBoost;
            else w *= 0.4;
          }
          if (state.difficulty === "grimdark" && ev.grimdarkMisfortune) {
            w *= 1.65;
          }
          return { item: ev, w };
        });
        const picked = pickWeighted(weightedPool, "w").item;
        if (picked.once) state.seenEvents.push(picked.id);
        state.eventCounts = countsMap;
        state.eventCounts[picked.id] = (state.eventCounts[picked.id] || 0) + 1;
        state.recentEvents = [picked.id, ...recentEvs].slice(0, 14);
        const previouslyMetCharacters = captureAndRegisterEventCharacters(picked);
        state.pendingEvent = Object.assign(
          { isTimeline: false },
          picked,
          previouslyMetCharacters ? { previouslyMetCharacters } : null
        );
        return { status: "event", event: state.pendingEvent };
      }
    }

    // 2.2순위: 100세+ 초장수자 전용 동적 순찰 · 유물 회수 · 패권 작전 풀
    if (state.age >= 100 && Math.random() < 0.25) {
      const centEv = createDynamicCentenarianEvent(state, reqCtx, {
        getWorld,
        getCareer,
        isIncorruptibleState
      });
      if (centEv) {
        state.pendingEvent = centEv;
        return { status: "event", event: state.pendingEvent };
      }
    }

    // 2.5순위: 업무 특성 및 계급에 따른 강제 파견 / 작전 배치 / 성간 이주 기회
    const curCareerObj = getCareer(state.careerId);
    const isForcedDuty = curCareerObj.transitTier === "forced" || curCareerObj.transitTier === "astartes_scout";
    const transitCooldown = isForcedDuty ? 5 : 7;
    const transitChance = isForcedDuty ? 0.10 : 0.05;
    if (state.age >= 16 && state.year - state.lastTravelYear >= transitCooldown && Math.random() < transitChance) {
      const transitEv = createDynamicTransitEvent(state);
      if (transitEv) {
        state.lastTravelYear = state.year;
        state.pendingEvent = transitEv;
        return { status: "event", event: state.pendingEvent };
      }
    }

    // 3순위: 본인 행성·직업·신분·시대에 딱 맞는 일상·부조리 연대기 기록
    applyChronicle(state, reqCtx);
    return { status: "ok", isNewYear };
  }


  function advanceYear(state) {
    // 1년 단위 호출 호환 래퍼 (다음 해 진입 또는 이벤트/사망까지 최대 3분기 진행)
    let res = { status: "ok" };
    for (let i = 0; i < 3; i++) {
      res = advanceQuarter(state);
      if (res.status !== "ok" || res.isNewYear) return res;
    }
    return res;
  }


  const careerActionsMod = createCareerActionsModule({
    DATA,
    getWorld,
    getCareer,
    getChapter,
    applyAlignDelta,
    randInt,
    getLivingSaintAspect,
    syncImperialNihilus,
    applyDiminishedStatGain,
    addLog,
    formatDeltaText,
    isIncorruptibleState,
    scalePositiveCorruption,
    scaleWoundDamage,
    canRetireHonorably,
    createHonorableEndingEvent,
    evaluateTravelAttempt
  });
  const {
    canUseRejuvenat,
    canUseAugmetics,
    canUsePenance,
    getCareerAction,
    performAction
  } = careerActionsMod;

  function getContextualOptions(state) {
    const reqCtx = makeReqContext(state);
    const curCareer = getCareer(state.careerId);
    const alignInfo = reqCtx.alignInfo || getAlignmentInfo(state);
    const history = state.careerHistory || [state.careerId];
    const declined = state.declinedCareers || {};
    const isSwornInstitution = !UNBOUND_CAREERS.has(curCareer.id);
    const lastChange = Number.isFinite(state.lastCareerChangeYear) ? state.lastCareerChangeYear : -999;
    const manualCareerCooldownLeft = Math.max(0, 2 - (state.year - lastChange));
    const careerRetryAfter = state.careerRetryAfter || {};
    const unlockedCareers = [];
    const readyEventCareers = [];
    const lockedCareers = [];

    for (let i = 0; i < DATA.CAREERS.length; i++) {
      const c = DATA.CAREERS[i];
      if (!c.selectable || c.id === state.careerId) continue;
      const blocked = isCareerTransitionBlocked(state, c, curCareer, alignInfo);
      const eligible = !blocked && checkReq(state, c.req, reqCtx);
      const alreadyHeld = history.includes(c.id);
      if (eligible && !alreadyHeld) {
        if (c.entryMode === "event") {
          const isCooling = declined[c.id] !== undefined && state.year - declined[c.id] < 8;
          const closedSourceBlocked = isClosedVowCrossBlocked(curCareer, c);
          const meaningful =
            curCareer.id === "child" ||
            c.tier > curCareer.tier ||
            (c.tier === curCareer.tier && (c.tree !== curCareer.tree || isDirectSuccessorReq(curCareer.id, c.req))) ||
            c.tree === "chaos";
          if (!isCooling && !closedSourceBlocked && meaningful) readyEventCareers.push(c);
          lockedCareers.push(c);
        } else if (isManualCareerAllowed(state, c, curCareer)) {
          unlockedCareers.push(c);
        } else {
          lockedCareers.push(c);
        }
      } else {
        lockedCareers.push(c);
      }
    }

    unlockedCareers.sort((a, b) => {
      const sa = a.tree === curCareer.tree ? 1 : 0;
      const sb = b.tree === curCareer.tree ? 1 : 0;
      if (sa !== sb) return sb - sa;
      return b.tier - a.tier;
    });
    readyEventCareers.sort((a, b) => b.tier - a.tier);

    // 앞으로 가장 가까운 추천 진로 3개 계산 (같은 트리 다음 계급 최우선, 정규 서약 기관은 타 기관 open 쇼핑 제외)
    const nearCareers = lockedCareers
      .filter((c) => {
        if (history.includes(c.id)) return false;
        if (readyEventCareers.includes(c)) return false;
        if (isCareerTransitionBlocked(state, c, curCareer, alignInfo)) return false;
        if (
          isSwornInstitution &&
          c.entryMode !== "event" &&
          c.tree !== curCareer.tree &&
          c.tree !== "chaos" &&
          !c.isTranshuman &&
          c.tree !== "psyker"
        ) {
          return false;
        }
        const r = c.req || {};
        if (r.gender && r.gender !== state.gender) return false;
        if (r.maxAge !== undefined && state.age > r.maxAge) return false;
        if (r.excludeTags && r.excludeTags.some((t) => reqCtx.tagSet.has(t))) return false;
        if (r.allTags && !r.allTags.every((t) => reqCtx.tagSet.has(t))) return false;
        if (r.anyCareers && !r.anyCareers.includes(state.careerId)) return false;
        if (curCareer.id !== "child" && c.tier < curCareer.tier && c.tree !== "chaos") return false;
        return true;
      })
      .sort((a, b) => {
        const sa = a.tree === curCareer.tree ? 0 : 1;
        const sb = b.tree === curCareer.tree ? 0 : 1;
        if (sa !== sb) return sa - sb;
        return a.tier - b.tier;
      })
      .slice(0, 3);

    const actions = [];
    const careerAct = getCareerAction(state);
    if (careerAct) {
      actions.push({
        id: careerAct.id,
        name: careerAct.name,
        desc: careerAct.desc,
        btnLabel: careerAct.btnLabel
      });
    }
    if (canUsePenance(state).ok) {
      const hasRuthless = normalizeAlignment(state).ruthless > 0;
      const penHeal = [];
      if (state.tags.includes("shell_shocked")) penHeal.push("포탄 충격");
      if (state.tags.includes("warp_scarred")) penHeal.push("워프 흉터");
      const corrPart = state.corruption > 0 ? "오염 -14, " : "";
      const healPart = penHeal.length ? `, ${penHeal.join("·")} 치유` : "";
      actions.push({
        id: "penance",
        name: "성당 고해와 정화 의식",
        desc: hasRuthless
          ? `${corrPart}신앙 +7, 암흑 -3, 교조 +1${healPart} (생명력 -7, 재사용 3년)`
          : `${corrPart}신앙 +7${healPart} (생명력 -7, 재사용 3년)`,
        btnLabel: "정화 고행 수행"
      });
    }
    const augChk = canUseAugmetics(state);
    if (augChk.ok) {
      const augHeal = [];
      if (state.tags.includes("crippled_limb")) augHeal.push("불구");
      if (state.tags.includes("chronic_toxins")) augHeal.push("만성 독소");
      const augHealPart = augHeal.length ? `, ${augHeal.join("·")} 치유` : "";
      actions.push({
        id: "augmetics",
        name: `기계교 의체 개조 (${state.augmeticsCount}/3)`,
        desc: `강인 +5, 백병 +3, 지성 +3, 기대수명 +18년${augHealPart} (${augChk.isMech ? "기계교 의례 · 무료" : "권위 -" + augChk.infCost + " 소모"}, 교섭 -2)`,
        btnLabel: "의체 시술 받기"
      });
    }
    const rejChk = canUseRejuvenat(state);
    if (rejChk.ok) {
      const rejHealPart = state.tags.includes("chronic_toxins") ? " · 만성 독소 치유" : "";
      actions.push({
        id: "rejuvenat",
        name: `리주버냇 수명 연장 시술 (${state.rejuvenatCount}/3)`,
        desc: `권위 -${rejChk.infCost} 소모 · 기대수명 +55년 · 생명력 +30 회복${rejHealPart}`,
        btnLabel: "수명 연장 신청"
      });
    }
    const retireChk = canRetireHonorably(state);
    if (retireChk.ok) {
      actions.push({
        id: "retire_honorable",
        name: retireChk.name,
        desc: retireChk.desc,
        btnLabel: retireChk.btnLabel
      });
    }

    return {
      unlockedCareers,
      readyEventCareers,
      lockedCareers,
      nearCareers,
      actions,
      isSwornInstitution,
      manualCareerCooldownLeft,
      careerRetryAfter,
      travelProfile: getTravelProfile(state),
      travelWorlds: getTravelCandidateWorlds(state)
    };
  }

  const Engine = {
    SAVE_VERSION,
    ALIGNMENT_KEYS,
    ALIGNMENT_META,
    SOCIAL_TIER_ORDER,
    SOCIAL_TIER_LABELS,
    LIFE_REALM_KEYS,
    LIFE_REALM_LABELS,
    BODY_CLASS_KEYS,
    BODY_CLASS_LABELS,
    FACTION_ENDING_KEYS,
    STAT_META,
    ACQUIRED_TRAIT_EFFECTS,
    ANOMALY_TAG_EFFECTS,
    FOCUSES,
    ERA_PRESETS,
    TAG_LABELS,
    clamp,
    normalizeAlignment,
    applyAlignDelta,
    getAlignmentInfo,
    getStratification,
    getStatCap: (state, statKey) => getStatCap(state, statKey, { getWorld, getCareer, getTrait }),
    getAllStatCaps: (state) => getAllStatCaps(state, { getWorld, getCareer, getTrait }),
    getAcquiredTraits,
    getAwakenedAnomalies,
    isTraitImmune: (state, traitTag) => isTraitImmune(state, traitTag, getCareer),
    applyDiminishedStatGain,
    computeCheckPreview,
    isUnboundCareer,
    isManualCareerAllowed,
    getAdmissionPreview,
    canAccessWorld,
    formatImperialYear,
    formatImperialDate,
    getWorld,
    getWorldShortTag,
    getOrigin,
    getTrait,
    getCareer,
    getCharacter,
    getChapter,
    getCareerAction,
    getCareerDisplayTitle,
    checkReq,
    describeReq,
    rollD100,
    computeLifeExpectancy,
    createCharacter,
    migrateState,
    advanceQuarter,
    advanceYear,
    resolvePendingChoice,
    attemptCareerChange,
    performAction,
    canRetireHonorably,
    createHonorableEndingEvent,
    resolveFactionEndingKey: (state, career) => resolveFactionEndingKey(state, career || (state ? getCareer(state.careerId) : null)),
    buildStatusSummary,
    evaluateLifeGrade,
    createWarpAnomalyTransitEvent,
    createDynamicCareerOfferEvent,
    createAssassinCladeEvent,
    getTravelProfile,
    evaluateTravelAttempt,
    getTravelCandidateWorlds,
    getContextualOptions
  };

  return Engine;
}

