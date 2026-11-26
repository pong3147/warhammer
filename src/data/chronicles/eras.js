// 일상 연대기 — M41 초중반~M42 시대별 분위기 · 대균열 · 임페리움 니힐루스 · 대전역 베테랑
export default [
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
    text: "아스트로노미칸의 등불이 잠시 흔들렸다는 흉흉한 소문이 돌았다. 점성술사들은 '종말의 시간'이 다가오고 있다고 속삭였다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_eisenhorn_1",
    badge: "스카루스 시대",
    priority: 3,
    req: { minAge: 10, minYear: 225, maxYear: 510 },
    text: "우주항 게시대에 스카루스 섹터 무역 호황과 함께 '외계 유물 밀수 신고 포상금' 포고령이 나란히 붙어 있었다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_era_sabbat_1",
    badge: "사바트 성전기",
    priority: 3,
    req: { minAge: 10, minYear: 755, maxYear: 795, anySegmenta: ["pacificus"] },
    text: "파시피쿠스 항구마다 사바트 성전 전선으로 향하는 병력 수송선이 줄을 이었고, 성녀 사바트의 기적담이 술집마다 회자되었다.",
    effect: { faith: 2 }
  },
  {
    id: "ch_era_vraks_1",
    badge: "브락스 공성전기",
    priority: 3,
    req: { minAge: 10, minYear: 813, maxYear: 830, or: [{ anyWorlds: ["krieg"] }, { anySegmenta: ["obscurus", "tempestus"] }] },
    text: "전시 물자 징발 포고문이 붙으며 '브락스의 배교자 자판을 분쇄하기 위해 포탄 생산량을 20% 증대하라'는 칙령이 울려 퍼졌다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_era_badab_1",
    badge: "바답 전쟁기",
    priority: 3,
    req: { minAge: 10, minYear: 901, maxYear: 912, anySegmenta: ["ultima"] },
    text: "마엘스트롬 일대 내전 여파로 우주항 통관 검사가 세 배나 까다로워졌고, '아스트랄 클로 반역자 협조 시 즉결 처형' 경고문이 나붙었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_precadia_1",
    badge: "13차 성전 전야",
    priority: 3,
    req: { minAge: 10, minYear: 990, maxYear: 998, or: [{ anyWorlds: ["cadia"] }, { anySegmenta: ["obscurus"] }] },
    text: "밤하늘 북쪽 끝의 보랏빛 성운이 유난히 붉게 타오르는 날이면 성당의 종이 밤새 멈추지 않고 울렸다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_era_noctis_1",
    badge: "영원한 밤",
    priority: 3,
    req: { minAge: 8, minYear: 999, maxYear: 1001 },
    text: "아스트로노미칸의 빛이 흔들리며 성간 화물선이 석 달째 끊겼다. 거리의 확성기는 매일 밤 '황제께서는 여전히 옥좌에 계시다'고 외쳐 댔다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_indomitus_1",
    badge: "인도미투스 시대",
    priority: 3,
    req: { minAge: 10, minYear: 1001, maxYear: 1016, excludeTags: ["imperial_nihilus", "heretic"] },
    text: "선전 홀로비드에서 웅장한 새 갑주의 프라이머리스 스페이스 마린과 제국 섭정 로부테 길리먼의 인도미투스 성전 출정 행렬이 방영되었다.",
    effect: { faith: 3 }
  },
  {
    id: "ch_era_deep_nihilus_1",
    badge: "암흑 제국",
    priority: 3,
    req: { minAge: 10, minYear: 1000, allTags: ["imperial_nihilus"] },
    text: "테라의 빛이 닿지 않는 암흑 제국 하늘 아래, 낡은 라스건 부품 하나까지 재활용하며 내일의 생존을 기약했다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_era_pariah_1",
    badge: "파리아 넥서스",
    priority: 3,
    req: { minAge: 10, minYear: 1016, maxYear: 1040, anySegmenta: ["ultima", "tempestus"] },
    text: "네필림 섹터 방면에서 들려오는 '정적'의 소문에 상선 선원들이 항로를 우회하며 연신 아퀼라 성호를 그었다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_era_4tyranic_1",
    badge: "4차 타이라니드 전쟁",
    priority: 3,
    req: { minAge: 10, minYear: 1025, anySegmenta: ["pacificus", "solar"] },
    text: "서부 은하에 레비아탄의 대촉수가 나타났다는 비상 포고령과 함께 솔블레이드 방어 함대 지원병 모집 현수막이 광장을 뒤덮었다.",
    effect: { stats: { BS: 1 } }
  },
  {
    id: "ch_s3_macharian_vet",
    badge: "마카리우스 성전",
    priority: 3,
    req: { allTags: ["macharian_veteran"] },
    text: "서부 은하의 천 개 행성을 밟았던 마카리우스 대성전의 빛바랜 원정 훈장을 닦으며, 광활했던 변경의 별빛을 회상했다.",
    effect: { stats: { Inf: 1, WP: 1 } }
  },
  {
    id: "ch_s3_damocles_vet",
    badge: "다모클레스 성전",
    priority: 3,
    req: { allTags: ["damocles_veteran"] },
    text: "동부 변경에서 마주했던 타우 제국의 푸른 플라즈마 궤적과 배틀슈트의 기동력을 되새기며 장거리 엄폐 사격술을 보완했다.",
    effect: { stats: { BS: 1, Int: 1 } }
  },
  {
    id: "ch_s3_era_damocles_rumor",
    badge: "동부 변경 속보",
    priority: 3,
    req: { minAge: 10, minYear: 742, maxYear: 755, excludeWorldTags: ["feral"] },
    text: "울티마 세그멘툼 끝자락에 '타우'라는 신흥 외계 종족이 나타나 다모클레스 만 성전이 출정했다는 낯선 소문이 항구 주점을 돌았다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s3_era_behemoth_shock",
    badge: "베헤모스 충격",
    priority: 3,
    req: { minAge: 10, minYear: 745, maxYear: 765, excludeWorldTags: ["feral"] },
    text: "은하 바깥에서 날아온 생체 괴수 함대가 울트라마의 심장 마크라그를 유린했다는 소식에 시민들이 전율하며 대피 훈련에 나섰다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s3_great_rift_1",
    badge: "시카트릭스 말레딕툼",
    priority: 3,
    req: { minAge: 10, greatRift: true, excludeWorldTags: ["feral"] },
    text: "밤하늘 한복판을 갈라놓은 핏빛 대균열의 빛이 창문 틈으로 스며들었다. 이제 은하의 어느 별에서도 예전 같은 고요한 밤은 돌아오지 않는다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s3_great_rift_2",
    badge: "시간 왜곡",
    priority: 3,
    req: { minAge: 14, greatRift: true, excludeWorldTags: ["feral"] },
    text: "이웃 성계에서 도착한 정기 화물선의 항해 일지가 현지 달력보다 석 달이나 앞서 있었다. 대균열 이후 제국의 시간마저 조각나고 있다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s3_nihilus_2",
    badge: "임페리움 니힐루스",
    priority: 3,
    req: { minAge: 12, greatRift: true, allTags: ["imperial_nihilus"] },
    text: "테라의 아스트로노미칸이 보이지 않는 어둠 속에서 등대 없는 항해를 이어 가는 상선 선원들을 위해 부두 성당의 종이 길게 울렸다.",
    effect: { stats: { WP: 1, T: 1 }, faith: 2 }
  },
  {
    id: "ch_s6_era_columnus",
    badge: "콜룸누스 전황",
    priority: 3,
    req: { minAge: 14, minYear: 260, maxYear: 275, excludeWorldTags: ["feral"] },
    text: "콜룸누스 포지 월드에서 벌어진 오크 '위어드와아아!'와의 혈전 소식이 전해지며, 성계 전역의 무기 생산 할당량이 긴급 상향되었다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s6_era_kraken",
    badge: "크라켄의 공포",
    priority: 3,
    req: { minAge: 14, minYear: 992, maxYear: 997, excludeWorldTags: ["feral"] },
    text: "동부 변경을 수많은 촉수로 집어삼킨 하이브 함대 크라켄의 참극이 아스트로패스 속보로 퍼지며, 밤하늘의 유성만 봐도 시민들이 소스라치게 놀랐다.",
    effect: { stats: { WP: 1, BS: 1 } }
  },
  {
    id: "ch_s6_era_arks_of_omen",
    badge: "사자 귀환의 소문",
    priority: 3,
    req: { minAge: 14, minYear: 1020, excludeWorldTags: ["feral"] },
    text: "징조의 방주 함대가 은하를 공포에 몰아넣는 와중에도, 안개 속에서 제1군단의 프라이마크가 돌아왔다는 소문이 암흑 속 등불처럼 퍼져 나갔다.",
    effect: { stats: { WP: 1 }, faith: 3 }
  },
  {
    id: "ch_s18_era_gothic_1",
    badge: "고딕 섹터 암전",
    priority: 3,
    req: { minAge: 12, minYear: 139, maxYear: 151, excludeWorldTags: ["feral"] },
    text: "거대한 워프 폭풍이 고딕 섹터를 삼키고 약탈자 아바돈이 고대 병기 블랙스톤 요새를 탈취해 섹터를 불태우고 있다는 아스트로패스 비보가 퍼지자, 항구마다 성간 항해 경계령이 내려졌다.",
    effect: { stats: { WP: 1 } },
    source: "Lexicanum: Gothic War / Battlefleet Gothic Rulebook (139~151.M41)"
  },
  {
    id: "ch_s18_era_gothic_2",
    badge: "게스세마네 승전보",
    priority: 3,
    req: { minAge: 14, minYear: 143, maxYear: 156, excludeWorldTags: ["feral"], excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
    text: "로드 애드미럴 코르넬리우스 폰 레이븐스버그가 게스세마네 성계에서 아바돈의 함대를 꺾었다는 속보가 울리자, 지쳐 있던 제국 해군과 항구의 사기가 크게 치솟았다.",
    effect: { stats: { WP: 1 }, faith: 2 },
    source: "Lexicanum: Battle of Gethsemane / Cornelius von Ravensburg (143.M41)"
  },
  {
    id: "ch_s18_era_macharius_echo",
    badge: "마카리우스 성전의 메아리",
    priority: 3,
    req: { minAge: 14, minYear: 398, maxYear: 407, excludeWorldTags: ["feral"] },
    text: "서부 변경의 천 개 행성을 정복한 로드 솔라 마카리우스의 위업이 연일 찬양받는 한편, 지나치게 넓어진 정복지의 패권을 둘러싼 장군들의 불협화음도 은밀히 흘러나왔다.",
    effect: { stats: { Int: 1, Inf: 1 } },
    source: "Lexicanum: Macharian Crusade / Macharian Heresy (398~407.M41)"
  },
  {
    id: "ch_s18_era_first_armageddon_1",
    badge: "검열된 붉은 소문",
    priority: 3,
    req: { minAge: 12, minYear: 444, maxYear: 448, excludeWorldTags: ["feral"] },
    text: "세그멘툼 솔라의 공업 행성 하나가 붉은 재앙에 휩쓸렸다는 풍문이 채 퍼지기도 전에, 이단심문소의 급박한 아스트로패스 통신 검열령이 성계 전체를 덮었다.",
    effect: { stats: { WP: 1, Int: 1 } },
    source: "Lexicanum: First War for Armageddon / The Emperor's Gift (444.M41)"
  },
  {
    id: "ch_s18_era_first_armageddon_2",
    badge: "차가운 대치의 소문",
    priority: 3,
    req: { minAge: 14, minYear: 445, maxYear: 452, excludeWorldTags: ["feral"] },
    text: "펜리스의 늑대 문장을 단 전함들과 이단심문소 순양함들이 궤도에서 포문을 겨눈 채 대치했다는 극비 풍문이 항법사들 사이로 은밀히 떠돌았다.",
    effect: { stats: { Int: 1, WP: 1 } },
    source: "Lexicanum: Months of Shame / The Emperor's Gift (444~445.M41)"
  },
  {
    id: "ch_s18_era_third_tyranic_1",
    badge: "은하 아래의 거대한 그림자",
    priority: 3,
    req: { minAge: 12, minYear: 997, maxYear: 1001, excludeWorldTags: ["feral"] },
    text: "은하 평면 아래쪽 성좌도마다 붉은 경보등이 연쇄 점멸했다. 하이브 함대 레비아탄의 두 거대한 촉수가 제국의 복부를 향해 치솟고 있다는 비상 전문이 쏟아졌다.",
    effect: { stats: { WP: 1 } },
    source: "Lexicanum: Third Tyrannic War / Codex: Tyranids (997.M41)"
  },
  {
    id: "ch_s18_era_third_tyranic_2",
    badge: "방화선 너머의 피난선",
    priority: 3,
    req: { minAge: 14, minYear: 997, maxYear: 1003, excludeWorldTags: ["feral"], excludeWorlds: ["krieg"] },
    text: "이단심문관 피두스 크립트만의 방화선 봉인이 찍힌 성계들에서 탈출한 피난 수송선이 궤도에 끝없이 몰려들었다. 검역소마다 불타 버린 고향 이야기가 흘러넘쳤다.",
    effect: { stats: { WP: 1, Fel: 1 } },
    source: "Lexicanum: Third Tyrannic War / Fidus Kryptman (997.M41)"
  },
  {
    id: "ch_s18_era_octarius_1",
    badge: "옥타리우스 봉쇄선 보급",
    priority: 3,
    req: { minAge: 14, minYear: 1004, maxYear: 1011, excludeWorldTags: ["feral"] },
    text: "옥타리우스 봉쇄선 순찰 함대가 오크와 타이라니드 돌파 무리를 막아 내느라 탄약을 태우듯 소모한다는 전보가 닿으며, 군수창마다 비상 징발령이 떨어졌다.",
    effect: { stats: { BS: 1, T: 1 } },
    source: "Lexicanum: Octarius War / War Zone Octarius"
  },
  {
    id: "ch_s18_era_plague_wars_1",
    badge: "울트라마 검역과 기도",
    priority: 3,
    req: { minAge: 14, minYear: 1013, maxYear: 1017, excludeWorldTags: ["feral"], excludeTags: ["heretic", "chaos_aligned", "imperial_nihilus"] },
    text: "너글의 역병 안개가 울트라마를 덮쳤다는 소식에 성간 화물 검역 봉인이 강화되었고, 성당마다 병원 행성 이악스의 구원을 비는 기도가 밤늦도록 이어졌다.",
    effect: { stats: { T: 1 }, faith: 2 },
    source: "Lexicanum: Plague Wars / Dark Imperium: Plague War"
  },
  {
    id: "ch_s18_era_plague_wars_2",
    badge: "이악스의 황금 불꽃",
    priority: 3,
    req: { minAge: 14, minYear: 1014, maxYear: 1020, excludeWorldTags: ["feral"], excludeTags: ["heretic", "chaos_aligned", "imperial_nihilus"] },
    text: "제국 섭정 로부테 길리먼이 황금 불꽃으로 모타리온의 역병 가마솥을 부수고 울트라마를 지켜 냈다는 승전보가 아스트로패스 망을 타고 은하 전역으로 퍼져 나갔다.",
    effect: { stats: { WP: 1 }, faith: 3 },
    source: "Lexicanum: Plague Wars / Dark Imperium: Godblight"
  },
  {
    id: "ch_s18_era_m42_knights_nav",
    badge: "성간 항로와 기사 창기병",
    priority: 3,
    req: { minAge: 14, minYear: 1001, greatRift: true, excludeWorldTags: ["feral"], excludeTags: ["imperial_nihilus"] },
    text: "대균열의 거친 워프 폭풍을 뚫고 나비스 노빌리테 등대 호송선과 임페리얼 나이트 기사 가문의 랜스 수송대가 입항하자, 굳게 닫혔던 성계 교역로에 숨통이 트였다.",
    effect: { stats: { Int: 1, Inf: 1 } },
    source: "Codex: Imperial Knights / Rogue Trader: The Navis Primer"
  },
  {
    id: "ch_s18_era_m42_vahl_miracles",
    badge: "총원장의 출정과 성광",
    priority: 3,
    req: { minAge: 14, minYear: 1002, greatRift: true, excludeWorldTags: ["feral"], excludeTags: ["heretic", "chaos_aligned", "imperial_nihilus"] },
    text: "아베스 상크토룸 모르벤 발이 친히 테라를 떠나 최전선 성전에 나섰다는 포고와 함께, 암흑 속 전장마다 살아 있는 성인의 성광을 보았다는 목격담이 잇따랐다.",
    effect: { stats: { WP: 1 }, faith: 3 },
    source: "Lexicanum: Morvenn Vahl / Codex: Adepta Sororitas"
  }
];
