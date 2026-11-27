// 일상 연대기 — 특화 트레이드오프(20건) & 상황적 마모(18건)
export default [
  {
    id: "ch_s21_wt_01",
    badge: "백병전 숙달",
    priority: 2,
    req: { minAge: 16, anyRealms: ["military"], anyFocus: ["combat"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["ogryn"] },
    text: "체인소드와 단검을 하루 종일 휘두르며 반사 신경을 극한까지 끌어올렸다. 전술 교범을 읽을 시간은 줄었지만 백병전의 감각만큼은 날카롭게 벼려졌다.",
    effect: { stats: { WS: 2, Int: -1 } }
  },
  {
    id: "ch_s21_wt_02",
    badge: "정밀 저격 훈련",
    priority: 2,
    req: { minAge: 16, anyRealms: ["military"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["ogryn"] },
    text: "호흡을 멈추고 풍속을 계산하며 하루 종일 조준경 너머만 응시했다. 사격 정밀도는 눈에 띄게 올랐으나 말수가 줄어 동료들과 어울리는 데는 서툴러졌다.",
    effect: { stats: { BS: 2, Fel: -1 } }
  },
  {
    id: "ch_s21_wt_03",
    badge: "중화기 운용",
    priority: 2,
    req: { minAge: 16, anyRealms: ["military"], excludeWorldTags: ["feral"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["ratling"] },
    text: "묵직한 탄약통과 중화기 총신을 어깨에 메고 행군을 거듭해 맷집과 근력이 붙었다. 대신 몸이 무거워져 민첩한 회피 기동은 예전보다 둔해졌다.",
    effect: { stats: { T: 1, Ag: -1 } }
  },
  {
    id: "ch_s21_wt_04",
    badge: "척후 기동 훈련",
    priority: 2,
    req: { minAge: 15, anyFocus: ["combat", "survival"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "living_saint", "ogryn", "high_lord_terra"] },
    text: "불필요한 짐을 덜어 내고 좁은 통로와 폐허를 은밀히 주파하는 훈련에 매달렸다. 발놀림은 한결 가벼워졌으나 정면 힘싸움을 버틸 맷집은 다소 빠졌다.",
    effect: { stats: { Ag: 1, T: -1 } }
  },
  {
    id: "ch_s21_wt_05",
    badge: "서기관실 감사",
    priority: 2,
    req: { minAge: 16, anyRealms: ["civilian"], minSocialTier: "common", excludeWorldTags: ["feral"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeTags: ["ogryn", "high_lord_terra"] },
    text: "곰팡내 나는 양피지와 데이터 슬레이트 더미 속에서 십일조 장부를 밤새 대조했다. 복잡한 행정 계산은 훤해졌지만 햇빛을 못 본 육신은 부쩍 약해졌다.",
    effect: { stats: { Int: 2, T: -1 } }
  },
  {
    id: "ch_s21_wt_06",
    badge: "격실 사격 교정",
    priority: 2,
    req: { minAge: 16, anyRealms: ["void"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["ogryn"] },
    text: "함선 선창의 인공 표적을 향해 어두컴컴한 격실에서 사격 연습을 반복했다. 조준 감각은 익혔으나 좁은 실내에만 틀어박힌 탓에 기동 반응과 주변 경계심이 무뎌졌다.",
    effect: { stats: { BS: 1, Ag: -1 } }
  },
  {
    id: "ch_s21_wt_07",
    badge: "성가대 철야 고행",
    priority: 2,
    req: { minAge: 14, anyRealms: ["cloistered"], excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["assassin", "astartes", "custodes", "grey_knight", "living_saint", "sister_of_silence", "blank", "omega_pariah"] },
    text: "차가운 석조 바닥에 무릎을 꿇고 밤새 성가를 읊으며 잡념을 씻어 냈다. 의지는 강철처럼 굳어졌지만 굳어 버린 관절 탓에 몸놀림이 뻣뻣해졌다.",
    effect: { stats: { WP: 1, Ag: -1 }, faith: 2 }
  },
  {
    id: "ch_s21_wt_08",
    badge: "사교계 정략 수완",
    priority: 2,
    req: { minAge: 18, anySocialTiers: ["elite", "apex"], anyFocus: ["politics"], excludeRealms: ["heretic", "mechanicus"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeWorldTags: ["feral"], excludeTags: ["assassin", "sororitas", "saint_vessel", "ogryn"] },
    text: "연회장을 돌며 귀족과 함장들의 비위를 맞추고 미소 뒤에 칼을 숨기는 법을 익혔다. 언변은 유려해졌으나 사치와 아첨 속에서 강직한 의지는 조금씩 깎여 나갔다.",
    effect: { stats: { Fel: 2, WP: -1 } }
  },
  {
    id: "ch_s21_wt_09",
    badge: "밀실 인맥 거래",
    priority: 2,
    req: { minAge: 18, anyRealms: ["civilian", "cloistered"], minSocialTier: "common", excludeWorldTags: ["feral"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeTags: ["assassin", "ogryn", "sororitas", "saint_vessel"] },
    text: "수면 시간을 쪼개 청원서와 밀실 거래를 조율하며 권력의 줄을 넓혔다. 영향력은 커졌지만 누적된 과로와 독한 리카프 탓에 체력이 바닥났다.",
    effect: { stats: { Inf: 1, T: -1 } }
  },
  {
    id: "ch_s21_wt_10",
    badge: "초계 경계 숙달",
    priority: 2,
    req: { minAge: 15, anyRealms: ["civilian", "military", "void"], maxCareerTier: 4, excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["high_lord_terra", "sector_lord", "planetary_governor", "warmaster"] },
    text: "교대 근무마다 그림자 속 작은 기척과 복스 잡음까지 놓치지 않으려 신경을 곤두세웠다. 기척에 반응하는 감각은 극도로 예민해졌으나 날 선 태도 탓에 주변 사람들이 접근을 꺼렸다.",
    effect: { stats: { Ag: 2, Fel: -1 } }
  },
  {
    id: "ch_s21_wt_11",
    badge: "기계교 회로 동조",
    priority: 3,
    req: { minAge: 16, anyRealms: ["mechanicus"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "육성 대화를 줄이고 이진법 성가로 데이터 노드를 직접 동기화하는 데 몰두했다. 연산 능력은 비약적으로 올랐으나 필멸자의 감정과 대화를 이해하는 감각은 옅어졌다.",
    effect: { stats: { Int: 2, Fel: -1 } }
  },
  {
    id: "ch_s21_wt_12",
    badge: "내구 행군 단련",
    priority: 2,
    req: { minAge: 15, anyRealms: ["military", "cloistered"], excludeTrees: ["ecclesiarchy", "officio_assassinorum", "custodes", "grey_knights", "living_saint", "psyker"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "assassin", "high_lord_terra", "warmaster"] },
    text: "거친 자갈밭과 독기 어린 진창을 완전 군장으로 행군하며 고통을 견디는 법을 배웠다. 맷집은 단단해졌으나 무거운 근육과 굳은살 탓에 민첩함은 줄었다.",
    effect: { stats: { T: 2, Ag: -1 } }
  },
  {
    id: "ch_s21_wt_13",
    badge: "이단 심문과 취조",
    priority: 3,
    req: { minAge: 18, anyTags: ["inquisition_agent", "inquisitor", "arbites", "commissar", "ecclesiarchy"], excludeRealms: ["heretic"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "용의자들의 변명을 냉혹하게 꺾으며 진실을 캐내는 심문 기법을 갈고닦았다. 흔들리지 않는 정신력을 얻었으나 차가운 눈빛 때문에 친교를 맺기는 어려워졌다.",
    effect: { stats: { WP: 1, Fel: -1 }, align: { dogmatic: 2 } }
  },
  {
    id: "ch_s21_wt_14",
    badge: "언더하이브 암투",
    priority: 2,
    req: { minAge: 14, anySocialTiers: ["underclass", "common"], anyWorldTags: ["hive", "industrial"], excludeRealms: ["cloistered", "mechanicus", "void", "military"], excludeTrees: ["administratum", "arbites"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"] },
    text: "녹슨 파이프 틈을 타고 몽둥이와 단검 세례를 피해 도망치는 법을 몸으로 익혔다. 반사 신경은 빨라졌으나 글자를 읽고 셈을 따질 여유는 잃어 갔다.",
    effect: { stats: { Ag: 1, Int: -1 } }
  },
  {
    id: "ch_s21_wt_15",
    badge: "함교 항법 연산",
    priority: 3,
    req: { minAge: 16, anyRealms: ["void"], anyTags: ["navy", "navigator", "rogue_trader"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["ogryn"] },
    text: "성도와 중력 방정식을 계산하며 무중력 함교에 오래 머물렀다. 공간 판단력은 정교해졌으나 무술 훈련을 거른 탓에 근접전 감각이 무뎌졌다.",
    effect: { stats: { Int: 1, WS: -1 } }
  },
  {
    id: "ch_s21_wt_16",
    badge: "칙령 낭독과 설교",
    priority: 3,
    req: { minAge: 16, anyTags: ["ecclesiarchy", "sororitas", "pious"], excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeTags: ["assassin", "ogryn", "astartes", "custodes", "grey_knight", "living_saint"] },
    text: "군중 앞에서 복잡한 신학 논쟁 대신 가슴을 울리는 단순한 구호와 기도문을 외치는 데 집중했다. 대중을 움직이는 호소력은 커졌으나 세밀한 분석력은 무뎌졌다.",
    effect: { stats: { Fel: 1, Int: -1 }, faith: 3 }
  },
  {
    id: "ch_s21_wt_17",
    badge: "독극물 정제 연구",
    priority: 2,
    req: { minAge: 16, anyFocus: ["forbidden", "lore"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "saint_vessel", "astartes", "sororitas", "blank", "omega_pariah", "ogryn"] },
    text: "환기가 안 되는 밀실에서 미량 독소와 금지된 약재를 다루며 조제술을 익혔다. 지식은 깊어졌으나 폐부에 스민 유독 증기가 체력을 갉아먹었다.",
    effect: { stats: { Int: 1, T: -1 }, corruption: 2 }
  },
  {
    id: "ch_s21_wt_18",
    badge: "전술 모의전 몰두",
    priority: 3,
    req: { minAge: 18, anyTags: ["officer", "astartes", "commissar", "prodigy"], minSocialTier: "common", excludeRealms: ["heretic"], excludeTrees: ["civil", "officio_assassinorum", "custodes", "living_saint"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "assassin", "ogryn"] },
    text: "야전 훈련 대신 홀로그램 작전판 앞에서 수백 번의 모의 포위전을 지휘했다. 전황을 읽는 눈은 밝아졌으나 직접 무기를 휘두를 기회는 줄어들었다.",
    effect: { stats: { Int: 1, WS: -1 } }
  },
  {
    id: "ch_s21_wt_19",
    badge: "카오스 혈투 의식",
    priority: 3,
    req: { minAge: 16, anyRealms: ["heretic"], excludeBodyClasses: ["dreadnought"] },
    text: "피와 쇠가 뒤엉킨 투기장에서 오직 살육의 본능만을 갈고닦았다. 검을 휘두르는 힘은 흉폭해졌으나 이성적인 판단력은 조금씩 흐려졌다.",
    effect: { stats: { WS: 2, Int: -1 }, corruption: 2 }
  },
  {
    id: "ch_s21_wt_20",
    badge: "보이드 암흑 감시",
    priority: 3,
    req: { minAge: 16, anyTags: ["voidborn", "scion", "assassin", "ratling"], excludeWorldTags: ["feral"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["high_lord_terra", "ogryn"] },
    text: "조명 없는 격벽 틈에 숨어 적의 발소리와 미세한 공기 진동만 추적하는 임무를 거듭했다. 오감과 잠입 감각은 날카로워졌으나 웅크린 자세를 오래 유지한 탓에 정면 백병에 쓸 완력은 줄었다.",
    effect: { stats: { Ag: 1, WS: -1 } }
  },
  {
    id: "ch_s21_wt_21",
    badge: "필멸자의 노화",
    priority: 2,
    req: { minAge: 52, excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "rejuvenat", "living_saint", "saint_vessel", "daemon_prince"] },
    text: "쉰을 넘긴 관절에서 삐걱거리는 소리가 잦아지고, 얕은 상처도 예전처럼 빠르게 아물지 않는다. 세월의 무게가 필멸자의 육신을 천천히 깎아 내리고 있다.",
    effect: { stats: { Ag: -1 }, wounds: -4 }
  },
  {
    id: "ch_s21_wt_22",
    badge: "황혼기의 쇠약",
    priority: 3,
    req: { minAge: 68, excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "rejuvenat", "living_saint", "saint_vessel", "daemon_prince"] },
    text: "계단 몇 층만 올라도 숨이 가쁘고 서늘한 기운에 뼈마디가 시리다. 노쇠한 육신은 이제 작은 감기나 피로에도 위태롭게 흔들린다.",
    effect: { stats: { T: -1, WS: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_23",
    badge: "중상 후유증",
    priority: 2,
    req: { minAge: 14, maxWounds: 50, excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["living_saint"] },
    text: "아직 덜 아문 흉터가 움직일 때마다 찢어질 듯 욱신거려 제 힘을 쓰기 어렵다. 치료가 미뤄진 상처는 새로운 쇠약의 근원이 되고 있다.",
    effect: { stats: { WS: -1 }, wounds: -4 }
  },
  {
    id: "ch_s21_wt_24",
    badge: "만성 출혈 악화",
    priority: 3,
    req: { minAge: 14, maxWounds: 35, excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["living_saint"] },
    text: "제대로 소독하지 못한 상처 자리에서 열기가 가라앉지 않고 시야가 자꾸 흐려진다. 쓰러지지 않으려 버티는 매 순간이 생명력을 갉아먹는다.",
    effect: { stats: { T: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_25",
    badge: "워프 오염의 잠식",
    priority: 2,
    req: { minAge: 14, minCorruption: 50, excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "saint_vessel", "blank", "omega_pariah"] },
    text: "혈관 속을 기어 다니는 듯한 냉기와 귓속의 기이한 웅성거림이 잠을 앗아 갔다. 영혼의 균열이 깊어질수록 신앙의 위안도 육신의 기력도 함께 마르고 있다.",
    effect: { stats: { WP: -1 }, faith: -3, wounds: -4 }
  },
  {
    id: "ch_s21_wt_26",
    badge: "변이의 고통",
    priority: 3,
    req: { minAge: 14, minCorruption: 75, excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "saint_vessel", "blank", "omega_pariah"] },
    text: "피부 아래로 뼈가 뒤틀리는 듯한 통증이 밤마다 찾아와 비명을 삼켜야 했다. 일그러진 기척은 타인의 시선을 피하게 만들고 육체를 더욱 황폐하게 했다.",
    effect: { stats: { Fel: -1 }, wounds: -6, corruption: 2 }
  },
  {
    id: "ch_s21_wt_27",
    badge: "니힐루스의 고립",
    priority: 3,
    req: { minAge: 14, allTags: ["imperial_nihilus"], excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "saint_vessel", "blank", "omega_pariah"] },
    text: "아스트로노미칸의 빛이 끊긴 암흑 속에서 보급선도 구원도 기약 없이 끊겼다. 끝없는 고립감과 불길한 대균열의 어둠이 신경을 갉아먹는다.",
    effect: { stats: { WP: -1 }, wounds: -4, faith: -2 }
  },
  {
    id: "ch_s21_wt_28",
    badge: "포지 스모그 중독",
    priority: 2,
    req: { minAge: 12, maxSocialTier: "common", anyWorldTags: ["forge", "industrial"], excludeRealms: ["mechanicus"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["mechanicus", "magos"] },
    text: "유황과 금속 분진이 뒤섞인 검은 안개를 하루 종일 마신 탓에 기침마다 쇳가루가 섞여 나온다. 정화기 없는 하층 공기는 폐부를 서서히 태우고 있다.",
    effect: { stats: { T: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_29",
    badge: "하층민 영양실조",
    priority: 2,
    req: { minAge: 12, anySocialTiers: ["underclass"], anyWorldTags: ["hive"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"] },
    text: "며칠째 묽은 합성 죽과 녹물만 넘긴 탓에 팔다리에 힘이 들어가지 않는다. 하이브 최하층의 빈곤은 총알보다 조용히 사람을 말려 죽인다.",
    effect: { stats: { T: -1 }, wounds: -4 }
  },
  {
    id: "ch_s21_wt_30",
    badge: "참호의 동상과 궤양",
    priority: 2,
    req: { minAge: 14, anyRealms: ["military"], anyWorldTags: ["fortress", "krieg", "cold"], excludeTrees: ["imperial_knight"], excludeWorldTags: ["feral", "jungle", "volcanic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
    text: "진창과 얼음물이 고인 참호에서 며칠째 장화를 벗지 못해 발끝의 감각이 무뎌졌다. 전선이 멈추지 않는 한 동상과 곪아 가는 살을 돌볼 틈이 없다.",
    effect: { stats: { Ag: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_31",
    badge: "보이드 방사선 피로",
    priority: 2,
    req: { minAge: 14, anyRealms: ["void"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
    text: "워프 도약 직후 겔러 필드 주변의 미세 누출과 저중력 생활이 겹쳐 잇몸이 붓고 뼈가 쑤신다. 함선 밖으로 나설 수 없는 삶은 서서히 몸을 상하게 한다.",
    effect: { stats: { T: -1 }, wounds: -4 }
  },
  {
    id: "ch_s21_wt_32",
    badge: "행정 과로와 시력 감퇴",
    priority: 2,
    req: { minAge: 20, anyFocus: ["lore", "politics"], minSocialTier: "common", excludeRealms: ["mechanicus", "heretic"], excludeWorldTags: ["feral"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeTags: ["ogryn", "assassin"] },
    text: "희미한 루멘 등불 아래서 깨알 같은 문서를 수년간 판독한 탓에 시야가 자주 침침해진다. 서류 더미는 줄지 않고 등줄기만 굽어 간다.",
    effect: { stats: { BS: -1 }, wounds: -4 }
  },
  {
    id: "ch_s21_wt_33",
    badge: "데스 월드 독기",
    priority: 2,
    req: { minAge: 14, anyWorldTags: ["death", "feral"], excludeWorlds: ["krieg"], excludeRealms: ["mechanicus"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
    text: "독충에 물린 자리가 부어오르고 고열이 가시지 않아 야영지 구석에서 앓아누웠다. 거친 행성의 생태계는 한순간의 방심도 용서하지 않는다.",
    effect: { stats: { T: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_34",
    badge: "성소 고행의 탈진",
    priority: 2,
    req: { minAge: 16, anyRealms: ["cloistered"], anyFocus: ["faith"], excludeRealms: ["heretic"], excludeTrees: ["officio_assassinorum"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["assassin", "sister_of_silence", "blank", "omega_pariah"] },
    text: "금식과 채찍 고행을 거듭한 끝에 육신은 앙상해졌고 손끝이 미세하게 떨린다. 영혼은 맑아졌을지언정 쇠약해진 몸은 쓰러지기 일보 직전이다.",
    effect: { stats: { T: -1 }, wounds: -4, faith: 2 }
  },
  {
    id: "ch_s21_wt_35",
    badge: "의체 거부 반응",
    priority: 3,
    req: { minAge: 25, anyBodyClasses: ["augmetic"], allTags: ["bionic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
    text: "신경 단자와 결합한 강철 의체 접합부가 염증을 일으켜 관절을 굽힐 때마다 전기 불꽃처럼 통증이 튄다. 기름칠만으로는 생체 조직의 거부를 막기 어렵다.",
    effect: { stats: { Ag: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_36",
    badge: "사이킥 역류 두통",
    priority: 3,
    req: { minAge: 14, anyTags: ["psyker", "sanctioned_psyker", "rogue_psyker"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["grey_knight", "custodes", "living_saint", "saint_vessel", "blank", "omega_pariah"] },
    text: "이마 관자놀이가 깨질 듯 울리고 코피가 멈추지 않아 한동안 눈을 뜨지 못했다. 워프의 메아리를 억누르는 대가는 매번 정신과 육체를 함께 깎아 내린다.",
    effect: { stats: { WP: -1 }, wounds: -5, corruption: 1 }
  },
  {
    id: "ch_s21_wt_37",
    badge: "초인 장수기의 마모",
    priority: 3,
    req: { minAge: 120, anyBodyClasses: ["transhuman"], anyTags: ["astartes", "grey_knight", "renegade_marine", "chaos_lord"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "living_saint", "dreadnought"] },
    text: "수세기에 걸친 전투로 두 개의 심장과 블랙 카라페이스에 누적된 미세 손상이 회복 속도를 늦춘다. 불멸에 가까운 전사라 해도 끝없는 소모전 앞에서는 마모를 피할 수 없다.",
    effect: { stats: { Ag: -1 }, wounds: -5 }
  },
  {
    id: "ch_s21_wt_38",
    badge: "리주버냇 혈청 내성",
    priority: 3,
    req: { minAge: 90, allTags: ["rejuvenat"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["living_saint", "saint_vessel"] },
    text: "수십 년째 반복된 리주버냇 시술에 세포가 점차 반응하지 않으며 얼굴의 핏기가 가셨다. 돈과 권력으로 사 온 젊음마저 이제 한계에 다다르고 있다.",
    effect: { stats: { T: -1 }, wounds: -5 }
  }
];
