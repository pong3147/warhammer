// 역사 대사건 — M42 인도미투스 성전기 (000.M42~028.M42 · 사자의 문 ~ 제4차 타이라니드 전쟁, 9건)
// absYear: 1000 = 000.M42, 1001 = 001.M42, 1028 = 028.M42
export const TIMELINE_M42_INDOMITUS = [
  {
    id: "tl_lions_gate",
    year: 1000,
    title: "테라 사자의 문 전투 — 코른 악마군단의 황궁 침공",
    en: "Battle of Lion's Gate",
    scope: "신성한 테라 (행성 한정)",
    dispatchScope: "galaxy",
    dispatchText: "신성한 테라 황궁 사자의 문에 8명의 블러드서스터가 이끄는 88개 코른 악마 군단이 출현했으나, 캡틴-제너럴 트라얀 발로리스의 쿠스토데스와 침묵의 자매들, 그리고 테라에 도착한 로부테 길리먼이 악마들을 분쇄했다는 승전보가 울려 퍼졌다.",
    filter: { anyWorlds: ["terra"] },
    characters: ["valoris"],
    summary: "대균열의 여파로 8명의 블러드서스터와 88개 코른 악마 군단이 테라 황궁 사자의 문에 직접 출현했다! 쿠스토데스와 침묵의 자매들, 로부테 길리먼이 맞서 싸웠다.",
    text: "인류의 성지 신성한 테라에 피의 비가 내린다! 8명의 블러드서스터가 이끄는 88개 코른 악마 군단이 사자의 문 우주항을 덮쳤다. 캡틴-제너럴 트라얀 발로리스가 이끄는 4천 명의 황금 쿠스토데스와 마크라그에서 귀환한 로부테 길리먼이 악마들을 향해 돌격한다!",
    choices: [
      {
        label: "[의지 판정] 황금 갑주의 진군을 따라 황궁 외곽 방어선에 합류한다",
        req: { minAge: 14, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "악마의 광기를 이겨 내고 사자의 문 사수에 기여했다! 쿠스토데스와 프라이마크의 위용을 두 눈으로 목격한 영광을 얻었다.",
          stats: { WP: 10, WS: 6, Inf: 12 },
          faith: 18,
          wounds: -20,
          addTags: ["lions_gate_vet", "met_valoris", "met_guilliman"]
        },
        fail: {
          text: "코른 블러드레터의 도끼에 중상을 입었지만 침묵의 자매들의 엄호로 겨우 목숨을 부지했다.",
          wounds: -36,
          corruption: 6
        }
      },
      {
        label: "[민첩 판정] 피의 폭풍을 피해 지하 구역으로 몸을 피하며 주변 생존자들을 이끈다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "피의 폭풍 속에서도 살아남아 수많은 테라 시민과 성물을 지켜 냈다.",
          stats: { Ag: 4, Fel: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "무너지는 성당 잔해에 깔려 큰 부상을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: Battle of Lion's Gate / Watchers of the Throne"
  },
  {
    id: "tl_guilliman_return",
    year: 1001,
    title: "인도미투스 성전 선포와 프라이머리스 스페이스 마린 배치",
    en: "Launch of the Indomitus Crusade",
    scope: "은하계 전역",
    filter: {},
    characters: ["guilliman"],
    summary: "999.M41 부활해 테라 사자의 문 전투를 승리로 이끈 제국 섭정 로부테 길리먼이 대대적인 반격 '인도미투스 성전'을 선포하고 프라이머리스 스페이스 마린을 전 은하에 배치했다.",
    text: "전 은하계 아스트로패스 통신망에 경천동지할 칙령이 울려 퍼진다! 황제와 독대하고 제국 섭정에 오른 로부테 길리먼이 하이 로드들을 재편하고 '인도미투스 성전'을 선포했다. 아크마고스 카울이 1만 년간 숨겨 둔 프라이머리스 스페이스 마린이 은하 곳곳에 모습을 드러낸다.",
    choices: [
      {
        label: "[강인 판정 · 아스타르테스 전용] 루비콘 프라이머리스 시술에 지원한다",
        req: { allTags: ["astartes"], excludeTags: ["primaris", "grey_knight", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "imperial_nihilus"] },
        check: { stat: "T", diff: -15 },
        success: {
          text: "생사를 넘나드는 외과 시술 끝에 3개의 신형 장기가 각성했다! 그대는 이제 더 거대하고 강인한 프라이머리스 아스타르테스로 거듭났다!",
          stats: { T: 10, WS: 8, BS: 8, WP: 6, Inf: 8 },
          woundsBonus: 35,
          addTags: ["primaris", "met_cawl"]
        },
        fail: {
          text: "시술 중 심장이 두 번이나 멈췄으나 아포세카리의 필사적인 처치로 목숨만은 건졌다. 심각한 내상과 극심한 고통의 흉터가 깊게 남았다.",
          wounds: -35,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 인도미투스 성전 함대의 일원이나 보급관으로 자원한다",
        req: { minAge: 15, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "imperial_nihilus"] },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "성전군 원정 편대에 이름을 올리며 제국 반격의 물결에 합류했다! 승진과 공훈의 길이 열렸다.",
          stats: { Inf: 8, WP: 5, BS: 3, Int: 3 },
          faith: 8,
          addTags: ["indomitus_crusader", "met_guilliman"]
        },
        fail: {
          text: "엄청난 성전 징발령 속에 고된 행군과 노역을 치르느라 몸이 축났다.",
          wounds: -12,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 격변하는 은하의 판도를 지켜보며 자신의 입지를 조용히 다진다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "길리먼의 행정 개혁과 전쟁의 흐름을 읽어 내고 혼란한 틈에 안정적인 기반을 구축했다.",
          stats: { Int: 5, Inf: 5 }
        },
        fail: {
          text: "테라의 정변과 세금 개혁 여파로 한동안 궁핍한 시기를 보냈다.",
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Lexicanum: Indomitus Crusade / Dark Imperium"
  },
  {
    id: "tl_octarius_war",
    year: 1004,
    endYear: 1007,
    title: "옥타리우스 전쟁 — 오크와 타이라니드의 지옥 도가니",
    en: "The Octarius War",
    scope: "울티마 · 봉쇄선 · 제국군 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "피두스 크립트만이 타이라니드 하이브 함대 레비아탄을 오크 제국 옥타리우스로 유인한 도박이 끔찍한 부메랑으로 돌아왔다! 두 외계 포식자가 서로를 먹어 치우며 괴물처럼 비대해지자, 제국은 옥타리우스 봉쇄선을 지키기 위해 대군을 급파했다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["ultima"] },
        { anyTags: ["militarum", "astartes", "inquisitor", "inquisition_agent", "deathwatch_vet", "navy", "indomitus_crusader", "imperial_knight", "assassin"] }
      ]
    },
    characters: ["ghazghkull"],
    summary: "피두스 크립트만의 유인 작전으로 하이브 함대 레비아탄과 오크 대제국이 정면 충돌한 옥타리우스 섹터가 갈수록 거대한 외계 생체 도가니로 변질되자, 제국은 붕괴하는 봉쇄선을 막기 위해 혈전을 치렀다.",
    text: "옥타리우스 봉쇄선의 관측 위성이 핏빛 경보를 토해 낸다. 크립트만이 유인한 타이라니드 촉수와, 이 도가니에서 거대한 와아아를 규합하며 선봉을 직접 지휘하는 워로드 가즈쿨 스라카의 오크 대군이 뒤엉켜 괴물 같은 진화를 거듭하며 제국 방어선으로 넘쳐흐르고 있다!",
    choices: [
      {
        label: "[사격 판정] 옥타리우스 봉쇄선 최전방에서 쏟아지는 오크와 타이라니드 혼성 돌파를 막아 낸다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: -10 },
        success: {
          text: "초대형 바이오-타이탄과 오크 가간트가 맞붙는 지옥의 화망 속에서 방어 요새를 사수했다! 선봉에서 포효하던 가즈쿨 스라카의 돌격대와 시냅스 지휘체를 동시에 저지한 생존자로 남았다.",
          stats: { BS: 7, T: 5, WP: 6, Inf: 8 },
          align: { dogmatic: 6, ruthless: 4 },
          addTags: ["octarius_survivor", "met_ghazghkull"]
        },
        fail: {
          text: "오크 폭주 차량과 타이라니드 산성 포자에 협공당해 큰 부상을 입고 봉쇄선 후방으로 실려 갔다.",
          wounds: -28,
          stats: { T: 4 },
          align: { dogmatic: 4 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "[지성 판정] 피두스 크립트만의 비밀 첩보팀과 합류해 옥타리우스 붕괴 궤도를 차단한다",
        req: { minAge: 15 },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "파문당한 전직 이단심문관 피두스 크립트만과 은밀히 접촉해 두 외계 진영이 정면으로 충돌하도록 궤도 미끼를 재배치했다. 차가운 결단으로 인류 행성계의 시간을 벌었다.",
          stats: { Int: 7, WP: 5, Inf: 7 },
          align: { ruthless: 6, humane: 2 },
          addTags: ["octarius_survivor", "met_kryptman"]
        },
        fail: {
          text: "적진 한복판에 미끼를 설치하다 진스틸러 매복에 휘말려 중상을 입었으나, 귀중한 봉쇄선 좌표는 챙겨 나왔다.",
          wounds: -22,
          stats: { Int: 3 },
          align: { ruthless: 4 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "봉쇄선 외곽 항로의 민간 피난선과 보급 호송대를 엄호하며 2차 침투를 경계한다",
        effect: {
          text: "외계 포식자들이 휩쓸고 지나간 변방 성계에서 피난선들을 안전 항로로 유도하며 검역선을 지켜 냈다.",
          stats: { WP: 5, Fel: 4, T: 4 },
          align: { humane: 5 },
          addTags: ["octarius_survivor"]
        }
      }
    ],
    source: "Lexicanum: Octarius War / War Zone Octarius"
  },
  {
    id: "tl_vigilus_war",
    year: 1008,
    title: "비질루스 야수 전쟁 — 나흐문드 회랑 사수전",
    en: "War of Beasts on Vigilus",
    scope: "옵스쿠루스 · 군인 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "임페리움 니힐루스로 통하는 거의 유일한 안정 항로 비질루스에서 마르네우스 칼가와 약탈자 아바돈이 정면 격돌해 야수 전쟁과 이어진 80일간의 악몽 공성전이 벌어지고 있다는 전보가 날아들었다.",
    filter: {
      minAge: 16,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anySegmenta: ["obscurus"] }, { anyTags: ["militarum", "astartes", "inquisitor", "indomitus_crusader"] }]
    },
    characters: ["calgar"],
    summary: "임페리움 니힐루스로 통하는 거의 유일한 안정 항로 나흐문드 회랑을 두고 마르네우스 칼가와 약탈자 아바돈이 비질루스에서 격돌했다.",
    text: "오크 스피드 프릭, 진스틸러 컬트, 그리고 아바돈의 블랙 리전까지 한 행성에 몰려들었다! 울트라마린 챕터 마스터 마르네우스 칼가가 총사령관으로서 비질루스 하이브 방어전을 지휘한다.",
    choices: [
      {
        label: "[사격 판정] 칼가의 지휘 아래 하이브 스파이어 방어선을 사수한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "80일간의 악몽 공성전 끝에 나흐문드 회랑의 생명선을 지켜 냈다! 제국 전역에 용명이 전해졌다.",
          stats: { BS: 6, WS: 5, Inf: 8, WP: 5 },
          addTags: ["vigilus_veteran", "met_calgar"]
        },
        fail: {
          text: "블랙 리전과의 시가전에서 큰 부상을 입고 궤도 의무함으로 후송되었다.",
          wounds: -28,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 하이브 지하의 진스틸러 컬트 비밀 통로를 차단한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "적의 후방 침투로를 사전에 폭파해 수많은 연대의 전멸을 막아 냈다.",
          stats: { Int: 7, Ag: 4, Inf: 7 },
          addTags: ["vigilus_veteran"]
        },
        fail: {
          text: "지하 갱도에서 컬트 암살자의 기습을 받아 크게 다쳤다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: War of Beasts / Imperium Nihilus: Vigilus Defiant"
  },
  {
    id: "tl_psychic_awakening",
    year: 1012,
    title: "사이킥 각성 — 워프의 범람",
    en: "The Psychic Awakening",
    scope: "은하계 전역",
    filter: {},
    characters: [],
    summary: "대균열의 여파로 인류 종 전체에서 유례없는 규모의 사이커 각성과 신앙의 기적이 동시다발적으로 터져 나왔다.",
    text: "은하계 곳곳에서 평범하던 시민들이 갑자기 염동력을 쓰거나 예언을 외치기 시작했다. 이단심문소와 검은 함선은 폭주하는 업무에 비명을 지르고, 국교 성당에서는 기적의 성광이 관측된다.",
    choices: [
      {
        label: "[의지 판정] 내면에서 일렁이는 워프의 파장을 억누르거나 신념으로 승화한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "폭주하는 워프 에너지 앞에서도 흔들리지 않고 오히려 정신적 깨달음과 흔들리지 않는 의지를 얻었다.",
          stats: { WP: 7 },
          faith: 12,
          corruption: -5
        },
        fail: {
          text: "갑작스러운 사이킥 폭풍에 휩쓸려 정신이 혼미해지고 워프의 낙인이 스몄다.",
          wounds: -15,
          corruption: 12
        }
      },
      {
        label: "[의지 판정 · 잠재력 개방] 밀려드는 초자연적 감각을 받아들여 잠재 사이킥을 일깨운다",
        req: { excludeChapters: ["black_templars"], excludeTags: ["psyker", "blank", "custodes", "astartes", "grey_knight", "sororitas", "daemon_prince", "dreadnought"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "눈동자에 푸른 워프 불꽃이 어른거린다! 그대는 후천적으로 사이커 자질에 눈떴다. 막대한 힘과 함께 검은 함선의 위협이 뒤따를 것이다.",
          stats: { WP: 8, Int: 5 },
          corruption: 8,
          addTags: ["psyker"]
        },
        fail: {
          text: "통제하지 못한 사이킥 역류로 코피와 발작을 일으키며 큰 내상을 입었다.",
          wounds: -25,
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Psychic Awakening"
  },
  {
    id: "tl_plague_wars",
    year: 1013,
    endYear: 1015,
    title: "역병 전쟁 — 울트라마의 정원 행성 이악스와 형제의 결전",
    en: "The Plague Wars",
    scope: "울티마 · 마크라그 · 제국군 · 아스타르테스 · 카오스",
    dispatchScope: "galaxy",
    dispatchText: "너글의 악마 프라이마크 모타리온이 데스 가드 군단과 부패 함대를 이끌고 500세계 울트라마를 침공했다! 제국 섭정 로부테 길리먼이 인도미투스 성전군을 돌려 형제와 맞섰으며, 병원 행성 이악스에서 역병과 성광이 충돌하는 대결전이 벌어졌다.",
    filter: {
      minAge: 14,
      or: [
        { anyWorlds: ["macragge"] },
        { anySegmenta: ["ultima"] },
        { anyTags: ["militarum", "astartes", "sororitas", "inquisitor", "indomitus_crusader", "imperial_knight", "living_saint", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] }
      ]
    },
    characters: ["mortarion"],
    summary: "013~015.M42 너글의 악마 프라이마크 모타리온이 울트라마를 침공해 병원 행성 이악스를 거대한 역병의 가마솥으로 바꾸려 하자 로부테 길리먼과 마르네우스 칼가가 정면 격돌했다.",
    text: "울트라마의 옥빛 하늘이 너글의 녹색 역병 구름으로 뒤덮였다! 데스 가드와 역병 함대가 파르메니오와 정원 행성 이악스를 휩쓸고, 거대한 낫을 든 악마 프라이마크 모타리온의 그림자 앞에서 제국 섭정 로부테 길리먼과 마르네우스 칼가가 반격의 검을 뽑아 들었다.",
    choices: [
      {
        label: "[강인 판정] 길리먼과 칼가의 반격 전선에 합류해 데스 가드와 모타리온의 역병 폭풍을 뚫는다",
        req: { minAge: 15, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: -10 },
        success: {
          text: "폐를 태우는 부패 안개를 견디며 파르메니오와 이악스의 반격 돌파구를 열었다! 황제의 성광이 모타리온의 가마솥을 불태우는 순간을 두 눈으로 목격했다.",
          stats: { T: 7, WP: 7, WS: 5, Inf: 10 },
          faith: 14,
          align: { dogmatic: 7 },
          addTags: ["plague_war_vet", "met_guilliman", "met_mortarion", "met_calgar"]
        },
        fail: {
          text: "역병 해병의 부식탄과 워프 독기에 중독되어 사경을 헤맸으나, 울트라마 의무대의 정화 처치로 가까스로 살아남았다.",
          wounds: -30,
          corruption: 8,
          stats: { T: 4 },
          align: { dogmatic: 4 },
          addTags: ["plague_war_vet"]
        }
      },
      {
        label: "[의지 판정] 병원 행성 이악스의 야전 병동을 사수하며 부상병과 피난민을 끝까지 지켜 낸다",
        req: { minAge: 14, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "너글 악마들이 밀려드는 병동 입구에서 성수와 화염으로 버텨 수만 명의 부상병을 대피선에 태웠다! 부패 속에서도 꺾이지 않은 자비의 증인이 되었다.",
          stats: { WP: 7, Fel: 5, T: 4, Inf: 7 },
          faith: 12,
          align: { humane: 8 },
          addTags: ["plague_war_vet", "macro_mercy_sanctuary", "met_mortarion"]
        },
        fail: {
          text: "역병 파리의 습격으로 깊은 상처와 열병을 얻었으나, 끝까지 병동 철수선을 무너뜨리지 않았다.",
          wounds: -24,
          stats: { WP: 4 },
          align: { humane: 6 },
          addTags: ["plague_war_vet", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "[강인 판정 · 카오스] 모타리온의 데스 가드 전열 뒤에서 울트라마를 삼키는 부패의 의식을 지켜본다",
        req: { minAge: 14, anyTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: 0 },
        success: {
          text: "악마 프라이마크 모타리온의 거대한 날개 아래 500세계의 성채들이 녹아내리는 광경을 목도했다! 역병의 축복과 두려운 명성이 따라붙었다.",
          stats: { T: 6, WP: 5, Inf: 8 },
          corruption: 12,
          align: { ruthless: 8 },
          addTags: ["plague_war_vet", "met_mortarion"]
        },
        fail: {
          text: "황제의 불꽃이 이악스의 가마솥을 태울 때 역류한 성광에 큰 화상을 입고 워프 함대로 퇴각했다.",
          wounds: -26,
          corruption: 6,
          align: { ruthless: 5 },
          addTags: ["plague_war_vet"]
        }
      },
      {
        label: "울트라마 외곽 성계로 한 발 물러나 역병 폭풍과 전황의 추이를 주시하며 전력을 보전한다",
        effect: {
          text: "부패의 안개와 황금빛 반격이 뒤엉킨 대전쟁의 한복판에서 살아남아 외곽 항로에서 다음 국면을 대비했다.",
          stats: { Int: 5, T: 4, WP: 4 },
          addTags: ["plague_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Plague Wars / Dark Imperium Trilogy (Revised 012~013.M42)"
  },
  {
    id: "tl_pariah_nexus",
    year: 1016,
    endYear: 1020,
    title: "파리아 넥서스 전역 — 네크론의 '정적'",
    en: "The Pariah Nexus Campaign",
    scope: "네필림 섹터 · 은하계 전역",
    dispatchScope: "galaxy",
    dispatchText: "네필림 섹터 일대에 네크론이 거대한 블랙스톤 파일런 망 '파리아 넥서스'를 가동했다! 구역 내 인류 수십억이 영혼의 활력을 잃고 산 송장처럼 얼어붙는 '정적' 현상이 번지자 인도미투스 성전 함대가 긴급 투입되었다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["ultima", "tempestus"] },
        { anyTags: ["militarum", "astartes", "sororitas", "mechanicus", "inquisitor", "indomitus_crusader"] }
      ]
    },
    characters: ["cawl"],
    summary: "016.M42 네크론 일루미노르 세라스가 네필림 섹터에 블랙스톤 파일런 망을 구축해 워프를 단절시키자, 영혼이 메마르는 공포 속에서 제국 성전군과 아뎁타 소로리타스가 사투를 벌였다.",
    text: "파리아 넥서스 경계에 들어서자마자 기묘한 적막이 숨통을 조여 온다. 워프 통신이 완전히 끊기고, 평범한 병사들이 이유 없는 무기력 속에 총을 떨어뜨리며 쓰러진다. 오직 맹렬한 황제 신앙과 강철 의지, 그리고 벨리사리우스 카울의 역설계 장비만이 에메랄드빛 파일런의 침묵을 뚫을 수 있다!",
    choices: [
      {
        label: "[의지 판정] 영혼을 갉아먹는 정적의 파동을 황제 신앙으로 이겨 내고 블랙스톤 파일런 폭파조에 합류한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "찬송가를 외치며 에메랄드빛 거석을 폭파하자 주변 아군들의 눈에 다시 생기가 돌아왔다! 기적 같은 신앙의 승전보였다.",
          stats: { WP: 8, T: 4, Inf: 8 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "영혼이 텅 비어 가는 끔찍한 무력감과 네크론 포화에 쓰러져 겨우 후송되었다.",
          wounds: -24,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 아크마고스 카울의 블랙스톤 간섭 분석 임무를 지원해 파일런 파동의 사각지대를 찾아낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정적 파동이 약해지는 회랑을 계산해 내어 성전 함대의 돌파구를 열었다! 카울이 기묘한 이진법으로 찬사를 보냈다.",
          stats: { Int: 8, Inf: 7 },
          addTags: ["met_cawl"]
        },
        fail: {
          text: "계측 장비가 네크론의 가우스 폭풍에 타 버리며 부상을 입었으나, 귀중한 파동 데이터 일부는 건졌다.",
          wounds: -16,
          stats: { Int: 4 }
        }
      },
      {
        label: "정적 구역 최외곽의 중계 기지를 사수하며 무기력증에 빠진 피난민과 부상병들을 호송한다",
        effect: {
          text: "보이지 않는 영혼의 침묵 속에서도 끝까지 동료를 포기하지 않았다.",
          stats: { T: 5, WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Pariah Nexus / Indomitus Crusade"
  },
  {
    id: "tl_arks_of_omen_lion",
    year: 1020,
    endYear: 1023,
    title: "징조의 방주와 숲의 사자 귀환 — 라이온 엘 존슨의 재림",
    en: "Arks of Omen & The Return of Lion El'Jonson",
    scope: "은하계 전역 · 임페리움 니힐루스",
    dispatchScope: "galaxy",
    dispatchText: "약탈자 아바돈과 영혼 대장간 반신 바쉬토르의 거대 스페이스 헐크 함대 '징조의 방주'가 은하를 유린하는 절체절명의 암흑 속에, 기적 같은 소식이 울려 퍼졌다! 제1군단의 프라이마크 라이온 엘 존슨이 1만 년의 잠에서 깨어나 암흑 제국을 수호하고 있다!",
    filter: {},
    characters: ["lion"],
    summary: "020.M42 아바돈과 바쉬토르의 '징조의 방주' 성전이 은하를 휩쓰는 가운데, 다크 엔젤 프라이마크 라이온 엘 존슨이 깨어나 암흑 제국에 '라이온의 보호령'을 세우고 인류를 구원하기 시작했다.",
    text: "거대한 악마 요새선 '징조의 방주'들이 성계 방어망을 짓밟으며 은하가 다시금 절망에 빠진 순간, 안개 낀 숲의 전설처럼 황제의 방패를 든 두 번째 충성파 프라이마크 '라이온 엘 존슨'이 전장에 강림했다는 아스트로패스 속보가 터져 나왔다!",
    choices: [
      {
        label: "[백병 판정] 징조의 방주 강습대에 맞서 최후의 방어선을 지키며 라이온의 구원군이 닿을 시간을 번다",
        req: { minAge: 15, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WS", diff: -10 },
        success: {
          text: "절망적인 수적 열세를 버텨 낸 그 순간, 녹색 안개 너머로 숲의 사자와 리즌 전사들이 강림해 적을 분쇄했다!",
          stats: { WS: 8, WP: 7, Inf: 9 },
          faith: 12,
          addTags: ["met_lion", "hero_of_imperium"]
        },
        fail: {
          text: "징조의 방주 악마 병기들의 포화에 중상을 입었으나, 제1군단 구원대의 포효를 들으며 목숨을 건졌다.",
          wounds: -26,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 라이온 귀환의 복음을 고립된 행성계에 전파하며 무너져 가던 시민들의 희망을 되살린다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "황제의 아들이 다시 돌아왔다는 소식에 절망하던 행성 전체가 들끓어 반격의 불꽃을 지폈다!",
          stats: { WP: 7, Fel: 6, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "혼란을 틈탄 카오스 선동꾼들의 습격을 막아 내다 상처를 입었으나, 희망의 불씨만은 꺼뜨리지 않았다.",
          wounds: -14,
          stats: { WP: 5 }
        }
      },
      {
        label: "거대 스페이스 헐크 함대의 이동 경로를 피하며 소속 거점의 방어와 생존 물자 확보에 집중한다",
        effect: {
          text: "신화 같은 영웅들의 전쟁 속에서도 자신이 지킬 자리를 끝까지 사수했다.",
          stats: { T: 5, Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Arks of Omen / The Lion: Son of the Forest"
  },
  {
    id: "tl_fourth_tyranic",
    year: 1028,
    title: "제4차 타이라니드 전쟁 — 서부 은하의 포식자",
    en: "Fourth Tyrannic War",
    scope: "은하계 전역 · 파시피쿠스",
    filter: {},
    characters: [],
    summary: "하이브 함대 레비아탄의 거대한 신형 촉수가 인류제국 서부 세그멘툼 파시피쿠스를 향해 테라 직행 코스로 밀려들어 왔다.",
    text: "모두가 동부 전선에 시선을 빼앗긴 사이, 타이라니드 하이브 함대 레비아탄의 최대 주력이 은하 서부에서 모습을 드러냈다! 테라를 향한 절체절명의 방어전 '제4차 타이라니드 전쟁'이 선포된다.",
    choices: [
      {
        label: "[사격 판정] 서부 방어선 솔블레이드 기동대에 합류해 타이라니드 생체 괴수들과 싸운다",
        req: { minAge: 16, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "BS", diff: -10 },
        success: {
          text: "하늘을 가리는 스포어와 카니펙스 무리를 막아 내며 제국 서부 방어선의 영웅으로 기록되었다!",
          stats: { BS: 7, WS: 5, T: 4, Inf: 10 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "타이라니드 산성 포자에 심각한 부상을 입고 전선에서 물러났다.",
          wounds: -32,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 궤도 봉쇄와 생체 함선 약점 분석으로 방어군을 지휘·지원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시냅스 생물의 지휘망을 정밀 타격하도록 유도해 행성계 하나의 몰살을 막아 냈다!",
          stats: { Int: 7, Inf: 9, WP: 4 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "워프의 그림자로 성간 통신이 두절되며 아군과 고립되어 고초를 겪었다.",
          wounds: -18,
          stats: { WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Fourth Tyrannic War / Warhammer 40k 10th Edition Core"
  }
];
