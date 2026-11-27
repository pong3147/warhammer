// 분기 사건 — 그림다크 난이도 전용 제국 관료제·계급 장벽·마녀사냥 억까 팩 (10종)
export default [
  {
    id: "ev_s22_theme_01",
    title: "서류상의 시체 — 아드미니스트라툼 사망자 오기",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "아드미니스트라툼 하위 서기청의 깃펜 오타 하나로 당신은 이미 세 달 전 역병으로 사망해 화장된 시체로 전산 처리되었다. 거주 패찰과 식량 배급표가 일괄 정지되었고, 구역 집행관들은 장부에 없는 유령이 배급을 축낸다며 당장 퇴거하지 않으면 불법 점거로 처형하겠다고 들이닥쳤다.",
    choices: [
      {
        label: "[지성 판정] 서기청 지하 문서고를 뒤져 오기 정정 인장과 생존 증명을 받아 낸다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "먼지 쌓인 양피지 더미 속에서 동명이인의 사망 일련번호를 정확히 찾아내고, 관료 규정 제409항의 예외 조항까지 인용해 즉시 복권 인장을 받아 냈다. 서기들조차 혀를 내두르는 설득력이었다.",
          stats: { Int: 5, Inf: 3 },
          addTags: ["silver_tongue"],
          align: { ruthless: 5 }
        },
        success: {
          text: "수십 개의 창구를 오가며 인내심을 쥐어짠 끝에 마침내 붉은 정정 도장을 받아 냈다. 지독한 관료제의 미궁에서 살아 돌아온 것만으로도 큰 성과였다.",
          stats: { Int: 3, WP: 2 },
          align: { ruthless: 3 }
        },
        fail: {
          text: "창구마다 서류가 반려되기를 반복하는 사이 배급이 끊겨 며칠을 굶주렸다. 결국 임시 신분 갱신료 명목으로 막대한 수수료 빚을 떠안고서야 간신히 등록을 되살렸다.",
          wounds: -8,
          stats: { Inf: -2 },
          addTags: ["imperial_debt"]
        },
        critFail: {
          text: "정정 청원서가 역으로 공문서 위조 혐의로 둔갑하고 말았다! 구금실 구석에서 매질을 당한 끝에 벌금형과 거액의 행정 채무를 뒤집어쓰고 풀려났다.",
          wounds: -15,
          stats: { Inf: -4, T: -2 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[특성·신분 우회] 천재적 계산·은빛 혀·귀족 혈통의 권위로 감사관의 책상을 압박한다",
        req: { anyTags: ["savant_genius", "silver_tongue", "noble"] },
        effect: {
          text: "상급 감사관을 직접 마주하고 장부 번호 체계의 치명적 오류나 가문의 인장을 들이밀었다. 진땀을 흘린 서기청 측이 그 자리에서 서류를 찢고 사과와 함께 배급을 즉시 복구해 주었다.",
          stats: { Inf: 4, Fel: 3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "관료들과 다투기를 포기하고 암시장 브로커에게 빚을 져 임시 배급표를 구한다",
        effect: {
          text: "아드미니스트라툼의 기계 톱니에 맞서 봐야 부서질 뿐이다. 고리대금업자에게 빚을 지고 가짜 통행패를 사들여 굶주림과 단속을 간신히 버텨 냈다.",
          wounds: -10,
          stats: { Inf: -2 },
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Dark Heresy / Warhammer 40,000 Core Rulebook (Adeptus Administratum)"
  },
  {
    id: "ev_s22_theme_02",
    title: "피의 십일조 — 착오 징발 영장",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "행성 총독부의 십일조 징발관이 성계 할당량을 맞추지 못하자, 이미 세금을 완납한 당신의 구역에 이중 징발 영장을 발부했다. 중무장한 징발대원들이 문 앞을 가로막고 곡물과 금속, 심지어 징집 인원까지 내놓으라며 총구를 들이대고 있다.",
    choices: [
      {
        label: "[친교 판정] 완납 영수증 사본을 흔들며 징발대 지휘관의 체면과 군율을 건드린다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "차분하면서도 서슬 퍼런 어조로 총독부 감사관의 이름을 거론하자 징발대 지휘관이 한 발 물러섰다. 이중 징발의 책임을 피하려던 지휘관은 서둘러 대열을 물렸다.",
          stats: { Fel: 5, Inf: 3 },
          addTags: ["silver_tongue"],
          align: { ruthless: 5 }
        },
        success: {
          text: "끝까지 물러서지 않고 완납 기록을 들이밀어 징발대의 약탈 명분을 무너뜨렸다. 지휘관은 욕설을 내뱉으면서도 빈손으로 돌아갔다.",
          stats: { Fel: 3, WP: 2 }
        },
        fail: {
          text: "징발대원들은 종이 쪼가리 따위는 알 바 아니라며 개머리판으로 문을 부수고 들이닥쳤다. 얻어맞은 채 가재도구와 비축 식량을 모두 빼앗기고 빚까지 지고 말았다.",
          wounds: -12,
          stats: { Inf: -2 },
          addTags: ["imperial_debt"]
        },
        critFail: {
          text: "감히 제국의 십일조에 항명했다는 죄목이 덧씌워졌다! 반항하던 팔다리가 무자비하게 짓밟혔고, 남은 재산마저 압류당한 채 빈털터리가 되었다.",
          wounds: -18,
          stats: { Inf: -4, T: -2 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[특성·신분 우회] 귀족의 면세 특권이나 백전노장·냉혈한의 살기로 징발대를 물리친다",
        req: { anyTags: ["noble", "notorious_ruthless", "battle_hardened"] },
        effect: {
          text: "면세 문장을 내보이거나, 숱한 전장을 겪은 자 특유의 얼어붙은 눈빛으로 지휘관을 노려보았다. 손쉬운 먹잇감이 아님을 직감한 징발대는 다른 구역으로 발길을 돌렸다.",
          stats: { WP: 3, Inf: 3 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "징발대의 요구대로 소유물과 빚을 끌어모아 바치고 목숨만 부지한다",
        effect: {
          text: "권력자의 착오 앞에 필멸자가 할 수 있는 일은 고개를 숙이는 것뿐이다. 비축 물자와 이웃에게 빌린 재물까지 긁어 바친 뒤에야 총구가 거두어졌다.",
          wounds: -8,
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Rogue Trader / Imperial Tithe Lore (Lexicanum)"
  },
  {
    id: "ev_s22_theme_03",
    title: "톱니바퀴와 살점 — 팩토룸 기계 사고",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "노후한 팩토룸의 고압 증기 밸브가 굉음과 함께 파열되며 작업장 일대가 끓는 기름과 쇳조각으로 뒤덮였다. 정작 기계 교리 점검을 게을리한 감독관과 엔지니어들은 책임을 피하기 위해 현장 작업자인 당신을 서비터 개조 명단에 올리려 든다.",
    choices: [
      {
        label: "[강인 판정] 끓어오르는 증기를 뚫고 수동 차단 레버를 내려 추가 붕괴를 막는다",
        check: { stat: "T", diff: -10 },
        critSuccess: {
          text: "살이 익어 가는 고통을 이악물고 견디며 붉게 달아오른 강철 레버를 끝내 꺾어 내렸다. 기계령의 폭주를 막아 낸 공로가 인정되어 서비터 징발은커녕 강철 같은 담력을 증명했다.",
          stats: { T: 5, WP: 4 },
          addTags: ["iron_nerves"],
          align: { humane: 5 }
        },
        success: {
          text: "화상과 타박상을 입으면서도 차단 밸브를 잠가 대형 폭발을 막았다. 감독관도 더는 책임을 떠넘기지 못하고 물러났다.",
          wounds: -6,
          stats: { T: 3, WS: 2 }
        },
        fail: {
          text: "뜨거운 증기와 파편이 팔다리를 깊게 찢어 놓았다. 겨우 목숨은 건졌으나 손상된 관절이 예전처럼 움직이지 않게 되었다.",
          wounds: -16,
          stats: { Ag: -3 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "무너진 프레스 기계의 강철 암이 다리와 어깨를 짓누르고 말았다! 간신히 서비터 개조만은 면했으나 평생 지워지지 않을 깊은 불구를 안게 되었다.",
          wounds: -24,
          stats: { Ag: -4, WS: -2 },
          addTags: ["crippled_limb"]
        }
      },
      {
        label: "[특성·신분 우회] 사반트의 정비 지식이나 하층민·시민의 현장 연대로 누명을 뒤집는다",
        req: { anyTags: ["savant_genius", "lowborn", "citizen"] },
        effect: {
          text: "파열된 밸브의 부식 흔적이 석 달 전 정비 기록 누락 때문임을 정확히 짚어내거나, 동료 작업자들의 일제 증언을 끌어냈다. 감독관은 꼬리를 말고 배상 청구서를 거두었다.",
          stats: { Int: 3, Inf: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "다친 몸을 끌고 막대한 설비 수리 배상금을 떠안는 조건으로 서비터행을 면한다",
        effect: {
          text: "로보토미 수술대에 오르는 것만은 피해야 했다. 상처를 대충 동여맨 채 평생 갚아야 할 설비 배상 채무 증서에 지장을 찍었다.",
          wounds: -14,
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Dark Heresy / Necromunda: Hive War"
  },
  {
    id: "ev_s22_theme_04",
    title: "벽 너머의 밀고자 — 무고한 이단 고발",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "배급 다툼 끝에 원한을 품은 이웃이 당신의 거처에서 기괴한 이단 부적이 나왔다고 국교 감시단에게 밀고했다. 한밤중에 횃불과 쇠스랑을 든 마녀사냥 군중과 감시단원들이 문을 두드리며 당장 이단자를 끌어내라고 아우성친다.",
    choices: [
      {
        label: "[의지 판정] 횃불 앞에서 한 치의 흔들림 없이 제국 교리와 신앙을 암송해 결백을 입증한다",
        check: { stat: "WP", diff: -10 },
        critSuccess: {
          text: "폭도들의 고함 속에서도 눈 하나 깜짝하지 않고 황제의 기도문을 우렁차게 읊어 나갔다. 오히려 모함한 이웃의 떨리는 시선이 탄로 나며 강철의 신경을 인정받았다.",
          stats: { WP: 5, Inf: 3 },
          faith: 6,
          addTags: ["iron_nerves"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "차분한 신앙 고백과 결백한 태도에 감시단원이 수색을 중단했다. 폭도들도 김이 빠져 흩어졌다.",
          stats: { WP: 3 },
          faith: 3
        },
        fail: {
          text: "폭도들이 던진 돌과 몽둥이 세례 속에 밤새 취조를 당했다. 혐의 없음으로 풀려났으나 군중의 광기가 남긴 공포가 신경을 갉아먹었다.",
          wounds: -12,
          stats: { WP: -3 },
          addTags: ["shell_shocked"]
        },
        critFail: {
          text: "정화 의식이라는 이름의 모진 고문 끝에 겨우 목숨만 건져 풀려났다. 귓가에는 여전히 군중의 저주와 화형대의 불꽃 소리가 환청처럼 맴돈다.",
          wounds: -20,
          stats: { WP: -5 },
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[특성 우회] 은빛 혀로 모순을 파고들거나, 블랭크·냉혈한의 서늘한 기운으로 군중을 얼어붙게 한다",
        req: { anyTags: ["silver_tongue", "blank", "notorious_ruthless"] },
        effect: {
          text: "밀고자의 허점을 날카롭게 찔러 역고발하거나, 곁에 서 있는 것만으로 한기가 도는 서늘한 위압감으로 앞장선 폭도들을 주저앉혔다. 군중은 슬금슬금 뒷걸음질쳤다.",
          stats: { Inf: 4, WP: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "감시단에게 뇌물을 쥐여 주고 거처를 버린 채 하층 구역으로 야반도주한다",
        effect: {
          text: "억울함을 풀 시간 따위는 없었다. 푼돈과 빚을 모아 감시단의 눈을 감긴 뒤, 모든 살림을 버리고 어둠 속으로 몸을 숨겼다.",
          wounds: -8,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Dark Heresy: Blood of Martyrs / Ecclesiarchy Witch-Hunt Lore"
  },
  {
    id: "ev_s22_theme_05",
    title: "독이 든 성배 — 귀족 연회 독살 누명",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "상층 스파이어의 연회장에서 대귀족의 측근이 붉은 거품을 물고 쓰러졌다. 암살의 여파로 연회장이 아수라장이 된 가운데, 하객들과 가문 경비대의 의심 어린 시선이 가장 만만한 외부인인 당신에게 쏠린다.",
    choices: [
      {
        label: "[지성 판정] 잔의 찌꺼기와 시종들의 미세한 동선을 훑어 진짜 독살범을 지목한다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "수정 잔 바닥에 남은 미량의 침전물과 구석으로 물러나는 시종의 소매를 단번에 포착했다. 치명적 음모를 현장에서 뒤집은 눈썰미로 연회장의 인정을 받았다.",
          stats: { Int: 5, Inf: 4 },
          addTags: ["battle_hardened"],
          align: { ruthless: 5 }
        },
        success: {
          text: "독주가 건네진 경로를 정확히 짚어내어 경비대의 시선을 진범 쪽으로 돌렸다. 누명에서 무사히 벗어났다.",
          stats: { Int: 4, Ag: 2 }
        },
        fail: {
          text: "진범을 놓친 대가로 독살 공범으로 몰려 지하 감옥에서 독극물 자백제 고문을 견뎌야 했다. 풀려난 뒤에도 혈관에 독기가 맴도는 듯하다.",
          wounds: -12,
          stats: { T: -2 },
          addTags: ["chronic_toxins"]
        },
        critFail: {
          text: "기미 검사를 명목으로 독이 묻은 잔을 강제로 들이켜고 말았다! 해독제를 맞고 살아남았으나 장기에 독소가 깊게 스며들었다.",
          wounds: -20,
          stats: { T: -4 },
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "[특성·신분 우회] 귀족 혈통의 면책권·은빛 혀·사반트의 독물 지식으로 심문을 무력화한다",
        req: { anyTags: ["noble", "silver_tongue", "savant_genius"] },
        effect: {
          text: "가문의 격식을 내세워 즉결 심문을 거부하거나, 독성의 반응 시간상 자신이 범인일 수 없음을 논리적으로 입증했다. 경비대장은 고개를 숙여 사과했다.",
          stats: { Inf: 4, Int: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "독극물 일부를 삼켜 가며 알리바이를 증명한 뒤 구금 끝에 풀려난다",
        effect: {
          text: "말로 믿지 않는 귀족들 앞에서 직접 잔을 적셔 결백을 보일 수밖에 없었다. 저급 해독제로 목숨은 건졌으나 몸에 만성 독기가 남았다.",
          wounds: -12,
          addTags: ["chronic_toxins"]
        }
      }
    ],
    source: "Dark Heresy: The Inquisitor's Handbook / Hive Nobility Lore"
  },
  {
    id: "ev_s22_theme_06",
    title: "깜빡이는 방벽 — 워프 항해 중 겔러 필드 이변",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 초인/악마 제외",
    weight: 28,
    text: "이마테리움을 항해하던 수송함의 겔러 필드가 단 0.3초 동안 깜빡였다. 그 짧은 틈으로 스며든 비현실의 냉기가 선실 벽면을 뒤틀고, 곁에 있던 승무원 몇몇이 눈을 뒤집은 채 광기에 휩싸여 동료를 향해 달려들기 시작했다.",
    choices: [
      {
        label: "[의지 판정] 아퀼라 성호를 쥔 채 워프의 속삭임을 정면으로 버텨 내며 선실을 지킨다",
        check: { stat: "WP", diff: -12 },
        critSuccess: {
          text: "머릿속을 찢는 듯한 악마의 환청을 신앙과 의지로 단숨에 짓눌렀다. 광란에 빠진 승무원들까지 제압하고 나자 어떤 공포에도 흔들리지 않는 강철의 신경이 자리 잡았다.",
          stats: { WP: 6, Inf: 3 },
          faith: 5,
          addTags: ["iron_nerves"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "이를 악물고 기도문을 외우며 이성의 끈을 놓지 않았다. 겔러 필드가 완전히 복구될 때까지 선실의 질서를 지켜 냈다.",
          stats: { WP: 4 },
          faith: 3
        },
        fail: {
          text: "짧은 순간 눈앞에 스친 워프의 심연이 영혼에 깊은 생채기를 남겼다. 겔러 필드는 복구되었으나 밤마다 비현실적인 악몽이 따라붙는다.",
          wounds: -10,
          corruption: 6,
          stats: { WP: -2 },
          addTags: ["warp_scarred"]
        },
        critFail: {
          text: "뒤틀린 그림자가 살갗을 스치고 지나가며 차가운 워프 흉터를 새겨 넣었다! 간신히 죽음은 면했으나 영혼 일부가 이마테리움의 냉기에 물들고 말았다.",
          wounds: -18,
          corruption: 12,
          stats: { WP: -4 },
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[특성 우회] 블랭크의 무혼 장막이나 강철의 신경·백전노장의 침착함으로 격벽을 봉쇄한다",
        req: { anyTags: ["blank", "iron_nerves", "battle_hardened"] },
        effect: {
          text: "주변의 워프 기운을 무효화하는 무혼의 공허를 펼치거나, 흔들림 없는 손놀림으로 비상 격벽 레버를 내렸다. 광기에 물든 구역을 깔끔히 차단해 인명 피해를 막았다.",
          stats: { WP: 3, T: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "강철 격벽 구석에 웅크려 귀를 막고 필드가 안정될 때까지 공포를 온몸으로 견딘다",
        effect: {
          text: "눈을 감고 귀를 막은 채 0.3초가 영원처럼 늘어지는 지옥을 버텼다. 목숨은 부지했으나 신경 계통에 깊은 충격이 남았다.",
          wounds: -12,
          corruption: 4,
          addTags: ["shell_shocked"]
        }
      }
    ],
    source: "Rogue Trader: Edge of the Abyss / Gellar Field Lore"
  },
  {
    id: "ev_s22_theme_07",
    title: "통금 시간의 쇠몽둥이 — 치안대의 오인 검거",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "야간 폭동을 진압하던 아르비테스 및 치안대가 교대 귀가 중이던 당신을 반란 선동자로 오인해 포위했다. 해명할 틈도 없이 전류가 흐르는 쇼크 마울과 방패가 사방에서 좁혀 들어온다.",
    choices: [
      {
        label: "[민첩 판정] 방패 틈새를 파고들어 좁은 환기 통로로 몸을 날려 추적을 따돌린다",
        check: { stat: "Ag", diff: -10 },
        critSuccess: {
          text: "내리꽂히는 쇼크 마울의 궤적을 종이 한 장 차이로 흘려보내고 어두운 배관 통로로 완벽히 사라졌다. 절체절명의 위기를 돌파하며 생존 감각이 한층 날카로워졌다.",
          stats: { Ag: 5, Int: 3 },
          addTags: ["battle_hardened"],
          align: { ruthless: 4 }
        },
        success: {
          text: "찰과상을 입으면서도 재빠르게 골목 지형을 이용해 치안대의 포위망을 벗어났다.",
          wounds: -4,
          stats: { Ag: 3 }
        },
        fail: {
          text: "도망치던 중 다리에 쇼크 마울을 정통으로 맞고 쓰러졌다. 오해는 풀렸으나 부서진 무릎 관절에 영구적인 장애가 남았다.",
          wounds: -16,
          stats: { Ag: -3 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "연속적인 전기 충격과 구타 끝에 팔다리 뼈가 어긋난 채 구금실에 던져졌다! 무혐의로 풀려났을 때는 이미 몸이 성치 않았다.",
          wounds: -22,
          stats: { Ag: -4, T: -2 },
          addTags: ["crippled_limb"]
        }
      },
      {
        label: "[특성·신분 우회] 제국 시민 패찰·귀족 인장·은빛 혀로 치안대 소대장을 멈춰 세운다",
        req: { anyTags: ["citizen", "noble", "silver_tongue"] },
        effect: {
          text: "합법적인 통행 기록과 신분증을 흔들며 상급 법무관의 감사 조항을 읊자, 치안대 소대장이 혀를 차며 쇼크 마울을 거두고 통행을 허가했다.",
          stats: { Fel: 3, Inf: 2 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "무저항으로 무릎을 꿇고 매질과 구금, 벌금을 감수한 뒤 풀려난다",
        effect: {
          text: "법의 쇠몽둥이 앞에서 항변은 더 큰 폭력을 부를 뿐이다. 몇 대의 타박상과 벌금 채무를 떠안고서야 새벽녘에 풀려났다.",
          wounds: -14,
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Dark Heresy: Book of Judgement (Adeptus Arbites)"
  },
  {
    id: "ev_s22_theme_08",
    title: "신앙세의 족쇄 — 교구 고해사의 면죄부 강매",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "구역 예배당의 탐욕스러운 고해사가 당신의 가계에 불경의 흔적이 보인다는 억지 트집을 잡았다. 당장 거액의 속죄 헌금을 바치고 면죄부를 사지 않으면 이단 심문 목록에 이름을 올리겠다는 노골적인 협박이다.",
    choices: [
      {
        label: "[친교 판정] 예배당 신도들 앞에서 고해사의 헌금 착복 의혹을 신앙의 이름으로 역공한다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "성전의 구절을 인용하며 가난한 신도들의 고혈을 짜내는 자야말로 황제의 수치라고 일갈했다. 웅성거리는 신도들 앞에서 체면이 구겨진 고해사는 황급히 자리를 피했다.",
          stats: { Fel: 5, Inf: 3 },
          faith: 4,
          addTags: ["silver_tongue"],
          align: { humane: 5 }
        },
        success: {
          text: "많은 눈이 지켜보는 가운데 당당히 결백을 주장해 고해사의 강매 시도를 무산시켰다.",
          stats: { Fel: 3, WP: 2 }
        },
        fail: {
          text: "고해사가 내뱉은 파문 위협에 주위 신도들마저 등을 돌렸다. 결국 빚을 내어 강매된 면죄부를 사들이며 모멸감을 삼켰다.",
          faith: -5,
          stats: { Inf: -2 },
          addTags: ["imperial_debt"]
        },
        critFail: {
          text: "신성 모독죄가 추가되어 예배당 지하에서 며칠간 속죄 노역을 치르고 막대한 벌금 채무까지 떠안았다.",
          wounds: -12,
          faith: -8,
          stats: { Inf: -4 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[특성 우회] 강철의 신경·냉혈한의 위압·사반트의 교리 지식으로 협박을 꺾는다",
        req: { anyTags: ["iron_nerves", "notorious_ruthless", "savant_genius"] },
        effect: {
          text: "눈썹 하나 까딱하지 않고 고해사의 비리를 정확히 짚어내거나, 말없이 상대를 얼어붙게 만드는 살기를 내뿜었다. 고해사는 헛기침을 하며 슬며시 물러났다.",
          stats: { WP: 3, Inf: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "이단 낙인을 피하기 위해 빚을 내어 면죄부 두루마리를 사들이고 물러난다",
        effect: {
          text: "부패한 성직자라도 국교의 권위를 두른 이상 맞서기 어렵다. 피눈물을 삼키며 빚을 져 속죄 헌금을 바치고 조사를 덮었다.",
          wounds: -5,
          faith: -4,
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Dark Heresy: Blood of Martyrs / Ecclesiarchy Lore"
  },
  {
    id: "ev_s22_theme_09",
    title: "오염된 정화수 — 계급 장벽과 구역 봉쇄",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "상층 스파이어의 공업 폐수가 하층 거주 구역의 정수 시설로 역류해 독한 악취와 역병이 번지기 시작했다. 그러나 귀족 당국은 시설을 수리하는 대신 오염이 위로 올라오지 못하게 하층 구역 승강기와 방벽을 통째로 봉쇄해 버렸다.",
    choices: [
      {
        label: "[강인 판정] 유독 가스와 오염수가 차오르는 배수로를 맨몸으로 헤쳐 정비 통로로 탈출한다",
        check: { stat: "T", diff: -10 },
        critSuccess: {
          text: "폐를 찌르는 화학 연기를 견디며 침수된 배수로의 잠금장치를 부수고 빠져나왔다. 극한의 악조건을 뚫고 살아남은 끈기가 몸에 새겨졌다.",
          stats: { T: 5, WP: 3 },
          addTags: ["battle_hardened"],
          align: { ruthless: 4 }
        },
        success: {
          text: "코와 입을 천으로 동여맨 채 간신히 오염 지대를 벗어나 상층 정비 구역으로 올라섰다.",
          wounds: -6,
          stats: { T: 3 }
        },
        fail: {
          text: "탈출 도중 독한 화학 폐수를 들이마시고 말았다. 목숨은 건졌으나 호흡기와 혈관에 만성적인 독소 후유증이 남았다.",
          wounds: -14,
          stats: { T: -3 },
          addTags: ["chronic_toxins"]
        },
        critFail: {
          text: "부식성 폐수 웅덩이에 빠져 온몸이 짓무른 채 간신히 기어 나왔다! 심각한 중독으로 오랫동안 기침과 발작에 시달리게 되었다.",
          wounds: -22,
          stats: { T: -4, WS: -2 },
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "[특성·신분 우회] 귀족의 직통 암호키·하층민의 비밀 통로·사반트의 수압 계산으로 우회한다",
        req: { anyTags: ["noble", "lowborn", "savant_genius"] },
        effect: {
          text: "당국의 통제망 밖에 있는 비상 승강기 암호를 사용하거나, 하층민만이 아는 오래된 환풍로를 따라 오염 구역을 깔끔히 빠져나왔다.",
          stats: { Int: 2, Ag: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "봉쇄가 해제될 때까지 며칠간 오염된 배급수와 독한 공기 속에서 버티며 연명한다",
        effect: {
          text: "나갈 길이 막힌 이상 버티는 수밖에 없었다. 썩은 물과 매캐한 공기를 마시며 살아남았으나 몸속에 독기가 깊이 배고 말았다.",
          wounds: -10,
          addTags: ["chronic_toxins"]
        }
      }
    ],
    source: "Necromunda: Underhive / Imperial Hive Class Lore"
  },
  {
    id: "ev_s22_theme_10",
    title: "사라진 감사관의 빚 — 상급자 횡령 죄목 전가",
    category: "그림다크 시련",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 난이도 · 16세 이상 · 크리그/초인/악마 제외",
    weight: 28,
    text: "직속 상급자가 보급 물자와 공금을 빼돌린 채 성계 밖으로 도주하자, 제국 감사청은 실무 서류에 마지막으로 서명한 당신에게 모든 횡령 죄목과 변상 책임을 뒤집어씌웠다. 당장 결백을 입증하지 못하면 전 재산 압류와 처형이 기다린다.",
    choices: [
      {
        label: "[지성 판정] 위조된 결재 인장과 화물선 출항 기록의 시차를 대조해 조작을 폭로한다",
        check: { stat: "Int", diff: -12 },
        critSuccess: {
          text: "상급자가 도주 전 남긴 시간대별 출항 로그와 인장 마모도를 완벽히 대조해 냈다. 감사청은 당신의 무고함을 인정했을 뿐 아니라 명석한 언변과 논리에 깊은 인상을 받았다.",
          stats: { Int: 6, Inf: 4 },
          addTags: ["silver_tongue"],
          align: { ruthless: 5 }
        },
        success: {
          text: "서류상의 날짜 모순을 찾아내어 상급자의 단독 범행임을 입증했다. 지독한 누명에서 간신히 벗어났다.",
          stats: { Int: 4, WP: 2 }
        },
        fail: {
          text: "감사관들은 하급자의 변명을 귀담아듣지 않았다. 처형만은 면했으나 사라진 상급자의 횡령액 일부를 변상해야 하는 거액의 채무를 떠안았다.",
          wounds: -8,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"]
        },
        critFail: {
          text: "항변이 공범의 발뺌으로 간주되어 모진 취조를 당한 뒤 징벌적 배상 판결이 내려졌다. 평생을 갚아도 모자랄 빚더미에 앉고 말았다.",
          wounds: -16,
          stats: { Inf: -5, WP: -2 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[특성 우회] 사반트의 장부 역산·은빛 혀·냉혈한의 협박으로 감사청의 시선을 돌린다",
        req: { anyTags: ["savant_genius", "silver_tongue", "notorious_ruthless"] },
        effect: {
          text: "공금이 흘러간 진짜 유령 계좌를 역추적해 내거나, 감사관의 약점을 쥔 채 사건을 상급자의 단독 탈주로 종결짓게 만들었다.",
          stats: { Int: 3, Inf: 3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "항변을 포기하고 징벌적 변상 채무를 떠안는 조건으로 처형을 면한다",
        effect: {
          text: "권력자의 죄를 말단이 대신 짊어지는 것은 제국에서 너무도 흔한 일이다. 굴욕적인 변상 서약서에 서명하고 목숨만 건졌다.",
          wounds: -6,
          stats: { Inf: -4 },
          addTags: ["imperial_debt"]
        }
      }
    ],
    source: "Dark Heresy / Adeptus Administratum Audit Lore"
  }
];
