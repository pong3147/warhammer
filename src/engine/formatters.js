// 경량 공통 포매터 · 메타 상수 · 조건 설명기 (SSOT)
// Astro 정적 페이지(/codex/*, /hall/)와 핵심 시뮬레이션 엔진(createEngine.js)이 단일 정본을 공유해
// 코덱스·전당 페이지에 4,100줄 규모의 전체 시뮬레이션 엔진이 번들링되지 않도록 분리한다.

export const SAVE_VERSION = 4;

export const ALIGNMENT_KEYS = ["humane", "dogmatic", "ruthless"];

export const ALIGNMENT_META = {
  humane: {
    key: "humane",
    name: "자비",
    fullName: "자비 · 인본",
    biasLabel: "자비 성향 우대",
    tiers: ["실리적 중립", "자비의 실천가", "자비의 수호자", "자비의 성자"]
  },
  dogmatic: {
    key: "dogmatic",
    name: "교조",
    fullName: "교조 · 광신",
    biasLabel: "교조 성향 우대",
    tiers: ["실리적 중립", "교조의 준수자", "철혈의 교조주의자", "광신의 화신"]
  },
  ruthless: {
    key: "ruthless",
    name: "암흑",
    fullName: "암흑 · 탐욕",
    biasLabel: "암흑 성향 우대",
    tiers: ["실리적 중립", "암흑의 기회주의자", "냉혹한 암흑의 지배자", "무자비한 암흑 군주"]
  }
};

export const SOCIAL_TIER_ORDER = ["underclass", "common", "elite", "apex"];

export const SOCIAL_TIER_LABELS = {
  underclass: "하층민",
  common: "일반 시민·실무",
  elite: "귀족·고위 계급",
  apex: "초인·최고위"
};

export const LIFE_REALM_KEYS = ["civilian", "cloistered", "military", "void", "mechanicus", "heretic"];

export const LIFE_REALM_LABELS = {
  civilian: "민간·행성 사회",
  cloistered: "폐쇄 수도·양성 기관",
  military: "군사·전선 복무",
  void: "우주 함대·보이드",
  mechanicus: "기계교·포지 성소",
  heretic: "이단·카오스 영역"
};

export const BODY_CLASS_KEYS = ["mortal", "augmetic", "transhuman", "dreadnought", "daemonic"];

export const BODY_CLASS_LABELS = {
  mortal: "필멸 인류",
  augmetic: "기계 의체·개조체",
  transhuman: "초인 개조체",
  dreadnought: "드레드노트 석관",
  daemonic: "악마·워프 승천체"
};

const APEX_SOCIAL_TAGS = [
  "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "daemon_prince",
  "high_lord_terra", "warmaster", "chapter_master", "sector_lord", "planetary_governor",
  "inquisitor", "lord_inquisitor", "knight_high_king", "nav_novator", "paternoval_envoy",
  "rt_lord_captain", "canoness", "cardinal", "commissar_general", "arbites_marshal",
  "departmento_head", "fabricator_locum", "fabricator_general", "navy_admiral",
  "gk_grand_master", "gk_supreme_master", "shield_captain", "captain_general",
  "grand_master_assassins", "chaos_lord", "renegade_marine"
];

const ELITE_SOCIAL_TAGS = [
  "noble", "wealthy", "terra_elite", "rogue_trader_blood", "navigator", "knight_blood",
  "officer", "rogue_trader", "imperial_knight", "assassin", "sister_of_silence",
  "guild_magnate", "crime_lord", "magos", "general_rank",
  "lord_commissar", "tempestus_prime", "navy_captain", "arbites_judge",
  "navis_officer", "knight_scion", "knight_freeblade"
];

export function computeBodyClass(state, career, tagSet) {
  const tags = tagSet || new Set((state && state.tags) || []);
  const c = career || null;
  if ((c && c.id === "daemon_prince") || tags.has("daemon_prince")) return "daemonic";
  if (tags.has("dreadnought")) return "dreadnought";
  if (
    (c && c.isTranshuman) ||
    tags.has("astartes") ||
    tags.has("custodes") ||
    tags.has("grey_knight") ||
    tags.has("living_saint") ||
    tags.has("transhuman") ||
    tags.has("renegade_marine") ||
    tags.has("chaos_lord")
  ) {
    return "transhuman";
  }
  if (
    (c && c.tree === "mechanicus") ||
    tags.has("bionic") ||
    tags.has("magos") ||
    ((state && state.augmeticsCount) || 0) > 0
  ) {
    return "augmetic";
  }
  return "mortal";
}

export function computeSocialTier(state, career, tagSet) {
  const tags = tagSet || new Set((state && state.tags) || []);
  const c = career || null;
  if (c && (c.tier >= 5 || c.isTranshuman)) return "apex";
  for (let i = 0; i < APEX_SOCIAL_TAGS.length; i++) {
    if (tags.has(APEX_SOCIAL_TAGS[i])) return "apex";
  }
  if (c && c.tier >= 3 && c.id !== "chaos_cultist" && c.id !== "sanctioned_psyker") {
    return "elite";
  }
  if (c && ["navis_navigator", "imperial_knight", "rogue_trader", "officio_assassinorum", "governor", "inquisition"].includes(c.tree)) {
    return "elite";
  }
  for (let i = 0; i < ELITE_SOCIAL_TAGS.length; i++) {
    if (tags.has(ELITE_SOCIAL_TAGS[i])) return "elite";
  }
  const cid = (c && c.id) || (state && state.careerId) || "child";
  if (cid === "underhive_ganger" || cid === "underhive_boss") return "underclass";
  if ((cid === "child" || cid === "menial_worker" || cid === "chaos_cultist") && tags.has("lowborn")) {
    return "underclass";
  }
  return "common";
}

export function computeLifeRealm(state, career, world, tagSet) {
  const tags = tagSet || new Set((state && state.tags) || []);
  const c = career || null;
  const w = world || null;
  const cid = (c && c.id) || (state && state.careerId) || "child";
  const tree = (c && c.tree) || "civil";

  if (tree === "chaos" || tags.has("heretic") || tags.has("chaos_aligned") || tags.has("daemon_prince") || tags.has("renegade_marine")) {
    return "heretic";
  }
  if (tree === "mechanicus") {
    return "mechanicus";
  }
  if (
    tree === "custodes" ||
    tree === "grey_knights" ||
    tree === "officio_assassinorum" ||
    tree === "sororitas" ||
    tree === "living_saint" ||
    tree === "ecclesiarchy" ||
    tree === "inquisition" ||
    cid === "sanctioned_psyker" ||
    cid === "master_of_astronomicum"
  ) {
    return "cloistered";
  }
  if (
    tree === "navy" ||
    tree === "rogue_trader" ||
    tree === "navis_navigator" ||
    (w && w.id === "voidborn")
  ) {
    return "void";
  }
  if (cid === "child" && tags.has("mechanicus_blood")) return "mechanicus";
  if (cid === "child" && (tags.has("schola") || tags.has("navigator"))) return "cloistered";
  if (cid === "child" && tags.has("voidborn")) return "void";
  if (
    tree === "militarum" ||
    tree === "commissariat" ||
    tree === "astartes" ||
    tree === "imperial_knight" ||
    cid === "primaris_psyker" ||
    (cid === "child" && w && w.id === "krieg")
  ) {
    return "military";
  }
  return "civilian";
}

export const STAT_META = {
  WS:  { key: "WS",  name: "백병", en: "Weapon Skill", desc: "근접전·체인소드·도검 전투력" },
  BS:  { key: "BS",  name: "사격", en: "Ballistic Skill", desc: "라스건·볼터·포술 명중률" },
  T:   { key: "T",   name: "강인", en: "Toughness", desc: "생존력·독/방사능 저항·개조 수술 내구" },
  Ag:  { key: "Ag",  name: "민첩", en: "Agility", desc: "기동·잠입·회피·함선 조종" },
  Int: { key: "Int", name: "지성", en: "Intelligence", desc: "기계교 교리·전술·수사·행정" },
  WP:  { key: "WP",  name: "의지", en: "Willpower", desc: "신앙·공포 저항·사이킥 통제" },
  Fel: { key: "Fel", name: "교섭", en: "Fellowship", desc: "지휘력·선동·사교·외교" },
  Inf: { key: "Inf", name: "권위", en: "Influence", desc: "제국 내 서열·인맥·물자·수명연장 접근성" }
};

export const FOCUSES = {
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
    woundsDelta: -1,
    faithDelta: -5,
    corruptionDelta: 5,
    hazardMult: 1.2
  }
};

export const QUARTER_LABELS = { 1: "상반기", 2: "중반기", 3: "하반기" };

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function normalizeAlignment(state) {
  const src = state && state.alignment && typeof state.alignment === "object" ? state.alignment : {};
  return {
    humane: clamp(Math.round(Number(src.humane) || 0), 0, 100),
    dogmatic: clamp(Math.round(Number(src.dogmatic) || 0), 0, 100),
    ruthless: clamp(Math.round(Number(src.ruthless) || 0), 0, 100)
  };
}

export function getAlignmentInfo(state) {
  const scores = normalizeAlignment(state);
  const ranked = ALIGNMENT_KEYS
    .map((k) => ({ key: k, val: scores[k] }))
    .sort((a, b) => b.val - a.val);
  const top = ranked[0];
  const second = ranked[1];
  if (top.val < 15) {
    return {
      scores,
      dominant: "neutral",
      tier: 0,
      label: "실리적 중립",
      fullLabel: "실리적 중립",
      detail: `자비 ${scores.humane} · 교조 ${scores.dogmatic} · 암흑 ${scores.ruthless}`,
      tied: false
    };
  }
  if (top.val === second.val) {
    return {
      scores,
      dominant: "neutral",
      tier: top.val >= 60 ? 3 : top.val >= 35 ? 2 : 1,
      label: "갈등하는 신념",
      fullLabel: "갈등하는 신념",
      detail: `자비 ${scores.humane} · 교조 ${scores.dogmatic} · 암흑 ${scores.ruthless}`,
      tied: true
    };
  }
  const tier = top.val >= 60 ? 3 : top.val >= 35 ? 2 : 1;
  const meta = ALIGNMENT_META[top.key];
  const label = meta.tiers[tier];
  return {
    scores,
    dominant: top.key,
    tier,
    label,
    fullLabel: `${label} (${tier}단계)`,
    detail: `자비 ${scores.humane} · 교조 ${scores.dogmatic} · 암흑 ${scores.ruthless}`,
    tied: false
  };
}

export function formatImperialYear(absYear) {
  if (absYear < 1000) {
    return `${String(absYear).padStart(3, "0")}.M41`;
  }
  const millennium = 41 + Math.floor(absYear / 1000);
  const yr = absYear % 1000;
  return `${String(yr).padStart(3, "0")}.M${millennium}`;
}

export function formatImperialDate(absYear, quarter = 1) {
  return `${formatImperialYear(absYear)} ${QUARTER_LABELS[quarter] || "상반기"}`;
}

export function getWorldShortTag(world) {
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
  if (world.id === "generic_knight") return "봉건 기사 행성";
  return world.worldClass.split(" (")[0];
}

export function createCoreFormatters(DATA) {
  const TAG_LABELS = (DATA && DATA.TAG_LABELS) || {};
  const WORLD_TAG_LABELS = (DATA && DATA.WORLD_TAG_LABELS) || {};
  const WORLD_BY_ID = new Map((DATA.WORLDS || []).map((w) => [w.id, w]));
  const ORIGIN_BY_ID = new Map((DATA.ORIGINS || []).map((o) => [o.id, o]));
  const TRAIT_BY_ID = new Map((DATA.TRAITS || []).map((t) => [t.id, t]));
  const CAREER_BY_ID = new Map((DATA.CAREERS || []).map((c) => [c.id, c]));
  const CHAR_BY_ID = new Map((DATA.CHARACTERS || []).map((c) => [c.id, c]));
  const CHAPTER_BY_ID = new Map((DATA.CHAPTERS || []).map((c) => [c.id, c]));
  const TREE_NAME_BY_ID = new Map();
  for (const c of DATA.CAREERS || []) {
    if (c && c.tree && !TREE_NAME_BY_ID.has(c.tree)) {
      TREE_NAME_BY_ID.set(c.tree, c.treeName || c.tree);
    }
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
  function getCareerShortName(id) {
    const c = getCareer(id);
    if (!c) return id;
    return c.name.replace(/\s*\([^)]*\)/g, "").split(" · ")[0];
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
    if (req.minAlign) {
      for (const [k, v] of Object.entries(req.minAlign)) {
        const am = ALIGNMENT_META[k];
        parts.push(`${am ? am.name : k} 성향 ${v}+`);
      }
    }
    if (req.maxAlign) {
      for (const [k, v] of Object.entries(req.maxAlign)) {
        const am = ALIGNMENT_META[k];
        parts.push(`${am ? am.name : k} 성향 ${v} 이하`);
      }
    }
    if (req.anyDominantAlign && req.anyDominantAlign.length) {
      const names = req.anyDominantAlign.map((k) =>
        k === "neutral" ? "중립" : ((ALIGNMENT_META[k] && ALIGNMENT_META[k].name) || k)
      );
      parts.push(`주성향: ${names.join("/")}`);
    }
    if (req.minSocialTier && req.maxSocialTier) {
      const minLbl = SOCIAL_TIER_LABELS[req.minSocialTier] || req.minSocialTier;
      const maxLbl = SOCIAL_TIER_LABELS[req.maxSocialTier] || req.maxSocialTier;
      parts.push(req.minSocialTier === req.maxSocialTier ? `신분 계층: ${minLbl}` : `신분 계층: ${minLbl}~${maxLbl}`);
    } else if (req.minSocialTier) {
      parts.push(`신분 계층: ${SOCIAL_TIER_LABELS[req.minSocialTier] || req.minSocialTier} 이상`);
    } else if (req.maxSocialTier) {
      parts.push(`신분 계층: ${SOCIAL_TIER_LABELS[req.maxSocialTier] || req.maxSocialTier} 이하`);
    }
    if (req.anySocialTiers && req.anySocialTiers.length) {
      parts.push("신분 계층: " + req.anySocialTiers.map((k) => SOCIAL_TIER_LABELS[k] || k).join("/"));
    }
    if (req.anyRealms && req.anyRealms.length) {
      parts.push("생활권: " + req.anyRealms.map((k) => LIFE_REALM_LABELS[k] || k).join("/"));
    }
    if (req.anyBodyClasses && req.anyBodyClasses.length) {
      parts.push("신체 분류: " + req.anyBodyClasses.map((k) => BODY_CLASS_LABELS[k] || k).join("/"));
    }
    if (req.maxCareerTier !== undefined) {
      parts.push(`진로 Tier ${req.maxCareerTier} 이하`);
    }
    if (req.allTags && req.allTags.length) {
      parts.push(req.allTags.map((t) => TAG_LABELS[t] || t).join(" & "));
    }
    if (req.anyTags && req.anyTags.length) {
      parts.push(req.anyTags.map((t) => TAG_LABELS[t] || t).join("/"));
    }
    if (req.anyCareers && req.anyCareers.length) {
      parts.push("직군: " + req.anyCareers.map((id) => getCareerShortName(id)).join("/"));
    }
    if (req.anyPastCareers && req.anyPastCareers.length) {
      parts.push("경력: " + req.anyPastCareers.map((id) => getCareerShortName(id)).join("/"));
    }
    if (req.anyChapters && req.anyChapters.length) {
      parts.push(
        "챕터: " +
          req.anyChapters
            .map((id) => {
              const ch = getChapter(id);
              return ch ? ch.name : id;
            })
            .join("/")
      );
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
      parts.push(
        "성역: " +
          req.anySegmenta.map((sid) => (DATA.SEGMENTA[sid] && DATA.SEGMENTA[sid].name) || sid).join("/")
      );
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
    const hasPositive = parts.length > 0;
    if (!hasPositive) {
      if (req.excludeRealms && req.excludeRealms.length) {
        parts.push(req.excludeRealms.map((k) => `${LIFE_REALM_LABELS[k] || k} 제외`).join(", "));
      }
      if (req.excludeBodyClasses && req.excludeBodyClasses.length) {
        parts.push(req.excludeBodyClasses.map((k) => `${BODY_CLASS_LABELS[k] || k} 제외`).join(", "));
      }
      if (req.excludeTrees && req.excludeTrees.length) {
        parts.push(req.excludeTrees.map((t) => `${TREE_NAME_BY_ID.get(t) || t} 제외`).join(", "));
      }
      if (req.excludePastCareers && req.excludePastCareers.length) {
        parts.push(req.excludePastCareers.map((id) => `${getCareerShortName(id)} 경력 제외`).join(", "));
      }
      if (req.excludeChapters && req.excludeChapters.length) {
        parts.push(
          req.excludeChapters
            .map((id) => `${(getChapter(id) && getChapter(id).name) || id} 제외`)
            .join(", ")
        );
      }
      if (req.excludeWorlds && req.excludeWorlds.length) {
        parts.push(req.excludeWorlds.map((id) => `${getWorld(id).name} 제외`).join(", "));
      }
      if (req.excludeHomeWorlds && req.excludeHomeWorlds.length) {
        parts.push(req.excludeHomeWorlds.map((id) => `${getWorld(id).name} 출신 제외`).join(", "));
      }
      if (req.excludeWorldTags && req.excludeWorldTags.length) {
        parts.push(req.excludeWorldTags.map((wt) => `${WORLD_TAG_LABELS[wt] || wt} 제외`).join(", "));
      }
      if (req.excludeTags && req.excludeTags.length) {
        parts.push(req.excludeTags.map((t) => `${TAG_LABELS[t] || t} 불가`).join(", "));
      }
    }
    return parts.join(" · ");
  }

  return {
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
    QUARTER_LABELS,
    TAG_LABELS,
    WORLD_TAG_LABELS,
    WORLD_BY_ID,
    ORIGIN_BY_ID,
    TRAIT_BY_ID,
    CAREER_BY_ID,
    CHAR_BY_ID,
    CHAPTER_BY_ID,
    TREE_NAME_BY_ID,
    getWorld,
    getOrigin,
    getTrait,
    getCareer,
    getCharacter,
    getChapter,
    getCareerShortName,
    computeSocialTier,
    computeLifeRealm,
    computeBodyClass,
    formatImperialYear,
    formatImperialDate,
    getWorldShortTag,
    normalizeAlignment,
    getAlignmentInfo,
    describeReq
  };
}
