// 분기 사건 — 연간 삶의 초점(1·2막 심화, 12종)
export default [
  {
    id: "ev_focus_survival",
    title: "생존의 법칙 — 오염 구역의 정수 필터와 비상 약품",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["survival"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "fabricator_general", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "삶의 초점: 생존과 보양",
    weight: 26,
    text: "몸을 돌보며 하루하루를 버티는 데 전념하던 중, 거주 구역 상수도관에 공업 폐수가 섞여 들며 주민들 사이에서 기침병이 돌기 시작했다. 미리 모아 둔 예비 부품과 약품이 생사를 가를 순간이 왔다.",
    choices: [
      {
        label: "[강인 판정] 직접 호흡 필터와 비상 약품을 조합해 독기를 이겨 내는 완벽한 보양 체계를 갖춘다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "오염된 공기와 물 속에서도 끄떡없는 강철 같은 체력을 다졌다! 장기 생존에 큰 밑천을 확보했다.",
          stats: { T: 6 },
          wounds: 18,
          lifeBonusExtra: 6
        },
        fail: {
          text: "여과 필터 교체 도중 유독 가스를 마셔 며칠간 앓아누웠으나, 덕분에 독성에 대한 요령은 몸에 배었다.",
          wounds: -10,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 배급 정제수와 시체 전분의 오염 성분을 분석해 구역 주민들에게 안전한 끓임 수칙을 알린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "간단한 침전 여과법만으로 수십 명의 목숨을 구했다! 이웃들이 감사의 뜻으로 귀한 식량과 약초를 나누어 주었다.",
          stats: { Int: 5, Fel: 4 },
          wounds: 12, align: { humane: 8 }
        },
        fail: {
          text: "임시 분석 도구가 망가져 소소한 손해를 보았으나, 스스로의 식수만은 안전하게 걸러 냈다.",
          wounds: -6,
          stats: { Int: 2 }, align: { humane: 4 }
        }
      },
      {
        label: "무리하지 않고 미리 비축해 둔 정제수와 식량으로 조용히 체력을 아끼며 고비를 넘긴다",
        effect: {
          text: "욕심내지 않고 몸을 보전한 덕에 유행병이 휩쓸고 간 뒤에도 멀쩡히 살아남았다.",
          stats: { T: 3 },
          wounds: 14, align: { ruthless: 4 }
        }
      }
    ],
    source: "Imperium Maledictum Core Rulebook / Dark Heresy: Hive Life"
  },
  {
    id: "ev_focus_combat",
    title: "피와 강철의 연마 — 베테랑 교관의 실전 대련장",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["combat"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "knight_high_king", "nav_novator",
        "general_rank", "navy_admiral", "lord_inquisitor", "fabricator_general"
      ]
    },
    reqLabel: "삶의 초점: 무예와 전투 훈련",
    weight: 26,
    text: "쉬지 않고 무예를 갈고닦던 훈련장에 백전노장 교관이 나타나 팔짱을 꼈다. '허수아비만 베어서는 진짜 전장에서 삼 초도 못 버틴다. 진짜 살기를 견딜 배짱이 있다면 내 실전 코스에 올라와 보라.'",
    choices: [
      {
        label: "[백병 판정] 둔화 날을 씌운 모의 체인블레이드로 교관과 정면 근접 대련을 벌인다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불꽃이 튀는 공방 끝에 교관의 빈틈을 찔러 무기를 쳐 냈다! 훈련장 전체에 환호가 터지며 실전 감각이 한 단계 도약했다.",
          stats: { WS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "교관의 노련한 반격에 바닥을 굴러 멍투성이가 되었으나, 뼈아픈 실전 교훈이 근육에 새겨졌다.",
          wounds: -14,
          stats: { WS: 3 }
        }
      },
      {
        label: "[사격 판정] 연막과 이동 표적이 뒤섞인 실탄 장애물 코스를 단 한 발의 오차 없이 돌파한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "연막 너머로 튀어나온 표적 열두 개를 숨 쉴 틈 없이 꿰뚫었다! 교관이 말없이 탄창 하나를 던져 주며 엄지를 세웠다.",
          stats: { BS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "도탄 파편에 팔을 스쳐 상처를 입었으나, 끝까지 코스를 완주해 사격 리듬을 다잡았다.",
          wounds: -10,
          stats: { BS: 3 }
        }
      },
      {
        label: "무리한 대결을 피하고 기본 방어 자세와 보법을 천 번씩 반복 숙달한다",
        effect: {
          text: "화려하진 않지만 전장에서 목숨을 지켜 주는 것은 결국 뼈에 밴 기본기다. 흔들림 없는 자세가 몸에 익었다.",
          stats: { WS: 3, BS: 3, T: 3 }
        }
      }
    ],
    source: "Only War Core Rulebook / Dark Heresy 2nd Edition"
  },
  {
    id: "ev_focus_faith",
    title: "황제 신앙의 시험 — 성소 촛불과 의심의 밤",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["faith"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "cardinal"
      ]
    },
    reqLabel: "삶의 초점: 황제 신앙과 기도",
    weight: 26,
    text: "끝없는 전쟁과 부조리가 가득한 은하계 속에서 기도에 매달리던 어느 폭풍우 치는 밤, 성소의 촛불이 일제히 흔들리며 '황제께서 정말 우리처럼 미천한 자의 기도를 들으시는가' 하는 서늘한 의심이 마음속을 파고든다.",
    choices: [
      {
        label: "[의지 판정] 차가운 석조 바닥에 밤새 무릎 꿇고 성가를 암송하며 내면의 의심과 워프 잔재를 씻어 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "동이 틀 무렵 마음속의 안개가 말끔히 걷히고 흔들리지 않는 황금빛 확신이 자리 잡았다! 정신의 오염까지 크게 정화되었다.",
          stats: { WP: 7 },
          faith: 14,
          corruption: -10, align: { dogmatic: 8 }
        },
        fail: {
          text: "밤샘 고행 끝에 무릎과 몸살로 탈진했으나, 새벽 종소리와 함께 신앙의 불씨만은 지켜 냈다.",
          wounds: -10,
          faith: 6, align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 폭풍에 겁먹어 성소에 모여든 시민과 병사들 앞에서 황제의 가호를 힘차게 설파한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "그대의 진심 어린 기도가 군중의 공포를 용기로 바꾸어 놓았다! 지역 사제가 그대의 신심을 크게 치하했다.",
          stats: { Fel: 6, Inf: 5 },
          faith: 10, align: { humane: 6 }
        },
        fail: {
          text: "목소리가 갈라져 군중의 호응을 얻지 못한 채 설교가 헛돌았다. 주위의 싸늘한 시선에 체면이 깎였으나, 끝까지 남아 기도한 소수와는 조용한 연대를 나누었다.",
          stats: { Inf: -2 },
          faith: 2, align: { humane: 3 }
        }
      },
      {
        label: "묵묵히 아퀼라 성호를 긋고 소박한 밀랍 초 하나를 봉헌하며 고요한 위안을 얻는다",
        effect: {
          text: "거창한 기적은 없었으나, 작은 불꽃을 바라보는 사이 흔들리던 마음이 잔잔히 가라앉았다.",
          stats: { WP: 3 },
          faith: 8,
          corruption: -4, align: { dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Cult / Codex: Adepta Sororitas"
  },
  {
    id: "ev_focus_lore",
    title: "잊힌 서고의 단편 — 고대 하이 고딕 사본 해독",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["lore"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "high_lord_terra", "fabricator_general", "departmento_head", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "삶의 초점: 학문과 기계 교리",
    weight: 26,
    text: "학문과 기계 교리에 몰두하던 중, 먼지 쌓인 아드미니스트라툼 폐기 서고 구석에서 3천 년 전 성계 항로와 기계 정비 주석이 뒤섞인 고대 하이 고딕 양피지 묶음을 발견했다. 다만 마지막 장에는 붉은 인장으로 검열 표시가 찍혀 있다.",
    choices: [
      {
        label: "[지성 판정] 난해한 고대 약어와 이진법 주석을 정밀 해독해 잊힌 보급 항로와 정비 기법을 복원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 항해 수칙과 정밀 정비 공식을 완벽히 복원해 학계와 행정부의 주목을 한 몸에 받았다!",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "며칠 밤을 새우다 곰팡이 포자를 들이마셔 눈과 폐를 상했으나, 귀한 필사 메모 몇 장은 건졌다.",
          wounds: -6,
          stats: { Int: 3 }
        }
      },
      {
        label: "[의지 판정] 붉은 검열 장에 숨겨진 불경한 워프 주석을 즉시 식별해 규정대로 봉인·신고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "유혹적인 금서를 읽지 않고 즉시 정화 절차를 밟았다! 서고 감찰관이 그대의 철저한 정통성을 높이 평가했다.",
          stats: { WP: 6, Int: 4 },
          faith: 6,
          corruption: -5
        },
        fail: {
          text: "봉인 도중 기괴한 도형을 잠깐 들여다보는 바람에 며칠간 머릿속에서 불쾌한 숫자가 맴돌았다.",
          stats: { Int: 4 },
          corruption: 6
        }
      },
      {
        label: "위험해 보이는 검열 장은 아예 펼치지 않고 안전한 실무 행정과 기계 교리 부분만 필사한다",
        effect: {
          text: "쓸데없는 화를 피하면서도 실무에 당장 쓰일 탄탄한 지식을 차곡차곡 쌓아 올렸다.",
          stats: { Int: 5, WP: 2 }
        }
      }
    ],
    source: "Dark Heresy 1st Edition / Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_focus_politics",
    title: "권력의 연회장 — 파벌 청탁과 비밀 서신",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["politics"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "fabricator_general", "knight_high_king", "nav_novator"
      ],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"]
    },
    reqLabel: "삶의 초점: 인맥과 출세 도모",
    weight: 26,
    text: "인맥을 넓히며 출세를 도모하던 중, 상층 첨탑의 비공개 연회에 초대받았다. 상인 길드장과 행정국 서기관 파벌이 십일조 운송권을 두고 은밀히 칼날을 겨누는 가운데, 양쪽 모두 그대에게 자기편의 메신저가 되어 달라며 금화 주머니와 승진 추천서를 내민다.",
    choices: [
      {
        label: "[교섭 판정] 양측의 체면을 모두 세워 주는 절묘한 공동 배분안을 제안해 든든한 후원자를 얻는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "노련한 중재 솜씨에 길드장과 고위 행정관 모두가 감탄하며 그대를 핵심 인맥으로 끌어들였다! 출세의 문이 활짝 열렸다.",
          stats: { Fel: 7, Inf: 9 }, align: { humane: 5 }
        },
        fail: {
          text: "어느 쪽도 완전히 만족시키지 못해 양쪽의 냉대를 받으며 연회장을 빠져나와야 했다.",
          stats: { Inf: -4, Fel: 2 }, align: { humane: 3 }
        }
      },
      {
        label: "[지성 판정] 청탁 서신에 숨은 허위 수치를 간파해 상대 파벌의 횡령 약점을 조용히 손에 쥔다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치명적인 장부 조작 증거를 쥐고 협상 테이블을 주도했다! 그대의 이름 석 자가 상층 사교계에 무게 있게 오르내린다.",
          stats: { Int: 6, Inf: 8 }, align: { ruthless: 8 }
        },
        fail: {
          text: "함정 서신에 걸려 정적이 보낸 청부업자의 습격을 받고 겨우 빠져나왔다.",
          wounds: -12,
          stats: { Inf: -4 }, align: { ruthless: 5 }
        }
      },
      {
        label: "어느 파벌에도 깊이 얽히지 않고 예의 바른 미소와 중립으로 안전하게 인맥만 다진다",
        effect: {
          text: "권력 다툼의 피바람을 피하면서도 여러 유력 인사들과 무난한 안면을 트는 데 성공했다.",
          stats: { Fel: 4, Inf: 4 }
        }
      }
    ],
    source: "Imperium Maledictum Core Rulebook / Dark Heresy: The Inquisitor's Handbook"
  },
  {
    id: "ev_focus_forbidden",
    title: "금단의 서가 — 자정의 밀매상과 봉인된 워프 두루마리",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 16,
      anyFocus: ["forbidden"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "knight_high_king", "nav_novator",
        "inquisitor", "lord_inquisitor", "fabricator_general"
      ]
    },
    reqLabel: "삶의 초점: 금단의 지식 탐구",
    weight: 30,
    text: "제국이 금기시한 지식을 파고들던 소문이 어둠 속까지 흘러 들어갔다. 자정이 넘은 뒷골목에서 얼굴을 가린 금서 밀매상이 납 상자를 열어 보이며, 고대 워프 항법과 외계 비술이 적힌 두루마리를 건네려 한다.",
    choices: [
      {
        label: "[지성 판정] 밀매상이 내민 금지된 두루마리를 해독해 필멸자의 상식을 뛰어넘는 통찰을 흡수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "불타는 듯한 문자가 뇌리에 각인되며 워프와 현실의 이면에 대한 경이로운 지혜를 얻었다! 단, 영혼에 짙은 그림자가 달라붙었다.",
          stats: { Int: 10, WP: 5 },
          corruption: 14, align: { ruthless: 9 }
        },
        fail: {
          text: "두루마리에 걸린 정신 저주가 폭발해 코피를 쏟으며 쓰러졌고, 끔찍한 환청이 한동안 사라지지 않았다.",
          wounds: -14,
          corruption: 18, align: { ruthless: 6 }
        }
      },
      {
        label: "[의지 판정] 이단심문소의 함정 수사일 가능성을 간파하고 밀매상을 제압해 감찰관에게 넘긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "밀매상을 묶어 심문소 지부에 인계했다! 오히려 철저한 위장 수사로 호평받으며 그간의 의혹을 털어 내고 신임까지 얻었다.",
          stats: { WP: 7, Inf: 8 },
          corruption: -10,
          addTags: ["inquisition_favor"], align: { dogmatic: 8 }
        },
        fail: {
          text: "밀매상이 숨겨 둔 독단검에 찔려 부상을 입은 사이 어둠 속으로 도망치고 말았다.",
          wounds: -18,
          corruption: 6, align: { dogmatic: 5 }
        }
      },
      {
        label: "위험한 거래를 단칼에 거절하고 서둘러 어두운 골목을 빠져나온다",
        effect: {
          text: "지식의 유혹보다 목숨이 중하다. 차가운 밤바람을 맞으며 위험한 호기심을 잠시 억눌렀다.",
          stats: { WP: 4, Ag: 3 },
          corruption: -4
        }
      }
    ],
    source: "Dark Heresy: The Radical's Handbook / Imperium Maledictum"
  },
  {
    id: "ev_s5_focus_survival_2",
    title: "생존과 보양 2막 — 역병 봉쇄 구역의 비밀 약재와 생존자의 윤리",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["survival"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "fabricator_general", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "32세 이상 · 삶의 초점: 생존과 보양",
    weight: 28,
    text: "오랜 세월 몸을 돌보고 비상약을 비축해 온 덕분에, 원인을 알 수 없는 폐열병이 구역을 덮쳤을 때도 그대는 멀쩡히 버텨 냈다. 그런데 그대가 소중히 아껴 둔 항생제와 정화 필터가 남아 있다는 소문이 새어 나가며, 병든 이웃과 무장한 봉쇄 경비대가 동시에 문을 두드린다.",
    choices: [
      {
        label: "[지성 판정] 비축 약재의 성분을 정밀 희석하고 대체 약초를 배합해 여러 사람을 살릴 응급 처방약을 제조한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "약효를 유지하면서 분량을 세 배로 늘려 구역의 치사율을 급감시켰다! 생존의 지혜가 공동체 전체를 구했다.",
          stats: { Int: 7, T: 5, Inf: 6 }, align: { humane: 9 }
        },
        fail: {
          text: "배합 도중 병균에 노출되어 고열을 앓았으나, 끝내 회복하며 강한 면역력을 얻었다.",
          wounds: -14,
          stats: { T: 5 }, align: { humane: 5 }
        }
      },
      {
        label: "[강인 판정] 경비대의 압수 시도를 단호히 막아 서고 필수 생존 물자만큼은 끝까지 사수한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "건강한 체력과 단호한 기세에 경비대가 물러났다. 그대의 철저한 준비성이 다시 한번 목숨을 지켰다.",
          stats: { T: 7, WP: 5 },
          wounds: 8, align: { ruthless: 8 }
        },
        fail: {
          text: "실랑이 끝에 상처를 입고 물자 절반을 빼앗겼으나 남은 약재로 가까스로 버텼다.",
          wounds: -14,
          stats: { T: 3 }, align: { ruthless: 5 }
        }
      },
      {
        label: "자신이 쓸 최소분만 남기고 나머지 약재를 의무대에 조용히 기증한 뒤 문을 걸어 잠근다",
        effect: {
          text: "살아남는 것과 인간다움을 지키는 것 사이에서 차분히 균형을 잡았다.",
          stats: { T: 4, WP: 5, Fel: 3 },
          faith: 4, align: { humane: 5 }
        }
      }
    ],
    source: "Lexicanum: Medicae / Imperium Maledictum Core Rulebook"
  },
  {
    id: "ev_s5_focus_combat_2",
    title: "무예와 전투 2막 — 고참 무인의 낡은 관절과 젊은 도전자의 결투",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["combat"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "fabricator_general", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "32세 이상 · 삶의 초점: 무예와 전투 훈련",
    weight: 28,
    text: "평생을 검술과 사격 훈련에 바쳐 온 그대의 명성을 듣고, 혈기 왕성하고 재능 넘치는 젊은 정예 전사가 연병장 한복판에서 공개 대련을 청해 왔다. 예전 같지 않은 관절의 묵직함이 신경 쓰이지만, 물러서면 그동안 쌓아 온 무인의 권위가 단숨에 흔들린다.",
    choices: [
      {
        label: "[백병 판정] 힘겨루기 대신 수십 년 실전에서 익힌 간결한 궤적과 수읽기로 젊은 도전자를 단 세 합에 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "화려한 속도전은 노련한 한 수 앞에 무릎을 꿇었다! 도전자가 고개를 숙여 제자가 되기를 청했고 연병장에 우레 같은 박수가 쏟아졌다.",
          stats: { WS: 8, Inf: 6, WP: 4 }
        },
        fail: {
          text: "젊은 패기의 맹공에 팔을 크게 삐끗했으나, 마지막 반격으로 무승부를 끌어내며 체면을 지켰다.",
          wounds: -14,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "[사격 판정] 백병전 대신 실전 이동 표적 사격 승부를 제안해 경험의 격차를 압도적으로 증명한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "바람과 반동을 완벽히 읽어 낸 연속 명중에 젊은 도전자가 탄복하며 물러났다!",
          stats: { BS: 8, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "아슬아슬한 점수 차로 패배를 맛보며 고참 무인의 체면을 구겼으나, 그 쓰라린 자극이 새로운 훈련 의욕을 불태웠다.",
          stats: { Inf: -2, BS: 2 }
        }
      },
      {
        label: "승패보다 약점을 짚어 주는 지도 대련으로 받아들여 후배 전사의 기량을 끌어올려 준다",
        effect: {
          text: "자존심을 내려놓고 스승의 품격을 보이자 도리어 연병장 전체의 깊은 존경을 얻었다.",
          stats: { WS: 4, Fel: 5, Inf: 4 }
        }
      }
    ],
    source: "Only War Core Rulebook / Imperium Maledictum"
  },
  {
    id: "ev_s5_focus_faith_2",
    title: "황제 신앙 2막 — 기적을 사칭하는 떠돌이 설교자와 군중의 광신",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["faith"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "inquisitor", "lord_inquisitor"
      ]
    },
    reqLabel: "32세 이상 · 삶의 초점: 황제 신앙과 기도",
    weight: 28,
    text: "황제 신앙을 깊이 닦아 온 그대의 눈에 광장의 소동이 예사롭지 않게 비쳤다. 붕대를 감은 떠돌이 설교자가 '성혈의 기적'을 행한다며 수천 순례자의 재물과 헌신을 끌어모으고 있는데, 기도문 사이사이에 정통 국교 교리와 미묘하게 어긋나는 불온한 구절이 섞여 있다.",
    choices: [
      {
        label: "[의지 판정] 광장 단상에 올라 정통 황제 교리로 설교자의 기만과 불순한 구절을 만인 앞에서 논파한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "설교자의 품에서 숨겨 둔 환각 향료와 이단 부적이 쏟아져 나왔다! 광신에 빠질 뻔한 순례자들이 그대의 순수한 신앙 앞에 무릎을 꿇었다.",
          stats: { WP: 8, Fel: 5, Inf: 6 },
          faith: 10,
          corruption: -8, align: { dogmatic: 8 }
        },
        fail: {
          text: "흥분한 광신도들에게 돌팔매를 맞아 다쳤으나, 소동을 보고 출동한 국교 경비대가 사기꾼을 체포했다.",
          wounds: -15,
          faith: 5,
          stats: { WP: 4 }, align: { dogmatic: 5 }
        }
      },
      {
        label: "[지성 판정] 섣불리 군중을 자극하지 않고 설교자의 배후 조직과 자금 흐름을 추적해 심문소에 넘긴다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단순 사기꾼이 아니라 지하 이단 교단의 모집책이었음이 밝혀졌다! 이단심문소가 그대의 신중한 공적을 치하했다.",
          stats: { Int: 7, Inf: 6 },
          faith: 6,
          addTags: ["inquisition_favor"], align: { dogmatic: 6 }
        },
        fail: {
          text: "추적 도중 설교자가 눈치를 채고 도주해 뒷수습 과정에서 질책을 들었으나, 광장의 거짓 집회만은 해산되었다.",
          stats: { Inf: -2, Int: 2 }, align: { dogmatic: 3 }
        }
      },
      {
        label: "소란스러운 광장을 피해 고요한 예배당으로 돌아와 자신의 신앙이 교만에 빠지지 않도록 성찰한다",
        effect: {
          text: "남의 거짓을 꾸짖기 전에 스스로의 영혼을 먼저 닦는 것이 참된 경건이다.",
          stats: { WP: 5 },
          faith: 8,
          corruption: -5, align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Cult / Dark Heresy: Blood of Martyrs"
  },
  {
    id: "ev_s5_focus_lore_2",
    title: "학문과 기계 교리 2막 — 봉인된 암흑기 데이터 코어와 이단의 경계",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["lore"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "assassin",
        "high_lord_terra", "fabricator_general", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "32세 이상 · 삶의 초점: 학문과 기계 교리",
    weight: 28,
    text: "오랜 학문 탐구 끝에 고서고 지하에서 기술의 암흑기 시절에 제작된 암호화 데이터 코어 조각을 발견했다. 해독에 성공하면 행성의 동력 효율을 획기적으로 끌어올릴 수 있지만, 내부에 금지된 '가증스러운 지성'의 잔재가 남아 있을 위험도 도사리고 있다.",
    choices: [
      {
        label: "[지성 판정] 격리된 코지테이터 회로에서 위험한 자율 논리 구역만 완벽히 절단하고 순수 공학 설계도만 추출한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "기계교의 금기를 건드리지 않고도 경이로운 암흑기 열교환 설계도를 복원했다! 학계와 포지 사원 전체가 그대의 이름을 칭송했다.",
          stats: { Int: 9, Inf: 7, WP: 4 }, align: { ruthless: 5 }
        },
        fail: {
          text: "해독 도중 불경한 기계 음성이 흘러나와 긴급 소각해야 했고, 기술 이단 의심 기록이 남았다.",
          stats: { Int: 4, Inf: -3 },
          corruption: 5,
          addTags: ["tech_heresy"], align: { ruthless: 7 }
        }
      },
      {
        label: "[의지 판정] 지식의 유혹을 누르고 코어를 그대로 봉인해 화성 기계교 상위 사제단에 정식 인계한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "금단의 유혹을 이겨 낸 정통 학자의 절제에 기계교가 깊은 경의를 표하며 귀한 학술 열람권을 내렸다.",
          stats: { WP: 7, Int: 4, Inf: 6 },
          faith: 5, align: { dogmatic: 8 }
        },
        fail: {
          text: "인계 과정에서 공적을 상급자에게 가로채이며 학계 입지가 깎였으나, 적어도 기술 이단 혐의만은 깨끗이 피했다.",
          stats: { Inf: -3, WP: 2 }, align: { dogmatic: 5 }
        }
      },
      {
        label: "위험한 코어의 봉인을 뜯지 않고 겉면의 고대 문자와 연대만 기록한 뒤 금고에 되돌려 놓는다",
        effect: {
          text: "알아야 할 지식과 잠들어 있어야 할 지식을 구분하는 것도 학자의 미덕이다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Dark Age of Technology / Abominable Intelligence"
  },
  {
    id: "ev_s5_focus_politics_2",
    title: "인맥과 출세 2막 — 총독 대행 암살 음모의 밀서와 권력의 대가",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["politics"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "fabricator_general", "knight_high_king", "nav_novator"
      ],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"]
    },
    reqLabel: "32세 이상 · 삶의 초점: 인맥과 출세 도모",
    weight: 28,
    text: "수년간 정교하게 구축해 온 인맥망이 마침내 행성 권력의 심장부까지 닿았다. 그러나 어둠 속으로 올라갈수록 칼날도 가까워진다. 유력 길드 연합의 대표가 그대에게 비밀 회동을 청하더니, 무능한 총독 대행을 '병환으로 인한 급사'로 처리하는 계획에 동참하면 핵심 요직을 넘기겠다고 속삭였다.",
    choices: [
      {
        label: "[교섭 판정] 암살 대신 총독 대행의 비리를 합법적으로 폭로해 탄핵시키는 정치적 무혈 쿠데타로 판을 뒤집는다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "피 한 방울 묻히지 않고 양측 파벌을 모두 그대의 손바닥 위에 올려놓았다! 행성 의회가 그대를 새 실권자로 추대했다.",
          stats: { Fel: 8, Inf: 9, Int: 4 }, align: { ruthless: 6 }
        },
        fail: {
          text: "양쪽 파벌 모두에게 배신자로 찍혀 자객의 습격을 가까스로 피하며 입지가 크게 흔들렸다.",
          wounds: -16,
          stats: { Inf: -5, WP: 4 }, align: { ruthless: 4 }
        }
      },
      {
        label: "[지성 판정] 밀서의 사본을 챙겨 총독 대행과 아르비테스 사령관에게 역고발해 반역 파벌을 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "반역 음모가 하루아침에 분쇄되었다! 총독 대행이 목숨을 구해 준 은인으로 그대에게 막대한 권한과 포상을 내렸다.",
          stats: { Int: 7, Inf: 8, WP: 4 }, align: { dogmatic: 8 }
        },
        fail: {
          text: "증거가 불충분하다는 역공을 받아 한동안 정계 변방으로 밀려나야 했다.",
          stats: { Inf: -4, Int: 3 }, align: { dogmatic: 5 }
        }
      },
      {
        label: "그 자리에서 밀서를 촛불에 태워 버리며 '나는 듣지 못한 일'이라고 선을 긋고 물러난다",
        effect: {
          text: "독이 든 왕관을 거절한 냉철함 덕분에, 훗날 피바람이 불었을 때도 그대만은 온전히 살아남았다.",
          stats: { WP: 6, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Planetary Governor / Dark Heresy: The Inquisitor's Handbook"
  },
  {
    id: "ev_s5_focus_forbidden_2",
    title: "금단의 지식 2막 — 이단심문소 내사관의 불시 수색과 숨겨 둔 금서",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 28,
      anyFocus: ["forbidden"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "inquisitor", "lord_inquisitor", "fabricator_general", "knight_high_king", "nav_novator"
      ]
    },
    reqLabel: "28세 이상 · 삶의 초점: 금단의 지식 탐구",
    weight: 30,
    text: "금단의 지식을 탐구한 대가가 마침내 문 앞까지 찾아왔다. 이단심문소 내사관과 무장 수행원들이 그대의 서재를 불시에 에워싸고 출입문을 두드린다. 책상 아래 비밀 서랍에는 워프의 진실과 고대 이단 학설을 필사해 둔 위험한 연구 노트가 아직 식지 않은 잉크를 머금은 채 놓여 있다.",
    choices: [
      {
        label: "[교섭 판정] 연구 노트를 '이단 격퇴용 반박 교본 초안'으로 태연하게 제시하며 내사관을 논리로 설득한다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "얼음장 같은 담력과 완벽한 교리 인용에 내사관이 감탄하며 물러났다! 심지어 적을 알기 위한 귀중한 연구라며 은밀한 협조까지 요청했다.",
          stats: { Fel: 7, Int: 7, Inf: 6 },
          corruption: 4, align: { ruthless: 8 }
        },
        fail: {
          text: "변명이 간파되어 혹독한 심문과 수배 낙인을 피하기 위해 밤중에 거처를 버리고 도주해야 했다.",
          wounds: -18,
          corruption: 6,
          addTags: ["wanted_by_inquisition"], align: { ruthless: 6 }
        }
      },
      {
        label: "[민첩 판정] 문이 열리기 전 10초 만에 금서를 강산성 용액에 녹여 흔적을 지우고 평범한 기도서로 바꿔치기한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "내사관들이 서재를 뒤집었으나 단 한 조각의 불경한 증거도 찾지 못했다! 심장이 터질 듯한 밤을 넘겼다.",
          stats: { Ag: 7, WP: 5, Int: 3 }, align: { ruthless: 5 }
        },
        fail: {
          text: "용액이 손등에 튀어 화상을 입고 수상한 재가 발각되어 막대한 벌금과 감시 처분을 받았다.",
          wounds: -14,
          stats: { Inf: -5 }, align: { ruthless: 4 }
        }
      },
      {
        label: "스스로 모든 금서를 화로에 던져 태우고 무릎을 꿇어 고해성사와 정화 고행을 자청한다",
        effect: {
          text: "심연을 들여다보던 발걸음을 간신히 돌렸다. 혹독한 태형 끝에 목숨과 영혼을 건졌다.",
          wounds: -12,
          faith: 10,
          corruption: -14,
          stats: { WP: 5 }, align: { dogmatic: 9 }
        }
      }
    ],
    source: "Lexicanum: Forbidden Lore / Dark Heresy: The Radical's Handbook"
  }
];
