// 분기 사건 — 전설의 교차 (네임드 인물 크로스오버 8종)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_s18_xover_shame_grimnar",
    title: "펜리스 궤도의 빙결된 휴전선 — 로간 그림나르와 수치의 달들",
    category: "전설의 교차",
    once: true,
    characters: ["grimnar"],
    req: {
      minAge: 16,
      minYear: 445,
      maxYear: 449,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "high_lord_terra"]
    },
    reqLabel: "445~449.M41 · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "제1차 아마겟돈 전쟁에서 앙그론을 추방한 뒤 수개월이 흐른 펜리스 상공, 빙결된 대기를 가르며 제국 함대끼리 포문을 겨누는 초유의 대치가 벌어졌다. 앞서 휴전 회담에서 그랜드 마스터 조로스가 그림나르에게 베인 뒤 격화된 대치 끝에, 오르도 말레우스 로드 이단심문관 키스나로스와 그레이 나이트 함대가 스페이스 울프의 요새 더 팽을 포위하자 모르카이의 도끼를 움켜쥔 그레이트 울프 로간 그림나르가 기함 통신망을 열어 포효했다. 같은 황제를 섬기는 형제들이 무고한 생존자의 생사를 놓고 격발 직전에 선 순간, 함교의 모든 시선이 그대에게 향한다.",
    choices: [
      {
        label: "[교섭 판정] 로간 그림나르의 방패에 합류해 피난 수송선단의 도주 항로를 연다",
        req: { excludeTags: ["shame_purger"] },
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "그림나르의 늑대 함대가 봉쇄선을 흔드는 틈을 타 피난 수송선 수십 척을 워프 도약 좌표로 빼돌렸다. 로간 그림나르가 우렁찬 전사의 경례로 그대의 인간적 용기를 기리며 전설의 교차 서약을 새겼다.",
          stats: { Fel: 6, WP: 6, Inf: 6 },
          faith: 6,
          align: { humane: 10, dogmatic: -4 },
          addTags: ["shame_protector", "macro_mercy_sanctuary", "met_grimnar", "crossover_oath"]
        },
        fail: {
          text: "궤도 검문정의 경고사격에 선체가 흔들리며 파편 부상을 입고 일부 호위함을 잃었으나, 끝내 피난선 본대의 이탈만은 지켜 내며 그림나르의 시선에 남았다.",
          wounds: -18,
          stats: { WP: 3, Inf: -2 },
          align: { humane: 7, dogmatic: -3 },
          addTags: ["shame_protector", "met_grimnar", "crossover_oath"]
        }
      },
      {
        label: "[의지 판정] 악마 오염 차단을 우선해 오르도 말레우스와 그레이 나이트의 봉쇄를 집행한다",
        req: { excludeTags: ["shame_protector"] },
        check: { stat: "WP", diff: -6 },
        success: {
          text: "늑대의 포효 앞에서도 동요하지 않고 격리 좌표와 기억 소거 절차를 차갑게 관철했다. 오르도 말레우스 지휘부는 철혈의 비밀 엄수를 치하했으나, 그림나르의 불타는 노여움이 뼈에 남았다.",
          stats: { WP: 6, Int: 5, Inf: 7 },
          faith: 6,
          align: { dogmatic: 9, ruthless: 4, humane: -6 },
          addTags: ["shame_purger", "inquisition_favor", "met_grimnar", "crossover_oath"]
        },
        fail: {
          text: "분노한 스페이스 울프 강습대의 충격 기동에 휘말려 중상을 입고 지휘망이 흔들렸으나, 봉쇄선 일부를 유지한 채 냉혹한 집행 기록을 남겼다.",
          wounds: -22,
          stats: { WP: 2, Inf: -2 },
          align: { dogmatic: 6, ruthless: 3, humane: -4 },
          addTags: ["shame_purger", "met_grimnar", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 양측 함대의 교신 혼선을 틈타 기밀 작전 기록과 보급 권한을 은밀히 확보한다",
        check: { stat: "Int", diff: -4 },
        success: {
          text: "이단심문소와 스페이스 울프가 궤도에서 맞서는 사이, 흩어진 아마겟돈 작전 문건과 군수 전권을 조용히 손에 넣었다. 피비린내 나는 대치의 틈새에서 냉혹한 실리를 챙겼다.",
          stats: { Int: 6, Inf: 8, Ag: 3 },
          align: { ruthless: 9, humane: -3 },
          addTags: ["met_grimnar", "crossover_oath"]
        },
        fail: {
          text: "양측 감청 장교들에게 발각되어 질책과 제재를 받았고, 경고사격 여파로 격벽이 무너지며 부상까지 입었다.",
          wounds: -14,
          stats: { Inf: -5 },
          align: { ruthless: 5 },
          addTags: ["met_grimnar", "crossover_oath"]
        }
      },
      {
        label: "양측의 포문 사이에 중립 구조 신호를 띄워 교전 확대를 막고 휴전 성립까지 버텨 낸다",
        effect: {
          text: "빙결된 펜리스 상공에 끝내 전면전은 벌어지지 않았고, 고대 드레드노트들이 깨어나 휴전을 중재하는 역사적 순간까지 부상자 구호선을 지켜 냈다. 그날 로간 그림나르와 이단심문소가 마주한 빙원의 침묵은 평생의 교훈이 되었다.",
          stats: { WP: 5, T: 4, Fel: 3 },
          faith: 4,
          align: { humane: 4, dogmatic: 2 },
          addTags: ["met_grimnar", "crossover_oath"]
        }
      }
    ],
    source: "The Emperor's Gift / Lexicanum: Months of Shame / Logan Grimnar"
  },
  {
    id: "ev_s18_xover_cawl_trazyn",
    title: "엘리시온 평원의 흑요석 기적 — 벨리사리우스 카울과 무한의 트라진",
    category: "전설의 교차",
    once: true,
    characters: ["cawl", "trazyn"],
    req: {
      minAge: 16,
      minYear: 998,
      maxYear: 999,
      greatRift: false,
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince",
        "cadia_stands", "custodes", "grey_knight", "living_saint", "dreadnought", "high_lord_terra"
      ],
      or: [
        { anyWorlds: ["cadia"] },
        { anySegmenta: ["obscurus"] },
        { anyTags: ["militarum", "astartes", "mechanicus", "inquisitor", "inquisition_agent", "sororitas", "navy", "imperial_knight"] }
      ]
    },
    reqLabel: "998~999.M41 · 대균열 직전 · 16세 이상 · 카디아 전선",
    weight: 34,
    text: "공포의 눈이 핏빛으로 부풀어 오르는 카디아 붕괴 전야, 엘리시온 평원의 거대한 흑요석 파일런 지하 제어실에 기이한 공조가 성사되었다. 수십 개의 기계 팔을 바삐 움직이던 화성의 대현자 벨리사리우스 카울 뒤로 에메랄드빛 차원문이 열리더니, 미소를 머금은 네크론 대군주 무한의 트라진이 걸어 나온 것이다. 카울은 경멸을 숨기지 않으면서도 공포의 눈을 닫기 위해 외계인이 건네는 암호화된 파일런 조율 코드를 받아 적고 있었고, 트라진은 흥미로운 표정으로 그대에게도 은밀한 제안을 던졌다.",
    choices: [
      {
        label: "[지성 판정] 카울의 지시에 맞춰 트라진의 파일런 조율 수식을 제어반에 입력한다",
        check: { stat: "Int", diff: -6 },
        success: {
          text: "흑요석 거석이 웅장한 굉음과 함께 에메랄드빛 파동을 쏘아 올리며 워프 폭풍을 밀어냈다! 카울은 경탄의 이진법 성가를 울렸고, 트라진은 언젠가 솔렘나스 박물관에 갚아야 할 흥미로운 빚을 장부에 적었다.",
          stats: { Int: 8, WP: 5, Inf: 7 },
          align: { ruthless: 6, humane: 3, dogmatic: -4 },
          addTags: ["met_cawl", "met_trazyn", "solemnace_debt", "cadia_stands", "crossover_oath"]
        },
        fail: {
          text: "외계 조율 장치가 역류하며 에메랄드빛 전격이 신경망을 태웠다. 카울의 응급 처치로 목숨을 건졌으나 트라진은 대가로 그대의 유품 하나를 챙겨 사라졌다.",
          wounds: -20,
          stats: { Int: 3, T: -2 },
          align: { ruthless: 4, dogmatic: -2 },
          addTags: ["met_cawl", "met_trazyn", "solemnace_debt", "crossover_oath"]
        }
      },
      {
        label: "[교섭 판정] 트라진의 테서랙트 미궁 원군 방출을 설득해 카디아 방어선 구원을 끌어낸다",
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "트라진이 유쾌하게 웃으며 공중에 테서랙트 미궁을 던지자, 수백 년 전 수집된 제국 연대와 유물 방어군이 쏟아져 나와 붕괴 직전의 방어선을 지탱했다! 수많은 장병이 목숨을 건졌으나 솔렘나스의 장부에 그대의 이름이 깊이 새겨졌다.",
          stats: { Fel: 7, Inf: 7, WP: 5 },
          align: { humane: 9, ruthless: 4, dogmatic: -5 },
          addTags: ["met_cawl", "met_trazyn", "solemnace_debt", "cadia_stands", "crossover_oath"]
        },
        fail: {
          text: "오만한 네크론 수집가가 제국 병사들의 희생을 유희처럼 저울질하다 시간을 지체했고, 카오스 포격이 제어실 입구를 강타해 큰 부상을 입었다.",
          wounds: -22,
          stats: { Fel: 2, Inf: -3 },
          align: { humane: 5, ruthless: 3 },
          addTags: ["met_cawl", "met_trazyn", "solemnace_debt", "crossover_oath"]
        }
      },
      {
        label: "[사격 판정] 외계인의 거래를 거부하고 제어실 입구에서 밀려드는 카오스 강습대를 막는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "트라진의 비웃음을 등진 채 외계 장치에는 손끝 하나 대지 않고 오직 제국의 화력으로 카오스 돌격대를 분쇄했다. 카울은 고집에 혀를 차면서도 방어 공로를 인정했고, 트라진은 그대의 순수한 완고함을 흥미롭게 기록했다.",
          stats: { BS: 7, WP: 6, Inf: 6 },
          faith: 10,
          align: { dogmatic: 10, humane: -2 },
          addTags: ["met_cawl", "met_trazyn", "cadia_stands", "crossover_oath"]
        },
        fail: {
          text: "카오스 터미네이터의 집중 포화에 흉갑이 뚫리는 중상을 입었으나, 파일런이 기동할 시간을 벌어 내며 끝내 무릎 꿇지 않았다.",
          wounds: -24,
          stats: { WP: 4 },
          faith: 6,
          align: { dogmatic: 7 },
          addTags: ["met_cawl", "met_trazyn", "crossover_oath"]
        }
      },
      {
        label: "외계인과 대현자의 기묘한 공조를 침묵 속에 경호하며 파일런 가동 기록만 보전한다",
        effect: {
          text: "제국 교리로는 결코 용납될 수 없는 장면이 인류를 구하기 위해 눈앞에서 펼쳐졌다. 트라진이 떠난 뒤 카울은 입단속을 명했고, 솔렘나스의 수집가가 남긴 기묘한 빚의 감각이 오래도록 맴돌았다.",
          stats: { Int: 4, WP: 5, T: 3 },
          align: { ruthless: 3, dogmatic: 2 },
          addTags: ["met_cawl", "met_trazyn", "solemnace_debt", "crossover_oath"]
        }
      }
    ],
    source: "Gathering Storm I: Fall of Cadia / Lexicanum: Belisarius Cawl / Trazyn the Infinite"
  },
  {
    id: "ev_s18_xover_guilliman_vahl",
    title: "황궁 전쟁 의회의 충돌 — 로부테 길리먼과 모르벤 발",
    category: "전설의 교차",
    once: true,
    characters: ["guilliman", "morvenn_vahl"],
    req: {
      minAge: 16,
      minYear: 1001,
      greatRift: true,
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "imperial_nihilus"],
      or: [
        { anyWorlds: ["terra"] },
        { anyTags: ["high_lord_terra", "sororitas", "canoness", "ecclesiarchy", "astartes", "custodes", "inquisitor", "imperial_knight", "living_saint", "navy", "militarum", "administratum"] },
        { minStats: { Inf: 45 } }
      ]
    },
    reqLabel: "001.M42+ · 대균열 이후 · 16세 이상 · 제국 충성파",
    weight: 32,
    text: "인도미투스 성전의 진격로를 정하는 테라 황궁 전쟁 의회실, 홀로그램 성도 위로 두 거인의 시선이 불꽃처럼 부딪혔다. 제국 섭정 로부테 길리먼은 냉철한 병참 수치를 짚으며 보급선이 끊긴 변경 성지 성계들을 일단 포기하고 주력 함대를 집중해야 한다고 선언했다. 그러나 파라곤 워슈트 연옥에 몸을 실은 아베스 상크토룸 모르벤 발이 성광의 창을 바닥에 내려찍으며 반박했다. 황제의 신앙이 불타는 성지를 책상 위 숫자로 버린다면 제국의 영혼부터 무너질 것이라는 외침에 의회실이 팽팽히 얼어붙는다.",
    choices: [
      {
        label: "[교섭 판정] 정예 지휘권의 이름으로 기동 보급선과 성지 구원을 잇는 절충 작전을 제시한다",
        req: { anyTags: ["high_lord_terra", "sororitas", "canoness", "astartes", "custodes", "imperial_knight", "living_saint", "inquisitor"] },
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "길리먼이 정밀한 예비 함대 배분안에 눈썹을 치켜올렸고, 모르벤 발 역시 선봉 돌격 권한 보장에 만족하며 창끝을 거두었다. 이성과 신앙이 맞물린 절충안이 인도미투스 성전 공식 작전서로 채택되었다!",
          stats: { Fel: 7, Int: 6, Inf: 10 },
          faith: 8,
          align: { humane: 7, dogmatic: 5 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "두 거인의 기세에 눌려 병참 수치와 교리 해석 사이에서 논리가 흔들렸다. 두 지도자는 각자의 노선을 고수했고 그대의 정치적 입지가 크게 위축되었다.",
          stats: { Inf: -6, WP: 3 },
          align: { humane: 3, dogmatic: 2 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 길리먼의 병참 계산을 지지해 성전 주력 보급망의 냉혹한 집중을 논증한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "보급 고갈로 인한 연쇄 붕괴 수치를 명쾌히 제시하자 길리먼이 깊은 신뢰의 눈빛으로 고개를 끄덕였다. 모르벤 발은 서늘한 침묵으로 물러섰으나 냉철한 전략가로서의 위상이 크게 치솟았다.",
          stats: { Int: 8, Inf: 8, WP: 4 },
          align: { ruthless: 8, dogmatic: -3 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "모르벤 발이 병참표에 적히지 않은 순교자들의 피와 성지의 방어 가치를 날카롭게 반박하자 말문이 막혀 권위를 잃었다.",
          stats: { Inf: -5, Int: 2 },
          align: { ruthless: 4 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "crossover_oath"]
        }
      },
      {
        label: "[의지 판정] 모르벤 발의 출정론에 힘을 실어 고립된 성지 행성 구원 선봉을 자청한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "의회실에 울려 퍼진 불굴의 맹세에 모르벤 발이 장엄히 화답했고, 길리먼마저 탄식 섞인 존중으로 신속 구원 편대를 허가했다! 신앙의 불꽃이 수많은 성지 시민을 구할 길을 열었다.",
          stats: { WP: 8, Fel: 5, Inf: 7 },
          faith: 12,
          align: { dogmatic: 8, humane: 6 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "지나친 열정에 휩쓸려 성전 보급 책임을 가볍게 여겼다는 길리먼의 냉정한 질책을 받았고, 선봉 투입 과정에서도 거친 포화에 상처를 입었다.",
          wounds: -14,
          stats: { Inf: -3, WP: 3 },
          faith: 6,
          align: { dogmatic: 6, humane: 3 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "crossover_oath"]
        }
      },
      {
        label: "두 지도자의 논쟁에 끼어들지 않고 확정된 성전 칙령을 기록해 전선 보급을 준비한다",
        effect: {
          text: "프라이마크의 이성과 아베스 상크토룸의 불꽃이 충돌하는 현장을 묵묵히 지켜보았다. 결국 두 힘 모두 대균열 시대의 제국을 떠받치는 양 날개임을 깨달았다.",
          stats: { Int: 4, WP: 4, Inf: 4 },
          faith: 4,
          align: { dogmatic: 3, humane: 2 },
          addTags: ["met_guilliman", "met_morvenn_vahl", "crossover_oath"]
        }
      }
    ],
    source: "Codex: Adepta Sororitas (9th Ed.) / Dawn of Fire / Lexicanum: Morvenn Vahl"
  },
  {
    id: "ev_s18_xover_celestine_vahl",
    title: "황금의 기적과 강철의 신앙 — 성녀 셀레스틴과 모르벤 발",
    category: "전설의 교차",
    once: true,
    characters: ["celestine", "morvenn_vahl"],
    req: {
      minAge: 16,
      minYear: 1001,
      greatRift: true,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "imperial_nihilus"]
    },
    reqLabel: "001.M42+ · 대균열 이후 · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "카오스 공성군에 포위된 성지 행성의 대성당 광장이 붕괴하기 직전, 잿빛 먹구름을 찢고 눈부신 황금빛 화염이 쏟아져 내렸다. 불타는 성검을 치켜들고 황금 날개를 펼친 살아 있는 성녀 셀레스틴이 강림한 바로 그 곁에서, 아베스 상크토룸 모르벤 발이 파라곤 워슈트 연옥의 포화를 뿜어내며 성광의 창으로 악마 무리를 베어 넘긴다. 초월적 기적과 강철 같은 필멸의 신앙이 나란히 타오르는 광경 속에서, 피난민 성소가 적의 측면 돌격에 노출되었다.",
    choices: [
      {
        label: "[의지 판정] 성녀의 성광과 아베스의 전열에 공명해 대성당 성소의 방어 기적을 일깨운다",
        req: { anyTags: ["living_saint", "saint_vessel", "sororitas", "canoness", "ecclesiarchy"] },
        check: { stat: "WP", diff: -4 },
        success: {
          text: "그대의 기도문이 셀레스틴의 황금 광휘와 모르벤 발의 찬송가에 겹쳐지며 대성당 방벽 전체가 타오르는 성역으로 변모했다! 카오스 공성군이 비명을 지르며 무너졌고, 두 성스러운 전사가 그대의 이름을 축복했다.",
          stats: { WP: 9, WS: 5, Inf: 9 },
          faith: 18,
          corruption: -10,
          align: { humane: 8, dogmatic: 8 },
          addTags: ["met_celestine", "met_morvenn_vahl", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "쏟아지는 신성한 격류와 악마 포화의 충돌 속에서 몸이 버티지 못해 깊은 화상과 탈진을 입었으나, 성소 방벽만은 끝내 지켜 냈다.",
          wounds: -20,
          stats: { WP: 4 },
          faith: 10,
          align: { humane: 5, dogmatic: 5 },
          addTags: ["met_celestine", "met_morvenn_vahl", "macro_mercy_sanctuary", "crossover_oath"]
        }
      },
      {
        label: "[강인 판정] 셀레스틴의 황금 날개 아래 몸을 던져 성당 지하의 부상자와 피난민을 엄호한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "파편과 화염을 몸으로 막아 내며 수천 명의 피난민을 안전 지하 성소로 인도했다! 성녀 셀레스틴이 따뜻한 빛으로 상처를 어루만지며 자비의 수호자로 축복했다.",
          stats: { T: 7, WP: 6, Fel: 5, Inf: 6 },
          faith: 12,
          corruption: -6,
          align: { humane: 11 },
          addTags: ["met_celestine", "met_morvenn_vahl", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "적 파편탄에 어깨와 옆구리를 크게 다쳐 피를 흘렸으나, 한 명의 피난민도 뒤로 남기지 않고 성소 철문을 닫아 걸었다.",
          wounds: -22,
          stats: { T: 3, WP: 3 },
          faith: 6,
          align: { humane: 8 },
          addTags: ["met_celestine", "met_morvenn_vahl", "macro_mercy_sanctuary", "crossover_oath"]
        }
      },
      {
        label: "[백병 판정] 모르벤 발의 돌격 대열에 합류해 카오스 공성 병기와 배교 사제를 정면 섬멸한다",
        check: { stat: "WS", diff: -6 },
        success: {
          text: "파라곤 워슈트가 뚫은 혈로를 따라 뛰어들어 배교 사제의 제단을 산산조각 냈다! 모르벤 발이 피 묻은 창을 들어 올리며 흔들림 없는 철혈의 신앙을 치하했다.",
          stats: { WS: 8, BS: 4, WP: 6, Inf: 7 },
          faith: 12,
          align: { dogmatic: 10, ruthless: 4 },
          addTags: ["met_celestine", "met_morvenn_vahl", "crossover_oath"]
        },
        fail: {
          text: "카오스 공성 병기의 폭발 충격파에 튕겨 나가 큰 부상을 입었으나, 모르벤 발의 엄호 화력 덕에 전선을 유지했다.",
          wounds: -24,
          stats: { WS: 3, T: 2 },
          faith: 6,
          align: { dogmatic: 7, ruthless: 2 },
          addTags: ["met_celestine", "met_morvenn_vahl", "crossover_oath"]
        }
      },
      {
        label: "성유물 안치소 입구에 방어 진지를 세우고 생존 병사들과 피난민의 이탈로를 지켜 낸다",
        effect: {
          text: "살아 있는 성녀의 기적과 아베스 상크토룸의 맹공이 적을 몰아내는 동안, 후방 성소와 피난민 대열을 끝까지 지켜 냈다. 그날 밤 성당 폐허에 머문 황금빛 잔향이 영혼을 맑게 씻어 주었다.",
          stats: { WP: 5, T: 4, Fel: 4 },
          faith: 8,
          corruption: -4,
          align: { humane: 5, dogmatic: 4 },
          addTags: ["met_celestine", "met_morvenn_vahl", "macro_mercy_sanctuary", "crossover_oath"]
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Celestine: The Living Saint / Lexicanum: Morvenn Vahl"
  },
  {
    id: "ev_s18_xover_draigo_mortarion",
    title: "은빛 균열과 창백한 대낫 — 칼도르 드라이고와 모타리온",
    category: "전설의 교차",
    once: true,
    characters: ["kaldor_draigo", "mortarion"],
    req: {
      minAge: 16,
      minYear: 1000,
      greatRift: true,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "000.M42+ · 대균열 이후 · 16세 이상",
    weight: 35,
    text: "역병 안개가 숨통을 조이는 전선의 균열 너머로 부패한 나방 날개가 펼쳐졌다. 거대한 대낫 침묵을 끌며 나타난 너글의 악마 프라이마크 모타리온이 썩어 가는 제국을 조롱하며 독기를 내뿜는 순간, 허공이 눈부신 은빛 불꽃으로 찢어졌다! 워프 심연의 저주를 뚫고 도약한 그레이 나이트 슈프림 그랜드 마스터 칼도르 드라이고가 '타이탄소드'를 치켜들며 외쳤다. 코르노빈에서 모타리온의 심장에 옛 이름을 새겼던 숙적들이 백 년의 원한을 다시 불태우며 격돌한다!",
    choices: [
      {
        label: "[의지 판정] 칼도르 드라이고의 은빛 불꽃을 따라 역병 안개를 뚫고 데스 가드 호위대를 저지한다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -8 },
        success: {
          text: "드라이고의 은빛 사이킥 파동에 보조를 맞춰 모타리온의 역병 호위대가 측면을 덮치는 것을 막아 냈다! 악마 프라이마크가 분노 속에 퇴각하고 드라이고가 다시 워프로 사라지기 전, 짧은 경례로 불굴의 전우를 인정했다.",
          stats: { WP: 9, WS: 6, T: 5, Inf: 9 },
          faith: 14,
          corruption: -8,
          align: { dogmatic: 10, humane: 4 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "daemon_bane", "crossover_oath"]
        },
        fail: {
          text: "모타리온의 대낫이 일으킨 역병 충격파에 폐와 갑주가 찢어지는 중상을 입고 쓰러졌으나, 드라이고가 날린 은빛 화염이 놈을 밀어낸 덕분에 간신히 숨을 이었다.",
          wounds: -28,
          stats: { T: 3, WP: 3 },
          faith: 5,
          align: { dogmatic: 6 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "crossover_oath"]
        }
      },
      {
        label: "[강인 판정] 두 초월자가 격돌하는 틈을 타 부패 안개 속에 갇힌 생존 장병들을 구출한다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: -6 },
        success: {
          text: "은빛 불꽃이 역병 안개를 가르며 생긴 짧은 통로로 쓰러진 장병 수십 명을 끌어냈다! 칼도르 드라이고의 엄호 아래 생존자들을 정화 방벽 너머로 옮겨 자비의 의지를 증명했다.",
          stats: { T: 7, WP: 6, Fel: 5, Inf: 6 },
          faith: 8,
          align: { humane: 10 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "부식성 안개와 파편에 깊은 화상을 입고 사경을 헤맸으나, 끝내 손을 놓지 않아 부상병 일부를 안전 지대로 밀어 넣었다.",
          wounds: -24,
          stats: { T: 3 },
          align: { humane: 7 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "crossover_oath"]
        }
      },
      {
        label: "[강인 판정] 모타리온의 역병 군단 배후에서 드라이고의 은빛 파동을 피해 부패의 기운을 취한다",
        req: { anyTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: -4 },
        success: {
          text: "창백한 왕과 은빛 방랑자가 격돌하며 쏟아낸 워프 폭풍을 온몸으로 받아 내며 데스 가드 전열의 두려운 존중을 얻었다! 암흑의 권능이 뼛속까지 스며들었다.",
          stats: { T: 7, WP: 6, Inf: 9 },
          corruption: 12,
          align: { ruthless: 10 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "crossover_oath"]
        },
        fail: {
          text: "드라이고의 정화 성광이 옆구리를 태우며 끔찍한 화상과 내상을 입었으나, 부패의 안개 속으로 몸을 숨겨 생존했다.",
          wounds: -26,
          corruption: 6,
          stats: { T: 3 },
          align: { ruthless: 6 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "crossover_oath"]
        }
      },
      {
        label: "두 반신적 존재의 격돌 반경에서 즉시 이탈해 외곽 방벽으로 물러나 전황을 보고한다",
        effect: {
          text: "필멸자가 끼어들 순간이 아님을 직감하고 맹독 폭풍과 은빛 번개가 스쳐 가는 폐허 밖으로 전속력 후퇴했다. 충격파에 타박상을 입었으나 두 숙적의 격돌을 증언할 살아 있는 목격자가 되었다.",
          wounds: -12,
          stats: { Ag: 4, WP: 5, Int: 3 },
          align: { ruthless: 3, dogmatic: 2 },
          addTags: ["met_kaldor_draigo", "met_mortarion", "crossover_oath"]
        }
      }
    ],
    source: "Codex: Grey Knights / Dark Imperium / Lexicanum: Kaldor Draigo / Mortarion"
  },
  {
    id: "ev_s18_xover_kryptman_ghazghkull",
    title: "옥타리우스 도가니의 불씨 — 피두스 크립트만과 가즈쿨 스라카",
    category: "전설의 교차",
    once: true,
    characters: ["kryptman", "ghazghkull"],
    req: {
      minAge: 16,
      minYear: 1004,
      maxYear: 1007,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "high_lord_terra"]
    },
    reqLabel: "004~007.M42 · 16세 이상 · 옥타리우스 봉쇄선",
    weight: 32,
    text: "옥타리우스 성계 외곽의 제국 관측 요새가 붉은 경보등 속에 요동쳤다. 타이라니드 하이브 함대 레비아탄을 오크 제국으로 유인해 서로 죽이게 만들려던 파문당한 전직 이단심문관 피두스 크립트만이 차가운 얼굴로 전술판 앞에 서 있었다. 그러나 그 도박이 끔찍한 변수를 불러냈다. 오크 대군주 가즈쿨 막 우룩 스라카가 옥타리우스의 모든 워보스를 짓밟고 규합하며, 타이라니드 촉수와 맞부딪치는 사상 최대의 대와아아를 일으켜 요새 궤도로 쇄도해 온 것이다!",
    choices: [
      {
        label: "[지성 판정] 크립트만의 냉혹한 유인 좌표를 실행해 가즈쿨 함대와 타이라니드 촉수를 충돌시킨다",
        check: { stat: "Int", diff: -6 },
        success: {
          text: "정밀한 궤도 미끼와 연쇄 익스터미나투스 화염 신호로 가즈쿨의 선봉 함대와 레비아탄 생체 함대를 정면으로 맞부딪치게 만들었다! 크립트만은 차가운 시선으로 인류가 벌어들인 시간을 계산했고, 거대한 희생의 낙인이 남았다.",
          stats: { Int: 8, WP: 5, Inf: 8 },
          align: { ruthless: 10, dogmatic: 4, humane: -6 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "kryptman_cordon_vet", "macro_exterminatus_scar", "crossover_oath"]
        },
        fail: {
          text: "유인 신호가 늦어지며 가즈쿨의 오크 강습정과 타이라니드 포자낭이 관측 요새를 동시에 덮쳤다. 중상을 입고 간신히 탈출선에 올랐다.",
          wounds: -24,
          stats: { Int: 3, Inf: -3 },
          align: { ruthless: 6, humane: -4 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "kryptman_cordon_vet", "crossover_oath"]
        }
      },
      {
        label: "[사격 판정] 크립트만의 음모 대신 요새 포대를 총동원해 가즈쿨의 오크 선봉 돌격을 막는다",
        check: { stat: "BS", diff: -6 },
        success: {
          text: "요새 거포와 중화기 화망이 가즈쿨의 붉은 전함을 정통으로 강타해 돌격 기세를 꺾었다! 통신망 너머로 오크 대군주의 광기 어린 웃음소리가 울렸으나, 제국 봉쇄선은 끝내 무너지지 않았다.",
          stats: { BS: 8, WP: 6, Inf: 7 },
          faith: 8,
          align: { dogmatic: 9 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "crossover_oath"]
        },
        fail: {
          text: "오크 폭격기의 난사와 파편에 중상을 입고 방벽이 무너졌으나, 제국 순양함대의 엄호 속에 생존해 봉쇄선 후방으로 후퇴했다.",
          wounds: -26,
          stats: { T: 3, BS: 2 },
          align: { dogmatic: 6 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "crossover_oath"]
        }
      },
      {
        label: "[교섭 판정] 크립트만의 초토화 명령에 맞서 봉쇄선 외곽 식민지 피난선의 탈출을 관철한다",
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "파문당한 이단심문관의 차가운 경고를 정면으로 꺾고 제국 수송함대를 돌려 식민지 주민 수만 명을 오크와 타이라니드의 아가리에서 구해 냈다! 크립트만은 어리석은 자비라 비웃었으나 살아남은 이들이 그대를 기렸다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 6,
          align: { humane: 11, ruthless: -4 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "피난선 호위 도중 오크 해적선의 습격에 크게 다치고 수송선 일부를 잃었으나, 끝내 포기하지 않은 결단으로 대다수 민간인을 살려 냈다.",
          wounds: -20,
          stats: { Fel: 3, Inf: -2 },
          align: { humane: 8 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "crossover_oath"]
        }
      },
      {
        label: "옥타리우스 붕괴 경보와 두 외계 세력의 집결 좌표를 섹터 사령부에 타전하고 철수한다",
        effect: {
          text: "크립트만의 도박이 낳은 괴물 같은 전장과 가즈쿨 스라카의 함대 규모를 낱낱이 기록해 아스트로패스 망으로 송신했다. 불타는 도가니에서 살아 나온 증언은 제국 방어 계획의 초석이 되었다.",
          stats: { Int: 5, Ag: 4, WP: 4 },
          align: { dogmatic: 3, humane: 2 },
          addTags: ["met_kryptman", "met_ghazghkull", "octarius_survivor", "crossover_oath"]
        }
      }
    ],
    source: "War Zone Octarius / Codex: Tyranids / Codex: Orks / Lexicanum: Fidus Kryptman"
  },
  {
    id: "ev_s18_xover_gaunt_macharius",
    title: "천 개 행성의 유산을 지키는 검 — 이브람 건트와 마카리우스의 군기",
    category: "전설의 교차",
    once: true,
    characters: ["gaunt"],
    req: {
      minAge: 16,
      minYear: 770,
      maxYear: 795,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "high_lord_terra"]
    },
    reqLabel: "770~795.M41 · 16세 이상 · 사바트 월드 성전",
    weight: 32,
    text: "사바트 성역의 폭우 쏟아지는 폐허 사원, 카오스 블러드 팩트 역습군의 포위망 한가운데서 대령-커미사르 이브람 건트가 사바트 성전군 의장 정찰대를 이끌고 있었다. 수백 년 전 서부 변경을 정복했던 성인 로드 솔라 마카리우스의 대성전 시절 잃어버렸던 고대 제국 연대 군기가 이 지하 성소에 잠들어 있었기 때문이다. 적 포격이 지붕을 무너뜨리는 가운데 건트가 검을 뽑아 들며 그대를 돌아보았다. 성인의 유산을 되찾아 전선의 사기를 살릴지, 부상병 탈출에 화력을 집중할지 결단해야 한다.",
    choices: [
      {
        label: "[백병 판정] 이브람 건트와 함께 무너지는 성소로 돌파해 마카리우스의 고대 군기를 탈환한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "카오스 돌격병들을 베어 넘기고 황금빛 독수리가 수놓인 마카리우스의 고대 군기를 높이 치켜들었다! 빗속에 휘날리는 성인의 유산을 본 제국 연대 전체가 함성을 터뜨리며 역습에 성공했고, 건트가 정중히 경례를 올렸다.",
          stats: { WS: 7, WP: 7, Inf: 8 },
          faith: 12,
          align: { dogmatic: 9, humane: 3 },
          addTags: ["met_gaunt", "sabbat_veteran", "crossover_oath"]
        },
        fail: {
          text: "무너지는 석재와 블러드 팩트의 총검에 깊은 상처를 입고 피를 흘렸으나, 끝내 건트의 대원들과 군기 조각을 지켜 내며 생환했다.",
          wounds: -22,
          stats: { WS: 3, WP: 3 },
          faith: 6,
          align: { dogmatic: 6 },
          addTags: ["met_gaunt", "sabbat_veteran", "crossover_oath"]
        }
      },
      {
        label: "[사격 판정] 군기보다 산 사람이 먼저라며 엄호 사격으로 부상당한 병사들과 주민을 빼낸다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정밀한 라스건 화망으로 블러드 팩트의 포위각을 꺾어 부상병과 사원 지하 주민 전원을 탈출시켰다! 마카리우스의 군기 역시 건트의 정찰병이 무사히 수습했고, 건트는 그대의 인간적인 결단에 깊은 존경을 표했다.",
          stats: { BS: 7, Fel: 6, WP: 5, Inf: 6 },
          faith: 6,
          align: { humane: 10, dogmatic: -2 },
          addTags: ["met_gaunt", "sabbat_veteran", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "퇴로를 지키다 적 중화기 파편에 중상을 입었으나, 단 한 명의 부상자도 포로로 넘기지 않고 퇴각에 성공했다.",
          wounds: -20,
          stats: { BS: 3, T: 2 },
          align: { humane: 7 },
          addTags: ["met_gaunt", "sabbat_veteran", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 고대 군기를 미끼로 성소 입구에 지뢰망을 깔아 블러드 팩트 지휘부를 유인 섬멸한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "유물을 노리고 쇄도한 카오스 지휘관과 정예대가 정밀하게 계산된 폭발 화망에 통째로 증발했다! 건트는 차가운 수단에 씁쓸한 표정을 지었으나 압도적 전과와 군기 회수는 부인할 수 없었다.",
          stats: { Int: 7, BS: 5, Inf: 8 },
          align: { ruthless: 9, humane: -4 },
          addTags: ["met_gaunt", "sabbat_veteran", "crossover_oath"]
        },
        fail: {
          text: "폭발 연쇄가 예상보다 일찍 터져 성소 기둥이 무너졌고, 그 충격에 큰 부상을 입은 채 간신히 빠져나왔다.",
          wounds: -22,
          stats: { Int: 2, Inf: -3 },
          align: { ruthless: 5 },
          addTags: ["met_gaunt", "sabbat_veteran", "crossover_oath"]
        }
      },
      {
        label: "성전군 정찰대 외곽선에 남아 연막과 신호탄으로 건트의 본대 철수로를 묵묵히 지킨다",
        effect: {
          text: "빗줄기 속에서 적 척후대의 측면 우회를 끝까지 막아 내며 건트와 고대 군기 수습조가 무사히 본진에 복귀하도록 도왔다. 수백 년 전 성인의 유산과 사바트 성전군의 의지가 한 전장에서 이어진 밤이었다.",
          stats: { Ag: 4, WP: 5, BS: 4 },
          faith: 4,
          align: { humane: 4, dogmatic: 3 },
          addTags: ["met_gaunt", "sabbat_veteran", "crossover_oath"]
        }
      }
    ],
    source: "Gaunt's Ghosts Series / Sabbat Worlds Crusade / Lexicanum: Ibram Gaunt / Macharius"
  },
  {
    id: "ev_s18_xover_cain_amberley",
    title: "황금빛 첨탑 아래의 그림자 — 카이아파스 케인과 앰벌리 베일",
    category: "전설의 교차",
    once: true,
    characters: ["cain", "amberley_vail"],
    req: {
      minAge: 16,
      minYear: 931,
      maxYear: 999,
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral", "krieg"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "custodes", "grey_knight"]
    },
    reqLabel: "931~999.M41 · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "화려한 샹들리에가 반짝이는 총독 첨탑의 귀족 연회장, 제국의 영웅 커미사르 카이아파스 케인이 능청스러운 미소로 고급 와인 잔을 기울이고 있었다. 그 옆에 화려한 귀부인으로 변장한 오르도 제노스 이단심문관 앰벌리 베일이 낮은 목소리로 속삭였다. 연회장 아래 비밀 포도주 저장고에 진스틸러 컬트 지도부와 외계 감염자들이 숨어 들어 총독 암살을 노리고 있다는 것이다. 케인이 본능적으로 가장 안전한 출구를 살피는 찰나, 앰벌리가 그대에게 은밀한 눈짓을 보냈다.",
    choices: [
      {
        label: "[민첩 판정] 특유의 감각과 정예 기량으로 연회 소란 없이 지하 컬트 수장을 선제 무력화한다",
        req: { anyTags: ["assassin", "navigator", "imperial_knight", "inquisitor", "rogue_trader"] },
        check: { stat: "Ag", diff: -4 },
        success: {
          text: "연회장의 음악 소리조차 끊기지 않은 사이에 지하 저장고로 잠입해 진스틸러 선동가를 단숨에 제압했다! 앰벌리 베일이 각주에 극찬을 남겼고, 케인은 자신이 싸우지 않아도 됐다며 진심으로 안도해 타나 차를 대접했다.",
          stats: { Ag: 8, Int: 6, Inf: 9 },
          align: { ruthless: 5, dogmatic: 5 },
          addTags: ["met_cain", "met_amberley_vail", "inquisition_favor", "crossover_oath"]
        },
        fail: {
          text: "지하 어둠 속에서 진스틸러 혼혈 경호대의 기습을 받아 깊은 상처를 입었으나, 뒤따라 뛰어든 케인의 체인소드와 부관 유르겐의 멜타건 세례 덕분에 가까스로 상황을 정리했다.",
          wounds: -20,
          stats: { Ag: 3, WP: 3 },
          align: { dogmatic: 4 },
          addTags: ["met_cain", "met_amberley_vail", "crossover_oath"]
        }
      },
      {
        label: "[백병 판정] 케인과 부관 유르겐의 옆에 서서 연회장 민간인 대피로를 지키며 컬트를 막는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "케인의 현란한 체인소드 검술과 유르겐의 멜타 화력, 그리고 그대의 정면 돌파가 어우러져 진스틸러 습격조를 계단 아래에 묶어 두었다! 귀족과 시종 전원이 무사히 대피하며 제국 선전망에 영웅담이 실렸다.",
          stats: { WS: 7, Fel: 6, Inf: 8 },
          faith: 4,
          align: { humane: 10 },
          addTags: ["met_cain", "met_amberley_vail", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "비명과 유리 파편이 튀는 연회장 계단에서 컬트 암살자의 단검에 베여 중상을 입었으나, 유르겐의 기묘한 오라가 컬트 사이커를 무력화한 틈에 생존했다.",
          wounds: -20,
          stats: { WS: 3, T: 2 },
          align: { humane: 7 },
          addTags: ["met_cain", "met_amberley_vail", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 앰벌리 베일의 비밀 수사에 합류해 연회장 봉쇄와 감염 귀족 가문 숙청을 지휘한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "출입구를 소리 없이 봉쇄하고 유전자 검사와 기밀 문건 압수를 완수해 행성 전체로 번질 뻔한 진스틸러 조직망을 뿌리째 뽑아냈다! 앰벌리 베일은 이단심문소의 두터운 신임을 남겼고 케인은 조용히 한숨을 돌렸다.",
          stats: { Int: 8, Inf: 8, WP: 5 },
          faith: 5,
          align: { dogmatic: 8, ruthless: 6, humane: -4 },
          addTags: ["met_cain", "met_amberley_vail", "inquisition_favor", "crossover_oath"]
        },
        fail: {
          text: "오염된 귀족 경비대가 자폭을 시도하며 폭발 파편에 다쳤고, 일부 말단 조직원이 하층으로 달아나 이단심문소의 엄중한 추궁을 받았다.",
          wounds: -18,
          stats: { Inf: -3, Int: 2 },
          align: { dogmatic: 5, ruthless: 4 },
          addTags: ["met_cain", "met_amberley_vail", "crossover_oath"]
        }
      },
      {
        label: "연회장 외곽 출입문을 통제하며 소동이 퍼지기 전에 참석자들을 질서 있게 대피시킨다",
        effect: {
          text: "앰벌리 베일의 정예 수행원과 케인이 지하 소굴을 소탕하는 동안, 상층부 공황을 막고 무고한 하객들을 안전하게 빼돌렸다. 작전 뒤 케인이 몰래 건넨 따뜻한 타나 차 한 잔이 지친 신경을 녹여 주었다.",
          stats: { Fel: 5, WP: 4, Int: 3 },
          align: { humane: 5, dogmatic: 2 },
          addTags: ["met_cain", "met_amberley_vail", "crossover_oath"]
        }
      }
    ],
    source: "Ciaphas Cain Series: For the Emperor / The Traitor's Hand / Lexicanum: Amberley Vail"
  }
);
