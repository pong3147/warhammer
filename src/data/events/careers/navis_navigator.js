// 분기 사건 — 직군 계열: 나비스 노빌리테 (제국 항법사 가문 · 파테르노발 특사)
export default [
  {
    id: "ev_s17_nav_first_blind_jump",
    title: "안대 너머의 심연 — 첫 맹목 워프 도약",
    category: "나비스 노빌리테",
    once: true,
    req: {
      anyCareers: ["nav_apprentice"],
      allTags: ["navigator"]
    },
    reqLabel: "직군: 견습 항법사 · 항해사",
    weight: 35,
    text: "변방 항로를 순찰하던 호위함의 황동 항법탑이 매캐한 오존 냄새로 가득 찼다. 갑작스러운 워프 역류에 스승 선임 항법사가 피를 토하며 양수 탱크 앞에 쓰러진 바로 그 순간, 오크 약탈선 편대가 사정거리 안으로 들이닥쳤다. 설상가상으로 짙은 워프 돌풍이 아스트로노미칸의 금빛 등불을 흐려 놓아, 정상적인 항로 측량조차 불가능한 상황이다. 함교 복스에서는 함장이 당장 워프 기관을 가동하지 않으면 선체가 두 동강 난다며 절박하게 외쳐 대고, 이제 갓 비단 띠를 두른 견습 항법사인 그대의 손끝에 수천 승조원의 생사가 걸렸다.",
    choices: [
      {
        label: "[의지 판정] 이마의 비단 띠를 풀고 제3의 눈을 완전히 열어, 아스트로노미칸의 희미한 잔광이 스민 좁은 조류를 직접 더듬어 도약한다",
        check: { stat: "WP", diff: -6 },
        success: {
          text: "비단 띠가 바닥에 떨어지자 찢어질 듯한 이명과 함께 비현실의 폭풍이 시야를 덮쳤다. 그대는 끓어오르는 에테르의 암초 사이로 가느다란 황금빛 실오라기를 끝내 붙잡아 함선을 안전 지대로 이끌어 냈다. 조타 장교가 경외에 찬 눈빛으로 감사를 표하며, 그대의 이름은 첫 항해부터 선원들 사이에 전설로 남았다.",
          stats: { WP: 6, Int: 4, Inf: 5 },
          align: { dogmatic: 5, humane: 4 },
          addTags: ["bond_comrade"]
        },
        fail: {
          text: "제3의 눈으로 쏟아져 들어온 거친 워프 번개가 시신경을 태웠고, 순간 흔들린 겔러 필드 틈새로 하층 갑판에 기괴한 냉기가 스며들었다. 함선은 겨우 약탈선을 따돌렸으나, 그대는 극심한 신경 손상을 입은 채 함교의 차가운 시선을 감당해야 했다.",
          wounds: -18,
          corruption: 6,
          stats: { WP: -2, Inf: -3 }
        }
      },
      {
        label: "[지성 판정] 고대 항로 성도와 조류 측정 서비터의 기록을 조합해, 짧은 거리만 끊어 넘는 계산 도약을 감행한다",
        check: { stat: "Int", diff: -4 },
        success: {
          text: "워프의 광풍에 시선을 빼앗기지 않고 냉정하게 중력 파장과 과거 조류표를 교차 연산했다. 단 한 번의 정밀한 단거리 도약으로 오크 약탈선의 추격을 완벽히 끊어 내며, 단 한 명의 승조원도 잃지 않고 함선을 구해 냈다.",
          stats: { Int: 6, WP: 3, Inf: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "계산에 미세한 오차가 생겨 함선이 인접 행성의 중력 우물 가장자리에 거칠게 튕겨 나왔다. 선체 외판이 비명을 지르며 흔들리는 충격에 항법 의자에서 굴러떨어져 큰 타박상을 입었다.",
          wounds: -14,
          corruption: 3,
          stats: { Inf: -3 }
        }
      },
      {
        label: "무리한 맹목 도약을 거부하고 스승 항법사의 생명 유지 장치를 안정시킨 뒤, 함장에게 실우주 우회 기동을 요청한다",
        effect: {
          text: "귀중한 화물칸 일부를 버리며 약탈선의 시선을 따돌려야 했지만, 스승의 목숨과 승조원들의 온전한 정신을 지켜 냈다. 의식을 되찾은 선임 항법사는 그대의 침착한 판단을 높이 사며 깊은 신뢰를 보냈다.",
          stats: { Fel: 4, WP: 3, Inf: -2 },
          align: { humane: 8 },
          addTags: ["bond_comrade"]
        }
      },
      {
        label: "하층 기관 구역의 격벽을 봉쇄해 모든 출력을 워프 기관으로 몰아주고, 최단 항로로 거칠게 돌파한다",
        effect: {
          text: "격벽 너머 하층 노예 선원들의 비명이 끊어지자 워프 기관이 폭발적인 출력을 뿜어냈다. 호위함과 상층 귀족 화물은 흠집 하나 없이 빠져나왔으나, 항법탑으로 올라오는 차가운 정적 속에 무거운 업보가 남았다.",
          stats: { Inf: 6, Int: 3 },
          faith: -4,
          corruption: 4,
          align: { ruthless: 9, humane: -5 }
        }
      }
    ],
    source: "Lexicanum: Navigator / Rogue Trader: The Navis Primer"
  },
  {
    id: "ev_s17_nav_third_eye_unveil",
    title: "금단의 응시 — 가문 견습실의 제3의 눈 개안 의식",
    category: "나비스 노빌리테",
    once: true,
    req: {
      anyCareers: ["nav_apprentice"],
      allTags: ["navigator"]
    },
    reqLabel: "직군: 견습 항법사 · 항해사",
    weight: 34,
    text: "나비스 노빌리테 본가의 벨벳 장막이 드리워진 성소에서 젊은 항법사들의 성년 개안 의식이 열렸다. 백랍 촛불이 흔들리는 제단 앞에는 사슬에 묶인 반역 죄수가 끌려 나왔고, 가문 원로들은 제3의 눈이 품은 살상력을 완전히 통제해 보이라고 엄명한다. 바로 그 무렵 그대의 손목과 목덜미에는 창백한 비늘빛 변이 흔적이 희미하게 번지기 시작해, 같은 기수의 경쟁 방계 후계자가 냉소적인 눈빛으로 그대의 소매를 주시하고 있었다.",
    choices: [
      {
        label: "[의지 판정] 두려움을 억누르고 제3의 눈을 열어 죄수의 영혼을 정면으로 응시함으로써, 가문의 위엄과 완벽한 통제력을 증명한다",
        check: { stat: "WP", diff: -8 },
        success: {
          text: "눈꺼풀이 열리자 성소 안의 공기가 얼어붙었고, 워프의 심연을 직시한 반역자는 비명조차 지르지 못한 채 재처럼 무너져 내렸다. 단 한 줄기의 역류도 허락하지 않은 절제된 개안에 원로들이 일제히 고개를 숙여 경의를 표했다.",
          stats: { WP: 6, Inf: 6 },
          faith: 4,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "응시 끝에 되돌아온 워프의 잔향이 이마를 불태우며 짙은 핏줄과 변이 반점을 얼굴까지 밀어 올렸다. 성소 바닥에 무릎을 꿇은 그대를 향해 원로들의 싸늘한 탄식이 쏟아졌다.",
          wounds: -16,
          corruption: 7,
          stats: { Fel: -4 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[교섭 판정] 변이를 당당히 드러낸 채 경쟁 후계자의 금지 약물 은폐와 혈통 결함을 원로들 앞에 폭로한다",
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "침착하고도 날카로운 언변이 성소의 공기를 단숨에 뒤집었다. 음해를 꾸미던 경쟁 후계자가 원로들의 추궁 속에 고개를 떨구며 물러났고, 그대는 냉혹한 귀족 정치를 꿰뚫는 차세대 실력자로 각인되었다.",
          stats: { Fel: 6, Inf: 5, Int: 3 },
          align: { ruthless: 6 },
          addTags: ["bond_rival"]
        },
        fail: {
          text: "확실한 물증 없이 내뱉은 고발을 원로들이 경솔한 질투로 일축했다. 경쟁 후계자의 비웃음 속에 그대는 성소 징계실에서 며칠간 금식 벌을 견뎌야 했다.",
          wounds: -8,
          stats: { Fel: -3, Inf: -4 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "죄수를 처참히 태우는 과시 대신 최소한의 위압으로 의식만 마무리하고, 가문 의술사에게 변이 징후를 솔직히 기록해 안정 처방을 받는다",
        effect: {
          text: "원로들은 다소 미온적이라며 혀를 찼지만, 무리한 개안으로 영혼이 깎이는 화를 면했다. 차분히 변이를 다스리며 내면의 균형을 지킨 선택은 훗날 거친 워프 폭풍을 버틸 단단한 토대가 되었다.",
          stats: { WP: 4, Int: 4 },
          corruption: -3,
          align: { humane: 7 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Rogue Trader: The Navis Primer"
  },
  {
    id: "ev_s17_nav_flagship_maelstrom",
    title: "포화 속의 워프 폭풍 — 기함 항법탑의 최후 항로",
    category: "나비스 노빌리테",
    once: true,
    req: {
      anyCareers: ["nav_senior"],
      allTags: ["navis_officer"]
    },
    reqLabel: "직군: 선임 항법사 · 선임 항법사 인장",
    weight: 36,
    text: "성전군 기함 순양함의 강화 수정 항법탑 바깥으로 매크로 캐논의 섬광과 기괴한 워프 폭풍의 소용돌이가 동시에 몰아쳤다. 배신자 함대의 매복을 뚫고 비상 도약 지점에 도달했지만, 선체가 반파된 호위함 세 척이 아직 워프 균열 가장자리에서 필사적으로 추진기를 쥐어짜며 기함을 쫓아오고 있다. 선임 항법사인 그대의 제3의 눈에는 워프의 문이 철문처럼 닫혀 가는 조류가 선명히 보인다. 지금 도약하면 기함과 성전 작전 계획은 온전하지만 호위함 세 척은 적의 먹이가 되고, 문을 억지로 붙들면 기함의 겔러 필드마저 찢길 위기다.",
    choices: [
      {
        label: "[의지 판정] 겔러 필드의 한계선까지 정신을 밀어 붙여 워프의 틈새를 억지로 열어 두고, 뒤처진 호위함 세 척을 함께 끌고 도약한다",
        check: { stat: "WP", diff: -12 },
        success: {
          text: "세 눈에서 붉은 피눈물이 흘러내리는 고통 속에서도 그대는 아스트로노미칸의 광휘를 닻 삼아 거친 폭풍을 갈랐다. 마지막 호위함이 금빛 항로 안으로 미끄러져 들어온 뒤 문이 닫히자, 함대 전역의 복스 채널에서 그대의 이름을 부르는 환호가 터져 나왔다.",
          stats: { WP: 7, Fel: 5, Inf: 7 },
          faith: 6,
          align: { humane: 10 },
          addTags: ["hero_of_imperium", "bond_comrade"]
        },
        fail: {
          text: "닫히려던 워프 조류의 촉수가 기함 상부 갑판을 후려치며 항법탑의 보호 장치가 절반 가까이 타 버렸다. 간신히 호위함 한 척만 건져 냈으나, 그대는 심각한 신경 출혈과 워프 화상을 입은 채 병상으로 실려 갔다.",
          wounds: -22,
          corruption: 8,
          stats: { Inf: -3 },
          align: { humane: 6 }
        }
      },
      {
        label: "[지성 판정] 폭풍의 맥동 주기와 함대 포격 파동을 정밀 연산해, 추격하던 배신자 선봉함 쪽으로 와류를 꺾어 워프 암초에 처박아 버린다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "성도의 기하학과 에테르의 조류를 전술 무기로 바꾼 천재적인 조타였다. 배신자 순양함 두 척이 거대한 소용돌이에 휘말려 산산조각 나는 사이, 기함은 완벽한 각도로 도약해 집결 성계에 가장 먼저 도착했다.",
          stats: { Int: 7, WP: 5, Inf: 6 },
          align: { dogmatic: 7 }
        },
        fail: {
          text: "격동하는 워프의 흐름이 필멸자의 계산을 비웃듯 뒤틀리며 항법탑 천체 계측기가 폭주했다. 폭발한 수정 파편에 중상을 입고 짙은 워프 잔류 기운에 노출된 채 겨우 비상 이탈에 성공했다.",
          wounds: -18,
          corruption: 4,
          stats: { Int: -2, Inf: -3 }
        }
      },
      {
        label: "기함과 성전군 지휘부 보존이 절대 우선이라는 해군 교리에 따라 호위함 포기 신호를 올리고 즉각 워프 도약을 실행한다",
        effect: {
          text: "복스 너머로 들려오던 호위함 함장들의 마지막 황제 찬가가 정적 속으로 끊어졌다. 기함은 단 하나의 손실도 없이 집결지에 닿았고 함대 사령부는 그대의 냉철한 직무 수행을 치하했으나, 항법탑의 밤은 오래도록 시렸다.",
          stats: { WP: 4, Inf: 5 },
          faith: 3,
          align: { dogmatic: 8, humane: -5 }
        }
      }
    ],
    source: "Lexicanum: Navis Nobilite / Battlefleet Gothic / Rogue Trader: The Navis Primer"
  },
  {
    id: "ev_s17_nav_rogue_shortcut",
    title: "금지된 지름길 — 로그 트레이더 선장과 제국 해군 연락관의 갈등",
    category: "나비스 노빌리테",
    alignBias: "ruthless",
    once: true,
    req: {
      anyCareers: ["nav_senior"],
      allTags: ["navis_officer"]
    },
    reqLabel: "직군: 선임 항법사 · 선임 항법사 인장",
    weight: 35,
    text: "변경 개척 원정대의 기함 항법실에 야심 찬 로그 트레이더 총수가 낡고 출처 불명인 고대 성도를 펼쳐 놓았다. 임페리얼 네이비 해군본부가 출입을 엄금한 불안정 워프 암초 지대를 가로지르면, 경쟁 구호 선단보다 넉 달 먼저 보물 성계에 도착할 수 있다며 막대한 금괴와 미지 유물 지분을 은밀히 제시한다. 그러나 문밖을 지키는 제국 해군 파견 연락관은 금지 항로 진입 시 선박 파손은 물론 그대 가문의 공식 항해 인가까지 위태로워질 것이라며 날 선 경고를 보낸다.",
    choices: [
      {
        label: "[권위 판정] 항법사의 절대 항로 전권을 선포해 양측에서 가문 보증금과 독점 계약 연장을 받아 낸다",
        check: { stat: "Inf", diff: -10 },
        success: {
          text: "제3의 눈 없이는 단 일 광년도 나아갈 수 없다는 냉엄한 현실 앞에, 호기롭던 로그 트레이더도 까다로운 해군 연락관도 모두 고개를 숙였다. 막대한 보증금과 유리한 항로 지분이 그대로 그대와 가문의 금고로 흘러들었다.",
          stats: { Inf: 7, Fel: 5, Int: 3 },
          align: { ruthless: 8 },
          addTags: ["wealthy"]
        },
        fail: {
          text: "과도한 특권 과시가 오히려 로그 트레이더와 해군 연락관을 한뜻으로 뭉치게 만들었다. 두 세력이 합동으로 가문 본가에 항의 서한을 올리면서 그대의 입지가 크게 흔들렸다.",
          wounds: -6,
          stats: { Inf: -5, Fel: -3 },
          align: { ruthless: 4 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "[의지 판정] 로그 트레이더의 거액 제안을 수락하고, 해군본부가 봉인한 금지된 워프 암초 지름길로 직접 함선을 몰아넣는다",
        check: { stat: "WP", diff: -12 },
        success: {
          text: "울부짖는 유령 조류 사이를 바늘귀 꿰듯 돌파해, 경쟁 선단보다 넉 달 앞서 미개척 성계의 궤도에 깃발을 꽂았다. 약속된 막대한 황금과 희귀 유물 지분이 항법탑으로 산더미처럼 실려 왔다.",
          stats: { WP: 6, Int: 5, Inf: 6 },
          corruption: 4,
          align: { ruthless: 10 },
          addTags: ["wealthy"]
        },
        fail: {
          text: "성도에 없던 기괴한 워프 와류가 선체 외벽을 긁고 지나가며 함교 전역에 부자연스러운 서리와 광기가 번졌다. 간신히 실우주로 탈출했으나 중상과 깊은 오염을 피하지 못했다.",
          wounds: -20,
          corruption: 9,
          stats: { Inf: -4 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "[교섭 판정] 로그 트레이더와 해군 연락관을 침착히 설득해 금지 암초 대신 안전한 고속 우회 항로를 채택하고, 구호 물자 수송을 앞당긴다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "선원 수만 명의 목숨을 도박판에 올리지 않으면서도 기일을 크게 단축하는 절충안을 관철했다. 제국 해군과 상단 양쪽 모두 그대의 품격과 실력을 깊이 신뢰하게 되었다.",
          stats: { Fel: 6, WP: 4, Inf: 5 },
          faith: 4,
          align: { humane: 8 }
        },
        fail: {
          text: "로그 트레이더는 그대의 신중함을 겁쟁이의 변명이라며 조롱하고 수당을 대폭 삭감했다. 항해 내내 함교와 항법탑 사이에 차가운 적대가 맴돌았다.",
          wounds: -6,
          stats: { Inf: -4, Fel: -2 },
          align: { humane: 4 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "해군본부 항해 칙령을 위반하는 비인가 성도를 즉각 압수하고, 제국 표준 항로만 엄격히 준수한다",
        effect: {
          text: "로그 트레이더의 불만 어린 시선을 뒤로한 채 정해진 율법과 성도대로 항해를 완수했다. 임페리얼 네이비 사령부는 그대의 확고한 준법 정신을 높이 평가했다.",
          stats: { WP: 5, Inf: 3 },
          faith: 5,
          align: { dogmatic: 8 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Rogue Trader: The Navis Primer"
  },
  {
    id: "ev_s17_nav_bloodline_council",
    title: "혈통 장부와 변이의 밀실 — 나비스 가문 혼맥 평의회",
    category: "나비스 노빌리테",
    once: true,
    req: {
      anyCareers: ["nav_novator"],
      allTags: ["nav_novator"]
    },
    reqLabel: "직군: 노바토르 · 나비스 노바토르",
    weight: 37,
    text: "대가문의 수장인 노바토르로서 봉인된 혈통 금고에 들어서자, 수백 년 치 양피지 가계도가 은빛 등불 아래 펼쳐졌다. 제3의 눈 유전자를 순수하게 유지하려 이어 온 근친 혼맥의 대가로, 최근 태어난 젊은 혈족 절반에게서 비늘 피부와 기형적 관절, 불안정한 워프 감응 같은 극심한 변이가 나타나기 시작한 것이다. 이 사실이 청교도파 이단심문관의 귀에 들어가면 가문 전체가 정화 대상이 될 수 있다. 원로 평의회는 변이 혈족을 지하 성소에 영구 유폐하자는 강경파와 경쟁 대가문과 혼맥을 트자는 외교파로 팽팽히 갈라져 그대의 결단을 기다린다.",
    choices: [
      {
        label: "[의지 판정] 견습 시절의 공포를 기억하며 유폐 위기의 젊은 변이 혈족을 직접 거두어 훈련한다",
        req: { anyPastCareers: ["nav_apprentice"] },
        check: { stat: "WP", diff: -14 },
        success: {
          text: "누구보다 낮고 두려웠던 견습 시절을 기억하는 노바토르의 진심은 버려질 뻔한 젊은이들의 의지를 깨웠다. 그대가 손수 조련한 젊은 항법사들은 흉측한 겉모습 너머로 놀라운 성간 항해 재능을 발휘하며 가문에 충성스러운 전우이자 새 활력이 되었다.",
          stats: { WP: 7, Fel: 6, Inf: 7 },
          align: { humane: 10 },
          addTags: ["bond_comrade"]
        },
        fail: {
          text: "통제력을 잃은 젊은 혈족 한 명이 훈련 도중 제3의 눈을 폭주시켜 성소 천장이 붕괴하고 강렬한 워프 역류가 그대를 덮쳤다. 깊은 상처와 함께 원로회의 거센 비난을 감수해야 했다.",
          wounds: -20,
          corruption: 6,
          stats: { Inf: -4 },
          align: { humane: 6 }
        }
      },
      {
        label: "[교섭 판정] 경쟁 대가문의 노바토르와 비밀 혼맥 협정을 맺어 혈통에 새 피를 수혈하고, 두 성역 항로의 공동 지분을 나눈다",
        check: { stat: "Fel", diff: -14 },
        success: {
          text: "치밀한 귀족 외교 끝에 수세기 묵은 반목을 딛고 역사적인 혼맥 동맹을 성사시켰다. 유전적 쇠퇴의 위기를 넘겼을 뿐 아니라 두 대가문이 연합한 항로 지분은 막대한 부를 안겨 주었다.",
          stats: { Fel: 7, Inf: 7, Int: 4 },
          align: { dogmatic: 4, humane: 4 },
          addTags: ["wealthy"]
        },
        fail: {
          text: "협상 도중 경쟁 가문의 첩자가 우리 혈통 장부의 사본을 빼돌려 원로원에 흘렸다. 수치스러운 배상과 항로 양보 끝에 겨우 사태를 봉합하며 깊은 원한을 품게 되었다.",
          wounds: -8,
          stats: { Inf: -6, Fel: -3 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "[권위 판정] 이단심문소의 의심을 원천 차단하기 위해 변이가 심한 방계 혈족을 심층 지하 성소에 영구 격리하고 순수 계보만 남긴다",
        check: { stat: "Inf", diff: -12 },
        success: {
          text: "철혈의 가문 숙청이 밤사이 소리 없이 집행되었다. 외부에는 티끌 하나 없는 고귀한 혈통의 위용만 남았고, 떨고 있던 원로들 역시 그대의 무자비한 통솔력 앞에 완벽히 복종했다.",
          stats: { Inf: 8, WP: 5 },
          faith: 4,
          align: { ruthless: 9, dogmatic: 5, humane: -6 }
        },
        fail: {
          text: "절망한 방계 혈족 일부가 밤중에 서재로 숨어들어 독살을 시도했다. 호위대에 의해 제압되었으나 독기 흔적이 몸에 남아 한동안 신음했고, 가문 내부의 균열은 더욱 깊어졌다.",
          wounds: -18,
          stats: { Inf: -5 },
          align: { ruthless: 5 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "혈통 장부의 변이 기록을 은폐하지 않고 파테르노바 궁정 의술단의 표준 규율에 따라 보수적 혼맥 정책을 적용한다",
        effect: {
          text: "과감한 모험이나 비정한 숙청 대신 나비스 노빌리테 수천 년의 정통 규율을 택했다. 가문의 부흥은 더뎠으나 제국의 공인과 혈통의 정통성만큼은 흔들리지 않았다.",
          stats: { Int: 5, WP: 4, Inf: 4 },
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Navis Nobilite / Rogue Trader: The Navis Primer / Wolfblade"
  },
  {
    id: "ev_s17_nav_route_monopoly",
    title: "성역 항로 독점전 — 경쟁 가문과의 그림자 전쟁",
    category: "나비스 노빌리테",
    alignBias: "ruthless",
    once: true,
    req: {
      anyCareers: ["nav_novator"],
      allTags: ["nav_novator"]
    },
    reqLabel: "직군: 노바토르 · 나비스 노바토르",
    weight: 36,
    text: "세 곳의 포지 월드와 포위된 최전선 성계를 최단 기간에 잇는 안정 워프 항로가 새로 발견되자, 성역의 주도권을 놓고 경쟁 항법사 대가문과의 치열한 그림자 암투가 벌어졌다. 가문 첩보망이 물어온 보고에 따르면, 상대 노바토르가 차티스트 상선주들을 매수하고 우리 가문의 젊은 항법사 두 명에게 신경 독을 먹여 항로 독점 인가를 가로채려 하고 있다. 그 사이 가격 담합과 계약 분쟁으로 군수 수송이 늦어지며 전선의 아스트라 밀리타룸 연대들이 탄약 부족으로 피를 흘리고 있다.",
    choices: [
      {
        label: "[지성 판정] 경쟁 가문이 조작한 허위 조류 보고서와 독살 자금줄을 역추적해, 성역 해군본부와 상업 길드 평의회 앞에서 낱낱이 폭로한다",
        check: { stat: "Int", diff: -14 },
        success: {
          text: "빈틈없는 회계 추적과 암호 해독이 경쟁 가문의 추악한 음모를 만천하에 드러냈다. 상대 가문의 항해 인가가 박탈되고 황금 항로의 독점권이 우리 가문에 돌아오자, 제독들과 상단 거두들이 일제히 경의를 표했다.",
          stats: { Int: 7, Inf: 8, Fel: 4 },
          align: { dogmatic: 6, humane: 4 },
          addTags: ["wealthy", "bond_rival"]
        },
        fail: {
          text: "상대 가문의 사설 암살단이 핵심 증인 서고를 불태우고 그대의 셔틀까지 기습했다. 간신히 목숨은 건졌으나 증빙 자료가 소실되어 끝없는 법정 다툼에 휘말렸다.",
          wounds: -18,
          stats: { Inf: -5 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "[권위 판정] 가문 항법사를 일제히 철수해 경쟁 가문 거래처를 마비시키고 지분을 빼앗는다",
        check: { stat: "Inf", diff: -14 },
        success: {
          text: "항법사가 사라진 순간 적대 상단과 행성 귀족들의 교역망이 사흘 만에 얼어붙었다. 패배를 시인한 상대 노바토르가 무릎을 꿇고 항로 권리서를 바쳤으며, 은하 변경에 그대의 서늘한 위명이 퍼졌다.",
          stats: { Inf: 9, WP: 4 },
          align: { ruthless: 10, humane: -6 },
          addTags: ["wealthy", "bond_rival"]
        },
        fail: {
          text: "항로 마비로 군수 보급이 끊기자 격노한 섹터 로드와 해군본부가 오히려 우리 가문 영지에 징벌적 과징금을 부과했다. 막대한 손실과 함께 정치적 입지가 위축되었다.",
          wounds: -10,
          stats: { Inf: -6, Fel: -4 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "독점 이권 다툼을 멈추고 최전선 군수 수송 선단에 무보수로 가문 정예 항법사를 긴급 파견한다",
        effect: {
          text: "당장의 막대한 계약 수익은 포기했으나, 탄약과 의료품이 제때 전선에 닿으며 수십만 장병의 목숨을 구했다. 전선 사령관들의 감사와 황제 신민들의 칭송이 쏟아지자 경쟁 가문조차 감히 험담을 꺼내지 못했다.",
          stats: { Fel: 4, WP: 3, Inf: 2 },
          faith: 4,
          align: { humane: 8 }
        }
      }
    ],
    source: "Lexicanum: Navis Nobilite / Rogue Trader: The Navis Primer"
  },
  {
    id: "ev_s17_nav_paternoval_decree",
    title: "파테르노바의 침묵과 열한 번째 의석 — 세나토룸 임페리알리스 항로 봉쇄령",
    category: "하이 로드 고유",
    once: true,
    req: {
      anyCareers: ["paternoval_envoy"],
      allTags: ["paternoval_envoy"]
    },
    reqLabel: "직군: 파테르노발 특사 · 테라의 하이 로드",
    weight: 38,
    text: "신성한 테라 항법사 지구의 가장 높은 흑요석 첨탑 깊숙한 곳에서, 모든 항법사의 시조 파테르노바가 수백 년 만에 깊은 사이킥 혼수에 잠겼다. 은하 곳곳의 유력 노바토르들이 차기 파테르노바 계승을 노리며 은밀히 날을 세우는 바로 그 시각, 황궁 세나토룸 임페리알리스 의사당에서는 행정과 해군 의석이 손을 잡고 충격적인 법안을 상정했다. 나비스 노빌리테의 만 년 자치 특권을 축소하고, 반란 성역 진압을 명분으로 모든 가문 항법사를 제국 해군 직속으로 강제 징발하자는 것이다. 파테르노바를 대리해 열한 번째 하이 로드 의석에 앉은 그대의 손끝에는 인류제국 전체의 워프 항로를 멈춰 세울 수도 있는 무시무시한 인장이 쥐어져 있다.",
    choices: [
      {
        label: "[지성 판정] 평생의 항법 경륜으로 강제 징발 시 벌어질 성역 항로 마비를 의사당에서 논증한다",
        req: { anyPastCareers: ["nav_senior", "nav_novator"] },
        check: { stat: "Int", diff: -20 },
        success: {
          text: "가문 자율성과 정밀한 혈통 관리가 무너지면 십 년 안에 세그멘툼 절반의 성간 항해가 맹목이 된다는 치밀한 연산 앞에 강경파 하이 로드들이 말문을 닫았다. 징발안은 즉각 폐기되었고, 나비스 노빌리테의 고유 헌장이 원로원 만장일치로 재확인되었다.",
          stats: { Int: 8, Inf: 8, Fel: 5 },
          align: { humane: 6, dogmatic: 5 }
        },
        fail: {
          text: "정적 의석들이 보고서 말단의 변경 항로 오차를 집요하게 물고 늘어져 의결이 교착되었다. 변방 두 개 성역의 계약 특권을 양보하고 극심한 격무에 시달린 끝에야 핵심 자치권을 지켜 냈다.",
          wounds: -12,
          stats: { Inf: -5, Fel: -2 }
        }
      },
      {
        label: "[권위 판정] 하이 로드 인장으로 전 세그멘툼 항로 전면 봉쇄를 경고하며 징발안 철회를 압박한다",
        check: { stat: "Inf", diff: -22 },
        success: {
          text: "인류제국이 단 하루라도 워프 항해 없이 버틸 수 없다는 공포가 의사당의 모든 청동 의석을 얼어붙게 만들었다. 강경파들이 창백한 얼굴로 법안을 불태우며 물러섰고, 파테르노발 특사의 절대적 위상이 테라 하늘을 찔렀다.",
          stats: { Inf: 9, WP: 6 },
          align: { ruthless: 10 }
        },
        fail: {
          text: "해군 총사령관과 그림자 의석이 그대의 최후통첩을 반역 위협으로 맞받아치며 테라 내 가문 저택 두 곳을 은밀히 타격했다. 피비린내 나는 암투 끝에 간신히 휴전을 맺었으나 깊은 상처와 적을 남겼다.",
          wounds: -20,
          stats: { Inf: -6, Fel: -3 },
          align: { ruthless: 6 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "[의지 판정] 칠흑 성소에서 파테르노바와 교감해 정통 칙명을 받아 원로원과 대가문에 선포한다",
        check: { stat: "WP", diff: -22 },
        success: {
          text: "인간의 형상을 아득히 벗어난 태고 시조의 압도적 정신 파도를 오롯이 견뎌 냈다. 시조의 공명을 두르고 성소 문을 나선 그대 앞에 테라의 모든 노바토르가 무릎을 꿇었고, 원로원마저 신성한 정통성 앞에 징발 논의를 접었다.",
          stats: { WP: 8, Inf: 8, Int: 5 },
          faith: 6,
          align: { dogmatic: 8 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "파테르노바의 거대하고 이질적인 의식이 필멸의 정신을 찢어 놓듯 덮쳐 왔다. 세 눈에서 피를 흘리며 성소 계단에 쓰러진 사이, 경쟁 가문들 사이에 특사의 권위가 흔들린다는 소문이 번졌다.",
          wounds: -24,
          corruption: 7,
          stats: { WP: -2, Inf: -4 }
        }
      },
      {
        label: "자치 헌장을 지키는 조건으로 대성전 주력 함대에 정예 항법사단을 자발 증파하는 절충안에 서명한다",
        effect: {
          text: "원로원을 정면으로 마비시키는 파국을 피하면서도 가문의 주권과 대성전의 숨통을 모두 지켜 냈다. 황금 옥좌 아래 냉철한 균형을 지킨 그대의 경륜은 하이 로드들 사이에서 오래도록 회자되었다.",
          stats: { Inf: 3, Fel: 3, WP: 3 },
          align: { humane: 5, dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Paternoval Envoy / Paternova / High Lords of Terra / Watchers of the Throne"
  },
  {
    id: "ev_s17_nav_nihilus_blind_light",
    title: "꺼진 등불 너머 — 임페리움 니힐루스의 칠흑 워프 항해",
    category: "나비스 노빌리테",
    once: true,
    req: {
      greatRift: true,
      anyCareers: ["nav_apprentice", "nav_senior", "nav_novator", "paternoval_envoy"]
    },
    reqLabel: "대균열 이후 · 나비스 노빌리테 전 계급",
    weight: 37,
    text: "시카트릭스 말레딕툼이 은하를 두 동강 낸 이래, 대균열 북쪽의 임페리움 니힐루스에서는 황제의 등불 아스트로노미칸이 워프 화염의 장막 뒤에 완전히 가려져 버렸다. 피난민과 귀중한 군수 성유물을 실은 구호 선단이 어둠에 잠긴 성계를 탈출해야 하지만, 항법탑에서 비단 안대를 풀어 올린 그대의 제3의 눈에는 황금빛 이정표 대신 대균열의 붉은 포효와 배를 심연으로 유인하는 거짓 불빛만 어른거린다. 등불 없는 밤바다 한복판에서 수만 명의 목숨을 짊어진 항법사는 어떤 길을 택할 것인가.",
    choices: [
      {
        label: "[의지 판정] 임페리움 니힐루스의 칠흑 고립 속에서도, 대균열의 붉은 경계선 자체를 역으로 나침반 삼아 구호 선단 전체의 맹목 돌파를 이끈다",
        req: { anyTags: ["imperial_nihilus"] },
        check: { stat: "WP", diff: -16 },
        success: {
          text: "아무도 감히 직시하지 못한 시카트릭스 말레딕툼의 붉은 윤곽을 항로 기준선으로 삼는 대담한 발상이 기적을 낳았다. 꺼진 등불 너머로 구호 선단 전원이 무사히 실우주에 귀환하자, 암흑 제국 전역에 그대의 이름이 살아 있는 등대로 울려 퍼졌다.",
          stats: { WP: 8, Int: 6, Inf: 7 },
          faith: 6,
          align: { humane: 7, dogmatic: 5 },
          addTags: ["rift_survivor", "hero_of_imperium"]
        },
        fail: {
          text: "대균열의 광기 어린 섬광이 시신경 깊숙이 낙인을 찍었고, 함내 시계가 수개월씩 뒤틀리는 악몽 끝에 선체가 만신창이가 된 채로 간신히 어둠을 빠져나왔다.",
          wounds: -22,
          corruption: 8,
          stats: { WP: -2 },
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "[지성 판정] 수십 차례의 초단거리 도약을 되풀이하며, 국지 중력파와 아스트로패스 잔향만으로 안전한 징검다리 항로를 새로 측량한다",
        check: { stat: "Int", diff: -14 },
        success: {
          text: "단 한 번의 무모한 도박도 없이 별과 별 사이의 미세한 중력 파문을 짚어 나가며, 암흑 지대를 관통하는 재현 가능한 안전 항로를 개척했다. 그대가 남긴 성도는 임페리움 상크투스와의 연락을 잇는 값진 보물이 되었다.",
          stats: { Int: 7, WP: 5, Inf: 6 },
          align: { humane: 6 },
          addTags: ["rift_survivor"]
        },
        fail: {
          text: "잦은 워프 진입과 이탈로 겔러 필드 방출기가 과열 폭발하면서 선체 중앙 갑판이 찢어졌다. 항법탑 내부까지 파편이 날아들어 큰 부상을 입은 채 겨우 항해를 마쳤다.",
          wounds: -18,
          corruption: 5,
          stats: { Inf: -3 },
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "[권위 판정] 속도가 느린 피난 수송선들을 분리해 두고, 고위 지휘부와 핵심 군수 물자를 실은 주력함만 이끌고 최단 틈새로 이탈한다",
        check: { stat: "Inf", diff: -10 },
        success: {
          text: "잔혹한 선별 끝에 주력함과 귀중한 성유물 화물은 흠집 없이 암흑 해역을 벗어났다. 뒤편에 남겨진 피난선들의 구조 신호가 잦아드는 동안, 그대의 품에는 살아남은 귀족들이 건넨 막대한 사례금이 쌓였다.",
          stats: { Inf: 7, WP: 4 },
          faith: -5,
          corruption: 4,
          align: { ruthless: 10, humane: -7 },
          addTags: ["rift_survivor", "wealthy"]
        },
        fail: {
          text: "분리 명령에 격분한 하급 기관병들이 항법탑 전력선에 파괴 공작을 벌였다. 함내 무장 경비대가 반란을 진압하는 혼란 속에 파편상을 입고 치명적인 오명을 뒤집어썼다.",
          wounds: -16,
          stats: { Inf: -4, Fel: -4 },
          align: { ruthless: 6 },
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "직선 돌파를 접고 임페리움 상크투스로 통하는 나흐문드 방면 안전 관문까지 우회 항로를 개척한다",
        effect: {
          text: "길고 고된 항해 끝에 식량과 연료가 바닥을 드러냈으나, 단 한 척의 선박도 악마의 유혹에 내주지 않고 관문의 별빛 아래 도달했다. 침착한 인내가 절망의 시대를 건너는 방패가 되었다.",
          stats: { WP: 5, Int: 4 },
          faith: 4,
          align: { dogmatic: 6, humane: 4 },
          addTags: ["rift_survivor"]
        }
      }
    ],
    source: "Lexicanum: Imperium Nihilus / Cicatrix Maledictum / Watchers of the Throne"
  },
  {
    id: "ev_s17_nav_mutation_dilemma",
    title: "제3의 눈이 부르는 변이 — 침묵의 성소와 인간성의 경계",
    category: "나비스 노빌리테",
    alignBias: "humane",
    once: true,
    req: {
      anyTags: ["navigator"],
      anyCareers: ["nav_apprentice", "nav_senior"]
    },
    reqLabel: "직군: 견습·선임 항법사",
    weight: 35,
    text: "세월이 흐르며 워프의 심연을 들여다본 대가는 어떤 항법사도 피해 가지 못한다. 밀봉된 항법탑 거울 앞에 선 그대의 손가락 사이로 창백한 물갈퀴가 번지고 맥박은 심해의 생물처럼 느리게 뛰고 있었다. 바로 그날 선체의 급격한 흔들림 속에 청소하러 들어온 어린 하급 선원이 비단 안대가 흘러내린 그대의 이마와 변이된 손을 목격하고 돌연변이라며 비명을 지르며 쓰러졌다. 소란을 듣고 달려온 엄격한 국교 고해사와 차가운 눈빛의 가문 집행관이 문 앞에 나란히 선 지금, 인간성과 사명, 그리고 고귀한 돌연변이의 특권 사이에서 그대는 어떤 답을 내릴 것인가.",
    choices: [
      {
        label: "[교섭 판정] 집행관의 처형을 막아 서고 겁에 질린 선원을 달래며 필멸자들과의 유대를 지킨다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "권총을 빼 들려던 집행관이 그대의 단호한 자비 앞에 무기를 거두었고, 떨던 선원은 눈물을 흘리며 비밀을 지키겠다고 맹세했다. 겉모습이 변해 갈지언정 영혼만은 인류의 편에 서 있다는 소문이 갑판 아래까지 조용한 경외로 퍼져 나갔다.",
          stats: { Fel: 6, WP: 5, Inf: 3 },
          corruption: -4,
          align: { humane: 10, ruthless: -4 },
          addTags: ["bond_comrade"]
        },
        fail: {
          text: "온화한 설득에도 공포에 질린 선원이 복도로 뛰쳐나가 괴물을 보았다고 외쳐 댔다. 가문 집행관이 뒤늦게 수습했으나 그대는 국교 조사단의 싸늘한 심문과 모욕을 홀로 견뎌야 했다.",
          wounds: -10,
          stats: { Inf: -4, Fel: -2 },
          align: { humane: 7 }
        }
      },
      {
        label: "[의지 판정] 이 변이조차 아스트로노미칸의 빛을 받들기 위해 황제께서 허락하신 성스러운 짐임을 선포하고, 고해사 앞에서 엄숙한 정화 서약을 올린다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "인간의 몸을 바쳐 백만 행성의 길을 여는 순교의 사명이 흔들림 없는 목소리로 울려 퍼지자, 의심하던 고해사마저 두 손을 모아 무릎을 꿇었다. 공인된 성역의 봉사자로서 흔들리지 않는 교리적 위엄이 세워졌다.",
          stats: { WP: 7, Inf: 5 },
          faith: 8,
          corruption: -5,
          align: { dogmatic: 10 }
        },
        fail: {
          text: "밤샘 철야 정화 의식과 독한 성유 연기가 워프에 예민해진 신경을 찔러 심한 고열과 경련에 쓰러졌다. 신앙은 지켰으나 육신은 한층 더 쇠약해졌다.",
          wounds: -14,
          stats: { WP: -1, T: -2 },
          faith: 3,
          align: { dogmatic: 7 }
        }
      },
      {
        label: "[권위 판정] 집행관에게 목격 선원의 영구 격리와 기억 소거를 명하고 변이의 힘을 단련한다",
        check: { stat: "Inf", diff: -8 },
        success: {
          text: "차가운 귀족의 공포가 함선 모든 갑판의 입을 봉인했다. 필멸자의 동정 따위는 벗어던진 채 변이된 감각을 극한까지 벼려 내자, 제3의 눈은 한층 더 예리하고 치명적인 권능으로 깨어났다.",
          stats: { Inf: 7, WP: 5, Int: 3 },
          corruption: 4,
          align: { ruthless: 10, humane: -6 }
        },
        fail: {
          text: "선원이 소리 없이 사라지자 하층 갑판에 음산한 소문과 태업이 번졌고, 이를 수상히 여긴 제국 연락관이 그대를 향한 적대적인 감찰 기록을 남겼다.",
          wounds: -12,
          stats: { Inf: -4, Fel: -3 },
          corruption: 4,
          align: { ruthless: 7 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "두꺼운 비단 안대와 장갑으로 변이를 말없이 가린 채 선원을 다른 부서로 조용히 전보시키고, 홀로 항법탑의 고독 속으로 물러난다",
        effect: {
          text: "누구도 벌하지 않았고 누구에게도 이해를 구하지 않았다. 인류의 별빛을 안내하면서도 끝내 인간 무리 속에 섞일 수 없는 항법사의 숙명을 묵묵히 받아들인 밤, 항법탑 창밖으로 별들이 차갑게 빛났다.",
          stats: { WP: 5, Int: 4 },
          align: { humane: 3, dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Navigator / Rogue Trader: The Navis Primer / Nightbringer"
  }
];
