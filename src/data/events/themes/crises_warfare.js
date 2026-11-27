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
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "astartes", "transhuman", "custodes", "grey_knight", "dreadnought", "high_lord_terra"]
    },
    reqLabel: "15세 이상 · 전선 군인 · 스키타리 · 커미사르 · 크리그·야만 행성 제외",
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
        critSuccess: {
          text: "완벽한 탄도 역산으로 적 포대의 탄약고까지 직격 포격을 유도해 침묵시켰다! 극한의 포화 속에서 흔들리지 않는 담력이 각성했다.",
          wounds: -4,
          stats: { Int: 6, Inf: 7, WP: 5 },
          removeTags: ["shell_shocked"],
          addTags: ["iron_nerves"]
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
        critSuccess: {
          text: "완벽한 타이밍의 조명탄 사격이 릭터의 시신경을 태워 버렸고, 이어진 정밀 사격으로 괴수를 일격에 사살했다.",
          wounds: -4,
          stats: { Int: 7, BS: 5, Inf: 6 },
          addTags: ["deadeye_marksman"]
        },
        fail: {
          text: "폭발이 너무 가까워 화상을 입고 날아갔으며, 도주하던 괴수의 발톱에 깊은 상처를 입었다.",
          wounds: -38,
          stats: { Int: 2 }
        },
        critFail: {
          text: "유류 드럼의 파편과 릭터의 산성 발톱이 팔과 다리를 동시에 찢어 놓았다. 목숨은 건졌으나 관절에 치명적인 손상이 남았다.",
          wounds: -44,
          addTags: ["crippled_limb"]
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
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "chapter_master",
        "cardinal", "fabricator_general", "fabricator_locum", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "16세 이상 · 아마겟돈·발할라 또는 제국 무장 인원 · 비야만 행성",
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
        req: {
          excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
          excludeTags: ["astartes", "transhuman"],
          excludeWorlds: ["krieg"],
          excludeHomeWorlds: ["krieg"]
        },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "흔들리던 병사들이 그대의 외침에 대열을 되찾았다! 2차 저지선이 오크의 기세를 꺾어 놓았다.",
          wounds: -14,
          stats: { Fel: 6, Inf: 6, WP: 3 }
        },
        critSuccess: {
          text: "서릿발 같은 지휘 아래 패주하던 부대가 강철의 방벽으로 재편되어 오크 대군을 완벽히 격퇴했다.",
          wounds: -6,
          stats: { Fel: 7, Inf: 8, WP: 5 },
          removeTags: ["shell_shocked"],
          addTags: ["iron_nerves"]
        },
        fail: {
          text: "공포에 질린 병사들이 뿔뿔이 흩어지는 사이 오크 슈타 탄환이 옆구리를 꿰뚫었다.",
          wounds: -40,
          stats: { Fel: 2 }
        },
        critFail: {
          text: "무너지는 전선의 비명과 워보스의 포효 속에서 정신이 무너져 내렸다. 간신히 후송되었으나 극심한 전장 트라우마가 남았다.",
          wounds: -42,
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[백병 판정] 동요 없는 전술 교리에 따라 돌파구 정면으로 역돌격해 선두 오크 노브의 목을 노린다",
        req: {
          or: [
            { anyTags: ["astartes", "transhuman"] },
            { anyHomeWorlds: ["krieg"] },
            { anyWorlds: ["krieg"] }
          ]
        },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "일말의 공포도 없이 녹색 파도의 한복판으로 파고들어 선두 오크 노브를 베어 넘겼다! 돌파구가 순식간에 봉쇄되었다.",
          wounds: -14,
          stats: { WS: 6, WP: 4, Inf: 6 }
        },
        critSuccess: {
          text: "냉혹한 전술 기동과 압도적 일격으로 워보스급 노브와 호위대를 단숨에 도륙하며 방어선의 흐름을 완전히 뒤집었다.",
          wounds: -6,
          stats: { WS: 7, WP: 5, Inf: 8 },
          addTags: ["iron_nerves"]
        },
        fail: {
          text: "수적 열세 속에 오크 노브의 초파와 파편에 깊은 외상을 입었으나, 한 치도 물러서지 않고 2차 저지선이 굳어질 시간을 벌었다.",
          wounds: -36,
          stats: { T: 3 }
        },
        critFail: {
          text: "배틀왜건의 충각과 폭발 폭압에 휘말려 잔해 아래 깔리는 중상을 입었으나, 끝내 진지를 사수하며 증원군과 합류했다.",
          wounds: -42,
          stats: { T: 2 }
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
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought", "living_saint",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "16세 이상 · 충성파 제국 인물 · 테라·화성·크리그·함선·야만 행성 제외",
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
];
