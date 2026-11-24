// 분기 사건 — 직군 계열: 아뎁투스 메카니쿠스 · 스키타리 · 테크프리스트 · 아크마고스 · STC · 기계령
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_stc_discovery",
    title: "잊혀진 암흑기 유적 — 고대 STC 파편 발견!",
    category: "메카니쿠스",
    once: true,
    req: { minAge: 18, or: [{ anyTags: ["mechanicus"] }, { stats: { Int: 52 } }] },
    reqLabel: "기계교 소속 또는 지성 52+",
    weight: 16,
    text: "폐허가 된 지하 시설 깊은 곳에서 암흑의 기술 시대(Dark Age of Technology)에 제작된 온전한 STC(표준 주형 설계도) 데이터 코어를 발견했다! 화성의 마고스들이 행성 하나를 통째로 바쳐서라도 탐낼 국보급 유물이다.",
    choices: [
      {
        label: "[지성 판정] 오염 여부를 검증해 아뎁투스 메카니쿠스에 정식 헌납한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "순수한 고대 합금과 무기 설계도가 복원되었다! 화성으로부터 막대한 포상과 종신 권위, 최고급 생체 개조를 하사받았다!",
          stats: { Int: 8, Inf: 18, T: 6 },
          addTags: ["stc_finder", "bionic"]
        },
        fail: {
          text: "방어 자동포탑이 작동해 부상을 입었지만, 데이터 파편 일부는 건져 냈다.",
          wounds: -20,
          stats: { Int: 4, Inf: 6 }
        }
      },
      {
        label: "[금단 · 지성 55+] 제국에 보고하지 않고 숨겨진 AI(실리카 아니무스)의 지식을 훔쳐본다",
        req: { stats: { Int: 55 } },
        check: { stat: "Int", diff: -10 },
        success: {
          text: "금지된 기술 이단의 지식을 흡수해 경이로운 통찰을 얻었다! 다만 메카니쿠스가 눈치챈다면 즉시 서비터 신세다.",
          stats: { Int: 14, Inf: 4 },
          corruption: 18,
          addTags: ["tech_heresy"]
        },
        fail: {
          text: "고대 기계령의 방화벽이 뇌신경을 태워 버렸다!",
          wounds: -30,
          corruption: 12
        }
      }
    ],
    source: "Lexicanum: Standard Template Construct"
  },
  {
    id: "ev_forge_machine_spirit",
    title: "용광로의 분노 — 타이탄 기계령 폭주",
    category: "메카니쿠스",
    req: { minAge: 15, or: [{ anyWorldTags: ["forge", "mechanicus"] }, { anyTags: ["mechanicus"] }] },
    reqLabel: "포지 월드 거주 또는 기계교 소속",
    weight: 16,
    text: "거대한 조립 도크에서 수리 중이던 워하운드 타이탄의 원자로가 굉음을 내며 과열되었다! 기계령이 진노해 성유 파이프가 터지고 사제들이 흩어진다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 진정 찬가를 이진법으로 입력해 노심을 안정시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기계령이 경건하게 잠잠해졌다! 마고스가 그대의 기술적 경외심을 크게 칭찬하며 생체 의수를 하사했다.",
          stats: { Int: 6, Inf: 7, T: 3 },
          addTags: ["bionic"]
        },
        fail: {
          text: "고압 증기와 방사선에 노출되어 심각한 화상을 입었다.",
          wounds: -24,
          stats: { T: 2 }
        }
      },
      {
        label: "[강인 판정] 방열복을 입고 수동 냉각 밸브를 끝까지 잠근다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "뜨거운 증기를 버텨 내고 대폭발을 막아 냈다. 공장 전체가 그대를 기렸다.",
          stats: { T: 6, WP: 4, Inf: 5 }
        },
        fail: {
          text: "폭압에 튕겨 나가 큰 부상을 입었다.",
          wounds: -28
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_job_mechanicus_emotion",
    title: "기계교 의식 — 감정 영역 절제 (Rite of Clear Thought)",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["tech_priest", "archmagos"] },
    reqLabel: "직업: 테크프리스트 / 마고스",
    weight: 26,
    text: "상급 마고스가 그대의 뇌 피질에서 공포·슬픔·연민 같은 '비효율적 유기체 감정'을 제거하고 논리 연산 칩으로 대체하는 성스러운 수술을 권유한다.",
    choices: [
      {
        label: "살점은 나약하다! 감정 영역을 절제하고 순수 논리의 기계 사제가 된다",
        effect: {
          text: "인간적인 따스함과 눈물은 영원히 사라졌지만, 연산 속도와 공포 내성이 경이로운 수준으로 치솟았다!",
          stats: { Int: 10, WP: 8, Fel: -10 },
          lifeBonusExtra: 35,
          addTags: ["bionic"]
        }
      },
      {
        label: "인간의 직관 역시 옴니시아가 주신 설계의 일부라며 수술을 보류한다",
        effect: {
          text: "보수파 사제들은 의심스러운 눈초리를 보냈으나, 일반 제국군과 소통할 수 있는 드문 현자로 남았다.",
          stats: { Fel: 5, WP: 4 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_rank_skitarii_override",
    title: "스키타리의 굴레 — 마고스의 강제 전파 명령",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["skitarii"] },
    reqLabel: "계급: 메카니쿠스 스키타리",
    weight: 26,
    text: "전방에 적 중기갑대가 포진해 있음에도, 후방의 마고스 도미누스가 누스피어 신경망으로 그대의 사지를 직접 제어하며 '귀중한 아키오테크 잔해 회수를 위한 자살적 전진'을 강제 송신한다!",
    choices: [
      {
        label: "[강인 판정] 기계교의 뜻에 완벽히 복종해 포화 속으로 한 치의 망설임 없이 전진한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "방사능 카빈을 쏘며 포화를 뚫고 유물 코어를 회수했다! 마고스가 그대의 기계적 충성을 치하하며 상급 개조를 내렸다.",
          stats: { T: 6, BS: 5, Inf: 7 }
        },
        fail: {
          text: "반파된 상태로 수거되어 대대적인 기계 의체 재조립을 거쳤다.",
          wounds: -30,
          stats: { T: 4 }
        }
      },
      {
        label: "[지성 판정] 0.2초의 연산 여유를 찾아 포탄 사각지대로 미세하게 경로를 보정한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "명령을 완수하면서도 분대 생존율을 41% 끌어올렸다! 테크프리스트 승급 적성이 기록되었다.",
          stats: { Int: 7, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "전파 명령 미세 불복종 경고가 기록되어 신경 징계 충격을 받았다.",
          wounds: -16,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus (Skitarii)"
  },
  {
    id: "ev_rank_archmagos_synod",
    title: "화성 대의회 — 탐색 함대 편성권 쟁탈전",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["archmagos"] },
    reqLabel: "계급: 마고스 · 아크마고스",
    weight: 28,
    text: "기계교 최고 의회에서 보수파 파브리케이터들이 그대의 신형 원자로 개량안을 '기술 이단(Tech-Heresy)에 근접한 위험한 혁신'이라며 공격하고 있다.",
    choices: [
      {
        label: "[지성 판정] 1만 년 전 STC 주석 구절을 4만 줄 인용해 보수파의 논리를 완벽히 분쇄한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "의회 전체가 이진법 찬가로 승복했다! 독자적인 아크 메카니쿠스 탐색 함대와 막대한 포지 지분을 확보했다.",
          stats: { Int: 8, Inf: 12 }
        },
        fail: {
          text: "교리 논쟁이 교착되어 일부 연구 예산이 동결되고 말았다.",
          stats: { Inf: -6 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_career_techpriest_stc",
    title: "테크프리스트 — 깨어난 고대 기계령과 교리의 경계",
    category: "직군 고유",
    req: { anyCareers: ["tech_priest"] },
    reqLabel: "직군: 테크프리스트",
    weight: 26,
    text: "지하 폐허의 고대 발전기를 정비하던 중, 표준 설계도에 없는 고효율 냉각 회로가 스스로 가동하며 이진법으로 대화를 걸어왔다! 정통 교리대로라면 '규격 외 자율 연산(기술 이단)'으로 즉시 파괴해야 하지만, 이대로 분석하면 행성 전체의 에너지난을 단번에 끝낼 수 있다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 성스러운 축성 기름을 붓고 안전하게 고대 STC 단편으로 공식 등록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기계령을 정통 성전 코드로 완벽히 감싸 화성 의회의 공인을 받아 냈다! 마고스 승진에 결정적인 업적이 되었다.",
          stats: { Int: 8, Inf: 8 },
          addTags: ["stc_finder"]
        },
        fail: {
          text: "감찰 마고스가 이단적 코드 변형을 눈치채고 징계를 내렸다! 겨우 회로를 봉인해 처형은 면했다.",
          stats: { Inf: -6, Int: 3 },
          addTags: ["tech_heresy"]
        }
      },
      {
        label: "오염된 혐오 지능(Abominable Intelligence)의 위험을 원천 차단하고자 즉시 용광로에 폐기한다",
        effect: {
          text: "화성 정통파 상급자들이 그대의 흔들림 없는 기계 교리 수호를 높이 칭찬했다.",
          stats: { WP: 5, Inf: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Tech-Heresy / Forges of Mars"
  },
  {
    id: "ev_rank_archmagos_ark",
    title: "마고스 · 아크마고스 — 아크 메카니쿠스 탐사선의 미지 성계 강행군",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["archmagos"] },
    reqLabel: "계급: 마고스·아크마고스",
    weight: 28,
    text: "그대가 지휘하는 대륙급 탐사 모함 '아크 메카니쿠스'의 장거리 점술기가 헤일로 스타 변경에서 완전한 암흑기 기술(DAoT) 발신 신호를 포착했다! 단, 신호 근원지는 네크론 툼 월드와 워프 암초 한가운데다.",
    choices: [
      {
        label: "[지성 판정] 고대 누스피어 암호 프로토콜을 동원해 네크론 방어망을 교란하고 유물을 원격 회수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "손상되지 않은 고대 STC 공업 설계 단편을 손에 넣었다! 화성 대의회가 그대의 이름으로 새 포지 신전을 헌정했다!",
          stats: { Int: 9, Inf: 12 },
          addTags: ["stc_finder"]
        },
        fail: {
          text: "네크론 가우스 포화에 함선 외곽이 크게 파손되어 스키타리 2개 대대를 잃고 철수했다.",
          wounds: -20,
          stats: { Int: 4 }
        }
      },
      {
        label: "위험 부담을 계산해 좌표만 암호화 봉인한 채 안정적인 성계 광물 채굴과 함대 보강을 우선한다",
        effect: {
          text: "옴니시아의 논리에 따른 합리적 결정이었다. 탐사 함대의 전력과 재정이 크게 불어났다.",
          stats: { Int: 4, Inf: 7, T: 4 }
        }
      }
    ],
    source: "Forges of Mars Trilogy / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_arc_stc_conclave",
    title: "STC 발견자의 운명 — 화성 탐색대와 이단심문소의 쟁탈전",
    category: "메카니쿠스",
    once: true,
    req: { allTags: ["stc_finder"], excludeTags: ["heretic"] },
    reqLabel: "이력: 고대 STC 발견자",
    weight: 42,
    text: "그대가 과거 복원해 낸 고대 STC 파편의 가치가 화성 대의회에 보고되자 성계 전체가 들썩이고 있다! 붉은 로브의 익스플로레이터 마고스 사절단이 성대한 연금과 작위를 제시하는 한편, 이단심문소 감찰관도 기술 오염 여부를 확인하겠다며 면담을 요구했다.",
    choices: [
      {
        label: "[지성 판정] 화성 사절단과 정식 기술 봉헌 계약을 맺고 행성급 연금과 최상급 의료 지원을 협상한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "화성 의회가 설계 단편의 순수성을 공인하며 막대한 종신 연금과 호화로운 영지 권리를 하사했다! 제국 역사에 이름이 남을 포상이다.",
          stats: { Inf: 14, Int: 6 },
          lifeBonusExtra: 15,
          addTags: ["wealthy"]
        },
        fail: {
          text: "까다로운 이진법 계약 조항에 밀려 연금의 상당 부분을 화성에 양보했으나, 여전히 평생 부족함 없는 명예를 얻었다.",
          stats: { Inf: 6 },
          wounds: -8
        }
      },
      {
        label: "[교섭 판정] 기계교와 이단심문소 사이에서 균형을 잡아 양측의 공식 보호령과 두터운 신임을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "화성의 기술 권위와 이단심문소의 감찰 권한을 모두 존중하는 절묘한 합의를 이끌어 냈다. 두 거대 기관이 그대의 든든한 방패가 되었다.",
          stats: { Inf: 12, Fel: 6 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "양측의 신경전 사이에 끼어 한동안 강도 높은 심문을 받았으나, 혐의 없음으로 풀려났다.",
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "화성 사절단의 권위에 조용히 복종해 공적을 봉헌하고 소박한 종신 서훈만 받는다",
        effect: {
          text: "욕심을 내려놓은 겸손한 태도에 마고스가 흡족해하며 옴니시아의 축복장과 안정된 보상을 내렸다.",
          stats: { Inf: 7, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Standard Template Construct / Gaunt's Ghosts"
  },
  {
    id: "ev_arc_tech_heresy_audit",
    title: "기술 이단 감찰 — 옴니시아의 심판관과 금지된 회로",
    category: "메카니쿠스",
    once: true,
    req: { allTags: ["tech_heresy"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 기술 이단",
    weight: 36,
    text: "과거 손댔던 금지된 기술 개조의 흔적이 기계교 내부 감사망에 포착되었다! 다연장 플라즈마 서보암을 펼친 심판 마고스가 데이터 슬레이트를 들이밀며 '정통 STC에 없는 불경한 혁신'의 출처를 추궁한다.",
    choices: [
      {
        label: "[지성 판정] 금지된 회로 구조를 고대 STC 주석의 정통 파생 해석으로 완벽히 위장해 마고스의 논리를 꺾는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 이진법 문헌 구절을 줄줄 읊어 대며 감찰단을 설득했다! 오히려 탁월한 고증 학자로 칭찬받으며 위기를 기회로 뒤집었다.",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "논리의 허점이 들통나 전기 채찍 징계와 서열 강등 처분을 받았다. 겨우 서비터 개조만은 면했다.",
          wounds: -18,
          stats: { Inf: -8 },
          corruption: 6
        }
      },
      {
        label: "[의지 판정] 이단적 데이터 회로를 스스로 용광로에 소각하고 기계령 정화 기도를 집전해 결백을 보인다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "타오르는 회로 앞에서 경건히 옴니시아 찬가를 읊자 감찰 마고스가 묵묵히 고개를 끄덕이며 혐의를 종결했다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -10
        },
        fail: {
          text: "폐기 과정에서 방전 사고로 손에 화상을 입었고, 감찰단은 여전히 의심의 눈초리를 거두지 않았다.",
          wounds: -12,
          stats: { Inf: -5 }
        }
      },
      {
        label: "감사가 들이닥치기 전에 금지된 설계 슬레이트를 암시장 밀수상에게 팔아넘기고 증거를 인멸한다",
        effect: {
          text: "물증은 사라져 처벌을 피했으나, 그대의 손에서 빠져나간 이단 기술이 어둠 속에서 어디로 흘러갈지는 아무도 모른다.",
          stats: { Ag: 4, Inf: 4 },
          corruption: 8
        }
      }
    ],
    source: "Lexicanum: Tech-Heresy / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s2_skitarii_noosphere",
    title: "스키타리 — 누스피어(Noosphere) 전술 동기화와 방사능 돌격",
    category: "메카니쿠스",
    once: true,
    req: { anyCareers: ["skitarii"] },
    reqLabel: "병종: 스키타리 병사",
    weight: 34,
    text: "치명적인 방사능 안개가 자욱한 고대 포지 폐허 위로 마고스의 누스피어 전술 데이터망이 쏟아져 들어온다. 일반 인간이라면 몇 분 만에 쓰러질 오염 지대 너머에 적 중장갑과 손상된 고대 코지테이터가 동시에 포착되었다.",
    choices: [
      {
        label: "[사격 판정] 아크 라이플과 라듐 카빈의 조준선을 누스피어 표적망에 동기화해 적 기갑을 정밀 타격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "0.01초 오차 없는 일제 사격이 적 전차의 동력로를 단숨에 관통했다! 마고스가 그대의 전투 연산 효율을 높이 평가했다.",
          stats: { BS: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "전파 교란으로 조준망이 일시 단절되어 파편을 맞았으나, 수동 사격으로 임무를 완수했다.",
          wounds: -18,
          stats: { BS: 3 }
        }
      },
      {
        label: "[강인 판정] 방사능 폭풍 속을 기계 다리로 돌파해 파손된 성스러운 코지테이터를 회수한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "방사선 수치가 경보 한계를 넘었으나 기계화된 육신으로 끝까지 버텨 유물을 온전히 바쳤다!",
          stats: { T: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "방사능 폭풍에 생체 장기가 손상되어 긴급 교체 수술을 받아야 했으나 코지테이터 코어만은 지켰다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "마고스의 이진법 명령에 한 치도 어긋남 없이 방어 진지를 사수하며 순수한 기계 효율을 증명한다",
        effect: {
          text: "두려움도 망설임도 없는 완벽한 규율이었다. 옴니시아의 의지가 강철 대열 속에 구현되었다.",
          stats: { T: 4, BS: 4 },
          wounds: -8
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Skitarius"
  },
  {
    id: "ev_s4_career_skitarii_override",
    title: "스키타리 — 마고스의 원격 통제 명령과 전장의 돌발 변수",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 16,
      anyCareers: ["skitarii"]
    },
    reqLabel: "직군: 스키타리",
    weight: 32,
    text: "궤도 함선에 탑승한 마고스가 노오스피어 원격 명령으로 분대 전체의 시야와 조준을 직접 통제하며 전진을 명했다. 그러나 그대의 광학 센서는 지면 아래 숨겨진 적의 대전차 지뢰밭을 0.2초 먼저 포착했다. 마고스의 계산에는 지뢰 변수가 빠져 있다.",
    choices: [
      {
        label: "[지성 판정] 0.1초 만에 지뢰 좌표 패킷을 최우선 우선순위로 역송신해 마고스의 진격 알고리즘을 갱신시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "마고스의 전술 연산이 즉각 우회 기동으로 전환되어 분대 전멸을 면했다! 그대의 전장 연산 가중치가 상향 조정되었다.",
          stats: { Int: 7, BS: 5, Inf: 5 }
        },
        fail: {
          text: "신호 지연으로 선두 지뢰 하나가 터져 파편을 맞았으나, 후속 분대는 지뢰밭을 피해 냈다.",
          wounds: -16,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[사격 판정] 원격 통제 틈새에 갈바닉 라이플로 지뢰 신관을 원거리 저격해 통로를 강제로 연다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "연쇄 폭발이 지뢰밭과 적 매복조를 함께 날려 버렸다! 마고스가 이진법 칭찬 코드를 송출했다.",
          stats: { BS: 8, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "폭풍에 휩쓸려 의체 외갑이 손상되었으나, 진격로는 완벽히 열렸다.",
          wounds: -15,
          stats: { BS: 4, T: 4 }
        }
      },
      {
        label: "자율 판단을 억제하고 마고스의 절대 명령에 순응해 강철 다리로 정면 돌파를 수행한다",
        effect: {
          text: "피와 강철의 손실이 있었으나 마고스의 연산대로 거점은 확보되었다. 스키타리의 순종이 증명되었다.",
          stats: { T: 5, WP: 5 },
          wounds: -12
        }
      }
    ],
    source: "Lexicanum: Skitarii / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s4_career_techpriest_relic",
    title: "테크프리스트 — 500년째 잠든 고대 발전기의 기계령 진정 의례",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 18,
      anyCareers: ["tech_priest"]
    },
    reqLabel: "직군: 테크프리스트",
    weight: 32,
    text: "행성 방어막에 전력을 공급하던 500년 된 플라스마 발전기가 불길한 붉은 경고등을 뿜으며 출력이 곤두박질치고 있다. 보좌 도제들은 기계령이 분노했다며 대피를 외치지만, 발전기가 멈추면 궤도 폭격에 도시 전체가 노출된다.",
    choices: [
      {
        label: "[지성 판정] 고대 정비 성가의 순서에 숨겨진 냉각 밸브 조절 절차를 해독해 기계령을 진정시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "향로 연기와 성유가 감싸는 가운데 발전기의 웅장한 박동이 되살아났다! 포지 대사제가 그대의 지식을 높이 치하했다.",
          stats: { Int: 8, Inf: 6, WP: 4 }
        },
        fail: {
          text: "플라스마 역류에 망토와 의체가 그을렸으나, 비상 출력만큼은 되살려 냈다.",
          wounds: -15,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "[강인 판정] 방사능 경보 구역 안으로 직접 들어가 메카덴드라이트로 과열된 제어봉을 수동 고정한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "고열과 방사능을 의체 내구력으로 버텨 내며 붕괴 직전의 노심을 안정시켰다! 기계교의 진정한 헌신이었다.",
          stats: { T: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "방사능 피폭으로 생체 장기 일부를 교체해야 했으나, 방어막은 꺼지지 않았다.",
          wounds: -18,
          stats: { T: 5 }
        }
      },
      {
        label: "비상 예비 발전기로 전력을 단계 이관한 뒤 안전 규정에 따라 주 노심을 서서히 식힌다",
        effect: {
          text: "방어막 출력은 일시적으로 낮아졌으나, 귀중한 고대 유물 발전기의 영구 파손을 막았다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Tech-Priest / Machine Spirit Lore"
  },
  // =========================================================================
  // 12단계: 아크마고스(2종) · 테크프리스트(1종) · 스키타리(1종) 심화 사건 4종
  // =========================================================================
  {
    id: "ev_s12_archmagos_explorator",
    title: "아크마고스 — 익스플로레이터 함대와 미지의 고대 공업 위성",
    category: "메카니쿠스",
    req: { anyCareers: ["archmagos"] },
    reqLabel: "직군: 마고스 · 아크마고스",
    weight: 30,
    text: "그대가 지휘하는 익스플로레이터 함대가 성간 성운 깊숙한 곳에서 기술의 암흑기 시절 완전자동 궤도 조선소를 발견했다! 그러나 시설 내부에서는 사악한 '가증스러운 지성(AI)'의 잔류 방어 프로그램이 침입자를 향해 경고 신호를 송출하고 있다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 이진법 방화벽으로 금지된 AI 논리 회로를 즉각 소거하고 조선소 설계도만 정화 추출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기술 이단의 위험을 완전히 제거한 채 고대 전함 장갑 주조 공정을 손에 넣었다! 화성 대서고가 그대의 이름을 찬양했다.",
          stats: { Int: 9, Inf: 10, WP: 4 },
          addTags: ["stc_finder"]
        },
        fail: {
          text: "AI의 역해킹 스크랩코드가 대뇌 임플란트를 강타해 심한 손상을 입었으나 시설 봉인에 성공했다.",
          wounds: -20,
          stats: { Int: 5, T: 4 }
        }
      },
      {
        label: "[권위 판정] 스키타리 군단과 카스텔란 로봇 부대를 전면 투입해 물리적으로 중앙 코어를 분쇄하고 잔해를 회수한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "압도적인 화력으로 고대 방어 드론을 분쇄하고 수천 톤의 희귀 합금과 아키오테크 부품을 노획했다!",
          stats: { Inf: 9, BS: 5, Int: 5 }
        },
        fail: {
          text: "자동 포탑의 집중 사격에 스키타리 호위대가 큰 손실을 입고 철수했다.",
          wounds: -16,
          stats: { Inf: 3, T: 4 }
        }
      },
      {
        label: "화성 교리에 따라 가증스러운 지성의 오염 가능성을 차단하기 위해 궤도 폭격으로 위성을 완전 정화한다",
        effect: {
          text: "지식에 대한 갈망보다 옴니시아의 교리가 앞선다. 보수파 대현자들이 그대의 정통 신앙에 찬사를 보냈다.",
          stats: { WP: 6, Inf: 6 },
          faith: 6
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Forges of Mars"
  },
  {
    id: "ev_s12_archmagos_fabricator",
    title: "아크마고스 — 포지 월드 파브리케이터 제너럴 패권 논쟁",
    category: "메카니쿠스",
    once: true,
    req: { anyCareers: ["archmagos"] },
    reqLabel: "직군: 마고스 · 아크마고스",
    weight: 30,
    text: "포지 월드의 노쇠한 파브리케이터 제너럴이 코지테이터 뇌사 상태에 빠지자, 후계 자리를 두고 정통 화성파와 실용 개량파 대현자들이 누스피어(Noosphere) 가상 법정에서 치열한 데이터 논쟁을 벌이고 있다. 그대의 표와 연설이 행성의 향후 300년을 결정한다.",
    choices: [
      {
        label: "[지성 판정] 10만 줄의 생산 효율 시뮬레이션을 실시간 전개해 두 파벌의 논리를 모두 압도하고 직접 의장직을 거머쥔다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "0.001%의 논리적 허점도 없는 완벽한 연산 앞에 모든 마고스가 찬성 코드를 전송했다! 포지 월드의 실권자가 되었다.",
          stats: { Int: 9, Inf: 12, WP: 5 }
        },
        fail: {
          text: "정통파의 교리 반박에 밀려 의장직은 놓쳤으나 핵심 타이탄 군단 정비권을 확보했다.",
          stats: { Int: 5, Inf: 5 }
        }
      },
      {
        label: "[권위 판정] 아스트라 밀리타룸과 임페리얼 네이비의 군수 계약 지분을 지렛대로 삼아 실리 연정을 성사시킨다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "제국 군부의 절대적 지지를 등에 업고 포지 월드의 핵심 연구 예산을 모두 장악했다!",
          stats: { Inf: 10, Fel: 6, Int: 4 }
        },
        fail: {
          text: "외부 세력을 끌어들였다는 보수파의 비판을 받았으나 실익만큼은 챙겼다.",
          stats: { Inf: 4, WP: 3 }
        }
      },
      {
        label: "정치적 의장 자리보다 순수한 아키오테크 연구 예산과 독립 연구소 자치권을 보장받는 조건으로 중립을 지킨다",
        effect: {
          text: "권력 다툼에서 한 발 물러나 가장 방대한 고대 자료실의 열쇠를 손에 넣었다.",
          stats: { Int: 7, WP: 5 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Lexicanum: Fabricator-General"
  },
  {
    id: "ev_s12_techpriest_servitor",
    title: "테크프리스트 — 자아의 잔향이 남은 서비터의 오류",
    category: "메카니쿠스",
    req: { anyCareers: ["tech_priest"] },
    reqLabel: "직군: 테크프리스트",
    weight: 26,
    text: "포지 공장의 탄약 적재 서비터 한 기가 작업을 멈추고 쇠파이프로 벽에 서툰 인간의 이름과 가족의 얼굴을 긁고 있다. 뇌엽 절제 시술이 불완전해 과거 인간 시절의 기억이 깨어난 것이다. 교리상 즉각 소각 및 재포맷 대상이다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 교리대로 불량 기억 회로를 정밀 절제해 완벽하고 효율적인 작업 서비터로 복구한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "감정의 잡음이 제거되자 서비터의 생산 효율이 18% 상승했다! 상급 마고스가 완벽한 기술 사제의 냉정함이라 칭찬했다.",
          stats: { Int: 6, Inf: 5, WP: 3 }
        },
        fail: {
          text: "기억 절제 도중 서비터가 발작해 유압 집게로 그대의 로브와 옆구리를 찢었다.",
          wounds: -14,
          stats: { Int: 3, T: 3 }
        }
      },
      {
        label: "[의지 판정] 고통스러운 반각성 상태로 방치하지 않고 가장 빠르고 고통 없는 정지 명령으로 안식을 내려 준다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "아직 남아 있던 인간성의 불꽃으로 조용히 자비를 베풀고 고장 폐기 보고서를 올렸다. 차가운 강철 속에 온기가 남았다.",
          stats: { WP: 6, Fel: 4 }
        },
        fail: {
          text: "감찰 서비터에 비효율 폐기 사유가 기록되어 감점 경고를 받았으나 후회는 없었다.",
          stats: { WP: 4, Inf: -2 }
        }
      },
      {
        label: "기억 잔향 현상의 신경 데이터를 기록해 생체-기계 인터페이스 연구 논문으로 화성에 보고한다",
        effect: {
          text: "예기치 않은 오류조차 옴니시아의 지식 탐구에 보탬이 된다. 학술적 공로를 인정받았다.",
          stats: { Int: 5, Inf: 4 }
        }
      }
    ],
    source: "Forges of Mars / Lexicanum: Servitor"
  },
  {
    id: "ev_s12_skitarii_radiate",
    title: "스키타리 — 뱅가드 방사능 전선과 썩어가는 생체 잔여물",
    category: "메카니쿠스",
    req: { anyCareers: ["skitarii"] },
    reqLabel: "직군: 스키타리",
    weight: 28,
    text: "고농도 방사능 탄환을 뿜는 라듐 카빈 부대와 함께 독성 황무지를 돌파하는 임무. 맹렬한 방사선이 적 보병뿐 아니라 그대 몸에 아직 남아 있는 생체 장기와 피부마저 서서히 녹여 내리고 있다. 마고스는 진격 속도를 12% 높이라 전파를 보낸다.",
    choices: [
      {
        label: "[강인 판정] 고통 신호 수신기를 차단하고 방사능 구름 한복판으로 돌격해 적 중포 진지를 점령한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "나약한 살점은 타들어 갔으나 강철 다리는 멈추지 않았다! 혁혁한 공훈으로 최상급 티타늄 의체 보강을 하사받았다.",
          stats: { T: 7, BS: 5, Inf: 5 },
          woundsBonus: 8
        },
        fail: {
          text: "심각한 방사능 화상으로 생체 조직 일부를 절제하고 응급 강철 보철을 받아야 했다.",
          wounds: -20,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[사격 판정] 장거리 갈바닉 라이플 정밀 사격으로 적 방사능 차폐 벙커의 관측창을 꿰뚫어 거리를 유지한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "누스피어 탄도 보정으로 800미터 밖에서 적 방어선을 무력화했다! 생체 손상을 최소화하며 승리했다.",
          stats: { BS: 7, Int: 4, Inf: 4 }
        },
        fail: {
          text: "적 역포격에 광학 렌즈가 파손되며 부상을 입었으나 임무 목표는 파괴했다.",
          wounds: -16,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "마고스의 전파 명령에 100% 복종해 최적화된 대열로 묵묵히 행진한다",
        effect: {
          text: "스키타리의 의지는 곧 옴니시아의 계산이다. 손실 허용치 내에서 임무를 완수했다.",
          stats: { T: 4, WP: 4, BS: 2 }
        }
      }
    ],
    source: "Codex: Skitarii / Codex: Adeptus Mechanicus"
  }
);

