// 분기 사건 — 3대 도덕 성향(자비 · 교조 · 암흑) · 정점 이력 연작 · 3파 딜레마
export default [
  // ============================================================================
  // 자비 · 인본 성향 사건 (ev_s165_align_humane_01 ~ 08)
  // ============================================================================
  {
    id: "ev_s165_align_humane_01",
    title: "하층 배수로 아래의 무허가 야전 진료소",
    category: "성향",
    alignBias: "humane",
    req: {
      minAge: 14,
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "knight_high_king", "nav_novator",
        "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "공업 구역의 낡은 배수로 아래에 제국 의료 인가조차 없는 비밀 진료소가 숨겨져 있었다. 낡은 천막 안에는 유독성 폐수 열병에 쓰러진 공장 노동자와 오갈 데 없는 난민들이 빼곡히 누워 신음하고 있었다. 늙은 외과의 한 명이 떨리는 손으로 마지막 소독포를 찢어 나누며, 여분의 약품과 물자를 보탤 의향이 없느냐고 간절히 호소했다.",
    choices: [
      {
        label: "[지성 판정] 환자 분류를 직접 정리하고 여분의 소독포와 해열제를 구해 치료를 돕는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "체계적인 환자 분류와 신속한 약품 조달 덕분에 수십 명이 열병의 고비를 넘겼다. 어두운 지하 진료소에 다시 숨결이 돌며 이름 없는 이들의 감사가 조용히 퍼져 나갔다.",
          stats: { Int: 4, Fel: 4, WP: 3 },
          faith: 3,
          align: { humane: 8 }
        },
        fail: {
          text: "지하의 탁한 공기와 열병에 시달리며 고군분투한 끝에 많은 이들을 살려 냈으나, 그대 역시 지독한 고열과 탈진에 시달렸다.",
          wounds: -8,
          stats: { T: 3, Int: 2 },
          align: { humane: 6 }
        }
      },
      {
        label: "신원을 드러내지 않은 채 비상 식량표와 깨끗한 붕대를 두고 통로 바깥을 경계해 준다",
        effect: {
          text: "말없이 건넨 구호품이 밤사이 진료소를 지탱했다. 거창한 영웅담은 남지 않았으나, 어둠 속에서 꺼져 가던 몇 개의 생명이 내일을 맞았다.",
          stats: { Fel: 3, WP: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "구역 감독관에게 즉시 신고한다 — 무허가 의료 행위와 약품 유출은 명백한 규정 위반이다",
        effect: {
          text: "치안대가 곧장 들이닥쳐 진료소를 폐쇄하고 약품을 제국 창고로 환수했다. 규율은 엄격히 지켜졌으나, 배수로 너머로 울려 퍼진 탄식은 오래도록 지워지지 않았다.",
          stats: { Inf: 4, WP: 2 },
          faith: 2,
          align: { dogmatic: 6, humane: -4 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Dark Heresy Core Rulebook"
  },
  {
    id: "ev_s165_align_humane_02",
    title: "강제 징병 검문선 앞의 피난 수송 열차",
    category: "성향",
    alignBias: "humane",
    req: {
      minAge: 14,
      excludeRealms: ["void"],
      excludeWorlds: ["voidborn"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "knight_high_king", "nav_novator",
        "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg", "voidborn"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "잿빛 황무지를 가로지르는 피난 수송 열차가 군수 징발 검문선 앞에서 급정거했다. 무장한 검문 장교들이 탄약 화물칸을 확보하겠다며 부상당한 민간인과 노약자들을 모래폭풍이 몰아치는 황무지 밖으로 끌어내리려 하고 있었다. 방독면조차 부족한 황무지에 내려놓는 순간 다음 수송선이 오기도 전에 대부분 목숨을 잃을 것이 분명했다.",
    choices: [
      {
        label: "[교섭 판정] 검문선 장교 앞에 나서서 화물을 재배치하고 피난민들이 열차에 계속 머물도록 설득한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "단호하고도 치밀한 설득이 검문 장교의 마음을 돌렸다. 탄약 상자를 상부 선반에 겹쳐 적재하는 절충안 덕분에 부상자와 노약자 전원이 황무지에 버려지지 않고 열차에 남았다.",
          stats: { Fel: 5, Inf: 3, WP: 3 },
          align: { humane: 8, dogmatic: -3 }
        },
        fail: {
          text: "장교는 그대의 항의를 규율 위반으로 꾸짖으며 거칠게 밀쳐 냈으나, 소란을 틈타 일부 부상자들을 뒤편 객차로 되돌려 태우는 데에는 성공했다.",
          wounds: -8,
          stats: { Inf: -3, WP: 2 },
          align: { humane: 6 }
        }
      },
      {
        label: "[민첩 판정] 검문관의 시선을 피해 가장 쇠약한 피난민들을 미점검 정비 객차 안으로 은밀히 옮겨 숨긴다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "검문등의 사각지대를 틈타 거동이 불편한 피난민들을 좁은 정비 객차 바닥에 숨겨 냈다. 열차가 다시 기적을 울리며 출발했을 때 어둠 속에서 안도의 숨소리가 흘러나왔다.",
          stats: { Ag: 4, WP: 3, Fel: 2 },
          align: { humane: 7, dogmatic: -2 }
        },
        fail: {
          text: "정비 객차 문을 닫다가 순찰병에게 들켜 몸싸움 끝에 상처를 입었으나, 기어이 몇몇 피난민을 열차에 남겨 두었다.",
          wounds: -8,
          stats: { Ag: 2, Inf: -2 },
          align: { humane: 5 }
        }
      },
      {
        label: "검문선 지휘관의 징발 명령을 따른다 — 수송 일정과 군수 물자가 최우선이다",
        effect: {
          text: "피난민들이 잿빛 바람 속으로 밀려난 자리에 탄약 상자가 빼곡히 실렸다. 열차는 단 일 분의 지체도 없이 전선을 향해 출발했다.",
          stats: { WP: 4, Inf: 3 },
          faith: 3,
          align: { dogmatic: 7, humane: -5 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Necromunda: Ash Wastes"
  },
  {
    id: "ev_s165_align_humane_03",
    title: "화학 포자 격리 구역의 마지막 호흡 필터",
    category: "성향",
    alignBias: "humane",
    req: {
      minAge: 14,
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "knight_high_king", "nav_novator",
        "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "인접 공장의 정제관이 파열되면서 누런 화학 포자가 거주 통로를 가득 메웠다. 비상 격벽이 자동으로 닫혀 환기 정화가 끝날 때까지 며칠을 버텨야 하는 상황이다. 그대의 비상 장비함에는 여분의 정화 필터와 깨끗한 배급 식량이 남아 있는 반면, 격벽 아래에는 각혈하며 쓰러진 인부들이 거친 숨을 몰아쉬고 있었다.",
    choices: [
      {
        label: "[강인 판정] 여분의 호흡 필터와 식량을 모두 환자들에게 양보하고 자신은 최소한의 천으로 입을 가린 채 버틴다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "독한 화학 연기를 견뎌 낸 강인한 체력 덕분에 환기가 재개될 때까지 단 한 명의 사망자도 나오지 않았다. 살아남은 이들은 그대를 진정한 수호자로 기억했다.",
          stats: { T: 5, WP: 4, Fel: 3 },
          align: { humane: 9 }
        },
        fail: {
          text: "독성 포자가 폐 깊숙이 스며들어 격렬한 기침과 각혈에 시달렸으나, 그대가 건넨 필터 덕분에 쓰러졌던 인부들은 끝내 목숨을 건졌다.",
          wounds: -12,
          stats: { T: 3, WP: 2 },
          align: { humane: 7 }
        }
      },
      {
        label: "갇힌 이들의 보유 물자를 공평하게 모아 환기 복구 시점까지 분배 계획을 세운다",
        effect: {
          text: "그대가 앞장서 자신의 식량을 내놓자 다른 이들도 마음을 열었다. 질서 있는 배급 덕분에 공황과 약탈 없이 격리 기간을 넘겼다.",
          stats: { Fel: 4, Int: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "자신의 필터를 철저히 밀봉하고 여분 정화통은 절박한 이들에게 비싼 값을 받고 거래한다",
        effect: {
          text: "절박함은 언제나 가장 비싼 화폐를 만들어 낸다. 그대는 흠집 하나 없이 격리 구역을 빠져나왔고, 품속에는 묵직한 은화 주머니가 남았다.",
          stats: { Inf: 4, T: 2 },
          align: { ruthless: 7, humane: -5 }
        }
      }
    ],
    source: "Lexicanum: Manufactorum / Dark Heresy: Inquisitor's Handbook"
  },
  {
    id: "ev_s165_align_humane_04",
    title: "부패한 치안대 앞의 무고한 앱휴먼 노동자",
    category: "성향",
    alignBias: "humane",
    req: {
      minAge: 14,
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "assassin", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "knight_high_king", "nav_novator", "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "화물 검문소 구석에서 부패한 지역 치안대원 둘이 성실한 오그린 하역 인부를 전기 곤봉으로 무자비하게 몰아붙이고 있었다. 치안대원들은 자신들이 빼돌린 화물 상자의 책임을 뒤집어씌우기 위해, 정식 공인 신분패를 지닌 앱휴먼 노동자에게 거짓 절도 자백을 강요하는 중이었다. 거대한 오그린은 황제의 법을 어기지 않았다며 울먹일 뿐 차마 반항하지 못했다.",
    choices: [
      {
        label: "[백병 판정] 곤봉 앞에 몸을 던져 부패한 치안대원들을 제압하고 조작된 화물 장부를 폭로한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "단숨에 곤봉을 쳐 내고 빼돌린 화물 전표를 찾아내자, 모여든 부두 인부들이 일제히 환호했다. 오그린 노동자는 큰절을 올리며 그대의 이름을 가슴에 새겼다.",
          stats: { WS: 5, Fel: 4, Inf: 3 },
          align: { humane: 8 }
        },
        fail: {
          text: "전기 곤봉에 어깨를 심하게 얻어맞았으나 끝까지 물러서지 않았다. 소란을 듣고 달려온 상급 감독관이 결국 장부 조작을 적발해 오그린은 풀려났다.",
          wounds: -12,
          stats: { WS: 2, WP: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "[권위 개입] 제국의 직위와 권위를 내세워 부패한 치안대원들을 즉각 해산시키고 신분패를 되찾아 준다",
        req: {
          anyTags: [
            "militarum", "commissar", "arbites", "inquisition_agent", "sororitas",
            "ecclesiarchy", "noble", "rogue_trader", "general_rank", "navy_admiral", "cardinal", "magos"
          ]
        },
        effect: {
          text: "그대가 냉엄한 시선으로 직위와 문장을 드러내자 치안대원들은 얼굴이 하얗게 질린 채 물러났다. 제국의 위엄은 약자를 짓밟는 데 쓰이지 않는다는 사실이 부두 전체에 각인되었다.",
          stats: { Inf: 5, Fel: 4 },
          align: { humane: 8, dogmatic: 2 }
        }
      },
      {
        label: "부두 인부들이 보는 앞에서 큰 소리로 증언을 요구하며 치안대원들이 폭행을 멈추도록 압박한다",
        effect: {
          text: "수십 쌍의 눈이 쏟아지자 부패한 치안대원들은 욕설을 내뱉으며 곤봉을 거두었다. 오그린 노동자는 멍든 팔로 신분패를 꼭 쥔 채 감사 인사를 전했다.",
          stats: { WP: 4, Fel: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "못 본 체 돌아서며 치안대원들에게 입막음 몫만 조용히 챙긴다",
        effect: {
          text: "등 뒤로 둔탁한 타격음이 이어졌지만 그대는 멈추지 않았다. 눈감아 준 대가로 건네받은 화물 표가 주머니 속에서 차갑게 부딪혔다.",
          stats: { Inf: 3, Fel: -2 },
          align: { ruthless: 7, humane: -5 }
        }
      }
    ],
    source: "Lexicanum: Abhuman / Codex: Astra Militarum"
  },
  {
    id: "ev_s165_align_humane_05",
    title: "지하 구호 연대의 지도자 추대",
    category: "성향",
    once: true,
    alignBias: "humane",
    req: {
      minAge: 16,
      minAlign: { humane: 20 },
      anyDominantAlign: ["humane"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "assassin",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "knight_high_king", "nav_novator",
        "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "자비 20+ · 주성향 자비",
    weight: 34,
    text: "그대가 베풀어 온 자비의 소문이 하층 구역과 보급망을 타고 은밀히 번졌다. 폐허가 된 작은 예배당에 모인 의료 보조원, 부두 반장, 양심적인 서기들이 그대를 정중히 맞이했다. 이들은 버림받은 구역에 식량과 약품을 옮기는 비밀 구호 연대를 꾸렸으나, 이단 집단의 침투와 치안대의 단속을 막아 줄 신망 높은 지도자가 절실하다며 그대에게 지휘를 청했다.",
    choices: [
      {
        label: "[교섭 판정] 구호 연대의 책임을 맡고 엄격한 보안 연락망과 신앙 검증을 세워 깨끗한 조직으로 이끈다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "그대의 지휘 아래 구호 연대는 불온 세력의 침투를 원천 차단한 채 수천 명의 생명을 살리는 든든한 그물망으로 자리 잡았다. 그대의 명성이 어둠 속에서 은은히 빛났다.",
          stats: { Fel: 6, Int: 4, Inf: 5 },
          align: { humane: 10 }
        },
        fail: {
          text: "조직을 정비하는 과정에서 밀고자가 생겨 거점 하나가 습격당했다. 부상을 입으며 동료들을 대피시켰으나, 연대의 불씨만큼은 지켜 냈다.",
          wounds: -8,
          stats: { Fel: 3, Inf: -2 },
          align: { humane: 7 }
        }
      },
      {
        label: "공식 지도자 자리는 사양하되, 외부에서 물자와 정보로 조용히 연대를 후원한다",
        effect: {
          text: "한 사람에게 시선이 쏠리는 위험을 피하면서도 실질적인 구호 물자가 끊기지 않게 도왔다. 신중한 조력 덕분에 연대는 오랫동안 발각되지 않고 버틸 수 있었다.",
          stats: { Int: 4, WP: 4 },
          align: { humane: 7 }
        }
      },
      {
        label: "연대를 즉시 해산하라고 경고한다 — 비인가 집회는 결국 이단심문소의 화를 부를 뿐이다",
        effect: {
          text: "모인 이들은 실망한 표정으로 고개를 떨군 채 흩어졌다. 선의조차 제국의 허가 없이는 죄가 된다는 냉엄한 현실을 다시금 일깨운 밤이었다.",
          stats: { WP: 4, Inf: 4 },
          faith: 4,
          align: { dogmatic: 8, humane: -6 }
        }
      }
    ],
    source: "Lexicanum: Imperial Citizens / Dark Heresy: The Radical's Handbook"
  },
  {
    id: "ev_s165_align_humane_06",
    title: "위험한 관용에 대한 감사 — 커미사리아트와 아르비테스의 심문",
    category: "성향",
    once: true,
    alignBias: "humane",
    req: {
      minAge: 16,
      minAlign: { humane: 20 },
      anyDominantAlign: ["humane"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "assassin",
        "inquisitor", "lord_inquisitor", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "knight_high_king", "nav_novator",
        "rogue_trader", "rt_lord_captain",
        "fabricator_locum", "fabricator_general", "cardinal", "canoness",
        "magos", "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "자비 20+ · 주성향 자비",
    weight: 34,
    text: "그대의 거듭된 관용은 결국 차가운 감시의 눈을 불러들였다. 커미사리아트와 아뎁투스 아르비테스 합동 감찰관이 서늘한 봉인 문서를 들이밀며 그대를 차가운 철제 심문실로 소환했다. 감찰관은 난민과 하층 인부들을 감싸 온 행적을 낱낱이 읊으며, 이러한 지나친 관용이 제국의 규율을 해치고 잠재적 반란 세력을 비호하는 이적 행위가 아니냐고 날카롭게 추궁했다.",
    choices: [
      {
        label: "[의지 판정] 눈부신 심문등 아래에서도 흔들리지 않고, 충성스러운 시민을 보존하는 일이 제국의 전력임을 논파한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "철저한 업무 기록과 흔들림 없는 충성 서약 앞에 감찰관도 반역의 증거를 찾지 못했다. 차가운 경고만 남긴 채 심문이 종결되었고, 그대의 단단한 신념은 오히려 경외를 샀다.",
          stats: { WP: 6, Int: 4, Inf: 5 },
          faith: 4,
          align: { humane: 8 }
        },
        fail: {
          text: "수 시간에 걸친 혹독한 추궁과 구타 끝에 혐의 없음 처분을 받았으나, 공식 견책 기록이 남아 한동안 주변의 시선이 차갑게 얼어붙었다.",
          wounds: -10,
          stats: { Inf: -6, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[지성 판정] 성녀 사바트의 전승과 제국 인력 보존 교리를 인용해 모든 자비를 정당한 제국 봉사로 소명한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "교리와 행정 실리를 정교하게 엮어 낸 답변에 감찰관들이 고개를 끄덕였다. 처벌을 면했을 뿐 아니라 향후 구호 활동의 합법적 명분까지 확보했다.",
          stats: { Int: 6, Fel: 4, Inf: 3 },
          align: { humane: 6, dogmatic: 3 }
        },
        fail: {
          text: "논리가 어긋난 틈을 감찰관이 집요하게 파고들어 혹독한 징계 벌금과 감봉 처분을 피하지 못했다.",
          stats: { Inf: -5, WP: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "지나친 관용이 규율 위반이었음을 시인하고 향후 비인가 구호를 일절 중단하겠다는 서약서에 서명한다",
        effect: {
          text: "감찰관 앞에서 지난날의 온정을 과오로 인정하고 엄격한 제국 규율 준수를 맹세했다. 조력자들은 수사를 피했으나, 옛 동료들은 그대가 마음을 접었다며 조용히 등을 돌렸다.",
          stats: { Inf: -4, WP: 3 },
          faith: 2,
          align: { dogmatic: 6, humane: -4 }
        }
      }
    ],
    source: "Lexicanum: Commissariat / Adeptus Arbites"
  },
  {
    id: "ev_s165_align_humane_07",
    title: "불타는 거주구의 맹세 — 자비의 등불",
    category: "성향",
    once: true,
    alignBias: "humane",
    req: {
      minAge: 18,
      minAlign: { humane: 35 },
      anyDominantAlign: ["humane"],
      excludeTags: [
        "align_beacon_mercy", "astartes", "dreadnought", "custodes", "grey_knight",
        "high_lord_terra", "warmaster", "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "자비 35+ · 주성향 자비",
    weight: 38,
    text: "적의 기습 타격으로 플라즈마 도관이 연쇄 폭발하며 수백 명의 시민이 몰려 있던 환승 돔이 불바다로 변했다. 상부에서는 이차 폭발이 상층 원자로로 번지는 것을 막기 위해 비상 격벽을 즉각 용접 봉쇄하라는 명령을 내렸다. 그러나 펄펄 끓는 증기와 무너지는 잔해 사이로 수동 개방 레버를 누군가 몸으로 붙잡아 준다면, 갇힌 시민들이 빠져나올 마지막 몇 분을 벌 수 있었다.",
    choices: [
      {
        label: "[강인 판정] 끓어오르는 증기 속으로 뛰어들어 수동 개방 장치를 온몸으로 버티며 마지막 시민까지 탈출시킨다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "살갗을 태우는 열기 속에서도 끝내 레버를 놓지 않았다! 수백 명의 시민이 무사히 격벽 너머로 빠져나간 뒤 화염 속에서 걸어 나온 그대는, 그날 이후 어둠을 밝히는 자비의 등불로 불리게 되었다.",
          wounds: -14,
          stats: { T: 6, WP: 7, Fel: 6, Inf: 6 },
          faith: 8,
          align: { humane: 12 },
          addTags: ["align_beacon_mercy"]
        },
        fail: {
          text: "전신에 깊은 화상을 입고 의식을 잃을 뻔했으나, 마지막 순간까지 장치를 붙잡아 수백의 목숨을 건져 냈다. 흉터는 평생 남았으나 살아남은 이들이 그대를 자비의 등불로 기렸다.",
          wounds: -24,
          stats: { T: 4, WP: 5, Fel: 4 },
          faith: 6,
          align: { humane: 10 },
          addTags: ["align_beacon_mercy"]
        }
      },
      {
        label: "침착하게 대열을 지휘해 보조 환기 통로를 뜯어내고 맨 마지막 후미를 맡아 모두를 대피시킨다",
        effect: {
          text: "압사 직전의 아비규환 속에서 그대의 침착한 목소리가 생명의 줄이 되었다. 무너지는 철골에 부상을 입으면서도 끝까지 뒤처진 이들을 업고 나와 자비의 등불이라는 칭호를 얻었다.",
          wounds: -12,
          stats: { WP: 5, Fel: 5, Inf: 4 },
          faith: 5,
          align: { humane: 10 },
          addTags: ["align_beacon_mercy"]
        }
      },
      {
        label: "이를 악물고 비상 격벽 봉쇄 명령을 집행한다 — 상층 원자로와 수만 명의 안전이 우선이다",
        effect: {
          text: "격벽이 닫히며 돔 전체의 화염이 차단되었다. 더 큰 참사를 막았다는 차가운 공훈장은 받았으나, 문 너머의 마지막 두드림은 평생 귓가를 떠나지 않았다.",
          stats: { Int: 4, Inf: 5, WP: 3 },
          align: { dogmatic: 8, humane: -8 }
        }
      }
    ],
    source: "Lexicanum: Imperial Creed / Salamanders Lore"
  },
  {
    id: "ev_s165_align_humane_08",
    title: "등불이 비춘 보답 — 이름 없는 이들의 방패",
    category: "성향",
    once: true,
    req: {
      minAge: 18,
      allTags: ["align_beacon_mercy"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "이력: 자비의 등불",
    weight: 38,
    text: "보급선 습격과 구역 혼란 속에서 그대가 탄약마저 바닥난 채 포위망에 갇히고 말았다. 사방에서 적의 발소리가 조여 오던 절체절명의 순간, 골목 양쪽의 철문이 일제히 열렸다. 일전에 그대가 살려 주었던 부두 인부와 전역병, 이름 없는 시민 수십 명이 임시 방패와 구급 상자, 비밀 탈출 열쇠를 들고 달려 나와 자비의 등불을 버릴 수 없다며 그대 앞을 가로막았다.",
    choices: [
      {
        label: "[교섭 판정] 달려 나온 시민들을 질서 있는 방어 대열로 이끌어 단 한 명의 희생도 없이 포위망을 돌파한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "서로를 믿고 등을 맞댄 대열이 완벽한 호흡으로 적의 포위를 뚫고 빠져나갔다. 자비가 결코 나약함이 아니라 가장 강한 방패임을 온몸으로 증명한 날이었다.",
          wounds: 15,
          stats: { Fel: 7, Inf: 8, WP: 5 },
          faith: 6,
          align: { humane: 8 }
        },
        fail: {
          text: "치열한 돌파 끝에 모두가 안전지대에 도달했다. 몇몇이 상처를 입었으나 서로를 부축하며 웃는 얼굴에 깊은 연대가 깃들었다.",
          wounds: 8,
          stats: { Fel: 4, Inf: 4 },
          align: { humane: 6 }
        }
      },
      {
        label: "이들이 건넨 구급품과 비밀 통로 열쇠만 받아 들고, 비전투원들은 즉시 안전한 곳으로 대피시킨다",
        effect: {
          text: "또다시 누군가를 위험에 빠뜨릴 수는 없었다. 시민들이 열어 준 은밀한 하부 통로를 통해 상처를 추스르며 무사히 위기를 벗어났다.",
          wounds: 12,
          stats: { WP: 5, Ag: 4, Inf: 4 },
          align: { humane: 6 }
        }
      },
      {
        label: "시민들의 용감한 양동 작전을 틈타 매복을 지휘한 적 우두머리를 직접 급습해 위협을 끊어 낸다",
        effect: {
          text: "시민들이 시선을 끄는 사이 단숨에 적 지휘관을 쓰러뜨려 추격전을 완전히 끝냈다. 은혜는 갚고 위협은 뿌리 뽑은 단호한 결단이었다.",
          stats: { WS: 5, BS: 5, Inf: 6 },
          align: { humane: 3, dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Citizens / Codex: Imperial Agents"
  },

  // ============================================================================
  // 교조 · 광신 성향 사건 (ev_s165_align_dogmatic_01 ~ 08)
  // ============================================================================
  {
    id: "ev_s165_align_dogmatic_01",
    title: "거주구 벽보에 스민 불온 전단",
    category: "성향",
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "custodes", "grey_knight", "astartes", "dreadnought", "living_saint", "saint_vessel",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "거주구 환승 아치의 벽면 곳곳에 제국 십일조를 비방하고 여덟 갈래 해방을 선동하는 조잡한 불온 전단이 밤사이 나붙었다. 잉크 묻은 소매를 감추며 남은 전단 뭉치를 품에 안고 도망치려던 인쇄 견습공이 그대의 시선 앞에 덜덜 떨며 주저앉았다. 사소한 불온 사상 하나가 행성 전체를 삼키는 반란의 불씨가 되는 일은 제국에서 흔한 비극이다.",
    choices: [
      {
        label: "[의지 판정] 축성된 횃불로 불온 전단을 공개 소각하고 범인을 즉시 아르비테스 초소로 압송한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "타오르는 전단 재 앞에서 제국의 경고를 선포하자 구경하던 군중이 일제히 아퀼라 성호를 그었다. 치안 당국은 그대의 신속한 단호함을 높이 치하했다.",
          stats: { WP: 5, Inf: 4 },
          faith: 6,
          corruption: -4,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "견습공의 공범들이 어둠 속에서 돌과 쇠파이프를 던지며 저항했으나, 상처를 무릅쓰고 전단을 전부 불태워 이단의 확산을 막았다.",
          wounds: -8,
          stats: { WP: 3 },
          faith: 3,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "전단 뭉치만 전부 압수해 불태우고, 겁에 질린 견습공에게는 엄중한 교리 훈계만 내린 뒤 돌려보낸다",
        effect: {
          text: "불온 문서는 흔적 없이 사라졌고, 견습공은 눈물을 쏟으며 다시는 인쇄기에 손을 대지 않겠다고 맹세했다.",
          stats: { Fel: 3, WP: 2 },
          faith: 4,
          align: { dogmatic: 5, humane: 4 }
        }
      },
      {
        label: "비밀 인쇄소의 위치를 캐낸 뒤, 지하 조직을 신고하지 않는 대가로 정기 상납을 뜯어낸다",
        effect: {
          text: "이단조차 적절히 쥐어짜면 유용한 자금줄이 된다. 위험천만한 거래였으나 당장 손에 쥔 이익과 정보는 무시할 수 없었다.",
          stats: { Inf: 5, Int: 3 },
          corruption: 2,
          align: { ruthless: 8, dogmatic: -4 }
        }
      }
    ],
    source: "Lexicanum: Lex Imperialis / Adeptus Arbites"
  },
  {
    id: "ev_s165_align_dogmatic_02",
    title: "렉스 임페리알리스의 냉엄한 판결",
    category: "성향",
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeTags: [
        "custodes", "grey_knight", "astartes", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "군수창고에서 멸균 의약품 반 상자를 빼돌리다 붙잡힌 하층 구역 인부가 철창 너머로 고개를 숙이고 있었다. 그는 거주구에 번진 열병을 막으려 했을 뿐이라고 호소하지만, 렉스 임페리알리스는 제국 군수물자 절도에 서비터 개조나 가혹한 중형을 규정한다. 현장 치안관이 최종 처분에 대한 그대의 의견과 증언을 정식으로 요청했다.",
    choices: [
      {
        label: "렉스 임페리알리스의 조항대로 가차 없는 법정 최고형을 지지한다 — 동기는 변명이 될 수 없다",
        effect: {
          text: "법의 예외가 허용되는 순간 제국의 질서는 무너진다. 냉엄한 판결이 선고되자 군수창고 일대의 기강이 단숨에 서늘하게 바로잡혔다.",
          stats: { WP: 5, Inf: 5 },
          faith: 5,
          align: { dogmatic: 9, humane: -5 }
        }
      },
      {
        label: "[교섭 판정] 법의 권위는 지키되 서비터 개조 대신 강제 노역형으로 감형해 목숨만은 살리자고 설득한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "치안관은 숙고 끝에 전선 보급 노역형으로 처분을 완화했다. 법과 자비 사이의 좁은 틈에서 한 인간의 영혼을 구해 냈다.",
          stats: { Fel: 5, Int: 3 },
          align: { humane: 7, dogmatic: 2 }
        },
        fail: {
          text: "치안관은 연약한 감상이라며 제안을 일축했다. 인부의 처분을 바꾸지는 못했으나 그대의 탄원 기록은 남았다.",
          stats: { Inf: -3, WP: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "증거 장부를 누락시켜 주는 조건으로 인부가 알고 있는 군수창고 경비 허점을 넘겨받는다",
        effect: {
          text: "서류 한 장이 감쪽같이 사라지며 인부는 풀려났고, 그대의 수중에는 군수창고의 비밀 출입 시간표가 조용히 들어왔다.",
          stats: { Int: 4, Inf: 4 },
          align: { ruthless: 8, dogmatic: -5 }
        }
      }
    ],
    source: "Lexicanum: Lex Imperialis / Dark Heresy: Book of Judgement"
  },
  {
    id: "ev_s165_align_dogmatic_03",
    title: "발전 성소 곁의 불경한 속삭임",
    category: "성향",
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeTags: [
        "custodes", "grey_knight", "astartes", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "긴 야간 경계 도중 발전 성소 곁에 배치된 제국 하급 근무자 한 명이 지친 숨을 내쉬며 불경한 의심을 중얼거렸다. 황금 옥좌는 일만 년째 아무 대답도 하지 않으며, 어두운 별들 너머에 진정한 구원이 기다리고 있다는 속삭임에 그의 눈동자가 열병처럼 흔들렸다. 의심은 이단의 씨앗이며, 침묵은 곧 방조다.",
    choices: [
      {
        label: "오염이 번지기 전에 즉시 에클레시아키 고해사와 이단심문소 정보망에 그를 고발한다",
        effect: {
          text: "새벽이 밝기 전 검은 망토의 조사관들이 그를 조용히 연행해 갔다. 빈자리는 서늘했으나, 의심의 싹을 뿌리째 잘라 냈다는 확신이 신앙을 더욱 단단히 굳혔다.",
          stats: { WP: 5, Inf: 4 },
          faith: 6,
          corruption: -4,
          align: { dogmatic: 9, humane: -4 }
        }
      },
      {
        label: "[의지 판정] 그의 어깨를 붙잡고 동이 틀 때까지 인내의 기도문을 함께 외우며 신앙으로 의심을 태워 없앤다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "밤새 이어진 엄숙한 기도 끝에 그의 눈동자에서 광기가 걷히고 참회의 눈물이 흘렀다. 피를 흘리지 않고 흔들린 영혼을 황제의 빛 아래로 되돌렸다.",
          stats: { WP: 5, Fel: 4 },
          faith: 5,
          align: { dogmatic: 6, humane: 4 }
        },
        fail: {
          text: "밤새 기도를 강권했으나 그의 불길한 속삭임이 오히려 그대의 귓가에도 불쾌한 잔향으로 남았다.",
          stats: { WP: 2 },
          corruption: 2,
          align: { dogmatic: 4 }
        }
      },
      {
        label: "그의 불경한 발언을 데이터 슬레이트에 몰래 녹음해 두고 평생 써먹을 약점으로 삼는다",
        effect: {
          text: "이단 혐의가 담긴 녹음 기록은 어떤 협박장보다 강력한 목줄이 된다. 그날부터 그는 그대의 말이라면 무엇이든 거역하지 못하는 충실한 도구가 되었다.",
          stats: { Int: 4, Inf: 4 },
          align: { ruthless: 8, dogmatic: -3 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Imperial Infantryman's Uplifting Primer"
  },
  {
    id: "ev_s165_align_dogmatic_04",
    title: "공황 속의 강철 같은 국교 규율",
    category: "성향",
    alignBias: "dogmatic",
    req: {
      minAge: 14,
      excludeTags: [
        "custodes", "grey_knight", "astartes", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "외계 함대가 성계 외곽에 나타났다는 거짓 아스트로패스 소문이 퍼지자, 거대한 집합 회랑을 메운 군중이 공황에 빠져 출구로 몰려들었다. 아퀼라 깃발마저 발밑에 짓밟히며 압사 사고와 수비대 보급 마비가 눈앞에 닥쳤다. 이대로 혼란이 번지면 적이 오기도 전에 구역 전체가 자멸할 판이었다.",
    choices: [
      {
        label: "[교섭 판정] 복스 단상에 올라 경고 사격을 울리고 증오의 기도문을 호령해 철혈의 규율로 군중을 제압한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "천둥 같은 호령과 기도문이 회랑을 울리자 미쳐 날뛰던 군중이 제자리에 얼어붙어 무릎을 꿇었다. 공포는 순식간에 결연한 복종으로 바뀌었다.",
          stats: { Fel: 5, WP: 5, Inf: 4 },
          faith: 6,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "흥분한 군중의 물결에 밀려 타박상을 입었으나 끝까지 단상을 지키며 질서를 되찾아 냈다.",
          wounds: -8,
          stats: { WP: 4 },
          faith: 3,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "인파 속으로 직접 내려가 넘어진 이들을 일으켜 세우고 측면 비상구로 차분히 안내한다",
        effect: {
          text: "팔꿈치에 부딪히며 상처를 입었으나, 그대가 열어 준 측면 통로 덕분에 쓰러질 뻔한 시민들이 무사히 회랑을 빠져나갔다.",
          wounds: -6,
          stats: { T: 4, Fel: 4 },
          align: { humane: 7, dogmatic: -2 }
        }
      },
      {
        label: "가장 가까운 내부 보안실의 철문을 안쪽에서 잠그고 소동이 끝날 때까지 자신의 안전만 확보한다",
        effect: {
          text: "철문 밖에서 비명이 이어졌으나 그대는 땀 한 방울 흘리지 않고 안전한 곳에서 상황을 지켜보았다. 살아남는 자가 결국 승자다.",
          stats: { Ag: 3, Int: 3 },
          align: { ruthless: 7, dogmatic: -3 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy / Codex: Astra Militarum"
  },
  {
    id: "ev_s165_align_dogmatic_05",
    title: "이단 심사 법정의 배석 초청",
    category: "성향",
    once: true,
    alignBias: "dogmatic",
    req: {
      minAge: 16,
      minAlign: { dogmatic: 20 },
      anyDominantAlign: ["dogmatic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "custodes", "grey_knight", "astartes", "dreadnought", "living_saint", "saint_vessel",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "교조 20+ · 주성향 교조",
    weight: 34,
    text: "그대의 흔들림 없는 정통성과 엄격한 기강에 깊은 인상을 받은 에클레시아키 상급 고해사와 아르비테스 판관이 긴급 순결 심사 법정의 배석 위원으로 그대를 초청했다. 쇠창살 안에 묶인 열두 명의 피고인 가운데에는 진짜 돌연변이 낙인을 숨긴 이단자도 있었지만, 이웃의 악의적인 모함으로 끌려온 듯한 자들도 섞여 있었다.",
    choices: [
      {
        label: "[지성 판정] 모든 조서를 칼같이 대조해 진짜 이단자만 화형대로 보내고 무고한 피고인은 석방한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "날카로운 심문 끝에 숨어 있던 진짜 사교도 네 명을 정확히 가려내고 거짓 고발자를 역으로 문책했다. 냉철하고 공정한 심판관이라는 명성이 법정을 울렸다.",
          stats: { Int: 6, WP: 5, Inf: 5 },
          faith: 6,
          align: { dogmatic: 8, humane: 4 }
        },
        fail: {
          text: "뒤엉킨 증언 속에서 일부 허점을 놓쳐 심리가 지연되었으나, 결국 주범들을 단죄하며 제국의 위엄을 세웠다.",
          stats: { Int: 3, Inf: -2 },
          faith: 3,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "열두 명 전원에게 정화의 화형 선고를 내린다 — 의심이 머문 자리에 무죄는 없다",
        effect: {
          text: "광장을 밝힌 열두 기둥의 불길 앞에서 고해사는 황제의 정의가 실현되었다고 찬미했다. 그대의 이름만 들어도 이단자들이 떨게 될 서늘한 위세가 쌓였다.",
          stats: { WP: 6, Inf: 6 },
          faith: 9,
          corruption: -6,
          align: { dogmatic: 11, humane: -7 }
        }
      },
      {
        label: "부유한 피고인의 후원자들에게 은밀히 뇌물을 받고 증거 불충분으로 슬그머니 풀어 준다",
        effect: {
          text: "정의의 저울은 황금의 무게에 기울었다. 신성한 법복 아래로 묵직한 재물과 귀족 가문의 빚을 챙겼으나 신앙심은 차갑게 식어 갔다.",
          stats: { Inf: 7, Fel: 3 },
          faith: -6,
          align: { ruthless: 10, dogmatic: -8 }
        }
      }
    ],
    source: "Lexicanum: Ordo Hereticus / Dark Heresy: Blood of Martyrs"
  },
  {
    id: "ev_s165_align_dogmatic_06",
    title: "가혹한 단속의 반발 — 공업 구역의 폭동과 태업",
    category: "성향",
    once: true,
    alignBias: "dogmatic",
    req: {
      minAge: 16,
      minAlign: { dogmatic: 20 },
      anyDominantAlign: ["dogmatic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "custodes", "grey_knight", "astartes", "dreadnought", "living_saint", "saint_vessel",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "교조 20+ · 주성향 교조",
    weight: 34,
    text: "그대가 주도해 온 타협 없는 통금과 십일조 독촉, 교리 검열에 한계까지 내몰린 공업 구역 세 곳이 마침내 폭발했다. 리벳 건과 화염병을 움켜쥔 태업 군중이 감시 성소를 부수고 그대의 거처와 지휘 통로 앞까지 바리케이드를 쌓아 올렸다. 타오르는 화염 너머로 그대의 이름을 저주하는 분노의 함성이 메아리쳤다.",
    choices: [
      {
        label: "[백병 판정] 진압대의 선두에 서서 바리케이드를 정면 돌파해 주동자들을 무력으로 분쇄한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "단호한 무력 진압 앞에 폭도들의 대열이 산산이 무너졌다. 피와 그을음 속에서 공장의 톱니바퀴가 다시 돌기 시작했고, 누구도 감히 그대의 법에 맞서지 못하게 되었다.",
          wounds: -8,
          stats: { WS: 6, WP: 5, Inf: 5 },
          faith: 5,
          align: { dogmatic: 9, humane: -4 }
        },
        fail: {
          text: "빗발치는 리벳 탄과 화염병에 깊은 상처를 입은 채 간신히 진압을 마무리했다. 폭동은 가라앉았으나 상부는 혼란을 키운 책임을 물었다.",
          wounds: -18,
          stats: { WS: 3, Inf: -4 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[교섭 판정] 무기를 내려놓고 발코니에 나서서 할당량 과중을 인정하고 주동자 인도를 조건으로 휴전을 제안한다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "예상치 못한 대화 제안에 격앙된 군중이 멈칫했다. 배급 개선을 약속하며 폭동을 유혈 없이 수습했고, 그대의 엄격함에도 인간의 숨결이 깃들었다.",
          stats: { Fel: 6, Inf: 3 },
          align: { humane: 7, dogmatic: -4 }
        },
        fail: {
          text: "그동안 쌓인 원한이 너무 깊었다. 군중이 던진 화염병과 파편에 부상을 입고 서둘러 안으로 물러나야 했다.",
          wounds: -14,
          stats: { Inf: -4, WP: 2 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "구역 전체의 통풍구를 봉쇄하고 무고한 거주자 여부와 상관없이 진압용 수면 가스를 살포한다",
        effect: {
          text: "자욱한 안개가 내려앉자 거리의 함성이 일시에 멎었다. 가장 빠르고 냉혹한 해결책이었으나, 질식한 피해자들의 시신이 수레째 실려 나갔다.",
          wounds: -6,
          stats: { Inf: 4, Int: 3 },
          align: { dogmatic: 6, ruthless: 6, humane: -6 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Necromunda Rulebook"
  },
  {
    id: "ev_s165_align_dogmatic_07",
    title: "철혈의 심판대 — 교조의 심판자",
    category: "성향",
    once: true,
    alignBias: "dogmatic",
    req: {
      minAge: 18,
      minAlign: { dogmatic: 35 },
      anyDominantAlign: ["dogmatic"],
      excludeTags: [
        "align_iron_dogma", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "교조 35+ · 주성향 교조",
    weight: 38,
    text: "대성당 상공의 하늘이 워프 폭풍의 잔향으로 기괴하게 일그러지자, 공포에 질린 수비대와 시민들의 머릿속에 달콤한 항복과 거짓 안식을 속삭이는 환청이 파고들었다. 틈을 노린 타락한 선동가 한 명이 광장 한복판에서 무기를 버리고 새로운 구원을 맞이하라며 군중을 미혹했다. 흔들리는 전선 전체가 이단으로 무너지기 직전, 모든 시선이 그대에게 쏠렸다.",
    choices: [
      {
        label: "[의지 판정] 사이킥 잡음을 정면으로 뚫고 나아가 거짓 선지자를 처단하고 제국 교리를 광장에 각인시킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 불굴의 의지가 워프의 속삭임을 산산이 찢어 발겼다! 거짓 선지자가 쓰러지자 흔들리던 수천의 군중이 눈물을 흘리며 황제의 이름을 연호했고, 그대는 살아 있는 교조의 심판자로 우뚝 섰다.",
          stats: { WP: 8, Fel: 6, Inf: 6 },
          faith: 12,
          corruption: -10,
          align: { dogmatic: 12 },
          addTags: ["align_iron_dogma"]
        },
        fail: {
          text: "머리가 터질 듯한 사이킥 반발에 피를 토하면서도 끝내 선동가의 숨통을 끊었다. 피투성이가 되어 아퀼라를 높이 든 그대의 모습은 교조의 심판자라는 전설로 남았다.",
          wounds: -16,
          stats: { WP: 5, T: 3 },
          faith: 8,
          corruption: -6,
          align: { dogmatic: 10 },
          addTags: ["align_iron_dogma"]
        }
      },
      {
        label: "눈 하나 깜짝하지 않고 파문 선고를 낭독한 뒤 선동가와 동조자 전원에 대한 즉결 정화를 집행한다",
        effect: {
          text: "광장을 휩쓴 총성과 정화의 불꽃 속에 불신은 단 한 점도 남지 않았다. 공포와 경외 속에 질서가 완벽히 회복되었고, 사람들은 그대를 교조의 심판자라 부르며 머리를 조아렸다.",
          stats: { WP: 6, Inf: 6 },
          faith: 10,
          corruption: -8,
          align: { dogmatic: 10, humane: -6 },
          addTags: ["align_iron_dogma"]
        }
      },
      {
        label: "유혈 사태를 피하기 위해 선동가를 포박하는 데 그치고, 공포에 빠진 시민들을 먼저 진정시킨다",
        effect: {
          text: "피를 흘리지 않고 혼란을 가라앉혔으나, 광신도들은 그대의 처사가 지나치게 미온적이었다며 고개를 저었다.",
          stats: { Fel: 5, WP: 4 },
          faith: 3,
          align: { humane: 8, dogmatic: -6 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Lexicanum: Imperial Creed"
  },
  {
    id: "ev_s165_align_dogmatic_08",
    title: "교조의 낙인이 울리는 순간 — 흔들리는 전선과 부패한 고관",
    category: "성향",
    once: true,
    req: {
      minAge: 18,
      allTags: ["align_iron_dogma"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "이력: 교조의 심판자",
    weight: 38,
    text: "교조의 심판자라는 그대의 서늘한 명성은 이제 성계 곳곳에 두려움과 경외를 함께 불러일으킨다. 위급한 방어전을 앞둔 요새 도시에서, 그대는 사기가 꺾여 도주를 준비하던 민병대와 탄약 십일조를 사적으로 은닉하던 부패한 행성 회계 총감을 동시에 마주했다. 그대가 차가운 시선으로 회랑에 들어선 순간, 사방의 소음이 멎고 숨 막히는 정적이 흘렀다.",
    choices: [
      {
        label: "[교섭 판정] 부패한 회계 총감의 죄상을 그 자리에서 폭로하고 은닉 탄약을 압수해 수비대를 재무장시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "총감은 그대의 이름만 듣고도 무릎을 꿇으며 비밀 창고 열쇠를 바쳤다. 넘쳐 나는 탄약과 되살아난 기강 덕분에 요새의 방어선은 철벽처럼 굳건해졌다.",
          stats: { Inf: 8, Fel: 6, WP: 5 },
          faith: 8,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "총감의 경호원들이 잠시 저항했으나, 그대의 서늘한 위세 앞에 제풀에 물러났다. 창고를 몰수해 전선에 보급하며 교조의 권위를 증명했다.",
          stats: { Inf: 5, WP: 4 },
          faith: 4,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "흔들리는 민병대 앞에서 서릿발 같은 신앙 설교를 터뜨려 공포를 순수한 광신으로 바꿔 놓는다",
        effect: {
          text: "그대의 쩌렁쩌렁한 교리 선포에 눈빛이 달라진 병사들이 일제히 총검을 꽂아 넣었다. 죽음을 두려워하지 않는 광신 부대가 탄생한 순간이었다.",
          stats: { WP: 6, Fel: 5 },
          faith: 10,
          corruption: -5,
          align: { dogmatic: 7 }
        }
      },
      {
        label: "겁에 질린 총감을 비밀리에 압박해 은닉 자금의 상당 부분을 그대의 독점 금고로 돌리게 만든다",
        effect: {
          text: "심판자의 칼날은 이단자뿐 아니라 재물 앞에서도 예리했다. 총감은 목숨을 건진 대가로 막대한 자금을 그대의 이름으로 이전했다.",
          stats: { Inf: 9, Int: 4 },
          align: { ruthless: 8, dogmatic: -4 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy / Codex: Imperial Agents"
  },

  // ============================================================================
  // 암흑 · 탐욕 성향 사건 (ev_s165_align_ruthless_01 ~ 08)
  // ============================================================================
  {
    id: "ev_s165_align_ruthless_01",
    title: "전쟁 특수의 암시장 자극제 거래",
    category: "성향",
    alignBias: "ruthless",
    req: {
      minAge: 14,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "daemon_prince",
        "heretic", "chaos_aligned", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "변방 전선의 소모전이 길어지면서 군용 전투 자극제와 진통 앰플이 황금보다 비싼 값에 거래되고 있었다. 비단 외투를 걸친 상인 브로커가 밀랍으로 봉인된 거래 장부를 그대 앞으로 밀어 놓았다. 최전선 보급 수송선이 출항하기 전 잉여 물량 일부만 미등록 화물선으로 빼돌리면 평생 만지기 힘든 막대한 이익을 나눌 수 있다는 은밀한 제안이었다.",
    choices: [
      {
        label: "[지성 판정] 수송 전표를 정교하게 위조해 암시장 유통을 완벽히 지휘하고 거액의 차익을 챙긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "장부의 숫자 하나 어긋나지 않게 손실분을 처리하고 막대한 이익을 손에 넣었다. 전쟁은 누군가에게 비극이지만, 냉철한 계산가에게는 기회일 뿐이다.",
          stats: { Inf: 7, Int: 5 },
          align: { ruthless: 9 }
        },
        fail: {
          text: "검문 과정에서 장부 오차가 들킬 뻔해 급히 입막음 비용을 뿌리고 빠져나왔다. 몸싸움 끝에 상처까지 입었으나 비밀은 지켜 냈다.",
          wounds: -8,
          stats: { Inf: 2, Int: 2 },
          align: { ruthless: 7 }
        }
      },
      {
        label: "직접 손을 더럽히지 않고 눈감아 주는 조건으로 적당한 소개 수수료만 챙긴다",
        effect: {
          text: "위험은 브로커가 떠안고 실속은 그대가 챙겼다. 조용히 건네받은 금화 자루가 어둠 속에서 묵직하게 울렸다.",
          stats: { Inf: 4, Fel: 2 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "브로커를 즉각 체포해 넘기고 모든 자극제와 진통 앰플을 최전선 야전 병원으로 직송한다",
        effect: {
          text: "피 묻은 이득을 거부하고 약품을 전선으로 보냈다. 당장의 부귀는 놓쳤으나 떳떳한 양심과 전선의 신뢰를 얻었다.",
          stats: { WP: 4, Fel: 3 },
          faith: 4,
          align: { humane: 7, dogmatic: 4, ruthless: -4 }
        }
      }
    ],
    source: "Lexicanum: Black Market / Dark Heresy: Inquisitor's Handbook"
  },
  {
    id: "ev_s165_align_ruthless_02",
    title: "순진한 동료를 제물로 삼은 출세",
    category: "성향",
    alignBias: "ruthless",
    req: {
      minAge: 14,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "daemon_prince",
        "heretic", "chaos_aligned", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor"
      ]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "작전과 보급 결산에서 치명적인 물자 결손이 드러나 상부가 해 질 녘 전까지 책임자를 문책하겠다고 통보했다. 평소 그대의 지도를 철석같이 믿고 따르던 순진한 보좌 인원이 세부 규정을 확인하지 못한 채 최종 수령증에 연대 서명한 결정적 실수를 남긴 상황이다. 누군가는 오늘 이 자리에서 꺾여야 하며, 그 빈자리는 곧 승진의 사다리가 된다.",
    choices: [
      {
        label: "[교섭 판정] 모든 과실을 보좌 인원에게 뒤집어씌우는 완벽한 보고서를 올리고 그의 공석을 차지한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "상부는 그대의 예리한 감사 능력을 칭찬하며 그 빈자리를 그대에게 맡겼다. 끌려가며 믿기지 않는다는 눈으로 돌아보던 동료의 시선을 그대는 차갑게 외면했다.",
          stats: { Inf: 7, Fel: 5 },
          align: { ruthless: 9, humane: -5 }
        },
        fail: {
          text: "보고서의 과장된 정황을 눈치챈 상관이 차가운 시선을 보냈다. 동료는 징계받았으나 그대 역시 신뢰에 금이 갔다.",
          stats: { Inf: -2, Fel: 2 },
          align: { ruthless: 7 }
        }
      },
      {
        label: "보조 장부를 슬쩍 고쳐 책임의 절반만 그에게 떠넘기고 자신은 성실한 보고자로 포장한다",
        effect: {
          text: "티 나지 않게 위기를 넘기고 깔끔한 근무 평점을 챙겼다. 타인의 실수는 언제나 훌륭한 방패가 되어 준다.",
          stats: { Int: 4, Inf: 4 },
          align: { ruthless: 7, humane: -3 }
        }
      },
      {
        label: "행정 착오의 진짜 원인을 정직하게 밝히고 억울한 누명을 쓸 뻔한 보좌 인원을 감싼다",
        effect: {
          text: "상부의 꾸짖음을 대신 받아 체면은 다소 깎였으나, 동료는 눈물을 글썽이며 평생 잊지 못할 은혜를 입었다고 맹세했다.",
          stats: { WP: 5, Fel: 4, Inf: -2 },
          align: { humane: 7, dogmatic: 3, ruthless: -4 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum / Rogue Trader Core Rulebook"
  },
  {
    id: "ev_s165_align_ruthless_03",
    title: "시체 전분과 전장 노획물의 냉혹한 착복",
    category: "성향",
    alignBias: "ruthless",
    req: {
      minAge: 14,
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "daemon_prince",
        "heretic", "chaos_aligned", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor"
      ]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "외곽 폐기장 지대에서 치열한 교전이 끝난 뒤, 수습반이 파손된 장비와 전사자들의 시신을 시체 전분 가공 구역으로 옮기고 있었다. 무너진 수송차 잔해 아래에는 아직 군수 기록에 오르지 않은 정상 작동 동력 전지와 고급 권총, 미등록 귀금속 주괴가 어지럽게 흩어져 있었다. 회수 장교가 도착하기 전이라면 누구든 소리 소문 없이 가로챌 수 있는 순간이었다.",
    choices: [
      {
        label: "[민첩 판정] 귀중품과 동력 전지를 신속히 빼돌리고 가공 배급 물량까지 슬쩍 줄여 암거래상에 넘긴다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "눈 깜짝할 사이에 노획물을 치우고 장부 무게까지 완벽히 맞췄다. 전장의 잿더미는 냉혹한 손길에게 두둑한 횡재를 안겨 주었다.",
          stats: { Ag: 4, Inf: 6, Int: 3 },
          align: { ruthless: 9 }
        },
        fail: {
          text: "무너진 잔해에 팔을 베이고 순찰병에게 들킬 뻔해 물건 절반을 버리고 급히 빠져나왔다.",
          wounds: -10,
          stats: { Ag: 2, Inf: 2 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "추적이 불가능한 미등록 주괴 몇 개만 조용히 챙기고 나머지는 수습반에 맡긴다",
        effect: {
          text: "욕심을 과하게 부리지 않은 덕분에 아무런 의심도 사지 않고 알짜배기 수익만 챙겨 자리를 떴다.",
          stats: { Inf: 4, Ag: 2 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "모든 회수 장비에 정식 인식표를 달고 전사자들이 예우 속에 가공 및 추모되도록 감독한다",
        effect: {
          text: "죽은 자의 것을 탐하지 않는 엄숙한 태도에 수습반 인부들이 고개를 숙였다. 제국의 전사에게 마땅한 마지막 예의를 지켰다.",
          stats: { WP: 4 },
          faith: 5,
          align: { dogmatic: 6, humane: 4, ruthless: -4 }
        }
      }
    ],
    source: "Lexicanum: Corpse-starch / Necromunda: Book of Ruin"
  },
  {
    id: "ev_s165_align_ruthless_04",
    title: "철수선 탑승권과 난민의 마지막 재산",
    category: "성향",
    alignBias: "ruthless",
    req: {
      minAge: 14,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "daemon_prince",
        "heretic", "chaos_aligned", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "inquisitor", "lord_inquisitor"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "성인 14세+",
    weight: 26,
    text: "포격 경보가 울려 퍼지는 우주공항에서 궤도 수송선 탑승구 앞이 탈출하려는 인파로 아수라장이 되었다. 그대의 손에는 여분의 탑승 인가 도장과 일시적인 관문 통제권이 쥐어져 있었다. 오열하는 상인과 하급 귀족들이 가문의 인장 반지와 귀중한 보석함을 그대의 손바닥에 밀어 넣으며 제발 먼저 태워 달라고 애원했다.",
    choices: [
      {
        label: "가장 높은 값을 부른 자들에게 탑승 도장을 경매하고, 빈털터리 난민들은 닫히는 철문 뒤에 남겨 둔다",
        effect: {
          text: "가보와 보석이 수북이 쌓이는 동안 문밖의 울부짖음은 엔진 굉음에 묻혔다. 생사가 갈리는 관문에서 자비보다 확실한 것은 손에 쥔 재물이었다.",
          stats: { Inf: 7, Fel: 3, WP: 2 },
          align: { ruthless: 10, humane: -6 }
        }
      },
      {
        label: "[교섭 판정] 부유층에게 묵직한 통행세를 뜯어내는 대신, 빈 화물칸 구석에 가난한 난민 몇 명을 몰래 끼워 넣는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "실리도 챙기고 최소한의 인명도 건졌다. 부자들은 돈을 내고도 감사를 전했고, 화물칸의 난민들은 숨을 죽이며 살아남았다.",
          stats: { Inf: 5, Fel: 4 },
          align: { ruthless: 6, humane: 2 }
        },
        fail: {
          text: "화물칸 승선이 들통나 소란이 벌어지며 난민들과 부딪혀 타박상을 입었으나, 받아 둔 통행세만큼은 챙겼다.",
          wounds: -6,
          stats: { Inf: 2 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "모든 뇌물을 단호히 뿌리치고 부상자와 노약자, 필수 인원 순서대로 공정하게 탑승시킨다",
        effect: {
          text: "재물을 들이밀던 부유층은 분노했으나, 질서 정연한 대피 덕분에 수송선은 최대 인원을 무사히 싣고 이륙했다.",
          stats: { WP: 4, Fel: 4 },
          faith: 4,
          align: { humane: 8, ruthless: -5 }
        }
      }
    ],
    source: "Lexicanum: Voidship / Rogue Trader: Into the Storm"
  },
  {
    id: "ev_s165_align_ruthless_05",
    title: "아뎁투스 아르비테스의 기습 장부 압수 수색",
    category: "성향",
    once: true,
    alignBias: "ruthless",
    req: {
      minAge: 16,
      minAlign: { ruthless: 20 },
      anyDominantAlign: ["ruthless"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince", "living_saint", "assassin",
        "heretic", "chaos_aligned", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "knight_high_king", "nav_novator",
        "inquisitor", "lord_inquisitor", "chapter_master"
      ],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "암흑 20+ · 주성향 암흑",
    weight: 34,
    text: "한밤중 세 번째 종이 울리기도 전에 무거운 철갑 군화 소리가 복도를 뒤흔들었다. 전투 산탄총으로 무장한 아뎁투스 아르비테스 수사대가 문을 박차고 들이닥쳐, 그대의 이중 장부와 빼돌린 십일조 전표, 비공식 거래 기록을 압수하겠다는 수색 영장을 들이밀었다. 단 몇 분 안에 대처하지 못하면 지금까지 쌓아 올린 모든 것이 산산조각 날 위기였다.",
    choices: [
      {
        label: "[지성 판정] 책상 밑 소각 암호함을 은밀히 작동시켜 진짜 장부를 재로 만들고 완벽한 위장 장부를 넘긴다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "위장 장부를 밤새 뒤진 수사관들은 단 하나의 결정적 증거도 찾지 못한 채 이를 갈며 철수했다. 치밀한 대비가 암흑의 제국을 지켜 냈다.",
          stats: { Int: 6, WP: 4, Inf: 4 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "연기 냄새를 눈치챈 수사관이 소각함을 강제로 열어 절반 탄 전표를 확보했다. 막대한 벌금과 압류, 거친 취조를 견뎌야 했다.",
          wounds: -10,
          stats: { Inf: -8, Int: 2 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "[민첩 판정] 암호 열쇠만 챙겨 정비 환기구로 몸을 빼낸 뒤, 하부 첨탑의 부패한 서기를 매수해 영장을 뭉갠다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "수사대가 빈 방을 뒤지는 사이 이미 뒷거래로 서류 절차를 마비시켜 버렸다. 비용은 들었으나 신변과 핵심 자금은 완벽히 보전했다.",
          stats: { Ag: 5, Inf: -3 },
          align: { ruthless: 7 }
        },
        fail: {
          text: "환기구 출구에서 대기하던 순찰병과 충돌해 심한 부상을 입고 핵심 금고 일부를 압수당했다.",
          wounds: -14,
          stats: { Inf: -7, Ag: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "침착하게 계좌 일부를 공개해 막대한 법정 배상금을 치르고, 하급 거래 파트너에게 모든 혐의를 떠넘긴다",
        effect: {
          text: "꼬리를 자르고 몸통을 살렸다. 출혈은 뼈아팠으나 아르비테스는 꼬리를 물어뜯는 선에서 수사를 종결했다.",
          stats: { Inf: -6, WP: 3 },
          align: { ruthless: 6, dogmatic: 2 }
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites / Dark Heresy: Book of Judgement"
  },
  {
    id: "ev_s165_align_ruthless_06",
    title: "암흑가 신디케이트의 밀약 — 암흑가의 밀거래자",
    category: "성향",
    once: true,
    alignBias: "ruthless",
    req: {
      minAge: 18,
      minAlign: { ruthless: 30 },
      anyDominantAlign: ["ruthless"],
      excludeTags: ["align_shadow_broker", "astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince", "living_saint", "assassin", "high_lord_terra", "knight_high_king", "nav_novator"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "암흑 30+ · 주성향 암흑",
    weight: 38,
    text: "하부 첨탑의 침묵하는 금고실, 황금 장막 너머에 얼굴을 가린 거대 밀수 신디케이트의 수장 셋이 앉아 있었다. 그대의 냉혹한 수완을 높이 산 이들은 자신들과 대등한 의자를 제안하며 두 권의 장부를 펼쳐 놓았다. 첫째 장부는 오직 제국 군수품과 식량 할당량, 귀족 약점만을 다루는 세속의 밀수 장부였고, 둘째 장부는 희미하게 진동하는 외계·워프 금제품의 인장이 찍혀 있었다.",
    choices: [
      {
        label: "[세속 암흑가] 워프의 오물은 단호히 배제하고 군수품·위조 특허·귀족 약점만 다루는 냉혹한 세속 밀약에 서명한다",
        effect: {
          text: "악마에게 영혼을 팔지 않고도 제국의 심장을 쥐고 흔들 수 있다. 국교의 양심은 버렸으나 워프 오염 한 점 없이 지하 경제의 중심에 선 세속적 암흑가의 밀거래자가 되었다.",
          stats: { Inf: 5, Int: 3, Fel: 2 },
          faith: -5,
          align: { ruthless: 10 },
          addTags: ["align_shadow_broker"]
        }
      },
      {
        label: "[금단의 밀수] 워프와 외계 금제품 장부까지 함께 열어젖혀 상상할 수 없는 이권과 금단의 권력을 움켜쥔다",
        effect: {
          text: "금단의 인장에 피를 찍는 순간 서늘한 속삭임이 귓가를 스쳤다. 눈앞에 펼쳐진 막대한 부와 어둠의 인맥은 경이로웠으나, 그 대가로 영혼 깊숙이 짙은 워프 오염이 스며들었다.",
          stats: { Inf: 10, Int: 7, WP: 4 },
          corruption: 14,
          faith: -10,
          align: { ruthless: 12 },
          addTags: ["align_shadow_broker"]
        }
      },
      {
        label: "[교섭 판정] 어느 서약에도 묶이지 않고, 미리 캐 둔 수장들 간의 비밀을 흔들어 밀수망의 주도권을 독자적으로 장악한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "신디케이트의 수장들은 약점이 폭로될까 두려워 그대에게 밀수망의 실질적 주도권과 막대한 이권을 바쳤다. 어느 맹세에도 묶이지 않고 어둠을 지배하는 진정한 암흑가의 밀거래자가 되었다.",
          stats: { Fel: 7, Inf: 7, Int: 4 },
          align: { ruthless: 10 },
          addTags: ["align_shadow_broker"]
        },
        fail: {
          text: "협박이 어긋나자 장막 뒤의 경호원들이 칼을 뽑아 들었다. 부상을 입으며 금고실을 탈출했으나 암흑가와 척을 지고 말았다.",
          wounds: -14,
          stats: { Inf: -3, WS: 2 },
          align: { ruthless: 5 }
        }
      }
    ],
    source: "Lexicanum: Cold Trade / Rogue Trader: Hostile Acquisitions"
  },
  {
    id: "ev_s165_align_ruthless_07",
    title: "배신한 부하와 경쟁 조직의 암살 기도",
    category: "성향",
    once: true,
    alignBias: "ruthless",
    req: {
      minAge: 18,
      minAlign: { ruthless: 25 },
      anyDominantAlign: ["ruthless"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "암흑 25+ · 주성향 암흑",
    weight: 34,
    text: "남의 등을 밟고 올라선 자는 결코 편히 잠들 수 없다. 그동안 그대가 가혹하게 쥐어짜던 심복 부하가 끝내 배신해, 그대의 이동 일정을 경쟁 밀수 조직에 팔아넘겼다. 어둑한 화물 승강기가 중간 층에서 덜컹 멈추는 순간, 천장 격자 너머로 독침이 쏟아지며 단분자 칼날을 뽑아 든 암살자들이 뛰어내렸다.",
    choices: [
      {
        label: "[백병 판정] 좁은 승강기 안에서 칼날을 맞받아 암살자들을 도륙하고 배신한 부하에게 본보기를 세운다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "비좁은 쇠상자가 순식간에 피로 물들었다. 살아 돌아온 그대가 배신자의 최후를 암흑가 전역에 알리자, 누구도 다시는 그대의 등을 노리지 못하게 되었다.",
          wounds: -8,
          stats: { WS: 6, T: 4, Inf: 5 },
          align: { ruthless: 9 }
        },
        fail: {
          text: "독침과 칼날에 치명상을 입을 뻔했으나 악착같이 버텨 암살자들을 꺾었다. 가까스로 목숨은 건졌으나 긴 회복 기간을 겪어야 했다.",
          wounds: -20,
          stats: { WS: 3, T: 3 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "[사격 판정] 승강기 조명등을 쏘아 깨뜨린 뒤 어둠과 연기 속에서 암살자들의 실루엣을 정확히 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "암흑 속에서 번쩍인 총구 화염이 차례로 적들을 쓰러뜨렸다. 비상 해치를 열고 빠져나온 그대의 옷깃에는 먼지 몇 점만 남았다.",
          wounds: -6,
          stats: { BS: 6, Ag: 4, Inf: 3 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "어둠 속 난전 끝에 간신히 탈출했으나 어깨와 옆구리에 깊은 자상을 입고 말았다.",
          wounds: -18,
          stats: { BS: 2, Ag: 2 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "비상 금화 주머니와 암호 표식을 미끼로 던져 혼란을 틈타 승강기 바닥 정비구로 도주한다",
        effect: {
          text: "재물은 다시 모으면 되지만 목숨은 하나뿐이다. 적지 않은 손실과 상처를 입었으나 차가운 생존 본능이 그대를 살려 냈다.",
          wounds: -10,
          stats: { Ag: 4, Inf: -5 },
          align: { ruthless: 5 }
        }
      }
    ],
    source: "Lexicanum: Underhive / Necromunda: House of Shadows"
  },
  {
    id: "ev_s165_align_ruthless_08",
    title: "그림자 인맥의 대가 — 귀족의 치부와 비밀 탈출로",
    category: "성향",
    once: true,
    req: {
      minAge: 18,
      allTags: ["align_shadow_broker"],
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "daemon_prince"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "이력: 암흑가의 밀거래자",
    weight: 38,
    text: "정적들의 모함과 예기치 못한 위기가 그대를 사면초가로 몰아넣은 밤, 기름 먹인 회색 외투를 입은 무명의 전령이 책상 위에 밀랍 원통 하나를 놓고 사라졌다. 그대가 구축해 둔 암흑가의 밀거래망이 상층 첨탑 유력 귀족의 치명적인 배임 증거와, 궤도 세관을 통째로 통과할 수 있는 위조 화물선 허가 코드를 손에 넣어 바친 것이다.",
    choices: [
      {
        label: "[교섭 판정] 귀족의 서재를 은밀히 찾아가 치부 문건을 내밀고, 그를 그대의 충실한 비밀 후원자로 굴복시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "창백해진 귀족은 가문의 명예를 지키기 위해 그대의 정적들을 즉시 찍어 누르고 막대한 자원을 바쳤다. 그림자 인맥이 권력의 최상층까지 뻗어 나갔다.",
          stats: { Inf: 10, Fel: 6, Int: 4 },
          align: { ruthless: 8 }
        },
        fail: {
          text: "귀족의 사설 경호대와 거친 몸싸움 끝에 간신히 합의를 끌어냈다. 상처는 입었으나 정적의 공세는 완전히 무력화했다.",
          wounds: -8,
          stats: { Inf: 4, Fel: 2 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "위조 허가 코드와 비밀 문건을 중개상들에게 분산 매각해 흔적 없이 막대한 비자금을 확보한다",
        effect: {
          text: "어느 쪽에도 원한을 남기지 않으면서 천문학적인 자금과 권위 기반을 다졌다. 암흑가의 밀거래자다운 완벽한 수익 회수였다.",
          stats: { Inf: 8, Int: 4 },
          align: { ruthless: 7 }
        }
      },
      {
        label: "귀족 협박 문건은 불태워 버리고, 확보한 비밀 수송 코드로 봉쇄 구역의 고립된 난민들을 몰래 빼내 준다",
        effect: {
          text: "아무리 냉혹한 밀거래자라도 끝내 넘지 않으려 한 선이 있었다. 이권은 놓쳤으나 어둠 속에서 건져 올린 생명이 차가운 가슴에 묘한 온기를 남겼다.",
          stats: { WP: 5, Fel: 4, Inf: 2 },
          align: { humane: 8, ruthless: -6 }
        }
      }
    ],
    source: "Lexicanum: Cold Trade / Dark Heresy: Haarlock's Legacy"
  },

  // ============================================================================
  // 3파 딜레마 · 속죄 · 초인 · 고위직 성향 사건 (ev_s165_align_dilemma_01 ~ 06)
  // ============================================================================
  {
    id: "ev_s165_align_dilemma_01",
    title: "장터 골목의 훔친 배급빵",
    category: "유년기",
    once: true,
    req: {
      minAge: 8,
      maxAge: 13,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: ["astartes", "custodes", "grey_knight", "transhuman"]
    },
    reqLabel: "유년기 8~13세 · 일반/하층 · 크리그 제외",
    weight: 30,
    text: "북적이는 거주구 장터의 좁은 뒷골목에서 그대보다 어린 고아 소년이 낡은 외투 속에 훔친 해조류 배급빵 한 덩이를 급히 쑤셔 넣고 있었다. 저편에서는 화가 난 상인이 치안대원을 부르며 고함을 치고 있었다. 막다른 골목에 몰린 소년이 깡마른 두 손으로 빵을 꼭 끌어안은 채 공포에 질린 눈으로 그대를 올려다보았다.",
    choices: [
      {
        label: "빈 상자 더미 뒤에 소년을 숨겨 주고 상인이 지나간 뒤 함께 배급빵을 나누어 먹는다",
        effect: {
          text: "거칠고 딱딱한 빵이었지만 두 사람이 나눠 먹자 이상할 만큼 따뜻했다. 그날의 작은 온정이 훗날에도 쉽게 지워지지 않는 마음의 씨앗이 되었다.",
          stats: { Fel: 4, WP: 3 },
          align: { humane: 8 }
        }
      },
      {
        label: "곧장 골목 입구로 뛰어가 상인과 치안대원에게 도둑이 숨은 자리를 정확히 가리킨다",
        effect: {
          text: "소년은 울부짖으며 끌려갔지만, 상인은 정직한 제국 어린이라며 칭찬했다. 법을 어긴 자는 나이를 불문하고 대가를 치른다는 교훈을 일찍 새겼다.",
          stats: { WP: 4, Inf: 3 },
          faith: 3,
          align: { dogmatic: 8 }
        }
      },
      {
        label: "입을 다물어 주는 대가로 빵의 절반과 소년이 차고 있던 놋쇠 단추까지 먼저 빼앗는다",
        effect: {
          text: "소년은 원망스러운 눈으로 물러났으나 그대의 손에는 공짜 배급빵과 쓸 만한 놋쇠 단추가 남았다. 약한 자는 빼앗길 뿐이라는 거친 거리의 법칙을 체득했다.",
          stats: { Ag: 3, Int: 3, Inf: 2 },
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Lexicanum: Hive World / Imperial Life"
  },
  {
    id: "ev_s165_align_dilemma_02",
    title: "산성비 폐허 속의 어린 탈영병",
    category: "성향",
    once: true,
    req: {
      minAge: 18,
      excludeRealms: ["void"],
      excludeWorlds: ["voidborn", "krieg"],
      excludeWorldTags: ["krieg", "voidborn", "feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "성인 18세+",
    weight: 28,
    text: "산성비를 피해 들어선 버려진 통신 중계소 안에서, 갓 징집된 듯 어린 병사 한 명이 연대 휘장을 뜯어낸 채 덜덜 떨고 있었다. 첫 돌격에서 소대 전원이 몰살당한 충격에 전선을 이탈해 숨어든 탈영병이었다. 바깥 폐허 너머로 헌병 순찰대의 탐조등 불빛이 점점 가까이 다가오고 있었다.",
    choices: [
      {
        label: "[민첩 판정] 여분의 외투를 덮어 주고 순찰대의 눈을 피해 후방 수송로로 빠져나가게 도와준다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "탐조등의 사각지대를 뚫고 무사히 그를 후방 수송열차 곁까지 안내했다. 눈물을 쏟으며 사라진 어린 병사의 뒷모습을 보며 무거운 안도를 삼켰다.",
          stats: { Ag: 4, Fel: 4, WP: 3 },
          align: { humane: 9, dogmatic: -4 }
        },
        fail: {
          text: "순찰대에 발각되어 거친 실랑이와 경미한 부상을 겪었으나, 혼란을 틈타 어린 탈영병만큼은 어둠 속으로 놓아 보냈다.",
          wounds: -8,
          stats: { Inf: -3, WP: 2 },
          align: { humane: 7, dogmatic: -3 }
        }
      },
      {
        label: "즉시 무장을 해제하고 커미사리아트 순찰대에 인계한다 — 황제 앞의 비겁함에는 용서가 없다",
        effect: {
          text: "순찰 장교는 그대의 투철한 신고 정신을 치하하며 탈영병을 즉결 심판소로 끌고 갔다. 전선의 기강은 단 한 사람의 동정으로도 무너질 수 없다.",
          stats: { WP: 5, Inf: 4 },
          faith: 5,
          align: { dogmatic: 9, humane: -5 }
        }
      },
      {
        label: "그의 라스카빈과 비상 식량, 위조 통행 서류만 몽땅 빼앗아 암시장에 팔아넘기고 폐허에 버려둔다",
        effect: {
          text: "군용 장비와 서류는 뒷골목에서 쏠쏠한 값으로 팔렸다. 텅 빈 손으로 폐허에 남겨진 탈영병이 그 밤을 넘겼는지는 알 필요조차 없었다.",
          stats: { Inf: 5, Int: 3 },
          align: { ruthless: 9, humane: -5 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Gaunt's Ghosts"
  },
  {
    id: "ev_s165_align_dilemma_03",
    title: "기근이 덮친 하이브의 봉인된 식량 창고",
    category: "성향",
    once: true,
    req: {
      minAge: 20,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel",
        "high_lord_terra", "sector_lord", "planetary_governor",
        "heretic", "chaos_aligned", "daemon_prince"
      ],
      excludeWorldTags: ["feral", "krieg", "voidborn"]
    },
    reqLabel: "필멸자 20세+",
    weight: 28,
    text: "워프 폭풍으로 궤도 식량 바지선의 도착이 끊기면서 하부 하이브에 끔찍한 대기근이 닥쳤다. 그대 앞에는 행성 외곽 성전군에 바칠 십일조 곡물이 가득 쌓인 아드미니스트라툼 예비 창고가 붉은 밀랍 인장으로 봉인되어 있었다. 녹슨 철문 바깥에서는 뼈만 앙상하게 남은 시민들이 희미한 힘으로 문을 두드리며 식량을 애원하고 있었다.",
    choices: [
      {
        label: "붉은 십일조 봉인을 깨뜨리고 굶주린 군중에게 질서 있게 곡물을 비상 배급한다",
        effect: {
          text: "아드미니스트라툼의 엄중한 문책과 권위 실추를 피할 수 없었으나, 그날 밤 굶어 죽을 뻔한 수백의 생명이 따뜻한 죽 한 그릇으로 새벽을 맞았다.",
          stats: { Fel: 5, WP: 5, Inf: -4 },
          faith: 2,
          align: { humane: 10, dogmatic: -5 }
        }
      },
      {
        label: "[의지 판정] 철문 앞에 버티고 서서 십일조 봉인을 사수한다 — 십일조 미납은 행성 전체의 파멸을 부른다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "서릿발 같은 결의 앞에 굶주린 군중도 끝내 문을 넘지 못했다. 성전군에 바칠 십일조는 단 한 톨의 손실도 없이 보존되었고, 상부는 그대의 충성을 높이 평가했다.",
          stats: { WP: 6, Inf: 5 },
          faith: 5,
          align: { dogmatic: 10, humane: -5 }
        },
        fail: {
          text: "돌팔매와 몸싸움 속에 큰 상처를 입으며 간신히 창고 절반의 봉인을 지켰다. 쓰라린 상처 너머로 제국 의무의 냉혹함이 뼈저리게 남았다.",
          wounds: -10,
          stats: { WP: 3 },
          align: { dogmatic: 7, humane: -4 }
        }
      },
      {
        label: "한밤중에 후면 하역구를 열어 곡물 절반을 암시장 중개상 트럭에 빼돌리고 천문학적인 폭리를 취한다",
        effect: {
          text: "기근이 깊어질수록 곡물 한 포대의 가격은 치솟았다. 공식 장부는 쥐 떼 피해로 덮어 버렸고, 그대의 비밀 금고는 눈부시게 불어났다.",
          stats: { Inf: 8, Int: 4 },
          faith: -4,
          align: { ruthless: 10, humane: -6 }
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Adeptus Administratum"
  },
  {
    id: "ev_s165_align_dilemma_04",
    title: "양심의 갈림길 — 핏빛 장부 앞의 속죄",
    category: "성향",
    once: true,
    req: {
      minAge: 22,
      minAlign: { ruthless: 20 },
      excludeTags: ["astartes", "dreadnought", "custodes", "grey_knight", "living_saint", "saint_vessel", "heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "암흑 20+ · 속죄 분기",
    weight: 34,
    text: "깜박이는 기름 등잔 아래 홀로 앉은 밤, 그대는 지금의 자리에 오르기까지 이용하고 짓밟아 온 이들의 이름이 빼곡한 비밀 장부를 마주했다. 문득 그대를 철석같이 믿었다가 파멸한 희생자의 텅 빈 눈동자가 뇌리를 스치며, 오랫동안 굳어 있던 가슴 한구석을 날카롭게 찔렀다. 오늘 밤이라면 이 냉혹한 사슬을 끊어 낼 수도, 혹은 영원히 강철로 굳혀 버릴 수도 있었다.",
    choices: [
      {
        label: "협박 증서를 불태우고 착복했던 자금을 피해자 구역에 익명으로 되돌려 보내며 자비의 길로 돌이킨다",
        effect: {
          text: "재로 변해 가는 장부를 지켜보며 오래된 족쇄가 풀리는 듯한 숨을 내쉬었다. 영향력은 줄었으나 타락의 벼랑 끝에서 인간의 양심을 되찾았다.",
          stats: { WP: 6, Fel: 4, Inf: -4 },
          corruption: -4,
          align: { ruthless: -12, humane: 8 }
        }
      },
      {
        label: "에클레시아키 고해사 앞에 무릎 꿇어 부정한 재물을 십일조로 헌납하고 가혹한 고행 속죄를 받는다",
        effect: {
          text: "등짝을 가르는 채찍질과 차가운 석조 바닥 위의 기도 끝에 탐욕의 때를 씻어 냈다. 피 묻은 속죄는 꺾이지 않는 교조적 신앙으로 다시 벼려졌다.",
          wounds: -10,
          stats: { WP: 6 },
          faith: 8,
          corruption: -6,
          align: { ruthless: -10, dogmatic: 8 }
        }
      },
      {
        label: "쓸데없는 감상을 차갑게 비웃으며 장부를 금고 깊숙이 잠그고 다음 먹잇감을 계산한다",
        effect: {
          text: "후회는 패배자의 사치일 뿐이다. 마지막 남은 망설임마저 짓밟아 버린 그대의 눈빛은 그 어느 때보다 차갑고 선명하게 빛났다.",
          stats: { Int: 4, Inf: 5, WP: 3 },
          align: { ruthless: 8 }
        }
      }
    ],
    source: "Lexicanum: Imperial Creed / Dark Heresy: Blood of Martyrs"
  },
  {
    id: "ev_s165_align_dilemma_05",
    title: "궤도 폭격 회랑의 필멸자들 — 초인의 결단",
    category: "초인",
    once: true,
    req: {
      minAge: 20,
      anyTags: ["astartes"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "grey_knight"]
    },
    reqLabel: "초인: 아스타르테스 · 20세+",
    weight: 36,
    text: "그대의 타격 분대가 무너진 고가도로 너머로 진격해 오는 반역자 기갑 선봉대를 내려다보고 있다. 궤도 상공의 타격 순양함이 살상 구역에 랜스 포격을 조준 완료했으나, 교각 접근로에는 아직 대피하지 못한 제국 필멸자 난민 삼천여 명이 뒤엉켜 있었다. 궤도 포격 승인을 기다리는 함교의 복스 채널 너머로 그대의 전술 판단이 요구되었다.",
    choices: [
      {
        label: "[강인 판정] 불칸의 후예들처럼 고가도로로 강하해 세라마이트 장갑 방벽을 세우고 필멸자들이 탈출할 때까지 적 선봉을 온몸으로 막아 낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "세라마이트 장갑에 포탄이 튀는 가운데 한 걸음도 물러서지 않고 삼천의 필멸자를 사선 밖으로 빼낸 뒤 궤도 포격을 호출했다. 초인의 힘은 인류를 지키기 위해 존재한다는 맹세가 전장을 울렸다.",
          wounds: -10,
          stats: { WS: 5, T: 6, WP: 6, Inf: 5 },
          faith: 5,
          align: { humane: 11 }
        },
        fail: {
          text: "적 중화기에 장갑이 찢기고 깊은 상처를 입었으나, 끝내 대열을 지켜 난민 대다수를 구출했다. 궤도 포격이 뒤늦게 적 기갑을 불태울 때 필멸자들은 천사의 이름을 외쳤다.",
          wounds: -18,
          stats: { T: 4, WP: 4 },
          align: { humane: 9 }
        }
      },
      {
        label: "아스타르테스의 냉엄한 전술 효율에 따라 감상을 배제하고 즉각 궤도 폭격을 승인한다",
        effect: {
          text: "눈부신 랜스 광선이 교각과 반역자 기갑 선봉을 단숨에 증발시켰다. 수천의 필멸자도 함께 재가 되었으나, 성계 전체를 위협하던 적 주력을 최소 손실로 섬멸한 완벽한 전술 승리였다.",
          stats: { Int: 5, WP: 5, Inf: 5 },
          faith: 4,
          align: { dogmatic: 11, humane: -5 }
        }
      },
      {
        label: "도망치는 인파가 적 전차의 기동을 가로막는 미끼가 되도록 포격을 잠시 늦췄다가 적 지휘 전차가 멈춘 순간 일제 사격을 내린다",
        effect: {
          text: "혼란에 빠진 난민들이 자연스레 적 기갑의 속도를 묶어 놓은 틈을 타 지휘 전차까지 한꺼번에 잿더미로 만들었다. 비정할 만큼 효율적인 학살이었으나 전과는 압도적이었다.",
          stats: { Int: 6, BS: 4, Inf: 4 },
          align: { ruthless: 11, humane: -7 }
        }
      }
    ],
    source: "Codex: Space Marines / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s165_align_dilemma_06",
    title: "하부 하이브 역병 선포령 — 권좌의 무게",
    category: "고위직",
    once: true,
    req: {
      minAge: 30,
      anyTags: [
        "planetary_governor", "sector_lord", "high_lord_terra", "inquisitor",
        "rogue_trader", "general_rank", "warmaster", "navy_admiral", "cardinal", "magos"
      ],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "고위직 · 30세+",
    weight: 36,
    text: "지휘 성소의 거대한 홀로리스 작전탁 위로 제3하부 하이브를 뒤덮은 붉은 역병 경보 룬이 맥박처럼 점멸하고 있다. 전염성이 극심한 괴질이 상층 군수 공장 첨탑으로 번질 경우 행성 전체의 십일조 생산이 마비될 위기다. 전략 참모와 생물학 사제, 아르비테스 사령관이 침묵 속에 그대의 인장 반지를 바라보고 있으며, 그대의 서명 한 번에 이백만 제국 영혼의 생사가 갈린다.",
    choices: [
      {
        label: "[지성 판정] 막대한 물류 손실을 감수하고 함대 의료 바지선과 검역 셔틀을 총동원해 비감염 구역을 선별 대피시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정밀한 격리선과 신속한 궤도 검역 작전 덕분에 역병을 차단하면서도 백만 이상의 시민을 구해 냈다. 권좌의 위엄은 파괴가 아니라 보존에서 비롯됨을 행성 전체에 각인시켰다.",
          stats: { Fel: 6, Int: 5, Inf: 5 },
          faith: 4,
          align: { humane: 11, dogmatic: -3 }
        },
        fail: {
          text: "대규모 대피 과정에서 막대한 행정 비용과 군수 차질이 발생해 상부와 귀족 의회의 거센 비난을 받았으나, 수십만의 생명을 화염에서 건져 냈다.",
          stats: { Inf: -5, Int: 3, WP: 4 },
          align: { humane: 8 }
        }
      },
      {
        label: "모든 격벽을 용접 봉쇄하고 제3하부 하이브 외곽에 프로메튬 화염 저지선을 선포해 역병을 뿌리째 소각한다",
        effect: {
          text: "사흘 밤낮으로 솟아오른 정화의 불기둥이 역병과 함께 이백만의 비명을 삼켰다. 상층 공장과 행성 십일조는 단 하루도 멈추지 않았으며, 제국의 냉혹한 생존 법칙이 지켜졌다.",
          stats: { WP: 6, Inf: 6 },
          faith: 6,
          corruption: -5,
          align: { dogmatic: 11, humane: -6 }
        }
      },
      {
        label: "감염 구역의 노동자들을 무장 자동 포탑으로 공장에 가둔 채, 쓰러지기 직전까지 최후의 전쟁 십일조를 쥐어짠다",
        effect: {
          text: "죽어 가는 하부 하이브에서 마지막 탄약 상자와 군수품까지 완벽히 뽑아낸 뒤에야 봉쇄를 내렸다. 천문학적인 생산 실적과 이권이 그대의 권좌 아래 쌓였으나, 역사의 기록은 이를 냉혹한 폭정으로 새겼다.",
          stats: { Inf: 9, Int: 5 },
          faith: -4,
          align: { ruthless: 11, humane: -8 }
        }
      }
    ],
    source: "Lexicanum: Planetary Governor / Codex: Imperialis"
  }
];
