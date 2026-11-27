// 일상 연대기 — 유년기 인연 · 직군별 동료 · 전우의 유품 동행 로그 (14종, priority: 3)
export default [
  {
    id: "ch_bond_childhood_1",
    priority: 3,
    badge: "유년기 인연",
    req: {
      maxAge: 18,
      allTags: ["bond_childhood_friend"],
      maxSocialTier: "common",
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "배급 시간이 끝나고 낡은 관로 위에 나란히 앉아 어릴 적 소꿉친구와 내일의 생존을 이야기했다.",
    effect: { stats: { Fel: 1 }, align: { humane: 1 } }
  },
  {
    id: "ch_bond_childhood_2",
    priority: 3,
    badge: "유년기 인연",
    req: {
      minAge: 14,
      maxAge: 25,
      allTags: ["bond_childhood_friend"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "assassin"]
    },
    text: "성년 직무로 바쁜 와중에도 품속의 반쪽짜리 금속 인식표를 만지며 옛 친구가 어딘가 살아 있기를 빌었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_bond_guard_1",
    priority: 3,
    badge: "분대 전우",
    req: {
      minAge: 16,
      allTags: ["bond_guard_comrade"],
      anyTrees: ["militarum"],
      maxCareerTier: 3,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    text: "폭격이 잠시 멎은 참호 구석에서 분대 전우가 아껴 둔 리카프 한 잔을 내밀며 지난 전선의 이야기를 꺼냈다.",
    effect: { wounds: 2, stats: { WP: 1 }, align: { humane: 1 } }
  },
  {
    id: "ch_bond_guard_2",
    priority: 3,
    badge: "분대 전우",
    req: {
      minAge: 16,
      allTags: ["bond_guard_comrade"],
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "tempestus_scion"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    text: "야간 경계 근무 중 전우와 서로의 라스건 전지팩 잔량을 확인하며 등 뒤를 번갈아 지켰다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_bond_brother_1",
    priority: 3,
    badge: "배틀 브라더",
    req: {
      minAge: 16,
      allTags: ["bond_battle_brother"],
      anyTags: ["battle_brother", "grey_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "living_saint"]
    },
    text: "전투가 끝난 무기고에서 배틀 브라더와 서로의 파워 아머 이음매를 점검하며 다음 성전의 맹세를 나눴다.",
    effect: { stats: { WS: 1, WP: 1 }, align: { dogmatic: 1 } }
  },
  {
    id: "ch_bond_brother_2",
    priority: 3,
    badge: "배틀 브라더",
    req: {
      minAge: 16,
      allTags: ["bond_battle_brother"],
      anyTags: ["battle_brother", "grey_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "living_saint"]
    },
    text: "강하 포드 투입 직전, 곁에 앉은 전투 형제가 무언의 손짓으로 챕터의 승리를 기원했다.",
    effect: { stats: { WP: 1 }, faith: 1 }
  },
  {
    id: "ch_bond_ordo_1",
    priority: 3,
    badge: "성소 동반자",
    req: {
      minAge: 16,
      allTags: ["bond_ordo_partner"],
      anyTrees: ["inquisition", "sororitas", "ecclesiarchy", "arbites"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    text: "촛불이 깜빡이는 성소 서고에서 동료와 이단 심문 조서를 교차 대조하며 밤을 지새웠다.",
    effect: { stats: { Int: 1 }, faith: 1 }
  },
  {
    id: "ch_bond_ordo_2",
    priority: 3,
    badge: "성소 동반자",
    req: {
      minAge: 16,
      allTags: ["bond_ordo_partner"],
      anyTrees: ["inquisition", "sororitas", "ecclesiarchy", "arbites"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    text: "험한 순찰과 심문 일정을 마친 뒤 동료가 건넨 정화 향로를 함께 들며 마음을 다잡았다.",
    effect: { stats: { WP: 1 }, corruption: -1 }
  },
  {
    id: "ch_bond_void_1",
    priority: 3,
    badge: "공허의 동반자",
    req: {
      minAge: 16,
      allTags: ["bond_void_companion"],
      anyTrees: ["navy", "rogue_trader", "mechanicus", "navis_navigator"],
      anyRealms: ["void", "mechanicus"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    text: "워프 항해의 진동 속에서 함선 동반자와 함께 겔러 필드 계기판과 항해·보급 장부를 꼼꼼히 살폈다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_bond_void_2",
    priority: 3,
    badge: "공허의 동반자",
    req: {
      minAge: 16,
      allTags: ["bond_void_companion"],
      anyTrees: ["navy", "rogue_trader", "mechanicus", "navis_navigator"],
      anyRealms: ["void", "mechanicus"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    text: "정박지 선창가에서 동반자가 구해 온 귀한 성계 소식과 보급품 목록을 전해 들었다.",
    effect: { stats: { Inf: 1 } }
  },
  {
    id: "ch_bond_heretic_1",
    priority: 3,
    badge: "어둠의 공범",
    req: {
      minAge: 16,
      allTags: ["bond_heretic_pact"],
      or: [
        { anyRealms: ["heretic"] },
        { minCorruption: 10 }
      ],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought"]
    },
    text: "지하 비밀 은신처에서 혈맹 공범과 단속망을 비웃으며 다음 밀수·배교 계획을 속삭였다.",
    effect: { stats: { Ag: 1, Inf: 1 }, align: { ruthless: 1 } }
  },
  {
    id: "ch_bond_fallen_1",
    priority: 3,
    badge: "전우의 유품",
    req: {
      minAge: 24,
      allTags: ["bond_fallen_comrade"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "living_saint"]
    },
    text: "격렬한 교전 직전, 먼저 떠난 전우가 남긴 유품을 어루만지며 살아남은 자의 책임을 되새겼다.",
    effect: { stats: { WP: 1 }, faith: 1 }
  },
  {
    id: "ch_bond_oath_1",
    priority: 3,
    badge: "지켜 낸 전우애",
    req: {
      minAge: 24,
      allTags: ["bond_oath_fulfilled"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "living_saint"]
    },
    text: "오랜 세월 사선을 함께 넘은 전우로부터 성계의 안부를 묻는 짧은 아스트로패스 전언이 도착했다.",
    effect: { stats: { Fel: 1, WP: 1 }, align: { humane: 1 } }
  },
  {
    id: "ch_bond_legacy_senior",
    priority: 3,
    badge: "전우의 기억",
    req: {
      minAge: 50,
      anyTags: ["bond_fallen_comrade", "bond_oath_fulfilled"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint"]
    },
    text: "노년의 문턱에서 젊은 후배들의 웃음소리를 들으며 함께 싸웠던 옛 동료들의 얼굴을 하나씩 떠올렸다.",
    effect: { stats: { WP: 1 }, align: { humane: 1 } }
  }
];
