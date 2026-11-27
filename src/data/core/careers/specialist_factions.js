// 직군 계급도 — 나비스 노빌리테 · 오피시오 아사시노룸 · 임페리얼 나이트 · 살아 있는 성인 (13종)
export const CAREERS_SPECIALIST_FACTIONS = [
  // =========================================================================
  // 18. 나비스 노빌리테 (제국 항법사 가문) 트리 (4종 · 11번째 하이 로드 포함)
  // =========================================================================
  {
    id: "nav_apprentice",
    name: "견습 항법사 (나비스 노빌리테)",
    en: "Navis Nobilite Apprentice Navigator",
    faction: "나비스 노빌리테",
    tree: "navis_navigator",
    treeName: "나비스 노빌리테 (제국 항법사 가문)",
    tier: 2,
    entryMode: "open",
    transitTier: "mid",
    actionGroup: "navigator",
    lifeBonus: 45,
    hazardMod: 0.013,
    annualGrowth: { WP: 2.2, Int: 2.0, Inf: 1.6 },
    req: {
      minAge: 14,
      allTags: ["navigator"],
      excludeTags: ["astartes", "custodes", "heretic", "living_saint", "assassin"]
    },
    selectable: true,
    onJoin: { stats: { WP: 6, Int: 6, Inf: 6 }, addTags: ["voidborn", "navigator"] },
    desc: "이마의 제3의 눈으로 워프의 폭풍과 아스트로노미칸의 등불을 읽는 견습 항법사. 제국 상선과 호위함의 항법탑에서 첫 성간 항해를 익힌다.",
    source: "Lexicanum: Navigator / Rogue Trader Core"
  },
  {
    id: "nav_senior",
    name: "선임 항법사 · 기함 항로장",
    en: "Senior Navigator / Principal Navigator",
    faction: "나비스 노빌리테",
    tree: "navis_navigator",
    treeName: "나비스 노빌리테 (제국 항법사 가문)",
    tier: 3,
    entryMode: "event",
    transitTier: "mid",
    actionGroup: "navigator",
    lifeBonus: 110,
    hazardMod: 0.012,
    annualGrowth: { WP: 2.4, Int: 2.2, Inf: 2.0 },
    req: {
      minAge: 24,
      anyCareers: ["nav_apprentice"],
      allTags: ["navigator"],
      stats: { WP: 52, Int: 50, Inf: 44 },
      maxCorruption: 25,
      excludeTags: ["heretic", "living_saint"]
    },
    selectable: true,
    onJoin: { stats: { WP: 6, Int: 6, Inf: 10 }, addTags: ["navis_officer", "voidborn"] },
    offerTitle: "전투함대 기함 항법탑 배속 — 선임 항법사 임명",
    offerPitch: "수십 차례의 위험한 워프 도약을 무사히 완수한 실력을 인정받아, 제국 순양함·로그 트레이더 기함의 항로를 총괄하는 선임 항법사 지위가 내려졌다.",
    desc: "황금 천문관 같은 기함 항법탑의 절대 주인. 함장조차 워프 도약 중에는 그대의 판단에 함선 수만 명의 목숨을 맡긴다.",
    source: "Lexicanum: Navis Nobilite / Rogue Trader: The Navis Primer"
  },
  {
    id: "nav_novator",
    name: "노바토르 (나비스 노빌리테 가주)",
    en: "Novator of a Navigator House",
    faction: "나비스 노빌리테",
    tree: "navis_navigator",
    treeName: "나비스 노빌리테 (제국 항법사 가문)",
    tier: 5,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "navigator",
    lifeBonus: 190,
    hazardMod: 0.008,
    annualGrowth: { WP: 2.4, Int: 2.4, Inf: 2.8, Fel: 1.6 },
    req: {
      minAge: 44,
      anyCareers: ["nav_senior"],
      allTags: ["navigator"],
      stats: { WP: 70, Int: 68, Inf: 72 },
      maxCorruption: 20,
      excludeTags: ["heretic", "living_saint"]
    },
    selectable: true,
    onJoin: { stats: { WP: 8, Int: 6, Inf: 14 }, addTags: ["nav_novator", "wealthy", "hero_of_imperium"] },
    offerTitle: "항법사 대가문 원로회 추대 — 노바토르 계승",
    offerPitch: "유서 깊은 항법사 가문의 혈통 장부와 성역 독점 항로 계약서를 모두 계승할 가주 '노바토르'로 그대가 선출되었다.",
    desc: "수백 명의 항법사와 막대한 제국 항로 지분을 통괄하는 노빌리테 대가문의 수장. 전투함대 제독과 로그 트레이더 총수도 그대의 계약을 구걸한다.",
    source: "Lexicanum: Novator / The Navis Primer"
  },
  {
    id: "paternoval_envoy",
    name: "파테르노발 특사 (하이 로드 · 항법사 대표)",
    en: "Paternoval Envoy of the Navis Nobilite",
    faction: "테라의 하이 로드 · 세나토룸 임페리알리스",
    tree: "navis_navigator",
    treeName: "나비스 노빌리테 (제국 항법사 가문)",
    tier: 6,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "high_lord",
    lifeBonus: 260,
    hazardMod: 0.005,
    annualGrowth: { WP: 2.6, Int: 2.6, Inf: 3.4, Fel: 2.0 },
    req: {
      minAge: 68,
      anyCareers: ["nav_novator"],
      allTags: ["navigator"],
      stats: { WP: 88, Int: 88, Inf: 92 },
      maxCorruption: 12,
      excludeTags: ["heretic", "high_lord_terra", "living_saint", "wanted_by_inquisition"]
    },
    selectable: true,
    trialCheck: { stat: "WP", diff: -42, title: "테라 항법사 지구 파테르노바 궁정 알현과 특사 인준", failDeathChance: 0.22 },
    onJoin: { stats: { Inf: 12, WP: 8, Int: 6 }, addTags: ["high_lord_terra", "paternoval_envoy", "hero_of_imperium"] },
    offerTitle: "테라 파테르노바 궁정 칙명 — 파테르노발 특사(하이 로드) 취임",
    offerPitch: "은하 모든 항법사 가문의 시조 파테르노바가 그대를 지목했다. 테라 원로원에서 인류제국의 모든 성간 항로를 대변하는 열한 번째 하이 로드 의석에 오르겠는가?",
    desc: "파테르노바를 대리해 세나토룸 임페리알리스 의석에 앉는 테라의 하이 로드. 그대의 서명 하나로 성역 전체의 워프 항해가 열리거나 닫힌다.",
    source: "Lexicanum: Paternoval Envoy / High Lords of Terra"
  },

  // =========================================================================
  // 19. 오피시오 아사시노룸 (제국 암살청) 트리 (3종 + 4대 템플 · 12번째 하이 로드)
  // =========================================================================
  {
    id: "assassin_initiate",
    name: "오피시오 아사시노룸 수련생 (신전 후보)",
    en: "Officio Assassinorum Initiate",
    faction: "오피시오 아사시노룸",
    tree: "officio_assassinorum",
    treeName: "오피시오 아사시노룸 (제국 암살청)",
    tier: 3,
    entryMode: "open",
    allowLateralOffer: true,
    transitTier: "forced",
    actionGroup: "assassin",
    lifeBonus: 35,
    hazardMod: 0.019,
    annualGrowth: { Ag: 2.6, WS: 2.0, BS: 2.0, WP: 2.0 },
    req: {
      minAge: 14,
      maxAge: 24,
      stats: { Ag: 44, WP: 42 },
      maxCorruption: 15,
      or: [
        { anyTags: ["schola", "blank"] },
        { stats: { Ag: 52, WS: 44 } },
        { stats: { Ag: 48, BS: 46 } },
        { minAlign: { ruthless: 25 }, stats: { Ag: 44 } }
      ],
      excludeTags: ["abhuman", "psyker", "navigator", "mutant_sanctioned", "astartes", "custodes", "heretic", "living_saint"]
    },
    selectable: true,
    trialCheck: { stat: "Ag", diff: -8, title: "테라 비밀 신전 생체 개조 및 암살 적성 시련", failDeathChance: 0.40 },
    onJoin: { stats: { Ag: 10, WS: 6, BS: 6, WP: 6 }, woundsBonus: 20, align: { ruthless: 5 }, addTags: ["assassin"] },
    offerTitle: "이름 없는 검은 수송선 — 오피시오 아사시노룸 비밀 징발",
    offerPitch: "제국 어떤 기록부에도 남지 않는 그림자의 사절이 그대의 살의와 냉철한 반사 신경을 포착했다. 과거의 이름을 지우고 테라 4대 암살 템플의 시련에 응하겠는가?",
    desc: "존재 자체가 1급 기밀인 제국 암살청의 신전 수련생. 극한의 신경 개조와 훈련을 거치며 빈디카레·칼리두스·에버서·쿨렉수스 가운데 하나의 템플에 서약한다.",
    source: "Lexicanum: Officio Assassinorum / Codex: Imperial Agents"
  },
  {
    id: "assassin_operative",
    name: "오피시오 아사시노룸 정예 어쌔신",
    en: "Officio Assassinorum Temple Operative",
    faction: "오피시오 아사시노룸",
    tree: "officio_assassinorum",
    treeName: "오피시오 아사시노룸 (제국 암살청)",
    tier: 4,
    entryMode: "event",
    transitTier: "mid",
    actionGroup: "assassin",
    lifeBonus: 85,
    hazardMod: 0.017,
    annualGrowth: { Ag: 2.6, WS: 2.2, BS: 2.2, WP: 2.2, Int: 1.8 },
    req: {
      minAge: 22,
      anyCareers: ["assassin_initiate"],
      stats: { Ag: 60, WP: 56 },
      maxCorruption: 15,
      or: [
        { stats: { BS: 58 } },
        { stats: { WS: 58 } },
        { stats: { Fel: 54 } },
        { allTags: ["blank"] }
      ],
      excludeTags: ["heretic", "living_saint"]
    },
    selectable: true,
    onJoin: { stats: { Ag: 8, WS: 6, BS: 6, WP: 6, Inf: 8 }, woundsBonus: 25, align: { ruthless: 5 }, addTags: ["assassin", "elite_troop"] },
    offerTitle: "테라 원로원 암살 칙령 개시 — 정예 어쌔신 실전 투입",
    offerPitch: "모든 살상 의례와 신경 개조를 통과했다. 이제 단신으로 반역 총독과 외계 군주, 배교 사이커의 목숨을 거두는 오피시오 아사시노룸 정예 어쌔신으로 실전 배치된다.",
    desc: "한 명의 투입만으로 한 개 연대 이상의 전략적 가치를 지니는 제국 최강의 암살 병기. 임무 사이에는 정지장 동면으로 세월을 건너뛴다.",
    source: "Lexicanum: Officio Assassinorum / Assassinorum: Kingmaker"
  },
  {
    id: "grand_master_of_assassins",
    name: "그랜드 마스터 오브 어쌔신 (하이 로드 · 암살청 총수)",
    en: "Grand Master of Assassins",
    faction: "테라의 하이 로드 · 세나토룸 임페리알리스",
    tree: "officio_assassinorum",
    treeName: "오피시오 아사시노룸 (제국 암살청)",
    tier: 6,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "high_lord",
    lifeBonus: 160,
    hazardMod: 0.007,
    annualGrowth: { Int: 2.8, WP: 2.6, Ag: 2.0, Inf: 3.4 },
    req: {
      minAge: 56,
      anyCareers: ["assassin_operative"],
      stats: { Int: 86, WP: 86, Ag: 78, Inf: 88 },
      maxCorruption: 15,
      excludeTags: ["heretic", "high_lord_terra", "living_saint", "wanted_by_inquisition"]
    },
    selectable: true,
    trialCheck: { stat: "Int", diff: -42, title: "테라 암살청 밀실 숙청과 원로원 암투", failDeathChance: 0.24 },
    onJoin: { stats: { Inf: 12, Int: 8, WP: 6 }, align: { ruthless: 8 }, addTags: ["high_lord_terra", "grand_master_assassins", "hero_of_imperium"] },
    offerTitle: "그림자 의석의 계승 — 그랜드 마스터 오브 어쌔신(하이 로드) 취임",
    offerPitch: "전임 총수가 남긴 암호 열쇠가 그대의 손에 쥐어졌다. 모든 암살 템플의 출격 승인권을 쥐고 세나토룸 임페리알리스 열두 번째 의석에 앉을 총수가 되겠는가?",
    desc: "오피시오 아사시노룸 전 템플을 통솔하는 그림자의 하이 로드. 제국의 다른 하이 로드들조차 그대의 침묵 어린 시선을 가장 두려워한다.",
    source: "Lexicanum: Grand Master of Assassins / Watchers of the Throne"
  },

  // =========================================================================
  // 20. 임페리얼 나이트 (제국 기사 가문) 트리 (4종)
  // =========================================================================
  {
    id: "knight_squire",
    name: "기사 가문 종자 · 아미저 조종사",
    en: "Knight House Squire / Armiger Bondsman",
    faction: "임페리얼 나이트",
    tree: "imperial_knight",
    treeName: "임페리얼 나이트 (제국 기사 가문)",
    tier: 2,
    entryMode: "open",
    transitTier: "forced",
    actionGroup: "knight",
    lifeBonus: 14,
    hazardMod: 0.016,
    annualGrowth: { WS: 2.0, BS: 1.8, WP: 1.8, Fel: 1.2 },
    req: {
      minAge: 14,
      stats: { WS: 34, BS: 34, WP: 34 },
      or: [
        { anyHomeWorlds: ["generic_knight"] },
        { anyWorlds: ["generic_knight"], anyTags: ["noble", "military_blood", "mechanicus_blood"] },
        { allTags: ["knight_blood"] }
      ],
      excludeTags: ["abhuman", "psyker", "navigator", "mutant_sanctioned", "assassin", "astartes", "custodes", "heretic", "living_saint"]
    },
    selectable: true,
    onJoin: { stats: { WS: 5, BS: 5, WP: 4, Inf: 6 }, addTags: ["imperial_knight", "imperial_military"] },
    desc: "경량 보행 병기 아미저의 헬름 메카니쿰에 신경을 연결해 정예 기사들의 측면을 엄호하는 기사 가문의 젊은 종자이자 전초 전사.",
    source: "Lexicanum: Armiger / Codex: Imperial Knights"
  },
  {
    id: "knight_scion",
    name: "임페리얼 나이트 기사 (퀘스토리스 조종사)",
    en: "Imperial Knight Scion (Questoris Pilot)",
    faction: "임페리얼 나이트",
    tree: "imperial_knight",
    treeName: "임페리얼 나이트 (제국 기사 가문)",
    tier: 3,
    entryMode: "event",
    transitTier: "mid",
    actionGroup: "knight",
    lifeBonus: 32,
    hazardMod: 0.015,
    annualGrowth: { WS: 2.2, BS: 2.0, WP: 2.2, Fel: 1.6, Inf: 1.8 },
    req: {
      minAge: 21,
      anyCareers: ["knight_squire"],
      stats: { WS: 48, BS: 46, WP: 52, Inf: 42 },
      maxCorruption: 15,
      excludeTags: ["abhuman", "psyker", "navigator", "mutant_sanctioned", "assassin", "heretic", "living_saint"]
    },
    selectable: true,
    trialCheck: {
      stat: "WP",
      diff: -8,
      title: "스론 메카니쿰 결속 의식 (성인의 시련)",
      failDeathChance: 0.30,
      failDeathCause: "스론 메카니쿰에 깃든 선조 기계령의 압도적 의지를 견디지 못하고 뇌사"
    },
    onJoin: { stats: { WS: 8, BS: 7, WP: 8, Inf: 10 }, woundsBonus: 20, addTags: ["knight_scion", "imperial_knight", "noble"] },
    offerTitle: "성인의 의식 소명 — 퀘스토리스 나이트 스론 메카니쿰 결속",
    offerPitch: "가문 성소의 거대한 퀘스토리스급 임페리얼 나이트가 새 주인을 부른다. 수천 년 선조들의 기억이 들끓는 스론 메카니쿰에 신경을 결속해 정식 기사로 거듭나겠는가?",
    desc: "10미터 높이의 퀘스토리스 나이트 아머를 몰고 이온 실드와 리퍼 체인소드로 전선을 돌파하는 고귀한 거신 조종사.",
    source: "Lexicanum: Ritual of Becoming / Codex: Imperial Knights"
  },
  {
    id: "knight_freeblade",
    name: "프리블레이드 (방랑 임페리얼 나이트)",
    en: "Freeblade Imperial Knight",
    faction: "임페리얼 나이트 (프리블레이드)",
    tree: "imperial_knight",
    treeName: "임페리얼 나이트 (제국 기사 가문)",
    tier: 4,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "knight",
    lifeBonus: 48,
    hazardMod: 0.016,
    annualGrowth: { WS: 2.4, BS: 2.2, WP: 2.4, Ag: 1.5, Inf: 1.6 },
    req: {
      minAge: 26,
      anyCareers: ["knight_scion"],
      stats: { WS: 60, BS: 56, WP: 60 },
      maxCorruption: 20,
      or: [
        { minAlign: { humane: 20 } },
        { minAlign: { ruthless: 20 } },
        { anyTags: ["rift_survivor", "hero_of_imperium", "bond_comrade"] },
        { stats: { WP: 68 } }
      ],
      excludeTags: ["abhuman", "psyker", "navigator", "mutant_sanctioned", "assassin", "heretic", "knight_high_king", "living_saint"]
    },
    selectable: true,
    onJoin: { stats: { WS: 7, BS: 6, WP: 6, Ag: 4 }, woundsBonus: 15, addTags: ["knight_freeblade", "imperial_knight"] },
    offerTitle: "가문의 문장을 지우고 별빛으로 — 프리블레이드 방랑 서약",
    offerPitch: "가문의 정치와 고향의 울타리를 넘어 홀로 은하의 가장 절망적인 전선을 떠도는 방랑 기사 '프리블레이드'의 길이 그대 앞에 열렸다.",
    desc: "특정 가문에 매이지 않은 채 오직 자신의 맹세와 기사도에 따라 절체절명의 전장에 홀로 강림하는 전설적 방랑 기사.",
    source: "Lexicanum: Freeblade / Codex: Imperial Knights"
  },
  {
    id: "knight_high_king",
    name: "하이 킹 · 하이 퀸 (기사 행성 대군주)",
    en: "High King / High Queen of a Knight World",
    faction: "임페리얼 나이트 대가문",
    tree: "imperial_knight",
    treeName: "임페리얼 나이트 (제국 기사 가문)",
    tier: 5,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "knight_lord",
    lifeBonus: 62,
    hazardMod: 0.011,
    annualGrowth: { WS: 2.2, WP: 2.4, Fel: 2.4, Inf: 2.8 },
    req: {
      minAge: 38,
      anyCareers: ["knight_scion", "knight_freeblade"],
      stats: { WS: 72, WP: 72, Fel: 68, Inf: 74 },
      maxCorruption: 10,
      excludeTags: ["abhuman", "psyker", "navigator", "mutant_sanctioned", "assassin", "heretic", "living_saint"]
    },
    selectable: true,
    trialCheck: { stat: "Fel", diff: -22, title: "기사 가문 대의회 선출 및 선조 옥좌 계승식", failDeathChance: 0.14 },
    onJoin: { stats: { Inf: 14, Fel: 8, WS: 6, WP: 8 }, woundsBonus: 20, addTags: ["knight_high_king", "noble", "hero_of_imperium"] },
    offerTitle: "고위 대의회의 검례 — 기사 행성 대군주(하이 킹·하이 퀸) 추대",
    offerPitch: "모든 기사 가문의 기수들이 거대한 강철 무릎을 꿇었다. 행성 전체의 기사단과 사크리스탄 성소, 그리고 성전 출격 서약을 통솔할 대군주로 즉위하겠는가?",
    desc: "수십 기의 임페리얼 나이트 랜스와 봉건 행성 전체를 지휘하는 대군주. 아뎁투스 메카니쿠스 마고스나 제국 장군과도 대등한 독립 군주로서 협상한다.",
    source: "Lexicanum: High King / Codex: Imperial Knights"
  },

  // =========================================================================
  // 21. 살아 있는 성인 (임페리얼 리빙 세인트 승천) 트리 (2종 · 3대 성향 직결)
  // =========================================================================
  {
    id: "saint_vessel",
    name: "기적의 그릇 · 축복받은 성흔자",
    en: "Vessel of Miracles / Blessed Stigmatist",
    faction: "황제의 성광",
    tree: "living_saint",
    treeName: "살아 있는 성인 (임페리얼 리빙 세인트)",
    tier: 5,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "living_saint",
    lifeBonus: 65,
    hazardMod: 0.012,
    annualGrowth: { WP: 2.8, Fel: 2.6, WS: 2.0, Inf: 2.4 },
    req: {
      minAge: 28,
      minFaith: 95,
      maxCorruption: 0,
      maxAlign: { ruthless: 0 },
      stats: { WP: 80, Fel: 72 },
      or: [
        { allTags: ["living_miracle"], minAlign: { humane: 45 } },
        { allTags: ["living_miracle"], minAlign: { dogmatic: 45 } },
        { allTags: ["saint_spark"], minAlign: { humane: 50 } },
        { allTags: ["saint_spark"], minAlign: { dogmatic: 50 } },
        { anyTags: ["sororitas", "ecclesiarchy", "confessor", "cardinal", "canoness"], minAlign: { humane: 72 }, stats: { WP: 84, Fel: 76 } },
        { anyTags: ["sororitas", "ecclesiarchy", "confessor", "cardinal", "canoness"], minAlign: { dogmatic: 72 }, stats: { WP: 84, Fel: 76 } }
      ],
      excludeTags: ["heretic", "chaos_aligned", "astartes", "custodes", "grey_knight", "blank", "psyker", "abhuman", "daemon_prince", "living_saint", "mechanicus", "navigator", "assassin", "high_lord_terra", "sector_lord", "planetary_governor", "rogue_trader", "warmaster", "wanted_by_inquisition"]
    },
    selectable: true,
    onJoin: { stats: { WP: 10, Fel: 8, WS: 6, Inf: 12 }, woundsBonus: 30, faith: 15, corruptionReset: true, addTags: ["saint_vessel", "living_miracle", "hero_of_imperium"] },
    offerTitle: "황금 옥좌의 부름 — 기적의 그릇으로 각성하다",
    offerPitch: "기도가 포화를 잠재우고 상처에서 황금빛 온기가 배어 나온다. 에클레시아키 순례자들과 전선 장병들이 그대를 황제의 기적이 깃든 축복받은 그릇으로 부르기 시작했다.",
    desc: "절대적 신앙과 순결한 신념 끝에 황제의 미세한 성광을 현현시키기 시작한 필멸자. 자비의 구원자가 될지, 교조의 심판자가 될지는 그대의 행적이 결정한다.",
    source: "Lexicanum: Living Saint / Codex: Adepta Sororitas"
  },
  {
    id: "living_saint",
    name: "살아 있는 성인 (임페리얼 리빙 세인트)",
    en: "Imperial Living Saint",
    faction: "황제의 성광 · 살아 있는 성인",
    tree: "living_saint",
    treeName: "살아 있는 성인 (임페리얼 리빙 세인트)",
    tier: 6,
    entryMode: "event",
    transitTier: "autonomous",
    actionGroup: "living_saint",
    isTranshuman: true,
    lifeBonus: 600,
    hazardMod: 0.009,
    annualGrowth: { WP: 3.2, Fel: 3.0, WS: 2.6, T: 2.0, Inf: 3.0 },
    req: {
      minAge: 34,
      anyCareers: ["saint_vessel"],
      minFaith: 96,
      maxCorruption: 0,
      maxAlign: { ruthless: 15 },
      stats: { WP: 86, Fel: 78 },
      or: [
        { anyDominantAlign: ["humane", "dogmatic"] },
        { allTags: ["align_beacon_mercy"] },
        { allTags: ["align_iron_dogma"] }
      ],
      excludeTags: ["heretic", "chaos_aligned", "blank", "daemon_prince", "living_saint", "wanted_by_inquisition"]
    },
    selectable: true,
    trialCheck: {
      stat: "WP",
      diff: -24,
      title: "순교의 불길과 황금빛의 강림 시련",
      failDeathChance: 0.35,
      failDeathCause: "황제의 성광을 필멸의 육신이 감당하지 못하고 찬란한 순교의 빛 속에서 승화함"
    },
    onJoin: { stats: { WP: 16, WS: 14, Fel: 14, T: 10, Inf: 20 }, woundsBonus: 70, faith: 20, corruptionReset: true, addTags: ["living_saint", "living_miracle", "transhuman", "hero_of_imperium"] },
    offerTitle: "황금 날개의 강림 — 살아 있는 성인(리빙 세인트) 승천",
    offerPitch: "어둠에 잠긴 하늘이 눈부신 황금빛으로 갈라지며 황제의 목소리가 영혼 깊숙이 울려 퍼진다. 필멸의 한계를 넘어 인류의 등불인 '살아 있는 성인'으로 승천하겠는가?",
    desc: "황제의 의지가 깃들어 워프의 어둠과 오염에 완전히 면역된 채 전장에 강림하는 불멸의 기적. 자비의 성광으로 약자를 품거나, 심판의 불꽃으로 악마 군단을 태워 버린다.",
    source: "Lexicanum: Living Saint / Saint Celestine & Saint Sabbat Lore"
  }
];
