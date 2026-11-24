window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || [];

window.IMPERIUM_DATA.CHRONICLES.push(
  // =========================================================================
  // 1. 신성한 테라 (Holy Terra) 집중 일상·부조리 10종
  // =========================================================================
  {
    id: "ch_terra_ex_1",
    badge: "신성한 테라",
    priority: 3,
    req: { minAge: 10, anyWorlds: ["terra"], excludeTags: ["custodes"] },
    text: "황궁 영원의 문 앞 대기 줄에서 5대째 태어나고 늙어 가며 순서를 상속받는 순례자 가족을 보았다. 앞줄로 100미터 전진하는 데 40년이 걸렸다고 했다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_terra_ex_2",
    badge: "신성한 테라",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["terra"], excludeTags: ["custodes"] },
    text: "고개를 들어 올려다본 테라의 하늘은 구름 대신 대륙 크기의 궤도 방어판과 끝없는 수송선 항적으로 완전히 뒤덮여 있었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_terra_ex_3",
    badge: "테라의 부조리",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes"] },
    text: "상류 구역 박물관에 '고대 테라의 진짜 흙 한 줌과 말린 풀잎'이 무장 경비원 12명의 호위를 받으며 전시되고 있었다. 입장료는 하층민의 평생 임금이었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_terra_ex_4",
    badge: "테라의 서고",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes"] },
    text: "높이 30km에 달하는 아드미니스트라툼 서류 탑에서 낡은 양피지 수만 장이 눈처럼 쏟아져 내렸다. 청소 서비터들이 '기밀 폐기물'을 밟지 말라며 사이렌을 울렸다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_terra_ex_5",
    badge: "테라 성가",
    priority: 3,
    req: { minAge: 8, anyWorlds: ["terra"] },
    text: "히말라야 산맥 방향에서 희미하게 울려 퍼지는 아스트로노미칸의 금빛 공명이 밤공기를 진동시켰다. 온 행성의 백조 인구가 일제히 묵념을 올렸다.",
    effect: { faith: 3, corruption: -2 }
  },
  {
    id: "ch_terra_ex_6",
    badge: "테라 치안",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes", "inquisitor"] },
    text: "수천 개의 비행 서보스컬이 골목 하늘을 빽빽이 메운 채 시민들의 기도 횟수와 표정을 실시간 녹화하며 지나갔다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_terra_ex_7",
    badge: "테라의 퇴역병",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes", "noble"] },
    text: "1만 년 전 대성전 영웅의 황금 동상 발치에서 팔다리를 잃은 퇴역 가드맨들이 낡은 훈장을 팔아 물 한 컵을 구걸하고 있었다.",
    effect: { stats: { WP: 1 }, faith: -1 }
  },
  {
    id: "ch_terra_ex_8",
    badge: "테라의 종소리",
    priority: 3,
    req: { minAge: 6, anyWorlds: ["terra"] },
    text: "황궁 대성당의 '잃어버린 영혼의 종'이 묵직하게 울렸다. 제국 어딘가에서 또 하나의 위대한 영웅이 전사했음을 알리는 소리였다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_terra_ex_9",
    badge: "테라 귀족 사교",
    priority: 3,
    req: { minAge: 16, anyWorlds: ["terra"], anyTags: ["noble", "inquisitor", "rogue_trader", "lord_commissar", "canoness"] },
    text: "황궁 외곽 대리석 테라스에서 수천 년 전 포도주를 곁들이며 상원 의회 파벌들의 은밀한 권력 이동을 전해 들었다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_terra_ex_10",
    badge: "테라 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["terra"], excludeTags: ["noble", "schola"] },
    text: "황궁 성벽이 아득히 보이는 옥상 틈새에서 끝없는 순례 행렬과 향불 연기를 바라보며 자랐다. 테라에서 흙을 밟아 본 아이는 아무도 없었다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },

  // =========================================================================
  // 2. 네임드 행성별 추가 일상·부조리 46종 (전 행성 풍성한 체감!)
  // =========================================================================
  // 화성
  {
    id: "ch_mars_ex_1",
    badge: "화성 주조소",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["mars"] },
    text: "붉은 사막 위로 궤도 엘리베이터가 쉼 없이 리만 러스 전차 수천 대를 성간 수송선으로 끌어올렸다. 화성의 하루 생산량이 은하계 한 성계의 전쟁을 먹여 살린다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_mars_ex_2",
    badge: "화성 기계령",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["mars"] },
    text: "데이터 슬레이트가 멈추자 테크프리스트가 '기계령의 노여움'을 달랜다며 2시간 동안 축성유를 바르고 타격 의식(살짝 두드리기)을 집전하자 다시 켜졌다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_mars_ex_3",
    badge: "화성 대기",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["mars"], excludeTags: ["astartes", "custodes", "magos"] },
    text: "산화철 먼지가 호흡기 필터를 막아 매달 폐 세척 주사를 맞아야 했다. 화성에서는 생체 폐를 유지하는 것 자체가 사치로 여겨진다.",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  // 카디아
  {
    id: "ch_cadia_ex_1",
    badge: "카디아 경보",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["cadia"] },
    text: "새벽 3시 불시 대피 및 실탄 방어 훈련 사이렌이 울렸다. 카디아 시민들은 90초 만에 완전 군장을 갖추고 카스르 성벽으로 뛰어나갔다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_cadia_ex_2",
    badge: "자색 눈동자",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["cadia"] },
    text: "공포의 눈 빛을 받으며 대대로 살아온 카디아인 특유의 자색 눈동자가 거울에 비쳤다. 타 행성 순례자들은 이를 두려워하지만 카디아인에게는 불굴의 긍지다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_cadia_ex_3",
    badge: "카디아 방어선",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["cadia"] },
    text: "행성 궤도의 방어 요새들이 카오스 해적 정찰선 3척을 순식간에 증발시키는 섬광이 밤하늘을 수놓았다. 카디아에서는 늘 있는 평범한 밤이었다.",
    effect: { stats: { BS: 1 } }
  },
  // 크리그
  {
    id: "ch_krieg_ex_1",
    badge: "크리그 참호",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["krieg"] },
    text: "지하 훈련 구역에서 야전삽 하나로 4시간 만에 완벽한 배수 참호와 기관총좌를 파냈다. 교관은 칭찬 한마디 없이 '기준 시간 초과 3초'만 기록했다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_krieg_ex_2",
    badge: "크리그 병기창",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["krieg"] },
    text: "전사한 선배 크리그 연대의 방독면과 코트가 수선되어 신병들에게 재지급되었다. 크리그에서 병사는 소모되지만 장비는 영원히 속죄를 이어 간다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_krieg_ex_3",
    badge: "크리그의 침묵",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["krieg"] },
    text: "식당에 2,000명이 모여 앉아 영양 죽을 먹었지만 잡담 한마디 들리지 않았다. 오직 숟가락 부딪히는 소리와 방독면 숨소리뿐이었다.",
    effect: { stats: { WP: 1 } }
  },
  // 아마겟돈
  {
    id: "ch_armageddon_ex_1",
    badge: "아마겟돈 공업",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["armageddon"] },
    text: "하이브 인페르누스의 거대 조립 공장이 매시간 키메라 장갑차 120대를 쏟아 내며 잿빛 하늘을 시커멓게 물들였다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_armageddon_ex_2",
    badge: "아마겟돈 정글",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["armageddon"] },
    text: "적도 정글 지대에서 야생 오크 무리가 출몰했다는 경보가 울려 스틸 리전 기계화 순찰대가 굉음을 내며 출동했다.",
    effect: { stats: { BS: 1 } }
  },
  {
    id: "ch_armageddon_ex_3",
    badge: "야릭의 전설",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["armageddon"] },
    text: "하데스 하이브 폐허 기념비 앞에서 시민들이 '올 베일 아이' 세바스찬 야릭 커미사르의 무용담을 되새기며 오크에 대한 증오를 불태웠다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  // 네크로문다
  {
    id: "ch_necro_ex_1",
    badge: "네크로문다 암시장",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["necromunda"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    text: "배드존 암시장에서 낡은 라스건 총열을 쥐고기 꼬치 열 개와 교환했다. 냄새는 끔찍했지만 굶어 죽는 것보다는 나았다.",
    effect: { stats: { Ag: 1 }, wounds: 2 }
  },
  {
    id: "ch_necro_ex_2",
    badge: "네크로문다 스파이어",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["necromunda"], excludeTags: ["astartes", "custodes"] },
    text: "하층 돔 천장에서 녹슨 철골이 떨어져 창고 하나가 통째로 뭉개졌다. 길드 상인은 부상자보다 깨진 술통 값부터 계산했다.",
    effect: { stats: { Ag: 1 }, wounds: -2 }
  },
  {
    id: "ch_necro_ex_3",
    badge: "네크로문다 유년기",
    priority: 3,
    req: { minAge: 6, maxAge: 13, anyWorlds: ["necromunda"], excludeTags: ["noble", "schola"] },
    text: "폐기된 화학 파이프 사이를 뛰어다니며 언더하이브 지름길을 외웠다. 길 하나 잘못 들면 두 번 다시 돌아오지 못한다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  // 마크라그
  {
    id: "ch_macragge_ex_1",
    badge: "울트라마 영지",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["macragge"] },
    text: "헤라의 요새에서 울트라마린 의장대가 대리석 대로를 행진했다. 은하계 어디에서도 보기 힘든 품격과 질서가 행성을 감쌌다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_macragge_ex_2",
    badge: "마크라그 시민정신",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["macragge"], excludeTags: ["astartes", "custodes"] },
    text: "울트라마 원로원 도서관이 일반 시민에게도 개방되어 기초 역사와 수리학을 배울 수 있었다. 다른 하이브 월드에 가면 믿지도 못할 복이었다.",
    effect: { stats: { Int: 2 } }
  },
  // 바알
  {
    id: "ch_baal_ex_1",
    badge: "바알의 두 위성",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["baal"] },
    text: "밤하늘에 바알 프라임과 바알 세쿤두스 두 위성이 붉게 떠올랐다. 사막 부족민들은 저 위성 너머 천사들의 요새를 향해 기도를 올렸다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_baal_ex_2",
    badge: "방사능 모래폭풍",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["baal"], excludeTags: ["astartes", "custodes"] },
    text: "사흘간 이어진 유리 가루 모래폭풍 속에 천막 기둥을 온몸으로 붙들고 버텼다. 피부에 붉은 방사선 발진이 돋아났다.",
    effect: { stats: { T: 1 }, wounds: -3 }
  },
  // 펜리스
  {
    id: "ch_fenris_ex_1",
    badge: "펜리스 송가",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["fenris"] },
    text: "긴 겨울밤, 화덕 주위에 둘러앉아 독한 펜리스 에일을 나누며 괴물 사냥과 하늘 전사들의 무용담을 밤새 노래했다.",
    effect: { stats: { Fel: 1, WP: 1 }, wounds: 2 }
  },
  {
    id: "ch_fenris_ex_2",
    badge: "화산과 빙하",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["fenris"], excludeTags: ["astartes", "custodes"] },
    text: "거대한 유빙이 화산섬과 충돌해 해일이 몰아쳤다. 온 부족이 10분 만에 배를 띄워 새 땅을 찾아 떠나는 유목의 삶이 이어졌다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  // 카타찬
  {
    id: "ch_catachan_ex_1",
    badge: "카타찬 생존법",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["catachan"] },
    text: "나무 껍질에 위장해 있던 흡혈 박쥐 떼를 정글 단검으로 베어 냈다. 카타찬에서 방심은 3초 만에 뼈만 남긴다.",
    effect: { stats: { WS: 1, Ag: 1 } }
  },
  {
    id: "ch_catachan_ex_2",
    badge: "밀림 폭우",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["catachan"] },
    text: "장화를 녹여 버리는 약산성 열대 폭우가 일주일째 쏟아졌다. 습기와 곰팡이 속에서 총기를 닦으며 늪지 너머를 경계했다.",
    effect: { stats: { T: 1 } }
  },
  // 보스트로야 / 발할라 / 타니스 / 녹턴 / 오펠리아 VII
  {
    id: "ch_vostroya_ex_1",
    badge: "보스트로야 공방",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["vostroya"] },
    text: "장인들이 한 땀씩 금실을 수놓은 연대 군복과 정교한 라스건 총열을 닦으며 만년설 너머의 전선을 떠올렸다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_valhalla_ex_1",
    badge: "발할라 난방",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["valhalla"] },
    text: "지하 14층 난방관이 얼어붙어 주민 전원이 총동원되어 용접 토치로 얼음을 녹였다. 발할라에서 난방 중단은 곧 사형 선고다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_tanith_ex_1",
    badge: "타니스 백파이프",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["tanith"] },
    text: "짙은 안개 숲 너머로 타니스 전통 백파이프 선율이 구슬프게 울려 퍼졌다. 나무들이 삐걱이며 뿌리를 옮기는 소리가 화음처럼 섞였다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },
  {
    id: "ch_nocturne_ex_1",
    badge: "녹턴의 불꽃",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["nocturne"] },
    text: "녹턴 특유의 고중력과 화산 열기 속에서 무거운 쇠망치를 두드리며 튼튼한 농기구와 무기를 직접 벼렸다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_ophelia_ex_1",
    badge: "오펠리아 대성당",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["ophelia7"] },
    text: "대성당 스테인드글라스 아래 수만 자루의 황금 촛불이 타올랐다. 향 냄새가 도시 구석구석까지 스며들어 영혼을 진정시켰다.",
    effect: { faith: 3, corruption: -2 }
  },

  // =========================================================================
  // 3. 인류제국 보편 블랙코미디 · 인간경시 · 직업 확장 일상 34종
  // =========================================================================
  {
    id: "ch_absurd_ex_1",
    badge: "제국의 산수",
    priority: 1,
    req: { minAge: 14, anyWorldTags: ["hive", "industrial", "forge", "terra"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    text: "구역 안전 수칙 게시판에 새 공고가 붙었다. '작업 중 손가락 2개 이하 절단은 결근 사유가 되지 않습니다. 지혈 후 즉시 라인에 복귀하십시오.'",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  {
    id: "ch_absurd_ex_2",
    badge: "제국 방송",
    priority: 1,
    req: { minAge: 12, anyWorldTags: ["hive", "civilised", "shrine", "terra", "fortress", "industrial"], excludeTags: ["astartes", "custodes"] },
    text: "국영 복스 방송이 '인류제국이 어제 은하계 40개 전선에서 단 한 명의 희생도 없이 완승했다'고 발표했다. 정작 항구에는 시신 포대 수만 개를 실은 수송선이 내려앉았다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_absurd_ex_3",
    badge: "행정 부조리",
    priority: 1,
    req: { minAge: 15, anyWorldTags: ["hive", "civilised", "shrine", "terra", "agri"], excludeTags: ["astartes", "custodes", "heretic"] },
    text: "세무국 전산 오타로 살아 멀쩡한 내가 '작년 사망자'로 처리되어 배급표가 끊겼다. 살아 있음을 증명하는 서류 12통을 떼느라 사흘을 굶었다.",
    effect: { stats: { Int: 1 }, wounds: -3 }
  },
  {
    id: "ch_absurd_ex_4",
    badge: "제국 건축",
    priority: 1,
    req: { minAge: 12, anyWorldTags: ["hive", "civilised", "shrine", "terra", "fortress"], excludeTags: ["astartes", "custodes"] },
    text: "신축 공공 화장실 벽면마저 황금 해골 부조와 고딕 첨탑, '황제께서 너의 모든 순간을 지켜보신다'는 석판으로 치장되어 있었다.",
    effect: { faith: 1 }
  },
  {
    id: "ch_absurd_ex_5",
    badge: "서비터의 오작동",
    priority: 1,
    req: { minAge: 14, anyWorldTags: ["hive", "industrial", "forge", "civilised", "terra"], excludeTags: ["astartes", "custodes"] },
    text: "거리 청소 서비터가 오작동을 일으켜 쓰레기 대신 행인의 구두를 계속 쓸어 담았다. 테크프리스트가 오기 전까지 아무도 감히 기계령을 건드리지 못했다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_absurd_ex_6",
    badge: "제국의 치안",
    priority: 1,
    req: { minAge: 14, anyWorldTags: ["hive", "civilised", "terra", "industrial"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    text: "옆집 세입자가 '황제 폐하의 옥좌가 좀 불편하지 않으실까'라고 중얼거렸다는 밀고가 들어가자 10분 만에 아르비테스 장갑차가 골목을 들이받았다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_absurd_ex_7",
    badge: "식량 배급",
    priority: 1,
    req: { minAge: 12, anyWorldTags: ["hive", "industrial", "forge", "terra", "voidborn"], excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader"] },
    text: "오늘 배급된 회색 영양 젤리에 특별히 '딸기향(추정)' 화학 색소가 섞여 나왔다. 사람들은 10년 만의 특식이라며 감격해 눈물을 훔쳤다.",
    effect: { wounds: 2 }
  },
  {
    id: "ch_absurd_ex_8",
    badge: "귀족의 자선",
    priority: 2,
    req: { minAge: 16, anyTags: ["noble", "rogue_trader"], excludeTags: ["astartes", "custodes"] },
    text: "자선 무도회에서 은화 500닢을 하층 구역 성당에 기부하고 성대한 언론 찬사를 받았다. 정작 무도회 샴페인 값만 은화 8,000닢이 들었다.",
    effect: { stats: { Inf: 2, Fel: 1 }, faith: 2 }
  },
  {
    id: "ch_absurd_ex_9",
    badge: "가드맨의 유머",
    priority: 3,
    req: { anyCareers: ["astra_militarum", "pdf_trooper"] },
    text: "신병이 '우리 라스건이 카오스 스페이스 마린 갑옷을 뚫을 수 있습니까?'라고 묻자, 고참 병장이 '손전등 만 개를 한 점에 비추면 눈은 부시겠지'라며 쓴웃음을 지었다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_absurd_ex_10",
    badge: "가드맨의 참호",
    priority: 3,
    req: { anyCareers: ["astra_militarum"] },
    text: "연대 병참관이 탄약 대신 '사기 진작용 황제 초상화 포스터 5만 장'을 최전선 참호로 보급했다. 병사들은 추위를 막으려 포스터를 외투 속에 껴입었다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_job_ex_officer",
    badge: "장교의 고뇌",
    priority: 3,
    req: { anyCareers: ["militarum_officer"] },
    text: "전사자 통지서 400통에 일일이 서명하다 만년필 촉이 부러졌다. 부관은 '서명 도장 서비터를 쓰시면 10초면 끝납니다'라고 조언했다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_job_ex_commissar",
    badge: "커미사르의 경계",
    priority: 3,
    req: { anyCareers: ["commissar", "lord_commissar"] },
    text: "야전 식당에서 병사가 내민 스프에서 낯선 약초 냄새가 났다. 말없이 병사에게 먼저 한 숟가락 먹어 보라고 권하자 얼굴이 사색이 되어 자백했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_job_ex_inquisitor",
    badge: "이단심문관의 식사",
    priority: 3,
    req: { anyCareers: ["inquisitor"] },
    text: "행성 총독궁 만찬에 예고 없이 방문해 독살 탐지 서보스컬을 띄운 채 포도주를 음미했다. 식탁에 둘러앉은 귀족 20명 중 아무도 땀을 닦지 못했다.",
    effect: { stats: { Inf: 2, Int: 1 } }
  },
  {
    id: "ch_job_ex_astartes_3",
    badge: "아스타르테스 무기고",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_captain"] },
    text: "400년 된 유물 볼터의 약실을 직접 분해해 닦고 기계령 기도문을 읊었다. 이 총은 나를 거쳐 간 세 명의 전임 형제와 함께 14개 성계를 정화해 왔다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_job_ex_astartes_4",
    badge: "아스타르테스 성전",
    priority: 3,
    req: { anyCareers: ["astartes_brother", "astartes_captain"] },
    text: "전투 함선 강습 갑판에서 출격 대기 중, 채플린이 갑주 가슴팍에 새로운 붉은 순결 인장(Purity Seal)을 왁스로 봉인해 주었다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_job_ex_custodes_4",
    badge: "황제의 곁",
    priority: 3,
    req: { anyCareers: ["adeptus_custodes"] },
    text: "황금 옥좌의 방 문턱에서 뿜어져 나오는 타오르는 사이킥 열기를 묵묵히 견디며 교대 근무를 마쳤다. 평범한 필멸자라면 1초 만에 재가 될 영광의 빛이다.",
    effect: { stats: { T: 1, WP: 2 } }
  },
  {
    id: "ch_job_ex_sororitas_2",
    badge: "전투 수녀회",
    priority: 3,
    req: { anyCareers: ["adepta_sororitas", "canoness"] },
    text: "화염방사기 프로메슘 탱크를 점검하며 순교 성녀 캐서린의 일대기를 합창했다. 불꽃은 거짓을 태우고 진실만 남긴다.",
    effect: { stats: { BS: 1 }, faith: 4 }
  },
  {
    id: "ch_job_ex_techpriest",
    badge: "테크프리스트의 시선",
    priority: 3,
    req: { anyCareers: ["tech_priest", "archmagos"] },
    text: "어느 귀족이 자랑하던 고대 황금 회중시계를 잠시 살피고는 '기어 마찰 계수 18% 손실, 조악한 유기체 장식품'이라는 진단을 내려 주었다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_job_ex_navy_2",
    badge: "워프 항해",
    priority: 3,
    req: { anyCareers: ["imperial_navy", "rogue_trader"] },
    text: "워프 도약 직전, 선체 전체의 창문 장갑 셔터가 육중한 쇠소리를 내며 닫혔다. 도약 중 밖을 내다본 신참 갑판원은 미쳐 버려 격리실로 끌려갔다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },
  {
    id: "ch_job_ex_arbites_2",
    badge: "아르비테스 야간 순찰",
    priority: 3,
    req: { anyCareers: ["arbites"] },
    text: "아르비테스 요새 법정에서 하루 400건의 약식 재판을 3시간 만에 끝냈다. 판결은 대개 벌금, 징역 탄광, 서비터 전환 셋 중 하나였다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_job_ex_priest_2",
    badge: "국교의 설교",
    priority: 3,
    req: { anyCareers: ["ecclesiarchy_priest"] },
    text: "체인소드 끝을 치켜들고 광장에서 이단 근절을 부르짖자 흥분한 신도들이 봉헌함에 은화를 쏟아부었다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 3 }
  },
  {
    id: "ch_job_ex_psyker_2",
    badge: "아스트로패스 통신",
    priority: 3,
    req: { anyCareers: ["sanctioned_psyker"] },
    text: "300광년 너머 성계에서 날아온 꿈과 상징 덩어리의 아스트로패스 전문을 6시간 동안 해독해 '탄약 500상자 지연'이라는 1줄 보고서로 번역했다.",
    effect: { stats: { Int: 2, WP: 1 } }
  },
  {
    id: "ch_job_ex_cultist_2",
    badge: "암흑의 속삭임",
    priority: 3,
    req: { anyCareers: ["chaos_cultist"] },
    text: "폐공장 지하에서 훔친 제국 보급품에 카오스의 룬을 새겼다. 아르비테스 순찰 사이렌이 가까워질 때마다 아슬아슬한 전율이 등줄기를 탔다.",
    effect: { stats: { Ag: 1, Int: 1 }, corruption: 3 }
  },
  {
    id: "ch_job_ex_grey_knight_2",
    badge: "타이탄의 무기고",
    priority: 3,
    req: { anyCareers: ["grey_knight"] },
    text: "은빛 네메시스 포스 소드의 룬 문자에 정화의 기도를 불어넣었다. 칼날에 서린 푸른 사이킥 불꽃이 악마의 이름을 태울 날을 기다린다.",
    effect: { stats: { WS: 1, WP: 2 }, corruption: -5 }
  }
);
