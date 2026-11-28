// 분기 사건 — 직군 1:1 단독 파일: 아스트라 밀리타룸 보병(임페리얼 가드) 및 6대 유명 연대 특화
export default [
  {
    id: "ev_job_guard_primer",
    title: "《제국 보병 입문서》와 병참의 부조리",
    category: "직업 고유",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직업: 아스트라 밀리타룸 보병",
    weight: 24,
    leadVariants: [
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "하층 작업장과 뒷골목에서 낡은 부품을 뜯어 고치며 살아온 눈에는, 새로 내어 준 지급품의 조악한 상태가 한눈에 들어왔다."
      },
      {
        req: { anyOriginClasses: ["military_caste"], excludeHomeWorlds: ["krieg"] },
        lead: "어릴 적부터 제식 화기 손질을 손에 익혀 둔 군인 가문 출신답게, 보급 상자를 열어 보자마자 심각한 이상을 즉시 알아챘다."
      },
      {
        req: { allTags: ["disowned_noble"] },
        lead: "가문에서 쫓겨나 보병 계급장을 달고서야, 한때 서류 속 숫자로만 보던 제국 병참의 처참한 현실을 온몸으로 맞닥뜨렸다."
      }
    ],
    text: "전선 투입 직전, 병참부에서 지급한 라스건 전지팩 절반이 불량품이고 탄약 상자에는 300년 전 봉건 행성용 화살촉이 들어 있었다! 그런데도 대대장은 《제국 보병 입문서》의 '제국 보급품에 의심을 품는 자는 총살' 조항을 낭독하고 있다.",
    choices: [
      {
        label: "[교섭 판정 · 하층민 출신] 암시장 거래 요령으로 타 연대 병참 하사관과 은밀히 물물교환해 정상 전지팩을 빼돌린다",
        req: { anyOriginClasses: ["underclass"] },
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "비상 담배와 여분 건빵 몇 꾸러미가 순식간에 최상급 라스건 전지팩 두 상자로 둔갑했다! 분대원들이 그대의 생존 수완에 혀를 내둘렀다.",
          stats: { Fel: 6, Ag: 4, Inf: 3 },
          align: { ruthless: 5 }
        },
        fail: {
          text: "거래 상대가 헌병 끄나풀인 바람에 추가 야간 보초 징계를 받았으나, 불량 전지팩 몇 개는 슬쩍 바꿔치기하는 데 성공했다.",
          wounds: -8,
          stats: { Ag: 2, Inf: -2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[지성 판정] 밤새 불량 전지팩을 뜯어 정상 부품을 조합해 분대 무기를 살려 낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "테크프리스트 눈을 피해 라스건 출력을 되살려 냈다! 덕분에 다음 날 기습전에서 분대 전원이 살아남았다.",
          stats: { Int: 5, BS: 4, Fel: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "기계령 무단 개조 혐의로 엔지니어 사제에게 고발당해 징계 노역을 치렀다.",
          wounds: -14,
          stats: { Inf: -3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[민첩 판정] 인접 연대 보급 창고에서 정상 전지팩을 몰래 '전략적 재배치'한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "아무도 모르게 최상급 탄약과 군화를 확보했다! 병사들이 그대를 전설의 보급 마술사로 떠받든다.",
          stats: { Ag: 5, Fel: 5, Inf: 3 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "헌병대에게 걸려 일주일간 영창에 갇힌 채 빵과 물만 먹었다.",
          wounds: -12,
          stats: { Inf: -4 },
          align: { ruthless: 5 }
        }
      }
    ],
    source: "The Imperial Infantryman's Uplifting Primer"
  },
  {
    id: "ev_career_guard_salvage",
    title: "아스트라 밀리타룸 — 포격 뒤 무주지의 보급품과 전우의 군번줄",
    category: "직군 고유",
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 25,
    leadVariants: [
      {
        req: { anyOriginClasses: ["military_caste"], excludeHomeWorlds: ["krieg"] },
        lead: "선대 무관들로부터 전우의 군번줄만큼은 반드시 거두어야 한다고 배워 온 그대의 시선이 참호 바깥으로 고정되었다."
      },
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "밑바닥 시절 폐허와 고철 더미를 누비며 익힌 지형 감각이 저격수의 사각지대를 본능적으로 그려 냈다."
      },
      {
        req: { allTags: ["disowned_noble"] },
        lead: "화려한 가문의 보호막이 사라진 전장에서, 오직 곁의 분대원들만이 이제 그대가 지켜야 할 유일한 소속이었다."
      }
    ],
    text: "양측의 포격이 잠시 멎은 틈, 철조망 너머 무주지에 부서진 보급 수송차와 쓰러진 선임 병사의 시신이 보인다. 적 저격수가 노리고 있을 것이 분명하지만, 분대에는 탄약과 깨끗한 붕대가 바닥난 상태다.",
    choices: [
      {
        label: "[의지 판정 · 군인 가문 출신] 선조의 야전 교본대로 연막과 엄호 사격 타이밍을 맞춰 분대원과 합동으로 보급품과 군번줄을 회수한다",
        req: { anyOriginClasses: ["military_caste"], excludeHomeWorlds: ["krieg"] },
        check: { stat: "WP", diff: 5 },
        success: {
          text: "빈틈없는 교대 엄호 속에 적 저격수가 방아쇠를 당길 틈조차 주지 않았다! 탄약과 깨끗한 붕대, 그리고 선임의 군번줄까지 온전히 되찾았다.",
          stats: { WP: 6, BS: 4, Fel: 5, Inf: 4 },
          align: { humane: 7 }
        },
        fail: {
          text: "연막이 바람에 일찍 흩어지며 파편에 팔을 스쳤으나, 끝내 군번줄만은 놓지 않고 참호로 돌아왔다.",
          wounds: -14,
          stats: { WP: 4, T: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[민첩 판정] 포탄 구덩이를 포복으로 기어가 탄약 상자와 선임의 군번줄을 모두 회수한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "저격탄 두 발이 철모를 스쳤으나 기어이 탄약과 군번줄을 품고 돌아왔다! 분대원들이 그대를 진정한 베테랑으로 대우하기 시작했다.",
          stats: { Ag: 5, WP: 4, Fel: 5, Inf: 3 },
          align: { humane: 7 }
        },
        fail: {
          text: "종아리에 저격탄을 스치고 간신히 철조망 아래로 굴러 떨어졌다.",
          wounds: -20,
          stats: { T: 3 },
          align: { humane: 5 }
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
    id: "ev_s4_career_guard_ration",
    title: "아스트라 밀리타룸 — 오염된 참호 식수와 야전 배급 위기",
    category: "직군 심화",
    once: true,
    req: {
      minAge: 16,
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 30,
    leadVariants: [
      {
        req: { allTags: ["disowned_noble"] },
        lead: "한때 수정 잔에 담긴 정제수와 포도주만 마시던 몸이지만, 이제는 진흙 참호 한복판에서 굶주린 분대원들과 생사를 나눠야 할 처지다."
      },
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "하층 구역의 탁한 배관수를 끓이고 걸러 마시며 버텨 온 경험 덕분에, 수면 위의 기름띠만 보고도 치명적인 위험을 직감했다."
      },
      {
        req: { anyOriginClasses: ["military_caste"], excludeHomeWorlds: ["krieg"] },
        lead: "군인 가문에서 귀에 못이 박히도록 들은 야전 위생 수칙이 본능처럼 머릿속에 울렸다."
      }
    ],
    text: "장마철 참호에 고인 빗물 저장 탱크에 화학 탄막의 잔류 독성이 스며들고, 비상 시체 전분 통조림마저 절반이 부패해 버렸다. 야전 메디카에가 도착하기까지 이틀을 버텨야 하는데, 갈증에 지친 신병들이 오염된 물을 그대로 퍼 마시려 한다.",
    choices: [
      {
        label: "[교섭 판정 · 의절한 귀족 출신] 옛 상류층 예법과 하이 고딕 억양을 꺼내 들어 후방 보급 장교에게 정수 정제와 의약품을 당당히 받아 낸다",
        req: { allTags: ["disowned_noble"] },
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "뜻밖의 품격 있는 어조에 주눅 든 보급 장교가 얼른 정수 정제와 정식 의약품 상자를 내어 주었다! 버려진 과거의 교양이 분대 전원을 살렸다.",
          stats: { Fel: 7, Inf: 5, WP: 3 },
          align: { humane: 7 }
        },
        fail: {
          text: "귀족 행세를 한다는 의심만 사서 빈손으로 쫓겨났으나, 신병들이 오염수를 마시기 전에 막아 낼 시간은 벌었다.",
          stats: { Inf: -2, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[교섭 판정] 인접 포병대 보급 하사관과 담판해 정수 정제와 뜨거운 리카프 한 통을 끌어온다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "기막힌 수완으로 정수 정제와 따뜻한 리카프, 여분 건조 식량까지 확보했다! 분대원들이 병마를 피하고 그대를 믿음직한 전우로 치켜세웠다.",
          stats: { Fel: 7, Int: 4, Inf: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "거래를 시도하다 헌병 상사에게 적발되어 징계 경고를 받고 빈손으로 돌아왔다.",
          stats: { Inf: -2, Fel: -2, WP: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 숯과 붕대로 간이 여과기를 만들고 부패하지 않은 비상 식량만 선별해 분대 배급표를 짠다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "교본에 없는 야전 지혜가 분대 전원의 생명을 지켰다! 야전 메디카에 장교가 위생 관리 수완을 극찬했다.",
          stats: { Int: 6, T: 5, WP: 3 },
          align: { humane: 7 }
        },
        fail: {
          text: "여과가 불완전했던 물 한 모금을 먼저 시음했다가 심한 복통으로 밤새 앓아누웠다.",
          wounds: -10,
          stats: { Int: 2, T: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "오염된 탱크를 즉시 봉쇄하고 규정대로 최소 수분만 배급하며 야전 메디카에 증원을 기다린다",
        effect: {
          text: "갈증과 허기가 뼈를 깎았지만 단 한 명의 중독자도 내지 않고 전선을 지켰다. 인내심이 한층 깊어졌다.",
          stats: { T: 5, WP: 5 },
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Imperial Guard Rations / Codex: Astra Militarum"
  },
  // =========================================================================
  // 12단계: 6대 유명 연대별 전용 분기 사건 (anyHomeWorlds + astra_militarum)
  // =========================================================================
  {
    id: "ev_s12_guard_reg_cadia",
    title: "카디안 쇼크 트루퍼 — 붕괴 직전 방어선의 일제 사격",
    category: "연대 특화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      anyHomeWorlds: ["cadia"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "카디아 출신 아스트라 밀리타룸",
    weight: 34,
    text: "타 행성 신병 연대가 카오스 이단군의 맹공에 무너지며 퇴각하기 시작했다. 카디아식 제식으로 단련된 그대의 소대는 빗발치는 볼트탄 속에서 자색 눈동자를 번뜩이며 최후의 흉벽을 지키고 있다.",
    choices: [
      {
        label: "[사격 판정] 제1열 무릎 쏴, 제2열 서서 쏴 — 교과서적인 카디아 교차 화망으로 돌격을 분쇄한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "100자루의 라스건이 단 한 치의 흐트러짐 없이 불을 뿜었다! 도주하던 우군 신병들마저 카디아의 위용을 보고 전열로 되돌아왔다.",
          stats: { BS: 7, WP: 5, Inf: 5 },
          faith: 6
        },
        fail: {
          text: "좌익이 잠시 뚫려 파편에 어깨를 베였으나 끝내 흉벽을 사수해 냈다.",
          wounds: -18,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 무너지는 타 연대 병사들에게 카디아의 전투 함성을 외쳐 전열을 재편시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'카디아를 위하여!' 그대의 외침에 공포에 질린 신병들이 총검을 꽂고 다시 흉벽에 섰다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "신병 몇 명은 돌아왔으나 상당수는 후방으로 흩어져 힘든 야간 방어전을 치렀다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "탄약을 아끼며 카디아 교본대로 2차 예비 참호로 질서 정연하게 후퇴 사격한다",
        effect: {
          text: "단 한 명의 낙오자도 없이 방어선을 재정비했다. 연대 장교가 모범적인 기동이라 치하했다.",
          stats: { Int: 4, BS: 3, T: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Cadian Shock Troops"
  },
  {
    id: "ev_s12_guard_reg_krieg",
    title: "데스 코어 오브 크리그 — 탄막 아래 14일째의 참호 굴착",
    category: "연대 특화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      anyHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "크리그 출신 아스트라 밀리타룸",
    weight: 34,
    alignBias: "dogmatic",
    text: "아군 어스쉐이커 공성포의 연속 포격이 적 요새를 짓이기고 있다. 타 연대라면 엄폐호에 숨을 포화 속이지만, 크리그 연대의 교리는 포탄이 떨어지는 바로 그 자리까지 14일 밤낮으로 전진 참호를 파 내려가라고 명한다.",
    choices: [
      {
        label: "[강인 판정] 방독면 필터를 갈아 끼우고 야전삽으로 최선두 진흙 구덩이를 파고든다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "유독 가스와 진동 속에서도 단 1분도 삽질을 멈추지 않았다. 새벽이 밝았을 때 크리그의 참호는 적 철조망 코앞까지 닿아 있었다.",
          stats: { T: 7, WP: 6, WS: 4 },
          faith: 6,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "지근탄 폭풍에 토사가 무너져 늑골에 금이 갔으나, 보고 없이 다시 삽을 쥐었다.",
          wounds: -20,
          stats: { T: 4, WP: 5 },
          align: { dogmatic: 7 }
        }
      },
      {
        label: "[백병 판정] 야전삽과 총검을 들고 붕괴된 적 벙커 틈새로 선봉 돌격한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "말 한마디 없이 밀려드는 방독면의 물결에 적 수비대가 공포에 질려 무너졌다! 속죄의 공훈이 연대 기록에 남았다.",
          stats: { WS: 7, WP: 5, Inf: 4 },
          addTags: ["krieg_grenadier"],
          align: { dogmatic: 8 }
        },
        fail: {
          text: "중기관총 사격에 중상을 입었으나 기어이 적 기관총좌에 수류탄을 밀어 넣었다.",
          wounds: -24,
          stats: { WS: 4, T: 4 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "연대 쿼터마스터의 지시에 따라 전사한 분대원의 장비와 방독면을 빠짐없이 회수한다",
        effect: {
          text: "크리그에서 병사의 생명은 소모되지만 황제의 장비는 낭비되지 않는다. 완벽한 임무 수행이었다.",
          stats: { Int: 4, WP: 5 },
          align: { dogmatic: 7 }
        }
      }
    ],
    source: "Imperial Armour: Siege of Vraks / Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ev_s12_guard_reg_catachan",
    title: "카타찬 정글 파이터 — 귀족 장교의 제식 행진과 정글식 매복",
    category: "연대 특화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      anyHomeWorlds: ["catachan"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "카타찬 출신 아스트라 밀리타룸",
    weight: 34,
    text: "타 행성에서 새로 부임한 귀족 출신 중대장이 밀림 전선 한복판에서 붉은 예복과 정식 열병 대열로 진군하라고 명령했다! 카타찬 병사들 눈에는 적 저격수와 맹독 식물의 먹잇감이 되겠다는 자살 행위나 다름없다.",
    choices: [
      {
        label: "[민첩 판정] 대열을 벗어나 덤불 속으로 우회해 적 매복조의 목을 카타찬 대검으로 먼저 따낸다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "적 매복조의 수급을 장교 발 앞에 던져 놓자 귀족 장교가 얼굴이 하얗게 질린 채 작전권을 베테랑들에게 넘겼다!",
          stats: { Ag: 7, WS: 5, Fel: 4 },
          addTags: ["catachan_blooded"],
          align: { ruthless: 6 }
        },
        fail: {
          text: "독가시에 허벅지를 찔리고 겨우 매복을 깨뜨렸으나, 덕분에 중대 전멸은 막았다.",
          wounds: -18,
          stats: { T: 5, Ag: 3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[교섭 판정] 귀족 장교에게 '이 밀림에선 계급장 빛나는 사람부터 저격당합니다'라며 정중히 현실을 일깨운다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "생존 본능이 발동한 장교가 얼른 금빛 견장을 떼고 카타찬식 산개 기동으로 명령을 바꿨다.",
          stats: { Fel: 6, Int: 5, Inf: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "귀족 장교에게 항명 직전의 질책을 받아 징계 기록이 남았으나, 정찰 선봉으로 빠져나와 스스로 살아남을 길은 확보했다.",
          stats: { Inf: -3, Fel: -2, Ag: 2 },
          align: { humane: 4 }
        }
      },
      {
        label: "입을 다물고 묵묵히 대열 외곽에서 부비트랩 징후만 살피며 경계한다",
        effect: {
          text: "교전 직전 인계철선을 발견해 분대의 피해를 절반으로 줄였다. 말보다 행동이 앞서는 카타찬다운 처신이었다.",
          stats: { Int: 4, T: 4 }
        }
      }
    ],
    source: "Codex: Catachans / Lexicanum: Catachan Jungle Fighters"
  },
  {
    id: "ev_s12_guard_reg_valhalla",
    title: "발할라 아이스 워리어 — 영하 60도의 타나 차와 오크 야습",
    category: "연대 특화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      anyHomeWorlds: ["valhalla"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "발할라 출신 아스트라 밀리타룸",
    weight: 34,
    text: "눈보라가 시야를 집어삼킨 빙원 전선. 다른 행성 병사들이 동상으로 총을 놓칠 때, 발할라 아이스 워리어들은 펄펄 끓인 타나 차를 나눠 마시며 묵묵히 헤비 볼터 거치대를 손질하고 있다. 바로 그때 눈보라 너머에서 오크 워트럭의 엔진 소리가 울린다!",
    choices: [
      {
        label: "[사격 판정] 시야가 10미터뿐인 눈보라 속에서 소리로 조준해 오크 선두 차량의 바퀴를 꿰뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "선두 워트럭이 빙판 위에서 전복되며 오크 돌격대 전체가 뒤엉켰다! 발할라 연대의 냉정한 화력이 야습을 분쇄했다.",
          stats: { BS: 7, T: 5, WP: 4 }
        },
        fail: {
          text: "파편이 외투를 찢었으나 두꺼운 발할라 방한 코트 덕분에 치명상은 면했다.",
          wounds: -15,
          stats: { T: 5, BS: 2 }
        }
      },
      {
        label: "[강인 판정] 얼어붙은 중기관총 냉각장치를 맨손으로 정비해 연발 화망을 되살린다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "동상의 고통을 이겨 내고 헤비 볼터를 재가동시켰다! 빙원 위에 그린스킨의 비명이 울려 퍼졌다.",
          stats: { T: 7, Int: 4, Inf: 4 }
        },
        fail: {
          text: "손가락에 심한 동상을 입었으나 발사에는 성공해 소대를 지켜 냈다.",
          wounds: -16,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "따뜻한 타나 차 한 모금으로 몸을 녹이고 예비 화염방사기 분대를 유도해 방어선을 지킨다",
        effect: {
          text: "발할라의 추위는 우리 편이다. 침착한 화력 유도로 단 한 명도 잃지 않고 밤을 넘겼다.",
          stats: { WP: 5, Int: 4 }
        }
      }
    ],
    source: "Ciaphas Cain Novels / Lexicanum: Valhallan Ice Warriors"
  },
  {
    id: "ev_s12_guard_reg_tanith",
    title: "타니스 퍼스트 앤드 온리 — 위장 망토와 안개 속 백파이프",
    category: "연대 특화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      anyHomeWorlds: ["tanith"],
      minYear: 765,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "타니스 출신 아스트라 밀리타룸",
    weight: 34,
    text: "잿빛 안개가 깔린 적 후방 삼림. 타니스 고유의 카멜레올린 위장 망토를 두른 정찰 분대가 적 포병 진지 30미터 앞까지 숨어들었다. 은빛 타니스 단검을 쥔 손끝에 긴장이 흐른다.",
    choices: [
      {
        label: "[민첩 판정] 그림자처럼 스며들어 소리 없이 적 보초를 제압하고 포병 탄약고에 시한폭탄을 설치한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "적 포병대가 하늘로 솟구치는 순간, 안개 너머로 타니스 파이프의 처연한 선율이 울려 퍼졌다. 진정한 '유령'의 전과다.",
          stats: { Ag: 8, WS: 5, Inf: 5 },
          addTags: ["tanith_ghost"]
        },
        fail: {
          text: "퇴각 도중 적 순찰대와 맞닥뜨려 부상을 입었으나 탄약고 폭파에는 성공했다.",
          wounds: -18,
          stats: { Ag: 4, WP: 4 }
        }
      },
      {
        label: "[사격 판정] 고배율 롱라스로 적 포병 장교와 관측병만 정확히 저격해 지휘 체계를 마비시킨다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "세 발의 뜨거운 라스 광선이 안개를 뚫고 적 지휘관 셋을 쓰러뜨렸다! 아군 주력이 무혈로 진지를 점령했다.",
          stats: { BS: 8, Int: 4, Inf: 4 }
        },
        fail: {
          text: "총구 섬광이 노출되어 맹렬한 수색 사격을 피해 덤불 속으로 급히 몸을 숨겼다.",
          wounds: -14,
          stats: { BS: 3, Ag: 3 }
        }
      },
      {
        label: "교전 없이 적 포대의 정확한 좌표만 복스로 송신하고 은밀히 철수한다",
        effect: {
          text: "10분 뒤 아군 대포병 사격이 적 진지를 지도에서 지워 버렸다. 정찰병의 본분을 완벽히 다했다.",
          stats: { Int: 5, Ag: 4 }
        }
      }
    ],
    source: "Gaunt's Ghosts Series / Lexicanum: Tanith First and Only"
  },
  {
    id: "ev_s12_guard_reg_vostroya",
    title: "보스트로얀 퍼스트본 — 가문의 공예 라스건과 장자의 맹세",
    category: "연대 특화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      anyHomeWorlds: ["vostroya"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "보스트로야 출신 아스트라 밀리타룸",
    weight: 34,
    text: "시가전 도중 그대가 물려받은 보스트로야 전통 공예 라스건의 목재 개머리판에 탄환이 박혀 갈라졌다. 1만 년 전 호루스 헤러시의 빚을 갚기 위해 모든 장자가 바쳐지는 보스트로얀 퍼스트본에게, 선조의 총기를 잃는 것은 곧 가문의 치욕이다.",
    choices: [
      {
        label: "[지성 판정] 전투 사이 틈을 내어 황동 장식과 총열을 정성껏 수리하고 기계령 축성 의식을 올린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "선조들의 숨결이 깃든 공예 라스건이 오히려 더 날카로운 집탄율로 되살아났다! 연대 베테랑들이 경의를 표한다.",
          stats: { Int: 6, BS: 6, WP: 4 },
          faith: 5
        },
        fail: {
          text: "총열 정렬이 어긋나 시사 도중 약실이 역화해 손을 데었고, 보급창 장인의 질책 속에 수리를 맡겨야 했다.",
          wounds: -6,
          stats: { Inf: -2, Int: 2 }
        }
      },
      {
        label: "[백병 판정] 총검을 꽂고 부서진 개머리판째로 적 이단 분대장을 향해 돌격해 시가전을 결판낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "붉은 외투와 털모자가 화염 속을 가르고 적 지휘소를 점령했다! 갈라진 개머리판은 영광의 훈장이 되었다.",
          stats: { WS: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "근접전에서 옆구리에 깊은 상처를 입었으나 끝내 무기를 놓지 않고 버텨 냈다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "손상된 가보 총기를 조심히 수납하고 임시 제식 라스건으로 임무를 완수한다",
        effect: {
          text: "냉정하게 임무를 마친 뒤 후방에서 장인의 손길로 선조의 총기를 완벽히 복원했다.",
          stats: { WP: 4, T: 3, Inf: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Vostroyan Firstborn"
  },
  // =========================================================================
  // 12단계: 일반 아스트라 밀리타룸 보병 심화 사건 6종
  // =========================================================================
  {
    id: "ev_s12_guard_leman_russ",
    title: "리만 러스 전차대 호위 — 강철 거수의 사각지대",
    category: "직군 심화",
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 26,
    text: "아군 리만 러스 주력 전차가 폐허 시가지로 진격하고 있다. 육중한 장갑은 적 소총탄을 튕겨 내지만, 무너진 건물 2층에서 적 대전차 특공조가 멜타 폭탄을 들고 전차 후면 엔진실로 뛰어내리려 한다!",
    choices: [
      {
        label: "[사격 판정] 2층 창틀에 몸을 드러낸 적 대전차병을 연속 사격으로 저지한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "멜타 폭탄을 쥔 적병이 추락하며 전차 지휘관이 해치를 열고 엄지를 치켜세웠다! 기갑 중대가 그대의 분대에 전폭적인 화력 지원을 약속했다.",
          stats: { BS: 6, Inf: 5, Fel: 4 }
        },
        fail: {
          text: "적 엄호 사격에 팔을 스쳤으나 적 대전차병의 투척을 빗나가게 하는 데는 성공했다.",
          wounds: -16,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "[민첩 판정] 전차 측면으로 달려가 외부 인터폰으로 차장에게 후방 위험을 알리고 연막탄을 터뜨린다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "전차 포탑이 굉음과 함께 회전해 2층 건물째 날려 버렸다! 완벽한 보전 합동 작전이었다.",
          stats: { Ag: 6, Int: 5, Inf: 4 }
        },
        fail: {
          text: "전차 궤도가 튀긴 파편에 무릎을 다쳤으나 전차는 무사히 살아남았다.",
          wounds: -14,
          stats: { Ag: 3, T: 3 }
        }
      },
      {
        label: "분대 전체에 엄폐 사격을 지시해 전차가 후진 기동할 시간만 벌어 준다",
        effect: {
          text: "화려하진 않았지만 정석적인 보병 호위 전술로 전차와 분대 모두 피해를 최소화했다.",
          stats: { Int: 4, WP: 3 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War"
  },
  {
    id: "ev_s12_guard_night_sentry",
    title: "무주지의 야간 보초 — 철조망 너머의 기척과 조명탄",
    category: "직군 심화",
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 25,
    text: "새벽 3시, 비와 진흙으로 뒤덮인 최전방 감시 초소. 15미터 앞 철조망에서 쇠가 긁히는 희미한 소리가 들렸다. 적 야습 척후조일 수도, 혹은 길을 잃고 돌아오는 아군 정찰병일 수도 있다. 경보를 울리면 포격이 쏟아질 것이다.",
    choices: [
      {
        label: "[의지 판정] 숨을 죽이고 침착하게 적의 윤곽과 장비 소리를 끝까지 판별한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "철조망 절단기 소리임을 확신하고 즉시 조명탄을 쏘아 올렸다! 적 야습 부대 50명이 대낮처럼 드러나 화망에 전멸했다.",
          stats: { WP: 6, Int: 5, Inf: 5 }
        },
        fail: {
          text: "긴장 속에 잘못 오인해 길 잃은 야생 짐승에 조명탄을 쏘아 올려 소대장에게 한 소리 들었다.",
          stats: { WP: 2, Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 오늘의 야간 암구호를 낮게 속삭여 상대의 반응을 시험한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "대답 대신 금속성 욕설이 돌아오자마자 수류탄을 던지고 경보를 울렸다! 기습을 완벽히 차단했다.",
          stats: { Int: 6, BS: 4, WP: 4 }
        },
        fail: {
          text: "위치가 드러나 적 침투조의 단검에 어깨를 베였으나 경보를 울려 참호를 지켜 냈다.",
          wounds: -18,
          stats: { T: 3, WS: 3 }
        }
      },
      {
        label: "규정대로 즉시 경고 사격을 가하고 분대 전원을 기상시킨다",
        effect: {
          text: "잠을 깬 분대원들이 투덜거렸지만, 밤사이 어떤 적도 감히 초소에 접근하지 못했다.",
          stats: { WP: 3, BS: 2 }
        }
      }
    ],
    source: "Fifteen Hours / Only War Core"
  },
  {
    id: "ev_s12_guard_heavy_weapons",
    title: "중화기 분대 긴급 차출 — 과열된 라스캐논과 적 기갑 돌격",
    category: "직군 심화",
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 26,
    text: "적 중전차가 방어선 중앙으로 밀고 들어오는데, 중화기 진지의 라스캐논 사수가 포탄 파편에 쓰러졌다! 냉각 코일이 붉게 달아오른 삼각대 라스캐논이 주인을 잃고 방치되어 있다.",
    choices: [
      {
        label: "[사격 판정] 쓰러진 사수 자리에 뛰어들어 적 전차의 궤도와 포탑 틈새를 정조준한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "눈부신 청백색 빔이 적 전차의 탄약고를 관통해 거대한 불기둥을 일으켰다! 전선 전체에서 환호성이 터졌다.",
          stats: { BS: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "과열된 총열이 역화하며 화상을 입었으나 적 전차의 진격을 멈춰 세웠다.",
          wounds: -20,
          stats: { BS: 3, T: 4 }
        }
      },
      {
        label: "[지성 판정] 과열된 에너지 셀을 먼저 교체하고 안정화시킨 뒤 신중하게 사격한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "기계령의 노여움을 달래고 정확히 두 발을 명중시켜 적 전차를 무력화했다! 중화기 운용 적성을 인정받았다.",
          stats: { Int: 6, BS: 5, Inf: 4 }
        },
        fail: {
          text: "교체가 지체되는 사이 적 기관총탄이 진지를 훑고 지나가 팔에 관통상을 입었다.",
          wounds: -18,
          stats: { Int: 3, T: 3 }
        }
      },
      {
        label: "쓰러진 사수를 먼저 안전한 참호로 끌어내고 대전차 수류탄 조에게 표적을 넘긴다",
        effect: {
          text: "전우의 목숨을 구하고 화력 공백도 메웠다. 중대 의무병이 진심 어린 감사를 전했다.",
          stats: { T: 4, Fel: 5, WP: 3 },
          align: { humane: 8 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Heavy Weapons Squad"
  },
  {
    id: "ev_s12_guard_bunker_siege",
    title: "72시간 봉쇄된 토치카 — 마지막 동력팩과 총검 돌격",
    category: "직군 심화",
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 24,
    text: "아군 주력과 고립된 전방 콘크리트 토치카에서 사흘 밤낮을 버텼다. 물도 식량도 떨어졌고, 분대원마다 남은 라스건 동력팩은 단 하나뿐이다. 복스 너머로 아군 구원대가 20분 뒤 도착한다는 잡음이 섞여 들린다.",
    choices: [
      {
        label: "[의지 판정] 황제께 기도하며 마지막 동력팩을 단발 사격으로 아껴 20분을 버텨 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "총열이 녹아내릴 듯한 사격전 끝에 마침내 아군 발키리 건십의 추력 엔진 굉음이 하늘을 갈랐다! 불굴의 수비대로 훈장을 받았다.",
          stats: { WP: 7, BS: 5, Inf: 6 },
          faith: 7,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "토치카 입구가 무너져 잔해에 깔렸으나 아군 구원대가 가까스로 그대를 끌어냈다.",
          wounds: -22,
          stats: { T: 5, WP: 4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[백병 판정] 탄약이 바닥나기 직전 총검을 꽂고 역습 돌격해 적 포위망의 숨통을 끊는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "죽음을 각오한 역습에 적 포위대가 당황해 무너졌다! 아군 구원대와 극적으로 합류했다.",
          stats: { WS: 8, WP: 6, Inf: 5 }
        },
        fail: {
          text: "피투성이 육탄전 끝에 치명상을 입었으나 기어이 깃발을 지켜 냈다.",
          wounds: -25,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "부상병을 지하 배수로로 먼저 대피시키고 좁은 통로에서 지연전을 펼친다",
        effect: {
          text: "지형을 영리하게 활용해 사상자를 최소화하며 구원 부대가 도착할 때까지 버텼다.",
          stats: { Int: 5, T: 4, Fel: 3 },
          align: { humane: 7 }
        }
      }
    ],
    source: "Only War: Hammer of the Emperor / Codex: Astra Militarum"
  },
  {
    id: "ev_s12_guard_ogryn_squad",
    title: "분대에 배속된 오그린 거한 — 수송차 탑승 소동",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["ogryn", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "직군: 아스트라 밀리타룸 · 비오그린",
    weight: 26,
    text: "돌파 작전을 앞두고 키 3미터가 넘는 오그린 보조병 '노크'가 분대에 배속되었다. 그런데 좁고 어두운 키메라 장갑차 문 앞에 서자, 폐소공포증에 걸린 거한이 '어두운 쇳덩이 안엔 괴물이 있어!'라며 버티기 시작했다. 출발까지 2분 남았다!",
    choices: [
      {
        label: "[교섭 판정] '황제 폐하께서 안에서 너를 지켜보고 계신단다. 착한 병사는 먼저 타는 거야'라며 달랜다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "오그린이 활짝 웃으며 몸을 구겨 장갑차에 올라탔다! 이후 전장에서 그 거한은 그대 앞을 가로막는 산 같은 방패가 되어 주었다.",
          stats: { Fel: 6, WP: 3, Inf: 3 },
          wounds: 6
        },
        fail: {
          text: "오그린이 너무 기뻐하며 그대의 등을 두드리는 바람에 어깨가 뻐근해졌지만 탑승에는 성공했다.",
          wounds: -8,
          stats: { Fel: 4, T: 2 }
        }
      },
      {
        label: "[지성 판정] 비상 전투식량 캔을 흔들며 차 안쪽에 가장 큰 자리를 내어 주어 자연스럽게 유도한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "식량 냄새에 이끌린 오그린이 순순히 탑승했다! 소대장이 뛰어난 현장 대처라고 칭찬했다.",
          stats: { Int: 5, Fel: 4 }
        },
        fail: {
          text: "식량을 다 뜯기고도 문이 늦게 닫혀 소대장에게 호된 질책을 받았으나, 가까스로 대열에 합류했다.",
          stats: { Inf: -2, Fel: -2, Int: 2 }
        }
      },
      {
        label: "장갑차 지붕 손잡이에 매달려 이동하도록 상사에게 건의하고 옆에서 시야를 잡아 준다",
        effect: {
          text: "바람을 맞으며 신이 난 오그린이 리퍼 건을 휘두르며 적 참호를 통째로 쓸어 버렸다.",
          stats: { T: 3, WS: 3, Fel: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Lexicanum: Ogryn"
  },
  {
    id: "ev_s12_guard_field_promotion",
    title: "지휘부 전멸 후 야전 분대장 대행 — 퇴각인가 사수인가",
    category: "직군 심화",
    once: true,
    req: {
      anyCareers: ["astra_militarum"],
      minAge: 19,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "19세+ 아스트라 밀리타룸",
    weight: 28,
    text: "적 직격탄이 소대 지휘 벙커를 날려 버렸다. 소대장과 선임 하사가 모두 전사하고, 남은 18명의 병사들이 혼란 속에서 가장 오래 살아남은 그대를 바라보고 있다. 우익 언덕의 적 중화기 진지가 방어선을 내려다보고 있다.",
    choices: [
      {
        label: "[교섭 판정] 즉시 임시 지휘권을 인수해 연막 차폐 아래 우익 언덕 우회 점령을 지휘한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "완벽한 지휘로 적 중화기 진지를 탈취했다! 대대장이 야전 공훈 표창을 수여하며 정식 분대장 진급과 장교 후보 추천 명단에 그대의 이름을 올렸다.",
          stats: { Fel: 7, Int: 5, Inf: 7, WP: 4 }
        },
        fail: {
          text: "우회 도중 적 측방 화력에 걸려 부상을 입었으나 남은 소대원 절반을 살려 귀환했다.",
          wounds: -18,
          stats: { Fel: 3, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 벙커 잔해에서 살아 있는 복스 통신기를 찾아 포병 지원을 요청해 언덕을 갈아엎는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "정확한 좌표 송신으로 적 언덕을 초토화했다! 연대 참모부가 그대의 냉철한 전술안을 높이 평가했다.",
          stats: { Int: 7, Inf: 6, BS: 4 }
        },
        fail: {
          text: "통신 잡음 때문에 포탄이 아군 진지 가까이에 떨어져 충격을 입었으나 적 공세는 꺾였다.",
          wounds: -14,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "지휘 계통 복구가 우선이다. 남은 병력을 모아 인접 중대 지휘관에게 합류한다",
        effect: {
          text: "소모적인 독단 대신 질서 있는 합류를 택해 병사들의 생명을 지켰다.",
          stats: { WP: 4, T: 3, Inf: 3 }
        }
      }
    ],
    source: "Only War Core / Codex: Astra Militarum"
  }
];
