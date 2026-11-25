// 일상 연대기 — 18단계 네임드 8인 후일담 · 거시 전쟁 및 크로스오버 이력 태그 회수
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
  // =========================================================================
  // 파트 A. 18단계 신규 네임드 8인 조우 후일담 (8종)
  // =========================================================================
  {
    id: "ch_s18_met_ravensburg",
    badge: "고딕 함대의 기억",
    priority: 3,
    req: { minAge: 16, allTags: ["met_ravensburg"] },
    text: "불리한 전황 앞에서도 끝내 함포를 거두지 않던 로드 애드미럴 코르넬리우스 폰 레이븐스버그의 냉철한 지휘가 떠올라 흩어진 전열을 다시 다잡았다.",
    effect: { stats: { BS: 1, WP: 1 } },
    source: "Lexicanum: Cornelius von Ravensburg / Battlefleet Gothic"
  },
  {
    id: "ch_s18_met_macharius",
    badge: "천 개 별빛의 정복자",
    priority: 3,
    req: { minAge: 16, allTags: ["met_macharius"] },
    text: "미지의 별자리를 가리키며 천 개 행성의 길을 열던 로드 솔라 마카리우스의 불타는 눈빛이 문득 되살아나, 지친 어깨를 펴고 다시 지도를 펼쳤다.",
    effect: { stats: { Inf: 1, WP: 1 }, faith: 2 },
    source: "Lexicanum: Macharius / The Macharian Crusade Trilogy"
  },
  {
    id: "ch_s18_met_kaldor_draigo",
    badge: "은빛 방랑자의 잔상",
    priority: 3,
    req: { minAge: 16, allTags: ["met_kaldor_draigo"], excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
    text: "워프의 안개가 짙게 깔리는 밤이면, 은빛 갑주 차림으로 심연을 가르고 나타났던 칼도르 드라이고의 서늘한 검광이 떠올라 악마의 속삭임을 떨쳐 냈다.",
    effect: { stats: { WP: 2 }, faith: 2, corruption: -2 },
    source: "Lexicanum: Kaldor Draigo / Codex: Grey Knights"
  },
  {
    id: "ch_s18_met_morvenn_vahl",
    badge: "성광의 창을 든 총원장",
    priority: 3,
    req: { minAge: 16, allTags: ["met_morvenn_vahl"] },
    text: "황궁 의회의 안락함을 뿌리치고 파라곤 워슈트 연옥에 올라 최전선을 돌파하던 모르벤 발의 기개를 되새기며, 안일한 타협 대신 정면 돌파를 택했다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 2 },
    source: "Lexicanum: Morvenn Vahl / Codex: Adepta Sororitas"
  },
  {
    id: "ch_s18_met_kryptman",
    badge: "재 위의 냉혹한 셈법",
    priority: 3,
    req: { minAge: 16, allTags: ["met_kryptman"] },
    text: "타이라니드를 굶기려 수십 개 행성에 익스터미나투스를 내리던 이단심문관 피두스 크립트만의 차가운 눈빛이 스쳤다. 은하의 생존 앞에서는 어떤 대가도 가볍지 않다.",
    effect: { stats: { Int: 1, WP: 1 } },
    source: "Lexicanum: Fidus Kryptman / Codex: Tyranids"
  },
  {
    id: "ch_s18_met_canis_rex",
    badge: "사슬을 끊은 기사의 메아리",
    priority: 3,
    req: { minAge: 16, allTags: ["met_canis_rex"] },
    text: "폭군의 쇠사슬을 부수고 홀로 해방의 포효를 울리던 프리블레이드 카니스 렉스의 은빛 문장이 떠올랐다. 억압에 고개 숙이지 않는 긍지가 가슴을 덥혔다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 1 },
    source: "Lexicanum: Canis Rex / Codex: Imperial Knights"
  },
  {
    id: "ch_s18_met_mortarion",
    badge: "창백한 왕의 악몽",
    priority: 3,
    req: { minAge: 16, allTags: ["met_mortarion"] },
    text: "짙은 안개가 깔리는 날이면 대낫 침묵을 드리운 데몬 프라이마크 모타리온의 창백한 위압감이 기억 속에 되살아났다. 부패와 인내의 무게가 뼈마디까지 서늘하게 스몄다.",
    effect: { stats: { T: 1, WP: 1 } },
    source: "Lexicanum: Mortarion / Dark Imperium Trilogy"
  },
  {
    id: "ch_s18_met_trazyn",
    badge: "무한의 수집가가 남긴 시선",
    priority: 3,
    req: { minAge: 16, allTags: ["met_trazyn"] },
    text: "역사의 한 장면을 박제하겠다며 느긋이 웃던 무한의 트라진이 문득 떠올라 주변 그림자를 살폈다. 혹여 내 최후마저 솔렘나스 진열장에 놓이지는 않을지 서늘해졌다.",
    effect: { stats: { Int: 1, Ag: 1 } },
    source: "Lexicanum: Trazyn the Infinite / The Infinite and the Divine"
  },

  // =========================================================================
  // 파트 B. 18단계 거시 전쟁 · 크로스오버 이력 태그 회수 (9종 · 10개 태그 전수 커버)
  // =========================================================================
  {
    id: "ch_s18_tag_gothic_vet",
    badge: "고딕 전쟁의 포연",
    priority: 3,
    req: { minAge: 16, allTags: ["gothic_war_vet"] },
    text: "열두 해를 불태운 고딕 전쟁의 함대 약장을 가슴에 품은 채 성좌도를 살폈다. 워프 폭풍에 갇혔던 그 어둠을 견딘 자에게 공허의 고립은 두렵지 않다.",
    effect: { stats: { BS: 1, WP: 1 } },
    source: "Lexicanum: Gothic War / Battlefleet Gothic Rulebook"
  },
  {
    id: "ch_s18_tag_shame_protector",
    badge: "수치의 달들 수호자",
    priority: 3,
    req: { minAge: 16, allTags: ["shame_protector"] },
    text: "아마겟돈 생존자들을 숙청의 칼날에서 빼돌렸던 그날의 결단을 되새겼다. 이단심문소의 서늘한 시선이 아직 등 뒤에 남았으나, 단 한 번도 후회한 적은 없다.",
    effect: { stats: { Fel: 1, WP: 1 } },
    source: "Lexicanum: Months of Shame / The Emperor's Gift"
  },
  {
    id: "ch_s18_tag_shame_purger",
    badge: "침묵의 정화 집행자",
    priority: 3,
    req: { minAge: 16, allTags: ["shame_purger"] },
    text: "악마의 진실을 봉인하려 수많은 생존자를 지워 냈던 수치의 달들이 밤마다 침묵으로 찾아온다. 제국을 지키는 칼날은 언제나 핏빛 죄책감을 대가로 삼는다.",
    effect: { stats: { WP: 1, Inf: 1 } },
    source: "Lexicanum: Months of Shame / The Emperor's Gift"
  },
  {
    id: "ch_s18_tag_cordon_scar",
    badge: "방화선의 잿빛 낙인",
    priority: 3,
    req: { minAge: 16, anyTags: ["kryptman_cordon_vet", "macro_exterminatus_scar"] },
    text: "궤도 포격으로 유리처럼 녹아내리던 방화선 행성들의 마지막 통신이 지금도 귓가에 맴돈다. 익스터미나투스의 잿빛 낙인을 안은 채 냉정히 전선을 계산했다.",
    effect: { stats: { Int: 1, WP: 1 } },
    source: "Lexicanum: Third Tyrannic War / Fidus Kryptman"
  },
  {
    id: "ch_s18_tag_octarius",
    badge: "옥타리우스 도가니의 생존자",
    priority: 3,
    req: { minAge: 16, allTags: ["octarius_survivor"] },
    text: "오크와 타이라니드가 서로를 먹어 치우며 커지던 옥타리우스 봉쇄선의 악몽을 떠올렸다. 두 포식자 사이를 걸어 나온 뒤로는 어떤 난전에서도 손이 떨리지 않는다.",
    effect: { stats: { T: 1, BS: 1 } },
    source: "Lexicanum: Octarius War / War Zone Octarius"
  },
  {
    id: "ch_s18_tag_plague_war",
    badge: "역병 전쟁의 생존 흔적",
    priority: 3,
    req: { minAge: 16, allTags: ["plague_war_vet"] },
    text: "울트라마의 파르메니오와 이악스를 뒤덮던 너글의 역병 안개를 겪은 뒤, 숨 막히는 독기 속에서도 흔들리지 않는 끈질긴 호흡과 냉철함을 몸에 새겼다.",
    effect: { stats: { T: 1, WP: 1 } },
    source: "Lexicanum: Plague Wars / Dark Imperium Trilogy"
  },
  {
    id: "ch_s18_tag_mercy_sanctuary",
    badge: "전선 구호 성역의 기억",
    priority: 3,
    req: { minAge: 16, allTags: ["macro_mercy_sanctuary"] },
    text: "포화가 쏟아지던 전선에서 끝까지 지켜 낸 피난민들의 감사 서신이 돌고 돌아 손에 닿았다. 잔혹한 은하 속에서도 지켜 낸 생명들이 작은 등불로 남았다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 2 },
    source: "Warhammer 40k Core Rulebook / Imperium Sanctus Relief Chronicles"
  },
  {
    id: "ch_s18_tag_crossover_oath",
    badge: "전설들의 교차 서약",
    priority: 3,
    req: { minAge: 16, allTags: ["crossover_oath"] },
    text: "은하의 거인들이 맞부딪히던 비밀의 자리에서 맺은 서약이 아직 끝나지 않았음을 느꼈다. 거대한 역사의 톱니는 언제든 다시 앞길에 모습을 드러낼 것이다.",
    effect: { stats: { WP: 1, Inf: 1 } },
    source: "Gathering Storm / Warhammer 40k Lore Archives"
  },
  {
    id: "ch_s18_tag_solemnace_debt",
    badge: "솔렘나스의 빚",
    priority: 3,
    req: { minAge: 16, allTags: ["solemnace_debt"] },
    text: "무한의 수집가가 테서랙트 미궁 너머로 남긴 기묘한 빚의 감각이 불현듯 등줄기를 스쳤다. 솔렘나스의 장부에 오른 거래는 좀처럼 잊히는 법이 없다.",
    effect: { stats: { Int: 1, Inf: 1 } },
    source: "Fall of Cadia / The Infinite and the Divine"
  }
);
