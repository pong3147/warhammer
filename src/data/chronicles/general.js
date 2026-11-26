// 일상 연대기 — 제국 부조리 · 삶의 초점 · 선천 자질/특수 혈통 · 외계/배신자/신앙 · 오염
export default [
  {
    id: "ch_absurd_corpse_starch",
    badge: "제국의 부조리",
    priority: 1,
    req: {
      minAge: 12,
      maxSocialTier: "common",
      excludeRealms: ["heretic", "cloistered"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader", "magos"],
      or: [
        { anyWorldTags: ["hive", "industrial", "forge", "fortress", "voidborn", "terra", "krieg"] },
        { anyCareers: ["astra_militarum", "pdf_trooper", "menial_worker", "underhive_ganger"] }
      ]
    },
    text: "오늘 배급된 시체 전분 통조림에서 묘하게 익숙한 금니 같은 것이 씹혔다. 아무것도 못 본 척 삼키는 것이 이 제국에서 장수하는 비결이다.",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  {
    id: "ch_absurd_petition",
    badge: "행정 부조리",
    priority: 1,
    req: {
      minAge: 14,
      maxSocialTier: "elite",
      maxCareerTier: 4,
      excludeRealms: ["heretic", "cloistered"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
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
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
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
      maxSocialTier: "common",
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
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
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeRealms: ["heretic"],
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
      maxSocialTier: "common",
      excludeRealms: ["heretic", "cloistered", "military", "mechanicus"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      anyWorldTags: ["hive", "industrial", "civilised", "voidborn", "terra"],
      excludeTags: ["noble", "navy", "arbites", "militarum", "imperial_military", "mechanicus", "astartes", "custodes", "inquisitor", "commissar", "magos"]
    },
    text: "해군 강제 징발단이 선술집 골목을 통째로 봉쇄하고 손님 수십 명을 쇠사슬로 묶어 갔다. 다행히 뒷문으로 몸을 숨겨 평생 포탄 노예가 되는 신세는 면했다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_absurd_mutant_hunt",
    badge: "광신의 일상",
    priority: 1,
    req: {
      minAge: 12,
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
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
      maxSocialTier: "elite",
      maxCareerTier: 4,
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      anyWorldTags: ["hive", "civilised", "shrine", "terra", "paradise"],
      excludeTags: ["astartes", "custodes", "heretic"]
    },
    text: "성당 앞 노점에서 '성자 드루수스의 78번째 손가락뼈' 성유물이 비싼 값에 팔리고 있었다. 손가락이 왜 78개냐고 묻는 사람은 아무도 없었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_trait_psyker_whispers",
    badge: "워프의 메아리",
    priority: 2,
    req: { minAge: 10, maxFaith: 64, allTags: ["psyker"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    text: "잠들기 직전 벽 너머에서 이름 모를 목소리들이 내 진짜 이름을 부르며 웃었다. 베개를 끌어안고 떨리는 목소리로 기도문을 외며 밤새 식은땀을 흘렸다.",
    effect: { stats: { WP: 1 }, corruption: 2 }
  },
  {
    id: "ch_trait_psyker_faithful",
    badge: "신앙의 정화",
    priority: 3,
    req: { minAge: 12, minFaith: 65, allTags: ["psyker"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "heretic"] },
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
    req: { minAge: 14, minFaith: 72, excludeTags: ["heretic", "astartes", "custodes"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "불길한 악몽과 절망의 소문이 구역을 뒤덮었지만, 성상을 움켜쥐고 황제께 맹세를 되뇌자 두려움은 한 점도 남지 않았다. 신앙은 강철보다 단단한 방패다.",
    effect: { stats: { WP: 1 }, faith: 3, corruption: -3 }
  },
  {
    id: "ch_trait_blank_lonely",
    badge: "블랭크의 고독",
    priority: 2,
    req: { minAge: 10, allTags: ["blank"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
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
    req: { minCorruption: 25, excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "heretic", "living_saint"] },
    text: "거울 속 내 눈동자에 순간적으로 기하학적인 보랏빛 문양이 번뜩인 듯했다. 깜짝 놀라 세수를 하고 성수를 뿌렸으나 묘한 쾌감이 손끝에 남았다.",
    effect: { corruption: 2, stats: { Int: 1 } }
  },
  {
    id: "ch_corruption_whisper_2",
    badge: "이단의 유혹",
    priority: 2,
    req: { minCorruption: 40, excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "living_saint"] },
    text: "성당 앞을 지나갈 때 향불 냄새가 역겹게 느껴지고 황제 성상이 거대한 해골로 보였다. 주변 사람들이 눈치채기 전에 서둘러 고개를 숙였다.",
    effect: { faith: -3, corruption: 2 }
  },
  {
    id: "ch_astartes_corruption",
    badge: "챕터의 금기",
    priority: 3,
    req: { minCorruption: 35, allTags: ["astartes"], excludeTags: ["grey_knight"], excludeBodyClasses: ["daemonic"] },
    text: "전투 서약 낭독 중 워프의 속삭임이 헬멧 복스 망을 긁고 지나갔다. 채플린의 해골 투구가 이쪽을 응시하는 시선을 느끼며 가까스로 감정을 억눌렀다.",
    effect: { faith: -3, corruption: 2 }
  },
  {
    id: "ch_focus_survival_care",
    badge: "생존 관리",
    priority: 2,
    req: { minAge: 14, anyFocus: ["survival"], maxSocialTier: "elite", maxCareerTier: 4, excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "inquisitor", "rogue_trader", "magos"] },
    text: "비상용 정수 정제와 붕대를 몰래 비축하고 틈틈이 몸을 단련했다. 이 끔찍한 은하에서 오래 살아남는 것 자체가 반역만큼이나 어려운 예술이다.",
    effect: { wounds: 4, stats: { T: 1 } }
  },
  {
    id: "ch_focus_combat_drill",
    badge: "전투 훈련",
    priority: 2,
    req: { minAge: 12, anyFocus: ["combat"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes"] },
    text: "폐기된 사격장과 격투장에서 땀이 피처럼 흐를 때까지 방아쇠 당기기와 총검술을 반복했다. 방심한 자는 다음 해를 보지 못한다.",
    effect: { stats: { WS: 1, BS: 1 } }
  },
  {
    id: "ch_focus_faith_vigil",
    badge: "신앙의 철야",
    priority: 2,
    req: { minAge: 12, anyFocus: ["faith"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["heretic", "astartes", "custodes"] },
    text: "차가운 돌바닥에 무릎을 꿇고 《렉티티오 디비니타투스》를 밤새 낭송했다. 무릎은 피멍이 들었지만 영혼을 갉아먹던 불안이 한결 가라앉았다.",
    effect: { faith: 4, corruption: -2, stats: { WP: 1 } }
  },
  {
    id: "ch_focus_lore_study",
    badge: "학문과 기계교리",
    priority: 2,
    req: { minAge: 12, anyFocus: ["lore"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["astartes", "custodes"] },
    text: "먼지 쌓인 데이터 슬레이트와 낡은 전술 교범을 파고들었다. 다만 '지나친 호기심은 이단의 첫걸음'이라는 경고를 늘 마음에 새겨야 했다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_focus_politics_scheming",
    badge: "인맥과 출세",
    priority: 2,
    req: { minAge: 15, anyFocus: ["politics"], maxSocialTier: "elite", maxCareerTier: 4, excludeRealms: ["heretic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes"], excludeWorlds: ["krieg"] },
    text: "상관의 취향을 파악해 희귀 아마섹 주와 고급 담배를 조용히 상납했다. 제국에서는 충성심 못지않게 줄을 잘 서는 기술이 목숨을 구한다.",
    effect: { stats: { Inf: 2, Fel: 1 } }
  },
  {
    id: "ch_focus_forbidden_study",
    badge: "금단의 탐구",
    priority: 2,
    req: { minAge: 15, anyFocus: ["forbidden"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint"] },
    text: "이단심문소가 금서로 지정한 고대 성도와 외계 문헌의 필사본을 촛불 아래서 해독했다. 문장을 이해할 때마다 머리가 깨질 듯 울리지만 금지된 통찰이 열렸다.",
    effect: { stats: { Int: 2 }, corruption: 4, faith: -3 }
  },
  {
    id: "ch_absurd_ex_1",
    badge: "제국의 산수",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "common", excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "industrial", "forge", "terra"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    text: "구역 안전 수칙 게시판에 새 공고가 붙었다. '작업 중 손가락 2개 이하 절단은 결근 사유가 되지 않습니다. 지혈 후 즉시 라인에 복귀하십시오.'",
    effect: { stats: { T: 1 }, wounds: -2 }
  },
  {
    id: "ch_absurd_ex_2",
    badge: "제국 방송",
    priority: 1,
    req: { minAge: 12, excludeRealms: ["heretic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "civilised", "shrine", "terra", "fortress", "industrial"], excludeTags: ["astartes", "custodes"] },
    text: "국영 복스 방송이 '인류제국이 어제 은하계 40개 전선에서 단 한 명의 희생도 없이 완승했다'고 발표했다. 정작 항구에는 시신 포대 수만 개를 실은 수송선이 내려앉았다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_absurd_ex_3",
    badge: "행정 부조리",
    priority: 1,
    req: { minAge: 15, maxSocialTier: "common", excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "civilised", "shrine", "terra", "agri"], excludeTags: ["astartes", "custodes", "heretic"] },
    text: "세무국 전산 오타로 살아 멀쩡한 내가 '작년 사망자'로 처리되어 배급표가 끊겼다. 살아 있음을 증명하는 서류 12통을 떼느라 사흘을 굶었다.",
    effect: { stats: { Int: 1 }, wounds: -3 }
  },
  {
    id: "ch_absurd_ex_4",
    badge: "제국 건축",
    priority: 1,
    req: { minAge: 12, maxSocialTier: "elite", maxCareerTier: 4, excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "civilised", "shrine", "terra", "fortress"], excludeTags: ["astartes", "custodes"] },
    text: "신축 공공 화장실 벽면마저 황금 해골 부조와 고딕 첨탑, '황제께서 너의 모든 순간을 지켜보신다'는 석판으로 치장되어 있었다.",
    effect: { faith: 1 }
  },
  {
    id: "ch_absurd_ex_5",
    badge: "서비터의 오작동",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "elite", excludeRealms: ["heretic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "industrial", "forge", "civilised", "terra"], excludeTags: ["astartes", "custodes"] },
    text: "거리 청소 서비터가 오작동을 일으켜 쓰레기 대신 행인의 구두를 계속 쓸어 담았다. 테크프리스트가 오기 전까지 아무도 감히 기계령을 건드리지 못했다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_absurd_ex_6",
    badge: "제국의 치안",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "common", excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "civilised", "terra", "industrial"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    text: "옆집 세입자가 '황제 폐하의 옥좌가 좀 불편하지 않으실까'라고 중얼거렸다는 밀고가 들어가자 10분 만에 아르비테스 장갑차가 골목을 들이받았다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_absurd_ex_7",
    badge: "식량 배급",
    priority: 1,
    req: { minAge: 12, maxSocialTier: "common", excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "industrial", "forge", "terra", "voidborn"], excludeTags: ["noble", "astartes", "custodes", "inquisitor", "rogue_trader"] },
    text: "오늘 배급된 회색 영양 젤리에 특별히 '딸기향(추정)' 화학 색소가 섞여 나왔다. 사람들은 10년 만의 특식이라며 감격해 눈물을 훔쳤다.",
    effect: { wounds: 2 }
  },
  {
    id: "ch_absurd_ex_8",
    badge: "귀족의 자선",
    priority: 2,
    req: { minAge: 16, anyTags: ["noble", "rogue_trader"], excludeRealms: ["heretic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes"] },
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
    id: "ch_grim_deep_1",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "common", excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor", "magos"], excludeWorldTags: ["feral", "krieg"] },
    text: "배급소에서 '신메뉴 — 향신료 첨가 시체 전분'을 특별 배급했다. 맛은 똑같이 잿빛 진흙이었지만, 불평하면 배급권이 몰수되기에 모두 감사 기도를 올렸다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_grim_deep_2",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "elite", maxCareerTier: 4, excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"], excludeWorldTags: ["feral", "krieg"] },
    text: "구역 행정처에서 380년 전 증조할아버지가 과납한 통행세 1.5 쓰론을 환급해 주겠다며 서류 19장을 작성하라고 통보했다. 수수료는 4 쓰론이었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_grim_deep_3",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "elite", maxCareerTier: 4, excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "heretic"], excludeWorldTags: ["feral"] },
    text: "노점상이 '고위 주교 친필 축성 순결의 인장'을 헐값에 팔다 아르비테스 순찰대에 적발되었다. 밀랍을 긁어 보니 공업용 윤활유 찌꺼기였다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_grim_deep_4",
    badge: "제국 부조리",
    priority: 1,
    req: { minAge: 14, maxSocialTier: "elite", excludeRealms: ["heretic"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], anyWorldTags: ["hive", "forge", "civilised", "terra"], excludeTags: ["astartes", "custodes"] },
    text: "거리를 청소하던 서비터가 회로 오류로 행인의 장화를 쓰레기로 인식해 끝없이 빗자루로 쓸어 댔다. 기계교 수리 요청 대기 순번은 9개월 뒤였다.",
    effect: { stats: { Ag: 1 } }
  },
  {
    id: "ch_grim_deep_5",
    badge: "제국 일상",
    priority: 2,
    req: { anyCareers: ["underhive_ganger"] },
    text: "녹슨 환기구 틈에서 적대 갱단의 밀수 경로를 엿들었다. 언더하이브에서는 탄알만큼이나 소문이 비싼 화폐다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_grim_deep_6",
    badge: "제국 일상",
    priority: 2,
    req: { anyCareers: ["menial_worker"], excludeWorlds: ["krieg"] },
    text: "교대 사이렌이 울리자 피로에 절은 동료들과 함께 쇳가루 묻은 손으로 아퀼라 성호를 긋고 4시간짜리 쪽잠을 청했다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_grim_deep_7",
    badge: "암흑 의식",
    priority: 3,
    req: { anyCareers: ["chaos_cultist"] },
    text: "아르비테스 순찰대의 발소리가 멀어지기를 기다렸다가 지하 벽면에 팔각별 문양을 덧그렸다. 워프 너머에서 서늘한 응답이 메아리쳤다.",
    effect: { stats: { WP: 1 }, corruption: 3 }
  },
  {
    id: "ch_grim_deep_8",
    badge: "기계교 일상",
    priority: 2,
    req: { anyWorldTags: ["forge", "mechanicus"], minAge: 12, excludeTags: ["astartes", "custodes"] },
    text: "붉은 하늘 위로 배출된 용광로 분진이 금속 눈처럼 내려앉았다. 호흡기 필터를 갈아 끼우며 옴니시아의 효율을 찬미했다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s2_navigator_1",
    badge: "나비스 노빌리테",
    priority: 3,
    req: { minAge: 14, allTags: ["navigator"] },
    text: "이마의 비단 띠 아래로 워프 조류의 미세한 흔들림이 감지되었다. 제3의 눈을 지닌 항해사 없이는 제국의 어떤 전함도 별 사이를 건널 수 없다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s2_blank_1",
    badge: "블랭크의 고독",
    priority: 3,
    req: { minAge: 12, allTags: ["blank"], excludeTags: ["astartes", "custodes"] },
    text: "복도를 지나치던 행인들이 영문도 모른 채 몸서리를 치며 벽 쪽으로 비켜섰다. 고독은 쓰라리지만, 어떤 워프의 마수도 이 공허를 뚫지 못한다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_s2_ogryn_1",
    badge: "오그린의 일상",
    priority: 3,
    req: { minAge: 14, allTags: ["ogryn"], excludeRealms: ["heretic"] },
    text: "커다란 손으로 리퍼 건을 정성껏 닦은 뒤 커미사르가 가르쳐 준 '황제 폐하를 위하여!'를 우렁차게 복창하며 배급 식사를 비웠다.",
    effect: { stats: { T: 1, WS: 1 }, faith: 2 }
  },
  {
    id: "ch_s2_ratling_1",
    badge: "래틀링의 일상",
    priority: 3,
    req: { minAge: 14, allTags: ["ratling"], excludeRealms: ["heretic"] },
    text: "주머니 깊숙이 챙겨 둔 밀수 육포를 씹으며 롱 라스 조준경 렌즈를 닦았다. 배가 든든해야 천 미터 밖 표적도 또렷이 보이는 법이다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_s2_prodigy_1",
    badge: "전술 천재",
    priority: 3,
    req: { minAge: 14, allTags: ["prodigy"] },
    text: "평범한 광장을 걸으면서도 무의식중에 교차 사격 지점과 보급 차단 경로를 머릿속으로 계산했다. 타고난 전술안은 쉬는 법이 없다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s2_saint_spark_1",
    badge: "성흔의 기질",
    priority: 3,
    req: { minAge: 14, allTags: ["saint_spark"], excludeTags: ["heretic"] },
    text: "바람이 거센 회랑을 지나는 동안에도 곁에 둔 기도 초가 꺼지지 않았다. 주위 사람들이 이유 모를 평온을 느끼며 고개를 숙였다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 3 }
  },
  {
    id: "ch_s2_rt_blood_1",
    badge: "무역 영장 혈통",
    priority: 3,
    req: { minAge: 14, allTags: ["rogue_trader_blood"], excludeTags: ["astartes", "custodes"] },
    text: "가문 서고에서 미개척 변경 성계 항해도와 고대 무역 영장 사본을 펼쳐 보며, 제국의 경계 너머로 뻗어 나갈 야망을 키웠다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_s2_mechanicus_blood_1",
    badge: "기계교 도제 혈통",
    priority: 3,
    req: { minAge: 14, allTags: ["mechanicus_blood"], excludeTags: ["astartes", "custodes"] },
    text: "주변 사람들은 시끄럽다며 인상을 찌푸리는 대형 발전기의 규칙적인 굉음이 오히려 자장가처럼 편안하게 들렸다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s2_terra_elite_1",
    badge: "테라 상류층",
    priority: 3,
    req: { minAge: 14, anyWorlds: ["terra"], allTags: ["terra_elite"], excludeRealms: ["heretic", "cloistered"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
    text: "황궁 첨탑에서 울려 퍼지는 거대한 종소리를 들으며, 은하계 중심의 명문가 혈통에 걸맞은 하이 고딕 의전과 학식을 다듬었다.",
    effect: { stats: { Inf: 1, Int: 1 } }
  },
  {
    id: "ch_s5_focus_survival_2",
    badge: "생존 전문가",
    priority: 3,
    req: { minAge: 30, anyFocus: ["survival"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
    text: "오랜 보양과 절제 덕분에 동기들이 하나둘 앓아눕는 계절에도 끄떡없이 버텨 냈다. 제국에서 가장 귀한 재산은 끝내 버티는 육신이다.",
    effect: { stats: { T: 2 }, wounds: 3 }
  },
  {
    id: "ch_s5_focus_combat_2",
    badge: "무예의 경지",
    priority: 3,
    req: { minAge: 30, anyFocus: ["combat"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "수만 번 반복한 사격과 검술의 궤적이 이제는 생각보다 몸이 먼저 반응하는 경지에 이르렀다. 연병장의 신병들이 경외의 눈으로 동작을 훔쳐보았다.",
    effect: { stats: { WS: 1, BS: 1 } }
  },
  {
    id: "ch_s5_focus_faith_2",
    badge: "깊어지는 신앙",
    priority: 3,
    req: {
      minAge: 30,
      anyFocus: ["faith"],
      excludeBodyClasses: ["daemonic"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    text: "새벽 종소리에 맞추어 올리는 묵상 기도가 이제는 흔들림 없는 마음의 성채가 되었다. 어떤 불길한 속삭임도 문턱을 넘지 못한다.",
    effect: { stats: { WP: 1 }, faith: 3, corruption: -2 }
  },
  {
    id: "ch_s5_focus_lore_2",
    badge: "학문의 깊이",
    priority: 3,
    req: { minAge: 30, anyFocus: ["lore"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "고대 고딕어 주석서와 기계 정비 도면을 나란히 해독하며 남들이 지나치는 숨은 결함을 단숨에 찾아냈다. 지식은 조용하지만 가장 날카로운 검이다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s5_focus_politics_2",
    badge: "권력의 맥박",
    priority: 3,
    req: {
      minAge: 30,
      anyFocus: ["politics"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "만찬장의 사소한 자리 배치와 총독 서기의 안색만 보고도 다음 분기 권력 구도의 변동을 정확히 읽어 냈다.",
    effect: { stats: { Fel: 1, Inf: 1 } }
  },
  {
    id: "ch_s5_focus_forbidden_2",
    badge: "심연의 경계",
    priority: 3,
    req: { minAge: 25, anyFocus: ["forbidden"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint"] },
    text: "등불을 낮춘 채 금서의 암호를 풀다 문득 창밖의 그림자가 두 개로 갈라지는 환영을 보았다. 진실의 대가는 언제나 영혼의 가장자리를 깎아 먹는다.",
    effect: { stats: { Int: 2 }, corruption: 2 }
  },
  {
    id: "ch_s5_xenos_tau_1",
    badge: "동부 변경",
    priority: 3,
    req: { minAge: 14, minYear: 745, anySegmenta: ["ultima"], excludeWorldTags: ["feral"], excludeRealms: ["heretic"] },
    text: "동부 변경 부두에서 타우 제국의 선전 전단지가 밀수 상자 속에 섞여 발견되었다. 아르비테스 단속반이 즉시 모든 종이를 화염으로 소각했다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_xenos_tau_2",
    badge: "타우 경계령",
    priority: 3,
    req: {
      minAge: 16,
      minYear: 745,
      excludeRealms: ["heretic"],
      or: [{ anySegmenta: ["ultima"] }, { allTags: ["damocles_veteran"] }]
    },
    text: "사격 교범 여백에 적힌 '외계인의 푸른 펄스 광선이 보이면 즉시 지근거리 엄폐물로 파고들라'는 다모클레스 참전병의 경고를 되새겼다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s5_xenos_drukhari_1",
    badge: "어둠의 약탈자",
    priority: 3,
    req: { minAge: 14, excludeWorlds: ["terra", "mars"], excludeRealms: ["heretic"] },
    text: "이웃 행성의 해안 도시 주민 수만 명이 단 하룻밤 만에 시신 한 구 남기지 않고 사라졌다는 전보가 돌았다. 선원들은 낮게 '코모라의 어둠'이라 속삭였다.",
    effect: { stats: { WP: 1, Ag: 1 } }
  },
  {
    id: "ch_s5_xenos_drukhari_2",
    badge: "밤의 경계",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"], excludeRealms: ["heretic"] },
    text: "드루카리 약탈선 경보가 한 차례 스쳐 지나간 뒤로, 구역 주민들 모두가 밤마다 베개 밑에 단검과 마지막 탄환 한 발을 숨겨 두고 잠들었다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_s5_xenos_aeldari_1",
    badge: "유령 함선",
    priority: 3,
    req: { minAge: 14, excludeWorlds: ["terra", "mars"], excludeWorldTags: ["feral"], excludeRealms: ["heretic"] },
    text: "궤도 감시망에 가늘고 우아한 아엘다리 함선 실루엣이 잠시 스쳤다가 흔적도 없이 사라졌다. 해군 장교들은 저들이 나타난 성계엔 반드시 큰 피바람이 분다며 긴장했다.",
    effect: { stats: { Int: 1, Ag: 1 } }
  },
  {
    id: "ch_s5_xenos_aeldari_2",
    badge: "크래프트월드 소문",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"], excludeRealms: ["heretic"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "오래된 순례자 선술집에서 아엘다리 할리퀸 극단의 기묘한 가면을 보았다는 선원의 허풍을 들으며, 은하의 오래된 종족들이 품은 수수께끼를 떠올렸다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_xenos_necron_1",
    badge: "잠든 금속",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"], excludeRealms: ["heretic"] },
    text: "인접 광산 행성의 지하 깊숙한 곳에서 에메랄드빛으로 맥동하는 정체불명의 검은 석비가 발견되어 기계교가 즉시 전역 출입을 봉쇄했다는 소식이 전해졌다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_xenos_votann_1",
    badge: "보탄 상단 소문",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "krieg"], excludeWorldTags: ["feral"], excludeRealms: ["heretic"] },
    text: "은하 핵 변경에서 돌아온 상선 선장이 보탄 연맹의 중장갑 킨 탐사대와 희귀 광물을 교환한 일화를 조용히 들려주었다. 제국 바깥에도 여전히 굳건한 세력이 숨 쉬고 있다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s5_traitor_dg",
    badge: "역병 경계",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra"], excludeRealms: ["heretic"] },
    text: "인근 성계에서 데스 가드 함대의 흔적이 포착되었다는 경보와 함께, 도시 전역의 방독면 필터와 방역 소독제 배급이 일제히 강화되었다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_s5_traitor_al",
    badge: "이중 첩자 경계",
    priority: 3,
    req: { minAge: 16, excludeWorldTags: ["feral"], excludeRealms: ["heretic"] },
    text: "사령부 암호가 하루가 멀다 하고 교체되며 '누구도 쉽게 믿지 말라'는 방첩 회람이 내려왔다. 알파 리전의 그림자가 성역 어딘가에 스며들었다는 소문이 파다하다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_traitor_nl",
    badge: "공포의 야간 경보",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra", "mars"], excludeRealms: ["heretic"] },
    text: "복스 채널에 정체불명의 잡음과 비명이 잠시 섞여 들리자 고참 병사들이 얼굴을 굳히며 즉시 전 구역 탐조등 점등을 요청했다.",
    effect: { stats: { WP: 2 } }
  },
  {
    id: "ch_s5_traitor_ts",
    badge: "푸른 불꽃의 경고",
    priority: 3,
    req: { minAge: 16, excludeWorlds: ["terra"], excludeRealms: ["heretic"] },
    text: "성당 사제가 미사 도중 '시간을 왜곡하고 푸른 불꽃을 부리는 먼지 군단의 마법을 경계하라'며 신도들에게 순결한 정신을 당부했다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s6_blank_female_hush",
    badge: "공백의 여인",
    priority: 3,
    req: {
      minAge: 14,
      gender: "female",
      allTags: ["blank"],
      excludeTags: ["sister_of_silence"]
    },
    text: "시장 골목을 지날 때마다 주변 사람들이 이유도 모른 채 몸을 움츠리며 길을 비켰다. 문득 궤도를 떠도는 검은 함선의 소문이 떠올랐다.",
    effect: { stats: { WP: 2 }, corruption: -1 }
  }
];
