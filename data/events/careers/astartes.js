// 분기 사건 — 직군 계열: 아스타르테스 일반 · 계급(스카웃/배틀 브라더/중대장) · 선발 · 데스워치 · 스페이스 헐크 · 드레드노트 · 프라이머리스
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_astartes_recruiter",
    title: "하늘에서 내려온 거인들 — 챕터 징병관의 방문",
    category: "선발",
    once: true,
    req: {
      minAge: 11,
      maxAge: 16,
      gender: "male",
      excludeTags: ["astartes", "custodes", "abhuman", "heretic"],
      or: [{ anyTags: ["geneseed_compatible"] }, { anyWorldTags: ["astartes_recruit"] }]
    },
    reqLabel: "소년기(11~16세) · 진시드 적합 또는 챕터 징병 행성",
    weight: 28,
    text: "강철 썬더호크 강습정이 굉음과 함께 내려앉고, 2.5미터 거구의 아뎁투스 아스타르테스 채플린과 아포세카리가 소년들을 사열한다. '인류의 가장 어두운 시대에 맞설 천사의 후보를 찾노라. 죽음을 각오한 자만 앞으로 나서라!'",
    choices: [
      {
        label: "[강인 판정 · 목숨을 건 도전] 아스타르테스 선발 시련과 진시드 수술에 지원한다",
        req: { stats: { T: 34, WS: 32 } },
        check: { stat: "T", diff: -5 },
        success: {
          text: "수백 명의 지원자 중 극소수만 살아남은 혈전과 19개 초인 장기 이식을 견뎌 냈다! 그대는 아스타르테스 네오파이트가 되었다!",
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
        label: "[의지 55+ & 사이커 해금] 은빛 갑주의 비밀 사절 — 타이탄(그레이 나이트)의 부름에 응한다",
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
    title: "데스워치(Deathwatch) 파견 소집령",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes"], minAge: 25, excludeTags: ["grey_knight", "deathwatch_vet"] },
    reqLabel: "아스타르테스 · 나이 25세+",
    weight: 22,
    text: "오르도 제노스의 전투 조직 '데스워치'로부터 그대의 챕터로 파견 요청이 도착했다. 왼쪽 견갑을 은빛으로 물들이고 다른 챕터의 형제들과 함께 최악의 외계인 위협을 사냥하는 영광스러운 철야 근무다.",
    choices: [
      {
        label: "[백병/사격 판정] 파견을 수락하고 킬 팀(Kill-Team) 작전을 수행한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "네크론 무덤 행성과 엘다 해적선을 제압하고 은빛 견갑을 찬 채 명예롭게 챕터로 복귀했다!",
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
    req: { or: [{ allTags: ["astartes"] }, { allTags: ["custodes"] }, { anyCareers: ["tempestus_scion", "inquisitor"] }] },
    reqLabel: "아스타르테스 / 쿠스토데스 / 사이온 / 이단심문관",
    weight: 16,
    text: "수천 년간 워프를 표류하던 거대 난파선 집합체 '스페이스 헐크'가 행성계에 출현했다. 내부에는 고대 유물과 진스틸러 둥지가 동시에 도사리고 있다.",
    choices: [
      {
        label: "[백병 판정] 좁은 격벽 통로를 돌파해 고대 챕터 성물과 데이터를 회수한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "진스틸러 브루드로드의 목을 베고 고대 아키오테크 성물을 되찾았다! 전설로 남을 무공이다.",
          stats: { WS: 8, T: 5, Inf: 12, Int: 4 },
          addTags: ["space_hulk_vet"]
        },
        fail: {
          text: "아다만티움 갑주마저 찢는 진스틸러의 발톱에 치명상을 입고 긴급 텔레포트로 탈출했다.",
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
    title: "죽음마저 끝나지 않는 의무 — 드레드노트 안치",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes"], maxWounds: 38, excludeTags: ["dreadnought"] },
    reqLabel: "아스타르테스 · 생명력 38 이하 위독 상태",
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
    req: { anyCareers: ["astartes_brother", "astartes_captain"], anyWorldTags: ["astartes_recruit"] },
    reqLabel: "배틀 브라더/중대장 · 챕터 징병 행성 방문",
    weight: 30,
    text: "썬더호크에서 내린 2.5미터 파워 아머의 위용 앞에, 한때 그대 역시 속해 있었을 언더하이브 갱단원들과 부족 소년들이 숨을 죽이고 무릎을 꿇는다. 채플린과 함께 새로운 챕터 후보생(Aspirant)들을 선발할 차례다.",
    choices: [
      {
        label: "[의지/지성 판정] 가장 거칠고 끝까지 눈을 피하지 않은 하층민 소년을 직접 지목한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "날카로운 안목으로 탁월한 유전 적성의 신병 3명을 발굴했다! 챕터 마스터가 그대의 안목을 높이 평가했다.",
          stats: { Int: 4, Inf: 8, WP: 4 }
        },
        fail: {
          text: "선발된 후보생 대다수가 시련을 넘기지 못했지만, 그것이 아스타르테스의 냉혹한 법칙이다.",
          stats: { WP: 3 }
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
    title: "챕터 라이브러리우스 — 전투 사이킥과 정신 두건의 시련",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes", "psyker"], excludeTags: ["grey_knight", "librarius_trained"] },
    reqLabel: "아스타르테스 + 사이커 자질",
    weight: 36,
    text: "아스타르테스 내의 사이커는 검은 함선이 아니라 챕터 치프 라이브러리안의 직속 시련을 거친다. 푸른 갑주의 선배들이 그대의 정신에 워프 폭풍을 직접 투사하며 묻는다. '너는 이 힘을 지배할 것인가, 아니면 지배당해 형제들의 볼터에 죽을 것인가!'",
    choices: [
      {
        label: "[의지 판정] 챕터 전투 함성을 내질러 워프 폭풍을 찢고 사이킥 두건(Psychic Hood)을 수여받는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "악마의 환상을 산산조각 내고 정식 챕터 라이브러리안 수련을 통과했다! 이제 워프 오염 저항과 전투 사이킥이 비약적으로 강화된다.",
          stats: { WP: 10, Int: 8, Inf: 8 },
          corruption: -15,
          addTags: ["librarius_trained", "sanctioned_psyker"]
        },
        fail: {
          text: "혹독한 정신 충격으로 며칠간 의식을 잃었으나, 치프 라이브러리안은 포기하지 않고 다음 시련을 기약했다.",
          wounds: -20,
          stats: { WP: 4 }
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
    req: { anyCareers: ["astartes_scout"] },
    reqLabel: "계급: 아스타르테스 네오파이트(스카웃)",
    weight: 26,
    text: "아직 검은 갑각과 파워 아머를 받지 못한 신참 네오파이트. 200년 경력의 베테랑 스카웃 병장이 차갑게 명령한다. '적 반역파 포병대 레이더를 소리 없이 폭파하라. 들키면 구원 따윈 없다.'",
    choices: [
      {
        label: "[민첩 판정] 카멜레온 망토에 몸을 숨기고 단검만으로 보초를 제거해 폭탄을 설치한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "완벽한 무음 침투로 포병 진지를 날려 버렸다! 스카웃 병장이 처음으로 고개를 끄덕이며 배틀 브라더 추천서를 써 주었다.",
          stats: { Ag: 6, BS: 5, WS: 4, Inf: 6 }
        },
        fail: {
          text: "경보가 울려 집중 포화 속에 간신히 탈출했다. 병장은 '아직 갑주를 입을 자격이 멀었다'며 혹독히 질책했다.",
          wounds: -26,
          stats: { T: 3, WP: 3 }
        }
      },
      {
        label: "[사격 판정] 장거리 스나이퍼 볼터로 적 지휘관과 탄약고를 원거리 저격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "1.2km 거리에서 탄약고 뇌관을 정밀 타격해 대폭발을 일으켰다!",
          stats: { BS: 6, Int: 4, Inf: 5 }
        },
        fail: {
          text: "역포격에 진지가 무너져 부상을 입고 철수했다.",
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
    req: { anyCareers: ["astartes_captain"] },
    reqLabel: "계급: 아스타르테스 중대장(캡틴)",
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
    title: "아스타르테스 형제 간의 명예 결투 (Honor Duel)",
    category: "아스타르테스",
    req: { allTags: ["astartes"], minAge: 20 },
    reqLabel: "아스타르테스 · 20세+",
    weight: 22,
    text: "합동 작전 중 타 중대(또는 형제 챕터)의 베테랑 전사가 작전 주도권을 두고 명예 결투를 신청했다! 목숨을 빼앗지 않는 첫 피(First Blood) 규칙 아래 수십 명의 형제들이 원형 투기장을 에워싼다.",
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
        label: "[지성/교섭 판정] 결투 대신 모의 워게임 전술 대결로 지휘 우위를 증명하자고 제안한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "《코덱스 아스타르테스》의 전술 원리로 상대를 완벽히 설득해 명예와 지휘권을 모두 지켜 냈다.",
          stats: { Int: 6, Fel: 4, Inf: 6 }
        },
        fail: {
          text: "전사의 긍지가 부족하다는 수군거림을 들으며 결국 힘겨운 대련을 치렀다.",
          wounds: -12,
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Codex: Space Marines / Space Wolves & Dark Angels Lore"
  },
  {
    id: "ev_rank_scout_black_carapace",
    title: "네오파이트 최종 관문 — 검은 갑각(Black Carapace) 이식 전 실전",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["astartes_scout"] },
    reqLabel: "계급: 아스타르테스 네오파이트",
    weight: 30,
    text: "스카웃 중대장이 그대를 호출했다. '18개 초인 장기가 자리 잡았으나, 파워 아머와 신경을 잇는 마지막 19번째 장기 — 검은 갑각은 살아 돌아온 자에게만 허락된다. 적 오크 워보스의 전초기지 좌표를 직접 확보해 오라.'",
    choices: [
      {
        label: "[민첩 판정] 카멜레올린 망토에 의지해 적진 한복판까지 잠입하여 정밀 타격 비콘을 설치한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "궤도 포격이 정확히 적 전초기지를 증발시켰다! 아포세카리가 그대에게 검은 갑각 이식 대기자 명단 최상단을 부여했다.",
          stats: { Ag: 6, BS: 5, WP: 5, Inf: 5 }
        },
        fail: {
          text: "오크 스퀴그 사냥개에게 발각되어 피투성이 백병전 끝에 겨우 좌표만 송신하고 복귀했다.",
          wounds: -20,
          stats: { WS: 5, T: 4 }
        }
      },
      {
        label: "[사격 판정] 고지대 폐허에서 스나이퍼 볼터로 적 통신병과 장교들을 차례로 저격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 한 발의 빗나감도 없는 저격으로 적 지휘망을 마비시켰다! 정식 배틀 브라더 승급이 눈앞에 다가왔다.",
          stats: { BS: 7, Int: 4, WP: 4 }
        },
        fail: {
          text: "적 박격포 반격에 엄폐물이 무너져 부상을 입었으나 끝까지 임무 데이터를 지켜 냈다.",
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
    req: { anyCareers: ["astartes_brother"] },
    reqLabel: "계급: 아스타르테스 배틀 브라더",
    weight: 28,
    text: "적 카오스 하복 분대의 집중 사격에 100년간 분대를 이끌어 온 베테랑 하사가 치명상을 입고 쓰러졌다. 중대 통신은 두절되었고, 남은 형제 여덟 명의 시선이 일제히 그대를 향한다. 누군가 하사의 체인소드를 이어받아 분대를 지휘해야 한다!",
    choices: [
      {
        label: "[의지/교섭 판정] 하사의 지휘 표식을 이어받고 완벽한 측면 교차 돌격을 호령한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 명의 추가 전사자 없이 적 중화기 진지를 붕괴시켰다! 전투 후 중대장이 그대를 정식 분대장(서전트)으로 승격시켰다.",
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
    req: { anyCareers: ["astartes_captain"] },
    reqLabel: "계급: 아스타르테스 중대장(캡틴)",
    weight: 28,
    text: "성계 탈환전 도중 챕터 마스터가 대악마의 일격에 중상을 입고 아포세카리움으로 후송되었다! 3개 중대 300명의 아스타르테스와 제국 해군 호위 함대, 아스트라 밀리타룸 10개 연대의 지휘권이 임시로 중대장인 그대의 어깨에 떨어졌다.",
    choices: [
      {
        label: "[지성/권위 판정] 궤도 강습과 지면 기갑 공세를 초 단위로 맞물린 대반격 작전을 총지휘한다",
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
    req: { allTags: ["astartes", "dreadnought"] },
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
    req: { allTags: ["astartes", "primaris"] },
    reqLabel: "아스타르테스 · 프라이머리스",
    weight: 38,
    text: "루비콘 프라이머리스 시술 이후 더 거대해진 체구와 벨리사리우스 카울의 신형 마크 X 아머를 두르고 있지만, 챕터 일부 고참 퍼스트본 베테랑들은 '화성 기계사제가 만든 신형 전사가 우리 챕터의 1만 년 영혼을 진정 이해하는가'라며 차가운 시선을 보낸다.",
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
  }
);
