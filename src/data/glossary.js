// 워해머 40,000 주요 개념 사전 (8대 카테고리 · 48종 핵심 용어)
// 모든 해설은 자체 작성한 한국어 산문이며, AGENTS.md 5.1 나무위키 표준 표기 및 5.2 연대기 기준을 준수한다.

export const GLOSSARY_CATEGORIES = [
  {
    id: "imperium",
    name: "인류제국의 기둥과 통치",
    en: "Pillars of the Imperium",
    desc: "황금 옥좌, 테라의 하이 로드, 5대 성역, 아스트로노미칸, 십일조와 국교회 등 인류제국을 떠받치는 핵심 기둥을 다룬다."
  },
  {
    id: "warp_chaos",
    name: "워프 · 사이커 · 카오스",
    en: "The Warp, Psykers & Chaos",
    desc: "초광속 항해의 통로이자 악마의 바다인 워프, 항해사, 검은 함선, 블랭크, 그리고 카오스 4대 신과 공포의 눈을 해설한다."
  },
  {
    id: "military",
    name: "제국의 군대와 초인 기관",
    en: "Armies & Transhuman Orders",
    desc: "아스트라 밀리타룸, 커미사르, 소로리타스, 아스타르테스, 프라이머리스, 그레이 나이트, 쿠스토데스 등 제국의 무력을 소개한다."
  },
  {
    id: "adepta",
    name: "기계교 · 심문소 · 치안과 행정",
    en: "Mechanicus, Inquisition & Adepta",
    desc: "기계교와 STC, 의체 개조와 수명 연장 시술, 이단심문소 3대 오르도, 아르비테스, 아드미니스트라툼, 로그 트레이더를 정리한다."
  },
  {
    id: "worlds_society",
    name: "행성 분류와 인류 사회",
    en: "World Classes & Human Society",
    desc: "하이브·포지·데스·요새·농업 행성 같은 제국 행성 분류와 보이드본, 앱휴먼(오그린·래틀링)의 삶을 설명한다."
  },
  {
    id: "xenos",
    name: "주요 외계 종족 (Xenos)",
    en: "Major Xenos Factions",
    desc: "인류제국과 은하 패권을 두고 격돌하는 오크, 타이라니드, 아엘다리, 드루카리, 네크론, 타우 제국, 보탄 연맹을 개관한다."
  },
  {
    id: "chronology",
    name: "제국 연대기와 M41~M42 대전환",
    en: "Imperial Dating & Great Rift",
    desc: "제국력 표기법 읽는 법과 호루스 헤러시, 카디아 붕괴, 시카트릭스 말레딕툼, 암흑 제국, 인도미투스 성전의 흐름을 정리한다."
  },
  {
    id: "game_systems",
    name: "게임 시스템 용어 안내",
    en: "Imperialis Vita Systems",
    desc: "8대 특성치와 d100 판정, 3대 도덕 성향, 진로 계급(Tier 1~6)과 성간 이동 위계 등 시뮬레이션 규칙을 안내한다."
  }
];

export const GLOSSARY_TERMS = [
  // =========================================================================
  // 1. 인류제국의 기둥과 통치 (7종)
  // =========================================================================
  {
    id: "imperium_of_man",
    term: "인류제국",
    en: "Imperium of Man",
    category: "imperium",
    summary: "은하계 전역의 약 100만 개 행성과 수천조 인류를 지배하는 거대한 신권·관료 제국.",
    body: "30번째 천년기(M30, 서기 29,000년대 말) 인류의 황제가 대성전을 통해 세운 범은하 국가다. 호루스 헤러시 이후 1만 년 동안 신앙과 관료제, 끊임없는 전시 총동원 체제로 버텨 왔다. 제국은 제국법과 십일조, 황제 숭배만 지킨다면 각 행성 총독의 자치를 폭넓게 인정하므로, 같은 제국 안에서도 중세 봉건 행성부터 초거대 공업 행성까지 문명 격차가 극심하다.",
    inGameNote: "플레이어는 이 100만 행성 중 한 곳에 무작위(운명 모드) 혹은 지정 출생으로 태어나 평민부터 테라의 하이 로드까지 다양한 삶을 경험한다.",
    relatedGlossaryIds: ["emperor_golden_throne", "high_lords_of_terra", "segmenta_majoris", "imperial_tithe"],
    relatedCodexLinks: [
      { label: "신성한 테라 (코덱스)", href: "/codex/worlds/#terra" },
      { label: "21개 세력 직군 트리", href: "/codex/careers/" }
    ],
    source: "Lexicanum: Imperium of Man / Warhammer 40k Core Rulebook"
  },
  {
    id: "emperor_golden_throne",
    term: "인류의 황제와 황금 옥좌",
    en: "Emperor of Mankind & Golden Throne",
    category: "imperium",
    summary: "1만 년째 테라의 황금 옥좌에 안치되어 생명 유지와 웹웨이 봉인, 아스트로노미칸 조향을 지탱하는 인류의 수호신.",
    body: "인류 역사상 최강의 불멸 사이커였던 황제는 호루스 헤러시 최후의 결전에서 치명상을 입은 뒤, 신성한 테라 황궁 깊숙한 황금 옥좌에 안치되었다. 황금 옥좌는 황제의 생명을 유지하는 동시에 테라 지하의 찢어진 웹웨이 관문을 봉인하며, 황제의 의지가 아스트로노미칸의 빛을 워프 전역으로 인도할 수 있게 지탱한다. 그 대가로 매일 천여 명의 사이커 영혼이 옥좌에 바쳐진다.",
    inGameNote: "게임의 핵심 수치인 '황제 신앙'은 인류제국 사회 내 충성심과 기적·성직·심문소 진로 해금의 토대가 되며, 테라와 쿠스토데스 서사의 중심축이다.",
    relatedGlossaryIds: ["astronomican", "adeptus_custodes", "psykers_black_ships", "horus_heresy"],
    relatedCodexLinks: [
      { label: "신성한 테라", href: "/codex/worlds/#terra" },
      { label: "아뎁투스 쿠스토데스 직군", href: "/codex/careers/#tree-custodes" }
    ],
    source: "Lexicanum: Golden Throne / Emperor of Mankind"
  },
  {
    id: "high_lords_of_terra",
    term: "테라의 하이 로드",
    en: "High Lords of Terra (Senatorum Imperialis)",
    category: "imperium",
    summary: "침묵하는 황제를 대신해 인류제국 전체를 통치하는 최고 원로원 12석(상임 9석 · 비상임 3석).",
    body: "제국 원로원(세나토룸 임페리알리스)의 정점에 선 12명의 최고 권력자 회의체다. 아드미니스트라툼 장관, 에클레시아크, 화성 파브리케이터-제너럴, 이단심문소 대표, 그랜드 프로보스트 마셜, 아스트라 텔레파티카 총관, 아스트로노미칸 총관, 항해사 파테르노발 특사, 오피시오 아사시노룸 그랜드 마스터가 상임 9석을 이루며, 아스트라 밀리타룸 총사령관과 로드 하이 애드미럴, 쿠스토데스 캡틴-제너럴, 아베스 상크토룸 등이 비상임 3석에 참여한다. M42 초 로부테 길리먼이 섭정으로 복귀한 뒤에도 제국 통치의 중추로 기능한다.",
    inGameNote: "게임 내 최상위 Tier 6 엔드게임 목표로 테라의 하이 로드 12석 전체 직위와 원로원 전용 정치·섭정 갈등 사건이 구현되어 있다.",
    relatedGlossaryIds: ["imperium_of_man", "administratum_rogue_trader", "indomitus_crusade"],
    relatedCodexLinks: [
      { label: "제국 행정부 직군", href: "/codex/careers/#tree-administratum" },
      { label: "로부테 길리먼", href: "/codex/characters/#guilliman" }
    ],
    source: "Lexicanum: High Lords of Terra / Watchers of the Throne"
  },
  {
    id: "segmenta_majoris",
    term: "세그멘툼 (5대 은하 성역)",
    en: "Segmenta Majoris",
    category: "imperium",
    summary: "방대한 인류제국을 행정·군사적으로 나눈 5개 초대형 은하 관구.",
    body: "인류제국은 신성한 테라와 화성이 위치한 심장부 '세그멘툼 솔라', 공포의 눈과 인접한 북부 전선 '세그멘툼 옵스쿠루스', 울트라마 영지와 카타찬을 품은 최대 관구 '울티마 세그멘툼', 크리그와 오펠리아 VII이 속한 남부 '세그멘툼 템페스투스', 그리고 마카리우스·사바트 성전의 무대인 서부 '세그멘툼 파시피쿠스'의 5대 성역으로 나뉜다.",
    inGameNote: "행성 간 성간 이동 거리와 아스트로패스 원격 속보 수신 범위, 그리고 대균열 이후 임페리움 니힐루스 고립 여부가 성역 기준으로 판정된다.",
    relatedGlossaryIds: ["great_rift", "sanctus_and_nihilus", "imperium_of_man"],
    relatedCodexLinks: [
      { label: "제국 23개 행성 도감", href: "/codex/worlds/" }
    ],
    source: "Lexicanum: Segmentum / Warhammer 40k Core Rulebook"
  },
  {
    id: "astronomican",
    term: "아스트로노미칸",
    en: "Astronomican",
    category: "imperium",
    summary: "테라에서 워프 전역으로 쏘아 올리는 초거대 사이킥 등대.",
    body: "워프 우주에는 물리적 방향 감각이나 별자리가 존재하지 않는다. 아스트로노미칸은 1만 명의 아뎁투스 아스트로노미카 합창 사이커가 방출하고 황제의 의지가 조향하는 강렬한 사이킥 등불로, 항해사들이 은하 전역에서 테라의 위치를 가늠해 항로를 잡을 수 있게 해 준다. 999.M41 대균열 직후 테라 기준 33일간 빛이 꺼진 '영원한 밤'이 전 제국을 덮쳤고, 대균열 너머 북쪽 절반인 임페리움 니힐루스는 지금도 빛이 영구히 차단되어 있다.",
    inGameNote: "대균열 이후 아스트로노미칸의 빛이 닿지 않는 임페리움 니힐루스 행성에 체류하면 성간 이동 난이도와 생존 위험이 크게 높아진다.",
    relatedGlossaryIds: ["warp_immaterium", "navis_nobilite", "sanctus_and_nihilus", "emperor_golden_throne"],
    relatedCodexLinks: [
      { label: "대균열 역사 연표", href: "/codex/timeline/#tl_great_rift" }
    ],
    source: "Lexicanum: Astronomican"
  },
  {
    id: "imperial_tithe",
    term: "제국 십일조",
    en: "Imperial Tithe",
    category: "imperium",
    summary: "모든 제국 행성이 아드미니스트라툼에 정기적으로 바쳐야 하는 물자·병력·사이커 세금.",
    body: "행성 총독의 가장 절대적인 의무는 제국 십일조를 기한 내에 완납하는 것이다. 농업 행성은 식량을, 공업 행성은 무기와 물자를, 하이브 월드는 아스트라 밀리타룸 연대를 차출해 바친다. 반독립 기계교의 포지 월드와 아스타르테스 모성은 정규 십일조가 면제되는 대신 별도 조약과 의무를 이행한다. 여기에 모든 행성은 예외 없이 발견된 사이커를 검은 함선에 인도해야 하며, 십일조 거부는 반란으로 간주되어 바답 전쟁 같은 대규모 토벌전을 부른다.",
    inGameNote: "행성 총독, 아드미니스트라툼, 아스트라 밀리타룸 징집 사건 및 바답 전쟁 연표에서 십일조가 핵심 갈등으로 등장한다.",
    relatedGlossaryIds: ["administratum_rogue_trader", "astra_militarum_commissar", "psykers_black_ships"],
    relatedCodexLinks: [
      { label: "바답 전쟁 연표", href: "/codex/timeline/#tl_badab_war" },
      { label: "제국 통치부 직군", href: "/codex/careers/#tree-governor" }
    ],
    source: "Lexicanum: Imperial Tithe"
  },
  {
    id: "ecclesiarchy_creed",
    term: "임페리얼 크리드와 국교회",
    en: "Imperial Creed & Adeptus Ministorum",
    category: "imperium",
    summary: "황제를 유일신으로 숭배하는 제국 국교 교리와 이를 관장하는 아뎁투스 미니스토룸.",
    body: "대성전 시절 황제는 종교를 부정했으나, 호루스 헤러시 이후 황제를 신황제로 받드는 신앙이 폭발적으로 확산되어 제국의 공식 국교인 임페리얼 크리드가 확립되었다. 국교회로 불리는 아뎁투스 미니스토룸은 은하 전역의 성당과 순례지, 성인전, 설교단을 통솔한다. 과거 배교의 시대 이후 교회는 '무장한 남성 병력 보유 금지' 칙령을 받았고, 그 빈자리를 아뎁타 소로리타스가 채웠다.",
    inGameNote: "국교회 사제에서 추기경·에클레시아크까지 오르는 성직 트리와 성당 정화 고행, 교조 성향 서사가 모두 이 교리에 뿌리를 둔다.",
    relatedGlossaryIds: ["adepta_sororitas", "emperor_golden_throne", "alignment_faith_corruption"],
    relatedCodexLinks: [
      { label: "국교회 직군 트리", href: "/codex/careers/#tree-ecclesiarchy" },
      { label: "오펠리아 VII 성지", href: "/codex/worlds/#ophelia7" }
    ],
    source: "Lexicanum: Ecclesiarchy / Imperial Cult"
  },

  // =========================================================================
  // 2. 워프 · 사이커 · 카오스 (7종)
  // =========================================================================
  {
    id: "warp_immaterium",
    term: "워프 (이마테리움)",
    en: "The Warp / Immaterium",
    category: "warp_chaos",
    summary: "물질 우주 너머에 존재하는 감정과 영혼 에너지의 차원이자 성간 초광속 항해의 통로.",
    body: "워프는 물리 법칙과 시간의 흐름이 무너진 비물질 차원으로, 은하 모든 지성체의 공포·분노·절망·욕망이 소용돌이친다. 인류 함선은 먼 성계로 이동하기 위해 워프로 잠항해야 하지만, 시간 왜곡 때문에 며칠 항해가 수년 혹은 수십 년 뒤의 도착으로 이어지기도 하며 악마의 침입 위험을 늘 감수해야 한다.",
    inGameNote: "성간 이동 중 워프 폭풍에 휘말리면 생물학적 나이는 그대로인데 제국력 연도만 2~3년 뛰어넘는 워프 시간 도약 사건이 발생한다.",
    relatedGlossaryIds: ["geller_field_warp_travel", "astronomican", "chaos_gods", "psykers_black_ships"],
    relatedCodexLinks: [
      { label: "임페리얼 네이비 직군", href: "/codex/careers/#tree-navy" }
    ],
    source: "Lexicanum: Warp"
  },
  {
    id: "geller_field_warp_travel",
    term: "겔러 필드와 워프 항해",
    en: "Geller Field & Warp Travel",
    category: "warp_chaos",
    summary: "워프 잠항 중 함선 주위에 물질 우주의 현실 막을 둘러 악마를 차단하는 방어막.",
    body: "겔러 필드가 없는 함선이 워프에 진입하면 몇 초 만에 선원 전원이 광기에 빠지거나 악마에게 학살당한다. 겔러 필드는 함선 주변에 얇은 현실의 거품을 유지해 승무원을 보호하지만, 노후된 함선이나 거센 워프 폭풍 속에서는 방어막이 깜빡이며 끔찍한 환각과 이상 현상을 불러일으킨다.",
    inGameNote: "성간 전출이나 자율 출항 이벤트에서 겔러 필드 변동, 기이한 승무원 실종, 워프 시간 지연 변주를 자주 마주하게 된다.",
    relatedGlossaryIds: ["warp_immaterium", "navis_nobilite", "voidborn_abhumans"],
    relatedCodexLinks: [
      { label: "보이드본 (성간 함선 출신)", href: "/codex/worlds/#voidborn" }
    ],
    source: "Lexicanum: Geller Field"
  },
  {
    id: "navis_nobilite",
    term: "나비스 노빌리테 (항해사 가문)",
    en: "Navis Nobilite",
    category: "warp_chaos",
    summary: "이마의 '제3의 눈'으로 워프 해류를 직시해 함선을 인도하는 공인 돌연변이 귀족 가문.",
    body: "제국은 돌연변이를 극도로 혐오하지만, 나비스 노빌리테만은 예외로 막대한 부와 정치적 특권을 누린다. 항해사의 제3의 눈은 워프 속 아스트로노미칸의 빛을 보고 암초 같은 워프 폭풍을 피해 항로를 개척한다. 일반인이 항해사의 제3의 눈을 정면으로 바라보면 즉사하거나 정신이 붕괴한다.",
    inGameNote: "출생 신분 11종 중 희귀 혈통 '나비스 노빌리테'로 태어나면 높은 의지·지성·권위 보정을 받고, 견습 항법사에서 파테르노발 특사(하이 로드)까지 이어지는 전용 직군 트리와 항해 사건을 경험할 수 있다.",
    relatedGlossaryIds: ["astronomican", "warp_immaterium", "geller_field_warp_travel"],
    relatedCodexLinks: [
      { label: "나비스 노빌리테 직군", href: "/codex/careers/#tree-navis_navigator" },
      { label: "임페리얼 네이비 직군", href: "/codex/careers/#tree-navy" },
      { label: "로그 트레이더 가문", href: "/codex/careers/#tree-rogue_trader" }
    ],
    source: "Lexicanum: Navis Nobilite / Rogue Trader Core"
  },
  {
    id: "psykers_black_ships",
    term: "사이커와 검은 함선",
    en: "Psykers & League of Blackships",
    category: "warp_chaos",
    summary: "워프 에너지를 다루는 초능력자와, 이들을 거두어 테라로 이송하는 아뎁투스 아스트라 텔레파티카의 수송선.",
    body: "사이커는 예지, 염력, 텔레파시, 화염 같은 초자연 능력을 발휘하지만, 통제를 잃으면 악마가 물질 우주로 넘어오는 통로가 되어 행성 하나를 멸망시킬 수도 있다. 따라서 아뎁투스 아스트라 텔레파티카는 침묵의 자매들의 호위 아래 검은 함선 연맹을 보내 은하 전역의 사이커를 징발한다. 약한 자는 황금 옥좌에 바쳐지고, 강한 자는 혹독한 공인 의식을 거쳐 아스트로패스나 전투 사이커, 극소수는 그레이 나이트로 길러진다.",
    inGameNote: "선천 자질 '잠재 사이커'로 태어나면 검은 함선 징발 위험과 공인 사이커·그레이 나이트 승격, 혹은 로그 사이커 추격전 같은 전용 분기가 열린다.",
    relatedGlossaryIds: ["emperor_golden_throne", "blank_pariah", "grey_knights_deathwatch", "warp_immaterium"],
    relatedCodexLinks: [
      { label: "공인 사이커 직군 트리", href: "/codex/careers/#tree-psyker" },
      { label: "사이킥 각성 연표", href: "/codex/timeline/#tl_psychic_awakening" }
    ],
    source: "Lexicanum: Psyker / League of Blackships"
  },
  {
    id: "blank_pariah",
    term: "블랭크 · 퍼라이어 (영혼 없음)",
    en: "Blank / Pariah / Untouchable",
    category: "warp_chaos",
    summary: "워프에 어떠한 그림자도 드리우지 않아 사이킥과 악마를 무력화하는 극희귀 유전자 체질.",
    body: "블랭크는 일반 인류와 달리 워프와 연결된 영혼의 반향이 존재하지 않는다. 주변 사람은 이유 모를 불쾌감과 공포를 느끼기 때문에 어린 시절부터 따돌림을 겪기 쉽지만, 사이커의 능력을 무효화하고 악마에게 치명적 고통을 주는 능력 덕분에 이단심문관의 측근이나 침묵의 자매들로 발탁된다.",
    inGameNote: "선천 자질 '블랭크 · 퍼라이어'를 보유하면 교섭이 크게 낮아지지만 높은 의지와 워프 저항, 침묵의 자매들·이단심문소 전용 서사가 열린다.",
    relatedGlossaryIds: ["psykers_black_ships", "adeptus_custodes", "inquisition_ordos"],
    relatedCodexLinks: [
      { label: "그레고르 아이젠혼", href: "/codex/characters/#eisenhorn" },
      { label: "카이아파스 케인", href: "/codex/characters/#cain" }
    ],
    source: "Lexicanum: Blank / Sisters of Silence"
  },
  {
    id: "chaos_gods",
    term: "카오스 4대 신 (암흑의 신들)",
    en: "The Four Chaos Gods (Ruinous Powers)",
    category: "warp_chaos",
    summary: "워프 속 지성체의 극단적 감정이 응집되어 탄생한 네 기둥의 악신: 코른, 젠취, 너글, 슬라네쉬.",
    body: "피와 분노·전쟁의 신 '코른', 변화와 음모·마법의 신 '젠취', 역병과 부패·절망 속 생명의 신 '너글', 그리고 과잉과 쾌락·완벽 집착의 신 '슬라네쉬'가 카오스 4대 신을 이룬다. 이들은 영원한 '위대한 게임'을 벌이며 필멸자 컬트와 배신자 아스타르테스 군단을 유혹해 물질 우주를 잠식하려 든다.",
    inGameNote: "워프 오염이 누적되면 암흑 4대 신의 유혹 사건을 통해 각 신의 낙인을 받고 컬티스트·배신자 아스타르테스·카오스 로드·데몬 프린스 승천까지 이어지는 별도 루트를 탈 수 있다.",
    relatedGlossaryIds: ["warp_immaterium", "eye_of_terror_black_crusade", "alignment_faith_corruption"],
    relatedCodexLinks: [
      { label: "암흑의 신들 직군 트리", href: "/codex/careers/#tree-chaos" },
      { label: "약탈자 아바돈", href: "/codex/characters/#abaddon" }
    ],
    source: "Lexicanum: Chaos Gods / Codex: Chaos Space Marines"
  },
  {
    id: "eye_of_terror_black_crusade",
    term: "공포의 눈과 블랙 크루세이드",
    en: "Eye of Terror & Black Crusades",
    category: "warp_chaos",
    summary: "아엘다리 제국의 몰락으로 열린 초대형 워프 균열과, 그곳에서 출격하는 아바돈의 대원정.",
    body: "공포의 눈은 물질 우주와 워프가 뒤섞인 거대한 폭풍 지대로, 호루스 헤러시에서 패배한 배신자 군단들이 도피해 거점으로 삼았다. 블랙 리전의 워마스터 '약탈자 아바돈'은 1만 년에 걸쳐 13차례의 블랙 크루세이드를 이끌었으며, 마침내 999.M41 제13차 블랙 크루세이드에서 카디아의 파일론을 파괴해 대균열을 열었다.",
    inGameNote: "카디아 방위전과 제13차 블랙 크루세이드는 게임 M41 말기 시대의 가장 결정적인 분수령 사건으로 등장한다.",
    relatedGlossaryIds: ["great_rift", "chaos_gods", "aeldari_craftworlds"],
    relatedCodexLinks: [
      { label: "카디아 요새 행성", href: "/codex/worlds/#cadia" },
      { label: "카디아 붕괴 연표", href: "/codex/timeline/#tl_fall_of_cadia" },
      { label: "약탈자 아바돈", href: "/codex/characters/#abaddon" }
    ],
    source: "Lexicanum: Eye of Terror / Black Crusade"
  },

  // =========================================================================
  // 3. 제국의 군대와 초인 기관 (8종)
  // =========================================================================
  {
    id: "astra_militarum_commissar",
    term: "아스트라 밀리타룸과 커미사르",
    en: "Astra Militarum & Commissariat",
    category: "military",
    summary: "수십억 필멸자 병사로 제국의 전선을 지탱하는 '황제의 망치'와, 사기를 감독하는 정치장교단.",
    body: "임페리얼 가드로도 불리는 아스트라 밀리타룸은 아스타르테스 같은 초인이 아니라 평범한 인간 병사들이 라스건과 리만 러스 전차, 압도적 포병 화력으로 은하 전역의 전쟁을 치르는 주력 육군이다. 카디아, 크리그(데스 코어 오브 크리그), 카타찬, 발할라, 보스트로야, 타니스 등 행성마다 고유 연대 전통이 뚜렷하며, 오피시오 프리펙투스 소속 커미사르가 연대의 규율과 사기를 감독한다.",
    inGameNote: "게임에서 가장 접근성이 높고 보병에서 분대장, 장교, 장군을 거쳐 워마스터와 로드 커맨더 밀리탄트까지 이어지는 연대별 승급과 커미사르 트리가 촘촘하게 구현된 핵심 세력이다.",
    relatedGlossaryIds: ["schola_progenium_scions", "imperial_navy", "imperial_tithe"],
    relatedCodexLinks: [
      { label: "아스트라 밀리타룸 직군", href: "/codex/careers/#tree-militarum" },
      { label: "커미사르 직군", href: "/codex/careers/#tree-commissariat" },
      { label: "세바스찬 야릭", href: "/codex/characters/#yarrick" },
      { label: "이브람 건트", href: "/codex/characters/#gaunt" }
    ],
    source: "Lexicanum: Astra Militarum / Commissar"
  },
  {
    id: "schola_progenium_scions",
    term: "스콜라 프로제니움과 템페스투스 사이온",
    en: "Schola Progenium & Tempestus Scions",
    category: "military",
    summary: "순직한 제국 공직자·장교의 고아를 엘리트 간부로 길러내는 기숙학교와 직속 특수부대.",
    body: "스콜라 프로제니움은 국교회가 운영하는 엄격한 기숙 교육 기관으로, 제국을 위해 목숨을 바친 부모의 자녀를 모아 신앙·전술·학문을 주입한다. 졸업생은 적성에 따라 커미사르, 아뎁타 소로리타스, 이단심문소 요원, 아드미니스트라툼 고위 관료, 또는 최정예 공수 특수부대인 밀리타룸 템페스투스 사이온으로 배치된다.",
    inGameNote: "출생 신분 '스콜라 프로제니움'은 18세 졸업 시점까지 엘리트 진로 지름길을 열어 주며, 유년기 전용 기숙사 사건도 제공된다.",
    relatedGlossaryIds: ["astra_militarum_commissar", "adepta_sororitas", "inquisition_ordos"],
    relatedCodexLinks: [
      { label: "아스트라 밀리타룸 직군", href: "/codex/careers/#tree-militarum" },
      { label: "커미사르 직군", href: "/codex/careers/#tree-commissariat" }
    ],
    source: "Lexicanum: Schola Progenium / Tempestus Scions"
  },
  {
    id: "imperial_navy",
    term: "임페리얼 네이비 (제국 해군)",
    en: "Imperial Navy (Navis Imperialis)",
    category: "military",
    summary: "킬로미터급 성간 전함으로 우주 제해권과 병력 수송을 책임지는 제국 우주 함대.",
    body: "호루스 헤러시 이후 반란 시 육군과 해군이 한 지휘관 아래 뭉치지 못하도록 제국 육군과 우주 함대가 엄격히 분리되었다. 고딕 대성당을 닮은 거대한 전함들은 수만 명의 승조원과 노예 포수, 항공단을 싣고 성계 방어와 궤도 폭격을 수행한다.",
    inGameNote: "보이드본 출신이나 해군 트리를 통해 해군 사관·조종사에서 함장, 제독, 로드 하이 애드미럴(하이 로드)까지 성장하며, 고위 계급에 오르면 자율적 성간 이동 권한도 열린다.",
    relatedGlossaryIds: ["geller_field_warp_travel", "astra_militarum_commissar", "voidborn_abhumans"],
    relatedCodexLinks: [
      { label: "임페리얼 네이비 직군", href: "/codex/careers/#tree-navy" },
      { label: "보이드본 행성 카드", href: "/codex/worlds/#voidborn" }
    ],
    source: "Lexicanum: Imperial Navy"
  },
  {
    id: "adepta_sororitas",
    term: "아뎁타 소로리타스 (전투 수녀회)",
    en: "Adepta Sororitas (Sisters of Battle)",
    category: "military",
    summary: "파워 아머와 볼터·화염방사기로 무장한 국교회 직속 여성 전투 수도회이자 오르도 헤레티쿠스의 검.",
    body: "국교회의 남성 무장 금지 칙령 이후, 스콜라 프로제니움에서 길러진 독실한 여성들로 조직된 정예 수녀 군단이다. 신성한 테라의 콘벤트 프리오리스와 세그멘툼 템페스투스 오펠리아 VII의 콘벤트 상크토룸을 양대 본산으로 두며, 초인 개조 없이도 강철 같은 신앙과 기적의 힘으로 이단과 마녀를 정화한다.",
    inGameNote: "여성 캐릭터 전용 직군으로 노비티에이트에서 전투 수녀, 셀레스티안(팔라틴), 캐노네스, 아베스 상크토룸까지 승급하며 오펠리아 VII 전용 사건과 연동된다.",
    relatedGlossaryIds: ["ecclesiarchy_creed", "schola_progenium_scions", "inquisition_ordos"],
    relatedCodexLinks: [
      { label: "아뎁타 소로리타스 직군", href: "/codex/careers/#tree-sororitas" },
      { label: "오펠리아 VII 성지", href: "/codex/worlds/#ophelia7" },
      { label: "성녀 셀레스틴", href: "/codex/characters/#celestine" }
    ],
    source: "Lexicanum: Adepta Sororitas / Codex: Adepta Sororitas"
  },
  {
    id: "adeptus_astartes_geneseed",
    term: "아뎁투스 아스타르테스와 진시드",
    en: "Adeptus Astartes & Gene-Seed",
    category: "military",
    summary: "프라이마크의 유전 장기인 진시드를 이식받아 탄생하는 '황제의 죽음의 천사', 스페이스 마린.",
    body: "아스타르테스는 강인한 소년 후보생에게 두 개의 심장, 세 번째 폐, 강화 골격, 검은 갑각 등 19종 이상의 초인 장기를 이식해 만든 생체 병기다. 호루스 헤러시 이후 1,000명 단위의 독립 '챕터' 체제로 개편되었으며, 각 챕터는 고유한 모성, 전통, 전투 함성과 유전적 특성(블러드 엔젤의 붉은 갈증 등)을 지닌다.",
    inGameNote: "남성 캐릭터가 어린 나이에 강인·백병 조건과 진시드 적성을 갖추면 9대 유명 챕터 중 하나에 서약해 네오파이트부터 챕터 마스터·드레드노트까지 장구한 초인의 삶을 산다.",
    relatedGlossaryIds: ["primaris_rubicon", "grey_knights_deathwatch", "horus_heresy"],
    relatedCodexLinks: [
      { label: "아스타르테스 직군 트리", href: "/codex/careers/#tree-astartes" },
      { label: "9대 아스타르테스 챕터", href: "/codex/chapters/" }
    ],
    source: "Lexicanum: Space Marines / Gene-seed"
  },
  {
    id: "primaris_rubicon",
    term: "퍼스트본 · 프라이머리스 마린과 루비콘 수술",
    en: "Firstborn, Primaris Marines & Rubicon Primaris",
    category: "military",
    summary: "벨리사리우스 카울이 1만 년간 비밀리에 개량해 인도미투스 성전에서 투입한 차세대 스페이스 마린.",
    body: "기존 19종 장기를 지닌 전통 아스타르테스를 '퍼스트본'이라 부르며, 화성의 대현자 벨리사리우스 카울이 길리먼의 밀명으로 3종의 추가 장기(시뉴 코일 근육 강화, 벨리사리우스 용광로 자가 치유, 마그니피카트 성장 증폭)를 더해 완성한 신세대를 '프라이머리스 마린'이라 한다. 기존 퍼스트본 마린도 치명적 위험이 따르는 '루비콘 프라이머리스' 수술을 통과하면 프라이머리스로 거듭날 수 있다.",
    inGameNote: "001.M42 인도미투스 성전 이후 시대에서 프라이머리스 마린 배치, 퍼스트본과의 세대 갈등, 루비콘 수술 선택지가 사건으로 등장한다.",
    relatedGlossaryIds: ["adeptus_astartes_geneseed", "indomitus_crusade", "adeptus_mechanicus"],
    relatedCodexLinks: [
      { label: "벨리사리우스 카울", href: "/codex/characters/#cawl" },
      { label: "인도미투스 성전 연표", href: "/codex/timeline/#tl_guilliman_return" }
    ],
    source: "Lexicanum: Primaris Space Marines / Rubicon Primaris"
  },
  {
    id: "grey_knights_deathwatch",
    term: "그레이 나이트와 데스워치",
    en: "Grey Knights & Deathwatch",
    category: "military",
    summary: "악마 사냥 전담 비밀 챕터(제666챕터)와, 외계인 토벌을 위해 각 챕터 정예가 파견되는 데스워치.",
    body: "토성의 위성 타이탄에 은거하는 그레이 나이트는 전원 사이커로만 구성된 비밀 아스타르테스 챕터로, 오르도 말레우스와 함께 카오스 악마를 토벌하며 단 한 명도 카오스에 타락한 적이 없다. 한편 데스워치는 오르도 제노스의 전투 부대로, 여러 스페이스 마린 챕터에서 베테랑을 파견받아 검은 갑주와 은빛 왼팔을 두르고 외계 위협을 정밀 제거한다.",
    inGameNote: "그레이 나이트는 게임 내 워프 오염 증가에 전면 면역이며 타이탄 전용 승급 트리를 가진다. 일반 아스타르테스는 데스워치 파견 이력을 쌓을 수 있다.",
    relatedGlossaryIds: ["inquisition_ordos", "adeptus_astartes_geneseed", "psykers_black_ships"],
    relatedCodexLinks: [
      { label: "그레이 나이트 직군 트리", href: "/codex/careers/#tree-grey_knights" },
      { label: "이단심문소 직군 트리", href: "/codex/careers/#tree-inquisition" }
    ],
    source: "Lexicanum: Grey Knights / Deathwatch"
  },
  {
    id: "adeptus_custodes",
    term: "아뎁투스 쿠스토데스와 침묵의 자매들",
    en: "Adeptus Custodes & Sisters of Silence",
    category: "military",
    summary: "황제의 옥좌를 지키는 '황제의 발톱' — 황금 갑주의 초인 수호자와 무언의 블랭크 전사단.",
    body: "아뎁투스 쿠스토데스는 아스타르테스처럼 진시드를 이식하는 양산 병기가 아니라, 테라 귀족 영아를 세포 단위 연금술로 1인 1작품처럼 빚어내는 궁극의 수호자들이다. 대균열 이후 테라 사자의 문 전투를 기점으로 은하 원정에 다시 나서기 시작했다. 블랭크 여성 전사단 '침묵의 자매들'과 함께 '황제의 발톱'을 이룬다.",
    inGameNote: "테라 고위 귀족 영아 출신 등이 도달할 수 있는 최고위 초인 트리로, 워프 오염에 절대 면역이며 사자의 문 전투와 캡틴-제너럴 칙령 사건이 연동된다.",
    relatedGlossaryIds: ["emperor_golden_throne", "blank_pariah", "high_lords_of_terra"],
    relatedCodexLinks: [
      { label: "아뎁투스 쿠스토데스 직군", href: "/codex/careers/#tree-custodes" },
      { label: "트라얀 발로리스", href: "/codex/characters/#valoris" },
      { label: "사자의 문 전투 연표", href: "/codex/timeline/#tl_lions_gate" }
    ],
    source: "Lexicanum: Adeptus Custodes / Sisters of Silence"
  },

  // =========================================================================
  // 4. 기계교 · 심문소 · 치안과 행정 (6종)
  // =========================================================================
  {
    id: "adeptus_mechanicus",
    term: "아뎁투스 메카니쿠스와 옴니시아",
    en: "Adeptus Mechanicus & Omnissiah",
    category: "adepta",
    summary: "화성을 성지로 삼아 제국의 모든 과학기술과 생산력을 독점하는 기계 신앙 교단.",
    body: "기계교는 인류제국과 동등한 화성 조약으로 결합한 반독립 기술 신권 조직이다. 이들은 모든 지식을 신성한 기계신과 그 화신 옴니시아의 계시로 숭배하며, 나약한 육신을 기계 의체로 대체하는 것을 성스러운 수행으로 여긴다. 테크프리스트와 마고스가 포지 월드를 다스리고, 사이보그 보병 스키타리와 타이탄 군단이 성지를 수호한다.",
    inGameNote: "기계교 소속 캐릭터는 16세부터 무료로 의체 개조 시술을 받을 수 있으며, 스키타리·테크프리스트에서 화성 파브리케이터-제너럴까지 오를 수 있다.",
    relatedGlossaryIds: ["machine_spirit_stc", "augmetics_rejuvenat", "forge_world"],
    relatedCodexLinks: [
      { label: "아뎁투스 메카니쿠스 직군", href: "/codex/careers/#tree-mechanicus" },
      { label: "화성 포지 월드", href: "/codex/worlds/#mars" },
      { label: "벨리사리우스 카울", href: "/codex/characters/#cawl" }
    ],
    source: "Lexicanum: Adeptus Mechanicus"
  },
  {
    id: "machine_spirit_stc",
    term: "기계령과 STC (표준 주형 구조)",
    en: "Machine Spirit & STC",
    category: "adepta",
    summary: "기계에 깃든 영혼이라 믿는 교리와, 인류 황금기의 잃어버린 만능 설계 데이터베이스.",
    body: "제국은 과거 인공지능 반란의 트라우마로 자율 인공지능을 '혐오스러운 지성'이라 부르며 철저히 금기시한다. 대신 라스건부터 전함까지 모든 기계에 '기계령'이 깃들어 있다고 믿고 성유와 찬가로 달랜다. 인류 기술의 정점이던 기술 암흑기의 만능 설계도인 STC 파편을 하나만 발견해도 행성 하나를 하사받을 만큼 막대한 가치를 지닌다.",
    inGameNote: "사건에서 STC 파편을 발견해 보고하면 희귀 이력 태그 'STC 발견자'를 얻어 화성 대공의회 후속 연작과 전설 부고로 이어진다.",
    relatedGlossaryIds: ["adeptus_mechanicus", "augmetics_rejuvenat"],
    relatedCodexLinks: [
      { label: "화성 포지 월드", href: "/codex/worlds/#mars" }
    ],
    source: "Lexicanum: Machine Spirit / Standard Template Construct"
  },
  {
    id: "augmetics_rejuvenat",
    term: "의체 개조와 리주버냇 시술",
    en: "Augmetics & Rejuvenat Treatments",
    category: "adepta",
    summary: "손상된 신체나 노화를 극복하기 위한 기계 의체 이식 및 상류층 전용 노화 억제 생명공학 시술.",
    body: "하층민에게 낡은 산업용 의체는 사고 뒤 노동력을 유지하기 위한 최소한의 수단이지만, 기계교와 고위 장교에게는 강인한 전투력과 연산력을 부여하는 축복이다. 한편 귀족과 고위 관료들은 막대한 부와 권위를 쏟아부어 세포 노화를 되돌리는 '리주버냇' 시술을 반복해 필멸자의 몸으로도 200~400년을 살아간다.",
    inGameNote: "우측 자율 선택 패널에서 조건을 만족하면 최대 3회까지 수명을 18년씩 늘리는 의체 개조와, 50세 이상에서 수명을 55년씩 늘리는 리주버냇 시술을 직접 신청할 수 있으며 100세 이상 초장수기 세대 단절 서사와 연결된다.",
    relatedGlossaryIds: ["adeptus_mechanicus", "hive_world"],
    relatedCodexLinks: [
      { label: "아뎁투스 메카니쿠스 직군", href: "/codex/careers/#tree-mechanicus" }
    ],
    source: "Lexicanum: Bionics / Rejuvenat"
  },
  {
    id: "inquisition_ordos",
    term: "이단심문소와 3대 오르도",
    en: "The Inquisition & Major Ordos",
    category: "adepta",
    summary: "황제의 이름 아래 사실상 무제한 권한인 로제트를 행사하며 내부·외부·악마 위협을 척결하는 비밀 수사 기관.",
    body: "이단심문관들은 공식 서열 바깥에서 독자적으로 활동하며, 필요 시 행성 하나를 궤도 폭격으로 정화하는 '익스터미나투스'까지 명령할 수 있다. 주요 분과로 이단·마녀·배교자를 색출하는 '오르도 헤레티쿠스', 외계 종족과 진스틸러 교단을 추적하는 '오르도 제노스', 카오스 악마를 토벌하는 '오르도 말레우스'가 있다. 이단심문관 내부도 원칙을 고수하는 청교도파와 적의 무기를 역이용하는 급진파로 나뉜다.",
    inGameNote: "어콜라이트에서 이단심문관으로 승격하면 3대 오르도 중 하나를 선택해 전용 수사 연작과 그레고르 아이젠혼·앰벌리 베일 조우 서사를 경험한다.",
    relatedGlossaryIds: ["grey_knights_deathwatch", "adepta_sororitas", "blank_pariah"],
    relatedCodexLinks: [
      { label: "이단심문소 직군 트리", href: "/codex/careers/#tree-inquisition" },
      { label: "그레고르 아이젠혼", href: "/codex/characters/#eisenhorn" },
      { label: "앰벌리 베일", href: "/codex/characters/#amberley_vail" }
    ],
    source: "Lexicanum: Inquisition / Dark Heresy Core"
  },
  {
    id: "adeptus_arbites",
    term: "아뎁투스 아르비테스와 렉스 임페리알리스",
    en: "Adeptus Arbites & Lex Imperialis",
    category: "adepta",
    summary: "행성 지역 경찰과 달리 제국 헌법인 렉스 임페리알리스와 십일조 질서만을 집행하는 연방 치안군.",
    body: "일반 행성의 잡범은 지역 총독의 집행관 부대가 처리하지만, 제국 십일조 횡령, 반란 모의, 고위 관료 암살 같은 제국법 위반은 아뎁투스 아르비테스가 직접 진압한다. 스콜라 프로제니움 출신이 많으며, 각 행성에 프리싱크트 요새 법원을 두고 총독마저 반역 혐의로 체포·처형할 권한을 지닌다.",
    inGameNote: "아르비테스 직군은 교조 성향 및 법 집행 사건과 밀접하게 연결되며, 최고위 그랜드 프로보스트 마셜(하이 로드)까지 오를 수 있다.",
    relatedGlossaryIds: ["imperial_tithe", "schola_progenium_scions", "high_lords_of_terra"],
    relatedCodexLinks: [
      { label: "아뎁투스 아르비테스 직군", href: "/codex/careers/#tree-arbites" }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "administratum_rogue_trader",
    term: "아드미니스트라툼과 로그 트레이더",
    en: "Adeptus Administratum & Rogue Traders",
    category: "adepta",
    summary: "100만 행성의 서류와 세금을 기록하는 거대 관료제와, 황제의 무역 특허장으로 제국 국경 너머를 개척하는 호걸 상인 귀족.",
    body: "아드미니스트라툼은 양피지와 코지테이터 산더미 속에서 수백 년 전 전쟁의 보급 문서를 아직도 처리하는 제국 최대 행정 부서다. 반면 로그 트레이더는 황제나 하이 로드가 서명한 세습 무역 영장을 지니고 제국 국경 바깥 미지의 성계에서 외계인 교역·정복·식민 개척을 독자적으로 수행하는 특권 가문이다.",
    inGameNote: "아드미니스트라툼은 행정·권위 중심 루트이며, 로그 트레이더는 높은 자율 성간 이동 권한과 외계 유물·헤일로 스타 원정 사건을 제공한다.",
    relatedGlossaryIds: ["imperial_tithe", "high_lords_of_terra", "imperium_of_man"],
    relatedCodexLinks: [
      { label: "아드미니스트라툼 직군", href: "/codex/careers/#tree-administratum" },
      { label: "로그 트레이더 직군", href: "/codex/careers/#tree-rogue_trader" }
    ],
    source: "Lexicanum: Adeptus Administratum / Rogue Trader"
  },

  // =========================================================================
  // 5. 행성 분류와 인류 사회 (5종)
  // =========================================================================
  {
    id: "hive_world",
    term: "하이브 월드와 언더하이브",
    en: "Hive World & Underhive",
    category: "worlds_society",
    summary: "오염된 황무지 위로 구름을 뚫는 초대형 수직 도시인 하이브에 수백억 인구가 밀집한 공업 행성.",
    body: "하이브 월드는 제국 인구의 절대다수가 살아가는 거대 도시 행성이다. 첨탑 최상층에는 귀족 가문이 깨끗한 공기와 진짜 식량을 누리며 살고, 중간층 시민은 하루 14시간 이상 공장에서 일하며, 햇빛조차 들지 않는 최하층 '언더하이브'에서는 무법 갱단과 돌연변이가 생존을 두고 다툰다. 네크로문다와 아마겟돈이 대표적이다.",
    inGameNote: "운명 모드에서 가장 출생 확률이 높은 환경 중 하나이며, 언더하이브 갱단에서 하이브 암흑가 거두까지 오르는 독자적 범죄 루트가 존재한다.",
    relatedGlossaryIds: ["imperium_of_man", "forge_world", "augmetics_rejuvenat"],
    relatedCodexLinks: [
      { label: "네크로문다", href: "/codex/worlds/#necromunda" },
      { label: "아마겟돈", href: "/codex/worlds/#armageddon" },
      { label: "무명 하이브 월드", href: "/codex/worlds/#generic_hive" }
    ],
    source: "Lexicanum: Hive World / Necromunda"
  },
  {
    id: "forge_world",
    term: "포지 월드 (대장간 행성)",
    en: "Forge World",
    category: "worlds_society",
    summary: "행성 표면 전체가 아뎁투스 메카니쿠스의 용광로와 무기 공장으로 뒤덮인 산업 성지.",
    body: "화성을 필두로 한 포지 월드들은 제국 전역의 전함, 타이탄, 볼터, 파워 아머를 생산한다. 대기 중에는 중금속 매연과 기계 성유 냄새가 가득하고, 하급 노동자인 메니얼과 서비터는 기계교 사제들의 이진법 지시에 따라 쉼 없이 생산 라인을 돌린다.",
    inGameNote: "화성 및 일반 포지 월드 출생자는 높은 지성 보정을 받으며, 기계교 견습생과 스키타리·테크프리스트 진입에 유리하다.",
    relatedGlossaryIds: ["adeptus_mechanicus", "machine_spirit_stc", "hive_world"],
    relatedCodexLinks: [
      { label: "화성 (코덱스)", href: "/codex/worlds/#mars" },
      { label: "무명 포지 월드", href: "/codex/worlds/#generic_forge" }
    ],
    source: "Lexicanum: Forge World"
  },
  {
    id: "death_fortress_world",
    term: "데스 월드와 요새 행성",
    en: "Death World & Fortress World",
    category: "worlds_society",
    summary: "자연 생태계 자체가 인류를 죽이는 극한 데스 월드와, 행성 전체가 군사 요새화된 최전선 거점.",
    body: "카타찬의 식인 밀림, 펜리스의 얼음 바다, 크리그의 핵 방사능 황무지, 녹턴의 화산 지대 같은 데스 월드는 극도로 가혹한 환경 덕분에 최강의 정예 전사들을 길러낸다. 한편 카디아처럼 워프 균열 길목을 막아서는 요새 행성은 태어날 때부터 전 주민이 군사 훈련을 받으며 제국의 방패 역할을 맡는다.",
    inGameNote: "데스 월드·요새 행성은 연간 환경 위험도가 높지만 강인·사격·백병 보정이 뛰어나고 고유 성인식 및 명예 연대(카디아, 크리그, 카타찬) 사건을 해금한다.",
    relatedGlossaryIds: ["astra_militarum_commissar", "eye_of_terror_black_crusade"],
    relatedCodexLinks: [
      { label: "카디아", href: "/codex/worlds/#cadia" },
      { label: "크리그", href: "/codex/worlds/#krieg" },
      { label: "카타찬", href: "/codex/worlds/#catachan" },
      { label: "펜리스", href: "/codex/worlds/#fenris" }
    ],
    source: "Lexicanum: Death World / Fortress World"
  },
  {
    id: "agri_shrine_paradise_world",
    term: "농업 · 문명 · 성지 · 낙원 행성",
    en: "Agri, Civilised, Shrine & Paradise Worlds",
    category: "worlds_society",
    summary: "하이브 월드를 먹여 살리는 식량 기지, 제국의 표준 문명 행성, 그리고 성당과 귀족 휴양 행성.",
    body: "제국은 행성 단위로 역할을 극단적으로 분업한다. 농업 행성인 아그리 월드는 대륙 전체를 단일 작물이나 가축 농장으로 채워 인근 하이브에 식량을 공급한다. 오펠리아 VII 같은 성지 행성은 수많은 순례자가 몰려드는 국교의 성지이며, 낙원 행성은 제국 최상위 귀족과 공훈자가 여생을 보내는 희귀한 휴양지다.",
    inGameNote: "게임 내 농업·문명·낙원·야만·하이브·포지 6종의 무명 행성과 오펠리아 VII·마크라그가 각 행성 유형의 생활상과 고유 부조리 연대기를 담고 있다.",
    relatedGlossaryIds: ["imperial_tithe", "ecclesiarchy_creed", "hive_world"],
    relatedCodexLinks: [
      { label: "오펠리아 VII", href: "/codex/worlds/#ophelia7" },
      { label: "마크라그", href: "/codex/worlds/#macragge" },
      { label: "무명 농업 행성", href: "/codex/worlds/#generic_agri" }
    ],
    source: "Lexicanum: Class (Planet)"
  },
  {
    id: "voidborn_abhumans",
    term: "보이드본과 앱휴먼 (오그린 · 래틀링)",
    en: "Voidborn & Abhumans (Ogryn / Ratling)",
    category: "worlds_society",
    summary: "평생을 우주 함선 안에서 살아가는 함선 토박이들과, 특수 행성 중력에 적응해 공인된 아인류 아종.",
    body: "보이드본은 대대로 수 킬로미터 길이의 성간 함선이나 우주 정거장에서 태어나 죽는 이들로, 저중력 탓에 키가 크고 창백하며 함선 미신에 밝다. 한편 앱휴먼은 고중력 행성에서 거구로 진화한 충직한 '오그린', 저중력 농업 행성에서 작고 눈 밝은 저격수로 진화한 '래틀링'처럼 유전 안정성이 인정되어 제국 군에 복무하는 아인류다.",
    inGameNote: "보이드본 행성 출생과 선천 자질 '앱휴먼 · 오그린'·'앱휴먼 · 래틀링' 각각에 고유 능력치 보정과 전용 사건·연대기가 마련되어 있다.",
    relatedGlossaryIds: ["imperial_navy", "geller_field_warp_travel", "astra_militarum_commissar"],
    relatedCodexLinks: [
      { label: "보이드본 (코덱스)", href: "/codex/worlds/#voidborn" }
    ],
    source: "Lexicanum: Voidborn / Abhuman"
  },

  // =========================================================================
  // 6. 주요 외계 종족 (Xenos) (7종)
  // =========================================================================
  {
    id: "orks_waaagh",
    term: "오크와 와아아! (WAAAGH!)",
    en: "Orks & WAAAGH!",
    category: "xenos",
    summary: "전투 그 자체를 삶의 낙으로 삼으며 포자로 번식하는 녹색 피부 외계 종족과, 집단 사이킥 광란 원정.",
    body: "오크는 생태학적으로 균류와 동물이 결합된 생체 병기 종족으로, 죽을 때도 포자를 퍼뜨려 한 번 침공당한 행성에서 완전히 뿌리 뽑기가 거의 불가능하다. 강력한 워보스 아래 수많은 부족이 뭉치면 '와아아!'라 불리는 집단 사이킥 장이 증폭되어 조잡한 고철 무기와 붉게 칠한 차량마저 상식을 초월한 위력을 낸다. 가즈쿨 막 우룩 스라카가 대표적인 대군주다.",
    inGameNote: "제2·3차 아마겟돈 전쟁과 콜룸누스 위어드와아아! 연표, 그리고 가즈쿨·야릭 조우 사건의 주적으로 등장한다.",
    relatedGlossaryIds: ["astra_militarum_commissar", "tyranids_genestealers"],
    relatedCodexLinks: [
      { label: "가즈쿨 막 우룩 스라카", href: "/codex/characters/#ghazghkull" },
      { label: "제3차 아마겟돈 전쟁", href: "/codex/timeline/#tl_armageddon_3" }
    ],
    source: "Lexicanum: Ork / Waaagh!"
  },
  {
    id: "tyranids_genestealers",
    term: "타이라니드 · 하이브 마인드 · 진스틸러 교단",
    en: "Tyranids, Hive Mind & Genestealer Cults",
    category: "xenos",
    summary: "은하 바깥에서 밀려와 모든 행성의 생체 자원을 집어삼키는 군체 외계 종족과 선행 잠입 교단.",
    body: "타이라니드는 거대한 군체 의식 '하이브 마인드'의 통제 아래 움직이는 하이브 플릿 생체 함대다. 함대가 접근하면 '워프의 그림자'가 성계 통신을 마비시킨다. 본격 침공 수 세대 전부터 '진스틸러'가 하이브 월드 하층민에 잠입해 인간과 혼혈 세대를 퍼뜨리는 진스틸러 교단을 형성해 행성 내부에서 반란을 일으킨다.",
    inGameNote: "마크라그 전투(1차), 크라켄(2차), 레비아탄과 크립트만의 방화선(3차), 바알의 파괴, 제4차 타이라니드 전쟁 연표와 오르도 제노스 수사 사건의 핵심 위협이다.",
    relatedGlossaryIds: ["inquisition_ordos", "orks_waaagh", "indomitus_crusade"],
    relatedCodexLinks: [
      { label: "마크라그 전투 연표", href: "/codex/timeline/#tl_battle_of_macragge" },
      { label: "제3차 타이라니드 전쟁", href: "/codex/timeline/#tl_third_tyranic" },
      { label: "바알의 파괴 연표", href: "/codex/timeline/#tl_devastation_baal" },
      { label: "제4차 타이라니드 전쟁", href: "/codex/timeline/#tl_fourth_tyranic" }
    ],
    source: "Lexicanum: Tyranids / Genestealer Cult"
  },
  {
    id: "aeldari_craftworlds",
    term: "아엘다리 (크래프트월드 엘다)",
    en: "Asuryani (Craftworld Aeldari)",
    category: "xenos",
    summary: "고대 은하 제국이 멸망한 뒤 거대 방주 함선인 크래프트월드에서 살아남아 미래를 예지하는 장수 외계 종족.",
    body: "한때 은하를 지배했던 아엘다리 제국은 극단적 쾌락 끝에 카오스 신 슬라네쉬를 탄생시키며 몰락했고, 그 중심에 공포의 눈이 열렸다. 멸망 직전 탈출한 크래프트월드 아엘다리는 엄격한 '길'의 규율과 영혼석으로 슬라네쉬로부터 영혼을 지키며, 파시어의 예지를 통해 종족의 생존을 위한 정밀한 개입을 벌인다.",
    inGameNote: "외계 조우 사건에서 아엘다리 파시어와의 불가해한 임시 동맹·예언 거래 분기 및 이단심문소 외계 접촉 이력으로 등장한다.",
    relatedGlossaryIds: ["drukhari_commorragh", "chaos_gods", "eye_of_terror_black_crusade"],
    relatedCodexLinks: [
      { label: "이단심문소 직군 트리", href: "/codex/careers/#tree-inquisition" }
    ],
    source: "Lexicanum: Aeldari / Craftworld"
  },
  {
    id: "drukhari_commorragh",
    term: "드루카리 (다크 엘다)와 코모라",
    en: "Drukhari & Commorragh",
    category: "xenos",
    summary: "웹웨이 속 암흑 도시 코모라에 숨어 타 종족의 고통을 양분으로 삼는 약탈자 아엘다리 분파.",
    body: "드루카리는 크래프트월드 동족처럼 절제의 길을 택하는 대신, 타인의 극심한 공포와 고통을 흡수해 슬라네쉬에게 영혼이 잠식되는 속도를 늦춘다. 이들은 웹웨이 관문을 통해 예고 없이 제국 변방 행성과 함선을 급습해 산 채로 포로를 납치하며, 헤몬쿨루스(호문쿨루스) 같은 기괴한 생체 개조 장인들을 거느린다.",
    inGameNote: "변방 행성과 성간 항해 중 드루카리 노예 약탈선 및 헤몬쿨루스 관련 고위험 외계 위기 사건으로 마주한다.",
    relatedGlossaryIds: ["aeldari_craftworlds", "chaos_gods", "warp_immaterium"],
    relatedCodexLinks: [
      { label: "로그 트레이더 직군", href: "/codex/careers/#tree-rogue_trader" }
    ],
    source: "Lexicanum: Drukhari / Commorragh"
  },
  {
    id: "necrons_tomb_worlds",
    term: "네크론과 툼 월드",
    en: "Necrons & Tomb Worlds",
    category: "xenos",
    summary: "6천만 년 전 살아 있는 금속 육체로 영혼을 옮긴 뒤 지하 무덤 행성에서 깨어나고 있는 고대 기계 제국.",
    body: "필멸의 고통에서 벗어나려 별의 신 크탄과 거래했다가 영혼을 빼앗긴 네크론은 기나긴 동면 끝에 M41~M42에 들어 은하 곳곳의 툼 월드에서 깨어나고 있다. 원자를 분해하는 가우스 무기와 자가 수복 금속 네크로더미스, 워프를 차단하는 블랙스톤 파일론 등 인류가 이해조차 못 하는 초고대 기술을 다룬다. 수집가 트라진이나 침묵의 왕 자렉이 유명하다.",
    inGameNote: "파리아 넥서스 연표 사건과 네크론 툼 월드 각성·무한의 트라진 조우 분기에서 제국의 기술적 한계와 맞서는 위협으로 등장한다.",
    relatedGlossaryIds: ["adeptus_mechanicus", "great_rift", "indomitus_crusade"],
    relatedCodexLinks: [
      { label: "파리아 넥서스 연표", href: "/codex/timeline/#tl_pariah_nexus" },
      { label: "무한의 트라진", href: "/codex/characters/#trazyn" }
    ],
    source: "Lexicanum: Necrons / Pariah Nexus"
  },
  {
    id: "tau_empire",
    term: "타우 제국과 대의 (Greater Good)",
    en: "T'au Empire & The Greater Good",
    category: "xenos",
    summary: "은하 동부 변방에서 급성장하며 첨단 플라즈마 무기와 '대의' 이념으로 세력을 넓히는 젊은 외계 제국.",
    body: "인류제국에 비하면 영토는 작지만, 타우 제국은 기술 발전을 금기시하지 않고 배틀슈트와 레일건, 드론 중심의 현대적 기동전을 펼친다. 에테리얼 계급의 지도 아래 불·물·땅·바람 카스트로 분업하며, 외계 종족은 물론 불만 품은 제국 변방 인간들까지 '대의'의 이름으로 회유·포섭하려 든다.",
    inGameNote: "742.M41 다모클레스 만 성전 연표와 외교 회유·배틀슈트 교전 사건, 카이아파스 케인의 그라발락스 전역과 깊이 맞물려 있다.",
    relatedGlossaryIds: ["inquisition_ordos", "imperial_tithe"],
    relatedCodexLinks: [
      { label: "다모클레스 만 성전 연표", href: "/codex/timeline/#tl_damocles_crusade" },
      { label: "케인 · 발할라 제597연대", href: "/codex/timeline/#tl_cain_valhalla" }
    ],
    source: "Lexicanum: T'au Empire / Damocles Crusade"
  },
  {
    id: "leagues_of_votann",
    term: "보탄 연맹 (킨)",
    en: "Leagues of Votann (Kin)",
    category: "xenos",
    summary: "은하 중심부의 고중력 자원 지대에서 고대 인공지능 선조핵 보탄과 함께 살아가는 강인한 클론 종족.",
    body: "제국에서는 흔히 '스쿼트'나 독립 외계 상단으로 오인하기도 하는 보탄 연맹의 킨들은 인류 기술 암흑기 시절 은하 중심으로 떠난 개척선단의 후예들이다. 이들은 고대 슈퍼컴퓨터 선조핵의 지혜를 받들며 뛰어난 공학과 채굴력을 자랑하고, 실리적인 거래와 자원 탐사를 위해 제국 변방이나 로그 트레이더와 접촉하기도 한다.",
    inGameNote: "999.M41 이후 외계 조우 분기에서 보탄 연맹 자원 탐사대와의 물물교환 협상, 고대 공학 장비 관찰, 퇴거 경고 사건으로 등장한다.",
    relatedGlossaryIds: ["machine_spirit_stc", "administratum_rogue_trader"],
    relatedCodexLinks: [
      { label: "로그 트레이더 직군", href: "/codex/careers/#tree-rogue_trader" }
    ],
    source: "Lexicanum: Leagues of Votann"
  },

  // =========================================================================
  // 7. 제국 연대기와 M41~M42 대전환 (5종)
  // =========================================================================
  {
    id: "imperial_dating_system",
    term: "제국 연대기 표기법 (XXX.M41 읽는 법)",
    en: "Imperial Dating System",
    category: "chronology",
    summary: "41번째 천년기인 M41과 42번째 천년기인 M42를 세 자리 연도로 표기하는 인류제국 공식 역법.",
    body: "워해머 40,000의 연도는 '연도.천년기' 형식으로 적는다. 예를 들어 '755.M41'은 서기 40,755년(41번째 천년기의 755년)을 뜻하고, '999.M41'은 40,999년(카디아 붕괴와 대균열의 해)이며, 그 다음 해인 '000.M42'는 서기 41,000년(42번째 천년기의 원년)이다. 워프 시간 왜곡과 통신 지연 때문에 실제로는 오르도 크로노스조차 정확한 표준 시각을 두고 논쟁을 벌인다.",
    inGameNote: "게임 상단 상태 바와 모든 연대기 로그는 998.M41 상반기 같은 제국력 표기법을 따르며, 시대 프리셋 9종으로 원하는 역사 구간에서 시작할 수 있다.",
    relatedGlossaryIds: ["great_rift", "indomitus_crusade", "warp_immaterium"],
    relatedCodexLinks: [
      { label: "M41~M42 역사 연표 전체", href: "/codex/timeline/" }
    ],
    source: "Lexicanum: Imperial Dating System"
  },
  {
    id: "horus_heresy",
    term: "호루스 헤러시 (호루스의 대반역)",
    en: "The Horus Heresy (M31)",
    category: "chronology",
    summary: "1만 년 전 워마스터 호루스와 9개 스페이스 마린 군단이 카오스에 타락해 인류제국을 둘로 찢은 내전.",
    body: "31번째 천년기(M31), 황제가 가장 총애하던 아들 프라이마크 호루스가 카오스 4대 신의 계략에 빠져 절반의 스페이스 마린 군단을 이끌고 테라를 침공했다. 약 9년(005~014.M31)에 걸친 내전 끝에 호루스는 멸망했지만 황제는 황금 옥좌에 영구 안치되었고, 찬란하던 계몽의 대성전은 끝나고 광신과 영원한 전쟁의 41번째 천년기가 열렸다.",
    inGameNote: "게임 속 9대 충성파 챕터의 전통과 배신자 군단들의 '장구한 전쟁', 드레드노트·성유물·국교 성립 등 거의 모든 설정이 이 비극의 유산 위에 서 있다.",
    relatedGlossaryIds: ["emperor_golden_throne", "adeptus_astartes_geneseed", "eye_of_terror_black_crusade"],
    relatedCodexLinks: [
      { label: "9대 충성파 챕터", href: "/codex/chapters/" },
      { label: "암흑의 신들 직군 트리", href: "/codex/careers/#tree-chaos" }
    ],
    source: "Lexicanum: Horus Heresy"
  },
  {
    id: "great_rift",
    term: "카디아 붕괴와 시카트릭스 말레딕툼 (대균열)",
    en: "Fall of Cadia & Cicatrix Maledictum",
    category: "chronology",
    summary: "999.M41 카디아 파괴로 은하계 한가운데가 거대한 워프 폭풍으로 두 동강 난 사상 최대의 대격변.",
    body: "제13차 블랙 크루세이드에서 아바돈이 블랙스톤 요새 잔해를 카디아에 충돌시켜 네크론 파일론 방어망을 무너뜨리자, 공포의 눈이 폭발적으로 팽창해 은하를 동서로 가로지르는 거대한 워프 균열 '시카트릭스 말레딕툼(대균열)'이 열렸다. 시간 흐름이 뒤틀리고 악마 군단이 은하 전역에 쏟아졌으며, 이 사건으로 워해머 40k의 역사는 M42 인도미투스 시대로 진입했다.",
    inGameNote: "999.M41에 도달하면 대균열 역사 대사건이 발동하며, 이후 게임 상태에 대균열 플래그가 켜져 전용 사건·연대기와 암흑 제국 격리 규칙이 적용된다.",
    relatedGlossaryIds: ["sanctus_and_nihilus", "eye_of_terror_black_crusade", "indomitus_crusade"],
    relatedCodexLinks: [
      { label: "카디아 붕괴 연표", href: "/codex/timeline/#tl_fall_of_cadia" },
      { label: "대균열 연표", href: "/codex/timeline/#tl_great_rift" },
      { label: "우르사카르 E. 크리드", href: "/codex/characters/#creed" }
    ],
    source: "Lexicanum: Cicatrix Maledictum / Fall of Cadia"
  },
  {
    id: "sanctus_and_nihilus",
    term: "임페리움 상크투스와 임페리움 니힐루스",
    en: "Imperium Sanctus & Imperium Nihilus",
    category: "chronology",
    summary: "대균열 남쪽의 '빛이 닿는 제국' 상크투스와, 아스트로노미칸이 차단된 북쪽의 '암흑 제국' 니힐루스.",
    body: "시카트릭스 말레딕툼은 인류제국을 절반으로 갈라놓았다. 신성한 테라가 있는 남쪽 '임페리움 상크투스'는 아스트로노미칸의 빛 덕분에 성간 항해와 중앙 통제가 유지되지만, 균열 너머 북쪽 '임페리움 니힐루스'는 등대의 빛과 통신이 끊긴 채 카오스와 외계 종족에 포위되었다. 길리먼은 블러드 엔젤 챕터 마스터 단테를 니힐루스의 섭정으로 임명해 절망적인 항전을 맡겼다.",
    inGameNote: "대균열 이후 바알·보스트로야·펜리스 등 게임 내 옵스쿠루스·니힐루스 권역에 머무르면 상단 표시가 '임페리움 니힐루스'로 바뀌고 고립 배급 붕괴와 단테 항전 사건이 열린다.",
    relatedGlossaryIds: ["great_rift", "astronomican", "segmenta_majoris"],
    relatedCodexLinks: [
      { label: "사령관 단테", href: "/codex/characters/#dante" },
      { label: "바알 행성", href: "/codex/worlds/#baal" },
      { label: "비질루스 전쟁 연표", href: "/codex/timeline/#tl_vigilus_war" }
    ],
    source: "Lexicanum: Imperium Nihilus / Imperium Sanctus"
  },
  {
    id: "indomitus_crusade",
    term: "인도미투스 성전과 프라이마크들의 귀환",
    en: "Indomitus Crusade & Return of the Primarchs",
    category: "chronology",
    summary: "1만 년 만에 부활한 울트라마린 프라이마크 길리먼의 대반격과, 이후 다크 엔젤 라이온 엘 존슨의 귀환.",
    body: "999.M41 대균열의 절망 속에서 로부테 길리먼이 부활해 테라 사자의 문 전투를 승리로 이끈 뒤, 001.M42 제국 섭정 자격으로 카울의 프라이머리스 마린 군단을 이끌고 '인도미투스 성전'을 선포했다. 이후 020.M42 '징조의 방주' 위기 속에서는 제1군단 프라이마크 라이온 엘 존슨마저 깨어나 암흑 제국의 인간들을 수호하는 '라이온의 보호령'을 세웠다.",
    inGameNote: "M42 인도미투스 성전 이후 시대 프리셋이나 장수 캐릭터를 통해 길리먼·라이온·발로리스 조우와 프라이머리스 배치·제4차 타이라니드 전쟁까지 체험할 수 있다.",
    relatedGlossaryIds: ["primaris_rubicon", "great_rift", "high_lords_of_terra"],
    relatedCodexLinks: [
      { label: "인도미투스 성전 연표", href: "/codex/timeline/#tl_guilliman_return" },
      { label: "징조의 방주 · 라이온 귀환", href: "/codex/timeline/#tl_arks_of_omen_lion" },
      { label: "라이온 엘 존슨", href: "/codex/characters/#lion" }
    ],
    source: "Lexicanum: Indomitus Crusade / Arks of Omen: The Lion"
  },

  // =========================================================================
  // 8. 게임 시스템 용어 안내 (3종)
  // =========================================================================
  {
    id: "eight_stats_d100",
    term: "8대 특성치와 d100 판정",
    en: "8 Characteristics & d100 Roll",
    category: "game_systems",
    summary: "워해머 40k 공식 TRPG에서 가져온 8개 능력치와 1~100 주사위 이하 판정 규칙.",
    body: "캐릭터는 백병, 사격, 강인, 민첩, 지성, 의지, 교섭, 권위의 8대 특성치를 지닌다. 분기 사건에서 판정 선택지를 고르면 '현재 능력치와 난이도 보정'으로 계산된 목표치(5%~95%) 이하의 100면 주사위 눈금이 나올 때 성공한다. 연간 '삶의 초점'을 조절해 원하는 진로에 필요한 특성치를 집중 육성할 수 있다.",
    inGameNote: "판정 결과는 사건 직후 판정 배너와 실시간 연대기 기록에 'd100 굴림/목표 성공·실패' 형식으로 투명하게 표시된다.",
    relatedGlossaryIds: ["alignment_faith_corruption", "career_tiers_transit"],
    relatedCodexLinks: [
      { label: "91종 직군 해금 조건 보기", href: "/codex/careers/" }
    ],
    source: "Dark Heresy / Imperium Maledictum / Imperialis Vita 규칙서"
  },
  {
    id: "alignment_faith_corruption",
    term: "3대 도덕 성향 · 황제 신앙 · 워프 오염",
    en: "Three Alignments, Faith & Corruption",
    category: "game_systems",
    summary: "자비·교조·암흑의 3축 도덕 성향과, 종교적 헌신인 신앙과 카오스 타락인 오염의 독립 지표.",
    body: "이 게임은 단순한 선악 1축 대신 '자비·인본', '교조·광신', '암흑·탐욕'의 3대 도덕 성향을 독립 누적한다. 덕분에 카오스에 오염되지 않은 냉혹한 세속적 악인(높은 암흑과 낮은 오염)이나, 신앙은 독실하지만 무자비한 심문관(높은 교조와 높은 신앙) 같은 입체적 인물상이 자연스럽게 만들어진다. 반면 워프 오염이 100에 달하면 필멸자는 카오스 스폰으로 붕괴한다(데몬 프린스·쿠스토데스·그레이 나이트·살아 있는 성인 제외).",
    inGameNote: "각 성향이 15, 35, 60을 넘으면 1~3단계 칭호가 부여되며 성향 우대 사건과 10개 상징 직군 지름길, 살아 있는 성인 위상 분기 및 맞춤 부고 에필로그가 해금된다.",
    relatedGlossaryIds: ["eight_stats_d100", "chaos_gods", "ecclesiarchy_creed"],
    relatedCodexLinks: [
      { label: "살아 있는 성인 직군 트리", href: "/codex/careers/#tree-living_saint" },
      { label: "암흑의 신들 직군 트리", href: "/codex/careers/#tree-chaos" }
    ],
    source: "Imperialis Vita 시스템 규칙서"
  },
  {
    id: "career_tiers_transit",
    term: "진로 계급(Tier 1~6) · 발탁 이벤트 · 성간 이동",
    en: "Career Tiers, Dynamic Offers & Transit Tier",
    category: "game_systems",
    summary: "21개 세력 91종 직군의 진입 2단계 구조와, 계급에 따라 달라지는 강제 파견·자율 출항 규칙.",
    body: "우측 자율 선택 패널에는 현재 즉시 지원할 수 있는 입문·일반 직군만 깔끔하게 표시된다. 장군, 챕터 마스터, 행성 총독, 로그 트레이더, 테라의 하이 로드 12석, 살아 있는 성인, 데몬 프린스 같은 상위·최고위 계급은 발탁 이벤트 전용으로, 조건을 충족하면 동적 임명·발탁 사건으로 제안된다. 또한 하위 병사는 명령에 따라 강제 파견되지만, 제독·로그 트레이더·이단심문관·최고위직은 자율적으로 목적지 행성을 골라 출항할 수 있다.",
    inGameNote: "100세 이상 초장수나 55세 이상의 Tier 6 최고위에 도달하면 자율 행동 패널에서 직군별 고증 엔딩으로 생애를 명예롭게 마감할 수도 있다.",
    relatedGlossaryIds: ["eight_stats_d100", "high_lords_of_terra", "imperium_of_man"],
    relatedCodexLinks: [
      { label: "21개 세력 91종 계급도", href: "/codex/careers/" },
      { label: "23개 제국 행성", href: "/codex/worlds/" }
    ],
    source: "Imperialis Vita 시스템 규칙서"
  }
];
