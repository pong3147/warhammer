// 분기 사건 — 직군 계열: 이단심문소 · 어콜라이트 · 이단심문관 · 3대 오르도(헤레티쿠스/제노스/말레우스)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_inquisition_recruit",
    title: "그림자 속의 로제트 — 이단심문관의 비밀 지령",
    category: "이단심문소",
    once: true,
    req: {
      minAge: 18,
      stats: { Int: 50, WP: 50 },
      maxCorruption: 25,
      excludeTags: ["inquisition_agent", "inquisitor", "astartes", "custodes", "grey_knight", "abhuman", "heretic", "magos", "rogue_trader", "canoness", "lord_commissar"]
    },
    reqLabel: "18세+ · 지성 50+ · 의지 50+",
    weight: 14,
    text: "그대의 예리한 통찰력과 굳건한 정신력을 지켜본 이단심문소 요원이 밀실로 초대했다. 책상 위에는 황금 로제트와 오르도의 기밀 수사 교본이 놓여 있다. '인류를 갉아먹는 내부의 적을 사냥할 어콜라이트가 필요하다.'",
    choices: [
      {
        label: "[지성 판정] 시험 과제로 주어진 이단 암호를 해독하고 어콜라이트로 발탁된다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "숨겨진 컬트 접선 장소를 단번에 짚어 냈다! 그대는 이제 이단심문소 어콜라이트로서 비밀 전쟁에 뛰어든다.",
          forceCareer: "inquisition_acolyte",
          stats: { Int: 6, WP: 6, Inf: 12 },
          addTags: ["inquisition_agent"]
        },
        fail: {
          text: "암호 해독은 미완이었으나 충성심은 인정받아 심문소의 비공식 정보원으로 이름을 올렸다.",
          stats: { Int: 3, Inf: 5 },
          addTags: ["inquisition_favor"]
        }
      },
      {
        label: "이단심문소에 얽히는 건 너무 위험하다. 모른 척 물러난다",
        effect: {
          text: "요원은 침묵의 서약서를 내민 뒤 어둠 속으로 사라졌다.",
          stats: { WP: 2 }
        }
      }
    ],
    source: "Dark Heresy / Eisenhorn Trilogy"
  },
  {
    id: "ev_inquisitor_ordo",
    title: "로제트 수여와 오르도(Ordo) 선택",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], excludeTags: ["ordo_hereticus", "ordo_xenos", "ordo_malleus"] },
    reqLabel: "병종: 정식 이단심문관",
    weight: 50,
    text: "이제 절대 권력의 인장인 이단심문관 로제트가 그대의 손에 쥐어졌다. 은하계의 수많은 적 가운데 어떤 성스러운 오르도(Ordo)에 평생을 바칠 것인가?",
    choices: [
      {
        label: "오르도 헤레티쿠스 (마녀·이단·반역자 사냥꾼)",
        effect: {
          text: "제국 내부의 부패와 이단을 불태우는 심판자가 되었다. 국교와 소로리타스와의 연대가 강화된다.",
          stats: { WP: 6, Fel: 5, Inf: 8 },
          faith: 12,
          addTags: ["ordo_hereticus"]
        }
      },
      {
        label: "오르도 제노스 (외계인 위협 근절자)",
        effect: {
          text: "타이라니드, 오크, 네크론, 엘다의 음모를 추적하는 외계 전문가로 거듭났다. 데스워치 소집 권한을 확보했다.",
          stats: { Int: 6, BS: 5, Inf: 8 },
          addTags: ["ordo_xenos"]
        }
      },
      {
        label: "오르도 말레우스 (카오스 악마 사냥꾼)",
        effect: {
          text: "워프의 악마와 정면으로 맞서는 가장 위험한 길을 택했다. 그레이 나이트와 비밀리에 공조한다.",
          stats: { WP: 10, WS: 5, Inf: 8 },
          corruption: 4,
          addTags: ["ordo_malleus"]
        }
      }
    ],
    source: "Lexicanum: Inquisition"
  },
  {
    id: "ev_inquisition_purge",
    title: "이단심문소의 새벽 급습!",
    category: "위기",
    req: { minAge: 16, minCorruption: 42, excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "오염도 42+ (이단 의혹 경고)",
    weight: 28,
    text: "거처의 철문이 폭음과 함께 뜯겨 나갔다! 아르비테스와 이단심문소 스톰트루퍼들이 핫샷 라스건을 겨눈 채 외친다. '무릎 꿇어라, 이단자여! 오르도 헤레티쿠스의 이름으로 심문을 집행한다!'",
    choices: [
      {
        label: "[백병/사격 판정] 무기를 뽑고 포위망을 뚫어 지하로 도주한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "추격대를 쓰러뜨리고 도시 하층으로 잠적했다! 이제 돌이킬 수 없는 배교자·컬티스트의 길뿐이다.",
          forceCareer: "chaos_cultist",
          stats: { WS: 6, Ag: 5, Inf: -20 },
          wounds: -18,
          addTags: ["heretic", "wanted_by_inquisition"]
        },
        fail: {
          text: "이단심문소의 십자포화에 벌집이 되어 쓰러졌다. 기록부에는 '이단 정화 완료' 한 줄만 남았다.",
          instantDeath: "이단심문소의 급습에 저항하다 핫샷 라스건 세례로 즉결 처형"
        }
      },
      {
        label: "[권위 58+ 또는 교섭 55+ 해금] 정치적 연줄과 완벽한 알리바이로 무고를 주장한다",
        req: { or: [{ stats: { Inf: 58 } }, { stats: { Fel: 55 } }] },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "교묘한 말재주와 배후의 권력으로 혐의를 다른 희생양에게 떠넘겼다! 심문소는 물러났다.",
          stats: { Fel: 5, Inf: -6 },
          corruption: -10
        },
        fail: {
          text: "변명이 통하지 않아 고문실에서 몇 달간 참혹한 '참회 심문'을 받은 뒤 간신히 풀려났다.",
          wounds: -35,
          stats: { Inf: -15 },
          corruption: -18
        }
      },
      {
        label: "순순히 무릎을 꿇고 자백하며 자비로운 처분을 구한다",
        effect: {
          text: "이단심문소에 '무고함은 아무것도 증명하지 못한다.' 고문 끝에 그대는 아코-플래젤런트나 화장터로 보내졌다.",
          instantDeath: "이단 혐의로 이단심문소에 체포되어 정화의 화형에 처해짐"
        }
      }
    ],
    source: "Lexicanum: Inquisition"
  },
  {
    id: "ev_job_inquisition_exterminatus",
    title: "이단심문관의 서명 — 익스터미나투스(행성 정화) 딜레마",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    reqLabel: "직업: 제국 이단심문관",
    weight: 26,
    text: "인구 40억의 하이브 월드 하층부 60%에 진스틸러 컬트와 카오스 변이가 동시에 퍼졌다. 궤도 순양함 함장이 사이클론 어뢰 발사 승인 코드를 기다리고 있다. 40억의 목숨인가, 성계 전체의 감염인가.",
    choices: [
      {
        label: "황제의 자비로운 화염으로 행성을 정화한다 — 익스터미나투스 집행",
        effect: {
          text: "행성 지표 전체가 불길에 삼켜졌다. 수십억 영혼의 무게가 어깨를 짓누르지만, 성계 전체의 재앙은 단 한 번의 서명으로 차단되었다.",
          stats: { Inf: 12, WP: 6, Fel: -6 },
          faith: -4
        }
      },
      {
        label: "[지성/무력 판정] 폭격을 보류하고 직접 정예 강습대를 이끌어 컬트 수장을 암살한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "기적적인 참수 작전으로 하이브 월드의 40억 시민을 구해 냈다! 이단심문소 내 청교도파의 영웅이 되었다.",
          stats: { Int: 8, WS: 5, Inf: 14, Fel: 6 },
          faith: 15
        },
        fail: {
          text: "작전 도중 치명상을 입고 퇴각했으며, 결국 행성은 끝없는 내전 지옥에 빠졌다.",
          wounds: -34,
          stats: { Inf: -6 }
        }
      }
    ],
    source: "Lexicanum: Exterminatus"
  },
  {
    id: "ev_rank_acolyte_undercover",
    title: "어콜라이트의 그림자 — 버려질 수 있는 장기말",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["inquisition_acolyte"] },
    reqLabel: "계급: 이단심문소 어콜라이트",
    weight: 26,
    text: "스승 이단심문관이 암호 전문으로 하층 귀족 사교계에 숨어든 진스틸러·카오스 혼합 컬트에 위장 잠입하라고 명했다. '정체가 탄로 나면 나는 너를 모른다고 답할 것이다. 로제트를 원한다면 살아서 증거를 가져오라.'",
    choices: [
      {
        label: "[교섭 판정] 타락한 귀족 행세를 완벽히 연기해 컬트 간부 명단을 통째로 빼낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "아무 의심도 받지 않고 핵심 명단을 탈취했다! 스승 이단심문관이 그대를 차기 심문관 후보(인터로게이터)로 격상했다.",
          stats: { Fel: 6, Int: 6, Inf: 10 }
        },
        fail: {
          text: "정체가 발각되어 암살자들의 포위망을 피투성이로 뚫고 겨우 탈출했다.",
          wounds: -28,
          stats: { WS: 4 }
        }
      },
      {
        label: "[지성 판정] 직접 잠입 대신 통신 감청과 회계 장부 추적만으로 배후를 밝혀낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치밀한 데스크 수사로 3개 은신처를 정확히 특정해 깔끔한 급습을 이끌었다.",
          stats: { Int: 7, Inf: 7 }
        },
        fail: {
          text: "역정보에 속아 헛다리를 짚는 바람에 스승에게 차가운 질책을 받았다.",
          stats: { Inf: -5 }
        }
      }
    ],
    source: "Dark Heresy / Imperium Maledictum"
  },
  {
    id: "ev_inquisition_radical_puritan",
    title: "이단심문소 비밀 회의 — 청교도파 vs 급진파",
    category: "이단심문소",
    req: { anyCareers: ["inquisition_acolyte", "inquisition_interrogator", "inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    reqLabel: "이단심문소 소속",
    weight: 22,
    text: "오르도 비밀 콘클라베에서 격론이 터졌다. 급진파 심문관이 '다가오는 악마 군단을 막기 위해 포획한 데몬호스트(악마 빙의체)를 역이용하자'고 주장하자 청교도파가 볼터를 빼 들며 대치한다!",
    choices: [
      {
        label: "[청교도파] 악마의 힘을 빌리는 자는 이미 이단이다! 단호히 숙청 편에 선다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "청교도파 다수의 지지를 얻어 위험한 데몬호스트 실험을 봉쇄하고 명성을 쌓았다!",
          stats: { WP: 6, Inf: 8 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "급진파의 역공에 밀려 암살 시도를 겪으며 부상을 입었다.",
          wounds: -20
        }
      },
      {
        label: "[급진파] 제국이 살아남을 수 있다면 지옥의 불이라도 훔쳐 써야 한다! 급진파에 동조한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "금지된 지식과 비밀 정보망을 공유받으며 압도적 성과를 올렸지만 영혼에 어둠이 스몄다.",
          stats: { Int: 8, Inf: 8 },
          corruption: 14,
          faith: -10
        },
        fail: {
          text: "통제에서 벗어난 워프 에너지에 휘말려 큰 내상을 입었다.",
          wounds: -24,
          corruption: 16
        }
      }
    ],
    source: "Lexicanum: Puritan & Radical / Eisenhorn"
  },
  {
    id: "ev_rank_inquisitor_conclave",
    title: "이단심문관 — 성역 비밀 회의(Conclave)와 급진파 탄핵 표결",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    reqLabel: "계급: 제국 이단심문관(인퀴지터)",
    weight: 28,
    text: "성역 이단심문관 12명이 모인 극비 콘클라베(회의). 같은 오르도 소속 선배 이단심문관이 악마 무기를 사용해 카오스 침공을 막아 낸 사건을 두고 '이단 선고(익스커뮤니케이트 트레이터리스)' 찬반 표결이 6 대 5로 팽팽하다. 마지막 한 표가 그대의 손에 달렸다!",
    choices: [
      {
        label: "[의지 판정] 청교도파의 이름으로 '카오스의 도구는 결국 주인을 삼킨다'며 단호히 탄핵에 표를 던진다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "청교도파 다수의 지지를 얻어 성역 내 오염된 급진파 인맥을 일소했다! 오르도 내 권위와 순결함이 드높아졌다.",
          stats: { WP: 7, Inf: 9 },
          faith: 12,
          corruption: -10
        },
        fail: {
          text: "표결 후 급진파 자객의 암살 시도를 가까스로 막아 냈다. 이단심문소 내부 전쟁은 언제나 그림자 속에서 벌어진다.",
          wounds: -18,
          stats: { WS: 4, Inf: 4 }
        }
      },
      {
        label: "[지성 판정] 현실적 급진파의 입장에서 '인류를 구한 공적과 금단의 지식을 회수·통제하자'고 중재한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "탄핵 대신 비밀 봉인 및 감시 조건으로 타협안을 이끌어 내고, 막강한 급진파 정보망의 빚을 받아 냈다!",
          stats: { Int: 7, Inf: 10, Fel: 5 },
          corruption: 6
        },
        fail: {
          text: "청교도파 원로들이 그대마저 의심의 눈초리로 기록부에 올렸다.",
          stats: { Inf: -5, Int: 3 },
          corruption: 5
        }
      }
    ],
    source: "Dark Heresy / Eisenhorn & Ravenor Lore"
  },
  {
    id: "ev_arc_ordo_hereticus",
    title: "오르도 헤레티쿠스 — 주교구 성유물 조작과 배교 추기경의 음모",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], allTags: ["ordo_hereticus"] },
    reqLabel: "이단심문관 · 오르도 헤레티쿠스",
    weight: 38,
    text: "관할 성역의 대주교구가 '새로운 황제의 성유물'이라며 대규모 순례세를 거두어들이고 있다. 비밀 첩보에 따르면, 추기경의 지하 예배당에서 금지된 워프 의식과 세금 횡령이 동시에 벌어지고 있다는 증언이 입수되었다.",
    choices: [
      {
        label: "[지성 판정] 아뎁타 소로리타스 전투 수녀 분견대와 함께 대성당 지하 서고를 급습해 이단 장부를 압수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "지하 납골당에서 가짜 성유물과 배교 추기경의 카오스 서약서를 찾아냈다! 오르도 헤레티쿠스 의회가 그대의 단호한 정화를 찬사했다.",
          stats: { Int: 6, WP: 5, Inf: 8 },
          faith: 10
        },
        fail: {
          text: "추기경 측 무장 광신도들의 매복에 휘말려 부상을 입었으나, 결국 성당을 진압하고 잔당을 심문소에 압송했다.",
          wounds: -18,
          stats: { WP: 3, Inf: -2 }
        }
      },
      {
        label: "[교섭 판정] 행성 총독과 시노드 원로들에게 증거를 들이밀어 내전 없이 이단 추기경을 조용히 숙청하게 만든다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "민중의 신앙이 흔들리기 전에 주교구 스스로 배교자를 단죄하도록 압박했다. 한 방울의 내전 피도 흘리지 않고 성역을 정화했다.",
          stats: { Fel: 6, Int: 4, Inf: 9 }
        },
        fail: {
          text: "정치적 흥정 도중 정보가 새어 추기경이 워프 밀수선으로 도주했다. 뒤늦게 추격령을 내렸으나 위신에 흠집이 남았다.",
          wounds: -10,
          stats: { Inf: -4 },
          corruption: 3
        }
      },
      {
        label: "성당 구역 전체를 봉쇄하고 이단심문관 로제트의 권한으로 공개 화형 심판을 집행한다",
        effect: {
          text: "불길과 공포 속에 배교자들은 재가 되었고, 행성 전역에 오르도 헤레티쿠스의 엄혹한 이름이 각인되었다.",
          stats: { Inf: 6, WP: 4, Fel: -3 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Ordo Hereticus / Codex: Imperial Agents"
  },
  {
    id: "ev_arc_ordo_xenos",
    title: "오르도 제노스 — 광산 위성의 진스틸러 교단과 데스워치 소집령",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], allTags: ["ordo_xenos"] },
    reqLabel: "이단심문관 · 오르도 제노스",
    weight: 38,
    text: "변방 광산 위성의 노동자 조합이 3대에 걸쳐 '네 팔의 황제'를 숭배하며 외부 감찰관을 살해했다는 보고가 올라왔다. 전형적인 진스틸러 교단의 봉기 직전 징후이며, 방치하면 하이브 함대를 불러들일 재앙이다.",
    choices: [
      {
        label: "[권위 판정] 인근 워치 포트리스에 데스워치 킬 팀 파견을 요청해 패트리아크 둥지를 직접 소탕한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "검은 갑주의 데스워치 베테랑들과 합동 강습을 감행해 지하 패트리아크의 머리를 베어 냈다! 성계 전체를 포식의 위기에서 구해 냈다.",
          stats: { Inf: 8, BS: 5, WS: 4 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "패트리아크의 발톱에 중상을 입었으나 데스워치 킬 팀의 엄호로 둥지를 멜타 폭탄으로 붕괴시키는 데 성공했다.",
          wounds: -20,
          stats: { T: 4, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 위성으로 흘러든 외계 무기 밀수망을 역추적해 배후의 드루카리 해적 접선까지 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "진스틸러 봉기를 부추겨 노예를 낚아채려던 드루카리 약탈선까지 궤도 함포로 격침했다! 오르도 제노스 교과서에 실릴 수사였다.",
          stats: { Int: 8, Ag: 4, Inf: 7 }
        },
        fail: {
          text: "추적 도중 외계 독침 함정에 걸려 부상을 입었으나, 교단 지휘부의 암호 장부는 확보했다.",
          wounds: -16,
          stats: { Int: 3 }
        }
      },
      {
        label: "궤도 함대에 광산 구역 정밀 폭격을 명령해 하이브 함대 유인 신호를 원천 차단한다",
        effect: {
          text: "수십만 명의 광부가 붕괴한 갱도와 함께 묻혔으나, 성역은 외계 포식자의 시선을 피했다. 이것이 오르도 제노스의 냉혹한 계산이다.",
          stats: { Inf: 5, Int: 4, Fel: -4 }
        }
      }
    ],
    source: "Lexicanum: Ordo Xenos / Deathwatch RPG"
  },
  {
    id: "ev_arc_ordo_malleus",
    title: "오르도 말레우스 — 악마숙주 소환 의식과 타이탄의 은빛 전사들",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], allTags: ["ordo_malleus"] },
    reqLabel: "이단심문관 · 오르도 말레우스",
    weight: 38,
    text: "고위 귀족 저택 지하에서 워프 균열이 찢어지며 거대한 그레이터 데몬이 현실 우주로 발을 내딛고 있다! 공기 중의 촛불이 거꾸로 타오르고 호위 병사들의 눈에서 피눈물이 흐르기 시작한다.",
    choices: [
      {
        label: "[의지 판정] 그레이 나이트 타격 분대와 공조해 악마의 진명을 영창하며 워프로 추방한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "은빛 네메시스 포스 웨폰과 그대의 성스러운 진명 봉인이 맞물리며 악마가 비명을 지르고 흩어졌다! 악마의 천적으로 이름을 새겼다.",
          stats: { WP: 9, Inf: 8 },
          faith: 10,
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "워프 화염에 심각한 화상과 정신 타격을 입었으나, 그레이 나이트 형제들이 최후의 일격으로 균열을 닫았다.",
          wounds: -24,
          stats: { WP: 4 },
          corruption: 8
        }
      },
      {
        label: "[지성 판정] 급진파 교리에 따라 소환진을 역설계해 악마를 구속하고 카오스 워밴드의 다음 침공 좌표를 뽑아낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금지된 사슬로 악마의 자백을 뜯어낸 뒤 소각했다! 수많은 행성을 구할 기밀을 얻었으나 영혼에 짙은 그림자가 스며들었다.",
          stats: { Int: 9, WP: 4, Inf: 7 },
          corruption: 14
        },
        fail: {
          text: "구속진이 순간 풀리며 악마의 저주가 정신을 할퀴고 지나갔다. 간신히 봉인했으나 끔찍한 오염이 남았다.",
          wounds: -22,
          corruption: 18
        }
      },
      {
        label: "봉쇄 작전 후 악마를 목격한 행성 방위군 전원의 기억 소거와 비밀 격리 명령서에 서명한다",
        effect: {
          text: "공포스러운 진실은 비밀 기록고에 봉인되었고, 목격자들은 침묵 속으로 사라졌다. 오르도 말레우스의 의무는 자비를 허락하지 않는다.",
          stats: { WP: 5, Inf: 5, Fel: -5 },
          faith: -4
        }
      }
    ],
    source: "Lexicanum: Ordo Malleus / Codex: Grey Knights"
  },
  {
    id: "ev_arc_inquisition_debt",
    title: "심문소 신임의 대가 — 검은 인장이 찍힌 비밀 소환장",
    category: "이단심문소",
    once: true,
    req: { allTags: ["inquisition_favor"], excludeTags: ["inquisitor", "custodes", "grey_knight", "heretic"] },
    reqLabel: "이력: 심문소 신임",
    weight: 34,
    text: "이단심문소의 호의는 결코 공짜가 아니다. 한밤중 문틈으로 검은 밀랍 인장이 찍힌 암호 서신이 밀려 들어왔다. '그대가 과거 쌓은 신임을 증명할 때가 왔다. 부패한 성계 징세관의 비밀 장부를 회수하라.'",
    choices: [
      {
        label: "[지성 판정] 소환에 응해 심야의 행정관 저택에서 이단 자금 거래 장부를 흔적 없이 빼내어 바친다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "경비 서비터의 순찰 주기를 정확히 파고들어 장부를 확보했다! 이단심문관이 그대의 역량에 깊은 만족을 표했다.",
          stats: { Int: 6, Ag: 4, Inf: 8 }
        },
        fail: {
          text: "경보 장치가 울려 호위대와 총격전을 벌인 끝에 부상을 입고 겨우 장부 사본만 챙겨 빠져나왔다.",
          wounds: -18,
          stats: { Inf: -2, Ag: 2 }
        }
      },
      {
        label: "[교섭 판정] 직접 잠입하는 대신 현지 인맥을 가동해 밀수선 항로와 접선자 명단만 정교하게 넘긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "손에 피를 묻히지 않고도 심문소가 원하는 핵심 고리를 정확히 짚어 주었다. 정보원으로서의 가치가 한층 높아졌다.",
          stats: { Fel: 6, Inf: 6 }
        },
        fail: {
          text: "중간 정보원이 배신해 엉뚱한 창고를 짚는 실수를 저질렀다. 심문소의 차가운 경고를 받았다.",
          stats: { Inf: -4, WP: 3 }
        }
      },
      {
        label: "[특별 청원] 정식으로 이단심문소 어콜라이트 수행단에 합류하겠다고 서약한다",
        req: {
          excludeTags: [
            "astartes",
            "custodes",
            "grey_knight",
            "inquisition_agent",
            "inquisitor",
            "mechanicus",
            "abhuman",
            "sororitas",
            "canoness",
            "rogue_trader",
            "commissar",
            "lord_commissar",
            "officer",
            "scion"
          ]
        },
        effect: {
          text: "비밀 연락관이 조용히 고개를 끄덕이며 어콜라이트 식별 문장을 건넸다. 이제 그대는 그림자 속의 심판자로 새 삶을 시작한다.",
          forceCareer: "inquisition_acolyte",
          addTags: ["inquisition_agent"],
          stats: { Inf: 10, WP: 5, Int: 4 }
        }
      },
      {
        label: "적법한 범위 안에서만 목격 진술서를 제출하고 조용히 거리를 유지한다",
        effect: {
          text: "지나치게 깊이 얽히지 않으려는 신중함이 목숨을 지켰다. 심문소는 더 이상 묻지 않고 어둠 속으로 물러났다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Dark Heresy: Core Rulebook / Imperium Maledictum"
  },
  {
    id: "ev_arc_wanted_manhunt",
    title: "심문소 수배령 — 우주 항구의 포위망과 암살자 추격",
    category: "위기",
    once: true,
    req: { allTags: ["wanted_by_inquisition"] },
    reqLabel: "이력: 심문소 수배",
    weight: 38,
    text: "우주 항구 전광판과 아르비테스 검문소마다 그대의 얼굴과 체포 영장이 송출되고 있다! 설상가상으로 어두운 골목 위 난간에서 정체를 알 수 없는 검은 신스스킨 차림의 추적자가 저격 조준경을 맞춘 섬광이 번쩍였다.",
    choices: [
      {
        label: "[민첩 판정] 항구 하수 배관과 폐열 통로를 타고 검문망을 뚫어 밀수 화물선에 몰래 올라탄다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "총탄이 철판을 긁는 아슬아슬한 순간에 화물칸 틈새로 몸을 던져 포위망을 완벽히 따돌렸다!",
          stats: { Ag: 7, Int: 5 },
          wounds: -8
        },
        fail: {
          text: "어깨를 스친 저격탄에 큰 피를 흘리며 겨우 폐기물 슈트로 굴러 떨어져 목숨만 건졌다.",
          wounds: -24,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[교섭 판정] 언더하이브 암시장 정보상에게 거액을 건네 사망 위조 기록을 만들어 신분을 세탁한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행정국 부고 장부에 '화재로 신원 불명 사망' 기록을 심어 넣는 데 성공했다! 당분간 추적자들의 눈을 돌릴 수 있게 되었다.",
          stats: { Fel: 7, Inf: 5 }
        },
        fail: {
          text: "정보상이 현상금을 노리고 밀고하는 바람에 매복을 당했다. 간신히 피를 보고 빠져나왔다.",
          wounds: -18,
          stats: { Inf: -6 }
        }
      },
      {
        label: "폐쇄된 동력 구역으로 추적자를 유인해 증기 밸브를 터뜨리고 어둠 속으로 흩어진다",
        effect: {
          text: "하얀 고압 증기 속에 시야가 차단된 틈을 타 현장을 벗어났다. 화상은 남았으나 목숨은 부지했다.",
          stats: { WS: 4, T: 2 },
          wounds: -14,
          corruption: 4
        }
      }
    ],
    source: "Dark Heresy: Radicals Handbook / Lexicanum: Inquisition"
  },
  // =========================================================================
  // 12단계: 이단심문소 어콜라이트(3종) · 이단심문관(1종) 심화 사건 4종
  // =========================================================================
  {
    id: "ev_s12_acolyte_interrogator",
    title: "이단심문소 어콜라이트 — 심문자(Interrogator) 승격 최종 시험",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisition_acolyte"], excludeTags: ["interrogator_rank"] },
    reqLabel: "직군: 이단심문소 어콜라이트",
    weight: 36,
    text: "수년간 그대를 지켜본 주군 이단심문관이 밀실로 불러 세 가지 봉인 파일을 내밀었다. '귀족 살인 사건의 배후에 카오스 교단이 숨어 있다. 지원도 신분 보장도 없이 48시간 안에 주모자의 진짜 이름을 가져온다면 그대를 정식 심문자(Interrogator)로 임명하마.'",
    choices: [
      {
        label: "[지성 판정] 시신의 룬 문양과 성당 헌금 장부를 역추적해 귀족 가문 집사가 배후 교주임을 완벽히 입증한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 30시간 만에 증거와 자백서를 주군 책상 위에 올려놓았다! 스승이 그대에게 심문자의 은빛 인장을 수여했다.",
          stats: { Int: 8, Inf: 9, WP: 5 },
          addTags: ["interrogator_rank"]
        },
        fail: {
          text: "교단의 거짓 단서에 속아 함정에 빠졌으나 간신히 살아 돌아와 주모자의 정체를 밝혀냈다.",
          wounds: -18,
          stats: { Int: 4, Inf: 5 },
          addTags: ["interrogator_rank"]
        }
      },
      {
        label: "[교섭 판정] 하층 정보상과 부패한 귀족 시종들을 교묘히 압박해 주모자가 스스로 정체를 드러내게 만든다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "피 한 방울 흘리지 않고 교주와 공범 7명을 일망타진했다! 주군이 그대의 수사 수완을 극찬하며 심문자로 임명했다.",
          stats: { Fel: 8, Inf: 9, Int: 4 },
          addTags: ["interrogator_rank"]
        },
        fail: {
          text: "정보상이 배신해 추격전을 치렀으나 끝내 사건을 해결해 신뢰를 얻었다.",
          wounds: -14,
          stats: { Fel: 4, Ag: 4 }
        }
      },
      {
        label: "무리한 단독 돌입 대신 아르비테스 정예와 은밀히 공조해 교단 아지트 전체를 포위 검거한다",
        effect: {
          text: "화려하진 않았지만 완벽하고 안전한 수사였다. 주군이 다음 로제트 계승 후보로 그대를 주목하기 시작했다.",
          stats: { Int: 5, Inf: 6, WP: 4 }
        }
      }
    ],
    source: "Dark Heresy Core / Lexicanum: Interrogator"
  },
  {
    id: "ev_s12_acolyte_safehouse",
    title: "이단심문소 어콜라이트 — 비밀 안전가옥 노출과 암호 문서",
    category: "이단심문소",
    req: { anyCareers: ["inquisition_acolyte"] },
    reqLabel: "직군: 이단심문소 어콜라이트",
    weight: 28,
    text: "자정 무렵, 심문소 비밀 안전가옥 바깥 골목에서 소음기 장착 오토건으로 무장한 정체불명의 암살자 8명이 건물을 포위했다! 책상 위에는 6개월간 모아 온 성역 이단 조직망 암호 문서가 놓여 있다.",
    choices: [
      {
        label: "[민첩 판정] 암호 문서를 품에 쑤셔 넣고 지붕 환기구를 통해 빗발치는 총탄 사이로 탈출한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "어둠 속 지붕을 타고 추적자들을 완벽히 따돌렸다! 목숨 걸고 지켜 낸 문서 덕분에 성역 전체의 이단망이 궤멸되었다.",
          stats: { Ag: 7, Int: 5, Inf: 7 }
        },
        fail: {
          text: "어깨에 총탄을 스치며 피를 흘렸으나 끝내 문서를 주군에게 전달하는 데 성공했다.",
          wounds: -20,
          stats: { Ag: 4, WP: 4 }
        }
      },
      {
        label: "[사격 판정] 안전가옥 내부에 설치해 둔 함정을 터뜨리고 헬건 사격으로 암살조를 역으로 섬멸한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "함정에 갇힌 암살조를 깔끔하게 제압하고 생포한 지휘관에게서 배후 세력의 자백까지 받아 냈다!",
          stats: { BS: 8, WS: 4, Inf: 7 }
        },
        fail: {
          text: "실내 총격전 끝에 큰 부상을 입었으나 문서는 불타지 않고 무사히 지켜 냈다.",
          wounds: -22,
          stats: { BS: 4, T: 4 }
        }
      },
      {
        label: "보안 규정에 따라 즉시 소이탄으로 암호 문서를 완전 소각하고 비상 지하 통로로 철수한다",
        effect: {
          text: "6개월의 수사는 날아갔지만 단 한 명의 정보원 신원도 적에게 넘어가지 않았다. 철칙을 지켰다.",
          stats: { WP: 5, Int: 4 }
        }
      }
    ],
    source: "Dark Heresy 2e / Eisenhorn Trilogy"
  },
  {
    id: "ev_s12_acolyte_master_fall",
    title: "이단심문소 어콜라이트 — 스승 심문관의 금지된 실험 목격",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisition_acolyte"] },
    reqLabel: "직군: 이단심문소 어콜라이트",
    weight: 30,
    text: "늦은 밤 스승 이단심문관의 지하 연구실에 보고서를 올리러 들어갔다가 충격적인 장면을 보았다. 스승이 묶어 둔 죄수의 몸에 워프 악마를 가두는 '악마숙주(Daemonhost)' 소환진을 그리고 있었다! 스승은 돌아보며 '제국을 구할 거대한 적을 막기 위한 불가피한 무기다'라고 속삭인다.",
    choices: [
      {
        label: "[의지 판정] 스승이라 해도 선을 넘었다 — 즉시 라스피스톨을 겨누고 소환진을 파괴한 뒤 콘클라베에 고발한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "치열한 사투 끝에 소환진을 깨뜨리고 스승을 체포했다! 청교도파 콘클라베가 그대의 흔들리지 않는 순결을 높이 평가했다.",
          stats: { WP: 8, Inf: 9, WS: 4 },
          faith: 10
        },
        fail: {
          text: "스승의 사이킥 반격에 중상을 입고 도주했으나, 콘클라베에 정식 고발장을 올리는 데는 성공했다.",
          wounds: -22,
          stats: { WP: 5, Inf: 5 }
        }
      },
      {
        label: "[지성 판정] 당장 맞서지 않고 스승의 논리와 금지된 의식 기록을 냉철히 분석하며 급진파의 경계를 이해한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "어둠을 써서 더 큰 어둠을 막는 급진파의 위험한 비술을 터득했다. 지식과 권력은 커졌으나 영혼에 그림자가 드리웠다.",
          stats: { Int: 8, WP: 5, Inf: 6 },
          corruption: 10
        },
        fail: {
          text: "의식 잔류 파동에 휘말려 며칠간 악몽에 시달렸고 오염이 스며들었다.",
          corruption: 12,
          stats: { Int: 4 }
        }
      },
      {
        label: "보지 못한 척 조용히 문을 닫고 나와 타 오르도 심문관에게 익명으로 감찰 요청을 보낸다",
        effect: {
          text: "석 달 뒤 스승이 비밀리에 실종 처리되었다. 살아남은 수행원만이 다음 로제트를 쥔다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Eisenhorn: Hereticus / Dark Heresy: Radicals Handbook"
  },
  {
    id: "ev_s12_inquisitor_retinue",
    title: "제국 이단심문관 — 새 수행단(Retinue) 편성과 결함 있는 정예들",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"] },
    reqLabel: "직군: 제국 이단심문관",
    weight: 30,
    text: "거대한 성역 음모를 파헤치기 위해 새로운 직속 수행단을 꾸려야 한다. 감옥과 전선에서 세 명의 탁월하지만 위험한 후보가 추천되었다. 전직 살인마 출신 데스컬트 암살자, 이단 누명을 쓴 천재 기계교 추방자, 그리고 성질 고약한 퇴역 아르비테스 베테랑이다.",
    choices: [
      {
        label: "[교섭 판정] 세 명 모두를 불러 모아 로제트의 이름으로 각자의 약점을 쥐고 완벽한 다기능 수행단으로 길들인다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "서로 으르렁거리던 세 인재가 그대의 카리스마 아래 최강의 비밀 요원 팀으로 거듭났다! 이후 모든 수사가 일사천리로 풀렸다.",
          stats: { Fel: 8, Inf: 8, Int: 5 }
        },
        fail: {
          text: "추방자 기계교도가 기밀 장비를 건드리다 사고를 냈으나 나머지는 훌륭히 정착했다.",
          stats: { Inf: 4, Int: 4 }
        }
      },
      {
        label: "[의지 판정] 청교도 원칙대로 오염 우려가 있는 둘을 배제하고 가장 충직한 퇴역 아르비테스만 정예로 등용한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "단 한 치의 배신 우려도 없는 철벽 수행단이 완성되었다! 콘클라베에서도 모범적인 인선이라 호평했다.",
          stats: { WP: 7, Inf: 6, WS: 4 },
          faith: 6
        },
        fail: {
          text: "인원이 부족해 수사가 다소 길어졌으나 끝내 배신 없는 신뢰 관계를 구축했다.",
          stats: { WP: 4, Inf: 3 }
        }
      },
      {
        label: "세 후보에게 각자 소규모 예비 임무를 맡겨 살아남아 증명한 자만 정식 어콜라이트로 들인다",
        effect: {
          text: "잔혹하지만 확실한 이단심문소 전통 검증법으로 가장 믿을 만한 심복을 얻었다.",
          stats: { Int: 5, Inf: 6 }
        }
      }
    ],
    source: "Dark Heresy / Eisenhorn & Ravenor Trilogies"
  }
);

