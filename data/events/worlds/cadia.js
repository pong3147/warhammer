// 분기 사건 — 카디아 전용 (1:1 단독 승격 · 전 항목 999.M41 이전)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_world_cadia_kasrkin",
    title: "카디아 — 카스르킨 정예 선발 사열",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      maxAge: 26,
      maxYear: 999,
      anyWorlds: ["cadia"],
      anyHomeWorlds: ["cadia"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카디아 · 14~26세 · 999.M41 이전",
    weight: 26,
    text: "카디아 유년 군사단 화이트실드 가운데 가장 냉철하고 정밀한 사격수를 뽑아 정예 척탄병 카스르킨으로 훈련시키는 실탄 사열이 열렸다. 표적 대신 실제로 움직이는 포획 돌연변이들이 투입된다.",
    choices: [
      {
        label: "[사격 판정] 핫샷 라스건을 받아 들고 한 발의 낭비 없이 표적을 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "보랏빛 눈동자가 흔들림 없이 표적을 꿰뚫었다! 카디아 사령부가 그대에게 정예 표창을 수여했다.",
          stats: { BS: 7, WP: 5, T: 4, Inf: 6 },
          addTags: ["elite_troop"]
        },
        fail: {
          text: "과열된 전지팩이 손에서 터져 화상을 입었지만, 눈물을 보이지 않고 사격을 마쳤다.",
          wounds: -18,
          stats: { BS: 3, WP: 3 }
        }
      },
      {
        label: "[백병 판정] 총검을 착검하고 근접 제압 시범에 지원한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "빈틈없는 총검술로 교관의 찬사를 받았다. '카디아의 아이는 요람에서부터 병사다.'",
          stats: { WS: 6, T: 4, Inf: 4 }
        },
        fail: {
          text: "어깨를 베여 의무실에 실려 갔다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Kasrkin / Codex: Astra Militarum"
  },
  {
    id: "ev_cadia_pylon_hum",
    title: "카디아 — 고대 블랙스톤 파일런의 기이한 정적",
    category: "행성 고유",
    req: {
      minAge: 14,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카디아 · 999.M41 이전",
    weight: 26,
    text: "카디아 평원 한복판에 솟은 정체불명의 고대 블랙스톤 파일런 근처를 순찰하던 중, 갑자기 세상의 모든 소리가 기묘하게 먹먹해지고 가슴속에서 알 수 없는 공허감이 차오른다. 공포의 눈을 막아 주는 수수께끼의 유물이다.",
    choices: [
      {
        label: "[사이커 전용 · 의지 판정] 워프 차단 장막의 극심한 두통을 의지로 견뎌 낸다",
        req: { allTags: ["psyker"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "사이킥 능력이 잠시 봉인되는 고통을 이겨 내며 오히려 오염이 씻겨 나가는 기이한 정화를 겪었다!",
          stats: { WP: 6 },
          corruption: -12
        },
        fail: {
          text: "극심한 편두통과 구토에 시달리며 의무실로 후송되었다.",
          wounds: -18
        }
      },
      {
        label: "[지성 판정] 석주 표면의 기하학적 외계 문양을 유심히 관찰해 기록한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "이 석주들이 무너지면 은하계 전체가 워프에 삼켜지리라는 불길한 직감을 얻었다.",
          stats: { Int: 5, WP: 3 }
        },
        fail: {
          text: "알 수 없는 공허감과 무기력에 빠져 사흘간 앓아누웠다.",
          wounds: -10
        }
      },
      {
        label: "기분 나쁜 고대 물건이다. 발걸음을 재촉해 순찰을 마친다",
        effect: {
          text: "공포의 눈 코앞에서 중요한 것은 고대 석주의 정체가 아니라 눈앞의 임무와 경계 태세뿐이다.",
          stats: { WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Cadian Pylons / Fall of Cadia"
  },
  {
    id: "ev_s15_core_cadia_1",
    title: "카디아 — 카스르 요새 합동 방어 실탄 훈련",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeHomeWorlds: ["cadia"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카디아 · 외지 파견자 · 999.M41 이전",
    weight: 32,
    text: "외지 파견 인원으로 카디아의 기하학적 요새 도시 카스르 방어선에 합류하자마자 예고 없는 실탄 합동 훈련 경보가 울렸다! 공포의 눈 빛을 닮은 자색 눈동자의 카디안 쇼크 트루퍼들은 단 한 마디 잡담도 없이 3초 만에 참호 방진을 갖추더니, 외지인인 그대에게도 똑같은 실전 사격 속도를 요구한다.",
    choices: [
      {
        label: "[제국 무관/장교 전용] 외지 연대 교리와 카디아 방어 교범을 즉석에서 접목해 합동 사격선을 지휘한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "commissar", "lord_commissar", "elite_troop"] },
        effect: {
          text: "외지 부대 특유의 유연한 전술을 카디아의 철벽 화망에 매끄럽게 맞물려 놓았다! 카디아 지휘관이 자색 눈을 반짝이며 정예 합동 표창을 건넸다.",
          stats: { BS: 4, Int: 3, Inf: 4, WP: 2 }
        }
      },
      {
        label: "[사격 판정] 카디아 병사들의 일제 사격 박자에 맞춰 이동 표적을 정확히 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "외지인치고는 꽤 쓸 만하다는 짤막한 칭찬과 함께 카디아식 속사 요령과 총기 정비 비결을 전수받았다!",
          stats: { BS: 6, Ag: 3, WP: 4 }
        },
        fail: {
          text: "교체 탄창을 떨어뜨린 순간 교관의 호된 질타와 함께 모의 포격 파편이 방벽을 강타해 팔뚝을 다쳤다.",
          wounds: -16,
          stats: { Inf: -2 }
        }
      },
      {
        label: "[강인 판정] 쉴 틈 없는 참호 기동과 탄약 운반을 이를 악물고 끝까지 따라간다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "카디아의 숨 막히는 군기를 온몸으로 버텨 냈다. 훈련이 끝나자 무뚝뚝한 카디아 분대장이 따뜻한 배급차를 건네며 등을 두드렸다.",
          stats: { T: 6, WP: 4, Fel: 3 }
        },
        fail: {
          text: "무거운 탄약 상자를 메고 진흙 참호를 달리다 발목이 꺾여 의무대로 후송되었다.",
          wounds: -18,
          stats: { T: -1 }
        }
      }
    ],
    source: "Lexicanum: Cadia / Codex: Astra Militarum"
  },
  {
    id: "ev_s15_core_cadia_2",
    title: "카디아 — 보랏빛 하늘 아래 카스르 타이록 보급선 습격",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카디아 · 999.M41 이전",
    weight: 30,
    text: "공포의 눈이 내뿜는 불길한 보랏빛이 밤하늘을 뒤덮은 가운데, 카스르 타이록 외곽 황무지를 달리던 제국 탄약 보급대가 매복해 있던 카오스 약탈대의 기습을 받았다! 선두 장갑차가 화염에 휩싸이고, 붉은 문양을 칠한 광신도들이 짙은 안개를 뚫고 달려든다.",
    choices: [
      {
        label: "[사격 판정] 전복된 수송차 뒤에서 탄약고 폭발을 막으며 약탈대 선두를 집중 사격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "냉철한 조준 사격으로 화염병을 든 약탈대 지휘관을 쓰러뜨리고 보급선을 지켜 냈다! 카스르 타이록 수비대가 용맹을 치하했다.",
          stats: { BS: 6, WP: 4, Inf: 4 },
          faith: 6
        },
        fail: {
          text: "적의 중기관총 소사에 엄폐물이 박살 나며 파편이 어깨를 뚫었다. 가까스로 증원군이 올 때까지 버텼다.",
          wounds: -22,
          stats: { T: -1 }
        }
      },
      {
        label: "[백병 판정] 방어선으로 뛰어드는 이단 약탈자들을 근접전으로 맞받아쳐 밀어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "거친 난전 속에서 약탈자들의 톱날 칼을 받아넘기고 반격해 보급 요원들이 탈출할 시간을 벌어 주었다!",
          stats: { WS: 6, T: 4, WP: 3 },
          faith: 6
        },
        fail: {
          text: "광신도의 녹슨 단검에 옆구리를 깊게 베이고 흉측한 저주 문양에 정신까지 흔들렸다.",
          wounds: -20,
          corruption: 5
        }
      },
      {
        label: "[민첩 판정] 연막탄을 터뜨리고 보조 차량에 올라 탄약 상자를 요새 외벽까지 강행 돌파한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "총탄이 빗발치는 진흙길을 아슬아슬하게 빠져나가 카스르 타이록 성문 안으로 탄약을 무사히 배달했다!",
          stats: { Ag: 6, Int: 3, Inf: 4 }
        },
        fail: {
          text: "빗나간 로켓탄 충격에 차량이 구덩이로 처박혀 머리와 갈비뼈를 크게 다쳤다.",
          wounds: -20,
          stats: { Ag: -2 }
        }
      }
    ],
    source: "Lexicanum: Kasr Tyrok / Cadia"
  },
  {
    id: "ev_s15_core_cadia_3",
    title: "카디아 — 지하 방공호 구역의 카오스 침투자 색출",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카디아 · 999.M41 이전",
    weight: 29,
    text: "요새 도시 지하 방공호 구역의 환기 도관에서 불경한 팔각별 낙서와 함께 숨어 지내던 돌연변이와 카오스 비밀 점조직의 흔적이 발견되었다. 방공호 봉쇄령이 떨어지기 직전, 이들이 수로 정화 시설에 오염 물질을 풀려는 움직임이 포착되었다.",
    choices: [
      {
        label: "[이단심문소/아르비테스/커미사르 전용] 구역 봉쇄 권한을 발동해 은신처를 포위하고 세포 조직을 일망타진한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "신속한 차단 작전과 가차 없는 심문으로 배후 연락망까지 모조리 뿌리 뽑았다! 카디아 방첩 사령부가 극비 표창을 올렸다.",
          stats: { Int: 5, WP: 5, Inf: 6 },
          faith: 8,
          corruption: -6
        }
      },
      {
        label: "[지성 판정] 환기 도관 설계도를 대조해 침투자들의 퇴로를 역추적하고 매복망을 짠다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "지하 정비 통로의 사각지대를 정확히 짚어 내어 경비대와 함께 오염 공작원들을 생포했다. 요새의 식수원이 지켜졌다.",
          stats: { Int: 6, Inf: 5, WP: 3 },
          faith: 6
        },
        fail: {
          text: "어두운 도관에서 침투자가 설치한 불경한 부비트랩을 건드려 폭발에 휘말리고 저주받은 연기를 마셨다.",
          wounds: -18,
          corruption: 7
        }
      },
      {
        label: "[백병 판정] 정화조로 달려드는 돌연변이 광신도들을 좁은 통로에서 직접 막아 선다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "협소한 정비 통로를 등에 지고 광신도 셋을 쓰러뜨려 수로 오염을 막아 냈다! 현장에 도착한 보안대가 경의를 표했다.",
          stats: { WS: 6, T: 4, WP: 4 },
          faith: 8
        },
        fail: {
          text: "돌연변이의 기형적인 발톱에 팔을 깊게 긁혀 감염열과 불길한 악몽에 시달렸다.",
          wounds: -20,
          corruption: 6
        }
      }
    ],
    source: "Lexicanum: Cadia / Cadia Stands"
  },
  {
    id: "ev_s15_core_cadia_4",
    title: "카디아 — 궤도 방어 포대 정비와 암흑 성전의 전조",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 950,
      maxYear: 999,
      anyWorlds: ["cadia"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카디아 · 950~999.M41",
    weight: 32,
    text: "공포의 눈 가장자리에서 정체불명의 카오스 정찰 함대와 워프 폭풍의 빈도가 심상치 않게 치솟고 있다. 카디아 궤도 방어 포대의 거대한 매크로 대포 포탑이 잦은 경계 기동 끝에 냉각 장치 이상을 일으키며 붉은 경보등을 깜빡인다. 머지않아 전 은하를 뒤흔들 거대한 암흑 성전이 닥칠 것이라는 불길한 전조가 포대 전체에 감돈다.",
    choices: [
      {
        label: "[기계교/제국 해군 전용] 정밀 사격 통제 의식과 궤도 표적 보정을 집도해 포대의 화력을 극대화한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos", "navy"] },
        effect: {
          text: "축성된 냉각유를 주입하고 카디아 함대의 궤도 조준망과 동조시키자 매크로 포대가 우렁찬 진동과 함께 완벽히 깨어났다! 방어 사령부가 공적을 등재했다.",
          stats: { Int: 6, BS: 5, Inf: 5 }
        }
      },
      {
        label: "[지성 판정] 과열된 냉각 밸브의 압력을 수동으로 조절하며 궤도 방어 포대를 긴급 복구한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "복잡한 배관 회로를 침착하게 돌려 압력을 낮추고 포신 회전을 정상화했다. 다가올 대전쟁을 버틸 방패 한 조각을 지켜 냈다.",
          stats: { Int: 6, T: 3, Inf: 4 }
        },
        fail: {
          text: "역류한 고온 증기가 방호복 틈새로 스며들어 팔과 목에 심한 화상을 입었다.",
          wounds: -20,
          stats: { T: -1 }
        }
      },
      {
        label: "[사격 판정] 보정 사격 관측소로 올라가 성계 외곽의 적 정찰정을 겨냥해 시험 포격을 유도한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 두 발의 영점 사격만으로 궤도 외곽에 숨어 있던 이단 정찰정의 방어막을 날려 버렸다! 포대 장병들이 환호했다.",
          stats: { BS: 6, WP: 4, Inf: 4 },
          faith: 6
        },
        fail: {
          text: "포탑 반동 완충 장치가 어긋나며 발생한 강한 충격파에 관측창 프레임에 머리를 부딪쳐 쓰러졌다.",
          wounds: -18,
          stats: { BS: -1 }
        }
      }
    ],
    source: "Lexicanum: Cadia / 13th Black Crusade / Battlefleet Gothic"
  }
);
