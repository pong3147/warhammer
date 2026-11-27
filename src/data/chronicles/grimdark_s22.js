// 일상 연대기 — 그림다크 난이도 전용 냉혹한 일상 및 마모 트랙 (Stage 22-B Track 4)
export default [
  {
    id: "ch_s22_grim_01",
    badge: "그림다크 유년기",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 6,
      maxAge: 13,
      maxSocialTier: "common",
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "잿빛 매연이 내려앉은 폐기물 선별장에서 어른들 틈에 끼어 쇠붙이를 골라냈다. 손끝이 베여도 작업을 멈추면 저녁 배급표가 깎였다.",
    effect: { wounds: -2, stats: { T: 1 } }
  },
  {
    id: "ch_s22_grim_02",
    badge: "그림다크 유년기",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 6,
      maxAge: 13,
      maxSocialTier: "common",
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      anyWorldTags: ["hive", "industrial", "civilised", "shrine"],
      excludeRealms: ["cloistered", "heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "동이 트기 전부터 굶주린 배를 움켜쥐고 교구 배급 줄에 섰다. 쉰 목소리로 황제 찬가를 읊어야만 딱딱한 시체 전분 한 덩이를 건네받았다.",
    effect: { wounds: -1, faith: 1, stats: { WP: 1 } }
  },
  {
    id: "ch_s22_grim_03",
    badge: "그림다크 훈육",
    priority: 2,
    req: {
      difficulty: "grimdark",
      minAge: 8,
      maxAge: 13,
      anyTags: ["schola", "noble", "military_blood"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    text: "유년기 교관의 회초리는 사소한 망설임조차 용납하지 않았다. 자부심이나 동정심 같은 감정은 제국의 무게를 버티는 데 방해만 된다고 배웠다.",
    effect: { wounds: -2, stats: { WP: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_04",
    badge: "매뉴팩토룸 마모",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["menial_worker", "guild_artisan"],
      anyWorldTags: ["hive", "industrial", "forge"],
      excludeWorlds: ["krieg"]
    },
    text: "열여덟 시간 연속 교대가 끝날 무렵, 환기구에서 뿜어져 나온 유독성 철가루가 폐부 깊숙이 달라붙었다. 붉은 가래를 뱉어 내고도 내일 교대 종을 기다렸다.",
    effect: { wounds: -3, stats: { T: 1, Ag: -1 } }
  },
  {
    id: "ch_s22_grim_05",
    badge: "십일조의 무게",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["menial_worker"],
      excludeWorldTags: ["feral"],
      excludeWorlds: ["krieg"]
    },
    text: "구역 생산량이 행성 십일조 기준에 미달했다는 이유로 사흘 치 식수 배급이 끊겼다. 녹슨 배관에서 떨어지는 미지근한 응축수로 겨우 목을 축였다.",
    effect: { wounds: -2, faith: -1, stats: { WP: 1 } }
  },
  {
    id: "ch_s22_grim_06",
    badge: "언더하이브 산성비",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["underhive_ganger", "underhive_boss"],
      anyWorldTags: ["hive", "underhive"],
      excludeWorlds: ["krieg"]
    },
    text: "상층 돔에서 흘러내린 폐액이 낡은 방독면 틈새로 스며들었다. 경쟁 갱단의 기습을 피해 어둠 속에 웅크린 채 젖은 탄창을 닦았다.",
    effect: { wounds: -3, stats: { BS: 1 } }
  },
  {
    id: "ch_s22_grim_07",
    badge: "장부 위의 의심",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["guild_artisan", "guild_magnate", "hive_crime_lord"],
      excludeWorldTags: ["feral"],
      excludeWorlds: ["krieg"]
    },
    text: "감찰관에게 뇌물을 건넨 뒤에도 밀고의 공포는 가시지 않았다. 거래처 명단을 불태우고 잠들기 전까지 문고리의 빗장을 두 번씩 확인했다.",
    effect: { stats: { Int: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_08",
    badge: "방위군의 진압",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["pdf_trooper"],
      excludeWorldTags: ["feral"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"]
    },
    text: "배급 축소에 항의하던 노동자 시위대를 향해 진압 방패를 앞세워 전진했다. 낡은 라스건이 과열될 때마다 씁쓸한 침묵만이 목구멍을 메웠다.",
    effect: { wounds: -2, faith: -1, stats: { WS: 1 } }
  },
  {
    id: "ch_s22_grim_09",
    badge: "참호의 인력 소모",
    priority: 3,
    req: {
      difficulty: "grimdark",
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeWorldTags: ["feral"]
    },
    text: "사흘 밤낮 이어진 포격으로 진흙탕이 된 참호에서 썩어 가는 발을 질질 끌며 버텼다. 사령부의 증원 명령 대신 전사한 전우의 인식표를 거두는 일이 일상이 되었다.",
    effect: { wounds: -4, stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_s22_grim_10",
    badge: "오염된 보급품",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["astra_militarum", "militarum_sergeant", "militarum_officer"],
      excludeWorldTags: ["feral"]
    },
    text: "기한이 수십 년 지난 시체 전분 통조림과 쇠 냄새가 진동하는 정화수로 배를 채웠다. 복통을 참으며 야간 경계 초소에 서는 동안 체력이 서서히 깎여 나갔다.",
    effect: { wounds: -3, stats: { T: -1, WP: 1 } }
  },
  {
    id: "ch_s22_grim_11",
    badge: "강하 약물의 대가",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["tempestus_scion", "tempestus_prime_cmd"]
    },
    text: "고공 강하 직전 투여한 전투 각성제가 식은 뒤에도 손끝의 미세한 떨림이 멈추지 않았다. 수면 최면 교육 탓에 꿈조차 제국 교리 암송으로 채워졌다.",
    effect: { wounds: -3, stats: { BS: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_12",
    badge: "방아쇠 뒤의 고립",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["commissar", "lord_commissar", "commissar_general"]
    },
    text: "공황에 빠져 후퇴하려던 보병을 즉결 처분한 뒤 볼트 피스톨의 총열을 식혔다. 병사들의 두려움 어린 시선 속에서 장교 막사의 고독만 깊어졌다.",
    effect: { faith: 1, stats: { WP: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_13",
    badge: "방사능 순찰",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["skitarii", "skitarii_marshal"]
    },
    text: "유독성 방사능 구역을 횡단하는 동안 남아 있던 생체 피부가 검게 변색되었다. 고통 신호를 억제하고 성유를 바른 관절만 기계적으로 움직였다.",
    effect: { wounds: -3, stats: { T: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_14",
    badge: "냉혹한 효율 연산",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["tech_priest", "archmagos", "fabricator_locum", "fabricator_general"]
    },
    text: "냉각수 누출 사고 보고를 받고 인명 구조 대신 서비터 코어 회수를 우선 지시했다. 논리 회로는 완벽한 판단이라 결론지었으나 주변의 공기는 차갑게 식었다.",
    effect: { stats: { Int: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_15",
    badge: "금단의 회로 잔해",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["tech_priest", "skitarii"],
      excludeTags: ["custodes", "grey_knight", "living_saint"]
    },
    text: "오래된 전장에서 수거한 데이터 슬레이트를 해독하던 중 불경한 이진 코드의 잔상이 인식 회로에 스쳤다. 즉시 정화 기도문을 읊었으나 찜찜한 노이즈가 남았다.",
    effect: { corruption: 1, stats: { Int: 1 } }
  },
  {
    id: "ch_s22_grim_16",
    badge: "성당의 굶주림",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["ecclesiarchy_priest", "ministorum_confessor", "ecclesiarchy_cardinal"],
      excludeWorldTags: ["feral"],
      excludeWorlds: ["krieg"]
    },
    text: "기근에 시달리는 교구민들 앞에서 대성당 금박 첨탑의 보수 헌금을 거두어야 했다. 성직의 권위는 높아졌으나 내면의 신앙에는 작은 균열이 일었다.",
    effect: { faith: -1, stats: { Inf: 1 } }
  },
  {
    id: "ch_s22_grim_17",
    badge: "철야 참회",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["sororitas_novitiate", "adepta_sororitas", "sororitas_celestian", "canoness"]
    },
    text: "전투에서 살아남은 것조차 부족함의 증거라 여기며 차가운 석조 바닥에서 밤새 고행을 이어 갔다. 무릎과 어깨의 상처가 아물 틈이 없었다.",
    effect: { wounds: -3, faith: 1, stats: { WP: 1 } }
  },
  {
    id: "ch_s22_grim_18",
    badge: "심문소의 서명",
    priority: 3,
    req: {
      difficulty: "grimdark",
      anyCareers: ["inquisition_interrogator", "inquisitor", "lord_inquisitor"]
    },
    text: "오염 의심 구역의 주민 수만 명을 선제 격리 후 소각하라는 칙령에 인장을 찍었다. 제국을 지키기 위한 필수적 잔혹함이었지만 손끝의 온기는 식어 버렸다.",
    effect: { faith: -1, stats: { WP: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_19",
    badge: "금서의 속삭임",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["inquisition_acolyte", "inquisition_interrogator", "inquisitor"],
      excludeTags: ["custodes", "grey_knight", "living_saint", "blank", "omega_pariah"]
    },
    text: "압수한 이단 문서의 암호를 대조하던 밤, 글자 사이에서 기이한 두통과 함께 낯선 속삭임이 스며들었다. 성수로 관자놀이를 적시며 정신을 다잡았다.",
    effect: { corruption: 1, stats: { Int: 1, WP: -1 } }
  },
  {
    id: "ch_s22_grim_20",
    badge: "하층 갑판의 실종",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["imperial_navy", "navy_captain", "navy_admiral"]
    },
    text: "워프 항해 도중 겔러 필드가 미세하게 요동치자 하층 포탄 갑판의 인부 한 조가 흔적도 없이 사라졌다. 항해 일지에는 '작업 중 손실' 한 줄만 기록되었다.",
    effect: { wounds: -2, stats: { WP: 1 } }
  },
  {
    id: "ch_s22_grim_21",
    badge: "백 년 늦은 구원",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["administratum", "admin_prefect_rank", "admin_departmento_head"]
    },
    text: "120년 전 이미 멸망한 행성으로 구원 수송선을 보내는 오기 문서를 발견했다. 절차를 되돌리면 문책당할 것을 알기에 묵묵히 결재 도장을 찍었다.",
    effect: { faith: -1, stats: { Int: 1 } }
  },
  {
    id: "ch_s22_grim_22",
    badge: "렉스 임페리알리스",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["arbites", "arbites_judge_rank", "arbites_marshal"],
      excludeWorldTags: ["feral"],
      excludeWorlds: ["krieg"]
    },
    text: "식량 창고를 습격한 굶주린 폭도들을 제압한 뒤, 피가 엉긴 쇼크 마울을 닦으며 제국 법전을 복창했다. 법의 무게는 늘 피의 대가를 요구한다.",
    effect: { wounds: -2, stats: { WS: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_23",
    badge: "변경의 밀거래",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["rt_seneschal", "rogue_trader", "rt_lord_captain"],
      excludeTags: ["custodes", "grey_knight", "living_saint"]
    },
    text: "보급난을 넘기기 위해 미개척 성계의 암시장에서 출처 불명의 유물을 거래했다. 선단은 연명했으나 금고 안에 봉인한 상자에서 기묘한 냉기가 새어 나왔다.",
    effect: { corruption: 1, stats: { Inf: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_24",
    badge: "버려진 구원 신호",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["astartes_brother", "astartes_sergeant"],
      excludeBodyClasses: ["dreadnought"],
      excludeTags: ["dreadnought"]
    },
    text: "궤도 복스망에 다섯 행성의 구조 요청이 동시에 쏟아졌으나 챕터의 타격 함선은 단 한 곳만 구할 수 있었다. 나머지 네 행성의 침묵을 등지고 강하 포드에 올랐다.",
    effect: { wounds: -2, stats: { WP: 1 } }
  },
  {
    id: "ch_s22_grim_25",
    badge: "초인의 냉정한 거리",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["astartes_brother", "astartes_veteran", "astartes_captain", "chapter_master"]
    },
    text: "함께 방어선을 지키던 필멸자 연대가 한 해 만에 전멸과 교체를 반복하는 모습을 지켜보았다. 변치 않는 초인의 갑주 속에서 인간미는 더욱 옅어졌다.",
    effect: { stats: { WP: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_26",
    badge: "억제 두건의 침식",
    priority: 3,
    req: {
      difficulty: "grimdark",
      anyCareers: ["sanctioned_psyker", "primaris_psyker"],
      excludeTags: ["custodes", "grey_knight", "living_saint"]
    },
    text: "정신 억제 두건의 신경 침이 관자놀이를 파고드는 고통 속에서 검은 함선 선창의 악몽이 되살아났다. 워프의 시선이 등 뒤에서 떨어지지 않았다.",
    effect: { wounds: -3, corruption: 1, stats: { WP: 1 } }
  },
  {
    id: "ch_s22_grim_27",
    badge: "마녀를 향한 시선",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["sanctioned_psyker", "primaris_psyker"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    text: "방금 전 목숨을 구해 준 가드맨들마저 전투가 끝나자 슬그머니 거리를 두며 부적을 만지작거렸다. 아군 진영 한복판에서도 늘 홀로 서 있어야 했다.",
    effect: { faith: -1, stats: { WP: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_28",
    badge: "배교자의 불면",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["chaos_cultist", "chaos_champion"],
      excludeTags: ["custodes", "grey_knight", "living_saint"]
    },
    text: "은신처의 피 묻은 제단 옆에서 단검을 쥔 채 쪽잠을 잤다. 심문소 사냥개뿐 아니라 등 뒤를 노리는 같은 교단원들의 칼날까지 경계해야 했다.",
    effect: { wounds: -3, corruption: 1, stats: { WS: 1 } }
  },
  {
    id: "ch_s22_grim_29",
    badge: "부식되는 갑주",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["renegade_marine", "chaos_lord"],
      excludeTags: ["custodes", "grey_knight", "living_saint"]
    },
    text: "보급이 끊긴 지 오래된 함선에서 뜯어낸 고철로 부서진 세라마이트 갑주를 땜질했다. 워프의 변이가 틈새로 스며들수록 되돌릴 길은 더 멀어졌다.",
    effect: { wounds: -2, corruption: 1, stats: { T: 1, Fel: -1 } }
  },
  {
    id: "ch_s22_grim_30",
    badge: "어둠 신들의 변덕",
    priority: 2,
    req: {
      difficulty: "grimdark",
      anyCareers: ["chaos_cultist", "chaos_champion", "renegade_marine", "chaos_lord"],
      excludeBodyClasses: ["daemonic"],
      excludeTags: ["custodes", "grey_knight", "living_saint", "daemon_prince"]
    },
    text: "어둠의 신들이 내린 속삭임은 언제나 피와 증오의 대가를 요구했다. 헛된 약속을 붙든 채 끝없는 소모전의 톱니바퀴 속을 걸어갔다.",
    effect: { faith: -1, corruption: 1, stats: { WP: 1 } }
  }
];
