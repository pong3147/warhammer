// 분기 사건 — 세그멘툼 솔라 행성 고유 (신성한 테라 · 화성 · 아마겟돈 · 네크로문다 / 향후 행성별 단독 승격 가능)
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
    id: "ev_world_mars_archaeotech",
    title: "화성 적색 사막 — 모래 폭풍이 드러낸 기술의 암흑기 주조소",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["mars"],
      excludeTags: [
        "fabricator_general", "high_lord_terra", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 화성",
    weight: 24,
    text: "화성 북부 철분 사막을 휩쓴 거대한 녹슨 모래 폭풍이 수천 년 동안 파묻혀 있던 기술의 암흑기 시대의 지하 주조소 입구를 드러냈다. 현장 책임자인 상급 테크프리스트는 오염된 고대 기계령이 깨어날 수 있다며 즉각 봉쇄를 명했지만, 스캐너에는 인류가 잃어버린 고대 합금 제련 회로가 선명히 포착되어 있다.",
    choices: [
      {
        label: "[테크프리스트/마고스 전용] 고위 기계교 암호와 누스피어 스캐너로 봉인된 주조소의 설계 데이터를 정밀 추출한다",
        req: { anyTags: ["tech_priest", "magos"] },
        effect: {
          text: "성스러운 고위 권한으로 고대 기계령을 진정시키고 잊힌 합금 제련 설계 일부를 안전하게 추출했다! 화성 의회에서 그대의 이름이 거론되었다.",
          stats: { Int: 8, Inf: 10 }
        }
      },
      {
        label: "[지성 판정] 옴니시아의 이름으로 탐사 서보스컬을 보내 고대 회로를 기록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금지된 경계를 넘지 않고도 고대 합금 제련 수식을 확보해 화성 주조소의 큰 포상을 받았다!",
          stats: { Int: 7, Inf: 8 }
        },
        fail: {
          text: "고대 방어 체계의 전자기 펄스에 신경 회로가 타 버려 큰 부상을 입었다.",
          wounds: -24,
          stats: { Int: 2 }
        }
      },
      {
        label: "규율에 복종해 즉시 봉쇄선 뒤로 물러나 기계령 진정 기도를 올린다",
        effect: {
          text: "화성에서는 궁금해하지 않는 자가 가장 오래 산다. 기계교 상부가 그대의 순명을 치하했다.",
          stats: { WP: 4, Inf: 3 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Mars / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_world_armageddon_ash",
    title: "아마겟돈 — 잿빛 황무지 포자 소각전",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 942,
      anyWorlds: ["armageddon"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 아마겟돈 · 942.M41 이후",
    weight: 24,
    text: "헬스리치 하이브 외곽의 유독성 잿빛 황무지에서 지난 전쟁 때 흩어진 오크 포자가 야생 페럴 오크 무리로 자라났다! 산성 폭풍이 몰려오기 전에 화염방사기로 둥지를 태워야 한다.",
    choices: [
      {
        label: "[강인 판정] 방독면을 고쳐 쓰고 화염방사기를 메어 오크 둥지로 진격한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "맹렬한 프로메튬 불길로 오크 둥지를 완전히 재로 만들었다! 하이브 방위청이 공로를 인정했다.",
          stats: { T: 5, BS: 4, Inf: 5 }
        },
        fail: {
          text: "산성 모래바람에 방독면 필터가 녹아내려 폐에 심한 손상을 입었다.",
          wounds: -24,
          stats: { T: 2 }
        }
      },
      {
        label: "[민첩 판정] 키메라 장갑차 정찰대로 우회해 외곽 잔당만 정리한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "기동력을 살려 무사히 정찰과 소탕을 완수했다.",
          stats: { Ag: 4, BS: 4 }
        },
        fail: {
          text: "황무지 함정에 차량이 전복되어 타박상을 입었다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Armageddon"
  },
  {
    id: "ev_world_necromunda_house",
    title: "네크로문다 — 6대 클랜 하우스의 암거래 의뢰",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "sororitas", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 비초인 필멸자",
    weight: 24,
    text: "하이브 프리무스의 거대 세력인 첨단 기술 클랜 하우스 반 사르와 독극물 화공에 능한 하우스 에셔가 동시에 밀수 화물 호위를 제안해 왔다. 네크로문다에서 중립이란 곧 양쪽 모두의 표적이 된다는 뜻이다.",
    choices: [
      {
        label: "[이단심문관/아르비테스/커미사르 전용] 밀수 접선지를 통째로 급습해 양쪽 클랜 수장을 심문·압수한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 법집행의 철퇴 앞에 하이브 클랜들이 고개를 숙였다! 밀수된 금지 장비와 막대한 첩보를 압수했다.",
          stats: { Inf: 10, Int: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 하우스 반 사르의 고대 방사능 슈트 밀반입을 돕는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "정밀한 보안 해제로 보수를 두둑이 챙기고 첨단 기술 지식까지 훔쳐 배웠다!",
          stats: { Int: 6, Inf: 6, BS: 3 }
        },
        fail: {
          text: "반 사르 슈트의 방사선 누출에 피폭되어 병석에 누웠다.",
          wounds: -22
        }
      },
      {
        label: "[교섭 판정] 양쪽의 정보를 슬쩍 맞교환해 더 큰 몫을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "능숙한 양다리 협상으로 언더하이브와 미드하이브 양쪽에서 막대한 연줄을 얻었다!",
          stats: { Fel: 6, Inf: 8 }
        },
        fail: {
          text: "속임수가 탄로 나 에셔 갱단의 독침 암살자에게 습격당했다!",
          wounds: -26,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Lexicanum: Necromunda"
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
    id: "ev_mars_titan_march",
    title: "화성 — 신의 기계 타이탄 군단 성전 출격 사열",
    category: "행성 고유",
    req: {
      minAge: 12,
      anyWorlds: ["mars"],
      excludeTags: [
        "dreadnought", "high_lord_terra", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 화성",
    weight: 26,
    text: "철의 고리 우주공항 진입로가 지진처럼 울린다! 화성 수호 군단 레기오 이그나툼 소속 워로드급 타이탄 세 기가 진홍과 황금 장갑을 번뜩이며 성전 수송선으로 행진한다. 귀청을 찢는 워혼 경적 소리가 붉은 대기를 가르자, 연도의 모든 기계교도와 노동자가 일제히 무릎을 꿇는다.",
    choices: [
      {
        label: "[기계교 전용] 이진법 찬가를 합창하며 타이탄 중대의 출격 데이터 스트림에 경건히 접속한다",
        req: { anyTags: ["mechanicus"] },
        effect: {
          text: "신의 기계가 뿜어내는 장엄한 기계령의 울림이 회로를 적셨다! 기술적 영감이 폭발한다.",
          stats: { Int: 6, WP: 5, Inf: 4 }
        }
      },
      {
        label: "[의지 판정] 뼈까지 울리는 워혼의 굉음 속에서 끝까지 고개를 들고 신의 기계 행렬을 눈에 새긴다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "압도적인 위압감을 이겨 내고 강철 신들의 장엄한 위용을 똑바로 마주했다! 어떤 적 앞에서도 물러서지 않을 담력이 자리 잡았다.",
          stats: { WP: 6, T: 3 },
          faith: 8
        },
        fail: {
          text: "귀청을 찢는 초저주파 진동에 고막이 욱신거리고 코피를 쏟으며 주저앉았다.",
          wounds: -10,
          stats: { WP: 2 }
        }
      },
      {
        label: "압도적인 전쟁 병기의 위용을 경외하며 무릎 꿇고 기도한다",
        effect: {
          text: "저 강철의 신이 인류 편에 서 있는 한 제국은 무너지지 않으리라는 확신이 가슴을 채웠다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Collegia Titanica / Legio Ignatum"
  },
  {
    id: "ev_necromunda_spyrer",
    title: "네크로문다 — 상층 스파이어러 귀족 사냥단 습격!",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "noble", "astartes", "custodes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "high_lord_terra", "warmaster", "sector_lord",
        "planetary_governor", "magos", "fabricator_locum", "fabricator_general",
        "canoness", "cardinal", "lord_commissar", "commissar_general",
        "navy_admiral", "arbites_marshal", "departmento_head", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 하층 거주자",
    weight: 26,
    text: "어두운 언더하이브 복도에 번쩍이는 첨단 외계·고대 슈트를 입은 괴한들이 나타났다! 상층 첨탑 귀족 자제들이 성인식 겸 재미 삼아 하층민을 사냥하러 내려오는 '스파이어러 사냥단'이다!",
    choices: [
      {
        label: "[민첩 판정] 폐쇄된 증기 파이프 미로로 기어들어가 열화상 추적을 따돌린다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "고온 증기 속에 체온을 감추어 살인 귀족들의 추적을 완벽히 뿌리쳤다!",
          stats: { Ag: 6, Int: 4 }
        },
        fail: {
          text: "에너지 발톱에 등을 베였으나 가까스로 폐기물 슈트로 뛰어내려 목숨을 건졌다.",
          wounds: -28
        }
      },
      {
        label: "[백병 판정] 어차피 죽을 바엔 부비트랩을 터뜨려 귀족 놈 하나라도 끌어내린다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "고압 화학 탱크를 터뜨려 스파이어러 한 명을 쓰러뜨렸다! 언더하이브 전역에 전설로 회자되었다!",
          stats: { WS: 7, Inf: 8, WP: 5 }
        },
        fail: {
          text: "첨단 방어막에 공격이 튕겨 나가고 치명상을 입었다.",
          wounds: -32
        }
      }
    ],
    source: "Lexicanum: Spyrer / Necromunda"
  },
  {
    id: "ev_s3_world_necromunda_turf",
    title: "네크로문다 — 골리앗과 에셔의 하층 돔 항쟁",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "fabricator_general", "cardinal", "canoness", "navy_admiral",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다",
    weight: 34,
    text: "하이브 프리무스 하층 공업 돔의 정제수 파이프를 두고, 근육 강화 약물에 취한 하우스 골리앗 투사들과 독날 검을 든 하우스 에셔 암살자들이 전면 총격전을 벌이고 있다! 양쪽 모두 중립 길드의 물자와 통로를 탐내며 압박을 가한다.",
    choices: [
      {
        label: "[교섭 판정] 길드 상인 대표로 나서 두 클랜 하우스 사이의 정수 배분 휴전 협정을 중재하고 통행세를 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "총알 대신 이익으로 두 갱단을 설득했다! 네크로문다 하층 돔에서 누구도 함부로 못 건드리는 노련한 중재자로 이름을 날렸다.",
          stats: { Fel: 7, Inf: 8, Int: 4 }
        },
        fail: {
          text: "골리앗 두목이 협상 탁자를 뒤엎으며 난장판이 되어 도망치다 타박상을 입었다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[백병 판정] 난전 틈새로 기어들어 온 약탈자들을 직접 물리치고 구역 방어선을 지켜 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "무자비한 난투 끝에 약탈자들을 몰아내고 값비싼 암시장 장비까지 전리품으로 챙겼다!",
          stats: { WS: 6, T: 5, Inf: 5 }
        },
        fail: {
          text: "에셔의 독침과 골리앗의 쇠파이프에 크게 다쳤으나, 질긴 생명력으로 끝내 살아남았다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "강철 셔터를 단단히 내리고 두 클랜 하우스가 서로 지쳐 물러날 때까지 조용히 숨을 죽인다",
        effect: {
          text: "네크로문다에서 오래 사는 비결은 남의 구역 싸움에 공짜로 끼어들지 않는 것이다.",
          stats: { Ag: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Necromunda / House Goliath & House Escher"
  },
  {
    id: "ev_s6_world_mars_noctis",
    title: "화성 녹티스 미궁 — 봉인된 협곡 지하의 금지된 신호",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["mars"],
      excludeTags: [
        "fabricator_general", "high_lord_terra", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 화성",
    weight: 32,
    text: "화성 적도 부근의 거대한 협곡 지대 녹티스 미궁은 고대부터 황제와 화성 대현자들만이 출입을 통제하는 금단의 땅이다. 오늘 밤 외곽 감시탑의 지진파 측정 임무 도중, 기술의 암흑기 이전부터 봉인된 지하 수 킬로미터 아래에서 설명할 수 없는 황금빛 전자기 맥동과 오래된 기계의 꿈틀거림이 계측기에 포착되었다.",
    choices: [
      {
        label: "[지성 판정] 신호의 출처를 직접 파헤치지 않고 파형만 정밀 암호화해 화성 최상위 아크마고스 회의에 극비 보고한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금기를 깨지 않으면서도 결정적 이상 징후를 포착한 공로로 화성 대서고의 특별 접근 인가를 받았다!",
          stats: { Int: 8, Inf: 7, WP: 4 }
        },
        fail: {
          text: "계측기 회로가 정체불명의 전자기 펄스에 타 버리며 손에 화상을 입었으나, 기밀 유출은 막았다.",
          wounds: -12,
          stats: { Int: 4 }
        }
      },
      {
        label: "[의지 판정] 머릿속으로 스며드는 기묘한 강철의 꿈을 뿌리치고 즉시 봉인 경계선을 두 배로 넓힌다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "정체 모를 '용의 잠'을 건드리지 않은 냉철한 판단이었다! 화성 수비 사제단이 그대의 정신력을 높이 평가했다.",
          stats: { WP: 8, T: 4, Inf: 5 }
        },
        fail: {
          text: "며칠간 금속 톱니가 살을 파고드는 기괴한 악몽에 시달리며 기력을 소모했다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "측량 기록을 표준 교리에 따라 즉시 삭제하고 녹티스 미궁 경계에서 조용히 철수한다",
        effect: {
          text: "화성에서 오래 살아남는 비결은 황제가 잠재워 둔 비밀에 호기심을 품지 않는 것이다.",
          stats: { WP: 5, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Noctis Labyrinthus / Mechanicum"
  },
  {
    id: "ev_s6_world_mars_titan_walk",
    title: "화성 신기계 군단 — 임페라토르 타이탄의 첫 걸음과 성유 의례",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["mars"],
      excludeTags: [
        "dreadnought", "high_lord_terra", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 화성",
    weight: 30,
    text: "수백 년의 건조 끝에 마침내 성당 하나를 통째로 어깨에 얹은 초거대 전투 병기 '임페라토르급 타이탄'이 올림푸스 몬스 인근 조립 독에서 첫 걸음을 내딛는다. 대지가 지진처럼 흔들리고 전쟁 나팔이 붉은 하늘을 찢는 순간, 타이탄 왼쪽 다리 관절의 보조 냉각 밸브에서 고압 증기가 새어 나오기 시작했다.",
    choices: [
      {
        label: "[민첩 판정] 거대한 강철 발걸음의 진동을 뚫고 정비 크레인에 매달려 비상 냉각 밸브를 수동 잠금한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "신기계의 첫 행진을 흠집 없이 지켜 냈다! 프린셉스가 타이탄 확성기로 그대의 용기를 찬양하는 웅장한 경적을 울렸다.",
          stats: { Ag: 7, Int: 5, Inf: 7 },
          faith: 6
        },
        fail: {
          text: "고압 증기에 데이고 진동에 튕겨 나가 타박상을 입었으나, 밸브 폐쇄에는 성공했다.",
          wounds: -16,
          stats: { Ag: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 지상 관제실에서 누스피어 경고 회로를 우회해 압력을 보조 탱크로 즉시 분산시킨다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "단 한 초의 지연도 없이 출격 의례가 완벽히 진행되었다! 타이탄 군단 콜레기아 타이타니카의 찬사를 받았다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "일부 센서가 오작동해 출격이 지연되며 상급 기술 사제의 엄중한 질책을 받았으나, 타이탄 본체의 손상은 막아 냈다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "붉은 모래 위에 무릎을 꿇고 옴니시아의 살아 있는 화신이 전장으로 떠나는 장엄한 의례에 경배를 올린다",
        effect: {
          text: "거대한 신기계의 발자국이 가슴 깊이 울렸다. 인류제국과 기계교의 위엄을 뼈저리게 느꼈다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Collegia Titanica / Codex: Adeptus Mechanicus"
  }
);
