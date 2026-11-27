// 분기 사건 — 무명 7행성 · 기사 행성 심화 및 변경의 후원자 회수 아크 (12건)
export default [
  {
    id: "ev_s20_gw_01",
    title: "기사 행성 — 출정 전야의 사크리스탄 보급 부역",
    category: "행성 심화",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["generic_knight"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeRealms: ["heretic"],
      excludeTags: [
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster",
        "lord_inquisitor", "cardinal", "fabricator_general", "navy_admiral", "assassin"
      ]
    },
    reqLabel: "행성: 기사 행성 · 14세+ 비이단 필멸자",
    weight: 32,
    text: "성계 외곽 성전군의 긴급 소집령이 떨어지자, 고성 아래 사크리스탄 성소가 밤샘 무장 정비에 돌입했다. 영주 가문의 집사들은 성하 마을의 장인과 방위군, 방계 식솔까지 불러 모아 열화 프로메튬 연료통과 이온 실드 예비 축전지를 산길 너머 성채 격납고로 올리라는 부역령을 내렸다. 폭우로 진창이 된 비탈길 초입에서 중량 수레 한 대의 차축이 부러지며 축전지 냉각수가 끓어오르기 시작했다.",
    choices: [
      {
        label: "[기사 가문·사크리스탄 전용] 성소 규약으로 예비 견인 서비터를 즉시 배정해 수송 대열을 수습한다",
        req: { anyTags: ["imperial_knight", "knight_blood", "sacristan_oath"] },
        effect: {
          text: "가문과 성소의 권한으로 중량 견인 서비터 두 기를 즉각 투입했다. 파손된 축전지가 안전하게 회수되었고, 기사단 출정 보급은 단 한 시각의 지체도 없이 완료되었다.",
          stats: { Inf: 6, Int: 4, WP: 3 },
          faith: 4,
          align: { dogmatic: 5, humane: 4 }
        }
      },
      {
        label: "[지성 판정] 누출 밸브를 임시 봉합하고 지렛대로 수레를 고정해 인부들의 화상을 막는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "끓어오르는 냉각관의 압력 밸브를 정확히 잠그고 통나무 지렛대로 차축을 받쳐 냈다. 인부 한 사람 다치지 않은 채 귀중한 축전지를 성채까지 무사히 올려보냈다.",
          stats: { Int: 6, T: 3, Fel: 4 },
          align: { humane: 7 }
        },
        fail: {
          text: "밸브를 틀어막는 사이 새어 나온 고온 증기에 팔뚝을 데었다. 가까스로 수레 전복만은 막아 냈으나 한동안 화상 치료를 받아야 했다.",
          wounds: -12,
          stats: { Int: 3, T: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "[강인 판정] 진창 비탈길을 온몸으로 버텨 수레를 붙들고 출정 보급 기한을 지켜 낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "쏟아지는 폭우 속에서 쇠줄을 어깨에 감고 버텨 내자, 뒤따르던 인부들이 일제히 힘을 보태 수레를 끌어 올렸다. 성채 집사장이 그대의 근성과 충절을 높이 치하했다.",
          stats: { T: 6, WS: 4, Inf: 5 },
          faith: 3,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "미끄러운 진흙에 발이 꺾이며 수레 틀에 어깨를 강하게 부딪쳤다. 상처를 입고도 끝내 보급 대열을 놓지 않아 출정 시한은 맞출 수 있었다.",
          wounds: -16,
          stats: { T: 3, WP: 3 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "사크리스탄 정비반이 도착할 때까지 파손된 수레 주변에 경계선을 치고 남은 대열을 통과시킨다",
        effect: {
          text: "무리하게 직접 수레를 건드리지 않고 안전 거리를 확보한 덕분에 2차 폭발이나 인명 피해는 막았다. 수송은 다소 늦어졌으나 규정에 따른 침착한 현장 통제로 평가받았다.",
          stats: { WP: 3, Int: 3 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Imperial Knights / Lexicanum: Sacristan"
  },
  {
    id: "ev_s20_gw_02",
    title: "기사 행성 — 두 남작령의 목초지 경계 분쟁",
    category: "행성 심화",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["generic_knight"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeRealms: ["heretic"],
      excludeTags: ["assassin", "high_lord_terra", "warmaster", "sector_lord"]
    },
    reqLabel: "행성: 기사 행성 · 14세+ 비이단 필멸자",
    weight: 34,
    text: "기사 행성의 고원 지대를 가르는 강줄기가 봄 홍수로 물길을 바꾼 뒤, 이웃한 두 방계 남작령이 비옥한 방목지와 소규모 철광 채굴권을 두고 무장 시종 보병대를 대치시켰다. 본가 대군주의 나이트 랜스가 외지 전선으로 출정한 틈에 벌어지는 사적인 내전은 봄철 파종과 영지 방위를 송두리째 흔들 위기였다. 횃불이 타오르는 돌다리 양편에서 양측 기사 대리인과 촌장들이 결투 선포 직전의 험악한 언쟁을 벌이고 있다.",
    choices: [
      {
        label: "[교섭 판정] 봉건 칙허장을 대조해 공동 방목과 채굴세 분할 협정을 중재한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "오래된 경계 조항과 양측의 실익을 정교하게 엮어 내자 격앙되었던 남작 대리인들이 마침내 무기를 거두었다. 피를 흘리지 않고 파종기와 영지를 지켜 낸 그대를 향해 두 영지의 촌장과 장인 조합이 깊은 감사를 바쳤다.",
          stats: { Fel: 7, Inf: 7, Int: 3 },
          align: { humane: 8 },
          addTags: ["frontier_patron"]
        },
        fail: {
          text: "자존심이 상한 양측 보병대 사이에서 거친 몸싸움이 번지며 중재가 반쯤 어그러졌다. 어깨에 멍이 들었으나, 다행히 전면전만은 막아 냈다.",
          wounds: -10,
          stats: { Fel: 3, WP: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 대군주 부재 중 사병 동원은 십일조 태만이라며 양측을 엄히 호령한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "제국법과 대군주의 서약을 일갈하는 서슬 퍼런 기세에 두 남작령의 대리인들이 고개를 숙였다. 병력이 즉각 해산되고 경계 분쟁은 성채 평의회 판결로 넘겨졌다.",
          stats: { WP: 6, Inf: 6, Fel: 3 },
          faith: 4,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "명예를 모욕당했다며 흥분한 남작 호위병과 검을 맞대고 물러서야 했다. 권위는 다소 깎였으나 소란이 커지자 양측 모두 일단 철수했다.",
          wounds: -14,
          stats: { WP: 3, Inf: -2 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "성채 대리 평의회에 공식 조정 요청서를 보내고 판결이 내려질 때까지 돌다리 통행만 멈춘다",
        effect: {
          text: "어느 한쪽 편을 들지 않고 봉건 법정 절차에 따라 양측의 무력 충돌을 유예시켰다. 극적인 화해는 이루지 못했으나 성채 법관이 도착할 때까지 유혈 사태만은 막아 냈다.",
          stats: { WP: 3, Fel: 3 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Imperial Knights / Kingsblade"
  },
  {
    id: "ev_s20_gw_03",
    title: "문명 행성 — 주청사 의회의 전시 특별세와 함대 분담금 논쟁",
    category: "정치",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["generic_civilised"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 문명 행성 · 16세+ 비이단 필멸자",
    weight: 34,
    text: "성계 순찰 함대의 수리비와 궤도 대공 포대 증설을 위해 행성 주청사 의회에 막대한 전시 특별세 법안이 상정되었다. 대리석 원형 의사당에는 행성 귀족 가문과 거상 조합, 방위군 대표, 자치 구역 위원들이 빼곡히 모여 서로에게 세금 부담을 떠넘기며 닷새째 격론을 벌이고 있었다. 외곽 성로의 해적 출몰 보고가 잇따르는 가운데, 오늘 안에 분담금 결의가 통과되지 못하면 행성 궤도 방위선의 탄약 보급이 끊길 절박한 상황이다.",
    choices: [
      {
        label: "[교섭 판정] 귀족 선단과 상인 조합이 분담하되 궤도 호송 우선권을 받는 타협안을 관철한다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "그대의 치밀한 재정 명세와 절절한 웅변이 반목하던 귀족원 의장과 조합 대표들을 동시에 기립 박수하게 만들었다. 원형 의사당 만장일치로 공정한 전시 특별세와 외곽 상단 보호 협약이 통과되었고, 행성 전역의 자치구와 무역 조합이 그대를 변경의 믿음직한 후원자로 추대했다.",
          stats: { Fel: 9, Inf: 10, Int: 5 },
          faith: 4,
          align: { humane: 9, dogmatic: 3 },
          addTags: ["frontier_patron"]
        },
        success: {
          text: "정교한 세금 배분안으로 첨예한 이해 충돌을 잠재웠다. 방위 함대 보급 예산이 제때 확보되고 과중한 서민 증세가 철회되면서, 변경 자치 조합들이 그대의 중재에 깊은 신의를 표했다.",
          stats: { Fel: 6, Inf: 7, Int: 4 },
          align: { humane: 7 },
          addTags: ["frontier_patron"]
        },
        fail: {
          text: "이해관계가 얽힌 의원들의 야유 속에 타협안은 반쪽짜리 수정안으로 깎여 나갔다. 겨우 함대 보급선만 유지했으나 의회 내에 적잖은 정적이 생겨났다.",
          stats: { Fel: 2, Inf: -3, WP: 3 },
          align: { humane: 3 }
        },
        critFail: {
          text: "연설 도중 정적이 흘린 조작된 회계 장부가 의사당에 뿌려지며 그대가 특정 상단과 결탁했다는 거센 비난이 터져 나왔다. 경비대에게 떠밀려 연단에서 내려오는 모욕을 겪고, 반대파가 평범한 시민 구역에 무거운 일괄세를 떠넘기는 꼴을 지켜봐야 했다.",
          stats: { Fel: -4, Inf: -8, WP: 2 },
          wounds: -12,
          align: { humane: 2, ruthless: -2 }
        }
      },
      {
        label: "[지성 판정] 주청사 재정 감사를 밀어붙여 은닉된 귀족 관세와 군납 비리를 들춰낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "세관 장부에서 빼돌려진 호화품 관세와 허위 탄약 납품 대금이 낱낱이 드러났다. 추징금만으로 방위 함대 수리비가 단숨에 충당되며 의회 내 부패 세력이 크게 위축되었다.",
          stats: { Int: 7, Inf: 6, WP: 4 },
          align: { dogmatic: 7, humane: 3 }
        },
        fail: {
          text: "핵심 장부가 밤사이 불타 버리며 감사 근거가 흔들렸다. 귀족 파벌의 보복성 견제로 입지가 줄어들고 치안 소동에 휘말려 타박상을 입었다.",
          wounds: -8,
          stats: { Int: 3, Inf: -4 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "전시 비상을 선포해 전 구역 일괄 징세를 강행하고 의회 논쟁을 즉시 종결한다",
        effect: {
          text: "의사당 출입문이 닫히고 비상 징세 포고령이 행성 전역에 송출되었다. 함대 보급은 하루 만에 해결되었으나, 민심과 사교계 신망이 싸늘하게 식어 버렸다.",
          stats: { WP: 3, Inf: 3, Fel: -2 },
          faith: 2,
          align: { dogmatic: 5, ruthless: 4, humane: -5 }
        }
      }
    ],
    source: "Dark Heresy 1e: Core Rulebook / Lexicanum: Civilised World"
  },
  {
    id: "ev_s20_gw_04",
    title: "문명 행성 — 우주항 위조 통행증과 밀입국 조직 색출",
    category: "정치",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["generic_civilised"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 문명 행성 · 16세+ 비이단 필멸자",
    weight: 31,
    text: "행성 중앙 우주항의 화물 세관 구역에서 정교하게 위조된 아드미니스트라툼 성간 통행증 수백 매와 이중 바닥 화물 컨테이너가 무더기로 적발되었다. 밀입국 조직이 빼돌려 들여온 인원 상당수는 인접 전쟁 성계에서 간신히 탈출한 필사적인 피난민들이지만, 화물 칸 깊숙한 곳에서는 출처 불명의 밀수 무기와 신원을 감춘 무장 용병 몇 명도 함께 발견되었다. 우주항 세관장이 항만 전체를 봉쇄하고 일괄 압송 명령을 내리기 직전, 그대가 현장 검문 서류와 컨테이너 배치도를 먼저 손에 넣었다.",
    choices: [
      {
        label: "[아르비테스·이단심문소 전용] 제국법 권한으로 무장 밀수꾼만 격리 체포하고 피난민 심사는 분리한다",
        req: { anyTags: ["arbites", "inquisitor", "inquisition_agent"] },
        effect: {
          text: "제국 법집행 권한을 발동해 밀수 무기를 감춘 용병 조직만 정확히 골라내어 압송했다. 무고한 전쟁 피난민들이 반역 공범으로 묶이는 참극 없이 항만 질서를 깔끔히 회복했다.",
          stats: { Int: 5, Inf: 6, WP: 4 },
          faith: 5,
          align: { dogmatic: 5, humane: 4 }
        }
      },
      {
        label: "[지성 판정] 위조 통행증의 인장 오차와 선적 장부를 대조해 무장 용병과 피난민을 갈라낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "치밀한 필적과 화물 중량 대조로 무장 밀수 조직이 숨어든 컨테이너만 정확히 특정했다. 용병단은 전원 체포되었고, 전쟁을 피해 온 피난민들은 정식 구호 수용소로 이송되었다.",
          stats: { Int: 7, Fel: 4, Inf: 5 },
          align: { humane: 7, dogmatic: 3 }
        },
        fail: {
          text: "검문 도중 정체가 탄로 난 무장 용병들이 발포하며 현장이 아수라장이 되었다. 부상을 입으면서도 끝내 무기 상자만은 압수했다.",
          wounds: -12,
          stats: { Int: 3, WP: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 밀입국 중개인을 은밀히 추궁해 무장 용병만 넘기고 뒷거래 인맥을 장악한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "세관에 넘겨질 위기에 놓인 중개인이 살길을 찾으려 용병단 은신처와 항만 밀수 통로 명단을 모조리 바쳤다. 무장 범죄자 검거 공적과 항만 정보망을 함께 거머쥐었다.",
          stats: { Fel: 5, Inf: 6, Int: 3 },
          align: { ruthless: 7, humane: -4 }
        },
        fail: {
          text: "협박에 격분한 중개인의 호위꾼들과 격투가 벌어져 상처를 입었다. 세관 경비대가 들이닥치며 거래는 물거품이 되고 의심만 샀다.",
          wounds: -14,
          stats: { Inf: -3, WP: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "절차대로 위조 통행증과 화물 목록을 세관 본부에 정식 이관하고 현장 경계만 유지한다",
        effect: {
          text: "감정에 휘둘리지 않고 세관 규정에 따라 모든 압수품과 명단을 상급 심의관에게 넘겼다. 개인적인 공적은 크지 않았으나 한 치의 월권도 남기지 않은 단정한 처리였다.",
          stats: { WP: 3, Int: 3 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Imperium Maledictum Core / Lexicanum: Civilised World"
  },
  {
    id: "ev_s20_gw_05",
    title: "농업 행성 — 궤도 사일로 승강기 파업과 자동 수확기 마비",
    category: "행성 심화",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["generic_agri"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 농업 행성 · 14세+ 비이단 필멸자",
    weight: 32,
    text: "수확철 폭우가 사흘 앞으로 다가온 시점, 거대 곡물 사일로와 궤도 수송선을 잇는 주 승강기 노동자들이 안전 장치 없는 36시간 연속 교대에 반발해 작업을 멈추었다. 설상가상으로 대평원을 가로지르는 기계교 소속 자동 수확기 세 대마저 동력 코일이 과열되어 진흙밭 한가운데 멈춰 섰다. 비구름이 들이닥치기 전에 곡물을 사일로로 올리지 못하면 성계 전체의 분기 식량 수송 일정이 파탄 날 위기다.",
    choices: [
      {
        label: "[기계교 전용] 이진 성가와 예비 냉각 성유로 수확기 기계령을 즉각 진정시키고 승강기를 재조정한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "축성된 냉각 성유와 정확한 출력 재조율로 멈춰 있던 수확기 세 대가 일제히 굉음을 되찾았다. 승강기 과부하 경보도 해소되어 폭우 전에 모든 수확물이 궤도로 올려졌다.",
          stats: { Int: 7, Inf: 6, T: 3 },
          faith: 4,
          align: { dogmatic: 5, humane: 3 }
        }
      },
      {
        label: "[지성 판정] 과열된 수확기 열교환기를 수동 분해해 냉각하고 승강기 감속 기어를 수리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "기름투성이가 된 채 얽힌 감속 기어와 냉각 배관을 정확히 손봐 냈다. 기계가 다시 돌아가자 작업장의 불안이 가라앉고 사일로 선적이 제시간에 재개되었다.",
          stats: { Int: 7, T: 4, Inf: 5 },
          align: { humane: 5, dogmatic: 3 }
        },
        fail: {
          text: "압력이 남은 냉각 파이프가 터지며 뜨거운 증기에 어깨를 데었다. 응급 처치로 수확기 한 대만은 겨우 되살려 최악의 흉작은 피했다.",
          wounds: -14,
          stats: { Int: 3, T: 3 },
          align: { dogmatic: 2 }
        }
      },
      {
        label: "[교섭 판정] 감독관과 노동자 대표를 설득해 교대 휴식과 방호 장구를 보장하고 수확을 재개한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "폭우로 십일조가 망가지면 모두가 죽는다는 현실적인 호소가 양측을 움직였다. 안전 교대 규약이 즉석에서 서명되자 승강기 노동자들이 환호하며 작업대로 복귀했다.",
          stats: { Fel: 7, Inf: 6, WP: 3 },
          align: { humane: 8 }
        },
        fail: {
          text: "양측의 불신이 깊어 언쟁 끝에 몸싸움이 번졌다. 겨우 절반의 인원만 작업에 복귀시켜 빠듯하게 궤도 선적량을 맞췄다.",
          wounds: -10,
          stats: { Fel: 2, Inf: -3 },
          align: { humane: 4 }
        }
      },
      {
        label: "비구름이 닿지 않는 보조 야적장으로 수확 곡물을 우선 옮겨 덮으며 정규 정비반을 기다린다",
        effect: {
          text: "파업 대치나 기계 수리에 섣불리 뛰어들지 않고 방수포와 배수로 정비에 집중했다. 궤도 선적은 늦어졌으나 최악의 부패 손실만은 묵묵히 막아 냈다.",
          stats: { T: 3, WP: 3 },
          align: { humane: 3 }
        }
      }
    ],
    source: "Lexicanum: Agri-World / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s20_gw_06",
    title: "농업 행성 — 기근 구호 수송선과 총독의 비축 곡물 밀수",
    category: "부조리",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["generic_agri"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 농업 행성 · 14세+ 비이단 필멸자",
    weight: 34,
    text: "인접 성계의 전쟁 기근을 돕기 위해 파견된 국교 구호 수송선이 궤도 정거장에 정박했지만, 행성 총독부는 '비축 창고가 바닥났다'며 빈손으로 돌려보내려 하고 있다. 그러나 밤중에 남부 비밀 부두를 지나던 그대는 총독의 문장이 새겨진 무장 바지선들이 최상급 정제 곡물과 발효 증류주 수천 톤을 사설 밀수선에 싣고 있는 광경을 포착했다. 선창 어둠 속에서 무장 경비원들이 등불을 비추며 하역 장부를 검수하고 있다.",
    choices: [
      {
        label: "[지성 판정] 하역 전표와 밀수선 호출 부호를 확보해 구호선 사제단과 궤도 감독관에게 넘긴다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "결정적 물증이 궤도 감독관의 손에 들어가자 국교 구호 함대가 즉각 남부 부두를 봉쇄했다. 빼돌려질 뻔한 곡물 수천 톤이 기근 성계로 향하게 되었고, 변경 구호 조합들이 그대의 용기를 오래도록 기렸다.",
          stats: { Int: 7, Inf: 7, Fel: 4 },
          faith: 6,
          align: { humane: 8, dogmatic: 4 },
          addTags: ["frontier_patron"]
        },
        fail: {
          text: "전표를 빼내던 중 부두 경비원에게 들켜 추격전 끝에 상처를 입었다. 결정적 장부 일부만 겨우 넘겨 밀수 선적만은 지연시켰다.",
          wounds: -16,
          stats: { Int: 3, WP: 4 },
          align: { humane: 5 }
        }
      },
      {
        label: "[민첩 판정] 경비망을 뚫고 선창 신호등을 점멸시켜 구호선 순찰정이 현장을 덮치게 유도한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "어둠 속 크레인 꼭대기에 올라 비상 등화를 쏘아 올리자 궤도 순찰정 두 척이 곧장 선창으로 강하했다. 밀수선은 현장에서 나포되었고, 굶주린 이웃 성계로 보낼 구호 곡물이 온전히 되찾아졌다.",
          stats: { Ag: 7, WP: 5, Inf: 6 },
          faith: 5,
          align: { humane: 7, dogmatic: 3 },
          addTags: ["frontier_patron"]
        },
        fail: {
          text: "신호등을 켜는 순간 날아온 산탄 파편에 옆구리를 스쳤다. 몸을 숨겨 살아남았으나 밀수선 한 척은 어둠 속으로 달아났다.",
          wounds: -18,
          stats: { Ag: 3, T: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "직접 나서지 않고 밀수선 출항 시각과 선명만 기록해 궤도 세관에 익명 투서한다",
        effect: {
          text: "신변을 노출하지 않고 기록한 선명과 화물 수량을 익명으로 궤도 세관함에 넣었다. 이번 밀수선은 놓쳤지만 훗날 감찰단이 총독부를 조사할 단서만큼은 남겨 두었다.",
          stats: { Int: 3, WP: 3 },
          align: { humane: 2, dogmatic: 2 }
        }
      }
    ],
    source: "Dark Heresy 2e: Core Rulebook / Lexicanum: Imperial Tithe"
  },
  {
    id: "ev_s20_gw_07",
    title: "낙원 행성 — 수상 궁전 가면 연회와 금서 경매",
    category: "부조리",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["generic_paradise"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 낙원 행성 · 16세+ 비이단 필멸자",
    weight: 34,
    text: "수정빛 석호 위에 떠 있는 대리석 수상 궁전에서 은퇴한 성역 고관들과 거상들이 여는 비공개 가면 연회가 막을 올렸다. 감미로운 현악과 향수 연기 너머, 내실 휘장 뒤에서는 외계 문명의 금지된 조각상과 불온한 주석이 달린 금서 사본을 두고 비밀 경매가 진행되고 있었다. 비단 가면을 쓴 경매사가 밀봉된 흑요석 상자를 들어 올리는 순간, 실내의 공기마저 서늘하게 일그러지는 기묘한 기운이 감돌았다.",
    choices: [
      {
        label: "[의지 판정] 유혹을 뿌리치고 외계 유물과 금서 거래 증거를 확보해 심문소와 아르비테스에 고발한다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "그대의 추상같은 기세에 경매장 전체가 얼어붙었고, 때마침 성계 순찰 중이던 이단심문소 요원들과 아르비테스 타격대가 수상 궁전을 완벽히 포위했다. 흑요석 상자 속 불경한 물품이 단 한 번도 열리지 않은 채 압수되었고, 타락한 고관 밀거래망을 일망타진한 공로로 그대의 명성과 신앙이 드높아졌다.",
          stats: { WP: 9, Inf: 10, Int: 5 },
          faith: 12,
          corruption: -6,
          align: { dogmatic: 10, humane: 4 }
        },
        success: {
          text: "침착하게 경매 명단과 거래 인장을 확보해 법집행대에 넘겼다. 수상 궁전의 은밀한 사교 모임은 즉각 해산되었고, 부패한 고관들이 줄줄이 심문받으며 그대의 청렴함이 인정받았다.",
          stats: { WP: 6, Inf: 7, Int: 3 },
          faith: 8,
          corruption: -3,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "경비원들의 눈에 띄어 증거 상당수를 빼앗긴 채 석호 밖으로 쫓겨났다. 경매는 중단시켰으나 막강한 고관들의 원한을 사 한동안 몸을 사려야 했다.",
          stats: { WP: 3, Inf: -5 },
          wounds: -14,
          align: { dogmatic: 5 }
        },
        critFail: {
          text: "가면을 쓴 고관 호위대가 그대를 즉각 붙잡아 흑요석 상자 앞에서 강제로 굴복시키려 했다. 상자 틈새에서 스며 나온 불경한 속삭임에 정신이 휘청이고 거친 구타까지 당한 끝에 간신히 작은 배를 타고 석호를 벗어났다.",
          stats: { WP: -3, Inf: -7 },
          wounds: -22,
          corruption: 9,
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[교섭 판정] 수집가 행세를 하며 경매에 참여해 가장 위험한 금서만 낙찰받은 뒤 안전히 소각한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "능숙한 사교 화술로 경매 경쟁자들을 따돌리고 문제의 금서 사본을 손에 넣었다. 그날 밤 바닷가 화덕에서 불경한 양피지를 재로 돌려보내며 조용히 재앙의 싹을 잘랐다.",
          stats: { Fel: 6, Int: 5, WP: 4 },
          faith: 5,
          align: { humane: 5, dogmatic: 4 }
        },
        fail: {
          text: "경매 호가가 치솟아 낙찰에 실패했고, 금서 표지의 기괴한 도상을 오래 들여다본 탓에 며칠간 불길한 악몽에 시달렸다.",
          stats: { Fel: 2, Inf: -4 },
          corruption: 4,
          align: { dogmatic: 2 }
        }
      },
      {
        label: "[지성 판정] 가면 너머 고관들의 문장 반지와 음성을 기록해 뒷거래 협상 카드로 삼는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "경매 내실의 참석자 명단과 암호를 치밀하게 파악해 두었다. 은퇴 고관들의 치부를 쥔 덕분에 성계 사교계 협상에서 유리한 고지를 점했으나 불경한 공기가 찜찜하게 남았다.",
          stats: { Int: 4, Inf: 5, Fel: 2 },
          corruption: 4,
          align: { ruthless: 8, dogmatic: -4 }
        },
        fail: {
          text: "메모를 남기던 손짓이 경매 감시관에게 들켜 부두 밖으로 거칠게 내쫓겼다. 타박상만 입고 성과 없이 돌아서야 했다.",
          wounds: -12,
          stats: { Inf: -3 },
          corruption: 2,
          align: { ruthless: 4 }
        }
      },
      {
        label: "불경한 흑요석 상자를 외면한 채 조용히 연회장을 빠져나와 성당에서 마음을 정화한다",
        effect: {
          text: "퇴폐한 고관들의 위험한 경매에 얽히지 않고 즉시 석호를 떠났다. 부패를 뿌리 뽑지는 못했으나 불길한 유혹에 영혼을 내주지 않고 몸을 지켜 냈다.",
          stats: { WP: 4, Int: 2 },
          faith: 3,
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Dark Heresy 2e: Core Rulebook / Lexicanum: Cold Trade"
  },
  {
    id: "ev_s20_gw_08",
    title: "낙원 행성 — 산호 해변 지하의 기후 제어탑 비밀 수용 구역",
    category: "부조리",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["generic_paradise"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 낙원 행성 · 16세+ 비이단 필멸자",
    weight: 31,
    text: "사시사철 완벽한 미풍과 백사장을 자랑하는 산호 휴양지의 해변 절벽 아래, 출입이 통제된 거대 배수구 너머로 낯선 기계 소음이 새어 나오고 있었다. 그 너머 지하 공동에는 행성 전체의 날씨와 해류를 인공 유지하는 기후 제어탑이 자리 잡고 있었고, 햇빛 한 줄기 들지 않는 습기 찬 기계실에 십일조 기록에도 없는 수천 명의 정비 인부들이 대대로 갇혀 강제 노동을 치르고 있었다. 낙원 관리청 감독관은 이 사실이 휴양지 귀족들에게 새어 나가면 천국의 환상이 깨진다며 입단속을 요구해 왔다.",
    choices: [
      {
        label: "[교섭 판정] 낙원 관리청과 휴양 조합에 압력을 넣어 지하 인부들의 교대 휴식과 의료권을 보장받는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "지하 정비반이 집단으로 쓰러지면 휴양지 기후 자체가 무너진다는 논리로 관리청을 압박했다. 마침내 순환 교대제와 지상 의무소 이용권이 승인되며 지하 공동에 오랜만에 숨통이 트였다.",
          stats: { Fel: 7, Inf: 6, WP: 4 },
          align: { humane: 9, dogmatic: -2 }
        },
        fail: {
          text: "관리청은 규정을 내세워 요구를 묵살했고, 그대는 출입 금지 구역 무단 침입 혐의로 보안대에게 거칠게 밀려나야 했다.",
          wounds: -10,
          stats: { Fel: 3, Inf: -4 },
          align: { humane: 5 }
        }
      },
      {
        label: "[지성 판정] 기후 제어탑의 노후 냉각 설비를 재설계해 지하 구역의 유독 습기와 열기를 낮춘다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "막혀 있던 해수 열교환 덕트를 우회 연결하자 지하 공동의 숨 막히는 습기와 열기가 눈에 띄게 가라앉았다. 정비 인부들이 땀에 젖은 얼굴로 깊은 감사의 인사를 올렸다.",
          stats: { Int: 7, T: 3, Fel: 4 },
          align: { humane: 7 }
        },
        fail: {
          text: "부식된 고압 증기 밸브를 풀다가 손목에 화상을 입었다. 그래도 환기 팬 일부를 고쳐 놓아 지하 공기가 전보다 나아졌다.",
          wounds: -12,
          stats: { Int: 4, T: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 관리청의 봉인 작업을 직접 감독해 입단속 대가로 휴양 조합의 후원을 받아 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "낙원의 평온을 유지하려면 누군가는 보이지 않는 어둠 속에서 기어를 돌려야 한다. 관리청은 그대의 냉혹한 협조에 보답하며 휴양 조합의 신임과 후원을 약속했다.",
          stats: { Inf: 5, WP: 4 },
          align: { ruthless: 6, dogmatic: 3, humane: -5 }
        },
        fail: {
          text: "봉인 작업 중 반발한 정비 인부들과 실랑이가 벌어져 소문이 새어 나갔고, 관리청은 약속한 후원을 슬그머니 거둬들였다.",
          stats: { Inf: -3, WP: 2 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "관리청과 정면 충돌하는 대신 지하 공동의 위치와 인원 기록만 보관한 채 우선 물러난다",
        effect: {
          text: "낙원 행성의 권력 구조를 당장 뒤집을 힘은 없었다. 씁쓸한 마음을 억누른 채 훗날 제국 감사관에게 제출할 현장 기록만 조용히 품에 간직했다.",
          stats: { WP: 3, Int: 3 },
          align: { humane: 2 }
        }
      }
    ],
    source: "Lexicanum: Paradise World / Imperium Maledictum Core"
  },
  {
    id: "ev_s20_gw_09",
    title: "야만 행성 — 겨울 가뭄의 대부족 연맹 회의와 토템 성소",
    category: "행성 심화",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 야만 행성 · 14세+ 비이단 필멸자",
    weight: 34,
    text: "매서운 겨울 가뭄이 산맥과 평원을 덮치자, 일곱 부족의 족장과 주술사들이 고대 선돌이 늘어선 토템 성소에 모여 연맹 회의를 열었다. 마침 성소를 방문한 국교 선교사는 부족들이 모시는 '태양과 별의 황금 왕'이 곧 인류의 황제 폐하시라며 옛 우상을 부수고 제국 십일조 규율에 복종하라 외쳤지만, 강경파 주술사들은 조상의 토템을 모독했다며 창을 치켜들었다. 일촉즉발의 유혈 충돌이 벌어지면 올겨울 가뭄을 버틸 사냥터 협정마저 산산조각 날 위기다.",
    choices: [
      {
        label: "[교섭 판정] 하늘의 황금 왕 신화와 황제 신앙의 공통 뿌리를 설파해 연맹의 유혈 충돌을 막는다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "그대의 장엄한 비유에 주술사들이 창을 거두고 선교사마저 눈시울을 붉히며 성호를 그었다. 일곱 부족은 황금 왕의 이름으로 겨울 사냥터 공유와 상호 구조를 맹세했고, 선교사는 미시오나루스 갈락시아 교리에 따라 부족의 전통을 제국 신앙의 거룩한 지류로 공식 인정했다.",
          stats: { Fel: 9, WP: 8, Inf: 9 },
          faith: 12,
          align: { humane: 8, dogmatic: 5 }
        },
        success: {
          text: "선돌 아래 울려 퍼진 진심 어린 설득 덕분에 피를 흘리지 않고 합의가 이루어졌다. 부족들은 겨울 물길을 함께 쓰기로 맹세했고, 선교사 역시 강압적인 파괴 대신 점진적 교화를 택했다.",
          stats: { Fel: 6, WP: 5, Inf: 6 },
          faith: 7,
          align: { humane: 7, dogmatic: 2 }
        },
        fail: {
          text: "양측의 해묵은 불신을 완전히 풀지 못해 거친 몸싸움이 벌어졌다. 겨우 큰 살육만은 막았으나 부족 연맹은 반쪽으로 갈라지고 말았다.",
          stats: { Fel: 2, WP: 3 },
          wounds: -12,
          align: { humane: 3 }
        },
        critFail: {
          text: "통역과 비유가 어긋나며 부족 주술사들은 그대를 '하늘의 거짓 예언자'로, 선교사는 그대를 '이단 옹호자'로 몰아세웠다. 투창과 돌덩이가 날아드는 아수라장 속에서 깊은 상처를 입고 성소 밖 눈밭으로 밀려났다.",
          stats: { Fel: -4, Inf: -6, WP: 2 },
          wounds: -22,
          faith: -4,
          align: { humane: 2 }
        }
      },
      {
        label: "[의지 판정] 황제의 권위를 앞세워 강경파 주술사들을 제압하고 토템 성소에 아퀼라 표식을 새긴다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "흔들리지 않는 위엄으로 성소 중앙에 서서 강경파의 기세를 꺾었다. 부족 전사들이 제국의 권위 앞에 창끝을 내렸고, 선교사는 그대의 확고한 신앙을 크게 칭송했다.",
          stats: { WP: 7, Inf: 6, WS: 3 },
          faith: 9,
          align: { dogmatic: 9, humane: -3 }
        },
        fail: {
          text: "격분한 부족 전사들과 격투를 벌이며 상처를 입었다. 선교사의 호위대와 합세해 가까스로 성소를 장악했으나 부족들의 적개심이 깊어졌다.",
          wounds: -16,
          stats: { WP: 3, WS: 2 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "혼란을 틈타 가장 강한 두 부족 족장에게만 접근해 겨울 수원지 독점 밀약을 맺는다",
        effect: {
          text: "약소 부족들이 가뭄에 내몰리는 사이, 두 강대 부족과 손을 잡아 겨울 물길을 선점했다. 당장의 생존은 보장받았으나 선교사와 이웃 부족들의 차가운 경멸을 사야 했다.",
          stats: { Int: 3, Inf: 3, Fel: -2 },
          faith: -3,
          align: { ruthless: 6, humane: -5 }
        }
      }
    ],
    source: "Dark Heresy: Blood of Martyrs / Lexicanum: Missionarus Galaxia"
  },
  {
    id: "ev_s20_gw_10",
    title: "야만 행성 — 고대 늪지 유적에서 깨어난 토착 맹수 무리",
    category: "행성 심화",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["generic_feral"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 야만 행성 · 14세+ 비이단 필멸자",
    weight: 32,
    text: "이끼 낀 거석 유적이 가라앉아 있는 검은 늪지대에서 지축을 울리는 포효가 터져 나왔다. 긴 동면에서 깨어난 거대한 골판 도마뱀 맹수 무리가 짙은 안개를 뚫고 목책 마을과 제국 전초 야영지가 나란히 선 강변으로 몰려들고 있다. 두꺼운 뼈 갑각은 평범한 화살을 튕겨 내고, 안개 속 늪길은 발을 잘못 디디면 허리까지 빠져드는 죽음의 덫이다.",
    choices: [
      {
        label: "[백병 판정] 선봉에 나서서 우두머리 맹수의 목덜미 틈새를 노려 무리의 진격을 꺾는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "거대한 턱을 아슬아슬하게 피하며 갑각 이음새에 결정타를 꽂아 넣었다. 우두머리가 쓰러지자 맹수 무리가 늪지 너머로 흩어졌고, 강변의 모든 전사들이 그대의 무용을 외쳤다.",
          stats: { WS: 7, T: 5, Inf: 6 },
          align: { dogmatic: 4, humane: 4 }
        },
        fail: {
          text: "맹수의 꼬리에 강하게 채여 진흙탕을 구르며 깊은 상처를 입었다. 그래도 끝까지 물러서지 않고 버틴 덕분에 방어선이 무너지지 않았다.",
          wounds: -20,
          stats: { WS: 4, T: 3 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[사격 판정] 유적의 높은 돌기둥에 올라 집중 사격으로 맹수 무리를 늪 깊은 곳으로 몰아넣는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "돌기둥 위에서 맹수들의 눈과 관절을 정확히 꿰뚫는 사격을 퍼부었다. 방향을 잃은 무리가 안개 낀 늪지대로 되돌아가며 목책과 야영지가 온전히 보존되었다.",
          stats: { BS: 7, Ag: 4, Int: 3 },
          align: { humane: 5 }
        },
        fail: {
          text: "안개 속에서 시야가 가려져 사격이 빗나간 사이, 돌기둥을 들이받은 충격에 굴러떨어져 부상을 입었다.",
          wounds: -15,
          stats: { BS: 3, Ag: 2 },
          align: { humane: 3 }
        }
      },
      {
        label: "[지성 판정] 늪지 기름 웅덩이에 불길을 놓아 천연 방화벽을 세우고 사람들을 고지대로 유도한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "바람의 방향을 계산해 점화한 불벽이 맹수 무리의 진로를 정확히 가로막았다. 불꽃을 두려워한 짐승들이 물러나는 사이 주민과 야영지 병력이 무사히 고지대로 대피했다.",
          stats: { Int: 6, Fel: 5, WP: 4 },
          align: { humane: 7 }
        },
        fail: {
          text: "바람이 갑자기 바뀌며 치솟은 불길에 팔과 어깨를 그슬렸다. 혼란은 컸으나 대피로만은 가까스로 지켜 냈다.",
          wounds: -14,
          stats: { Int: 3, T: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "무리한 정면 교전 대신 목책 뒤편에 횃불 방어선을 세워 맹수들이 물러나기를 버틴다",
        effect: {
          text: "화려한 전과는 없었으나 불빛과 징 소리로 맹수들의 접근을 끈질기게 저지했다. 긴 밤이 지나고 안개가 걷히자 강변 사람들은 큰 피해 없이 아침을 맞았다.",
          stats: { T: 3, WP: 3 },
          align: { humane: 3 }
        }
      }
    ],
    source: "Dark Heresy 1e: Feral World / Lexicanum: Feral World"
  },
  {
    id: "ev_s20_gw_11",
    title: "포지 월드 — 제7용광로 구역의 이단적 개조 설계도",
    category: "행성 심화",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["generic_forge"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "saint_vessel",
        "assassin", "high_lord_terra", "warmaster", "sector_lord",
        "fabricator_general", "fabricator_locum",
        "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "행성: 포지 월드 · 15세+ 비이단 필멸자",
    weight: 33,
    text: "붉은 쇳물 연기가 천장을 가득 메운 무명 포지 월드의 제7용광로 구역. 노련한 수석 주조 장인이 리만 러스 전차의 포탑 선회 기어를 표준 STC 설계도와 미묘하게 다르게 깎아 열효율을 12퍼센트나 끌어올린 개조 도면이 적발되었다. 생산 납기는 기적처럼 앞당겨졌지만, 아뎁투스 메카니쿠스의 율법에서 검증되지 않은 창작 개조는 곧 용서받지 못할 '기술 이단'이다. 감찰 마고스의 스키타리 호위대가 복도 끝에서 묵직한 금속 발걸음으로 다가오고 있다.",
    choices: [
      {
        label: "[기계교 전용] 이진 교리 조항을 인용해 고대 변형 STC의 재발견으로 격상 심사를 청원한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "치밀한 교리 논증과 과거 화성 변형 규격의 유사성을 제시하자 감찰 마고스가 즉결 처벌을 보류했다. 해당 설계는 정식 신학 검증 위원회로 회부되었고 장인의 목숨도 구해졌다.",
          stats: { Int: 7, Inf: 6, WP: 4 },
          faith: 4,
          align: { dogmatic: 4, humane: 5 }
        }
      },
      {
        label: "[지성 판정] 개조 부품의 수치 기록을 표준 허용 오차로 신속히 정리해 장인의 처벌을 막는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "코지테이터 공차 기록을 눈 깜짝할 새에 정교하게 보정해 검열을 통과시켰다. 서비터 개조 형벌을 면한 수석 장인이 떨리는 손으로 깊은 감사를 전했다.",
          stats: { Int: 7, Fel: 4, Ag: 3 },
          align: { humane: 7, dogmatic: -3 }
        },
        fail: {
          text: "데이터 변조 흔적이 스키타리 감찰관에게 포착되어 심한 전기 채찍 징계를 받았다. 그래도 주조 장인의 의도만은 선의로 참작되어 즉결 처형은 면했다.",
          wounds: -14,
          stats: { Int: 3, Inf: -4 },
          align: { humane: 4 }
        }
      },
      {
        label: "[의지 판정] 옴니시아의 신성한 STC는 변개할 수 없다며 도면을 소각하고 마고스에게 보고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단호히 이단적 개조 도면을 용광로에 던져 넣고 전말을 보고했다. 감찰 마고스는 그대의 흔들림 없는 정통 교리 수호를 높이 평가하며 포지 구역의 신임을 내렸다.",
          stats: { WP: 6, Inf: 6, Int: 3 },
          faith: 7,
          align: { dogmatic: 9, humane: -4 }
        },
        fail: {
          text: "보고 절차는 지켰으나 감찰 지연 책임을 추궁당하며 차가운 경고를 들었다. 그래도 정통성에 대한 의심만은 깨끗이 씻어 냈다.",
          stats: { WP: 3, Inf: 2 },
          faith: 3,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "개조 도면 사본을 몰래 빼돌려 사설 거래처에 넘기고 현장에서 발을 뺀다",
        effect: {
          text: "경계가 집중된 틈을 타 암호화된 도면 복제본을 빼돌렸다. 금지된 기술의 대가로 약간의 이득을 챙겼으나, 그 손에는 기술 이단의 낙인과 불길한 의심이 깊게 남았다.",
          stats: { Int: 3, Inf: 3 },
          faith: -4,
          corruption: 5,
          addTags: ["tech_heresy"],
          align: { ruthless: 7, dogmatic: -6 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Lexicanum: Tech-Heresy"
  },
  {
    id: "ev_s20_gw_12",
    title: "변경의 후원자 — 은혜를 기억한 변경 대표단의 긴급 청원",
    category: "변경 인연",
    once: true,
    req: {
      minAge: 20,
      allTags: ["frontier_patron"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["custodes", "grey_knight", "living_saint", "assassin"]
    },
    reqLabel: "이력: 변경의 후원자 · 20세+ 비이단",
    weight: 36,
    text: "과거 그대가 변경 행성의 분쟁과 고난 속에서 손을 내밀어 지켜 주었던 자치 조합과 영지 대표단이 수 광년 너머 성로를 뚫고 찾아왔다. 거친 여행 외투 차림의 사절단은 그대가 베푼 신의에 대한 감사의 증표로 변경 장인들이 세공한 순은 인장함을 바치며, 최근 외곽 성로에 출몰한 무법 해적 함대가 보급 수송선을 약탈해 변경 세 행성이 고립될 위기라며 간절히 구원을 청원했다. 지금 어떤 응답을 내리느냐에 따라 그대가 쌓아 올린 변경의 신뢰가 시험대에 오른다.",
    choices: [
      {
        label: "[교섭 판정] 제국 행정부와 상단 인맥을 총동원해 정규 순찰 호송 함대를 변경 성로로 급파한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "그대의 보증과 연대 청원이 성계 함대 사령부를 움직였다. 순찰 호위함 전대가 변경 성로에 투입되어 해적 함대를 격퇴했고, 변경 세 행성 전체가 그대의 이름을 은인으로 새겼다.",
          stats: { Fel: 8, Inf: 9, WP: 4 },
          faith: 5,
          align: { humane: 9, dogmatic: 3 }
        },
        fail: {
          text: "관료주의의 벽이 높아 정규 함대 파견은 지연되었으나, 사비를 털어 무장 호송선 두 척만은 꾸려 보내며 최소한의 신의를 지켰다.",
          stats: { Fel: 4, Inf: 2, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[지성 판정] 변경 상선단의 항로와 암호를 전면 개편해 해적 매복망을 역포위할 작전도를 짠다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치밀한 위장 선단 기동과 성간 신호 교란 작전이 적중해 해적 기함이 소행성대 함정에 걸려들었다. 변경 대표단은 그대의 지략에 경탄하며 평생의 우정을 맹세했다.",
          stats: { Int: 8, Inf: 7, BS: 4 },
          align: { humane: 6, dogmatic: 5 }
        },
        fail: {
          text: "예상보다 해적 척후선이 많아 작전 일부가 차질을 빚었다. 호송 중 파편에 상처를 입었으나 주요 보급선만은 끝내 성계에 닿았다.",
          wounds: -10,
          stats: { Int: 4, WP: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "성계 함대 사령부에 정식 구원 청원서를 연서 제출하고 변경 대표단의 안전한 귀환을 돕는다",
        effect: {
          text: "당장 정규 함대를 움직이지는 못했으나, 그대의 서명이 담긴 청원서와 비상 보급품 덕분에 변경 대표단은 빈손으로 돌아가지 않았다. 오래 쌓아 온 신의는 조용히 이어졌다.",
          stats: { Fel: 3, Inf: 3, WP: 2 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Rogue Trader: Core Rulebook / Imperium Maledictum Core"
  }
];
