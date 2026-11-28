// 캐릭터 생성 · 기대수명 · 시대 프리셋 · 저장 마이그레이션 모듈 (무순환 DAG · createEngine 분리)
import {
  FOCUSES,
  SAVE_VERSION,
  STAT_META,
  clamp,
  formatImperialYear,
  normalizeAlignment
} from "./formatters.js";
import { getStatCap } from "./statCaps.js";

export const ERA_PRESETS = [
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

export function createStateLifecycleModule(deps) {
  const {
    DATA,
    WORLD_BY_ID,
    ORIGIN_BY_ID,
    TRAIT_BY_ID,
    CAREER_BY_ID,
    CHAPTER_BY_ID,
    getWorld,
    getOrigin,
    getTrait,
    getCareer,
    randInt,
    pickWeighted,
    warnUnknownId,
    syncImperialNihilus,
    addLog
  } = deps;

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

    // 4. 출생 신분 (보이드본 출생 시 로그 트레이더 방계 가중치 우대)
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
      const weightedPool = basePool.map((o) => {
        let w = o.weight || 1;
        if (world.id === "voidborn" && o.id === "rogue_trader_scion") {
          w *= difficulty === "grimdark" ? 3.0 : 4.5;
        }
        if (difficulty === "grimdark") {
          const isCommoner = (o.tags || []).some((t) => t === "lowborn" || t === "citizen");
          if (isCommoner) w *= 2.6;
        }
        return { item: o, w };
      });
      origin = pickWeighted(weightedPool, "w").item;
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

    // 보이드본 출생 일원화: 오직 world.id === "voidborn" 출생자만 선천 voidborn 태그를 부여한다.
    const rawTags = [...(origin.tags || []), ...(trait.tags || [])];
    if (world.id === "voidborn") rawTags.push("voidborn");
    const tags = Array.from(new Set(rawTags));

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

  return {
    ERA_PRESETS,
    generateName,
    computeLifeExpectancy,
    createCharacter,
    migrateState
  };
}
