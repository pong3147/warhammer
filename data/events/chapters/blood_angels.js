// 분기 사건 — 블러드 엔젤 전용 (1:1 단독 승격)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_chap_blood_angels",
    title: "블러드 엔젤 — '붉은 갈증'과 '검은 분노'의 속삭임",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 블러드 엔젤",
    weight: 34,
    text: "치열한 근접전 한복판, 시야가 온통 선홍빛으로 물들며 1만 년 전 프라이마크 생귀니우스가 호루스에게 쓰러지던 최후의 기억이 뇌리를 찢고 밀려든다. 적 병사들이 모두 반역자 호루스로 보이기 시작했다!",
    choices: [
      {
        label: "[의지 판정] 생귀니우스의 고귀한 예술과 기도를 떠올리며 검은 분노를 스스로 억누른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "격렬한 피의 갈증을 철의 의지로 잠재우고 냉철한 전사의 품격을 되찾았다. 채플린이 그대의 영혼에 깊은 경의를 표했다.",
          stats: { WP: 7, Fel: 4, WS: 3 },
          faith: 10
        },
        fail: {
          text: "잠시 이성을 잃고 적진을 도륙했다. 전투 후 며칠간 리클루시움 석실에 격리되어 채플린의 영창 아래 피의 갈증을 진정시켜야 했다.",
          wounds: -15,
          stats: { WS: 6, Fel: -4 }
        }
      },
      {
        label: "[백병 판정] 붉은 갈증의 광기를 적 지휘부에 쏟아부은 뒤 채플린의 인도에 몸을 맡긴다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "황제와 생귀니우스를 위하여! 검은 분노의 문턱에서 폭발한 초인적 맹공이 적군을 전멸시켰다. 전투 후 채플린은 그대가 완전한 광기에 삼켜지지 않고 되돌아온 기적을 확인하며 데스 컴퍼니 분노를 이겨 낸 전사로 기록했다.",
          stats: { WS: 8, Ag: 4, T: 3 },
          wounds: -10,
          addTags: ["death_company"]
        },
        fail: {
          text: "분노에 눈이 멀어 적의 집중 포화에 정면으로 뛰어들었다가 간신히 생귀너리 사제에게 회수되었다.",
          wounds: -28,
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: Black Rage / Codex Supplement: Blood Angels"
  },
  {
    id: "ev_chap2_blood_angels",
    title: "블러드 엔젤 — 아르크스 안젤리쿰의 조각과 고귀한 절제",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 블러드 엔젤",
    weight: 28,
    text: "연속된 혈전 끝에 아스타르테스 형제들의 혈관에 '붉은 갈증'이 거세게 맥동한다. 생귀너리 사제가 그대에게 대리석 끌과 붓을 건네며 말한다. '생귀니우스께서는 아름다움을 빚는 손으로 내면의 야수를 다스리라 가르치셨다. 전투 전까지 네 영혼을 예술로 정화하라.'",
    choices: [
      {
        label: "[의지 판정] 밤을 새워 생귀니우스의 천사상을 조각하며 내면의 갈증을 고요히 승화시킨다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "피 묻은 전사의 손끝에서 눈부신 성상이 태어났다! 붉은 갈증이 잦아들고 고귀한 평정심이 깃들었다.",
          stats: { WP: 6, Fel: 6, Ag: 4 },
          faith: 10,
          corruption: -8
        },
        fail: {
          text: "치밀어 오른 갈증에 대리석을 산산조각 내고 말아 생귀너리 사제의 엄숙한 근신 권고를 받았다.",
          stats: { Fel: -3, WP: -2 }
        }
      },
      {
        label: "조각 대신 형제들과 생귀너리 성배 의식에 참여해 전사한 선배들의 이름을 기린다",
        effect: {
          text: "바알의 유대가 한층 깊어졌으며, 다가올 강습전에서의 결의가 불타올랐다.",
          stats: { WP: 4, WS: 4, Fel: 3 },
          faith: 8
        }
      }
    ],
    source: "Dante / Codex Supplement: Blood Angels"
  },
  {
    id: "ev_arc_death_company_last_charge",
    title: "검은 갑주의 성가 — 채플린의 인도와 호루스의 환영",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "death_company"],
      anyChapters: ["blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "블러드 엔젤 · 데스 컴퍼니 분노 극복",
    weight: 40,
    text: "전투 전야, 다시금 귀울림과 함께 테라 공성전의 불바다가 시야를 뒤덮는다. 채플린이 붉은 교차 문장이 그려진 검은 갑주 앞에서 그대의 어깨에 손을 얹고 묻는다. '형제여, 지금 내 얼굴이 보이는가, 아니면 반역자 호루스가 보이는가?'",
    choices: [
      {
        label: "[의지 판정] 채플린의 영창에 정신을 집중해 검은 분노의 광기를 정확한 적 지휘관 참수로 승화시킨다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "생귀니우스의 눈물마저 강철의 의지로 다스렸다! 검은 분노의 문턱에서 돌아온 희귀한 전사로 챕터 기록서에 등재되었다.",
          stats: { WP: 9, WS: 7, Inf: 8 },
          faith: 10
        },
        fail: {
          text: "환영 속에서 적진 깊숙이 홀로 돌진해 치명상을 입었으나, 채플린의 결사적인 구출로 간신히 목숨을 건졌다.",
          wounds: -26,
          stats: { WS: 5 }
        }
      },
      {
        label: "[백병 판정] 타오르는 분노를 적 최정예 포위망 한복판에 쏟아부어 아군의 돌파구를 열어 젖힌다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "검은 갑주의 사신이 되어 적의 방어선을 단숨에 도륙했다! 전우들이 그대의 광기 어린 희생에 고개를 숙였다.",
          stats: { WS: 10, T: 5, Inf: 7 },
          wounds: -14
        },
        fail: {
          text: "사방에서 쏟아진 집중 사격에 갑주가 뚫렸으나, 피투성이가 되어서도 마지막 적의 숨통을 끊었다.",
          wounds: -28,
          stats: { WS: 4 }
        }
      },
      {
        label: "생귀너리 사제의 진정 의식을 받아들이고 침묵의 기도실에서 핏빛 환상을 잠재운다",
        effect: {
          text: "차가운 석실에 앉아 대리석 천사상을 어루만지며 호흡을 가다듬었다. 오늘도 야수는 사슬 안에 머물렀다.",
          stats: { WP: 5 },
          faith: 6,
          wounds: 10
        }
      }
    ],
    source: "Lexicanum: Death Company / Codex Supplement: Blood Angels"
  },
  {
    id: "ev_s16_ch1_ba_1",
    title: "블러드 엔젤 — 황금빛 생귀너리 가드 선발 시련과 고공 강하",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "배틀 브라더 이상 · 챕터: 블러드 엔젤",
    weight: 32,
    text: "황금빛 데스 마스크를 쓴 생귀너리 가드의 고참 전사들이 험준한 협곡 상공의 강습선에 도열했다. 날개 달린 점프 팩을 메고 폭풍 기류를 가르는 고공 강하와 공중 백병전 시련이 시작된다. 단 한 순간의 추락이나 추태도 생귀니우스의 황금 날개 앞에서는 용납되지 않는다.",
    choices: [
      {
        label: "[민첩 판정] 사나운 하강 기류를 역이용해 천사의 날개처럼 절벽 표적 사이를 활강하며 완벽한 강습 착지를 선보인다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "눈부신 황금 궤적이 협곡을 가로질렀다! 생귀너리 가드 선배들이 그대의 비행 기량에서 프라이마크의 우아한 그림자를 보았다며 깊은 경의를 표했다.",
          stats: { Ag: 8, WS: 5, Inf: 6 }
        },
        fail: {
          text: "돌풍에 추진기가 순간 실속하며 암벽에 강하게 충돌해 갑주가 부서지고 큰 부상을 입었다.",
          wounds: -20,
          stats: { Ag: 3, Inf: -2 }
        }
      },
      {
        label: "[백병 판정] 고공에서 급강하하며 엔카르민 도검 대련 상대를 단숨에 제압해 근접 강습의 정수를 증명한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "하늘에서 쏟아지는 폭풍 같은 일격이 상대의 방어를 꿰뚫었다! 전투 후 고참 전사들이 그대의 검술을 생귀너리 가드 후보 반열에 올렸다.",
          stats: { WS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "착지 직후 균형이 무너지며 맹렬한 반격을 허용해 무거운 타격을 입고 시련장에서 물러났다.",
          wounds: -18,
          stats: { WS: 3 }
        }
      },
      {
        label: "[의지 판정] 피의 격정이 치미는 고공 강습 속에서도 차분한 성가를 읊조리며 전우들의 비행 대열을 완벽히 통솔한다",
        req: { anyTags: ["death_company", "role_chaplain"] },
        check: { stat: "WP", diff: 0 },
        success: {
          text: "광기를 고귀한 절제로 승화시킨 영혼의 힘! 대열 전체가 한 치의 흐트러짐 없이 하늘의 천사들처럼 착지했다.",
          stats: { WP: 7, Fel: 5, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "고공의 굉음 속에 붉은 갈증이 잠시 치밀어 대열 지휘가 흔들렸고, 근신 경고를 받았다.",
          stats: { WP: -2, Fel: -3 }
        }
      },
      {
        label: "선발 경쟁에 무리하지 않고 강습 분대의 표준 점프 팩 기동과 화력 엄호 절차 숙달에 집중한다",
        effect: {
          text: "화려한 곡예보다 전장에서 전우를 확실히 지키는 안정적 강하 전술을 몸에 새겼다.",
          stats: { Ag: 5, BS: 4, T: 3 }
        }
      }
    ],
    source: "Codex Supplement: Blood Angels / Lexicanum: Sanguinary Guard"
  },
  {
    id: "ev_s16_ch1_ba_2",
    title: "블러드 엔젤 — 성혈 사제의 성배 의식과 붉은 갈증의 시험",
    category: "챕터 고유",
    once: true,
    req: {
      maxYear: 998,
      greatRift: false,
      allTags: ["astartes"],
      anyChapters: ["blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "998.M41 이하 · 대균열 이전 · 챕터: 블러드 엔젤",
    weight: 30,
    text: "출정을 앞둔 바알 본성 아르크스 안젤리쿰의 대성당. 순백의 갑주에 붉은 망토를 두르고 성혈을 관장하는 생귀너리 사제가 생귀니우스의 성혈이 담긴 성배를 높이 들어 올린다. 성배를 한 모금 머금자 혈관 전체에 뜨거운 활력과 함께 맹렬한 붉은 갈증이 동시에 깨어난다. 이 축복이자 저주를 어떻게 다스릴 것인가?",
    choices: [
      {
        label: "[의지 판정] 성배의 격류를 고요한 명상으로 잠재우며 프라이마크의 고결한 자비와 절제를 되새긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "혈관을 태우던 갈증이 맑은 황금빛 결의로 승화되었다! 생귀너리 사제가 그대의 흔들림 없는 영혼을 축복했다.",
          stats: { WP: 7, Fel: 5, T: 4 },
          faith: 10,
          corruption: -6
        },
        fail: {
          text: "격렬한 혈액의 포효에 이성이 잠시 흔들려 성배를 쥔 손에 피가 배어 나올 만큼 힘을 주고 말았고, 출정 전 침묵의 기도로 정신을 가다듬어야 했다.",
          wounds: -12,
          stats: { WP: -2, Fel: -2 }
        }
      },
      {
        label: "[강인 판정] 끓어오르는 성혈의 활력을 온몸의 근육과 감각으로 받아들여 다가올 백병전에 대비한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "초인적인 혈류가 맥동하며 감각이 면도날처럼 예리해졌다! 다가올 전장에서 누구보다 맹렬히 적진을 가를 준비가 끝났다.",
          stats: { T: 6, WS: 6, Ag: 4 }
        },
        fail: {
          text: "급격한 대사 폭주로 고열과 격통이 덮쳐 아포세카리움의 진정 처치를 받고서야 갑주를 걸칠 수 있었다.",
          wounds: -18,
          stats: { T: 2, WP: -2 }
        }
      },
      {
        label: "[지성 판정] 성혈 사제를 보좌해 형제들의 심박과 갈증 징후를 정밀 감찰하며 의식의 균형을 지킨다",
        req: { anyTags: ["role_apothecary", "role_chaplain"] },
        check: { stat: "Int", diff: 0 },
        success: {
          text: "폭주 직전에 놓인 젊은 형제 두 명을 제때 가려내어 안정시켰다! 챕터 성직단이 그대의 통찰과 헌신을 높이 치하했다.",
          stats: { Int: 7, WP: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "징후 판독이 한 박자 늦어 소란이 일었고, 그 과정에서 형제를 제압하다 상처를 입었다.",
          wounds: -14,
          stats: { Inf: -2 }
        }
      },
      {
        label: "성혈을 소량만 입술에 적신 뒤 바알의 붉은 사막을 바라보며 조용히 무기를 점검한다",
        effect: {
          text: "과도한 격양을 경계하며 냉정하게 출정 준비를 마쳤다. 아르크스 안젤리쿰 회랑의 서늘한 새벽 공기가 마음을 가라앉혔다.",
          stats: { WP: 4, BS: 4, T: 3 },
          faith: 5
        }
      }
    ],
    source: "Codex Supplement: Blood Angels / Dante / Lexicanum: Sanguinary Priesthood"
  },
  {
    id: "ev_s16_ch1_ba_3",
    title: "블러드 엔젤 — 임페리움 니힐루스 섭정령 방어와 고립 성계 구원",
    category: "챕터 고유",
    once: true,
    req: {
      minYear: 1001,
      greatRift: true,
      allTags: ["astartes"],
      anyChapters: ["blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "001.M42 이후 · 대균열 이후 · 챕터: 블러드 엔젤",
    weight: 34,
    text: "대균열 너머 아스트로노미칸의 빛이 닿지 않는 암흑 제국 임페리움 니힐루스. 사령관 단테가 섭정으로 임명된 이래 블러드 엔젤은 끊임없는 구원 원정에 나서고 있다. 지금도 광기 어린 카오스 약탈 함대에 포위된 변경 성계에서 절박한 아스트로패스 구조 신호가 잡혔으나, 항로 전체가 거친 워프 폭풍에 휘말려 있다.",
    choices: [
      {
        label: "[민첩 판정] 강습 순양함의 위험한 단거리 워프 도약을 강행해 적 함대 배후로 직행 강하한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "핏빛 폭풍을 뚫고 나타난 진홍빛 강하 포드가 적의 포위망을 산산조각 냈다! 절망에 빠졌던 성계 시민들이 하늘에서 내려온 천사들을 우러러보며 눈물을 흘렸다.",
          stats: { Ag: 6, WS: 6, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "워프 난기류에 강습 포드 편대가 흩어지며 격렬한 대공 포화에 노출되어 중상을 입은 끝에야 교두보를 세웠다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 궤도 방어 위성 잔해에 매복해 적 약탈 함대의 기함을 집중 포격으로 격침한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "냉철한 기습 포격이 적 기함의 동력로를 관통했다! 지휘선을 잃은 약탈대가 붕괴하며 고립 성계의 봉쇄가 풀렸다.",
          stats: { BS: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "적 호위함의 역포격에 교전 구역이 붕괴하며 심한 충격과 화상을 입고 철수해야 했다.",
          wounds: -20,
          stats: { BS: 2, Inf: -2 }
        }
      },
      {
        label: "[권위 판정] 바알 재건군과 후계 챕터 분견대를 통합 편성해 성계 방어망 재건까지 책임지는 장기 구원 작전을 지휘한다",
        req: { anyTags: ["primaris", "astartes_captain", "chapter_master"] },
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "단순한 구조에 그치지 않고 성계 방위군을 재건해 임페리움 니힐루스의 견고한 교두보를 세웠다! 사령관 단테의 섭정령 회의에 승전보가 보고되었다.",
          stats: { Inf: 9, Fel: 6, WP: 5 },
          faith: 8
        },
        fail: {
          text: "보급선이 끊긴 암흑 제국의 가혹한 현실 속에 전선이 길어지며 막대한 소모와 부상을 감수해야 했다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "정면 함대전 대신 신속 수송선을 엄호해 성계의 아스트로패스와 전략 물자, 핵심 피난민을 안전 구역으로 이송한다",
        effect: {
          text: "모든 행성을 지킬 수 없는 암흑 제국의 비정함을 직시하고, 살아남은 인류의 불씨를 다음 성전 거점으로 무사히 옮겼다.",
          stats: { Int: 5, WP: 5, Fel: 4 },
          faith: 5
        }
      }
    ],
    source: "Darkness in the Blood / Codex Supplement: Blood Angels / Lexicanum: Imperium Nihilus"
  }
);
