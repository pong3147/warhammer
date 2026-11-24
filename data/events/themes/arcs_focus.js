// 분기 사건 — 연간 삶의 초점(1·2막) · 명예/전역 태그 연작 · 특수 혈통 · 선천 자질
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_blank_recruit",
    title: "영혼 없는 자를 찾는 검은 인장",
    category: "특수",
    once: true,
    req: { minAge: 16, allTags: ["blank"], excludeTags: ["inquisition_agent", "inquisitor", "astartes", "custodes", "grey_knight", "magos", "rogue_trader", "canoness", "lord_commissar"] },
    reqLabel: "자질: 블랭크(퍼라이어) · 16세+",
    weight: 28,
    text: "평생 주변 사람들에게 이유 없는 혐오를 받아 왔던 그대 앞에, 로제트를 품은 오르도 말레우스 이단심문관이 나타났다. '워프의 괴물들 앞에서 흔들리지 않는 너의 공허한 영혼은 제국의 가장 귀한 무기다. 나와 함께하겠느냐?'",
    choices: [
      {
        label: "이단심문관의 제안을 수락해 이단심문소 어콜라이트가 된다",
        effect: {
          text: "평생의 저주였던 블랭크 체질이 최고의 축복으로 바뀌었다! 악마와 이단 사냥꾼의 길에 들어섰다.",
          forceCareer: "inquisition_acolyte",
          stats: { WP: 8, Int: 5, Inf: 12 },
          addTags: ["inquisition_agent", "daemon_bane"]
        }
      },
      {
        label: "자유로운 용병·방랑자의 삶을 고집하며 거절한다",
        effect: {
          text: "이단심문관은 아쉬워하며 비밀 연락 암호만 남기고 떠났다.",
          stats: { WP: 4, Inf: 4 },
          addTags: ["inquisition_favor"]
        }
      }
    ],
    source: "Lexicanum: Blank / Eisenhorn & Ravenor"
  },
  {
    id: "ev_ogryn_loyalty",
    title: "오그린의 묵직한 충성",
    category: "특수",
    req: { minAge: 16, allTags: ["ogryn"] },
    reqLabel: "자질: 앱휴먼(오그린)",
    weight: 18,
    text: "적의 중화기 진지가 아군 소대를 향해 불을 뿜고 있다! 커미사르가 손가락으로 벙커를 가리키며 외친다. '저기 나쁜 놈들을 치워라, 황제 폐하께서 보신다!'",
    choices: [
      {
        label: "[강인 판정] 리퍼 건을 쏘며 벙커 벽을 맨몸으로 들이받아 부순다",
        check: { stat: "T", diff: 10 },
        success: {
          text: "철근 콘크리트 벽을 어깨로 뚫고 들어가 적을 전부 날려 버렸다! 커미사르가 특대형 배급과 황금 스티커 훈장을 안겨 주었다.",
          stats: { T: 6, WS: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "총탄을 수십 발 맞고 쓰러졌지만 튼튼한 가죽 덕분에 며칠 만에 벌떡 일어났다.",
          wounds: -20,
          stats: { T: 4 }
        }
      }
    ],
    source: "Lexicanum: Ogryn"
  },
  {
    id: "ev_arc_penal_redemption",
    title: "징벌 연대의 속죄 — 폭발 목걸이를 찬 최전선 돌격",
    category: "군사",
    once: true,
    req: { allTags: ["penal_mark"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    reqLabel: "이력: 징벌 부대 낙인",
    weight: 38,
    text: "목덜미에 채워진 징벌 부대 폭발 목걸이가 차갑게 빛난다. 지휘관은 지뢰밭 너머 적 중화기 벙커를 가리키며 외친다. '저 진지를 날려 버리고 살아 돌아오는 자에게는 황제의 사면을 내린다. 뒤돌아서는 자는 목이 날아갈 뿐이다!'",
    choices: [
      {
        label: "[백병 판정] 포연을 뚫고 적 벙커 총안에 수류탄을 꽂아 넣어 전과로 당당히 사면장을 쟁취한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "지옥 같은 탄막을 돌파해 벙커를 폭파시켰다! 커미사르가 직접 폭발 목걸이를 풀어 주며 '황제께서 네 죄를 씻으셨다'고 선언했다.",
          stats: { WS: 7, T: 6, Inf: 8 },
          faith: 8
        },
        fail: {
          text: "철조망과 파편에 온몸이 찢겼으나, 죽을힘으로 벙커를 무력화한 공을 인정받아 목숨만은 건졌다.",
          wounds: -24,
          stats: { T: 4 }
        }
      },
      {
        label: "[민첩 판정] 정면 돌격 대신 무너진 배수로를 기어 우회해 적 탄약고를 폭파하고 생환한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "단 한 발의 총탄도 맞지 않고 적의 후방 탄약고를 날려 버렸다! 징벌병들 사이에서 살아남는 귀신으로 통하게 되었다.",
          stats: { Ag: 7, BS: 5, Inf: 5 }
        },
        fail: {
          text: "배수로 천장이 포격에 무너져 내려 큰 타박상을 입은 채 겨우 아군 참호로 기어 돌아왔다.",
          wounds: -20,
          stats: { Ag: 2 }
        }
      },
      {
        label: "폭발 목걸이가 작동하지 않도록 명령대로 최전선 탄약 상자를 나르며 묵묵히 하루를 버틴다",
        effect: {
          text: "화려한 사면은 얻지 못했으나, 수많은 징벌병이 쓰러지는 포화 속에서 오늘도 살아남았다.",
          stats: { T: 5, WP: 4 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Penal Legion / Last Chancers"
  },
  {
    id: "ev_arc_lost_home_vigil",
    title: "부서진 고향의 추모제 — 살아남은 자의 무게",
    category: "생존자",
    once: true,
    req: { anyTags: ["cadia_stands", "baal_survivor", "tanith_survivor"], excludeTags: ["heretic"] },
    reqLabel: "이력: 카디아·바알·타니스 생존자",
    weight: 34,
    text: "고향 행성이 불타거나 쪼개진 날로부터 세월이 흘렀다. 주둔지 외곽의 소박한 석비 앞에 같은 별에서 살아남은 생존자들이 하나둘 모여들어, 주머니 깊숙이 간직해 온 고향의 흙과 전사한 전우들의 인식표를 올려두고 있다.",
    choices: [
      {
        label: "[교섭 판정] 생존자들과 함께 고향의 이름을 외치며 신병들에게 결코 꺾이지 않는 의지를 물려준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'행성은 부서졌어도 우리는 여전히 서 있다!' 떨리는 목소리로 이어진 합창이 부대 전체의 가슴에 지워지지 않는 불씨를 지폈다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "목이 메어 연설을 끝맺지 못했으나, 침묵 속에 어깨를 두드려 주는 생존자들의 눈빛이 깊은 위안이 되었다.",
          stats: { WP: 4, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 밤마다 찾아오는 궤도 포격과 비명의 악몽을 정면으로 마주하고 산 자의 책임을 맹세한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "생존자의 죄책감을 강철 같은 결의로 벼려 냈다! 워프의 절망조차 비집고 들어올 틈 없는 정신력을 얻었다.",
          stats: { WP: 9, T: 4 },
          corruption: -8
        },
        fail: {
          text: "지독한 악몽과 불면이 며칠간 이어지며 기력이 쇠했으나, 다시 총을 쥐고 일어섰다.",
          wounds: -10,
          stats: { WP: 3 }
        }
      },
      {
        label: "말없이 아퀼라 성호를 긋고 추모비 앞에 낡은 탄피 하나를 내려둔 채 자리로 돌아간다",
        effect: {
          text: "떠나간 이들의 이름은 영원히 잊히지 않을 것이다. 가슴속 무거운 침묵이 오늘도 그대를 앞으로 걷게 한다.",
          stats: { WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Fall of Cadia / Devastation of Baal / Gaunt's Ghosts"
  },
  {
    id: "ev_arc_veteran_relic_recall",
    title: "전장의 증표 — 옛 전우가 남긴 암호 상자",
    category: "베테랑",
    once: true,
    req: {
      anyTags: ["vraks_veteran", "badab_veteran", "rift_survivor", "deathwatch_vet", "space_hulk_vet"],
      excludeTags: ["heretic"]
    },
    reqLabel: "이력: 대전역·특수작전 베테랑",
    weight: 32,
    text: "생사를 넘나들던 과거 대전역에서 등을 맞대고 싸웠던 옛 전우의 유품 상자가 아드미니스트라툼 지연 우편으로 수년 만에 배달되었다. 녹슨 자물쇠 안에는 손상된 전술 기록 슬레이트와 정교하게 손질된 마스터 크래프트 무기 부속품이 들어 있다.",
    choices: [
      {
        label: "[지성 판정] 손상된 전술 기록을 복원해 당시 작전의 보급 누락과 은폐된 공훈을 바로잡는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "전우가 목숨 걸고 기록한 좌표를 복구해 부대의 명예와 누락된 훈장을 되찾아 주었다! 상급 사령부도 그대의 집념을 높이 샀다.",
          stats: { Int: 6, Inf: 8, WP: 4 }
        },
        fail: {
          text: "행정 문서의 절반은 이미 파기되어 공식 정정은 무산되었으나, 진실만은 그대의 기억 속에 온전히 남았다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 옛 전우의 명품 무기 부속을 직접 정비·장착해 사격장에서 실전 감각을 극한까지 되살린다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "손에 착 감기는 완벽한 조준 감각이 되살아났다! 옛 전우의 몫까지 한 발도 헛되이 쏘지 않으리라 다짐했다.",
          stats: { BS: 6, WS: 4, WP: 4 }
        },
        fail: {
          text: "노후화된 공이치기가 오작동해 손등을 다쳤으나, 정성껏 수리해 끝내 무기를 되살려 냈다.",
          wounds: -8,
          stats: { BS: 2 }
        }
      },
      {
        label: "유품을 기름천으로 닦아 소중히 간직하며 전우의 영혼이 황금 옥좌 곁에서 안식하길 기도한다",
        effect: {
          text: "수조 명의 병사가 스쳐 가는 제국에서 누군가를 끝까지 기억해 주는 것 자체가 작은 기적이다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Only War / Imperial Armour: Siege of Vraks & Badab War"
  },
  {
    id: "ev_focus_survival",
    title: "생존의 법칙 — 오염 구역의 정수 필터와 비상 약품",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["survival"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "삶의 초점: 생존과 보양",
    weight: 26,
    text: "몸을 돌보며 하루하루를 버티는 데 전념하던 중, 거주 구역 상수도관에 공업 폐수가 섞여 들며 주민들 사이에서 기침병이 돌기 시작했다. 미리 모아 둔 예비 부품과 약품이 생사를 가를 순간이 왔다.",
    choices: [
      {
        label: "[강인 판정] 직접 호흡 필터와 비상 약품을 조합해 독기를 이겨 내는 완벽한 보양 체계를 갖춘다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "오염된 공기와 물 속에서도 끄떡없는 강철 같은 체력을 다졌다! 장기 생존에 큰 밑천을 확보했다.",
          stats: { T: 6 },
          wounds: 18,
          lifeBonusExtra: 6
        },
        fail: {
          text: "여과 필터 교체 도중 유독 가스를 마셔 며칠간 앓아누웠으나, 덕분에 독성에 대한 요령은 몸에 배었다.",
          wounds: -10,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 배급 정제수와 시체 녹말의 오염 성분을 분석해 구역 주민들에게 안전한 끓임 수칙을 알린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "간단한 침전 여과법만으로 수십 명의 목숨을 구했다! 이웃들이 감사의 뜻으로 귀한 식량과 약초를 나누어 주었다.",
          stats: { Int: 5, Fel: 4 },
          wounds: 12
        },
        fail: {
          text: "임시 분석 도구가 망가져 소소한 손해를 보았으나, 스스로의 식수만은 안전하게 걸러 냈다.",
          wounds: -6,
          stats: { Int: 2 }
        }
      },
      {
        label: "무리하지 않고 미리 비축해 둔 정제수와 식량으로 조용히 체력을 아끼며 고비를 넘긴다",
        effect: {
          text: "욕심내지 않고 몸을 보전한 덕에 유행병이 휩쓸고 간 뒤에도 멀쩡히 살아남았다.",
          stats: { T: 3 },
          wounds: 14
        }
      }
    ],
    source: "Imperium Maledictum / Warhammer 40k Daily Life"
  },
  {
    id: "ev_focus_combat",
    title: "피와 강철의 연마 — 베테랑 교관의 실전 대련장",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["combat"] },
    reqLabel: "삶의 초점: 무예와 전투 훈련",
    weight: 26,
    text: "쉬지 않고 무예를 갈고닦던 훈련장에 백전노장 교관이 나타나 팔짱을 꼈다. '허수아비만 베어서는 진짜 전장에서 삼 초도 못 버틴다. 진짜 살기를 견딜 배짱이 있다면 내 실전 코스에 올라와 보라.'",
    choices: [
      {
        label: "[백병 판정] 둔화 날을 씌운 모의 체인블레이드로 교관과 정면 근접 대련을 벌인다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불꽃이 튀는 공방 끝에 교관의 빈틈을 찔러 무기를 쳐 냈다! 훈련장 전체에 환호가 터지며 실전 감각이 한 단계 도약했다.",
          stats: { WS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "교관의 노련한 반격에 바닥을 굴러 멍투성이가 되었으나, 뼈아픈 실전 교훈이 근육에 새겨졌다.",
          wounds: -14,
          stats: { WS: 3 }
        }
      },
      {
        label: "[사격 판정] 연막과 이동 표적이 뒤섞인 실탄 장애물 코스를 단 한 발의 오차 없이 돌파한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "연막 너머로 튀어나온 표적 열두 개를 숨 쉴 틈 없이 꿰뚫었다! 교관이 말없이 탄창 하나를 던져 주며 엄지를 세웠다.",
          stats: { BS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "도탄 파편에 팔을 스쳐 상처를 입었으나, 끝까지 코스를 완주해 사격 리듬을 다잡았다.",
          wounds: -10,
          stats: { BS: 3 }
        }
      },
      {
        label: "무리한 대결을 피하고 기본 방어 자세와 보법을 천 번씩 반복 숙달한다",
        effect: {
          text: "화려하진 않지만 전장에서 목숨을 지켜 주는 것은 결국 뼈에 밴 기본기다. 흔들림 없는 자세가 몸에 익었다.",
          stats: { WS: 3, BS: 3, T: 3 }
        }
      }
    ],
    source: "Only War / Dark Heresy: Martial Drill"
  },
  {
    id: "ev_focus_faith",
    title: "황제 신앙의 시험 — 성소 촛불과 의심의 밤",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["faith"], excludeTags: ["heretic"] },
    reqLabel: "삶의 초점: 황제 신앙과 기도",
    weight: 26,
    text: "끝없는 전쟁과 부조리가 가득한 은하계 속에서 기도에 매달리던 어느 폭풍우 치는 밤, 성소의 촛불이 일제히 흔들리며 '황제께서 정말 우리처럼 미천한 자의 기도를 들으시는가' 하는 서늘한 의심이 마음속을 파고든다.",
    choices: [
      {
        label: "[의지 판정] 차가운 석조 바닥에 밤새 무릎 꿇고 성가를 암송하며 내면의 의심과 워프 잔재를 씻어 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "동이 틀 무렵 마음속의 안개가 말끔히 걷히고 흔들리지 않는 황금빛 확신이 자리 잡았다! 정신의 오염까지 크게 정화되었다.",
          stats: { WP: 7 },
          faith: 14,
          corruption: -10
        },
        fail: {
          text: "밤샘 고행 끝에 무릎과 몸살로 탈진했으나, 새벽 종소리와 함께 신앙의 불씨만은 지켜 냈다.",
          wounds: -10,
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 폭풍에 겁먹어 성소에 모여든 시민과 병사들 앞에서 황제의 가호를 힘차게 설파한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "그대의 진심 어린 기도가 군중의 공포를 용기로 바꾸어 놓았다! 지역 사제가 그대의 신심을 크게 치하했다.",
          stats: { Fel: 6, Inf: 5 },
          faith: 10
        },
        fail: {
          text: "목소리가 갈라져 크게 호응을 얻진 못했으나, 함께 기도한 소수의 이들과 따뜻한 연대를 나누었다.",
          stats: { Fel: 2 },
          faith: 4
        }
      },
      {
        label: "묵묵히 아퀼라 성호를 긋고 소박한 밀랍 초 하나를 봉헌하며 고요한 위안을 얻는다",
        effect: {
          text: "거창한 기적은 없었으나, 작은 불꽃을 바라보는 사이 흔들리던 마음이 잔잔히 가라앉았다.",
          stats: { WP: 3 },
          faith: 8,
          corruption: -4
        }
      }
    ],
    source: "Lexicanum: Imperial Cult / Ecclesiarchy"
  },
  {
    id: "ev_focus_lore",
    title: "잊혀진 서고의 단편 — 고대 하이 고딕 사본 해독",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["lore"], excludeWorldTags: ["feral"] },
    reqLabel: "삶의 초점: 학문과 기계 교리",
    weight: 26,
    text: "학문과 기계 교리에 몰두하던 중, 먼지 쌓인 아드미니스트라툼 폐기 서고 구석에서 3천 년 전 성계 항로와 기계 정비 주석이 뒤섞인 고대 하이 고딕 양피지 묶음을 발견했다. 다만 마지막 장에는 붉은 인장으로 검열 표시가 찍혀 있다.",
    choices: [
      {
        label: "[지성 판정] 난해한 고대 약어와 이진법 주석을 정밀 해독해 잊혀진 보급 항로와 정비 기법을 복원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 항해 수칙과 정밀 정비 공식을 완벽히 복원해 학계와 행정부의 주목을 한 몸에 받았다!",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "며칠 밤을 새우다 곰팡이 포자를 들이마셔 눈과 폐를 상했으나, 귀한 필사 메모 몇 장은 건졌다.",
          wounds: -6,
          stats: { Int: 3 }
        }
      },
      {
        label: "[의지 판정] 붉은 검열 장에 숨겨진 불경한 워프 주석을 즉시 식별해 규정대로 봉인·신고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "유혹적인 금서를 읽지 않고 즉시 정화 절차를 밟았다! 서고 감찰관이 그대의 철저한 정통성을 높이 평가했다.",
          stats: { WP: 6, Int: 4 },
          faith: 6,
          corruption: -5
        },
        fail: {
          text: "봉인 도중 기괴한 도형을 잠깐 들여다보는 바람에 며칠간 머릿속에서 불쾌한 숫자가 맴돌았다.",
          stats: { Int: 4 },
          corruption: 6
        }
      },
      {
        label: "위험해 보이는 검열 장은 아예 펼치지 않고 안전한 실무 행정과 기계 교리 부분만 필사한다",
        effect: {
          text: "쓸데없는 화를 피하면서도 실무에 당장 쓰일 탄탄한 지식을 차곡차곡 쌓아 올렸다.",
          stats: { Int: 5, WP: 2 }
        }
      }
    ],
    source: "Dark Heresy: Scholastic Lore / Adeptus Administratum"
  },
  {
    id: "ev_focus_politics",
    title: "권력의 연회장 — 파벌 청탁과 비밀 서신",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["politics"],
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "삶의 초점: 인맥과 출세 도모",
    weight: 26,
    text: "인맥을 넓히며 출세를 도모하던 중, 상층 첨탑의 비공개 연회에 초대받았다. 상인 길드장과 행정국 서기관 파벌이 십일조 운송권을 두고 은밀히 칼날을 겨누는 가운데, 양쪽 모두 그대에게 자기편의 메신저가 되어 달라며 금화 주머니와 승진 추천서를 내민다.",
    choices: [
      {
        label: "[교섭 판정] 양측의 체면을 모두 세워 주는 절묘한 공동 배분안을 제안해 든든한 후원자를 얻는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "노련한 중재 솜씨에 길드장과 고위 행정관 모두가 감탄하며 그대를 핵심 인맥으로 끌어들였다! 출세의 문이 활짝 열렸다.",
          stats: { Fel: 7, Inf: 9 }
        },
        fail: {
          text: "어느 쪽도 완전히 만족시키지 못해 양쪽의 냉대를 받으며 연회장을 빠져나와야 했다.",
          stats: { Inf: -4, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 청탁 서신에 숨은 허위 수치를 간파해 상대 파벌의 횡령 약점을 조용히 손에 쥔다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치명적인 장부 조작 증거를 쥐고 협상 테이블을 주도했다! 그대의 이름 석 자가 상층 사교계에 무게 있게 오르내린다.",
          stats: { Int: 6, Inf: 8 }
        },
        fail: {
          text: "함정 서신에 걸려 정적이 보낸 청부업자의 습격을 받고 겨우 빠져나왔다.",
          wounds: -12,
          stats: { Inf: -4 }
        }
      },
      {
        label: "어느 파벌에도 깊이 얽히지 않고 예의 바른 미소와 중립으로 안전하게 인맥만 다진다",
        effect: {
          text: "권력 다툼의 피바람을 피하면서도 여러 유력 인사들과 무난한 안면을 트는 데 성공했다.",
          stats: { Fel: 4, Inf: 4 }
        }
      }
    ],
    source: "Imperium Maledictum: Patronage & Factions"
  },
  {
    id: "ev_focus_forbidden",
    title: "금단의 서가 — 자정의 밀매상과 봉인된 워프 두루마리",
    category: "삶의 초점",
    once: true,
    req: { minAge: 16, anyFocus: ["forbidden"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "삶의 초점: 금단의 지식 탐구",
    weight: 30,
    text: "제국이 금기시한 지식을 파고들던 소문이 어둠 속까지 흘러 들어갔다. 자정이 넘은 뒷골목에서 얼굴을 가린 금서 밀매상이 납 상자를 열어 보이며, 고대 워프 항법과 외계 비술이 적힌 두루마리를 건네려 한다.",
    choices: [
      {
        label: "[지성 판정] 밀매상이 내민 금지된 두루마리를 해독해 필멸자의 상식을 뛰어넘는 통찰을 흡수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "불타는 듯한 문자가 뇌리에 각인되며 워프와 현실의 이면에 대한 경이로운 지혜를 얻었다! 단, 영혼에 짙은 그림자가 달라붙었다.",
          stats: { Int: 10, WP: 5 },
          corruption: 14
        },
        fail: {
          text: "두루마리에 걸린 정신 저주가 폭발해 코피를 쏟으며 쓰러졌고, 끔찍한 환청이 한동안 사라지지 않았다.",
          wounds: -14,
          corruption: 18
        }
      },
      {
        label: "[의지 판정] 이단심문소의 함정 수사일 가능성을 간파하고 밀매상을 제압해 감찰관에게 넘긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "밀매상을 묶어 심문소 지부에 인계했다! 오히려 철저한 위장 수사로 호평받으며 그간의 의혹을 털어 내고 신임까지 얻었다.",
          stats: { WP: 7, Inf: 8 },
          corruption: -10,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "밀매상이 숨겨 둔 독단검에 찔려 부상을 입은 사이 어둠 속으로 도망치고 말았다.",
          wounds: -18,
          corruption: 6
        }
      },
      {
        label: "위험한 거래를 단칼에 거절하고 서둘러 어두운 골목을 빠져나온다",
        effect: {
          text: "지식의 유혹보다 목숨이 중하다. 차가운 밤바람을 맞으며 위험한 호기심을 잠시 억눌렀다.",
          stats: { WP: 4, Ag: 3 },
          corruption: -4
        }
      }
    ],
    source: "Dark Heresy: Forbidden Lore"
  },
  {
    id: "ev_s2_origin_navigator_warp",
    title: "나비스 노빌리테 — 제3의 눈으로 마주한 워프 폭풍과 가문 암투",
    category: "특수 혈통",
    once: true,
    req: { minAge: 16, allTags: ["navigator"] },
    reqLabel: "출신: 나비스 노빌리테 항해사",
    weight: 40,
    text: "이마의 비단 띠를 풀고 워프의 격랑을 직시하는 순간, 거대한 워프 폭풍이 함선을 집어삼키려 달려든다. 설상가상으로 항해실 밖에서는 독점 항해 계약을 노리는 경쟁 나비스 노빌리테 가문의 암살 첩보까지 전해졌다.",
    choices: [
      {
        label: "[의지 판정] 찢어지는 워프 폭풍 너머 아스트로노미칸의 미약한 불빛을 끝까지 붙들어 함대를 구해 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "제3의 눈에서 피눈물이 흐르는 고통을 견뎌 내고 함선 전체를 무사히 실우주로 이끌었다! 선장과 가문 원로가 무릎 꿇고 경의를 표했다.",
          stats: { WP: 9, Int: 6, Inf: 10 }
        },
        fail: {
          text: "워프의 광기가 제3의 눈을 할퀴어 심각한 두통과 돌연변이 징후가 심화되었으나, 함선만은 무사히 빠져나왔다.",
          wounds: -20,
          corruption: 8
        }
      },
      {
        label: "[교섭 판정] 경쟁 가문의 독살 시도를 역이용해 해군 제독과의 최우선 항해 독점 계약을 따낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "테라 항해사 의회에 증거를 들이밀어 정적 가문을 실각시키고 막대한 영예와 지분을 거머쥐었다!",
          stats: { Fel: 7, Int: 5, Inf: 10 }
        },
        fail: {
          text: "가문 간 암투 도중 호위병을 잃고 부상을 입었으나, 항해사로서의 위신은 지켜 냈다.",
          wounds: -16,
          stats: { Inf: -4 }
        }
      },
      {
        label: "제3의 눈을 단단히 감추고 검증된 단거리 안전 항로만 택해 혈통과 목숨을 보전한다",
        effect: {
          text: "성급한 모험보다 나비스 노빌리테의 고귀한 혈통을 이어 가는 것이 먼저다. 안전하게 목적지에 닿았다.",
          stats: { WP: 5, Inf: 5 }
        }
      }
    ],
    source: "Lexicanum: Navis Nobilite / Rogue Trader RPG"
  },
  {
    id: "ev_s2_trait_blank_isolation",
    title: "블랭크의 고독 — 본능적 혐오와 침묵의 자매들의 시선",
    category: "선천 자질",
    once: true,
    req: { minAge: 14, allTags: ["blank"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "자질: 블랭크(퍼라이어)",
    weight: 38,
    text: "영혼의 메아리가 없는 블랭크의 기운 때문에 평범한 시민들은 이유도 모른 채 그대 곁에서 본능적인 구역질과 혐오를 느끼며 피해 간다. 그러던 어느 날, 시장에서 미등록 사이커가 폭주해 불길을 뿜자 오직 그대만이 아무렇지 않게 걸어 들어갈 수 있었다.",
    choices: [
      {
        label: "[의지 판정] 공허의 오라로 폭주한 사이커의 워프 불꽃을 단숨에 꺼뜨리고 당당히 제압한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "사이커가 비명을 지르며 무릎 꿇는 광경에 군중이 경악했다! 혐오받던 저주가 수많은 목숨을 구한 축복으로 증명되었다.",
          stats: { WP: 8, Inf: 7 },
          corruptionReset: true
        },
        fail: {
          text: "사이커가 휘두른 쇠파이프에 맞아 다쳤으나, 워프 폭주 자체는 완벽히 무력화했다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 사건 직후 침묵의 수화(Thoughtmark)로 다가온 '침묵의 자매들' 연락관과 비밀 협력을 약조한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "황금 갑주의 여전사가 조용히 고개를 끄덕이며 공허의 동족에게 깊은 경의와 보호 인장을 남겼다!",
          stats: { Fel: 6, Inf: 9, WP: 5 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "수화의 뜻을 절반밖에 이해하지 못했으나, 적어도 혼자가 아니라는 깊은 위안을 얻었다.",
          stats: { WP: 4, Inf: 3 }
        }
      },
      {
        label: "사람들의 웅성거림을 뒤로하고 조용히 군중 틈을 빠져나와 고독한 평온을 지킨다",
        effect: {
          text: "누구도 그대를 이해하지 못하지만, 어떤 악마도 그대의 영혼에 손댈 수 없다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Blank / Sisters of Silence"
  },
  {
    id: "ev_s2_trait_ratling_sniper",
    title: "래틀링 — 야전 취사장의 밀수 향신료와 팔백 미터 저격",
    category: "선천 자질",
    once: true,
    req: { minAge: 14, allTags: ["ratling"] },
    reqLabel: "자질: 래틀링(앱휴먼)",
    weight: 38,
    text: "작은 키와 곱슬머리 때문에 순수 인류 병사들에게 종종 놀림받지만, 래틀링의 매서운 저격 솜씨와 천재적인 요리·조달 능력은 전선에서 누구도 대신할 수 없다. 오늘도 적 저격수가 아군 참호를 묶어 놓고 있다.",
    choices: [
      {
        label: "[사격 판정] 800미터 너머 폐허 창문 틈으로 숨은 적 저격수의 이마를 롱 라스 한 발로 꿰뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "바람 계산까지 완벽한 단 한 발! 환호하는 병사들이 그대를 목마 태우며 두둑한 배급을 몰아 주었다.",
          stats: { BS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "적의 반격탄이 엄폐물 옆을 스쳐 팔을 다쳤으나, 재장전 끝내 적 저격수를 쫓아냈다.",
          wounds: -14,
          stats: { BS: 3 }
        }
      },
      {
        label: "[교섭 판정] 어디서 구했는지 모를 진짜 향신료와 고기로 장교단 만찬을 차려 주고 특권을 챙긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'이 래틀링 없으면 연대가 굶어 죽는다!' 장교단의 총애 속에 합법적 휴가와 넉넉한 비상 식량을 얻었다.",
          stats: { Fel: 7, Inf: 7 },
          wounds: 10
        },
        fail: {
          text: "보급 창고에서 슬쩍한 향신료 출처가 들통나 사흘간 감자 깎기 징계를 받았다.",
          stats: { Inf: -4, Ag: 3 }
        }
      },
      {
        label: "작은 체구로 포탄이 닿지 않는 참호 구석에 숨어 따뜻한 스튜를 끓이며 여유를 즐긴다",
        effect: {
          text: "래틀링의 철학은 단순하다. 배부르게 먹고, 절대 탄환 앞에 서지 말 것!",
          stats: { Ag: 4, T: 4 },
          wounds: 8
        }
      }
    ],
    source: "Lexicanum: Ratling / Codex: Astra Militarum"
  },
  {
    id: "ev_s2_trait_ogryn_bonehead",
    title: "오그린 — 본헤드(BONEhead) 지능 보조 시술 제안",
    category: "선천 자질",
    once: true,
    req: { minAge: 16, allTags: ["ogryn"] },
    reqLabel: "자질: 오그린(앱휴먼)",
    weight: 38,
    text: "거대한 덩치와 순박한 충성심을 눈여겨본 의무 장교와 커미사르가 그대를 불렀다. '자네는 아주 훌륭한 오그린이야. 머리에 작은 장치를 심어 주는 본헤드 시술을 받으면 숫자를 열까지 셀 수 있고, 작은 전우들을 이끄는 분대장이 될 수 있네.'",
    choices: [
      {
        label: "[강인 판정] '황제 폐하가 똑똑해지라 하셨다!' 두개골 시술을 꾹 참고 견뎌 본헤드 분대장이 된다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "머리가 조금 지끈거렸지만 이제 지도도 읽고 명령도 또렷이 이해한다! 커미사르가 빛나는 분대장 약장을 달아 주었다.",
          stats: { T: 6, Int: 8, WP: 6, Inf: 6 }
        },
        fail: {
          text: "수술이 너무 아파 병원 침대를 부숴 버리는 소동이 일었으나, 강철 같은 몸 덕에 금방 툴툴 털고 일어났다.",
          wounds: -18,
          stats: { T: 4 }
        }
      },
      {
        label: "[백병 판정] 복잡한 기계보다 내 립퍼 건이 최고라며 적의 기습을 맨몸으로 막아 내 전우들을 지킨다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'작은 친구들 건드리지 마!' 거대한 팔뚝으로 적을 날려 버리자 분대원 전원이 감격해 환호했다.",
          stats: { WS: 7, T: 6, Fel: 5 }
        },
        fail: {
          text: "온몸으로 파편을 막아 내다 큰 상처를 입었으나, 작은 전우들만은 한 명도 다치지 않았다.",
          wounds: -20,
          stats: { WS: 3 }
        }
      },
      {
        label: "커미사르가 칭찬으로 준 빛나는 훈장을 가슴에 꼭 쥐고 배급 고기를 두 그릇 먹으며 환하게 웃는다",
        effect: {
          text: "황제 폐하께서 오늘도 지켜보고 계신다. 오그린의 단순하고 순수한 충성심은 그 무엇보다 단단하다.",
          stats: { T: 5 },
          wounds: 12,
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Ogryn / BONEhead Implant"
  },
  {
    id: "ev_s2_trait_prodigy_wargame",
    title: "전술 천재의 도박 — 사령부 모의 전쟁의 금기 기동",
    category: "선천 자질",
    once: true,
    req: { minAge: 16, allTags: ["prodigy"] },
    reqLabel: "자질: 전술 천재",
    weight: 36,
    text: "성계 방위 모의 전쟁 훈련에서 기존의 낡은 참호 고수 교리대로 배치하면 아군이 전멸할 것이 그대의 눈에는 첫눈에 보인다. 하지만 고위 참모들은 하급자의 파격적인 역기동 제안을 오만하다며 비웃고 있다.",
    choices: [
      {
        label: "[지성 판정] 홀로맵 위에 3중 양동 포위 기동을 펼쳐 보이며 모의전을 단 십 분 만에 완승으로 끝낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시뮬레이션 코지테이터가 '아군 피해 82퍼센트 감소'를 띄우자 장성들의 비웃음이 침묵과 경탄으로 뒤바뀌었다!",
          stats: { Int: 8, Inf: 9, BS: 4 }
        },
        fail: {
          text: "변칙 기동이 지나치게 과감해 참모장에게 불경한 독단이라는 견책을 받았으나, 날카로운 재능만은 각인시켰다.",
          stats: { Inf: -4, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 자존심 강한 상급 장교의 이름으로 전술안을 올려 공을 양보하는 대신 실전 반영과 후원을 얻는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "현명한 처세 덕분에 수많은 병사의 목숨을 살릴 작전이 채택되었고, 상급 장교가 그대를 핵심 참모로 발탁했다!",
          stats: { Fel: 6, Inf: 8, Int: 4 }
        },
        fail: {
          text: "공적만 가로채이고 변변한 보상은 받지 못했으나, 전술적 안목은 한층 깊어졌다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "참모들의 자존심을 건드리지 않고 개인 기록 슬레이트에만 완벽한 해법을 정리해 둔다",
        effect: {
          text: "진짜 전장은 모의 지도가 아니라 피가 흐르는 현장이다. 언젠가 결정적 순간에 꺼낼 칼날을 갈아 두었다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Only War / Imperium Maledictum: Tactical Prodigy"
  },
  {
    id: "ev_s2_trait_saint_spark_aura",
    title: "성흔의 기질 — 워프 안개 속 꺼지지 않는 촛불",
    category: "선천 자질",
    once: true,
    req: { minAge: 14, allTags: ["saint_spark"], excludeTags: ["heretic", "custodes"] },
    reqLabel: "자질: 성흔의 기질",
    weight: 38,
    text: "원인을 알 수 없는 워프 안개가 구역을 뒤덮으며 등불이 일제히 꺼지고 사람들이 공포에 휩싸였다. 그런데 유독 그대의 발치에 놓인 작은 촛불만은 황금빛으로 꼿꼿이 타오르며 손바닥에서 뜨거운 성흔의 온기가 피어오른다.",
    choices: [
      {
        label: "[의지 판정] 황제의 이름을 부르며 어둠 속 부상자와 절망한 시민들을 황금빛 기도로 일으켜 세운다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 목소리가 울려 퍼지자 불길한 워프 안개가 순식간에 걷혔다! 목격자들이 '살아 있는 기적'이라 외치며 무릎 꿇었다.",
          stats: { WP: 8, Fel: 6, Inf: 7 },
          faith: 15,
          corruption: -10,
          addTags: ["living_miracle"]
        },
        fail: {
          text: "온 힘을 쏟아 기도하다 코피를 흘리며 쓰러졌으나, 어둠이 물러날 때까지 단 한 사람도 광기에 빠지지 않았다.",
          wounds: -16,
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 성흔의 징조를 떠벌리지 않고 조용히 촛불을 나누어 주며 이웃들의 불안을 달랜다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "과장된 광신 대신 잔잔한 희망이 퍼져 나가며, 국교와 이웃 모두의 깊은 신뢰를 얻었다.",
          stats: { Fel: 6, WP: 5 },
          faith: 10
        },
        fail: {
          text: "일부 주민이 소문을 퍼뜨려 잠시 시끌벅적했으나 별탈 없이 밤을 넘겼다.",
          faith: 5
        }
      },
      {
        label: "뜨겁게 달아오른 손바닥을 붕대로 감싸고 오직 황제께 겸허히 감사 기도를 올린다",
        effect: {
          text: "기적은 오직 옥좌의 주인으로부터 온다. 겸손한 신심이 내면의 오염까지 깨끗이 씻어 냈다.",
          stats: { WP: 4 },
          faith: 8,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Living Saint / Imperial Cult"
  },
  {
    id: "ev_s2_origin_rt_blood",
    title: "로그 트레이더 방계 — 가문 무역 영장 계승권 분쟁",
    category: "특수 혈통",
    once: true,
    req: { minAge: 18, allTags: ["rogue_trader_blood"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "출신: 로그 트레이더 방계 혈통",
    weight: 38,
    text: "황제의 무역 영장을 지닌 본가 원로가 급사하자, 거대한 성간 함대와 변경 성계 채굴권을 두고 방계와 직계 친척들 사이에 피비린내 나는 계승권 다툼이 벌어졌다. 방계 혈손인 그대에게도 원로회의 소집장이 날아왔다.",
    choices: [
      {
        label: "[교섭 판정] 원로회의에서 미개척 변경 성계 개척 수익안을 제시해 방계 지분과 쾌속정 권한을 따낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "대담한 항해 사업안에 원로들이 매료되었다! 막대한 배당금과 변경 성계 인맥을 단숨에 거머쥐었다.",
          stats: { Fel: 7, Int: 4, Inf: 10 }
        },
        fail: {
          text: "본가 파벌의 야유에 밀려 회의장에서 쫓겨났고, 항의 과정에서 경비원과 충돌해 상처를 입었다.",
          wounds: -10,
          stats: { Inf: -5 }
        }
      },
      {
        label: "[민첩 판정] 본가 경쟁자가 밤중에 보낸 사설 용병의 암살 기도를 역습해 가문의 실력자로 인정받는다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "암살자의 단검을 빼앗아 본가 회의 탁자에 꽂아 넣었다! 이제 가문 안에서 그대를 함부로 건드릴 자는 없다.",
          stats: { Ag: 6, WS: 5, Inf: 8 }
        },
        fail: {
          text: "어깨에 깊은 자상을 입고 간신히 비상 셔틀로 탈출했다. 로그 트레이더 가문의 정치는 전쟁터보다 잔혹하다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "피비린내 나는 본가 권력 다툼에서 한 발 물러나 안정적인 방계 연금과 성계 인맥만 챙긴다",
        effect: {
          text: "영장의 왕좌는 독이 든 잔이다. 목숨과 실리를 모두 지키는 영리한 후퇴였다.",
          stats: { Inf: 5, Fel: 4 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook (FFG)"
  },
  {
    id: "ev_s2_origin_terra_elite",
    title: "테라 상류층 — 황궁 외곽 하이 로드 연회와 칙령 서명",
    category: "특수 혈통",
    once: true,
    req: { minAge: 16, allTags: ["terra_elite"] },
    reqLabel: "출신: 테라 상류층 혈통",
    weight: 38,
    text: "은하계 전역의 운명이 오가는 테라 상원 구역의 대리석 연회장에 가문 대표로 초대받았다. 대성전 보급 칙령 서명을 둘러싸고 고위 행정관과 귀족 가문들이 화려한 미소 뒤에 칼을 숨긴 채 눈치를 보고 있다.",
    choices: [
      {
        label: "[권위 판정] 테라 명문가의 인장을 당당히 찍어 대성전 보급 청원안을 통과시키고 상원의 주목을 받는다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "은하계 수천 행성의 물자를 움직이는 서명 한 번으로 테라 상류 사회에 확고한 입지를 다졌다!",
          stats: { Inf: 10, Fel: 6, Int: 4 }
        },
        fail: {
          text: "절차상 결함을 물고 늘어진 정적 가문에게 체면을 구겼으나, 제국 수도 정치의 생리를 뼈저리게 배웠다.",
          stats: { Inf: -4, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 퇴폐한 귀족 사교의 공허함을 외면하고 황궁 외곽에서 실무와 무예 수련에 매진한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "향락에 젖은 다른 귀족 자제들과 다른 굳건한 기상에 황궁 수비 장교들마저 깊은 호감을 보였다.",
          stats: { WP: 7, WS: 4, Int: 5 },
          faith: 8
        },
        fail: {
          text: "가문 어른들로부터 사교를 소홀히 한다는 핀잔을 들었으나 스스로의 신념만은 꺾지 않았다.",
          stats: { WP: 3, Int: 2 }
        }
      },
      {
        label: "테라 최상류 가문의 우아한 의전을 완벽히 소화하며 정중히 연회 석상에 얼굴만 비추고 물러난다",
        effect: {
          text: "품위와 절제는 테라 명문가의 가장 오래된 무기다. 무난하게 가문의 위상을 지켜 냈다.",
          stats: { Inf: 5, Fel: 4 }
        }
      }
    ],
    source: "Watchers of the Throne / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s4_tag_librarius_trained",
    title: "챕터 라이브러리우스 — 워프 폭풍 속 사이킥 차폐와 마도서 봉인",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["librarius_trained"] },
    reqLabel: "이력: 챕터 라이브러리우스",
    weight: 38,
    text: "배틀 바지가 워프 난기류에 휘말린 찰나, 챕터 라이브러리우스 금서고에 봉인되어 있던 카오스 마도서 한 권이 쇠사슬을 끊고 핏빛 속삭임을 토해 내기 시작했다. 함교의 네비게이터가 비명을 지르며 시야를 잃어 가는 절체절명의 순간이다.",
    choices: [
      {
        label: "[의지 판정] 사이킥 후드를 최대 출력으로 가동해 마도서의 사념을 정면으로 짓눌러 재봉인한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "푸른 사이킥 번개가 사악한 속삭임을 태워 버리며 마도서를 완벽히 침묵시켰다! 챕터의 수석 라이브러리가 그대의 정신력을 경외했다.",
          stats: { WP: 9, Int: 6, Inf: 7 },
          corruption: -8
        },
        fail: {
          text: "워프 역류로 코피를 쏟으며 정신적 타격을 입었으나, 마도서가 함선에 풀려나는 것만은 막았다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 챕터 고대 의례서의 대항 룬을 즉석에서 새겨 워프 파동을 함선 밖으로 방출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정교한 룬 결계가 저주의 에너지를 공허로 흘려보냈다! 네비게이터가 항로를 되찾으며 배틀 바지가 무사히 실우주로 복귀했다.",
          stats: { Int: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "결계가 흔들리며 서고 일부가 불탔으나, 함선 전체는 위기에서 벗어났다.",
          wounds: -14,
          corruption: 4,
          stats: { Int: 4 }
        }
      },
      {
        label: "마도서가 담긴 봉인 금고째 에어록으로 사출해 실우주 항성의 중력권에 던져 버린다",
        effect: {
          text: "귀중한 연구 자료를 잃었으나, 형제들의 영혼을 지키는 것이 그 무엇보다 우선이다.",
          stats: { WP: 5, T: 3 },
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Librarius / Space Marine Librarian Lore"
  },
  {
    id: "ev_s4_tag_chapter_serf",
    title: "챕터 서프의 충성 — 배틀 바지 침입자와 천사의 무기고",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["chapter_serf"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    reqLabel: "이력: 챕터 서프 (필멸자 종복)",
    weight: 36,
    text: "비록 진시드 선발에서는 고배를 마셨으나 아스타르테스의 곁에서 평생을 봉사하는 챕터 서프가 된 그대. 배틀 브라더들이 행성 표면에 강하한 사이, 해적 강습정이 배틀 바지 하부 무기고로 침투해 천사들의 예비 파워 아머와 볼터를 노리고 있다.",
    choices: [
      {
        label: "[사격 판정] 서프 방어 소대를 규합해 무기고 통로에서 오토건과 방어 포탑으로 침입자를 저지한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "아스타르테스 못지않은 규율과 화망으로 해적들을 전멸시켰다! 귀환한 중대장이 그대의 어깨에 친히 손을 얹으며 '우리의 형제나 다름없다'고 치하했다.",
          stats: { BS: 7, WP: 6, Inf: 7 }
        },
        fail: {
          text: "치열한 백병전 끝에 중상을 입었으나, 귀환한 스페이스 마린들이 도착할 때까지 무기고 문만은 열어 주지 않았다.",
          wounds: -18,
          stats: { T: 4, WP: 5 }
        }
      },
      {
        label: "[지성 판정] 함선 내부 방화 격벽과 진공 배기 밸브를 원격 조작해 침입 구역을 통째로 봉쇄한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "무기고를 누구보다 잘 아는 종복의 기지였다! 해적 강습대가 진공 통로에 갇혀 손쉽게 제압되었다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "격벽 폐쇄가 한 박자 늦어 무기고 외곽이 파손되었으나 유물 갑주는 무사했다.",
          wounds: -10,
          stats: { Int: 4 }
        }
      },
      {
        label: "유물 갑주를 내부 금고로 대피시키고 함교에 긴급 경보를 송신해 보안대의 진압을 지원한다",
        effect: {
          text: "필멸자의 몸으로도 천사들의 무구를 끝까지 지켜 냈다. 서프 동료들 사이에서 깊은 존경을 얻었다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Chapter Serf / Space Marine Fortress-Monastery Lore"
  },
  {
    id: "ev_s4_tag_krieg_grenadier",
    title: "크리그 척탄병 — 해골 가면 돌격대의 독가스 참호 돌파",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["krieg_grenadier"] },
    reqLabel: "이력: 크리그 척탄병",
    weight: 36,
    text: "지옥불 라스건과 중장갑 카라페이스 아머, 그리고 해골 문양 방독면을 착용한 크리그 척탄병으로서 최전선 돌파조에 배치되었다. 맹독성 포격 연기가 무인지대를 뒤덮은 가운데, 아군 공병대의 참호 폭파가 절반만 성공해 철조망 틈새가 좁게 열렸다.",
    choices: [
      {
        label: "[강인 판정] 독가스 구름 속으로 가장 먼저 뛰어들어 지옥불 라스건으로 적 중기관총 진지를 제압한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "죽음을 두려워하지 않는 해골 가면의 전진에 적 방어병들이 공포에 질려 무너졌다! 후속 연대가 단숨에 적 1차 참호를 점령했다.",
          stats: { T: 8, BS: 5, WP: 5, Inf: 5 }
        },
        fail: {
          text: "방독면 여과기가 손상되어 폐에 독기를 마셨으나, 끝내 적 벙커를 폭파하고 임무를 완수했다.",
          wounds: -20,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[사격 판정] 연막 너머의 적 총구 화염만 보고 정확히 유탄과 고출력 사격을 꽂아 넣는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "기계처럼 냉정한 사격이 적 기관총 사수들을 차례로 침묵시켰다. 병참 장교가 그대의 번호를 최우수 척탄병 기록에 올렸다.",
          stats: { BS: 8, Int: 4, Inf: 5 }
        },
        fail: {
          text: "탄창이 과열되어 팔에 화상을 입었으나 돌파구만은 끝까지 열어 두었다.",
          wounds: -14,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "파괴되지 않은 철조망 아래로 몸을 밀어 넣어 후속 보병들이 밟고 지나갈 발판과 통로를 확보한다",
        effect: {
          text: "개인의 생사는 의미 없다. 연대가 전진하고 속죄가 이루어졌으니 그것으로 충분하다.",
          stats: { WP: 6, T: 5 },
          wounds: -10,
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Death Korps Grenadier / Imperial Armour: Siege of Vraks"
  },
  {
    id: "ev_s4_tag_catachan_blooded",
    title: "카타찬 성인식 통과자 — 외지 귀족 장교의 무모한 돌격 명령",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["catachan_blooded"] },
    reqLabel: "이력: 카타찬 성인식 통과",
    weight: 36,
    text: "카타찬 밀림에서 살아남은 그대의 야생 직감이 날카로운 경고를 울린다. 늪지 숲 너머의 고요함이 비정상적이다. 분명 적의 매복이 도사리고 있건만, 새로 부임한 외지 귀족 출신 장교는 정면 개활지로 일렬 행군을 강행하라고 소리친다.",
    choices: [
      {
        label: "[민첩 판정] 대열을 벗어나 단독 우회 정찰로 적 매복조의 지뢰선과 저격수를 먼저 칼로 정리한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "카타찬 단검이 소리 없이 매복조 전원을 침묵시켰다! 전우들은 그대의 목숨을 건 정찰에 열광했고, 콧대 높던 장교마저 말을 잃었다.",
          stats: { Ag: 8, WS: 6, Inf: 5 }
        },
        fail: {
          text: "함정에 걸려 다리를 다쳤으나, 신호탄을 쏘아 올려 본대 전체가 학살당하는 참사를 막았다.",
          wounds: -18,
          stats: { Ag: 4, T: 4 }
        }
      },
      {
        label: "[교섭 판정] 카타찬의 지형 판독 근거를 조목조목 들이대며 부하들의 목숨을 걸고 우회 기동을 관철한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "장교가 마지못해 우회로를 허락했고, 직후 원 경로에 쏟아진 적의 포격을 보며 그대에게 정식으로 사과했다.",
          stats: { Fel: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "항명 직전까지 가는 언쟁 끝에 징계 경고를 받았으나, 최소한 선발대만이라도 경계 태세를 갖추게 만들었다.",
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "명령은 따르되 분대원들에게 간격을 넓히고 엄폐 준비를 시켜 기습이 터지는 즉시 반격한다",
        effect: {
          text: "역시나 매복이 터졌으나 미리 대비한 덕분에 분대 피해는 극소수에 그쳤다.",
          stats: { T: 5, BS: 4 },
          wounds: -8
        }
      }
    ],
    source: "Lexicanum: Catachan Jungle Fighters / Codex: Astra Militarum"
  },
  {
    id: "ev_s4_tag_fenris_blood",
    title: "펜리스 빙원의 피 — 혹한의 전선과 늑대의 사가",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["fenris_blood"] },
    reqLabel: "이력: 펜리스 빙원 생존자",
    weight: 36,
    text: "영하 50도의 혹한이 몰아친 전선에서 다른 행성 출신 병사들은 손가락이 얼어붙어 방아쇠조차 당기지 못하고 있다. 그러나 갈라지는 빙해와 얼음 늑대 사이에서 자란 그대의 혈관에는 오히려 뜨거운 전의가 끓어오른다.",
    choices: [
      {
        label: "[강인 판정] 동상에 쓰러진 전우들을 들쳐 업고 눈보라를 뚫어 최전방 보온 벙커까지 돌파한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "펜리스인의 괴력과 내한성에 동료들이 경악했다! 그대 덕분에 한 개 소대 전원이 동사를 면하고 반격에 나섰다.",
          stats: { T: 8, WS: 4, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "혹독한 냉기에 동상을 입었으나 끝까지 전우들을 놓지 않고 벙커에 도착했다.",
          wounds: -16,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[백병 판정] 눈보라를 이용해 총기가 얼어붙은 적 초소에 육박전으로 돌격해 난방 발전기를 탈취한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "포효와 함께 도끼와 단검으로 적 초소를 휩쓸었다! 빼앗은 발전기 불빛 아래 그대의 이름이 새로운 사가로 불렸다.",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "격투 끝에 부상을 입었으나 발전기와 식량을 확보해 아군을 살려 냈다.",
          wounds: -15,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "빙원에서 익힌 체온 유지법과 동상 예방 요령을 동료들에게 차근차근 전수한다",
        effect: {
          text: "펜리스의 생존 지혜가 낯선 행성의 겨울을 이겨 내게 해 주었다.",
          stats: { Int: 4, Fel: 5, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Fenris / Space Wolves Lore"
  },
  {
    id: "ev_s4_tag_daemon_bane",
    title: "악마 살해자 — 워프 너머에서 날아온 원한의 진명",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["daemon_bane"] },
    reqLabel: "이력: 악마 살해자",
    weight: 38,
    text: "과거 그대가 추방하거나 베어 낸 워프 악마는 결코 그대의 영혼 냄새를 잊지 않는다. 성소의 촛불이 일제히 푸른빛으로 뒤집히더니, 그림자 속에서 그대의 이름을 저주하는 사악한 현현이 다시 현실의 막을 찢고 손을 뻗어 온다.",
    choices: [
      {
        label: "[의지 판정] 황제의 순결한 기도문과 진명 추방 의식으로 악마의 원념을 영구히 찢어 발긴다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "비명과 함께 워프의 틈이 완전히 닫혔다! 악마마저 두려워하는 진정한 퇴마사의 명성이 제국 비밀 기록에 각인되었다.",
          stats: { WP: 9, Inf: 7 },
          faith: 12,
          corruption: -12
        },
        fail: {
          text: "악마의 저주가 정신을 훑고 지나가 깊은 상처를 남겼으나, 현현 자체는 가까스로 쫓아냈다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 축복받은 무기를 쥐고 현실로 기어 나오는 악마의 팔을 망설임 없이 베어 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "은빛 성유를 바른 칼날이 악마의 육신을 태워 버렸다! 두 번 다시 그대 앞에 나타나지 못할 치명타였다.",
          stats: { WS: 8, T: 4, WP: 5 },
          faith: 6,
          corruption: -6
        },
        fail: {
          text: "지옥불 발톱에 가슴을 베였으나 끝내 사악한 형체를 조각내어 추방했다.",
          wounds: -22,
          stats: { WS: 5 }
        }
      },
      {
        label: "즉시 은과 소금으로 방어 원을 그리고 인근 성직자와 심문소 요원에게 정화 지원을 요청한다",
        effect: {
          text: "혼자 영웅심을 부리지 않고 정화반과 합동으로 악마의 잔재를 안전하게 소각했다.",
          stats: { Int: 5, WP: 4 },
          faith: 5,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Daemon / Ordo Malleus & Grey Knights Lore"
  },
  {
    id: "ev_s4_tag_rift_touched",
    title: "대균열 감응자 — 꿈속에서 울리는 천 개 성계의 비명",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["rift_touched"] },
    reqLabel: "이력: 대균열 감응자",
    weight: 36,
    text: "시카트릭스 말레딕툼이 하늘을 찢던 날 워프 파동에 감응한 이후, 그대의 꿈에는 간혹 아직 닥치지 않은 재앙의 단편이 스쳐 지나간다. 오늘 새벽, 그대는 인근 궤도 정거장에 숨어든 이단 함대의 기습 시각을 기이할 만큼 생생하게 보았다.",
    choices: [
      {
        label: "[의지 판정] 환상의 유혹에 흔들리지 않고 핵심 좌표만 추려 성계 방어 사령부에 익명 경고를 보낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 경고 덕분에 방어 함대가 미리 매복해 이단 기습 함대를 전멸시켰다! 누구도 출처를 몰랐으나 수많은 생명을 구했다.",
          stats: { WP: 8, Int: 6, Inf: 5 },
          faith: 6,
          corruption: -5
        },
        fail: {
          text: "환상 속에 섞인 워프의 속임수 때문에 두통과 오염을 겪었으나, 경계 강화만은 이끌어 냈다.",
          wounds: -12,
          corruption: 8,
          stats: { WP: 3 }
        }
      },
      {
        label: "[지성 판정] 꿈의 단편을 실제 아스트로패스 통신 잡음과 대조해 과학적 예측 보고서로 포장한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "이단 심문의 의심을 완벽히 피하면서도 기습을 차단하는 데 성공했다! 상부가 그대의 탁월한 정보 분석력을 극찬했다.",
          stats: { Int: 8, Inf: 7 }
        },
        fail: {
          text: "보고서의 근거가 석연치 않다는 지적을 받아 감찰관의 면담을 치러야 했다.",
          stats: { Int: 3, Inf: -3 }
        }
      },
      {
        label: "워프가 보여 주는 예지는 언제나 독이 든 잔이라며 성당에서 정화 기도를 올리고 환상을 덮는다",
        effect: {
          text: "금단의 감각에 의지하지 않고 영혼의 순결을 지켰다. 머릿속을 울리던 비명이 한결 잦아들었다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -8
        }
      }
    ],
    source: "Lexicanum: Great Rift / Psychic Awakening"
  },
  {
    id: "ev_s4_tag_vigilus_veteran",
    title: "비질루스 방어전 베테랑 — 나흐문드 회랑의 산증인",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["vigilus_veteran"] },
    reqLabel: "이력: 비질루스 방어전 참전",
    weight: 36,
    text: "임페리움 상크투스와 암흑 제국을 잇는 좁은 숨통, 비질루스의 처절한 방어전에서 살아 돌아온 그대. 나흐문드 회랑으로 파견될 신편 성전군 지휘부가 오크 스피드 프릭과 진스틸러 교단, 블랙 리전이 뒤엉켰던 복합 시가전의 교훈을 전해 달라며 그대를 강단에 세웠다.",
    choices: [
      {
        label: "[지성 판정] 3중 전선에서 살아남은 도심 봉쇄 전술과 진스틸러 지하 색출 요령을 체계적으로 강의한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "실전의 피로 쓴 교본에 신편 지휘관들이 기립 박수를 보냈다! 그대의 전술안이 회랑 수비대의 표준 교리로 채택되었다.",
          stats: { Int: 7, Inf: 7, BS: 3 }
        },
        fail: {
          text: "복잡한 시가전 교훈을 짧은 시간에 다 전하지 못했으나, 핵심 매복 회피법만은 각인시켰다.",
          stats: { Int: 4, Inf: 3 }
        }
      },
      {
        label: "[교섭 판정] 탁상공론에 빠진 신임 장교들에게 비질루스의 참혹한 현실을 직설적으로 일깨워 정신을 차리게 한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "거친 진실이 오만한 장교들의 허영을 깨뜨렸다! 부대가 훨씬 단단한 각오로 나흐문드 회랑을 향해 출항했다.",
          stats: { Fel: 7, WP: 6, Inf: 6 }
        },
        fail: {
          text: "사기를 떨어뜨렸다는 항의를 받았으나, 현장에 나간 병사들은 나중에 그대의 경고가 옳았음을 깨달았다.",
          stats: { Inf: -2, WP: 4 }
        }
      },
      {
        label: "강단 대신 무기고로 내려가 파견될 병사들의 장비 점검과 생존 노하우를 묵묵히 도와준다",
        effect: {
          text: "화려한 훈장보다 신병 한 명이라도 더 살려 보내는 것이 비질루스 생존자의 도리다.",
          stats: { T: 4, Fel: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: War of Beasts / Vigilus Defiant"
  },
  {
    id: "ev_s4_tag_tyrannic_veterans",
    title: "타이라니드 전쟁 베테랑 — 워프의 그림자를 알아본 자의 경고",
    category: "명예 태그 연작",
    once: true,
    req: { anyTags: ["tyranic_war_vet", "tyrannic_veteran"] },
    reqLabel: "이력: 타이라니드 전쟁 베테랑",
    weight: 36,
    text: "아스트로패스 통신이 사흘째 잡음 속에 끊기고, 성계 외곽 농장의 가축들이 까닭 없이 날뛰기 시작했다. 현지 관료들은 단순한 태양 흑점 이상이라 치부하지만, 하이브 함대와 싸워 본 그대는 온몸의 털이 곤두서는 그 감각을 안다. '워프의 그림자(Shadow in the Warp)'가 다가오고 있다.",
    choices: [
      {
        label: "[지성 판정] 과거 타이라니드 전쟁의 생체 정찰 패턴을 제시하며 즉시 궤도 초계망과 지하 진스틸러 수색을 발동시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "그대의 경고로 조기 탐지된 하이브 선봉 촉수와 지하 교단 세포가 상륙 전에 격멸되었다! 행성 전체가 포식의 악몽을 피했다.",
          stats: { Int: 8, Inf: 8, WP: 5 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "관료들이 늑장 대응하는 사이 정찰 생체 괴수 리크터가 침투해 격전 끝에 간신히 사살했다.",
          wounds: -18,
          stats: { WS: 4, Int: 4 }
        }
      },
      {
        label: "[사격 판정] 직접 정예 수색대를 이끌고 외곽 숲에 떨어진 포자 낭종을 화염방사기와 볼터로 소각한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "시냅스 개체의 머리를 정확히 꿰뚫어 무리의 통제를 끊었다! 베테랑의 노련한 대처가 전염을 원천 봉쇄했다.",
          stats: { BS: 8, T: 4, Inf: 6 }
        },
        fail: {
          text: "산성 생체액에 화상을 입었으나 마지막 포자 낭종까지 완전히 불태웠다.",
          wounds: -16,
          stats: { BS: 4, T: 4 }
        }
      },
      {
        label: "비상 대피 절차와 식수 격리 매뉴얼을 배포해 행성이 장기 포위전에 대비하도록 돕는다",
        effect: {
          text: "최악의 포식자 앞에서 살아남는 법은 공포에 흔들리지 않는 철저한 대비뿐이다.",
          stats: { WP: 5, T: 4, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Tyrannic Wars / Tyrannic War Veterans"
  },
  {
    id: "ev_s5_focus_survival_2",
    title: "생존과 보양 2막 — 역병 봉쇄 구역의 비밀 약재와 생존자의 윤리",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 32, anyFocus: ["survival"] },
    reqLabel: "32세 이상 · 삶의 초점: 생존과 보양",
    weight: 28,
    text: "오랜 세월 몸을 돌보고 비상약을 비축해 온 덕분에, 원인을 알 수 없는 폐열병이 구역을 덮쳤을 때도 그대는 멀쩡히 버텨 냈다. 그런데 그대가 소중히 아껴 둔 항생제와 정화 필터가 남아 있다는 소문이 새어 나가며, 병든 이웃과 무장한 봉쇄 경비대가 동시에 문을 두드린다.",
    choices: [
      {
        label: "[지성 판정] 비축 약재의 성분을 정밀 희석하고 대체 약초를 배합해 여러 사람을 살릴 응급 처방약을 제조한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "약효를 유지하면서 분량을 세 배로 늘려 구역의 치사율을 급감시켰다! 생존의 지혜가 공동체 전체를 구했다.",
          stats: { Int: 7, T: 5, Inf: 6 }
        },
        fail: {
          text: "배합 도중 병균에 노출되어 고열을 앓았으나, 끝내 회복하며 강한 면역력을 얻었다.",
          wounds: -14,
          stats: { T: 5 }
        }
      },
      {
        label: "[강인 판정] 경비대의 압수 시도를 단호히 막아 서고 필수 생존 물자만큼은 끝까지 사수한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "건강한 체력과 단호한 기세에 경비대가 물러났다. 그대의 철저한 준비성이 다시 한번 목숨을 지켰다.",
          stats: { T: 7, WP: 5 },
          wounds: 8
        },
        fail: {
          text: "실랑이 끝에 상처를 입고 물자 절반을 빼앗겼으나 남은 약재로 가까스로 버텼다.",
          wounds: -14,
          stats: { T: 3 }
        }
      },
      {
        label: "자신이 쓸 최소분만 남기고 나머지 약재를 의무대에 조용히 기증한 뒤 문을 걸어 잠근다",
        effect: {
          text: "살아남는 것과 인간다움을 지키는 것 사이에서 차분히 균형을 잡았다.",
          stats: { T: 4, WP: 5, Fel: 3 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Medicae / Imperium Maledictum"
  },
  {
    id: "ev_s5_focus_combat_2",
    title: "무예와 전투 2막 — 고참 무인의 낡은 관절과 젊은 도전자의 결투",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 32, anyFocus: ["combat"] },
    reqLabel: "32세 이상 · 삶의 초점: 무예와 전투 훈련",
    weight: 28,
    text: "평생을 검술과 사격 훈련에 바쳐 온 그대의 명성을 듣고, 혈기 왕성하고 재능 넘치는 젊은 정예 전사가 연병장 한복판에서 공개 대련을 청해 왔다. 예전 같지 않은 관절의 묵직함이 신경 쓰이지만, 물러서면 그동안 쌓아 온 무인의 권위가 단숨에 흔들린다.",
    choices: [
      {
        label: "[백병 판정] 힘겨루기 대신 수십 년 실전에서 익힌 간결한 궤적과 수읽기로 젊은 도전자를 단 세 합에 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "화려한 속도전은 노련한 한 수 앞에 무릎을 꿇었다! 도전자가 고개를 숙여 제자가 되기를 청했고 연병장에 우레 같은 박수가 쏟아졌다.",
          stats: { WS: 8, Inf: 6, WP: 4 }
        },
        fail: {
          text: "젊은 패기의 맹공에 팔을 크게 삐끗했으나, 마지막 반격으로 무승부를 끌어내며 체면을 지켰다.",
          wounds: -14,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "[사격 판정] 백병전 대신 실전 이동 표적 사격 승부를 제안해 경험의 격차를 압도적으로 증명한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "바람과 반동을 완벽히 읽어 낸 연속 명중에 젊은 도전자가 탄복하며 물러났다!",
          stats: { BS: 8, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "아슬아슬한 점수 차로 패배를 맛보았으나, 그 자극이 새로운 훈련 의욕을 불태웠다.",
          stats: { BS: 4, WP: 4 }
        }
      },
      {
        label: "승패보다 약점을 짚어 주는 지도 대련으로 받아들여 후배 전사의 기량을 끌어올려 준다",
        effect: {
          text: "자존심을 내려놓고 스승의 품격을 보이자 도리어 연병장 전체의 깊은 존경을 얻었다.",
          stats: { WS: 4, Fel: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Duel / Imperial Martial Traditions"
  },
  {
    id: "ev_s5_focus_faith_2",
    title: "황제 신앙 2막 — 기적을 사칭하는 떠돌이 설교자와 군중의 광신",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["faith"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "32세 이상 · 삶의 초점: 황제 신앙과 기도",
    weight: 28,
    text: "황제 신앙을 깊이 닦아 온 그대의 눈에 광장의 소동이 예사롭지 않게 비쳤다. 붕대를 감은 떠돌이 설교자가 '성혈의 기적'을 행한다며 수천 순례자의 재물과 헌신을 끌어모으고 있는데, 기도문 사이사이에 정통 국교 교리와 미묘하게 어긋나는 불온한 구절이 섞여 있다.",
    choices: [
      {
        label: "[의지 판정] 광장 단상에 올라 정통 황제 교리로 설교자의 기만과 불순한 구절을 만인 앞에서 논파한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "설교자의 품에서 숨겨 둔 환각 향료와 이단 부적이 쏟아져 나왔다! 광신에 빠질 뻔한 순례자들이 그대의 순수한 신앙 앞에 무릎을 꿇었다.",
          stats: { WP: 8, Fel: 5, Inf: 6 },
          faith: 10,
          corruption: -8
        },
        fail: {
          text: "흥분한 광신도들에게 돌팔매를 맞아 다쳤으나, 소동을 보고 출동한 국교 경비대가 사기꾼을 체포했다.",
          wounds: -15,
          faith: 5,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 섣불리 군중을 자극하지 않고 설교자의 배후 조직과 자금 흐름을 추적해 심문소에 넘긴다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단순 사기꾼이 아니라 지하 이단 교단의 모집책이었음이 밝혀졌다! 이단심문소가 그대의 신중한 공적을 치하했다.",
          stats: { Int: 7, Inf: 6 },
          faith: 6,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "추적 도중 설교자가 눈치를 채고 도주했으나, 광장의 거짓 집회는 해산되었다.",
          stats: { Int: 3, WP: 4 }
        }
      },
      {
        label: "소란스러운 광장을 피해 고요한 예배당으로 돌아와 자신의 신앙이 교만에 빠지지 않도록 성찰한다",
        effect: {
          text: "남의 거짓을 꾸짖기 전에 스스로의 영혼을 먼저 닦는 것이 참된 경건이다.",
          stats: { WP: 5 },
          faith: 8,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Imperial Cult / Ecclesiarchy Lore"
  },
  {
    id: "ev_s5_focus_lore_2",
    title: "학문과 기계 교리 2막 — 봉인된 암흑기 데이터 코어와 이단의 경계",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 32, anyFocus: ["lore"] },
    reqLabel: "32세 이상 · 삶의 초점: 학문과 기계 교리",
    weight: 28,
    text: "오랜 학문 탐구 끝에 고서고 지하에서 기술 암흑기(Dark Age of Technology) 시절의 암호화된 데이터 코어 조각을 발견했다. 해독에 성공하면 행성의 동력 효율을 획기적으로 끌어올릴 수 있지만, 내부에 금지된 '혐오스러운 지성(Abominable Intelligence)' 잔재가 남아 있을 위험도 도사리고 있다.",
    choices: [
      {
        label: "[지성 판정] 격리된 코지테이터 회로에서 위험한 자율 논리 구역만 완벽히 절단하고 순수 공학 설계도만 추출한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "기계교의 금기를 건드리지 않고도 경이로운 암흑기 열교환 설계도를 복원했다! 학계와 포지 사원 전체가 그대의 이름을 칭송했다.",
          stats: { Int: 9, Inf: 7, WP: 4 }
        },
        fail: {
          text: "해독 도중 불경한 기계 음성이 흘러나와 긴급 소각해야 했고, 기술 이단 의심 기록이 남았다.",
          stats: { Int: 4, Inf: -3 },
          corruption: 5,
          addTags: ["tech_heresy"]
        }
      },
      {
        label: "[의지 판정] 지식의 유혹을 누르고 코어를 그대로 봉인해 화성 기계교 상위 사제단에 정식 인계한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "금단의 유혹을 이겨 낸 정통 학자의 절제에 기계교가 깊은 경의를 표하며 귀한 학술 열람권을 내렸다.",
          stats: { WP: 7, Int: 4, Inf: 6 },
          faith: 5
        },
        fail: {
          text: "인계 과정에서 공적을 상급자에게 가로채였으나, 적어도 이단 혐의만은 깨끗이 피했다.",
          stats: { WP: 4 }
        }
      },
      {
        label: "위험한 코어의 봉인을 뜯지 않고 겉면의 고대 문자와 연대만 기록한 뒤 금고에 되돌려 놓는다",
        effect: {
          text: "알아야 할 지식과 잠들어 있어야 할 지식을 구분하는 것도 학자의 미덕이다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Dark Age of Technology / Abominable Intelligence"
  },
  {
    id: "ev_s5_focus_politics_2",
    title: "인맥과 출세 2막 — 총독 대행 암살 음모의 밀서와 권력의 대가",
    category: "삶의 초점 심화",
    once: true,
    req: {
      minAge: 32,
      anyFocus: ["politics"],
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "32세 이상 · 삶의 초점: 인맥과 출세 도모",
    weight: 28,
    text: "수년간 정교하게 구축해 온 인맥망이 마침내 행성 권력의 심장부까지 닿았다. 그러나 어둠 속으로 올라갈수록 칼날도 가까워진다. 유력 길드 연합의 대표가 그대에게 비밀 회동을 청하더니, 무능한 총독 대행을 '병사(病死)'로 처리하는 계획에 동참하면 핵심 요직을 넘기겠다고 속삭였다.",
    choices: [
      {
        label: "[교섭 판정] 암살 대신 총독 대행의 비리를 합법적으로 폭로해 탄핵시키는 정치적 무혈 쿠데타로 판을 뒤집는다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "피 한 방울 묻히지 않고 양측 파벌을 모두 그대의 손바닥 위에 올려놓았다! 행성 의회가 그대를 새 실권자로 추대했다.",
          stats: { Fel: 8, Inf: 9, Int: 4 }
        },
        fail: {
          text: "양쪽 파벌 모두에게 배신자로 찍혀 자객의 습격을 가까스로 피하며 입지가 크게 흔들렸다.",
          wounds: -16,
          stats: { Inf: -5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 밀서의 사본을 챙겨 총독 대행과 아르비테스 사령관에게 역고발해 반역 파벌을 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "반역 음모가 하루아침에 분쇄되었다! 총독 대행이 목숨을 구해 준 은인으로 그대에게 막대한 권한과 포상을 내렸다.",
          stats: { Int: 7, Inf: 8, WP: 4 }
        },
        fail: {
          text: "증거가 불충분하다는 역공을 받아 한동안 정계 변방으로 밀려나야 했다.",
          stats: { Inf: -4, Int: 3 }
        }
      },
      {
        label: "그 자리에서 밀서를 촛불에 태워 버리며 '나는 듣지 못한 일'이라고 선을 긋고 물러난다",
        effect: {
          text: "독이 든 왕관을 거절한 냉철함 덕분에, 훗날 피바람이 불었을 때도 그대만은 온전히 살아남았다.",
          stats: { WP: 6, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Planetary Governor / Imperial Politics"
  },
  {
    id: "ev_s5_focus_forbidden_2",
    title: "금단의 지식 2막 — 이단심문소 내사관의 불시 수색과 숨겨 둔 금서",
    category: "삶의 초점 심화",
    once: true,
    req: { minAge: 28, anyFocus: ["forbidden"] },
    reqLabel: "28세 이상 · 삶의 초점: 금단의 지식 탐구",
    weight: 30,
    text: "금단의 지식을 탐구한 대가가 마침내 문 앞까지 찾아왔다. 이단심문소 내사관과 무장 수행원들이 그대의 서재를 불시에 에워싸고 출입문을 두드린다. 책상 아래 비밀 서랍에는 워프의 진실과 고대 이단 학설을 필사해 둔 위험한 연구 노트가 아직 식지 않은 잉크를 머금은 채 놓여 있다.",
    choices: [
      {
        label: "[교섭 판정] 연구 노트를 '이단 격퇴용 반박 교본 초안'으로 태연하게 제시하며 내사관을 논리로 설득한다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "얼음장 같은 담력과 완벽한 교리 인용에 내사관이 감탄하며 물러났다! 심지어 적을 알기 위한 귀중한 연구라며 은밀한 협조까지 요청했다.",
          stats: { Fel: 7, Int: 7, Inf: 6 },
          corruption: 4
        },
        fail: {
          text: "변명이 간파되어 혹독한 심문과 수배 낙인을 피하기 위해 밤중에 거처를 버리고 도주해야 했다.",
          wounds: -18,
          corruption: 6,
          addTags: ["wanted_by_inquisition"]
        }
      },
      {
        label: "[민첩 판정] 문이 열리기 전 10초 만에 금서를 강산성 용액에 녹여 흔적을 지우고 평범한 기도서로 바꿔치기한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "내사관들이 서재를 뒤집었으나 단 한 조각의 불경한 증거도 찾지 못했다! 심장이 터질 듯한 밤을 넘겼다.",
          stats: { Ag: 7, WP: 5, Int: 3 }
        },
        fail: {
          text: "용액이 손등에 튀어 화상을 입고 수상한 재가 발각되어 막대한 벌금과 감시 처분을 받았다.",
          wounds: -14,
          stats: { Inf: -5 }
        }
      },
      {
        label: "스스로 모든 금서를 화로에 던져 태우고 무릎을 꿇어 고해성사와 정화 고행을 자청한다",
        effect: {
          text: "심연을 들여다보던 발걸음을 간신히 돌렸다. 혹독한 태형 끝에 목숨과 영혼을 건졌다.",
          wounds: -12,
          faith: 10,
          corruption: -14,
          stats: { WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Forbidden Lore / Dark Heresy: Radical's Handbook"
  }
);
