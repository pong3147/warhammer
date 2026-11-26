// 일상 연대기 — 네임드 15행성 파견 · 풍토 · 시대 심화 (45종)
export default [
  // ===== 1. 신성한 테라 (terra) =====
  {
    id: "ch_s15_wd_terra_1",
    badge: "테라 부임",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeHomeWorlds: ["terra"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "custodes"]
    },
    text: "궤도 승강기를 타고 신성한 테라의 상층 항만에 내려서자, 끝없는 향 냄새와 성가대의 저음이 폐부 깊숙이 밀려들었다. 대륙 전체를 뒤덮은 황금 첨탑과 수 킬로미터 아래로 뻗은 대리석 교각은 타 행성에서 온 이의 거리 감각을 단번에 무너뜨렸다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s15_wd_terra_2",
    badge: "테라 행정 서고",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "custodes", "astartes", "grey_knight"]
    },
    text: "외성 구역의 아드미니스트라툼 서고 회랑을 지나는 동안 수천 개의 깃펜이 양피지를 긁는 소리가 빗소리처럼 이어졌다. 서기들은 백 년 전 이미 함락되었을지도 모를 변방 성계의 십일조 장부에 오늘도 붉은 밀랍 인장을 찍어 내렸다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s15_wd_terra_3",
    badge: "황궁 외곽 재건",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 1001,
      greatRift: true,
      anyWorlds: ["terra"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    text: "사자의 문 전투가 남긴 검게 그을린 성벽을 보수하는 인부들 사이로, 내성 너머까지 순찰을 넓힌 황금빛 쿠스토데스 근위대의 발걸음이 지나갔다. 대균열 이후에도 테라의 종탑들은 밤마다 더 길고 장엄한 기도문을 울려 퍼뜨렸다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },

  // ===== 2. 화성 (mars) =====
  {
    id: "ch_s15_wd_mars_1",
    badge: "화성 철의 고리",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["mars"],
      excludeHomeWorlds: ["mars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "custodes", "mechanicus", "fabricator_general", "astartes", "grey_knight"]
    },
    text: "적도 상공을 통째로 감싼 거대한 궤도 조선소인 철의 고리를 통과해 화성에 발을 디디자, 붉은 하늘 아래 쇠 녹는 냄새와 성유 연기가 진동했다. 모든 출입구마다 이진 성가와 톱니바퀴 인장이 요구되어, 타 행성에서 온 방문객은 발걸음 하나에도 기계교의 규율을 배워야 했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s15_wd_mars_2",
    badge: "누스피어 중계탑",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["mars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "황동 첨탑마다 누스피어 중계 안테나가 푸른 불꽃을 튀기며 보이지 않는 교리 신호를 주고받았다. 그 아래로 스키타리 보병대가 단 한 치의 오차도 없는 보폭으로 행군하고, 서비터들은 성당만 한 피스톤에 축성된 성유를 부었다.",
    effect: { stats: { Int: 1 }, faith: 1 }
  },
  {
    id: "ch_s15_wd_mars_3",
    badge: "화성 전시 증산",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 1001,
      greatRift: true,
      anyWorlds: ["mars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    text: "인도미투스 성전군의 보급 요청이 쇄도하면서 화성 적도 궤도의 조선소와 지하 용광로가 휴식 없는 최대 가동에 들어갔다. 밤하늘 위로 거대한 궤도 승강기와 무장 수송선이 끊임없이 솟구치며 붉은 사막을 낮처럼 밝혔다.",
    effect: { stats: { Int: 1, T: 1 } }
  },

  // ===== 3. 카디아 (cadia) — 전 항목 maxYear: 999 =====
  {
    id: "ch_s15_wd_cadia_1",
    badge: "카디아 주둔",
    priority: 3,
    req: {
      minAge: 14,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeHomeWorlds: ["cadia"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "카디아에 처음 주둔한 밤, 북쪽 지평선을 물들이는 공포의 눈이 내뿜는 보랏빛 잔광 때문에 좀처럼 시선을 뗄 수 없었다. 팔각형 요새 도시의 모든 골목이 사격 각도와 방어선을 계산해 설계되어 있어, 평범한 시장통마저 거대한 참호처럼 느껴졌다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_s15_wd_cadia_2",
    badge: "카디아 파일런 평원",
    priority: 3,
    req: {
      minAge: 14,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "바람 거센 황야 위로 정체 모를 검은 거석 파일런이 하늘을 찌를 듯 솟아 있었다. 기갑 보급대가 요새 도시 사이를 오가는 동안, 거석 근처에서만은 복스 통신기의 기괴한 잡음이 신기할 만큼 잠잠해졌다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s15_wd_cadia_3",
    badge: "암흑 성전 전야",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 950,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "공포의 눈 가장자리의 성운이 날로 짙게 소용돌이치자, 카디아 전역의 병참 기지마다 비상 증원 열차가 쉴 새 없이 드나들었다. 흰 방패 표식을 단 소년병들까지 야간 방벽 교대에 투입되며 다가올 폭풍에 대비해 총열을 닦았다.",
    effect: { stats: { BS: 1, WP: 1 }, faith: 1 }
  },

  // ===== 4. 크리그 (krieg) — 비타-움 정합성 엄수 =====
  {
    id: "ch_s15_wd_krieg_1",
    badge: "크리그 벙커 파견",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "크리그의 지하 벙커 구역에 배치되자마자 등골을 서늘하게 만드는 완벽한 침묵과 마주했다. 통로를 지나는 병사 전원이 방독면을 쓴 채 일련번호로만 응답하며, 정화 공기가 흐르는 구역에서도 단 한 명조차 얼굴을 드러내지 않았다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_s15_wd_krieg_2",
    badge: "크리그 지하 병기창",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "방사능 잿더미 지표 아래 수백 미터 깊이의 지하 병기창에서는 공성 박격포탄과 루시우스식 라스건이 밤낮없이 출고되었다. 배수 참호의 화학 정화 펌프가 쉰 소리를 내며 돌아가는 사이, 작업반은 정해진 교대 시간 외에는 시선조차 돌리지 않았다.",
    effect: { stats: { T: 1, BS: 1 }, wounds: -1 }
  },
  {
    id: "ch_s15_wd_krieg_3",
    badge: "크리그 출정 점호",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      anyHomeWorlds: ["krieg"],
      anyTags: ["militarum", "imperial_military"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight", "warmaster", "sector_lord", "planetary_governor", "fabricator_general", "general_rank", "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "navy_admiral", "rt_lord_captain", "rogue_trader"]
    },
    text: "궤도 수송선 탑승을 앞두고 지급된 방독면 여과통과 착검 장치, 야전삽의 날을 정해진 순서대로 점검했다. 이름 대신 새겨진 일련번호 인식표를 외투 안쪽에 넣고, 머나먼 전장에서 치를 속죄의 의무를 묵묵히 되새겼다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 2 }
  },

  // ===== 5. 아마겟돈 (armageddon) — 오크 포자·전후 항목은 minYear: 942 =====
  {
    id: "ch_s15_wd_armageddon_1",
    badge: "아마겟돈 부임",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["armageddon"],
      excludeHomeWorlds: ["armageddon"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "아마겟돈의 환승 항만에 내린 지 한 시간도 지나지 않아 옷깃이 유황빛 매연과 화산재로 누렇게 물들었다. 끝없는 잿빛 황무지 위로 거대한 장갑 수송 열차가 굉음을 내며 질주하는 광경은 타 행성 출신의 숨을 턱 막히게 했다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -1 }
  },
  {
    id: "ch_s15_wd_armageddon_2",
    badge: "스틸 리전 병참로",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["armageddon"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "헬스리치와 타르타루스 하이브를 잇는 산성 황무지 간선 도로마다 스틸 리전 기계화 부대의 검문소가 촘촘히 세워져 있었다. 병사들은 출동 전마다 방독 호흡기와 장갑차 기밀 봉인을 이중으로 확인한 뒤 잿빛 먼지 속으로 출발했다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s15_wd_armageddon_3",
    badge: "재의 황무지 소탕",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 942,
      anyWorlds: ["armageddon"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "대전쟁 이후에도 황무지 외곽의 폐허와 습지에서는 오크의 녹색 포자 군락이 끈질기게 피어나곤 했다. 프로메튬 화염방사반과 장갑 정찰대가 매달 구역을 나누어 소각 순찰을 돌며, 외계 생물의 재발을 원천 봉쇄했다.",
    effect: { stats: { BS: 1, T: 1 }, wounds: -1 }
  },

  // ===== 6. 네크로문다 (necromunda) =====
  {
    id: "ch_s15_wd_necromunda_1",
    badge: "네크로문다 하강",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeHomeWorlds: ["necromunda"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "하이브 프리무스의 상층 항만에서 녹슨 화물 승강기를 타고 중층 구역으로 내려가자, 하늘 대신 거대한 배관과 네온 표지판이 천장을 가득 채웠다. 통행 관문마다 길드 통행증과 은밀한 통관료를 요구하는 이곳의 질서는 타 행성의 법전과 전혀 달랐다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_s15_wd_necromunda_2",
    badge: "네크로문다 길드 거리",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "철강 수송대를 거느린 하우스 올록의 무장 화물차 옆으로, 긴 외투에 얼굴을 감춘 하우스 델라크의 밀정들이 말없이 스쳐 지나갔다. 이곳에서는 황금보다 정제수 길드의 급수 탱크가 더 삼엄한 산탄총 호위를 받으며 이동했다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s15_wd_necromunda_3",
    badge: "배드존 경계선",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight", "noble"]
    },
    text: "치안대의 관할이 끝나는 배드존 경계 격벽 앞에서는 깜빡이는 조명 아래 현상금 사냥꾼들이 수배 전단을 훑고 있었다. 철문 너머 폐수 늪에서 들려오는 기괴한 울음소리에 아무도 혼자서는 발걸음을 옮기지 않았다.",
    effect: { stats: { Ag: 1, WS: 1 }, wounds: -1 }
  },

  // ===== 7. 마크라그 (macragge) =====
  {
    id: "ch_s15_wd_macragge_1",
    badge: "마크라그 부임",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["macragge"],
      excludeHomeWorlds: ["macragge"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "마크라그의 대리석 우주항에 내려서자, 매캐한 매연 대신 눈 덮인 고산의 차가운 청량함이 먼저 반겼다. 정갈한 열주 회랑과 시간표대로 정확히 운행되는 화물 전차는 혼돈으로 가득한 제국 변방과는 전혀 다른 세상처럼 보였다.",
    effect: { stats: { Int: 1, Fel: 1 }, wounds: 1 }
  },
  {
    id: "ch_s15_wd_macragge_2",
    badge: "울트라마 보조군 사열",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["macragge"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "마크라그 항만 외곽의 연병장에서 푸른 휘장을 두른 울트라마 보조군이 교과서처럼 정교한 제대 기동 훈련을 펼쳤다. 아래쪽 부두에서는 울트라마 각지로 향하는 보급선들이 깃발 신호에 맞춰 일사불란하게 닻을 올렸다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s15_wd_macragge_3",
    badge: "프라이마크 귀환 후",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 1001,
      greatRift: true,
      anyWorlds: ["macragge"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    text: "정지장이 비워진 프라이마크의 성소 앞에는 부활한 섭정의 행보를 기리는 시민과 병사들의 발길이 끊이지 않았다. 마크라그 궤도 항만은 이제 울트라마 오백 행성의 방어선과 원정군 보급을 총괄하는 거대한 전략 거점으로 숨 가쁘게 돌아갔다.",
    effect: { stats: { Inf: 1, WP: 1 }, faith: 2 }
  },

  // ===== 8. 바알 (baal) — 3번 대균열 이후 임페리움 니힐루스 고립 재건 =====
  {
    id: "ch_s15_wd_baal_1",
    badge: "바알 착륙",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["baal"],
      excludeHomeWorlds: ["baal"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "궤도 착륙선의 승강구가 열리자마자 바알의 붉은 소금 사막에서 올라온 뜨거운 복사열과 방사능 먼지가 얼굴을 때렸다. 이토록 메마른 황무지 한가운데 방어 성채마다 정교한 황금 날개 조각상이 서 있는 대비가 낯설면서도 경건했다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -1 }
  },
  {
    id: "ch_s15_wd_baal_2",
    badge: "천사의 요새 순찰",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["baal"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "바알 산맥의 아르크스 안젤리쿰 외곽 보급로에서는 진홍빛 로브를 입은 챕터 서프들이 귀한 응축수 수송대를 호위했다. 사막의 거친 생존 투쟁 속에서도 성채 곳곳에는 조각과 벽화를 다듬으며 마음을 다스리는 고요한 기풍이 스며 있었다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 1 }
  },
  {
    id: "ch_s15_wd_baal_3",
    badge: "니힐루스 바알 재건",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 1000,
      greatRift: true,
      anyWorlds: ["baal"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    text: "아스트로노미칸의 빛이 끊긴 하늘에 시카트릭스 말레딕툼이 붉게 타오르는 가운데, 바알의 무너진 외곽 보루마다 재건의 망치 소리가 울렸다. 임페리움 니힐루스의 고립 속에서도 수비대와 장인들은 단테 섭정의 깃발 아래 잿더미에서 방어선을 다시 세웠다.",
    effect: { stats: { WP: 1, T: 1 }, faith: 2 }
  },

  // ===== 9. 펜리스 (fenris) =====
  {
    id: "ch_s15_wd_fenris_1",
    badge: "펜리스 주둔",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeHomeWorlds: ["fenris"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "펜리스에서 유일하게 가라앉지 않는 대륙 아사이하임에 발을 딛자, 칼날 같은 빙하풍이 제국 표준 방한 외투를 단숨에 파고들었다. 깎아지른 절벽 너머 구름을 뚫고 솟은 더 팽의 위용과 멀리서 울리는 거대 늑대의 포효에 긴장이 풀릴 틈이 없었다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -1 }
  },
  {
    id: "ch_s15_wd_fenris_2",
    badge: "카얼 보조대 경계",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "더 팽 하층 항만과 지열 포대를 지키는 펜리스 카얼 보조대는 늑대 가죽을 덧댄 갑주 차림으로 혹한의 경계 근무를 섰다. 룬 문양이 새겨진 보초소 화덕 옆에서 교대병들이 뜨거운 국물과 탄약을 나누는 모습에는 거친 유대가 넘쳤다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s15_wd_fenris_3",
    badge: "펜리스 해빙기",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "타원 궤도가 항성에 가까워지는 해빙기가 찾아오자, 얼어붙어 있던 바다가 천둥 같은 굉음을 내며 갈라지고 검은 화산재 눈보라가 몰아쳤다. 아사이하임 절벽의 궤도 부두 요원들은 계류 쇠사슬을 이중으로 조이며 격변의 계절을 버텨 냈다.",
    effect: { stats: { T: 1, Ag: 1 }, wounds: -1 }
  },

  // ===== 10. 카타찬 (catachan) =====
  {
    id: "ch_s15_wd_catachan_1",
    badge: "카타찬 강하",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["catachan"],
      excludeHomeWorlds: ["catachan"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "화염방사기로 겨우 뚫어 둔 카타찬 착륙장에 내리자마자 숨이 막히는 열기와 독초 냄새가 온몸을 휘감았다. 하룻밤 새 방벽 철조망까지 기어오른 톱니 덩굴을 보며, 타 행성에서 배운 야전 교범이 이곳에서는 종잇조각에 불과함을 깨달았다.",
    effect: { stats: { T: 1, Ag: 1 }, wounds: -1 }
  },
  {
    id: "ch_s15_wd_catachan_2",
    badge: "밀림 전초기지 정비",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["catachan"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "밀림 전초기지의 아침은 방벽 너머로 뻗어 온 교살 덩굴을 프로메튬 화염으로 태워 내는 일로 시작되었다. 병사들은 카타찬 데블의 접근을 알릴 인계철선을 점검한 뒤, 땀을 닦으며 손에 익은 거대한 정글 단검의 날을 세웠다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s15_wd_catachan_3",
    badge: "카타찬 밀림 반격담",
    priority: 3,
    req: {
      minAge: 14,
      minYear: 1001,
      greatRift: true,
      anyWorlds: ["catachan"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "대균열 직후 밀림에 쏟아졌던 워프 악마들을 카타찬 전사들과 독성 생태계가 스스로 섬멸해 버린 일화는 전초기지마다 자부심으로 회자되었다. 구원 함대가 도착했을 때 이미 전장이 정리되어 있었다는 무용담에 수비병들은 묵묵히 탄창을 갈아 끼웠다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 1 }
  },

  // ===== 11. 보스트로야 (vostroya) =====
  {
    id: "ch_s15_wd_vostroya_1",
    badge: "보스트로야 부임",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      excludeHomeWorlds: ["vostroya"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "검은 석탄재가 섞인 눈보라를 뚫고 보스트로야의 철도 종착역에 내리자, 투박한 철판 대신 황동 부조로 장식된 장갑 기관차가 시선을 사로잡았다. 극한의 공업 행성이면서도 총신과 방벽마다 장인의 세공을 아끼지 않는 기풍이 낯설고도 인상적이었다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s15_wd_vostroya_2",
    badge: "보스트로야 황동 주조소",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "만년설로 뒤덮인 산악 터널을 뚫고 장갑 보급 열차가 포탄과 주조 강철을 우주항으로 실어 날랐다. 거대 주조소 안에서는 장인들이 뜨거운 화로 앞에서 보스트로얀 퍼스트본이 대대로 물려받을 황동 장식 총열을 정성껏 다듬고 있었다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s15_wd_vostroya_3",
    badge: "청동 회랑의 속죄",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "눈발이 흩날리는 중앙 광장의 청동 회랑에는 만 년 동안 제국 전역으로 출정한 보스트로얀 퍼스트본 연대들의 이름이 빼곡히 새겨져 있었다. 옛 불이행의 과오를 피로 갚아 온 기록 앞에서 출정 대기병들은 말없이 모피 모자를 고쳐 썼다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },

  // ===== 12. 발할라 (valhalla) =====
  {
    id: "ch_s15_wd_valhalla_1",
    badge: "발할라 지하 입성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["valhalla"],
      excludeHomeWorlds: ["valhalla"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "얼어붙은 지표의 기밀 갑문을 통과해 발할라의 거대한 지하 도시에 들어서자, 바위 천장 가득 뻗은 난방 배관과 증기음이 먼저 반겼다. 외지인의 얼어붙은 손을 본 현지 경비병이 씁쓸하고 진한 타나 차 한 잔을 건네며 지하 생활의 수칙을 일러 주었다.",
    effect: { stats: { T: 1, Fel: 1 }, wounds: 1 }
  },
  {
    id: "ch_s15_wd_valhalla_2",
    badge: "발할라 지열 발전소",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["valhalla"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "지하 최심부의 지열 발전소에서는 거대한 터빈이 빙하 행성의 유일한 온기를 뿜어내며 쉬지 않고 회전했다. 상부 통로에서는 제설 착암기가 궤도 승강구 입구에 쌓인 얼음층을 깎아 내며 보급로가 얼어붙지 않도록 밤새 작업했다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s15_wd_valhalla_3",
    badge: "발할라 동계 방어선",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["valhalla"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "한 치 앞도 보이지 않는 백색 눈보라 속에서 발할라 아이스 워리어 포병대가 지표 동계 방어선 실사격 훈련을 진행했다. 살을 에는 추위에도 묵묵히 포탄을 장전하고 방열을 유지하는 끈기는 옛 오크 침공을 버텨 낸 행성의 기질을 그대로 보여 주었다.",
    effect: { stats: { BS: 1, WP: 1 }, wounds: -1 }
  },

  // ===== 13. 타니스 (tanith) — 전 항목 maxYear: 764 =====
  {
    id: "ch_s15_wd_tanith_1",
    badge: "타니스 파견",
    priority: 3,
    req: {
      minAge: 14,
      maxYear: 764,
      anyWorlds: ["tanith"],
      excludeHomeWorlds: ["tanith"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "안개가 낮게 깔린 타니스의 우주항을 벗어나자, 일주일 전에 그린 지도가 이미 쓸모없어졌다는 안내원의 말에 어안이 벙벙해졌다. 거대한 날우드 거목들이 소리 없이 지형을 바꾸는 숲속에서, 외지인은 현지 길잡이의 걸음걸이만 놓치지 않으려 애썼다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_s15_wd_tanith_2",
    badge: "타니스 마그나 목재 항구",
    priority: 3,
    req: {
      minAge: 14,
      maxYear: 764,
      anyWorlds: ["tanith"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "타니스 마그나 외곽의 강변 부두에서는 짙은 송진 향을 풍기는 최고급 날우드 목재가 궤도 수송선에 실리고 있었다. 해 질 녘 서늘한 안개가 도시를 감싸면, 목조 망루마다 은은한 등불이 켜지며 고요한 밤을 밝혔다.",
    effect: { stats: { Fel: 1, WP: 1 }, wounds: 1 }
  },
  {
    id: "ch_s15_wd_tanith_3",
    badge: "날우드 숲 정찰 훈련",
    priority: 3,
    req: {
      minAge: 14,
      maxYear: 764,
      anyWorlds: ["tanith"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight", "warmaster", "sector_lord", "planetary_governor", "fabricator_general"]
    },
    text: "안개가 자욱한 날우드 숲 깊은 곳에서 낙엽 하나 밟지 않고 기동하며 사격 각도를 잡는 정찰 훈련이 이어졌다. 흐르는 안개 틈새로 표적이 드러나는 찰나에 숨을 멈추고 방아쇠를 당기는 감각이 온몸에 배어들었다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },

  // ===== 14. 녹턴 (nocturne) =====
  {
    id: "ch_s15_wd_nocturne_1",
    badge: "녹턴 고중력 적응",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["nocturne"],
      excludeHomeWorlds: ["nocturne"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra", "astartes", "custodes", "grey_knight"]
    },
    text: "녹턴의 성소 도시 항만에 발을 딛자마자 묵직한 고중력이 무릎을 짓누르고 화산재 섞인 유황 공기가 폐를 찔렀다. 그럼에도 가혹한 땅의 주민들은 지친 외지인에게 선뜻 식수와 방진 망토를 내어 주며 낯선 온정을 보여 주었다.",
    effect: { stats: { T: 1, Fel: 1 }, wounds: -1 }
  },
  {
    id: "ch_s15_wd_nocturne_2",
    badge: "녹턴 7대 성소 도시",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["nocturne"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "지진에 견디도록 검은 현무암으로 축조된 일곱 성소 도시의 장인 구역에서는 드레이크 비늘과 특수 합금이 거래되었다. 때때로 거대한 샐러맨더 전사들이 시민들 사이를 걸으며 직접 방벽 보수와 대장간 작업을 돕는 광경이 자연스레 펼쳐졌다.",
    effect: { stats: { Int: 1, Fel: 1 }, faith: 1 }
  },
  {
    id: "ch_s15_wd_nocturne_3",
    badge: "프로메테우스 위성의 그림자",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["nocturne"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "화산재가 흩날리는 밤하늘 가득 거대한 위성 프로메테우스가 붉은 빛을 반사하며 낮게 떠올랐다. 위성의 인력이 지각을 흔들어 먼 능선 너머 용암이 번쩍이는 동안, 궤도 요새를 오가는 수송선의 항법등이 별빛처럼 반짝였다.",
    effect: { stats: { WP: 1, T: 1 } }
  },

  // ===== 15. 오펠리아 VII (ophelia7) =====
  {
    id: "ch_s15_wd_ophelia7_1",
    badge: "오펠리아 VII 순례 항만",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeHomeWorlds: ["ophelia7"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "오펠리아 VII의 순례 항만에 들어서자, 항구 방파제부터 도열한 황금 성인상과 자욱한 유향 연기가 타 행성 방문객의 숨을 멎게 했다. 부두 관문마다 국교 부제들이 순결 인장과 신앙 문서를 꼼꼼히 확인하며 세속의 소란을 철저히 가려냈다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s15_wd_ophelia7_2",
    badge: "시노드 미니스트라 회랑",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "세그멘툼 템페스투스의 신앙을 관장하는 시노드 미니스트라 광장에서는 선교 칙령을 든 사제와 서기들이 끊임없이 오갔다. 청동 대문 양옆에 부동자세로 선 콘벤트 상크토룸 소속 전투 수녀들의 검붉은 갑주는 광장에 서늘한 경외감을 더했다.",
    effect: { stats: { Inf: 1, WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s15_wd_ophelia7_3",
    badge: "콘벤트 상크토룸 출정식",
    priority: 3,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "high_lord_terra"]
    },
    text: "성전 수송선에 오르기 직전, 콘벤트 상크토룸 외곽 성당 앞뜰에서 출정 부대를 위한 장엄한 축성 예식이 거행되었다. 수녀들의 합창과 종소리가 빗방울 사이로 울려 퍼지는 가운데, 병사들은 새로 봉인된 순결 인장을 가슴에 달고 발걸음을 떼었다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 3 }
  }
];
