// 분기 사건 — 신성한 테라 전용 (1:1 단독 승격)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_world_terra_pilgrim",
    title: "신성한 테라 — 순례자의 길과 압사 행렬",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: [
        "custodes", "astartes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 비초인 제국인",
    weight: 24,
    text: "황궁 영원의 문을 향해 3세대째 줄을 서 온 수백만 순례자 행렬이 갑자기 무너졌다! 성스러운 관문을 보려는 군중이 서로를 짓밟는 가운데, 아드미니스트라툼 서기관은 위층 발코니에서 사망자 수만 차분히 세고 있다.",
    choices: [
      {
        label: "[강인 판정] 짓밟히는 노인과 아이를 일으켜 세우며 행렬을 버텨 낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "기적적으로 순례자 대여섯을 구하고 황궁 첨탑의 황금빛을 두 눈으로 마주했다! 가슴 깊이 신앙이 타오른다.",
          stats: { T: 4, WP: 6, Fel: 4 },
          faith: 14
        },
        fail: {
          text: "군중에 깔려 늑골이 부러졌으나, 순례 행렬은 멈추지 않고 그대의 등을 밟고 지나갔다.",
          wounds: -24,
          faith: 4
        }
      },
      {
        label: "[권위 40+ 해금] 귀족·관료 전용 우회 회랑 통행증을 제시해 빠져나간다",
        req: { stats: { Inf: 40 } },
        effect: {
          text: "비명 소리를 발밑에 둔 채 대리석 회랑을 우아하게 걸어 황궁 성소에 참배했다.",
          stats: { Inf: 4, WP: 3 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Terra / Vaults of Terra"
  },
  {
    id: "ev_terra_administratum_war",
    title: "신성한 테라 — 아드미니스트라툼 '양피지 내전'",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: [
        "custodes", "astartes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 비초인 제국인",
    weight: 28,
    text: "테라 중앙 서고 412구역에서 '고대 세금 장부 보관파'와 '소각 후 재활용파' 서기관 길드가 오토건과 인장 도장을 들고 무장 충돌을 벌였다! 수백 년 된 양피지 산더미에 불이 붙어 복도가 아수라장이 되었다.",
    choices: [
      {
        label: "[이단심문관/아르비테스/커미사르 전용] 제국 공권력을 선포해 양쪽 서기관 길드장을 즉각 체포한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 법집행의 호령 앞에 무장 서기관들이 깃펜과 총을 내려놓고 엎드렸다! 상급 아뎁트가 감사의 뜻으로 권위를 보증했다.",
          stats: { Inf: 7, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 불타는 서고에서 황금 봉인이 찍힌 핵심 칙령 원본만 골라 구출한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "800년 된 테라 성계 십일조 원본을 지켜 냈다! 아드미니스트라툼 고위 관료가 두둑한 보상을 내렸다.",
          stats: { Int: 5, Inf: 7 }
        },
        fail: {
          text: "무너지는 양피지 책장에 깔려 타박상과 연기 흡입으로 고생했다.",
          wounds: -18
        }
      },
      {
        label: "[민첩 판정] 미친 관료들의 총격전을 피해 인접 성당 회랑으로 재빨리 대피한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "유탄을 아슬아슬하게 피하고 안전 구역으로 빠져나왔다. 테라에서는 관료 싸움에 끼면 목숨이 열 개라도 모자란다.",
          stats: { Ag: 4 }
        },
        fail: {
          text: "도망치다 서기관이 던진 청동 도장에 이마를 맞아 찢어졌다.",
          wounds: -14
        }
      }
    ],
    source: "Vaults of Terra: The Carrion Throne"
  },
  {
    id: "ev_terra_water_cartel",
    title: "신성한 테라 — 마른 행성의 물 카르텔 암시장",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: [
        "custodes", "astartes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 비초인 제국인",
    weight: 26,
    text: "바다가 모두 말라 버린 테라에서 정제수 1리터는 금화보다 귀하다. 구역 수압 펌프가 고장 나자 지하 물 카르텔이 '수분 회수 탱크'를 끼고 폭리를 취하며 시민들을 쥐어짜고 있다.",
    choices: [
      {
        label: "[권위 42+ 또는 귀족 전용] 상층 수자원국에 직통 전보를 쳐 카르텔 창고를 몰수·개방한다",
        req: { or: [{ stats: { Inf: 42 } }, { allTags: ["noble"] }] },
        effect: {
          text: "귀족·관료의 위세 앞에 암시장 두목이 꽁지를 빼고 달아났다! 구역 시민들이 그대를 은인으로 기렸다.",
          stats: { Inf: 6, Fel: 6 },
          wounds: 6
        }
      },
      {
        label: "[백병 판정] 카르텔 경비원을 제압하고 갇혀 있던 공용 식수 밸브를 강제로 연다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "물줄기가 터져 나오자 환호성이 울렸다! 갈증을 해갈하고 하층 구역의 신뢰를 얻었다.",
          stats: { WS: 4, Fel: 5 },
          wounds: 8
        },
        fail: {
          text: "카르텔 사병들의 몽둥이 세례에 얻어맞고 물 한 모금 못 얻은 채 쫓겨났다.",
          wounds: -20
        }
      },
      {
        label: "비싼 값을 치르고서라도 암시장 물을 사서 버틴다",
        effect: {
          text: "재산과 인맥을 좀 잃었지만, 테라의 메마른 열기 속에서 건강만은 지켜 냈다.",
          stats: { Inf: -3 },
          wounds: 5
        }
      }
    ],
    source: "Lexicanum: Terra / Vaults of Terra"
  },
  {
    id: "ev_terra_astronomican_choir",
    title: "신성한 테라 — 아스트로노미칸 성가대의 행렬",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 12,
      anyWorlds: ["terra"],
      excludeTags: [
        "high_lord_terra", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라",
    weight: 28,
    text: "히말라지아 산맥 공허의 산에 우뚝 솟은 거대한 아스트로노미칸 성채를 향해, 흰 로브를 걸친 수천 명의 젊은 사이커들이 경건한 찬송을 부르며 걸어간다. 칠흑 같은 워프의 폭풍을 뚫고 인류의 항로를 비추는 황제의 등불을 지피기 위해, 저들은 매일 수백 명씩 영혼을 불태워 소멸할 운명이다.",
    choices: [
      {
        label: "[사이커 전용 · 의지 판정] 그들의 영혼 공명에 정신을 맞추며 황제의 등불을 깊이 느낀다",
        req: { allTags: ["psyker"] },
        check: { stat: "WP", diff: 5 },
        success: {
          text: "눈부신 황금빛 공명이 영혼의 잡음을 모조리 태워 버렸다! 사이킥 제어력이 비약적으로 상승했다.",
          stats: { WP: 7, Int: 4 },
          faith: 12,
          corruption: -10
        },
        fail: {
          text: "압도적인 황제의 빛에 감각이 과부하되어 코피를 쏟으며 쓰러졌다.",
          wounds: -16,
          stats: { WP: 3 }
        }
      },
      {
        label: "무릎을 꿇고 인류의 항로를 비추는 숭고한 희생자들에게 경의를 표한다",
        effect: {
          text: "장엄하고도 처절한 희생의 행렬을 바라보며 제국의 무게와 신앙을 깊이 새겼다.",
          stats: { WP: 4 },
          faith: 10,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Astronomican"
  },
  {
    id: "ev_terra_high_lords",
    title: "신성한 테라 — 테라의 하이 로드 행차와 도로 정화",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라",
    weight: 24,
    text: "테라의 하이 로드 중 한 명이 황금 반중력 가마를 타고 대로로 행차한다! 선두의 아르비테스와 군악대가 '길바닥에 3초 안에 엎드리지 않는 자는 즉결 처형'이라며 몽둥이를 휘두르고 있다.",
    choices: [
      {
        label: "[권위 50+ 또는 귀족/아스타르테스 전용] 귀빈석 회랑에서 당당히 예의를 갖추어 눈도장을 찍는다",
        req: { or: [{ stats: { Inf: 50 } }, { anyTags: ["noble", "astartes", "inquisitor", "lord_commissar", "canoness"] }] },
        effect: {
          text: "하이 로드의 수행 비서관이 그대의 품격과 신분을 눈여겨보며 황궁 만찬 초대장을 건넸다!",
          stats: { Inf: 8, Fel: 4 }
        }
      },
      {
        label: "먼지투성이 돌바닥에 재빨리 이마를 대고 행차가 지나갈 때까지 숨을 죽인다",
        effect: {
          text: "황금 가마의 반중력 열풍이 등 위를 스치고 지나갔다. 살아남았으니 그걸로 충분하다.",
          stats: { Ag: 2, WP: 2 }
        }
      }
    ],
    source: "Watchers of the Throne: The Emperor's Legion"
  },
  {
    id: "ev_terra_deep_strata",
    title: "신성한 테라 — 최하층 고대 지층의 1만 년 전 유물",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["terra"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라",
    weight: 26,
    text: "테라 지표면 아래 12킬로미터, 고대 통합 전쟁 시대의 시멘트 유적이 하수도 공사 중 드러났다. 벽면에는 황제께서 인류를 통합하던 시기의 낯선 고대 문양과 썬더 워리어의 부러진 갑주 조각이 박혀 있다!",
    choices: [
      {
        label: "[지성 판정] 역사적 가치를 알아보고 비밀리에 탁본과 성분을 기록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "일반 시민은 존재조차 몰라야 할 1만 년 전 인류의 진실을 엿보았다! 깊은 통찰을 얻었다.",
          stats: { Int: 8, WP: 4 }
        },
        fail: {
          text: "고대 방사능 잔류 물질에 노출되어 한동안 극심한 구토와 탈진에 시달렸다.",
          wounds: -20
        }
      },
      {
        label: "금지된 고대 유적이다. 즉시 쿠스토데스나 이단심문소 연락관에게 신고하고 봉쇄한다",
        effect: {
          text: "몇 시간 뒤 황금 갑주와 검은 제복이 유적을 통째로 밀봉했다. 충성스러운 신고에 비밀 포상이 떨어졌다.",
          stats: { Inf: 7, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Unification Wars / Terra"
  },
  {
    id: "ev_terra_pilgrim_scam",
    title: "신성한 테라 — 순례자 숙소와 가짜 황궁 통행증",
    category: "부조리",
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: [
        "custodes", "astartes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "noble", "high_lord_terra",
        "warmaster", "sector_lord", "planetary_governor", "cardinal", "canoness",
        "lord_commissar", "commissar_general", "magos", "fabricator_locum", "fabricator_general",
        "navy_admiral", "arbites_marshal", "departmento_head", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 일반 시민",
    weight: 24,
    text: "수십 광년 너머에서 전 재산을 팔아 온 순례자들에게 악덕 브로커가 '황궁 직행 급행 통행증'을 팔아넘기고 있다. 자세히 보니 300년 전 폐기된 하수도 출입증에 금칠만 덧입힌 사기다.",
    choices: [
      {
        label: "[교섭 판정] 사기극을 폭로하고 브로커를 인근 아르비테스 순찰대에 넘긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "브로커가 즉석에서 체포되었고, 감격한 순례자들이 눈물을 흘리며 축복을 빌어 주었다.",
          stats: { Fel: 5, Inf: 4 },
          faith: 8
        },
        fail: {
          text: "브로커와 결탁한 부패 경비원에게 오히려 '공무 방해'로 얻어맞았다.",
          wounds: -18
        }
      },
      {
        label: "테라에서 남의 일에 끼어들면 손해다. 조용히 제 갈 길을 간다",
        effect: {
          text: "속은 순례자들은 평생 영원의 문 문턱도 못 보고 굶어 죽겠지만, 그것이 테라의 일상이다.",
          stats: { Int: 2 }
        }
      }
    ],
    source: "Vaults of Terra"
  },
  {
    id: "ev_s15_core_terra_1",
    title: "신성한 테라 — 황궁 외성문 검문소와 루시퍼 블랙",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeHomeWorlds: ["terra"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "cardinal", "departmento_head",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 외지 파견자",
    weight: 30,
    text: "황궁 외벽을 둘러싼 거대한 흑요석 성문 앞, 칠흑 같은 갑주에 은빛 문장을 새긴 루시퍼 블랙 근위대가 외지 파견자와 무장 순례객을 한 명씩 세워 검문하고 있다. 1만 년 전부터 황궁의 외곽을 지켜 온 정예 병사들의 창끝이 그대의 통행 인장과 무장 허가서를 차갑게 겨눈다.",
    choices: [
      {
        label: "[제국 무관/고위 직무 전용] 공식 파견 명령서와 직인을 제시해 정식 예우로 통과한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "commissar", "lord_commissar", "officer", "sororitas", "arbites", "navy", "rogue_trader", "magos"] },
        effect: {
          text: "루시퍼 블랙 지휘관이 인장의 진위를 확인하고는 절도 있게 경례했다. 외지 출신으로는 드물게 지연 없이 황궁 외성 관할 회랑으로 안내받았다.",
          stats: { Inf: 6, WP: 3 },
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 침착한 하이 고딕 예법으로 출입 경위를 소명하며 심사를 통과한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "군더더기 없는 보고와 단정한 태도에 근위 장교가 고개를 끄덕였다. 무장 봉인을 마친 뒤 성문 너머의 황금빛 첨탑을 올려다볼 수 있었다.",
          stats: { Fel: 5, Inf: 4, WP: 3 },
          faith: 6
        },
        fail: {
          text: "외지 억양과 서류 누락을 트집 잡혀 몇 시간이나 땡볕 아래 대기한 끝에 거친 몸수색과 구타까지 당하고서야 풀려났다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[의지 판정] 위압적인 창끝 앞에서 눈 한 번 깜빡이지 않고 묵묵히 검문을 견딘다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "루시퍼 블랙의 매서운 시선에도 흔들리지 않는 담력을 보여 주었다. 검문을 마친 고참 근위병이 조용히 경의를 담아 길을 비켜 주었다.",
          stats: { WP: 6, T: 3 },
          faith: 8
        },
        fail: {
          text: "숨 막히는 압박감 속에 발을 헛디디자 근위병의 창대에 어깨가 세게 밀쳐져 돌바닥에 쓰러졌다.",
          wounds: -16,
          stats: { WP: -2 }
        }
      }
    ],
    source: "Lexicanum: Lucifer Blacks / Watchers of the Throne"
  },
  {
    id: "ev_s15_core_terra_2",
    title: "신성한 테라 — 아스트로패스 성가대 구역의 텔레파시 폭풍",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["terra"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "blank", "sister_of_silence",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 비초인 제국인",
    weight: 29,
    text: "아뎁투스 아스트라 텔레파티카의 첨탑 구역을 지나는 순간, 은하 외곽에서 밀려든 대규모 성간 전문이 뒤엉키며 격렬한 텔레파시 폭풍이 터져 나왔다! 색유리 창이 일제히 산산조각 나고, 성가대 사이커들의 비명과 함께 차가운 워프 여진이 복도 전체를 휩쓴다.",
    choices: [
      {
        label: "[사이커/이단심문소 전용] 헥사그램 방진과 성가대 차단 의식을 펼쳐 워프 여진을 봉쇄한다",
        req: { anyTags: ["psyker", "inquisitor", "inquisition_agent"] },
        effect: {
          text: "정신 방벽을 세우고 공명 차단 인장을 작동시켜 폭주하던 성가대 회로를 안정시켰다! 아스트라 텔레파티카 상급 아뎁트가 깊이 감사하며 공적을 기록했다.",
          stats: { WP: 6, Int: 5, Inf: 5 },
          faith: 8,
          corruption: -6
        }
      },
      {
        label: "[의지 판정] 황제의 기도문을 외며 환청을 버티고 쓰러진 서기관들을 대피시킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "머릿속을 긁는 타인들의 기억 수천 갈래를 신앙으로 밀어내고 부상자들을 안전 격벽 밖으로 끌어냈다.",
          stats: { WP: 6, Fel: 4 },
          faith: 10,
          corruption: -4
        },
        fail: {
          text: "폭주하는 사이킥 메아리가 정신을 후벼 파자 코피를 쏟고 쓰러졌다. 한동안 귓가에서 낯선 비명이 사라지지 않았다.",
          wounds: -16,
          corruption: 8,
          stats: { WP: -2 }
        }
      },
      {
        label: "[지성 판정] 비상 격벽 제어반을 찾아 육중한 헥사그램 차폐문을 수동으로 내린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "배전반의 고대 기호를 해독해 순식간에 헥사그램 차폐문을 닫아 폭풍의 확산을 막아 냈다. 경비대가 그대의 기지를 높이 평가했다.",
          stats: { Int: 5, Inf: 4 }
        },
        fail: {
          text: "제어반이 과전류로 폭발하며 팔에 심한 화상을 입고 바닥으로 튕겨 나갔다.",
          wounds: -18,
          stats: { Ag: -2 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Astra Telepathica / Vaults of Terra"
  },
  {
    id: "ev_s15_core_terra_3",
    title: "신성한 테라 — 하층 대성당의 성유물 호송과 상원 파벌의 암투",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["terra"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 신성한 테라 · 16세 이상 · 비초인 제국인",
    weight: 28,
    text: "황궁 하층 대성당 회랑에서 고대 제국 성인의 유골함을 옮기는 호송대가 멈춰 섰다. 성유물의 안치 권한을 놓고 에클레시아키 추기경 측 성당 호위대와 아드미니스트라툼 상원 의회 파벌 호위대가 팽팽히 대치하고 있다. 이대로 충돌하면 신성한 구역이 피로 물들 판이다.",
    choices: [
      {
        label: "[귀족/고위 관료/국교 전용] 상원 의전 관례를 인용해 양측의 체면을 살리는 공동 안치안을 중재한다",
        req: { anyTags: ["noble", "administratum", "ecclesiarchy", "sororitas", "inquisitor", "rogue_trader"] },
        effect: {
          text: "격식 있는 하이 고딕 문구와 법령 조항을 들이밀자 두 파벌 대표가 체면을 지킬 명분을 얻고 물러섰다. 양측 모두 그대의 정치적 수완을 기억하게 되었다.",
          stats: { Inf: 7, Fel: 5, Int: 3 },
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 성유물이 훼손되면 양측 모두 불경죄로 처벌받을 것이라며 휴전을 설득한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "성인의 유골함 앞에서 사리사욕을 다툰다는 지적에 양측 수행원이 찔린 표정으로 무기를 거두었다. 호송대는 무사히 대성당으로 향했다.",
          stats: { Fel: 6, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "주제넘은 참견이라는 호통과 함께 양쪽 호위대에게 떠밀려 대리석 계단 아래로 굴러떨어졌다.",
          wounds: -15,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[백병 판정] 양측이 뒤엉킨 혼란 속에서 성유물 가마를 몸으로 막아 끝까지 호위한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "날아오는 곤봉과 밀려드는 인파를 온몸으로 막아 성유물 가마에 흠집 하나 남기지 않았다! 대성당 사제들이 깊은 경의를 표했다.",
          stats: { WS: 5, T: 4, Inf: 4 },
          faith: 10
        },
        fail: {
          text: "난투극에 휘말려 늑골과 팔에 심한 타박상을 입고 호송 대열에서 밀려났다.",
          wounds: -20,
          stats: { Fel: -2 }
        }
      }
    ],
    source: "Watchers of the Throne: The Regent's Shadow / Vaults of Terra"
  }
);
