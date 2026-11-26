// 분기 사건 — 직군 계열: 아스타르테스 일반 · 계급(스카웃/배틀 브라더/중대장) · 선발 · 데스워치 · 스페이스 헐크 · 드레드노트 · 프라이머리스
export default [
  {
    id: "ev_astartes_recruiter",
    title: "하늘에서 내려온 거인들 — 챕터 징병관의 방문",
    category: "선발",
    once: true,
    req: {
      minAge: 11,
      maxAge: 16,
      gender: "male",
      excludeTags: ["astartes", "custodes", "abhuman", "heretic", "chaos_aligned"],
      or: [{ anyTags: ["geneseed_compatible"] }, { anyWorldTags: ["astartes_recruit"] }]
    },
    reqLabel: "소년기 11~16세 · 진시드 적합 또는 챕터 징병 행성",
    weight: 28,
    text: "강철 썬더호크 강습정이 굉음과 함께 내려앉고, 2.5미터 거구의 아뎁투스 아스타르테스 채플린과 아포세카리가 소년들을 사열한다. '인류의 가장 어두운 시대에 맞설 천사의 후보를 찾노라. 죽음을 각오한 자만 앞으로 나서라!'",
    choices: [
      {
        label: "[강인 판정 · 목숨을 건 도전] 아스타르테스 선발 시련과 진시드 수술에 지원한다",
        req: { stats: { T: 34, WS: 32 } },
        check: { stat: "T", diff: -5 },
        success: {
          text: "수백 명의 지원자 중 극소수만 살아남은 혈전과 18개 초인 장기 이식을 견뎌 냈다! 그대는 아스타르테스 네오파이트가 되었다!",
          forceCareer: "astartes_scout",
          stats: { T: 14, WS: 12, BS: 10, WP: 10, Inf: 10 },
          woundsBonus: 40,
          addTags: ["astartes", "transhuman"]
        },
        fail: {
          text: "혹독한 시련 끝에 진시드 거부 반응을 일으켰다. 죽음 직전 챕터 아포세카리가 생명을 건져 주었고, 그대는 평생 챕터를 섬기는 챕터 서프의 표식을 얻었다.",
          wounds: -35,
          stats: { T: 4, WP: 5, Inf: 4 },
          addTags: ["chapter_serf"]
        }
      },
      {
        label: "[의지 판정 · 사이커·의지 55+] 은빛 갑주의 비밀 사절 — 타이탄의 그레이 나이트 부름에 응한다",
        req: { allTags: ["psyker"], stats: { WP: 55, T: 42 }, maxCorruption: 5 },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "보통 챕터가 아니었다. 은빛 갑주의 사절이 그대를 토성의 위성 타이탄으로 데려갔고, 666가지 시련을 넘어 그레이 나이트가 되었다!",
          forceCareer: "grey_knight",
          stats: { WP: 16, WS: 14, T: 12, Inf: 14 },
          woundsBonus: 45,
          corruption: -50,
          addTags: ["astartes", "grey_knight", "transhuman", "power_armor"]
        },
        fail: {
          text: "타이탄의 정신 심문을 통과하지 못하고 기억이 소거된 채 행성으로 돌려보내졌다.",
          wounds: -20,
          stats: { WP: 3 }
        }
      },
      {
        label: "두려움에 발을 떼지 못하고 관중 속에 남는다",
        effect: {
          text: "하늘 전사들이 떠난 뒤에도 거대한 파워 아머의 잔상이 평생 머릿속에 남았다.",
          stats: { WP: -2 }
        }
      }
    ],
    source: "Lexicanum: Creation of a Space Marine / Grey Knights"
  },
  {
    id: "ev_deathwatch_vigil",
    title: "데스워치 파견 소집령",
    category: "아스타르테스",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      minAge: 25,
      excludeTags: ["grey_knight", "deathwatch_vet", "chapter_master", "dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "배틀 브라더 아스타르테스 · 나이 25세+",
    weight: 22,
    text: "오르도 제노스의 전투 조직 '데스워치'로부터 그대의 챕터로 파견 요청이 도착했다. 왼쪽 견갑을 은빛으로 물들이고 다른 챕터의 형제들과 함께 최악의 외계인 위협을 사냥하는 영광스러운 철야 근무다.",
    choices: [
      {
        label: "[백병 판정] 파견을 수락하고 킬 팀 작전을 수행한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "고대 외계 유적 행성과 드루카리 해적선을 제압하고 은빛 견갑을 찬 채 명예롭게 챕터로 복귀했다!",
          stats: { WS: 7, BS: 7, Int: 6, Inf: 10 },
          addTags: ["deathwatch_vet"]
        },
        fail: {
          text: "외계 무기에 치명상을 입었으나 초인의 육체로 버텨 내고 귀환했다.",
          wounds: -35,
          stats: { T: 5, WS: 4 },
          addTags: ["deathwatch_vet"]
        }
      },
      {
        label: "챕터의 당면한 성전에 집중하기 위해 정중히 사양한다",
        effect: {
          text: "챕터 마스터는 그대의 헌신을 높이 샀다.",
          stats: { WP: 3, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Deathwatch / Deathwatch Core Rulebook"
  },
  {
    id: "ev_space_hulk",
    title: "저주받은 스페이스 헐크 강습 작전",
    category: "아스타르테스",
    req: {
      or: [{ allTags: ["astartes"] }, { allTags: ["custodes"], greatRift: true }, { anyCareers: ["tempestus_scion", "inquisitor"] }],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 / 쿠스토데스 / 사이온 / 이단심문관",
    weight: 16,
    text: "수천 년간 워프를 표류하던 거대 난파선 집합체 '스페이스 헐크'가 행성계에 출현했다. 내부에는 고대 유물과 진스틸러 둥지가 동시에 도사리고 있다.",
    choices: [
      {
        label: "[백병 판정] 좁은 격벽 통로를 돌파해 고대 제국 성물과 데이터를 회수한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "진스틸러 브루드로드의 목을 베고 고대 아키오테크 성물을 되찾았다! 전설로 남을 무공이다.",
          stats: { WS: 8, T: 5, Inf: 12, Int: 4 },
          addTags: ["space_hulk_vet"]
        },
        fail: {
          text: "강화 갑주마저 찢는 진스틸러의 발톱에 치명상을 입고 가까스로 철수했다.",
          wounds: -40,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 원자로에 멜타 폭탄을 설치해 헐크 전체를 통째로 정화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "아군 손실 없이 헐크의 플라즈마 노심을 폭파해 외계 위협을 뿌리 뽑았다.",
          stats: { Int: 6, BS: 4, Inf: 6 }
        },
        fail: {
          text: "폭발 직전 탈출정이 파손되며 심한 충격을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: Space Hulk"
  },
  {
    id: "ev_dreadnought_choice",
    title: "죽음 속에서도 끝나지 않는 의무 — 드레드노트 안치",
    category: "아스타르테스",
    once: true,
    req: {
      allTags: ["astartes", "power_armor"],
      maxWounds: 38,
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "파워 아머 아스타르테스 · 생명력 38 이하 위독 상태",
    weight: 45,
    text: "그대의 육신은 수많은 전투로 만신창이가 되어 더 이상 파워 아머조차 지탱하기 어렵다. 아포세카리와 테크마린이 고대의 석관, '드레드노트'를 열고 묻는다. '형제여, 영면에 들겠는가, 아니면 강철 거신 속에서 영원히 싸우겠는가?'",
    choices: [
      {
        label: "'죽음 속에서도 나의 의무는 끝나지 않는다!' — 드레드노트에 안치된다",
        effect: {
          text: "양수 석관에 연결되어 거대한 장갑 보행병기로 부활했다! 기대수명이 수백 년 더 늘어나고 압도적인 내구와 화력을 얻었다.",
          stats: { T: 20, WS: 12, BS: 12, Ag: -15, Inf: 15 },
          woundsBonus: 80,
          lifeBonusExtra: 400,
          addTags: ["dreadnought"]
        }
      },
      {
        label: "강철 관을 거부하고, 남은 육신으로 끝까지 전장을 밟는다",
        effect: {
          text: "아포세카리가 생체 의수로 응급 처치를 마쳤다. 형제들이 그대의 고집스러운 긍지에 경례한다.",
          wounds: 20,
          stats: { WP: 8 }
        }
      }
    ],
    source: "Lexicanum: Space Marine Dreadnought"
  },
  {
    id: "ev_astartes_recruiting_visit",
    title: "징병 행성 사열 — 하늘에서 내려다보는 옛 필멸자의 땅",
    category: "아스타르테스",
    once: true,
    req: {
      anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran", "astartes_captain"],
      anyWorldTags: ["astartes_recruit"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "배틀 브라더~중대장 · 챕터 징병 행성 방문",
    weight: 30,
    text: "썬더호크에서 내린 2.5미터 파워 아머의 위용 앞에, 한때 그대 역시 속해 있었을 언더하이브 갱단원들과 부족 소년들이 숨을 죽이고 무릎을 꿇는다. 채플린과 함께 새로운 챕터 후보생들을 선발할 차례다.",
    choices: [
      {
        label: "[지성 판정] 가장 거칠고 끝까지 눈을 피하지 않은 하층민 소년을 직접 지목한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "날카로운 안목으로 탁월한 유전 적성의 신병 3명을 발굴했다! 챕터 마스터가 그대의 안목을 높이 평가했다.",
          stats: { Int: 4, Inf: 8, WP: 4 }
        },
        fail: {
          text: "선발된 후보생 대다수가 시련을 넘기지 못해 채플린의 차가운 질책을 받았지만, 그것이 아스타르테스의 냉혹한 법칙이다.",
          stats: { Inf: -3, WP: 2 }
        }
      },
      {
        label: "아포세카리의 유전 수치 기준에만 따라 냉정하게 후보생을 선별한다",
        effect: {
          text: "감정 없는 효율로 챕터의 신병 할당량을 완수했다. 필멸자의 세계는 이제 발밑의 먼지처럼 아득하다.",
          stats: { WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Space Marine Recruitment / Necromunda & Imperial Fists"
  },
  {
    id: "ev_astartes_librarius",
    title: "챕터 라이브러리우스 — 전투 사이킥과 사이킥 후드의 시련",
    category: "아스타르테스",
    once: true,
    req: {
      allTags: ["astartes", "psyker"],
      excludeChapters: ["black_templars"],
      excludeTags: ["grey_knight", "librarius_trained", "dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 + 사이커 자질",
    weight: 36,
    text: "아스타르테스 내의 사이커는 검은 함선이 아니라 챕터 치프 라이브러리안의 직속 시련을 거친다. 푸른 갑주의 선배들이 그대의 정신에 워프 폭풍을 직접 투사하며 묻는다. '너는 이 힘을 지배할 것인가, 아니면 지배당해 형제들의 볼터에 죽을 것인가!'",
    choices: [
      {
        label: "[의지 판정] 챕터 전투 함성을 내질러 워프 폭풍을 찢고 사이킥 후드를 수여받는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "악마의 환상을 산산조각 내고 정식 챕터 라이브러리안 수련을 통과했다! 이제 워프 오염 저항과 전투 사이킥이 비약적으로 강화된다.",
          stats: { WP: 10, Int: 8, Inf: 8 },
          corruption: -15,
          addTags: ["librarius_trained", "role_librarian"]
        },
        fail: {
          text: "혹독한 정신 충격으로 며칠간 의식을 잃었으나, 치프 라이브러리안은 포기하지 않고 다음 시련을 기약했다.",
          wounds: -20,
          stats: { WP: 4 }
        }
      },
      {
        label: "사이킥 개방 대신 엄격한 정신 차폐 규율을 택해 일반 전열 형제로서의 절제를 단련한다",
        effect: {
          text: "치프 라이브러리안이 그대의 신중한 절제를 인정하고 정화 인장을 수여했다. 워프의 속삭임을 잠재우고 검과 볼터에 집중한다.",
          stats: { WP: 5, WS: 3 },
          corruption: -8
        }
      }
    ],
    source: "Lexicanum: Librarian / Codex: Space Marines"
  },
  {
    id: "ev_rank_scout_infiltration",
    title: "네오파이트의 증명 — 파워 아머 없는 적진 잠입",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["astartes_scout"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "계급: 아스타르테스 네오파이트 · 스카웃",
    weight: 26,
    text: "아직 검은 갑각과 파워 아머를 받지 못한 신참 네오파이트. 200년 경력의 베테랑 스카웃 병장이 차갑게 명령한다. '폐허 매뉴팩토룸 안쪽의 반역파 포병대 레이더를 소리 없이 폭파하라. 들키면 구원 따윈 없다.'",
    choices: [
      {
        label: "[민첩 판정] 카멜레올린 망토에 몸을 숨기고 단검만으로 보초를 제거해 폭탄을 설치한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "완벽한 무음 침투로 포병 레이더를 날려 버렸다! 스카웃 병장이 처음으로 고개를 끄덕이며 배틀 브라더 추천서를 써 주었다.",
          stats: { Ag: 6, BS: 5, WS: 4, Inf: 6 }
        },
        fail: {
          text: "경보가 울려 집중 포화 속에 간신히 탈출했다. 병장은 '아직 갑주를 입을 자격이 멀었다'며 혹독히 질책했다.",
          wounds: -26,
          stats: { T: 3, WP: 3 }
        }
      },
      {
        label: "[사격 판정] 소음기 장착 스토커 볼터로 600미터 밖에서 발전기 제어반과 탄약고를 정밀 타격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "어둠 속에서 쏜 연속 정밀 사격이 탄약고 뇌관을 관통해 연쇄 대폭발을 일으켰다!",
          stats: { BS: 6, Int: 4, Inf: 5 }
        },
        fail: {
          text: "역포격에 은폐 지점이 무너져 부상을 입고 철수했다.",
          wounds: -20
        }
      }
    ],
    source: "Codex: Space Marines (10th Company Scouts)"
  },
  {
    id: "ev_rank_captain_council",
    title: "중대장의 결단 — 타격 순양함 함교의 전략 회의",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["astartes_captain"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "계급: 아스타르테스 중대장",
    weight: 28,
    text: "타격 순양함 함교의 홀로그램 성도 앞. 행성 총독이 눈물로 민간인 하이브 방어를 애원하는 한편, 궤도에는 적 카오스 기함을 급습해 성계 전쟁을 단번에 끝낼 10분의 틈이 열렸다. 100명 형제의 목숨과 행성의 운명이 중대장의 명령에 달렸다.",
    choices: [
      {
        label: "[지성 판정] 1개 분대만 방어선에 남기고 주력 드롭 포드로 적 기함 함교를 직접 참수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "번개 같은 강습으로 적 기함을 격침해 성계 전체를 구원했다! 챕터의 전설로 기록될 완벽한 지휘였다.",
          stats: { Int: 6, WS: 5, Inf: 12, WP: 5 }
        },
        fail: {
          text: "적 함선의 함정에 걸려 중대에 큰 손실과 부상을 입었으나 끝내 승리를 쟁취했다.",
          wounds: -30,
          stats: { WP: 5, Inf: 4 }
        }
      },
      {
        label: "민간인 하이브 방어선에 중대 전력을 투입해 단 한 명의 시민도 포기하지 않는다",
        effect: {
          text: "전쟁은 길어졌으나 수백만 제국 시민이 살아남아 그대의 이름을 성자처럼 기렸다.",
          stats: { Fel: 8, WP: 6, Inf: 6 },
          faith: 12
        }
      }
    ],
    source: "Codex: Space Marines (Company Captain)"
  },
  {
    id: "ev_astartes_honor_duel",
    title: "아스타르테스 형제 간의 명예 결투",
    category: "아스타르테스",
    req: {
      allTags: ["astartes"],
      minAge: 20,
      excludeTags: ["grey_knight", "dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 · 20세+",
    weight: 22,
    text: "합동 작전 중 타 중대나 형제 챕터의 베테랑 전사가 작전 주도권을 두고 명예 결투를 신청했다! 목숨을 빼앗지 않고 첫 피가 날 때까지 겨루는 규칙 아래 수십 명의 형제들이 원형 투기장을 에워싼다.",
    choices: [
      {
        label: "[백병 판정] 체인소드 날을 무디게 봉인하고 정면으로 검을 맞댄다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "전광석화 같은 반격으로 상대 견갑에 선명한 검흔을 남겼다! 양 챕터의 형제들이 주먹으로 가슴을 치며 환호했다.",
          stats: { WS: 7, WP: 4, Inf: 8 }
        },
        fail: {
          text: "상대의 노련한 일격에 무릎을 꿇었으나, 패배를 깨끗이 인정하고 전술 교훈을 새겼다.",
          wounds: -18,
          stats: { WS: 3, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 결투 대신 모의 워게임 전술 대결로 지휘 우위를 증명하자고 제안한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치밀한 전략 전술 논리로 상대를 완벽히 설득해 명예와 지휘권을 모두 지켜 냈다.",
          stats: { Int: 6, Fel: 4, Inf: 6 }
        },
        fail: {
          text: "전사의 긍지가 부족하다는 수군거림을 들으며 결국 힘겨운 대련을 치렀다.",
          wounds: -12,
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Honour Duel"
  },
  {
    id: "ev_rank_scout_black_carapace",
    title: "네오파이트 최종 관문 — 검은 갑각 이식 전 실전",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["astartes_scout"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "계급: 아스타르테스 네오파이트",
    weight: 30,
    text: "스카웃 중대장이 그대를 호출했다. '18개 초인 장기가 자리 잡았으나, 파워 아머와 신경을 잇는 마지막 19번째 장기인 검은 갑각은 살아 돌아온 자에게만 허락된다. 랜드 스피더 스톰에 탑승해 오크 워보스의 연료 기지에 고속 강습을 감행하고 생환하라.'",
    choices: [
      {
        label: "[민첩 판정] 저공 급강하 중인 강습정에서 뛰어내려 적 요새 한복판에 궤도 타격 유도기를 꽂고 이탈한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "궤도 포격이 정확히 오크 연료 기지를 증발시켰다! 아포세카리가 그대에게 검은 갑각 이식 대기자 명단 최상단을 부여했다.",
          stats: { Ag: 6, BS: 5, WP: 5, Inf: 5 }
        },
        fail: {
          text: "오크 스퀴그 사냥개 떼에 포위되어 피투성이 백병전 끝에 겨우 유도기만 작동시키고 복귀했다.",
          wounds: -20,
          stats: { WS: 5, T: 4 }
        }
      },
      {
        label: "[사격 판정] 강습정 헤비 볼터와 컴뱃 샷건의 맹화력으로 오크 대공포대와 지휘 막사를 정면 분쇄한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 한 발의 낭비도 없는 기동 사격으로 적 요새를 화염에 잠식시켰다! 정식 배틀 브라더 승급이 눈앞에 다가왔다.",
          stats: { BS: 7, Int: 4, WP: 4 }
        },
        fail: {
          text: "적 대공 포화에 강습정이 피탄되어 부상을 입었으나 끝까지 임무 데이터를 지켜 냈다.",
          wounds: -18,
          stats: { T: 3 }
        }
      }
    ],
    source: "Lexicanum: Black Carapace / Codex: Space Marines"
  },
  {
    id: "ev_rank_brother_sergeant_pick",
    title: "배틀 브라더 — 쓰러진 베테랑 하사와 분대의 명예",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["astartes_brother"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "계급: 아스타르테스 배틀 브라더",
    weight: 28,
    text: "적 카오스 하복 분대의 집중 사격에 100년간 분대를 이끌어 온 베테랑 하사가 치명상을 입고 쓰러졌다. 중대 통신은 두절되었고, 남은 형제 여덟 명의 시선이 일제히 그대를 향한다. 누군가 하사의 체인소드를 이어받아 분대를 지휘해야 한다!",
    choices: [
      {
        label: "[의지 판정] 하사의 지휘 표식을 이어받고 완벽한 측면 교차 돌격을 호령한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 명의 추가 전사자 없이 적 중화기 진지를 붕괴시켰다! 전투 후 중대장이 그대의 지휘력을 극찬하며 차기 분대장 승격 추천 명단에 이름을 올렸다.",
          stats: { WP: 6, Fel: 6, WS: 5, Inf: 8 }
        },
        fail: {
          text: "돌격 타이밍이 어긋나 큰 피해를 입었으나, 쓰러진 하사의 진시드만은 끝까지 회수해 돌아왔다.",
          wounds: -22,
          stats: { WP: 4, Inf: 2 }
        }
      },
      {
        label: "[백병 판정] 말보다 몸이 앞선다. 직접 선봉에 서서 적 화망을 끌어안고 형제들의 길을 연다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "파워 아머에 수십 발의 탄흔을 새기며 적진을 뚫었다! 살아남은 형제들이 그대의 용맹을 챕터 연대기에 기록했다.",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "라스캐논 직격을 스쳐 중상을 입었으나 형제들의 엄호로 구출되었다.",
          wounds: -26,
          stats: { T: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Deathwatch Core"
  },
  {
    id: "ev_rank_captain_chapter_master",
    title: "아스타르테스 중대장 — 성전 함대 총사령관 대행의 무게",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["astartes_captain"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "계급: 아스타르테스 중대장",
    weight: 28,
    text: "성계 탈환전 도중 챕터 마스터가 대악마의 일격에 중상을 입고 아포세카리움으로 후송되었다! 3개 중대 300명의 아스타르테스와 제국 해군 호위 함대, 아스트라 밀리타룸 10개 연대의 지휘권이 임시로 중대장인 그대의 어깨에 떨어졌다.",
    choices: [
      {
        label: "[지성 판정] 궤도 강습과 지면 기갑 공세를 초 단위로 맞물린 대반격 작전을 총지휘한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "압도적인 전술 지휘로 반역 성계 전체를 14일 만에 해방했다! 차기 챕터 마스터 유력 후보로 제국 전역에 이름이 드높아졌다.",
          stats: { Int: 7, Fel: 6, Inf: 12, WP: 5 }
        },
        fail: {
          text: "아스트라 밀리타룸과 해군 간 협조가 어긋나 뼈아픈 소모전 끝에 겨우 승리를 거뒀다.",
          wounds: -18,
          stats: { WP: 4, Inf: 3 }
        }
      },
      {
        label: "[백병 판정] 제1중대 베테랑들과 함께 드롭 포드로 적 사령함에 직접 강습해 전쟁을 단칼에 끝낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "적 카오스 군주의 머리를 베어 함교에 내걸었다! 전 함대가 그대의 이름을 외치며 승리를 선포했다!",
          stats: { WS: 8, WP: 6, Inf: 10 },
          wounds: -14
        },
        fail: {
          text: "적 터미네이터 친위대의 반격에 중상을 입고 텔레포트로 긴급 철수했으나 적 기함은 무력화했다.",
          wounds: -28,
          stats: { WS: 4, T: 4 }
        }
      }
    ],
    source: "Codex: Space Marines"
  },
  {
    id: "ev_arc_dreadnought_awakening",
    title: "고대 석관의 각성 — 기억이 풍화되는 수백 년의 전장",
    category: "아스타르테스",
    once: true,
    req: {
      allTags: ["astartes", "dreadnought"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 · 드레드노트 안치",
    weight: 42,
    text: "차가운 양수 석관에 전류가 흐르며 기나긴 동면에서 깨어났다. 테크마린이 경건히 향을 피우며 전황을 보고하지만, 한때 함께 웃던 옛 형제들은 이미 수 세기 전 별이 되었고 바깥의 챕터 신병들은 그대를 살아 있는 전설이자 낯선 고대 유물처럼 올려다본다.",
    choices: [
      {
        label: "[의지 판정] 희미해져 가는 인간 시절의 이름을 끝까지 붙잡고 젊은 배틀 브라더들에게 고대 전술을 전수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "강철 확성기 너머로 울려 퍼진 고대 영웅의 훈시에 중대 전체의 사기가 하늘을 찔렀다! 그대는 챕터의 살아 있는 기억으로 추앙받았다.",
          stats: { WP: 8, Int: 7, Inf: 10 },
          faith: 8
        },
        fail: {
          text: "수백 년 전 전장과 현재가 겹쳐 보이는 극심한 혼란 속에 신경 인터페이스가 과부하를 일으켰으나, 곧 의식을 다잡았다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[사격 판정] 어썰트 캐논과 파워 피스트를 전개해 챕터 군기를 노리는 적 기갑 열을 단독으로 분쇄한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "'죽음 속에서도 의무는 끝나지 않는다!' 압도적인 중화기와 장갑으로 적 전차 중대를 고철 더미로 만들며 후배 형제들을 구해 냈다.",
          stats: { BS: 8, WS: 6, Inf: 8 }
        },
        fail: {
          text: "적 대전차 멜타 포격에 장갑판이 크게 녹아내렸으나, 테크마린의 긴급 봉합으로 석관의 불꽃은 꺼지지 않았다.",
          wounds: -20,
          stats: { T: 5 }
        }
      },
      {
        label: "말없이 거신 병기의 기계령과 호흡을 맞추며 다음 전장이 부를 때까지 고요히 석관을 지킨다",
        effect: {
          text: "분노도 슬픔도 강철의 정적 속에 가라앉았다. 오직 황제를 향한 영원한 충성만이 석관 안에서 박동한다.",
          stats: { T: 7, WP: 5 },
          wounds: 15
        }
      }
    ],
    source: "Lexicanum: Space Marine Dreadnought / Codex: Space Marines"
  },
  {
    id: "ev_arc_primaris_tension",
    title: "루비콘의 너머 — 퍼스트본과 프라이머리스 사이의 균열",
    category: "아스타르테스",
    once: true,
    req: {
      allTags: ["astartes", "primaris"],
      greatRift: true,
      excludeTags: ["grey_knight", "dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 · 프라이머리스",
    weight: 38,
    text: "루비콘 프라이머리스 시술 이후 더 거대해진 체구와 벨리사리우스 카울의 신형 마크 10 아머를 두르고 있지만, 챕터 일부 고참 퍼스트본 베테랑들은 '화성 기계사제가 만든 신형 전사가 우리 챕터의 1만 년 영혼을 진정 이해하는가'라며 차가운 시선을 보낸다.",
    choices: [
      {
        label: "[백병 판정] 챕터의 전통 명예 결투장에 자진해 서서 신형 장기가 아닌 형제애와 기량으로 인정을 받는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "치열한 대련 끝에 고참 베테랑이 웃으며 그대의 팔을 맞잡았다! '껍데기가 달라졌어도 피는 같은 형제군.' 챕터의 균열이 봉합되었다.",
          stats: { WS: 7, Fel: 7, Inf: 8, WP: 4 }
        },
        fail: {
          text: "노련한 고참 형제의 변칙 일격에 무릎을 꿇었으나, 끝까지 포기하지 않는 투지에 상대도 묵묵히 경의를 표했다.",
          wounds: -18,
          stats: { T: 4, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 신형 볼트 라이플의 화력 교리와 챕터 고유의 전통 전술을 융합한 합동 작전안을 정립한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "퍼스트본의 노련함과 프라이머리스의 화력이 완벽히 맞물린 합동 작전이 대승을 거두며 중대 전체의 신뢰를 얻었다!",
          stats: { Int: 7, BS: 5, Inf: 7 }
        },
        fail: {
          text: "교리 조율 회의에서 보수파 베테랑들과 언쟁이 길어지며 한동안 냉랭한 분위기가 이어졌다.",
          stats: { Inf: -3, Int: 3 }
        }
      },
      {
        label: "변명 대신 가장 위험한 최선봉 드롭 포드에 올라 묵묵히 전장에서 챕터의 이름을 증명한다",
        effect: {
          text: "말보다 앞선 피와 탄환이 의심을 잠재웠다. 상처투성이 갑주 위에 챕터 문장이 당당히 빛난다.",
          stats: { T: 5, WP: 5, Inf: 5 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Primaris Space Marines / Dark Imperium"
  },
  {
    id: "ev_s4_career_astartes_drop",
    title: "아스타르테스 — 궤도 강하 포드 피격과 필멸자 연대의 구원 요청",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 18,
      anyCareers: ["astartes_brother", "astartes_sergeant"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스타르테스 배틀 브라더 · 분대장",
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
  // 12단계: 아스타르테스 4대 전문 직책 분화(채플린·아포세카리·테크마린·라이브러리안) & 계급 심화 9종
  // =========================================================================
  {
    id: "ev_s12_astartes_specialist_call",
    title: "챕터 지휘부의 소명 — 네 개의 성스러운 전문 직책",
    category: "아스타르테스 직책",
    once: true,
    req: {
      anyCareers: ["astartes_brother", "astartes_sergeant", "astartes_veteran"],
      excludeTags: ["role_chaplain", "role_apothecary", "role_techmarine", "role_librarian", "dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 배틀 브라더~1중대 베테랑 · 전문 직책 미보유",
    weight: 38,
    text: "수십 년의 전장을 거친 그대의 자질을 지켜본 챕터 고위 의회가 네 개의 특수 본부인 레클루시움과 아포세카리움, 무기고, 라이브러리우스 가운데 한 곳의 수련 자격을 제안했다. 어떤 성스러운 임무를 짊어지고 형제단을 섬길 것인가?",
    choices: [
      {
        label: "[의지 58+ 해금] 해골 투구와 크로지우스를 받들어 챕터 채플린으로 서품받는다",
        req: { stats: { WP: 58 } },
        effect: {
          text: "검은 파워 아머와 해골 투구를 하사받았다! 이제 형제들의 신앙과 증오의 기도문을 수호하는 영적 지도자가 되었다.",
          stats: { WP: 7, Fel: 6, WS: 4, Inf: 6 },
          faith: 12,
          addTags: ["role_chaplain"]
        }
      },
      {
        label: "[지성 54+ 해금] 백색 갑주와 나르테키움을 장비하고 챕터 아포세카리의 길을 걷는다",
        req: { stats: { Int: 54 } },
        effect: {
          text: "챕터의 미래인 진시드를 지키는 성스러운 의무가 주어졌다! 전사한 형제의 마지막 숨결을 지키는 백색의 천사가 되었다.",
          stats: { Int: 7, T: 5, WP: 4, Inf: 5 },
          woundsBonus: 10,
          addTags: ["role_apothecary"]
        }
      },
      {
        label: "[지성 56+ 해금] 화성으로 파견되어 30년간 기계 교리를 익히고 붉은 갑주의 테크마린이 된다",
        req: { stats: { Int: 56 } },
        effect: {
          text: "화성에서 옴니시아의 비술과 서보-암을 익히고 귀환했다! 챕터의 전차와 드레드노트 기계령이 그대의 손길에 응답한다.",
          stats: { Int: 8, BS: 4, T: 5, Inf: 5 },
          addTags: ["role_techmarine", "bionic"]
        }
      },
      {
        label: "[사이커 · 블랙 템플러 제외] 푸른 갑주와 사이킥 후드를 받아 챕터 라이브러리안에 입문한다",
        req: { allTags: ["psyker"], excludeChapters: ["black_templars"] },
        effect: {
          text: "라이브러리우스의 비전 서고와 포스 웨폰을 계승했다! 워프의 폭풍을 검으로 벼려 형제단을 수호하는 현자가 되었다.",
          stats: { WP: 8, Int: 7, Inf: 6 },
          addTags: ["role_librarian", "librarius_trained"]
        }
      },
      {
        label: "특수 직책의 영예보다 순수한 전열의 배틀 브라더로 남아 검과 볼터에 전념한다",
        effect: {
          text: "최전선에서 형제들과 어깨를 맞대는 것만으로 충분하다. 중대장이 그대의 겸손한 무인 기질을 치하했다.",
          stats: { WS: 4, BS: 4, T: 3 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Space Marine Headquarters"
  },
  {
    id: "ev_s12_role_chaplain_litany",
    title: "챕터 채플린 — 무너지는 전열과 증오의 기도문",
    category: "아스타르테스 직책",
    once: true,
    req: {
      allTags: ["astartes", "role_chaplain"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 채플린",
    weight: 36,
    text: "배신자 군단의 악마적 사이킥 비명이 전장을 뒤덮으며 신참 배틀 브라더 분대의 정신이 흔들리고 있다. 검은 갑주의 해골 투구 너머로 그대가 크로지우스 아르카눔을 치켜들자 복스 확성기가 웅장하게 공명한다.",
    choices: [
      {
        label: "[의지 판정] 황제와 프라이마크의 증오의 기도문을 포효하며 가장 흉악한 카오스 투사를 향해 선봉 돌격한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "황금 에너지가 휘감긴 크로지우스가 적 투사의 투구를 박살 냈다! 형제들의 심장에 흔들리지 않는 순수한 분노가 다시 불타올랐다.",
          stats: { WP: 8, WS: 6, Fel: 5, Inf: 6 },
          faith: 10,
          corruption: -6
        },
        fail: {
          text: "적 투사의 체인액스에 흉갑이 갈라졌으나 끝까지 기도문을 멈추지 않아 분대를 구해 냈다.",
          wounds: -20,
          stats: { WP: 5, T: 4 },
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 흔들리는 형제 한 명 한 명의 이름을 부르며 챕터의 영원한 서약을 일깨운다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "그대의 장엄한 음성에 악마적 환청이 산산이 부서졌다! 단 한 명의 오염자도 없이 반격에 성공했다.",
          stats: { Fel: 7, WP: 6, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "사이킥 파동의 여파로 두통이 몰려왔으나 형제들의 전열은 굳건히 유지되었다.",
          wounds: -12,
          stats: { WP: 4 }
        }
      },
      {
        label: "전투 직후 레클루시움 성소에서 사흘 밤낮으로 정화 기도와 고행 의식을 집전한다",
        effect: {
          text: "모든 형제의 갑주와 영혼이 정결하게 정화되었다. 챕터의 순수성이 한층 견고해졌다.",
          stats: { WP: 5, Inf: 4 },
          faith: 8,
          corruption: -4
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Chaplain"
  },
  {
    id: "ev_s12_role_apothecary_geneseed",
    title: "챕터 아포세카리 — 포화 속 쓰러진 형제의 진시드 회수",
    category: "아스타르테스 직책",
    once: true,
    req: {
      allTags: ["astartes", "role_apothecary"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 아포세카리",
    weight: 36,
    text: "치열한 시가전 한복판, 1중대 베테랑 형제 셋이 적 중화기 화망 한가운데서 쓰러졌다. 적 궤도 폭격이 90초 뒤 쏟아질 예정이지만, 저 형제들의 프로제노이드 샘, 곧 진시드를 회수하지 못하면 챕터의 귀중한 유산이 영영 소실된다.",
    choices: [
      {
        label: "[강인 판정] 연막탄 너머 집중 포화를 백색 파워 아머로 받아 내며 나르테키움으로 세 형제의 진시드를 끝까지 적출한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "어깨와 등 갑주에 수십 발의 탄흔을 남기고도 세 개의 성스러운 진시드 용기를 무사히 품에 안고 귀환했다! 챕터 전체가 경의를 표했다.",
          stats: { T: 7, Int: 6, Inf: 7, WP: 5 }
        },
        fail: {
          text: "폭격 파편에 왼쪽 팔이 찢기는 중상을 입었으나 진시드 두 개를 끝내 지켜 냈다.",
          wounds: -24,
          stats: { T: 5, WP: 5 }
        }
      },
      {
        label: "[지성 판정] 생체 신호가 미약하게 남아 있는 형제 한 명을 먼저 응급 봉합해 살려 내고 나머지의 진시드를 회수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기적적인 야전 외과 처치로 베테랑 형제의 목숨을 건지고 전사자의 유산까지 모두 지켜 냈다!",
          stats: { Int: 8, Fel: 5, Inf: 7 }
        },
        fail: {
          text: "응급 처치 도중 폭발에 휘말렸으나 생존 형제를 들쳐 업고 철수하는 데 성공했다.",
          wounds: -18,
          stats: { Int: 4, T: 4 }
        }
      },
      {
        label: "엄호 분대에 제압 사격을 요청한 뒤 가장 가까운 형제의 진시드부터 안전하게 확보하고 철수한다",
        effect: {
          text: "아포세카리가 쓰러지면 누구도 챕터의 미래를 거둘 수 없다. 냉정한 판단으로 임무를 완수했다.",
          stats: { Int: 5, WP: 4, T: 3 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Apothecary"
  },
  {
    id: "ev_s12_role_techmarine_mars",
    title: "화성 수련 테크마린 — 챕터의 형제애와 옴니시아의 비밀",
    category: "아스타르테스 직책",
    once: true,
    req: {
      allTags: ["astartes", "role_techmarine"],
      excludeTags: ["astartes_captain", "chapter_master", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 테크마린",
    weight: 36,
    text: "전장에서 노획한 고대 랜드 레이더 전차의 기계령을 수복하던 중, 화성의 아크마고스 특사가 찾아와 '화성에서 맹세한 기계교의 비밀 서약에 따라 전차 내부의 고대 데이터 코어를 챕터 몰래 화성으로 넘기라'고 요구했다.",
    choices: [
      {
        label: "[지성 판정] 데이터 코어의 전술 암호만 복제해 화성에 넘기고 원본 기계령과 무장 설계도는 챕터에 귀속시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "이중 서약 사이의 절묘한 균형! 챕터는 전설적 랜드 레이더를 얻었고 화성과의 유대도 유지되었다.",
          stats: { Int: 8, Inf: 7, BS: 4 }
        },
        fail: {
          text: "복제 흔적이 발각되어 기계교 특사의 항의를 받았고, 화성과의 마찰로 챕터 내부에서도 신중한 문책을 받았다.",
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "[의지 판정] '나의 첫 번째 충성은 오직 챕터와 프라이마크의 것'이라 선언하고 특사를 무기고 밖으로 돌려보낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "형제들이 그대를 향한 막연한 경계심을 완전히 풀었다! 챕터 무기고의 진정한 주인으로 인정받았다.",
          stats: { WP: 7, Fel: 6, Inf: 7 }
        },
        fail: {
          text: "화성 측의 부품 보급이 끊겨 장시간 직접 부품을 주조하다가 고열로 화상을 입었고, 외교적 입지도 좁아졌다.",
          wounds: -8,
          stats: { Inf: -3, WP: 2 }
        }
      },
      {
        label: "중대장에게 특사의 요구를 투명하게 보고해 챕터 차원의 공식 외교 협상으로 넘긴다",
        effect: {
          text: "숨김없는 보고 덕분에 테크마린의 충성심이 의심받을 여지를 완전히 차단했다.",
          stats: { Int: 5, Inf: 5 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Techmarine"
  },
  {
    id: "ev_s12_role_librarian_veil",
    title: "챕터 라이브러리안 — 워프의 장막 너머 적 사이커와의 정신 결투",
    category: "아스타르테스 직책",
    once: true,
    req: {
      allTags: ["astartes", "role_librarian"],
      excludeChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "아스타르테스 라이브러리안",
    weight: 36,
    text: "궤도 강하 직전, 카오스 소서러가 행성 대기권 전체에 광기의 정신 폭풍을 펼쳐 아군 중대의 통신과 시야를 마비시켰다. 푸른 갑주의 사이킥 후드가 강렬한 스파크를 뿜으며 워프의 광풍을 빨아들이고 있다.",
    choices: [
      {
        label: "[의지 판정] 사이킥 후드를 최대 개방하고 포스 소드로 적 소서러의 정신 연결을 정면에서 끊어 버린다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "푸른 번개가 대기권을 가르고 적 소서러의 영혼을 불태웠다! 맑게 갠 하늘 아래 아군 드롭 포드가 완벽히 강하했다.",
          stats: { WP: 9, Int: 6, Inf: 7 },
          corruption: -4
        },
        fail: {
          text: "워프 역류로 코피를 쏟으며 반동 피해를 입었으나 적의 정신 폭풍을 흩뜨리는 데 성공했다.",
          wounds: -20,
          corruption: 5,
          stats: { WP: 5 }
        }
      },
      {
        label: "[지성 판정] 챕터 라이브러리우스 비전 술식으로 적의 공격을 흘려보내고 중대 전체에 정신 차폐막만 씌운다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "절제된 완벽한 방어 술식! 단 한 명의 형제도 광기에 물들지 않고 적 소서러의 성소를 포위 섬멸했다.",
          stats: { Int: 8, WP: 6, Inf: 5 }
        },
        fail: {
          text: "차폐막 유지에 극심한 피로를 겪었으나 중대 전원이 무사히 착륙했다.",
          wounds: -14,
          stats: { Int: 4, WP: 4 }
        }
      },
      {
        label: "무리한 원격 대결을 피하고 적 소서러의 위치 좌표만 예지로 포착해 궤도 폭격을 유도한다",
        effect: {
          text: "워프의 힘은 교만하지 않을 때 가장 강하다. 정확한 예지로 성소를 지도에서 지웠다.",
          stats: { Int: 5, WP: 5 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Librarian"
  },
  {
    id: "ev_s12_scout_snipe_trial",
    title: "아스타르테스 네오파이트 — 72시간 미동 없는 정찰 잠복",
    category: "직군 심화",
    req: {
      anyCareers: ["astartes_scout"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스타르테스 네오파이트",
    weight: 28,
    text: "파워 아머도 없이 카멜레올린 망토 한 장만 걸친 채 적 사령부 앞 늪지대에 매복한 지 사흘째. 독충이 살갗을 파고들고 진흙물이 턱밑까지 차오르는 순간, 마침내 적 이단 지휘관이 장갑차에서 모습을 드러냈다.",
    choices: [
      {
        label: "[사격 판정] 호흡을 멈추고 1.2킬로미터 거리에서 스나이퍼 라이플 단발로 적 지휘관의 미간을 꿰뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 한 발의 정밀 사격으로 적 지휘 체계가 붕괴했다! 스카웃 하사가 정식 배틀 브라더 승격 추천서를 올렸다.",
          stats: { BS: 7, Ag: 5, Inf: 5 }
        },
        fail: {
          text: "강풍에 탄도가 살짝 빗나가 적 경호원만 쓰러뜨렸고, 추적대를 피해 가까스로 탈출했다.",
          wounds: -14,
          stats: { Ag: 4, BS: 3 }
        }
      },
      {
        label: "[강인 판정] 저격 대신 적 증원 부대 규모까지 24시간 더 잠복해 완벽한 정찰 도면을 작성한다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "초인 장기의 반수면 능력을 활용해 완벽한 첩보를 완성했다! 중대 본대가 적 사령부를 일망타진했다.",
          stats: { T: 7, Int: 5, WP: 5 }
        },
        fail: {
          text: "독성 늪지대 기체에 호흡기가 손상되었으나 정찰 기록은 무사히 전달했다.",
          wounds: -14,
          stats: { T: 4, WP: 3 }
        }
      },
      {
        label: "교본대로 표적 위치에 초음파 유도 비콘만 설치하고 소리 없이 철수한다",
        effect: {
          text: "공명심을 억누르고 정찰병의 본분을 다했다. 하사가 훌륭한 자제력이라 평가했다.",
          stats: { Ag: 4, WP: 4, Int: 3 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Space Marine Scout"
  },
  {
    id: "ev_s12_scout_battle_barge",
    title: "아스타르테스 네오파이트 — 배틀 바지 훈련장의 베테랑 검술 시련",
    category: "직군 심화",
    req: {
      anyCareers: ["astartes_scout"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스타르테스 네오파이트",
    weight: 26,
    text: "전선 이동 중인 배틀 바지 훈련장. 1중대 터미네이터 베테랑이 무딘 훈련용 체인소드를 던져 주며 '파워 아머를 입을 자격이 있다면 내 검을 3분만 버텨 보라'고 도발했다. 수십 명의 형제들이 지켜보고 있다.",
    choices: [
      {
        label: "[백병 판정] 정면으로 힘 싸움을 걸어 베테랑의 틈새를 노리는 과감한 반격을 감행한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "베테랑의 어깨 견갑에 선명한 검흔을 남겼다! 훈련장이 형제들의 주먹 두드리는 환호로 가득 찼다.",
          stats: { WS: 8, T: 4, Inf: 5 }
        },
        fail: {
          text: "베테랑의 일격에 늑골이 울리며 바닥을 굴렀으나 끝내 다시 일어서며 기백을 증명했다.",
          wounds: -14,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[민첩 판정] 스카웃 특유의 가벼운 기동력으로 베테랑의 육중한 검격을 흘려보내며 3분을 완벽히 버틴다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "단 한 번의 정타도 허용하지 않았다! 베테랑이 만족스러운 웃음과 함께 그대의 어깨를 두드렸다.",
          stats: { Ag: 7, WS: 5, WP: 4 }
        },
        fail: {
          text: "발목이 걸려 넘어지며 패배했으나 베테랑으로부터 실전 보법의 비결을 배웠다.",
          wounds: -10,
          stats: { Ag: 4, WS: 3 }
        }
      },
      {
        label: "승패에 집착하지 않고 베테랑의 모든 타격 각도와 방어 자세를 눈으로 익히며 훈련에 임한다",
        effect: {
          text: "겸허히 가르침을 흡수하는 태도 덕분에 전투 교리에 대한 이해가 한 단계 깊어졌다.",
          stats: { WS: 4, Int: 4, WP: 3 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Battle Barge"
  },
  {
    id: "ev_s12_captain_planetary_plea",
    title: "아스타르테스 중대장 — 두 행성의 동시 구원 요청",
    category: "직군 심화",
    req: {
      anyCareers: ["astartes_captain"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스타르테스 중대장",
    weight: 30,
    text: "성전 집결지의 요새 수도원 의회실에 두 동맹 지휘관의 아스트로패스 구원 청원이 동시에 당도했다. 한쪽은 제국군 5개 사단의 보급을 책임지는 포지 월드의 아크마고스이고, 다른 한쪽은 10억 순례자가 갇힌 성지 행성의 캐노네스다. 중대 병력 100명으로는 한 곳만 먼저 구할 수 있다.",
    choices: [
      {
        label: "[지성 판정] 중대를 2개 반중대로 분할하고 정밀 궤도 타격을 결합해 두 행성을 동시에 구원하는 초고난도 작전을 건다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "아스타르테스만이 가능한 전격 기동! 두 행성 모두 함락 직전에 구출되어 성역 전체에 중대의 전설이 퍼졌다.",
          stats: { Int: 9, Inf: 10, Fel: 6 }
        },
        fail: {
          text: "전력 분산으로 치열한 소모전을 치르며 부상을 입었으나 두 행성 모두 최악의 멸망은 막아 냈다.",
          wounds: -22,
          stats: { Int: 5, WP: 5 }
        }
      },
      {
        label: "전략적 대의를 택해 포지 월드부터 즉시 강하하여 성역 전체의 보급선을 지켜 낸다",
        effect: {
          text: "포지 월드를 완벽히 사수해 성역 반격의 기반을 다졌다. 성지 행성의 비극은 중대장의 영원한 무게로 남았다.",
          stats: { Int: 6, Inf: 7, WP: 4 }
        }
      },
      {
        label: "황제의 백성을 버릴 수 없다 — 성지 행성으로 즉시 강하해 10억 시민의 방패가 된다",
        effect: {
          text: "하늘에서 내려온 죽음의 천사들이 절망에 빠진 시민들을 구원했다. 국교와 백성들이 영원한 축복을 올렸다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 10
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Space Marine Captain"
  },
  {
    id: "ev_s12_captain_relic_vault",
    title: "아스타르테스 중대장 — 챕터 성물고의 고대 유물 계승",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["astartes_captain"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스타르테스 중대장",
    weight: 30,
    text: "대성전 시대부터 이어져 온 챕터 성물고의 문이 열렸다. 챕터 마스터가 그대의 혁혁한 무훈을 기리며, 성물고에 봉인된 세 가지 고대 유물 무구 중 하나를 전장에 들고 나갈 자격을 허락했다.",
    choices: [
      {
        label: "[백병 판정] 대성전 시대의 마스터-크래프트 유물 파워 소드를 선택해 검술 시련으로 기계령의 인정을 받는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "푸른 역장이 울부짖으며 고대 명검이 그대의 손에 완벽히 길들여졌다! 적 장갑을 종이처럼 베어 내는 전설의 검객이 되었다.",
          stats: { WS: 8, Inf: 8, WP: 4 }
        },
        fail: {
          text: "성격이 거친 고대 검의 반동에 손목을 베였으나 끝내 검의 주인이 되었다.",
          wounds: -12,
          stats: { WS: 5, Inf: 4 }
        }
      },
      {
        label: "[강인 판정] 전설적인 크룩스 테르미나투스가 새겨진 유물 터미네이터 갑주를 착용하고 수호의 맹세를 올린다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "황제의 갑주 파편이 박힌 전설의 무구가 그대를 감쌌다! 포화 속에서도 쓰러지지 않는 불멸의 중대장이 되었다.",
          stats: { T: 8, Inf: 8, WP: 5 },
          woundsBonus: 15
        },
        fail: {
          text: "갑주의 무거운 기계령을 동기화하는 데 오랜 진통을 겪었으나 결국 완벽히 착장했다.",
          wounds: -10,
          stats: { T: 5, Inf: 5 }
        }
      },
      {
        label: "유물은 챕터 전체의 자산이다 — 고대 성물 대신 전술 데이터 홀로리스를 열람해 선배 중대장들의 전략을 계승한다",
        effect: {
          text: "수천 년간 축적된 챕터 최고의 전략 지혜가 그대의 두뇌에 새겨졌다.",
          stats: { Int: 7, Fel: 5, Inf: 6 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Armoury of the Space Marines"
  }
];
