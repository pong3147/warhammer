// 일상 연대기 — 유아기(1~5세) · 아동기(6~13세) 전 23개 행성 및 신분별 성장 기록
export default [
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
    text: "지하 벙커에서 자라며 태어나서 한 번도 푸른 하늘이나 풀잎을 본 적이 없다. 오직 황제를 위한 전사만이 유일한 꿈으로 교육받았다.",
    effect: { stats: { T: 1 }, faith: 2 }
  },
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
    req: { minAge: 6, maxAge: 15, anyCareers: ["child"], allTags: ["schola"] },
    text: "드릴-애벗의 강철 지팡이 아래 새벽 4시 기상, 10킬로미터 구보, 이단자 색출 토론이 끝없이 반복되었다. 눈물을 보인 급우는 하루 종일 무릎을 꿇었다.",
    effect: { stats: { WP: 1, WS: 1 }, faith: 3, wounds: -2 }
  },
  {
    id: "ch_kid_noble_infant",
    badge: "상류 가문 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, or: [{ allTags: ["noble"] }, { anyWorldTags: ["paradise"] }], excludeRealms: ["void"], excludeWorlds: ["krieg", "voidborn"], excludeHomeWorlds: ["krieg", "voidborn"] },
    text: "향기로운 정원과 전담 유모, 개인 메디카에 의사의 보살핌 속에 자랐다. 하층 구역의 기근과 매연은 창밖 저 아래 먼 세계의 일이었다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_kid_noble",
    badge: "상층 첨탑 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, allTags: ["noble"], excludeRealms: ["void"], excludeWorlds: ["krieg", "voidborn"], excludeHomeWorlds: ["krieg", "voidborn"], excludeWorldTags: ["paradise"] },
    text: "오염 구름 위 수정 온실에서 재배한 진짜 사과를 맛보았다. 가정교사는 하층민의 숫자는 통계일 뿐 인간의 수로 치지 말라고 가르쳤다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
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
  {
    id: "ch_kid_infant_1",
    badge: "제국 유아기",
    priority: 1,
    req: {
      minAge: 1,
      maxAge: 5,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars"],
      excludeTags: ["schola", "mutant_sanctioned", "abhuman"]
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
      excludeHomeWorlds: ["krieg"],
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
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
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
  {
    id: "ch_terra_ex_10",
    badge: "테라 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["terra"], excludeTags: ["noble", "schola"] },
    text: "황궁 성벽이 아득히 보이는 옥상 틈새에서 끝없는 순례 행렬과 향불 연기를 바라보며 자랐다. 테라에서 흙을 밟아 본 아이는 아무도 없었다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_necro_ex_3",
    badge: "네크로문다 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["necromunda"], excludeTags: ["noble", "schola"] },
    text: "폐기된 화학 파이프 사이를 뛰어다니며 언더하이브 지름길을 외웠다. 길 하나 잘못 들면 두 번 다시 돌아오지 못한다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_baal_inf_1",
    badge: "바알 사막 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["baal"] },
    text: "붉은 모래 언덕 너머로 두 위성 바알 프리무스와 세쿤두스가 떠오르는 밤, 부족의 장로가 아기 손바닥에 마른 붉은 흙을 묻혀 사막의 가호를 빌었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_baal_inf_2",
    badge: "바알 사막 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["baal"] },
    text: "방사능이 덜한 지하 암반 웅덩이에서 길어 온 물로 입술을 축였다. 바알의 아이들은 울음소리마저 수분을 아끼기 위해 일찍 그치는 법을 배운다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_baal_inf_3",
    badge: "바알 사막 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["baal"] },
    text: "하늘 높이 은빛 궤적을 그리며 지나가는 블러드 엔젤의 썬더호크를 올려다보며, 부족민들이 일제히 천사의 날개 문양을 가슴에 그렸다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_s8_kid_baal_ch_1",
    badge: "바알 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["baal"] },
    text: "녹슨 철판으로 만든 모래 썰매를 타고 모래폭풍을 피해 이동했다. 낡은 방사선 측정기의 딸깍거리는 소리가 빠를수록 발걸음을 재촉해야 했다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_baal_ch_2",
    badge: "바알 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["baal"] },
    text: "사막 천막 안 모닥불 가에서 낡은 돌조각에 날개 달린 전사의 형상을 새겼다. 언젠가 천사들의 시험장에 서겠다는 꿈이 척박한 하루를 버티게 했다.",
    effect: { stats: { WP: 1, WS: 1 } }
  },
  {
    id: "ch_s8_kid_catachan_inf_1",
    badge: "카타찬 밀림 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["catachan"] },
    text: "고압 전기 울타리가 사방을 두른 전초 기지 막사에서 비명 같은 밀림 짐승 소리를 배경 삼아 잠들었다. 창문 밖 덩굴은 하룻밤 사이에도 철조망을 감아 올랐다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_catachan_inf_2",
    badge: "카타찬 밀림 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["catachan"] },
    text: "독성 포자가 날리는 장마철마다 방충 연기가 자욱한 막사 안에서 자랐다. 기어 다니던 바닥에서 작은 산성 딱정벌레를 피하는 반사 신경이 저절로 붙었다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_s8_kid_catachan_inf_3",
    badge: "카타찬 밀림 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["catachan"] },
    text: "어른들이 나무를 깎아 만든 뭉툭한 정글 칼 모형을 장난감 대신 손에 쥐여 주었다. 카타찬에서는 칼자루 쥐는 법이 글자보다 먼저다.",
    effect: { stats: { WS: 1 } }
  },
  {
    id: "ch_s8_kid_catachan_ch_1",
    badge: "카타찬 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["catachan"] },
    text: "기지 외곽 늪지대에서 식인 덩굴과 먹을 수 있는 뿌리 식물을 구분하는 생존 실습을 치렀다. 실수 한 번이 곧 장례로 이어지는 엄혹한 수업이었다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_catachan_ch_2",
    badge: "카타찬 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["catachan"] },
    text: "폭우가 쏟아지는 밤, 기지 방벽에 기어오른 맹독 도마뱀을 횃불로 몰아내는 어른들 옆에서 탄약 상자를 날랐다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_s8_kid_catachan_ch_3",
    badge: "카타찬 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["catachan"] },
    text: "진흙을 얼굴에 바르고 밀림 수풀 속에 한 시간 동안 숨어 있는 은신 놀이를 했다. 숨소리조차 들키지 않는 법이 몸에 배었다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_s8_kid_nocturne_inf_1",
    badge: "녹턴 성소 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["nocturne"] },
    text: "높은 중력과 뜨거운 화산 바람 속에서도 성소 도시의 두꺼운 현무암 지붕은 따뜻하고 단단했다. 마을 대장장이들이 망치 소리로 새 생명의 탄생을 축복했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_nocturne_inf_2",
    badge: "녹턴 성소 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["nocturne"] },
    text: "위성 프로메테우스가 하늘을 가로지르며 대지가 미세하게 흔들릴 때마다, 마을 어른들이 아이들을 지하 화산 대피소로 신속히 이끌었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_nocturne_inf_3",
    badge: "녹턴 성소 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["nocturne"] },
    text: "불칸의 자비로운 가르침을 읊는 성소 사제의 축복 아래 이마에 붉은 재 문양을 받았다. 녹턴에서는 누구도 홀로 버려지지 않는다고 어른들은 말했다.",
    effect: { stats: { Fel: 1 }, faith: 2 }
  },
  {
    id: "ch_s8_kid_nocturne_ch_1",
    badge: "녹턴 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["nocturne"] },
    text: "대장간 풀무를 당기고 식은 쇳덩이를 두드리며 인내와 정밀함을 배웠다. 뜨거운 불꽃 앞에서도 서두르지 않는 마음가짐이 프로메테우스 교리의 시작이었다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s8_kid_nocturne_ch_2",
    badge: "녹턴 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["nocturne"] },
    text: "성소 성벽 너머 용암 계곡을 바라보며, 거대한 불도마뱀 샐러맨더를 사냥했던 불칸의 전설을 또래들과 함께 들었다.",
    effect: { stats: { WP: 1, WS: 1 } }
  },
  {
    id: "ch_s8_kid_nocturne_ch_3",
    badge: "녹턴 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["nocturne"] },
    text: "지진 경보가 울린 날, 어린 동생과 노인들의 손을 잡고 대피소로 안내하며 공동체를 지키는 긍지를 배웠다.",
    effect: { stats: { Fel: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_feral_inf_1",
    badge: "변방 야만 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["feral"] },
    text: "짐승 가죽으로 엮은 움막 안에서 모닥불 연기를 마시며 자랐다. 바깥 어둠 속 늑대 울음소리가 그칠 때까지 누구도 문턱을 넘지 않았다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_feral_inf_2",
    badge: "변방 야만 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["feral"] },
    text: "계절이 바뀔 때마다 부족 전체가 짐을 꾸려 이동했다. 어린 나이에도 긴 행군과 추위 속에서 울지 않고 버티는 법을 익혔다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_feral_inf_3",
    badge: "변방 야만 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["feral"] },
    text: "하늘에서 떨어진 정체불명의 금속 파편(추락한 제국 포드 조각)을 부족이 성물로 모시는 모습을 보며, 별 너머 거대한 신의 존재를 어렴풋이 느꼈다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_s8_kid_feral_ch_1",
    badge: "변방 부족 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["feral"] },
    text: "부싯돌을 쳐 불을 피우고 뼈 바늘로 가죽 옷을 깁는 법을 배웠다. 변방 대륙에서는 제 손으로 살아남지 못하면 겨울을 넘길 수 없다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s8_kid_feral_ch_2",
    badge: "변방 부족 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["feral"] },
    text: "부족 전사들의 모의 창술 대련에 끼어 멍이 들도록 구르고 또 일어났다. 흉터는 부끄러움이 아니라 용기의 증표였다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_feral_ch_3",
    badge: "변방 부족 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["feral"] },
    text: "계곡 바위 틈새에서 야생 약초를 캐고 산짐승의 발자국을 읽는 법을 익혔다. 밤눈과 청력이 또래보다 유난히 밝아졌다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_s8_kid_void_inf_1",
    badge: "함선 선실 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["voidborn"] },
    text: "재활용 산소 환기구에서 풍기는 오존과 기계유 냄새 속에서 첫걸음을 뗐다. 중력 발전기가 살짝 흔들릴 때마다 벽면 손잡이를 잡는 본능이 자랐다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_s8_kid_void_inf_2",
    badge: "함선 선실 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, or: [{ anyWorlds: ["voidborn"] }, { allTags: ["rogue_trader_blood"] }] },
    text: "워프 항해 경보가 울리자 선실의 모든 방폭 셔터가 닫혔다. 어른들은 아이가 이상한 꿈을 꾸지 않도록 황제의 순결 인장을 요람에 걸어 두었다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s8_kid_void_inf_3",
    badge: "함선 선실 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["voidborn"] },
    text: "수 세대째 이 거대 성간선을 떠나 본 적 없는 갑판 공동체 안에서 함내 방언과 비상 경보음의 음높이를 먼저 구별하게 되었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s8_kid_void_ch_1",
    badge: "함선 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, or: [{ anyWorlds: ["voidborn"] }, { allTags: ["rogue_trader_blood"] }] },
    text: "어두운 화물 갑판의 관측창 너머로 끝없이 펼쳐진 은하 성운을 바라보았다. 행성 표면의 흙보다 별빛과 강철 갑판이 훨씬 친숙했다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s8_kid_void_ch_2",
    badge: "함선 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["voidborn"] },
    text: "압력 밸브 점검과 비상 방호 마스크 착용 훈련을 게임처럼 반복했다. 갑판에서는 10초 늦게 마스크를 쓰면 그대로 숨이 멎는다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_void_ch_3",
    badge: "함선 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, maxSocialTier: "common", anyWorlds: ["voidborn"] },
    text: "함내 장터에서 고철 부품과 합성 배급표를 물물교환하며 선원들 특유의 눈치와 흥정 요령을 익혔다.",
    effect: { stats: { Fel: 1, Int: 1 } }
  },
  {
    id: "ch_s8_kid_forge_inf_3",
    badge: "포지 보육 구역",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["forge", "mechanicus"] },
    text: "황동 보육 파이프에서 흘러나오는 따뜻한 합성 영양액을 받아 마시며 자랐다. 보육 구획 천장에는 톱니바퀴 해골 문양이 붉게 빛나고 있었다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_forge_inf_4",
    badge: "포지 보육 구역",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["forge", "mechanicus"] },
    text: "유독성 철가루를 거르는 미세 여과 마스크를 씌운 채 첫 보행 검사를 통과했다. 코기타토르가 '노동 적성 양호' 코드를 출력했다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s8_kid_forge_ch_1",
    badge: "포지 월드 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["forge", "mechanicus"] },
    text: "견습 조립 라인에서 나사와 전선을 규격별로 분류하며 기초 이진법 숫자를 암기했다. 실수한 아이는 기계교 감독관의 전기 채찍을 맞았다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_s8_kid_forge_ch_2",
    badge: "포지 월드 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["forge", "mechanicus"] },
    text: "거대한 공성 전차와 스키타리 행렬이 붉은 연무 속을 행진하는 장관을 목격했다. 강철의 위엄에 가슴이 떨렸다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_s8_kid_forge_ch_3",
    badge: "포지 월드 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["forge", "mechanicus"] },
    text: "폐기 부품 창고에서 고장 난 조명 램프를 성유와 배선으로 직접 고쳐 냈다. 작은 기계령이 다시 빛을 낼 때 묘한 경외감이 들었다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_inf_3",
    badge: "크리그 배양실",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["krieg"] },
    text: "비타-움 생체 배양 구획에서 기초 심폐 내구 검사를 통과했다. 기준치에 미달한 개체들의 배양 캡슐은 말없이 소독 처리되었다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_inf_4",
    badge: "크리그 지하 보육",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["krieg"] },
    text: "지하 벙커의 차가운 금속 침상에서 일렬로 정렬해 기상 나팔에 맞춰 눈을 떴다. 감정은 불필요한 사치이자 속죄의 방해물로 규정되었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_ch_3",
    badge: "크리그 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["krieg"] },
    text: "유소년 훈련 구역의 모의 방사능 참호에서 무거운 철제 야전 삽으로 4시간 동안 참호를 파냈다. 손바닥 물집이 터져도 누구도 멈추지 않았다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_ch_4",
    badge: "크리그 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["krieg"] },
    text: "교관이 500년 전 크리그 반역의 참상을 강론하며 외쳤다. '살아 있는 것 자체가 죄다. 오직 전장의 죽음만이 황제의 용서를 산다.'",
    effect: { stats: { WP: 1, BS: 1 }, faith: 2 }
  },
  {
    id: "ch_s8_kid_paradise_inf_1",
    badge: "낙원 행성 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["paradise"] },
    text: "오염 없는 푸른 바다 바람과 하얀 대리석 테라스 아래서 자랐다. 은하계 대부분이 매연과 전쟁터라는 사실은 어른들의 먼 옛날이야기 같았다.",
    effect: { stats: { Fel: 1 } }
  },
  {
    id: "ch_s8_kid_paradise_inf_2",
    badge: "낙원 행성 요람",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorldTags: ["paradise"] },
    text: "생태 보존 구역의 청정한 공기와 정제된 식수 덕분에 별다른 잔병치레 없이 건강하게 성장했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_paradise_ch_1",
    badge: "낙원 행성 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["paradise"] },
    text: "총독부 귀빈들의 별장이 늘어선 해안가를 오가며 격식 있는 인사법과 하이 고딕 예절을 익혔다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_s8_kid_paradise_ch_2",
    badge: "낙원 행성 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["paradise"] },
    text: "행성 궤도 방어 정거장의 빛을 올려다보며, 이 아름다운 낙원조차 황제의 함대가 지켜 주지 않으면 하루아침에 불탄다는 사실을 배웠다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s8_kid_paradise_ch_3",
    badge: "낙원 행성 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorldTags: ["paradise"] },
    text: "보존 숲을 거닐며 귀족 자제들의 사냥 행렬과 의장대의 정교한 행진을 구경했다. 품위와 질서가 몸에 스며들었다.",
    effect: { stats: { Fel: 1, Ag: 1 } }
  },
  {
    id: "ch_s8_kid_std_inf_1",
    badge: "제국 유아기",
    priority: 2,
    req: {
      minAge: 1,
      maxAge: 5,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars"]
    },
    text: "동네 광장 확성기에서 매일 정오마다 울리는 황제 찬송가와 승전 방송을 들으며 옹알이를 뗐다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_s8_kid_std_inf_2",
    badge: "제국 유아기",
    priority: 2,
    req: {
      minAge: 1,
      maxAge: 5,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars"]
    },
    text: "구역 메디카에 진료소에서 표준 예방 접종과 유전자 순수성 검사를 마쳤다. 낡은 주사기 자국이 팔뚝에 또렷이 남았다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_std_ch_1",
    badge: "제국 유년기",
    priority: 2,
    req: {
      minAge: 6,
      maxAge: 13,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars", "terra", "voidborn"]
    },
    text: "행성 방위군 퍼레이드가 대로를 행진하는 날, 깃발을 흔들며 리만 러스 전차의 캐터필러 굉음에 눈을 떼지 못했다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_s8_kid_std_ch_2",
    badge: "제국 유년기",
    priority: 2,
    req: {
      minAge: 6,
      maxAge: 13,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars", "voidborn"]
    },
    text: "교구 성당의 스테인드글라스 아래에서 황제께서 호루스의 반역을 물리치신 성화를 올려다보며 기초 고딕 문자와 산수를 익혔다.",
    effect: { stats: { Int: 1 }, faith: 2 }
  },
  {
    id: "ch_s8_kid_std_ch_3",
    badge: "제국 유년기",
    priority: 2,
    req: {
      minAge: 6,
      maxAge: 13,
      maxSocialTier: "common",
      excludeRealms: ["cloistered", "void"],
      anyWorldTags: ["hive", "industrial", "civilised", "agri", "shrine", "terra", "fortress", "forest"],
      excludeWorlds: ["krieg", "mars", "voidborn"]
    },
    text: "구역 순찰을 도는 아뎁투스 아르비테스 치안관의 검은 갑주와 쇼크 마울을 보고, 제국법을 어기는 자에게 자비가 없음을 어린 마음에도 깨달았다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_s8_kid_univ_1",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 1, maxAge: 7, maxSocialTier: "common", excludeRealms: ["cloistered"], excludeWorlds: ["krieg"], excludeWorldTags: ["feral"] },
    text: "배급 통조림 뚜껑과 버려진 황동 볼트로 아퀼라 쌍두독수리 모양을 흉내 내어 늘어놓으며 놀았다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_s8_kid_univ_2",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 1, maxAge: 7, maxSocialTier: "common", excludeRealms: ["cloistered", "void"], excludeWorlds: ["krieg", "voidborn"] },
    text: "어둠이 깊게 내린 밤, 타닥거리는 등불과 화톳불 곁에서 하늘의 황제가 악귀를 물리치는 전승을 들으며 잠들었다.",
    effect: { faith: 1, stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_univ_3",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 1, maxAge: 8, maxSocialTier: "common", excludeRealms: ["cloistered", "void"], excludeWorlds: ["krieg", "voidborn"], excludeWorldTags: ["feral"] },
    text: "구역 광장에 날아든 낡은 서보-스컬이 윙윙거리며 인구조사 빛을 비출 때, 호기심에 뒤를 따라다니다가 호통을 들었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s8_kid_univ_4",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 1, maxAge: 8, excludeRealms: ["void"], excludeWorlds: ["krieg", "voidborn"] },
    text: "계절이 바뀔 때마다 몰아치는 악천후와 열병을 앓고 일어난 뒤, 한 뼘 더 단단해진 체력을 얻었다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s8_kid_univ_5",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 2, maxAge: 8, maxSocialTier: "common", excludeRealms: ["cloistered", "void"], excludeWorlds: ["krieg", "voidborn"], excludeWorldTags: ["feral"] },
    text: "장터 구석에서 노병이 들려주는 머나먼 성전의 영웅담에 귀를 쫑긋 세우며 나무 막대를 라스건처럼 겨눴다.",
    effect: { stats: { BS: 1 } }
  },
  {
    id: "ch_s8_kid_univ_6",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 2, maxAge: 9, maxSocialTier: "common", excludeRealms: ["cloistered", "void"], excludeWorlds: ["krieg", "voidborn"] },
    text: "또래 아이들과 구역과 골목을 뛰어다니며 숨바꼭질과 술래잡기를 반복해 좁은 길을 빠져나가는 감각을 익혔다.",
    effect: { stats: { Ag: 1, Fel: 1 } }
  },
  {
    id: "ch_s8_kid_univ_7",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 3, maxAge: 10, maxSocialTier: "common", excludeRealms: ["cloistered"], excludeWorlds: ["krieg"], excludeWorldTags: ["feral"] },
    text: "배급소에 줄을 선 어른들 사이에서 빈 양철 식기를 지키며, 인류제국에서는 몫을 스스로 챙겨야 한다는 이치를 배웠다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s8_kid_univ_8",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 4, maxAge: 11, maxSocialTier: "common", excludeRealms: ["cloistered"], excludeWorlds: ["krieg"], excludeWorldTags: ["feral"] },
    text: "오래된 로우 고딕 낱말 판에 분필로 황제의 십계와 숫자를 반복해 받아 적으며 글을 읽는 즐거움을 깨우쳤다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s8_kid_univ_9",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 4, maxAge: 12, maxSocialTier: "common", excludeRealms: ["cloistered", "void"], excludeWorlds: ["krieg", "voidborn"], excludeWorldTags: ["feral"] },
    text: "구역의 작은 신당 앞에서 촛불을 켜고 순례 행렬이 지나가는 모습을 지켜보며 경외심을 키웠다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_s8_kid_univ_10",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 5, maxAge: 12, maxSocialTier: "common", excludeRealms: ["cloistered"], excludeWorlds: ["krieg"] },
    text: "또래들과의 거친 힘겨루기에서 밀리지 않으려 몽둥이 막기와 주먹 쥐는 법을 스스로 터득했다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s8_kid_univ_11",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 5, maxAge: 13, maxSocialTier: "common", excludeRealms: ["cloistered"], excludeWorlds: ["krieg"], excludeWorldTags: ["feral"] },
    text: "고장 난 조명등과 물펌프를 고치는 수리공의 손놀림을 어깨너머로 지켜보며 간단한 기계 구조를 이해했다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_s8_kid_univ_12",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 6, maxAge: 13, excludeRealms: ["void"], excludeWorlds: ["krieg"] },
    text: "밤하늘을 가로지르는 성간 함선의 붉은 별빛을 올려다보며, 하늘 너머 황제의 영토가 얼마나 광활할지 상상했다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_univ_13",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 7, maxAge: 13, maxSocialTier: "common", excludeRealms: ["cloistered"], excludeWorlds: ["krieg"] },
    text: "심부름을 도맡아 어른들 사이를 오가면서, 상대의 안색을 읽고 부탁을 성사시키는 요령을 익혔다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_s8_kid_univ_14",
    badge: "제국 유년기",
    priority: 2,
    req: { minAge: 7, maxAge: 13, maxSocialTier: "common", excludeRealms: ["cloistered", "void"], excludeWorlds: ["krieg"], excludeWorldTags: ["feral"] },
    text: "구역 경비대의 낡은 모의 사격판 앞에서 돌팔매와 새총으로 표적을 맞히며 거리 감각을 길렀다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_s8_kid_feral_extra_1",
    badge: "야만 행성 유년기",
    priority: 3,
    req: { minAge: 1, maxAge: 8, anyWorldTags: ["feral"] },
    text: "사냥꾼들이 다듬고 남은 뼈 조각과 부싯돌을 모으며 짐승 발자국을 구별하는 눈썰미를 길렀다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_s8_kid_feral_extra_2",
    badge: "야만 행성 유년기",
    priority: 3,
    req: { minAge: 4, maxAge: 13, anyWorldTags: ["feral"] },
    text: "거센 비바람 속에서 젖은 장작에 불을 피우고 돌팔매로 작은 들짐승을 맞히는 생존술을 익혔다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_extra_1",
    badge: "크리그 배양기",
    priority: 3,
    req: { minAge: 1, maxAge: 7, anyWorlds: ["krieg"] },
    text: "지하 배양동 복도의 비상등이 주기적으로 점멸하는 리듬에 맞춰 보행 교정 훈련을 수행했다. 낙오자는 즉시 재교육실로 이동된다.",
    effect: { stats: { T: 1, Ag: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_extra_2",
    badge: "크리그 배양기",
    priority: 3,
    req: { minAge: 2, maxAge: 8, anyWorlds: ["krieg"] },
    text: "배식 벨이 울리면 60초 안에 영양 페이스트를 비우고 식판을 정렬하는 규율을 몸에 새겼다. 불평은 허용되지 않는다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_extra_3",
    badge: "크리그 훈련동",
    priority: 3,
    req: { minAge: 5, maxAge: 13, anyWorlds: ["krieg"] },
    text: "방독면 정화 필터를 눈을 감고 20초 내에 교체하는 실습에서 분대 상위권 기록을 세웠다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_s8_kid_krieg_extra_4",
    badge: "크리그 훈련동",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["krieg"] },
    text: "강당 확성기에서 500년 내전의 죄과와 데스 코어 오브 크리그의 속죄 서약이 울려 퍼졌다. 모든 유년 개체가 한목소리로 복창했다.",
    effect: { faith: 2, stats: { WP: 1 } }
  },
  {
    id: "ch_kid_knight_infant_1",
    badge: "기사 행성 유아기",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["generic_knight"] },
    text: "석조 성채 밖 들판을 거대한 퀘스토리스 나이트 순찰대가 지나갈 때마다 요람이 쿵쿵 울렸다. 둔중한 강철 발소리와 멀리서 울리는 전장의 뿔피리 소리를 들으며 옹알이를 뗐다.",
    effect: { stats: { T: 1, WP: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Knight World"
  },
  {
    id: "ch_kid_knight_infant_2",
    badge: "기사 행성 유아기",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["generic_knight"] },
    text: "문장 깃발이 나부끼는 성채 안뜰에서 붉은 로브의 사크리스탄 수행원들이 황동 향로를 들고 지나가는 행렬을 바라보았다. 매캐한 성유와 기계 향기가 어릴 적부터 코끝에 배었다.",
    effect: { faith: 2, stats: { Int: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Sacristan"
  },
  {
    id: "ch_kid_knight_infant_3",
    badge: "기사 행성 유아기",
    priority: 3,
    req: { minAge: 1, maxAge: 5, anyWorlds: ["generic_knight"] },
    text: "돌바닥 마당에 나무로 깎은 기사 인형과 채색 방패 조각을 늘어놓고 놀았다. 음유시인이 들려주는 옛 기사와 거대 괴수 사냥 이야기를 들으며 첫 걸음마를 뗐다.",
    effect: { stats: { Fel: 1, WS: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Knight World"
  },
  {
    id: "ch_kid_knight_child_1",
    badge: "기사 행성 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["generic_knight"] },
    text: "성채 마상 경기장 관람석에서 젊은 아미저 기체들의 모의 비무 경기를 지켜보았다. 푸른빛 이온 실드가 연습 포탄을 튕겨 내는 장면에서 한참 동안 눈을 떼지 못했다.",
    effect: { stats: { WS: 1, BS: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Armiger"
  },
  {
    id: "ch_kid_knight_child_2",
    badge: "기사 행성 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["generic_knight"] },
    text: "해 질 녘 성채 외곽 구릉지에서 목동들이 거대 야수 떼를 쇠울타리 안으로 몰아넣는 일을 거들었다. 봉건 변경의 거친 자연 속에서 일찍부터 담력과 발놀림이 단단해졌다.",
    effect: { stats: { T: 1, Ag: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Knight World"
  },
  {
    id: "ch_kid_knight_child_3",
    badge: "기사 행성 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["generic_knight"] },
    text: "성채 회랑에서 기록관이 낭송하는 기사도 규범과 스론 메카니쿰을 계승한 영웅들의 연대기를 귀 기울여 들었다. 명예와 예절, 그리고 서약의 무게가 자연스레 몸에 스며들었다.",
    effect: { stats: { WP: 1, Fel: 1, Inf: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Ritual of Becoming"
  }
];
