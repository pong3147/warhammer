// 일상 연대기 — Stage 24 귀족 낙하산 임관 · 의절한 귀족 · 크리그 14세 · 출신 대비 및 그림다크 계급 마모 (16종)
export default [
  {
    id: "ch_s24_orig_01",
    badge: "귀족 임관",
    priority: 3,
    req: {
      minAge: 18,
      allTags: ["noble_commission"],
      anyCareers: ["militarum_officer"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "야전 막사의 희미한 루멘 등 아래에서 가문이 하사한 은장 파워 소드의 날을 닦았다. 바깥 참호의 병사들은 아직 낙하산 장교의 진심을 시험하는 눈빛이다.",
    effect: { stats: { WS: 1, Inf: 1 } },
    source: "Only War Core / Codex: Astra Militarum"
  },
  {
    id: "ch_s24_orig_02",
    badge: "장교의 시련",
    priority: 3,
    req: {
      minAge: 18,
      allTags: ["noble_commission"],
      anyCareers: ["militarum_officer"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "진흙탕이 무릎까지 차오른 전초 참호를 직접 순찰하며 가죽 장화의 광택을 포기했다. 고참 분대장이 처음으로 묵직한 경례를 올려 주었다.",
    effect: { stats: { Fel: 1, T: 1 } },
    source: "Gaunt's Ghosts / Only War: Hammer of the Emperor"
  },
  {
    id: "ch_s24_orig_03",
    badge: "귀족 병참",
    priority: 3,
    req: {
      minAge: 18,
      allTags: ["noble_commission"],
      anyTrees: ["militarum", "commissariat"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "가문 집사에게 보낸 서신 덕분에 연대 보급창에 정제 탄약과 따뜻한 리카프가 제때 도착했다. 출신이 주는 특권도 전선에서는 병사들의 생명을 지키는 도구가 된다.",
    effect: { stats: { Inf: 1, Fel: 1 } },
    source: "Ciaphas Cain Novels / Only War: Hammer of the Emperor"
  },
  {
    id: "ch_s24_orig_04",
    badge: "의절의 삶",
    priority: 3,
    req: {
      minAge: 18,
      maxSocialTier: "common",
      allTags: ["disowned_noble"],
      excludeRealms: ["cloistered", "mechanicus"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"
      ]
    },
    text: "한때 시종들이 도맡던 장구 손질과 구두 수선을 이제는 굳은살 박인 맨손으로 척척 해낸다. 가문의 성씨는 잃었으나 스스로 먹고사는 법을 익혔다.",
    effect: { stats: { T: 1, WP: 1 } },
    source: "Dark Heresy 2e: Highborn / Imperium Maledictum"
  },
  {
    id: "ch_s24_orig_05",
    badge: "의절의 삶",
    priority: 3,
    req: {
      minAge: 18,
      maxSocialTier: "common",
      allTags: ["disowned_noble"],
      excludeHabitats: ["void"],
      excludeRealms: ["cloistered", "mechanicus"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"
      ]
    },
    text: "옛 가문 문장이 새겨진 낡은 인장 반지를 팔아치운 돈으로 튼튼한 작업복과 며칠 치 식량을 장만했다. 과거의 영광보다 당장 내일의 생존이 더 무겁다.",
    effect: { stats: { Int: 1, T: 1 } },
    source: "Dark Heresy 2e: Highborn / Warhammer Crime"
  },
  {
    id: "ch_s24_orig_06",
    badge: "홀로서기",
    priority: 3,
    req: {
      minAge: 18,
      maxSocialTier: "common",
      allTags: ["disowned_noble"],
      excludeRealms: ["cloistered", "mechanicus"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"
      ]
    },
    text: "어릴 적 가정교사에게 익힌 하이 고딕 문법과 계산 실력이 뜻밖에도 하층 실무 현장에서 귀한 무기가 되었다. 비웃던 동료들도 서류 정리가 막힐 때면 그대를 찾는다.",
    effect: { stats: { Int: 1, Fel: 1 } },
    source: "Imperium Maledictum / Warhammer Crime"
  },
  {
    id: "ch_s24_orig_07",
    badge: "크리그 훈련",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 22,
      anyHomeWorlds: ["krieg"],
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "열네 살에 지급받은 방독면의 낡은 필터를 교체하며 진흙 참호의 배수 도랑을 보강했다. 포탄이 지근거리에 떨어져도 지정 번호 분대의 삽질은 멈추지 않았다.",
    effect: { stats: { T: 1, WP: 1 }, faith: 1 },
    source: "Imperial Armour: Siege of Vraks / Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ch_s24_orig_08",
    badge: "크리그 속죄",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 22,
      anyHomeWorlds: ["krieg"],
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "야간 실탄 사격 검정과 총검 돌격 교련을 여섯 시간째 반복했다. 크리그의 어린 병사에게 안락한 청춘은 없으며, 오직 황제께 바칠 속죄의 의무만 있을 뿐이다.",
    effect: { stats: { BS: 1, WS: 1 }, faith: 1 },
    source: "Imperial Armour: Siege of Vraks / Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ch_s24_orig_09",
    badge: "언더하이브 생존",
    priority: 3,
    req: {
      minAge: 14,
      anyOriginClasses: ["underclass"],
      anyCareers: ["underhive_ganger", "underhive_boss", "menial_worker"],
      anyWorldTags: ["hive", "industrial"],
      excludeHabitats: ["void"],
      excludeWorlds: ["mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "녹슨 파이프 틈으로 스며드는 매연 냄새만 맡고도 인근 작업 구역의 압력 이상과 순찰대 동선을 짐작할 수 있게 되었다. 밑바닥에서 자란 감각은 교본으로 배울 수 없다.",
    effect: { stats: { Ag: 1, Int: 1 } },
    source: "Necromunda Core Rulebook / Imperium Maledictum"
  },
  {
    id: "ch_s24_orig_10",
    badge: "평민 출신 지휘관",
    priority: 3,
    req: {
      minAge: 22,
      anyOriginClasses: ["underclass", "common"],
      anyCareers: ["militarum_officer", "militarum_general", "navy_captain", "navy_admiral", "inquisitor", "admin_prefect_rank"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "귀족 참모들이 사교계 농담을 주고받는 사이, 그대는 하급 병사와 수병들이 진짜로 부족해하는 탄약과 약품 재고표를 직접 훑으며 지휘의 빈틈을 메웠다.",
    effect: { stats: { Int: 1, Inf: 1 } },
    source: "Gaunt's Ghosts / Battlefleet Gothic"
  },
  {
    id: "ch_s24_orig_11",
    badge: "군인 가문",
    priority: 3,
    req: {
      minAge: 16,
      anyOriginClasses: ["military_caste"],
      anyTrees: ["militarum", "commissariat", "navy"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "출격 전야마다 선대 무관들이 물려준 제식 점검 순서대로 무기와 장구를 살폈다. 대대로 이어져 온 규율의 습관이 전장의 공포를 차갑게 가라앉혔다.",
    effect: { stats: { WP: 1, BS: 1 } },
    source: "Codex: Astra Militarum / Only War Core"
  },
  {
    id: "ch_s24_orig_12",
    badge: "그림다크 하층민",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      maxSocialTier: "underclass",
      anyOriginClasses: ["underclass"],
      anyCareers: ["menial_worker", "underhive_ganger"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "high_lord_terra"]
    },
    text: "교대 종이 울린 뒤에도 추가 노역 할당이 떨어져 어두운 통로 바닥에 주저앉았다. 하층민의 폐와 관절은 기계 부품보다 싸게 취급된다는 사실을 다시 실감했다.",
    effect: { wounds: -2, stats: { T: 1 } },
    source: "Necromunda Core Rulebook / Warhammer Crime"
  },
  {
    id: "ch_s24_orig_13",
    badge: "그림다크 임관",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      allTags: ["noble_commission"],
      anyTrees: ["militarum", "commissariat"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "서명 한 줄로 돌격 명령을 내린 지 두 시간 만에 사상자 명단 두 묶음이 책상 위로 돌아왔다. 귀족 가문의 금빛 견장은 피 냄새를 막아 주지 못했다.",
    effect: { wounds: -1, faith: -1, stats: { WP: 1 } },
    source: "Only War Core / Codex: Astra Militarum"
  },
  {
    id: "ch_s24_orig_14",
    badge: "그림다크 의절",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      maxSocialTier: "common",
      allTags: ["disowned_noble"],
      excludeRealms: ["cloistered", "mechanicus"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"
      ]
    },
    text: "한파가 스며드는 비좁은 숙소에서 동전 몇 푼을 세며 밤을 넘겼다. 가문의 후원 없이 홀로 버티는 제국의 밑바닥은 생각보다 훨씬 차갑고 비정했다.",
    effect: { wounds: -2, stats: { WP: 1 } },
    source: "Dark Heresy 2e: Highborn / Warhammer Crime"
  },
  {
    id: "ch_s24_orig_15",
    badge: "그림다크 크리그",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      anyHomeWorlds: ["krieg"],
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "염소 가스가 가라앉은 무주지에서 쓰러진 동기들의 라스건과 방독면 필터를 묵묵히 회수했다. 열네 살 신병이나 백전 노병이나 소모 목록에서는 같은 숫자에 불과하다.",
    effect: { wounds: -2, faith: 1, stats: { WP: 1 } },
    source: "Imperial Armour: Siege of Vraks / Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ch_s24_orig_16",
    badge: "그림다크 전선",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 14,
      maxSocialTier: "common",
      anyOriginClasses: ["common"],
      anyHabitats: ["surface", "frontline"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince", "high_lord_terra",
        "astartes", "custodes", "grey_knight", "living_saint"
      ]
    },
    text: "보급 지연과 연속 경계 근무 탓에 눈 밑이 검게 파였지만, 누구도 불평을 입에 올리지 못했다. 제국의 평범한 시민에게 내일이 보장된 적이란 한 번도 없었다.",
    effect: { wounds: -2, stats: { T: 1, Fel: -1 } },
    source: "Fifteen Hours / Codex: Astra Militarum"
  }
];
