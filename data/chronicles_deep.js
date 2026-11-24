window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || [];

window.IMPERIUM_DATA.CHRONICLES.push(
  // =========================================================================
  // 1. 스페이스 마린 9대 유명 챕터 일상 연대기 27종 (챕터당 3종 · priority 3!)
  // =========================================================================
  // 울트라마린 (3)
  {
    id: "ch_chap_um_1",
    badge: "울트라마린",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["ultramarines"] },
    text: "마크라그의 대리석 회랑에서 《코덱스 아스타르테스》 제4권 교차 화망 조항을 암송한 뒤 2,000발의 실탄 사격 훈련을 오차 없이 마쳤다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_chap_um_2",
    badge: "울트라마린",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["ultramarines"] },
    text: "울트라마 500 행성의 보급 통계표와 울트라마 보조군 사열 보고서를 검토했다. 훌륭한 병참이야말로 승리의 절반이다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_chap_um_3",
    badge: "울트라마린",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["ultramarines"] },
    text: "푸른 세라마이트 견갑에 흰색 오메가 문장을 새로 도색하며 로부테 길리먼의 이성과 질서를 되새겼다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },

  // 블러드 엔젤 (3)
  {
    id: "ch_chap_ba_1",
    badge: "블러드 엔젤",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["blood_angels"] },
    text: "전투 사이 휴식 시간에 대리석 부조를 다듬으며 혈관 속 '붉은 갈증'을 차분히 가라앉혔다. 예술은 야수를 잠재우는 사슬이다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_chap_ba_2",
    badge: "블러드 엔젤",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["blood_angels"] },
    text: "점프팩 추진 노즐에 축성 기름을 바르고 고고도 급강하 근접 강습을 40차례 반복했다. 하늘에서 내려오는 천사의 날개는 망설이지 않는다.",
    effect: { stats: { Ag: 1, WS: 1 } }
  },
  {
    id: "ch_chap_ba_3",
    badge: "블러드 엔젤",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["blood_angels"] },
    text: "생귀너리 사제가 건넨 성배 앞에서 눈을 감고, 1만 년 전 생귀니우스의 고귀한 희생을 기리며 검은 분노의 그림자를 밀어냈다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },

  // 스페이스 울프 (3)
  {
    id: "ch_chap_sw_1",
    badge: "스페이스 울프",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["space_wolves"] },
    text: "더 팽(The Fang) 연회장에서 펜리스 독주 묠드를 들이켜며 형제들과 지난 원정의 무용담 사가를 목청껏 합창했다.",
    effect: { stats: { T: 1, Fel: 1 } }
  },
  {
    id: "ch_chap_sw_2",
    badge: "스페이스 울프",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["space_wolves"] },
    text: "눈보라 치는 펜리스 설원에서 프로스트 블레이드를 휘두르며 펜리시안 울프 무리와 함께 사냥 호흡을 맞췄다.",
    effect: { stats: { WS: 1, Ag: 1 } }
  },
  {
    id: "ch_chap_sw_3",
    badge: "스페이스 울프",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["space_wolves"] },
    text: "룬 프리스트가 던진 뼈 룬을 읽으며 폭풍의 징조를 살폈다. 펜리스의 늑대들은 워프의 마법이 아니라 대지의 정령과 싸운다.",
    effect: { stats: { WP: 1, T: 1 } }
  },

  // 다크 엔젤 (3)
  {
    id: "ch_chap_da_1",
    badge: "다크 엔젤",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["dark_angels"] },
    text: "이동 요새 '더 락'의 침묵 어린 복도에서 고대 플라즈마 캐논의 냉각 코일을 정밀 정비했다. 제1군단의 화력은 한 치의 오차도 없다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_chap_da_2",
    badge: "다크 엔젤",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["dark_angels"] },
    text: "회랑 그림자 너머로 후드를 깊이 눌러쓴 작은 '어둠 속의 감시자(Watcher in the Dark)'가 말없이 지나갔다. 누구도 그 정체를 묻지 않는 것이 챕터의 불문율이다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_chap_da_3",
    badge: "다크 엔젤",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["dark_angels"] },
    text: "짙은 녹색 갑주 위로 수도사 로브를 걸치고 새벽 침묵 기도를 올렸다. 용서받지 못한 자들의 명예는 오직 완수된 임무로만 증명된다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },

  // 임페리얼 피스트 (3)
  {
    id: "ch_chap_if_1",
    badge: "임페리얼 피스트",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["imperial_fists"] },
    text: "이동 요새 팔랑크스 외곽 포대를 순찰하며 방어 사격선 각도를 밀리미터 단위로 재검산했다. 로갈 돈의 성벽에는 빈틈이 없다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_chap_if_2",
    badge: "임페리얼 피스트",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["imperial_fists"] },
    text: "명상실에서 전사한 선배 형제의 뼈에 세밀한 전투 문양을 새기는 '스크림쇼(Scrimshaw)' 수행으로 손끝의 흔들림을 완전히 없앴다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_chap_if_3",
    badge: "임페리얼 피스트",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["imperial_fists"] },
    text: "36시간 연속 중장갑 방패 진형 유지 훈련을 버텨 냈다. 요새가 무너질 수는 있어도 임페리얼 피스트의 대열은 물러서지 않는다.",
    effect: { stats: { T: 2 } }
  },

  // 샐러맨더 (3)
  {
    id: "ch_chap_sa_1",
    badge: "샐러맨더",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["salamanders"] },
    text: "성소 대장간의 모루 위에서 자신의 볼터 총열과 멜타 노즐을 직접 단조·수리했다. 샐러맨더 전사는 모두가 대장장이이자 장인이다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_chap_sa_2",
    badge: "샐러맨더",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["salamanders"] },
    text: "전투가 끝난 폐허에서 울고 있는 제국 아이에게 물통을 건네고 무너진 대피소 입구를 치워 주었다. 불칸의 아들들은 인류를 지키기 위해 싸운다.",
    effect: { stats: { Fel: 2 }, faith: 2 }
  },
  {
    id: "ch_chap_sa_3",
    badge: "샐러맨더",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["salamanders"] },
    text: "프로메튬 화염 세례 의식 속에서 뜨거운 불길을 맨팔로 견뎌 냈다. 전투의 불길 속으로, 모루 위로!",
    effect: { stats: { T: 1, WP: 1 } }
  },

  // 블랙 템플러 (3)
  {
    id: "ch_chap_bt_1",
    badge: "블랙 템플러",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["black_templars"] },
    text: "성전 출격 전 쇠사슬로 체인소드와 볼터를 오른팔 갑주에 단단히 감아 묶었다. 적이 쓰러지거나 내가 죽을 때까지 무기는 손에서 떨어지지 않는다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 3 }
  },
  {
    id: "ch_chap_bt_2",
    badge: "블랙 템플러",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["black_templars"] },
    text: "성전 함선 예배당에서 채플린의 선창에 맞춰 지기스문트의 서약을 6시간 동안 낭송했다. 사이커와 이단자에 대한 증오가 날카롭게 벼려졌다.",
    effect: { stats: { WP: 1 }, faith: 4, corruption: -2 }
  },
  {
    id: "ch_chap_bt_3",
    badge: "블랙 템플러",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["black_templars"] },
    text: "훈련 갑판에서 신참 네오파이트와 실전 파워 소드 대련을 치렀다. 블랙 템플러의 검은 피와 기도로 전수된다.",
    effect: { stats: { WS: 2 } }
  },

  // 레이븐 가드 (3)
  {
    id: "ch_chap_rg_1",
    badge: "레이븐 가드",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["raven_guard"] },
    text: "완전한 암흑으로 차단된 훈련실에서 발소리 하나 내지 않고 보안 센서 14개를 통과하는 그림자 걸음 수행을 마쳤다.",
    effect: { stats: { Ag: 2 } }
  },
  {
    id: "ch_chap_rg_2",
    badge: "레이븐 가드",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["raven_guard"] },
    text: "점프팩 소음 저감기와 라이트닝 클로의 미세 진동을 조율하며 적 폭군의 경호 동선을 머릿속에 그려 넣었다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_chap_rg_3",
    badge: "레이븐 가드",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["raven_guard"] },
    text: "딜리버런스의 과거 노예 해방 투쟁사를 되새기며, 힘없는 자를 짓밟는 폭정과 반역을 소리 없이 끝낼 결의를 다졌다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },

  // 화이트 스카 (3)
  {
    id: "ch_chap_ws_1",
    badge: "화이트 스카",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["white_scars"] },
    text: "출격 전야, 벼루에 먹을 갈아 초원의 바람과 폭풍을 노래하는 짧은 시 한 수를 붓으로 써 내려갔다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_chap_ws_2",
    badge: "화이트 스카",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["white_scars"] },
    text: "아웃라이더 바이크의 터빈 출력을 한계까지 조율한 뒤 기동 사격 코스를 최고 기록으로 주파했다. 속도가 곧 방패다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_chap_ws_3",
    badge: "화이트 스카",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["white_scars"] },
    text: "스톰시어의 번개 축복 아래 초고리스식 곡도(탈와르) 베기 훈련을 마쳤다. 화이트 스카는 웃으며 폭풍 속으로 달린다.",
    effect: { stats: { WS: 1, Ag: 1 } }
  },

  // =========================================================================
  // 2. 계급·직군별 정밀 연대기 25종 (말단 → 중간 간부 → 최고위 계급별 맛 구분!)
  // =========================================================================
  {
    id: "ch_rank_deep_pdf_1",
    badge: "행성 방위군",
    priority: 3,
    req: { anyCareers: ["pdf_trooper"] },
    text: "고향 행성 외곽 검문소에서 14시간 보초를 서며 밀수 화물차를 단속했다. 아스트라 밀리타룸 차출 명단이 내려올 때마다 막사가 술렁인다.",
    effect: { stats: { BS: 1 } }
  },
  {
    id: "ch_rank_deep_guard_1",
    badge: "제국 보병",
    priority: 3,
    req: { anyCareers: ["astra_militarum"] },
    text: "데파트멘토 무니토룸에서 보급된 300년 묵은 시체 녹말 전투식량을 씹으며 라스건 배터리 팩을 모닥불에 살짝 데워 비상 충전했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_rank_deep_guard_2",
    badge: "제국 보병",
    priority: 3,
    req: { anyCareers: ["astra_militarum"] },
    text: "신병 보충대가 참호에 도착하자 고참들과 함께 '15시간만 버티면 베테랑이다'라는 씁쓸한 농담을 건네며 철모를 눌러 썼다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_rank_deep_officer_1",
    badge: "연대 장교",
    priority: 3,
    req: { anyCareers: ["militarum_officer"] },
    text: "야전 막사에서 수백 장의 전사자 통지서에 도장을 찍고, 내일 새벽 공세에 투입할 예비 중대의 탄약 배당량을 계산했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_scion_1",
    badge: "템페스투스 사이온",
    priority: 3,
    req: { anyCareers: ["tempestus_scion"] },
    text: "발키리 수송정 안에서 중력 낙하산(그라브 슈트)과 핫샷 라스건 전원 팩을 점검했다. 스콜라 프로제니움의 교리에는 두려움이라는 단어가 없다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_rank_deep_commissar_1",
    badge: "커미사르",
    priority: 3,
    req: { anyCareers: ["commissar"] },
    text: "검은 대제복의 먼지를 털고 군기 문란 보고서를 검토했다. 사형 선고 한 번보다 제때 챙겨 준 따뜻한 배급이 연대의 사기를 더 높일 때도 있다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_lordcomm_1",
    badge: "로드 커미사르",
    priority: 3,
    req: { anyCareers: ["lord_commissar"] },
    text: "전구 총사령부 작전 회의에 참석하자, 사단장 세 명이 말없이 일어나 경례했다. 로드 커미사르의 존재 자체가 전선의 철벽이다.",
    effect: { stats: { Inf: 2, WP: 1 } }
  },
  {
    id: "ch_rank_deep_sororitas_1",
    badge: "전투 수녀",
    priority: 3,
    req: { anyCareers: ["adepta_sororitas"] },
    text: "수녀원 무기고에서 볼터 탄창 하나하나에 축성 성유를 바르며 성녀의 찬송가를 읊었다. 강철과 신앙은 둘이 아니다.",
    effect: { stats: { BS: 1 }, faith: 3 }
  },
  {
    id: "ch_rank_deep_canoness_1",
    badge: "캐노네스",
    priority: 3,
    req: { anyCareers: ["canoness"] },
    text: "오더 밀리탄트 성전군 수백 명을 사열하며 성유물 깃발 아래 출정 축복을 내렸다. 수녀원장의 검이 가리키는 곳에 이단의 재만 남으리라.",
    effect: { stats: { Inf: 2, Fel: 1 }, faith: 3 }
  },
  {
    id: "ch_rank_deep_scout_1",
    badge: "네오파이트",
    priority: 3,
    req: { anyCareers: ["astartes_scout"] },
    text: "파워 아머를 입은 선배 형제들의 무구를 밤새 정비하고 수면 학습 장치로 챕터 전술 교리를 주입받았다. 배틀 브라더가 될 날이 머지않았다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_rank_deep_brother_1",
    badge: "배틀 브라더",
    priority: 3,
    req: { anyCareers: ["astartes_brother"] },
    text: "드롭 포드 강하 전 15분간의 전투 기도 동안 심장 두 개가 흔들림 없이 고동쳤다. 황제의 죽음의 천사는 공포를 알지 못한다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_captain_1",
    badge: "중대장",
    priority: 3,
    req: { anyCareers: ["astartes_captain"] },
    text: "타격 순양함 함교의 홀로그램 성도 앞에서 100명 중대원들의 강하 좌표를 직접 조율했다. 중대장의 결단 하나가 행성 하나의 생사를 가른다.",
    effect: { stats: { Int: 1, Inf: 2 } }
  },
  {
    id: "ch_rank_deep_gk_1",
    badge: "그레이 나이트",
    priority: 3,
    req: { anyCareers: ["grey_knight"] },
    text: "토성 위성 타이탄의 666 성채 서고에서 상급 악마의 금지된 진명 한 구절을 암기했다. 은빛 네메시스 포스 할버드가 푸르게 공명했다.",
    effect: { stats: { WP: 2 }, corruption: -3 }
  },
  {
    id: "ch_rank_deep_custodes_1",
    badge: "쿠스토데스",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes"] },
    text: "황궁 대리석 회랑에서 아우라마이트 갑주에 새겨진 백여 개의 개인 명예 칭호를 묵묵히 점검했다. 만 명의 수호자는 단 한 순간도 방심하지 않는다.",
    effect: { stats: { WS: 1, Int: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_acolyte_1",
    badge: "어콜라이트",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte"] },
    text: "가짜 상인 통행증 세 장을 갈아 끼우며 하층 선술집에서 이단 결사 암구호를 채집했다. 정체가 들키는 순간 아무도 나를 구하러 오지 않는다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_rank_deep_inquisitor_1",
    badge: "이단심문관",
    priority: 3,
    req: { anyCareers: ["inquisitor"] },
    text: "암호화된 천체 통신망으로 세 개 성계에 흩어져 있는 어콜라이트 세포 조직의 보고서를 취합했다. 이단심문관의 눈은 잠들지 않는다.",
    effect: { stats: { Int: 1, Inf: 2 } }
  },
  {
    id: "ch_rank_deep_skitarii_1",
    badge: "스키타리",
    priority: 3,
    req: { anyCareers: ["skitarii"] },
    text: "강철 의족의 윤활유를 교체하고 갈바닉 라이플의 축전 코일을 정렬했다. 마고스의 이진법 전파가 들어오는 즉시 행군할 준비가 끝났다.",
    effect: { stats: { BS: 1, T: 1 } }
  },
  {
    id: "ch_rank_deep_tp_1",
    badge: "테크프리스트",
    priority: 3,
    req: { anyCareers: ["tech_priest"] },
    text: "오작동하던 발전기 앞에서 성유를 붓고 옴니시아 찬가를 세 번 읊은 뒤 렌치로 측면을 정확히 두드려 기계령을 진정시켰다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_rank_deep_magos_1",
    badge: "아크마고스",
    priority: 3,
    req: { anyCareers: ["archmagos"] },
    text: "포지 월드 12개 구역의 생산 지수를 뇌 임플란트 누스피어에 직결해 실시간 최적화했다. 나약한 살점의 피로는 이미 수십 년 전에 버렸다.",
    effect: { stats: { Int: 2, Inf: 1 } }
  },
  {
    id: "ch_rank_deep_navy_1",
    badge: "임페리얼 네이비",
    priority: 3,
    req: { anyCareers: ["imperial_navy"] },
    text: "순양함 관측 갑판에서 워프 도약 직전의 겔러 필드 출력을 최종 점검했다. 보이드에서 실수는 곧 함선 전체의 소멸이다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_rank_deep_arbites_1",
    badge: "아르비테스",
    priority: 3,
    req: { anyCareers: ["arbites"] },
    text: "렉스 임페리얼리스 법전 420권을 암송한 뒤 컴뱃 샷건에 특수 집행탄을 장전했다. 법 앞에 귀천도, 자비도 없다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_admin_1",
    badge: "아드미니스트라툼",
    priority: 3,
    req: { anyCareers: ["administratum"] },
    text: "서류 산더미 사이에서 240년 전에 접수된 행성 도로 보수 민원서를 발견해 '관할 이관 대기' 도장을 정성스럽게 찍어 다음 책상으로 넘겼다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_rank_deep_priest_1",
    badge: "에클레시아키",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest"] },
    text: "대성당 강단에서 황제의 영광을 열변한 뒤, 전장용 에비스서레이터 체인소드의 톱니에 향유를 발랐다.",
    effect: { stats: { Fel: 1 }, faith: 4 }
  },
  {
    id: "ch_rank_deep_rt_1",
    badge: "로그 트레이더",
    priority: 3,
    req: { anyCareers: ["rogue_trader"] },
    text: "황제의 친필 서명이 새겨진 무역 영장 보관함을 열어 본 뒤, 변경 미개척 성계의 희귀 광물 독점 계약서에 서명했다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_rank_deep_psyker_1",
    badge: "생션드 사이커",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker"] },
    text: "사이킥 억제 목걸이의 미세한 전류를 견디며 워프 너머에서 날아온 아스트로패스 암호 꿈을 해독해 사령부에 보고했다.",
    effect: { stats: { WP: 2 }, corruption: -2 }
  },

  // =========================================================================
  // 3. 시기·장소 및 제국 부조리 심화 연대기 18종 (엄격한 조건 필터링!)
  // =========================================================================
  {
    id: "ch_era_eisenhorn_1",
    badge: "스카루스 시대",
    priority: 3,
    req: { minAge: 10, minYear: 225, maxYear: 510 },
    text: "우주항 게시대에 스카루스 섹터 무역 호황과 함께 '외계 유물 밀수 신고 포상금' 포고령이 나란히 붙어 있었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_era_sabbat_1",
    badge: "사바트 성전기",
    priority: 3,
    req: { minAge: 10, minYear: 755, maxYear: 795, anySegmenta: ["pacificus"] },
    text: "파시피쿠스 항구마다 사바트 성전 전선으로 향하는 병력 수송선이 줄을 이었고, 성녀 사바트의 기적담이 술집마다 회자되었다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_era_vraks_1",
    badge: "브락스 공성전기",
    priority: 3,
    req: { minAge: 10, minYear: 813, maxYear: 830, or: [{ anyWorlds: ["krieg"] }, { anySegmenta: ["obscurus", "tempestus"] }] },
    text: "전시 물자 징발 포고문이 붙으며 '브락스의 배교자 자판을 분쇄하기 위해 포탄 생산량을 20% 증대하라'는 칙령이 울려 퍼졌다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_era_badab_1",
    badge: "바답 전쟁기",
    priority: 3,
    req: { minAge: 10, minYear: 901, maxYear: 912, anySegmenta: ["ultima"] },
    text: "마엘스트롬 일대 내전 여파로 우주항 통관 검사가 세 배나 까다로워졌고, '아스트랄 클로 반역자 협조 시 즉결 처형' 경고문이 나붙었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_precadia_1",
    badge: "13차 성전 전야",
    priority: 3,
    req: { minAge: 10, minYear: 990, maxYear: 998, or: [{ anyWorlds: ["cadia"] }, { anySegmenta: ["obscurus"] }] },
    text: "밤하늘 북쪽 끝의 보랏빛 성운이 유난히 붉게 타오르는 날이면 성당의 종이 밤새 멈추지 않고 울렸다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_era_noctis_1",
    badge: "영원한 밤",
    priority: 3,
    req: { minAge: 8, minYear: 999, maxYear: 1001 },
    text: "아스트로노미칸의 빛이 흔들리며 성간 화물선이 석 달째 끊겼다. 거리의 확성기는 매일 밤 '황제께서는 여전히 옥좌에 계시다'고 외쳐 댔다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_indomitus_1",
    badge: "인도미투스 시대",
    priority: 3,
    req: { minAge: 10, minYear: 1001, maxYear: 1016, excludeTags: ["imperial_nihilus", "heretic"] },
    text: "선전 홀로비드에서 웅장한 새 갑주의 프라이머리스 스페이스 마린과 제국 섭정 로부테 길리먼의 인도미투스 성전 출정 행렬이 방영되었다.",
    effect: { faith: 3 }
  },
  {
    id: "ch_era_deep_nihilus_1",
    badge: "암흑 제국",
    priority: 3,
    req: { minAge: 10, minYear: 1000, allTags: ["imperial_nihilus"] },
    text: "테라의 빛이 닿지 않는 암흑 제국 하늘 아래, 낡은 라스건 부품 하나까지 재활용하며 내일의 생존을 기약했다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_era_pariah_1",
    badge: "파리아 넥서스",
    priority: 3,
    req: { minAge: 10, minYear: 1016, maxYear: 1040, anySegmenta: ["ultima", "tempestus"] },
    text: "네필림 섹터 방면에서 들려오는 '정적(The Stilling)'의 소문에 상선 선원들이 항로를 우회하며 연신 아퀼라 성호를 그었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_4tyranic_1",
    badge: "4차 타이라니드 전쟁",
    priority: 3,
    req: { minAge: 10, minYear: 1025, anySegmenta: ["pacificus", "solar"] },
    text: "서부 은하에 레비아탄의 대촉수가 나타났다는 비상 포고령과 함께 솔블레이드 방어 함대 지원병 모집 현수막이 광장을 뒤덮었다.",
    effect: { stats: { BS: 1 } }
  },
  {
    id: "ch_grim_deep_1",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor", "archmagos"], excludeWorldTags: ["feral", "krieg"] },
    text: "배급소에서 '신메뉴 — 향신료 첨가 시체 녹말'을 특별 배급했다. 맛은 똑같이 잿빛 진흙이었지만, 불평하면 배급권이 몰수되기에 모두 감사 기도를 올렸다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_grim_deep_2",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"], excludeWorldTags: ["feral", "krieg"] },
    text: "구역 행정처에서 380년 전 증조할아버지가 과납한 통행세 1.5 쓰론을 환급해 주겠다며 서류 19장을 작성하라고 통보했다. 수수료는 4 쓰론이었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_grim_deep_3",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, excludeTags: ["astartes", "custodes", "grey_knight", "heretic"], excludeWorldTags: ["feral"] },
    text: "노점상이 '고위 주교 친필 축성 순결의 인장'을 헐값에 팔다 아르비테스 순찰대에 적발되었다. 밀랍을 긁어 보니 공업용 윤활유 찌꺼기였다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_grim_deep_4",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, anyWorldTags: ["hive", "forge", "civilised", "terra"], excludeTags: ["astartes", "custodes"] },
    text: "거리를 청소하던 서비터가 회로 오류로 행인의 장화를 쓰레기로 인식해 끝없이 빗자루로 쓸어 댔다. 기계교 수리 요청 대기 순번은 9개월 뒤였다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_grim_deep_5",
    badge: "제국 일상",
    priority: 2,
    req: { anyCareers: ["underhive_ganger"] },
    text: "녹슨 환기구 틈에서 적대 갱단의 밀수 경로를 엿들었다. 언더하이브에서는 탄알만큼이나 소문이 비싼 화폐다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_grim_deep_6",
    badge: "제국 일상",
    priority: 2,
    req: { anyCareers: ["menial_worker"], excludeWorlds: ["krieg"] },
    text: "교대 사이렌이 울리자 피로에 절은 동료들과 함께 쇳가루 묻은 손으로 아퀼라 성호를 긋고 4시간짜리 쪽잠을 청했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_grim_deep_7",
    badge: "암흑 의식",
    priority: 3,
    req: { anyCareers: ["chaos_cultist"] },
    text: "아르비테스 순찰대의 발소리가 멀어지기를 기다렸다가 지하 벽면에 팔각별 문양을 덧그렸다. 워프 너머에서 서늘한 응답이 메아리쳤다.",
    effect: { stats: { WP: 1 }, corruption: 3 }
  },
  {
    id: "ch_grim_deep_8",
    badge: "기계교 일상",
    priority: 2,
    req: { anyWorldTags: ["forge", "mechanicus"], minAge: 12, excludeTags: ["astartes", "custodes"] },
    text: "붉은 하늘 위로 배출된 용광로 분진이 금속 눈처럼 내려앉았다. 호흡기 필터를 갈아 끼우며 옴니시아의 효율을 찬미했다.",
    effect: { stats: { T: 1, Int: 1 } }
  },

  // =========================================================================
  // 4. 1단계 서사 보강 — 3대 오르도 · 카오스 4대 신 · 미회수 이력 태그 전용 연대기 (21종)
  // =========================================================================
  {
    id: "ch_arc_ordo_hereticus",
    badge: "오르도 헤레티쿠스",
    priority: 3,
    req: { anyCareers: ["inquisitor"], allTags: ["ordo_hereticus"] },
    text: "오르도 헤레티쿠스 서고에서 관할 주교구 설교문 검열 보고서를 검토하고, 아뎁타 소로리타스 수녀원과 합동 단속 일정을 조율했다.",
    effect: { stats: { WP: 1, Inf: 1 }, faith: 2 }
  },
  {
    id: "ch_arc_ordo_xenos",
    badge: "오르도 제노스",
    priority: 3,
    req: { anyCareers: ["inquisitor"], allTags: ["ordo_xenos"] },
    text: "격리 실험실에서 포획한 외계 생체 표본과 무기를 정밀 분석한 뒤, 인근 데스워치 워치 포트리스로 암호 첩보를 송신했다.",
    effect: { stats: { Int: 1, BS: 1 } }
  },
  {
    id: "ch_arc_ordo_malleus",
    badge: "오르도 말레우스",
    priority: 3,
    req: { anyCareers: ["inquisitor"], allTags: ["ordo_malleus"] },
    text: "성수로 축성한 은제 탄환과 육망성 봉인함을 점검하며, 워프 너머에서 엿보는 악마들의 기척에 대비해 정신을 벼렸다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_arc_mark_khorne",
    badge: "코른의 낙인",
    priority: 3,
    req: { allTags: ["mark_khorne"], excludeTags: ["custodes", "grey_knight"] },
    text: "피부 아래 놋쇠빛 코른의 낙인이 맥박에 맞춰 뜨겁게 고동쳤다. 무기를 쥐지 않은 손이 이유 모를 살의로 미세하게 떨렸다.",
    effect: { stats: { WS: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_mark_tzeentch",
    badge: "젠취의 낙인",
    priority: 3,
    req: { allTags: ["mark_tzeentch"], excludeTags: ["custodes", "grey_knight"] },
    text: "창문에 비친 그림자가 잠깐 아홉 갈래로 갈라져 속삭였다. 변화의 군주가 보여 준 단편적 미래를 암호 노트에 급히 받아 적었다.",
    effect: { stats: { Int: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_mark_nurgle",
    badge: "너글의 낙인",
    priority: 3,
    req: { allTags: ["mark_nurgle"], excludeTags: ["custodes", "grey_knight"] },
    text: "아물지 않은 상처 위로 검은 파리 몇 마리가 앉았으나 전혀 아프지 않았다. 기괴한 무감각 속에 묵직한 끈기가 몸을 채웠다.",
    effect: { stats: { T: 1 }, wounds: 3, corruption: 2 }
  },
  {
    id: "ch_arc_mark_slaanesh",
    badge: "슬라네쉬의 낙인",
    priority: 3,
    req: { allTags: ["mark_slaanesh"], excludeTags: ["custodes", "grey_knight"] },
    text: "평범한 잡음마저 날카로운 현악기 선율처럼 귓가를 파고들었다. 더 완벽한 움직임과 더 강렬한 자극을 향한 갈증이 깊어졌다.",
    effect: { stats: { Ag: 1, Fel: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_stc_finder",
    badge: "STC 발견자",
    priority: 3,
    req: { allTags: ["stc_finder"], excludeTags: ["heretic"] },
    text: "화성 재무 서기관이 보낸 정기 STC 공로 배당금과 함께, 복원된 설계도가 성계 전역의 보급창에서 가동 중이라는 경의 서신이 도착했다.",
    effect: { stats: { Inf: 2 } }
  },
  {
    id: "ch_arc_inquisition_favor",
    badge: "심문소 신임",
    priority: 3,
    req: { allTags: ["inquisition_favor"], excludeTags: ["inquisitor", "heretic"] },
    text: "까다로운 아르비테스 검문소에서 검은 인장 암호를 제시하자, 담당 장교가 표정을 굳히며 아무 질문 없이 즉시 통행을 허가했다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_arc_wanted",
    badge: "심문소 수배",
    priority: 3,
    req: { allTags: ["wanted_by_inquisition"] },
    text: "항구 검문소 벽면에 붙은 수배 전단을 지나치며 후드를 깊게 눌러썼다. 매일 밤 비상 탈출 경로를 확인하는 습관이 몸에 배었다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_arc_rogue_psyker",
    badge: "무등록 사이커",
    priority: 3,
    req: { allTags: ["rogue_psyker"], excludeTags: ["sanctioned_psyker", "grey_knight", "custodes"] },
    text: "궤도에 검은 함선이 입항했다는 소문이 돌자 서둘러 거처를 옮겼다. 머릿속을 스치는 워프의 잡음을 억누르며 숨을 죽였다.",
    effect: { stats: { WP: 1, Ag: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_tech_heresy",
    badge: "기술 이단",
    priority: 3,
    req: { allTags: ["tech_heresy"], excludeTags: ["custodes", "grey_knight"] },
    text: "표면적으로는 정통 옴니시아 기도문을 읊으면서도, 서보 스컬의 시야 밖에서 비인가 연산 회로를 은밀히 조율했다.",
    effect: { stats: { Int: 2 }, corruption: 1 }
  },
  {
    id: "ch_arc_xenos_contact",
    badge: "외계인 접촉",
    priority: 3,
    req: { allTags: ["xenos_contact"], excludeTags: ["custodes", "grey_knight"] },
    text: "제국 교본에는 결코 실리지 않는 외계 종족의 관습과 약점을 되짚어 보았다. 알아서는 안 될 지식이 오히려 생존의 무기가 된다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_arc_penal",
    badge: "징벌 부대",
    priority: 3,
    req: { allTags: ["penal_mark"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    text: "목덜미에 남은 폭발 목걸이의 흉터를 문지르며 무기를 손질했다. 낙인이 찍힌 병사에게 남은 길은 오직 더 악착같이 살아남는 것뿐이다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_arc_dreadnought_2",
    badge: "고대 드레드노트",
    priority: 3,
    req: { allTags: ["astartes", "dreadnought"] },
    text: "동면 직전의 흐릿한 꿈속에서 수백 년 전 모성의 바람 냄새를 떠올렸다가, 기계령의 차가운 경고음과 함께 강철 석관의 현실로 깨어났다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_arc_primaris",
    badge: "프라이머리스",
    priority: 3,
    req: { allTags: ["astartes", "primaris"] },
    text: "신형 마크 X 파워 아머의 관절 서보를 점검하는 동안, 가슴속 벨리사리우스 용광로 장기가 묵직하고 강인한 활력을 뿜어냈다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_arc_death_company",
    badge: "데스 컴퍼니",
    priority: 3,
    req: { allTags: ["astartes", "death_company"], anyChapters: ["blood_angels"] },
    text: "검은 분노의 문턱을 넘나들었던 날의 잔향이 핏줄에 남아 있다. 채플린의 묵묵한 시선 아래 분노를 칼끝의 규율로 벼려 냈다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_arc_inner_circle",
    badge: "이너 서클",
    priority: 3,
    req: { allTags: ["astartes", "inner_circle"], anyChapters: ["dark_angels"] },
    text: "'더 락'의 침묵 어린 비밀 회합에서 1만 년 전 칼리반의 이름을 되새겼다. 누구에게도 말할 수 없는 진실이 어깨를 짓누른다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_arc_living_miracle",
    badge: "기적의 증인",
    priority: 3,
    req: { allTags: ["living_miracle"], excludeTags: ["heretic", "custodes"] },
    text: "거리를 지날 때마다 행인들이 걸음을 멈추고 경외의 눈빛으로 아퀼라 성호를 그었다. 기대와 신앙의 무게를 묵묵히 짊어졌다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 3 }
  },
  {
    id: "ch_arc_lost_home",
    badge: "고향의 기억",
    priority: 3,
    req: { anyTags: ["cadia_stands", "baal_survivor", "tanith_survivor"], excludeTags: ["heretic"] },
    text: "밤하늘의 낯선 별자리를 올려다보며 이제는 돌아갈 수 없는 고향 행성의 이름을 조용히 읊조렸다. 슬픔은 곧 흔들리지 않는 투지가 되었다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_arc_war_vet",
    badge: "대전역 베테랑",
    priority: 3,
    req: {
      anyTags: ["vraks_veteran", "badab_veteran", "rift_survivor", "deathwatch_vet", "space_hulk_vet"],
      excludeTags: ["heretic"]
    },
    text: "전역 약장이 꽂힌 가슴을 바라보며 신병들이 경례를 올렸다. 살아남은 고참 병사의 침착한 한마디가 부대의 공포를 가라앉혔다.",
    effect: { stats: { Inf: 1, WP: 1 } }
  },

  // =========================================================================
  // 5. 2단계 서사 보강 — 노년/초장수기 · 소외 직군 · 특수 출신/자질 전용 연대기 (26종)
  // =========================================================================
  // 5-1. 노년기 · 리주버냇 · 기계화 · 초장수기 연대기 (8종)
  {
    id: "ch_s2_elder_mortal_1",
    badge: "노년기 회고",
    priority: 3,
    req: { minAge: 55, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat"] },
    text: "습한 날이면 수십 년 전 얻은 흉터와 무릎이 묵직하게 쑤신다. 그래도 은하계의 숱한 전란을 버티고 쉰다섯을 넘긴 노구로 오늘도 새벽을 맞았다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s2_elder_mortal_2",
    badge: "노년기 회고",
    priority: 3,
    req: { minAge: 60, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat"], excludeWorlds: ["krieg"] },
    text: "서툴게 경례를 올리는 어린 신참들의 얼굴에서 수십 년 전 자신의 젊은 날이 겹쳐 보였다. 말없이 어깨를 두드려 주며 생존의 요령을 일러 주었다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_s2_rejuvenat_1",
    badge: "리주버냇 장수",
    priority: 3,
    req: { minAge: 60, allTags: ["rejuvenat"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    text: "리주버냇 시술로 주름 없이 유지된 얼굴을 거울로 바라보며, 이미 노환으로 세상을 떠난 옛 동료들의 빛바랜 초상화를 서랍 깊숙이 정리했다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s2_rejuvenat_2",
    badge: "리주버냇 장수",
    priority: 3,
    req: { minAge: 75, allTags: ["rejuvenat"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    text: "정기 세포 재생 혈청을 투여받는 동안 혈관에 서늘한 감각이 번졌다. 제국의 상류층에게 수명은 신의 섭리가 아니라 권위로 사는 자산이다.",
    effect: { stats: { T: 1, Inf: 1 }, wounds: 4 }
  },
  {
    id: "ch_s2_bionic_1",
    badge: "기계 의체",
    priority: 3,
    req: { minAge: 35, allTags: ["bionic"], excludeTags: ["custodes"] },
    text: "차가운 강철 의수로 따뜻한 찻잔을 감싸 쥐었으나 온기가 전해지지 않았다. 육신이 줄어들수록 고통은 옅어지지만 인간의 감각도 함께 멀어진다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s2_bionic_2",
    badge: "기계 의체",
    priority: 3,
    req: { minAge: 45, allTags: ["bionic"], excludeTags: ["custodes"] },
    text: "성유를 바르고 관절 서보의 미세한 유격을 조율했다. 피와 살은 늙어 가지만 축성된 강철만은 묵묵히 제 몫을 다한다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s2_centenarian_1",
    badge: "백 년의 세월",
    priority: 3,
    req: {
      minAge: 100,
      or: [
        { allTags: ["astartes"] },
        { allTags: ["custodes"] },
        { allTags: ["grey_knight"] },
        { allTags: ["rejuvenat"] },
        { allTags: ["magos"] }
      ]
    },
    text: "문득 아드미니스트라툼 기록부를 확인하다 자신이 태어나던 해의 문서가 이미 고문서고 지하로 이관되었다는 사실을 알았다. 한 세기를 살아 낸 자만의 기묘한 정적이 감돌았다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s2_centenarian_2",
    badge: "불멸의 의무",
    priority: 3,
    req: { minAge: 150, anyTags: ["astartes", "custodes", "grey_knight", "dreadnought"] },
    text: "수 세대의 필멸자 총독과 장교들이 취임하고 흙으로 돌아가는 동안에도, 그대는 여전히 같은 갑주를 입고 변함없이 황제의 적을 향해 총구를 겨누고 있다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },

  // 5-2. 소외 직군 심화 일상 연대기 (9종)
  {
    id: "ch_s2_cultist_1",
    badge: "암흑 교단",
    priority: 3,
    req: { anyCareers: ["chaos_cultist"] },
    text: "하층 배수구 아래 비밀 회합에서 굶주린 공장 인부들에게 암호문을 나누어 주었다. 절망은 카오스 신들이 가장 사랑하는 거름이다.",
    effect: { stats: { Fel: 1 }, corruption: 2 }
  },
  {
    id: "ch_s2_cultist_2",
    badge: "암흑 교단",
    priority: 3,
    req: { anyCareers: ["chaos_cultist"] },
    text: "아르비테스 순찰대의 감시망을 피해 밀수 탄약과 금지된 의식 초를 지하 은신처로 옮겼다. 반란의 날은 조용히 다가오고 있다.",
    effect: { stats: { Ag: 1, Int: 1 }, corruption: 2 }
  },
  {
    id: "ch_s2_gk_1",
    badge: "그레이 나이트",
    priority: 3,
    req: { anyCareers: ["grey_knight"] },
    text: "은빛 네메시스 무기의 룬 문양을 성수로 닦아 내며 666 성가를 암송했다. 그레이 나이트의 이름은 제국 역사에 남지 않으나 악마들은 영원히 떨며 기억한다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 2 }
  },
  {
    id: "ch_s2_gk_2",
    badge: "그레이 나이트",
    priority: 3,
    req: { anyCareers: ["grey_knight"] },
    text: "타이탄의 예지실로부터 수신된 워프 징후 보고서를 판독하며 다음 악마 침공 지점으로의 텔레포트 강습을 준비했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s2_custodes_1",
    badge: "황금 근위대",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes"] },
    text: "황궁 영원의 문 앞에서 백 시간 넘게 미동도 없이 보초를 서며 고대 철학과 제국 전술사를 머릿속으로 되새겼다.",
    effect: { stats: { WP: 1, Int: 1, T: 1 } }
  },
  {
    id: "ch_s2_skitarii_1",
    badge: "스키타리",
    priority: 3,
    req: { anyCareers: ["skitarii"] },
    text: "마고스의 누스피어 텔레메트리 신호에 발걸음을 완벽히 맞추어 방사능 황무지를 쉬지 않고 40킬로미터 행군했다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s2_scion_1",
    badge: "템페스투스 사이온",
    priority: 3,
    req: { anyCareers: ["tempestus_scion"] },
    text: "핫샷 라스건의 등짐 동력 팩을 정밀 점검한 뒤, 말없이 발키리 강하 브리핑 좌표를 암기했다. 감정은 임무의 방해물일 뿐이다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_s2_psyker_1",
    badge: "생션드 사이커",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker"] },
    text: "목덜미의 사이킥 억제 고리를 점검하며 워프의 속삭임을 차단했다. 아군 병사들이 한 발 떨어져 경계하는 시선은 이미 익숙하다.",
    effect: { stats: { WP: 2 }, corruption: -1 }
  },
  {
    id: "ch_s2_priest_1",
    badge: "에클레시아키",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest"] },
    text: "향 연기가 자욱한 대성당에서 야전 출정 병사들의 라스건에 성유를 바르며 황제의 가호를 우렁차게 선포했다.",
    effect: { stats: { Fel: 1, WP: 1 }, faith: 3 }
  },

  // 5-3. 특수 출신 · 선천 자질 전용 연대기 (9종)
  {
    id: "ch_s2_navigator_1",
    badge: "나비스 노빌리테",
    priority: 3,
    req: { minAge: 14, allTags: ["navigator"] },
    text: "이마의 비단 띠 아래로 워프 조류의 미세한 흔들림이 감지되었다. 제3의 눈을 지닌 항해사 없이는 제국의 어떤 전함도 별 사이를 건널 수 없다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s2_blank_1",
    badge: "블랭크의 고독",
    priority: 3,
    req: { minAge: 12, allTags: ["blank"], excludeTags: ["astartes", "custodes"] },
    text: "복도를 지나치던 행인들이 영문도 모른 채 몸서리를 치며 벽 쪽으로 비켜섰다. 고독은 쓰라리지만, 어떤 워프의 마수도 이 공허를 뚫지 못한다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_s2_ogryn_1",
    badge: "오그린의 일상",
    priority: 3,
    req: { minAge: 14, allTags: ["ogryn"] },
    text: "커다란 손으로 립퍼 건을 정성껏 닦은 뒤 커미사르가 가르쳐 준 '황제 폐하를 위하여!'를 우렁차게 복창하며 배급 식사를 비웠다.",
    effect: { stats: { T: 1, WS: 1 }, faith: 2 }
  },
  {
    id: "ch_s2_ratling_1",
    badge: "래틀링의 일상",
    priority: 3,
    req: { minAge: 14, allTags: ["ratling"] },
    text: "주머니 깊숙이 챙겨 둔 밀수 육포를 씹으며 롱 라스 조준경 렌즈를 닦았다. 배가 든든해야 천 미터 밖 표적도 또렷이 보이는 법이다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_s2_prodigy_1",
    badge: "전술 천재",
    priority: 3,
    req: { minAge: 14, allTags: ["prodigy"] },
    text: "평범한 광장을 걸으면서도 무의식중에 교차 사격 지점과 보급 차단 경로를 머릿속으로 계산했다. 타고난 전술안은 쉬는 법이 없다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s2_saint_spark_1",
    badge: "성흔의 기질",
    priority: 3,
    req: { minAge: 14, allTags: ["saint_spark"], excludeTags: ["heretic"] },
    text: "바람이 거센 회랑을 지나는 동안에도 곁에 둔 기도 초가 꺼지지 않았다. 주위 사람들이 이유 모를 평온을 느끼며 고개를 숙였다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 3 }
  },
  {
    id: "ch_s2_rt_blood_1",
    badge: "무역 영장 혈통",
    priority: 3,
    req: { minAge: 14, allTags: ["rogue_trader_blood"], excludeTags: ["astartes", "custodes"] },
    text: "가문 서고에서 미개척 변경 성계 항해도와 고대 무역 영장 사본을 펼쳐 보며, 제국의 경계 너머로 뻗어 나갈 야망을 키웠다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_s2_mechanicus_blood_1",
    badge: "기계교 도제 혈통",
    priority: 3,
    req: { minAge: 14, allTags: ["mechanicus_blood"], excludeTags: ["astartes", "custodes"] },
    text: "주변 사람들은 시끄럽다며 인상을 찌푸리는 대형 발전기의 규칙적인 굉음이 오히려 자장가처럼 편안하게 들렸다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s2_terra_elite_1",
    badge: "테라 상류층",
    priority: 3,
    req: { minAge: 14, allTags: ["terra_elite"] },
    text: "황궁 첨탑에서 울려 퍼지는 거대한 종소리를 들으며, 은하계 중심의 명문가 혈통에 걸맞은 하이 고딕 의전과 학식을 다듬었다.",
    effect: { stats: { Inf: 1, Int: 1 } }
  },

  // =========================================================================
  // 6. 3단계 서사 보강 — M41 초중반 · 대균열 후유증 · 소외 행성 · 인간관계 연대기 (14종)
  // =========================================================================
  // 6-1. M41 초중반 시대 및 대전역 베테랑 연대기 (4종)
  {
    id: "ch_s3_macharian_vet",
    badge: "마카리우스 성전",
    priority: 3,
    req: { allTags: ["macharian_veteran"] },
    text: "서부 은하의 천 개 행성을 밟았던 마카리우스 대성전의 빛바랜 원정 훈장을 닦으며, 광활했던 변경의 별빛을 회상했다.",
    effect: { stats: { Inf: 1, WP: 1 } }
  },
  {
    id: "ch_s3_damocles_vet",
    badge: "다모클레스 성전",
    priority: 3,
    req: { allTags: ["damocles_veteran"] },
    text: "동부 변경에서 마주했던 타우 제국의 푸른 플라즈마 궤적과 배틀슈트의 기동력을 되새기며 장거리 엄폐 사격술을 보완했다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s3_era_damocles_rumor",
    badge: "동부 변경 속보",
    priority: 3,
    req: { minAge: 10, minYear: 742, maxYear: 755, excludeWorldTags: ["feral"] },
    text: "울티마 세그멘툼 끝자락에 '타우'라는 신흥 외계 종족이 나타나 다모클레스 만 성전이 출정했다는 낯선 소문이 항구 주점을 돌았다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s3_era_behemoth_shock",
    badge: "베헤모스 충격",
    priority: 3,
    req: { minAge: 10, minYear: 745, maxYear: 765, excludeWorldTags: ["feral"] },
    text: "은하 바깥에서 날아온 생체 괴수 함대가 울트라마의 심장 마크라그를 유린했다는 소식에 시민들이 전율하며 대피 훈련에 나섰다.",
    effect: { stats: { WP: 1 } }
  },

  // 6-2. 대균열(greatRift) 및 임페리움 니힐루스 후유증 일상 연대기 (3종)
  {
    id: "ch_s3_great_rift_1",
    badge: "시카트릭스 말레딕툼",
    priority: 3,
    req: { minAge: 10, greatRift: true, excludeWorldTags: ["feral"] },
    text: "밤하늘 한복판을 갈라놓은 핏빛 대균열의 빛이 창문 틈으로 스며들었다. 이제 은하의 어느 별에서도 예전 같은 고요한 밤은 돌아오지 않는다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s3_great_rift_2",
    badge: "시간 왜곡",
    priority: 3,
    req: { minAge: 14, greatRift: true, excludeWorldTags: ["feral"] },
    text: "이웃 성계에서 도착한 정기 화물선의 항해 일지가 현지 달력보다 석 달이나 앞서 있었다. 대균열 이후 제국의 시간마저 조각나고 있다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s3_nihilus_2",
    badge: "임페리움 니힐루스",
    priority: 3,
    req: { minAge: 12, greatRift: true, allTags: ["imperial_nihilus"] },
    text: "테라의 아스트로노미칸이 보이지 않는 어둠 속에서 등대 없는 항해를 이어 가는 상선 선원들을 위해 부두 성당의 종이 길게 울렸다.",
    effect: { stats: { WP: 1, T: 1 }, faith: 2 }
  },

  // 6-3. 소외 행성 4곳 일상 연대기 (4종)
  {
    id: "ch_s3_vostroya_1",
    badge: "보스트로야",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["vostroya"] },
    text: "눈보라가 몰아치는 보스트로야 공업 첨탑 아래, 황동 문양이 세공된 장자 연대의 붉은 군복 행렬이 장엄한 군악에 맞추어 행진했다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_s3_tanith_1",
    badge: "타니스",
    priority: 3,
    req: { minAge: 10, maxYear: 764, anyWorlds: ["tanith"] },
    text: "안개 낀 날우드 숲 사이로 타니스 전통 백파이프 음색이 은은히 퍼져 나갔다. 움직이는 나무들의 길을 기억하는 것은 오직 타니스인뿐이다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_s3_ophelia7_1",
    badge: "오펠리아 VII",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["ophelia7"], excludeTags: ["heretic"] },
    text: "콘벤트 상크토룸의 황금 첨탑에서 울려 퍼진 종소리에 맞추어 수십만 순례자가 일제히 무릎을 꿇고 황제 찬송가를 합창했다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },
  {
    id: "ch_s3_necromunda_1",
    badge: "네크로문다",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["necromunda"], excludeTags: ["astartes", "custodes"] },
    text: "하이브 프리무스 하층 돔의 환기구 아래에서 골리앗과 에셔 갱단의 총성이 멀리 메아리쳤다. 상인들은 태연히 셔터를 반쯤 내린 채 장사를 이어 갔다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },

  // 6-4. 인간관계 인연 일상 연대기 (3종)
  {
    id: "ch_s3_bond_comrade",
    badge: "오래된 전우",
    priority: 3,
    req: { allTags: ["bond_comrade"] },
    text: "다른 구역으로 전출 간 옛 전우에게서 구겨진 엽서 한 장이 넉 달 만에 도착했다. '아직 숨 붙어 있다'는 짧은 한 줄에 비로소 안도했다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_s3_bond_mentor",
    badge: "스승의 가르침",
    priority: 3,
    req: { allTags: ["bond_mentor"] },
    text: "까다로운 업무 앞에서 망설이던 찰나, 옛 스승이 남긴 낡은 수첩의 한 구절이 떠올라 단숨에 실마리를 풀어 냈다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s3_bond_rival",
    badge: "숙명의 정적",
    priority: 3,
    req: { allTags: ["bond_rival"] },
    text: "승진 명단과 성과표에 나란히 오른 숙명의 정적 이름을 확인하고 이를 악물었다. 저 자보다 먼저 무너질 수는 없다는 오기가 기력을 되살렸다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },

  // =========================================================================
  // 7. 4단계 (2차 서사 보강 1단계) — 네임드 20인 후일담 · 명예 태그 17종 · 초년기 · 무명 행성 (47종)
  // =========================================================================

  // 7-1. 네임드 20인 전원 조우 후일담 일상 연대기 (20종)
  {
    id: "ch_s4_met_guilliman",
    badge: "섭정의 여운",
    priority: 3,
    req: { allTags: ["met_guilliman"] },
    text: "복잡한 서류 더미 앞에서 지칠 때마다, 밤을 새워 은하의 병참표를 검토하던 로부테 길리먼의 지친 푸른 눈동자가 떠올라 다시 펜을 고쳐 잡았다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_yarrick",
    badge: "철의 눈의 기억",
    priority: 3,
    req: { allTags: ["met_yarrick"] },
    text: "사기가 흔들리는 참호 끝에서 커미사르 세바스찬 야릭의 불굴의 연설을 회상했다. 철의 눈이 지켜본다는 생각만으로 병사들의 어깨가 곧추섰다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_s4_met_creed",
    badge: "카디아의 전술가",
    priority: 3,
    req: { allTags: ["met_creed"] },
    text: "작전 지도 위에서 막다른 길에 몰릴 때마다, 짙은 시가 연기 너머로 판을 뒤집던 우르사카르 E. 크리드의 냉철한 시선을 떠올리며 돌파구를 찾았다.",
    effect: { stats: { Int: 1, BS: 1 } }
  },
  {
    id: "ch_s4_met_gaunt",
    badge: "유령들의 기억",
    priority: 3,
    req: { allTags: ["met_gaunt"] },
    text: "모닥불 옆에서 들려오던 이브람 건트와 타니스 퍼스트 앤드 온리의 백파이프 선율이 문득 귓가에 맴돌았다. 부하를 끝까지 포기하지 않던 그의 등 뒤를 잊지 못했다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_cain",
    badge: "타나 차의 여운",
    priority: 3,
    req: { allTags: ["met_cain"] },
    text: "후일 전해 들은 소문에 따르면 카이아파스 케인의 회고록 초고 각주에 그대와 스쳤던 전선 이야기가 유쾌하게 실렸다고 한다. 씁쓸한 미소와 함께 따뜻한 차를 마셨다.",
    effect: { stats: { Fel: 1, Ag: 1 } }
  },
  {
    id: "ch_s4_met_dante",
    badge: "천오백 년의 무게",
    priority: 3,
    req: { allTags: ["met_dante"] },
    text: "황금 데스 마스크 너머로 천오백 년의 피로를 짊어지고도 끝내 검을 내려놓지 않던 사령관 단테의 모습을 떠올리며 고단한 의무를 묵묵히 이어 갔다.",
    effect: { stats: { WP: 2 }, faith: 1 }
  },
  {
    id: "ch_s4_met_cawl",
    badge: "대현자의 기묘한 잔향",
    priority: 3,
    req: { allTags: ["met_cawl"] },
    text: "기계장치를 다룰 때마다 다성(多聲) 음성으로 천 년 전 농담을 내뱉던 아크마고스 벨리사리우스 카울의 기괴한 천재성이 불현듯 스쳐 지나갔다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s4_met_grimnar",
    badge: "늙은 늑대의 포효",
    priority: 3,
    req: { allTags: ["met_grimnar"] },
    text: "모르카이의 도끼를 휘두르며 적진을 갈라 버리던 그레이트 울프 로간 그림나르의 호쾌한 웃음소리가 겨울바람 속에서 문득 되살아났다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s4_met_calgar",
    badge: "울트라마르의 철권",
    priority: 3,
    req: { allTags: ["met_calgar"] },
    text: "포화 속에서도 흔들리지 않던 마르네우스 칼가의 위엄을 떠올리며, 오늘도 무질서한 전선에 《코덱스》 같은 단정한 규율을 세웠다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_met_celestine",
    badge: "황금 날개의 잔광",
    priority: 3,
    req: { allTags: ["met_celestine"] },
    text: "칠흑 같은 어둠을 가르며 강림했던 살아 있는 성녀 셀레스틴의 눈부신 빛을 떠올리자, 가슴속 의심과 워프의 냉기가 깨끗이 씻겨 내려갔다.",
    effect: { stats: { WP: 1 }, faith: 3, corruption: -2 }
  },
  {
    id: "ch_s4_met_eisenhorn",
    badge: "그림자 심판자의 흔적",
    priority: 3,
    req: { allTags: ["met_eisenhorn"] },
    text: "이단심문관 그레고르 아이젠혼이 남긴 '인내와 의심은 생존의 두 기둥'이라는 차가운 충고가 오늘도 수상한 거래를 단번에 간파하게 해 주었다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_marbo",
    badge: "밀림의 유령",
    priority: 3,
    req: { allTags: ["met_marbo"] },
    text: "누구에게도 슬라이 마보를 직접 보았다고 말해도 믿어 주지 않지만, 숲 그림자가 일렁일 때마다 그의 침묵과 단검의 기척을 잊을 수 없다.",
    effect: { stats: { Ag: 1, WS: 1 } }
  },
  {
    id: "ch_s4_met_valoris",
    badge: "황금 옥좌의 위엄",
    priority: 3,
    req: { allTags: ["met_valoris"] },
    text: "와처스 액스를 쥐고 서 있던 트라얀 발로리스의 압도적인 고요함을 겪고 난 뒤, 웬만한 귀족이나 장군의 호통에는 눈 하나 깜짝하지 않게 되었다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_met_tushan",
    badge: "불꽃 속의 온기",
    priority: 3,
    req: { allTags: ["met_tushan"] },
    text: "숯처럼 검은 피부 너머로 필멸자 피난민의 손을 정중히 잡아 주던 투샨의 모습을 기억하며, 아무리 잔혹한 제국 안에서도 지켜야 할 인간미를 되새겼다.",
    effect: { stats: { Fel: 1, T: 1 }, faith: 1 }
  },
  {
    id: "ch_s4_met_ghazghkull",
    badge: "와아아의 잔향",
    priority: 3,
    req: { allTags: ["met_ghazghkull"] },
    text: "멀리서 천둥소리만 울려도 가즈쿨 막 우룩 스라카의 짐승 같은 포효가 귓가에 되살아나 무의식중에 무기 손잡이를 꽉 쥐게 된다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s4_met_abaddon",
    badge: "검은 군단의 악몽",
    priority: 3,
    req: { allTags: ["met_abaddon"] },
    text: "약탈자 아바돈의 황금빛 눈동자와 드라크니옌의 비명을 기억하는 자는 밤의 침묵조차 쉽게 믿지 못한다. 악몽을 밀어내며 새벽까지 무구를 손질했다.",
    effect: { stats: { WP: 1, WS: 1 } }
  },
  {
    id: "ch_s4_met_lion",
    badge: "숲에서 돌아온 사자",
    priority: 3,
    req: { allTags: ["met_lion"] },
    text: "안개 속에서 황제의 방패를 들고 나타나던 라이온 엘 존슨의 말없는 위엄이 떠올랐다. 칠흑 같은 암흑 제국에도 아직 사자의 발톱이 살아 있음을 믿는다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 1 }
  },
  {
    id: "ch_s4_met_amberley_vail",
    badge: "각주 너머의 시선",
    priority: 3,
    req: { allTags: ["met_amberley_vail"] },
    text: "공식 문서의 행간을 읽어 내던 이단심문관 앰벌리 베일의 날카로운 유머를 떠올리며, 상부 포고령의 숨은 속내를 단박에 짚어 냈다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s4_met_grimaldus",
    badge: "헬스리치의 메아리",
    priority: 3,
    req: { allTags: ["met_grimaldus"] },
    text: "잿더미 속에서 '나는 헬스리치에 있었노라'고 외치던 수석 채플린 메렉 그리말두스의 웅변이 귓가에 울려 퍼지며 쓰러지려던 의지를 일으켜 세웠다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s4_met_azrael",
    badge: "사자의 투구와 침묵",
    priority: 3,
    req: { allTags: ["met_azrael"] },
    text: "더 락의 어두운 회랑에서 마주한 슈프림 그랜드 마스터 아즈라엘의 깊은 침묵을 떠올렸다. 어떤 진실은 끝까지 입을 다무는 것이 충성임을 안다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },

  // 7-2. 미회수 챕터 · 직책 · 전역 명예 태그 17종 일상 연대기 (17종)
  {
    id: "ch_s4_tag_emperors_champion",
    badge: "황제의 투사",
    priority: 3,
    req: { allTags: ["emperors_champion"] },
    text: "검은 검의 칼날에 성유를 바르며 밤새 무릎 꿇고 기도했다. 황제의 계시가 내린 투사에게 두려움이란 존재하지 않는다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s4_tag_wolf_guard",
    badge: "울프 가드",
    priority: 3,
    req: { allTags: ["wolf_guard"] },
    text: "울프 가드의 털가죽 망토를 여미며 대중대 형제들과 사냥의 노래를 나눴다. 다음 원정에서도 가장 앞줄은 우리의 몫이다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s4_tag_huscarl_oath",
    badge: "후스카를",
    priority: 3,
    req: { allTags: ["huscarl_oath"] },
    text: "요새 성벽의 미세한 균열 하나까지 손끝으로 점검하며 후스카를의 서약을 되새겼다. 우리가 서 있는 한 이 성문은 열리지 않는다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s4_tag_promethean_smith",
    badge: "프로메테안 장인",
    priority: 3,
    req: { allTags: ["promethean_smith"] },
    text: "전투가 없는 밤이면 대장간 모루 앞에서 형제들의 볼터와 갑주를 손수 벼렸다. 불길 속에서 단련된 무구는 결코 주인을 배신하지 않는다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s4_tag_shadow_master",
    badge: "그림자 마스터",
    priority: 3,
    req: { allTags: ["shadow_master"] },
    text: "발소리 한 점 없이 초소 그림자 사이를 스쳐 지나갔다. 적이 그대의 존재를 깨달았을 때는 이미 전투가 끝난 뒤다.",
    effect: { stats: { Ag: 2 } }
  },
  {
    id: "ch_s4_tag_khan_rider",
    badge: "칸의 기수",
    priority: 3,
    req: { allTags: ["khan_rider"] },
    text: "질주하는 엔진 굉음과 얼굴을 때리는 거센 맞바람 속에서 초고리스 초원의 자유를 느꼈다. 멈추는 순간이 곧 죽음이다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_s4_tag_ultramar_scholar",
    badge: "울트라마르 학자",
    priority: 3,
    req: { allTags: ["ultramar_scholar"] },
    text: "군사 교본과 행정 법전을 나란히 펼쳐 두고 성계 보급 효율을 다듬었다. 칼만큼이나 정교한 장부가 제국을 지탱한다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_tag_librarius_trained",
    badge: "라이브러리우스",
    priority: 3,
    req: { allTags: ["librarius_trained"] },
    text: "사이킥 후드의 수정 회로가 푸르게 맥동하는 가운데 워프의 변동을 감시했다. 지식과 절제가 없다면 힘은 곧 파멸이다.",
    effect: { stats: { WP: 1, Int: 1 }, corruption: -1 }
  },
  {
    id: "ch_s4_tag_chapter_serf",
    badge: "챕터 서프",
    priority: 3,
    req: {
      allTags: ["chapter_serf"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "거대한 파워 아머의 세라마이트 장갑판에서 탄흔을 닦아 내며 묵묵히 소임을 다했다. 아스타르테스의 승리는 이름 없는 서프들의 손끝에서 시작된다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s4_tag_krieg_grenadier",
    badge: "크리그 척탄병",
    priority: 3,
    req: { allTags: ["krieg_grenadier"] },
    text: "해골 문양이 새겨진 방독면 여과기와 지옥불 라스건 배터리를 말없이 점검했다. 돌격 호각이 울리면 가장 먼저 철조망을 넘을 뿐이다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s4_tag_catachan_blooded",
    badge: "카타찬의 피",
    priority: 3,
    req: { allTags: ["catachan_blooded"] },
    text: "습한 공기 냄새와 꺾인 나뭇가지 하나로 매복 지점을 단박에 간파했다. 카타찬 밀림에서 살아남은 자에게 낯선 전장은 없다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  {
    id: "ch_s4_tag_fenris_blood",
    badge: "펜리스의 혈통",
    priority: 3,
    req: { allTags: ["fenris_blood"] },
    text: "매서운 추위가 뼈를 에어도 외투 한 벌 걸치지 않은 채 웃어넘겼다. 펜리스의 빙해가 벼려 낸 피는 쉽게 식지 않는다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_s4_tag_daemon_bane",
    badge: "악마 살해자",
    priority: 3,
    req: { allTags: ["daemon_bane"] },
    text: "워프의 냉기가 스며드는 밤에도 그대가 지나가면 어둠 속 속삭임이 먼저 물러났다. 악마의 피를 묻혀 본 의지는 결코 흔들리지 않는다.",
    effect: { stats: { WP: 1 }, faith: 2, corruption: -2 }
  },
  {
    id: "ch_s4_tag_rift_touched",
    badge: "대균열 감응자",
    priority: 3,
    req: { allTags: ["rift_touched"] },
    text: "시카트릭스 말레딕툼이 맥동하는 밤이면 관자놀이가 서늘하게 울린다. 멀리 떨어진 성계의 조난 신호 같은 기묘한 예감이 스쳐 지나갔다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s4_tag_vigilus_veteran",
    badge: "비질루스 참전",
    priority: 3,
    req: { allTags: ["vigilus_veteran"] },
    text: "나흐문드 회랑의 잿빛 먼지가 아직도 군장 주름에 남아 있다. 비질루스의 생지옥을 통과한 베테랑의 눈빛에 신병들이 절로 옷깃을 여몄다.",
    effect: { stats: { T: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_tag_tyranic_war_vet",
    badge: "4차 타이라니드 전쟁",
    priority: 3,
    req: { allTags: ["tyranic_war_vet"] },
    text: "바스티오르 서브섹터에서 마주했던 끝없는 키틴질 파도를 떠올리며 산성 방호구와 화염 탄약을 한 번 더 꼼꼼히 점검했다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_s4_tag_tyrannic_veteran",
    badge: "타이라니드 베테랑",
    priority: 3,
    req: { allTags: ["tyrannic_veteran"] },
    text: "하이브 함대의 시냅스 지휘 체계를 끊어 냈던 경험을 후배 병사들에게 전수했다. 거대한 포식자를 꺾는 법은 머리부터 자르는 것이다.",
    effect: { stats: { Int: 1, BS: 1 } }
  },

  // 7-3. 14~22세 초년기 일상 연대기 (4종)
  {
    id: "ch_s4_youth_first_pay",
    badge: "초년기 급료",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"]
    },
    text: "어른 몫의 첫 주간 배급표와 낡은 제국 동전 몇 닢을 손에 쥐었다. 닳아 버린 손바닥의 굳은살이 비로소 제국의 톱니바퀴가 되었음을 일깨운다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_s4_youth_military_boots",
    badge: "신병 시절",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["pdf_trooper", "astra_militarum", "tempestus_scion"],
      excludeWorlds: ["krieg"]
    },
    text: "발에 맞지 않는 새 보급 군화 때문에 뒤꿈치가 벗겨졌지만 행군 대열에서 낙오할 수는 없었다. 고참의 욕설 사이로 라스건 분해 조립이 서서히 손에 익어 간다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s4_youth_mechanicus_chant",
    badge: "수습 기계교도",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["skitarii", "tech_priest"]
    },
    text: "이진법 찬가를 읊으며 거대한 톱니바퀴 축에 성유를 바르는 손길이 이제 제법 매끄러워졌다. 기계령의 규칙적인 박동이 심장 박동보다 편안하게 느껴진다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s4_youth_imperial_bureau",
    badge: "수습 공직자",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["administratum", "arbites", "ecclesiarchy_priest"]
    },
    text: "끝없이 쌓인 양피지 더미와 법전 조항을 밤늦도록 외우며 제국의 거대한 율법을 몸에 새겼다. 작은 도장 하나가 수천 명의 운명을 가른다는 사실을 깨달았다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },

  // 7-4. 무명 행성 6종 생활밀착 일상 연대기 (6종)
  {
    id: "ch_s4_world_agri_harvest",
    badge: "농업 행성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["agri"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "지평선 끝까지 펼쳐진 유전자 개량 곡물밭 위로 거대한 자동 수확기가 굉음을 내며 지나갔다. 올해 거둔 곡식은 곧 이름 모를 성계의 하이브 수십 곳을 먹여 살릴 것이다.",
    effect: { stats: { T: 2 } }
  },
  {
    id: "ch_s4_world_paradise_mask",
    badge: "낙원 행성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["paradise"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "외지 귀족들이 샴페인을 기울이는 대리석 테라스 아래, 하인 통로에서는 땀에 젖은 일꾼들이 쉴 새 없이 얼음과 화환을 나르고 있었다.",
    effect: { stats: { Fel: 1, Ag: 1 } }
  },
  {
    id: "ch_s4_world_feral_stars",
    badge: "야만 행성",
    priority: 3,
    req: {
      minAge: 12,
      anyWorldTags: ["feral"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "모닥불 연기가 밤하늘로 흩어지는 사이, 별들 사이를 천천히 가로지르는 '하늘의 철선' 불빛을 바라보며 부족 아이들이 경외의 숨을 삼켰다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_s4_world_hive_smog",
    badge: "하이브 월드",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["hive"],
      excludeWorlds: ["terra", "krieg"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "수 킬로미터 위 첨탑에서 내려다보이는 하늘은 평생 본 적이 없지만, 중층 환기구에서 떨어지는 노란 산성 이슬 냄새만으로도 오늘 교대 시각을 알 수 있다.",
    effect: { stats: { T: 1, Ag: 1 } }
  },
  {
    id: "ch_s4_world_civilised_parade",
    badge: "문명 행성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["civilised"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "광장 시계탑 아래에서 행성 방위군 행렬과 제국 성가대 행진이 지나갔다. 먼 은하의 전쟁 소식은 아직 전보 속 활자로만 머물러 있다.",
    effect: { stats: { Fel: 1, Int: 1 } }
  },
  {
    id: "ch_s4_world_voidborn_bell",
    badge: "보이드본",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["voidborn"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "선체 외벽을 스치는 미세 운석의 금속성 울림과 인공 중력 발전기의 규칙적인 진동 속에서 잠이 들었다. 행성 땅바닥보다 철판 갑판이 훨씬 안심된다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },

  // =========================================================================
  // 8. 5단계 (2차 서사 보강 2단계) — 가족·후계자 · 삶의 초점 2막 · 외계/배신자 균형 (21종)
  // =========================================================================

  // 8-1. 필멸자 가족 · 후계자 일상 연대기 (3종)
  {
    id: "ch_s5_bond_family_1",
    badge: "등불 아래 가정",
    priority: 3,
    req: {
      allTags: ["bond_family"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "고된 일과를 마치고 돌아온 저녁, 배우자가 끓여 놓은 따뜻한 합성 수프 한 그릇 앞에서 모처럼 갑옷과 긴장을 내려놓았다.",
    effect: { stats: { WP: 1, Fel: 1 }, wounds: 3 }
  },
  {
    id: "ch_s5_bond_heir_1",
    badge: "다음 세대",
    priority: 3,
    req: {
      allTags: ["bond_heir"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "자녀가 보낸 삐뚤빼뚤한 첫 안부 편지를 지갑 깊숙이 접어 넣었다. 어두운 은하에서도 살아야 할 이유가 한 줄 더 늘었다.",
    effect: { stats: { WP: 2 }, faith: 1 }
  },
  {
    id: "ch_s5_bond_mortal_contrast",
    badge: "필멸자의 무게",
    priority: 3,
    req: {
      minAge: 35,
      anyTags: ["bond_family", "bond_heir"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "전선 너머로 포성이 울릴 때마다 집에 남겨 둔 식구들의 얼굴이 떠올라 두려웠지만, 바로 그 두려움이 그대를 끝까지 살아남게 만들었다.",
    effect: { stats: { T: 1, WP: 1 } }
  },

  // 8-2. 삶의 초점(anyFocus) 2막 일상 연대기 (6종)
  {
    id: "ch_s5_focus_survival_2",
    badge: "생존 전문가",
    priority: 3,
    req: { minAge: 30, anyFocus: ["survival"] },
    text: "오랜 보양과 절제 덕분에 동기들이 하나둘 앓아눕는 계절에도 끄떡없이 버텨 냈다. 제국에서 가장 귀한 재산은 끝내 버티는 육신이다.",
    effect: { stats: { T: 2 }, wounds: 3 }
  },
  {
    id: "ch_s5_focus_combat_2",
    badge: "무예의 경지",
    priority: 3,
    req: { minAge: 30, anyFocus: ["combat"] },
    text: "수만 번 반복한 사격과 검술의 궤적이 이제는 생각보다 몸이 먼저 반응하는 경지에 이르렀다. 연병장의 신병들이 경외의 눈으로 동작을 훔쳐보았다.",
    effect: { stats: { WS: 1, BS: 1 } }
  },
  {
    id: "ch_s5_focus_faith_2",
    badge: "깊어지는 신앙",
    priority: 3,
    req: {
      minAge: 30,
      anyFocus: ["faith"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    text: "새벽 종소리에 맞추어 올리는 묵상 기도가 이제는 흔들림 없는 마음의 성채가 되었다. 어떤 불길한 속삭임도 문턱을 넘지 못한다.",
    effect: { stats: { WP: 1 }, faith: 3, corruption: -2 }
  },
  {
    id: "ch_s5_focus_lore_2",
    badge: "학문의 깊이",
    priority: 3,
    req: { minAge: 30, anyFocus: ["lore"] },
    text: "고대 고딕어 주석서와 기계 정비 도면을 나란히 해독하며 남들이 지나치는 숨은 결함을 단숨에 찾아냈다. 지식은 조용하지만 가장 날카로운 검이다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s5_focus_politics_2",
    badge: "권력의 맥박",
    priority: 3,
    req: {
      minAge: 30,
      anyFocus: ["politics"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "만찬장의 사소한 자리 배치와 총독 서기의 안색만 보고도 다음 분기 권력 구도의 변동을 정확히 읽어 냈다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_s5_focus_forbidden_2",
    badge: "심연의 경계",
    priority: 3,
    req: { minAge: 25, anyFocus: ["forbidden"] },
    text: "등불을 낮춘 채 금서의 암호를 풀다 문득 창밖의 그림자가 두 개로 갈라지는 환영을 보았다. 진실의 대가는 언제나 영혼의 가장자리를 깎아 먹는다.",
    effect: { stats: { Int: 2 }, corruption: 2 }
  },

  // 8-3. 외계(Xenos) & 카오스 배신자 군단 일상 연대기 (12종)
  {
    id: "ch_s5_xenos_tau_1",
    badge: "동부 변경",
    priority: 3,
    req: { minAge: 14, anySegmenta: ["ultima"], excludeWorldTags: ["feral"] },
    text: "동부 변경 부두에서 타우 제국의 선전 전단지가 밀수 상자 속에 섞여 발견되었다. 아르비테스 단속반이 즉시 모든 종이를 화염으로 소각했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_xenos_tau_2",
    badge: "타우 경계령",
    priority: 3,
    req: {
      minAge: 16,
      or: [{ anySegmenta: ["ultima"] }, { allTags: ["damocles_veteran"] }]
    },
    text: "사격 교범 여백에 적힌 '외계인의 푸른 펄스 광선이 보이면 즉시 지근거리 엄폐물로 파고들라'는 다모클레스 참전병의 경고를 되새겼다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s5_xenos_drukhari_1",
    badge: "어둠의 약탈자",
    priority: 3,
    req: { minAge: 14, excludeWorlds: ["terra", "mars"] },
    text: "이웃 행성의 해안 도시 주민 수만 명이 단 하룻밤 만에 시신 한 구 남기지 않고 사라졌다는 전보가 돌았다. 선원들은 낮게 '코모라의 어둠'이라 속삭였다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },
  {
    id: "ch_s5_xenos_drukhari_2",
    badge: "밤의 경계",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"] },
    text: "드루카리 약탈선 경보가 한 차례 스쳐 지나간 뒤로, 구역 주민들 모두가 밤마다 베개 밑에 단검과 마지막 탄환 한 발을 숨겨 두고 잠들었다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_s5_xenos_aeldari_1",
    badge: "유령 함선",
    priority: 3,
    req: { minAge: 14, excludeWorlds: ["terra", "mars"], excludeWorldTags: ["feral"] },
    text: "궤도 감시망에 가늘고 우아한 아엘다리 함선 실루엣이 잠시 스쳤다가 흔적도 없이 사라졌다. 해군 장교들은 저들이 나타난 성계엔 반드시 큰 피바람이 분다며 긴장했다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_s5_xenos_aeldari_2",
    badge: "크래프트월드 소문",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"] },
    text: "오래된 순례자 선술집에서 아엘다리 할리퀸 극단의 기묘한 가면을 보았다는 선원의 허풍을 들으며, 은하의 오래된 종족들이 품은 수수께끼를 떠올렸다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_xenos_necron_1",
    badge: "잠든 금속",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"] },
    text: "인접 광산 행성의 지하 깊숙한 곳에서 에메랄드빛으로 맥동하는 정체불명의 검은 석비가 발견되어 기계교가 즉시 전역 출입을 봉쇄했다는 소식이 전해졌다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_xenos_votann_1",
    badge: "보탄 상단 소문",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "krieg"], excludeWorldTags: ["feral"] },
    text: "은하 핵 변경에서 돌아온 상선 선장이 보탄 연맹의 중장갑 킨 탐사대와 희귀 광물을 교환한 일화를 조용히 들려주었다. 제국 바깥에도 여전히 굳건한 세력이 숨 쉬고 있다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s5_traitor_dg",
    badge: "역병 경계",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra"] },
    text: "인근 성계에서 데스 가드 함대의 흔적이 포착되었다는 경보와 함께, 도시 전역의 방독면 필터와 방역 소독제 배급이 일제히 강화되었다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_s5_traitor_al",
    badge: "이중 첩자 경계",
    priority: 3,
    req: { minAge: 16, excludeWorldTags: ["feral"] },
    text: "사령부 암호가 하루가 멀다 하고 교체되며 '누구도 쉽게 믿지 말라'는 방첩 회람이 내려왔다. 알파 리전의 그림자가 성역 어딘가에 스며들었다는 소문이 파다하다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_traitor_nl",
    badge: "공포의 야간 경보",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"] },
    text: "복스 채널에 정체불명의 잡음과 비명이 잠시 섞여 들리자 고참 병사들이 얼굴을 굳히며 즉시 전 구역 탐조등 점등을 요청했다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_s5_traitor_ts",
    badge: "푸른 불꽃의 경고",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra"] },
    text: "성당 사제가 미사 도중 '시간을 왜곡하고 푸른 불꽃을 부리는 먼지 군단의 마법을 경계하라'며 신도들에게 순결한 정신을 당부했다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },

  // =========================================================================
  // 9. 6단계 (2차 서사 보강 3단계) — 성별·침묵의 자매들 · 소외 행성 · 챕터 숙원 · 시대 (14종)
  // =========================================================================

  // 9-1. 성별 · 침묵의 자매들 · 소로리타스 일상 연대기 (4종)
  {
    id: "ch_s6_sister_of_silence",
    badge: "침묵의 서약",
    priority: 3,
    req: { allTags: ["sister_of_silence"] },
    text: "단 한 마디 음성도 내지 않은 채 수화만으로 검은 함선 수송 구역의 경계를 교대했다. 그대가 지나는 회랑마다 갇힌 사이커들의 비명이 신기할 만큼 잠잠해진다.",
    effect: { stats: { WP: 1, WS: 1 }, corruption: -2 }
  },
  {
    id: "ch_s6_sororitas_order",
    badge: "전투 수녀회",
    priority: 3,
    req: {
      minAge: 16,
      gender: "female",
      anyCareers: ["adepta_sororitas", "canoness"]
    },
    text: "볼터와 화염방사기에 성유를 바르며 자매들과 나란히 성가를 합창했다. 순교자들의 깃발 아래서 두려움은 재로 타 버린다.",
    effect: { stats: { BS: 1, WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s6_gender_frontline",
    badge: "전선의 평등",
    priority: 3,
    req: {
      minAge: 16,
      gender: "female",
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_officer", "commissar", "arbites", "imperial_navy"],
      excludeWorlds: ["krieg"]
    },
    text: "진흙 묻은 전투화를 털어 내며 탄창을 정비했다. 제국의 전장에서는 오직 실력과 충성만이 계급장을 증명한다.",
    effect: { stats: { BS: 1, T: 1 } }
  },
  {
    id: "ch_s6_blank_female_hush",
    badge: "공백의 여인",
    priority: 3,
    req: {
      minAge: 14,
      gender: "female",
      allTags: ["blank"],
      excludeTags: ["sister_of_silence"]
    },
    text: "시장 골목을 지날 때마다 주변 사람들이 이유도 모른 채 몸을 움츠리며 길을 비켰다. 문득 궤도를 떠도는 검은 함선의 소문이 떠올랐다.",
    effect: { stats: { WP: 2 }, corruption: -1 }
  },

  // 9-2. 화성 · 마크라그 · 녹턴 심화 일상 연대기 (3종)
  {
    id: "ch_s6_world_mars_1",
    badge: "붉은 행성 화성",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["mars"] },
    text: "붉은 모래폭풍 너머 올림푸스 몬스의 거대한 포지 첨탑에서 수천 개의 용광로 연기가 솟아올랐다. 화성의 심장은 1만 년째 단 한 순간도 쉬지 않는다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s6_world_macragge_1",
    badge: "울트라마르의 수도",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["macragge"] },
    text: "마크라그의 정갈한 대리석 대로와 시계처럼 정확히 굴러가는 대중 보급선을 바라보며, 이 질서가 제국 전체로 퍼지길 바랐던 프라이마크의 꿈을 떠올렸다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s6_world_nocturne_1",
    badge: "화산의 땅 녹턴",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["nocturne"] },
    text: "용암 강 너머로 붉은 노을이 지는 저녁, 성채 마을 대장간마다 쇠를 두드리는 망치 소리가 리듬처럼 울려 퍼졌다.",
    effect: { stats: { T: 1, Int: 1 } }
  },

  // 9-3. 챕터 간 숙원 · 공조 일상 연대기 (4종)
  {
    id: "ch_s6_chap_da_sw",
    badge: "사자와 늑대",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["dark_angels", "space_wolves"] },
    text: "형제들과 무기를 손질하다 라이온과 러스의 옛 명예 결투 이야기가 나오자, 모두가 은근한 자부심 속에 검자루를 꽉 쥐었다.",
    effect: { stats: { WS: 2 } }
  },
  {
    id: "ch_s6_chap_um_bt",
    badge: "교리와 성전",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["ultramarines", "black_templars"] },
    text: "합동 전선의 보고서를 훑어보며 《코덱스》의 규율과 끝없는 성전의 열정 가운데 무엇이 더 많은 적을 베는지 조용히 자문했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s6_chap_sal_ba_if",
    badge: "인류의 방패",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["salamanders", "imperial_fists", "blood_angels"] },
    text: "전투가 끝난 폐허에서 떨고 있던 필멸자 아이가 조심스레 내민 꽃 한 송이를 바라보며, 죽음의 천사가 지켜야 할 진짜 의미를 되새겼다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s6_chap_rg_ws",
    badge: "그림자와 폭풍",
    priority: 3,
    req: { allTags: ["astartes"], anyChapters: ["raven_guard", "white_scars"] },
    text: "정면 대결 대신 적의 보급선과 지휘부만 정확히 끊어 낸 기동전 기록을 되짚으며 다음 타격 항로를 점검했다.",
    effect: { stats: { Ag: 2 } }
  },

  // 9-4. 신규 역사 대사건 시대 일상 연대기 (3종)
  {
    id: "ch_s6_era_columnus",
    badge: "콜룸누스 전황",
    priority: 3,
    req: { minAge: 14, minYear: 260, maxYear: 275, excludeWorldTags: ["feral"] },
    text: "콜룸누스 포지 월드에서 벌어진 오크 '위어드와아아!'와의 혈전 소식이 전해지며, 성계 전역의 무기 생산 할당량이 긴급 상향되었다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s6_era_kraken",
    badge: "크라켄의 공포",
    priority: 3,
    req: { minAge: 14, minYear: 992, maxYear: 997, excludeWorldTags: ["feral"] },
    text: "동부 변경을 수많은 촉수로 집어삼킨 하이브 함대 크라켄의 참극이 아스트로패스 속보로 퍼지며, 밤하늘의 유성만 봐도 시민들이 소스라치게 놀랐다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_s6_era_arks_of_omen",
    badge: "사자 귀환의 소문",
    priority: 3,
    req: { minAge: 14, minYear: 1020, excludeWorldTags: ["feral"] },
    text: "징조의 방주 함대가 은하를 공포에 몰아넣는 와중에도, 안개 속에서 제1군단의 프라이마크가 돌아왔다는 소문이 암흑 속 등불처럼 퍼져 나갔다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  }
);
