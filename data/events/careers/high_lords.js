// 분기 사건 — 직군 계열: 테라의 하이 로드 (세나토룸 임페리알리스 12석 공용 + 10석 전용)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_s14_hl_senatorum_decree",
    title: "세나토룸 임페리알리스 — 100만 행성 대성전 십일조 증세안",
    category: "테라의 하이 로드",
    once: true,
    req: {
      anyCareers: [
        "lord_commander_militant",
        "abbess_sanctorum",
        "ecclesiarch",
        "custodes_captain_general",
        "inquisitor_representative",
        "fabricator_general",
        "lord_high_admiral",
        "grand_provost_marshal",
        "master_of_administratum",
        "master_of_astronomicum",
        "paternoval_envoy",
        "grand_master_of_assassins"
      ]
    },
    reqLabel: "직군: 테라의 하이 로드 (12석 공용)",
    weight: 38,
    text: "황궁 심장부의 거대한 세나토룸 임페리알리스 원형 의사당이 팽팽한 침묵과 냉랭한 살기로 가득 찼다. 은하 변방 세 개 세그멘툼에서 동시다발적 침공이 보고되자, 새로운 대성전을 선포하고 100만 행성의 군수·병력 십일조를 일괄 증세하자는 긴급 안건이 상정된 것이다. 화성 파브리케이터와 아드미니스트라툼, 국교와 군부, 항법사와 암살청 의석 사이에서 수십억 필멸자의 운명을 저울질하는 험악한 수 싸움이 오간다. 이제 테라의 하이 로드로서 어떤 의결을 밀어붙일지 그대의 인장이 모든 방향을 가른다.",
    choices: [
      {
        label: "[군사·집행 의석 전용 · 권위 판정] 육군·함대·황궁 근위·제국법의 합동 권한으로 즉각 징발령을 관철한다",
        req: {
          anyCareers: [
            "lord_commander_militant",
            "lord_high_admiral",
            "custodes_captain_general",
            "grand_provost_marshal"
          ]
        },
        check: { stat: "Inf", diff: -20 },
        success: {
          text: "무력과 법 집행의 압도적 연대 앞에 미온적인 의석들이 침묵하며 칙령에 날인했다. 대성전 병력과 함대 보급이 지체 없이 편성되며 원로원 내 군사·집행 의석의 패권이 확고해졌다.",
          stats: { Inf: 6, WP: 4, Fel: 3 }
        },
        fail: {
          text: "일부 행정·상업 의석의 의사 지연 공작과 물류 태업으로 발효가 한 분기 늦어졌다. 정적들의 견제가 거세졌으나 최전선 사수 의지만큼은 의사당에 선명히 각인되었다.",
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "[신앙·심문·암살 의석 전용 · 교섭 판정] 황제의 성호와 침묵의 감시를 앞세워 성전 십일조의 신성한 의무를 선포한다",
        req: {
          anyCareers: [
            "abbess_sanctorum",
            "ecclesiarch",
            "inquisitor_representative",
            "grand_master_of_assassins"
          ]
        },
        check: { stat: "Fel", diff: -20 },
        success: {
          text: "대성전의 정당성이 신앙의 율법으로 승화되고, 배후에서 속삭이던 반대파 의석마저 심문소와 그림자 의석의 냉엄한 시선 앞에 꼬리를 내렸다. 은하 전역 대성당과 성역 평의회에서 자발적 헌납과 성전 열기가 타올랐다.",
          stats: { Fel: 6, Inf: 5, WP: 3 },
          faith: 8
        },
        fail: {
          text: "과도한 신앙 독려에 기계교와 해군 의석이 냉소적으로 반발하며 의결이 교착되었다. 그래도 황금 옥좌의 권위를 앞세운 웅변은 충성파의 지지를 결집했다.",
          stats: { Inf: -2, WP: 4 },
          faith: 4
        }
      },
      {
        label: "[화성·행정·항로 의석 전용 · 지성 판정] 십일조 장부와 포지 생산량, 워프 항로와 아스트로노미칸 조류를 재연산해 지속 가능한 증세안을 통과시킨다",
        req: {
          anyCareers: [
            "fabricator_general",
            "master_of_administratum",
            "master_of_astronomicum",
            "paternoval_envoy"
          ]
        },
        check: { stat: "Int", diff: -20 },
        success: {
          text: "한 치의 오차도 없는 병참 수치와 항로 예측이 강경파의 무리한 요구를 단숨에 잠재웠다. 수백 개 행성의 아사와 반란을 막으면서도 대성전 군수를 확보한 탁월한 경륜이 의사당을 압도했다.",
          stats: { Int: 6, Inf: 5, Fel: 3 }
        },
        fail: {
          text: "방대한 세그멘툼 통계에 숨어 있던 누락 항목이 정적에게 공격당해 수정안이 일부 후퇴했다. 그러나 핵심 병참망의 붕괴만큼은 끝내 막아 냈다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "[절충 칙령] 모든 의석이 십일조 부담과 감찰 책임을 균등히 나누는 공동 칙령에 서명한다",
        effect: {
          text: "어느 한 의석도 독주하지 못하게 정교한 균형안을 도출해 대성전 칙령을 통과시켰다. 수십억 병사가 은하 변방으로 행군을 시작하는 가운데, 그대의 냉철한 중재력이 세나토룸의 질서를 지탱했다.",
          stats: { Inf: 4, Fel: 3, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: High Lords of Terra / Watchers of the Throne: The Emperor's Legion"
  },
  {
    id: "ev_s14_hl_regent_guilliman",
    title: "귀환한 섭정의 개혁령 — 로부테 길리먼과의 대면",
    category: "테라의 하이 로드",
    once: true,
    characters: ["guilliman"],
    req: {
      greatRift: true,
      minYear: 1001,
      anyCareers: [
        "lord_commander_militant",
        "abbess_sanctorum",
        "ecclesiarch",
        "custodes_captain_general",
        "inquisitor_representative",
        "fabricator_general",
        "lord_high_admiral",
        "grand_provost_marshal",
        "master_of_administratum",
        "master_of_astronomicum",
        "paternoval_envoy",
        "grand_master_of_assassins"
      ]
    },
    reqLabel: "인도미투스 성전 이후(001.M42+) · 테라의 하이 로드 (12석 공용)",
    weight: 40,
    text: "시카트릭스 말레딕툼이 은하를 두 동강 낸 뒤, 1만 년의 잠에서 깨어난 제국 섭정 로부테 길리먼이 푸른 황금 갑주를 울리며 원로원 의장석 앞에 섰다. 프라이마크는 썩어 문드러진 행정 특권과 구시대적 법령을 혁파하고, 인도미투스 성전에 모든 역량을 집중할 대개혁 칙령을 내밀었다. 일부 보수파 하이 로드들이 비밀리에 '육두정치' 반발을 모의하며 그대에게 은밀한 눈길을 보내는 사이, 반신의 차갑고도 지친 눈동자가 그대를 정면으로 꿰뚫는다. 황제의 아들이 제시한 새 질서에 설 것인가, 1만 년 원로원의 전통을 수호할 것인가.",
    choices: [
      {
        label: "[캡틴-제너럴 전용 · 의지 판정] 황제의 뜻만을 기준으로 섭정의 개혁을 냉정히 검증하고 옥좌의 균형을 지킨다",
        req: { anyCareers: ["custodes_captain_general"] },
        check: { stat: "WP", diff: -20 },
        success: {
          text: "길리먼은 만 명의 수호자 총사령관이 지닌 흔들림 없는 독립성과 통찰에 깊은 경의를 표했다. 황궁과 섭정 사이의 견고한 신뢰가 세워지며, 테라의 음모가 싹트기 전에 차단되었다.",
          stats: { WP: 6, Int: 5, Inf: 6 },
          addTags: ["met_guilliman"]
        },
        fail: {
          text: "프라이마크와 황제의 의도를 해석하는 대목에서 서늘한 평행선이 이어졌으나, 서로의 사명을 존중하는 절제된 합의로 회동을 마쳤다.",
          stats: { WP: 4, Int: 3 },
          addTags: ["met_guilliman"]
        }
      },
      {
        label: "[지성 판정] 섭정의 인도미투스 개혁안에 전폭 협조하며 관할 기관의 적폐를 스스로 도려낸다",
        check: { stat: "Int", diff: -20 },
        success: {
          text: "길리먼이 깊은 한숨과 함께 희미한 미소를 지었다. '1만 년의 먼지 속에서 마침내 이성이 살아 있는 동료를 만났군.' 섭정의 두터운 신임 아래 개혁파 하이 로드의 핵심 축으로 자리매김했다.",
          stats: { Int: 6, Inf: 7, Fel: 4 },
          addTags: ["met_guilliman"]
        },
        fail: {
          text: "개혁을 단행하는 과정에서 기존 파벌의 격렬한 반발과 암살 미수를 겪었으나, 섭정의 지원 덕분에 끝내 의석을 지켜 냈다.",
          wounds: -12,
          stats: { Int: 3, Inf: 2 },
          addTags: ["met_guilliman"]
        }
      },
      {
        label: "[권위 판정] 프라이마크 앞에서도 물러서지 않고 원로원 만 년의 헌정과 기관 독립성을 직언한다",
        check: { stat: "Inf", diff: -25 },
        success: {
          text: "반신의 위압감 앞에서도 논리와 충성으로 맞선 담력에 길리먼마저 고개를 끄덕였다. 무분별한 숙청 대신 단계적 개혁 절충안을 이끌어 내며 보수파와 개혁파 양쪽의 경외를 얻었다.",
          stats: { Inf: 7, WP: 6, Fel: 4 },
          addTags: ["met_guilliman"]
        },
        fail: {
          text: "길리먼의 서늘한 질책이 의사당을 얼어붙게 했고, 육두정치 동조 혐의를 피하려 막대한 정치적 입지를 양보해야 했다.",
          stats: { Inf: -6, WP: 4 },
          addTags: ["met_guilliman"]
        }
      },
      {
        label: "[실무 협조 서약] 정쟁에서 한발 물러나 관할 의석의 대성전 지원 의무를 묵묵히 이행한다",
        effect: {
          text: "격변하는 테라 권력 지형 속에서 어느 음모에도 휘말리지 않고 본연의 책무를 완수했다. 길리먼 역시 그대의 침착한 충성을 높이 평가하며 의석의 권한을 그대로 인정했다.",
          stats: { WP: 4, Inf: 4, Int: 3 },
          addTags: ["met_guilliman"]
        }
      }
    ],
    source: "Watchers of the Throne: The Regent's Shadow / Dark Imperium"
  },
  {
    id: "ev_s14_hl_lcm_tithe",
    title: "대성전 총동원의 주도권 — 전략 예비군과 공성 연대 배분",
    category: "하이 로드 고유",
    once: true,
    req: {
      anyCareers: ["lord_commander_militant"]
    },
    reqLabel: "직군: 로드 커맨더 밀리탄트",
    weight: 38,
    text: "황궁 군사청의 흑요석 집무실에 다섯 세그멘툼의 전략 예비군 편성표와 공성 포병 연대 배정안이 펼쳐져 있다. 데파르트멘토 무니토룸과 해군본부는 수송선 부족을 이유로 세 개 최전선 가운데 한 전구의 기갑·포병 지원을 끊고 보병 사단만 대거 징집해 투입하자고 압박한다. 그러나 일선 연대들이 중화기와 보급 없이 밀어붙여질 때 어떤 대참사가 벌어지는지 제국 육군 총사령관만큼 뼈저리게 아는 자도 없다. 수억 장병의 운명을 좌우할 대성전 동원 체계의 주도권을 어떻게 세울 것인가.",
    choices: [
      {
        label: "[병사·분대장 경력 전용 · 지성 판정] 진흙 참호에서 몸으로 겪은 보급 생리를 근거로 무니토룸의 보병 소모안을 폐기하고 포병·순환 배치안을 관철한다",
        req: { anyPastCareers: ["astra_militarum", "militarum_sergeant", "pdf_trooper"] },
        check: { stat: "Int", diff: -18 },
        success: {
          text: "참호에서 라스건을 쥐던 시절의 생생한 현장 감각이 책상 위 관료들의 허상을 단숨에 꿰뚫었다. 포병 지원과 순환 배치가 확립되자 일선 연대들 사이에 '병사의 피를 아는 유일한 총사령관'이라는 전설이 퍼졌다.",
          stats: { Int: 7, Fel: 5, Inf: 6, WP: 4 }
        },
        fail: {
          text: "데파르트멘토 무니토룸의 관료적 저항에 부딪혀 일부 전구만 개선되었으나, 핵심 공성 연대의 지원선만큼은 끝내 사수했다.",
          wounds: -10,
          stats: { Int: 3, WP: 4 }
        }
      },
      {
        label: "[권위 판정] 무능한 세습 귀족 군단장들을 즉각 파면하고 전선 베테랑 장교단에게 전략 예비군 지휘권을 넘긴다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "테라 군벌 귀족들의 격렬한 반발을 압도적 권위로 찍어 누르고 실전형 지휘부를 구축했다. 새 지휘관들이 이끄는 연대들이 연이어 승전보를 올리며 육군의 기강이 되살아났다.",
          stats: { Inf: 7, Fel: 6, WP: 4 }
        },
        fail: {
          text: "기득권 장성단의 은밀한 태업과 정치 공세로 원로원 내 입지가 흔들렸으나, 야전군 하급 장병들의 충성심만큼은 굳건히 얻었다.",
          stats: { Inf: -4, Fel: 5, WP: 3 }
        }
      },
      {
        label: "[교섭 판정] 해군본부와 포지 월드 사절단을 중재해 중기갑 수송 선단을 증편하고 세 전구에 공성 포병을 균형 배정한다",
        check: { stat: "Fel", diff: -18 },
        success: {
          text: "군부와 병참, 해군의 이해를 절묘하게 묶어 낸 합동 수송 협정이 타결되었다. 모든 전구에 제때 기갑과 포탄이 도착하며 대성전의 기세가 크게 올랐다.",
          stats: { Fel: 6, Inf: 6, Int: 4 }
        },
        fail: {
          text: "협상 지연으로 초기 보급이 엇갈렸으나, 중기 이후 공성 연대의 전력 공백을 가까스로 메웠다.",
          stats: { Fel: 3, Inf: -2 }
        }
      },
      {
        label: "[총사령관의 결단] 최우선 요충 전구에 중기갑과 공성 포병을 집중 배정하고 나머지 전선에는 자체 동원령을 하달한다",
        effect: {
          text: "모든 곳을 똑같이 지킬 수 없다는 냉엄한 군사 현실을 받아들이고 칙령에 서명했다. 제국 육군의 강철 같은 결단력이 중심 전선을 굳건히 떠받쳤다.",
          stats: { WP: 6, Inf: 5 }
        }
      }
    ],
    source: "Lexicanum: Lord Commander Militant / Codex: Astra Militarum"
  },
  {
    id: "ev_s14_hl_abbess_crusade",
    title: "양대 콘벤트의 불꽃 — 테라와 오펠리아 VII의 성전 지휘권",
    category: "하이 로드 고유",
    once: true,
    req: { anyCareers: ["abbess_sanctorum"] },
    reqLabel: "직군: 아베스 상크토룸",
    weight: 38,
    text: "신성한 테라의 콘벤트 프리오리스와 세그멘툼 템페스투스 오펠리아 VII에 자리한 콘벤트 상크토룸의 대수녀원장들이 성전 선봉 지휘권을 두고 날카롭게 맞섰다. 순교한 성녀의 유해가 봉안된 경계 성계로 대대적인 신앙 성전이 선포되자, 양대 본산 교단들이 저마다 선봉과 성물 수호권을 요구하며 갈등이 깊어진 것이다. 아뎁타 소로리타스 전 교단의 영적·군사적 수장이자 테라의 하이 로드인 그대의 결정 하나에 수십만 전투 수녀들의 행군이 달려 있다. 축성된 황금 성유물 파워 아머의 중압감을 짊어진 채 양대 본산의 자존심과 성전의 승리를 어떻게 조율할 것인가.",
    choices: [
      {
        label: "[수련 수녀 경력 전용 · 교섭 판정] 말단 노비티에이트 시절의 겸허한 서원을 일깨워 양대 콘벤트의 합동 선봉대를 결성한다",
        req: { anyPastCareers: ["sororitas_novitiate"] },
        check: { stat: "Fel", diff: -18 },
        success: {
          text: "가장 낮은 수련 수녀의 자리에서부터 올라온 총원장의 진심 어린 훈계에 테라와 오펠리아 VII의 캐노네스들이 모두 무릎을 꿇었다. 두 본산이 한 깃발 아래 뭉친 성전군은 파죽지세로 이단 성계를 정화했다.",
          stats: { Fel: 6, WP: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "양측 원로 수녀들의 오랜 자존심을 단번에 녹이지는 못했으나, 합동 지휘 체계를 수립해 최악의 분열은 막아 냈다.",
          stats: { Fel: 3, WP: 4 },
          faith: 6
        }
      },
      {
        label: "[백병 판정] 논쟁을 끊고 직접 황금 성유물 갑주를 입고 선봉에 서서 성전 지휘봉을 쥔다",
        check: { stat: "WS", diff: -15 },
        success: {
          text: "테라의 하이 로드가 직접 성창을 들고 적진을 가르는 장관에 모든 전투 수녀가 눈물을 흘리며 따랐다. 성전은 눈부신 승리로 막을 내렸고 역대 위대한 성녀 총원장들에 비견될 전설이 쓰였다.",
          stats: { WS: 6, WP: 5, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "적 중화기의 집중 포화에 갑주가 손상되며 부상을 입었으나, 끝내 쓰러지지 않고 성지 탈환을 완수했다.",
          wounds: -20,
          stats: { WS: 3, WP: 5 },
          faith: 8
        }
      },
      {
        label: "[의지 판정] 오펠리아 VII 콘벤트 상크토룸에 현장 성전권을, 테라 콘벤트 프리오리스에 원로원 지원권을 명확히 분담한다",
        check: { stat: "WP", diff: -20 },
        success: {
          text: "교단의 전통과 지리적 현실을 꿰뚫는 단호한 분담에 양대 본산 모두 이의를 제기하지 못했다. 전선과 후방이 완벽히 맞물리며 성전군의 기율이 한층 높아졌다.",
          stats: { WP: 6, Int: 5, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "일부 강경 교단이 후방 배치에 불만을 품고 독자 행동에 나서 수습에 진땀을 뺐다.",
          stats: { Inf: -3, WP: 4 },
          faith: 4
        }
      },
      {
        label: "[총원장의 칙서] 양대 본산의 성가를 함께 봉헌하는 합동 철야 기도를 선포하고 순번에 따라 지휘권을 배정한다",
        effect: {
          text: "기도의 밤이 지나자 교단 간 경쟁심은 오직 황제를 향한 헌신으로 정화되었다. 모든 전투 수녀가 아베스 상크토룸의 공명정대한 통치에 깊이 승복했다.",
          stats: { WP: 4, Fel: 4, Inf: 3 },
          faith: 8
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Lexicanum: Convent Sanctorum & Convent Prioris"
  },
  {
    id: "ev_s14_hl_ecclesiarch_synod",
    title: "홀리 시노드의 칼날 — 추기경 파벌 숙청과 순교자 시성 칙령",
    category: "하이 로드 고유",
    once: true,
    req: { anyCareers: ["ecclesiarch"] },
    reqLabel: "직군: 에클레시아크",
    weight: 38,
    text: "신성한 테라의 에클레시아키 대성당 홀리 시노드 회의장이 진홍빛 법의와 황금 향로 연기로 숨 막히게 채워졌다. 수백 개 성지 행성의 봉헌금을 가로채고 수동 칙령을 정면 위반하며 사병과 정치 파벌을 키운 원로 추기경단이, 자신들의 비리를 덮기 위해 부패한 귀족 장군을 '위대한 순교 성인'으로 시성하라고 압박해 온 것이다. 반면 변방에서 굶주린 백성을 지키다 이름 없이 스러진 진정한 순교자들의 기록은 서고 구석에 처박혀 있다. 100만 행성 수천조 신도의 영혼을 이끄는 국교 총대주교로서 시노드의 칼날을 어디로 겨눌 것인가.",
    choices: [
      {
        label: "[평사제 경력 전용 · 의지 판정] 빈민가와 참호에서 설교하던 초심으로 부패 추기경단을 파문하고 무명 순교자들을 시성한다",
        req: { anyPastCareers: ["ecclesiarchy_priest"] },
        check: { stat: "WP", diff: -20 },
        success: {
          text: "대성당 강단에서 터져 나온 우레 같은 꾸짖음에 부패 추기경들이 창백하게 굳어 갔다. 수백만 하급 사제와 순례자들이 눈물을 흘리며 환호했고, 아뎁투스 미니스토룸에 수세기 만의 청명한 개혁 바람이 불었다.",
          stats: { WP: 7, Fel: 6, Inf: 6 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "궁지에 몰린 추기경 파벌이 암살자와 독주를 보내 목숨을 위협했으나, 근위대의 호위 속에 가까스로 살아남아 숙청을 마무리했다.",
          wounds: -18,
          stats: { WP: 5, Inf: 3 },
          faith: 8
        }
      },
      {
        label: "[교섭 판정] 추기경 파벌 간 상호 감찰을 유도해 정적들을 스스로 무너뜨리고 황제 신앙의 권위를 장악한다",
        check: { stat: "Fel", diff: -20 },
        success: {
          text: "치밀한 시노드 정치술로 부패 세력을 각개격파하며 단 한 방울의 피도 강단에 묻히지 않고 전권을 확립했다. 홀리 시노드 전체가 그대의 노련한 경륜 앞에 고개를 숙였다.",
          stats: { Fel: 7, Inf: 7, Int: 4 },
          faith: 6
        },
        fail: {
          text: "파벌 간 이합집산이 예상을 벗어나며 성지 십일조 수입이 일시적으로 위축되었다.",
          stats: { Inf: -4, Fel: 3 },
          faith: 2
        }
      },
      {
        label: "[권위 판정] 테라 홀리 시노드와 오펠리아 VII 시노드 미니스트라 합동 감찰령을 내려 재정과 시성 절차를 전면 동결한다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "양대 교단 본산을 아우르는 최고 칙령 앞에 어떤 추기경도 감히 저항하지 못했다. 숨겨진 성당 금고가 대성전 군비로 환수되며 원로원 내 위상이 크게 치솟았다.",
          stats: { Inf: 7, Int: 5, WP: 4 },
          faith: 8
        },
        fail: {
          text: "양대 시노드 간 관할권 마찰이 불거져 행정 처리가 길어졌으나, 부정한 시성안만큼은 확실히 폐기했다.",
          stats: { Inf: -3, WP: 4 },
          faith: 5
        }
      },
      {
        label: "[총대주교의 훈령] 모든 시성 심사를 10년간 보류하고 추기경단 전원에게 대성전 전선 순례를 명한다",
        effect: {
          text: "테라 궁정의 안락함에 젖어 있던 고위 성직자들을 최전선으로 내보내자 분파 다툼은 자연스레 잦아들었다. 황제의 교회는 다시 검과 기도의 본분으로 돌아섰다.",
          stats: { WP: 4, Fel: 4, Inf: 4 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Ecclesiarch / Holy Synod / Synod Ministra / Decree Passive"
  },
  {
    id: "ev_s14_hl_capgen_edict",
    title: "황금 옥좌의 결단 — 만 명의 수호자 극비 선제 출정 칙령",
    category: "하이 로드 고유",
    once: true,
    req: {
      anyCareers: ["custodes_captain_general"],
      allTags: ["captain_general"],
      maxCorruption: 0
    },
    reqLabel: "직군: 캡틴-제너럴 · 오염 0",
    weight: 38,
    text: "영원의 문 너머 황금 옥좌의 눈부신 빛을 등진 채, 황궁 대전략실의 홀로그램 성도 앞에 만 명의 쿠스토데스 실드-캡틴들이 침묵 속에 도열했다. 테라로 향하는 주요 워프 항로 세 곳에서 적대 세력의 조직적 봉쇄와 고대 위협이 동시에 포착되며, 만 년 동안 지켜 온 황궁 내 수비 원칙을 고수할지 아니면 비밀리에 정예 실드 호스트를 은하 외곽으로 선제 출정시킬지 중대한 기로에 선 것이다. 초대 캡틴-제너럴 콘스탄틴 발도르 이래 역대 총사령관들의 계보를 잇는 판단은 단순한 전술이 아니라 황제 폐하의 의지를 해석하는 철학적 결단이다. 만 명의 황금 창끝을 어디에 세울 것인가.",
    choices: [
      {
        label: "[근위·워든 경력 전용 · 지성 판정] 황궁의 비밀 통로와 어둠의 감방 방어선을 한 치 빈틈 없이 보강한 뒤 정예 원정대를 파견한다",
        req: { anyPastCareers: ["adeptus_custodes", "custodes_warden"] },
        check: { stat: "Int", diff: -20 },
        success: {
          text: "수세기 동안 황궁 초소를 지키며 익힌 모든 사각과 방어 체계를 완벽히 재배치해, 황금 옥좌의 안전을 단 1퍼센트도 양보하지 않으면서 은하 외곽 위협을 선제 격멸했다. 실드-캡틴들이 침묵의 경례로 찬탄을 표했다.",
          stats: { Int: 7, WP: 6, Inf: 6 }
        },
        fail: {
          text: "외곽 방어망 재배치 도중 어둠의 감방 경계 구역으로 침투한 적대 특수 요격조를 단신으로 저지하며 아우라마이트 갑주에 깊은 손상을 입었으나, 황궁과 원정대 양쪽 모두 무사히 임무를 마쳤다.",
          wounds: -12,
          stats: { Int: 4, WP: 5 }
        }
      },
      {
        label: "[백병 판정] 스스로 최정예 실드 호스트를 이끌고 태양계 외곽 위협 거점으로 직접 강습 출정한다",
        check: { stat: "WS", diff: -20 },
        success: {
          text: "황금 아우라마이트의 폭풍이 적 함대와 지휘부를 순식간에 분쇄했다. 테라로 뻗어 오던 위협이 뿌리째 도려내지며, 은하 전역에 만 명의 수호자가 여전히 깨어 있음을 각인시켰다.",
          stats: { WS: 7, T: 5, Inf: 7 }
        },
        fail: {
          text: "적의 함정과 중화기 집중 포화 속에서 치열한 혈전을 치르며 갑주에 깊은 흔적이 남았으나, 단 한 명의 형제도 잃지 않고 표적을 완전히 소멸시켰다.",
          wounds: -22,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[권위 판정] 마기스테리움 렉스 울티마를 발동해 해군과 아스타르테스 챕터들에 선제 토벌을 위임하고 황궁 방어에 집중한다",
        check: { stat: "Inf", diff: -20 },
        success: {
          text: "황제의 직접 대리인이 내린 칙령 앞에 제국 함대와 다섯 챕터가 즉각 호응해 완벽한 협공망을 구축했다. 쿠스토데스의 전력 손실 없이 테라의 외곽 방벽이 더욱 굳건해졌다.",
          stats: { Inf: 7, Fel: 5, Int: 4 }
        },
        fail: {
          text: "일부 아스타르테스 챕터와의 자존심 마찰로 합동 작전이 지연되었으나, 최종적으로는 황궁의 권위 아래 위협을 정리했다.",
          stats: { Inf: -2, WP: 5 }
        }
      },
      {
        label: "[옥좌의 규율] 소규모 선제 저지 실드 컴퍼니만 은밀히 파견하고 본대는 영원의 문 앞 불침번을 유지한다",
        effect: {
          text: "과시도 망설임도 없는 절제된 판단이었다. 은밀히 출동한 소수 정예가 위협 인자를 소리 없이 제거하는 동안, 황금 옥좌의 빛은 한순간도 흔들리지 않았다.",
          stats: { WP: 5, Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Codex: Adeptus Custodes / Watchers of the Throne: The Emperor's Legion / Lexicanum: Captain-General"
  },
  {
    id: "ev_s14_hl_inqrep_shadow",
    title: "세 대오르도의 밀서 — 원로원 내부 사찰과 그림자 암투",
    category: "하이 로드 고유",
    once: true,
    req: { anyCareers: ["inquisitor_representative"] },
    reqLabel: "직군: 이단심문소 테라 대표",
    weight: 38,
    text: "오르도 헤레티쿠스, 제노스, 말레우스의 세 원로 평의회가 동시에 암호 밀서를 보내왔다. 놀랍게도 세나토룸 임페리알리스에 함께 앉아 있는 동료 하이 로드 한 명의 핵심 보좌진이 외계 밀수망과 불경한 고대 유물 거래에 연루되어 있으며, 심지어 암살청과의 은밀한 접촉 정황까지 포착되었다는 첩보였다. 섣불리 칼을 빼 들면 테라 최고 권력층에 피비린내 나는 내전이 터지고, 덮어 두면 황궁의 심장부가 썩어 들어간다. 오직 황제에게만 책임지는 이단심문소 대표 하이 로드로서 어떤 그림자 심판을 내릴 것인가.",
    choices: [
      {
        label: "[어콜라이트 경력 전용 · 지성 판정] 현장 요원 시절의 감각으로 삼중 위장 수사를 직접 지휘해 반박 불가한 물증을 확보한다",
        req: { anyPastCareers: ["inquisition_acolyte"] },
        check: { stat: "Int", diff: -20 },
        success: {
          text: "밑바닥 첩보전의 생리를 잊지 않은 치밀한 역공작 끝에 배후 주모자와 비밀 금고까지 통째로 적발했다. 동료 하이 로드는 창백한 얼굴로 보좌진을 스스로 내어 주며 영구적 정치 채무를 지게 되었다.",
          stats: { Int: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "함정 첩보가 섞여 있어 암살자의 역습을 받았으나, 로제트의 권위와 노련한 대처로 위기를 넘기고 핵심 증인을 확보했다.",
          wounds: -18,
          stats: { Int: 4, Inf: 3 }
        }
      },
      {
        label: "[권위 판정] 원로원 비공개 회의장에 로제트를 내려놓고 즉각 체포와 대오르도 합동 심문을 집행한다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "절대 권력의 상징인 이단심문관 로제트 앞에서 어떤 귀족 의석도 감히 방패를 들지 못했다. 황궁 내부의 썩은 뿌리가 단숨에 도려내지며, 심문소 대표 의석에 대한 공포와 경외가 극에 달했다.",
          stats: { Inf: 8, WP: 5, Fel: -2 },
          faith: 6
        },
        fail: {
          text: "타 하이 로드들의 연합 반발로 원로원 내 험악한 냉전이 벌어졌으나, 부패 보좌진 숙청만큼은 끝내 관철했다.",
          stats: { Inf: -3, WP: 5 }
        }
      },
      {
        label: "[교섭 판정] 증거를 공개하지 않고 비밀리에 동료 하이 로드와 독대해 막후 협상과 자진 숙청을 압박한다",
        check: { stat: "Fel", diff: -20 },
        success: {
          text: "테라의 안정을 해치지 않으면서도 혐의자를 조용히 제거하고, 결정적인 표결권을 손에 넣었다. 이단심문소의 그림자 권력이 원로원 깊숙이 뿌리내렸다.",
          stats: { Fel: 6, Inf: 7, Int: 4 }
        },
        fail: {
          text: "상대가 역으로 세 대오르도 내부의 청교도파·급진파 갈등을 들쑤시는 바람에 심문소 내부 단속에 적잖은 에너지를 쏟아야 했다.",
          stats: { Inf: -4, Int: 3 }
        }
      },
      {
        label: "[침묵의 감시] 즉각 타격을 보류하고 세 대오르도 요원들을 이중 배치해 더 큰 배후가 드러날 때까지 추적한다",
        effect: {
          text: "성급한 숙청 대신 냉철한 인내를 택했다. 눈에 보이지 않는 그물이 서서히 조여 오는 가운데 황궁의 질서는 겉보기엔 평온을 유지했다.",
          stats: { Int: 5, WP: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Inquisitorial Representative / Vaults of Terra: The Carrion Throne"
  },
  {
    id: "ev_s14_hl_fabgen_mars",
    title: "올림푸스 몬스의 협약 — 화성 조약 수호와 타이탄 배정권",
    category: "하이 로드 고유",
    once: true,
    req: {
      anyCareers: ["fabricator_general"],
      allTags: ["fabricator_general"]
    },
    reqLabel: "직군: 화성 파브리케이터-제너럴",
    weight: 38,
    text: "화성 올림푸스 몬스 성소의 거대한 누스피어 첨탑과 테라 황궁 의사당을 잇는 암호 통신망에 불꽃 같은 논쟁이 쏟아졌다. 세나토룸 임페리알리스 군사 의석들이 대성전 병력 손실을 이유로, 기계교 타이탄 군단과 포지 월드 생산 라인의 지휘권을 일시적으로 테라 사령부에 통합하자고 요구해 온 것이다. 이는 대성전 초창기 황제와 화성이 맺은 신성한 '화성 조약'의 근간을 흔드는 중대한 도전이다. 아뎁투스 메카니쿠스 전체를 통치하는 거대 성체 기계 사제로서 화성의 자주권과 제국의 생존을 어떻게 연산할 것인가.",
    choices: [
      {
        label: "[테크프리스트·스키타리 경력 전용 · 지성 판정] 현장 용광로와 전장의 실측 데이터를 누스피어에 투사해 독자적 타이탄 기동 효율을 입증한다",
        req: { anyPastCareers: ["skitarii", "tech_priest"] },
        check: { stat: "Int", diff: -20 },
        success: {
          text: "40만 줄에 달하는 실전 병참·전투 연산 앞에서는 테라 장성들도 반론을 꺼내지 못했다. 화성 조약의 신성불가침이 재확인되었고, 기계교 독자 지휘 아래 출격한 타이탄 군단이 전선을 압도했다.",
          stats: { Int: 8, Inf: 7, T: 4 }
        },
        fail: {
          text: "보수파 마고스들과 테라 관료 양측의 끝없는 수정 요구로 연산 코어가 과부하되었으나, 화성의 핵심 자치권만큼은 흔들리지 않았다.",
          stats: { Int: 4, Inf: 2 }
        }
      },
      {
        label: "[권위 판정] 화성 조약 파기 시 모든 제국 함선 수리와 플라즈마 코어 공급을 중단하겠다고 선언해 원로원을 압박한다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "제국의 모든 함대와 전차가 옴니시아의 사제들 손끝에 달려 있음을 냉혹히 일깨웠다. 테라 의석들은 즉시 통합 요구를 철회하고 화성에 막대한 STC 탐색 독점권을 양보했다.",
          stats: { Inf: 8, Int: 5, Fel: -3 }
        },
        fail: {
          text: "지나치게 강경한 통첩에 타 하이 로드들이 공동 전선을 펴며 일부 변경 포지 월드의 지원금이 삭감되었다.",
          stats: { Inf: -4, WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 타이탄 지휘권은 화성이 유지하되, 신형 리만 러스와 순양함 건조 할당량을 15퍼센트 증산하는 절충 조약을 맺는다",
        check: { stat: "Fel", diff: -18 },
        success: {
          text: "기계교로서는 보기 드문 유연한 외교 연산이었다. 화성의 독립을 지키면서도 제국 전체의 전력을 끌어올려 '옴니시아와 황제의 완벽한 조율자'로 칭송받았다.",
          stats: { Fel: 6, Int: 5, Inf: 6 }
        },
        fail: {
          text: "증산 할당을 맞추느라 화성 하부 용광로가 극한으로 가동되며 노심 과열 사고가 발생해 수습에 막대한 자원이 들었다.",
          wounds: -12,
          stats: { Int: 4, Inf: 2 }
        }
      },
      {
        label: "[이진법 유보 칙령] 화성 조약 원문 대조를 명목으로 심의를 5년 연장하고 전선에 필요한 타이탄만 선별 파견한다",
        effect: {
          text: "1만 년 된 기계교 의례 절차의 미로 속에 테라의 요구를 가두어 두면서 실질적 전선 지원은 놓치지 않았다. 화성의 붉은 깃발 아래 옴니시아의 질서가 굳건히 이어졌다.",
          stats: { Int: 5, Inf: 4, WP: 3 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Lexicanum: Fabricator-General & Treaty of Mars"
  },
  {
    id: "ev_s14_hl_admiral_fleet",
    title: "다섯 세그멘툼의 항로 — 보이드 전투함대 재배치 결단",
    category: "하이 로드 고유",
    once: true,
    req: { anyCareers: ["lord_high_admiral"] },
    reqLabel: "직군: 로드 하이 애드미럴",
    weight: 38,
    text: "테라 해군본부 대성도실의 허공에 다섯 세그멘툼의 보이드 항로와 수천 척의 전함·순양함 배치가 황금빛 점으로 떠 있다. 그런데 세그멘툼 옵스쿠루스의 핵심 보급 항로에 대규모 카오스 함대가 출몰한 것과 동시에, 세그멘툼 템페스투스의 공업 성계군에도 외계 약탈 함대가 쇄도하며 양쪽 모두 긴급 증원을 호소하고 나섰다. 배틀플릿 솔라의 예비 주력을 쪼개어 보내면 테라 방어선이 얇아지고, 한쪽을 택하면 다른 성역의 수십 개 행성이 보이드 암흑 속에 고립된다. 임페리얼 네이비 총사령관으로서 은하의 바다를 어떻게 가를 것인가.",
    choices: [
      {
        label: "[네이비 사관 경력 전용 · 민첩 판정] 일선 함교와 요격기 편대 시절의 항해 감각으로 비정규 워프 단축 항로를 개척해 양쪽을 기습 지원한다",
        req: { anyPastCareers: ["imperial_navy"] },
        check: { stat: "Ag", diff: -15 },
        success: {
          text: "위험을 무릅쓴 기동 항로 계산과 고속 순양함대의 파상 공세가 적 함대들의 예상을 완전히 깼다. 두 세그멘툼의 핵심 항로가 모두 지켜지며 테라 해군사상 최고의 기동전으로 기록되었다.",
          stats: { Ag: 6, Int: 6, Inf: 7 }
        },
        fail: {
          text: "험난한 워프 해류 속에서 선도 호위함대 일부가 손실되었으나, 주력 수송선단의 항로만은 가까스로 뚫어 냈다.",
          stats: { Ag: 3, Inf: -2, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 보급선과 포지 월드 연결 가치를 정밀 계산해 전략 요충지 하나에 주력 전투함대를 집중 투입한다",
        check: { stat: "Int", diff: -20 },
        success: {
          text: "냉혹하지만 정확한 전략 집중이 적 주력 함대를 결정적으로 섬멸했다. 승기를 잡은 전투함대가 곧바로 두 번째 전구로 회항해 연쇄 승리를 거두었다.",
          stats: { Int: 7, Inf: 6, WP: 4 }
        },
        fail: {
          text: "버려진 전구의 행성 총독들과 상업 길드가 원로원에 맹렬히 항의하며 정치적 타격을 입었으나, 제국 핵심 항로의 붕괴는 막았다.",
          stats: { Int: 4, Inf: -4 }
        }
      },
      {
        label: "[권위 판정] 차티스트 상선단과 로그 트레이더 왕조에 세나토룸 비상 전시 동원 협조령을 내려 보급 방어 공백을 메운다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "로드 하이 애드미럴의 전시 협조 칙령에 수백 척의 무장 상선과 개척 순양함이 호위망에 합류했다. 배틀플릿 솔라의 방벽을 한 치도 약화시키지 않고 위기를 돌파했다.",
          stats: { Inf: 7, Fel: 5, Int: 4 }
        },
        fail: {
          text: "상업 길드와 로그 트레이더 왕조들의 거센 반발과 항해 지연으로 손실이 커졌으나, 주력 전투함대만큼은 온전히 보전했다.",
          stats: { Inf: -3, Fel: -2, WP: 4 }
        }
      },
      {
        label: "[해군본부 표준 교리] 배틀플릿 솔라의 테라 방어선을 절대 우선시하고 현지 전투함대에 거점 방어전을 지시한다",
        effect: {
          text: "제국의 심장인 태양계가 무너지면 모든 항로도 의미를 잃는다. 냉철한 원칙 고수 속에 테라 궤도는 철옹성으로 남았고 현지 함대들도 끈질기게 버텨 냈다.",
          stats: { WP: 5, Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Lord High Admiral / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s14_hl_provost_lex",
    title: "렉스 임페리알리스 최고 집행령 — 원로원 사법 면책권 폐지와 성역 압송",
    category: "하이 로드 고유",
    once: true,
    req: { anyCareers: ["grand_provost_marshal"] },
    reqLabel: "직군: 그랜드 프로보스트 마셜",
    weight: 38,
    text: "테라 대법원 대요새의 강철 서고에 세그멘툼 내 가장 부유한 성역을 통치하는 섹터 로드와 그를 비호하는 테라 원로원 귀족파의 반역 및 십일조 은닉 증거가 산더미처럼 쌓였다. 귀족파는 사법 면책 특권을 방패 삼아 '지금 탄핵하면 성역 전체가 내전에 휘말린다'며 사건을 덮으라고 압박한다. 그러나 렉스 임페리알리스의 첫 조항은 명백하다. 황제의 법 위에 선 필멸자는 없으며, 법의 칼날이 망설이는 순간 제국의 질서는 무너진다.",
    choices: [
      {
        label: "[아르비테스 치안대 경력 전용 · 백병 판정] 현장 수사와 강습의 감각으로 테라 내 비호 귀족 거점을 직접 급습해 비밀 자금줄과 암호 장부를 압수한다",
        req: { anyPastCareers: ["arbites"] },
        check: { stat: "WS", diff: -15 },
        success: {
          text: "그랜드 프로보스트 마셜이 친히 법전을 낭독하며 테라 귀족 저택의 비밀 금고를 부수고 들어서자, 사설 경호대가 겁에 질려 무기를 내려놓았다. 확보된 물증과 함께 전 세그멘툼 동시 압송령이 발동되며 렉스 임페리알리스의 위엄이 은하에 울려 퍼졌다.",
          stats: { WS: 6, WP: 6, Inf: 8 }
        },
        fail: {
          text: "귀족 저택 비밀 경호대의 필사적인 저항 속에 부상을 입었으나, 끝내 비호 세력을 제압하고 십일조 은닉 장부와 압송 근거를 확보했다.",
          wounds: -20,
          stats: { WS: 4, WP: 5, Inf: 4 }
        }
      },
      {
        label: "[의지 판정] 원로원 귀족파의 사법 면책권 주장을 일축하고 최고 탄핵 영장을 발부해 전 세그멘툼 아르비테스 요새에 동시 압송을 명한다",
        check: { stat: "WP", diff: -20 },
        success: {
          text: "강철 같은 사법 집행령이 성역 30개 행성에서 동시에 발동되어 반란의 싹을 하루 만에 제압했다. 부패 총독과 비호 귀족들이 일괄 처결되며 제국법의 존엄이 우뚝 섰다.",
          stats: { WP: 7, Int: 5, Inf: 7 },
          faith: 6
        },
        fail: {
          text: "두 개 행성에서 총독 추종 세력이 무장 봉기를 일으켜 아르비테스 요새가 큰 피해를 입었으나, 결국 법의 심판은 집행되었다.",
          stats: { WP: 4, Inf: -3 }
        }
      },
      {
        label: "[지성 판정] 1만 년 치 제국법 판례와 십일조 법조항을 완벽히 논증해 원로원 비호 세력의 법적 방어막을 해체한다",
        check: { stat: "Int", diff: -20 },
        success: {
          text: "빈틈없는 법리 앞에 총독을 감싸던 귀족 의석마저 역으로 공범 혐의를 두려워하며 등을 돌렸다. 피 한 방울 흘리지 않고 합법적 파면과 재산 몰수를 완료했다.",
          stats: { Int: 7, Inf: 6, Fel: 4 }
        },
        fail: {
          text: "교묘한 관할권 이의 제기로 심리가 수년 지연되었으나, 철저한 봉쇄 감시로 추가 횡령을 완전히 차단했다.",
          stats: { Int: 4, Inf: -2 }
        }
      },
      {
        label: "[사법 계엄 선포] 총독의 통치권을 즉시 정지하고 현지 아르비테스 마셜에게 임시 행정을 대행시킨 뒤 정식 재판에 회부한다",
        effect: {
          text: "흔들리지 않는 절차와 냉엄한 법 집행 속에 성역의 혼란은 최소화되었다. 제국의 모든 통치자들은 그랜드 프로보스트 마셜의 눈을 결코 피할 수 없음을 다시 깨달았다.",
          stats: { WP: 5, Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Grand Provost Marshal / Adeptus Arbites / Enforcer (Shira Calpurnia)"
  },
  {
    id: "ev_s14_hl_admin_master",
    title: "서고 대륙의 분쟁 — 백만 행성 십일조 등급 전면 재평가",
    category: "하이 로드 고유",
    once: true,
    req: {
      anyCareers: ["master_of_administratum"]
    },
    reqLabel: "직군: 마스터 오브 디 아드미니스트라툼",
    weight: 38,
    text: "신성한 테라 대륙 하나를 덮은 아드미니스트라툼 중앙 서고 단지에서 세기를 건너뛴 거대한 부처 전쟁이 폭발했다. 제국의 수천 년 된 원본 기록을 수호하려는 역사 서고파와, 당장 전선 보급을 위해 낡은 기록소를 밀어내고 십일조 산정국을 증설하려는 실무파 국장들이 서고 구역 곳곳에서 서기관 무장 경비대까지 동원해 대치한 것이다. 동시에 백만 행성의 십일조 등급을 전면 재평가할 시점이 도래했으나, 관료 기구를 무리하게 흔들면 제국 행정 전체가 마비되고 방치하면 수백 성계의 세수 산정이 무너진다. 제국 행정장관으로서 펜 끝의 권력을 어떻게 휘두를 것인가.",
    choices: [
      {
        label: "[행정부 관료 경력 전용 · 지성 판정] 말단 서기관과 국장 시절의 현장 감각으로 고대 기록 보존과 십일조 등급 재산정을 분리하는 신편제안을 직접 설계한다",
        req: { anyPastCareers: ["administratum", "admin_departmento_head"] },
        check: { stat: "Int", diff: -18 },
        success: {
          text: "수십억 서기관 가운데 아무도 풀지 못하던 부처 권한 중첩과 분류 부호 충돌을 단숨에 정리했다. 고대 서고는 보존되면서도 전선 성계 수백 곳의 십일조 등급이 정확히 재산정되어 전설적인 행정 개혁으로 기록되었다.",
          stats: { Int: 8, Inf: 7, Fel: 4 }
        },
        fail: {
          text: "서고 대륙 지하 구역의 붕괴 위험과 서기관 길드 간의 파업 소동을 겪었으나, 핵심 십일조 등급 대장만큼은 끝내 바로잡았다.",
          wounds: -10,
          stats: { Int: 4, Inf: 3 }
        }
      },
      {
        label: "[권위 판정] 양 파벌의 데파르트멘토 국장들을 전원 소집해 서고 대륙 계엄령과 십일조 교차 감사국 신설 칙령을 강행한다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "수백 년 된 기득권 부처들의 저항을 압도적 권위로 분쇄하고 십일조 교차 감사망을 구축했다. 아드미니스트라툼의 행정 지연이 눈에 띄게 줄며 세나토룸 의장격 의석의 위상이 드높아졌다.",
          stats: { Inf: 8, Int: 6, WP: 4 }
        },
        fail: {
          text: "급격한 조직 개편 여파로 세 개 서브섹터의 십일조 징수가 일시 마비되어 원로원의 거센 질타를 받았다.",
          stats: { Inf: -5, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 역사 서고파 원로들과 실무파 국장단, 로지스 기계 사제들을 중재해 단계적 서고 이전과 등급 재평가 위원회를 출범시킨다",
        check: { stat: "Fel", diff: -18 },
        success: {
          text: "관료 집단의 자존심을 건드리지 않으면서도 자발적인 장부 정비 경쟁을 이끌어 냈다. 수십 개 성계의 누락된 십일조 등급이 정리되며 제국 국고가 크게 충실해졌다.",
          stats: { Fel: 6, Int: 5, Inf: 6 }
        },
        fail: {
          text: "위원회 자체에 또 다른 서기관 부서가 덧붙으며 속도는 더뎠지만, 핵심 분쟁 구역의 무력 충돌만은 깔끔히 진정시켰다.",
          stats: { Fel: 3, Int: 3 }
        }
      },
      {
        label: "[행정장관의 직권 중재] 거대한 관료 체계의 마비를 피하기 위해 양 파벌의 관할 경계를 직권 획정하고 핵심 전선 성계의 십일조 등급만 우선 조정한다",
        effect: {
          text: "백만 행성을 굴리는 톱니바퀴를 멈추지 않는 것이 최우선이었다. 냉철한 직권 중재로 서고 대륙의 유혈 사태를 막아 내며 제국의 심장 박동을 안정시켰다.",
          stats: { Int: 5, Inf: 4, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Master of the Administratum / Adeptus Administratum / Watchers of the Throne"
  },
  {
    id: "ev_s14_hl_astro_master",
    title: "흑요석 첨탑의 비명 — 검은 함선 증파와 황금 옥좌의 영혼 십일조",
    category: "하이 로드 고유",
    once: true,
    req: { anyCareers: ["master_of_astronomicum"] },
    reqLabel: "직군: 아스트라 텔레파티카 총관",
    weight: 38,
    text: "테라 흑요석 첨탑 꼭대기의 아스트로패스 성가대가 피눈물을 흘리며 동시에 무릎을 꿇었다. 워프 폭풍의 격화로 성간 통신망이 끊어질 위기에 놓인 데다, 하루 천 명의 사이커 영혼을 바쳐 유지되는 황금 옥좌의 수요와 아스트로노미칸 성가대로 보낼 인력 할당까지 동시에 급증해 예비 수용소가 위험 수위까지 줄어든 것이다. 침묵의 자매들과 함께 은하를 누비는 검은 함선 함대를 대대적으로 증파하면 각 행성의 반발과 공포가 극에 달하고, 늦추면 황금 옥좌와 성간 통신망이 함께 흔들려 백만 행성이 영원한 암흑에 잠긴다. 아뎁투스 아스트라 텔레파티카 총관으로서 어떤 잔혹한 결단을 내릴 것인가.",
    choices: [
      {
        label: "[생션드 사이커 경력 전용 · 의지 판정] 검은 함선 선창의 공포와 영혼 결속의 고통을 기억하며, 직접 대성가대를 조율해 소모율을 낮추고 선별 체계를 개선한다",
        req: { anyPastCareers: ["sanctioned_psyker"] },
        check: { stat: "WP", diff: -20 },
        success: {
          text: "스스로 불타는 황제의 빛을 견뎌 냈던 경험이 기적 같은 공명 조율로 이어졌다. 성간 통신망이 한층 선명해지고 스콜라스티카 사이카나의 불필요한 사이커 소모율까지 크게 줄여 냈다.",
          stats: { WP: 8, Int: 6, Inf: 6 },
          faith: 8,
          corruption: -6
        },
        fail: {
          text: "거대한 사이킥 공명의 역류가 정신을 강타해 피를 토했으나, 끝내 한 점의 타락도 허락하지 않고 성가대의 동요를 진정시켰다.",
          wounds: -20,
          stats: { WP: 5, Int: 3 }
        }
      },
      {
        label: "[권위 판정] 테라 원로원과 침묵의 자매들에 비상 협력을 요청해 검은 함선 함대를 즉각 두 배로 증파한다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "황금 옥좌가 꺼지는 공포 앞에서는 어떤 총독도 저항하지 못했다. 증파된 검은 함선들이 은하 전역에서 사이커 십일조를 신속히 수송해 제국의 등불과 통신망을 철통같이 지켜 냈다.",
          stats: { Inf: 8, WP: 5, Int: 4 }
        },
        fail: {
          text: "과도한 징발에 변방 성계 여러 곳에서 사이커 반란과 은닉 사건이 터져 수습에 큰 부담이 따랐다.",
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 스콜라스티카 사이카나 훈련 과정을 개편해 생환율과 전투·통신 사이커 분류 효율을 극대화한다",
        check: { stat: "Int", diff: -20 },
        success: {
          text: "무작위 소모 대신 적성별 정밀 배치를 도입해 아스트로패스 중계망의 복구 속도와 생존율을 모두 끌어올렸다. 흑요석 첨탑 원로들이 경외 속에 머리를 숙였다.",
          stats: { Int: 7, WP: 5, Inf: 6 }
        },
        fail: {
          text: "보수파 성가대장들의 교리 반발과 워프 간섭이 겹쳐 개편 성과가 절반에 그쳤으나, 최악의 통신 단절은 막아 냈다.",
          stats: { Int: 4, WP: 3 }
        }
      },
      {
        label: "[총관의 엄명] 모든 사사로운 연민을 끊고 기존 검은 함선 항로의 징발 주기를 앞당겨 황금 옥좌의 영혼 십일조를 최우선으로 사수한다",
        effect: {
          text: "하루 천 명의 영혼이 황금 옥좌를 떠받치며 불타오르는 잔혹한 진실 위에서 인류제국은 또 하루를 살아남는다. 검은 함선의 깃발은 오늘도 차가운 공허를 가로지르며 제국의 신경망을 이었다.",
          stats: { WP: 6, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Master of the Adeptus Astra Telepathica / Black Ships / Watchers of the Throne"
  }
);
