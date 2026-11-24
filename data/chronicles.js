window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};

// 상황 맞춤형 자동 기록(Chronicle Logs) — 본인 상황(나이/행성/신분/직업/자질/시대)과 100% 일치할 때만 출력
// priority: 3 = 행성/직업 초고유, 2 = 신분/자질/시대 특화, 1 = 제국 일반 부조리
window.IMPERIUM_DATA.CHRONICLES = [
  // =========================================================================
  // 1. 유년기(1~13세) 22개 전 행성 · 신분별 철저 맞춤형 일상 로그
  // =========================================================================
  // --- 크리그 전용 유아/아동기 (비타-움 & 지하 벙커, 어머니/가정 없음!) ---
  {
    id: "ch_kid_krieg_infant_1",
    badge: "크리그 배양실",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["krieg"] },
    text: "어머니의 품 대신 비타-움(인공 배양실)의 차가운 보육 캡슐에서 자랐다. 이름 대신 인식 번호가 팔목에 찍히며 첫 호흡을 익혔다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_kid_krieg_infant_2",
    badge: "크리그 지하 보육",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["krieg"] },
    text: "지하 보육 구역의 무감정한 보육 서비터가 합성 영양제를 배급했다. 벽면 확성기에서는 하루 종일 크리그의 속죄와 복종 교리가 흘러나왔다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_kid_krieg",
    badge: "크리그 유년기",
    priority: 3,
    req: { minAge: 3, maxAge: 13, anyWorlds: ["krieg"] },
    text: "생일 축하 따위는 없었다. 대신 작은 방독면의 필터 교체 요령과 속죄의 기도문을 200번 복창했다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_kid_krieg_2",
    badge: "크리그 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["krieg"] },
    text: "지하 벙커에서 자라며 태어나서 한 번도 푸른 하늘이나 풀잎을 본 적이 없다. 오직 황제를 위한 전사(戰死)만이 유일한 꿈으로 교육받았다.",
    effect: { stats: { T: 1 }, faith: 2 }
  },
  // --- 화성 / 포지 월드 전용 유아/아동기 ---
  {
    id: "ch_kid_forge_infant_1",
    badge: "포지 보육 구역",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["forge", "mechanicus"] },
    text: "테크프리스트가 아기의 두개골과 신경 반응 속도를 기계 스캐너로 측정했다. '기계교 도제 적성 보류, 노동력 적합' 코드가 기록되었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_kid_forge_infant_2",
    badge: "포지 보육 구역",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["forge", "mechanicus"] },
    text: "거대한 용광로의 규칙적인 진동과 이진법 기계령 찬송가를 자장가 삼아 자랐다. 창문 밖 하늘은 늘 붉은 철가루 연무로 가득했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_kid_mars",
    badge: "포지 월드 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorldTags: ["forge", "mechanicus"] },
    text: "장난감 대신 고장 난 서비터의 배선을 분류하는 법을 배웠다. 기계교 사제가 '살점은 썩지만 강철은 썩지 않는다'고 훈시했다.",
    effect: { stats: { Int: 1 } }
  },
  // --- 데스 월드 & 야만 행성 전용 유아/아동기 ---
  {
    id: "ch_kid_catachan_infant",
    badge: "카타찬 밀림 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["catachan"] },
    text: "독충 방지 철망이 쳐진 야영지 요람에서 밀림 괴수들의 울음소리를 들으며 컸다. 걸음마를 떼기도 전에 독초 냄새부터 구별하게 되었다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_kid_catachan",
    badge: "카타찬 유년기",
    priority: 3,
    req: { minAge: 4, maxAge: 13, anyWorlds: ["catachan"] },
    text: "침상 밑에 숨어 있던 독거미를 맨손으로 잡았다. 카타찬에서는 10살을 넘기는 아이가 절반도 안 된다고 어른들이 덤덤히 말했다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  {
    id: "ch_kid_fenris_infant",
    badge: "펜리스 빙원 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["fenris"] },
    text: "두꺼운 얼음 늑대 가죽에 싸여 눈보라 속에서 강인함을 시험받았다. 펜리스의 혹한을 버티지 못하는 약한 아이는 첫 겨울을 넘기지 못한다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_kid_fenris",
    badge: "펜리스 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["fenris"] },
    text: "얼음 바람 속에서 부족의 스칼드(음유시인)가 들려주는 '하늘의 늑대 전사' 전설을 들으며 나무 도끼를 휘둘렀다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_kid_baal_infant",
    badge: "바알 사막 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["baal"] },
    text: "방사능 모래폭풍을 막아 주는 낡은 가죽 천막 아래서 귀한 정제수 몇 방울로 목을 축이며 자랐다. 부족 장로는 아기의 피에 돌연변이가 없는지 살폈다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_kid_baal",
    badge: "바알 유년기",
    priority: 3,
    req: { minAge: 4, maxAge: 13, anyWorlds: ["baal"] },
    text: "방사능 먼지가 섞인 빗물을 천에 걸러 마시며 붉은 사막을 떠돌았다. 먼 지평선의 천사 석상만이 유일한 희망이었다.",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  {
    id: "ch_kid_nocturne_infant",
    badge: "녹턴 성소 유년기",
    priority: 3,
    req: { minAge: 1, maxAge: 13, anyWorlds: ["nocturne"] },
    text: "화산재가 흩날리는 밤, 성소 마을의 대장간 화로 곁에서 대가족이 둘러앉아 강철 벼리는 불꽃을 바라보며 자랐다.",
    effect: { stats: { T: 1, Fel: 1 } }
  },
  {
    id: "ch_kid_feral_infant",
    badge: "변방 야만 행성",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["feral"] },
    text: "부족 주술사가 '별 너머의 황금 신'에게 아기의 건강을 빌며 재로 이마에 표식을 그렸다. 제국의 서기관 따위는 이 원시 대륙까지 오지 않는다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_kid_feral_child",
    badge: "변방 부족 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["feral"] },
    text: "나무 창과 돌칼을 들고 부족 어른들을 따라 야수를 추적했다. 가끔 밤하늘을 가로지르는 밝은 유성(제국 함선)을 보고 신들의 수레라 믿었다.",
    effect: { stats: { WS: 1, Ag: 1 } }
  },
  // --- 보이드본 / 스콜라 / 귀족 / 낙원 전용 유아/아동기 ---
  {
    id: "ch_kid_voidborn_infant",
    badge: "함선 선실 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["voidborn"] },
    text: "거대 성간선의 플라즈마 엔진 진동을 느끼며 저중력 해먹에서 잠들었다. 함선 선교사가 워프 변이 징후가 없는지 정밀 검사를 마쳤다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_kid_voidborn",
    badge: "함선 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["voidborn"] },
    text: "무중력 정비 구획을 놀이터 삼아 자랐다. 행성의 '하늘'이라는 개념을 그림책으로 보고도 천장이 없다는 사실을 믿지 못했다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_kid_schola_infant",
    badge: "스콜라 기숙사",
    priority: 3,
    req: { minAge: 1, maxAge: 5, allTags: ["schola"] },
    text: "전장에서 순직한 부모의 영광을 이어받아 스콜라 프로제니움의 엄숙한 기숙 보육동으로 인계되었다. 황제께서 이제 유일한 어버이시다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },
  {
    id: "ch_kid_schola",
    badge: "스콜라 프로제니움",
    priority: 3,
    req: { minAge: 6, maxAge: 15, allTags: ["schola"] },
    text: "드릴-애벗의 강철 지팡이 아래 새벽 4시 기상, 10km 구보, 이단자 색출 토론이 끝없이 반복되었다. 눈물을 보인 급우는 하루 종일 무릎을 꿇었다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 3, wounds: -2 }
  },
  {
    id: "ch_kid_noble_infant",
    badge: "상류 가문 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, or: [{ allTags: ["noble"] }, { anyWorldTags: ["paradise"] }], excludeWorlds: ["krieg"] },
    text: "향기로운 정원과 전담 유모, 개인 메디케아 의사의 보살핌 속에 자랐다. 하층 구역의 기근과 매연은 창밖 저 아래 먼 세계의 일이었다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_kid_noble",
    badge: "상층 첨탑 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, or: [{ allTags: ["noble"] }, { anyWorldTags: ["paradise"] }], excludeWorlds: ["krieg"] },
    text: "오염 구름 위 수정 온실에서 재배한 진짜 사과를 맛보았다. 가정교사는 하층민의 숫자는 통계일 뿐 인간의 수로 치지 말라고 가르쳤다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  // --- 네임드 도시/요새/성지/삼림 행성 고유 유년기 ---
  {
    id: "ch_kid_cadia",
    badge: "카디아 유년기",
    priority: 3,
    req: { minAge: 4, maxAge: 13, anyWorlds: ["cadia"] },
    text: "학교 체육 시간 대신 표준 라스건 분해·조립 속도 평가를 치렀다. 30초 안에 못 끝낸 아이는 저녁 배급이 압수되었다.",
    effect: { stats: { BS: 1 } }
  },
  {
    id: "ch_kid_cadia_2",
    badge: "카디아 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["cadia"] },
    text: "밤하늘을 가득 채운 보랏빛 '공포의 눈'을 올려다보며 자랐다. 어른들은 저 빛을 두려워하지 말라고 가르쳤다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_kid_macragge",
    badge: "마크라그 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["macragge"] },
    text: "대리석 회랑의 아카데미에서 하이 고딕 문법과 로부테 길리먼의 행정·전술 격언을 암송했다. 다른 행성에선 상상도 못 할 호사였다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_kid_vostroya_child",
    badge: "보스트로야 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["vostroya"] },
    text: "눈보라와 공장의 쇳물 연기 속에서 가문의 오래된 털모자와 훈장을 만져 보며 자랐다. 어른들은 언젠가 황제께 바쳐질 장자의 의무를 들려주었다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_kid_valhalla_child",
    badge: "발할라 지하 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["valhalla"] },
    text: "지하 도시의 따스한 열배관 곁에서 동토의 오크 침공 일화를 들으며 컸다. 바깥 영하 80도의 얼음 평원은 어른들만의 영역이었다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_kid_tanith_child",
    badge: "타니스 숲 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["tanith"] },
    text: "안개 낀 날나무 숲의 좁은 오솔길에서 길 잃지 않고 집을 찾아오는 놀이를 하며 자랐다. 이 감각은 평생 몸에 배었다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_kid_ophelia_child",
    badge: "오펠리아 VII 유년기",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["ophelia7"] },
    text: "하늘을 찌르는 대성당의 종소리와 소로리타스 수녀들의 행진 속에 성가를 배우며 자랐다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },
  {
    id: "ch_kid_lowborn_hive",
    badge: "하층 아동 노동",
    priority: 3,
    req: { minAge: 6, maxAge: 13, allTags: ["lowborn"], anyWorldTags: ["hive", "industrial", "forge"] },
    text: "어른의 손이 닿지 않는 좁은 환기구와 용광로 틈새에 기어 들어가 그을음을 긁어냈다. 기침할 때마다 검은 가래가 섞여 나왔다.",
    effect: { stats: { Ag: 1 }, wounds: -4 }
  },
  // --- 표준 제국 도시/농업/문명 행성 유아·아동기 (크리그·화성·데스·야만·보이드본·낙원 제외!) ---
  {
    id: "ch_kid_infant_1",
    badge: "제국 유아기",
    priority: 1,
    req: {
      minAge: 1,
      maxAge: 5,
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars"],
      excludeTags: ["schola"]
    },
    text: "지역 교구 사제가 아기 이마에 성유로 아퀼라 문양을 그리며 돌연변이 징후가 없는지 꼼꼼히 검사했다. 다행히 '정상 인류' 판정을 받았다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_kid_infant_2",
    badge: "제국 유아기",
    priority: 1,
    req: {
      minAge: 1,
      maxAge: 5,
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg"],
      excludeTags: ["noble", "schola"]
    },
    text: "어머니는 하루 14시간 교대 근무를 마치고 돌아와 낡은 담요를 덮어 주며 황제께서 지켜 주신다는 자장가를 불러 주었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_kid_infant_3",
    badge: "제국 유아기",
    priority: 1,
    req: {
      minAge: 1,
      maxAge: 5,
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest", "paradise"],
      excludeWorlds: ["krieg"]
    },
    text: "아드미니스트라툼 호적 서기관이 출생 등록 번호와 향후 십일조 예상 기여도를 데이터 슬레이트에 입력하고 돌아갔다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_kid_general_1",
    badge: "제국 아동 교육",
    priority: 1,
    req: {
      minAge: 4,
      maxAge: 13,
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeTags: ["noble", "astartes", "custodes", "schola"],
      excludeWorlds: ["krieg"]
    },
    text: "지역 교리 학교에서 그림책 《우리의 황제와 불태워야 할 돌연변이》를 낭독했다. 손가락이 여섯 개인 이웃 아이는 다음 주부터 보이지 않았다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_kid_general_2",
    badge: "제국 유년기",
    priority: 1,
    req: {
      minAge: 4,
      maxAge: 12,
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeTags: ["noble", "astartes", "custodes", "schola"],
      excludeWorlds: ["krieg"]
    },
    text: "배급소에서 받은 영양 블록을 씹으며 하늘을 지나가는 제국 화물선의 굉음을 들었다. 어른들은 저 별 너머엔 오직 전쟁뿐이라고 속삭였다.",
    effect: { stats: { T: 1 } }
  },

  // =========================================================================
  // 2. 네임드 행성 & 유형별 고유 일상·부조리 로그 (성인/거주자 맞춤)
  // =========================================================================
  {
    id: "ch_world_terra_1",
    badge: "신성한 테라",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["terra"], excludeTags: ["custodes"] },
    text: "황궁 외곽 순례 행렬이 40km나 밀렸다. 줄을 서다 굶주림과 압사로 쓰러진 순례자들을 청소 서비터가 묵묵히 수거해 갔다.",
    effect: { faith: 3, wounds: -2 }
  },
  {
    id: "ch_world_terra_2",
    badge: "신성한 테라",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes"] },
    text: "테라의 바다는 수만 년 전에 말라 버렸다. 한 모금의 정제수를 얻기 위해 시민들이 3시간씩 줄을 서는 사이, 고위 관료의 정원에는 분수가 솟구쳤다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_world_mars_1",
    badge: "화성 포지",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["mars"] },
    text: "붉은 방사능 모래폭풍이 올림푸스 몬스 주조소를 덮쳤다. 테크프리스트는 노동자 대피보다 외부 코기타토르 냉각기 덮개부터 씌우라고 명령했다.",
    effect: { stats: { Int: 1 }, wounds: -3 }
  },
  {
    id: "ch_world_cadia_1",
    badge: "요새 카디아",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["cadia"] },
    text: "카스르(요새 도시)의 방어 포대가 새벽마다 공포의 눈을 향해 시험 사격을 울렸다. 카디아에서 평화란 다음 침공까지의 장전 시간을 뜻할 뿐이다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_world_krieg_1",
    badge: "크리그 속죄",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["krieg"] },
    text: "방사능 강우로 인해 지상 이동이 통제되었다. 일련번호 호명 중 옆자리 병사가 기침으로 쓰러지자, 위생병은 치료 대신 군장을 회수해 다음 신병에게 넘겼다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -2 }
  },
  {
    id: "ch_world_armageddon_1",
    badge: "아마겟돈 황무지",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["armageddon"] },
    text: "잿빛 화산재가 하이브 환기구를 막아 산성 연무 경보가 내려졌다. 외곽 정글에서는 아직도 전전(前戰)의 오크 포자가 버섯처럼 돋아나 화염방사 부대가 출동했다.",
    effect: { stats: { T: 1 }, wounds: -3 }
  },
  {
    id: "ch_world_necromunda_1",
    badge: "네크로문다 하층",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["necromunda"], excludeTags: ["noble", "astartes", "custodes", "inquisitor", "sororitas"] },
    text: "하이브 프리무스 하층 구역에서 골리앗 갱단과 에셔 갱단의 총격전이 사흘째 이어졌다. 치안대는 상층 엘리베이터 문만 걸어 잠근 채 관망했다.",
    effect: { stats: { Ag: 1, WS: 1 }, wounds: -3 }
  },
  {
    id: "ch_world_necromunda_astartes",
    badge: "네크로문다 · 챕터 사열",
    priority: 3,
    req: { anyWorlds: ["necromunda"], allTags: ["astartes"] },
    text: "네크로문다 하이브 프리무스의 상공을 썬더호크로 선회하며 하층 갱단들의 항쟁을 내려다보았다. 저 잔혹한 싸움터가 다음 세대 임페리얼 피스트의 요람이 될 것이다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_world_macragge_1",
    badge: "울트라마 질서",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["macragge"] },
    text: "제국 타 행성에서는 기적이라 부를 깨끗한 상수도와 정시 배급이 오늘도 차질 없이 돌아갔다. 마크라그 시민들은 울트라마린의 통치에 자부심을 품었다.",
    effect: { stats: { Int: 1 }, wounds: 3 }
  },
  {
    id: "ch_world_baal_1",
    badge: "바알의 사막",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["baal"] },
    text: "살을 태우는 방사능 태양 아래 갈증의 행군이 이어졌다. 변이된 사막 전갈을 구워 먹으며 붉은 천사들의 그림자를 올려다보았다.",
    effect: { stats: { T: 1, WS: 1 }, wounds: -3 }
  },
  {
    id: "ch_world_fenris_1",
    badge: "펜리스 빙원",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["fenris"] },
    text: "화산이 터지고 빙하가 무너져 마을 절반이 바다로 가라앉았다. 살아남은 자들은 슬퍼하는 대신 불을 피우고 메드 술을 마시며 죽은 자의 이름을 노래했다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -2 }
  },
  {
    id: "ch_world_catachan_1",
    badge: "카타찬 밀림",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["catachan"] },
    text: "아침에 신발을 털자 손바닥만 한 신경독 두꺼비가 튀어나왔다. 신병 시절이었다면 즉사였겠지만 이제는 눈도 깜짝하지 않고 단검으로 찔러 구워 먹었다.",
    effect: { stats: { T: 1, Ag: 1 } }
  },
  {
    id: "ch_world_vostroya_1",
    badge: "보스트로야 혹한",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["vostroya"] },
    text: "폭설과 매연 속에서 무기고 공장의 망치질이 밤낮없이 울렸다. 이웃 집 맏아들이 가문의 낡은 털모자와 플라즈마 총을 물려받고 출정 열차에 올랐다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_world_valhalla_1",
    badge: "발할라 지하도시",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["valhalla"] },
    text: "지표 기온이 영하 80도까지 떨어져 지하 열교환기가 비명을 질렀다. 사람들은 두꺼운 외투를 껴입은 채 뜨거운 타나 차 한 모금으로 언 손을 녹였다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_world_tanith_1",
    badge: "타니스 날나무 숲",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["tanith"] },
    text: "밤사이 거대한 날나무 숲이 뿌리를 옮겨 마을 진입로를 바꿔 놓았다. 외지인은 영원히 헤맬 안개 속을 직감 하나로 걸어 나왔다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_world_nocturne_1",
    badge: "녹턴의 모루",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["nocturne"] },
    text: "지각 변동 시기(Time of Trial)의 용암 진동이 성소를 흔들었다. 주민들은 대장간에 모여 서로의 무구와 식량을 나누며 샐러맨더의 정신을 되새겼다.",
    effect: { stats: { T: 1, Fel: 1 } }
  },
  {
    id: "ch_world_ophelia7_1",
    badge: "오펠리아 VII 성지",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["ophelia7"] },
    text: "수만 개의 파이프 오르간이 행성 전체에 성가를 울려 퍼뜨렸다. 찬송가 박자를 틀린 상인이 이단 의심으로 끌려가는 모습을 보고 모두 목소리를 높였다.",
    effect: { stats: { WP: 1 }, faith: 4 }
  },
  {
    id: "ch_world_paradise_1",
    badge: "낙원 행성",
    priority: 3,
    req: { minAge: 14, anyWorldTags: ["paradise"] },
    text: "푸른 바다와 인공 조정된 미풍 속에서 한 해가 흘렀다. 이 천국의 유지비를 대기 위해 인접 성계 하이브 월드 수십억 명이 굶주린다는 사실은 아무도 입에 올리지 않았다.",
    effect: { wounds: 5, stats: { Fel: 1 } }
  },
  {
    id: "ch_world_agri_1",
    badge: "아그리 월드",
    priority: 3,
    req: { minAge: 14, anyWorldTags: ["agri"], excludeTags: ["noble", "astartes", "custodes"] },
    text: "화학 촉진 비료가 안개처럼 뿌려지는 평원에서 16시간 수확 노역을 치렀다. 끝없는 밀밭이지만 정작 농부들의 식탁엔 시체 녹말이 올라왔다.",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  {
    id: "ch_world_feral_1",
    badge: "변방 야만 행성",
    priority: 3,
    req: { minAge: 14, anyWorldTags: ["feral"], excludeTags: ["astartes", "custodes"] },
    text: "하늘에서 불기둥을 뿜으며 내려온 제국의 징세선을 보고 장로들이 엎드려 절했다. 하늘 사신들은 곡물과 가장 건장한 청년들을 싣고 구름 위로 사라졌다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_world_voidborn_1",
    badge: "성간 함선 일상",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["voidborn"] },
    text: "하층 화물 구역의 인공 중력이 반나절 동안 꺼져 모두가 쇠사슬에 몸을 묶고 버텼다. 선교사는 '선체의 기계령이 기도를 원하신다'며 향로를 흔들었다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },

  // =========================================================================
  // 3. 병종·직업별 고유 일상 & 제국의 부조리 로그 (본인 직군 한정!)
  // =========================================================================
  {
    id: "ch_job_menial_1",
    badge: "매뉴팩토룸 부조리",
    priority: 3,
    req: { anyCareers: ["menial_worker"] },
    text: "16시간 교대 근무 중 옆자리 노동자의 팔이 유압 프레스에 빨려 들어갔다. 감독관은 즉시 외쳤다. '생산 라인 멈추지 마라! 성스러운 기계령에 피가 튀지 않았는지부터 확인해!'",
    effect: { stats: { T: 1 }, wounds: -4, faith: -2 }
  },
  {
    id: "ch_job_menial_2",
    badge: "노동자의 일상",
    priority: 3,
    req: { anyCareers: ["menial_worker"] },
    text: "휴일 없는 연속 교대 끝에 할당량을 102% 달성했다. 포상으로 '황제 폐하께서 그대의 수고를 기억하신다'는 종이쪽지 한 장과 5분 추가 휴식을 받았다.",
    effect: { stats: { WP: 1 }, wounds: -2 }
  },
  {
    id: "ch_job_menial_3",
    badge: "서비터의 눈동자",
    priority: 3,
    req: { anyCareers: ["menial_worker", "underhive_ganger"] },
    text: "공장 입구 문을 여닫는 서비터의 텅 빈 눈동자에서 지난겨울 작업 거부로 잡혀간 이웃의 얼굴을 본 것 같았다. 서둘러 시선을 내리고 일터로 뛰어들어갔다.",
    effect: { stats: { WP: 1 }, faith: -1 }
  },
  {
    id: "ch_job_ganger_1",
    badge: "언더하이브 생존",
    priority: 3,
    req: { anyCareers: ["underhive_ganger"] },
    text: "암시장에서 유통기한이 80년 지난 군용 합성 육포와 녹슨 스터브 권총 탄환을 맞바꾸었다. 하층 구역에선 탄환이 화폐보다 신용도가 높다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_job_pdf_1",
    badge: "행성 방위군",
    priority: 3,
    req: { anyCareers: ["pdf_trooper"] },
    text: "총독 관저 외곽을 보초 서며 낡은 오토건을 닦았다. 귀족 영식들이 술에 취해 정원 조각상에 총을 쏘며 놀았지만, 제국법상 경비병은 눈을 감고 있어야 했다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_job_guard_1",
    badge: "보병 입문서 부조리",
    priority: 3,
    req: { anyCareers: ["astra_militarum"] },
    text: "군장 검사에서 《제국 보병 입문서》를 잠깐 못 찾은 분대원이 현장에서 채찍 30대를 맞았다. 입문서에는 '오크는 겁쟁이이며 라스건 한 발에 쓰러진다'고 적혀 있었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_job_guard_2",
    badge: "병참 오배송",
    priority: 3,
    req: { anyCareers: ["astra_militarum"] },
    text: "아드미니스트라툼의 착오로 혹한 행성에 사막용 반바지와 전부 왼쪽 발뿐인 군화가 보급되었다. 항의한 병장은 '제국 물자 모독죄'로 영창에 갇혔다.",
    effect: { stats: { T: 1 }, wounds: -3 }
  },
  {
    id: "ch_job_guard_3",
    badge: "15시간 생존율",
    priority: 3,
    req: { anyCareers: ["astra_militarum"] },
    text: "진흙 참호 속에서 식은 레이션을 씹으며 신병들에게 '포탄이 떨어지면 기도보다 구덩이에 코 박는 게 빠르다'고 속삭여 주었다. 평균 생존 시간 15시간의 전선에서 또 한 해를 넘겼다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_job_officer_1",
    badge: "장교의 산수",
    priority: 3,
    req: { anyCareers: ["militarum_officer"] },
    text: "상부 참모부에서 '보병 2개 대대를 소모하면 화력 지원 탄약을 12% 절약할 수 있다'는 공문이 내려왔다. 이 제국에서 포탄은 비싸고 인간의 생명은 공짜다.",
    effect: { stats: { Int: 1, Inf: 1 }, faith: -2 }
  },
  {
    id: "ch_job_scion_1",
    badge: "템페스투스 사이온",
    priority: 3,
    req: { anyCareers: ["tempestus_scion"] },
    text: "발키리 수송기에서 적 방공망 한복판으로 무음 강하해 적 지휘관을 4분 만에 암살하고 복귀했다. 작전 보고서에는 '일상적 정화' 단 네 글자만 적혔다.",
    effect: { stats: { BS: 1, Ag: 1, Inf: 1 } }
  },
  {
    id: "ch_job_commissar_1",
    badge: "커미사르의 고독",
    priority: 3,
    req: { anyCareers: ["commissar", "lord_commissar"] },
    text: "장교 식당에 들어서자 웃고 떠들던 위관들이 일제히 입을 다물고 꼿꼿이 자세를 고쳤다. 공포가 규율을 세우지만, 등 뒤의 '아군 오사'를 늘 경계해야 한다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_commissar_2",
    badge: "철의 군기",
    priority: 3,
    req: { anyCareers: ["commissar", "lord_commissar"] },
    text: "보급창고에서 아마섹 술을 훔쳐 마신 병참 하사관에게 즉석 군법회의를 열었다. 볼트 피스톨 안전장치를 푸는 소리만으로 연대 전체의 도난 사건이 근절되었다.",
    effect: { stats: { Fel: 1, WP: 1 }, faith: 2 }
  },
  {
    id: "ch_job_sororitas_1",
    badge: "전투 수녀회",
    priority: 3,
    req: { anyCareers: ["adepta_sororitas", "canoness"] },
    text: "새벽 철야 기도 후 파워 아머의 성유를 바르며 볼터와 화염방사기를 정비했다. 작은 회의(懷疑)를 고백한 수련 수녀가 자진해 리펜티아(참회 부대)로 향하는 뒷모습을 축복했다.",
    effect: { stats: { WP: 1, BS: 1 }, faith: 4 }
  },
  {
    id: "ch_job_astartes_1",
    badge: "아스타르테스 수련",
    priority: 3,
    req: { anyCareers: ["astartes_scout", "astartes_brother", "astartes_captain"] },
    text: "하루 18시간의 실탄 전투 훈련과 4시간의 전술 성찰, 단 2시간의 휴식. 평범한 필멸자들이 늙어 죽어 가는 동안 초인의 육신은 오직 전쟁의 도구로 벼려진다.",
    effect: { stats: { WS: 1, BS: 1 } }
  },
  {
    id: "ch_job_astartes_2",
    badge: "초인의 괴리",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_captain"] },
    text: "해방한 행성의 시민들이 눈물을 흘리며 파워 아머 앞에 무릎을 꿇었다. 한때 나 역시 저토록 작고 나약한 인간이었다는 사실이 이제는 아득한 전설처럼 느껴진다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_astartes_dread",
    badge: "드레드노트의 꿈",
    priority: 3,
    req: { allTags: ["dreadnought"] },
    text: "전투 사이 정지 수면 속에서 수백 년 전 고향의 바람을 꿈꾸었다. 테크마린이 석관에 축성유를 바르며 깨울 때면 오직 어설트 캐논의 회전음만이 현실이었다.",
    effect: { stats: { WP: 2, T: 1 } }
  },
  {
    id: "ch_job_grey_knight_1",
    badge: "타이탄의 비밀",
    priority: 3,
    req: { anyCareers: ["grey_knight"] },
    text: "악마 침공을 저지한 직후, 규율에 따라 우리의 존재를 목격한 충성스러운 가드맨 연대의 기억 소거와 격리가 집행되었다. 인류를 지키기 위해 인류에게 잊혀야 하는 것이 666챕터의 숙명이다.",
    effect: { stats: { WP: 2 }, corruption: -4 }
  },
  {
    id: "ch_job_custodes_1",
    badge: "황금 옥좌의 철야",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes"] },
    text: "황궁 영원의 문 앞에서 단 한 번의 미동도 없이 7개월을 보초 섰다. 남은 시간에는 고대 테라의 철학서와 1만 가지 암살 대응 시뮬레이션을 암산했다.",
    effect: { stats: { Int: 1, WP: 1, WS: 1 } }
  },
  {
    id: "ch_job_inquisition_1",
    badge: "심문소의 그림자",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisitor"] },
    text: "이단 첩보 하나를 확인하기 위해 선술집 손님 14명을 전원 연행해 심문했다. 13명은 무고했지만 1명의 품에서 여덟 갈래 별 부적이 나왔다. '무고함은 아무것도 증명하지 못한다.'",
    effect: { stats: { Int: 1, Inf: 1 }, faith: 1 }
  },
  {
    id: "ch_job_inquisition_2",
    badge: "로제트의 무게",
    priority: 3,
    req: { anyCareers: ["inquisitor"] },
    text: "행성 총독이 화려한 뇌물과 연회로 호의를 구했으나, 품속에서 황금 로제트를 꺼내 탁자에 올려놓자 그 자리에서 창백하게 무릎을 꿇었다.",
    effect: { stats: { Inf: 2, WP: 1 } }
  },
  {
    id: "ch_job_mechanicus_1",
    badge: "기계교 의례",
    priority: 3,
    req: { anyCareers: ["skitarii", "tech_priest", "archmagos"] },
    text: "고장 난 발전기의 스위치를 누르기 전에 3시간 동안 성유를 바르고 이진법 찬가를 낭송했다. 원리를 이해하려는 것은 이단이며, 오직 매뉴얼 의례만이 옴니시아의 뜻이다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_job_mechanicus_2",
    badge: "살점의 나약함",
    priority: 3,
    req: { anyCareers: ["tech_priest", "archmagos"] },
    text: "노화된 생체 폐를 적출하고 최신형 방사선 여과 펌프로 교체했다. 숨 쉬는 감각은 사라졌지만 작업 효율이 14.7% 상승해 만족스러웠다.",
    effect: { stats: { T: 1, Int: 1 }, wounds: 4 }
  },
  {
    id: "ch_job_navy_1",
    badge: "임페리얼 네이비",
    priority: 3,
    req: { anyCareers: ["imperial_navy"] },
    text: "순양함 하층 포갑판에서 수백 명의 노역자들이 거대 마크로 캐논 포탄을 쇠사슬로 끌어올리다 6명이 압사했다. 함교 항해 일지에는 '3번 포대 재장전 1.4초 지연'이라고만 적혔다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_job_arbites_1",
    badge: "제국법 집행",
    priority: 3,
    req: { anyCareers: ["arbites"] },
    text: "십일조 곡물 창고에서 빵 한 덩이를 훔친 굶주린 부랑자에게 제국법 제412조를 적용해 '서비터 전환형'을 선고했다. 법은 자비가 아니라 제국의 생존 기계다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_admin_1",
    badge: "아드미니스트라툼 부조리",
    priority: 3,
    req: { anyCareers: ["administratum"] },
    text: "420년 전에 타이라니드에게 먹혀 사라진 행성으로 농기구 5만 대를 보내라는 칙령을 발견했다. 하지만 '전임 하이 로드의 서명은 취소할 수 없다'는 규정에 따라 올해도 수송선을 배정했다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_job_admin_2",
    badge: "서기관의 최후",
    priority: 3,
    req: { anyCareers: ["administratum"] },
    text: "옆 책상에서 50년째 십일조 영수증을 검수하던 노서기관이 펜을 쥔 채 조용히 숨을 거두었다. 주임 아뎁트는 시신을 치우기도 전에 그의 책상 위 미결 서류부터 나에게 넘겼다.",
    effect: { stats: { Int: 1 }, wounds: -2 }
  },
  {
    id: "ch_job_priest_1",
    badge: "에클레시아키 설교",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest"] },
    text: "광장에서 4시간 동안 '고통은 축복이며 가난은 영혼을 맑게 한다'고 열변을 토했다. 설교가 끝난 뒤 순금 향로와 고급 포도주가 담긴 추기경 마차에 올랐다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 3 }
  },
  {
    id: "ch_job_rogue_trader_1",
    badge: "로그 트레이더 항해",
    priority: 3,
    req: { anyCareers: ["rogue_trader"] },
    text: "제국 성도(星圖) 밖 미개척 행성에서 희귀 향신료와 고대 문명의 황금을 가득 싣고 귀환했다. 세관원이 의심스러운 눈초리를 보냈으나, 황제의 친필 무역 영장을 들이밀자 즉시 경례했다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_job_psyker_1",
    badge: "공인 사이커의 삶",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker"] },
    text: "지휘부 텐트 구석에서 워프의 메아리를 해석하는 동안, 등 뒤에 선 경호병은 내 관자놀이에서 라스건 총구를 한순간도 떼지 않았다. 그것이 제국이 사이커를 대접하는 방식이다.",
    effect: { stats: { WP: 1, Int: 1 }, corruption: 1 }
  },
  {
    id: "ch_job_cultist_1",
    badge: "암흑의 비밀 집회",
    priority: 3,
    req: { anyCareers: ["chaos_cultist"] },
    text: "폐기된 하수도 제단에서 촛불을 켜고 여덟 갈래 별을 그렸다. 배고픔과 채찍에 지친 하층 노동자들이 하나둘 거짓 황제를 저주하며 우리의 대열에 합류했다.",
    effect: { stats: { Fel: 1, WP: 1 }, corruption: 4 }
  },

  // =========================================================================
  // 4. 인류제국 보편적 인간경시 · 부조리 · 시대상 일상 로그 (행성 환경 엄격 일치!)
  // =========================================================================
  {
    id: "ch_absurd_corpse_starch",
    badge: "제국의 부조리",
    priority: 1,
    req: {
      minAge: 12,
      excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader", "magos"],
      or: [
        { anyWorldTags: ["hive", "industrial", "forge", "fortress", "voidborn", "terra", "krieg"] },
        { anyCareers: ["astra_militarum", "pdf_trooper", "menial_worker", "underhive_ganger"] }
      ]
    },
    text: "오늘 배급된 시체 녹말(Corpse-Starch) 통조림에서 묘하게 익숙한 금니 같은 것이 씹혔다. 아무것도 못 본 척 삼키는 것이 이 제국에서 장수하는 비결이다.",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  {
    id: "ch_absurd_petition",
    badge: "행정 부조리",
    priority: 1,
    req: {
      minAge: 14,
      anyWorldTags: ["hive", "civilised", "shrine", "agri", "terra", "fortress", "industrial"],
      excludeTags: ["astartes", "custodes", "heretic", "sororitas", "inquisitor", "rogue_trader", "magos"]
    },
    text: "아드미니스트라툼으로부터 우편이 도착했다. 190년 전 증조부가 제출한 '거주 구역 누수 수리 신청'이 서식 미비로 최종 기각되었다는 통보서였다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_absurd_propaganda",
    badge: "제국 선전",
    priority: 1,
    req: {
      minAge: 12,
      anyWorldTags: ["hive", "industrial", "civilised", "shrine", "fortress", "terra"],
      excludeTags: ["astartes", "custodes", "inquisitor"]
    },
    text: "거리의 확성기가 하루 18시간째 외치고 있다. '의심은 반역의 씨앗이다! 열린 마음은 성문이 열린 요새와 같다!' 반박하려던 취객은 아르비테스에게 끌려갔다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_absurd_noble_water",
    badge: "계급 부조리",
    priority: 1,
    req: {
      minAge: 12,
      anyWorldTags: ["hive", "industrial", "civilised", "terra"],
      excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader"]
    },
    text: "상층 첨탑 귀족 가문의 호화 사냥 축제를 위해 하층 4개 구역의 식수와 전력 공급이 사흘간 끊겼다. 항의 청원은 '이단적 불만 표출'로 분류되었다.",
    effect: { wounds: -3, faith: -2 }
  },
  {
    id: "ch_absurd_noble_banquet",
    badge: "상류층의 오만",
    priority: 2,
    req: {
      minAge: 16,
      anyTags: ["noble", "rogue_trader", "wealthy"],
      excludeTags: ["astartes", "custodes"],
      excludeWorlds: ["krieg", "catachan", "fenris", "baal"]
    },
    text: "수정 샹들리에 아래 만찬에서 한 자작이 '하층민들이 왜 매연 때문에 숨을 못 쉰다며 죽어 가는지 모르겠소, 필터를 좋은 걸로 바꾸면 될 텐데'라며 웃자 좌중이 박수를 쳤다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_absurd_pressgang",
    badge: "제국 해군 징발",
    priority: 1,
    req: {
      minAge: 15,
      anyWorldTags: ["hive", "industrial", "civilised", "voidborn", "terra"],
      excludeTags: ["noble", "astartes", "custodes", "inquisitor", "commissar", "magos"]
    },
    text: "해군 강제 징발단(Press-gang)이 선술집 골목을 통째로 봉쇄하고 손님 수십 명을 쇠사슬로 묶어 갔다. 다행히 뒷문으로 몸을 숨겨 평생 포탄 노예가 되는 신세는 면했다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_absurd_mutant_hunt",
    badge: "광신의 일상",
    priority: 1,
    req: {
      minAge: 12,
      anyWorldTags: ["hive", "civilised", "shrine", "agri", "terra"],
      excludeTags: ["astartes", "custodes", "heretic"]
    },
    text: "광장에서 피부가 유독 창백하고 키가 작다는 이유만으로 외지인 상인이 '돌연변이'로 몰려 화형당했다. 알고 보니 보이드본 선원이었지만 사제는 '황제께서 진위를 가리실 것'이라며 기도를 마쳤다.",
    effect: { faith: 2, stats: { WP: 1 } }
  },
  {
    id: "ch_absurd_saint_bone",
    badge: "국교의 사업",
    priority: 1,
    req: {
      minAge: 14,
      anyWorldTags: ["hive", "civilised", "shrine", "terra", "paradise"],
      excludeTags: ["astartes", "custodes", "heretic"]
    },
    text: "성당 앞 노점에서 '성자 드루수스의 78번째 손가락뼈' 성유물이 비싼 값에 팔리고 있었다. 손가락이 왜 78개냐고 묻는 사람은 아무도 없었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_world_krieg_2",
    badge: "크리그 속죄",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["krieg"] },
    text: "지하 병영의 배양실(Vitae-Womb) 구역에서 끝없는 신병 행렬이 배출되었다. 의무관은 부상병에게 치료제 대신 '다음 출격 때 앞줄에 서라'는 처방전을 건넸다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_world_catachan_2",
    badge: "카타찬 부조리",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["catachan"] },
    text: "외부 행성에서 부임한 새 커미사르가 밀림 야영지에서 제식 사열을 강요하다가 그날 밤 늪지 괴수에게 끌려가 '불의의 야생 사고'로 처리되었다. 아무도 슬퍼하지 않았다.",
    effect: { stats: { Ag: 1, WS: 1 } }
  },
  {
    id: "ch_world_baal_2",
    badge: "바알의 갈증",
    priority: 3,
    req: { minAge: 10, anyWorlds: ["baal"] },
    text: "유독성 모래폭풍을 피해 바위 동굴에 웅크린 채 피처럼 붉은 일몰을 지켜보았다. 물 한 모금을 두고 옆 부족과 칼을 겨누는 것이 바알의 평범한 하루다.",
    effect: { stats: { T: 1, WS: 1 }, wounds: -2 }
  },
  {
    id: "ch_world_fenris_2",
    badge: "펜리스 생존",
    priority: 3,
    req: { minAge: 10, anyWorlds: ["fenris"] },
    text: "유빙 위로 거대한 크라켄 촉수가 솟아올라 어선 세 척을 삼켰다. 살아남은 사내들은 그날 밤 뜯어낸 촉수 살을 불에 구워 먹으며 폭소했다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -2 }
  },
  {
    id: "ch_era_nihilus_1",
    badge: "임페리움 니힐루스",
    priority: 3,
    req: { allTags: ["imperial_nihilus"] },
    text: "아스트로노미칸의 등불이 완전히 사라진 밤하늘에 거대한 핏빛 균열만 타올랐다. 제국 본토의 구원 함대는 3년째 소식이 없고, 사방에서 약탈자 경보가 울렸다.",
    effect: { stats: { WP: 1 }, wounds: -3, corruption: 2 }
  },
  {
    id: "ch_era_rift_sanctus",
    badge: "인도미투스 시대",
    priority: 2,
    req: { minAge: 12, greatRift: true, excludeTags: ["imperial_nihilus", "heretic"] },
    text: "밤하늘 한쪽을 가로지르는 대균열의 보랏빛 잔광이 사라지지 않는다. 그래도 인도미투스 성전군의 승전보가 아스트로패스 망을 타고 들려와 희망의 불씨를 지폈다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_era_pre_rift",
    badge: "41번째 천년기 말",
    priority: 1,
    req: { minAge: 12, greatRift: false, excludeTags: ["astartes", "custodes", "heretic"] },
    text: "아스트로노미칸의 등불이 잠시 흔들렸다는 흉흉한 소문이 돌았다. 점성술사들은 '종말의 시간(Time of Ending)'이 다가오고 있다고 속삭였다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_trait_psyker_whispers",
    badge: "워프의 메아리",
    priority: 2,
    req: { minAge: 10, maxFaith: 64, allTags: ["psyker"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    text: "잠들기 직전 벽 너머에서 이름 모를 목소리들이 내 진짜 이름을 부르며 웃었다. 베개를 끌어안고 떨리는 목소리로 기도문을 외며 밤새 식은땀을 흘렸다.",
    effect: { stats: { WP: 1 }, corruption: 2 }
  },
  {
    id: "ch_trait_psyker_faithful",
    badge: "신앙의 정화",
    priority: 3,
    req: { minAge: 12, minFaith: 65, allTags: ["psyker"], excludeTags: ["astartes", "custodes", "grey_knight", "heretic"] },
    text: "밤의 정적을 뚫고 워프의 불경한 속삭임이 스며들었다. 흔들리지 않고 즉각 성수를 뿌리며 《렉티티오 디비니타투스》를 우렁차게 낭독하자 악마의 메아리가 불타 사라졌다.",
    effect: { stats: { WP: 2 }, faith: 3, corruption: -2 }
  },
  {
    id: "ch_trait_psyker_astartes",
    badge: "아스타르테스 정신 장벽",
    priority: 3,
    req: { allTags: ["astartes", "psyker"], excludeTags: ["grey_knight"] },
    text: "워프의 간악한 속삭임이 정신을 엿보려 들자, 챕터의 전투 함성을 내질러 정신 방벽을 세웠다. '그들은 공포를 알지 못하리라!' 악마의 잔향은 초인의 의지 앞에 산산조각 났다.",
    effect: { stats: { WP: 2, Int: 1 }, corruption: -3 }
  },
  {
    id: "ch_high_faith_defiance",
    badge: "불굴의 신앙",
    priority: 2,
    req: { minAge: 14, minFaith: 72, excludeTags: ["heretic", "astartes", "custodes"] },
    text: "불길한 악몽과 절망의 소문이 구역을 뒤덮었지만, 성상을 움켜쥐고 황제께 맹세를 되뇌자 두려움은 한 점도 남지 않았다. 신앙은 강철보다 단단한 방패다.",
    effect: { stats: { WP: 1 }, faith: 3, corruption: -3 }
  },
  {
    id: "ch_trait_blank_lonely",
    badge: "블랭크의 고독",
    priority: 2,
    req: { minAge: 10, allTags: ["blank"] },
    text: "식당에 들어서자 옆 테이블 손님들이 이유도 모른 채 구역질을 하며 자리를 옮겼다. 영혼 없는 자에게 제국의 온기는 언제나 멀기만 하다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_trait_navigator",
    badge: "제3의 눈",
    priority: 3,
    req: { minAge: 14, allTags: ["navigator"] },
    text: "이마의 비단 두건 아래 제3의 눈이 워프 조류에 반응해 욱신거렸다. 두건을 벗는 순간 평범한 하인은 시선만 마주쳐도 즉사하기에 늘 홀로 거처에 머물렀다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_trait_ratling",
    badge: "래틀링의 한 끼",
    priority: 3,
    req: { minAge: 14, allTags: ["ratling"] },
    text: "병참 창고에서 장교용 고급 훈제 햄과 향신료를 감쪽같이 빼돌려 푸짐한 야식을 차려 먹었다. 물론 보초 서던 오그린에게도 반쪽을 나눠 주었다.",
    effect: { wounds: 4, stats: { Ag: 1, Fel: 1 } }
  },
  {
    id: "ch_corruption_nightmare",
    badge: "오염의 징후",
    priority: 2,
    req: { minCorruption: 25, excludeTags: ["custodes", "grey_knight"] },
    text: "거울 속 내 눈동자에 순간적으로 기하학적인 보랏빛 문양이 번뜩인 듯했다. 깜짝 놀라 세수를 하고 성수를 뿌렸으나 묘한 쾌감이 손끝에 남았다.",
    effect: { corruption: 2, stats: { Int: 1 } }
  },
  {
    id: "ch_corruption_whisper_2",
    badge: "이단의 유혹",
    priority: 2,
    req: { minCorruption: 40, excludeTags: ["astartes", "custodes", "grey_knight"] },
    text: "성당 앞을 지나갈 때 향불 냄새가 역겹게 느껴지고 황제 성상이 거대한 해골로 보였다. 주변 사람들이 눈치채기 전에 서둘러 고개를 숙였다.",
    effect: { faith: -3, corruption: 2 }
  },
  {
    id: "ch_astartes_corruption",
    badge: "챕터의 금기",
    priority: 3,
    req: { minCorruption: 35, allTags: ["astartes"], excludeTags: ["grey_knight"] },
    text: "전투 서약 낭독 중 워프의 속삭임이 헬멧 복스 망을 긁고 지나갔다. 채플린의 해골 투구가 이쪽을 응시하는 시선을 느끼며 가까스로 감정을 억눌렀다.",
    effect: { faith: -3, corruption: 2 }
  },
  // ===== 초점별 맞춤 일상 로그 =====
  {
    id: "ch_focus_survival_care",
    badge: "생존 관리",
    priority: 2,
    req: { minAge: 14, anyFocus: ["survival"], excludeTags: ["astartes", "custodes", "inquisitor", "rogue_trader", "magos"] },
    text: "비상용 정수 정제와 붕대를 몰래 비축하고 틈틈이 몸을 단련했다. 이 끔찍한 은하에서 오래 살아남는 것 자체가 반역만큼이나 어려운 예술이다.",
    effect: { wounds: 4, stats: { T: 1 } }
  },
  {
    id: "ch_focus_combat_drill",
    badge: "전투 훈련",
    priority: 2,
    req: { minAge: 12, anyFocus: ["combat"], excludeTags: ["astartes", "custodes"] },
    text: "폐기된 사격장과 격투장에서 땀이 피처럼 흐를 때까지 방아쇠 당기기와 총검술을 반복했다. 방심한 자는 다음 해를 보지 못한다.",
    effect: { stats: { WS: 1, BS: 1 } }
  },
  {
    id: "ch_focus_faith_vigil",
    badge: "신앙의 철야",
    priority: 2,
    req: { minAge: 12, anyFocus: ["faith"], excludeTags: ["heretic", "astartes", "custodes"] },
    text: "차가운 돌바닥에 무릎을 꿇고 《렉티티오 디비니타투스》를 밤새 낭송했다. 무릎은 피멍이 들었지만 영혼을 갉아먹던 불안이 한결 가라앉았다.",
    effect: { faith: 4, corruption: -2, stats: { WP: 1 } }
  },
  {
    id: "ch_focus_lore_study",
    badge: "학문과 기계교리",
    priority: 2,
    req: { minAge: 12, anyFocus: ["lore"], excludeTags: ["astartes", "custodes"] },
    text: "먼지 쌓인 데이터 슬레이트와 낡은 전술 교범을 파고들었다. 다만 '지나친 호기심은 이단의 첫걸음'이라는 경고를 늘 마음에 새겨야 했다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_focus_politics_scheming",
    badge: "인맥과 출세",
    priority: 2,
    req: { minAge: 15, anyFocus: ["politics"], excludeTags: ["astartes", "custodes"], excludeWorlds: ["krieg"] },
    text: "상관의 취향을 파악해 희귀 아마섹 주와 고급 담배를 조용히 상납했다. 제국에서는 충성심 못지않게 줄을 잘 서는 기술이 목숨을 구한다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_focus_forbidden_study",
    badge: "금단의 탐구",
    priority: 2,
    req: { minAge: 15, anyFocus: ["forbidden"], excludeTags: ["custodes", "grey_knight"] },
    text: "이단심문소가 금서로 지정한 고대 성도(星圖)와 외계 문헌의 필사본을 촛불 아래서 해독했다. 문장을 이해할 때마다 머리가 깨질 듯 울리지만 금지된 통찰이 열렸다.",
    effect: { stats: { Int: 2 }, corruption: 4, faith: -3 }
  },
  // ===== 추가 행성·직업 부조리 & 생활사 =====
  {
    id: "ch_world_hive_elevator",
    badge: "하이브 일상",
    priority: 2,
    req: { minAge: 12, anyWorldTags: ["hive"], excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader", "magos", "lord_commissar", "canoness"] },
    text: "거대 화물 승강기 케이블이 끊어져 노동자 300명이 하층 심연으로 추락했다. 당국은 고장 안내문 대신 '기계령 모독에 대한 징벌'이라는 경고문을 붙였다.",
    effect: { stats: { Ag: 1 }, wounds: -2 }
  },
  {
    id: "ch_world_hive_sunlight",
    badge: "하이브 일상",
    priority: 2,
    req: { minAge: 14, anyWorldTags: ["hive"], excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader", "navy", "magos", "lord_commissar", "canoness"] },
    text: "평생 인공 황색 형광등 아래서만 살다 보니, 우연히 고장 난 환기창 너머로 스친 진짜 햇빛에 눈이 멀 뻔했다. 구역 주민들은 저 눈부신 불덩이를 불길해했다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_world_forge_servitor",
    badge: "포지 월드 부조리",
    priority: 3,
    req: { minAge: 14, anyWorldTags: ["forge"], excludeTags: ["astartes", "custodes"] },
    text: "성유 탱크에 이물질이 섞이자 테크프리스트가 청소반 10명을 무방비로 투입했다. 그중 4명은 다음 주부터 바퀴 달린 운반 서비터로 개조되어 공장에 복귀했다.",
    effect: { stats: { T: 1, Int: 1 }, wounds: -2 }
  },
  {
    id: "ch_world_civilised_curfew",
    badge: "제국 문명 행성",
    priority: 2,
    req: { minAge: 14, anyWorldTags: ["civilised"], excludeTags: ["astartes", "custodes"] },
    text: "행성 총독의 생일을 기념해 전 시민 의무 찬양 행진이 열렸다. 박수 소리가 작았던 구역장은 다음 날 십일조 탄광으로 발령 났다.",
    effect: { stats: { Fel: 1 } }
  },
  {
    id: "ch_world_death_predator",
    badge: "데스 월드 생존",
    priority: 2,
    req: { minAge: 14, anyWorldTags: ["death"], excludeTags: ["astartes", "custodes"] },
    text: "밤새 거처를 에워싼 괴수 무리의 울음소리 속에서 총과 칼을 쥔 채 뜬눈으로 버텼다. 동이 트자 살아남은 이웃들과 말없이 눈인사를 나누었다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -2 }
  },
  {
    id: "ch_job_guard_artillery",
    badge: "아스트라 밀리타룸",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "militarum_officer"] },
    text: "후방 바실리스크 자주포가 아군 참호 바로 30미터 앞에 포탄을 쏟아부었다. 무전병이 항의하자 포병대 장교는 '오차 범위 0.4% 이내, 제국 표준 합격'이라 답했다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: -4 }
  },
  {
    id: "ch_job_guard_krieg_shovel",
    badge: "데스 코어 오브 크리그",
    priority: 3,
    req: { anyCareers: ["astra_militarum"], anyWorlds: ["krieg"] },
    text: "참호 보강용 야전삽의 날을 면도날처럼 갈며 출격 명령을 기다렸다. 옆의 신병이 18세 생일이냐고 물었으나, 크리그 병사에게 나이란 그저 복무 효율 지표일 뿐이다.",
    effect: { stats: { WS: 1, T: 1 }, faith: 2 }
  },
  {
    id: "ch_job_astartes_serf",
    badge: "챕터의 일상",
    priority: 3,
    req: { anyCareers: ["astartes_scout", "astartes_brother", "astartes_captain"] },
    text: "전투가 끝난 뒤 챕터 서프들이 볼터 탄흔이 박힌 세라마이트 갑주를 경건하게 수리하고 성유를 발랐다. 그들은 수십 년 뒤 늙어 죽겠지만, 이 갑주와 나는 수백 년을 더 싸우리라.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_job_inquisition_paranoia",
    badge: "심문관의 의심",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte", "inquisitor"] },
    text: "밀고자 세 명의 진술이 서로 어긋난다. 한 명은 진실이고 두 명은 컬트의 역정보일 터. 잠들기 전에도 문고리에 와이어를 걸고 베개 밑에 라스 피스톨을 두었다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_job_sororitas_hymn",
    badge: "순교자의 노래",
    priority: 3,
    req: { anyCareers: ["adepta_sororitas", "canoness"] },
    text: "이단자들의 요새를 불태운 재 위에서 전사한 자매들의 이름을 한 명씩 호명했다. 슬픔 대신 '황제의 곁으로 먼저 돌아간 축복'을 찬미하며 볼터 탄창을 채웠다.",
    effect: { faith: 4, stats: { WP: 1 } }
  },
  {
    id: "ch_job_rogue_trader_court",
    badge: "무역 영장의 권세",
    priority: 3,
    req: { anyCareers: ["rogue_trader"] },
    text: "함선 브리지에 진열된 외계 수정과 고대 테라 회화를 둘러보며 다음 개척 성계를 골랐다. 변방 총독 셋이 서로 내 함대의 기항을 청원하며 금괴를 보내왔다.",
    effect: { stats: { Inf: 2 } }
  },
  {
    id: "ch_job_mechanicus_noosphere",
    badge: "누스피어 접속",
    priority: 3,
    req: { anyCareers: ["skitarii", "tech_priest", "archmagos"] },
    text: "누스피어(기계교 정보망)에 접속해 1초 만에 4,000페이지 분량의 용광로 출력 보고서를 내려받았다. 입으로 말하는 필멸자들의 대화가 너무 느려 답답하기 짝이 없었다.",
    effect: { stats: { Int: 2, Fel: -1 } }
  },

  // =========================================================================
  // 5. 직종 내 계급(Tier)별 차별화 일상 로그 (신참 vs 중간 vs 최고위)
  // =========================================================================
  {
    id: "ch_rank_scout_1",
    badge: "네오파이트 수련",
    priority: 3,
    req: { anyCareers: ["astartes_scout"] },
    text: "파워 아머를 입은 선배 배틀 브라더들의 행진을 경외의 눈으로 바라보며 카라페이스 갑옷 끈을 조였다. 스카웃 병장은 '살아남아 검은 갑각을 증명하라'며 야간 독도법 행군을 명했다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_rank_scout_2",
    badge: "네오파이트 복종",
    priority: 3,
    req: { anyCareers: ["astartes_scout"] },
    text: "전술 회의에서 의견을 내려다 베테랑 병장에게 제지당했다. 아직 10중대 신참 네오파이트에게 허락된 권한은 질문이 아니라 침묵 속의 정찰과 복종뿐이다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_rank_brother_1",
    badge: "배틀 브라더 강습",
    priority: 3,
    req: { anyCareers: ["astartes_brother"] },
    text: "드롭 포드 안전벨트가 잠기고 대기권 마찰열이 선체를 붉게 달궜다. 형제들과 함께 챕터의 전투 함성을 합창하며 적진 한가운데로 수직 강하했다.",
    effect: { stats: { WS: 1, WP: 1 } }
  },
  {
    id: "ch_rank_captain_1",
    badge: "중대장의 위엄",
    priority: 3,
    req: { anyCareers: ["astartes_captain"] },
    text: "타격 순양함 함교에 들어서자 제국 해군 제독과 행성 총독이 일제히 고개를 숙였다. 100명 스페이스 마린 중대의 출격 여부가 성계 하나의 생사를 가른다.",
    effect: { stats: { Inf: 2, Int: 1 } }
  },
  {
    id: "ch_rank_captain_2",
    badge: "챕터 평의회",
    priority: 3,
    req: { anyCareers: ["astartes_captain"] },
    text: "요새 수도원 원탁에서 챕터 마스터 및 타 중대장들과 다음 세기의 성전 항로를 논의했다. 전사한 형제들의 진시드 회수 보고서를 읽으며 묵념을 올렸다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_rank_custodes_2",
    badge: "황궁의 철학자",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes"] },
    text: "무술 대련 직후 황궁 고문서고에서 3만 년 전 고대 테라의 정치철학을 탐독했다. 쿠스토데스는 단순한 병사가 아니라 황제의 유일한 대화 상대이자 철인 전사다.",
    effect: { stats: { Int: 2, WP: 1 } }
  },
  {
    id: "ch_rank_custodes_3",
    badge: "그림자 감방 순찰",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes"] },
    text: "황궁 지하 깊은 곳, 말로 옮길 수 없는 고대 괴물과 아키오테크 재앙들이 봉인된 '어둠의 감방(Dark Cells)'의 봉인 상태를 점검했다. 단 하나의 문만 열려도 테라가 멸망한다.",
    effect: { stats: { WP: 2, WS: 1 } }
  },
  {
    id: "ch_rank_skitarii_1",
    badge: "스키타리 전파 행군",
    priority: 3,
    req: { anyCareers: ["skitarii"] },
    text: "방사능 먼지 폭풍 속을 72시간 쉬지 않고 행군했다. 피로 신호가 뇌에 닿자 마고스의 원격 패치가 즉각 통증 회로를 차단했다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_rank_archmagos_1",
    badge: "아크마고스의 연산",
    priority: 3,
    req: { anyCareers: ["archmagos"] },
    text: "포지 월드 6개 대륙의 티탄 주조 일정을 0.04% 최적화하기 위해 노동자 교대 시간을 18시간으로 늘리는 칙령을 이진법으로 송출했다. 효율은 곧 옴니시아의 찬미다.",
    effect: { stats: { Int: 2, Inf: 2 } }
  },
  {
    id: "ch_rank_acolyte_1",
    badge: "어콜라이트의 긴장",
    priority: 3,
    req: { anyCareers: ["inquisition_acolyte"] },
    text: "스승 이단심문관에게 암호 보고를 올린 뒤 은신처 침대 밑에 위조 신분증 3개와 비상용 멜타 폭탄을 점검했다. 어콜라이트에게 안락한 노후 따윈 존재하지 않는다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_rank_lord_commissar_1",
    badge: "로드 커미사르의 사열",
    priority: 3,
    req: { anyCareers: ["lord_commissar"] },
    text: "전구 사령부 사열대에 오르자 5개 연대 병사들은 물론 콧대 높은 귀족 장군들까지 옷깃을 여미며 부동자세를 취했다. 전설이 된 검은 제복의 무게가 어깨에 실렸다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_rank_canoness_1",
    badge: "캐노네스의 지휘",
    priority: 3,
    req: { anyCareers: ["canoness"] },
    text: "수녀원 본당에서 성유물함을 봉인하고 수백 명의 전투 수녀들에게 출정 축복을 내렸다. 캐노네스의 기도는 한 분대가 아니라 행성 전체의 신앙을 불태운다.",
    effect: { stats: { Inf: 2, WP: 1 }, faith: 5 }
  },
  {
    id: "ch_rank_scion_1",
    badge: "사이온의 냉혈",
    priority: 3,
    req: { anyCareers: ["tempestus_scion"] },
    text: "일반 가드맨들이 공포에 떠는 전장에서도 심박수 64를 유지하며 핫샷 라스건 조준경을 닦았다. 스콜라의 극한 훈련은 공포라는 감정 자체를 깎아 냈다.",
    effect: { stats: { BS: 1, WP: 1 } }
  }
];
