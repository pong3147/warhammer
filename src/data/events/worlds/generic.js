// 분기 사건 — 무명/일반 6대 행성 · 보이드본 · 행성 유형(anyWorldTags) 공용 사건
export default [
  {
    id: "ev_noble_poison",
    title: "상층 첨탑의 만찬과 독잔",
    category: "정치",
    once: true,
    req: {
      minAge: 14,
      maxAge: 45,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "sororitas", "dreadnought",
        "planetary_governor", "sector_lord", "high_lord_terra",
        "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [{ allTags: ["noble"] }, { stats: { Inf: 48 } }]
    },
    reqLabel: "귀족 출신 또는 권위 48+ · 필멸자",
    weight: 16,
    text: "경쟁 가문이 주최한 화려한 만찬장. 고급 아마섹 술잔에서 미세한 금속성 향이 스친다. 제국 귀족 사회에서 독살은 그저 일상적인 인사치레일 뿐이다.",
    choices: [
      {
        label: "[이단심문소/아르비테스 전용] 로제트와 제국법의 이름으로 독살 음모 가문을 현장에서 압송한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites"] },
        effect: {
          text: "제국 요원에게 독을 먹이려 한 대역죄! 경쟁 가문의 저택이 통째로 압수되고 그대의 위엄이 행성에 떨쳤다.",
          stats: { Inf: 12, WP: 5 }
        }
      },
      {
        label: "[지성 판정 · 지성 42+] 독의 성분을 간파하고 경쟁 가문의 잔과 은밀히 바꿔치기한다",
        req: { stats: { Int: 42 } },
        check: { stat: "Int", diff: 5 },
        success: {
          text: "정적이 제 꾀에 넘어가 쓰러졌고, 가문의 위상과 그대의 냉혹한 평판이 하늘을 찔렀다!",
          stats: { Inf: 12, Int: 5, Fel: 4 }
        },
        fail: {
          text: "눈치챈 경호원들과 소동이 벌어져 간신히 몸을 피했다.",
          stats: { Inf: -4 },
          wounds: -12
        }
      },
      {
        label: "[교섭 판정] 공개적으로 축배를 거절하며 외교적 역공을 펼친다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "우아한 언변으로 상대 가문을 망신 주고 행성 총독의 신임을 얻었다.",
          stats: { Fel: 6, Inf: 8 }
        },
        fail: {
          text: "체면을 구기고 사교계 입지가 다소 좁아졌다.",
          stats: { Inf: -6 }
        }
      },
      {
        label: "[강인 판정] 이미 한 모금 마셔 버렸다! 해독제를 삼키며 버틴다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "강인한 체질로 치명독을 이겨 냈다. 암살자는 공포에 질려 도주했다.",
          stats: { T: 5, WP: 4 },
          wounds: -12
        },
        fail: {
          text: "극심한 중독 증세로 몇 달간 병석에 누워 있어야 했다.",
          wounds: -30
        }
      }
    ],
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "ev_underhive_gang",
    title: "언더하이브 구역 쟁탈전",
    category: "지하세계",
    req: {
      minAge: 13,
      maxAge: 35,
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "celestian", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "psyker_primaris", "tempestus_prime",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [{ anyWorldTags: ["hive", "underhive"] }, { anyCareers: ["underhive_ganger"] }]
    },
    reqLabel: "하이브 월드 거주 또는 갱단원 · 필멸자",
    weight: 14,
    text: "정수 파이프 아래 녹슨 다리 위에서 라이벌 갱단이 오토건과 쇠파이프를 들고 포위해 왔다. 아르비테스는 이 깊은 하층까지 내려오지 않는다.",
    choices: [
      {
        label: "[심문소/커미사르/아르비테스/소로리타스 전용] 제국의 인장과 무기를 꺼내 갱단 전원을 즉각 무릎 꿇린다",
        req: { anyTags: ["inquisition_agent", "commissar", "arbites", "sororitas"] },
        effect: {
          text: "제국 권위의 상징을 보자 오합지졸 갱단원들이 그 자리에서 무기를 던지고 엎드렸다! 유용한 지하 정보망을 손에 넣었다.",
          stats: { Inf: 6, WP: 4 }
        }
      },
      {
        label: "[백병 판정] 쇠파이프와 칼날을 휘둘러 선봉을 쓰러뜨린다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "갱단 두목을 쓰러뜨리고 구역의 전리품과 명성을 손에 넣었다!",
          stats: { WS: 5, T: 3, Inf: 4 }
        },
        fail: {
          text: "집단 구타를 당해 늑골이 부러졌으나 목숨만은 건졌다.",
          wounds: -22
        }
      },
      {
        label: "[민첩 판정] 환기구와 폐기물 슈트를 타고 감쪽같이 탈출한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "추격자들을 따돌리고 암시장 밀수꾼들의 비밀 창고를 우연히 발견했다!",
          stats: { Ag: 5, Int: 3, Inf: 3 }
        },
        fail: {
          text: "독성 슬러지 웅덩이에 빠져 피부에 심한 화상을 입었다.",
          wounds: -16,
          corruption: 3
        }
      }
    ],
    source: "Lexicanum: Necromunda"
  },
  {
    id: "ev_hive_plague",
    title: "하층 하이브의 유독 매연과 역병",
    category: "일상",
    req: {
      anyWorldTags: ["hive", "industrial", "forge"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "celestian", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general", "navy_captain", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "guild_magnate", "crime_lord",
        "psyker_primaris", "tempestus_prime",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "하이브/포지 월드 일반 거주자",
    weight: 15,
    text: "공기 정화탑 필터가 3개월째 교체되지 않아 구역 전체에 붉은 기침 역병이 번졌다. 메디카에 의무소의 약품은 상층 첨탑에만 우선 공급된다.",
    choices: [
      {
        label: "[강인 판정] 독한 합성 식량과 빗물을 버텨 내며 자력으로 회복한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "지독한 면역력을 얻어 멀쩡히 살아남았다!",
          stats: { T: 5 }
        },
        fail: {
          text: "폐에 깊은 손상을 입고 긴 병치레를 치렀다.",
          wounds: -20
        }
      },
      {
        label: "[권위 35+ 해금] 연줄을 써서 상층 첨탑의 정제 항생제를 구한다",
        req: { stats: { Inf: 35 } },
        effect: {
          text: "값비싼 약품을 손에 넣어 무사히 넘겼을 뿐 아니라 남은 약으로 주변의 호의까지 샀다.",
          stats: { Fel: 4, Inf: 3 },
          wounds: 8
        }
      }
    ],
    source: "Imperium Maledictum Core"
  },
  {
    id: "ev_shrine_pilgrimage",
    title: "황금 성당의 대순례 행렬",
    category: "일상",
    req: {
      minAge: 12,
      excludeWorldTags: ["krieg", "feral", "death", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "비이단 필멸 제국인",
    weight: 13,
    text: "수십만 순례자들이 횃불을 들고 황제 승천 대축일 행렬을 이루고 있다. 성직자가 기적의 성유를 나누어 주며 신앙의 맹세를 촉구한다.",
    choices: [
      {
        label: "[소로리타스/성직자/커미사르 전용] 행렬의 선두에 서서 황제 신앙의 설교를 주도한다",
        req: { anyTags: ["sororitas", "ecclesiarchy", "commissar", "lord_commissar", "canoness"] },
        effect: {
          text: "수십만 군중이 그대의 열변에 눈물을 흘리며 황제의 이름을 연호했다! 성당의 존경과 권위가 치솟았다.",
          stats: { Fel: 6, WP: 5, Inf: 6 },
          faith: 15,
          corruption: -12
        }
      },
      {
        label: "행렬에 동참해 진심으로 기도하며 영혼을 정화한다",
        effect: {
          text: "마음을 어지럽히던 어두운 상념이 씻겨 내려가고 신앙과 의지가 충만해졌다.",
          stats: { WP: 4, Fel: 2 },
          faith: 12,
          corruption: -10
        }
      },
      {
        label: "[교섭 판정] 순례 행렬에 섞인 상인과 귀족들과 교류해 인맥을 넓힌다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "유력한 길드 상단과 연을 맺어 적잖은 지원과 정보를 얻었다.",
          stats: { Fel: 4, Inf: 6 }
        },
        fail: {
          text: "인파에 떠밀려 소매치기를 당하고 타박상을 입었다.",
          wounds: -8,
          stats: { Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy"
  },
  {
    id: "ev_agri_harvest",
    title: "아그리 월드의 풍년과 궤도 십일조 수확",
    category: "일상",
    req: {
      anyWorldTags: ["agri"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "celestian", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "psyker_primaris", "tempestus_prime",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "아그리 월드 일반 거주자",
    weight: 13,
    text: "올해도 거대한 콤바인이 끝없는 황금빛 곡창 지대를 가로지른다. 제국에서는 드물게 평온한 계절이 찾아왔지만, 궤도의 징세선은 한 톨의 오차도 용납하지 않는다.",
    choices: [
      {
        label: "건강을 돌보며 맑은 대기와 신선한 식량으로 원기를 회복한다",
        effect: {
          text: "하이브 월드의 독가스와는 비교할 수 없는 평온 속에 육신이 튼튼해졌다.",
          stats: { T: 4, WP: 2 },
          wounds: 15
        }
      },
      {
        label: "[지성 판정] 수확 물류와 궤도 수송 일정을 최적화해 공적을 쌓는다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "십일조 납기를 앞당긴 공로로 지역 길드와 행정부의 표창을 받았다.",
          stats: { Int: 4, Inf: 6 }
        },
        fail: {
          text: "거대 콤바인 정비 사고로 팔을 다쳤다.",
          wounds: -14
        }
      }
    ],
    source: "Lexicanum: Agri World"
  },
  {
    id: "ev_world_paradise_hunt",
    title: "낙원 행성의 은밀한 여흥 — 귀족들의 '인간 사냥'",
    category: "부조리",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["paradise"],
      excludeTags: [
        "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 낙원 행성",
    weight: 24,
    text: "에메랄드빛 해변 너머 비공개 사유림. 제국 고위 귀족들이 '사냥감이 말을 하면 더 스릴 있다'며 죄수복을 입힌 하층민을 풀어놓고 사냥총을 겨누고 있다. 그대는 우연히 이 추악한 축제를 목격했다.",
    choices: [
      {
        label: "[아스타르테스/이단심문관/소로리타스/커미사르 전용] 슬라네쉬 타락의 징후로 간주하고 사냥꾼 귀족 일당을 그 자리에서 즉결 처단한다",
        req: { anyTags: ["astartes", "custodes", "inquisitor", "sororitas", "canoness", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 귀족들의 비명 속에 볼터와 심판의 검이 번뜩였다! 방탕과 타락에 물든 사교 모임을 단숨에 정화하고 죄수들을 해방했다.",
          stats: { WP: 6, Inf: 8 },
          faith: 14
        }
      },
      {
        label: "[의지 판정] 이단적 잔혹 행위로 국교와 아르비테스에 고발한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "마침 순찰 중이던 이단심문소 요원에게 첩보가 닿아 타락한 귀족 일당이 슬라네쉬 컬트 혐의로 일망타진되었다!",
          stats: { WP: 6, Inf: 8 },
          faith: 12,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "고발장은 총독의 책상에서 찢겨 버렸고, 그대는 귀족 사병들에게 구타당해 쫓겨났다.",
          wounds: -26,
          stats: { Inf: -6 }
        }
      },
      {
        label: "이 제국에서 귀족의 취미에 참견하는 건 자살 행위다. 못 본 척 침묵한다",
        effect: {
          text: "숲속에서 울려 퍼지는 비명과 샴페인 터지는 소리를 뒤로하고 발걸음을 재촉했다.",
          stats: { Int: 2 },
          faith: -5,
          corruption: 5
        }
      }
    ],
    source: "Dark Heresy 2e: Core Rulebook / Lexicanum: Paradise World"
  },
  {
    id: "ev_voidborn_ghost_deck",
    title: "성간 함선 — 400년 전 봉인된 '유령 하층 갑판' 탐사",
    category: "행성 고유",
    req: {
      minAge: 14,
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "navy_admiral", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [{ anyWorlds: ["voidborn"] }, { anyTags: ["navy", "rogue_trader"] }]
    },
    reqLabel: "보이드본 / 임페리얼 네이비 / 로그 트레이더",
    weight: 24,
    text: "길이 6킬로미터에 달하는 고대 순양함 최하층, 400년 전 워프 폭풍 사고 이후 용접해 닫아 두었던 78번 유령 갑판에서 미세한 구조 신호와 원자로 전력 누수가 감지되었다.",
    choices: [
      {
        label: "[지성 판정] 공학 장비를 챙겨 진입해 전력 누수를 차단하고 고대 선박 로그를 회수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "잊혔던 보조 플라즈마 코어와 고대 보급 창고를 발견해 함대 사령부와 선단 전체의 큰 포상을 얻었다!",
          stats: { Int: 6, Inf: 7, Ag: 3 }
        },
        fail: {
          text: "갑판 내부에 야생화되어 살던 돌연변이 밀항자 무리의 습격을 받아 부상을 입었다.",
          wounds: -24,
          corruption: 4
        }
      },
      {
        label: "[의지 판정] 불경한 기운을 정화하며 격벽 바깥에서 전력선을 안전하게 절단한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "위험한 구역을 열지 않고도 함선의 에너지 손실을 막아 냈다.",
          stats: { WP: 4, Int: 3 }
        },
        fail: {
          text: "고압 아크 방전에 감전되어 화상을 입었다.",
          wounds: -16
        }
      }
    ],
    source: "Rogue Trader: Battlefleet Koronus"
  },
  {
    id: "ev_feral_sky_ship",
    title: "야만 행성 — 불타며 추락한 '하늘 신의 강철 수레'",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 12,
      anyWorldTags: ["feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 봉건·야만 행성",
    weight: 28,
    text: "천둥소리와 함께 제국의 정찰 셔틀 한 척이 부족 숲속에 추락했다! 원시 부족민들은 '하늘 신의 사자가 분노해 떨어졌다'며 공포에 질려 엎드렸다.",
    choices: [
      {
        label: "[의지 판정] 두려움을 이기고 다가가 부상당한 제국 조종사를 구출한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "조종사가 보답으로 신비한 빛나는 칼과 성간 문명 지식을 전해 주었고, 훗날 구조 함대에 그대의 용맹을 알렸다!",
          stats: { Int: 7, WP: 5, Inf: 8 }
        },
        fail: {
          text: "누출된 플라즈마 연료에 심한 화상을 입었지만 조종사는 무사히 구출되었다.",
          wounds: -20,
          stats: { WP: 4 }
        }
      },
      {
        label: "[민첩 판정] 부족 주술사 몰래 추락 잔해에서 강철 단검과 이상한 도구만 챙긴다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "부족 최고의 강철 무기를 얻어 일약 전사장의 반열에 올랐다!",
          stats: { WS: 6, Ag: 4 }
        },
        fail: {
          text: "셔틀의 자동 경보 포탑에 쫓겨 상처를 입고 도망쳤다.",
          wounds: -18
        }
      }
    ],
    source: "Dark Heresy: Feral World"
  },
  {
    id: "ev_s4_world_agri_tithe",
    title: "농업 행성 — 흉작의 해, 십일조 징발선과 종자 창고",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["agri"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "celestian", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "psyker_primaris", "tempestus_prime",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성 유형: 농업 행성",
    weight: 30,
    text: "이상 저온과 곰팡이 병해로 올해 수확량이 절반 이하로 꺾였건만, 궤도에 도착한 아드미니스트라툼 십일조 징발선은 단 1톤의 감면도 허락하지 않았다. 내년에 심을 종자 곡물까지 털어 넣지 않으면 행성 총독이 반역죄로 처형될 위기다.",
    choices: [
      {
        label: "[교섭 판정] 징발선 행정관에게 내년 전멸 시 제국 전체가 입을 손실을 설득해 분할 납부 유예를 얻어 낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "냉혹한 징발관이 통계표를 훑어본 뒤 이례적으로 종자 창고 봉인을 허락했다! 수백만 농민의 내년 목숨을 살렸다.",
          stats: { Fel: 7, Inf: 7, Int: 3 }
        },
        fail: {
          text: "오만한 불경으로 몰려 채찍질 징계를 받았으나, 최소한의 종자 자루만은 몰래 숨겨 두었다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 병해가 덜한 외곽 습지대의 야생 곡물과 영양 조류를 긴급 가공해 부족분을 채워 넣는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "맛은 끔찍했으나 칼로리 기준치를 정확히 통과했다! 종자 창고도 지키고 제국 십일조도 완납하는 기지를 발휘했다.",
          stats: { Int: 7, T: 4, Inf: 5 }
        },
        fail: {
          text: "품질 검사에 걸려 추가 노역을 떠안았으나, 반역 혐의만은 피했다.",
          wounds: -10,
          stats: { T: 4 }
        }
      },
      {
        label: "제국의 법에 따라 종자 창고까지 열어 바치고, 배고픈 겨울을 견딜 채비를 한다",
        effect: {
          text: "인류제국에서 행성 하나의 기아보다 무서운 것은 십일조 미납이다. 굶주림 속에서 끈질기게 버텨 냈다.",
          stats: { T: 5, WP: 5 },
          wounds: -8
        }
      }
    ],
    source: "Lexicanum: Agri-World / Lords of Silence"
  },
  {
    id: "ev_s4_world_paradise_hunt",
    title: "낙원 행성 — 대리석 휴양지 너머의 금지된 외계 맹수 사냥터",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["paradise"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성 유형: 낙원 행성",
    weight: 30,
    text: "에메랄드빛 해변과 대리석 별장이 늘어선 낙원 행성의 이면에는 금지된 밀수 사냥터가 숨겨져 있다. 휴양 온 타 성계 대귀족들이 콜드 트레이드 밀수선으로 반입한 외계 맹수를 사유림에 풀어놓고 사냥을 즐기려던 밤, 정지장이 파손되며 괴수가 하인 거주 구역으로 뛰쳐나왔다. 비명 소리가 울려 퍼지는 야자수 숲 가장자리에서 사냥 책임자들은 스캔들이 새어 나갈까 봐 구조 요청조차 막고 있다.",
    choices: [
      {
        label: "[민첩 판정] 횃불과 연막탄으로 외계 맹수의 시선을 유인해 고립된 하인들을 부두 방벽 너머로 대피시킨다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "사냥개와 괴수의 발톱을 아슬아슬하게 따돌리며 수십 명의 하인을 살려 냈다! 낙원의 가면 뒤에 숨은 양심만큼은 지켜 냈다.",
          stats: { Ag: 7, WP: 5, Fel: 4 }
        },
        fail: {
          text: "괴수의 발톱에 어깨를 스쳐 부상을 입었으나, 다행히 주민들은 모두 방벽 너머로 빠져나갔다.",
          wounds: -16,
          stats: { Ag: 4 }
        }
      },
      {
        label: "[지성 판정] 밀반입된 정지장 화물 전표와 외계 맹수의 흔적을 확보해 오르도 제노스와 아르비테스에 익명 고발한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금지된 외계 생물 밀수 혐의가 포착되자 제국 법집행대가 즉각 사유림을 봉쇄했다! 퇴폐한 귀족 밀렵단과 밀수선이 함께 적발되고 그대는 은밀한 포상을 받았다.",
          stats: { Int: 7, Inf: 6, WP: 4 },
          faith: 6
        },
        fail: {
          text: "귀족들의 뇌물로 화물 전표가 은폐되며 한동안 사병들의 감시를 피해야 했다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "귀족 사병들의 경계선 안으로 물러나 문을 굳게 걸어 잠그고 맹수가 사살되기를 기다린다",
        effect: {
          text: "낙원 행성에서 권력자의 은밀한 치부를 들추면 소리 소문 없이 사라진다. 씁쓸함을 삼키고 아침이 밝기를 기다렸다.",
          stats: { WP: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Paradise World / Dark Heresy 2e: Core Rulebook"
  },
  {
    id: "ev_s4_world_feral_skyiron",
    title: "야만 행성 — 성스러운 산에 박힌 하늘 쇠 운석과 부족의 금기",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 14,
      anyWorldTags: ["feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성 유형: 야만 행성",
    weight: 30,
    text: "밤하늘을 가르는 불기둥과 함께 수천 년 전 궤도 함대전의 잔해로 추정되는 거대한 별빛 금속 덩어리가 부족의 성스러운 산 중턱에 박혔다. 부족 장로들은 하늘 신의 벼락이 떨어진 땅이라며 접근을 금하지만, 녹아내린 바위 틈에서 드러난 푸른빛 하늘 쇠는 청동과 돌도끼를 단번에 베어 넘길 만큼 단단하다. 이웃 적대 부족의 정찰대마저 어둠을 틈타 산등성이로 기어오르는 기척이 감지된다.",
    choices: [
      {
        label: "[강인 판정] 뜨거운 열기가 가시지 않은 운석 구덩이를 올라 하늘 쇠 광맥을 캐내고 덤벼드는 적대 부족 정찰대를 물리친다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "절대 부러지지 않는 하늘 쇠 검신을 벼려 낼 원석을 확보했다! 부족 전사들이 그대를 성스러운 산의 축복을 받은 용사로 우러렀다.",
          stats: { T: 6, WS: 6, Inf: 5 }
        },
        fail: {
          text: "뜨거운 광석 파편에 손바닥을 데이고 바위에서 굴러 부상을 입었으나, 단단한 쇳조각 몇 개는 끝내 지켜 냈다.",
          wounds: -14,
          stats: { T: 4, WS: 3 }
        }
      },
      {
        label: "[지성 판정] 하늘 쇠의 결을 살펴 부족 대장간에서 녹여 낼 풀무 온도와 합금 제련법을 고안해 낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "보통 화덕으로는 꿈쩍도 않던 별빛 금속을 숯불과 송풍 기술로 가공하는 데 성공했다! 부족의 무기가 한 세대 앞선 강철로 탈바꿈했다.",
          stats: { Int: 7, Fel: 5, Inf: 6 }
        },
        fail: {
          text: "무리하게 열을 올리다 토기 도가니가 터져 화상을 입고 장로들의 원성을 샀다.",
          wounds: -10,
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "장로들의 금기를 존중해 성스러운 산 둘레에 경계 표식을 세우고 이웃 부족의 침범만 막아 낸다",
        effect: {
          text: "알 수 없는 하늘의 쇠붙이는 종종 피비린내 나는 부족 전쟁을 부른다. 침착한 경계로 부족의 평온을 지켜 원로들의 신임이 두터워졌다.",
          stats: { WP: 5, Fel: 4 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Feral World / Warhammer 40k Core Rulebook"
  },
  {
    id: "ev_s4_world_hive_water",
    title: "하이브 월드 — 중층 정수관 파열과 하층 구역의 물 전쟁",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["hive"],
      excludeWorlds: ["terra", "krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "celestian", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general", "navy_captain", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "guild_magnate", "crime_lord",
        "psyker_primaris", "tempestus_prime",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성 유형: 하이브 월드 · 일반·하층 시민",
    weight: 28,
    text: "거대 하이브 중층부를 관통하는 주 재활용 정수관이 부식되어 터지면서 하층 세 개 구역의 식수 배급이 사흘째 끊겼다. 길드 용병대가 남은 물탱크를 독점하고 값을 열 배로 올려 받자, 목마른 주민들이 쇠막대기를 들고 몰려들기 시작했다.",
    choices: [
      {
        label: "[지성 판정] 버려진 구세대 냉각수 우회 배관을 찾아내어 직접 용접해 임시 식수 공급을 복구한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "녹슨 배관에서 다시 맑은 물이 쏟아지자 구역 전체가 환호했다! 길드도 그대의 실력을 인정해 정비 감독직을 제안했다.",
          stats: { Int: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "배관 압력에 밀려 타박상을 입었으나, 급한 대로 식수 누수만은 막아 냈다.",
          wounds: -12,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[교섭 판정] 길드 우두머리와 주민 대표 사이에 서서 폭동으로 탱크가 부서지기 전에 적정 가격 협상을 타결한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "피를 흘리지 않고 배급이 재개되었다! 하이브 하층에서 그대의 중재력이 입소문을 타기 시작했다.",
          stats: { Fel: 7, Inf: 6, WP: 3 }
        },
        fail: {
          text: "양쪽 모두에게 욕을 먹으며 협상이 결렬되어 겨우 몸만 빠져나왔다.",
          wounds: -10,
          stats: { Fel: 2 }
        }
      },
      {
        label: "소동에 휘말리지 않고 미리 모아 둔 비상 식수를 아껴 마시며 수리반이 오기를 버틴다",
        effect: {
          text: "하이브에서는 남의 싸움에 끼어들지 않는 자가 오래 산다. 갈증을 견디며 위기를 넘겼다.",
          stats: { T: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Necromunda Core Rulebook"
  },
  {
    id: "ev_s4_world_civilised_census",
    title: "문명 행성 — 백 년 만에 찾아온 제국 인구조사관과 징집 추첨",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["civilised"],
      anyCareers: ["menial_worker", "guild_artisan", "underhive_ganger", "pdf_trooper"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성 유형: 문명 행성 · 시민·행성 방위군",
    weight: 28,
    text: "그나마 평온하던 문명 행성의 시청 광장에 백 년 만에 아드미니스트라툼 인구조사단이 도착했다. 성계 밖 전쟁으로 병력이 부족해지자, 올해 아스트라 밀리타룸 징집 할당량을 평소보다 세 배 늘려 무작위 추첨을 실시하겠다는 포고령이 떨어졌다.",
    choices: [
      {
        label: "[교섭 판정] 구역 장인들과 기술 인력의 필수 잔류 청원서를 취합해 조사관과 현실적인 대체 징집안을 타협한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행성 산업이 마비되는 것을 막으면서도 징집 할당량을 채우는 타협안이 통과되었다! 시민들의 감사와 관청의 신임을 동시에 얻었다.",
          stats: { Fel: 7, Inf: 6, Int: 4 }
        },
        fail: {
          text: "징집 방해 혐의로 경고를 받아 한동안 시청 근처에도 얼씬하지 못했다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 황제의 부름을 피하지 않겠다며 군사 물자 모금과 신병 훈련 지원을 앞장서 조직한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "침울하던 광장에 자부심이 되살아났다! 제국 조사관이 그대의 애국심을 높게 평가해 표창장을 내렸다.",
          stats: { WP: 6, Fel: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "징집을 두려워하는 가족들의 차가운 시선 속에 힘든 나날을 보냈으나, 임무만은 마쳤다.",
          stats: { WP: 4, Fel: -2 }
        }
      },
      {
        label: "추첨 명단에 내 이름이 뜨지 않기를 조용히 빌며 묵묵히 생업을 이어 간다",
        effect: {
          text: "운 좋게 이번 추첨은 비껴갔다. 평범한 일상이 얼마나 귀한지 다시금 깨달았다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Civilised World / Imperial Tithe"
  },
  {
    id: "ev_s4_world_voidborn_air",
    title: "보이드본 — 세대 간 선체 격벽 분쟁과 산소 정화기 수리",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["voidborn"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "celestian", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general", "navy_captain", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "guild_magnate", "crime_lord",
        "psyker_primaris", "tempestus_prime",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "출신/거주: 보이드본 · 성간 함선 사회",
    weight: 30,
    text: "수백 년째 항해 중인 거대 성간 함선의 하부 거주 구역. 7번 갑판과 8번 갑판 씨족이 낡은 산소 정화기 배당량을 놓고 쇠사슬과 리벳 건을 든 채 대치하고 있다. 이대로 격벽 안쪽에서 싸움이 벌어지면 두 구역 모두 공기 순환이 끊겨 질식할 위기다.",
    choices: [
      {
        label: "[지성 판정] 선체 설계도 조각을 꿰맞춰 막혀 있던 6번 보조 정화 덕트를 뚫어 양쪽 모두의 산소량을 늘린다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시원한 재생 공기가 양 갑판으로 쏟아져 들어오자 씨족 장로들이 무기를 내려놓았다! 함선의 숨결을 되살린 은인으로 추앙받았다.",
          stats: { Int: 7, Inf: 6, Ag: 3 }
        },
        fail: {
          text: "좁은 환기 덕트 안에서 산소 부족으로 쓰러질 뻔했으나, 겨우 막힌 필터만은 떼어 냈다.",
          wounds: -12,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[교섭 판정] 함선 공용 규약을 들어 '격벽에 구멍이 나면 모두가 공허에 삼켜진다'고 양 씨족을 설득한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "보이드본이라면 누구나 두려워하는 진공의 공포가 분노를 잠재웠다! 양 갑판이 교대 정비 협정을 맺었다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "양측의 욕설과 몸싸움에 휘말려 멍이 들었으나, 보안대가 오기 전 총격전만은 막았다.",
          wounds: -12,
          stats: { Fel: 3 }
        }
      },
      {
        label: "자신의 거주 구역 기밀 격벽만 단단히 잠그고 함선 보안대의 진압을 기다린다",
        effect: {
          text: "우주선에서 가장 먼저 배워야 할 것은 언제 격벽을 닫아야 하는가이다. 무사히 소동을 넘겼다.",
          stats: { WP: 4, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Voidborn / Rogue Trader Core Rulebook"
  }
];
