// 분기 사건 — 직군 계열별 그림다크 전용 딜레마 사건 팩 (8종)
export default [
  {
    id: "ev_s22_fac_01",
    title: "미승인 STC 파편과 기술 이단의 올가미",
    category: "그림다크 · 기계교",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyCareers: ["tech_priest"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "그림다크 · 18세 이상 · 테크프리스트 (3티어 이하)",
    weight: 30,
    text: "고대 포지 구획의 무너진 데이터 저장고를 정비하던 중, 그대의 메카덴드라이트가 화성의 정본 목록에 등재되지 않은 미승인 STC 파편을 인양했다. 설계의 정교함은 경이로울 정도였으나, 이를 엿본 정적 마고스의 서보-스컬들이 즉시 기술 이단 혐의를 씌워 재판소 소환장을 발부했다. 옴니시아의 계율과 진리의 파편 사이에서 찰나의 선택이 목줄을 죄어 온다.",
    choices: [
      {
        label: "[지성 판정] 이진 성가와 화성 고문서 대조표를 들이대어 정통 인류의 유산임을 논증한다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "완벽한 계통도와 구문 해석이 정적의 고발을 산산이 부수었다. 재판소는 파편의 정통성을 공인했고, 그대의 날카로운 분석안이 포지 전체에 각인되었다.",
          stats: { Int: 5, Inf: 5 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "치열한 논리 공방 끝에 미승인 파편이 대성전 이전의 안전 설계임을 입증해 누명을 벗었다.",
          stats: { Int: 3, WP: 2, Inf: 2 }
        },
        fail: {
          text: "증거 불충분으로 처형은 면했으나 막대한 정화 공물과 코지테이터 봉인 비용을 떠안게 되었다.",
          wounds: -10,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"]
        },
        critFail: {
          text: "기계령의 오작동으로 이단 판정문과 공명하고 말았다. 혹독한 신경 소거와 채무 노역이 선고되었다.",
          wounds: -20,
          stats: { Int: -3, Inf: -5 },
          addTags: ["imperial_debt", "shell_shocked"]
        }
      },
      {
        label: "[특성 전용 · 기계 의체] 의체 내부 코지테이터로 접속 기록을 덮어써 흔적을 말소한다",
        req: { allTags: ["bionic"] },
        effect: {
          text: "차가운 의체 연산이 재판소 감시망보다 한 박자 빠르게 로그를 재구성했다. 파편은 비밀 금고에 봉인되었고 혐의는 연기처럼 사라졌다.",
          stats: { Int: 3, Ag: 2 }
        }
      },
      {
        label: "파편을 정적에게 순순히 넘기고 하급 정화 노역으로 처벌을 갈음한다",
        effect: {
          text: "자존심과 연구 성과를 내려놓고 묵묵히 고열 용광로 정비를 감수해 최악의 숙청을 피했다.",
          wounds: -8,
          stats: { T: 1, Inf: -2 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Dark Heresy: The Lathe Worlds"
  },
  {
    id: "ev_s22_fac_02",
    title: "고위 마고스의 치명적 노역 할당",
    category: "그림다크 · 기계교",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["mechanicus"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "그림다크 · 18세 이상 · 아뎁투스 메카니쿠스 (3티어 이하)",
    weight: 30,
    text: "상급 마고스가 십일조 함대 출항을 명분으로 도저히 달성 불가능한 플라즈마 도관 생산 할당량을 내렸다. 방사능 차폐막마저 낡아 터져 나가는 하층 용광로에서 서비터와 인부들이 잿더미로 변해 가는 가운데, 기한을 넘기면 그대의 육신마저 부품으로 해체될 위기에 처했다.",
    choices: [
      {
        label: "[강인 판정] 치명적 방사능을 무릅쓰고 직접 도관 구획에 들어가 공정을 강행한다",
        check: { stat: "T", diff: -10 },
        critSuccess: {
          text: "살이 타들어 가는 열기와 방사선을 견디며 기적적으로 할당량을 완수했다. 손상된 부품을 즉석에서 교체하며 버텨 낸 강인한 내구력에 상급 마고스조차 경의를 표하며 권위를 인정했다.",
          wounds: -8,
          stats: { T: 6, WP: 4, Inf: 5 }
        },
        success: {
          text: "피와 냉각수를 뒤집어쓴 채 간신히 마감 시한을 맞추었다. 상급 마고스가 차갑게 고개를 끄덕였다.",
          wounds: -16,
          stats: { T: 3, Inf: 2 }
        },
        fail: {
          text: "누출된 중금속과 방사능 증기가 폐부와 혈관을 잠식했다. 목숨은 건졌으나 고질적인 중독이 남았다.",
          wounds: -22,
          stats: { T: -2 },
          addTags: ["chronic_toxins"]
        },
        critFail: {
          text: "압연 프레스의 폭발과 독성 증기에 휩쓸려 팔다리가 으스러지고 만성 독소가 뼈에 스며들었다.",
          wounds: -28,
          stats: { T: -3, Ag: -3 },
          addTags: ["crippled_limb", "chronic_toxins"]
        }
      },
      {
        label: "[지성 판정] 보조 성소의 동력을 무단 우회시켜 자동화 공정을 가속한다",
        check: { stat: "Int", diff: -6 },
        success: {
          text: "정교한 회로 우회로 생산 속도를 끌어올렸다. 인명 피해를 줄이면서도 할당량을 채우는 데 성공했다.",
          stats: { Int: 4, Inf: 2 }
        },
        fail: {
          text: "기계령의 역류로 코지테이터가 폭주해 화상을 입었으며, 수리 비용까지 떠안았다.",
          wounds: -14,
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "소모성 하층 인부들을 교대 없이 투입해 차가운 숫자로 할당량을 메운다",
        effect: {
          text: "수백 명의 비명이 용광로 소음에 묻혔으나 문서는 완벽했다. 그대의 냉혈한 평판이 기계교 내부에 퍼졌다.",
          stats: { Inf: 3, WP: -1 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Lexicanum: Forge World / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s22_fac_03",
    title: "교구와 심문소의 이단 숙청전",
    category: "그림다크 · 제국 교조",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["ecclesiarchy", "inquisition", "arbites", "sororitas"],
      maxCareerTier: 4,
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "high_lord_terra"]
    },
    reqLabel: "그림다크 · 18세 이상 · 에클레시아키·심문소·아르비테스·소로리타스 (4티어 이하)",
    weight: 30,
    text: "추기경파 성직단과 오르도 헤레티쿠스의 강경 파벌이 서로를 이단 방조범으로 지목하며 피비린내 나는 내부 숙청전을 벌이고 있다. 양측 모두 무장 수녀와 집행관을 거느린 채 그대에게 상대측 정보원의 처형 영장에 서명할 것을 강요한다. 어느 쪽의 손을 잡든 반대편의 보복을 피할 수 없다.",
    choices: [
      {
        label: "[교섭 판정] 양측의 약점을 교묘히 저울질해 상급 심문 법정이 개입할 때까지 시간을 번다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "현란한 외교적 수사로 두 파벌을 서로 묶어 둔 사이 상급 재판관이 도착했다. 위기를 역전시킨 언변이 전설처럼 회자되었다.",
          stats: { Fel: 6, Inf: 5 },
          addTags: ["silver_tongue"]
        },
        success: {
          text: "아슬아슬한 중립 화법으로 양쪽의 칼끝을 피하며 법정 이관을 성사시켰다.",
          stats: { Fel: 3, Int: 2 }
        },
        fail: {
          text: "양측 모두에게 불신을 사 직무 벌금과 징계 비용을 물어야 했다.",
          wounds: -10,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[의지 판정] 두 장의 처형 영장을 불태우고 황제의 율법 앞에 정면으로 맞선다",
        check: { stat: "WP", diff: -8 },
        critSuccess: {
          text: "흔들리지 않는 신념과 위압감에 양측 집행관들이 총구를 거두었다. 어떤 암살 위협에도 꺾이지 않는 강철의 신경을 증명했다.",
          stats: { WP: 6, Inf: 4 },
          faith: 4,
          addTags: ["iron_nerves"],
          align: { dogmatic: 5 }
        },
        success: {
          text: "고결한 저항 끝에 무력 충돌을 막아 냈으나, 적지 않은 타박상과 적의를 떠안았다.",
          wounds: -12,
          stats: { WP: 3 },
          faith: 2
        },
        fail: {
          text: "암살자들의 기습과 폭발 속에서 간신히 살아남았으나 신경에 깊은 상처가 남았다.",
          wounds: -20,
          stats: { WP: -3 },
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[특성 전용 · 은빛 혀] 비밀 밀약을 중개해 두 파벌의 약점을 모두 손에 쥔다",
        req: { allTags: ["silver_tongue"] },
        effect: {
          text: "은빛 혀로 양측의 체면을 살려 주는 척하며 결정적인 밀서를 챙겼다. 숙청전은 조용히 봉합되었다.",
          stats: { Fel: 3, Inf: 4 }
        }
      },
      {
        label: "우세한 지역 집행 세력의 편에 서서 말없이 처형 영장을 집행한다",
        effect: {
          text: "피 묻은 명령을 묵묵히 처리해 살아남았으나, 내면의 씁쓸한 무게만은 지울 수 없었다.",
          wounds: -8,
          stats: { Inf: 2, Fel: -2 },
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Dark Heresy 2e Core Rulebook / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s22_fac_04",
    title: "무고한 거주 구역의 정화 명령",
    category: "그림다크 · 제국 교조",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["inquisition", "sororitas", "ecclesiarchy", "arbites"],
      maxCareerTier: 4,
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "high_lord_terra"]
    },
    reqLabel: "그림다크 · 18세 이상 · 심문소·소로리타스·에클레시아키·아르비테스 (4티어 이하)",
    weight: 30,
    text: "상급 심문관이 검역 지연을 이단 은닉으로 단정 짓고, 수십만 충성스러운 제국 시민이 사는 하부 주거 구역 전체를 소각 정화하라는 대리 집행령을 내렸다. 현장의 기록을 확인한 결과, 오염은 극소수 구역에 불과하며 대다수는 무고한 노동자들이다. 제국의 잔혹한 격언인 '무고함은 아무것도 증명하지 못한다'를 따를 것인가.",
    choices: [
      {
        label: "[의지 판정] 징계와 처형을 각오하고 아스트로패스 교신을 지연시켜 민간인을 대피시킨다",
        check: { stat: "WP", diff: -12 },
        critSuccess: {
          text: "상급자의 분노 앞에서도 눈 하나 깜짝하지 않고 대피를 완료한 뒤 최소 구역만 소각했다. 극한의 중압감을 이겨 내며 강철의 신경을 얻었다.",
          stats: { WP: 6, Fel: 3 },
          faith: 3,
          addTags: ["iron_nerves"],
          align: { humane: 8 }
        },
        success: {
          text: "엄중한 문책과 감봉을 당했으나 수만 명의 무고한 목숨을 불길에서 건져 냈다.",
          wounds: -10,
          stats: { WP: 3, Inf: -3 },
          align: { humane: 6 }
        },
        fail: {
          text: "대피는 늦었고 포격의 화염과 비명이 코앞에서 터져 나왔다. 참혹한 광경이 신경을 찢어 놓았다.",
          wounds: -20,
          stats: { WP: -4 },
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[지성 판정] 첩보망을 총동원해 진짜 이단 세포의 좌표만 분리해 내어 타격을 국한시킨다",
        check: { stat: "Int", diff: -8 },
        critSuccess: {
          text: "밤샘 대조 끝에 핵심 이단 소굴만을 정확히 도려냈다. 상급 심문관조차 그대의 전술적 통찰에 감탄했다.",
          stats: { Int: 5, Inf: 4 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "정밀 타격으로 대규모 학살을 피하고 실제 배후만을 처단했다.",
          wounds: -8,
          stats: { Int: 3, Inf: 2 }
        },
        fail: {
          text: "시간 내에 좌표를 좁히지 못해 교전이 번졌고, 그대 역시 유탄 파편에 큰 상처를 입었다.",
          wounds: -18,
          stats: { Int: -1 }
        }
      },
      {
        label: "상급 심문관의 명령을 일점의 주저 없이 그대로 집행한다",
        effect: {
          text: "거주 구역 전체가 잿더미로 변했다. 임무는 완벽히 완수되었으나 그대의 냉혹한 이름은 공포의 대명사가 되었다.",
          stats: { Inf: 4, WP: -2 },
          addTags: ["notorious_ruthless"],
          align: { dogmatic: 6, ruthless: 6 }
        }
      }
    ],
    source: "Imperium Maledictum / Lexicanum: Inquisition"
  },
  {
    id: "ev_s22_fac_05",
    title: "워프 폭풍 속 하층 갑판 봉쇄",
    category: "그림다크 · 공허와 함대",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["navy", "rogue_trader"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "그림다크 · 18세 이상 · 임페리얼 네이비·로그 트레이더",
    weight: 30,
    text: "거친 워프 폭풍을 뚫고 항해하던 중 겔러 필드가 일순간 요동쳤다. 그 찰나의 틈을 타 하층 포갑판과 기관실 구획에서 기괴한 환청과 돌연변이가 창궐하기 시작했다. 수천 명의 보이드맨 승무원들이 격벽 너머에서 문을 두드리며 구조를 애원하지만, 격벽을 열면 함선 전체가 워프의 광기에 삼켜질 수 있다.",
    choices: [
      {
        label: "[의지 판정] 무장 경비대를 이끌고 하층 갑판으로 진입해 생존자를 선별 구출한다",
        check: { stat: "WP", diff: -10 },
        critSuccess: {
          text: "악몽 같은 워프의 속삭임을 의지로 짓누르고 오염되지 않은 승무원들을 무사히 끌어냈다. 어떤 심연도 뚫지 못할 강철의 신경을 얻었다.",
          wounds: -10,
          stats: { WP: 6, Inf: 4 },
          addTags: ["iron_nerves"],
          align: { humane: 6 }
        },
        success: {
          text: "처절한 교전 끝에 일부 승무원을 구출하고 오염 구역을 소각했다.",
          wounds: -18,
          stats: { WP: 3, WS: 2 }
        },
        fail: {
          text: "갑판에 스민 워프의 잔재가 정신을 할퀴고 지나갔다. 간신히 탈출했으나 지워지지 않는 워프 흉터가 남았다.",
          wounds: -22,
          corruption: 4,
          stats: { WP: -3 },
          addTags: ["warp_scarred"]
        },
        critFail: {
          text: "격벽 너머에서 뿜어져 나온 아공간의 비명이 영혼을 갈갈이 찢었다. 육신과 정신 모두 깊은 오염을 입었다.",
          wounds: -26,
          corruption: 8,
          stats: { WP: -4, T: -2 },
          addTags: ["warp_scarred", "shell_shocked"]
        }
      },
      {
        label: "[지성 판정] 오염 구획의 기압을 단계별로 제어해 중요 동력선만 살리고 진공 정화한다",
        check: { stat: "Int", diff: -8 },
        critSuccess: {
          text: "냉철한 격벽 제어로 함선의 피해는 최소화하고 핵심 기관실 인원까지 지켜 냈다.",
          stats: { Int: 5, Inf: 3 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "계산된 진공 개방으로 변이체들을 공허로 쓸어 내고 함선을 안정시켰다.",
          wounds: -8,
          stats: { Int: 3 }
        },
        fail: {
          text: "밸브 오작동으로 역압 충격이 함교 근처까지 덮쳐 중상을 입었다.",
          wounds: -18,
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "즉시 전체 하층 격벽을 영구 용접하고 우주로 진공 배기한다",
        effect: {
          text: "수천 명의 목숨이 차가운 공허로 빨려 들어갔으나 함선은 온전했다. 생존 승무원들은 그대를 경외와 공포 속에 바라보았다.",
          wounds: -4,
          stats: { Inf: 3, Fel: -2 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Battlefleet Gothic"
  },
  {
    id: "ev_s22_fac_06",
    title: "섹터 십일조 미달과 누명의 장부",
    category: "그림다크 · 제국 행정",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["administratum", "rogue_trader", "navy"],
      maxCareerTier: 3,
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "그림다크 · 18세 이상 · 아드미니스트라툼·로그 트레이더·임페리얼 네이비 (3티어 이하)",
    weight: 30,
    text: "섹터 총괄 감사관이 파견된 자리에서 지난 수십 년간 누적된 십일조 물자 대량 미달 사태가 폭로되었다. 실제 원인은 부패한 귀족 가문의 횡령이었으나, 고위 관료들은 하급 실무 라인과 그대의 서명란으로 모든 책임을 전가했다. 해명하지 못하면 평생 갚지 못할 배상 채무와 징벌 노역이 기다리고 있다.",
    choices: [
      {
        label: "[교섭 판정] 고등 법정에서 귀족 가문의 모순된 서류를 찌르며 책임을 되돌려 놓는다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "칼날 같은 논변과 정치적 감각으로 감사관들의 시선을 뒤집어 배후 가문을 탄핵했다. 제국 법정의 은빛 혀로 명성을 떨쳤다.",
          stats: { Fel: 6, Inf: 5 },
          addTags: ["silver_tongue"]
        },
        success: {
          text: "치밀한 설득 끝에 직접 책임에서 벗어나며 명예를 지켰다.",
          stats: { Fel: 3, Int: 2 }
        },
        fail: {
          text: "권문세가의 압력에 밀려 막대한 십일조 결손액을 개인 채무로 떠안게 되었다.",
          stats: { Inf: -4 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[지성 판정] 며칠 밤을 새워 30년 치 훼손된 양피지 두루마리와 코지테이터 기록을 복원한다",
        check: { stat: "Int", diff: -8 },
        critSuccess: {
          text: "단 하나의 오차도 없는 완벽한 회계 복원표를 제출해 감사단을 침묵시켰다.",
          stats: { Int: 5, WP: 3 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "극심한 피로를 딛고 누락된 수송 전표를 찾아내어 처벌을 면했다.",
          wounds: -8,
          stats: { Int: 3 }
        },
        fail: {
          text: "과도한 각성제 남용으로 몸이 망가졌고 장부조차 제때 맞추지 못해 빚더미에 올랐다.",
          wounds: -12,
          addTags: ["chronic_toxins", "imperial_debt"]
        }
      },
      {
        label: "묵묵히 징계와 벌금을 감수해 휘하 서기들과 선원들을 보호한다",
        effect: {
          text: "거액의 채무 낙인이 찍혔으나 부하들은 무사했다. 묵묵히 책임을 진 태도가 조용한 신망을 남겼다.",
          stats: { WP: 2, Inf: -3 },
          addTags: ["imperial_debt"],
          align: { humane: 5 }
        }
      }
    ],
    source: "Imperium Maledictum / Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_s22_fac_07",
    title: "아스트로패스 성가대의 영혼 소진",
    category: "그림다크 · 사이킥",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["psyker"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "high_lord_terra"]
    },
    reqLabel: "그림다크 · 18세 이상 · 아스트라 텔레파티카 (사이커 · 하이 로드 제외)",
    weight: 30,
    text: "성계 외곽의 워프 난류가 아스트로패스 첨탑의 합창 회로를 정면으로 강타했다. 성가대원들의 영혼이 촛불처럼 타들어가며 피눈물을 쏟고 있지만, 성전 함대의 긴급 지원 요청 전문이 아직 송신 중이다. 지금 회로를 끊으면 함대가 워프 속에서 실종되고, 버티면 그대의 정신마저 불타 버릴 판국이다.",
    choices: [
      {
        label: "[의지 판정] 폭주하는 사이킥 역류를 내 정신으로 받아 내며 송신을 끝까지 완수한다",
        check: { stat: "WP", diff: -12 },
        critSuccess: {
          text: "황금 옥좌의 빛을 떠올리며 영혼의 화염을 견뎌 냈다. 전문은 무사히 닿았고, 어떤 워프의 압박도 버텨 내는 강철의 신경을 각성했다.",
          wounds: -10,
          stats: { WP: 7, Inf: 4 },
          addTags: ["iron_nerves"]
        },
        success: {
          text: "코와 귀에서 피를 쏟으면서도 마지막 음절까지 송신을 지켜 냈다.",
          wounds: -16,
          stats: { WP: 4 },
          corruption: 2
        },
        fail: {
          text: "역류한 아공간 에너지가 뇌신경을 태워 영구적인 워프 흉터를 남겼다.",
          wounds: -22,
          corruption: 4,
          stats: { WP: -3 },
          addTags: ["warp_scarred"]
        },
        critFail: {
          text: "성가대의 비명과 함께 정신 방벽이 붕괴했다. 목숨만 간신히 부지했으나 워프 흉터와 극심한 발작 증세가 남았다.",
          wounds: -28,
          corruption: 6,
          stats: { WP: -5 },
          addTags: ["warp_scarred", "shell_shocked"]
        }
      },
      {
        label: "[지성 판정] 붕괴하는 대원들의 공명 고리를 정밀하게 분리해 연쇄 소진을 차단한다",
        check: { stat: "Int", diff: -8 },
        critSuccess: {
          text: "정교한 사이킥 조율로 피해 규모를 절반 이하로 줄이면서도 전문을 온전히 보냈다.",
          wounds: -8,
          stats: { Int: 5, WP: 3 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "차단 술식으로 최악의 폭주를 막아 냈다.",
          wounds: -14,
          stats: { Int: 3 }
        },
        fail: {
          text: "조율이 어긋나며 사이킥 충격파에 휩쓸려 쓰러졌다.",
          wounds: -20,
          corruption: 3
        }
      },
      {
        label: "보조 감쇠 장치에 몸을 묶고 자신의 감각 회로를 스스로 태워 전문을 넘긴다",
        effect: {
          text: "기절하기 직전 마지막 신호를 넘겼다. 며칠 뒤 의무실에서 깨어났을 때 머리카락이 하얗게 세어 있었다.",
          wounds: -18,
          corruption: 2,
          stats: { WP: -2, T: -1 }
        }
      }
    ],
    source: "Dark Heresy: The Radical's Handbook / Lexicanum: Astropath"
  },
  {
    id: "ev_s22_fac_08",
    title: "진시드 오염 의심과 침묵의 감찰",
    category: "그림다크 · 아스타르테스",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 18,
      anyTrees: ["astartes"],
      excludeBodyClasses: ["dreadnought"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "chapter_master"]
    },
    reqLabel: "그림다크 · 18세 이상 · 아뎁투스 아스타르테스 (드레드노트·챕터 마스터 제외)",
    weight: 30,
    text: "오염된 카오스 성계에서 며칠간 고립 전투를 치르고 귀환하자마자, 챕터 채플린과 아포세카리들이 소대의 진시드 변이 여부를 확인하기 위한 무자비한 감찰 심문에 착수했다. 아스타르테스에게 두려움이란 없으나, 명예와 혈통의 순수성이 의심받는 이 가혹한 시련 앞에서는 오직 묵묵한 인내와 증명만이 허락된다.",
    choices: [
      {
        label: "[의지 판정] 마취 없는 신경 감찰과 정화 심문 앞에서도 미동 없이 순수성을 증명한다",
        check: { stat: "WP", diff: -10 },
        critSuccess: {
          text: "고통을 초월한 부동의 자세에 채플린조차 경의를 표했다. 챕터의 어떤 시련에도 흔들리지 않는 강철의 신경이 입증되었다.",
          wounds: -10,
          stats: { WP: 6, Inf: 5 },
          addTags: ["iron_nerves"]
        },
        success: {
          text: "모든 정신 감찰을 통과해 진시드의 결백을 증명하고 형제들 곁으로 돌아갔다.",
          wounds: -12,
          stats: { WP: 4, Inf: 2 }
        },
        fail: {
          text: "전투 중 스민 워프의 잔재가 검출되어 고통스러운 정화 시술을 견뎌야 했다.",
          wounds: -18,
          corruption: 3,
          stats: { WP: -2 },
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[강인 판정] 아포세카리의 생체 절개 시술과 단식 고행을 침묵 속에 받아들인다",
        check: { stat: "T", diff: -8 },
        critSuccess: {
          text: "초인의 육체가 혹독한 생체 검사를 완벽히 이겨 내며 한층 단단한 내구력을 얻었다.",
          wounds: -10,
          stats: { T: 6, WP: 3 }
        },
        success: {
          text: "거친 생체 시술을 버텨 내고 이상 없음을 판정받았다.",
          wounds: -14,
          stats: { T: 4 }
        },
        fail: {
          text: "오염 의심 부위를 적출하는 과정에서 깊은 손상을 입어 의체 보강이 불가피해졌다.",
          wounds: -22,
          stats: { Ag: -2 },
          addTags: ["bionic"]
        }
      },
      {
        label: "변명을 거두고 선봉 속죄 부대 배치를 자청해 전장에서 명예를 입증한다",
        effect: {
          text: "말 대신 볼터와 체인소드로 충성을 증명하기로 맹세하고 가장 험한 최전선 배치를 받아들였다.",
          wounds: -10,
          stats: { WP: 2, Inf: -2 }
        }
      }
    ],
    source: "Codex: Space Marines / Deathwatch Core Rulebook"
  }
];
