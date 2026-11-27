// 생애 주기: 유년기 · 스콜라 · 청년기 첫 사회화 사건
export default [
  {
    id: "ev_schola_scout",
    title: "스콜라 프로제니움의 검은 마차",
    category: "성장",
    once: true,
    req: {
      minAge: 8,
      maxAge: 14,
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeWorldTags: ["feral", "krieg", "voidborn"],
      excludeTags: [
        "schola", "noble", "rogue_trader_blood", "navigator", "terra_elite", "knight_blood",
        "astartes", "grey_knight", "custodes", "dreadnought", "abhuman",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [{ stats: { WP: 34 } }, { stats: { Int: 34 } }, { anyTags: ["military_blood", "pious"] }]
    },
    reqLabel: "나이 8~14세 · 의지 또는 지성 34+",
    weight: 18,
    text: "아뎁투스 미니스토룸의 드릴-애벗이 그대의 또렷한 눈빛과 기개를 눈여겨보았다. 스콜라 프로제니움 편입 시험에 응시하면 커미사르, 소로리타스, 템페스투스 사이온, 심지어 이단심문관으로 가는 엘리트 관문이 열린다.",
    choices: [
      {
        label: "[의지 판정] 가혹한 교관의 시련을 견디고 스콜라에 입학한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "채찍과 기도문 암송, 실탄 훈련을 버텨 내고 정식 스콜라 프로제니움 생도가 되었다!",
          stats: { WP: 6, WS: 4, BS: 4, Int: 4, Inf: 6 },
          faith: 15,
          addTags: ["schola", "elite_track"]
        },
        fail: {
          text: "체벌과 혹독한 훈련을 견디지 못하고 탈락해 멍든 몸으로 돌아왔다. 그래도 기초 체력은 다져졌다.",
          wounds: -12,
          stats: { T: 3, WP: 2 }
        }
      },
      {
        label: "자유를 잃기 싫다. 정중히 물러나 고향에 남는다",
        effect: {
          text: "교관은 혀를 차며 떠났다. 그대는 덜 가혹하지만 덜 영광스러운 평범한 길을 택했다.",
          stats: { Ag: 2, Fel: 2 }
        }
      }
    ],
    source: "Lexicanum: Schola Progenium"
  },
  {
    id: "ev_s2_child_ration_line",
    title: "유년기 — 하이브 배급소 줄과 녹슨 공구의 유혹",
    category: "유년기",
    once: true,
    req: {
      minAge: 6,
      maxAge: 13,
      anyCareers: ["child"],
      anyWorldTags: ["hive", "industrial"],
      excludeTags: ["noble", "schola"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"]
    },
    reqLabel: "6~13세 · 일반/하층 유년기",
    weight: 34,
    text: "끝없이 늘어선 시체 전분 배급소 줄 옆으로 고장 난 기계 계수기와 버려진 공구 상자가 눈에 들어온다. 감독관이 딴청을 피우는 찰나, 어린 손끝이 어떤 길을 고르느냐에 따라 앞으로의 생존 방식이 갈릴 것이다.",
    choices: [
      {
        label: "[민첩 판정] 감독관의 시선을 피해 버려진 공구와 예비 배급표를 재빨리 챙긴다",
        check: { stat: "Ag", diff: 10 },
        success: {
          text: "들키지 않고 묵직한 공구와 이틀 치 식량을 손에 넣었다! 제국 하층에서 살아남는 약삭빠른 감각이 일찍 눈떴다.",
          stats: { Ag: 5, Int: 3 },
          addTags: ["streetwise"],
          align: { ruthless: 5 }
        },
        fail: {
          text: "경비 서비터의 경고음에 놀라 달아나다 무릎을 심하게 긁혔다. 도둑질도 요령이 필요하다는 뼈아픈 교훈을 얻었다.",
          wounds: -8,
          stats: { Ag: 2 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "[지성 판정] 삐걱거리는 배급 계수기의 태엽을 손봐 길드 견습공의 눈에 띈다",
        check: { stat: "Int", diff: 10 },
        success: {
          text: "멈춰 있던 계수기가 다시 돌아가자 길드 감독관이 감탄하며 따뜻한 식량과 함께 칭찬을 건넸다!",
          stats: { Int: 5, Fel: 3, Inf: 3 }
        },
        fail: {
          text: "태엽이 튕겨 나와 손가락을 찧고 호통을 들었으나, 기계 구조를 들여다본 경험만은 남았다.",
          wounds: -6,
          stats: { Int: 2 }
        }
      },
      {
        label: "줄을 지키며 차례를 기다려 가족과 나눌 배급 식량을 성실히 받아 든다",
        effect: {
          text: "회색 영양 죽은 텁텁했지만, 정직하게 버텨 내는 인내심이 어린 몸에 단단히 자리 잡았다.",
          stats: { T: 4, WP: 3 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Necromunda Core Rulebook"
  },
  {
    id: "ev_s2_child_blackship_sky",
    title: "유년기 — 궤도를 가로지른 검은 함선의 그림자",
    category: "유년기",
    once: true,
    req: {
      minAge: 6,
      maxAge: 13,
      anyCareers: ["child"],
      excludeWorlds: ["terra", "voidborn", "baal", "catachan", "mars", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "6~13세 · 비야만 행성 유년기",
    weight: 30,
    text: "갑자기 하늘빛이 서늘하게 가라앉더니, 구름 너머로 거대한 검은 전함들이 정박하는 그림자가 드리워졌다. 어른들은 '아뎁투스 아스트라 텔레파티카의 검은 함선이 십일조를 거두러 왔다'며 굳은 얼굴로 아퀼라 성호를 긋는다.",
    choices: [
      {
        label: "[의지 판정] 공포에 숨지 않고 성당 광장에 서서 황제 찬송가를 목청껏 따라 부른다",
        check: { stat: "WP", diff: 10 },
        success: {
          text: "어린 나이에도 흔들리지 않는 눈빛을 본 사제가 머리에 손을 얹고 축복을 내렸다! 강인한 신심이 싹텄다.",
          stats: { WP: 5 },
          faith: 10,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "궤도에서 내려오는 사이킥 억제 파동에 어지럼증을 느껴 주저앉았으나, 곧 정신을 추슬렀다.",
          wounds: -6,
          stats: { WP: 2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[지성 판정] 검은 함선의 문장과 호송 대열의 규율을 유심히 관찰하며 제국의 체계를 익힌다",
        check: { stat: "Int", diff: 10 },
        success: {
          text: "수백만 행성을 묶어 세우는 제국 기구의 냉엄한 이치를 어린 머릿속에 또렷이 새겼다.",
          stats: { Int: 5, WP: 3 }
        },
        fail: {
          text: "아르비테스 순찰대의 매서운 호통에 놀라 골목으로 뒷걸음질치다 돌부리에 넘어져 무릎을 까였다.",
          wounds: -5,
          stats: { Ag: 2 }
        }
      },
      {
        label: "어른들의 당부대로 창문을 닫고 검은 함선이 성계를 떠날 때까지 조용히 숨을 죽인다",
        effect: {
          text: "제국에서는 눈에 띄지 않는 것이 가장 안전한 처세다. 무사히 불길한 주간을 넘겼다.",
          stats: { T: 3, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: League of Blackships"
  },
  {
    id: "ev_s2_child_schola_duel",
    title: "유년기 — 스콜라 프로제니움의 교관 회초리와 기숙사 서열",
    category: "유년기",
    once: true,
    req: { minAge: 7, maxAge: 13, anyCareers: ["child"], allTags: ["schola"] },
    reqLabel: "7~13세 · 스콜라 프로제니움 생도",
    weight: 38,
    text: "스콜라 프로제니움의 차가운 석조 기숙사에서 상급 생도들이 신입 기수의 구두를 빼앗으며 복종을 강요한다. 드릴-애벗은 '약자는 황제의 엘리트 자리를 차지할 자격이 없다'며 못 본 척 팔짱을 끼고 있다.",
    choices: [
      {
        label: "[백병 판정] 훈련용 목검을 들고 상급생의 도발에 정면으로 맞서 결투를 벌인다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "코피를 터뜨리면서도 끝내 상급생을 바닥에 눕혔다! 교관이 처음으로 입꼬리를 올리며 그대의 이름을 수첩에 적었다.",
          stats: { WS: 6, WP: 4, Inf: 4 }
        },
        fail: {
          text: "체격 차이에 밀려 호되게 두들겨 맞았으나, 눈빛만은 꺾이지 않아 동기들의 존중을 얻었다.",
          wounds: -10,
          stats: { T: 3, WS: 2 }
        }
      },
      {
        label: "[의지 판정] 연대 책임 체벌을 자청해 동기들 대신 차가운 성당 돌바닥에 밤새 무릎을 꿇는다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "혹독한 추위를 눈 하나 깜짝 않고 버텨 내자 상급생들마저 혀를 내둘렀다! 타고난 지휘관의 기개가 드러났다.",
          stats: { WP: 6, Fel: 5 },
          faith: 6,
          align: { humane: 7 }
        },
        fail: {
          text: "새벽 무렵 저체온으로 쓰러져 의무실에 실려 갔으나, 의리만큼은 기숙사 전체에 각인되었다.",
          wounds: -8,
          stats: { WP: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "쓸데없는 다툼을 피하고 밤새 제국 전술 교본과 성가를 완벽히 암송해 성적으로 압도한다",
        effect: {
          text: "다음 날 구술 시험에서 단 한 글자도 틀리지 않아 교관의 호평을 받았다.",
          stats: { Int: 4, WP: 3 },
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Schola Progenium"
  },
  {
    id: "ev_s2_child_noble_tutor",
    title: "유년기 — 첨탑 저택의 가정교사와 독이 든 과자 상자",
    category: "유년기",
    once: true,
    req: {
      minAge: 7,
      maxAge: 13,
      anyCareers: ["child"],
      allTags: ["noble"],
      excludeRealms: ["void"],
      excludeTags: ["schola", "voidborn"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"]
    },
    reqLabel: "7~13세 · 귀족 가문 유년기",
    weight: 36,
    text: "상층 첨탑의 호화로운 저택 서재로 방계 숙부가 보낸 고급 설탕 과자 상자가 도착했다. 귀족 가문의 어린 후계자에게 호의는 언제나 칼날을 품고 있는 법이다.",
    choices: [
      {
        label: "[지성 판정] 은수저와 향기만으로 과자 속 미세한 독약을 간파해 가문 경비대에 고발한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "가문 약사가 독 성분을 확인하자 가주가 크게 경탄하며 그대를 조기 후계자 교육 과정에 올렸다!",
          stats: { Int: 6, Inf: 6, WP: 3 }
        },
        fail: {
          text: "독은 없었으나 지나친 경계심 탓에 작은 소동이 벌어졌다. 그래도 가문 어른들은 방심하지 않는 태도를 나쁘게 보지 않았다.",
          stats: { Int: 2, Fel: -2, WP: 2 }
        }
      },
      {
        label: "[교섭 판정] 가문 연회에서 유창한 하이 고딕 인사법으로 유력 길드 후원자의 환심을 산다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "'이 아이는 장차 성계를 호령할 재목이군!' 어른들의 찬사 속에 일찍부터 귀족 사교계의 감각을 터득했다.",
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "예법 호칭을 한 마디 헷갈려 사교계의 은근한 비웃음과 가정교사의 냉엄한 꾸중을 들었다.",
          stats: { Int: 2, Inf: -2 }
        }
      },
      {
        label: "화려한 과자와 사교 대신 가문 무기고에서 검술 사범에게 몰래 칼 다루는 법을 익힌다",
        effect: {
          text: "비단옷에 땀을 적시며 쥔 연습용 레이피어가 장차 목숨을 지킬 든든한 밑천이 되었다.",
          stats: { WS: 4, Ag: 4 }
        }
      }
    ],
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "ev_s2_child_feral_trial",
    title: "유년기 — 야만 행성의 첫 밤사냥과 뼈 부적",
    category: "유년기",
    once: true,
    req: {
      minAge: 7,
      maxAge: 13,
      anyCareers: ["child"],
      anyWorldTags: ["feral", "death"],
      excludeWorlds: ["krieg", "catachan", "nocturne"],
      excludeHomeWorlds: ["krieg"]
    },
    reqLabel: "7~13세 · 야만/죽음 행성 유년기",
    weight: 36,
    text: "성인식까지는 아직 몇 해가 남았지만, 부족의 아이들은 열 살 안팎이면 횃불 하나만 들고 정착지 바깥 암벽에서 홀로 첫 밤을 버텨야 한다. 어둠 속에서 포식자의 울음이 메아리친다.",
    choices: [
      {
        label: "[강인 판정] 불씨가 꺼진 뒤에도 떨지 않고 차가운 바위 절벽을 새벽까지 지켜 낸다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "서리가 내린 아침, 굳건히 걸어 내려온 그대의 목에 부족 장로가 맹수 이빨 부적을 걸어 주었다!",
          stats: { T: 6, WP: 5 }
        },
        fail: {
          text: "독충에 물려 열병을 앓으며 겨우 귀환했으나, 덕분에 야생 독기에 대한 저항력이 한층 강해졌다.",
          wounds: -10,
          stats: { T: 3 }
        }
      },
      {
        label: "[민첩 판정] 돌창을 깎아 어둠 속 맹수의 발자국을 추적해 작은 사냥감을 잡아 돌아온다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "어린 사냥꾼의 민첩한 솜씨에 부족 전사들이 환호하며 모닥불 옆 상석을 내어 주었다!",
          stats: { Ag: 5, WS: 5, BS: 3 }
        },
        fail: {
          text: "가시덤불에 발을 헛디뎌 상처를 입었으나, 맹수의 시야를 따돌리는 법을 몸으로 익혔다.",
          wounds: -9,
          stats: { Ag: 3 }
        }
      },
      {
        label: "부족 주술사 곁에서 '별 너머 하늘의 신황제'에 관한 고대 구전을 밤새 귀담아듣는다",
        effect: {
          text: "투박한 신화 속에서도 황금 옥좌의 빛을 향한 경외심이 어린 가슴에 깊이 뿌리내렸다.",
          stats: { WP: 4 },
          faith: 8
        }
      }
    ],
    source: "Dark Heresy: Feral World Origin"
  },
  {
    id: "ev_s2_child_forge_spark",
    title: "유년기 — 포지 신전의 첫 성유 세례와 기계령의 속삭임",
    category: "유년기",
    once: true,
    req: {
      minAge: 7,
      maxAge: 13,
      anyCareers: ["child"],
      or: [{ allTags: ["mechanicus_blood"] }, { anyWorldTags: ["forge", "mechanicus"] }],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"]
    },
    reqLabel: "7~13세 · 기계교 도제/포지 월드 유년기",
    weight: 36,
    text: "거대한 증기 프레스가 굉음을 내는 하층 포지 공방에서 보조 톱니바퀴 하나가 불꽃을 튀기며 멈춰 섰다. 선임 테크프리스트의 광학 렌즈가 어린 도제들을 차갑게 훑는다.",
    choices: [
      {
        label: "[지성 판정] 축성 성유를 붓고 배운 대로 이진법 진정 기도문을 읊어 기계령을 되살린다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "톱니가 매끄럽게 다시 맞물리며 가동되었다! 테크프리스트가 '옴니시아의 감각이 깃든 아이'라며 상급 견습 반에 추천했다.",
          stats: { Int: 6, Inf: 4 },
          faith: 4
        },
        fail: {
          text: "전류 스파크에 손끝을 데어 뒤로 물러났으나, 기계령의 까다로운 성질을 일찍 체감했다.",
          wounds: -8,
          stats: { Int: 2 }
        }
      },
      {
        label: "[강인 판정] 뜨거운 용광로 열기를 견디며 12시간 연속 예비 부품 운반을 완수한다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "어른도 지쳐 쓰러질 열기 속에서 한 번도 쓰러지지 않아 포지 감독관의 인정을 받았다.",
          stats: { T: 5, BS: 3 }
        },
        fail: {
          text: "열기에 탈진해 쓰러졌으나, 차가운 강철 바닥 위에서 육신의 나약함을 절감했다.",
          wounds: -9,
          stats: { T: 2 }
        }
      },
      {
        label: "선임 견습생의 뒤를 조용히 따르며 '육신은 약하고 강철은 영원하다'는 첫 교리를 필사한다",
        effect: {
          text: "기름때 묻은 양피지 위에 옴니시아의 교리가 반듯하게 새겨졌다.",
          stats: { Int: 4, WP: 3 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Imperium Maledictum"
  },
  {
    id: "ev_s2_child_krieg_vat",
    title: "유년기 — 크리그 지하 훈련소의 방독면 적합 시험",
    category: "유년기",
    once: true,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], anyHomeWorlds: ["krieg"] },
    reqLabel: "6~13세 · 크리그 출생 유년기",
    weight: 40,
    text: "비타-움 배양실에서 깨어나 지정 번호를 부여받은 뒤 몇 해가 지났다. 오늘 지하 훈련소 교관은 어린 후보생 전원을 모의 독가스 밀실로 몰아넣고, 어른 크기 라스건과 낡은 방독면 필터 하나씩을 던져 주었다.",
    choices: [
      {
        label: "[강인 판정] 필터가 절반쯤 막힌 숨 막히는 가스실에서도 부동자세를 흐트러뜨리지 않고 버틴다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "교관이 기록판에 '우수 소모 자원 — 척탄병 적성'이라 기입했다. 고통을 묵묵히 견디는 크리그의 영혼이 빚어졌다.",
          stats: { T: 6, WP: 5 },
          faith: 6,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "모의 자극 가스에 폐가 타는 듯한 기침을 쏟았으나, 끝까지 방독면을 벗지 않고 버텨 냈다.",
          wounds: -10,
          stats: { T: 3, WP: 2 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[사격 판정] 무거운 라스건을 어깨에 단단히 받치고 모의 반역자 표적의 정중앙을 꿰뚫는다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "열 발 연속 정중앙 명중! 교관이 말없이 새 탄창을 지급하며 다음 참호 조준 훈련으로 넘겼다.",
          stats: { BS: 6, WS: 3 }
        },
        fail: {
          text: "반동에 어깨에 멍이 들었으나, 다시 총을 고쳐 쥐고 사격 자세를 교정했다.",
          wounds: -6,
          stats: { BS: 3 }
        }
      },
      {
        label: "지정 번호를 복창하며 묵묵히 참호 삽질과 속죄 교리 암송을 완수한다",
        effect: {
          text: "크리그의 아이에게 이름이나 안락은 필요 없다. 오직 황제께 바칠 속죄의 날을 준비할 뿐이다.",
          stats: { T: 3, WP: 4 },
          faith: 5,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Death Korps of Krieg / Imperial Armour"
  },
  {
    id: "ev_s2_child_void_hull",
    title: "유년기 — 성간 함선의 공허 창문과 중력 격벽의 아이들",
    category: "유년기",
    once: true,
    req: {
      minAge: 6,
      maxAge: 13,
      anyCareers: ["child"],
      or: [{ allTags: ["voidborn"] }, { anyWorldTags: ["voidborn"] }]
    },
    reqLabel: "6~13세 · 보이드본 함선 유년기",
    weight: 36,
    text: "거대한 성간 함선의 하층 갑판에서 워프 도약 예비 경보가 울렸다. 중력 발생기가 잠시 흔들리며 아이들이 공중으로 붕 뜨는 사이, 격벽 너머 창문으로 기괴한 빛이 번쩍인다.",
    choices: [
      {
        label: "[민첩 판정] 저중력 환기 통로를 날렵하게 헤엄쳐 비상 산소 밸브를 제때 잠근다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "갑판장도 놓친 미세 누출을 어린 몸으로 막아 냈다! 선원들이 진짜 보이드본의 핏줄이라며 등을 두드렸다.",
          stats: { Ag: 6, Int: 4 }
        },
        fail: {
          text: "격벽 모서리에 이마를 부딪쳐 피가 났으나, 무중력에서 몸을 가누는 감각을 체득했다.",
          wounds: -8,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[의지 판정] 워프 창문을 바라보지 말고 눈을 감으라며 겁에 질린 갑판 아이들을 진정시킨다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "겔러 필드의 가호를 함께 읊조리는 사이 도약이 무사히 끝났다. 함선 사제가 그대의 담력을 높이 샀다.",
          stats: { WP: 5, Fel: 4 },
          faith: 6
        },
        fail: {
          text: "잠깐 스친 워프 빛에 지독한 악몽을 꿨으나, 곧 정신을 차리고 함선 규율을 새겼다.",
          wounds: -6,
          corruption: 3
        }
      },
      {
        label: "선배 갑판원 곁에 꼭 붙어 선체 진동 소리로 엔진 상태를 분별하는 법을 배운다",
        effect: {
          text: "행성의 땅은 밟아 보지 못했어도 강철 함선의 맥박만큼은 누구보다 잘 이해하게 되었다.",
          stats: { Int: 3, T: 3, Ag: 2 }
        }
      }
    ],
    source: "Dark Heresy / Rogue Trader: Voidborn"
  },
  {
    id: "ev_s4_youth_factory_shift",
    title: "초년기 — 첫 16시간 야간 교대와 매뉴팩토룸 프레스 폭주",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["menial_worker", "underhive_ganger"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "14~21세 · 하층 노동자 / 언더하이브 갱단",
    weight: 30,
    text: "어른 몫의 첫 배속표를 받아 든 지 얼마 되지 않은 밤, 매뉴팩토룸 제7압연 라인의 고압 증기 밸브가 비명을 지르며 폭주하기 시작했다. 감독관은 생산 할당량이 밀린다며 라인 정지를 거부하고, 곁에서 일하던 앳된 동료가 톱니바퀴 쪽으로 미끄러지고 있다.",
    choices: [
      {
        label: "[민첩 판정] 감독관의 고함을 무시하고 몸을 날려 동료를 끌어낸 뒤 비상 감압 레버를 당긴다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "간발의 차로 동료를 구하고 압연기 폭발까지 막아 냈다! 하층 공단의 노동자들이 어린 그대를 믿음직한 일원으로 인정했다.",
          stats: { Ag: 6, Fel: 5, T: 3 },
          align: { humane: 8 }
        },
        fail: {
          text: "동료는 구했으나 뜨거운 증기에 팔을 데이고 할당량 미달로 감봉 처분을 받았다.",
          wounds: -14,
          stats: { T: 3, WP: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "[지성 판정] 생산 라인을 멈추지 않은 채 보조 배기관을 열어 증기 압력만 교묘히 분산시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "인명 피해도, 할당량 차질도 없는 놀라운 기지였다! 지나가던 기계교 보좌관이 그대의 손재주를 눈여겨보았다.",
          stats: { Int: 7, Inf: 4, Ag: 3 }
        },
        fail: {
          text: "압력 계산이 어긋나 파편에 스쳤으나, 대형 폭발만은 피했다.",
          wounds: -12,
          stats: { Int: 3 }
        }
      },
      {
        label: "규정대로 안전선 밖으로 물러나 감독관의 지시를 따르며 살아남는 법을 배운다",
        effect: {
          text: "제국의 공장에서 감정은 사치다. 냉혹한 현실 속에서 묵묵히 하루를 버텨 냈다.",
          stats: { T: 4, WP: 4 },
          align: { ruthless: 5 }
        }
      }
    ],
    source: "Lexicanum: Manufactorum / Imperium Maledictum"
  },
  {
    id: "ev_s4_youth_first_watch",
    title: "초년병 — 첫 야간 참호 보초와 안개 너머의 발소리",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["pdf_trooper", "astra_militarum"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg"],
      excludeTags: [
        "krieg_grenadier", "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "14~22세 · 행성 방위군 / 아스트라 밀리타룸 신병",
    weight: 30,
    text: "군복의 풀기도 채 빠지지 않은 첫 야간 경계 근무다. 빗물이 철모 챙을 타고 흘러내리는 자정 무렵, 철조망 너머 짙은 안개 속에서 금속이 부딪치는 소리와 낮은 속삭임이 들려왔다. 고참들은 모두 벙커 안에서 곯아떨어진 상태다.",
    choices: [
      {
        label: "[의지 판정] 숨을 죽이고 암구호를 외치며 침착하게 조명탄을 쏘아 올려 정체를 확인한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "조명탄 아래 드러난 것은 적 정찰조였다! 그대의 침착한 초동 경보 덕분에 소대가 기습을 면하고 적을 섬멸했다.",
          stats: { WP: 6, BS: 5, Inf: 4 }
        },
        fail: {
          text: "야생 들개 무리에 조명탄을 쏘는 소동을 벌여 고참들에게 밤새 얼차려를 받았으나 경계심만큼은 몸에 배었다.",
          wounds: -8,
          stats: { T: 4, WP: 2 }
        }
      },
      {
        label: "[사격 판정] 어둠 속 수상한 그림자를 향해 먼저 경계 사격을 가해 소대를 깨운다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정확한 제압 사격이 침투하던 적 척후병의 다리를 꿰뚫었다! 중대장이 신병답지 않은 담력이라며 표창했다.",
          stats: { BS: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "빗나간 사격에 적의 반격탄이 참호 턱을 때려 파편상을 입었으나 본대는 깨워 냈다.",
          wounds: -14,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "섣불리 총을 쏘지 않고 벙커로 신속히 내려가 분대장을 깨워 정식 절차대로 대응한다",
        effect: {
          text: "오발 사고 없이 안전하게 경계 태세를 격상시켰다. 군대의 기본은 보고와 규율임을 깨달았다.",
          stats: { Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Infantryman's Uplifting Primer"
  },
  {
    id: "ev_s4_youth_scribe_error",
    title: "수습 서기 — 첫 양피지 장부 오기와 행성 십일조 소동",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["administratum", "ecclesiarchy_priest"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "14~22세 · 아드미니스트라툼 / 에클레시아키 초년기",
    weight: 30,
    text: "잉크 냄새가 코를 찌르는 수습 책상에서 밤샘 필사를 마친 아침, 그대는 어젯밤 발송 대기함에 넣은 행성 십일조·성당 봉헌 장부에 숫자 0 하나가 잘못 적힌 것을 발견했다. 이대로 아스트로패스 탑으로 넘어가면 한 개 구역이 굶어 죽거나 그대가 서비터로 개조될 판이다.",
    choices: [
      {
        label: "[민첩 판정] 발송 수레가 서고 정문을 나서기 전에 달려가 300쪽 장부를 밤새워 완벽히 재필사해 바꿔치기한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "손가락에 물집이 잡히도록 필사해 단 한 글자의 티도 없이 장부를 바로잡았다! 안도의 한숨과 함께 제국 행정의 무서움을 배웠다.",
          stats: { Ag: 5, Int: 5, WP: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "수레를 막아 세우다 상급 서기에게 들켜 혹독한 징계 기록을 남겼으나, 대형 참사만은 막았다.",
          stats: { Inf: -3, Int: 4 },
          align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 정정 조서 양식 제44-베타호를 작성해 공식 절차로 오류를 자진 신고하고 즉시 수정 승인을 받는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "까다로운 정정 서식을 한 치의 오차도 없이 채워 올리자 상급 서기관이 '정직하고 유능한 인재'라며 도리어 신뢰를 보냈다!",
          stats: { Int: 7, Inf: 5, WP: 3 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "정정 심사를 받느라 일주일간 무급 야근과 태형 징계를 받았으나, 목숨과 직책은 보전했다.",
          wounds: -10,
          stats: { WP: 4, Int: 3 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "선배 서기에게 배급 쿠폰을 쥐여 주고 조용히 비공식 수정 인장을 받아 사건을 덮는다",
        effect: {
          text: "제국 관료제가 진짜로 굴러가는 방식을 첫해부터 뼈저리게 깨우쳤다.",
          stats: { Fel: 5, Inf: 3 },
          faith: -3,
          align: { ruthless: 7 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Imperium Maledictum"
  },
  {
    id: "ev_s4_youth_noosphere_link",
    title: "기계교 수습기 — 첫 신경 접속과 사라져 가는 손끝의 온기",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["skitarii", "tech_priest"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "14~22세 · 스키타리 / 테크프리스트 초년기",
    weight: 30,
    text: "마침내 첫 신경 데이터 단자를 목덜미에 연결하고 포지 성소의 누스피어에 접속하는 의식이 시작되었다. 수만 줄의 이진법 찬가와 열 센서 수치가 뇌 속으로 폭포처럼 쏟아지며, 어릴 적의 따뜻한 기억과 인간적 감각이 차가운 데이터 뒤로 밀려난다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 논리에 완전히 동조해 데이터 폭포를 완벽한 질서로 정리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "육신은 나약하나 강철은 영원하다! 감정의 잡음을 걷어 내고 포지 성소의 연산망과 완벽히 합일했다.",
          stats: { Int: 7, T: 4, WP: 4 }
        },
        fail: {
          text: "과부하로 신경망에 극심한 발열을 겪었으나, 접속 적응 자체에는 성공했다.",
          wounds: -12,
          stats: { Int: 4, T: 2 }
        }
      },
      {
        label: "[의지 판정] 이진법 데이터 흐름을 받아들이되 인간 시절의 직관과 호기심만은 별도 기억 구역에 지켜 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "기계적 정밀함과 필멸자의 직관을 함께 품는 데 성공했다! 훗날 독창적인 판단의 밑거름이 될 것이다.",
          stats: { WP: 7, Int: 5, Fel: 3 }
        },
        fail: {
          text: "두 감각이 충돌해 며칠간 이명과 환청에 시달렸으나 끝내 균형을 잡았다.",
          wounds: -10,
          stats: { WP: 4 }
        }
      },
      {
        label: "스승 테크프리스트가 지정한 표준 감쇠 필터를 켜 안전하고 점진적으로 적응한다",
        effect: {
          text: "교리의 정석을 따라 무리 없이 첫 접속 의식을 마쳤다. 이제 그대는 진정한 기계교의 일원이다.",
          stats: { Int: 4, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Noosphere / Adeptus Mechanicus"
  },
  {
    id: "ev_s4_youth_first_warp",
    title: "초년 항해 — 첫 워프 도약과 겔러 필드 너머의 두드림",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyCareers: ["imperial_navy"] },
        { anyWorldTags: ["voidborn"] }
      ]
    },
    reqLabel: "14~22세 · 임페리얼 네이비 / 보이드본 초년기",
    weight: 30,
    text: "함선 전체에 붉은 도약 경보가 울리고, 강철 방화 셔터가 육중하게 닫혔다. 그대가 성인이 되어 처음으로 맞는 본격적인 워프 항해다. 겔러 필드의 낮은 웅웅거림 사이로, 선체 철판 바로 바깥에서 누군가 손톱으로 긁는 듯한 소름 돋는 환청이 하부 갑판을 훑고 지나간다.",
    choices: [
      {
        label: "[의지 판정] 공포에 질려 비명을 지르려는 신참 수병의 입을 막고 황제 찬송가를 함께 읊조린다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "패닉이 갑판 전체로 번지는 것을 막아 냈다! 갑판장이 신참답지 않은 배짱이라며 럼주 한 잔을 건넸다.",
          stats: { WP: 7, Fel: 5, Inf: 3 },
          faith: 5,
          corruption: -3
        },
        fail: {
          text: "워프 멀미와 악몽에 시달리며 구토를 쏟았으나, 무사히 실우주로 빠져나왔다.",
          wounds: -10,
          corruption: 4,
          stats: { WP: 3 }
        }
      },
      {
        label: "[강인 판정] 환청을 무시하고 맡은 증기 밸브와 포탑 고정 볼트만 악착같이 점검하며 정신을 붙든다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "몸을 움직여 일에 몰두하자 워프의 속삭임이 틈을 파고들지 못했다. 진정한 공허 항해사의 첫걸음이었다.",
          stats: { T: 6, Ag: 4, WP: 3 }
        },
        fail: {
          text: "흔들리는 선체에서 공구에 이마를 찧었으나 임무 위치는 끝까지 지켰다.",
          wounds: -10,
          stats: { T: 4 }
        }
      },
      {
        label: "고참 선원들의 충고대로 귀를 천으로 틀어막고 침상에 몸을 묶은 채 도약이 끝나기를 기다린다",
        effect: {
          text: "워프에서는 보지도 듣지도 않는 것이 상책이다. 무사히 첫 성간 항해를 마쳤다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Geller Field / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s4_youth_arbites_baton",
    title: "초임 집행관 — 첫 하층 구역 진압 명령과 굶주린 군중",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 18,
      maxAge: 24,
      anyCareers: ["arbites"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "18~24세 · 아뎁투스 아르비테스 초임",
    weight: 30,
    text: "스콜라 프로제니움이나 훈련소의 교본을 막 덮고 처음 투입된 현장. 배급 지연에 격분한 하층 구역 주민들이 곡물 창고 철문을 두드리고 있다. 상관은 주동자를 즉결 처분해 본보기를 보이라고 명하지만, 군중 맨 앞에는 여윈 아이들과 노인들이 떠밀려 서 있다.",
    choices: [
      {
        label: "[교섭 판정] 확성기로 제국법의 엄중함과 배급 재개 시한을 단호히 선포해 유혈 사태 없이 군중을 해산시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "단 한 발의 실탄도 쓰지 않고 폭동 직전의 광장을 진정시켰다! 냉철한 위엄과 통솔력을 동시에 증명했다.",
          stats: { Fel: 7, WP: 5, Inf: 5 },
          align: { humane: 8 }
        },
        fail: {
          text: "군중 속에서 날아온 돌멩이에 맞고 결국 충격봉 진압으로 이어졌으나, 대규모 사상자만은 막았다.",
          wounds: -12,
          stats: { WP: 4 },
          align: { humane: 5 }
        }
      },
      {
        label: "[백병 판정] 군중 뒤편에서 쇠파이프를 나눠 주던 실제 선동 갱단원만 정밀 제압해 끌어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "민간인을 다치게 하지 않고 진짜 배후만 일격에 꺾어 버렸다! 상관이 탁월한 현장 판단력이라며 칭찬했다.",
          stats: { WS: 6, Ag: 4, Inf: 5 },
          align: { humane: 5 }
        },
        fail: {
          text: "난전 속에 멍과 찰과상을 입었으나, 선동 주동자 체포에는 성공했다.",
          wounds: -14,
          stats: { WS: 4, T: 3 },
          align: { humane: 3 }
        }
      },
      {
        label: "명령에 따라 방패 벽을 전진시켜 법과 질서의 냉혹한 무게를 집행한다",
        effect: {
          text: "동정심은 반란의 씨앗이 될 뿐이다. 교본 그대로 임무를 완수하며 제국 집행관의 강철 심장을 굳혔다.",
          stats: { WP: 6, Inf: 4 },
          faith: 4,
          align: { dogmatic: 8 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites / Schola Progenium"
  },
  {
    id: "ev_s4_youth_spire_debut",
    title: "상류층 데뷔 — 첫 첨탑 사교 연회와 독이 든 칭찬",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyTags: ["noble", "terra_elite", "rogue_trader_blood", "navigator"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"]
    },
    reqLabel: "14~22세 · 귀족 / 상류층 / 로그 트레이더 / 항해사 혈통",
    weight: 30,
    text: "가문의 문장을 달고 처음으로 참석한 상층 첨탑의 성인 데뷔 만찬이다. 샹들리에 불빛 아래 경쟁 가문의 노련한 백작이 다가와 감미로운 칭찬을 건네더니, 그대의 가문이 맡은 성간 운송권의 비밀 계약 조건을 슬쩍 떠보기 시작했다.",
    choices: [
      {
        label: "[교섭 판정] 우아한 미소로 화제를 돌려 도리어 경쟁 가문의 최근 적자 소문을 재치 있게 찔러 넣는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "주변 귀족들의 낮고 감탄 섞인 웃음이 터져 나왔다! 백작이 체면을 구긴 채 물러나며, 그대의 이름이 사교계에 단숨에 각인되었다.",
          stats: { Fel: 7, Inf: 7, Int: 3 }
        },
        fail: {
          text: "미묘한 말실수를 백작에게 잡혀 가문 원로들에게 따가운 질책을 들었다.",
          stats: { Inf: -3, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 일부러 엉뚱한 가짜 운송 일정을 흘려 상대 가문이 오판에 빠지도록 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "한 달 뒤 경쟁 가문이 텅 빈 화물 항로에 투자해 큰 손실을 입었다! 가주께서 그대의 냉철한 계략을 극찬했다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "거짓 정보가 간파되어 백작의 경계심과 가문 원로의 질책을 샀으나, 실제 기밀은 지켜 냈다.",
          stats: { Int: 2, Inf: -2 }
        }
      },
      {
        label: "아직 가문의 실무에는 어둡다며 겸손히 잔만 비우고 가주 곁으로 물러난다",
        effect: {
          text: "어설프게 끼어들지 않은 신중함이 가문의 비밀을 지켰다. 상류층의 생존술을 눈으로 익혔다.",
          stats: { WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Nobility / Dark Heresy"
  },
];
