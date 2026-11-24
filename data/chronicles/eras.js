// 일상 연대기 — M41 초중반~M42 시대별 분위기 · 대균열 · 임페리움 니힐루스 · 대전역 베테랑
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
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
  }
);
