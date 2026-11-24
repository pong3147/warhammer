// 분기 사건 — 직군 계열: 황제의 발톱(쿠스토데스 · 침묵의 자매들) · 그레이 나이트
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_blood_games",
    title: "황궁의 블러드 게임 (The Blood Games)",
    category: "쿠스토데스",
    req: { allTags: ["custodes"] },
    reqLabel: "병종: 아뎁투스 쿠스토데스",
    weight: 22,
    text: "황궁 방어 체계의 허점을 찾기 위해 쿠스토데스 스스로 암살자가 되어 황금 옥좌로 침투하는 실전 훈련, '블러드 게임'의 주자로 지명되었다.",
    choices: [
      {
        label: "[지성/민첩 판정] 완벽한 위장과 허점 분석으로 황궁 최심부 문턱까지 침투한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "방어선의 미세한 사각을 증명해 내어 캡틴-제너럴 트라얀 발로리스의 극찬을 받았다!",
          stats: { Int: 8, Ag: 6, Inf: 10, WP: 5 },
          addTags: ["met_valoris"]
        },
        fail: {
          text: "형제 쿠스토데스의 가디언 스피어에 막혀 제압되었으나 귀중한 전술 교훈을 얻었다.",
          wounds: -18,
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: Blood Games / Codex: Adeptus Custodes"
  },
  {
    id: "ev_job_grey_knight_purge",
    title: "666챕터의 잔혹한 규율 — 충성스러운 목격자들의 운명",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["grey_knight"] },
    reqLabel: "직업: 그레이 나이트",
    weight: 28,
    text: "코른의 대악마를 추방하고 행성을 구해 냈다. 피투성이로 살아남은 제국 가드맨 3,000명이 은빛 갑주를 향해 눈물을 흘리며 환호한다. 그때 오르도 말레우스 이단심문관이 무전으로 명한다. '악마와 그레이 나이트를 목격한 필멸자는 전원 정화하라.'",
    choices: [
      {
        label: "잔혹한 비밀 규율에 따라 침묵 속에 숙청을 승인한다",
        effect: {
          text: "악마의 존재가 퍼져 행성 열 개가 타락하는 것을 막기 위해, 영웅적으로 싸운 충성파 병사들이 역사에서 지워졌다. 영원한 죄책감과 철의 의지가 남는다.",
          stats: { WP: 8, Inf: 6 },
          faith: -5
        }
      },
      {
        label: "[의지/교섭 판정] 스페이스 울프의 선례처럼 처형 대신 기억 소거와 명예 전속을 관철한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "압도적인 위엄으로 이단심문관을 설득해 병사들의 목숨을 살리고 사이킥 기억 소거로 마무리했다.",
          stats: { WP: 6, Fel: 6, Inf: 4 },
          faith: 10
        },
        fail: {
          text: "이단심문소와 날카로운 갈등만 빚은 채 결국 규율대로 집행되고 말았다.",
          stats: { Inf: -6, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Months of Shame / Codex: Grey Knights"
  },
  {
    id: "ev_career_custodes_dark_cells",
    title: "아뎁투스 쿠스토데스 — 황궁 지하 '어둠의 감방(Dark Cells)' 봉인 경보",
    category: "직군 고유",
    req: { anyCareers: ["adeptus_custodes"] },
    reqLabel: "직군: 아뎁투스 쿠스토데스",
    weight: 28,
    text: "황궁 지하 수 킬로미터 아래, 투쟁의 시대부터 봉인되어 온 끔찍한 아키오테크와 고대 괴물들을 가둔 '어둠의 감방' 41번 격벽에서 정지장 출력 저하 경보가 울렸다! 섀도우키퍼(Shadowkeepers) 방패 부대의 긴급 출동이 요청되었다.",
    choices: [
      {
        label: "[의지/지성 판정] 정지장 핵심실로 단독 진입해 고대 육방정계 룬 봉인을 수동으로 재가동한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "현실을 뒤트는 속삭임을 반신적 의지로 묵살하고 봉인을 복구했다! 테라 전체가 알지도 못한 채 또 하나의 멸망을 비껴갔다.",
          stats: { WP: 7, Int: 6, Inf: 8 }
        },
        fail: {
          text: "새어 나온 시공간 왜곡에 황금 아우라마이트 갑주 일부가 부식되며 깊은 상처를 입었으나, 봉인만은 가까스로 지켜 냈다.",
          wounds: -18,
          stats: { WP: 4, T: 3 }
        }
      },
      {
        label: "[백병 판정] 가디언 스피어를 비껴 들고 격벽 앞에서 빠져나오려는 그림자 개체를 무력으로 밀어 넣는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "번개 같은 창술과 볼터 연사가 이름 모를 괴물을 다시 어둠 속으로 쳐 넣었다! 섀도우키퍼 선임이 침묵 속에 경의를 표했다.",
          stats: { WS: 7, T: 5, WP: 4 }
        },
        fail: {
          text: "기괴한 반격에 부상을 입었으나 지원 온 형제 쿠스토데스들과 합세해 격벽을 완전히 봉쇄했다.",
          wounds: -16,
          stats: { WS: 3 }
        }
      }
    ],
    source: "Lexicanum: Dark Cells / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s2_gk_titan_hall",
    title: "그레이 나이트 — 타이탄 요새의 영웅의 전당과 네메시스 각성",
    category: "그레이 나이트",
    once: true,
    req: { anyCareers: ["grey_knight"] },
    reqLabel: "병종: 그레이 나이트",
    weight: 36,
    text: "토성의 위성 타이탄에 자리한 요새 수도원 지하, 백만 명의 악마 진명이 봉인된 수정 서고와 전사한 형제들의 이름이 새겨진 '영웅의 전당'에 소집되었다. 다가올 대원정에 앞서 영혼의 무구를 다시 벼려야 한다.",
    choices: [
      {
        label: "[의지 판정] 수정 서고의 금지된 악마 진명록을 직시하며 티끌 없는 정신 방벽을 세운다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "속삭이는 수천 악마의 저주를 단숨에 침묵시켰다! 666챕터의 살아 있는 방패로서 의지가 한층 견고해졌다.",
          stats: { WP: 9, Int: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "금서에서 새어 나온 사이킥 충격에 코피를 쏟았으나, 단 한 점의 오염도 허락하지 않고 버텨 냈다.",
          wounds: -20,
          stats: { WP: 3 }
        }
      },
      {
        label: "[백병 판정] 은빛 네메시스 포스 할버드에 자신의 사이킥 의지를 주입해 악마 정화 검술을 연마한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "칼날 위로 눈부신 푸른 사이킥 불꽃이 완벽히 공명했다! 어떤 악마의 갑각도 갈라 버릴 경지에 올랐다.",
          stats: { WS: 8, WP: 5, T: 4 }
        },
        fail: {
          text: "포스 회로가 과열되어 장갑 손목에 화상을 입었으나, 교정 의식을 거쳐 무기를 길들였다.",
          wounds: -18,
          stats: { WS: 3 }
        }
      },
      {
        label: "전사한 선배 형제들의 석벽 앞에서 침묵의 기도를 올리며 영원한 순결을 맹세한다",
        effect: {
          text: "'우리는 망치다.' 이름 없이 싸우고 이름 없이 스러지는 666챕터의 긍지가 가슴에 차올랐다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Titan (Moon) / Codex: Grey Knights"
  },
  {
    id: "ev_s2_gk_daemon_banish",
    title: "그레이 나이트 — 워프 균열의 그레이터 데몬 추방전",
    category: "그레이 나이트",
    once: true,
    req: { anyCareers: ["grey_knight"], minAge: 22 },
    reqLabel: "병종: 그레이 나이트 · 22세+",
    weight: 38,
    text: "변방 성지 행성의 대성당 지하에서 거대한 워프 균열이 열리며 산더미 같은 그레이터 데몬이 강림했다! 일반 제국 병사들이 바라보기만 해도 발광하는 지옥 한가운데로, 은빛 터미네이터 형제단이 텔레포트 강습을 개시한다.",
    choices: [
      {
        label: "[의지 판정] 형제단과 함께 666 성가를 합창하며 대악마의 심장에 진명 추방식을 꽂아 넣는다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "찬란한 은빛 섬광과 함께 대악마가 찢어지는 비명을 지르며 워프로 추방되었다! 타이탄의 연대기에 불멸의 전공이 새겨졌다.",
          stats: { WP: 9, WS: 6, Inf: 8 },
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "대악마의 워프 채찍에 흉갑이 찢어지는 중상을 입었으나, 형제들의 합동 영창으로 끝내 균열을 닫았다.",
          wounds: -26,
          stats: { WP: 4 }
        }
      },
      {
        label: "[사격 판정] 축성된 사이캐논과 스톰 볼터의 은빛 탄막으로 악마 호위대를 일제히 소멸시킨다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "은빛 탄환이 워프의 육신을 불태우며 지휘 형제단이 대악마에게 접근할 완벽한 활로를 열었다!",
          stats: { BS: 7, T: 5, Inf: 6 }
        },
        fail: {
          text: "악마 무리의 역습에 포위되어 큰 피해를 입었으나, 이지스 갑주의 가호로 끝까지 전선을 지켰다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "이지스 터미네이터 갑주의 수호 룬을 전개해 균열이 완전히 봉인될 때까지 방벽을 사수한다",
        effect: {
          text: "지옥의 불길이 갑주를 핥았으나 단 한 걸음도 물러서지 않았다. 이윽고 균열은 고요히 닫혔다.",
          stats: { T: 6, WP: 5 },
          wounds: -14
        }
      }
    ],
    source: "Codex: Grey Knights / Lexicanum: Grey Knights"
  },
  {
    id: "ev_s2_custodes_solar_watch",
    title: "아뎁투스 쿠스토데스 — 솔라 워치의 태양계 초계와 침투선 요격",
    category: "쿠스토데스",
    once: true,
    req: { anyCareers: ["adeptus_custodes"] },
    reqLabel: "병종: 아뎁투스 쿠스토데스",
    weight: 36,
    text: "황금 옥좌로 향하는 태양계 관문을 지키는 방패 중대 '솔라 워치'로부터 비상 신호가 울렸다. 소행성대 그림자에 숨어 테라 궤도로 스며들려던 정체불명의 스텔스 강습정이 포착된 것이다.",
    choices: [
      {
        label: "[민첩 판정] 도나투스 제트바이크 편대를 이끌고 적 스텔스선의 추진기를 단신으로 베어 무력화한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "황금빛 유성처럼 적함 선체를 가르며 침투 부대 전원을 10분 만에 제압했다! 태양계의 관문에는 티끌 하나 허락되지 않는다.",
          stats: { Ag: 7, WS: 6, Inf: 7 }
        },
        fail: {
          text: "적함의 자폭 방어 포탑에 어깨 장갑이 크게 긁혔으나, 테라에 닿기 전에 위협을 완벽히 소각했다.",
          wounds: -18,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[지성 판정] 태양계 방위 궤도망의 미세한 통신 잡음을 역추적해 배후 밀수 함선까지 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "표면의 침투선뿐 아니라 화성 궤도 외곽에 숨어 있던 공범 화물선까지 한 번에 포위 나포했다!",
          stats: { Int: 7, BS: 5, Inf: 8 }
        },
        fail: {
          text: "배후 함선은 긴급 워프 도약으로 도주했으나, 테라를 노린 침투선 자체는 흔적 없이 파괴했다.",
          wounds: -12,
          stats: { Int: 3 }
        }
      },
      {
        label: "황금 오라미트 갑주를 빛내며 태양계 외곽 요새의 방어망을 빈틈없이 점검하고 경계를 이어 간다",
        effect: {
          text: "만 년 동안 테라의 관문은 단 한 번도 뚫리지 않았다. 그대의 침묵 어린 감시가 그 역사를 잇는다.",
          stats: { WP: 5, T: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Solar Watch / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s2_custodes_inquisitor_clash",
    title: "아뎁투스 쿠스토데스 — 오만한 이단심문관과 마기스테리움 렉스 울티마",
    category: "쿠스토데스",
    once: true,
    req: { anyCareers: ["adeptus_custodes"], minAge: 25 },
    reqLabel: "병종: 아뎁투스 쿠스토데스 · 25세+",
    weight: 36,
    text: "황궁 외곽의 기밀 수사 현장에서 강경파 이단심문관이 로제트를 치켜들며 '황제의 이름으로 이 구역의 통제권과 기밀 문서를 내게 넘기라'고 요구한다. 그러나 아뎁투스 쿠스토데스는 이단심문소마저 초월해 오직 황제 한 분의 명령만 받든다.",
    choices: [
      {
        label: "[권위 판정] 마기스테리움 렉스 울티마의 절대 권한을 선언해 오만한 이단심문관을 단숨에 압도한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "'우리는 황제의 이름으로 말하지 않는다. 우리가 곧 황제의 뜻이다.' 이단심문관이 창백한 얼굴로 로제트를 내리고 물러났다.",
          stats: { Inf: 10, WP: 6, Fel: 4 }
        },
        fail: {
          text: "심문관이 테라 의회에 항의 서한을 올리는 소동이 일었으나, 쿠스토데스의 권한을 꺾을 자는 아무도 없었다.",
          stats: { Inf: 4, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 이단심문관의 성급한 수사가 초래할 외교적 허점을 짚어 내고 필요한 첩보만 정교히 징발한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉철한 논리와 철학적 식견에 심문관마저 고개를 숙이며 모든 수사 자료를 자진 헌납했다.",
          stats: { Int: 8, Inf: 7 }
        },
        fail: {
          text: "길어진 문답 끝에 심문관이 불만을 품고 물러났으나 핵심 기밀만큼은 무사히 회수했다.",
          stats: { Int: 3, Inf: 2 }
        }
      },
      {
        label: "긴 설전을 생략하고 가디언 스피어의 끝으로 경계선을 그어 보이며 냉엄한 침묵으로 물러나게 한다",
        effect: {
          text: "황금 거인의 침묵은 천 마디 훈령보다 무거웠다. 심문소 수행원들이 소리 없이 자리를 비웠다.",
          stats: { WS: 4, WP: 5, Inf: 5 }
        }
      }
    ],
    source: "Lexicanum: Magisterium Lex Ultima / Watchers of the Throne"
  },
  {
    id: "ev_s6_sisters_of_silence_call",
    title: "침묵의 자매들 — 검은 함선의 황금 가면을 쓴 징발관",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 16,
      gender: "female",
      allTags: ["blank"],
      excludeTags: ["sister_of_silence", "heretic", "chaos_aligned", "astartes", "custodes"]
    },
    reqLabel: "여성 · 블랭크(퍼라이어) 자질",
    weight: 42,
    text: "평생 타인에게 원인 모를 불쾌감을 안기던 그대의 영혼 없는 공백이, 마침내 그 진가를 알아보는 이들의 눈에 띄었다. 황금빛 갑주에 입가를 철면으로 가린 말없는 여전사들—아나테마 사이카나(침묵의 자매들)의 기사가 정교한 수화(Thoughtmark)로 그대에게 검은 함선과 황제의 발톱에 합류할 것을 제의한다.",
    choices: [
      {
        label: "[의지 판정] 평온의 서약(Oath of Tranquillity)을 올리고 침묵의 자매들 정예 사냥꾼의 길을 걷는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "마지막 한마디 맹세를 끝으로 입을 닫았다. 그대는 이제 사이커와 악마가 가장 두려워하는 침묵의 칼날, 황제의 발톱이 되었다!",
          stats: { WP: 8, WS: 6, Ag: 5, Inf: 8 },
          faith: 10,
          corruptionReset: true,
          addTags: ["sister_of_silence"]
        },
        fail: {
          text: "가혹한 침묵 수련 도중 탈진해 쓰러졌으나, 끝내 집념을 인정받아 예비 자매단 서약을 허락받았다.",
          wounds: -14,
          stats: { WP: 5, WS: 3 },
          addTags: ["sister_of_silence"]
        }
      },
      {
        label: "[백병 판정] 그레이트블레이드 검술 시험에 즉석으로 응해 자매단 기사와 정면으로 합을 겨룬다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "날카로운 검기가 황금 갑주의 어깨를 스쳤다! 기사단장이 말없이 고개를 끄덕이며 정식 비질레이터(Vigilator)의 검을 수여했다.",
          stats: { WS: 8, Ag: 5, Inf: 7 },
          corruptionReset: true,
          addTags: ["sister_of_silence"]
        },
        fail: {
          text: "압도적인 무예 앞에 무릎을 꿇었으나, 물러서지 않은 담력을 높이 평가받아 자매단에 편입되었다.",
          wounds: -18,
          stats: { WS: 4, T: 3 },
          addTags: ["sister_of_silence"]
        }
      },
      {
        label: "평생 침묵 속에 살아가는 서약은 감당할 수 없다며 정중히 사양하고 지금의 자리를 지킨다",
        effect: {
          text: "침묵의 자매들은 말없이 고개를 숙여 예를 표한 뒤 검은 함선으로 돌아갔다. 스스로의 목소리를 지키며 살아가기로 했다.",
          stats: { WP: 5, Fel: 4 }
        }
      }
    ],
    source: "Lexicanum: Sisters of Silence / Watchers of the Throne"
  },
  {
    id: "ev_s6_sisters_of_silence_hunt",
    title: "침묵의 사냥 — 폭주하는 알파급 사이커와 영혼 없는 방패",
    category: "성별 · 특수 기관",
    once: true,
    req: {
      minAge: 20,
      allTags: ["sister_of_silence"]
    },
    reqLabel: "이력: 침묵의 자매들",
    weight: 38,
    text: "검은 함선 이송 도중 봉인 구속구를 찢고 탈출한 알파급 무등록 사이커가 행성 성당 지하에서 워프 차원문을 열려 하고 있다. 일반 가드맨과 심문소 수행원들은 접근하기도 전에 뇌가 녹아내리며 쓰러지지만, 오직 영혼의 공백을 두른 침묵의 자매인 그대만이 워프 폭풍 속으로 걸어 들어갈 수 있다.",
    choices: [
      {
        label: "[백병 판정] 사이커의 번개와 염동력이 닿는 순간 무효화되는 공백을 방패 삼아 단숨에 목을 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "그대가 다가서자 알파급 사이커의 공포스러운 화염이 촛불처럼 꺼졌다! 대검 일격으로 차원문을 닫고 도시 전체를 구했다.",
          stats: { WS: 8, WP: 6, Inf: 8 },
          corruptionReset: true,
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "사이커가 마지막에 날린 물리적 파편 폭풍에 크게 다쳤으나, 끝내 포박 사슬을 채워 검은 함선에 회수했다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[민첩 판정] 화염방사기(위치시커)와 수화 신호로 자매단 포위망을 조여 사이커를 산 채로 생포한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "단 한 마디의 구호도 없이 완벽하게 맞물린 협공! 테라의 아스트로노미칸에 바칠 귀중한 십일조를 온전히 확보했다.",
          stats: { Ag: 8, BS: 5, Inf: 7 }
        },
        fail: {
          text: "화염 역류와 붕괴 잔해 속에 화상을 입었으나, 사이커의 워프 개방만은 완전히 저지했다.",
          wounds: -16,
          stats: { Ag: 4, WP: 4 }
        }
      },
      {
        label: "전면에 나서는 대신 공백 오라로 주변 민간인과 부상병을 감싸 워프 폭풍의 피해부터 차단한다",
        effect: {
          text: "말없는 방패가 되어 수백 명의 정신을 지켜 냈다. 뒤이어 도착한 자매단 본대가 무사히 사이커를 제압했다.",
          stats: { WP: 6, T: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Sisters of Silence / Black Ships Lore"
  }
);
