// 분기 사건 — 직군 계열: 황제의 발톱(쿠스토데스 · 침묵의 자매들) · 그레이 나이트
export default [
  {
    id: "ev_blood_games",
    title: "황궁의 블러드 게임",
    category: "쿠스토데스",
    req: { allTags: ["custodes"], excludeTags: ["captain_general"] },
    reqLabel: "병종: 아뎁투스 쿠스토데스",
    weight: 22,
    text: "황궁 방어 체계의 허점을 찾기 위해 쿠스토데스 스스로 암살자가 되어 황금 옥좌로 침투하는 실전 훈련, '블러드 게임'의 주자로 지명되었다. 만 명의 수호자가 펼치는 삼엄한 경계망 속에서 단 하나의 틈새라도 찾아내어 방어선의 완성도를 입증해야 한다.",
    choices: [
      {
        label: "[지성 판정] 완벽한 위장과 허점 분석으로 황궁 최심부 문턱까지 침투한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "방어선의 미세한 사각을 증명해 내어 캡틴-제너럴과 만 명의 동료들의 극찬을 받았다! 그대가 드러낸 허점은 즉시 보강되어 황금 옥좌의 안전이 한층 견고해졌다.",
          stats: { Int: 8, Ag: 6, Inf: 10, WP: 5 }
        },
        fail: {
          text: "형제 쿠스토데스의 가디언 스피어에 막혀 제압되었으나 귀중한 전술 교훈을 얻었다.",
          wounds: -18,
          stats: { WS: 4 }
        }
      },
      {
        label: "[민첩 판정] 순찰 교대의 찰나를 틈타 외곽 성벽과 지하 수로를 고속 돌파해 사각을 찌른다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "황금빛 잔영만을 남긴 채 세 겹의 감시망을 뚫고 내궁 초입에 도달했다! 캡틴-제너럴과 만 명의 동료들이 그대의 기민한 기동에 경의를 표했다.",
          stats: { Ag: 8, WS: 5, Inf: 8 }
        },
        fail: {
          text: "자동 감시 포탑과 매복한 형제의 합동 저지에 걸려 부상을 입은 채 훈련이 종료되었다.",
          wounds: -16,
          stats: { Ag: 3 }
        }
      },
      {
        label: "무리한 최심부 돌파 대신 외곽 검문소와 궤도 감시망의 미세한 지연 지점만 정밀 검증한 뒤 자진 투항한다",
        effect: {
          text: "비록 옥좌 문턱까지는 닿지 않았으나 외곽 감시 체계의 실질적 개선 보고서를 제출해 동료들의 신뢰를 얻었다.",
          stats: { Int: 5, WP: 5, Inf: 5 }
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
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    reqLabel: "직업: 그레이 나이트",
    weight: 28,
    text: "코른의 대악마를 추방하고 행성을 구해 냈다. 피투성이로 살아남은 제국 가드맨 3,000명이 은빛 갑주를 향해 눈물을 흘리며 환호한다. 그때 오르도 말레우스 이단심문관이 무전으로 요구한다. '악마와 그레이 나이트를 목격한 필멸자는 전원 정화하라.'",
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
        label: "[의지 판정] 처형 대신 사이킥 기억 소거와 명예 전속을 관철한다",
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
    title: "아뎁투스 쿠스토데스 — 황궁 지하 어둠의 감방 봉인 경보",
    category: "직군 고유",
    req: { anyCareers: ["adeptus_custodes", "custodes_warden"] },
    reqLabel: "직군: 아뎁투스 쿠스토데스 · 워든",
    weight: 28,
    text: "황궁 지하 수 킬로미터 아래, 투쟁의 시대부터 봉인되어 온 끔찍한 아키오테크와 고대 괴물들을 가둔 어둠의 감방 41번 격벽에서 정지장 출력 저하 경보가 울렸다! 섀도우키퍼 방패 부대의 긴급 출동이 요청되었다.",
    choices: [
      {
        label: "[의지 판정] 정지장 핵심실로 단독 진입해 고대 육망성 룬 봉인을 수동으로 재가동한다",
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
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    reqLabel: "병종: 그레이 나이트",
    weight: 36,
    text: "토성의 위성 타이탄에 자리한 요새 수도원 지하, 백만 명의 악마 진명이 봉인된 수정 서고와 먼저 스러진 형제들의 이름이 새겨진 '영웅의 전당'에 소집되었다. 다가올 대원정에 앞서 영혼의 무구를 다시 벼려야 한다.",
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
        label: "먼저 스러진 형제들의 이름이 새겨진 석벽 앞에서 침묵의 기도를 올리며 영원한 순결을 맹세한다",
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
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"], minAge: 22 },
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
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"] },
    reqLabel: "병종: 아뎁투스 쿠스토데스",
    weight: 36,
    text: "황금 옥좌로 향하는 태양계 관문을 지키는 방패 중대 '솔라 워치'로부터 비상 신호가 울렸다. 소행성대 그림자에 숨어 테라 궤도로 스며들려던 정체불명의 스텔스 강습정이 포착된 것이다.",
    choices: [
      {
        label: "[민첩 판정] 아레스 건십과 오리온 강습정 편대를 이끌고 적 스텔스선의 추진기를 정밀 타격해 무력화한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "황금빛 유성처럼 강습 편대가 적함 선체를 덮쳐 침투 부대 전원을 10분 만에 제압했다! 태양계의 관문에는 티끌 하나 허락되지 않는다.",
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
        label: "황금 아우라마이트 갑주를 빛내며 태양계 외곽 요새의 방어망을 빈틈없이 점검하고 경계를 이어 간다",
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
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain", "custodes_captain_general"], minAge: 25 },
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
          text: "심문관이 테라 의회에 격렬한 항의 서한을 올리며 첩보 협조를 끊어 버렸다. 쿠스토데스의 권한은 꺾이지 않았으나 불필요한 외교 마찰이 남았다.",
          stats: { Inf: -3, Fel: -3 }
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
          text: "길어진 문답 끝에 심문관이 기밀 일부를 황급히 소각하고 물러나는 바람에 현장 협력과 핵심 단서를 잃었다.",
          stats: { Inf: -3, Fel: -3 }
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
      maxAge: 35,
      gender: "female",
      allTags: ["blank"],
      excludeTags: [
        "sister_of_silence",
        "abhuman",
        "mechanicus",
        "magos",
        "navigator",
        "high_lord_terra",
        "canoness",
        "sororitas",
        "cardinal",
        "inquisitor",
        "lord_inquisitor",
        "planetary_governor",
        "sector_lord",
        "warmaster",
        "rogue_trader",
        "heretic",
        "chaos_aligned",
        "daemon_prince",
        "astartes",
        "custodes",
        "assassin",
        "imperial_knight",
        "living_saint",
        "saint_vessel"
      ]
    },
    reqLabel: "여성 · 16~35세 · 블랭크 자질",
    weight: 42,
    text: "평생 타인에게 원인 모를 불쾌감을 안기던 그대의 영혼 없는 공백이, 마침내 그 진가를 알아보는 이들의 눈에 띄었다. 황금빛 갑주에 입가를 철면으로 가린 말없는 여전사들, 아나테마 사이카나 곧 침묵의 자매들의 기사가 정교한 사고표식 수화로 그대에게 검은 함선과 황제의 발톱에 합류할 것을 제의한다.",
    choices: [
      {
        label: "[의지 판정] 평온의 서약을 올리고 침묵의 자매들 정예 사냥꾼의 길을 걷는다",
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
          text: "날카로운 검기가 황금 갑주의 어깨를 스쳤다! 기사단장이 말없이 고개를 끄덕이며 정식 비질레이터의 검을 수여했다.",
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
        label: "[민첩 판정] 위치시커 화염방사기와 수화 신호로 자매단 포위망을 조여 사이커를 산 채로 생포한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "단 한 마디의 구호도 없이 완벽하게 맞물린 협공! 테라 황금 옥좌의 영혼 십일조로 바칠 귀중한 표적을 온전히 확보했다.",
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
    source: "Lexicanum: Sisters of Silence / Lexicanum: League of Black Ships"
  },
  // =========================================================================
  // 12단계: 그레이 나이트(3종) · 아뎁투스 쿠스토데스(3종) 심화 사건 6종
  // =========================================================================
  {
    id: "ev_s12_gk_prognosticar",
    title: "그레이 나이트 — 타이탄 프로그노스티카의 예언과 단독 텔레포트 강하",
    category: "그레이 나이트",
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    reqLabel: "직군: 그레이 나이트",
    weight: 30,
    text: "타이탄 지하 예언실의 프로그노스티카들이 72시간 뒤 변방 성지 행성에서 젠취의 차원문이 열릴 것을 예지했다. 아직 이단심문소조차 모르는 침공의 싹을 자르기 위해, 그대의 5인 타격대가 텔레포타리움으로 즉시 적 의식장 한복판에 강하한다!",
    choices: [
      {
        label: "[의지 판정] 형제들과 사이킥 링크를 하나로 묶어 정화의 섬광으로 의식 제단을 증발시킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "은빛 화염이 붉은 소환진을 단숨에 불태웠다! 대악마가 현세에 발을 딛기도 전에 봉인되어 행성 전체가 구원받았다.",
          stats: { WP: 8, Int: 5, Inf: 6 },
          faith: 8,
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "워프 역풍에 텔레포트 착지가 어긋나 부상을 입었으나 끝내 소환사를 베어 버렸다.",
          wounds: -20,
          stats: { WP: 5, WS: 4 }
        }
      },
      {
        label: "[백병 판정] 네메시스 포스 할버드를 휘둘러 소환진을 지키는 데몬호스트 근위대를 일격에 돌파한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "은빛 갑주가 악마의 검은 피로 물들며 의식이 완전히 분쇄되었다! 타이탄 기록서에 무훈이 새겨졌다.",
          stats: { WS: 8, WP: 5, T: 4 }
        },
        fail: {
          text: "데몬호스트의 발톱에 흉갑이 찢겼으나 의식 중단에 성공하고 텔레포트 귀환했다.",
          wounds: -22,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "강하 직후 성유물 방호 결계부터 전개해 악마들의 퇴로를 완전히 차단한 뒤 순차 정화한다",
        effect: {
          text: "단 한 마리의 악마도 도망치지 못하게 가둔 완벽한 666챕터 정석 작전이었다.",
          stats: { Int: 5, WP: 5, T: 3 }
        }
      }
    ],
    source: "Codex: Grey Knights / Lexicanum: Prognosticar"
  },
  {
    id: "ev_s12_gk_true_name",
    title: "그레이 나이트 — 고위 악마의 진명 해독",
    category: "그레이 나이트",
    once: true,
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    reqLabel: "직군: 그레이 나이트",
    weight: 30,
    text: "타이탄의 봉인 금서고 '리브라리움 데모니카'. 수백 년간 성계를 괴롭혀 온 블러드서스터의 고대 진명 파편이 담긴 석판을 해독하는 임무가 주어졌다. 한 글자라도 잘못 발음하면 정신이 산산조각 나지만, 진명을 쥐면 그 대악마를 단번에 추방할 수 있다.",
    choices: [
      {
        label: "[지성 판정] 666개의 방호 룬을 중첩 전개한 채 고대 금지 문자의 음절을 오차 없이 해독한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "마침내 대악마의 완전한 진명을 손에 넣었다! 그대의 이름이 타이탄 최정예 정화반 명부에 등재되었다.",
          stats: { Int: 8, WP: 7, Inf: 6 },
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "석판에서 터져 나온 정신 충격에 피를 토했으나, 그레이 나이트의 순결한 정신은 꺾이지 않았다.",
          wounds: -18,
          stats: { WP: 5, Int: 4 }
        }
      },
      {
        label: "[의지 판정] 석판의 속삭임을 정면으로 버텨 내며 6시간 동안 묵언 명상으로 핵심 음절을 각인시킨다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 점의 오염도 없이 진명을 기억 속에 봉인했다! 다음 원정에서 대악마는 그대의 음성 앞에 무릎 꿇을 것이다.",
          stats: { WP: 9, Inf: 5 },
          corruptionReset: true
        },
        fail: {
          text: "극심한 편두통과 화상을 입었으나 불완전한 진명 조각만은 안전하게 기록했다.",
          wounds: -16,
          stats: { WP: 5 }
        }
      },
      {
        label: "단독 해독의 위험을 피하고 라이브러리안 형제단과 교차 검증하며 단계적으로 분석한다",
        effect: {
          text: "시간은 더 걸렸지만 단 하나의 실수도 없이 안전한 봉인 해독을 마쳤다.",
          stats: { Int: 5, WP: 5 }
        }
      }
    ],
    source: "Codex: Grey Knights / The Emperor's Gift"
  },
  {
    id: "ev_s12_gk_inquisitor_friction",
    title: "그레이 나이트 — 급진파 이단심문관의 악마 무기 적발",
    category: "그레이 나이트",
    req: { anyCareers: ["grey_knight", "gk_paladin", "gk_grand_master", "gk_supreme_grand_master"] },
    reqLabel: "직군: 그레이 나이트",
    weight: 26,
    text: "합동 작전 중 오르도 말레우스 소속 급진파 이단심문관이 악마의 정수를 봉인한 금지된 '데몬웨폰'을 꺼내 적을 베어 넘겼다! 심문관은 '악마를 잡는 데 이만한 무기가 없다'며 항변하지만, 그레이 나이트의 규율은 어떤 타협도 용납하지 않는다.",
    choices: [
      {
        label: "[의지 판정] 그레이 나이트의 절대 권위로 즉각 데몬웨폰 압수와 이단심문관의 타이탄 심문을 요구한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "은빛 전사의 흔들리지 않는 순결 앞에 심문관이 결국 무기를 내려놓았다! 저주받은 검을 즉시 정화 용광로에 던져 넣었다.",
          stats: { WP: 7, Inf: 7, Fel: -2 },
          faith: 8
        },
        fail: {
          text: "심문관의 수행단과 일촉즉발의 대치 끝에 무기는 파괴했으나 심문소 내 정적이 생겼다.",
          stats: { WP: 5, Inf: -3 }
        }
      },
      {
        label: "[백병 판정] 악마의 힘이 폭주하려는 찰나 번개같이 파고들어 심문관의 손에서 데몬웨폰을 두 동강 낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "네메시스 칼날이 데몬웨폰의 사악한 핵을 꿰뚫어 악마를 소멸시켰다! 심문관의 영혼마저 파멸에서 건져 냈다.",
          stats: { WS: 7, WP: 6, Inf: 5 }
        },
        fail: {
          text: "검이 깨지며 터진 워프 폭발에 부상을 입었으나 악마 무기는 완전히 파괴했다.",
          wounds: -18,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "작전 종료까지 감시를 유지한 뒤 타이탄 최고 의회와 오르도 말레우스 콘클라베에 비밀 보고서를 제출한다",
        effect: {
          text: "작전 실패를 막으면서도 타이탄과 오르도 말레우스에 급진파의 위험을 정확히 고발했다.",
          stats: { Int: 5, Inf: 5 }
        }
      }
    ],
    source: "Codex: Grey Knights / Lexicanum: Ordo Malleus"
  },
  {
    id: "ev_s12_custodes_aquilan_shield",
    title: "아뎁투스 쿠스토데스 — 아퀼란 실드의 기이한 필멸자 호위",
    category: "쿠스토데스",
    once: true,
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain"], greatRift: true },
    reqLabel: "직군: 아뎁투스 쿠스토데스 · 대균열 이후",
    weight: 30,
    text: "황궁의 둠스크라이어들이 한 변방 하이브의 평범한 하급 가드맨 장교가 30년 뒤 대균열 전선을 구할 핵심 인물이라 예지했다. 아퀼란 실드 호스트의 일원으로서, 황금 갑주를 입은 그대가 말없이 그 필멸자의 그림자 호위를 맡게 되었다.",
    choices: [
      {
        label: "[백병 판정] 그 장교를 노리고 침투한 카오스 암살단 12명을 단 4초 만에 소리 없이 도륙해 버린다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "필멸자 장교는 자신이 왜 살아남았는지도 모른 채 임무를 완수했다! 황제의 위대한 운명 한 조각이 지켜졌다.",
          stats: { WS: 7, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "독성 플라즈마 함정에 갑주 표면이 그을렸으나 호위 대상에게는 티끌 하나 닿지 않았다.",
          wounds: -14,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[지성 판정] 단순한 무력 호위를 넘어 장교의 전술적 판단이 올바른 길로 흐르도록 미세한 정황만 조율한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "철학자이자 수호자인 쿠스토데스다운 치밀한 인도였다! 미래의 영웅이 온전히 성장할 토대가 마련되었다.",
          stats: { Int: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "필멸자의 어리석은 돌발 행동에 수차례 직접 개입하느라 호위 정체가 노출되었고, 교전 파편 속에 경상과 정치적 마찰을 감수해야 했다.",
          wounds: -10,
          stats: { Inf: -3, Fel: -3 }
        }
      },
      {
        label: "말 한마디 섞지 않고 임무가 끝나는 날까지 황금빛 조각상처럼 곁을 지키다 조용히 철수한다",
        effect: {
          text: "그 장교는 평생 황금 거인의 침묵을 기억하며 제국을 위해 헌신할 것이다.",
          stats: { WP: 6, T: 4 }
        }
      }
    ],
    source: "Codex: Adeptus Custodes / Lexicanum: Aquilan Shield"
  },
  {
    id: "ev_s12_custodes_shadowkeepers",
    title: "아뎁투스 쿠스토데스 — 섀도우키퍼의 성외 봉인 회수 작전",
    category: "쿠스토데스",
    req: { anyCareers: ["adeptus_custodes", "custodes_warden"] },
    reqLabel: "직군: 아뎁투스 쿠스토데스 · 워든",
    weight: 28,
    text: "황궁의 어둠의 감방 기록에 등재되어 있던 기술의 암흑기 유물, 빛을 삼키는 양자 구속구가 변경 성계의 폐허 위성에서 무단 발굴되었다는 경보가 울렸다. 현지 기계교 탐사대가 영문도 모른 채 봉인을 뜯기 전에, 섀도우키퍼 실드-캡틴의 명을 받은 그대가 성외 회수 작전에 단독 강하한다.",
    choices: [
      {
        label: "[의지 판정] 유물에서 뿜어져 나오는 시공간 속삭임을 반신적 의지로 묵살하고 휴대용 정지장 관에 수동 재봉인한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "완벽한 정신 방호로 1만 년 된 공포를 정지장 관에 가두어 테라의 어둠의 감방으로 이송했다! 섀도우키퍼 실드-캡틴이 그대의 진명에 새 칭호를 더했다.",
          stats: { WP: 8, Int: 5, Inf: 7 }
        },
        fail: {
          text: "정지장 역류 충격파에 아우라마이트 갑주가 손상되며 부상을 입었으나, 유물은 단 한 순간도 외부로 풀려나지 않았다.",
          wounds: -18,
          stats: { WP: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 유물이 깨어난 위성 유적의 보안 격자를 역해독해 어둠의 감방 이송 경로와 차폐 프로토콜을 완벽히 설계한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기술의 암흑기 봉인 장치의 숨겨진 취약점을 찾아내 테라 이송 중 누출 위험을 완전히 제거했다! 황궁의 기록 보관고가 그대의 통찰을 등재했다.",
          stats: { Int: 8, Inf: 7, T: 4 }
        },
        fail: {
          text: "유적의 자동 방어 경보가 울려 치열한 교전을 벌인 끝에 동료 섀도우키퍼들과 함께 간신히 유물을 회수했다.",
          wounds: -14,
          stats: { Int: 3, WS: 2 }
        }
      },
      {
        label: "현지 탐사대 전원을 즉각 격리하고 궤도에서 투하한 다중 차폐 함체에 유적을 통째로 봉인해 테라로 압송한다",
        effect: {
          text: "어둠의 감방 수호자에게 호기심은 금물이다. 단호한 성외 격리로 제국이 알지도 못한 멸망을 막아 냈다.",
          stats: { WP: 5, T: 5 }
        }
      }
    ],
    source: "Codex: Adeptus Custodes / Lexicanum: Shadowkeepers"
  },
  {
    id: "ev_s12_custodes_high_lords",
    title: "아뎁투스 쿠스토데스 — 테라 하이 로드 회의실의 침묵",
    category: "쿠스토데스",
    req: { anyCareers: ["adeptus_custodes", "custodes_warden", "custodes_shield_captain"] },
    reqLabel: "직군: 아뎁투스 쿠스토데스",
    weight: 26,
    text: "테라 원로원 회의실. 마스터 오브 디 아드미니스트라툼과 에클레시아크 대리인이 막대한 성전 예산을 두고 사흘째 추악한 권력 다툼을 벌이고 있다. 구석 기둥 옆에서 황금 가디언 스피어를 짚고 지켜보던 그대의 발걸음이 한 걸음 앞으로 나아가는 순간, 회의장 전체가 얼어붙었다.",
    choices: [
      {
        label: "[권위 판정] '황금 옥좌의 침묵은 그대들의 탐욕을 용납하는 뜻이 아니다'라는 단 한 마디로 논쟁을 종결한다",
        check: { stat: "Inf", diff: 5 },
        success: {
          text: "두 하이 로드가 땀을 흘리며 즉각 타협안에 서명했다! 100개 연대의 보급이 지체 없이 전선으로 출발했다.",
          stats: { Inf: 8, Fel: 5, WP: 5 }
        },
        fail: {
          text: "원로원 의원들이 형식적 경의를 표하면서도 이면에서 정치적 반발을 키워 황궁과 행정부 사이의 협조가 냉각되었다.",
          stats: { Inf: -3, Fel: -3 }
        }
      },
      {
        label: "[지성 판정] 두 세력이 감추고 있던 중복 회계와 군수 지연 보고서를 회의 탁자 위에 정확히 펼쳐 놓는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "황궁의 첩보망 앞에서 누구도 변명하지 못했다! 투명한 군수 집행령이 만장일치로 통과되었다.",
          stats: { Int: 7, Inf: 8 }
        },
        fail: {
          text: "관료들이 방대한 법령 조항과 절차적 흠결을 들며 일주일을 더 끌었고, 예산 집행이 지연되며 황궁의 위신이 깎였다.",
          stats: { Inf: -3, Fel: -3 }
        }
      },
      {
        label: "쿠스토데스는 제국의 정치인이 아니라 황제의 수호자다 — 말없이 창날만 바닥에 한 번 울리고 물러난다",
        effect: {
          text: "아우라마이트 창대가 대리석을 울린 단 한 번의 소리가 천 마디 웅변보다 무겁게 회의장을 짓눌렀다.",
          stats: { WP: 6, Inf: 5 }
        }
      }
    ],
    source: "Watchers of the Throne: The Emperor's Legion / Codex: Adeptus Custodes"
  }
];
