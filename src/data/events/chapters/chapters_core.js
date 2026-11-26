// 분기 사건 — 9대 챕터 숙원 · 합동 공조 (개별 챕터는 1:1 단독 승격)
export default [
  {
    id: "ev_s6_chap_rivalry_da_sw",
    title: "라이온과 늑대의 전통 — 다크 엔젤과 스페이스 울프의 명예 결투",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["dark_angels", "space_wolves"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 다크 엔젤 또는 스페이스 울프",
    weight: 36,
    text: "합동 원정 작전 직전, 다크 엔젤과 스페이스 울프 타격 순양함이 같은 궤도에 나란히 정박했다. 1만 년 전 대성전 시절 두 프라이마크 라이온 엘 존슨과 리만 러스가 격돌한 고대의 전통에 따라, 양 챕터 대표 전사가 첫 피가 흐를 때까지 겨루는 의례적 명예 결투의 차례가 돌아왔다. 형제들의 시선이 그대에게 모였다.",
    choices: [
      {
        label: "[백병 판정] 챕터의 자존심을 걸고 검을 뽑아 상대 챕터 투사와 정정당당한 첫 피 결투에 나선다",
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
        label: "[강인 판정] 치명적 부상을 피하기 위해 무장 대신 맨손 격투로 승부를 제안해 두 프라이마크의 고대 혈투를 재현한다",
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
    source: "Lexicanum: Lion El'Jonson / Codex Supplement: Space Wolves"
  },
  {
    id: "ev_s6_chap_rivalry_um_bt",
    title: "코덱스냐 성전이냐 — 울트라마린과 블랙 템플러의 합동 작전 충돌",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["ultramarines", "black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "챕터: 울트라마린 또는 블랙 템플러",
    weight: 36,
    text: "이단 요새 공략을 앞두고 울트라마린 중대와 블랙 템플러 성전군이 합동 작전실에 마주 섰다. 《코덱스 아스타르테스》의 정밀 포위·보급 차단 교리를 고집하는 측과, 지기스문트의 정신을 이어 즉각적인 쇄도와 적 수괴 참수를 외치는 측이 팽팽하게 맞서며 회의가 얼어붙었다.",
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
          text: "격앙된 양측 지휘부의 고집을 끝내 꺾지 못해 공조가 깨졌고, 합동 작전실의 신뢰에 깊은 금이 갔다.",
          stats: { Inf: -3, Fel: -2 }
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
    source: "Lexicanum: Codex Astartes / Codex Supplement: Black Templars"
  },
  {
    id: "ev_s6_chap_rivalry_sal_civilians",
    title: "필멸자 피난선과 요새 방어 — 아스타르테스 합동 지휘부의 윤리 충돌",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders", "imperial_fists", "blood_angels"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
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
    source: "Codex Supplement: Salamanders / Codex Supplement: Imperial Fists"
  },
  {
    id: "ev_s6_chap_rivalry_rg_ws",
    title: "그림자와 번개의 협공 — 레이븐 가드와 화이트 스카의 합동 기습전",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard", "white_scars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
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
    source: "Codex Supplement: Raven Guard / Codex Supplement: White Scars"
  },
  {
    id: "ev_s16_ch2_core_1",
    title: "은빛 견갑의 서약 — 데스워치 복귀 베테랑과 비밀 외계 음모",
    category: "챕터 합동",
    once: true,
    req: {
      minAge: 25,
      allTags: ["astartes", "battle_brother", "deathwatch_vet"],
      excludeTags: ["grey_knight", "chapter_master", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "25세 이상 · 배틀 브라더 · 이력: 데스워치 참전",
    weight: 34,
    text: "데스워치의 긴 감시를 마치고 왼팔에 은빛 견갑을 두른 채 모챕터로 복귀한 그대에게, 오르도 제노스의 암호 봉인이 찍힌 극비 밀서가 도달했다. 모챕터가 수호하는 성계의 외곽 정거장에 정체불명의 외계인 기생 조직이 뿌리내렸다는 경보다. 그러나 데스워치의 비밀 서약은 작전의 진상과 특수 정보를 모챕터 형제들에게조차 발설하지 말라 명하고 있어, 서약의 준수와 챕터의 신뢰 사이에서 무거운 결단이 요구된다.",
    choices: [
      {
        label: "[지성 판정] 비밀 서약을 깨지 않는 선에서 모챕터 전술망에 외계 위협 좌표만 교묘히 흘려 합동 소탕전을 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "데스워치의 기밀도, 모챕터의 신뢰도 모두 지켜 냈다! 정거장에 숨어 있던 외계인 첩보망이 형제들의 기습 타격에 흔적도 없이 소멸했고, 오르도 제노스 감시관마저 그대의 노련한 처신에 경의를 표했다.",
          stats: { Int: 8, Inf: 8, BS: 5 }
        },
        fail: {
          text: "암호 전달 과정이 모챕터 정보 장교에게 의심을 사며 신뢰에 금이 갔고, 외계인 세포 일부가 혼란을 틈타 도주해 버렸다.",
          stats: { Int: -2, Fel: -3, Inf: -2 }
        }
      },
      {
        label: "[백병 판정] 모챕터 형제들을 끌어들이지 않고 홀로 정거장 깊숙이 잠입해 데스워치 시절의 전술로 외계 수괴를 직접 처단한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "은빛 견갑 아래 벼려 둔 외계인 사냥 기술이 빛을 발했다! 단 하룻밤 만에 기생 조직의 우두머리를 참수하고 증거를 불태운 채, 아무 일 없었다는 듯 새벽 점호에 복귀했다.",
          stats: { WS: 8, Ag: 6, WP: 6, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "외계인 암살자들의 매복에 걸려 옆구리를 깊게 베이는 중상을 입었고, 피투성이로 귀환해 모챕터의 추궁을 겨우 넘겨야 했다.",
          wounds: -24,
          stats: { WS: 3, Inf: -2 }
        }
      },
      {
        label: "[교섭 판정] 비밀 서약의 핵심 기밀은 숨긴 채 모챕터 지휘관 앞에 정직하게 서서 오직 자신의 명예를 걸고 정거장 수색을 청원한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "은빛 견갑을 얻기까지 쌓아 올린 그대의 충성심을 모챕터 형제들은 의심하지 않았다! 묻지 않고 등을 맡겨 준 형제들과 함께 외계 음모를 뿌리째 도려냈다.",
          stats: { Fel: 8, Inf: 8, WP: 5 },
          faith: 8
        },
        fail: {
          text: "진상을 말할 수 없는 침묵이 지휘부의 불신을 키워 수색 승인이 지연되었고, 뒤늦게 투입된 현장에서 외계인의 함정에 걸려 부상을 입었다.",
          wounds: -16,
          stats: { Fel: -2, Inf: -2 }
        }
      },
      {
        label: "오르도 제노스의 지침대로 정거장 주변 항로만 비밀리에 봉쇄하고, 직접 소탕은 인근 워치 포트리스 킬 팀에 넘긴다",
        effect: {
          text: "서약의 문구를 한 치도 어기지 않으면서도 모챕터의 피해를 막아 냈다. 며칠 뒤 밤하늘에 검은 강습정이 다녀간 뒤 정거장의 기이한 침묵이 사라졌다.",
          stats: { WP: 5, Int: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Deathwatch / Codex: Deathwatch"
  },
  {
    id: "ev_s16_ch2_core_2",
    title: "대균열 이후의 형제애 — 퍼스트본과 프라이머리스의 합동 서약",
    category: "챕터 합동",
    once: true,
    req: {
      minYear: 1001,
      greatRift: true,
      allTags: ["astartes", "battle_brother"],
      excludeTags: ["grey_knight", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "001.M42 이후 · 대균열 이후 · 배틀 브라더",
    weight: 34,
    text: "대균열이 은하를 두 동강 낸 뒤, 인도미투스 성전의 불꽃과 함께 합류한 프라이머리스 형제들이 챕터 전열에 편입되었다. 오랜 세월 챕터의 피와 전통을 지켜 온 구세대 퍼스트본 전사들과, 더 거대하고 강인하지만 아직 챕터의 흉터를 온몸으로 겪지 못한 신세대 프라이머리스 사이에는 말없는 경계심이 감돈다. 바로 그때, 양 세대가 함께 투입된 합동 교두보가 반역군 기갑 대열의 기습 포위에 갇히며 절체절명의 합동 교전이 벌어졌다.",
    choices: [
      {
        label: "[백병 판정] 고참 퍼스트본 전사로서 포위된 프라이머리스 신참의 등 뒤를 막아 서며 챕터의 옛 전투 구호를 함께 외친다",
        req: { excludeTags: ["primaris"] },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "피와 화약 냄새 속에서 구세대의 경험과 신세대의 압도적 완력이 하나로 맞물렸다! 포위망을 산산조각 낸 뒤 두 세대가 피 묻은 건틀릿을 맞잡고 진정한 형제임을 맹세했다.",
          stats: { WS: 8, Fel: 6, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "호흡이 어긋난 찰나 적 대전차 포격이 진지를 강타해 중상을 입었으나, 끝까지 서로를 엄호하며 교두보만은 지켜 냈다.",
          wounds: -20,
          stats: { T: 3, Fel: 2 }
        }
      },
      {
        label: "[강인 판정] 프라이머리스 형제로서 고참 퍼스트본 형제들 앞으로 뛰어들어 적 집중 포화를 온몸으로 받아 내며 형제애를 증명한다",
        req: { allTags: ["primaris"] },
        check: { stat: "T", diff: -5 },
        success: {
          text: "신형 파워 아머가 포탄 파편을 견뎌 내는 사이 퍼스트본 형제들이 적 지휘 전차를 격파했다! 전투 후 퍼스트본 고참 형제들이 그대의 견갑에 챕터 전통 명예 인장을 경건히 바치며 형제애를 기렸다.",
          stats: { T: 8, Fel: 7, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "앞선 돌격에 적 중화기가 집중되어 깊은 부상을 입었으나, 주저 없이 몸을 던진 희생에 구세대 형제들의 경계심이 누그러졌다.",
          wounds: -22,
          stats: { T: 4, WP: 3 }
        }
      },
      {
        label: "[교섭 판정] 세대의 구분을 넘어 두 부대의 무장과 강점을 결합한 합동 반격 진형을 즉석에서 조율한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "퍼스트본의 노련한 지형 활용과 프라이머리스의 막강한 볼트 라이플 화력이 완벽한 조화를 이루었다! 승전 후 챕터 예배당에서 두 세대가 하나의 피와 맹세로 합동 서약을 올렸다.",
          stats: { Fel: 8, Int: 6, Inf: 7 },
          faith: 8
        },
        fail: {
          text: "교전 도중 지휘 체계가 잠시 엇갈리며 측면이 뚫렸고, 직접 돌파구를 메우다 파편상을 입었다.",
          wounds: -16,
          stats: { Fel: -2, Inf: -2 }
        }
      },
      {
        label: "말로 설득하는 대신 묵묵히 옆 전선의 탄약과 엄호 화력을 채워 주며 행동으로 신뢰를 쌓는다",
        effect: {
          text: "포연 속에서 등을 맡긴 단 하룻밤의 전투가 백 마디 훈시보다 깊었다. 새벽이 밝았을 때 교두보에는 구세대도 신세대도 아닌 오직 같은 챕터의 형제들만 남아 있었다.",
          stats: { WP: 5, Fel: 5, BS: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Primaris Space Marines / Codex: Space Marines"
  }
];
