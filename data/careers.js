window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};

window.IMPERIUM_DATA.CAREERS = [
  // ===== 0티어: 유년기 / 기본 시민 =====
  {
    id: "child",
    name: "제국의 유년기",
    en: "Imperial Youth",
    faction: "일반 시민",
    tier: 0,
    lifeBonus: 0,
    hazardMod: 0,
    annualGrowth: {},
    req: null,
    selectable: false,
    desc: "아직 성년이 되지 않은 제국의 아이. 어떤 초점을 두고 스탯을 기르느냐에 따라 아스타르테스부터 이단심문소까지 미래의 문이 열린다.",
    source: "Imperium Maledictum Core"
  },
  {
    id: "menial_worker",
    name: "행성 노동자 · 길드원",
    en: "Imperial Menial / Guild Worker",
    faction: "일반 시민",
    tier: 1,
    lifeBonus: 0,
    hazardMod: 0.002,
    annualGrowth: { T: 1, Int: 0.5 },
    req: { minAge: 14 },
    selectable: true,
    onJoin: { stats: { T: 2 } },
    desc: "매뉴팩토룸의 용광로나 아그리 월드의 들판에서 하루 14시간을 바치는 제국의 톱니바퀴. 그나마 전선보다는 살아남을 확률이 높다.",
    source: "Lexicanum: Imperial Citizens"
  },
  {
    id: "underhive_ganger",
    name: "언더하이브 갱단원 · 용병",
    en: "Underhive Ganger / Bounty Hunter",
    faction: "지하 세계",
    tier: 1,
    lifeBonus: -6,
    hazardMod: 0.012,
    annualGrowth: { WS: 1.5, BS: 1, Ag: 1.5, T: 1 },
    req: { minAge: 14, stats: { Ag: 28 }, or: [{ anyTags: ["lowborn"] }, { anyWorldTags: ["hive", "underhive"] }] },
    selectable: true,
    onJoin: { stats: { WS: 4, Ag: 4, Inf: -2 }, addTags: ["streetwise"] },
    desc: "아르비테스의 눈을 피해 하층 도시의 구역을 다투는 무법자. 총탄과 독가스를 버텨 낸다면 뜻밖의 거물이나 스페이스 마린 징병관의 눈에 띌 수도 있다.",
    source: "Lexicanum: Necromunda / Dark Heresy"
  },

  // ===== 아스트라 밀리타룸 (임페리얼 가드) 트리 =====
  {
    id: "pdf_trooper",
    name: "행성 방위군 (PDF)",
    en: "Planetary Defence Force",
    faction: "행성 방위군",
    tier: 1,
    lifeBonus: 0,
    hazardMod: 0.008,
    annualGrowth: { BS: 1.2, WS: 1, T: 1 },
    req: { minAge: 15, stats: { T: 22 }, excludeTags: ["astartes", "custodes", "heretic"] },
    selectable: true,
    onJoin: { stats: { BS: 3, WS: 3, T: 2 } },
    desc: "고향 행성의 치안과 1차 방어를 맡는 주둔군. 아스트라 밀리타룸 십일조 차출을 앞둔 관문이기도 하다.",
    source: "Lexicanum: Planetary Defence Forces"
  },
  {
    id: "astra_militarum",
    name: "아스트라 밀리타룸 보병 (임페리얼 가드)",
    en: "Astra Militarum Guardsman",
    faction: "아스트라 밀리타룸",
    tier: 2,
    useRegimentName: true,
    lifeBonus: -4,
    hazardMod: 0.022,
    annualGrowth: { BS: 2, WS: 1.5, T: 1.5, WP: 1 },
    req: { minAge: 16, stats: { T: 28, BS: 25 }, excludeTags: ["astartes", "custodes", "heretic"] },
    selectable: true,
    onJoin: { stats: { BS: 5, WS: 4, T: 4, WP: 3 }, addTags: ["militarum", "imperial_military"] },
    desc: "은하계 전역의 지옥으로 투입되는 인류제국의 망치. 출신 행성에 따라 카디안, 크리그, 카타찬 등 전설적인 고유 연대로 배속된다.",
    source: "Lexicanum: Astra Militarum / Codex: Astra Militarum"
  },
  {
    id: "militarum_officer",
    name: "아스트라 밀리타룸 장교 · 연대 지휘관",
    en: "Astra Militarum Officer / Colonel",
    faction: "아스트라 밀리타룸",
    tier: 3,
    useRegimentName: true,
    lifeBonus: 20,
    hazardMod: 0.016,
    annualGrowth: { Fel: 1.8, Int: 1.5, Inf: 2, WP: 1.2 },
    req: {
      minAge: 22,
      stats: { Int: 42, Fel: 42, WP: 40 },
      or: [{ anyCareers: ["astra_militarum", "pdf_trooper", "tempestus_scion"] }, { anyTags: ["noble", "military_blood"] }],
      excludeTags: ["abhuman", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { Fel: 6, Inf: 10, Int: 4 }, addTags: ["officer", "militarum"] },
    desc: "수천 명의 가드맨과 리만 러스 전차대를 지휘하는 야전 장교. 제국의 승리를 위해 병사들의 생명을 냉혹하게 저울질해야 한다.",
    source: "Codex: Astra Militarum / Only War"
  },
  {
    id: "tempestus_scion",
    name: "밀리타룸 템페스투스 사이온",
    en: "Militarum Tempestus Scion",
    faction: "아스트라 밀리타룸",
    tier: 3,
    lifeBonus: 10,
    hazardMod: 0.02,
    annualGrowth: { BS: 2.5, WS: 2, Ag: 1.8, T: 1.5, WP: 1.5 },
    req: {
      minAge: 17,
      stats: { BS: 46, T: 42, WP: 44 },
      or: [{ anyTags: ["schola"] }, { anyCareers: ["astra_militarum"] }],
      excludeTags: ["abhuman", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { BS: 8, WS: 5, T: 5, Inf: 6 }, addTags: ["scion", "elite_troop", "militarum"] },
    desc: "스콜라 프로제니움에서 극한의 훈련을 받은 정예 공수 특전대. 카라페이스 갑주와 핫샷 라스건으로 가장 치명적인 적진 한복판에 강하한다.",
    source: "Lexicanum: Tempestus Scions / Codex: Militarum Tempestus"
  },

  // ===== 오피시오 프리펙투스 (커미사르) 트리 =====
  {
    id: "commissar",
    name: "제국 커미사르",
    en: "Imperial Commissar",
    faction: "오피시오 프리펙투스",
    tier: 3,
    lifeBonus: 18,
    hazardMod: 0.018,
    annualGrowth: { WP: 2, Fel: 1.8, WS: 1.5, BS: 1.5, Inf: 1.8 },
    req: {
      minAge: 18,
      stats: { WP: 48, Fel: 40, WS: 36 },
      minFaith: 48,
      maxCorruption: 15,
      or: [{ anyTags: ["schola"] }, { anyCareers: ["astra_militarum", "militarum_officer", "arbites"] }],
      excludeTags: ["abhuman", "psyker", "astartes", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { WP: 7, Fel: 6, Inf: 10, WS: 4 }, addTags: ["commissar", "imperial_military"] },
    desc: "검은 제복과 볼트 피스톨로 연대의 사기와 군기를 수호하는 정치 장교. 비겁자를 처결하고 최선두에서 돌격하며 공포와 존경을 한 몸에 받는다.",
    source: "Lexicanum: Commissar / Ciaphas Cain & Gaunt's Ghosts"
  },
  {
    id: "lord_commissar",
    name: "로드 커미사르",
    en: "Lord Commissar",
    faction: "오피시오 프리펙투스",
    tier: 4,
    lifeBonus: 45,
    hazardMod: 0.015,
    annualGrowth: { WP: 2, Fel: 2, Inf: 2.5, WS: 1.5 },
    req: {
      minAge: 32,
      anyCareers: ["commissar"],
      stats: { WP: 62, Fel: 58, Inf: 55, WS: 50 },
      minFaith: 65,
      maxCorruption: 10
    },
    selectable: true,
    onJoin: { stats: { Inf: 14, WP: 8, Fel: 8 }, addTags: ["lord_commissar", "hero_of_imperium"] },
    desc: "전구 전체의 연대와 장군들마저 고개를 숙이게 만드는 전설적 커미사르. 세바스찬 야릭이나 이브람 건트처럼 역사의 상징이 된다.",
    source: "Lexicanum: Lord Commissar / Codex: Astra Militarum"
  },

  // ===== 아뎁타 소로리타스 (전투 수녀회) =====
  {
    id: "adepta_sororitas",
    name: "아뎁타 소로리타스 (전투 수녀)",
    en: "Adepta Sororitas — Battle Sister",
    faction: "아뎁타 소로리타스",
    tier: 3,
    lifeBonus: 24,
    hazardMod: 0.018,
    annualGrowth: { WP: 2.5, BS: 2, WS: 1.8, T: 1.5 },
    req: {
      minAge: 17,
      gender: "female",
      stats: { WP: 48, BS: 38, T: 36 },
      minFaith: 65,
      maxCorruption: 10,
      or: [{ anyTags: ["schola", "pious", "saint_spark"] }, { anyWorldTags: ["shrine", "sororitas"] }],
      excludeTags: ["abhuman", "psyker", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { WP: 8, BS: 6, WS: 6, T: 5, Inf: 6 }, addTags: ["sororitas", "power_armor"] },
    desc: "파워 아머와 볼터, 화염방사기로 이단자를 정화하는 황제의 신부들. 절대적인 신앙은 때로 전장에서 실제 기적을 일으킨다.",
    source: "Lexicanum: Adepta Sororitas / Codex: Adepta Sororitas"
  },
  {
    id: "canoness",
    name: "캐노네스 (수녀원장)",
    en: "Canoness Superior",
    faction: "아뎁타 소로리타스",
    tier: 4,
    lifeBonus: 55,
    hazardMod: 0.015,
    annualGrowth: { WP: 2.5, Fel: 2, Inf: 2.5, WS: 1.5 },
    req: {
      minAge: 30,
      anyCareers: ["adepta_sororitas"],
      stats: { WP: 65, Fel: 55, WS: 52, Inf: 50 },
      minFaith: 80,
      maxCorruption: 5
    },
    selectable: true,
    onJoin: { stats: { WP: 8, Inf: 12, Fel: 8 }, addTags: ["canoness", "hero_of_imperium"] },
    desc: "전투 수녀회의 군단(Order)을 이끄는 성스러운 사령관. 신앙의 성물을 휘두르며 성전군의 선봉에 선다.",
    source: "Codex: Adepta Sororitas"
  },

  // ===== 아뎁투스 아스타르테스 (스페이스 마린) 트리 =====
  {
    id: "astartes_scout",
    name: "아스타르테스 네오파이트 · 스카웃",
    en: "Adeptus Astartes Neophyte / Scout",
    faction: "아뎁투스 아스타르테스",
    tier: 3,
    useChapterName: true,
    lifeBonus: 260,
    hazardMod: 0.016,
    annualGrowth: { WS: 2.8, BS: 2.5, T: 2.8, Ag: 2, WP: 2 },
    req: {
      minAge: 10,
      maxAge: 17,
      gender: "male",
      stats: { T: 38, WS: 35, WP: 34 },
      maxCorruption: 10,
      or: [{ anyTags: ["geneseed_compatible"] }, { anyWorldTags: ["astartes_recruit"] }],
      excludeTags: ["abhuman", "astartes", "custodes", "heretic"]
    },
    selectable: true,
    trialCheck: { stat: "T", diff: -5, title: "진시드 이식 및 챕터 선발 시련", failDeathChance: 0.45 },
    onJoin: { stats: { T: 16, WS: 14, BS: 12, WP: 12, Ag: 8, Inf: 10 }, woundsBonus: 40, addTags: ["astartes", "transhuman"] },
    desc: "끔찍한 선발 시련과 19개(프라이머리스 22개)의 초인 장기 이식을 견뎌 낸 챕터의 신참 전사. 이제 평범한 인간의 수명과 공포를 초월한다.",
    source: "Lexicanum: Creation of a Space Marine / Codex: Space Marines"
  },
  {
    id: "astartes_brother",
    name: "아스타르테스 배틀 브라더",
    en: "Adeptus Astartes Battle-Brother",
    faction: "아뎁투스 아스타르테스",
    tier: 4,
    useChapterName: true,
    lifeBonus: 420,
    hazardMod: 0.014,
    annualGrowth: { WS: 2, BS: 2, T: 1.5, WP: 1.8, Int: 1 },
    req: {
      minAge: 19,
      anyCareers: ["astartes_scout"],
      stats: { WS: 55, BS: 52, T: 56, WP: 52 },
      maxCorruption: 15
    },
    selectable: true,
    onJoin: { stats: { WS: 8, BS: 8, T: 8, Inf: 10 }, woundsBonus: 25, addTags: ["power_armor", "battle_brother"] },
    desc: "검은 갑각과 파워 아머를 하사받은 황제의 죽음의 천사. 수백 년에 걸쳐 은하계 최악의 전선을 누비며 인류를 수호한다.",
    source: "Lexicanum: Space Marines / Deathwatch Core"
  },
  {
    id: "astartes_captain",
    name: "아스타르테스 중대장 (캡틴)",
    en: "Space Marine Company Captain",
    faction: "아뎁투스 아스타르테스",
    tier: 5,
    useChapterName: true,
    lifeBonus: 650,
    hazardMod: 0.012,
    annualGrowth: { WS: 1.5, BS: 1.5, Int: 2, Fel: 2, Inf: 2.5, WP: 1.5 },
    req: {
      minAge: 65,
      anyCareers: ["astartes_brother"],
      stats: { WS: 72, BS: 68, WP: 68, Int: 55, Inf: 52 },
      maxCorruption: 10
    },
    selectable: true,
    onJoin: { stats: { Inf: 18, WS: 8, Fel: 10, WP: 8 }, woundsBonus: 20, addTags: ["astartes_captain", "hero_of_imperium"] },
    desc: "100명의 스페이스 마린과 타격 순양함을 지휘하는 영웅. 챕터 마스터 다음가는 권위와 전설적 무위를 지닌다.",
    source: "Codex: Space Marines"
  },

  // ===== 그레이 나이트 & 쿠스토데스 (전설 특수 병종) =====
  {
    id: "grey_knight",
    name: "그레이 나이트 (오르도 말레우스 전투 형제)",
    en: "Grey Knight (Chapter 666)",
    faction: "그레이 나이트",
    tier: 5,
    lifeBonus: 480,
    hazardMod: 0.017,
    annualGrowth: { WP: 2.8, WS: 2.5, T: 2, Int: 1.5 },
    req: {
      minAge: 12,
      maxAge: 26,
      gender: "male",
      allTags: ["psyker"],
      stats: { WP: 62, T: 50, WS: 46 },
      minFaith: 60,
      maxCorruption: 5,
      excludeTags: ["astartes", "custodes", "abhuman", "heretic"]
    },
    selectable: true,
    trialCheck: { stat: "WP", diff: -10, title: "타이탄의 666 시련 (그레이 나이트 입단)", failDeathChance: 0.55 },
    onJoin: { stats: { WP: 18, WS: 16, T: 14, BS: 10, Inf: 14 }, woundsBonus: 45, corruptionReset: true, addTags: ["astartes", "grey_knight", "transhuman", "power_armor"] },
    desc: "토성의 위성 타이탄에서 황제의 유전자로 빚어지는 비밀 챕터. 전원 사이커이면서도 단 한 번도 카오스에 타락한 적 없는 악마 사냥꾼이다.",
    source: "Lexicanum: Grey Knights / Codex: Grey Knights"
  },
  {
    id: "adeptus_custodes",
    name: "아뎁투스 쿠스토데스 (황금 근위대)",
    en: "Adeptus Custodes",
    faction: "아뎁투스 쿠스토데스",
    tier: 5,
    lifeBonus: 1200,
    hazardMod: 0.007,
    annualGrowth: { WS: 2.5, BS: 2, T: 2, Int: 2.2, WP: 2.2, Inf: 2 },
    req: {
      minAge: 10,
      maxAge: 20,
      stats: { T: 48, WS: 46, WP: 52, Int: 44 },
      maxCorruption: 0,
      or: [{ allTags: ["custodes_candidate"] }, { anyWorlds: ["terra"], allTags: ["noble"] }],
      excludeTags: ["psyker", "abhuman", "astartes", "heretic"]
    },
    selectable: true,
    trialCheck: { stat: "T", diff: -12, title: "황궁 연금술 유전자 재창조 시술", failDeathChance: 0.5 },
    onJoin: { stats: { WS: 22, BS: 18, T: 20, Ag: 16, Int: 16, WP: 20, Inf: 25 }, woundsBonus: 70, addTags: ["custodes", "transhuman", "power_armor", "hero_of_imperium"] },
    desc: "황금 옥좌를 지키는 황제의 만 명의 수호자. 아스타르테스조차 범접할 수 없는 세포 단위의 연금술로 빚어진 철학자이자 반신적 무인이다.",
    source: "Lexicanum: Adeptus Custodes / Codex: Adeptus Custodes"
  },

  // ===== 이단심문소 (이단심문소) 트리 =====
  {
    id: "inquisition_acolyte",
    name: "이단심문소 어콜라이트 (수행원)",
    en: "Inquisitorial Acolyte / Interrogator",
    faction: "이단심문소 (Inquisition)",
    tier: 3,
    lifeBonus: 35,
    hazardMod: 0.017,
    annualGrowth: { Int: 2.2, WP: 2, Fel: 1.5, BS: 1.2, Inf: 2 },
    req: {
      minAge: 18,
      stats: { Int: 45, WP: 45, Inf: 32 },
      maxCorruption: 25,
      excludeTags: ["astartes", "custodes", "abhuman", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { Int: 6, WP: 6, Inf: 12 }, addTags: ["inquisition_agent"] },
    desc: "이단심문관의 그림자 속에서 이단, 외계인, 악마의 음모를 파헤치는 비밀 요원. 수많은 지옥을 견디고 인정을 받으면 로제트를 하사받는다.",
    source: "Dark Heresy 1e & 2e / Imperium Maledictum"
  },
  {
    id: "inquisitor",
    name: "제국 이단심문관 (인퀴지터)",
    en: "Inquisitor of the Holy Ordos",
    faction: "이단심문소 (Inquisition)",
    tier: 5,
    lifeBonus: 180,
    hazardMod: 0.014,
    annualGrowth: { Int: 2, WP: 2.2, Inf: 3, Fel: 1.8 },
    req: {
      minAge: 28,
      anyCareers: ["inquisition_acolyte"],
      stats: { Int: 60, WP: 60, Inf: 55 },
      maxCorruption: 35
    },
    selectable: true,
    onJoin: { stats: { Inf: 25, WP: 10, Int: 8 }, addTags: ["inquisitor", "rosette", "hero_of_imperium"] },
    desc: "오직 황제에게만 책임지는 절대 권력의 심판자. 한 번의 서명으로 행성 하나에 익스터미나투스를 선고할 수 있으며 오르도 헤레티쿠스·제노스·말레우스에서 활약한다.",
    source: "Lexicanum: Inquisitor / Eisenhorn Trilogy"
  },

  // ===== 아뎁투스 메카니쿠스 (기계교) 트리 =====
  {
    id: "skitarii",
    name: "메카니쿠스 스키타리 병사",
    en: "Adeptus Mechanicus Skitarii",
    faction: "아뎁투스 메카니쿠스",
    tier: 2,
    lifeBonus: 35,
    hazardMod: 0.018,
    annualGrowth: { BS: 2.2, T: 2, Int: 1.2 },
    req: {
      minAge: 16,
      stats: { Int: 32, T: 30 },
      or: [{ anyTags: ["mechanicus_blood"] }, { anyWorldTags: ["forge", "mechanicus"] }, { stats: { Int: 45 } }],
      excludeTags: ["astartes", "custodes", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { BS: 7, T: 7, Int: 4, Fel: -5 }, addTags: ["mechanicus", "bionic"] },
    desc: "나약한 사지를 강철 의체로 교체하고 옴니시아의 전파 명령에 따라 행진하는 기계교의 사이보그 전사.",
    source: "Lexicanum: Skitarii / Codex: Adeptus Mechanicus"
  },
  {
    id: "tech_priest",
    name: "아뎁투스 메카니쿠스 테크프리스트",
    en: "Tech-Priest Enginseer / Lexmechanic",
    faction: "아뎁투스 메카니쿠스",
    tier: 3,
    lifeBonus: 110,
    hazardMod: 0.01,
    annualGrowth: { Int: 2.8, T: 1.5, Inf: 1.5, WP: 1 },
    req: {
      minAge: 18,
      stats: { Int: 48 },
      or: [{ anyTags: ["mechanicus_blood", "mechanicus"] }, { anyWorldTags: ["forge"] }, { stats: { Int: 56 } }],
      excludeTags: ["astartes", "custodes", "abhuman", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { Int: 10, T: 6, Inf: 8, Fel: -4 }, addTags: ["mechanicus", "bionic", "tech_priest"] },
    desc: "붉은 로브와 메카덴드라이트를 두르고 기계령을 달래는 기술 사제. 생체 개조를 거듭하며 일반 인간의 수명을 아득히 넘긴다.",
    source: "Lexicanum: Tech-Priest / Imperium Maledictum"
  },
  {
    id: "archmagos",
    name: "마고스 · 아크마고스 (대기계사제)",
    en: "Magos Dominus / Archmagos",
    faction: "아뎁투스 메카니쿠스",
    tier: 5,
    lifeBonus: 360,
    hazardMod: 0.008,
    annualGrowth: { Int: 3, Inf: 2.5, WP: 1.5, T: 1.5 },
    req: {
      minAge: 40,
      anyCareers: ["tech_priest"],
      stats: { Int: 72, Inf: 55, WP: 50 }
    },
    selectable: true,
    onJoin: { stats: { Int: 14, Inf: 18, T: 10 }, woundsBonus: 20, addTags: ["magos", "hero_of_imperium"] },
    desc: "포지 월드의 공장과 STC 발굴 함대를 통솔하는 기계교 최고위 현자. 이미 육신의 90% 이상이 성스러운 강철로 대체되어 있다.",
    source: "Codex: Adeptus Mechanicus"
  },

  // ===== 제국 행정 / 치안 / 해군 / 국교 / 로그 트레이더 =====
  {
    id: "imperial_navy",
    name: "임페리얼 네이비 사관 · 조종사",
    en: "Imperial Navy Officer / Void Pilot",
    faction: "임페리얼 네이비",
    tier: 2,
    lifeBonus: 18,
    hazardMod: 0.015,
    annualGrowth: { Ag: 1.8, BS: 1.8, Int: 1.5, Inf: 1.2 },
    req: { minAge: 17, stats: { Int: 36, Ag: 34 }, excludeTags: ["astartes", "custodes", "abhuman", "heretic"] },
    selectable: true,
    onJoin: { stats: { Ag: 6, BS: 5, Int: 5, Inf: 6 }, addTags: ["navy", "voidborn", "imperial_military"] },
    desc: "수 킬로미터 길이의 성간 전함과 퓨리 요격기를 몰고 워프 폭풍과 카오스 함대에 맞서는 제국 해군.",
    source: "Lexicanum: Imperial Navy / Battlefleet Gothic"
  },
  {
    id: "arbites",
    name: "아뎁투스 아르비테스 (제국 치안대)",
    en: "Adeptus Arbites Arbitrator",
    faction: "아뎁투스 아르비테스",
    tier: 2,
    lifeBonus: 12,
    hazardMod: 0.014,
    annualGrowth: { WS: 1.5, BS: 1.5, WP: 1.5, Int: 1.2, Inf: 1.2 },
    req: { minAge: 18, stats: { WP: 38, WS: 34, Int: 34 }, maxCorruption: 15, excludeTags: ["astartes", "custodes", "abhuman", "heretic"] },
    selectable: true,
    onJoin: { stats: { WS: 5, BS: 5, WP: 6, Inf: 8 }, addTags: ["arbites"] },
    desc: "행성 총독마저 체포할 권한을 지닌 제국법(Lex Imperialis)의 냉혹한 집행자. 샷건과 쇼크 마울로 폭동과 반역을 진압한다.",
    source: "Lexicanum: Adeptus Arbites / Dark Heresy"
  },
  {
    id: "administratum",
    name: "아뎁투스 아드미니스트라툼 서기관 · 관료",
    en: "Adeptus Administratum Adept",
    faction: "아드미니스트라툼",
    tier: 2,
    lifeBonus: 25,
    hazardMod: 0.005,
    annualGrowth: { Int: 2, Inf: 1.8, Fel: 1 },
    req: { minAge: 16, stats: { Int: 36 }, excludeTags: ["astartes", "custodes", "abhuman", "heretic"] },
    selectable: true,
    onJoin: { stats: { Int: 6, Inf: 8 }, addTags: ["administratum"] },
    desc: "끝없는 양피지 산더미 속에서 100만 행성의 십일조와 보급을 기록하는 제국 관료. 펜 끝의 오타 하나로 행성 하나가 굶주릴 수도 있다.",
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ecclesiarchy_priest",
    name: "에클레시아키 사제 · 설교자",
    en: "Ministorum Priest / Confessor",
    faction: "아뎁투스 미니스토룸",
    tier: 2,
    lifeBonus: 22,
    hazardMod: 0.009,
    annualGrowth: { WP: 2.2, Fel: 2, Inf: 1.5 },
    req: { minAge: 17, stats: { WP: 38, Fel: 35 }, minFaith: 55, maxCorruption: 15, excludeTags: ["astartes", "custodes", "heretic"] },
    selectable: true,
    onJoin: { stats: { WP: 7, Fel: 7, Inf: 8 }, addTags: ["ecclesiarchy", "pious"] },
    desc: "황제 신앙을 전파하고 전장에서 체인소드를 치켜든 채 병사들의 광신을 불태우는 국교 사제.",
    source: "Lexicanum: Ecclesiarchy"
  },
  {
    id: "rogue_trader",
    name: "로그 트레이더 (무역 영장 선장)",
    en: "Rogue Trader Captain",
    faction: "로그 트레이더 가문",
    tier: 4,
    lifeBonus: 140,
    hazardMod: 0.013,
    annualGrowth: { Fel: 2.2, Inf: 2.8, Int: 1.5, Ag: 1.2 },
    req: {
      minAge: 22,
      stats: { Fel: 50, Inf: 54, Int: 42 },
      or: [{ anyTags: ["rogue_trader_blood", "noble", "navy"] }, { stats: { Inf: 65 } }],
      excludeTags: ["astartes", "custodes", "heretic"]
    },
    selectable: true,
    onJoin: { stats: { Inf: 20, Fel: 10, Int: 6 }, addTags: ["rogue_trader", "voidborn"] },
    desc: "제국 국경 너머 미지의 우주를 개척하고 외계인과도 합법적으로 거래·정복할 수 있는 황제의 무역 영장을 쥔 호걸 선장.",
    source: "Lexicanum: Rogue Trader / Rogue Trader Core"
  },

  // ===== 사이커 전용 직군 =====
  {
    id: "sanctioned_psyker",
    name: "생션드 사이커 · 아스트로패스",
    en: "Sanctioned Psyker / Astropath",
    faction: "아뎁투스 아스트라 텔레파티카",
    tier: 3,
    lifeBonus: 30,
    hazardMod: 0.019,
    annualGrowth: { WP: 2.5, Int: 2, Inf: 1 },
    req: {
      minAge: 16,
      allTags: ["psyker"],
      stats: { WP: 44 },
      maxCorruption: 35,
      excludeTags: ["astartes", "custodes", "heretic"]
    },
    selectable: true,
    trialCheck: { stat: "WP", diff: -5, title: "테라 영혼 결속 의식 (Soul Binding)", failDeathChance: 0.3 },
    onJoin: { stats: { WP: 10, Int: 6, Inf: 6 }, addTags: ["sanctioned_psyker"] },
    desc: "검은 함선을 타고 테라에서 영혼 결속을 견뎌 낸 공인 사이커. 전장에서 워프 번개를 내리꽂거나 성간 텔레파시 통신을 담당한다.",
    source: "Lexicanum: Sanctioned Psyker / Dark Heresy"
  },

  // ===== 금단의 타락 루트 (오염도 관리/분기 해금!) =====
  {
    id: "chaos_cultist",
    name: "카오스 컬티스트 · 이단 선동가",
    en: "Chaos Cultist / Heretic Demagogue",
    faction: "암흑의 신들 (Chaos)",
    tier: 3,
    lifeBonus: 15,
    hazardMod: 0.025,
    annualGrowth: { WP: 1.8, WS: 1.8, Int: 1.5, Fel: 1.5 },
    req: {
      minAge: 16,
      minCorruption: 45,
      excludeTags: ["custodes", "grey_knight"]
    },
    selectable: true,
    onJoin: { stats: { WS: 6, WP: 6, Inf: -25 }, addTags: ["heretic", "chaos_aligned"] },
    desc: "거짓 황제를 등지고 워프의 암흑 신들에게 속삭임을 바친 배교자. 막강한 금단의 힘과 함께 이단심문소의 끝없는 사냥이 시작된다.",
    source: "Lexicanum: Chaos Cult / Black Crusade Core"
  }
];
