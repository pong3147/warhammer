// 분기 사건 — 직군 계열: 제국 민·관·치안·해군·우주(노동자 · 갱단 · 아르비테스 · 아드미니스트라툼 · 네이비 · 로그 트레이더 · 제국 부조리)
export default [
  {
    id: "ev_administratum_typo",
    title: "양피지 위 숫자 하나의 대참사",
    category: "행정",
    req: {
      minAge: 18,
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "sororitas", "celestian", "canoness", "cardinal",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "inquisitor", "lord_inquisitor", "magos", "fabricator_locum", "fabricator_general",
        "navy_captain", "navy_admiral", "arbites_marshal", "departmento_head",
        "planetary_governor", "sector_lord", "rogue_trader", "rt_lord_captain", "guild_magnate", "crime_lord"
      ],
      or: [{ anyCareers: ["administratum", "admin_prefect_rank", "militarum_officer", "inquisition_acolyte"] }, { stats: { Int: 44 }, anyTags: ["citizen", "noble"] }]
    },
    reqLabel: "관료·장교·어콜라이트 또는 지성 44 이상 시민·귀족",
    weight: 15,
    leadVariants: [
      {
        req: { anyOriginClasses: ["noble", "high_noble"] },
        lead: "상류 가문에서 익힌 행성 회계와 영지 장부 감각 덕분에, 남들이 무심히 넘긴 문서의 이질감이 단번에 눈에 띄었다."
      },
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "어릴 적 배급표 한 장의 무게를 뼈저리게 겪어 본 탓에, 식량 할당란의 이상한 숫자 하나가 심장을 서늘하게 찔렀다."
      },
      {
        req: { anyOriginClasses: ["schola"] },
        lead: "스콜라 프로제니움에서 암기한 제국 십일조 규율과 수치 검산 습관이 결정적인 오차를 포착해 냈다."
      }
    ],
    text: "십일조 장부를 검수하던 중, 30년 전 선임 서기관의 잉크 번짐 때문에 인접 아그리 월드의 식량 할당량이 10배로 잘못 청구되어 반란이 임박했다는 사실을 발견했다!",
    choices: [
      {
        label: "[교섭 판정 · 귀족 출신] 가문의 행정 인맥과 사교 채널을 동원해 14단계 결재 절차를 단숨에 우회·정정한다",
        req: { anyOriginClasses: ["noble", "high_noble"] },
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "상급 서기관과의 사적인 자리에서 즉석 수정 인장을 받아 냈다! 인맥이 수억 명의 기아를 막고 그대의 권위도 함께 올렸다.",
          stats: { Fel: 5, Inf: 10, Int: 3 },
          align: { humane: 6 }
        },
        fail: {
          text: "인맥을 동원하려다 정적 가문의 견제에 걸려 감사부의 따가운 시선을 샀으나, 오류 정정만은 가까스로 통과시켰다.",
          stats: { Inf: -3, Int: 4 }
        }
      },
      {
        label: "[지성 판정] 14단계 관료 절차와 78개의 도장을 밤새 돌파해 오류를 바로잡는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "수억 명의 기아와 내전을 펜촉 하나로 막아 냈다! 고위 아뎁트가 그대의 유능함을 극찬했다.",
          stats: { Int: 6, Inf: 10, Fel: 3 },
          align: { humane: 8 }
        },
        fail: {
          text: "과로로 쓰러졌고 서류는 결국 예상 대기 기간 42년짜리 재검토 보류 서랍에 처박혔다.",
          wounds: -12,
          stats: { WP: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "전임자의 실수를 덮어 두고 내 책상 위로 불똥이 튀지 않게 은폐한다",
        effect: {
          text: "행성 하나가 폭동에 휩싸였다는 소식이 3년 뒤 들려왔지만, 그대의 평온한 출세길엔 흠집이 없었다.",
          stats: { Inf: 4 },
          faith: -5,
          corruption: 4,
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_navy_pirate_battle",
    title: "소행성대의 교전 — 드루카리 해적선 기습",
    category: "우주",
    req: {
      minAge: 16,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general", "cardinal"
      ],
      or: [{ anyCareers: ["imperial_navy", "navy_captain", "rt_seneschal", "rogue_trader"] }, { anyTags: ["voidborn"] }]
    },
    reqLabel: "임페리얼 네이비 · 로그 트레이더 · 보이드본",
    weight: 16,
    text: "근거리 오스펙스에 날카로운 가시 모양의 드루카리 습격선 편대가 포착되었다! 붙잡히면 죽음보다 끔찍한 코모라의 노예 신세다.",
    choices: [
      {
        label: "[사격 판정] 랜스 포대와 매크로 캐논의 일제 사격으로 적 기함을 격침한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "교묘한 기동을 예측한 포격이 적 순양함을 두 동강 냈다! 성계 함대에 명성을 떨쳤다.",
          stats: { BS: 6, Int: 4, Inf: 7 }
        },
        fail: {
          text: "적 강습 포드가 갑판을 뚫고 들어와 백병전 끝에 큰 부상을 입었다.",
          wounds: -26,
          stats: { WS: 3 }
        }
      },
      {
        label: "[민첩 판정] 급격한 선체 기동으로 소행성대 방어선 뒤로 빠져나간다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "환상적인 항해술로 드루카리 추격을 따돌리고 화물과 승무원을 온전히 지켰다.",
          stats: { Ag: 6, Int: 3, Inf: 5 }
        },
        fail: {
          text: "선체 외벽이 찢기며 감압 사고에 휘말려 다쳤다.",
          wounds: -20
        }
      }
    ],
    source: "Battlefleet Gothic Rulebook / Rogue Trader Core Rulebook"
  },
  {
    id: "ev_arbites_riot",
    title: "배급 축소와 하층 구역 대폭동",
    category: "치안",
    req: {
      minAge: 16,
      excludeHabitats: ["void"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "sector_lord", "planetary_governor",
        "fabricator_locum", "fabricator_general", "navy_admiral", "rt_lord_captain", "cardinal",
        "departmento_head", "crime_lord"
      ],
      or: [{ anyCareers: ["arbites", "arbites_judge_rank", "pdf_trooper", "militarum_officer"] }, { stats: { Inf: 42 } }]
    },
    reqLabel: "아르비테스 · 행성 방위군 · 장교 또는 권위 42 이상 필멸자",
    weight: 14,
    leadVariants: [
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "거친 사투리와 절박한 외침이 밀려드는 순간, 어릴 적 배를 곯며 자란 밑바닥 골목의 기억이 생생히 되살아났다."
      },
      {
        req: { anyOriginClasses: ["schola"] },
        lead: "스콜라 프로제니움에서 암송한 제국법의 준엄한 원칙이 소란스러운 함성 속에서도 흔들림 없이 떠올랐다."
      },
      {
        req: { anyOriginClasses: ["noble", "high_noble"] },
        lead: "높은 첨탑에서 내려다보기만 하던 밑바닥의 원성이 오늘 비로소 살기 띤 현실로 눈앞을 덮쳐 왔다."
      }
    ],
    text: "십일조 증액으로 시체 전분 배급이 반 토막 나자 분노한 노동자 수만 명이 총독궁으로 몰려들었다. 군중 속에는 정체불명의 이단 선동가가 섞여 있다는 첩보가 있다.",
    choices: [
      {
        label: "[교섭 판정 · 하층민 출신] 하층 구역 은어와 뒷골목 생리를 꿰뚫어 선동가가 숨긴 이단 표식을 군중 앞에서 폭로한다",
        req: { anyOriginClasses: ["underclass"] },
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "밑바닥의 말투로 선동가의 거짓을 낱낱이 까발리자 분노한 군중이 스스로 선동가를 묶어 내놓았다! 피 한 방울 없이 폭동을 잠재웠다.",
          stats: { Fel: 7, Int: 4, Inf: 7 },
          align: { humane: 9 }
        },
        fail: {
          text: "일부 노동자들은 귀를 기울였으나 무장 선동조가 먼저 돌을 던져 혼전에 휘말리고 말았다.",
          wounds: -14,
          stats: { Fel: 3, WS: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "[이단심문관·커미사르 전용] 광장 연단에 올라 배후 컬트 선동가를 즉석 색출·처단해 폭동을 5분 만에 잠재운다",
        req: { anyTags: ["inquisitor", "commissar", "lord_commissar"] },
        effect: {
          text: "단 한 발의 볼트 탄환이 선동가의 가면을 꿰뚫자 군중이 일제히 무릎을 꿇었다! 압도적 위엄으로 사태를 종결했다.",
          stats: { WP: 5, Inf: 8 },
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[교섭 판정] 선동가만 정확히 색출해 체포하고 비상 식량을 풀어 민심을 달랜다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "최소한의 유혈로 폭동을 가라앉히고 배후의 카오스 세포까지 일망타진했다!",
          stats: { Fel: 6, Int: 4, Inf: 8 },
          align: { humane: 8 }
        },
        fail: {
          text: "군중의 투석과 화염병에 휘말려 부상을 입고 체면을 구겼다.",
          wounds: -18,
          stats: { Inf: -4 },
          align: { humane: 5 }
        }
      },
      {
        label: "[백병 판정] 제국법의 이름으로 무자비하게 진압 작전을 감행한다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "쇼크 마울과 샷건의 벽 앞에 폭동은 3시간 만에 진압되었다. 냉혹한 질서가 회복되었다.",
          stats: { WS: 5, WP: 4, Inf: 5, Fel: -3 },
          align: { dogmatic: 8 }
        },
        fail: {
          text: "은신해 있던 무장 갱단의 반격에 중상을 입었다.",
          wounds: -24,
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_job_menial_press",
    title: "매뉴팩토룸의 용광로 사고 — '기계부터 구해라!'",
    category: "직업 고유",
    once: true,
    req: {
      anyCareers: ["menial_worker"],
      excludeHabitats: ["void"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직업: 행성 노동자 · 길드원",
    weight: 24,
    text: "탄약 조립 라인의 압력 밸브가 터지며 뜨거운 쇳물이 쏟아졌다! 동료 둘이 쇳물 앞에 고립되었지만, 공장 감독관과 기계교 사제가 고함을 지른다. '멍청이들아, 사람보다 성스러운 4번 프레스 기계령부터 냉각시켜! 노동자는 내일 다시 뽑으면 된다!'",
    choices: [
      {
        label: "[민첩 판정] 감독관의 명령을 무시하고 고립된 동료들을 먼저 끌어낸다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "동료 둘을 살려 냈지만 기계가 손상되었다는 죄목으로 한 달 치 배급이 삭감되고 태형을 맞았다. 그래도 동료들의 눈빛이 달라졌다.",
          stats: { Ag: 4, Fel: 6, WP: 4 },
          wounds: -12,
          align: { humane: 9 }
        },
        fail: {
          text: "쇳물에 화상을 입고 동료도 구하지 못한 채 작업 태만으로 매질까지 당했다.",
          wounds: -28,
          align: { humane: 6 }
        }
      },
      {
        label: "차갑게 명령에 복종해 냉각 밸브를 돌려 성스러운 기계령을 먼저 지킨다",
        effect: {
          text: "동료들의 비명이 멎은 뒤, 기계교 사제가 그대의 '올바른 우선순위'를 치하하며 반장 직책과 약간의 권위를 내렸다.",
          stats: { Int: 4, Inf: 6, Fel: -4 },
          faith: -3,
          align: { ruthless: 7 }
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_job_arbites_governor",
    title: "제국법의 저울 — 총독 아들의 폭주",
    category: "직업 고유",
    once: true,
    req: {
      anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직업: 아뎁투스 아르비테스",
    weight: 24,
    leadVariants: [
      {
        req: { anyOriginClasses: ["schola"] },
        lead: "혈연도 사적인 정실도 끊어 내도록 길러진 스콜라 프로제니움 출신 집행관에게, 권력자의 뇌물과 회유 따위는 가증스러운 모독일 뿐이었다."
      },
      {
        req: { anyOriginClasses: ["noble", "high_noble"] },
        lead: "같은 상류층 귀족 사회의 은밀한 생리를 잘 알기에, 총독 가문이 사건을 덮으려 얼마나 집요하게 움직일지 단번에 읽혔다."
      },
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "도로 위에 스러진 노동자들은 어릴 적 그대와 똑같은 밑바닥의 얼굴을 하고 있었다."
      }
    ],
    text: "만취한 행성 총독의 장남이 고급 반중력 차량으로 십일조 노동자 행렬을 들이받아 40명이 즉사했다! 총독은 막대한 금괴를 보내며 사건 무마를 요구하고 있다. 하지만 죽은 자들은 '황제의 십일조 생산 자산'이었다.",
    choices: [
      {
        label: "[지성 판정 · 스콜라 출신] 렉스 임페리알리스 십일조 보호 조항을 완벽히 암송해 성역 본부 직속 체포 영장을 즉석 발부한다",
        req: { anyOriginClasses: ["schola"] },
        check: { stat: "Int", diff: 5 },
        success: {
          text: "단 한 자도 틀리지 않은 제국법 조항 인용 앞에 총독 사병대조차 감히 총구를 들지 못했다! 총독의 장남을 압송하며 스콜라 정예의 위엄을 떨쳤다.",
          stats: { Int: 6, WP: 5, Inf: 10 },
          align: { dogmatic: 10 }
        },
        fail: {
          text: "총독 측 법률 고문단이 관할권 이의를 제기하며 시간을 끄는 바람에 격렬한 대치 끝에야 영장을 집행했다.",
          wounds: -16,
          stats: { Int: 3, Inf: 5 },
          align: { dogmatic: 7 }
        }
      },
      {
        label: "[의지 판정] 총독궁 문을 부수고 들어가 '제국 십일조 자산 훼손죄'로 아들을 체포한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "제국법은 행성 총독 위에도 군림한다! 성역 로드 마셜이 그대의 철두철미한 법 집행을 극찬했다.",
          stats: { WP: 6, Inf: 10, WS: 4 },
          align: { dogmatic: 9 }
        },
        fail: {
          text: "총독 사병대와의 총격전에서 중상을 입었지만 끝내 영장을 집행했다.",
          wounds: -24,
          stats: { WP: 5, Inf: 6 },
          align: { dogmatic: 7 }
        }
      },
      {
        label: "사망자를 '노후 자산 자연 손실'로 처리하고 총독의 정치적 후원을 받는다",
        effect: {
          text: "총독 가문의 막대한 후원금이 들어왔지만, 제국법의 수호자라는 양심에는 검은 얼룩이 졌다.",
          stats: { Inf: 8, Fel: 4 },
          corruption: 10,
          faith: -6,
          align: { ruthless: 9 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_job_navy_mutiny",
    title: "임페리얼 네이비 — 하층 포갑판 노예 선원의 반란",
    category: "직업 고유",
    once: true,
    req: {
      anyCareers: ["imperial_navy"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직업: 임페리얼 네이비",
    weight: 24,
    leadVariants: [
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "하층 포갑판의 쇠사슬과 숨 막히는 기름 냄새는 어릴 적 그대가 자라 온 바닥의 삶과 다르지 않았다."
      },
      {
        req: { anyOriginClasses: ["noble", "high_noble"] },
        lead: "가문의 함대 장교 교육에서 배운 대로라면, 하층 노역자의 항명은 지체 없는 본보기로 다스려야 할 중죄다."
      },
      {
        req: { anyOriginClasses: ["military_caste"], excludeHomeWorlds: ["krieg"] },
        lead: "대대로 제국군에 복무해 온 가문의 감각으로 보건대, 주동자만 떼어 내면 하층 포갑판의 분노는 충분히 수습할 수 있었다."
      }
    ],
    text: "18개월째 항구 없는 성간 항해에 내몰린 하층 포갑판 강제 징발 노역자 2,000명이 쇠사슬을 끊고 무기고를 점거했다! 함장은 차갑게 말한다. '해군 육전대를 투입할 필요 없소. 4번 구역의 공기 배출 레버만 당기시오.'",
    choices: [
      {
        label: "[교섭 판정 · 하층민 출신] 무장 없이 격벽 통화구 앞에 서서 노역자들의 언어로 식수·교대 개선을 약속하고 투항을 이끌어 낸다",
        req: { anyOriginClasses: ["underclass"] },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "귀족 장교들의 위선과 다른 진심이 통했다! 2,000명의 노역자가 무기를 내려놓고 투항해 함선의 전투력을 온전히 지켰다.",
          stats: { Fel: 7, WP: 4, Inf: 6 },
          align: { humane: 10 }
        },
        fail: {
          text: "분노가 이미 선을 넘은 주동자들이 통화구를 부수고 달려들어 결국 무력 진압 과정에서 부상을 입었다.",
          wounds: -18,
          stats: { Fel: 3, WS: 2 },
          align: { humane: 6 }
        }
      },
      {
        label: "[백병 판정] 진공 사살 대신 직접 해군 육전대를 이끌고 진입해 주동자만 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "유혈을 최소화하고 폭동을 진압했다! 살아남은 노역자들 덕분에 다음 전투에서 함포 장전 속도가 오히려 빨라졌다.",
          stats: { WS: 5, Fel: 6, Inf: 5 },
          align: { humane: 9 }
        },
        fail: {
          text: "분노한 노역자들의 렌치 공격에 큰 부상을 입고 간신히 진압을 마쳤다.",
          wounds: -24,
          stats: { WS: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "함장의 명령대로 4번 구역의 격벽을 닫고 우주 공간으로 공기를 배출한다",
        effect: {
          text: "30초 만에 반란이 끝났다. 새 노역자는 다음 하이브 월드 정박 때 다시 징발하면 그만이다. 냉혹한 효율이 함대의 신임을 얻었다.",
          stats: { Inf: 8, WP: 3, Fel: -5 },
          faith: -3,
          align: { ruthless: 9 }
        }
      }
    ],
    source: "Battlefleet Gothic Rulebook / Rogue Trader Core Rulebook"
  },
  {
    id: "ev_absurd_medicae_triage",
    title: "야전 의무소의 냉혹한 분류 — '약은 장교용, 병사는 기도뿐'",
    category: "부조리",
    req: {
      minAge: 15,
      excludeHabitats: ["void"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "noble", "wealthy", "officer", "commissar", "lord_commissar", "commissar_general",
        "general_rank", "warmaster", "sororitas", "celestian", "canoness", "cardinal",
        "inquisitor", "lord_inquisitor", "inquisition_agent",
        "mechanicus", "tech_priest", "magos", "fabricator_locum", "fabricator_general",
        "navy_captain", "navy_admiral", "arbites_judge", "arbites_marshal",
        "admin_prefect", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_seneschal", "rt_lord_captain", "guild_magnate", "crime_lord",
        "tempestus_prime", "psyker_primaris", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "일반 시민 · 하급 병사",
    weight: 16,
    text: "고열과 부상으로 제국 야전 의무소에 실려 갔다. 의무관은 차트를 훑더니 덤덤히 말한다. '장교·귀족 전용 항생제는 재고가 부족하네. 하급 시민용 표준 처방은 진통제 반 알과 《황제 치유 기도문》 10회 암송이야. 아니면 바로 서비터 부서로 넘길까?'",
    choices: [
      {
        label: "[강인 판정] 치욕과 고통을 악물고 진통제 반 알만으로 자력 회복에 버틴다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "지독한 생존력으로 병마를 이겨 내고 멀쩡히 걸어 나왔다! 의무관마저 혀를 내둘렀다.",
          stats: { T: 5, WP: 3 },
          wounds: 10
        },
        fail: {
          text: "제대로 된 치료를 받지 못해 오랜 후유증에 시달렸다.",
          wounds: -18
        }
      },
      {
        label: "[교섭 판정] 비상용 담배와 암시장 화폐를 몰래 찔러 넣어 정상 약품을 얻어낸다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "의무관이 슬쩍 웃으며 장교용 정제 항생제를 꺼내 주었다. 제국을 굴리는 진짜 기름은 뇌물이다.",
          stats: { Fel: 4, Inf: -2 },
          wounds: 18
        },
        fail: {
          text: "뇌물이 적다며 면박만 당하고 복도 끝으로 밀려났다.",
          wounds: -12
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_absurd_servitor_sentence",
    title: "서비터 전환 재판 — 이웃의 사소한 죄",
    category: "부조리",
    req: {
      minAge: 15,
      maxSocialTier: "common",
      excludeHabitats: ["void"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["cloistered", "heretic", "mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "noble", "navigator", "knight_blood", "imperial_knight", "assassin", "living_saint", "saint_vessel", "sororitas",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "canoness", "cardinal", "inquisitor", "lord_inquisitor",
        "magos", "fabricator_locum", "fabricator_general",
        "navy_captain", "navy_admiral", "arbites_judge", "arbites_marshal",
        "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_lord_captain", "guild_magnate", "crime_lord",
        "tempestus_prime", "psyker_primaris"
      ]
    },
    reqLabel: "15세 이상 일반 제국 시민",
    weight: 16,
    text: "평소 알고 지내던 성실한 기술공이 '배급 빵 두 덩이 절도 및 작업 7분 지각' 죄목으로 뇌엽을 절제해 영구 기계 노예로 만드는 기계교 서비터 전환형을 선고받았다. 탄원서를 낼 마지막 10분이 남아 있다.",
    choices: [
      {
        label: "[교섭 판정] 재판관 앞에 나서 작업장 핵심 인력임을 설득해 벌금형으로 감형시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "기적적으로 서비터 개조 명령이 철회되었다! 구역 사람들 사이에서 그대의 덕망이 높아졌다.",
          stats: { Fel: 5, Inf: 5, WP: 3 },
          align: { humane: 8 }
        },
        fail: {
          text: "재판관이 '범죄자 두둔은 동조 혐의'라며 싸늘하게 경고해 입을 다물 수밖에 없었다.",
          stats: { Inf: -4, WP: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "제국의 법정은 감정을 용납하지 않는다. 다음 차례가 내가 되지 않게 고개를 돌린다",
        effect: {
          text: "일주일 뒤 공장에 새로 배치된 문지기 서비터가 텅 빈 눈으로 그대를 향해 자동문을 열어 주었다.",
          stats: { WP: 2 },
          faith: -3,
          align: { ruthless: 5 }
        }
      }
    ],
    source: "Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_absurd_upper_lottery",
    title: "10만 분의 1의 희망 — '상층 첨탑 이주권' 추첨 축제",
    category: "부조리",
    req: {
      minAge: 14,
      excludeHabitats: ["void"],
      anyWorldTags: ["hive", "industrial", "civilised", "terra"],
      excludeTags: [
        "noble", "wealthy",
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "general_rank", "commissar", "lord_commissar", "commissar_general",
        "sororitas", "celestian", "canoness", "cardinal",
        "inquisitor", "lord_inquisitor",
        "mechanicus", "tech_priest", "magos", "fabricator_locum", "fabricator_general",
        "navy_captain", "navy_admiral", "arbites_judge", "arbites_marshal",
        "admin_prefect", "departmento_head", "planetary_governor", "sector_lord",
        "rogue_trader", "rt_seneschal", "rt_lord_captain", "guild_magnate", "crime_lord",
        "tempestus_prime", "psyker_primaris"
      ]
    },
    reqLabel: "도시 · 하이브 일반 시민",
    weight: 15,
    text: "행성 총독부가 하층민의 불만을 달래기 위해 '모범 시민 1명에게 상층 첨탑 이주권 지급' 추첨을 열었다! 하지만 소문에 따르면 당첨자는 이미 총독 친인척으로 내정되어 있거나, 실은 제국 해군 징발함으로 보낸다는 흉흉한 이야기도 돈다.",
    choices: [
      {
        label: "[지성 판정] 공고문 깨알 약관을 분석해 함정이 있는지 확인한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "역시나 하단 0.5밀리미터 글씨에 '당첨자는 궤도 군수선 종신 봉사 영광 부여'라고 적혀 있었다! 함정을 피해 주변에 귀띔했다.",
          stats: { Int: 5, Fel: 4 }
        },
        fail: {
          text: "속는 셈 치고 응모했다가 낙첨되며 신청 수수료만 날렸다.",
          stats: { Inf: -2 }
        }
      },
      {
        label: "[의지 판정] 황제께서 굽어살피시리라 믿고 당당히 응모함에 이름을 넣는다",
        check: { stat: "WP", diff: -15 },
        success: {
          text: "뜻밖에도 진짜 소액 장려금과 작업장 반장 표창에 당첨되어 소소한 행운을 누렸다!",
          stats: { Inf: 6, Fel: 3 },
          wounds: 8
        },
        fail: {
          text: "당첨은 고사하고 응모자 명단이 세무국에 넘어가 추가 십일조 고지서만 날아왔다.",
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Warhammer Crime / Necromunda"
  },
  {
    id: "ev_absurd_pension_receipt",
    title: "제국 군부의 '120년 뒤 연금 지급 영수증'",
    category: "부조리",
    req: {
      minAge: 24,
      anyTags: ["militarum", "navy", "arbites", "administratum"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "transhuman",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "inquisitor", "lord_inquisitor", "navy_admiral", "arbites_marshal", "departmento_head",
        "planetary_governor", "sector_lord", "rt_lord_captain", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "24세 이상 · 군인 · 해군 · 치안대 · 관료",
    weight: 15,
    text: "오랜 복무 공로로 아드미니스트라툼 재무국에서 '명예 공로 연금 증서'가 도착했다. 기쁜 마음으로 열어 보니 현재 대기 순번 4억 1,200만 번, 예상 수령 시점 124년 후이며 본인 사망 시 영수증 자동 말소라고 적혀 있다.",
    choices: [
      {
        label: "[교섭 판정] 재무 서기관에게 훈장과 언변으로 매달려 당장 쓸 수 있는 현물 보급표로 맞바꾼다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "끈질긴 협상 끝에 고급 군화와 아마섹 한 상자, 약간의 권위 보증서를 받아 내는 데 성공했다!",
          stats: { Fel: 4, Inf: 5 },
          wounds: 8
        },
        fail: {
          text: "서기관이 '불경한 재촉'이라며 대기 순번을 6억 번대로 밀어 버리고 소란 벌금까지 매겼다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "헛웃음을 삼키며 벽에 액자로 걸어 두고 제국의 유머 감각을 되새긴다",
        effect: {
          text: "동료들이 증서를 보며 폭소를 터뜨렸다. 이 암울한 제국에서 웃음마저 없다면 미쳐 버릴 것이다.",
          stats: { WP: 4, Fel: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_admin_paper_avalanche",
    title: "아드미니스트라툼의 물리적 재앙 — '서류 산사태'",
    category: "부조리",
    req: {
      anyCareers: ["administratum"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직업: 아드미니스트라툼 관료",
    weight: 24,
    text: "100년째 쌓아 올린 높이 20미터짜리 세금 장부 탑이 진동을 견디지 못하고 무너져 내렸다! 수십만 장의 양피지 눈사태 속에 하급 서기관 셋이 파묻혔다.",
    choices: [
      {
        label: "[민첩 판정] 몸을 던져 매몰된 동료들을 끌어내고 흩어진 문서를 수습한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "동료들을 무사히 구출했다! 다만 상관은 사람보다 '300년 전 밀가루 영수증 분실'에 더 화를 냈다.",
          stats: { Ag: 4, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "무거운 철제 서류함에 발목이 깔려 한 달간 목발을 짚었다.",
          wounds: -18
        }
      },
      {
        label: "[지성 판정] 엉망이 된 서류더미를 36시간 만에 완벽히 재분류해 승진 발판으로 삼는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "경이로운 문서 정리 속도에 수석 서기관이 감탄하며 상급 직위를 내렸다!",
          stats: { Int: 6, Inf: 8 },
          wounds: -8
        },
        fail: {
          text: "철야 과로로 쓰러져 의무실 신세를 졌다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_career_menial_guild",
    title: "행성 노동자 · 길드원 — 작업반장 자리와 배급권 암투",
    category: "직군 고유",
    req: {
      anyCareers: ["menial_worker"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 행성 노동자 · 길드원, 크리그 제외",
    weight: 24,
    text: "공장 4교대 작업반장이 프레스 사고로 팔을 잃고 퇴출되자 그 자리가 비었다. 길드 감독은 '누구든 동료들의 불평불만 명단을 바치거나 생산 할당량을 140% 달성하면 반장 완장을 주겠다'고 공언했다.",
    choices: [
      {
        label: "[강인 판정] 피를 토하는 18시간 연속 작업으로 순수하게 할당량 140%를 돌파한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "동료들의 존경과 길드의 인정을 모두 거머쥐고 작업반장으로 승진했다! 깨끗한 식량 배급과 작은 인맥이 생겼다.",
          stats: { T: 5, Inf: 6, Fel: 4 },
          wounds: -6
        },
        fail: {
          text: "과로로 컨베이어 벨트 옆에 쓰러져 사흘간 임금을 몰수당했다.",
          wounds: -16,
          stats: { T: 2 }
        }
      },
      {
        label: "[교섭 판정] 불만 세력을 밀고하는 대신, 길드 감독에게 효율 개선안을 제안해 타협한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "기계 마모를 줄이면서 생산량을 늘리는 안이 채택되어 서무 감독관 보좌로 발탁되었다!",
          stats: { Int: 5, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "'주제넘은 일꾼이 감히 기계 공정을 논하느냐'며 뺨을 맞고 석탄 창고로 좌천되었다.",
          wounds: -10,
          stats: { Inf: -3 }
        }
      },
      {
        label: "출세 욕심을 접고 동료들과 조용히 몫을 나눠 가지며 살아남는 데 집중한다",
        effect: {
          text: "권력은 얻지 못했으나 힘든 날 서로 빵을 나눠 줄 든든한 작업반 동료들을 얻었다.",
          stats: { Fel: 3, T: 2 },
          wounds: 5
        }
      }
    ],
    source: "Imperium Maledictum Core / Lexicanum: Hive World"
  },
  {
    id: "ev_career_ganger_turf",
    title: "언더하이브 갱단원 — 고대 아키오테크 밀수 화물 쟁탈전",
    category: "직군 고유",
    req: {
      anyCareers: ["underhive_ganger"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 언더하이브 갱단원",
    weight: 26,
    text: "폐쇄된 하층 배수관 아래에서 황금빛 에너지 셀이 달린 고대 아키오테크 상자가 발견되었다! 적대 갱단 20여 명이 샷건과 도끼를 들고 몰려오고 있으며, 저편에서는 아르비테스 순찰대의 사이렌 소리마저 울려 퍼진다.",
    choices: [
      {
        label: "[민첩 판정] 적대 갱단과 치안대 사이에 유탄을 던져 혼전을 유도하고 상자만 챙겨 튄다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "완벽한 어부지리! 암시장 거상에게 아키오테크를 넘겨 막대한 자금과 하층 구역의 명성을 거머쥐었다!",
          stats: { Ag: 5, Inf: 7, Int: 3 }
        },
        fail: {
          text: "도주로가 막혀 샷건 파편을 어깨에 맞고 빈손으로 하수구로 기어 도망쳤다.",
          wounds: -20,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[백병 판정] 정면으로 들이받아 적 갱단 두목을 꺾고 아키오테크 상자를 독차지한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "피투성이 혈투 끝에 적 두목을 쓰러뜨리고 고대 아키오테크 화물을 온전히 손에 넣었다! 암시장 거상들이 그대의 배짱에 찬사를 보냈다.",
          stats: { WS: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "수적 열세에 밀려 쓰러졌다가 겨우 동료들의 부축으로 목숨만 건졌다.",
          wounds: -24,
          stats: { T: 3 }
        }
      },
      {
        label: "위험한 물건에 손을 떼고 안전하게 본거지로 철수한다",
        effect: {
          text: "언더하이브에서 오래 사는 비결은 욕심을 버릴 때를 아는 것이다.",
          stats: { Int: 3, Ag: 2 }
        }
      }
    ],
    source: "Necromunda: Underhive / Dark Heresy"
  },
  {
    id: "ev_career_navy_boarding",
    title: "임페리얼 네이비 — 워프 출구 앞 해적 강습정 방어전",
    category: "직군 고유",
    req: {
      anyCareers: ["imperial_navy"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 임페리얼 네이비",
    weight: 26,
    text: "순양함이 워프에서 빠져나와 겔러 필드를 끄는 바로 그 순간, 소행성대 뒤에 숨어 있던 드루카리 해적 강습정 세 척이 선체 측면에 강제 도킹했다! 기관실과 함교 중 어느 쪽을 먼저 막아야 할지 단 몇 초 안에 결단해야 한다.",
    choices: [
      {
        label: "[민첩 판정] 퓨리 요격기 편대를 긴급 발진시켜 적 모함의 엔진을 먼저 찢어 놓는다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "화려한 무중력 기동으로 외계 약탈선을 격침했다! 해군 제독이 직접 은빛 날개 훈장을 달아 주었다.",
          stats: { Ag: 6, BS: 5, Inf: 6 }
        },
        fail: {
          text: "외계 다크 랜스에 기체 날개가 녹아내려 비상 탈출 포드로 간신히 생환했다.",
          wounds: -20,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[백병 판정] 해군 육전대와 함께 샷건을 들고 기관실 격벽에서 백병전으로 적을 밀어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "좁은 통로에서 압도적인 산탄 화력으로 해적들을 진공 우주로 날려 버렸다! 선원들의 사기가 하늘을 찔렀다.",
          stats: { WS: 6, T: 4, Fel: 4 }
        },
        fail: {
          text: "독침 탄환에 팔을 맞고 쓰러졌으나 격벽 폐쇄 레버를 당겨 기관실만은 지켜 냈다.",
          wounds: -22,
          stats: { WP: 4 }
        }
      },
      {
        label: "침입 구획 전체의 대기압을 강제 배출해 외계인들을 우주로 쓸어 버린다",
        effect: {
          text: "그 구획에 있던 하급 선원 40명도 함께 희생되었으나, 순양함과 승무원 수만 명은 무사했다. 이것이 임페리얼 네이비의 냉혹한 계산이다.",
          stats: { Int: 5, WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Battlefleet Gothic Rulebook / Execution Hour"
  },
  {
    id: "ev_career_arbites_tithe",
    title: "아뎁투스 아르비테스 — 십일조 선적 거부 항구 봉쇄 강제 진압",
    category: "직군 고유",
    req: {
      anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아뎁투스 아르비테스",
    weight: 26,
    text: "행성 재무의회와 결탁한 반란 귀족 파벌이 3년째 제국 십일조 곡물과 군수 물자 선적을 거부한 채, 부패한 행성 경비대를 동원해 궤도 우주공항의 진입로를 봉쇄했다. 제국법 아래 십일조를 가로막는 자는 지위 고하를 막론하고 반역자일 뿐이다.",
    choices: [
      {
        label: "[백병 판정] 쇼크 마울과 컴뱃 샷건을 장전하고 아르비테스 장갑차로 봉쇄선 정문을 돌파한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'제국법의 이름으로 체포한다!' 반란 경비대를 순식간에 진압하고 주모 귀족들을 공개 처형했다. 십일조 수송선이 다시 궤도로 솟아오르며 제국 치안대의 절대 권위가 행성 전역에 각인되었다!",
          stats: { WS: 5, BS: 4, Inf: 8, WP: 4 }
        },
        fail: {
          text: "반란 경비대의 중화기 매복에 장갑차가 대파되어 중상을 입었으나, 결국 궤도 증원군이 내려와 봉쇄선을 무너뜨렸다.",
          wounds: -22,
          stats: { T: 4, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 재무의회의 비밀 계좌와 밀수 장부를 먼저 압수해 가담 귀족들이 스스로 항복하게 만든다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "피 한 방울 흘리지 않고 십일조 전액을 회수하고 부패 의회 일당을 일망타진했다!",
          stats: { Int: 6, Inf: 7, Fel: 4 }
        },
        fail: {
          text: "장부 일부가 소각되어 증거가 부족해졌고, 결국 지루한 항구 시가전 진압으로 넘어갔다.",
          wounds: -12,
          stats: { Int: 2 }
        }
      }
    ],
    source: "Enforcer: Shira Calpurnia / Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_career_admin_munitorum",
    title: "아드미니스트라툼 — 데파르트멘토 무니토룸 전시 징발 분쟁",
    category: "직군 고유",
    req: {
      anyCareers: ["administratum"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아드미니스트라툼",
    weight: 26,
    text: "인접 전선의 아스트라 밀리타룸 장군과 포지 월드 마고스가 동시에 같은 수송 선단과 프로메튬 연료 할당량을 요구하며 청원서를 들이밀었다! 어느 쪽에 우선 배정 도장을 찍느냐에 따라 한 전선이 무너지거나 기계교와 원수가 된다.",
    choices: [
      {
        label: "[지성 판정] 50년째 항구 창고에 방치된 잉여 예비 보급 명부를 찾아내 양쪽 수요를 모두 충족한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'황제의 놀라운 행정 기적!' 전선과 기계교 양쪽 모두에서 찬사가 쏟아졌고, 그대는 성역 수석 아뎁트로 파격 승진했다!",
          stats: { Int: 7, Inf: 8, Fel: 4 }
        },
        fail: {
          text: "창고 열쇠를 찾느라 사흘을 허비하는 사이 양측 사절이 서로 주먹다짐을 벌여 징계 경고를 받았다.",
          stats: { Inf: -5, Int: 3 }
        }
      },
      {
        label: "정치적 파장이 적은 쪽으로 표준 순번 규정만 적용해 깔끔히 결재 도장을 찍는다",
        effect: {
          text: "아드미니스트라툼에서 살아남는 비결은 오직 규정 번호 뒤에 숨는 것이다. 상급자의 신임을 지켰다.",
          stats: { Inf: 5, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Departmento Munitorum / Adeptus Administratum"
  },
  // =========================================================================
  // 12단계: 갱단 · 아드미니스트라툼 · 아르비테스 · 임페리얼 네이비 · 노동자 심화 9종
  // =========================================================================
  {
    id: "ev_s12_ganger_baron_war",
    title: "언더하이브 갱단원 — 정화수 공급관 쟁탈전과 구역 두목 등극",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["underhive_ganger"],
      excludeTags: ["ganger_baron", "heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 언더하이브 갱단원",
    weight: 34,
    alignBias: "ruthless",
    text: "하층 돔의 생명줄인 정화수 배관 교차점을 두고 라이벌 갱단 세 곳이 피비린내 나는 전쟁을 벌이고 있다. 지금 이 교차점을 장악하면 하층 구역 전체의 통행세와 암시장을 주무르는 구역 두목이 된다!",
    choices: [
      {
        label: "[백병 판정] 체인 액스와 샷건을 들고 적 두목의 은신처에 정면으로 쳐들어가 일기토로 결판낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "적 두목이 쓰러지자 양쪽 갱단원들이 일제히 무릎을 꿇었다! 하층 3개 구역이 그대의 이름 아래 통일되었다.",
          stats: { WS: 7, Inf: 9, Fel: 5 },
          addTags: ["ganger_baron"],
          align: { ruthless: 7 }
        },
        fail: {
          text: "독가스 함정에 걸려 크게 다쳤으나 부하들의 엄호로 간신히 구역을 지켜 냈다.",
          wounds: -20,
          stats: { T: 4, WS: 3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[교섭 판정] 두 라이벌 갱단이 서로 싸우다 탈진하도록 거짓 정보를 흘린 뒤 어부지리로 교차점을 접수한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "피 한 방울 거의 흘리지 않고 암시장과 수로를 손에 넣었다! 지하 세계의 전설적인 책사로 불리게 되었다.",
          stats: { Fel: 7, Int: 6, Inf: 9 },
          addTags: ["ganger_baron"],
          align: { ruthless: 8 }
        },
        fail: {
          text: "이간질이 들통나 양쪽에서 협공당했으나 뒷골목 통로로 탈출해 목숨을 건졌다.",
          wounds: -16,
          stats: { Ag: 4, Int: 3 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "구역 패권 경쟁 대신 수로 수리 길드와 손잡고 안전한 호위 수수료만 챙긴다",
        effect: {
          text: "눈에 띄지 않게 실속을 챙기며 하층 구역에서 탄탄한 기반을 다졌다.",
          stats: { Inf: 4, Ag: 3, T: 2 }
        }
      }
    ],
    source: "Necromunda Core Rulebook / Dark Heresy"
  },
  {
    id: "ev_s12_ganger_bounty_guild",
    title: "언더하이브 갱단원 — 상층 귀족의 도망친 후계자 현상금 의뢰",
    category: "직군 심화",
    req: {
      anyCareers: ["underhive_ganger"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 언더하이브 갱단원",
    weight: 26,
    text: "상층 첨탑 귀족 가문의 밀사가 거액의 쓰론 겔트를 들고 찾아왔다. 가출해 언더하이브 이단 모임에 빠져든 귀족 장남을 산 채로 잡아 오라는 의뢰다. 그런데 막상 은신처를 덮쳐 보니 그 청년은 부패한 가주인 귀족 영주의 세금 횡령 장부를 훔쳐 도망친 상태였다.",
    choices: [
      {
        label: "[민첩 판정] 의뢰대로 청년을 깔끔하게 제압해 귀족 가문에 넘기고 거액의 현상금을 받는다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "군말 없는 일 처리에 상층 가문이 대만족했다! 고가의 불법 플라즈마 권총과 거액을 손에 넣었다.",
          stats: { Ag: 6, Inf: 8, BS: 4 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "청년을 보호하던 지하 경호원들과 총격전을 벌여 부상을 입었으나 임무는 완수했다.",
          wounds: -16,
          stats: { BS: 3, Inf: 4 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "[지성 판정] 횡령 장부를 복사해 아르비테스와 귀족 양쪽을 저울질하며 더 큰 몸값을 끌어낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "완벽한 양면 거래로 귀족의 입막음 비용과 지하 세계의 신용을 동시에 챙겼다!",
          stats: { Int: 7, Fel: 6, Inf: 8 },
          align: { ruthless: 9 }
        },
        fail: {
          text: "귀족 가문이 보낸 암살자에게 추격당해 한동안 구역을 옮겨 숨어 지내야 했다.",
          wounds: -18,
          stats: { Ag: 4, Inf: -3 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "장부만 아르비테스 익명 투서함에 던져 주고 현상금 의뢰는 조용히 손을 뗀다",
        effect: {
          text: "돈은 못 벌었지만 상층 첨탑의 더러운 권력 싸움에 휘말리지 않았다.",
          stats: { WP: 4, Int: 4 },
          align: { humane: 6 }
        }
      }
    ],
    source: "Necromunda: Underhive / Imperium Maledictum"
  },
  {
    id: "ev_s12_admin_prefect_audit",
    title: "아드미니스트라툼 — 성계 십일조 특별 감사관 파견",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["administratum"],
      excludeTags: ["admin_prefect", "heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아드미니스트라툼",
    weight: 34,
    text: "인접 공업 행성의 십일조 납부량이 3년 연속 12% 미달되었다. 본부 고위 서기관이 그대에게 특별 감사 권한을 위임하며 원인을 밝혀내라 명했다. 현지 총독은 막대한 뇌물을 내밀며 '기후 이상으로 인한 일시적 감산'으로 처리해 달라 속삭인다.",
    choices: [
      {
        label: "[지성 판정] 10년 치 운송 전표와 전력 소모량을 교차 대조해 총독의 비밀 밀수 창고를 적발한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "완벽한 회계 감사로 총독의 횡령을 입증했다! 본부에서 그대를 정식 감사관으로 승진시켰다.",
          stats: { Int: 8, Inf: 9, WP: 4 },
          addTags: ["admin_prefect"]
        },
        fail: {
          text: "총독 측이 장부 창고에 방화를 저질러 결정적 증거가 모두 타 버렸고, 성과 부진으로 본부의 질책을 받았다.",
          stats: { Inf: -4, WP: -2 }
        }
      },
      {
        label: "[교섭 판정] 총독의 약점을 쥔 채 미납 십일조 150% 즉시 보충과 행정부 예산 기여를 합의해 낸다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "행성 반란 없이 십일조 초과 달성! 실무 능력을 인정받아 감사관 인장을 하사받았다.",
          stats: { Fel: 7, Inf: 9, Int: 4 },
          addTags: ["admin_prefect"]
        },
        fail: {
          text: "협상이 결렬되어 아르비테스 강제 징수대를 호출하는 소동을 겪으며 감사국 내 평판이 깎였다.",
          stats: { Inf: -3, Fel: -2 }
        }
      },
      {
        label: "규정대로 3개년 추가 증세 고지서만 발행하고 본부로 안전하게 복귀한다",
        effect: {
          text: "원칙에 충실한 관료적 처리로 아무 잡음 없이 임무를 마쳤다.",
          stats: { Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Imperium Maledictum"
  },
  {
    id: "ev_s12_admin_lost_planet",
    title: "아드미니스트라툼 — 400년 전 누락으로 잊힌 행성 재발견",
    category: "직군 심화",
    req: {
      anyCareers: ["administratum"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아드미니스트라툼",
    weight: 26,
    text: "지하 서고의 고대 천체 대장을 정리하던 중, 400년 전 워프 폭풍 이후 관할 이관이 누락되어 제국 장부에서 영구 말소되었던 인구 8억의 변경 광산 행성이 실은 멀쩡히 번영 중임을 발견했다. 그 행성은 4세기 동안 십일조를 한 푼도 내지 않은 채 독자적인 자치 문명을 일구어 온 상태다.",
    choices: [
      {
        label: "[지성 판정] 즉시 정정 보고서를 올려 400년 치 체납 십일조 재산정과 제국 편입 절차를 개시한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "제국 국고에 막대한 광물과 십일조 공급원이 복구되었다! 대서기관장이 그대의 매서운 눈썰미를 격찬했다.",
          stats: { Int: 7, Inf: 8, WP: 4 },
          align: { dogmatic: 9 }
        },
        fail: {
          text: "오류를 인정하기 싫어한 상급 부서가 보고서를 심의 보류함에 처박고 그대에게 월권 경고를 내렸다.",
          stats: { Inf: -4, WP: -2 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[권위 판정] 급격한 소급 징수로 반란이 나지 않게 '신규 발견 개척 행성'으로 재등록해 완만한 과세를 설계한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "제국은 새로운 자원 창고를 얻고 행성은 반란을 피했다! 진정한 제국 행정의 달인이다.",
          stats: { Inf: 8, Fel: 6, Int: 5 },
          align: { humane: 7 }
        },
        fail: {
          text: "감사부에서 절차 위반을 지적받아 시말서를 쓰고 징계 감봉을 당했다.",
          stats: { Inf: -4, Fel: -2 },
          align: { humane: 5 }
        }
      },
      {
        label: "400년 된 낡은 철자에 손을 댔다가 선배 부서들의 책임을 건드릴 수 있으니 조용히 서고 깊숙이 되돌려 놓는다",
        effect: {
          text: "은하계 어딘가의 평화로운 변경 주민들은 자신이 어떤 거대한 재앙을 피했는지 영원히 모를 것이다.",
          stats: { WP: 3, Fel: 3 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Dark Heresy / Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_s12_arbites_judge_seat",
    title: "아뎁투스 아르비테스 — 판관 승진 심사와 제국법의 무게",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["arbites"],
      excludeTags: ["arbites_judge", "heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아뎁투스 아르비테스",
    weight: 34,
    text: "행성 최고 법정에서 12년간 묵혀 온 대형 십일조 횡령·반역 사건의 최종 판결이 그대의 손에 맡겨졌다. 피고인은 행성 상공회의소 의장이며, 유죄를 선고하면 당장 내일 하이브 상층 길드들이 파업할 것이라 협박하고 있다.",
    choices: [
      {
        label: "[의지 판정] 제국법에 예외는 없다 — 흔들림 없이 즉결 사형과 전 재산 몰수를 선고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "법정의 위엄 앞에 길드들이 굴복했다! 마셜이 그대의 냉혹한 공정함을 인정해 판관 배지를 수여했다.",
          stats: { WP: 8, Inf: 9, Int: 4 },
          addTags: ["arbites_judge"],
          align: { dogmatic: 9 }
        },
        fail: {
          text: "판결 직후 상층 길드가 고용한 용병대가 법정 밖을 습격해 부상을 입었고, 소요 사태 책임으로 판관 임명이 보류되었다.",
          wounds: -18,
          stats: { Inf: -3, Fel: -2 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[지성 판정] 법전 942조 연좌 조항을 인용해 협박에 가담한 길드장들까지 동시에 법정 구속한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "완벽한 법리적 기습으로 반발 세력의 숨통을 단번에 끊었다! 전설적인 판관의 탄생이다.",
          stats: { Int: 8, Inf: 9, WP: 5 },
          addTags: ["arbites_judge"],
          align: { dogmatic: 8 }
        },
        fail: {
          text: "법리 논쟁이 길어지며 판결이 연기되었고, 그 틈에 길드 측이 증거를 은멸해 승진 심사에서 탈락했다.",
          stats: { Inf: -3, Fel: -2 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "피고인의 유죄를 확정하되 길드 파업을 막기 위해 몰수 재산 운영권만 임시 위원회에 위임한다",
        effect: {
          text: "법의 원칙과 행성 질서를 균형 있게 지켜 냈다.",
          stats: { Int: 5, Fel: 4, Inf: 5 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Dark Heresy: Book of Judgement / Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_s12_arbites_precinct_siege",
    title: "아뎁투스 아르비테스 — 폭동군에 포위된 치안 요새 사수전",
    category: "직군 심화",
    req: {
      anyCareers: ["arbites"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아뎁투스 아르비테스",
    weight: 26,
    text: "이단 선동가들의 책동으로 수만 명의 무장 폭동군이 아르비테스 치안 요새 정문을 포위했다! 외부 증원은 이틀 뒤에나 도착한다. 요새의 두꺼운 아다만티움 방벽 너머로 폭도들의 공성 차량이 밀려든다.",
    choices: [
      {
        label: "[사격 판정] 요새 방벽 위에서 익스큐셔너 탄환을 장전한 컴뱃 샷건과 헤비 스터버 교차 화망으로 공성 차량을 분쇄한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 제압 사격으로 폭동 주동자들과 공성 차량을 무력화했다! 이틀을 단 한 치도 밀리지 않고 버텨 냈다.",
          stats: { BS: 7, WP: 5, Inf: 6 }
        },
        fail: {
          text: "화염병과 로켓탄에 방벽 일부가 무너지며 화상을 입었으나 끝내 정문을 지켰다.",
          wounds: -20,
          stats: { T: 4, BS: 3 }
        }
      },
      {
        label: "[백병 판정] 진압 방패와 쇼크 마울을 들고 기동 타격대와 함께 정문 밖으로 역돌격해 지휘부를 꺾는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "검은 갑주의 철벽 방진이 폭동군 한복판을 갈라 선동가를 생포했다! 폭도들이 공포에 질려 흩어졌다.",
          stats: { WS: 8, WP: 6, Inf: 7 }
        },
        fail: {
          text: "수적 열세 속에 방패가 부서지며 중상을 입었으나 선동가를 쓰러뜨리는 데는 성공했다.",
          wounds: -22,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "요새 내부 방호 격벽을 단계적으로 봉쇄하며 최루 가스와 경고 방송으로 증원 도착까지 시간을 번다",
        effect: {
          text: "아르비테스 요새는 애초에 행성 반란을 버티도록 지어졌다. 최소 피해로 증원군을 맞이했다.",
          stats: { Int: 5, T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites / Enforcer Omnibus"
  },
  {
    id: "ev_s12_navy_commodore_fleet",
    title: "임페리얼 네이비 — 제국 함대 준장 임시 지휘권",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["imperial_navy"],
      minAge: 24,
      excludeTags: ["navy_commodore", "heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "24세 이상 임페리얼 네이비",
    weight: 34,
    text: "성계 외곽에서 카오스 순양함 전대와 조우한 순간, 기함의 사령관이 적 랜스 포격으로 전사했다! 6척의 제국 호위함과 경순양함이 지휘 공백 속에 흩어지려는 찰나, 함교에서 가장 침착한 그대에게 임시 전대 지휘권이 넘어왔다.",
    choices: [
      {
        label: "[지성 판정] 3차원 궤도 기동으로 적 순양함의 현측 사각을 파고들어 6척 동시 어뢰 일제 발사를 지휘한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "수십 발의 어뢰가 적 기함의 보이드 실드를 뚫고 허리를 두 동강 냈다! 전투 후 정식 함대 준장으로 승진했다.",
          stats: { Int: 8, Inf: 10, BS: 5 },
          addTags: ["navy_commodore"]
        },
        fail: {
          text: "적 역포격에 기함 함교가 흔들리며 부상을 입었으나 전대 손실을 줄이며 적을 물리쳤다.",
          wounds: -18,
          stats: { Int: 4, Inf: 5 }
        }
      },
      {
        label: "[사격 판정] 선수 랜스 포대와 매크로 포대의 장거리 정밀 포격으로 적 전대 기함부터 침묵시킨다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "1만 킬로미터 밖에서 명중한 선수 랜스 포대의 집중 광선이 적 전대 전체를 공황에 빠뜨렸다! 함대 준장의 영예를 거머쥐었다.",
          stats: { BS: 8, Inf: 10, WP: 4 },
          addTags: ["navy_commodore"]
        },
        fail: {
          text: "포격전이 길어지며 선체에 큰 피해를 입었으나 끝내 성계 항로를 지켜 냈다.",
          wounds: -20,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "무리한 결전 대신 궤도 방어 정거장 화력권까지 전대를 질서 있게 유도해 협공한다",
        effect: {
          text: "단 한 척의 아군 함선도 잃지 않고 적을 격퇴한 안정적인 함대 지휘였다.",
          stats: { Int: 5, WP: 4, Inf: 5 }
        }
      }
    ],
    source: "Battlefleet Gothic Rulebook / Lexicanum: Imperial Navy"
  },
  {
    id: "ev_s12_navy_void_salvage",
    title: "임페리얼 네이비 — 300년 전 표류 순양함 수색 작전",
    category: "직군 심화",
    req: {
      anyCareers: ["imperial_navy"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 임페리얼 네이비",
    weight: 26,
    text: "워프 조류가 잠잠해진 구역에서 300년 전 실종되었던 제국 루나급 순양함의 선체가 유령처럼 떠올랐다. 자동 구조 신호는 여전히 울리고 있지만, 선내 생체 반응은 불규칙하고 불길한 워프 잔류 파동이 감지된다.",
    choices: [
      {
        label: "[의지 판정] 해군 강습대와 함께 직접 승선해 함교 항해 일지와 고대 플라즈마 코어 도면을 회수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "선내에 떠도는 미친 승무원 잔당을 정화하고 300년 전 잃어버린 비밀 항로 기록을 되찾았다! 함대 사령부가 극찬했다.",
          stats: { WP: 7, Int: 6, Inf: 7 }
        },
        fail: {
          text: "워프 환각과 돌연변이 습격에 부상을 입고 급히 셔틀로 탈출했다.",
          wounds: -20,
          corruption: 6
        }
      },
      {
        label: "[지성 판정] 원격 서보 스컬 정찰로 위험 구역을 먼저 식별한 뒤 무기고와 블랙박스만 정밀 회수한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "오염된 하층 갑판을 피하고 기밀 기록과 멀쩡한 어뢰 12발을 안전하게 인양했다!",
          stats: { Int: 7, Inf: 6, BS: 3 }
        },
        fail: {
          text: "서보 스컬이 선내 자동 방어 포탑에 모조리 파괴되어 값비싼 탐사 장비를 잃고 빈손으로 철수했다.",
          stats: { Inf: -3, Int: -2 }
        }
      },
      {
        label: "워프 오염 위험이 크다. 해군 교리에 따라 장거리 어뢰로 선체를 정화 침몰시킨다",
        effect: {
          text: "아까운 전함이지만 보이지 않는 재앙을 항로에 남겨 둘 수는 없다. 신앙과 규율에 따른 결단이었다.",
          stats: { WP: 4, BS: 3 },
          faith: 4
        }
      }
    ],
    source: "Battlefleet Gothic Rulebook / Rogue Trader: Edge of the Abyss"
  },
  {
    id: "ev_s12_menial_shift_strike",
    title: "행성 노동자 — 18시간 연장 노역과 지하 매뉴팩토룸 파업 모의",
    category: "직군 심화",
    req: {
      anyCareers: ["menial_worker"],
      excludeHabitats: ["void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 행성 노동자, 크리그 제외",
    weight: 26,
    text: "전시 증산령으로 하루 18시간 연속 조업이 보름째 이어지자, 과로로 쓰러진 동료 셋이 컨베이어 벨트 아래로 사라졌다. 분노한 야간 조장들이 내일 새벽 용광로 밸브를 잠그고 집단 파업을 벌이자며 그대에게 동참을 요구한다. 아르비테스가 알면 전원 처형이다.",
    choices: [
      {
        label: "[교섭 판정] 파업 대신 '기계령 과열로 인한 정비 휴식 필요' 기술 탄원서를 작성해 감독관과 협상한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "생산 설비 파손을 두려워한 감독관이 교대 휴식 2시간과 시체 전분 추가 배급을 승인했다! 동료들의 목숨을 구했다.",
          stats: { Fel: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "감독관에게 건방지다며 채찍질을 당했으나 다행히 유혈 파업은 막았다.",
          wounds: -12,
          stats: { T: 3, Fel: 3 }
        }
      },
      {
        label: "[지성 판정] 고장 난 냉각 팬과 톱니를 밤새 손봐 작업장 온도를 낮추고 작업 효율을 높여 할당량을 맞춘다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "훨씬 적은 힘으로 할당량을 채울 수 있게 되자 감독관이 그대를 숙련 정비공으로 발탁했다!",
          stats: { Int: 7, T: 4, Inf: 5 }
        },
        fail: {
          text: "무단 수리 중 뜨거운 증기에 팔뚝을 데었으나 기계는 한결 부드럽게 돌아갔다.",
          wounds: -10,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "위험한 파업 모의에서 발을 빼고 묵묵히 할당량을 채우며 살아남는 데 집중한다",
        effect: {
          text: "다음 날 새벽 아르비테스 기동대가 파업 주동자들을 서비터 공장으로 끌고 갔다. 침묵이 목숨을 살렸다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Imperium Maledictum / Lexicanum: Imperial Citizens"
  }
];
