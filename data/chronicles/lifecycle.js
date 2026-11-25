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
  },
  // === 16단계 심화 초장수기 · 드레드노트 · 초인 고참기 연대기 (10종) ===
  {
    id: "ch_s16_long_transhuman_160",
    badge: "세기의 노병",
    priority: 3,
    req: {
      minAge: 160,
      anyTags: ["astartes", "custodes", "grey_knight"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "함교에서 경례를 올린 백발의 제국 해군 제독을 바라보다, 그가 백여 년 전 함께 싸웠던 젊은 위관의 증손자라는 사실을 뒤늦게 깨달았다. 필멸자들은 눈 깜짝할 사이에 태어나고 늙어 흙으로 돌아가지만, 초인의 육신은 전장의 먼지 속에서 여전히 한창때의 기력을 유지하고 있다. 덧없는 세월의 강을 건너는 동안 감정은 차츰 무뎌지고, 오직 완수해야 할 의무만이 강철처럼 단단히 남았다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s16_long_transhuman_240",
    badge: "두 세기의 전장",
    priority: 3,
    req: {
      minAge: 240,
      anyTags: ["astartes", "custodes", "grey_knight"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "두 세기 넘게 온갖 행성의 포화를 막아 낸 갑주의 장갑판에는 수십 차례 보수하고 덧댄 흔적이 나이테처럼 겹쳐 있다. 전술 회의에서 젊은 전사들이 신종 위협이라며 긴장하는 적의 기동을 보며, 이미 백팔십 년 전 다른 성계에서 똑같은 수법을 격파했던 기억을 차분히 꺼내 놓았다. 오래 살아남은 전사의 기억 그 자체가 부대를 살리는 가장 값진 무기고다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s16_long_transhuman_320",
    badge: "살아 있는 역사",
    priority: 3,
    req: {
      minAge: 320,
      anyTags: ["astartes", "custodes", "grey_knight"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "전투가 멎은 고요한 밤, 문득 삼백 년 전 어린 필멸자 시절의 얼굴을 떠올려 보았으나 기억 속 윤곽은 안개처럼 흐려져 있었다. 그 자리를 채우고 있는 것은 수백 번의 공성전 좌표와 먼저 떠난 전우들의 이름, 그리고 결코 꺾이지 않는 충성의 맹세뿐이다. 인간다움의 마지막 조각마저 전쟁의 제단에 바쳤지만, 그 고독을 후회할 겨를조차 은하는 허락하지 않는다.",
    effect: { stats: { WP: 1, T: 1 }, faith: 1 }
  },
  {
    id: "ch_s16_long_transhuman_420",
    badge: "사백 년의 전설",
    priority: 3,
    req: {
      minAge: 420,
      maxAge: 2500,
      anyTags: ["astartes", "custodes", "grey_knight"],
      excludeTags: ["dreadnought", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "사백 년의 세월을 전선에서 버텨 낸 전사의 이름은 이미 성계 기록관들 사이에서 전설 속 영웅담처럼 읽히고 있다. 함께 첫 출정을 나섰던 동기들은 모두 성소의 묘비명이 되었으나, 그대만은 여전히 숨을 고르며 새로운 세대의 신병들 앞에 선다. 영원한 전쟁이 끝나는 날까지 안식은 허락되지 않는다는 진실을 담담히 받아들이며 다시 무기를 들었다.",
    effect: { stats: { WP: 1, Inf: 1 }, faith: 2 }
  },
  {
    id: "ch_s16_long_dread_sleep",
    badge: "강철 석관의 수면",
    priority: 3,
    req: {
      allTags: ["dreadnought"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "전투가 끝난 성소 지하에서 테크마린의 나지막한 찬가와 함께 신경 접속 회로가 차례로 차단되었다. 냉각된 양수액 속으로 의식이 가라앉는 순간, 백 년의 침묵과 하루의 휴식이 구분되지 않는 깊은 어둠이 밀려들었다. 육신은 이미 부서졌으나 황제를 향한 의무가 부르는 날이면 이 강철 거신은 다시 깨어날 것이다.",
    effect: { stats: { WP: 1 }, wounds: 2 }
  },
  {
    id: "ch_s16_long_dread_wake",
    badge: "고대인의 각성",
    priority: 3,
    req: {
      allTags: ["dreadnought"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "성유와 전기 불꽃이 석관을 흔들며 동면이 풀리자, 시야창 너머로 한 번도 본 적 없는 젊은 중대장이 경건히 무릎을 꿇고 있었다. 복스 확성기를 통해 쇠를 긁는 듯한 낮고 묵직한 목소리로 현재의 연도와 적의 이름을 물었다. 기억 속 형제들의 이름은 모두 역사가 되었지만, 유압 관절이 굉음을 내며 일어서자 전사의 투지만은 어제처럼 생생히 타올랐다.",
    effect: { stats: { WS: 1, T: 1 }, faith: 1 }
  },
  {
    id: "ch_s16_long_custodes_180",
    badge: "황금의 백팔십 년",
    priority: 3,
    req: {
      minAge: 180,
      allTags: ["custodes"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "백팔십 년 넘는 세월 동안 아우라마이트 흉갑 안쪽에 새긴 개인 명예 칭호가 이제 수십 줄을 넘어섰다. 훈련장에서 모의 침입자를 제압한 뒤 반응 속도가 예전보다 눈 깜짝할 사이만큼 늦어지지 않았는지 스스로 엄격히 계측하며 황궁 방어 논문을 가다듬었다. 세월이 흐를수록 쿠스토데스의 무예는 쇠락하지 않고, 황금 옥좌를 지키는 고요한 완벽함으로 더욱 깊어질 뿐이다.",
    effect: { stats: { Int: 1, WS: 1 }, faith: 1 }
  },
  {
    id: "ch_s16_long_gk_160",
    badge: "은빛의 고참",
    priority: 3,
    req: {
      minAge: 160,
      allTags: ["grey_knight"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    text: "타이탄 성채의 지하 납골당을 천천히 거닐며 백육십 년 동안 함께 악마를 베고 먼저 쓰러진 형제들의 이름이 새겨진 검은 석판을 어루만졌다. 수많은 워프 폭풍과 저주의 현장을 통과했지만, 황제의 유전자를 품은 정신에는 단 한 점의 오점도 스며들지 못했다. 666 성가를 낮게 읊조리며 은빛 갑주의 봉인을 새로 점검하자, 고요하고 흔들림 없는 순수한 신념이 칼끝에 모였다.",
    effect: { stats: { WP: 1, Int: 1 }, faith: 2, corruption: -2 }
  },
  {
    id: "ch_s16_long_mortal_130",
    badge: "세기를 넘긴 필멸자",
    priority: 3,
    req: {
      minAge: 130,
      anyTags: ["rejuvenat", "bionic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "magos", "fabricator_locum", "fabricator_general", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"],
      excludeHomeWorlds: ["krieg"]
    },
    text: "백삼십 년의 세월을 버텨 낸 육신은 이제 값비싼 리주버냇 혈청과 미세한 기계 보조 장치들이 맞물려 움직이는 정교한 유물에 가깝다. 젊은 서기관들이 쓰는 새 말투가 낯설게 들리고, 백 년 전 유행하던 악곡을 기억하는 이조차 주변에 아무도 남지 않았다. 남들보다 두 배 긴 생애를 허락받은 대가로, 제국의 끝없는 업무 속에서 조용한 이방인이 되어 가고 있음을 실감했다.",
    effect: { stats: { Int: 1, WP: 1 }, wounds: -1 }
  },
  {
    id: "ch_s16_long_mortal_170",
    badge: "인간의 경계",
    priority: 3,
    req: {
      minAge: 170,
      anyTags: ["rejuvenat", "bionic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "magos", "fabricator_locum", "fabricator_general", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"],
      excludeHomeWorlds: ["krieg"]
    },
    text: "백칠십 년을 살아 낸 끝에 육신의 고통도, 젊은 날의 격렬한 분노도 이제는 먼 유리 너머의 풍경처럼 아득해졌다. 정기 시술과 의체 점검으로 심장은 여전히 힘차게 뛰고 있으나, 거울 속 창백한 눈동자를 들여다보면 과연 어디까지가 원래의 인간인지 스스로도 가늠하기 어렵다. 그래도 한 세기 반 넘게 축적한 통찰과 인맥 앞에서는 가장 오만한 고위 관료조차 고개를 숙였다.",
    effect: { stats: { Inf: 1, Int: 1 }, wounds: -1 }
  }
);
