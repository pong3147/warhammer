// 분기 사건 — 초인·고위직·특수세력 삶의 초점 3막(6종) · M41 교조/자비 고위 비전투 딜레마(2종)
export default [
  {
    id: "ev_s20_fah_01",
    title: "생존과 보양 3막 — 끝없는 장기전과 전신 내구의 임계 조율",
    category: "삶의 초점 3막",
    once: true,
    req: {
      minAge: 20,
      anyFocus: ["survival"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["daemonic"],
      or: [
        { anySocialTiers: ["apex"] },
        { anyBodyClasses: ["transhuman", "dreadnought"] },
        { anyWorlds: ["krieg"], minSocialTier: "elite" }
      ]
    },
    reqLabel: "20세 이상 · 초인/최고위/크리그 고위 · 삶의 초점: 생존과 보양",
    weight: 30,
    text: "멈추지 않는 소모전과 극한의 작전 환경 속에서 최상위 전력이라 해도 피로와 손상은 차곡차곡 쌓인다. 전담 의무관과 정비 기술사제가 합동 점검 보고서를 올리며, 지금 방호 외피와 신경 계통, 지휘 체력의 누적 부하를 정밀 조율하지 않으면 결정적인 전장에서 치명적인 기능 저하가 닥칠 수 있다고 경고했다. 전선의 압박은 여전히 거세지만, 스스로의 한계를 온전히 보전해야만 수천의 명운을 끝까지 떠받칠 수 있다.",
    choices: [
      {
        label: "[강인 판정] 극한 부하 조율과 통증 억제 훈련을 감행해 신체와 장비의 내구 한계를 끌어올린다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "고통스러운 신경 재보정과 고압 내구 시험을 흔들림 없이 견뎌 냈다. 누적된 미세 손상이 말끔히 정비되며, 어떤 극한 전장에서도 버틸 압도적인 내구력과 장기 생존의 밑천을 확보했다.",
          stats: { T: 7, WP: 5 },
          wounds: 18,
          lifeBonusExtra: 6,
          align: { dogmatic: 5 }
        },
        fail: {
          text: "과부하 조율 도중 순환 계통에 심한 충격이 번져 한동안 강도 높은 회복 절차를 밟아야 했다. 그러나 한계 수치를 직접 확인한 덕분에 향후 손상을 피할 감각은 몸에 깊이 새겨졌다.",
          wounds: -12,
          stats: { T: 3, WP: 2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[지성 판정] 의무·정비진과 부하 자료를 해부해 전우들과 보급 체계의 표준 보전 주기를 세운다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "방대한 정비 기록에서 피로 누적의 핵심 원인을 찾아내 최적의 교대·조율 수칙을 완성했다. 그대 본인의 상태가 완벽히 회복되었을 뿐 아니라, 전우들과 보급 체계의 소모율까지 크게 줄어들며 깊은 신망이 모였다.",
          stats: { Int: 6, T: 5, Inf: 5 },
          wounds: 16,
          align: { humane: 7 }
        },
        fail: {
          text: "복잡한 계측 보정에 시간이 지체되어 현장 적용이 늦어졌다. 일부 장비의 재점검에 에너지를 쏟았으나, 본인의 필수 보전 절차만큼은 무사히 마쳤다.",
          wounds: -6,
          stats: { Int: 3, T: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "정규 점검표에 따라 손상 부위와 피로를 차분히 수습하며 다음 장기전을 대비한다",
        effect: {
          text: "과욕을 버리고 정석적인 보전 절차를 끝까지 준수했다. 화려한 성과는 없었으나 방호 계통과 체력이 안정적으로 회복되어 다음 장기전을 견딜 탄탄한 토대가 갖춰졌다.",
          stats: { T: 4, WP: 3 },
          wounds: 15,
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Adeptus Custodes / Imperium Maledictum"
  },
  {
    id: "ev_s20_fah_02",
    title: "전설의 무예 3막 — 금지 등급 전투 서비터 모의전",
    category: "삶의 초점 3막",
    once: true,
    req: {
      minAge: 20,
      anyFocus: ["combat"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      or: [
        { anyBodyClasses: ["transhuman"] },
        { anyTags: ["high_lord_terra", "warmaster", "general_rank", "navy_admiral", "lord_inquisitor", "knight_high_king", "imperial_knight", "assassin", "canoness"] },
        { anyWorlds: ["krieg"], minSocialTier: "elite" }
      ]
    },
    reqLabel: "20세 이상 · 초인/고위 지휘관/크리그 고위 · 삶의 초점: 무예와 전투 훈련",
    weight: 32,
    text: "강화 세라마이트 격벽으로 둘러싸인 최고 보안 전술 모의실에 금지 등급 개조 전투 서비터 편대가 배치되었다. 이 모의전은 제국 최정예 전사와 고위 지휘관들의 실전 감각을 극한까지 시험하기 위해, 배신자 군단과 흉포한 외계 포식자의 협동 기동을 살상 속도로 재현한다. 무기고 감독관이 안전 제한기 해제 열쇠를 내밀며, 어느 수준까지 실전 부하를 감수할지 최종 결정을 기다린다.",
    choices: [
      {
        label: "[백병 판정] 안전 제한기를 해제한 전투 서비터 편대를 상대로 근접 격파 모의전을 감행한다",
        check: { stat: "WS", diff: -10 },
        critSuccess: {
          text: "눈 깜짝할 사이의 완벽한 검극과 보법으로 살상 모드의 전투 서비터 편대 전체를 흠집 하나 없이 무력화했다! 모의실 관측창 너머로 경탄의 침묵이 흘렀고, 그대의 무예는 살아 있는 전술 교본으로 기록되었다.",
          stats: { WS: 10, Ag: 6, Inf: 6 },
          wounds: 6,
          align: { dogmatic: 6 }
        },
        success: {
          text: "불꽃이 튀는 고속 공방 끝에 서비터 편대의 협공망을 정면으로 꿰뚫어 주 구동부를 파괴했다. 극한의 살기를 통과하며 근접 전술 감각이 한 차원 더 예리해졌다.",
          stats: { WS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "서비터의 변칙적인 협공에 방호가 밀리며 충격날에 깊은 타박상을 입었다. 비상 정지 신호가 울린 뒤에야 대련이 끝났으나, 허점을 깨달은 값진 교훈이 몸에 남았다.",
          wounds: -14,
          stats: { WS: 3, T: 2 }
        },
        critFail: {
          text: "과부하로 폭주한 전투 서비터의 중량 갈퀴가 방어선을 무너뜨리며 그대를 세라마이트 격벽에 강하게 내리꽂았다! 긴급 차단기가 작동해 목숨은 건졌으나 심각한 타박과 함께 모의전 기록에 뼈아픈 오점이 남았다.",
          wounds: -22,
          stats: { Inf: -4, T: 2 }
        }
      },
      {
        label: "[사격 판정] 모의 포화가 교차하는 극한 화력 통로를 정밀 사격으로 돌파한다",
        check: { stat: "BS", diff: -10 },
        critSuccess: {
          text: "단 한 발의 낭비도 없는 경이로운 연속 명중으로 자동 포탑과 기만 표적을 가동 직전에 전부 분쇄했다! 모의실 개장 이래 최고 기록이 갱신되며 사격술과 전장 판단력의 정점을 증명했다.",
          stats: { BS: 10, Int: 5, Inf: 6 },
          align: { dogmatic: 5 }
        },
        success: {
          text: "연막과 모의 포격이 시야를 가리는 속에서도 탄도와 사각을 완벽히 계산해 모든 핵심 표적을 제압했다. 흔들리지 않는 조준 리듬이 지휘와 전투 모두의 위력을 끌어올렸다.",
          stats: { BS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "교차 사격 구역에서 모의 충격탄의 파편에 어깨를 스치며 사격 리듬이 끊겼다. 끝까지 통로를 완주했으나 상처를 치료하며 보완할 점이 분명히 드러났다.",
          wounds: -12,
          stats: { BS: 3, WP: 2 }
        },
        critFail: {
          text: "도탄된 충격탄이 사선 옆 훈련용 연막 억제기를 터뜨리며 섬광과 파편이 정면으로 덮쳤다! 시야가 잠시 마비되고 방호가 크게 그을려 전술 모의전을 중도 중단해야 했다.",
          wounds: -20,
          stats: { BS: 1, Inf: -3 }
        }
      },
      {
        label: "살상 제한기를 유지한 채 서비터 기동 자료를 분석하며 정교한 대응 전술을 연마한다",
        effect: {
          text: "개인의 무용을 과시하기보다 실전 기동 패턴을 차분히 해부해 대응 교리를 다듬었다. 무리한 부상 없이도 전투 기량과 전술 감각이 안정적으로 정돈되었다.",
          stats: { WS: 3, BS: 3, Int: 2 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Codex: Adeptus Custodes (Blood Games) / Codex: Space Marines / Only War"
  },
  {
    id: "ev_s20_fah_03",
    title: "신앙의 정점 3막 — 대성소 성유물 앞의 침묵과 신념의 결단",
    category: "삶의 초점 3막",
    once: true,
    req: {
      minAge: 20,
      anyFocus: ["faith"],
      excludeRealms: ["heretic", "mechanicus"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["grey_knight", "custodes", "mechanicus", "magos", "fabricator_locum", "fabricator_general", "assassin"],
      or: [
        { anySocialTiers: ["apex"] },
        { anyBodyClasses: ["transhuman"] },
        { anyTags: ["cardinal", "canoness", "living_saint", "saint_vessel"] }
      ]
    },
    reqLabel: "20세 이상 · 초인/최고위/고위 성직 · 삶의 초점: 황제 신앙과 기도",
    weight: 30,
    text: "수백만 순직자의 이름이 청동 기둥마다 새겨진 대성소 성유물단 앞에 묵묵히 자리해 황금 옥좌를 향한 침묵의 성찰에 잠겼다. 그 엄숙한 정적 속으로 성역 감찰 사절단이 조심스럽게 다가와 곤혹스러운 보고를 올렸다. 최근 전쟁의 참화로 무너진 인접 변경 구역에서 절망한 필멸자들이 정통 교리와 어긋나는 독자적 구원 송가를 퍼뜨리고 있으며, 즉각적인 무력 정화인지 자비로운 교리 교화인지를 두고 그대의 최종 판단을 청하고 있다.",
    choices: [
      {
        label: "[의지 판정] 정화령과 교리 숙청을 선포해 성유물 앞에서 변형 송가의 일탈을 단호히 끊어 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "추상같은 정통의 선언이 성역 전체에 울려 퍼지자 불온한 변형 송가와 배후 선동자들이 단숨에 일소되었다. 흔들리지 않는 철혈의 신념이 수많은 감찰관과 전사들의 귀감이 되었다.",
          stats: { WP: 8, Inf: 6 },
          faith: 12,
          corruption: -10,
          align: { dogmatic: 10, humane: -3 }
        },
        fail: {
          text: "강경한 정화령이 변경 구역의 반발과 혼란을 키우며 집행 과정이 거칠어졌다. 정통 교리는 지켜 냈으나 성역 내 일부 온건파의 우려가 뒷말로 남았다.",
          stats: { WP: 3, Inf: -3 },
          faith: 5,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[교섭 판정] 구호 물자와 정통 고해사단을 파견해 절망한 변경 신도들을 자비로 바로잡는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "징벌 대신 손길을 내민 그대의 결단에 절망하던 변경 신도들이 눈물로 정통 성가를 되찾았다. 피 한 방울 흘리지 않고 이단의 싹을 잠재우자, 자비와 신앙이 공존할 수 있다는 찬사가 이어졌다.",
          stats: { Fel: 7, WP: 5, Inf: 6 },
          faith: 10,
          corruption: -8,
          align: { humane: 10 }
        },
        fail: {
          text: "온건한 교화 방침을 틈타 일부 선동자들이 자취를 감추며 강경파 사절단의 비판을 받았다. 그러나 죄 없는 다수의 목숨을 지켰다는 확신만큼은 흔들리지 않았다.",
          stats: { Inf: -3, Fel: 3 },
          faith: 4,
          align: { humane: 6 }
        }
      },
      {
        label: "행정 처분을 교구에 맡기고 대성소 침묵 속에서 순직자들의 넋과 사명을 되새긴다",
        effect: {
          text: "소란스러운 정쟁에서 한 걸음 물러나 끝없는 희생 위에 서 있는 인류 제국의 무게를 조용히 가늠했다. 내면의 잡념이 씻겨 나가며 고요하고도 강철 같은 확신이 자리 잡았다.",
          stats: { WP: 5 },
          faith: 8,
          corruption: -6,
          align: { dogmatic: 4, humane: 4 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Lexicanum: Ecclesiarchy & Imperial Cult"
  },
  {
    id: "ev_s20_fah_04",
    title: "학문과 기밀 3막 — 금지 구역 홀로-전술 기록고의 고대 도면",
    category: "삶의 초점 3막",
    once: true,
    req: {
      minAge: 20,
      anyFocus: ["lore"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["daemonic"],
      or: [
        { anySocialTiers: ["apex"] },
        { anyBodyClasses: ["transhuman", "dreadnought"] },
        { anyTags: ["magos", "fabricator_locum", "fabricator_general", "lord_inquisitor", "nav_novator", "paternoval_envoy"] }
      ]
    },
    reqLabel: "20세 이상 · 초인/최고위/기계교·심문·항법 · 삶의 초점: 학문과 기계 교리",
    weight: 30,
    text: "최고 등급 보안 인가를 통과해 지하 깊숙한 금지 구역 홀로-전술 기록고에 들어섰다. 은빛 투영기 너머로 펼쳐진 대성전 말기와 기술의 암흑기 잔존 데이터 코어에는, 대규모 성간 공성전에서 아군 피해를 획기적으로 줄일 수 있는 고대 보이드 실드 공명 전술이 암호화되어 있었다. 그러나 봉인 외피에는 아뎁투스 메카니쿠스와 이단심문소의 중복 검열 인장이 겹쳐 찍혀 있어, 이 기밀을 어떻게 다룰지가 무거운 딜레마로 다가온다.",
    choices: [
      {
        label: "[지성 판정] 고대 이진 부호와 전술 주석을 직접 해독해 안전한 실전 교범으로 전선에 보급한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "난해한 암흑기 연산 구조를 완벽히 해독해 금지된 자율 논리 없이도 운용 가능한 순수 전술 교범을 복원했다! 전선 지휘망에 보급된 새 방어 공명이 수많은 함선과 장병의 생명을 구해 냈다.",
          stats: { Int: 9, Inf: 7, WP: 4 },
          align: { humane: 8 }
        },
        fail: {
          text: "고대 코지테이터의 보안 역류 충격이 신경 접속망을 스치며 극심한 두통과 피로를 남겼다. 일부 핵심 공식을 건졌으나 완전한 보급에는 이르지 못했다.",
          wounds: -8,
          stats: { Int: 4, Inf: -3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 기계교와 심문소 합동 검열단에 원본 봉인을 인계해 정식 교리 검증을 받는다",
        req: { excludeTags: ["custodes", "grey_knight", "dreadnought", "fabricator_general", "high_lord_terra"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "치명적 지식을 눈앞에 두고도 제국의 보안 규율을 칼같이 지킨 절제에 양 기관 원로들이 깊은 경의를 표했다. 정식 검증 후 합법적 열람 특권을 얻으며 양 기관 원로들과의 신뢰를 탄탄히 다졌다.",
          stats: { WP: 7, Int: 5, Inf: 6 },
          faith: 6,
          addTags: ["inquisition_favor"],
          align: { dogmatic: 9 }
        },
        fail: {
          text: "양 기관이 원본 관할권을 두고 지루한 서류 공방을 벌이는 사이 그대의 발견 공적마저 희미해졌다. 다만 금지 구역 규율 위반 혐의만은 완벽히 피했다.",
          stats: { Inf: -4, WP: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "핵심 전술 요약만 독자 암호로 별도 보관해 위급한 순간의 전략 카드로 남긴다",
        effect: {
          text: "누구의 허락도 구하지 않은 채 가장 치명적인 통찰만을 손안에 쥐었다. 언젠가 성계의 명운이 걸린 순간, 이 비밀 기록은 그대만의 압도적인 무기가 될 것이다.",
          stats: { Int: 6, Inf: 5 },
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Dark Heresy: Core Rulebook / Lexicanum: Data-Vault"
  },
  {
    id: "ev_s20_fah_05",
    title: "권력의 정점 3막 — 성역 의회와 3대 기관의 관할권 담판",
    category: "삶의 초점 3막",
    once: true,
    req: {
      minAge: 25,
      anyFocus: ["politics"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["custodes", "grey_knight", "living_saint", "saint_vessel", "assassin"],
      anyTags: [
        "planetary_governor", "sector_lord", "high_lord_terra", "warmaster",
        "general_rank", "navy_admiral", "inquisitor", "lord_inquisitor",
        "cardinal", "canoness", "departmento_head", "arbites_marshal",
        "commissar_general", "fabricator_locum", "fabricator_general",
        "knight_high_king", "nav_novator", "paternoval_envoy",
        "chapter_master", "rt_lord_captain"
      ]
    },
    reqLabel: "25세 이상 · 정치·사령 수장 · 삶의 초점: 인맥과 출세 도모",
    weight: 32,
    text: "성역 고위 의회의 거대한 원형 회의장에 서늘한 침묵이 감돌고 있다. 인접 성계의 십일조 징수와 호위 함대 배정을 두고 아드미니스트라툼 감사단, 임페리얼 네이비 제독부, 그리고 아뎁투스 메카니쿠스 포지 대표단이 한 치도 물러서지 않으며 관할권 정면충돌을 벌이는 중이다. 협상이 결렬되면 변경 행성들의 보급 항로가 마비될 위기 속에서, 최고위 발언권을 쥔 그대의 입에 의회 전체의 시선이 쏠렸다.",
    choices: [
      {
        label: "[교섭 판정] 세 기관 공동 호위 협약을 중재해 변경 행성의 과도한 징발 부담을 덜어 준다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "압도적인 설득력과 품격으로 세 기관 대표단 전원의 만장일치 서명을 이끌어 냈다! 변경 행성들의 숨통이 트인 것은 물론 호위 함대 전력까지 두 배로 증강되며, 그대의 정치적 위상이 세그멘툼 전역에 울려 퍼졌다.",
          stats: { Fel: 10, Inf: 10, Int: 5 },
          align: { humane: 10 }
        },
        success: {
          text: "절묘한 단계적 십일조 유예와 합동 호위 조항에 세 기관이 합의했다. 변경 주민들의 희생을 줄이면서도 제국 방위선을 지켜 낸 노련한 중재로 두터운 신망을 얻었다.",
          stats: { Fel: 7, Inf: 8 },
          align: { humane: 8 }
        },
        fail: {
          text: "각 기관의 묵은 파벌 감정과 절차 이의 제기에 중재안이 누더기가 되었다. 소폭의 보급 조정만 관철한 채 회의장을 나서며 정치적 입지에 상처를 입었다.",
          stats: { Inf: -5, Fel: 2 },
          align: { humane: 5 }
        },
        critFail: {
          text: "정적 파벌이 중재 초안의 문구를 악의적으로 왜곡 유포하며 의회가 아수라장으로 변했다! 십일조 규율을 훼손했다는 맹공 속에 세 기관 대표단이 일제히 퇴장했고, 보복성 감사 통지서가 쏟아졌다.",
          stats: { Inf: -10, WP: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 숨겨 둔 비축 물자 장부와 독점 조항을 파헤쳐 협상 주도권과 이권을 장악한다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "세 기관이 수십 년간 감춰 온 비밀 비축분과 항로 독점 장부를 단숨에 폭로하며 의회를 완전히 제압했다! 숨을 죽인 대표단 모두가 총괄 조정권과 최우선 보급 이권을 그대의 휘하에 바치며 굴복했다.",
          stats: { Int: 10, Inf: 11, Fel: 4 },
          align: { ruthless: 10 }
        },
        success: {
          text: "치밀한 회계 감사 자료를 내밀어 상대 파벌들의 허를 찔렀다. 양측의 양보를 끌어내며 성역 보급선의 핵심 결정권과 막대한 영향력을 손에 쥐었다.",
          stats: { Int: 7, Inf: 8 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "상대 기관의 방첩망이 핵심 증거를 미리 빼돌려 압박이 무위로 돌아갔다. 정적 연합의 역공으로 지역 후원망 일부가 타격을 입었다.",
          stats: { Inf: -5, Int: 2 },
          align: { ruthless: 5 }
        },
        critFail: {
          text: "정적이 심어 둔 위조 부속 장부에 걸려들어 오히려 허위 고발 역풍을 정면으로 맞았다! 성역 의회의 공동 제재가 내려졌고, 퇴장 길에 의문의 습격까지 간신히 물리쳐야 했다.",
          wounds: -14,
          stats: { Inf: -10, WP: 2 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "전시 십일조 법전 원안을 집행 선포해 파벌 흥정을 단호히 일축한다",
        effect: {
          text: "타협 없는 제국 법전의 권위 앞에 소란스럽던 의회가 일순 얼어붙었다. 가혹한 징발의 대가가 따르겠지만, 적어도 전시 지휘 계통과 십일조 규율만은 흔들림 없이 세워졌다.",
          stats: { WP: 6, Inf: 5 },
          faith: 5,
          align: { dogmatic: 9 }
        }
      }
    ],
    source: "Vaults of Terra: The Carrion Throne / Lexicanum: Senatorum Imperialis & Imperial Tithe"
  },
  {
    id: "ev_s20_fah_06",
    title: "금단의 심연 3막 — 봉인된 워프 유물과 급진파의 제안",
    category: "삶의 초점 3막",
    once: true,
    req: {
      minAge: 20,
      anyFocus: ["forbidden"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["custodes", "grey_knight", "living_saint", "saint_vessel", "daemon_prince"],
      or: [
        { anyRealms: ["heretic"] },
        { anyTags: ["inquisitor", "lord_inquisitor", "magos", "fabricator_locum", "rogue_trader", "rt_lord_captain", "nav_novator", "assassin"] },
        { anySocialTiers: ["apex"] }
      ]
    },
    reqLabel: "20세 이상 · 최고위/심문·기계교·항해·이단 · 삶의 초점: 금단의 지식 탐구",
    weight: 32,
    text: "금단의 지식을 향한 탐구가 마침내 은하 최심부의 비밀 결사들에게까지 닿았다. 암호화된 비공개 접선 구역에 정체를 감춘 급진파 기술 학자가 다중 정지장 상자를 가져와 열어 보였다. 그 안에는 고대 함선 잔해에서 인양된 미지의 워프 공명 유물이 서늘한 빛을 뿜고 있었으며, 그는 이 적의 병기를 역이용할 수 있다면 어떤 전선이나 정적도 단숨에 압도할 수 있다고 속삭였다.",
    choices: [
      {
        label: "[지성 판정] 봉인된 워프 유물의 동력 행렬을 역설계해 적의 힘을 부리는 금단의 비술을 장악한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "불안정하게 맥동하는 공명 회로를 완벽히 길들여 이계의 힘을 전략 병기로 전환하는 원리를 파악했다! 상식을 뛰어넘는 통찰과 위력을 얻었으나, 영혼 깊은 곳에 지워지지 않는 심연의 그림자가 스며들었다.",
          stats: { Int: 10, WP: 6, Inf: 5 },
          corruption: 14,
          align: { ruthless: 10 }
        },
        fail: {
          text: "역설계 도중 워프 공명이 폭발하며 정신과 육체를 강하게 할퀴고 지나갔다. 간신히 정지장을 닫아 목숨은 건졌으나 깊은 내상과 지독한 오염의 잔향이 남았다.",
          wounds: -16,
          stats: { Int: 4 },
          corruption: 18,
          align: { ruthless: 6 }
        }
      },
      {
        label: "[의지 판정] 급진파 일당을 제압하고 봉인 유물을 이단 규정에 따라 즉각 소각한다",
        req: { excludeRealms: ["heretic"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "적의 무기를 빌리는 자는 결국 적의 노예가 될 뿐이다! 단호한 명령으로 급진파 일당을 제압하고 유물을 플라즈마 소각로에 처넣어 정화하자, 흔들리던 정신과 위신이 강철처럼 바로 섰다.",
          stats: { WP: 8, Inf: 6 },
          faith: 10,
          corruption: -12,
          align: { dogmatic: 10 }
        },
        fail: {
          text: "소각 직전 급진파 호위대의 저항과 유물의 마지막 워프 방출에 상처를 입었다. 제안자는 어둠 속으로 도주했으나 위험한 유물만큼은 끝내 파괴해 냈다.",
          wounds: -14,
          stats: { WP: 4 },
          faith: 5,
          corruption: -4,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[의지 판정] 제안자를 제압하고 워프 유물의 핵을 온전히 삼켜 어둠의 권능으로 벼려 낸다",
        req: { anyRealms: ["heretic"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "나약한 중개자의 손을 부수고 정지장 속 이계의 핵을 직접 장악했다! 폭풍처럼 밀려드는 워프의 에너지를 의지로 억눌러 종속시키며 어둠의 패권을 한층 더 굳혔다.",
          stats: { WP: 8, Int: 6, Inf: 7 },
          corruption: 12,
          align: { ruthless: 10 }
        },
        fail: {
          text: "유물의 폭주하는 공명을 억누르는 과정에서 거센 반발을 맞아 깊은 상처를 입었다. 제안자를 처리하고 잔해를 거두었으나 몸을 추스르는 데 적지 않은 대가가 따랐다.",
          wounds: -16,
          stats: { WP: 4 },
          corruption: 10,
          align: { ruthless: 6 }
        }
      },
      {
        label: "봉인 유물을 다중 정지장에 영구 격리하고 위험한 거래를 단호히 물리친다",
        effect: {
          text: "감당할 수 없는 심연의 힘은 승리가 아니라 파멸의 미끼일 뿐이다. 차가운 이성으로 정지장 봉인을 잠그고 위험한 거래에서 한 발 물러섰다.",
          stats: { WP: 5, Int: 4 },
          corruption: -4
        }
      }
    ],
    source: "Dark Heresy: The Radical's Handbook / Eisenhorn: Malleus"
  },
  {
    id: "ev_s20_fah_07",
    title: "M41 성계 시노드의 심판 — 진위 불명 성유물과 변경 교구의 신앙",
    category: "성향",
    once: true,
    alignBias: "dogmatic",
    req: {
      minAge: 22,
      minYear: 130,
      maxYear: 998,
      minSocialTier: "elite",
      excludeRealms: ["heretic", "mechanicus"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: ["assassin", "grey_knight", "custodes", "daemon_prince"]
    },
    reqLabel: "22세 이상 · 귀족·고위 계급 이상 · M41 (130~998.M41) · 교조 성향 우대",
    weight: 30,
    text: "제41천년기의 끝없는 변경 전란으로 피폐해진 인접 교구에서 성계 시노드를 뒤흔드는 교리 분쟁이 터졌다. 현지 주민들이 폐허 아래서 발굴한 은빛 성유물함을 고대 순교자의 성골이라 믿고 모여들며 무너지던 방어선과 민심이 기적처럼 결집한 것이다. 그러나 시노드 검증단은 이 성유물함에 정통 성별 인장이 없으며 기만이나 은밀한 워프 미끼일 수 있다고 경고하며, 즉각적인 소각 정화인지 조건부 보존인지에 대한 그대의 최종 판정을 청했다.",
    choices: [
      {
        label: "[의지 판정] 진위 불명 성유물을 즉각 소각하고 변경 교구의 무인가 숭배를 엄정히 숙청한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "거짓된 위안보다 순수한 정통이 만 배 무겁다. 그대의 단호한 선고 아래 출처 불명의 성유물함이 성화로 정화되었고, 시노드 원로원과 제국 감찰단 모두가 흔들림 없는 교조의 기강에 경의를 표했다.",
          stats: { WP: 7, Inf: 6 },
          faith: 8,
          corruption: -6,
          align: { dogmatic: 10, humane: -4 }
        },
        fail: {
          text: "성유물을 빼앗긴 변경 신도들의 거센 반발과 항의가 빗발치며 숙청 집행이 거칠어졌다. 정통 교리는 지켜 냈으나 성계 교구 곳곳에 쓰라린 원성이 남았다.",
          stats: { WP: 3, Inf: -3 },
          faith: 4,
          align: { dogmatic: 7, humane: -3 }
        }
      },
      {
        label: "[지성 판정] 성유물의 오염 여부만 정밀 검증한 뒤 변경 신도들의 위안을 위해 한시 봉안을 허가한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정밀 조사 끝에 성유물함에 워프 오염이나 악의적 기만이 없음을 입증하고, 정통 교리 감독 아래 한시적 참배를 허가했다. 전란에 지친 변경 신도들의 희망을 지켜 낸 자비로운 판단에 깊은 찬사가 이어졌다.",
          stats: { Int: 7, Fel: 5, Inf: 4 },
          faith: 5,
          align: { humane: 8, dogmatic: -3 }
        },
        fail: {
          text: "검증 기록이 보수파 시노드 원로들의 기준을 넘지 못해 봉안안은 기각되었고, 그대의 온건한 태도에 날 선 비판이 쏟아졌다. 그래도 무고한 신도들에 대한 강경 처벌만은 막아 냈다.",
          stats: { Int: 3, Inf: -4 },
          align: { humane: 5, dogmatic: -2 }
        }
      },
      {
        label: "진위 검증을 보류하는 대가로 순례 십일조와 성지 통행 이권을 은밀히 독점한다",
        req: { excludeTags: ["living_saint", "saint_vessel"] },
        effect: {
          text: "성유물의 진짜 출처보다 중요한 것은 그 앞에 쏟아지는 순례자들의 헌금과 충성이다. 검증 절차를 교묘히 늦추는 사이 변경 교구의 통행세와 십일조 이권이 조용히 그대의 영향력 아래 모였다.",
          stats: { Fel: 3, Inf: 6 },
          align: { ruthless: 8, dogmatic: -4 }
        }
      },
      {
        label: "성유물을 시노드 정식 봉인고로 이송해 검증 완료까지 공개 참배만 엄격히 중단시킨다",
        effect: {
          text: "성급한 파괴도, 방종한 묵인도 택하지 않았다. 정식 봉인 절차에 따라 성유물을 이송하고 교구의 질서를 차분히 수습하며 원칙과 냉정함 사이의 균형을 지켰다.",
          stats: { WP: 4, Int: 3 },
          faith: 4,
          align: { dogmatic: 6, humane: 2 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy & Synod / Dark Heresy: Blood of Martyrs"
  },
  {
    id: "ev_s20_fah_08",
    title: "M41 격리 항구의 난민선단 — 검역 봉쇄와 인도적 구호",
    category: "성향",
    once: true,
    alignBias: "humane",
    req: {
      minAge: 22,
      minYear: 130,
      maxYear: 998,
      minSocialTier: "elite",
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: ["assassin", "grey_knight", "custodes", "daemon_prince"]
    },
    reqLabel: "22세 이상 · 귀족·고위 계급 이상 · M41 (130~998.M41) · 자비 성향 우대",
    weight: 32,
    text: "제41천년기 격동기 전선에서 가까스로 탈출한 대규모 민간 난민 수송선단이 궤도 검역 항구 외곽에 닻을 내렸다. 수개월간 과밀 항해를 버텨 낸 선단 내부에서 정체불명의 보이드 열병이 돌고 있으며, 패주 인파 속에 적의 파괴 공작원이나 이단 교도들이 섞여 들었을지 모른다는 경보가 울렸다. 항구 방어 사령부가 궤도 포대의 조준을 맞추며 즉각 봉쇄와 격침을 주장하는 가운데, 수만 피난민의 생사가 걸린 최종 결정이 그대 앞에 놓였다.",
    choices: [
      {
        label: "[지성 판정] 궤도 포격을 멈추고 다단계 정밀 검역선과 야전 의무대로 난민들을 안전히 수용한다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "완벽한 구획 격리와 신속한 병인 분류로 보이드 열병의 확산을 몇 시간 만에 차단하고, 잠입해 있던 적 공작원 세포 둘까지 상륙 전에 깨끗이 색출해 냈다! 수만 제국 시민을 구해 낸 자비와 지성의 쾌거가 성계 전역의 전설이 되었다.",
          stats: { Int: 10, Fel: 8, Inf: 8 },
          faith: 8,
          align: { humane: 12, dogmatic: 3 }
        },
        success: {
          text: "치밀한 검역 절차를 진두지휘해 전염 구획을 분리하고 건강한 난민들을 질서 있게 하선시켰다. 공포에 휩싸였던 항구가 안정을 되찾으며 수많은 생명이 새 내일을 맞았다.",
          stats: { Int: 7, Fel: 5, Inf: 5 },
          faith: 4,
          align: { humane: 9 }
        },
        fail: {
          text: "검역 통제선에서 공황에 빠진 인파가 밀려들며 혼란을 수습하다 상처를 입었다. 예상보다 큰 비용을 치렀으나 끝내 대규모 감염 없이 구호 수용을 마쳤다.",
          wounds: -12,
          stats: { Int: 3, T: 2 },
          align: { humane: 6 }
        },
        critFail: {
          text: "검역 도중 선창에 숨어 있던 파괴 공작원이 격벽 밀봉 장치를 폭파해 유독 선저 증기가 검역실 전체로 번졌다! 긴급 진압 끝에 확산을 막았으나 심각한 부상과 함께 성역 사령부의 공식 감사 보고서가 상부에 올라갔다.",
          wounds: -20,
          stats: { Inf: -5, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[교섭 판정] 방어 사령부와 교단 감찰단을 설득해 정화 심사와 단계적 구호 타협안을 도출한다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "단호하면서도 인간적인 호소가 냉혹하던 함대 장교들과 교단 감찰단의 마음을 움직였다! 사상 유례없는 합동 구호 헌장이 체결되어 단 한 척의 수송선도 버려지지 않고 안전히 검역을 마쳤다.",
          stats: { Fel: 10, Inf: 9, WP: 5 },
          faith: 6,
          align: { humane: 11 }
        },
        success: {
          text: "강경파와 구호파 사이의 날 선 대립을 중재해 단계적 심사와 의약품 보급안을 통과시켰다. 대다수의 무고한 난민들이 차가운 우주 공간에 버려지지 않고 목숨을 건졌다.",
          stats: { Fel: 6, Inf: 6 },
          align: { humane: 8 }
        },
        fail: {
          text: "강경파 지휘관들이 협상을 조기에 끊어 버리며 극소수 수송선만 하선 허가를 받았다. 최선을 다한 탄원이었으나 궤도 너머로 밀려나는 선단을 지켜보며 쓰라린 무력감이 남았다.",
          stats: { Inf: -3, Fel: 2 },
          align: { humane: 5 }
        },
        critFail: {
          text: "격렬한 언쟁 끝에 항구 회의가 완전히 결렬되었고, 보안 절차 지연 사유가 담긴 성역 사령부의 공식 감사 보고서가 상부에 올라갔다! 항구의 혼란 속에서 그대의 중재 권위도 큰 타격을 입었다.",
          stats: { Inf: -8, Fel: -2, WP: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "항구를 완전 봉쇄하고 검역 위반 선박의 격침을 지지해 역병과 이단 유입을 원천 차단한다",
        effect: {
          text: "냉혹한 제국의 생존 논리에 따라 궤도 봉쇄선이 닫혔다. 행성의 안전과 방역 규율은 완벽히 보전되었으나, 궤도 저편에서 꺼져 가는 통신 신호가 서늘한 여운을 남겼다.",
          stats: { WP: 6, Inf: 5 },
          faith: 6,
          align: { dogmatic: 10, humane: -6 }
        }
      },
      {
        label: "생존자 전원의 무상 군수 노역 징발을 조건으로 상륙을 허가해 항구의 인력과 이익을 독점한다",
        req: { excludeTags: ["living_saint", "saint_vessel"] },
        effect: {
          text: "갈 곳 없는 난민들에게 자비 대신 가혹한 노역 계약서를 내밀었다. 목숨은 붙여 주었으나 항구 작업장과 탄약고에 막대한 무상 노동력이 채워지며 그대의 영향력과 부가 급증했다.",
          stats: { Inf: 7, Int: 3 },
          align: { ruthless: 9, humane: -6 }
        }
      }
    ],
    source: "Lexicanum: Imperial Navy & Quarantine World / Imperium Maledictum"
  }
];
