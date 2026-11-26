// 분기 사건 — 다크 엔젤 전용 (1:1 단독 승격)
export default [
  {
    id: "ev_chap_dark_angels",
    title: "다크 엔젤 — 폴른의 그림자와 이너 서클",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["dark_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "챕터: 다크 엔젤",
    weight: 34,
    text: "제국군 연합 작전 도중, 무너진 성당 폐허에서 1만 년 전 대성전 시절의 검은 파워 아머를 입은 정체불명의 아스타르테스가 포착되었다. 인터로게이터-채플린이 암호 채널로 속삭인다. '우군에게 알리지 마라. 지금 당장 그 자를 생포하라.'",
    choices: [
      {
        label: "[의지 판정] 제국 동맹군을 속여 현장을 봉쇄하고 검은 갑주의 배반자를 생포한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "'회개하라! 내일이면 그대는 죽으리니!' 극비리에 목표를 생포해 '더 락' 지하 감방으로 이송했다. 챕터 고위층이 그대의 침묵을 인정해 비밀 결사 '이너 서클'의 문턱을 열어 주었다!",
          stats: { WP: 6, Int: 6, Inf: 6 },
          addTags: ["inner_circle"]
        },
        fail: {
          text: "치열한 플라즈마 교전 끝에 목표를 놓쳤고, 잿더미만 남은 현장에 의구심 어린 동맹군 장교들의 시선이 쏟아졌다.",
          wounds: -20,
          stats: { Inf: -4, BS: 3 }
        }
      },
      {
        label: "비밀 사냥보다 현재 아군 전선의 사수를 우선해 정면 돌파를 지휘한다",
        effect: {
          text: "제국군 수만 명을 구해 냈으나, 인터로게이터-채플린의 싸늘한 눈초리가 오랫동안 등 뒤에 머물렀다.",
          stats: { BS: 4, Fel: 4, Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: The Fallen / Codex Supplement: Dark Angels"
  },
  {
    id: "ev_chap2_dark_angels",
    title: "다크 엔젤 — 데스윙 골백색 터미네이터의 시험",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["dark_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "챕터: 다크 엔젤",
    weight: 28,
    text: "제1중대 '데스윙'의 골백색 터미네이터 갑주들이 침묵 속에 그대를 둘러쌌다. 챕터 최고 정예 중대인 데스윙의 전사는 최악의 적진에 텔레포트 강습할 무위뿐만 아니라, 제1군단이 1만 년간 짊어진 비밀을 무덤까지 지킬 철의 의지를 증명해야 한다.",
    choices: [
      {
        label: "[의지 판정] 인터로게이터-채플린의 혹독한 정신 감찰과 데스윙 근접 시험을 정면 돌파한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "티끌 없는 충성과 강철 같은 침묵을 증명했다! 골백색 터미네이터 갑주에 버금가는 제1중대 영예 표식을 하사받았다!",
          stats: { WP: 7, WS: 6, T: 5, Inf: 6 },
          addTags: ["inner_circle"]
        },
        fail: {
          text: "모의 텔레포트 강습 시험에서 치명적인 반격을 허용해 다음 기회를 기약해야 했다.",
          wounds: -18,
          stats: { WP: 4, WS: 3 }
        }
      },
      {
        label: "데스윙 입단 대신 고속 추격 중대 '레이븐윙'의 기동 정찰 훈련에 자원한다",
        effect: {
          text: "칠흑 같은 바이크와 랜드 스피더 편대 속에서 번개 같은 추적 감각을 익혔다.",
          stats: { Ag: 6, BS: 5, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Deathwing / Codex Supplement: Dark Angels"
  },
  {
    id: "ev_arc_inner_circle_hunt",
    title: "이너 서클의 비밀 칙령 — '더 락' 최심부의 회개 심문",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "inner_circle"],
      anyChapters: ["dark_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "다크 엔젤 · 이너 서클",
    weight: 40,
    text: "이동 요새 '더 락'의 빛 한 점 들지 않는 지하 석실로 비밀 소집령이 떨어졌다. 제국 이단심문관조차 눈치채지 못하게 생포해 온 고대의 폴른 한 명이 철제 의자에 묶인 채, 1만 년 전 칼리반 파괴의 진실을 비웃으며 입을 다물고 있다.",
    choices: [
      {
        label: "[의지 판정] 인터로게이터-채플린을 보좌해 폴른의 기만과 회개를 가려내며 제1군단의 명예를 지킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "흔들림 없는 신념으로 폴른의 궤변을 꺾고 마침내 회개의 자백과 배후 워밴드의 좌표를 받아 냈다! 이너 서클 내 위상이 굳건해졌다.",
          stats: { WP: 8, Int: 6, Inf: 8 }
        },
        fail: {
          text: "폴른이 뱉어 낸 칼리반의 저주와 기습적인 사이킥 발악에 큰 충격을 입었으나, 비밀만은 새어 나가지 않았다.",
          wounds: -16,
          corruption: 5
        }
      },
      {
        label: "[사격 판정] 데스윙 텔레포트 타격대를 이끌어 제국 동맹군이 도착하기 전에 폴른의 잔여 은신처를 완전히 지운다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "골백색 터미네이터 갑주의 압도적인 스톰 볼터 화력으로 흔적 하나 남기지 않고 비밀 작전을 완수했다!",
          stats: { BS: 7, WS: 5, Inf: 8 }
        },
        fail: {
          text: "은신처 자폭 함정에 휘말려 부상을 입었고, 철수 과정에서 제국군 사령관의 의심을 가까스로 무마했다.",
          wounds: -20,
          stats: { Inf: -3 }
        }
      },
      {
        label: "어떤 제국 기관에도 비밀이 새지 않도록 작전 기록 전체를 봉인하고 침묵의 서약을 되새긴다",
        effect: {
          text: "어둠 속의 감시자가 조용히 문서를 수거해 사라졌다. 비밀을 지키는 것이 곧 다크 엔젤의 영원한 속죄다.",
          stats: { WP: 5, Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Inner Circle / Codex Supplement: Dark Angels"
  },
  {
    id: "ev_s16_ch1_da_1",
    title: "다크 엔젤 — 레이븐윙 고속 바이크 중대의 밤안개 추격전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["dark_angels"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "배틀 브라더 이상 · 챕터: 다크 엔젤",
    weight: 32,
    text: "짙은 밤안개가 깔린 폐허 행성의 고속 도로망 위로 제2중대 레이븐윙의 칠흑 같은 전투 바이크 편대가 굉음을 내며 질주한다. 정체불명의 암호 발신지를 쫓아온 끝에, 무너진 고가도로 너머로 비밀 표적의 장갑 수송 차량이 시야에 포착되었다. 표적이 성계 궤도로 도주하기 전에 생포해야 한다.",
    choices: [
      {
        label: "[민첩 판정] 안개 속 붕괴 구간을 최고 속도로 도약해 바이크 측면을 바짝 붙이며 표적 차량의 동력부를 절단한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "검은 깃발이 밤안개를 가르며 표적 차량을 단숨에 전복시켰다! 제국 동맹군이 눈치채기 전에 표적을 완벽히 생포해 이송했다.",
          stats: { Ag: 8, WS: 5, Inf: 6 }
        },
        fail: {
          text: "파손된 교각 파편에 바이크가 미끄러지며 강하게 전복되어 갑주가 크게 부서지고 부상을 입었다.",
          wounds: -20,
          stats: { Ag: 3, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 고속 질주 중 플라즈마 탈론 정밀 사격으로 표적의 호위 차량만 무력화하고 텔레포트 유도 비컨을 투하한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "단 한 발의 오차도 없는 플라즈마 사격이 호위대를 소멸시켰고, 비컨의 신호와 함께 데스윙 타격대가 내려와 표적을 완벽히 포획했다!",
          stats: { BS: 7, Int: 5, Inf: 6 },
          addTags: ["inner_circle"]
        },
        fail: {
          text: "과열된 플라즈마 코일이 역화하며 화상을 입었고, 그 틈에 표적이 안개 속으로 거리를 벌리고 말았다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[지성 판정] 표적의 도주 경로와 폐허 지형을 역산해 전 편대를 포위망으로 전개하고 퇴로를 원천 봉쇄한다",
        req: { anyTags: ["inner_circle", "astartes_sergeant", "astartes_captain", "chapter_master"] },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 한 방의 불필요한 총성도 울리지 않고 표적을 독 안에 든 쥐로 만들었다! 레이븐윙의 사냥 교리가 교과서처럼 완성되었다.",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "표적이 설치한 위장 발신기에 포위망 한쪽이 뚫리며 추격전이 길어졌고, 교전 끝에 상처를 입었다.",
          wounds: -15,
          stats: { Inf: -2 }
        }
      },
      {
        label: "선두 추격조의 후방을 엄호하며 제국군 순찰대가 비밀 작전 구역에 접근하지 못하도록 외곽을 통제한다",
        effect: {
          text: "한 치의 누설도 허락하지 않는 다크 엔젤의 침묵을 완벽히 지켜 냈다.",
          stats: { WP: 5, Ag: 4, Int: 4 }
        }
      }
    ],
    source: "Codex Supplement: Dark Angels / Ravenwing / Lexicanum: Ravenwing"
  },
  {
    id: "ev_s16_ch1_da_2",
    title: "다크 엔젤 — 더 락 최심부의 와처스 인 더 다크와 고대 성유물 호위",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["dark_angels"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 다크 엔젤",
    weight: 30,
    text: "이동 요새 '더 락'의 지도에조차 표시되지 않은 최심부 암반 회랑. 고대 성유물을 무기고로 호위하던 그대의 발걸음 앞에, 짙은 수도복 후드를 깊게 눌러쓴 작은 존재 '와처스 인 더 다크' 둘이 소리 없이 모습을 드러냈다. 그들은 아무 말 없이 오래된 칼리반 문양이 새겨진 봉인 성유물함을 향해 손을 뻗고 있다.",
    choices: [
      {
        label: "[의지 판정] 호기심과 의구심을 완전히 억누르고 제1군단의 오래된 불문율에 따라 후드 아래를 보지 않은 채 경건히 길을 내어 준다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "침묵의 감시자가 고개를 가볍게 끄덕인 뒤 성유물함에 고대의 가호를 남기고 어둠 속으로 사라졌다. 그 순간 그대의 정신을 짓누르던 모든 워프의 잔향이 말끔히 씻겨 나갔다!",
          stats: { WP: 8, Int: 4, Inf: 5 },
          faith: 10,
          corruption: -10
        },
        fail: {
          text: "어둠 너머의 정체를 엿보려던 찰나 뼈를 얼리는 듯한 정신적 압박이 밀려와 한쪽 무릎을 꿇으며 극심한 두통을 견뎌야 했다.",
          wounds: -14,
          stats: { WP: -2 }
        }
      },
      {
        label: "[지성 판정] 성유물함의 봉인 문양과 회랑의 고대 암각을 대조해 감시자들이 이끄는 숨겨진 성유물 안치실을 파악한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "1만 년 전 옛 칼리반 시절의 잊힌 성유물 보관고로 이어지는 안전 경로를 확인했다! 고위 채플린이 그대의 냉철한 관찰력을 높이 평가했다.",
          stats: { Int: 7, WP: 5, Inf: 6 }
        },
        fail: {
          text: "고대 방어 룬의 오작동으로 회랑의 정지장 충격파에 휘말려 부상을 입고 성유물 호위 보고를 지연시켰다.",
          wounds: -16,
          stats: { Inf: -2 }
        }
      },
      {
        label: "[권위 판정] 이너 서클과 성직단의 서약을 읊으며 와처스 인 더 다크와 함께 고대 성유물을 최심부 성소까지 직접 호위한다",
        req: { anyTags: ["inner_circle", "role_chaplain", "role_librarian"] },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "감시자들이 침묵 속에 그대의 호위를 받아들였다! 제1군단의 가장 깊은 비밀과 맞닿은 이 밤의 기억은 오직 침묵으로만 지켜질 것이다.",
          stats: { WP: 7, Int: 6, Inf: 8 },
          corruption: -8
        },
        fail: {
          text: "최심부 성소 문턱에서 알 수 없는 정적에 압도되어 성유물 봉인 절차에서 실수를 범하고 침묵의 근신을 명받았다.",
          stats: { Inf: -3, WP: -2 }
        }
      },
      {
        label: "어떤 질문도, 개입도 하지 않은 채 지정된 경계 구역에서 부동자세로 회랑의 침묵만을 수호한다",
        effect: {
          text: "다크 엔젤에게 가장 귀한 미덕은 묻지 않는 충성이다. 감시자들이 사라진 뒤 성유물함은 티끌 하나 없이 무사했다.",
          stats: { WP: 5, T: 4, Inf: 3 },
          corruption: -5
        }
      }
    ],
    source: "Codex Supplement: Dark Angels / Lexicanum: Watchers in the Dark"
  },
  {
    id: "ev_s16_ch1_da_3",
    title: "다크 엔젤 — 리즌 전사와의 대면과 숲의 사자가 내린 새 칙령",
    category: "챕터 고유",
    once: true,
    req: {
      minYear: 1020,
      greatRift: true,
      allTags: ["astartes"],
      anyChapters: ["dark_angels"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "020.M42 이후 · 대균열 이후 · 챕터: 다크 엔젤",
    weight: 34,
    text: "1만 년의 잠에서 깨어난 프라이마크 라이온 엘 존슨이 더 락에 복귀하며 제1군단의 역사가 송두리째 뒤바뀌었다. 작전 집결지에 1만 년 전 옛 칼리반 시절의 검은 갑주를 걸친 노전사 한 명이 들어섰다. 카오스에 물들지 않았음을 인정받아 프라이마크에게 직접 사면받은 '용서받은 자' 리즌 전사다. 1만 년간 이어 온 폴른 사냥의 규율과 사자의 새 칙령 사이에서 중대 전체에 팽팽한 침묵이 흐른다.",
    choices: [
      {
        label: "[의지 판정] 1만 년간 배워 온 의심을 내려놓고 라이온 엘 존슨의 새 칙령에 따라 리즌 전사를 형제로 받아들여 합동 출격에 나선다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "옛 칼리반의 검술과 현재 다크 엔젤의 화력이 전장에서 하나가 되었다! 리즌 전사가 전투 후 묵묵히 가슴을 두드리며 제1군단의 진정한 재결합을 기렸다.",
          stats: { WP: 8, WS: 6, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "오랜 경계심을 완전히 지우지 못해 합동 작전 중 호흡이 어긋났고, 적의 역습에 적지 않은 부상을 입은 뒤에야 신뢰의 벽을 깨달았다.",
          wounds: -18,
          stats: { Fel: -2, WP: 2 }
        }
      },
      {
        label: "[백병 판정] 말보다 칼날로 진심을 확인하겠다며 대련장에서 리즌 노전사와 대성전 시절의 검술로 정면 승부를 청한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "1만 년 전 프라이마크 곁에서 싸웠던 고대 검술의 진수를 온몸으로 받아 내며 호각을 이뤘다! 노전사가 짧게 미소 지으며 칼리반의 고대 검격을 전해 주었다.",
          stats: { WS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "대성전 베테랑의 번개 같은 일격에 무기가 튕겨 나가며 묵직한 타박상을 입고 제1군단 선배의 깊이를 통감했다.",
          wounds: -16,
          stats: { WS: 4, Inf: -2 }
        }
      },
      {
        label: "[교섭 판정] 이너 서클의 오랜 번민을 안고 리즌 전사와 독대해 심문 교리의 변화와 프라이마크의 뜻을 중대 형제들에게 정리해 전한다",
        req: { anyTags: ["inner_circle", "role_chaplain"] },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "집착과 속죄의 1만 년을 넘어 이제는 인류 수호로 나아가라는 사자의 칙령이 중대 전체의 마음을 하나로 묶었다!",
          stats: { Fel: 8, WP: 6, Inf: 8 },
          faith: 8
        },
        fail: {
          text: "보수적 인터로게이터 형제들의 반발을 다독이는 과정에서 거센 언쟁이 벌어져 정치적 부담을 떠안았다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "개인적 감정을 배제한 채 리즌 전사의 작전 구역과 지휘 계통을 프라이마크의 칙령서 그대로 엄정히 기록하고 준수한다",
        effect: {
          text: "프라이마크의 말씀이 곧 제1군단의 법이다. 흔들리지 않는 군율 속에 중대가 차분히 새 시대를 맞이했다.",
          stats: { Int: 5, WP: 5, Inf: 5 }
        }
      }
    ],
    source: "The Lion: Son of the Forest / Codex Supplement: Dark Angels (10th Ed) / Lexicanum: The Risen"
  }
];
