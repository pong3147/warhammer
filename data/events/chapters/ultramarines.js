// 분기 사건 — 울트라마린 전용 (1:1 단독 승격)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_chap_ultramarines",
    title: "울트라마린 — 《코덱스 아스타르테스》 교리 이탈 논쟁",
    category: "챕터 고유",
    once: true,
    req: {
      minYear: 745,
      allTags: ["astartes"],
      anyChapters: ["ultramarines"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "745.M41 이후 · 챕터: 울트라마린",
    weight: 34,
    text: "타이라니드 생체 괴수 무리가 아군 방어선의 측면을 파고들었다. 1중대 선배는 《코덱스 아스타르테스》 정석대로 사각 방진을 유지하라 명하지만, 그대의 전술안은 교리에 없는 우회 역포위가 훨씬 적은 피해를 낳는다고 가리킨다.",
    choices: [
      {
        label: "[지성 판정] 코덱스의 정신을 유연하게 재해석해 변칙 역포위 기동을 감행한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "'용기와 명예로!' 기습 우회가 적 시냅스 괴수를 단칼에 절단했다! 챕터 지휘부도 프라이마크 로부테 길리먼이 생전에 설파한 진정한 실용주의라며 그대의 전술안을 공식 주석에 등재했다.",
          stats: { Int: 6, Inf: 6, BS: 3 },
          addTags: ["tyrannic_veteran"]
        },
        fail: {
          text: "변칙 기동이 엇갈려 아군 측면이 뚫렸다. 전투는 승리했으나 코덱스 위반 심문회에서 엄중한 견책을 받았다.",
          wounds: -18,
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "[사격 판정] 《코덱스 아스타르테스》 정석 방진으로 교본 같은 화력 집중을 지휘한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "단 한 치의 흔들림도 없는 3열 교대 볼터 사격이 외계인 무리를 갈아 버렸다. 전형적인 울트라마린의 완벽한 승전보였다.",
          stats: { BS: 5, WP: 4, Inf: 4 }
        },
        fail: {
          text: "교리대로 버티다 측면이 눌려 상당한 피해를 입은 뒤에야 증원군과 합류했다.",
          wounds: -16,
          stats: { T: 3 }
        }
      }
    ],
    source: "Lexicanum: Ultramarines / Codex Supplement: Ultramarines"
  },
  {
    id: "ev_chap2_ultramarines",
    title: "울트라마린 — 울트라마 영지 행정 순찰과 전후 재건",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["ultramarines"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 울트라마린",
    weight: 28,
    text: "전투가 끝난 울트라마 변경 행성의 재건 현장. 여타 챕터라면 즉시 철수했겠지만, 울트라마린은 프라이마크 로부테 길리먼의 오래된 가르침대로 행성의 식량 배급과 울트라마 보조군 재편까지 검수한다. 지역 귀족 의회가 재건 예산을 빼돌린 정황이 포착되었다!",
    choices: [
      {
        label: "[지성 판정] 귀족 의회 장부를 직접 감사해 횡령범을 파면하고 시민 재건 기금을 복구한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "전사일 뿐 아니라 통치자이기도 한 울트라마린의 품격! 행성 전체가 3년 앞당겨 복구되며 울트라마의 질서가 빛났다.",
          stats: { Int: 6, Fel: 6, Inf: 7 }
        },
        fail: {
          text: "부패 귀족들의 복잡한 서류 술수에 시간을 허비해 재건 일정이 지연되고 말았다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "행정 감사는 울트라마 영지 행정관에게 맡기고 행성 방위군 정예 사격 훈련을 직접 지도한다",
        effect: {
          text: "울트라마 보조군의 실전 전투력이 눈에 띄게 상승했다. '용기와 명예로!'",
          stats: { BS: 5, Fel: 4, Inf: 4 }
        }
      }
    ],
    source: "Codex Supplement: Ultramarines / Lexicanum: Ultramar"
  },
  {
    id: "ev_s4_tag_ultramar_scholar",
    title: "울트라마 장학생 — 영지 재건 의회와 병참 개혁안",
    category: "명예 태그 연작",
    once: true,
    req: {
      minAge: 18,
      allTags: ["ultramar_scholar"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "sector_lord", "planetary_governor",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general",
        "navy_admiral", "arbites_marshal", "departmento_head", "rt_lord_captain"
      ]
    },
    reqLabel: "18세 이상 · 이력: 울트라마 장학생",
    weight: 36,
    text: "울트라마의 실용 행정과 법학을 익힌 그대의 명성이 알려져, 전후 복구와 방위선 재편을 논의하는 울트라마 영지 변경 행성의 재건 의회에 자문 위원으로 초빙되었다. 회의장에 들어서자 토착 귀족 원로들은 호화 기념비 건립을, 군수 위원회는 무리한 징집을 외치며 정면으로 충돌해 정작 무너진 수로와 울트라마 보조군 보급망 복구가 멈춰 서 있었다.",
    choices: [
      {
        label: "[지성 판정] 로부테 길리먼의 병참론을 토대로 수로 복구와 식량 비축, 보조군 훈련을 통합한 5개년 재건안을 발표한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "치밀한 수치와 논리 앞에 양측 파벌의 궤변이 한 줄도 통하지 않았다! 그대의 개혁안이 만장일치로 채택되어 행성 전체의 방위와 민생이 함께 살아났다.",
          stats: { Int: 8, Inf: 8, WP: 4 }
        },
        fail: {
          text: "보수파 원로들의 조직적인 절차 방해에 발목이 잡혀 핵심 예산안 절반이 삭감되고 의회 내 입지가 좁아졌다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "[교섭 판정] 귀족 원로들의 명예를 세워 주는 대신 공공 토목 기금을 출자하도록 중재해 양측의 대타협을 이끌어 낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행성 행정의 마비 없이 막대한 복구 자금과 보조군 장비를 단숨에 확보했다! 울트라마 영지 행정관들이 그대의 실리적 경륜을 극찬했다.",
          stats: { Fel: 8, Inf: 7, Int: 4 }
        },
        fail: {
          text: "양쪽 파벌 사이를 조율하다 정치적 앙금을 사며 자문 위원직에서 밀려나고 말았다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "정치적 공방에서 한 발 물러나 재건 백서와 보급 진단서만 울트라마 영지 행정관에게 정식 제출한다",
        effect: {
          text: "개인적 공명심 대신 정확한 기록과 절차의 원칙을 지켰다. 실무 관료들이 그대의 냉철한 분석을 높이 샀다.",
          stats: { Int: 5, WP: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Ultramar / Codex Supplement: Ultramarines"
  },
  {
    id: "ev_s16_ch1_um_1",
    title: "울트라마린 — 타이라니드 전쟁 베테랑 사열과 대외계 교범 심의",
    category: "챕터 고유",
    once: true,
    req: {
      minYear: 746,
      allTags: ["astartes"],
      anyChapters: ["ultramarines"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "746.M41 이후 · 챕터: 울트라마린",
    weight: 32,
    text: "마크라그 극지 요새의 참화 이후 창설된 타이라니드 전쟁 베테랑 분대의 사열식이 헤라의 요새 연병장에서 거행되었다. 생체 갑각 파편을 전리품으로 두른 고참 전사들과 전통적 코덱스 편제를 중시하는 보수파 지휘관들이 신형 대타이라니드 교범의 정식 채택 여부를 두고 팽팽히 맞서고 있다.",
    choices: [
      {
        label: "[지성 판정] 실전 생체 해부 기록과 시냅스 개체 저격 교리를 증언해 신형 대타이라니드 교범 채택을 관철한다",
        req: { anyTags: ["tyrannic_veteran", "deathwatch_vet"] },
        check: { stat: "Int", diff: 0 },
        success: {
          text: "실전에서 축적된 대외계 전술안이 전 중대의 표준 대응 교범으로 등재되었다. 베테랑 형제들이 그대의 냉철한 실증주의에 경의를 표했다.",
          stats: { Int: 7, BS: 5, Inf: 7 },
          addTags: ["tyrannic_veteran"]
        },
        fail: {
          text: "타이라니드 생체 변이 속도에 대한 반론을 완벽히 꺾지 못해 교범 초안이 보류되었고, 심의장 내 입지가 다소 흔들렸다.",
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "[사격 판정] 베테랑 사격장에 직접 나서 생체 갑각 표적의 관통 탄도와 시냅스 차단 화력을 실증한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정밀한 2점사 볼터 사격으로 모의 카니펙스 갑각의 취약 접합부를 연속 관통했다! 실증된 사격 데이터가 교범 부록에 수록되며 타이라니드 전쟁 베테랑의 인정을 받았다.",
          stats: { BS: 7, Int: 4, Inf: 5 },
          addTags: ["tyrannic_veteran"]
        },
        fail: {
          text: "고압 시험탄의 반동과 모의 생체산 분사 장치 오작동으로 갑주와 팔에 깊은 부상을 입었다.",
          wounds: -16,
          stats: { BS: 2, Inf: -2 }
        }
      },
      {
        label: "특수 편제의 영구화 대신 기존 전술 분대가 필요 시 대외계 무장을 유연하게 운용하는 절충안을 제출한다",
        effect: {
          text: "코덱스의 균형과 실전의 요구를 모두 아우른 원만한 중재안으로 채택되었다. 챕터 지휘부가 그대의 신중한 판단력을 높이 평가했다.",
          stats: { Int: 5, WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Codex Supplement: Ultramarines / Lexicanum: Tyrannic War Veterans"
  },
  {
    id: "ev_s16_ch1_um_2",
    title: "울트라마린 — 울트라마 영지 외곽 방위선 순찰과 합동 방어전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["ultramarines"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 울트라마린",
    weight: 30,
    text: "울트라마 영지 외곽 변경 성계의 방위선을 순찰하던 중, 해적 선단과 외계 약탈대가 궤도 감시 초소를 돌파해 농업 지대와 방어 보루로 동시에 강하했다. 울트라마 보조군과 행성 방위군 연대가 포위될 위기에 놓이자, 그대가 아스타르테스 타격대와 필멸자 방어군의 합동 전선을 조율할 책임을 맡게 되었다.",
    choices: [
      {
        label: "[권위 판정] 울트라마 보조군과 아스타르테스 기동대를 단일 지휘망으로 통합해 적 강하 거점을 역포위한다",
        req: { anyTags: ["astartes_sergeant", "astartes_captain", "chapter_master"] },
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "초인과 필멸자가 톱니바퀴처럼 맞물린 완벽한 합동 작전이었다! 적 약탈대는 방어 보루 문턱에서 전멸했고, 외곽 성계 사령관들이 울트라마린의 지휘력에 깊이 감복했다.",
          stats: { Inf: 8, Fel: 6, Int: 5 }
        },
        fail: {
          text: "통신 교란으로 보조군 포병의 지원 사격 시점이 어긋나 전선이 크게 흔들렸고, 몸소 돌파구를 막다 부상을 입었다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[사격 판정] 아스타르테스 화력 지원반을 최전방 보루에 배치해 행성 방위군의 측면 화망을 철벽같이 보강한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "묵직한 헤비 볼터와 라스건 일제 사격이 겹겹이 교차하며 강습정을 모두 격추했다. 울트라마 보조군 장병들이 푸른 갑주의 형제들에게 뜨거운 환호를 보냈다.",
          stats: { BS: 6, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "적 강습정의 집중 플라즈마 포화에 보루 외벽이 무너지며 파편에 깊게 베였다.",
          wounds: -18,
          stats: { T: 3 }
        }
      },
      {
        label: "[백병 판정] 최선두로 돌입해 적 약탈대 지휘관을 직접 참수하고 행성 방위군이 재정비할 시간을 번다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'용기와 명예로!' 적 지휘관이 쓰러지자 약탈대의 공세가 단숨에 와해되었고, 행성 방위군이 승기를 잡아 잔적을 소탕했다.",
          stats: { WS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "적 정예 호위대의 포위 반격에 갑주가 크게 손상되고 적지 않은 피를 흘린 뒤에야 전열을 수습했다.",
          wounds: -20,
          stats: { WS: 3 }
        }
      },
      {
        label: "보급선과 민간 대피 요새의 외곽 경계를 우선 확보해 방어선의 장기 지구력을 유지한다",
        effect: {
          text: "성급한 돌격 대신 탄약고와 보급 거점을 지켜 내어 합동 방어군이 안정적으로 적을 밀어냈다.",
          stats: { Int: 4, T: 4, Fel: 4 }
        }
      }
    ],
    source: "Codex Supplement: Ultramarines / Lexicanum: Ultramar Auxilia"
  },
  {
    id: "ev_s16_ch1_um_3",
    title: "울트라마린 — 개정 《코덱스 아스타르테스》와 인도미투스 전술 토론",
    category: "챕터 고유",
    once: true,
    req: {
      minYear: 1001,
      greatRift: true,
      allTags: ["astartes"],
      anyChapters: ["ultramarines"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "001.M42 이후 · 대균열 이후 · 챕터: 울트라마린",
    weight: 34,
    text: "부활한 프라이마크 로부테 길리먼이 1만 년의 교조주의를 깨고 《코덱스 아스타르테스》의 대규모 개정을 공포했다. 신규 선봉 침투 편제와 프라이머리스 특화 분대의 통합 운용을 두고, 전통적 전술 분대의 유연성을 고수하려는 고참 형제들과 새 교리의 즉각 도입을 주장하는 전사들 사이에 치열한 전략 토론이 열렸다.",
    choices: [
      {
        label: "[지성 판정] 프라이머리스 특화 화력 분대와 기존 전술 교리의 실전 연계 모의안을 제시해 개혁파와 전통파를 하나로 묶는다",
        req: { anyTags: ["primaris"] },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "프라이마크의 의도를 완벽히 꿰뚫은 실전 통합안이 마크라그 전략 회의의 모범 사례로 채택되었다! 신구 형제들 사이의 어색한 간극이 단숨에 허물어졌다.",
          stats: { Int: 8, Fel: 6, Inf: 7 }
        },
        fail: {
          text: "모의 기동 시연 중 분대 간 화력 중첩 오차가 드러나 보수파 고참들의 날 선 비판을 감수해야 했다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "[지성 판정] 개정 코덱스의 핵심인 가변적 선봉 타격 교리를 분석해 대균열 시대의 기동전 해법을 도출한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "교리를 맹목적 경전이 아닌 살아 있는 전략 지침으로 해석한 그대의 논문이 챕터 기록보관소에 등재되었다.",
          stats: { Int: 7, WP: 4, Inf: 6 }
        },
        fail: {
          text: "대균열 이후 급변한 전장 변수를 과소평가한 탓에 전략 심의에서 논리적 허점을 지적받고 물러났다.",
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "[교섭 판정] 신형 장비를 받은 형제들과 백전노장 구세대 형제들이 합동 모의전을 치르도록 중재해 신뢰를 쌓는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "말보다 전장에서의 호흡이 먼저 통한다는 울트라마린의 미덕이 빛을 발했다! 합동 모의전 끝에 신구 전사들이 서로의 무기를 인정하며 결속을 다졌다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "모의전 도중 과열된 경쟁심이 거친 충돌로 번지며 훈육 징계와 타박상을 떠안았다.",
          wounds: -12,
          stats: { Fel: -2, Inf: -2 }
        }
      },
      {
        label: "논쟁 대신 프라이마크가 새로 내린 병참과 군율 개정 조항을 묵묵히 숙지해 소속 분대 훈련에 반영한다",
        effect: {
          text: "소모적 언쟁을 피하고 개정 교리의 실무 지침을 빈틈없이 체화했다.",
          stats: { Int: 4, BS: 4, WP: 4 }
        }
      }
    ],
    source: "Codex Supplement: Ultramarines / Dark Imperium / Lexicanum: Codex Astartes"
  }
);
