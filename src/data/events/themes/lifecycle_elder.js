// 생애 주기: 리주버냇 · 노년기 · 초장수기 · 인연 연작 사건
export default [
  {
    id: "ev_rejuvenat_offer",
    title: "상층 첨탑의 비술 — 수명 연장 시술 제안",
    category: "일상",
    once: true,
    req: {
      minAge: 54,
      stats: { Inf: 74 },
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTrees: ["navis_navigator"],
      excludeTags: [
        "astartes", "grey_knight", "custodes", "dreadnought", "living_saint", "saint_vessel",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "나이 54세+ · 권위 74+ · 필멸자 최상류층 · 크리그·야만 행성·항법사 제외",
    weight: 16,
    text: "황혼기에 접어든 그대에게 저명한 마고스 바이올로기스가 은밀히 리주버냇 세포 회춘 시술을 제안했다. 제국의 평민은 꿈도 꾸지 못할 200년 수명의 특권이다.",
    choices: [
      {
        label: "막대한 영향력을 지불하고 수명 연장 시술을 받는다",
        effect: {
          text: "백발이 다시 검어지고 쇠약했던 심장이 힘차게 뛰기 시작했다! 기대수명이 크게 연장되었다.",
          stats: { T: 6, Inf: -6 },
          wounds: 30,
          lifeBonusExtra: 45,
          incrementRejuvenat: true,
          addTags: ["rejuvenat"]
        }
      },
      {
        label: "부자연스러운 연명을 거부하고 황제께서 정하신 수명을 받아들인다",
        effect: {
          text: "담담한 태도가 주변의 깊은 존경을 불러일으켰다.",
          stats: { WP: 5, Fel: 4 },
          faith: 10
        }
      }
    ],
    source: "Lexicanum: Rejuvenat"
  },
  {
    id: "ev_s2_elder_mortal_twilight",
    title: "노년기 — 닳아 버린 관절과 늙은 종복의 회고",
    category: "노년기",
    once: true,
    req: {
      minAge: 55,
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeRealms: ["mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTrees: ["navis_navigator"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat",
        "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "55세+ · 필멸자 노년기 · 크리그·야만 행성·항법사 제외",
    weight: 34,
    text: "거울 속 머리칼은 어느새 서리처럼 하얗게 세었고, 날이 궂거나 공기가 차가워질 때면 수십 년 전 입은 상처와 굳은 관절이 욱신거린다. 인류제국에서 쉰다섯을 넘겨 살아남았다는 사실 자체가 이미 드문 기적이다.",
    choices: [
      {
        label: "[의지 판정] 쑤시는 노구를 달래며 젊은 후배들에게 평생 체득한 생존과 실무의 요령을 전수한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "경험이 담긴 노장의 한마디가 수많은 신참의 실수를 막아 주었다! 구역 전체에서 존경받는 원로로 자리 잡았다.",
          stats: { WP: 6, Fel: 5, Inf: 5 },
          align: { humane: 6 }
        },
        fail: {
          text: "변화한 젊은 세대의 방식과 부딪쳐 씁쓸히 자리를 물러나야 했으나, 진심만은 일부 후배들에게 전해졌다.",
          stats: { WP: 2, Inf: -2 },
          align: { humane: 3 }
        }
      },
      {
        label: "[강인 판정] 아직 황제께 바칠 기력이 남았다며 일선 현장의 자리를 끝까지 물러서지 않는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "젊은이들도 혀를 내두르는 노익장으로 임무를 완수해 냈다! 쇠락 앞에서도 고개 숙이지 않는 긍지다.",
          stats: { T: 5, WP: 5, Inf: 4 },
          wounds: -6,
          align: { dogmatic: 5 }
        },
        critSuccess: {
          text: "세월의 쇠약을 육체의 단련과 경험으로 완벽히 이겨 내며, 묵은 독소 후유증마저 털어 내고 백전의 생존자로 거듭났다.",
          stats: { T: 7, WP: 6, Inf: 6 },
          wounds: -2,
          removeTags: ["chronic_toxins"],
          addTags: ["battle_hardened"],
          align: { dogmatic: 6 }
        },
        fail: {
          text: "무리를 하다 호흡이 가빠져 며칠간 몸져누웠다. 세월의 무게가 뼈저리게 다가왔다.",
          wounds: -14,
          stats: { WP: 3 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "한발 물러나 후방 기록 정리와 조용한 보양으로 남은 생애를 차분히 갈무리한다",
        effect: {
          text: "격렬했던 세월을 뒤로하고 숨을 고르며, 황금 옥좌의 평온이 마지막 날까지 함께하길 기도했다.",
          wounds: 12,
          stats: { WP: 3 },
          faith: 6
        }
      }
    ],
    source: "Imperium Maledictum Core / Warhammer Crime: Bloodlines"
  },
  {
    id: "ev_s2_elder_rejuvenat_solitude",
    title: "장수기 — 리주버냇의 고독, 모든 옛 벗이 흙으로 돌아간 뒤",
    category: "장수기",
    once: true,
    req: {
      minAge: 65,
      allTags: ["rejuvenat"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTrees: ["navis_navigator"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "65세+ · 리주버냇 수명 연장자 · 크리그·야만 행성·항법사 제외",
    weight: 38,
    text: "값비싼 리주버냇 수명 연장 시술 덕에 그대의 얼굴은 여전히 중년의 윤기를 유지하고 있다. 하지만 오늘 아침 도착한 마지막 옛 동기의 부고장 앞에서, 함께 젊은 날을 보낸 평범한 벗들이 이제 단 한 명도 남지 않았다는 사실을 깨달았다.",
    choices: [
      {
        label: "[교섭 판정] 옛 벗들의 손주 세대를 불러 모아 지난 시대의 기억을 들려주며 새로운 인연을 잇는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "세월이 흘러도 인연은 다음 세대로 이어진다. 젊은 후손들의 눈빛 속에서 떠난 벗들의 웃음을 다시 보았다.",
          stats: { Fel: 6, Inf: 7, WP: 4 },
          align: { humane: 7 }
        },
        fail: {
          text: "세대 간의 거리감에 어색한 침묵만 흘렀으나, 조직의 원로로서 예우는 굳건히 지켰다.",
          stats: { Inf: 2, Fel: -2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 필멸의 감상을 끊어 내고 한 세기를 내다보는 장기 안목으로 권력과 정책을 설계한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "짧은 생을 사는 자들은 결코 보지 못하는 수십 년 단위의 흐름을 꿰뚫어 거대한 권위를 구축했다!",
          stats: { Int: 7, Inf: 8, Fel: -3 },
          align: { ruthless: 7 }
        },
        critSuccess: {
          text: "한 세기를 관통하는 거시적 안목이 완성되며 성역의 판도를 읽는 백전노장의 전술안이 각성했다.",
          stats: { Int: 8, Inf: 10 },
          addTags: ["tactician_eye"],
          align: { ruthless: 7 }
        },
        fail: {
          text: "지나치게 냉혹한 태도가 주변의 반감을 사 한동안 고립감이 더 짙어졌다.",
          stats: { Int: 3, Fel: -4 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "먼지 낀 장부 속 이미 세상을 떠난 이름들을 한 번씩 부른 뒤 조용히 술잔을 비운다",
        effect: {
          text: "오래 산다는 것은 더 많은 작별을 견딘다는 뜻이다. 고독을 삼키며 다시 내일을 향해 걸어갔다.",
          stats: { WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Rejuvenat / Eisenhorn & Ravenor"
  },
  {
    id: "ev_s2_elder_bionic_humanity",
    title: "기계화의 경계 — 기억 슬롯에서 지워야 할 고향의 냄새",
    category: "장수기",
    once: true,
    req: {
      minAge: 45,
      allTags: ["bionic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeWorldTags: ["feral", "krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "grey_knight", "custodes", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "magos", "fabricator_locum", "fabricator_general", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "45세+ · 기계 의체 시술자 · 크리그·야만 행성 제외",
    weight: 34,
    text: "세월과 부상이 쌓이며 육신의 상당 부분이 차가운 강철과 전선으로 대체되었다. 보조 연산 칩을 증설하던 테크프리스트가 묻는다. '비효율적인 어린 시절의 감각 기억과 슬픔의 회로를 삭제하시겠습니까? 연산 효율이 14퍼센트 상승합니다.'",
    choices: [
      {
        label: "[지성 판정] 불필요한 감정 회로를 절제하고 연산 코어를 증설해 강철의 완벽에 다가선다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "두려움도 망설임도 사라진 냉철한 지성이 깨어났다! 육신의 쇠락마저 늦추며 기계적 효율을 극대화했다.",
          stats: { Int: 8, WP: 5, Fel: -5 },
          lifeBonusExtra: 12,
          align: { ruthless: 6 }
        },
        fail: {
          text: "신경 접합부가 거부 반응을 일으켜 극심한 두통을 앓았으나, 보조 연산 장치만은 무사히 안착했다.",
          wounds: -12,
          stats: { Int: 4, Fel: -3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[의지 판정] 비효율적일지라도 고향의 바람 냄새와 인간이었던 기억만은 끝까지 삭제하지 않는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 강철 가슴 속에서도 꺼지지 않는 인간성의 온기를 지켜 냈다! 주변 사람들이 그대의 의지에 깊이 감명받았다.",
          stats: { WP: 7, Fel: 5 },
          faith: 6,
          align: { humane: 8 }
        },
        fail: {
          text: "신경 간섭으로 일부 기억이 흐릿해졌으나, 소중한 이름 몇 개만은 끝내 붙들어 두었다.",
          wounds: -8,
          stats: { WP: 4 },
          align: { humane: 5 }
        }
      },
      {
        label: "기억에 손을 대지 말고 낡은 의체 관절의 윤활유와 동력 셀만 차분히 교체한다",
        effect: {
          text: "강철은 도구일 뿐 주인이 아니다. 피와 기계 사이의 균형을 묵묵히 지켜 냈다.",
          stats: { T: 4, Int: 3 },
          wounds: 8
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Rite of Pure Thought"
  },
  {
    id: "ev_s2_centenarian_mortal_lineage",
    title: "초장수기 — 백 년 전 전우의 증손자를 마주하다",
    category: "장수기",
    once: true,
    req: {
      minAge: 120,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: [
        "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { allTags: ["astartes"] },
        { allTags: ["custodes"] },
        { allTags: ["rejuvenat"] },
        { allTags: ["magos"] }
      ]
    },
    reqLabel: "120세+ · 초장수기 · 크리그·야만 행성 제외",
    weight: 42,
    text: "백 년을 훌쩍 넘겨 살아온 그대의 앞에 낯익은 성씨와 가문 문장을 단 젊은 장교가 경례를 올린다. 알고 보니 한 세기 전 피비린내 나는 공성전에서 그대의 등 뒤를 지켜 주었던 필멸자 전우의 증손자였다.",
    choices: [
      {
        label: "[교섭 판정] 백 년 전 선조가 보여 주었던 용기를 직접 증언해 젊은 후손의 가슴에 긍지를 심어 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'그대의 증조부는 불바다 속에서도 단 한 발짝도 물러서지 않았다.' 눈시울을 붉힌 젊은 장교가 선조에 부끄럽지 않은 헌신을 맹세했다!",
          stats: { Fel: 6, Inf: 7 },
          faith: 8,
          align: { humane: 7 }
        },
        fail: {
          text: "세월을 초월한 존재의 위압감에 젊은이가 얼어붙어 대화는 짧게 끝났으나, 잊혀 가던 선조의 명예만은 전해졌다.",
          stats: { Inf: 2, Fel: -2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 필멸자의 삶이 불꽃처럼 짧다는 냉엄한 진리를 되새기며 수호자의 영원한 의무를 다짐한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "수많은 세대가 스러져도 제국은 계속 이어져야 한다. 시간의 흐름조차 흔들지 못하는 초연한 의지가 완성되었다.",
          stats: { WP: 8, Int: 4 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "지나간 세월의 무게와 고독이 가슴을 무겁게 눌러 잠시 타인과의 거리가 더 멀어졌다.",
          stats: { WP: 2, Fel: -2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "백 년 전 전역의 낡은 약장을 조용히 후손의 손에 쥐여 주고 말없이 돌아선다",
        effect: {
          text: "긴 말은 필요 없다. 손바닥에 남은 차가운 금속의 무게가 한 세기를 건너 두 사람을 이었다.",
          stats: { WP: 5 },
          faith: 6,
          align: { humane: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Dante / Lexicanum: Rejuvenat"
  },
  {
    id: "ev_s2_centenarian_ancient_scars",
    title: "초장수기 — 한 세기 전 전장의 파편과 세대의 간극",
    category: "장수기",
    once: true,
    req: {
      minAge: 150,
      anyTags: ["astartes", "custodes", "grey_knight"],
      excludeTags: [
        "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "150세+ · 초인 고참기",
    weight: 42,
    text: "어느덧 한 세기 반을 살아온 고참 전사가 되었다. 요즘 배치되는 신세대 형제들은 그대가 젊은 날 피를 흘렸던 전쟁을 고대 역사서 속 일화처럼 이야기한다. 오래된 갑주의 흉터 하나하나가 이제는 살아 있는 전설이다.",
    choices: [
      {
        label: "[백병 판정] 신세대 전사들에게 한 세기 전 잊힌 고대 검술과 포위 돌파 전법을 직접 몸으로 가르친다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "백전노장의 빈틈없는 일격에 젊은 전사들이 탄성을 터뜨렸다! 그대의 기량이 새로운 세대의 칼날로 계승되었다.",
          stats: { WS: 6, Inf: 8, Fel: 4 }
        },
        fail: {
          text: "격렬한 시범 도중 오래된 고질 상처가 잠시 욱신거렸으나, 후배들의 존경심은 조금도 줄지 않았다.",
          wounds: -10,
          stats: { WS: 3, Inf: 4 }
        }
      },
      {
        label: "[지성 판정] 챕터와 황궁 서고에 한 세기 넘게 직접 목격한 전역의 교훈을 구술해 영구 기록으로 남긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "그대의 구술 전술서가 서고 핵심 교본으로 등재되어 앞으로 천 년간 후배들의 지침이 되었다!",
          stats: { Int: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "너무 오래된 기억의 일부 연도가 서고 기록과 엇갈려 학술 서기들의 정정을 거쳐야 했으나, 전장의 본질을 담은 교훈만은 남았다.",
          stats: { Int: 2, Inf: -2 }
        }
      },
      {
        label: "오래된 무구와 갑주의 긁힌 자국을 정비하며 숨이 붙어 있는 한 끝없이 싸우리라 다짐한다",
        effect: {
          text: "세월은 육신에 흉터를 남겼지만, 황제를 향한 서약에는 단 하나의 흠집도 내지 못했다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s2_elder_veteran_story",
    title: "노년기 — 출정 전야의 늙은 참전용사와 신병들의 눈빛",
    category: "노년기",
    once: true,
    req: {
      minAge: 55,
      excludeHabitats: ["void"],
      anyTags: ["militarum", "navy", "officer", "commissar", "arbites"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin", "navigator",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "navy_admiral", "arbites_marshal",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "55세+ · 제국 무관·치안 노병 · 크리그·야만 행성 제외",
    weight: 34,
    alignBias: "humane",
    text: "전선 출정을 하루 앞둔 주둔지 주점에서 앳된 신병들이 잔뜩 긴장한 얼굴로 늙은 백전노장인 그대의 주변으로 모여든다. '선배님, 진짜 첫 전투에 들어가면 어떻게 살아남습니까?'",
    choices: [
      {
        label: "[교섭 판정] 영웅담 대신 라스건 습기 관리와 포격 시 엎드리는 실전 요령을 꼼꼼히 가르쳐 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "신병들의 덜덜 떨리던 손이 진정되었다. 그대의 실질적인 조언이 내일 전장에서 몇 명의 목숨은 틀림없이 구할 것이다.",
          stats: { Fel: 6, Int: 5, Inf: 5 },
          align: { humane: 7 }
        },
        fail: {
          text: "잔소리가 길어져 신병들이 주눅 들고 어색하게 자리를 떴으나, 중요한 수칙 몇 가지는 새겨 두었다.",
          stats: { Int: 2, Fel: -2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 전쟁의 화려한 선전 뒤에 가려진 참호의 진흙과 전우애의 무게를 담담히 들려준다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "거짓 없는 노병의 고백이 헛된 허세를 걷어 내고 진짜 용기를 일깨웠다.",
          stats: { WP: 7 },
          faith: 6,
          align: { humane: 5 }
        },
        fail: {
          text: "오래전 잃은 전우들의 얼굴이 떠올라 가슴이 먹먹해지며 밤새 잠을 설쳤으나, 신병들은 조용히 경례로 화답했다.",
          wounds: -5,
          stats: { WP: 2 },
          align: { humane: 3 }
        }
      },
      {
        label: "빈 잔을 내려놓고 내일 떠날 신병들의 등 뒤로 말없이 아퀼라 성호를 그어 준다",
        effect: {
          text: "부디 이들 중 절반이라도 살아서 돌아오기를. 노병의 짧은 기도가 주점의 소음 속으로 스며들었다.",
          stats: { WP: 4 },
          faith: 5,
          align: { humane: 4 }
        }
      }
    ],
    source: "Only War / Gaunt's Ghosts"
  },
  {
    id: "ev_s3_bond_comrade_meet",
    title: "이름 없는 인연 — 포화 속 참호에서 나눈 마지막 물통",
    category: "인연",
    once: true,
    req: {
      minAge: 16,
      maxAge: 45,
      excludeHabitats: ["void"],
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "bond_comrade",
        "astartes", "grey_knight", "custodes", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "high_lord_terra", "warmaster", "planetary_governor", "sector_lord", "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "16~45세 필멸자 · 전우 인연 시작 · 크리그·야만 행성·항법사 제외",
    weight: 28,
    text: "위험한 현장 작업과 교전이 길어지며 사방이 먼지와 비명으로 뒤덮인 밤, 옆자리의 이름 없는 동료가 자신의 마지막 정제수 물통을 말없이 그대에게 건넨다. '혼자 버티면 여기서 끝장이야. 등 뒤는 내가 볼 테니 네 앞만 지켜.'",
    choices: [
      {
        label: "[교섭 판정] 물통을 반씩 나누어 마시고 어떤 지옥에서도 서로를 버리지 않겠다고 굳게 손을 맞잡는다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "수천조 인류가 스쳐 가는 차가운 제국에서 목숨을 맡길 진짜 전우를 얻었다! 훗날 이 인연은 큰 울림으로 돌아올 것이다.",
          stats: { Fel: 5, WP: 5 },
          addTags: ["bond_comrade"],
          align: { humane: 6 }
        },
        fail: {
          text: "어색한 침묵 속에 밤새 빗물과 먼지를 뒤집어쓰며 고생했지만, 위기를 함께 넘긴 뒤 두 사람 사이에는 말없는 연대가 싹텄다.",
          wounds: -6,
          stats: { WP: 2 },
          addTags: ["bond_comrade"],
          align: { humane: 4 }
        }
      },
      {
        label: "감상에 젖지 않고 물통만 감사히 받아 마신 뒤 냉정하게 각자의 임무에 집중한다",
        effect: {
          text: "제국에서는 정을 줄수록 잃을 것도 많아진다. 냉철한 거리를 유지하며 밤을 넘겼다.",
          stats: { WP: 4, Int: 2 },
          align: { ruthless: 4 }
        }
      }
    ],
    source: "Only War Core Rulebook / Gaunt's Ghosts"
  },
  {
    id: "ev_s3_bond_comrade_fate",
    title: "오래된 전우의 소식 — 잿빛 인식표와 마지막 편지",
    category: "인연",
    once: true,
    req: {
      allTags: ["bond_comrade"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "astartes", "grey_knight", "custodes", "dreadnought", "living_saint", "saint_vessel", "assassin", "navigator",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "이력: 등을 맡긴 전우 · 크리그·야만 행성 제외",
    weight: 34,
    text: "세월이 흘러 각자의 전선과 구역으로 흩어진 뒤, 옛날 마지막 물통을 나누었던 전우가 치열한 붕괴 구역에 고립되어 위독하다는 다급한 전갈이 도착했다! 지금 달려가면 위험하지만, 외면하면 평생 그 얼굴이 눈에 밟힐 것이다.",
    choices: [
      {
        label: "[강인 판정] 위험한 봉쇄 구역으로 몸소 뛰어들어 피투성이가 된 옛 전우를 등에 업고 끌어낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "'역시 올 줄 알았어, 이 고집쟁이야.' 포연 속에서 다시 맞잡은 손이 그 어떤 훈장보다 뜨거웠다! 두 사람의 우정이 전설이 되었다.",
          stats: { T: 6, WP: 7, Fel: 6, Inf: 5 },
          faith: 8,
          wounds: -12,
          align: { humane: 10 }
        },
        fail: {
          text: "겨우 전우의 곁에 닿았을 때 이미 숨이 멎어 가고 있었다. 마지막으로 건네받은 낡은 인식표를 가슴에 품고 피투성이로 돌아왔다.",
          wounds: -20,
          stats: { WP: 8 },
          faith: 6,
          align: { humane: 7 }
        }
      },
      {
        label: "[권위 판정] 인맥과 행정 권한을 총동원해 긴급 구조 수송선을 급파하도록 상부를 압박한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "그대의 끈질긴 청원 끝에 구조 셔틀이 가까스로 도착해 전우를 살려 냈다! 며칠 뒤 도착한 감사 편지에 눈시울이 뜨거워졌다.",
          stats: { Inf: 6, Fel: 6, WP: 5 },
          align: { humane: 6 }
        },
        fail: {
          text: "관료주의의 서류 절차와 파벌 견제에 막혀 구조선은 하루 늦게 도착했다. 잿빛 인식표와 짧은 유언장만이 우편으로 돌아왔다.",
          stats: { WP: 4, Inf: -3 },
          align: { humane: 4 }
        }
      },
      {
        label: "직접 갈 수 없는 현실을 삼키며 성당에 촛불을 켜고 옛 전우를 위해 밤새 기도한다",
        effect: {
          text: "며칠 뒤 붕괴 구역이 끝내 봉쇄되었다는 짤막한 공보만 전해졌다. 생사조차 알 수 없는 옛 전우의 이름을 성당 촛불 아래 조용히 새겼다.",
          stats: { WP: 3 },
          faith: 4
        }
      }
    ],
    source: "Gaunt's Ghosts / Only War Core Rulebook"
  },
  {
    id: "ev_s3_bond_mentor_meet",
    title: "이름 없는 인연 — 늙은 장인의 꾸지람과 낡은 수첩",
    category: "인연",
    once: true,
    req: {
      minAge: 14,
      maxAge: 35,
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "bond_mentor",
        "astartes", "grey_knight", "custodes", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "high_lord_terra", "warmaster", "planetary_governor", "sector_lord", "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "14~35세 필멸자 · 스승 인연 시작 · 크리그·야만 행성·항법사 제외",
    weight: 28,
    text: "서툰 실수로 큰 문책을 당할 뻔한 순간, 백발이 성성한 베테랑 선배가 말없이 뒤처리를 막아 주더니 호된 꾸지람과 함께 손때 묻은 낡은 수첩을 던져 주었다. '제국에서 멍청한 놈은 일찍 죽는다. 살아서 제 몫을 하려거든 내 밑에서 제대로 배워.'",
    choices: [
      {
        label: "[지성 판정] 고개를 숙이고 늙은 선배의 까다로운 가르침과 실전 요령을 하나도 놓치지 않고 흡수한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "엄격하지만 속정 깊은 평생의 스승을 얻었다! 교본에는 결코 적히지 않는 현장의 지혜가 뼈에 새겨졌다.",
          stats: { Int: 6, WP: 4 },
          addTags: ["bond_mentor"]
        },
        fail: {
          text: "수차례 호통과 혹독한 잡무에 진이 빠졌으나, 끝까지 포기하지 않는 성실함을 인정받아 제자로 받아들여졌다.",
          wounds: -5,
          stats: { Int: 2 },
          addTags: ["bond_mentor"]
        }
      },
      {
        label: "남의 밑에 얽매이기보다 스스로 부딪쳐 익히겠다며 정중히 수첩을 돌려준다",
        effect: {
          text: "노인은 혀를 차며 돌아섰지만, 독립적인 자립심만은 한층 단단해졌다.",
          stats: { WP: 4, Ag: 2 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Dark Heresy"
  },
  {
    id: "ev_s3_bond_mentor_legacy",
    title: "스승의 마지막 부탁 — 황금 옥좌로 떠나는 길목에서",
    category: "인연",
    once: true,
    req: {
      allTags: ["bond_mentor"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "astartes", "grey_knight", "custodes", "dreadnought", "living_saint", "saint_vessel", "assassin", "navigator",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "이력: 인생의 스승 · 크리그·야만 행성 제외",
    weight: 34,
    text: "어느덧 기력이 다해 병상에 누운 옛 스승이 그대를 조용히 불렀다. 야윈 손으로 오래된 개인 기록과 아끼던 도구를 건네며 희미하게 웃는다. '내가 평생 지키려다 못 다한 약속이 하나 있네. 이제 자네가 내 대신 끝맺어 주겠나?'",
    choices: [
      {
        label: "[지성 판정] 스승이 평생 정리한 비전 지식과 미완의 과업을 완벽히 계승해 마무리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "스승의 필생의 업적을 훌륭히 완성해 바쳤다! 노인은 평온한 미소와 함께 황제의 품으로 눈을 감았고, 그대의 명망이 크게 높아졌다.",
          stats: { Int: 8, Inf: 7, WP: 5 },
          faith: 6
        },
        fail: {
          text: "밤낮없이 매달려 몸이 상할 만큼 애썼으나 과업은 일부만 이루었다. 그래도 끝까지 애쓴 제자의 진심에 스승은 고맙다는 말을 남기고 영면했다.",
          wounds: -6,
          stats: { Int: 2, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 거창한 업적보다 임종의 밤을 끝까지 지키며 스승의 마지막 길을 외롭지 않게 배웅한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 제국에서 누군가의 손을 끝까지 잡아 준 그 밤의 기억이 평생 흔들리지 않는 정신의 기둥이 되었다.",
          stats: { WP: 8, Fel: 6 },
          faith: 10
        },
        fail: {
          text: "상실감에 며칠간 기력을 잃었으나, 스승의 가르침을 되새기며 다시 일어섰다.",
          wounds: -6,
          stats: { WP: 5 }
        }
      },
      {
        label: "스승이 남긴 낡은 수첩을 정중히 품에 넣고 묵묵히 영결식을 치러 드린다",
        effect: {
          text: "한 세대의 지혜가 고요히 다음 세대로 건너왔다. 그대의 손끝에 여전히 스승의 습관이 살아 숨 쉰다.",
          stats: { Int: 4, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Imperium Maledictum Core / Warhammer Crime: Bloodlines"
  },
  {
    id: "ev_s3_bond_rival_meet",
    title: "이름 없는 인연 — 승진 명단 앞의 차가운 시선, 숙명의 정적",
    category: "인연",
    once: true,
    req: {
      minAge: 16,
      maxAge: 50,
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "bond_rival",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "16~50세 필멸자 · 정적 인연 시작 · 크리그·야만 행성·항법사 제외",
    weight: 26,
    text: "중요한 포상과 승진 추천 명단 앞에서, 늘 사사건건 방식이 부딪치던 동기가 그대의 공적을 교묘히 깎아내리며 차갑게 웃는다. '선한 척 굴어 봐야 이 제국에선 살아남지 못해. 누가 끝까지 올라가는지 두고 보자고.'",
    choices: [
      {
        label: "[교섭 판정] 날카로운 언변으로 정면 맞받아치며 결코 물러서지 않겠다고 선전포고한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "팽팽한 긴장감 속에 둘 사이의 치열한 경쟁이 시작되었다! 날 선 라이벌 의식이 그대를 더욱 단련시킨다.",
          stats: { Fel: 5, Inf: 5, Int: 3 },
          addTags: ["bond_rival"]
        },
        fail: {
          text: "상대의 교묘한 말재간에 잠시 밀렸으나, 이를 갈며 설욕을 다짐하는 숙명의 정적이 생겼다.",
          stats: { WP: 4, Inf: -2 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "쓸데없는 감정 소모에 말려들지 않고 무표정하게 등을 돌려 자기 일에만 집중한다",
        effect: {
          text: "시비에 휘말리지 않은 냉정함이 오히려 상급자들의 좋은 인상을 남겼다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_s3_bond_rival_reckoning",
    title: "정적과의 결판 — 위기의 밤, 적이 내민 뜻밖의 손",
    category: "인연",
    once: true,
    req: {
      allTags: ["bond_rival"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin", "navigator",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "이력: 숙명의 정적 · 크리그·야만 행성 제외",
    weight: 34,
    text: "수년간 치열하게 부딪쳐 온 숙명의 정적과 예기치 못한 위기 현장에 함께 고립되었다! 무너지는 천장과 적의 포위망 사이에서, 상처 입은 정적이 치명적인 부패 증거를 손에 쥔 채 이를 악물고 말한다. '여기서 죽기 싫으면 잠시만 손을 잡자. 아니면 지금 나를 버리고 네가 다 차지하든가!'",
    choices: [
      {
        label: "[교섭 판정] 낡은 원한을 잠시 접고 완벽한 호흡으로 위기를 돌파해 평생의 경쟁자를 든든한 동맹으로 바꾼다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "'제법이군, 역시 내 적수다워.' 사선을 함께 넘은 뒤 두 사람은 서로의 실력을 누구보다 잘 아는 유능한 협력자가 되었다!",
          stats: { Fel: 7, Inf: 8, WP: 5 },
          align: { humane: 8 }
        },
        fail: {
          text: "탈출에는 성공했으나 끝내 앙금은 완전히 풀리지 않았다. 그래도 서로의 등 뒤에 칼을 꽂지 않는 암묵적 존중은 남았다.",
          wounds: -12,
          stats: { Fel: 3, Inf: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 위기를 기회로 삼아 정적의 모든 비리와 약점을 깔끔히 회수해 완전히 실각시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉혹하지만 완벽한 승리였다! 정적은 변방으로 좌천되었고, 그대의 권위는 구역 내에서 흔들리지 않게 되었다.",
          stats: { Int: 7, Inf: 10 },
          align: { ruthless: 9 }
        },
        fail: {
          text: "정적의 거센 반격에 휘말려 함께 중상을 입고 겨우 현장을 빠져나왔다.",
          wounds: -20,
          stats: { Inf: -3 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "승부도 복수도 덮어 두고 각자 살길을 찾아 조용히 어둠 속으로 갈라선다",
        effect: {
          text: "이 잔혹한 은하에서 오래 미워할 힘조차 사치다. 두 사람은 말없이 각자의 길로 돌아섰다.",
          stats: { WP: 5, Ag: 4 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Dark Heresy 2e"
  },
  {
    id: "ev_s5_bond_family_meet",
    title: "이름 없는 인연 — 등화관제 아래 맺은 평범한 혼약과 가정",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 20,
      maxAge: 45,
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator"],
      excludeTags: [
        "bond_family",
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "sororitas_novitiate", "sororitas", "celestian", "canoness",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "krieg_grenadier",
        "high_lord_terra", "warmaster", "cardinal",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "20~45세 필멸자 · 초인·수도회·기계교·항법사·크리그·야만 행성 제외",
    weight: 28,
    text: "공습 경보가 멎은 뒤 등화관제가 깔린 밤거리에서, 몇 해 동안 배급표와 고단한 일상을 함께 나누던 인연이 조용히 손을 잡아 왔다. 내일 당장 성간 징집령이나 폭격이 떨어질지 모르는 제국이지만, 그래도 황제 폐하의 성당 앞에서 작은 가정을 꾸리고 싶다는 진심 어린 청혼이다.",
    choices: [
      {
        label: "[귀족·상류층 전용] 두 가문의 영지와 인맥을 잇는 정식 혼약 서약을 체결한다",
        req: { anyTags: ["noble", "wealthy", "rogue_trader_blood", "terra_elite"] },
        effect: {
          text: "성당의 장엄한 종소리 속에 두 가문이 하나로 묶였다. 정치적 동맹인 동시에 거친 제국에서 서로의 등을 지탱할 배우자를 얻었다.",
          stats: { Fel: 6, Inf: 7, WP: 3 },
          addTags: ["bond_family"]
        }
      },
      {
        label: "작은 성당에서 간소한 서약을 올리고 서로의 곁을 지킬 가정을 꾸린다",
        effect: {
          text: "녹슨 놋쇠 반지를 나누어 끼며 웃었다. 끔찍한 41번째 천년기 한복판에도 지켜야 할 따뜻한 등불 하나가 켜졌다.",
          stats: { WP: 5, Fel: 5 },
          faith: 4,
          addTags: ["bond_family"]
        }
      },
      {
        label: "내일의 생사조차 기약할 수 없는 삶에 누구도 묶어 둘 수 없다며 정중히 마음을 접는다",
        effect: {
          text: "아쉬운 이별을 삼키고 오직 임무와 생존에만 집중하기로 다짐했다. 가슴 한구석이 시리지만 발걸음은 가벼워졌다.",
          stats: { WP: 6, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Imperial Citizenry / Warhammer Crime: Bloodlines"
  },
  {
    id: "ev_s5_bond_heir_birth",
    title: "다음 세대의 숨결 — 제국의 하늘 아래 태어난 자녀와 진로",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 24,
      maxAge: 60,
      allTags: ["bond_family"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator"],
      excludeTags: [
        "bond_heir",
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "sororitas_novitiate", "sororitas", "celestian", "canoness",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "이력: 가정과 배우자 · 크리그·야만 행성·항법사 제외",
    weight: 34,
    text: "어둠뿐인 줄 알았던 그대의 삶에 새 생명의 울음소리가 찾아왔다. 어느덧 걸음마를 떼고 글자를 배우기 시작한 자녀를 바라보며, 배우자와 그대는 이 아이를 어떤 길로 키울지 밤새 고민에 잠긴다.",
    choices: [
      {
        label: "[권위 판정] 인맥과 저축을 총동원해 제국 상급 학원이나 상급 관청 장학생 추천을 받아 낸다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "치열한 경쟁을 뚫고 아이가 제국 정예 교육 과정에 입학했다! 부모의 희생이 아이에게 더 높은 하늘을 열어 주었다.",
          stats: { Inf: 6, WP: 5, Fel: 4 },
          faith: 5,
          addTags: ["bond_heir"]
        },
        fail: {
          text: "문턱 높은 추천 심사는 통과하지 못해 인맥과 비용만 소모했으나, 아이에게 제국 법전과 교양을 손수 가르치며 단단히 키워 냈다.",
          stats: { Int: 3, Inf: -2 },
          addTags: ["bond_heir"]
        }
      },
      {
        label: "[지성 판정] 거창한 출세 대신 살아남는 기술과 정직한 생업의 지혜를 손수 물려준다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "영특한 아이가 그대의 기술과 눈썰미를 그대로 흡수했다! 어떤 행성에 떨어져도 굶어 죽지 않을 든든한 후계자가 자라났다.",
          stats: { Int: 6, Fel: 5, T: 3 },
          addTags: ["bond_heir"]
        },
        fail: {
          text: "고된 일상 속에 밤잠을 줄여 가며 가르쳐 몸이 축났으나, 아이는 부모의 성실한 등 뒤를 보며 바르게 자랐다.",
          wounds: -5,
          stats: { WP: 3 },
          addTags: ["bond_heir"]
        }
      },
      {
        label: "전란의 시대에 욕심을 부리지 않고 가족이 한지붕 아래 무사히 자라는 데 온 힘을 쏟는다",
        effect: {
          text: "화려한 미래는 아니어도 함께 웃는 저녁 식탁을 지켜 냈다. 그 기억이 아이의 평생을 버티게 할 것이다.",
          stats: { T: 4, WP: 5, Fel: 3 },
          addTags: ["bond_heir"]
        }
      }
    ],
    source: "Lexicanum: Imperial Citizenry / Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_s5_bond_family_conscription",
    title: "가족의 시련 — 문 앞에 날아든 전시 징집 영장과 마지막 식사",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 34,
      allTags: ["bond_family"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator", "mechanicus", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "sororitas_novitiate", "sororitas", "celestian", "canoness",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "34세 이상 · 가정과 배우자 · 크리그·야만 행성·항법사 제외",
    weight: 36,
    text: "잿빛 제복의 징집 서기가 문 앞에 밀랍 인장이 찍힌 소집장을 꽂아 두고 사라졌다. 성계 밖 원정군 충원을 위해 그대의 배우자 혹은 가정의 핵심 식구가 48시간 내에 수송선 집합소로 출두하라는 명령이다. 이별의 그림자가 식탁 위에 무겁게 내려앉았다.",
    choices: [
      {
        label: "[권위 판정] 평생 쌓은 인맥과 공훈을 총동원해 최전선 대신 후방 병참·의무 보직으로 배치를 돌린다",
        check: { stat: "Inf", diff: -10 },
        success: {
          text: "수많은 청탁과 서류 끝에 안전한 후방 보급 기지 발령장을 받아 냈다! 가족의 목숨을 지켜 낸 안도감에 무릎이 풀렸다.",
          stats: { Inf: 4, Fel: 5, WP: 6 }
        },
        fail: {
          text: "징집관의 냉혹한 거절과 청탁 경고만 돌아왔다. 결국 정해진 운명을 받아들여야 했다.",
          stats: { Inf: -4, WP: 5 }
        }
      },
      {
        label: "[의지 판정] 슬픔을 삼키고 야전 응급 처치와 방호구 점검법을 밤새 전수하며 반드시 살아서 돌아오라 다짐한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "눈물 대신 단단한 생존 지혜와 행운의 성표를 품에 안겨 보냈다. 몇 해 뒤 무사하다는 편지가 도착했을 때 비로소 울음을 터뜨렸다.",
          stats: { WP: 7, T: 4, Int: 4 },
          faith: 5
        },
        fail: {
          text: "수송선이 구름 너머로 사라진 뒤 며칠간 식음을 전폐하며 깊은 상실감에 시달렸다.",
          wounds: -10,
          stats: { WP: 4 }
        }
      },
      {
        label: "남은 하룻밤 동안 아껴 둔 식량을 모두 꺼내 따뜻한 마지막 저녁을 차려 주며 조용히 손을 맞잡는다",
        effect: {
          text: "제국은 수많은 것을 빼앗아 가지만, 오늘 밤 나눈 온기만큼은 결코 앗아 가지 못한다.",
          stats: { Fel: 5, WP: 5 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Gaunt's Ghosts"
  },
  {
    id: "ev_s5_bond_heir_legacy",
    title: "후계자의 출정 — 장성한 자녀에게 물려주는 낡은 유품",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 44,
      allTags: ["bond_heir"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTrees: ["navis_navigator", "officio_assassinorum", "living_saint"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "sororitas_novitiate", "sororitas", "celestian", "canoness",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "44세 이상 · 후계자·자녀 · 크리그·야만 행성·항법사 제외",
    weight: 36,
    text: "어느새 그대의 키를 훌쩍 넘어선 자녀가 정복과 배낭을 갖추고 문턱에 섰다. 이제 자신의 삶을 개척하고 제국의 부름에 응답하러 떠날 날이다. 젊은 날의 그대를 쏙 빼닮은 눈빛이 마지막 가르침을 기다리고 있다.",
    choices: [
      {
        label: "[교섭 판정] 평생을 버텨 온 낡은 무기나 인장 반지를 건네며 '살아남아 품위를 지키라'는 가훈을 새겨 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "자녀가 눈시울을 붉히며 유품을 가슴에 품고 경례했다. 그대의 이름이 다음 세대의 자랑스러운 뿌리로 이어졌다.",
          stats: { Fel: 7, WP: 6, Inf: 5 },
          faith: 5
        },
        fail: {
          text: "세대 간의 생각 차이에 언성이 높아져 서먹한 기류가 남았으나, 떠나기 직전 짧은 포옹으로 서로를 이해했다.",
          stats: { WP: 3, Fel: -2 }
        }
      },
      {
        label: "[지성 판정] 평생 기록해 둔 처세술과 인맥 명부, 현장 노하우가 담긴 비망록을 통째로 물려준다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "수십 년의 시행착오가 담긴 비망록을 받아 든 자녀의 표정이 한결 단단해졌다. 후일 훌륭한 인재로 자리 잡았다는 소식이 들려왔다.",
          stats: { Int: 6, Inf: 6, WP: 4 }
        },
        fail: {
          text: "자녀는 부모의 인맥에 기대지 않고 자신만의 방식으로 부딪쳐 보겠다며 선을 그었으나, 비망록 몇 장만은 소중히 챙겨 떠났다.",
          stats: { WP: 3, Inf: -2 }
        }
      },
      {
        label: "말없이 자녀의 옷깃을 여며 주고 성당 문 앞까지 배웅하며 황제의 가호를 빈다",
        effect: {
          text: "멀어지는 뒷모습을 오래도록 바라보았다. 두렵지만, 내 삶이 헛되지 않았음을 깨달은 순간이었다.",
          stats: { WP: 6, T: 3 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Imperial Citizenry / Warhammer Crime"
  }
];
