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
      statDelta: { T: 1.5, Ag: 0.5 },
      woundsDelta: 5,
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
      woundsDelta: -1,
      faithDelta: 0,
      corruptionDelta: 0,
      hazardMult: 1.15
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
      desc: "지성(Int)↑↑·의지(WP)↑, 단 오염 급증(카오스/비밀 분기 해금)",
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

  const TAG_LABELS = {
    lowborn: "하층민",
    citizen: "제국 시민",
    military_blood: "군인 가문",
    schola: "스콜라 프로제니움",
    elite_track: "엘리트 과정",
    mechanicus_blood: "기계교 도제",
    pious: "독실한 신앙",
    noble: "귀족 혈통",
    wealthy: "부유함",
    rogue_trader_blood: "로그 트레이더 혈통",
    navigator: "항해사(제3의 눈)",
    mutant_sanctioned: "공인 돌연변이",
    terra_elite: "테라 상류층",
    custodes_candidate: "쿠스토데스 후보 혈통",
    geneseed_compatible: "진시드 적합",
    psyker: "사이커",
    blank: "블랭크(퍼라이어)",
    prodigy: "전술 천재",
    saint_spark: "성흔의 기질",
    abhuman: "앱휴먼",
    ogryn: "오그린",
    ratling: "래틀링",
    streetwise: "언더하이브 생존자",
    militarum: "아스트라 밀리타룸",
    imperial_military: "제국 무관",
    officer: "야전 장교",
    scion: "템페스투스 사이온",
    commissar: "커미사르",
    lord_commissar: "로드 커미사르",
    sororitas: "전투 수녀",
    canoness: "캐노네스",
    power_armor: "파워 아머",
    astartes: "아스타르테스",
    battle_brother: "배틀 브라더",
    astartes_captain: "중대장(캡틴)",
    librarius_trained: "챕터 라이브러리우스",
    primaris: "프라이머리스",
    transhuman: "초인 개조",
    grey_knight: "그레이 나이트",
    custodes: "쿠스토데스",
    dreadnought: "드레드노트 안치",
    inquisition_agent: "심문소 어콜라이트",
    inquisition_favor: "심문소 신임",
    inquisitor: "이단심문관",
    rosette: "심문관 로제트",
    ordo_hereticus: "오르도 헤레티쿠스",
    ordo_xenos: "오르도 제노스",
    ordo_malleus: "오르도 말레우스",
    mechanicus: "아뎁투스 메카니쿠스",
    tech_priest: "테크프리스트",
    magos: "마고스",
    bionic: "기계 의체",
    navy: "임페리얼 네이비",
    voidborn: "보이드본",
    arbites: "아르비테스",
    administratum: "아드미니스트라툼",
    ecclesiarchy: "에클레시아키",
    rogue_trader: "로그 트레이더",
    sanctioned_psyker: "생션드 사이커",
    rogue_psyker: "무등록 사이커",
    heretic: "이단자",
    chaos_aligned: "카오스 귀의",
    mark_khorne: "코른의 낙인",
    mark_tzeentch: "젠취의 낙인",
    mark_nurgle: "너글의 낙인",
    mark_slaanesh: "슬라네쉬의 낙인",
    wanted_by_inquisition: "심문소 수배",
    penal_mark: "징벌 부대 낙인",
    elite_troop: "정예 병력",
    hero_of_imperium: "제국의 영웅",
    deathwatch_vet: "데스워치 참전",
    space_hulk_vet: "스페이스 헐크 정복",
    cadia_stands: "카디아는 서 있다!",
    tanith_ghost: "건트의 유령들",
    tanith_survivor: "타니스 생존자",
    macharian_veteran: "마카리우스 대성전 참전",
    damocles_veteran: "다모클레스 성전 참전",
    sabbat_veteran: "사바트 성전 참전",
    vraks_veteran: "브락스 공성전 참전",
    badab_veteran: "바답 전쟁 참전",
    armageddon_hero: "아마겟돈의 영웅",
    armageddon_3_vet: "3차 아마겟돈 참전",
    baal_survivor: "바알의 생존자",
    lions_gate_vet: "사자의 문 수호자",
    indomitus_crusader: "인도미투스 성전군",
    vigilus_veteran: "비질루스 방어전",
    tyranic_war_vet: "4차 타이라니드 전쟁",
    rift_survivor: "대균열 생존자",
    rift_touched: "대균열 감응",
    imperial_nihilus: "임페리움 니힐루스 고립",
    rejuvenat: "수명 연장 시술",
    stc_finder: "고대 STC 발견자",
    tech_heresy: "기술 이단",
    living_miracle: "살아 있는 기적",
    chapter_serf: "챕터 서프",
    daemon_bane: "악마의 천적",
    catachan_blooded: "카타찬 붉은 반다나",
    fenris_blood: "펜리스의 피",
    krieg_grenadier: "크리그 척탄병",
    xenos_contact: "외계인 접촉",
    ultramar_scholar: "울트라마 장학생",
    tyrannic_veteran: "타이라니드 전쟁 베테랑",
    death_company: "데스 컴퍼니 분노 극복",
    wolf_guard: "울프 가드 영예",
    inner_circle: "다크 엔젤 이너 서클",
    huscarl_oath: "허스칼 불굴 서약",
    promethean_smith: "프로메테우스 대장장이",
    emperors_champion: "황제의 투사",
    shadow_master: "그림자 걸음 달인",
    khan_rider: "초고리스 폭풍 기수",
    bond_comrade: "등을 맡긴 전우",
    bond_mentor: "인생의 스승",
    bond_rival: "숙명의 정적",
    bond_family: "가정과 배우자",
    bond_heir: "후계자·자녀",
    sister_of_silence: "침묵의 자매들"
  };

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

  function getWorld(id) {
    return DATA.WORLDS.find((w) => w.id === id) || DATA.WORLDS[0];
  }

  function getOrigin(id) {
    return DATA.ORIGINS.find((o) => o.id === id) || DATA.ORIGINS[0];
  }

  function getTrait(id) {
    return DATA.TRAITS.find((t) => t.id === id) || DATA.TRAITS[0];
  }

  function getCareer(id) {
    return DATA.CAREERS.find((c) => c.id === id) || DATA.CAREERS[0];
  }

  function getCharacter(id) {
    return DATA.CHARACTERS.find((c) => c.id === id) || null;
  }

  function getChapter(id) {
    return (DATA.CHAPTERS || []).find((c) => c.id === id) || null;
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

  function checkReq(state, req) {
    if (!req) return true;
    const world = getWorld(state.worldId);

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

    if (req.stats) {
      for (const [k, minVal] of Object.entries(req.stats)) {
        if ((state.stats[k] || 0) < minVal) return false;
      }
    }

    if (req.allTags) {
      for (const t of req.allTags) {
        if (!state.tags.includes(t)) return false;
      }
    }

    if (req.anyTags) {
      if (!req.anyTags.some((t) => state.tags.includes(t))) return false;
    }

    if (req.excludeTags) {
      if (req.excludeTags.some((t) => state.tags.includes(t))) return false;
    }

    if (req.anyCareers) {
      if (!req.anyCareers.includes(state.careerId)) return false;
    }

    if (req.anyChapters) {
      if (!state.chapterId || !req.anyChapters.includes(state.chapterId)) return false;
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

    if (req.anyWorldTags) {
      if (!req.anyWorldTags.some((wt) => (world.tags || []).includes(wt))) return false;
    }

    if (req.excludeWorldTags) {
      if (req.excludeWorldTags.some((wt) => (world.tags || []).includes(wt))) return false;
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

    if (req.or && Array.isArray(req.or)) {
      if (!req.or.some((sub) => checkReq(state, sub))) return false;
    }

    return true;
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
    if (req.minCorruption !== undefined) parts.push(`오염 ${req.minCorruption}+`);
    if (req.maxCorruption !== undefined) parts.push(`오염 ${req.maxCorruption} 이하`);
    if (req.allTags) {
      parts.push(req.allTags.map((t) => TAG_LABELS[t] || t).join(" & "));
    }
    if (req.anyCareers) {
      parts.push("전직: " + req.anyCareers.map((id) => getCareer(id).name.split(" ")[0]).join("/"));
    }
    if (req.anyChapters) {
      parts.push("챕터: " + req.anyChapters.map((id) => {
        const ch = getChapter(id);
        return ch ? ch.name : id;
      }).join("/"));
    }
    if (req.anyWorlds) {
      parts.push("행성: " + req.anyWorlds.map((id) => getWorld(id).name).join("/"));
    }
    if (req.or) {
      const orText = req.or.map((sub) => {
        if (sub.anyTags) return sub.anyTags.map((t) => TAG_LABELS[t] || t).join("/");
        if (sub.anyWorldTags) return `행성(${sub.anyWorldTags.join("/")})`;
        if (sub.anyCareers) return sub.anyCareers.map((id) => getCareer(id).name.split(" ")[0]).join("/");
        if (sub.anyChapters) return sub.anyChapters.map((id) => {
          const ch = getChapter(id);
          return ch ? ch.name : id;
        }).join("/");
        if (sub.anyWorlds) return sub.anyWorlds.map((id) => getWorld(id).name).join("/");
        return describeReq(sub);
      }).filter(Boolean).join(" 또는 ");
      if (orText) parts.push(`(${orText})`);
    }
    if (req.excludeTags && parts.length === 0) {
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
    const tMod = Math.floor(((state.stats.T || 25) - 25) * 0.45);
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
      const eligibleOrigins = DATA.ORIGINS.filter((o) => !o.worldFilter || o.worldFilter.includes(world.id));
      origin = pickWeighted(eligibleOrigins, "weight");
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

    if (birthYear >= 999 && (world.nihilusOverride || DATA.SEGMENTA[segmentum].nihilusAfterRift)) {
      if (!state.tags.includes("imperial_nihilus")) state.tags.push("imperial_nihilus");
    }

    addLog(
      state,
      `${formatImperialYear(birthYear)} — ${world.name}(${world.worldClass})의 ${origin.name} 가정에서 ${name}(${gender === "male" ? "남" : "여"})이(가) 태어났다. 선천 자질: [${trait.name}].`,
      "birth"
    );

    return state;
  }

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
    if (state.logs.length > 480) state.logs.pop();
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
    }
    if (outcome.warpYearShift && Number.isInteger(outcome.warpYearShift)) {
      state.year += outcome.warpYearShift;
    }
    if (outcome.forceCareer) {
      const targetCareer = getCareer(outcome.forceCareer);
      state.careerId = targetCareer.id;
      if (!state.careerHistory.includes(targetCareer.id)) state.careerHistory.push(targetCareer.id);
      if (targetCareer.useChapterName && !state.chapterName) {
        const hw = getWorld(state.homeWorldId);
        state.chapterName = hw.astartesChapter || "제국 아스타르테스 챕터";
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
    } else if (outcome.forceCareer === "astartes_scout" && !state.chapterId && !state.pendingEvent) {
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
      if (ev.setGlobalFlag === "greatRiftOpened") {
        const w = getWorld(state.worldId);
        const seg = DATA.SEGMENTA[state.segmentum];
        if (w.nihilusOverride || (seg && seg.nihilusAfterRift)) {
          if (!state.tags.includes("imperial_nihilus")) state.tags.push("imperial_nihilus");
        }
      }
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

    return {
      eventTitle: ev.title,
      choiceLabel: choice.label,
      rollResult,
      outcome
    };
  }

  function applyChronicle(state) {
    const pool = (DATA.CHRONICLES || []).filter((ch) => checkReq(state, ch.req));
    if (pool.length === 0) {
      addLog(state, generateDailyFlavor(state), "normal", null, { badge: "일상 기록" });
      return;
    }

    const recent = state.recentChronicles || [];
    const fresh = pool.filter((ch) => !recent.includes(ch.id));
    const notRecentShort = pool.filter((ch) => !recent.slice(0, Math.min(8, Math.max(1, pool.length - 1))).includes(ch.id));
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

  function advanceQuarter(state) {
    if (!state.alive || state.pendingEvent) return { status: "blocked" };

    // 1년 = 3분기(상반기/중반기/하반기). 3분기 이후 새해 진입 시 나이·연도 +1 및 연간 성장·노화 정산!
    let isNewYear = false;
    if (!state.quarter || state.quarter >= 3) {
      state.quarter = 1;
      state.age += 1;
      state.year += 1;
      isNewYear = true;
    } else {
      state.quarter += 1;
    }

    const world = getWorld(state.worldId);
    const career = getCareer(state.careerId);
    const focus = FOCUSES[state.focus] || FOCUSES.survival;

    if (isNewYear) {
      // 14세 도달 시 출신 배경에 맞는 자연스러운 첫 직무 편입
      if (state.age === 14 && state.careerId === "child") {
        if (state.tags.includes("mechanicus_blood")) {
          state.careerId = "skitarii";
          state.careerHistory.push("skitarii");
          addLog(state, "14세가 되어 기계교 견습 과정을 마치고 스키타리 예비대에 편입되었다.", "career", null, { badge: "직무 편입" });
        } else if (state.tags.includes("noble")) {
          state.careerId = "administratum";
          state.careerHistory.push("administratum");
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

      // 연간 스탯 성장 (초점 + 현재 병종)
      for (const key of Object.keys(STAT_META)) {
        const fGain = (focus.statDelta && focus.statDelta[key]) || 0;
        const cGain = (career.annualGrowth && career.annualGrowth[key]) || 0;
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

      // 체력, 신앙, 오염 연간 변동
      state.wounds = clamp(state.wounds + (focus.woundsDelta || 0), 0, state.maxWounds);
      state.faith = clamp(state.faith + (focus.faithDelta || 0), 0, 100);
      state.corruption = clamp(state.corruption + (focus.corruptionDelta || 0), 0, 100);

      if (state.year >= 999 && !state.globalFlags.greatRiftOpened) {
        state.globalFlags.greatRiftOpened = true;
      }

      // 노화 및 환경 위험 처리
      const lifeExp = computeLifeExpectancy(state);
      if (state.age > lifeExp * 0.72) {
        const overRatio = (state.age - lifeExp * 0.72) / Math.max(12, lifeExp * 0.35);
        const ageDamage = Math.max(1, Math.round(overRatio * (state.tags.includes("transhuman") ? 2.2 : 5.2)));
        state.wounds = clamp(state.wounds - ageDamage, 0, state.maxWounds);
      }

      const nihilusHaz = state.tags.includes("imperial_nihilus") ? 0.008 : 0;
      const totalHazard = Math.max(0.002, (world.annualHazard + (career.hazardMod || 0) + nihilusHaz) * (focus.hazardMult || 1));

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
      const dreadEv = DATA.EVENTS.find((e) => e.id === "ev_dreadnought_choice");
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

    // 1순위: 역사 연표(TIMELINE) 직접 체험 + 타 행성/성역 원격 아스트로패스 속보 전파
    for (const tl of DATA.TIMELINE) {
      const maxYear = tl.exactYear ? tl.year : (tl.endYear || tl.year + 1);
      if (state.year >= tl.year && state.year <= maxYear && !state.seenTimeline.includes(tl.id)) {
        if (checkReq(state, tl.filter)) {
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
        !world.tags.includes("feral")
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

    // 2순위: 동적 조건 이벤트(EVENTS) 발동 — 한 생애 동일 선택지 이벤트 최대 2회 상한 + 최근 14개 중복 방지 + 현재 행성/직업 고유 2.6배 우대!
    const countsMap = state.eventCounts || {};
    const allEligible = DATA.EVENTS.filter((ev) => {
      if (ev.once && state.seenEvents.includes(ev.id)) return false;
      const limit = ev.once ? 1 : (ev.maxRepeats || 2);
      if ((countsMap[ev.id] || 0) >= limit) return false;
      return checkReq(state, ev.req);
    });
    const recentEvs = state.recentEvents || [];
    const freshEvents = allEligible.filter((ev) => !recentEvs.includes(ev.id));
    const shortFreshEvents = allEligible.filter((ev) => !recentEvs.slice(0, 6).includes(ev.id));
    const eventPool = freshEvents.length > 0 ? freshEvents : shortFreshEvents;

    // 1년 3분기 기준 매 분기 ~30% 확률 -> 1년당 평균 선택지 이벤트 약 1회 + 일상 연대기 약 2회 = 1년 3건!
    const eventChance = state.age >= 12 && state.age <= 18 ? 0.34 : 0.28;
    if (eventPool.length > 0 && Math.random() < eventChance) {
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
    applyChronicle(state);
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

      if (state.globalFlags.greatRiftOpened) {
        const seg = DATA.SEGMENTA[state.segmentum];
        if (target.nihilusOverride || (seg && seg.nihilusAfterRift)) {
          if (!state.tags.includes("imperial_nihilus")) state.tags.push("imperial_nihilus");
        } else {
          state.tags = state.tags.filter((t) => t !== "imperial_nihilus");
        }
      }

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
    const selectable = DATA.CAREERS.filter((c) => c.selectable && c.id !== state.careerId);
    const unlockedCareers = selectable.filter((c) => checkReq(state, c.req)).sort((a, b) => b.tier - a.tier);

    // 앞으로 가장 가까운 추천 진로 2개 계산 (초보자 가이드용)
    const locked = selectable.filter((c) => !checkReq(state, c.req));
    const nearCareers = locked
      .filter((c) => {
        const r = c.req || {};
        if (r.gender && r.gender !== state.gender) return false;
        if (r.maxAge !== undefined && state.age > r.maxAge) return false;
        if (r.excludeTags && r.excludeTags.some((t) => state.tags.includes(t))) return false;
        if (r.allTags && !r.allTags.every((t) => state.tags.includes(t))) return false;
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
