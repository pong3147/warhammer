// 분기 사건 — Stage 24 출신·계급 교차, 귀족 낙하산/의절, 크리그 14세 실전, 스콜라·군인 가문 대비 (10종)
export default [
  {
    id: "ev_s24_orig_01",
    title: "낙하산 소위와 스무 해 참호 고참 분대장",
    category: "계급 충돌",
    once: true,
    req: {
      minAge: 18,
      maxAge: 28,
      allTags: ["noble_commission"],
      anyCareers: ["militarum_officer"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "18~28세 · 귀족 낙하산 임관 · 밀리타룸 장교",
    weight: 38,
    leadVariants: [
      {
        req: { anyOriginClasses: ["high_noble"] },
        lead: "테라 상류 가문의 금빛 자수가 선명한 신임 장교 외투를 걸친 채 최전방 참호로 내려섰다."
      },
      {
        req: { anyOriginClasses: ["noble"] },
        lead: "가문의 후원으로 단숨에 임관장을 받아 든 첫날, 진흙과 화약 냄새가 진동하는 최전방 참호를 시찰하게 되었다."
      }
    ],
    text: "스무 해 넘게 전선을 구른 백전의 고참 분대장이 비단 장갑 낀 그대를 위아래로 훑으며 노골적으로 빈정거린다. '소위님, 귀족 자제분들 예절 수업 받던 살롱하고 여긴 다릅니다. 저격수 화망이 깔린 제3참호 전초까지 직접 걸어가 보시겠습니까, 아니면 후방 지휘 막사에서 차나 드시겠습니까?' 소대원 수십 명의 차가운 시선이 그대의 다음 움직임을 주시한다.",
    choices: [
      {
        label: "[백병 판정] 비단 장갑을 벗어 던지고 지휘검과 야전삽을 쥔 채 고참 분대장과 함께 최선두 제3참호로 돌파한다",
        check: { stat: "WS", diff: -5 },
        critSuccess: {
          text: "포화 속에서 적 침투조를 몸소 베어 넘기고 부상병까지 들쳐 업어 돌아오자, 고참 분대장이 처음으로 굳은 표정을 풀며 묵직한 경례를 올렸다! 귀족 풋내기가 아니라 진짜 전선의 지휘관으로 거듭났다.",
          stats: { WS: 7, WP: 6, Fel: 7, Inf: 6 },
          addTags: ["battle_hardened"],
          removeTags: ["shell_shocked"],
          align: { humane: 8 }
        },
        success: {
          text: "진흙탕에 몸을 굴리며 제3참호 전초를 끝까지 시찰하자 소대원들의 냉소가 단숨에 경의로 바뀌었다.",
          stats: { WS: 5, WP: 5, Fel: 5, Inf: 4 },
          align: { humane: 6 }
        },
        fail: {
          text: "적 박격포 파편에 어깨를 베이고 진흙에 나뒹굴었으나 끝까지 물러서지 않고 전초 순찰을 마쳤다.",
          wounds: -16,
          stats: { T: 3, WP: 4 },
          align: { humane: 4 }
        }
      },
      {
        label: "[권위 판정] 가문의 사적 보급망을 즉시 가동해 소대 전원에게 정제 탄약과 따뜻한 리카프, 새 방한화를 조달한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "사흘 뒤 가문 문장이 찍힌 보급 상자가 참호에 도착하자 고참 분대장도 '귀족 낙하산치고는 꽤 쓸모가 있군'이라며 묵직한 경례를 올렸다.",
          stats: { Inf: 6, Fel: 6, Int: 3 },
          align: { humane: 4 }
        },
        fail: {
          text: "가문 집사가 실전 보급 대신 쓸모없는 장교용 향수와 고급 포도주만 보내는 바람에 참호의 조롱거리만 커졌다.",
          stats: { Inf: -3, Fel: -3, WP: 2 }
        }
      },
      {
        label: "군법 제41조 상관 모욕 조항을 냉정히 낭독하며 규율과 계급의 무게로 현장을 즉각 제압한다",
        effect: {
          text: "분대장은 이를 악물고 부동자세를 취했다. 진심 어린 존경은 얻지 못했으나 지휘 계통의 서열만은 흔들림 없이 세워졌다.",
          stats: { WP: 5, Inf: 4, Fel: -3 },
          align: { dogmatic: 7 }
        }
      }
    ],
    source: "Only War Core / Codex: Astra Militarum / Gaunt's Ghosts"
  },
  {
    id: "ev_s24_orig_02",
    title: "귀족 장교단의 사교 연회와 병사들의 차가운 시선",
    category: "계급 충돌",
    once: true,
    req: {
      minAge: 19,
      allTags: ["noble_commission"],
      anyCareers: ["militarum_officer"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "19세+ · 귀족 낙하산 임관 · 밀리타룸 장교",
    weight: 36,
    leadVariants: [
      {
        req: { anyOriginClasses: ["high_noble"] },
        lead: "테라 최상류 혈통의 이름값 덕분인지, 사단 지휘부 연회장은 그대가 들어서자마자 은빛 잔을 부딪치는 소리로 가득 찼다."
      },
      {
        req: { anyOriginClasses: ["noble"] },
        lead: "가문 연줄로 임관한 귀족 장교들이 후방 석조 지휘소에 모여 빈티지 아마섹과 훈제 고기를 즐기고 있다."
      }
    ],
    text: "두꺼운 방폭 창문 너머로 진눈깨비와 진흙 속에 웅크린 채 차가운 건빵을 씹는 휘하 소대원들의 모습이 선명하게 내려다보인다. 연회장을 주도하는 백작 출신 대령이 그대에게 잔을 건네며 '저 하층민 소모품들은 원래 굶주려야 싸움을 잘하는 법일세. 자네도 우리 사교 모임에 이름을 올려 사단 참모 자리를 예약하게'라고 속삭인다.",
    choices: [
      {
        label: "[교섭 판정] 연회장의 고급 아마섹과 잉여 식량 상자를 빼돌려 참호의 병사들과 직접 나눠 마신다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "진흙 참호 한복판에서 함께 술잔을 기울이자 병사들의 차가웠던 눈빛이 뜨거운 충성으로 바뀌었다! 소대 전체가 그대를 따르기 시작했다.",
          stats: { Fel: 7, WP: 4, Inf: 4 },
          align: { humane: 8 }
        },
        fail: {
          text: "대령의 부관에게 들켜 귀족 장교단 사교계에서 따돌림을 당했으나, 병사들 사이에서는 든든한 평판이 돌았다.",
          stats: { Inf: -4, Fel: 4 },
          align: { humane: 6 }
        }
      },
      {
        label: "[지성 판정] 연회 자리에 남아 취기가 오른 귀족 장교들의 입에서 다음 공세의 보급 배정과 진급 정보를 빼낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "사단 참모부의 밀실 인사와 예비 포병 지원 배정표를 미리 파악해 우리 연대의 사상률을 크게 줄일 수 있게 되었다!",
          stats: { Int: 6, Inf: 7, Fel: 3 },
          align: { ruthless: 5 }
        },
        fail: {
          text: "눈치 빠른 귀족 장교들에게 속내를 들켜 싸늘한 견제와 냉대를 받았다.",
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "귀족 장교단의 축배에 자연스럽게 합류해 가문의 명예와 후방 인맥을 착실히 다진다",
        effect: {
          text: "따뜻한 화로 앞에서 사단 고위 인사들과 안면을 텄다. 다음 날 아침 참호 병사들은 그대를 향해 전보다 더 무겁게 침묵했다.",
          stats: { Inf: 6, Fel: -2 },
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Ciaphas Cain Novels / Only War: Hammer of the Emperor"
  },
  {
    id: "ev_s24_orig_03",
    title: "평민 출신 지휘관과 귀족 참모진의 냉소",
    category: "계급 충돌",
    once: true,
    req: {
      minAge: 22,
      anyOriginClasses: ["underclass", "common"],
      anyCareers: ["militarum_officer", "militarum_general", "navy_captain", "navy_admiral", "admin_prefect_rank"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "22세+ · 하층민/일반 시민 출신 지휘관·고위 관료",
    weight: 34,
    leadVariants: [
      {
        req: { anyOriginClasses: ["underclass"] },
        lead: "가장 밑바닥에서 피와 땀으로 기어올라 마침내 지휘관의 자리에 앉았건만, 참모실의 시선은 여전히 서늘하다."
      },
      {
        req: { anyOriginClasses: ["common"] },
        lead: "화려한 가문 배경 하나 없이 오직 실력과 전공으로 현재 직책까지 올라왔지만, 조직 안의 보이지 않는 벽은 여전히 높다."
      }
    ],
    text: "작전 회의가 시작되자 귀족 혈통의 부참모와 보좌관들이 일부러 난해한 고대 하이 고딕 관용구와 사교계 은어를 섞어 보고서를 낭독하며 그대의 지시를 교묘하게 비틀고 지연시킨다. 명령 계통을 정면으로 거역하진 않으면서도, 출신이 미천한 지휘관을 무능해 보이게 만들어 축출하려는 노골적인 태업이다.",
    choices: [
      {
        label: "[지성 판정] 밤새 정리한 현장 실측 수치와 규정 조항으로 귀족 참모의 허술한 보고서를 회의장 앞에서 조목조목 분쇄한다",
        check: { stat: "Int", diff: -5 },
        critSuccess: {
          text: "참모실 전체가 숨을 죽였다. 빈틈없는 논리와 압도적인 언변 앞에 귀족 참모들이 얼굴을 붉히며 고개를 숙였고, 상급 사령부마저 그대의 유능함을 극찬했다!",
          stats: { Int: 8, Inf: 8, Fel: 5 },
          addTags: ["silver_tongue"]
        },
        success: {
          text: "화려한 미사여구 뒤에 숨은 병참 오류를 정확히 짚어 내자 참모진의 비웃음이 단숨에 사라졌다.",
          stats: { Int: 6, Inf: 6, WP: 4 }
        },
        fail: {
          text: "복잡한 관료 조항 인용에서 작은 말꼬리를 잡혀 회의 주도권을 일부 빼앗겼으나, 핵심 지시만은 끝내 관철했다.",
          stats: { Int: 3, Inf: -3 }
        }
      },
      {
        label: "[권위 판정] 가장 앞장서서 태업한 귀족 보좌관을 즉석에서 직위 해제하고 최선봉 감시 임무로 좌천시킨다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "서슬 퍼런 인사권 행사에 참모실 전체가 얼어붙었다. 출신이 어떻든 지휘봉을 쥔 자가 누구인지 똑똑히 각인시켰다!",
          stats: { Inf: 7, WP: 6, Fel: -2 },
          align: { dogmatic: 7 }
        },
        fail: {
          text: "좌천된 귀족의 가문이 상급 부서에 항의 서한을 보내며 한동안 정치적 견제를 받게 되었다.",
          stats: { Inf: -4, WP: 4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "귀족 참모들의 신경전에 휘말리지 않고, 실무 능력이 검증된 평민 출신 하급 장교·서기들을 따로 발탁해 독자 실무 라인을 꾸린다",
        effect: {
          text: "겉치레 회의는 짧게 끝내고 진짜 일할 사람들과 현장을 장악했다. 압도적인 실적이 가장 빠른 복수다.",
          stats: { Int: 4, Fel: 5, Inf: 3 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Gaunt's Ghosts / Imperium Maledictum / Battlefleet Gothic"
  },
  {
    id: "ev_s24_orig_04",
    title: "하이브 십일조 강제 징집령 — 봉쇄된 작업장 출구",
    category: "계급 운명",
    once: true,
    req: {
      minAge: 16,
      maxAge: 34,
      anyWorldTags: ["hive", "industrial"],
      anyCareers: ["menial_worker", "underhive_ganger"],
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeHabitats: ["void"],
      excludeTags: [
        "noble", "terra_elite", "heretic", "chaos_aligned",
        "astartes", "custodes", "grey_knight", "mechanicus",
        "navigator", "imperial_knight", "sororitas", "assassin", "living_saint"
      ]
    },
    reqLabel: "16~34세 · 하이브/공업 행성 노동자·갱단원",
    weight: 30,
    text: "야간 교대가 끝나기 무섭게 아뎁투스 아르비테스 진압대와 데파르트멘토 무니토룸 징집 서기들이 작업장 구역의 모든 철문을 봉쇄했다. 확성기에서 기계적인 음성이 울려 퍼진다. '행성 병력 십일조 미달로 본 구역의 건장한 인원을 즉각 아스트라 밀리타룸 보충 연대로 강제 징발한다! 저항 시 즉결 처분한다!'",
    choices: [
      {
        label: "도망쳐 봐야 갈 곳도 없다. 징집 대열에 당당히 걸어 들어가 제식 라스건을 받아 든다",
        effect: {
          text: "그날 밤 수송선 화물칸에 실려 궤도로 올라갔다. 공장 쇠사슬은 벗었으나 이제 은하계 전선의 포화가 그대를 기다린다.",
          forceCareer: "astra_militarum",
          addTags: ["militarum", "imperial_military"],
          stats: { BS: 4, WS: 4, T: 4, WP: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[민첩 판정] 용광로 고압 증기 밸브를 열어 시야를 가린 뒤 교대 인부 무리에 섞여 봉쇄선을 빠져나간다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "자욱한 백색 증기가 작업장 출구를 삼키는 틈에 야간 교대 인부들의 작업복으로 갈아입고 봉쇄선을 감쪽같이 빠져나왔다! 며칠간 하층 돔에 몸을 숨겨야 했지만 자유만은 지켰다.",
          stats: { Ag: 6, WP: 3, Inf: -2 },
          addTags: ["streetwise"]
        },
        fail: {
          text: "증기가 걷히기도 전에 진압대의 열감지 오스펙스에 덜미를 잡혀 쇼크 마울 세례를 맞고 결국 징집 수송선에 떠밀려 실렸다!",
          forceCareer: "astra_militarum",
          addTags: ["militarum", "imperial_military"],
          wounds: -18,
          stats: { T: 3, Inf: -3 }
        }
      },
      {
        label: "[교섭 판정] 언더하이브 인력 중개인에게 웃돈을 찔러 위조된 용광로 전출 대장에 이름을 올려 징집을 피한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "암시장 인력 중개인이 즉석에서 위조한 공업 지구 전출 대장과 타 구역 교대 인식표 덕분에 징집 명단에서 이름이 빠졌다! 주머니는 털렸지만 작업장 자리와 목숨을 건졌다.",
          stats: { Fel: 6, Int: 4 },
          align: { ruthless: 5 }
        },
        fail: {
          text: "중개인은 위조 전출 대장을 넘겨주는 대가로 언더하이브 고리대금 상단 앞으로 터무니없는 채무 증서를 떠넘겼다! 징집은 면했으나 무거운 빚의 사슬에 묶였다.",
          stats: { Inf: -4, Fel: 2 },
          addTags: ["imperial_debt"],
          align: { ruthless: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Necromunda / Imperium Maledictum"
  },
  {
    id: "ev_s24_orig_05",
    title: "언더하이브 14세의 갈림길 — 쇠파이프, 공장, 혹은 징병소",
    category: "초년기 통과 의례",
    once: true,
    req: {
      minAge: 14,
      maxAge: 18,
      anyOriginClasses: ["underclass"],
      anyCareers: ["menial_worker", "underhive_ganger"],
      anyWorldTags: ["hive", "industrial"],
      excludeHabitats: ["void"],
      excludeWorlds: ["mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "14~18세 · 하이브/공업 행성 하층민 출신 노동자·갱단원",
    weight: 36,
    text: "열네 살을 넘긴 언더하이브의 아이에게 유예 기간은 없다. 유독 폐수가 고인 웅덩이 건너편에는 쇠파이프를 두드리며 구역을 나누는 갱단 선배들이, 철교 너머에는 매연을 뿜는 매뉴팩토룸 출근 행렬이, 그리고 구역 모퉁이에는 행성 방위군 모병 포스터가 나란히 시야에 들어온다. 어떤 생존 방식을 택하든 첫발이 평생을 가를 것이다.",
    choices: [
      {
        label: "[백병 판정] 녹슨 쇠파이프를 고쳐 쥐고 하층 구역의 거친 서열 싸움 속에서 스스로 자리를 따낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "턱뼈가 얼얼한 난투 끝에 구역 무법자들이 그대의 이름을 기억하게 되었다. 밑바닥에서는 주먹이 곧 법이다.",
          stats: { WS: 6, Ag: 4, T: 3 },
          addTags: ["streetwise"],
          align: { ruthless: 6 }
        },
        fail: {
          text: "선배 갱단원들에게 호되게 얻어맞고 배급표를 빼앗겼으나, 다음엔 지지 않을 요령을 몸으로 익혔다.",
          wounds: -12,
          stats: { T: 4, WS: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[강인 판정] 불법의 유혹을 뿌리치고 매뉴팩토룸의 고된 정식 교대 할당을 악착같이 채워 기술공의 길을 밟는다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "손바닥에 굳은살이 배기고 쇳가루에 기침하면서도 끝내 정식 작업 기록을 인정받았다. 정직한 땀이 작은 발판이 되었다.",
          stats: { T: 6, Int: 4, WP: 3 },
          align: { humane: 5 }
        },
        fail: {
          text: "열여섯 시간 연속 노역 끝에 탈진해 감독관에게 벌점을 받았으나, 꺾이지 않는 근성만은 남았다.",
          wounds: -10,
          stats: { T: 3, WP: 2 }
        }
      },
      {
        label: "행성 방위군 모병소 앞에 서서 낡은 제식 훈련 교본을 받아 들며 군인의 길로 몸을 단련한다",
        effect: {
          text: "당장 차출되진 않더라도 모병관에게 기초 제식과 사격 자세를 익히며 언더하이브 밖으로 나갈 준비를 시작했다.",
          stats: { BS: 4, WP: 4, T: 2 },
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Necromunda Core Rulebook / Imperium Maledictum"
  },
  {
    id: "ev_s24_orig_06",
    title: "의절한 귀족의 생존기 — 진흙 바닥의 첫 임금",
    category: "계급 낙차",
    once: true,
    req: {
      minAge: 18,
      maxSocialTier: "common",
      allTags: ["disowned_noble"],
      anyCareers: ["menial_worker", "underhive_ganger", "guild_artisan", "pdf_trooper"],
      excludeTags: [
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra"
      ]
    },
    reqLabel: "18세+ · 의절한 귀족 · 노동자·갱단·장인·방위군",
    weight: 38,
    leadVariants: [
      {
        req: { anyHabitats: ["void"] },
        lead: "성간 함선의 기름때 낀 하층 기관 구역에서 일당을 정산받고 나오던 길, 화물 승강기 앞에서 옛 가문 사교계 시절 안면이 있던 상단 귀족과 마주쳤다."
      },
      {
        req: { excludeHabitats: ["void"] },
        lead: "진흙과 석탄재가 엉겨 붙은 작업장 출구에서 보잘것없는 일당 동전을 받아 쥐던 찰나, 호위병을 대동하고 지나가던 옛 사교계 지인과 눈이 마주쳤다."
      }
    ],
    text: "한때 비단 장갑만 끼고 살던 손등에는 이제 굳은살과 화상 흉터가 가득하다. 옛 지인은 그대의 초라한 작업복과 손바닥의 땀때를 위아래로 훑더니, 주변 평민들이 들으라는 듯 조롱 섞인 웃음을 터뜨렸다. '세상에, 가문에서 쫓겨나더니 이제는 보잘것없는 품삯 몇 푼이나 벌려고 허리를 숙이는 신세가 되었구려?'",
    choices: [
      {
        label: "[교섭 판정] 비웃음에 흔들리지 않고 옛 사교계에서 익힌 날카로운 화술로 상대 가문의 최근 약점을 우아하게 되받아친다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "낡은 작업복 차림에도 품격과 위엄이 서려 있자 지인의 얼굴이 벌겋게 달아올랐다! 지켜보던 동료들마저 통쾌하게 휘파람을 불었다.",
          stats: { Fel: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "감정만 앞선 말대꾸가 되어 호위병들의 비웃음을 샀으나, 자존심만은 끝내 굽히지 않았다.",
          stats: { WP: 3, Inf: -2 }
        }
      },
      {
        label: "[강인 판정] 모욕을 한 귀로 흘려보내고 두 배 몫의 중노동 화물을 거뜬히 들어 올려 스스로 서는 힘을 증명한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "더 이상 가문의 이름 따위에 기대지 않는 단단한 몸과 마음이 증명되었다! 현장 감독과 동료들이 그대를 진짜 식구로 인정했다.",
          stats: { T: 6, WS: 4, WP: 5 },
          align: { humane: 5 }
        },
        fail: {
          text: "무리하게 짐을 들다 허리를 삐끗하며 조롱거리가 되었지만, 스스로 벌어들인 임금의 무게를 뼈저리게 깨달았다.",
          wounds: -12,
          stats: { T: 3, WP: 3 }
        }
      },
      {
        label: "쓸데없는 충돌을 피하고 동전 주머니를 챙겨 묵묵히 자기 숙소로 돌아간다",
        effect: {
          text: "과거의 이름은 이미 죽었다. 지금 중요한 것은 내일도 살아남아 스스로의 힘으로 길을 여는 것이다.",
          stats: { WP: 5, Int: 3 }
        }
      }
    ],
    source: "Dark Heresy 2e: Highborn / Imperium Maledictum"
  },
  {
    id: "ev_s24_orig_07",
    title: "옛 가문의 비밀 밀서 — 조건부 복권인가 완전한 결별인가",
    category: "계급 낙차",
    once: true,
    req: {
      minAge: 22,
      allTags: ["disowned_noble"],
      excludeTags: [
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra",
        "assassin", "sororitas", "mechanicus"
      ]
    },
    reqLabel: "22세+ · 의절한 귀족",
    weight: 36,
    text: "한밤중, 문틈 아래로 익숙한 붉은 가문 인장이 찍힌 밀랍 봉투가 밀려 들어왔다. 가주 대리인이 보낸 비밀 사절의 제안이었다. 경쟁 가문의 회계 장부를 훔치거나 불미스러운 증인을 침묵시키는 더러운 뒷일을 한 번만 처리해 주면, 의절을 철회하고 가문의 성씨와 막대한 연금을 되돌려 주겠다는 조건이다.",
    choices: [
      {
        label: "[의지 판정] 사절이 지켜보는 앞에서 촛불로 가문의 밀랍 인장을 태워 버리고 완전한 결별을 선언한다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "불꽃 속에서 과거의 미련이 재로 흩어졌다. 어떤 회유와 협박에도 흔들리지 않는 강철 같은 자립심이 그대의 영혼에 각인되었다!",
          stats: { WP: 8, Inf: 6, Fel: 4 },
          addTags: ["iron_nerves"],
          removeTags: ["shell_shocked"],
          align: { humane: 8 }
        },
        success: {
          text: "사절은 놀란 눈빛을 남긴 채 물러났다. 가문의 울타리는 영영 닫혔지만 이제 그대는 온전히 스스로의 주인이다.",
          stats: { WP: 6, Inf: 4, Fel: 3 },
          align: { humane: 6 }
        },
        fail: {
          text: "분노한 가문이 보낸 청부업자들의 위협을 피하느라 부상을 입었으나, 끝내 무릎 꿇지 않았다.",
          wounds: -14,
          stats: { WP: 4, WS: 3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 사절의 은밀한 제안서 자체를 역이용해 더러운 일은 거절하면서도 입막음 자금과 불간섭 보장만 챙긴다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "치밀한 역협상에 당황한 가문 집사가 상당한 자금과 불간섭 각서를 남기고 철수했다! 가문의 족쇄 없이 실리만 거머쥐었다.",
          stats: { Int: 7, Inf: 7, Fel: 4 },
          align: { ruthless: 6 }
        },
        fail: {
          text: "역협상이 틀어지며 가문의 은밀한 방해 공작으로 한동안 입지가 좁아졌다.",
          stats: { Inf: -4, Int: 2 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "조건을 받아들여 가문의 더러운 뒷일을 조용히 처리하고 복권 자금과 인맥 일부를 되찾는다",
        effect: {
          text: "어둠 속에서 가문의 약점을 덮어 주었다. 의절의 낙인이 완전히 지워지진 않았으나 두둑한 자금과 상류층 인맥의 끈이 다시 이어졌다.",
          stats: { Inf: 8, Fel: 3 },
          corruption: 4,
          faith: -4,
          align: { ruthless: 9 }
        }
      }
    ],
    source: "Dark Heresy 2e / Warhammer Crime"
  },
  {
    id: "ev_s24_orig_08",
    title: "크리그 14세 신병의 첫 실탄 참호 배치",
    category: "크리그 연대",
    once: true,
    req: {
      minAge: 14,
      maxAge: 16,
      anyHomeWorlds: ["krieg"],
      anyCareers: ["astra_militarum"],
      excludeHabitats: ["void"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "14~16세 · 크리그 출신 아스트라 밀리타룸 보병",
    weight: 38,
    text: "지하 훈련소에서 실탄 검정을 마친 열네 살 지정 번호 신병으로 첫 공성 전선에 투입되었다. 아군 어스쉐이커 공성포의 굉음이 진흙 참호 벽면을 흔들고, 방독면 렌즈 위로 유독 연무와 빗물이 엉겨 붙는다. 전방 80미터 적 기관총좌를 향해 선임 워치마스터가 침착히 호루라기를 입에 물었다.",
    choices: [
      {
        label: "[강인 판정] 방독면 필터를 조이고 포탄 구덩이 사이를 묵묵히 포복해 최선두 공성 참호를 굴착한다",
        check: { stat: "T", diff: 0 },
        critSuccess: {
          text: "지근탄 폭풍과 유독 안개 속에서도 야전삽을 한 번도 놓지 않고 적 철조망 20미터 앞까지 돌파구를 열어 냈다! 선임 장교가 척탄병 예비 명단에 그대의 번호를 새겼다.",
          stats: { T: 7, WP: 6, WS: 4 },
          addTags: ["krieg_grenadier"],
          align: { dogmatic: 9 }
        },
        success: {
          text: "흔들림 없는 속도로 엄폐 참호를 완성해 후속 소대의 사상률을 절반으로 낮췄다. 속죄의 첫걸음이었다.",
          stats: { T: 5, WP: 5 },
          faith: 5,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "지근탄 파편이 철모와 어깨를 찢었으나 의무 보고 없이 붕대만 감고 삽질을 마쳤다.",
          wounds: -16,
          stats: { T: 4, WP: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[사격 판정] 루시우스 패턴 라스건의 출력을 최대치로 맞춰 적 기관총좌의 사격구 틈새를 정밀 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "뜨거운 적열 사격이 적 사수를 침묵시키며 돌격 분대가 적 벙커에 진입할 틈을 열었다!",
          stats: { BS: 7, WP: 4, Inf: 3 },
          align: { dogmatic: 6 }
        },
        fail: {
          text: "과열된 총열을 다루다 손등에 화상을 입고 반격탄 파편에 스쳤으나 교전 위치를 끝까지 지켰다.",
          wounds: -14,
          stats: { BS: 3, T: 3 }
        }
      },
      {
        label: "지정 번호를 복창하고 교본대로 전사한 선임의 라스건과 예비 방독면 필터를 회수해 보급선을 유지한다",
        effect: {
          text: "크리그의 신병에게 두려움이나 사사로운 감정은 사치다. 장비를 회수하고 묵묵히 다음 돌격 호루라기를 기다렸다.",
          stats: { WP: 5, T: 3, Int: 2 },
          faith: 4,
          align: { dogmatic: 7 }
        }
      }
    ],
    source: "Imperial Armour: Siege of Vraks / Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ev_s24_orig_09",
    title: "스콜라 생도와 상층 귀족의 자존심 충돌",
    category: "계급 충돌",
    once: true,
    req: {
      minAge: 19,
      anyOriginClasses: ["schola", "noble", "high_noble"],
      excludeHabitats: ["void"],
      excludeTrees: ["civil", "officio_assassinorum", "chaos"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "living_saint", "high_lord_terra", "heretic", "chaos_aligned", "daemon_prince",
        "assassin", "streetwise"
      ]
    },
    reqLabel: "19세+ · 스콜라 프로제니움/귀족 출신 (제국 공직·군사)",
    weight: 32,
    leadVariants: [
      {
        req: { anyOriginClasses: ["schola"] },
        lead: "스콜라 프로제니움의 엄혹한 규율과 채찍 아래 자란 그대에게, 화려한 가문 문장을 앞세워 회의장에 지각한 귀족 출신 동기들의 오만한 태도는 참기 힘든 모독이었다."
      },
      {
        req: { anyOriginClasses: ["high_noble"] },
        lead: "테라 상류 가문의 품격과 인맥으로 브리핑에 참석한 그대 앞에서, 스콜라 프로제니움 출신 고아 장교가 가문의 배경을 노골적으로 깎아내리며 대립각을 세웠다."
      },
      {
        req: { anyOriginClasses: ["noble"] },
        lead: "행성 유력 가문의 명예를 짊어지고 합동 브리핑에 나선 그대에게, 스콜라 프로제니움 출신 동료가 '핏줄이 아니라 오직 복종과 실적만 인정한다'며 싸늘하게 맞섰다."
      }
    ],
    text: "합동 주둔지 작전·행정 브리핑 도중, 보급 우선순위와 지휘 절차를 둘러싸고 스콜라 프로제니움 출신 파벌과 귀족 가문 출신 파벌의 자존심이 정면으로 충돌했다. 회의장 안에는 날 선 침묵이 감돌고, 상급 감찰관이 양측의 대처를 예의주시하고 있다.",
    choices: [
      {
        label: "[의지 판정] 황제 폐하 앞에서는 출신보다 오직 임무 완수와 충성뿐임을 단호히 선포해 논쟁의 중심을 장악한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "흔들림 없는 신념과 규율 앞에 양측 모두 할 말을 잃었다! 상급 감찰관이 진정한 제국 엘리트의 자세라며 그대의 손을 들어 주었다.",
          stats: { WP: 6, Inf: 6, Fel: 3 },
          faith: 5,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "지나치게 경직된 발언이 상대 파벌의 집단 반발을 불러 회의가 파행으로 끝났다.",
          stats: { Inf: -3, WP: 3 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[교섭 판정] 스콜라의 현장 규율과 귀족 가문의 물류 후원망을 맞물린 절충안을 제시해 양측의 체면을 모두 세운다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "갈등하던 두 파벌이 의외의 협력을 이끌어 냈다! 그대의 조율 능력 덕분에 양쪽 모두에게 두터운 신뢰를 얻었다.",
          stats: { Fel: 7, Int: 5, Inf: 6 },
          align: { humane: 6 }
        },
        fail: {
          text: "양쪽 모두에게 기회주의자라는 눈총을 사며 어색하게 물러나야 했다.",
          stats: { Fel: -2, Inf: -2, Int: 2 }
        }
      },
      {
        label: "불필요한 자존심 싸움에서 한 발 물러서서 맡은 실무 보고서만 완벽히 제출하고 회의를 마친다",
        effect: {
          text: "소리 높여 다투는 자들 사이에서 묵묵히 숫자와 사실로 실력을 증명했다. 감찰관의 기록표에 조용히 가산점이 붙었다.",
          stats: { Int: 5, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Schola Progenium / Dark Heresy 2e: Highborn"
  },
  {
    id: "ev_s24_orig_10",
    title: "군인 가문의 낡은 연대기와 선조의 계급장",
    category: "출신 유산",
    once: true,
    req: {
      minAge: 16,
      maxCareerTier: 3,
      anyOriginClasses: ["military_caste"],
      anyTrees: ["militarum", "commissariat", "navy"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "16세+ · 군인 가문 출신 · 밀리타룸/커미사르/네이비(Tier 3 이하)",
    weight: 32,
    leadVariants: [
      {
        req: { anyHabitats: ["void"] },
        lead: "성간 순양함의 좁은 선실 서랍에서, 삼 대째 함대와 전선을 누빈 선조의 황동 계급장과 낡은 군무 연대기를 꺼내 들었다."
      },
      {
        req: { excludeHabitats: ["void"] },
        lead: "출격을 앞둔 야전 막사 구석에서, 삼 대째 제국군에 피를 바쳐 온 가문의 낡은 연대기와 흠집 난 황동 계급장을 손바닥에 올려놓았다."
      }
    ],
    text: "성계 전역이 코앞으로 다가온 전야, 곁의 신참 대원들은 극도의 긴장에 휩싸여 숨을 죽이고 있다. 낡은 연대기 마지막 장에는 '황제의 방패는 피로 이어진다'는 선대 무관의 필체가 선명하다. 선조의 명예를 잇는 동시에 눈앞의 치명적인 전역을 돌파할 각오를 다져야 할 순간이다.",
    choices: [
      {
        label: "[의지 판정] 선조의 황동 계급장을 가슴에 달고 흔들리는 신참들 앞에서 삼 대의 전훈을 읊어 사기를 끌어올린다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "군인 가문의 묵직한 기백이 부대 전체로 번져 나갔다! 다가온 격전에서 그대와 함께한 전우들은 단 한 발자국도 물러서지 않았다.",
          stats: { WP: 6, Fel: 6, Inf: 5 },
          faith: 5,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "지나친 부담감 속에 앞장섰다가 적 포격 파편에 스쳤으나, 끝내 선조의 계급장을 부끄럽게 하진 않았다.",
          wounds: -14,
          stats: { WP: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 선조가 남긴 낡은 전역 기록에서 적의 기동 습관과 보급 약점에 관한 실전 교훈을 추려 작전에 반영한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "오래된 연대기 속 세밀한 전술 메모가 실전에서 그대로 들어맞았다! 지휘관이 그대의 뛰어난 전술 안목을 극찬했다.",
          stats: { Int: 7, BS: 4, Inf: 5 }
        },
        fail: {
          text: "시대와 전장이 달라져 옛 전법이 어긋나며 고전했으나, 임기응변으로 전열을 수습했다.",
          wounds: -10,
          stats: { Int: 3, T: 2 }
        }
      },
      {
        label: "선조의 연대기를 조용히 군낭 깊숙이 넣고, 헛된 영웅심 대신 차가운 규율과 생존에만 집중한다",
        effect: {
          text: "살아남아야 가문의 다음 장도 쓸 수 있다. 차분히 무기를 점검하며 출격 신호를 기다렸다.",
          stats: { T: 4, BS: 3, WP: 3 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War Core / Battlefleet Gothic"
  }
];
