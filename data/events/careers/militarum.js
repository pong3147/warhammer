// 분기 사건 — 직군 계열: 아스트라 밀리타룸 · 장교 · 사이온 · 커미사르 · 로드 커미사르 · PDF · 전선 전투 (향후 개별 직군 15~20건 이상 시 단독 파일 승격 가능)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_imperial_tithe",
    title: "아스트라 밀리타룸 십일조 징집령",
    category: "군사",
    req: { minAge: 16, maxAge: 34, anyCareers: ["menial_worker", "pdf_trooper", "underhive_ganger"] },
    reqLabel: "16~34세 · 시민/방위군/갱단원",
    weight: 18,
    text: "행성 궤도에 거대한 제국 병력 수송선이 정박했다. 아드미니스트라툼의 십일조 징집 포고문이 행성 전역에 울려 퍼진다. 가장 건장한 청년 10%가 아스트라 밀리타룸 연대로 차출된다!",
    choices: [
      {
        label: "황제의 부름에 응해 행성 고유 연대에 입대한다",
        effect: {
          text: "제식 라스건과 플래크 갑옷, 그리고 《제국 보병 입문서》를 지급받았다! 은하계 전선으로의 행군이 시작된다.",
          forceCareer: "astra_militarum",
          stats: { BS: 5, WS: 4, T: 4, WP: 3 },
          faith: 6,
          addTags: ["militarum", "imperial_military"]
        }
      },
      {
        label: "[권위 40+ 해금] 인맥과 뇌물을 동원해 징집 명단에서 이름을 뺀다",
        req: { stats: { Inf: 40 } },
        check: { stat: "Inf", diff: 5 },
        success: {
          text: "행정관의 서류철에서 그대의 이름이 감쪽같이 사라졌다. 전쟁터 대신 안전한 후방에 남았다.",
          stats: { Inf: 2, Int: 2 }
        },
        fail: {
          text: "뇌물이 발각되어 징벌 부대급 최전선 연대로 강제 배속되고 말았다!",
          forceCareer: "astra_militarum",
          stats: { Inf: -8, T: 3 },
          addTags: ["militarum", "penal_mark"]
        }
      },
      {
        label: "[민첩 판정] 하층 구역으로 도주해 징집을 피한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "아르비테스 검문소를 따돌리고 가까스로 도망쳤다. 당분간 신분을 숨겨야 한다.",
          stats: { Ag: 4, Inf: -6 }
        },
        fail: {
          text: "도주 중 체포되어 곤봉 세례를 받은 뒤 최전방 보병으로 끌려갔다.",
          forceCareer: "astra_militarum",
          wounds: -18,
          stats: { Inf: -6 },
          addTags: ["militarum"]
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Codex: Astra Militarum"
  },
  {
    id: "ev_commissar_dilemma",
    title: "커미사르의 방아쇠 — 공포인가, 자비인가",
    category: "병종",
    req: { anyCareers: ["commissar", "lord_commissar"] },
    reqLabel: "병종: 커미사르",
    weight: 22,
    text: "카오스 컬티스트의 포격에 겁에 질린 신병 소대가 참호 뒤로 패주하려 한다. 볼트 피스톨에 손이 올라간다. 《오피시오 프리펙투스 교범》은 즉결 처형을 명하지만, 부대 전체의 사기는 칼날 위를 걷고 있다.",
    choices: [
      {
        label: "[교섭 48+ 해금] 처형 대신 몸소 참호 위로 올라가 돌격을 선도한다",
        req: { stats: { Fel: 48 } },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "병사들이 감동과 경외에 휩싸여 일제히 함성을 지르며 반격했다! 이브람 건트에 비견될 명성을 얻었다.",
          stats: { Fel: 6, WP: 5, Inf: 8 },
          faith: 8
        },
        fail: {
          text: "선두에 섰다가 적 저격수의 탄환에 어깨를 맞았으나 병사들은 끝내 도망치지 않았다.",
          wounds: -22,
          stats: { Fel: 4, Inf: 4 }
        }
      },
      {
        label: "[의지 판정] 규율대로 선동자 1명을 즉결 처형해 철의 군기를 세운다",
        check: { stat: "WP", diff: 10 },
        success: {
          text: "차가운 총성 한 발에 전선이 즉시 정렬되었다. 병사들은 두려움에 떨면서도 적진으로 돌격했다.",
          stats: { WP: 5, Inf: 5, Fel: -2 },
          faith: 5
        },
        fail: {
          text: "분노한 병사들 사이에서 '아군 오사' 사고를 가장한 암살 시도가 벌어져 다쳤다.",
          wounds: -20,
          stats: { Fel: -5 }
        }
      }
    ],
    source: "Lexicanum: Commissar"
  },
  {
    id: "ev_job_guard_primer",
    title: "《제국 보병 입문서》와 병참의 부조리",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["astra_militarum"] },
    reqLabel: "직업: 아스트라 밀리타룸 보병",
    weight: 24,
    text: "전선 투입 직전, 병참부에서 지급한 라스건 전지팩 절반이 불량품이고 탄약 상자에는 300년 전 봉건 행성용 화살촉이 들어 있었다! 그런데도 대대장은 《제국 보병 입문서》의 '제국 보급품에 의심을 품는 자는 총살' 조항을 낭독하고 있다.",
    choices: [
      {
        label: "[지성 판정] 밤새 불량 전지팩을 뜯어 정상 부품을 조합해 분대 무기를 살려 낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "테크프리스트 눈을 피해 라스건 출력을 되살려 냈다! 덕분에 다음 날 기습전에서 분대 전원이 살아남았다.",
          stats: { Int: 5, BS: 4, Fel: 4 }
        },
        fail: {
          text: "기계령 무단 개조 혐의로 엔지니어 사제에게 고발당해 징계 노역을 치렀다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[민첩 판정] 인접 연대 보급 창고에서 정상 전지팩을 몰래 '전략적 재배치'한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "아무도 모르게 최상급 탄약과 군화를 확보했다! 병사들이 그대를 전설의 보급 마술사로 떠받든다.",
          stats: { Ag: 5, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "헌병대에게 걸려 일주일간 영창에 갇힌 채 빵과 물만 먹었다.",
          wounds: -12,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "The Imperial Infantryman's Uplifting Primer"
  },
  {
    id: "ev_job_officer_attrition",
    title: "장교의 결단 — '병사 8,000명과 포탄 300발의 가격'",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["militarum_officer"] },
    reqLabel: "직업: 아스트라 밀리타룸 장교",
    weight: 24,
    text: "적 요새를 함락시킬 두 가지 작전안이 탁자 위에 올랐다. 사단 참모는 냉정하게 말한다. '정면 인해전술을 쓰면 병사 8,000명이 죽지만 귀한 바실리스크 포탄을 아끼고 6시간 빨리 점령해 승진할 수 있소.'",
    choices: [
      {
        label: "[지성 판정] 참모의 비웃음을 무릅쓰고 야간 우회 기동 작전을 직접 설계한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 400명의 손실만으로 요새를 함락시켰다! 병사들은 그대를 살아 있는 성자처럼 따르기 시작했다.",
          stats: { Int: 6, Fel: 8, Inf: 6 }
        },
        fail: {
          text: "우회로가 들켜 작전이 지연되자 상부로부터 '우유부단한 지휘'라는 경고를 받았다.",
          stats: { Inf: -6 },
          wounds: -14
        }
      },
      {
        label: "제국 군부의 계산법대로 정면 돌격 명령서에 서명한다",
        effect: {
          text: "8,000명의 시체 위로 제국 깃발이 꽂혔다. 군 사령부는 '모범적이고 신속한 제국식 승리'라며 훈장과 진급 점수를 내렸다.",
          stats: { Inf: 10, WP: 4, Fel: -6 },
          faith: -4
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War"
  },
  {
    id: "ev_job_psyker_commissar",
    title: "생션드 사이커 — 등 뒤의 장전된 볼트 피스톨",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["sanctioned_psyker"] },
    reqLabel: "직업: 생션드 사이커 · 아스트로패스",
    weight: 24,
    text: "적 중전차 부대가 아군 지휘부를 덮치기 직전이다! 한계치를 넘어 워프 번개를 끌어내면 전차대를 날려 버릴 수 있지만, 등 뒤에 붙은 감시 커미사르가 안전장치를 풀며 경고한다. '조금이라도 눈빛이 흔들리면 네 머리를 먼저 날리겠다, 마녀.'",
    choices: [
      {
        label: "[의지 판정] 생명을 걸고 극한의 워프 번개를 쏟아내 적 기갑대를 초토화한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "푸른 섬광이 적 전차 5대를 녹여 버렸다! 커미사르는 혀를 차며 권총을 집어넣었고 연대장이 경의를 표했다.",
          stats: { WP: 8, Int: 4, Inf: 8 },
          corruption: 6
        },
        fail: {
          text: "사이킥 역류로 코피를 쏟으며 쓰러졌고, 커미사르의 개머리판에 기절해 의무실로 실려 갔다. 목숨만 붙은 게 기적이었다.",
          wounds: -28,
          corruption: 12
        }
      },
      {
        label: "안전한 출력 범위 안에서 아군 사기 진작과 정찰 지원만 수행한다",
        effect: {
          text: "아군 피해는 커졌지만 워프 폭주도, 즉결 처형도 피했다. 사이커가 오래 사는 유일한 길이다.",
          stats: { WP: 3, Int: 3 }
        }
      }
    ],
    source: "Dark Heresy / Codex: Astra Militarum"
  },
  {
    id: "ev_rank_lord_commissar_front",
    title: "로드 커미사르의 위엄 — 무너지는 전구 사령부",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["lord_commissar"] },
    reqLabel: "계급: 로드 커미사르",
    weight: 28,
    text: "전선 전체가 카오스 공세에 밀리자, 겁에 질린 귀족 출신 사단장이 후퇴 명령서에 서명하려 한다! 3개 연대 4만 명 장병의 시선이 붉은 장식띠를 두른 로드 커미사르에게 쏠린다.",
    choices: [
      {
        label: "[권위/교섭 판정] 사단장을 현장에서 직위 해제하고 직접 전군 반격 나팔을 불게 한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "로드 커미사르의 우렁찬 연설에 4만 가드맨이 일제히 함성을 지르며 적진을 돌파했다! 제국 역사에 남을 대역전이었다.",
          stats: { Fel: 7, Inf: 10, WP: 6 },
          faith: 10
        },
        fail: {
          text: "귀족 장군파의 방해 속에 최선두에서 직접 싸우다 중상을 입었지만 전선만은 끝내 지켜 냈다.",
          wounds: -26,
          stats: { WS: 4, Inf: 5 }
        }
      }
    ],
    source: "Codex: Astra Militarum (Lord Commissar)"
  },
  {
    id: "ev_rank_scion_drop",
    title: "템페스투스 사이온 — 스콜라 기억의 균열과 강하",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["tempestus_scion"] },
    reqLabel: "계급: 템페스투스 사이온",
    weight: 26,
    text: "발키리 수송기가 대공포화를 뚫고 강하 구역으로 진입하는 순간, 스콜라 프로제니움에서 지워졌던 어린 시절 가족의 얼굴이 희미하게 뇌리를 스쳤다. 강하 신호등이 녹색으로 켜진다!",
    choices: [
      {
        label: "[의지 판정] 모든 사사로운 기억을 교리로 덮어 버리고 완벽한 제국의 무기로서 강하한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 치의 오차도 없는 기습 강하로 적 사령부를 3분 만에 섬멸했다! 템페스터 프라임으로 추대될 만한 전과였다.",
          stats: { WP: 6, BS: 6, Ag: 4, Inf: 6 }
        },
        fail: {
          text: "찰나의 망설임으로 착지 지점이 빗나가 대공 파편에 부상을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Codex: Militarum Tempestus"
  },
  {
    id: "ev_battle_titan_horn",
    title: "전장을 가르는 신의 포효 — 임페리얼 타이탄과 나이트의 진격",
    category: "전투",
    req: { minAge: 16, anyTags: ["militarum", "imperial_military", "astartes", "sororitas", "mechanicus"] },
    reqLabel: "제국 전투 · 기계교 직군",
    weight: 15,
    text: "적의 초중전차 사단에 포위되어 전멸이 눈앞에 닥친 순간, 지평선 너머로 거대한 임페리얼 나이트 기사단과 워로드 타이탄이 보이드 실드를 번뜩이며 강림했다! 10km 밖에서도 가슴 뼈가 울리는 워혼 포효가 전장을 뒤흔든다!",
    choices: [
      {
        label: "[백병/사격 판정] 타이탄의 발밑 엄호를 따라 무너진 적 전선으로 총돌격한다",
        check: { stat: "WS", diff: 10 },
        success: {
          text: "신의 기계가 쓸어버린 불길 뒤로 진격해 결정적인 적 요충지를 점령했다!",
          stats: { WS: 5, BS: 4, WP: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "타이탄 볼케이노 캐논의 충격파에 고막이 터질 듯한 부상을 입었으나 승리를 목격했다.",
          wounds: -16,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 거대 기사단과 보병대의 협동 표적 지시(오스펙스 유도)를 맡는다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "완벽한 화력 유도로 적 지휘부 3곳을 일격에 증발시켰다! 나이트 가문 기사가 경례를 보냈다.",
          stats: { Int: 5, BS: 4, Inf: 7 }
        },
        fail: {
          text: "적 저격수의 표적이 되어 어깨에 관통상을 입었다.",
          wounds: -20
        }
      }
    ],
    source: "Lexicanum: Imperial Knight / Adeptus Titanicus"
  },
  {
    id: "ev_commissar_deserter_hunt",
    title: "야간 순찰 — 얼어붙은 참호 뒤의 탈영병",
    category: "직업 고유",
    req: { anyCareers: ["commissar", "lord_commissar"] },
    reqLabel: "커미사르 / 로드 커미사르",
    weight: 22,
    text: "포격이 잠시 멎은 한밤중, 보급 창고 뒤에서 겁에 질려 총을 버린 채 도망치려는 17세 신병 둘을 붙잡았다. 아이들은 고향 어머니 이름을 부르며 살려 달라고 애원한다.",
    choices: [
      {
        label: "[의지 판정] 규범대로 즉결 처형을 집행해 연대 전체에 탈영은 곧 죽음임을 각인한다",
        check: { stat: "WP", diff: 10 },
        success: {
          text: "차가운 총성 이후 단 한 명의 탈영병도 나오지 않았다. 연대 군기는 강철처럼 단단해졌다.",
          stats: { WP: 5, Inf: 5, Fel: -2 }
        },
        fail: {
          text: "병사들의 원망 섞인 눈초리가 등 뒤에 꽂히며 사기가 오히려 흔들렸다.",
          stats: { Fel: -5 }
        }
      },
      {
        label: "[교섭 판정] 처형 대신 지뢰 제거 선봉대(징벌 임무)로 보내 목숨으로 속죄할 기회를 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "두 신병은 눈물을 닦고 필사적으로 싸워 다음 전투에서 훈장을 받았다! 병사들의 존경이 깊어졌다.",
          stats: { Fel: 6, Inf: 5, WP: 3 }
        },
        fail: {
          text: "상급 커미사르에게 '규율 해이' 경고를 받았다.",
          stats: { Inf: -5 }
        }
      }
    ],
    source: "Gaunt's Ghosts / Ciaphas Cain"
  },
  {
    id: "ev_career_pdf_drill",
    title: "행성 방위군(PDF) — 총독의 열병식 vs 진짜 반란 첩보",
    category: "직군 고유",
    req: { anyCareers: ["pdf_trooper"] },
    reqLabel: "직군: 행성 방위군(PDF)",
    weight: 26,
    text: "행성 총독의 화려한 승천 기념 열병식을 하루 앞두고, 하수도 초소에서 수상한 변이체 무장 집단이 발견되었다는 무전이 들어왔다. 연대장은 '총독 각하의 심기를 건드리지 말고 열병식 군화나 닦으라'며 첩보를 묵살하려 한다!",
    choices: [
      {
        label: "[사격 판정] 명령을 어기고 분대를 이끌어 하수도 반란 거점을 선제 타격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "열병식 폭탄 테러를 미연에 막아 냈다! 아스트라 밀리타룸 징병관이 그대의 실전 감각을 극찬하며 추천장을 써 주었다.",
          stats: { BS: 5, WP: 4, Inf: 6 }
        },
        fail: {
          text: "화력 부족으로 부상을 입고 후퇴했다. 상부에서는 '열병식 무단 이탈'로 영창 처분까지 내렸다!",
          wounds: -18,
          stats: { Inf: -4, T: 3 }
        }
      },
      {
        label: "상관의 명령대로 군화를 광내고 열병식 사열대에 완벽하게 선다",
        effect: {
          text: "총독의 호평을 받아 포상 휴가를 받았지만, 며칠 뒤 외곽 발전소가 괴한의 습격으로 불타올랐다.",
          stats: { Fel: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Planetary Defence Forces / Only War"
  },
  {
    id: "ev_career_guard_salvage",
    title: "아스트라 밀리타룸 — 포격 뒤 무주지의 보급품과 전우의 군번줄",
    category: "직군 고유",
    req: { anyCareers: ["astra_militarum"] },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 25,
    text: "양측의 포격이 잠시 멎은 틈, 철조망 너머 무주지에 부서진 보급 수송차와 쓰러진 선임 병사의 시신이 보인다. 적 저격수가 노리고 있을 것이 분명하지만, 분대에는 탄약과 깨끗한 붕대가 바닥난 상태다.",
    choices: [
      {
        label: "[민첩 판정] 포탄 구덩이를 포복으로 기어가 탄약 상자와 선임의 군번줄을 모두 회수한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "저격탄 두 발이 철모를 스쳤으나 기어이 탄약과 군번줄을 품고 돌아왔다! 분대원들이 그대를 진정한 베테랑으로 대우하기 시작했다.",
          stats: { Ag: 5, WP: 4, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "종아리에 저격탄을 스치고 간신히 철조망 아래로 굴러 떨어졌다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 먼저 폐허 창문을 향해 역저격 사격을 가해 적 저격수를 제압한 뒤 전진한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "단 한 발의 과충전 라스 샷이 적 저격수의 조준경을 꿰뚫었다! 분대 전원이 안전하게 보급품을 확보했다.",
          stats: { BS: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "위치가 노출되어 적 박격포탄이 참호 바로 옆에 떨어졌다.",
          wounds: -18,
          stats: { BS: 2 }
        }
      },
      {
        label: "무모한 출격을 막고 남은 탄약을 아끼며 야간 증원 부대를 기다린다",
        effect: {
          text: "냉정한 판단 덕에 분대 사상자를 줄이고 다음 날 반격을 준비할 수 있었다.",
          stats: { Int: 3, T: 2 }
        }
      }
    ],
    source: "Only War Core / Fifteen Hours"
  },
  {
    id: "ev_rank_officer_court_martial",
    title: "야전 장교 — 무능한 귀족 연대장의 자살 돌격 명령",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["militarum_officer"] },
    reqLabel: "계급: 아스트라 밀리타룸 장교",
    weight: 28,
    text: "후방에서 포도주나 마시던 귀족 출신 사단장이 '내일 새벽 포병 지원 없이 지뢰밭 정면으로 총검 돌격하라'는 미친 명령을 하달했다. 그대로 따르면 휘하 장병 4,000명이 10분 만에 갈려 나가고, 거역하면 군법회의와 커미사르의 총구가 기다린다!",
    choices: [
      {
        label: "[교섭/권위 판정] 연대 커미사르에게 냉정한 전술 손실 데이터를 제시해 합법적인 작전 수정권을 얻어 낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "합리적인 커미사르가 그대의 야간 우회 포격안에 서명했다! 4,000명의 목숨을 구하고 적 고지까지 완벽히 점령했다!",
          stats: { Fel: 7, Int: 6, Inf: 8 }
        },
        fail: {
          text: "귀족 사단장의 노여움을 사 징계 기록이 남았으나, 그래도 최소한의 연막탄 지원만은 받아 냈다.",
          stats: { Inf: -5, WP: 4 }
        }
      },
      {
        label: "명령은 절대다. 병사들 맨 앞에 서서 직접 파워 소드를 뽑아 들고 지뢰밭 돌파를 선도한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "처참한 피해 속에서도 장교가 선두에서 쓰러지지 않자 병사들이 악귀처럼 돌격해 기어이 참호를 탈환했다!",
          stats: { WP: 7, WS: 5, Inf: 6 },
          wounds: -22
        },
        fail: {
          text: "지뢰 파편을 맞고 야전 병원으로 실려 갔다. 부대는 절반을 잃고 후퇴했다.",
          wounds: -30,
          stats: { T: 3 }
        }
      }
    ],
    source: "Only War Core / Gaunt's Ghosts"
  },
  {
    id: "ev_rank_commissar_friendly_fire",
    title: "커미사르 — '후방 오발 사고'의 소문과 가드맨들의 시선",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["commissar"] },
    reqLabel: "계급: 제국 커미사르",
    weight: 28,
    text: "새로 배속된 카타찬·하이브 혼성 연대. 전임 커미사르는 너무 가혹하게 병사들을 즉결 처형하다가 야간 전투 중 '원인 불명의 아군 오발 사고'로 전사했다고 한다. 막사 천막 뒤편에서 병사들이 날 선 눈초리로 새 커미사르인 그대를 지켜보고 있다.",
    choices: [
      {
        label: "[교섭 판정] 불필요한 공포 대신 보급 비리를 척결하고 최전선에서 병사들과 같은 식량을 나눈다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "건트와 케인의 방식이 통했다! 부패한 병참 장교를 즉결 처분하자 병사들이 환호하며 그대를 '우리 커미사르'로 인정했다.",
          stats: { Fel: 7, WP: 5, Inf: 6 }
        },
        fail: {
          text: "유약한 커미사르로 오해받아 군기가 해이해질 뻔했으나, 야간 전투에서 직접 적을 베어 신뢰를 되찾았다.",
          stats: { WS: 4, WP: 3 }
        }
      },
      {
        label: "[의지/백병 판정] 반항적인 고참 병사와 정면으로 마주 서서 흔들림 없는 카리스마로 군기를 바로잡는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 발의 처형도 없이 압도적인 위엄과 실력으로 연대 전체의 존경과 복종을 끌어냈다!",
          stats: { WP: 7, WS: 5, Inf: 6 }
        },
        fail: {
          text: "다음 날 야간 순찰 중 어둠 속에서 날아온 '유탄'에 팔을 스쳤다. 이 연대에서는 등을 절대 보이지 말아야 한다.",
          wounds: -18,
          stats: { Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: Commissar / Catachan Jungle Fighters Lore"
  },
  {
    id: "ev_rank_lord_commissar_duel",
    title: "로드 커미사르 — 무너지는 전선 앞 카오스 챔피언 일기토",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["lord_commissar"] },
    reqLabel: "계급: 로드 커미사르",
    weight: 28,
    text: "전구 방어선의 최후 보루가 무너지기 일보 직전, 거대한 카오스 마린 챔피언이 피 묻은 파워 액스를 들고 참호 위로 뛰어내렸다! 가드맨 수천 명이 공포에 질려 뒷걸음질치는 순간, 로드 커미사르인 그대가 붉은 휘장을 휘날리며 앞을 가로막는다.",
    choices: [
      {
        label: "[백병 판정] 파워 피스트와 볼트 피스톨을 쥐고 필멸자의 몸으로 카오스 챔피언과 정면 일기토를 벌인다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "기적적인 틈을 찔러 볼트탄을 챔피언의 투구 렌즈에 박아 넣었다! 수천 가드맨의 함성과 함께 무너지던 전선이 역공으로 뒤집혔다!",
          stats: { WS: 7, WP: 8, Inf: 12 },
          faith: 15,
          wounds: -14
        },
        fail: {
          text: "거인의 일격에 갈비뼈가 부러지며 날아갔으나, 쓰러지며 던진 멜타 폭탄이 적을 날려 버리며 전선을 지켜 냈다!",
          wounds: -30,
          stats: { WP: 6, Inf: 6 }
        }
      },
      {
        label: "[교섭/사격 판정] '제1열 사격! 제2열 착검!' 일사불란한 집중 일제 사격으로 거인을 벌집으로 만든다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "로드 커미사르의 우레 같은 호령 아래 수백 정의 라스건과 플라즈마 건이 동시에 불을 뿜어 카오스 챔피언을 증발시켰다!",
          stats: { Fel: 7, BS: 5, Inf: 8 }
        },
        fail: {
          text: "사격이 흩어져 상당한 피해를 입었으나 끝내 대전차포 지원으로 적을 쓰러뜨렸다.",
          wounds: -16,
          stats: { WP: 4 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Sebastian Yarrick Lore"
  },
  {
    id: "ev_s2_scion_orbital_drop",
    title: "템페스투스 사이온 — 발키리 고공 강하와 적 사령관 참수",
    category: "군사",
    once: true,
    req: { anyCareers: ["tempestus_scion"] },
    reqLabel: "병종: 템페스투스 사이온",
    weight: 34,
    text: "대공포화가 밤하늘을 찢는 적 요새 상공에서 발키리 수송선의 후방 램프가 열렸다. 템페스터 프라임이 무전으로 짧게 지시한다. '목표는 적 사령부 벙커. 착지 후 90초 안에 지휘 체계를 절단한다.'",
    choices: [
      {
        label: "[사격 판정] 중력 낙하산이 접히자마자 핫샷 라스건 정밀 사격으로 적 사령관과 호위대를 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "단 74초 만에 적 지휘부가 붕괴되었다! 밀리타룸 템페스투스의 정예 기량을 유감없이 증명했다.",
          stats: { BS: 7, Ag: 5, Inf: 6 },
          addTags: ["elite_troop"]
        },
        fail: {
          text: "착지 지점에 매복한 중기관총 사격에 캐러페이스 갑주가 뚫려 중상을 입었으나, 기어이 목표를 사살했다.",
          wounds: -20,
          stats: { BS: 3 }
        }
      },
      {
        label: "[민첩 판정] 야간 연막과 열화상 교란기를 뿌려 적 방공 레이더 기지를 우회 폭파한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "적 대공망이 일순간 먹통이 되며 제국 본대 강습 함대가 무손실로 상륙하는 쾌거를 이루었다!",
          stats: { Ag: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "레이더 폭발 파편에 다리를 다쳤으나 아군 증원군이 도착할 때까지 은폐 지점을 지켜 냈다.",
          wounds: -18,
          stats: { Ag: 2 }
        }
      },
      {
        label: "스콜라 프로제니움의 완벽한 전술 교본대로 지정된 교두보만 한 치 오차 없이 확보한다",
        effect: {
          text: "냉혹하고 무결한 임무 완수였다. 템페스투스 사이온은 칭찬이 아니라 명령을 위해 존재한다.",
          stats: { WP: 5, BS: 4, T: 3 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Lexicanum: Tempestus Scions"
  },
  {
    id: "ev_s4_career_guard_ration",
    title: "아스트라 밀리타룸 — 빗물 고인 참호의 보급 오발송",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 16,
      anyCareers: ["astra_militarum"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 30,
    text: "진흙탕 참호에서 사흘째 비를 맞고 있던 중대에 드디어 제국 병참 보급 상자가 투하되었다. 그러나 뚜껑을 열어 보니 라스건 동력팩과 전투 식량 대신, 어째서인지 사막 행성용 방열 망토와 타 연대용 탄약이 가득 들어 있다. 행정 착오다.",
    choices: [
      {
        label: "[교섭 판정] 옆 참호에 주둔 중인 타 연대 보급 하사관을 찾아가 기막힌 물물교환 거래를 성사시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "방열 망토를 따끈한 리카프(Recaf) 커피와 동력팩, 여분 양말로 바꿔 왔다! 분대원들이 그대를 최고의 보급 천재라 환호했다.",
          stats: { Fel: 7, Int: 4, Inf: 4 }
        },
        fail: {
          text: "거래 도중 군기 담당 상사에게 들켜 훈계를 들었으나, 식량 몇 상자는 챙겨 돌아왔다.",
          stats: { Fel: 3, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 방열 망토를 참호 방수 천막으로 개조하고 남은 동력팩을 화톳불에 충전해 밤을 넘긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "교본엔 없지만 전장에서는 통하는 야전 지혜! 부대 전체가 감기와 동상을 피하고 다음 날 전투에 완벽히 대비했다.",
          stats: { Int: 6, T: 5, BS: 3 }
        },
        fail: {
          text: "동력팩 하나가 과열되어 터지는 바람에 손등을 데었으나, 천막은 제법 쓸 만했다.",
          wounds: -10,
          stats: { Int: 3, T: 3 }
        }
      },
      {
        label: "불평하지 않고 병참 오발송 보고서를 써 올린 뒤 있는 탄약만으로 경계 근무를 선다",
        effect: {
          text: "아스트라 밀리타룸의 병사는 보급이 오지 않아도 싸우는 법을 안다. 인내심이 한층 깊어졌다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Departmento Munitorum / Astra Militarum Lore"
  },
  {
    id: "ev_s6_gender_mortal_frontline",
    title: "제국의 전선에 남녀는 없다 — 구시대 귀족 연락관의 편견을 부수는 화망",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 18,
      gender: "female",
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_officer", "commissar", "arbites", "imperial_navy"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "여성 · 제국 정규 무관·치안 직군",
    weight: 28,
    text: "인류제국의 라스건과 포탄은 성별을 가리지 않건만, 보수적인 변방 봉건 귀족 가문에서 낙하산으로 내려온 신임 연락관은 그대의 전술 보고를 듣지도 않은 채 '전선 지휘는 거친 사내들의 몫'이라며 거만하게 비웃었다. 바로 그때 전초 기지 외곽에서 적 강습대의 경보가 터졌다.",
    choices: [
      {
        label: "[사격 판정] 말대꾸 대신 직접 저격 조준경과 화력 유도기를 잡아 적 선봉 장교 셋을 10초 만에 쓰러뜨린다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "총성이 멎자 얼굴이 하얗게 질린 귀족 연락관이 바닥에 엎드린 채 아무 말도 못 했다! 부대원들의 통쾌한 환호가 참호를 울렸다.",
          stats: { BS: 7, Inf: 7, Fel: 4 }
        },
        fail: {
          text: "적 박격포 파편에 스쳐 피를 흘리면서도 끝까지 지휘권을 놓지 않아 반격을 성공시켰다.",
          wounds: -14,
          stats: { BS: 4, WP: 5 }
        }
      },
      {
        label: "[교섭 판정] 제국 군법과 수많은 여성 로드 제너럴·캐노네스의 전례를 서늘하게 읊어 연락관의 기를 꺾어 놓는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "상급 사령부 감찰관마저 그대의 편을 들며 연락관을 즉각 후방 창고로 좌천시켰다! 통쾌하고 품격 있는 승리였다.",
          stats: { Fel: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "귀족 가문의 반발로 잠시 껄끄러운 신경전을 치렀으나, 현장 지휘권만큼은 흔들리지 않았다.",
          stats: { Fel: 3, WP: 4 }
        }
      },
      {
        label: "오만한 풋내기의 헛소리는 무시하고 오직 전선 방어와 부하들의 생존에만 집중한다",
        effect: {
          text: "실적과 살아남은 부하들의 신뢰가 그 어떤 변명보다 강하게 진실을 증명했다.",
          stats: { WP: 5, Int: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Astra Militarum / Ciaphas Cain & Gaunt's Ghosts Lore"
  }
);
