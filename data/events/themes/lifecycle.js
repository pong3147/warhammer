// 분기 사건 — 생애 주기(유년기 6~13세 · 초년기 14~22세 · 노년기 · 초장수기) 및 인간관계 · 가족 · 후계자 연작
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_schola_scout",
    title: "스콜라 프로제니움의 검은 마차",
    category: "성장",
    once: true,
    req: { minAge: 8, maxAge: 14, excludeWorlds: ["krieg"], excludeWorldTags: ["feral"], excludeTags: ["schola", "astartes", "custodes", "abhuman"], or: [{ stats: { WP: 34 } }, { stats: { Int: 34 } }, { anyTags: ["military_blood", "pious"] }] },
    reqLabel: "나이 8~14세 · 의지 또는 지성 34+",
    weight: 18,
    text: "아뎁투스 미니스토룸의 드릴-애벗(교관 수도사)이 그대의 또렷한 눈빛과 기개를 눈여겨보았다. 스콜라 프로제니움 편입 시험에 응시하면 커미사르, 소로리타스, 템페스투스 사이온, 심지어 이단심문관으로 가는 엘리트 관문이 열린다.",
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
    id: "ev_rejuvenat_offer",
    title: "상층 첨탑의 비술 — 수명 연장 시술 제안",
    category: "일상",
    once: true,
    req: { minAge: 54, stats: { Inf: 74 }, excludeTags: ["astartes", "custodes", "dreadnought", "daemon_prince"] },
    reqLabel: "나이 54세+ · 권위 74+ (필멸자 최상류층)",
    weight: 16,
    text: "황혼기에 접어든 그대에게 저명한 마고스 바이올로기스가 은밀히 '리주버냇(Rejuvenat)' 세포 회춘 시술을 제안했다. 제국의 평민은 꿈도 꾸지 못할 200년 수명의 특권이다.",
    choices: [
      {
        label: "막대한 영향력을 지불하고 수명 연장 시술을 받는다",
        effect: {
          text: "백발이 다시 검어지고 쇠약했던 심장이 힘차게 뛰기 시작했다! 기대수명이 크게 연장되었다.",
          stats: { T: 6, Inf: -6 },
          wounds: 30,
          lifeBonusExtra: 45,
          incrementRejuvenat: true,
          addTags: ["rejuvenat"]
        }
      },
      {
        label: "부자연스러운 연명을 거부하고 황제께서 정하신 수명을 받아들인다",
        effect: {
          text: "담담한 태도가 주변의 깊은 존경을 불러일으켰다.",
          stats: { WP: 5, Fel: 4 },
          faith: 10
        }
      }
    ],
    source: "Lexicanum: Rejuvenat"
  },
  {
    id: "ev_s2_child_ration_line",
    title: "유년기 — 하이브 배급소 줄과 녹슨 공구의 유혹",
    category: "유년기",
    once: true,
    req: {
      minAge: 6,
      maxAge: 13,
      anyWorldTags: ["hive", "industrial", "civilised", "agri"],
      excludeTags: ["noble", "schola"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "6~13세 · 일반/하층 유년기",
    weight: 34,
    text: "끝없이 늘어선 시체 녹말 배급소 줄 옆으로 고장 난 기계 계수기와 버려진 공구 상자가 눈에 들어온다. 감독관이 딴청을 피우는 찰나, 어린 손끝이 어떤 길을 고르느냐에 따라 앞으로의 생존 방식이 갈릴 것이다.",
    choices: [
      {
        label: "[민첩 판정] 감독관의 시선을 피해 버려진 공구와 예비 배급표를 재빨리 챙긴다",
        check: { stat: "Ag", diff: 10 },
        success: {
          text: "들키지 않고 묵직한 공구와 이틀 치 식량을 손에 넣었다! 제국 하층에서 살아남는 약삭빠른 감각이 일찍 눈떴다.",
          stats: { Ag: 5, Int: 3 },
          addTags: ["streetwise"]
        },
        fail: {
          text: "경비 서비터의 경고음에 놀라 달아나다 무릎을 심하게 긁혔다. 도둑질도 요령이 필요하다는 뼈아픈 교훈을 얻었다.",
          wounds: -8,
          stats: { Ag: 2 }
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
          stats: { T: 4, WP: 3 }
        }
      }
    ],
    source: "Imperium Maledictum / Warhammer 40k Hive Daily Life"
  },
  {
    id: "ev_s2_child_blackship_sky",
    title: "유년기 — 궤도를 가로지른 검은 함선의 그림자",
    category: "유년기",
    once: true,
    req: { minAge: 6, maxAge: 13, excludeWorldTags: ["feral", "krieg"] },
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
          faith: 10
        },
        fail: {
          text: "궤도에서 내려오는 사이킥 억제 파동에 어지럼증을 느껴 주저앉았으나, 곧 정신을 추슬렀다.",
          wounds: -6,
          stats: { WP: 2 }
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
          text: "아르비테스 순찰대의 매서운 호통에 놀라 골목으로 뒷걸음질쳤다.",
          stats: { Ag: 2, Int: 2 }
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
    req: { minAge: 7, maxAge: 13, allTags: ["schola"] },
    reqLabel: "7~13세 · 스콜라 프로제니움 생도",
    weight: 38,
    text: "스콜라 프로제니움의 차가운 석조 기숙사에서 상급 생도들이 신입 기수의 구두를 빼앗으며 복종을 강요한다. 드릴 아보트 교관은 '약자는 황제의 엘리트 자리를 차지할 자격이 없다'며 못 본 척 팔짱을 끼고 있다.",
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
          faith: 6
        },
        fail: {
          text: "새벽 무렵 저체온으로 쓰러져 의무실에 실려 갔으나, 의리만큼은 기숙사 전체에 각인되었다.",
          wounds: -8,
          stats: { WP: 3 }
        }
      },
      {
        label: "쓸데없는 다툼을 피하고 밤새 제국 전술 교본과 성가를 완벽히 암송해 성적으로 압도한다",
        effect: {
          text: "다음 날 구술 시험에서 단 한 글자도 틀리지 않아 교관의 호평을 받았다.",
          stats: { Int: 4, WP: 3 }
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
    req: { minAge: 7, maxAge: 13, allTags: ["noble"], excludeTags: ["schola"], excludeWorlds: ["krieg"] },
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
          text: "예법 호칭을 한 마디 헷갈려 가정교사의 냉엄한 꾸중을 들었으나 귀한 공부가 되었다.",
          stats: { Fel: 2, Int: 2 }
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
    req: { minAge: 7, maxAge: 13, anyWorldTags: ["feral", "death"], excludeWorlds: ["krieg"] },
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
      or: [{ allTags: ["mechanicus_blood"] }, { anyWorldTags: ["forge", "mechanicus"] }],
      excludeWorlds: ["krieg"]
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
    req: { minAge: 6, maxAge: 13, anyHomeWorlds: ["krieg"] },
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
          faith: 6
        },
        fail: {
          text: "모의 자극 가스에 폐가 타는 듯한 기침을 쏟았으나, 끝까지 방독면을 벗지 않고 버텨 냈다.",
          wounds: -10,
          stats: { T: 3, WP: 2 }
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
          text: "반동에 어깨를 멍들었으나, 다시 총을 고쳐 쥐고 사격 자세를 교정했다.",
          wounds: -6,
          stats: { BS: 3 }
        }
      },
      {
        label: "지정 번호를 복창하며 묵묵히 참호 삽질과 속죄 교리 암송을 완수한다",
        effect: {
          text: "크리그의 아이에게 이름이나 안락은 필요 없다. 오직 황제께 바칠 속죄의 날을 준비할 뿐이다.",
          stats: { T: 3, WP: 4 },
          faith: 5
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
    req: { minAge: 6, maxAge: 13, or: [{ allTags: ["voidborn"] }, { anyWorldTags: ["voidborn"] }] },
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
    id: "ev_s2_elder_mortal_twilight",
    title: "노년기 — 닳아 버린 관절과 늙은 종복의 회고",
    category: "노년기",
    once: true,
    req: { minAge: 55, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat"] },
    reqLabel: "55세+ · 필멸자 노년기",
    weight: 34,
    text: "거울 속 머리칼은 어느새 서리처럼 하얗게 세었고, 비가 내리는 날이면 수십 년 전 입은 상처와 굳은 관절이 욱신거린다. 인류제국에서 쉰다섯을 넘겨 살아남았다는 사실 자체가 이미 드문 기적이다.",
    choices: [
      {
        label: "[의지 판정] 쑤시는 노구를 달래며 젊은 후배들에게 평생 체득한 생존과 실무의 요령을 전수한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "경험이 담긴 노장의 한마디가 수많은 신참의 실수를 막아 주었다! 구역 전체에서 존경받는 원로로 자리 잡았다.",
          stats: { WP: 6, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "변화한 젊은 세대의 방식과 부딪쳐 씁쓸한 기분이 들었으나, 진심만은 일부 후배들에게 전해졌다.",
          stats: { WP: 3, Fel: 2 }
        }
      },
      {
        label: "[강인 판정] 아직 황제께 바칠 기력이 남았다며 일선 현장의 자리를 끝까지 물러서지 않는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "젊은이들도 혀를 내두르는 노익장으로 임무를 완수해 냈다! 쇠락 앞에서도 고개 숙이지 않는 긍지다.",
          stats: { T: 5, WP: 5, Inf: 4 },
          wounds: -6
        },
        fail: {
          text: "무리를 하다 호흡이 가빠져 며칠간 몸져누웠다. 세월의 무게가 뼈저리게 다가왔다.",
          wounds: -14,
          stats: { WP: 3 }
        }
      },
      {
        label: "한발 물러나 후방 기록 정리와 조용한 보양으로 남은 생애를 차분히 갈무리한다",
        effect: {
          text: "격렬했던 세월을 뒤로하고 숨을 고르며, 황금 옥좌의 평온이 마지막 날까지 함께하길 기도했다.",
          wounds: 12,
          stats: { WP: 3 },
          faith: 6
        }
      }
    ],
    source: "Imperium Maledictum / Warhammer 40k Mortal Life"
  },
  {
    id: "ev_s2_elder_rejuvenat_solitude",
    title: "장수기 — 리주버냇의 고독, 모든 옛 벗이 흙으로 돌아간 뒤",
    category: "장수기",
    once: true,
    req: { minAge: 65, allTags: ["rejuvenat"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "65세+ · 리주버냇 수명 연장자",
    weight: 38,
    text: "값비싼 리주버냇 수명 연장 시술 덕에 그대의 얼굴은 여전히 중년의 윤기를 유지하고 있다. 하지만 오늘 아침 도착한 마지막 옛 동기의 부고장 앞에서, 함께 젊은 날을 보낸 평범한 벗들이 이제 단 한 명도 남지 않았다는 사실을 깨달았다.",
    choices: [
      {
        label: "[교섭 판정] 옛 벗들의 손주 세대를 불러 모아 지난 시대의 기억을 들려주며 새로운 인연을 잇는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "세월이 흘러도 인연은 다음 세대로 이어진다. 젊은 후손들의 눈빛 속에서 떠난 벗들의 웃음을 다시 보았다.",
          stats: { Fel: 6, Inf: 7, WP: 4 }
        },
        fail: {
          text: "세대 간의 거리감은 쉽게 좁혀지지 않았으나, 가문과 조직의 원로로서 예우는 굳건히 지켰다.",
          stats: { Inf: 4, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 필멸의 감상을 끊어 내고 한 세기를 내다보는 장기 안목으로 권력과 정책을 설계한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "짧은 생을 사는 자들은 결코 보지 못하는 수십 년 단위의 흐름을 꿰뚫어 거대한 권위를 구축했다!",
          stats: { Int: 7, Inf: 8, Fel: -3 }
        },
        fail: {
          text: "지나치게 냉혹한 태도가 주변의 반감을 사 한동안 고립감이 더 짙어졌다.",
          stats: { Int: 3, Fel: -4 }
        }
      },
      {
        label: "먼지 낀 장부 속 이미 세상을 떠난 이름들을 한 번씩 부른 뒤 조용히 술잔을 비운다",
        effect: {
          text: "오래 산다는 것은 더 많은 작별을 견딘다는 뜻이다. 고독을 삼키며 다시 내일을 향해 걸어갔다.",
          stats: { WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Rejuvenat / Eisenhorn & Ravenor"
  },
  {
    id: "ev_s2_elder_bionic_humanity",
    title: "기계화의 경계 — 기억 슬롯에서 지워야 할 고향의 냄새",
    category: "장수기",
    once: true,
    req: { minAge: 45, allTags: ["bionic"], excludeTags: ["custodes"] },
    reqLabel: "45세+ · 기계 의체 시술자",
    weight: 34,
    text: "세월과 부상이 쌓이며 육신의 상당 부분이 차가운 강철과 전선으로 대체되었다. 보조 연산 칩을 증설하던 테크프리스트가 묻는다. '비효율적인 어린 시절의 감각 기억과 슬픔의 회로를 삭제하시겠습니까? 연산 효율이 14퍼센트 상승합니다.'",
    choices: [
      {
        label: "[지성 판정] 불필요한 감정 회로를 절제하고 연산 코어를 증설해 강철의 완벽에 다가선다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "두려움도 망설임도 사라진 냉철한 지성이 깨어났다! 육신의 쇠락마저 늦추며 기계적 효율을 극대화했다.",
          stats: { Int: 8, WP: 5, Fel: -5 },
          lifeBonusExtra: 12
        },
        fail: {
          text: "신경 접합부가 거부 반응을 일으켜 극심한 두통을 앓았으나, 보조 연산 장치만은 무사히 안착했다.",
          wounds: -12,
          stats: { Int: 4, Fel: -3 }
        }
      },
      {
        label: "[의지 판정] 비효율적일지라도 고향의 바람 냄새와 인간이었던 기억만은 끝까지 삭제하지 않는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 강철 가슴 속에서도 꺼지지 않는 인간성의 온기를 지켜 냈다! 주변 사람들이 그대의 의지에 깊이 감명받았다.",
          stats: { WP: 7, Fel: 5 },
          faith: 6
        },
        fail: {
          text: "신경 간섭으로 일부 기억이 흐릿해졌으나, 소중한 이름 몇 개만은 끝내 붙들어 두었다.",
          wounds: -8,
          stats: { WP: 4 }
        }
      },
      {
        label: "기억에 손을 대지 말고 낡은 의체 관절의 윤활유와 동력 셀만 차분히 교체한다",
        effect: {
          text: "강철은 도구일 뿐 주인이 아니다. 피와 기계 사이의 균형을 묵묵히 지켜 냈다.",
          stats: { T: 4, Int: 3 },
          wounds: 8
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Rite of Pure Thought"
  },
  {
    id: "ev_s2_centenarian_mortal_lineage",
    title: "초장수기 — 백 년 전 전우의 증손자를 마주하다",
    category: "장수기",
    once: true,
    req: {
      minAge: 100,
      or: [
        { allTags: ["astartes"] },
        { allTags: ["custodes"] },
        { allTags: ["grey_knight"] },
        { allTags: ["rejuvenat"] },
        { allTags: ["magos"] }
      ]
    },
    reqLabel: "100세+ · 초장수기",
    weight: 42,
    text: "백 년을 훌쩍 넘겨 살아온 그대의 앞에 낯익은 성씨와 가문 문장을 단 젊은 장교가 경례를 올린다. 알고 보니 한 세기 전 피비린내 나는 공성전에서 그대의 등 뒤를 지켜 주었던 필멸자 전우의 증손자였다.",
    choices: [
      {
        label: "[교섭 판정] 백 년 전 선조가 보여 주었던 용기를 직접 증언해 젊은 후손의 가슴에 긍지를 심어 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'그대의 증조부는 불바다 속에서도 단 한 발짝도 물러서지 않았다.' 눈시울을 붉힌 젊은 장교가 선조에 부끄럽지 않은 헌신을 맹세했다!",
          stats: { Fel: 6, Inf: 7 },
          faith: 8
        },
        fail: {
          text: "세월을 초월한 존재의 위압감에 젊은이가 얼어붙었으나, 잊혀 가던 선조의 명예만은 확실히 전해졌다.",
          stats: { Inf: 4, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 필멸자의 삶이 불꽃처럼 짧다는 냉엄한 진리를 되새기며 수호자의 영원한 의무를 다짐한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "수많은 세대가 스러져도 제국은 계속 이어져야 한다. 시간의 흐름조차 흔들지 못하는 초연한 의지가 완성되었다.",
          stats: { WP: 8, Int: 4 }
        },
        fail: {
          text: "지나간 세월의 무게가 잠시 어깨를 눌렀으나, 곧 냉철한 평정심을 되찾았다.",
          stats: { WP: 4 }
        }
      },
      {
        label: "백 년 전 전역의 낡은 약장을 조용히 후손의 손에 쥐여 주고 말없이 돌아선다",
        effect: {
          text: "긴 말은 필요 없다. 손바닥에 남은 차가운 금속의 무게가 한 세기를 건너 두 사람을 이었다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Warhammer 40k Lore / Space Marine & Rejuvenat Longevity"
  },
  {
    id: "ev_s2_centenarian_ancient_scars",
    title: "초장수기 — 두 세기 전 전장의 파편과 세대의 간극",
    category: "장수기",
    once: true,
    req: { minAge: 140, anyTags: ["astartes", "custodes", "grey_knight", "dreadnought"] },
    reqLabel: "140세+ · 초인 고참기",
    weight: 42,
    text: "어느덧 한 세기 반을 살아온 고참 전사가 되었다. 요즘 배치되는 신세대 형제들은 그대가 젊은 날 피를 흘렸던 전쟁을 고대 역사서 속 일화처럼 이야기한다. 오래된 갑주의 흉터 하나하나가 이제는 살아 있는 전설이다.",
    choices: [
      {
        label: "[백병 판정] 신세대 전사들에게 수백 년 전 잊혀진 고대 검술과 포위 돌파 전법을 직접 몸으로 가르친다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "백전노장의 빈틈없는 일격에 젊은 전사들이 탄성을 터뜨렸다! 그대의 기량이 새로운 세대의 칼날로 계승되었다.",
          stats: { WS: 6, Inf: 8, Fel: 4 }
        },
        fail: {
          text: "격렬한 시범 도중 오래된 고질 상처가 잠시 욱신거렸으나, 후배들의 존경심은 조금도 줄지 않았다.",
          wounds: -10,
          stats: { WS: 3, Inf: 4 }
        }
      },
      {
        label: "[지성 판정] 챕터와 황궁 서고에 수 세기 동안 직접 목격한 전역의 교훈을 구술해 영구 기록으로 남긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "그대의 구술 전술서가 서고 핵심 교본으로 등재되어 앞으로 천 년간 후배들의 지침이 되었다!",
          stats: { Int: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "너무 오래된 기억의 일부 연도가 엇갈렸으나, 전장의 본질을 담은 기록만은 빛을 발했다.",
          stats: { Int: 4, Inf: 3 }
        }
      },
      {
        label: "오래된 무구와 갑주의 긁힌 자국을 정비하며 숨이 붙어 있는 한 끝없이 싸우리라 다짐한다",
        effect: {
          text: "세월은 육신에 흉터를 남겼지만, 황제를 향한 서약에는 단 하나의 흠집도 내지 못했다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s2_elder_veteran_story",
    title: "노년기 — 출정 전야의 늙은 참전용사와 신병들의 눈빛",
    category: "노년기",
    once: true,
    req: {
      minAge: 55,
      anyTags: ["militarum", "navy", "officer", "commissar", "arbites"],
      excludeTags: ["astartes", "custodes", "grey_knight", "heretic"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "55세+ · 제국 무관·치안 노병",
    weight: 34,
    text: "전선 출정을 하루 앞둔 주둔지 주점에서 앳된 신병들이 잔뜩 긴장한 얼굴로 늙은 백전노장인 그대의 주변으로 모여든다. '선배님, 진짜 첫 전투에 들어가면 어떻게 살아남습니까?'",
    choices: [
      {
        label: "[교섭 판정] 영웅담 대신 라스건 습기 관리와 포격 시 엎드리는 실전 요령을 꼼꼼히 가르쳐 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "신병들의 덜덜 떨리던 손이 진정되었다. 그대의 실질적인 조언이 내일 전장에서 몇 명의 목숨은 틀림없이 구할 것이다.",
          stats: { Fel: 6, Int: 5, Inf: 5 }
        },
        fail: {
          text: "잔소리가 길어져 신병들이 다소 주눅 들었으나, 중요한 수칙 몇 가지는 단단히 새겨 두었다.",
          stats: { Int: 3, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 전쟁의 화려한 선전 뒤에 가려진 참호의 진흙과 전우애의 무게를 담담히 들려준다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "거짓 없는 노병의 고백이 헛된 허세를 걷어 내고 진짜 용기를 일깨웠다.",
          stats: { WP: 7 },
          faith: 6
        },
        fail: {
          text: "오래전 잃은 전우들의 얼굴이 떠올라 잠시 말을 잇지 못했으나, 신병들은 조용히 경례로 화답했다.",
          stats: { WP: 4 }
        }
      },
      {
        label: "빈 잔을 내려놓고 내일 떠날 신병들의 등 뒤로 말없이 아퀼라 성호를 그어 준다",
        effect: {
          text: "부디 이들 중 절반이라도 살아서 돌아오기를. 노병의 짧은 기도가 주점의 소음 속으로 스며들었다.",
          stats: { WP: 4 },
          faith: 5
        }
      }
    ],
    source: "Only War / Gaunt's Ghosts"
  },
  {
    id: "ev_s3_bond_comrade_meet",
    title: "이름 없는 인연 — 포화 속 참호에서 나눈 마지막 물통",
    category: "인연",
    once: true,
    req: {
      minAge: 16,
      maxAge: 45,
      excludeTags: ["bond_comrade", "custodes", "dreadnought"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "16~45세 · 인연 시작 (전우)",
    weight: 28,
    text: "위험한 현장 작업과 교전이 길어지며 사방이 먼지와 비명으로 뒤덮인 밤, 옆자리의 이름 없는 동료가 자신의 마지막 정제수 물통을 말없이 그대에게 건넨다. '혼자 버티면 여기서 끝장이야. 등 뒤는 내가 볼 테니 네 앞만 지켜.'",
    choices: [
      {
        label: "[교섭 판정] 물통을 반씩 나누어 마시고 어떤 지옥에서도 서로를 버리지 않겠다고 굳게 손을 맞잡는다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "수천조 인류가 스쳐 가는 차가운 제국에서 목숨을 맡길 진짜 전우를 얻었다! 훗날 이 인연은 큰 울림으로 돌아올 것이다.",
          stats: { Fel: 5, WP: 5 },
          addTags: ["bond_comrade"]
        },
        fail: {
          text: "어색한 침묵이 흘렀지만, 위기를 함께 넘긴 뒤 두 사람 사이에는 말없는 연대가 싹텄다.",
          stats: { WP: 3, T: 2 },
          addTags: ["bond_comrade"]
        }
      },
      {
        label: "감상에 젖지 않고 물통만 감사히 받아 마신 뒤 냉정하게 각자의 임무에 집중한다",
        effect: {
          text: "제국에서는 정을 줄수록 잃을 것도 많아진다. 냉철한 거리를 유지하며 밤을 넘겼다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Only War"
  },
  {
    id: "ev_s3_bond_comrade_fate",
    title: "오래된 전우의 소식 — 잿빛 인식표와 마지막 편지",
    category: "인연",
    once: true,
    req: { allTags: ["bond_comrade"] },
    reqLabel: "이력: 등을 맡긴 전우 (후속 회수)",
    weight: 34,
    text: "세월이 흘러 각자의 전선과 구역으로 흩어진 뒤, 옛날 마지막 물통을 나누었던 전우가 치열한 붕괴 구역에 고립되어 위독하다는 다급한 전갈이 도착했다! 지금 달려가면 위험하지만, 외면하면 평생 그 얼굴이 눈에 밟힐 것이다.",
    choices: [
      {
        label: "[백병/강인 판정] 위험한 봉쇄 구역으로 몸소 뛰어들어 피투성이가 된 옛 전우를 등에 업고 끌어낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "'역시 올 줄 알았어, 이 고집쟁이야.' 포연 속에서 다시 맞잡은 손이 그 어떤 훈장보다 뜨거웠다! 두 사람의 우정이 전설이 되었다.",
          stats: { T: 6, WP: 7, Fel: 6, Inf: 5 },
          faith: 8,
          wounds: -12
        },
        fail: {
          text: "겨우 전우의 곁에 닿았을 때 이미 숨은 멎어가고 있었다. 마지막으로 건네받은 낡은 인식표를 가슴에 품고 피투성이로 돌아왔다.",
          wounds: -20,
          stats: { WP: 8 },
          faith: 6
        }
      },
      {
        label: "[권위 판정] 인맥과 행정 권한을 총동원해 긴급 구조 수송선을 급파하도록 상부를 압박한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "그대의 끈질긴 청원 끝에 구조 셔틀이 가까스로 도착해 전우를 살려 냈다! 며칠 뒤 도착한 감사 편지에 눈시울이 뜨거워졌다.",
          stats: { Inf: 6, Fel: 6, WP: 5 }
        },
        fail: {
          text: "관료주의의 서류 절차에 막혀 구조선은 하루 늦게 도착했다. 잿빛 인식표와 짧은 유언장만이 우편으로 돌아왔다.",
          stats: { WP: 6, Int: 3 }
        }
      },
      {
        label: "직접 갈 수 없는 현실을 삼키며 성당에 촛불을 켜고 옛 전우의 생환을 밤새 기도한다",
        effect: {
          text: "며칠 뒤 전우가 중상을 딛고 살아남았다는 짧은 소식이 전해졌다. 멀리서나마 안도의 한숨을 내쉬었다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Gaunt's Ghosts"
  },
  {
    id: "ev_s3_bond_mentor_meet",
    title: "이름 없는 인연 — 늙은 장인의 꾸지람과 낡은 수첩",
    category: "인연",
    once: true,
    req: {
      minAge: 14,
      maxAge: 35,
      excludeTags: ["bond_mentor", "custodes"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "14~35세 · 인연 시작 (스승)",
    weight: 28,
    text: "서툰 실수로 큰 문책을 당할 뻔한 순간, 백발이 성성한 베테랑 선배가 말없이 뒤처리를 막아 주더니 호된 꾸지람과 함께 손때 묻은 낡은 수첩을 던져 주었다. '제국에서 멍청한 놈은 일찍 죽는다. 살아서 제 몫을 하려거든 내 밑에서 제대로 배워.'",
    choices: [
      {
        label: "[지성 판정] 고개를 숙이고 늙은 선배의 까다로운 가르침과 실전 요령을 하나도 놓치지 않고 흡수한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "엄격하지만 속정 깊은 평생의 스승을 얻었다! 교본에는 결코 적히지 않는 현장의 지혜가 뼈에 새겨졌다.",
          stats: { Int: 6, WP: 4 },
          addTags: ["bond_mentor"]
        },
        fail: {
          text: "수차례 호통을 들으며 진땀을 뺐으나, 끝까지 포기하지 않는 성실함을 인정받아 제자로 받아들여졌다.",
          stats: { Int: 3, T: 2 },
          addTags: ["bond_mentor"]
        }
      },
      {
        label: "남의 밑에 얽매이기보다 스스로 부딪쳐 익히겠다며 정중히 수첩을 돌려준다",
        effect: {
          text: "노인은 혀를 차며 돌아섰지만, 독립적인 자립심만은 한층 단단해졌다.",
          stats: { WP: 4, Ag: 2 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Imperium Maledictum"
  },
  {
    id: "ev_s3_bond_mentor_legacy",
    title: "스승의 마지막 부탁 — 황금 옥좌로 떠나는 길목에서",
    category: "인연",
    once: true,
    req: { allTags: ["bond_mentor"] },
    reqLabel: "이력: 인생의 스승 (후속 회수)",
    weight: 34,
    text: "어느덧 기력이 다해 병상에 누운 옛 스승이 그대를 조용히 불렀다. 야윈 손으로 오래된 개인 기록과 아끼던 도구를 건네며 희미하게 웃는다. '내가 평생 지키려다 못 다한 약속이 하나 있네. 이제 자네가 내 대신 끝맺어 주겠나?'",
    choices: [
      {
        label: "[지성 판정] 스승이 평생 정리한 비전 지식과 미완의 과업을 완벽히 계승해 마무리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "스승의 필생의 업적을 훌륭히 완성해 바쳤다! 노인은 평온한 미소와 함께 황제의 품으로 눈을 감았고, 그대의 명망이 크게 높아졌다.",
          stats: { Int: 8, Inf: 7, WP: 5 },
          faith: 6
        },
        fail: {
          text: "과업은 험난해 일부만 이루었으나, 마지막까지 애쓴 제자의 진심에 스승은 고맙다는 말을 남기고 영면했다.",
          stats: { Int: 4, WP: 5 }
        }
      },
      {
        label: "[의지 판정] 거창한 업적보다 임종의 밤을 끝까지 지키며 스승의 마지막 길을 외롭지 않게 배웅한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 제국에서 누군가의 손을 끝까지 잡아 준 그 밤의 기억이 평생 흔들리지 않는 정신의 기둥이 되었다.",
          stats: { WP: 8, Fel: 6 },
          faith: 10
        },
        fail: {
          text: "상실감에 며칠간 기력을 잃었으나, 스승의 가르침을 되새기며 다시 일어섰다.",
          wounds: -6,
          stats: { WP: 5 }
        }
      },
      {
        label: "스승이 남긴 낡은 수첩을 정중히 품에 넣고 묵묵히 영결식을 치러 드린다",
        effect: {
          text: "한 세대의 지혜가 고요히 다음 세대로 건너왔다. 그대의 손끝에 여전히 스승의 습관이 살아 숨 쉰다.",
          stats: { Int: 4, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Warhammer 40k Original Narrative"
  },
  {
    id: "ev_s3_bond_rival_meet",
    title: "이름 없는 인연 — 승진 명단 앞의 차가운 시선, 숙명의 정적",
    category: "인연",
    once: true,
    req: {
      minAge: 16,
      maxAge: 50,
      excludeTags: ["bond_rival", "astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "16~50세 · 인연 시작 (정적)",
    weight: 26,
    text: "중요한 포상과 승진 추천 명단 앞에서, 늘 사사건건 방식이 부딪치던 동기가 그대의 공적을 교묘히 깎아내리며 차갑게 웃는다. '선한 척 굴어 봐야 이 제국에선 살아남지 못해. 누가 끝까지 올라가는지 두고 보자고.'",
    choices: [
      {
        label: "[교섭 판정] 날카로운 언변으로 정면 맞받아치며 결코 물러서지 않겠다고 선전포고한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "팽팽한 긴장감 속에 둘 사이의 치열한 경쟁이 시작되었다! 날 선 라이벌 의식이 그대를 더욱 단련시킨다.",
          stats: { Fel: 5, Inf: 5, Int: 3 },
          addTags: ["bond_rival"]
        },
        fail: {
          text: "상대의 교묘한 말재간에 잠시 밀렸으나, 이를 갈며 설욕을 다짐하는 숙명의 정적이 생겼다.",
          stats: { WP: 4, Inf: -2 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "쓸데없는 감정 소모에 말려들지 않고 무표정하게 등을 돌려 자기 일에만 집중한다",
        effect: {
          text: "시비에 휘말리지 않은 냉정함이 오히려 상급자들의 좋은 인상을 남겼다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Imperium Maledictum"
  },
  {
    id: "ev_s3_bond_rival_reckoning",
    title: "정적과의 결판 — 위기의 밤, 적이 내민 뜻밖의 손",
    category: "인연",
    once: true,
    req: { allTags: ["bond_rival"] },
    reqLabel: "이력: 숙명의 정적 (후속 회수)",
    weight: 34,
    text: "수년간 치열하게 부딪쳐 온 숙명의 정적과 예기치 못한 위기 현장에 함께 고립되었다! 무너지는 천장과 적의 포위망 사이에서, 상처 입은 정적이 치명적인 부패 증거를 손에 쥔 채 이를 악물고 말한다. '여기서 죽기 싫으면 잠시만 손을 잡자. 아니면 지금 나를 버리고 네가 다 차지하든가!'",
    choices: [
      {
        label: "[교섭 판정] 낡은 원한을 잠시 접고 완벽한 호흡으로 위기를 돌파해 평생의 경쟁자를 든든한 동맹으로 바꾼다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "'제법이군, 역시 내 적수다워.' 사선을 함께 넘은 뒤 두 사람은 서로의 실력을 누구보다 잘 아는 유능한 협력자가 되었다!",
          stats: { Fel: 7, Inf: 8, WP: 5 }
        },
        fail: {
          text: "탈출에는 성공했으나 끝내 앙금은 완전히 풀리지 않았다. 그래도 서로의 등 뒤에 칼을 꽂지 않는 암묵적 존중은 남았다.",
          wounds: -12,
          stats: { Fel: 3, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 위기를 기회로 삼아 정적의 모든 비리와 약점을 깔끔히 회수해 완전히 실각시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉혹하지만 완벽한 승리였다! 정적은 변방으로 좌천되었고, 그대의 권위는 구역 내에서 흔들리지 않게 되었다.",
          stats: { Int: 7, Inf: 10 }
        },
        fail: {
          text: "정적의 거센 반격에 휘말려 함께 중상을 입고 겨우 현장을 빠져나왔다.",
          wounds: -20,
          stats: { Inf: -3 }
        }
      },
      {
        label: "승부도 복수도 덮어 두고 각자 살길을 찾아 조용히 어둠 속으로 갈라선다",
        effect: {
          text: "이 잔혹한 은하에서 오래 미워할 힘조차 사치다. 두 사람은 말없이 각자의 길로 돌아섰다.",
          stats: { WP: 5, Ag: 4 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative"
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
      excludeWorldTags: ["feral"]
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
          stats: { Ag: 6, Fel: 5, T: 3 }
        },
        fail: {
          text: "동료는 구했으나 뜨거운 증기에 팔을 데이고 할당량 미달로 감봉 처분을 받았다.",
          wounds: -14,
          stats: { T: 3, WP: 3 }
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
          stats: { T: 4, WP: 4 }
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
      excludeTags: ["krieg_grenadier", "astartes", "custodes"]
    },
    reqLabel: "14~22세 · PDF / 아스트라 밀리타룸 신병",
    weight: 30,
    text: "군복의 풀기도 채 빠지지 않은 첫 야간 경계 근무다. 빗물이 철모 챙을 타고 흘러내리는 자정 무렵, 철조망 너머 짙은 안개 속에서 금속이 부딪히는 소리와 낮은 속삭임이 들려왔다. 고참들은 모두 벙커 안에서 곯아떨어진 상태다.",
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
    title: "수습 서기 — 첫 양피지 장부 오기(誤記)와 행성 십일조 소동",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      anyCareers: ["administratum", "ecclesiarchy_priest"]
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
          stats: { Ag: 5, Int: 5, WP: 4 }
        },
        fail: {
          text: "수레를 막아 세우다 상급 서기에게 들켜 혹독한 징계 기록을 남겼으나, 대형 참사만은 막았다.",
          stats: { Inf: -3, Int: 4 }
        }
      },
      {
        label: "[지성 판정] 정정 조서 양식 제44-베타호를 작성해 공식 절차로 오류를 자진 신고하고 즉시 수정 승인을 받는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "까다로운 정정 서식을 한 치의 오차도 없이 채워 올리자 상급 서기관이 '정직하고 유능한 인재'라며 도리어 신뢰를 보냈다!",
          stats: { Int: 7, Inf: 5, WP: 3 }
        },
        fail: {
          text: "정정 심사를 받느라 일주일간 무급 야근과 태형 징계를 받았으나, 목숨과 직책은 보전했다.",
          wounds: -10,
          stats: { WP: 4, Int: 3 }
        }
      },
      {
        label: "선배 서기에게 배급 쿠폰을 쥐여 주고 조용히 비공식 수정 인장을 받아 사건을 덮는다",
        effect: {
          text: "제국 관료제가 진짜로 굴러가는 방식을 첫해부터 뼈저리게 깨우쳤다.",
          stats: { Fel: 5, Inf: 3 },
          faith: -3
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
      anyCareers: ["skitarii", "tech_priest"]
    },
    reqLabel: "14~22세 · 스키타리 / 테크프리스트 초년기",
    weight: 30,
    text: "마침내 첫 신경 데이터 단자를 목덜미에 연결하고 포지 성소의 노오스피어(Noosphere)에 접속하는 의식이 시작되었다. 수만 줄의 이진법 찬가와 열 센서 수치가 뇌 속으로 폭포처럼 쏟아지며, 어릴 적의 따뜻한 기억과 인간적 감각이 차가운 데이터 뒤로 밀려난다.",
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
      excludeTags: ["astartes", "custodes", "grey_knight"],
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
    source: "Lexicanum: Geller Field / Imperial Navy Lore"
  },
  {
    id: "ev_s4_youth_arbites_baton",
    title: "초임 집행관 — 첫 하층 구역 진압 명령과 굶주린 군중",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 22,
      excludeTags: ["astartes", "custodes", "grey_knight"],
      or: [
        { anyCareers: ["arbites", "commissar", "tempestus_scion", "adepta_sororitas"] },
        { allTags: ["schola"] }
      ]
    },
    reqLabel: "14~22세 · 아르비테스 / 커미사르 / 사이온 / 소로리타스 / 스콜라 출신",
    weight: 30,
    text: "스콜라 프로제니움이나 훈련소의 교본을 막 덮고 처음 투입된 현장. 배급 지연에 격분한 하층 구역 주민들이 곡물 창고 철문을 두드리고 있다. 상관은 주동자를 즉결 처분해 본보기를 보이라고 명하지만, 군중 맨 앞에는 여윈 아이들과 노인들이 떠밀려 서 있다.",
    choices: [
      {
        label: "[교섭 판정] 확성기로 제국법의 엄중함과 배급 재개 시한을 단호히 선포해 유혈 사태 없이 군중을 해산시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "단 한 발의 실탄도 쓰지 않고 폭동 직전의 광장을 진정시켰다! 냉철한 위엄과 통솔력을 동시에 증명했다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "군중 속에서 날아온 돌멩이에 맞고 결국 충격봉 진압으로 이어졌으나, 대규모 사상자만은 막았다.",
          wounds: -12,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 군중 뒤편에서 쇠파이프를 나눠 주던 실제 선동 갱단원만 정밀 제압해 끌어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "민간인을 다치게 하지 않고 진짜 배후만 일격에 꺾어 버렸다! 상관이 탁월한 현장 판단력이라며 칭찬했다.",
          stats: { WS: 6, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "난전 속에 멍과 찰과상을 입었으나, 선동 주동자 체포에는 성공했다.",
          wounds: -14,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "명령에 따라 방패 벽을 전진시켜 법과 질서의 냉혹한 무게를 집행한다",
        effect: {
          text: "동정심은 반란의 씨앗이 될 뿐이다. 교본 그대로 임무를 완수하며 제국 집행관의 강철 심장을 굳혔다.",
          stats: { WP: 6, Inf: 4 },
          faith: 4
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
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorlds: ["krieg"]
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
        label: "[지성 판정] 일부러 엉뚱한 가짜 운송 일정을 흘려 상대 가문이 헛다리를 짚도록 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "한 달 뒤 경쟁 가문이 텅 빈 화물 항로에 투자해 큰 손실을 입었다! 가주께서 그대의 냉철한 계략을 극찬했다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "거짓 정보가 간파되어 백작의 경계심을 샀으나, 실제 기밀은 지켜 냈다.",
          stats: { Int: 4 }
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
  {
    id: "ev_s5_bond_family_meet",
    title: "이름 없는 인연 — 등화관제 아래 맺은 평범한 혼약과 가정",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 20,
      maxAge: 45,
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["krieg"],
      excludeTags: [
        "bond_family",
        "astartes",
        "custodes",
        "grey_knight",
        "dreadnought",
        "sororitas",
        "canoness",
        "mechanicus",
        "krieg_grenadier"
      ]
    },
    reqLabel: "20~45세 필멸자 (초인·수도회·기계교·크리그 제외)",
    weight: 28,
    text: "공습 경보가 멎은 뒤 등화관제가 깔린 밤거리에서, 몇 해 동안 배급표와 고단한 일상을 함께 나누던 인연이 조용히 손을 잡아 왔다. 내일 당장 성간 징집령이나 폭격이 떨어질지 모르는 제국이지만, 그래도 황제 폐하의 성당 앞에서 작은 가정을 꾸리고 싶다는 진심 어린 청혼이다.",
    choices: [
      {
        label: "[귀족·상류층 전용] 두 가문의 영지와 인맥을 잇는 정식 혼약 서약을 체결한다",
        req: { anyTags: ["noble", "wealthy", "rogue_trader_blood", "terra_elite"] },
        effect: {
          text: "성당의 장엄한 종소리 속에 두 가문이 하나로 묶였다. 정치적 동맹인 동시에 거친 제국에서 서로의 등을 지탱할 배우자를 얻었다.",
          stats: { Fel: 6, Inf: 7, WP: 3 },
          addTags: ["bond_family"]
        }
      },
      {
        label: "작은 성당에서 간소한 서약을 올리고 서로의 곁을 지킬 가정을 꾸린다",
        effect: {
          text: "녹슨 놋쇠 반지를 나누어 끼며 웃었다. 끔찍한 41번째 천년기 한복판에도 지켜야 할 따뜻한 등불 하나가 켜졌다.",
          stats: { WP: 5, Fel: 5 },
          faith: 4,
          addTags: ["bond_family"]
        }
      },
      {
        label: "내일의 생사조차 기약할 수 없는 삶에 누구도 묶어 둘 수 없다며 정중히 마음을 접는다",
        effect: {
          text: "아쉬운 이별을 삼키고 오직 임무와 생존에만 집중하기로 다짐했다. 가슴 한구석이 시리지만 발걸음은 가벼워졌다.",
          stats: { WP: 6, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Imperial Citizenry / Warhammer Crime: Bloodlines"
  },
  {
    id: "ev_s5_bond_heir_birth",
    title: "다음 세대의 숨결 — 제국의 하늘 아래 태어난 자녀와 진로",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 24,
      maxAge: 60,
      allTags: ["bond_family"],
      excludeTags: ["bond_heir", "astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "이력: 가정과 배우자",
    weight: 34,
    text: "어둠뿐인 줄 알았던 그대의 삶에 새 생명의 울음소리가 찾아왔다. 어느덧 걸음마를 떼고 글자를 배우기 시작한 자녀를 바라보며, 배우자와 그대는 이 아이를 어떤 길로 키울지 밤새 고민에 잠긴다.",
    choices: [
      {
        label: "[권위 판정] 인맥과 저축을 총동원해 스콜라 프로제니움이나 상급 관청 장학생 추천을 받아 낸다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "치열한 경쟁을 뚫고 아이가 제국 정예 교육 과정에 입학했다! 부모의 희생이 아이에게 더 높은 하늘을 열어 주었다.",
          stats: { Inf: 6, WP: 5, Fel: 4 },
          faith: 5,
          addTags: ["bond_heir"]
        },
        fail: {
          text: "문턱 높은 추천 심사는 통과하지 못했으나, 아이에게 제국 법전과 교양을 손수 가르치며 단단히 키워 냈다.",
          stats: { Int: 4, WP: 4 },
          addTags: ["bond_heir"]
        }
      },
      {
        label: "[지성 판정] 거창한 출세 대신 살아남는 기술과 정직한 생업의 지혜를 손수 물려준다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "영특한 아이가 그대의 기술과 눈썰미를 그대로 흡수했다! 어떤 행성에 떨어져도 굶어 죽지 않을 든든한 후계자가 자라났다.",
          stats: { Int: 6, Fel: 5, T: 3 },
          addTags: ["bond_heir"]
        },
        fail: {
          text: "고된 일상 속에 가르칠 시간이 빠듯했으나, 아이는 부모의 성실한 등 뒤를 보며 바르게 자랐다.",
          stats: { T: 4, WP: 4 },
          addTags: ["bond_heir"]
        }
      },
      {
        label: "전란의 시대에 욕심을 부리지 않고 가족이 한지붕 아래 무사히 자라는 데 온 힘을 쏟는다",
        effect: {
          text: "화려한 미래는 아니어도 함께 웃는 저녁 식탁을 지켜 냈다. 그 기억이 아이의 평생을 버티게 할 것이다.",
          stats: { T: 4, WP: 5, Fel: 3 },
          addTags: ["bond_heir"]
        }
      }
    ],
    source: "Lexicanum: Imperial Citizenry / Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_s5_bond_family_conscription",
    title: "가족의 시련 — 문 앞에 날아든 전시 징집 영장과 마지막 식사",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 34,
      allTags: ["bond_family"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "34세 이상 · 가정과 배우자",
    weight: 36,
    text: "잿빛 제복의 징집 서기가 문 앞에 밀랍 인장이 찍힌 소집장을 꽂아 두고 사라졌다. 성계 밖 원정군 충원을 위해 그대의 배우자 혹은 가정의 핵심 식구가 48시간 내에 수송선 집합소로 출두하라는 명령이다. 이별의 그림자가 식탁 위에 무겁게 내려앉았다.",
    choices: [
      {
        label: "[권위 판정] 평생 쌓은 인맥과 공훈을 총동원해 최전선 대신 후방 병참·의무 보직으로 배치를 돌린다",
        check: { stat: "Inf", diff: -10 },
        success: {
          text: "수많은 청탁과 서류 끝에 안전한 후방 보급 기지 발령장을 받아 냈다! 가족의 목숨을 지켜 낸 안도감에 무릎이 풀렸다.",
          stats: { Inf: 4, Fel: 5, WP: 6 }
        },
        fail: {
          text: "징집관의 냉혹한 거절과 청탁 경고만 돌아왔다. 결국 정해진 운명을 받아들여야 했다.",
          stats: { Inf: -4, WP: 5 }
        }
      },
      {
        label: "[의지 판정] 슬픔을 삼키고 야전 응급 처치와 방호구 점검법을 밤새 전수하며 반드시 살아서 돌아오라 다짐한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "눈물 대신 단단한 생존 지혜와 행운의 성표를 품에 안겨 보냈다. 몇 해 뒤 무사하다는 편지가 도착했을 때 비로소 울음을 터뜨렸다.",
          stats: { WP: 7, T: 4, Int: 4 },
          faith: 5
        },
        fail: {
          text: "수송선이 구름 너머로 사라진 뒤 며칠간 식음을 전폐하며 깊은 상실감에 시달렸다.",
          wounds: -10,
          stats: { WP: 4 }
        }
      },
      {
        label: "남은 하룻밤 동안 아껴 둔 식량을 모두 꺼내 따뜻한 마지막 저녁을 차려 주며 조용히 손을 맞잡는다",
        effect: {
          text: "제국은 수많은 것을 빼앗아 가지만, 오늘 밤 나눈 온기만큼은 결코 앗아 가지 못한다.",
          stats: { Fel: 5, WP: 5 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Gaunt's Ghosts"
  },
  {
    id: "ev_s5_bond_heir_legacy",
    title: "후계자의 출정 — 장성한 자녀에게 물려주는 낡은 유품",
    category: "인간관계 연작",
    once: true,
    req: {
      minAge: 44,
      allTags: ["bond_heir"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "44세 이상 · 후계자·자녀",
    weight: 36,
    text: "어느새 그대의 키를 훌쩍 넘어선 자녀가 정복과 배낭을 갖추고 문턱에 섰다. 이제 자신의 삶을 개척하고 제국의 부름에 응답하러 떠날 날이다. 젊은 날의 그대를 쏙 빼닮은 눈빛이 마지막 가르침을 기다리고 있다.",
    choices: [
      {
        label: "[교섭 판정] 평생을 버텨 온 낡은 무기나 인장 반지를 건네며 '살아남아 품위를 지키라'는 가훈을 새겨 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "자녀가 눈시울을 붉히며 유품을 가슴에 품고 경례했다. 그대의 이름이 다음 세대의 자랑스러운 뿌리로 이어졌다.",
          stats: { Fel: 7, WP: 6, Inf: 5 },
          faith: 5
        },
        fail: {
          text: "세대 간의 생각 차이에 잠시 언성이 높아졌으나, 떠나기 직전 말없는 포옹으로 서로를 이해했다.",
          stats: { Fel: 3, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 평생 기록해 둔 처세술과 인맥 명부, 현장 노하우가 담긴 비망록을 통째로 물려준다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "수십 년의 시행착오가 담긴 비망록을 받아 든 자녀의 표정이 한결 단단해졌다. 후일 훌륭한 인재로 자리 잡았다는 소식이 들려왔다.",
          stats: { Int: 6, Inf: 6, WP: 4 }
        },
        fail: {
          text: "자녀는 자신만의 방식으로 부딪혀 보겠다며 웃었지만, 비망록 몇 장만은 소중히 챙겨 떠났다.",
          stats: { Int: 3, WP: 4 }
        }
      },
      {
        label: "말없이 자녀의 옷깃을 여며 주고 성당 문 앞까지 배웅하며 황제의 가호를 빈다",
        effect: {
          text: "멀어지는 뒷모습을 오래도록 바라보았다. 두렵지만, 내 삶이 헛되지 않았음을 깨달은 순간이었다.",
          stats: { WP: 6, T: 3 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Imperial Citizenry / Warhammer Crime"
  }
);
