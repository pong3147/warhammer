// 분기 사건 — 후천 특성 12종(긍정 6 · 부정 6) 획득·극복·승화·대가 아크 (14종)
export default [
  {
    id: "ev_s21_at_01",
    title: "포화 속의 침묵 — 공포의 임계선",
    category: "후천 특성",
    once: true,
    req: {
      minAge: 16,
      anyRealms: ["military", "void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["iron_nerves", "shell_shocked", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince"]
    },
    reqLabel: "16세 이상 · 군사/함대 복무 필멸자 · 크리그/야만 행성 제외 · 강철의 신경/포탄 충격 미보유",
    weight: 34,
    text: "대지를 뒤흔드는 중포격과 궤도 강습선의 굉음이 연달아 참호와 방벽을 두드렸다. 먼지와 파편이 비처럼 쏟아지는 가운데 통신망마저 잡음에 묻혔고, 주변 병력들의 숨결이 거칠게 흔들리기 시작했다. 한 번 공황에 삼켜지면 다시는 고개를 들지 못할 극한의 압박 속에서, 이 포화의 소용돌이를 어떻게 버텨 낼지 결단해야 한다.",
    choices: [
      {
        label: "[의지 판정] 포탄이 꽂히는 굉음 속에서 호흡을 고정하고 전선의 중심을 붙든다",
        check: { stat: "WP", diff: -10 },
        critSuccess: {
          text: "지축을 울리는 폭발이 지근거리에서 터졌으나 눈꺼풀조차 떨리지 않았다. 공포의 한계를 완전히 부수고 나자, 어떤 전장의 굉음에도 흔들리지 않는 강철의 신경이 몸에 각인되었다.",
          stats: { WP: 7, Inf: 4 },
          faith: 5,
          addTags: ["iron_nerves"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "떨리는 손끝을 억누르며 끝까지 자리를 지켰다. 귓가를 찢는 포성 속에서도 냉정을 되찾으며 한층 단단해진 정신력을 얻었다.",
          stats: { WP: 5, T: 2 },
          addTags: ["iron_nerves"],
          align: { dogmatic: 4 }
        },
        fail: {
          text: "연이은 충격파가 고막과 신경을 찢어 놓으며 방벽 아래로 몸을 웅크리게 만들었다. 폭격이 멎은 뒤에도 귓가의 이명과 갑작스러운 발작적 경련이 쉽게 가시지 않았다.",
          wounds: -12,
          stats: { WP: -3 },
          addTags: ["shell_shocked"]
        },
        critFail: {
          text: "바로 옆 방벽을 날려 버린 직격탄의 충격파에 휩쓸려 의식이 끊어졌다 깨어났다. 목숨은 건졌으나 신경 계통에 깊은 외상이 남아, 작은 폭발음에도 몸이 먼저 굳어 버리는 포탄 충격에 시달리게 되었다.",
          wounds: -20,
          stats: { WP: -5, Ag: -2 },
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "[강인 판정] 방호 엄폐물 밑에서 파편을 몸으로 막아 내며 부상자들을 끌어당긴다",
        check: { stat: "T", diff: -5 },
        critSuccess: {
          text: "쏟아지는 쇄석과 파편을 정면으로 받아 내면서도 동료들을 끝까지 엄호했다. 극한의 고통을 이겨 낸 육체와 정신이 하나로 굳어지며 강철의 신경을 얻었다.",
          stats: { T: 5, WP: 5 },
          addTags: ["iron_nerves"],
          align: { humane: 7 }
        },
        success: {
          text: "무거운 파편에 어깨를 긁히면서도 끝내 대열을 지켜 냈다. 지독한 포격 속에서 살아남은 경험이 뼈에 새겨졌다.",
          wounds: -6,
          stats: { T: 4, WP: 3 },
          align: { humane: 5 }
        },
        fail: {
          text: "지속되는 진동과 파편 세례 속에 신경이 한계까지 깎여 나갔다. 겨우 버텨 냈으나 밤마다 포성이 환청으로 되살아나는 후유증이 남았다.",
          wounds: -14,
          stats: { WP: -2 },
          addTags: ["shell_shocked"]
        }
      },
      {
        label: "대피 수칙에 따라 2선 참호로 몸을 낮추고 포격이 멎기를 기다린다",
        effect: {
          text: "무모하게 전면을 고집하지 않고 방호벽 깊숙이 몸을 피해 치명적인 충격파를 비껴갔다. 커다란 공적은 없었으나 온전한 정신과 체력을 보존해 다음 교전을 기약했다.",
          stats: { T: 2, WP: 1 },
          wounds: -4
        }
      }
    ],
    source: "Only War / Codex: Astra Militarum"
  },
  {
    id: "ev_s21_at_02",
    title: "칼날의 찰나 — 무명 검객과의 사생결단",
    category: "후천 특성",
    once: true,
    req: {
      minAge: 16,
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["blade_master", "crippled_limb", "ogryn"]
    },
    reqLabel: "16세 이상 · 비야만 행성 · 드레드노트/악마/오그린 제외 · 검성의 경지/불구 미보유",
    weight: 34,
    text: "피와 쇠 냄새가 진동하는 좁은 통로 끝에서 흉포한 검기를 뿜어내는 적의 정예 결투자들과 마주쳤다. 총탄을 재장전할 틈조차 없는 초근접 거리에서, 상대의 무기가 공기를 가르며 목덜미를 향해 쇄도한다. 단 한 번의 합으로 생사와 검술의 경지가 갈리는 찰나가 찾아왔다.",
    choices: [
      {
        label: "[백병 판정] 정면으로 한 걸음 파고들어 상대의 빈틈을 단칼에 꿰뚫는다",
        check: { stat: "WS", diff: -12 },
        critSuccess: {
          text: "상대의 검날이 미처 궤적을 완성하기도 전에 완벽한 각도로 검격을 흘려보내고 급소를 정확히 꿰뚫었다. 육체와 검이 완전히 하나가 된 그 찰나를 계기로 검성의 경지에 도달했다.",
          stats: { WS: 8, Ag: 4, Inf: 4 },
          addTags: ["blade_master"],
          align: { dogmatic: 5 }
        },
        success: {
          text: "불꽃이 튀는 연격 끝에 상대의 호신을 무너뜨리고 승리를 거머쥐었다. 극한의 대결을 거치며 검끝의 예리함이 한 차원 높아졌다.",
          stats: { WS: 6, Ag: 3 },
          addTags: ["blade_master"]
        },
        fail: {
          text: "미세한 찰나에 보법이 엉키며 적의 반격이 팔다리를 깊게 스쳐 지나갔다. 상대는 물러났으나 찢어진 힘줄과 부서진 관절은 쉬이 아물지 않을 깊은 불구로 남았다.",
          wounds: -16,
          stats: { WS: -2, Ag: -3 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "무리한 일격이 빗나가며 적의 육중한 칼날에 다리와 어깨 관절을 정통으로 베이고 말았다! 간신히 목숨만 건져 후송되었으나 영구적인 불구의 상흔을 피할 수 없었다.",
          wounds: -24,
          stats: { WS: -4, Ag: -4 },
          addTags: ["crippled_limb"]
        }
      },
      {
        label: "[민첩 판정] 빠른 보법으로 거리를 벌리며 기습적인 반격 각을 노린다",
        check: { stat: "Ag", diff: -8 },
        critSuccess: {
          text: "벽면을 박차고 도약해 적의 사각으로 파고들며 치명적인 일격을 꽂아 넣었다. 물 흐르는 듯한 기동과 검술의 조화가 검성의 경지를 열어젖혔다.",
          stats: { Ag: 6, WS: 5 },
          addTags: ["blade_master"]
        },
        success: {
          text: "날카로운 공세를 유연하게 흘려보내고 상대의 균형을 무너뜨려 제압했다. 부상 없이 근접 감각을 크게 끌어올렸다.",
          stats: { Ag: 4, WS: 4 }
        },
        fail: {
          text: "피하는 동작이 반 박자 늦어 발목에 깊은 자상을 입었다. 응급 처치를 마쳤으나 다리를 절뚝이는 후유증이 깊게 남았다.",
          wounds: -14,
          stats: { Ag: -3 },
          addTags: ["crippled_limb"]
        }
      },
      {
        label: "견고한 방어 자세를 유지한 채 아군 엄호 사격권까지 천천히 물러난다",
        effect: {
          text: "무리한 일기토에 말려들지 않고 방패와 무기를 세워 거리를 유지하며 안전하게 후퇴했다. 경미한 찰과상은 입었으나 사지는 온전히 보전했다.",
          wounds: -5,
          stats: { WS: 2, T: 2 }
        }
      }
    ],
    source: "Dark Heresy / Wrath & Glory"
  },
  {
    id: "ev_s21_at_03",
    title: "아지랑이 너머의 조준선 — 워프 폭풍 속의 저격전",
    category: "후천 특성",
    once: true,
    req: {
      minAge: 16,
      excludeHabitats: ["void"],
      excludeWorldTags: ["feral"],
      excludeTrees: ["civil", "administratum", "governor", "ecclesiarchy"],
      excludeBodyClasses: ["dreadnought", "daemonic"],
      excludeTags: ["deadeye_marksman", "warp_scarred", "custodes", "grey_knight", "living_saint", "blank", "omega_pariah", "ogryn", "high_lord_terra"]
    },
    reqLabel: "16세 이상 · 비야만 행성 · 비민간/비하이로드 · 드레드노트/악마/오염면역/무혼/오그린 제외 · 명사수/워프 흉터 미보유",
    weight: 32,
    text: "기이한 보랏빛 아지랑이와 정전기 폭풍이 시야를 일그러뜨리는 폐허 건너편에서 적의 지휘관과 악마술사가 모습을 드러냈다. 이성적인 탄도 계산을 비웃듯 대기 자체가 미세하게 일렁이는 가운데, 단 한 발로 적의 심장부를 꿰뚫을지 아니면 기이한 반동을 감수할지 결정해야 한다.",
    choices: [
      {
        label: "[사격 판정] 일그러진 대기의 굴절까지 계산에 넣어 장거리 정밀 사격을 감행한다",
        check: { stat: "BS", diff: -12 },
        critSuccess: {
          text: "현실의 왜곡마저 꿰뚫는 완벽한 한 발이 천 미터 밖 표적의 미간을 정확히 관통했다! 적진이 일순간에 붕괴했으며, 사격술의 정점인 백발백중 명사수의 감각을 완전히 체득했다.",
          stats: { BS: 8, Int: 3, Inf: 4 },
          addTags: ["deadeye_marksman"]
        },
        success: {
          text: "흔들리는 조준경 속에서 한 박자 숨을 고른 뒤 방아쇠를 당겨 핵심 표적을 쓰러뜨렸다. 극한의 악조건을 이겨 낸 명중으로 백발백중 명사수로 거듭났다.",
          stats: { BS: 6, WP: 2 },
          addTags: ["deadeye_marksman"]
        },
        fail: {
          text: "총구가 불을 뿜는 순간 기이한 워프 돌풍이 역류하며 조준경과 이마를 강타했다. 탄환은 빗나갔고, 푸르스름한 발광이 스민 워프 흉터가 시야 한쪽에 깊게 각인되었다.",
          wounds: -10,
          corruption: 6,
          addTags: ["warp_scarred"]
        },
        critFail: {
          text: "기이한 에너지 역류가 총열을 타고 안면으로 폭발했다! 극심한 화상과 함께 워프의 기운이 살갗 아래로 스며들어 지워지지 않는 워프 흉터를 남겼다.",
          wounds: -18,
          corruption: 10,
          stats: { BS: -3 },
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "[지성 판정] 풍향과 왜곡 주기를 분석해 교차 사격의 오차 범위를 좁힌다",
        check: { stat: "Int", diff: -5 },
        critSuccess: {
          text: "대기 왜곡이 가라앉는 0.3초의 주기를 정확히 포착해 두 발을 연달아 꽂아 넣었다. 이성과 사격술이 맞물리며 백발백중 명사수의 경지에 올랐다.",
          stats: { Int: 5, BS: 5 },
          addTags: ["deadeye_marksman"]
        },
        success: {
          text: "치밀한 계산으로 적 저격수의 위치를 역추적해 사격 진지를 무력화했다. 안정적인 판단력이 빛난 교전이었다.",
          stats: { Int: 4, BS: 3 }
        },
        fail: {
          text: "수치를 계산하던 찰나 저편의 사악한 주술이 역탐지되어 정신을 찔렀다. 기분 나쁜 이명과 함께 피부 위로 기괴한 워프 흉터가 번졌다.",
          corruption: 5,
          wounds: -8,
          addTags: ["warp_scarred"]
        }
      },
      {
        label: "조준 사격을 접고 엄폐물을 따라 이동하며 연막으로 시야를 차단한다",
        effect: {
          text: "기괴한 워프 아지랑이 속 무리한 교전을 피하고 부대와 합류해 전열을 정비했다. 눈에 띄는 전과는 없었으나 위험한 후유증을 피했다.",
          stats: { Ag: 2, WP: 1 }
        }
      }
    ],
    source: "Gaunt's Ghosts / Codex: Astra Militarum"
  },
  {
    id: "ev_s21_at_04",
    title: "황금 인장의 거래 — 성계 보급 협상 테이블",
    category: "후천 특성",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeWorldTags: ["feral"],
      excludeTags: ["silver_tongue", "imperial_debt", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "ogryn", "assassin", "heretic", "chaos_aligned"]
    },
    reqLabel: "18세 이상 · 충성파 필멸자(오그린/암살자 제외) · 크리그/야만 행성 제외 · 은빛 혀/거액의 채무 미보유",
    weight: 30,
    text: "성계 상업 길드와 아드미니스트라툼 회계 감사관, 그리고 욕심 많은 용병 중개인들이 얽힌 막대한 보급 계약 테이블에 불려 나왔다. 지금 여기서 유리한 조건으로 서명권을 쥐면 막대한 권세와 인맥을 얻지만, 한 번 문서의 올가미에 걸리면 평생을 바쳐도 갚지 못할 빚더미에 올라앉을 수 있다.",
    choices: [
      {
        label: "[교섭 판정] 이해관계의 빈틈을 파고드는 유려한 언변으로 협상 판을 뒤집는다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "단 몇 마디의 정교한 수사만으로 서로 으르렁대던 감사관과 길드 대표들을 완벽히 설득했다! 모든 이익이 이쪽으로 쏠리는 계약이 체결되었고, 누구든 홀리는 은빛 혀의 달인으로 이름을 높였다.",
          stats: { Fel: 7, Inf: 7 },
          addTags: ["silver_tongue"],
          align: { ruthless: 6 }
        },
        success: {
          text: "상대의 체면을 세워 주면서도 핵심 이권을 놓치지 않는 노련한 화술로 협상을 주도했다. 세련된 언변이 빛을 발하며 은빛 혀의 명성을 얻었다.",
          stats: { Fel: 5, Inf: 4 },
          addTags: ["silver_tongue"]
        },
        fail: {
          text: "무리한 호언장담이 상대의 역공에 걸려 불리한 배상 조항을 떠안고 말았다. 서류상의 위약금이 눈덩이처럼 불어나며 무거운 거액의 채무를 지게 되었다.",
          stats: { Inf: -4 },
          addTags: ["imperial_debt"]
        },
        critFail: {
          text: "계약서의 숨겨진 위약 조항을 놓친 채 서명하는 치명적인 실책을 저질렀다! 막대한 군수품 손실 책임이 고스란히 전가되어 평생을 옥죌 거액의 채무가 선고되었다.",
          stats: { Inf: -6, Fel: -2 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "[지성 판정] 두꺼운 양피지 조항을 밤새 대조해 법적 허점을 찾아낸다",
        check: { stat: "Int", diff: -5 },
        critSuccess: {
          text: "고대 제국 세법의 예외 조항을 정확히 짚어내어 상대를 꼼짝 못 하게 만들었다. 논리와 언변을 겸비한 은빛 혀로 인정받았다.",
          stats: { Int: 6, Inf: 5 },
          addTags: ["silver_tongue"],
          align: { dogmatic: 5 }
        },
        success: {
          text: "조항 속 함정을 미리 걸러내어 손해를 막고 공정한 수준의 보급 배당을 확보했다.",
          stats: { Int: 4, Inf: 3 }
        },
        fail: {
          text: "복잡한 중첩 세율 계산에 밀려 불공정한 담보 서류에 도장을 찍고 말았다. 결국 잔여 대금을 떠안은 거액의 채무가 남았다.",
          stats: { Inf: -3 },
          addTags: ["imperial_debt"]
        }
      },
      {
        label: "대규모 계약에서 물러나 소규모 정액 배당만 수용하고 자리를 뜬다",
        effect: {
          text: "큰 이권을 노리지 않고 위험한 보증 서명을 정중히 거절했다. 얻은 것은 소박했으나 빚더미에 앉을 위험은 완전히 피했다.",
          stats: { Int: 2, Fel: 1 }
        }
      }
    ],
    source: "Rogue Trader / Imperium Maledictum"
  },
  {
    id: "ev_s21_at_05",
    title: "피로 그리는 전술도 — 양동과 희생의 기로",
    category: "후천 특성",
    once: true,
    req: {
      minAge: 18,
      anyRealms: ["military", "void"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["daemonic"],
      excludeTags: ["tactician_eye", "notorious_ruthless", "ogryn"]
    },
    reqLabel: "18세 이상 · 군사/함대 복무 · 악마/오그린 제외 · 크리그/야만 행성 제외 · 전술안/냉혈한 미보유",
    weight: 34,
    text: "적의 대군이 우회로를 파고들며 방어선의 허리가 끊어질 위기에 처했다. 측면을 메울 예비대는 턱없이 부족하고, 지금 당장 전술 홀로그램 위에서 누군가는 미끼가 되어 시간을 끌거나 적의 허점을 꿰뚫는 역포위 기동을 지휘해야 한다.",
    choices: [
      {
        label: "[지성 판정] 지형과 보급선 전체를 꿰뚫는 역포위 기동으로 적의 공세를 역전시킨다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "적 지휘관의 심리와 병력 배치의 사각을 단숨에 간파해 완벽한 역포위망을 완성했다! 아군의 피해를 최소화하며 대승을 거두었고, 전장의 흐름을 읽는 백전노장의 전술안을 각성했다.",
          stats: { Int: 7, Inf: 6 },
          addTags: ["tactician_eye"],
          align: { humane: 5 }
        },
        success: {
          text: "치밀한 시간차 기동으로 적의 선봉을 고립시켜 전선을 지켜 냈다. 수많은 변수 속에서 승리 공식을 빚어내며 백전노장의 전술안을 얻었다.",
          stats: { Int: 5, Inf: 4 },
          addTags: ["tactician_eye"]
        },
        fail: {
          text: "기동이 어긋나자 본진을 살리기 위해 미끼 부대의 철수 명령을 내리지 않고 그대로 소모시키고 말았다. 전선은 지켰으나 부하들 사이에서 악명 높은 냉혈한이라는 수군거림이 퍼졌다.",
          stats: { Inf: -3, WP: 2 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 5, dogmatic: 2 }
        },
        critFail: {
          text: "예측이 빗나가며 측면을 막기 위해 후위 부대 전체를 적의 화망 속으로 내몰아 전멸시켰다! 승리는커녕 뼈아픈 오판과 비정한 명령 때문에 악명 높은 냉혈한이라는 오명이 지워지지 않게 되었다.",
          stats: { Inf: -5, Fel: -4 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 7, humane: -4 }
        }
      },
      {
        label: "[권위 판정] 직접 선두에 서서 붕괴 직전의 측면 부대를 독려해 버텨 낸다",
        check: { stat: "Inf", diff: -5 },
        critSuccess: {
          text: "압도적인 지휘 위엄으로 패주하던 병력을 다시 규합해 적의 허리를 끊어 놓았다. 현장 지휘와 대국적 안목이 어우러지며 백전노장의 전술안을 얻었다.",
          stats: { Inf: 6, WP: 4 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "무너져 내리던 전열을 가까스로 붙잡아 지원군이 도착할 때까지 전선을 유지했다.",
          stats: { Inf: 4, WP: 3 },
          align: { humane: 4 }
        },
        fail: {
          text: "병력을 통제하기 위해 즉결 처형과 강압적인 전진 명령을 남발해야 했다. 살아남은 자들의 눈빛에 공포와 원망이 서리며 악명 높은 냉혈한으로 불리게 되었다.",
          stats: { Fel: -3, WP: 2 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 4, dogmatic: 2 }
        }
      },
      {
        label: "전면 교전을 피하고 예비 거점까지 질서 있는 축차 후퇴를 지휘한다",
        effect: {
          text: "과감한 승부수 대신 2선 방어선으로 부대를 온전히 물려 피해를 줄였다. 대승은 없었으나 지휘관으로서의 최소한의 도리는 지켰다.",
          stats: { Int: 2, Inf: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Imperial Armour"
  },
  {
    id: "ev_s21_at_06",
    title: "독안개의 행군 — 정화조 너머의 생환",
    category: "후천 특성",
    once: true,
    req: {
      minAge: 16,
      excludeHabitats: ["void"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["battle_hardened", "chronic_toxins", "astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince"]
    },
    reqLabel: "16세 이상 · 필멸자 · 비야만 행성 · 백전의 생존자/만성 독소 미보유",
    weight: 34,
    text: "생화학 포탄과 부식성 포자가 자욱하게 깔린 죽음의 분지를 돌파해야 하는 강행군이 이어졌다. 여과기 수명은 바닥을 드러내고 방호복 이음새마다 시큼한 독기가 스며드는 가운데, 육체의 한계를 시험하는 잔혹한 행군을 끝까지 버텨 내야 한다.",
    choices: [
      {
        label: "[강인 판정] 타들어 가는 폐부를 다잡고 독기 한가운데를 돌파해 생환한다",
        check: { stat: "T", diff: -10 },
        critSuccess: {
          text: "살점을 에는 독가스와 피로를 온몸으로 밀어내며 선두에서 행군을 완주했다! 극한의 환경마저 튕겨 내는 강인한 체질이 완성되며 백전의 생존자로 거듭났다.",
          stats: { T: 7, WP: 4 },
          wounds: 8,
          addTags: ["battle_hardened"]
        },
        success: {
          text: "수차례 쓰러질 듯한 어지럼증을 이겨 내고 목적지까지 걸어 나왔다. 험난한 고비를 넘긴 육체가 한층 더 단단해지며 백전의 생존자가 되었다.",
          stats: { T: 5, WP: 3 },
          addTags: ["battle_hardened"]
        },
        fail: {
          text: "여과기가 깨진 틈으로 독기가 폐부 깊숙이 파고들었다. 목숨은 부지했으나 혈관에 남은 화학 물질이 만성 독소로 변해 끊임없이 체력을 갉아먹기 시작했다.",
          wounds: -14,
          stats: { T: -3 },
          addTags: ["chronic_toxins"]
        },
        critFail: {
          text: "방호복이 찢어지며 고농도 독성 웅덩이에 쓰러지고 말았다! 응급 해독제를 맞고 깨어났으나 이미 장기 깊숙이 독이 스며들어 평생 쇠약을 부르는 만성 독소에 시달리게 되었다.",
          wounds: -22,
          stats: { T: -5, Ag: -2 },
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "[의지 판정] 고통을 정신력으로 억누르며 낙오한 동료의 여과기를 나눠 끼운다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "자신의 여과기마저 떼어 주며 동료를 부축해 독안개를 돌파했다. 지옥 같은 환경에서도 꺾이지 않은 생존 본능이 백전의 생존자라는 이름으로 새겨졌다.",
          stats: { WP: 5, T: 5, Inf: 3 },
          addTags: ["battle_hardened"],
          align: { humane: 7 }
        },
        success: {
          text: "서로의 어깨를 부축하며 마침내 맑은 공기가 감도는 안전 지대에 닿았다. 숭고한 희생정신이 깊은 전우애를 남겼다.",
          stats: { WP: 4, T: 3 },
          align: { humane: 5 }
        },
        fail: {
          text: "여과기를 나눈 대가로 독성 포자에 오래 노출되고 말았다. 동료는 살렸으나 몸 안에는 지워지지 않는 만성 독소가 자리 잡았다.",
          wounds: -12,
          stats: { T: -2 },
          addTags: ["chronic_toxins"],
          align: { humane: 4 }
        }
      },
      {
        label: "고지대 우회로를 찾아 속도를 늦추고 여과기 소모를 최소화하며 이동한다",
        effect: {
          text: "정면 돌파를 포기하고 바람이 통하는 능선을 따라 조심스럽게 행군했다. 시간은 지체되었으나 치명적인 중독은 피했다.",
          wounds: -4,
          stats: { T: 2, Int: 1 }
        }
      }
    ],
    source: "Deathwatch / Imperium Maledictum"
  },
  {
    id: "ev_s21_at_07",
    title: "이명 너머의 각성 — 포탄 충격의 극복",
    category: "후천 특성 극복",
    once: true,
    req: {
      allTags: ["shell_shocked"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]
    },
    reqLabel: "포탄 충격 보유 · 필멸자 · 크리그/야만 행성 제외",
    weight: 38,
    text: "밤낮없이 귓가를 찌르던 환청과 굉음의 기억이 또다시 숨통을 조여 온다. 바로 그때, 주둔지 외곽에서 적의 기습 포격이 터지며 온 대지가 흔들렸다. 과거의 공포에 영원히 무너질 것인가, 아니면 그 트라우마를 정면으로 뚫고 다시 일어설 것인가의 시험이 닥쳤다.",
    choices: [
      {
        label: "[의지 판정] 떨리는 손을 움켜쥐고 굉음의 정체를 직시하며 공포를 정면으로 돌파한다",
        check: { stat: "WP", diff: -8 },
        critSuccess: {
          text: "과거의 악몽을 불러오던 포성이 귓가를 울리는 순간, 오히려 머릿속이 얼음처럼 차갑게 맑아졌다! 포탄 충격의 굴레를 완전히 태워 버리고 불굴의 강철 신경으로 재탄생했다.",
          stats: { WP: 8, T: 3 },
          faith: 5,
          removeTags: ["shell_shocked"],
          addTags: ["iron_nerves"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "숨 막히는 공포를 끝내 밀어내고 제자리를 지켰다. 오랫동안 시달리던 발작과 환청이 씻은 듯이 잦아들며 포탄 충격을 극복했다.",
          stats: { WP: 5, T: 2 },
          removeTags: ["shell_shocked"]
        },
        fail: {
          text: "포격 소리에 옛 악몽이 겹치며 한동안 호흡을 가누지 못했다. 목숨은 지켰으나 포탄 충격의 그림자는 여전히 짙게 남아 있다.",
          wounds: -8,
          stats: { WP: -1 }
        },
        critFail: {
          text: "극심한 공황 발작에 휩싸여 방벽 아래로 굴러떨어지고 말았다. 몸과 마음 모두에 깊은 피로가 누적되었다.",
          wounds: -14,
          stats: { WP: -3, Inf: -2 }
        }
      },
      {
        label: "전우의 손에 의지해 심호흡을 되뇌며 포격이 지나가길 버텨 낸다",
        effect: {
          text: "스스로를 다그치기보다 곁에 있는 전우의 목소리에 귀를 기울이며 발작을 진정시켰다. 완전한 치유에는 이르지 못했으나 최악의 공황은 피했다.",
          stats: { WP: 2 },
          align: { humane: 3 }
        }
      }
    ],
    source: "Only War / Dark Heresy"
  },
  {
    id: "ev_s21_at_08",
    title: "부서진 뼈를 잇는 재활 — 불구의 극복",
    category: "후천 특성 극복",
    once: true,
    req: {
      allTags: ["crippled_limb"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    reqLabel: "불구 보유 · 드레드노트/악마 제외 · 비야만 행성",
    weight: 38,
    text: "뒤틀린 관절과 삐걱거리는 상흔은 매 걸음마다 뼈아픈 고통을 일깨웠다. 기계교의 의체 시술과 의무관의 혹독한 재활 처방이 눈앞에 놓였다. 평생 반쪽짜리 몸으로 물러날 것인가, 아니면 뼈를 깎는 고통을 견뎌 내고 온전한 전사로 되돌아갈 것인가.",
    choices: [
      {
        label: "[강인 판정] 마취조차 최소한으로 줄인 채 극한의 재활 훈련과 교정 시술을 감내한다",
        check: { stat: "T", diff: -8 },
        critSuccess: {
          text: "살이 찢어지고 신경이 다시 이어지는 지옥 같은 재활을 단 한 번의 비명도 없이 버텨 냈다! 불구의 족쇄가 완전히 부서졌을 뿐 아니라, 고통을 무디게 튕겨 내는 백전의 생존자로 거듭났다.",
          stats: { T: 7, Ag: 4, WS: 3 },
          wounds: 12,
          removeTags: ["crippled_limb"],
          addTags: ["battle_hardened"]
        },
        success: {
          text: "피땀 어린 재활 끝에 굳어 있던 관절과 근육이 마침내 본래의 움직임을 되찾았다. 지독한 불구의 굴레에서 벗어났다.",
          stats: { T: 5, Ag: 3 },
          wounds: 8,
          removeTags: ["crippled_limb"]
        },
        fail: {
          text: "무리한 재활 도중 접합 부위가 다시 벌어지며 극심한 통증이 번졌다. 치료는 지연되었고 불구의 불편함도 그대로 남았다.",
          wounds: -10,
          stats: { T: -1 }
        },
        critFail: {
          text: "시술 중 극심한 거부 반응과 출혈이 발생해 긴급 봉합에 들어가야 했다. 재활은 실패로 돌아갔고 몸은 더욱 쇠약해졌다.",
          wounds: -16,
          stats: { T: -2, Ag: -2 }
        }
      },
      {
        label: "무리한 교정 대신 보조 장구와 진통 처방으로 일상의 균형을 맞춘다",
        effect: {
          text: "성급한 재활을 멈추고 신체에 맞는 보조 장구를 맞추어 일상과 기본 임무를 수행할 수 있도록 조율했다.",
          wounds: 4,
          stats: { T: 2, Int: 1 }
        }
      }
    ],
    source: "Imperium Maledictum / Rogue Trader"
  },
  {
    id: "ev_s21_at_09",
    title: "신성한 불꽃의 정화 — 워프 흉터의 극복",
    category: "후천 특성 극복",
    once: true,
    req: {
      allTags: ["warp_scarred"],
      excludeRealms: ["heretic"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["daemonic"],
      excludeTags: ["heretic", "chaos_aligned", "custodes", "grey_knight", "living_saint", "blank", "omega_pariah"]
    },
    reqLabel: "워프 흉터 보유 · 충성파(오염면역/무혼 제외) · 비야만 행성",
    weight: 38,
    text: "피부 위에 아로새겨진 기이한 워프 흉터가 밤마다 차갑게 맥동하며 불경한 속삭임을 흘려보낸다. 에클레시아키의 정화 성소와 고행의 제단 앞에서, 영혼을 좀먹는 이 낙인을 불태워 정화할 기회가 찾아왔다.",
    choices: [
      {
        label: "[의지 판정] 성수와 쇠사슬의 고행 속에서 황제의 빛으로 이단의 흉터를 불태운다",
        check: { stat: "WP", diff: -10 },
        critSuccess: {
          text: "타오르는 정화의 고통 속에서 불경한 속삭임이 단말마와 함께 소멸했다! 워프 흉터가 깨끗이 사라졌을 뿐만 아니라, 어떤 정신 오염에도 흔들리지 않는 강철의 신경이 영혼에 새겨졌다.",
          stats: { WP: 8, Inf: 3 },
          faith: 10,
          corruption: -8,
          removeTags: ["warp_scarred"],
          addTags: ["iron_nerves"],
          align: { dogmatic: 7 }
        },
        success: {
          text: "뼈를 지지는 듯한 정화 의식을 끝까지 버텨 내자, 피부 위에서 꿈틀거리던 워프의 잔재가 마침내 스러졌다. 워프 흉터를 극복하고 평온을 되찾았다.",
          stats: { WP: 5 },
          faith: 6,
          corruption: -5,
          removeTags: ["warp_scarred"]
        },
        fail: {
          text: "의식 도중 흉터가 역류하며 차가운 한기가 전신을 훑었다. 정화는 절반에 그쳤고 불길한 흉터는 여전히 남아 있다.",
          wounds: -8,
          corruption: 3
        },
        critFail: {
          text: "성소의 결계가 흔들리며 흉터에서 뿜어져 나온 사악한 기운이 정신을 난도질했다! 육체와 영혼 모두에 깊은 타격을 입고 물러나야 했다.",
          wounds: -15,
          corruption: 6,
          stats: { WP: -3 }
        }
      },
      {
        label: "축성된 붕대로 흉터를 단단히 감싸고 정결 기도문만 조용히 암송한다",
        effect: {
          text: "급격한 정화 의식 대신 매일 밤 기도문을 외우며 기운을 억누르는 길을 택했다. 당장 흉터가 사라지지는 않았으나 오염의 확산은 막았다.",
          faith: 3,
          corruption: -2
        }
      }
    ],
    source: "Dark Heresy / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s21_at_10",
    title: "혈액 정화조 — 만성 독소의 극복",
    category: "후천 특성 극복",
    once: true,
    req: {
      allTags: ["chronic_toxins"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    reqLabel: "만성 독소 보유 · 드레드노트/악마 제외 · 비야만 행성",
    weight: 38,
    text: "혈관 속을 흐르는 지독한 독기가 심장과 폐부를 옥죄며 갈수록 체력을 갉아먹고 있다. 마침내 희귀한 고순도 해독 혈청과 기계교의 전신 혈액 여과 장치에 접근할 수 있게 되었으나, 혈액을 송두리째 갈아내는 시술은 목숨을 건 도박과 같다.",
    choices: [
      {
        label: "[강인 판정] 전신 혈액 여과와 고압 해독 혈청 주입을 끝까지 버텨 낸다",
        check: { stat: "T", diff: -8 },
        critSuccess: {
          text: "혈관이 타들어 가는 듯한 전신 정화 과정을 완벽하게 이겨 냈다! 몸속의 만성 독소가 한 방울도 남김없이 씻겨 나갔을 뿐만 아니라, 독성마저 적응해 낸 강인한 육체가 백전의 생존자로 승화했다.",
          stats: { T: 7, WP: 3 },
          wounds: 14,
          removeTags: ["chronic_toxins"],
          addTags: ["battle_hardened"]
        },
        success: {
          text: "고통스러운 발열과 오한을 견뎌 내자 검붉던 혈액이 본래의 맑은 빛을 되찾았다. 오랫동안 괴롭히던 만성 독소를 완전히 몰아냈다.",
          stats: { T: 5 },
          wounds: 10,
          removeTags: ["chronic_toxins"]
        },
        fail: {
          text: "혈액 여과 도중 급격한 쇼크가 찾아와 시술을 중단해야 했다. 체내 독소를 완전히 빼내지 못한 채 쇠약함만 깊어졌다.",
          wounds: -12,
          stats: { T: -2 }
        },
        critFail: {
          text: "독소와 해독 혈청이 체내에서 충돌하며 장기가 심각한 손상을 입었다! 간신히 소생했으나 회복에만 긴 시간이 필요해졌다.",
          wounds: -18,
          stats: { T: -3, Ag: -2 }
        }
      },
      {
        label: "위험한 전신 치환 대신 약한 완화제를 복용하며 증상을 다스린다",
        effect: {
          text: "극단적인 시술을 피하고 꾸준한 약물 처방으로 고통을 누그러뜨렸다. 근본적인 독소는 남았으나 당장 쓰러질 위기는 넘겼다.",
          wounds: 5,
          stats: { T: 1 }
        }
      }
    ],
    source: "Rogue Trader / Imperium Maledictum"
  },
  {
    id: "ev_s21_at_11",
    title: "오명의 청산 — 냉혈한 낙인의 극복",
    category: "후천 특성 극복",
    once: true,
    req: {
      allTags: ["notorious_ruthless"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["custodes", "astartes", "grey_knight", "living_saint", "daemon_prince", "assassin", "dreadnought", "heretic", "chaos_aligned"]
    },
    reqLabel: "악명 높은 냉혈한 보유 · 충성파 필멸자(암살자 제외) · 크리그/야만 행성 제외",
    weight: 38,
    text: "과거의 냉혹한 결단으로 얻은 오명이 이제는 아군의 사기와 신뢰마저 갉아먹는 족쇄가 되었다. 분노와 불신이 들끓는 전선 회의장과 병영 한가운데에서, 과거의 피비린내 나는 평판을 씻어 내고 신뢰를 되찾을 마지막 기회가 찾아왔다.",
    choices: [
      {
        label: "[교섭 판정] 진심 어린 책임의 언어와 합당한 보상으로 분노한 이들의 마음을 돌린다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "변명 없이 책임을 직시하면서도 대의의 절박함을 설파한 그 한마디가 얼어붙은 병영의 공기를 단숨에 녹였다! 악명 높은 냉혈한의 낙인을 지워 버렸을 뿐 아니라, 누구든 설득하는 은빛 혀의 달인으로 거듭났다.",
          stats: { Fel: 7, Inf: 6 },
          removeTags: ["notorious_ruthless"],
          addTags: ["silver_tongue"],
          align: { humane: 8 }
        },
        success: {
          text: "성실한 해명과 전선에서의 솔선수범이 어우러져 마침내 오명을 씻어 냈다. 악명 높은 냉혈한이라는 수군거림이 잦아들고 신뢰가 회복되었다.",
          stats: { Fel: 5, Inf: 4 },
          removeTags: ["notorious_ruthless"],
          align: { humane: 5 }
        },
        fail: {
          text: "진심이 닿기도 전에 냉소적인 야유가 쏟아지며 말문이 막혔다. 비정한 평판은 여전히 그림자처럼 따라다닌다.",
          stats: { Inf: -3, Fel: -2 }
        },
        critFail: {
          text: "서투른 해명이 오히려 과거의 비정함을 변명하는 꼴이 되어 거센 반발을 샀다! 휘하 인원들의 불신이 극에 달하며 위신이 크게 추락했다.",
          stats: { Inf: -6, Fel: -4 }
        }
      },
      {
        label: "변명을 접고 침묵 속에서 맡겨진 궂은 임무만 묵묵히 수행한다",
        effect: {
          text: "평판을 바꾸려 애쓰는 대신 말없이 직무에만 매진했다. 악명은 사라지지 않았으나 쓸데없는 마찰은 줄였다.",
          stats: { WP: 2, Inf: 1 }
        }
      }
    ],
    source: "Imperium Maledictum / Only War"
  },
  {
    id: "ev_s21_at_12",
    title: "채무의 역전 — 파산의 굴레를 끊다",
    category: "후천 특성 극복",
    once: true,
    req: {
      allTags: ["imperial_debt"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeRealms: ["heretic"],
      excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"],
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "dreadnought", "daemon_prince", "assassin", "heretic", "chaos_aligned"]
    },
    reqLabel: "거액의 채무 보유 · 충성파 필멸자 · 크리그/야만 행성 제외",
    weight: 38,
    text: "산더미처럼 불어난 이자와 채권단의 독촉장이 목을 조여 온다. 바로 이때, 변경 성계의 버려진 무역선 잔해와 상업 길드의 미수금 장부를 엮어 단숨에 빚을 청산하고 판세를 뒤집을 기막힌 기회가 눈앞에 떨어졌다.",
    choices: [
      {
        label: "[교섭 판정] 채권자들을 한자리에 모아 대담한 상환 조건과 수익 분배안을 관철한다",
        check: { stat: "Fel", diff: -10 },
        critSuccess: {
          text: "파산 직전의 벼랑 끝에서 오히려 채권자들을 투자자로 돌려세우는 기적 같은 협상을 성사시켰다! 거액의 채무를 단숨에 청산했을 뿐 아니라, 정계와 상계를 쥐락펴락하는 은빛 혀로 명성을 떨쳤다.",
          stats: { Fel: 7, Inf: 7 },
          removeTags: ["imperial_debt"],
          addTags: ["silver_tongue"],
          align: { ruthless: 6 }
        },
        success: {
          text: "치밀한 이권 중재로 잔여 채권을 모두 정리하고 자유의 몸이 되었다. 길고 어두웠던 거액의 채무에서 마침내 벗어났다.",
          stats: { Fel: 4, Inf: 5 },
          removeTags: ["imperial_debt"]
        },
        fail: {
          text: "채권단의 계산은 냉혹했다. 협상은 결렬되었고 상환 기한만 간신히 늦추는 데 그쳤다.",
          stats: { Inf: -2 }
        },
        critFail: {
          text: "성급한 담보 제시가 빌미가 되어 추가 위약금까지 물고 말았다! 빚의 수렁이 더욱 깊어지며 체면이 크게 구겨졌다.",
          stats: { Inf: -5, Fel: -3 }
        }
      },
      {
        label: "소규모 분할 상환 약정을 맺고 허리띠를 졸라매며 버텨 낸다",
        effect: {
          text: "위험한 도박을 피하고 매 분기 수입의 일부를 떼어 내는 정직한 분할 상환을 선택했다. 빚은 남았으나 당장 압류당할 위기는 넘겼다.",
          stats: { Int: 2, WP: 2 }
        }
      }
    ],
    source: "Rogue Trader / Imperium Maledictum"
  },
  {
    id: "ev_s21_at_13",
    title: "검성의 숙명 — 절정의 도전자",
    category: "특성 심화",
    once: true,
    req: {
      minAge: 16,
      allTags: ["blade_master"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["dreadnought", "daemonic"]
    },
    reqLabel: "검성의 경지 보유 · 16세 이상 · 드레드노트/악마 제외 · 비야만 행성",
    weight: 30,
    text: "전장을 휩쓸던 검성의 명성을 듣고 나타난 적진의 무쌍 검객이 폐허 한가운데에서 정식 대결을 청해 왔다. 숨 막히는 살기가 공기를 가르는 가운데, 정점에 오른 검술을 증명해 전설을 완성할지 아니면 냉정히 물러날지 선택해야 한다.",
    choices: [
      {
        label: "[백병 판정] 일격에 생사를 가르는 절정의 검극으로 도전자를 맞이한다",
        check: { stat: "WS", diff: -12 },
        critSuccess: {
          text: "번개처럼 스쳐 지나간 단 한 합 만에 상대의 무기를 두 동강 내고 심장을 꿰뚫었다! 전장의 모든 시선이 경외로 얼어붙으며 살아 있는 검성의 위명이 성계 전체에 울려 퍼졌다.",
          stats: { WS: 8, Ag: 5, Inf: 7 },
          align: { dogmatic: 5 }
        },
        success: {
          text: "백여 합을 주고받는 치열한 공방 끝에 상대의 보폭을 읽어 내어 승리를 거머쥐었다. 검성의 경지가 한층 더 깊어졌다.",
          stats: { WS: 5, Inf: 4 }
        },
        fail: {
          text: "예상을 뛰어넘는 적의 변칙 검술에 옆구리를 깊게 베이며 간신히 물러났다. 자존심에는 금이 갔으나 검을 쥔 손목은 지켜 냈다.",
          wounds: -15,
          stats: { Inf: -2 }
        },
        critFail: {
          text: "회심의 일격이 읽히며 주무기를 쥔 팔꿈치와 힘줄이 처참하게 꺾이고 말았다! 목숨은 부지했으나 다시는 예전처럼 검을 휘두를 수 없게 되어 검성의 경지를 잃고 불구의 몸이 되었다.",
          wounds: -24,
          stats: { WS: -6, Ag: -4, Inf: -4 },
          removeTags: ["blade_master"],
          addTags: ["crippled_limb"]
        }
      },
      {
        label: "무의미한 일기토를 거절하고 화망과 호위 병력으로 적을 포위 섬멸한다",
        effect: {
          text: "검객의 도발에 말려들지 않고 냉정한 지휘로 일제 사격을 퍼부어 도전자를 제거했다. 검성의 자존심을 지키는 것보다 생존과 승리가 우선이었다.",
          stats: { Int: 3, Inf: 2 }
        }
      }
    ],
    source: "Codex: Space Marines / Dark Heresy"
  },
  {
    id: "ev_s21_at_14",
    title: "안개의 매복 — 전술안의 극한 시험",
    category: "특성 심화",
    once: true,
    req: {
      minAge: 18,
      allTags: ["tactician_eye"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["daemonic"]
    },
    reqLabel: "백전노장의 전술안 보유 · 18세 이상 · 악마 제외 · 크리그/야만 행성 제외",
    weight: 30,
    text: "안개 낀 협곡으로 진입하던 아군 종대가 적의 정교한 다층 매복에 완벽히 포위당했다. 적 지휘관 역시 이쪽의 전술 습관까지 읽고 함정을 판 듯 사방에서 화망이 조여 온다. 백전노장의 전술안이 지금 가장 치열한 시험대에 올랐다.",
    choices: [
      {
        label: "[지성 판정] 적 매복망의 역학을 순식간에 해독해 역습의 활로를 뚫는다",
        check: { stat: "Int", diff: -12 },
        critSuccess: {
          text: "적의 화력 집중 순서를 거꾸로 이용해 적 부대끼리 오인 사격을 유발하며 포위망을 산산조각 냈다! 절체절명의 매복을 압승으로 뒤집은 전설적인 지휘로 명성이 드높아졌다.",
          stats: { Int: 7, Inf: 8, WP: 4 },
          align: { humane: 5 }
        },
        success: {
          text: "매복의 약한 고리를 정확히 짚어내어 포위망을 뚫고 반격의 발판을 마련했다. 역시 명불허전의 전술안이라는 찬사가 쏟아졌다.",
          stats: { Int: 5, Inf: 5 }
        },
        fail: {
          text: "적의 기만 기동에 한 수 밀리며 큰 피해를 입은 채 포위망을 빠져나왔다. 뼈아픈 실패였으나 다음 전장을 위한 교훈은 남았다.",
          wounds: -12,
          stats: { Inf: -3 }
        },
        critFail: {
          text: "적의 이중 함정에 완전히 걸려들어 주력 종대가 궤멸적 타격을 입었다! 살아남기 위해 후위 부대를 내버리고 도주한 대가로 백전노장의 전술안에 대한 신뢰를 잃고 악명 높은 냉혈한으로 전락했다.",
          wounds: -18,
          stats: { Int: -4, Inf: -6 },
          removeTags: ["tactician_eye"],
          addTags: ["notorious_ruthless"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "전술적 기교를 버리고 즉각 연막을 펼쳐 전원 산개 퇴각을 명령한다",
        effect: {
          text: "무리한 역습을 포기하고 병력을 소단위로 흩어 협곡을 빠져나왔다. 손실은 있었으나 궤멸만은 막아 냈다.",
          wounds: -6,
          stats: { Ag: 2, WP: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War"
  }
];
