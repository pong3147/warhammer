// 분기 사건 — 세그멘툼 솔라 행성 고유 (화성 · 네크로문다 / 테라·아마겟돈은 1:1 단독 승격)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_world_mars_archaeotech",
    title: "화성 적색 사막 — 모래 폭풍이 드러낸 기술의 암흑기 주조소",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["mars"],
      excludeTags: [
        "fabricator_general", "high_lord_terra", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 화성",
    weight: 24,
    text: "화성 북부 철분 사막을 휩쓴 거대한 녹슨 모래 폭풍이 수천 년 동안 파묻혀 있던 기술의 암흑기 시대의 지하 주조소 입구를 드러냈다. 현장 책임자인 상급 테크프리스트는 오염된 고대 기계령이 깨어날 수 있다며 즉각 봉쇄를 명했지만, 스캐너에는 인류가 잃어버린 고대 합금 제련 회로가 선명히 포착되어 있다.",
    choices: [
      {
        label: "[테크프리스트/마고스 전용] 고위 기계교 암호와 누스피어 스캐너로 봉인된 주조소의 설계 데이터를 정밀 추출한다",
        req: { anyTags: ["tech_priest", "magos"] },
        effect: {
          text: "성스러운 고위 권한으로 고대 기계령을 진정시키고 잊힌 합금 제련 설계 일부를 안전하게 추출했다! 화성 의회에서 그대의 이름이 거론되었다.",
          stats: { Int: 8, Inf: 10 }
        }
      },
      {
        label: "[지성 판정] 옴니시아의 이름으로 탐사 서보스컬을 보내 고대 회로를 기록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금지된 경계를 넘지 않고도 고대 합금 제련 수식을 확보해 화성 주조소의 큰 포상을 받았다!",
          stats: { Int: 7, Inf: 8 }
        },
        fail: {
          text: "고대 방어 체계의 전자기 펄스에 신경 회로가 타 버려 큰 부상을 입었다.",
          wounds: -24,
          stats: { Int: 2 }
        }
      },
      {
        label: "규율에 복종해 즉시 봉쇄선 뒤로 물러나 기계령 진정 기도를 올린다",
        effect: {
          text: "화성에서는 궁금해하지 않는 자가 가장 오래 산다. 기계교 상부가 그대의 순명을 치하했다.",
          stats: { WP: 4, Inf: 3 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Mars / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_world_necromunda_house",
    title: "네크로문다 — 6대 클랜 하우스의 암거래 의뢰",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "sororitas", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 비초인 필멸자",
    weight: 24,
    text: "하이브 프리무스의 거대 세력인 첨단 기술 클랜 하우스 반 사르와 독극물 화공에 능한 하우스 에셔가 동시에 밀수 화물 호위를 제안해 왔다. 네크로문다에서 중립이란 곧 양쪽 모두의 표적이 된다는 뜻이다.",
    choices: [
      {
        label: "[이단심문관/아르비테스/커미사르 전용] 밀수 접선지를 통째로 급습해 양쪽 클랜 수장을 심문·압수한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 법집행의 철퇴 앞에 하이브 클랜들이 고개를 숙였다! 밀수된 금지 장비와 막대한 첩보를 압수했다.",
          stats: { Inf: 10, Int: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 하우스 반 사르의 고대 방사능 슈트 밀반입을 돕는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "정밀한 보안 해제로 보수를 두둑이 챙기고 첨단 기술 지식까지 훔쳐 배웠다!",
          stats: { Int: 6, Inf: 6, BS: 3 }
        },
        fail: {
          text: "반 사르 슈트의 방사선 누출에 피폭되어 병석에 누웠다.",
          wounds: -22
        }
      },
      {
        label: "[교섭 판정] 양쪽의 정보를 슬쩍 맞교환해 더 큰 몫을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "능숙한 양다리 협상으로 언더하이브와 미드하이브 양쪽에서 막대한 연줄을 얻었다!",
          stats: { Fel: 6, Inf: 8 }
        },
        fail: {
          text: "속임수가 탄로 나 에셔 갱단의 독침 암살자에게 습격당했다!",
          wounds: -26,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Lexicanum: Necromunda"
  },
  {
    id: "ev_mars_titan_march",
    title: "화성 — 신의 기계 타이탄 군단 성전 출격 사열",
    category: "행성 고유",
    req: {
      minAge: 12,
      anyWorlds: ["mars"],
      excludeTags: [
        "dreadnought", "high_lord_terra", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 화성",
    weight: 26,
    text: "철의 고리 우주공항 진입로가 지진처럼 울린다! 화성 수호 군단 레기오 이그나툼 소속 워로드급 타이탄 세 기가 진홍과 황금 장갑을 번뜩이며 성전 수송선으로 행진한다. 귀청을 찢는 워혼 경적 소리가 붉은 대기를 가르자, 연도의 모든 기계교도와 노동자가 일제히 무릎을 꿇는다.",
    choices: [
      {
        label: "[기계교 전용] 이진법 찬가를 합창하며 타이탄 중대의 출격 데이터 스트림에 경건히 접속한다",
        req: { anyTags: ["mechanicus"] },
        effect: {
          text: "신의 기계가 뿜어내는 장엄한 기계령의 울림이 회로를 적셨다! 기술적 영감이 폭발한다.",
          stats: { Int: 6, WP: 5, Inf: 4 }
        }
      },
      {
        label: "[의지 판정] 뼈까지 울리는 워혼의 굉음 속에서 끝까지 고개를 들고 신의 기계 행렬을 눈에 새긴다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "압도적인 위압감을 이겨 내고 강철 신들의 장엄한 위용을 똑바로 마주했다! 어떤 적 앞에서도 물러서지 않을 담력이 자리 잡았다.",
          stats: { WP: 6, T: 3 },
          faith: 8
        },
        fail: {
          text: "귀청을 찢는 초저주파 진동에 고막이 욱신거리고 코피를 쏟으며 주저앉았다.",
          wounds: -10,
          stats: { WP: 2 }
        }
      },
      {
        label: "압도적인 전쟁 병기의 위용을 경외하며 무릎 꿇고 기도한다",
        effect: {
          text: "저 강철의 신이 인류 편에 서 있는 한 제국은 무너지지 않으리라는 확신이 가슴을 채웠다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Collegia Titanica / Legio Ignatum"
  },
  {
    id: "ev_necromunda_spyrer",
    title: "네크로문다 — 상층 스파이어러 귀족 사냥단 습격!",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "noble", "astartes", "custodes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "high_lord_terra", "warmaster", "sector_lord",
        "planetary_governor", "magos", "fabricator_locum", "fabricator_general",
        "canoness", "cardinal", "lord_commissar", "commissar_general",
        "navy_admiral", "arbites_marshal", "departmento_head", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 하층 거주자",
    weight: 26,
    text: "어두운 언더하이브 복도에 번쩍이는 첨단 외계·고대 슈트를 입은 괴한들이 나타났다! 상층 첨탑 귀족 자제들이 성인식 겸 재미 삼아 하층민을 사냥하러 내려오는 '스파이어러 사냥단'이다!",
    choices: [
      {
        label: "[민첩 판정] 폐쇄된 증기 파이프 미로로 기어들어가 열화상 추적을 따돌린다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "고온 증기 속에 체온을 감추어 살인 귀족들의 추적을 완벽히 뿌리쳤다!",
          stats: { Ag: 6, Int: 4 }
        },
        fail: {
          text: "에너지 발톱에 등을 베였으나 가까스로 폐기물 슈트로 뛰어내려 목숨을 건졌다.",
          wounds: -28
        }
      },
      {
        label: "[백병 판정] 어차피 죽을 바엔 부비트랩을 터뜨려 귀족 놈 하나라도 끌어내린다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "고압 화학 탱크를 터뜨려 스파이어러 한 명을 쓰러뜨렸다! 언더하이브 전역에 전설로 회자되었다!",
          stats: { WS: 7, Inf: 8, WP: 5 }
        },
        fail: {
          text: "첨단 방어막에 공격이 튕겨 나가고 치명상을 입었다.",
          wounds: -32
        }
      }
    ],
    source: "Lexicanum: Spyrer / Necromunda"
  },
  {
    id: "ev_s3_world_necromunda_turf",
    title: "네크로문다 — 골리앗과 에셔의 하층 돔 항쟁",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "high_lord_terra", "warmaster",
        "sector_lord", "planetary_governor", "fabricator_general", "cardinal", "canoness", "navy_admiral",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다",
    weight: 34,
    text: "하이브 프리무스 하층 공업 돔의 정제수 파이프를 두고, 근육 강화 약물에 취한 하우스 골리앗 투사들과 독날 검을 든 하우스 에셔 암살자들이 전면 총격전을 벌이고 있다! 양쪽 모두 중립 길드의 물자와 통로를 탐내며 압박을 가한다.",
    choices: [
      {
        label: "[교섭 판정] 길드 상인 대표로 나서 두 클랜 하우스 사이의 정수 배분 휴전 협정을 중재하고 통행세를 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "총알 대신 이익으로 두 갱단을 설득했다! 네크로문다 하층 돔에서 누구도 함부로 못 건드리는 노련한 중재자로 이름을 날렸다.",
          stats: { Fel: 7, Inf: 8, Int: 4 }
        },
        fail: {
          text: "골리앗 두목이 협상 탁자를 뒤엎으며 난장판이 되어 도망치다 타박상을 입었다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[백병 판정] 난전 틈새로 기어들어 온 약탈자들을 직접 물리치고 구역 방어선을 지켜 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "무자비한 난투 끝에 약탈자들을 몰아내고 값비싼 암시장 장비까지 전리품으로 챙겼다!",
          stats: { WS: 6, T: 5, Inf: 5 }
        },
        fail: {
          text: "에셔의 독침과 골리앗의 쇠파이프에 크게 다쳤으나, 질긴 생명력으로 끝내 살아남았다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "강철 셔터를 단단히 내리고 두 클랜 하우스가 서로 지쳐 물러날 때까지 조용히 숨을 죽인다",
        effect: {
          text: "네크로문다에서 오래 사는 비결은 남의 구역 싸움에 공짜로 끼어들지 않는 것이다.",
          stats: { Ag: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Necromunda / House Goliath & House Escher"
  },
  {
    id: "ev_s6_world_mars_noctis",
    title: "화성 녹티스 미궁 — 봉인된 협곡 지하의 금지된 신호",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["mars"],
      excludeTags: [
        "fabricator_general", "high_lord_terra", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 화성",
    weight: 32,
    text: "화성 적도 부근의 거대한 협곡 지대 녹티스 미궁은 고대부터 황제와 화성 대현자들만이 출입을 통제하는 금단의 땅이다. 오늘 밤 외곽 감시탑의 지진파 측정 임무 도중, 기술의 암흑기 이전부터 봉인된 지하 수 킬로미터 아래에서 설명할 수 없는 황금빛 전자기 맥동과 오래된 기계의 꿈틀거림이 계측기에 포착되었다.",
    choices: [
      {
        label: "[지성 판정] 신호의 출처를 직접 파헤치지 않고 파형만 정밀 암호화해 화성 최상위 아크마고스 회의에 극비 보고한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금기를 깨지 않으면서도 결정적 이상 징후를 포착한 공로로 화성 대서고의 특별 접근 인가를 받았다!",
          stats: { Int: 8, Inf: 7, WP: 4 }
        },
        fail: {
          text: "계측기 회로가 정체불명의 전자기 펄스에 타 버리며 손에 화상을 입었으나, 기밀 유출은 막았다.",
          wounds: -12,
          stats: { Int: 4 }
        }
      },
      {
        label: "[의지 판정] 머릿속으로 스며드는 기묘한 강철의 꿈을 뿌리치고 즉시 봉인 경계선을 두 배로 넓힌다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "정체 모를 '용의 잠'을 건드리지 않은 냉철한 판단이었다! 화성 수비 사제단이 그대의 정신력을 높이 평가했다.",
          stats: { WP: 8, T: 4, Inf: 5 }
        },
        fail: {
          text: "며칠간 금속 톱니가 살을 파고드는 기괴한 악몽에 시달리며 기력을 소모했다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "측량 기록을 표준 교리에 따라 즉시 삭제하고 녹티스 미궁 경계에서 조용히 철수한다",
        effect: {
          text: "화성에서 오래 살아남는 비결은 황제가 잠재워 둔 비밀에 호기심을 품지 않는 것이다.",
          stats: { WP: 5, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Noctis Labyrinthus / Mechanicum"
  },
  {
    id: "ev_s6_world_mars_titan_walk",
    title: "화성 신기계 군단 — 임페라토르 타이탄의 첫 걸음과 성유 의례",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["mars"],
      excludeTags: [
        "dreadnought", "high_lord_terra", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 화성",
    weight: 30,
    text: "수백 년의 건조 끝에 마침내 성당 하나를 통째로 어깨에 얹은 초거대 전투 병기 '임페라토르급 타이탄'이 올림푸스 몬스 인근 조립 독에서 첫 걸음을 내딛는다. 대지가 지진처럼 흔들리고 전쟁 나팔이 붉은 하늘을 찢는 순간, 타이탄 왼쪽 다리 관절의 보조 냉각 밸브에서 고압 증기가 새어 나오기 시작했다.",
    choices: [
      {
        label: "[민첩 판정] 거대한 강철 발걸음의 진동을 뚫고 정비 크레인에 매달려 비상 냉각 밸브를 수동 잠금한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "신기계의 첫 행진을 흠집 없이 지켜 냈다! 프린셉스가 타이탄 확성기로 그대의 용기를 찬양하는 웅장한 경적을 울렸다.",
          stats: { Ag: 7, Int: 5, Inf: 7 },
          faith: 6
        },
        fail: {
          text: "고압 증기에 데이고 진동에 튕겨 나가 타박상을 입었으나, 밸브 폐쇄에는 성공했다.",
          wounds: -16,
          stats: { Ag: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 지상 관제실에서 누스피어 경고 회로를 우회해 압력을 보조 탱크로 즉시 분산시킨다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "단 한 초의 지연도 없이 출격 의례가 완벽히 진행되었다! 타이탄 군단 콜레기아 타이타니카의 찬사를 받았다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "일부 센서가 오작동해 출격이 지연되며 상급 기술 사제의 엄중한 질책을 받았으나, 타이탄 본체의 손상은 막아 냈다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "붉은 모래 위에 무릎을 꿇고 옴니시아의 살아 있는 화신이 전장으로 떠나는 장엄한 의례에 경배를 올린다",
        effect: {
          text: "거대한 신기계의 발자국이 가슴 깊이 울렸다. 인류제국과 기계교의 위엄을 뼈저리게 느꼈다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Collegia Titanica / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s15_su_mars_1",
    title: "화성 철의 고리 — 궤도 조선소 장갑 용접 사고와 출입 인가 분쟁",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["mars"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 화성 · 비초인 필멸자",
    weight: 30,
    text: "화성 적도를 둘러싼 거대 궤도 조선소 '철의 고리'의 제4건조 구역에서 순양함 뱃머리 장갑판 용접 중 플라즈마 절단기가 과열되어 폭발했다. 감압 경보가 울리며 외부 파견 정비병과 수송 승무원들이 격벽 안쪽에 갇혔지만, 현장 감독 테크프리스트는 보안 인가가 없는 외지인 구역으로 비상 통로를 여는 것은 기계교 규율 위반이라며 격벽 개방을 막고 있다.",
    choices: [
      {
        label: "[기계교 전용] 누스피어 우선 명령 코드를 전송해 격벽 개방과 대기 안정화를 기계령 의례 절차로 즉시 승인한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "성스러운 고위 명령 코드 앞에 감독 사제가 즉시 물러섰다! 감압 구역의 승무원 전원을 구출하고 선체 손상도 막아 냈다.",
          stats: { Int: 6, Inf: 7, WP: 4 },
          faith: 4
        }
      },
      {
        label: "[제국 함대/지휘관 전용] 제국 해군 조선 인계 규약을 들이밀어 선체 손실 책임을 추궁하며 구조 통로를 강제 개방한다",
        req: { anyTags: ["navy", "rogue_trader", "officer"] },
        effect: {
          text: "순양함 인계 지연 책임이라는 명분 앞에 기계교 현장 감독관이 마지못해 격벽을 열었다! 갇혀 있던 승무원들이 환호했다.",
          stats: { Inf: 7, Fel: 5, Int: 4 }
        }
      },
      {
        label: "[지성 판정] 보조 공기 정화 밸브를 우회 조작해 감압을 늦추며 고립된 승무원들을 안전 구역으로 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "보안 구획을 침범하지 않고도 압력을 안정시켜 전원을 무사히 대피시켰다! 조선소 사제단마저 그대의 정밀한 판단을 인정했다.",
          stats: { Int: 6, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "플라즈마 역류에 화상을 입고 무단 회로 조작으로 화성 조선소 감독관의 공식 경고를 받았다.",
          wounds: -18,
          stats: { Int: 2, Inf: -2 }
        }
      },
      {
        label: "[교섭 판정] 순양함 건조 지연이 화성 납기 기록에 남길 손실을 논리적으로 설득해 감독 사제의 허가를 받아 낸다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "감정이 아닌 생산 효율 수치로 사제를 설득했다! 격벽이 열리며 인명과 공정을 모두 지켜 냈다.",
          stats: { Fel: 6, Inf: 6, Int: 3 }
        },
        fail: {
          text: "기계교 서기관의 냉담한 거부로 구조가 지체되고 외지인 출입 등급이 한 단계 강등되었다.",
          stats: { Fel: -2, Inf: -4 }
        }
      },
      {
        label: "기계교 보안선 바깥에서 예비 냉각수와 의료 장비를 정렬해 격벽이 열리자마자 부상자들을 수용할 태세를 갖춘다",
        effect: {
          text: "규율을 어기지 않고 침착하게 후속 구호 태세를 준비해 불필요한 마찰과 추가 피해를 줄였다.",
          stats: { T: 3, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Ring of Iron / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s15_su_mars_2",
    title: "화성 포지 외곽 — 이탈한 서비터 호송대와 성유 탱크",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["mars"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 화성 · 비초인 필멸자",
    weight: 30,
    text: "화성 남부 포지 단지 외곽의 고압 송전로에서, 주조소 사이를 오가던 성유 탱크 수송차와 짐꾼 서비터 행렬이 갑작스러운 전자기 방전에 항법 링크를 잃고 방어 구획 바깥으로 이탈했다. 기울어진 탱크의 압력 밸브에서는 타이탄 관절에 쓰일 고순도 성유가 붉은 지표 위로 뿜어져 나오고 있으며, 명령을 잃은 서비터들이 무질서하게 배회하며 고압 케이블을 밟기 직전이다.",
    choices: [
      {
        label: "[기계교 전용] 누스피어 유도 비컨을 직접 동기화해 서비터 행렬을 정렬시키고 성유 탱크 압력을 즉시 안정화한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "정확한 이진법 명령에 서비터들이 일사불란하게 대형을 되찾고 귀중한 성유를 한 방울도 남김없이 회수했다.",
          stats: { Int: 6, T: 4, Inf: 6 }
        }
      },
      {
        label: "[지성 판정] 끊어진 송전탑 중계기를 수동 배선해 누스피어 유도 비컨을 되살리고 서비터 행렬을 안전 구역으로 불러들인다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "유도 신호가 복구되자 서비터 행렬이 일제히 안전 통로로 복귀했다! 주조소 사제단이 그대의 기민한 조치를 높이 평가했다.",
          stats: { Int: 7, Ag: 3, Inf: 6 }
        },
        fail: {
          text: "송전 중계기에서 튄 고압 방전에 손을 크게 데고 서비터 두 기가 망가져 주조소 감독관의 혹독한 문책을 받았다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[강인 판정] 정전기 불꽃과 고온 성유 증기를 견뎌 내며 기울어진 탱크의 압력 밸브를 힘껏 잠가 폭발을 막는다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "뜨거운 증기와 정전기 충격을 온몸으로 버텨 내고 압력 밸브를 완벽히 안정시켜 귀중한 성유 탱크를 지켜 냈다!",
          stats: { T: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "뿜어져 나온 뜨거운 성유 증기에 팔과 얼굴을 크게 데었으나 간신히 압력 밸브만은 잠갔다.",
          wounds: -20,
          stats: { T: 2 }
        }
      },
      {
        label: "고압 케이블 차단기만 먼저 내린 뒤 비상 발신기를 세워 주조소 정비 순찰대가 도착할 때까지 구역을 통제한다",
        effect: {
          text: "무리하게 접근하지 않고 감전 위험부터 차단한 덕분에 추가 피해 없이 정비 순찰대에 현장을 인계했다.",
          stats: { WP: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Mars / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s15_su_mars_3",
    title: "화성 대서고 외곽 — 데이터 성소의 이진법 감사와 외지 기술 사절",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["mars"],
      excludeHomeWorlds: ["mars"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "화성 파견 · 화성 외 출신 · 비초인",
    weight: 32,
    text: "외지에서 화성으로 파견된 그대가 대서고 외곽 데이터 성소의 출입 심사를 받던 날, 기계교 감찰 사제단이 외지 주조소에서 올라온 정비 사절단의 봉인 데이터 슬레이트를 전수 감사하기 시작했다. 육신 비중이 높은 외지인의 필체와 수동 기록 방식을 기계교 감찰관이 교리 미달로 트집 잡으며 사절단 전체의 화성 체류 자격을 정지하려 든다.",
    choices: [
      {
        label: "[제국 관료/심문소/귀족 전용] 테라와 화성 사이의 올림푸스 조약 문구를 인용해 제국 사절의 면책과 표준 절차 준수를 못 박는다",
        req: { anyTags: ["administratum", "inquisitor", "inquisition_agent", "noble"] },
        effect: {
          text: "올림푸스 조약의 공식 조항이 거론되자 감찰 사제가 전자음을 울리며 감사를 즉시 간소화했다! 외지 사절단이 깊이 감사했다.",
          stats: { Inf: 7, Int: 5, Fel: 5 }
        }
      },
      {
        label: "[지성 판정] 사절단의 수동 정비 도표를 화성 표준 이진법 색인 체계로 현장에서 재정렬해 제출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "외지인답지 않은 정교한 색인 정리에 감찰 사제단이 만족을 표하며 대서고 열람 통행증까지 발급해 주었다!",
          stats: { Int: 7, Inf: 6, WP: 3 }
        },
        fail: {
          text: "데이터 단말기 접속 중 신경 역류를 겪고 감사 불합격 판정을 받아 구금 심사를 치렀다.",
          wounds: -10,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[교섭 판정] 감찰 사제의 자존심을 건드리지 않도록 화성 본산의 권위를 찬미하며 보완 기한을 끌어낸다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "예의를 갖춘 격식과 겸손한 화법으로 사흘의 보완 유예를 얻어 내어 사절단의 추방을 막았다!",
          stats: { Fel: 6, Inf: 5, WP: 3 }
        },
        fail: {
          text: "외지인의 구두 변명이 무례한 잡음으로 치부되어 사절단 전체가 외곽 대기 숙소로 쫓겨났다.",
          stats: { Fel: -2, Inf: -4 }
        }
      },
      {
        label: "모든 이의 제기를 접고 기계교 감찰단이 요구하는 정화 서약서와 추가 서류를 말없이 작성해 제출한다",
        effect: {
          text: "화성 본산의 까다로운 절차를 묵묵히 감내하며 불필요한 기술 이단 혐의를 피했다.",
          stats: { WP: 5, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Treaty of Mars / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_s15_su_necromunda_1",
    title: "네크로문다 하이브 프리무스 — 외지 징병관 호위와 하우스 올록 승강기 봉쇄",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 비초인 필멸자",
    weight: 30,
    text: "아스트라 밀리타룸 신병 징발을 위해 하이브 프리무스 중층 환승 갑판에 내려온 외지 징병관 일행을 호위하며 상층과 중층을 잇는 대형 화물 승강기에 올랐다. 승강기가 중간 제련 구획에 멈춰 서는 순간, 임금 삭감과 강제 징병에 반발해 무장 파업에 나선 하우스 올록 광부 조합원들이 강철 셔터를 내리고 산탄총과 용접봉으로 승강기 출구를 포위했다!",
    choices: [
      {
        label: "[제국군/커미사르 전용] 승강기 화물 상자 뒤에 방어 진지를 꾸리고 제국 징병령의 무관용 원칙을 선포해 봉쇄 대열을 압박한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "commissar", "lord_commissar"] },
        effect: {
          text: "단호한 군법 집행 선언과 빈틈없는 사격 진형 앞에 파업 조합원들이 슬금슬금 물러났다! 외지 징병관이 그대의 위엄에 찬사를 보냈다.",
          stats: { BS: 5, Inf: 6, WP: 5 }
        }
      },
      {
        label: "[교섭 판정] 징병 할당에서 올록 조합 숙련 기술자들을 제외하겠다는 협상안을 제시해 파업 대표단에게 통로를 열게 한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "유혈 충돌 없이 숙련공 보호와 징병관 호위를 동시에 이루어 냈다! 하우스 올록 조합 간부가 감사의 인사를 남겼다.",
          stats: { Fel: 7, Inf: 6, Int: 3 }
        },
        fail: {
          text: "강경파 광부들이 협상 제안을 조롱하며 던진 화염병과 공구에 맞고 승강기 안으로 밀려났다.",
          wounds: -16,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[사격 판정] 승강기 상부 난간에서 셔터 구동 장치와 봉쇄 바리케이드를 정밀 제압 사격해 탈출 틈을 연다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정확한 제압 사격으로 봉쇄선을 흐트러뜨리고 징병관 일행을 상층 환승 통로까지 무사히 돌파시켰다!",
          stats: { BS: 7, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "광부들의 산탄 세례에 어깨를 맞고 충격으로 난간 아래 화물 상자 위로 굴러떨어졌다.",
          wounds: -20,
          stats: { BS: 2 }
        }
      },
      {
        label: "승강기 내부 비상 제동 장치를 걸어 두고 방탄 화물 상자 뒤에서 징병관을 엄호하며 하이브 집행대의 봉쇄 해제를 기다린다",
        effect: {
          text: "탄환과 쇠파이프가 철문을 두드리는 소음 속에서도 침착히 버텨 내어 인명 피해를 막았다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: House Orlock / Necromunda: House of Iron"
  },
  {
    id: "ev_s15_su_necromunda_2",
    title: "네크로문다 하층 돔 — 길드 통행세 갈등과 하우스 카우도르 광신도 폭동",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 비초인 필멸자",
    weight: 30,
    text: "상인 길드가 하층 돔 정화 구역의 통행세를 두 배로 올리자, 쓰레기 더미에서 구원을 외치던 하우스 카우도르 광신도들이 횃불과 장대 폭탄을 들고 세관 방벽으로 몰려들었다! 연기와 광신적인 찬송이 뒤섞인 시장 바닥에서 길드 용병들과 광신도들이 정면으로 충돌하기 직전이다.",
    choices: [
      {
        label: "[국교/아르비테스/커미사르 전용] 제국 신앙과 법의 정통 권위로 폭도들의 사적 난동을 꾸짖고 양측의 무장을 강제 해산시킨다",
        req: { anyTags: ["ecclesiarchy", "sororitas", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "위엄 있는 일갈에 광신도들이 횃불을 내려놓고 무릎을 꿇었다! 상인 길드 역시 폭리 징수를 거두어들이며 돔의 질서가 회복되었다.",
          stats: { Inf: 7, WP: 6, Fel: 4 },
          faith: 6
        }
      },
      {
        label: "[백병 판정] 세관 방벽을 넘어오는 장대 폭탄 돌격대를 앞장서 막아 내고 혼란을 진압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불붙은 장대를 쳐내고 선두 폭도들을 제압해 시장 구역의 대화재를 막아 냈다! 상인 길드가 두둑한 사례를 건넸다.",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "조잡한 화염 장대에 몸을 크게 데고 성난 군중에게 짓밟혀 중상을 입었다.",
          wounds: -22,
          stats: { T: 2 }
        }
      },
      {
        label: "[교섭 판정] 황제의 자비를 들먹이며 광신도 지도자에게 빈민 구호 통행 면제안을 제시해 군중의 분노를 가라앉힌다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "신앙의 명분과 실리를 절묘하게 엮어 유혈 사태를 멈추었다! 언더하이브 골목마다 그대의 노련한 처세가 회자되었다.",
          stats: { Fel: 7, Inf: 6, WP: 4 },
          addTags: ["streetwise"]
        },
        fail: {
          text: "길드와 광신도 양쪽 모두에게 배신자라는 돌팔매질을 당해 피투성이로 물러났다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "불길이 번지는 시장 광장에서 한발 물러나 상인과 주민들이 빠져나갈 뒷골목 대피로를 확보한다",
        effect: {
          text: "광신과 탐욕이 맞부딪힌 아수라장에서 무고한 주민 여럿을 안전 구역으로 빼냈다.",
          stats: { Ag: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: House Cawdor / Necromunda: House of Faith"
  },
  {
    id: "ev_s15_su_necromunda_3",
    title: "네크로문다 잿빛 황무지 — 장거리 화물 열차와 유목 약탈단 매복",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["necromunda"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 네크로문다 · 비초인 필멸자",
    weight: 28,
    text: "하이브 첨탑 바깥의 독성 모래바다인 잿빛 황무지를 가로지르는 거대 바퀴 화물 열차에 올랐다. 잿빛 폭풍이 몰아치는 협곡에서 거대한 곤충 탈것과 장갑 버기를 몰고 나타난 잿빛 황무지 유목 약탈단이 동력 연결관을 끊으려 화물차 측면에 갈고리를 걸었다!",
    choices: [
      {
        label: "[언더하이브 생존자/함대·개척상인 전용] 잿빛 황무지의 모래 지뢰 지대로 열차 속력을 끌어올려 추격대의 측면을 함정으로 몰아넣는다",
        req: { anyTags: ["streetwise", "rogue_trader", "navy"] },
        effect: {
          text: "모래 폭풍 속 지형지물을 완벽히 활용해 추격대를 따돌리고 화물 한 상자 잃지 않고 다음 하이브 관문에 도착했다!",
          stats: { Ag: 6, Int: 5, Inf: 6 }
        }
      },
      {
        label: "[사격 판정] 흔들리는 화차 난간에서 갈고리 줄과 약탈단 조종수의 시야 창을 정확히 저격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "거센 모래바람을 뚫고 선두 장갑 버기를 전복시켜 약탈단의 추격을 단숨에 꺾어 놓았다!",
          stats: { BS: 7, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "산성 독침 소총에 스치고 차체 충격에 나가떨어져 크게 다쳤다.",
          wounds: -20,
          stats: { BS: 2 }
        }
      },
      {
        label: "[강인 판정] 유독성 먼지 폭풍 속에서 외부 연결 갑판에 매달려 갈고리 쇠사슬을 도끼로 쳐낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "독성 바람을 온몸으로 견디며 모든 갈고리를 끊어 내어 화물 열차의 탈선을 막았다!",
          stats: { T: 6, WS: 5, Inf: 5 }
        },
        fail: {
          text: "방독면이 깨져 유독성 재를 들이마시며 가까스로 기관실로 기어 돌아왔다.",
          wounds: -22,
          stats: { T: 2 }
        }
      },
      {
        label: "기관실 방탄창 뒤에서 예비 동력을 전방 추진기에 집중시켜 후미 화물칸 하나를 떼어 내고 전속력으로 돌파한다",
        effect: {
          text: "적은 손실로 승무원 전원의 목숨과 핵심 화물을 지켜 내는 냉정한 판단이었다.",
          stats: { Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Ash Wastes / Necromunda: Ash Wastes"
  }
);
