// 분기 사건 — 직군 계열: 제국 민·관·치안·해군·우주(노동자 · 갱단 · 아르비테스 · 아드미니스트라툼 · 네이비 · 로그 트레이더 · 제국 부조리)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_administratum_typo",
    title: "양피지 위 숫자 하나의 대참사",
    category: "행정",
    req: {
      minAge: 18,
      excludeTags: ["astartes", "custodes", "grey_knight", "sororitas", "heretic"],
      or: [{ anyCareers: ["administratum", "militarum_officer", "inquisition_acolyte", "inquisitor"] }, { stats: { Int: 44 }, anyTags: ["citizen", "noble"] }]
    },
    reqLabel: "관료·장교·심문소 또는 지성 44+ 시민/귀족",
    weight: 15,
    text: "십일조 장부를 검수하던 중, 30년 전 선임 서기관의 잉크 번짐 때문에 인접 아그리 월드의 식량 할당량이 10배로 잘못 청구되어 반란이 임박했다는 사실을 발견했다!",
    choices: [
      {
        label: "[지성 판정] 14단계 관료 절차와 78개의 도장을 밤새 돌파해 오류를 바로잡는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "수억 명의 기아와 내전을 펜촉 하나로 막아 냈다! 고위 아뎁트가 그대의 유능함을 극찬했다.",
          stats: { Int: 6, Inf: 10, Fel: 3 }
        },
        fail: {
          text: "과로로 쓰러졌고 서류는 결국 '재검토 보류(예상 대기 42년)' 서랍에 처박혔다.",
          wounds: -12,
          stats: { WP: 2 }
        }
      },
      {
        label: "전임자의 실수를 덮어 두고 내 책상 위로 불똥이 튀지 않게 은폐한다",
        effect: {
          text: "행성 하나가 폭동에 휩싸였다는 소식이 3년 뒤 들려왔지만, 그대의 평온한 출세길엔 흠집이 없었다.",
          stats: { Inf: 4 },
          faith: -5,
          corruption: 4
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_navy_pirate_battle",
    title: "소행성대의 교전 — 드루카리 해적선 기습",
    category: "우주",
    req: { minAge: 16, or: [{ anyCareers: ["imperial_navy", "rogue_trader"] }, { anyTags: ["voidborn"] }] },
    reqLabel: "임페리얼 네이비 / 로그 트레이더 / 보이드본",
    weight: 16,
    text: "근거리 오스펙스에 날카로운 가시 모양의 드루카리(다크 엘다) 습격선 편대가 포착되었다! 붙잡히면 죽음보다 끔찍한 코모라의 노예 신세다.",
    choices: [
      {
        label: "[사격 판정] 랜스 포대와 매크로 캐논의 일제 사격으로 적 기함을 격침한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "교묘한 기동을 예측한 포격이 적 순양함을 두 동강 냈다! 성계 함대에 명성이 떨쳤다.",
          stats: { BS: 6, Int: 4, Inf: 7 }
        },
        fail: {
          text: "적 강습 포드가 갑판을 뚫고 들어와 백병전 끝에 큰 부상을 입었다.",
          wounds: -26,
          stats: { WS: 3 }
        }
      },
      {
        label: "[민첩 판정] 급격한 선체 기동으로 소행성대 방어선 뒤로 빠져나간다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "환상적인 항해술로 드루카리 추격을 따돌리고 화물과 승무원을 온전히 지켰다.",
          stats: { Ag: 6, Int: 3, Inf: 5 }
        },
        fail: {
          text: "선체 외벽이 찢기며 감압 사고에 휘말려 다쳤다.",
          wounds: -20
        }
      }
    ],
    source: "Battlefleet Gothic / Rogue Trader"
  },
  {
    id: "ev_arbites_riot",
    title: "배급 축소와 하층 구역 대폭동",
    category: "치안",
    req: { minAge: 16, excludeTags: ["astartes", "custodes", "grey_knight"], or: [{ anyCareers: ["arbites", "pdf_trooper", "militarum_officer"] }, { stats: { Inf: 42 } }] },
    reqLabel: "아르비테스 / PDF / 장교 또는 권위 42+ (필멸자)",
    weight: 14,
    text: "십일조 증액으로 시체 녹말 배급이 반 토막 나자 분노한 노동자 수만 명이 총독궁으로 몰려들었다. 군중 속에는 정체불명의 이단 선동가가 섞여 있다는 첩보가 있다.",
    choices: [
      {
        label: "[이단심문관/커미사르 전용] 광장 연단에 올라 배후 컬트 선동가를 즉석 색출·처단해 폭동을 5분 만에 잠재운다",
        req: { anyTags: ["inquisitor", "commissar", "lord_commissar"] },
        effect: {
          text: "단 한 발의 볼트 탄환이 선동가의 가면을 꿰뚫자 군중이 일제히 무릎을 꿇었다! 압도적 위엄으로 사태를 종결했다.",
          stats: { WP: 5, Inf: 8 }
        }
      },
      {
        label: "[교섭 판정] 선동가만 정확히 색출해 체포하고 비상 식량을 풀어 민심을 달랜다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "최소한의 유혈로 폭동을 가라앉히고 배후의 카오스 세포까지 일망타진했다!",
          stats: { Fel: 6, Int: 4, Inf: 8 }
        },
        fail: {
          text: "군중의 투석과 화염병에 휘말려 부상을 입고 체면을 구겼다.",
          wounds: -18,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[백병 판정] 제국법(Lex Imperialis)의 이름으로 무자비하게 진압 작전을 감행한다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "쇼크 마울과 샷건의 벽 앞에 폭동은 3시간 만에 진압되었다. 냉혹한 질서가 회복되었다.",
          stats: { WS: 5, WP: 4, Inf: 5, Fel: -3 }
        },
        fail: {
          text: "은신해 있던 무장 갱단의 반격에 중상을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_job_menial_press",
    title: "매뉴팩토룸의 용광로 사고 — '기계부터 구해라!'",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["menial_worker"] },
    reqLabel: "직업: 행성 노동자 · 길드원",
    weight: 24,
    text: "탄약 조립 라인의 압력 밸브가 터지며 뜨거운 쇳물이 쏟아졌다! 동료 둘이 쇳물 앞에 고립되었지만, 공장 감독관과 기계교 사제가 고함을 지른다. '멍청이들아, 사람보다 성스러운 4번 프레스 기계령부터 냉각시켜! 노동자는 내일 다시 뽑으면 된다!'",
    choices: [
      {
        label: "[민첩 판정] 감독관의 명령을 무시하고 고립된 동료들을 먼저 끌어낸다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "동료 둘을 살려 냈지만 기계가 손상되었다는 죄목으로 한 달 치 배급이 삭감되고 태형을 맞았다. 그래도 동료들의 눈빛이 달라졌다.",
          stats: { Ag: 4, Fel: 6, WP: 4 },
          wounds: -12
        },
        fail: {
          text: "쇳물에 화상을 입고 동료도 구하지 못한 채 작업 태만으로 매질까지 당했다.",
          wounds: -28
        }
      },
      {
        label: "차갑게 명령에 복종해 냉각 밸브를 돌려 성스러운 기계령을 먼저 지킨다",
        effect: {
          text: "동료들의 비명이 멎은 뒤, 기계교 사제가 그대의 '올바른 우선순위'를 치하하며 반장 직책과 약간의 권위를 내렸다.",
          stats: { Int: 4, Inf: 6, Fel: -4 },
          faith: -3
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_job_arbites_governor",
    title: "제국법(Lex Imperialis)의 저울 — 총독 아들의 폭주",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["arbites"] },
    reqLabel: "직업: 아뎁투스 아르비테스",
    weight: 24,
    text: "만취한 행성 총독의 장남이 고급 반중력 차량으로 십일조 노동자 행렬을 들이받아 40명이 즉사했다! 총독은 막대한 금괴를 보내며 사건 무마를 요구하고 있다. 하지만 죽은 자들은 '황제의 십일조 생산 자산'이었다.",
    choices: [
      {
        label: "[의지 판정] 총독궁 문을 부수고 들어가 '제국 십일조 자산 훼손죄'로 아들을 체포한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "제국법은 행성 총독 위에도 군림한다! 하이 마샬이 그대의 철두철미한 법 집행을 극찬했다.",
          stats: { WP: 6, Inf: 10, WS: 4 }
        },
        fail: {
          text: "총독 사병대와의 총격전에서 중상을 입었지만 끝내 영장을 집행했다.",
          wounds: -24,
          stats: { WP: 5, Inf: 6 }
        }
      },
      {
        label: "사망자를 '노후 자산 자연 손실'로 처리하고 총독의 정치적 후원을 받는다",
        effect: {
          text: "총독 가문의 막대한 후원금이 들어왔지만, 제국법의 수호자라는 양심에는 검은 얼룩이 졌다.",
          stats: { Inf: 8, Fel: 4 },
          corruption: 10,
          faith: -6
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_job_navy_mutiny",
    title: "임페리얼 네이비 — 하층 포갑판 노예 선원의 반란",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["imperial_navy"] },
    reqLabel: "직업: 임페리얼 네이비",
    weight: 24,
    text: "18개월째 항구 없는 성간 항해에 내몰린 하층 포갑판 강제 징발 노역자 2,000명이 쇠사슬을 끊고 무기고를 점거했다! 함장은 차갑게 말한다. '해병대를 투입할 필요 없소. 4번 구역의 공기 배출 레버만 당기시오.'",
    choices: [
      {
        label: "[백병/교섭] 진공 사살 대신 직접 해병대를 이끌고 진입해 주동자만 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "유혈을 최소화하고 폭동을 진압했다! 살아남은 노역자들 덕분에 다음 전투에서 함포 장전 속도가 오히려 빨라졌다.",
          stats: { WS: 5, Fel: 6, Inf: 5 }
        },
        fail: {
          text: "분노한 노역자들의 렌치 공격에 큰 부상을 입고 간신히 진압을 마쳤다.",
          wounds: -24,
          stats: { WS: 3 }
        }
      },
      {
        label: "함장의 명령대로 4번 구역의 격벽을 닫고 우주 공간으로 공기를 배출한다",
        effect: {
          text: "30초 만에 반란이 끝났다. 새 노역자는 다음 하이브 월드 정박 때 다시 징발하면 그만이다. 냉혹한 효율이 함대의 신임을 얻었다.",
          stats: { Inf: 8, WP: 3, Fel: -5 },
          faith: -3
        }
      }
    ],
    source: "Battlefleet Gothic / Rogue Trader"
  },
  {
    id: "ev_absurd_medicae_triage",
    title: "야전 의무소의 냉혹한 분류 — '약은 장교용, 병사는 기도뿐'",
    category: "부조리",
    req: { minAge: 15, excludeTags: ["astartes", "custodes", "noble", "inquisitor", "rogue_trader", "magos"] },
    reqLabel: "일반 시민 · 하급 군인",
    weight: 16,
    text: "고열과 부상으로 제국 메디케아(의무소)에 실려 갔다. 의무관은 차트를 훑더니 덤덤히 말한다. '장교·귀족 전용 항생제는 재고가 부족하네. 하급 시민용 표준 처방은 진통제 반 알과 《황제 치유 기도문》 10회 암송이야. 아니면 바로 서비터 부서로 넘길까?'",
    choices: [
      {
        label: "[강인 판정] 치욕과 고통을 악물고 진통제 반 알만으로 자력 회복에 버틴다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "지독한 생존력으로 병마를 이겨 내고 멀쩡히 걸어 나왔다! 의무관마저 혀를 내둘렀다.",
          stats: { T: 5, WP: 3 },
          wounds: 10
        },
        fail: {
          text: "제대로 된 치료를 받지 못해 오랜 후유증에 시달렸다.",
          wounds: -18
        }
      },
      {
        label: "[교섭 판정] 비상용 담배와 암시장 화폐를 몰래 찔러 넣어 정상 약품을 얻어낸다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "의무관이 슬쩍 웃으며 장교용 정제 항생제를 꺼내 주었다. 제국을 굴리는 진짜 기름은 뇌물이다.",
          stats: { Fel: 4, Inf: -2 },
          wounds: 18
        },
        fail: {
          text: "뇌물이 적다며 면박만 당하고 복도 끝으로 밀려났다.",
          wounds: -12
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_absurd_servitor_sentence",
    title: "서비터 전환 재판 — 이웃의 사소한 죄",
    category: "부조리",
    req: { minAge: 15, excludeTags: ["astartes", "custodes"] },
    reqLabel: "15세+ (초인 제외)",
    weight: 16,
    text: "평소 알고 지내던 성실한 기술공이 '배급 빵 두 덩이 절도 및 작업 7분 지각' 죄목으로 기계교 서비터 전환형(뇌엽 절제 후 영구 기계 노예화)을 선고받았다. 탄원서를 낼 마지막 10분이 남아 있다.",
    choices: [
      {
        label: "[권위/교섭 판정] 재판관 앞에 나서 작업장 핵심 인력임을 설득해 벌금형으로 감형시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "기적적으로 서비터 개조 명령이 철회되었다! 구역 사람들 사이에서 그대의 덕망이 높아졌다.",
          stats: { Fel: 5, Inf: 5, WP: 3 }
        },
        fail: {
          text: "재판관이 '범죄자 두둔은 동조 혐의'라며 싸늘하게 경고해 입을 다물 수밖에 없었다.",
          stats: { Inf: -4, WP: 2 }
        }
      },
      {
        label: "제국의 법정은 감정을 용납하지 않는다. 다음 차례가 내가 되지 않게 고개를 돌린다",
        effect: {
          text: "일주일 뒤 공장에 새로 배치된 문지기 서비터가 텅 빈 눈으로 그대를 향해 자동문을 열어 주었다.",
          stats: { WP: 2 },
          faith: -3
        }
      }
    ],
    source: "Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_absurd_upper_lottery",
    title: "10만 분의 1의 희망 — '상층 첨탑 이주권' 추첨 축제",
    category: "부조리",
    req: { minAge: 14, anyWorldTags: ["hive", "industrial", "civilised", "terra"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    reqLabel: "도시/하이브 일반 시민",
    weight: 15,
    text: "행성 총독부가 하층민의 불만을 달래기 위해 '모범 시민 1명에게 상층 첨탑 이주권 지급' 추첨을 열었다! 하지만 소문에 따르면 당첨자는 이미 총독 친인척으로 내정되어 있거나, 실은 제국 해군 징발함으로 보낸다는 흉흉한 이야기도 돈다.",
    choices: [
      {
        label: "[지성 판정] 공고문 깨알 약관을 분석해 함정이 있는지 확인한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "역시나 하단 0.5mm 글씨에 '당첨자는 궤도 군수선 종신 봉사 영광 부여'라고 적혀 있었다! 함정을 피해 주변에 귀띔했다.",
          stats: { Int: 5, Fel: 4 }
        },
        fail: {
          text: "속는 셈 치고 응모했다가 낙첨되며 신청 수수료만 날렸다.",
          stats: { Inf: -2 }
        }
      },
      {
        label: "황제께서 굽어살피시리라 믿고 당당히 응모함에 이름을 넣는다",
        check: { stat: "WP", diff: -15 },
        success: {
          text: "뜻밖에도 진짜 소액 장려금과 작업장 반장 표창에 당첨되어 소소한 행운을 누렸다!",
          stats: { Inf: 6, Fel: 3 },
          wounds: 8
        },
        fail: {
          text: "당첨은 고사하고 응모자 명단이 세무국에 넘어가 추가 십일조 고지서만 날아왔다.",
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Warhammer Crime / Necromunda"
  },
  {
    id: "ev_absurd_pension_receipt",
    title: "제국 군부의 '120년 뒤 연금 지급 영수증'",
    category: "부조리",
    req: { minAge: 24, anyTags: ["militarum", "navy", "arbites", "administratum"] },
    reqLabel: "24세+ · 군인 / 해군 / 치안대 / 관료",
    weight: 15,
    text: "오랜 복무 공로로 아드미니스트라툼 재무국에서 '명예 공로 연금 증서'가 도착했다. 기쁜 마음으로 열어 보니 '현재 대기 순번 4억 1,200만 번, 예상 수령 시점 124년 후 (본인 사망 시 영수증 자동 말소)'라고 적혀 있다.",
    choices: [
      {
        label: "[교섭 판정] 재무 서기관에게 훈장과 언변으로 매달려 당장 쓸 수 있는 현물 보급표로 맞바꾼다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "끈질긴 협상 끝에 고급 군화와 아마섹 한 상자, 약간의 권위 보증서를 받아 내는 데 성공했다!",
          stats: { Fel: 4, Inf: 5 },
          wounds: 8
        },
        fail: {
          text: "서기관이 '불경한 재촉'이라며 대기 순번을 6억 번대로 밀어 버렸다.",
          stats: { WP: 2 }
        }
      },
      {
        label: "헛웃음을 삼키며 벽에 액자로 걸어 두고 제국의 유머 감각을 되새긴다",
        effect: {
          text: "동료들이 증서를 보며 폭소를 터뜨렸다. 이 암울한 제국에서 웃음마저 없다면 미쳐 버릴 것이다.",
          stats: { WP: 4, Fel: 2 }
        }
      }
    ],
    source: "Astra Militarum / Imperial Bureaucracy Lore"
  },
  {
    id: "ev_rogue_trader_uncharted",
    title: "미지의 성계 — 황제의 지도에 없는 고대 문명",
    category: "탐험",
    req: { anyCareers: ["rogue_trader", "imperial_navy"] },
    reqLabel: "로그 트레이더 / 임페리얼 네이비",
    weight: 24,
    text: "제국 성도 바깥 헤일로 스타즈(Halo Stars) 경계에서 정체불명의 수정 도시가 남아 있는 무인 행성을 발견했다. 아키오테크 보물이 가득할 수도, 고대 외계 저주가 잠들어 있을 수도 있다.",
    choices: [
      {
        label: "[지성 판정] 정밀 오스펙스 탐사 후 무장 정찰대와 함께 직접 보물 창고에 강하한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 인류 식민지 시절의 순금 데이터 코어와 희귀 보석을 가득 싣고 귀환했다! 가문의 부가 배로 불어났다.",
          stats: { Inf: 12, Int: 5, Fel: 4 }
        },
        fail: {
          text: "고대 방어 드론과 정신 오염 장치에 휘말려 큰 손실을 입고 급히 이륙했다.",
          wounds: -24,
          corruption: 8
        }
      },
      {
        label: "위험한 미지의 별이다. 좌표만 기록해 제국 해군과 기계교에 비싸게 팔아넘긴다",
        effect: {
          text: "안전하게 탐색 좌표 정보료만 두둑이 챙겼다. 현명한 선장은 죽지 않는다.",
          stats: { Inf: 6, Int: 3 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook"
  },
  {
    id: "ev_admin_paper_avalanche",
    title: "아드미니스트라툼의 물리적 재앙 — '서류 산사태'",
    category: "부조리",
    req: { anyCareers: ["administratum"] },
    reqLabel: "직업: 아드미니스트라툼 관료",
    weight: 24,
    text: "100년째 쌓아 올린 높이 20미터짜리 세금 장부 탑이 진동을 견디지 못하고 무너져 내렸다! 수십만 장의 양피지 눈사태 속에 하급 서기관 셋이 파묻혔다.",
    choices: [
      {
        label: "[민첩 판정] 몸을 던져 매몰된 동료들을 끌어내고 흩어진 문서를 수습한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "동료들을 무사히 구출했다! 다만 상관은 사람보다 '300년 전 밀가루 영수증 분실'에 더 화를 냈다.",
          stats: { Ag: 4, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "무거운 철제 서류함에 발목이 깔려 한 달간 목발을 짚었다.",
          wounds: -18
        }
      },
      {
        label: "[지성 판정] 엉망이 된 서류더미를 36시간 만에 완벽히 재분류해 승진 발판으로 삼는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "경이로운 문서 정리 속도에 수석 서기관이 감탄하며 상급 직위를 내렸다!",
          stats: { Int: 6, Inf: 8 },
          wounds: -8
        },
        fail: {
          text: "철야 과로로 쓰러져 의무실 신세를 졌다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_career_menial_guild",
    title: "행성 노동자 · 길드원 — 작업반장 자리와 배급권 암투",
    category: "직군 고유",
    req: { anyCareers: ["menial_worker"] },
    reqLabel: "직군: 행성 노동자·길드원",
    weight: 24,
    text: "공장 4교대 작업반장이 프레스 사고로 팔을 잃고 퇴출되자 그 자리가 비었다. 길드 감독은 '누구든 동료들의 불평불만 명단을 바치거나 생산 할당량을 140% 달성하면 반장 완장을 주겠다'고 공언했다.",
    choices: [
      {
        label: "[강인 판정] 피를 토하는 18시간 연속 작업으로 순수하게 할당량 140%를 돌파한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "동료들의 존경과 길드의 인정을 모두 거머쥐고 작업반장으로 승진했다! 깨끗한 식량 배급과 작은 인맥이 생겼다.",
          stats: { T: 5, Inf: 6, Fel: 4 },
          wounds: -6
        },
        fail: {
          text: "과로로 컨베이어 벨트 옆에 쓰러져 사흘간 임금을 몰수당했다.",
          wounds: -16,
          stats: { T: 2 }
        }
      },
      {
        label: "[교섭 판정] 불만 세력을 밀고하는 대신, 길드 감독에게 효율 개선안을 제안해 타협한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "기계 마모를 줄이면서 생산량을 늘리는 안이 채택되어 서무 감독관 보좌로 발탁되었다!",
          stats: { Int: 5, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "'주제넘은 일꾼이 감히 기계 공정을 논하느냐'며 뺨을 맞고 석탄 창고로 좌천되었다.",
          wounds: -10,
          stats: { Inf: -3 }
        }
      },
      {
        label: "출세 욕심을 접고 동료들과 조용히 몫을 나눠 가지며 살아남는 데 집중한다",
        effect: {
          text: "권력은 얻지 못했으나 힘든 날 서로 빵을 나눠 줄 든든한 작업반 동료들을 얻었다.",
          stats: { Fel: 3, T: 2 },
          wounds: 5
        }
      }
    ],
    source: "Imperium Maledictum / Hive World Labor Lore"
  },
  {
    id: "ev_career_ganger_turf",
    title: "언더하이브 갱단원 — 고대 아키오테크 밀수 화물 쟁탈전",
    category: "직군 고유",
    req: { anyCareers: ["underhive_ganger"] },
    reqLabel: "직군: 언더하이브 갱단원",
    weight: 26,
    text: "폐쇄된 하층 배수관 아래에서 황금빛 에너지 셀이 달린 고대 아키오테크 상자가 발견되었다! 적대 갱단 20여 명이 샷건과 도끼를 들고 몰려오고 있으며, 저편에서는 아르비테스 순찰대의 사이렌 소리마저 울려 퍼진다.",
    choices: [
      {
        label: "[민첩 판정] 적대 갱단과 치안대 사이에 유탄을 던져 혼전을 유도하고 상자만 챙겨 튄다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "완벽한 어부지리! 암시장 거상에게 아키오테크를 넘겨 막대한 자금과 하층 구역의 명성을 거머쥐었다!",
          stats: { Ag: 5, Inf: 7, Int: 3 }
        },
        fail: {
          text: "도주로가 막혀 샷건 파편을 어깨에 맞고 빈손으로 하수구로 기어 도망쳤다.",
          wounds: -20,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[백병 판정] 정면으로 들이받아 적 갱단 두목을 꺾고 이 구역의 패권을 차지한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "피투성이 혈투 끝에 하층 3개 구역의 지배권을 차지했다! 공포와 존경이 동시에 뒤따른다.",
          stats: { WS: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "수적 열세에 밀려 쓰러졌다가 겨우 동료들의 부축으로 목숨만 건졌다.",
          wounds: -24,
          stats: { T: 3 }
        }
      },
      {
        label: "위험한 물건에 손을 떼고 안전하게 본거지로 철수한다",
        effect: {
          text: "언더하이브에서 오래 사는 비결은 욕심을 버릴 때를 아는 것이다.",
          stats: { Int: 3, Ag: 2 }
        }
      }
    ],
    source: "Necromunda: Underhive / Dark Heresy"
  },
  {
    id: "ev_career_navy_boarding",
    title: "임페리얼 네이비 — 워프 출구 앞 해적 강습정 방어전",
    category: "직군 고유",
    req: { anyCareers: ["imperial_navy"] },
    reqLabel: "직군: 임페리얼 네이비",
    weight: 26,
    text: "순양함이 워프에서 빠져나와 겔러 필드를 끄는 바로 그 순간, 소행성대 뒤에 숨어 있던 드루카리 해적 강습정 세 척이 선체 측면에 강제 도킹했다! 기관실과 함교 중 어느 쪽을 먼저 막아야 할지 단 몇 초 안에 결단해야 한다.",
    choices: [
      {
        label: "[민첩/사격 판정] 퓨리 요격기 편대를 긴급 발진시켜 적 모함의 엔진을 먼저 찢어 놓는다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "화려한 무중력 기동으로 외계 약탈선을 격침했다! 해군 제독이 직접 은빛 날개 훈장을 달아 주었다.",
          stats: { Ag: 6, BS: 5, Inf: 6 }
        },
        fail: {
          text: "외계 다크 랜스에 기체 날개가 녹아내려 비상 탈출 포드로 간신히 생환했다.",
          wounds: -20,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[백병 판정] 해군 육전대와 함께 샷건을 들고 기관실 격벽에서 백병전으로 적을 밀어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "좁은 통로에서 압도적인 산탄 화력으로 해적들을 진공 우주로 날려 버렸다! 선원들의 사기가 하늘을 찔렀다.",
          stats: { WS: 6, T: 4, Fel: 4 }
        },
        fail: {
          text: "독침 탄환에 팔을 맞고 쓰러졌으나 격벽 폐쇄 레버를 당겨 기관실만은 지켜 냈다.",
          wounds: -22,
          stats: { WP: 4 }
        }
      },
      {
        label: "침입 구획 전체의 대기압을 강제 배출해 외계인들을 우주로 쓸어 버린다",
        effect: {
          text: "그 구획에 있던 하급 선원 40명도 함께 희생되었으나, 순양함과 승무원 수만 명은 무사했다. 이것이 임페리얼 네이비의 냉혹한 계산이다.",
          stats: { Int: 5, WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Battlefleet Gothic / Execution Hour"
  },
  {
    id: "ev_career_arbites_tithe",
    title: "아뎁투스 아르비테스 — 십일조 체납 행성 총독궁 강제 진입",
    category: "직군 고유",
    req: { anyCareers: ["arbites"] },
    reqLabel: "직군: 아뎁투스 아르비테스",
    weight: 26,
    text: "행성 총독이 사치에 빠져 3년째 제국 십일조 곡물과 병력 납부를 지연시키고 있다. 행성 경찰들은 총독 편에 서서 길을 막았지만, 제국법(Lex Imperialis) 아래 행성 총독이라 해도 반역자일 뿐이다.",
    choices: [
      {
        label: "[백병/위압 판정] 쇼크 마울과 컴뱃 샷건을 장전하고 아르비테스 장갑차로 총독궁 정문을 부순다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'제국법의 이름으로 체포한다!' 사병 부대를 순식간에 진압하고 총독을 공개 처형했다. 제국 치안대의 절대 권위가 행성 전역에 각인되었다!",
          stats: { WS: 5, BS: 4, Inf: 8, WP: 4 }
        },
        fail: {
          text: "총독 사병대의 중화기 매복에 장갑차가 대파되어 중상을 입었으나, 결국 궤도 증원군이 내려와 총독을 끌어냈다.",
          wounds: -22,
          stats: { T: 4, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 총독의 비밀 계좌와 밀수 장부를 먼저 압수해 귀족 의회가 스스로 총독을 내치게 만든다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "피 한 방울 흘리지 않고 십일조 전액을 회수하고 부패 관료 일당을 일망타진했다!",
          stats: { Int: 6, Inf: 7, Fel: 4 }
        },
        fail: {
          text: "장부 일부가 소각되어 증거가 부족해졌고, 결국 지루한 시가전 진압으로 넘어갔다.",
          wounds: -12,
          stats: { Int: 2 }
        }
      }
    ],
    source: "Enforcer: Shira Calpurnia / Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_career_admin_munitorum",
    title: "아드미니스트라툼 — 데파트멘토 무니토룸 전시 징발 분쟁",
    category: "직군 고유",
    req: { anyCareers: ["administratum"] },
    reqLabel: "직군: 아드미니스트라툼",
    weight: 26,
    text: "인접 전선의 아스트라 밀리타룸 장군과 포지 월드 마고스가 동시에 같은 수송 선단과 프로메튬 연료 할당량을 요구하며 청원서를 들이밀었다! 어느 쪽에 우선 배정 도장을 찍느냐에 따라 한 전선이 무너지거나 기계교와 원수가 된다.",
    choices: [
      {
        label: "[지성 판정] 50년째 항구 창고에 방치된 잉여 예비 보급 명부를 찾아내 양쪽 수요를 모두 충족한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'황제의 놀라운 행정 기적!' 전선과 기계교 양쪽 모두에서 찬사가 쏟아졌고, 그대는 성역 수석 아뎁트로 파격 승진했다!",
          stats: { Int: 7, Inf: 8, Fel: 4 }
        },
        fail: {
          text: "창고 열쇠를 찾느라 사흘을 허비하는 사이 양측 사절이 서로 주먹다짐을 벌여 징계 경고를 받았다.",
          stats: { Inf: -5, Int: 3 }
        }
      },
      {
        label: "정치적 파장이 적은 쪽으로 표준 순번 규정만 적용해 깔끔히 결재 도장을 찍는다",
        effect: {
          text: "아드미니스트라툼에서 살아남는 비결은 오직 규정 번호 뒤에 숨는 것이다. 상급자의 신임을 지켰다.",
          stats: { Inf: 5, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Departmento Munitorum / Adeptus Administratum"
  },
  {
    id: "ev_career_rogue_xenos",
    title: "로그 트레이더 — 변경 정거장의 아엘다리 해적선장과 거래",
    category: "직군 고유",
    req: { anyCareers: ["rogue_trader"] },
    reqLabel: "직군: 로그 트레이더",
    weight: 26,
    text: "제국 국경 너머 코로누스 성계 외곽의 무법 우주정거장. 유려한 아엘다리(엘다) 커세어 선장이 고대 성간 항로 지도를 내놓으며 제국산 희귀 광물과 교환하자고 제안했다. 황제의 무역 영장이 있으니 합법이지만, 선내 성직자의 눈초리가 매섭다.",
    choices: [
      {
        label: "[교섭 판정] 무역 영장의 절대 권위를 내세워 아엘다리 선장과 배짱 두둑한 대거래를 성사시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "미지의 보물 성계 항로를 손에 넣었다! 가문의 국고가 넘쳐나고 외계 항법 지식까지 얻었다.",
          stats: { Fel: 6, Inf: 10, Int: 4 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "오만한 외계인이 함정을 파 두었다! 정거장 총격전 끝에 화물 절반을 잃고 겨우 기함으로 탈출했다.",
          wounds: -18,
          stats: { Inf: -4, Ag: 3 }
        }
      },
      {
        label: "[사격 판정] 거래를 가장해 기함의 거포 사거리 안으로 유인한 뒤 외계 해적선을 격침·노획한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "선내 국교 사제와 제국 해군 모두 환호했다! 부서진 외계선 잔해에서 귀한 전리품까지 건졌다.",
          stats: { BS: 6, Inf: 7, WP: 4 },
          faith: 8
        },
        fail: {
          text: "아엘다리 함선의 믿기 힘든 기동력에 역습당해 선체 방어막이 크게 손상되었다.",
          wounds: -16,
          stats: { Ag: 3 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Koronus Expanse"
  }
);
