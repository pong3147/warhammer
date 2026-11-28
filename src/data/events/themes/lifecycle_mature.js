// 분기 사건 — 중견기(23~45세) · 중노년기(46~65세) · 고령 황혼기(66~100세) · 노년의 유산(silver_legacy) 연작
export default [
  {
    id: "ev_s20_mat_01",
    title: "중견의 기로 — 이중 장부와 타협의 무게",
    category: "중견기",
    once: true,
    req: {
      minAge: 26,
      maxAge: 42,
      maxSocialTier: "elite",
      excludeRealms: ["heretic", "mechanicus", "cloistered"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "sororitas", "canoness", "imperial_knight", "navigator",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "planetary_governor", "sector_lord"
      ]
    },
    reqLabel: "26~42세 · 필멸자 중견 실무자",
    weight: 32,
    text: "현장을 익히고 어느덧 중간 책임을 맡게 된 어느 밤, 그대는 상급 감독관의 금고에서 실제 보급 수량과 보고 수치가 어긋난 이중 장부를 발견했다. 빼돌려진 물자의 일부는 부패한 관리의 사익으로 흘러갔지만, 나머지는 공식 절차로는 제때 닿지 못하는 하부 정비 구역의 예비 부품과 의약품을 메우는 데 쓰이고 있었다. 젊은 날의 이상대로 당장 상부에 고발하면 조직 전체가 감찰의 칼날에 피를 흘릴 것이고, 눈감으면 그대 역시 체제의 공범이 된다. 등불 아래 놓인 붉은 인장과 밀봉된 장부 사이에서 중견 실무자의 양심이 시험대에 올랐다.",
    choices: [
      {
        label: "[지성 판정] 이중 장부를 고발해 감찰 기구에 정식 보고한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "빈틈없는 회계 대조표와 함께 이중 장부를 감찰관의 책상 위에 올렸다. 부패한 상급자가 숙청된 뒤, 원칙을 굽히지 않은 그대의 이름이 조직 안에 또렷이 각인되었다.",
          stats: { Int: 6, WP: 5, Inf: 6 },
          faith: 4,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "상급 감독관의 인맥이 먼저 손을 써 감사가 유야무야 덮였고, 그대는 내부 고발자라는 싸늘한 시선 속에서 한동안 고립을 견뎌야 했다.",
          stats: { Int: 2, WP: 4, Inf: -3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 사익 지분만 잘라 내고 현장 지원선만 살려 중재한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "치밀한 협상 끝에 감독관의 사적 착복은 끊어 내고, 하부 구역으로 가던 예비 부품과 의약품은 정식 예비 항목으로 돌렸다. 이상과 현실 사이에서 가장 인간적인 해법을 찾아냈다.",
          stats: { Fel: 6, Int: 4, Inf: 4 },
          align: { humane: 8 }
        },
        fail: {
          text: "양쪽의 눈치를 보며 절충안을 밀어붙이다 과로와 신경전 끝에 기력이 크게 소진되었다. 그래도 하부 구역의 최소 보급선만은 지켜 냈다.",
          wounds: -8,
          stats: { Fel: 2, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "눈감아 주는 대가로 조직 내 지분과 침묵의 몫을 챙긴다",
        effect: {
          text: "깨끗한 손으로는 제국에서 오래 버틸 수 없다는 현실을 받아들였다. 감독관의 은밀한 후원이 열리며 출세의 발판이 넓어졌지만, 거울 속 눈빛은 전보다 차가워졌다.",
          stats: { Inf: 6, Fel: 3 },
          faith: -4,
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_s20_mat_02",
    title: "다음 세대의 제자 — 후계 도제 선발 시험",
    category: "중견기",
    once: true,
    req: {
      minAge: 30,
      maxAge: 45,
      excludeHabitats: ["void"],
      excludeRealms: ["heretic", "mechanicus", "cloistered"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "sororitas", "canoness", "imperial_knight", "navigator",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra"
      ]
    },
    reqLabel: "30~45세 · 필멸자 중견 경력자",
    weight: 32,
    text: "어느새 지시를 받던 막내가 아니라 새 세대를 길러 내야 할 연차가 되었다. 올해 배속된 수습 후보생 셋 가운데 단 한 명만 그대의 직속 부관 겸 도제로 발탁해 수십 년 익힌 비결을 전수할 수 있다. 출신은 미천하나 재능이 출중한 실력파, 재주는 투박해도 규율과 신앙이 강철 같은 충성파, 그리고 상층 유력 가문의 추천서를 들고 온 정치적 인맥파가 나란히 서서 그대의 호명을 기다린다. 누구에게 자리를 열어 주느냐가 앞으로 십 년의 부서 기풍과 그대의 입지를 가를 것이다.",
    choices: [
      {
        label: "[지성 판정] 출신을 보지 않고 뛰어난 실력파를 직속 제자로 키운다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "주변의 수군거림을 무릅쓰고 발탁한 젊은 제자가 기대를 뛰어넘는 솜씨로 난제를 척척 풀어냈다! 실력으로 사람을 알아본 그대의 안목이 널리 칭송받았다.",
          stats: { Int: 6, Fel: 5, Inf: 4 },
          align: { humane: 7 }
        },
        fail: {
          text: "유력 가문 측의 은근한 견제 탓에 행정 지원이 줄어 고생했으나, 묵묵히 기술을 익힌 제자만은 든든한 오른팔로 자라났다.",
          stats: { Int: 3, Inf: -2, WP: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 규율과 충성심이 확고한 후보를 엄격히 단련해 발탁한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "화려한 요령은 없어도 어떤 위기에서도 등을 맡길 수 있는 단단한 후계자가 탄생했다. 부서의 기강이 눈에 띄게 바로 섰다.",
          stats: { WP: 6, Inf: 5 },
          faith: 6,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "융통성 없는 제자의 실수를 수습하느라 밤샘 업무에 시달렸지만, 흔들리지 않는 충직함만은 지켜 냈다.",
          wounds: -6,
          stats: { WP: 3, T: 2 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "유력 가문의 추천서를 받아들이고 정치적 후원선을 확보한다",
        effect: {
          text: "실무는 다소 서툴어도 상층 첨탑으로 통하는 든든한 통로가 열렸다. 제국의 조직은 결국 사람의 인맥으로 굴러간다는 이치를 다시 확인했다.",
          stats: { Inf: 6, Fel: 4 },
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Dark Heresy 2e / Imperium Maledictum Core"
  },
  {
    id: "ev_s20_mat_03",
    title: "적격 심사위원회 — 침침해진 눈과 보직 해임 압박",
    category: "중노년기",
    once: true,
    req: {
      minAge: 46,
      maxAge: 62,
      maxSocialTier: "elite",
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeRealms: ["mechanicus", "heretic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "rejuvenat", "bionic", "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "planetary_governor", "sector_lord"
      ]
    },
    reqLabel: "46~62세 · 자연 수명 필멸자 중노년 (기계교·의체·리주버냇 제외)",
    weight: 34,
    text: "정기 직무 적격 심사장에 들어서자, 젊은 심사관과 메디카에 검진의가 그대의 반응 속도와 시력 저하 수치를 냉정히 짚어 냈다. 서류 말미에는 '현장 직무 부적합 — 후방 한직 전환 혹은 기초 광학·관절 보철 시술 권고'라는 붉은 도장이 찍히기 직전이다. 몸은 예전보다 무거워졌으나, 서류 위 숫자만으로는 결코 측정할 수 없는 수십 년의 현장 직관이 아직 손끝에 남아 있다. 차가운 기계 의체를 받아들일지, 필멸의 육신으로 노련함을 증명할지, 아니면 한발 물러서 행정 보직으로 전환할지 결단해야 한다.",
    choices: [
      {
        label: "[강인 판정] 기계 보철을 거절하고 실무 평가에서 노련함을 증명한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "느려진 반사 신경을 완벽한 예측과 호흡 조절로 메우며 모의 평가를 통과했다! 심사관들이 감탄하며 붉은 부적합 도장을 거두어들였다.",
          stats: { T: 6, WP: 5, Inf: 5 },
          align: { dogmatic: 5 }
        },
        fail: {
          text: "무리하게 평가에 임하다 굳은 관절에 무리가 와 며칠간 통증에 시달렸다. 조건부 유예는 받았으나 세월의 벽을 절감했다.",
          wounds: -12,
          stats: { WP: 3, Inf: -2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[지성 판정] 기초 광학 렌즈와 보조 보철 시술을 받아 현역을 잇는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "차가운 금속 렌즈와 관절 보조기가 신경에 안착하자 흐릿하던 시야가 칼날처럼 되살아났다. 필멸의 한계를 강철로 보완하며 현역 임기를 당당히 연장했다.",
          stats: { Int: 5, BS: 4, T: 4 },
          wounds: -6,
          lifeBonusExtra: 6,
          addTags: ["bionic"]
        },
        fail: {
          text: "신경 적합성 검사에서 심한 거부 반응이 나타나 시술이 중단되었고 며칠간 극심한 편두통을 앓았다. 그래도 재심사 유예 기간만은 겨우 확보했다.",
          wounds: -14,
          stats: { Int: 2, T: 2 }
        }
      },
      {
        label: "현장 고집을 접고 후방 감수·행정 보직으로 전환해 기력을 보존한다",
        effect: {
          text: "아쉬움은 남았지만 젊은 시절 쌓은 경험은 후방 기록실과 감수 탁자 위에서도 충분히 빛을 발한다. 무리하지 않고 숨을 고르며 새로운 역할을 받아들였다.",
          stats: { Int: 4, WP: 3, Inf: -2 },
          wounds: 10,
          align: { humane: 4 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Lexicanum: Augmetics"
  },
  {
    id: "ev_s20_mat_04",
    title: "후임 파벌의 공세 — 원로의 자리를 노리는 젊은 칼날들",
    category: "중노년기",
    once: true,
    req: {
      minAge: 48,
      maxAge: 65,
      minSocialTier: "common",
      maxSocialTier: "elite",
      excludeHabitats: ["void"],
      excludeRealms: ["heretic", "mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "knight_high_king", "nav_novator",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "48~65세 · 일반~상류 계층 필멸자",
    weight: 35,
    text: "수십 년간 지켜 온 그대의 직위와 관할 구역을 노리고, 야심 찬 후임 파벌이 '구시대 인사의 경직성'을 문제 삼아 합동 감사를 발의했다. 의회 회랑의 복스 통신망과 사교 모임마다 그대가 곧 밀려날 것이라는 소문이 은밀히 퍼지고 있으며, 한때 호의적이던 동료들마저 눈치를 살피며 거리를 두기 시작했다. 지금 무너지면 평생 쌓은 공적은 하룻밤 사이에 후임자들의 치적으로 흡수될 뿐이다. 노련한 경륜과 인맥으로 반격할지, 아니면 명예로운 타협선을 끌어낼지 냉정히 저울질해야 한다.",
    choices: [
      {
        label: "[권위 판정] 수십 년 인맥과 반박 자료로 파벌 공세를 정면 분쇄한다",
        check: { stat: "Inf", diff: -5 },
        critSuccess: {
          text: "감사장 한가운데서 후임 파벌의 자금 유용과 절차 위반을 조목조목 폭로하자 장내가 순식간에 얼어붙었다! 주동자들은 즉시 변방으로 좌천되었고, 그대의 권위는 향후 십 년을 흔들림 없이 지배할 반석 위에 올라섰다.",
          stats: { Inf: 12, WP: 6, Int: 4 },
          align: { ruthless: 5, dogmatic: 4 }
        },
        success: {
          text: "오랜 인맥의 증언과 빈틈없는 기록 대조가 감사단의 의심을 잠재웠다. 후임 파벌은 체면을 구긴 채 물러났고, 그대는 자리를 굳건히 지켜 냈다.",
          stats: { Inf: 7, WP: 4 },
          align: { dogmatic: 4 }
        },
        fail: {
          text: "파벌의 조직적인 흠집 내기를 완전히 막지 못해 핵심 권한 일부를 넘겨주고 말았다. 씁쓸한 후퇴였으나 직위 자체는 가까스로 보전했다.",
          stats: { Inf: -4, WP: 3 },
          align: { ruthless: 2 }
        },
        critFail: {
          text: "믿었던 측근 한 명이 결정적 순간에 상대 파벌로 자료를 넘겨 버렸다! 혹독한 공개 견책 끝에 권한이 크게 축소되었고, 울분에 잠 못 이룬 밤들이 노년의 심신을 깊이 갉아먹었다.",
          wounds: -12,
          stats: { Inf: -9, Fel: -4, WP: 3 }
        }
      },
      {
        label: "[교섭 판정] 후임 파벌 대표를 독대해 권력 분점과 예우를 맞바꾼다",
        check: { stat: "Fel", diff: 0 },
        critSuccess: {
          text: "노련한 협상 끝에 젊은 실세들을 도리어 그대의 후원망 안으로 편입시켰다! 적조차 아군으로 품는 원로라는 찬사와 함께 양측 파벌을 아우르는 조정자로 추대되었다.",
          stats: { Fel: 10, Inf: 10, Int: 4 },
          align: { humane: 7 }
        },
        success: {
          text: "실무 부담 일부를 후임자에게 넘기는 대신 감찰 권한과 원로 예우를 보장받았다. 피를 흘리지 않고 명예와 실리를 함께 지켜 냈다.",
          stats: { Fel: 6, Inf: 5 },
          align: { humane: 4 }
        },
        fail: {
          text: "타협안이 후임 파벌의 욕심을 채우지 못해 불리한 조건을 수용해야 했다. 그래도 전면 숙청만은 피했다.",
          stats: { Fel: 2, Inf: -3 },
          align: { humane: 2 }
        },
        critFail: {
          text: "약점을 내보였다고 판단한 상대가 독대 내용을 왜곡해 공개하는 바람에 이중으로 수모를 겪었다. 신뢰를 잃고 한동안 냉담한 시선 속에서 버텨야 했다.",
          wounds: -10,
          stats: { Fel: -6, Inf: -7 }
        }
      },
      {
        label: "파벌 다툼을 피하고 일부 실무를 이양하며 품위를 지킨다",
        effect: {
          text: "권좌에 매달려 추하게 무너지기보다 물러설 때를 아는 편이 오래 남는다. 실무 일부를 깔끔히 인계하자 오히려 품위 있는 선배라는 평판이 뒤따랐다.",
          wounds: 6,
          stats: { WP: 5, Inf: -2 },
          faith: 4,
          align: { humane: 4 }
        }
      }
    ],
    source: "Dark Heresy: Book of Judgement / Imperium Maledictum"
  },
  {
    id: "ev_s20_mat_05",
    title: "지워지는 연대기 — 삼십 년 전 비극의 마지막 목격자",
    category: "중노년기",
    once: true,
    req: {
      minAge: 50,
      maxAge: 65,
      maxSocialTier: "elite",
      excludeHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "planetary_governor", "sector_lord", "fabricator_general"
      ]
    },
    reqLabel: "50~65세 · 필멸자 중노년 (최고위·크리그·야만 행성 제외)",
    weight: 34,
    text: "아드미니스트라툼의 검열 서기들이 삼십 년 전 이 구역을 뒤흔들었던 기근과 방어전 실패 기록을 공식 연보에서 통째로 삭제하라는 훈령을 내려보냈다. 당시 현장에 있었던 동료들은 대부분 전사하거나 병으로 세상을 떠나, 진짜 경위를 기억하는 산증인은 이제 그대뿐이다. 진실을 숨긴 채 검열에 순응하면 편안한 노년을 보장받겠지만, 이름 없이 쓰러진 수천의 희생은 영원히 반역이나 실책으로 매도될 것이다. 낡은 개인 수첩과 검열관의 소각로 앞에서 구세대의 마지막 양심이 흔들린다.",
    choices: [
      {
        label: "[지성 판정] 사본을 암호화해 후대 서고 깊숙이 봉인하고 진실을 남긴다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "검열관의 눈을 피해 당시의 정황과 희생자 명단을 정교하게 암호화해 비공개 서고 깊은 곳에 봉인했다. 훗날 후대가 열어 볼 살아 있는 유산이 조용히 뿌리를 내렸다.",
          stats: { Int: 6, WP: 5, Inf: 4 },
          addTags: ["silver_legacy"],
          align: { humane: 8 }
        },
        fail: {
          text: "검열 수색에 걸려 원본 절반을 압수당하고 문책을 받았으나, 핵심 진술을 적은 몇 장만은 끝내 빼돌려 다음 세대의 손에 넘겼다.",
          wounds: -8,
          stats: { WP: 4, Inf: -3 },
          addTags: ["silver_legacy"],
          align: { humane: 5 }
        }
      },
      {
        label: "[의지 판정] 추도식에서 당시의 희생을 당당히 증언해 명예를 되찾는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "백발이 섞인 노장의 흔들림 없는 증언 앞에 검열 서기들도 차마 발언을 끊지 못했다. 잊힐 뻔한 이들의 명예가 되살아나며 그대의 이름이 깊은 존경 속에 남았다.",
          stats: { WP: 7, Fel: 6, Inf: 5 },
          faith: 6,
          addTags: ["silver_legacy"],
          align: { humane: 6, dogmatic: 4 }
        },
        fail: {
          text: "발언 도중 질서 유지대에 끌려 내려와 혹독한 경고를 받았으나, 광장에 모인 젊은 세대 몇 명의 귀에 진실의 씨앗만은 깊이 박혔다.",
          wounds: -10,
          stats: { WP: 3, Inf: -4 },
          align: { humane: 4 }
        }
      },
      {
        label: "제국의 안정을 위해 검열을 수용하고 낡은 기록을 불길에 넘긴다",
        effect: {
          text: "타오르는 양피지 잿더미를 바라보며 쓴 침을 삼켰다. 진실보다 질서가 우선인 제국의 냉엄한 이치에 순응한 대가로 당국의 신임은 두터워졌다.",
          stats: { Inf: 5, WP: 3 },
          faith: 4,
          align: { dogmatic: 7 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Warhammer Crime: Bloodlines"
  },
  {
    id: "ev_s20_mat_06",
    title: "황혼의 결심 — 연장 없는 필멸의 남은 이십 년",
    category: "중노년기",
    once: true,
    req: {
      minAge: 52,
      maxAge: 65,
      excludeRealms: ["heretic", "mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "rejuvenat", "bionic", "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "52~65세 · 자연 수명 필멸자 (리주버냇·의체 미시술)",
    weight: 34,
    text: "값비싼 수명 연장 시술도, 육신을 갈아 끼우는 기계 의체도 택하지 않은 채 쉰을 훌쩍 넘겼다. 등불 아래 가늘어진 손등의 힘줄을 내려다보며, 제국의 혹독한 세월 속에서 그대에게 남은 온전한 활동기는 길어야 십 년에서 이십 년 남짓이라는 사실을 담담히 헤아렸다. 두려움보다는 오히려 군더더기가 모두 걷힌 듯한 선명한 고요가 찾아온다. 꺼져 가는 필멸의 마지막 불꽃을 어떤 신념의 제단에 바칠지, 오늘 밤 스스로와의 서약을 세워야 한다.",
    choices: [
      {
        label: "[교섭 판정] 남은 세월을 약자와 후배를 돌보는 자비의 사명에 바친다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "오래 살지 못할지언정 부끄럽지 않은 끝을 남기기로 다짐했다. 그대의 따뜻한 결심이 주변 사람들의 마음을 움직이며 잔잔한 연대를 만들어 냈다.",
          stats: { Fel: 6, WP: 5, Inf: 4 },
          faith: 6,
          align: { humane: 10 }
        },
        fail: {
          text: "차가운 현실 속에서 모든 이를 구할 수 없음을 뼈저리게 느꼈으나, 곁의 한 사람이라도 지키겠다는 마음만은 꺾이지 않았다.",
          stats: { WP: 4, Fel: 2 },
          align: { humane: 6 }
        }
      },
      {
        label: "[의지 판정] 숨이 멎는 날까지 황제의 율법을 집행하는 도구로 불탄다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "육신이 닳아 없어지는 순간까지 한 치의 나태도 허락하지 않겠다는 서약을 올렸다. 서늘하고도 단단한 헌신이 노년의 등뼈를 곧게 세웠다.",
          stats: { WP: 7, T: 4, Inf: 4 },
          faith: 8,
          align: { dogmatic: 10 }
        },
        fail: {
          text: "과도한 고행과 야근 끝에 기력이 꺾여 잠시 몸져누웠으나, 다시 일어섰을 때 눈빛은 더욱 매서워져 있었다.",
          wounds: -8,
          stats: { WP: 4 },
          faith: 4,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "체면을 벗어 던지고 죽기 전 최대한의 부와 영향력을 손에 쥔다",
        effect: {
          text: "남은 시간이 짧다면 망설일 이유도 없다. 도덕의 족쇄를 풀고 냉혹한 계산으로 마지막 황금기를 움켜쥐기로 결심했다.",
          stats: { Inf: 7, Int: 4 },
          faith: -5,
          align: { ruthless: 10 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Codex: Imperial Agents"
  },
  {
    id: "ev_s20_mat_07",
    title: "백발의 원로 — 황혼의 산증인을 향한 추대",
    category: "고령기",
    once: true,
    req: {
      minAge: 66,
      maxAge: 100,
      maxSocialTier: "elite",
      excludeRealms: ["heretic", "mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "rejuvenat", "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "knight_high_king", "nav_novator",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "66~100세 · 자연 고령 필멸자 (최고위·기계교 제외)",
    weight: 36,
    text: "인류제국의 평범한 필멸자 대다수가 전쟁과 역병, 과로 속에 마흔을 넘기지 못하고 스러지는 시대에, 그대는 백발이 성성한 고령까지 살아남아 묵묵히 자리를 지켜 왔다. 오늘 소속 기관과 구역의 중견 대표들이 찾아와, 세대를 넘어 경험을 이어 줄 명예 원로 겸 고문단에 이름을 올려 달라고 정중히 청원했다. 육신의 기력은 예전 같지 않으나, 오직 오래 살아남은 자만이 품을 수 있는 묵직한 권위가 그대의 어깨 위에 놓였다. 이 추대를 받아들여 제국의 다음 세대를 위한 토대를 남길지, 아니면 조용한 은둔을 택할지 결정할 차례다.",
    choices: [
      {
        label: "[교섭 판정] 원로직을 수락하고 세대를 잇는 헌장과 규범을 제정한다",
        check: { stat: "Fel", diff: 0 },
        critSuccess: {
          text: "노년의 품격이 담긴 연설이 강당 전체를 숙연하게 만들었다! 그대의 이름을 딴 실무 헌장과 후학 지원 기금이 공식 인가를 받았고, 수십 년 뒤까지 회자될 살아 있는 유산이 완성되었다.",
          stats: { Fel: 10, Inf: 12, WP: 6 },
          faith: 8,
          addTags: ["silver_legacy"],
          align: { humane: 9 }
        },
        success: {
          text: "구역과 기관의 대표들이 만장일치로 그대를 원로로 추대했다. 노년의 경륜이 헛되지 않도록 정성껏 후대를 위한 규범을 다듬었다.",
          stats: { Fel: 6, Inf: 7, WP: 4 },
          addTags: ["silver_legacy"],
          align: { humane: 6 }
        },
        fail: {
          text: "추대는 성사되었으나 젊은 실무진 일부가 구시대 원로의 개입을 경계하며 냉담한 태도를 보였다. 그래도 원로로서 남길 최소한의 발자취는 확보했다.",
          stats: { Inf: 2, Fel: -2, WP: 3 },
          addTags: ["silver_legacy"],
          align: { humane: 3 }
        },
        critFail: {
          text: "취임 자리에서 과로로 현기증이 덮쳐 단상에서 휘청이는 바람에 이미 기력이 다한 노인이라는 수군거림이 번졌다. 추대는 보류되었고 며칠간 병상에서 씁쓸한 굴욕을 삼켜야 했다.",
          wounds: -14,
          stats: { Inf: -6, Fel: -4, WP: 3 }
        }
      },
      {
        label: "[권위 판정] 명예직을 넘어 실질적 감찰권과 인사 발언권을 요구한다",
        check: { stat: "Inf", diff: -5 },
        critSuccess: {
          text: "백발 원로의 서늘한 일갈 앞에 신진 관료들이 일제히 고개를 숙였다! 명목상의 원로를 넘어 구역 행정과 인사를 실질적으로 조율하는 막후의 거목으로 등극했다.",
          stats: { Inf: 12, Int: 6, WP: 5 },
          addTags: ["silver_legacy"],
          align: { dogmatic: 6, ruthless: 5 }
        },
        success: {
          text: "단순한 장식품이 아니라 실권을 쥔 상임 고문 자리를 관철했다. 노년의 끝자락에서도 제국의 질서를 직접 바로잡을 수 있게 되었다.",
          stats: { Inf: 8, WP: 4 },
          addTags: ["silver_legacy"],
          align: { dogmatic: 5 }
        },
        fail: {
          text: "지나친 권한 요구에 젊은 실권자들이 단합해 제동을 걸었다. 발언권은 얻지 못한 채 형식적 예우만 남았다.",
          stats: { Inf: -4, WP: 3 },
          align: { ruthless: 3 }
        },
        critFail: {
          text: "노욕을 부린다는 역공을 맞아 원로 추대 자체가 철회되고 옛 동료들마저 등을 돌렸다. 차가운 고립 속에서 권력의 무상함을 뼈저리게 맛보았다.",
          wounds: -10,
          stats: { Inf: -9, WP: 2 }
        }
      },
      {
        label: "직함을 사양하고 찾아오는 이들만 돕는 비공식 상담역으로 남는다",
        effect: {
          text: "형식적인 직책 대신 조용한 방에서 고민을 안고 찾아오는 후배들을 맞이하기로 했다. 권위가 아니라 신뢰로 남긴 노년의 자취가 잔잔히 퍼져 나갔다.",
          wounds: 8,
          stats: { WP: 5, Fel: 4 },
          faith: 5,
          addTags: ["silver_legacy"],
          align: { humane: 5 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Warhammer Crime: Grim Repast"
  },
  {
    id: "ev_s20_mat_08",
    title: "시간의 착시 — 중년의 얼굴과 여든 해의 서류",
    category: "고령기",
    once: true,
    req: {
      minAge: 68,
      maxAge: 105,
      allTags: ["rejuvenat"],
      excludeHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "68~105세 · 리주버냇 수명 연장 필멸자",
    weight: 36,
    text: "거듭된 리주버냇 시술 덕분에 거울 속 그대의 얼굴은 여전히 마흔을 갓 넘긴 중년의 탄력을 유지하고 있다. 그러나 인사 기록부 위 출생 연도를 확인한 젊은 참모와 동료들은, 두 세대 전 기록 속 인물을 마주한 듯 미묘한 경외와 위화감 사이에서 말끝을 흐린다. 그 무렵 상층 첨탑의 비공개 모임에서 또 다른 장기 리주버냇 시술자들이 초대장을 보내왔다. 짧은 생을 사는 필멸자들 틈에서 계속 어울릴지, 아니면 시간을 권위로 사들인 장수자들만의 폐쇄적 연줄로 들어설지 갈림길에 섰다.",
    choices: [
      {
        label: "[교섭 판정] 장수자 모임에 합류해 고위 연줄과 장기 거래망을 연다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "수십 년 단위로 행성 경제와 인사를 내다보는 장수자 사교계에 당당히 자리를 잡았다. 단명하는 관료들은 결코 넘볼 수 없는 은밀한 거래망이 열렸다.",
          stats: { Inf: 9, Fel: 6, Int: 4 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "이미 백 년 넘게 살아온 최상류 원로들 사이에서 풋내기 취급을 당하며 체면을 구겼다. 그래도 모임의 생리와 인맥 지형만은 눈에 익혔다.",
          stats: { Inf: -3, Fel: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[지성 판정] 서류상 연차와 젊은 외모의 간극을 역이용해 우위를 잡는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "상대방이 그대의 연륜을 얕보게 유도한 뒤, 반세기 전 판례와 선례를 정확히 짚어 내 협상 탁자를 단숨에 장악했다!",
          stats: { Int: 7, Inf: 7, WP: 4 },
          align: { dogmatic: 4, ruthless: 4 }
        },
        fail: {
          text: "지나치게 노회한 수법에 젊은 실권자들의 경계심이 높아져 한동안 까다로운 서류 감사에 시달렸다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "폐쇄된 연줄을 거절하고 젊은 동료들의 눈높이에 맞춰 걷는다",
        effect: {
          text: "시간을 오래 산다고 해서 인간다움마저 버릴 필요는 없다. 평범한 필멸자들의 짧은 기쁨과 슬픔 곁에 머물기로 하며 차분히 초대장을 덮었다.",
          stats: { WP: 5, Fel: 5 },
          faith: 5,
          align: { humane: 7 }
        }
      }
    ],
    source: "Lexicanum: Rejuvenat / Dark Heresy: Blood of Martyrs"
  },
  {
    id: "ev_s20_mat_09",
    title: "메디카에의 병상 — 쇠약한 심장과 세 갈래 연명",
    category: "고령기",
    once: true,
    req: {
      minAge: 66,
      maxAge: 100,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeHabitats: ["void"],
      excludeRealms: ["heretic", "mechanicus"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "rejuvenat", "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "66~100세 · 필멸자 고령기 (기계교·리주버냇 제외)",
    weight: 35,
    text: "소독약과 유향 냄새가 뒤섞인 메디카에 병동에서, 검진의가 그대의 심폐 기능과 혈관이 한계에 다다랐음을 차분히 통보했다. 병상 곁으로 다가온 기계교 바이오-사제는 노쇠한 장기를 축성된 보조 펌프와 기계 보철로 대체하면 십수 년은 거뜬히 버틸 수 있다고 제안한다. 한편 복도 끝 어둠 속에서는 출처 불명의 비인가 생체 추출 약재를 파는 중개인이 은밀히 눈짓하고, 침대 머리맡에는 성당 호스피탈러 수녀가 건넨 안식의 기도서가 놓여 있다. 늙은 육신의 한계 앞에서 어떤 대가를 치르며 내일을 살 것인가.",
    choices: [
      {
        label: "[강인 판정] 기계교의 심폐 보철 시술을 받아 강철로 수명을 잇는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "성유와 이진법 찬가 속에 흉곽에 자리 잡은 보조 펌프가 규칙적인 금속 박동을 울리기 시작했다. 육신의 고통이 잦아들며 새로운 연한이 열렸다.",
          stats: { T: 6, Int: 4 },
          wounds: 14,
          lifeBonusExtra: 12,
          addTags: ["bionic"],
          align: { dogmatic: 4 }
        },
        fail: {
          text: "고령의 육신이 외과 충격을 견디기 벅차 수술 후 긴 회복기를 겪어야 했다. 그래도 간신히 생명 유지 장치의 도움으로 고비는 넘겼다.",
          wounds: -16,
          stats: { T: 2 },
          lifeBonusExtra: 4
        }
      },
      {
        label: "[의지 판정] 효험이 빠르다는 비인가 생체 약재를 감수하고 투여한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "혈관을 태우는 듯한 열기 끝에 기적처럼 호흡과 근력이 되살아났다! 그러나 약재가 남긴 기묘한 오한과 불길한 꿈자리가 영혼의 한구석에 희미한 얼룩을 남겼다.",
          stats: { T: 5, Ag: 4 },
          wounds: 18,
          lifeBonusExtra: 10,
          corruption: 4,
          align: { ruthless: 7 }
        },
        fail: {
          text: "불순한 약재가 극심한 발작과 환각을 불러일으켜 사경을 헤매다 겨우 깨어났다. 수명도 얻지 못한 채 육신과 영혼에 깊은 상처만 남았다.",
          wounds: -18,
          corruption: 8,
          stats: { WP: 2 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "보철과 의심스러운 약재를 물리치고 성당 병동에서 평온히 요양한다",
        effect: {
          text: "호스피탈러 수녀의 정성스러운 간호와 고요한 기도 속에서 심장 박동이 차츰 안정되었다. 자연의 순리를 거스르지 않는 평온이 노년의 밤을 감쌌다.",
          wounds: 14,
          stats: { WP: 5 },
          faith: 8,
          corruption: -4,
          align: { humane: 5, dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Officio Medicae / Orders Hospitaller / Augmetics"
  },
  {
    id: "ev_s20_mat_10",
    title: "노현자의 중재 — 반세기 묵은 분쟁의 마지막 판결",
    category: "고령기",
    once: true,
    req: {
      minAge: 70,
      maxAge: 100,
      maxSocialTier: "elite",
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeHabitats: ["void"],
      excludeRealms: ["heretic", "mechanicus"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "knight_high_king", "nav_novator",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "70~100세 · 필멸자 고령기 (최고위·기계교 제외)",
    weight: 36,
    text: "오십 년 가까이 두 길드와 관할 구역 사이에서 피비린내 나는 보복을 낳아 온 수자원·관할권 분쟁이 마침내 그대의 탁자 위로 올라왔다. 분쟁의 발단을 직접 겪은 세대는 이미 모두 세상을 떠났고, 양측 대표들은 평생 치우침 없이 버텨 온 고령의 원로인 그대에게 마지막 중재 판결을 위임하기로 합의했다. 문서철 두께만 두 뼘이 넘고 양쪽 모두 저마다 억울한 희생을 호소하고 있어, 섣부른 판결은 또 다른 유혈 충돌을 부를 것이다. 평생 쌓아 온 식견과 품격을 모두 쏟아부어 반세기 묵은 매듭을 풀 마지막 기회다.",
    choices: [
      {
        label: "[지성 판정] 오십 년 치 원본 조약을 대조해 빈틈없는 화해안을 도출한다",
        check: { stat: "Int", diff: -5 },
        critSuccess: {
          text: "먼지 쌓인 오십 년 전 원본 계약서에서 양측 모두 잊고 있던 공동 관리 조항을 찾아냈다! 분쟁이 극적으로 종결되자 구역 전체에 종소리가 울려 퍼졌고, 그대의 판결문은 향후 백 년간 인용될 명판례로 새겨졌다.",
          stats: { Int: 10, Inf: 12, Fel: 6 },
          faith: 6,
          addTags: ["silver_legacy"],
          align: { humane: 10 }
        },
        success: {
          text: "치밀한 대조 끝에 양측의 명분과 실리를 고루 살린 조정안을 관철했다. 오십 년 묵은 원한이 마침내 법정 탁자 위에서 종지부를 찍었다.",
          stats: { Int: 6, Inf: 7, Fel: 4 },
          addTags: ["silver_legacy"],
          align: { humane: 7 }
        },
        fail: {
          text: "조정안의 세부 조항을 두고 양측이 끝내 반발해 임시 휴전 수준에 그쳤다. 그래도 당장의 유혈 충돌만은 막아 냈다.",
          stats: { Int: 3, Inf: -2 },
          align: { humane: 3 }
        },
        critFail: {
          text: "피로에 흐려진 눈으로 구판 도면의 경계선 수치를 잘못 인용하는 치명적 오판을 내리고 말았다! 양측의 거센 항의 속에 중재는 파탄 났고, 노현자의 명성에 씻기 어려운 흠집이 남았다.",
          wounds: -10,
          stats: { Inf: -9, Int: -3, WP: 2 }
        }
      },
      {
        label: "[의지 판정] 제국법의 권위로 사적 보복을 금지하고 강제 분할을 선고한다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "노장의 흔들림 없는 기백과 서슬 퍼런 훈계 앞에 두 파벌 수장들이 일제히 무릎을 꿇었다! 반세기 이어진 사적 보복이 단 하루 만에 종식되었고, 그대의 단호한 선고는 제국 질서의 귀감으로 칭송받았다.",
          stats: { WP: 10, Inf: 11, Fel: 4 },
          faith: 10,
          addTags: ["silver_legacy"],
          align: { dogmatic: 10 }
        },
        success: {
          text: "타협 없는 단호한 판결이 양측의 군말을 잠재웠다. 반발은 남았으나 누구도 제국법과 노원로의 권위에 정면으로 맞서지 못했다.",
          stats: { WP: 6, Inf: 7 },
          faith: 6,
          addTags: ["silver_legacy"],
          align: { dogmatic: 7 }
        },
        fail: {
          text: "강경 선고에 불만을 품은 하부 조직들이 태업으로 맞서며 한동안 수습에 진땀을 빼야 했다.",
          wounds: -6,
          stats: { Inf: -4, WP: 3 },
          align: { dogmatic: 4 }
        },
        critFail: {
          text: "강제 집행 직후 분노한 극단파의 투석과 습격이 법정 앞마당에서 벌어졌다! 경비대가 진압하기 전 파편에 어깨를 다쳤고, 상부로부터 분쟁을 악화시켰다는 문책을 피하지 못했다.",
          wounds: -16,
          stats: { Inf: -8, WP: 2 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "양측 원로들과 밤새 차를 나누며 다음 세대에 증오를 남기지 말자고 호소한다",
        effect: {
          text: "거창한 법리보다 오래 산 노인의 진심 어린 호소가 굳어 있던 마음을 녹였다. 두 대표가 서툴게 맞잡은 손 위로 비로소 평온한 새벽빛이 비쳤다.",
          stats: { Fel: 5, WP: 5 },
          faith: 5,
          addTags: ["silver_legacy"],
          align: { humane: 6 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites / Warhammer Crime: Bloodlines"
  },
  {
    id: "ev_s20_mat_11",
    title: "마지막 동년배의 부고 — 묘비명과 유언장을 적는 밤",
    category: "고령기",
    once: true,
    req: {
      minAge: 72,
      maxAge: 100,
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral"],
      excludeRealms: ["heretic", "mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "rejuvenat", "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "sororitas", "canoness",
        "mechanicus", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "72~100세 · 필멸자 고령기 (크리그·기계교·수도회·리주버냇 제외)",
    weight: 35,
    text: "비가 내리는 회색 납골당 회랑에서, 젊은 시절 같은 해에 사회에 첫발을 내디뎠던 마지막 동년배의 영결식을 마쳤다. 향불 연기가 흩어지는 제단 앞에 서서 문득 돌아보니, 이제 그대의 젊은 날 별명과 서툴렀던 첫 실패를 기억해 줄 같은 세대 사람은 이 행성에 아무도 남지 않았다. 그날 밤 조용한 방으로 돌아와 황동 등불을 켜고, 백지 양피지 위에 언젠가 남길 자신의 유언장과 묘비명의 첫 줄을 고르기 시작했다. 끝없는 전쟁과 망각의 제국에서 한 필멸자의 삶을 어떤 문장으로 갈무리할 것인가.",
    choices: [
      {
        label: "[의지 판정] 먼저 떠난 동년배들의 이름을 적은 추모록과 유언장을 완성한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "잉크가 마를 때까지 먼저 떠난 이들의 이름과 소소한 일화를 한 줄씩 옮겨 적었다. 슬픔이 차분한 경건함으로 가라앉으며 죽음을 두려워하지 않을 담력이 자리 잡았다.",
          stats: { WP: 7, Int: 5 },
          faith: 8,
          align: { humane: 7 }
        },
        fail: {
          text: "밀려드는 상실감에 밤새 붓을 놓았다 잡기를 반복하며 기력이 축났다. 그래도 마지막 한 줄만큼은 스스로의 손으로 마침표를 찍었다.",
          wounds: -8,
          stats: { WP: 4 },
          faith: 4,
          align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 재산과 유품을 후배와 성당 구호소에 나눌 집행 서약을 공증한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "공증 서기와 성당 사제 앞에서 깔끔하게 유산 집행 서약을 마쳤다. 떠난 뒤에도 아끼던 물건과 재산이 헛되이 흩어지지 않으리라는 안도감이 찾아왔다.",
          stats: { Fel: 6, Inf: 6, WP: 4 },
          faith: 6,
          align: { humane: 8 }
        },
        fail: {
          text: "유품 처분을 두고 먼 친인척과 주변 이해관계자들이 불만을 쏟아내느라 진을 뺐으나, 핵심 기부 조항만은 굽히지 않고 관철했다.",
          stats: { Fel: 2, Inf: -3 },
          align: { humane: 4 }
        }
      },
      {
        label: "화려한 묘비명 대신 황제의 종복으로 살다 간다는 한 줄만 남기고 불을 끈다",
        effect: {
          text: "긴 변명도, 거창한 찬사도 필요 없다. 조용히 양피지를 접어 봉인한 뒤 오랜만에 깊고 평온한 잠에 들었다.",
          wounds: 6,
          stats: { WP: 6 },
          faith: 8,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Lexicanum: Ecclesiarchy"
  },
  {
    id: "ev_s20_mat_12",
    title: "노년의 유산 — 새 세대의 시험대에 오른 그대의 흔적",
    category: "유산 회수",
    once: true,
    req: {
      minAge: 55,
      allTags: ["silver_legacy"],
      excludeHabitats: ["void"],
      excludeBodyClasses: ["daemonic"],
      excludeRealms: ["heretic"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "55세+ · 이력: 노년의 유산",
    weight: 38,
    text: "그대가 노년의 경륜을 쏟아 세워 둔 기록과 규범, 그리고 후학들이 이어받은 유산이 거센 시대의 압박 속에 첫 번째 큰 시험대에 올랐다. 전선 보급난과 관료제의 냉혹한 효율 논리를 앞세운 새 세대의 개혁파가, 그대가 남긴 헌장과 기록 보존 조항을 시대에 뒤처진 낭비라며 폐지하려 들고 있다. 한편 그대의 가르침을 기억하는 젊은 실무자 몇 명이 밤늦게 찾아와, 이 유산을 지켜 낼 마지막 지침을 구하며 절박한 눈빛을 보낸다. 이제 무대의 주인은 다음 세대이지만, 마지막 등불을 어떻게 건네주느냐가 유산의 운명을 가른다.",
    choices: [
      {
        label: "[교섭 판정] 직접 의회 연단에 서서 유산의 본뜻을 웅변하고 후학들을 지원한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "노원로의 묵직한 연설에 흔들리던 중립 의원들이 일제히 손을 들어 주었다! 폐지안이 부결되자 젊은 후학들이 눈시울을 붉히며 그대에게 깊이 고개를 숙였다.",
          stats: { Fel: 7, Inf: 8, WP: 6 },
          faith: 6,
          align: { humane: 8 }
        },
        fail: {
          text: "새 세대의 다수결에 밀려 조항 일부가 축소되었고 무리한 연설 끝에 기력이 소진되었다. 그래도 유산의 핵심 골격만은 지켜 냈다.",
          wounds: -8,
          stats: { WP: 4, Inf: -3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[지성 판정] 옛 규범을 새 시대의 언어로 재설계해 살아남도록 바꾼다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "형식에 집착하지 않고 전시 효율 기준에 맞춘 개정안을 밤새 다듬어 내자, 개혁파마저 그대의 유연한 지혜를 인정하며 유산의 핵심 원칙을 채택했다!",
          stats: { Int: 8, Inf: 7, WP: 5 },
          align: { humane: 5, dogmatic: 4 }
        },
        fail: {
          text: "타협안을 조율하는 과정에서 원래 뜻이 다소 흐려져 아쉬움이 남았으나, 유산 자체가 사라지는 최악의 사태만은 막았다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "노인의 개입을 멈추고 다음 세대가 스스로 지키고 책임지도록 손을 놓는다",
        effect: {
          text: "진정한 유산은 지킨다고 남는 것이 아니라 다음 세대가 제 힘으로 다시 빚어 낼 때 살아남는다. 믿음을 담아 한발 물러서자 젊은이들의 눈빛이 한층 단단해졌다.",
          wounds: 8,
          stats: { WP: 7 },
          faith: 6,
          align: { humane: 4, dogmatic: 4 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Warhammer Crime: Bloodlines"
  }
];
