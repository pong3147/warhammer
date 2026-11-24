// 일상 연대기 — 6대 유명 연대 · 아스타르테스 4대 전문 직책 · 직군 승격 태그 및 소외 직군 심화 일상 (40종)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
  // ===== 1. 아스트라 밀리타룸 6대 유명 연대 전용 일상 (6종) =====
  {
    id: "ch_s12_reg_cadia",
    badge: "카디안 쇼크 트루퍼",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyHomeWorlds: ["cadia"] },
    text: "전투가 끝난 뒤에도 카디아식 규율에 따라 15분 만에 라스건을 완전히 분해하고 기름칠을 마쳤다. 타 연대 신병들이 그 칼 같은 손놀림을 경외의 눈으로 바라보았다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_s12_reg_krieg",
    badge: "데스 코어 오브 크리그",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyHomeWorlds: ["krieg"] },
    text: "포격이 잠시 멎은 새벽, 말없이 방독면의 흙먼지를 털어 내고 야전삽 날을 숫돌에 갈았다. 이름 없는 번호 하나가 오늘도 속죄의 의무를 묵묵히 이어 간다.",
    effect: { stats: { T: 1, WP: 1 }, faith: 1 }
  },
  {
    id: "ch_s12_reg_catachan",
    badge: "카타찬 정글 파이터",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyHomeWorlds: ["catachan"] },
    text: "보급용 무거운 플래크 흉갑을 벗어 던지고 붉은 반다나를 질끈 동여맸다. 정글에서 목숨을 지키는 것은 갑옷이 아니라 날카로운 감각과 카타찬 대검뿐이다.",
    effect: { stats: { Ag: 1, WS: 1 } }
  },
  {
    id: "ch_s12_reg_valhalla",
    badge: "발할라 아이스 워리어",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyHomeWorlds: ["valhalla"] },
    text: "눈발이 휘날리는 야영지에서 금속 머그잔에 진하게 우린 타나(Tanna) 차를 나누어 마셨다. 몸속까지 스미는 쌉싸름한 온기가 발할라 병사들의 사기를 지탱한다.",
    effect: { stats: { T: 1, Fel: 1 } }
  },
  {
    id: "ch_s12_reg_tanith",
    badge: "타니스 퍼스트 앤드 온리",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyHomeWorlds: ["tanith"] },
    text: "야영지 불빛 너머로 누군가 타니스 백파이프를 나지막이 불기 시작했다. 은빛 단검을 닦던 분대원들이 말없이 사라진 삼림 행성의 밤하늘을 떠올렸다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_s12_reg_vostroya",
    badge: "보스트로얀 퍼스트본",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_sergeant"], anyHomeWorlds: ["vostroya"] },
    text: "선조로부터 물려받은 공예 라스건의 황동 장식에 성유를 발라 광을 냈다. 보스트로야의 장자로서 전장에 서는 긍지가 붉은 외투 깃마다 서려 있다.",
    effect: { stats: { BS: 1, WP: 1 }, faith: 1 }
  },

  // ===== 2. 아스타르테스 4대 전문 직책 일상 (8종) =====
  {
    id: "ch_s12_role_chaplain_1",
    badge: "챕터 채플린",
    priority: 3,
    req: { allTags: ["astartes", "role_chaplain"] },
    text: "출정 전야 레클루시움 성소에서 검은 파워 아머를 걸치고 형제들의 고해와 전의 서약을 들었다. 해골 투구 너머로 울리는 기도문에 중대 전체의 심장이 하나로 뛰었다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 2 }
  },
  {
    id: "ch_s12_role_chaplain_2",
    badge: "챕터 채플린",
    priority: 3,
    req: { allTags: ["astartes", "role_chaplain"] },
    text: "크로지우스 아르카눔의 역장 코일을 점검하며 신참 배틀 브라더들에게 1만 년 전 챕터 창설의 영웅담과 불멸의 증오 교리를 낭독했다.",
    effect: { stats: { WS: 1, WP: 1 }, corruption: -1 }
  },
  {
    id: "ch_s12_role_apothecary_1",
    badge: "챕터 아포세카리",
    priority: 3,
    req: { allTags: ["astartes", "role_apothecary"] },
    text: "배틀 바지 아포세카리온에서 회수한 진시드의 유전 순도를 정밀 검수했다. 단 하나의 돌연변이 징후도 허락하지 않는 치밀함이 챕터의 천 년을 지탱한다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s12_role_apothecary_2",
    badge: "챕터 아포세카리",
    priority: 3,
    req: { allTags: ["astartes", "role_apothecary"] },
    text: "백색 파워 아머 팔목의 나르테키움 절삭 톱과 진정 주사기를 정결하게 소독했다. 전사한 형제의 마지막 명예를 거두는 손길에는 한 치의 떨림도 없어야 한다.",
    effect: { stats: { Int: 1, WP: 1 }, wounds: 3 }
  },
  {
    id: "ch_s12_role_techmarine_1",
    badge: "챕터 테크마린",
    priority: 3,
    req: { allTags: ["astartes", "role_techmarine"] },
    text: "붉은 갑주의 서보-암을 전개해 손상된 프레데터 전차의 장갑판을 용접하고 옴니시아의 이진법 진정 기도문을 읊었다. 성난 기계령이 순순히 가동음을 되찾았다.",
    effect: { stats: { Int: 1, BS: 1 } }
  },
  {
    id: "ch_s12_role_techmarine_2",
    badge: "챕터 테크마린",
    priority: 3,
    req: { allTags: ["astartes", "role_techmarine"] },
    text: "고대 드레드노트 석관의 냉각 순환계를 점검하며 수백 년 전 잠든 고참 형제의 맥박 기록을 살폈다. 화성에서 배운 비술이 챕터의 불멸 영웅들을 지탱한다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s12_role_librarian_1",
    badge: "챕터 라이브러리안",
    priority: 3,
    req: { allTags: ["astartes", "role_librarian"] },
    text: "라이브러리우스 고서고에서 수천 년 된 양피지 전투 기록을 필사하며 워프 해류의 불길한 징후를 황제 타로로 점쳤다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s12_role_librarian_2",
    badge: "챕터 라이브러리안",
    priority: 3,
    req: { allTags: ["astartes", "role_librarian"] },
    text: "사이킥 후드의 수정 매트릭스를 조율하며 포스 소드에 정신력을 집중했다. 악마의 속삭임이 스며들 틈조차 주지 않는 강철의 정신 방벽을 연마했다.",
    effect: { stats: { WP: 1, WS: 1 }, corruption: -1 }
  },

  // ===== 3. 12단계 직군 승격·명예 태그 회수 일상 (8종) =====
  {
    id: "ch_s12_tag_rogue_warrant",
    badge: "개척 성계 영주",
    priority: 3,
    req: { allTags: ["rogue_warrant_charter"] },
    text: "그대의 가문 이름으로 선포된 변경 식민지 항구에서 첫 번째 광석과 향신료 수송선이 기함으로 입항했다. 제국 성도 바깥에 새겨진 가문의 깃발이 찬란히 빛난다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_s12_tag_interrogator",
    badge: "심문소 심문자",
    priority: 3,
    req: { allTags: ["interrogator_rank"] },
    text: "주군 이단심문관의 대리인으로 하위 어콜라이트 세포들의 첩보 보고를 총괄했다. 은빛 심문자 인장의 무게만큼 로제트를 계승할 날이 가까워지고 있다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_tag_arbites_judge",
    badge: "아르비테스 판관",
    priority: 3,
    req: { allTags: ["arbites_judge"] },
    text: "아다만티움 법대 위에서 수백 페이지에 달하는 제국법 판례집을 대조하며 반역자들의 최종 형량을 선고했다. 판관의 의사봉 소리에 행성 전체가 숨을 죽인다.",
    effect: { stats: { Inf: 1, WP: 1 } }
  },
  {
    id: "ch_s12_tag_navy_commodore",
    badge: "함대 준장",
    priority: 3,
    req: { allTags: ["navy_commodore"] },
    text: "기함 전략 홀로리스 테이블 위에 순양함과 호위함 6척의 성계 초계 진형을 배치했다. 전대 장병들의 경례 속에 제국 해군 지휘관의 위엄이 깊어졌다.",
    effect: { stats: { Inf: 1, Int: 1 } }
  },
  {
    id: "ch_s12_tag_admin_prefect",
    badge: "아드미니스트라툼 감사관",
    priority: 3,
    req: { allTags: ["admin_prefect"] },
    text: "성계 내 십일조 납부 장부를 교차 감사해 부패한 지방 징수관 셋을 적발했다. 감사관의 붉은 인장 하나에 행성 총독부의 공기가 얼어붙었다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_tag_ganger_baron",
    badge: "언더하이브 두목",
    priority: 3,
    req: { allTags: ["ganger_baron"] },
    text: "하층 돔 암시장 상인들과 정화수 배관 관리자들이 차례로 찾아와 상납금과 경호 의뢰를 올렸다. 어두운 지하 세계의 법은 이제 그대의 입에서 나온다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_s12_tag_tempestus_prime",
    badge: "템페스투스 프라임",
    priority: 3,
    req: { allTags: ["tempestus_prime"] },
    text: "발키리 수송기 출격 직전, 정예 사이온 소대원들의 핫샷 라스건 출력과 강하 장비를 직접 검수했다. 완벽한 침묵과 정밀함이 프라임 지휘 소대의 상징이다.",
    effect: { stats: { BS: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_tag_psyker_primaris",
    badge: "프리마리스 사이커",
    priority: 3,
    req: { allTags: ["psyker_primaris"] },
    text: "사단 작전 회의에 정식 장교급 사이커로 배석해 포스 스태프에 깃든 워프 기류를 조율했다. 커미사르조차 이제는 함부로 그대의 뒤통수에 총구를 겨누지 못한다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },

  // ===== 4. 얇은 직군 집중 보강 일상 연대기 (18종) =====
  {
    id: "ch_s12_rt_1",
    badge: "로그 트레이더 함교",
    priority: 3,
    req: { anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "guild_magnate"] },
    text: "기함 전망창 너머 미지의 성운을 바라보며 항해사·세네샬과 함께 다음 분기 변경 개척 항로의 예상 수익을 계산했다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_rt_2",
    badge: "무역 영장 연회",
    priority: 3,
    req: { anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain", "guild_magnate"] },
    text: "행성 총독궁 만찬에서 변경에서 들여온 진귀한 보석과 술을 풀어 상류층 귀족들의 환심을 샀다. 로그 트레이더에게 사교장은 곧 전장이다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_acolyte_1",
    badge: "심문소 잠입",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator"] },
    text: "위조 신분증 세 장과 낡은 노동자 외투로 변장한 채 하층 술집 구석에서 이단 밀수책의 접선 암호를 엿들었다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_s12_acolyte_2",
    badge: "심문소 암호 보고",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator"] },
    text: "비밀 안전가옥에서 촛불 하나로 암호문을 해독한 뒤 잿더미 하나 남기지 않고 불태웠다. 이단심문소의 그림자는 기록을 남기지 않는다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s12_ganger_1",
    badge: "언더하이브 거래",
    priority: 3,
    req: { anyCareers: ["underhive_ganger", "underhive_boss", "hive_crime_lord"] },
    text: "녹슨 돔 환기구 아래 비밀 공방에서 사제 산탄총의 총열을 다듬고 불법 개조 탄환을 챙겼다. 하층 구역에서는 탄창이 곧 생명줄이다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_s12_ganger_2",
    badge: "언더하이브 순찰",
    priority: 3,
    req: { anyCareers: ["underhive_ganger", "underhive_boss", "hive_crime_lord"] },
    text: "유독 안개가 깔린 구역 경계에서 라이벌 갱단의 낙서를 지우고 아군 표식을 새로 그렸다. 작은 방심 하나가 구역 전체를 빼앗긴다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s12_admin_1",
    badge: "아드미니스트라툼 서고",
    priority: 3,
    req: { anyCareers: ["administratum", "admin_prefect_rank", "admin_departmento_head", "master_of_administratum", "planetary_governor", "sector_lord"] },
    text: "깃펜 끝이 닳아 없어지도록 12시간 내내 성계 곡물 할당량 전표 4,000장에 붉은 밀랍 인장을 찍었다. 제국은 볼터와 양피지 위에서 돌아간다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s12_arbites_1",
    badge: "아르비테스 기동 순찰",
    priority: 3,
    req: { anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal", "grand_provost_marshal"] },
    text: "장갑 사이버-마스티프 사냥개와 함께 야간 하이브 간선도로를 순찰하며 통행 금지 위반자와 불법 무기 밀수꾼을 즉결 제압했다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_s12_navy_1",
    badge: "제국 해군 관측",
    priority: 3,
    req: { anyCareers: ["imperial_navy", "navy_captain", "navy_admiral", "lord_high_admiral"] },
    text: "순양함 함교 오스펙스 화면 앞에서 소행성대 너머 해적선의 열원 흔적을 추적하며 전술 기동 훈련을 지휘했다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_s12_menial_1",
    badge: "매뉴팩토룸 교대",
    priority: 3,
    req: { anyCareers: ["menial_worker", "guild_artisan"], excludeWorlds: ["krieg"] },
    text: "14시간 조업을 마치고 쇠맛 나는 정화수 한 컵과 배급 죽으로 허기를 달랬다. 기어 소리 가득한 작업장에서도 내일을 버텨 낼 작은 요령을 익혔다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s12_pdf_1",
    badge: "행성 방위군 경계",
    priority: 3,
    req: { anyCareers: ["pdf_trooper"] },
    text: "행성 우주 항구 검문소에서 화물 컨테이너를 일일이 검문하며 불법 이단 서적과 밀수 오토건을 적발했다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s12_officer_1",
    badge: "연대 작전실",
    priority: 3,
    req: { anyCareers: ["militarum_officer", "militarum_general", "warmaster", "lord_commander_militant"] },
    text: "야전 천막 지도판 위에 나무 말로 적 기갑 사단의 기동 경로를 짚어 보며 밤새 포병 화력 지원 시간표를 다듬었다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_scion_1",
    badge: "사이온 모의 강하",
    priority: 3,
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
    text: "무중력 강하 훈련실에서 그래브 슈트(Grav-Chute) 점화 타이밍을 0.1초 단위로 반복 숙달했다. 스콜라의 채찍이 빚은 근육은 실수를 모른다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_s12_gk_1",
    badge: "타이탄 정화 수련",
    priority: 3,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    text: "타이탄 요새 성당에서 666구절의 악마 추방 기도문을 암송하며 은빛 이지스 갑주에 새겨진 방호 룬을 정결히 닦아 냈다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 1 }
  },
  {
    id: "ch_s12_custodes_1",
    badge: "황궁 무예 연마",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    text: "황궁 영원의 회랑에서 동료 쿠스토데스와 가디언 스피어 대련을 마친 뒤, 고대 테라 철학서를 읽으며 전략적 통찰을 가다듬었다.",
    effect: { stats: { WS: 1, Int: 1 } }
  },
  {
    id: "ch_s12_archmagos_1",
    badge: "누스피어 대연산",
    priority: 3,
    req: { anyCareers: ["archmagos", "fabricator_locum", "fabricator_general"] },
    text: "포지 월드 12개 구역의 용광로 출력과 타이탄 부품 생산망을 누스피어로 실시간 동조시키며 0.3%의 효율 향상을 이끌어 냈다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s12_psyker_1",
    badge: "생션드 사이커 명상",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker", "primaris_psyker", "master_of_astronomicum"] },
    text: "신경 억제 고리의 차가운 압박을 견디며 워프의 웅성거림을 잠재우는 호흡 명상을 반복했다. 오늘도 이성을 지켜 낸 것만으로 승리다.",
    effect: { stats: { WP: 1, Int: 1 }, corruption: -1 }
  },
  {
    id: "ch_s12_sororitas_1",
    badge: "수녀회 성가 합창",
    priority: 3,
    req: { anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian", "canoness", "abbess_sanctorum"] },
    text: "새벽 종소리에 맞춰 자매들과 함께 볼터 총열에 성유를 바르며 순교 성녀의 찬송가를 합창했다. 신앙의 불꽃이 파워 아머 내부까지 따뜻하게 채웠다.",
    effect: { stats: { WP: 1, BS: 1 }, faith: 2 }
  }
);
