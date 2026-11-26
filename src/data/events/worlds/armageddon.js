// 분기 사건 — 아마겟돈 전용 (1:1 단독 승격)
export default [
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
    id: "ev_s15_core_armageddon_1",
    title: "아마겟돈 — 잿빛 황무지 스틸 리전 기계화 보병대 호송",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["armageddon"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 아마겟돈",
    weight: 30,
    text: "하이브와 하이브 사이를 가로지르는 유독성 잿빛 황무지 한복판에서 아마겟돈 스틸 리전 호송대가 거대한 독성 모래폭풍에 갇혔다! 시야가 한 치 앞도 보이지 않는 가운데 선두 키메라 장갑차의 흡기 필터가 재와 산성 분진으로 막혀 엔진이 굉음을 내며 멈춰 섰다.",
    choices: [
      {
        label: "[기계교/아스트라 밀리타룸 전용] 예비 여과관을 직결하고 기계령 축성 의식으로 키메라 엔진을 되살린다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos", "militarum", "imperial_military", "officer"] },
        effect: {
          text: "폭풍 속에서도 능숙하게 흡기 계통을 청소하고 점화 순서를 되살려 냈다! 스틸 리전 차장이 황무지 방호 고글을 선물하며 경의를 표했다.",
          stats: { Int: 5, T: 4, Inf: 4 }
        }
      },
      {
        label: "[강인 판정] 방독면과 방호 외투에 의지해 폭풍 속으로 나가 견인 사슬을 후속 장갑차에 연결한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "피부를 깎아 내는 듯한 산성 모래바람을 견뎌 내며 견인 연결을 마쳤다! 호송대는 단 한 대의 낙오 없이 다음 하이브 성문에 닿았다.",
          stats: { T: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "모래폭풍에 휩쓸려 장갑차 측면에 강하게 부딪히고 방호복이 찢겨 산성 분진에 심한 화상을 입었다.",
          wounds: -22,
          stats: { T: -1 }
        }
      },
      {
        label: "[지성 판정] 차내 계기판의 지형 기록과 풍향을 분석해 폭풍을 피할 암반 협곡 대피로를 찾아낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "바람이 꺾이는 암반 지대를 찾아내 호송대를 안전하게 대피시킨 뒤 폭풍이 잦아든 틈에 정비를 마쳤다.",
          stats: { Int: 6, Ag: 3, Inf: 4 }
        },
        fail: {
          text: "좌표 판독 오류로 유독성 늪지 가장자리에 차체가 기울며 장비 상자에 어깨를 세게 찧었다.",
          wounds: -16,
          stats: { Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: Armageddon Steel Legion / Codex: Armageddon"
  },
  {
    id: "ev_s15_core_armageddon_2",
    title: "아마겟돈 — 하이브 인페르누스 군수 공장의 독성 매연과 생산 할당량",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["armageddon"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "general_rank", "commissar_general", "lord_commissar", "cardinal", "canoness",
        "navy_admiral", "arbites_marshal", "rt_lord_captain", "departmento_head",
        "inquisitor", "lord_inquisitor", "magos", "fabricator_locum",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 아마겟돈",
    weight: 29,
    text: "하이브 인페르누스의 거대한 군수 공장 조립동에서 리만 러스 전차 차체를 주조하던 용광로 배기관이 파열되었다! 검은 황화 매연과 쇳물 불꽃이 작업장 전체로 쏟아져 내리지만, 데파르트멘토 뮤니토룸 감독관은 이번 분기 전차 생산 할당량을 채우기 전에는 절대로 가동을 멈출 수 없다고 호통친다.",
    choices: [
      {
        label: "[기계교/행정관료/귀족 전용] 비상 우회 배기 승인을 직권으로 내리고 예비 조립선으로 할당량을 분산한다",
        req: { anyTags: ["mechanicus", "tech_priest", "administratum", "noble", "inquisition_agent"] },
        effect: {
          text: "공정 손실과 인명 피해를 모두 최소화하는 합리적 지시에 감독관도 이의를 달지 못했다. 생산 할당량을 기한 내에 완수해 높은 신임을 얻었다.",
          stats: { Int: 5, Inf: 6, Fel: 3 }
        }
      },
      {
        label: "[강인 판정] 매연을 뚫고 고열의 배기 덕트에 달라붙어 임시 강철 봉합판을 용접해 막는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "숨 막히는 열기와 불똥을 온몸으로 버텨 내며 배기관 파열을 틀어막았다! 공장 노동자들과 감독관 모두의 칭송을 받았다.",
          stats: { T: 6, WS: 3, Inf: 5 }
        },
        fail: {
          text: "뿜어져 나온 고열 증기와 매연에 팔에 화상을 입고 폐가 상해 한동안 병상에서 앓아누웠다.",
          wounds: -22,
          stats: { T: -1 }
        }
      },
      {
        label: "[교섭 판정] 노동자들이 쓰러지면 전차 생산 자체가 마비된다고 감독관을 논리적으로 압박한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "장부상 손실 수치를 조목조목 짚어 내자 감독관이 마지못해 20분간의 긴급 배기와 정비 정지를 허락했다. 수많은 노동자의 목숨을 구했다.",
          stats: { Fel: 6, Int: 4, Inf: 3 },
          faith: 4
        },
        fail: {
          text: "작업 태만 선동으로 몰려 공장 보안 요원에게 전기 곤봉으로 얻어맞고 징벌 노역에 끌려갔다.",
          wounds: -18,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Lexicanum: Hive Infernus / Armageddon"
  },
  {
    id: "ev_s15_core_armageddon_3",
    title: "아마겟돈 — 적도 정글의 야생 페럴 오크 매복전",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 942,
      anyWorlds: ["armageddon"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 아마겟돈 · 942.M41 이후",
    weight: 32,
    text: "아마겟돈 프라임과 세쿤두스를 가르는 후텁지근한 적도 정글 깊숙한 곳으로 정찰을 나섰다가, 지난 대전쟁의 포자에서 자라난 야생 페럴 오크 무리의 매복에 걸려들었다! 거대한 덩굴과 독충이 우거진 습지 양쪽에서 녹색 괴수들이 돌도끼와 투창을 흔들며 광기 어린 함성과 함께 쏟아져 나온다.",
    choices: [
      {
        label: "[백병 판정] 정글도를 뽑아 들고 가장 덩치 큰 오크 두목을 정면으로 베어 기세를 꺾는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "오크 우두머리가 쓰러지자 무리의 통제가 순식간에 무너졌다! 아마겟돈 오크 사냥꾼 정찰대가 그대의 용맹을 전설처럼 떠들기 시작했다.",
          stats: { WS: 7, T: 4, WP: 4, Inf: 5 },
          addTags: ["armageddon_hero"]
        },
        fail: {
          text: "오크의 투박한 뼈도끼에 어깨를 찍히고 진흙 늪으로 굴러떨어진 끝에 간신히 아군 엄호 아래 빠져나왔다.",
          wounds: -24,
          stats: { WS: -1 }
        }
      },
      {
        label: "[사격 판정] 늪지대 수풀에 몸을 낮추고 오크들이 몰려드는 길목에 정밀 점사와 수류탄을 퍼붓는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "좁은 습지 통로에 십자 포화를 집중시켜 매복 무리를 뿔뿔이 흩어 놓았다. 정찰대 전원이 무사히 귀환했다.",
          stats: { BS: 6, Int: 4, Ag: 3 }
        },
        fail: {
          text: "습기 찬 밀림 탓에 사격선이 가려져 오크의 투창에 허벅지를 관통당하고 말았다.",
          wounds: -20,
          stats: { Ag: -2 }
        }
      },
      {
        label: "[민첩 판정] 밀림의 독성 포자 주머니를 터뜨려 시야를 가린 뒤 강줄기를 타고 포위를 뚫고 탈출한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "지형을 완벽히 이용해 야생 오크들의 추격을 따돌리고 적 둥지의 정확한 좌표를 사령부에 넘겼다!",
          stats: { Ag: 6, Int: 5, Inf: 3 }
        },
        fail: {
          text: "가시 덩굴과 독충 떼를 헤치며 도주하다 온몸이 찢기고 열병에 시달렸다.",
          wounds: -18,
          stats: { T: -1 }
        }
      }
    ],
    source: "Lexicanum: Equatorial Jungle / Armageddon Ork Hunters"
  },
  {
    id: "ev_s15_core_armageddon_4",
    title: "아마겟돈 — 하이브 헬스리치 항만 부두의 하역과 방공 경보",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["armageddon"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 아마겟돈",
    weight: 28,
    text: "하이브 헬스리치의 거대한 항만 부두에서 고압 프로메튬과 중화기를 가득 실은 궤도 보급선 하역 작업이 한창이던 순간, 귀청을 찢는 방공 경보 사이렌이 울려 퍼졌다! 상공 구름 너머로 정체불명의 적대 침투정 편대가 탐지되어 대공 포대가 일제히 불을 뿜는 가운데, 크레인에 매달린 프로메튬 컨테이너가 거세게 흔들리며 부두 위로 추락할 위기에 놓였다.",
    choices: [
      {
        label: "[해군/로그 트레이더/기계교 전용] 항만 관제탑과 직통 교신해 대공 사각과 크레인 비상 착지를 동시에 통제한다",
        req: { anyTags: ["navy", "rogue_trader", "mechanicus", "tech_priest", "magos", "officer"] },
        effect: {
          text: "정확한 항만 관제 명령으로 크레인을 안전 완충 구역에 내리고, 부두 대공포대의 사선을 열어 침투정을 격퇴했다! 헬스리치 항만청이 큰 공적을 치하했다.",
          stats: { Int: 5, BS: 4, Inf: 6 }
        }
      },
      {
        label: "[민첩 판정] 대공 파편이 쏟아지는 부두 위로 달려가 컨테이너 고정 고리를 풀어 안전 구역으로 유도한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "아슬아슬하게 추락 궤적을 틀어 프로메튬 대폭발을 막아 냈다! 항만 하역 인부들과 경비병들이 목숨을 건졌다며 환호했다.",
          stats: { Ag: 6, T: 3, Inf: 5 }
        },
        fail: {
          text: "떨어지는 강철 파편과 터진 연료관의 열기에 휩쓸려 다리와 등에 심한 타박상과 화상을 입었다.",
          wounds: -20,
          stats: { Ag: -2 }
        }
      },
      {
        label: "[사격 판정] 부두 방벽의 유휴 히드라 대공 포좌에 올라 저공 침투정을 향해 탄막을 펼친다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "4연장 대공포의 예광탄이 침투정 한 대의 엔진을 정확히 꿰뚫어 바다로 추락시켰다! 부두 전체에서 승리의 함성이 터졌다.",
          stats: { BS: 6, WP: 4, Inf: 4 },
          faith: 6
        },
        fail: {
          text: "적 기총 소사가 포좌 방패를 강타하며 튕겨 나온 금속 파편에 얼굴과 팔을 다쳤다.",
          wounds: -18,
          stats: { BS: -1 }
        }
      }
    ],
    source: "Lexicanum: Hive Helsreach / Helsreach"
  },
  {
    id: "ev_s15_core_armageddon_5",
    title: "아마겟돈 — 하이브 템페스토라 산성비 홍수와 발전소 침수",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["armageddon"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 아마겟돈",
    weight: 29,
    text: "템페스트 대양에서 불어닥친 폭풍이 하이브 템페스토라에 유독한 산성비를 퍼부으면서 하층 배수 제방이 무너졌다! 거품을 내며 강철까지 녹여 버리는 시커먼 산성 홍수가 하층 주발전소 터빈실로 밀려들고 있다. 발전기가 침수되면 하이브 전체의 공기 정화기와 방어막이 멈춰 수백만 명이 질식할 판이다.",
    choices: [
      {
        label: "[기계교/국교/아르비테스 전용] 비상 격벽 봉쇄와 주민 동원령을 일사불란하게 지휘해 발전소를 사수한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos", "sororitas", "ecclesiarchy", "arbites"] },
        effect: {
          text: "신속한 통제와 보조 배수 펌프 가동으로 산성 홍수를 외곽 저류조로 돌리는 데 성공했다! 하이브 총독청이 큰 공로로 기렸다.",
          stats: { Int: 5, WP: 4, Inf: 6 },
          faith: 6
        }
      },
      {
        label: "[강인 판정] 허리까지 차오르는 산성 물살을 헤치고 수동 배수 수문 걸쇠를 온 힘으로 내린다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "장화와 방호복이 녹아내리는 고통을 버텨 내며 묵직한 강철 수문을 닫아 걸었다! 터빈실의 불빛이 꺼지지 않고 살아남았다.",
          stats: { T: 7, WP: 5, Inf: 4 },
          faith: 6
        },
        fail: {
          text: "산성 물살에 휩쓸려 철제 난간에 무릎을 부딪치고 다리에 심한 화학 화상을 입은 채 구조되었다.",
          wounds: -24,
          stats: { T: -1 }
        }
      },
      {
        label: "[지성 판정] 고압 송전 회로를 순차 차단하고 예비 동력을 양수 펌프에 몰아 홍수를 퍼낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "감전 사고를 막으면서도 배수 출력을 최대치로 끌어올려 발전소 침수를 간발의 차로 저지했다! 정비 조합이 깊이 감사했다.",
          stats: { Int: 6, Inf: 5 }
        },
        fail: {
          text: "침수된 배전반에서 튄 고압 전류에 감전되어 바닥에 쓰러졌고 심한 화상과 충격에 시달렸다.",
          wounds: -20,
          stats: { Int: -1 }
        }
      }
    ],
    source: "Lexicanum: Hive Tempestora / Armageddon"
  }
];
