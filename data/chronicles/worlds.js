// 일상 연대기 — 22개 행성(테라 · 네임드 15 · 무명 7 · 보이드본) 풍토 및 생활상
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
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
  {
    id: "ch_s3_vostroya_1",
    badge: "보스트로야",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["vostroya"] },
    text: "눈보라가 몰아치는 보스트로야 공업 첨탑 아래, 황동 문양이 세공된 장자 연대의 붉은 군복 행렬이 장엄한 군악에 맞추어 행진했다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_s3_tanith_1",
    badge: "타니스",
    priority: 3,
    req: { minAge: 10, maxYear: 764, anyWorlds: ["tanith"] },
    text: "안개 낀 날우드 숲 사이로 타니스 전통 백파이프 음색이 은은히 퍼져 나갔다. 움직이는 나무들의 길을 기억하는 것은 오직 타니스인뿐이다.",
    effect: { stats: { Ag: 1, WP: 1 } }
  },
  {
    id: "ch_s3_ophelia7_1",
    badge: "오펠리아 VII",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["ophelia7"], excludeTags: ["heretic"] },
    text: "콘벤트 상크토룸의 황금 첨탑에서 울려 퍼진 종소리에 맞추어 수십만 순례자가 일제히 무릎을 꿇고 황제 찬송가를 합창했다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },
  {
    id: "ch_s3_necromunda_1",
    badge: "네크로문다",
    priority: 3,
    req: { minAge: 12, anyWorlds: ["necromunda"], excludeTags: ["astartes", "custodes"] },
    text: "하이브 프리무스 하층 돔의 환기구 아래에서 골리앗과 에셔 갱단의 총성이 멀리 메아리쳤다. 상인들은 태연히 셔터를 반쯤 내린 채 장사를 이어 갔다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_s4_world_agri_harvest",
    badge: "농업 행성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["agri"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "지평선 끝까지 펼쳐진 유전자 개량 곡물밭 위로 거대한 자동 수확기가 굉음을 내며 지나갔다. 올해 거둔 곡식은 곧 이름 모를 성계의 하이브 수십 곳을 먹여 살릴 것이다.",
    effect: { stats: { T: 2 } }
  },
  {
    id: "ch_s4_world_paradise_mask",
    badge: "낙원 행성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["paradise"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "외지 귀족들이 샴페인을 기울이는 대리석 테라스 아래, 하인 통로에서는 땀에 젖은 일꾼들이 쉴 새 없이 얼음과 화환을 나르고 있었다.",
    effect: { stats: { Fel: 1, Ag: 1 } }
  },
  {
    id: "ch_s4_world_feral_stars",
    badge: "야만 행성",
    priority: 3,
    req: {
      minAge: 12,
      anyWorldTags: ["feral"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "모닥불 연기가 밤하늘로 흩어지는 사이, 별들 사이를 천천히 가로지르는 '하늘의 철선' 불빛을 바라보며 부족 아이들이 경외의 숨을 삼켰다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_s4_world_hive_smog",
    badge: "하이브 월드",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["hive"],
      excludeWorlds: ["terra", "krieg"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "수 킬로미터 위 첨탑에서 내려다보이는 하늘은 평생 본 적이 없지만, 중층 환기구에서 떨어지는 노란 산성 이슬 냄새만으로도 오늘 교대 시각을 알 수 있다.",
    effect: { stats: { T: 1, Ag: 1 } }
  },
  {
    id: "ch_s4_world_civilised_parade",
    badge: "문명 행성",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["civilised"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "광장 시계탑 아래에서 행성 방위군 행렬과 제국 성가대 행진이 지나갔다. 먼 은하의 전쟁 소식은 아직 전보 속 활자로만 머물러 있다.",
    effect: { stats: { Fel: 1, Int: 1 } }
  },
  {
    id: "ch_s4_world_voidborn_bell",
    badge: "보이드본",
    priority: 3,
    req: {
      minAge: 14,
      anyWorldTags: ["voidborn"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "선체 외벽을 스치는 미세 운석의 금속성 울림과 인공 중력 발전기의 규칙적인 진동 속에서 잠이 들었다. 행성 땅바닥보다 철판 갑판이 훨씬 안심된다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },
  {
    id: "ch_s6_world_mars_1",
    badge: "붉은 행성 화성",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["mars"] },
    text: "붉은 모래폭풍 너머 올림푸스 몬스의 거대한 포지 첨탑에서 수천 개의 용광로 연기가 솟아올랐다. 화성의 심장은 1만 년째 단 한 순간도 쉬지 않는다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s6_world_macragge_1",
    badge: "울트라마르의 수도",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["macragge"] },
    text: "마크라그의 정갈한 대리석 대로와 시계처럼 정확히 굴러가는 대중 보급선을 바라보며, 이 질서가 제국 전체로 퍼지길 바랐던 프라이마크의 꿈을 떠올렸다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s6_world_nocturne_1",
    badge: "화산의 땅 녹턴",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["nocturne"] },
    text: "용암 강 너머로 붉은 노을이 지는 저녁, 성채 마을 대장간마다 쇠를 두드리는 망치 소리가 리듬처럼 울려 퍼졌다.",
    effect: { stats: { T: 1, Int: 1 } }
  }
);
