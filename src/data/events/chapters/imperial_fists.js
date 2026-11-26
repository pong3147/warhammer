// 분기 사건 — 임페리얼 피스트 전용 (1:1 단독 승격)
export default [
  {
    id: "ev_chap_imperial_fists",
    title: "임페리얼 피스트 — 고통의 장갑과 무너지지 않는 성벽",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["imperial_fists"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "챕터: 임페리얼 피스트",
    weight: 34,
    text: "아이언 워리어 공성군의 맹포격 속에 외곽 요새 성벽 하나가 붕괴해 아군 포대가 후퇴했다. 임페리얼 피스트에게 후퇴는 수치다. 채플린이 신경기계 고문 장치 '고통의 장갑'을 가리키며 묻는다. '네 결함을 고통으로 태울 것인가, 성벽의 설계로 갚을 것인가?'",
    choices: [
      {
        label: "[강인 판정] 고통의 장갑에 몸을 맡겨 순수한 신경 고통 속에서 영혼을 단련한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "'테라와 로갈 돈을 위하여!' 뼈를 깎는 전류 속에서 단 한 번의 비명도 내지 않고 깨달음을 얻었다. 육신과 의지가 강철 요새처럼 단단해졌다!",
          stats: { T: 7, WP: 7, Inf: 4 },
          wounds: -12,
          addTags: ["huscarl_oath"]
        },
        fail: {
          text: "신경계 과부하로 기절해 아포세카리움으로 실려 갔다. 부끄러움 속에 재기를 다짐했다.",
          wounds: -24,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 붕괴된 요새의 화망을 재설계하고 최선두 참호에서 직접 역포격을 지휘한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "완벽한 교차 사격망이 반역 공성 전차대를 고철로 만들었다! 챕터 지휘부가 그대의 공성학 식견을 높이 평가했다.",
          stats: { BS: 6, Int: 5, Inf: 4 }
        },
        fail: {
          text: "적 박격포의 집중 사격을 받아 방패가 부서졌으나 끝내 성벽을 사수했다.",
          wounds: -18,
          stats: { T: 4 }
        }
      }
    ],
    source: "Lexicanum: Pain Glove / Codex Supplement: Imperial Fists"
  },
  {
    id: "ev_chap2_imperial_fists",
    title: "임페리얼 피스트 — 이동 요새 팔랑크스의 방어전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["imperial_fists"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 임페리얼 피스트",
    weight: 28,
    text: "인류제국 최대의 고대 이동 요새이자 달만 한 크기의 성간 성채 '팔랑크스'. 워프 폭풍을 뚫고 출현한 카오스 강습선들이 팔랑크스 외곽 3번 도킹 베이에 달라붙어 내부로 침투를 시도하고 있다!",
    choices: [
      {
        label: "[사격 판정] 황금 갑판의 자동 방어 포탑망과 볼터 화력을 통합 지휘해 적 강습정을 분쇄한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "'테라와 로갈 돈을 위하여!' 단 한 명의 이단자도 성스러운 팔랑크스 내벽을 넘지 못하고 우주로 쓸려 나갔다!",
          stats: { BS: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "도킹 베이 격벽이 뚫려 치열한 백병전 끝에 부상을 입었으나 끝내 침입자를 전멸시켰다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 폭풍 방패를 맞대고 좁은 격벽 통로에서 한 걸음도 물러서지 않는 철벽 방진을 세운다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "로갈 돈의 방패처럼 미동조차 없는 방어선 앞에 카오스 광전사들이 차례로 쓰러졌다!",
          stats: { T: 6, WS: 6, WP: 5 }
        },
        fail: {
          text: "적의 멜타 폭약에 방패가 깨지며 중상을 입었으나, 쓰러질 때까지 통로를 내주지 않았다.",
          wounds: -22,
          stats: { T: 4 }
        }
      }
    ],
    source: "Lexicanum: Phalanx / Codex Supplement: Imperial Fists"
  },
  {
    id: "ev_s4_tag_huscarl_oath",
    title: "허스칼의 맹세 — 무너지는 성벽과 강철의 최후 방벽",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["huscarl_oath"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 임페리얼 피스트 허스칼",
    weight: 38,
    text: "로갈 돈의 오랜 방어 철학을 계승한 허스칼로서 그대가 보강을 지휘하던 요새 성벽에 적의 공성 포화가 집중되었다. 외벽 제3보루에 균열이 번지며 지휘부가 2선 철수를 건의한다.",
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
    source: "Lexicanum: Huscarls / Codex Supplement: Imperial Fists"
  },
  {
    id: "ev_s16_ch1_if_1",
    title: "임페리얼 피스트 — 팔랑크스 궤도 함교의 방어 교리 심의와 승선 방어 훈련",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["imperial_fists"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 임페리얼 피스트",
    weight: 30,
    text: "신성한 테라 궤도를 수호하는 이동 요새 팔랑크스의 황금 함교. 함대 장교단과 아우릭 보조군 지휘부가 참석한 가운데, 대규모 적 승선 공격에 대비한 격벽 봉쇄 교리 심의와 실탄 승선 방어 훈련이 개시되었다. 수십 킬로미터에 달하는 내부 회랑 가운데 취약한 동력 환기구의 방어 설계를 보완해야 한다.",
    choices: [
      {
        label: "[지성 판정] 함교 전략 홀로리스를 분석해 동력 환기구 일대의 자동 포탑 사각을 메우는 다층 격벽 교차 화망을 새로 설계한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "한 치의 빈틈도 허용하지 않는 로갈 돈의 방어 공학! 그대가 제출한 격벽 교차 화망 도면이 팔랑크스 표준 방어 교범으로 채택되었다.",
          stats: { Int: 8, BS: 5, Inf: 6 }
        },
        fail: {
          text: "모의 침투조가 환기구 우회로를 뚫고 함교 외곽까지 도달해 설계 결함을 지적받으며 엄중한 재검토를 명받았다.",
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "[강인 판정] 실탄에 준하는 고압 충격탄이 쏟아지는 좁은 격벽 모의 방어 훈련에서 방패 벽 최선두를 끝까지 버텨 낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "거센 폭발과 충격 속에서도 단 반 걸음도 밀리지 않았다! 훈련을 참관한 아우릭 보조군과 형제들이 황금 성벽 같은 그대의 기개에 경례했다.",
          stats: { T: 7, WP: 5, WS: 4 }
        },
        fail: {
          text: "모의 멜타 폭약의 충격파에 방패가 튕겨 나가며 갑주가 찌그러지고 갈비뼈에 적지 않은 타박상을 입고 훈련을 마쳤다.",
          wounds: -16,
          stats: { T: 3 }
        }
      },
      {
        label: "[권위 판정] 팔랑크스의 고대 기계령 정비 일정과 아우릭 보조군 경계 교대를 통합 지휘해 궤도 요새 전체의 방어 태세를 끌어올린다",
        req: { anyTags: ["role_techmarine", "huscarl_oath", "astartes_captain", "chapter_master"] },
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "테라의 최후 방패가 한층 더 빈틈없이 다듬어졌다! 챕터 지휘부가 그대의 체계적인 요새 운영 능력을 높이 평가했다.",
          stats: { Inf: 8, Int: 6, WP: 5 }
        },
        fail: {
          text: "과중한 정비 일정과 교대 훈련이 겹치며 일부 포대 연동에 오차가 발생해 책임 문책을 감수해야 했다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "아우릭 보조군 신병 분대의 격벽 사격 자세와 볼터 탄약 보급 동선을 묵묵히 점검하며 기본기를 다진다",
        effect: {
          text: "위대한 요새는 결국 가장 작은 나사와 병사의 기율에서 완성된다. 기본에 충실한 점검이 방어선의 신뢰도를 높였다.",
          stats: { BS: 5, Fel: 4, Int: 4 }
        }
      }
    ],
    source: "Codex Supplement: Imperial Fists / Lexicanum: Phalanx / Auric Auxilia"
  },
  {
    id: "ev_s16_ch1_if_2",
    title: "임페리얼 피스트 — 강철 우리 전투의 추모 의례와 공성 방어 모의전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["imperial_fists"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 임페리얼 피스트",
    weight: 32,
    text: "대성전과 대반역의 잿더미 직후, 세바스투스 제4행성에서 로갈 돈과 군단이 피로 씻어 낸 '강철 우리' 전투의 추모일이 돌아왔다. 묵묵한 침묵 속에 전사한 선배들의 이름을 새긴 뼈 조각 의례를 마친 뒤, 채플린이 당시 반역자 아이언 워리어가 설치했던 살상 지대와 이중 참호 함정을 재현한 가혹한 공성 방어 모의전을 선포했다.",
    choices: [
      {
        label: "[의지 판정] 분노와 자존심을 내려놓고 강철 우리에서 드러난 오만의 교훈을 냉정히 복기하며 모의전의 심리적 압박을 견뎌 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "뜨거운 복수심 대신 얼음처럼 차가운 인내를 선택했다! 채플린이 고통 속에서 단련된 자는 두 번 무너지지 않는다며 그대의 영혼을 치하했다.",
          stats: { WP: 8, Int: 5, T: 4 },
          faith: 10
        },
        fail: {
          text: "뼈아픈 과거의 환기와 끝없는 모의 포격음 속에 냉정함을 잃고 무리한 돌격을 감행했다가 모의 함정에 휩쓸려 부상을 입었다.",
          wounds: -16,
          stats: { WP: -2, Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 아이언 워리어의 다중 화망과 지뢰 지대 배치를 역해석해 아군 피해를 절반 이하로 줄이는 공성 돌파 해법을 도출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "적의 완벽한 함정을 역공병 작업으로 해체해 버렸다! 챕터 전략 기록관들이 그대의 분석을 차세대 공성 교범에 수록했다.",
          stats: { Int: 8, BS: 5, Inf: 6 },
          addTags: ["huscarl_oath"]
        },
        fail: {
          text: "우회 갱도 계산이 미세하게 어긋나 모의 폭파 함정을 건드렸고, 실전급 충격파에 큰 타격을 입었다.",
          wounds: -18,
          stats: { Int: 2 }
        }
      },
      {
        label: "[교섭 판정] 추모 의례의 뼈 조각을 전우들과 나누며 쓰러진 선배들의 고귀한 희생을 흔들리지 않는 방패의 서약으로 승화시킨다",
        req: { anyTags: ["role_chaplain", "huscarl_oath"] },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "무겁게 가라앉았던 의례장이 단단한 강철의 결의로 가득 찼다! 중대 전체의 사기와 결속이 크게 높아졌다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "엄숙한 추모의 무게를 지나치게 앞세운 탓에 젊은 형제들과의 전술 토론이 경직되고 평가가 엇갈렸다.",
          stats: { Fel: -2, Inf: -2 }
        }
      },
      {
        label: "화려한 해법 대신 선배들의 이름을 한 글자씩 뼈에 새기는 추모 의례에 밤새 몰두하며 침묵의 기율을 다진다",
        effect: {
          text: "손끝에 배어든 인내와 정밀함이 곧 임페리얼 피스트의 힘이다. 고요한 집중 속에 영혼이 맑아졌다.",
          stats: { WP: 5, T: 4, BS: 3 },
          faith: 6
        }
      }
    ],
    source: "Codex Supplement: Imperial Fists / Index Astartes / Lexicanum: Iron Cage"
  },
  {
    id: "ev_s16_ch1_if_3",
    title: "임페리얼 피스트 — 제1중대 공성 망치와 스톰 실드 정면 돌파전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["imperial_fists"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "배틀 브라더 이상 · 챕터: 임페리얼 피스트",
    weight: 34,
    text: "반역자 공성 군벌이 겹겹이 둘러친 강철 요새의 주 성문 앞. 우회로는 모두 지뢰와 용암 해자로 끊어졌고, 적의 중포 화력이 돌파구를 향해 비 오듯 쏟아진다. 제1중대 고참 전사들이 거대한 스톰 실드와 전류가 흐르는 공성 망치인 썬더 해머를 치켜든 채 정면 돌파 대형을 짰다. 로갈 돈의 후예는 가장 단단한 성벽을 정면으로 부순다!",
    choices: [
      {
        label: "[백병 판정] 공성 망치를 양손에 쥐고 스톰 실드 방패 벽의 틈을 비집고 나가 적 요새 주 성문과 지휘 벙커를 정면으로 박살 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "뇌성과 같은 해머 일격에 두꺼운 아다만티움 성문이 산산조각 났다! '테라와 로갈 돈을 위하여!' 제1중대의 깃발이 무너진 성벽 꼭대기에 꽂혔다!",
          stats: { WS: 8, T: 5, Inf: 7 }
        },
        fail: {
          text: "성문을 부수는 순간 집중된 멜타와 포화에 갑주가 관통당해 깊은 상처를 입고 의무대에 실려 가야 했다.",
          wounds: -24,
          stats: { WS: 4 }
        }
      },
      {
        label: "[강인 판정] 거대한 스톰 실드를 앞세워 방패 벽의 선봉 기둥이 되어 적의 집중 화력을 온몸으로 받아 내며 전진한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "포탄이 방패를 두드릴 때마다 오히려 한 걸음씩 더 나아갔다! 흔들리지 않는 황금 방벽 뒤로 후속 중대가 무사히 요새 내부로 진입했다.",
          stats: { T: 8, WP: 6, Inf: 6 }
        },
        fail: {
          text: "대구경 공성포의 직격 충격에 방패가 반파되고 팔뼈가 부러지는 중상을 입었으나 끝내 쓰러지지 않고 길을 열었다.",
          wounds: -22,
          stats: { T: 4 }
        }
      },
      {
        label: "[사격 판정] 제1중대 정예의 화력과 공성 식견을 발휘해 성벽 지지 기둥의 약점을 집중 포격으로 무너뜨린 뒤 단숨에 진입한다",
        req: { anyTags: ["terminator_honors", "huscarl_oath"] },
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정교한 공성 화력이 성문 상부 포탑을 통째로 붕괴시키며 저항을 단숨에 잠재웠다! 완벽한 제1중대식 돌파전이었다.",
          stats: { BS: 8, Int: 5, Inf: 8 }
        },
        fail: {
          text: "무너진 성벽 잔해가 예상보다 넓게 쏟아지며 파편에 맞아 부상을 입었으나, 요새 돌파만은 완수했다.",
          wounds: -18,
          stats: { BS: 3 }
        }
      },
      {
        label: "선봉 방패 벽의 바로 뒤에서 볼터 제압 사격과 연막탄 전개로 적 대전차 사수들의 조준을 끊어 준다",
        effect: {
          text: "묵묵히 선봉대의 눈과 측면을 지켜 주며 제1중대의 정면 돌파를 성공으로 이끌었다.",
          stats: { BS: 5, WP: 4, T: 4 }
        }
      }
    ],
    source: "Codex Supplement: Imperial Fists / Lexicanum: Imperial Fists"
  }
];
