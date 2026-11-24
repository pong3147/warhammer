// 일상 연대기 — 초년기(14~22세) · 노년기 · 리주버냇 · 기계화 · 초장수기 · 인연/가족
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
  {
    id: "ch_s2_elder_mortal_1",
    badge: "노년기 회고",
    priority: 3,
    req: { minAge: 55, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat"] },
    text: "습한 날이면 수십 년 전 얻은 흉터와 무릎이 묵직하게 쑤신다. 그래도 은하계의 숱한 전란을 버티고 쉰다섯을 넘긴 노구로 오늘도 새벽을 맞았다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s2_elder_mortal_2",
    badge: "노년기 회고",
    priority: 3,
    req: { minAge: 60, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat"], excludeWorlds: ["krieg"] },
    text: "서툴게 경례를 올리는 어린 신참들의 얼굴에서 수십 년 전 자신의 젊은 날이 겹쳐 보였다. 말없이 어깨를 두드려 주며 생존의 요령을 일러 주었다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_s2_rejuvenat_1",
    badge: "리주버냇 장수",
    priority: 3,
    req: { minAge: 60, allTags: ["rejuvenat"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    text: "리주버냇 시술로 주름 없이 유지된 얼굴을 거울로 바라보며, 이미 노환으로 세상을 떠난 옛 동료들의 빛바랜 초상화를 서랍 깊숙이 정리했다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s2_rejuvenat_2",
    badge: "리주버냇 장수",
    priority: 3,
    req: { minAge: 75, allTags: ["rejuvenat"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    text: "정기 세포 재생 혈청을 투여받는 동안 혈관에 서늘한 감각이 번졌다. 제국의 상류층에게 수명은 신의 섭리가 아니라 권위로 사는 자산이다.",
    effect: { stats: { T: 1, Inf: 1 }, wounds: 4 }
  },
  {
    id: "ch_s2_bionic_1",
    badge: "기계 의체",
    priority: 3,
    req: { minAge: 35, allTags: ["bionic"], excludeTags: ["custodes"] },
    text: "차가운 강철 의수로 따뜻한 찻잔을 감싸 쥐었으나 온기가 전해지지 않았다. 육신이 줄어들수록 고통은 옅어지지만 인간의 감각도 함께 멀어진다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s2_bionic_2",
    badge: "기계 의체",
    priority: 3,
    req: { minAge: 45, allTags: ["bionic"], excludeTags: ["custodes"] },
    text: "성유를 바르고 관절 서보의 미세한 유격을 조율했다. 피와 살은 늙어 가지만 축성된 강철만은 묵묵히 제 몫을 다한다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s2_centenarian_1",
    badge: "백 년의 세월",
    priority: 3,
    req: {
      minAge: 100,
      or: [
        { allTags: ["astartes"] },
        { allTags: ["custodes"] },
        { allTags: ["grey_knight"] },
        { allTags: ["rejuvenat"] },
        { allTags: ["magos"] }
      ]
    },
    text: "문득 아드미니스트라툼 기록부를 확인하다 자신이 태어나던 해의 문서가 이미 고문서고 지하로 이관되었다는 사실을 알았다. 한 세기를 살아 낸 자만의 기묘한 정적이 감돌았다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s2_centenarian_2",
    badge: "불멸의 의무",
    priority: 3,
    req: { minAge: 150, anyTags: ["astartes", "custodes", "grey_knight", "dreadnought"] },
    text: "수 세대의 필멸자 총독과 장교들이 취임하고 흙으로 돌아가는 동안에도, 그대는 여전히 같은 갑주를 입고 변함없이 황제의 적을 향해 총구를 겨누고 있다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_s3_bond_comrade",
    badge: "오래된 전우",
    priority: 3,
    req: { allTags: ["bond_comrade"] },
    text: "다른 구역으로 전출 간 옛 전우에게서 구겨진 엽서 한 장이 넉 달 만에 도착했다. '아직 숨 붙어 있다'는 짧은 한 줄에 비로소 안도했다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_s3_bond_mentor",
    badge: "스승의 가르침",
    priority: 3,
    req: { allTags: ["bond_mentor"] },
    text: "까다로운 업무 앞에서 망설이던 찰나, 옛 스승이 남긴 낡은 수첩의 한 구절이 떠올라 단숨에 실마리를 풀어 냈다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s3_bond_rival",
    badge: "숙명의 정적",
    priority: 3,
    req: { allTags: ["bond_rival"] },
    text: "승진 명단과 성과표에 나란히 오른 숙명의 정적 이름을 확인하고 이를 악물었다. 저 자보다 먼저 무너질 수는 없다는 오기가 기력을 되살렸다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_youth_first_pay",
    badge: "초년기 급료",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorlds: ["krieg"],
      excludeWorldTags: ["feral"]
    },
    text: "어른 몫의 첫 주간 배급표와 낡은 제국 동전 몇 닢을 손에 쥐었다. 닳아 버린 손바닥의 굳은살이 비로소 제국의 톱니바퀴가 되었음을 일깨운다.",
    effect: { stats: { T: 1, WP: 1 } }
  },
  {
    id: "ch_s4_youth_military_boots",
    badge: "신병 시절",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["pdf_trooper", "astra_militarum", "tempestus_scion"],
      excludeWorlds: ["krieg"]
    },
    text: "발에 맞지 않는 새 보급 군화 때문에 뒤꿈치가 벗겨졌지만 행군 대열에서 낙오할 수는 없었다. 고참의 욕설 사이로 라스건 분해 조립이 서서히 손에 익어 간다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s4_youth_mechanicus_chant",
    badge: "수습 기계교도",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["skitarii", "tech_priest"]
    },
    text: "이진법 찬가를 읊으며 거대한 톱니바퀴 축에 성유를 바르는 손길이 이제 제법 매끄러워졌다. 기계령의 규칙적인 박동이 심장 박동보다 편안하게 느껴진다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s4_youth_imperial_bureau",
    badge: "수습 공직자",
    priority: 3,
    req: {
      minAge: 14,
      maxAge: 21,
      anyCareers: ["administratum", "arbites", "ecclesiarchy_priest"]
    },
    text: "끝없이 쌓인 양피지 더미와 법전 조항을 밤늦도록 외우며 제국의 거대한 율법을 몸에 새겼다. 작은 도장 하나가 수천 명의 운명을 가른다는 사실을 깨달았다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s5_bond_family_1",
    badge: "등불 아래 가정",
    priority: 3,
    req: {
      allTags: ["bond_family"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "고된 일과를 마치고 돌아온 저녁, 배우자가 끓여 놓은 따뜻한 합성 수프 한 그릇 앞에서 모처럼 갑옷과 긴장을 내려놓았다.",
    effect: { stats: { WP: 1, Fel: 1 }, wounds: 3 }
  },
  {
    id: "ch_s5_bond_heir_1",
    badge: "다음 세대",
    priority: 3,
    req: {
      allTags: ["bond_heir"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "자녀가 보낸 삐뚤빼뚤한 첫 안부 편지를 지갑 깊숙이 접어 넣었다. 어두운 은하에서도 살아야 할 이유가 한 줄 더 늘었다.",
    effect: { stats: { WP: 2 }, faith: 1 }
  },
  {
    id: "ch_s5_bond_mortal_contrast",
    badge: "필멸자의 무게",
    priority: 3,
    req: {
      minAge: 35,
      anyTags: ["bond_family", "bond_heir"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "전선 너머로 포성이 울릴 때마다 집에 남겨 둔 식구들의 얼굴이 떠올라 두려웠지만, 바로 그 두려움이 그대를 끝까지 살아남게 만들었다.",
    effect: { stats: { T: 1, WP: 1 } }
  }
);
