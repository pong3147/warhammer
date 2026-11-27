// 분기 사건 — Stage 21: 4대 규격 외 특이점(Alpha-Plus Psyker / Freak Physique / Savant Genius / Omega-Minus Pariah) 전용 서사 (14종)
export default [
  // =========================================================================
  // 1. 알파 플러스 사이커 (alpha_plus_psyker) — 4종
  // =========================================================================
  {
    id: "ev_s21_anom_01",
    title: "두개골을 찢는 백색 섬광 — 이마테리움의 둑이 무너지다",
    category: "특수",
    once: true,
    req: {
      minAge: 12,
      maxAge: 26,
      allTags: ["psyker"],
      excludeRealms: ["heretic"],
      excludeWorldTags: ["feral"],
      excludeTags: ["alpha_plus_psyker", "blank", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "자질: 사이커 · 12~26세 · 충성파 비초인 · 비야만 행성",
    weight: 38,
    text: "일상의 고된 훈련이나 극한의 위기 속에서 그대의 의식을 가두던 정신적 둑이 단숨에 붕괴했다. 주변 공기가 오존 냄새와 함께 새하얗게 타오르며 반경 수십 미터 내의 강철 격벽이 종잇장처럼 비틀린다. 근처에 있던 감시자와 목격자들이 코피를 쏟으며 무릎을 꿇는 가운데, 시야 너머 워프의 심연이 한 사람의 그릇에 담기지 못할 만큼 거대한 힘의 수문을 열어젖히려 한다.",
    choices: [
      {
        label: "[의지 판정] 폭주하는 워프의 격류를 억지로 붙잡아 내면의 백색 화로로 압축한다 (대성공 시 규격 외 각성)",
        check: { stat: "WP", diff: -12 },
        critSuccess: {
          text: "기적적인 정신 집중으로 터져 나오던 사이킥 폭풍을 단 한 점의 순백한 별로 압축해 삼켰다! 전 구역의 전등이 일제히 파열되고 주변의 계측기와 복스 단말이 한계치를 넘어 녹아내렸으며, 그대는 인류 제국에서도 천 년에 한 번 나올까 말까 한 알파 플러스 등급의 권능을 손에 넣었다.",
          stats: { WP: 12, Int: 6, Inf: 8 },
          corruption: 6,
          addTags: ["alpha_plus_psyker", "iron_nerves"],
          align: { dogmatic: 4 }
        },
        success: {
          text: "살점이 타는 듯한 두통을 견뎌 내며 폭주하던 염력을 천장 너머 허공으로 흘려보냈다. 규격 외의 경지까지는 닿지 못했으나, 그대의 사이킥 제어력은 한 단계 더 날카로워졌다.",
          stats: { WP: 6, Int: 3 },
          corruption: 3
        },
        fail: {
          text: "역류한 워프 화염이 신경망을 그슬리며 코와 귀에서 검은 피가 쏟아졌다. 구역 격벽이 반파되었고, 그대는 며칠간 의식을 잃은 채 격리실에 묶였다.",
          wounds: -20,
          corruption: 5,
          stats: { WP: 2, T: -2 }
        },
        critFail: {
          text: "정신의 둑이 산산조각 나며 붉은 워프 번개가 사방으로 튀었다! 눈앞의 강철 문이 녹아내리고 영혼 깊은 곳에 지워지지 않을 흉터가 각인되었다.",
          wounds: -30,
          corruption: 10,
          addTags: ["warp_scarred"],
          stats: { T: -3, WP: -2 }
        }
      },
      {
        label: "[지성 판정] 공명을 주변 철골과 접지선으로 분산시켜 구역 붕괴만은 막는다",
        check: { stat: "Int", diff: -4 },
        success: {
          text: "재빨리 바닥의 송전 배관을 향해 염력의 방향을 틀어 과부하를 땅속으로 흘려보냈다. 정전으로 구역이 암흑에 잠겼으나 인명 피해는 면했다.",
          stats: { Int: 5, WP: 4 },
          align: { humane: 5 }
        },
        fail: {
          text: "배관이 버티지 못하고 연쇄 폭발을 일으켜 파편에 온몸을 베였다. 현장을 목격한 감시 당국은 그대를 위험 등급으로 분류해 감시 기록에 올렸다.",
          wounds: -16,
          corruption: 4
        }
      },
      {
        label: "아퀼라 성물과 성수를 끌어안고 힘의 수문이 닫힐 때까지 웅크려 기도한다",
        effect: {
          text: "찬송을 읊조리며 모든 힘을 억눌렀다. 뼈가 시릴 만큼 차가운 오한이 지나간 뒤, 잠재되어 있던 거대한 심연은 다시 어둠 속으로 가라앉았다.",
          stats: { WP: 3 },
          faith: 5,
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Alpha Plus Psyker / Ravenor"
  },
  {
    id: "ev_s21_anom_02",
    title: "무너지는 하이브 구획 — 만 톤의 강철을 떠받친 사념",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      allTags: ["alpha_plus_psyker"],
      anyWorldTags: ["hive", "industrial", "forge"],
      excludeWorldTags: ["feral"],
      excludeWorlds: ["krieg"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "high_lord_terra", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned"]
    },
    reqLabel: "특이점: 알파 플러스 사이커 · 16세 이상 · 하이브/공업/포지 월드 · 충성파 필멸자",
    weight: 40,
    text: "노후화된 지지대가 무너지며 상층 하이브 구획의 거대한 철골 천장이 그대로 아래층 거주 구역으로 추락하기 시작했다! 수천 명의 시민과 병사들이 비명조차 지르지 못하고 압사하기 직전, 그대의 머릿속에서 은하가 뒤집히는 듯한 사이킥의 울림이 깨어난다. 규격 외의 힘이라면 이 강철 산맥을 통째로 멈춰 세울 수도, 반대로 구역 전체를 증발시킬 수도 있다.",
    choices: [
      {
        label: "[의지 판정] 전력을 개방해 추락하는 하이브 천장 전체를 염력으로 붙들어 올린다",
        check: { stat: "WP", diff: -8 },
        critSuccess: {
          text: "두 눈이 순백의 태양처럼 타오르며 만 톤이 넘는 철골과 콘크리트가 허공에 얼어붙듯 정지했다! 피난민들이 대피할 때까지 단 한 치도 흔들리지 않고 버텨 낸 그대의 모습은 구획 전체에 살아 있는 기적으로 회자되었다.",
          stats: { WP: 8, Inf: 10, T: 3 },
          faith: 6,
          corruption: 4,
          align: { humane: 10 }
        },
        success: {
          text: "핏줄이 터질 듯한 압박 속에서 거대한 천장을 천천히 옆쪽 폐기물 수로로 꺾어 추락시켰다. 수천 명의 목숨을 건졌으나, 구역의 모든 유리창이 사념의 파동에 산산조각 났다.",
          stats: { WP: 6, Inf: 6 },
          wounds: -10,
          corruption: 5,
          align: { humane: 7 }
        },
        fail: {
          text: "천장의 하중을 절반밖에 막아 내지 못해 거대한 잔해에 깔릴 뻔했다. 구역 일부는 무너졌고, 역류한 워프 파동이 육체를 거칠게 찢어 놓았다.",
          wounds: -24,
          corruption: 7,
          stats: { WP: 2 }
        },
        critFail: {
          text: "염력의 균형이 무너지며 천장이 산산이 쪼개져 구획을 덮쳤고, 폭주한 사념파가 생존자들의 정신까지 휩쓸었다! 폐허 속에서 가까스로 기어 나왔으나 끔찍한 죄책감과 워프의 낙인이 남았다.",
          wounds: -32,
          corruption: 12,
          addTags: ["warp_scarred", "shell_shocked"],
          align: { humane: -4 }
        }
      },
      {
        label: "[지성 판정] 천장을 통째로 드는 대신 핵심 대들보 세 개만 정밀 파쇄해 대피 통로를 튼다",
        check: { stat: "Int", diff: -4 },
        success: {
          text: "정확한 구조 역학 계산과 미세한 염동력으로 하중을 분산시켜 대피로 위쪽만 안전하게 확보했다. 최소한의 소모로 재앙을 제어했다.",
          stats: { Int: 6, WP: 4, Inf: 4 },
          corruption: 2,
          align: { humane: 5 }
        },
        fail: {
          text: "대들보의 균열이 예상보다 빠르게 번지며 퇴로가 막혔다. 잔해 사이로 굴러 나오며 큰 타박상을 입었다.",
          wounds: -18,
          stats: { Int: 2 }
        }
      },
      {
        label: "무모한 전면 개방 대신 텔레파시 비명을 날려 구획 전체에 즉시 대피 경보를 울린다",
        effect: {
          text: "수만 명의 귓가에 직접 울려 퍼진 경보 덕분에 적지 않은 이들이 붕괴 직전 문밖으로 몸을 던졌다. 힘을 아낀 덕분에 육체는 무사했다.",
          stats: { WP: 3, Fel: 3 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Alpha Plus Psyker / Warhammer 40k Core Rulebook"
  },
  {
    id: "ev_s21_anom_03",
    title: "검은 함선과 공허의 사냥꾼 — 통제 불능의 존재를 겨눈 정화의 칼날",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      allTags: ["alpha_plus_psyker"],
      excludeRealms: ["heretic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "inquisitor", "lord_inquisitor",
        "high_lord_terra", "chapter_master", "sector_lord", "planetary_governor",
        "warmaster", "living_saint", "dreadnought", "daemon_prince",
        "heretic", "chaos_aligned"
      ]
    },
    reqLabel: "특이점: 알파 플러스 사이커 · 16세 이상 · 충성파 비초인/비최고위",
    weight: 41,
    text: "궤도 위에 아스트라 텔레파티카의 검은 함선과 오르도 헤레티쿠스의 순양함이 동시에 닻을 내렸다. 그대의 사이킥 반향이 섹터 텔레파시 망을 흔들자, 검은 함선 징발대와 황제의 발톱인 침묵의 자매들, 그리고 이단심문소 오르도 헤레티쿠스의 제압 부대가 강하 포드를 타고 내려온 것이다. 공허 여전사들의 무혼 장막과 육망성 억제 고리가 주변의 모든 워프 감응을 얼어붙게 만드는 가운데, 외곽에서 합류한 이단심문관이 냉혹하게 선고한다. '알파 플러스 개체는 황제의 적이나 다름없다. 즉결 정화하거나 검은 함선의 납 관에 영구 봉인하겠다.'",
    choices: [
      {
        label: "[권위 판정] 무릎을 꿇고 황제께 바치는 절대 충성과 제어력을 증명해 정화 대신 극비 징집을 요구한다",
        check: { stat: "Inf", diff: -6 },
        success: {
          text: "이단심문관과 검은 함선 징발 지휘관은 차가운 침묵 끝에 처형 명령을 거두었다. 대신 그대의 존재는 제국 최고 기밀 문서에만 기록된 채, 가장 치명적인 전장에 투입되는 비밀 병기로 관리되기 시작했다.",
          stats: { Inf: 9, WP: 6 },
          faith: 5,
          addTags: ["inquisition_favor"],
          align: { dogmatic: 7 }
        },
        fail: {
          text: "설득이 통하지 않아 육망성 억제 수갑을 찬 채 혹독한 심문과 시련을 겪었다. 목숨은 부지했으나 깊은 내상을 입었다.",
          wounds: -20,
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 숨통을 조이는 무혼 장막과 육망성 억제파를 정면으로 견뎌 내며 흔들리지 않는 정신력을 입증한다",
        check: { stat: "WP", diff: -10 },
        critSuccess: {
          text: "침묵의 자매들이 펼친 공허의 장막과 제압 부대의 널-방출기 공세 속에서도 단 한 걸음도 무너지지 않고, 폭주나 빙의의 기미 없이 오히려 과부하된 억제 장치를 침묵시켰다! 현장을 지켜보던 대심문관조차 경외와 공포가 섞인 시선으로 그대를 극비 전략 자산으로 인정했다.",
          stats: { WP: 10, Inf: 10 },
          addTags: ["iron_nerves", "inquisition_favor"],
          align: { dogmatic: 5 }
        },
        success: {
          text: "코피를 쏟으면서도 무혼의 압박 속에서 정신 방벽을 유지해 악마의 빙의 흔적이 전혀 없음을 증명했다. 징발대와 추적대는 감시 인장만 남기고 철수했다.",
          stats: { WP: 7, T: 3 },
          faith: 4
        },
        fail: {
          text: "무혼 장막과 억제파의 협공에 정신 방벽이 뚫리며 극심한 사이킥 역류를 맞았다. 반죽음 상태로 끌려가 끔찍한 생체 억제 시술을 받아야 했다.",
          wounds: -26,
          stats: { WP: 2 },
          addTags: ["shell_shocked"]
        },
        critFail: {
          text: "억제 실패로 주변 공간이 찢어지자 제압 부대와 호위 병력이 일제히 실탄과 소각 화기를 퍼부었다! 온몸에 화상과 절단상을 입은 채 폐허 속으로 겨우 도주했다.",
          wounds: -35,
          corruption: 6,
          addTags: ["crippled_limb", "wanted_by_inquisition"]
        }
      },
      {
        label: "스스로 모든 무장을 내려놓고 검은 함선의 생체 억제실에 순순히 걸어 들어간다",
        effect: {
          text: "항거하지 않는 태도를 확인한 징발대와 이단심문관은 즉결 처형을 보류했다. 차가운 납 관 속에서 몇 달간의 정밀 검사를 견딘 끝에, 그대는 통제 가능한 자산으로 풀려났다.",
          stats: { WP: 4, T: 2 },
          faith: 4,
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Astra Telepathica / Sisters of Silence / Ordo Hereticus"
  },
  {
    id: "ev_s21_anom_04",
    title: "심연의 만찬 — 어둠의 신들이 탐내는 순백의 태양",
    category: "카오스",
    once: true,
    req: {
      minAge: 16,
      allTags: ["alpha_plus_psyker"],
      excludeRealms: ["heretic"],
      excludeTags: ["custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned"]
    },
    reqLabel: "특이점: 알파 플러스 사이커 · 16세 이상 · 충성파(비오염면역/비드레드노트)",
    weight: 39,
    text: "황제조차 두려워하는 그대의 영혼은 워프의 포식자들에게는 눈부신 등대와 같다. 어느 고요한 밤, 현실의 색채가 바래고 아홉 갈래 깃털과 피의 사슬, 역병의 향기가 동시에 감각을 파고든다. '필멸자의 껍질에 갇혀 썩어 갈 것인가, 아니면 우리와 함께 별을 불태울 것인가.' 대악마의 속삭임이 고막이 아닌 영혼의 한복판을 긁는다.",
    choices: [
      {
        label: "[의지 판정] 황금 옥좌의 빛을 떠올리며 악마의 속삭임을 사이킥 불꽃으로 불태워 쫓는다",
        check: { stat: "WP", diff: -8 },
        success: {
          text: "영혼을 잠식하려던 환영을 순백의 염력으로 찢어발겼다! 악마는 비명과 함께 워프 너머로 쫓겨났고, 그대의 영혼은 어떤 유혹에도 굴하지 않는 불멸의 방패로 단련되었다.",
          stats: { WP: 8, Inf: 5 },
          faith: 10,
          addTags: ["daemon_bane"],
          align: { dogmatic: 8 }
        },
        fail: {
          text: "유혹을 뿌리치긴 했으나 악마의 발톱이 정신을 할퀴고 지나가 깊은 오한과 오염이 스며들었다.",
          wounds: -18,
          corruption: 8,
          stats: { WP: 3 }
        }
      },
      {
        label: "[금지된 지식] 유혹을 틈타 워프 심연의 비밀 한 조각만 역추적해 훔쳐낸다",
        req: { excludeTags: ["sister_of_silence"] },
        effect: {
          text: "악마가 내민 잔을 끝까지 마시지는 않았으나, 그 속에 비친 금지된 술식의 파편을 훔쳐 기억에 새겼다. 힘이 비약적으로 날카로워진 대신, 영혼의 빛이 한층 어두워졌다.",
          stats: { Int: 7, WP: 5 },
          corruption: 12,
          align: { ruthless: 6, dogmatic: -6 }
        }
      },
      {
        label: "인간으로서의 족쇄를 부수고 워프의 권능을 기꺼이 받아들인다",
        req: { excludeTags: ["sororitas", "canoness", "commissar", "lord_commissar", "commissar_general", "living_saint", "saint_vessel", "inquisitor", "lord_inquisitor", "high_lord_terra"] },
        effect: {
          text: "순백의 사이킥 불꽃이 불길한 자줏빛과 핏빛으로 물들었다. 제국에 맞서는 가장 위험한 이단 사이커의 이름이 어둠 속에 새겨졌다.",
          stats: { WP: 8, Inf: 6 },
          corruption: 22,
          faith: -15,
          addTags: ["heretic", "chaos_aligned", "mark_tzeentch"],
          align: { ruthless: 8, dogmatic: -10 }
        }
      },
      {
        label: "두 귀를 틀어막고 새벽이 밝을 때까지 육체의 고통으로 정신을 붙든다",
        effect: {
          text: "손바닥에 손톱이 파고들도록 주먹을 쥔 채 긴 밤을 버텨 냈다. 첫 햇살과 함께 심연의 속삭임은 안개처럼 흩어졌다.",
          wounds: -8,
          stats: { WP: 4, T: 2 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Chaos / Psyker"
  },

  // =========================================================================
  // 2. 규격 외 피지컬 (freak_physique) — 4종
  // =========================================================================
  {
    id: "ev_s21_anom_05",
    title: "한계를 찢는 혈관 — 필멸의 껍질을 부순 초인적 각성",
    category: "특수",
    once: true,
    req: {
      minAge: 14,
      maxAge: 24,
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["freak_physique", "abhuman", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince"]
    },
    reqLabel: "14~24세 · 필멸자(비초인/비앱휴먼) · 비야만 행성",
    weight: 37,
    text: "생사가 걸린 극한의 육체적 한계 앞에서, 그대의 심장이 마치 전함의 플라즈마 노심처럼 굉음을 내며 뛰기 시작한다. 수 톤짜리 강철 문이 무너지며 동료를 덮치려 하고, 맹독성 연기와 중압이 폐부를 짓누르는 찰나, 보통 인간이라면 이미 척추가 부러졌을 무게 앞에서 그대의 근육과 뼈가 기괴하리만치 단단하게 재편되는 감각이 밀려온다.",
    choices: [
      {
        label: "[강인 판정] 비명을 지르며 무너지는 강철 구조물을 맨손으로 떠받쳐 밀어 올린다 (대성공 시 규격 외 각성)",
        check: { stat: "T", diff: -12 },
        critSuccess: {
          text: "두꺼운 강철 대들보가 그대의 어깨 위에서 구부러졌다! 보통 사람의 두 배에 달하는 골밀도와 폭발적인 근섬유가 극한 스트레스 속에서 완전히 개화하며, 그대는 순수 인류의 유전적 특이점인 규격 외 피지컬로 거듭났다.",
          stats: { T: 12, WS: 8, Ag: 4, Inf: 5 },
          addTags: ["freak_physique", "battle_hardened"]
        },
        success: {
          text: "이빨이 갈릴 만큼 힘을 쏟아부어 동료들이 빠져나올 틈을 벌었다! 온몸의 근육이 찢어졌으나 회복과 함께 한층 단단해졌다.",
          stats: { T: 6, WS: 4 },
          wounds: -12
        },
        fail: {
          text: "압도적인 하중에 무릎이 꺾이며 어깨와 갈비뼈에 금이 갔다. 겨우 목숨만 건진 채 들것에 실려 나갔다.",
          wounds: -24,
          stats: { T: 2 }
        },
        critFail: {
          text: "무너진 철골이 다리를 그대로 짓누르며 뼈가 산산조각 났다! 살아남은 것만도 기적이었으나, 지워지지 않을 후유증이 남았다.",
          wounds: -34,
          addTags: ["crippled_limb"],
          stats: { Ag: -4, T: -2 }
        }
      },
      {
        label: "[민첩 판정] 무모하게 힘으로 버티는 대신 좁은 틈새로 몸을 날려 동료를 낚아채 빠져나온다",
        check: { stat: "Ag", diff: -3 },
        success: {
          text: "종이 한 장 차이로 낙하하는 철골을 피하며 동료의 옷깃을 잡아당겨 생환했다.",
          stats: { Ag: 5, WS: 2 },
          align: { humane: 5 }
        },
        fail: {
          text: "낙하하는 파편에 등을 얻어맞으며 구석으로 내동댕이쳐졌다.",
          wounds: -16,
          stats: { Ag: 2 }
        }
      },
      {
        label: "위험 구역에서 즉시 몸을 빼내 지휘소에 붕괴를 보고하고 구조대를 부른다",
        effect: {
          text: "냉정하게 안전을 확보한 뒤 중장비를 동원해 잔해를 치웠다. 큰 공은 아니었으나 몸을 온전히 지켰다.",
          stats: { T: 2, Int: 2 }
        }
      }
    ],
    source: "Lexicanum: Catachan / Bragg (Gaunt's Ghosts)"
  },
  {
    id: "ev_s21_anom_06",
    title: "녹색 괴수의 포효 — 맨주먹으로 꺾은 오크 놉의 목덜미",
    category: "전투",
    once: true,
    req: {
      minAge: 16,
      allTags: ["freak_physique"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeTrees: ["civil", "administratum", "governor", "ecclesiarchy", "navis_navigator", "imperial_knight"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned", "high_lord_terra"]
    },
    reqLabel: "특이점: 규격 외 피지컬 · 16세 이상 · 충성파 필멸 전투원 · 비야만 행성",
    weight: 41,
    text: "전선이 뚫린 참호 한복판으로 집채만 한 오크 놉이 쇠파이프와 톱날 도끼를 휘두르며 난입했다! 라스건 탄환이 녀석의 두꺼운 가죽에서 튕겨 나가고 아군 분대원들이 나가떨어지는 순간, 그대의 손에 들려 있던 무기가 부러져 나간다. 하지만 물러설 곳이 없다. 그대의 거대한 체구와 괴력을 본 오크 놉이 오히려 즐거운 듯 씨익 웃으며 정면으로 돌진한다.",
    choices: [
      {
        label: "[백병 판정] 부러진 무기를 버리고 돌진하는 오크 놉의 팔을 붙잡아 꺾은 뒤 맨주먹으로 두개골을 박살 낸다",
        check: { stat: "WS", diff: -6 },
        critSuccess: {
          text: "오크 놉의 거대한 도끼날을 팔뚝으로 막아 낸 뒤 턱을 정통으로 올려쳐 두개골을 함몰시켰다! 아스타르테스조차 경악할 맨손 일격에 주변의 오크 보이즈들이 겁에 질려 도망쳤고, 그대의 이름은 전선 전체에 살아 있는 전설로 퍼졌다.",
          stats: { WS: 10, T: 8, Inf: 9 },
          addTags: ["battle_hardened"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "진흙탕 속에서 짐승처럼 뒤엉킨 사투 끝에 오크 놉의 목을 꺾어 숨통을 끊었다! 피와 기름을 뒤집어쓴 채 일어서자 아군의 환호가 터져 나왔다.",
          stats: { WS: 7, T: 5, Inf: 6 },
          wounds: -12
        },
        fail: {
          text: "오크의 쇠발톱이 옆구리를 깊게 찢고 지나갔다. 간신히 녀석의 눈을 찔러 물리쳤으나 극심한 출혈을 겪었다.",
          wounds: -24,
          stats: { WS: 3, T: 2 }
        },
        critFail: {
          text: "괴수의 무식한 박치기에 턱과 갈비뼈가 부러지며 참호 밖으로 날아갔다! 지원 사격 덕분에 목숨은 건졌으나 처참한 패배였다.",
          wounds: -32,
          addTags: ["shell_shocked"],
          stats: { WS: -2, Inf: -3 }
        }
      },
      {
        label: "[사격 판정] 쓰러진 전우의 중화기 탄통을 한 손으로 들어 올려 지근거리에서 화력을 퍼붓는다",
        check: { stat: "BS", diff: -4 },
        success: {
          text: "보통 병사 셋이 붙어야 겨우 거치하는 중화기를 한 팔로 버텨 내며 오크 놉의 흉부를 벌집으로 만들었다!",
          stats: { BS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "반동에 총신이 흔들리며 탄환이 빗나갔고, 오크가 던진 수류탄 파편을 맞았다.",
          wounds: -18,
          stats: { T: 2 }
        }
      },
      {
        label: "거대한 몸으로 참호 입구를 막아 서서 전우들이 후방으로 물러날 시간을 번다",
        effect: {
          text: "적의 공세를 온몸으로 받아내며 방패 역할을 해냈다. 온몸이 멍투성이가 되었으나 분대원 전원이 무사히 후퇴했다.",
          wounds: -15,
          stats: { T: 5, WP: 4 },
          align: { humane: 7 }
        }
      }
    ],
    source: "Lexicanum: Ork Nob / Bragg (Gaunt's Ghosts)"
  },
  {
    id: "ev_s21_anom_07",
    title: "초인의 시선 — 천사의 감찰관이 묻는 피의 가치",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      allTags: ["freak_physique"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeTrees: ["civil", "administratum", "governor", "ecclesiarchy", "navis_navigator", "imperial_knight"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned", "high_lord_terra"]
    },
    reqLabel: "특이점: 규격 외 피지컬 · 16세 이상 · 충성파 필멸 전투원 · 비야만 행성",
    weight: 40,
    text: "전투가 끝난 막사 앞에, 은빛 해골 가면을 쓴 아스타르테스 채플린과 붉은 로브의 수행원들이 걸음을 멈췄다. 평범한 필멸자가 오크의 장갑판을 맨손으로 찢고 중화기를 소총처럼 휘둘렀다는 보고를 확인하러 온 것이다. '유전자 변이인가, 아니면 황제께서 빚으신 기적인가.' 아스타르테스의 거대한 체구 앞에서도 전혀 기죽지 않는 그대의 골격을 채플린이 유심히 살핀다.",
    choices: [
      {
        label: "[백병 판정] 스파링 혹은 시범 대련을 청해 필멸자의 주먹이 초인에게도 닿음을 증명한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "파워 아머를 걸치지 않은 채플린의 팔을 한순간 정지시켜 채플린의 탄성을 자아냈다! '배틀 브라더에 필적하는 기백이군.' 챕터의 감찰관은 그대의 이름을 기억에 새기고 순결의 인장을 건넸다.",
          stats: { WS: 8, T: 6, Inf: 10 },
          faith: 5,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "아스타르테스의 반응 속도를 따라잡지 못하고 단 일격에 모래바닥에 처박혔다. 하지만 끝까지 일어서는 집념만큼은 인정받았다.",
          wounds: -18,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[권위 판정] 혈통의 순수성과 황제에 대한 충성을 당당히 밝히며 전선의 지원을 요청한다",
        check: { stat: "Inf", diff: -4 },
        success: {
          text: "돌연변이 혐의 대신 전선의 핵심 전력으로 인정을 받아, 챕터 무기고에서 잉여 보급품과 고성능 무기를 하사받았다.",
          stats: { Inf: 7, Fel: 4 },
          align: { dogmatic: 4 }
        },
        fail: {
          text: "차갑고 엄격한 심사 끝에 이단 혐의만 간신히 벗어났다. 기분 나쁜 감시 시선이 한동안 따라다녔다.",
          stats: { Inf: -2, WP: 3 }
        }
      },
      {
        label: "말없이 허리를 숙여 경의를 표한 뒤 자신의 전선 임무로 묵묵히 복귀한다",
        effect: {
          text: "과시하지 않는 절제된 태도에 채플린은 말없이 고개를 끄덕이고 발길을 돌렸다.",
          stats: { WP: 4, T: 2 },
          faith: 3
        }
      }
    ],
    source: "Lexicanum: Space Marine Chaplain / Imperial Guard"
  },
  {
    id: "ev_s21_anom_08",
    title: "움직이는 포탑 — 쇠사슬을 끊어 낸 전장의 거인",
    category: "군사",
    once: true,
    req: {
      minAge: 16,
      allTags: ["freak_physique"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeTrees: ["civil", "administratum", "governor", "ecclesiarchy", "navis_navigator", "imperial_knight"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned", "high_lord_terra"]
    },
    reqLabel: "특이점: 규격 외 피지컬 · 16세 이상 · 충성파 필멸 전투원 · 비야만 행성",
    weight: 39,
    text: "요새 방어선의 측면이 무너지며 전차 포탑에 장착되어 있던 트윈 헤비 볼터와 대형 파워 글레이브가 잔해 속에 나뒹굴고 있다. 장전수도, 거치대도 모두 날아간 상황. 적 기갑 보병대가 능선을 넘어 밀려오는 가운데, 그대의 두 팔만이 이 괴물 같은 병기들을 다시 들어 올릴 수 있다.",
    choices: [
      {
        label: "[사격 판정] 파손된 전차에서 트윈 헤비 볼터를 뜯어내 양팔로 감싸 쥐고 전진을 분쇄한다",
        check: { stat: "BS", diff: -6 },
        critSuccess: {
          text: "서보-모터도 없이 맨팔로 트윈 헤비 볼터의 반동을 완벽히 제어해 적의 선두 지휘관부터 정확히 꿰뚫었다! 탄피가 비처럼 쏟아지는 가운데 적 보병대는 궤멸되었고, 그대는 백발백중의 중화기 전설이 되었다.",
          stats: { BS: 9, T: 6, Inf: 8 },
          addTags: ["deadeye_marksman"]
        },
        success: {
          text: "어깨가 탈구될 듯한 반동을 근육으로 눌러 담으며 탄막을 형성해 적의 돌파를 저지했다.",
          stats: { BS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "총신이 과열되어 팔뚝에 심한 화상을 입었으나, 적의 기세를 꺾는 데는 성공했다.",
          wounds: -18,
          stats: { BS: 2, T: 2 }
        }
      },
      {
        label: "[백병 판정] 대형 파워 글레이브를 들어 올려 돌진하는 적 중장갑 보병대의 대열을 단신으로 가른다",
        check: { stat: "WS", diff: -6 },
        critSuccess: {
          text: "보통 전사라면 두 손으로도 휘두르기 버거운 거대 검이 그대의 손에서 깃털처럼 춤을 추었다! 적 지휘관의 방패와 갑주를 단칼에 두 동강 내며, 그대는 검성의 경지에 올랐다.",
          stats: { WS: 9, Ag: 4, Inf: 8 },
          addTags: ["blade_master"]
        },
        success: {
          text: "압도적인 리치와 완력으로 적의 창끝을 모두 쳐내며 방어선 틈새를 틀어막았다.",
          stats: { WS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "파워 글레이브의 역장에 부딪히며 균형을 잃고 적탄을 몇 발 허용했다.",
          wounds: -20,
          stats: { WS: 2 }
        }
      },
      {
        label: "무너진 방벽 돌무더기를 양팔로 끌어올려 급조 엄폐물을 쌓고 아군을 보호한다",
        effect: {
          text: "거대한 콘크리트 덩어리들을 순식간에 쌓아 올려 임시 바리케이드를 완성했다. 수많은 부상병이 그 뒤에서 목숨을 건졌다.",
          stats: { T: 5, WP: 3 },
          align: { humane: 6 }
        }
      }
    ],
    source: "Lexicanum: Heavy Bolter / Try Again Bragg"
  },

  // =========================================================================
  // 3. 전략·지성 사반트 (savant_genius) — 3종
  // =========================================================================
  {
    id: "ev_s21_anom_09",
    title: "천 개의 전장을 꿰뚫은 수식 — 서브섹터 보급망의 기적",
    category: "전략",
    once: true,
    req: {
      minAge: 18,
      allTags: ["savant_genius"],
      minSocialTier: "common",
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned", "ogryn"]
    },
    reqLabel: "특이점: 전략·지성 사반트 · 18세 이상 · 일반 시민 이상 충성파 필멸자 · 크리그/야만 행성 제외",
    weight: 41,
    text: "서브섹터 사령부의 거대한 전술 홀로그램이 붉은 경고등으로 뒤덮였다. 열두 개 행성의 보급선과 성전군 병력이 워프 폭풍에 얽혀 사흘 뒤면 전선이 도미노처럼 붕괴할 판이다. 고급 참모들과 데이터-서번트들이 천만 줄의 수치 앞에서 두 손을 드는 순간, 그대의 시야에는 복잡하게 얽힌 수만 개의 항로가 하나의 투명한 기하학 도형으로 겹쳐 보이기 시작한다.",
    choices: [
      {
        label: "[지성 판정] 단 하룻밤 만에 전 서브섹터의 보급·기동 계획을 전면 재설계해 사령부에 제출한다",
        check: { stat: "Int", diff: -8 },
        critSuccess: {
          text: "철필과 데이터 슬레이트만으로 코지테이터 수백 대가 1년 걸릴 연산을 하룻밤에 끝냈다! 모든 탄약과 수송선이 기적 같은 시차로 전선에 도착하며 세 개 행성이 동시에 구원받았고, 사령부는 그대에게 백전노장의 전술안이라는 칭호를 바쳤다.",
          stats: { Int: 10, Inf: 10, Fel: 4 },
          addTags: ["tactician_eye"],
          align: { dogmatic: 5 }
        },
        success: {
          text: "불필요한 수송 경로를 40퍼센트 절감하고 예비대를 최적 좌표에 배치해 전선 붕괴를 완벽히 막아 냈다.",
          stats: { Int: 7, Inf: 7 }
        },
        fail: {
          text: "과도한 연산으로 코피가 터지며 쓰러졌고, 막판 워프 지연 변수 하나를 놓쳐 후방 창고 하나가 손실되었다.",
          wounds: -12,
          stats: { Int: 3, Inf: -2 }
        },
        critFail: {
          text: "천재성의 과신으로 안전 여유분을 0으로 깎아 내린 탓에, 단 하나의 수송선 격침으로 연쇄 보급 마비가 터졌다! 엄청난 책임을 뒤집어쓰고 사령부 재정 배상 명령까지 떨어졌다.",
          wounds: -14,
          stats: { Inf: -8, Int: 2 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[교섭 판정] 무작정 계획을 밀어붙이는 대신 각 군단 지휘관들을 설득해 자율 우회로를 연다",
        check: { stat: "Fel", diff: -4 },
        success: {
          text: "자존심 강한 장교들의 비위를 상하지 않으면서도 핵심 물자 배분을 관철해 냈다.",
          stats: { Fel: 6, Int: 4, Inf: 5 }
        },
        fail: {
          text: "파벌 싸움에 가로막혀 계획의 절반밖에 실행하지 못했다.",
          stats: { Inf: -2, Fel: 2 }
        }
      },
      {
        label: "가장 위험한 최전방 2개 성계의 철수 경로만이라도 우선 확보하도록 조언한다",
        effect: {
          text: "모든 것을 구할 수는 없었으나, 정예 연대들이 포위망에서 빠져나올 퇴로는 정확히 열어 주었다.",
          stats: { Int: 4, WP: 2 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Lexicanum: Savant / Tactica Imperialis"
  },
  {
    id: "ev_s21_anom_10",
    title: "질투의 독배 — 무능한 상관의 암살 음모를 역산하다",
    category: "정치",
    once: true,
    req: {
      minAge: 18,
      allTags: ["savant_genius"],
      minSocialTier: "common",
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "high_lord_terra", "astartes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "warmaster", "sector_lord", "planetary_governor", "assassin", "ogryn", "heretic", "chaos_aligned"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "특이점: 전략·지성 사반트 · 18세 이상 · 일반 시민 이상 충성파 필멸자 · 크리그/야만 행성 제외",
    weight: 40,
    text: "너무나 눈부신 공적을 세운 탓일까. 귀족 출신 직속 상관이 그대의 존재를 위협으로 여겨 은밀히 암살자를 고용했다는 사실을, 그대는 평소보다 3분 늦게 도착한 보안 보고서와 차 맛의 미세한 변화, 경비병의 시선 각도만으로 이미 눈치챘다. 오늘 밤 집무실 문밖에서 암살자의 발소리가 멎는다.",
    choices: [
      {
        label: "[지성 판정] 암살자의 동선과 침입 시각을 1초 단위로 역산해 역습의 덫에 가둔다",
        check: { stat: "Int", diff: -6 },
        critSuccess: {
          text: "암살자가 환기구를 여는 찰나, 미리 배치한 아르비테스 감찰대가 들이닥치며 배후의 자백 녹취까지 손에 넣었다! 상관의 음모는 하룻밤 만에 역전되었고, 그대는 빈자리를 차지한 데 이어 흔들리지 않는 담력까지 얻었다.",
          stats: { Int: 8, Inf: 9, WP: 4 },
          addTags: ["iron_nerves"],
          align: { ruthless: 5 }
        },
        success: {
          text: "유인용 더미를 배치하고 암살자를 무력화한 뒤, 증거를 들이밀어 상관을 침묵시켰다.",
          stats: { Int: 6, Inf: 5 },
          align: { ruthless: 4 }
        },
        fail: {
          text: "암살자의 반응이 계산보다 한 박자 빨라 팔에 독 묻은 단검을 스쳤다. 가까스로 제압했으나 독소가 몸에 남았다.",
          wounds: -18,
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "[교섭 판정] 침입한 암살자 앞에서 배후의 자금줄과 두 배의 대가를 제시해 역으로 매수한다",
        check: { stat: "Fel", diff: -6 },
        critSuccess: {
          text: "차가운 미소와 치밀한 이해득실 계산만으로 암살자의 칼날을 상관의 목으로 되돌렸다! 그날 이후 그대의 세 치 혀는 어떤 방패보다 치명적인 무기가 되었다.",
          stats: { Fel: 9, Inf: 7 },
          addTags: ["silver_tongue"],
          align: { ruthless: 7 }
        },
        success: {
          text: "암살자가 칼을 거두고 상관의 지령서를 넘긴 채 어둠 속으로 사라졌다.",
          stats: { Fel: 6, Inf: 4 },
          align: { ruthless: 5 }
        },
        fail: {
          text: "설득이 통하지 않아 거친 몸싸움이 벌어졌고, 부상을 입은 뒤에야 경비병들이 달려왔다.",
          wounds: -20,
          stats: { Fel: 2 }
        }
      },
      {
        label: "집무실을 비운 채 공개 연회장에 모습을 드러내 암살 자체를 원천 무산시킨다",
        effect: {
          text: "수백 명의 증인이 지켜보는 연회장 한복판에서 보란 듯이 건배를 들자, 어둠 속의 계획은 물거품이 되었다.",
          stats: { Int: 4, Fel: 3 }
        }
      }
    ],
    source: "Lexicanum: Administratum / Officio Assassinorum"
  },
  {
    id: "ev_s21_anom_11",
    title: "성역 총사령부의 직할 소환 — 백만 대군의 명운을 건 단 한 번의 판결",
    category: "전략",
    once: true,
    req: {
      minAge: 18,
      allTags: ["savant_genius"],
      minSocialTier: "common",
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "dreadnought", "custodes", "ogryn"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "특이점: 전략·지성 사반트 · 18세 이상 · 일반 시민 이상 충성파 · 비야만 행성",
    weight: 38,
    text: "테라의 고위 서기관과 성역 총사령부의 인장이 찍힌 소환장이 도착했다. 수십 년간 교착 상태에 빠진 대규모 반란 성계의 지도를 앞에 두고, 고위 장성들이 그대의 두뇌에 최종 승부수를 맡기려 한다. '이 성계를 탈환할 단 하나의 해법이 있다면, 지금 이 자리에서 증명해 보라.'",
    choices: [
      {
        label: "[지성 판정] 행성 자전 주기와 워프 조류를 결합한 기상천외한 기동 포위안을 제시한다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "불가능하다고 치부되던 행성 궤도 강하와 보급 차단 시나리오가 완벽한 논리로 증명되자, 장성들이 일제히 기립해 경의를 표했다. 작전은 대성공을 거두었고 그대의 이름은 섹터 역사에 새겨졌다.",
          stats: { Int: 8, Inf: 12 },
          faith: 4,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "이론은 완벽했으나 현장 지휘관들의 역량이 따라가지 못해 작전이 지연되었고, 비판의 화살이 그대에게 돌아왔다.",
          stats: { Int: 3, Inf: -4 }
        }
      },
      {
        label: "[권위 판정] 반란 수괴의 파벌 갈등을 파고들어 무혈 항복을 끌어내는 심리전을 주도한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "적 진영 내부의 의심을 증폭시켜 총알 한 발 쏘지 않고 적 사령관들이 서로를 배신하게 만들었다! 피 한 방울 흘리지 않은 승리에 찬사가 쏟아졌다.",
          stats: { Inf: 9, Fel: 6 },
          align: { humane: 7 }
        },
        fail: {
          text: "역정보가 적에게 간파당하며 반란군이 결사 항전을 선포해 공성이 길어졌다.",
          stats: { Inf: -3, Fel: 2 }
        }
      },
      {
        label: "전면 공세 대신 주요 궤도 방어 포대만 무력화하는 점진적 소모전 교본을 작성한다",
        effect: {
          text: "화려하지는 않으나 실패할 리 없는 정공법을 제시해 제국군의 인명 손실을 크게 줄였다.",
          stats: { Int: 5, Inf: 4 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Departmento Munitorum / Strategos"
  },

  // =========================================================================
  // 4. 절대 무혼 오메가-마이너스 (omega_pariah) — 3종
  // =========================================================================
  {
    id: "ev_s21_anom_12",
    title: "신성한 공허의 침묵 — 제단 위 악마를 소멸시킨 무혼의 파동",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      allTags: ["omega_pariah"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned"]
    },
    reqLabel: "특이점: 절대 무혼(오메가-마이너스) · 16세 이상 · 충성파 필멸자 · 크리그/야만 행성 제외",
    weight: 42,
    text: "이단 교단의 지하 신전, 혹은 워프 균열의 문턱에서 현실 세계로 강림하던 악마와 사이커 집단이 피의 의식을 완수하려 한다! 일반 블랭크라면 악마의 위압감에 무릎을 꿇었을 끔찍한 틈새지만, 그대가 발을 들이민 순간 주변의 모든 워프 불꽃이 산소를 잃은 듯 일제히 꺼져 간다. 현실에 뚫린 구멍 그 자체가 그대의 공허 앞에서 비명을 지른다.",
    choices: [
      {
        label: "[의지 판정] 억눌러 왔던 무혼의 오라를 전면 개방해 악마와 사이커의 정신을 즉사시킨다",
        check: { stat: "WP", diff: -6 },
        critSuccess: {
          text: "소리 없는 백색의 공허 파동이 신전을 휩쓸자, 강림하던 악마가 비명조차 지르지 못하고 검은 재로 흩어졌다! 이단 사이커들은 영혼이 증발하며 즉사했고, 아군마저 넋을 잃은 채 그대를 악마의 천적으로 우러러보았다.",
          stats: { WP: 10, T: 4, Inf: 9 },
          addTags: ["daemon_bane", "iron_nerves"],
          align: { dogmatic: 7 }
        },
        success: {
          text: "그대가 걸음을 내디딜 때마다 악마의 형체가 녹아내렸고, 결국 의식은 완전히 파탄 났다. 그 어떤 사이킥 공격도 그대에게 닿지 못했다.",
          stats: { WP: 7, Inf: 6 },
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "악마가 마지막 발악으로 무너뜨린 물리적 기둥에 어깨를 강타당했으나, 결국 그대의 공허가 녀석을 워프로 추방했다.",
          wounds: -18,
          stats: { WP: 4 }
        },
        critFail: {
          text: "과부하된 현실 경계가 폭발하듯 붕괴하며 그대 역시 물리적 폭풍에 휩쓸렸다! 악마는 사라졌으나 온몸이 찢긴 채 정신적 공허감이 뼈까지 파고들었다.",
          wounds: -28,
          addTags: ["shell_shocked"],
          stats: { Fel: -4, WP: 2 }
        }
      },
      {
        label: "[백병 판정] 워프의 보호막을 잃고 무력화된 적 지휘관에게 돌진해 칼날로 숨통을 끊는다",
        check: { stat: "WS", diff: -4 },
        success: {
          text: "영혼의 방패가 사라져 패닉에 빠진 사이커들을 냉혹하게 베어 넘기며 제단을 정리했다.",
          stats: { WS: 7, T: 3, Inf: 5 }
        },
        fail: {
          text: "절망한 교도들의 육탄 돌격에 찔려 부상을 입었으나, 제단은 무사히 파괴했다.",
          wounds: -16,
          stats: { WS: 3 }
        }
      },
      {
        label: "의식장 중앙에 가만히 서서 아군이 진입해 제압할 때까지 악마의 강림만 봉쇄한다",
        effect: {
          text: "그대가 서 있는 것만으로도 워프의 통로가 막혀 버렸다. 뒤따라 진입한 아군 분대가 교도들을 일망타진했다.",
          stats: { WP: 5, T: 3 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Pariah Gene / Omega-Minus"
  },
  {
    id: "ev_s21_anom_13",
    title: "고독한 별의 그림자 — 황제의 발톱들이 내민 비밀 서약",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      maxAge: 35,
      allTags: ["omega_pariah"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "sister_of_silence", "abhuman", "navigator", "mutant_sanctioned", "mechanicus",
        "imperial_knight", "sororitas", "sororitas_novitiate", "living_saint", "saint_vessel",
        "astartes", "custodes", "grey_knight", "dreadnought", "daemon_prince",
        "assassin", "high_lord_terra", "inquisitor", "lord_inquisitor",
        "chapter_master", "sector_lord", "planetary_governor", "warmaster",
        "heretic", "chaos_aligned"
      ]
    },
    reqLabel: "특이점: 절대 무혼 · 16~35세 · 순수 필멸 충성파(비초인/비최고위/미소속)",
    weight: 41,
    text: "평범한 인간들은 그대 곁에 서는 것만으로도 구역질과 극도의 공포를 느끼며 등을 돌린다. 평생 고독의 벽에 갇혀 있던 그대 앞에, 전혀 두려워하지 않는 차가운 시선들이 나타났다. 침묵의 자매들의 묵언 수화, 혹은 두개골 가면을 쓴 암살청 쿨렉수스 사절과 오르도 말레우스 심문관의 비밀 영장이다. '세상이 너를 혐오한다면, 그 혐오를 제국의 가장 날카로운 칼날로 바꿀 자리가 있다.'",
    choices: [
      {
        label: "[쿨렉수스 템플] 두개골 투구와 아니무스 스페쿨룸을 받아들여 암살청의 영혼 사냥꾼으로 입단한다",
        req: {
          maxCareerTier: 3,
          excludeTags: [
            "interrogator_rank", "tempestus_prime", "rogue_trader", "lord_commissar",
            "canoness", "cardinal", "general_rank",
            "commissar_general", "navy_admiral", "magos", "fabricator_general", "rt_lord_captain"
          ]
        },
        effect: {
          text: "모든 인간적 유대를 끊고 공허 그 자체를 무기로 벼려 내는 오피시오 아사시노룸 쿨렉수스 템플의 수련 암살자로 거듭났다.",
          forceCareer: "assassin_initiate",
          stats: { Ag: 8, WP: 10, Inf: 8 },
          addTags: ["assassin", "clade_culexus"],
          align: { ruthless: 8, humane: -5 }
        }
      },
      {
        label: "[침묵의 자매들] 황금 옥좌의 방패를 지키는 여전사단 아나테마 프시카나에 합류한다",
        req: {
          gender: "female",
          excludeTags: [
            "inquisitor", "lord_inquisitor", "canoness", "cardinal",
            "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "general_rank",
            "commissar_general", "navy_admiral", "magos", "fabricator_general", "rt_lord_captain"
          ]
        },
        effect: {
          text: "침묵의 서약을 맺고 황금 갑주를 걸쳤다. 이제 그대의 공허한 영혼은 황제 폐하의 가장 신성한 발톱이 되어 사이커와 악마를 사냥할 것이다.",
          stats: { WS: 7, WP: 10, Inf: 10 },
          faith: 8,
          addTags: ["sister_of_silence", "daemon_bane"],
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[교섭 판정] 소속을 옮기는 대신 독립적인 비밀 협력자로 남아 전선의 자유와 보상을 확보한다",
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "사절단은 그대의 희소성을 인정하고 강제 징집을 거두었다. 대신 위급할 때 호출하는 비밀 암호와 막대한 지원 권리를 부여했다.",
          stats: { Fel: 6, Inf: 8, WP: 4 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "차가운 거절에 불만을 품은 감찰대가 엄중한 감시 부대를 남겨 두고 떠났다.",
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "지금 내가 서 있는 자리에서 묵묵히 인류를 위해 싸우겠다며 조용히 사양한다",
        effect: {
          text: "고독은 변하지 않으나, 스스로의 삶을 타인의 도구로만 내주지는 않겠다는 의지를 지켰다.",
          stats: { WP: 6, T: 2 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Culexus Temple / Sisters of Silence"
  },
  {
    id: "ev_s21_anom_14",
    title: "거울 없는 심연 — 영혼의 부재가 빚어낸 불멸의 정적",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      allTags: ["omega_pariah"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "heretic", "chaos_aligned"]
    },
    reqLabel: "특이점: 절대 무혼(오메가-마이너스) · 16세 이상 · 충성파 필멸자 · 크리그/야만 행성 제외",
    weight: 38,
    text: "전선의 모든 병사가 보이지 않는 공포와 환각에 사로잡혀 서로에게 총구를 겨누고 있다. 적의 사이커가 뿜어낸 정신 오염 파동이 구역 전체의 이성을 갉아먹는 가운데, 오직 그대의 시야만은 티끌 하나 없이 맑고 차갑다. 영혼이 비어 있기에 역설적으로 그 누구보다 온전한 이성을 지킨 채, 미쳐 가는 동료들을 향해 걸음을 내딛는다.",
    choices: [
      {
        label: "[의지 판정] 전장 한복판으로 걸어 들어가 공허의 장막으로 아군들의 정신 오염을 걷어 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대가 지나가는 자리마다 동료들의 눈동자에서 광기가 씻겨 나갔다! 본능적인 혐오감마저 잊은 채, 병사들은 구원의 방패를 따라 대열을 재정비했다.",
          stats: { WP: 8, Inf: 7, Fel: 4 },
          faith: 5,
          align: { humane: 8 }
        },
        fail: {
          text: "다가오는 그대에게 겁을 먹은 혼란 상태의 병사 한 명이 오발탄을 쏘아 팔에 상처를 입혔다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[강인 판정] 물리적 화망을 뚫고 적 사이킥 발신 장치까지 직진해 박살 낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "적의 탄막을 뚫고 사이킥 증폭기를 부숴 버리자, 전장 전체를 덮고 있던 환각이 거짓말처럼 사라졌다.",
          stats: { T: 6, WS: 4, Inf: 5 }
        },
        fail: {
          text: "목표는 파괴했으나 돌아오는 길에 포탄 파편을 뒤집어썼다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "자신을 혐오하는 병사들과 거리를 둔 채, 외곽에서 적의 기습 경로만 묵묵히 차단한다",
        effect: {
          text: "고독한 방어선 위에서 누구의 감사도 바라지 않고 임무를 완수했다.",
          stats: { WP: 5, WS: 3 }
        }
      }
    ],
    source: "Lexicanum: Blank / Bequin (Eisenhorn)"
  }
];
