(function (global) {
  const DATA = global.IMPERIUM_DATA;

  const STAT_META = {
    WS:  { key: "WS",  name: "백병", en: "Weapon Skill", desc: "근접전·체인소드·도검 전투력" },
    BS:  { key: "BS",  name: "사격", en: "Ballistic Skill", desc: "라스건·볼터·포술 명중률" },
    T:   { key: "T",   name: "강인", en: "Toughness", desc: "생존력·독/방사능 저항·개조 수술 내구" },
    Ag:  { key: "Ag",  name: "민첩", en: "Agility", desc: "기동·잠입·회피·함선 조종" },
    Int: { key: "Int", name: "지성", en: "Intelligence", desc: "기계교 교리·전술·수사·행정" },
    WP:  { key: "WP",  name: "의지", en: "Willpower", desc: "신앙·공포 저항·사이킥 통제" },
    Fel: { key: "Fel", name: "교섭", en: "Fellowship", desc: "지휘력·선동·사교·외교" },
    Inf: { key: "Inf", name: "권위", en: "Influence", desc: "제국 내 서열·인맥·물자·수명연장 접근성" }
  };

  const FOCUSES = {
    survival: {
      id: "survival",
      name: "생존과 보양",
      en: "Endurance",
      desc: "체력 회복, 강인(T) 상승, 연간 사고 위험 감소",
      statDelta: { T: 1.2, Ag: 0.5 },
      woundsDelta: 2,
      faithDelta: 0,
      corruptionDelta: 0,
      hazardMult: 0.65
    },
    combat: {
      id: "combat",
      name: "무예와 전투 훈련",
      en: "Martial Drill",
      desc: "백병(WS)·사격(BS)·민첩(Ag) 집중 육성",
      statDelta: { WS: 1.6, BS: 1.6, Ag: 0.8 },
      woundsDelta: 0,
      faithDelta: 0,
      corruptionDelta: 0,
      hazardMult: 1.0
    },
    faith: {
      id: "faith",
      name: "황제 신앙과 기도",
      en: "Imperial Creed",
      desc: "의지(WP)·신앙 상승, 워프 오염 정화",
      statDelta: { WP: 1.8, Fel: 0.6 },
      woundsDelta: 1,
      faithDelta: 5,
      corruptionDelta: -3,
      hazardMult: 0.9
    },
    lore: {
      id: "lore",
      name: "학문과 기계 교리",
      en: "Scholastica",
      desc: "지성(Int) 집중 육성 · 기계교/이단심문소/관료 길 개척",
      statDelta: { Int: 2.0, WP: 0.5 },
      woundsDelta: 0,
      faithDelta: 0,
      corruptionDelta: 0,
      hazardMult: 0.85
    },
    politics: {
      id: "politics",
      name: "인맥과 출세 도모",
      en: "Patronage",
      desc: "교섭(Fel)·권위(Inf) 집중 육성 · 승진 및 귀족 루트",
      statDelta: { Fel: 1.5, Inf: 1.8 },
      woundsDelta: 0,
      faithDelta: -0.5,
      corruptionDelta: 0,
      hazardMult: 0.95
    },
    forbidden: {
      id: "forbidden",
      name: "금단의 지식 탐구",
      en: "Forbidden Lore",
      desc: "지성(Int) 대폭 상승 · 의지(WP) 상승, 단 오염 급증(카오스/비밀 분기 해금)",
      statDelta: { Int: 2.5, WP: 1.2 },
      woundsDelta: -2,
      faithDelta: -5,
      corruptionDelta: 7,
      hazardMult: 1.25
    }
  };

  const ERA_PRESETS = [
    { id: "random", name: "무작위 격동기 (M41 말)", minYear: 930, maxYear: 994, desc: "아마겟돈 전쟁, 카디아 붕괴, 대균열, 인도미투스 성전을 관통하는 핵심 시대." },
    { id: "eisenhorn", name: "아이젠혼 시대 (225.M41 · 스카루스)", minYear: 222, maxYear: 228, desc: "240.M41~500.M41 오르도 제노스 이단심문관 그레고르 아이젠혼이 활약하던 M41 초중반 시대." },
    { id: "sabbat", name: "사바트 성전기 (746.M41)", minYear: 745, maxYear: 749, desc: "755.M41 사바트 월드 성전 선포와 765.M41 타니스 멸망(이브람 건트)을 겪는 시대." },
    { id: "badab", name: "바답 전쟁기 (882.M41)", minYear: 880, maxYear: 885, desc: "901~912.M41 마엘스트롬 반역과 스페이스 마린 내전을 목격하는 시대." },
    { id: "armageddon", name: "제2·3차 아마겟돈 격동기 (915.M41)", minYear: 913, maxYear: 917, desc: "931.M41 케인의 발할라 제597연대와 941.M41 야릭·단테의 제2차 아마겟돈 전쟁을 맞는 시대." },
    { id: "cadia_rift", name: "카디아 붕괴와 대균열 직전 (980.M41)", minYear: 979, maxYear: 981, desc: "19세 무렵 999.M41 카디아 최후, 바알의 파괴, 사자의 문과 인도미투스 성전을 정면 돌파하는 시대." },
    { id: "indomitus", name: "인도미투스 성전 시대 (998.M41)", minYear: 996, maxYear: 1002, desc: "대균열 이후 프라이머리스, 육두정치 위기, 비질루스 전쟁, 파리아 넥서스, 라이온 귀환, 4차 타이라니드 전쟁의 시대." }
  ];

  const TAG_LABELS = (DATA && DATA.TAG_LABELS) || {};

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

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

  const QUARTER_LABELS = { 1: "상반기", 2: "중반기", 3: "하반기" };

  function formatImperialYear(absYear) {
    if (absYear < 1000) {
      return `${String(absYear).padStart(3, "0")}.M41`;
    }
    const millennium = 41 + Math.floor(absYear / 1000);
    const yr = absYear % 1000;
    return `${String(yr).padStart(3, "0")}.M${millennium}`;
  }

  function formatImperialDate(absYear, quarter = 1) {
    return `${formatImperialYear(absYear)} ${QUARTER_LABELS[quarter] || "상반기"}`;
  }

  const WORLD_BY_ID = new Map((DATA.WORLDS || []).map((w) => [w.id, w]));
  const WORLD_TAG_SET_BY_ID = new Map((DATA.WORLDS || []).map((w) => [w.id, new Set(w.tags || [])]));
  const ORIGIN_BY_ID = new Map((DATA.ORIGINS || []).map((o) => [o.id, o]));
  const TRAIT_BY_ID = new Map((DATA.TRAITS || []).map((t) => [t.id, t]));
  const CAREER_BY_ID = new Map((DATA.CAREERS || []).map((c) => [c.id, c]));
  const CHAR_BY_ID = new Map((DATA.CHARACTERS || []).map((c) => [c.id, c]));
  const CHAPTER_BY_ID = new Map((DATA.CHAPTERS || []).map((c) => [c.id, c]));
  const EVENT_BY_ID = new Map((DATA.EVENTS || []).map((e) => [e.id, e]));

  function buildPoolIndex(items) {
    const byChapter = new Map();
    const byWorld = new Map();
    const byCareer = new Map();
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
      } else {
        general.push(item);
      }
    }
    return { count: items.length, byChapter, byWorld, byCareer, general };
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
    return buckets;
  }

  function getWorld(id) {
    return WORLD_BY_ID.get(id) || DATA.WORLDS[0];
  }

  function getOrigin(id) {
    return ORIGIN_BY_ID.get(id) || DATA.ORIGINS[0];
  }

  function getTrait(id) {
    return TRAIT_BY_ID.get(id) || DATA.TRAITS[0];
  }

  function getCareer(id) {
    return CAREER_BY_ID.get(id) || DATA.CAREERS[0];
  }

  function getCharacter(id) {
    return CHAR_BY_ID.get(id) || null;
  }

  function getChapter(id) {
    return CHAPTER_BY_ID.get(id) || null;
  }

  function makeReqContext(state) {
    const world = getWorld(state.worldId);
    return {
      world,
      worldTagSet: WORLD_TAG_SET_BY_ID.get(world.id) || new Set(world.tags || []),
      tagSet: new Set(state.tags || [])
    };
  }

  function getCareerDisplayTitle(state, careerObj) {
    const c = careerObj || getCareer(state.careerId);
    const w = getWorld(state.homeWorldId);
    if (c.useRegimentName && w.guardRegiment) {
      if (c.id === "militarum_officer") return `${w.guardRegiment} 장교`;
      return `${w.guardRegiment}`;
    }
    if (c.useChapterName) {
      const chap = state.chapterName || w.astartesChapter || "제국 아스타르테스 챕터";
      if (c.id === "astartes_scout") return `${chap} 네오파이트`;
      if (c.id === "astartes_brother") return `${chap} 배틀 브라더`;
      if (c.id === "astartes_captain") return `${chap} 중대장 (캡틴)`;
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

    if (req.or && Array.isArray(req.or)) {
      let ok = false;
      for (let i = 0; i < req.or.length; i++) {
        if (checkReq(state, req.or[i], ctx)) { ok = true; break; }
      }
      if (!ok) return false;
    }

    return true;
  }

  const WORLD_TAG_LABELS = (DATA && DATA.WORLD_TAG_LABELS) || {};

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

  function describeReq(req) {
    if (!req) return "";
    const parts = [];
    if (req.minAge !== undefined && req.maxAge !== undefined) {
      parts.push(`${req.minAge}~${req.maxAge}세`);
    } else if (req.minAge !== undefined) {
      parts.push(`${req.minAge}세+`);
    } else if (req.maxAge !== undefined) {
      parts.push(`${req.maxAge}세 이하`);
    }
    if (req.minYear !== undefined && req.maxYear !== undefined) {
      parts.push(`${formatImperialYear(req.minYear)}~${formatImperialYear(req.maxYear)}`);
    } else if (req.minYear !== undefined) {
      parts.push(`${formatImperialYear(req.minYear)}+`);
    } else if (req.maxYear !== undefined) {
      parts.push(`${formatImperialYear(req.maxYear)} 이하`);
    }
    if (req.gender === "male") parts.push("남성");
    if (req.gender === "female") parts.push("여성");
    if (req.stats) {
      for (const [k, v] of Object.entries(req.stats)) {
        const meta = STAT_META[k];
        parts.push(`${meta ? meta.name : k} ${v}+`);
      }
    }
    if (req.minFaith !== undefined) parts.push(`신앙 ${req.minFaith}+`);
    if (req.maxFaith !== undefined) parts.push(`신앙 ${req.maxFaith} 이하`);
    if (req.minCorruption !== undefined) parts.push(`오염 ${req.minCorruption}+`);
    if (req.maxCorruption !== undefined) parts.push(`오염 ${req.maxCorruption} 이하`);
    if (req.minWounds !== undefined) parts.push(`생명력 ${req.minWounds}+`);
    if (req.maxWounds !== undefined) parts.push(`생명력 ${req.maxWounds} 이하`);
    if (req.allTags && req.allTags.length) {
      parts.push(req.allTags.map((t) => TAG_LABELS[t] || t).join(" & "));
    }
    if (req.anyTags && req.anyTags.length) {
      parts.push(req.anyTags.map((t) => TAG_LABELS[t] || t).join("/"));
    }
    if (req.anyCareers && req.anyCareers.length) {
      parts.push("직군: " + req.anyCareers.map((id) => getCareer(id).name.split(" ")[0]).join("/"));
    }
    if (req.anyChapters && req.anyChapters.length) {
      parts.push("챕터: " + req.anyChapters.map((id) => {
        const ch = getChapter(id);
        return ch ? ch.name : id;
      }).join("/"));
    }
    if (req.anyWorlds && req.anyWorlds.length) {
      parts.push("행성: " + req.anyWorlds.map((id) => getWorld(id).name).join("/"));
    }
    if (req.anyHomeWorlds && req.anyHomeWorlds.length) {
      parts.push("출생지: " + req.anyHomeWorlds.map((id) => getWorld(id).name).join("/"));
    }
    if (req.anyWorldTags && req.anyWorldTags.length) {
      parts.push("행성 유형: " + req.anyWorldTags.map((wt) => WORLD_TAG_LABELS[wt] || wt).join("/"));
    }
    if (req.anySegmenta && req.anySegmenta.length) {
      parts.push("성역: " + req.anySegmenta.map((sid) => (DATA.SEGMENTA[sid] && DATA.SEGMENTA[sid].name) || sid).join("/"));
    }
    if (req.anyFocus && req.anyFocus.length) {
      parts.push("초점: " + req.anyFocus.map((fid) => (FOCUSES[fid] && FOCUSES[fid].name) || fid).join("/"));
    }
    if (req.greatRift === true) parts.push("대균열 이후");
    if (req.greatRift === false) parts.push("대균열 이전");
    if (req.or && Array.isArray(req.or)) {
      const orText = req.or.map((sub) => describeReq(sub)).filter(Boolean).join(" 또는 ");
      if (orText) parts.push(`(${orText})`);
    }
    if (req.excludeChapters && req.excludeChapters.length && parts.length === 0) {
      parts.push(req.excludeChapters.map((id) => `${(getChapter(id) && getChapter(id).name) || id} 제외`).join(" · "));
    }
    if (req.excludeWorlds && req.excludeWorlds.length && parts.length === 0) {
      parts.push(req.excludeWorlds.map((id) => `${getWorld(id).name} 제외`).join(" · "));
    }
    if (req.excludeWorldTags && req.excludeWorldTags.length && parts.length === 0) {
      parts.push(req.excludeWorldTags.map((wt) => `${WORLD_TAG_LABELS[wt] || wt} 제외`).join(" · "));
    }
    if (req.excludeTags && req.excludeTags.length && parts.length === 0) {
      parts.push(req.excludeTags.map((t) => `${TAG_LABELS[t] || t} 불가`).join(" · "));
    }
    return parts.join(" · ");
  }

  function rollD100(state, check) {
    const base = state.stats[check.stat] || 20;
    const diff = check.diff || 0;
    const target = clamp(Math.round(base + diff), 5, 95);
    const roll = randInt(1, 100);
    const success = roll <= target;
    const critSuccess = roll <= 5;
    const critFail = roll >= 96;
    const meta = STAT_META[check.stat] || { name: check.stat, key: check.stat };
    return {
      statKey: check.stat,
      statName: meta.name,
      target,
      roll,
      success,
      critSuccess,
      critFail,
      diff
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
      const preset = ERA_PRESETS.find((e) => e.id === config.eraId) || ERA_PRESETS[0];
      birthYear = randInt(preset.minYear, preset.maxYear);
    } else {
      // 운명 모드: 85% 확률로 카디아/아마겟돈/대균열을 관통하는 핵심 격동기, 15% 확률로 사바트~바답 시대
      birthYear = Math.random() < 0.85 ? randInt(935, 992) : randInt(745, 934);
    }

    // 2. 행성 선택 (이미 파괴된 행성 고증 보정)
    let world;
    if (mode === "custom" && config.worldId && config.worldId !== "random") {
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
      extraLifeBonus: 0,
      rejuvenatCount: 0,
      augmeticsCount: 0,
      lastRejuvenatAge: -99,
      lastAugmeticsAge: -99,
      lastPenanceYear: -999,
      lastTravelYear: -999,
      lastCareerActionYear: -999,
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

  function applyOutcome(state, outcome, rollInfo = null) {
    if (!outcome) return;

    if (outcome.chooseChapter) {
      const chap = getChapter(outcome.chooseChapter);
      if (chap) {
        state.chapterId = chap.id;
        state.chapterName = chap.name;
      }
    }

    if (outcome.stats) {
      for (const [k, delta] of Object.entries(outcome.stats)) {
        if (state.stats[k] !== undefined) {
          state.stats[k] = clamp(Math.round(state.stats[k] + delta), 5, 100);
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
      state.corruption = clamp(state.corruption + outcome.corruption, 0, 100);
    }
    if (outcome.corruptionReset) {
      state.corruption = 0;
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
    if (outcome.forceCareer) {
      const targetCareer = getCareer(outcome.forceCareer);
      const curCareer = getCareer(state.careerId);
      const isTranshuman = state.tags.includes("astartes") || state.tags.includes("custodes") || state.tags.includes("grey_knight");
      const targetIsTranshuman = ["astartes_scout", "astartes_brother", "astartes_captain", "grey_knight", "adeptus_custodes"].includes(targetCareer.id);
      const preventDowngrade =
        targetCareer.id !== "chaos_cultist" &&
        (curCareer.tier > targetCareer.tier || (isTranshuman && !targetIsTranshuman));

      if (!preventDowngrade) {
        state.careerId = targetCareer.id;
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

    const logKind = outcome.instantDeath ? "death" : (outcome.chooseChapter ? "career" : (rollInfo ? (rollInfo.success ? "success" : "danger") : "event"));
    const deltaText = formatDeltaText(outcome);
    addLog(state, outcome.text, logKind, rollInfo, {
      badge: outcome.instantDeath ? "최후의 기록" : (outcome.chooseChapter ? "챕터 서약" : (rollInfo ? "판정 결과" : "분기 기록")),
      deltaText
    });

    if (outcome.instantDeath) {
      finalizeDeath(state, outcome.instantDeath);
    } else if (state.wounds <= 0) {
      finalizeDeath(state, "치명적인 부상과 가혹한 시련을 견디지 못하고 순직");
    } else if (state.corruption >= 100) {
      finalizeDeath(state, "워프 오염이 임계치를 돌파하여 카오스 스폰으로 변이 후 정화됨");
    } else if (outcome.forceCareer === "astartes_scout" && state.careerId === "astartes_scout" && !state.chapterId && !state.pendingEvent) {
      const chapEv = createChapterSelectionEvent(state);
      if (chapEv) state.pendingEvent = chapEv;
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

    // priority 가중치: 현재 행성/직업 초고유(3)=9, 특화(2)=3, 일반 부조리(1)=1.2
    const weighted = candidates.map((ch) => {
      let w = ch.priority === 3 ? 9 : ch.priority === 2 ? 3 : 1.2;
      if (ch.req && ch.req.anyWorlds && ch.req.anyWorlds.includes(state.worldId)) w *= 1.35;
      if (ch.req && ch.req.anyChapters && state.chapterId && ch.req.anyChapters.includes(state.chapterId)) w *= 1.5;
      if (ch.req && (ch.req.minYear !== undefined || ch.req.maxYear !== undefined)) w *= 1.35;
      return { item: ch, w };
    });
    const picked = pickWeighted(weighted, "w").item;

    state.recentChronicles = [picked.id, ...recent].slice(0, 28);

    const eff = picked.effect || {};
    if (eff.stats) {
      for (const [k, delta] of Object.entries(eff.stats)) {
        if (state.stats[k] !== undefined) {
          state.stats[k] = clamp(Math.round(state.stats[k] + delta), 5, 100);
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
      state.corruption = clamp(state.corruption + eff.corruption, 0, 99);
    }

    const deltaText = formatDeltaText(eff);
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
        if (state.tags.includes("mechanicus_blood")) {
          state.careerId = "skitarii";
          state.careerHistory.push("skitarii");
          if (!state.tags.includes("mechanicus")) state.tags.push("mechanicus");
          if (!state.tags.includes("bionic")) state.tags.push("bionic");
          addLog(state, "14세가 되어 기계교 견습 과정을 마치고 스키타리 예비대에 편입되었다.", "career", null, { badge: "직무 편입" });
        } else if (state.tags.includes("noble")) {
          state.careerId = "administratum";
          state.careerHistory.push("administratum");
          if (!state.tags.includes("administratum")) state.tags.push("administratum");
          addLog(state, "14세가 되어 가문의 영지 실무와 제국 행정 서무를 맡기 시작했다. 이제 다양한 고위 직군을 노릴 수 있다.", "career", null, { badge: "직무 편입" });
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

      // 18세 스콜라 프로제니움 졸업 자동 배치 폴백 (수동 전직하지 않은 생도의 영구 child 고착 방지)
      if (state.age >= 18 && state.careerId === "child") {
        let gradCareerId = "pdf_trooper";
        let gradMsg = "스콜라 프로제니움 과정을 수료하고 행성 방위군(PDF) 기간병으로 배치되었다. 이제 커미사르·사이온·소로리타스·심문소 등 상위 진로를 노릴 수 있다.";
        if (state.tags.includes("schola")) {
          if (state.faith >= 55 && state.stats.WP >= 38 && !state.tags.includes("heretic")) {
            gradCareerId = "ecclesiarchy_priest";
            gradMsg = "스콜라 프로제니움 신학 과정을 우수한 성적으로 수료해 에클레시아키 사제로 서품되었다.";
          } else if (state.stats.Int >= 38 && !state.tags.includes("abhuman")) {
            gradCareerId = "administratum";
            gradMsg = "스콜라 프로제니움 행정 과정을 수료해 아드미니스트라툼 서기관으로 임관했다.";
          }
        } else {
          gradCareerId = "menial_worker";
          gradMsg = "성년에 도달해 제국 시민으로서 정규 직무에 편입되었다.";
        }
        const gradCareer = getCareer(gradCareerId);
        state.careerId = gradCareer.id;
        if (!state.careerHistory.includes(gradCareer.id)) state.careerHistory.push(gradCareer.id);
        if (gradCareer.onJoin && gradCareer.onJoin.addTags) {
          for (const t of gradCareer.onJoin.addTags) {
            if (!state.tags.includes(t)) state.tags.push(t);
          }
        }
        addLog(state, gradMsg, "career", null, { badge: "졸업 배치" });
      }

      const activeCareer = getCareer(state.careerId);

      // 연간 스탯 성장 (초점 + 현재 병종)
      for (const key of Object.keys(STAT_META)) {
        const fGain = (focus.statDelta && focus.statDelta[key]) || 0;
        const cGain = (activeCareer.annualGrowth && activeCareer.annualGrowth[key]) || 0;
        const raw = fGain + cGain;
        if (raw > 0) {
          const whole = Math.floor(raw);
          const frac = raw - whole;
          const gain = whole + (Math.random() < frac ? 1 : 0);
          if (gain > 0) {
            state.stats[key] = clamp(state.stats[key] + gain, 5, 100);
          }
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
      state.corruption = clamp(state.corruption + (focus.corruptionDelta || 0), 0, 100);

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
    if (state.corruption >= 100) {
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
        const weightedPool = eventPool.map((ev) => {
          let w = ev.weight || 15;
          const isWorldSpecific = ev.req && ev.req.anyWorlds && ev.req.anyWorlds.includes(state.worldId);
          const isCareerSpecific = ev.req && ev.req.anyCareers && ev.req.anyCareers.includes(state.careerId);
          const isChapterSpecific = ev.req && ev.req.anyChapters && state.chapterId && ev.req.anyChapters.includes(state.chapterId);
          const isEraSpecific = ev.req && (ev.req.minYear !== undefined || ev.req.maxYear !== undefined);
          const isNamedEncounter = Array.isArray(ev.characters) && ev.characters.length > 0;
          if (isChapterSpecific || isNamedEncounter) w *= 3.0;
          else if (isWorldSpecific || isCareerSpecific || isEraSpecific) w *= 2.6;
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
    const forcedCareers = ["astra_militarum", "skitarii", "astartes_scout", "tempestus_scion", "inquisition_acolyte", "sanctioned_psyker"];
    const isForcedDuty = forcedCareers.includes(state.careerId);
    const transitCooldown = isForcedDuty ? 6 : 8;
    const transitChance = isForcedDuty ? 0.08 : 0.04;
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

  function attemptCareerChange(state, careerId) {
    if (!state.alive || state.pendingEvent) return { ok: false, msg: "현재 진행 중인 사건을 먼저 해결해야 한다." };
    const career = getCareer(careerId);
    if (!career || !career.selectable) return { ok: false, msg: "선택할 수 없는 병종이다." };
    if (state.careerId === career.id) return { ok: false, msg: "이미 해당 직군에 복무 중이다." };
    if (!checkReq(state, career.req)) return { ok: false, msg: `요구 조건 미달: ${describeReq(career.req)}` };

    // 선발 시련(Trial)이 있는 특수 병종
    if (career.trialCheck) {
      const roll = rollD100(state, career.trialCheck);
      state.lastRoll = roll;
      if (!roll.success) {
        const died = Math.random() < (career.trialCheck.failDeathChance || 0.25);
        if (died) {
          addLog(state, `[${career.trialCheck.title}] 시련 실패! 가혹한 의식을 견디지 못하고 쓰러졌다.`, "death", roll);
          finalizeDeath(state, `${career.trialCheck.title} 도중 치명적 거부 반응으로 순직`);
          return { ok: false, dead: true, roll, msg: `${career.trialCheck.title}에서 실패하여 사망했다.` };
        }
        state.wounds = clamp(state.wounds - 28, 5, state.maxWounds);
        addLog(state, `[${career.trialCheck.title}] 시련에서 탈락해 큰 부상을 입었으나 목숨은 건졌다.`, "danger", roll);
        return { ok: false, roll, msg: `시련 탈락! (주사위 ${roll.roll} / 목표 ${roll.target}) 부상을 입었다.` };
      }
      addLog(state, `[${career.trialCheck.title}] 극악의 시련을 돌파했다!`, "success", roll);
    }

    state.careerId = career.id;
    if (!state.careerHistory.includes(career.id)) state.careerHistory.push(career.id);
    if (career.useChapterName && !state.chapterName) {
      const hw = getWorld(state.homeWorldId);
      state.chapterName = hw.astartesChapter || "울트라마린 후계 챕터";
    }

    if (career.onJoin) {
      applyOutcome(state, Object.assign({ text: `새로운 직책 [${getCareerDisplayTitle(state, career)}](으)로 취임했다!` }, career.onJoin));
    } else {
      addLog(state, `새로운 직책 [${getCareerDisplayTitle(state, career)}](으)로 취임했다!`, "career");
    }

    if (career.id === "astartes_scout" && !state.chapterId && state.alive && !state.pendingEvent) {
      const chapEv = createChapterSelectionEvent(state);
      if (chapEv) state.pendingEvent = chapEv;
    }

    return { ok: true, career, openedEvent: state.pendingEvent || null };
  }

  function canUseRejuvenat(state) {
    if (state.tags.includes("astartes") || state.tags.includes("custodes")) {
      return { ok: false, reason: "초인 개조 신체는 일반 리주버냇 시술이 불필요하다." };
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
    if (state.augmeticsCount >= 3) return { ok: false, reason: "이미 3단계 생체 의체 개조를 완료했다." };
    const career = getCareer(state.careerId);
    const world = getWorld(state.worldId);
    const isMech = ["skitarii", "tech_priest", "archmagos"].includes(state.careerId) || state.tags.includes("mechanicus");

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

    const c = state.careerId;
    const chap = state.chapterId ? getChapter(state.chapterId) : null;

    if (["astartes_scout", "astartes_brother", "astartes_captain"].includes(c)) {
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
    if (c === "grey_knight") {
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
    if (c === "adeptus_custodes") {
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
    if (["astra_militarum", "pdf_trooper"].includes(c)) {
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
    if (["militarum_officer", "tempestus_scion"].includes(c)) {
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
    if (["commissar", "lord_commissar"].includes(c)) {
      return {
        id: "career_action",
        name: "연대 군기 감찰 · 사기 훈시",
        desc: "의지 +3, 교섭 +3, 권위 +2, 신앙 +4 (재사용 4년)",
        btnLabel: "연대 감찰 실시",
        toastMsg: "연대 군기 감찰을 마쳤다.",
        logText: "검은 대제복 차림으로 최전선 참호를 순시하며 병사들의 나태를 일깨우고 사기를 다졌다.",
        effects: { stats: { WP: 3, Fel: 3, Inf: 2 }, faith: 4 }
      };
    }
    if (["adepta_sororitas", "canoness"].includes(c)) {
      return {
        id: "career_action",
        name: "성녀 철야 기도 · 볼터 축성식",
        desc: "의지 +3, 사격 +2, 신앙 +9, 오염 -8 (재사용 4년)",
        btnLabel: "철야 축성식 집전",
        toastMsg: "성녀 철야 기도와 축성식을 마쳤다.",
        logText: "성유와 향불 속에서 볼터에 순결의 인장을 봉인하며 흔들림 없는 신앙을 다졌다.",
        effects: { stats: { WP: 3, BS: 2 }, faith: 9, corruption: -8 }
      };
    }
    if (["inquisition_acolyte", "inquisitor"].includes(c)) {
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
    if (["skitarii", "tech_priest", "archmagos"].includes(c)) {
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
    if (c === "imperial_navy") {
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
    if (c === "arbites") {
      return {
        id: "career_action",
        name: "하층 구역 제국법 일제 검문",
        desc: "백병 +2, 사격 +2, 권위 +3, 생명력 -4 (재사용 4년)",
        btnLabel: "일제 검문 출동",
        toastMsg: "제국법 일제 검문 작전을 마쳤다.",
        logText: "아르비테스 장갑차를 몰고 무법 구역을 급습해 불법 무기상과 탈세범을 대거 체포했다.",
        effects: { stats: { WS: 2, BS: 2, Inf: 3 }, wounds: -4 }
      };
    }
    if (c === "administratum") {
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
    if (c === "ecclesiarchy_priest") {
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
    if (c === "rogue_trader") {
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
    if (c === "sanctioned_psyker") {
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
    if (c === "chaos_cultist") {
      return {
        id: "career_action",
        name: "지하 암흑 제단 비밀 의식",
        desc: "의지 +3, 백병 +2, 오염 +7, 신앙 -6 (재사용 4년)",
        btnLabel: "암흑 의식 집전",
        toastMsg: "지하 제단의 비밀 의식을 마쳤다.",
        logText: "아르비테스의 눈을 피해 지하 폐허에서 금단의 주문을 읊으며 워프의 불경한 기운을 끌어당겼다.",
        effects: { stats: { WP: 3, WS: 2 }, corruption: 7, faith: -6 }
      };
    }
    if (c === "underhive_ganger") {
      return {
        id: "career_action",
        name: "언더하이브 밀수 · 구역 순찰",
        desc: "민첩 +3, 백병 +2, 권위 +2, 생명력 -4 (재사용 4년)",
        btnLabel: "밀수 순찰 출동",
        toastMsg: "언더하이브 밀수 거래를 마쳤다.",
        logText: "하층 배수관 암시장에서 탄약과 정제수를 빼돌려 구역 내 입지를 넓혔다.",
        effects: { stats: { Ag: 3, WS: 2, Inf: 2 }, wounds: -4 }
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
      if (eff.stats) {
        for (const [k, d] of Object.entries(eff.stats)) {
          if (state.stats[k] !== undefined) state.stats[k] = clamp(Math.round(state.stats[k] + d), 5, 100);
        }
      }
      if (eff.wounds) {
        const floor = eff.wounds < 0 ? Math.min(state.wounds, 5) : 1;
        state.wounds = clamp(state.wounds + eff.wounds, floor, state.maxWounds);
      }
      if (eff.faith) state.faith = clamp(state.faith + eff.faith, 0, 100);
      if (eff.corruption) state.corruption = clamp(state.corruption + eff.corruption, 0, 99);
      addLog(state, act.logText, "success", null, {
        badge: "직군 고유 행동",
        deltaText: formatDeltaText(eff)
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
      addLog(state, "성당에서 혹독한 고행과 참회 기도를 올려 워프 오염을 정화했다.", "event", null, {
        badge: "정화 고행",
        deltaText: "오염 -14 · 신앙 +7 · 생명력 -7"
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

    return { ok: false, msg: "알 수 없는 행동이다." };
  }

  function buildObituaryEpilogue(state, mode) {
    const tags = state.tags || [];
    const met = state.metCharacters || [];
    const hasAnyBond =
      tags.includes("bond_heir") ||
      tags.includes("bond_family") ||
      tags.includes("bond_comrade") ||
      tags.includes("bond_mentor") ||
      tags.includes("bond_rival");

    if (mode === "spawn") {
      return hasAnyBond
        ? "과거 맺었던 인연들마저 이단심문소의 기억 소거 속에 흔적 없이 지워졌다."
        : "";
    }

    if (mode === "heretic") {
      return hasAnyBond
        ? "남겨진 인연들 또한 그대의 배교 기록 앞에서 침묵하거나 뿔뿔이 흩어졌다."
        : "";
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

    if (met.length > 0) {
      if (met.includes("guilliman") || met.includes("lion")) {
        lines.push("살아 돌아온 프라이마크를 두 눈으로 친견했던 목격자의 기록으로 성역 서고에 별도 주석이 달렸다.");
      } else if (met.includes("abaddon") || met.includes("ghazghkull")) {
        lines.push("은하 최악의 대적자를 마주하고도 끝내 버텨 냈던 생존자의 증언은 후대 전술 교범의 귀중한 사료로 남았다.");
      } else if (met.includes("cain") || met.includes("amberley_vail")) {
        lines.push("후일 이단심문소 기록보관소의 비밀 회고록 각주에 그대의 짧은 활약상이 뜻밖의 유머와 함께 수록되었다.");
      } else if (
        met.includes("gaunt") ||
        met.includes("yarrick") ||
        met.includes("creed") ||
        met.includes("grimaldus")
      ) {
        lines.push("전장의 살아 있는 전설과 어깨를 나란히 했던 참전 이력이 추모비의 가장 높은 줄에 새겨졌다.");
      } else {
        const ch = getCharacter(met[0]);
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

    if (state.corruption >= 100) {
      return withEpilogue({
        rank: "CHAOS SPAWN TERMINATED",
        title: "뒤틀린 변이체 정화 기록",
        verdict: "워프의 축복을 감당하지 못해 육신과 이성이 카오스 스폰으로 붕괴했다. 이단심문소 정화반이 흔적조차 남기지 않고 소각했다."
      }, "spawn");
    }

    const chaosGodNames = [];
    if (tags.includes("mark_khorne")) chaosGodNames.push("코른");
    if (tags.includes("mark_tzeentch")) chaosGodNames.push("젠취");
    if (tags.includes("mark_nurgle")) chaosGodNames.push("너글");
    if (tags.includes("mark_slaanesh")) chaosGodNames.push("슬라네쉬");

    if ((tags.includes("heretic") || state.corruption >= 65) && chaosGodNames.length > 0) {
      return withEpilogue({
        rank: "DAMNATUS — CHAMPION OF RUIN",
        title: `${chaosGodNames[0]}의 낙인이 찍힌 배교자`,
        verdict: `암흑 신 ${chaosGodNames.join("·")}의 속삭임에 영혼을 내어 준 배교자였다. 오르도 헤레티쿠스의 칙령에 따라 생애 기록 전체가 금서고에 영구 봉인되었다.`
      }, "heretic");
    }

    if (tags.includes("heretic") || state.corruption >= 65 || tags.includes("wanted_by_inquisition")) {
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

    if (tags.includes("dreadnought")) {
      return withEpilogue({
        rank: "ETERNAL SLUMBER OF THE ANCIENT",
        title: "강철 석관의 영원한 안식",
        verdict: `육신이 스러진 뒤에도 고대 드레드노트 석관 속에서 싸워 온 ${state.chapterName || "아스타르테스"}의 영웅이 마침내 영면에 들었다. 챕터 영웅의 전당에 불멸의 이름이 새겨졌다.`
      });
    }

    if (tags.includes("living_miracle") || (tags.includes("saint_spark") && state.faith >= 80)) {
      return withEpilogue({
        rank: "BEATIFICATION PETITION — IMPERIAL SAINT",
        title: "에클레시아키 시성 청원 대상",
        verdict: "칠흑 같은 어둠 속에서 황제의 기적을 몸소 증명한 삶이었다. 시노드 원로회가 그대의 순교와 행적을 성인전에 등재하기 위한 심사에 착수했다."
      });
    }

    if (state.careerId === "adeptus_custodes" || tags.includes("custodes")) {
      return withEpilogue({
        rank: "NAMES OF THE TEN THOUSAND",
        title: "황금 갑주 안쪽에 새겨진 이름",
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

    if (state.careerId === "grey_knight" || tags.includes("grey_knight")) {
      return withEpilogue({
        rank: "HALL OF CHAMPIONS — TITAN",
        title: "타이탄 영웅의 전당 등재",
        verdict: "제국 시민 누구도 그대의 이름을 알지 못한다. 오직 토성의 위성 타이탄 지하 석벽만이 악마와 맞선 은빛 형제의 희생을 영원히 기억한다."
      });
    }

    if (state.careerId === "inquisitor") {
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
        title: "오르도의 불굴 심판관",
        verdict: "단 한 치의 타협도 없이 이단과 외계와 악마를 정화한 정통 이단심문관이었다. 그대가 남긴 로제트는 다음 세대 수행원에게 계승되었다."
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

    if (tags.includes("astartes") && (state.careerId === "astartes_captain" || state.age >= 120 || score >= 150)) {
      return withEpilogue({
        rank: "CODEX HONORIS — ANGEL OF DEATH",
        title: `${state.chapterName || "아스타르테스"}의 불멸 전설`,
        verdict: "수많은 전장을 누빈 죽음의 천사였다. 아포세카리가 회수한 그대의 진시드는 다음 세대 배틀 브라더의 가슴속에서 다시 고동칠 것이다."
      });
    }

    if (state.careerId === "rogue_trader") {
      return withEpilogue({
        rank: "WARRANT OF TRADE — BEYOND THE HALO STARS",
        title: "무역 영장의 전설적 개척자",
        verdict: "제국의 성도 바깥 미지의 변경까지 항로를 넓힌 호걸이었다. 가문 함대의 기함 함교에는 그대의 초상화가 영원히 걸리게 되었다."
      });
    }

    if (tags.includes("stc_finder") || state.careerId === "archmagos") {
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

  function getWorldShortTag(world) {
    if (!world) return "";
    if (world.id === "terra") return "제국 수도 · 황궁";
    if (world.id === "mars") return "기계교 총본산";
    if (world.id === "cadia") return "최전선 요새";
    if (world.id === "krieg") return "방사능 징병 행성";
    if (world.id === "armageddon") return "오크 대격전지";
    if (world.id === "necromunda") return "거대 갱단 하이브";
    if (world.id === "macragge") return "안전한 울트라마 수도";
    if (world.id === "baal") return "블러드 엔젤 모성";
    if (world.id === "fenris") return "스페이스 울프 빙원";
    if (world.id === "catachan") return "치명적 밀림 행성";
    if (world.id === "vostroya") return "혹한 공업 하이브";
    if (world.id === "valhalla") return "지하 빙하 행성";
    if (world.id === "tanith") return "안개 삼림 행성";
    if (world.id === "nocturne") return "화산 장인 행성";
    if (world.id === "ophelia7") return "국교·수녀회 성지";
    return world.worldClass.split(" (")[0];
  }

  function getSegmentumDistance(fromSeg, targetWorld) {
    const toSeg = targetWorld.segmentum === "random" ? fromSeg : targetWorld.segmentum;
    if (fromSeg === toSeg) return { level: "same", label: "같은 성역", bonus: 15 };
    if ((SEGMENTUM_ADJ[fromSeg] || []).includes(toSeg)) return { level: "near", label: "인접 성역", bonus: 0 };
    return { level: "far", label: "원거리 성역", bonus: -20 };
  }

  function getTravelProfile(state) {
    const c = state.careerId;
    if (state.age < 16) {
      return { canAttempt: false, reason: "16세 이상부터 성간 이동·파견 청원이 가능하다.", authority: "미성년 제한", autoApprove: false, baseChance: 0, scope: "none" };
    }
    if (state.year - state.lastTravelYear < 3) {
      const left = 3 - (state.year - state.lastTravelYear);
      return { canAttempt: false, reason: `워프 항행 정비 중 (${left}년 후 가능)`, authority: "항행 대기", autoApprove: false, baseChance: 0, scope: "none" };
    }

    // 1. 절대 지휘권/무역 영장 티어 (100% 자율 결정)
    if (["inquisitor", "rogue_trader", "astartes_captain", "archmagos", "lord_commissar", "canoness"].includes(c)) {
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
    if (c === "adeptus_custodes") {
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

    // 3. 아스타르테스 네오파이트 (결정권은 챕터 마스터·캡틴에게!)
    if (c === "astartes_scout") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 14,
        maxChance: 38,
        statKey: "Inf",
        authority: "챕터 마스터 / 캡틴 결정 (네오파이트 청원)",
        scope: "near",
        actionLabel: "전선 파견 청원",
        denyText: "중대장이 '신참 네오파이트가 감히 배치에 입을 대는가'라며 일축하고 40시간 추가 무술 훈련을 명했다.",
        denyStats: { WP: 1 }
      };
    }

    // 4. 아스타르테스 배틀 브라더 (중대장 승인)
    if (c === "astartes_brother") {
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

    // 5. 그레이 나이트
    if (c === "grey_knight") {
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

    // 6. 말단 군인 / 방위군 / 스키타리 (매우 낮은 전출 승인율)
    if (["astra_militarum", "pdf_trooper", "skitarii"].includes(c)) {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 12,
        maxChance: 42,
        statKey: "Fel",
        authority: "연대 병참 장교 / 마고스 결재",
        scope: "near",
        actionLabel: "타 전선 전출 청원",
        denyText: "병참 장교가 전출 청원서를 눈앞에서 찢어 버리며 '네 자리는 지금 서 있는 그 진흙 참호다'라고 일갈했다."
      };
    }

    // 7. 중간 장교 / 정예 / 심문소 어콜라이트 / 테크프리스트 / 해군 / 수녀 / 사이커
    if (["militarum_officer", "commissar", "tempestus_scion", "adepta_sororitas", "imperial_navy", "tech_priest", "inquisition_acolyte", "arbites", "sanctioned_psyker"].includes(c)) {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 44,
        maxChance: 86,
        statKey: "Inf",
        authority: "상급 사령부 / 담당 이단심문관 승인",
        scope: "galaxy",
        actionLabel: "파견 · 전출 요청",
        denyText: "상부 사령부에서 '대체 인력 부족 및 워프 항로 불안정'을 사유로 파견 신청을 기각했다."
      };
    }

    // 8. 이단자 (밀항선/해적선 편승)
    if (c === "chaos_cultist") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 32,
        maxChance: 78,
        statKey: "Ag",
        authority: "암시장 밀항선 편승 (민첩 판정 · 발각 위험)",
        scope: "near",
        actionLabel: "밀항 시도",
        denyText: "우주항 치안대의 검문에 걸려 밀항에 실패하고 격투 끝에 부상을 입었다!",
        denyWounds: -14
      };
    }

    // 9. 귀족 출신 시민/관료/성직자
    if (state.tags.includes("noble") || state.tags.includes("rogue_trader_blood")) {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 58,
        maxChance: 92,
        statKey: "Inf",
        authority: "가문 사설 상선 · 귀족 통행 허가",
        scope: "galaxy",
        actionLabel: "성간 선박 편승",
        denyText: "우주항 세관과 항해사 길드의 워프 폭풍 경보로 출항 허가가 연기되었다."
      };
    }

    // 10. 일반 시민/노동자/관료/성직자 (권위 20+ 필요, 인접 성역 순례선/화물선만)
    if (state.stats.Inf < 20) {
      return {
        canAttempt: false,
        reason: "일반 시민은 권위 20+이거나 군·해군·기계교·심문소에 입대해야 성간 이동을 청원할 수 있다.",
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
    if (target.destroyedYear && state.year >= target.destroyedYear) {
      return Object.assign({}, profile, { valid: false, chance: 0, reason: `${target.name}은(는) ${formatImperialYear(target.destroyedYear)}에 이미 파괴되었다.` });
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
    const chance = clamp(raw, 5, profile.maxChance || 92);

    return Object.assign({}, profile, {
      valid: true,
      chance,
      distanceLabel: dist.label
    });
  }

  function getTravelCandidateWorlds(state) {
    const profile = getTravelProfile(state);
    return DATA.WORLDS.filter((w) => {
      if (w.id === state.worldId) return false;
      if (w.destroyedYear && state.year >= w.destroyedYear) return false;
      if (!w.named && w.id !== "voidborn") return false;
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
      if (w.destroyedYear && state.year >= w.destroyedYear) return false;
      return true;
    });
    if (valid.length < 2) return [];

    // 역사 격전지 임박 시 최우선 파견 후보로 반영!
    const hotIds = [];
    if (state.year >= 938 && state.year <= 941) hotIds.push("armageddon");
    if (state.year >= 995 && state.year <= 998) hotIds.push("armageddon");
    if (state.year >= 996 && state.year <= 999) hotIds.push("cadia", "baal");
    if (state.year >= 999 && state.year <= 1001) hotIds.push("terra", "macragge");
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
    const canTimeShift = state.year < 995 || state.year >= 1002;
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

    const forcedDuties = ["astra_militarum", "skitarii", "astartes_scout", "tempestus_scion", "inquisition_acolyte", "sanctioned_psyker"];
    const autonomousCmds = ["inquisitor", "rogue_trader", "astartes_captain", "archmagos", "lord_commissar", "canoness", "adeptus_custodes"];
    const isMidOfficer = ["militarum_officer", "commissar", "adepta_sororitas", "astartes_brother", "tech_priest", "arbites", "grey_knight", "imperial_navy"].includes(c);

    // 민간/시민/귀족 이동 가능성 사전 점검 (야만 행성·극빈층 원천 차단)
    if (!forcedDuties.includes(c) && !autonomousCmds.includes(c) && !isMidOfficer) {
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
    if (forcedDuties.includes(c)) {
      const absoluteObey = c === "astartes_scout" || c === "skitarii" || c === "tempestus_scion" || state.homeWorldId === "krieg";
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
      } else {
        title = `군부 파견 명령서 — [${w1.name}] 전선 강제 수송`;
        text = `아스트라 밀리타룸 사령부의 재배치 칙령이 떨어졌다. 연대 전원이 병력 수송선에 강제 승선해 [${w1.name}](${getWorldShortTag(w1)}) 전선으로 투입된다!`;
        badge = "강제 파견";
      }

      const choices = [
        {
          label: `명령에 복종해 선봉 강습 편대로 [${w1.name}]행 수송선에 오른다`,
          effect: {
            text: `상부의 강제 파견 명령에 따라 [${w1.name}](${getWorldShortTag(w1)}) 전선에 도착해 최전방 배치되었다.`,
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
          label: "[권위/교섭 · 극난이도] 행정 착오와 부상을 호소하며 파견 보류를 탄원한다",
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
        reqLabel: "하급 계급 의무 파견 (거부 불가)",
        title,
        text,
        choices,
        source: "Astra Militarum / Imperial Chain of Command"
      };
    }

    // 2) 최고위 지휘권자 (완전 자율 선택권 — 지원 요청 수락/거절 자유!)
    if (autonomousCmds.includes(c)) {
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

    // 3) 중간 계급 (지정된 2개 작전 구역 중 택1 + 잔류 요청) & 민간 성간 선단
    if (isMidOfficer) {
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

    // 민간/시민/귀족 — 야만 행성 원주민이나 극빈층(권위 15 미만)에겐 아예 안 뜸
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
    const unlockedCareers = [];
    const lockedCareers = [];
    for (let i = 0; i < DATA.CAREERS.length; i++) {
      const c = DATA.CAREERS[i];
      if (!c.selectable || c.id === state.careerId) continue;
      if (checkReq(state, c.req, reqCtx)) unlockedCareers.push(c);
      else lockedCareers.push(c);
    }
    unlockedCareers.sort((a, b) => b.tier - a.tier);

    // 앞으로 가장 가까운 추천 진로 2개 계산 (초보자 가이드용)
    const nearCareers = lockedCareers
      .filter((c) => {
        const r = c.req || {};
        if (r.gender && r.gender !== state.gender) return false;
        if (r.maxAge !== undefined && state.age > r.maxAge) return false;
        if (r.excludeTags && r.excludeTags.some((t) => reqCtx.tagSet.has(t))) return false;
        if (r.allTags && !r.allTags.every((t) => reqCtx.tagSet.has(t))) return false;
        if (r.anyCareers && !r.anyCareers.includes(state.careerId)) return false;
        return true;
      })
      .sort((a, b) => a.tier - b.tier)
      .slice(0, 2);

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
      actions.push({
        id: "penance",
        name: "성당 고해와 정화 의식",
        desc: "오염 -14, 신앙 +7 (생명력 -7, 재사용 3년)",
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

    return {
      unlockedCareers,
      lockedCareers,
      nearCareers,
      actions,
      travelProfile: getTravelProfile(state),
      travelWorlds: getTravelCandidateWorlds(state)
    };
  }

  const Engine = {
    STAT_META,
    FOCUSES,
    ERA_PRESETS,
    TAG_LABELS,
    clamp,
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
    advanceQuarter,
    advanceYear,
    resolvePendingChoice,
    attemptCareerChange,
    performAction,
    evaluateLifeGrade,
    createWarpAnomalyTransitEvent,
    getTravelProfile,
    evaluateTravelAttempt,
    getTravelCandidateWorlds,
    getContextualOptions
  };

  global.ImperiumEngine = Engine;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Engine;
  }
})(typeof window !== "undefined" ? window : globalThis);
