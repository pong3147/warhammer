// 제국 도시 · 행정 · 기계교 · 신앙 · 이단 치명 위기 사건
export default [
  {
    id: "ev_s8_crisis_forge_radleak",
    title: "치명적 위기 — 포지 월드 플라즈마 노심 방사능 누출",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["forge", "mechanicus"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "15세 이상 · 포지 월드 · 기계교 영역",
    weight: 16,
    text: "거대 플라즈마 원자로의 차폐막에 균열이 생겨 청백색 방사선이 복도 전체를 휩쓸고 있다! 기계교 경보음이 '장비 보전 최우선, 유기체 손실 허용'을 기계적으로 반복 송출한다. 공기 중에 이온화된 불꽃이 튀고 선량계 바늘이 치사 구역을 향해 치솟는다.",
    choices: [
      {
        label: "[지성 판정] 누스피어 비상 정지 의례를 송신해 차폐 셔터를 수동으로 내려 누출을 봉인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 이진법 제어 의례로 노심 폭주를 막았다! 상급 마고스가 그대의 연산 능력을 높이 평가했다.",
          wounds: -15,
          stats: { Int: 6, Inf: 5 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "셔터가 내려오기 직전 강한 방사선 펄스를 정면으로 맞아 극심한 방사능 피폭을 입었다.",
          wounds: -40,
          stats: { T: 2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[권위 판정] 상급 인원 전용 납 차폐 대피 캡슐의 접근 권한을 행사해 즉각 격리실로 들어간다",
        req: { stats: { Inf: 38 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "보안 서비터가 그대의 계급 인장을 인식해 차폐문을 열었다. 최소 피해로 누출을 피했다.",
          wounds: -10,
          stats: { Inf: 3 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "보안 인증이 지연되는 사이 치명적 방사선 파동에 노출되어 쓰러졌다.",
          wounds: -36,
          stats: { Inf: -3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[강인 판정] 방사선 경보 구역을 가로질러 반대편 격벽으로 강행 돌파한다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "피를 토하면서도 끝내 납 차폐 격벽 너머까지 걸어 나왔다!",
          wounds: -22,
          stats: { T: 6, WP: 3 }
        },
        fail: {
          text: "청백색 플라즈마 광선이 복도를 집어삼켰다. 방사선 계측기가 한계치를 찍으며 기록이 종료되었다.",
          instantDeath: "포지 월드 플라즈마 노심 방사능 누출 사고로 치사량 피폭 사망"
        }
      },
      {
        label: "두꺼운 납 도금 기계 부품 더미 뒤에 숨어 정화 서비터가 출동할 때까지 버틴다",
        effect: {
          text: "심각한 방사능 화상과 구토 증세를 얻었으나, 끝내 목숨은 건졌다.",
          wounds: -27,
          stats: { T: 2 }
        }
      }
    ],
    source: "Lexicanum: Forge World / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s8_crisis_agri_toxin",
    title: "치명적 위기 — 아그리 월드 궤도 화학 살포기 오폭",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      anyWorldTags: ["agri"],
      excludeTags: [
        "astartes", "transhuman", "power_armor", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "lord_inquisitor", "inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "rogue_trader", "guild_magnate"
      ]
    },
    reqLabel: "15세 이상 · 행성 유형: 아그리 월드 · 필멸자",
    weight: 16,
    text: "아드미니스트라툼의 좌표 오기로 인해 초강력 제초·살충 화학 안개가 작업 중인 평원 한복판에 통째로 살포되었다! 누런 독성 구름이 들판을 덮치며 농작물과 호흡기를 동시에 녹여 낸다. 궤도 수송선의 엔진 굉음이 멀어지는 사이 코를 찌르는 염소 악취가 지면을 낮게 타고 밀려든다.",
    choices: [
      {
        label: "[지성 판정] 풍향과 지형 경사를 파악해 독성 구름이 고이지 않는 상류 수로 제방으로 대피로를 낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 기상 판단으로 현장 인부들과 함께 안전 고지대에 도달했다!",
          wounds: -12,
          stats: { Int: 6, Fel: 4 },
          align: { humane: 8 }
        },
        fail: {
          text: "갑작스러운 돌풍에 독성 안개를 정면으로 들이마셔 폐에 큰 손상을 입었다.",
          wounds: -36,
          stats: { T: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 철수하는 농장 감독관의 밀폐 장갑 수송차량에 탑승할 수 있도록 기민하게 협상한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "남은 수확 장부 보전을 조건으로 내걸어 감독관의 차에 올라타 무사히 빠져나왔다.",
          wounds: -10,
          stats: { Fel: 5, Inf: 4 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "감독관이 문을 닫아걸고 떠나 버려, 뒤늦게 뛰다가 독성 연무에 심하게 중독되었다.",
          wounds: -36,
          stats: { Inf: -3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[강인 판정] 물에 적신 천을 입에 묶고 들판 끝 지하 사일로까지 숨을 참으며 달린다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "눈물과 기침을 견디고 지하 사일로 해치를 닫아걸었다!",
          wounds: -20,
          stats: { T: 6, Ag: 3 }
        },
        fail: {
          text: "독성 화학 안개가 폐부를 태워 버렸다. 아드미니스트라툼 서류에는 '살포 오차 — 다음 계절 인력 보충 요망'만 남았다.",
          instantDeath: "아그리 월드 화학 살포기 오폭으로 발생한 독성 안개에 질식 사망"
        }
      },
      {
        label: "진흙 도랑에 엎드려 젖은 흙으로 몸을 덮고 안개가 걷히길 기다린다",
        effect: {
          text: "피부 화상과 심각한 기침 후유증을 얻었으나 가까스로 살아남았다.",
          wounds: -26,
          stats: { T: 2 }
        }
      }
    ],
    source: "Lexicanum: Agri World / The Lords of Silence"
  },
  {
    id: "ev_s8_crisis_underhive_ambush",
    title: "치명적 위기 — 언더하이브 독가스 포위와 갱단 살육전",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 15,
      or: [
        { anyWorldTags: ["underhive", "gang"] },
        { anyCareers: ["underhive_ganger"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "transhuman", "power_armor", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "rogue_trader"
      ]
    },
    reqLabel: "15세 이상 · 언더하이브 · 갱단 구역",
    weight: 16,
    text: "폐수 집수조 인근 좁은 철골 다리에서 무장한 적대 갱단과 현상금 사냥꾼 무리가 앞뒤 퇴로를 완전히 틀어막았다! 발밑에서는 녹색 부식성 가스가 피어오르고 사방에서 오토건 노리쇠 소리가 울린다. 낡은 나트륨 조명 아래 무법자들의 총구가 일제히 그대를 겨눈다.",
    choices: [
      {
        label: "[교섭 판정] 갱단 두목의 약점과 더 큰 길드 수송대 정보를 미끼로 즉석 휴전 거래를 성사시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "두목이 칼을 거두고 웃음을 터뜨렸다! 피 한 방울 대신 언더하이브 암시장의 인맥까지 얻었다.",
          wounds: -10,
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "거래가 결렬되며 총탄이 빗발쳤다. 빗맞은 산탄에 옆구리가 찢긴 채 간신히 도주했다.",
          wounds: -38,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[민첩 판정] 연막탄을 터뜨리고 독성 폐수관 측벽을 타고 어둠 속으로 미끄러져 탈출한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "추격자들이 가스 속에서 서로 오인 사격을 벌이는 사이 흔적 없이 빠져나왔다!",
          wounds: -14,
          stats: { Ag: 6, Int: 2 }
        },
        fail: {
          text: "미끄러운 관에서 추락해 심한 타박상과 화학 화상을 입었다.",
          wounds: -36,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[백병 판정] 정면 선두의 무법자를 쓰러뜨리고 피의 돌파구를 열어젖힌다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "처절한 육박전 끝에 두목의 오른팔을 베어 넘기자 포위망이 겁을 먹고 갈라졌다!",
          wounds: -20,
          stats: { WS: 6, T: 3, Inf: 4 }
        },
        fail: {
          text: "사방에서 쏟아진 스터브건 탄막에 쓰러졌다. 언더하이브의 폐수조가 또 하나의 이름 없는 시신을 삼켰다.",
          instantDeath: "언더하이브 갱단 매복 포위망을 돌파하다 총탄 세례로 사망"
        }
      },
      {
        label: "지닌 물자와 통행증을 전부 바닥에 던져 시선을 끈 틈에 부상을 감수하고 도망친다",
        effect: {
          text: "총탄 파편에 다리를 스치고 가진 것을 대부분 잃었으나 목숨만은 건졌다.",
          wounds: -24,
          stats: { Inf: -6, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Necromunda / Necromunda Core Rulebook"
  },
  {
    id: "ev_s8_crisis_feral_beast",
    title: "치명적 위기 — 변방 야만 행성의 거대 포식수 습격",
    category: "치명 위기",
    once: true,
    req: {
      minAge: 14,
      anyWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "power_armor", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness", "magos", "fabricator_locum", "fabricator_general"
      ]
    },
    reqLabel: "14세 이상 · 행성 유형: 야만 행성 · 필멸자",
    weight: 16,
    text: "어스름한 숲속에서 거대한 뿔과 강철 같은 가죽을 지닌 원시 포식수가 울부짖으며 달려들었다! 사냥 일행이 흩어지고, 피에 굶주린 짐승의 붉은 눈이 오직 그대만을 향한다. 대지를 울리는 발굽 소리와 함께 거수가 굵은 나무줄기를 부러뜨리며 쇄도해 온다.",
    choices: [
      {
        label: "[백병 판정] 창과 도끼를 엇걸어 짐승의 돌진 무게를 역이용해 심장을 꿰뚫는다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "포효하던 거수가 발밑에 쓰러졌다! 부족 전체가 그대를 위대한 사냥꾼으로 추앙한다.",
          wounds: -18,
          stats: { WS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "짐승의 거대한 뿔이 방어를 뚫고 복부를 관통했다. 야만의 대지가 붉게 물들었다.",
          instantDeath: "변방 야만 행성의 거대 포식수와 맞서 싸우다 치명상을 입고 사망"
        }
      },
      {
        label: "[지성 판정] 횃불과 송진을 뿌려 짐승을 미리 파 둔 바위 함정 구덩이로 유인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "불길에 당황한 포식수가 함정에 빠지며 사냥이 끝났다! 지혜가 힘보다 강함을 증명했다.",
          wounds: -12,
          stats: { Int: 6, Inf: 4 }
        },
        fail: {
          text: "함정이 얕아 짐승이 뛰쳐나오는 바람에 발톱에 크게 찢긴 채 겨우 달아났다.",
          wounds: -36,
          stats: { Int: 2 }
        }
      },
      {
        label: "짐승이 들어오지 못하는 좁은 바위 틈새로 몸을 던져 밤새 출혈을 버틴다",
        effect: {
          text: "거친 바위에 몸이 찢기고 큰 상처를 입었으나, 동이 트자 짐승이 물러나 살아남았다.",
          wounds: -26,
          stats: { T: 3, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Feral World / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_admin_audit",
    title: "비전투 치명 위기 — 아드미니스트라툼 십일조 오기 숙청 감사",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["administratum"] },
        { anyTags: ["administratum", "noble"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain", "rogue_trader"
      ]
    },
    reqLabel: "16세 이상 · 행정·관료·귀족 · 크리그·야만 행성 제외",
    weight: 16,
    text: "성역 특별 감사관이 무장 아르비테스를 대동하고 청사에 들이닥쳤다! 그대가 서명한 3년 전 행성 십일조 장부에서 곡물 40만 톤의 소수점 누락이 발견되었다며, '반역적 직무 유기 — 즉각 서비터 개조형'을 선고하려 한다. 차가운 수갑을 든 집행관들이 집무실 출입구를 에워싸고 있다.",
    choices: [
      {
        label: "[지성 판정] 3년 치 원본 양피지와 궤도 화물선 선하증권을 밤새 대조해 상급 부서의 조작 흔적을 입증한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "빈틈없는 장부 대조로 진짜 횡령범인 상급 서기관을 밝혀냈다! 감사관이 그대를 치하하며 결원 자리로 승진시켰다.",
          stats: { Int: 7, Inf: 7, WP: 3 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "결정적 전표가 이미 소각되어 있었다! 무고함을 입증하지 못한 채 '행정 태만 징벌형'으로 서비터 공장에 끌려갔다.",
          instantDeath: "아드미니스트라툼 십일조 장부 오기 누명으로 서비터 개조 처형당함"
        }
      },
      {
        label: "[교섭 판정] 감사관의 승진 욕구를 간파하고, 더 거대한 세금 탈루 길드 명단을 조건으로 면책을 흥정한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "노련한 정치적 거래가 통했다! 감사관은 그대의 오기를 '경미한 행정 오차'로 덮고 새 표적으로 향했다.",
          stats: { Fel: 6, Inf: 5, Int: 2 },
          align: { ruthless: 7 }
        },
        critSuccess: {
          text: "비범한 언변으로 감사관의 환심을 완벽히 사로잡아 묵은 채무 기록까지 일괄 탕감받았다.",
          stats: { Fel: 7, Inf: 7, Int: 3 },
          removeTags: ["imperial_debt"],
          addTags: ["silver_tongue"],
          align: { ruthless: 6 }
        },
        fail: {
          text: "흥정이 뇌물 시도로 간주되어 공개 태형과 직위 강등 처분을 받고 만신창이가 되었다.",
          wounds: -34,
          stats: { Inf: -10 },
          addTags: ["penal_mark"],
          align: { ruthless: 4 }
        },
        critFail: {
          text: "뇌물 수수 혐의와 배상 명령이 동시에 떨어져 거액의 징벌적 채무까지 떠안았다.",
          wounds: -38,
          stats: { Inf: -12 },
          addTags: ["penal_mark", "imperial_debt"],
          align: { ruthless: 3 }
        }
      },
      {
        label: "[권위 판정] 상층 첨탑의 고위 후원자와 행성 법무관에게 긴급 보증서를 띄워 감사 집행을 정지시킨다",
        req: { stats: { Inf: 45 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "막강한 인맥의 압력 아래 감사가 조용히 종결되었다. 제국 관료제에서 진실보다 강한 것은 서열이었다.",
          stats: { Inf: 5, Fel: 3 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "후원자마저 몸을 사리며 꼬리 자르기에 나섰다! 혹독한 구금 심문 끝에 겨우 풀려났다.",
          wounds: -30,
          stats: { Inf: -12 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "항변을 포기하고 사재를 털어 배상금과 혹독한 채찍 징벌을 감수해 목숨만은 구명받는다",
        effect: {
          text: "서비터 개조만은 면했으나, 피투성이가 된 채 모든 직위와 재산을 잃고 바닥부터 다시 시작하게 되었다.",
          wounds: -24,
          stats: { Inf: -12, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Imperium Maledictum Core Rulebook"
  },
  {
    id: "ev_s8_crisis_noble_poison",
    title: "비전투 치명 위기 — 상층 첨탑 만찬의 독배와 정적 암살단",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      or: [
        { anyTags: ["noble", "wealthy", "terra_elite", "rogue_trader"] },
        { anyCareers: ["administratum", "rogue_trader"] }
      ],
      excludeWorlds: ["krieg", "voidborn", "baal", "catachan"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "planetary_governor", "sector_lord", "magos", "fabricator_locum", "fabricator_general",
        "high_lord_terra", "warmaster", "cardinal", "lord_inquisitor"
      ]
    },
    reqLabel: "18세 이상 · 귀족 · 상류층 · 로그 트레이더 · 관료 · 데스 월드·함선·야만 행성 제외",
    weight: 16,
    text: "총독궁 연회장에서 건배한 아마섹 증류주 잔을 내려놓은 순간, 손끝이 저려 오며 시야가 흐려진다! 정적 가문이 암시장 신경독을 탔고, 연회장 출입구에는 이미 매수된 자객들이 칼자루를 쥐고 서 있다. 음악과 웃음소리가 울려 퍼지는 화려한 홀 한가운데서 식은땀이 등줄기를 타고 흐른다.",
    choices: [
      {
        label: "[지성 판정] 혀끝의 미세한 금속 맛으로 독의 계열을 판별하고, 식탁 위 향신료와 식초로 즉시 구토·중화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 독물학 지식이 목숨을 건졌다! 멀쩡히 걸어 나온 그대를 보고 암살 배후의 얼굴이 하얗게 질렸다.",
          wounds: -12,
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "응급 해독이 늦어 치명적 신경독이 심장에 닿았다. 화려한 대리석 바닥 위에서 짧은 권력의 꿈이 끝났다.",
          instantDeath: "상층 첨탑 만찬에서 정적 가문이 탄 암시장 신경독에 중독되어 사망"
        }
      },
      {
        label: "[교섭 판정] 쓰러지기 직전 연회장 중앙에서 정적의 음모를 폭로해 총독과 귀족들 전체를 증인으로 묶는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "소름 돋는 기지로 판을 뒤집었다! 총독의 주치의가 즉시 해독제를 투여했고, 정적 가문은 반역죄로 숙청되었다.",
          wounds: -18,
          stats: { Fel: 7, Inf: 8 }
        },
        critSuccess: {
          text: "연회장 전체를 사로잡은 일갈로 정적 가문을 그 자리에서 역적으로 몰아세웠고, 사교계의 살아 있는 전설로 떠올랐다.",
          wounds: -8,
          stats: { Fel: 8, Inf: 10 },
          addTags: ["silver_tongue"]
        },
        fail: {
          text: "취객의 헛소리로 치부당해 제때 치료받지 못하고 며칠간 사경을 헤맨 끝에 간신히 살아났다.",
          wounds: -40,
          stats: { Inf: -6 }
        },
        critFail: {
          text: "해독이 늦어 독소가 장기에 고착되었다. 목숨은 건졌으나 만성적인 폐 질환과 독소 후유증이 남았다.",
          wounds: -44,
          stats: { Inf: -8 },
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "[권위 판정] 사설 호위대와 아르비테스 경호 인력을 즉시 연회장으로 난입시켜 현장을 무력 장악한다",
        req: { stats: { Inf: 50 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "압도적인 권력과 무력이 자객들을 단숨에 제압하고 전담 메디카에 의무관의 해독 시술을 이끌어 냈다!",
          wounds: -14,
          stats: { Inf: 6, WP: 4 }
        },
        fail: {
          text: "호위대가 진입하기 전 자객의 독단검에 옆구리를 찔려 중상을 입었다.",
          wounds: -38,
          stats: { Inf: -4 }
        }
      },
      {
        label: "독이 퍼진 몸을 이끌고 연회장 발코니 하수 통로로 몸을 던져 사설 의원을 찾아간다",
        effect: {
          text: "독 후유증과 추락상으로 크게 상했으나, 목숨만은 건진 채 정적에게 갚아 줄 복수의 칼을 갈았다.",
          wounds: -30,
          stats: { T: 3, Inf: -5 }
        }
      }
    ],
    source: "Lexicanum: Highborn / Dark Heresy Second Edition Core Rulebook"
  },
  {
    id: "ev_s8_crisis_heresy_tribunal",
    title: "비전투 치명 위기 — 무고로 끌려간 이단 심문 법정",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "astartes", "transhuman", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "inquisitor", "lord_inquisitor", "cardinal", "warmaster", "sector_lord",
        "planetary_governor", "fabricator_general", "canoness", "commissar_general", "navy_admiral",
        "arbites_marshal", "departmento_head"
      ]
    },
    reqLabel: "18세 이상 · 비야만 행성 · 크리그 제외 · 필멸자",
    weight: 14,
    alignBias: "dogmatic",
    text: "시기심에 눈먼 정적이 조작한 고발장 한 통으로, 그대는 오르도 헤레티쿠스 심문관과 국교 주교가 앉은 지하 심문 법정에 사슬로 묶여 끌려왔다. '무고함은 아무것도 증명하지 못한다. 변론하라!' 차가운 쇠사슬 소리와 화로에서 피어오르는 향 연기 너머로 서기 서비터의 펜촉이 판결문을 기록할 준비를 마쳤다.",
    choices: [
      {
        label: "[의지 판정] 《렉티티오 디비니타투스》의 정통 교리를 한 글자도 틀리지 않고 암송하며 꺾이지 않는 신앙으로 결백을 증명한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "강철 같은 신앙심과 당당한 기개에 주교가 고개를 끄덕였다! 오히려 거짓 고발을 꾸민 정적이 이단 선동죄로 체포되었다.",
          stats: { WP: 7, Inf: 6 },
          faith: 10,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "고문실의 공포 속에 말문이 막히고 말았다. 법정은 '잠재적 배교 혐의 확정 — 정화의 화형'을 선고했다.",
          instantDeath: "정적의 무고로 끌려간 이단 심문 법정에서 결백을 입증하지 못하고 화형당함"
        }
      },
      {
        label: "[지성 판정] 고발장에 적힌 날짜·봉인 인장·필적의 치명적 모순 세 가지를 냉철히 논파한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "날카로운 논리가 조작된 증거를 산산조각 냈다! 심문관이 흥미로운 눈빛으로 석방 명령서에 서명했다.",
          stats: { Int: 7, Inf: 5, WP: 3 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "교묘한 말장난이 '오만한 이단적 궤변'으로 찍혀 참혹한 고문 심문을 받은 뒤에야 석방되었다.",
          wounds: -38,
          stats: { Inf: -6 }
        }
      },
      {
        label: "[교섭 판정] 국교·행정부의 오랜 인맥과 후원자를 증인으로 세워 충성 이력을 보증받는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "수많은 증인의 탄원서가 법정에 쏟아졌고, 심문소는 혐의 없음으로 조서를 종결했다.",
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "증인들이 보복이 두려워 입을 다물었다. 오랜 구금과 채찍질 끝에 간신히 목숨만 건졌다.",
          wounds: -34,
          stats: { Inf: -8 }
        }
      },
      {
        label: "끝없는 신앙 고백과 가혹한 참회 채찍형을 순순히 받아들여 자비로운 방면을 호소한다",
        effect: {
          text: "등이 피투성이가 되는 혹독한 참회형을 견뎌 내고 석방되었다. 살아남았으나 명예에 큰 흠집이 남았다.",
          wounds: -26,
          faith: 6,
          stats: { Inf: -6, WP: 3 },
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Ordo Hereticus / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_tech_machine_spirit",
    title: "비전투 치명 위기 — 폭주한 중기갑 원자로 기계령과 격납고 봉쇄",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["tech_priest", "archmagos", "skitarii"] },
        { anyTags: ["mechanicus", "mechanicus_blood"] },
        { anyFocus: ["lore"] }
      ],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "fabricator_general", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "16세 이상 · 기계교 · 학문 초점 · 비야만 행성",
    weight: 16,
    text: "정비 중이던 임페리얼 나이트급 원자로 격납고에서 호전적인 고대 기계령이 성유 의식을 거부하며 격렬히 폭주했다! 강철 방폭문이 저절로 닫히고, 격납고 천장의 자동 방어 볼터 포탑과 과열된 플라즈마 배출구가 그대를 향해 일제히 작동한다. 귀청을 찢는 이진법 굉음이 복스 스피커를 타고 작업장을 뒤흔든다.",
    choices: [
      {
        label: "[지성 판정] 정통 메카니쿠스 성유와 이진법 진정 코드를 원자로 단말기에 직결해 폭주하는 기계령을 진압한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정확한 교리 의례가 격노한 기계령의 맥동을 잠재웠다! 방어 포탑과 과열 밸브가 멈추고, 나이트 원자로의 고유 조율 수치까지 완벽히 복원했다.",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "진정 코드가 거부되며 천장 자동 볼터 포탑이 일제 사격을 퍼부었다. 정비 격납고는 붉은 연무와 불꽃에 잠겼다.",
          instantDeath: "격납고에서 폭주한 중기갑 원자로 기계령의 자동 방어 포탑 사격에 휘말려 순직"
        }
      },
      {
        label: "[의지 판정] 신경 접속 케이블을 직접 연결해 강철 같은 정신력으로 호전적인 기계령의 주도권을 짓누른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "코피를 쏟으면서도 전쟁 기계의 맹렬한 투지를 정신으로 길들였다! 포탑이 침묵하고 봉쇄된 방폭문이 열렸다.",
          wounds: -14,
          stats: { WP: 7, Int: 4 }
        },
        fail: {
          text: "신경 역류 충격이 뇌를 강타해 의식을 잃었고, 중상을 입은 채 기계교 수습반에 실려 격납고 밖으로 나왔다.",
          wounds: -38,
          corruption: 6
        }
      },
      {
        label: "[권위 판정] 상급 포지 사령부 채널로 비상 봉쇄 인장을 전송해 외부에서 격납고 주전력을 원격 차단한다",
        req: { stats: { Inf: 42 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "즉각적인 원격 차단으로 위기를 넘겼다. 다만 폭주한 원자로 노심은 강제 냉각 과정에서 영구 손상되었다.",
          wounds: -10,
          stats: { Inf: 4, Int: 2 }
        },
        fail: {
          text: "포지 사령부의 승인 절차가 지연되는 사이 포탑 유탄을 맞고 중상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 }
        }
      },
      {
        label: "정비 도구와 장비를 모두 포기하고 비상 소화 가스를 터뜨려 시야를 가린 채 수동 탈출구로 빠져나간다",
        effect: {
          text: "포탑 파편에 어깨가 찢기고 설비 손실 책임을 추궁받았으나, 목숨만은 건졌다.",
          wounds: -26,
          stats: { Inf: -6, T: 2 }
        }
      }
    ],
    source: "Lexicanum: Machine Spirit / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s8_crisis_ecclesiarchy_riot",
    title: "비전투 치명 위기 — 기근 폭동과 대성당·청사 포위",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 17,
      or: [
        { anyCareers: ["ecclesiarchy_priest", "administratum"] },
        { anyTags: ["pious", "ecclesiarchy", "noble"] },
        { anyFocus: ["faith", "politics"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel", "assassin",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "cardinal", "canoness", "lord_inquisitor", "fabricator_general"
      ]
    },
    reqLabel: "17세 이상 · 국교 · 행정 · 귀족 · 신앙·인맥 초점",
    weight: 15,
    text: "십일조 과징으로 굶주린 하층민 수천 명이 횃불과 쇠파이프를 들고 그대가 머무는 대성당 겸 행정 청사를 포위했다! 경비병들은 이미 흩어졌고, 불붙은 기름병이 정문을 향해 날아든다. 철문 빗장이 흔들리는 굉음 너머로 굶주림과 광기가 뒤섞인 성난 함성이 광장을 메운다.",
    choices: [
      {
        label: "[교섭 판정] 성단 위로 올라가 황제의 이름으로 폭도들의 분노를 다독이는 사자후 연설을 펼친다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "압도적인 카리스마와 진심 어린 호소에 폭도들이 무기를 내려놓고 무릎을 꿇었다! 구역 전체의 신망을 얻었다.",
          stats: { Fel: 8, Inf: 6 },
          faith: 8,
          align: { humane: 7 }
        },
        fail: {
          text: "성난 군중 속 배교 선동가가 던진 화염병과 돌팔매에 휩쓸렸다. 불타는 청사 앞에서 끝내 일어나지 못했다.",
          instantDeath: "기근 폭동으로 불타오른 청사 앞에서 성난 폭도들에게 휩쓸려 순직"
        }
      },
      {
        label: "[지성 판정] 비상 비축 곡물 창고의 장부를 공개하고 배급 개시 협정을 즉석에서 체결한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "실질적인 식량 분배안이 군중의 광기를 단숨에 가라앉혔다! 폭동 없이 사태를 수습한 명관으로 기록되었다.",
          stats: { Int: 6, Fel: 4, Inf: 4 },
          align: { humane: 9 }
        },
        fail: {
          text: "창고마저 텅 비어 있음이 들통나며 군중이 더욱 격분했다! 투석 세례를 뚫고 겨우 몸을 피했다.",
          wounds: -36,
          stats: { Inf: -6 },
          align: { humane: 5 }
        }
      },
      {
        label: "[권위 판정] 암호 복스로 아뎁투스 아르비테스 진압대와 장갑차를 긴급 출동시킨다",
        req: { stats: { Inf: 44 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "쇼크 마울과 최루탄을 앞세운 아르비테스 진압대가 10분 만에 광장을 평정했다. 냉혹하지만 질서는 지켜졌다.",
          wounds: -10,
          stats: { Inf: 5, Fel: -3 },
          align: { dogmatic: 8 }
        },
        fail: {
          text: "진압대가 도착하기 전 정문이 뚫려 화염과 난투 속에 큰 부상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "성물과 장부를 버려두고 지하 납골당 비밀 통로로 기어들어가 날이 밝길 기다린다",
        effect: {
          text: "유독 연기와 부상을 안은 채 탈출했으나, 청사가 불탄 책임으로 평판이 크게 추락했다.",
          wounds: -22,
          stats: { Inf: -8, WP: 2 },
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_rt_mutiny",
    title: "비전투 치명 위기 — 워프 표류와 선상 반란 · 사략선 협박",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      or: [
        { anyCareers: ["rogue_trader", "imperial_navy"] },
        { anyTags: ["rogue_trader", "rogue_trader_blood", "navy", "voidborn"] }
      ],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "navy_admiral"
      ]
    },
    reqLabel: "18세 이상 · 로그 트레이더 · 제국 해군 · 보이드본",
    weight: 16,
    text: "보급이 끊긴 채 3개월째 변방 성계에 표류하자, 하층 기관실 선원 수백 명이 무기고를 털고 함교를 향해 반란을 일으켰다! 설상가상으로 궤도 밖에서는 정체불명의 해적 사략선이 항복을 요구해 온다. 함교 방폭문 너머로 용접 불꽃이 튀어 오르며 선내 복스망이 반란군의 고함으로 뒤덮였다.",
    choices: [
      {
        label: "[교섭 판정] 반란 주동자들의 이해관계를 파고들어 선원들을 이간질하고 사면·포상으로 전열을 되돌린다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "유려한 웅변과 과감한 포상 약속에 반란군이 주동자를 스스로 묶어 바쳤다! 해적 사략선마저 기세에 눌려 후퇴했다.",
          stats: { Fel: 7, Inf: 7 }
        },
        fail: {
          text: "흥분한 반란군이 함교 장갑문을 용접기로 뚫고 들이닥쳤다. 좁은 함교에서 저항하다 끝내 쓰러졌다.",
          instantDeath: "보급이 끊긴 성간 함선의 선상 반란에 함교가 함락되어 순직"
        }
      },
      {
        label: "[지성 판정] 선내 생명 유지 장치 압력 조절과 소행성대 역기동으로 반란군과 해적을 동시에 무력화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "천재적인 함내 통제와 항해 기동으로 반란군을 산소 부족으로 항복시키고 해적선까지 따돌렸다!",
          stats: { Int: 8, Ag: 4, Inf: 5 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "과부하로 함교 콘솔이 폭발해 화상을 입었으며, 겨우 비상 부스터로 성계를 벗어났다.",
          wounds: -36,
          stats: { Int: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[권위 판정] 지휘 권한과 막대한 현상금을 내걸어 선내 용병 경비대와 사략선 간부를 역매수한다",
        req: { stats: { Inf: 48 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "황금의 위력 앞에 용병들이 반란을 진압하고 해적선까지 보급 호위로 돌아섰다!",
          wounds: -10,
          stats: { Inf: 6, Fel: 3 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "용병 일부마저 배신해 난전이 벌어졌고, 큰 부상을 입은 채 겨우 반란을 틀어막았다.",
          wounds: -34,
          stats: { Inf: -6 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "화물 절반과 비상 자금을 내어 주고 반란군과 타협해 가까운 제국 항구로 귀항한다",
        effect: {
          text: "피비린내 나는 학살은 피했으나, 난투 중 부상을 입고 막대한 재정·권위 손실을 떠안았다.",
          wounds: -20,
          stats: { Inf: -10, Fel: -2 },
          align: { humane: 6 }
        }
      }
    ],
    source: "Lexicanum: Rogue Trader / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s8_crisis_blackmail_syndicate",
    title: "비전투 치명 위기 — 지하 암흑 길드의 협박과 암살 청부",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 18,
      or: [
        { anyCareers: ["administratum", "menial_worker", "underhive_ganger", "arbites", "ecclesiarchy_priest", "rogue_trader"] },
        { anyFocus: ["politics", "lore"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTrees: ["sororitas", "officio_assassinorum", "living_saint", "custodes", "grey_knights", "astartes"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "sororitas", "sororitas_novitiate", "celestian", "assassin", "living_saint", "saint_vessel",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "general_rank",
        "commissar_general", "lord_commissar", "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral", "arbites_marshal",
        "departmento_head", "rt_lord_captain"
      ]
    },
    reqLabel: "18세 이상 · 비전투 직군 · 인맥·학문 초점 · 크리그·야만 행성·초인·수도회·암살청 제외",
    weight: 15,
    text: "거처 문틈으로 검은 밀랍 인장이 찍힌 협박장과 암살 청부 계약서 사본이 밀려 들어왔다! 행성 지하를 주무르는 암흑 길드가 그대의 비밀 장부를 손에 넣었다며, 내일 새벽까지 굴복하지 않으면 자객을 보내겠다고 경고한다. 어두운 창밖 골목 건너편에서 감시자의 매서운 시선이 번뜩인다.",
    choices: [
      {
        label: "[지성 판정] 길드의 자금 세탁 암호와 은신처 동선을 역추적해 오히려 길드 간부의 치명적 비리를 손에 넣는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "완벽한 역추적에 길드가 꼬리를 내리고 협박장을 거둬들였다! 오히려 지하 세계가 그대를 두려워하게 되었다.",
          stats: { Int: 7, Inf: 6 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "역추적이 발각되어 그날 밤 침실로 숨어든 길드 자객의 독침에 목숨을 잃었다.",
          instantDeath: "행성 지하 암흑 길드의 보복 암살 청부에 당해 어둠 속에서 최후를 맞음"
        }
      },
      {
        label: "[특성 전용 · 악명 높은 냉혈한] 협박 심부름꾼의 손가락을 꺾어 길드 두목에게 피 묻은 역경고장을 돌려보낸다",
        req: { allTags: ["notorious_ruthless"] },
        effect: {
          text: "잔혹한 악명이 지하 세계를 얼어붙게 만들었다. 길드 두목이 직접 사죄하며 협박 문서를 반납했다.",
          stats: { Inf: 6, WP: 4 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "[교섭 판정] 라이벌 범죄 조직에 길드의 비밀을 넘기는 조건으로 암살자들을 역매복시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "지하 세력끼리 피 튀기는 항쟁이 벌어지며 그대에 대한 청부가 자동 폐기되었다! 손 안 대고 위기를 넘겼다.",
          stats: { Fel: 7, Inf: 5 },
          align: { ruthless: 8 }
        },
        critSuccess: {
          text: "양쪽 조직을 완벽히 조종해 협박 길드를 와해시켰을 뿐 아니라, 압수한 비자금으로 묵은 채무까지 전부 청산했다.",
          stats: { Fel: 8, Inf: 7 },
          removeTags: ["imperial_debt"],
          align: { ruthless: 8 }
        },
        fail: {
          text: "양쪽 조직의 배신 속에 길거리 습격을 받아 큰 상처를 입고 겨우 달아났다.",
          wounds: -36,
          stats: { Inf: -6 },
          align: { ruthless: 5 }
        },
        critFail: {
          text: "자객의 습격에서 겨우 도망쳤으나, 입막음과 수습을 위해 지하 고리대금에 손을 대고 말았다.",
          wounds: -40,
          stats: { Inf: -8 },
          addTags: ["imperial_debt"],
          align: { ruthless: 4 }
        }
      },
      {
        label: "[권위 판정] 아뎁투스 아르비테스 특별 수사반에 기밀 제보를 넣어 길드 아지트를 선제 급습하게 한다",
        req: { stats: { Inf: 42 } },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "새벽녘 아르비테스의 장갑차가 길드 본거지를 박살 냈다! 협박 문서는 흔적도 없이 소각되었다.",
          stats: { Inf: 6, WP: 3 },
          align: { dogmatic: 7 }
        },
        fail: {
          text: "급습 정보가 사전에 새어 나가 길드 잔당의 보복 총격을 받고 중상을 입었다.",
          wounds: -34,
          stats: { Inf: -4 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "막대한 입막음 비용과 인맥을 내어 주고 다른 구역으로 조용히 거처를 옮긴다",
        effect: {
          text: "암살의 칼날은 피했으나, 보복 협박 속에 몸과 마음이 크게 상하고 입지가 추락했다.",
          wounds: -20,
          stats: { Inf: -10, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Cold Trade / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s8_crisis_forbidden_archive",
    title: "비전투 치명 위기 — 금서고의 저주받은 사본 폭주",
    category: "비전투 위기",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["administratum", "tech_priest", "inquisition_acolyte", "inquisitor", "ecclesiarchy_priest", "sanctioned_psyker"] },
        { anyFocus: ["lore", "forbidden"] }
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord",
        "custodes", "grey_knight", "dreadnought",
        "living_saint", "saint_vessel", "blank", "omega_pariah"
      ]
    },
    reqLabel: "16세 이상 · 서고·기계교·심문소·국교·학문·금단 초점 · 초인·성인·무혼 제외",
    weight: 15,
    text: "고대 서고 깊숙이 보관되었던 봉인 사본의 납 인장이 저절로 녹아내렸다! 펼쳐진 양피지에서 피처럼 붉은 문자가 허공에 떠올라 서고 사서들의 눈을 불태우고, 차가운 워프의 속삭임이 정신을 잠식하기 시작한다. 천장의 성유 등불이 일제히 꺼지며 촛농 냄새 사이로 끔찍한 이계의 냉기가 번진다.",
    choices: [
      {
        label: "[이단심문관 전용] 로제트를 들어 올려 서고 전체에 즉결 봉쇄령을 선포하고 오르도 말레우스 성수 정화반을 직접 지휘한다",
        req: { anyTags: ["inquisitor", "lord_inquisitor"] },
        effect: {
          text: "이단심문관의 절대 권한 아래 서고 방화 격벽이 즉시 폐쇄되고, 수행원들이 축성 화염으로 저주받은 사본을 흔적 없이 소각했다!",
          wounds: -10,
          stats: { WP: 5, Inf: 5 },
          faith: 6,
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[지성 판정] 고대 육망성 봉인 술식의 구문을 역설계해 저주받은 사본을 납 함 속에 재봉인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉철한 문헌 해독으로 단 한 번의 실수 없이 봉인을 복구했다! 오르도 말레우스 기록관이 경의를 표했다.",
          stats: { Int: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "금지된 음절을 잘못 읽는 순간 양피지에서 뿜어진 워프 불길이 영혼과 육신을 재로 만들어 버렸다.",
          instantDeath: "금서고의 저주받은 사본을 봉인하다 워프 화염에 휘말려 소멸"
        }
      },
      {
        label: "[의지 판정] 황제의 이름을 외치며 정신 방벽을 세우고 축성 화염으로 사본을 정면 소각한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불굴의 신념이 저주의 속삭임을 꺾었다! 사본이 검은 재로 변하며 서고의 악몽이 끝났다.",
          wounds: -14,
          stats: { WP: 7, Inf: 4 },
          faith: 8,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "저주받은 문자가 시신경을 할퀴고 정신에 깊은 워프 오염을 새긴 뒤에야 불길이 사본을 삼켰다.",
          wounds: -34,
          corruption: 14,
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 공포에 질린 사서들과 경비병을 진정시켜 서고 방화 격벽과 정화 가스 밸브를 합동 작동한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "일사불란한 통솔력으로 전원 대피와 서고 정화 봉쇄를 완수했다!",
          wounds: -10,
          stats: { Fel: 6, Inf: 5 },
          align: { humane: 8 }
        },
        fail: {
          text: "혼비백산한 인파에 깔리고 유독 정화 가스를 마셔 심각한 부상을 입었다.",
          wounds: -34,
          corruption: 6,
          align: { humane: 4 }
        }
      },
      {
        label: "양피지를 보지 않으려 눈을 질끈 감은 채 서고 바깥으로 물러나 외부 봉쇄 경보를 울린다",
        effect: {
          text: "워프 잔향에 정신이 크게 상하고 사후 오르도 말레우스 정화반의 혹독한 오염 검증 절차를 버텨야 했으나 목숨만은 건졌다.",
          wounds: -22,
          corruption: 8,
          stats: { WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Forbidden Lore / Dark Heresy: Disciples of the Dark Gods"
  }
];
