window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || [];

window.IMPERIUM_DATA.EVENTS.push(
  // =========================================================================
  // 4단계 (2차 서사 보강 1단계) — 네임드 후일담 · 명예 태그 · 초년병기 · 무명 행성
  // =========================================================================

  // -------------------------------------------------------------------------
  // 1. 네임드 조우 후일담 분기 사건 (4종 · met_* 20인 전원 포괄)
  // -------------------------------------------------------------------------
  {
    id: "ev_s4_met_primarchs_echo",
    title: "거인들과 마주했던 날의 여파 — 제국 지휘부의 시선과 기대",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      anyTags: [
        "met_guilliman",
        "met_lion",
        "met_valoris",
        "met_dante",
        "met_calgar",
        "met_grimnar",
        "met_tushan",
        "met_azrael"
      ]
    },
    reqLabel: "프라이마크 · 섭정 · 챕터 마스터급 조우 이력",
    weight: 34,
    text: "그대가 인류제국의 최정점에 선 거인들과 직접 대면했다는 소문이 성계 사령부까지 퍼져 나갔다. 교착 상태에 빠진 작전 회의 도중, 고위 장교와 귀족 대표들이 돌연 그대에게 시선을 집중하며 '위대한 분의 뜻'을 대변해 달라고 압박하기 시작했다.",
    choices: [
      {
        label: "[교섭 판정] 그때 목격한 냉철한 결단과 책임의 무게를 전하며 분열된 지휘부를 하나로 묶는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "허세를 부리지 않고 전설의 가르침을 차분히 옮기자 회의장의 소음이 단숨에 가라앉았다! 양측 지휘부가 그대의 중재안을 만장일치로 채택했다.",
          stats: { Fel: 7, Inf: 8, WP: 4 },
          faith: 5
        },
        fail: {
          text: "권위를 빌리려는 속내를 들켜 귀족 파벌의 냉소적인 견제를 받게 되었다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 이름값에 기대는 풍토를 잘라 내고 오직 보급 수치와 전술 도면만으로 작전을 정리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "감상과 아첨을 배제한 명쾌한 분석에 참모진이 고개를 숙였다. 진정으로 위대한 존재를 곁에서 본 자다운 냉철함이었다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "명쾌한 논리였으나 정치적 체면을 중시하던 고위직들의 반발로 안건 일부가 보류되었다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "나는 그저 분수에 맞게 임무를 수행했을 뿐이라며 조용히 뒷줄로 물러난다",
        effect: {
          text: "권력의 소용돌이에 휘말리지 않고 본연의 자리를 지켰다. 겸손한 태도가 도리어 실무진의 깊은 신뢰를 샀다.",
          stats: { WP: 5, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Indomitus Crusade / Lords of the Imperium"
  },
  {
    id: "ev_s4_met_commanders_echo",
    title: "전장의 전설이 남긴 이름값 — 흔들리는 방어선과 막사의 소문",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      anyTags: [
        "met_yarrick",
        "met_creed",
        "met_gaunt",
        "met_cain",
        "met_marbo",
        "met_grimaldus"
      ]
    },
    reqLabel: "전설적 지휘관 · 커미사르 · 영웅 조우 이력",
    weight: 34,
    text: "포격이 멎지 않는 전초 기지에서 신병들 사이에 은밀한 속삭임이 돌았다. 야릭이나 크리드, 건트, 케인, 마보, 그리말두스 같은 살아 있는 전설과 같은 전장을 밟았던 고참이 바로 여기 있다는 소문이었다. 적의 야습 경보가 울린 순간, 공포에 질린 병사들의 시선이 일제히 그대에게 쏠렸다.",
    choices: [
      {
        label: "[의지 판정] 방벽 위로 올라 전설들에게 배운 불굴의 구호를 외치며 병사들의 사기를 끌어올린다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 호령에 얼어붙어 있던 신병들이 일제히 라스건을 치켜들고 화망을 열었다! 무너질 뻔한 전초 기지가 기적처럼 버텨 냈다.",
          stats: { WP: 7, Fel: 6, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "선두에 나서다 파편에 스쳤으나, 끝까지 물러서지 않은 모습 덕분에 패주만은 막았다.",
          wounds: -15,
          stats: { WP: 4, T: 2 }
        }
      },
      {
        label: "[사격 판정] 영웅담 따윈 필요 없다며 직접 중화기 사격 통제를 잡아 적의 돌파구를 차단한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 십자포화가 적 선봉을 갈아 버렸다! 병사들은 전설의 곁에서 살아남은 자의 실력이 헛소문이 아니었음을 깨달았다.",
          stats: { BS: 7, WS: 3, Inf: 5 }
        },
        fail: {
          text: "탄약이 떨어질 때까지 격전을 치르며 부상을 입었으나, 기지 본관은 지켜 냈다.",
          wounds: -14,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "과장된 소문을 잠재우고 각 분대에 기본 방어 교본과 퇴로 확보를 차분히 지시한다",
        effect: {
          text: "영웅은 신화가 아니라 살아남아 임무를 마치는 자라는 교훈을 되새겼다. 부대의 피해가 크게 줄었다.",
          stats: { Int: 4, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Astra Militarum Heroes / Helsreach / Gaunt's Ghosts"
  },
  {
    id: "ev_s4_met_shadows_echo",
    title: "봉인된 이름의 그림자 — 상층부 밀사의 은밀한 탐문",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      anyTags: [
        "met_eisenhorn",
        "met_amberley_vail",
        "met_cawl",
        "met_celestine"
      ]
    },
    reqLabel: "아이젠혼 · 앰벌리 베일 · 카울 · 성녀 셀레스틴 조우 이력",
    weight: 34,
    text: "늦은 밤, 인장 없는 검은 봉투를 든 밀사가 그대의 거처를 찾아왔다. 그대가 과거 이단심문소 거물이나 화성의 대현자, 혹은 살아 있는 성녀와 얽혔던 사건 기록이 상층부에서 재검토되고 있으며, 그날의 진실을 증언해 주면 막대한 보상을 내리겠다는 위험한 제안이었다.",
    choices: [
      {
        label: "[지성 판정] 밀사가 속한 파벌의 의도를 역으로 캐내어 제국 공식 보고서 선에서만 교묘히 빠져나간다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 하나의 빌미도 남기지 않고 상대의 뒷배까지 파악해 냈다! 밀사는 식은땀을 흘리며 두 번 다시 찾아오지 않겠다고 물러났다.",
          stats: { Int: 7, Inf: 6, WP: 4 }
        },
        fail: {
          text: "말실수를 노린 유도 심문에 말려 잠시 감시 대상에 올랐으나, 가까스로 혐의를 벗었다.",
          stats: { Inf: -3, WP: 3 },
          corruption: 3
        }
      },
      {
        label: "[의지 판정] 황제와 제국의 비밀은 거래 대상이 아니라며 밀사를 문전박대하고 침묵을 지킨다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "그대의 강직한 침묵이 오히려 본래 만났던 거물의 정보망에 보고되어 은밀한 신임과 후원으로 되돌아왔다!",
          stats: { WP: 7, Inf: 5 },
          faith: 6,
          corruption: -4
        },
        fail: {
          text: "보복성 암살 시도를 가까스로 막아 내며 상처를 입었으나 비밀만큼은 지켜 냈다.",
          wounds: -15,
          stats: { WP: 5 }
        }
      },
      {
        label: "이미 공식 서고에 제출된 내용 외에는 기억나는 바가 없다며 정중히 면담을 끝낸다",
        effect: {
          text: "거대한 권력 암투의 틈바구니에서 몸을 낮추는 것이 오래 살아남는 길이다.",
          stats: { Fel: 4, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Eisenhorn / Ciaphas Cain Archives / Belisarius Cawl"
  },
  {
    id: "ev_s4_met_nemesis_echo",
    title: "대적자를 목격한 생존자 — 밤마다 되살아나는 포효와 검의 환영",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      anyTags: ["met_abaddon", "met_ghazghkull"]
    },
    reqLabel: "약탈자 아바돈 또는 가즈쿨 조우 생존자",
    weight: 36,
    text: "은하를 불태우는 최악의 대적자를 두 눈으로 직접 마주하고도 살아남은 자는 제국 전체를 통틀어도 손에 꼽는다. 그러나 그날의 기억은 쉽게 지워지지 않는다. 칠흑 같은 마검의 비명과 성계를 뒤흔들던 와아아의 포효가 오늘 밤에도 그대의 잠자리를 찢어 놓는다.",
    choices: [
      {
        label: "[의지 판정] 공포를 불타는 증오로 벼려 내고 대적자의 전술 습성을 전술 교범으로 정리한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "악몽을 이겨 내고 작성한 대적자 대응 보고서가 성역 사령부 일급 기밀 교본으로 채택되었다! 그대는 공포마저 무기로 삼았다.",
          stats: { WP: 8, Int: 5, Inf: 7 },
          faith: 6,
          corruption: -6
        },
        fail: {
          text: "기억을 되짚는 과정에서 극심한 정신적 탈진에 빠져 의무대에서 며칠을 보냈다.",
          wounds: -12,
          stats: { WP: 3 }
        }
      },
      {
        label: "[백병 판정] 악몽이 밀려올 때마다 훈련장에서 피투성이가 되도록 검과 총기를 휘두르며 육신을 단련한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "다음번에 다시 마주친다면 결코 물러서지 않으리라 다짐하며 전투 기량을 한 단계 끌어올렸다!",
          stats: { WS: 7, T: 5, BS: 3 }
        },
        fail: {
          text: "무리한 야간 훈련으로 근육이 파열되었으나 전의만큼은 식지 않았다.",
          wounds: -14,
          stats: { WS: 4 }
        }
      },
      {
        label: "고요히 기도하며 살아남은 오늘 하루에 감사하고 동료들의 곁을 지킨다",
        effect: {
          text: "괴물의 그림자에 영혼을 잠식당하지 않기로 결심했다. 평온한 일상이 서서히 마음을 달랬다.",
          stats: { WP: 5 },
          faith: 5,
          corruption: -4
        }
      }
    ],
    source: "Lexicanum: Abaddon the Despoiler / Ghazghkull Mag Uruk Thraka"
  },

  // -------------------------------------------------------------------------
  // 2. 미회수 챕터 · 직책 · 전역 최상위 명예 태그 17종 전량 회수 사건 (16종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s4_tag_emperors_champion",
    title: "황제의 투사 — 검은 검이 가리킨 적 군주와의 일기토",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["emperors_champion"] },
    reqLabel: "이력: 황제의 투사 (블랙 템플러)",
    weight: 38,
    text: "황제의 계시를 받아 검은 갑주와 검은 검을 수여받은 그대의 눈앞에, 전장 한복판에서 붉은 깃발을 휘두르는 적의 카오스 군주가 나타났다. 성전군 형제들이 일제히 길을 터 주며 황제의 투사가 치를 신성한 일기토를 지켜본다.",
    choices: [
      {
        label: "[백병 판정] 어떠한 주저도 없이 돌진해 검은 검으로 적 군주의 목을 베어 낸다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "황제의 이름이 전장에 울려 퍼지며 검은 검이 적 군주의 갑주를 양단했다! 성전군 전체가 광신적인 환호와 함께 적진을 붕괴시켰다.",
          stats: { WS: 9, WP: 6, Inf: 8 },
          faith: 12,
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "적 군주의 흉악한 반격에 치명상을 입었으나, 끝내 상대의 무기를 부러뜨리고 전선에서 몰아냈다.",
          wounds: -24,
          stats: { WS: 5, T: 4 },
          faith: 6
        }
      },
      {
        label: "[의지 판정] 성가를 외치며 적의 워프 저주를 정면으로 튕겨 내고 틈을 노려 찌른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불굴의 신앙이 사악한 마법을 무력화시켰고, 당황한 적 군주를 단칼에 쓰러뜨렸다!",
          stats: { WP: 8, WS: 6, Inf: 6 },
          faith: 10,
          corruption: -10
        },
        fail: {
          text: "워프 화염에 갑주가 그을렸으나 신앙으로 버텨 내며 적의 진격을 멈추었다.",
          wounds: -18,
          stats: { WP: 5 }
        }
      },
      {
        label: "무리한 단독 돌격 대신 형제들과 쐐기 진형을 짜 적 지휘부를 함께 분쇄한다",
        effect: {
          text: "화려한 일기토 대신 성전군 전체의 승리를 택했다. 채플린이 그대의 냉정한 헌신을 높이 샀다.",
          stats: { WS: 4, T: 4, Inf: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Emperor's Champion / Codex: Black Templars"
  },
  {
    id: "ev_s4_tag_wolf_guard",
    title: "울프 가드의 서약 — 대연회장의 룬 점괘와 출정 명령",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["wolf_guard"] },
    reqLabel: "이력: 울프 가드 (스페이스 울프)",
    weight: 38,
    text: "대중대 연회장에서 묠드(Mjod) 술잔이 부딪히는 가운데, 룬 프리스트가 뼈 조각을 던져 불길한 사냥의 예언을 읽어 냈다. 울프 로드 직속 친위대인 울프 가드로서 그대가 선봉 타격대를 이끌 차례가 다가왔다.",
    choices: [
      {
        label: "[백병 판정] 프로스트 블레이드를 치켜들고 가장 거대한 적 괴수의 숨통을 끊는 사냥을 선포한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "서리 칼날이 적 괴수의 심장을 꿰뚫었다! 그대의 무용담은 대연회장의 스칼드 서사시에 새로운 장으로 노래되었다.",
          stats: { WS: 8, T: 5, Inf: 7 }
        },
        fail: {
          text: "괴수의 발톱에 깊은 흉터를 얻었으나 사냥감의 머리는 끝내 베어 돌아왔다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 혹독한 눈보라 속 궤도 강하를 강행해 적 포병 진지를 통째로 짓밟는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "펜리스의 겨울보다 매서운 전장은 없다는 기개로 적 후방을 완벽히 유린했다!",
          stats: { T: 8, BS: 5, Inf: 6 }
        },
        fail: {
          text: "거센 대공 포화에 큰 피해를 입었으나 끝까지 진지를 무너뜨리고 귀환했다.",
          wounds: -18,
          stats: { T: 5 }
        }
      },
      {
        label: "젊은 블러드 클로 신병들을 친히 이끌어 사냥의 기본과 동료애를 가르친다",
        effect: {
          text: "거친 신병들이 그대의 지휘 아래 진정한 늑대 전사로 거듭났다. 대중대의 결속이 한층 단단해졌다.",
          stats: { Fel: 6, WP: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Wolf Guard / Codex: Space Wolves"
  },
  {
    id: "ev_s4_tag_huscarl_oath",
    title: "후스카를의 맹세 — 무너지는 성벽과 강철의 최후 방벽",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["huscarl_oath"] },
    reqLabel: "이력: 후스카를 (임페리얼 피스트)",
    weight: 38,
    text: "로갈 돈의 방어 철학을 계승한 후스카를로서 그대가 보강을 지휘하던 요새 성벽에 적의 공성 포화가 집중되었다. 외벽 제3보루에 균열이 번지며 지휘부가 2선 철수를 건의한다.",
    choices: [
      {
        label: "[지성 판정] 붕괴 각도를 즉석 계산해 무너지는 외벽 잔해를 역으로 살상 지대 바리케이드로 전환한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "성벽의 파편마저 요새의 일부로 삼는 완벽한 방어 공학! 적 공성대는 좁아진 병목에서 한 걸음도 나아가지 못했다.",
          stats: { Int: 8, T: 5, Inf: 7 }
        },
        fail: {
          text: "폭파 시점이 미세하게 어긋나 잔해에 부딪혔으나, 돌파구 봉쇄에는 성공했다.",
          wounds: -16,
          stats: { Int: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 스톰 실드를 들고 균열 한복판에 직접 서서 증원이 올 때까지 한 발자국도 물러서지 않는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "포연이 걷힌 뒤에도 황금빛 갑주는 단 한 걸음도 뒤로 밀리지 않았다! '프라이마크와 황제를 위하여!'라는 외침이 성벽을 덮었다.",
          stats: { T: 8, WP: 6, WS: 4, Inf: 7 }
        },
        fail: {
          text: "연속 포격에 중상을 입었으나 끝까지 방패를 내려놓지 않아 보루를 지켜 냈다.",
          wounds: -22,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "예비 방어선으로 질서 정연하게 후퇴해 적을 미리 설치한 화망 안으로 유인한다",
        effect: {
          text: "자존심보다 요새 전체의 보존을 택한 냉철한 판단이었다. 아군 손실을 최소화하며 공세를 꺾었다.",
          stats: { Int: 5, BS: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Huscarls / Codex: Imperial Fists"
  },
  {
    id: "ev_s4_tag_promethean_smith",
    title: "프로메테안 대장장이 — 용암로의 명검 주조와 불의 시련",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["promethean_smith"] },
    reqLabel: "이력: 프로메테안 대장장이 (샐러맨더)",
    weight: 38,
    text: "전투가 끝난 뒤에도 샐러맨더의 사명은 끝나지 않는다. 프로메테안 교단의 장인으로서 그대는 손상된 고대 유물 무구와 새 마스터크래프트 병기를 벼려 내기 위해 화산 용광로 앞에 섰다. 동시에 인근 민간 정착지가 약탈자들의 습격을 받고 있다는 긴급 구조 신호가 날아들었다.",
    choices: [
      {
        label: "[강인 판정] 밤새 용광로의 열기를 견뎌 유물 무구를 완성한 뒤 즉시 구원군 선봉으로 출격한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "갓 식힌 마스터크래프트 망치가 약탈자들의 장갑을 박살 냈다! 장인의 땀과 전사의 헌신이 정착지를 구했다.",
          stats: { T: 7, WS: 6, Int: 5, Inf: 7 }
        },
        fail: {
          text: "화상과 피로를 안고 출격해 부상을 입었으나, 민간인 대피선은 무사히 이륙시켰다.",
          wounds: -18,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 주조 작업을 잠시 멈추고 민간인 방어용 방열 장벽과 화염 방어망을 현장에서 즉석 제작한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "불칸의 자비와 장인 정신이 완벽히 어우러졌다! 정착지 주민들은 화염의 방패 뒤에서 단 한 명의 희생도 없이 살아남았다.",
          stats: { Int: 8, Fel: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "급조한 방벽 일부가 녹아내려 화상을 입었으나, 주민 대다수는 지켜 냈다.",
          wounds: -14,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "형제들에게 구원 출동을 맡기고 흔들림 없이 고대 유물 무구의 복원을 완벽히 마무리한다",
        effect: {
          text: "완벽하게 되살아난 유물 무기가 챕터 무기고에 봉안되었다. 다음 성전에서 수많은 생명을 구할 병기가 탄생했다.",
          stats: { Int: 6, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Promethean Cult / Codex: Salamanders"
  },
  {
    id: "ev_s4_tag_shadow_master",
    title: "그림자 마스터 — 적 사령부 심장부로의 무음 침투",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["shadow_master"] },
    reqLabel: "이력: 그림자 마스터 (레이븐 가드)",
    weight: 38,
    text: "정면 공성전으로 치르면 수만 명의 필멸자 병사가 희생될 난공불락의 반란 요새. 그림자 걸음의 극의에 오른 그대에게 야음을 틈타 적 총사령관의 목만 조용히 거두고 방어망을 무력화하라는 단독 임무가 하달되었다.",
    choices: [
      {
        label: "[민첩 판정] 감시 서보스컬과 레이저 격자 사이를 그림자처럼 스쳐 지나가 적 지휘관을 단신 암살한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "경보 한 번 울리지 않은 채 적 사령부가 침묵했다! 다음 날 새벽, 아군 정규군은 총 한 발 쏘지 않고 요새를 접수했다.",
          stats: { Ag: 9, WS: 5, Inf: 8 }
        },
        fail: {
          text: "경비대의 탐조등에 포착되어 난전 끝에 겨우 탈출했으나, 핵심 통신탑만은 폭파해 적을 혼란에 빠뜨렸다.",
          wounds: -18,
          stats: { Ag: 5, BS: 3 }
        }
      },
      {
        label: "[지성 판정] 암살 대신 적 보급망과 암호 통신을 교란해 반란군 내부에서 서로 총구를 겨누게 만든다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "코락스의 계략이 빛을 발했다! 의심에 사로잡힌 반란군 분파들이 자중지란을 일으키며 스스로 무너졌다.",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "기만 공작이 일부 간파되었으나, 시간을 벌어 아군 기습 강하를 성공시켰다.",
          wounds: -12,
          stats: { Int: 4, Ag: 3 }
        }
      },
      {
        label: "요새 내부 취약 지점의 좌표만 완벽히 정찰해 본대 정밀 폭격에 넘긴다",
        effect: {
          text: "불필요한 모험 대신 확실한 정보를 가져왔다. 본대의 정밀 타격으로 요새의 동력로가 순식간에 증발했다.",
          stats: { Ag: 5, Int: 5 }
        }
      }
    ],
    source: "Lexicanum: Shadowmasters / Codex: Raven Guard"
  },
  {
    id: "ev_s4_tag_khan_rider",
    title: "칸의 기수 — 모래 폭풍을 가르는 기갑 섬멸전",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["khan_rider"] },
    reqLabel: "이력: 칸의 기수 (화이트 스카)",
    weight: 38,
    text: "광활한 평원에 거대한 모래 폭풍이 몰아치며 시야가 완전히 닫혔다. 다른 제국 부대들이 진격을 멈추고 참호에 숨어든 사이, 칸의 기수로 인정받은 그대는 폭풍을 방패 삼아 적 중기갑 사단의 측면을 베어 낼 절호의 기회를 포착했다.",
    choices: [
      {
        label: "[민첩 판정] 아웃라이더 바이크의 엔진을 한계까지 끌어올려 폭풍 한가운데로 고속 돌파한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "웃음소리와 함께 번개처럼 스쳐 지나간 기습이 적 기갑 행렬을 산산조각 냈다! 적들은 무엇에게 당했는지조차 알지 못했다.",
          stats: { Ag: 8, WS: 6, Inf: 7 }
        },
        fail: {
          text: "바이크가 지뢰 파편에 튕겨 나가 큰 충격을 받았으나, 도보로 잔적을 쓸어 버리고 귀환했다.",
          wounds: -18,
          stats: { Ag: 4, T: 4 }
        }
      },
      {
        label: "[사격 판정] 시속 백 킬로미터로 질주하며 멜타와 볼터 정밀 사격으로 적 지휘 전차를 꿰뚫는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "질주하는 말 위에서 활을 쏘던 초고리스 사냥꾼의 혼이 되살아났다! 적 지휘 전차가 거대한 불기둥을 뿜으며 멈춰 섰다.",
          stats: { BS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "모래바람에 조준이 흔들려 반격 포화를 맞았으나, 적의 보급 트럭 대열은 전멸시켰다.",
          wounds: -15,
          stats: { BS: 4, Ag: 3 }
        }
      },
      {
        label: "폭풍 가장자리를 선회하며 적을 협곡 안쪽으로 몰아넣어 아군 본대의 포위망에 가둔다",
        effect: {
          text: "초원의 사냥법 그대로 먹잇감을 그물로 몰아넣었다. 완벽한 기동 협동 작전이었다.",
          stats: { Ag: 5, Int: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: White Scars / Codex: White Scars"
  },
  {
    id: "ev_s4_tag_ultramar_scholar",
    title: "울트라마르 학자 — 500세계 행정 재건과 썩은 총독의 장부",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["ultramar_scholar"] },
    reqLabel: "이력: 울트라마르 학자",
    weight: 36,
    text: "울트라마르의 실용 행정과 법학을 익힌 그대의 명성이 알려져, 보급난에 시달리는 인근 행성의 전시 행정 감사 위원으로 초빙되었다. 감사 첫날 밤, 그대는 현지 총독 가문이 군량미를 암시장에 빼돌려 온 이중 장부를 발견하고 말았다.",
    choices: [
      {
        label: "[지성 판정] 10년 치 세금과 수송 기록을 완벽히 대조해 반박 불가능한 탄핵 조서를 작성한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "총독의 변명이 한 줄도 통하지 않았다! 부패한 관리들이 일제히 숙청되고, 압수한 군량미가 전선으로 즉시 수송되었다.",
          stats: { Int: 8, Inf: 8, WP: 4 }
        },
        fail: {
          text: "증거 일부가 방화로 소실되어 완전한 숙청엔 실패했으나, 군량미 유출만은 틀어막았다.",
          stats: { Int: 4, Inf: -2 },
          wounds: -10
        }
      },
      {
        label: "[교섭 판정] 총독의 목숨은 살려 주는 조건으로 가문 사재 전액을 전시 구호 기금으로 헌납하게 압박한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행성 행정 마비 없이 막대한 군자금과 식량을 단숨에 확보했다! 울트라마르다운 실리적 해결이었다.",
          stats: { Fel: 8, Inf: 7, Int: 4 }
        },
        fail: {
          text: "총독 측과 거친 신경전을 벌이다 정치적 앙금을 남겼으나, 일부 물자는 회수했다.",
          stats: { Fel: 3, Inf: -3 }
        }
      },
      {
        label: "장부 사본을 봉인해 상급 아드미니스트라툼 감사국에 정식 이관하고 절차대로 처분을 맡긴다",
        effect: {
          text: "개인적 복수나 정치 개입을 피하고 법과 절차의 원칙을 지켰다.",
          stats: { Int: 5, WP: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Ultramar / Codex: Ultramarines"
  },
  {
    id: "ev_s4_tag_librarius_trained",
    title: "챕터 라이브러리우스 — 워프 폭풍 속 사이킥 차폐와 마도서 봉인",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["librarius_trained"] },
    reqLabel: "이력: 챕터 라이브러리우스",
    weight: 38,
    text: "배틀 바지가 워프 난기류에 휘말린 찰나, 챕터 라이브러리우스 금서고에 봉인되어 있던 카오스 마도서 한 권이 쇠사슬을 끊고 핏빛 속삭임을 토해 내기 시작했다. 함교의 네비게이터가 비명을 지르며 시야를 잃어 가는 절체절명의 순간이다.",
    choices: [
      {
        label: "[의지 판정] 사이킥 후드를 최대 출력으로 가동해 마도서의 사념을 정면으로 짓눌러 재봉인한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "푸른 사이킥 번개가 사악한 속삭임을 태워 버리며 마도서를 완벽히 침묵시켰다! 챕터의 수석 라이브러리가 그대의 정신력을 경외했다.",
          stats: { WP: 9, Int: 6, Inf: 7 },
          corruption: -8
        },
        fail: {
          text: "워프 역류로 코피를 쏟으며 정신적 타격을 입었으나, 마도서가 함선에 풀려나는 것만은 막았다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 챕터 고대 의례서의 대항 룬을 즉석에서 새겨 워프 파동을 함선 밖으로 방출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정교한 룬 결계가 저주의 에너지를 공허로 흘려보냈다! 네비게이터가 항로를 되찾으며 배틀 바지가 무사히 실우주로 복귀했다.",
          stats: { Int: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "결계가 흔들리며 서고 일부가 불탔으나, 함선 전체는 위기에서 벗어났다.",
          wounds: -14,
          corruption: 4,
          stats: { Int: 4 }
        }
      },
      {
        label: "마도서가 담긴 봉인 금고째 에어록으로 사출해 실우주 항성의 중력권에 던져 버린다",
        effect: {
          text: "귀중한 연구 자료를 잃었으나, 형제들의 영혼을 지키는 것이 그 무엇보다 우선이다.",
          stats: { WP: 5, T: 3 },
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Librarius / Space Marine Librarian Lore"
  },
  {
    id: "ev_s4_tag_chapter_serf",
    title: "챕터 서프의 충성 — 배틀 바지 침입자와 천사의 무기고",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["chapter_serf"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "이력: 챕터 서프 (필멸자 종복)",
    weight: 36,
    text: "비록 진시드 선발에서는 고배를 마셨으나 아스타르테스의 곁에서 평생을 봉사하는 챕터 서프가 된 그대. 배틀 브라더들이 행성 표면에 강하한 사이, 해적 강습정이 배틀 바지 하부 무기고로 침투해 천사들의 예비 파워 아머와 볼터를 노리고 있다.",
    choices: [
      {
        label: "[사격 판정] 서프 방어 소대를 규합해 무기고 통로에서 오토건과 방어 포탑으로 침입자를 저지한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "아스타르테스 못지않은 규율과 화망으로 해적들을 전멸시켰다! 귀환한 중대장이 그대의 어깨에 친히 손을 얹으며 '우리의 형제나 다름없다'고 치하했다.",
          stats: { BS: 7, WP: 6, Inf: 7 }
        },
        fail: {
          text: "치열한 백병전 끝에 중상을 입었으나, 귀환한 스페이스 마린들이 도착할 때까지 무기고 문만은 열어 주지 않았다.",
          wounds: -18,
          stats: { T: 4, WP: 5 }
        }
      },
      {
        label: "[지성 판정] 함선 내부 방화 격벽과 진공 배기 밸브를 원격 조작해 침입 구역을 통째로 봉쇄한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "무기고를 누구보다 잘 아는 종복의 기지였다! 해적 강습대가 진공 통로에 갇혀 손쉽게 제압되었다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "격벽 폐쇄가 한 박자 늦어 무기고 외곽이 파손되었으나 유물 갑주는 무사했다.",
          wounds: -10,
          stats: { Int: 4 }
        }
      },
      {
        label: "유물 갑주를 내부 금고로 대피시키고 함교에 긴급 경보를 송신해 보안대의 진압을 지원한다",
        effect: {
          text: "필멸자의 몸으로도 천사들의 무구를 끝까지 지켜 냈다. 서프 동료들 사이에서 깊은 존경을 얻었다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Chapter Serf / Space Marine Fortress-Monastery Lore"
  },
  {
    id: "ev_s4_tag_krieg_grenadier",
    title: "크리그 척탄병 — 해골 가면 돌격대의 독가스 참호 돌파",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["krieg_grenadier"] },
    reqLabel: "이력: 크리그 척탄병",
    weight: 36,
    text: "지옥불 라스건과 중장갑 카라페이스 아머, 그리고 해골 문양 방독면을 착용한 크리그 척탄병으로서 최전선 돌파조에 배치되었다. 맹독성 포격 연기가 무인지대를 뒤덮은 가운데, 아군 공병대의 참호 폭파가 절반만 성공해 철조망 틈새가 좁게 열렸다.",
    choices: [
      {
        label: "[강인 판정] 독가스 구름 속으로 가장 먼저 뛰어들어 지옥불 라스건으로 적 중기관총 진지를 제압한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "죽음을 두려워하지 않는 해골 가면의 전진에 적 방어병들이 공포에 질려 무너졌다! 후속 연대가 단숨에 적 1차 참호를 점령했다.",
          stats: { T: 8, BS: 5, WP: 5, Inf: 5 }
        },
        fail: {
          text: "방독면 여과기가 손상되어 폐에 독기를 마셨으나, 끝내 적 벙커를 폭파하고 임무를 완수했다.",
          wounds: -20,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[사격 판정] 연막 너머의 적 총구 화염만 보고 정확히 유탄과 고출력 사격을 꽂아 넣는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "기계처럼 냉정한 사격이 적 기관총 사수들을 차례로 침묵시켰다. 병참 장교가 그대의 번호를 최우수 척탄병 기록에 올렸다.",
          stats: { BS: 8, Int: 4, Inf: 5 }
        },
        fail: {
          text: "탄창이 과열되어 팔에 화상을 입었으나 돌파구만은 끝까지 열어 두었다.",
          wounds: -14,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "파괴되지 않은 철조망 아래로 몸을 밀어 넣어 후속 보병들이 밟고 지나갈 발판과 통로를 확보한다",
        effect: {
          text: "개인의 생사는 의미 없다. 연대가 전진하고 속죄가 이루어졌으니 그것으로 충분하다.",
          stats: { WP: 6, T: 5 },
          wounds: -10,
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Death Korps Grenadier / Imperial Armour: Siege of Vraks"
  },
  {
    id: "ev_s4_tag_catachan_blooded",
    title: "카타찬 성인식 통과자 — 외지 귀족 장교의 무모한 돌격 명령",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["catachan_blooded"] },
    reqLabel: "이력: 카타찬 성인식 통과",
    weight: 36,
    text: "카타찬 밀림에서 살아남은 그대의 야생 직감이 날카로운 경고를 울린다. 늪지 숲 너머의 고요함이 비정상적이다. 분명 적의 매복이 도사리고 있건만, 새로 부임한 외지 귀족 출신 장교는 정면 개활지로 일렬 행군을 강행하라고 소리친다.",
    choices: [
      {
        label: "[민첩 판정] 대열을 벗어나 단독 우회 정찰로 적 매복조의 지뢰선과 저격수를 먼저 칼로 정리한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "카타찬 단검이 소리 없이 매복조 전원을 침묵시켰다! 전우들은 그대의 목숨을 건 정찰에 열광했고, 콧대 높던 장교마저 말을 잃었다.",
          stats: { Ag: 8, WS: 6, Inf: 5 }
        },
        fail: {
          text: "함정에 걸려 다리를 다쳤으나, 신호탄을 쏘아 올려 본대 전체가 학살당하는 참사를 막았다.",
          wounds: -18,
          stats: { Ag: 4, T: 4 }
        }
      },
      {
        label: "[교섭 판정] 카타찬의 지형 판독 근거를 조목조목 들이대며 부하들의 목숨을 걸고 우회 기동을 관철한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "장교가 마지못해 우회로를 허락했고, 직후 원 경로에 쏟아진 적의 포격을 보며 그대에게 정식으로 사과했다.",
          stats: { Fel: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "항명 직전까지 가는 언쟁 끝에 징계 경고를 받았으나, 최소한 선발대만이라도 경계 태세를 갖추게 만들었다.",
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "명령은 따르되 분대원들에게 간격을 넓히고 엄폐 준비를 시켜 기습이 터지는 즉시 반격한다",
        effect: {
          text: "역시나 매복이 터졌으나 미리 대비한 덕분에 분대 피해는 극소수에 그쳤다.",
          stats: { T: 5, BS: 4 },
          wounds: -8
        }
      }
    ],
    source: "Lexicanum: Catachan Jungle Fighters / Codex: Astra Militarum"
  },
  {
    id: "ev_s4_tag_fenris_blood",
    title: "펜리스 빙원의 피 — 혹한의 전선과 늑대의 사가",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["fenris_blood"] },
    reqLabel: "이력: 펜리스 빙원 생존자",
    weight: 36,
    text: "영하 50도의 혹한이 몰아친 전선에서 다른 행성 출신 병사들은 손가락이 얼어붙어 방아쇠조차 당기지 못하고 있다. 그러나 갈라지는 빙해와 얼음 늑대 사이에서 자란 그대의 혈관에는 오히려 뜨거운 전의가 끓어오른다.",
    choices: [
      {
        label: "[강인 판정] 동상에 쓰러진 전우들을 들쳐 업고 눈보라를 뚫어 최전방 보온 벙커까지 돌파한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "펜리스인의 괴력과 내한성에 동료들이 경악했다! 그대 덕분에 한 개 소대 전원이 동사를 면하고 반격에 나섰다.",
          stats: { T: 8, WS: 4, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "혹독한 냉기에 동상을 입었으나 끝까지 전우들을 놓지 않고 벙커에 도착했다.",
          wounds: -16,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[백병 판정] 눈보라를 이용해 총기가 얼어붙은 적 초소에 육박전으로 돌격해 난방 발전기를 탈취한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "포효와 함께 도끼와 단검으로 적 초소를 휩쓸었다! 빼앗은 발전기 불빛 아래 그대의 이름이 새로운 사가로 불렸다.",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "격투 끝에 부상을 입었으나 발전기와 식량을 확보해 아군을 살려 냈다.",
          wounds: -15,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "빙원에서 익힌 체온 유지법과 동상 예방 요령을 동료들에게 차근차근 전수한다",
        effect: {
          text: "펜리스의 생존 지혜가 낯선 행성의 겨울을 이겨 내게 해 주었다.",
          stats: { Int: 4, Fel: 5, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Fenris / Space Wolves Lore"
  },
  {
    id: "ev_s4_tag_daemon_bane",
    title: "악마 살해자 — 워프 너머에서 날아온 원한의 진명",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["daemon_bane"] },
    reqLabel: "이력: 악마 살해자",
    weight: 38,
    text: "과거 그대가 추방하거나 베어 낸 워프 악마는 결코 그대의 영혼 냄새를 잊지 않는다. 성소의 촛불이 일제히 푸른빛으로 뒤집히더니, 그림자 속에서 그대의 이름을 저주하는 사악한 현현이 다시 현실의 막을 찢고 손을 뻗어 온다.",
    choices: [
      {
        label: "[의지 판정] 황제의 순결한 기도문과 진명 추방 의식으로 악마의 원념을 영구히 찢어 발긴다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "비명과 함께 워프의 틈이 완전히 닫혔다! 악마마저 두려워하는 진정한 퇴마사의 명성이 제국 비밀 기록에 각인되었다.",
          stats: { WP: 9, Inf: 7 },
          faith: 12,
          corruption: -12
        },
        fail: {
          text: "악마의 저주가 정신을 훑고 지나가 깊은 상처를 남겼으나, 현현 자체는 가까스로 쫓아냈다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 축복받은 무기를 쥐고 현실로 기어 나오는 악마의 팔을 망설임 없이 베어 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "은빛 성유를 바른 칼날이 악마의 육신을 태워 버렸다! 두 번 다시 그대 앞에 나타나지 못할 치명타였다.",
          stats: { WS: 8, T: 4, WP: 5 },
          faith: 6,
          corruption: -6
        },
        fail: {
          text: "지옥불 발톱에 가슴을 베였으나 끝내 사악한 형체를 조각내어 추방했다.",
          wounds: -22,
          stats: { WS: 5 }
        }
      },
      {
        label: "즉시 은과 소금으로 방어 원을 그리고 인근 성직자와 심문소 요원에게 정화 지원을 요청한다",
        effect: {
          text: "혼자 영웅심을 부리지 않고 정화반과 합동으로 악마의 잔재를 안전하게 소각했다.",
          stats: { Int: 5, WP: 4 },
          faith: 5,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Daemon / Ordo Malleus & Grey Knights Lore"
  },
  {
    id: "ev_s4_tag_rift_touched",
    title: "대균열 감응자 — 꿈속에서 울리는 천 개 성계의 비명",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["rift_touched"] },
    reqLabel: "이력: 대균열 감응자",
    weight: 36,
    text: "시카트릭스 말레딕툼이 하늘을 찢던 날 워프 파동에 감응한 이후, 그대의 꿈에는 간혹 아직 닥치지 않은 재앙의 단편이 스쳐 지나간다. 오늘 새벽, 그대는 인근 궤도 정거장에 숨어든 이단 함대의 기습 시각을 기이할 만큼 생생하게 보았다.",
    choices: [
      {
        label: "[의지 판정] 환상의 유혹에 흔들리지 않고 핵심 좌표만 추려 성계 방어 사령부에 익명 경고를 보낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 경고 덕분에 방어 함대가 미리 매복해 이단 기습 함대를 전멸시켰다! 누구도 출처를 몰랐으나 수많은 생명을 구했다.",
          stats: { WP: 8, Int: 6, Inf: 5 },
          faith: 6,
          corruption: -5
        },
        fail: {
          text: "환상 속에 섞인 워프의 속임수 때문에 두통과 오염을 겪었으나, 경계 강화만은 이끌어 냈다.",
          wounds: -12,
          corruption: 8,
          stats: { WP: 3 }
        }
      },
      {
        label: "[지성 판정] 꿈의 단편을 실제 아스트로패스 통신 잡음과 대조해 과학적 예측 보고서로 포장한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "이단 심문의 의심을 완벽히 피하면서도 기습을 차단하는 데 성공했다! 상부가 그대의 탁월한 정보 분석력을 극찬했다.",
          stats: { Int: 8, Inf: 7 }
        },
        fail: {
          text: "보고서의 근거가 석연치 않다는 지적을 받아 감찰관의 면담을 치러야 했다.",
          stats: { Int: 3, Inf: -3 }
        }
      },
      {
        label: "워프가 보여 주는 예지는 언제나 독이 든 잔이라며 성당에서 정화 기도를 올리고 환상을 덮는다",
        effect: {
          text: "금단의 감각에 의지하지 않고 영혼의 순결을 지켰다. 머릿속을 울리던 비명이 한결 잦아들었다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -8
        }
      }
    ],
    source: "Lexicanum: Great Rift / Psychic Awakening"
  },
  {
    id: "ev_s4_tag_vigilus_veteran",
    title: "비질루스 방어전 베테랑 — 나흐문드 회랑의 산증인",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["vigilus_veteran"] },
    reqLabel: "이력: 비질루스 방어전 참전",
    weight: 36,
    text: "임페리움 상크투스와 암흑 제국을 잇는 좁은 숨통, 비질루스의 처절한 방어전에서 살아 돌아온 그대. 나흐문드 회랑으로 파견될 신편 성전군 지휘부가 오크 스피드 프릭과 진스틸러 교단, 블랙 리전이 뒤엉켰던 복합 시가전의 교훈을 전해 달라며 그대를 강단에 세웠다.",
    choices: [
      {
        label: "[지성 판정] 3중 전선에서 살아남은 도심 봉쇄 전술과 진스틸러 지하 색출 요령을 체계적으로 강의한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "실전의 피로 쓴 교본에 신편 지휘관들이 기립 박수를 보냈다! 그대의 전술안이 회랑 수비대의 표준 교리로 채택되었다.",
          stats: { Int: 7, Inf: 7, BS: 3 }
        },
        fail: {
          text: "복잡한 시가전 교훈을 짧은 시간에 다 전하지 못했으나, 핵심 매복 회피법만은 각인시켰다.",
          stats: { Int: 4, Inf: 3 }
        }
      },
      {
        label: "[교섭 판정] 탁상공론에 빠진 신임 장교들에게 비질루스의 참혹한 현실을 직설적으로 일깨워 정신을 차리게 한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "거친 진실이 오만한 장교들의 허영을 깨뜨렸다! 부대가 훨씬 단단한 각오로 나흐문드 회랑을 향해 출항했다.",
          stats: { Fel: 7, WP: 6, Inf: 6 }
        },
        fail: {
          text: "사기를 떨어뜨렸다는 항의를 받았으나, 현장에 나간 병사들은 나중에 그대의 경고가 옳았음을 깨달았다.",
          stats: { Inf: -2, WP: 4 }
        }
      },
      {
        label: "강단 대신 무기고로 내려가 파견될 병사들의 장비 점검과 생존 노하우를 묵묵히 도와준다",
        effect: {
          text: "화려한 훈장보다 신병 한 명이라도 더 살려 보내는 것이 비질루스 생존자의 도리다.",
          stats: { T: 4, Fel: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: War of Beasts / Vigilus Defiant"
  },
  {
    id: "ev_s4_tag_tyrannic_veterans",
    title: "타이라니드 전쟁 베테랑 — 워프의 그림자를 알아본 자의 경고",
    category: "명예 태그 연작",
    once: true,
    req: { anyTags: ["tyranic_war_vet", "tyrannic_veteran"] },
    reqLabel: "이력: 타이라니드 전쟁 베테랑",
    weight: 36,
    text: "아스트로패스 통신이 사흘째 잡음 속에 끊기고, 성계 외곽 농장의 가축들이 까닭 없이 날뛰기 시작했다. 현지 관료들은 단순한 태양 흑점 이상이라 치부하지만, 하이브 함대와 싸워 본 그대는 온몸의 털이 곤두서는 그 감각을 안다. '워프의 그림자(Shadow in the Warp)'가 다가오고 있다.",
    choices: [
      {
        label: "[지성 판정] 과거 타이라니드 전쟁의 생체 정찰 패턴을 제시하며 즉시 궤도 초계망과 지하 진스틸러 수색을 발동시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "그대의 경고로 조기 탐지된 하이브 선봉 촉수와 지하 교단 세포가 상륙 전에 격멸되었다! 행성 전체가 포식의 악몽을 피했다.",
          stats: { Int: 8, Inf: 8, WP: 5 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "관료들이 늑장 대응하는 사이 정찰 생체 괴수 리크터가 침투해 격전 끝에 간신히 사살했다.",
          wounds: -18,
          stats: { WS: 4, Int: 4 }
        }
      },
      {
        label: "[사격 판정] 직접 정예 수색대를 이끌고 외곽 숲에 떨어진 포자 낭종을 화염방사기와 볼터로 소각한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "시냅스 개체의 머리를 정확히 꿰뚫어 무리의 통제를 끊었다! 베테랑의 노련한 대처가 전염을 원천 봉쇄했다.",
          stats: { BS: 8, T: 4, Inf: 6 }
        },
        fail: {
          text: "산성 생체액에 화상을 입었으나 마지막 포자 낭종까지 완전히 불태웠다.",
          wounds: -16,
          stats: { BS: 4, T: 4 }
        }
      },
      {
        label: "비상 대피 절차와 식수 격리 매뉴얼을 배포해 행성이 장기 포위전에 대비하도록 돕는다",
        effect: {
          text: "최악의 포식자 앞에서 살아남는 법은 공포에 흔들리지 않는 철저한 대비뿐이다.",
          stats: { WP: 5, T: 4, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Tyrannic Wars / Tyrannic War Veterans"
  },

  // -------------------------------------------------------------------------
  // 3. 14~22세 사회 초년기 · 신병 통과 의례 분기 사건 (7종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s4_youth_factory_shift",
    title: "초년기 — 첫 16시간 야간 교대와 매뉴팩토룸 프레스 폭주",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["menial_worker", "underhive_ganger"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "14~21세 · 하층 노동자 / 언더하이브 갱단",
    weight: 30,
    text: "어른 몫의 첫 배속표를 받아 든 지 얼마 되지 않은 밤, 매뉴팩토룸 제7압연 라인의 고압 증기 밸브가 비명을 지르며 폭주하기 시작했다. 감독관은 생산 할당량이 밀린다며 라인 정지를 거부하고, 곁에서 일하던 앳된 동료가 톱니바퀴 쪽으로 미끄러지고 있다.",
    choices: [
      {
        label: "[민첩 판정] 감독관의 고함을 무시하고 몸을 날려 동료를 끌어낸 뒤 비상 감압 레버를 당긴다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "간발의 차로 동료를 구하고 압연기 폭발까지 막아 냈다! 하층 공단의 노동자들이 어린 그대를 믿음직한 일원으로 인정했다.",
          stats: { Ag: 6, Fel: 5, T: 3 }
        },
        fail: {
          text: "동료는 구했으나 뜨거운 증기에 팔을 데이고 할당량 미달로 감봉 처분을 받았다.",
          wounds: -14,
          stats: { T: 3, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 생산 라인을 멈추지 않은 채 보조 배기관을 열어 증기 압력만 교묘히 분산시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "인명 피해도, 할당량 차질도 없는 놀라운 기지였다! 지나가던 기계교 보좌관이 그대의 손재주를 눈여겨보았다.",
          stats: { Int: 7, Inf: 4, Ag: 3 }
        },
        fail: {
          text: "압력 계산이 어긋나 파편에 스쳤으나, 대형 폭발만은 피했다.",
          wounds: -12,
          stats: { Int: 3 }
        }
      },
      {
        label: "규정대로 안전선 밖으로 물러나 감독관의 지시를 따르며 살아남는 법을 배운다",
        effect: {
          text: "제국의 공장에서 감정은 사치다. 냉혹한 현실 속에서 묵묵히 하루를 버텨 냈다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Manufactorum / Imperium Maledictum"
  },
  {
    id: "ev_s4_youth_first_watch",
    title: "초년병 — 첫 야간 참호 보초와 안개 너머의 발소리",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["pdf_trooper", "astra_militarum"],
      excludeWorlds: ["krieg"],
      excludeTags: ["krieg_grenadier", "astartes", "custodes"]
    },
    reqLabel: "14~22세 · PDF / 아스트라 밀리타룸 신병",
    weight: 30,
    text: "군복의 풀기도 채 빠지지 않은 첫 야간 경계 근무다. 빗물이 철모 챙을 타고 흘러내리는 자정 무렵, 철조망 너머 짙은 안개 속에서 금속이 부딪히는 소리와 낮은 속삭임이 들려왔다. 고참들은 모두 벙커 안에서 곯아떨어진 상태다.",
    choices: [
      {
        label: "[의지 판정] 숨을 죽이고 암구호를 외치며 침착하게 조명탄을 쏘아 올려 정체를 확인한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "조명탄 아래 드러난 것은 적 정찰조였다! 그대의 침착한 초동 경보 덕분에 소대가 기습을 면하고 적을 섬멸했다.",
          stats: { WP: 6, BS: 5, Inf: 4 }
        },
        fail: {
          text: "야생 들개 무리에 조명탄을 쏘는 소동을 벌여 고참들에게 밤새 얼차려를 받았으나 경계심만큼은 몸에 배었다.",
          wounds: -8,
          stats: { T: 4, WP: 2 }
        }
      },
      {
        label: "[사격 판정] 어둠 속 수상한 그림자를 향해 먼저 경계 사격을 가해 소대를 깨운다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정확한 제압 사격이 침투하던 적 척후병의 다리를 꿰뚫었다! 중대장이 신병답지 않은 담력이라며 표창했다.",
          stats: { BS: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "빗나간 사격에 적의 반격탄이 참호 턱을 때려 파편상을 입었으나 본대는 깨워 냈다.",
          wounds: -14,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "섣불리 총을 쏘지 않고 벙커로 신속히 내려가 분대장을 깨워 정식 절차대로 대응한다",
        effect: {
          text: "오발 사고 없이 안전하게 경계 태세를 격상시켰다. 군대의 기본은 보고와 규율임을 깨달았다.",
          stats: { Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Infantryman's Uplifting Primer"
  },
  {
    id: "ev_s4_youth_scribe_error",
    title: "수습 서기 — 첫 양피지 장부 오기(誤記)와 행성 십일조 소동",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["administratum", "ecclesiarchy_priest"]
    },
    reqLabel: "14~22세 · 아드미니스트라툼 / 에클레시아키 초년기",
    weight: 30,
    text: "잉크 냄새가 코를 찌르는 수습 책상에서 밤샘 필사를 마친 아침, 그대는 어젯밤 발송 대기함에 넣은 행성 십일조·성당 봉헌 장부에 숫자 0 하나가 잘못 적힌 것을 발견했다. 이대로 아스트로패스 탑으로 넘어가면 한 개 구역이 굶어 죽거나 그대가 서비터로 개조될 판이다.",
    choices: [
      {
        label: "[민첩 판정] 발송 수레가 서고 정문을 나서기 전에 달려가 300쪽 장부를 밤새워 완벽히 재필사해 바꿔치기한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "손가락에 물집이 잡히도록 필사해 단 한 글자의 티도 없이 장부를 바로잡았다! 안도의 한숨과 함께 제국 행정의 무서움을 배웠다.",
          stats: { Ag: 5, Int: 5, WP: 4 }
        },
        fail: {
          text: "수레를 막아 세우다 상급 서기에게 들켜 혹독한 징계 기록을 남겼으나, 대형 참사만은 막았다.",
          stats: { Inf: -3, Int: 4 }
        }
      },
      {
        label: "[지성 판정] 정정 조서 양식 제44-베타호를 작성해 공식 절차로 오류를 자진 신고하고 즉시 수정 승인을 받는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "까다로운 정정 서식을 한 치의 오차도 없이 채워 올리자 상급 서기관이 '정직하고 유능한 인재'라며 도리어 신뢰를 보냈다!",
          stats: { Int: 7, Inf: 5, WP: 3 }
        },
        fail: {
          text: "정정 심사를 받느라 일주일간 무급 야근과 태형 징계를 받았으나, 목숨과 직책은 보전했다.",
          wounds: -10,
          stats: { WP: 4, Int: 3 }
        }
      },
      {
        label: "선배 서기에게 배급 쿠폰을 쥐여 주고 조용히 비공식 수정 인장을 받아 사건을 덮는다",
        effect: {
          text: "제국 관료제가 진짜로 굴러가는 방식을 첫해부터 뼈저리게 깨우쳤다.",
          stats: { Fel: 5, Inf: 3 },
          faith: -3
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Imperium Maledictum"
  },
  {
    id: "ev_s4_youth_noosphere_link",
    title: "기계교 수습기 — 첫 신경 접속과 사라져 가는 손끝의 온기",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["skitarii", "tech_priest"]
    },
    reqLabel: "14~22세 · 스키타리 / 테크프리스트 초년기",
    weight: 30,
    text: "마침내 첫 신경 데이터 단자를 목덜미에 연결하고 포지 성소의 노오스피어(Noosphere)에 접속하는 의식이 시작되었다. 수만 줄의 이진법 찬가와 열 센서 수치가 뇌 속으로 폭포처럼 쏟아지며, 어릴 적의 따뜻한 기억과 인간적 감각이 차가운 데이터 뒤로 밀려난다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 논리에 완전히 동조해 데이터 폭포를 완벽한 질서로 정리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "육신은 나약하나 강철은 영원하다! 감정의 잡음을 걷어 내고 포지 성소의 연산망과 완벽히 합일했다.",
          stats: { Int: 7, T: 4, WP: 4 }
        },
        fail: {
          text: "과부하로 신경망에 극심한 발열을 겪었으나, 접속 적응 자체에는 성공했다.",
          wounds: -12,
          stats: { Int: 4, T: 2 }
        }
      },
      {
        label: "[의지 판정] 이진법 데이터 흐름을 받아들이되 인간 시절의 직관과 호기심만은 별도 기억 구역에 지켜 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "기계적 정밀함과 필멸자의 직관을 함께 품는 데 성공했다! 훗날 독창적인 판단의 밑거름이 될 것이다.",
          stats: { WP: 7, Int: 5, Fel: 3 }
        },
        fail: {
          text: "두 감각이 충돌해 며칠간 이명과 환청에 시달렸으나 끝내 균형을 잡았다.",
          wounds: -10,
          stats: { WP: 4 }
        }
      },
      {
        label: "스승 테크프리스트가 지정한 표준 감쇠 필터를 켜 안전하고 점진적으로 적응한다",
        effect: {
          text: "교리의 정석을 따라 무리 없이 첫 접속 의식을 마쳤다. 이제 그대는 진정한 기계교의 일원이다.",
          stats: { Int: 4, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Noosphere / Adeptus Mechanicus"
  },
  {
    id: "ev_s4_youth_first_warp",
    title: "초년 항해 — 첫 워프 도약과 겔러 필드 너머의 두드림",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      excludeTags: ["astartes", "custodes", "grey_knight"],
      or: [
        { anyCareers: ["imperial_navy"] },
        { anyWorldTags: ["voidborn"] }
      ]
    },
    reqLabel: "14~22세 · 임페리얼 네이비 / 보이드본 초년기",
    weight: 30,
    text: "함선 전체에 붉은 도약 경보가 울리고, 강철 방화 셔터가 육중하게 닫혔다. 그대가 성인이 되어 처음으로 맞는 본격적인 워프 항해다. 겔러 필드의 낮은 웅웅거림 사이로, 선체 철판 바로 바깥에서 누군가 손톱으로 긁는 듯한 소름 돋는 환청이 하부 갑판을 훑고 지나간다.",
    choices: [
      {
        label: "[의지 판정] 공포에 질려 비명을 지르려는 신참 수병의 입을 막고 황제 찬송가를 함께 읊조린다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "패닉이 갑판 전체로 번지는 것을 막아 냈다! 갑판장이 신참답지 않은 배짱이라며 럼주 한 잔을 건넸다.",
          stats: { WP: 7, Fel: 5, Inf: 3 },
          faith: 5,
          corruption: -3
        },
        fail: {
          text: "워프 멀미와 악몽에 시달리며 구토를 쏟았으나, 무사히 실우주로 빠져나왔다.",
          wounds: -10,
          corruption: 4,
          stats: { WP: 3 }
        }
      },
      {
        label: "[강인 판정] 환청을 무시하고 맡은 증기 밸브와 포탑 고정 볼트만 악착같이 점검하며 정신을 붙든다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "몸을 움직여 일에 몰두하자 워프의 속삭임이 틈을 파고들지 못했다. 진정한 공허 항해사의 첫걸음이었다.",
          stats: { T: 6, Ag: 4, WP: 3 }
        },
        fail: {
          text: "흔들리는 선체에서 공구에 이마를 찧었으나 임무 위치는 끝까지 지켰다.",
          wounds: -10,
          stats: { T: 4 }
        }
      },
      {
        label: "고참 선원들의 충고대로 귀를 천으로 틀어막고 침상에 몸을 묶은 채 도약이 끝나기를 기다린다",
        effect: {
          text: "워프에서는 보지도 듣지도 않는 것이 상책이다. 무사히 첫 성간 항해를 마쳤다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Geller Field / Imperial Navy Lore"
  },
  {
    id: "ev_s4_youth_arbites_baton",
    title: "초임 집행관 — 첫 하층 구역 진압 명령과 굶주린 군중",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      excludeTags: ["astartes", "custodes", "grey_knight"],
      or: [
        { anyCareers: ["arbites", "commissar", "tempestus_scion", "adepta_sororitas"] },
        { allTags: ["schola"] }
      ]
    },
    reqLabel: "14~22세 · 아르비테스 / 커미사르 / 사이온 / 소로리타스 / 스콜라 출신",
    weight: 30,
    text: "스콜라 프로제니움이나 훈련소의 교본을 막 덮고 처음 투입된 현장. 배급 지연에 격분한 하층 구역 주민들이 곡물 창고 철문을 두드리고 있다. 상관은 주동자를 즉결 처분해 본보기를 보이라고 명하지만, 군중 맨 앞에는 여윈 아이들과 노인들이 떠밀려 서 있다.",
    choices: [
      {
        label: "[교섭 판정] 확성기로 제국법의 엄중함과 배급 재개 시한을 단호히 선포해 유혈 사태 없이 군중을 해산시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "단 한 발의 실탄도 쓰지 않고 폭동 직전의 광장을 진정시켰다! 냉철한 위엄과 통솔력을 동시에 증명했다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "군중 속에서 날아온 돌멩이에 맞고 결국 충격봉 진압으로 이어졌으나, 대규모 사상자만은 막았다.",
          wounds: -12,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 군중 뒤편에서 쇠파이프를 나눠 주던 실제 선동 갱단원만 정밀 제압해 끌어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "민간인을 다치게 하지 않고 진짜 배후만 일격에 꺾어 버렸다! 상관이 탁월한 현장 판단력이라며 칭찬했다.",
          stats: { WS: 6, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "난전 속에 멍과 찰과상을 입었으나, 선동 주동자 체포에는 성공했다.",
          wounds: -14,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "명령에 따라 방패 벽을 전진시켜 법과 질서의 냉혹한 무게를 집행한다",
        effect: {
          text: "동정심은 반란의 씨앗이 될 뿐이다. 교본 그대로 임무를 완수하며 제국 집행관의 강철 심장을 굳혔다.",
          stats: { WP: 6, Inf: 4 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites / Schola Progenium"
  },
  {
    id: "ev_s4_youth_spire_debut",
    title: "상류층 데뷔 — 첫 첨탑 사교 연회와 독이 든 칭찬",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyTags: ["noble", "terra_elite", "rogue_trader_blood", "navigator"],
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "14~22세 · 귀족 / 상류층 / 로그 트레이더 / 항해사 혈통",
    weight: 30,
    text: "가문의 문장을 달고 처음으로 참석한 상층 첨탑의 성인 데뷔 만찬이다. 샹들리에 불빛 아래 경쟁 가문의 노련한 백작이 다가와 감미로운 칭찬을 건네더니, 그대의 가문이 맡은 성간 운송권의 비밀 계약 조건을 슬쩍 떠보기 시작했다.",
    choices: [
      {
        label: "[교섭 판정] 우아한 미소로 화제를 돌려 도리어 경쟁 가문의 최근 적자 소문을 재치 있게 찔러 넣는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "주변 귀족들의 낮고 감탄 섞인 웃음이 터져 나왔다! 백작이 체면을 구긴 채 물러나며, 그대의 이름이 사교계에 단숨에 각인되었다.",
          stats: { Fel: 7, Inf: 7, Int: 3 }
        },
        fail: {
          text: "미묘한 말실수를 백작에게 잡혀 가문 원로들에게 따가운 질책을 들었다.",
          stats: { Inf: -3, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 일부러 엉뚱한 가짜 운송 일정을 흘려 상대 가문이 헛다리를 짚도록 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "한 달 뒤 경쟁 가문이 텅 빈 화물 항로에 투자해 큰 손실을 입었다! 가주께서 그대의 냉철한 계략을 극찬했다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "거짓 정보가 간파되어 백작의 경계심을 샀으나, 실제 기밀은 지켜 냈다.",
          stats: { Int: 4 }
        }
      },
      {
        label: "아직 가문의 실무에는 어둡다며 겸손히 잔만 비우고 가주 곁으로 물러난다",
        effect: {
          text: "어설프게 끼어들지 않은 신중함이 가문의 비밀을 지켰다. 상류층의 생존술을 눈으로 익혔다.",
          stats: { WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Nobility / Dark Heresy"
  },

  // -------------------------------------------------------------------------
  // 4. 무명 행성 6종 생활밀착 분기 사건 (6종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s4_world_agri_tithe",
    title: "농업 행성 — 흉작의 해, 십일조 징발선과 종자 창고",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["agri"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "행성 유형: 농업 행성 (Agri-World)",
    weight: 30,
    text: "이상 저온과 곰팡이 병해로 올해 수확량이 절반 이하로 꺾였건만, 궤도에 도착한 아드미니스트라툼 십일조 징발선은 단 1톤의 감면도 허락하지 않았다. 내년에 심을 종자 곡물까지 털어 넣지 않으면 행성 총독이 반역죄로 처형될 위기다.",
    choices: [
      {
        label: "[교섭 판정] 징발선 행정관에게 내년 전멸 시 제국 전체가 입을 손실을 설득해 분할 납부 유예를 얻어 낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "냉혹한 징발관이 통계표를 훑어본 뒤 이례적으로 종자 창고 봉인을 허락했다! 수백만 농민의 내년 목숨을 살렸다.",
          stats: { Fel: 7, Inf: 7, Int: 3 }
        },
        fail: {
          text: "오만한 불경으로 몰려 채찍질 징계를 받았으나, 최소한의 종자 자루만은 몰래 숨겨 두었다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 병해가 덜한 외곽 습지대의 야생 곡물과 영양 조류를 긴급 가공해 부족분을 채워 넣는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "맛은 끔찍했으나 칼로리 기준치를 정확히 통과했다! 종자 창고도 지키고 제국 십일조도 완납하는 기지를 발휘했다.",
          stats: { Int: 7, T: 4, Inf: 5 }
        },
        fail: {
          text: "품질 검사에 걸려 추가 노역을 떠안았으나, 반역 혐의만은 피했다.",
          wounds: -10,
          stats: { T: 4 }
        }
      },
      {
        label: "제국의 법에 따라 종자 창고까지 열어 바치고, 배고픈 겨울을 견딜 채비를 한다",
        effect: {
          text: "인류제국에서 행성 하나의 기아보다 무서운 것은 십일조 미납이다. 굶주림 속에서 끈질기게 버텨 냈다.",
          stats: { T: 5, WP: 5 },
          wounds: -8
        }
      }
    ],
    source: "Lexicanum: Agri-World / Lords of Silence"
  },
  {
    id: "ev_s4_world_paradise_hunt",
    title: "낙원 행성 — 대리석 휴양지 너머의 은밀한 사냥터",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["paradise"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "행성 유형: 낙원 행성 (Paradise World)",
    weight: 30,
    text: "에메랄드빛 해변과 대리석 궁전으로 유명한 이 낙원 행성에도 추악한 이면이 있다. 휴양 온 타 성계 고위 귀족들이 빚을 못 갚은 하인들을 외딴 섬 숲에 풀어놓고 사냥 놀이를 벌인다는 소문이 사실로 확인되었다. 오늘 밤 숲 가장자리에서 피투성이가 된 도망자가 그대의 발치에 쓰러졌다.",
    choices: [
      {
        label: "[민첩 판정] 사냥개와 귀족 경호대의 눈을 피해 도망자를 화물 부두 밀항선까지 안전하게 빼돌린다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "사냥꾼들이 빈 숲을 헤매는 사이 도망자를 살려 보냈다. 낙원의 가면 뒤에 숨은 양심만큼은 지켜 냈다.",
          stats: { Ag: 7, WP: 5, Fel: 4 }
        },
        fail: {
          text: "경호대와 마주쳐 총격을 피해 달아나느라 부상을 입었으나, 도망자는 바다로 빠져나갔다.",
          wounds: -15,
          stats: { Ag: 4 }
        }
      },
      {
        label: "[지성 판정] 사냥 놀이 현장에서 타락한 쾌락의 흔적을 기록해 국교 감찰관과 아르비테스에 익명 고발한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "슬라네쉬 이단 혐의가 걸려들자 감찰반이 즉각 궁전을 덮쳤다! 퇴폐한 귀족 일당이 숙청되고 그대는 은밀한 포상을 받았다.",
          stats: { Int: 7, Inf: 6, WP: 4 },
          faith: 6
        },
        fail: {
          text: "귀족들의 뇌물로 수사가 흐지부지되며 한동안 감시의 눈초리를 피해야 했다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "보지 못한 일로 치고 도망자에게 응급 붕대만 건넨 채 조용히 자리를 떠난다",
        effect: {
          text: "낙원 행성에서 권력자의 취미를 건드리면 소리 소문 없이 사라진다. 씁쓸함을 삼키고 생업으로 돌아갔다.",
          stats: { WP: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Paradise World / Dark Heresy"
  },
  {
    id: "ev_s4_world_feral_skyiron",
    title: "야만 행성 — 하늘에서 떨어진 쇠붙이와 부족 장로들의 금기",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 14,
      anyWorldTags: ["feral"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "행성 유형: 야만 행성 (Feral World)",
    weight: 30,
    text: "밤하늘을 가르는 불기둥과 함께 성간 함선의 탈출 포드 하나가 부족의 성산(聖山) 중턱에 추락했다. 장로들은 '하늘 신의 분노'라며 접근을 금지하지만, 부서진 금속 껍질 안쪽에서는 아직도 푸른 불빛과 낯선 기계음이 새어 나오고 있다.",
    choices: [
      {
        label: "[강인 판정] 야수들이 몰려드는 험준한 절벽을 타고 올라 포드 안의 생존 물자와 강철 칼날을 회수한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "절대 녹슬지 않는 하늘의 강철 단검과 의약품을 손에 넣었다! 부족 전사들이 그대를 하늘의 선택을 받은 용사로 우러렀다.",
          stats: { T: 6, WS: 6, Inf: 5 }
        },
        fail: {
          text: "포드에서 새어 나온 뜨거운 냉각수에 화상을 입었으나, 단단한 금속 파편 몇 개는 챙겨 내려왔다.",
          wounds: -14,
          stats: { T: 4, WS: 3 }
        }
      },
      {
        label: "[지성 판정] 반짝이는 구조 신호 장치의 구조를 찬찬히 관찰해 하늘에서 내려온 제국 회수반과 접촉한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "며칠 뒤 강하선에서 내린 제국 요원들이 포드를 온전히 지킨 그대의 기지를 높이 사 귀한 보급품과 바깥 세상의 지식을 건넸다!",
          stats: { Int: 7, Fel: 5, Inf: 6 }
        },
        fail: {
          text: "신호 장치를 잘못 건드려 경보음이 울리는 바람에 부족의 원성을 샀으나, 다행히 큰 화는 면했다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "장로들의 금기를 존중해 성산 둘레에 경계 표시를 세우고 부족의 평온을 지킨다",
        effect: {
          text: "알 수 없는 하늘의 물건은 재앙을 부르기도 한다. 부족 원로들의 신임이 두터워졌다.",
          stats: { WP: 5, Fel: 4 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Feral World / Warhammer 40k Core Rulebook"
  },
  {
    id: "ev_s4_world_hive_water",
    title: "하이브 월드 — 중층 정수관 파열과 하층 구역의 물 전쟁",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["hive"],
      excludeWorlds: ["terra", "krieg"],
      excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor", "archmagos"]
    },
    reqLabel: "행성 유형: 하이브 월드 (일반·하층 시민)",
    weight: 28,
    text: "거대 하이브 중층부를 관통하는 주 재활용 정수관이 부식되어 터지면서 하층 세 개 구역의 식수 배급이 사흘째 끊겼다. 길드 용병대가 남은 물탱크를 독점하고 값을 열 배로 올려 받자, 목마른 주민들이 쇠막대기를 들고 몰려들기 시작했다.",
    choices: [
      {
        label: "[지성 판정] 버려진 구세대 냉각수 우회 배관을 찾아내어 직접 용접해 임시 식수 공급을 복구한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "녹슨 배관에서 다시 맑은 물이 쏟아지자 구역 전체가 환호했다! 길드도 그대의 실력을 인정해 정비 감독직을 제안했다.",
          stats: { Int: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "배관 압력에 밀려 타박상을 입었으나, 급한 대로 식수 누수만은 막아 냈다.",
          wounds: -12,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[교섭 판정] 길드 우두머리와 주민 대표 사이에 서서 폭동으로 탱크가 부서지기 전에 적정 가격 협상을 타결한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "피를 흘리지 않고 배급이 재개되었다! 하이브 하층에서 그대의 중재력이 입소문을 타기 시작했다.",
          stats: { Fel: 7, Inf: 6, WP: 3 }
        },
        fail: {
          text: "양쪽 모두에게 욕을 먹으며 협상이 결렬되어 겨우 몸만 빠져나왔다.",
          wounds: -10,
          stats: { Fel: 2 }
        }
      },
      {
        label: "소동에 휘말리지 않고 미리 모아 둔 비상 식수를 아껴 마시며 수리반이 오기를 버틴다",
        effect: {
          text: "하이브에서는 남의 싸움에 끼어들지 않는 자가 오래 산다. 갈증을 견디며 위기를 넘겼다.",
          stats: { T: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Necromunda & Dark Heresy Lore"
  },
  {
    id: "ev_s4_world_civilised_census",
    title: "문명 행성 — 백 년 만에 찾아온 제국 인구조사관과 징집 추첨",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["civilised"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "행성 유형: 문명 행성 (Civilised World)",
    weight: 28,
    text: "그나마 평온하던 문명 행성의 시청 광장에 백 년 만에 아드미니스트라툼 인구조사단이 도착했다. 성계 밖 전쟁으로 병력이 부족해지자, 올해 아스트라 밀리타룸 징집 할당량을 평소보다 세 배 늘려 무작위 추첨을 실시하겠다는 포고령이 떨어졌다.",
    choices: [
      {
        label: "[교섭 판정] 구역 장인들과 기술 인력의 필수 잔류 청원서를 취합해 조사관과 현실적인 대체 징집안을 타협한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행성 산업이 마비되는 것을 막으면서도 징집 할당량을 채우는 타협안이 통과되었다! 시민들의 감사와 관청의 신임을 동시에 얻었다.",
          stats: { Fel: 7, Inf: 6, Int: 4 }
        },
        fail: {
          text: "징집 방해 혐의로 경고를 받아 한동안 시청 근처에도 얼씬하지 못했다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 황제의 부름을 피하지 않겠다며 군사 물자 모금과 신병 훈련 지원을 앞장서 조직한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "침울하던 광장에 자부심이 되살아났다! 제국 조사관이 그대의 애국심을 높게 평가해 표창장을 내렸다.",
          stats: { WP: 6, Fel: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "징집을 두려워하는 가족들의 차가운 시선 속에 힘든 나날을 보냈으나, 임무만은 마쳤다.",
          stats: { WP: 4, Fel: -2 }
        }
      },
      {
        label: "추첨 명단에 내 이름이 뜨지 않기를 조용히 빌며 묵묵히 생업을 이어 간다",
        effect: {
          text: "운 좋게 이번 추첨은 비껴갔다. 평범한 일상이 얼마나 귀한지 다시금 깨달았다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Civilised World / Imperial Tithe"
  },
  {
    id: "ev_s4_world_voidborn_air",
    title: "보이드본 — 세대 간 선체 격벽 분쟁과 산소 정화기 수리",
    category: "행성 일상 분기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["voidborn"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "출신/거주: 보이드본 (성간 함선 사회)",
    weight: 30,
    text: "수백 년째 항해 중인 거대 성간 함선의 하부 거주 구역. 7번 갑판과 8번 갑판 씨족이 낡은 산소 정화기 배당량을 놓고 쇠사슬과 리벳 건을 든 채 대치하고 있다. 이대로 격벽 안쪽에서 싸움이 벌어지면 두 구역 모두 공기 순환이 끊겨 질식할 위기다.",
    choices: [
      {
        label: "[지성 판정] 선체 설계도 조각을 꿰맞춰 막혀 있던 6번 보조 정화 덕트를 뚫어 양쪽 모두의 산소량을 늘린다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시원한 재생 공기가 양 갑판으로 쏟아져 들어오자 씨족 장로들이 무기를 내려놓았다! 함선의 숨결을 되살린 은인으로 추앙받았다.",
          stats: { Int: 7, Inf: 6, Ag: 3 }
        },
        fail: {
          text: "좁은 환기 덕트 안에서 산소 부족으로 쓰러질 뻔했으나, 겨우 막힌 필터만은 떼어 냈다.",
          wounds: -12,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[교섭 판정] 함선 공용 규약을 들어 '격벽에 구멍이 나면 모두가 공허에 삼켜진다'고 양 씨족을 설득한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "보이드본이라면 누구나 두려워하는 진공의 공포가 분노를 잠재웠다! 양 갑판이 교대 정비 협정을 맺었다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "양측의 욕설과 몸싸움에 휘말려 멍이 들었으나, 보안대가 오기 전 총격전만은 막았다.",
          wounds: -12,
          stats: { Fel: 3 }
        }
      },
      {
        label: "자신의 거주 구역 기밀 격벽만 단단히 잠그고 함선 보안대의 진압을 기다린다",
        effect: {
          text: "우주선에서 가장 먼저 배워야 할 것은 언제 격벽을 닫아야 하는가이다. 무사히 소동을 넘겼다.",
          stats: { WP: 4, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Voidborn / Rogue Trader Core Rulebook"
  },

  // -------------------------------------------------------------------------
  // 5. 얇은 핵심 직군 보강 분기 사건 (4종: 가드맨 · 스키타리 · 테크프리스트 · 아스타르테스)
  // -------------------------------------------------------------------------
  {
    id: "ev_s4_career_guard_ration",
    title: "아스트라 밀리타룸 — 빗물 고인 참호의 보급 오발송",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 16,
      anyCareers: ["astra_militarum"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 30,
    text: "진흙탕 참호에서 사흘째 비를 맞고 있던 중대에 드디어 제국 병참 보급 상자가 투하되었다. 그러나 뚜껑을 열어 보니 라스건 동력팩과 전투 식량 대신, 어째서인지 사막 행성용 방열 망토와 타 연대용 탄약이 가득 들어 있다. 행정 착오다.",
    choices: [
      {
        label: "[교섭 판정] 옆 참호에 주둔 중인 타 연대 보급 하사관을 찾아가 기막힌 물물교환 거래를 성사시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "방열 망토를 따끈한 리카프(Recaf) 커피와 동력팩, 여분 양말로 바꿔 왔다! 분대원들이 그대를 최고의 보급 천재라 환호했다.",
          stats: { Fel: 7, Int: 4, Inf: 4 }
        },
        fail: {
          text: "거래 도중 군기 담당 상사에게 들켜 훈계를 들었으나, 식량 몇 상자는 챙겨 돌아왔다.",
          stats: { Fel: 3, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 방열 망토를 참호 방수 천막으로 개조하고 남은 동력팩을 화톳불에 충전해 밤을 넘긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "교본엔 없지만 전장에서는 통하는 야전 지혜! 부대 전체가 감기와 동상을 피하고 다음 날 전투에 완벽히 대비했다.",
          stats: { Int: 6, T: 5, BS: 3 }
        },
        fail: {
          text: "동력팩 하나가 과열되어 터지는 바람에 손등을 데었으나, 천막은 제법 쓸 만했다.",
          wounds: -10,
          stats: { Int: 3, T: 3 }
        }
      },
      {
        label: "불평하지 않고 병참 오발송 보고서를 써 올린 뒤 있는 탄약만으로 경계 근무를 선다",
        effect: {
          text: "아스트라 밀리타룸의 병사는 보급이 오지 않아도 싸우는 법을 안다. 인내심이 한층 깊어졌다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Departmento Munitorum / Astra Militarum Lore"
  },
  {
    id: "ev_s4_career_skitarii_override",
    title: "스키타리 — 마고스의 원격 통제 명령과 전장의 돌발 변수",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 16,
      anyCareers: ["skitarii"]
    },
    reqLabel: "직군: 스키타리",
    weight: 32,
    text: "궤도 함선에 탑승한 마고스가 노오스피어 원격 명령으로 분대 전체의 시야와 조준을 직접 통제하며 전진을 명했다. 그러나 그대의 광학 센서는 지면 아래 숨겨진 적의 대전차 지뢰밭을 0.2초 먼저 포착했다. 마고스의 계산에는 지뢰 변수가 빠져 있다.",
    choices: [
      {
        label: "[지성 판정] 0.1초 만에 지뢰 좌표 패킷을 최우선 우선순위로 역송신해 마고스의 진격 알고리즘을 갱신시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "마고스의 전술 연산이 즉각 우회 기동으로 전환되어 분대 전멸을 면했다! 그대의 전장 연산 가중치가 상향 조정되었다.",
          stats: { Int: 7, BS: 5, Inf: 5 }
        },
        fail: {
          text: "신호 지연으로 선두 지뢰 하나가 터져 파편을 맞았으나, 후속 분대는 지뢰밭을 피해 냈다.",
          wounds: -16,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[사격 판정] 원격 통제 틈새에 갈바닉 라이플로 지뢰 신관을 원거리 저격해 통로를 강제로 연다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "연쇄 폭발이 지뢰밭과 적 매복조를 함께 날려 버렸다! 마고스가 이진법 칭찬 코드를 송출했다.",
          stats: { BS: 8, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "폭풍에 휩쓸려 의체 외갑이 손상되었으나, 진격로는 완벽히 열렸다.",
          wounds: -15,
          stats: { BS: 4, T: 4 }
        }
      },
      {
        label: "자율 판단을 억제하고 마고스의 절대 명령에 순응해 강철 다리로 정면 돌파를 수행한다",
        effect: {
          text: "피와 강철의 손실이 있었으나 마고스의 연산대로 거점은 확보되었다. 스키타리의 순종이 증명되었다.",
          stats: { T: 5, WP: 5 },
          wounds: -12
        }
      }
    ],
    source: "Lexicanum: Skitarii / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s4_career_techpriest_relic",
    title: "테크프리스트 — 500년째 잠든 고대 발전기의 기계령 진정 의례",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 18,
      anyCareers: ["tech_priest"]
    },
    reqLabel: "직군: 테크프리스트",
    weight: 32,
    text: "행성 방어막에 전력을 공급하던 500년 된 플라스마 발전기가 불길한 붉은 경고등을 뿜으며 출력이 곤두박질치고 있다. 보좌 도제들은 기계령이 분노했다며 대피를 외치지만, 발전기가 멈추면 궤도 폭격에 도시 전체가 노출된다.",
    choices: [
      {
        label: "[지성 판정] 고대 정비 성가의 순서에 숨겨진 냉각 밸브 조절 절차를 해독해 기계령을 진정시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "향로 연기와 성유가 감싸는 가운데 발전기의 웅장한 박동이 되살아났다! 포지 대사제가 그대의 지식을 높이 치하했다.",
          stats: { Int: 8, Inf: 6, WP: 4 }
        },
        fail: {
          text: "플라스마 역류에 망토와 의체가 그을렸으나, 비상 출력만큼은 되살려 냈다.",
          wounds: -15,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[강인 판정] 방사능 경보 구역 안으로 직접 들어가 메카덴드라이트로 과열된 제어봉을 수동 고정한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "고열과 방사능을 의체 내구력으로 버텨 내며 붕괴 직전의 노심을 안정시켰다! 기계교의 진정한 헌신이었다.",
          stats: { T: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "방사능 피폭으로 생체 장기 일부를 교체해야 했으나, 방어막은 꺼지지 않았다.",
          wounds: -18,
          stats: { T: 5 }
        }
      },
      {
        label: "비상 예비 발전기로 전력을 단계 이관한 뒤 안전 규정에 따라 주 노심을 서서히 식힌다",
        effect: {
          text: "방어막 출력은 일시적으로 낮아졌으나, 귀중한 고대 유물 발전기의 영구 파손을 막았다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Tech-Priest / Machine Spirit Lore"
  },
  {
    id: "ev_s4_career_astartes_drop",
    title: "아스타르테스 — 궤도 강하 포드 피격과 필멸자 연대의 구원 요청",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 18,
      anyCareers: ["astartes_scout", "astartes_brother"]
    },
    reqLabel: "직군: 아스타르테스 (스카우트 / 배틀 브라더)",
    weight: 32,
    text: "대기권을 찢고 강하하던 드롭 포드가 적 대공 포화에 스쳐 예정 지점에서 3킬로미터 벗어난 폐허에 꽂혔다. 본대 집결지까지는 서둘러 합류해야 하지만, 복스 통신망으로 고립된 아스트라 밀리타룸 야전 병원 부대의 절박한 구원 요청이 들어온다.",
    choices: [
      {
        label: "[백병 판정] 본대 합류에 앞서 야전 병원을 포위한 적 돌격대를 3분 만에 분쇄하고 필멸자들을 구출한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "하늘에서 강림한 죽음의 천사를 보며 필멸자 병사들이 눈물을 흘렸다! 적을 섬멸한 뒤에도 제시간에 본대 작전에 합류했다.",
          stats: { WS: 7, Ag: 4, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "적 중화기 매복에 갑주가 크게 훼손되었으나, 끝내 야전 병원을 지켜 내고 본대와 합류했다.",
          wounds: -18,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[사격 판정] 고지대를 점령해 정확한 볼터 엄호 사격으로 적의 포위망을 분산시키며 야전 병원의 퇴로를 연다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "단 한 발의 탄환도 낭비하지 않는 초인적 사격이 적 지휘관들을 제거했다! 야전 병원이 무사히 아군 전선으로 철수했다.",
          stats: { BS: 7, Int: 4, Inf: 5 }
        },
        fail: {
          text: "탄약을 거의 소진하고 파편상을 입었으나, 퇴로 확보 임무는 완수했다.",
          wounds: -14,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "임무 우선순위에 따라 야전 병원 좌표를 궤도 포격망에 넘기고 즉시 본대 집결지로 강행군한다",
        effect: {
          text: "전략 목표의 달성이 수백만 인명을 구하는 길이다. 아스타르테스다운 냉철한 규율로 작전을 완수했다.",
          stats: { WP: 5, Int: 5, Ag: 3 }
        }
      }
    ],
    source: "Lexicanum: Drop Pod / Codex: Space Marines"
  },

  // =========================================================================
  // 5단계 (2차 서사 보강 2단계) — 가족·후계자 연작 · 삶의 초점 2막 · 외계/배신자 균형 (22종)
  // =========================================================================

  // -------------------------------------------------------------------------
  // 5-1. 필멸자 가족 · 혼인 · 자녀(후계자) 연작 아크 (4종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s5_bond_family_meet",
    title: "이름 없는 인연 — 등화관제 아래 맺은 평범한 혼약과 가정",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 20,
      maxAge: 45,
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["krieg"],
      excludeTags: [
        "bond_family",
        "astartes",
        "custodes",
        "grey_knight",
        "dreadnought",
        "sororitas",
        "canoness",
        "mechanicus",
        "krieg_grenadier"
      ]
    },
    reqLabel: "20~45세 필멸자 (초인·수도회·기계교·크리그 제외)",
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
      excludeTags: ["bond_heir", "astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "이력: 가정과 배우자",
    weight: 34,
    text: "어둠뿐인 줄 알았던 그대의 삶에 새 생명의 울음소리가 찾아왔다. 어느덧 걸음마를 떼고 글자를 배우기 시작한 자녀를 바라보며, 배우자와 그대는 이 아이를 어떤 길로 키울지 밤새 고민에 잠긴다.",
    choices: [
      {
        label: "[권위 판정] 인맥과 저축을 총동원해 스콜라 프로제니움이나 상급 관청 장학생 추천을 받아 낸다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "치열한 경쟁을 뚫고 아이가 제국 정예 교육 과정에 입학했다! 부모의 희생이 아이에게 더 높은 하늘을 열어 주었다.",
          stats: { Inf: 6, WP: 5, Fel: 4 },
          faith: 5,
          addTags: ["bond_heir"]
        },
        fail: {
          text: "문턱 높은 추천 심사는 통과하지 못했으나, 아이에게 제국 법전과 교양을 손수 가르치며 단단히 키워 냈다.",
          stats: { Int: 4, WP: 4 },
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
          text: "고된 일상 속에 가르칠 시간이 빠듯했으나, 아이는 부모의 성실한 등 뒤를 보며 바르게 자랐다.",
          stats: { T: 4, WP: 4 },
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
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "34세 이상 · 가정과 배우자",
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
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "44세 이상 · 후계자·자녀",
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
          text: "세대 간의 생각 차이에 잠시 언성이 높아졌으나, 떠나기 직전 말없는 포옹으로 서로를 이해했다.",
          stats: { Fel: 3, WP: 4 }
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
          text: "자녀는 자신만의 방식으로 부딪혀 보겠다며 웃었지만, 비망록 몇 장만은 소중히 챙겨 떠났다.",
          stats: { Int: 3, WP: 4 }
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
  },

  // -------------------------------------------------------------------------
  // 5-2. 삶의 초점(anyFocus) 2막 심화 분기 사건 (6종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s5_focus_survival_2",
    title: "생존과 보양 2막 — 역병 봉쇄 구역의 비밀 약재와 생존자의 윤리",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 32, anyFocus: ["survival"] },
    reqLabel: "32세 이상 · 삶의 초점: 생존과 보양",
    weight: 28,
    text: "오랜 세월 몸을 돌보고 비상약을 비축해 온 덕분에, 원인을 알 수 없는 폐열병이 구역을 덮쳤을 때도 그대는 멀쩡히 버텨 냈다. 그런데 그대가 소중히 아껴 둔 항생제와 정화 필터가 남아 있다는 소문이 새어 나가며, 병든 이웃과 무장한 봉쇄 경비대가 동시에 문을 두드린다.",
    choices: [
      {
        label: "[지성 판정] 비축 약재의 성분을 정밀 희석하고 대체 약초를 배합해 여러 사람을 살릴 응급 처방약을 제조한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "약효를 유지하면서 분량을 세 배로 늘려 구역의 치사율을 급감시켰다! 생존의 지혜가 공동체 전체를 구했다.",
          stats: { Int: 7, T: 5, Inf: 6 }
        },
        fail: {
          text: "배합 도중 병균에 노출되어 고열을 앓았으나, 끝내 회복하며 강한 면역력을 얻었다.",
          wounds: -14,
          stats: { T: 5 }
        }
      },
      {
        label: "[강인 판정] 경비대의 압수 시도를 단호히 막아 서고 필수 생존 물자만큼은 끝까지 사수한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "건강한 체력과 단호한 기세에 경비대가 물러났다. 그대의 철저한 준비성이 다시 한번 목숨을 지켰다.",
          stats: { T: 7, WP: 5 },
          wounds: 8
        },
        fail: {
          text: "실랑이 끝에 상처를 입고 물자 절반을 빼앗겼으나 남은 약재로 가까스로 버텼다.",
          wounds: -14,
          stats: { T: 3 }
        }
      },
      {
        label: "자신이 쓸 최소분만 남기고 나머지 약재를 의무대에 조용히 기증한 뒤 문을 걸어 잠근다",
        effect: {
          text: "살아남는 것과 인간다움을 지키는 것 사이에서 차분히 균형을 잡았다.",
          stats: { T: 4, WP: 5, Fel: 3 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Medicae / Imperium Maledictum"
  },
  {
    id: "ev_s5_focus_combat_2",
    title: "무예와 전투 2막 — 고참 무인의 낡은 관절과 젊은 도전자의 결투",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 32, anyFocus: ["combat"] },
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
          text: "아슬아슬한 점수 차로 패배를 맛보았으나, 그 자극이 새로운 훈련 의욕을 불태웠다.",
          stats: { BS: 4, WP: 4 }
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
    source: "Lexicanum: Duel / Imperial Martial Traditions"
  },
  {
    id: "ev_s5_focus_faith_2",
    title: "황제 신앙 2막 — 기적을 사칭하는 떠돌이 설교자와 군중의 광신",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["faith"],
      excludeTags: ["heretic", "chaos_aligned"]
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
          corruption: -8
        },
        fail: {
          text: "흥분한 광신도들에게 돌팔매를 맞아 다쳤으나, 소동을 보고 출동한 국교 경비대가 사기꾼을 체포했다.",
          wounds: -15,
          faith: 5,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 섣불리 군중을 자극하지 않고 설교자의 배후 조직과 자금 흐름을 추적해 심문소에 넘긴다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단순 사기꾼이 아니라 지하 이단 교단의 모집책이었음이 밝혀졌다! 이단심문소가 그대의 신중한 공적을 치하했다.",
          stats: { Int: 7, Inf: 6 },
          faith: 6,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "추적 도중 설교자가 눈치를 채고 도주했으나, 광장의 거짓 집회는 해산되었다.",
          stats: { Int: 3, WP: 4 }
        }
      },
      {
        label: "소란스러운 광장을 피해 고요한 예배당으로 돌아와 자신의 신앙이 교만에 빠지지 않도록 성찰한다",
        effect: {
          text: "남의 거짓을 꾸짖기 전에 스스로의 영혼을 먼저 닦는 것이 참된 경건이다.",
          stats: { WP: 5 },
          faith: 8,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Imperial Cult / Ecclesiarchy Lore"
  },
  {
    id: "ev_s5_focus_lore_2",
    title: "학문과 기계 교리 2막 — 봉인된 암흑기 데이터 코어와 이단의 경계",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 32, anyFocus: ["lore"] },
    reqLabel: "32세 이상 · 삶의 초점: 학문과 기계 교리",
    weight: 28,
    text: "오랜 학문 탐구 끝에 고서고 지하에서 기술 암흑기(Dark Age of Technology) 시절의 암호화된 데이터 코어 조각을 발견했다. 해독에 성공하면 행성의 동력 효율을 획기적으로 끌어올릴 수 있지만, 내부에 금지된 '혐오스러운 지성(Abominable Intelligence)' 잔재가 남아 있을 위험도 도사리고 있다.",
    choices: [
      {
        label: "[지성 판정] 격리된 코지테이터 회로에서 위험한 자율 논리 구역만 완벽히 절단하고 순수 공학 설계도만 추출한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "기계교의 금기를 건드리지 않고도 경이로운 암흑기 열교환 설계도를 복원했다! 학계와 포지 사원 전체가 그대의 이름을 칭송했다.",
          stats: { Int: 9, Inf: 7, WP: 4 }
        },
        fail: {
          text: "해독 도중 불경한 기계 음성이 흘러나와 긴급 소각해야 했고, 기술 이단 의심 기록이 남았다.",
          stats: { Int: 4, Inf: -3 },
          corruption: 5,
          addTags: ["tech_heresy"]
        }
      },
      {
        label: "[의지 판정] 지식의 유혹을 누르고 코어를 그대로 봉인해 화성 기계교 상위 사제단에 정식 인계한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "금단의 유혹을 이겨 낸 정통 학자의 절제에 기계교가 깊은 경의를 표하며 귀한 학술 열람권을 내렸다.",
          stats: { WP: 7, Int: 4, Inf: 6 },
          faith: 5
        },
        fail: {
          text: "인계 과정에서 공적을 상급자에게 가로채였으나, 적어도 이단 혐의만은 깨끗이 피했다.",
          stats: { WP: 4 }
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
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "32세 이상 · 삶의 초점: 인맥과 출세 도모",
    weight: 28,
    text: "수년간 정교하게 구축해 온 인맥망이 마침내 행성 권력의 심장부까지 닿았다. 그러나 어둠 속으로 올라갈수록 칼날도 가까워진다. 유력 길드 연합의 대표가 그대에게 비밀 회동을 청하더니, 무능한 총독 대행을 '병사(病死)'로 처리하는 계획에 동참하면 핵심 요직을 넘기겠다고 속삭였다.",
    choices: [
      {
        label: "[교섭 판정] 암살 대신 총독 대행의 비리를 합법적으로 폭로해 탄핵시키는 정치적 무혈 쿠데타로 판을 뒤집는다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "피 한 방울 묻히지 않고 양측 파벌을 모두 그대의 손바닥 위에 올려놓았다! 행성 의회가 그대를 새 실권자로 추대했다.",
          stats: { Fel: 8, Inf: 9, Int: 4 }
        },
        fail: {
          text: "양쪽 파벌 모두에게 배신자로 찍혀 자객의 습격을 가까스로 피하며 입지가 크게 흔들렸다.",
          wounds: -16,
          stats: { Inf: -5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 밀서의 사본을 챙겨 총독 대행과 아르비테스 사령관에게 역고발해 반역 파벌을 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "반역 음모가 하루아침에 분쇄되었다! 총독 대행이 목숨을 구해 준 은인으로 그대에게 막대한 권한과 포상을 내렸다.",
          stats: { Int: 7, Inf: 8, WP: 4 }
        },
        fail: {
          text: "증거가 불충분하다는 역공을 받아 한동안 정계 변방으로 밀려나야 했다.",
          stats: { Inf: -4, Int: 3 }
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
    source: "Lexicanum: Planetary Governor / Imperial Politics"
  },
  {
    id: "ev_s5_focus_forbidden_2",
    title: "금단의 지식 2막 — 이단심문소 내사관의 불시 수색과 숨겨 둔 금서",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 28, anyFocus: ["forbidden"] },
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
          corruption: 4
        },
        fail: {
          text: "변명이 간파되어 혹독한 심문과 수배 낙인을 피하기 위해 밤중에 거처를 버리고 도주해야 했다.",
          wounds: -18,
          corruption: 6,
          addTags: ["wanted_by_inquisition"]
        }
      },
      {
        label: "[민첩 판정] 문이 열리기 전 10초 만에 금서를 강산성 용액에 녹여 흔적을 지우고 평범한 기도서로 바꿔치기한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "내사관들이 서재를 뒤집었으나 단 한 조각의 불경한 증거도 찾지 못했다! 심장이 터질 듯한 밤을 넘겼다.",
          stats: { Ag: 7, WP: 5, Int: 3 }
        },
        fail: {
          text: "용액이 손등에 튀어 화상을 입고 수상한 재가 발각되어 막대한 벌금과 감시 처분을 받았다.",
          wounds: -14,
          stats: { Inf: -5 }
        }
      },
      {
        label: "스스로 모든 금서를 화로에 던져 태우고 무릎을 꿇어 고해성사와 정화 고행을 자청한다",
        effect: {
          text: "심연을 들여다보던 발걸음을 간신히 돌렸다. 혹독한 태형 끝에 목숨과 영혼을 건졌다.",
          wounds: -12,
          faith: 10,
          corruption: -14,
          stats: { WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Forbidden Lore / Dark Heresy: Radical's Handbook"
  },

  // -------------------------------------------------------------------------
  // 5-3. 외계(Xenos) 서사 균형 확장 사건 (8종: 타우·드루카리·네크론·아엘다리·보탄)
  // -------------------------------------------------------------------------
  {
    id: "ev_s5_xenos_tau_diplomat",
    title: "타우 제국 물 카스트 사절 — '대의(Greater Good)'의 달콤한 회유",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 16,
      anySegmenta: ["ultima"],
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "세그멘툼 울티마 · 동부 변경 교역지",
    weight: 28,
    text: "동부 변경의 중립 교역 정거장에서 푸른 피부에 정갈한 비단 예복을 걸친 타우 제국 물 카스트 사절이 그대에게 정중히 차를 권했다. 그는 제국의 끝없는 징집과 기아를 지적하며, 타우 제국의 '대의(Greater Good)' 아래 합류하면 가족의 안전과 첨단 의료를 보장하겠다고 속삭인다.",
    choices: [
      {
        label: "[의지 판정] 외계인의 감언이설을 단호히 꾸짖고 사절단의 밀수 접선 명단을 파악해 제국 정보부에 넘긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "달콤한 유혹에 흔들리지 않은 충성심과 날카로운 첩보 덕분에 변절 공작망 전체가 뿌리 뽑혔다!",
          stats: { WP: 7, Int: 5, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "사절단의 크루트 호위병들과 실랑이를 벌이며 부상을 입었으나, 제국에 대한 충성만은 지켜 냈다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 변절은 거절하되 물 카스트의 위생·정수 기술 정보만 교역 조건으로 교묘히 빼내 온다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "위험한 줄타기 끝에 변경 정착지 수만 명을 살릴 실용 기술을 손에 넣었다. 다만 외계인과의 접촉 기록이 남았다.",
          stats: { Fel: 7, Int: 6, Inf: 4 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "교섭 현장이 오르도 제노스 감시망에 포착되어 한동안 엄중한 신원 조사를 받아야 했다.",
          stats: { Inf: -4, WP: 3 },
          addTags: ["xenos_contact"]
        }
      },
      {
        label: "외계인이 건넨 찻잔에 입도 대지 않은 채 침묵 속에 자리를 박차고 나온다",
        effect: {
          text: "외계인의 미소 뒤에는 언제나 지배의 사슬이 숨어 있다. 혐오와 경계심을 더욱 단단히 했다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Water Caste / Gue'vesa / Codex: T'au Empire"
  },
  {
    id: "ev_s5_xenos_tau_battlesuit",
    title: "동부 변경의 푸른 섬광 — 타우 크라이시스 배틀슈트 기습전",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      anySegmenta: ["ultima"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "세그멘툼 울티마 · 동부 변경 전선",
    weight: 28,
    text: "안개 낀 협곡 위에서 푸른 펄스 광선이 빗발처럼 쏟아졌다! 제트팩으로 절벽을 뛰어넘는 타우 제국 불 카스트의 크라이시스 배틀슈트 편대가 표적 지시 드론을 앞세워 아군 수송 종대를 완벽한 사거리 밖에서 유린하고 있다.",
    choices: [
      {
        label: "[사격 판정] 배틀슈트보다 먼저 공중에 떠 있는 마커라이트 표적 드론을 정밀 사격으로 격추해 적 화망을 눈멀게 한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "조준 연계가 끊기자 타우 기동대의 정밀 사격이 급격히 흐트러졌다! 그 틈을 타 아군 중화기 반격이 배틀슈트 두 기를 격추했다.",
          stats: { BS: 8, Int: 5, Inf: 6 }
        },
        fail: {
          text: "플라스마 사격의 열풍에 화상을 입었으나, 드론 몇 기를 떨어뜨려 수송 차량 일부를 살려 냈다.",
          wounds: -18,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "[백병 판정] 연막탄을 터뜨리고 협곡 암벽을 타고 기어올라 타우가 가장 꺼리는 초근접 백병전으로 파고든다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "사격 교리에 의존하던 외계 조종사가 근접 돌격에 당황하며 추락했다! 제국 전사의 집념이 첨단 기계를 꺾었다.",
          stats: { WS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "배틀슈트의 점프 제트 역분사에 튕겨 나가 큰 타박상을 입었으나 적의 퇴각을 이끌어 냈다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "무모한 추격을 접고 절벽 동굴 안으로 병력과 보급품을 신속히 분산 대피시킨다",
        effect: {
          text: "외계인의 살상 지대에 머무르지 않고 전력을 보존했다. 살아남아야 다음 반격도 있다.",
          stats: { Int: 5, Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: XV8 Crisis Battlesuit / Damocles Gulf Lore"
  },
  {
    id: "ev_s5_xenos_drukhari_slavers",
    title: "어둠 속의 비명 — 드루카리 코모라 노예 습격선",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 16,
      excludeWorlds: ["terra", "mars"],
      excludeTags: ["custodes"]
    },
    reqLabel: "제국 변경 · 밤의 외계 습격",
    weight: 28,
    text: "행성의 전력망이 일순간 먹통이 되더니, 찢어진 웹웨이 차원문 너머로 가시 돋친 칠흑의 함정들이 미끄러져 내려왔다. 드루카리(다크 엘다) 카발 약탈단이다! 그들은 행성을 정복할 생각 따위는 없다. 오직 산 채로 주민들을 사슬에 묶어 코모라의 고문장으로 끌고 가려는 것이다.",
    choices: [
      {
        label: "[사격 판정] 저공 비행하는 레이더 강습정의 반중력 엔진을 집중 사격해 노예 포획선을 격추한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "약탈선이 불길에 휩싸여 추락하자 갇혀 있던 수백 명의 주민이 풀려났다! 드루카리들은 손실이 커지자 서둘러 차원문 너머로 철수했다.",
          stats: { BS: 8, WP: 5, Inf: 7 }
        },
        fail: {
          text: "독침 파편탄(스플린터)에 스쳐 극심한 고통에 시달렸으나 끝내 구역 방어선은 지켜 냈다.",
          wounds: -20,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[민첩 판정] 어둠 속 기습 칼날을 피해 지하 방공호 통로를 열어 주민 수백 명을 재빨리 피신시킨다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "눈 깜짝할 새에 피난민들을 철문 뒤로 대피시켰다! 산 채로 끌려가는 지옥보다 나은 길을 열어 주었다.",
          stats: { Ag: 8, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "후미를 지키다 갈고리 채찍에 깊은 상처를 입었으나, 방공호 빗장은 끝내 잠갔다.",
          wounds: -18,
          stats: { Ag: 4, WP: 4 }
        }
      },
      {
        label: "단 한 명의 생포도 허용하지 않겠다는 각오로 최후의 방어 진지에 틀어박혀 새벽까지 버틴다",
        effect: {
          text: "코모라에 끌려가느니 싸우다 죽겠다는 냉혹한 결의가 어둠 속 공포를 이겨 내게 했다.",
          stats: { WP: 6, T: 4 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Drukhari / Commorragh Realspace Raid"
  },
  {
    id: "ev_s5_xenos_drukhari_haemonculus",
    title: "뒤틀린 살점의 거래 — 드루카리 호문쿨루스 전초 기지",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 20,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "20세 이상 · 제국 전역 (테라·화성·야만 제외)",
    weight: 24,
    text: "실종자 수색 끝에 폐쇄된 지하 도축장 깊숙한 곳에서 섬뜩한 유리 배양관들과 기괴한 수술 기구가 늘어선 드루카리 호문쿨루스의 비밀 실험실을 발견했다. 뼈로 만든 가면을 쓴 외계 외과의는 황홀한 웃음을 흘리며, 아군 포로를 돌려주는 대가로 그대의 생명력이나 비밀 표본을 요구한다.",
    choices: [
      {
        label: "[의지 판정] 역겨운 외계인의 농간에 흔들리지 않고 소이탄과 화염으로 실험실 전체를 정화 소각한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불길 속에서 포로들을 구출하고 괴물 같은 외계 외과의를 퇴각시켰다! 오르도 제노스가 그대의 단호한 정화를 높이 샀다.",
          stats: { WP: 8, BS: 4, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "기괴한 육체 개조 괴물 그로테스크의 반격에 중상을 입었으나, 실험실 폭파에는 성공했다.",
          wounds: -22,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 거래에 응하는 척 시선을 끌면서 외계 생체 잠금장치의 약점을 파악해 포로 감옥만 일제히 개방한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "오만한 외계 외과의의 허를 완벽히 찔렀다! 풀려난 포로들과 합세해 적의 기지를 뒤엎고 무사히 탈출했다.",
          stats: { Int: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "신경 마비 독가스에 중독되어 간신히 기어 나왔으나, 포로 몇 명만은 구해 냈다.",
          wounds: -18,
          stats: { Int: 4 }
        }
      },
      {
        label: "즉시 입구를 봉쇄하고 행성 궤도 사령부에 위치 좌표를 송신해 정밀 폭격으로 매장시킨다",
        effect: {
          text: "호문쿨루스와 대화를 나누는 순간 이미 진 것이다. 지반째 무너뜨려 끔찍한 흔적을 지웠다.",
          stats: { WP: 5, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Haemonculus Covens / Codex: Drukhari"
  },
  {
    id: "ev_s5_xenos_necron_awakening",
    title: "에메랄드빛 침묵 — 행성 지하에서 깨어난 네크론 툼 월드",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "mars"]
    },
    reqLabel: "18세 이상 · 행성 지하 유적 지대",
    weight: 28,
    text: "광산 발파 작업 도중 수천만 년 동안 잠들어 있던 검은 석재 피라미드가 드러났다. 이내 대지가 에메랄드빛 녹색 섬광으로 물들더니, 말 한마디 없는 살아 있는 금속 해골 전사들이 완벽한 대열을 이루어 걸어 나온다. 가우스 광선이 닿은 장갑차는 원자 단위로 벗겨지며 사라졌다.",
    choices: [
      {
        label: "[지성 판정] 찢어진 금속 육신이 스스로 재생하는 현상을 간파하고 지하 중앙 동력탑(모놀리스)의 위상 회로를 집중 타격한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "위상 재구축 신호가 끊기자 불사신 같던 금속 전사들이 일제히 멈춰 섰다! 기계교가 그대의 전술 분석을 극찬했다.",
          stats: { Int: 8, BS: 5, Inf: 7 }
        },
        fail: {
          text: "녹색 가우스 광선에 팔을 스쳐 뼈가 드러나는 중상을 입었으나, 갱도 폭파로 각성을 늦추었다.",
          wounds: -22,
          stats: { Int: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 전선 붕괴를 막기 위해 중화기 화망을 유지하며 채굴 기지 주민들이 탈출할 시간을 몸으로 번다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "스카라브 떼와 가우스 포화 속에서도 한 치도 물러서지 않았다! 수송선 전원이 무사히 이륙하는 기적을 이루었다.",
          stats: { T: 8, WP: 6, Inf: 6 }
        },
        fail: {
          text: "치명적인 화상과 충격으로 쓰러졌으나, 후속 구원대가 그대를 끌어내며 방어선을 이어받았다.",
          wounds: -24,
          stats: { T: 5 }
        }
      },
      {
        label: "인류가 상대할 수 없는 고대 기계의 각성을 즉시 아스트로패스 긴급 경보로 타전하고 신속히 철수한다",
        effect: {
          text: "무모한 희생 대신 오르도 제노스와 성계 함대에 정확한 위협 등급을 알렸다.",
          stats: { Int: 5, Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: Necron Tomb World / Codex: Necrons"
  },
  {
    id: "ev_s5_xenos_necron_trazyn",
    title: "무한한 수집가의 초대장 — 은빛 외계 군주 트라진의 기묘한 거래",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 22,
      excludeWorlds: ["terra"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "22세 이상 · 고대 유물·전장 지대",
    weight: 22,
    text: "전투가 멎은 고대 폐허 한가운데, 시간이 멈춘 듯한 테서랙트 미궁의 불빛 사이로 은빛 외계 군주 한 명이 우아하게 지팡이를 짚고 나타났다. 스스로를 '무한한 자 트라진(Trazyn the Infinite)'이라 밝힌 네크론 오버로드는 그대의 사소한 유품 하나를 자신의 박물관에 기증하면, 이 성계를 덮칠 치명적인 재앙의 좌표 하나를 알려 주겠다고 흥미롭게 제안한다.",
    choices: [
      {
        label: "[교섭 판정] 박물관 전시품으로 갇히지 않도록 교묘한 말솜씨로 낡은 제국 연대 깃발 조각만 건네고 핵심 정보를 챙긴다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "은빛 수집가가 만족스러운 기계 웃음을 흘리며 성계 지하의 진스틸러 소굴 좌표를 남기고 사라졌다! 덕분에 행성이 구원받았다.",
          stats: { Fel: 8, Int: 6, Inf: 6 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "트라진이 흥미를 잃고 정지장 구체로 위협하는 통에 혼비백산하여 겨우 도망쳤다.",
          wounds: -14,
          stats: { Ag: 4, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 외계인의 조롱과 거래를 일축하고 즉시 화기를 겨누어 제국 신민의 기개를 보인다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "트라진은 '인류 특유의 고집도 참 흥미롭군'이라며 감탄하더니 공격하지 않고 녹색 섬광 속으로 물러났다.",
          stats: { WP: 8, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "네크론 호위병의 충격파에 날아가 부상을 입었으나, 끝내 외계인의 수집품이 되지는 않았다.",
          wounds: -18,
          stats: { WP: 5 }
        }
      },
      {
        label: "절대 시선을 마주치지 않고 뒷걸음질로 폐허를 빠져나가 기이한 만남을 가슴속에 묻어 둔다",
        effect: {
          text: "수천만 년을 살아온 수집가와 엮여 좋을 일은 없다. 무사히 살아 돌아온 것만으로 천운이다.",
          stats: { WP: 5, Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: Trazyn the Infinite / The Infinite and the Divine"
  },
  {
    id: "ev_s5_xenos_aeldari_farseer",
    title: "크래프트월드 파시어의 수수께끼 — 피할 수 없는 운명의 갈림길",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "mars"]
    },
    reqLabel: "18세 이상 · 제국 전역 (테라·화성 제외)",
    weight: 26,
    text: "안개 속에서 정교한 레이스본(Wraithbone) 갑주를 걸친 아엘다리 크래프트월드 파시어와 호위대가 홀연히 나타났다. 오만한 외계 예언자는 공명하는 목소리로 '인류여, 오늘 밤 동쪽 발전소를 멈추지 않으면 열흘 뒤 악마가 이 성계를 삼킬 것이다'라는 난해한 경고를 던지고는 침묵한다.",
    choices: [
      {
        label: "[지성 판정] 아엘다리의 속셈을 그대로 믿지 않고 동쪽 발전소 지하의 실제 워프 수치와 배관을 정밀 조사한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "과연 발전소 지하에 카오스 교단의 소환진이 숨겨져 있었다! 아엘다리의 의도는 불명하나 어쨌든 대참사를 미연에 막아 냈다.",
          stats: { Int: 8, WP: 5, Inf: 6 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "조사 도중 아엘다리 측의 진짜 목표였던 고대 영혼석만 빼앗긴 채 헛탕을 쳤다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 외계인의 거짓 예언 따위는 들을 가치도 없다며 즉각 경보를 울리고 사격을 개시한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "아엘다리 척후대를 격퇴하고 외계인의 접근을 원천 봉쇄했다! 제국 지휘부가 그대의 확고한 배타 정신을 칭찬했다.",
          stats: { BS: 7, WP: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "인간의 눈으로 쫓기 힘든 아엘다리의 기동과 수리검 사격에 상처를 입고 놓치고 말았다.",
          wounds: -18,
          stats: { BS: 3, Ag: 3 }
        }
      },
      {
        label: "정면 충돌을 피한 채 발전소 경비만 은밀히 두 배로 증강하고 상황을 지켜본다",
        effect: {
          text: "외계인을 믿지도, 무모하게 싸우지도 않은 신중함 덕분에 양쪽의 함정을 모두 비껴갔다.",
          stats: { WP: 5, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Farseer / Craftworld Aeldari Lore"
  },
  {
    id: "ev_s5_xenos_votann_prospect",
    title: "보탄 연맹 자원 탐사대 — 킨(Kin) 무장 상단과의 위험한 교섭",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "krieg"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "18세 이상 · 은하 핵 인접 변경 · 소행성대",
    weight: 26,
    text: "성계 외곽 소행성 채굴 기지에 땅딸막하고 중무장한 이방인들의 묵직한 탐사 함선이 접안했다. 제국 기록에서 '스쿼트' 혹은 '보탄 연맹의 킨(Kin)'이라 불리는 독자 세력의 자원 탐사대다. 그들은 제국법 따위는 안중에도 없지만, 공정한 거래와 희귀 광물 교환만큼은 철저히 지킨다고 제안한다.",
    choices: [
      {
        label: "[교섭 판정] 무력 충돌 대신 엄격한 물물교환 계약을 맺어 제국 기술로도 얻기 힘든 고강도 합금과 정밀 장비를 확보한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "킨 상단장이 껄껄 웃으며 약속 이상의 고품질 장비를 건넸다! 성계 방어군의 무장이 눈에 띄게 강화되었다.",
          stats: { Fel: 7, Inf: 7, Int: 4 }
        },
        fail: {
          text: "까다로운 보탄 연맹의 원가 계산에 말려 손해 보는 거래를 맺고 말았다.",
          stats: { Inf: -3, Int: 3 }
        }
      },
      {
        label: "[지성 판정] 킨 탐사대가 사용하는 고대 암흑기 계통 기계 장비를 유심히 관찰해 정비와 공학의 통찰을 얻는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "제국 기계교와는 전혀 다른 실용 공학의 정수를 눈여겨보아 기술적 안목이 크게 트였다!",
          stats: { Int: 8, WP: 4 }
        },
        fail: {
          text: "기술을 엿본다는 의심을 사 킨 전사들의 볼카이트 총구 앞에서 서둘러 물러나야 했다.",
          stats: { Ag: 3, Int: 3 }
        }
      },
      {
        label: "비인가 세력과의 사적 교역을 거절하고 행성 영공에서 즉각 퇴거하라는 공식 경고만 전달한다",
        effect: {
          text: "킨 탐사대는 어깨를 으쓱하고는 군말 없이 소행성대 너머로 함선을 돌렸다. 제국법의 원칙을 지켰다.",
          stats: { WP: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Leagues of Votann / Codex: Leagues of Votann"
  },

  // -------------------------------------------------------------------------
  // 5-4. 카오스 배신자 아스타르테스 군단 특화 분기 사건 (4종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s5_traitor_death_guard",
    title: "역병의 행진 — 녹슨 종소리와 함께 상륙한 데스 가드",
    category: "배신자 군단",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra"]
    },
    reqLabel: "18세 이상 · 카오스 침공 전선",
    weight: 26,
    text: "잿빛 안개 속에서 무거운 쇠종이 일곱 번 울려 퍼졌다. 녹슨 파워 아머 사이로 고름과 독충을 흘리며 느릿느릿 걸어오는 거인들—너글의 선택을 받은 배신자 군단 '데스 가드'의 플레이그 마린들이다! 라스건과 볼터가 몸통을 꿰뚫어도 저주받은 거인들은 고통조차 느끼지 못한 채 전진해 온다.",
    choices: [
      {
        label: "[강인 판정] 방독면과 화염방사기를 쥐고 역병의 독기를 견디며 집중 화염으로 부패한 장갑을 태워 버린다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "정화의 불길이 너글의 오물을 잿더미로 태워 버렸다! 끔찍한 역병 군단의 진격이 그대의 방어선 앞에서 멈춰 섰다.",
          stats: { T: 8, WP: 6, Inf: 7 },
          faith: 8,
          corruption: -6
        },
        fail: {
          text: "부식성 점액과 역병 포자에 노출되어 한동안 생사를 넘나드는 열병을 앓았다.",
          wounds: -22,
          corruption: 6,
          stats: { T: 4 }
        }
      },
      {
        label: "[지성 판정] 정면 소모전을 피하고 공병대와 함께 하수도와 지하수로를 폭파해 역병 확산 경로를 완벽히 차단한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "데스 가드의 가장 무서운 무기인 전염병 전파를 원천 봉쇄했다! 후속 증원군이 올 때까지 도시를 지켜 냈다.",
          stats: { Int: 8, Inf: 6, WP: 4 }
        },
        fail: {
          text: "폭파 지연으로 하층 구역 일부가 오염되었으나, 중심부만큼은 방어하는 데 성공했다.",
          wounds: -14,
          corruption: 4,
          stats: { Int: 4 }
        }
      },
      {
        label: "감염된 외곽 방어선을 과감히 소각 포기하고 방역 격벽 뒤로 병력을 철수시켜 재정비한다",
        effect: {
          text: "너글의 군단 앞에서 무모한 만용은 역병을 퍼뜨릴 뿐이다. 냉정한 방역 후퇴가 생존자를 남겼다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Death Guard / Dark Imperium"
  },
  {
    id: "ev_s5_traitor_alpha_legion",
    title: "히드라의 그림자 — '내가 알파리우스다', 아군 속의 이중 첩자",
    category: "배신자 군단",
    once: true,
    req: {
      minAge: 18,
      excludeWorldTags: ["feral"]
    },
    reqLabel: "18세 이상 · 행성 보안 및 지휘망",
    weight: 26,
    text: "아무런 외부 침공도 없었는데 성계 방어 포탑이 돌연 아군 수송선을 오인 사격하고, 서로 다른 장교들이 정반대의 기밀 명령서를 들고 충돌하기 시작했다. 통신망 잡음 사이로 비늘 문양 암호와 함께 단 한 줄의 조롱이 스쳐 지나갔다. '히드라 도미나투스. 내가 알파리우스다.' 알파 리전의 공작이다.",
    choices: [
      {
        label: "[지성 판정] 모든 디지털 통신을 즉각 끊고 수기 암호부와 인적 동선을 교차 대조해 내부의 진짜 잠입 공작원을 색출한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "가장 신뢰받던 부관의 가면을 벗겨 내며 알파 리전의 연쇄 사보타주 계획을 통째로 무력화했다! 방첩의 전설로 기록되었다.",
          stats: { Int: 9, WP: 5, Inf: 8 }
        },
        fail: {
          text: "교묘한 이중 함정에 걸려 애꿎은 충성파를 의심하는 혼선을 겪었으나, 결국 본부 점거만은 막았다.",
          stats: { Inf: -4, Int: 4 }
        }
      },
      {
        label: "[의지 판정] 의심과 편집증으로 서로 총구를 겨누는 지휘관들 사이에 서서 침착하게 지휘 계통을 재확립한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "알파 리전이 노렸던 자중지란이 그대의 강철 같은 중심 앞에 좌절되었다! 아군이 다시 한 방향으로 결집했다.",
          stats: { WP: 8, Fel: 6, Inf: 6 }
        },
        fail: {
          text: "혼란 속에 날아온 저격탄에 어깨를 맞았으나, 지휘부가 완전히 붕괴하는 것만은 막아 냈다.",
          wounds: -16,
          stats: { WP: 5 }
        }
      },
      {
        label: "복잡한 상부 명령을 전부 보류하고 오직 눈앞에서 확인된 사실과 최소 구역 방어에만 집중한다",
        effect: {
          text: "거짓 정보가 넘쳐날 때는 가장 단순한 원칙으로 돌아가는 것이 히드라의 독을 피하는 길이다.",
          stats: { Int: 5, WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Alpha Legion / Harrowmaster"
  },
  {
    id: "ev_s5_traitor_night_lords",
    title: "자정의 옷을 입은 자들 — 복스 통신망을 뒤덮은 나이트 로드의 비명",
    category: "배신자 군단",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "mars"]
    },
    reqLabel: "18세 이상 · 공포 심리전 전선",
    weight: 26,
    text: "한밤중 도시의 모든 복스 확성기와 가정용 수신기가 저절로 켜지더니, 끔찍한 비명 소리와 번개 문양 갑주의 환상이 쏟아져 나왔다. 공포 자체를 무기로 삼는 배신자 군단 '나이트 로드'가 행성 궤도에 도착해 시민들의 이성을 산산조각 내려 하고 있다.",
    choices: [
      {
        label: "[의지 판정] 귀를 찢는 공포 방송을 차단하고 황제의 이름 아래 흔들리는 방어병들의 정신을 다잡아 야간 기습을 역매복한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "공포가 통하지 않는 적 앞에서 나이트 로드 약탈대는 의외로 허무하게 퇴각했다! 칠흑의 밤을 이겨 낸 영웅담이 퍼져 나갔다.",
          stats: { WP: 9, Fel: 5, Inf: 7 },
          faith: 8
        },
        fail: {
          text: "어둠 속에서 벼락처럼 덮친 라이트닝 클로에 깊은 흉터를 얻었으나 끝내 패주하지 않았다.",
          wounds: -22,
          stats: { WP: 5, T: 3 }
        }
      },
      {
        label: "[사격 판정] 도시 전체의 탐조등과 조명탄을 일제히 쏘아 올려 어둠을 없애고 지붕 위의 랩터 강습대를 격추한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "백주 대낮처럼 밝아진 하늘 아래 그림자 사냥꾼들이 화망에 갈려 나갔다! 완벽한 대공포 격퇴전이었다.",
          stats: { BS: 8, Int: 4, Inf: 6 }
        },
        fail: {
          text: "발전소가 피격되어 일부 구역이 암흑에 잠겼으나, 본부 방어선만은 끝까지 밝혀 두었다.",
          wounds: -15,
          stats: { BS: 4 }
        }
      },
      {
        label: "복스 수신기를 모두 부수고 좁고 밝은 지하 방공호에 밀집 방진을 세워 새벽 해가 뜰 때까지 버틴다",
        effect: {
          text: "흩어지면 사냥당하고 뭉치면 산다. 긴 공포의 밤을 무사히 버텨 냈다.",
          stats: { WP: 6, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Night Lords / Soul Hunter"
  },
  {
    id: "ev_s5_traitor_thousand_sons",
    title: "먼지뿐인 군단 — 푸른 화염과 사우전드 선 마법사의 시간 왜곡",
    category: "배신자 군단",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra"]
    },
    reqLabel: "18세 이상 · 워프 마법 전선",
    weight: 26,
    text: "전장의 중력이 기이하게 뒤틀리고 하늘에 아홉 갈래 별빛이 번득이더니, 푸른 황금 갑주를 걸친 침묵의 전사들이 먼지 바람을 일으키며 나타났다. 젠취의 사도 '사우전드 선'의 루브릭 마린과 소서러들이다! 총알이 공중에서 멈추고 아군 대열의 시간이 거꾸로 흐르는 기괴한 마법이 펼쳐진다.",
    choices: [
      {
        label: "[의지 판정] 황제에 대한 절대 신앙과 철벽의 의지로 소서러의 환각 마법을 뚫고 마법 지휘관을 직접 저격한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "소서러가 쓰러지자 통제를 잃은 루브릭 마린들이 일제히 얼어붙은 석상처럼 멈춰 섰다! 워프의 요술을 이성으로 꺾은 대승이었다.",
          stats: { WP: 9, BS: 5, Inf: 7 },
          faith: 10,
          corruption: -8
        },
        fail: {
          text: "푸른 워프 화염에 갑옷과 살점이 타들어가며 오염의 여파를 겪었으나, 끝내 진지를 사수했다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 5 }
        }
      },
      {
        label: "[지성 판정] 소서러가 시전 중인 아홉 각 마법진의 중심 초점을 계산해 곡사 포격을 쏟아부어 의식을 끊는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기하학적 역산으로 워프 의식을 정확히 붕괴시켰다! 시간 왜곡이 풀리며 아군이 일제히 반격에 성공했다.",
          stats: { Int: 8, BS: 4, Inf: 6 }
        },
        fail: {
          text: "포탄 일부가 허공에서 모래로 변했으나, 결국 연쇄 폭발로 적 마법사의 집중을 흩뜨렸다.",
          wounds: -14,
          corruption: 4,
          stats: { Int: 4 }
        }
      },
      {
        label: "마법의 영향권 바깥으로 부대를 신속히 이탈시키고 성당 사제와 블랭크 요원의 정화 지원을 요청한다",
        effect: {
          text: "워프 마법과 정면으로 겨루는 만용 대신 올바른 대항 전력을 기다려 아군을 살렸다.",
          stats: { WP: 5, Int: 4 },
          corruption: -3
        }
      }
    ],
    source: "Lexicanum: Thousand Sons / Rubric Marines"
  },

  // =========================================================================
  // 6단계 (2차 서사 보강 3단계) — 성별·침묵의 자매들 · 소외 네임드 행성 · 챕터 숙원 (14종)
  // =========================================================================

  // -------------------------------------------------------------------------
  // 6-1. 성별 고유 서사 · 침묵의 자매들(Sisters of Silence) · 소로리타스 교단 (4종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s6_sisters_of_silence_call",
    title: "침묵의 자매들 — 검은 함선의 황금 가면을 쓴 징발관",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 16,
      gender: "female",
      allTags: ["blank"],
      excludeTags: ["sister_of_silence", "heretic", "chaos_aligned", "astartes", "custodes"]
    },
    reqLabel: "여성 · 블랭크(퍼라이어) 자질",
    weight: 42,
    text: "평생 타인에게 원인 모를 불쾌감을 안기던 그대의 영혼 없는 공백이, 마침내 그 진가를 알아보는 이들의 눈에 띄었다. 황금빛 갑주에 입가를 철면으로 가린 말없는 여전사들—아나테마 사이카나(침묵의 자매들)의 기사가 정교한 수화(Thoughtmark)로 그대에게 검은 함선과 황제의 발톱에 합류할 것을 제의한다.",
    choices: [
      {
        label: "[의지 판정] 평온의 서약(Oath of Tranquillity)을 올리고 침묵의 자매들 정예 사냥꾼의 길을 걷는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "마지막 한마디 맹세를 끝으로 입을 닫았다. 그대는 이제 사이커와 악마가 가장 두려워하는 침묵의 칼날, 황제의 발톱이 되었다!",
          stats: { WP: 8, WS: 6, Ag: 5, Inf: 8 },
          faith: 10,
          corruptionReset: true,
          addTags: ["sister_of_silence"]
        },
        fail: {
          text: "가혹한 침묵 수련 도중 탈진해 쓰러졌으나, 끝내 집념을 인정받아 예비 자매단 서약을 허락받았다.",
          wounds: -14,
          stats: { WP: 5, WS: 3 },
          addTags: ["sister_of_silence"]
        }
      },
      {
        label: "[백병 판정] 그레이트블레이드 검술 시험에 즉석으로 응해 자매단 기사와 정면으로 합을 겨룬다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "날카로운 검기가 황금 갑주의 어깨를 스쳤다! 기사단장이 말없이 고개를 끄덕이며 정식 비질레이터(Vigilator)의 검을 수여했다.",
          stats: { WS: 8, Ag: 5, Inf: 7 },
          corruptionReset: true,
          addTags: ["sister_of_silence"]
        },
        fail: {
          text: "압도적인 무예 앞에 무릎을 꿇었으나, 물러서지 않은 담력을 높이 평가받아 자매단에 편입되었다.",
          wounds: -18,
          stats: { WS: 4, T: 3 },
          addTags: ["sister_of_silence"]
        }
      },
      {
        label: "평생 침묵 속에 살아가는 서약은 감당할 수 없다며 정중히 사양하고 지금의 자리를 지킨다",
        effect: {
          text: "침묵의 자매들은 말없이 고개를 숙여 예를 표한 뒤 검은 함선으로 돌아갔다. 스스로의 목소리를 지키며 살아가기로 했다.",
          stats: { WP: 5, Fel: 4 }
        }
      }
    ],
    source: "Lexicanum: Sisters of Silence / Watchers of the Throne"
  },
  {
    id: "ev_s6_sisters_of_silence_hunt",
    title: "침묵의 사냥 — 폭주하는 알파급 사이커와 영혼 없는 방패",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 20,
      allTags: ["sister_of_silence"]
    },
    reqLabel: "이력: 침묵의 자매들",
    weight: 38,
    text: "검은 함선 이송 도중 봉인 구속구를 찢고 탈출한 알파급 무등록 사이커가 행성 성당 지하에서 워프 차원문을 열려 하고 있다. 일반 가드맨과 심문소 수행원들은 접근하기도 전에 뇌가 녹아내리며 쓰러지지만, 오직 영혼의 공백을 두른 침묵의 자매인 그대만이 워프 폭풍 속으로 걸어 들어갈 수 있다.",
    choices: [
      {
        label: "[백병 판정] 사이커의 번개와 염동력이 닿는 순간 무효화되는 공백을 방패 삼아 단숨에 목을 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "그대가 다가서자 알파급 사이커의 공포스러운 화염이 촛불처럼 꺼졌다! 대검 일격으로 차원문을 닫고 도시 전체를 구했다.",
          stats: { WS: 8, WP: 6, Inf: 8 },
          corruptionReset: true,
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "사이커가 마지막에 날린 물리적 파편 폭풍에 크게 다쳤으나, 끝내 포박 사슬을 채워 검은 함선에 회수했다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[민첩 판정] 화염방사기(위치시커)와 수화 신호로 자매단 포위망을 조여 사이커를 산 채로 생포한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "단 한 마디의 구호도 없이 완벽하게 맞물린 협공! 테라의 아스트로노미칸에 바칠 귀중한 십일조를 온전히 확보했다.",
          stats: { Ag: 8, BS: 5, Inf: 7 }
        },
        fail: {
          text: "화염 역류와 붕괴 잔해 속에 화상을 입었으나, 사이커의 워프 개방만은 완전히 저지했다.",
          wounds: -16,
          stats: { Ag: 4, WP: 4 }
        }
      },
      {
        label: "전면에 나서는 대신 공백 오라로 주변 민간인과 부상병을 감싸 워프 폭풍의 피해부터 차단한다",
        effect: {
          text: "말없는 방패가 되어 수백 명의 정신을 지켜 냈다. 뒤이어 도착한 자매단 본대가 무사히 사이커를 제압했다.",
          stats: { WP: 6, T: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Sisters of Silence / Black Ships Lore"
  },
  {
    id: "ev_s6_sororitas_order_choice",
    title: "아뎁타 소로리타스 — 주요 전투 교단의 깃발과 순교자의 맹세",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 18,
      gender: "female",
      anyCareers: ["adepta_sororitas", "canoness"]
    },
    reqLabel: "여성 · 아뎁타 소로리타스 / 캐노네스",
    weight: 36,
    text: "성전 출정을 앞두고 대성당의 제단 앞에 아뎁타 소로리타스 핵심 전투 교단들의 성기가 나란히 세워졌다. 검은 갑주에 진홍 망토의 '아워 마터드 레이디', 고행과 인내의 '발로러스 하트', 그리고 격렬한 성전의 칼날 '블러디 로즈' 가운데 그대가 본받을 신앙의 결을 택할 순간이다.",
    choices: [
      {
        label: "[의지 판정] 성녀 캐서린의 유산을 잇는 '아워 마터드 레이디'의 불굴의 전선 교리에 서약한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "어떠한 절망 앞에서도 꺾이지 않는 순교자의 기백이 그대의 영혼에 깃들었다! 전선 전체가 그대의 찬송가에 화답했다.",
          stats: { WP: 8, BS: 5, Inf: 6 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "가혹한 철야 기도 끝에 무릎이 찢어졌으나, 교단의 강철 같은 신념만은 가슴에 새겼다.",
          wounds: -10,
          faith: 6,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 성녀 미나의 분노를 계승하는 '블러디 로즈'의 선봉 체인소드 돌격대에 합류한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "진홍빛 갑주가 이단자들의 진영을 벼락처럼 갈라 놓았다! 블러디 로즈의 맹렬한 성전이 그대의 검끝에서 타올랐다.",
          stats: { WS: 8, Ag: 5, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "과감한 선봉 돌격 도중 적 포화에 큰 상처를 입었으나, 성전 깃발만큼은 적진 한복판에 꽂았다.",
          wounds: -18,
          stats: { WS: 5, T: 3 }
        }
      },
      {
        label: "성녀 루시아의 고행을 따르는 '발로러스 하트'의 인내를 본받아 묵묵히 순교의 방패가 되기를 맹세한다",
        effect: {
          text: "화려한 공명심 없이 고통과 시련을 견디는 침착한 신앙을 택했다. 육신과 영혼이 한층 단단해졌다.",
          stats: { T: 6, WP: 6 },
          faith: 10,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Orders Militant / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s6_gender_mortal_frontline",
    title: "제국의 전선에 남녀는 없다 — 구시대 귀족 연락관의 편견을 부수는 화망",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 18,
      gender: "female",
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_officer", "commissar", "arbites", "imperial_navy"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "여성 · 제국 정규 무관·치안 직군",
    weight: 28,
    text: "인류제국의 라스건과 포탄은 성별을 가리지 않건만, 보수적인 변방 봉건 귀족 가문에서 낙하산으로 내려온 신임 연락관은 그대의 전술 보고를 듣지도 않은 채 '전선 지휘는 거친 사내들의 몫'이라며 거만하게 비웃었다. 바로 그때 전초 기지 외곽에서 적 강습대의 경보가 터졌다.",
    choices: [
      {
        label: "[사격 판정] 말대꾸 대신 직접 저격 조준경과 화력 유도기를 잡아 적 선봉 장교 셋을 10초 만에 쓰러뜨린다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "총성이 멎자 얼굴이 하얗게 질린 귀족 연락관이 바닥에 엎드린 채 아무 말도 못 했다! 부대원들의 통쾌한 환호가 참호를 울렸다.",
          stats: { BS: 7, Inf: 7, Fel: 4 }
        },
        fail: {
          text: "적 박격포 파편에 스쳐 피를 흘리면서도 끝까지 지휘권을 놓지 않아 반격을 성공시켰다.",
          wounds: -14,
          stats: { BS: 4, WP: 5 }
        }
      },
      {
        label: "[교섭 판정] 제국 군법과 수많은 여성 로드 제너럴·캐노네스의 전례를 서늘하게 읊어 연락관의 기를 꺾어 놓는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "상급 사령부 감찰관마저 그대의 편을 들며 연락관을 즉각 후방 창고로 좌천시켰다! 통쾌하고 품격 있는 승리였다.",
          stats: { Fel: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "귀족 가문의 반발로 잠시 껄끄러운 신경전을 치렀으나, 현장 지휘권만큼은 흔들리지 않았다.",
          stats: { Fel: 3, WP: 4 }
        }
      },
      {
        label: "오만한 풋내기의 헛소리는 무시하고 오직 전선 방어와 부하들의 생존에만 집중한다",
        effect: {
          text: "실적과 살아남은 부하들의 신뢰가 그 어떤 변명보다 강하게 진실을 증명했다.",
          stats: { WP: 5, Int: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Astra Militarum / Ciaphas Cain & Gaunt's Ghosts Lore"
  },

  // -------------------------------------------------------------------------
  // 6-2. 소외 네임드 행성 3곳 집중 보강 (6종: 화성 2 · 마크라그 2 · 녹턴 2)
  // -------------------------------------------------------------------------
  {
    id: "ev_s6_world_mars_noctis",
    title: "화성 녹티스 미궁 — 봉인된 붉은 모래 지하의 금지 신호",
    category: "행성 고유 심화",
    once: true,
    req: { minAge: 16, anyWorlds: ["mars"] },
    reqLabel: "거주 행성: 화성 (Mars)",
    weight: 32,
    text: "화성 적도 부근의 거대한 협곡 지대 '녹티스 미궁(Noctis Labyrinthus)'은 고대부터 황제와 화성 대현자들만이 출입을 통제하는 금단의 땅이다. 오늘 밤 측량 임무 도중, 봉인된 지하 수 킬로미터 아래에서 설명할 수 없는 황금빛 전자기 맥동과 오래된 기계의 꿈틀거림이 계측기에 포착되었다.",
    choices: [
      {
        label: "[지성 판정] 신호의 출처를 직접 파헤치지 않고 파형만 정밀 암호화해 화성 최상위 아크마고스 회의에 극비 보고한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금기를 깨지 않으면서도 결정적 이상 징후를 포착한 공로로 화성 대서고의 특별 접근 인가를 받았다!",
          stats: { Int: 8, Inf: 7, WP: 4 }
        },
        fail: {
          text: "계측기 회로가 정체불명의 전자기 펄스에 타 버리며 손에 화상을 입었으나, 기밀 유출은 막았다.",
          wounds: -12,
          stats: { Int: 4 }
        }
      },
      {
        label: "[의지 판정] 머릿속으로 스며드는 기묘한 강철의 꿈을 뿌리치고 즉시 봉인 경계선을 두 배로 넓힌다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "정체 모를 '용의 잠'을 건드리지 않은 냉철한 판단이었다! 화성 수비 사제단이 그대의 정신력을 높이 평가했다.",
          stats: { WP: 8, T: 4, Inf: 5 }
        },
        fail: {
          text: "며칠간 금속 톱니가 살을 파고드는 기괴한 악몽에 시달리며 기력을 소모했다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "측량 기록을 표준 교리에 따라 즉시 삭제하고 녹티스 미궁 경계에서 조용히 철수한다",
        effect: {
          text: "화성에서 오래 살아남는 비결은 황제가 잠재워 둔 비밀에 호기심을 품지 않는 것이다.",
          stats: { WP: 5, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Noctis Labyrinthus / Mechanicum"
  },
  {
    id: "ev_s6_world_mars_titan_walk",
    title: "화성 신기계 군단 — 임페라토르 타이탄의 첫 걸음과 성유 의례",
    category: "행성 고유 심화",
    once: true,
    req: { minAge: 16, anyWorlds: ["mars"] },
    reqLabel: "거주 행성: 화성 (Mars)",
    weight: 30,
    text: "수백 년의 건조 끝에 마침내 성당 하나를 통째로 어깨에 얹은 초거대 전투 병기 '임페라토르급 타이탄'이 올림푸스 몬스 인근 조립 독에서 첫 걸음을 내딛는다. 대지가 지진처럼 흔들리고 전쟁 나팔이 붉은 하늘을 찢는 순간, 타이탄 왼쪽 다리 관절의 보조 냉각 밸브에서 고압 증기가 새어 나오기 시작했다.",
    choices: [
      {
        label: "[민첩 판정] 거대한 강철 발걸음의 진동을 뚫고 정비 크레인에 매달려 비상 냉각 밸브를 수동 잠금한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "신기계의 첫 행진을 흠집 없이 지켜 냈다! 프린셉스가 타이탄 확성기로 그대의 용기를 찬양하는 웅장한 경적을 울렸다.",
          stats: { Ag: 7, Int: 5, Inf: 7 },
          faith: 6
        },
        fail: {
          text: "고압 증기에 데이고 진동에 튕겨 나가 타박상을 입었으나, 밸브 폐쇄에는 성공했다.",
          wounds: -16,
          stats: { Ag: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 지상 관제실에서 노오스피어 경고 회로를 우회해 압력을 보조 탱크로 즉시 분산시킨다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "단 한 초의 지연도 없이 출격 의례가 완벽히 진행되었다! 타이탄 군단(콜레기아 타이타니카)의 찬사를 받았다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "일부 센서가 오작동해 출격이 지연되었으나, 타이탄 본체의 손상은 막아 냈다.",
          stats: { Int: 4 }
        }
      },
      {
        label: "붉은 모래 위에 무릎을 꿇고 옴니시아의 살아 있는 화신이 전장으로 떠나는 장엄한 의례에 경배를 올린다",
        effect: {
          text: "거대한 신기계의 발자국이 가슴 깊이 울렸다. 인류제국과 기계교의 위엄을 뼈저리게 느꼈다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Collegia Titanica / Mars Lore"
  },
  {
    id: "ev_s6_world_macragge_hera",
    title: "마크라그 헤라의 요새 — 대리석 광장의 시민 평의회와 500세계의 자부심",
    category: "행성 고유 심화",
    once: true,
    req: { minAge: 16, anyWorlds: ["macragge"] },
    reqLabel: "거주 행성: 마크라그 (Macragge)",
    weight: 30,
    text: "눈 덮인 봉우리 아래 대리석 기둥이 늘어선 마크라그 시비타스. 제국의 다른 하이브 월드와 달리 질서와 실용주의가 살아 숨 쉬는 이곳 시민 평의회에서, 전란으로 몰려든 울트라마르 외곽 피난민들의 정착 예산과 방위군 증편안을 놓고 격론이 벌어지고 있다.",
    choices: [
      {
        label: "[교섭 판정] 피난민의 기술 인력을 즉시 방어선 보수와 공방 생산에 편입하는 상생 법안을 발의해 통과시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "질서와 자비가 조화를 이룬 울트라마르다운 해법! 평의회 의원들이 기립 박수를 보내며 그대의 이름을 시정에 새겼다.",
          stats: { Fel: 7, Int: 5, Inf: 7 }
        },
        fail: {
          text: "예산 분배를 둘러싼 구역 대표들의 반발로 법안이 반쪽짜리로 수정되었으나, 구호소 설치만은 관철했다.",
          stats: { Fel: 4, Inf: 2 }
        }
      },
      {
        label: "[지성 판정] 500세계 표준 병참표를 대조해 낭비되는 관청 지출을 도려내고 방위군 장비 현대화 재원을 마련한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "흠잡을 데 없는 효율성에 울트라마르 보좌관들이 감탄했다! 길리먼의 행정 철학이 살아 있음을 증명했다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "감사 과정에서 일부 관료들의 반감을 샀으나, 방위군 예산 증액만은 이루어 냈다.",
          stats: { Int: 4 }
        }
      },
      {
        label: "평의회 방청석에서 묵묵히 토론을 경청하며 마크라그의 법과 질서가 지탱되는 원리를 배운다",
        effect: {
          text: "광신만이 아니라 체계와 합리가 제국을 지킬 수 있음을 눈으로 확인했다.",
          stats: { Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Macragge / Ultramar Lore"
  },
  {
    id: "ev_s6_world_macragge_polar",
    title: "마크라그 북극 요새 추모 — 제1중대 전원 옥쇄의 절벽",
    category: "행성 고유 심화",
    once: true,
    req: { minAge: 18, anyWorlds: ["macragge"] },
    reqLabel: "거주 행성: 마크라그 (Macragge)",
    weight: 30,
    text: "칼바람이 휘몰아치는 마크라그 북극 방어 요새 유적. 745.M41 제1차 타이라니드 전쟁 당시, 울트라마린 제1중대 베테랑 전원 한 명도 물러서지 않고 최후까지 싸워 전멸했던 전설의 절벽 앞에 그대가 섰다. 눈보라 속에서 고대 볼터 탄피 하나가 발끝에 걸렸다.",
    choices: [
      {
        label: "[강인 판정] 영하의 빙벽을 맨손으로 올라 제1중대 추모비 정상에 경건히 헌화하고 밤새 불침번을 선다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "동상 직전의 추위를 이겨 내고 새벽빛 속에 경례를 올렸다. '용기와 명예'의 뜻이 뼛속까지 각인되었다!",
          stats: { T: 6, WP: 7, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "빙판에 미끄러져 다리를 다쳤으나 끝내 추모비 앞에 무릎을 꿇고 경의를 바쳤다.",
          wounds: -12,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 전멸 직전까지 방진을 지켰던 제1중대의 최후 방어 기록을 낭독하며 후배 장병들의 결의를 다진다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "눈보라를 뚫고 울려 퍼진 추모사에 함께 오른 참배객 모두가 숙연하게 눈시울을 적셨다.",
          stats: { WP: 7, Fel: 6 },
          faith: 8
        },
        fail: {
          text: "거센 바람에 목소리가 흩어졌으나, 마음속 다짐만큼은 단단해졌다.",
          stats: { WP: 4 },
          faith: 4
        }
      },
      {
        label: "탄피를 제자리에 조용히 돌려놓고 말없이 목례한 뒤 빙원을 내려온다",
        effect: {
          text: "영웅들의 희생 위에 오늘의 평온이 서 있음을 조용히 되새겼다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Battle for Macragge / Polar Fortress"
  },
  {
    id: "ev_s6_world_nocturne_time_of_trial",
    title: "녹턴의 '시련의 계절' — 갈라지는 용암 지각과 지하 피난처",
    category: "행성 고유 심화",
    once: true,
    req: { minAge: 15, anyWorlds: ["nocturne"] },
    reqLabel: "거주 행성: 녹턴 (Nocturne)",
    weight: 32,
    text: "거대한 위성 프로메테우스가 녹턴에 최근접하며 15년 주기의 대격변 '시련의 계절(Time of Trial)'이 시작되었다! 대지가 갈라지고 화산재가 하늘을 가리는 가운데, 외곽 광산 마을의 피난 행렬이 흘러내리는 용암 줄기에 가로막혀 고립되었다.",
    choices: [
      {
        label: "[강인 판정] 뜨거운 화산재 폭풍과 유독 가스를 견디며 직접 밧줄 다리를 매어 고립된 주민들을 건너오게 한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "피부가 벗겨지는 열기를 이겨 내고 마을 사람 전원을 성채 도시 안으로 이끌었다! 녹턴인의 불굴의 의지였다.",
          stats: { T: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "튀어 오른 용암 불티에 심한 화상을 입었으나 마지막 아이까지 안전지대로 넘겨 보냈다.",
          wounds: -18,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 지각 균열의 방향을 읽어 내어 용암 흐름을 빈 협곡 쪽으로 돌릴 비상 방화 제방을 급조한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "폭약과 흑요석 바위로 용암의 진로를 정확히 틀어 마을의 대장간과 식량 창고까지 온전히 지켜 냈다!",
          stats: { Int: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "제방 일부가 무너지며 열풍에 휩쓸렸으나, 주민들이 대피할 귀중한 시간을 벌어 주었다.",
          wounds: -14,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "성채 지하 피난처의 산소 여과기와 식수 탱크를 지키며 화산 겨울을 버틸 준비에 집중한다",
        effect: {
          text: "녹턴의 주민은 자연의 분노 앞에서 패닉에 빠지지 않는다. 침착한 대비로 시련의 계절을 넘겼다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Nocturne / Time of Trial"
  },
  {
    id: "ev_s6_world_nocturne_salamander_kin",
    title: "녹턴의 성채 마을 — 숯빛 거인이 고향 대장간을 찾아온 밤",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["nocturne"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "거주 행성: 녹턴 (필멸자 주민)",
    weight: 32,
    text: "다른 수많은 챕터와 달리 샐러맨더는 고향의 필멸자 씨족과 연을 끊지 않는다. 화산재가 날리는 저녁, 숯처럼 검은 피부에 붉게 빛나는 눈동자를 지닌 거대한 배틀 브라더 한 명이 파워 아머를 벗고 평범한 가죽 앞치마를 두른 채 마을 대장간에 찾아와 낡은 농기구와 방벽 경첩 수리를 돕고 있다.",
    choices: [
      {
        label: "[지성 판정] 거인의 옆에서 풀무질을 도우며 프로메테안 금속 제련과 화염 단조의 비결을 정중히 묻는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "샐러맨더 전사가 굵고 따뜻한 웃음을 터뜨리며 강철의 결을 읽는 법을 손수 가르쳐 주었다! 평생의 기술이 몸에 배었다.",
          stats: { Int: 7, T: 5, Inf: 4 }
        },
        fail: {
          text: "초인의 망치질을 따라가다 손목이 뻐근해졌으나, 거인의 넉넉한 격려에 용기를 얻었다.",
          stats: { T: 4, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 바깥 은하의 전쟁 이야기와 녹턴 마을이 버텨 낸 소식을 나누며 진심 어린 감사를 전한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "천사 같은 초인이 필멸자의 손을 조심스럽게 맞잡으며 '우리가 싸우는 이유는 바로 이 마을의 불빛 때문'이라 답했다.",
          stats: { Fel: 7, WP: 6 },
          faith: 8
        },
        fail: {
          text: "초인의 압도적인 체격 앞에 말이 잠시 막혔으나, 따뜻한 눈빛 덕분에 긴장이 풀렸다.",
          stats: { Fel: 4, WP: 3 }
        }
      },
      {
        label: "대장간 한쪽에 신선한 물과 말린 고기를 말없이 놓아두고 묵묵히 자신의 일감을 다듬는다",
        effect: {
          text: "샐러맨더 전사가 떠나기 전 그대의 공구를 손수 벼려 두고 갔다. 녹턴만의 소중한 유대였다.",
          stats: { T: 4, WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Salamanders / Nocturne Sanctuary Cities"
  },

  // -------------------------------------------------------------------------
  // 6-3. 9대 챕터 간 숙원 · 교차 공조 분기 사건 (4종)
  // -------------------------------------------------------------------------
  {
    id: "ev_s6_chap_rivalry_da_sw",
    title: "라이온과 늑대의 전통 — 다크 엔젤과 스페이스 울프의 명예 결투",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["dark_angels", "space_wolves"]
    },
    reqLabel: "챕터: 다크 엔젤 또는 스페이스 울프",
    weight: 36,
    text: "합동 원정 작전 직전, 다크 엔젤과 스페이스 울프 타격 순양함이 같은 궤도에 나란히 정박했다. 1만 년 전 두 프라이마크 라이온 엘 존슨과 리만 러스의 격돌 이래 내려온 오래된 관습에 따라, 양 챕터 대표 전사가 첫 피가 흐를 때까지 겨루는 의례적 명예 결투의 차례가 돌아왔다. 형제들의 시선이 그대에게 모였다.",
    choices: [
      {
        label: "[백병 판정] 챕터의 자존심을 걸고 검을 뽑아 상대 챕터 투사와 정정당당한 첫 피(First Blood) 결투에 나선다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불꽃 튀는 공방 끝에 상대의 어깨 장갑을 정확히 베어 냈다! 두 챕터 형제들 모두 호쾌한 환호와 함께 서로의 무예에 경의를 표했다.",
          stats: { WS: 8, WP: 5, Inf: 7 }
        },
        fail: {
          text: "상대의 거센 반격에 뺨에 첫 피를 내어 주며 패배했으나, 굴복 없는 기백을 인정받아 굳건한 전우애를 맺었다.",
          wounds: -12,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 치명적 부상을 피하기 위해 무장 대신 맨손 격투로 승부를 제안해 두 프라이마크의 혈투를 재현한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "수십 분의 난타전 끝에 두 거인이 나란히 웃음을 터뜨리며 쓰러졌다! 1만 년 묵은 앙금이 유쾌한 연대로 녹아내렸다.",
          stats: { T: 8, WS: 5, Fel: 5, Inf: 6 }
        },
        fail: {
          text: "갈비뼈에 금이 가는 묵직한 강타를 맞았으나 끝까지 웃으며 버텨 상대의 존중을 얻었다.",
          wounds: -15,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "전통의 예를 갖춘 뒤 실전 작전 브리핑으로 화제를 돌려 두 챕터의 협동 타격 계획을 조율한다",
        effect: {
          text: "허영보다 승리를 앞세운 냉철한 자세 덕분에 합동 강하 작전이 완벽한 호흡으로 전개되었다.",
          stats: { Int: 5, WP: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Lion El'Jonson & Leman Russ Honor Duel"
  },
  {
    id: "ev_s6_chap_rivalry_um_bt",
    title: "코덱스냐 성전이냐 — 울트라마린과 블랙 템플러의 합동 작전 충돌",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["ultramarines", "black_templars"]
    },
    reqLabel: "챕터: 울트라마린 또는 블랙 템플러",
    weight: 36,
    text: "이단 요새 공략을 앞두고 울트라마린 중대와 블랙 템플러 성전군이 합동 작전실에 마주 앉았다. 《코덱스 아스타르테스》의 정밀 포위·보급 차단 교리를 고집하는 측과, 지기스문트의 정신을 이어 즉각적인 쇄도와 적 수괴 참수를 외치는 측이 팽팽하게 맞서며 회의가 얼어붙었다.",
    choices: [
      {
        label: "[지성 판정] 울트라마린의 정밀 포격으로 성벽을 붕괴시키는 동시에 블랙 템플러가 돌파구로 쇄도하는 절충안을 설계한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "이성과 광신이 완벽한 망치와 모루로 결합했다! 이단 요새가 반나절 만에 함락되며 양 챕터 모두가 그대의 전략안을 극찬했다.",
          stats: { Int: 8, Inf: 7, BS: 4 }
        },
        fail: {
          text: "작전 개시 시점이 엇갈려 혼선이 빚어졌으나, 양 챕터의 압도적 무력으로 가까스로 승리했다.",
          wounds: -14,
          stats: { Int: 4, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 교리 논쟁을 일갈하며 '우리 모두 황제의 아들이자 같은 인류의 방패'라는 대의로 지휘부를 다잡는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "서로 날을 세우던 두 챕터의 지휘관이 고개를 끄덕이며 공동 출격을 선포했다!",
          stats: { WP: 8, Fel: 6, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "끝내 서로의 방식을 존중한 채 독자 구역으로 갈라져 싸워야 했으나, 내분만은 막았다.",
          stats: { WP: 5 }
        }
      },
      {
        label: "소속 챕터의 교리에 충실하게 맡은 구역의 전투만 묵묵히 완수해 결과로 증명한다",
        effect: {
          text: "말다툼 대신 완벽한 전과로 상대 챕터의 말없는 경의를 이끌어 냈다.",
          stats: { WS: 4, BS: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Codex Astartes / Black Templars & Ultramarines Lore"
  },
  {
    id: "ev_s6_chap_rivalry_sal_civilians",
    title: "필멸자 피난선과 요새 방어 — 아스타르테스 합동 지휘부의 윤리 충돌",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders", "imperial_fists", "blood_angels"]
    },
    reqLabel: "챕터: 샐러맨더 · 임페리얼 피스트 · 블러드 엔젤",
    weight: 34,
    text: "궤도 폭격이 임박한 하이브 도시의 최후 방어전. 냉혹한 제국 사령부는 민간 피난 공항을 포기하고 궤도 방어 포대 하나에 전 병력을 집중하라고 권고한다. 그러나 그대의 챕터는 인류를 지키기 위해 태어난 천사들이다. 공항에는 아직 수만 명의 피난민이 수송선을 기다리고 있다.",
    choices: [
      {
        label: "[강인 판정] 분대를 둘로 나누어 스스로 공항 방어선에 남아 마지막 피난선이 대기권을 벗어날 때까지 버틴다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "포연 속으로 마지막 수송선이 솟아올랐고, 궤도 포대마저 지켜 냈다! 생존한 시민들이 챕터의 문장을 향해 눈물로 경배했다.",
          stats: { T: 8, WP: 7, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "집중 포화에 갑주가 반파되는 중상을 입었으나, 피난선 대다수가 탈출할 시간을 벌어 냈다.",
          wounds: -22,
          stats: { T: 5, WP: 5 },
          faith: 6
        }
      },
      {
        label: "[사격 판정] 궤도 방어 포대의 대공 사격을 정밀 조율해 적 폭격 편대를 공항 상공 진입 전에 요격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "전략 요충지와 민간인 공항을 동시에 지키는 완벽한 방공 화망이었다! 합동 지휘부가 경탄을 금치 못했다.",
          stats: { BS: 8, Int: 5, Inf: 6 }
        },
        fail: {
          text: "적 요격기 일부가 돌파해 피해가 발생했으나, 공항 활주로 파괴만은 막아 냈다.",
          wounds: -14,
          stats: { BS: 4, Int: 3 }
        }
      },
      {
        label: "전술적 손실을 냉정히 계산해 궤도 포대 사수를 최우선으로 두고 공항 쪽은 잔여 방위군에 엄호를 맡긴다",
        effect: {
          text: "가슴 아픈 결단이었으나 궤도 방어망을 지켜 행성 전체의 함락을 막아 냈다.",
          stats: { WP: 6, Int: 5 }
        }
      }
    ],
    source: "Lexicanum: Salamanders / Blood Angels / Imperial Fists Lore"
  },
  {
    id: "ev_s6_chap_rivalry_rg_ws",
    title: "그림자와 번개의 협공 — 레이븐 가드와 화이트 스카의 합동 기습전",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard", "white_scars"]
    },
    reqLabel: "챕터: 레이븐 가드 또는 화이트 스카",
    weight: 36,
    text: "거대한 반란군 기갑 사단을 상대로 레이븐 가드와 화이트 스카가 합동 타격 작전에 돌입했다. 정면 공성전 대신, 어둠 속 침투와 번개 같은 기동 기습이 맞물리는 완벽한 2중 함정 작전이다. 단 1초라도 타이밍이 어긋나면 선봉대가 적 중전차 포화에 갈려 나갈 절체절명의 기동전이다.",
    choices: [
      {
        label: "[민첩 판정] 무선 침묵을 지킨 채 정확한 초 단위 호흡으로 적 통신탑 폭파와 기갑 돌격을 완벽히 동기화한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "그림자가 눈을 가리고 번개가 심장을 꿰뚫었다! 적 기갑 사단이 반격 한 번 제대로 못 해 보고 와해되었다.",
          stats: { Ag: 8, WS: 5, Inf: 7 }
        },
        fail: {
          text: "적 대공포의 예기치 못한 사격에 궤도가 흔들려 부상을 입었으나, 기습 돌파 자체는 성공시켰다.",
          wounds: -16,
          stats: { Ag: 5, T: 3 }
        }
      },
      {
        label: "[지성 판정] 적 지휘부가 예상할 퇴로에 미리 기만 신호를 흘려 적 예비대까지 통째로 살상 지대로 유인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "코락스의 계략과 자가타이 칸의 속도가 완벽히 결합한 전설적 섬멸전으로 코덱스 전사에 기록되었다!",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "기만 신호 일부가 들통나 치열한 추격전을 치렀으나, 적 지휘부 붕괴에는 성공했다.",
          wounds: -14,
          stats: { Int: 4, Ag: 4 }
        }
      },
      {
        label: "무리한 추격을 멈추고 적 보급 창고와 연료 탱크만 깔끔하게 불태운 뒤 흔적 없이 이탈한다",
        effect: {
          text: "발이 묶인 적 기갑 사단은 사흘 만에 스스로 항복했다. 최소 피해로 최대 전과를 올린 교본 같은 기습전이었다.",
          stats: { Ag: 5, Int: 5, BS: 3 }
        }
      }
    ],
    source: "Lexicanum: Raven Guard / White Scars / Damocles Campaign"
  }
);
