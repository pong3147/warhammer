// 분기 사건 — 크리그 전용 (1:1 단독 승격 · 비타-움 정합성 엄수)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_krieg_drill",
    title: "크리그 지하 훈련소의 속죄 서약",
    category: "행성",
    once: true,
    req: {
      minAge: 13,
      maxAge: 19,
      anyWorlds: ["krieg"],
      anyHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 크리그 · 나이 13~19세",
    weight: 28,
    text: "방독면 너머로 차가운 교관의 음성이 울린다. '우리 조상은 황제를 배신했다. 오직 전선에서의 헌신만이 죄를 씻는다.' 실탄이 빗발치는 방사능 폐허 생존 훈련이 시작된다.",
    choices: [
      {
        label: "[의지 판정] 한 치의 주저도 없이 포격 지대를 향해 전진한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "우수한 성적으로 훈련을 마치고 데스 코어 오브 크리그 정예 척탄병 후보로 지목되었다.",
          stats: { WP: 7, T: 5, BS: 5, WS: 4 },
          faith: 12,
          addTags: ["krieg_grenadier"]
        },
        fail: {
          text: "파편에 부상을 입었지만 멈추지 않고 완주했다. 크리그에서 부상은 핑계가 되지 못한다.",
          wounds: -20,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 공병 참호 설계와 화생방 장비 정비에 두각을 나타낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "지하 요새와 공성 포병대 운용 적성을 인정받아 전문 공병으로 배치되었다.",
          stats: { Int: 6, BS: 4, T: 3 }
        },
        fail: {
          text: "지뢰 해체 훈련 중 경미한 폭발에 휘말렸다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ev_krieg_surface_march",
    title: "크리그 — 지상 방사능 황무지의 실전 행군",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      anyHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 크리그",
    weight: 26,
    text: "지하 벙커의 육중한 방폭문이 열리고, 잿빛 핵겨울과 방사능 진흙탕이 끝없이 펼쳐진 크리그 지상으로 120킬로미터 강행군이 선포되었다. 방독면 필터 수명은 딱 48시간뿐이다.",
    choices: [
      {
        label: "[강인 판정] 거친 숨을 고르며 단 한 번도 대열에서 이탈하지 않고 완주한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "방사능 폭풍을 맨몸으로 뚫고 대열 선두로 귀환했다! 진정한 크리그의 강철 육체로 거듭났다.",
          stats: { T: 6, WP: 5 },
          faith: 6
        },
        fail: {
          text: "필터 균열로 방사능 먼지를 들이마셔 피를 토했으나 끝까지 기어 돌아왔다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "[의지 판정] 쓰러진 동료의 군장과 탄약까지 짊어지고 묵묵히 행진한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "장비 손실률 0%! 크리그 장교에게 '가장 효율적인 속죄의 도구'라는 최고의 찬사를 들었다.",
          stats: { WP: 5, T: 4, Inf: 4 }
        },
        fail: {
          text: "과중한 무게에 무릎 인대가 상해 의무동으로 옮겨졌다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Krieg"
  },
  {
    id: "ev_s15_core_krieg_1",
    title: "크리그 — 지하 병기창 검수와 이름 없는 병사들",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 크리그 · 외지 파견자",
    weight: 32,
    text: "외지 파견 인원으로 크리그 지하 벙커의 거대한 병기창과 연대 집결 구역을 시찰하게 되었다. 끝없이 늘어선 회색 외투와 방독면의 대열은 이름 대신 일련번호만 읊조리며 단 한 치의 오차도 없이 십일조 납품량을 초과 달성하고 있다. 훈장도 휴식도 바라지 않는 이들의 섬뜩한 규율에 등골이 서늘해진다.",
    choices: [
      {
        label: "[군수·행정·기계교 전용] 탄약과 방호 장비의 규격 대조 검수를 빈틈없이 마치고 보급 승인 인장을 찍는다",
        req: { anyTags: ["administratum", "mechanicus", "tech_priest", "magos", "officer", "commissar", "lord_commissar", "militarum"] },
        effect: {
          text: "십만 발의 포탄과 예비 방독면 필터까지 불량률 0에 가까운 경이로운 납품 기록을 확인하고 승인을 내렸다. 데파르트멘토 뮤니토룸 본부에 보고할 완벽한 감사 성과를 올렸다.",
          stats: { Int: 5, Inf: 6, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 벙커 생산 장부와 연대 배치표를 꼼꼼히 대조해 제국 전역의 병참 흐름을 파악한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "인간성마저 효율로 치환한 크리그의 경이롭고도 냉혹한 병참 체계를 완벽히 이해했다. 군수 실무 역량이 크게 늘었다.",
          stats: { Int: 6, WP: 4, Inf: 4 }
        },
        fail: {
          text: "잠시 방심한 틈에 방사능 먼지가 묻은 포탄 운반 궤도에 발을 헛디뎌 정강이를 크게 찧고 제독 처치를 받았다.",
          wounds: -15,
          stats: { Int: -1 }
        }
      },
      {
        label: "[의지 판정] 침묵 속에 서 있는 크리그 병참 장교와 마주 서서 흔들림 없이 파견 임무를 마친다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "방독면 렌즈 너머의 공허하고도 단단한 시선을 정면으로 받아넘겼다. 크리그 장교는 짤막한 거수경례와 함께 최상급 여분 방호 필터를 건넸다.",
          stats: { WP: 6, T: 4 },
          faith: 6
        },
        fail: {
          text: "기계처럼 무감정한 침묵과 지하 벙커의 매캐한 약품 냄새에 짓눌려 심한 현기증과 구토에 시달렸다.",
          wounds: -14,
          stats: { WP: -2 }
        }
      }
    ],
    source: "Lexicanum: Krieg / Imperial Armour: Siege of Vraks"
  },
  {
    id: "ev_s15_core_krieg_2",
    title: "크리그 — 방사능 참호선 독가스 누출과 방호벽 봉쇄",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 크리그",
    weight: 30,
    text: "지상 외곽 참호선의 낡은 지반이 내려앉으면서 옛 500년 내전 때 묻힌 독가스 저장관이 파열되었다! 누런 염소 독무와 방사능 진흙이 지하 연결 통로로 쏟아져 들어오고, 방독면 필터가 거칠게 쉭쉭거리며 한계를 알린다. 방호 격벽을 서둘러 봉쇄하지 않으면 하층 대피소 전체가 오염된다.",
    choices: [
      {
        label: "[강인 판정] 독무 속으로 몸을 던져 수동 유압 바퀴를 끝까지 돌려 방호 격벽을 닫는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "살갗을 찌르는 부식성 가스를 방호복 하나로 버텨 내며 끝내 격벽을 완전히 잠갔다! 하층 벙커의 수백 명이 오염을 피했다.",
          stats: { T: 7, WP: 5, Inf: 4 },
          faith: 6
        },
        fail: {
          text: "겨우 격벽을 내렸지만 방독면 틈으로 스며든 독가스에 폐가 타들어 가는 듯한 손상을 입고 의무동에 실려 갔다.",
          wounds: -24,
          stats: { T: -2 }
        }
      },
      {
        label: "[지성 판정] 비상 배기 팬을 역가동하고 제독 분무관을 연결해 독가스 확산을 차단한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "통풍 압력을 역전시켜 독무를 지상 배기구로 밀어내는 데 성공했다! 공병대 장교가 냉정하게 효율적인 조치였다고 기록했다.",
          stats: { Int: 6, Inf: 4, T: 2 }
        },
        fail: {
          text: "부식된 밸브가 터지면서 독성 액체가 장갑과 팔뚝에 튀어 심각한 화학 화상을 입었다.",
          wounds: -20,
          stats: { Ag: -2 }
        }
      },
      {
        label: "[민첩 판정] 파열 지점에 남겨진 예비 필터 상자와 통신기를 회수해 신속히 후방 격벽으로 빠진다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "독무가 차오르기 직전에 필수 장비를 챙겨 후방 격벽을 통과했다. 보급 손실 없이 방어선을 재정비할 수 있었다.",
          stats: { Ag: 6, T: 3 }
        },
        fail: {
          text: "미끄러운 방사능 진흙에 발이 걸려 넘어지며 방독면 호스가 찢어져 독성 먼지를 들이마셨다.",
          wounds: -18,
          stats: { T: -1 }
        }
      }
    ],
    source: "Lexicanum: Krieg / Imperial Armour: Siege of Vraks"
  },
  {
    id: "ev_s15_core_krieg_3",
    title: "크리그 — 어스셰이커 공성 포대 실사격과 탄약 호송",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 크리그",
    weight: 29,
    text: "크리그 공성 포병대 훈련장에서 수십 문의 어스셰이커 대포가 대지를 찢는 굉음과 함께 쉴 새 없이 실탄 포격을 퍼붓고 있다. 진흙 구덩이에 바퀴가 빠진 포탄 견인차가 멈춰 서자, 포대장 교관은 단 1초의 포격 지연도 용납하지 않겠다며 탄약 수송과 포신 장전을 독촉한다.",
    choices: [
      {
        label: "[군수·기계교·무관 전용] 사격 제원을 재계산하고 보조 견인선을 전개해 포격 주기를 유지한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "mechanicus", "tech_priest", "magos", "krieg_grenadier"] },
        effect: {
          text: "교대 포대의 발사 간격을 미세하게 조정하는 사이 진흙 속 견인차를 끌어올렸다. 예정된 화력 밀도가 단 한 발도 비지 않았다!",
          stats: { BS: 5, Int: 5, Inf: 4 }
        }
      },
      {
        label: "[강인 판정] 거대한 어스셰이커 포탄을 어깨에 메고 진흙 경사면을 뛰어올라 직접 포대에 나른다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "고막이 터질 듯한 포성 속에서도 흔들리지 않고 탄약 보급선을 이어 냈다! 크리그 포병들이 말없이 고개를 끄덕였다.",
          stats: { T: 6, WS: 3, WP: 4 }
        },
        fail: {
          text: "무거운 포탄을 나르다 허리와 어깨를 심하게 삐끗해 진흙탕에 쓰러졌고, 포성 충격파에 귀까지 멍멍해졌다.",
          wounds: -20,
          stats: { T: -1 }
        }
      },
      {
        label: "[사격 판정] 전방 관측 참호에서 탄착 지점을 정밀 수정해 낭비되는 포탄을 줄인다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "바람과 포신 마모까지 계산한 정확한 탄착 보정으로 절반의 탄약만으로 표적 구역을 완전히 초토화했다!",
          stats: { BS: 7, Int: 4, Inf: 3 }
        },
        fail: {
          text: "측정 오차로 포탄 한 발이 아군 관측 참호 너무 가까이에 떨어져 흙더미와 파편을 뒤집어썼다.",
          wounds: -22,
          stats: { BS: -1 }
        }
      }
    ],
    source: "Lexicanum: Death Korps of Krieg / Imperial Armour Volume 5"
  },
  {
    id: "ev_s15_core_krieg_4",
    title: "크리그 — 성간 원정 파병 전야의 무언의 사열",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["krieg"],
      anyHomeWorlds: ["krieg"],
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "militarum_officer"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 크리그 · 크리그 출생 · 밀리타룸/방위군 · 16세 이상",
    weight: 34,
    text: "궤도 수송선이 잿빛 구름을 뚫고 착륙장에 내려앉았다. 성간 원정 파병을 앞둔 수만 명의 크리그 병사들이 배웅하는 이 하나 없는 회색 광장에 서서 말없이 군장을 점검한다. 야전삽, 루시우스 제식 라스건, 방독면 예비 필터, 그리고 이름 대신 새겨진 인식표 번호까지 모든 것은 오직 황제께 바칠 속죄를 위해 준비되었다.",
    choices: [
      {
        label: "[의지 판정] 선봉 돌격 중대 지원을 신청하고 속죄 서약문을 소리 내어 복창한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "단 한 점의 두려움도 없는 결연한 태도를 인정받아 정예 척탄병 편성 명단에 올랐다. 이제 죽음조차 임무의 일부일 뿐이다.",
          stats: { WP: 7, T: 5, WS: 4, Inf: 4 },
          faith: 12,
          addTags: ["krieg_grenadier"]
        },
        fail: {
          text: "선발 실기 점검 도중 무리하게 전속력으로 장애물을 돌파하다 무릎을 다쳐 일반 보병 중대로 배정되었다.",
          wounds: -16,
          stats: { WP: 3, T: -1 },
          faith: 4
        }
      },
      {
        label: "[지성 판정] 분대 전체의 방독면 밀폐 상태와 탄약 배낭 무게를 마지막 한 번까지 정밀 점검한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "불량 필터 두 개와 라스건 전지팩 접촉 불량을 출항 직전에 찾아내 교체했다. 사열 장교가 빈틈없는 군기 유지로 표창을 기록했다.",
          stats: { Int: 6, BS: 4, Inf: 4 }
        },
        fail: {
          text: "고압 냉각 가스통 밸브를 점검하던 중 누설된 냉각 가스에 손등이 얼어붙는 동상을 입었다.",
          wounds: -14,
          stats: { Ag: -2 }
        }
      },
      {
        label: "묵묵히 방독면을 조여 매고 지정된 번호 대열에 맞춰 수송선으로 행진한다",
        effect: {
          text: "크리그의 잿빛 대지를 뒤로하고 묵묵히 발걸음을 옮겼다. 돌아올 생각은 없다. 오직 황제의 적 앞에서 쓰러져 빚을 갚을 뿐이다.",
          stats: { WP: 4, T: 3 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Death Korps of Krieg / Dead Men Walking"
  }
);
