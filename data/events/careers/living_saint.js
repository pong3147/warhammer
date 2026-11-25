// 분기 사건 — 직군 계열: 살아 있는 성인 (기적의 그릇 · 임페리얼 리빙 세인트 승천)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_s17_snt_hereticus_inquiry",
    title: "오르도 헤레티쿠스의 심문 — 성광의 기적인가, 미인가 사이커인가",
    category: "기적의 그릇",
    once: true,
    req: {
      anyCareers: ["saint_vessel"],
      allTags: ["saint_vessel", "living_miracle"]
    },
    reqLabel: "직군: 기적의 그릇 · 살아 있는 기적",
    weight: 38,
    text: "전선에서 그대의 손끝을 감싼 황금빛 기적이 소문으로 퍼지자, 검은 외투를 두른 오르도 헤레티쿠스 이단심문관과 아뎁타 소로리타스 호위대가 성당 지하 심문실로 그대를 소환했다. 인류제국에서 승인받지 못한 이적은 악마의 기만이거나 미인가 사이커의 요술과 종이 한 장 차이로 취급된다. 차가운 대리석 방 한가운데에는 사이킥 파동을 모조리 꺼뜨리는 워프 억제 장치가 윙윙거리며 가동되고 있었고, 이단심문관은 장미 문장을 들어 올리며 그대의 빛이 진정 황금 옥좌에서 비롯된 것인지 증명하라고 명했다.",
    choices: [
      {
        label: "[의지 판정] 태생부터 품어 온 성흔의 불꽃을 숨기지 않고 워프 억제장 한복판에서 황제의 찬송을 올린다",
        req: { allTags: ["saint_spark"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "보통의 사이커라면 피를 토하며 쓰러졌을 워프 억제장 속에서도 그대의 영혼에 깃든 성흔의 불꽃은 흔들림 없이 맑은 황금빛으로 타올랐다. 계측기가 단 한 점의 워프 오염도 잡지 못하자 이단심문관이 먼저 무릎을 꿇으며 성역 심문소의 공인을 선포했다.",
          stats: { WP: 6, Fel: 5, Inf: 8 },
          faith: 10,
          corruptionReset: true,
          align: { dogmatic: 4, humane: 4 }
        },
        fail: {
          text: "억제장의 메마른 파동이 필멸의 신경을 거세게 찢어 놓으며 그대는 각혈 끝에 무릎을 꺾었다. 다행히 오염 흔적은 전혀 검출되지 않아 화형은 면했으나, 당분간 심문소의 엄중한 감시 아래 놓이게 되었다.",
          wounds: -14,
          stats: { WP: 2, Inf: -3 },
          faith: 4
        }
      },
      {
        label: "[의지 판정] 워프 억제장과 심문관의 차가운 시선을 정면으로 받아들이며 순수한 신앙으로 기적의 진위를 입증한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "억제 장치가 최고 출력으로 울부짖는 순간에도 그대의 두 손에서 솟은 온화한 황금빛은 사그라들지 않고 오히려 지하실의 냉기를 녹였다. 이단심문관은 조용히 심문 조서에 성화 인장을 찍으며 오펠리아 VII과 성역 교구에 그대의 이름을 보고했다.",
          stats: { WP: 6, Inf: 6, Fel: 4 },
          faith: 8,
          corruption: -10,
          align: { dogmatic: 6 }
        },
        fail: {
          text: "사흘 밤낮 이어진 불면 심문과 정화의 매질을 견디다 끝내 탈진해 쓰러졌다. 비록 이단 혐의는 벗었으나 성역 관료들 사이에 의구심이 남아 한동안 활동이 위축되었다.",
          wounds: -16,
          stats: { T: 2, Inf: -4 },
          faith: 3
        }
      },
      {
        label: "[교섭 판정] 기적을 목격한 부상병과 순례자들의 증언을 내세우며 신앙이 구해 낸 생명의 무게를 호소한다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "심문실 밖까지 줄을 선 부상병들과 수녀들이 워프의 악취 대신 포근한 빛과 평온만을 느꼈다고 눈물로 증언했다. 냉혹하던 이단심문관조차 흔들림 없는 증언 앞에 족쇄를 거두고 조건부 사면을 허락했다.",
          stats: { Fel: 6, Inf: 5, WP: 3 },
          faith: 7,
          corruption: -8,
          align: { humane: 7 }
        },
        fail: {
          text: "이단심문관은 군중의 눈물을 위험한 집단 최면으로 치부하며 고된 고행 감금을 명했다. 깊은 피로와 상처를 안고 풀려났지만 순례자들의 신뢰만큼은 꺾이지 않았다.",
          wounds: -12,
          stats: { Inf: -4, Fel: 2 },
          align: { humane: 3 }
        }
      },
      {
        label: "어떤 변명도 거부하고 묵묵히 무릎을 꿇은 채 오직 황제의 심판만이 진실을 밝힐 것이라 고백한다",
        effect: {
          text: "얼음장 같은 침묵 속에서 며칠간의 감찰이 흘러갔고, 어떠한 불경한 징후도 드러나지 않자 심문소는 결국 그대를 석방했다. 화려한 칭송 대신 묵직한 겸허와 강철 같은 신앙이 가슴에 남았다.",
          stats: { WP: 4, T: 2 },
          faith: 6,
          corruption: -6,
          align: { dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Living Saint / Codex: Adepta Sororitas / Inquisition Lore"
  },
  {
    id: "ev_s17_snt_shrine_pilgrimage",
    title: "성지 행성의 갈림길 — 굶주린 순례자들과 추기경의 성전령",
    category: "기적의 그릇",
    once: true,
    req: {
      anyCareers: ["saint_vessel"]
    },
    reqLabel: "직군: 기적의 그릇",
    weight: 40,
    text: "이단의 침공으로 황폐해진 성지 행성의 대성당 앞마당에 수만 명의 굶주리고 병든 순례자들이 몰려들어 기적의 그릇을 부르며 오열하고 있다. 그러나 성당 내부의 진홍빛 법의를 두른 에클레시아키 추기경은 비축 식량을 풀라는 청원을 일축한 채, 지금 당장 그대가 전쟁 설교단에 올라 이 군중의 광신을 불태워 해가 지기 전 이단 요새로 총돌격하게 만들라고 요구한다. 헐벗은 생명을 품을 것인가, 불타는 정화의 칼날을 앞세울 것인가. 그대의 성광이 어떤 위상으로 굳어질지 결정되는 순간이다.",
    choices: [
      {
        label: "[교섭 판정] 추기경의 돌격령을 가로막고 성당 비축 창고를 열어 굶주린 순례자들을 치유하며 자비의 성광을 품는다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "그대가 열병에 쓰러진 순례자의 이마에 손을 얹자 온화한 황금빛이 광장 전체로 번져 나가며 고통을 잠재웠다. 수만 신도의 눈물 어린 경배 앞에서 추기경마저 끝내 창고 열쇠를 내놓았고, 그대의 영혼에 자비의 성광이 선명히 각인되었다.",
          stats: { Fel: 7, WP: 6, Inf: 5 },
          faith: 10,
          corruptionReset: true,
          align: { humane: 12, dogmatic: -3 },
          addTags: ["saint_mercy_aspect"]
        },
        fail: {
          text: "격분한 추기경의 성당 경비대가 무력으로 그대를 밀어붙이며 몸싸움 끝에 깊은 타박상과 자상을 입혔다. 그러나 피를 흘리면서도 약자를 감싼 모습에 순례자들이 스스로 몸을 던져 그대를 지켜 냈고, 자비의 성광이 꺾이지 않고 싹텄다.",
          wounds: -15,
          stats: { WP: 4, Inf: -3 },
          faith: 6,
          align: { humane: 10 },
          addTags: ["saint_mercy_aspect"]
        }
      },
      {
        label: "[의지 판정] 성당의 성검을 치켜들고 정화의 찬가를 외치며 추기경과 함께 이단 요새를 불태울 심판의 성광을 점화한다",
        check: { stat: "WP", diff: -8 },
        success: {
          text: "눈부신 황금 불꽃이 대성당 계단 위로 솟구치자 절망에 잠겼던 군중의 눈빛이 타오르는 성전의 투지로 바뀌었다. 선두에 서서 이단 요새의 성문을 단숨에 분쇄한 그날, 그대의 영혼에 두려운 심판의 성광이 뿌리를 내렸다.",
          stats: { WS: 6, WP: 7, Inf: 6 },
          faith: 10,
          corruptionReset: true,
          align: { dogmatic: 12, humane: -3 },
          addTags: ["saint_wrath_aspect"]
        },
        fail: {
          text: "준비가 덜 된 돌격대가 이단의 중화기 화망에 정면으로 걸려들며 큰 출혈을 치렀다. 화상과 파편에 온몸이 찢기면서도 기어이 불타는 깃발을 성벽 위에 꽂으며 심판의 성광을 피로 증명했다.",
          wounds: -18,
          stats: { WS: 3, WP: 4, Fel: -2 },
          faith: 6,
          align: { dogmatic: 10 },
          addTags: ["saint_wrath_aspect"]
        }
      },
      {
        label: "노약자와 부상자를 성소 안에 남기고 자원한 신도들만 편성해 성당 방어선부터 단단히 구축한다",
        effect: {
          text: "무모한 소모전도, 방관도 택하지 않고 대성당 외곽을 철통같이 다져 이단의 야습을 막아 냈다. 아직 어느 한쪽의 위상으로 기울지 않은 채 순수한 신앙의 불씨를 고요히 간직했다.",
          stats: { Int: 4, WP: 5, Fel: 4 },
          faith: 7,
          corruption: -6,
          align: { humane: 4, dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Shrine World / Codex: Adepta Sororitas / Sabbat Martyr"
  },
  {
    id: "ev_s17_snt_martyrdom_breach",
    title: "순교의 성문 — 무너지는 대성당 성벽과 카오스 전투단",
    category: "기적의 그릇",
    once: true,
    req: {
      anyCareers: ["saint_vessel"]
    },
    reqLabel: "직군: 기적의 그릇",
    weight: 38,
    text: "포위된 성당 도시의 외곽 방벽이 카오스 전투단의 중포격에 무너져 내렸다. 박살 난 쌍두 독수리 색유리 파편 사이로 타락한 기갑 전사들과 광란의 이교도 무리가 밀물처럼 쏟아져 들어오고, 탄약이 바닥난 방위군 전열이 공포에 질려 흩어지기 시작했다. 기적의 그릇이라 불리는 그대의 필멸의 육신은 이미 한계까지 지쳐 떨리고 있으나, 뼛속 깊은 곳에서 황금 옥좌의 장엄한 합창이 울려 퍼지며 순교의 문턱을 두드린다.",
    choices: [
      {
        label: "[백병 판정] 무너진 성문 한복판에 홀로 걸어 나가 성광이 깃든 검으로 카오스 전투단의 선봉을 막아 선다",
        check: { stat: "WS", diff: -12 },
        success: {
          text: "그대가 휘두른 검에서 뿜어져 나온 황금 호광이 타락한 갑주를 두 동강 내며 선봉의 투사들을 뒤로 밀어냈다. 쓰러지지 않는 기적을 목격한 제국 장병들이 함성과 함께 전열을 되찾으며 성문을 완전히 틀어막았다.",
          stats: { WS: 7, WP: 8, Fel: 6, Inf: 6 },
          faith: 12,
          corruptionReset: true,
          align: { dogmatic: 7 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "타락한 체인액스가 옆구리를 깊게 베고 무너진 석재가 어깨를 짓눌렀으나, 그대는 피투성이가 된 채로 한 걸음도 물러서지 않았다. 지원군이 도착할 때까지 성문을 지킨 대가로 심각한 중상을 입었지만 영혼만은 티끌 없이 맑아졌다.",
          wounds: -20,
          stats: { WP: 5, T: 3 },
          faith: 8,
          corruptionReset: true,
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[의지 판정] 부상병들과 피난민들의 퇴로 뒤에 서서 황금빛 신앙의 방벽을 펼쳐 카오스 주술과 포화를 받아 낸다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "사악한 녹색 불길과 파편 세례가 그대가 펼친 보이지 않는 황금 방벽에 부딪혀 눈부신 불티로 흩어졌다. 수백 명의 목숨이 내성 안으로 무사히 대피하는 동안 그대의 영혼은 필멸의 한계를 넘어설 만큼 순결하게 정련되었다.",
          stats: { WP: 9, Fel: 7, Inf: 5 },
          faith: 14,
          corruptionReset: true,
          align: { humane: 8 },
          addTags: ["living_miracle"]
        },
        fail: {
          text: "적 주술사의 저주가 방벽을 뚫고 들어오며 그대는 피를 토한 채 성당 바닥에 쓰러졌다. 짧은 시간이나마 퇴로를 열어 수많은 이들을 살려 냈으나 육신은 깊은 탈진과 상처에 시달렸다.",
          wounds: -18,
          stats: { WP: 4, Fel: 4 },
          faith: 8,
          corruptionReset: true,
          align: { humane: 6 }
        }
      },
      {
        label: "[강인 판정] 무너지는 성벽 기둥 아래에서 성가를 멈추지 않으며 최후의 순간까지 제국 군기를 붙들고 버틴다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "자욱한 연기와 쏟아지는 파편 속에서도 꺾이지 않는 찬송가가 폐허를 울렸다. 새벽녘까지 버텨 낸 신앙의 깃발 아래 카오스 공세가 마침내 꺾였고, 그대의 육신과 의지는 더 큰 승천을 감당할 그릇으로 단련되었다.",
          stats: { T: 6, WP: 7, Fel: 6 },
          faith: 12,
          corruptionReset: true,
          align: { dogmatic: 4, humane: 4 }
        },
        fail: {
          text: "부러진 갈비뼈와 연기에 그을린 폐를 안은 채 끝내 의식을 잃고 말았다. 의무병들이 잔해 속에서 그대를 꺼냈을 때 상처 자리마다 희미한 황금빛 흉터가 남아 있었다.",
          wounds: -22,
          stats: { T: 3, WP: 4 },
          faith: 6,
          corruptionReset: true
        }
      },
      {
        label: "무리한 단독 결사 대신 남은 방위군 분대장들과 호흡을 맞춰 좁은 성당 회랑으로 적을 유인해 지연전을 지휘한다",
        effect: {
          text: "냉철한 지휘와 흔들림 없는 기도가 좁은 회랑을 난공불락의 살상 지대로 바꿨다. 궤도 포격 지원이 닿을 때까지 성당을 지켜 내며 장병들의 깊은 신뢰와 흔들리지 않는 신앙을 얻었다.",
          stats: { Int: 4, WP: 5, Fel: 5 },
          faith: 9,
          corruptionReset: true,
          align: { humane: 4 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Celestine: The Living Saint / Sabbat Martyr"
  },
  {
    id: "ev_s17_snt_aspect_awakening",
    title: "전장 위의 황금 날개 — 살아 있는 성인의 위상 각성",
    category: "살아 있는 성인",
    once: true,
    req: {
      anyCareers: ["living_saint"]
    },
    reqLabel: "직군: 살아 있는 성인",
    weight: 40,
    text: "검은 포연으로 뒤덮인 전장 상공의 먹구름이 양피지처럼 갈라지며, 살아 있는 성인으로 승천한 그대의 등 뒤로 눈부신 황금 날개가 활짝 펼쳐졌다. 지상의 제국군 연대들은 무기를 쥔 채 눈물을 흘리며 무릎을 꿇고, 악마의 무리들은 타오르는 성광 앞에 비명을 지르며 뒷걸음질친다. 제국 역사 속 모든 살아 있는 성인이 그러했듯, 지금 그대의 존재는 황금 옥좌의 두 얼굴 가운데 하나를 세상에 새길 기로에 섰다. 상처 입은 인류를 안아 주는 자비의 성광인가, 적을 남김없이 태우는 심판의 성광인가.",
    choices: [
      {
        label: "[의지 판정] 기적의 그릇 시절부터 길러 온 고유한 성광의 위상을 하늘 끝까지 확장해 전장 전체를 황제의 축복으로 덮는다",
        req: { anyTags: ["saint_mercy_aspect", "saint_wrath_aspect"] },
        check: { stat: "WP", diff: -12 },
        success: {
          text: "필멸의 시련 속에서 이미 단련해 온 고유한 위상이 불멸의 날개와 공명하며 지평선 끝까지 번져 나갔다. 아군의 피로가 단숨에 씻겨 나가고 적의 워프 소환진이 눈 녹듯 붕괴하는 장관 앞에 전선의 모든 이가 살아 있는 성인의 강림을 증언했다.",
          stats: { WP: 8, Fel: 7, WS: 5, Inf: 8 },
          faith: 10,
          wounds: 20
        },
        fail: {
          text: "갓 현현한 성인의 형상이 감당하기 벅찬 빛을 한꺼번에 쏟아낸 탓에 황금 후광 일부가 불꽃처럼 흩어지며 격심한 고통이 밀려왔다. 잠시 휘청였으나 전세를 뒤집는 데에는 부족함이 없었다.",
          wounds: -18,
          stats: { WP: 4, Inf: 3 },
          faith: 4
        }
      },
      {
        label: "[교섭 판정] 기적의 그릇으로 피 흘리던 필멸의 나날을 잊지 않은 채, 공포에 질린 병사들의 눈높이까지 내려와 떨리는 손을 맞잡는다",
        req: { anyPastCareers: ["saint_vessel"], excludeTags: ["saint_wrath_aspect"] },
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "찬란한 날개를 접고 진흙 참호 속으로 걸어 들어온 성광의 화신을 보며 병사들은 경외보다 깊은 안도를 느꼈다. 필멸의 두려움을 기억하는 성인의 온기가 연대 전체를 일으켜 세우며 자비의 성광을 더욱 찬란하게 밝혔다.",
          stats: { Fel: 8, WP: 6, Inf: 7 },
          faith: 9,
          wounds: 15,
          align: { humane: 8 },
          addTags: ["saint_mercy_aspect"]
        },
        fail: {
          text: "병사들의 절망을 온몸으로 끌어안는 순간 적의 집중 포격이 참호 위로 떨어졌다. 날개로 폭압을 막아 내며 깊은 상처를 입었으나 단 한 명의 병사도 곁에서 잃지 않았다.",
          wounds: -16,
          stats: { Fel: 4, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "황금 날개를 넓게 펼쳐 아군 참호와 야전 의무소를 감싸며 치유와 구원의 자비의 성광을 선언한다",
        req: { excludeTags: ["saint_wrath_aspect"] },
        effect: {
          text: "겨울 새벽을 깨우는 햇살처럼 포근하고 눈부신 광채가 무너진 참호와 의무 천막 위로 쏟아졌다. 찢긴 상처가 아물고 절망이 걷히자 제국 연대기는 그대를 황제의 자비를 품은 살아 있는 성인으로 기록하기 시작했다.",
          stats: { Fel: 4, WP: 4, Inf: 4 },
          faith: 5,
          wounds: 8,
          align: { humane: 8 },
          addTags: ["saint_mercy_aspect"]
        }
      },
      {
        label: "타오르는 황금 검을 치켜들고 적진 한복판으로 강하해 불순한 모든 것을 태우는 심판의 성광을 선언한다",
        req: { excludeTags: ["saint_mercy_aspect"] },
        effect: {
          text: "축성된 황금 유성처럼 배신자 전열 한복판에 내리꽂힌 그대의 검이 지날 때마다 이단자와 악마들이 하얀 재로 흩어졌다. 제국 장병들은 전율 속에 함성을 터뜨리며 황금 옥좌의 심판이 강림했음을 선포했다.",
          stats: { WS: 5, WP: 4, Inf: 3 },
          faith: 5,
          align: { dogmatic: 8 },
          addTags: ["saint_wrath_aspect"]
        }
      },
      {
        label: "이미 영혼에 깃든 성광의 위상을 고요히 가다듬으며 전장 위의 장병들에게 흔들리지 않는 축복을 내린다",
        effect: {
          text: "서두르지도 과시하지도 않은 성광이 전장 전역으로 차분히 번져 나가며 장병들의 공포를 씻어 냈다. 이미 가슴에 뿌리내린 위상이 황금 날개와 어우러져 한층 깊고 단단한 빛을 발했다.",
          stats: { WP: 4, Fel: 3, Inf: 3 },
          faith: 5,
          wounds: 8
        }
      }
    ],
    source: "Lexicanum: Living Saint / Celestine: The Living Saint / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s17_snt_mercy_sanctuary",
    title: "자비의 성광 — 굶주린 폭도들과 국교의 숙청령",
    category: "살아 있는 성인",
    alignBias: "humane",
    once: true,
    req: {
      anyCareers: ["living_saint"],
      excludeTags: ["saint_wrath_aspect"],
      or: [
        { allTags: ["saint_mercy_aspect"] },
        { anyDominantAlign: ["humane"] }
      ]
    },
    reqLabel: "직군: 살아 있는 성인 · 자비의 성광 또는 자비 주성향",
    weight: 38,
    text: "탐욕스러운 첨탑 귀족들이 식량 십일조를 빼돌려 극심한 기근에 빠진 하이브 월드에서, 굶주림에 내몰린 하층 노동자 수만 명이 결국 곡물 창고를 부수고 말았다. 이를 명백한 반역과 이단 선동으로 규정한 에클레시아키 대고해사는 중화염방사기로 무장한 광신 민병대를 동원해 하층 거주 구역 전체를 통째로 불태울 숙청령을 내렸다. 황금 날개를 펼치고 화염방사기 전열과 울부짖는 군중 사이에 내려선 그대를 향해, 대고해사는 제국의 법도에 반항한 자들을 감싸는 것은 월권이라며 소리 높여 항변한다.",
    choices: [
      {
        label: "[권위 판정] 자비의 등불로 쌓아 올린 권위로 대고해사의 숙청령을 즉각 무효화하고 식량을 숨긴 첨탑 귀족들의 죄악을 폭로한다",
        req: { allTags: ["align_beacon_mercy"] },
        check: { stat: "Inf", diff: -12 },
        success: {
          text: "살아 있는 성인의 준엄한 선언 앞에 광신 민병대마저 일제히 화염방사기를 내려놓고 무릎을 꿇었다. 은닉된 식량 장부가 드러나자 탐욕스러운 귀족들이 대신 사슬에 묶였고, 단 한 방울의 무고한 피도 흘리지 않은 채 하이브에 진정한 질서가 되돌아왔다.",
          stats: { Inf: 9, Fel: 8, WP: 6 },
          faith: 10,
          align: { humane: 10 },
          addTags: ["saint_mercy_aspect"]
        },
        fail: {
          text: "격분한 대고해사가 교구 시노드에 그대의 개입을 격렬히 탄핵하며 정치적 마찰이 거세졌다. 비록 구역의 학살은 막아 냈으나 국교 보수파와의 반목으로 상당한 입지와 기력을 소모했다.",
          wounds: -10,
          stats: { Inf: -6, WP: 4 },
          align: { humane: 7 }
        }
      },
      {
        label: "[교섭 판정] 황금 날개로 비무장 군중을 감싼 채 굶주림은 이단이 아니라 탐욕이 낳은 비극임을 양쪽 모두에게 설파한다",
        check: { stat: "Fel", diff: -12 },
        success: {
          text: "그대의 맑고 단호한 목소리가 광장을 울리자, 그을음 묻은 노동자들과 숙청대원들의 눈에서 동시에 눈물이 흘러내렸다. 쇠파이프와 횃불이 바닥에 떨어지며 양측이 함께 황제의 찬송을 부르는 기적 앞에 대고해사도 끝내 숙청령을 거두었다.",
          stats: { Fel: 8, WP: 6, Inf: 6 },
          faith: 9,
          align: { humane: 9 },
          addTags: ["saint_mercy_aspect"]
        },
        fail: {
          text: "광기에 눈이 먼 민병대원 한 명이 그대의 설득을 거부하고 화염방사기 방아쇠를 당겼다. 맨몸과 날개로 뜨거운 프로메튬 불길을 온전히 받아 내어 뒤편의 시민들을 살려 냈으나 혹독한 화상을 입었다.",
          wounds: -18,
          stats: { Inf: -3, Fel: 3 },
          faith: 5,
          align: { humane: 7 }
        }
      },
      {
        label: "[의지 판정] 숙청대 선두를 정면으로 가로막고 성광의 방벽을 펼쳐 모든 화염방사기의 불꽃을 잠재운다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "황금빛 파동이 광장을 스쳐 지나가자 수십 정의 화염방사기 노즐에서 타오르던 불씨가 일제히 꺼지며 무해한 금빛 불티로 바뀌었다. 황제의 뜻이 학살을 거부함을 깨달은 지휘관들이 고개를 숙이고 비상 구호 식량을 풀었다.",
          stats: { WP: 8, Fel: 5, Inf: 5 },
          faith: 8,
          align: { humane: 8 },
          addTags: ["saint_mercy_aspect"]
        },
        fail: {
          text: "피를 흘리지 않고 광신도들을 저지하려 무리하게 성광을 억누르다 큰 내상을 입었다. 다행히 뒤늦게 도착한 아르비테스 치안대가 중재에 나서며 대량 학살만큼은 막을 수 있었다.",
          wounds: -16,
          stats: { WP: 3, T: -2 },
          align: { humane: 6 }
        }
      },
      {
        label: "폭동 주동자 몇몇만 법정에 자진 출두하도록 중재하고 대다수 굶주린 시민들을 성당 보호 구역으로 안전하게 인도한다",
        effect: {
          text: "쓰라린 타협이었으나 수만 명의 무고한 생명을 화염 속에서 건져 냈다. 대고해사의 체면과 시민들의 목숨 사이에서 묵묵히 균형을 잡은 자비의 성광이 하층 구역의 밤을 지켰다.",
          stats: { Int: 4, Fel: 5, WP: 4 },
          faith: 5,
          align: { humane: 5, dogmatic: 2 }
        }
      }
    ],
    source: "Lexicanum: Living Saint / Celestine: The Living Saint / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s17_snt_wrath_warp_rift",
    title: "심판의 성광 — 대악마의 워프 균열을 향한 불타는 성전 돌격",
    category: "살아 있는 성인",
    alignBias: "dogmatic",
    once: true,
    req: {
      anyCareers: ["living_saint"],
      excludeTags: ["saint_mercy_aspect"],
      or: [
        { allTags: ["saint_wrath_aspect"] },
        { anyDominantAlign: ["dogmatic"] }
      ]
    },
    reqLabel: "직군: 살아 있는 성인 · 심판의 성광 또는 교조 주성향",
    weight: 38,
    text: "화산재가 쏟아지는 검붉은 평원 한복판에서 현실의 장막이 곪아 터지듯 갈라졌다. 울부짖는 보랏빛 워프 균열 너머에서 거대한 카오스 대악마가 불타는 황동 도끼를 휘두르며 걸어 나오자, 리만 러스 전차 중대가 종잇장처럼 찢기고 수만 제국군 전열이 극심한 공포에 얼어붙었다. 이대로 균열이 커지면 서브섹터 전체가 악마의 놀이터로 삼켜질 절체절명의 순간, 오염을 모르는 황제의 심판의 성광만이 저 불멸의 괴물과 정면으로 검을 맞댈 수 있다.",
    choices: [
      {
        label: "[백병 판정] 교조의 심판자다운 추호의 망설임도 없는 신념을 불검에 응축해 대악마의 심장을 정면으로 관통한다",
        req: { allTags: ["align_iron_dogma"] },
        check: { stat: "WS", diff: -14 },
        success: {
          text: "눈부신 황금빛과 심연의 핏빛이 격돌하며 화산 평원 전체를 뒤흔드는 충격파가 터져 나왔다. 대악마의 본체를 정면으로 갈라 낸 불검에서 정화의 불기둥이 치솟으며 괴물을 워프로 추방하고 균열을 단숨에 닫아 버렸다.",
          stats: { WS: 9, WP: 8, Inf: 8 },
          faith: 12,
          align: { dogmatic: 10 },
          addTags: ["saint_wrath_aspect", "hero_of_imperium"]
        },
        fail: {
          text: "대악마의 거대한 도끼가 성인의 황금 검을 쳐 내며 그대를 현무암 절벽에 처박았다. 빛나는 피를 흘리며 극심한 중상을 입었으나, 끈질긴 반격으로 괴물을 균열 너머로 밀어내는 데에는 끝내 성공했다.",
          wounds: -24,
          stats: { WS: 4, T: -2 },
          faith: 5,
          align: { dogmatic: 7 }
        }
      },
      {
        label: "[백병 판정] 아뎁타 소로리타스와 제국군 선봉을 이끌고 타오르는 날개로 대악마에게 급강하 돌격을 감행한다",
        check: { stat: "WS", diff: -12 },
        success: {
          text: "제국 찬송가가 악마의 포효를 집어삼키며 불타는 성전군이 워프 균열 앞으로 쇄도했다. 쉴 새 없이 이어진 황금 검격이 대악마의 현실 육신을 갈기갈기 해체하자 절망적이던 전장이 불멸의 승전으로 뒤집혔다.",
          stats: { WS: 8, WP: 6, Fel: 5, Inf: 6 },
          faith: 10,
          align: { dogmatic: 9 },
          addTags: ["saint_wrath_aspect"]
        },
        fail: {
          text: "강하 도중 사악한 워프 번개가 날개를 강타하며 선봉대와 함께 휩쓸려 떨어졌다. 깊은 상처를 입고 물러났으나 그 틈에 중포병대가 화력을 집중해 악마의 전진을 가까스로 저지했다.",
          wounds: -22,
          stats: { WS: 3, WP: 3 },
          faith: 4,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[의지 판정] 대악마와 검을 맞대는 사이 황제의 순결한 성광을 균열 핵심부에 쏟아부어 워프의 틈새 자체를 소각 봉인한다",
        check: { stat: "WP", diff: -12 },
        success: {
          text: "어떤 오염에도 물들지 않는 순백의 황금빛이 보랏빛 균열 속으로 폭포처럼 쏟아지자, 현실에 발붙일 고리를 잃은 대악마가 비명을 지르며 재로 흩어졌다. 찢겼던 하늘이 다시 닫히며 장병들의 환호가 평원을 가득 메웠다.",
          stats: { WP: 9, Inf: 6, T: 4 },
          faith: 11,
          align: { dogmatic: 8 },
          addTags: ["saint_wrath_aspect"]
        },
        fail: {
          text: "닫히려는 이차원의 거센 역류가 그대의 성스러운 형상을 갈기갈기 할퀴며 뼈아픈 소모를 안겼다. 만신창이가 되었으면서도 끝까지 불길을 거두지 않아 균열의 폭주를 억눌렀다.",
          wounds: -20,
          stats: { WP: 4, T: -2 },
          faith: 5,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "무모한 단기 결전을 피하고 성광의 깃발 아래 제국 포병과 보병 전열을 재정비해 단계적인 화망으로 악마 군단을 압박한다",
        effect: {
          text: "치밀한 교차 화망과 축성된 화염이 하급 악마들을 갈아내며 대악마를 유지하던 피의 제전을 끊어 냈다. 이윽고 현실 유지력을 잃은 대악마가 저주를 퍼부으며 워프 속으로 퇴각했다.",
          stats: { Int: 4, WP: 5, Inf: 5 },
          faith: 7,
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Lexicanum: Living Saint / Codex: Adepta Sororitas / Psychic Awakening: Faith and Fury"
  },
  {
    id: "ev_s17_snt_rebirth_weight",
    title: "불멸의 무게와 환생의 시련 — 먼지가 된 필멸의 전우들",
    category: "살아 있는 성인",
    once: true,
    req: {
      anyCareers: ["living_saint"],
      allTags: ["living_saint"]
    },
    reqLabel: "직군: 살아 있는 성인",
    weight: 36,
    text: "또 한 번의 처절한 성전에서 성인의 형상이 부서진 뒤, 그대의 의식은 실우주와 황금 옥좌 사이의 고요하고 잿빛인 공간에서 깨어났다. 끝없는 뼈와 재의 능선 위에는 한때 등을 맡기고 함께 웃던 필멸의 전우들이 남긴 메아리가 희미하게 일렁인다. 그들은 모두 늙고 죽어 이미 오래전 한 줌 먼지가 되었건만, 오직 살아 있는 성인인 그대만이 끝없는 전쟁터로 몇 번이고 다시 소환된다. 멀리 하늘 끝에서 눈부신 황금빛 부름이 다시 영혼을 잡아당기는 가운데, 환생의 문턱에서 인간다움의 조각을 얼마나 품고 돌아갈지 선택해야 한다.",
    choices: [
      {
        label: "[교섭 판정] 먼지가 된 소중한 전우의 이름과 마지막 미소를 영혼 깊숙이 품은 채, 인간을 사랑하기에 다시 돌아가겠다고 맹세한다",
        req: { allTags: ["bond_comrade"] },
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "사라진 전우와 나눈 필멸의 약속이 영겁의 차가운 재보다 뜨겁게 타올랐다. 녹은 금 같은 눈물을 뺨에 매단 채 전장으로 되돌아온 그대의 성광에는 세월이 지나도 바래지 않는 깊은 인간애가 깃들었다.",
          stats: { Fel: 9, WP: 7, Inf: 6 },
          wounds: 25,
          faith: 10,
          align: { humane: 10 }
        },
        fail: {
          text: "떠나간 전우들을 향한 그리움이 환생의 발걸음을 무겁게 붙잡으며 영혼을 찢는 통증이 밀려왔다. 차가운 돌바닥 위에 다시 형상을 맺었을 때 깊은 피로와 상처가 가시지 않았다.",
          wounds: -15,
          stats: { Fel: 4, WP: -2 },
          align: { humane: 6 }
        }
      },
      {
        label: "[의지 판정] 성인이 되기 전 손에 쥐었던 볼터와 라스건, 혹은 낡은 기도서를 떠올리며 필멸자 시절의 초심으로 시련을 돌파한다",
        req: { anyPastCareers: ["adepta_sororitas", "astra_militarum", "ecclesiarchy_priest"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "황금 날개가 돋아나기 전, 평범한 필멸의 몸으로 그저 물러서지 않겠다고 다짐했던 첫날의 기억이 잿빛 안개를 단숨에 찢어 놓았다. 초심을 되찾은 살아 있는 성인이 온전한 광채와 함께 전장에 다시 강림했다.",
          stats: { WP: 8, WS: 5, Fel: 6, Inf: 5 },
          wounds: 25,
          faith: 11,
          align: { humane: 5, dogmatic: 5 }
        },
        fail: {
          text: "과거의 작고 여렸던 자신과 지금의 거대한 성광 사이의 간극이 일순 의지를 흔들었다. 가까스로 환생에는 성공했으나 한동안 영혼의 균열이 욱신거리는 고통을 견뎌야 했다.",
          wounds: -16,
          stats: { WP: 3, Fel: -2 },
          faith: 4
        }
      },
      {
        label: "[의지 판정] 필멸의 슬픔과 그리움을 모두 황금 옥좌의 불길에 태워 바치고 오직 영원한 의무만을 안고 환생한다",
        check: { stat: "WP", diff: -12 },
        success: {
          text: "떨리던 필멸의 아픔이 금강석 같은 결의로 승화되어 사라졌다. 눈부신 빛기둥과 함께 현실 세계로 되돌아온 그대의 눈동자에는 일말의 흔들림도 없는 절대적 사명감만이 타올랐다.",
          stats: { WP: 9, WS: 6, T: 5, Inf: 6 },
          wounds: 20,
          faith: 10,
          align: { dogmatic: 9, humane: -4 }
        },
        fail: {
          text: "인간적 정을 스스로 잘라 내는 과정은 어떤 악마의 칼날보다 가혹했다. 의무는 지켜 냈으나 텅 빈 가슴과 깊은 탈진이 환생한 육신을 무겁게 짓눌렀다.",
          wounds: -18,
          stats: { Fel: -4, WP: 4 },
          faith: 5,
          align: { dogmatic: 6 }
        }
      },
      {
        label: "사라진 이름들을 조용히 기리며, 슬픔도 사명도 모두 짊어진 채 다시 빛의 부름에 응답한다",
        effect: {
          text: "필멸의 기억을 지우지도, 비탄에 무너지지도 않은 채 차분히 황금빛 지평선을 향해 걸어 나갔다. 불멸은 여전히 무거운 왕관이지만 그 아래 뛰는 마음은 꺾이지 않았다.",
          stats: { WP: 5, Fel: 5 },
          wounds: 15,
          faith: 7,
          align: { humane: 4 }
        }
      }
    ],
    source: "Celestine: The Living Saint / Lexicanum: Living Saint"
  },
  {
    id: "ev_s17_snt_nihilus_beacon",
    title: "임페리움 니힐루스의 성광 등대 — 포위된 성지 행성 철수 선단",
    category: "살아 있는 성인",
    once: true,
    req: {
      anyCareers: ["living_saint"],
      allTags: ["living_saint"],
      greatRift: true
    },
    reqLabel: "직군: 살아 있는 성인 · 대균열 이후",
    weight: 38,
    text: "시카트릭스 말레딕툼 너머 암흑의 제국에서 카오스 약탈 함대에 포위된 성지 행성이 함락 직전에 몰렸다. 불타는 궤도 방어선을 뚫고 이륙한 수십 척의 피난 수송선과 호위 함대가 비상 워프 도약을 준비하지만, 테라의 아스트로노미칸이 보이지 않는 데다 적 함대의 포격과 워프 폭풍의 경계가 앞길을 틀어막아 겔러 필드마저 위태롭게 흔들린다. 기함 성소 첨탑에 선 그대는, 꺼진 테라의 등불 대신 살아 있는 성인의 성광으로 이 절망적인 철수 선단의 탈출로를 밝혀야 한다.",
    choices: [
      {
        label: "[의지 판정] 암흑의 제국 한복판에서 온 영혼을 황금 등대로 불태워 철수 선단 전체의 탈출 항로를 열어젖힌다",
        req: { allTags: ["imperial_nihilus"] },
        check: { stat: "WP", diff: -14 },
        success: {
          text: "칠흑 같은 어둠의 제국 궤도 위에 작은 태양처럼 눈부신 황금 항로가 뚫렸다. 적 함대의 표적 조준이 눈먼 사이 수십 척의 피난선과 호위함이 그대의 성광을 따라 안전한 우군 성계로 도약했고, 꺼지지 않는 등대의 전설이 암흑 성역 전역으로 퍼져 나갔다.",
          stats: { WP: 10, Inf: 9, Fel: 7 },
          faith: 12,
          align: { humane: 6, dogmatic: 6 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "테라의 등불을 홀로 대신하려 온 영혼을 불태운 반동으로 성인의 형상이 붕괴 직전까지 마모되었다. 선단의 절반을 무사히 탈출시킨 뒤 함교 바닥에 쓰러져 오랜 회복기를 거쳐야 했다.",
          wounds: -24,
          stats: { WP: 5, T: -2 },
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 자비의 성광을 파손된 민간 피난선들 위로 집중해 공포에 질린 수십만 순례자를 감싸며 탈출시킨다",
        req: { allTags: ["saint_mercy_aspect"] },
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "피난 수송선들의 모든 관측창 너머로 거대하고 포근한 황금 날개의 환영이 드리워졌다. 공포에 휩싸이려던 수십만 순례자가 기도로 마음을 모으는 사이, 단 한 척의 민간선도 낙오하지 않고 포위망을 돌파했다.",
          stats: { Fel: 9, WP: 7, Inf: 7 },
          faith: 10,
          wounds: 10,
          align: { humane: 10 }
        },
        fail: {
          text: "취약한 민간선들을 먼저 감싸느라 적 포격과 워프 역류의 직격을 맨몸으로 받아 냈다. 혹독한 탈진과 상처를 얻었으나 대부분의 피난민이 포위망을 빠져나갈 귀중한 시간을 벌어 냈다.",
          wounds: -18,
          stats: { Fel: 4, T: -2 },
          faith: 5,
          align: { humane: 7 }
        }
      },
      {
        label: "[백병 판정] 심판의 성광을 두른 채 기함 선두에 현현해 겔러 필드를 물어뜯는 악마와 카오스 돌격선을 불검으로 베어 낸다",
        req: { allTags: ["saint_wrath_aspect"] },
        check: { stat: "WS", diff: -12 },
        success: {
          text: "타오르는 기함 뱃머리 위에 우뚝 선 살아 있는 성인이 불검을 휘둘러 카오스 봉쇄선과 워프 포식자들을 두 동강 냈다. 불타는 궤적을 따라 철수 선단이 무사히 도약하자 모든 포대 승무원이 환호성을 터뜨렸다.",
          stats: { WS: 9, WP: 7, Inf: 7 },
          faith: 10,
          align: { dogmatic: 10 }
        },
        fail: {
          text: "심연의 발톱과 적 기함의 포화가 성인의 황금 갑주를 깊게 찢어 놓으며 엄청난 충격이 전해졌다. 괴물을 베어 낸 뒤 피투성이로 갑판으로 밀려났으나 함선들은 가까스로 포위망을 돌파했다.",
          wounds: -22,
          stats: { WS: 4, T: -2 },
          faith: 5,
          align: { dogmatic: 7 }
        }
      },
      {
        label: "[의지 판정] 기함의 성소 첨탑에 올라 황금빛 신앙의 등불을 점화해 호위 함대가 탈출 좌표를 잡도록 유도한다",
        check: { stat: "WP", diff: -12 },
        success: {
          text: "불타는 성지 궤도와 보랏빛 폭풍을 가르는 곧고 맑은 황금빛 기둥이 허공을 꿰뚫었다. 호위 함대가 그 이정표를 붙잡고 선단 전체를 제국 요새 행성 상공으로 무사히 도약시켰다.",
          stats: { WP: 8, Inf: 7, Fel: 5 },
          faith: 9,
          align: { humane: 4, dogmatic: 4 }
        },
        fail: {
          text: "거센 워프 역류에 집중이 흔들리며 극심한 고통을 겪었다. 호위함 몇 척이 적 포격에 손상을 입은 뒤에야 가까스로 선단을 포위망 밖으로 이끌어 냈다.",
          wounds: -18,
          stats: { WP: 3, Inf: -2 },
          faith: 4
        }
      },
      {
        label: "지친 아스트로패스 합창단 곁에서 안전한 항해의 기도문을 읊으며 선원들의 이성이 무너지지 않도록 버텨 낸다",
        effect: {
          text: "길고 어두운 도피 항해가 몇 주 동안 이어졌으나, 그대의 고요한 성광이 함교와 하층 갑판 구석구석을 지탱하며 단 한 건의 선상 반란이나 광기도 허용하지 않은 채 우군 성계까지 버텨 냈다.",
          stats: { WP: 5, Fel: 5 },
          faith: 6,
          align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Imperium Nihilus / The Martyr's Tomb / Psychic Awakening: Faith and Fury"
  }
);
