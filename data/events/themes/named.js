// 분기 사건 — 20인 네임드 인물 단독 조우 및 조우 후일담(met_*)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_sly_marbo_encounter",
    title: "밀림의 유령 — 슬라이 마보의 흔적",
    category: "인물",
    once: true,
    req: {
      minAge: 16,
      minYear: 960,
      maxYear: 1030,
      excludeTags: [
        "met_marbo",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "navy_admiral", "sector_lord", "planetary_governor", "cardinal", "canoness", "lord_inquisitor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [{ anyWorlds: ["catachan"] }, { anyTags: ["militarum"] }]
    },
    reqLabel: "960.M41~030.M42 · 카타찬 또는 아스트라 밀리타룸",
    characters: ["marbo"],
    weight: 12,
    text: "적 요새에 야간 기습을 가하려던 그대의 소대가 도착했을 때, 이미 적 수비대 120명 전원이 소리 없이 도륙되어 있었다. 타오르는 탄약고 앞에서 붉은 두건을 두른 과묵한 사내가 칼날을 닦고 돌아본다. 카타찬의 전설, 슬라이 마보다!",
    choices: [
      {
        label: "[민첩 판정] 말없이 경례하고 그가 남긴 적 사령관의 암호 문서를 회수한다",
        check: { stat: "Ag", diff: 10 },
        success: {
          text: "마보는 짧은 눈짓만 남기고 1초 만에 어둠 속으로 사라졌다. 문서 덕에 그대의 부대는 대승을 거두었다!",
          stats: { Ag: 5, WS: 4, Inf: 6 },
          addTags: ["met_marbo"]
        },
        fail: {
          text: "그가 설치해 둔 부비트랩 인계철선에 발이 걸려 파편에 스쳤으나 겨우 목숨을 건졌다. 등골이 서늘하다.",
          wounds: -8,
          stats: { Ag: 2 },
          addTags: ["met_marbo"]
        }
      },
      {
        label: "부비트랩이 깔린 요새 내부에 섣불리 들어가지 않고 외곽 경계를 세워 본대 도착을 기다린다",
        effect: {
          text: "잠시 뒤 어둠 속에서 적 지휘관의 암호 철가방 하나가 발치로 굴러떨어졌다. 마보의 그림자는 이미 밀림 너머로 사라진 뒤였다.",
          stats: { WP: 4, BS: 3, Inf: 3 },
          addTags: ["met_marbo"]
        }
      }
    ],
    source: "Lexicanum: Sly Marbo"
  },
  {
    id: "ev_named_guilliman",
    title: "섭정의 밤샘 전략실 — 로부테 길리먼과의 조우",
    category: "네임드 조우",
    once: true,
    characters: ["guilliman"],
    req: {
      minAge: 16,
      minYear: 1001,
      excludeTags: [
        "imperial_nihilus", "met_guilliman",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["terra", "macragge"] },
        { anyTags: ["indomitus_crusader", "astartes", "inquisitor", "custodes", "officer"] }
      ]
    },
    reqLabel: "001.M42+ · 테라/마크라그 또는 성전·정예",
    weight: 28,
    text: "거대한 성간 지도 홀로그램 앞에 3미터가 넘는 푸른 황금 갑주의 반신, 제국 섭정 로부테 길리먼이 깊은 피로를 감춘 채 서 있다. 수백 개의 보급 보고서가 허공에 떠도는 가운데, 프라이마크의 날카로운 시선이 그대의 보고서와 눈동자에 머문다. '솔직히 말하라. 이 성계의 민심과 보급선은 진실로 어떠한가?'",
    choices: [
      {
        label: "[지성 판정] 미사여구를 버리고 냉철한 데이터와 병참 결함을 직언한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "길리먼이 희미한 미소를 지으며 고개를 끄덕였다. '1만 년 만에 아첨이 아닌 진실을 듣는군.' 섭정의 친필 인장이 찍힌 표창장이 수여되었다!",
          stats: { Int: 6, Inf: 10, WP: 5 },
          addTags: ["met_guilliman", "indomitus_crusader"]
        },
        fail: {
          text: "반신의 위압감에 말문이 막혀 수치를 더듬어 보고의 신빙성을 잃었으나, 길리먼은 묵묵히 어깨를 두드리며 다시 정리해 오라고 격려해 주었다.",
          stats: { WP: 2, Inf: -2 },
          addTags: ["met_guilliman"]
        }
      },
      {
        label: "황제와 섭정을 향한 변함없는 충성과 불굴의 각오를 맹세한다",
        effect: {
          text: "프라이마크의 장엄한 격려가 가슴 깊이 새겨졌다. 어둠 속에서도 이성과 질서는 꺼지지 않으리라.",
          stats: { WP: 5, Fel: 4, Inf: 6 },
          faith: 8,
          addTags: ["met_guilliman"]
        }
      }
    ],
    source: "Dark Imperium / Watchers of the Throne"
  },
  {
    id: "ev_named_yarrick",
    title: "하데스 하이브의 철의 눈 — 커미사르 세바스찬 야릭",
    category: "네임드 조우",
    once: true,
    characters: ["yarrick"],
    req: {
      minAge: 16,
      minYear: 942,
      maxYear: 1005,
      excludeTags: [
        "met_yarrick",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "high_lord_terra", "warmaster",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["armageddon"] },
        { anyTags: ["militarum", "commissar", "lord_commissar", "officer"] }
      ]
    },
    reqLabel: "942.M41~005.M42 · 아마겟돈 또는 제국군",
    weight: 28,
    text: "잿빛 폭우가 쏟아지는 참호선을 따라 붉은 레이저 의안이 번뜩이고, 육중한 오크 파워 클로를 의수로 단 노장 커미사르 세바스찬 야릭이 걸어온다. 사기가 꺾여 있던 병사들이 그의 모습만 보고도 라스건을 고쳐 쥐며 자세를 바로잡는다. 야릭이 그대 앞에 멈춰 서서 라스건 총열을 살핀다.",
    choices: [
      {
        label: "[의지 판정] 야릭의 매서운 시선을 정면으로 마주하며 최전선 사수를 보고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "'훌륭하군. 영웅이 되려 하지 마라. 그저 제 자리를 지켜라.' 야릭이 직접 그대의 전술 지도를 보정해 주고 어깨를 두드렸다!",
          stats: { WP: 7, BS: 5, Inf: 6 },
          faith: 8,
          addTags: ["met_yarrick"]
        },
        fail: {
          text: "레이저 의안의 위압감에 등줄기가 서늘해져 보고를 더듬자, 야릭은 실수한 탄약 배치를 냉엄히 꾸짖고 다음 참호로 향했다.",
          stats: { WP: 2, Inf: -2 },
          addTags: ["met_yarrick"]
        }
      },
      {
        label: "묵묵히 경례를 올리고 야릭의 전설적인 오크 방어 교리를 기록한다",
        effect: {
          text: "하데스 하이브의 영웅이 남긴 단 한마디가 평생 전장의 나침반이 되었다.",
          stats: { Int: 4, WP: 4, Inf: 3 },
          addTags: ["met_yarrick"]
        }
      }
    ],
    source: "Lexicanum: Sebastian Yarrick / Helsreach"
  },
  {
    id: "ev_named_cain",
    title: "타나 차 한 잔의 기적 — 커미사르 카이아파스 케인",
    category: "네임드 조우",
    once: true,
    characters: ["cain"],
    req: {
      minAge: 16,
      minYear: 919,
      maxYear: 1002,
      excludeTags: [
        "imperial_nihilus", "met_cain",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "navy_admiral", "arbites_marshal", "sector_lord", "planetary_governor", "cardinal", "canoness", "inquisitor", "lord_inquisitor", "magos", "fabricator_locum", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["valhalla"] },
        { anyTags: ["militarum", "commissar", "inquisition_agent", "navy", "arbites"] }
      ]
    },
    reqLabel: "919.M41~002.M42 · 발할라 또는 제국 군·기관",
    weight: 26,
    text: "쾌활하고 품위 있는 커미사르 카이아파스 케인과 정체 모를 퀴퀴한 냄새를 풍기는 부관 유르겐이 타나 차를 건네며 다가온다. 케인은 '안전한 후방 배수로 점검'을 같이 가자며 웃었지만, 그가 배수로 문을 열자마자 하필이면 진스틸러 컬트 비밀 아지트가 눈앞에 나타났다!",
    choices: [
      {
        label: "[사격 판정] 케인의 현란한 체인소드 검술과 유르겐의 멜타건에 합류해 소굴을 일망타진한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "케인이 허허 웃으며 '모든 것이 계획대로였소!'라 외치는 사이, 유르겐의 멜타건이 괴물을 증발시켰다! 그대 역시 '제국의 영웅과 함께 싸운 용사'로 훈장을 받았다!",
          stats: { BS: 5, WS: 4, Fel: 6, Inf: 7 },
          addTags: ["met_cain"]
        },
        fail: {
          text: "진스틸러의 발톱에 스쳐 부상을 입었으나, 기묘한 우연으로 무너진 파이프가 적을 덮치며 케인과 함께 기적적으로 살아남았다!",
          wounds: -14,
          stats: { Ag: 4, Inf: 4 },
          addTags: ["met_cain"]
        }
      },
      {
        label: "유르겐이 건넨 씁쓸한 타나 차를 한 모금 마시며 침착하게 후방 증원을 호출한다",
        effect: {
          text: "묘하게 워프 기운마저 잠잠해지는 이상한 부관 옆에서 완벽한 지원을 해냈다. 케인이 진심으로 고마워하며 저녁 포커판에 초대했다.",
          stats: { Fel: 5, Int: 4, Inf: 4 },
          corruption: -5,
          addTags: ["met_cain"]
        }
      }
    ],
    source: "Ciaphas Cain: For the Emperor"
  },
  {
    id: "ev_named_gaunt",
    title: "유령들의 모닥불 — 대령-커미사르 이브람 건트",
    category: "네임드 조우",
    once: true,
    characters: ["gaunt"],
    req: {
      minAge: 15,
      minYear: 766,
      maxYear: 795,
      excludeTags: [
        "met_gaunt",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "high_lord_terra", "warmaster",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anySegmenta: ["pacificus"] },
        { anyTags: ["sabbat_veteran", "tanith_ghost"] }
      ]
    },
    reqLabel: "766~795.M41 · 사바트 성전·파시피쿠스",
    weight: 30,
    text: "짙은 야간 안개 속, 위장 망토를 두른 정찰병들이 백파이프를 낮게 연주하는 야영지에 대령-커미사르 이브람 건트가 앉아 있다. 공포로 병사를 다스리는 여느 커미사르와 달리, 그는 부하 한 명 한 명의 이름을 부르며 직접 탄창을 챙겨 주고 있다.",
    choices: [
      {
        label: "[교섭 판정] 건트와 야간 정찰 경로를 상의하며 부대원들의 신뢰를 얻는다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "'유령들이여, 영원히 살고 싶은가!' 건트가 그대의 공정함과 담력을 높이 사며 스승 옥타르 총커미사르에게 배운 지휘 철학과 실전 검술을 전해 주었다.",
          stats: { Fel: 6, WS: 5, WP: 5, Inf: 5 },
          addTags: ["met_gaunt", "sabbat_veteran"]
        },
        fail: {
          text: "고된 행군과 밤샘 경계에 지쳐 판단이 흐려졌으나, 건트는 묵묵히 군용 담배를 건네며 다음 날 정찰 임무를 다시 맡겼다.",
          wounds: -6,
          stats: { WP: 2 },
          addTags: ["met_gaunt"]
        }
      },
      {
        label: "타니스 정찰병들의 은신술과 백파이프 선율에 귀 기울이며 밤을 보낸다",
        effect: {
          text: "고향을 잃고도 끝까지 싸우는 이들의 품격이 가슴을 울렸다. 은신과 사격 감각이 한결 예리해졌다.",
          stats: { Ag: 5, BS: 4, WP: 3 },
          addTags: ["met_gaunt"]
        }
      }
    ],
    source: "Gaunt's Ghosts: First and Only"
  },
  {
    id: "ev_named_dante",
    title: "황금 데스 마스크의 천오백 년 — 사령관 단테",
    category: "네임드 조우",
    once: true,
    characters: ["dante"],
    req: {
      minAge: 16,
      minYear: 940,
      excludeTags: [
        "met_dante",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["baal"] },
        { anyChapters: ["blood_angels"] },
        { allTags: ["imperial_nihilus"] }
      ]
    },
    reqLabel: "940.M41+ · 바알 / 블러드 엔젤 / 니힐루스",
    weight: 28,
    text: "눈부신 황금 파워 아머와 생귀니우스의 고뇌를 본뜬 데스 마스크를 쓴 최고령 스페이스 마린, 사령관 단테가 폐허가 된 성채 난간에 홀로 서 있다. 천오백 년을 싸우고도 쉴 수 없는 고독한 영웅이 고개를 돌려 그대에게 묻는다. '이 암흑 속에서도 그대는 아직 희망을 보는가?'",
    choices: [
      {
        label: "[의지 판정] '천사께서 버티시는 한, 인류도 결코 무릎 꿇지 않습니다'라고 답한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "황금 가면 너머로 깊은 한숨과 함께 다시 타오르는 결의가 느껴졌다. 단테가 직접 황금 핏방울 인장을 그대에게 하사했다!",
          stats: { WP: 7, Fel: 6, Inf: 8 },
          faith: 12,
          addTags: ["met_dante"]
        },
        fail: {
          text: "지쳐 버린 절망이 말끝에 새어 나와 잠시 고개를 숙였으나, 단테는 꾸짖지 않고 '피로는 죄가 아니다. 멈추지 않는 것이 의무일 뿐'이라며 조용히 격려했다.",
          stats: { WP: 2, Inf: -2 },
          addTags: ["met_dante"]
        }
      },
      {
        label: "말없이 경례를 올리고 단테가 지휘하는 다음 강습 작전의 최선봉을 자원한다",
        effect: {
          text: "천오백 년의 전사와 나란히 섰다는 사실만으로 영혼의 두려움이 사라졌다.",
          stats: { WS: 5, WP: 5, Inf: 5 },
          addTags: ["met_dante"]
        }
      }
    ],
    source: "Dante / The Devastation of Baal"
  },
  {
    id: "ev_named_cawl",
    title: "화성의 이단아인가 구원자인가 — 아크마고스 벨리사리우스 카울",
    category: "네임드 조우",
    once: true,
    characters: ["cawl"],
    req: {
      minAge: 16,
      minYear: 995,
      excludeTags: [
        "imperial_nihilus", "met_cawl",
        "fabricator_general", "high_lord_terra", "custodes",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["mars", "cadia", "terra"] },
        { anyTags: ["mechanicus", "tech_priest", "magos", "astartes"] }
      ]
    },
    reqLabel: "995.M41+ · 화성·카디아·테라 또는 기계교·아스타르테스",
    weight: 26,
    text: "거대한 곤충형 다리와 수십 개의 기계팔, 그리고 여러 개의 목소리가 교차하는 괴짜 대현자 벨리사리우스 카울이 반중력 실험실 한가운데서 그대를 부른다! '오호, 마침 적당한 조수가 왔군! 고루한 정통파 원로들이 보면 기절할 새 플라즈마 코일 시험을 도와 보겠나?'",
    choices: [
      {
        label: "[지성 판정] 카울의 대담한 기술 가설에 맞장구치며 연산 코일 조정을 돕는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'브라보! 역시 혁신이야말로 옴니시아의 참뜻이지!' 카울이 기뻐하며 최신형 마스터 크래프트 장구류와 화성 최고위 추천서를 건넸다!",
          stats: { Int: 8, BS: 4, Inf: 7 },
          addTags: ["met_cawl"]
        },
        fail: {
          text: "플라즈마 코일이 역화해 눈썹이 그을렸다! 카울은 '훌륭한 실패 데이터군!'이라며 껄껄 웃고 치료 연고를 던져 주었다.",
          wounds: -14,
          stats: { Int: 4 },
          addTags: ["met_cawl"]
        }
      },
      {
        label: "기술 이단의 소지를 경계하며 정통 기계교 교리대로 안전 점검만 수행한다",
        effect: {
          text: "카울은 '재미없는 정통파로군'이라며 혀를 찼지만, 그대의 꼼꼼한 안전 기록 덕에 실험 사고를 막았다.",
          stats: { Int: 4, WP: 4, Inf: 3 },
          addTags: ["met_cawl"]
        }
      }
    ],
    source: "Belisarius Cawl: The Great Work"
  },
  {
    id: "ev_named_celestine",
    title: "황금 날개의 강림 — 살아 있는 성녀 셀레스틴",
    category: "네임드 조우",
    once: true,
    characters: ["celestine"],
    req: {
      minAge: 14,
      minYear: 995,
      excludeTags: [
        "met_celestine", "custodes",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["ophelia7", "cadia"] },
        { anyTags: ["sororitas", "canoness", "ecclesiarchy", "pious", "saint_spark"] },
        { minFaith: 72 }
      ]
    },
    reqLabel: "995.M41+ · 높은 신앙 또는 국교·수녀회·성지",
    weight: 26,
    text: "검은 구름과 절망이 전장을 덮은 순간, 하늘이 갈라지며 순백의 비둘기 떼와 함께 황금 날개를 펼친 살아 있는 성녀 셀레스틴이 강림했다! 그녀가 불타는 성검 '아던트 블레이드'를 들어 올리자, 주변의 워프 냉기와 상처가 눈 녹듯 사라지기 시작한다.",
    choices: [
      {
        label: "[의지 판정] 성녀의 불길 옆으로 달려 나가 무너진 전열을 다시 일으켜 세운다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "성녀의 눈부신 축복이 온몸을 감쌌다! 상처가 기적처럼 아물고 워프의 오염이 완전히 정화되었다!",
          stats: { WP: 7, WS: 4, Fel: 6 },
          wounds: 30,
          faith: 22,
          corruption: -25,
          addTags: ["met_celestine", "living_miracle"]
        },
        fail: {
          text: "눈부신 성광에 압도되어 전열 수습의 타이밍을 놓치고 잠시 멈춰 섰으나, 그 장엄한 여운이 영혼의 흔들림을 붙들어 주었다.",
          stats: { WP: 2, Inf: -2 },
          faith: 8,
          corruption: -6,
          addTags: ["met_celestine"]
        }
      },
      {
        label: "경건히 무릎 꿇고 부상당한 동료들을 위해 황제의 기적을 간구한다",
        effect: {
          text: "성녀의 따스한 빛이 야전 의무실까지 퍼져 나가 수많은 전우가 목숨을 건졌다.",
          stats: { Fel: 5, WP: 4 },
          wounds: 15,
          faith: 16,
          corruption: -15,
          addTags: ["met_celestine"]
        }
      }
    ],
    source: "Celestine: The Living Saint / Fall of Cadia"
  },
  {
    id: "ev_named_eisenhorn",
    title: "그림자 속의 심판자 — 이단심문관 그레고르 아이젠혼",
    category: "네임드 조우",
    once: true,
    characters: ["eisenhorn"],
    req: {
      minAge: 18,
      minYear: 240,
      maxYear: 495,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral", "death"],
      excludeTags: [
        "met_eisenhorn",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "lord_inquisitor", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyTags: ["inquisition_agent", "inquisitor", "arbites"] },
        { stats: { Int: 48, WP: 46 } }
      ]
    },
    reqLabel: "240~495.M41 · 이단심문소·아르비테스 또는 지성48+ 의지46+",
    weight: 26,
    text: "비 내리는 낡은 고서점 골목에서 긴 검은 코트를 걸치고 고대 룬 검을 찬 이단심문관 그레고르 아이젠혼이 조용히 길을 막아선다. 그의 얼굴에는 오랜 세월의 상처와 꺾이지 않는 의지가 서려 있다. '오르도 제노스의 이름으로 묻겠소. 제국을 구하기 위해서라면, 당신은 어디까지 선을 넘을 수 있소?'",
    choices: [
      {
        label: "[지성 판정] 아이젠혼이 추적 중인 외계 유물 밀수망의 암호 장부를 해독해 건넨다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "아이젠혼이 짧게 고개를 끄덕였다. '예리하군. 이단심문소에는 자네 같은 눈이 필요하오.' 비밀 연락 인장과 깊은 신임을 얻었다!",
          stats: { Int: 6, WP: 5, Inf: 8 },
          addTags: ["met_eisenhorn", "inquisition_favor"]
        },
        fail: {
          text: "암호의 함정에 걸려 정신적 역풍을 맞았으나, 아이젠혼이 사이킥 제어로 그대를 구해 주었다.",
          wounds: -12,
          corruption: 4,
          stats: { Int: 3 },
          addTags: ["met_eisenhorn"]
        }
      },
      {
        label: "어떠한 목적도 이단을 정당화할 수 없다며 청교도적 원칙을 당당히 밝힌다",
        effect: {
          text: "아이젠혼이 씁쓸한 미소를 지었다. '나 역시 한때는 그리 확신했지. 그 순수함을 부디 오래 지키시오.'",
          stats: { WP: 6, Inf: 4 },
          faith: 8,
          corruption: -6,
          addTags: ["met_eisenhorn"]
        }
      }
    ],
    source: "Eisenhorn: Xenos / Malleus / Hereticus"
  },
  {
    id: "ev_named_grimnar",
    title: "펜리스의 늙은 늑대 — 그레이트 울프 로간 그림나르",
    category: "네임드 조우",
    once: true,
    characters: ["grimnar"],
    req: {
      minAge: 16,
      minYear: 900,
      excludeTags: [
        "met_grimnar", "custodes", "high_lord_terra", "chapter_master",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["fenris", "armageddon"] },
        { anyChapters: ["space_wolves"] },
        { anyTags: ["astartes", "militarum", "officer"] }
      ]
    },
    reqLabel: "900.M41+ · 펜리스·아마겟돈 또는 스페이스 울프·제국군",
    weight: 26,
    text: "거대한 늑대 모피를 두른 터미네이터 갑주 차림의 전사왕 로간 그림나르가 모닥불 앞에서 호탕하게 웃으며 커다란 뿔잔을 내민다! '어이, 전사여! 펜리스의 독주 묠드를 한 모금 마시고 네 무용담을 들려주지 않겠나? 겁먹으면 늑대 사가에 못 오른다!'",
    choices: [
      {
        label: "[강인 판정] 필멸자의 장기를 녹일 듯한 펜리스 독주 묠드를 단숨에 들이켠다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "불덩이 같은 술을 버텨 내자 그림나르가 폭소를 터뜨리며 커다란 손으로 등을 두드렸다! '하하하! 늑대의 심장을 가졌군!'",
          stats: { T: 6, Fel: 6, WP: 5, Inf: 6 },
          addTags: ["met_grimnar"]
        },
        fail: {
          text: "한 모금 만에 눈앞이 핑 돌며 쓰러졌으나, 다음 날 아침 그림나르가 '배짱만큼은 합격이다'라며 늑대 송곳니 부적을 남겨 두었다.",
          wounds: -10,
          stats: { T: 3, Fel: 3 },
          addTags: ["met_grimnar"]
        }
      },
      {
        label: "전투에서 목격한 전우들의 희생담을 진중하게 읊으며 늑대왕에게 예를 갖춘다",
        effect: {
          text: "로간 그림나르가 웃음을 거두고 진지하게 고개를 숙였다. '죽은 전사들의 이름을 잊지 않는 자가 진정한 영웅이다.'",
          stats: { WP: 5, Fel: 5, Inf: 5 },
          addTags: ["met_grimnar"]
        }
      }
    ],
    source: "Lexicanum: Logan Grimnar / The Emperor's Gift"
  },
  {
    id: "ev_named_tushan",
    title: "불꽃 속의 거인 — 샐러맨더 챕터 마스터 투샨",
    category: "네임드 조우",
    once: true,
    characters: ["tushan"],
    req: {
      minAge: 14,
      minYear: 941,
      excludeTags: [
        "met_tushan", "dreadnought", "custodes",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["nocturne", "armageddon"] },
        { anyChapters: ["salamanders"] },
        { anyTags: ["armageddon_3_vet", "armageddon_hero"] }
      ]
    },
    reqLabel: "941.M41+ · 녹턴·아마겟돈 또는 샐러맨더",
    weight: 28,
    text: "잿빛 화염과 붉은 눈빛을 지닌 거대한 아스타르테스, 샐러맨더 챕터 마스터 투샨이 무너진 대피소 대들보를 맨손으로 떠받친 채 피난민들을 대피시키고 있다! 그가 그대를 향해 낮고 따뜻한 목소리로 외친다. '이쪽이다! 아직 아이들이 남아 있다. 함께 길을 열자!'",
    choices: [
      {
        label: "[강인 판정] 화염이 덮친 대피소 안으로 들어가 남은 부상자들을 끝까지 끌어낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "투샨이 그대의 용기에 감탄하며 직접 녹턴식 화염 내성 망토를 둘러 주었다. '황제의 가장 귀한 보물은 강철이 아니라 바로 이 생명들이다.'",
          stats: { T: 6, Fel: 6, WP: 5, Inf: 6 },
          faith: 10,
          addTags: ["met_tushan"]
        },
        fail: {
          text: "연기를 마시고 화상을 입었으나, 투샨이 거대한 팔로 그대와 피난민을 함께 끌어안고 화염 밖으로 뛰쳐나왔다!",
          wounds: -14,
          stats: { T: 3, Fel: 4 },
          addTags: ["met_tushan"]
        }
      },
      {
        label: "대피소 밖 화망을 통제하며 오크 습격대가 접근하지 못하게 엄호 사격을 퍼붓는다",
        effect: {
          text: "빈틈없는 엄호 덕에 피난민 대열이 무사히 빠져나갔다. 투샨이 가슴에 주먹을 대며 깊은 감사를 표했다.",
          stats: { BS: 5, WP: 4, Inf: 4 },
          addTags: ["met_tushan"]
        }
      }
    ],
    source: "Helsreach / Codex: Salamanders"
  },
  {
    id: "ev_named_valoris",
    title: "황금 옥좌의 수호자 — 캡틴-제너럴 트라얀 발로리스",
    category: "네임드 조우",
    once: true,
    characters: ["valoris"],
    req: {
      minAge: 18,
      minYear: 999,
      excludeTags: [
        "imperial_nihilus", "met_valoris",
        "captain_general", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["terra"] },
        { anyTags: ["custodes", "inquisitor", "hero_of_imperium", "lions_gate_vet"] }
      ]
    },
    reqLabel: "999.M41+ · 신성한 테라 또는 쿠스토데스·고위 영웅",
    weight: 26,
    text: "황궁 사자의 문 외곽 전략 회의실, 사자 가죽 망토와 고대 파워 도끼 '와처스 액스'를 든 아뎁투스 쿠스토데스 최고 사령관 트라얀 발로리스가 황금빛 침묵 속에 걸음을 멈춘다. 그의 손목에서는 시간을 조작하는 고대 유물 '모멘트 샤클'이 희미하게 맥동한다. '옥좌의 뜻은 논쟁이 아니라 집행이다. 네가 본 테라의 위협을 고하라.'",
    choices: [
      {
        label: "[지성 판정] 황궁 외곽의 수상한 잠입 흔적과 안보 허점을 침착하게 브리핑한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "발로리스가 고개를 끄덕이며 '황금 근위대의 눈이 닿지 못한 틈을 잘 짚었군'이라 치하했다. 테라 하이 로드 회의에서도 통하는 황궁 출입 인장이 하사되었다!",
          stats: { Int: 6, WP: 6, Inf: 12 },
          addTags: ["met_valoris"]
        },
        fail: {
          text: "황금 근위대 총사령관의 냉철한 반문에 말문이 막혀 보고를 끝맺지 못했고, 그는 이미 모든 변수를 파악하고 있었다는 듯 미동 없이 돌아섰다.",
          stats: { WP: 2, Inf: -2 },
          addTags: ["met_valoris"]
        }
      },
      {
        label: "황금 옥좌를 향해 경건히 예를 올리고 부여된 수비 임무에 매진한다",
        effect: {
          text: "만 명의 수호자를 이끄는 반신의 위용을 목격한 기억이 영원한 자부심이 되었다.",
          stats: { WP: 5, Inf: 6 },
          faith: 10,
          addTags: ["met_valoris"]
        }
      }
    ],
    source: "Watchers of the Throne / Codex: Adeptus Custodes"
  },
  {
    id: "ev_named_lion",
    title: "안개 숲에서 돌아온 사자 — 라이온 엘 존슨",
    category: "네임드 조우",
    once: true,
    characters: ["lion"],
    req: {
      minAge: 15,
      minYear: 1020,
      excludeTags: [
        "met_lion",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { allTags: ["imperial_nihilus"] },
        { anyChapters: ["dark_angels"] }
      ]
    },
    reqLabel: "020.M42+ · 임페리움 니힐루스 또는 다크 엔젤",
    weight: 30,
    text: "카오스 약탈자들에게 포위되어 끝장나려던 찰나, 잿빛 전장에 기이한 고대 칼리반의 숲 안개가 피어오르더니 황제의 방패와 대검 '피얼티'를 든 백발의 프라이마크, 라이온 엘 존슨이 안개를 뚫고 걸어 나왔다! 단 몇 번의 검격으로 적 카오스 터미네이터들이 쓰러진 뒤, 사자가 그대를 향해 손을 내민다. '일어나라. 암흑 속에서도 인류는 버려지지 않았다.'",
    choices: [
      {
        label: "[백병 판정] 사자의 곁에서 검을 들고 포위된 성채의 잔적을 함께 소탕한다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "프라이마크의 방패에서 뿜어져 나온 황금 충격파가 적군을 날려 버렸다! 라이온 엘 존슨이 그대의 용맹을 인정해 '라이온의 보호령' 수호 기사단 증표를 내렸다!",
          stats: { WS: 7, WP: 7, Inf: 10 },
          faith: 12,
          addTags: ["met_lion"]
        },
        fail: {
          text: "반신의 속도를 따라잡다 부상을 입었으나, 프라이마크가 직접 방패로 포화를 막아 주며 그대를 구해 냈다!",
          wounds: -12,
          stats: { WS: 4, WP: 5, Inf: 6 },
          addTags: ["met_lion"]
        }
      },
      {
        label: "고립된 인근 행성들의 좌표와 생존자 명단을 프라이마크에게 바친다",
        effect: {
          text: "라이온이 지도를 품에 넣고 고개를 끄덕였다. '다음 포레스트워크의 목적지는 그곳이다.'",
          stats: { Int: 5, Fel: 6, Inf: 8 },
          addTags: ["met_lion"]
        }
      }
    ],
    source: "The Lion: Son of the Forest / Arks of Omen: The Lion"
  },
  {
    id: "ev_named_amberley_vail",
    title: "각주 속의 진실 — 오르도 제노스 이단심문관 앰벌리 베일",
    category: "네임드 조우",
    once: true,
    characters: ["amberley_vail"],
    req: {
      minAge: 18,
      minYear: 931,
      maxYear: 1018,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["krieg", "feral", "death"],
      excludeTags: [
        "imperial_nihilus", "met_amberley_vail",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "lord_inquisitor", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyTags: ["inquisition_agent", "inquisitor", "commissar", "militarum", "noble"] },
        { anyWorlds: ["valhalla"] }
      ]
    },
    reqLabel: "931.M41~018.M42 · 이단심문소·군·귀족 또는 발할라",
    weight: 28,
    text: "총독궁 연회장에서 오페라 가수로 위장해 있던 우아한 여인이 샴페인 잔 너머로 은밀히 로제트를 비춘다. 오르도 제노스 이단심문관 앰벌리 베일이다! '어머, 커미사르 케인의 선전 포스터만 믿고 계신 건 아니시겠죠? 저쪽 무역상 일행 중에 타우·진스틸러 밀수책이 섞여 있답니다. 잠시 눈과 귀가 되어 주시겠어요?'",
    choices: [
      {
        label: "[교섭 판정] 사교계 대화를 유도해 밀수책의 암호 문양과 접선 장소를 파악한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "완벽한 연기로 용의자들의 입을 열게 만들었다! 앰벌리 베일이 흡족하게 웃으며 이단심문소 비밀 추천서와 고급 아마섹 한 병을 선물했다.",
          stats: { Fel: 6, Int: 5, Inf: 8 },
          addTags: ["met_amberley_vail", "inquisition_favor"]
        },
        fail: {
          text: "용의자에게 눈치를 채여 소동이 벌어졌으나, 베일의 수행원들이 순식간에 제압해 주었다.",
          wounds: -10,
          stats: { Int: 3 },
          addTags: ["met_amberley_vail"]
        }
      },
      {
        label: "위장 수사의 후방 경계를 맡아 도주로만 철저히 차단한다",
        effect: {
          text: "조용하지만 확실한 지원 덕에 오르도 제노스 체포 작전이 깔끔하게 마무리되었다.",
          stats: { BS: 4, WP: 4, Inf: 5 },
          addTags: ["met_amberley_vail"]
        }
      }
    ],
    source: "Lexicanum: Amberley Vail / Ciaphas Cain: For the Emperor"
  },
  {
    id: "ev_named_grimaldus",
    title: "헬스리치의 웅변 — 블랙 템플러 수석 채플린 메렉 그리말두스",
    category: "네임드 조우",
    once: true,
    characters: ["grimaldus"],
    req: {
      minAge: 15,
      minYear: 998,
      maxYear: 1040,
      excludeTags: [
        "met_grimaldus",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["armageddon"] },
        { anyChapters: ["black_templars"] },
        { anyTags: ["militarum", "armageddon_3_vet", "sororitas"] }
      ]
    },
    reqLabel: "998.M41+ · 아마겟돈·블랙 템플러·제국군",
    weight: 28,
    text: "잿더미가 된 성벽 위로 해골 투구를 쓴 블랙 템플러 수석 채플린 메렉 그리말두스가 올라섰다! 압도적인 적 대군 앞에 얼어붙은 병사들을 향해 그의 복스 확성기가 우레처럼 울려 퍼진다. '나는 헬스리치의 영웅이 아니다! 영웅은 여기 서 있는 너희 모두다! 오늘 이 자리에서 나와 함께 싸우겠는가!'",
    choices: [
      {
        label: "[의지 판정] 그리말두스의 포효에 화답해 크로지우스의 빛을 따라 최선두로 돌격한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "공포가 흔적도 없이 타올라 사라졌다! 해골 투구의 수석 채플린 곁에서 성벽을 사수해 내며 불굴의 신앙을 가슴에 새겼다.",
          stats: { WP: 8, WS: 5, Inf: 7 },
          faith: 16,
          addTags: ["met_grimaldus"]
        },
        fail: {
          text: "적의 집중 포화에 휩쓸려 부상을 입었으나, 그리말두스가 외친 맹세를 되뇌며 끝내 전선을 이탈하지 않았다.",
          wounds: -18,
          stats: { WP: 5 },
          faith: 10,
          addTags: ["met_grimaldus"]
        }
      },
      {
        label: "탄약 보급과 부상병 후송을 독려하며 수석 채플린의 연설이 꺼지지 않게 방어선을 지탱한다",
        effect: {
          text: "성벽이 무너지기 직전까지 단 한 발의 볼터 탄약도 끊기지 않았다. 전투 후 그리말두스가 말없이 가슴에 주먹을 얹어 경의를 표했다.",
          stats: { Fel: 5, T: 4, Inf: 5 },
          faith: 10,
          addTags: ["met_grimaldus"]
        }
      }
    ],
    source: "Helsreach / Codex: Black Templars"
  },
  {
    id: "ev_named_azrael",
    title: "비밀의 검과 사자의 투구 — 슈프림 그랜드 마스터 아즈라엘",
    category: "네임드 조우",
    once: true,
    characters: ["azrael"],
    req: {
      minAge: 18,
      minYear: 939,
      maxYear: 1045,
      excludeTags: [
        "met_azrael",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyChapters: ["dark_angels"] },
        { anyTags: ["astartes", "inquisitor", "officer", "hero_of_imperium"] }
      ]
    },
    reqLabel: "939.M41+ · 다크 엔젤 또는 아스타르테스·고위 지휘관",
    weight: 28,
    text: "이동 요새 '더 락'의 침묵 어린 전략실. 작은 로브를 두른 정체불명의 '어둠 속의 감시자'가 사자의 투구를 받쳐 든 곁에 다크 엔젤 슈프림 그랜드 마스터 아즈라엘이 서 있다. 그의 날카로운 시선이 그대의 작전 보고서를 꿰뚫는다. '이 성계의 진실 가운데, 네가 입 밖으로 꺼내지 말아야 할 것이 무엇인지 알고 있겠지?'",
    choices: [
      {
        label: "[지성 판정] 제1군단의 기밀에 대한 철저한 침묵을 서약하고 완벽한 협동 공성안을 제시한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "아즈라엘이 비밀의 검 자루에 손을 얹고 묵직하게 고개를 끄덕였다. '침묵과 정밀함이야말로 승리의 열쇠다.' 다크 엔젤 최고 사령관의 신뢰를 얻었다!",
          stats: { Int: 6, WP: 6, BS: 4, Inf: 8 },
          addTags: ["met_azrael"]
        },
        fail: {
          text: "무심코 금기된 단어를 입에 올릴 뻔해 실내의 공기가 얼어붙었다. 아즈라엘의 차가운 경고 속에 가까스로 회의를 마쳤다.",
          stats: { WP: 4, Inf: -2 },
          addTags: ["met_azrael"]
        }
      },
      {
        label: "묻지도 캐묻지도 않은 채 제1군단이 지목한 적 거점 타격 임무에만 전념한다",
        effect: {
          text: "군더더기 없는 복종과 플라즈마 화력 지원으로 합동 작전을 완수했다.",
          stats: { BS: 5, WP: 4, Inf: 4 },
          addTags: ["met_azrael"]
        }
      }
    ],
    source: "Lexicanum: Azrael / Codex: Dark Angels"
  },
  {
    id: "ev_named_creed",
    title: "카디아의 천재 전술가 — 카디아 제8연대 사령관 우르사카르 크리드",
    category: "네임드 조우",
    once: true,
    characters: ["creed"],
    req: {
      minAge: 14,
      minYear: 970,
      maxYear: 999,
      excludeTags: [
        "met_creed",
        "astartes", "grey_knight", "custodes", "dreadnought",
        "high_lord_terra", "warmaster",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["cadia"] },
        { anyTags: ["militarum", "officer", "commissar", "scion"] }
      ]
    },
    reqLabel: "970~999.M41 · 카디아 또는 제국 군무",
    weight: 34,
    text: "포연 자욱한 카디아 방어선 지휘소, 굵은 시가를 문 떡 벌어진 어깨의 사령관 우르사카르 크리드가 홀로그램 전술판을 내려다보고 있다. 카오스 기갑 사단이 측면을 돌파하려는 절체절명의 순간, 크리드가 씩 웃으며 덤불 뒤에 숨겨 두었던 초중전차 베인블레이드 중대의 기습 기동을 명한다!",
    choices: [
      {
        label: "[지성 판정] 크리드의 변칙 역포위 전술을 즉각 이해하고 인접 연대에 완벽한 합동 사격 좌표를 전달한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'기막힌 눈썰미군!' 크리드의 기습 기동이 적 선봉대를 순식간에 분쇄했고, 카디아의 명장이 직접 그대의 어깨를 두드리며 치하했다.",
          stats: { Int: 7, BS: 4, Inf: 9 },
          addTags: ["met_creed"]
        },
        fail: {
          text: "지시 전달이 한 박자 늦어 적 포격에 부상을 입었으나, 크리드의 천재적인 예비대 투입 덕분에 전선은 끝내 버텨 냈다.",
          wounds: -18,
          stats: { Int: 3 },
          addTags: ["met_creed"]
        }
      },
      {
        label: "[사격 판정] 크리드의 지휘 기치가 펄럭이는 최전선 방벽에서 흔들리지 않는 일제 사격으로 적을 몰아낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "'카디아는 서 있다!' 사령관과 나란히 선 방벽에서 쏟아진 라스건 화망이 적 돌격대를 갈아 버렸다.",
          stats: { BS: 6, WP: 6, Inf: 6 },
          faith: 8,
          addTags: ["met_creed"]
        },
        fail: {
          text: "파편에 다리를 스쳤으나, 한 치도 물러서지 않는 크리드의 기세에 힘입어 끝까지 자리를 지켰다.",
          wounds: -16,
          stats: { WP: 4 },
          addTags: ["met_creed"]
        }
      },
      {
        label: "크리드 사령관의 전술 지시에 따라 보급 탄약과 전령선을 빈틈없이 유지한다",
        effect: {
          text: "명장의 전술은 현장의 성실한 손발이 있어야 완성된다. 그대의 헌신 속에 카디아의 방벽은 오늘도 버텨 냈다.",
          stats: { WP: 4, Int: 3, Inf: 4 },
          addTags: ["met_creed"]
        }
      }
    ],
    source: "Lexicanum: Ursarkar E. Creed / Fall of Cadia"
  },
  {
    id: "ev_named_ghazghkull",
    title: "와아아의 예언자 — 가즈쿨 막 우룩 스라카의 광포한 진격",
    category: "네임드 조우",
    once: true,
    characters: ["ghazghkull"],
    req: {
      minAge: 16,
      minYear: 941,
      excludeTags: [
        "met_ghazghkull",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      or: [
        { anyWorlds: ["armageddon"] },
        { anyTags: ["militarum", "astartes", "sororitas", "commissar", "officer", "scion"] }
      ]
    },
    reqLabel: "941.M41+ · 아마겟돈 또는 제국 전투 직군",
    weight: 30,
    text: "대지가 찢어질 듯한 굉음과 함께 전차만 한 거구의 오크 워보스가 강철 방벽을 맨손으로 뜯어내며 걸어 나온다! '와아아의 예언자' 가즈쿨 막 우룩 스라카다! 그의 메가 아머가 탄환을 튕겨 내며 거대한 파워 클로가 그대의 방어선을 향해 내리꽂힌다!",
    choices: [
      {
        label: "[사격 판정] 중화기와 대전차 포대의 집중 사격을 가즈쿨의 발밑에 퍼부어 진격 속도를 늦춘다",
        check: { stat: "BS", diff: -10 },
        success: {
          text: "초대형 오크 군주의 얼굴에 멜타 광선을 정통으로 꽂아 넣어 잠시 주춤하게 만들었다! 가즈쿨이 '오호, 꽤 쏠 줄 아는 쪼그만 놈이네!'라며 호탕하게 웃고 지나간 사이 전선이 재정비되었다!",
          stats: { BS: 7, WP: 7, Inf: 9 },
          wounds: -12,
          addTags: ["met_ghazghkull", "armageddon_hero"]
        },
        fail: {
          text: "충격파와 모크의 포효 탄막에 날아가 중상을 입었으나, 기적적으로 살아남아 공포의 목격자가 되었다.",
          wounds: -28,
          stats: { T: 4, WP: 4 },
          addTags: ["met_ghazghkull"]
        }
      },
      {
        label: "[의지 판정] 공포에 얼어붙은 아군 병사들을 다독여 가즈쿨의 직격 경로를 피해 측면 방어선으로 질서 있게 철수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "무모한 옥쇄 대신 수백 명의 아군을 살려 내어 다음 반격의 불씨를 지켰다! 냉철한 판단력에 사령부가 경의를 표했다.",
          stats: { WP: 7, Int: 5, Fel: 5 },
          addTags: ["met_ghazghkull"]
        },
        fail: {
          text: "철수 도중 오크 노브 무리의 추격에 큰 상처를 입었으나 끝내 포위망을 빠져나왔다.",
          wounds: -22,
          stats: { Ag: 3 },
          addTags: ["met_ghazghkull"]
        }
      },
      {
        label: "폐허 방벽 뒤에 몸을 낮추고 거대한 오크 대군주의 정면 돌격을 피한 채 우회로를 확보한다",
        effect: {
          text: "고막이 터질 듯한 '와아아아!' 함성과 포화가 지나간 뒤 잿더미 속에서 전열을 추슬렀다. 괴물의 정면 진격을 넘기고 살아남아 반격의 기회를 건졌다.",
          stats: { T: 4, WP: 4 },
          wounds: -12,
          addTags: ["met_ghazghkull"]
        }
      }
    ],
    source: "Lexicanum: Ghazghkull Mag Uruk Thraka / Codex: Orks"
  },
  {
    id: "ev_named_abaddon",
    title: "호루스의 발톱과 드라크니옌 — 약탈자 아바돈의 강림",
    category: "네임드 조우",
    once: true,
    characters: ["abaddon"],
    req: {
      minAge: 16,
      minYear: 990,
      excludeTags: ["met_abaddon"],
      or: [
        { anyWorlds: ["cadia"] },
        { anySegmenta: ["obscurus"] },
        { anyTags: ["astartes", "inquisitor", "custodes", "grey_knight", "chaos_aligned"] }
      ]
    },
    reqLabel: "990.M41+ · 카디아·옵스쿠루스 또는 고위/카오스 직군",
    weight: 30,
    text: "검은 번개가 하늘을 가르고, 1만 년 증오를 두른 블랙 리전의 총사령관 '약탈자 아바돈'이 터미네이터 친위대 브링어 오브 디스페어를 거느리고 전장에 강림했다! 한 손에는 프라이마크를 벤 호루스의 발톱이 번뜩이고, 다른 손에는 악마검 드라크니옌이 절규하고 있다.",
    choices: [
      {
        label: "[의지 판정] 워마스터의 압도적 살기 앞에서도 무릎 꿇지 않고 황제의 이름을 외치며 지연 방어전을 지휘한다",
        req: { excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -15 },
        success: {
          text: "아바돈의 차가운 시선 앞에서 끝내 버텨 내며 아군 증원 함대가 궤도 포격을 내릴 시간을 벌었다! 전설적인 불굴의 영웅으로 기록되었다.",
          stats: { WP: 9, Inf: 10 },
          faith: 14,
          wounds: -18,
          addTags: ["met_abaddon", "hero_of_imperium"]
        },
        fail: {
          text: "드라크니옌이 뿜어 낸 끔찍한 파괴 충격파에 치명상을 입고 쓰러졌으나, 아군 구원대가 기적적으로 끌어내어 목숨을 건졌다.",
          wounds: -32,
          stats: { WP: 5 },
          addTags: ["met_abaddon"]
        }
      },
      {
        label: "[이단 전용] 카오스의 워마스터 앞에 한쪽 무릎을 꿇고 은하를 불태울 블랙 크루세이드에 서약한다",
        req: { anyTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        effect: {
          text: "아바돈이 냉혹한 눈빛으로 그대의 쓸모를 저울질한 뒤 블랙 리전의 선봉 표식을 던져 주었다. 암흑의 권위가 크게 치솟았다.",
          stats: { Inf: 12, WS: 6, WP: 5 },
          corruption: 18,
          addTags: ["met_abaddon", "chaos_aligned"]
        }
      },
      {
        label: "정면 대결은 무모한 소모전이다. 엄폐물 사이로 퇴로를 열어 핵심 지휘부와 병력을 구출한다",
        effect: {
          text: "검은 군단의 학살 속에서 살아남아 워마스터의 진격 방향을 사령부에 보고했다. 살아남은 증언이 천 명의 병사보다 귀하다.",
          stats: { Ag: 5, Int: 5, WP: 4 },
          wounds: -14,
          addTags: ["met_abaddon"]
        }
      }
    ],
    source: "Lexicanum: Ezekyle Abaddon / Fall of Cadia"
  },
  {
    id: "ev_s4_met_primarchs_echo",
    title: "거인들과 마주했던 날의 여파 — 제국 지휘부의 시선과 기대",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      anyTags: [
        "met_guilliman",
        "met_lion",
        "met_valoris",
        "met_dante",
        "met_calgar",
        "met_grimnar",
        "met_tushan",
        "met_azrael"
      ]
    },
    reqLabel: "프라이마크 · 섭정 · 챕터 마스터급 조우 이력",
    weight: 34,
    text: "그대가 인류제국의 최정점에 선 거인들과 직접 대면했다는 소문이 성계 사령부까지 퍼져 나갔다. 교착 상태에 빠진 작전 회의 도중, 고위 장교와 귀족 대표들이 돌연 그대에게 시선을 집중하며 '위대한 분의 뜻'을 대변해 달라고 압박하기 시작했다.",
    choices: [
      {
        label: "[교섭 판정] 그때 목격한 냉철한 결단과 책임의 무게를 전하며 분열된 지휘부를 하나로 묶는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "허세를 부리지 않고 전설의 가르침을 차분히 옮기자 회의장의 소음이 단숨에 가라앉았다! 양측 지휘부가 그대의 중재안을 만장일치로 채택했다.",
          stats: { Fel: 7, Inf: 8, WP: 4 },
          faith: 5
        },
        fail: {
          text: "권위를 빌리려는 속내를 들켜 귀족 파벌의 냉소적인 견제를 받게 되었다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 이름값에 기대는 풍토를 잘라 내고 오직 보급 수치와 전술 도면만으로 작전을 정리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "감상과 아첨을 배제한 명쾌한 분석에 참모진이 고개를 숙였다. 진정으로 위대한 존재를 곁에서 본 자다운 냉철함이었다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "명쾌한 논리였으나 정치적 체면을 중시하던 고위직들의 반발로 안건 일부가 보류되었다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "나는 그저 분수에 맞게 임무를 수행했을 뿐이라며 조용히 뒷줄로 물러난다",
        effect: {
          text: "권력의 소용돌이에 휘말리지 않고 본연의 자리를 지켰다. 겸손한 태도가 도리어 실무진의 깊은 신뢰를 샀다.",
          stats: { WP: 5, Inf: 3 }
        }
      }
    ],
    source: "Dark Imperium / Codex: Space Marines / Lexicanum: Indomitus Crusade"
  },
  {
    id: "ev_s4_met_commanders_echo",
    title: "전장의 전설이 남긴 이름값 — 흔들리는 방어선과 막사의 소문",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      anyTags: [
        "met_yarrick",
        "met_creed",
        "met_gaunt",
        "met_cain",
        "met_marbo",
        "met_grimaldus"
      ]
    },
    reqLabel: "전설적 지휘관 · 커미사르 · 영웅 조우 이력",
    weight: 34,
    text: "포격이 멎지 않는 전초 기지에서 신병들 사이에 은밀한 속삭임이 돌았다. 제국 전역에 이름을 떨친 전설적 지휘관과 같은 전장을 밟았던 고참이 바로 여기 있다는 소문이었다. 적의 야습 경보가 울린 순간, 공포에 질린 병사들의 시선이 일제히 그대에게 쏠렸다.",
    choices: [
      {
        label: "[의지 판정] 방벽 위로 올라 전설들에게 배운 불굴의 구호를 외치며 병사들의 사기를 끌어올린다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 호령에 얼어붙어 있던 신병들이 일제히 라스건을 치켜들고 화망을 열었다! 무너질 뻔한 전초 기지가 기적처럼 버텨 냈다.",
          stats: { WP: 7, Fel: 6, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "선두에 나서다 파편에 스쳤으나, 끝까지 물러서지 않은 모습 덕분에 패주만은 막았다.",
          wounds: -15,
          stats: { WP: 4, T: 2 }
        }
      },
      {
        label: "[사격 판정] 영웅담 따윈 필요 없다며 직접 중화기 사격 통제를 잡아 적의 돌파구를 차단한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 십자포화가 적 선봉을 갈아 버렸다! 병사들은 전설의 곁에서 살아남은 자의 실력이 헛소문이 아니었음을 깨달았다.",
          stats: { BS: 7, WS: 3, Inf: 5 }
        },
        fail: {
          text: "탄약이 떨어질 때까지 격전을 치르며 부상을 입었으나, 기지 본관은 지켜 냈다.",
          wounds: -14,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "과장된 소문을 잠재우고 각 분대에 기본 방어 교본과 퇴로 확보를 차분히 지시한다",
        effect: {
          text: "영웅은 신화가 아니라 살아남아 임무를 마치는 자라는 교훈을 되새겼다. 부대의 피해가 크게 줄었다.",
          stats: { Int: 4, T: 4 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Helsreach / Gaunt's Ghosts"
  },
  {
    id: "ev_s4_met_shadows_echo",
    title: "봉인된 이름의 그림자 — 상층부 밀사의 은밀한 탐문",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      anyTags: [
        "met_eisenhorn",
        "met_amberley_vail",
        "met_cawl",
        "met_celestine"
      ]
    },
    reqLabel: "아이젠혼 · 앰벌리 베일 · 카울 · 성녀 셀레스틴 조우 이력",
    weight: 34,
    text: "늦은 밤, 인장 없는 검은 봉투를 든 밀사가 그대의 거처를 찾아왔다. 그대가 과거 이단심문소 거물이나 화성의 대현자, 혹은 살아 있는 성녀와 얽혔던 사건 기록이 상층부에서 재검토되고 있으며, 그날의 진실을 증언해 주면 막대한 보상을 내리겠다는 위험한 제안이었다.",
    choices: [
      {
        label: "[지성 판정] 밀사가 속한 파벌의 의도를 역으로 캐내어 제국 공식 보고서 선에서만 교묘히 빠져나간다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 하나의 빌미도 남기지 않고 상대의 뒷배까지 파악해 냈다! 밀사는 식은땀을 흘리며 두 번 다시 찾아오지 않겠다고 물러났다.",
          stats: { Int: 7, Inf: 6, WP: 4 }
        },
        fail: {
          text: "말실수를 노린 유도 심문에 말려 잠시 감시 대상에 올랐으나, 가까스로 혐의를 벗었다.",
          stats: { Inf: -3, WP: 2 }
        }
      },
      {
        label: "[의지 판정] 황제와 제국의 비밀은 거래 대상이 아니라며 밀사를 문전박대하고 침묵을 지킨다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "그대의 강직한 침묵이 오히려 본래 만났던 거물의 정보망에 보고되어 은밀한 신임과 후원으로 되돌아왔다!",
          stats: { WP: 7, Inf: 5 },
          faith: 6,
          corruption: -4
        },
        fail: {
          text: "보복성 암살 시도를 가까스로 막아 내며 상처를 입었으나 비밀만큼은 지켜 냈다.",
          wounds: -15,
          stats: { WP: 5 }
        }
      },
      {
        label: "이미 공식 서고에 제출된 내용 외에는 기억나는 바가 없다며 정중히 면담을 끝낸다",
        effect: {
          text: "거대한 권력 암투의 틈바구니에서 몸을 낮추는 것이 오래 살아남는 길이다.",
          stats: { Fel: 4, WP: 3 }
        }
      }
    ],
    source: "Eisenhorn Trilogy / Ciaphas Cain Novels / Belisarius Cawl: The Great Work / Celestine: The Living Saint"
  },
  {
    id: "ev_s4_met_nemesis_echo",
    title: "대적자를 목격한 생존자 — 밤마다 되살아나는 포효와 검의 환영",
    category: "네임드 후일담",
    once: true,
    req: {
      minAge: 16,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      anyTags: ["met_abaddon", "met_ghazghkull"]
    },
    reqLabel: "약탈자 아바돈 또는 가즈쿨 조우 생존자",
    weight: 36,
    text: "은하를 불태우는 최악의 대적자를 두 눈으로 직접 마주하고도 살아남은 자는 제국 전체를 통틀어도 손에 꼽는다. 그러나 그날의 기억은 쉽게 지워지지 않는다. 칠흑 같은 마검의 비명이나 성계를 뒤흔들던 와아아의 포효가 오늘 밤에도 그대의 잠자리를 찢어 놓는다.",
    choices: [
      {
        label: "[의지 판정] 공포를 불타는 증오로 벼려 내고 대적자의 전술 습성을 전술 교범으로 정리한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "악몽을 이겨 내고 작성한 대적자 대응 보고서가 성역 사령부 일급 기밀 교본으로 채택되었다! 그대는 공포마저 무기로 삼았다.",
          stats: { WP: 8, Int: 5, Inf: 7 },
          faith: 6,
          corruption: -6
        },
        fail: {
          text: "기억을 되짚는 과정에서 극심한 정신적 탈진에 빠져 의무대에서 며칠을 보냈다.",
          wounds: -12,
          stats: { WP: 3 }
        }
      },
      {
        label: "[백병 판정] 악몽이 밀려올 때마다 훈련장에서 피투성이가 되도록 검과 총기를 휘두르며 육신을 단련한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "다음번에 다시 마주친다면 결코 물러서지 않으리라 다짐하며 전투 기량을 한 단계 끌어올렸다!",
          stats: { WS: 7, T: 5, BS: 3 }
        },
        fail: {
          text: "무리한 야간 훈련으로 근육이 파열되었으나 전의만큼은 식지 않았다.",
          wounds: -14,
          stats: { WS: 4 }
        }
      },
      {
        label: "고요히 기도하며 살아남은 오늘 하루에 감사하고 동료들의 곁을 지킨다",
        effect: {
          text: "괴물의 그림자에 영혼을 잠식당하지 않기로 결심했다. 평온한 일상이 서서히 마음을 달랬다.",
          stats: { WP: 5 },
          faith: 5,
          corruption: -4
        }
      }
    ],
    source: "Lexicanum: Abaddon the Despoiler / Ghazghkull Mag Uruk Thraka"
  }
);
