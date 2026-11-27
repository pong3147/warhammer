// 일상 연대기 — 무명 행성(야만·기사·보이드본·낙원·농업·포지) 및 변경의 후원자 회수 (18건)
export default [
  // ===== 야만 행성 (generic_feral) 성인 전용 5건 =====
  {
    id: "ch_s20_gw_01",
    badge: "야만 행성 사냥",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      anyHomeWorlds: ["generic_feral"],
      maxSocialTier: "common",
      excludeRealms: ["void", "mechanicus", "cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "high_lord_terra", "living_saint", "daemon_prince"]
    },
    text: "안개 낀 침엽수림에서 창과 뼈올가미만으로 거대 뿔사슴 무리를 몰아 겨울 훈제 고기를 마련했다. 발소리 하나만 삐끗해도 사냥감에서 먹잇감으로 뒤바뀌는 거친 숲이 날마다 감각을 벼렸다.",
    effect: { stats: { WS: 1, Ag: 1 } },
    source: "Dark Heresy 1e: Feral World / Lexicanum: Feral World"
  },
  {
    id: "ch_s20_gw_02",
    badge: "부족의 화덕",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      anyHomeWorlds: ["generic_feral"],
      maxSocialTier: "common",
      excludeRealms: ["void", "mechanicus", "cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "high_lord_terra", "living_saint", "daemon_prince"]
    },
    text: "폭풍우가 몰아치는 긴 밤, 부족의 큰 화덕 주위에 모여 앉아 수천 년 전 별에서 내려온 전사들의 서사시를 구전으로 되뇌었다. 불티가 연통 위로 날아오를 때마다 옛 노래가 전사들의 결의를 단단히 묶었다.",
    effect: { stats: { WP: 1, Fel: 1 } },
    source: "Dark Heresy 1e: Feral World"
  },
  {
    id: "ch_s20_gw_03",
    badge: "토템 경계석",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      anyHomeWorlds: ["generic_feral"],
      maxSocialTier: "common",
      excludeRealms: ["void", "mechanicus", "cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "high_lord_terra", "living_saint", "daemon_prince"]
    },
    text: "마을 어귀의 짐승 뼈와 검은 돌로 쌓은 토템 기둥에 새 송진을 칠하며 이웃 부족과의 경계를 다시 확인했다. 거친 야생에서는 말보다 경계석 위의 붉은 문양이 더 분명한 법으로 통했다.",
    effect: { stats: { T: 1, WP: 1 } },
    source: "Lexicanum: Feral World"
  },
  {
    id: "ch_s20_gw_04",
    badge: "변방의 별자리",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "high_lord_terra", "living_saint", "daemon_prince"]
    },
    text: "구름 한 점 없는 고원 밤하늘 위로 장로들이 '황금 왕의 수레'라 부르는 거대한 별자리가 천천히 기울었다. 저 별 너머 끝없는 강철의 바다를 떠올리며 대지 위의 계절 변화를 점쳤다.",
    effect: { stats: { Int: 1, WP: 1 } },
    source: "Lexicanum: Feral World / Missionarus Galaxia"
  },
  {
    id: "ch_s20_gw_05",
    badge: "원시 대장간",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      anyHomeWorlds: ["generic_feral"],
      maxSocialTier: "common",
      excludeRealms: ["void", "mechanicus", "cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "high_lord_terra", "living_saint", "daemon_prince"]
    },
    text: "가죽 풀무를 밤새 밟아 숯불을 달군 끝에 강가 사철에서 뽑아낸 거친 쇠덩이를 망치로 두드려 단검과 창촉을 벼렸다. 불꽃에 그을린 손등 위로 뜨거운 쇳물이 식으며 묵직한 강철빛이 감돌았다.",
    effect: { stats: { T: 1, WS: 1 } },
    source: "Dark Heresy 1e: Feral World"
  },

  // ===== 기사 행성 (generic_knight) 성인 전용 4건 =====
  {
    id: "ch_s20_gw_06",
    badge: "성채 기수 행렬",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "붉고 푸른 가문 깃발을 높이 든 기사 가문 기수대가 돌다리를 건너 성채 안뜰로 입성했다. 기수들의 뿔피리 화답과 갑옷 울림 속에서 봉건 영지의 위엄과 충성 서약이 새로이 울려 퍼졌다.",
    effect: { stats: { Fel: 1, WP: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Knight World"
  },
  {
    id: "ch_s20_gw_07",
    badge: "사크리스탄 성유 연기",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "거대 보행 병기 격납고의 환기탑 위로 짙은 성유 연기와 용접 불꽃이 구름처럼 피어올랐다. 바람에 실려 오는 뜨거운 기름 내음과 금속성 찬가는 기사 행성이 머금은 고대 기술의 맥박을 알렸다.",
    effect: { stats: { Int: 1, T: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Sacristan"
  },
  {
    id: "ch_s20_gw_08",
    badge: "성하 봉건 장터",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "수확 절기를 맞은 성채 아래 광장에 각 남작령의 양모와 철물, 말린 과실이 산더미처럼 쌓였다. 가문 집사들이 문장 인장으로 저울 눈금을 검수하는 사이, 영지민들의 활기찬 흥정 소리가 성벽 아래를 채웠다.",
    effect: { stats: { Fel: 1, Inf: 1 } },
    source: "Codex: Imperial Knights / Kingsblade"
  },
  {
    id: "ch_s20_gw_09",
    badge: "고대 기사 문장",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "대연회장 회랑 벽면에 걸린 수천 년 묵은 방패 문장들과 빛바랜 원정 깃발을 올려다보았다. 한 세대씩 덧칠해 이어 온 문양마다 가문이 치른 승리와 희생의 연대기가 고스란히 새겨져 있었다.",
    effect: { stats: { WP: 1, Int: 1 }, faith: 1 },
    source: "Codex: Imperial Knights"
  },

  // ===== 보이드본 (voidborn) 성인 전용 3건 =====
  {
    id: "ch_s20_gw_10",
    badge: "인공 중력 변조",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["voidborn"],
      anyHomeWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "함선 원자로 출력이 잠시 요동치며 중앙 통로의 인공 중력이 서서히 옅어졌다가 다시 무겁게 가라앉았다. 발바닥 아래 철판의 무게 감각만으로 기관실 상태를 짐작하는 것은 성간 항행민만의 오랜 본능이다.",
    effect: { stats: { Ag: 1, Int: 1 } },
    source: "Rogue Trader: Core Rulebook / Lexicanum: Voidborn"
  },
  {
    id: "ch_s20_gw_11",
    badge: "함교 청동 종소리",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "하루 세 번 주기가 바뀔 때마다 함교 쪽에서 송출되는 묵직한 청동 종소리가 수 킬로미터 길이의 선체 복도를 따라 울렸다. 태양이 뜨고 지지 않는 공허 속에서 그 종소리만이 승무원들의 시간과 질서를 붙들어 주었다.",
    effect: { stats: { WP: 1 }, faith: 1 },
    source: "Rogue Trader: Battlefleet Koronus"
  },
  {
    id: "ch_s20_gw_12",
    badge: "세대 함선의 항해 기도",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "워프 도약을 앞둔 저녁, 수 세대째 이 배를 지켜 온 선원 씨족들이 겔러 필드 성소 앞에 모여 등불을 밝히고 무사 항해를 기원했다. 철벽 한 장 너머로 소용돌이치는 어둠을 견디는 힘은 정교한 기계와 흔들리지 않는 기도의 합일에서 나왔다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 2 },
    source: "Lexicanum: Geller Field / Rogue Trader Core"
  },

  // ===== 낙원 행성 (generic_paradise) 성인 전용 2건 =====
  {
    id: "ch_s20_gw_13",
    badge: "산호 정원의 가면",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_paradise"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "향기로운 난초가 만발한 해안 회랑에서 성계 각지의 망명 귀족들과 은퇴 관료들이 부드러운 미소 뒤에 날 선 외교 암투를 주고받았다. 낙원 행성에서는 칼날 대신 밀서와 초대장 한 장으로 가문의 흥망이 갈렸다.",
    effect: { stats: { Fel: 1, Inf: 1 } },
    source: "Dark Heresy 2e: Core Rulebook / Lexicanum: Paradise World"
  },
  {
    id: "ch_s20_gw_14",
    badge: "황금빛 석호의 노을",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_paradise"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "인공 기상탑이 조율한 잔잔한 석호 위로 황금빛 노을이 그림처럼 내려앉았다. 은하계 대부분이 포화에 신음하는 시대에 이토록 고요한 저녁을 누린다는 사실이 문득 비현실적인 경계심을 불러일으켰다.",
    effect: { stats: { WP: 1 }, wounds: 3 },
    source: "Lexicanum: Paradise World"
  },

  // ===== 농업 행성 (generic_agri) 성인 전용 1건 =====
  {
    id: "ch_s20_gw_15",
    badge: "궤도 사일로 수송",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_agri"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "지평선 끝에 솟은 거대 곡물 저장탑에서 궤도 바지선이 화염을 뿜으며 성층권으로 솟아올랐다. 황금빛 들판의 바람 냄새 사이로 타오르는 추진 연료 내음이 농업 행성의 진정한 사명을 일깨웠다.",
    effect: { stats: { T: 1, Int: 1 } },
    source: "Lexicanum: Agri-World"
  },

  // ===== 포지 월드 (generic_forge) 성인 전용 1건 =====
  {
    id: "ch_s20_gw_16",
    badge: "포지 용광로의 박동",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["generic_forge"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "철탑 숲 사이로 뿜어져 나오는 주황빛 용광로 연기가 구름층을 붉게 물들이고, 거대한 압연 프레스가 대지를 일정한 박자로 두드렸다. 이 행성에서는 모든 숨결과 시간이 오직 생산량과 기계령의 효율로만 환산되었다.",
    effect: { stats: { Int: 1, T: 1 } },
    source: "Codex: Adeptus Mechanicus / Lexicanum: Forge World"
  },

  // ===== 변경의 후원자 (frontier_patron) 태그 회수 연대기 2건 =====
  {
    id: "ch_s20_gw_17",
    badge: "변경의 감사 서신",
    priority: 3,
    req: {
      minAge: 14,
      allTags: ["frontier_patron"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "과거 그대가 위기에서 도왔던 변경 자치 조합과 영지 대표단이 정기 화물선 편으로 정중한 안부 서신과 특산 향료를 보내왔다. 머나먼 변경 성계에도 그대의 이름을 기억하며 신의를 지키는 이들이 남아 있었다.",
    effect: { stats: { Fel: 1, Inf: 1 } },
    source: "Imperium Maledictum Core / Rogue Trader Core"
  },
  {
    id: "ch_s20_gw_18",
    badge: "변경의 후원자",
    priority: 3,
    req: {
      minAge: 14,
      allTags: ["frontier_patron"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "성간 항구의 선주들과 지방 길드 서기들 사이에서 그대가 공정한 중재와 후원을 베풀었다는 평판이 조용히 퍼져 나갔다. 제국의 거친 변경 지대에서 칼보다 오래 남는 것은 위기 때 내민 믿음직한 손길이었다.",
    effect: { stats: { Inf: 2, WP: 1 } },
    source: "Imperium Maledictum Core"
  }
];
