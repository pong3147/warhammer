// 분기 사건 — 유년기 인연 · 직군별 동료 · 네임드 교차 연작 (12종)
export default [
  {
    id: "ev_bond_childhood_pact",
    title: "폐허의 약속 — 유년기 소꿉친구",
    category: "인연 발단",
    once: true,
    req: {
      minAge: 7,
      maxAge: 13,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "military", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["bond_childhood_friend", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "heretic", "chaos_aligned"]
    },
    reqLabel: "유년기(7~13세) · 평민 이하 · 크리그·야만 행성·폐쇄 기관 제외",
    weight: 30,
    text: "배급소가 무너지거나 정전이 닥치던 어두운 날, 또래 아이 하나가 젖은 빵 절반을 내밀며 손을 잡았다. 제국의 거대한 톱니바퀴 아래에서 언제 흩어질지 모르는 처지였지만, 서로의 이름만은 잊지 말자고 맹세했다.",
    choices: [
      {
        label: "[교섭 판정] 작은 금속 인식표 반쪽을 나누어 가지며 언젠가 살아남아 다시 만나자고 약속한다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "손에 쥔 낡은 금속 조각이 차가웠으나 마음만은 든든했다. 훗날 어떤 신분이 되더라도 이 인연은 쉽게 끊어지지 않을 것이다.",
          stats: { Fel: 4, WP: 3 },
          addTags: ["bond_childhood_friend"],
          align: { humane: 6 }
        },
        fail: {
          text: "서둘러 각자의 거주 구역으로 흩어졌지만, 마지막에 주고받은 눈빛과 이름만은 또렷이 남았다.",
          stats: { WP: 2 },
          addTags: ["bond_childhood_friend"],
          align: { humane: 4 }
        }
      },
      {
        label: "감상에 젖을 여유가 없다며 혼자 살 길을 찾아 조용히 돌아선다",
        effect: {
          text: "제국에서 정을 나누는 것은 약점일 뿐이라 다짐하며 냉정하게 발걸음을 돌렸다.",
          stats: { WP: 3, Int: 2 },
          align: { ruthless: 4 }
        }
      }
    ],
    source: "Warhammer Crime / Necromunda Underhive Lore"
  },
  {
    id: "ev_bond_guard_squad",
    title: "참호의 혈맹 — 분대 전우와의 결속",
    category: "직군 동료",
    once: true,
    req: {
      minAge: 16,
      anyCareers: ["astra_militarum", "militarum_sergeant", "pdf_trooper", "tempestus_scion"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["bond_guard_comrade", "heretic", "chaos_aligned", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "daemon_prince"]
    },
    reqLabel: "밀리타룸·방위군·사이온 · 16세+ · 크리그·야만 행성 제외",
    weight: 32,
    text: "포격으로 무너진 방벽 아래에서 탄약과 붕대가 바닥났을 때, 옆 참호의 동료 병사가 자신의 마지막 라스건 전지팩을 던져 주며 등을 맞댔다. 포연이 걷힌 뒤에도 그 전우와는 눈빛만으로도 호흡이 통하는 사이가 되었다.",
    choices: [
      {
        label: "[의지 판정] 함께 수통을 나누며 어떤 전선에서도 서로를 버리지 않겠다고 맹세한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "피와 흙먼지 속에서 맺은 전우애가 뼈에 새겨졌다. 이제 전선의 공포 앞에서도 혼자가 아니다.",
          stats: { WP: 5, Fel: 4, T: 2 },
          addTags: ["bond_guard_comrade"],
          align: { humane: 5 }
        },
        fail: {
          text: "거친 농담으로 긴장을 풀며 서로의 군번줄을 확인했다. 완벽하진 않아도 믿을 수 있는 전우를 얻었다.",
          stats: { WP: 3, T: 2 },
          addTags: ["bond_guard_comrade"]
        }
      },
      {
        label: "병사의 본분일 뿐이라며 규율에 따라 각자의 위치로 복귀한다",
        effect: {
          text: "개인적 유대보다 부대 규율을 앞세우며 냉정히 초소로 돌아갔다.",
          stats: { WP: 2, Inf: 2 },
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Only War / Gaunt's Ghosts"
  },
  {
    id: "ev_bond_astartes_brother",
    title: "무구의 서약 — 배틀 브라더",
    category: "챕터 동료",
    once: true,
    req: {
      minAge: 16,
      anyTags: ["battle_brother", "grey_knight"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["bond_battle_brother", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "living_saint"]
    },
    reqLabel: "아스타르테스 배틀 브라더 · 그레이 나이트 · 드레드노트 제외",
    weight: 34,
    text: "네오파이트 시련과 수차례의 궤도 강습을 함께 돌파한 전투 형제 하나가 전투 후 갑주 정비를 도우며 챕터의 맹세를 읊었다. 수백 년을 이어 갈 전장의 짐을 나눌 진정한 배틀 브라더가 곁에 섰다.",
    choices: [
      {
        label: "[백병 판정] 대련장에서 합을 겨루며 서로의 빈틈을 메워 줄 전우의 맹세를 올린다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "연습용 무구가 부딪히는 굉음 끝에 완벽한 신뢰가 섰다. 어떤 적의 포위망도 두 형제를 갈라놓지 못할 것이다.",
          stats: { WS: 5, WP: 4, T: 3 },
          addTags: ["bond_battle_brother"],
          align: { dogmatic: 4 }
        },
        fail: {
          text: "치열한 대련 끝에 어깨를 맞부딪치며 서로의 기량을 인정했다.",
          stats: { WS: 3, WP: 2 },
          addTags: ["bond_battle_brother"]
        }
      },
      {
        label: "형제애 역시 챕터 교리 안의 의무일 뿐이라며 묵묵히 홀로 무구를 닦는다",
        effect: {
          text: "고독한 전사의 길을 택하고 전투 교리 암송에 집중했다.",
          stats: { WP: 4 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Space Marines / Deathwatch"
  },
  {
    id: "ev_bond_ordo_sanctum",
    title: "금서고와 성소 — 심문·성직의 동반자",
    category: "직군 동료",
    once: true,
    req: {
      minAge: 16,
      anyTrees: ["inquisition", "sororitas", "ecclesiarchy", "arbites"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["bond_ordo_partner", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    reqLabel: "이단심문소·소로리타스·국교·아르비테스 · 16세+ · 크리그·야만 행성·하이 로드 제외",
    weight: 32,
    text: "이단의 흔적을 쫓던 지하 성소와 법정 회랑에서 뜻이 통하는 동료를 만났다. 서로를 감시하고 의심하는 제국 기관 속에서, 믿고 등을 맡길 수 있는 단 한 명의 동반자가 생겼다.",
    choices: [
      {
        label: "[지성 판정] 비밀 암호와 공조 서약을 정하고 함께 이단의 뿌리를 추적하기로 한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "빈틈없는 공조 체계를 세워 수많은 비밀 문서를 함께 해독해 냈다.",
          stats: { Int: 5, WP: 4, Inf: 3 },
          addTags: ["bond_ordo_partner"],
          align: { dogmatic: 4 }
        },
        fail: {
          text: "서툰 시작이었으나 위기 속에서 서로를 엄호하며 깊은 신뢰를 쌓았다.",
          stats: { WP: 3, Fel: 2 },
          addTags: ["bond_ordo_partner"]
        }
      },
      {
        label: "심문과 신앙의 길에는 어떠한 사적 신뢰도 허락되지 않는다며 거리를 둔다",
        effect: {
          text: "모든 동료를 잠재적 용의자로 대하는 제국 관료의 냉철함을 지켰다.",
          stats: { WP: 3, Int: 2 },
          align: { ruthless: 4 }
        }
      }
    ],
    source: "Dark Heresy / Adepta Sororitas Lore"
  },
  {
    id: "ev_bond_void_forge",
    title: "성간 항로와 대장간 — 공허의 동반자",
    category: "직군 동료",
    once: true,
    req: {
      minAge: 16,
      anyTrees: ["navy", "rogue_trader", "mechanicus", "navis_navigator"],
      anyRealms: ["void", "mechanicus"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["bond_void_companion", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"]
    },
    reqLabel: "해군·로그 트레이더·기계교·항법사(공허·기계교) · 16세+ · 크리그·야만 행성·하이 로드 제외",
    weight: 32,
    text: "끝없는 워프 항해와 포지 월드의 굉음 속에서 겔러 필드 정비와 방대한 항해·물류 장부를 함께 책임지던 동료 한 명과 깊은 유대를 맺었다. 거대한 함선과 포지 성소 속에서 서로의 생존을 보증하는 든든한 동반자다.",
    choices: [
      {
        label: "[교섭 판정] 비상 시 서로의 관할 구역과 인맥을 열어 주기로 묵계를 맺는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "두 사람의 공조 덕분에 함선과 성소의 복잡한 난제들이 일사천리로 풀리기 시작했다.",
          stats: { Fel: 4, Int: 4, Inf: 3 },
          addTags: ["bond_void_companion"]
        },
        fail: {
          text: "겉으로 드러내지 않았지만 위급할 때 믿고 부를 수 있는 이름을 하나 얻었다.",
          stats: { Int: 3 },
          addTags: ["bond_void_companion"]
        }
      },
      {
        label: "규정과 의전 외의 사적 결탁은 거부한다",
        effect: {
          text: "기계와 항해 규정의 원칙만을 따르며 독자적인 업무를 이어 갔다.",
          stats: { Int: 3 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Rogue Trader / Battlefleet Gothic"
  },
  {
    id: "ev_bond_underhive_pact",
    title: "지하의 혈맹 — 어둠 속의 공범",
    category: "암흑 동료",
    once: true,
    req: {
      minAge: 16,
      or: [
        { anyCareers: ["chaos_cultist", "chaos_champion"] },
        { anyCareers: ["underhive_ganger", "underhive_boss", "hive_crime_lord"], minCorruption: 15 }
      ],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["bond_heretic_pact", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought"]
    },
    reqLabel: "카오스 컬티스트·챔피언 또는 오염 15+ 언더하이브 갱단 · 16세+ · 초인·야만 행성·크리그 제외",
    weight: 32,
    text: "집행대의 단속과 경쟁 파벌의 습격 속에서 등을 맞대고 살아남은 공범 하나가 피로 맺은 맹세를 제안했다. 언더하이브와 워프의 어둠 속에서 언제 등을 찌를지 모르지만, 당장은 둘이 손을 잡아야 더 크게 살아남는다.",
    choices: [
      {
        label: "[민첩 판정] 은밀한 접선 암호를 정하고 전리품과 비밀을 나누는 혈맹을 맺는다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "집행대의 포위망을 뚫고 완벽한 공범 관계를 구축했다. 지하 세계의 지분이 빠르게 불어났다.",
          stats: { Ag: 4, Inf: 5, Fel: 3 },
          addTags: ["bond_heretic_pact"],
          align: { ruthless: 5 }
        },
        fail: {
          text: "경계심을 늦추지 않은 채 위태로운 동맹을 시작했다.",
          stats: { WP: 2, Inf: 3 },
          addTags: ["bond_heretic_pact"],
          align: { ruthless: 4 }
        }
      },
      {
        label: "뒷세계에 믿을 놈은 없다며 거래만 끝내고 자취를 감춘다",
        effect: {
          text: "홀로 움직이며 누구에게도 약점을 잡히지 않기로 했다.",
          stats: { WP: 3 },
          align: { ruthless: 3 }
        }
      }
    ],
    source: "Necromunda / Black Crusade"
  },
  {
    id: "ev_bond_childhood_reunion",
    title: "세월을 건넌 재회 — 옛 소꿉친구의 현재",
    category: "인연 회수",
    once: true,
    req: {
      minAge: 20,
      allTags: ["bond_childhood_friend"],
      maxCareerTier: 4,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "high_lord_terra", "assassin"]
    },
    reqLabel: "유년기 소꿉친구 보유 · 20세+ · 크리그·야만 행성·초인·최고위 제외",
    weight: 38,
    text: "긴 세월이 흐른 뒤, 임무 중에 마주친 낯익은 얼굴이 품에서 반쪽짜리 금속 인식표를 꺼내 보였다. 어릴 적 폐허에서 빵을 나누던 소꿉친구였다! 하지만 상대는 지금 제국의 수배령이 떨어진 지하 밀수꾼 신세이며, 숨겨 달라고 애원하고 있다.",
    choices: [
      {
        label: "[교섭 판정] 옛 정을 외면하지 않고 신분을 세탁해 안전 구역으로 빼돌려 준다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "들키지 않고 완벽하게 탈출로를 열어 주었다! 며칠 뒤 옛 친구가 몰래 남긴 귀한 정보와 감사의 서신이 도착해 큰 도움이 되었다.",
          stats: { Fel: 6, Inf: 5 },
          removeTags: ["bond_childhood_friend"],
          addTags: ["bond_oath_fulfilled"],
          align: { humane: 8 }
        },
        success: {
          text: "위험을 무릅쓰고 옛 친구를 무사히 피신시켰다. 세월이 흘러도 인간다움을 잃지 않았다는 안도감이 남았다.",
          stats: { Fel: 4, WP: 3 },
          removeTags: ["bond_childhood_friend"],
          addTags: ["bond_oath_fulfilled"],
          align: { humane: 6 }
        },
        fail: {
          text: "도주를 도운 정황이 상부의 의심을 사 거액의 벌금과 감봉 처분을 떠안았다.",
          stats: { Inf: -4 },
          removeTags: ["bond_childhood_friend"],
          addTags: ["imperial_debt"],
          align: { humane: 5 }
        }
      },
      {
        label: "제국의 법과 임무가 우선이라며 냉정히 상대를 구속해 상부에 넘긴다",
        effect: {
          text: "인식표를 땅에 떨어뜨린 채 체포되는 옛 친구의 뒷모습을 외면하고 공적을 보고했다.",
          stats: { Inf: 5, WP: 3 },
          removeTags: ["bond_childhood_friend"],
          align: { dogmatic: 6, ruthless: 4 }
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_bond_comrade_sacrifice",
    title: "등 뒤의 방패 — 전우의 희생과 유품",
    category: "인연 시련",
    once: true,
    req: {
      minAge: 24,
      anyTags: ["bond_guard_comrade", "bond_battle_brother", "bond_ordo_partner", "bond_void_companion"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["bond_fallen_comrade", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "living_saint"]
    },
    reqLabel: "직군 동료 보유 · 24세+ · 크리그·야만 행성·드레드노트·이단 제외",
    weight: 36,
    text: "적의 기습과 집중 포화가 쏟아진 절체절명의 순간, 오래도록 곁을 지켜 온 전우가 날아오는 치명타를 온몸으로 막아 내며 쓰러졌다! 피투성이가 된 동료가 마지막 숨을 몰아쉬며 자신의 유품을 손에 쥐여 주려 한다.",
    choices: [
      {
        label: "[강인 판정] 포화를 뚫고 동료를 끝까지 끌어내 의무대와 수송선까지 사수한다",
        check: { stat: "T", diff: -10 },
        critSuccess: {
          text: "기적적으로 적탄을 버텨 내며 동료와 함께 생환했다! 죽음의 문턱을 나란히 넘은 두 사람의 유대는 전설이 되었다.",
          wounds: -8,
          stats: { T: 6, WP: 6, Inf: 5 },
          addTags: ["bond_oath_fulfilled", "iron_nerves"],
          align: { humane: 8 }
        },
        success: {
          text: "치명상을 막아 내진 못했으나 안전한 곳으로 옮겨 마지막 가는 길을 지켰다. 전우는 고맙다는 말과 함께 유품을 남겼다.",
          wounds: -10,
          stats: { WP: 5, T: 3 },
          addTags: ["bond_fallen_comrade"],
          align: { humane: 6 }
        },
        fail: {
          text: "포화에 휩쓸려 함께 쓰러졌다가 겨우 정신을 차렸을 때, 동료는 이미 싸늘하게 식은 채 유품만 손에 쥐여 있었다.",
          wounds: -18,
          stats: { WP: 3 },
          addTags: ["bond_fallen_comrade"]
        }
      },
      {
        label: "전우의 희생을 헛되이 하지 않기 위해 유품을 품고 지휘선으로 복귀한다",
        effect: {
          text: "비통함을 억누른 채 동료의 유품을 가슴에 품고 남은 병력을 수습해 임무를 완수했다.",
          stats: { WP: 3 },
          addTags: ["bond_fallen_comrade"],
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Only War / Codex: Astra Militarum"
  },
  {
    id: "ev_bond_named_gaunt_comrade",
    title: "전우를 구한 항명 — 이브람 건트 앞의 재판",
    category: "네임드 교차",
    once: true,
    req: {
      minAge: 20,
      minYear: 765,
      maxYear: 799,
      anySegmenta: ["pacificus"],
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "tempestus_scion"],
      allTags: ["bond_guard_comrade"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["met_gaunt", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint"]
    },
    reqLabel: "전선 분대 전우 보유 · 밀리타룸·방위군·사이온 · 세그멘툼 파시피쿠스 · 20세+ · 765~799.M41 · 크리그·야만 행성 제외",
    weight: 38,
    characters: ["gaunt"],
    text: "전선이 무너지는 와중에 명령을 어기고 고립된 분대 전우를 구출해 복귀했다. 군법회의의 서슬 퍼런 시선 속에서, 타니스 퍼스트 앤드 온리의 이브람 건트 대령-커미사르가 직접 그대와 전우 앞에 걸음을 멈췄다.",
    choices: [
      {
        label: "[교섭 판정] 전우를 버리는 부대는 결코 승리할 수 없다며 당당히 소신을 밝힌다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "건트는 잠시 침묵하더니 '병사를 아끼지 않는 지휘관은 검을 쥘 자격이 없다'며 훈계를 명예 표창으로 바꿨다!",
          stats: { Fel: 6, WP: 5, Inf: 7 },
          addTags: ["met_gaunt", "bond_oath_fulfilled"],
          align: { humane: 7 }
        },
        fail: {
          text: "건트는 규율 위반을 엄중히 꾸짖으며 경징계를 내렸으나, 사적으로 전우의 생존을 다행으로 여기는 눈빛을 남겼다.",
          wounds: -6,
          stats: { WP: 4 },
          addTags: ["met_gaunt"]
        }
      },
      {
        label: "어떤 처벌이든 달게 받겠다며 묵묵히 차렷 자세를 유지한다",
        effect: {
          text: "건트는 군율에 따른 가벼운 노역을 명하면서도, 전우애를 지킨 두 병사의 이름을 기억해 두었다.",
          stats: { WP: 4, Inf: 3 },
          addTags: ["met_gaunt"],
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Gaunt's Ghosts (Dan Abnett)"
  },
  {
    id: "ev_bond_named_dante_brother",
    title: "황금빛 방어선 — 단테와 배틀 브라더",
    category: "네임드 교차",
    once: true,
    req: {
      minAge: 30,
      allTags: ["bond_battle_brother"],
      excludeWorlds: ["terra", "mars"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["met_dante", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "grey_knight", "dreadnought", "custodes", "living_saint"]
    },
    reqLabel: "배틀 브라더 보유 · 아스타르테스 · 30세+ · 테라·화성·그레이 나이트·드레드노트 제외",
    weight: 38,
    characters: ["dante"],
    text: "끝없는 적의 물결 속에서 탄약이 말라 가던 최후의 방어선, 천 년 가까이 싸워 온 블러드 엔젤 챕터 마스터 단테의 황금빛 갑주가 전장 위에서 강하했다. 단테가 이끄는 반격의 창끝에서, 오랜 배틀 브라더와 함께 돌격할 때가 왔다.",
    choices: [
      {
        label: "[백병 판정] 배틀 브라더와 측면 호흡을 맞춰 단테의 돌파로를 열어젖힌다",
        check: { stat: "WS", diff: -8 },
        success: {
          text: "두 형제의 완벽한 연격이 적 지휘관을 베어 넘기며 돌파구를 열었다! 단테가 황금 데스마스크 너머로 고개를 끄덕이며 치하했다.",
          stats: { WS: 6, WP: 5, Inf: 8 },
          addTags: ["met_dante", "bond_oath_fulfilled"],
          align: { dogmatic: 6 }
        },
        fail: {
          text: "치열한 난전 속에서 부상을 입었으나, 단테와 배틀 브라더의 엄호 아래 끝까지 방어선을 지켜 냈다.",
          wounds: -12,
          stats: { T: 4, WP: 3 },
          addTags: ["met_dante"]
        }
      },
      {
        label: "후위 보급선과 부상당한 형제들을 지키는 임무를 자처한다",
        effect: {
          text: "전방의 영광 대신 후방 형제들을 지켜 내며 단테의 진격이 무너지지 않게 받쳐 주었다.",
          stats: { WP: 4, T: 3 },
          addTags: ["met_dante"],
          align: { humane: 5 }
        }
      }
    ],
    source: "Dante / The Devastation of Baal"
  },
  {
    id: "ev_bond_heretic_betrayal",
    title: "피의 대가 — 공범의 배신",
    category: "암흑 시련",
    once: true,
    req: {
      minAge: 22,
      allTags: ["bond_heretic_pact"],
      or: [
        { anyRealms: ["heretic"] },
        { minCorruption: 10 }
      ],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought"]
    },
    reqLabel: "배교 혈맹 동료 보유 · 22세+ · 이단 영역 또는 오염 10+ · 초인·야만 행성·크리그 제외",
    weight: 36,
    text: "함께 금단의 어둠을 공유하던 혈맹 동료가 제국 심문대의 포위망과 지하 파벌의 권력 다툼에 몰리자, 모든 배교와 밀거래의 죄를 그대에게 뒤집어씌우고 달아나려 한다. 선수를 쳐서 입을 막지 않으면 파멸이 닥친다.",
    choices: [
      {
        label: "[권위 판정] 조직의 은밀한 세력을 동원해 배신자를 먼저 숙청하고 이득을 독차지한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "배신자가 혀를 놀리기 전에 완벽히 침묵시켰다. 오히려 배신자의 자산까지 흡수해 세력이 커졌다.",
          stats: { Inf: 6, Ag: 3 },
          removeTags: ["bond_heretic_pact"],
          addTags: ["notorious_ruthless"],
          align: { ruthless: 8 }
        },
        fail: {
          text: "교전 끝에 배신자를 물리쳤으나 그 과정에서 깊은 상처와 악명을 떠안았다.",
          wounds: -16,
          removeTags: ["bond_heretic_pact"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "정면 대결을 피하고 흔적을 지운 채 다른 구역으로 잠적한다",
        effect: {
          text: "모든 거처를 버리고 몸을 숨겨 당장의 위기를 비껴갔다.",
          stats: { Ag: 3, Inf: -3 },
          removeTags: ["bond_heretic_pact"]
        }
      }
    ],
    source: "Necromunda / Dark Heresy"
  },
  {
    id: "ev_bond_legacy_keepsake",
    title: "남겨진 이름 — 세월 너머의 전우애",
    category: "노년 회고",
    once: true,
    req: {
      minAge: 42,
      anyTags: ["bond_fallen_comrade", "bond_oath_fulfilled"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "living_saint"]
    },
    reqLabel: "전우의 유품·지켜 낸 전우애 보유 · 필멸자 · 42세+ · 크리그·야만 행성·초인·이단 제외",
    weight: 36,
    text: "수많은 전장과 세월을 건너온 지금, 빛바랜 전우의 유품과 오래전 나눈 맹세를 다시 꺼내 보았다. 이제 막 전선과 성소에 발을 들인 젊은 후배가 그 유품에 담긴 사연을 조심스레 물어온다.",
    choices: [
      {
        label: "[의지 판정] 옛 전우의 이름을 들려주며 두려움에 떨던 마음의 짐을 비로소 내려놓는다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "오랜 세월 가슴을 짓누르던 죄책감과 트라우마가 맑게 가라앉았다. 살아남은 자의 몫을 다했다는 평온이 찾아왔다.",
          stats: { WP: 5, Fel: 4, Inf: 4 },
          faith: 6,
          removeTags: ["shell_shocked"],
          align: { humane: 7 }
        },
        fail: {
          text: "목이 메어 긴 이야기를 잇지 못했으나, 후배의 고개 끄덕임 속에서 작게나마 위로를 얻었다.",
          stats: { WP: 3, Fel: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "유품을 다음 세대의 젊은이에게 물려주고 조용히 자리에서 일어난다",
        effect: {
          text: "이름 없는 전우의 맹세는 이제 젊은 세대의 손에서 계속 이어질 것이다.",
          stats: { Inf: 4, Fel: 3 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Gaunt's Ghosts / Only War"
  }
];
