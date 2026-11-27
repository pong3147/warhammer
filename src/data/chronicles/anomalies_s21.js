// 일상 연대기 — 21단계 규격 외 특이점 4종 (알파 플러스 사이커 · 규격 외 피지컬 · 사반트 · 오메가-마이너스)
export default [
  {
    id: "ch_s21_anom_01",
    badge: "알파 플러스 징후",
    priority: 3,
    req: { minAge: 10, allTags: ["alpha_plus_psyker"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["grey_knight", "custodes", "living_saint", "saint_vessel", "blank", "omega_pariah"] },
    text: "호흡을 한 번 내쉴 때마다 주변 기온이 급격히 내려앉고 차갑게 식은 벽면에 성에가 얇게 피어올랐다. 정적 속에서도 귓가에는 차원 너머의 속삭임이 멎지 않았다.",
    effect: { stats: { WP: 1 }, corruption: 1 }
  },
  {
    id: "ch_s21_anom_02",
    badge: "염동의 파장",
    priority: 3,
    req: { minAge: 14, allTags: ["alpha_plus_psyker"], maxCareerTier: 4, excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["heretic", "chaos_aligned", "grey_knight", "custodes", "living_saint", "saint_vessel", "blank", "omega_pariah", "high_lord_terra"] },
    text: "무심코 시선을 던진 탁자 위의 탄창과 컵이 손끝 하나 대지 않았는데도 공중으로 떴다 내려앉았다. 곁을 지나던 동료는 비명조차 삼킨 채 황급히 아퀼라 성호를 그었다.",
    effect: { stats: { WP: 1 }, corruption: 1 }
  },
  {
    id: "ch_s21_anom_03",
    badge: "워프의 공명",
    priority: 3,
    req: { minAge: 16, allTags: ["alpha_plus_psyker"], maxCareerTier: 4, excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["heretic", "chaos_aligned", "custodes", "grey_knight", "living_saint", "saint_vessel", "blank", "omega_pariah", "high_lord_terra"] },
    text: "아스트로패스 합창단이 송신할 때마다 두개골 안쪽이 거대한 종처럼 울렸다. 통제 리미터가 달그락거릴 정도로 넘쳐흐르는 영능을 억누르는 것만으로 온몸이 식은땀에 젖었다.",
    effect: { stats: { WP: 1 }, faith: 1 }
  },
  {
    id: "ch_s21_anom_04",
    badge: "금지된 심연",
    priority: 3,
    req: { minAge: 18, allTags: ["alpha_plus_psyker"], maxCareerTier: 4, excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["heretic", "chaos_aligned", "inquisitor", "lord_inquisitor", "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "living_saint", "saint_vessel", "custodes", "grey_knight", "astartes", "blank", "omega_pariah"] },
    text: "감시자가 등 뒤에서 조용히 라스피스톨의 안전장치를 푸는 소리가 들렸다. 천 조 명에 하나 나올까 말까 한 알파 플러스 등급의 존재는 아군에게조차 언제 터질지 모를 성간 폭탄이나 다름없었다.",
    effect: { stats: { Int: 1 }, corruption: 1 }
  },
  {
    id: "ch_s21_anom_05",
    badge: "규격 외 근력",
    priority: 3,
    req: { minAge: 12, allTags: ["freak_physique"], maxCareerTier: 4, excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "saint_vessel", "ogryn", "abhuman", "high_lord_terra"] },
    text: "훈련 교관이 시범으로 내민 강화 플라스틸 봉이 양손에 쥐어지자마자 엿가락처럼 휘어졌다. 교관은 수치를 잘못 읽은 줄 알고 측정 슬레이트를 세 번이나 두드렸다.",
    effect: { stats: { WS: 1 } }
  },
  {
    id: "ch_s21_anom_06",
    badge: "괴물의 골격",
    priority: 3,
    req: { minAge: 16, allTags: ["freak_physique"], excludeRealms: ["heretic", "mechanicus"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "ogryn", "abhuman"] },
    text: "메디카에 검진에서 표준 인류보다 두 배 이상 치밀한 근섬유와 골밀도가 확인되었다. 의무관은 비현실적인 생체 수치를 보며 기계교의 비밀 유전자 개조가 아닌지 의심스러운 눈빛을 보냈다.",
    effect: { stats: { T: 1 } }
  },
  {
    id: "ch_s21_anom_07",
    badge: "압도적 위압",
    priority: 3,
    req: { minAge: 18, allTags: ["freak_physique"], excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "high_lord_terra"] },
    text: "보급고의 굳게 닫힌 철문이 유압 고장으로 꿈쩍도 하지 않자, 어깨로 한 번 밀어 경첩째 뜯어냈다. 구경하던 병사들이 일제히 뒷걸음질 치며 길을 내주었다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s21_anom_08",
    badge: "타고난 반사신경",
    priority: 3,
    req: { minAge: 14, allTags: ["freak_physique"], excludeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "high_lord_terra"] },
    text: "등 뒤에서 날아든 둔기를 고개조차 돌리지 않고 한 손으로 낚아채 부러뜨렸다. 인간의 한계를 비웃는 듯한 움직임에 주변의 소란이 한순간에 얼어붙었다.",
    effect: { stats: { Ag: 1, WS: 1 } }
  },
  {
    id: "ch_s21_anom_09",
    badge: "살아 있는 연산기",
    priority: 3,
    req: { minAge: 12, allTags: ["savant_genius"], excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"], excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "assassin", "ogryn"] },
    text: "코지테이터가 한 시간 넘게 긁어내던 섹터 전체의 십일조 곡물과 탄약 환산표를 머릿속 암산만으로 단숨에 끝냈다. 아드미니스트라툼 서기관은 자신이 쓸모없어졌다는 공포에 철필을 떨어뜨렸다.",
    effect: { stats: { Int: 1 } }
  },
  {
    id: "ch_s21_anom_10",
    badge: "초월적 통찰",
    priority: 3,
    req: { minAge: 16, allTags: ["savant_genius"], minSocialTier: "common", excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"], excludeTags: ["custodes", "grey_knight", "living_saint", "high_lord_terra", "assassin", "ogryn"] },
    text: "수백 장에 달하는 전선 보고서의 행간을 단 한 번 훑어본 것만으로 사흘 뒤 적의 우회 기동 경로를 짚어냈다. 지휘관들은 경외감과 불쾌감이 뒤섞인 시선으로 그대를 바라보았다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s21_anom_11",
    badge: "고독한 천재성",
    priority: 3,
    req: { minAge: 14, allTags: ["savant_genius"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "남들이 미처 인지하지 못하는 미세한 진동과 확률의 틈새까지 전부 계산에 들어와 밤잠을 이루기 어렵다. 평범한 필멸자들의 느릿한 대화가 마치 얼어붙은 그림처럼 답답하게 느껴졌다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s21_anom_12",
    badge: "영혼 없는 공허",
    priority: 3,
    req: { minAge: 8, allTags: ["omega_pariah"], excludeRealms: ["heretic"], excludeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "지나가는 것만으로 행인들의 웃음소리가 뚝 끊기고, 근처의 짐승들이 털을 바짝 세운 채 달아났다. 오메가 마이너스 등급의 무혼이 내뿜는 절대적인 공허 앞에서는 누구도 이유 모를 구역질과 공포를 견디지 못했다.",
    effect: { stats: { WP: 1 } }
  },
  {
    id: "ch_s21_anom_13",
    badge: "워프의 침묵",
    priority: 3,
    req: { minAge: 14, allTags: ["omega_pariah"], excludeRealms: ["heretic"], excludeWorldTags: ["feral"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "아스트로패스 성소 문턱을 스치듯 지나가자마자 내부의 영능 신호가 일제히 끊기며 경보가 울렸다. 가까이 다가선 사이커는 코피를 쏟으며 '저 자는 인간이 아니라 뚫린 구멍'이라고 절규했다.",
    effect: { stats: { WP: 1 }, corruption: -1 }
  },
  {
    id: "ch_s21_anom_14",
    badge: "절대적인 고립",
    priority: 3,
    req: { minAge: 18, allTags: ["omega_pariah"], excludeRealms: ["heretic"], excludeWorlds: ["krieg"], excludeBodyClasses: ["dreadnought", "daemonic"] },
    text: "군중 한가운데 서 있어도 반경 수 미터 안쪽으로는 아무도 발을 들이지 못했다. 황제의 영혼마저 닿지 않는 듯한 서늘한 고독 속에서, 역설적으로 그 어떤 워프의 유혹도 발붙일 틈이 없었다.",
    effect: { stats: { WP: 1 }, faith: -1, corruption: -1 }
  }
];
