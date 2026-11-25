// 분기 사건 — 직군 계열: 에클레시아키 · 아뎁타 소로리타스 · 캐노네스 · 국교 사제 · 기적
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_sororitas_miracle",
    title: "살아 있는 신앙의 기적",
    category: "신앙",
    req: {
      minAge: 16,
      minFaith: 72,
      maxCorruption: 10,
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "blank", "mechanicus",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "신앙 72 이상 · 오염 10 이하 필멸 신도",
    weight: 16,
    text: "절체절명의 위기 속, 황금빛 광채가 그대의 손끝과 성상을 감싸 안는다! 포탄이 기적처럼 빗나가고, 쓰러졌던 아군들이 눈물을 흘리며 다시 일어선다.",
    choices: [
      {
        label: "[의지 판정] 황제의 이름을 찬양하며 기적의 빛을 전장에 쏟아낸다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "이단과 악마들이 성광 앞에서 재가 되어 흩어졌다! 국교가 그대를 '축복받은 자'로 기록하기 시작했다.",
          stats: { WP: 8, Fel: 6, Inf: 10 },
          wounds: 25,
          faith: 12,
          corruption: -15,
          addTags: ["living_miracle"]
        },
        fail: {
          text: "과도한 신앙의 열기를 필멸의 육신이 감당하지 못해 피를 토하며 실신하고 말았다.",
          wounds: -8,
          stats: { WP: 2 }
        }
      },
      {
        label: "눈부신 광채를 홀로 감당하지 않고 쓰러진 전우들의 손을 맞잡아 함께 황제의 성가를 합창한다",
        effect: {
          text: "전선 전체에 잔잔한 황금빛 온기가 퍼져 나가며 병사들의 공포를 씻어 냈다. 겸허한 신앙이 기적의 불씨를 지켰다.",
          stats: { WP: 4, Fel: 4 },
          wounds: 8,
          faith: 8,
          corruption: -6
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_job_priest_relic",
    title: "에클레시아키 — 의심스러운 성유물과 광신도 군중",
    category: "직업 고유",
    once: true,
    req: {
      anyCareers: ["ecclesiarchy_priest", "ministorum_confessor"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직업: 에클레시아키 사제",
    weight: 24,
    text: "지역 대성당에 모셔진 '성자 드루수스의 황금 뼈'가 사실은 100년 전 사기꾼 상인이 팔아넘긴 외계 가축 그록스의 뼈라는 비밀 기록을 발견했다! 지금 밖에서는 순례자 10만 명이 성유물 행렬을 기다리며 눈물을 흘리고 있다.",
    choices: [
      {
        label: "진실보다 중요한 것은 인류의 신앙이다! 비밀을 덮고 더욱 장엄하게 설교한다",
        effect: {
          text: "10만 순례자의 환호와 엄청난 봉헌금이 쏟아졌다. 어차피 기적은 뼈가 아니라 믿음에서 나오는 법이다.",
          stats: { Fel: 6, Inf: 8 },
          faith: 4,
          corruption: 4,
          align: { ruthless: 8 }
        }
      },
      {
        label: "[의지 판정] 거짓 성유물을 폐기하고 순수한 황제 교리만을 설파한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "분노하던 군중을 압도적인 설교로 감화시켜 대성당의 부패를 정화했다!",
          stats: { WP: 7, Fel: 5, Inf: 5 },
          faith: 16,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "성유물 장사로 배를 불리던 상급 사제들에게 미운털이 박혀 변방 교구로 좌천되었다.",
          stats: { Inf: -8 },
          faith: 6,
          align: { dogmatic: 7 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy / Ciaphas Cain"
  },
  {
    id: "ev_rank_canoness_crusade",
    title: "캐노네스의 결단 — 추기경의 정치적 출병 요구",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["canoness"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "계급: 캐노네스",
    weight: 28,
    text: "교구의 부패한 추기경이 자신과 반목하는 성계 귀족 가문의 영지를 본보기로 숙청하기 위해 전투 수녀단의 즉각 출동을 명령해 왔다. 그러나 그대의 정찰대는 인접 변경 성계에 진짜 카오스 컬트가 창궐해 행성 방위군을 학살하고 있음을 보고했다.",
    choices: [
      {
        label: "[의지 판정] 추기경의 사사로운 요구를 단호히 일축하고 진짜 이단이 들끓는 변경 전선으로 출병한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "성스러운 볼터와 화염으로 카오스 의식을 분쇄하고 국교 총본산으로부터 살아 있는 귀감으로 칭송받았다!",
          stats: { WP: 8, Inf: 10, Fel: 5 },
          faith: 15
        },
        fail: {
          text: "성전은 승리했으나 보복에 나선 추기경의 방해로 보급이 끊겨 힘든 시기를 겪었다.",
          wounds: -18,
          stats: { Inf: -5 },
          faith: 10
        }
      },
      {
        label: "부관 셀레스티안에게 변경 구원군을 맡기고, 그대는 직접 추기경 성당을 찾아가 이단 첩보 보고서를 들이밀며 출병 명령 철회를 관철한다",
        effect: {
          text: "명확한 이단 증거 앞에서 추기경이 꼬리를 내리고 물러났다. 수녀단의 칼날은 본연의 사명인 이단 정화로 향했다.",
          stats: { Inf: 6, Fel: 4, WP: 4 },
          faith: 8
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_sororitas_relic_escort",
    title: "성녀의 유골함 호송 작전",
    category: "신앙",
    req: {
      anyCareers: ["adepta_sororitas", "sororitas_celestian", "canoness", "ecclesiarchy_priest"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "아뎁타 소로리타스 · 국교 성직자",
    weight: 22,
    text: "순교 성녀의 심장이 담긴 황금 성유물함을 최전선 성당으로 호송하던 중, 카오스 워밴드 매복 부대가 성스러운 수송대를 포위했다!",
    choices: [
      {
        label: "[사격 판정] 성가를 합창하며 호위대의 볼터와 멜타 화력으로 적진을 뚫고 성유물을 지킨다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 한 점의 흠집도 없이 성유물함을 봉안했다! 순례자 수만 명이 기적을 외치며 환호했다.",
          stats: { BS: 5, WP: 6, Inf: 8 },
          faith: 14
        },
        fail: {
          text: "성유물함은 지켜 냈으나 적 볼터탄에 중상을 입었다.",
          wounds: -24,
          faith: 10
        }
      },
      {
        label: "수송 차량으로 방어 원진을 세우고 성유물함을 품에 안은 채 성당 구원군이 도착할 때까지 사수한다",
        effect: {
          text: "포연과 탄막을 견뎌 낸 끝에 마침내 구원 나팔 소리가 울려 퍼졌다. 성유물함은 끝까지 온전했다.",
          stats: { T: 4, WP: 4 },
          faith: 8
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_career_sororitas_trial",
    title: "아뎁타 소로리타스 — 화형대 앞 회개자와 전투 수녀의 신념",
    category: "직군 고유",
    req: {
      anyCareers: ["adepta_sororitas", "sororitas_celestian"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아뎁타 소로리타스",
    weight: 26,
    text: "반역 하이브를 탈환한 뒤, 이단 설교에 잠시 휘말렸던 하층 시민 수백 명이 광장에 끌려 나왔다. 국교 추기경은 전원 화형을 명하지만, 그중 수많은 아이들과 진심으로 눈물 흘리며 황제 찬송가를 부르는 회개자들이 보인다.",
    choices: [
      {
        label: "[의지 판정] 황제의 빛 아래 영혼을 직접 심문해 진짜 이단자만 가려내고 무고한 자들을 지켜 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "흔들리지 않는 순수한 신앙의 눈에 숨어 있던 컬트 간부 셋이 저절로 발각되었다! 무고한 시민들은 참회 노동으로 구명되었고 수녀회의 품격이 빛났다.",
          stats: { WP: 6, Fel: 6, Inf: 5 },
          faith: 12,
          corruption: -6,
          align: { humane: 9 }
        },
        fail: {
          text: "심문 중 숨어 있던 광신도가 폭탄을 터뜨려 부상을 입었으나, 그대는 끝내 쓰러지지 않고 적을 정화했다.",
          wounds: -18,
          faith: 8,
          align: { humane: 6 }
        }
      },
      {
        label: "자비는 이단의 씨앗이다. 추기경의 칙령대로 화염방사기로 광장을 완전히 정화한다",
        effect: {
          text: "불길과 찬송가가 하늘을 뒤덮었다. 국교 고위층은 그대의 무자비한 순결을 칭송했다.",
          stats: { WP: 4, BS: 4, Inf: 5, Fel: -4 },
          faith: 10,
          align: { dogmatic: 10 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Faith and Fire"
  },
  {
    id: "ev_rank_sororitas_repentia",
    title: "아뎁타 소로리타스 — 참회 수녀 시스터 레펜티아의 돌격",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["adepta_sororitas", "sororitas_celestian"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "계급: 아뎁타 소로리타스",
    weight: 28,
    text: "신앙의 과오를 씻기 위해 갑주조차 벗고 거대한 양손 체인소드 에비스서레이터만 든 참회 수녀 시스터 레펜티아 부대가 적 카오스 중전차 방어선을 향해 찬송가를 부르며 돌격하고 있다! 이대로면 전멸하지만, 그녀들의 길을 열어 주면 성전 전체가 돌파구를 얻는다.",
    choices: [
      {
        label: "[사격 판정] 볼터와 멜타 화력으로 적 기관총 둥지를 먼저 분쇄해 참회 수녀들의 돌격로를 연다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "완벽한 엄호 사격 속에 참회 수녀들이 적 중전차 세 대를 두 동강 냈다! 수많은 자매가 속죄를 이루고 살아남았다.",
          stats: { BS: 6, WP: 5, Fel: 5 },
          faith: 12
        },
        fail: {
          text: "적 중화기 반격에 파워 아머가 뚫려 부상을 입었으나, 끝까지 자매들의 측면을 지켜 냈다.",
          wounds: -20,
          faith: 8
        }
      },
      {
        label: "신앙의 기적을 기원하고 황제의 성가를 소리 높여 부르며 레펜티아 대열 바로 뒤를 따른다",
        effect: {
          text: "광신적인 성가가 전장을 울리며 공포에 떨던 아군 전체의 사기를 되살렸다.",
          stats: { WP: 5, WS: 4 },
          faith: 14,
          corruption: -8
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_rank_canoness_synod",
    title: "캐노네스 — 콘벤트 상크토룸 총회와 신앙의 성전",
    category: "계급 고유",
    once: true,
    req: {
      anyCareers: ["canoness"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "계급: 캐노네스",
    weight: 28,
    text: "오펠리아 VII의 콘벤트 상크토룸 대성당에서 시노드 미니스트라 총회가 열렸다. 국교 강경파 원로들은 변경 성지 세 곳을 동시에 탈환할 대규모 신앙의 성전을 즉시 선포하자고 목소리를 높이지만, 보급망이 뒷받침되지 않으면 전투 수녀단 절반이 고립되어 전멸할 위기다. 수녀원장인 그대의 발언이 총회의 향방을 가른다.",
    choices: [
      {
        label: "[의지 판정] 시노드 미니스트라 앞에서 성전의 대의와 치밀한 집중 타격 노선을 단호히 설파해 분산 출병안을 철회시킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "수백 명의 전투 수녀가 일제히 볼터를 들어 올리며 그대의 결단에 화답했다! 무모한 분산 출병이 철회되고 치밀한 신앙의 성전이 막을 올렸다!",
          stats: { WP: 7, Fel: 7, Inf: 12 },
          faith: 16
        },
        fail: {
          text: "국교 원로들의 정치적 견제로 징계 심문을 받고 보급 권한 일부를 깎였으나, 수녀단 주력의 궤멸만은 막아 냈다.",
          stats: { Inf: -4, Fel: -2 },
          faith: 6
        }
      },
      {
        label: "총회의 탁상공론 대신 가장 절박한 변경 성지 행성으로 교단 직할 정예 구원대를 친히 출정시킨다",
        effect: {
          text: "행동으로 신앙을 증명했다. 수많은 성당과 순례자들이 그대의 이름을 성인전에 비견하며 칭송했다.",
          stats: { WS: 4, WP: 6, Inf: 7 },
          faith: 12
        }
      }
    ],
    source: "Lexicanum: Convent Sanctorum / Codex: Adepta Sororitas"
  },
  {
    id: "ev_arc_living_miracle_trial",
    title: "기적의 증인 — 국교 성지화 열풍과 심문소의 성흔 검증",
    category: "신앙",
    once: true,
    req: {
      allTags: ["living_miracle"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "inquisitor", "lord_inquisitor", "cardinal", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "이력: 살아 있는 기적",
    weight: 38,
    text: "그대가 체험한 성스러운 기적의 소문이 성역 전역에 퍼지자, 수천 명의 순례자들이 거처 앞에 몰려들어 옷자락이라도 만지려 울부짖고 있다. 그 군중을 뚫고 오르도 헤레티쿠스 검증관이 차가운 표정으로 다가와 '황제의 은총인지 교묘한 워프 기만인지 지금 입증하라'고 명한다.",
    choices: [
      {
        label: "[의지 판정] 심문소 검증관과 순결의 성수 앞에서 흔들림 없는 신앙으로 기적의 진정성을 입증한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "사이킥 탐지기조차 고요한 가운데 그대의 기도 소리에 성당의 촛불이 일제히 타올랐다! 국교와 심문소 모두가 공식 축복을 인정했다.",
          stats: { WP: 8, Inf: 10 },
          faith: 15,
          corruption: -12,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "며칠간 이어진 가혹한 고행 검증 끝에 탈진해 쓰러졌으나, 이단 혐의만은 깨끗이 벗어났다.",
          wounds: -18,
          stats: { Inf: -3, WP: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 광신으로 치닫는 순례 군중을 차분히 달래고 모인 헌금을 전선 부상병 구호 물자로 돌린다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "우상 숭배 대신 이웃과 전선을 돕는 실질적 자선으로 신앙을 이끌어 국교와 행정부 양쪽의 찬사를 받았다.",
          stats: { Fel: 8, Inf: 7 },
          faith: 10,
          align: { humane: 9 }
        },
        fail: {
          text: "헌금 배분을 두고 지역 성직자들과 마찰이 빚어져 구설에 올랐다.",
          stats: { Inf: -3, Fel: 2 },
          align: { humane: 6 }
        }
      },
      {
        label: "세속의 숭배를 단호히 거절하고 소박한 신도로서 본연의 직무에 묵묵히 복귀한다",
        effect: {
          text: "'영광은 오직 황금 옥좌의 주인께만 돌리라.' 겸허한 물러남에 검증관도 경의를 표하며 발길을 돌렸다.",
          stats: { WP: 5 },
          faith: 8,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Living Saint / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s2_priest_crusade_sermon",
    title: "에클레시아키 사제 — 포화 속의 설교와 에비스서레이터",
    category: "신앙",
    once: true,
    req: {
      anyCareers: ["ecclesiarchy_priest", "ministorum_confessor"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 에클레시아키 사제",
    weight: 34,
    text: "이단 반군의 맹공에 아군 방어선이 무너지기 직전이다. 겁에 질린 병사들이 참호 뒤로 물러서려 하자, 확성기를 쥔 사제의 입에서 어떤 말씀이 터져 나오느냐에 전선 전체의 운명이 걸려 있다.",
    choices: [
      {
        label: "[교섭 판정] 무너진 바리케이드 위로 올라서서 황제의 성구를 목청껏 외쳐 병사들의 사기를 되살린다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "'황제께서 지켜보신다! 두려움을 불태워라!' 달아나던 병사들이 일제히 총검을 고쳐 쥐고 역습에 나서 승리를 거머쥐었다!",
          stats: { Fel: 8, WP: 5, Inf: 7 },
          faith: 12,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "포탄 파편에 어깨를 다쳐 확성기를 놓쳤으나, 피를 흘리며 외친 기도 소리가 일부 병사들을 붙들어 세웠다.",
          wounds: -14,
          faith: 4,
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[백병 판정] 성스러운 에비스서레이터의 시동을 걸고 찬송가를 부르며 적 선봉대 한복판으로 돌격한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "광신적인 기세로 이단 지휘관을 두 동강 내자 아군 전체가 열광하며 진격했다!",
          stats: { WS: 7, WP: 6 },
          faith: 10,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "적의 집중 사격에 쓰러져 야전 의무실로 실려 갔으나, 순교를 두려워하지 않은 용기에 성당의 찬사가 쏟아졌다.",
          wounds: -22,
          faith: 6,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "야전 구호소에서 임종을 앞둔 부상병들의 손을 잡아 주며 마지막 황제의 축복을 베푼다",
        effect: {
          text: "전장의 광기 속에서도 마지막 자비를 지켰다. 병사들이 평온한 얼굴로 황제의 품에 눈을 감았다.",
          stats: { WP: 5, Fel: 4 },
          faith: 8,
          align: { humane: 9 }
        }
      }
    ],
    source: "Lexicanum: Ministorum Priest / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s6_sororitas_order_choice",
    title: "아뎁타 소로리타스 — 주요 전투 교단의 깃발과 순교자의 맹세",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 18,
      gender: "female",
      anyCareers: ["sororitas_novitiate", "adepta_sororitas"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "여성 · 수련 수녀 · 아뎁타 소로리타스",
    weight: 36,
    text: "성전 출정을 앞두고 대성당의 제단 앞에 아뎁타 소로리타스 핵심 전투 교단들의 성기가 나란히 세워졌다. 검은 갑주에 진홍 망토의 '아워 마터드 레이디', 고행과 인내의 '발로러스 하트', 그리고 격렬한 성전의 칼날 '블러디 로즈' 가운데 그대가 본받을 신앙의 결을 택할 순간이다.",
    choices: [
      {
        label: "[의지 판정] 성녀 캐서린의 유산을 잇는 '아워 마터드 레이디'의 불굴의 전선 교리에 서약한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "어떠한 절망 앞에서도 꺾이지 않는 순교자의 기백이 그대의 영혼에 깃들었다! 전선 전체가 그대의 찬송가에 화답했다.",
          stats: { WP: 8, BS: 5, Inf: 6 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "가혹한 철야 기도 끝에 무릎이 찢어졌으나, 교단의 강철 같은 신념만은 가슴에 새겼다.",
          wounds: -10,
          faith: 6,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 성녀 미나의 분노를 계승하는 '블러디 로즈'의 선봉 체인소드 돌격대에 합류한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "진홍빛 갑주가 이단자들의 진영을 벼락처럼 갈라 놓았다! 블러디 로즈의 맹렬한 성전이 그대의 검끝에서 타올랐다.",
          stats: { WS: 8, Ag: 5, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "과감한 선봉 돌격 도중 적 포화에 큰 상처를 입었으나, 성전 깃발만큼은 적진 한복판에 꽂았다.",
          wounds: -18,
          stats: { WS: 5, T: 3 }
        }
      },
      {
        label: "성녀 루시아의 고행을 따르는 '발로러스 하트'의 인내를 본받아 묵묵히 순교의 방패가 되기를 맹세한다",
        effect: {
          text: "화려한 공명심 없이 고통과 시련을 견디는 침착한 신앙을 택했다. 육신과 영혼이 한층 단단해졌다.",
          stats: { T: 6, WP: 6 },
          faith: 10,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Orders Militant / Codex: Adepta Sororitas"
  },
  // =========================================================================
  // 12단계: 아뎁타 소로리타스 · 캐노네스 · 에클레시아키 사제 심화 사건 3종
  // =========================================================================
  {
    id: "ev_s12_sororitas_penitent",
    title: "아뎁타 소로리타스 — 참회 엔진의 절규와 전투 수녀의 신념",
    category: "신앙",
    req: {
      anyCareers: ["adepta_sororitas", "sororitas_celestian"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 아뎁타 소로리타스",
    weight: 28,
    text: "이단 요새 돌파전, 죄수들을 묶어 거대 회전 톱날을 달아 둔 참회 엔진 부대가 울부짖으며 적진으로 돌진하고 있다. 그중 한 기가 적 대전차 지뢰에 다리가 날아가며 고통 속에 쓰러졌고, 묶여 있던 죄수가 그대를 향해 울며 자비를 애원한다.",
    choices: [
      {
        label: "[의지 판정] 죄인의 속죄가 이미 충분함을 선포한 뒤 볼터 단발로 황제의 안식을 내려 고통을 끝내 준다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "고통에 뒤틀렸던 죄수의 얼굴에 마침내 평온이 찾아왔다. 신앙의 엄정함과 자비를 함께 품은 진정한 전투 수녀의 결단이었다.",
          stats: { WP: 7, Fel: 4, BS: 3 },
          faith: 8,
          align: { humane: 8 }
        },
        fail: {
          text: "사격 순간 적 저격탄이 파워 아머 어깨를 스쳤으나, 그대는 흔들리지 않고 죄수에게 황제의 안식을 내려 주었다.",
          wounds: -12,
          stats: { WP: 4 },
          faith: 5,
          align: { humane: 6 }
        }
      },
      {
        label: "[백병 판정] 쓰러진 참회 엔진 앞을 막아서고 체인소드로 몰려드는 이단자 무리를 정화해 죄수의 마지막을 지킨다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "불타는 화염방사기와 볼터 세례 속에 이단 요새 정문이 열렸다! 자매들이 찬송가를 부르며 뒤따랐다.",
          stats: { WS: 7, T: 4, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "이단자들의 맹공에 부상을 입었으나 돌파구를 끝까지 사수했다.",
          wounds: -18,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "감상에 젖지 않고 교리에 따라 전진 명령을 수행하며 성채 내부 성소 탈환에 집중한다",
        effect: {
          text: "흔들림 없는 신앙과 규율로 이단 성채의 최상층까지 정화했다.",
          stats: { WP: 5, BS: 4 },
          faith: 6,
          align: { dogmatic: 8 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Lexicanum: Penitent Engine"
  },
  {
    id: "ev_s12_canoness_relic_war",
    title: "캐노네스 — 두 성지 주교구의 성유물 분쟁과 중재",
    category: "신앙",
    req: {
      anyCareers: ["canoness"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 캐노네스",
    weight: 28,
    text: "고대 성녀의 순교 유골함을 두고 인접한 두 대주교구가 서로 정통 소유권을 주장하며 후원 귀족 가문의 호위대와 프라테리스 밀리티아 민병대까지 동원해 일촉즉발의 유혈 충돌을 앞두고 있다. 성유물을 호위하는 소로리타스 지휘관으로서 그대의 결단이 국교 내전을 막을 유일한 열쇠다.",
    choices: [
      {
        label: "[교섭 판정] 두 대주교를 대성당 제단 앞에 세우고 '성유물은 성직자의 소유가 아니라 전선 병사들의 등불'이라며 공동 봉안을 관철한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "성녀의 위엄을 대변한 장엄한 설득에 두 대주교가 부끄러워하며 무릎을 꿇었다! 시노드 원로회가 그대의 지혜를 극찬했다.",
          stats: { Fel: 8, Inf: 9, WP: 5 },
          faith: 10
        },
        fail: {
          text: "양쪽 대주교가 중재안을 거부하고 험악한 신경전을 벌이는 바람에 수녀회의 중재 권위가 크게 훼손되었다.",
          stats: { Inf: -4, Fel: -2 }
        }
      },
      {
        label: "[권위 판정] 전투 수녀회 직권으로 유골함을 아예 최전선 성전군 성당으로 이송해 정치 분쟁을 원천 차단한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "전선으로 향한 성유물 앞에서 수십만 가드맨의 사기가 하늘을 찔렀다! 누구도 반박하지 못할 성스러운 결단이었다.",
          stats: { Inf: 9, WP: 6, Fel: 4 },
          faith: 10
        },
        fail: {
          text: "양쪽 주교구의 거센 항의 서한이 시노드 원로회에 빗발치며 그대는 월권 심문에 회부되었다.",
          stats: { Inf: -5, Fel: -2 }
        }
      },
      {
        label: "유골함의 진위와 소유권 심의를 오펠리아 VII 시노드 미니스트라 본산으로 정식 이관한다",
        effect: {
          text: "절차에 따른 공정한 이관으로 불필요한 유혈 사태 없이 분쟁을 봉합했다.",
          stats: { Int: 5, Inf: 5, WP: 4 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Lexicanum: Canoness"
  },
  {
    id: "ev_s12_priest_heretic_debate",
    title: "에클레시아키 사제 — 지하 공장의 이단 선동가와 공개 교리 대결",
    category: "신앙",
    req: {
      anyCareers: ["ecclesiarchy_priest", "ministorum_confessor"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 에클레시아키 사제",
    weight: 28,
    text: "기근과 과로에 지친 하층 매뉴팩토룸 노동자 수천 명 앞에 정체불명의 '자비로운 네 팔의 황제'를 설파하는 이단 선동가가 나타났다. 지금 무력 진압만 부르면 공장 전체가 폭동으로 불탈 것이다. 그대는 성전과 에비스서레이터를 들고 군중 한복판으로 걸어 들어갔다.",
    choices: [
      {
        label: "[교섭 판정] 군중의 고통을 어루만지면서도 '네 팔의 거짓 신은 외계 괴물의 덫'임을 웅변으로 폭로한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "진실에 눈뜬 노동자들이 스스로 이단 선동가를 붙잡아 그대 앞에 끌어냈다! 공장에 다시 진정한 황제 찬가가 울려 퍼졌다.",
          stats: { Fel: 8, WP: 6, Inf: 7 },
          faith: 10,
          align: { humane: 7 }
        },
        fail: {
          text: "광기에 물든 추종자 몇 명이 쇠파이프를 던져 부상을 입었으나 끝내 군중의 마음을 돌렸다.",
          wounds: -14,
          stats: { Fel: 4, WP: 5 },
          faith: 6,
          align: { humane: 5 }
        }
      },
      {
        label: "[백병 판정] 이단자와의 대화는 죄악이다 — 에비스서레이터의 굉음과 함께 단상으로 뛰어올라 거짓 선지자를 즉결 처단한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "쓰러진 선동가의 로브 아래에서 진짜 진스틸러 혼혈의 기형 팔이 드러나자 군중이 공포와 경외 속에 무릎을 꿇었다!",
          stats: { WS: 7, WP: 6, Inf: 6 },
          faith: 10,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "변이된 이단자의 기습 발톱에 깊은 상처를 입었으나 끝내 이단자를 정화했다.",
          wounds: -20,
          stats: { WS: 4, T: 4 },
          faith: 6,
          align: { dogmatic: 7 }
        }
      },
      {
        label: "성당 구호 식량을 먼저 공장에 풀어 굶주린 노동자들을 진정시킨 뒤 아르비테스와 함께 선동가만 조용히 체포한다",
        effect: {
          text: "배고픈 이에게 빵과 믿음을 함께 건넨 현명한 사목으로 이단의 싹을 조용히 잘라 냈다.",
          stats: { Int: 5, Fel: 5, Inf: 4 },
          faith: 6,
          align: { humane: 9 }
        }
      }
    ],
    source: "Dark Heresy: Blood of Martyrs / Lexicanum: Ecclesiarchy"
  }
);

