// 일상 연대기 — 3대 도덕 성향(자비 · 교조 · 암흑) · 교차 대비 · 정점 이력 태그 회수
export default [
  // ============================================================================
  // 자비 · 인본 (Humane) — 일반 3건 + 전용 4건
  // ============================================================================
  {
    id: "ch_s165_align_humane_01",
    badge: "조용한 자비",
    priority: 2,
    alignBias: "humane",
    req: {
      minAge: 14,
      maxCareerTier: 4,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "교대 근무가 끝난 어두운 통로에서 열병에 떨던 하층 노동자에게 여분의 정제수와 붕대를 건넸다. 감사 인사조차 감시자의 귀를 두려워하며 속삭임으로만 오갔으나, 꺼져 가던 눈빛에 잠시 온기가 돌아왔다.",
    effect: { stats: { Fel: 1 }, align: { humane: 1 } }
  },
  {
    id: "ch_s165_align_humane_02",
    badge: "눈감은 규정",
    priority: 2,
    alignBias: "humane",
    req: {
      minAge: 14,
      maxCareerTier: 4,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "배급 창고 담벼락에서 상한 식량을 훔치다 들킨 굶주린 부랑자를 보고도 경보를 울리지 않고 지나쳤다. 사소한 온정 한 번이 직무 유기로 고발될 수 있다는 사실을 알기에 등줄기가 서늘했다.",
    effect: { stats: { WP: 1 }, align: { humane: 1 } }
  },
  {
    id: "ch_s165_align_humane_03",
    badge: "잊힌 이름들",
    priority: 2,
    alignBias: "humane",
    req: {
      minAge: 14,
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "공식 보고서에서 단순 손실 숫자로만 지워진 동료들의 이름을 낡은 양피지 조각에 몰래 적어 두고 수지 촛불을 밝혔다. 제국은 개인의 죽음을 기억하지 않지만, 누군가는 그 얼굴을 잊지 말아야 했다.",
    effect: { stats: { WP: 1, Fel: 1 }, align: { humane: 1 } }
  },
  {
    id: "ch_s165_align_humane_04",
    badge: "어둠 속의 감사",
    priority: 3,
    alignBias: "humane",
    req: {
      minAge: 15,
      minAlign: { humane: 15 },
      anyDominantAlign: ["humane"],
      excludeWorlds: ["krieg"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "이른 새벽 문 앞에 출처 모를 마른 약초 꾸러미와 투박한 목각 아퀼라가 놓여 있었다. 어두운 제국에서 이름을 밝히지 못한 채 남겨진 감사는 어떤 훈장보다도 무겁게 가슴에 내려앉았다.",
    effect: { stats: { Fel: 1, WP: 1 }, faith: 1, align: { humane: 1 } }
  },
  {
    id: "ch_s165_align_humane_05",
    badge: "연민의 무게",
    priority: 3,
    alignBias: "humane",
    req: {
      minAge: 16,
      minAlign: { humane: 15 },
      anyDominantAlign: ["humane"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "자신의 배급과 휴식을 쪼개어 부상당한 하층민과 낙오자들을 돌보느라 밤새 눈을 붙이지 못했다. 무정한 은하계에서 남의 짐까지 짊어지는 대가는 언제나 자신의 뼈를 깎는 피로로 되돌아온다.",
    effect: { stats: { WP: 2 }, wounds: -2, align: { humane: 2 } }
  },
  {
    id: "ch_s165_align_humane_06",
    badge: "감시자의 시선",
    priority: 3,
    alignBias: "humane",
    req: {
      minAge: 18,
      minAlign: { humane: 35 },
      anyDominantAlign: ["humane"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "지나친 온정이 반란의 온상이 될 수 있다며 구역 치안 감찰관이 주변인들을 은밀히 탐문하기 시작했다. 누군가를 살리기 위해 내민 손이 언제든 자신의 목을 조르는 증거가 될 수 있음을 뼈저리게 깨달았다.",
    effect: { stats: { Int: 1, WP: 1 }, wounds: -1, align: { humane: 1 } }
  },
  {
    id: "ch_s165_align_humane_07",
    badge: "꺼지지 않는 불씨",
    priority: 3,
    alignBias: "humane",
    req: {
      minAge: 18,
      minAlign: { humane: 35 },
      anyDominantAlign: ["humane"],
      excludeWorlds: ["krieg"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "폭격과 역병으로 폐허가 된 피난소 한구석에서, 그대의 이름을 들은 난민들이 서로의 몫을 나누며 울음을 그쳤다. 차가운 강철과 재만 남은 제국에서도 연민은 작은 등불처럼 번져 나갔다.",
    effect: { stats: { Fel: 2, Inf: 1 }, faith: 2, align: { humane: 2 } }
  },

  // ============================================================================
  // 교조 · 광신 (Dogmatic) — 일반 3건 + 전용 4건
  // ============================================================================
  {
    id: "ch_s165_align_dogmatic_01",
    badge: "규율의 암송",
    priority: 2,
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "일과를 마친 뒤에도 등불 아래 앉아 렉스 임페리알리스의 처벌 조항과 복무 수칙을 한 자도 틀리지 않고 소리 내어 암송했다. 법과 질서를 향한 맹목적 복종이야말로 혼돈을 막는 가장 단단한 방벽이다.",
    effect: { stats: { WP: 1 }, faith: 1, align: { dogmatic: 1 } }
  },
  {
    id: "ch_s165_align_dogmatic_02",
    badge: "엄격한 철야 기도",
    priority: 2,
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "차가운 석조 바닥에 무릎을 꿇은 채 제국 교리집을 붙들고 밤새 철야 기도를 바쳤다. 무릎이 저리고 목이 쉬어 갈수록 잡념은 사라지고 황제 폐하를 향한 맹세만 서늘하게 남았다.",
    effect: { stats: { WP: 1 }, faith: 2, wounds: -1, align: { dogmatic: 1 } }
  },
  {
    id: "ch_s165_align_dogmatic_03",
    badge: "이탈에 대한 경계",
    priority: 2,
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "인근 구역에서 승인되지 않은 낯선 이단 구호를 웅얼거리던 자를 즉시 상부에 보고하고 동선을 기록했다. 사소한 이단을 방치한 관용이 결국 한 행성 전체를 잿더미로 만든다는 격언을 잊지 않았다.",
    effect: { stats: { Int: 1, WP: 1 }, align: { dogmatic: 1 } }
  },
  {
    id: "ch_s165_align_dogmatic_04",
    badge: "철혈의 규범",
    priority: 3,
    alignBias: "dogmatic",
    req: {
      minAge: 15,
      minAlign: { dogmatic: 15 },
      anyDominantAlign: ["dogmatic"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "검열 도중 규격에 어긋난 인장과 게으른 근무 태도를 적발하자 어떠한 변명도 듣지 않고 즉각 징계 기록을 올렸다. 사사로운 동정이 끼어드는 순간 제국의 톱니바퀴는 녹슬어 멈춘다.",
    effect: { stats: { WP: 1, Inf: 1 }, faith: 1, align: { dogmatic: 1 } }
  },
  {
    id: "ch_s165_align_dogmatic_05",
    badge: "고행의 밤",
    priority: 3,
    alignBias: "dogmatic",
    req: {
      minAge: 16,
      minAlign: { dogmatic: 15 },
      anyDominantAlign: ["dogmatic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "연기 자욱한 성당에서 쇠사슬을 팔목에 감고 성가를 읊으며 하루 치 식사를 거른 채 경건한 고행을 치렀다. 육신의 고통으로 불순한 의심을 태워 내자 영혼이 강철처럼 단단해졌다.",
    effect: { stats: { WP: 2 }, faith: 3, corruption: -2, wounds: -2, align: { dogmatic: 2 } }
  },
  {
    id: "ch_s165_align_dogmatic_06",
    badge: "경외와 공포",
    priority: 3,
    alignBias: "dogmatic",
    req: {
      minAge: 18,
      minAlign: { dogmatic: 35 },
      anyDominantAlign: ["dogmatic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "그대가 회랑에 발을 들이자 잡담하던 하급 인원들이 일제히 자세를 굳히고 시선을 바닥에 떨구었다. 친밀함은 오래전에 사라졌으나, 숨 막히는 경외와 공포가 빈틈없는 복종을 이끌어 냈다.",
    effect: { stats: { Inf: 2, WP: 1 }, faith: 2, align: { dogmatic: 1 } }
  },
  {
    id: "ch_s165_align_dogmatic_07",
    badge: "무관용의 심판",
    priority: 3,
    alignBias: "dogmatic",
    req: {
      minAge: 18,
      minAlign: { dogmatic: 35 },
      anyDominantAlign: ["dogmatic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "의심스러운 출처의 유물을 숨겨 둔 용의자가 선처를 애원했으나, 렉스 임페리알리스의 조항을 차갑게 읊어 주고 심문 절차를 밀어붙였다. 무죄는 아무것도 증명하지 못한다는 격언만이 귓가에 맴돌았다.",
    effect: { stats: { WP: 2, Inf: 1 }, faith: 2, corruption: -2, align: { dogmatic: 2 } }
  },

  // ============================================================================
  // 암흑 · 탐욕 (Ruthless) — 일반 3건 + 전용 4건
  // ============================================================================
  {
    id: "ch_s165_align_ruthless_01",
    badge: "이중 장부",
    priority: 2,
    alignBias: "ruthless",
    req: {
      minAge: 14,
      maxCareerTier: 4,
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince", "living_saint", "saint_vessel", "high_lord_terra"]
    },
    text: "공식 보급 대장에서 누락된 잉여 물자를 따로 빼돌려 비밀 장부에 기록하고 암시장 중개인에게 넘겼다. 정직한 자들이 굶주리는 동안 빈틈을 파고든 자만이 살아남아 제 몫을 챙긴다.",
    effect: { stats: { Inf: 1, Int: 1 }, faith: -1, align: { ruthless: 1 } }
  },
  {
    id: "ch_s165_align_ruthless_02",
    badge: "냉혹한 계산",
    priority: 2,
    alignBias: "ruthless",
    req: {
      minAge: 14,
      maxCareerTier: 4,
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince", "living_saint", "saint_vessel", "high_lord_terra"]
    },
    text: "임무의 위험을 떠넘길 만한 소모품 인력을 미리 점찍어 두고, 정작 공적 보고서에는 자신의 이름만 선명히 남도록 판을 짰다. 동정심은 약자가 패배를 변명할 때 꺼내는 값싼 구실에 불과하다.",
    effect: { stats: { Int: 1, Inf: 1 }, align: { ruthless: 1 } }
  },
  {
    id: "ch_s165_align_ruthless_03",
    badge: "불신의 밤",
    priority: 2,
    alignBias: "ruthless",
    req: {
      minAge: 14,
      maxCareerTier: 4,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince", "living_saint", "saint_vessel", "high_lord_terra"]
    },
    text: "잠들기 전 문빗장과 무기 손잡이를 두 번씩 확인하며, 오늘 미소 짓던 동료 가운데 누가 먼저 등을 찌를지 목록을 추렸다. 아무도 믿지 않는 경계심만이 비수를 피해 가는 유일한 갑옷이다.",
    effect: { stats: { Ag: 1, Int: 1 }, wounds: -1, align: { ruthless: 1 } }
  },
  {
    id: "ch_s165_align_ruthless_04",
    badge: "암흑 장부의 수익",
    priority: 3,
    alignBias: "ruthless",
    req: {
      minAge: 16,
      minAlign: { ruthless: 15 },
      anyDominantAlign: ["ruthless"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince", "living_saint", "saint_vessel"]
    },
    text: "자물쇠가 이중으로 채워진 철제 함을 열어 암거래 통행세와 입막음 뇌물로 불어난 제국 금화를 헤아렸다. 누구도 알지 못하는 검은 장부가 두꺼워질수록 그대를 건드릴 수 있는 자도 줄어들었다.",
    effect: { stats: { Inf: 2, Fel: 1 }, faith: -2, align: { ruthless: 1 } }
  },
  {
    id: "ch_s165_align_ruthless_05",
    badge: "쓰러진 자들 위로",
    priority: 3,
    alignBias: "ruthless",
    req: {
      minAge: 16,
      minAlign: { ruthless: 15 },
      anyDominantAlign: ["ruthless"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince"]
    },
    text: "과로로 쓰러진 작업반 인원들의 탄원을 묵살하고 할당량을 한층 더 끌어올려 상층부의 찬사를 받아 냈다. 부서진 톱니는 새것으로 갈아 끼우면 그만이며, 그들의 원성은 그대의 발끝에도 닿지 못했다.",
    effect: { stats: { Inf: 2 }, faith: -2, align: { ruthless: 2 } }
  },
  {
    id: "ch_s165_align_ruthless_06",
    badge: "잠들지 못하는 의심",
    priority: 3,
    alignBias: "ruthless",
    req: {
      minAge: 18,
      minAlign: { ruthless: 35 },
      anyDominantAlign: ["ruthless"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince"]
    },
    text: "정적들이 독이나 암살자를 보낼지 모른다는 의심 탓에 식사와 서신을 일일이 대역에게 먼저 시험시키고 밤새 뜬눈으로 지새웠다. 남을 짓밟고 올라선 자리가 높을수록 등 뒤의 그림자도 깊어진다.",
    effect: { stats: { Int: 2, Ag: 1 }, wounds: -2, align: { ruthless: 1 } }
  },
  {
    id: "ch_s165_align_ruthless_07",
    badge: "권력의 저울",
    priority: 3,
    alignBias: "ruthless",
    req: {
      minAge: 18,
      minAlign: { ruthless: 35 },
      anyDominantAlign: ["ruthless"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince"]
    },
    text: "구역의 생존자와 희생자를 인명이 아니라 거래 패와 권력 지분으로 환산하며 다음 수순을 냉정하게 설계했다. 자비도 명예도 저울 위에서는 이익 한 줌보다 가벼웠다.",
    effect: { stats: { Int: 1, Inf: 2 }, faith: -2, align: { ruthless: 2 } }
  },

  // ============================================================================
  // 교차 성향 · 초인 대비 (Cross-Axis & Transhuman) — 3건
  // ============================================================================
  {
    id: "ch_s165_align_cross_01",
    badge: "강철의 광신",
    priority: 3,
    alignBias: "dogmatic",
    req: {
      minAge: 18,
      minAlign: { dogmatic: 25 },
      minFaith: 65,
      excludeTags: ["custodes", "heretic", "daemon_prince"]
    },
    text: "불타는 황제 신앙과 한 치의 예외도 없는 철혈의 교조가 하나로 녹아들어, 그대의 눈빛만으로도 이단 용의자들이 무릎을 꺾고 자백을 토해 냈다. 흔들림 없는 확신은 검보다 날카로운 심판의 도구가 된다.",
    effect: { stats: { WP: 2, Inf: 1 }, faith: 3, corruption: -2, align: { dogmatic: 2 } }
  },
  {
    id: "ch_s165_align_cross_02",
    badge: "오염 없는 악덕",
    priority: 3,
    alignBias: "ruthless",
    req: {
      minAge: 18,
      minAlign: { ruthless: 25 },
      maxCorruption: 25,
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "heretic", "daemon_prince"]
    },
    text: "워프의 오염이나 금단의 의식에는 손끝 하나 대지 않았으나, 제국의 합법적 징발과 냉혹한 착취만으로도 숱한 이들을 쥐어짜 막대한 자원과 권력을 거머쥐었다. 악마의 속삭임 없이도 제국의 질서 아래에서는 얼마든지 잔혹해질 수 있다.",
    effect: { stats: { Inf: 2, Int: 1 }, faith: -2, align: { ruthless: 2 } }
  },
  {
    id: "ch_s165_align_cross_03",
    badge: "초인의 시선",
    priority: 3,
    req: {
      minAge: 20,
      anyTags: ["astartes"],
      anyDominantAlign: ["humane", "dogmatic"],
      excludeTags: ["heretic", "daemon_prince"]
    },
    text: "작전 구역을 지나며 비바람 속에 웅크린 필멸자 시민들의 연약한 숨결을 내려다보았다. 한 세기도 채 버티지 못하는 저 작은 생명들을 지키거나 다스리기 위해 죽음의 천사는 영원히 잠들지 않는 전쟁을 이어 간다.",
    effect: { stats: { WP: 2, T: 1 } }
  },

  // ============================================================================
  // 정점 이력 태그 회수 (Apex Tag Redemption) — 3건
  // ============================================================================
  {
    id: "ch_s165_align_tag_01",
    badge: "자비의 등불",
    priority: 3,
    alignBias: "humane",
    req: {
      minAge: 16,
      allTags: ["align_beacon_mercy"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "매연이 자욱한 하층 거주 구역의 배급소와 작업장 사이로 그대를 부르는 별칭인 자비의 등불이 조용한 속삭임으로 퍼져 나갔다. 절망이 일상인 제국 바닥에서 그 이름은 아직 인간성이 죽지 않았다는 작은 증표가 되었다.",
    effect: { stats: { Fel: 2, Inf: 1 }, faith: 2, align: { humane: 2 } }
  },
  {
    id: "ch_s165_align_tag_02",
    badge: "교조의 심판자",
    priority: 3,
    alignBias: "dogmatic",
    req: {
      minAge: 16,
      allTags: ["align_iron_dogma"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    text: "소란스럽던 집회장에서 누군가 그대의 이명인 교조의 심판자를 입에 올리자, 모든 불평과 수군거림이 칼로 벤 듯 일순간에 멎었다. 그대의 이름 자체가 이단과 나태를 응징하는 살아 있는 법전으로 각인되었다.",
    effect: { stats: { Inf: 2, WP: 2 }, faith: 2, align: { dogmatic: 2 } }
  },
  {
    id: "ch_s165_align_tag_03",
    badge: "암흑가의 밀거래자",
    priority: 3,
    alignBias: "ruthless",
    req: {
      minAge: 16,
      allTags: ["align_shadow_broker"],
      excludeTags: ["daemon_prince"]
    },
    text: "발신인도 인장도 없는 밀랍 봉투와 은밀한 청탁 서한이 어두운 전달책을 통해 조용히 책상 위에 쌓였다. 암흑가의 밀거래자라는 이름이 지닌 무게 앞에서는 합법적 권력자들조차 뒷문을 두드리며 경의를 표했다.",
    effect: { stats: { Inf: 2, Fel: 1, Int: 1 }, align: { ruthless: 2 } }
  }
];
