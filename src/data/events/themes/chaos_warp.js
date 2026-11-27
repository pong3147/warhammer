// 분기 사건 — 카오스 4대 신 · 컬티스트 · 배신자 군단 · 워프 현상 · 사이커(생션드/무등록)
export default [
  {
    id: "ev_black_ships",
    title: "궤도에 뜬 검은 함선",
    category: "사이커",
    once: true,
    req: {
      minAge: 14,
      allTags: ["psyker"],
      excludeTags: [
        "sanctioned_psyker", "psyker_primaris", "grey_knight", "astartes", "custodes", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "general_rank",
        "commissar_general", "lord_commissar", "navy_admiral", "cardinal", "inquisitor", "lord_inquisitor",
        "canoness", "celestian", "magos", "fabricator_locum", "fabricator_general",
        "rogue_trader", "rt_lord_captain", "arbites_marshal", "departmento_head",
        "tempestus_prime", "interrogator_rank",
        "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
        "imperial_knight", "knight_scion", "knight_high_king",
        "assassin", "grand_master_assassins", "living_saint", "saint_vessel"
      ]
    },
    reqLabel: "자질: 미공인 잠재 사이커",
    weight: 30,
    text: "하늘에 불길한 칠흑빛 거함이 떴다. 침묵의 자매들과 아뎁투스 아스트라 텔레파티카의 십일조 징수대가 행성의 모든 사이커를 수색하고 있다! 끌려가면 대다수는 테라 황금 옥좌의 양분이 되지만, 강한 의지를 증명하면 공인 사이커로 거듭날 수 있다.",
    choices: [
      {
        label: "[의지 판정] 당당히 자수해 테라 영혼 결속 의식에 도전한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "황제의 빛과 맞닿는 영혼 결속의 고통을 버텨 냈다! 그대는 제국이 공인한 생션드 사이커·아스트로패스가 되었다!",
          forceCareer: "sanctioned_psyker",
          stats: { WP: 10, Int: 6, Inf: 8 },
          faith: 15,
          corruption: -8,
          addTags: ["sanctioned_psyker"],
          align: { dogmatic: 8 }
        },
        fail: {
          text: "영혼 결속 도중 황제의 광휘에 시신경이 타 들어가 시력을 완전히 잃었으나, 사이킥 감각에 눈떠 간신히 옥좌 제물 행은 면하고 하급 아스트로패스로 살아남았다.",
          forceCareer: "sanctioned_psyker",
          wounds: -30,
          stats: { WP: 6, Int: 3 },
          addTags: ["sanctioned_psyker"],
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[민첩 판정] 발각 시 죽음을 각오하고 검은 함선의 수색망을 피해 지하로 잠적한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "수색대를 따돌리고 무등록 사이커로 숨어 지내는 데 성공했다. 하지만 워프의 속삭임은 날로 거세진다.",
          stats: { Ag: 5, Int: 4 },
          corruption: 14,
          addTags: ["rogue_psyker"],
          align: { ruthless: 6 }
        },
        fail: {
          text: "침묵의 자매들에게 포박되어 검은 함선 선창에 갇혔다. 테라로 향하는 항해 도중 정신이 무너져 황금 옥좌의 불꽃을 지피는 천 명의 제물 중 하나가 되었다.",
          instantDeath: "검은 함선에 연행된 뒤 테라 황금 옥좌의 영혼 연료로 바쳐짐"
        }
      }
    ],
    source: "Lexicanum: League of Blackships"
  },
  {
    id: "ev_perils_of_warp",
    title: "워프의 위험",
    category: "사이커",
    req: {
      minAge: 16,
      allTags: ["psyker"],
      excludeChapters: ["black_templars"],
      excludeTags: ["custodes", "grey_knight", "daemon_prince", "heretic", "chaos_aligned", "blank", "omega_pariah", "dreadnought", "living_saint"]
    },
    reqLabel: "자질: 사이커",
    weight: 16,
    text: "사이킥 능력을 행사하던 찰나, 현실의 장막이 찢어지며 차가운 서리가 온 방을 뒤덮었다! 그림자 속에서 다채로운 악마의 눈동자가 그대의 영혼을 엿본다.",
    choices: [
      {
        label: "[아스타르테스 · 의지 판정] 챕터의 전투 함성을 내지르고 사이킥 정신 장벽으로 악마를 짓밟는다",
        req: { allTags: ["astartes"], excludeChapters: ["black_templars"] },
        check: { stat: "WP", diff: 15 },
        success: {
          text: "'그들은 공포를 알지 못하리라!' 초인의 정신 장벽에 부딪힌 워프 악마가 비명을 지르며 추방되었다. 챕터 라이브러리우스의 품격을 증명했다!",
          stats: { WP: 6, Int: 4 },
          corruption: -6
        },
        fail: {
          text: "강력한 반동이 파워 아머 내부를 울렸으나, 끝내 악마에게 영혼의 틈을 내어 주지 않았다.",
          wounds: -12,
          stats: { WP: 3 }
        }
      },
      {
        label: "[신앙 65+ · 의지 판정] 공포 대신 《렉티티오 디비니타투스》 성가를 외워 워프의 불길을 정화한다",
        req: { minFaith: 65, excludeTags: ["heretic"] },
        check: { stat: "WP", diff: 10 },
        success: {
          text: "흔들림 없는 황제 신앙의 빛이 서리를 태워 버렸다! 악마의 속삭임은 재가 되어 흩어졌고 영혼은 더욱 순결해졌다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -8,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "잠시 정신이 흔들려 코피를 흘렸으나, 신앙의 방패 덕분에 오염은 크게 번지지 않았다.",
          wounds: -14,
          corruption: 4,
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[의지 판정] 황제의 이름을 외치며 워프 균열을 억지로 닫는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "악마의 속삭임을 몰아내고 사이킥 통제력이 한층 정교해졌다!",
          stats: { WP: 6, Int: 3 },
          faith: 6,
          align: { dogmatic: 5 }
        },
        critSuccess: {
          text: "워프의 균열을 역으로 닫아걸며 영혼에 박혀 있던 흉터마저 태워 정화했다.",
          stats: { WP: 8, Int: 5 },
          faith: 8,
          corruption: -6,
          removeTags: ["warp_scarred"],
          addTags: ["iron_nerves"],
          align: { dogmatic: 7 }
        },
        fail: {
          text: "사이킥 역류로 피를 토하며 쓰러졌고, 영혼에 지워지지 않는 워프의 균열이 남았다.",
          wounds: -24,
          corruption: 14
        },
        critFail: {
          text: "통제를 벗어난 워프의 불길이 정신을 할퀴며 지워지지 않는 워프 흉터를 새겼다.",
          wounds: -28,
          corruption: 18,
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[금단] 악마가 건네는 지식을 대가로 균열을 받아들인다",
        effect: {
          text: "순간적으로 엄청난 지혜와 워프의 힘이 뇌리를 스쳤지만, 신앙의 빛이 급격히 식어 갔다.",
          stats: { Int: 8, WP: 4 },
          faith: -18,
          corruption: 22,
          align: { ruthless: 10 }
        }
      }
    ],
    source: "Dark Heresy: Perils of the Warp"
  },
  {
    id: "ev_geller_flicker",
    title: "성간 항해 중 겔러 필드의 깜빡임",
    category: "우주",
    req: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "dreadnought"],
      or: [{ anyTags: ["voidborn", "navy", "rogue_trader", "militarum", "astartes"] }, { anyWorlds: ["voidborn"] }]
    },
    reqLabel: "우주 항행 경험자 · 제국군 · 해군 · 보이드본",
    weight: 15,
    text: "워프 항해 도중 선체 전체의 조명이 0.8초간 꺼졌다! 겔러 필드가 흔들리는 찰나, 복도 벽면에서 피가 흐르고 기관실 승무원들이 미쳐 날뛰기 시작한다!",
    choices: [
      {
        label: "[초인·성인 전용] 압도적 위엄과 신성한 무력으로 빙의자들을 단숨에 일소한다",
        req: { anyTags: ["astartes", "custodes", "grey_knight", "living_saint"] },
        effect: {
          text: "초인과 성인의 압도적인 기세와 맹공이 복도를 휩쓸자 악마적 환영은 산산조각 났다! 일말의 흔들림도 없는 정밀한 진압으로 선내 위협을 2분 만에 평정했다.",
          stats: { WS: 4, WP: 4, Inf: 5 }
        }
      },
      {
        label: "[무혼 전용] 영혼 없는 공허의 장막으로 복도의 악마 현현을 즉각 소멸시키고 보조 발전기를 안정화한다",
        req: { anyTags: ["blank", "omega_pariah"] },
        effect: {
          text: "워프의 속삭임과 악마적 환영은 공허한 영혼 앞에서 아무 힘도 쓰지 못했다! 빙의된 승무원들이 비명을 지르며 무력화되는 사이 겔러 발전기를 침착히 복구했다.",
          stats: { WP: 5, Int: 4, Inf: 5 }
        }
      },
      {
        label: "[기계교 전용] 누스피어 논리 방화벽을 띄워 메카덴드라이트로 겔러 발전기를 즉시 복구한다",
        req: { anyTags: ["mechanicus"] },
        effect: {
          text: "감정의 흔들림 없이 이진법 성유 의식을 집전해 12초 만에 겔러 필드를 정상 출력으로 복원했다!",
          stats: { Int: 6, Inf: 6 }
        }
      },
      {
        label: "[특성 전용 · 워프 흉터] 욱신거리는 워프 흉터의 공명으로 균열 틈새를 역추적해 즉시 봉쇄한다",
        req: { allTags: ["warp_scarred"] },
        effect: {
          text: "워프 흉터가 일그러지는 감각을 따라 균열의 발원지를 찾아내 보조 방어막을 먼저 복구했다.",
          stats: { WP: 4, Int: 4 },
          faith: 4
        }
      },
      {
        label: "[의지 판정] 악마적 환영을 뿌리치고 겔러 필드 보조 발전기를 재가동한다",
        req: { excludeTags: ["grey_knight", "custodes", "living_saint", "blank", "omega_pariah"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "기계령의 기도를 외며 방어막을 복구해 수만 명 승무원의 영혼을 구했다!",
          stats: { WP: 6, Int: 4, Inf: 6 },
          faith: 6
        },
        critSuccess: {
          text: "완벽한 정신 집중으로 겔러 필드를 즉각 정상화하고, 그 여파로 영혼에 남았던 워프의 잔재까지 말끔히 씻어 냈다.",
          stats: { WP: 7, Int: 5, Inf: 7 },
          faith: 8,
          removeTags: ["warp_scarred"]
        },
        fail: {
          text: "워프의 광기에 휩쓸린 승무원들과 난투극을 벌이며 부상과 오염을 입었다.",
          wounds: -22,
          corruption: 12
        },
        critFail: {
          text: "워프의 속삭임이 정신의 방벽을 뚫고 영혼에 지워지지 않는 흉터를 남겼다.",
          wounds: -26,
          corruption: 15,
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[백병 판정] 무기를 들고 방화 격벽을 사수하며 악마 빙의자들을 처단한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "함교로 돌진하던 빙의자들을 모두 막아 내어 함교 전원의 찬사를 받았다.",
          stats: { WS: 5, T: 3, Inf: 5 }
        },
        critSuccess: {
          text: "좁은 격벽 통로에서 밀려드는 빙의자들을 단신으로 베어 넘기며 신들린 검술의 경지를 증명했다.",
          stats: { WS: 7, T: 4, Inf: 6 },
          addTags: ["blade_master"]
        },
        fail: {
          text: "변이된 승무원들의 광포한 반격에 깊은 상처를 입었다.",
          wounds: -26,
          corruption: 6
        }
      }
    ],
    source: "Lexicanum: Geller Field"
  },
  {
    id: "ev_forbidden_tome",
    title: "금서의 속삭임 — 밀수상 상자 속 가죽 장정 사본",
    category: "오염",
    req: {
      minAge: 16,
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["custodes", "grey_knight", "dreadnought", "heretic", "chaos_aligned", "daemon_prince", "living_saint", "saint_vessel", "assassin"],
      or: [{ stats: { Int: 42 } }, { minCorruption: 15 }]
    },
    reqLabel: "지성 42+ 또는 오염 15+",
    weight: 15,
    text: "폐쇄된 하층 골동품 창고의 압수 상자를 정리하던 중, 사람 피부로 제본된 듯한 섬뜩한 가죽 서적을 발견했다. 낡은 은빛 걸쇠가 풀리자 표지에 새겨진 팔각별 문양이 미약하게 맥동하며, 오직 그대의 귓가에만 들리는 달콤한 속삭임으로 책장을 펼쳐 보라고 부추긴다.",
    choices: [
      {
        label: "[이단심문관·아스타르테스·소로리타스 전용] 한 치의 유혹도 없이 즉각 성화로 소각하거나 오르도 금고에 영구 봉인한다",
        req: { anyTags: ["inquisitor", "astartes", "sororitas", "canoness"] },
        effect: {
          text: "불경한 속삭임은 단단한 신념과 훈련 앞에서 아무 힘도 쓰지 못했다. 이단 유물을 완벽히 처리했다.",
          stats: { WP: 5, Inf: 6 },
          faith: 10,
          corruption: -10,
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[신앙] 지체 없이 불태우고 지역 이단심문관이나 사제에게 신고한다",
        effect: {
          text: "검은 연기와 비명을 내며 책이 재가 되었다. 국교와 심문소가 그대의 경계심을 높이 평가했다.",
          stats: { WP: 4, Inf: 5 },
          faith: 12,
          corruption: -8,
          addTags: ["inquisition_favor"],
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[지성 판정] 금단의 유혹에 이끌려 아무도 몰래 가죽 서적의 비밀을 해독한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "우주의 숨겨진 법칙과 끔찍한 진실의 단편을 깨우쳤다! 지성은 크게 늘었으나 영혼에 어둠이 깃들었다.",
          stats: { Int: 9, WP: 4 },
          faith: -18,
          corruption: 22,
          align: { ruthless: 10 }
        },
        fail: {
          text: "글자들이 눈앞에서 살아 움직이며 정신을 물어뜯었다!",
          wounds: -18,
          faith: -15,
          corruption: 26,
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Dark Heresy 1st Edition / The Radical's Handbook"
  },
  {
    id: "ev_chaos_whispers",
    title: "암흑 사대신의 유혹",
    category: "오염",
    req: {
      minAge: 16,
      minCorruption: 35,
      excludeTags: [
        "custodes", "grey_knight", "living_saint", "blank", "omega_pariah", "daemon_prince",
        "mark_khorne", "mark_tzeentch", "mark_nurgle", "mark_slaanesh"
      ]
    },
    reqLabel: "오염도 35+ · 금단 분기",
    weight: 34,
    text: "꿈과 현실의 경계가 무너진다. 워프 너머의 위대한 네 권능이 그대에게 속삭인다. '거짓 시체 황제는 너를 버렸다. 우리의 축복을 택하라!'",
    choices: [
      {
        label: "[코른의 부름] 피의 신에게 분노를 바치고 압도적 무력을 얻는다",
        effect: {
          text: "혈관이 끓어오르며 두려움이 사라졌다! 무력과 강인함이 폭증했으나 피의 갈증이 시작된다.",
          stats: { WS: 12, T: 10, Int: -6 },
          faith: -25,
          corruption: 12,
          addTags: ["mark_khorne", "heretic"],
          align: { ruthless: 12 }
        }
      },
      {
        label: "[젠취의 부름] 변화의 군주와 거래해 금지된 지혜와 권모를 얻는다",
        effect: {
          text: "운명의 실타래가 눈에 보이기 시작했다! 지성과 사이킥 감각이 날카로워졌다.",
          stats: { Int: 12, WP: 8, Fel: 6 },
          faith: -25,
          corruption: 12,
          addTags: ["mark_tzeentch", "heretic", "psyker"],
          align: { ruthless: 12 }
        }
      },
      {
        label: "[너글의 부름] 역병의 아버지 너글의 품에서 고통과 죽음을 잊는다",
        effect: {
          text: "육신이 썩어 가지만 더 이상 어떤 고통도, 질병도 느끼지 못한다! 기괴한 생명력이 샘솟는다.",
          stats: { T: 16, Fel: -10, Ag: -6 },
          wounds: 35,
          faith: -25,
          corruption: 12,
          addTags: ["mark_nurgle", "heretic"],
          align: { ruthless: 12 }
        }
      },
      {
        label: "[슬라네쉬의 부름] 쾌락과 완벽의 군주에게 감각을 바치고 치명적인 우아함을 얻는다",
        effect: {
          text: "세상의 모든 소리와 색채가 칼날처럼 선명해졌다! 감각이 극도로 예민해지며 탐닉의 갈증이 깨어난다.",
          stats: { Ag: 12, Fel: 10, WS: 6, WP: -6 },
          faith: -25,
          corruption: 12,
          addTags: ["mark_slaanesh", "heretic"],
          align: { ruthless: 12 }
        }
      },
      {
        label: "[의지 판정 · 의지 58+] 악마의 유혹을 끝까지 거부하고 영혼을 되찾는다!",
        req: { stats: { WP: 58 }, excludeTags: ["heretic", "chaos_aligned"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "피를 토하는 고통 끝에 속삭임을 끊어 냈다! 오염이 크게 정화되고 황제의 빛이 다시 돌아왔다.",
          stats: { WP: 10 },
          faith: 20,
          corruption: -25,
          align: { dogmatic: 12 }
        },
        fail: {
          text: "저항했지만 정신이 크게 손상되고 말았다.",
          wounds: -20,
          corruption: 10,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Chaos Gods / Black Crusade Core Rulebook"
  },
  {
    id: "ev_chaos_raid",
    title: "배교자의 습격 — 암흑 신들을 향한 제물",
    category: "오염",
    req: {
      anyCareers: ["chaos_cultist", "chaos_champion"],
      excludeWorlds: ["mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "직군: 카오스 컬티스트 · 카오스 챔피언 · 화성·크리그·함선·야만 행성 제외",
    weight: 24,
    alignBias: "ruthless",
    text: "제국 군수 창고와 성당을 습격할 비밀 의식이 준비되었다. 성공하면 워프의 축복이 쏟아지지만, 제국 치안대와 소로리타스가 이미 낌새를 챘다.",
    choices: [
      {
        label: "[백병 판정] 성당을 불태우고 암흑의 제단을 세운다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "워프의 축복이 쏟아지며 초자연적 힘이 깃들었다! 다만 오염이 깊어져 육신이 조금씩 변이하기 시작한다.",
          stats: { WS: 8, WP: 6, T: 5 },
          corruption: 15,
          align: { ruthless: 10 }
        },
        fail: {
          text: "급파된 아뎁타 소로리타스의 볼터 화력에 큰 중상을 입고 겨우 도망쳤다!",
          wounds: -34,
          align: { ruthless: 6 }
        },
        critFail: {
          text: "소로리타스의 볼터 탄환이 다리 관절을 꿰뚫어 뼈가 산산이 부서졌다. 간신히 기어 탈출했으나 불구가 되었다.",
          wounds: -42,
          addTags: ["crippled_limb"],
          align: { ruthless: 6 }
        }
      },
      {
        label: "[교섭 판정] 언더하이브의 굶주린 노동자들을 선동해 세력을 불린다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "수백 명의 추종자가 그대의 깃발 아래 모였다. 행성 반란의 불씨가 커진다.",
          stats: { Fel: 6, Int: 4, Inf: 8 },
          corruption: 10,
          align: { ruthless: 8 }
        },
        fail: {
          text: "밀고자 때문에 은신처가 발각되어 부상을 입었다.",
          wounds: -22,
          align: { ruthless: 5 }
        }
      }
    ],
    source: "Black Crusade Core Rulebook"
  },
  {
    id: "ev_career_psyker_whisper",
    title: "생션드 사이커 — 아스트로패스 합창단의 폭주",
    category: "직군 고유",
    req: {
      anyCareers: ["sanctioned_psyker", "primaris_psyker"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "직군: 생션드 사이커 · 프리마리스 사이커",
    weight: 26,
    text: "성간 텔레파시 송신을 진행하던 중, 워프 해류가 갑자기 소용돌이치며 아스트로패스 합창단원 셋의 눈에서 보랏빛 불꽃이 뿜어져 나왔다! 이대로 방치하면 합창실 전체가 악마의 차원문으로 찢어질 판이다.",
    choices: [
      {
        label: "[의지 판정] 황제의 영혼 결속을 끌어올려 자신의 정신 방벽으로 폭주 파동을 전부 받아 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "코피를 쏟으며 끝내 워프의 균열을 닫았다! 합창단 수십 명의 목숨과 기밀 전문을 모두 지켜 내고 최고위 아스트로패스로 추대되었다.",
          stats: { WP: 8, Int: 5, Inf: 6 },
          wounds: -8,
          corruption: -5,
          align: { humane: 10 }
        },
        fail: {
          text: "워프의 비명이 머릿속을 찢고 지나가며 정신적 상처와 오염을 남겼다. 그래도 차원문만은 가까스로 막았다.",
          wounds: -20,
          corruption: 12,
          stats: { WP: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "규정대로 합창실 비상 차단기를 내려 폭주한 단원들을 즉각 처분하고 송신을 중단한다",
        effect: {
          text: "참혹하지만 제국 규정상 가장 정확한 조치였다. 호위 커미사르가 권총을 집어넣으며 냉정히 고개를 끄덕였다.",
          stats: { Int: 4, WP: 3, Inf: 4 },
          align: { dogmatic: 9 }
        }
      }
    ],
    source: "Dark Heresy 1st Edition / Lexicanum: Adeptus Astra Telepathica"
  },
  {
    id: "ev_arc_mark_khorne",
    title: "코른의 시험 — 해골 옥좌가 요구하는 피의 공물",
    category: "오염",
    once: true,
    req: {
      allTags: ["mark_khorne"],
      excludeTags: ["custodes", "grey_knight", "daemon_prince"]
    },
    reqLabel: "이력: 코른의 낙인",
    weight: 38,
    text: "피부 아래 새겨진 놋쇠빛 코른의 문양이 쇠붙이처럼 달아오른다. 귓가에서 울리는 전쟁 북소리가 비겁한 계략과 원거리 포격을 경멸하며, 오직 강자의 두개골을 직접 베어 바치라고 포효한다.",
    choices: [
      {
        label: "[백병 판정] 중장갑 적 지휘관에게 정면 일기토를 걸어 피의 신에게 어울리는 두개골을 취한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "'피의 신에게 피를!' 압도적인 일격으로 강적의 목을 베자 끓어오르던 갈증이 잔혹한 환희로 변하며 육신이 더욱 강인해졌다.",
          stats: { WS: 10, T: 6 },
          wounds: -8,
          corruption: 12,
          align: { ruthless: 10 }
        },
        fail: {
          text: "무모한 돌격 끝에 깊은 자상을 입었으나, 분노의 힘으로 기어이 상대를 쓰러뜨리고 살아남았다.",
          wounds: -24,
          stats: { WS: 4 },
          corruption: 8,
          align: { ruthless: 7 }
        }
      },
      {
        label: "[의지 판정] 폭발하려는 살의를 철의 자제력으로 억눌러 전술적 전투 본능으로만 승화시킨다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "광기에 잡아먹히지 않고 코른의 분노를 날카로운 검술의 집중력으로 제어해 냈다. 붉은 안개가 잠시 물러났다.",
          stats: { WP: 6, WS: 5 },
          corruption: -5
        },
        fail: {
          text: "정신력으로 억누르려다 오히려 혈압이 치솟아 발작을 일으키며 이성을 잃고 날뛰었다.",
          wounds: -18,
          stats: { Int: -4 },
          corruption: 14
        }
      },
      {
        label: "비밀 투기장이나 변방 약탈 전선에서 피의 난투를 벌여 갈증을 달랜다",
        effect: {
          text: "피로 바닥을 붉게 적신 뒤에야 손의 떨림이 멎었다. 인간성은 한 겹 더 벗겨져 나갔다.",
          stats: { WS: 5, Fel: -4 },
          wounds: -6,
          corruption: 10,
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Lexicanum: Khorne / Black Crusade Core Rulebook"
  },
  {
    id: "ev_arc_mark_tzeentch",
    title: "젠취의 미궁 — 아홉 갈래 예언과 변이의 대가",
    category: "오염",
    once: true,
    req: {
      allTags: ["mark_tzeentch"],
      excludeWorldTags: ["feral"],
      excludeTags: ["custodes", "grey_knight", "daemon_prince"]
    },
    reqLabel: "이력: 젠취의 낙인",
    weight: 38,
    text: "거울 속 그대의 눈동자가 푸른 워프 불꽃으로 일렁이며 아직 일어나지 않은 아홉 가지 미래를 동시에 비춘다. 변화의 군주는 서로를 배신하도록 짜인 거대한 음모의 실타래를 그대의 손끝에 쥐여 주었다.",
    choices: [
      {
        label: "[지성 판정] 아홉 갈래 음모를 역으로 설계해 행성 행정부와 심문소 추격대가 서로를 물도록 조종한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 한 통의 위조 전보로 정적들이 스스로 파멸하는 장관을 지켜보았다! 젠취의 웃음소리가 머릿속에 메아리쳤다.",
          stats: { Int: 10, Fel: 6, Inf: 6 },
          corruption: 12
        },
        fail: {
          text: "지나치게 꼬인 계략이 부메랑처럼 되돌아와 은신처가 발각되었고, 워프 역류로 육체가 뒤틀렸다.",
          wounds: -18,
          stats: { T: -4 },
          corruption: 16
        }
      },
      {
        label: "[의지 판정] 팔뚝에 돋아나려는 푸른 깃털과 수정 변이를 정신력으로 억제하고 예언의 단서만 취한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "변화의 군주가 숨겨 둔 함정을 간파하고 육체의 붕괴를 가까스로 막아 냈다. 금지된 지혜만 차갑게 가라앉았다.",
          stats: { WP: 8, Int: 5 },
          corruption: -4
        },
        fail: {
          text: "손끝이 기괴하게 변형되는 고통 속에 쓰러졌다. 변화의 군주는 공짜 지식을 주지 않는다.",
          wounds: -16,
          stats: { T: -5 },
          corruption: 14
        }
      },
      {
        label: "운명의 설계자가 내민 은빛 두루마리를 펼치고 다가올 변화에 몸을 맡긴다",
        effect: {
          text: "금지된 문자가 눈동자에 스며들며 남들은 보지 못하는 비밀이 열렸으나, 육신은 서서히 인간과 멀어져 갔다.",
          stats: { Int: 6, WP: 4, T: -4 },
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Tzeentch / Black Crusade Core Rulebook"
  },
  {
    id: "ev_arc_mark_nurgle",
    title: "너글의 정원 — 자비로운 역병의 전파",
    category: "오염",
    once: true,
    req: {
      allTags: ["mark_nurgle"],
      excludeWorldTags: ["feral"],
      excludeTags: ["custodes", "grey_knight", "daemon_prince"]
    },
    reqLabel: "이력: 너글의 낙인",
    weight: 38,
    text: "상처에서 번진 녹빛 종기가 더 이상 쓰리지 않고 오히려 따뜻한 안도감을 준다. 귓가에 윙윙거리는 파리 떼의 합창이 '고통과 죽음의 공포를 끝내는 역병의 아버지 너글의 선물을 하층 정수조에 나누어 주라'고 다정히 속삭인다.",
    choices: [
      {
        label: "[강인 판정] 하층 하이브 정수조에 부패의 포자를 풀어 '역병의 아버지 너글의 자비'를 퍼뜨리며 기괴한 내구를 얻는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "역병의 꽃이 피어오르며 그대의 육신은 탄환조차 쉽게 뚫지 못하는 부패한 방벽으로 변모했다!",
          stats: { T: 10, Fel: -6 },
          wounds: 25,
          woundsBonus: 10,
          corruption: 14,
          align: { ruthless: 12 }
        },
        fail: {
          text: "포자 배양 도중 독기가 역류해 피부가 심하게 짓물렀으나 고통만은 이상할 정도로 느껴지지 않았다.",
          wounds: -14,
          stats: { Fel: -8 },
          corruption: 12,
          align: { ruthless: 8 }
        }
      },
      {
        label: "[의지 판정] 역병의 유혹을 거부하고 전염이 퍼지지 않도록 자신의 육신 안에만 부패를 봉쇄한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "끔찍한 오한을 견뎌 내며 정수조를 오염시키지 않았다. 육신은 쇠약해졌으나 마지막 양심의 조각을 지켜 냈다.",
          stats: { WP: 7, T: 4 },
          corruption: -6,
          align: { humane: 10 }
        },
        fail: {
          text: "버텨 내는 동안 관절이 굳어 움직임이 둔해졌고, 역병의 아버지 너글의 웃음소리가 더욱 짙어졌다.",
          stats: { Ag: -5 },
          corruption: 12,
          align: { humane: 6 }
        }
      },
      {
        label: "썩어 가는 상처 위에 두꺼운 붕대를 감고 고통 없는 고요 속에 하루를 보낸다",
        effect: {
          text: "어떤 피로도 슬픔도 느껴지지 않는 나른한 부패가 온몸에 자리 잡았다.",
          stats: { T: 6, Ag: -4 },
          wounds: 15,
          corruption: 10,
          align: { ruthless: 4 }
        }
      }
    ],
    source: "Lexicanum: Nurgle / Black Crusade Core Rulebook"
  },
  {
    id: "ev_arc_mark_slaanesh",
    title: "슬라네쉬의 향연 — 완벽을 향한 끝없는 갈증",
    category: "오염",
    once: true,
    req: {
      allTags: ["mark_slaanesh"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["custodes", "grey_knight", "daemon_prince", "chaos_lord", "renegade_marine"]
    },
    reqLabel: "이력: 슬라네쉬의 낙인",
    weight: 38,
    text: "평범한 음식도, 평범한 승리도 이제는 재처럼 무미건조하다. 쾌락과 완벽의 군주가 속삭이는 기묘한 현악 선율이 심장을 파고들며, 단 하나의 흠결도 없는 극치의 감각과 예술적 학살을 갈망하게 만든다.",
    choices: [
      {
        label: "[교섭 판정] 상류층 비밀 사교계에 스며들어 매혹적인 화술과 선율로 귀족들을 쾌락 교단의 포로로 만든다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "가면무도회 하룻밤 만에 행성 상류층 인사 절반이 그대의 손짓에 취해 무릎을 꿇었다! 황홀한 권력이 손에 들어왔다.",
          stats: { Fel: 10, Inf: 8, Ag: 4 },
          corruption: 12
        },
        fail: {
          text: "지나친 탐닉이 이단 감찰관의 의심을 사 연회장이 급습당했고, 도주 도중 깊은 상처를 입었다.",
          wounds: -16,
          stats: { Inf: -5 },
          corruption: 12
        }
      },
      {
        label: "[민첩 판정] 단 한 치의 오차도 없는 완벽한 검무로 적의 포위망을 예술 작품처럼 베어 넘긴다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "탄환 사이를 춤추듯 스쳐 지나며 적들의 급소만을 정확히 그어 냈다! 극한의 쾌감이 척추를 타고 흘렀다.",
          stats: { Ag: 9, WS: 7 },
          corruption: 12
        },
        fail: {
          text: "더 완벽한 동작에 집착하다 순간 방심해 반격을 허용했다. 피의 맛마저 이상하리만치 달콤하게 느껴졌다.",
          wounds: -20,
          corruption: 10
        }
      },
      {
        label: "감각을 극한으로 끌어올리는 금지된 향료를 태우며 찰나의 도취에 몸을 맡긴다",
        effect: {
          text: "현실의 고통이 눈부신 색채 속에 녹아내렸으나, 깨어난 뒤에는 더욱 깊은 공허가 남았다.",
          stats: { Fel: 5, Ag: 4, WP: -5 },
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Slaanesh / Black Crusade Core Rulebook"
  },
  {
    id: "ev_arc_rogue_psyker_hunt",
    title: "무등록 사이커의 밤 — 워프 포식자와 마녀 사냥꾼",
    category: "사이커",
    once: true,
    req: {
      allTags: ["rogue_psyker"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "sanctioned_psyker", "psyker_primaris", "grey_knight", "custodes", "astartes", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "inquisitor", "lord_inquisitor", "high_lord_terra", "sector_lord", "planetary_governor",
        "warmaster", "general_rank", "commissar_general", "lord_commissar", "navy_admiral",
        "cardinal", "canoness", "celestian", "magos", "fabricator_locum", "fabricator_general",
        "rogue_trader", "rt_lord_captain", "arbites_marshal", "departmento_head",
        "tempestus_prime", "interrogator_rank"
      ]
    },
    reqLabel: "이력: 무등록 사이커",
    weight: 38,
    text: "훈련받지 않은 사이킥 감각이 폭주하며 잠들 때마다 워프 너머의 엔슬레이버와 악마들이 영혼의 틈새를 두드린다. 바깥 골목에서는 사이커 탐지견을 앞세운 마녀 사냥꾼들의 발소리가 점점 가까워지고 있다.",
    choices: [
      {
        label: "[의지 판정] 꿈속으로 파고드는 워프 포식자의 손아귀를 스스로의 정신 장벽으로 베어 낸다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "코피를 쏟으며 끔찍한 정신 침식을 밀어냈다! 비록 제도권 밖이지만 스스로 힘을 제어하는 독자적 규율을 터득했다.",
          stats: { WP: 9, Int: 5 },
          corruption: -8
        },
        fail: {
          text: "정신 방벽이 찢어지며 거실 유리가 일제히 산산조각 났다. 워프의 냉기가 뼛속까지 스며들었다.",
          wounds: -22,
          corruption: 16
        }
      },
      {
        label: "[의지 판정] 더 늦기 전에 아뎁투스 아스트라 텔레파티카에 자진 출두해 생션드 사이커 영혼 결속 의식을 치른다",
        req: { maxCorruption: 55 },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "죽음과도 같은 영혼 결속과 가혹한 검사를 버텨 내고 마침내 제국 공인 생션드 사이커로 갱생했다!",
          forceCareer: "sanctioned_psyker",
          addTags: ["sanctioned_psyker"],
          stats: { WP: 7, Int: 4 },
          faith: 10,
          corruption: -15
        },
        fail: {
          text: "혹독한 정신 결속 과정에서 큰 상처를 입어 정식 발령은 보류되었으나, 악마의 속삭임만은 한풀 꺾였다.",
          wounds: -24,
          corruption: -6
        }
      },
      {
        label: "마녀 사냥꾼의 눈을 피해 폐공장 지하로 거처를 옮기고 숨을 죽여 버틴다",
        effect: {
          text: "검은 함선의 수색망은 또 한 번 피했으나, 통제되지 않은 워프의 속삭임은 여전히 귓가를 맴돈다.",
          stats: { Ag: 4, WP: 3 },
          corruption: 6
        }
      }
    ],
    source: "Lexicanum: Rogue Psyker / Dark Heresy 1st Edition"
  },
  {
    id: "ev_s2_cultist_cell",
    title: "카오스 컬티스트 — 하층 하이브의 지하 교단 포섭",
    category: "오염",
    once: true,
    req: {
      anyCareers: ["chaos_cultist", "chaos_champion"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "직군: 카오스 컬티스트 · 카오스 챔피언 · 크리그·함선·야만 행성 제외",
    weight: 34,
    alignBias: "ruthless",
    text: "18시간 교대 노동과 시체 전분 배급에 지친 하층 하이브 공장 인부들 사이에 절망이 짙게 깔려 있다. 어둠의 교단을 키울 절호의 토양이지만, 아르비테스 밀정이 섞여 있을 위험도 크다.",
    choices: [
      {
        label: "[교섭 판정] 제국의 거짓된 구원을 폭로하고 암흑 신의 해방을 설파해 수십 명 규모의 지하 세포를 구축한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "절망한 인부들이 팔각별 아래 무릎 꿇고 비밀 서약을 맺었다! 교단의 영향력이 구역 전체로 번져 나간다.",
          stats: { Fel: 7, Inf: 8 },
          corruption: 8,
          align: { ruthless: 9 }
        },
        fail: {
          text: "인부 중 한 명이 아르비테스에 밀고해 집회소가 급습당했다. 피를 흘리며 겨우 탈출했다.",
          wounds: -16,
          corruption: 5,
          align: { ruthless: 5 }
        }
      },
      {
        label: "[지성 판정] 치안국 순찰 시간표와 부패한 하급 서기관을 포섭해 교단 거점을 완벽히 위장한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "합법적인 구호 단체로 위장한 비밀 예배당이 완성되었다! 이단 감찰의 눈을 완벽히 따돌렸다.",
          stats: { Int: 7, Ag: 4, Inf: 6 },
          corruption: 6,
          align: { ruthless: 8 }
        },
        fail: {
          text: "서기관이 겁을 먹고 자수하는 바람에 거점을 버리고 하수구로 급히 옮겨야 했다.",
          wounds: -14,
          stats: { Inf: -4 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "무리하게 조직을 불리지 않고 소규모 비밀 제단만 유지하며 밤마다 금지된 표식을 퍼뜨린다",
        effect: {
          text: "작지만 들키지 않는 불씨가 어둠 속에서 서서히 행성의 기반을 갉아먹기 시작했다.",
          stats: { WP: 4, Ag: 3 },
          corruption: 8,
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Dark Heresy: Disciples of the Dark Gods / Black Crusade Core Rulebook"
  },
  {
    id: "ev_s2_cultist_warband",
    title: "카오스 컬티스트 — 반역자 워밴드의 강림과 잔혹한 거래",
    category: "오염",
    once: true,
    req: {
      anyCareers: ["chaos_cultist", "chaos_champion"],
      minAge: 18,
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "직군: 카오스 컬티스트 · 카오스 챔피언 · 18세+ · 테라·화성·크리그·함선·야만 행성 제외",
    weight: 34,
    alignBias: "ruthless",
    text: "교단의 소환 신호에 응답해 궤도에서 가시 돋친 강습정이 내려왔다! 1만 년 증오에 절은 반역자 카오스 스페이스 마린 워밴드 군주가 필멸자 교단원들을 소모품 보듯 내려다보며 방어 포대 좌표를 요구한다.",
    choices: [
      {
        label: "[권위 판정] 행성 대공 포대의 비밀 암호 코드를 넘기는 대가로 워밴드 산하 교단 총지휘권을 협상한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "반역자 군주가 거칠게 웃으며 그대의 담력을 인정했다! 카오스 무기와 막대한 배교자 지휘권을 하사받았다.",
          stats: { Inf: 10, WS: 5, BS: 5 },
          corruption: 10,
          align: { ruthless: 11 }
        },
        fail: {
          text: "'벌레 주제에 흥정을 거는가!' 반역자 마린의 파워 피스트에 내동댕이쳐져 갈비뼈가 부러진 채 명령을 받들어야 했다.",
          wounds: -24,
          stats: { Inf: -4 },
          corruption: 8,
          align: { ruthless: 7 }
        }
      },
      {
        label: "[민첩 판정] 워밴드가 교단을 미끼로 던질 속셈임을 간파하고 궤도 폭격 직전에 핵심 신도들과 빠져나온다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "예상대로 선봉에 선 필멸자 부대가 몰살당하는 사이, 그대는 무사히 약탈 물자를 챙겨 살아남았다!",
          stats: { Ag: 7, Int: 6 },
          corruption: 6,
          align: { ruthless: 9 }
        },
        fail: {
          text: "탈출 도중 반역자 척후병의 볼터 사격에 중상을 입고 간신히 잔해 속으로 숨어들었다.",
          wounds: -22,
          corruption: 8,
          align: { ruthless: 6 }
        }
      },
      {
        label: "거대한 뿔 투구의 워밴드 전사들 앞에서 납작 엎드려 선봉 보급 임무를 묵묵히 받든다",
        effect: {
          text: "악마의 전사들 발밑에서 살아남는 유일한 길은 쓸모를 증명하는 것뿐이다. 상처투성이로 목숨을 부지했다.",
          stats: { T: 5, WS: 4 },
          wounds: -12,
          corruption: 10,
          align: { ruthless: 5 }
        }
      }
    ],
    source: "Black Crusade Core Rulebook / Codex: Chaos Space Marines"
  },
  {
    id: "ev_s2_cultist_apotheosis",
    title: "카오스 컬티스트 — 승천의 제단과 카오스 스폰의 벼랑",
    category: "오염",
    once: true,
    req: {
      anyCareers: ["chaos_cultist", "chaos_champion"],
      minCorruption: 50,
      excludeTags: ["daemon_prince"]
    },
    reqLabel: "직군: 카오스 컬티스트 · 카오스 챔피언 · 오염도 50+",
    weight: 38,
    text: "피와 촛농으로 물든 지하 제단 위로 워프의 축복이 폭포처럼 쏟아져 내린다. 모든 배교자가 꿈꾸는 '데몬 프린스 승천'의 문턱이지만, 필멸자의 육신이 그 힘을 버티지 못하면 이성을 잃은 끔찍한 카오스 스폰으로 붕괴할 뿐이다.",
    choices: [
      {
        label: "[의지 판정] 폭주하는 암흑의 축복을 철의 자아로 억눌러 변이를 제어하고 어둠의 투사로 각성한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "뼈가 뒤틀리는 고통 끝에 자아를 지켜 냈다! 필멸자의 한계를 뛰어넘은 어둠의 투사로 거듭났다.",
          stats: { WP: 9, WS: 7, T: 6 },
          woundsBonus: 15,
          corruption: 8
        },
        fail: {
          text: "팔과 등이 기괴하게 부풀어 오르며 이성이 흔들렸다! 간신히 의식을 붙잡았으나 육신이 크게 망가졌다.",
          wounds: -28,
          stats: { T: -4 },
          corruption: 16
        }
      },
      {
        label: "[지성 판정] 과도한 변이가 곧 파멸임을 계산하고 의식진 외곽으로 힘을 분산해 안전하게 일부만 취한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "암흑 신들의 변덕스러운 함정을 영리하게 피해 내며 지혜와 제어력을 동시에 챙겼다!",
          stats: { Int: 7, WP: 5 },
          corruption: -8
        },
        fail: {
          text: "의식진이 역류해 제단이 폭발하며 심각한 워프 화상을 입었다.",
          wounds: -20,
          corruption: 12
        }
      },
      {
        label: "승천의 제단에서 한 발 물러서서 인간의 형상과 이성만은 끝까지 잃지 않으려 버틴다",
        effect: {
          text: "신들의 비웃음이 귓가를 스쳤지만, 괴물이 되지 않은 채 스스로의 의지로 밤을 버텨 냈다.",
          stats: { WP: 4 },
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Chaos Spawn / Black Crusade Core Rulebook"
  },
  {
    id: "ev_s2_psyker_sanction_burden",
    title: "생션드 사이커 — 전장의 워프 번개와 억제 고리의 한계",
    category: "사이커",
    once: true,
    req: {
      anyCareers: ["sanctioned_psyker", "primaris_psyker"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "직군: 생션드 사이커 · 프리마리스 사이커",
    weight: 34,
    text: "적 중전차 부대가 아군 보병 참호를 짓밟기 직전, 연대 지휘관이 무전으로 외친다. '사이커! 지금 당장 워프 화력을 퍼부어 저 쇳덩이들을 멈춰라!' 목에 찬 사이킥 억제 고리가 과열되며 불길한 쇳소리를 낸다.",
    choices: [
      {
        label: "[의지 판정] 워프의 번개를 정밀하게 끌어내려 적 전차를 태워 버리고도 정신 균형을 지켜 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "푸른 섬광이 적 선두 전차 세 대를 단숨에 녹여 버렸다! 경계하던 병사들마저 환호하며 그대를 영웅처럼 바라보았다.",
          stats: { WP: 8, Int: 5, Inf: 6 },
          corruption: -5
        },
        fail: {
          text: "워프 에너지가 역류해 코와 귀에서 피가 터져 나왔고, 잠시 악마의 웃음소리가 머릿속을 할퀴었다.",
          wounds: -20,
          corruption: 12
        }
      },
      {
        label: "[지성 판정] 사이킥 후드의 출력 한계를 정밀 계산해 적의 사격 조준만 교란하는 안전한 술식을 택한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "적 전차병들의 시야를 워프 안개로 가려 아군 대전차포가 안전하게 적을 격파하도록 도왔다!",
          stats: { Int: 6, WP: 5, Inf: 4 }
        },
        fail: {
          text: "집중이 끊기며 경미한 정신 충격과 편두통을 입었으나 폭주만은 막아 냈다.",
          wounds: -12,
          corruption: 6
        }
      },
      {
        label: "폭주 위험을 감수하지 않고 억제 고리를 조이며 황제께 정신의 안정을 빈다",
        effect: {
          text: "가장 무서운 적은 바깥의 전차가 아니라 내면의 워프다. 철저한 자제로 오늘도 이성을 지켰다.",
          stats: { WP: 4 },
          faith: 6,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Primaris Psyker / Codex: Astra Militarum"
  },
  {
    id: "ev_s5_traitor_death_guard",
    title: "역병의 행진 — 녹슨 종소리와 함께 상륙한 데스 가드",
    category: "배신자 군단",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "mars", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "high_lord_terra"
      ]
    },
    reqLabel: "18세 이상 · 카오스 침공 지상 전선 · 테라·화성·함선·야만 행성 제외",
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
      anyTags: [
        "militarum", "imperial_military", "officer", "commissar", "arbites",
        "inquisition_agent", "inquisitor", "navy", "administratum", "mechanicus",
        "sororitas", "astartes", "rogue_trader", "planetary_governor", "sector_lord"
      ],
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "high_lord_terra"
      ]
    },
    reqLabel: "18세 이상 · 제국 군사·보안·행정 지휘망",
    weight: 26,
    text: "아무런 외부 침공도 없었는데 성계 방어 포탑이 돌연 아군 수송선을 오인 사격하고, 서로 다른 장교들이 정반대의 기밀 명령서를 들고 충돌하기 시작했다. 통신망 잡음 사이로 비늘 문양 암호와 함께 단 한 줄의 조롱이 스쳐 지나갔다. '히드라 도미나투스. 내가 알파리우스다.' 알파 리전의 공작이다.",
    choices: [
      {
        label: "[지성 판정] 모든 복스 통신망을 즉각 끊고 수기 암호부와 인적 동선을 교차 대조해 내부의 진짜 잠입 공작원을 색출한다",
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
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "high_lord_terra"
      ]
    },
    reqLabel: "18세 이상 · 공포 심리전 지상 전선 · 테라·화성·크리그·함선·야만 행성 제외",
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
      anyTags: [
        "militarum", "imperial_military", "officer", "commissar", "scion",
        "sororitas", "astartes", "inquisition_agent", "inquisitor",
        "mechanicus", "sanctioned_psyker", "psyker_primaris", "arbites", "navy"
      ],
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "high_lord_terra"
      ]
    },
    reqLabel: "18세 이상 · 제국 전투·심문·사이커 전선",
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
    source: "Lexicanum: Thousand Sons / Codex: Thousand Sons"
  },
  // =========================================================================
  // 12단계: 생션드 사이커 · 아스트로패스 심화 사건 2종
  // =========================================================================
  {
    id: "ev_s12_psyker_primaris_trial",
    title: "생션드 사이커 — 프리마리스 사이커 전장 인가 시험",
    category: "사이커",
    once: true,
    req: {
      anyCareers: ["sanctioned_psyker"],
      excludeTags: ["psyker_primaris", "heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "직군: 생션드 사이커",
    weight: 34,
    text: "아스트라 텔레파티카 감찰관과 사단 커미사르가 지켜보는 가운데, 최전선 장교급 사이커인 '프리마리스 사이커' 승격 실전 평가가 시작되었다. 적 장갑 행렬을 사이킥 번개로 저지하되 워프의 악마적 속삭임을 단 한 틈도 허락하지 않아야 한다.",
    choices: [
      {
        label: "[의지 판정] 황제 영혼 결속의 빛을 집중시켜 포스 스태프 끝에서 순수한 사이킥 뇌전을 쏟아붓는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "푸른 뇌전이 적 장갑차 세 대를 동시에 고철로 만들었으나 오염 계측기는 0에 머물렀다! 정식 프리마리스 사이커 휘장을 하사받았다.",
          stats: { WP: 8, Int: 6, Inf: 8 },
          addTags: ["psyker_primaris"]
        },
        fail: {
          text: "워프 과부하로 코에서 피가 쏟아지고 경미한 오염을 입었으나 사격 저지에는 성공했다.",
          wounds: -18,
          corruption: 6,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 파괴적인 공격 대신 정교한 예지와 아군 방어막 술식으로 연대 전체의 피해를 절반으로 줄인다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "감찰관과 커미사르가 가장 안전하고 신뢰할 만한 전장 사이커라 극찬하며 프리마리스 인가를 승인했다!",
          stats: { Int: 8, WP: 6, Inf: 7 },
          addTags: ["psyker_primaris"]
        },
        fail: {
          text: "방어막 유지가 도중에 끊겨 심한 탈진을 겪었으나 통제력 자체는 인정을 받았다.",
          wounds: -12,
          stats: { Int: 4, WP: 3 }
        }
      },
      {
        label: "과도한 출력으로 워프의 주의를 끌기보다 규정 안전 한도 내에서 안정적인 보조 술식만 시연한다",
        effect: {
          text: "커미사르가 총구에서 손을 떼며 고개를 끄덕였다. 살아남는 사이커는 언제나 절제를 안다.",
          stats: { WP: 5, Int: 4 },
          corruption: -3
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Primaris Psyker"
  },
  {
    id: "ev_s12_psyker_astropath_dream",
    title: "생션드 사이커 — 성간 텔레파시 교신 속 원격 비명 해독",
    category: "사이커",
    req: {
      anyCareers: ["sanctioned_psyker"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "직군: 생션드 사이커",
    weight: 28,
    text: "아스트로패스 성가대 첨탑에서 성간 교신을 수신하던 중, 피와 재의 환영이 섞인 끔찍한 구조 신호가 정신 속으로 파고들었다. 인접 성계 함대가 워프 폭풍 속에 좌초되어 보내는 마지막 절규지만, 그 환영 뒤에는 악마의 함정이 숨어 있을 수도 있다.",
    choices: [
      {
        label: "[의지 판정] 정신 방벽을 세운 채 환영 깊숙이 들어가 좌초 함대의 정확한 워프 탈출 좌표를 건져 올린다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "피 묻은 환영 속에서 정확한 성계 좌표를 해독해 냈다! 구조 함대가 출항해 3만 명의 제국 장병을 살려 냈다.",
          stats: { WP: 7, Int: 5, Inf: 7 },
          faith: 6,
          align: { humane: 10 }
        },
        fail: {
          text: "환영 뒤에 숨어 있던 워프 포식자가 정신을 할퀴고 지나가며 심한 고통과 오염을 남겼다.",
          wounds: -18,
          corruption: 7,
          stats: { WP: 4 },
          align: { humane: 6 }
        }
      },
      {
        label: "[지성 판정] 환영의 상징을 직접 체험하지 않고 황제의 타로 해석법으로 간접 번역한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "악마의 함정을 피해 핵심 경고 메시지만 안전하게 해독해 성역 사령부에 전달했다!",
          stats: { Int: 7, Inf: 5, WP: 4 }
        },
        fail: {
          text: "타로의 상징이 워프 잡음에 뒤섞여 해석에 오차가 생겼고, 성가대장에게 지연 보고의 책임을 추궁받았다. 그래도 정신적 타격만큼은 피했다.",
          stats: { Inf: -2, Int: 2 }
        }
      },
      {
        label: "오염 징후가 짙은 교신이다. 아스트로패스 수칙에 따라 즉시 수신을 차단하고 정화 기도를 올린다",
        effect: {
          text: "성가대 동료들을 워프 감염에서 지켜 냈다. 냉혹하지만 필수적인 보안 절차였다.",
          stats: { WP: 5, Int: 3 },
          corruption: -4,
          align: { dogmatic: 8 }
        }
      }
    ],
    source: "Rogue Trader: The Navis Primer / Lexicanum: Astropath"
  }
];
