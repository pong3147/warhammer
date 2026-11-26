import {
  ALIGNMENT_KEYS,
  ALIGNMENT_META,
  BODY_CLASS_KEYS,
  BODY_CLASS_LABELS,
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
  computeLifeRealm,
  computeSocialTier,
  createCoreFormatters,
  formatImperialDate,
  formatImperialYear,
  getAlignmentInfo,
  getWorldShortTag,
  normalizeAlignment
} from "./formatters.js";

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
    const total = items.reduce((sum, item) => sum + (item[weightKey] || 1), 0);
    let r = Math.random() * total;
    for (const item of items) {
      r -= (item[weightKey] || 1);
      if (r <= 0) return item;
    }
    return items[items.length - 1];
  }

  const WORLD_TAG_SET_BY_ID = new Map((DATA.WORLDS || []).map((w) => [w.id, new Set(w.tags || [])]));
  const EVENT_BY_ID = new Map((DATA.EVENTS || []).map((e) => [e.id, e]));

  function buildPoolIndex(items) {
    const byChapter = new Map();
    const byWorld = new Map();
    const byCareer = new Map();
    const byTag = new Map();
    const general = [];
    const pushTo = (map, key, item) => {
      let arr = map.get(key);
      if (!arr) { arr = []; map.set(key, arr); }
      arr.push(item);
    };
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const req = item.req;
      if (req && Array.isArray(req.anyChapters) && req.anyChapters.length) {
        const uniq = new Set(req.anyChapters);
        uniq.forEach((k) => pushTo(byChapter, k, item));
      } else if (req && Array.isArray(req.anyWorlds) && req.anyWorlds.length) {
        const uniq = new Set(req.anyWorlds);
        uniq.forEach((k) => pushTo(byWorld, k, item));
      } else if (req && Array.isArray(req.anyCareers) && req.anyCareers.length) {
        const uniq = new Set(req.anyCareers);
        uniq.forEach((k) => pushTo(byCareer, k, item));
      } else if (req && Array.isArray(req.allTags) && req.allTags.length) {
        pushTo(byTag, req.allTags[0], item);
      } else {
        general.push(item);
      }
    }
    return { count: items.length, byChapter, byWorld, byCareer, byTag, general };
  }

  let EVENT_INDEX = buildPoolIndex(DATA.EVENTS || []);
  let CHRONICLE_INDEX = buildPoolIndex(DATA.CHRONICLES || []);

  function getEventBuckets(state) {
    if (EVENT_INDEX.count !== (DATA.EVENTS || []).length) EVENT_INDEX = buildPoolIndex(DATA.EVENTS || []);
    const buckets = [EVENT_INDEX.general];
    const bw = EVENT_INDEX.byWorld.get(state.worldId);
    if (bw) buckets.push(bw);
    const bc = EVENT_INDEX.byCareer.get(state.careerId);
    if (bc) buckets.push(bc);
    if (state.chapterId) {
      const bch = EVENT_INDEX.byChapter.get(state.chapterId);
      if (bch) buckets.push(bch);
    }
    const tags = state.tags || [];
    for (let i = 0; i < tags.length; i++) {
      const bt = EVENT_INDEX.byTag.get(tags[i]);
      if (bt) buckets.push(bt);
    }
    return buckets;
  }

  function getChronicleBuckets(state) {
    if (CHRONICLE_INDEX.count !== (DATA.CHRONICLES || []).length) CHRONICLE_INDEX = buildPoolIndex(DATA.CHRONICLES || []);
    const buckets = [CHRONICLE_INDEX.general];
    const bw = CHRONICLE_INDEX.byWorld.get(state.worldId);
    if (bw) buckets.push(bw);
    const bc = CHRONICLE_INDEX.byCareer.get(state.careerId);
    if (bc) buckets.push(bc);
    if (state.chapterId) {
      const bch = CHRONICLE_INDEX.byChapter.get(state.chapterId);
      if (bch) buckets.push(bch);
    }
    const tags = state.tags || [];
    for (let i = 0; i < tags.length; i++) {
      const bt = CHRONICLE_INDEX.byTag.get(tags[i]);
      if (bt) buckets.push(bt);
    }
    return buckets;
  }

  const SOCIAL_TIER_RANK = { underclass: 0, common: 1, elite: 2, apex: 3 };

  function getStratification(state) {
    const world = getWorld(state.worldId);
    const career = getCareer(state.careerId);
    const tagSet = new Set(state.tags || []);
    return {
      socialTier: computeSocialTier(state, career, tagSet),
      lifeRealm: computeLifeRealm(state, career, world, tagSet),
      bodyClass: computeBodyClass(state, career, tagSet)
    };
  }

  function makeReqContext(state) {
    const world = getWorld(state.worldId);
    const career = getCareer(state.careerId);
    const tagSet = new Set(state.tags || []);
    const align = normalizeAlignment(state);
    const alignInfo = getAlignmentInfo(state);
    return {
      world,
      career,
      worldTagSet: WORLD_TAG_SET_BY_ID.get(world.id) || new Set(world.tags || []),
      tagSet,
      pastCareerSet: new Set(state.careerHistory || [state.careerId]),
      align,
      alignInfo,
      alignDominant: alignInfo.dominant,
      socialTier: computeSocialTier(state, career, tagSet),
      lifeRealm: computeLifeRealm(state, career, world, tagSet),
      bodyClass: computeBodyClass(state, career, tagSet)
    };
  }

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

  function checkReq(state, req, ctx) {
    if (!req) return true;

    if (req.minAge !== undefined && state.age < req.minAge) return false;
    if (req.maxAge !== undefined && state.age > req.maxAge) return false;
    if (req.minYear !== undefined && state.year < req.minYear) return false;
    if (req.maxYear !== undefined && state.year > req.maxYear) return false;
    if (req.gender && state.gender !== req.gender) return false;
    if (req.minFaith !== undefined && state.faith < req.minFaith) return false;
    if (req.maxFaith !== undefined && state.faith > req.maxFaith) return false;
    if (req.minCorruption !== undefined && state.corruption < req.minCorruption) return false;
    if (req.maxCorruption !== undefined && state.corruption > req.maxCorruption) return false;
    if (req.minWounds !== undefined && state.wounds < req.minWounds) return false;
    if (req.maxWounds !== undefined && state.wounds > req.maxWounds) return false;

    if (req.anyCareers) {
      if (!req.anyCareers.includes(state.careerId)) return false;
    }

    if (req.excludeTrees || req.maxCareerTier !== undefined) {
      const careerObj = (ctx && ctx.career) || getCareer(state.careerId);
      if (req.excludeTrees && req.excludeTrees.includes(careerObj.tree)) return false;
      if (req.maxCareerTier !== undefined && (careerObj.tier || 0) > req.maxCareerTier) return false;
    }

    if (req.minSocialTier || req.maxSocialTier || req.anySocialTiers) {
      const stTier = (ctx && ctx.socialTier) || computeSocialTier(state, (ctx && ctx.career) || getCareer(state.careerId), ctx && ctx.tagSet);
      const rank = SOCIAL_TIER_RANK[stTier] ?? 1;
      if (req.minSocialTier && rank < (SOCIAL_TIER_RANK[req.minSocialTier] ?? 0)) return false;
      if (req.maxSocialTier && rank > (SOCIAL_TIER_RANK[req.maxSocialTier] ?? 3)) return false;
      if (req.anySocialTiers && !req.anySocialTiers.includes(stTier)) return false;
    }

    if (req.anyRealms || req.excludeRealms) {
      const realm = (ctx && ctx.lifeRealm) || computeLifeRealm(state, (ctx && ctx.career) || getCareer(state.careerId), (ctx && ctx.world) || getWorld(state.worldId), ctx && ctx.tagSet);
      if (req.anyRealms && !req.anyRealms.includes(realm)) return false;
      if (req.excludeRealms && req.excludeRealms.includes(realm)) return false;
    }

    if (req.anyBodyClasses || req.excludeBodyClasses) {
      const body = (ctx && ctx.bodyClass) || computeBodyClass(state, (ctx && ctx.career) || getCareer(state.careerId), ctx && ctx.tagSet);
      if (req.anyBodyClasses && !req.anyBodyClasses.includes(body)) return false;
      if (req.excludeBodyClasses && req.excludeBodyClasses.includes(body)) return false;
    }

    if (req.anyPastCareers) {
      const pastSet = ctx ? ctx.pastCareerSet : new Set(state.careerHistory || [state.careerId]);
      let ok = false;
      for (let i = 0; i < req.anyPastCareers.length; i++) {
        if (pastSet.has(req.anyPastCareers[i])) { ok = true; break; }
      }
      if (!ok) return false;
    }

    if (req.excludePastCareers) {
      const pastSet = ctx ? ctx.pastCareerSet : new Set(state.careerHistory || [state.careerId]);
      for (let i = 0; i < req.excludePastCareers.length; i++) {
        if (pastSet.has(req.excludePastCareers[i])) return false;
      }
    }

    if (req.anyChapters) {
      if (!state.chapterId || !req.anyChapters.includes(state.chapterId)) return false;
    }

    if (req.excludeChapters) {
      if (state.chapterId && req.excludeChapters.includes(state.chapterId)) return false;
    }

    if (req.anyWorlds) {
      if (!req.anyWorlds.includes(state.worldId)) return false;
    }

    if (req.anyHomeWorlds) {
      if (!req.anyHomeWorlds.includes(state.homeWorldId)) return false;
    }

    if (req.excludeWorlds) {
      if (req.excludeWorlds.includes(state.worldId)) return false;
    }

    if (req.excludeHomeWorlds) {
      if (req.excludeHomeWorlds.includes(state.homeWorldId)) return false;
    }

    if (req.anySegmenta) {
      if (!req.anySegmenta.includes(state.segmentum)) return false;
    }

    if (req.anyFocus) {
      if (!req.anyFocus.includes(state.focus)) return false;
    }

    if (req.greatRift !== undefined) {
      const opened = Boolean(state.globalFlags && state.globalFlags.greatRiftOpened);
      if (opened !== req.greatRift) return false;
    }

    if (req.stats) {
      for (const k in req.stats) {
        if ((state.stats[k] || 0) < req.stats[k]) return false;
      }
    }

    const tagSet = ctx ? ctx.tagSet : null;
    if (req.allTags) {
      for (let i = 0; i < req.allTags.length; i++) {
        const t = req.allTags[i];
        if (tagSet ? !tagSet.has(t) : !state.tags.includes(t)) return false;
      }
    }

    if (req.anyTags) {
      let ok = false;
      for (let i = 0; i < req.anyTags.length; i++) {
        const t = req.anyTags[i];
        if (tagSet ? tagSet.has(t) : state.tags.includes(t)) { ok = true; break; }
      }
      if (!ok) return false;
    }

    if (req.excludeTags) {
      for (let i = 0; i < req.excludeTags.length; i++) {
        const t = req.excludeTags[i];
        if (tagSet ? tagSet.has(t) : state.tags.includes(t)) return false;
      }
    }

    if (req.anyWorldTags || req.excludeWorldTags) {
      const wTagSet = ctx ? ctx.worldTagSet : (WORLD_TAG_SET_BY_ID.get(state.worldId) || new Set((getWorld(state.worldId).tags) || []));
      if (req.anyWorldTags) {
        let ok = false;
        for (let i = 0; i < req.anyWorldTags.length; i++) {
          if (wTagSet.has(req.anyWorldTags[i])) { ok = true; break; }
        }
        if (!ok) return false;
      }
      if (req.excludeWorldTags) {
        for (let i = 0; i < req.excludeWorldTags.length; i++) {
          if (wTagSet.has(req.excludeWorldTags[i])) return false;
        }
      }
    }

    if (req.minAlign || req.maxAlign || req.anyDominantAlign) {
      const al = ctx && ctx.align ? ctx.align : normalizeAlignment(state);
      if (req.minAlign) {
        for (const k in req.minAlign) {
          if ((al[k] || 0) < req.minAlign[k]) return false;
        }
      }
      if (req.maxAlign) {
        for (const k in req.maxAlign) {
          if ((al[k] || 0) > req.maxAlign[k]) return false;
        }
      }
      if (req.anyDominantAlign) {
        const dom = ctx && ctx.alignDominant ? ctx.alignDominant : getAlignmentInfo(state).dominant;
        if (!req.anyDominantAlign.includes(dom)) return false;
      }
    }

    if (req.or && Array.isArray(req.or)) {
      let ok = false;
      for (let i = 0; i < req.or.length; i++) {
        if (checkReq(state, req.or[i], ctx)) { ok = true; break; }
      }
      if (!ok) return false;
    }

    return true;
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
    if (cur >= 100) return 0;

    const career = getCareer(state.careerId);
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

    if (sourceType === "passive") {
      let mult = 1.0;
      if (cur < 55) mult = 1.0;
      else if (cur < 72) mult = isSpecialty ? 0.75 : 0.45;
      else if (cur < 85) mult = isSpecialty ? 0.50 : 0.20;
      else mult = ((career && career.tier >= 5 && isSpecialty) || (isEliteBody && isSpecialty) || isMechInt) ? 0.35 : 0;

      const eff = rawGain * mult;
      if (eff <= 0) return 0;
      const whole = Math.floor(eff);
      const frac = eff - whole;
      const gain = whole + (Math.random() < frac ? 1 : 0);
      if (gain <= 0) return 0;
      const next = clamp(cur + gain, 5, 100);
      state.stats[statKey] = next;
      return next - cur;
    }

    let mult = 1.0;
    if (sourceType === "join") {
      mult = cur >= 88 ? 0.75 : 1.0;
    } else {
      if (cur < 75) mult = 1.0;
      else if (cur < 88) mult = 0.75;
      else mult = 0.50;
    }

    const scaled = Math.max(1, Math.round(rawGain * mult));
    const next = clamp(cur + scaled, 5, 100);
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
    const modifiers = [];

    if (diff !== 0) {
      modifiers.push({ label: diff > 0 ? "상황 유리" : "난이도", value: diff });
    }

    const wounds = state && Number.isFinite(state.wounds) ? state.wounds : 100;
    if (wounds <= 25) {
      modifiers.push({ label: "중상", value: -16 });
    } else if (wounds <= 50) {
      modifiers.push({ label: "부상", value: -8 });
    }

    const corruption = state && Number.isFinite(state.corruption) ? state.corruption : 0;
    const isChaosCareer = Boolean(career && career.tree === "chaos");
    if (!tags.includes("daemon_prince") && !isChaosCareer) {
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
    const origin = getOrigin(state.originId);
    const career = getCareer(state.careerId);
    const tMod = clamp(Math.floor(((state.stats.T || 25) - 25) * 0.35), -8, 18);
    return Math.max(24, Math.round(
      world.baseLifeExpectancy +
      (origin.lifeMod || 0) +
      (career.lifeBonus || 0) +
      (state.extraLifeBonus || 0) +
      tMod
    ));
  }

  function createCharacter(config = {}) {
    const mode = config.mode || "random";

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
      origin = pickWeighted(eligibleOrigins.length ? eligibleOrigins : DATA.ORIGINS, "weight");
    }

    // 5. 선천 자질
    let trait;
    if (mode === "custom" && config.traitId && config.traitId !== "random") {
      if (!TRAIT_BY_ID.has(config.traitId)) warnUnknownId("traitId", config.traitId);
      trait = getTrait(config.traitId);
    } else {
      trait = pickWeighted(DATA.TRAITS, "weight");
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
    const name = (mode === "custom" && config.customName && config.customName.trim())
      ? config.customName.trim()
      : generateName(gender, world);

    const faith = clamp(48 + (origin.faithMod || 0) + (trait.faithBonus || 0), 5, 100);
    const corruption = clamp(trait.corruptionStart || 0, 0, 100);
    const maxWounds = 100;
    const wounds = clamp(82 + Math.floor((stats.T - 25) / 2), 65, 100);

    const state = {
      saveVersion: SAVE_VERSION,
      id: `soul_${Date.now()}_${randInt(100, 999)}`,
      mode,
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
    if (!raw || typeof raw !== "object" || !raw.id || !raw.stats || !Array.isArray(raw.logs)) {
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
    if (!FOCUSES[st.focus]) st.focus = "survival";
    st.quarter = clamp(Number(st.quarter) || 1, 1, 3);
    st.age = Math.max(0, Number(st.age) || 0);
    st.birthYear = Number.isFinite(st.birthYear) ? st.birthYear : 980;
    st.year = Number.isFinite(st.year) ? st.year : st.birthYear + st.age;
    st.maxWounds = Math.max(50, Number(st.maxWounds) || 100);
    st.wounds = clamp(Number.isFinite(st.wounds) ? st.wounds : st.maxWounds, 0, st.maxWounds);
    st.faith = clamp(Number.isFinite(st.faith) ? st.faith : 50, 0, 100);
    st.corruption = clamp(Number.isFinite(st.corruption) ? st.corruption : 0, 0, 100);
    st.alignment = normalizeAlignment(st);

    for (const key of Object.keys(STAT_META)) {
      if (!Number.isFinite(st.stats[key])) st.stats[key] = 25;
      else st.stats[key] = clamp(Math.round(st.stats[key]), 5, 100);
    }

    st.extraLifeBonus = Number(st.extraLifeBonus) || 0;
    st.rejuvenatCount = Number(st.rejuvenatCount) || 0;
    st.augmeticsCount = Number(st.augmeticsCount) || 0;
    st.lastRejuvenatAge = Number.isFinite(st.lastRejuvenatAge) ? st.lastRejuvenatAge : -99;
    st.lastAugmeticsAge = Number.isFinite(st.lastAugmeticsAge) ? st.lastAugmeticsAge : -99;
    st.lastPenanceYear = Number.isFinite(st.lastPenanceYear) ? st.lastPenanceYear : -999;
    st.lastTravelYear = Number.isFinite(st.lastTravelYear) ? st.lastTravelYear : -999;
    st.lastCareerActionYear = Number.isFinite(st.lastCareerActionYear) ? st.lastCareerActionYear : -999;
    st.lastCareerOfferYear = Number.isFinite(st.lastCareerOfferYear) ? st.lastCareerOfferYear : -999;
    st.lastCareerChangeYear = Number.isFinite(st.lastCareerChangeYear) ? st.lastCareerChangeYear : -999;
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
    return parts.join(" · ");
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

  function isIncorruptibleState(state) {
    const tags = (state && state.tags) || [];
    return tags.includes("custodes") || tags.includes("grey_knight") || tags.includes("living_saint");
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
    if (outcome.wounds) {
      state.wounds = clamp(state.wounds + outcome.wounds, 0, state.maxWounds);
    }
    if (outcome.faith) {
      state.faith = clamp(state.faith + outcome.faith, 0, 100);
    }
    if (outcome.corruption) {
      const incorruptible = isIncorruptibleState(state);
      if (!(incorruptible && outcome.corruption > 0)) {
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
    if (outcome.addTags) {
      for (const t of outcome.addTags) {
        if (!state.tags.includes(t)) state.tags.push(t);
        if (t.startsWith("met_")) {
          const cid = t.replace("met_", "");
          if (!state.metCharacters.includes(cid)) state.metCharacters.push(cid);
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
    const outcomeForDelta = appliedOutcomeStats ? Object.assign({}, outcome, { stats: appliedOutcomeStats }) : outcome;
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
      outcome = rollResult.success ? choice.success : choice.fail;
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
      for (const [k, delta] of Object.entries(eff.stats)) {
        if (state.stats[k] !== undefined) {
          const actual = applyDiminishedStatGain(state, k, delta, "passive");
          if (actual !== 0) appliedStats[k] = actual;
        }
      }
    }
    if (eff.wounds) {
      const floor = eff.wounds < 0 ? Math.min(state.wounds, 5) : 0;
      state.wounds = clamp(state.wounds + eff.wounds, floor, state.maxWounds);
    }
    if (eff.faith) {
      state.faith = clamp(state.faith + eff.faith, 0, 100);
    }
    if (eff.corruption) {
      const incorruptible = isIncorruptibleState(state);
      if (!(incorruptible && eff.corruption > 0)) {
        state.corruption = clamp(state.corruption + eff.corruption, 0, 99);
      }
    }
    if (eff.align) {
      applyAlignDelta(state, eff.align);
    }

    const effForDelta = appliedStats ? Object.assign({}, eff, { stats: appliedStats }) : eff;
    const deltaText = formatDeltaText(effForDelta);
    const kind = (eff.wounds && eff.wounds < 0) || (eff.corruption && eff.corruption > 0)
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
        } else if (state.tags.includes("mechanicus_blood")) {
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
          if (state.faith >= 55 && state.stats.WP >= 38 && !state.tags.includes("abhuman")) {
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

      // 하이브리드 체력 회복 · 노화 양극화 보정
      const lifeExp = computeLifeExpectancy(state);
      const baseNaturalHeal = state.age <= lifeExp * 0.72 ? 3 : 0;
      let focusHeal = focus.woundsDelta || 0;
      if (focusHeal > 0) {
        if (state.age > lifeExp * 0.95) focusHeal = 0;
        else if (state.age > lifeExp * 0.82) focusHeal = Math.floor(focusHeal * 0.5);
      }
      state.wounds = clamp(state.wounds + baseNaturalHeal + focusHeal, 0, state.maxWounds);
      state.faith = clamp(state.faith + (focus.faithDelta || 0), 0, 100);
      const rawCorrDelta = focus.corruptionDelta || 0;
      const incorruptible = isIncorruptibleState(state);
      if (rawCorrDelta > 0) {
        if (!incorruptible) {
          let effCorrDelta = state.age < 12 ? Math.min(rawCorrDelta, 2) : rawCorrDelta;
          if (state.tags.includes("heretic") || state.tags.includes("chaos_aligned")) {
            if (state.corruption >= 92) effCorrDelta = 0;
            else if (state.corruption >= 80) effCorrDelta = Math.min(effCorrDelta, 2);
          }
          state.corruption = clamp(state.corruption + effCorrDelta, 0, 100);
        }
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
      const totalHazard = Math.max(0.002, (world.annualHazard + (activeCareer.hazardMod || 0) + nihilusHaz) * (focus.hazardMult || 1));

      if (Math.random() < totalHazard * 2.0) {
        const dmg = randInt(5, 13);
        state.wounds = clamp(state.wounds - dmg, 0, state.maxWounds);
        addLog(state, `${world.name}의 가혹한 환경과 직무 위험 속에 부상·질환을 입었다.`, "danger", null, {
          badge: "환경 위험",
          deltaText: `생명력 -${dmg}`
        });
      }
    }

    // 아스타르테스 드레드노트 긴급 발동 체크
    if (state.wounds <= 38 && state.wounds > 0 && state.tags.includes("astartes") && !state.tags.includes("dreadnought") && !state.seenEvents.includes("ev_dreadnought_choice")) {
      const dreadEv = EVENT_BY_ID.get("ev_dreadnought_choice");
      if (dreadEv) {
        state.seenEvents.push(dreadEv.id);
        state.pendingEvent = Object.assign({ isTimeline: false }, dreadEv);
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
          if (tl.characters) {
            for (const cid of tl.characters) {
              if (!state.metCharacters.includes(cid)) state.metCharacters.push(cid);
            }
          }
          state.pendingEvent = Object.assign({ isTimeline: true, category: "역사 사건" }, tl);
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
          return { item: ev, w };
        });
        const picked = pickWeighted(weightedPool, "w").item;
        if (picked.once) state.seenEvents.push(picked.id);
        state.eventCounts = countsMap;
        state.eventCounts[picked.id] = (state.eventCounts[picked.id] || 0) + 1;
        state.recentEvents = [picked.id, ...recentEvs].slice(0, 14);
        if (picked.characters) {
          for (const cid of picked.characters) {
            if (!state.metCharacters.includes(cid)) state.metCharacters.push(cid);
          }
        }
        state.pendingEvent = Object.assign({ isTimeline: false }, picked);
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

  const UNBOUND_CAREERS = new Set([
    "child",
    "menial_worker",
    "underhive_ganger",
    "underhive_boss",
    "guild_artisan",
    "pdf_trooper"
  ]);

  function isUnboundCareer(careerId) {
    return UNBOUND_CAREERS.has(careerId);
  }

  function isDirectSuccessorReq(curId, req) {
    if (!req) return false;
    if (req.anyCareers && req.anyCareers.includes(curId)) return true;
    if (Array.isArray(req.or)) {
      for (let i = 0; i < req.or.length; i++) {
        if (isDirectSuccessorReq(curId, req.or[i])) return true;
      }
    }
    return false;
  }

  function isCareerTransitionBlocked(state, targetCareer, curCareer = null, alignInfo = null) {
    if (!state || !targetCareer) return true;
    const cur = curCareer || getCareer(state.careerId);
    const tags = state.tags || [];
    const curIsTranshuman = Boolean(cur.isTranshuman) || tags.includes("astartes") || tags.includes("custodes") || tags.includes("grey_knight") || tags.includes("daemon_prince") || tags.includes("living_saint");
    if (tags.includes("assassin") && targetCareer.tree !== "officio_assassinorum" && targetCareer.tree !== "chaos") return true;
    if (tags.includes("living_saint") && targetCareer.tree !== "living_saint") return true;
    if (tags.includes("navigator") && ["astartes", "grey_knights", "custodes", "sororitas"].includes(targetCareer.tree)) return true;
    if (cur.id !== "child" && curIsTranshuman && !targetCareer.isTranshuman && targetCareer.tree !== "chaos") return true;
    if (isIncorruptibleState(state) && targetCareer.tree === "chaos") return true;
    const aInfo = alignInfo || getAlignmentInfo(state);
    if (
      (targetCareer.id === "hive_crime_lord" || targetCareer.id === "underhive_boss") &&
      (aInfo.dominant === "humane" || aInfo.dominant === "dogmatic")
    ) return true;
    return false;
  }

  const CLOSED_VOW_TREES = new Set([
    "sororitas",
    "mechanicus",
    "navis_navigator",
    "imperial_knight",
    "psyker"
  ]);

  function isManualCareerAllowed(state, targetCareer, curCareer = null) {
    if (!state || !targetCareer || !targetCareer.selectable) return false;
    if (targetCareer.entryMode === "event") return false;
    const cur = curCareer || getCareer(state.careerId);
    if (!cur || cur.id === targetCareer.id) return false;
    const tags = state.tags || [];
    // 비구속 초년·민간·방위군 신분은 자격이 열리는 모든 open 직군에 자유 지원 가능
    if (UNBOUND_CAREERS.has(cur.id)) {
      return cur.id === "child" || targetCareer.tier >= cur.tier || targetCareer.tree === "chaos";
    }
    // 로그 트레이더 방계 혈손·직계 연계·항법사 가문은 폐쇄 서약 기관이 아닐 때(또는 항법사) 세네샬 전환 허용
    if (
      targetCareer.id === "rt_seneschal" &&
      targetCareer.tier >= cur.tier &&
      (
        cur.tree === "navis_navigator" ||
        (!CLOSED_VOW_TREES.has(cur.tree) && (isDirectSuccessorReq(cur.id, targetCareer.req) || tags.includes("rogue_trader_blood")))
      )
    ) {
      return true;
    }
    // 정규 서약 기관 복무 중에는 같은 트리 승급 · 카오스 · 초인 · 동급 이상 사이커만 직접 전환 허용 (타 기관 수평 이직 쇼핑 차단)
    if (targetCareer.tree === cur.tree && targetCareer.tier >= cur.tier) return true;
    if (targetCareer.tree === "chaos") return true;
    if (Boolean(targetCareer.isTranshuman)) return true;
    if (targetCareer.tree === "psyker" && targetCareer.tier >= cur.tier) return true;
    return false;
  }

  function getPrimaryAdmissionStat(career) {
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
    const tierPenalty = Math.max(0, (targetCareer.tier - 2) * 8);
    const raw = 58 + (statVal - reqMin) * 1.1 + pedigreeBonus - tierPenalty;
    const target = clamp(Math.round(raw), 40, 88);
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
    const curIsTranshuman = Boolean(cur.isTranshuman) || state.tags.includes("astartes") || state.tags.includes("custodes") || state.tags.includes("grey_knight") || state.tags.includes("daemon_prince") || state.tags.includes("living_saint");
    const alignInfo = getAlignmentInfo(state);

    const candidates = [];
    for (let i = 0; i < DATA.CAREERS.length; i++) {
      const c = DATA.CAREERS[i];
      if (!c.selectable || c.id === state.careerId || c.tier < 2) continue;
      if (history.includes(c.id)) continue;
      if (!options.ignoreCooldown && declined[c.id] !== undefined && state.year - declined[c.id] < 8) continue;
      if (c.id === "chaos_cultist" && cur.tier >= 4) continue;
      if (isCareerTransitionBlocked(state, c, cur, alignInfo)) continue;
      if (!checkReq(state, c.req, ctx)) continue;

      let isScoutOffer = false;
      let isDirectCrossLink = false;

      if (cur.id === "child") {
        if (!c.isTranshuman && c.tier < 3) continue;
      } else {
        if (curIsTranshuman && !c.isTranshuman) continue;
        const sameTree = c.tree === cur.tree;
        if (sameTree) {
          const directNext = c.tier > cur.tier || (c.tier === cur.tier && isDirectSuccessorReq(cur.id, c.req));
          if (!directNext) continue;
        } else {
          if (c.tier < cur.tier && c.tree !== "chaos") continue;
          isDirectCrossLink = isDirectSuccessorReq(cur.id, c.req);
          // 종신 폐쇄 서약 기관(소로리타스·기계교·항법사·기사 가문·사이커)은 정사적 예외(이단심문소·리빙 세인트·카오스·초인 승격·항법사->로그트레이더·직계 연계) 외 모든 타 기관 발탁·초빙 원천 차단
          const closedSourceBlocked =
            CLOSED_VOW_TREES.has(cur.tree) &&
            !isDirectCrossLink &&
            c.tree !== "inquisition" &&
            c.tree !== "living_saint" &&
            c.tree !== "chaos" &&
            !Boolean(c.isTranshuman) &&
            !(cur.tree === "navis_navigator" && c.tree === "rogue_trader");
          if (closedSourceBlocked) continue;

          const lateralAllowed =
            c.entryMode === "event" ||
            c.tree === "chaos" ||
            Boolean(c.isTranshuman) ||
            Boolean(c.allowLateralOffer);

          if (!lateralAllowed) {
            // 정규 서약 기관 복무 중 타 기관이 먼저 찾아오는 특별 초빙 · 차출 경로
            // 비혈통·비연계 외부인이 폐쇄 서약 기관으로 무분별하게 초빙되는 것도 차단
            const closedDestBlocked =
              !isDirectCrossLink &&
              (
                (c.tree === "mechanicus" && !state.tags.includes("mechanicus") && !state.tags.includes("mechanicus_blood")) ||
                (c.tree === "navis_navigator" && !state.tags.includes("navigator")) ||
                (c.tree === "imperial_knight" && !state.tags.includes("knight_blood")) ||
                (c.tree === "sororitas" && !state.tags.includes("schola") && !state.tags.includes("pious") && !state.tags.includes("saint_spark"))
              );
            const isAlignMatch =
              (alignInfo.dominant === "dogmatic" && ["commissariat", "sororitas", "arbites", "inquisition"].includes(c.tree)) ||
              (alignInfo.dominant === "humane" && ["ecclesiarchy", "inquisition"].includes(c.tree)) ||
              (alignInfo.dominant === "ruthless" && ["rogue_trader", "officio_assassinorum", "inquisition"].includes(c.tree));
            const isHighInqFit = c.id === "inquisition_acolyte" && state.stats.Int >= 45 && state.stats.WP >= 45;
            const scoutAllowed =
              !closedDestBlocked &&
              !UNBOUND_CAREERS.has(c.id) &&
              c.entryMode === "open" &&
              !curIsTranshuman &&
              c.tier >= cur.tier &&
              (
                (!UNBOUND_CAREERS.has(cur.id) && (state.stats.Inf >= 52 || isAlignMatch || isDirectCrossLink || isHighInqFit)) ||
                (cur.id === "pdf_trooper" && (isDirectCrossLink || isHighInqFit))
              );
            if (!scoutAllowed) continue;
            isScoutOffer = true;
          }
        }
      }

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
        w = isBlank ? 28 : 14;
        prob = isBlank ? 0.08 : 0.025;
      } else if (c.tier >= 6) {
        w = 35;
        prob = 0.025;
      } else if (Boolean(c.isTranshuman)) {
        w = 50;
        prob = 0.24;
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
      choices.push({
        label: `[시련 도전 · ${statMeta.name} 판정] ${tc.title}에 응해 ${nextTitle} 직위에 도전한다`,
        check: { stat: tc.stat, diff: tc.diff || 0 },
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

  function advanceYear(state) {
    // 1년 단위 호출 호환 래퍼 (다음 해 진입 또는 이벤트/사망까지 최대 3분기 진행)
    let res = { status: "ok" };
    for (let i = 0; i < 3; i++) {
      res = advanceQuarter(state);
      if (res.status !== "ok" || res.isNewYear) return res;
    }
    return res;
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
      applyOutcome(
        state,
        Object.assign({ text: `새로운 직책 [${getCareerDisplayTitle(state, career)}] 자리에 취임했다!` }, career.onJoin),
        null,
        "join"
      );
    } else {
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

  function canUseRejuvenat(state) {
    if (state.tags.includes("astartes") || state.tags.includes("custodes") || state.tags.includes("daemon_prince") || state.tags.includes("living_saint")) {
      return { ok: false, reason: "초인·불멸·성광 개조 신체는 일반 리주버냇 시술이 불필요하다." };
    }
    if (state.rejuvenatCount >= 3) return { ok: false, reason: "세포 한계에 도달해 더 이상 리주버냇 시술을 받을 수 없다." };
    if (state.age < 50) return { ok: false, reason: "50세 이후부터 수명 연장 시술이 가능하다." };
    const career = getCareer(state.careerId);
    const hasStatus = career.tier >= 3 || state.tags.includes("noble") || state.stats.Inf >= 58;
    if (!hasStatus || state.stats.Inf < 50) {
      return { ok: false, reason: "리주버냇은 고위 계급(Tier 3+)·귀족 및 권위 50+ 이상의 막대한 재력이 필요하다." };
    }
    if (state.age - state.lastRejuvenatAge < 15) {
      return { ok: false, reason: "이전 시술로부터 15년이 지나야 재시술할 수 있다." };
    }
    return { ok: true, infCost: 10 };
  }

  function canUseAugmetics(state) {
    if (state.tags.includes("daemon_prince") || state.tags.includes("living_saint")) {
      return { ok: false, reason: "불멸의 초월 육신에는 일반 기계 의체 개조가 무의미하다." };
    }
    if (state.augmeticsCount >= 3) return { ok: false, reason: "이미 3단계 생체 의체 개조를 완료했다." };
    const career = getCareer(state.careerId);
    const world = getWorld(state.worldId);
    const isMech = career.tree === "mechanicus" || state.tags.includes("mechanicus");

    if (isMech) {
      if (state.age < 16) return { ok: false, reason: "기계교 정식 의체 개조는 16세 이상부터 가능하다." };
      if (state.age - (state.lastAugmeticsAge || -99) < 8) return { ok: false, reason: "의체 적응을 위해 8년 간격이 필요하다." };
      return { ok: true, infCost: 0, isMech: true };
    }

    // 비기계교는 엄격한 성년·계급·경제력·환경 제한!
    if (state.age < 18) return { ok: false, reason: "비기계교 민간·군인의 의체 개조는 성년(18세+)부터 가능하다." };
    if ((state.worldId === "krieg" || world.tags.includes("feral")) && career.tier < 3) {
      return { ok: false, reason: "크리그 일반 병사 및 변방 야만 행성 주민에게는 고가 기계교 의체 시술이 허락되지 않는다." };
    }
    if (state.age - (state.lastAugmeticsAge || -99) < 10) {
      return { ok: false, reason: "이전 의체 시술 후 10년이 지나야 추가 개조할 수 있다." };
    }
    const isHighRank = career.tier >= 3 && state.stats.Inf >= 42;
    const isRichNoble = state.tags.includes("noble") && state.stats.Inf >= 55;
    const isInjuredVet = career.tier >= 2 && state.wounds <= 68 && state.stats.Inf >= 38;
    if (!isHighRank && !isRichNoble && !isInjuredVet) {
      return { ok: false, reason: "기계교 소속이 아니라면 고위 계급(Tier 3+, 권위 42+), 부유한 귀족(권위 55+), 또는 부상 재활 여건이 필요하다." };
    }
    return { ok: true, infCost: 6, isMech: false };
  }

  function canUsePenance(state) {
    if (state.age < 14) return { ok: false, reason: "14세 이상부터 성당 정화 고행을 수행할 수 있다." };
    if (state.corruption <= 0) return { ok: false, reason: "현재 영혼에 오염 흔적이 없다." };
    if (state.tags.includes("heretic")) return { ok: false, reason: "이미 이단자로 낙인찍혀 제국 성당에 출입할 수 없다." };
    const world = getWorld(state.worldId);
    if (world.tags.includes("feral")) return { ok: false, reason: "야만 행성에는 정식 국교 성당이 없다." };
    if (state.year - (state.lastPenanceYear || -999) < 3) return { ok: false, reason: "고행 후 3년이 지나야 다시 참회 의식을 올릴 수 있다." };
    return { ok: true };
  }

  function getCareerAction(state) {
    if (!state || !state.alive || state.age < 14 || state.careerId === "child") return null;
    if (state.year - (state.lastCareerActionYear || -999) < 4) return null;

    const career = getCareer(state.careerId);
    const ag = career.actionGroup || "civil";
    const chap = state.chapterId ? getChapter(state.chapterId) : null;

    if (ag === "astartes_master") {
      const chapPrefix = chap ? `[${chap.name}] ` : "";
      const cry = chap ? ` "${chap.battleCry}"` : "";
      return {
        id: "career_action",
        name: `${chapPrefix}요새 수도원 전쟁 평의회 · 성전 선포`,
        desc: "권위 +4, 지성 +3, 백병 +2, 의지 +2 (재사용 4년)",
        btnLabel: "챕터 평의회 주재",
        toastMsg: `${chapPrefix}챕터 전쟁 평의회를 주재했다.`,
        logText: `${chapPrefix}10개 중대장과 수석 채플린을 소집해 성역 방어 전략과 배틀 바지 출격령을 하달했다.${cry}`,
        effects: { stats: { Inf: 4, Int: 3, WS: 2, WP: 2 } }
      };
    }
    if (ag === "astartes") {
      const chapPrefix = chap ? `[${chap.name}] ` : "";
      const cry = chap ? ` "${chap.battleCry}"` : "";
      return {
        id: "career_action",
        name: `${chapPrefix}챕터 무기고 전투 교리 단련`,
        desc: "백병 +3, 사격 +3, 의지 +2 (재사용 4년)",
        btnLabel: "전투 교리 단련",
        toastMsg: `${chapPrefix}전투 교리 단련을 마쳤다.`,
        logText: `${chapPrefix}챕터 무기고에서 실전 볼터 사격과 근접 대련을 마쳤다.${cry}`,
        effects: { stats: { WS: 3, BS: 3, WP: 2 } }
      };
    }
    if (ag === "grey_knight") {
      return {
        id: "career_action",
        name: "타이탄 666 금서고 정화 명상",
        desc: "의지 +3, 백병 +2, 신앙 +6, 오염 -12 (재사용 4년)",
        btnLabel: "정화 명상 수행",
        toastMsg: "타이탄 정화 명상을 마쳤다.",
        logText: "은빛 네메시스 포스 무구를 정화하며 악마 진명 방어 술식을 연마했다.",
        effects: { stats: { WP: 3, WS: 2 }, faith: 6, corruption: -12 }
      };
    }
    if (ag === "custodes") {
      return {
        id: "career_action",
        name: "황궁 모의전 · 철학 강론",
        desc: "백병 +3, 지성 +3, 민첩 +2 (재사용 4년)",
        btnLabel: "황궁 연무 수행",
        toastMsg: "황궁 연무와 철학 강론을 마쳤다.",
        logText: "만 명의 수호자들과 실전 가디언 스피어 대련 및 고대 전략 철학을 논했다.",
        effects: { stats: { WS: 3, Int: 3, Ag: 2 } }
      };
    }
    if (ag === "high_lord") {
      return {
        id: "career_action",
        name: "세나토룸 임페리알리스 칙령 반포",
        desc: "권위 +4, 지성 +3, 교섭 +3 (재사용 4년)",
        btnLabel: "하이 로드 칙령 발동",
        toastMsg: "테라 원로원 칙령을 반포했다.",
        logText: "황궁 의회 세나토룸 임페리알리스에서 수십 개 성역의 십일조와 성전 군수 배분을 결정하는 제국 칙령에 서명했다.",
        effects: { stats: { Inf: 4, Int: 3, Fel: 3 } }
      };
    }
    if (ag === "governor") {
      return {
        id: "career_action",
        name: "행성 십일조 사열 · 귀족 의회 통치",
        desc: "권위 +4, 교섭 +3, 지성 +2 (재사용 4년)",
        btnLabel: "통치 사열 집행",
        toastMsg: "행성 십일조 사열과 의회 조율을 마쳤다.",
        logText: "첨탑 궁정에서 귀족 가문과 방위군 사령관들을 소집해 십일조 납부와 행성 방어 예산을 조율했다.",
        effects: { stats: { Inf: 4, Fel: 3, Int: 2 } }
      };
    }
    if (ag === "guard_troop") {
      return {
        id: "career_action",
        name: "야전 실탄 사격 · 참호 보강 훈련",
        desc: "사격 +3, 강인 +2, 생명력 -3 (재사용 4년)",
        btnLabel: "실탄 사격 훈련",
        toastMsg: "야전 실탄 훈련을 완료했다.",
        logText: "진흙 참호를 보강하고 라스건 과충전 영점 사격을 반복해 사격술을 끌어올렸다.",
        effects: { stats: { BS: 3, T: 2 }, wounds: -3 }
      };
    }
    if (ag === "guard_cmd") {
      return {
        id: "career_action",
        name: "전술 도상 훈련 · 정예 강하 사열",
        desc: "지성 +3, 교섭 +2, 권위 +2 (재사용 4년)",
        btnLabel: "전술 사열 집행",
        toastMsg: "전술 도상 훈련과 사열을 마쳤다.",
        logText: "지휘 막사에서 포병 화망과 강하 작전도를 재검토하며 부대 장악력을 높였다.",
        effects: { stats: { Int: 3, Fel: 2, Inf: 2 } }
      };
    }
    if (ag === "guard_high_cmd") {
      return {
        id: "career_action",
        name: "성계군 대작전 참모 회의 주재",
        desc: "지성 +3, 권위 +4, 교섭 +2 (재사용 4년)",
        btnLabel: "참모 회의 주재",
        toastMsg: "성계군 작전 참모 회의를 마쳤다.",
        logText: "홀로리스 전구 지도를 펼쳐 놓고 수십 개 기갑·보병 연대의 공세 축선과 보급선을 재편했다.",
        effects: { stats: { Int: 3, Inf: 4, Fel: 2 } }
      };
    }
    if (ag === "commissar") {
      return {
        id: "career_action",
        name: "연대 군기 감찰 · 사기 훈시",
        desc: "의지 +3, 교섭 +3, 권위 +2, 신앙 +4, 교조 +2 (재사용 4년)",
        btnLabel: "연대 감찰 실시",
        toastMsg: "연대 군기 감찰을 마쳤다.",
        logText: "검은 대제복 차림으로 최전선 참호를 순시하며 병사들의 나태를 일깨우고 사기를 다졌다.",
        effects: { stats: { WP: 3, Fel: 3, Inf: 2 }, faith: 4, align: { dogmatic: 2 } }
      };
    }
    if (ag === "sororitas") {
      return {
        id: "career_action",
        name: "성녀 철야 기도 · 볼터 축성식",
        desc: "의지 +3, 사격 +2, 신앙 +9, 오염 -8, 교조 +2 (재사용 4년)",
        btnLabel: "철야 축성식 집전",
        toastMsg: "성녀 철야 기도와 축성식을 마쳤다.",
        logText: "성유와 향불 속에서 볼터에 순결의 인장을 봉인하며 흔들림 없는 신앙을 다졌다.",
        effects: { stats: { WP: 3, BS: 2 }, faith: 9, corruption: -8, align: { dogmatic: 2 } }
      };
    }
    if (ag === "inquisition") {
      return {
        id: "career_action",
        name: "비밀 심문 · 지하 첩보망 해독",
        desc: "지성 +3, 권위 +3, 의지 +2, 오염 +2 (재사용 4년)",
        btnLabel: "비밀 첩보 해독",
        toastMsg: "심문소 암호 첩보를 해독했다.",
        logText: "암호화된 이단 결사 명단과 지하 정보원의 보고를 대조해 성계 내 음모를 파악했다.",
        effects: { stats: { Int: 3, Inf: 3, WP: 2 }, corruption: 2 }
      };
    }
    if (ag === "mechanicus") {
      return {
        id: "career_action",
        name: "누스피어 고대 데이터 해독 의례",
        desc: "지성 +4, 강인 +2, 권위 +1 (재사용 4년)",
        btnLabel: "누스피어 해독",
        toastMsg: "누스피어 데이터 해독 의례를 마쳤다.",
        logText: "이진법 찬가를 읊으며 기계교 데이터 저장소의 파손된 고대 설계도를 복구했다.",
        effects: { stats: { Int: 4, T: 2, Inf: 1 } }
      };
    }
    if (ag === "navy") {
      return {
        id: "career_action",
        name: "함대 기동 연산 · 보이드 조종 훈련",
        desc: "민첩 +3, 지성 +2, 사격 +2 (재사용 4년)",
        btnLabel: "보이드 훈련 수행",
        toastMsg: "보이드 기동 훈련을 완료했다.",
        logText: "소행성대 회피 기동과 현측 거포 탄도 계산 모의 훈련에서 우수한 성적을 거뒀다.",
        effects: { stats: { Ag: 3, Int: 2, BS: 2 } }
      };
    }
    if (ag === "arbites") {
      return {
        id: "career_action",
        name: "하층 구역 제국법 일제 검문",
        desc: "백병 +2, 사격 +2, 권위 +3, 생명력 -4, 교조 +2 (재사용 4년)",
        btnLabel: "일제 검문 출동",
        toastMsg: "제국법 일제 검문 작전을 마쳤다.",
        logText: "아르비테스 장갑차를 몰고 무법 구역을 급습해 불법 무기상과 탈세범을 대거 체포했다.",
        effects: { stats: { WS: 2, BS: 2, Inf: 3 }, wounds: -4, align: { dogmatic: 2 } }
      };
    }
    if (ag === "administratum") {
      return {
        id: "career_action",
        name: "십일조 장부 감사 · 인맥 로비",
        desc: "지성 +3, 권위 +3, 교섭 +1 (재사용 4년)",
        btnLabel: "장부 감사 수행",
        toastMsg: "십일조 장부 감사를 완료했다.",
        logText: "밀린 행성 십일조 서류 3,000권을 야간에 처리해 상급 아뎁트의 눈도장을 확실히 찍었다.",
        effects: { stats: { Int: 3, Inf: 3, Fel: 1 } }
      };
    }
    if (ag === "ecclesiarchy") {
      return {
        id: "career_action",
        name: "대성당 광장 야외 부흥 설교",
        desc: "교섭 +3, 의지 +2, 신앙 +9, 오염 -6 (재사용 4년)",
        btnLabel: "부흥 설교 집전",
        toastMsg: "대성당 야외 부흥 설교를 마쳤다.",
        logText: "수천 명의 순례자 앞에서 황제의 영광을 열변해 시민들의 불안을 신앙으로 승화시켰다.",
        effects: { stats: { Fel: 3, WP: 2 }, faith: 9, corruption: -6 }
      };
    }
    if (ag === "rogue_trader") {
      return {
        id: "career_action",
        name: "변경 성계 비밀 교역 · 영장 행사",
        desc: "권위 +4, 교섭 +3, 민첩 +1 (재사용 4년)",
        btnLabel: "비밀 교역 실행",
        toastMsg: "변경 성계 교역을 성사시켰다.",
        logText: "황제의 무역 영장을 앞세워 변방 총독들과 희귀 향신료·고대 유물 독점 계약을 체결했다.",
        effects: { stats: { Inf: 4, Fel: 3, Ag: 1 } }
      };
    }
    if (ag === "guild_magnate") {
      return {
        id: "career_action",
        name: "차티스트 상선 계약 · 길드 독점 조율",
        desc: "권위 +3, 교섭 +3, 지성 +2 (재사용 4년)",
        btnLabel: "상단 계약 체결",
        toastMsg: "성간 교역 독점 계약을 성사시켰다.",
        logText: "궤도 화물선 항로 지분과 매뉴팩토룸 원자재 독점 납품 계약을 체결해 가문 금고를 불렸다.",
        effects: { stats: { Inf: 3, Fel: 3, Int: 2 } }
      };
    }
    if (ag === "psyker") {
      return {
        id: "career_action",
        name: "황제의 타로 명상 · 정신 방벽 훈련",
        desc: "의지 +4, 지성 +2, 오염 -6 (재사용 4년)",
        btnLabel: "타로 명상 수행",
        toastMsg: "황제의 타로 명상을 마쳤다.",
        logText: "사이킥 억제 후드를 점검하며 워프의 잡음을 차단하고 황제의 타로 계시를 읽었다.",
        effects: { stats: { WP: 4, Int: 2 }, corruption: -6 }
      };
    }
    if (ag === "navigator") {
      return {
        id: "career_action",
        name: "아스트로노미칸 성도 측량 · 제3의 눈 조율",
        desc: "의지 +3, 지성 +3, 권위 +2, 오염 -4 (재사용 4년)",
        btnLabel: "워프 성도 측량",
        toastMsg: "아스트로노미칸 등불과 워프 조류를 측량했다.",
        logText: "항법탑의 황동 천구의 앞에서 제3의 눈을 열어 격동하는 워프 조류의 안전한 항로를 새로 기록했다.",
        effects: { stats: { WP: 3, Int: 3, Inf: 2 }, corruption: -4 }
      };
    }
    if (ag === "assassin") {
      return {
        id: "career_action",
        name: "신전 살상 의례 · 표적 동선 분석",
        desc: "민첩 +3, 백병 +2, 사격 +2, 의지 +2, 암흑 +2 (재사용 4년)",
        btnLabel: "살상 의례 수행",
        toastMsg: "암살 신전의 살상 의례와 표적 분석을 마쳤다.",
        logText: "정지장 보관소에서 무구와 독극물을 점검하며 제국 고위 표적의 경비 허점을 냉철하게 계산했다.",
        effects: { stats: { Ag: 3, WS: 2, BS: 2, WP: 2 }, align: { ruthless: 2 } }
      };
    }
    if (ag === "knight") {
      const isSquire = state.careerId === "knight_squire" && !state.tags.includes("knight_scion");
      return {
        id: "career_action",
        name: isSquire ? "헬름 메카니쿰 교감 · 아미저 무장 조율" : "스론 메카니쿰 교감 · 이온 실드 조율",
        desc: "백병 +3, 사격 +2, 의지 +3, 권위 +1 (재사용 4년)",
        btnLabel: isSquire ? "아미저 무장 조율" : "기사 장갑 조율",
        toastMsg: isSquire ? "헬름 메카니쿰 교감과 아미저 무장 점검을 마쳤다." : "스론 메카니쿰 교감과 무장 점검을 마쳤다.",
        logText: isSquire
          ? "사크리스탄 사제들의 향불 속에서 아미저의 헬름 메카니쿰과 리퍼 체인클리버의 신경 반응을 조율했다."
          : "사크리스탄 사제들의 향불 속에서 나이트 아머의 이온 실드와 선조 기계령의 기억을 조화시켰다.",
        effects: { stats: { WS: 3, BS: 2, WP: 3, Inf: 1 } }
      };
    }
    if (ag === "knight_lord") {
      return {
        id: "career_action",
        name: "기사 대의회 소집 · 기사단 출정 사열",
        desc: "권위 +4, 교섭 +3, 의지 +2, 백병 +2 (재사용 4년)",
        btnLabel: "기사 대의회 소집",
        toastMsg: "기사 가문 대의회와 출정 사열을 주재했다.",
        logText: "기사 행성의 깃발 아래 수십 기의 임페리얼 나이트 랜스를 사열하고 가문 간 동맹 서약을 갱신했다.",
        effects: { stats: { Inf: 4, Fel: 3, WP: 2, WS: 2 } }
      };
    }
    if (ag === "living_saint") {
      const aspect = getLivingSaintAspect(state);
      const isWrath = aspect === "wrath";
      const isVessel = state.careerId === "saint_vessel" && !state.tags.includes("living_saint");
      return {
        id: "career_action",
        name: isWrath ? "심판의 성광 현현 · 이단 정화 축복" : "자비의 성광 현현 · 전선 치유 축복",
        desc: isWrath
          ? "의지 +4, 백병 +3, 권위 +3, 신앙 +10, 오염 -12, 교조 +3 (재사용 4년)"
          : "의지 +4, 교섭 +3, 권위 +3, 신앙 +10, 오염 -12, 자비 +3, 생명력 +12 (재사용 4년)",
        btnLabel: "황금 성광 현현",
        toastMsg: isWrath ? "심판의 성광으로 전선의 이단과 어둠을 불태웠다." : "자비의 성광으로 절망에 빠진 장병과 피난민을 어루만졌다.",
        logText: isWrath
          ? (isVessel
              ? "황금빛 불꽃이 검과 두 손에 서리며 전선의 공포를 단숨에 몰아내고 이단의 그림자를 정화했다."
              : "황금빛 불꽃이 검과 날개에 서리며 전선의 공포를 단숨에 몰아내고 이단의 그림자를 정화했다.")
          : "따스한 황금빛 성광이 잿빛 전장을 감싸자 부상병의 고통이 잦아들고 병사들이 다시 눈물을 닦고 일어섰다.",
        effects: isWrath
          ? { stats: { WP: 4, WS: 3, Inf: 3 }, faith: 10, corruption: -12, align: { dogmatic: 3 } }
          : { stats: { WP: 4, Fel: 3, Inf: 3 }, wounds: 12, faith: 10, corruption: -12, align: { humane: 3 } }
      };
    }
    if (ag === "daemon_prince") {
      return {
        id: "career_action",
        name: "워프 폭풍 소환 · 악마 군세 사열",
        desc: "백병 +4, 의지 +4, 권위 +3, 신앙 -10, 암흑 +4 (재사용 4년)",
        btnLabel: "워프 권능 행사",
        toastMsg: "불멸의 워프 권능으로 악마 군세를 사열했다.",
        logText: "현실의 막을 찢고 암흑 신의 축복을 끌어내려 필멸자 성계에 공포의 징조를 새겼다.",
        effects: { stats: { WS: 4, WP: 4, Inf: 3 }, faith: -10, align: { ruthless: 4 } }
      };
    }
    if (ag === "chaos_csm") {
      return {
        id: "career_action",
        name: "배신자 워밴드 약탈 · 투기장 결투",
        desc: "백병 +4, 강인 +2, 권위 +2, 오염 +5, 암흑 +4 (재사용 4년)",
        btnLabel: "워밴드 약탈 출격",
        toastMsg: "배신자 워밴드 투기장 결투와 약탈을 마쳤다.",
        logText: "전함 투기장에서 도전자들을 제압하고 제국 보급 수송선을 습격해 탄약과 노예를 확보했다.",
        effects: { stats: { WS: 4, T: 2, Inf: 2 }, corruption: 5, faith: -5, align: { ruthless: 4 } }
      };
    }
    if (ag === "chaos_cult") {
      return {
        id: "career_action",
        name: "지하 암흑 제단 비밀 의식",
        desc: "의지 +3, 백병 +2, 오염 +7, 신앙 -6, 암흑 +3 (재사용 4년)",
        btnLabel: "암흑 의식 집전",
        toastMsg: "지하 제단의 비밀 의식을 마쳤다.",
        logText: "아르비테스의 눈을 피해 지하 폐허에서 금단의 주문을 읊으며 워프의 불경한 기운을 끌어당겼다.",
        effects: { stats: { WP: 3, WS: 2 }, corruption: 7, faith: -6, align: { ruthless: 3 } }
      };
    }
    if (ag === "ganger") {
      return {
        id: "career_action",
        name: "언더하이브 밀수 · 구역 순찰",
        desc: "민첩 +3, 백병 +2, 권위 +2, 생명력 -4, 암흑 +3 (재사용 4년)",
        btnLabel: "밀수 순찰 출동",
        toastMsg: "언더하이브 밀수 거래를 마쳤다.",
        logText: "하층 배수관 암시장에서 탄약과 정제수를 빼돌려 구역 내 입지를 넓혔다.",
        effects: { stats: { Ag: 3, WS: 2, Inf: 2 }, wounds: -4, align: { ruthless: 3 } }
      };
    }
    return {
      id: "career_action",
      name: "야간 연장 할당량 완수 · 길드 청탁",
      desc: "강인 +2, 권위 +2, 지성 +1, 생명력 -4 (재사용 4년)",
      btnLabel: "연장 작업 수행",
      toastMsg: "야간 연장 할당량을 완수했다.",
      logText: "기계 소음 속에서 연장 근무를 버텨 내며 작업반장과 길드 서기에게 작은 공로를 인정받았다.",
      effects: { stats: { T: 2, Inf: 2, Int: 1 }, wounds: -4 }
    };
  }

  function performAction(state, actionId, param) {
    if (!state.alive || state.pendingEvent) return { ok: false, msg: "사건을 먼저 해결해야 한다." };

    if (actionId === "career_action") {
      const act = getCareerAction(state);
      if (!act) return { ok: false, msg: "현재 직군 고유 행동을 수행할 수 없다 (재사용 대기 4년)." };
      state.lastCareerActionYear = state.year;
      const eff = act.effects || {};
      let appliedStats = null;
      if (eff.stats) {
        appliedStats = {};
        for (const [k, d] of Object.entries(eff.stats)) {
          if (state.stats[k] !== undefined) {
            const actual = applyDiminishedStatGain(state, k, d, "event");
            if (actual !== 0) appliedStats[k] = actual;
          }
        }
      }
      if (eff.wounds) {
        const floor = eff.wounds < 0 ? Math.min(state.wounds, 5) : 1;
        state.wounds = clamp(state.wounds + eff.wounds, floor, state.maxWounds);
      }
      if (eff.faith) state.faith = clamp(state.faith + eff.faith, 0, 100);
      if (eff.corruption) {
        if (!(eff.corruption > 0 && isIncorruptibleState(state))) {
          state.corruption = clamp(state.corruption + eff.corruption, 0, 99);
        }
      }
      if (eff.align) applyAlignDelta(state, eff.align);
      const effForDelta = appliedStats ? Object.assign({}, eff, { stats: appliedStats }) : eff;
      addLog(state, act.logText, "success", null, {
        badge: "직군 고유 행동",
        deltaText: formatDeltaText(effForDelta)
      });
      return { ok: true, msg: act.toastMsg };
    }

    if (actionId === "rejuvenat") {
      const chk = canUseRejuvenat(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };

      state.rejuvenatCount += 1;
      state.lastRejuvenatAge = state.age;
      state.extraLifeBonus += 55;
      state.stats.Inf = clamp(state.stats.Inf - chk.infCost, 5, 100);
      state.stats.T = clamp(state.stats.T + 4, 5, 100);
      state.wounds = clamp(state.wounds + 30, 1, state.maxWounds);
      if (!state.tags.includes("rejuvenat")) state.tags.push("rejuvenat");
      addLog(state, `막대한 재력과 인맥을 동원해 리주버냇 수명 연장 시술(${state.rejuvenatCount}/3회)을 받았다.`, "success", null, {
        badge: "수명 연장",
        deltaText: `기대수명 +55년 · 생명력 +30 · 권위 -${chk.infCost}`
      });
      return { ok: true };
    }

    if (actionId === "augmetics") {
      const chk = canUseAugmetics(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };

      state.augmeticsCount += 1;
      state.lastAugmeticsAge = state.age;
      if (chk.infCost) state.stats.Inf = clamp(state.stats.Inf - chk.infCost, 5, 100);
      state.stats.T = clamp(state.stats.T + 5, 5, 100);
      state.stats.WS = clamp(state.stats.WS + 3, 5, 100);
      state.stats.Int = clamp(state.stats.Int + 3, 5, 100);
      state.stats.Fel = clamp(state.stats.Fel - 2, 5, 100);
      state.maxWounds += 10;
      state.wounds = clamp(state.wounds + 15, 1, state.maxWounds);
      state.extraLifeBonus += 18;
      if (!state.tags.includes("bionic")) state.tags.push("bionic");
      const via = chk.isMech ? "기계교 성소의 교리 의례로" : "막대한 비용과 계급 특권을 들여";
      addLog(state, `${via} 생체 의체 개조(${state.augmeticsCount}/3단계)를 시술받았다.`, "success", null, {
        badge: "의체 개조",
        deltaText: `강인 +5 · 백병 +3 · 지성 +3${chk.infCost ? " · 권위 -" + chk.infCost : ""}`
      });
      return { ok: true };
    }

    if (actionId === "penance") {
      const chk = canUsePenance(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };

      state.lastPenanceYear = state.year;
      state.corruption = clamp(state.corruption - 14, 0, 100);
      state.faith = clamp(state.faith + 7, 0, 100);
      state.wounds = clamp(state.wounds - 7, 5, state.maxWounds);
      let deltaText = "오염 -14 · 신앙 +7 · 생명력 -7";
      if (normalizeAlignment(state).ruthless > 0) {
        applyAlignDelta(state, { ruthless: -3, dogmatic: 1 });
        deltaText += " · 암흑 -3 · 교조 +1";
      }
      addLog(state, "성당에서 혹독한 고행과 참회 기도를 올려 워프 오염을 정화했다.", "event", null, {
        badge: "정화 고행",
        deltaText
      });
      return { ok: true };
    }

    if (actionId === "travel") {
      const evalRes = evaluateTravelAttempt(state, param);
      if (!evalRes.valid) return { ok: false, msg: evalRes.reason || "이동할 수 없다." };

      const target = getWorld(param);
      state.lastTravelYear = state.year;

      if (!evalRes.autoApprove) {
        const roll = randInt(1, 100);
        const success = roll <= evalRes.chance;
        const rollMeta = {
          statKey: evalRes.statKey || "Inf",
          statName: evalRes.authority,
          target: evalRes.chance,
          roll,
          success,
          critSuccess: roll <= 5,
          critFail: roll >= 96,
          diff: 0
        };
        state.lastRoll = rollMeta;

        if (!success) {
          if (evalRes.denyStats) {
            for (const [k, d] of Object.entries(evalRes.denyStats)) {
              if (state.stats[k] !== undefined) state.stats[k] = clamp(state.stats[k] + d, 5, 100);
            }
          }
          if (evalRes.denyWounds) {
            state.wounds = clamp(state.wounds + evalRes.denyWounds, 5, state.maxWounds);
          }
          const denyText = evalRes.denyText || "상부의 불허로 성간 이동 청원이 기각되었다.";
          addLog(state, `[${target.name} 이동 청원 기각] ${denyText}`, "danger", rollMeta, { badge: "이동 불허" });
          return { ok: false, denied: true, roll: rollMeta, msg: `이동 청원 기각! (주사위 ${roll} / 승인율 ${evalRes.chance}%)` };
        }
      }

      state.worldId = target.id;
      if (!state.visitedWorlds.includes(target.id)) state.visitedWorlds.push(target.id);
      if (target.segmentum !== "random") state.segmentum = target.segmentum;

      syncImperialNihilus(state);

      const modeText = evalRes.autoApprove ? "자율 지휘권으로" : `(${evalRes.authority} 승인)을 받아`;
      addLog(
        state,
        `${modeText} 워프 항해를 거쳐 [${target.name}](${DATA.SEGMENTA[state.segmentum].name})(으)로 파견·이동했다.`,
        "career",
        evalRes.autoApprove ? null : state.lastRoll,
        { badge: "성간 이동" }
      );
      return { ok: true, target, autoApprove: evalRes.autoApprove };
    }

    if (actionId === "retire_honorable") {
      const chk = canRetireHonorably(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };
      const ev = createHonorableEndingEvent(state);
      state.pendingEvent = ev;
      return { ok: true, openedEvent: ev, msg: "생애를 갈무리할 최후의 결단을 열었다." };
    }

    return { ok: false, msg: "알 수 없는 행동이다." };
  }

  function canRetireHonorably(state) {
    if (!state || !state.alive || state.careerId === "child") {
      return { ok: false, reason: "성년 직무 편입 후 100세 이상, 최고위 계급 55세 이상, 또는 기대수명 85% 도달 시 생애를 명예롭게 마감할 수 있다." };
    }
    const career = getCareer(state.careerId);
    const lifeExp = computeLifeExpectancy(state);
    const isCentenarian = state.age >= 100;
    const isApexVeteran = career.tier >= 6 && state.age >= 55;
    const isElderTwilight = state.age >= 65 && state.age >= Math.floor(lifeExp * 0.85);
    if (!isCentenarian && !isApexVeteran && !isElderTwilight) {
      return { ok: false, reason: "아직 생애를 마감할 고령이나 최고위 정점에 이르지 않았다." };
    }

    const tags = state.tags || [];
    if (tags.includes("daemon_prince") || state.careerId === "daemon_prince") {
      return {
        ok: true,
        name: "위대한 게임 영구 승천 (생애 마감)",
        desc: "필멸의 은하를 뒤로하고 워프 심연의 영원한 전장으로 물러나 영혼의 전당에 기록을 남긴다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "chaos" || tags.includes("heretic")) {
      return {
        ok: true,
        name: "공포의 눈 최후 약탈 원정 (생애 마감)",
        desc: "남은 워밴드를 이끌고 대균열 심연으로 마지막 항해에 나서 배교의 연대기를 완결한다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "living_saint" || tags.includes("living_saint")) {
      return {
        ok: true,
        name: "황금 성광으로의 승화 (생애 마감)",
        desc: "필멸의 은하에 기적의 빛을 남기고 황금 옥좌의 부름에 응해 성광 속으로 영원히 승화한다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "custodes" || tags.includes("custodes")) {
      return {
        ok: true,
        name: "황제의 눈 은퇴 의식 (생애 마감)",
        desc: "황금 갑주를 무기고에 반납하고 제국 변방의 은밀한 감시자로 물러나 생애를 명예롭게 갈무리한다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (tags.includes("dreadnought")) {
      return {
        ok: true,
        name: "강철 석관의 영원한 안식 (생애 마감)",
        desc: "수세기의 봉사를 마치고 챕터 영웅의 전당에서 영구 동면에 들어 생애를 명예롭게 마감한다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "astartes" || career.tree === "grey_knights" || tags.includes("astartes") || tags.includes("grey_knight")) {
      return {
        ok: true,
        name: "최후의 영광스러운 성전 출정 (생애 마감)",
        desc: "노쇠한 육신으로 제국 최전선에 마지막 돌격을 감행해 영혼의 전당에 불멸의 이름을 새긴다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "imperial_knight" || tags.includes("imperial_knight")) {
      return {
        ok: true,
        name: "스론 메카니쿰 영원한 안치 (생애 마감)",
        desc: "후계자에게 기사 갑주와 가문의 맹세를 물려주고 선조들의 기억 속으로 명예롭게 합일한다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "officio_assassinorum" || tags.includes("assassin")) {
      return {
        ok: true,
        name: "테라 비밀 신전 영구 동면 (생애 마감)",
        desc: "모든 표적 장부를 봉인하고 이름 없는 정지장 관 속으로 들어가 영원한 침묵의 휴식에 든다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "navis_navigator" || tags.includes("navigator")) {
      return {
        ok: true,
        name: "항법사 성소 최후의 성도 봉헌 (생애 마감)",
        desc: "일생 동안 측량한 워프 항로와 성도를 가문 대서고에 남기고 파테르노바의 품으로 물러난다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    if (career.tree === "mechanicus" || tags.includes("magos")) {
      return {
        ok: true,
        name: "대서고 데이터 합일 승화 (생애 마감)",
        desc: "축적한 지식과 기억을 기계교 성소 코지테이터에 영구 이관하고 옴니시아의 품으로 든다.",
        btnLabel: "최후의 결단 열기"
      };
    }
    return {
      ok: true,
      name: "명예로운 퇴임과 생애 갈무리 (생애 마감)",
      desc: "후계자에게 직책과 유산을 물려주고 황제의 품으로 평온히 물러나 영혼의 전당에 기록을 남긴다.",
      btnLabel: "최후의 결단 열기"
    };
  }

  function createHonorableEndingEvent(state) {
    const career = getCareer(state.careerId);
    const titleStr = getCareerDisplayTitle(state, career);
    const tags = state.tags || [];
    const world = getWorld(state.worldId);
    let title = "생애의 갈무리 — 명예로운 퇴임의 시간";
    let text = `어느덧 ${state.age}세에 이른 [${titleStr}]로서 수십 년에 걸친 제국의 풍파를 버텨 냈다. 지금 직책을 내려놓고 후대에 기록을 남길 것인지, 아니면 끝까지 현역으로 싸울 것인지 스스로 결정할 때다.`;
    let retireLabel = "후계자에게 직책을 물려주고 명예롭게 생애를 마감한다 (영혼의 전당 등재)";
    let retireText = `긴 세월의 소임을 마친 [${titleStr}]은(는) 모든 인장과 기록을 정돈한 뒤 조용히 눈을 감았다. 그대의 생애는 제국 영혼의 전당에 영구히 등재되었다.`;
    let retireCause = `향년 ${state.age}세, ${world.name}에서 긴 소임을 완수하고 명예로운 퇴임 끝에 황제의 품으로 영면`;

    if (tags.includes("daemon_prince") || state.careerId === "daemon_prince") {
      title = "생애의 갈무리 — 위대한 게임으로의 영구 승천";
      text = `${state.age}세의 세월 동안 필멸의 은하를 짓밟아 온 불멸의 데몬 프린스 앞에 워프 심연의 거대한 균열이 열렸다. 물질 우주에서의 연대기를 여기서 갈무리하고 암흑 신들의 위대한 게임으로 영구히 승천할 수 있다.`;
      retireLabel = "물질 우주를 뒤로하고 워프 심연의 위대한 게임으로 영구 승천한다 (영혼의 전당 등재)";
      retireText = "현실의 막 너머로 걸어 들어간 그대의 이름은 오르도 말레우스 금서고에 영원한 재앙으로 각인되었다.";
      retireCause = `향년 ${state.age}세, 물질 우주의 연대기를 마치고 워프 심연의 위대한 게임으로 영구 승천`;
    } else if (career.tree === "chaos" || tags.includes("heretic")) {
      title = "생애의 갈무리 — 공포의 눈 최후 원정";
      text = `${state.age}세에 이른 배교자 [${titleStr}]은(는) 이미 은하에 지워지지 않을 피의 흔적을 남겼다. 워밴드의 기함을 몰아 대균열의 가장 깊은 폭풍 속으로 최후의 약탈 원정을 떠나 연대기를 마감할 수 있다.`;
      retireLabel = "대균열 심연으로 최후의 약탈 원정을 떠난다 (영혼의 전당 등재)";
      retireText = "붉은 워프의 폭풍 속으로 사라진 그대의 기함은 훗날 제국 함대의 공포스러운 전설로만 전해졌다.";
      retireCause = `향년 ${state.age}세, 대균열 심연으로 최후의 배신자 원정을 떠나 행방불명`;
    } else if (career.tree === "living_saint" || tags.includes("living_saint")) {
      title = "생애의 갈무리 — 황금 성광으로의 승화";
      text = `${state.age}세의 세월 동안 어둠 속 전장을 밝혀 온 [${titleStr}] 위로 아스트로노미칸의 따스한 빛기둥이 내려앉았다. 지금 이 순간 필멸의 형상을 내려놓고 황제의 곁으로 돌아가, 언젠가 인류가 가장 절망할 때 다시 강림할 약속으로 남을 수 있다.`;
      retireLabel = "찬란한 황금 성광 속으로 승화해 황제의 곁으로 돌아간다 (영혼의 전당 등재)";
      retireText = "황금빛 깃털과 향기만 남긴 채 그대의 형상이 빛 속으로 녹아들었다. 모든 성당의 종이 저절로 울려 퍼졌다.";
      retireCause = `향년 ${state.age}세, ${world.name} 전선 위에 황금 성광을 남기고 황제의 곁으로 영구 승화`;
    } else if (career.tree === "custodes" || tags.includes("custodes")) {
      title = "생애의 갈무리 — 황제의 눈으로 물러나다";
      text = `${state.age}세에 이른 쿠스토데스로서 반사 속도가 단 0.01초 무뎌졌음을 스스로 깨달았다. 만 명의 수호자 전통에 따라 황금 갑주와 가디언 스피어를 무기고에 반납하고, 제국 변방의 위협을 감시하는 '황제의 눈'으로 은퇴할 수 있다.`;
      retireLabel = "황금 갑주를 반납하고 '황제의 눈'으로 명예 은퇴한다 (영혼의 전당 등재)";
      retireText = "황궁 영원의 회랑에 그대의 수백 개 진명이 새겨졌고, 그대는 검은 망토를 걸친 채 황금 옥좌의 그림자 너머로 조용히 떠났다.";
      retireCause = `향년 ${state.age}세, 쿠스토데스 전통에 따라 황금 갑주를 반납하고 황제의 눈으로 명예 은퇴`;
    } else if (tags.includes("dreadnought")) {
      title = "생애의 갈무리 — 강철 석관의 영원한 안식";
      text = `수세기를 싸워 온 고대 드레드노트의 동력로가 고요히 숨을 고른다. 테크마린과 채플린이 지켜보는 가운데 챕터 영웅의 전당으로 돌아가 영원한 안식에 들 수 있다.`;
      retireLabel = "챕터 성소의 제단에서 영원한 안식에 든다 (영혼의 전당 등재)";
      retireText = "성유와 향불 속에서 고대인의 사르코파구스가 영원히 잠들었다. 챕터의 모든 형제들이 무릎을 꿇고 경례를 올렸다.";
      retireCause = `향년 ${state.age}세, 챕터 영웅의 전당에서 강철 석관의 영원한 안식에 듦`;
    } else if (career.tree === "astartes" || career.tree === "grey_knights" || tags.includes("astartes") || tags.includes("grey_knight")) {
      title = "생애의 갈무리 — 최후의 영광스러운 성전";
      text = `${state.age}세의 장구한 세월 동안 수백 개의 전장을 누빈 [${titleStr}] 앞에 마지막 결전의 부름이 울린다. 후배 형제들에게 챕터의 미래를 맡기고 가장 치열한 전선으로 최후의 출정에 나설 수 있다.`;
      retireLabel = "형제들에게 유산을 맡기고 최후의 영광스러운 성전에 출정한다 (영혼의 전당 등재)";
      retireText = "황제의 이름을 외치며 적진 한가운데로 돌격한 그대의 마지막 전투는 수천 년 동안 챕터의 서사시로 노래되었다.";
      retireCause = `향년 ${state.age}세, 최전선 최후의 성전에서 수많은 적을 쓰러뜨리고 영광스럽게 순직`;
    } else if (career.tree === "imperial_knight" || tags.includes("imperial_knight")) {
      title = "생애의 갈무리 — 스론 메카니쿰의 선조가 되다";
      text = `${state.age}세에 이른 [${titleStr}]의 기사 갑주가 사크리스탄 성소로 돌아왔다. 젊은 후계자에게 고삐를 넘겨주고 스론 메카니쿰 속 선조들의 메아리로 영원히 자리 잡을 시간이다.`;
      retireLabel = "후계자에게 기사 갑주를 물려주고 선조들의 기억 속으로 안식한다 (영혼의 전당 등재)";
      retireText = "사크리스탄의 축성 종소리 속에 그대의 인장이 기사 갑주의 제단에 봉안되었고, 다음 세대 조종사의 정신 속에 그대의 지혜가 깃들었다.";
      retireCause = `향년 ${state.age}세, 기사 가문 성소에 갑주를 봉납하고 스론 메카니쿰의 선조로 영면`;
    } else if (career.tree === "officio_assassinorum" || tags.includes("assassin")) {
      title = "생애의 갈무리 — 이름 없는 정지장 관의 침묵";
      text = `${state.age}세의 세월 동안 제국의 적들을 그림자 속에서 지워 온 [${titleStr}]의 임무 장부가 마지막 줄에 다다랐다. 테라 비밀 신전의 영구 정지장 관에 몸을 눕혀 영원한 침묵으로 생애를 닫을 수 있다.`;
      retireLabel = "표적 장부를 봉인하고 테라 비밀 신전의 영구 정지장 관에 든다 (영혼의 전당 등재)";
      retireText = "차가운 정지장 뚜껑이 닫히며 어떤 공식 기록에도 남지 않은 위대한 암살자의 연대기가 완결되었다.";
      retireCause = `향년 ${state.age}세, 오피시오 아사시노룸 비밀 신전의 영구 정지장 관에 안치되어 생애 마감`;
    } else if (career.tree === "navis_navigator" || tags.includes("navigator")) {
      title = "생애의 갈무리 — 최후의 워프 성도 봉헌";
      text = `${state.age}세의 세월 동안 아스트로노미칸의 빛을 따라 은하를 가로질러 온 [${titleStr}]의 제3의 눈이 깊은 평온을 맞았다. 가문 대서고에 모든 항로 성도를 봉헌하고 항법사 궁정에서 조용히 눈을 감을 수 있다.`;
      retireLabel = "가문 대서고에 워프 성도를 봉헌하고 명예롭게 은퇴한다 (영혼의 전당 등재)";
      retireText = "그대가 남긴 황금 항로도는 수백 년 동안 제국 함대와 상선들을 워프의 폭풍에서 지켜 냈다.";
      retireCause = `향년 ${state.age}세, 나비스 노빌리테 대서고에 최후의 성도를 봉헌하고 파테르노바의 품으로 영면`;
    } else if (career.tree === "mechanicus" || tags.includes("magos")) {
      title = "생애의 갈무리 — 대서고 데이터 합일 의식";
      text = `${state.age}세 동안 축적한 연산 기록과 지식의 총합이 임계점에 도달했다. 육신의 껍질을 내려놓고 화성 대서고의 신성한 코지테이터와 영구히 합일해 옴니시아의 기록으로 남을 수 있다.`;
      retireLabel = "기억과 지식을 대서고에 봉헌하고 옴니시아와 합일한다 (영혼의 전당 등재)";
      retireText = "이진법 찬가가 성소를 울리는 가운데 그대의 모든 지혜가 신성한 데이터 저장소에 영구 각인되었다.";
      retireCause = `향년 ${state.age}세, 기계교 대서고에 전 생애의 연산 기록을 봉헌하고 옴니시아와 합일`;
    }

    return {
      id: `dyn_honorable_end_${state.year}`,
      isTimeline: false,
      isHonorableEnding: true,
      category: "생애의 갈무리",
      reqLabel: `${state.age}세 · 명예 생애 마감`,
      title,
      text,
      choices: [
        {
          label: retireLabel,
          effect: {
            text: retireText,
            instantDeath: retireCause
          }
        },
        {
          label: "아직 바칠 사명이 남아 있다. 생애를 계속 이어 간다",
          effect: {
            text: "아직 물러날 때가 아니라고 다짐하고 다시 앞을 향해 걸음을 내디뎠다.",
            stats: { WP: 1 }
          }
        }
      ],
      source: "Imperium Vita Chronicle / Eyes of the Emperor & Chapter Lore"
    };
  }

  function buildStatusSummary(state) {
    if (!state) return "진행 중인 생애가 없다.";
    const world = getWorld(state.worldId);
    const focus = FOCUSES[state.focus] || FOCUSES.survival;
    const careerTitle = getCareerDisplayTitle(state);
    const lifeExp = computeLifeExpectancy(state);
    const alignInfo = getAlignmentInfo(state);
    const parts = [
      `${state.name}, ${state.age}세, ${formatImperialDate(state.year, state.quarter)}.`,
      `직책 ${careerTitle}, 현재 행성 ${world.name}.`,
      `생명력 ${state.wounds}/${state.maxWounds}, 기대수명 약 ${lifeExp}세, 황제 신앙 ${state.faith}, 워프 오염 ${state.corruption}.`,
      `도덕 성향 ${alignInfo.fullLabel}, ${alignInfo.detail}.`,
      `삶의 초점: ${focus.name}.`
    ];
    if (!state.alive) {
      parts.push(`사망 상태: ${state.deathCause || "생애 종료"}.`);
      return parts.join(" ");
    }
    if (state.pendingEvent) {
      parts.push(`현재 진행 중인 사건: ${state.pendingEvent.title}.`);
      return parts.join(" ");
    }
    const ctx = getContextualOptions(state);
    if (ctx.unlockedCareers.length > 0) {
      const names = ctx.unlockedCareers.slice(0, 2).map((c) => getCareerDisplayTitle(state, c)).join(", ");
      parts.push(`즉시 지원 가능한 진로 ${ctx.unlockedCareers.length}종: ${names}.`);
    } else if (ctx.readyEventCareers.length > 0) {
      const names = ctx.readyEventCareers.slice(0, 2).map((c) => getCareerDisplayTitle(state, c)).join(", ");
      parts.push(`발탁 이벤트 대기 중인 상위 진로 ${ctx.readyEventCareers.length}종: ${names}.`);
    } else if (ctx.nearCareers.length > 0) {
      const next = ctx.nearCareers[0];
      parts.push(`다음 목표 진로 ${next.name}, 필요 조건: ${describeReq(next.req) || "조건 없음"}.`);
    }
    return parts.join(" ");
  }

  function buildObituaryEpilogue(state, mode) {
    const tags = state.tags || [];
    const met = state.metCharacters || [];
    const alignInfo = getAlignmentInfo(state);
    const hasAnyBond =
      tags.includes("bond_heir") ||
      tags.includes("bond_family") ||
      tags.includes("bond_comrade") ||
      tags.includes("bond_mentor") ||
      tags.includes("bond_rival");

    if (mode === "spawn") {
      const spawnLines = [];
      if (hasAnyBond) {
        spawnLines.push("과거 맺었던 인연들마저 이단심문소의 기억 소거 속에 흔적 없이 지워졌다.");
      }
      if (alignInfo.dominant === "ruthless") {
        spawnLines.push("끝없는 탐욕과 무자비한 야망이 부른 참혹한 귀결이었다.");
      }
      return spawnLines.join(" ");
    }

    if (mode === "heretic") {
      const hereticLines = [];
      if (hasAnyBond) {
        hereticLines.push("남겨진 인연들 또한 그대의 배교 기록 앞에서 침묵하거나 뿔뿔이 흩어졌다.");
      }
      if (alignInfo.dominant === "ruthless") {
        hereticLines.push("권력과 약탈을 위해서라면 무엇이든 팔아넘겼던 냉혹한 삶은 결국 심연의 법칙으로 귀결되었다.");
      } else if (alignInfo.dominant === "humane") {
        hereticLines.push("제국의 폭정에 맞서 약자를 지키려던 연민마저 암흑의 속삭임에 뒤틀려 반역의 낙인으로 남았다.");
      } else if (alignInfo.dominant === "dogmatic") {
        hereticLines.push("끝없는 광신과 규율에 대한 집착이 도리어 오만과 배교의 낭떠러지로 그대를 밀어 넣었다.");
      }
      return hereticLines.join(" ");
    }

    const lines = [];

    if (tags.includes("bond_heir") && tags.includes("bond_family")) {
      lines.push("장성한 자녀와 배우자가 그대가 남긴 낡은 유품을 품에 안고 험난한 제국의 다음 세대를 이어 나갔다.");
    } else if (tags.includes("bond_heir")) {
      lines.push("그대의 피와 가르침을 물려받은 자녀가 성당의 촛불 아래 그대의 이름을 조용히 기렸다.");
    } else if (tags.includes("bond_family")) {
      lines.push("홀로 남은 배우자가 등불 아래 그대의 낡은 인식표와 반지를 고이 간직하며 긴 밤을 버텼다.");
    } else if (tags.includes("bond_comrade")) {
      lines.push("포화를 함께 견뎠던 옛 전우가 빈 술잔 하나를 더 채워 두고 그대의 몫까지 살아남으리라 맹세했다.");
    } else if (tags.includes("bond_mentor")) {
      lines.push("옛 스승의 낡은 수첩 여백에 그대의 마지막 발자취가 경건한 추모 문장으로 남았다.");
    } else if (tags.includes("bond_rival")) {
      lines.push("평생을 겨루었던 숙명의 정적만이 그대의 부고 앞에서 말없이 모자를 벗고 잔을 기울였다.");
    }

    const isSecretGuardian = tags.includes("grey_knight") || tags.includes("custodes") || tags.includes("sister_of_silence") || tags.includes("assassin");
    if (alignInfo.dominant === "humane") {
      if (isSecretGuardian) {
        lines.push("이름조차 세상에 남길 수 없는 비밀의 사명 속에서도, 필멸의 생명을 아끼던 그대의 조용한 절제는 동료 형제들의 기억 속에 남았다.");
      } else if (state.faith >= 60) {
        lines.push("황제의 자비로운 손길을 몸소 증명한 그대의 선행은 하층 구역의 등불 같은 전설로 구전되었다.");
      } else {
        lines.push("냉혹한 제국의 톱니바퀴 속에서도 끝내 인간적 양심을 버리지 않은 드문 영혼으로 조용히 기억되었다.");
      }
    } else if (alignInfo.dominant === "dogmatic") {
      if (state.faith >= 60) {
        lines.push("일말의 타협도 허용하지 않았던 철혈의 신앙과 교조는 이단자들에게 영원한 공포의 본보기로 남았다.");
      } else {
        lines.push("오직 제국법과 규율만을 잣대로 삼았던 서릿발 같은 생애는 두려움 섞인 경외 속에 기록되었다.");
      }
    } else if (alignInfo.dominant === "ruthless") {
      if (state.corruption < 35) {
        lines.push("워프의 유혹에 빠지지 않고도 순수한 탐욕과 냉혹한 수완만으로 제국의 정글을 지배했던 세속적 악인의 표본이었다.");
      } else {
        lines.push("수단과 방법을 가리지 않았던 암흑의 행적은 이단심문소 비밀 문서고의 짙은 의혹 속에 봉인되었다.");
      }
    }

    const directMet = tags.filter((t) => t.startsWith("met_")).map((t) => t.slice(4));
    const epilogueMet = directMet.length > 0 ? directMet : met;
    if (epilogueMet.length > 0) {
      if (epilogueMet.includes("guilliman") || epilogueMet.includes("lion")) {
        lines.push("살아 돌아온 프라이마크를 두 눈으로 친견했던 목격자의 기록으로 성역 서고에 별도 주석이 달렸다.");
      } else if (epilogueMet.includes("trazyn")) {
        lines.push("솔렘나스 무한 박물관의 정지장 전시 목록 한 줄에 그대의 흔적이 기묘하게 기록되었다는 소문이 은하 외곽을 떠돌았다.");
      } else if (epilogueMet.includes("kaldor_draigo")) {
        lines.push("제국 공식 역사서에서는 지워졌으나, 타이탄의 극비 서고에 그대가 마주한 은빛 방랑자와 금지된 진실의 증언이 봉인되었다.");
      } else if (epilogueMet.includes("kryptman")) {
        lines.push("제국 공식 역사서에서는 지워졌으나, 이단심문소 오르도 제노스의 극비 서고에 그대가 마주한 방화선의 진실과 증언이 봉인되었다.");
      } else if (epilogueMet.includes("abaddon") || epilogueMet.includes("ghazghkull") || epilogueMet.includes("mortarion")) {
        lines.push("은하 최악의 대적자를 마주하고도 끝내 버텨 냈던 생존자의 증언은 후대 전술 교범의 귀중한 사료로 남았다.");
      } else if (epilogueMet.includes("cain") || epilogueMet.includes("amberley_vail")) {
        lines.push("후일 이단심문소 기록보관소의 비밀 회고록 각주에 그대의 짧은 활약상이 뜻밖의 유머와 함께 수록되었다.");
      } else if (
        epilogueMet.includes("gaunt") ||
        epilogueMet.includes("yarrick") ||
        epilogueMet.includes("creed") ||
        epilogueMet.includes("grimaldus") ||
        epilogueMet.includes("macharius") ||
        epilogueMet.includes("ravensburg") ||
        epilogueMet.includes("canis_rex") ||
        epilogueMet.includes("morvenn_vahl")
      ) {
        lines.push("전장의 살아 있는 전설과 어깨를 나란히 했던 참전 이력이 추모비의 가장 높은 줄에 새겨졌다.");
      } else {
        const ch = getCharacter(epilogueMet[0]);
        if (ch) {
          lines.push(`생전에 ${ch.name}의 그림자를 직접 스쳐 지나갔던 희귀한 증인으로서 그대의 이름이 기록 끝에 병기되었다.`);
        }
      }
    }

    return lines.join(" ");
  }

  function evaluateLifeGrade(state) {
    const tags = state.tags || [];
    const career = getCareer(state.careerId);

    const withEpilogue = (res, mode = "loyal") => {
      const extra = buildObituaryEpilogue(state, mode);
      return extra ? { ...res, verdict: `${res.verdict} ${extra}` } : res;
    };

    const chaosGodNames = [];
    if (tags.includes("mark_khorne")) chaosGodNames.push("코른");
    if (tags.includes("mark_tzeentch")) chaosGodNames.push("젠취");
    if (tags.includes("mark_nurgle")) chaosGodNames.push("너글");
    if (tags.includes("mark_slaanesh")) chaosGodNames.push("슬라네쉬");

    if (tags.includes("daemon_prince") || state.careerId === "daemon_prince") {
      const patron = chaosGodNames.length ? `${chaosGodNames.join("·")}의 ` : "암흑 사대신의 ";
      return withEpilogue({
        rank: "APOTHEOSIS — DAEMON PRINCE BANISHED",
        title: `${patron}불멸 데몬 프린스 워프 추방 기록`,
        verdict: "필멸의 육신은 끝내 파괴되었으나 영혼은 죽지 않았다. 그대의 이름은 오르도 말레우스 금서고의 가장 깊은 철제 금고에 새겨졌으며, 수백 년 뒤 워프의 균열 너머로 다시 돌아올 것이다."
      }, "heretic");
    }

    if (state.corruption >= 100) {
      return withEpilogue({
        rank: "CHAOS SPAWN TERMINATED",
        title: "뒤틀린 변이체 정화 기록",
        verdict: "워프의 축복을 감당하지 못해 육신과 이성이 카오스 스폰으로 붕괴했다. 이단심문소 정화반이 흔적조차 남기지 않고 소각했다."
      }, "spawn");
    }

    if (tags.includes("chaos_lord") || tags.includes("renegade_marine")) {
      const title = tags.includes("chaos_lord") ? "배신자 군단의 공포 — 카오스 로드 최후" : "거짓 황제를 등진 배신자 아스타르테스";
      return withEpilogue({
        rank: "EXCOMMUNICATE TRAITORIS — LONG WAR",
        title,
        verdict: `${chaosGodNames.length ? `${chaosGodNames.join("·")}의 축복을 품고 ` : ""}수많은 제국 성계를 불태운 타락한 천사가 마침내 쓰러졌다. 과거 소속 챕터는 그대의 진명을 석비에서 영구히 지워 버렸다.`
      }, "heretic");
    }

    if ((tags.includes("heretic") || state.corruption >= 65) && chaosGodNames.length > 0) {
      return withEpilogue({
        rank: "DAMNATUS — CHAMPION OF RUIN",
        title: `${chaosGodNames[0]}의 낙인이 찍힌 배교자`,
        verdict: `암흑 신 ${chaosGodNames.join("·")}의 속삭임에 영혼을 내어 준 배교자였다. 오르도 헤레티쿠스의 칙령에 따라 생애 기록 전체가 금서고에 영구 봉인되었다.`
      }, "heretic");
    }

    if (
      tags.includes("heretic") ||
      state.corruption >= 65 ||
      (tags.includes("wanted_by_inquisition") &&
        !tags.includes("high_lord_terra") &&
        !tags.includes("living_saint") &&
        !tags.includes("custodes") &&
        !tags.includes("grey_knight"))
    ) {
      return withEpilogue({
        rank: "EXCOMMUNICATE TRAITORIS",
        title: "이단 기록 말소 대상",
        verdict: "오르도 헤레티쿠스 명령에 따라 본 개체의 생애 기록은 영구 봉인 및 소각 처리되었다."
      }, "heretic");
    }

    const score =
      career.tier * 22 +
      state.seenTimeline.length * 14 +
      state.metCharacters.length * 10 +
      Math.floor(state.age * 0.4) +
      Math.floor(state.stats.Inf * 0.5);

    if (tags.includes("high_lord_terra")) {
      return withEpilogue({
        rank: "SENATORUM IMPERIALIS — HIGH LORD OF TERRA",
        title: `테라의 하이 로드 · ${getCareerShortName(state.careerId)}`,
        verdict: "인류제국 100만 행성과 수천조 영혼의 운명을 황궁 의회에서 직접 재단했던 열두 지배자 가운데 한 명이었다. 황금 옥좌의 대리인으로서 남긴 칙령들은 수천 년 동안 제국의 법전으로 남았다."
      });
    }

    if (tags.includes("living_saint") || state.careerId === "living_saint") {
      const saintNoun = state.gender === "female" ? "성녀" : "성인";
      const aspect = getLivingSaintAspect(state);
      const isMercy = aspect === "mercy";
      const isWrath = aspect === "wrath";
      return withEpilogue({
        rank: "IMPERIAL LIVING SAINT — GOLDEN APOTHEOSIS",
        title: isMercy
          ? `자비의 성광을 비춘 살아 있는 ${saintNoun}`
          : isWrath
          ? `심판의 불꽃을 내린 살아 있는 ${saintNoun}`
          : `황금 날개의 살아 있는 ${saintNoun}`,
        verdict: isMercy
          ? "가장 깊은 어둠 속에서도 피난민과 부상병의 손을 놓지 않고 자비의 기적을 현현시켰던 불멸의 등불이었다. 인류가 다시 절망에 잠길 때 그대의 황금빛 날개가 어김없이 내려올 것이다."
          : isWrath
          ? "타협 없는 성광의 불길로 악마와 배교의 군세를 잿더미로 만들었던 황제의 살아 있는 심판자였다. 오펠리아 VII과 테라 대성당의 종이 그대의 이름을 영원히 기린다."
          : `필멸의 한계를 넘어 황제의 기적을 전장에 직접 구현했던 살아 있는 ${saintNoun === "성녀" ? "성녀였다" : "성인이었다"}. 시노드 대성당의 황금 성인전 첫머리에 그대의 전설이 영구 봉안되었다.`
      });
    }

    if (tags.includes("warmaster") || state.careerId === "warmaster") {
      return withEpilogue({
        rank: "WARMASTER OF THE IMPERIAL CRUSADE",
        title: "은하를 정복한 대성전 워마스터",
        verdict: "수억 명의 장병과 전함을 이끌고 암흑의 성계에 황제의 깃발을 꽂았던 불세출의 총사령관이었다. 성역의 모든 군사 사관학교가 그대의 전역을 영원한 교범으로 기린다."
      });
    }

    if (tags.includes("dreadnought")) {
      return withEpilogue({
        rank: "ETERNAL SLUMBER OF THE ANCIENT",
        title: "강철 석관의 영원한 안식",
        verdict: `육신이 스러진 뒤에도 고대 드레드노트 석관 속에서 싸워 온 ${state.chapterName || "아스타르테스"}의 영웅이 마침내 영면에 들었다. 챕터 영웅의 전당에 불멸의 이름이 새겨졌다.`
      });
    }

    if (tags.includes("chapter_master") || state.careerId === "chapter_master") {
      return withEpilogue({
        rank: "LORD OF THE CHAPTER — ETERNAL GUARDIAN",
        title: `${state.chapterName || "아스타르테스"}의 위대한 챕터 마스터`,
        verdict: "천 명의 죽음의 천사와 요새 수도원을 이끌며 수세기의 암흑을 버텨 낸 불멸의 군주였다. 그대의 유품 갑주와 무구는 챕터 성소의 가장 높은 제단에 영원히 봉안되었다."
      });
    }

    if (tags.includes("living_miracle") || (tags.includes("saint_spark") && state.faith >= 80)) {
      return withEpilogue({
        rank: "BEATIFICATION PETITION — IMPERIAL SAINT",
        title: "에클레시아키 시성 청원 대상",
        verdict: "칠흑 같은 어둠 속에서 황제의 기적을 몸소 증명한 삶이었다. 시노드 원로회가 그대의 순교와 행적을 성인전에 등재하기 위한 심사에 착수했다."
      });
    }

    if (career.tree === "custodes" || tags.includes("custodes")) {
      return withEpilogue({
        rank: tags.includes("captain_general") ? "CAPTAIN-GENERAL OF THE TEN THOUSAND" : "NAMES OF THE TEN THOUSAND",
        title: tags.includes("captain_general") ? "만 명의 수호자를 이끈 캡틴-제너럴" : "황금 갑주 안쪽에 새겨진 이름",
        verdict: "황금 옥좌의 방패로 살다 간 불멸의 수호자였다. 황궁 영원의 회랑에 그대의 수백 개 진명이 경건히 각인되었다."
      });
    }

    if (tags.includes("sister_of_silence")) {
      return withEpilogue({
        rank: "TALONS OF THE EMPEROR — ANATHEMA PSYKANA",
        title: "침묵의 맹세를 지킨 황제의 발톱",
        verdict: "말 한마디 남기지 않은 채 검은 함선과 전장의 워프 폭풍을 잠재웠던 침묵의 자매였다. 오직 황궁의 소수 기록관만이 그대의 고요한 헌신을 기억한다."
      });
    }

    if (career.tree === "grey_knights" || tags.includes("grey_knight")) {
      return withEpilogue({
        rank: tags.includes("gk_supreme_master") ? "SUPREME GRAND MASTER OF TITAN" : "HALL OF CHAMPIONS — TITAN",
        title: tags.includes("gk_supreme_master") ? "타이탄의 불멸 슈프림 그랜드 마스터" : "타이탄 영웅의 전당 등재",
        verdict: "제국 시민 누구도 그대의 이름을 알지 못한다. 오직 토성의 위성 타이탄 지하 석벽만이 악마와 맞선 은빛 형제의 희생을 영원히 기억한다."
      });
    }

    if (career.tree === "officio_assassinorum" || tags.includes("assassin")) {
      const cladeLabel = tags.includes("clade_vindicare")
        ? "빈디카레 템플의 유령 저격수"
        : tags.includes("clade_callidus")
        ? "칼리두스 템플의 천의 얼굴"
        : tags.includes("clade_eversor")
        ? "에버서 템플의 광폭한 심판자"
        : tags.includes("clade_culexus")
        ? "쿨렉수스 템플의 영혼 없는 파멸자"
        : "오피시오 아사시노룸의 그림자 요원";
      return withEpilogue({
        rank: "OFFICIO ASSASSINORUM — REDACTED ARCHIVE",
        title: cladeLabel,
        verdict: "제국 공식 연대기 어디에도 그대의 이름은 남아 있지 않다. 그러나 단 한 발의 총성과 단 한 번의 잠입으로 무너진 반역 왕조의 폐허가 그대의 공훈을 영원히 증언한다."
      });
    }

    if (career.tree === "imperial_knight" || tags.includes("imperial_knight")) {
      if (tags.includes("knight_high_king") || state.careerId === "knight_high_king") {
        const kingWord = state.gender === "female" ? "하이 퀸" : "하이 킹";
        return withEpilogue({
          rank: "HIGH MONARCH OF THE KNIGHT WORLD",
          title: `기사 가문 대의회를 이끈 ${kingWord}`,
          verdict: "수십 기의 임페리얼 나이트와 기사 행성의 명예를 어깨에 짊어졌던 불굴의 대군주였다. 그대의 기억과 기사도는 스론 메카니쿰의 가장 고귀한 메아리로 영원히 계승된다."
        });
      }
      if (tags.includes("knight_freeblade") || state.careerId === "knight_freeblade") {
        return withEpilogue({
          rank: "LEGEND OF THE FREEBLADE",
          title: "문장 없이 싸운 전설의 프리블레이드",
          verdict: "가문의 울타리를 떠나 가장 절망적인 제국 전선마다 홀로 강림했던 방랑 기사였다. 그대가 구해 낸 행성들의 서사시 속에 이름 없는 거신의 전설이 남았다."
        });
      }
      if (state.careerId === "knight_squire" && !tags.includes("knight_scion")) {
        return withEpilogue({
          rank: "HELM MECHANICUM — ARMIGER SQUIRE",
          title: "헬름 메카니쿰에 서약한 기사 가문 종자",
          verdict: "아미저의 리퍼 체인클리버와 이온 실드로 귀족 기사들의 측면을 엄호했던 충직한 종자였다. 비록 대기사 스론에 오르기 전에 생을 마감했으나, 가문의 종소리 속에 용맹한 서약의 이름이 새겨졌다."
        });
      }
      return withEpilogue({
        rank: "THRONE MECHANICUM — HONORED SCION",
        title: "스론 메카니쿰에 새겨진 임페리얼 나이트",
        verdict: "이온 실드와 리퍼 체인소드로 제국의 적진을 돌파했던 고귀한 기사였다. 사크리스탄 성소의 축성 종소리 속에 그대의 인장이 가문 제단에 영원히 봉안되었다."
      });
    }

    if (career.tree === "navis_navigator" || tags.includes("nav_novator") || tags.includes("navis_officer")) {
      const isNovator = tags.includes("nav_novator") || state.careerId === "nav_novator";
      const isSenior = tags.includes("navis_officer") || state.careerId === "nav_senior";
      return withEpilogue({
        rank: isNovator ? "NOVATOR OF THE NAVIS NOBILITE" : isSenior ? "CHARTMASTER OF THE ASTRONOMICAN" : "APPRENTICE OF THE THIRD EYE",
        title: isNovator
          ? "은하 항로를 지배한 항법사 대가주 노바토르"
          : isSenior
          ? "아스트로노미칸의 빛을 읽은 선임 항법사"
          : "제3의 눈으로 첫 성도를 열었던 견습 항법사",
        verdict: isNovator
          ? "수백 명의 항법사와 제국 성간 항로 지분을 통괄했던 나비스 노빌리테 대가문의 수장이었다. 그대가 개척한 황금 성도는 수세기 동안 제국 함대의 생명선이 되었다."
          : isSenior
          ? "제3의 눈으로 워프 폭풍을 꿰뚫으며 수많은 함선과 장병을 안전히 실우주로 인도했던 선임 항법사였다. 가문 대서고에 그대가 그린 성도가 영구 보존되었다."
          : "가문 탑을 떠나 제3의 눈으로 워프의 조류를 처음 읽었던 젊은 견습 항법사였다. 짧은 항해 끝에 남긴 초안 성도가 가문 서고의 한쪽 구석에 경건히 보관되었다."
      });
    }

    if (career.tree === "inquisition" && tags.includes("inquisitor")) {
      const isRadical = state.corruption >= 25 || tags.includes("tech_heresy") || tags.includes("xenos_contact");
      if (isRadical) {
        return withEpilogue({
          rank: "INQUISITORIAL SEAL — RADICAL ARCHIVE",
          title: "심문소 금서고 봉인 조서",
          verdict: "제국을 구하기 위해 스스로 금단의 경계를 걸었던 급진파 이단심문관이었다. 공훈은 찬란했으나 그 수단은 영구 기밀로 봉인되었다."
        });
      }
      return withEpilogue({
        rank: "ROSETTE OF UNYIELDING PURITY",
        title: tags.includes("lord_inquisitor") ? "성역 원로원의 불굴 로드 이단심문관" : "오르도의 불굴 심판관",
        verdict: "단 한 치의 타협도 없이 이단과 외계와 악마를 정화한 정통 이단심문관이었다. 그대가 남긴 로제트는 다음 세대 수행원에게 계승되었다."
      });
    }

    if (tags.includes("sector_lord") || tags.includes("planetary_governor")) {
      const isSector = tags.includes("sector_lord");
      return withEpilogue({
        rank: isSector ? "LORD OF THE SECTOR — IMPERIAL SOVEREIGN" : "IMPERIAL COMMANDER — RULER OF WORLDS",
        title: isSector ? "성역을 통치한 불세출의 섹터 로드" : "행성의 운명을 짊어진 임페리얼 커맨더",
        verdict: isSector
          ? "수십 개 행성과 수조 시민의 십일조와 방어를 통괄했던 성역의 대영주였다. 그대가 세운 통치 왕조는 성역 수도 첨탑의 황금 부조로 영원히 남았다."
          : "황제의 이름으로 한 행성 전체를 다스리며 십일조와 방위군을 지켜 낸 행성 총독이었다. 후계 가문이 그대의 인장과 영지를 계승했다."
      });
    }

    if (tags.includes("astartes") && (tags.includes("role_chaplain") || tags.includes("role_apothecary") || tags.includes("role_techmarine") || tags.includes("role_librarian"))) {
      const chapName = state.chapterName || "아스타르테스";
      if (tags.includes("role_chaplain")) {
        return withEpilogue({
          rank: "RECLUSIAM — KEEPER OF FAITH",
          title: `${chapName}의 영원한 채플린`,
          verdict: "해골 투구 아래 흔들림 없는 증오의 기도문으로 형제들의 영혼을 지킨 영적 수호자였다. 그대가 휘두른 크로지우스 아르카눔은 챕터 성소에 경건히 안치되었다."
        });
      }
      if (tags.includes("role_apothecary")) {
        return withEpilogue({
          rank: "APOTHECARION — GUARDIAN OF GENESEED",
          title: `${chapName}의 위대한 아포세카리`,
          verdict: "포화 속에서도 전사한 형제들의 진시드를 끝까지 회수해 챕터의 미래를 이어 낸 백색 갑주의 수호자였다. 수십 세대의 배틀 브라더가 그대의 헌신 덕분에 살아 숨 쉰다."
        });
      }
      if (tags.includes("role_techmarine")) {
        return withEpilogue({
          rank: "ARMOURY — MASTER OF THE FORGE",
          title: `${chapName}의 붉은 대장장이`,
          verdict: "화성의 비술과 챕터의 형제애를 함께 짊어지고 전차와 드레드노트의 기계령을 깨워 온 테크마린이었다. 챕터 무기고의 모든 화로가 그대의 안식을 위해 이진법 찬가를 울린다."
        });
      }
      return withEpilogue({
        rank: "LIBRARIUS — KEEPER OF THE VEIL",
        title: `${chapName}의 고결한 라이브러리안`,
        verdict: "워프의 광풍과 악마의 속삭임에 맞서 정신 방벽과 챕터의 역사를 지켜 낸 푸른 갑주의 현자였다. 그대의 전술 기록과 예지는 라이브러리우스 서고에 영구 보존되었다."
      });
    }

    if (tags.includes("astartes") && (tags.includes("astartes_captain") || tags.includes("terminator_honors") || state.age >= 120 || score >= 150)) {
      return withEpilogue({
        rank: "CODEX HONORIS — ANGEL OF DEATH",
        title: `${state.chapterName || "아스타르테스"}의 불멸 전설`,
        verdict: "수많은 전장을 누빈 죽음의 천사였다. 아포세카리가 회수한 그대의 진시드는 다음 세대 배틀 브라더의 가슴속에서 다시 고동칠 것이다."
      });
    }

    if (career.tree === "rogue_trader" && tags.includes("rogue_trader")) {
      return withEpilogue({
        rank: "WARRANT OF TRADE — BEYOND THE HALO STARS",
        title: tags.includes("rt_lord_captain") ? "헤일로 스타를 제패한 로그 트레이더 대왕조 총수" : "무역 영장의 전설적 개척자",
        verdict: "제국의 성도 바깥 미지의 변경까지 항로를 넓힌 호걸이었다. 가문 함대의 기함 함교에는 그대의 초상화가 영원히 걸리게 되었다."
      });
    }

    if (tags.includes("stc_finder") || tags.includes("magos")) {
      return withEpilogue({
        rank: "OMNISSIAH'S CHOSEN — MARS ARCHIVE",
        title: "화성 대서고 등재 현자",
        verdict: "잊혀진 암흑기 기술의 불꽃을 되살린 옴니시아의 사도였다. 화성 대성전의 이진법 찬가가 그대의 업적을 영원히 송출한다."
      });
    }

    if (state.homeWorldId === "krieg" && state.age >= 14) {
      return withEpilogue({
        rank: "ATONEMENT FULFILLED — KRIEG",
        title: "속죄 완수 기록",
        verdict: "비타-움에서 태어나 이름 대신 번호로 싸웠던 크리그의 종복은 마침내 500년 반역의 빚을 피로 갚고 황제의 용서를 얻었다."
      });
    }

    if ((tags.includes("cadia_stands") || tags.includes("tanith_ghost") || tags.includes("baal_survivor")) && score >= 100) {
      return withEpilogue({
        rank: "THE PLANET BROKE BEFORE THE GUARD DID",
        title: "부서진 별을 가슴에 품은 불굴의 생존자",
        verdict: "고향 행성이 불타고 갈라진 뒤에도 끝까지 총을 놓지 않았던 증인이었다. 그대가 남긴 발자취가 곧 무너지지 않은 고향의 증거다."
      });
    }

    if (score >= 165 || career.tier >= 5) {
      return withEpilogue({
        rank: "IMPERIAL SAINT-CLASS ARCHIVE",
        title: "인류제국 황금 기록서 등재 영웅",
        verdict: "수천조 필멸자 중 별처럼 빛난 생애였다. 아드미니스트라툼 서기관들이 황금 잉크로 그대의 이름을 새겼다."
      });
    }
    if (score >= 110 || career.tier >= 3) {
      return withEpilogue({
        rank: "HONORED SERVANT OF THE THRONE",
        title: "옥좌의 충실한 수호자",
        verdict: "험난한 41번째 천년기 속에서도 뚜렷한 공훈을 남긴 제국의 모범적 종복이었다."
      });
    }
    if (state.age < 22) {
      return withEpilogue({
        rank: "EXPENDABLE TITHE #40K",
        title: "짧고 잔혹했던 제국의 십일조",
        verdict: "인류제국에서 인간의 목숨은 가장 흔하고 값싼 화폐다. 그대는 통계표의 소수점 하나로 산화했다."
      });
    }
    return withEpilogue({
      rank: "STANDARD IMPERIAL RECORD",
      title: "제국 거대 톱니바퀴의 일원",
      verdict: "거대한 제국 기계장치 속에서 묵묵히 제 몫을 다하고 조용히 사라진 평범한 인류의 삶이었다."
    });
  }

  function finalizeDeath(state, cause) {
    if (!state.alive) return;
    state.alive = false;
    state.wounds = 0;
    state.pendingEvent = null;
    state.deathCause = cause;
    state.finalGrade = evaluateLifeGrade(state);
    addLog(state, `[사망 기록] ${formatImperialYear(state.year)} (향년 ${state.age}세) — ${cause}`, "death");
  }

  const SEGMENTUM_ADJ = {
    solar: ["obscurus", "ultima", "tempestus", "pacificus"],
    obscurus: ["solar", "ultima", "pacificus"],
    ultima: ["solar", "obscurus", "tempestus"],
    tempestus: ["solar", "ultima", "pacificus"],
    pacificus: ["solar", "obscurus", "tempestus"]
  };

  function getSegmentumDistance(fromSeg, targetWorld) {
    const toSeg = targetWorld.segmentum === "random" ? fromSeg : targetWorld.segmentum;
    if (fromSeg === toSeg) return { level: "same", label: "같은 성역", bonus: 15 };
    if ((SEGMENTUM_ADJ[fromSeg] || []).includes(toSeg)) return { level: "near", label: "인접 성역", bonus: 0 };
    return { level: "far", label: "원거리 성역", bonus: -20 };
  }

  function canAccessWorld(state, worldOrId) {
    const world = typeof worldOrId === "string" ? getWorld(worldOrId) : worldOrId;
    if (!state || !world) return { allowed: false, reason: "유효하지 않은 행성이다." };
    if (world.destroyedYear && state.year >= world.destroyedYear) {
      return { allowed: false, reason: `${world.name} 행성은 ${formatImperialYear(world.destroyedYear)}에 이미 파괴되었다.` };
    }

    const career = getCareer(state.careerId);
    const tags = state.tags || [];
    const tree = career ? career.tree : "civilian";
    const tier = career ? career.tier : 1;
    const isNative = state.homeWorldId === world.id;
    const isHeretic = tree === "chaos" || tags.includes("heretic") || tags.includes("chaos_aligned");
    const isInq = tree === "inquisition" || tags.includes("inquisitor") || tags.includes("inquisition_agent");
    const isHighRank = tier >= 4;
    const isCmdT5 = tier >= 5 || (career && career.transitTier === "autonomous");
    const isDevout = (state.faith || 0) >= 65;
    const isNoblePetition = tags.includes("noble") && ((state.stats && state.stats.Inf) || 0) >= 45;

    // 이단·카오스 낙인 신분은 제국 핵심 성역과 챕터 모성 정상 입항 불가
    if (isHeretic && ["terra", "mars", "baal", "fenris", "nocturne", "ophelia7"].includes(world.id)) {
      return { allowed: false, reason: "이단 낙인 신분으로는 제국 핵심 성역과 챕터 모성에 정상 입항할 수 없다." };
    }

    // 1. 아스타르테스 챕터 모성 (바알 · 펜리스 · 녹턴)
    if (world.id === "baal" || world.id === "fenris" || world.id === "nocturne") {
      const chapterMatch =
        (world.id === "baal" && state.chapterId === "blood_angels") ||
        (world.id === "fenris" && state.chapterId === "space_wolves") ||
        (world.id === "nocturne" && state.chapterId === "salamanders");
      const wartimeRelief =
        (world.id === "baal" && state.year >= 995 && state.year <= 1000) ||
        (world.id === "fenris" && ((state.year >= 444 && state.year <= 448) || (state.year >= 999 && state.year <= 1002)));
      const militaryReliefTree = [
        "militarum", "navy", "astartes", "grey_knights", "sororitas",
        "custodes", "imperial_knight", "inquisition", "mechanicus", "commissariat"
      ].includes(tree);

      if (chapterMatch || isInq || isCmdT5 || isNative || (wartimeRelief && militaryReliefTree)) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "아스타르테스 챕터 모성은 소속 챕터·이단심문소·고위 지휘관(Tier 5+/무역 영장)·출신자·전시 구원군만 출입할 수 있다."
      };
    }

    // 2. 신성한 테라 (소속 기관 · 임페리얼 피스트 · 고위직 Tier 4+ · 성직 순례자 신앙 65+ · 귀족 권위 45+)
    if (world.id === "terra") {
      const terraAffiliated =
        [
          "custodes", "administratum", "ecclesiarchy", "sororitas", "inquisition",
          "officio_assassinorum", "navis_navigator", "psyker", "arbites", "living_saint"
        ].includes(tree) ||
        state.chapterId === "imperial_fists" ||
        tags.includes("high_lord_terra") ||
        tags.includes("terra_elite");
      if (terraAffiliated || isHighRank || isDevout || isNoblePetition || isNative) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "신성한 테라는 소속 기관·고위직(Tier 4+)·성직 순례자(신앙 65+)·귀족(권위 45+)만 출입할 수 있다."
      };
    }

    // 3. 화성 포지 월드 (화성 조약 준수: 국교 순례 불가 — 기계교 · 해군 궤도 조선소 · 기사 가문 · 심문소 · 고위직 · 귀족 권위 45+)
    if (world.id === "mars") {
      const marsAffiliated =
        tree === "mechanicus" ||
        tree === "navy" ||
        tree === "imperial_knight" ||
        isInq ||
        tags.includes("mechanicus") ||
        tags.includes("mechanicus_blood") ||
        tags.includes("role_techmarine");
      if (marsAffiliated || isHighRank || isNoblePetition || isNative) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "화성은 기계교·제국 해군·기사 가문·심문소·고위직(Tier 4+)·귀족(권위 45+)만 출입할 수 있다."
      };
    }

    // 4. 데스 월드 · 군사 통제 행성 (크리그 · 카타찬)
    if (world.id === "krieg" || world.id === "catachan") {
      const militaryAccess = [
        "militarum", "commissariat", "inquisition", "mechanicus", "astartes",
        "navy", "rogue_trader", "imperial_knight", "officio_assassinorum", "grey_knights"
      ].includes(tree);
      if (militaryAccess || isHighRank || isNative || isHeretic) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "데스 월드·군사 통제 행성은 군·해군·기계교·심문소·고위직(Tier 4+) 또는 출신자만 출입할 수 있다."
      };
    }

    // 5. 기사 행성 (기사 가문 · 기계교 · 제국 정규 기관 · 고위직 · 귀족 권위 45+)
    if (world.id === "generic_knight") {
      const knightAccess = [
        "imperial_knight", "mechanicus", "inquisition", "rogue_trader",
        "administratum", "ecclesiarchy", "militarum", "commissariat", "navy", "astartes"
      ].includes(tree);
      if (knightAccess || isHighRank || isNoblePetition || isNative || isHeretic) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "기사 행성은 기사 가문·기계교·제국 정규 기관·고위직(Tier 4+)·귀족(권위 45+)만 입항할 수 있다."
      };
    }

    return { allowed: true };
  }

  function getTravelProfile(state) {
    const career = getCareer(state.careerId);
    const tt = career.transitTier || "civilian";
    if (state.age < 16) {
      return { canAttempt: false, reason: "16세 이상부터 성간 이동·파견 청원이 가능하다.", authority: "미성년 제한", autoApprove: false, baseChance: 0, scope: "none" };
    }

    // 의무 복무 계급(forced · astartes_scout)은 수동 행성 선택 자체를 잠금하고 상부 파견 사건으로 일관 이동
    if (tt === "astartes_scout") {
      return {
        canAttempt: false,
        forcedLock: true,
        authority: "챕터 명령 전속 (수동 이동 잠금)",
        reason: "네오파이트 수련병은 목적지를 임의로 선택할 수 없다. 챕터 마스터와 중대장의 강제 출격령 사건으로만 파견된다.",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }

    if (tt === "forced") {
      const forcedAuth =
        career.id === "skitarii" ? "누스피어 명령 전속 (수동 이동 잠금)" :
        career.id === "inquisition_acolyte" ? "이단심문관 직속 지령 (수동 이동 잠금)" :
        career.id === "assassin_initiate" ? "암살청 사원 통제 (수동 이동 잠금)" :
        career.id === "sanctioned_psyker" ? "아스트라 텔레파티카 호송 통제 (수동 이동 잠금)" :
        "상급 지휘부 배치 전속 (수동 이동 잠금)";
      return {
        canAttempt: false,
        forcedLock: true,
        authority: forcedAuth,
        reason: "의무 복무 계급은 임의로 목적 행성을 고를 수 없다. 상부 파견 명령 사건으로 이동하며, 장교·정규 독립 계급으로 승급하면 파견 청원이 열린다.",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }

    const travelCooldown = tt === "autonomous" ? 3 : 4;
    if (state.year - state.lastTravelYear < travelCooldown) {
      const left = travelCooldown - (state.year - state.lastTravelYear);
      return { canAttempt: false, reason: `워프 항행 정비 중 (${left}년 후 가능)`, authority: "항행 대기", autoApprove: false, baseChance: 0, scope: "none" };
    }

    // 1. 절대 지휘권/무역 영장/하이 로드/군주 티어 (100% 자율 결정)
    if (tt === "autonomous") {
      return {
        canAttempt: true,
        autoApprove: true,
        baseChance: 100,
        authority: "본인 지휘권 · 영장 (즉시 출항)",
        scope: "galaxy",
        actionLabel: "즉시 함대 출항"
      };
    }

    // 2. 쿠스토데스 (황궁 칙령)
    if (tt === "custodes") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 85,
        statKey: "Inf",
        authority: "캡틴-제너럴 칙령 승인",
        scope: "galaxy",
        actionLabel: "출정 칙령 청원",
        denyText: "캡틴-제너럴이 '황금 옥좌 수호가 우선이다'라며 외부 출정을 보류했다."
      };
    }

    // 3. 아스타르테스 배틀 브라더 · 서전트 · 1중대 베테랑 (중대장 승인)
    if (tt === "astartes_brother") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 34,
        maxChance: 72,
        statKey: "Inf",
        authority: "챕터 중대장(캡틴) 승인",
        scope: "galaxy",
        actionLabel: "작전 파견 자원",
        denyText: "중대장이 '현 성계의 정화가 우선이다, 형제여'라며 타 성계 파견 요청을 반려했다."
      };
    }

    // 4. 그레이 나이트 · 팔라딘
    if (tt === "grey_knight") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 45,
        maxChance: 80,
        statKey: "WP",
        authority: "그랜드 마스터 지령 승인",
        scope: "galaxy",
        actionLabel: "악마 토벌 출정 청원",
        denyText: "타이탄의 예언자들이 아직 워프 징후가 무르익지 않았다며 출격을 보류했다."
      };
    }

    // 5. 중간 장교 / 정예 / 심문자 / 테크프리스트 / 해군 / 수녀 / 판관 / 프리펙트 / 세네샬 / 거두
    if (tt === "mid") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 44,
        maxChance: 86,
        statKey: "Inf",
        authority: "상급 사령부 / 담당 기관 승인",
        scope: "galaxy",
        actionLabel: "파견 · 전출 요청",
        denyText: "상부 사령부에서 '대체 인력 부족 및 워프 항로 불안정'을 사유로 파견 신청을 기각했다."
      };
    }

    // 6. 이단자 · 배신자 워밴드 (밀항선/약탈선 편승)
    if (tt === "heretic") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: career.isTranshuman ? 52 : 32,
        maxChance: career.isTranshuman ? 86 : 78,
        statKey: career.isTranshuman ? "Inf" : "Ag",
        authority: career.isTranshuman ? "배신자 약탈선 워프 도약 (발각 위험)" : "암시장 밀항선 편승 (민첩 판정 · 발각 위험)",
        scope: career.isTranshuman ? "galaxy" : "near",
        actionLabel: career.isTranshuman ? "약탈선 출항 시도" : "밀항 시도",
        denyText: "제국 순찰 함대와 치안대의 검문에 걸려 이탈에 실패하고 격투 끝에 부상을 입었다!",
        denyWounds: -14
      };
    }

    // 7. 귀족 출신 시민/관료/성직자 (권위 45 미만 인접 성역, 45 이상 은하 전역)
    if (state.tags.includes("noble") || state.tags.includes("rogue_trader_blood")) {
      const canGalaxy = (state.stats && state.stats.Inf ? state.stats.Inf : 0) >= 45;
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: canGalaxy ? 58 : 42,
        maxChance: canGalaxy ? 90 : 75,
        statKey: "Inf",
        authority: canGalaxy ? "가문 사설 상선 · 은하 전역 귀족 통행" : "가문 사설 선박 · 인접 성역 귀족 통행",
        scope: canGalaxy ? "galaxy" : "near",
        actionLabel: "성간 선박 편승",
        denyText: "우주항 세관과 나비스 노빌리테의 워프 폭풍 경보로 출항 허가가 연기되었다."
      };
    }

    // 8. 일반 시민/노동자/관료/성직자 (야만 행성 민간 이탈 불가, 권위 20+ 필요, 인접 성역 순례선/화물선만)
    const curWorld = getWorld(state.worldId);
    if (curWorld && Array.isArray(curWorld.tags) && curWorld.tags.includes("feral")) {
      return {
        canAttempt: false,
        reason: "야만 행성에는 정규 우주항이 없어 정규 제국 기관 소속이나 고위 귀족이 아니면 성간 선박을 청원할 수 없다.",
        authority: "야만 행성 우주항 부재",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }
    if (state.stats.Inf < 20) {
      return {
        canAttempt: false,
        reason: "일반 시민은 권위 20+이거나 해군·기계교·심문소 등 정규 기관 중견 이상이 되어야 성간 이동을 청원할 수 있다.",
        authority: "행성 이탈 금지 (민간 통제)",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }
    return {
      canAttempt: true,
      autoApprove: false,
      baseChance: 18,
      maxChance: 55,
      statKey: "Inf",
      authority: "아드미니스트라툼 통행 허가 & 순례선 탑승",
      scope: "near",
      actionLabel: "순례선 · 화물선 탑승 청원",
      denyText: "출국 심사 서기관이 '하급 시민의 무단 행성 이탈 불가' 도장을 찍고 대기표를 압수했다."
    };
  }

  function evaluateTravelAttempt(state, targetWorldId) {
    const profile = getTravelProfile(state);
    const target = getWorld(targetWorldId);
    if (!target || target.id === state.worldId) {
      return Object.assign({}, profile, { valid: false, chance: 0, reason: "현재 거주 중인 행성이다." });
    }
    const access = canAccessWorld(state, target);
    if (!access.allowed) {
      return Object.assign({}, profile, { valid: false, chance: 0, reason: access.reason });
    }
    if (!profile.canAttempt) {
      return Object.assign({}, profile, { valid: false, chance: 0 });
    }

    const dist = getSegmentumDistance(state.segmentum, target);
    if (profile.scope === "near" && dist.level === "far") {
      return Object.assign({}, profile, {
        valid: false,
        chance: 0,
        distanceLabel: dist.label,
        reason: "현재 계급으로는 같은 성역 또는 인접 성역으로만 이동을 청원할 수 있다."
      });
    }

    if (profile.autoApprove) {
      return Object.assign({}, profile, { valid: true, chance: 100, distanceLabel: dist.label });
    }

    const statVal = state.stats[profile.statKey || "Inf"] || 25;
    const statBonus = Math.round((statVal - 30) * 0.45);
    const nihilusPen = state.globalFlags.greatRiftOpened && (target.nihilusOverride || (DATA.SEGMENTA[target.segmentum] && DATA.SEGMENTA[target.segmentum].nihilusAfterRift)) ? -12 : 0;
    const raw = profile.baseChance + statBonus + dist.bonus + nihilusPen;
    const chance = clamp(raw, 5, profile.maxChance || 90);

    return Object.assign({}, profile, {
      valid: true,
      chance,
      distanceLabel: dist.label
    });
  }

  function getTravelCandidateWorlds(state) {
    const profile = getTravelProfile(state);
    if (!profile.canAttempt) return [];
    return DATA.WORLDS.filter((w) => {
      if (w.id === state.worldId) return false;
      if (!w.named && w.id !== "voidborn" && w.id !== "generic_knight") return false;
      if (!canAccessWorld(state, w).allowed) return false;
      const dist = getSegmentumDistance(state.segmentum, w);
      if (profile.scope === "near" && dist.level === "far") return false;
      return true;
    }).sort((a, b) => {
      const da = getSegmentumDistance(state.segmentum, a).bonus;
      const db = getSegmentumDistance(state.segmentum, b).bonus;
      return db - da;
    });
  }

  function pickHotspotOrNearbyWorlds(state) {
    const valid = DATA.WORLDS.filter((w) => {
      if (w.id === state.worldId || !w.named) return false;
      if (!canAccessWorld(state, w).allowed) return false;
      return true;
    });
    if (valid.length < 2) return [];

    // 역사 격전지 임박 시 최우선 파견 후보로 반영!
    const hotIds = [];
    if (state.year >= 136 && state.year <= 151) hotIds.push("cadia");
    if (state.year >= 441 && state.year <= 446) hotIds.push("armageddon", "fenris");
    if (state.year >= 938 && state.year <= 941) hotIds.push("armageddon");
    if (state.year >= 995 && state.year <= 997) hotIds.push("baal", "macragge");
    if (state.year >= 995 && state.year <= 998) hotIds.push("armageddon");
    if (state.year >= 996 && state.year <= 999) hotIds.push("cadia", "baal");
    if (state.year >= 999 && state.year <= 1001) hotIds.push("terra", "macragge");
    if (state.year >= 1011 && state.year <= 1015) hotIds.push("macragge");
    if (state.year >= 754 && state.year <= 764) hotIds.push("tanith");

    const hotWorlds = valid.filter((w) => hotIds.includes(w.id));
    const nearby = valid.filter((w) => {
      const dist = getSegmentumDistance(state.segmentum, w);
      return dist.level === "same" || dist.level === "near";
    });

    const pool = nearby.length >= 2 ? nearby : valid;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    if (hotWorlds.length > 0 && Math.random() < 0.65) {
      const primary = hotWorlds[randInt(0, hotWorlds.length - 1)];
      const secondary = shuffled.find((w) => w.id !== primary.id) || shuffled[0];
      return [primary, secondary];
    }
    return [shuffled[0], shuffled[1]];
  }

  function createWarpAnomalyTransitEvent(state, destWorld, forcedVariant = null) {
    if (!destWorld) return null;
    const maxShift = state.globalFlags.greatRiftOpened ? 3 : 2;
    const canTimeShift =
      (state.year < 995 || state.year >= 1002) &&
      (!destWorld.destroyedYear || state.year + maxShift < destWorld.destroyedYear);
    const variant = forcedVariant || (canTimeShift && Math.random() < 0.5 ? "dilation" : "geller");
    const wTag = getWorldShortTag(destWorld);

    if (variant === "dilation") {
      const shift = state.globalFlags.greatRiftOpened ? 3 : 2;
      return {
        id: `dyn_warp_dilation_${state.year}`,
        isTimeline: false,
        category: "워프 항해 이상",
        reqLabel: "성간 이동 · 워프 시간 왜곡",
        title: `워프 시간 왜곡 — [${destWorld.name}] 궤도에 도착한 미래의 달력`,
        text: `[${destWorld.name}](${wTag}) 성계로 향하던 워프 항해가 기묘한 조류에 휘말렸다. 함선 시계로는 고작 몇 주가 흘렀을 뿐인데, 실우주로 복귀해 아스트로패스 표준시와 동기화한 순간 함교 전체가 경악했다. 바깥 은하에서는 이미 ${shift}년의 세월이 흘러가 있었다!`,
        choices: [
          {
            label: "[지성 판정] 어긋난 항해 일지와 최신 성계 전황 보고서를 신속히 대조해 바뀐 정세에 적응한다",
            check: { stat: "Int", diff: 0 },
            success: {
              text: `시간 도약(+${shift}년 · 생물학적 연령 유지)의 혼란을 단숨에 정리하고 [${destWorld.name}]의 바뀐 판세를 정확히 읽어 냈다!`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { Int: 5, Inf: 4 }
            },
            fail: {
              text: `예전 기밀 암호가 전부 만료되어 입항 검문소에서 한동안 곤욕을 치른 뒤에야 [${destWorld.name}]에 상륙했다.`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { Int: 2, Inf: -2 }
            }
          },
          {
            label: "[의지 판정] 고향 식구들이 훌쩍 늙어 버렸다는 충격에 패닉에 빠진 선원들을 진정시킨다",
            check: { stat: "WP", diff: 0 },
            success: {
              text: `워프의 변덕 앞에서도 흔들리지 않는 중심을 세워 선내 소동을 잠재우고 [${destWorld.name}]에 무사히 하선했다!`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { WP: 5, Fel: 4 }
            },
            fail: {
              text: `시간 감각의 괴리와 불면증에 시달리며 지친 몸으로 [${destWorld.name}] 부두에 발을 디뎠다.`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              wounds: -8,
              stats: { WP: 3 }
            }
          },
          {
            label: "워프의 조류는 필멸자가 거스를 수 없는 법이라며 침묵 속에 하선 절차를 밟는다",
            effect: {
              text: `어느새 ${shift}년 뒤의 시간대로 건너와 [${destWorld.name}](${wTag})에 착임했다. 세월을 건너뛴 기묘한 여운이 남았다.`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { WP: 3 }
            }
          }
        ],
        source: "Lexicanum: Warp Travel / Time Dilation Lore"
      };
    }

    return {
      id: `dyn_warp_geller_${state.year}`,
      isTimeline: false,
      category: "워프 항해 이상",
      reqLabel: "성간 이동 · 겔러 필드 요동",
      title: `겔러 필드 요동 — [${destWorld.name}] 항로의 공포스러운 3초`,
      text: `[${destWorld.name}](${wTag}) 방면으로 워프 항해하던 도중, 갑판의 모든 조명이 핏빛으로 꺼졌다 켜지며 겔러 필드가 3초간 격렬하게 요동쳤다! 방화 격벽 너머로 기괴한 웃음소리가 스며들고, 하부 기관실의 경보 사이렌이 미친 듯이 울부짖는다.`,
      choices: [
        {
          label: "[의지 판정] 황제 찬송가를 목청껏 외치며 흔들리는 갑판 선원들을 붙들어 광기의 전염을 막는다",
          check: { stat: "WP", diff: -5 },
          success: {
            text: `불굴의 신앙이 선실의 공포를 억눌렀다! 겔러 필드가 안정을 되찾고 무사히 [${destWorld.name}] 궤도에 도달했다.`,
            moveWorld: destWorld.id,
            stats: { WP: 6, Fel: 4 },
            faith: 6,
            corruption: -3
          },
          fail: {
            text: `찰나의 워프 환청이 정신을 긁고 지나가 악몽과 오염의 흔적을 남긴 채 [${destWorld.name}]에 도착했다.`,
            moveWorld: destWorld.id,
            wounds: -12,
            corruption: 7,
            stats: { WP: 2 }
          }
        },
        {
          label: "[지성 판정] 엔지니어들과 함께 보조 플라스마 도관을 수동 절체해 겔러 필드 출력을 긴급 복구한다",
          check: { stat: "Int", diff: -5 },
          success: {
            text: `번개 같은 회로 절체로 겔러 필드의 균열을 봉합했다! 함장이 그대를 함선의 은인으로 치하하며 [${destWorld.name}]에 상륙시켰다.`,
            moveWorld: destWorld.id,
            stats: { Int: 6, Inf: 5 }
          },
          fail: {
            text: `과전류 방전에 손을 데었으나, 다행히 겔러 필드가 완전히 붕괴하기 전에 출력이 복구되어 [${destWorld.name}]에 닿았다.`,
            moveWorld: destWorld.id,
            wounds: -14,
            stats: { Int: 3 }
          }
        },
        {
          label: "즉시 기밀 방화 격벽 안으로 대피해 실우주 복귀 신호가 울릴 때까지 눈을 감고 기도한다",
          effect: {
            text: `공포스러운 진동 끝에 함선이 가까스로 실우주로 빠져나와 [${destWorld.name}](${wTag}) 궤도에 정박했다.`,
            moveWorld: destWorld.id,
            stats: { WP: 3 },
            corruption: 2
          }
        }
      ],
      source: "Lexicanum: Geller Field / Rogue Trader Core Rulebook"
    };
  }

  function createDynamicTransitEvent(state) {
    const pair = pickHotspotOrNearbyWorlds(state);
    if (pair.length < 2) return null;
    const [w1, w2] = pair;
    const c = state.careerId;
    const career = getCareer(c);
    const tt = career.transitTier || "civilian";
    const isHeretic = tt === "heretic" || career.tree === "chaos" || state.tags.includes("heretic") || state.tags.includes("chaos_aligned");

    const isForced = !isHeretic && (tt === "forced" || tt === "astartes_scout");
    const isAutonomous = !isHeretic && (tt === "autonomous" || tt === "custodes");
    const isMidOfficer = !isHeretic && (tt === "mid" || tt === "astartes_brother" || tt === "grey_knight");
    const isInstitutionalCivil = !isHeretic && (career.tree === "administratum" || career.tree === "ecclesiarchy");

    // 0) 카오스 · 이단자 전용 성간 이동 (제국 사령부·순례선·징발선 이벤트 노출 원천 차단)
    if (isHeretic) {
      const isWarbandApex = Boolean(career.isTranshuman) || career.id === "chaos_champion" || career.id === "chaos_lord" || career.id === "daemon_prince";
      if (isWarbandApex) {
        return {
          id: `dyn_chaos_raid_${state.year}`,
          isTimeline: false,
          category: "워밴드 원정",
          reqLabel: "배신자 약탈 함대 · 워프 항로",
          title: "워밴드 약탈 함대 — 워프 침공 항로 개방",
          text: `워프의 틈새가 열리며 제국 성계의 방어선이 흔들리고 있다. 배신자 약탈 함대의 기함에서 [${w1.name}] 또는 [${w2.name}] 성계를 향한 약탈·침공 출정 명령을 내릴 수 있다.`,
          choices: [
            {
              label: `[${w1.name}] 성계로 워밴드 함대를 몰아 약탈 원정에 나선다 (${getWorldShortTag(w1)})`,
              effect: {
                text: `워프 폭풍을 뚫고 [${w1.name}](${getWorldShortTag(w1)}) 궤도에 기습 출현했다.`,
                moveWorld: w1.id,
                stats: { WS: 1, Inf: 1 }
              }
            },
            {
              label: `[${w2.name}] 성계로 약탈 함대를 돌려 제국 보급선을 유린한다 (${getWorldShortTag(w2)})`,
              effect: {
                text: `검은 깃발을 내건 약탈선이 [${w2.name}](${getWorldShortTag(w2)}) 성계 외곽에 침투했다.`,
                moveWorld: w2.id,
                stats: { BS: 1, Inf: 1 }
              }
            },
            {
              label: "현재 거점에서 워밴드 세력과 의식을 더욱 결집한다",
              effect: {
                text: "현 거점의 지하 제단과 약탈 물자를 정리하며 다음 성전을 준비했다.",
                stats: { WP: 1 }
              }
            }
          ],
          source: "Codex: Chaos Space Marines / Black Crusade"
        };
      }
      return {
        id: `dyn_heretic_smuggle_${state.year}`,
        isTimeline: false,
        category: "암시장 밀항",
        reqLabel: "이단 비밀 항로 · 밀항선",
        title: "이단 심문망을 피해 출항하는 암시장 밀항선",
        text: `치안대와 이단심문소의 수사망이 좁혀 오자 밀교단 접선책이 은밀한 화물선 밀항 경로를 마련했다. [${w1.name}] 또는 [${w2.name}] 방면으로 거처를 옮길 기회다.`,
        choices: [
          {
            label: `[${w1.name}] 방면 암시장 밀항선에 몸을 싣는다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `화물칸 깊은 곳에 숨어 워프 항해를 견딘 끝에 [${w1.name}](${getWorldShortTag(w1)}) 하층 구역에 잠입했다.`,
              moveWorld: w1.id,
              stats: { Ag: 1 }
            }
          },
          {
            label: `[${w2.name}] 방면 암시장 밀항선에 몸을 싣는다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `검문망을 따돌리고 [${w2.name}](${getWorldShortTag(w2)}) 외곽 우주항에 몰래 발을 디뎠다.`,
              moveWorld: w2.id,
              stats: { Ag: 1 }
            }
          },
          {
            label: "위험한 밀항을 포기하고 현 하층 은신처에 더 깊이 숨는다",
            effect: {
              text: "발각 위험을 피해 현재 거점의 지하 비밀 결사에 머물기로 했다.",
              stats: { Int: 1 }
            }
          }
        ],
        source: "Dark Heresy / Black Crusade Lore"
      };
    }

    // 민간/시민/귀족 이동 가능성 사전 점검 (야만 행성·극빈층 원천 차단, 행정청·국교 기관 파견은 예외)
    if (!isForced && !isAutonomous && !isMidOfficer && !isInstitutionalCivil) {
      const curWorld = getWorld(state.worldId);
      if (curWorld.tags.includes("feral") || (state.stats.Inf < 18 && !state.tags.includes("noble") && !state.tags.includes("voidborn"))) {
        return null;
      }
    }

    // 워프 항해 이상 변주 (평시 10%, 대균열 개방 후 16% 확률로 겔러 필드 요동 / 워프 시간 왜곡 발생)
    const warpAnomalyChance = state.globalFlags.greatRiftOpened ? 0.16 : 0.10;
    if (Math.random() < warpAnomalyChance) {
      return createWarpAnomalyTransitEvent(state, w1);
    }

    // 1) 말단·하급 의무 파견 직군 (거부권 없음 — 강제 성간 파견!)
    if (isForced) {
      const absoluteObey =
        c === "astartes_scout" ||
        c === "skitarii" ||
        c === "tempestus_scion" ||
        c === "inquisition_acolyte" ||
        c === "knight_squire" ||
        c === "assassin_initiate" ||
        c === "sororitas_novitiate" ||
        state.homeWorldId === "krieg";
      let title, text, badge;
      if (c === "astartes_scout") {
        title = `강제 출격령 — [${w1.name}] 성계 선봉 정찰 파견`;
        text = `챕터 마스터와 중대장의 작전 명령이 하달되었다. 10중대 네오파이트에게 선택권은 없다. 즉시 타격 순양함에 승선해 [${w1.name}](${getWorldShortTag(w1)}) 작전 구역으로 출격한다.`;
        badge = "강제 파견";
      } else if (c === "skitarii") {
        title = `누스피어 파견 칙령 — [${w1.name}] 강제 배치`;
        text = `상급 마고스의 이진법 전송 명령이 신경 회로에 각인되었다. 스키타리 군단 소속으로 [${w1.name}](${getWorldShortTag(w1)}) 주둔지에 즉시 배치된다.`;
        badge = "강제 파견";
      } else if (c === "inquisition_acolyte") {
        title = `이단심문관의 밀명 — [${w1.name}] 급파 지령`;
        text = `스승 이단심문관으로부터 거절 불가한 암호 명령이 떨어졌다. 오늘 밤 비밀 셔틀을 타고 [${w1.name}](${getWorldShortTag(w1)})의 이단 첩보 현장으로 급파된다.`;
        badge = "강제 파견";
      } else if (c === "assassin_initiate") {
        title = `암살청 사원 급파령 — [${w1.name}] 표적 추적`;
        text = `사원 마스터의 봉인된 작전 지령서가 하달되었다. 침묵 속에 고속 잠입정에 올라 [${w1.name}](${getWorldShortTag(w1)}) 성계로 즉각 투입된다.`;
        badge = "강제 파견";
      } else if (c === "sanctioned_psyker") {
        title = `아스트라 텔레파티카 배속령 — [${w1.name}] 전선 호송`;
        text = `스콜라스티카 사이카나의 배속 통지서가 떨어졌다. 감시관의 호위 아래 [${w1.name}](${getWorldShortTag(w1)}) 전선 사령부로 강제 이송된다.`;
        badge = "강제 파견";
      } else if (c === "sororitas_novitiate") {
        title = `수녀원 성전 동원령 — [${w1.name}] 수련단 파견`;
        text = `수녀원장의 명령으로 수련단 전원이 순례 수송선에 집결했다. 황제의 이름을 높이 들며 [${w1.name}](${getWorldShortTag(w1)}) 성계 방어전에 투입된다.`;
        badge = "강제 파견";
      } else if (c === "knight_squire") {
        title = `기사 가문 출정령 — [${w1.name}] 종자 호위 배치`;
        text = `가문의 남작 기사가 출정을 선포했다. 아미저 조종석에 오른 종자는 주군의 측면을 지키며 [${w1.name}](${getWorldShortTag(w1)}) 전선으로 강하한다.`;
        badge = "강제 파견";
      } else {
        title = `군부 파견 명령서 — [${w1.name}] 전선 강제 수송`;
        text = `아스트라 밀리타룸 사령부의 재배치 칙령이 떨어졌다. 연대 전원이 병력 수송선에 강제 승선해 [${w1.name}](${getWorldShortTag(w1)}) 전선으로 투입된다!`;
        badge = "강제 파견";
      }

      const choices = [
        {
          label: `명령에 복종해 선봉 강습 편대로 [${w1.name}]행 수송선에 오른다`,
          effect: {
            text: `상부의 강제 파견 명령에 따라 [${w1.name}](${getWorldShortTag(w1)}) 전선에 도착해 최전방에 배치되었다.`,
            moveWorld: w1.id,
            stats: { WP: 2, WS: 1, BS: 1 }
          }
        },
        {
          label: `명령에 복종해 정찰·지원 편대로 [${w1.name}]행 수송선에 오른다`,
          effect: {
            text: `워프 항해를 거쳐 [${w1.name}](${getWorldShortTag(w1)})에 도착해 정찰 및 보급 지원 임무를 부여받았다.`,
            moveWorld: w1.id,
            stats: { Ag: 2, Int: 1 }
          }
        }
      ];

      if (!absoluteObey) {
        choices.push({
          label: "[권위 판정 · 극난이도] 행정 착오와 부상을 호소하며 파견 보류를 탄원한다",
          check: { stat: "Inf", diff: -20 },
          success: {
            text: "기적적으로 병참 서류 틈새를 파고들어 이번 파견 명단에서 겨우 제외되었다!",
            stats: { Int: 2, Inf: -2 }
          },
          fail: {
            text: "커미사르와 상급 장교에게 '군무 기피 시도'로 태형 처분을 받은 뒤 결국 사슬에 묶여 강제로 수송선에 실렸다!",
            moveWorld: w1.id,
            wounds: -18,
            stats: { Inf: -4 }
          }
        });
      }

      return {
        id: `dyn_deploy_${state.year}`,
        isTimeline: false,
        category: badge,
        reqLabel: "의무 복무 파견 (상부 명령)",
        title,
        text,
        choices,
        source: "Astra Militarum / Imperial Chain of Command"
      };
    }

    // 2) 최고위 지휘권자 (완전 자율 선택권 — 지원 요청 수락/거절 자유!)
    if (isAutonomous) {
      return {
        id: `dyn_cmd_transit_${state.year}`,
        isTimeline: false,
        category: "지휘관 원정",
        reqLabel: "최고위 지휘권자 자율 결정",
        title: "성역 사령부의 원정 지원 요청",
        text: `고위 지휘권자인 그대에게 두 행성으로부터 긴급 지원·시찰 요청이 올라왔다. 물론 최종 항로 결정권은 전적으로 그대에게 있다.`,
        choices: [
          {
            label: `[${w1.name}] 방면으로 함대를 출항시킨다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `지휘권을 행사해 기함을 몰고 [${w1.name}](${getWorldShortTag(w1)}) 궤도에 당도했다!`,
              moveWorld: w1.id,
              stats: { Inf: 2 }
            }
          },
          {
            label: `[${w2.name}] 방면으로 함대를 출항시킨다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `지휘권을 행사해 기함을 몰고 [${w2.name}](${getWorldShortTag(w2)}) 궤도에 당도했다!`,
              moveWorld: w2.id,
              stats: { Inf: 2 }
            }
          },
          {
            label: "요청을 반려하고 현재 거점에서 독자 작전을 이어간다",
            effect: {
              text: "현재 성계의 현안을 우선하기로 결단했다.",
              stats: { Int: 1, Inf: 1 }
            }
          }
        ],
        source: "Imperial High Command Lore"
      };
    }

    // 3) 중간 계급 (소속 기관 성격에 따른 파견지 택1 + 잔류 보고)
    if (isMidOfficer) {
      if (career.tree === "ecclesiarchy" || career.tree === "sororitas") {
        return {
          id: `dyn_transit_faith_${state.year}`,
          isTimeline: false,
          category: "성지 파견 선택",
          reqLabel: "국교 · 성전 교구 순회 소환",
          title: "대교구 성지 순례 · 교구 시찰 소환",
          text: "추기경 회의에서 이단 척결과 신앙 재건을 위해 두 성계 중 한 곳으로 순회 파견을 맡길 수석 봉사자를 지명했다.",
          choices: [
            {
              label: `[${w1.name}] 교구 순례 및 신앙 시찰을 택한다 (${getWorldShortTag(w1)})`,
              effect: {
                text: `성가대의 축복 속에 워프 항해를 마치고 [${w1.name}](${getWorldShortTag(w1)}) 대성당에 부임했다!`,
                moveWorld: w1.id,
                faith: 4,
                stats: { WP: 2, Fel: 1 }
              }
            },
            {
              label: `[${w2.name}] 교구 순례 및 신앙 시찰을 택한다 (${getWorldShortTag(w2)})`,
              effect: {
                text: `성가대의 축복 속에 워프 항해를 마치고 [${w2.name}](${getWorldShortTag(w2)}) 대성당에 부임했다!`,
                moveWorld: w2.id,
                faith: 4,
                stats: { WP: 2, Fel: 1 }
              }
            },
            {
              label: "현 교구의 이단 색출이 시급하다며 잔류를 청원한다",
              effect: {
                text: "대교구가 현지의 위급함을 인정해 교구 잔류를 승인했다.",
                faith: 2,
                stats: { WP: 1 }
              }
            }
          ],
          source: "Adeptus Ministorum / Ecclesiarchy Lore"
        };
      }

      if (career.tree === "administratum") {
        return {
          id: `dyn_transit_audit_${state.year}`,
          isTimeline: false,
          category: "행정 감사 파견",
          reqLabel: "아드미니스트라툼 성계 십일조 감사",
          title: "아드미니스트라툼 성계 십일조 특별 감사령",
          text: "성역 행정 본부에서 누적된 십일조 미납분을 조사하고 양피지 기록을 대조하기 위해 두 성계 중 한 곳의 감사단장을 맡아 달라는 통첩이 왔다.",
          choices: [
            {
              label: `[${w1.name}] 성계 십일조 감사단으로 출항한다 (${getWorldShortTag(w1)})`,
              effect: {
                text: `봉인된 행정 인장을 휴대하고 [${w1.name}](${getWorldShortTag(w1)}) 성계 행정청 감사에 착수했다!`,
                moveWorld: w1.id,
                stats: { Int: 2, Inf: 1 }
              }
            },
            {
              label: `[${w2.name}] 성계 십일조 감사단으로 출항한다 (${getWorldShortTag(w2)})`,
              effect: {
                text: `봉인된 행정 인장을 휴대하고 [${w2.name}](${getWorldShortTag(w2)}) 성계 행정청 감사에 착수했다!`,
                moveWorld: w2.id,
                stats: { Int: 2, Inf: 1 }
              }
            },
            {
              label: "현 성계 결산 문서를 먼저 마무리하겠다며 파견 연기를 보고한다",
              effect: {
                text: "상부가 문서 결산의 중요성을 인정해 현지 잔류를 허가했다.",
                stats: { Int: 1 }
              }
            }
          ],
          source: "Adeptus Administratum / Imperial Tithe Lore"
        };
      }

      return {
        id: `dyn_transit_${state.year}`,
        isTimeline: false,
        category: "작전 배치 선택",
        reqLabel: "중간 계급 · 파견지 택1",
        title: "상급 사령부의 작전 구역 배치 통보",
        text: "그대의 계급과 전공을 참작해 상부에서 두 곳의 파견지 중 자원 배속을 선택할 재량을 주었다. 어느 성계로 향할 것인가?",
        choices: [
          {
            label: `[${w1.name}] 전선 파견을 선택한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `작전 배치 명령을 수령하고 [${w1.name}](${getWorldShortTag(w1)})에 착임했다!`,
              moveWorld: w1.id,
              stats: { WP: 2, Inf: 1 }
            }
          },
          {
            label: `[${w2.name}] 전선 파견을 선택한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `작전 배치 명령을 수령하고 [${w2.name}](${getWorldShortTag(w2)})에 착임했다!`,
              moveWorld: w2.id,
              stats: { WP: 2, Inf: 1 }
            }
          },
          {
            label: "현 주둔지 방어 임무의 중요성을 보고하고 잔류를 승인받는다",
            effect: {
              text: "상부가 그대의 의견을 받아들여 현 거점 수비 임무를 연장했다.",
              stats: { Inf: 1 }
            }
          }
        ],
        source: "Imperial Void Transit / Battlefleet Lore"
      };
    }

    // 4) 비군사 정규 기관 소환 (행정청 감사 파견 · 국교 성지 순례)
    if (career.tree === "administratum") {
      return {
        id: `dyn_admin_audit_${state.year}`,
        isTimeline: false,
        category: "행정 감사 소환",
        reqLabel: "아드미니스트라툼 실사단 파견",
        title: "아드미니스트라툼 십일조 장부 대조 파견령",
        text: `행정청 상급 서기국에서 타 성계 행정청의 세수 장부를 대조할 실사 서기관 차출 통첩이 내려왔다. [${w1.name}] 또는 [${w2.name}] 감사선에 승선할 수 있다.`,
        choices: [
          {
            label: `[${w1.name}] 행정 감사선에 승선한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `행정청 호송선을 타고 [${w1.name}](${getWorldShortTag(w1)})에 도착해 십일조 실사 업무에 착수했다.`,
              moveWorld: w1.id,
              stats: { Int: 2, Inf: 1 }
            }
          },
          {
            label: `[${w2.name}] 행정 감사선에 승선한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `행정청 호송선을 타고 [${w2.name}](${getWorldShortTag(w2)})에 도착해 십일조 실사 업무에 착수했다.`,
              moveWorld: w2.id,
              stats: { Int: 2, Inf: 1 }
            }
          },
          {
            label: "현 청사의 미결 문서가 산적했다며 보류 신청서를 제출한다",
            effect: {
              text: "복잡한 서류 절차 끝에 이번 순회 감사 명단에서 빠지고 현 근무지에 남았다.",
              stats: { Int: 1 }
            }
          }
        ],
        source: "Adeptus Administratum Lore"
      };
    }

    if (career.tree === "ecclesiarchy") {
      return {
        id: `dyn_eccl_pilgrim_${state.year}`,
        isTimeline: false,
        category: "성지 순례 소환",
        reqLabel: "에클레시아키 순례 · 선교 소환",
        title: "에클레시아키 성지 순례 및 교구 선교 소환",
        text: `대성당 주교좌에서 타 행성 신도들의 신앙을 독려할 순례 선교단을 꾸렸다. [${w1.name}] 또는 [${w2.name}] 방면 순례선에 합류할 소명이 내려왔다.`,
        choices: [
          {
            label: `[${w1.name}] 성지 순례 선교단에 합류한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `성가대의 찬송 속에 워프 항해를 마치고 [${w1.name}](${getWorldShortTag(w1)}) 교구에 도착했다.`,
              moveWorld: w1.id,
              faith: 4,
              stats: { WP: 1, Fel: 1 }
            }
          },
          {
            label: `[${w2.name}] 성지 순례 선교단에 합류한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `성가대의 찬송 속에 워프 항해를 마치고 [${w2.name}](${getWorldShortTag(w2)}) 교구에 도착했다.`,
              moveWorld: w2.id,
              faith: 4,
              stats: { WP: 1, Fel: 1 }
            }
          },
          {
            label: "현 본당의 신도들을 지키는 것이 우선이라며 남는다",
            effect: {
              text: "현 교구의 성당을 굳건히 지키며 봉사를 이어 갔다.",
              faith: 2
            }
          }
        ],
        source: "Adeptus Ministorum / Imperial Pilgrimage Lore"
      };
    }

    // 5) 귀족 가문 · 성역 궁정 알현 소환
    if (state.tags.includes("noble") || state.tags.includes("rogue_trader_blood")) {
      return {
        id: `dyn_noble_court_${state.year}`,
        isTimeline: false,
        category: "궁정 알현 · 사절",
        reqLabel: "귀족 가문 성역 사절단",
        title: "성역 궁정 알현 및 귀족 가문 사절단 출항",
        text: `가문의 명예를 드높이고 교역 협정을 갱신할 성역 귀족 회의 소집장이 날아들었다. 사설 쾌속선을 타고 [${w1.name}] 또는 [${w2.name}]의 상층 궁정으로 향할 기회다.`,
        choices: [
          {
            label: `[${w1.name}] 궁정 사절단으로 출항한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `가문 문장을 단 쾌속선을 타고 [${w1.name}](${getWorldShortTag(w1)}) 상층 첨탑 궁정에 입성했다.`,
              moveWorld: w1.id,
              stats: { Inf: 2, Fel: 1 }
            }
          },
          {
            label: `[${w2.name}] 궁정 사절단으로 출항한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `가문 문장을 단 쾌속선을 타고 [${w2.name}](${getWorldShortTag(w2)}) 상층 첨탑 궁정에 입성했다.`,
              moveWorld: w2.id,
              stats: { Inf: 2, Fel: 1 }
            }
          },
          {
            label: "대리 사절을 보내고 현재 영지 기반을 다진다",
            effect: {
              text: "직접 출항하는 대신 가신단을 보내고 현지 영향력을 관리했다.",
              stats: { Inf: 1 }
            }
          }
        ],
        source: "Rogue Trader / Imperial Nobility Lore"
      };
    }

    // 6) 전시 비상 동원 · 구호 선단 (대규모 역사 전선 임박 시)
    const isWarHotspot =
      (w1.id === "armageddon" && ((state.year >= 938 && state.year <= 941) || (state.year >= 995 && state.year <= 998))) ||
      (w1.id === "cadia" && state.year >= 995 && state.year <= 999) ||
      (w1.id === "macragge" && ((state.year >= 995 && state.year <= 1001) || (state.year >= 1011 && state.year <= 1015)));
    if (isWarHotspot) {
      return {
        id: `dyn_wartime_levy_${state.year}`,
        isTimeline: false,
        category: "전시 비상 동원",
        reqLabel: "성역 전시 보급 · 구호 선단",
        title: `성역 전시 비상 동원 — [${w1.name}] 보급 · 구호 수송 선단`,
        text: `[${w1.name}] 성계의 전황이 급박해지면서 성역 전체에 전시 보급·기술·구호 인력 비상 징발령이 선포되었다. 수송 선단에 합류해 전선 후방 지원에 참여할 것인가?`,
        choices: [
          {
            label: `[${w1.name}] 전시 보급·구호 선단에 자원 합류한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `전시 수송 선단을 타고 [${w1.name}](${getWorldShortTag(w1)}) 성계 후방 보급 기지에 도착했다.`,
              moveWorld: w1.id,
              stats: { WP: 2, Inf: 1 }
            }
          },
          {
            label: `상대적으로 안전한 [${w2.name}] 방면 중계 수송선에 오른다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `중계 수송선을 타고 [${w2.name}](${getWorldShortTag(w2)})에 도착해 후방 군수 업무를 맡았다.`,
              moveWorld: w2.id,
              stats: { Int: 1 }
            }
          },
          {
            label: "현 행성의 전시 생산 할당량을 지키는 쪽을 택한다",
            effect: {
              text: "현지 공장과 시설에 남아 전시 생산 할당량을 채우는 데 매진했다.",
              stats: { T: 1 }
            }
          }
        ],
        source: "Departmento Munitorum / Imperial War Effort Lore"
      };
    }

    // 7) 일반 민간 순례선 · 차티스트 상선단
    const curWorld = getWorld(state.worldId);
    if (curWorld.tags.includes("feral") || (state.stats.Inf < 18 && !state.tags.includes("noble") && !state.tags.includes("voidborn"))) {
      return null;
    }

    return {
      id: `dyn_transit_${state.year}`,
      isTimeline: false,
      category: "성간 항해",
      reqLabel: "민간 순례선 · 차티스트 상선단",
      title: "궤도에 정박한 성간 순례선 · 차티스트 상선단",
      text: "수십 년 만에 대형 성간 상선단이 행성 궤도에 기항했다. 인접 성역의 유명 행성으로 향하는 선실과 수행원 자리가 열렸다.",
      choices: [
        {
          label: `[${w1.name}] 방면 상선단에 탑승한다 (${getWorldShortTag(w1)})`,
          effect: {
            text: `워프 항해를 거쳐 [${w1.name}](${getWorldShortTag(w1)})에 도착했다!`,
            moveWorld: w1.id,
            stats: { WP: 1 }
          }
        },
        {
          label: `[${w2.name}] 방면 상선단에 탑승한다 (${getWorldShortTag(w2)})`,
          effect: {
            text: `워프 항해를 거쳐 [${w2.name}](${getWorldShortTag(w2)})에 도착했다!`,
            moveWorld: w2.id,
            stats: { WP: 1 }
          }
        },
        {
          label: "낯선 워프 항해는 위험하다. 현재 행성에 남는다",
          effect: {
            text: "정든 터전에 남아 생업을 이어 가기로 했다.",
            stats: { T: 1 }
          }
        }
      ],
      source: "Chartist Captains / Imperial Pilgrimage"
    };
  }

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
          const closedSourceBlocked =
            curCareer.id !== "child" &&
            c.tree !== curCareer.tree &&
            CLOSED_VOW_TREES.has(curCareer.tree) &&
            !isDirectSuccessorReq(curCareer.id, c.req) &&
            c.tree !== "inquisition" &&
            c.tree !== "living_saint" &&
            c.tree !== "chaos" &&
            !Boolean(c.isTranshuman) &&
            !(curCareer.tree === "navis_navigator" && c.tree === "rogue_trader");
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
      actions.push({
        id: "penance",
        name: "성당 고해와 정화 의식",
        desc: hasRuthless
          ? "오염 -14, 신앙 +7, 암흑 -3, 교조 +1 (생명력 -7, 재사용 3년)"
          : "오염 -14, 신앙 +7 (생명력 -7, 재사용 3년)",
        btnLabel: "정화 고행 수행"
      });
    }
    const augChk = canUseAugmetics(state);
    if (augChk.ok) {
      actions.push({
        id: "augmetics",
        name: `기계교 의체 개조 (${state.augmeticsCount}/3)`,
        desc: `강인 +5, 백병 +3, 지성 +3, 기대수명 +18년 (${augChk.isMech ? "기계교 의례 · 무료" : "권위 -" + augChk.infCost + " 소모"}, 교섭 -2)`,
        btnLabel: "의체 시술 받기"
      });
    }
    const rejChk = canUseRejuvenat(state);
    if (rejChk.ok) {
      actions.push({
        id: "rejuvenat",
        name: `리주버냇 수명 연장 시술 (${state.rejuvenatCount}/3)`,
        desc: `권위 -${rejChk.infCost} 소모 · 기대수명 +55년 · 생명력 +30 회복`,
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
    STAT_META,
    FOCUSES,
    ERA_PRESETS,
    TAG_LABELS,
    clamp,
    normalizeAlignment,
    applyAlignDelta,
    getAlignmentInfo,
    getStratification,
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
