// 3파 딜레마 · 속죄 · 초인 · 고위직 성향 사건
export default [
  {
    id: "ev_s165_align_dilemma_01",
    title: "장터 골목의 훔친 배급빵",
    category: "유년기",
    once: true,
    req: {
      minAge: 8,
      maxAge: 13,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: ["astartes", "custodes", "grey_knight", "transhuman"]
    },
    reqLabel: "유년기 8~13세 · 일반/하층 · 크리그 제외",
    weight: 30,
    text: "북적이는 거주구 장터의 좁은 뒷골목에서 그대보다 어린 고아 소년이 낡은 외투 속에 훔친 해조류 배급빵 한 덩이를 급히 쑤셔 넣고 있었다. 저편에서는 화가 난 상인이 치안대원을 부르며 고함을 치고 있었다. 막다른 골목에 몰린 소년이 깡마른 두 손으로 빵을 꼭 끌어안은 채 공포에 질린 눈으로 그대를 올려다보았다.",
    choices: [
      {
        label: "빈 상자 더미 뒤에 소년을 숨겨 주고 상인이 지나간 뒤 함께 배급빵을 나누어 먹는다",
        effect: {
          text: "거칠고 딱딱한 빵이었지만 두 사람이 나눠 먹자 이상할 만큼 따뜻했다. 그날의 작은 온정이 훗날에도 쉽게 지워지지 않는 마음의 씨앗이 되었다.",
          stats: { Fel: 4, WP: 3 },
          align: { humane: 8 }
        }
      },
      {
        label: "곧장 골목 입구로 뛰어가 상인과 치안대원에게 도둑이 숨은 자리를 정확히 가리킨다",
        effect: {
          text: "소년은 울부짖으며 끌려갔지만, 상인은 정직한 제국 어린이라며 칭찬했다. 법을 어긴 자는 나이를 불문하고 대가를 치른다는 교훈을 일찍 새겼다.",
          stats: { WP: 4, Inf: 3 },
          faith: 3,
          align: { dogmatic: 8 }
        }
      },
      {
        label: "입을 다물어 주는 대가로 빵의 절반과 소년이 차고 있던 놋쇠 단추까지 먼저 빼앗는다",
        effect: {
          text: "소년은 원망스러운 눈으로 물러났으나 그대의 손에는 공짜 배급빵과 쓸 만한 놋쇠 단추가 남았다. 약한 자는 빼앗길 뿐이라는 거친 거리의 법칙을 체득했다.",
          stats: { Ag: 3, Int: 3, Inf: 2 },
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Imperial Life"
  },
  {
    id: "ev_s165_align_dilemma_02",
    title: "산성비 폐허 속의 어린 탈영병",
    category: "성향",
    once: true,
    req: {
      minAge: 18,
      excludeRealms: ["void"],
      excludeWorlds: ["voidborn", "krieg"],
      excludeWorldTags: ["krieg", "voidborn", "feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "성인 18세+",
    weight: 28,
    text: "산성비를 피해 들어선 버려진 통신 중계소 안에서, 갓 징집된 듯 어린 병사 한 명이 연대 휘장을 뜯어낸 채 덜덜 떨고 있었다. 첫 돌격에서 소대 전원이 몰살당한 충격에 전선을 이탈해 숨어든 탈영병이었다. 바깥 폐허 너머로 헌병 순찰대의 탐조등 불빛이 점점 가까이 다가오고 있었다.",
    choices: [
      {
        label: "[민첩 판정] 여분의 외투를 덮어 주고 순찰대의 눈을 피해 후방 수송로로 빠져나가게 도와준다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "탐조등의 사각지대를 뚫고 무사히 그를 후방 수송열차 곁까지 안내했다. 눈물을 쏟으며 사라진 어린 병사의 뒷모습을 보며 무거운 안도를 삼켰다.",
          stats: { Ag: 4, Fel: 4, WP: 3 },
          align: { humane: 9, dogmatic: -4 }
        },
        fail: {
          text: "순찰대에 발각되어 거친 실랑이와 경미한 부상을 겪었으나, 혼란을 틈타 어린 탈영병만큼은 어둠 속으로 놓아 보냈다.",
          wounds: -8,
          stats: { Inf: -3, WP: 2 },
          align: { humane: 7, dogmatic: -3 }
        }
      },
      {
        label: "즉시 무장을 해제하고 커미사리아트 순찰대에 인계한다 — 황제 앞의 비겁함에는 용서가 없다",
        effect: {
          text: "순찰 장교는 그대의 투철한 신고 정신을 치하하며 탈영병을 즉결 심판소로 끌고 갔다. 전선의 기강은 단 한 사람의 동정으로도 무너질 수 없다.",
          stats: { WP: 5, Inf: 4 },
          faith: 5,
          align: { dogmatic: 9, humane: -5 }
        }
      },
      {
        label: "그의 라스카빈과 비상 식량, 위조 통행 서류만 몽땅 빼앗아 암시장에 팔아넘기고 폐허에 버려둔다",
        effect: {
          text: "군용 장비와 서류는 뒷골목에서 쏠쏠한 값으로 팔렸다. 텅 빈 손으로 폐허에 남겨진 탈영병이 그 밤을 넘겼는지는 알 필요조차 없었다.",
          stats: { Inf: 5, Int: 3 },
          align: { ruthless: 9, humane: -5 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Gaunt's Ghosts"
  },
  {
    id: "ev_s165_align_dilemma_03",
    title: "기근이 덮친 하이브의 봉인된 식량 창고",
    category: "성향",
    once: true,
    req: {
      minAge: 20,
      anyWorldTags: ["hive"],
      excludeWorlds: ["terra", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel",
        "high_lord_terra", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg", "voidborn"]
    },
    reqLabel: "필멸자 20세+ · 하이브 월드(테라 제외)",
    weight: 28,
    text: "워프 폭풍으로 궤도 식량 바지선의 도착이 끊기면서 하부 하이브에 끔찍한 대기근이 닥쳤다. 그대 앞에는 행성 외곽 성전군에 바칠 십일조 곡물이 가득 쌓인 아드미니스트라툼 예비 창고가 붉은 밀랍 인장으로 봉인되어 있었다. 녹슨 철문 바깥에서는 뼈만 앙상하게 남은 시민들이 희미한 힘으로 문을 두드리며 식량을 애원하고 있었다.",
    choices: [
      {
        label: "붉은 십일조 봉인을 깨뜨리고 굶주린 군중에게 질서 있게 곡물을 비상 배급한다",
        effect: {
          text: "아드미니스트라툼의 엄중한 문책과 권위 실추를 피할 수 없었으나, 그날 밤 굶어 죽을 뻔한 수백의 생명이 따뜻한 죽 한 그릇으로 새벽을 맞았다.",
          stats: { Fel: 5, WP: 5, Inf: -4 },
          faith: 2,
          align: { humane: 10, dogmatic: -5 }
        }
      },
      {
        label: "[특성 전용 · 은빛 혀] 성전군 조달관과 하이브 대표를 중재해 합법적 비상 방출 협정을 끌어낸다",
        req: { allTags: ["silver_tongue"] },
        effect: {
          text: "치밀한 언변으로 행정 책임 면제와 비상 식량 방출을 동시에 성사시켜 굶주린 군중과 상부 모두의 신뢰를 얻었다.",
          stats: { Fel: 4, Inf: 4 },
          align: { humane: 8 }
        }
      },
      {
        label: "[의지 판정] 철문 앞에 버티고 서서 십일조 봉인을 사수한다 — 십일조 미납은 행성 전체의 파멸을 부른다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "서릿발 같은 결의 앞에 굶주린 군중도 끝내 문을 넘지 못했다. 성전군에 바칠 십일조는 단 한 톨의 손실도 없이 보존되었고, 상부는 그대의 충성을 높이 평가했다.",
          stats: { WP: 6, Inf: 5 },
          faith: 5,
          align: { dogmatic: 10, humane: -5 }
        },
        critSuccess: {
          text: "압도적인 위엄으로 폭동을 잠재웠을 뿐 아니라, 성직자단의 비상 구호 물자까지 이끌어 내어 체면과 질서를 모두 지켰다.",
          stats: { WP: 7, Inf: 7 },
          faith: 6,
          addTags: ["iron_nerves"],
          align: { dogmatic: 10 }
        },
        fail: {
          text: "돌팔매와 몸싸움 속에 큰 상처를 입으며 간신히 창고 절반의 봉인을 지켰다. 쓰라린 상처 너머로 제국 의무의 냉혹함이 뼈저리게 남았다.",
          wounds: -10,
          stats: { WP: 3 },
          align: { dogmatic: 7, humane: -4 }
        },
        critFail: {
          text: "군중의 난입을 막지 못해 십일조 창고 절반이 약탈당했고, 아드미니스트라툼으로부터 막대한 손실 배상 책임을 떠안았다.",
          wounds: -14,
          addTags: ["imperial_debt"],
          align: { dogmatic: 4 }
        }
      },
      {
        label: "한밤중에 후면 하역구를 열어 곡물 절반을 암시장 중개상 트럭에 빼돌리고 천문학적인 폭리를 취한다",
        effect: {
          text: "기근이 깊어질수록 곡물 한 포대의 가격은 치솟았다. 공식 장부는 쥐 떼 피해로 덮어 버렸고, 그대의 비밀 금고는 눈부시게 불어났다.",
          stats: { Inf: 8, Int: 4 },
          faith: -4,
          align: { ruthless: 10, humane: -6 }
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Adeptus Administratum"
  },
  {
    id: "ev_s165_align_dilemma_04",
    title: "양심의 갈림길 — 핏빛 장부 앞의 속죄",
    category: "성향",
    once: true,
    req: {
      minAge: 22,
      minAlign: { ruthless: 20 },
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "암흑 20+ · 속죄 분기 · 크리그·야만 행성 제외",
    weight: 34,
    text: "깜박이는 기름 등잔 아래 홀로 앉은 밤, 그대는 지금의 자리에 오르기까지 이용하고 짓밟아 온 이들의 이름이 빼곡한 비밀 장부를 마주했다. 문득 그대를 철석같이 믿었다가 파멸한 희생자의 텅 빈 눈동자가 뇌리를 스치며, 오랫동안 굳어 있던 가슴 한구석을 날카롭게 찔렀다. 오늘 밤이라면 이 냉혹한 사슬을 끊어 낼 수도, 혹은 영원히 강철로 굳혀 버릴 수도 있었다.",
    choices: [
      {
        label: "협박 증서를 불태우고 착복했던 자금을 피해자 구역에 익명으로 되돌려 보내며 자비의 길로 돌이킨다",
        effect: {
          text: "재로 변해 가는 장부를 지켜보며 오래된 족쇄가 풀리는 듯한 숨을 내쉬었다. 영향력은 줄었으나 타락의 벼랑 끝에서 인간의 양심을 되찾았다.",
          stats: { WP: 6, Fel: 4, Inf: -4 },
          corruption: -4,
          removeTags: ["notorious_ruthless"],
          align: { ruthless: -12, humane: 8 }
        }
      },
      {
        label: "에클레시아키 고해사 앞에 무릎 꿇어 부정한 재물을 십일조로 헌납하고 가혹한 고행 속죄를 받는다",
        effect: {
          text: "등짝을 가르는 채찍질과 차가운 석조 바닥 위의 기도 끝에 탐욕의 때를 씻어 냈다. 피 묻은 속죄는 꺾이지 않는 교조적 신앙으로 다시 벼려졌다.",
          wounds: -10,
          stats: { WP: 6 },
          faith: 8,
          corruption: -6,
          removeTags: ["notorious_ruthless"],
          align: { ruthless: -10, dogmatic: 8 }
        }
      },
      {
        label: "쓸데없는 감상을 차갑게 비웃으며 장부를 금고 깊숙이 잠그고 다음 먹잇감을 계산한다",
        effect: {
          text: "후회는 패배자의 사치일 뿐이다. 마지막 남은 망설임마저 짓밟아 버린 그대의 눈빛은 그 어느 때보다 차갑고 선명하게 빛났다.",
          stats: { Int: 4, Inf: 5, WP: 3 },
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Lexicanum: Imperial Creed / Dark Heresy: Blood of Martyrs"
  },
  {
    id: "ev_s165_align_dilemma_05",
    title: "궤도 폭격 회랑의 필멸자들 — 초인의 결단",
    category: "초인",
    once: true,
    req: {
      minAge: 20,
      allTags: ["astartes", "battle_brother"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "grey_knight"]
    },
    reqLabel: "초인: 아스타르테스 배틀 브라더 이상 · 20세+",
    weight: 36,
    text: "그대의 타격 분대가 무너진 고가도로 너머로 진격해 오는 반역자 기갑 선봉대를 내려다보고 있다. 궤도 상공의 타격 순양함이 살상 구역에 랜스 포격을 조준 완료했으나, 교각 접근로에는 아직 대피하지 못한 제국 필멸자 난민 삼천여 명이 뒤엉켜 있었다. 궤도 포격 승인을 기다리는 함교의 복스 채널 너머로 그대의 전술 판단이 요구되었다.",
    choices: [
      {
        label: "[강인 판정] 불칸의 후예들처럼 고가도로로 강하해 세라마이트 장갑 방벽을 세우고 필멸자들이 탈출할 때까지 적 선봉을 온몸으로 막아 낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "세라마이트 장갑에 포탄이 튀는 가운데 한 걸음도 물러서지 않고 삼천의 필멸자를 사선 밖으로 빼낸 뒤 궤도 포격을 호출했다. 초인의 힘은 인류를 지키기 위해 존재한다는 맹세가 전장을 울렸다.",
          wounds: -10,
          stats: { WS: 5, T: 6, WP: 6, Inf: 5 },
          faith: 5,
          align: { humane: 11 }
        },
        critSuccess: {
          text: "적 전차의 포격을 장갑으로 튕겨 내며 난민 전원을 구출했고, 궤도 포격 직전 적 지휘 차량의 포탑까지 뜯어내며 살아남았다.",
          wounds: -3,
          stats: { WS: 6, T: 7, WP: 7, Inf: 6 },
          faith: 7,
          addTags: ["battle_hardened"],
          align: { humane: 12 }
        },
        fail: {
          text: "적 중화기에 장갑이 찢기고 깊은 상처를 입었으나, 끝내 대열을 지켜 난민 대다수를 구출했다. 궤도 포격이 뒤늦게 적 기갑을 불태울 때 필멸자들은 천사의 이름을 외쳤다.",
          wounds: -18,
          stats: { T: 4, WP: 4 },
          align: { humane: 9 }
        }
      },
      {
        label: "아스타르테스의 냉엄한 전술 효율에 따라 감상을 배제하고 즉각 궤도 폭격을 승인한다",
        effect: {
          text: "눈부신 랜스 광선이 교각과 반역자 기갑 선봉을 단숨에 증발시켰다. 수천의 필멸자도 함께 재가 되었으나, 성계 전체를 위협하던 적 주력을 최소 손실로 섬멸한 완벽한 전술 승리였다.",
          stats: { Int: 5, WP: 5, Inf: 5 },
          faith: 4,
          align: { dogmatic: 11, humane: -5 }
        }
      },
      {
        label: "도망치는 인파가 적 전차의 기동을 가로막는 미끼가 되도록 포격을 잠시 늦췄다가 적 지휘 전차가 멈춘 순간 일제 사격을 내린다",
        effect: {
          text: "혼란에 빠진 난민들이 자연스레 적 기갑의 속도를 묶어 놓은 틈을 타 지휘 전차까지 한꺼번에 잿더미로 만들었다. 비정할 만큼 효율적인 학살이었으나 전과는 압도적이었다.",
          stats: { Int: 6, BS: 4, Inf: 4 },
          align: { ruthless: 11, humane: -7 }
        }
      }
    ],
    source: "Codex: Space Marines / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s165_align_dilemma_06",
    title: "하부 하이브 역병 선포령 — 권좌의 무게",
    category: "고위직",
    once: true,
    req: {
      minAge: 30,
      anyTags: [
        "planetary_governor", "sector_lord", "high_lord_terra", "inquisitor",
        "rogue_trader", "general_rank", "warmaster", "navy_admiral", "cardinal", "magos"
      ],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "고위직 · 30세+",
    weight: 36,
    text: "지휘 성소의 거대한 홀로리스 작전탁 위로 제3하부 하이브를 뒤덮은 붉은 역병 경보 룬이 맥박처럼 점멸하고 있다. 전염성이 극심한 괴질이 상층 군수 공장 첨탑으로 번질 경우 행성 전체의 십일조 생산이 마비될 위기다. 전략 참모와 생물학 사제, 아르비테스 사령관이 침묵 속에 그대의 인장 반지를 바라보고 있으며, 그대의 서명 한 번에 이백만 제국 영혼의 생사가 갈린다.",
    choices: [
      {
        label: "[지성 판정] 막대한 물류 손실을 감수하고 함대 의료 바지선과 검역 셔틀을 총동원해 비감염 구역을 선별 대피시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정밀한 격리선과 신속한 궤도 검역 작전 덕분에 역병을 차단하면서도 백만 이상의 시민을 구해 냈다. 권좌의 위엄은 파괴가 아니라 보존에서 비롯됨을 행성 전체에 각인시켰다.",
          stats: { Fel: 6, Int: 5, Inf: 5 },
          faith: 4,
          align: { humane: 11, dogmatic: -3 }
        },
        fail: {
          text: "대규모 대피 과정에서 막대한 행정 비용과 군수 차질이 발생해 상부와 귀족 의회의 거센 비난을 받았으나, 수십만의 생명을 화염에서 건져 냈다.",
          stats: { Inf: -5, Int: 3, WP: 4 },
          align: { humane: 8 }
        }
      },
      {
        label: "모든 격벽을 용접 봉쇄하고 제3하부 하이브 외곽에 프로메튬 화염 저지선을 선포해 역병을 뿌리째 소각한다",
        effect: {
          text: "사흘 밤낮으로 솟아오른 정화의 불기둥이 역병과 함께 이백만의 비명을 삼켰다. 상층 공장과 행성 십일조는 단 하루도 멈추지 않았으며, 제국의 냉혹한 생존 법칙이 지켜졌다.",
          stats: { WP: 6, Inf: 6 },
          faith: 6,
          corruption: -5,
          align: { dogmatic: 11, humane: -6 }
        }
      },
      {
        label: "감염 구역의 노동자들을 무장 자동 포탑으로 공장에 가둔 채, 쓰러지기 직전까지 최후의 전쟁 십일조를 쥐어짠다",
        effect: {
          text: "죽어 가는 하부 하이브에서 마지막 탄약 상자와 군수품까지 완벽히 뽑아낸 뒤에야 봉쇄를 내렸다. 천문학적인 생산 실적과 이권이 그대의 권좌 아래 쌓였으나, 역사의 기록은 이를 냉혹한 폭정으로 새겼다.",
          stats: { Inf: 9, Int: 5 },
          faith: -4,
          align: { ruthless: 11, humane: -8 }
        }
      }
    ],
    source: "Lexicanum: Planetary Governor / Codex: Imperialis"
  }
];
