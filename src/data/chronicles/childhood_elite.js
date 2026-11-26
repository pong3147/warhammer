// 일상 연대기 — 상류 귀족 · 테라 고위 혈통 · 스콜라 프로제니움 · 항해사 가문 · 기사 가문 · 보이드본 전용 유년기 (1~13세)
export default [
  // ============================================================================
  // 테라 고위 혈통 (Terra High-Blood) — 5종 (유아기 2 · 아동기 3)
  // ============================================================================
  {
    id: "ch_s19_kid_terra_inf_1",
    badge: "황궁 외곽 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyCareers: ["child"], allTags: ["terra_elite"] },
    text: "순금 세공이 둘린 요람 위로 정제 향유 안개가 은은히 퍼져 올랐다. 황궁 외곽 대리석 첨탑에 울려 퍼지는 장엄한 종소리를 들으며, 가문의 은빛 유모 서비터가 들려주는 고위 고딕어 자장가 속에 잠들었다.",
    effect: { stats: { Fel: 1, Inf: 1 } },
    source: "Lexicanum: Terra / Vaults of Terra"
  },
  {
    id: "ch_s19_kid_terra_inf_2",
    badge: "상원 정원의 첫걸음",
    priority: 3,
    req: { minAge: 2, maxAge: 5, anyCareers: ["child"], allTags: ["terra_elite"] },
    text: "수백만 평민의 평생 임금과 맞먹는 인공 분수가 물줄기를 뿜는 가문 온실 정원에서 첫걸음을 떼었다. 외곽 회랑의 창 너머로 아득히 빛나는 황궁 첨탑군을 가리키자 가정교사가 황제의 영광을 속삭여 주었다.",
    effect: { stats: { Int: 1, WP: 1 }, faith: 1 },
    source: "Lexicanum: Imperial Palace / Terra"
  },
  {
    id: "ch_s19_kid_terra_1",
    badge: "고위 고딕어 수사학",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], allTags: ["terra_elite"] },
    text: "아드미니스트라툼 원로 서기관 출신 가정교사 아래에서 고위 고딕어 문법과 상원 의회 의전 법도를 익혔다. 억양 하나가 틀릴 때마다 흑단 지휘봉이 책상을 울렸고, 어린 어깨에 세습 귀족의 품격이 새겨졌다.",
    effect: { stats: { Int: 1, Fel: 1 } },
    source: "Lexicanum: High Gothic / Senatorum Imperialis"
  },
  {
    id: "ch_s19_kid_terra_2",
    badge: "유물 전당의 가계도",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], allTags: ["terra_elite"] },
    text: "대성전 시절부터 이어져 온 가문의 초상화 회랑을 따라 걸으며 선조들이 남긴 청동 흉상에 새겨진 이름과 원로원 칙령을 암기했다. 피 속에 흐르는 이름이 곧 성계 수십 개의 운명을 좌우하는 권위임을 일찍 깨달았다.",
    effect: { stats: { Inf: 1, WP: 1 } },
    source: "Vaults of Terra: The Carrion Throne"
  },
  {
    id: "ch_s19_kid_terra_3",
    badge: "상류 첨탑 검술 수업",
    priority: 3,
    req: { minAge: 7, maxAge: 13, anyCareers: ["child"], allTags: ["terra_elite"] },
    text: "퇴역 근위 장교가 지도하는 개인 연무장에서 목검 대신 균형 잡힌 훈련용 레이피어를 쥐고 보법을 다듬었다. 명예 결투와 정치적 암수가 일상인 테라 상류 사회에서, 검 끝의 침착함은 예법만큼이나 필수적인 생존 기술이다.",
    effect: { stats: { WS: 1, Ag: 1 } },
    source: "Dark Heresy 2e: Highborn"
  },

  // ============================================================================
  // 행성 귀족 · 상층 첨탑 명문가 (Spire / Planetary Noble) — 5종 (유아기 2 · 아동기 3)
  // ============================================================================
  {
    id: "ch_s19_kid_noble_inf_1",
    badge: "첨탑 저택의 유아기",
    priority: 3,
    req: {
      minAge: 1,
      maxAge: 5,
      anyCareers: ["child"],
      allTags: ["noble"],
      excludeRealms: ["void"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeTags: ["knight_blood", "navigator", "terra_elite", "voidborn"]
    },
    text: "구름층 위로 솟아오른 상층 첨탑 저택의 수정 돔 아래에서 여과된 맑은 공기를 마시며 자랐다. 가문 문장이 수놓인 비단 이불 곁에서는 서보스컬이 실내 온도와 공기의 청정도를 쉼 없이 점검했다.",
    effect: { stats: { Fel: 1, T: 1 } },
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "ch_s19_kid_noble_inf_2",
    badge: "가문 문장의 세례",
    priority: 3,
    req: {
      minAge: 2,
      maxAge: 5,
      anyCareers: ["child"],
      allTags: ["noble"],
      excludeRealms: ["void"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeTags: ["knight_blood", "navigator", "terra_elite", "voidborn"]
    },
    text: "가문의 제사장이 축성한 향유를 이마에 바르는 의식 속에서 친족과 가신들이 일제히 무릎을 꿇었다. 아득한 하층 구역의 소음은 두꺼운 방음 대리석 벽 너머로 단 한 줄기도 스며들지 못했다.",
    effect: { stats: { Inf: 1, WP: 1 }, faith: 1 },
    source: "Rogue Trader Core Rulebook: Noble Born"
  },
  {
    id: "ch_s19_kid_noble_1",
    badge: "영지 장부와 정무 수업",
    priority: 3,
    req: {
      minAge: 6,
      maxAge: 13,
      anyCareers: ["child"],
      allTags: ["noble"],
      excludeRealms: ["void"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeTags: ["knight_blood", "navigator", "terra_elite", "voidborn"]
    },
    text: "저택 서재에서 집사장과 마주 앉아 하층 공업 지구의 십일조 산출표와 경쟁 가문의 혼맥 계보를 분석했다. 숫자 한 줄이 수만 명의 노동 시간을 바꾼다는 냉정한 통치 감각이 어린 머릿속에 자리 잡았다.",
    effect: { stats: { Int: 1, Inf: 1 } },
    source: "Rogue Trader Core Rulebook: Noble Born"
  },
  {
    id: "ch_s19_kid_noble_2",
    badge: "첨탑 사교계 참관",
    priority: 3,
    req: {
      minAge: 6,
      maxAge: 13,
      anyCareers: ["child"],
      allTags: ["noble"],
      excludeRealms: ["void"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeTags: ["knight_blood", "navigator", "terra_elite", "voidborn"]
    },
    text: "가문 연회장 발코니에서 수정 잔을 부딪치는 귀족들의 미소와 은밀한 시선 교환을 관찰했다. 겉으로 건네는 찬사 뒤에 숨겨진 이해관계와 독침을 읽어 내는 법을 어른들의 대화 속에서 조용히 터득했다.",
    effect: { stats: { Fel: 1, Int: 1 } },
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "ch_s19_kid_noble_3",
    badge: "개인 무술과 사격 교습",
    priority: 3,
    req: {
      minAge: 7,
      maxAge: 13,
      anyCareers: ["child"],
      allTags: ["noble"],
      excludeRealms: ["void"],
      excludeWorlds: ["krieg", "voidborn"],
      excludeHomeWorlds: ["krieg", "voidborn"],
      excludeTags: ["knight_blood", "navigator", "terra_elite", "voidborn"]
    },
    text: "가문 전용 실내 사격장에서 상아 손잡이가 달린 소형 라스 피스톨과 결투용 펜싱검을 다루며 손목을 단련했다. 훌륭한 지도자는 말로 굴복시키지 못할 때 주저 없이 방아쇠를 당길 줄 알아야 한다고 사부가 일렀다.",
    effect: { stats: { BS: 1, WS: 1 } },
    source: "Dark Heresy 2e: Highborn"
  },

  // ============================================================================
  // 스콜라 프로제니움 (Schola Progenium) — 6종 (유아기 3 · 아동기 3, 부모 생존 묘사 절대 금지)
  // ============================================================================
  {
    id: "ch_s19_kid_schola_inf_1",
    badge: "수도원 보육동의 종",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyCareers: ["child"], allTags: ["schola"] },
    text: "순직한 제국 공직자와 장교의 유자녀들이 모인 스콜라 프로제니움 보육동에서 새벽 종소리에 맞춰 눈을 떴다. 잿빛 수도복을 입은 아뎁투스 미니스토룸 수녀들이 이름 대신 생도 번호를 부르며 아침 기도를 이끌었다.",
    effect: { stats: { WP: 1 }, faith: 2 },
    source: "Lexicanum: Schola Progenium"
  },
  {
    id: "ch_s19_kid_schola_inf_2",
    badge: "황제의 아이들",
    priority: 3,
    req: { minAge: 2, maxAge: 5, anyCareers: ["child"], allTags: ["schola"] },
    text: "보육동 석조 회랑 벽면마다 제국의 순교자 성화가 촛불 아래 엄숙히 빛났다. 어린 생도들은 피붙이의 얼굴 대신 황금 옥좌의 황제 폐하를 유일한 어버이로 부르며 첫 문장을 배웠다.",
    effect: { stats: { WP: 1, T: 1 }, faith: 1 },
    source: "Codex: Militarum Tempestus / Schola Progenium"
  },
  {
    id: "ch_s19_kid_schola_inf_3",
    badge: "질서와 침묵의 식사",
    priority: 3,
    req: { minAge: 3, maxAge: 5, anyCareers: ["child"], allTags: ["schola"] },
    text: "긴 참나무 식탁에 줄지어 앉아 감사 기도문이 끝날 때까지 숟가락에 손을 대지 않고 기다렸다. 사소한 흐트러짐조차 허용하지 않는 수도원의 일과가 어린 몸에 단단한 규율로 스며들었다.",
    effect: { stats: { T: 1, WP: 1 } },
    source: "Lexicanum: Schola Progenium"
  },
  {
    id: "ch_s19_kid_schola_1",
    badge: "드릴-애벗의 훈육",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], allTags: ["schola"] },
    text: "동트기 전 차가운 연병장에서 드릴-애벗의 호령에 맞춰 제식 구보와 화기 분해·조립 훈련을 반복했다. 땀과 멍이 가실 날이 없었으나, 생도들 사이에서는 이 시련을 버틴 자만이 제국의 칼날이 된다는 자긍심이 자라났다.",
    effect: { stats: { T: 1, WS: 1 } },
    source: "Lexicanum: Drill Abbot / Schola Progenium"
  },
  {
    id: "ch_s19_kid_schola_2",
    badge: "신학 교리와 전술 암송",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], allTags: ["schola"] },
    text: "높은 스테인드글라스 아래 강당에서 제국 교리 문답과 성계 병참학, 고위 고딕어 명령 체계를 밤늦도록 암송했다. 나약함과 의심은 곧 배신이라는 가르침이 뼈마디마다 새겨졌다.",
    effect: { stats: { Int: 1, WP: 1 }, faith: 2 },
    source: "Codex: Astra Militarum / Commissar Lore"
  },
  {
    id: "ch_s19_kid_schola_3",
    badge: "생도 모의 사격장",
    priority: 3,
    req: { minAge: 7, maxAge: 13, anyCareers: ["child"], allTags: ["schola"] },
    text: "수도원 지하 사격장에서 훈련용 저출력 라스건을 어깨에 단단히 견착하고 표적 중앙을 겨누며 호흡을 가다듬었다. 교관은 명중률보다 명령이 떨어진 직후 망설임 없이 방아쇠를 당기는 냉정함을 더 높이 평가했다.",
    effect: { stats: { BS: 1, WP: 1 } },
    source: "Codex: Militarum Tempestus"
  },

  // ============================================================================
  // 항해사 가문 나비스 노빌리테 (Navis Nobilite) — 4종 (유아기 2 · 아동기 2)
  // ============================================================================
  {
    id: "ch_s19_kid_nav_inf_1",
    badge: "밀봉된 항해사 첨탑",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyCareers: ["child"], allTags: ["navigator"] },
    text: "외부인의 출입이 엄격히 차단된 나비스 노빌리테 가문 궁전의 깊은 내실에서 자랐다. 유모는 이마 중앙에 미세하게 맥동하는 제3의 눈 자리에 부드러운 비단 띠를 두르며 고대 혈통의 축복을 읊조렸다.",
    effect: { stats: { WP: 1, Int: 1 } },
    source: "Rogue Trader Core Rulebook: Navigator"
  },
  {
    id: "ch_s19_kid_nav_inf_2",
    badge: "워프 빛의 첫 감응",
    priority: 3,
    req: { minAge: 2, maxAge: 5, anyCareers: ["child"], allTags: ["navigator"] },
    text: "어두운 석조 회랑에서 촛불 너머로 보통 눈에는 보이지 않는 미세한 빛줄기를 손가락으로 가리켰다. 이를 지켜본 가문 장로는 아스트로노미칸의 광휘를 감지할 재능이 벌써 싹트고 있다며 깊은 만족을 표했다.",
    effect: { stats: { WP: 1, Inf: 1 } },
    source: "Lexicanum: Navis Nobilite"
  },
  {
    id: "ch_s19_kid_nav_1",
    badge: "워프 해도와 차폐 훈련",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], allTags: ["navigator"] },
    text: "향로 연기가 자욱한 천체 성소에서 선배 항해사로부터 제3의 눈을 닫아 두는 정신 차폐법과 성간 워프 해류 판독법을 배웠다. 일반 인간이라면 한눈에 미쳐 버릴 혼돈의 색채를 이성으로 정리하는 고된 수련이었다.",
    effect: { stats: { WP: 1, Int: 1 } },
    source: "Rogue Trader: The Navis Primer"
  },
  {
    id: "ch_s19_kid_nav_2",
    badge: "항해사 가문의 비밀 맹약",
    priority: 3,
    req: { minAge: 7, maxAge: 13, anyCareers: ["child"], allTags: ["navigator"] },
    text: "가문 서고의 철문을 열고 대성전 시절 황제와 맺은 항해사 특허장 사본의 조항을 읽으며 익혔다. 바깥세상은 우리의 기이한 외모를 두려워하지만, 우리 없이는 제국의 함대 단 한 척도 별들 사이를 건널 수 없다는 자부심이 깃들었다.",
    effect: { stats: { Inf: 1, Int: 1 } },
    source: "Lexicanum: Navigator House"
  },

  // ============================================================================
  // 임페리얼 나이트 기사 가문 (Knight House) — 2종 (유아기 1 · 아동기 1)
  // ============================================================================
  {
    id: "ch_s19_kid_knight_inf_1",
    badge: "기사 성채의 깃발 아래",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyCareers: ["child"], allTags: ["knight_blood"] },
    text: "높은 석조 성채의 아치형 창 너머로 사크리스탄 대장간의 붉은 불빛과 거대한 나이트 아머의 그림자를 바라보며 유아기를 보냈다. 요람 곁 벽면에는 선조 기사들이 사냥한 거대 괴수의 뿔과 문장 방패가 걸려 있었다.",
    effect: { stats: { WP: 1, T: 1 } },
    source: "Codex: Imperial Knights"
  },
  {
    id: "ch_s19_kid_knight_1",
    badge: "기사도 서약과 무예 훈련",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyCareers: ["child"], allTags: ["knight_blood"] },
    text: "성채 안뜰에서 목제 창을 쥐고 기사도 규범과 가문 문장학을 암송하며 체력을 다졌다. 언젠가 스론 메카니쿰에 올라 선조들의 영혼과 하나가 될 날을 꿈꾸며 매일 검술과 균형 감각을 연마했다.",
    effect: { stats: { WS: 1, Fel: 1 } },
    source: "Codex: Imperial Knights / Throne Mechanicum"
  },

  // ============================================================================
  // 보이드본 성간 함선 유년기 (Voidborn) — 2종 (유아기 1 · 아동기 1, 함내 밀폐 환경 전용)
  // ============================================================================
  {
    id: "ch_s19_kid_void_inf_1",
    badge: "함선 격벽의 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyCareers: ["child"], anyWorlds: ["voidborn"] },
    text: "두꺼운 선체 격벽 안쪽에서 플라스마 원자로와 인공 중력 발전기가 내는 낮고 규칙적인 진동음을 자장가 삼아 잠들었다. 실우주 관측창 너머로 펼쳐진 차가운 별빛과 약한 인공 중력이 함선 태생 아이의 첫 세상이 되었다.",
    effect: { stats: { WP: 1, Ag: 1 } },
    source: "Dark Heresy 2e: Voidborn"
  },
  {
    id: "ch_s19_kid_void_1",
    badge: "하층 갑판의 무중력 놀이",
    priority: 3,
    req: { minAge: 6, maxAge: 13, maxSocialTier: "common", excludeRealms: ["cloistered"], anyCareers: ["child"], anyWorlds: ["voidborn"] },
    text: "인공 중력이 들쭉날쭉한 화물 갑판 통로에서 강철 파이프와 사다리를 민첩하게 타고 넘으며 함선 내부 지도를 통째로 외웠다. 선실의 늙은 선원들은 공허의 이상 징후를 감지하는 보이드본 특유의 직감을 일러 주었다.",
    effect: { stats: { Ag: 1, Int: 1 } },
    source: "Rogue Trader Core Rulebook: Void Born"
  }
];
