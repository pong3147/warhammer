// 일상 연대기 — 카오스 4대 신 상위 낙인 · 배신자 군단 장구한 전쟁 · 데몬 프린스 승천 일상
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
  {
    id: "ch_s16_ch_mark_khorne",
    badge: "피의 신의 총애",
    priority: 3,
    req: {
      allTags: ["mark_khorne"],
      anyTags: ["chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    text: "전함의 놋쇠 제단 위에 지난 약탈전에서 베어 낸 제국 지휘관의 해골을 새로 얹자, 갑주에 새긴 코른의 문양이 숯불처럼 붉게 달아올랐다. 비겁한 술수와 요사스러운 주술 따위는 피의 신 앞에서 아무런 가치도 지니지 못하며, 오직 더 강한 적의 목을 정면으로 꺾는 자만이 시선을 얻을 뿐이다. 검자루를 쥔 손아귀에 뜨거운 살기가 감돌자, 부하 전사들마저 두려움과 광기가 뒤섞인 포효로 화답했다.",
    effect: { stats: { WS: 1, T: 1 }, corruption: 2 }
  },
  {
    id: "ch_s16_ch_mark_tzeentch",
    badge: "변화의 군주의 계략",
    priority: 3,
    req: {
      allTags: ["mark_tzeentch"],
      anyTags: ["chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    text: "푸른빛과 보랏빛이 섞인 워프 불꽃이 소리 없이 일렁이는 서재에서, 제국 성계 총독의 배신과 경쟁 워밴드의 파멸을 동시에 엮어 넣은 아홉 겹의 계략도를 펼쳤다. 젠취의 축복을 받은 시야에는 필멸자들의 충성심마저 언제든 뒤집을 수 있는 허술한 매듭처럼 선명히 드러난다. 양피지 위의 예언 문자가 스스로 배열을 바꾸며 속삭이자, 변화의 군주가 던진 새로운 수에 미소를 지었다.",
    effect: { stats: { Int: 1, WP: 1 }, corruption: 2 }
  },
  {
    id: "ch_s16_ch_mark_nurgle",
    badge: "역병 군주의 자비",
    priority: 3,
    req: {
      allTags: ["mark_nurgle"],
      anyTags: ["chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    text: "녹슬고 부풀어 오른 갑주 틈새로 기묘한 포자 연기가 피어오르는 가운데, 전염병에 시달리던 추종자들에게 역병의 군주가 내리는 관대한 축복을 선포했다. 너글의 품 안에서는 썩어 가는 살점조차 아픔을 주지 않으며, 필멸의 모든 절망은 오히려 무너질 줄 모르는 끈질긴 생명력으로 뒤바뀐다. 묵직한 종소리가 함내를 울릴 때마다 낡은 상처가 기괴한 환희와 함께 아물어 갔다.",
    effect: { stats: { T: 1, WP: 1 }, wounds: 2, corruption: 2 }
  },
  {
    id: "ch_s16_ch_mark_slaanesh",
    badge: "쾌락의 군주의 탐닉",
    priority: 3,
    req: {
      allTags: ["mark_slaanesh"],
      anyTags: ["chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    text: "화려한 자줏빛과 황금으로 치장한 투기장에서, 단 한 번의 흐트러짐도 없는 완벽한 검술 동작을 수백 차례 반복하며 감각을 극한까지 끌어올렸다. 슬라네쉬의 총애를 받은 자에게는 전장의 포성과 쇳소리마저 황홀한 교향곡으로 들리며, 평범한 승리는 곧 지루한 모욕에 불과하다. 더 예리한 쾌감과 완벽한 정복을 좇는 갈증이 핏줄마다 날카로운 전율을 흘려보냈다.",
    effect: { stats: { Ag: 1, Fel: 1 }, corruption: 2 }
  },
  {
    id: "ch_s16_ch_longwar_grudge",
    badge: "장구한 전쟁의 원한",
    priority: 3,
    req: {
      anyCareers: ["renegade_marine", "chaos_lord"]
    },
    text: "황금빛 독수리 문장을 거칠게 깎아 낸 고대 파워 아머의 흉갑을 바라보며, 거짓 황제에 맞선 장구한 전쟁의 증오를 다시 불태웠다. 제국은 인류의 은하를 배신자들에게 빼앗겼다고 떠들지만, 정작 피 흘려 별들을 정복한 군단의 자존심을 버린 쪽은 황금 옥좌였다. 만 년을 이어 온 배신자 군단의 원한이 탄창을 채우는 손길마다 서늘한 살기로 깃들었다.",
    effect: { stats: { WP: 1, WS: 1 }, corruption: 1 }
  },
  {
    id: "ch_s16_ch_longwar_supply",
    badge: "악마 행성의 보급",
    priority: 3,
    req: {
      anyCareers: ["renegade_marine", "chaos_lord"]
    },
    text: "시간과 중력이 뒤틀린 악마 행성의 궤도 조선소에 정박해, 다크 메카니쿰의 헤레텍 장인들과 워프스미스들에게 약탈한 제국 노예 및 귀금속을 내주고 새 탄약과 갑주 부품을 거래했다. 워프의 불길 속에서 벼려진 무기는 제국 보급품과 달리 굶주린 기계령의 낮은 으르렁거림을 뿜어냈다. 동맹이란 언제든 깨질 수 있는 차가운 거래에 불과하지만, 당장 다음 성계를 불태울 화력만큼은 넉넉히 채워졌다.",
    effect: { stats: { BS: 1, Int: 1 }, corruption: 1 }
  },
  {
    id: "ch_s16_ch_longwar_purge",
    badge: "배신과 숙청",
    priority: 3,
    req: {
      anyCareers: ["renegade_marine", "chaos_lord"]
    },
    text: "전함의 어두운 갑판에서 은밀히 반역을 꾸미던 부관의 목을 단칼에 베어 넘기고, 침묵 속에 지켜보던 워밴드 전사들에게 그 투구를 던져 주었다. 카오스의 군세에서 충성은 서약이 아니라 오직 압도적인 힘과 공포로 매일 새로 증명해야 하는 전리품이다. 피 묻은 칼날을 닦아 내는 동안, 누구도 감히 시선을 마주치지 못한 채 명령을 기다렸다.",
    effect: { stats: { WS: 1, Inf: 1 }, wounds: -1, corruption: 1 }
  },
  {
    id: "ch_s16_ch_longwar_crusade",
    badge: "검은 성전 전야",
    priority: 3,
    req: {
      anyCareers: ["renegade_marine", "chaos_lord"]
    },
    text: "핏빛 워프 폭풍의 경계선 너머로 수십 척의 배신자 전함과 약탈 순양함들이 불길한 닻을 올리며 거대한 성전 함대를 이루었다. 함내 확성기에서 불경한 전투 찬가와 노예들의 울부짖음이 뒤섞여 울려 퍼지는 가운데, 다음으로 불타오를 제국 변경 성계의 좌표가 전술판에 떠올랐다. 낡은 볼터의 노리쇠를 당기자, 은하를 다시 불길로 물들일 출정의 전율이 온몸을 휘감았다.",
    effect: { stats: { BS: 1, WP: 1 }, corruption: 2 }
  },
  {
    id: "ch_s16_ch_dp_realm",
    badge: "워프 영토의 지배자",
    priority: 3,
    req: {
      anyCareers: ["daemon_prince"]
    },
    text: "불멸의 의지가 스쳐 지나가자 발밑의 흑요석 성채와 핏빛 하늘이 생각의 결에 맞춰 순식간에 비틀리며 새로운 첨탑을 밀어 올렸다. 워프 속 영토에서는 물리 법칙조차 지배자의 기분과 욕망에 굴복하는 한낱 장식물에 불과하다. 워프의 뒤틀린 세월 너머 아득해진 필멸자 시절에 겪었던 배고픔과 죽음의 공포를 잠시 떠올려 보았으나, 이제는 남의 이야기처럼 공허한 메아리만 남았다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_s16_ch_dp_greatgame",
    badge: "위대한 게임의 공물",
    priority: 3,
    req: {
      anyCareers: ["daemon_prince"]
    },
    text: "현실 우주의 여러 행성에서 암흑 교단 신도들이 바친 제물과 기도 소리가 워프의 메아리가 되어 옥좌 아래로 흘러들었다. 하급 악마 군세와 경쟁 데몬 프린스들의 영토 경계를 살피며, 암흑 사대신이 영원히 벌이는 위대한 게임 속에서 다음으로 삼킬 판을 냉철히 계산했다. 필멸자의 제국을 무너뜨리는 일조차 이 끝없는 신들의 레지사이드 판에서는 수많은 수 가운데 하나일 뿐이다.",
    effect: { stats: { Inf: 1, Int: 1 } }
  }
);
