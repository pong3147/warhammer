// 일상 연대기 — 27개 제국/타락 직군 및 계급별 정밀 일상
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
  {
    id: "ch_job_menial_1",
    badge: "매뉴팩토룸 부조리",
    priority: 3,
    req: { anyCareers: ["menial_worker", "guild_artisan"] },
    text: "16시간 교대 근무 중 옆자리 노동자의 팔이 유압 프레스에 빨려 들어갔다. 감독관은 즉시 외쳤다. '생산 라인 멈추지 마라! 성스러운 기계령에 피가 튀지 않았는지부터 확인해!'",
    effect: { stats: { T: 1 }, wounds: -4, faith: -2 }
  },
  {
    id: "ch_job_menial_2",
    badge: "노동자의 일상",
    priority: 3,
    req: { anyCareers: ["menial_worker", "guild_artisan"] },
    text: "휴일 없는 연속 교대 끝에 할당량을 102% 달성했다. 포상으로 '황제 폐하께서 그대의 수고를 기억하신다'는 종이쪽지 한 장과 5분 추가 휴식을 받았다.",
    effect: { stats: { WP: 1 }, wounds: -2 }
  },
  {
    id: "ch_job_menial_3",
    badge: "서비터의 눈동자",
    priority: 3,
    req: { anyCareers: ["menial_worker", "underhive_ganger"] },
    text: "공장 입구 문을 여닫는 서비터의 텅 빈 눈동자에서 지난겨울 작업 거부로 잡혀간 이웃의 얼굴을 본 것 같았다. 서둘러 시선을 내리고 일터로 뛰어들어갔다.",
    effect: { stats: { WP: 1 }, faith: -1 }
  },
  {
    id: "ch_job_ganger_1",
    badge: "언더하이브 생존",
    priority: 3,
    req: { anyCareers: ["underhive_ganger", "underhive_boss", "hive_crime_lord"] },
    text: "암시장에서 유통기한이 80년 지난 군용 합성 육포와 녹슨 스터브 권총 탄환을 맞바꾸었다. 하층 구역에선 탄환이 화폐보다 신용도가 높다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_job_pdf_1",
    badge: "행성 방위군",
    priority: 3,
    req: { anyCareers: ["pdf_trooper"] },
    text: "총독 관저 외곽을 보초 서며 낡은 오토건을 닦았다. 귀족 영식들이 술에 취해 정원 조각상에 총을 쏘며 놀았지만, 제국법상 경비병은 눈을 감고 있어야 했다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_job_guard_1",
    badge: "보병 입문서 부조리",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"] },
    text: "군장 검사에서 《제국 보병 입문서》를 잠깐 못 찾은 분대원이 현장에서 채찍 30대를 맞았다. 입문서에는 '오크는 겁쟁이이며 라스건 한 발에 쓰러진다'고 적혀 있었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_job_guard_2",
    badge: "병참 오배송",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"] },
    text: "아드미니스트라툼의 착오로 혹한 행성에 사막용 반바지와 전부 왼쪽 발뿐인 군화가 보급되었다. 항의한 병장은 '제국 물자 모독죄'로 영창에 갇혔다.",
    effect: { stats: { T: 1 }, wounds: -3 }
  },
  {
    id: "ch_job_guard_3",
    badge: "15시간 생존율",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"] },
    text: "진흙 참호 속에서 식은 레이션을 씹으며 신병들에게 '포탄이 떨어지면 기도보다 구덩이에 코 박는 게 빠르다'고 속삭여 주었다. 평균 생존 시간 15시간의 전선에서 또 한 해를 넘겼다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_job_officer_1",
    badge: "장교의 산수",
    priority: 3,
    req: { anyCareers: ["militarum_officer", "militarum_general", "warmaster", "lord_commander_militant"] },
    text: "상부 참모부에서 '보병 2개 대대를 소모하면 화력 지원 탄약을 12% 절약할 수 있다'는 공문이 내려왔다. 이 제국에서 포탄은 비싸고 인간의 생명은 공짜다.",
    effect: { stats: { Int: 1, Inf: 1 }, faith: -2 }
  },
  {
    id: "ch_job_scion_1",
    badge: "템페스투스 사이온",
    priority: 3,
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
    text: "발키리 수송기에서 적 방공망 한복판으로 무음 강하해 적 지휘관을 4분 만에 암살하고 복귀했다. 작전 보고서에는 '일상적 정화' 단 네 글자만 적혔다.",
    effect: { stats: { BS: 1, Ag: 1, Inf: 1 } }
  },
  {
    id: "ch_job_commissar_1",
    badge: "커미사르의 고독",
    priority: 3,
    req: { anyCareers: ["commissar_cadet", "commissar", "lord_commissar", "commissar_general"] },
    text: "장교 식당에 들어서자 웃고 떠들던 위관들이 일제히 입을 다물고 꼿꼿이 자세를 고쳤다. 공포가 규율을 세우지만, 등 뒤의 '아군 오사'를 늘 경계해야 한다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_commissar_2",
    badge: "철의 군기",
    priority: 3,
    req: { anyCareers: ["commissar_cadet", "commissar", "lord_commissar", "commissar_general"] },
    text: "보급창고에서 아마섹 술을 훔쳐 마신 병참 하사관에게 즉석 군법회의를 열었다. 볼트 피스톨 안전장치를 푸는 소리만으로 연대 전체의 도난 사건이 근절되었다.",
    effect: { stats: { Fel: 1, WP: 1 }, faith: 2 }
  },
  {
    id: "ch_job_sororitas_1",
    badge: "전투 수녀회",
    priority: 3,
    req: { anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian", "canoness", "abbess_sanctorum"] },
    text: "새벽 철야 기도 후 파워 아머의 성유를 바르며 볼터와 화염방사기를 정비했다. 작은 회의를 고백한 수련 수녀가 자진해 참회 부대 리펜티아로 향하는 뒷모습을 축복했다.",
    effect: { stats: { WP: 1, BS: 1 }, faith: 4 }
  },
  {
    id: "ch_job_astartes_1",
    badge: "아스타르테스 수련",
    priority: 3,
    req: { anyCareers: ["astartes_scout", "astartes_brother", "astartes_sergeant", "astartes_veteran", "astartes_captain", "chapter_master"] },
    text: "하루 18시간의 실탄 전투 훈련과 4시간의 전술 성찰, 단 2시간의 휴식. 평범한 필멸자들이 늙어 죽어 가는 동안 초인의 육신은 오직 전쟁의 도구로 벼려진다.",
    effect: { stats: { WS: 1, BS: 1 } }
  },
  {
    id: "ch_job_astartes_2",
    badge: "초인의 괴리",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran", "astartes_captain", "chapter_master"] },
    text: "해방한 행성의 시민들이 눈물을 흘리며 파워 아머 앞에 무릎을 꿇었다. 한때 나 역시 저토록 작고 나약한 인간이었다는 사실이 이제는 아득한 전설처럼 느껴진다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_astartes_dread",
    badge: "드레드노트의 꿈",
    priority: 3,
    req: { allTags: ["dreadnought"] },
    text: "전투 사이 정지 수면 속에서 수백 년 전 고향의 바람을 꿈꾸었다. 테크마린이 석관에 축성유를 바르며 깨울 때면 오직 어설트 캐논의 회전음만이 현실이었다.",
    effect: { stats: { WP: 2, T: 1 } }
  },
  {
    id: "ch_job_grey_knight_1",
    badge: "타이탄의 비밀",
    priority: 3,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    text: "악마 침공을 저지한 직후, 규율에 따라 우리의 존재를 목격한 충성스러운 가드맨 연대의 기억 소거와 격리가 집행되었다. 인류를 지키기 위해 인류에게 잊혀야 하는 것이 666챕터의 숙명이다.",
    effect: { stats: { WP: 2 }, corruption: -4 }
  },
  {
    id: "ch_job_custodes_1",
    badge: "황금 옥좌의 철야",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "황궁 영원의 문 앞에서 단 한 번의 미동도 없이 7개월을 보초 섰다. 남은 시간에는 고대 테라의 철학서와 1만 가지 암살 대응 시뮬레이션을 암산했다.",
    effect: { stats: { Int: 1, WP: 1, WS: 1 } }
  },
  {
    id: "ch_job_inquisition_1",
    badge: "심문소의 그림자",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator", "inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    text: "이단 첩보 하나를 확인하기 위해 선술집 손님 14명을 전원 연행해 심문했다. 13명은 무고했지만 1명의 품에서 여덟 갈래 별 부적이 나왔다. '무고함은 아무것도 증명하지 못한다.'",
    effect: { stats: { Int: 1, Inf: 1 }, faith: 1 }
  },
  {
    id: "ch_job_inquisition_2",
    badge: "로제트의 무게",
    priority: 3,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    text: "행성 총독이 화려한 뇌물과 연회로 호의를 구했으나, 품속에서 황금 로제트를 꺼내 탁자에 올려놓자 그 자리에서 창백하게 무릎을 꿇었다.",
    effect: { stats: { Inf: 2, WP: 1 } }
  },
  {
    id: "ch_job_mechanicus_1",
    badge: "기계교 의례",
    priority: 3,
    req: { anyCareers: ["skitarii", "skitarii_marshal", "tech_priest", "archmagos", "fabricator_locum", "fabricator_general"] },
    text: "고장 난 발전기의 스위치를 누르기 전에 3시간 동안 성유를 바르고 이진법 찬가를 낭송했다. 원리를 이해하려는 것은 이단이며, 오직 매뉴얼 의례만이 옴니시아의 뜻이다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_job_mechanicus_2",
    badge: "살점의 나약함",
    priority: 3,
    req: { anyCareers: ["tech_priest", "archmagos", "fabricator_locum", "fabricator_general"] },
    text: "노화된 생체 폐를 적출하고 최신형 방사선 여과 펌프로 교체했다. 숨 쉬는 감각은 사라졌지만 작업 효율이 14.7% 상승해 만족스러웠다.",
    effect: { stats: { T: 1, Int: 1 }, wounds: 4 }
  },
  {
    id: "ch_job_navy_1",
    badge: "임페리얼 네이비",
    priority: 3,
    req: { anyCareers: ["imperial_navy", "navy_captain", "navy_admiral", "lord_high_admiral"] },
    text: "순양함 하층 포갑판에서 수백 명의 노역자들이 거대 매크로 캐논 포탄을 쇠사슬로 끌어올리다 6명이 압사했다. 함교 항해 일지에는 '3번 포대 재장전 1.4초 지연'이라고만 적혔다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_job_arbites_1",
    badge: "제국법 집행",
    priority: 3,
    req: { anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal", "grand_provost_marshal"] },
    text: "십일조 곡물 창고에서 빵 한 덩이를 훔친 굶주린 부랑자에게 제국법 제412조를 적용해 '서비터 전환형'을 선고했다. 법은 자비가 아니라 제국의 생존 기계다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_admin_1",
    badge: "아드미니스트라툼 부조리",
    priority: 3,
    req: { anyCareers: ["administratum", "admin_prefect_rank", "admin_departmento_head", "master_of_administratum", "planetary_governor", "sector_lord"] },
    text: "420년 전에 타이라니드에게 먹혀 사라진 행성으로 농기구 5만 대를 보내라는 칙령을 발견했다. 하지만 '전임 하이 로드의 서명은 취소할 수 없다'는 규정에 따라 올해도 수송선을 배정했다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_job_admin_2",
    badge: "서기관의 최후",
    priority: 3,
    req: { anyCareers: ["administratum", "admin_prefect_rank", "admin_departmento_head", "master_of_administratum", "planetary_governor", "sector_lord"] },
    text: "옆 책상에서 50년째 십일조 영수증을 검수하던 노서기관이 펜을 쥔 채 조용히 숨을 거두었다. 주임 아뎁트는 시신을 치우기도 전에 그의 책상 위 미결 서류부터 나에게 넘겼다.",
    effect: { stats: { Int: 1 }, wounds: -2 }
  },
  {
    id: "ch_job_priest_1",
    badge: "에클레시아키 설교",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest", "ministorum_confessor", "ecclesiarchy_cardinal", "ecclesiarch"] },
    text: "광장에서 4시간 동안 '고통은 축복이며 가난은 영혼을 맑게 한다'고 열변을 토했다. 설교가 끝난 뒤 순금 향로와 고급 포도주가 담긴 추기경 마차에 올랐다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 3 }
  },
  {
    id: "ch_job_rogue_trader_1",
    badge: "로그 트레이더 항해",
    priority: 3,
    req: { anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "guild_magnate"] },
    text: "제국 성도 밖 미개척 행성에서 희귀 향신료와 고대 문명의 황금을 가득 싣고 귀환했다. 세관원이 의심스러운 눈초리를 보냈으나, 황제의 친필 무역 영장을 들이밀자 즉시 경례했다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_job_psyker_1",
    badge: "공인 사이커의 삶",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker", "primaris_psyker", "master_of_astronomicum"] },
    text: "지휘부 텐트 구석에서 워프의 메아리를 해석하는 동안, 등 뒤에 선 경호병은 내 관자놀이에서 라스건 총구를 한순간도 떼지 않았다. 그것이 제국이 사이커를 대접하는 방식이다.",
    effect: { stats: { WP: 1, Int: 1 }, corruption: 1 }
  },
  {
    id: "ch_job_cultist_1",
    badge: "암흑의 비밀 집회",
    priority: 3,
    req: { anyCareers: ["chaos_cultist", "chaos_champion"] },
    text: "폐기된 하수도 제단에서 촛불을 켜고 여덟 갈래 별을 그렸다. 배고픔과 채찍에 지친 하층 노동자들이 하나둘 거짓 황제를 저주하며 우리의 대열에 합류했다.",
    effect: { stats: { Fel: 1, WP: 1 }, corruption: 4 }
  },
  {
    id: "ch_job_guard_artillery",
    badge: "아스트라 밀리타룸",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_officer"] },
    text: "후방 바실리스크 자주포가 아군 참호 바로 30미터 앞에 포탄을 쏟아부었다. 무전병이 항의하자 포병대 장교는 '오차 범위 0.4% 이내, 제국 표준 합격'이라 답했다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -4 }
  },
  {
    id: "ch_job_guard_krieg_shovel",
    badge: "데스 코어 오브 크리그",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyWorlds: ["krieg"] },
    text: "참호 보강용 야전삽의 날을 면도날처럼 갈며 출격 명령을 기다렸다. 옆의 신병이 18세 생일이냐고 물었으나, 크리그 병사에게 나이란 그저 복무 효율 지표일 뿐이다.",
    effect: { stats: { WS: 1, T: 1 }, faith: 2 }
  },
  {
    id: "ch_job_astartes_serf",
    badge: "챕터의 일상",
    priority: 3,
    req: { anyCareers: ["astartes_scout", "astartes_brother", "astartes_sergeant", "astartes_veteran", "astartes_captain", "chapter_master"] },
    text: "전투가 끝난 뒤 챕터 서프들이 볼터 탄흔이 박힌 세라마이트 갑주를 경건하게 수리하고 성유를 발랐다. 그들은 수십 년 뒤 늙어 죽겠지만, 이 갑주와 나는 수백 년을 더 싸우리라.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_job_inquisition_paranoia",
    badge: "심문관의 의심",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator", "inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    text: "밀고자 세 명의 진술이 서로 어긋난다. 한 명은 진실이고 두 명은 컬트의 역정보일 터. 잠들기 전에도 문고리에 와이어를 걸고 베개 밑에 라스 피스톨을 두었다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_job_sororitas_hymn",
    badge: "순교자의 노래",
    priority: 3,
    req: { anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian", "canoness", "abbess_sanctorum"] },
    text: "이단자들의 요새를 불태운 재 위에서 전사한 자매들의 이름을 한 명씩 호명했다. 슬픔 대신 '황제의 곁으로 먼저 돌아간 축복'을 찬미하며 볼터 탄창을 채웠다.",
    effect: { faith: 4, stats: { WP: 1 } }
  },
  {
    id: "ch_job_rogue_trader_court",
    badge: "무역 영장의 권세",
    priority: 3,
    req: { anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "guild_magnate"] },
    text: "함선 브리지에 진열된 외계 수정과 고대 테라 회화를 둘러보며 다음 개척 성계를 골랐다. 변방 총독 셋이 서로 내 함대의 기항을 청원하며 금괴를 보내왔다.",
    effect: { stats: { Inf: 2 } }
  },
  {
    id: "ch_job_mechanicus_noosphere",
    badge: "누스피어 접속",
    priority: 3,
    req: { anyCareers: ["skitarii", "skitarii_marshal", "tech_priest", "archmagos", "fabricator_locum", "fabricator_general"] },
    text: "누스피어(기계교 정보망)에 접속해 1초 만에 4,000페이지 분량의 용광로 출력 보고서를 내려받았다. 입으로 말하는 필멸자들의 대화가 너무 느려 답답하기 짝이 없었다.",
    effect: { stats: { Int: 2, Fel: -1 } }
  },
  {
    id: "ch_rank_scout_1",
    badge: "네오파이트 수련",
    priority: 3,
    req: { anyCareers: ["astartes_scout"] },
    text: "파워 아머를 입은 선배 배틀 브라더들의 행진을 경외의 눈으로 바라보며 카라페이스 갑옷 끈을 조였다. 스카웃 병장은 '살아남아 검은 갑각을 증명하라'며 야간 독도법 행군을 명했다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_rank_scout_2",
    badge: "네오파이트 복종",
    priority: 3,
    req: { anyCareers: ["astartes_scout"] },
    text: "전술 회의에서 의견을 내려다 베테랑 병장에게 제지당했다. 아직 10중대 신참 네오파이트에게 허락된 권한은 질문이 아니라 침묵 속의 정찰과 복종뿐이다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_rank_brother_1",
    badge: "배틀 브라더 강습",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran"] },
    text: "드롭 포드 안전벨트가 잠기고 대기권 마찰열이 선체를 붉게 달궜다. 형제들과 함께 챕터의 전투 함성을 합창하며 적진 한가운데로 수직 강하했다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_rank_captain_1",
    badge: "중대장의 위엄",
    priority: 3,
    req: { anyCareers: ["astartes_captain", "chapter_master"] },
    text: "타격 순양함 함교에 들어서자 제국 해군 제독과 행성 총독이 일제히 고개를 숙였다. 100명 스페이스 마린 중대의 출격 여부가 성계 하나의 생사를 가른다.",
    effect: { stats: { Inf: 2, Int: 1 } }
  },
  {
    id: "ch_rank_captain_2",
    badge: "챕터 평의회",
    priority: 3,
    req: { anyCareers: ["astartes_captain", "chapter_master"] },
    text: "요새 수도원 원탁에서 챕터 마스터 및 타 중대장들과 다음 세기의 성전 항로를 논의했다. 전사한 형제들의 진시드 회수 보고서를 읽으며 묵념을 올렸다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_rank_custodes_2",
    badge: "황궁의 철학자",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "무술 대련 직후 황궁 고문서고에서 3만 년 전 고대 테라의 정치철학을 탐독했다. 쿠스토데스는 단순한 병사가 아니라 황제의 유일한 대화 상대이자 철인 전사다.",
    effect: { stats: { Int: 2, WP: 1 } }
  },
  {
    id: "ch_rank_custodes_3",
    badge: "그림자 감방 순찰",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "황궁 지하 깊은 곳, 말로 옮길 수 없는 고대 괴물과 아키오테크 재앙들이 봉인된 '어둠의 감방'의 봉인 상태를 점검했다. 단 하나의 문만 열려도 테라가 멸망한다.",
    effect: { stats: { WP: 2, WS: 1 } }
  },
  {
    id: "ch_rank_skitarii_1",
    badge: "스키타리 전파 행군",
    priority: 3,
    req: { anyCareers: ["skitarii", "skitarii_marshal"] },
    text: "방사능 먼지 폭풍 속을 72시간 쉬지 않고 행군했다. 피로 신호가 뇌에 닿자 마고스의 원격 패치가 즉각 통증 회로를 차단했다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_rank_archmagos_1",
    badge: "아크마고스의 연산",
    priority: 3,
    req: { anyCareers: ["archmagos", "fabricator_locum", "fabricator_general"] },
    text: "포지 월드 6개 대륙의 티탄 주조 일정을 0.04% 최적화하기 위해 노동자 교대 시간을 18시간으로 늘리는 칙령을 이진법으로 송출했다. 효율은 곧 옴니시아의 찬미다.",
    effect: { stats: { Int: 2, Inf: 2 } }
  },
  {
    id: "ch_rank_acolyte_1",
    badge: "어콜라이트의 긴장",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator"] },
    text: "스승 이단심문관에게 암호 보고를 올린 뒤 은신처 침대 밑에 위조 신분증 3개와 비상용 멜타 폭탄을 점검했다. 어콜라이트에게 안락한 노후 따윈 존재하지 않는다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_rank_lord_commissar_1",
    badge: "로드 커미사르의 사열",
    priority: 3,
    req: { anyCareers: ["lord_commissar", "commissar_general"] },
    text: "전구 사령부 사열대에 오르자 5개 연대 병사들은 물론 콧대 높은 귀족 장군들까지 옷깃을 여미며 부동자세를 취했다. 전설이 된 검은 제복의 무게가 어깨에 실렸다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_rank_canoness_1",
    badge: "캐노네스의 지휘",
    priority: 3,
    req: { anyCareers: ["canoness", "abbess_sanctorum"] },
    text: "수녀원 본당에서 성유물함을 봉인하고 수백 명의 전투 수녀들에게 출정 축복을 내렸다. 캐노네스의 기도는 한 분대가 아니라 행성 전체의 신앙을 불태운다.",
    effect: { stats: { Inf: 2, WP: 1 }, faith: 5 }
  },
  {
    id: "ch_rank_scion_1",
    badge: "사이온의 냉혈",
    priority: 3,
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
    text: "일반 가드맨들이 공포에 떠는 전장에서도 심박수 64를 유지하며 핫샷 라스건 조준경을 닦았다. 스콜라의 극한 훈련은 공포라는 감정 자체를 깎아 냈다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_job_ex_officer",
    badge: "장교의 고뇌",
    priority: 3,
    req: { anyCareers: ["militarum_officer", "militarum_general", "warmaster", "lord_commander_militant"] },
    text: "전사자 통지서 400통에 일일이 서명하다 만년필 촉이 부러졌다. 부관은 '서명 도장 서비터를 쓰시면 10초면 끝납니다'라고 조언했다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_ex_commissar",
    badge: "커미사르의 경계",
    priority: 3,
    req: { anyCareers: ["commissar_cadet", "commissar", "lord_commissar", "commissar_general"] },
    text: "야전 식당에서 병사가 내민 스프에서 낯선 약초 냄새가 났다. 말없이 병사에게 먼저 한 숟가락 먹어 보라고 권하자 얼굴이 사색이 되어 자백했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_job_ex_inquisitor",
    badge: "이단심문관의 식사",
    priority: 3,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    text: "행성 총독궁 만찬에 예고 없이 방문해 독살 탐지 서보스컬을 띄운 채 포도주를 음미했다. 식탁에 둘러앉은 귀족 20명 중 아무도 땀을 닦지 못했다.",
    effect: { stats: { Inf: 2, Int: 1 } }
  },
  {
    id: "ch_job_ex_astartes_3",
    badge: "아스타르테스 무기고",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran", "astartes_captain", "chapter_master"] },
    text: "400년 된 유물 볼터의 약실을 직접 분해해 닦고 기계령 기도문을 읊었다. 이 총은 나를 거쳐 간 세 명의 전임 형제와 함께 14개 성계를 정화해 왔다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_job_ex_astartes_4",
    badge: "아스타르테스 성전",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran", "astartes_captain", "chapter_master"] },
    text: "전투 함선 강습 갑판에서 출격 대기 중, 채플린이 갑주 가슴팍에 새로운 붉은 순결 인장을 왁스로 봉인해 주었다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_job_ex_custodes_4",
    badge: "황제의 곁",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "황금 옥좌의 방 문턱에서 뿜어져 나오는 타오르는 사이킥 열기를 묵묵히 견디며 교대 근무를 마쳤다. 평범한 필멸자라면 1초 만에 재가 될 영광의 빛이다.",
    effect: { stats: { T: 1, WP: 2 } }
  },
  {
    id: "ch_job_ex_sororitas_2",
    badge: "전투 수녀회",
    priority: 3,
    req: { anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian", "canoness", "abbess_sanctorum"] },
    text: "화염방사기 프로메튬 탱크를 점검하며 순교 성녀 캐서린의 일대기를 합창했다. 불꽃은 거짓을 태우고 진실만 남긴다.",
    effect: { stats: { BS: 1 }, faith: 4 }
  },
  {
    id: "ch_job_ex_techpriest",
    badge: "테크프리스트의 시선",
    priority: 3,
    req: { anyCareers: ["tech_priest", "archmagos", "fabricator_locum", "fabricator_general"] },
    text: "어느 귀족이 자랑하던 고대 황금 회중시계를 잠시 살피고는 '기어 마찰 계수 18% 손실, 조악한 유기체 장식품'이라는 진단을 내려 주었다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_job_ex_navy_2",
    badge: "워프 항해",
    priority: 3,
    req: { anyCareers: ["imperial_navy", "rogue_trader"] },
    text: "워프 도약 직전, 선체 전체의 창문 장갑 셔터가 육중한 쇠소리를 내며 닫혔다. 도약 중 밖을 내다본 신참 갑판원은 미쳐 버려 격리실로 끌려갔다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },
  {
    id: "ch_job_ex_arbites_2",
    badge: "아르비테스 야간 순찰",
    priority: 3,
    req: { anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal", "grand_provost_marshal"] },
    text: "아르비테스 요새 법정에서 하루 400건의 약식 재판을 3시간 만에 끝냈다. 판결은 대개 벌금, 징역 탄광, 서비터 전환 셋 중 하나였다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_job_ex_priest_2",
    badge: "국교의 설교",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest", "ministorum_confessor", "ecclesiarchy_cardinal", "ecclesiarch"] },
    text: "체인소드 끝을 치켜들고 광장에서 이단 근절을 부르짖자 흥분한 신도들이 봉헌함에 은화를 쏟아부었다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 3 }
  },
  {
    id: "ch_job_ex_psyker_2",
    badge: "아스트로패스 통신",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker", "primaris_psyker", "master_of_astronomicum"] },
    text: "300광년 너머 성계에서 날아온 꿈과 상징 덩어리의 아스트로패스 전문을 6시간 동안 해독해 '탄약 500상자 지연'이라는 1줄 보고서로 번역했다.",
    effect: { stats: { Int: 2, WP: 1 } }
  },
  {
    id: "ch_job_ex_cultist_2",
    badge: "암흑의 속삭임",
    priority: 3,
    req: { anyCareers: ["chaos_cultist", "chaos_champion"] },
    text: "폐공장 지하에서 훔친 제국 보급품에 카오스의 룬을 새겼다. 아르비테스 순찰 사이렌이 가까워질 때마다 아슬아슬한 전율이 등줄기를 탔다.",
    effect: { stats: { Ag: 1, Int: 1 }, corruption: 3 }
  },
  {
    id: "ch_job_ex_grey_knight_2",
    badge: "타이탄의 무기고",
    priority: 3,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    text: "은빛 네메시스 포스 소드의 룬 문자에 정화의 기도를 불어넣었다. 칼날에 서린 푸른 사이킥 불꽃이 악마의 이름을 태울 날을 기다린다.",
    effect: { stats: { WS: 1, WP: 2 }, corruption: -5 }
  },
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
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"] },
    text: "데파르트멘토 무니토룸에서 보급된 300년 묵은 시체 전분 전투식량을 씹으며 라스건 배터리 팩을 모닥불에 살짝 데워 비상 충전했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_rank_deep_guard_2",
    badge: "제국 보병",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"] },
    text: "신병 보충대가 참호에 도착하자 고참들과 함께 '15시간만 버티면 베테랑이다'라는 씁쓸한 농담을 건네며 철모를 눌러 썼다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_rank_deep_officer_1",
    badge: "연대 장교",
    priority: 3,
    req: { anyCareers: ["militarum_officer", "militarum_general", "warmaster", "lord_commander_militant"] },
    text: "야전 막사에서 수백 장의 전사자 통지서에 도장을 찍고, 내일 새벽 공세에 투입할 예비 중대의 탄약 배당량을 계산했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_scion_1",
    badge: "템페스투스 사이온",
    priority: 3,
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
    text: "발키리 수송정 안에서 중력 낙하산(그라브 슈트)과 핫샷 라스건 전원 팩을 점검했다. 스콜라 프로제니움의 교리에는 두려움이라는 단어가 없다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_rank_deep_commissar_1",
    badge: "커미사르",
    priority: 3,
    req: { anyCareers: ["commissar_cadet", "commissar"] },
    text: "검은 대제복의 먼지를 털고 군기 문란 보고서를 검토했다. 사형 선고 한 번보다 제때 챙겨 준 따뜻한 배급이 연대의 사기를 더 높일 때도 있다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_lordcomm_1",
    badge: "로드 커미사르",
    priority: 3,
    req: { anyCareers: ["lord_commissar", "commissar_general"] },
    text: "전구 총사령부 작전 회의에 참석하자, 사단장 세 명이 말없이 일어나 경례했다. 로드 커미사르의 존재 자체가 전선의 철벽이다.",
    effect: { stats: { Inf: 2, WP: 1 } }
  },
  {
    id: "ch_rank_deep_sororitas_1",
    badge: "전투 수녀",
    priority: 3,
    req: { anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian"] },
    text: "수녀원 무기고에서 볼터 탄창 하나하나에 축성 성유를 바르며 성녀의 찬송가를 읊었다. 강철과 신앙은 둘이 아니다.",
    effect: { stats: { BS: 1 }, faith: 3 }
  },
  {
    id: "ch_rank_deep_canoness_1",
    badge: "캐노네스",
    priority: 3,
    req: { anyCareers: ["canoness", "abbess_sanctorum"] },
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
    req: { anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran"] },
    text: "드롭 포드 강하 전 15분간의 전투 기도 동안 심장 두 개가 흔들림 없이 고동쳤다. 황제의 죽음의 천사는 공포를 알지 못한다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_captain_1",
    badge: "중대장",
    priority: 3,
    req: { anyCareers: ["astartes_captain", "chapter_master"] },
    text: "타격 순양함 함교의 홀로그램 성도 앞에서 100명 중대원들의 강하 좌표를 직접 조율했다. 중대장의 결단 하나가 행성 하나의 생사를 가른다.",
    effect: { stats: { Int: 1, Inf: 2 } }
  },
  {
    id: "ch_rank_deep_gk_1",
    badge: "그레이 나이트",
    priority: 3,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    text: "토성 위성 타이탄의 666 성채 서고에서 상급 악마의 금지된 진명 한 구절을 암기했다. 은빛 네메시스 포스 할버드가 푸르게 공명했다.",
    effect: { stats: { WP: 2 }, corruption: -3 }
  },
  {
    id: "ch_rank_deep_custodes_1",
    badge: "쿠스토데스",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "황궁 대리석 회랑에서 아우라마이트 갑주에 새겨진 백여 개의 개인 명예 칭호를 묵묵히 점검했다. 만 명의 수호자는 단 한 순간도 방심하지 않는다.",
    effect: { stats: { WS: 1, Int: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_acolyte_1",
    badge: "어콜라이트",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator"] },
    text: "가짜 상인 통행증 세 장을 갈아 끼우며 하층 선술집에서 이단 결사 암구호를 채집했다. 정체가 들키는 순간 아무도 나를 구하러 오지 않는다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_rank_deep_inquisitor_1",
    badge: "이단심문관",
    priority: 3,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    text: "암호화된 천체 통신망으로 세 개 성계에 흩어져 있는 어콜라이트 세포 조직의 보고서를 취합했다. 이단심문관의 눈은 잠들지 않는다.",
    effect: { stats: { Int: 1, Inf: 2 } }
  },
  {
    id: "ch_rank_deep_skitarii_1",
    badge: "스키타리",
    priority: 3,
    req: { anyCareers: ["skitarii", "skitarii_marshal"] },
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
    req: { anyCareers: ["archmagos", "fabricator_locum", "fabricator_general"] },
    text: "포지 월드 12개 구역의 생산 지수를 뇌 임플란트 누스피어에 직결해 실시간 최적화했다. 나약한 살점의 피로는 이미 수십 년 전에 버렸다.",
    effect: { stats: { Int: 2, Inf: 1 } }
  },
  {
    id: "ch_rank_deep_navy_1",
    badge: "임페리얼 네이비",
    priority: 3,
    req: { anyCareers: ["imperial_navy", "navy_captain", "navy_admiral", "lord_high_admiral"] },
    text: "순양함 관측 갑판에서 워프 도약 직전의 겔러 필드 출력을 최종 점검했다. 보이드에서 실수는 곧 함선 전체의 소멸이다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_rank_deep_arbites_1",
    badge: "아르비테스",
    priority: 3,
    req: { anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal", "grand_provost_marshal"] },
    text: "렉스 임페리얼리스 법전 420권을 암송한 뒤 컴뱃 샷건에 특수 집행탄을 장전했다. 법 앞에 귀천도, 자비도 없다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_rank_deep_admin_1",
    badge: "아드미니스트라툼",
    priority: 3,
    req: { anyCareers: ["administratum", "admin_prefect_rank", "admin_departmento_head", "master_of_administratum", "planetary_governor", "sector_lord"] },
    text: "서류 산더미 사이에서 240년 전에 접수된 행성 도로 보수 민원서를 발견해 '관할 이관 대기' 도장을 정성스럽게 찍어 다음 책상으로 넘겼다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_rank_deep_priest_1",
    badge: "에클레시아키",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest", "ministorum_confessor", "ecclesiarchy_cardinal", "ecclesiarch"] },
    text: "대성당 강단에서 황제의 영광을 열변한 뒤, 전장용 에비스서레이터 체인소드의 톱니에 향유를 발랐다.",
    effect: { stats: { Fel: 1 }, faith: 4 }
  },
  {
    id: "ch_rank_deep_rt_1",
    badge: "로그 트레이더",
    priority: 3,
    req: { anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "guild_magnate"] },
    text: "황제의 친필 서명이 새겨진 무역 영장 보관함을 열어 본 뒤, 변경 미개척 성계의 희귀 광물 독점 계약서에 서명했다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_rank_deep_psyker_1",
    badge: "생션드 사이커",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker", "primaris_psyker", "master_of_astronomicum"] },
    text: "사이킥 억제 목걸이의 미세한 전류를 견디며 워프 너머에서 날아온 아스트로패스 암호 꿈을 해독해 사령부에 보고했다.",
    effect: { stats: { WP: 2 }, corruption: -2 }
  },
  {
    id: "ch_s2_cultist_1",
    badge: "암흑 교단",
    priority: 3,
    req: { anyCareers: ["chaos_cultist", "chaos_champion"] },
    text: "하층 배수구 아래 비밀 회합에서 굶주린 공장 인부들에게 암호문을 나누어 주었다. 절망은 카오스 신들이 가장 사랑하는 거름이다.",
    effect: { stats: { Fel: 1 }, corruption: 2 }
  },
  {
    id: "ch_s2_cultist_2",
    badge: "암흑 교단",
    priority: 3,
    req: { anyCareers: ["chaos_cultist", "chaos_champion"] },
    text: "아르비테스 순찰대의 감시망을 피해 밀수 탄약과 금지된 의식 초를 지하 은신처로 옮겼다. 반란의 날은 조용히 다가오고 있다.",
    effect: { stats: { Ag: 1, Int: 1 }, corruption: 2 }
  },
  {
    id: "ch_s2_gk_1",
    badge: "그레이 나이트",
    priority: 3,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    text: "은빛 네메시스 무기의 룬 문양을 성수로 닦아 내며 666 성가를 암송했다. 그레이 나이트의 이름은 제국 역사에 남지 않으나 악마들은 영원히 떨며 기억한다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 2 }
  },
  {
    id: "ch_s2_gk_2",
    badge: "그레이 나이트",
    priority: 3,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    text: "타이탄의 예지실로부터 수신된 워프 징후 보고서를 판독하며 다음 악마 침공 지점으로의 텔레포트 강습을 준비했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s2_custodes_1",
    badge: "황금 근위대",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "황궁 영원의 문 앞에서 백 시간 넘게 미동도 없이 보초를 서며 고대 철학과 제국 전술사를 머릿속으로 되새겼다.",
    effect: { stats: { WP: 1, Int: 1, T: 1 } }
  },
  {
    id: "ch_s2_skitarii_1",
    badge: "스키타리",
    priority: 3,
    req: { anyCareers: ["skitarii", "skitarii_marshal"] },
    text: "마고스의 누스피어 텔레메트리 신호에 발걸음을 완벽히 맞추어 방사능 황무지를 쉬지 않고 40킬로미터 행군했다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s2_scion_1",
    badge: "템페스투스 사이온",
    priority: 3,
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
    text: "핫샷 라스건의 등짐 동력 팩을 정밀 점검한 뒤, 말없이 발키리 강하 브리핑 좌표를 암기했다. 감정은 임무의 방해물일 뿐이다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_s2_psyker_1",
    badge: "생션드 사이커",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker", "primaris_psyker", "master_of_astronomicum"] },
    text: "목덜미의 사이킥 억제 고리를 점검하며 워프의 속삭임을 차단했다. 아군 병사들이 한 발 떨어져 경계하는 시선은 이미 익숙하다.",
    effect: { stats: { WP: 2 }, corruption: -1 }
  },
  {
    id: "ch_s2_priest_1",
    badge: "에클레시아키",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest", "ministorum_confessor", "ecclesiarchy_cardinal", "ecclesiarch"] },
    text: "향 연기가 자욱한 대성당에서 야전 출정 병사들의 라스건에 성유를 바르며 황제의 가호를 우렁차게 선포했다.",
    effect: { stats: { Fel: 1, WP: 1 }, faith: 3 }
  },
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
      anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian", "canoness", "abbess_sanctorum"]
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
    id: "ch_s13_high_lord_council",
    badge: "테라의 하이 로드",
    priority: 3,
    req: { allTags: ["high_lord_terra"] },
    text: "황궁 대의회 세나토룸 임페리알리스의 거대한 황금 원탁 앞에서, 수백 개 성계의 십일조와 성전군 증원 칙령에 옥새를 눌렀다.",
    effect: { stats: { Inf: 1, Int: 1 } }
  },
  {
    id: "ch_s13_governor_tithe",
    badge: "행성 통치부",
    priority: 3,
    req: { anyCareers: ["planetary_governor", "sector_lord"] },
    text: "첨탑 궁정 발코니 아래로 펼쳐진 하이브와 궤도 십일조 수송선을 내려다보며, 아드미니스트라툼 감사 보고서와 방위군 예산을 결재했다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_s13_csm_warband",
    badge: "배신자 군단",
    priority: 3,
    req: { anyCareers: ["renegade_marine", "chaos_lord"] },
    text: "가시와 해골로 뒤덮인 타락 파워 아머의 문양을 손질하며, 워프 폭풍 너머 제국 변경 성계를 향한 다음 약탈 항로를 점검했다.",
    effect: { stats: { WS: 1, WP: 1 }, corruption: 2 }
  },
  {
    id: "ch_s13_daemon_prince_warp",
    badge: "불멸의 악마 군주",
    priority: 3,
    req: { anyCareers: ["daemon_prince"] },
    text: "현실과 워프의 경계에 선 불멸의 육신 주위로 공기가 뒤틀렸다. 필멸자의 시간과 두려움은 이미 아득한 과거의 먼지에 불과했다.",
    effect: { stats: { WS: 1, WP: 1, Inf: 1 } }
  }
);
