// 분기 사건 — 스페이스 울프 전용 (1:1 단독 승격)
export default [
  {
    id: "ev_chap_space_wolves",
    title: "스페이스 울프 — 늑대의 의협심과 이단심문소의 시민 숙청령",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["space_wolves"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "챕터: 스페이스 울프",
    weight: 34,
    text: "악마 침공을 막아 낸 직후, 오르도 말레우스 이단심문관이 '카오스를 목격한 행성 방위군과 민간인 전원을 처형하라'는 냉혹한 명령을 내렸다. 늑대의 피가 끓어오른다. 펜리스의 전사들은 용감히 싸운 필멸자를 배신하지 않는다!",
    choices: [
      {
        label: "[백병 판정] 프로스트 액스를 뽑아 민간인 피난선을 몸으로 막아선다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'펜리스 효르다!' 압도적인 기세 앞에 이단심문관의 수행원들이 뒷걸음질쳤다. 민간인 수송선은 무사히 성계를 이탈했고, 그대의 이름은 펜리스의 사가에 새겨졌다!",
          stats: { WS: 5, Fel: 6, WP: 5 },
          addTags: ["wolf_guard"]
        },
        fail: {
          text: "이단심문소 폭풍병들과의 충돌 끝에 부상을 입었으나, 그 틈에 민간인 절반은 목숨을 건졌다.",
          wounds: -20,
          stats: { Inf: -4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 룬 프리스트와 함께 워프의 흔적을 정화해 숙청의 명분을 없앤다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "펜리스 룬의 바람이 잔여 오염을 깨끗이 씻어 내자 이단심문관도 어쩔 수 없이 처형 명령을 철회했다.",
          stats: { WP: 6, Int: 4, Inf: 4 }
        },
        fail: {
          text: "정화가 불완전해 일부 격리 수용을 막지 못했고, 이단심문관과의 대립으로 외교적 마찰만 깊어졌다.",
          stats: { Fel: -3, Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: Months of Shame / Codex Supplement: Space Wolves"
  },
  {
    id: "ev_chap2_space_wolves",
    title: "스페이스 울프 — 더 팽의 대연회와 묠드 사가 경연",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["space_wolves"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 스페이스 울프",
    weight: 28,
    text: "거대한 화산 요새 '더 팽'의 대연회장. 늑대 모피와 불꽃이 넘실대는 가운데, 울프 로드와 형제들이 아스타르테스의 독극물 면역마저 취하게 만드는 펜리스 독주 묠드를 들이켜며 무용담 사가와 팔씨름을 겨루고 있다!",
    choices: [
      {
        label: "[강인 판정] 묠드 두 통을 들이켠 채 베테랑 울프 가드와 정면 대련 및 팔씨름을 겨룬다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "'펜리스 효르다!' 대연회장이 떠나갈 듯한 함성 속에 베테랑을 꺾고 그대의 이름이 새로운 사가에 올라갔다!",
          stats: { T: 6, WS: 6, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "강철 탁자를 부수며 바닥에 나뒹굴었으나, 형제들의 호탕한 웃음 속에 더 진한 전우애를 얻었다.",
          wounds: -10,
          stats: { T: 4, Fel: 4 }
        }
      },
      {
        label: "[교섭 판정] 스칼드 음유시인처럼 쓰러진 형제들의 위대한 사가를 장엄하게 읊어 올린다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "거친 늑대 전사들이 일제히 잔을 높이 들며 경의를 표했다. 룬 프리스트가 그대의 목소리에 깊은 영혼이 담겼다고 평했다.",
          stats: { Fel: 6, WP: 5, Inf: 5 }
        },
        fail: {
          text: "운율이 크게 어긋나 연회장에 야유와 폭소가 터졌고, 다음 연회까지 묠드 통을 나르는 벌칙을 떠안았다.",
          stats: { Fel: -2, Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: The Fang / Codex Supplement: Space Wolves"
  },
  {
    id: "ev_s4_tag_wolf_guard",
    title: "울프 가드의 서약 — 대연회장의 룬 점괘와 출정 명령",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["wolf_guard"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 스페이스 울프 울프 가드",
    weight: 38,
    text: "대중대 연회장에서 묠드 술잔이 부딪히는 가운데, 룬 프리스트가 뼈 조각을 던져 불길한 사냥의 예언을 읽어 냈다. 울프 로드 직속 친위대인 울프 가드로서 그대가 선봉 타격대를 이끌 차례가 다가왔다.",
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
    source: "Lexicanum: Wolf Guard / Codex Supplement: Space Wolves"
  },
  {
    id: "ev_s16_ch1_sw_1",
    title: "스페이스 울프 — 울프 프리스트의 송곳니 시련과 울펜의 저주 억제",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["space_wolves"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 스페이스 울프",
    weight: 30,
    text: "아사이하임 설원의 혹독한 전초 기지. 연속된 근접 살육전 이후 형제들의 송곳니가 길어지고 눈동자가 호박빛으로 번뜩이는 카니스 헬릭스의 변이, 곧 울펜의 저주 징후가 짙어지고 있다. 늑대 해골 투구를 쓴 울프 프리스트가 빙하 성소로 그대를 불러 야수의 본능을 영혼의 사슬로 묶는 피의 시련을 명했다.",
    choices: [
      {
        label: "[의지 판정] 빙하 성소의 차가운 얼음물 속에 무릎을 꿇고 울프 프리스트의 영창에 맞춰 내면의 야수를 의지로 길들인다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "혈관 속 포효가 길들여진 사냥개의 침착한 숨결로 가라앉았다! 울프 프리스트가 야수의 힘을 지배할 자격을 증명했다며 그대의 어깨에 룬 부적을 걸어 주었다.",
          stats: { WP: 8, WS: 4, Inf: 6 },
          corruption: -6
        },
        fail: {
          text: "울펜의 야성이 잠시 이성을 압도해 성소 석주를 부수고 말았고, 울프 프리스트에게 제압당하는 과정에서 깊은 타박상을 입었다.",
          wounds: -18,
          stats: { WP: -2, Fel: -2 }
        }
      },
      {
        label: "[강인 판정] 아사이하임의 살인적인 눈보라 속으로 맨몸에 가까운 경장으로 나서 사흘 밤낮을 버티며 과열된 카니스 헬릭스의 혈기를 식힌다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "펜리스의 혹한이 피의 광기를 단단한 강철의 체력으로 단련시켰다! 흔들림 없는 눈빛으로 성소에 귀환하자 형제들이 경의를 표했다.",
          stats: { T: 7, WP: 5, WS: 4 }
        },
        fail: {
          text: "극심한 동상과 빙벽 낙석에 큰 타격을 입은 채 울프 프리스트의 구조대에 실려 복귀해야 했다.",
          wounds: -18,
          stats: { T: 2, Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 울프 프리스트를 보좌해 변이 징후가 심한 젊은 형제들의 혈액 반응과 심박을 판독하고 진정 의식을 이끈다",
        req: { anyTags: ["role_chaplain", "role_apothecary", "wolf_guard"] },
        check: { stat: "Int", diff: 0 },
        success: {
          text: "폭주 직전이던 형제 세 명을 완벽히 진정시켜 대중대의 소중한 전력을 지켜 냈다! 늑대 사제단이 그대의 냉철한 통찰을 높이 기렸다.",
          stats: { Int: 7, WP: 5, Inf: 7 }
        },
        fail: {
          text: "징후 판독이 한 박자 늦어 흉폭해진 형제를 온몸으로 막아 서다 갑주가 찢기고 상처를 입었다.",
          wounds: -16,
          stats: { Inf: -2 }
        }
      },
      {
        label: "시련 대신 화덕 앞에서 오래된 펜리스 사가를 읊조리며 무기를 갈아 거친 혈기를 고요히 다스린다",
        effect: {
          text: "칼날을 벼리는 일정한 리듬 속에 늑대의 본능이 차분한 전사의 집중력으로 자리 잡았다.",
          stats: { WP: 5, WS: 4, Fel: 4 }
        }
      }
    ],
    source: "Codex Supplement: Space Wolves / Lexicanum: Curse of the Wulfen / Wolf Priest"
  },
  {
    id: "ev_s16_ch1_sw_2",
    title: "스페이스 울프 — 혈기 넘치는 블러드 클로 분대 통솔",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["space_wolves"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "배틀 브라더 이상 · 챕터: 스페이스 울프",
    weight: 32,
    text: "적의 중화기 화망이 촘촘히 깔린 공성 전선 앞. 갓 파워 아머를 걸친 젊은 블러드 클로 신병 분대가 사가를 세우겠다며 체인소드를 치켜든 채 명령도 없이 정면 돌격을 감행하려 한다! 이대로 내버려 두면 용맹한 젊은 늑대들이 적의 살상 지대에 그대로 갈려 나갈 판이다.",
    choices: [
      {
        label: "[교섭 판정] 펜리스의 옛 사가를 우렁차게 외치며 신병들의 혈기를 측면 우회 강습으로 교묘히 이끌어 낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "'진정한 늑대는 덫을 부수고 먹잇감의 목덜미를 문다!' 그대의 호령에 블러드 클로 분대가 측면 엄폐로를 따라 일제히 돌격해 적 중화기 진지를 통째로 도륙했다!",
          stats: { Fel: 7, WS: 5, Inf: 6 }
        },
        fail: {
          text: "흥분한 신병 절반이 명령을 무시하고 정면으로 튀어나가는 바람에 몸소 뛰어들어 수습하다 깊은 상처를 입었다.",
          wounds: -18,
          stats: { Fel: -2, Inf: -2 }
        }
      },
      {
        label: "[백병 판정] 가장 앞장선 신병의 멱살을 잡아 단숨에 제압해 규율을 각인시킨 뒤, 친히 선봉을 맡아 적 화망을 뚫는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "압도적인 무력 앞에 혈기 넘치던 신병들이 일제히 고개를 숙였다! 그대의 뒤를 따른 완벽한 쐐기 돌격이 적 참호를 갈라 버렸다.",
          stats: { WS: 7, T: 4, Inf: 6 },
          addTags: ["wolf_guard"]
        },
        fail: {
          text: "신병들과 뒤엉켜 돌격하는 과정에서 집중 포화를 정면으로 맞아 갑주가 크게 파손되었다.",
          wounds: -20,
          stats: { WS: 3 }
        }
      },
      {
        label: "[권위 판정] 울프 가드와 고참 그레이 헌터의 위엄으로 분대 편제를 즉석 재정비하고 엄호 사격 아래 질서 정연한 강습을 지휘한다",
        req: { anyTags: ["wolf_guard", "astartes_sergeant", "astartes_captain", "chapter_master"] },
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "노련한 늑대 우두머리의 지휘 아래 단 한 명의 신병도 잃지 않고 적 방어선을 분쇄했다! 젊은 전사들이 그대의 이름을 술잔에 담아 노래했다.",
          stats: { Inf: 8, Fel: 6, BS: 4 }
        },
        fail: {
          text: "전장 굉음 속에 구령이 엇갈려 측면이 노출되었고, 적의 역습을 막아 내다 큰 타격을 입었다.",
          wounds: -16,
          stats: { Inf: -3 }
        }
      },
      {
        label: "신병 분대가 돌입하기 전에 볼터와 수류탄으로 적 중화기 둥지에 연막과 제압 사격을 퍼부어 피해를 최소화한다",
        effect: {
          text: "거친 신병들을 꾸짖기 전에 먼저 등 뒤를 지켜 주는 선배의 묵직한 의리를 보였다.",
          stats: { BS: 5, T: 4, Fel: 4 }
        }
      }
    ],
    source: "Codex Supplement: Space Wolves / Lexicanum: Blood Claws"
  },
  {
    id: "ev_s16_ch1_sw_3",
    title: "스페이스 울프 — 더 팽 외벽과 궤도 방어 포대 사수전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["space_wolves"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 스페이스 울프",
    weight: 34,
    text: "아사이하임 대륙을 꿰뚫고 성층권까지 치솟은 요새 수도원 '더 팽'의 하늘이 워프 균열로 찢어졌다! 반역자 습격선 편대가 보이드 방어막의 사각지대를 노리고 상층 궤도 방어 포대와 외벽 격납고에 강습정을 쏟아붓고 있다. 더 팽의 바위가 침략자의 발에 더럽혀지게 둘 수는 없다!",
    choices: [
      {
        label: "[사격 판정] 성층권 외벽의 매크로 방어 포대와 롱 팽 중화기 분대의 교차 화망을 지휘해 적 강습정을 공중에서 분쇄한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "'펜리스 효르다!' 천둥 같은 궤도 포화가 워프 습격선 두 척을 빙하 위로 추락시켰다! 더 팽의 강철 성벽은 한 치도 뚫리지 않았다.",
          stats: { BS: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "적 함포의 보복 포격에 포대 엄폐물이 무너지며 중상을 입고 잔해를 헤치고 빠져나와야 했다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "[백병 판정] 격납고 외벽에 달라붙은 카오스 강습대 정면으로 뛰어들어 요새 문턱을 피로 씻어 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "눈보라와 피보라가 뒤섞인 백병전 끝에 침입자를 단 한 명도 남김없이 절벽 아래로 쓸어버렸다!",
          stats: { WS: 8, T: 5, WP: 5 }
        },
        fail: {
          text: "반역자 광전사의 체인액스에 깊은 상처를 입었으나, 요새 내벽 진입만은 끝내 저지했다.",
          wounds: -24,
          stats: { WS: 4 }
        }
      },
      {
        label: "[지성 판정] 아이언 프리스트와 협력해 피격된 보이드 방어막 발전기를 긴급 재가동하고 적의 워프 교란을 역차단한다",
        req: { anyTags: ["role_techmarine", "role_librarian"] },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "푸른 방어막이 다시 하늘을 뒤덮자 침략자들의 강습정이 허공에서 산산조각 났다! 더 팽의 심장을 지켜 낸 공훈이 기록되었다.",
          stats: { Int: 8, WP: 5, Inf: 7 }
        },
        fail: {
          text: "과부하된 발전기 방전과 워프 역류에 감전되어 큰 화상을 입고 말았다.",
          wounds: -18,
          stats: { Int: 2, WP: -2 }
        }
      },
      {
        label: "더 팽의 카얼 보조대 병사들과 탄약 수송로를 끝까지 엄호하며 요새 외벽 포대의 사격이 끊기지 않도록 뒷받침한다",
        effect: {
          text: "카얼 보조대 병사들과 어깨를 나란히 하고 포탄을 날라 요새 방어선의 숨통을 이어 냈다. 더 팽의 전사들이 뜨거운 신뢰를 보냈다.",
          stats: { T: 5, Fel: 5, WP: 4 }
        }
      }
    ],
    source: "Battle of the Fang / Codex Supplement: Space Wolves / Lexicanum: The Fang"
  }
];
