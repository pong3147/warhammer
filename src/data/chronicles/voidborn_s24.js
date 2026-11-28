// 일상 연대기 — 보이드본 심화 · 지표 상륙 후일담 · 그림다크 공허 마모 트랙 (Stage 24 · 18건)
export default [
  // ===== 보이드본 성인 함내 일상 5건 (ch_s24_void_01 ~ 05, priority: 3) =====
  {
    id: "ch_s24_void_01",
    badge: "재활용 산소의 향기",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      anyHomeWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "공기 정화탑이 새 주기로 전환될 때마다 통풍구에서 은은한 오존과 낡은 구리 관로의 냄새가 흘러나왔다. 지표면 사람들은 쇠 비린내라며 코를 찡그리지만, 성간 함선에서 자란 이들에게는 그보다 편안한 고향의 숨결이 없다.",
    effect: { stats: { WP: 1, T: 1 } },
    source: "Dark Heresy 2e: Core Rulebook (Voidborn)"
  },
  {
    id: "ch_s24_void_02",
    badge: "저중력 갑판 보행",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      anyHomeWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "중력판 출력이 살짝 낮아진 외곽 통로를 지날 때 지표면 출신 손님들이 휘청거리는 사이, 무릎 반동과 벽면 손잡이만으로 미끄러지듯 걸음을 옮겼다. 보이드본의 유연한 보법은 좁은 철제 회랑에서 빛을 발했다.",
    effect: { stats: { Ag: 1, Int: 1 } },
    source: "Rogue Trader: Core Rulebook / Lexicanum: Voidborn"
  },
  {
    id: "ch_s24_void_03",
    badge: "격벽의 선조 벽화",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      anyHomeWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "중앙 척추 통로의 두꺼운 방폭문 옆에는 수 세대에 걸쳐 이 함선에서 태어나고 눈을 감은 선원들의 이름과 항해 문양이 용접 자국으로 빼곡히 새겨져 있었다. 차가운 철판 위에 손끝을 대고 앞서간 선조들의 무사 안식을 빌었다.",
    effect: { stats: { WP: 1 }, faith: 1 },
    source: "Rogue Trader: Into the Storm"
  },
  {
    id: "ch_s24_void_04",
    badge: "함내 은어와 격벽 타전",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "교대 침묵 시각에 복스가 끊긴 격실 사이로 파이프를 두드리는 짧은 보이드 은어 신호가 울려 퍼졌다. 몇 번의 리듬만으로 상부 갑판의 정박 소식과 보급 상태를 주고받는 것은 성간 선원만의 오래된 지혜였다.",
    effect: { stats: { Int: 1, Fel: 1 } },
    source: "Imperium Maledictum Core (Voidborn)"
  },
  {
    id: "ch_s24_void_05",
    badge: "원자로의 맥동",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "수 킬로미터 뒤편 플라즈마 원자로에서 전해지는 낮고 묵직한 진동이 발바닥을 타고 심장 박동처럼 울렸다. 오스펙스 계기판을 보기도 전에 발끝의 미세한 떨림 변화만으로 함선이 곧 가속할 것을 알아차렸다.",
    effect: { stats: { Int: 1, Ag: 1 } },
    source: "Battlefleet Gothic Rulebook / Lexicanum: Voidship"
  },

  // ===== 로그 트레이더 · 임페리얼 네이비 사관 함상 일상 3건 (ch_s24_void_06 ~ 08, priority: 3) =====
  {
    id: "ch_s24_void_06",
    badge: "함교 성도 검열",
    priority: 3,
    req: {
      minAge: 14,
      anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "imperial_navy", "navy_captain", "navy_admiral"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "함교 중앙의 황동 홀로-테이블 위로 성계의 성도와 맨드빌 포인트 이탈 궤적이 푸르게 떠올랐다. 워프 조류의 변동 폭과 호위함대 배치 각도를 대조하며 다음 분기 항해 일정을 빈틈없이 조율했다.",
    effect: { stats: { Int: 1, Inf: 1 } },
    source: "Rogue Trader: Battlefleet Koronus"
  },
  {
    id: "ch_s24_void_07",
    badge: "현측 포열과 보급 장부",
    priority: 3,
    req: {
      minAge: 14,
      anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "imperial_navy", "navy_captain", "navy_admiral"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "거대한 현측 매크로 캐논 포열의 장전 태세를 순시한 뒤, 함선 수만 승무원의 산소 필터와 탄약 재고 장부에 밀랍 인장을 찍었다. 별 사이의 전쟁과 교역은 언제나 꼼꼼한 병참과 냉정한 결단에서 승부가 갈렸다.",
    effect: { stats: { BS: 1, Inf: 1 } },
    source: "Battlefleet Gothic Rulebook / Rogue Trader Core"
  },
  {
    id: "ch_s24_void_08",
    badge: "관측창 너머의 성운",
    priority: 3,
    req: {
      minAge: 14,
      anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "imperial_navy", "navy_captain", "navy_admiral"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "방폭 셔터가 잠시 열린 사관 회랑의 두꺼운 수정 관측창 너머로 보랏빛 성운과 무수한 별무리가 천천히 흘러갔다. 뜨거운 리카프 잔을 기울이며 항로 상의 해적 출몰 첩보와 섹터 함대의 동향을 논의했다.",
    effect: { stats: { Fel: 1, WP: 1 } },
    source: "Rogue Trader: Into the Storm"
  },

  // ===== 보이드본 유년기 함내 일상 2건 (ch_s24_void_09 ~ 10, priority: 3 · 귀족/일반 공용 안전) =====
  {
    id: "ch_s24_void_09",
    badge: "인공 야간 주기",
    priority: 3,
    req: {
      minAge: 6,
      maxAge: 13,
      anyWorlds: ["voidborn"]
    },
    text: "함내 주기 종이 울리고 중앙 회랑의 루멘 조명이 차분한 호박빛으로 어두워졌다. 복도 벽면에 새겨진 황동 성좌 문양을 손가락으로 따라 그리며 별과 항로의 이름을 하나씩 외웠다.",
    effect: { stats: { Int: 1, WP: 1 } },
    source: "Dark Heresy 2e: Core Rulebook (Voidborn)"
  },
  {
    id: "ch_s24_void_10",
    badge: "격벽 경보음 익히기",
    priority: 3,
    req: {
      minAge: 6,
      maxAge: 13,
      anyWorlds: ["voidborn"]
    },
    text: "어른들의 지도에 따라 무중력 회랑의 손잡이를 잡고 몸을 돌리는 요령과 세 가지 비상 격벽 경보음의 차이를 익혔다. 성간 함선에서 자라는 아이에게는 신분을 막론하고 선체의 숨결을 읽는 법이 첫 번째 수업이었다.",
    effect: { stats: { Ag: 1, Int: 1 } },
    source: "Imperium Maledictum Core / Lexicanum: Voidborn"
  },

  // ===== 지표 상륙 후일담 3건 (ch_s24_void_11 ~ 13, priority: 3 · shore_leave_void 회수) =====
  {
    id: "ch_s24_void_11",
    badge: "무거운 중력의 기억",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      anyHomeWorlds: ["voidborn"],
      allTags: ["shore_leave_void"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "함선 중력판이 일시적으로 출력을 높일 때마다, 언젠가 행성 지표에 발을 디뎠을 때 무릎과 발목을 짓누르던 그 묵직한 대지의 무게가 생생히 떠올랐다. 두 세계의 중력을 모두 아는 몸은 이제 쉽게 균형을 잃지 않는다.",
    effect: { stats: { T: 1, Ag: 1 } },
    source: "Dark Heresy 2e: Core Rulebook (Voidborn)"
  },
  {
    id: "ch_s24_void_12",
    badge: "여과되지 않은 바람",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      anyHomeWorlds: ["voidborn"],
      allTags: ["shore_leave_void"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "정화기를 거치지 않고 사방에서 불어오던 지표면의 생경한 바람과 흙먼지 냄새가 문득 기억났다. 통제된 오존 공기 속에서 자란 보이드본에게 그 거칠고 자유로운 대기의 감촉은 두려우면서도 오래 남는 잔향이었다.",
    effect: { stats: { WP: 1, Fel: 1 } },
    source: "Rogue Trader: Into the Storm"
  },
  {
    id: "ch_s24_void_13",
    badge: "천장 없는 하늘의 잔상",
    priority: 3,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      anyHomeWorlds: ["voidborn"],
      allTags: ["shore_leave_void"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    text: "잠결에 머리 위를 덮어 줄 강철 천장 없이 끝없는 허공 아래 서 있는 꿈을 꾸고 눈을 떴다. 곧장 선실 벽면의 차가운 리벳 보를 어루만지며 숨을 고른 뒤, 지표의 광활함을 견뎌 낸 스스로를 다독였다.",
    effect: { stats: { WP: 1, Int: 1 } },
    source: "Dark Heresy 2e: Core Rulebook (Voidborn)"
  },

  // ===== 그림다크 전용 공허 마모 연대기 5건 (ch_s24_void_14 ~ 18, priority: 2) =====
  {
    id: "ch_s24_void_14",
    badge: "산소세 체납",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      anyHabitats: ["void"],
      maxSocialTier: "common",
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "구역 산소 할당세가 밀렸다는 이유로 보급 서비터가 거주 격실의 환기 밸브를 절반 가까이 잠가 버렸다. 탁하고 희박한 공기 속에서 관자놀이가 욱신거리는 통증을 참으며 연장 정비 할당량을 채워야 했다.",
    effect: { wounds: -3, stats: { T: 1 } },
    source: "Imperium Maledictum Core / Rogue Trader: Into the Storm"
  },
  {
    id: "ch_s24_void_15",
    badge: "선체 서리 응결",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "외벽 난방 관로의 출력이 떨어지자 우주 진공의 냉기가 아다만티움 격벽을 뚫고 스며들었다. 기름기 섞인 성에가 낀 철제 회랑을 오가며 당직을 서는 동안 뼈마디가 시리게 굳어 갔다.",
    effect: { wounds: -2, stats: { WP: 1 } },
    source: "Rogue Trader: Battlefleet Koronus"
  },
  {
    id: "ch_s24_void_16",
    badge: "겔러 필드 불면",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "길어진 워프 항해 내내 장갑판 바로 바깥을 무언가 긁어 대는 듯한 기묘한 금속음이 귓가를 떠나지 않았다. 며칠째 깊은 잠을 이루지 못해 눈가가 퀭하게 패고 신경이 날카롭게 닳아 갔다.",
    effect: { wounds: -2, corruption: 1, faith: -1, stats: { WP: 1 } },
    source: "Lexicanum: Geller Field / Dark Heresy Core"
  },
  {
    id: "ch_s24_void_17",
    badge: "거포 장전반의 비극",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "실사격 훈련 도중 매크로 캐논 장전용 도르래 사슬이 끊어지며 하층 포열 인부 여럿이 육중한 탄두 아래 깔렸다. 선내 사제가 기도를 마치기도 전에 다음 장전조가 투입되었고, 피 묻은 갑판을 수습하며 묵직한 무력감이 몸을 짓눌렀다.",
    effect: { wounds: -4, faith: 1, stats: { WP: 1 } },
    source: "Battlefleet Gothic Rulebook / Lexicanum: Voidship Crew"
  },
  {
    id: "ch_s24_void_18",
    badge: "흑수 여과기 배급 삭감",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      anyHabitats: ["void"],
      maxSocialTier: "common",
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "오수 재생 여과기의 핵심 탄소층이 막혀 함내 식수에서 짙은 쇠 맛과 검은 침전물이 섞여 나왔다. 오염된 물을 끓여 마시며 버티는 사이 만성적인 복통과 탈수가 서서히 체력을 갉아먹었다.",
    effect: { wounds: -3, stats: { T: -1, WP: 1 } },
    source: "Rogue Trader: Into the Storm / Imperium Maledictum Core"
  }
];
