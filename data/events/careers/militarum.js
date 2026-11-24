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
    id: "ev_job_officer_attrition",
    title: "장교의 결단 — '병사 8,000명과 포탄 300발의 가격'",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["militarum_officer", "militarum_general"] },
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
    req: { anyCareers: ["lord_commissar", "commissar_general"] },
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
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
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
    id: "ev_rank_officer_court_martial",
    title: "야전 장교 — 무능한 귀족 연대장의 자살 돌격 명령",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["militarum_officer", "militarum_general"] },
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
    req: { anyCareers: ["lord_commissar", "commissar_general"] },
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
    req: { anyCareers: ["tempestus_scion", "tempestus_prime_cmd"] },
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
  },
  // =========================================================================
  // 12단계: 사이온 · 야전 장교 · PDF · 커미사르 심화 사건 9종
  // =========================================================================
  {
    id: "ev_s12_scion_prime_exam",
    title: "템페스투스 사이온 — 템페스투스 프라임 지휘관 실전 심사",
    category: "직군 심화",
    once: true,
    req: { anyCareers: ["tempestus_scion"], excludeTags: ["tempestus_prime"] },
    reqLabel: "직군: 템페스투스 사이온",
    weight: 34,
    text: "스콜라 교관 출신 사령관이 지휘 소대 공석을 채우기 위해 실탄 대항 강하 심사를 열었다. 3분 안에 적 레이더 기지를 점령하고 교란 비콘을 켜는 분대장에게 템페스투스 프라임(Tempestus Prime)의 지휘 코트가 수여된다.",
    choices: [
      {
        label: "[사격 판정] 핫샷 라스건 과출력 사격으로 적 자동 포탑 네 기를 순식간에 무력화하며 돌파한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "오차 0.4초의 정밀 돌파! 사령관이 직접 황금 테두리의 템페스투스 프라임 롱코트를 그대의 어깨에 걸쳐 주었다.",
          stats: { BS: 7, Inf: 8, WP: 5 },
          addTags: ["tempestus_prime"]
        },
        fail: {
          text: "모의 방어 포탑의 충격탄에 쓰러지며 탈락했으나, 교관은 그대의 투지를 높이 샀다.",
          wounds: -14,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 정면 돌파 대신 환기구 침투와 연막 교란을 결합해 사상자 0명으로 목표를 장악한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "교과서에 실릴 완벽한 특전 지휘였다! 즉시 템페스투스 프라임으로 임명되어 정예 강하 소대를 지휘하게 되었다.",
          stats: { Int: 7, Ag: 5, Inf: 8 },
          addTags: ["tempestus_prime"]
        },
        fail: {
          text: "우회 경로가 봉쇄되어 제한 시간을 12초 넘겼으나, 전술 평가는 최상위를 받았다.",
          stats: { Int: 4, Ag: 3 }
        }
      },
      {
        label: "지휘관 경쟁 대신 최선봉 강하병으로 남아 동료 후보의 측면을 완벽히 엄호한다",
        effect: {
          text: "명예보다 임무를 우선하는 진정한 사이온의 귀감으로 소대 전원의 존경을 얻었다.",
          stats: { WP: 5, Fel: 4, T: 3 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Lexicanum: Tempestor Prime"
  },
  {
    id: "ev_s12_scion_inquisitor_requisition",
    title: "템페스투스 사이온 — 이단심문관의 긴급 징발과 이중 명령",
    category: "직군 심화",
    req: { anyCareers: ["tempestus_scion"] },
    reqLabel: "직군: 템페스투스 사이온",
    weight: 26,
    text: "아스트라 밀리타룸 군단장이 그대의 소대에 적 지휘소 타격을 명한 직후, 검은 코트의 오르도 제노스 이단심문관이 로제트를 내밀며 '내 비밀 작전 호위로 즉각 전환하라'고 징발령을 내렸다. 두 명령은 동시에 수행할 수 없다.",
    choices: [
      {
        label: "[의지 판정] 황제의 로제트 권위에 따라 이단심문관의 비밀 침투 작전을 완수한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "외계 암살단 소굴에서 이단심문관의 목숨을 구해 냈다! 심문관의 신임장과 비밀 연락망을 얻었다.",
          stats: { WP: 6, Inf: 7, BS: 4 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "외계 함정에 걸려 중상을 입었으나 끝까지 이단심문관을 호위해 임무를 마쳤다.",
          wounds: -20,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 소대를 절반으로 나누어 최정예만 심문관을 호위하고 본대는 원임무를 동시 달성하는 기적을 노린다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "숨 막히는 시간 계산 끝에 두 작전을 모두 성공시켰다! 군단장과 이단심문관 양측에서 경탄의 찬사가 쏟아졌다.",
          stats: { Int: 8, Inf: 9, Ag: 4 }
        },
        fail: {
          text: "병력 분산으로 본대가 큰 피해를 입고 퇴각해야 했으며 군법 회의 경고를 받았다.",
          wounds: -18,
          stats: { Inf: -4, WP: 3 }
        }
      },
      {
        label: "이단심문관에게 정식 서면 징발 명령서를 요구해 군단 지휘부에 합법적으로 책임을 이관한다",
        effect: {
          text: "스콜라 프로제니움에서 배운 제국 군법 절차대로 깔끔하게 지휘 충돌을 정리했다.",
          stats: { Int: 4, Inf: 4, WP: 3 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Dark Heresy"
  },
  {
    id: "ev_s12_scion_taurox_raid",
    title: "템페스투스 사이온 — 타우록스 프라임 기갑 강습",
    category: "직군 심화",
    req: { anyCareers: ["tempestus_scion"] },
    reqLabel: "직군: 템페스투스 사이온",
    weight: 26,
    text: "아군 수송선단의 강하를 가로막는 적 초중량 대공포 진지! 그대의 사이온 분대는 타우록스 프라임(Taurox Prime) 장갑차에 탑승해 적 지뢰밭과 포화 사이를 뚫고 대공포 통제 벙커를 폭파해야 한다.",
    choices: [
      {
        label: "[민첩 판정] 장갑차가 뒤집힐 듯한 급기동으로 포탄을 피해 벙커 정문에 돌진, 멜타 차지를 부착한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "거대한 폭발과 함께 대공포가 침묵하고 아군 발키리 편대가 안전하게 하늘을 장악했다!",
          stats: { Ag: 7, BS: 5, Inf: 5 }
        },
        fail: {
          text: "대전차 지뢰에 장갑차 궤도가 날아가며 충격을 입었으나 도보 돌격으로 임무를 완수했다.",
          wounds: -20,
          stats: { T: 4, WS: 4 }
        }
      },
      {
        label: "[사격 판정] 타우록스 개틀링 캐논과 핫샷 발리건의 집중 사격으로 적 대전차 보병부터 쓸어 버린다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "탄피가 산처럼 쌓이는 맹화력으로 적 방어선을 갈아엎고 무사히 벙커를 점령했다!",
          stats: { BS: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "적 로켓탄이 차체 측면을 뚫고 들어와 파편상을 입었다.",
          wounds: -18,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "연막탄을 살포해 적 시야를 가린 뒤 장거리 유도 비콘만 투척해 궤도 폭격을 호출한다",
        effect: {
          text: "전술적 판단으로 분대 손실 없이 대공포 진지를 지워 버렸다.",
          stats: { Int: 5, WP: 3 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Lexicanum: Taurox Prime"
  },
  {
    id: "ev_s12_officer_munitorum_audit",
    title: "야전 장교 — 무니토룸 병참관과의 탄약 배정 담판",
    category: "직군 심화",
    req: { anyCareers: ["militarum_officer", "militarum_general"] },
    reqLabel: "직군: 아스트라 밀리타룸 장교",
    weight: 28,
    text: "대공세를 사흘 앞두고 데파트멘토 무니토룸 병참관이 연대에 배정된 포탄과 의료품의 40%를 '행정 우선순위 재조정' 명목으로 귀족 출신 후방 사단에 넘기려 한다. 이대로면 연대 병사 수천 명이 맨손으로 돌격해야 한다.",
    choices: [
      {
        label: "[교섭 판정] 전구 사령부 참모 인맥과 명분을 총동원해 병참관을 설득하고 오히려 예비 포탄까지 끌어온다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "완벽한 협상으로 탄약과 야전 식량이 가득 실린 수송 열차가 연대 진지에 도착했다! 병사들이 환호했다.",
          stats: { Fel: 7, Inf: 7, Int: 4 }
        },
        fail: {
          text: "병참관이 규정집만 들이밀며 버티는 바람에 절반만 겨우 되찾았다.",
          stats: { Fel: 3, Inf: -2 }
        }
      },
      {
        label: "[권위 판정] 전시 긴급 징발 조항을 발동해 무장 호위대와 함께 탄약 창고에서 직접 물자를 인수한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "서슬 퍼런 전선 지휘관의 기세에 병참관이 고개를 숙였다! 연대의 화력이 완벽히 보전되었다.",
          stats: { Inf: 8, WP: 5 }
        },
        fail: {
          text: "상급 사령부에 월권 보고가 올라가 견책 서한을 받았으나, 연대 병사들은 무사히 탄약을 받았다.",
          stats: { Inf: -5, Fel: 4 }
        }
      },
      {
        label: "행정 분쟁에 시간을 낭비하는 대신 부족한 포탄에 맞춰 야간 근접 침투 위주로 작전 계획을 전면 수정한다",
        effect: {
          text: "주어진 조건에서 최선의 해법을 찾아낸 냉철한 지휘력 덕분에 공세를 성공적으로 이끌었다.",
          stats: { Int: 6, WP: 4 }
        }
      }
    ],
    source: "Only War Core / Codex: Astra Militarum"
  },
  {
    id: "ev_s12_officer_feint_order",
    title: "야전 장교 — 사단장의 미끼 양동 작전 지시",
    category: "직군 심화",
    req: { anyCareers: ["militarum_officer", "militarum_general"] },
    reqLabel: "직군: 아스트라 밀리타룸 장교",
    weight: 26,
    text: "사단 지휘부에서 기밀 명령이 내려왔다. 주력 기갑 사단이 적 측면을 돌파할 시간을 벌기 위해, 그대의 연대가 대낮에 적 최강 요새 정면으로 미끼 돌격을 감행해 적의 화력을 모두 끌어들이라는 것이다. 예상 사상률은 60% 이상이다.",
    choices: [
      {
        label: "[지성 판정] 명령은 이행하되 가짜 기갑 모형과 연막 포격을 조합해 실제 병력 노출을 최소화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "적 사령부가 완벽히 속아 포화를 헛곳에 쏟아부었고, 아군 주력이 전선을 돌파했다! 병사들의 목숨도 구했다.",
          stats: { Int: 8, Inf: 8, Fel: 5 }
        },
        fail: {
          text: "적이 기만을 간파해 예비대가 노출되면서 지휘 차량이 피격당했다.",
          wounds: -20,
          stats: { Int: 4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 지휘검을 뽑고 최선두에서 병사들과 함께 돌격해 명령을 완수한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "지휘관이 앞장선 연대의 기세에 적 요새가 오히려 뚫려 버렸다! 전구 최고의 영웅으로 훈장을 받았다.",
          stats: { WP: 7, WS: 6, Inf: 9 },
          faith: 6
        },
        fail: {
          text: "참혹한 피해 속에 중상을 입었으나 끝까지 적 화력을 붙잡아 사단 전체의 승리를 이끌었다.",
          wounds: -24,
          stats: { WP: 5, Inf: 4 }
        }
      },
      {
        label: "부하들에게 진실을 숨기지 않고 황제를 위한 숭고한 희생을 고한 뒤 교본대로 양동 기동을 펼친다",
        effect: {
          text: "비장한 침묵 속에 연대는 묵묵히 제국을 위한 의무를 다했다. 밤이 되자 빈 군번줄이 산처럼 쌓였다.",
          stats: { WP: 6, Fel: 4, Inf: 3 }
        }
      }
    ],
    source: "Gaunt's Ghosts / Codex: Astra Militarum"
  },
  {
    id: "ev_s12_pdf_cult_cell",
    title: "행성 방위군(PDF) — 탄약고 도난 사건과 내부 배신자",
    category: "직군 심화",
    req: { anyCareers: ["pdf_trooper"] },
    reqLabel: "직군: 행성 방위군(PDF)",
    weight: 28,
    text: "평온해 보이던 행성 주둔 기지에서 지난 한 달간 오토건 200정과 수류탄 상자가 감쪽같이 사라졌다. 야간 순찰 중 보급 장교가 하층 구역의 정체불명 민간 트럭에 군수 상자를 실어 보내는 장면을 우연히 목격했다!",
    choices: [
      {
        label: "[백병 판정] 도주하려는 배신자 장교와 무장 밀수꾼들을 현장에서 정면으로 덮쳐 제압한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "치열한 창고 격투 끝에 반역 세포 전원을 생포했다! 트럭 안에는 진스틸러 교단의 상징이 숨겨져 있었다.",
          stats: { WS: 6, WP: 5, Inf: 7 }
        },
        fail: {
          text: "밀수꾼의 산탄에 부상을 입었으나 경보를 울려 무기 반출을 막아 냈다.",
          wounds: -18,
          stats: { T: 4, WS: 3 }
        }
      },
      {
        label: "[지성 판정] 성급히 나서지 않고 트럭 번호판과 하역 장소를 추적해 아르비테스에 밀고한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "아르비테스 기동대가 배후 반란 본부까지 일망타진했다! 행성 치안 유공 표창을 받았다.",
          stats: { Int: 6, Inf: 6, Ag: 3 }
        },
        fail: {
          text: "미행이 들켜 골목에서 습격을 당했으나 가까스로 빠져나와 보고를 마쳤다.",
          wounds: -14,
          stats: { Ag: 3, Int: 3 }
        }
      },
      {
        label: "즉시 당직 사령실에 무기 도난 비상 경보를 발령해 기지 전체를 봉쇄한다",
        effect: {
          text: "주동자 일부는 도망쳤지만 도난당한 탄약과 총기를 모두 회수해 행성의 위기를 막았다.",
          stats: { WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Planetary Defence Forces / Dark Heresy"
  },
  {
    id: "ev_s12_pdf_orbital_alarm",
    title: "행성 방위군(PDF) — 궤도 방어 포대의 심야 오경보와 진짜 신호",
    category: "직군 심화",
    req: { anyCareers: ["pdf_trooper"] },
    reqLabel: "직군: 행성 방위군(PDF)",
    weight: 26,
    text: "노후화된 행성 궤도 방어 레이더가 또다시 미확인 낙하 물체를 포착했다. 선임 관측병은 '어차피 운석 파편이거나 낡은 코지테이터 오작동이니 경보 끄고 자자'고 투덜거리지만, 신호의 강하 궤적이 이상할 정도로 일정하다.",
    choices: [
      {
        label: "[지성 판정] 고대 오스펙스 주파수를 수동 보정해 신호의 진짜 정체를 판독한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "오크 약탈자들의 암석 강하선(Rok)이었다! 조기 경보 덕분에 궤도 방어 포대가 대기권 진입 전에 격추했다.",
          stats: { Int: 7, Inf: 7, BS: 4 }
        },
        fail: {
          text: "판독이 늦어 낙하선 한 기가 외곽 농장에 추락했으나, 즉각 출동해 잔당을 소탕했다.",
          wounds: -16,
          stats: { Int: 3, BS: 4 }
        }
      },
      {
        label: "[사격 판정] 방공 포대 비상 발사 절차를 개시해 미확인 낙하 물체에 선제 요격 사격을 퍼붓는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "밤하늘에 붉은 섬광이 터지며 해적 강습정 세 척이 산산조각 났다! 행성의 영웅으로 추앙받았다.",
          stats: { BS: 7, WP: 4, Inf: 6 }
        },
        fail: {
          text: "고장 난 포신이 과열되어 경상을 입었으나 해적선을 퇴각시키는 데는 성공했다.",
          wounds: -12,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "경보를 끄지 않고 상급 방어 사령부에 즉시 보고서를 올려 판단을 요청한다",
        effect: {
          text: "원칙을 지킨 보고 덕분에 주둔군 전체가 전투 태세를 갖춰 피해를 막았다.",
          stats: { WP: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Planetary Defence Forces"
  },
  {
    id: "ev_s12_commissar_cadet_mentor",
    title: "커미사르 — 신참 커미사르 생도의 과잉 처형 제지",
    category: "직군 심화",
    req: { anyCareers: ["commissar", "lord_commissar"] },
    reqLabel: "직군: 커미사르 · 로드 커미사르",
    weight: 26,
    text: "스콜라 프로제니움을 갓 졸업한 열혈 커미사르 생도가 보좌관으로 배속되었다. 그런데 첫날부터 보급이 끊겨 장화가 찢어진 베테랑 분대원 하나를 '제복 불량 및 태만' 혐의로 즉결 총살하려 볼트 피스톨을 뽑았다! 주변 연대 병사들의 눈빛이 살벌하게 굳는다.",
    choices: [
      {
        label: "[교섭 판정] 생도의 팔을 부드럽지만 단호하게 내리고 '공포만으로 이기는 커미사르는 오래 못 산다'고 가르친다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "생도가 부끄러워하며 권총을 집어넣었고, 베테랑 분대가 그대를 향해 진심 어린 경례를 올렸다! 연대 사기가 크게 올랐다.",
          stats: { Fel: 7, Inf: 6, WP: 4 }
        },
        fail: {
          text: "생도가 '군기 해이'라며 투덜거렸으나 끝내 그대의 권위에 승복했다.",
          stats: { Fel: 3, Inf: 3 }
        }
      },
      {
        label: "[의지 판정] 처형 대신 그 병사에게 최전방 수색 임무라는 '명예로운 속죄 기회'를 부여해 규율과 사기를 모두 잡는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "규율의 엄정함과 현장 지휘관의 지혜를 모두 보여 주었다! 생도는 그대를 평생의 스승으로 따르게 되었다.",
          stats: { WP: 6, Int: 5, Inf: 6 }
        },
        fail: {
          text: "어수선한 분위기가 잠시 이어졌으나 불필요한 유혈 사태는 막았다.",
          stats: { WP: 4, Inf: 2 }
        }
      },
      {
        label: "생도의 처형을 막되 병사에게는 규정에 따른 야간 참호 보수 징계로 사건을 매듭짓는다",
        effect: {
          text: "병사도, 생도도 납득할 합리적인 선에서 군기를 바로 세웠다.",
          stats: { Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Ciaphas Cain Novels / Gaunt's Ghosts / Lexicanum: Commissar"
  },
  {
    id: "ev_s12_lord_commissar_mutiny",
    title: "로드 커미사르 — 패주 직전 3개 연대의 집단 항명",
    category: "직군 심화",
    req: { anyCareers: ["lord_commissar", "commissar_general"] },
    reqLabel: "직군: 로드 커미사르",
    weight: 30,
    text: "열흘간의 악마 침공과 연속 패전 끝에 전선의 3개 연대가 한꺼번에 무기를 내던지고 후방 우주 항구로 몰려들고 있다! 헌병대조차 막지 못하는 수만 명의 패주 물결 앞에, 그대는 검은 제복 차림으로 홀로 바리케이드 위에 올라섰다.",
    choices: [
      {
        label: "[교섭 판정] 확성기 없이 육성으로 황제의 이름과 전사한 전우들의 명예를 외쳐 패주병들의 심장을 되살린다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "천둥 같은 연설이 패주 물결을 멈춰 세웠다! 울부짖던 병사들이 하나둘 라스건을 다시 쥐고 그대의 뒤를 따라 역공에 나섰다.",
          stats: { Fel: 9, WP: 6, Inf: 10 },
          faith: 8
        },
        fail: {
          text: "성난 폭도 일부가 돌과 탄환을 날렸으나 끝까지 바리케이드를 버티며 결국 주력을 진정시켰다.",
          wounds: -18,
          stats: { WP: 6, Inf: 5 }
        }
      },
      {
        label: "[의지 판정] 가장 먼저 도주를 선동한 반역 장교 셋을 단발 사격으로 처결하고 전선 복귀 명령을 선포한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "압도적인 서슬과 공포 앞에 수만 명의 병사가 일제히 부동자세로 굳었다! 무너진 전선이 기적처럼 복구되었다.",
          stats: { WP: 8, BS: 5, Inf: 9 }
        },
        fail: {
          text: "일부 병사들이 총격을 주고받으며 혼란이 커졌으나 충성파 장교들의 지원으로 항명을 진압했다.",
          wounds: -20,
          stats: { WP: 5, Inf: 4 }
        }
      },
      {
        label: "패주병들을 무작정 몰아붙이지 않고 항구 외곽에 2차 저지선을 선포해 질서 있는 재편성부터 지휘한다",
        effect: {
          text: "현실적인 재편성 명령에 탈진한 연대들이 안도하며 다시 지휘 통제 안으로 들어왔다.",
          stats: { Int: 6, Fel: 5, Inf: 5 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Lord Commissar"
  }
);

