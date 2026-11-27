// 분기 사건 — 전선 · 데스월드 · 행성 환경 · 비전투 루트 치명 위기 사건
export default [
  {
    id: "ev_s8_crisis_artillery_barrage",
    title: "치명적 위기 — 적 중포격의 참호 직격",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      anyCareers: ["astra_militarum", "pdf_trooper", "militarum_officer", "tempestus_scion", "commissar", "lord_commissar", "skitarii"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "astartes", "transhuman", "custodes", "grey_knight", "dreadnought", "high_lord_terra"]
    },
    reqLabel: "15세 이상 · 전선 군인 · 스키타리 · 커미사르",
    weight: 15,
    text: "하늘이 찢어지는 굉음과 함께 적의 바실리스크급 중포탄 수십 발이 그대가 선 참호 구역을 정밀 타격했다! 흙벽이 무너져 내리고 산산조각 난 파편과 유독 연기가 시야를 완전히 삼킨다. 진동에 고막이 얼얼한 가운데 2차 일제 사격의 포성이 다시 지평선 너머에서 울려 퍼진다.",
    choices: [
      {
        label: "[지성 판정] 탄착 간격과 포성 각도를 계산해 포탄이 떨어진 직후의 분화구로 분대를 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉철한 탄도 계산이 적중했다! 포화가 비껴간 분화구에서 살아남아 사령부에 적 포대 좌표를 역보고했다.",
          wounds: -12,
          stats: { Int: 5, Inf: 5, WP: 3 }
        },
        fail: {
          text: "예상보다 빠른 2차 일제 사격이 분화구 가장자리를 강타했다. 온몸에 파편이 박힌 채 진흙 속에 파묻혔다.",
          wounds: -42,
          stats: { T: 2 }
        },
        critFail: {
          text: "지근거리에서 작렬한 포탄의 폭압이 고막과 신경을 찢어 놓았다. 살아남았으나 포성 환청이 평생 남았다.",
          wounds: -45,
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[특성 전용 · 강철의 신경] 포화 속에서도 흔들리지 않고 전우들을 이끌어 즉석 방공호를 구축한다",
        req: { allTags: ["iron_nerves"] },
        effect: {
          text: "강철 같은 신경으로 공황을 잠재운 덕분에 분대 전원이 최소한의 피해로 포격을 견뎌 냈다.",
          wounds: -8,
          stats: { WP: 3, Inf: 5 }
        }
      },
      {
        label: "[강인 판정] 철모와 플래크 갑옷에 몸을 맡긴 채 탄약 상자를 끌어안고 직격파를 정면으로 버틴다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "고막이 찢어지는 충격파를 견디고 흙더미를 박차고 일어섰다! 살아남은 전우들이 경외의 시선을 보낸다.",
          wounds: -20,
          stats: { T: 6, WP: 4 }
        },
        fail: {
          text: "고폭탄 한 발이 불과 두 걸음 앞에서 작렬했다. 파편 폭풍 속에 참호와 함께 산산조각 났다.",
          instantDeath: "최전선 참호에서 적 중포격의 직격탄을 맞고 장렬히 산화"
        }
      },
      {
        label: "무너지는 참호 벽 아래로 몸을 던져 포격이 멎을 때까지 필사적으로 버틴다",
        effect: {
          text: "무너진 들보에 다리가 짓눌려 큰 부상을 입었으나, 야전 의무병이 새벽녘 잔해 속에서 그대를 끌어냈다.",
          wounds: -28,
          stats: { T: 2, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Astra Militarum / Only War Core Rulebook"
  },
  {
    id: "ev_s8_crisis_tyranid_ambush",
    title: "치명적 위기 — 어둠 속 릭터와 생체 포자 매복",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 16,
      minYear: 745,
      anySegmenta: ["ultima", "tempestus", "pacificus"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "dreadnought", "grey_knight", "custodes", "living_saint", "assassin",
        "high_lord_terra", "chapter_master", "planetary_governor", "sector_lord", "warmaster",
        "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "745.M41 이후 · 16세 이상 · 울티마·템페스투스·파시피쿠스 · 비야만 행성",
    weight: 14,
    text: "야간 경계 구역의 복스 통신이 돌연 생체 잡음으로 끊겼다! 공기가 카멜레온처럼 일그러지더니, 낫 같은 발톱을 펼친 타이라니드 릭터와 생체 포자 떼가 순식간에 목덜미를 노리고 덮쳐 든다. 어둠 속에서 날카로운 키틴질 마찰음이 사방의 퇴로를 조여 온다.",
    choices: [
      {
        label: "[특성 전용 · 백전노장의 전술안] 어둠 속 사각을 미리 읽고 선제 교차 사격망을 전개한다",
        req: { allTags: ["tactician_eye"] },
        effect: {
          text: "매복 궤적을 정확히 예측한 선제 사격에 릭터의 광학 위장이 무력화되며 단숨에 사살했다.",
          wounds: -6,
          stats: { Int: 4, Inf: 6 }
        }
      },
      {
        label: "[백병 판정] 정면으로 돌진하는 릭터의 발톱을 받아 내며 급소를 찌른다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "처절한 사투 끝에 외계 포식자의 두개골을 꿰뚫었다! 피투성이가 된 채 동이 틀 때까지 구역을 지켰다.",
          wounds: -18,
          stats: { WS: 6, T: 3, Inf: 5 }
        },
        fail: {
          text: "예상을 아득히 웃도는 낫 발톱이 방어를 찢고 흉곽을 갈라 놓았다. 타이라니드의 차가운 포자 안개 속에 의식이 꺼졌다.",
          instantDeath: "야간 매복한 타이라니드 릭터의 낫 발톱에 치명상을 입고 순직"
        }
      },
      {
        label: "[지성 판정] 산성 포자의 열감지 패턴을 역이용해 조명탄과 유류 드럼을 연쇄 폭파한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "거대한 화염 장벽이 릭터의 광학 위장을 태워 버렸고, 지원 화력이 괴수를 벌집으로 만들었다!",
          wounds: -14,
          stats: { Int: 6, BS: 3, Inf: 4 }
        },
        fail: {
          text: "폭발이 너무 가까워 화상을 입고 날아갔으며, 도주하던 괴수의 발톱에 깊은 상처를 입었다.",
          wounds: -38,
          stats: { Int: 2 }
        }
      },
      {
        label: "즉시 경보 신호탄을 쏘아 올리고 좁은 배수로로 굴러 들어가 지원군이 올 때까지 피를 흘리며 버틴다",
        effect: {
          text: "산성 포자가 어깨를 파고드는 고통을 참아 내며 살아남았다. 경보 덕분에 기지 전체의 전멸은 막았다.",
          wounds: -26,
          stats: { Ag: 3, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Lictor / Codex: Tyranids"
  },
  {
    id: "ev_s8_crisis_ork_breakthrough",
    title: "치명적 위기 — 그린스킨 '와아아!' 방어선 돌파",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyWorlds: ["armageddon", "valhalla"] },
        { anyTags: ["militarum", "commissar", "astartes", "sororitas", "arbites"] }
      ],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "chapter_master",
        "cardinal", "fabricator_general", "fabricator_locum", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "16세 이상 · 아마겟돈·발할라 또는 제국 무장 인원",
    weight: 14,
    text: "녹색 괴성 '와아아아!'가 대지를 울리며 거대한 오크 배틀왜건이 바리케이드를 박살 냈다! 수백 명의 오크 보이즈와 초파를 치켜든 노브들이 틈새로 물밀듯 쏟아져 들어온다. 굉음 속에 전선의 좌익이 흔들리며 방어선이 무너지기 일보 직전이다.",
    choices: [
      {
        label: "[특성 전용 · 검성의 경지] 선두 오크 워보스급 노브의 초파를 흘려 넘기며 단칼에 목을 벤다",
        req: { allTags: ["blade_master"] },
        effect: {
          text: "절묘한 검술로 거구의 오크 노브를 일격에 베어 넘기자, 기세가 꺾인 오크 무리가 사방으로 흩어졌다.",
          wounds: -8,
          stats: { WS: 4, Inf: 6 }
        }
      },
      {
        label: "[사격 판정] 중화기 거치대를 붙잡고 선두 오크 노브의 미간에 집중 사격을 퍼붓는다",
        check: { stat: "BS", diff: -10 },
        success: {
          text: "지휘 개체인 노브가 쓰러지자 오크 무리의 돌격이 잠시 엉켰고, 제국 증원군이 틈새를 봉쇄했다!",
          wounds: -18,
          stats: { BS: 6, WP: 4, Inf: 5 }
        },
        fail: {
          text: "과열된 총신이 터지며 반격에 노출되었고, 오크 대군의 초파 물결에 휩쓸려 쓰러졌다.",
          instantDeath: "방어선을 돌파한 오크 '와아아!' 대군에 정면으로 맞서다 장렬히 전사"
        }
      },
      {
        label: "[교섭 판정] 무너지는 방어선의 패주병들을 호통으로 규합해 2차 교차 사격선을 긴급 편성한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "흔들리던 병사들이 그대의 외침에 대열을 되찾았다! 2차 저지선이 오크의 기세를 꺾어 놓았다.",
          wounds: -14,
          stats: { Fel: 6, Inf: 6, WP: 3 }
        },
        fail: {
          text: "공포에 질린 병사들이 뿔뿔이 흩어지는 사이 오크 슈타 탄환이 옆구리를 꿰뚫었다.",
          wounds: -40,
          stats: { Fel: 2 }
        }
      },
      {
        label: "폐허가 된 2층 건물 잔해로 급히 철수해 2차 방어선이 형성될 때까지 결사 항전한다",
        effect: {
          text: "파편과 둔상에 만신창이가 되었으나, 끝내 무너지지 않고 후속 부대와 합류했다.",
          wounds: -27,
          stats: { T: 3, WS: 2 }
        }
      }
    ],
    source: "Lexicanum: Ork / Codex: Orks"
  },
  {
    id: "ev_s8_crisis_catachan_venom",
    title: "치명적 위기 — 카타찬 데블과 맹독 덩굴의 습격",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["catachan"],
      excludeTags: [
        "power_armor", "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "14세 이상 · 행성: 카타찬 · 필멸자",
    weight: 17,
    text: "정찰로가 갑자기 들썩이더니 갑각 전갈 괴수 '카타찬 데블'의 집게발이 튀어나왔고, 피하려던 발목에는 신경독을 뿜는 붉은 덩굴 가시가 깊숙이 박혔다! 1분 안에 대처하지 않으면 심장이 멎는다. 눅눅한 밀림의 정적 속에서 거대한 절지동물이 두 번째 일격을 준비하며 몸을 웅크린다.",
    choices: [
      {
        label: "[특성 전용 · 백전의 생존자] 단련된 내성과 야전 경험으로 맹독을 짜내며 괴수의 약점을 찌른다",
        req: { allTags: ["battle_hardened"] },
        effect: {
          text: "수많은 사지를 건넌 생존 본능으로 독기를 버텨 내고, 카타찬 데블의 갑각 틈새를 정확히 끊어 냈다.",
          wounds: -10,
          stats: { T: 4, Ag: 3 }
        }
      },
      {
        label: "[민첩 판정] 대검으로 덩굴을 단칼에 끊고 괴수의 갑각 틈새로 뛰어올라 눈을 찌른다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "번개 같은 몸놀림으로 괴수를 물러서게 하고 살아남았다! 카타찬 전사들 사이에서 전설로 회자될 솜씨다.",
          wounds: -18,
          stats: { Ag: 6, WS: 4, T: 3 }
        },
        fail: {
          text: "괴수의 집게발이 허리를 짓눌렀고, 신경독이 순식간에 전신으로 번졌다. 카타찬의 밀림이 또 하나의 목숨을 거두었다.",
          instantDeath: "카타찬 밀림에서 카타찬 데블과 맹독 식물의 습격을 받아 전사"
        }
      },
      {
        label: "[지성 판정] 주변 진흙 이끼에서 해독 성분을 즉석 채취해 상처를 감싸고 불을 질러 괴수를 쫓는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "밀림 생태에 대한 해박한 지식이 목숨을 건졌다! 연기 냄새에 괴수가 물러나고 독기도 중화되었다.",
          wounds: -15,
          stats: { Int: 6, T: 4 }
        },
        fail: {
          text: "독기 중화가 늦어 고열과 경련 속에 며칠을 사경을 헤맨 끝에 간신히 깨어났다.",
          wounds: -40,
          stats: { T: 3 }
        },
        critFail: {
          text: "해독이 늦어 맹독 일부가 혈관에 고착되었다. 목숨은 건졌으나 호흡과 체력이 크게 상했다.",
          wounds: -42,
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "칼날을 불에 달궈 독이 든 상처 부위를 스스로 지져 낸 뒤 나무 위로 기어오른다",
        effect: {
          text: "기절할 듯한 화상과 출혈을 견뎌 내며 독의 확산을 막았다. 끔찍한 흉터가 평생 남았다.",
          wounds: -30,
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Catachan Devil / Codex: Catachans"
  },
  {
    id: "ev_s8_crisis_baal_radstorm",
    title: "치명적 위기 — 바알의 살인적 방사능 모래폭풍",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["baal"],
      excludeTags: [
        "power_armor", "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "14세 이상 · 행성: 바알 · 필멸자",
    weight: 17,
    text: "붉은 하늘이 순식간에 검붉은 유리 가루 폭풍으로 뒤집혔다! 바알 사막 최악의 치사량 방사능 폭풍이 야영지를 집어삼키고 있으며, 방호 천막이 종잇장처럼 찢어져 날아간다. 숨을 들이쉴 때마다 목구멍이 타들어 가는 듯한 열기와 방사선 진동이 사막을 덮친다.",
    choices: [
      {
        label: "[지성 판정] 낡은 지도와 지형 풍식을 읽어 내어 모래 아래 묻힌 암흑기 지하 벙커 입구를 찾아낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "녹슨 방폭문을 열어젖히고 생존자들과 함께 폭풍을 피했다! 내부에서 귀한 정제수까지 확보했다.",
          wounds: -12,
          stats: { Int: 6, Inf: 4 }
        },
        fail: {
          text: "입구가 붕괴되어 헛수고하는 사이 고선량 방사능 먼지를 들이마시고 쓰러졌다.",
          wounds: -40,
          stats: { T: 2 }
        }
      },
      {
        label: "[강인 판정] 두꺼운 납 가죽 망토를 두른 채 보급 수레를 붙들고 폭풍 한복판을 뚫어 낸다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "살갗을 찢는 모래와 방사능을 견디고 야영지의 식수통을 지켜 냈다!",
          wounds: -20,
          stats: { T: 6, WP: 4 }
        },
        fail: {
          text: "방사능 유리 폭풍이 방호천을 찢어 버렸고, 치사량의 방사선에 노출되어 붉은 사막에 쓰러졌다.",
          instantDeath: "바알의 치사량 방사능 모래폭풍에 휘말려 붉은 사막에서 영면"
        }
      },
      {
        label: "짐을 모두 버리고 바위 절벽 틈새에 웅크려 폭풍이 잦아들기를 기다린다",
        effect: {
          text: "극심한 탈수와 방사능 화상을 입은 채 겨우 목숨만 부지했다.",
          wounds: -28,
          stats: { T: 3, Inf: -3 }
        }
      }
    ],
    source: "Lexicanum: Baal / Dante"
  },
  {
    id: "ev_s8_crisis_fenris_helwinter",
    title: "치명적 위기 — 펜리스 헬윈터의 대륙 붕괴와 크라켄",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeTags: [
        "power_armor", "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "14세 이상 · 행성: 펜리스 · 필멸자",
    weight: 17,
    text: "펜리스의 혹독한 겨울 '헬윈터'가 정점에 달하며 밟고 서 있던 거대 빙하 대륙이 굉음과 함께 두 동강 났다! 갈라진 검은 바다 밑에서 산처럼 거대한 펜리스 크라켄의 촉수가 솟구쳐 오른다. 뼈를 에는 눈보라 속에서 얼음판이 급속도로 가라앉으며 부족의 배마저 소용돌이에 휘말리려 한다.",
    choices: [
      {
        label: "[민첩 판정] 무너지는 유빙 위를 뛰어넘어 해안 고지대 암벽까지 단숨에 주파한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "얼음 절벽이 바다로 가라앉기 직전 아슬아슬하게 안전 지대에 올라섰다!",
          wounds: -14,
          stats: { Ag: 6, T: 3 }
        },
        fail: {
          text: "얼음 바다에 빠져 극심한 저체온증과 동상에 걸린 채 겨우 썰물에 밀려 나왔다.",
          wounds: -40,
          stats: { T: 3 }
        }
      },
      {
        label: "[백병 판정] 도끼와 작살을 쥐고 크라켄의 촉수를 베어 내며 부족의 배를 지켜 낸다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "괴수의 촉수를 절단하고 전설적인 영웅담을 썼다! 부족민들이 그대의 이름을 노래한다.",
          wounds: -20,
          stats: { WS: 6, WP: 4, Inf: 5 }
        },
        fail: {
          text: "거대한 촉수에 휘감겨 얼음 심연 아래로 끌려 들어갔다. 오직 찬란한 전사의 노래만이 남았다.",
          instantDeath: "펜리스 헬윈터의 빙하 붕괴 속에서 크라켄과 싸우다 얼음 바다에 잠듦"
        }
      },
      {
        label: "부서진 나무 뗏목에 몸을 묶고 혹한을 버티며 해류가 닿는 곳까지 표류한다",
        effect: {
          text: "손발 끝이 검게 얼어붙는 혹독한 동상을 입었으나 끝내 살아 돌아왔다.",
          wounds: -28,
          stats: { T: 4, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Fenris / Codex: Space Wolves"
  },
  {
    id: "ev_s8_crisis_chaos_raiders",
    title: "치명적 위기 — 카오스 배신자 분견대의 기습 강습",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 16,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "16세 이상 · 충성파 제국 인물 · 테라·화성·야만 행성 제외",
    weight: 12,
    text: "사이렌이 울리기도 전에 피와 해골 문양을 단 카오스 강습정이 구역 한복판에 착륙했다! 저주받은 워프 불꽃과 체인액스의 굉음 속에 무자비한 학살이 시작된다. 대피하던 시민들의 비명이 거리를 가득 메우는 사이, 뿔 달린 갑주를 두른 배신자들이 성당 광장으로 진격해 온다.",
    choices: [
      {
        label: "[백병 판정] 무기를 움켜쥐고 황제의 이름을 외치며 이단 습격대와 정면 격돌한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "배신자 선봉대의 목을 베고 제국 지원군이 도착할 때까지 방어선을 지켜 냈다!",
          wounds: -20,
          stats: { WS: 6, WP: 5, Inf: 5 },
          faith: 6,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "워프에 물든 체인액스의 일격이 방어를 박살 냈다. 마지막까지 황제의 이름을 부르며 산화했다.",
          instantDeath: "카오스 배신자 분견대의 기습 강습에 맞서 싸우다 순교"
        }
      },
      {
        label: "[교섭 판정] 공황에 빠진 시민과 경비대를 조직해 바리케이드와 탈출로를 신속히 통제한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "질서 정연한 대피와 지연전으로 수백 명의 목숨을 구해 냈다! 지역 사령부가 공로를 높이 샀다.",
          wounds: -14,
          stats: { Fel: 6, Inf: 6, WP: 3 },
          faith: 4,
          align: { humane: 9 }
        },
        fail: {
          text: "혼란 속에 유탄을 맞고 쓰러졌으며, 암흑 신들의 저주받은 외침이 정신에 상처를 남겼다.",
          wounds: -36,
          corruption: 8,
          align: { humane: 5 }
        }
      },
      {
        label: "무너진 성당 잔해 뒤 엄폐물에 몸을 낮추고 제국 방위대가 반격해 올 때까지 이를 악물고 버틴다",
        effect: {
          text: "화재 연기와 파편에 큰 상처를 입고 불경한 참극의 악몽을 안은 채 살아남았다.",
          wounds: -24,
          corruption: 5,
          stats: { WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Chaos Space Marines / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_psyker_meltdown",
    title: "치명적 위기 — 폭주한 무등록 사이커와 워프 균열",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "15세 이상 · 비야만 행성 · 충성파 필멸자",
    weight: 12,
    text: "인근 구획에서 숨어 지내던 무등록 사이커가 통제력을 잃고 비명과 함께 보랏빛 워프 번개를 사방으로 토해 냈다! 중력이 뒤틀리고 벽면에서 피가 흐르며, 악마의 발톱이 현실의 막을 찢고 나오려 한다. 대기가 오존과 유황 냄새로 짙어지며 주변 인원들이 하나둘 환각 속에 쓰러진다.",
    choices: [
      {
        label: "[블랭크 전용] 영혼 없는 공허의 기운을 정면으로 밀어붙여 워프 균열을 즉각 소멸시킨다",
        req: { allTags: ["blank"] },
        effect: {
          text: "퍼라이어의 냉혹한 공허가 워프 폭풍을 단숨에 잠재웠다! 폭주하던 사이커는 비명도 못 지르고 쓰러졌다.",
          wounds: -8,
          stats: { WP: 6, Inf: 6 },
          addTags: ["daemon_bane"]
        }
      },
      {
        label: "[의지 판정] 황제 찬송가와 정신 방벽으로 환각을 뚫고 사이커의 영창을 끊어 버린다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "흔들리지 않는 의지가 워프의 광기를 꺾었다! 균열이 닫히며 구역 전체의 악마 침공을 막아 냈다.",
          wounds: -16,
          stats: { WP: 7, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "폭발한 워프 번개가 영혼과 육신을 통째로 불태웠다. 현장은 유리처럼 녹아내린 폐허만 남았다.",
          instantDeath: "폭주한 무등록 사이커가 열어젖힌 워프 균열 폭발에 휘말려 산화"
        }
      },
      {
        label: "[지성 판정] 구역 주전력 변압기를 역충전시켜 사이커의 신경을 전기 충격으로 강제 기절시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고압 아크 방전이 폭주하는 사이커를 단숨에 제압했다! 이단심문소 처리반이 기민한 판단을 치하했다.",
          wounds: -14,
          stats: { Int: 6, Inf: 4 }
        },
        fail: {
          text: "역류한 워프 방전에 감전되어 심각한 화상과 정신 오염을 입었다.",
          wounds: -36,
          corruption: 10
        }
      },
      {
        label: "방화 격벽 바깥으로 신속히 철수해 구획을 봉쇄하고 정화반이 도착하길 기다린다",
        effect: {
          text: "튀어 오른 워프 파편에 크게 다치고 오랫동안 기괴한 환청에 시달려야 했다.",
          wounds: -24,
          corruption: 7,
          stats: { Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Perils of the Warp / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_hive_collapse",
    title: "치명적 위기 — 하이브 하층 구획 대붕괴",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["hive"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "fabricator_locum", "fabricator_general", "magos", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "15세 이상 · 하이브 월드 거주자 · 필멸자",
    weight: 14,
    text: "수천 년 된 하이브 중층 지지 기둥이 피로 파열을 일으키며 천장 강철판이 통째로 무너져 내리기 시작했다! 수만 톤의 콘크리트와 녹슨 배관이 머리 위로 쏟아진다. 자욱한 석면 먼지와 끊어진 고압 전선의 불꽃이 통로의 출구를 집어삼키고 있다.",
    choices: [
      {
        label: "[지성 판정] 붕괴 하중 방향을 즉시 계산해 붕괴하지 않을 주 배관 아치 밑으로 대피로를 뚫는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 구조 판단이 기적을 낳았다! 아치 아래 생존 공간을 확보해 구역 주민 수십 명과 함께 생환했다.",
          wounds: -12,
          stats: { Int: 6, Fel: 4, Inf: 4 },
          align: { humane: 8 }
        },
        fail: {
          text: "2차 낙반이 통로를 막아 잔해 속에 사흘간 갇힌 끝에 심각한 부상을 입고 구조되었다.",
          wounds: -38,
          stats: { T: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[권위 판정] 상층 귀족 전용 비상 화물 승강기의 경비병을 직권으로 압박해 즉각 탑승한다",
        req: { stats: { Inf: 38 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "단호한 권위 앞에 경비병이 길을 열었다. 아래 구획이 붕괴하는 굉음을 뒤로하고 상층부로 빠져나왔다.",
          wounds: -8,
          stats: { Inf: 4, Fel: 2 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "경비병과 실랑이를 벌이던 중 천장 파편이 승강기 입구를 덮쳐 큰 부상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "[민첩 판정] 무너지는 철교를 전력 질주해 인접 구획 방화문이 닫히기 전에 미끄러져 통과한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "간발의 차로 방화문 틈새를 통과했다! 등 뒤로 구획 전체가 굉음 속에 사라졌다.",
          wounds: -16,
          stats: { Ag: 6, T: 2 }
        },
        fail: {
          text: "무너진 강철 대들보가 퇴로를 덮쳤다. 아드미니스트라툼 보고서에는 '하층 구획 손실 — 인명 집계 생략' 한 줄만 남았다.",
          instantDeath: "노후한 하이브 월드 하층 구획의 대붕괴에 매몰되어 사망"
        }
      },
      {
        label: "강철 작업대 아래 몸을 웅크리고 먼지 폭풍 속에서 구조대를 기다린다",
        effect: {
          text: "갈비뼈가 부러지고 진폐증에 시달리는 중상을 입었으나, 다행히 목숨만은 건졌다.",
          wounds: -28,
          stats: { T: 2 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Necromunda Core Rulebook"
  },
  {
    id: "ev_s8_crisis_manufactorum_blast",
    title: "치명적 위기 — 매뉴팩토룸 용광로 과압 폭발",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      excludeWorldTags: ["feral"],
      or: [
        { anyCareers: ["menial_worker", "skitarii", "tech_priest"] },
        { anyWorldTags: ["industrial", "forge"] }
      ],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "guild_magnate", "crime_lord"
      ]
    },
    reqLabel: "15세 이상 · 공업·포지 월드 또는 노동자·기계교",
    weight: 14,
    text: "무리한 군수 할당량 독촉 끝에 제4 주조 용광로의 압력계가 적색 한계를 돌파했다! 감독 서비터는 생산 중단을 거부하고, 시뻘건 쇳물과 고압 증기가 작업장 바닥으로 쏟아지기 시작한다. 열기에 쇠파이프가 비틀리며 주 배관이 연쇄 파열을 일으키기 직전이다.",
    choices: [
      {
        label: "[지성 판정] 수동 감압 밸브와 비상 냉각 회로를 역순으로 개방해 연쇄 대폭발을 막는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 기계령 진정 절차로 주 용광로의 폭발을 막아 냈다! 테크프리스트 감독관이 드물게 공로를 기록했다.",
          wounds: -14,
          stats: { Int: 6, Inf: 5 }
        },
        fail: {
          text: "증기 밸브가 손 앞에서 터지며 심각한 전신 화상을 입고 작업장 구석으로 튕겨 나갔다.",
          wounds: -40,
          stats: { T: 2 }
        }
      },
      {
        label: "[민첩 판정] 밀려오는 쇳물 물결을 피해 천장 크레인 사다리로 뛰어올라 환기구로 탈출한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "끓어오르는 열기를 발밑에 두고 가까스로 상부 통로로 탈출했다!",
          wounds: -16,
          stats: { Ag: 6, T: 2 }
        },
        fail: {
          text: "폭발 충격파에 사다리가 끊어지며 뜨거운 쇳물과 증기 폭풍 속으로 추락했다.",
          instantDeath: "매뉴팩토룸 과압 용광로 폭발 사고에 휘말려 순직"
        }
      },
      {
        label: "젖은 작업복으로 얼굴을 감싸고 비상 대피 열차의 가장자리에 매달려 현장을 벗어난다",
        effect: {
          text: "열기와 화상으로 심한 상처를 입었고, 감독부로부터 '생산 손실 책임' 징계까지 떠안았다.",
          wounds: -26,
          stats: { Inf: -3, T: 2 }
        }
      }
    ],
    source: "Lexicanum: Manufactorum / Imperium Maledictum Core Rulebook"
  },
  {
    id: "ev_s8_crisis_plague_quarantine",
    title: "치명적 위기 — 회색 역병 창궐과 구역 완전 봉쇄령",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "mark_nurgle",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain"
      ]
    },
    reqLabel: "15세 이상 · 비야만 행성 · 크리그 제외 · 필멸자",
    weight: 14,
    text: "거주 구획에 살갗이 잿빛으로 썩어 들어가는 치명적 역병이 퍼졌다! 아르비테스가 구역 사방을 장갑벽으로 봉쇄하고 '무단 이탈자는 즉결 사살 후 화염 정화'를 포고했다. 확성기에서 흘러나오는 격리 경고음 아래 기침 소리와 절망 섞인 기도가 골목마다 번진다.",
    choices: [
      {
        label: "[지성 판정] 오염된 급수관을 차단하고 소독 증류수와 임시 격리 병동을 설계해 확산을 꺾는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "과학적 격리 조치로 구획 사망률을 극적으로 낮췄다! 봉쇄가 해제된 뒤 행성 의료국과 행정부의 찬사를 받았다.",
          wounds: -12,
          stats: { Int: 6, Inf: 5, Fel: 3 },
          align: { humane: 9 }
        },
        fail: {
          text: "감염원을 추적하던 중 역병 포자에 노출되어 고열과 극심한 쇠약 속에 겨우 버텨 냈다.",
          wounds: -38,
          corruption: 6,
          align: { humane: 5 }
        }
      },
      {
        label: "[교섭 판정] 인맥과 통행 서류를 총동원해 검역 장교를 설득하고 상층 청정 구역으로 빠져나간다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "완벽한 서류와 노련한 화술로 검역선을 합법적으로 통과해 역병 지대에서 벗어났다.",
          wounds: -8,
          stats: { Fel: 5, Inf: 3 },
          faith: -3,
          align: { ruthless: 8 }
        },
        fail: {
          text: "위조와 청탁 의혹으로 검문소에서 구타당하고 가장 위험한 격리 수용소로 내던져졌다.",
          wounds: -36,
          stats: { Inf: -5 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "[강인 판정] 밀폐된 거처에서 정제수와 약초만으로 역병의 고비를 정면으로 이겨 낸다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "수 주간의 끔찍한 고열을 이겨 내고 항체를 얻어 살아남았다!",
          wounds: -20,
          stats: { T: 6, WP: 4 }
        },
        fail: {
          text: "회색 역병이 폐부를 집어삼켰다. 봉쇄 구획 정화반의 화염방사기 불빛만이 마지막 기억으로 남았다.",
          instantDeath: "구역 봉쇄령 속 창궐한 치명적 회색 역병을 이기지 못하고 사망"
        }
      },
      {
        label: "성당의 기도 행렬에 합류해 배급과 연고에 의지하며 봉쇄가 풀릴 때까지 버틴다",
        effect: {
          text: "기근과 가벼운 감염 증상으로 크게 쇠약해졌으나, 끝내 화염 정화를 피하고 살아남았다.",
          wounds: -25,
          faith: 5,
          stats: { WP: 2 },
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Nurgle Plagues / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_void_decompression",
    title: "치명적 위기 — 성간 함선 선체 파열과 진공 감압",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      or: [
        { anyWorlds: ["voidborn"] },
        { anyTags: ["voidborn", "navy", "rogue_trader"] }
      ],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "fabricator_general", "cardinal", "lord_inquisitor", "navy_admiral", "rt_lord_captain"
      ]
    },
    reqLabel: "15세 이상 · 보이드본 · 제국 해군 · 로그 트레이더",
    weight: 16,
    text: "미세 운석군 충돌로 갑판 외벽이 찢어지며 폭발적 감압 경보가 울렸다! 공기가 비명처럼 우주 공간으로 빨려 나가고, 자동 방화 격벽이 오작동으로 반쯤 열린 채 멈춰 버렸다. 얼어붙는 진공의 기류가 장비와 선원들을 파열구 쪽으로 거칠게 끌어당긴다.",
    choices: [
      {
        label: "[지성 판정] 벽면 보조 단말기에 매달려 비상 유압 제어 코드를 수동 오버라이드한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "번개 같은 코드 입력으로 방화 격벽이 완전 폐쇄되었다! 구획 선원 전원의 목숨을 구한 영웅이 되었다.",
          wounds: -14,
          stats: { Int: 6, Inf: 5, Fel: 3 },
          align: { humane: 8 }
        },
        fail: {
          text: "단말기 합선으로 감전되어 저산소증으로 의식을 잃기 직전, 겨우 구조반에 구출되었다.",
          wounds: -38,
          stats: { Int: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[민첩 판정] 사방으로 날아다니는 화물 상자를 피해 비상 보이드 슈트 보관함으로 몸을 날린다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "마지막 숨이 다하기 직전 헬멧 잠금장치를 체결했다! 차가운 진공 속에서 홀로 살아남았다.",
          wounds: -16,
          stats: { Ag: 6, T: 3 },
          align: { ruthless: 4 }
        },
        fail: {
          text: "기압 폭풍이 안전줄을 끊어 버렸다. 찢어진 선체 틈새 너머 차가운 공허로 빨려 들어가고 말았다.",
          instantDeath: "성간 함선 선체 파열에 따른 폭발적 진공 감압으로 우주 공간에 사출됨"
        }
      },
      {
        label: "고정 배관을 필사적으로 붙잡은 채 비상 기압 회복 밸브가 작동할 때까지 숨을 참는다",
        effect: {
          text: "폐 출혈과 극심한 감압병으로 중상을 입었으나, 다행히 함교의 원격 차단으로 목숨을 건졌다.",
          wounds: -28,
          stats: { T: 4, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Voidborn / Rogue Trader Core Rulebook"
  },
  {
    id: "ev_s8_crisis_forge_radleak",
    title: "치명적 위기 — 포지 월드 플라즈마 노심 방사능 누출",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["forge", "mechanicus"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "15세 이상 · 포지 월드 · 기계교 영역",
    weight: 16,
    text: "거대 플라즈마 원자로의 차폐막에 균열이 생겨 청백색 방사선이 복도 전체를 휩쓸고 있다! 기계교 경보음이 '장비 보전 최우선, 유기체 손실 허용'을 기계적으로 반복 송출한다. 공기 중에 이온화된 불꽃이 튀고 선량계 바늘이 치사 구역을 향해 치솟는다.",
    choices: [
      {
        label: "[지성 판정] 누스피어 비상 정지 의례를 송신해 차폐 셔터를 수동으로 내려 누출을 봉인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 이진법 제어 의례로 노심 폭주를 막았다! 상급 마고스가 그대의 연산 능력을 높이 평가했다.",
          wounds: -15,
          stats: { Int: 6, Inf: 5 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "셔터가 내려오기 직전 강한 방사선 펄스를 정면으로 맞아 극심한 방사능 피폭을 입었다.",
          wounds: -40,
          stats: { T: 2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[권위 판정] 상급 인원 전용 납 차폐 대피 캡슐의 접근 권한을 행사해 즉각 격리실로 들어간다",
        req: { stats: { Inf: 38 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "보안 서비터가 그대의 계급 인장을 인식해 차폐문을 열었다. 최소 피해로 누출을 피했다.",
          wounds: -10,
          stats: { Inf: 3 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "보안 인증이 지연되는 사이 치명적 방사선 파동에 노출되어 쓰러졌다.",
          wounds: -36,
          stats: { Inf: -3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[강인 판정] 방사선 경보 구역을 가로질러 반대편 격벽으로 강행 돌파한다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "피를 토하면서도 끝내 납 차폐 격벽 너머까지 걸어 나왔다!",
          wounds: -22,
          stats: { T: 6, WP: 3 }
        },
        fail: {
          text: "청백색 플라즈마 광선이 복도를 집어삼켰다. 방사선 계측기가 한계치를 찍으며 기록이 종료되었다.",
          instantDeath: "포지 월드 플라즈마 노심 방사능 누출 사고로 치사량 피폭 사망"
        }
      },
      {
        label: "두꺼운 납 도금 기계 부품 더미 뒤에 숨어 정화 서비터가 출동할 때까지 버틴다",
        effect: {
          text: "심각한 방사능 화상과 구토 증세를 얻었으나, 끝내 목숨은 건졌다.",
          wounds: -27,
          stats: { T: 2 }
        }
      }
    ],
    source: "Lexicanum: Forge World / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s8_crisis_agri_toxin",
    title: "치명적 위기 — 아그리 월드 궤도 화학 살포기 오폭",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["agri"],
      excludeTags: [
        "astartes", "transhuman", "power_armor", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "rogue_trader", "guild_magnate"
      ]
    },
    reqLabel: "15세 이상 · 행성 유형: 아그리 월드 · 필멸자",
    weight: 16,
    text: "아드미니스트라툼의 좌표 오기로 인해 초강력 제초·살충 화학 안개가 작업 중인 평원 한복판에 통째로 살포되었다! 누런 독성 구름이 들판을 덮치며 농작물과 호흡기를 동시에 녹여 낸다. 궤도 수송선의 엔진 굉음이 멀어지는 사이 코를 찌르는 염소 악취가 지면을 낮게 타고 밀려든다.",
    choices: [
      {
        label: "[지성 판정] 풍향과 지형 경사를 파악해 독성 구름이 고이지 않는 상류 수로 제방으로 대피로를 낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 기상 판단으로 현장 인부들과 함께 안전 고지대에 도달했다!",
          wounds: -12,
          stats: { Int: 6, Fel: 4 },
          align: { humane: 8 }
        },
        fail: {
          text: "갑작스러운 돌풍에 독성 안개를 정면으로 들이마셔 폐에 큰 손상을 입었다.",
          wounds: -36,
          stats: { T: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 철수하는 농장 감독관의 밀폐 장갑 수송차량에 탑승할 수 있도록 기민하게 협상한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "남은 수확 장부 보전을 조건으로 내걸어 감독관의 차에 올라타 무사히 빠져나왔다.",
          wounds: -10,
          stats: { Fel: 5, Inf: 4 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "감독관이 문을 닫아걸고 떠나 버려, 뒤늦게 뛰다가 독성 연무에 심하게 중독되었다.",
          wounds: -36,
          stats: { Inf: -3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[강인 판정] 물에 적신 천을 입에 묶고 들판 끝 지하 사일로까지 숨을 참으며 달린다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "눈물과 기침을 견디고 지하 사일로 해치를 닫아걸었다!",
          wounds: -20,
          stats: { T: 6, Ag: 3 }
        },
        fail: {
          text: "독성 화학 안개가 폐부를 태워 버렸다. 아드미니스트라툼 서류에는 '살포 오차 — 다음 계절 인력 보충 요망'만 남았다.",
          instantDeath: "아그리 월드 화학 살포기 오폭으로 발생한 독성 안개에 질식 사망"
        }
      },
      {
        label: "진흙 도랑에 엎드려 젖은 흙으로 몸을 덮고 안개가 걷히길 기다린다",
        effect: {
          text: "피부 화상과 심각한 기침 후유증을 얻었으나 가까스로 살아남았다.",
          wounds: -26,
          stats: { T: 2 }
        }
      }
    ],
    source: "Lexicanum: Agri World / The Lords of Silence"
  },
  {
    id: "ev_s8_crisis_underhive_ambush",
    title: "치명적 위기 — 언더하이브 독가스 포위와 갱단 살육전",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      or: [
        { anyWorldTags: ["underhive", "gang"] },
        { anyCareers: ["underhive_ganger"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "transhuman", "power_armor", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "rogue_trader"
      ]
    },
    reqLabel: "15세 이상 · 언더하이브 · 갱단 구역",
    weight: 16,
    text: "폐수 집수조 인근 좁은 철골 다리에서 무장한 적대 갱단과 현상금 사냥꾼 무리가 앞뒤 퇴로를 완전히 틀어막았다! 발밑에서는 녹색 부식성 가스가 피어오르고 사방에서 오토건 노리쇠 소리가 울린다. 낡은 나트륨 조명 아래 무법자들의 총구가 일제히 그대를 겨눈다.",
    choices: [
      {
        label: "[교섭 판정] 갱단 두목의 약점과 더 큰 길드 수송대 정보를 미끼로 즉석 휴전 거래를 성사시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "두목이 칼을 거두고 웃음을 터뜨렸다! 피 한 방울 대신 언더하이브 암시장의 인맥까지 얻었다.",
          wounds: -10,
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "거래가 결렬되며 총탄이 빗발쳤다. 빗맞은 산탄에 옆구리가 찢긴 채 간신히 도주했다.",
          wounds: -38,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[민첩 판정] 연막탄을 터뜨리고 독성 폐수관 측벽을 타고 어둠 속으로 미끄러져 탈출한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "추격자들이 가스 속에서 서로 오인 사격을 벌이는 사이 흔적 없이 빠져나왔다!",
          wounds: -14,
          stats: { Ag: 6, Int: 2 }
        },
        fail: {
          text: "미끄러운 관에서 추락해 심한 타박상과 화학 화상을 입었다.",
          wounds: -36,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[백병 판정] 정면 선두의 무법자를 쓰러뜨리고 피의 돌파구를 열어젖힌다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "처절한 육박전 끝에 두목의 오른팔을 베어 넘기자 포위망이 겁을 먹고 갈라졌다!",
          wounds: -20,
          stats: { WS: 6, T: 3, Inf: 4 }
        },
        fail: {
          text: "사방에서 쏟아진 스터브건 탄막에 쓰러졌다. 언더하이브의 폐수조가 또 하나의 이름 없는 시신을 삼켰다.",
          instantDeath: "언더하이브 갱단 매복 포위망을 돌파하다 총탄 세례로 사망"
        }
      },
      {
        label: "지닌 물자와 통행증을 전부 바닥에 던져 시선을 끈 틈에 부상을 감수하고 도망친다",
        effect: {
          text: "총탄 파편에 다리를 스치고 가진 것을 대부분 잃었으나 목숨만은 건졌다.",
          wounds: -24,
          stats: { Inf: -6, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Necromunda / Necromunda Core Rulebook"
  },
  {
    id: "ev_s8_crisis_feral_beast",
    title: "치명적 위기 — 변방 야만 행성의 거대 포식수 습격",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 14,
      anyWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "power_armor", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "14세 이상 · 행성 유형: 야만 행성 · 필멸자",
    weight: 16,
    text: "어스름한 숲속에서 거대한 뿔과 강철 같은 가죽을 지닌 원시 포식수가 울부짖으며 달려들었다! 사냥 일행이 흩어지고, 피에 굶주린 짐승의 붉은 눈이 오직 그대만을 향한다. 대지를 울리는 발굽 소리와 함께 거수가 굵은 나무줄기를 부러뜨리며 쇄도해 온다.",
    choices: [
      {
        label: "[백병 판정] 창과 도끼를 엇걸어 짐승의 돌진 무게를 역이용해 심장을 꿰뚫는다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "포효하던 거수가 발밑에 쓰러졌다! 부족 전체가 그대를 위대한 사냥꾼으로 추앙한다.",
          wounds: -18,
          stats: { WS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "짐승의 거대한 뿔이 방어를 뚫고 복부를 관통했다. 야만의 대지가 붉게 물들었다.",
          instantDeath: "변방 야만 행성의 거대 포식수와 맞서 싸우다 치명상을 입고 사망"
        }
      },
      {
        label: "[지성 판정] 횃불과 송진을 뿌려 짐승을 미리 파 둔 바위 함정 구덩이로 유인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "불길에 당황한 포식수가 함정에 빠지며 사냥이 끝났다! 지혜가 힘보다 강함을 증명했다.",
          wounds: -12,
          stats: { Int: 6, Inf: 4 }
        },
        fail: {
          text: "함정이 얕아 짐승이 뛰쳐나오는 바람에 발톱에 크게 찢긴 채 겨우 달아났다.",
          wounds: -36,
          stats: { Int: 2 }
        }
      },
      {
        label: "짐승이 들어오지 못하는 좁은 바위 틈새로 몸을 던져 밤새 출혈을 버틴다",
        effect: {
          text: "거친 바위에 몸이 찢기고 큰 상처를 입었으나, 동이 트자 짐승이 물러나 살아남았다.",
          wounds: -26,
          stats: { T: 3, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Feral World / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_admin_audit",
    title: "비전투 치명 위기 — 아드미니스트라툼 십일조 오기 숙청 감사",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["administratum", "menial_worker"] },
        { anyTags: ["administratum", "noble"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "rogue_trader"
      ]
    },
    reqLabel: "16세 이상 · 행정·관료·귀족·노동자 · 크리그·야만 행성 제외",
    weight: 16,
    text: "성역 특별 감사관이 무장 아르비테스를 대동하고 청사에 들이닥쳤다! 그대가 서명한 3년 전 행성 십일조 장부에서 곡물 40만 톤의 소수점 누락이 발견되었다며, '반역적 직무 유기 — 즉각 서비터 개조형'을 선고하려 한다. 차가운 수갑을 든 집행관들이 집무실 출입구를 에워싸고 있다.",
    choices: [
      {
        label: "[지성 판정] 3년 치 원본 양피지와 궤도 화물선 선하증권을 밤새 대조해 상급 부서의 조작 흔적을 입증한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "빈틈없는 장부 대조로 진짜 횡령범인 상급 서기관을 밝혀냈다! 감사관이 그대를 치하하며 결원 자리로 승진시켰다.",
          stats: { Int: 7, Inf: 7, WP: 3 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "결정적 전표가 이미 소각되어 있었다! 무고함을 입증하지 못한 채 '행정 태만 징벌형'으로 서비터 공장에 끌려갔다.",
          instantDeath: "아드미니스트라툼 십일조 장부 오기 누명으로 서비터 개조 처형당함"
        }
      },
      {
        label: "[교섭 판정] 감사관의 승진 욕구를 간파하고, 더 거대한 세금 탈루 길드 명단을 조건으로 면책을 흥정한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "노련한 정치적 거래가 통했다! 감사관은 그대의 오기를 '경미한 행정 오차'로 덮고 새 표적으로 향했다.",
          stats: { Fel: 6, Inf: 5, Int: 2 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "흥정이 뇌물 시도로 간주되어 공개 태형과 직위 강등 처분을 받고 만신창이가 되었다.",
          wounds: -34,
          stats: { Inf: -10 },
          addTags: ["penal_mark"],
          align: { ruthless: 4 }
        }
      },
      {
        label: "[권위 판정] 상층 첨탑의 고위 후원자와 행성 법무관에게 긴급 보증서를 띄워 감사 집행을 정지시킨다",
        req: { stats: { Inf: 45 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "막강한 인맥의 압력 아래 감사가 조용히 종결되었다. 제국 관료제에서 진실보다 강한 것은 서열이었다.",
          stats: { Inf: 5, Fel: 3 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "후원자마저 몸을 사리며 꼬리 자르기에 나섰다! 혹독한 구금 심문 끝에 겨우 풀려났다.",
          wounds: -30,
          stats: { Inf: -12 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "항변을 포기하고 사재를 털어 배상금과 혹독한 채찍 징벌을 감수해 목숨만은 구명받는다",
        effect: {
          text: "서비터 개조만은 면했으나, 피투성이가 된 채 모든 직위와 재산을 잃고 바닥부터 다시 시작하게 되었다.",
          wounds: -24,
          stats: { Inf: -12, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Imperium Maledictum Core Rulebook"
  },
  {
    id: "ev_s8_crisis_noble_poison",
    title: "비전투 치명 위기 — 상층 첨탑 만찬의 독배와 정적 암살단",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      or: [
        { anyTags: ["noble", "wealthy", "terra_elite", "rogue_trader"] },
        { anyCareers: ["administratum", "rogue_trader"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "planetary_governor", "sector_lord", "magos", "fabricator_locum", "fabricator_general",
        "high_lord_terra", "warmaster", "cardinal", "lord_inquisitor"
      ]
    },
    reqLabel: "18세 이상 · 귀족 · 상류층 · 로그 트레이더 · 관료",
    weight: 16,
    text: "총독궁 연회장에서 건배한 아마섹 증류주 잔을 내려놓은 순간, 손끝이 저려 오며 시야가 흐려진다! 정적 가문이 암시장 신경독을 탔고, 연회장 출입구에는 이미 매수된 자객들이 칼자루를 쥐고 서 있다. 음악과 웃음소리가 울려 퍼지는 화려한 홀 한가운데서 식은땀이 등줄기를 타고 흐른다.",
    choices: [
      {
        label: "[지성 판정] 혀끝의 미세한 금속 맛으로 독의 계열을 판별하고, 식탁 위 향신료와 식초로 즉시 구토·중화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 독물학 지식이 목숨을 건졌다! 멀쩡히 걸어 나온 그대를 보고 암살 배후의 얼굴이 하얗게 질렸다.",
          wounds: -12,
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "응급 해독이 늦어 치명적 신경독이 심장에 닿았다. 화려한 대리석 바닥 위에서 짧은 권력의 꿈이 끝났다.",
          instantDeath: "상층 첨탑 만찬에서 정적 가문이 탄 암시장 신경독에 중독되어 사망"
        }
      },
      {
        label: "[교섭 판정] 쓰러지기 직전 연회장 중앙에서 정적의 음모를 폭로해 총독과 귀족들 전체를 증인으로 묶는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "소름 돋는 기지로 판을 뒤집었다! 총독의 주치의가 즉시 해독제를 투여했고, 정적 가문은 반역죄로 숙청되었다.",
          wounds: -18,
          stats: { Fel: 7, Inf: 8 }
        },
        fail: {
          text: "취객의 헛소리로 치부당해 제때 치료받지 못하고 며칠간 사경을 헤맨 끝에 간신히 살아났다.",
          wounds: -40,
          stats: { Inf: -6 }
        }
      },
      {
        label: "[권위 판정] 사설 호위대와 아르비테스 경호 인력을 즉시 연회장으로 난입시켜 현장을 무력 장악한다",
        req: { stats: { Inf: 50 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "압도적인 권력과 무력이 자객들을 단숨에 제압하고 전담 메디카에 의무관의 해독 시술을 이끌어 냈다!",
          wounds: -14,
          stats: { Inf: 6, WP: 4 }
        },
        fail: {
          text: "호위대가 진입하기 전 자객의 독단검에 옆구리를 찔려 중상을 입었다.",
          wounds: -38,
          stats: { Inf: -4 }
        }
      },
      {
        label: "독이 퍼진 몸을 이끌고 연회장 발코니 하수 통로로 몸을 던져 사설 의원을 찾아간다",
        effect: {
          text: "독 후유증과 추락상으로 크게 상했으나, 목숨만은 건진 채 정적에게 갚아 줄 복수의 칼을 갈았다.",
          wounds: -30,
          stats: { T: 3, Inf: -5 }
        }
      }
    ],
    source: "Lexicanum: Highborn / Dark Heresy Second Edition Core Rulebook"
  },
  {
    id: "ev_s8_crisis_heresy_tribunal",
    title: "비전투 치명 위기 — 무고로 끌려간 이단 심문 법정",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "astartes", "transhuman", "dreadnought",
        "high_lord_terra", "inquisitor", "lord_inquisitor", "cardinal", "warmaster", "sector_lord",
        "planetary_governor", "fabricator_general", "canoness", "commissar_general", "navy_admiral",
        "arbites_marshal", "departmento_head"
      ]
    },
    reqLabel: "18세 이상 · 비야만 행성 · 크리그 제외 · 필멸자",
    weight: 14,
    alignBias: "dogmatic",
    text: "시기심에 눈먼 정적이 조작한 고발장 한 통으로, 그대는 오르도 헤레티쿠스 심문관과 국교 주교가 앉은 지하 심문 법정에 사슬로 묶여 끌려왔다. '무고함은 아무것도 증명하지 못한다. 변론하라!' 차가운 쇠사슬 소리와 화로에서 피어오르는 향 연기 너머로 서기 서비터의 펜촉이 판결문을 기록할 준비를 마쳤다.",
    choices: [
      {
        label: "[의지 판정] 《렉티티오 디비니타투스》의 정통 교리를 한 글자도 틀리지 않고 암송하며 꺾이지 않는 신앙으로 결백을 증명한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "강철 같은 신앙심과 당당한 기개에 주교가 고개를 끄덕였다! 오히려 거짓 고발을 꾸민 정적이 이단 선동죄로 체포되었다.",
          stats: { WP: 7, Inf: 6 },
          faith: 10,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "고문실의 공포 속에 말문이 막히고 말았다. 법정은 '잠재적 배교 혐의 확정 — 정화의 화형'을 선고했다.",
          instantDeath: "정적의 무고로 끌려간 이단 심문 법정에서 결백을 입증하지 못하고 화형당함"
        }
      },
      {
        label: "[지성 판정] 고발장에 적힌 날짜·봉인 인장·필적의 치명적 모순 세 가지를 냉철히 논파한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "날카로운 논리가 조작된 증거를 산산조각 냈다! 심문관이 흥미로운 눈빛으로 석방 명령서에 서명했다.",
          stats: { Int: 7, Inf: 5, WP: 3 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "교묘한 말장난이 '오만한 이단적 궤변'으로 찍혀 참혹한 고문 심문을 받은 뒤에야 석방되었다.",
          wounds: -38,
          stats: { Inf: -6 }
        }
      },
      {
        label: "[교섭 판정] 국교·행정부의 오랜 인맥과 후원자를 증인으로 세워 충성 이력을 보증받는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "수많은 증인의 탄원서가 법정에 쏟아졌고, 심문소는 혐의 없음으로 조서를 종결했다.",
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "증인들이 보복이 두려워 입을 다물었다. 오랜 구금과 채찍질 끝에 간신히 목숨만 건졌다.",
          wounds: -34,
          stats: { Inf: -8 }
        }
      },
      {
        label: "끝없는 신앙 고백과 가혹한 참회 채찍형을 순순히 받아들여 자비로운 방면을 호소한다",
        effect: {
          text: "등이 피투성이가 되는 혹독한 참회형을 견뎌 내고 석방되었다. 살아남았으나 명예에 큰 흠집이 남았다.",
          wounds: -26,
          faith: 6,
          stats: { Inf: -6, WP: 3 },
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Ordo Hereticus / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_tech_machine_spirit",
    title: "비전투 치명 위기 — 폭주한 중기갑 원자로 기계령과 격납고 봉쇄",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["tech_priest", "archmagos", "skitarii"] },
        { anyTags: ["mechanicus", "mechanicus_blood"] },
        { anyFocus: ["lore"] }
      ],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "fabricator_general", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "16세 이상 · 기계교 · 학문 초점 · 비야만 행성",
    weight: 16,
    text: "정비 중이던 임페리얼 나이트급 원자로 격납고에서 호전적인 고대 기계령이 성유 의식을 거부하며 격렬히 폭주했다! 강철 방폭문이 저절로 닫히고, 격납고 천장의 자동 방어 볼터 포탑과 과열된 플라즈마 배출구가 그대를 향해 일제히 작동한다. 귀청을 찢는 이진법 굉음이 복스 스피커를 타고 작업장을 뒤흔든다.",
    choices: [
      {
        label: "[지성 판정] 정통 메카니쿠스 성유와 이진법 진정 코드를 원자로 단말기에 직결해 폭주하는 기계령을 진압한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 교리 의례가 격노한 기계령의 맥동을 잠재웠다! 방어 포탑과 과열 밸브가 멈추고, 나이트 원자로의 고유 조율 수치까지 완벽히 복원했다.",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "진정 코드가 거부되며 천장 자동 볼터 포탑이 일제 사격을 퍼부었다. 정비 격납고는 붉은 연무와 불꽃에 잠겼다.",
          instantDeath: "격납고에서 폭주한 중기갑 원자로 기계령의 자동 방어 포탑 사격에 휘말려 순직"
        }
      },
      {
        label: "[의지 판정] 신경 접속 케이블을 직접 연결해 강철 같은 정신력으로 호전적인 기계령의 주도권을 짓누른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "코피를 쏟으면서도 전쟁 기계의 맹렬한 투지를 정신으로 길들였다! 포탑이 침묵하고 봉쇄된 방폭문이 열렸다.",
          wounds: -14,
          stats: { WP: 7, Int: 4 }
        },
        fail: {
          text: "신경 역류 충격이 뇌를 강타해 의식을 잃었고, 중상을 입은 채 기계교 수습반에 실려 격납고 밖으로 나왔다.",
          wounds: -38,
          corruption: 6
        }
      },
      {
        label: "[권위 판정] 상급 포지 사령부 채널로 비상 봉쇄 인장을 전송해 외부에서 격납고 주전력을 원격 차단한다",
        req: { stats: { Inf: 42 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "즉각적인 원격 차단으로 위기를 넘겼다. 다만 폭주한 원자로 노심은 강제 냉각 과정에서 영구 손상되었다.",
          wounds: -10,
          stats: { Inf: 4, Int: 2 }
        },
        fail: {
          text: "포지 사령부의 승인 절차가 지연되는 사이 포탑 유탄을 맞고 중상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 }
        }
      },
      {
        label: "정비 도구와 장비를 모두 포기하고 비상 소화 가스를 터뜨려 시야를 가린 채 수동 탈출구로 빠져나간다",
        effect: {
          text: "포탑 파편에 어깨가 찢기고 설비 손실 책임을 추궁받았으나, 목숨만은 건졌다.",
          wounds: -26,
          stats: { Inf: -6, T: 2 }
        }
      }
    ],
    source: "Lexicanum: Machine Spirit / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s8_crisis_ecclesiarchy_riot",
    title: "비전투 치명 위기 — 기근 폭동과 대성당·청사 포위",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 17,
      or: [
        { anyCareers: ["ecclesiarchy_priest", "administratum"] },
        { anyTags: ["pious", "ecclesiarchy", "noble"] },
        { anyFocus: ["faith", "politics"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "cardinal", "canoness", "lord_inquisitor", "fabricator_general"
      ]
    },
    reqLabel: "17세 이상 · 국교 · 행정 · 귀족 · 신앙·인맥 초점",
    weight: 15,
    text: "십일조 과징으로 굶주린 하층민 수천 명이 횃불과 쇠파이프를 들고 그대가 머무는 대성당 겸 행정 청사를 포위했다! 경비병들은 이미 흩어졌고, 불붙은 기름병이 정문을 향해 날아든다. 철문 빗장이 흔들리는 굉음 너머로 굶주림과 광기가 뒤섞인 성난 함성이 광장을 메운다.",
    choices: [
      {
        label: "[교섭 판정] 성단 위로 올라가 황제의 이름으로 폭도들의 분노를 다독이는 사자후 연설을 펼친다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "압도적인 카리스마와 진심 어린 호소에 폭도들이 무기를 내려놓고 무릎을 꿇었다! 구역 전체의 신망을 얻었다.",
          stats: { Fel: 8, Inf: 6 },
          faith: 8,
          align: { humane: 7 }
        },
        fail: {
          text: "성난 군중 속 배교 선동가가 던진 화염병과 돌팔매에 휩쓸렸다. 불타는 청사 앞에서 끝내 일어나지 못했다.",
          instantDeath: "기근 폭동으로 불타오른 청사 앞에서 성난 폭도들에게 휩쓸려 순직"
        }
      },
      {
        label: "[지성 판정] 비상 비축 곡물 창고의 장부를 공개하고 배급 개시 협정을 즉석에서 체결한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "실질적인 식량 분배안이 군중의 광기를 단숨에 가라앉혔다! 폭동 없이 사태를 수습한 명관으로 기록되었다.",
          stats: { Int: 6, Fel: 4, Inf: 4 },
          align: { humane: 9 }
        },
        fail: {
          text: "창고마저 텅 비어 있음이 들통나며 군중이 더욱 격분했다! 투석 세례를 뚫고 겨우 몸을 피했다.",
          wounds: -36,
          stats: { Inf: -6 },
          align: { humane: 5 }
        }
      },
      {
        label: "[권위 판정] 암호 복스로 아뎁투스 아르비테스 진압대와 장갑차를 긴급 출동시킨다",
        req: { stats: { Inf: 44 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "쇼크 마울과 최루탄을 앞세운 아르비테스 진압대가 10분 만에 광장을 평정했다. 냉혹하지만 질서는 지켜졌다.",
          wounds: -10,
          stats: { Inf: 5, Fel: -3 },
          align: { dogmatic: 8 }
        },
        fail: {
          text: "진압대가 도착하기 전 정문이 뚫려 화염과 난투 속에 큰 부상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "성물과 장부를 버려두고 지하 납골당 비밀 통로로 기어들어가 날이 밝길 기다린다",
        effect: {
          text: "유독 연기와 부상을 안은 채 탈출했으나, 청사가 불탄 책임으로 평판이 크게 추락했다.",
          wounds: -22,
          stats: { Inf: -8, WP: 2 },
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_rt_mutiny",
    title: "비전투 치명 위기 — 워프 표류와 선상 반란 · 사략선 협박",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      or: [
        { anyCareers: ["rogue_trader", "imperial_navy"] },
        { anyTags: ["rogue_trader", "rogue_trader_blood", "navy", "voidborn"] }
      ],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "navy_admiral"
      ]
    },
    reqLabel: "18세 이상 · 로그 트레이더 · 제국 해군 · 보이드본",
    weight: 16,
    text: "보급이 끊긴 채 3개월째 변방 성계에 표류하자, 하층 기관실 선원 수백 명이 무기고를 털고 함교를 향해 반란을 일으켰다! 설상가상으로 궤도 밖에서는 정체불명의 해적 사략선이 항복을 요구해 온다. 함교 방폭문 너머로 용접 불꽃이 튀어 오르며 선내 복스망이 반란군의 고함으로 뒤덮였다.",
    choices: [
      {
        label: "[교섭 판정] 반란 주동자들의 이해관계를 파고들어 선원들을 이간질하고 사면·포상으로 전열을 되돌린다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "유려한 웅변과 과감한 포상 약속에 반란군이 주동자를 스스로 묶어 바쳤다! 해적 사략선마저 기세에 눌려 후퇴했다.",
          stats: { Fel: 7, Inf: 7 }
        },
        fail: {
          text: "흥분한 반란군이 함교 장갑문을 용접기로 뚫고 들이닥쳤다. 좁은 함교에서 저항하다 끝내 쓰러졌다.",
          instantDeath: "보급이 끊긴 성간 함선의 선상 반란에 함교가 함락되어 순직"
        }
      },
      {
        label: "[지성 판정] 선내 생명 유지 장치 압력 조절과 소행성대 역기동으로 반란군과 해적을 동시에 무력화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "천재적인 함내 통제와 항해 기동으로 반란군을 산소 부족으로 항복시키고 해적선까지 따돌렸다!",
          stats: { Int: 8, Ag: 4, Inf: 5 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "과부하로 함교 콘솔이 폭발해 화상을 입었으며, 겨우 비상 부스터로 성계를 벗어났다.",
          wounds: -36,
          stats: { Int: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[권위 판정] 지휘 권한과 막대한 현상금을 내걸어 선내 용병 경비대와 사략선 간부를 역매수한다",
        req: { stats: { Inf: 48 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "황금의 위력 앞에 용병들이 반란을 진압하고 해적선까지 보급 호위로 돌아섰다!",
          wounds: -10,
          stats: { Inf: 6, Fel: 3 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "용병 일부마저 배신해 난전이 벌어졌고, 큰 부상을 입은 채 겨우 반란을 틀어막았다.",
          wounds: -34,
          stats: { Inf: -6 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "화물 절반과 비상 자금을 내어 주고 반란군과 타협해 가까운 제국 항구로 귀항한다",
        effect: {
          text: "피비린내 나는 학살은 피했으나, 난투 중 부상을 입고 막대한 재정·권위 손실을 떠안았다.",
          wounds: -20,
          stats: { Inf: -10, Fel: -2 },
          align: { humane: 6 }
        }
      }
    ],
    source: "Lexicanum: Rogue Trader / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s8_crisis_blackmail_syndicate",
    title: "비전투 치명 위기 — 지하 암흑 길드의 협박과 암살 청부",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      or: [
        { anyCareers: ["administratum", "menial_worker", "underhive_ganger", "arbites", "ecclesiarchy_priest", "rogue_trader"] },
        { anyFocus: ["politics", "lore"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain"
      ]
    },
    reqLabel: "18세 이상 · 비전투 직군 · 인맥·학문 초점 · 크리그·야만 행성 제외",
    weight: 15,
    text: "거처 문틈으로 검은 밀랍 인장이 찍힌 협박장과 암살 청부 계약서 사본이 밀려 들어왔다! 행성 지하를 주무르는 암흑 길드가 그대의 비밀 장부를 손에 넣었다며, 내일 새벽까지 굴복하지 않으면 자객을 보내겠다고 경고한다. 어두운 창밖 골목 건너편에서 감시자의 매서운 시선이 번뜩인다.",
    choices: [
      {
        label: "[지성 판정] 길드의 자금 세탁 암호와 은신처 동선을 역추적해 오히려 길드 간부의 치명적 비리를 손에 넣는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "완벽한 역추적에 길드가 꼬리를 내리고 협박장을 거둬들였다! 오히려 지하 세계가 그대를 두려워하게 되었다.",
          stats: { Int: 7, Inf: 6 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "역추적이 발각되어 그날 밤 침실로 숨어든 길드 자객의 독침에 목숨을 잃었다.",
          instantDeath: "행성 지하 암흑 길드의 보복 암살 청부에 당해 어둠 속에서 최후를 맞음"
        }
      },
      {
        label: "[교섭 판정] 라이벌 범죄 조직에 길드의 비밀을 넘기는 조건으로 암살자들을 역매복시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "지하 세력끼리 피 튀기는 항쟁이 벌어지며 그대에 대한 청부가 자동 폐기되었다! 손 안 대고 위기를 넘겼다.",
          stats: { Fel: 7, Inf: 5 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "양쪽 조직의 배신 속에 길거리 습격을 받아 큰 상처를 입고 겨우 달아났다.",
          wounds: -36,
          stats: { Inf: -6 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "[권위 판정] 아뎁투스 아르비테스 특별 수사반에 기밀 제보를 넣어 길드 아지트를 선제 급습하게 한다",
        req: { stats: { Inf: 42 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "새벽녘 아르비테스의 장갑차가 길드 본거지를 박살 냈다! 협박 문서는 흔적도 없이 소각되었다.",
          stats: { Inf: 6, WP: 3 },
          align: { dogmatic: 7 }
        },
        fail: {
          text: "급습 정보가 사전에 새어 나가 길드 잔당의 보복 총격을 받고 중상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "막대한 입막음 비용과 인맥을 내어 주고 다른 구역으로 조용히 거처를 옮긴다",
        effect: {
          text: "암살의 칼날은 피했으나, 보복 협박 속에 몸과 마음이 크게 상하고 입지가 추락했다.",
          wounds: -20,
          stats: { Inf: -10, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Cold Trade / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_forbidden_archive",
    title: "비전투 치명 위기 — 금서고의 저주받은 사본 폭주",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["administratum", "tech_priest", "inquisition_acolyte", "inquisitor", "ecclesiarchy_priest", "sanctioned_psyker"] },
        { anyFocus: ["lore", "forbidden"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord",
        "custodes", "grey_knight", "dreadnought"
      ]
    },
    reqLabel: "16세 이상 · 서고·기계교·심문소·국교·학문·금단 초점",
    weight: 15,
    text: "고대 서고 깊숙이 보관되었던 봉인 사본의 납 인장이 저절로 녹아내렸다! 펼쳐진 양피지에서 피처럼 붉은 문자가 허공에 떠올라 서고 사서들의 눈을 불태우고, 차가운 워프의 속삭임이 정신을 잠식하기 시작한다. 천장의 성유 등불이 일제히 꺼지며 촛농 냄새 사이로 끔찍한 이계의 냉기가 번진다.",
    choices: [
      {
        label: "[이단심문관 전용] 로제트를 들어 올려 서고 전체에 즉결 봉쇄령을 선포하고 오르도 말레우스 성수 정화반을 직접 지휘한다",
        req: { anyTags: ["inquisitor", "lord_inquisitor"] },
        effect: {
          text: "이단심문관의 절대 권한 아래 서고 방화 격벽이 즉시 폐쇄되고, 수행원들이 축성 화염으로 저주받은 사본을 흔적 없이 소각했다!",
          wounds: -10,
          stats: { WP: 5, Inf: 5 },
          faith: 6,
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[지성 판정] 고대 육망성 봉인 술식의 구문을 역설계해 저주받은 사본을 납 함 속에 재봉인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉철한 문헌 해독으로 단 한 번의 실수 없이 봉인을 복구했다! 오르도 말레우스 기록관이 경의를 표했다.",
          stats: { Int: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "금지된 음절을 잘못 읽는 순간 양피지에서 뿜어진 워프 불길이 영혼과 육신을 재로 만들어 버렸다.",
          instantDeath: "금서고의 저주받은 사본을 봉인하다 워프 화염에 휘말려 소멸"
        }
      },
      {
        label: "[의지 판정] 황제의 이름을 외치며 정신 방벽을 세우고 축성 화염으로 사본을 정면 소각한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불굴의 신념이 저주의 속삭임을 꺾었다! 사본이 검은 재로 변하며 서고의 악몽이 끝났다.",
          wounds: -14,
          stats: { WP: 7, Inf: 4 },
          faith: 8,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "저주받은 문자가 시신경을 할퀴고 정신에 깊은 워프 오염을 새긴 뒤에야 불길이 사본을 삼켰다.",
          wounds: -34,
          corruption: 14,
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 공포에 질린 사서들과 경비병을 진정시켜 서고 방화 격벽과 정화 가스 밸브를 합동 작동한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "일사불란한 통솔력으로 전원 대피와 서고 정화 봉쇄를 완수했다!",
          wounds: -10,
          stats: { Fel: 6, Inf: 5 },
          align: { humane: 8 }
        },
        fail: {
          text: "혼비백산한 인파에 깔리고 유독 정화 가스를 마셔 심각한 부상을 입었다.",
          wounds: -34,
          corruption: 6,
          align: { humane: 4 }
        }
      },
      {
        label: "양피지를 보지 않으려 눈을 질끈 감은 채 서고 바깥으로 물러나 외부 봉쇄 경보를 울린다",
        effect: {
          text: "워프 잔향에 정신이 크게 상하고 사후 오르도 말레우스 정화반의 혹독한 오염 검증 절차를 버텨야 했으나 목숨만은 건졌다.",
          wounds: -22,
          corruption: 8,
          stats: { WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Forbidden Lore / Dark Heresy: Disciples of the Dark Gods"
  }
];
