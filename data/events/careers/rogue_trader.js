// 분기 사건 — 직군 1:1 단독 파일: 로그 트레이더 (황제의 무역 영장 선장 · 변경 개척 · 콜드 트레이드)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_rogue_trader_uncharted",
    title: "미지의 성계 — 황제의 지도에 없는 고대 문명",
    category: "탐험",
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 24,
    text: "제국 성도 바깥 헤일로 스타즈 경계에서 정체불명의 수정 도시가 남아 있는 무인 행성을 발견했다. 아키오테크 보물이 가득할 수도, 고대 외계 저주가 잠들어 있을 수도 있다.",
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
    id: "ev_career_rogue_xenos",
    title: "로그 트레이더 — 변경 정거장의 아엘다리 해적선장과 거래",
    category: "직군 고유",
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 26,
    text: "제국 국경 너머 코로누스 익스팬스 외곽의 무법 우주정거장. 유려한 아엘다리 커세어 선장이 고대 성간 항로 지도를 내놓으며 제국산 희귀 광물과 교환하자고 제안했다. 황제의 무역 영장이 있으니 합법이지만, 선내 성직자의 눈초리가 매섭다.",
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
  },
  // =========================================================================
  // 12단계: 로그 트레이더 신규 심화 사건 6종
  // =========================================================================
  {
    id: "ev_s12_rt_koronus_charter",
    title: "로그 트레이더 — 미개척 변경 성계의 식민지 선포",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 34,
    text: "황제의 성도 바깥에서 풍부한 프로메튬과 식량 자원을 품은 미등록 행성을 발견했다. 지금 궤도에 가문의 깃발을 꽂고 개척 식민지를 선포하면 막대한 부와 영주권을 거머쥘 수 있지만, 토착 야생 괴수와 경쟁 가문의 견제를 버텨야 한다.",
    choices: [
      {
        label: "[권위 판정] 무역 영장을 선포하고 함대 병력과 정착민을 강하시켜 가문 직할 식민지를 세운다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "행성 표면의 요새 항구가 세워지고 제국 성도와 개척 대장에 그대의 가문 이름이 등재되었다! 변경 성계의 새로운 패자가 탄생했다.",
          stats: { Inf: 12, Fel: 6, Int: 4 },
          addTags: ["rogue_warrant_charter"]
        },
        fail: {
          text: "초기 정착지 건설 중 토착 포식자 떼의 습격으로 막대한 자본과 위신을 잃고 철수했다.",
          wounds: -18,
          stats: { Inf: -6 }
        }
      },
      {
        label: "[교섭 판정] 아뎁투스 메카니쿠스 탐사대와 지분을 나누어 공동 채굴 기지를 건립한다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "기계교의 방어 포탑과 그대의 상선이 결합한 난공불락의 광산 행성이 완성되었다! 안정적인 수익이 쏟아진다.",
          stats: { Fel: 6, Int: 6, Inf: 8 },
          addTags: ["rogue_warrant_charter"]
        },
        fail: {
          text: "협상 조항의 맹점에 걸려 기계교에 수익 대부분을 넘겨주고 막대한 초기 투자금만 손해 보았다.",
          stats: { Inf: -4, Fel: -2 }
        }
      },
      {
        label: "직접 통치 부담을 피하고 행성 발견 권리만 아드미니스트라툼에 매각해 현금을 챙긴다",
        effect: {
          text: "깔끔한 일시금으로 기함의 무기 갑판을 전면 개수했다. 리스크 없는 장사였다.",
          stats: { Inf: 6, BS: 3 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Stars of Inequity"
  },
  {
    id: "ev_s12_rt_cold_trade_auction",
    title: "자유 항구의 지하 경매장 — 금지된 콜드 트레이드",
    category: "직군 심화",
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 28,
    text: "변방 우주 정거장 '풋폴'의 비밀 경매장. 가면 쓴 밀수상들이 금지된 헤일로 장치와 아엘다리 영혼석을 비밀리에 경매에 올렸다. 오르도 제노스 밀정이 객석 어딘가에 숨어 있을지 모르지만, 되팔면 함선 한 척 값을 벌 수 있다.",
    choices: [
      {
        label: "[교섭 판정] 대리인을 통해 정교하게 입찰해 아키오테크 위장 명목으로 유물을 낙찰받는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "심문소 밀정의 눈을 완벽히 속이고 귀한 유물을 손에 넣었다! 상류층 암시장에서 어마어마한 이윤을 남겼다.",
          stats: { Fel: 7, Inf: 10, Int: 4 },
          corruption: 5,
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "오르도 제노스 감시망에 꼬리가 밟혀 거액의 입막음 뇌물과 벌금을 치렀다.",
          stats: { Inf: -8, WP: 3 },
          corruption: 4
        }
      },
      {
        label: "[지성 판정] 경매장의 밀수 조직 명단만 몰래 확보해 오르도 제노스 이단심문관에게 넘긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "이단심문소가 경매장을 일망타진했고, 그대에게는 심문소의 공식 신임장과 합법적 노획품 지분이 돌아왔다!",
          stats: { Int: 6, Inf: 8, WP: 4 },
          faith: 5,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "밀수 조직의 암살자가 귀환 길에 기습해 부상을 입었으나 기함 경호대가 격퇴했다.",
          wounds: -18,
          stats: { WS: 3 }
        }
      },
      {
        label: "위험한 콜드 트레이드에는 손을 대지 않고 합법적인 향신료와 광석 교역만 마치고 출항한다",
        effect: {
          text: "무역 영장에도 지켜야 할 선이 있다. 깨끗한 장부를 유지하며 가문의 명성을 지켰다.",
          stats: { WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Rogue Trader: Faith and Coin / Lexicanum: Cold Trade"
  },
  {
    id: "ev_s12_rt_rival_dynasty",
    title: "경쟁 로그 트레이더 가문의 사략선 습격",
    category: "직군 심화",
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 28,
    text: "황금 항로 독점을 두고 대립하던 라이벌 로그 트레이더 가문의 쾌속 호위함 두 척이 소행성대 그늘에서 기습했다! 상대 선장은 통신망으로 화물 절반을 넘기면 살려 주겠다며 비웃고 있다.",
    choices: [
      {
        label: "[사격 판정] 기함의 좌현 매크로 캐논 일제 사격과 랜스 포화로 사략선을 박살 낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 두 번의 현측 사격으로 적 호위함 한 척의 엔진을 날리고 나머지를 도주시켰다! 변경 항로에 그대의 명성을 떨쳤다.",
          stats: { BS: 7, Inf: 9, WP: 4 }
        },
        fail: {
          text: "치열한 포격전 끝에 기함 장갑이 찢어지고 함교 파편에 부상을 입었다.",
          wounds: -20,
          stats: { T: 3, BS: 2 }
        }
      },
      {
        label: "[민첩 판정] 소행성대 틈새로 기함을 몰아넣는 대담한 기동으로 적 함선의 추격을 역포위한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "소행성에 부딪혀 방어막이 꺼진 적함을 나포해 화물과 선원을 통째로 가문 함대에 편입했다!",
          stats: { Ag: 7, Int: 5, Inf: 8 }
        },
        fail: {
          text: "선체 하부가 소행성에 긁혀 큰 수리비가 들었으나 포위망은 돌파했다.",
          wounds: -14,
          stats: { Ag: 3, Inf: -3 }
        }
      },
      {
        label: "통신망으로 제국 해군 순찰 함대의 가짜 접근 신호를 흘려 적을 물러나게 만든다",
        effect: {
          text: "영리한 심리전으로 탄약 한 발 쓰지 않고 사략선단을 따돌렸다.",
          stats: { Int: 5, Fel: 5 }
        }
      }
    ],
    source: "Rogue Trader: Battlefleet Koronus"
  },
  {
    id: "ev_s12_rt_void_leviathan",
    title: "워프 항로 외곽의 고대 보이드 괴수 조우",
    category: "직군 심화",
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 24,
    text: "성계 외곽 가스 행성 궤도에서 순양함만 한 거대한 우주 생물 보이드 웨일 무리가 기함 옆을 유영하고 있다. 사냥에 성공하면 왕족들이 목숨 걸고 탐내는 희귀 생체 정수와 장기를 얻을 수 있지만, 분노한 무리가 선체를 들이받을 수도 있다.",
    choices: [
      {
        label: "[사격 판정] 어뢰와 작살포를 동원해 늙은 우두머리 개체를 사냥해 전설의 전리품을 얻는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "사흘 밤낮의 우주 추격전 끝에 거대한 보이드 괴수를 포획했다! 성계 총독궁 연회에서 그대의 무용담이 전설이 되었다.",
          stats: { BS: 6, Inf: 10, Fel: 5 }
        },
        fail: {
          text: "분노한 무리의 충격파에 선수 충각이 파손되고 선원 수십 명이 우주로 휩쓸렸다.",
          wounds: -20,
          stats: { Inf: -3, T: 3 }
        }
      },
      {
        label: "[지성 판정] 사냥 대신 생체 발광 패턴과 이동 경로를 기록해 비밀 워프 안정점을 발견한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "보이드 괴수들이 따라가는 보이지 않는 잔잔한 워프 해류를 찾아냈다! 가문만의 독점 고속 항로가 열렸다.",
          stats: { Int: 7, Inf: 8, Ag: 4 }
        },
        fail: {
          text: "측량 도중 방사능 꼬리에 휘말려 함교 센서가 타 버렸으나 귀중한 자료는 건졌다.",
          wounds: -10,
          stats: { Int: 4 }
        }
      },
      {
        label: "항해사의 경고에 따라 엔진 출력을 낮추고 조용히 무리가 지나가길 기다린다",
        effect: {
          text: "우주에는 건드리지 말아야 할 경이로움도 있다. 선원들이 선장의 신중함에 안도했다.",
          stats: { WP: 4, Int: 3 }
        }
      }
    ],
    source: "Rogue Trader: Koronus Bestiary"
  },
  {
    id: "ev_s12_rt_warrant_audit",
    title: "테라 파견 감사관의 무역 영장 진위 조사",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 28,
    text: "제국 중심 항구에 정박한 순간, 아드미니스트라툼 고등 감사관과 아르비테스 호위대가 기함 갑판에 올라탔다. 수천 년 전 황제 혹은 하이 로드들이 서명한 가문의 무역 영장 원본을 제시하고 지난 20년의 관세 장부를 감사하겠다고 선언한다.",
    choices: [
      {
        label: "[권위 판정] 성유물 보관함에서 원본 무역 영장을 꺼내 제국 법전의 불가침 특권을 정면으로 선포한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "황금 인장이 찍힌 고대 양피지 앞에서 감사관이 무릎을 꿇고 물러났다! 가문의 위신이 하늘을 찌른다.",
          stats: { Inf: 10, WP: 5, Fel: 5 }
        },
        fail: {
          text: "감사관이 영장 단서 조항의 세금 예외 누락을 물고 늘어져 거액의 항만 공탁금을 떼였다.",
          stats: { Inf: -6, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 최고급 아마섹 주류와 변경 특산품을 대접하며 매끄럽게 서류 절차를 마무리한다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "감사관이 만족스러운 미소와 함께 '모범적 충성 가문' 도장을 찍고 하선했다. 새로운 관료 인맥까지 생겼다.",
          stats: { Fel: 7, Inf: 6 }
        },
        fail: {
          text: "강직한 감사관이 뇌물 시도로 간주해 정밀 세무 조사를 한 달간 이어 갔다.",
          stats: { Inf: -5, Fel: -2 }
        }
      },
      {
        label: "선내 회계 서기관들을 총동원해 며칠 밤을 새워 장부를 투명하게 소명한다",
        effect: {
          text: "시간은 걸렸지만 단 한 점의 결격도 없이 감사를 통과했다. 정공법이 통했다.",
          stats: { Int: 5, WP: 4, Inf: 3 }
        }
      }
    ],
    source: "Rogue Trader Core / Lexicanum: Warrant of Trade"
  },
  {
    id: "ev_s12_rt_mutiny_deck",
    title: "기함 선원 조합의 배당 파업 — 3년 만의 귀항 지연",
    category: "직군 심화",
    req: {
      anyCareers: ["rogue_trader", "rt_lord_captain"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "daemon_prince"]
    },
    reqLabel: "직군: 로그 트레이더",
    weight: 25,
    text: "변경 성계 개척이 3년째 이어지며 계약 기간을 넘기자, 기함의 화물 장인 조합과 항해 사관 일부가 수익 배당 정산과 즉각 귀항을 요구하며 상층 화물창과 동력 제어실을 점거했다. 선단 무장 경호대장은 본보기로 조합 대표들을 즉결 진압하자고 건의한다.",
    choices: [
      {
        label: "[교섭 판정] 직접 경호대 소수만 데리고 화물창으로 내려가 변경 개척 수익 배당금 증액과 귀항 일정을 공증한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "선장이 직접 내려온 담대함과 공정한 배당 계약에 조합원들이 환호하며 일터로 복귀했다! 선단의 사기가 최고조에 달했다.",
          stats: { Fel: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "흥분한 강경파 사보타주범이 총을 쏘아 팔을 스쳤으나, 경호대가 즉시 제압하며 파업이 가라앉았다.",
          wounds: -16,
          stats: { WP: 4, Fel: -2 }
        }
      },
      {
        label: "[백병 판정] 파워 소드를 뽑고 선봉에 서서 제어실을 점거한 강경파 주동자들을 일격에 제압해 선장의 위엄을 세운다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "공포와 경외 속에 점거 대열이 순식간에 무릎을 꿇었다. 무역 영장의 주인에게 감히 토를 다는 자는 더 이상 없었다.",
          stats: { WS: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "난전 속에 늑골을 강타당했으나 끝내 동력 제어실 통제권을 되찾았다.",
          wounds: -20,
          stats: { WS: 3, T: 3 }
        }
      },
      {
        label: "항해사 길드와 기계교 파견 사제를 중재인으로 세워 귀항 시 보너스 지급 각서를 걸고 피를 흘리지 않고 점거를 푼다",
        effect: {
          text: "상업 왕조의 주인답게 계약과 중재로 위기를 넘겼다. 이틀 뒤 주동자들이 스스로 무기를 반납하고 항해가 재개되었다.",
          stats: { Int: 5, Inf: 4 }
        }
      }
    ],
    source: "Rogue Trader: Into the Storm"
  }
);
