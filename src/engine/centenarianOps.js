// 100세+ 초장수자 전용 동적 순찰 · 유물 회수 · 패권 작전 풀 (Stage 23-B · Stage 23.5 안정화)
// 정적 EVENTS 풀 소진 후에도 maxRepeat <= 2 규칙을 해치지 않고 장수 후반부 서사 밀도를 유지한다.

const TRANSHUMAN_OPS = [
  {
    id: "dyn_cent_warp_patrol",
    title: "장수기 작전 — 워프 폭풍 경계 순찰",
    isEligible: (ctx) => ctx.isTranshuman && !ctx.isTerraOrMars,
    build: (state, ctx) => ({
      text: `${state.age}세의 백전 노장으로서 ${ctx.worldName} 외곽 성계의 워프 균열 경계선을 순찰하던 중, 정체불명의 이단 조난 신호가 포착되었다.`,
      choices: [
        {
          label: `[${ctx.isGreyKnight ? "의지" : "백병"} 판정] 경계 분대를 이끌고 신호 발신지까지 강행 정찰한다`,
          check: {
            stat: ctx.isGreyKnight ? "WP" : "WS",
            diff: -12
          },
          success: {
            text: "매복해 있던 워프 변이체 무리를 단숨에 분쇄하고 고대 성계의 항로 비콘을 복구했다.",
            stats: { WS: 1, WP: 1, Inf: 1 },
            faith: 2
          },
          critSuccess: {
            text: "단 한 명의 손실도 없이 이단 전초기지를 초토화하고 실종되었던 제국 성유물을 회수했다.",
            stats: { WS: 2, WP: 2, Inf: 2 },
            faith: 4
          },
          fail: {
            text: "치열한 교전 끝에 적을 격퇴했으나 장갑과 신체에 깊은 상흔을 입었다.",
            wounds: -12,
            corruption: ctx.incorruptible ? 0 : 2
          },
          critFail: {
            text: "워프 균열의 역류에 휘말려 전선이 붕괴 직전까지 몰렸고, 간신히 본대로 복귀했다.",
            wounds: -20,
            corruption: ctx.incorruptible ? 0 : 4
          }
        },
        {
          label: "궤도 봉쇄 경보만 발령하고 주력 함대의 포격 좌표를 전송한다",
          effect: {
            text: "냉철한 판단으로 아군 피해를 피하고 성계 방위망을 안정시켰다.",
            stats: { Int: 1 },
            align: { dogmatic: 1 }
          }
        }
      ],
      source: "Lexicanum: Adeptus Astartes / Deathwatch"
    })
  },
  {
    id: "dyn_cent_space_hulk",
    title: "장수기 작전 — 표류 스페이스 헐크 내부 정찰",
    isEligible: (ctx) => ctx.isTranshuman && !ctx.isLivingSaint && !ctx.isCustodes,
    build: (state, ctx) => ({
      text: `수천 년을 표류한 거대 스페이스 헐크가 ${ctx.worldName} 궤도 근처로 출현했다. ${state.age}세의 노련한 전사인 그대에게 선봉 정찰 지휘가 맡겨졌다.`,
      choices: [
        {
          label: "[강인 판정] 고대 함선 잔해 깊숙이 침투해 외계 둥지와 데이터 코어를 확보한다",
          check: {
            stat: "T",
            diff: -14
          },
          success: {
            text: "미로 같은 격벽 너머에서 진스틸러 무리를 도륙하고 수백 년 전 잃어버린 제국 함선의 블랙박스를 회수했다.",
            stats: { T: 1, WS: 1, Inf: 1 }
          },
          critSuccess: {
            text: "고대 황금기 장인의 유물 무기를 온전히 회수하여 챕터와 수호단의 찬사를 받았다.",
            stats: { WS: 2, T: 2, Inf: 2 },
            faith: 2
          },
          fail: {
            text: "산성 혈액과 갑작스러운 격벽 붕괴에 부상을 입고 철수했다.",
            wounds: -14
          }
        },
        {
          label: "외곽 구획만 봉인하고 어뢰 폭격으로 잔해를 분쇄한다",
          effect: {
            text: "불필요한 소모전을 피하고 궤도 안전을 확보했다.",
            stats: { Int: 1, BS: 1 }
          }
        }
      ],
      source: "Lexicanum: Space Hulk"
    })
  },
  {
    id: "dyn_cent_relic_escort",
    title: "장수기 작전 — 고대 성유물 회수 호송",
    isEligible: (ctx) => ctx.isTranshuman && !ctx.isDreadnought && !ctx.isLivingSaint,
    build: (state) => ({
      text: `오랜 전쟁터에 묻혀 있던 고대 영웅의 성유물이 재발견되었다. ${state.age}세의 그대는 성유물을 본진 성소까지 호송하는 중책을 맡았다.`,
      choices: [
        {
          label: "[지성 판정] 유물의 진위와 보호 결계를 직접 점검하며 호송로를 돌파한다",
          check: {
            stat: "Int",
            diff: -10
          },
          success: {
            text: "매복한 이단 약탈자들의 기습 지점을 미리 간파하고 성유물을 무사히 봉안했다.",
            stats: { Int: 1, WP: 1, Inf: 1 },
            faith: 3
          },
          fail: {
            text: "호송 도중 매복에 걸려 치열한 백병전 끝에 간신히 성유물을 지켜냈다.",
            wounds: -10,
            stats: { WS: 1 }
          }
        },
        {
          label: "철저한 야간 행군과 위장 호송대로 교전을 회피한다",
          effect: {
            text: "그림자처럼 움직여 성유물을 안전하게 안치했다.",
            stats: { Ag: 1, WP: 1 },
            faith: 2
          }
        }
      ],
      source: "Lexicanum: Space Marine Armoury"
    })
  },
  {
    id: "dyn_cent_neophyte_drill",
    title: "장수기 작전 — 후배 전사 시련 감독",
    isEligible: (ctx) => ctx.isTranshuman && !ctx.isDreadnought && !ctx.isLivingSaint && !ctx.isCustodes,
    build: (state) => ({
      text: `${state.age}세에 이른 그대 앞에 어린 신병과 수습 전사들이 도열했다. 세대가 몇 번이나 바뀐 뒤에도, 맹세를 잇는 것은 고참 전사의 몫이다.`,
      choices: [
        {
          label: "[백병 판정] 실전과 다름없는 가혹한 모의 전투로 후배들의 한계를 시험한다",
          check: {
            stat: "WS",
            diff: -8
          },
          success: {
            text: "그대의 검술과 전술 지도를 받은 신병들이 눈부신 성장을 이루어냈다.",
            stats: { WS: 1, Inf: 1 },
            align: { dogmatic: 1 }
          },
          fail: {
            text: "시련 도중 무리한 동작으로 옛 상처가 도졌으나, 후배들에게 전사의 각오를 각인시켰다.",
            wounds: -8,
            stats: { WP: 1 }
          }
        },
        {
          label: "오래전 전사한 전우들의 이름을 들려주며 신념을 전수한다",
          effect: {
            text: "긴 세월을 건너뛴 기억이 젊은 전사들의 가슴에 깊은 울림을 남겼다.",
            stats: { WP: 1, Fel: 1 },
            faith: 2,
            align: { humane: 1 }
          }
        }
      ],
      source: "Lexicanum: Neophyte / Space Marine Scout"
    })
  },
  {
    id: "dyn_cent_ordo_joint",
    title: "장수기 작전 — 기밀 합동 토벌 지원",
    isEligible: (ctx) => ctx.isTranshuman && !ctx.isCustodes,
    build: (state, ctx) => ({
      text: `제국 고위 이단심문관으로부터 ${ctx.worldName} 권역의 은밀한 합동 토벌 요청이 도착했다. ${state.age}세의 베테랑만이 감당할 수 있는 기밀 작전이다.`,
      choices: [
        {
          label: "[의지 판정] 작전 계획을 주도적으로 재편해 적의 지휘부를 직접 타격한다",
          check: {
            stat: "WP",
            diff: -12
          },
          success: {
            text: "사교도 수괴와 악마 숙주를 일격에 베어 넘기고 작전을 깔끔히 종결했다.",
            stats: { WP: 1, Inf: 2 },
            faith: 2
          },
          fail: {
            text: "적의 필사적인 자폭 공세에 휘말려 부상을 입었으나 임무는 완수했다.",
            wounds: -12,
            corruption: ctx.incorruptible ? 0 : 2
          }
        },
        {
          label: "최소 병력만 파견하고 기록에서 이름을 지운 채 철수한다",
          effect: {
            text: "기밀을 철저히 유지하며 뒷마무리를 끝냈다.",
            stats: { Int: 1 },
            align: { ruthless: 1 }
          }
        }
      ],
      source: "Lexicanum: Ordo Malleus"
    })
  },
  {
    id: "dyn_cent_blood_games",
    title: "장수기 임무 — 황궁의 혈전 유희(블러드 게임)",
    isEligible: (ctx) => ctx.isCustodes,
    build: (state) => ({
      text: `${state.age}세에 이른 만 명의 수호자로서 황궁의 방어 취약점을 검증하는 극비 훈련 '혈전 유희'에 임했다. 가상 침투자가 외곽 성벽의 맹점을 노리고 황금 옥좌를 향해 잠입을 시도하고 있다.`,
      choices: [
        {
          label: "[지성 판정] 백 년 넘게 익힌 황궁 도면과 보안망을 역산해 가상 침투자의 경로를 선제 차단한다",
          check: {
            stat: "Int",
            diff: -12
          },
          success: {
            text: "내부 감시망조차 놓친 수로 배관의 사각지대를 간파해 가상 침투자를 무력화하고, 황궁 방어 교리를 한 단계 더 치밀하게 보완했다.",
            stats: { Int: 2, WS: 1, Inf: 1 }
          },
          critSuccess: {
            text: "단 한 번의 교전만으로 세 겹의 기만 동선을 모두 간파해 실드-캡틴 평의회의 경의를 얻고 황궁 핵심 구역의 경비 지침을 개정했다.",
            stats: { Int: 2, WS: 2, WP: 1, Inf: 2 }
          },
          fail: {
            text: "치열한 모의 격투 끝에 방어선 돌파를 허용하고 타박상을 입었으나, 드러난 보안 허점을 즉시 봉쇄했다.",
            wounds: -10,
            stats: { Int: 1 }
          },
          critFail: {
            text: "예상치 못한 기만술에 휘말려 중상을 입고 훈련 패배를 기록했으나, 그 참혹한 교훈이 황궁의 새 방벽이 되었다.",
            wounds: -16,
            stats: { WP: 1 }
          }
        },
        {
          label: "외곽 관문과 지하 감시 회랑의 경계 교대 주기를 전면 재편하며 기본 방어에 집중한다",
          effect: {
            text: "화려한 추격 대신 빈틈없는 순찰 규율로 황금 옥좌의 침묵을 지켜 냈다.",
            stats: { WP: 1, Int: 1 },
            align: { dogmatic: 1 }
          }
        }
      ],
      source: "Lexicanum: Blood Games / Codex: Adeptus Custodes"
    })
  },
  {
    id: "dyn_cent_living_miracle",
    title: "장수기 현현 — 절망의 전선에 내린 성광",
    isEligible: (ctx) => ctx.isLivingSaint,
    build: (state, ctx) => ({
      text: `${state.age}년의 세월을 넘어 황제의 의지가 다시금 그대를 부른다. ${ctx.worldName} 방면에서 무너져 가는 제국 방어선과 신음하는 순례자들의 기도가 워프의 암흑을 뚫고 그대의 영혼에 닿았다.`,
      choices: [
        {
          label: "[의지 판정] 황금빛 성광을 펼쳐 적의 악마 군세를 불태우고 무너진 아군 전열을 일으켜 세운다",
          check: {
            stat: "WP",
            diff: -12
          },
          success: {
            text: "눈부신 성광이 전장을 가르자 패주하던 병사들이 다시 총을 들었고, 부정한 그림자들이 재로 흩어졌다.",
            stats: { WP: 2, Fel: 1, Inf: 1 },
            faith: 3
          },
          critSuccess: {
            text: "기적의 성화가 전선 전체를 감싸며 중상자들의 고통을 잠재우고 적 지휘부를 단숨에 분쇄했다. 수만 명이 무릎 꿇고 찬송가를 외쳤다.",
            stats: { WP: 2, Fel: 2, Inf: 2 },
            faith: 5,
            align: { humane: 1, dogmatic: 1 }
          },
          fail: {
            text: "워프의 역풍을 정면으로 받아내며 육신에 깊은 소모를 입었으나, 방어선이 완전히 붕괴하는 것만은 막아 냈다.",
            wounds: -12,
            faith: 1
          },
          critFail: {
            text: "압도적인 악마의 저주를 홀로 떠안아 극심한 탈진과 상처를 입었으나, 끝까지 성광의 불씨를 꺼뜨리지 않았다.",
            wounds: -18,
            stats: { WP: 1 }
          }
        },
        {
          label: "야전 의무소와 피난 행렬 사이를 거닐며 지친 영혼들에게 조용히 축복과 안식을 전한다",
          effect: {
            text: "화려한 천벌 대신 따뜻한 손길로 무너져 가던 신자들의 믿음을 다시 일으켜 세웠다.",
            stats: { Fel: 1, WP: 1 },
            faith: 3,
            align: { humane: 2 }
          }
        }
      ],
      source: "Lexicanum: Living Saint / Codex: Adepta Sororitas"
    })
  }
];

const MORTAL_ELDER_OPS = [
  {
    id: "dyn_cent_frontier_tithe",
    title: "장수기 순시 — 변경 성계 십일조 감사",
    isEligible: (ctx) =>
      !ctx.isTranshuman &&
      !ctx.isChaos &&
      !ctx.isFeral &&
      !ctx.isKrieg &&
      !ctx.isTerraOrMars &&
      ctx.careerTier >= 3 &&
      !ctx.isOgryn &&
      !ctx.isAssassin,
    build: (state, ctx) => ({
      text: `${state.age}세의 원로로서 ${ctx.worldName} 권역의 장기 체납 십일조와 물자 장부를 감사하던 중, 대규모 은닉 창고의 정황이 드러났다.`,
      choices: [
        {
          label: "[권위 판정] 백 년 묵은 관료제의 인맥과 위엄으로 부패 카르텔을 직접 압박한다",
          check: {
            stat: "Inf",
            diff: -12
          },
          success: {
            text: "지방 귀족들이 공포에 질려 은닉 물자를 전량 헌납했고, 그대의 권위가 더욱 공고해졌다.",
            stats: { Inf: 2, Int: 1 }
          },
          critSuccess: {
            text: "은닉 창고에서 고대 무역 허가증과 미등록 함선까지 몰수해 성역 전체의 모범 사례로 보고되었다.",
            stats: { Inf: 3, Fel: 2 }
          },
          fail: {
            text: "교묘한 서류 은폐와 암살 시도에 휘말려 체력을 소모하고 정치적 타격을 입었다.",
            wounds: -10,
            stats: { Inf: -1 }
          }
        },
        {
          label: "아뎁투스 아르비테스에 정식 감사 보고서만 이관하고 한발 물러난다",
          effect: {
            text: "원칙적인 절차를 밟아 불필요한 원한을 피했다.",
            stats: { Int: 1 },
            align: { dogmatic: 1 }
          }
        }
      ],
      source: "Lexicanum: Imperial Tithe"
    })
  },
  {
    id: "dyn_cent_forbidden_codex",
    title: "장수기 연구 — 대서고 고문서 해독",
    isEligible: (ctx) =>
      !ctx.isTranshuman &&
      !ctx.isChaos &&
      !ctx.isFeral &&
      !ctx.isKrieg &&
      !ctx.isOgryn,
    build: (state) => ({
      text: `세월이 ${state.age}년에 달하자, 젊은 서기들은 읽지도 못하는 고대 하이 고딕 암호와 낡은 코지테이터 테이프들이 그대의 책상 위로 모인다.`,
      choices: [
        {
          label: "[지성 판정] 며칠 밤을 새워 훼손된 고문서와 STC 단편 기록을 직접 대조한다",
          check: {
            stat: "Int",
            diff: -10
          },
          success: {
            text: "잊혔던 성계 방어 도면과 고대 합금 배합비를 복원해 큰 공적을 세웠다.",
            stats: { Int: 2, Inf: 1 }
          },
          fail: {
            text: "노안과 과로로 심한 피로에 시달렸고, 문서의 절반은 끝내 판독하지 못했다.",
            wounds: -8
          }
        },
        {
          label: "위험해 보이는 이단적 주석 부분은 즉시 봉인하고 소각실로 보낸다",
          effect: {
            text: "신중한 처신으로 이단심문소의 의심을 원천 차단했다.",
            stats: { WP: 1 },
            faith: 2,
            align: { dogmatic: 1 }
          }
        }
      ],
      source: "Lexicanum: Adeptus Administratum / Adeptus Mechanicus"
    })
  },
  {
    id: "dyn_cent_augmetic_tune",
    title: "장수기 유지 — 장수 시술과 기억의 마모",
    isEligible: (ctx) =>
      !ctx.isTranshuman &&
      !ctx.isChaos &&
      !ctx.isKrieg &&
      (ctx.hasRejuvenat || ctx.hasBionic || ctx.isMechanicus),
    build: (state, ctx) => ({
      text: `${state.age}세의 육신을 지탱하는 ${ctx.hasBionic || ctx.isMechanicus ? "기계교 의체 접합부" : "리주버냇 세포 대사"}가 주기적인 재조율을 요구하고 있다. 오래전 기억들마저 희미하게 겹쳐 보인다.`,
      choices: [
        {
          label: "[의지 판정] 고통스러운 신경 재보정을 견뎌내며 정밀 시술을 완수한다",
          check: {
            stat: "WP",
            diff: -10
          },
          success: {
            text: "노후화된 장기와 회로를 완벽히 조율해 수십 년은 더 버틸 활력을 되찾았다.",
            stats: { T: 1, WP: 1 },
            wounds: 10
          },
          fail: {
            text: "거부 반응으로 며칠간 고열에 시달리며 쇠약해졌다.",
            wounds: -12
          }
        },
        {
          label: "최소한의 안정제만 투여한 채 옛 일기장을 정리하며 휴식을 취한다",
          effect: {
            text: "사라져 가던 젊은 날의 이름들을 다시 떠올리며 마음을 다잡았다.",
            stats: { WP: 1, Fel: 1 },
            align: { humane: 1 }
          }
        }
      ],
      source: "Lexicanum: Rejuvenat / Bionics"
    })
  },
  {
    id: "dyn_cent_dynasty_heir",
    title: "장수기 회고 — 세대를 건너뛴 후계 알현",
    isEligible: (ctx) =>
      !ctx.isTranshuman &&
      !ctx.isChaos &&
      !ctx.isFeral &&
      !ctx.isKrieg &&
      !ctx.isOgryn &&
      !ctx.isAssassin,
    build: (state) => ({
      text: `${state.age}세를 넘긴 그대 앞에, 젊은 시절 알고 지내던 동료의 손주 세대가 찾아와 조언과 추천서를 간청했다. 이미 같은 시대를 산 이들은 대부분 흙으로 돌아갔다.`,
      choices: [
        {
          label: "[교섭 판정] 냉혹하게 능력을 시험한 뒤 쓸 만한 인재에게만 길을 열어준다",
          check: {
            stat: "Fel",
            diff: -8
          },
          success: {
            text: "그대의 안목으로 발탁한 젊은이가 빠르게 두각을 나타내며 든든한 우군이 되었다.",
            stats: { Fel: 1, Inf: 1 }
          },
          fail: {
            text: "기대에 못 미치는 자질에 실망만 남았고, 주변에 원망을 샀다.",
            stats: { Fel: -1 }
          }
        },
        {
          label: "옛 전우와의 인연을 기려 조용히 앞길을 축복하고 물러난다",
          effect: {
            text: "세월을 초월한 온정이 삭막한 제국 궁정에 작은 여운을 남겼다.",
            stats: { Fel: 1 },
            align: { humane: 2 }
          }
        }
      ],
      source: "Lexicanum: Rogue Trader / High Lords of Terra"
    })
  },
  {
    id: "dyn_cent_void_charter",
    title: "장수기 원정 — 고대 성간 항로 재측량",
    isEligible: (ctx) =>
      !ctx.isTranshuman &&
      !ctx.isChaos &&
      !ctx.isFeral &&
      !ctx.isKrieg &&
      !ctx.isInNihilus &&
      ctx.isVoidCapable,
    build: (state, ctx) => ({
      text: `${ctx.worldName} 성계 외곽의 워프 조류가 변하면서 백 년 전 작성된 항해도가 무용지물이 되었다. ${state.age}세의 경험이 다시 필요해졌다.`,
      choices: [
        {
          label: "[의지 판정] 직접 선단을 지휘해 아스트로노미칸의 희미한 빛을 따라 신항로를 개척한다",
          check: {
            stat: "WP",
            diff: -12
          },
          success: {
            text: "격랑을 뚫고 안전한 우회 항로를 기록해 막대한 무역과 보급의 물꼬를 텄다.",
            stats: { WP: 1, Inf: 2 }
          },
          fail: {
            text: "워프 난류에 선체 일부가 파손되어 부상을 입고 회항했다.",
            wounds: -10,
            corruption: ctx.incorruptible ? 0 : 2
          }
        },
        {
          label: "기존 안전 항로의 호위 방어선만 보강하도록 지시한다",
          effect: {
            text: "모험 대신 안정을 택해 선단의 손실을 막았다.",
            stats: { Int: 1 }
          }
        }
      ],
      source: "Lexicanum: Navis Nobilite / Chartist Captains"
    })
  }
];

const CHAOS_IMMORTAL_OPS = [
  {
    id: "dyn_cent_eye_raid",
    title: "장수기 원정 — 제국 보급선단 약탈",
    isEligible: (ctx) => ctx.isChaos,
    build: (state, ctx) => ({
      text: `${state.age}세의 영겁을 살아온 혼돈의 강자로서, ${ctx.worldName} 인근 현실 우주로 기습 약탈 함대를 이끌 절호의 틈이 열렸다.`,
      choices: [
        {
          label: "[백병 판정] 선봉 강습정을 이끌고 제국 호위함의 함교를 직접 유린한다",
          check: {
            stat: "WS",
            diff: -12
          },
          success: {
            text: "무기력한 제국 수병들을 도륙하고 탄약과 노예, 약탈한 성유물을 가득 싣고 귀환했다.",
            stats: { WS: 1, Inf: 2 },
            align: { ruthless: 2 }
          },
          critSuccess: {
            text: "제국 순양함 한 척을 통째로 나포해 워밴드의 주력 기함으로 편입시켰다.",
            stats: { WS: 2, Inf: 3 },
            corruption: 3
          },
          fail: {
            text: "제국 해군의 집중 포화에 갇혀 큰 피해를 입고 워프 균열로 도주했다.",
            wounds: -15
          }
        },
        {
          label: "하급 배신자 무리를 미끼로 던지고 후방 보급선만 조용히 삼킨다",
          effect: {
            text: "추종자들을 소모품으로 써먹으며 실속만 챙겼다.",
            stats: { Int: 1 },
            align: { ruthless: 1 }
          }
        }
      ],
      source: "Lexicanum: Chaos Space Marines / Black Crusade"
    })
  },
  {
    id: "dyn_cent_warband_duel",
    title: "장수기 패권 — 야심 찬 부관의 하극상",
    isEligible: (ctx) => ctx.isChaos,
    build: (state) => ({
      text: `백 년 넘게 워밴드를 지배해 온 ${state.age}세의 그대에게, 암흑 신들의 총애를 노리는 젊은 챔피언이 공개 일기토를 선언했다.`,
      choices: [
        {
          label: "[백병 판정] 전 워밴드 앞에서 도전자의 목을 베어 영원한 위엄을 증명한다",
          check: {
            stat: "WS",
            diff: -10
          },
          success: {
            text: "압도적인 무력으로 반역자를 분쇄하자, 남은 추종자들이 공포 속에 무릎을 꿇었다.",
            stats: { WS: 1, Inf: 2 },
            align: { ruthless: 2 }
          },
          fail: {
            text: "예상치 못한 마검의 일격에 깊은 상처를 입었으나, 간신히 숨통을 끊고 권좌를 지켰다.",
            wounds: -16
          }
        },
        {
          label: "결투 전날 밤, 경쟁 세력을 이간질해 도전자가 스스로 파멸하게 만든다",
          effect: {
            text: "피 한 방울 묻히지 않고 정적을 제거해 암흑의 지략을 과시했다.",
            stats: { Int: 1, Fel: 1 },
            align: { ruthless: 1 }
          }
        }
      ],
      source: "Lexicanum: Chaos Lord / Daemon Prince"
    })
  },
  {
    id: "dyn_cent_daemon_forge",
    title: "장수기 의식 — 악마 대장간의 공물",
    isEligible: (ctx) => ctx.isChaos,
    build: (state) => ({
      text: `공포의 눈 심층부의 다크 메카니쿰 악마 대장간이 ${state.age}세의 그대에게 병기와 갑주 개수의 대가로 산 제물과 블랙스톤 파편, 워프 합금 공물을 요구했다.`,
      choices: [
        {
          label: "[의지 판정] 워프의 비술과 포로들의 영혼을 직접 제어해 병기를 벼려낸다",
          check: {
            stat: "WP",
            diff: -12
          },
          success: {
            text: "굶주린 악마 정령을 무기에 성공적으로 구속해 파괴적인 위력을 얻었다.",
            stats: { WS: 1, BS: 1 },
            corruption: 3
          },
          fail: {
            text: "대장간의 폭주로 화상과 정신적 역류를 입었다.",
            wounds: -12,
            corruption: 4
          }
        },
        {
          label: "일반 탄약과 노획 부품만 교환하고 위험한 악마 구속은 거절한다",
          effect: {
            text: "통제 불가능한 변수를 피하며 실리적인 재보급을 마쳤다.",
            stats: { T: 1 }
          }
        }
      ],
      source: "Lexicanum: Dark Mechanicum / Daemon Engine"
    })
  },
  {
    id: "dyn_cent_black_crusade_omen",
    title: "장수기 계시 — 워프 폭풍 너머의 징조",
    isEligible: (ctx) => ctx.isChaos,
    build: (state) => ({
      text: `${state.age}년의 세월 동안 수없이 보아온 워프의 성좌가 다시 일그러지고 있다. 사대신의 속삭임이 새로운 원정의 방향을 가리킨다.`,
      choices: [
        {
          label: "[지성 판정] 고통스러운 의식을 치르며 워프 계시의 정확한 좌표를 읽어낸다",
          check: {
            stat: "Int",
            diff: -10
          },
          success: {
            text: "제국 방어선의 허점을 찌를 기습 좌표를 손에 넣어 워밴드의 명성을 높였다.",
            stats: { Int: 1, Inf: 1 },
            corruption: 2
          },
          fail: {
            text: "워프의 광기에 휩쓸려 육신이 일그러지는 대가를 치렀다.",
            wounds: -10,
            corruption: 5
          }
        },
        {
          label: "속삭임을 흘려보내고 현실의 병력과 보급 점검에 집중한다",
          effect: {
            text: "헛된 망상에 휘둘리지 않고 워밴드의 결속을 다졌다.",
            stats: { WP: 1 }
          }
        }
      ],
      source: "Lexicanum: Eye of Terror"
    })
  }
];

export const CENTENARIAN_OP_POOLS = {
  transhuman: TRANSHUMAN_OPS,
  mortal: MORTAL_ELDER_OPS,
  chaos: CHAOS_IMMORTAL_OPS
};

export function createDynamicCentenarianEvent(state, reqCtx, helpers) {
  if (!state || state.age < 100) return null;
  const lastYear = Number.isFinite(state.lastCentenarianOpYear) ? state.lastCentenarianOpYear : -999;
  if (state.year - lastYear < 4) return null;

  const { getWorld, getCareer, isIncorruptibleState } = helpers;
  const world = getWorld(state.worldId);
  const career = getCareer(state.careerId);
  const tagSet = reqCtx ? reqCtx.tagSet : new Set(state.tags || []);
  const worldTags = reqCtx ? reqCtx.worldTagSet : new Set(world.tags || []);

  const isChaos =
    career.tree === "chaos" ||
    tagSet.has("heretic") ||
    tagSet.has("chaos_aligned") ||
    tagSet.has("daemon_prince") ||
    tagSet.has("renegade_marine");

  const isDreadnought = tagSet.has("dreadnought");
  const isGreyKnight = career.tree === "grey_knights" || tagSet.has("grey_knight");
  const isCustodes = career.tree === "custodes" || tagSet.has("custodes");
  const isLivingSaint = career.id === "living_saint" || tagSet.has("living_saint");
  const isTranshuman =
    Boolean(career.isTranshuman) ||
    isDreadnought ||
    isGreyKnight ||
    isCustodes ||
    tagSet.has("astartes") ||
    isLivingSaint;

  const ctx = {
    worldName: world.name || "변경 성계",
    isChaos,
    isDreadnought,
    isGreyKnight,
    isCustodes,
    isLivingSaint,
    isTranshuman,
    isTerraOrMars: state.worldId === "terra" || state.worldId === "mars",
    careerTier: career.tier || 1,
    isOgryn: tagSet.has("ogryn"),
    isAssassin: career.tree === "officio_assassinorum" || tagSet.has("assassin"),
    isInNihilus: tagSet.has("imperial_nihilus"),
    isVoidCapable:
      career.tree === "navy" ||
      career.tree === "navis_navigator" ||
      career.tree === "rogue_trader" ||
      tagSet.has("voidborn") ||
      ((career.tier || 1) >= 4 &&
        career.tree !== "officio_assassinorum" &&
        !tagSet.has("assassin") &&
        career.id !== "saint_vessel"),
    isMechanicus: career.tree === "mechanicus" || tagSet.has("mechanicus"),
    hasRejuvenat: tagSet.has("rejuvenat") || (state.rejuvenatCount || 0) > 0,
    hasBionic: tagSet.has("bionic") || (state.augmeticsCount || 0) > 0,
    isKrieg: state.homeWorldId === "krieg" || worldTags.has("krieg"),
    isFeral: worldTags.has("feral"),
    incorruptible: isIncorruptibleState(state)
  };

  const poolSource = isChaos
    ? CHAOS_IMMORTAL_OPS
    : isTranshuman
      ? TRANSHUMAN_OPS
      : MORTAL_ELDER_OPS;

  const recent = Array.isArray(state.recentCentenarianOps) ? state.recentCentenarianOps : [];
  const eligible = poolSource.filter((op) => op.isEligible(ctx));
  if (eligible.length === 0) return null;

  const fresh = eligible.filter((op) => !recent.includes(op.id));
  const candidates = fresh.length > 0 ? fresh : eligible;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  const built = picked.build(state, ctx);

  state.lastCentenarianOpYear = state.year;
  state.recentCentenarianOps = [picked.id, ...recent].slice(0, 6);

  return {
    id: picked.id,
    title: picked.title,
    category: "장수기 동적 작전",
    isTimeline: false,
    isDynamicCentenarian: true,
    text: built.text,
    choices: built.choices,
    source: built.source
  };
}
