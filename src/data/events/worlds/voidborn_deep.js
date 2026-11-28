// 분기 사건 — 보이드본 심화 및 첫 지표 상륙 아크 (Stage 24 · 10건)
export default [
  {
    id: "ev_s24_void_01",
    title: "보이드본 첫 상륙 — 천장 없는 하늘의 현기증",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 14,
      anyHomeWorlds: ["voidborn"],
      excludeWorlds: ["voidborn"],
      excludeRealms: ["heretic"],
      excludeTags: ["shore_leave_void"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "출생: 보이드본 · 행성 지표 체류 중 · 14세+",
    weight: 34,
    leadVariants: [
      {
        req: {
          minSocialTier: "elite",
          or: [
            { anyOriginClasses: ["noble", "high_noble"] },
            { anyTags: ["rt_seneschal", "rogue_trader", "noble"] }
          ]
        },
        lead: "가문의 의전 셔틀 해치가 열리고 붉은 융단 너머로 행성 귀빈 영접대가 도열한 순간, 평생 장갑 관측창 뒤에서만 바라보던 진짜 대기가 뺨을 때렸다."
      },
      {
        req: { anyOriginClasses: ["underclass", "common", "military_caste", "schola", "disowned"] },
        lead: "화물 양륙정의 램프가 철컹이며 내려앉고 하역 인부들 사이에 떠밀려 발을 내디딘 순간, 평생 쇠창살 천장 아래서만 숨 쉬던 폐부로 생경한 바깥 공기가 쏟아져 들어왔다."
      }
    ],
    text: "머리 위를 덮어 주던 강철 격벽도, 인공 중력의 일정한 웅웅거림도 사라졌다. 끝없이 뚫린 잿빛 하늘이 금방이라도 몸을 빨아들일 듯한 광장공포증과 1표준 중력의 묵직한 압박이 두 무릎을 짓눌렀다. 곁의 지표면 안내인은 창백하게 굳은 보이드본의 얼굴을 흥미롭다는 듯 흘깃거렸다.",
    choices: [
      {
        label: "[의지 판정] 숨을 고르고 수평선 끝까지 시선을 고정하며 '천장 없는 세계'의 중력을 온몸으로 버텨 낸다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "어지럼증이 치밀던 찰나 두 발을 대지 위에 단단히 박아 넣었다. 끝없는 하늘 아래에서도 흔들리지 않는 담력을 증명하자, 지표면 안내인이 경외 섞인 눈빛으로 고개를 숙였다. 공허와 대지를 가리지 않는 강철 같은 신경이 단련되었다.",
          stats: { WP: 6, T: 4, Inf: 3 },
          align: { dogmatic: 4 },
          removeTags: ["shell_shocked"],
          addTags: ["shore_leave_void", "iron_nerves"]
        },
        success: {
          text: "어깨를 곧게 펴고 거친 대기 속으로 한 걸음씩 내디뎠다. 귓가를 울리던 이명이 서서히 잦아들며, 비로소 행성의 중력과 드넓은 지평선 아래 서는 법을 몸에 새겼다.",
          stats: { WP: 5, T: 3 },
          addTags: ["shore_leave_void"]
        },
        fail: {
          text: "끝없는 하늘을 올려다본 순간 구역질과 현기증이 몰려와 셔틀 지지대에 손을 짚고 주저앉았다. 한참 만에 겨우 숨을 골랐으나 지표면 사람들의 비웃음을 피하지 못했다.",
          wounds: -8,
          stats: { WP: 2 },
          addTags: ["shore_leave_void"]
        },
        critFail: {
          text: "머리 위가 텅 비어 있다는 공포가 이성을 집어삼켰다. 무릎이 꺾이며 바닥에 쓰러진 채 한동안 고개조차 들지 못했고, 지독한 광장공포의 후유증이 신경 깊숙이 각인되었다.",
          wounds: -14,
          stats: { WP: -2 },
          addTags: ["shore_leave_void", "shell_shocked"]
        }
      },
      {
        label: "[민첩 판정] 무릎을 살짝 굽혀 저중력 보행을 1표준 중력에 맞춰 즉석에서 교정하고 셔틀 그늘을 따라 이동한다",
        check: { stat: "Ag", diff: 0 },
        critSuccess: {
          text: "무게중심을 낮추고 보폭을 정교하게 조절하자, 낯선 행성 중력 아래에서도 보이드본 특유의 유연한 몸놀림이 고스란히 살아났다. 현지 수행원들이 혀를 내두르며 감탄했다.",
          stats: { Ag: 6, Int: 4, Fel: 4 },
          addTags: ["shore_leave_void"]
        },
        success: {
          text: "무거운 발걸음을 빠르게 계산해 균형을 잡았다. 여전히 하늘은 아찔했으나 셔틀 격납고 차양까지 한 번도 휘청이지 않고 걸어 들어갔다.",
          stats: { Ag: 4, Int: 3 },
          addTags: ["shore_leave_void"]
        },
        fail: {
          text: "예상보다 무거운 중력에 발끝이 걸리며 콘크리트 착륙장 바닥에 무릎을 찧었다. 절뚝거리며 겨우 실내 통로로 몸을 옮겼다.",
          wounds: -10,
          stats: { Ag: 2 },
          addTags: ["shore_leave_void"]
        },
        critFail: {
          text: "균형을 잃고 화물 컨테이너 모서리에 옆구리를 세게 들이받았다. 갈비뼈에 멍이 든 채 '연약한 별쥐'라는 조롱을 들으며 부축을 받아야 했다.",
          wounds: -16,
          stats: { Inf: -2 },
          addTags: ["shore_leave_void"]
        }
      },
      {
        label: "착륙장 차양 아래 벽면에 등을 붙인 채 시야를 좁히고, 임무가 끝날 때까지 발끝만 보며 견딘다",
        effect: {
          text: "하늘을 올려다보지 않고 강철 기둥과 발밑 타일에만 시선을 고정했다. 부끄럽지만 무사히 첫 지표 상륙 일정을 마치고 낯선 중력의 기억을 가슴에 새겼다.",
          stats: { Int: 3, WP: 2 },
          addTags: ["shore_leave_void"]
        }
      }
    ],
    source: "Dark Heresy 2e: Core Rulebook (Voidborn) / Rogue Trader Core Rulebook"
  },
  {
    id: "ev_s24_void_02",
    title: "궤도 기항지 — 항만 세관 검문과 보이드본 조각품 거래",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 16,
      anyHabitats: ["void"],
      anyWorlds: ["voidborn"],
      anyHomeWorlds: ["voidborn"],
      maxSocialTier: "elite",
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["inquisitor", "lord_inquisitor", "high_lord_terra", "navy_admiral", "rt_lord_captain"]
    },
    reqLabel: "거주 공간: 성간 함선 · 보이드본 기항지 · 16세+",
    weight: 32,
    text: "수년 만에 정박한 제국 궤도 정거장의 환적 부두에 짧은 상륙 휴가가 떨어졌다. 선원 씨족이 대대로 괴수의 뼈와 황동 탄피로 깎아 만든 성간 부적과 희귀 향신료 꾸러미를 지표면 셔틀 부두의 상인들에게 넘기려던 찰나, 붉은 완장을 찬 항만 세관 감찰관과 무장 검문대가 에어록 통로를 가로막고 통관 서류와 소지품 전수 조사를 요구했다.",
    choices: [
      {
        label: "[로그 트레이더·귀족 전용] 가문의 무역 영장 사본과 정박 관세 면제 인장을 내밀어 당당히 하선 통과한다",
        req: {
          anyTags: ["rt_seneschal", "rogue_trader", "rogue_trader_blood", "noble"],
          excludeTags: ["disowned_noble"]
        },
        effect: {
          text: "황금 밀랍 인장을 확인한 감찰관이 안색을 바꾸며 곧장 검문대를 물렸다. 유유히 셔틀 부두를 거쳐 지표 기항 구역의 생경한 공기와 거래 시장을 직접 체험했다.",
          stats: { Inf: 6, Fel: 4 },
          align: { ruthless: 3, dogmatic: 2 },
          addTags: ["shore_leave_void"]
        }
      },
      {
        label: "[교섭 판정] 세관 감찰관에게 정거장 하선 통행료와 정교한 뼈 조각품 한 점을 슬쩍 쥐여 주고 부두 밖으로 내려선다",
        check: { stat: "Fel", diff: 0 },
        critSuccess: {
          text: "감찰관의 구미를 정확히 짚은 언변 덕분에 관세 면제 도장은 물론 지표 셔틀 우선 탑승권까지 손에 넣었다. 기항지 부두 상인들과의 거래에서도 큰 이득을 남겼다.",
          stats: { Fel: 6, Inf: 5 },
          align: { ruthless: 4 },
          addTags: ["shore_leave_void", "silver_tongue"]
        },
        success: {
          text: "감찰관이 조각품을 외투 안주머니에 찔러 넣으며 조용히 검문 차단기를 열어 주었다. 셔틀을 타고 지표 기항 구역에 잠시 발을 디뎌 귀한 물자를 확보했다.",
          stats: { Fel: 4, Inf: 3 },
          align: { ruthless: 3 },
          addTags: ["shore_leave_void"]
        },
        fail: {
          text: "뇌물 액수가 성에 차지 않았던 감찰관이 규정을 트집 잡아 과태료를 뜯어냈다. 손해는 컸으나 어쨌든 기항지 하선 도장은 받아 냈다.",
          wounds: -6,
          stats: { Inf: -3, Fel: 2 },
          addTags: ["shore_leave_void"]
        },
        critFail: {
          text: "강직한 감찰관이 뇌물 공여 혐의로 짐꾸러미를 전량 압수하고 막대한 항만 벌금 채권을 발행했다. 두들겨 맞은 채 모함으로 쫓겨나 빚만 떠안았다.",
          wounds: -10,
          stats: { Inf: -5 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[지성 판정] 제국 해상 관세법 조항을 조목조목 읊으며 정당한 승무원 개인 유물임을 입증한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "세관 규정의 예외 조항을 정확히 짚어 내자 감찰관이 혀를 차며 통관서에 서명했다. 합법적인 하선 허가를 받아 지표 기항지까지 당당히 다녀왔다.",
          stats: { Int: 5, WP: 3, Inf: 3 },
          align: { dogmatic: 5 },
          addTags: ["shore_leave_void"]
        },
        fail: {
          text: "서류 한 장의 갱신 일자가 지났다는 이유로 조각품은 보관소에 압류되었고, 에어록 대기실에서 반나절을 허비한 채 빈손으로 돌아섰다.",
          stats: { Int: 2, Inf: -2 },
          align: { dogmatic: 2 }
        }
      },
      {
        label: "시비에 휘말리지 않도록 검문대 앞에서 발길을 돌려 모함 에어록 안쪽으로 복귀한다",
        effect: {
          text: "항만 세관과 엮여서 좋을 일은 없다는 보이드본의 오랜 격언을 따랐다. 아쉬웠지만 물품도 신변도 온전히 지킨 채 선실로 돌아갔다.",
          stats: { WP: 3, Int: 2 },
          align: { dogmatic: 2 }
        }
      }
    ],
    source: "Rogue Trader: Hostile Acquisitions / Imperium Maledictum Core"
  },
  {
    id: "ev_s24_void_03",
    title: "하층 원자로 구획 — 영양 배급 삭감과 기관부 파업",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "living_saint"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    reqLabel: "거주 공간: 성간 함선 · 14세+ 일반·사관 승무원",
    weight: 30,
    leadVariants: [
      {
        req: { minSocialTier: "elite" },
        lead: "상층 사관 회랑의 복스 단말기에서 붉은 경보등이 점멸하며 기관부 주임 사관의 긴급 보고가 올라왔다."
      },
      {
        req: { maxSocialTier: "common" },
        lead: "플라즈마 원자로의 뜨거운 진동이 발바닥을 울리는 최하층 기관 갑판에 교대 종소리 대신 쇠파이프를 두드리는 분노의 소음이 퍼졌다."
      }
    ],
    text: "장기 성간 항해로 식량 저장고가 바닥을 드러내자 보급처가 하층 원자로 정비반의 영양 죽과 정화수 몫을 절반으로 삭감했다. 지친 기관부 선원 수백 명이 냉각수 제어 밸브 앞을 점거하고 파업에 돌입했고, 무장 함내 경비대는 강제 진압 명령을 기다리며 샷건의 노리쇠를 당기고 있다.",
    choices: [
      {
        label: "[권위 판정] 상층 사관 구역의 예비 비축 식량을 기관부에 방출하도록 보급관에게 즉각 지시한다",
        req: { minSocialTier: "elite" },
        check: { stat: "Inf", diff: 0 },
        critSuccess: {
          text: "지휘부의 권위로 예비 식량고를 열어젖히자 무장 대치가 단숨에 풀렸다. 피 한 방울 흘리지 않고 원자로 출력을 정상화한 결단에 함선 전체의 신망이 크게 올랐다.",
          stats: { Inf: 6, Fel: 6, WP: 3 },
          align: { humane: 8 }
        },
        success: {
          text: "보급관의 불만을 눌러 식량 방출 명령서를 통과시켰다. 기관부 선원들이 환호하며 즉시 냉각 밸브로 복귀했다.",
          stats: { Inf: 4, Fel: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "상급 보급 장교들이 월권이라며 반발하는 바람에 방출량이 반토막 났다. 파업은 간신히 가라앉았으나 사관단 내 입지가 다소 좁아졌다.",
          stats: { Inf: -3, Fel: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 원자로 과열 시 선체 전체가 녹아내린다는 현실을 짚으며 배급 재협상과 즉시 복귀를 중재한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "양측 모두 같은 철판 위에서 숨 쉬는 운명 공동체임을 상기시키자, 경비대장과 기관부 씨족 장로가 물러서며 교대 수당과 식수 보전을 약속했다.",
          stats: { Fel: 6, Int: 4, Inf: 3 },
          align: { humane: 6 }
        },
        fail: {
          text: "격앙된 선원들과 경비대 사이에 몸싸움이 벌어져 렌치에 어깨를 얻어맞았다. 유혈 사태가 번지기 직전 겨우 휴전을 끌어냈다.",
          wounds: -12,
          stats: { Fel: 3 },
          align: { humane: 3 }
        }
      },
      {
        label: "[의지 판정] 황제의 함선에서 태업은 곧 반역이라 선언하며 경비대와 함께 밸브 통제권을 되찾는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "서슬 퍼런 기세로 주동자들을 제압하고 즉각 냉각 밸브를 원상 복구시켰다. 하층 갑판의 원성은 커졌으나 함대 규율과 기관 출력은 완벽히 지켜 냈다.",
          stats: { WP: 5, Inf: 5, WS: 3 },
          align: { dogmatic: 7, ruthless: 4 }
        },
        fail: {
          text: "궁지에 몰린 기관부 선원들이 고온 증기 호스를 열어 저항하는 통에 심한 화상을 입었다. 간신히 밸브를 되찾았으나 상처가 깊었다.",
          wounds: -16,
          stats: { WP: 3 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "비상 격벽 바깥 보조 냉각 관로로 우회해 원자로 압력만 안정시키며 사태의 추이를 지켜본다",
        effect: {
          text: "정면충돌을 피해 보조 순환 펌프를 수동 가동해 두었다. 양측이 지쳐 타협하는 동안 함선의 치명적인 과열 사고만은 막아 냈다.",
          stats: { Int: 4, Ag: 2 },
          align: { dogmatic: 2 }
        }
      }
    ],
    source: "Rogue Trader: Into the Storm / Lexicanum: Voidship Crew"
  },
  {
    id: "ev_s24_void_04",
    title: "워프 도약 전야 — 점멸하는 겔러 필드와 갑판의 미신",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 14,
      anyHabitats: ["void"],
      excludeRealms: ["heretic", "cloistered"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "거주 공간: 성간 함선 · 14세+",
    weight: 30,
    text: "워프 공간 도약을 세 시각 앞두고 함선 전체를 감싸는 겔러 필드 발생기가 불규칙한 저주파로 맥동하기 시작했다. 강철 벽면에 서리가 맺히고 복도 전등이 미세하게 깜박이자, 공포에 질린 하층 갑판 씨족들은 선조 때부터 전해 내려온 뼈 부적과 소금 주머니를 격벽마다 매달기 시작했다. 한쪽에서는 국교 사제가 이단적 미신을 당장 불태우라며 호통을 치고, 다른 쪽에서는 기계교 엔지시어가 발생기 과부하를 점검할 보조 인력을 다급히 찾고 있다.",
    choices: [
      {
        label: "[지성 판정] 엔지시어를 도와 겔러 필드 공명 코일의 위상 어긋남을 보정하고 기계령을 진정시킨다",
        check: { stat: "Int", diff: -5 },
        critSuccess: {
          text: "고전압 공명 코일의 미세한 균열을 단번에 찾아내 예비 회로로 전환했다. 겔러 필드의 웅장한 파동이 즉시 안정을 되찾았고, 공허의 속삭임 앞에서도 흔들리지 않는 냉철한 담력을 인정받았다.",
          stats: { Int: 6, WP: 5, Inf: 3 },
          addTags: ["iron_nerves"]
        },
        success: {
          text: "기계교 의식 절차에 맞춰 보조 축전기를 동기화하자 전등의 점멸이 멎었다. 선원들이 안도의 한숨을 내쉬며 워프 도약 종소리를 맞이했다.",
          stats: { Int: 5, WP: 3 },
          align: { dogmatic: 3 }
        },
        fail: {
          text: "위상을 맞추던 도중 튄 역전류에 팔을 데고 찰나의 워프 냉기가 정신을 스쳐 지나갔다. 간신히 출력은 복구되었으나 불쾌한 잔향이 남았다.",
          wounds: -10,
          corruption: 3,
          stats: { Int: 2 }
        },
        critFail: {
          text: "코일 접합부가 순간적으로 어긋나며 겔러 필드가 한 박자 흔들렸다. 강철 벽 너머에서 스며든 심연의 속삭임이 영혼에 지워지지 않는 상흔을 남겼다.",
          wounds: -14,
          corruption: 6,
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[의지 판정] 낡은 미신 대신 제국 신조와 황제 찬가를 선창해 갑판 전체의 동요를 신앙으로 묶어 세운다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "흔들림 없는 목소리로 황제의 가호를 외치자, 공포에 떨던 수백 명의 승무원이 뼈 부적을 내려놓고 일제히 합창에 동참했다. 웅장한 기도 소리가 도약 직전의 불안을 밀어냈다.",
          stats: { WP: 6, Fel: 4 },
          faith: 6,
          corruption: -2,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "기도 소리가 복도의 이상한 메아리에 묻히며 분위기가 더욱 흉흉해졌다. 밤새 뜬눈으로 워프 진입을 견디며 기력이 소진되었다.",
          wounds: -8,
          faith: 2,
          corruption: 2,
          align: { dogmatic: 3 }
        }
      },
      {
        label: "보이드본 씨족의 오래된 항해 관습을 묵인하고, 나 역시 선실 문설주에 소금을 뿌린 뒤 도약 종을 기다린다",
        effect: {
          text: "국교 사제의 눈을 피해 조용히 선원들의 전통을 지켜 주었다. 미신일지언정 수 세대를 워프 속에서 살아남게 해 준 익숙한 의식이 마음을 가라앉혔다.",
          stats: { WP: 3, Fel: 3 },
          faith: -1,
          align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Geller Field / Rogue Trader: Into the Storm"
  },
  {
    id: "ev_s24_void_05",
    title: "소행성대 선외 작업 — 진공 속의 긴급 장갑 용접",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 15,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "거주 공간: 성간 함선 · 15세+",
    weight: 28,
    leadVariants: [
      {
        req: { minSocialTier: "elite" },
        lead: "지휘 계통의 책임자로서 직접 선외 보수반의 안전 밧줄을 검수하고 관측 에어록 앞에서 진공 작업 통제에 나섰다."
      },
      {
        req: { maxSocialTier: "common" },
        lead: "아크 용접기와 예비 장갑판을 곁에 두고 자신의 거친 숨소리만 울리는 보이드 수트 헬멧을 쓴 채 에어록 바깥 어두운 선체 외벽을 바라보았다."
      }
    ],
    text: "미탐사 소행성대를 빠져나오던 함선의 좌현 보조 연료관 장갑판이 유성 파편에 찢어졌다. 내부 방폭문은 닫혔으나 외벽 균열을 봉합하지 않으면 다음 추진 가속 시 선체 측면이 뜯겨 나갈 판이다. 자력 부츠를 신은 긴급 보수반이 에어록 너머 칠흑 같은 공허로 나섰고, 미세 운석 조각들이 은빛 불꽃을 튀기며 아다만티움 장갑판 위를 스쳐 지나간다.",
    choices: [
      {
        label: "[민첩 판정] 미세 운석의 궤적을 읽으며 선체 외벽을 박차고 균열 부위를 아크 용접으로 단번에 봉합한다",
        check: { stat: "Ag", diff: -5 },
        critSuccess: {
          text: "무중력 공허에서 자력 부츠의 전류를 순간적으로 끊고 튀어 올라 날아오는 암석 파편을 피해 냈다. 단 한 번의 정밀 용접으로 선체 균열을 완벽히 막아 낸 공로가 함대 기록에 올랐다.",
          stats: { Ag: 6, Int: 4, Inf: 5 },
          addTags: ["battle_hardened"]
        },
        success: {
          text: "선체가 흔들리는 가운데서도 침착하게 용접봉을 움직여 연료관 외벽을 봉합했다. 무사히 에어록으로 귀환하자 동료들이 헬멧을 맞대며 환호했다.",
          stats: { Ag: 5, T: 3, Inf: 3 }
        },
        fail: {
          text: "빗나간 운석 파편이 진공복 팔뚝 외피를 긁고 지나갔다. 비상 봉합 거품이 즉시 터져 질식은 면했으나 혹독한 진공 화상과 타박상을 입었다.",
          wounds: -18,
          stats: { T: 3 }
        },
        critFail: {
          text: "연쇄 파편 폭풍에 안전 밧줄이 끊어지며 칠흑 같은 우주로 튕겨 나갈 뻔했다. 예비 추력기로 겨우 선체를 붙잡았으나 극심한 감압 충격과 공포가 신경을 갉아먹었다.",
          wounds: -24,
          stats: { T: 2 },
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[강인 판정] 진공복 내부 압력이 요동치는 와중에도 자력 부츠로 버텨 내며 중량 장갑판을 끝까지 눌러 고정한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "얼어붙는 공허의 냉기와 선체 진동을 온몸으로 받아 내며 자동 리벳기가 박힐 때까지 장갑판을 단단히 눌렀다. 강철 같은 버팀목 덕분에 추진기가 무사히 재가동되었다.",
          stats: { T: 6, WP: 4, Inf: 3 },
          align: { dogmatic: 4 }
        },
        fail: {
          text: "장갑판 반동에 흉부를 강하게 부딪치고 극심한 동상 기운이 스며들었다. 봉합은 마쳤으나 의무실 치료를 피할 수 없었다.",
          wounds: -16,
          stats: { T: 3 }
        }
      },
      {
        label: "에어록 내부의 견인 윈치와 유선 복스를 맡아 선외 작업반의 밧줄과 산소 압력을 정밀하게 통제한다",
        effect: {
          text: "직접 외벽으로 나서는 대신 에어록 통제반을 지휘해 운석 접근 경보와 안전 밧줄 장력을 빈틈없이 조율했다. 단 한 명의 실종자도 없이 작업이 마무리되었다.",
          stats: { Int: 4, WP: 3 },
          align: { humane: 3 }
        }
      }
    ],
    source: "Rogue Trader: Battlefleet Koronus / Imperium Maledictum Core"
  },
  {
    id: "ev_s24_void_06",
    title: "하층 갑판 씨족 항쟁 — 함수와 함미의 산소 밸브 분쟁",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["voidborn"],
      maxSocialTier: "common",
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "행성: 보이드본 · 하층·일반 승무원 · 14세+",
    weight: 28,
    text: "수 세대 동안 거포 포열을 닦아 온 함수 갑판 씨족과 냉각수 관로를 지켜 온 함미 하부 씨족 사이에 피비린내 나는 항쟁이 터졌다. 오래전 폐쇄된 보조 공기 정화탑이 재가동되자, 두 씨족의 젊은이들이 낡은 황동 산소 할당 명판을 서로 차지하겠다며 어두운 통풍 회랑에서 리벳 망치와 쇠갈고리를 맞부딪친 것이다. 사관단의 경비대가 내려오기 전에 결판을 짓지 않으면 양쪽 구획 모두 집단 징벌에 넘겨질 판이다.",
    choices: [
      {
        label: "[하층 생존자 전용] 두 씨족의 밀수 통로와 숨겨 둔 공기 우회관을 폭로하겠다고 맞불을 놓아 협상 테이블에 앉힌다",
        req: { anyTags: ["streetwise", "lowborn"] },
        effect: {
          text: "양쪽 장로들이 숨겨 둔 암거래 창고의 구획 번호를 정확히 읊어 대자 험악하던 분위기가 순식간에 얼어붙었다. 두 씨족은 체면을 구기지 않는 선에서 산소 명판을 공동 관리하기로 합의했다.",
          stats: { Fel: 5, Int: 4, Inf: 4 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[백병 판정] 양 씨족 대표 앞에 나서 함내 결투 규약대로 쇠파이프를 맞대어 싸움을 단판에 끝낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "좁은 철제 통로에서 보이드본 전통의 비살상 봉술로 양측 선봉을 차례로 꺾었다. 피의 항쟁 대신 승자의 중재안을 따르겠다는 서약이 맺어졌다.",
          stats: { WS: 6, T: 4, Inf: 4 },
          align: { dogmatic: 3 }
        },
        fail: {
          text: "어둠 속에서 날아든 리벳 망치에 옆구리를 얻어맞고 쓰러졌다. 씨족 장로들이 부랴부랴 싸움을 말려 목숨은 건졌으나 크게 다쳤다.",
          wounds: -16,
          stats: { WS: 3, T: 2 }
        }
      },
      {
        label: "[교섭 판정] 경비대가 개입하면 두 씨족 모두 징벌 포열로 끌려간다며 공동 산소 당번표를 제안한다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "함수와 함미가 서로 등을 맞대어 온 수백 년의 선원 역사를 읊으며 절묘한 교대 할당안을 제시했다. 두 씨족 장로가 함께 기계유 잔을 나누며 그대의 은빛 혀를 극찬했다.",
          stats: { Fel: 6, Inf: 6, WP: 3 },
          align: { humane: 8 },
          addTags: ["silver_tongue"]
        },
        success: {
          text: "징벌 노역의 공포와 실리적 분배안이 맞아떨어졌다. 양 씨족이 무기를 거두고 황동 명판에 공동 서명을 남겼다.",
          stats: { Fel: 5, Inf: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "흥분한 젊은이들이 중재자를 떠밀며 격벽에 몰아붙였다. 멍이 든 채 물러났으나 다행히 경비대 경보가 울리기 전에 군중이 흩어졌다.",
          wounds: -10,
          stats: { Fel: 2 },
          align: { humane: 3 }
        }
      },
      {
        label: "분쟁 중인 중앙 회랑을 피해 예비 산소 저장고 열쇠만 단단히 챙겨 두고 조용히 물러난다",
        effect: {
          text: "남의 씨족 싸움에 끼어들어 피를 흘릴 이유는 없다. 비상용 산소통 위치를 다시 확인하고 조용히 자기 구획으로 돌아갔다.",
          stats: { Ag: 3, Int: 3 },
          align: { ruthless: 2 }
        }
      }
    ],
    source: "Dark Heresy 2e: Core Rulebook / Rogue Trader: Into the Storm"
  },
  {
    id: "ev_s24_void_07",
    title: "화물 격실의 밀항 순례자 — 함장의 진공 처분 명령",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 18,
      anyHabitats: ["void"],
      anyTrees: ["navy", "rogue_trader", "navis_navigator"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    reqLabel: "거주 공간: 성간 함선 · 네이비/로그 트레이더/항해사 · 18세+",
    weight: 32,
    text: "워프 항로를 절반쯤 지난 시점, 미개봉 14번 화물 격실에서 예상치 못한 생명 반응이 포착되었다. 방폭문을 열자 굶주림과 추위에 떨고 있는 수십 명의 제국 순례자 밀항객들이 성상을 품에 안고 웅크리고 있었다. 생명 유지 장치의 예비 산소 여유분이 빠듯하다는 보고를 받은 선임 항해 장교는 규정대로 외부 에어록을 개방해 밀항객 전원을 진공으로 배출하라는 냉혹한 처분안을 올렸다.",
    choices: [
      {
        label: "[항해사 전용] 워프 조류가 순탄해 항해 기간을 사흘 단축할 수 있음을 보증해 산소 부족 논리를 무력화한다",
        req: { anyTags: ["navigator"] },
        effect: {
          text: "제3의 눈으로 읽어 낸 안정된 워프 해류도를 함교에 제시했다. 도착 시한이 앞당겨지면서 진공 처분의 명분이 사라졌고, 순례자들은 무사히 다음 기항지까지 살아남았다.",
          stats: { Int: 5, WP: 4, Inf: 5 },
          align: { humane: 7, dogmatic: 3 }
        }
      },
      {
        label: "[교섭 판정] 순례자들을 하층 갑판 보수 인력으로 임시 편입시켜 산소 할당을 메우자고 함교를 설득한다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "부족한 갑판 정비 인력을 보충하면서도 제국 신민의 목숨을 구하는 완벽한 명분을 세웠다. 함교 사관들조차 고개를 끄덕였고, 살아남은 순례자들이 황제의 이름으로 그대를 축복했다.",
          stats: { Fel: 6, Inf: 5, WP: 4 },
          faith: 5,
          align: { humane: 10 }
        },
        success: {
          text: "끈질긴 설득 끝에 함교 수뇌부가 진공 처분을 철회했다. 순례자들은 보수 노역에 투입되는 대신 목숨을 부지할 수 있었다.",
          stats: { Fel: 5, WP: 3 },
          faith: 3,
          align: { humane: 8 }
        },
        fail: {
          text: "함교의 강경파가 절반만 노역반으로 남기고 나머지는 규약대로 처리하라며 반발했다. 그대의 발언권은 깎였으나 일부라도 살려 낸 데 의의를 두었다.",
          stats: { Inf: -3, Fel: 2 },
          faith: 2,
          align: { humane: 6 }
        }
      },
      {
        label: "[권위 판정] 순례자들이 숨겨 온 성지 헌금과 귀중품을 몰수하고, 다음 기항지 광산 계약에 넘겨 이윤을 남긴다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "생명을 살려 주는 대가로 밀항객들의 마지막 재산과 노역 계약서를 모두 받아 냈다. 냉혹한 거래였으나 함선 금고와 개인 권위는 두둑해졌다.",
          stats: { Inf: 6, Int: 4 },
          align: { ruthless: 9 }
        },
        fail: {
          text: "몰수 과정에서 절망한 순례자 무리가 격렬히 저항해 호위병이 다치고 소동이 커졌다. 선내 군종 사제의 의심 어린 시선까지 떠안아야 했다.",
          wounds: -12,
          faith: -4,
          stats: { Inf: -2 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "제국 항해 규약과 함선 전체의 생존이 우선이다 — 최후의 기도를 허락한 뒤 진공 처분 명령을 집행한다",
        effect: {
          text: "에어록의 감압 경보음이 잠시 울린 뒤 14번 화물 격실은 완전한 침묵으로 돌아갔다. 함선의 산소 수치는 안정되었고, 냉혹한 제국 규율의 무게만이 가슴에 가라앉았다.",
          stats: { WP: 5, Inf: 4 },
          faith: 2,
          align: { dogmatic: 8, ruthless: 4 }
        }
      }
    ],
    source: "Rogue Trader: Core Rulebook / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s24_void_08",
    title: "하층 갑판 급습 — 임페리얼 네이비 강제 징발대",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 14,
      maxAge: 28,
      anyWorlds: ["voidborn"],
      anyCareers: ["menial_worker", "child"],
      maxCareerTier: 1,
      excludeOriginClasses: ["noble", "high_noble", "schola"],
      excludeTags: [
        "abhuman", "noble", "rogue_trader_blood", "navigator", "knight_blood",
        "astartes", "custodes", "grey_knight", "sororitas", "mechanicus",
        "assassin", "imperial_knight", "living_saint", "heretic", "chaos_aligned"
      ]
    },
    reqLabel: "행성: 보이드본 · 하층·일반 청년(14~28세)",
    weight: 28,
    text: "정박 중인 제국 순양함의 결원을 메우기 위해 임페리얼 네이비 강제 징발대, 이른바 '프레스 갱'이 충격봉과 포획망을 든 채 하층 거주 갑판의 격벽을 봉쇄했다. 사관 한 명이 낡은 인력 대장을 펼쳐 들며 젊은 보이드본들을 닥치는 대로 끌어내고 있다. 어두운 상부 환기 덕트로 몸을 숨길 틈이 아주 잠시 열렸고, 다른 한편에서는 포열 노예로 끌려가기 전에 정식 자원 입대를 신청할 기회도 눈앞에 놓여 있다.",
    choices: [
      {
        label: "끌려가는 대신 스스로 앞으로 나서 성간 항행 경력을 내세워 임페리얼 네이비에 정식 자원 입대한다",
        req: { minAge: 17, excludeTags: ["abhuman"] },
        effect: {
          text: "당당한 태도와 보이드본 특유의 선체 감각을 높이 산 징발 사관이 그대를 사슬 묶인 포열 노역 대신 정식 항해 사관 보조로 편입시켰다. 거친 제국 해군의 복무가 시작되었다.",
          forceCareer: "imperial_navy",
          stats: { WP: 4, BS: 4, Int: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 갑판 씨족 장로들의 정비 할당 면제 증서를 꺼내 보이며 필수 기관 인력임을 주장한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "함선 기밀 정비 인력을 빼가면 정거장 전체의 수리 일정이 마비된다는 논리가 먹혀들었다. 징발 사관이 혀를 차며 그대와 동료들의 이름을 대장에서 지웠다.",
          stats: { Fel: 5, Int: 4, Inf: 3 },
          align: { humane: 5 }
        },
        fail: {
          text: "증서를 내밀기도 전에 징발대원의 충격봉이 옆구리를 강타했다. 간신히 장로들이 쥐여 준 뇌물로 풀려났으나 한동안 욱신거리는 상처를 안고 지냈다.",
          wounds: -14,
          stats: { Fel: 2 }
        }
      },
      {
        label: "[민첩 판정] 보이드본만이 아는 비좁은 상부 환기 덕트 뚜껑을 따고 어둠 속으로 감쪽같이 자취를 감춘다",
        check: { stat: "Ag", diff: 0 },
        critSuccess: {
          text: "소리 없이 환기구 안으로 미끄러져 들어간 뒤, 막다른 통로에 몰린 갑판 동료 둘까지 끌어올려 숨겨 주었다. 징발대가 철수할 때까지 발각되지 않았다.",
          stats: { Ag: 6, Int: 4 },
          align: { humane: 4 }
        },
        success: {
          text: "좁은 배관 틈새를 능숙하게 기어올라 징발대의 탐조등을 따돌렸다. 순양함이 출항한 뒤에야 안전하게 갑판으로 내려왔다.",
          stats: { Ag: 5, WP: 2 }
        },
        fail: {
          text: "덕트 덮개를 닫기 직전 충격봉 끝이 어깨를 스쳤다. 가까스로 어둠 속으로 도망쳤으나 심한 타박상을 입었다.",
          wounds: -16,
          stats: { Ag: 2, T: 2 }
        }
      }
    ],
    source: "Lexicanum: Imperial Navy (Press Gangs) / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s24_void_09",
    title: "맨드빌 포인트 외곽 — 표류하는 고대 차티스트 바지선",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 18,
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "거주 공간: 성간 함선 · 비이단 18세+",
    weight: 30,
    text: "성계 외곽 맨드빌 포인트 너머의 차가운 공허에 수 세기 전 실종된 제국 차티스트 상선의 바지선 한 척이 동력이 끊긴 채 표류하고 있다. 망원 센서에는 생존 신호가 잡히지 않으나, 밀봉된 선장실 기록 보관함에는 오래전 잊힌 안전한 워프 항로도와 고대 성도가 남아 있을 가능성이 크다. 다만 선체 외벽 곳곳에 워프 잔류 복사열을 닮은 기묘한 서리가 번뜩이고 있다.",
    choices: [
      {
        label: "[지성 판정] 선체 방사선과 워프 잔류파를 측정하며 선장실 항해 기록함만 정밀하게 회수한다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "오염 구획을 완벽히 우회해 400년 전 밀봉된 황동 성도 수정판을 온전히 회수했다. 잊힌 우회 항로와 전술 기동 좌표를 해독해 내며 날카로운 전략안까지 터득했다.",
          stats: { Int: 7, Inf: 6, WP: 3 },
          align: { dogmatic: 3 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "보조 전력을 조심스럽게 연결해 항해 기록 코지테이터의 핵심 성도 데이터를 복사해 냈다. 함대 항로국에 넘길 귀중한 성과였다.",
          stats: { Int: 5, Inf: 4 },
          align: { dogmatic: 2 }
        },
        fail: {
          text: "기록함을 열자 깨진 코지테이터에서 불길한 잡음과 워프 냉기가 뿜어져 나왔다. 급히 철수했으나 어지럼증과 오염 흔적을 피하지 못했다.",
          wounds: -12,
          corruption: 4,
          stats: { Int: 2 }
        },
        critFail: {
          text: "선장실 안쪽의 깨진 정지장 상자에서 형언할 수 없는 워프 독기가 터져 나왔다. 필사적으로 셔틀로 탈출했으나 영혼에 깊은 워프 흉터가 새겨졌다.",
          wounds: -18,
          corruption: 8,
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[민첩 판정] 무중력 화물창을 훑어 값나가는 희귀 합금과 밀봉된 교역품 상자를 먼저 끌어낸다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "부유하는 철골 사이를 재빠르게 누비며 희귀 아다만티움 주괴와 고대 교역품 상자를 예인선에 묶어 냈다. 위험한 인양 작업 끝에 큰 이득을 거두었다.",
          stats: { Ag: 5, Inf: 5 },
          align: { ruthless: 5 }
        },
        fail: {
          text: "선체가 기우뚱하며 떨어져 나온 화물 크레인에 옆구리를 강타당했다. 빈손으로 철수하는 동안 불길한 한기가 스며들었다.",
          wounds: -16,
          corruption: 3,
          align: { ruthless: 2 }
        },
        critFail: {
          text: "억지로 뜯어낸 밀수 상자의 봉인이 에어록 안에서 깨지며 사악한 워프 잔류 기운이 번졌다. 극심한 부상과 함께 지워지지 않는 워프 흉터를 얻었다.",
          wounds: -20,
          corruption: 7,
          align: { ruthless: 3 },
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "오염된 표류선에 발을 들이지 않고 위치 좌표에 항해 위험 표지 비콘만 투하한 뒤 기수를 돌린다",
        effect: {
          text: "공허에서 이유 없이 표류하는 배는 함정이라는 늙은 선원들의 경고를 따랐다. 위험 경보 비콘을 띄우고 안전하게 본 항로로 복귀했다.",
          stats: { WP: 4, Int: 2 },
          faith: 3,
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Lexicanum: Mandeville Point / Rogue Trader: Lure of the Expanse"
  },
  {
    id: "ev_s24_void_10",
    title: "지표면 상륙 이후 — 다시 돌아온 강철 격벽의 안도감",
    category: "보이드본 심화",
    once: true,
    req: {
      minAge: 16,
      anyHomeWorlds: ["voidborn"],
      allTags: ["shore_leave_void"],
      anyHabitats: ["void"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "이력: 보이드본 첫 지표 상륙 · 성간 함선 복귀 · 16세+",
    weight: 36,
    text: "행성 지표면의 그 아득하게 뚫려 있던 천장 없는 하늘과 발바닥을 짓누르던 흙의 감촉을 뒤로하고, 다시 성간 함선의 에어록 안쪽으로 돌아왔다. 코끝을 스치는 재활용 산소의 익숙한 오존 냄새와 두꺼운 강철 천장, 원자로가 뿜어내는 미세한 진동이 비로소 심장 박동을 가라앉혔다. 하지만 한 번 밟아 본 대지의 기억은 별 사이에서 태어난 영혼의 경계를 조용히 흔들어 놓았다.",
    choices: [
      {
        label: "[의지 판정] 지표면의 중력과 하늘에 대한 공포를 딛고, 별과 대지 어느 쪽에도 흔들리지 않는 항해자의 담력을 세운다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "광활한 대기와 비좁은 철판 격벽을 모두 겪어 낸 끝에, 이제 그 어떤 환경도 정신을 흔들지 못한다는 확신이 자리 잡았다. 해묵은 공포가 씻겨 나가고 강철 같은 신경이 깨어났다.",
          stats: { WP: 6, Int: 4, Fel: 3 },
          removeTags: ["shell_shocked"],
          addTags: ["iron_nerves"]
        },
        success: {
          text: "천장 없는 하늘을 두려워하던 미숙한 마음을 털어 냈다. 성간 항행민으로서의 자부심과 넓은 은하를 품는 시야가 한층 깊어졌다.",
          stats: { WP: 5, Int: 3 },
          removeTags: ["shell_shocked"]
        },
        fail: {
          text: "강철 격벽 안으로 돌아오고 나서도 며칠 동안은 끝없는 허공으로 빨려 올라가는 악몽에 시달렸다. 그래도 다시 일상의 호흡을 되찾았다.",
          stats: { WP: 2, Int: 2 }
        }
      },
      {
        label: "지표면 사람들의 기묘한 관습과 생경한 바람 이야기를 선원들에게 들려주며 보이드본만의 연대감을 다진다",
        effect: {
          text: "행성에 내려가 본 적 없는 갑판 동료들이 눈을 반짝이며 이야기에 귀를 기울였다. 별 사이를 떠도는 우리만의 정체성이 더욱 또렷해졌다.",
          stats: { Fel: 5, Inf: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "지표면은 썩어 가는 흙덩이일 뿐 — 영원한 강철 선체와 성간 항로에만 평생을 바치겠다고 다짐한다",
        effect: {
          text: "차가운 아다만티움 격벽에 손바닥을 대고 맹세했다. 흙과 구름의 세계는 지표면 사람들에게 남겨 두고, 나는 별빛과 철판 사이에서 살아가리라.",
          stats: { WP: 4, Ag: 3, T: 2 },
          faith: 3,
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Dark Heresy 2e: Core Rulebook / Rogue Trader: Into the Storm"
  }
];
