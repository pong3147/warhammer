// 분기 사건 — 전설의 교차 (네임드 인물 크로스오버 14종)
export default [
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
  },
  {
    id: "ev_s19a_xover_yarrick_ghazghkull",
    title: "강철의 노장과 야수의 숙명 — 커미사르 야릭과 가즈쿨 스라카",
    category: "전설의 교차",
    once: true,
    characters: ["yarrick", "ghazghkull"],
    req: {
      minAge: 16,
      minYear: 998,
      maxYear: 999,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "grey_knight", "high_lord_terra", "dreadnought"],
      or: [
        { anyWorlds: ["armageddon"] },
        { anySegmenta: ["solar"] },
        { anyTags: ["militarum", "commissar", "officer", "astartes", "imperial_knight", "sororitas", "inquisitor", "inquisition_agent", "navy", "rogue_trader", "armageddon_hero"] }
      ]
    },
    reqLabel: "998~999.M41 · 제3차 아마겟돈 전쟁기 · 16세 이상 · 제국 충성파",
    weight: 36,
    text: "궤도 소행성 폭격으로 잿더미가 된 하데스 하이브 폐허 너머, 타르타루스 하이브 외곽 방벽에 포연이 뒤엉켰다. 굉음을 울리며 쇄도하는 오크 대군 선두에 거대한 강철 갑주를 두른 워로드 가즈쿨 막 우룩 스라카가 모습을 드러내자 방어선 전체가 진동했다. 바로 그 순간, 회수 복구된 초중전차 베인블레이드 '오만의 요새' 포탑 위에 한 노인이 우뚝 섰다. 붉은 레이저 의안 '사안'을 번뜩이며 노획한 오크 파워 클로를 치켜든 커미사르 세바스찬 야릭이다. 야수가 그 옛 호적을 알아보고 천둥 같은 웃음을 터뜨리자, 야릭은 흔들리지 않는 목소리로 방벽의 모든 총구를 지목했다.",
    choices: [
      {
        label: "[사격 판정] '오만의 요새' 포격 유도에 맞춰 가즈쿨 친위 메가노브 대열에 집중 화망을 꽂는다",
        req: { anyTags: ["militarum", "commissar", "officer", "astartes", "imperial_knight", "sororitas"] },
        check: { stat: "BS", diff: -6 },
        success: {
          text: "베인블레이드의 주포 화염과 그대가 유도한 십자포화가 정확히 맞물리며 가즈쿨의 친위대를 산산이 갈라 놓았다! 거대한 야수가 분노 섞인 경탄을 남기고 물러난 뒤, 야릭이 붉은 의안으로 그대의 사격 지휘에 묵직한 경례를 보냈다.",
          stats: { BS: 7, WP: 6, Inf: 8 },
          faith: 6,
          align: { dogmatic: 8 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_hero", "armageddon_3_vet", "crossover_oath"]
        },
        fail: {
          text: "오크 중화기의 무차별 역포격이 관측 진지를 강타해 깊은 파편상을 입었으나, 야릭의 지휘차가 돌격 선봉을 꺾을 결정적 몇 분은 끝내 벌어 냈다.",
          wounds: -22,
          stats: { BS: 2, T: 3 },
          align: { dogmatic: 5 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_3_vet", "crossover_oath"]
        }
      },
      {
        label: "[의지 판정] 야릭의 곁에서 무너지는 방벽의 신병들을 붙잡고 가즈쿨의 와아아 포효를 버텨 낸다",
        check: { stat: "WP", diff: -6 },
        success: {
          text: "귀청을 찢는 와아아 함성에 패주하려던 방위병들을 붙잡아 세우고 야릭의 구호를 복창하자 방벽의 라스건 일제 사격이 다시 살아났다! 강철 노장이 그대의 어깨를 두드리며 진정한 아마겟돈의 방패라 치하했다.",
          stats: { WP: 8, Fel: 6, Inf: 7 },
          faith: 8,
          align: { dogmatic: 7, humane: 4 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_hero", "armageddon_3_vet", "crossover_oath"]
        },
        fail: {
          text: "오크 돌격대의 충격파에 휩쓸려 가슴에 깊은 상처를 입었으나, 끝까지 방벽에서 물러서지 않아 아군 후속 연대가 증원할 틈을 만들었다.",
          wounds: -24,
          stats: { WP: 4, T: 2 },
          align: { dogmatic: 5 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_3_vet", "crossover_oath"]
        }
      },
      {
        label: "[민첩 판정] 화염에 갇힌 정련소 노동자들을 두 숙적의 교전 틈새로 빼돌린다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "야릭의 베인블레이드가 가즈쿨의 주력을 붙잡아 둔 사이, 붕괴하는 타르타루스 정련소 지하에서 수천 명의 노동자와 부상병을 외곽 방공호로 안전히 빼돌렸다! 포연 너머 야릭은 굳은 표정 속에서도 생명을 지켜 낸 기민함을 묵묵히 인정했다.",
          stats: { Ag: 7, Fel: 6, WP: 5 },
          faith: 6,
          align: { humane: 10, ruthless: -4 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_3_vet", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "무너지는 보급 통로에서 오크 약탈조와 부딪혀 큰 부상을 입었으나, 선두 대열이 방공 구역으로 빠져나갈 때까지 뒤를 막아 냈다.",
          wounds: -20,
          stats: { Ag: 2, T: 2 },
          align: { humane: 7 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_3_vet", "crossover_oath"]
        }
      },
      {
        label: "참호선 후방에서 탄약과 정찰 신호를 이어 가며 야릭의 사수 명령을 끝까지 수행한다",
        effect: {
          text: "타르타루스의 잿빛 하늘 아래 노장과 야수가 서로를 노려보는 거대한 대치 속에서, 그대는 맡은 참호와 화력 보급을 단 한 순간도 끊지 않고 지켜 냈다.",
          stats: { T: 3, WP: 3, BS: 2 },
          faith: 3,
          align: { dogmatic: 4, humane: 2 },
          addTags: ["met_yarrick", "met_ghazghkull", "armageddon_3_vet", "crossover_oath"]
        }
      }
    ],
    source: "Codex: Armageddon / Yarrick: The Pyres of Armageddon / Gunheads / Lexicanum: Sebastian Yarrick / Ghazghkull Mag Uruk Thraka"
  },
  {
    id: "ev_s19a_xover_creed_celestine",
    title: "무너지는 요새의 마지막 서약 — 우르사카르 E. 크리드와 살아 있는 성녀 셀레스틴",
    category: "전설의 교차",
    once: true,
    characters: ["creed", "celestine"],
    req: {
      minAge: 16,
      minYear: 998,
      maxYear: 998,
      greatRift: false,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "high_lord_terra", "dreadnought", "cadia_stands", "rift_survivor"],
      or: [
        { anyWorlds: ["cadia"] },
        { anySegmenta: ["obscurus"] },
        { anyTags: ["militarum", "sororitas", "ecclesiarchy", "commissar", "astartes", "inquisitor", "inquisition_agent", "navy", "imperial_knight"] }
      ]
    },
    reqLabel: "998.M41 · 제13차 블랙 크루세이드 공방전 · 대균열 이전 · 16세 이상 · 제국 충성파",
    weight: 38,
    text: "제13차 블랙 크루세이드의 포화가 카디아의 검은 파일런 평원을 불바다로 바꾼 공방전 전야. 포격에 흔들리는 카스르 크라프 지휘 참호에서 로드 카스텔란 우르사카르 E. 크리드가 낡은 라호 시가를 문 채 한 치도 물러서지 않고 반격 방어선을 긋고 있었다. 바로 그 머리 위로 보랏빛 워프 먹구름이 갈라지며 황금빛 날개를 펼친 살아 있는 성녀 셀레스틴이 불타는 대검을 들고 강림했다. 파일런 외곽선이 무너지면 카디아의 운명이 기울 위기 속에서, 필멸의 명장과 황제의 기적이 동시에 그대를 부른다.",
    choices: [
      {
        label: "[의지 판정] 성녀 셀레스틴의 황금 광휘 아래 크리드의 예비 연대와 함께 파일런 돌격로를 사수한다",
        req: { anyTags: ["militarum", "sororitas", "ecclesiarchy", "commissar", "astartes", "inquisitor", "saint_vessel"] },
        check: { stat: "WP", diff: -6 },
        success: {
          text: "셀레스틴의 불꽃이 블랙 리전 선봉을 태워 버리는 틈에 크리드가 숨겨 둔 중화기 부대와 합류해 파일런 외곽선을 끝내 지켜 냈다! 크리드가 굳건한 경례를 올렸고, 성녀의 따스한 성광이 전장의 공포를 씻어 내렸다.",
          stats: { WP: 8, WS: 5, Inf: 8 },
          faith: 12,
          corruption: -8,
          align: { dogmatic: 9 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "crossover_oath"]
        },
        fail: {
          text: "블랙 리전 헤비 볼터의 탄막에 중상을 입고 쓰러졌으나, 셀레스틴의 날개가 쏟아지는 파편을 막아 준 덕에 가까스로 전선 후방으로 끌어 올려졌다.",
          wounds: -24,
          stats: { WP: 4, T: 2 },
          faith: 6,
          align: { dogmatic: 6 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "crossover_oath"]
        }
      },
      {
        label: "[교섭 판정] 성녀가 연 성광 회랑으로 카스르 크라프 부상병과 피난 대열을 안전 지대로 유도한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "셀레스틴이 하늘에서 악마 군세를 붙잡고 크리드가 예비 기갑대로 측면 화망을 막아 선 사이, 공황에 빠진 카디아 시민과 부상병 수만 명을 후방 지하 성채로 무사히 이끌었다! 카디아의 불굴 의지가 생존자들 속에 살아남았다.",
          stats: { Fel: 7, WP: 6, Inf: 7 },
          faith: 8,
          align: { humane: 10, ruthless: -4 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "지하 성채 입구에 떨어진 궤도 포격 파편에 큰 상처를 입었으나, 대열 선두가 방어 구역에 안착할 때까지 끝내 흔들리지 않았다.",
          wounds: -20,
          stats: { Fel: 3, T: 2 },
          align: { humane: 7 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 크리드의 기만 포병 좌표를 전파해 적 강습선을 파일런 사격 지대로 유인 섬멸한다",
        check: { stat: "Int", diff: -6 },
        success: {
          text: "전술 천재 크리드의 계산대로 카오스 강습선 편대를 좁은 협곡으로 유인해 단숨에 궤멸시켰고, 뒤이어 강하한 셀레스틴의 세라핌 부대가 잔당을 깨끗이 소탕했다. 냉철한 전술안이 전황의 숨통을 틔웠다.",
          stats: { Int: 8, BS: 5, Inf: 7 },
          align: { ruthless: 6, dogmatic: 5 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "crossover_oath"]
        },
        fail: {
          text: "적 워프 교란으로 좌표 송신이 어긋나 아군 관측소가 역포격을 맞았다. 적잖은 상처를 입고 후퇴했으나 귀중한 교전 기록만은 지켜 냈다.",
          wounds: -20,
          stats: { Int: 2, Inf: -2 },
          align: { ruthless: 4 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "crossover_oath"]
        }
      },
      {
        label: "성호를 그으며 카스르 방벽 끝자락에서 마지막 탄창까지 엄호 사격을 이어 간다",
        effect: {
          text: "공포의 눈이 붉게 타오르는 하늘 아래, 로드 카스텔란과 살아 있는 성녀가 어깨를 맞댄 결사항전을 두 눈으로 지켜보며 끝까지 방아쇠를 놓지 않았다.",
          stats: { WP: 3, BS: 3, T: 2 },
          faith: 5,
          align: { dogmatic: 4, humane: 2 },
          addTags: ["met_creed", "met_celestine", "cadia_stands", "crossover_oath"]
        }
      }
    ],
    source: "Gathering Storm I: Fall of Cadia / Celestine: The Living Saint / Lexicanum: Ursarkar E. Creed / Saint Celestine"
  },
  {
    id: "ev_s19a_xover_dante_guilliman",
    title: "핏빛 폐허 위의 섭정 임명 — 사령관 단테와 로부테 길리먼",
    category: "전설의 교차",
    once: true,
    characters: ["dante", "guilliman"],
    req: {
      minAge: 16,
      minYear: 1001,
      maxYear: 1015,
      greatRift: true,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "grey_knight", "high_lord_terra", "dreadnought"],
      or: [
        { anyWorlds: ["baal"] },
        { anySegmenta: ["ultima"] },
        { anyTags: ["astartes", "militarum", "sororitas", "navy", "imperial_knight", "inquisitor", "inquisition_agent", "indomitus_crusader", "baal_survivor"] }
      ]
    },
    reqLabel: "001~015.M42 · 대균열 이후 · 인도미투스 성전기 · 16세 이상 · 제국 충성파",
    weight: 35,
    text: "하이브 함대 레비아탄의 참혹한 공세가 막 끝난 바알의 요새 수도원 아르크스 안젤리쿰 폐허. 갈라진 황금 갑주와 피 묻은 데스 마스크, 부서진 황금 점프 팩 차림으로 천오백 년을 버텨 온 블러드 엔젤 챕터 마스터 사령관 단테가 마침내 안식을 바라며 무릎을 꿇었다. 그 앞에 인도미투스 구원 함대를 이끌고 강림한 푸른 거인, 부활한 프라이마크 로부테 길리먼이 서 있었다. 길리먼은 늙은 영웅의 팔을 잡아 일으켜 세우며, 대균열 너머 영구 암흑에 잠긴 임페리움 니힐루스의 섭정직을 단테의 어깨에 맡겼다.",
    choices: [
      {
        label: "[의지 판정] 두 거인의 서약 앞에 서서 임페리움 니힐루스 재건 선봉 임무를 자원한다",
        req: { anyTags: ["astartes", "militarum", "officer", "sororitas", "navy", "imperial_knight", "inquisitor"] },
        check: { stat: "WP", diff: -6 },
        success: {
          text: "길리먼이 차분한 시선으로 그대의 결의를 재단한 뒤 인도미투스 성전 인장을 내렸고, 지친 눈빛을 추스른 단테가 황금 데스 마스크 너머로 고개를 끄덕였다. 암흑 성역의 반격이 그대의 발끝에서 시작되었다.",
          stats: { WP: 8, WS: 5, Inf: 9 },
          faith: 7,
          align: { dogmatic: 8, humane: 3 },
          addTags: ["met_dante", "met_guilliman", "baal_survivor", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "반신 프라이마크와 천오백 년 영웅의 중압감에 옛 전상이 욱신거렸으나, 끝내 무릎을 꺾지 않아 선봉 편입 허가를 받아 냈다.",
          wounds: -14,
          stats: { WP: 4, T: 2 },
          align: { dogmatic: 5 },
          addTags: ["met_dante", "met_guilliman", "baal_survivor", "crossover_oath"]
        }
      },
      {
        label: "[교섭 판정] 바알의 생존 민간인과 방사능 황무지 재건 구호 계획을 길리먼의 참모진에 직언한다",
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "길리먼은 황무지 시민들을 고통 속에 방치해선 안 된다며 단테에게 바알의 테라포밍과 구호 보급을 명했고, 그대의 구호안이 그대로 채택되었다! 단테가 조용히 감사의 경례를 올렸다.",
          stats: { Fel: 8, Int: 5, Inf: 7 },
          faith: 6,
          align: { humane: 10, ruthless: -4 },
          addTags: ["met_dante", "met_guilliman", "baal_survivor", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "보급난을 앞세운 인도미투스 군수관들의 반발에 부딪혀 계획의 절반만 반영되었으나, 바알 구호의 불씨만은 지켜 냈다.",
          stats: { Fel: 3, Inf: -2 },
          align: { humane: 6 },
          addTags: ["met_dante", "met_guilliman", "baal_survivor", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 프라이머리스 증원군 편제와 니힐루스 성간 항로 물자 배분권을 선점한다",
        check: { stat: "Int", diff: -6 },
        success: {
          text: "길리먼이 가져온 인도미투스 보급 대장과 블러드 엔젤 후계 챕터들의 손실표를 빈틈없이 대조해 핵심 성계 군수 라인의 실권을 확보했다. 거대한 세대 교체의 한복판에서 막대한 영향력을 손에 쥐었다.",
          stats: { Int: 8, Inf: 9 },
          align: { ruthless: 8, humane: -3 },
          addTags: ["met_dante", "met_guilliman", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "프라이마크의 냉철한 감사망에 무리한 물자 배정 시도가 적발되어 날카로운 문책과 권한 축소를 당했다.",
          stats: { Inf: -4, Int: 2 },
          align: { ruthless: 5 },
          addTags: ["met_dante", "met_guilliman", "crossover_oath"]
        }
      },
      {
        label: "폐허가 된 아르크스 안젤리쿰 외곽에서 경례를 올리며 암흑 성역의 새 시대를 묵묵히 증언한다",
        effect: {
          text: "죽음마저 허락받지 못한 천오백 년의 노장이 다시 황금 가면을 고쳐 쓰는 뒷모습과, 그 곁을 지키는 부활한 프라이마크의 결의를 평생 가슴에 새겼다.",
          stats: { WP: 3, Int: 3, Inf: 2 },
          faith: 3,
          align: { dogmatic: 3, humane: 3 },
          addTags: ["met_dante", "met_guilliman", "baal_survivor", "crossover_oath"]
        }
      }
    ],
    source: "The Devastation of Baal / Darkness in the Blood / Lexicanum: Luis Dante / Roboute Guilliman"
  },
  {
    id: "ev_s19a_xover_guilliman_cawl",
    title: "프라이머리스의 대가와 화성의 밀약 — 로부테 길리먼과 벨리사리우스 카울",
    category: "전설의 교차",
    once: true,
    characters: ["guilliman", "cawl"],
    req: {
      minAge: 16,
      minYear: 1001,
      maxYear: 1025,
      greatRift: true,
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "imperial_nihilus", "dreadnought", "abhuman", "ogryn", "ratling", "living_saint", "grey_knight", "custodes", "fabricator_general"
      ],
      or: [
        { anyWorlds: ["terra", "mars", "macragge"] },
        { anyTags: ["mechanicus", "astartes", "inquisitor", "inquisition_agent", "administratum", "high_lord_terra", "officer", "navy", "rogue_trader", "noble", "sororitas", "ecclesiarchy", "imperial_knight", "navigator", "indomitus_crusader"] }
      ]
    },
    reqLabel: "001~025.M42 · 대균열 이후 · 임페리움 상크투스 · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "인도미투스 성전 기함 '마크라그의 영예' 깊숙한 봉인 회의실. 수많은 기계 촉수와 현자의 로브를 두른 아크마고스 도미누스 벨리사리우스 카울이 프라이마크 로부테 길리먼과 팽팽히 맞서고 있었다. 길리먼은 카울이 함내에 설치해 둔 원격 대리 장치 '카울 인페리어'의 금지된 지능 의혹과 배신자 군단 진시드 활용 요청을 날카롭게 추궁했고, 카울은 프라이머리스 스페이스 마린과 대균열을 봉쇄할 블랙스톤 연구 전권 없이는 인류가 생존할 수 없다며 화성 보수파의 견제를 일축했다. 봉인 회의에 배석한 그대에게 두 거물의 질문이 동시에 날아든다.",
    choices: [
      {
        label: "[지성 판정] 프라이머리스 보급 효율과 화성 교리 충돌의 절충 감사안을 제시한다",
        req: { anyTags: ["mechanicus", "astartes", "inquisitor", "administratum", "high_lord_terra"] },
        check: { stat: "Int", diff: -6 },
        success: {
          text: "카울의 블랙스톤 실험을 성전군 직속 감찰 편제로 분리하되 금지된 진시드 전용은 영구 봉인하는 절묘한 감사 보고서를 올렸다! 길리먼이 깊은 만족감을 표했고, 카울마저 이진법 웃음으로 그대의 연산력을 인정했다.",
          stats: { Int: 9, Inf: 8, WP: 4 },
          align: { dogmatic: 5, humane: 4 },
          addTags: ["met_guilliman", "met_cawl", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "화성 보수파와 카울 지지파 양쪽의 교리 논쟁에 끼여 호된 질책을 받았으나, 핵심 성전 보급표만은 끝내 지켜 냈다.",
          stats: { Int: 3, Inf: -3 },
          align: { dogmatic: 3 },
          addTags: ["met_guilliman", "met_cawl", "crossover_oath"]
        }
      },
      {
        label: "[의지 판정] 기술 이단과 자의식 기계의 위험을 직언하며 길리먼의 엄격한 통제선을 지지한다",
        check: { stat: "WP", diff: -6 },
        success: {
          text: "'카울 인페리어'가 본인의 통제를 벗어나 독자 판단을 내릴 위험을 정면으로 지적하자 카울의 기계 눈이 서늘하게 빛났으나, 길리먼이 고개를 끄덕이며 그대에게 성전군 기술 감찰 권한을 부여했다.",
          stats: { WP: 8, Inf: 8, Int: 4 },
          faith: 7,
          align: { dogmatic: 9, ruthless: -2 },
          addTags: ["met_guilliman", "met_cawl", "indomitus_crusader", "crossover_oath"]
        },
        fail: {
          text: "카울의 방대한 만 년 기억 데이터에 논리가 역공당해 회의실에서 체면을 구겼다. 다만 원칙을 꺾지 않은 기개는 길리먼의 기억에 남았다.",
          stats: { Inf: -3, WP: 3 },
          align: { dogmatic: 6 },
          addTags: ["met_guilliman", "met_cawl", "crossover_oath"]
        }
      },
      {
        label: "[권위 판정] 카울의 비밀 블랙스톤 실험 데이터를 확보하는 조건으로 암묵적 협조 라인을 구축한다",
        check: { stat: "Inf", diff: -6 },
        success: {
          text: "회의 뒤 카울과 은밀한 이진법 암호를 교환해 대균열 봉쇄 연구의 최신 기술과 막대한 후원을 끌어냈다. 길리먼의 감시선 아슬아슬한 경계에서 전례 없는 실리를 거두었다.",
          stats: { Inf: 10, Int: 8 },
          align: { ruthless: 9, dogmatic: -4 },
          addTags: ["met_guilliman", "met_cawl", "crossover_oath"]
        },
        fail: {
          text: "은밀한 접촉이 길리먼 직속 정보망의 눈에 걸려 엄중한 경고를 받았고, 카울 역시 시치미를 떼며 손을 떼 버렸다.",
          stats: { Inf: -5, WP: 2 },
          align: { ruthless: 5, dogmatic: -3 },
          addTags: ["met_guilliman", "met_cawl", "crossover_oath"]
        }
      },
      {
        label: "두 거물의 논쟁에 끼어들지 않고 확정된 성전군 보급 현안과 공식 의정만 냉정히 점검한다",
        effect: {
          text: "만 년의 야망을 품은 대현자와 제국을 떠받치는 프라이마크 사이의 서늘한 긴장을 온몸으로 체감하며, 공식 의정 검토만 깔끔히 마치고 회의를 마무리했다.",
          stats: { Int: 3, WP: 3, Inf: 2 },
          align: { dogmatic: 2, humane: 2 },
          addTags: ["met_guilliman", "met_cawl", "crossover_oath"]
        }
      }
    ],
    source: "Dark Imperium / Belisarius Cawl: The Great Work / Lexicanum: Belisarius Cawl / Roboute Guilliman"
  },
  {
    id: "ev_s19a_xover_calgar_abaddon",
    title: "복수의 영혼 아래의 결투 — 마르네우스 칼가와 약탈자 아바돈",
    category: "전설의 교차",
    once: true,
    characters: ["calgar", "abaddon"],
    req: {
      minAge: 16,
      minYear: 1008,
      maxYear: 1015,
      greatRift: true,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["custodes", "high_lord_terra", "dreadnought"],
      or: [
        { anySegmenta: ["obscurus"] },
        { anyTags: ["astartes", "militarum", "sororitas", "navy", "imperial_knight", "inquisitor", "inquisition_agent", "vigilus_veteran", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] }
      ]
    },
    reqLabel: "008~015.M42 · 대균열 이후 · 비질루스 전쟁기 · 16세 이상",
    weight: 35,
    text: "나흐문트 건틀릿의 요충지 비질루스 행성이 불타는 가운데, 궤도를 뒤덮은 기함 '복수의 영혼' 아래로 블랙 리전 대군이 강하했다. '호루스의 발톱'과 비명을 지르는 마검 '드라크니옌'을 쥔 약탈자 아바돈이 방어선 중앙을 짓밟고 들어서자, 루비콘 프라이머리스 개조를 마치고 푸른 그라비스 파워 아머('헤라클루스의 갑주')를 두른 울트라마린 챕터 마스터 마르네우스 칼가가 '울트라마의 건틀릿'을 치켜들고 정면으로 막아 섰다! 칼가는 아엘다리(사임-한)의 은폐장을 두른 자폭 화선이 궤도의 '복수의 영혼'을 들이받을 때까지 목숨을 걸고 워마스터의 발을 묶으려 한다.",
    choices: [
      {
        label: "[백병 판정] 마르네우스 칼가의 측면을 사수하며 블랙 리전 친위대의 포위를 지연시킨다",
        req: { excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WS", diff: -8 },
        success: {
          text: "치명상을 입고도 끝까지 물러서지 않는 칼가의 곁에서 블랙 리전 터미네이터의 협공을 끊어 냈다! 궤도의 '복수의 영혼'이 은폐 자폭 화선의 충돌에 흔들리며 아바돈이 강제 철수하는 순간까지 나흐문트 회랑을 지켜 냈다.",
          stats: { WS: 8, T: 5, Inf: 9 },
          faith: 8,
          wounds: -14,
          align: { dogmatic: 9, ruthless: -2 },
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        },
        fail: {
          text: "드라크니옌이 뿜은 어둠의 충격파와 블랙 리전의 포화에 휩쓸려 중상을 입었으나, 칼가가 시간을 버는 동안 전선이 완전히 무너지지는 않았다.",
          wounds: -26,
          stats: { WS: 3, T: 3 },
          align: { dogmatic: 6 },
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 궤도 은폐 화선의 유도 표식을 점화해 '복수의 영혼' 사각을 연다",
        req: { excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "Int", diff: -6 },
        success: {
          text: "블랙 리전 텔레포트 교란망을 역추적해 은폐 자폭 화선의 최종 돌입 표식을 점화했다! '복수의 영혼' 선체가 거대한 화염에 휩싸이며 아바돈이 울며 겨자 먹기로 철수했고, 칼가는 그대의 냉철한 공조에 깊은 경의를 표했다.",
          stats: { Int: 8, Fel: 5, Inf: 8 },
          faith: 5,
          align: { humane: 7, dogmatic: 4 },
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        },
        fail: {
          text: "궤도 중계탑에서 블랙 리전 침투조의 매복에 걸려 깊은 상처를 입었으나, 보조 유도 신호만은 끝내 궤도로 쏘아 올렸다.",
          wounds: -20,
          stats: { Int: 3, T: 2 },
          align: { dogmatic: 5 },
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        }
      },
      {
        label: "[백병 판정 · 이단] 워마스터 아바돈의 선봉에 서서 울트라마린 방어선의 측면을 짓밟는다",
        req: { anyTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WS", diff: -6 },
        success: {
          text: "아바돈이 칼가의 그라비스 갑주를 찢어발기는 동안 그대는 울트라마린 지원 분대를 돌파해 제국 방어선 절반을 불바다로 만들었다! 비록 궤도 기습 탓에 본대가 철수했으나 워마스터 앞에 두려운 공적을 새겼다.",
          stats: { WS: 8, Inf: 10, WP: 4 },
          corruption: 12,
          align: { ruthless: 10, humane: -5 },
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        },
        fail: {
          text: "울트라마린 명예 경비대의 처절한 반격에 중상을 입고 텔레포트 섬광 속에 간신히 회수되었다.",
          wounds: -24,
          corruption: 8,
          stats: { WS: 3 },
          align: { ruthless: 6 },
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        }
      },
      {
        label: "결투 충격파의 직격 반경에서 이탈해 전선 지휘망에 교전 추이를 타전하며 전력을 보전한다",
        effect: {
          text: "드라크니옌의 번개와 울트라마의 건틀릿이 맞부딪히는 파괴 반경 밖으로 물러나, 전황 변화와 궤도 교전 추이를 정확히 상부에 보고하며 생존했다.",
          stats: { WP: 4, Ag: 3, Int: 3 },
          wounds: -10,
          addTags: ["met_calgar", "met_abaddon", "vigilus_veteran", "crossover_oath"]
        }
      }
    ],
    source: "Imperium Nihilus: Vigilus Ablaze / Lexicanum: Marneus Calgar / Ezekyle Abaddon"
  },
  {
    id: "ev_s19a_xover_guilliman_mortarion",
    title: "역병의 정원 이악스의 격돌 — 로부테 길리먼과 데몬 프라이마크 모타리온",
    category: "전설의 교차",
    once: true,
    characters: ["guilliman", "mortarion"],
    req: {
      minAge: 16,
      minYear: 1013,
      maxYear: 1016,
      greatRift: true,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["imperial_nihilus", "high_lord_terra", "dreadnought"],
      or: [
        { anySegmenta: ["ultima"] },
        { anyWorlds: ["macragge"] },
        { anyTags: ["astartes", "militarum", "sororitas", "navy", "imperial_knight", "inquisitor", "inquisition_agent", "plague_war_vet", "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] }
      ]
    },
    reqLabel: "013~016.M42 · 대균열 이후 · 역병 전쟁기 · 16세 이상",
    weight: 35,
    text: "한때 울트라마의 치유 낙원이었던 정원 행성 이악스가 썩어 내리는 녹색 늪으로 변해 버렸다. 찢어진 나방 날개와 대낫 '침묵'을 휘두르는 데몬 프라이마크 모타리온이 프라이마크마저 쓰러뜨리는 워프 역병 '신살의 역병'을 품고 내려앉자, 황제의 불타는 검을 뽑아 든 로부테 길리먼이 정면으로 격돌했다! 반신 형제가 맞부딪힐 때마다 하늘에서 황금 화염과 녹색 독안개가 번갈아 쏟아지며, 너글의 역병 시계가 울트라마 전체를 워프 속으로 끌어당기기 시작한다.",
    choices: [
      {
        label: "[의지 판정] 황제의 검이 뿜어 내는 성광에 호응해 이악스 성소 앞 데스 가드 전열을 돌파한다",
        req: { excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "이악스 대기를 찢고 폭발한 황제의 성광 아래 데스 가드 포위망을 돌파해 길리먼의 반격로를 열었다! 창백한 왕이 너글의 정원으로 쫓겨나고 울트라마가 해방되는 기적의 순간을 끝내 함께했다.",
          stats: { WP: 9, WS: 5, Inf: 9 },
          faith: 14,
          corruption: -10,
          wounds: -12,
          align: { dogmatic: 10, ruthless: -3 },
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "crossover_oath"]
        },
        fail: {
          text: "역병 시계의 불길한 진동과 독성 파편에 가슴을 얻어맞고 쓰러졌으나, 황제의 검에서 번진 성광의 여파 덕분에 타락만은 면하고 구조되었다.",
          wounds: -24,
          stats: { WP: 4, T: 2 },
          faith: 6,
          align: { dogmatic: 6 },
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "crossover_oath"]
        }
      },
      {
        label: "[지성 판정] 역병 가마솥의 워프 공명을 교란해 '신살의 역병' 확산을 끊고 해독 표본을 회수한다",
        req: { excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "Int", diff: -8 },
        success: {
          text: "대부정자 쿠가스의 역병 가마솥에 연결된 의식 도관을 파괴해 '신살의 역병' 확산을 차단하고 울트라마 의무단이 쓸 귀중한 해독 표본까지 확보했다! 수많은 행성을 구원한 냉철한 기지가 연대기에 새겨졌다.",
          stats: { Int: 8, WP: 6, Fel: 5 },
          faith: 7,
          wounds: -10,
          align: { humane: 10, ruthless: -4 },
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "macro_mercy_sanctuary", "crossover_oath"]
        },
        fail: {
          text: "역병 가마솥 주변의 독성 증기가 분출해 큰 화상을 입었으나, 공명 회로 절반을 끊어 내며 울트라마 전선의 숨통은 틔워 냈다.",
          wounds: -22,
          stats: { Int: 3, T: 2 },
          align: { humane: 7 },
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "crossover_oath"]
        }
      },
      {
        label: "[백병 판정 · 이단] 모타리온의 데스슈라우드 친위대 측면을 따라 울트라마린 엄호진을 분쇄한다",
        req: { anyTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WS", diff: -6 },
        success: {
          text: "창백한 왕이 길리먼에게 '신살의 역병'을 주입하는 틈을 타 데스슈라우드 친위대와 합류해 울트라마린 엄호진을 갈아 버렸다! 황금 성광이 터져 전장이 뒤집히는 찰나에도 배신자 군단 사이에 두려운 무훈을 각인시켰다.",
          stats: { WS: 8, T: 5, Inf: 9 },
          corruption: 14,
          align: { ruthless: 9, humane: -5 },
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "crossover_oath"]
        },
        fail: {
          text: "황제의 성광과 역병 파동이 충돌한 충격파에 큰 상처를 입고 워프 퇴각선으로 간신히 기어올랐다.",
          wounds: -24,
          corruption: 10,
          stats: { WS: 3 },
          align: { ruthless: 6 },
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "crossover_oath"]
        }
      },
      {
        label: "황금 화염과 녹색 독기가 교차하는 격돌 반경에서 물러나 전선 재편 좌표를 확보한다",
        effect: {
          text: "두 반신이 맞부딪히며 지형이 통째로 뒤틀리는 이악스 중심부를 벗어나, 전선 재편에 필요한 교전 좌표를 끝까지 보전하며 살아남았다.",
          stats: { Ag: 3, WP: 4, Int: 3 },
          wounds: -10,
          addTags: ["met_guilliman", "met_mortarion", "plague_war_vet", "crossover_oath"]
        }
      }
    ],
    source: "Dark Imperium: Godblight / Lexicanum: Plague Wars / Roboute Guilliman / Mortarion"
  }
];

