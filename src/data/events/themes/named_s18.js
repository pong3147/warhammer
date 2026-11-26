// 분기 사건 — 18단계 신규 8인 네임드 단독 조우 (전설의 조우)
export default [
  {
    id: "ev_s18_named_ravensburg",
    title: "고딕 성역의 불굴 제독 — 코르넬리우스 폰 레이븐스버그",
    category: "전설의 조우",
    once: true,
    characters: ["ravensburg"],
    req: {
      minAge: 16,
      minYear: 139,
      maxYear: 151,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "high_lord_terra"]
    },
    reqLabel: "139~151.M41 · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "거센 워프 폭풍에 고립된 고딕 섹터 외곽 항로에서 카오스 약탈 함대의 기습을 받아 제국 순양함 전대가 만신창이가 되었다. 함교 홀로 투영기에 잡음을 뚫고 흉터 가득한 노련한 사내가 모습을 드러낸다. 기함 '디바인 라이트'의 함교에 선 배틀플리트 고딕 총사령관 코르넬리우스 폰 레이븐스버그 제독이다. '후퇴할 항구는 없다. 대열을 추슬러 아바돈의 사냥개들에게 제국 해군의 포화가 아직 살아 있음을 보여 주자.'",
    choices: [
      {
        label: "[사격 판정] 레이븐스버그의 기함과 교차 포격을 맞춰 약탈 함대를 꺾는다",
        req: { anyTags: ["navy", "navigator", "militarum"] },
        check: { stat: "BS", diff: -6 },
        success: {
          text: "'디바인 라이트'의 랜스 포대와 완벽한 시차로 일제 포격을 쏟아부어 선두 카오스 순양함의 보이드 실드를 산산조각 냈다! 레이븐스버그 제독이 직접 무전을 보내 그대의 포술과 규율을 배틀플리트 고딕의 명예 기록에 올렸다.",
          stats: { BS: 6, WP: 4, Inf: 7 },
          faith: 6,
          align: { dogmatic: 7 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        },
        fail: {
          text: "적 함대의 집중 랜스 포격이 현측 포갑판을 찢어 큰 부상을 입었으나, 제독의 기함이 측면으로 파고들어 반격할 결정적 시간은 벌어 냈다.",
          wounds: -20,
          stats: { BS: -2, T: 2 },
          align: { dogmatic: 4 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        }
      },
      {
        label: "[지성 판정] 파손된 후미 수송선과 부상 승무원을 엄호하며 탈출 항로를 연다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "소행성대의 사각 항로를 재빨리 계산해 손상된 수송선과 구명정 전원을 '디바인 라이트'의 방어막 뒤편으로 안전히 이끌었다! 레이븐스버그 제독이 묵직한 고갯짓으로 동료를 버리지 않은 냉철함에 경의를 표했다.",
          stats: { Int: 6, Fel: 4, Inf: 5 },
          align: { humane: 8, ruthless: -3 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        },
        fail: {
          text: "약탈선의 어뢰 일제 사격이 선미를 강타해 거친 충격과 부상을 겪었으나, 끝까지 항로를 포기하지 않아 수송선 일부는 빠져나갔다.",
          wounds: -18,
          stats: { Inf: -2 },
          align: { humane: 5 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        }
      },
      {
        label: "[권위 판정] 파손된 전방 호위함을 미끼로 삼아 적 기함 측면에 포화를 모은다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "비정한 유인 작전에 말려든 카오스 약탈 함대가 제국 함대의 십자포화 한복판에 갇혀 궤멸되었다. 레이븐스버그 제독은 차가운 눈빛으로 승리를 인정하며 그대의 냉혹한 결단력을 기록했다.",
          stats: { Inf: 7, Int: 5 },
          align: { ruthless: 8, humane: -4 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        },
        fail: {
          text: "전방 호위함이 예상보다 빨리 폭발하며 강습 어뢰가 아군 측면을 뚫고 들어왔다. 적잖은 부상과 함대 장교들의 싸늘한 비난을 떠안았다.",
          wounds: -22,
          stats: { Fel: -3 },
          align: { ruthless: 5, humane: -3 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        }
      },
      {
        label: "레이븐스버그 제독의 집결 명령을 복창하며 맡은 갑판과 방벽을 사수한다",
        effect: {
          text: "흔들리는 보이드 실드 아래서 침착하게 격벽과 화력 통제를 지켜 내며 '디바인 라이트'가 적 함대를 워프 폭풍 너머로 몰아낼 때까지 자리를 지켰다.",
          stats: { WP: 5, T: 3, Inf: 3 },
          faith: 4,
          align: { dogmatic: 5 },
          addTags: ["met_ravensburg", "gothic_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Cornelius von Ravensburg / Battlefleet Gothic Rulebook"
  },
  {
    id: "ev_s18_named_macharius",
    title: "별빛 끝자락의 순시 — 로드 솔라 마카리우스",
    category: "전설의 조우",
    once: true,
    characters: ["macharius"],
    req: {
      minAge: 16,
      minYear: 392,
      maxYear: 400,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "high_lord_terra"]
    },
    reqLabel: "392.M41~400.M41 · 16세 이상 · 제국 충성파",
    weight: 36,
    text: "아스트로노미칸의 등불마저 희미하게 깜박이는 은하 서부 변경의 최전선. 수백 개 행성을 쉼 없이 정복하며 지쳐 버린 마카리우스 대성전 연대들 사이에 불온한 침묵이 감돌던 밤, 황금빛 지휘 갑주 위로 빗물을 맞으며 한 필멸자가 진흙 참호선을 따라 홀로 걸어왔다. 천 개 행성의 정복자, 로드 솔라 마카리우스다. 깊은 피로가 서린 눈동자 속에서도 꺼지지 않는 불꽃을 품은 채 그가 그대 앞에 멈춰 서서 묻는다. '인류의 빛이 여기서 멈춰야 한다고 믿는가?'",
    choices: [
      {
        label: "[의지 판정] 마카리우스의 시선 앞에서 황제의 빛을 끝까지 잇겠다고 맹세한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "마카리우스가 말없이 그대의 어깨에 장갑 낀 손을 올린 뒤 전 연대를 향해 우렁찬 연설을 쏟아냈다. 꺾여 가던 병사들의 함성이 다시 밤하늘을 찢으며 서부 변경의 진군이 재개되었다.",
          stats: { WP: 6, Fel: 5, Inf: 7 },
          faith: 8,
          align: { dogmatic: 8 },
          addTags: ["met_macharius", "macharian_veteran"]
        },
        fail: {
          text: "끝없는 강행군의 피로 탓에 목소리가 갈라지며 쓰러지듯 무릎을 꿇었다. 마카리우스는 묵묵히 그대를 일으켜 세웠으나 지독한 열병과 탈진이 몸을 갉아먹었다.",
          wounds: -16,
          stats: { WP: -2, T: 2 },
          align: { dogmatic: 4 },
          addTags: ["met_macharius", "macharian_veteran"]
        }
      },
      {
        label: "[교섭 판정] 한계에 다다른 병사들의 피로와 보급 고갈을 진솔히 직언한다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "수행 참모들이 숨을 삼켰으나, 마카리우스는 잠시 눈을 감았다가 무겁게 고개를 끄덕였다. 무모한 심연 강행군 대신 휴식과 의료 보급이 하달되며 수많은 장병의 목숨이 구원받았다.",
          stats: { Fel: 6, Int: 4, Inf: 6 },
          align: { humane: 9, dogmatic: -3 },
          addTags: ["met_macharius", "macharian_veteran"]
        },
        fail: {
          text: "광신적인 성전 커미사르들과 강경파 장교들이 그대의 직언을 패배주의로 몰아세우며 격렬한 충돌과 문책이 벌어졌다. 마카리우스가 제지하기 전까지 적잖은 상처를 입었다.",
          wounds: -18,
          stats: { Inf: -3 },
          align: { humane: 5 },
          addTags: ["met_macharius", "macharian_veteran"]
        }
      },
      {
        label: "[권위 판정] 반항하는 변경 행성의 보급고를 강제 징발해 마지막 진격을 밀어붙인다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "현지 주민의 원성을 짓누르고 식량과 프로메튬 비축고 전량을 하룻밤 만에 성전군 수송대에 실었다. 마카리우스는 그대의 서늘한 추진력을 기록했으나 점령지에는 깊은 원한이 남았다.",
          stats: { Inf: 8, Int: 4 },
          align: { ruthless: 8, humane: -5 },
          addTags: ["met_macharius", "macharian_veteran"]
        },
        fail: {
          text: "징발 현장에서 변경 반군의 폭탄 매복에 휘말려 보급대 절반을 잃고 피투성이로 물러났다.",
          wounds: -22,
          stats: { Fel: -2 },
          align: { ruthless: 5, humane: -3 },
          addTags: ["met_macharius", "macharian_veteran"]
        }
      },
      {
        label: "별빛이 희미한 변경선에서 침묵의 경례를 올리며 성전의 마지막 기록을 남긴다",
        effect: {
          text: "대성전 이래 가장 위대한 필멸자 정복자가 안개 속으로 발걸음을 돌리는 뒷모습을 눈에 새겼다. 시대가 정점을 찍고 저물어 가는 순간의 증인이 되었다.",
          stats: { WP: 4, Int: 4, Inf: 3 },
          faith: 5,
          align: { dogmatic: 4, humane: 3 },
          addTags: ["met_macharius", "macharian_veteran"]
        }
      }
    ],
    source: "Lexicanum: Macharius / The Macharian Crusade Trilogy"
  },
  {
    id: "ev_s18_named_draigo",
    title: "은빛 균열의 방랑자 — 슈프림 그랜드 마스터 칼도르 드라이고",
    category: "전설의 조우",
    once: true,
    characters: ["kaldor_draigo"],
    req: {
      minAge: 16,
      minYear: 901,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "high_lord_terra"]
    },
    reqLabel: "901.M41+ · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "방어선이 완전히 무너진 절망의 밤, 찢어진 허공에서 거대한 상급 악마가 강림해 요새 광장을 지옥불로 물들였다. 모든 것이 끝났다고 여긴 바로 그 순간, 보랏빛 워프 불꽃을 가르고 눈부신 은빛 균열이 열렸다! 성흔이 새겨진 은빛 터미네이터 갑주를 두른 전설의 기사, 칼도르 드라이고가 '타이탄소드'를 치켜들고 워프 유배지에서 잠시 현세로 걸어 나와 상급 악마의 심장을 향해 돌진한다!",
    choices: [
      {
        label: "[의지 판정] 드라이고의 축성 성가에 정신을 공명시켜 상급 악마의 진명을 봉인한다",
        req: { anyTags: ["grey_knight", "inquisitor", "inquisition_agent", "ordo_malleus", "psyker", "sanctioned_psyker", "librarius_trained", "role_librarian"] },
        check: { stat: "WP", diff: -8 },
        success: {
          text: "은빛 사이킥 공명이 악마의 형체를 묶은 찰나, 드라이고의 타이탄소드가 괴물의 목을 단칼에 베어 추방했다! 유배의 사슬에 끌려 다시 은빛 균열로 사라지기 직전, 드라이고는 그대가 기억 소거 없이도 비밀을 지킬 자격이 있음을 인정하며 검으로 경례했다.",
          stats: { WP: 7, Int: 5, Inf: 7 },
          faith: 10,
          corruption: -10,
          align: { dogmatic: 8 },
          addTags: ["met_kaldor_draigo", "daemon_bane"]
        },
        fail: {
          text: "상급 악마가 붕괴하며 터뜨린 사이킥 비명이 신경망을 태웠다. 드라이고의 방패가 치명타를 막아 주어 살아남았으나 극심한 내상을 입었다.",
          wounds: -20,
          stats: { WP: -2, T: 2 },
          align: { dogmatic: 4 },
          addTags: ["met_kaldor_draigo"]
        }
      },
      {
        label: "[백병 판정] 드라이고가 악마를 묶은 틈에 고립된 부상병과 생존자들을 끌어낸다",
        check: { stat: "WS", diff: -6 },
        success: {
          text: "은빛 거인이 상급 악마를 압도하는 사이, 그대는 하급 악마 무리를 베어 넘기며 성당 폐허에 갇힌 생존자들을 결계 뒤로 대피시켰다. 균열이 닫히기 직전 드라이고의 묵직한 고갯짓이 남았고, 혼란 속에 어떠한 기억 소거 집행도 따라붙지 않았다.",
          stats: { WS: 6, WP: 5, Fel: 4 },
          faith: 6,
          corruption: -5,
          align: { humane: 9, ruthless: -3 },
          addTags: ["met_kaldor_draigo", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "생존자를 끌어내는 도중 하급 악마의 발톱에 어깨를 깊게 찢겼으나, 드라이고의 추방 성광이 광장을 쓸어 버리며 간신히 목숨을 건졌다.",
          wounds: -22,
          stats: { T: 2, Ag: -2 },
          align: { humane: 6 },
          addTags: ["met_kaldor_draigo"]
        }
      },
      {
        label: "[지성 판정] 은빛 균열의 잔류 파동과 추방 인장을 몰래 채록해 전술 자산으로 삼는다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "모두가 경외와 공포로 고개를 숙인 틈에, 그대는 은빛 균열의 위상 수치와 대악마 봉인 인장을 암호 기록판에 담아 냈다. 오르도 말레우스조차 탐낼 위험하고도 막강한 비전 지식을 손에 넣었다.",
          stats: { Int: 7, Inf: 6 },
          align: { ruthless: 8, dogmatic: -4 },
          addTags: ["met_kaldor_draigo"]
        },
        fail: {
          text: "악마가 소멸하며 뿜은 역류 불꽃에 기록판이 폭발해 두 손에 심한 화상을 입었다. 수상한 움직임 탓에 한동안 상부의 따가운 시선까지 감수해야 했다.",
          wounds: -18,
          stats: { Inf: -3 },
          align: { ruthless: 5, dogmatic: -3 },
          addTags: ["met_kaldor_draigo"]
        }
      },
      {
        label: "성호를 그으며 은빛 거인의 승리를 묵묵히 가슴에 묻고 침묵을 서약한다",
        effect: {
          text: "은빛 균열이 닫힌 자리에 오존 냄새와 재만 남았다. 그 이름을 함부로 입에 올리지 않는 것만이 제국의 비밀과 자신의 목숨을 함께 지키는 길임을 본능으로 깨달았다.",
          stats: { WP: 5, T: 3 },
          faith: 6,
          corruption: -6,
          align: { dogmatic: 5 },
          addTags: ["met_kaldor_draigo"]
        }
      }
    ],
    source: "Lexicanum: Kaldor Draigo / Codex: Grey Knights"
  },
  {
    id: "ev_s18_named_vahl",
    title: "성광의 창과 연옥의 진군 — 아베스 상크토룸 모르벤 발",
    category: "전설의 조우",
    once: true,
    characters: ["morvenn_vahl"],
    req: {
      minAge: 16,
      minYear: 1001,
      greatRift: true,
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "imperial_nihilus"]
    },
    reqLabel: "001.M42+ · 대균열 이후 · 16세 이상 · 제국 충성파",
    weight: 36,
    text: "성지 요새의 공성전이 교착 상태에 빠진 가운데 테라 상원 특사들은 궤도에서 십일조 지분만 다투고 있었다. 그때 화염을 뚫고 성벽 중앙에 강하선이 내리꽂히더니, 황금 유물 파라곤 워슈트 '연옥'을 걸치고 '성광의 창'을 든 여전사가 포연 속으로 걸어 나왔다. 아뎁타 소로리타스 총원장이자 테라의 하이 로드, 모르벤 발이다! '의회의 꼭두각시가 될 생각은 없다. 성벽을 지키려는 자는 내 창 끝을 따르라!'",
    choices: [
      {
        label: "[백병 판정] 모르벤 발의 '연옥' 옆에서 '성광의 창'이 연 돌파구로 돌격한다",
        req: { anyTags: ["sororitas", "celestian", "canoness", "ecclesiarchy", "confessor", "cardinal", "high_lord_terra", "living_saint", "saint_vessel"] },
        check: { stat: "WS", diff: -6 },
        success: {
          text: "총원장의 육중한 워슈트가 적 공성 탑을 꿰뚫자 그대 역시 찬송가를 외치며 돌파구로 뛰어들어 적 지휘부를 초토화했다! 전투가 끝난 뒤 모르벤 발이 성광의 창을 세워 그대의 행동하는 신앙에 경의를 표했다.",
          stats: { WS: 7, WP: 6, Inf: 8 },
          faith: 12,
          align: { dogmatic: 9 },
          addTags: ["met_morvenn_vahl"]
        },
        fail: {
          text: "무너지는 적 공성 병기의 파편이 옆구리를 강타해 큰 상처를 입었으나, 모르벤 발의 미사일 포화가 적 증원군을 태워 버리며 공세의 불씨를 살렸다.",
          wounds: -20,
          stats: { WS: 2, T: -2 },
          faith: 4,
          align: { dogmatic: 5 },
          addTags: ["met_morvenn_vahl"]
        }
      },
      {
        label: "[의지 판정] 총원장이 적 주력을 묶은 사이 성당 지하에 갇힌 순례자들을 대피시킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "황금 워슈트가 적의 모든 포화를 끌어당기는 사이, 그대는 무너져 내리는 지하 성소에서 수천 명의 순례자를 안전 지대로 이끌어 냈다. 모르벤 발은 불타는 전선 한가운데서 그대의 자비로운 용기를 높이 평가했다.",
          stats: { WP: 6, Fel: 5, Inf: 5 },
          faith: 8,
          align: { humane: 9, ruthless: -3 },
          addTags: ["met_morvenn_vahl", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "붕괴하는 대성당 석조 아치를 몸으로 버티다 깊은 타박상을 입었으나, 마지막 순례자 대열이 빠져나갈 때까지 끝내 물러서지 않았다.",
          wounds: -18,
          stats: { Ag: -2 },
          align: { humane: 6 },
          addTags: ["met_morvenn_vahl"]
        }
      },
      {
        label: "[권위 판정] 모르벤 발의 독단 출전을 테라 원로원 파벌과 거래할 정치 카드로 챙긴다",
        check: { stat: "Inf", diff: -8 },
        success: {
          text: "총원장이 상원 의결을 무시하고 최전선에 강하한 경위를 치밀하게 문서화해 테라 고위 파벌에 건네 막대한 정치적 보답을 챙겼다. 다만 떠나기 직전 모르벤 발이 던진 서늘한 시선이 오래도록 잊히지 않았다.",
          stats: { Inf: 8, Int: 5 },
          align: { ruthless: 9, dogmatic: -4 },
          addTags: ["met_morvenn_vahl"]
        },
        fail: {
          text: "기밀 보고서를 실은 전령선이 궤도에서 소로리타스 근위대에 나포되었다. 모르벤 발의 준엄한 질책과 함께 제국 권력층 내 평판이 크게 실추되었다.",
          wounds: -12,
          stats: { Inf: -5 },
          align: { ruthless: 5, dogmatic: -3 },
          addTags: ["met_morvenn_vahl"]
        }
      },
      {
        label: "성광의 창이 찢어 놓은 공성선을 따라 보급과 엄호 사격으로 공세를 뒷받침한다",
        effect: {
          text: "화려한 정치적 언사 대신 묵묵히 탄약 보급과 측면 엄호를 이어 가며, 아베스 상크토룸이 포위망을 완전히 분쇄하는 승전의 순간을 뒷받침했다.",
          stats: { BS: 4, WP: 5, Inf: 4 },
          faith: 6,
          align: { dogmatic: 5 },
          addTags: ["met_morvenn_vahl"]
        }
      }
    ],
    source: "Lexicanum: Morvenn Vahl / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s18_named_kryptman",
    title: "잿빛 방화선의 심판 — 이단심문관 피두스 크립트만",
    category: "전설의 조우",
    once: true,
    characters: ["kryptman"],
    req: {
      minAge: 16,
      minYear: 997,
      maxYear: 1003,
      excludeWorlds: ["terra", "mars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "met_kryptman"]
    },
    reqLabel: "997.M41~003.M42 · 16세 이상 · 제국 충성파",
    weight: 35,
    text: "타이라니드 하이브 함대의 촉수가 닿기 직전인 변경 행성 궤도 지휘실. 수척하고 냉혹한 오르도 제노스 이단심문관 피두스 크립트만이 홀로 성계도 위에 붉은 익스터미나투스 인장을 내려놓았다. 궤도 아래 행성에는 아직 수천만 제국 시민이 숨 쉬고 있지만, 그는 외계 포식자에게 단 한 줌의 생체 질량도 내주지 않아야 후방 수천억을 살릴 수 있다고 단언한다. 크립트만의 차가운 시선이 그대를 꿰뚫는다.",
    choices: [
      {
        label: "[의지 판정] 크립트만의 방화선 명령을 받아들여 궤도 익스터미나투스를 집행한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "사이클로닉 어뢰가 행성의 대기를 불태우며 타이라니드의 식량원을 완벽히 끊어 놓았다. 피두스 크립트만은 흔들리지 않은 그대의 냉철함을 높이 평가했으나, 통신 너머 사라진 수천만의 절규가 영원한 낙인으로 남았다.",
          stats: { WP: 6, Int: 5, Inf: 8 },
          align: { dogmatic: 8, ruthless: 6, humane: -7 },
          addTags: ["met_kryptman", "kryptman_cordon_vet", "macro_exterminatus_scar"]
        },
        fail: {
          text: "포격 개시 직전 행성 방어 포대의 필사적 반격이 지휘 갑판을 스쳐 큰 부상을 입었다. 결국 행성은 재로 변했고, 씻을 수 없는 잿빛 상처와 악명만 남았다.",
          wounds: -20,
          stats: { Fel: -3, WP: 2 },
          align: { dogmatic: 5, ruthless: 5, humane: -5 },
          addTags: ["met_kryptman", "kryptman_cordon_vet", "macro_exterminatus_scar"]
        }
      },
      {
        label: "[교섭 판정] 크립트만의 경고를 무릅쓰고 포격 직전까지 민간 수송선을 밀어 넣는다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "이단심문소 처형 경고를 정면으로 감수하며 발사 초읽기를 지연시켜 수만 명의 변경 주민을 궤도 수송선에 태워 빼냈다! 크립트만의 분노 어린 경고를 샀으나, 살아남은 이들이 그대의 이름을 구원자로 새겼다.",
          stats: { Fel: 7, WP: 5, Inf: 5 },
          faith: 8,
          align: { humane: 10, dogmatic: -4, ruthless: -4 },
          addTags: ["met_kryptman", "kryptman_cordon_vet", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "이단심문소 강습대가 격납고를 봉쇄하며 충돌이 벌어져 중상을 입었다. 가까스로 몇 척의 피난선만 화염 너머로 띄워 보냈을 뿐이다.",
          wounds: -22,
          stats: { Inf: -4 },
          align: { humane: 7, dogmatic: -3 },
          addTags: ["met_kryptman", "kryptman_cordon_vet", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "[지성 판정] 행성 소각 직전 총독부 금고와 외계 생체 표본만 선별 회수해 이익을 챙긴다",
        check: { stat: "Int", diff: -6 },
        success: {
          text: "시민 구조 대신 고속 셔틀을 투입해 귀중한 성계 데이터와 타이라니드 척후 표본을 낚아채고 곧장 궤도 소각을 승인했다. 크립트만은 차갑게 고개를 끄덕였고, 그대의 손에는 막대한 실리와 잿빛 낙인이 함께 쥐어졌다.",
          stats: { Int: 7, Inf: 7 },
          align: { ruthless: 9, humane: -6 },
          addTags: ["met_kryptman", "kryptman_cordon_vet", "macro_exterminatus_scar"]
        },
        fail: {
          text: "회수 셔틀이 포자 폭풍에 휩쓸려 기체가 반파되며 큰 상처를 입고 귀환했다. 욕심을 부린 대가로 표본마저 태반을 잃었다.",
          wounds: -20,
          stats: { Int: -2, Inf: -2 },
          align: { ruthless: 6, humane: -4 },
          addTags: ["met_kryptman", "kryptman_cordon_vet", "macro_exterminatus_scar"]
        }
      },
      {
        label: "방화선 외곽의 검역 궤도와 군수 보급망을 유지하며 침묵 속에 임무를 완수한다",
        effect: {
          text: "거대한 윤리적 심판에 직접 방아쇠를 당기지는 않았으나, 방화선 외곽에 쏟아지는 타이라니드 척후 포자를 차단하고 보급선을 지켜 내며 묵묵히 직무를 다했다.",
          stats: { Int: 4, WP: 4, T: 3 },
          align: { dogmatic: 4 },
          addTags: ["met_kryptman", "kryptman_cordon_vet"]
        }
      }
    ],
    source: "Lexicanum: Fidus Kryptman / Codex: Tyranids"
  },
  {
    id: "ev_s18_named_canis_rex",
    title: "사슬을 끊는 은빛 거신 — 서 헤크투르 세르베란과 카니스 렉스",
    category: "전설의 조우",
    once: true,
    characters: ["canis_rex"],
    req: {
      minAge: 16,
      minYear: 980,
      excludeWorlds: ["terra", "mars", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "custodes", "grey_knight", "high_lord_terra", "dreadnought"]
    },
    reqLabel: "980.M41+ · 16세 이상 · 제국 충성파",
    weight: 34,
    text: "아이언 워리어 약탈대와 결탁한 폭군 영주가 변경 광산 도시를 철조망 수용소로 바꾸어 놓았다. 처형장에 포로들이 끌려 나온 절체절명의 순간, 대지를 울리는 거대한 발걸음과 함께 포연을 뚫고 끊어진 사슬 문장을 새긴 은빛 퀘스토리스 나이트 '카니스 렉스'가 홀로 걸어 나왔다! 이온 실드가 반역자들의 중화기를 삼켜 버리고, 외부 확성기 너머로 전설적 프리블레이드 기사 서 헤크투르 세르베란의 흔들림 없는 목소리가 울려 퍼진다. '폭군의 사슬은 오늘 여기서 끊어진다!'",
    choices: [
      {
        label: "[백병 판정] 기사도의 호응을 보내며 카니스 렉스와 협공해 적 장갑 지휘부를 분쇄한다",
        req: { anyTags: ["imperial_knight", "knight_blood", "knight_scion", "knight_freeblade", "knight_high_king"] },
        check: { stat: "WS", diff: -6 },
        success: {
          text: "고대 기사도의 전술로 측면을 파고들어 아이언 워리어 공성 병기의 사각을 찔렀고, 카니스 렉스의 거대한 파워 피스트 '자유의 손'이 폭군의 요새 성문을 박살 냈다! 서 헤크투르가 거신의 투구를 숙여 진정한 기사의 동지애를 표했다.",
          stats: { WS: 7, WP: 5, Inf: 8 },
          faith: 8,
          align: { humane: 7, dogmatic: 5 },
          addTags: ["met_canis_rex", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "협공 도중 반역자들의 멜타 포격에 측면을 얻어맞아 깊은 화상을 입었으나, 카니스 렉스가 이온 실드로 앞을 막아 준 덕에 끝내 살아남았다.",
          wounds: -20,
          stats: { T: 3, Ag: -2 },
          align: { dogmatic: 4 },
          addTags: ["met_canis_rex"]
        }
      },
      {
        label: "[민첩 판정] 카니스 렉스의 이온 실드 뒤로 파고들어 포로들의 족쇄를 끊고 대피시킨다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "은빛 거신이 뿜어 내는 방어막 그림자 아래를 질주해 수용소 철창을 부수고 수백 명의 포로를 안전 지대로 빼냈다! 해방된 광장 위로 카니스 렉스의 프리블레이드 깃발이 당당히 나부꼈다.",
          stats: { Ag: 6, Fel: 5, WP: 4 },
          faith: 6,
          align: { humane: 10, ruthless: -4 },
          addTags: ["met_canis_rex", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "무너지는 감시탑 파편에 다리를 크게 베였으나, 카니스 렉스의 라스 임펄서가 추격자들을 증발시킨 사이 포로들을 끝내 대피시켰다.",
          wounds: -18,
          stats: { Ag: -2, T: 2 },
          align: { humane: 6 },
          addTags: ["met_canis_rex", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "[사격 판정] 해방전의 혼란을 틈타 폭군의 무기고와 금고를 먼저 장악해 전리품을 챙긴다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "카니스 렉스가 아이언 워리어 주력을 붙잡아 둔 사이, 도주하던 폭군의 친위대를 저격하고 요새 금고와 고급 무구를 독차지했다. 서 헤크투르는 침묵 속에 그대를 지나쳐 다음 억압의 땅으로 떠났다.",
          stats: { BS: 6, Inf: 7 },
          align: { ruthless: 9, humane: -5 },
          addTags: ["met_canis_rex"]
        },
        fail: {
          text: "금고 함정과 퇴각하던 반역자 분대의 십자포화에 갇혀 큰 부상을 입고 빈손으로 기어 나와야 했다.",
          wounds: -22,
          stats: { Inf: -3 },
          align: { ruthless: 5, humane: -3 },
          addTags: ["met_canis_rex"]
        }
      },
      {
        label: "카니스 렉스가 뚫어 놓은 성문 방벽을 굳히며 남은 반역자 잔당을 소탕한다",
        effect: {
          text: "은빛 프리블레이드가 적 중장갑을 짓밟는 동안 성문 방어선을 정리해 해방된 도시의 치안을 세웠다. 전투가 끝나자 서 헤크투르와 카니스 렉스는 보답도 바라지 않은 채 잿빛 지평선 너머로 사라졌다.",
          stats: { WP: 5, BS: 4, T: 3 },
          faith: 5,
          align: { dogmatic: 5, humane: 4 },
          addTags: ["met_canis_rex", "macro_mercy_sanctuary"]
        }
      }
    ],
    source: "Lexicanum: Canis Rex / Codex: Imperial Knights"
  },
  {
    id: "ev_s18_named_mortarion",
    title: "부패의 날개와 대낫 '침묵' — 데몬 프라이마크 모타리온",
    category: "전설의 조우",
    once: true,
    characters: ["mortarion"],
    req: {
      minAge: 16,
      minYear: 1013,
      maxYear: 1020,
      greatRift: true,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["imperial_nihilus"]
    },
    reqLabel: "013~020.M42 · 대균열 이후 · 역병 전쟁기 · 16세 이상",
    weight: 35,
    text: "잿빛 구름이 순식간에 독성 녹색 안개로 썩어 내리며 놋쇠 향로의 불길한 종소리가 전장을 짓눌렀다. 찢어진 나방 날개를 펼친 거대한 그림자가 참호 위로 내려앉자 강철 장갑판조차 순식간에 녹슬어 부서진다. 거대한 대낫 '침묵'을 쥔 너글의 데몬 프라이마크, 창백한 왕 모타리온이다! 역병의 포효가 공기를 썩히는 가운데 그의 낮고 메마른 음성이 울린다. '저항은 고통만 늘릴 뿐이다. 모든 제국은 결국 부패 앞에 무릎 꿇으리라.'",
    choices: [
      {
        label: "[의지 판정] 역병 안개 속에서 황제의 이름을 외치며 모타리온의 진격을 가로막는다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -12 },
        success: {
          text: "창백한 왕이 뿜어 내는 절망의 오라를 강철 같은 신념으로 정면 돌파하며 정화 화염과 집중 포격을 유도해 모타리온의 진군을 멈춰 세웠다! 티끌만큼의 타락도 허락지 않은 불굴의 항전이 전선에 전설로 남았다.",
          stats: { WP: 8, T: 5, Inf: 9 },
          faith: 14,
          wounds: -14,
          align: { dogmatic: 10, ruthless: -4 },
          addTags: ["met_mortarion", "plague_war_vet"]
        },
        fail: {
          text: "'침묵'이 대지를 가른 충격파에 날아가 갈비뼈가 부서지는 중상을 입었으나, 끝내 영혼의 순결만은 지켜 낸 채 아군 구원대에 끌어 올려졌다.",
          wounds: -28,
          stats: { T: 3, WP: 2 },
          align: { dogmatic: 6 },
          addTags: ["met_mortarion", "plague_war_vet"]
        }
      },
      {
        label: "[강인 판정] 독안개를 뚫고 쓰러진 전우와 야전 의무병들을 정화 격벽 뒤로 옮긴다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: -8 },
        success: {
          text: "폐를 찌르는 녹색 독기를 버텨 내며 모타리온의 역병 전선 코앞에서 수백 명의 부상병을 정화 방폭문 뒤로 피신시켰다. 부패의 군주 앞에서도 인간의 연대를 지켜 낸 기적이었다.",
          stats: { T: 7, WP: 5, Fel: 4 },
          faith: 8,
          wounds: -12,
          align: { humane: 10, ruthless: -4 },
          addTags: ["met_mortarion", "plague_war_vet", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "부식성 안개가 피부와 갑주를 녹이며 극심한 통증을 안겼으나, 끝내 정신을 놓지 않고 야전 병동 철수선을 버텨 냈다.",
          wounds: -24,
          stats: { T: 2, Ag: -2 },
          align: { humane: 6 },
          addTags: ["met_mortarion", "plague_war_vet"]
        }
      },
      {
        label: "[강인 판정] 창백한 왕 앞에 무릎 꿇고 역병 군단의 부패 교리에 경의를 바친다",
        req: { anyTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: -5 },
        success: {
          text: "살점을 녹이는 녹색 독안개를 거침없이 들이마시며 경배를 올리자, 모타리온의 공허한 눈빛이 그대의 질긴 생명력을 인정하듯 잠시 머물렀다. 배신자 군단 사이에서 두려운 명성이 치솟았다.",
          stats: { T: 7, WP: 5, Inf: 9 },
          corruption: 14,
          align: { ruthless: 9, humane: -5 },
          addTags: ["met_mortarion", "plague_war_vet"]
        },
        fail: {
          text: "악마 프라이마크가 내뿜는 원초적 역병은 카오스 신도에게조차 가혹했다. 온몸에 종기가 돋고 피를 토하며 쓰러졌으나 간신히 목숨은 건졌다.",
          wounds: -22,
          corruption: 10,
          stats: { T: 3 },
          align: { ruthless: 6 },
          addTags: ["met_mortarion", "plague_war_vet"]
        }
      },
      {
        label: "방독 봉인을 조이고 모타리온의 직격 진로를 피해 후방 방어선으로 물러난다",
        effect: {
          text: "데몬 프라이마크와의 정면 대결은 무모한 소멸일 뿐이다. 방폭 격벽을 차례로 닫으며 전력을 보존해 반격 전선을 재정비할 귀중한 정보를 가져왔다.",
          stats: { Ag: 4, WP: 4, Int: 3 },
          wounds: -12,
          align: { ruthless: 3, humane: 3 },
          addTags: ["met_mortarion", "plague_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Mortarion / Dark Imperium Trilogy"
  },
  {
    id: "ev_s18_named_trazyn",
    title: "불타는 성유물실의 능글맞은 거래 — 무한의 트라진",
    category: "전설의 조우",
    once: true,
    characters: ["trazyn"],
    req: {
      minAge: 16,
      minYear: 897,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "living_saint", "dreadnought", "high_lord_terra", "met_trazyn"
      ]
    },
    reqLabel: "897.M41+ · 16세 이상 · 제국 충성파 · 테라·화성 제외",
    weight: 32,
    text: "적 매복 부대에 포위되어 불타는 제국 기록보관소 성유물실에 갇혀 버렸다. 출입구마다 폭발음이 울리는 아수라장 한가운데, 깨진 정지장 진열대 옆에서 비취빛 차원막이 열리더니 은빛 금속 외계 군주가 태연히 고대 연대 군기를 감상하며 돌아본다. 솔렘나스 박물관의 주인, 무한의 트라진이다! 손가락 사이로 테서랙트 미궁 입방체를 굴리며 그가 익살스럽게 제안한다. '이 훌륭한 유물들과 흥미로운 목격자가 재가 되기엔 아깝지 않소? 저 군기 한 점만 내게 양보하면, 문밖의 무례한 침입자들을 치워 줄 훌륭한 구경거리를 꺼내 드리지.'",
    choices: [
      {
        label: "[교섭 판정] 귀중한 성유물 한 점을 넘기고 테서랙트 미궁의 원군으로 포위를 뚫는다",
        check: { stat: "Fel", diff: -6 },
        success: {
          text: "트라진이 우아하게 허리를 숙여 고대 성전 군기를 회수한 뒤 복도로 테서랙트 입방체를 굴렸다. 빛과 함께 풀려난 옛 시대의 정지장 전사들이 매복 적군을 순식간에 갈아 버렸고, 그대는 무사히 탈출하는 대신 솔렘나스에 기묘한 빚을 지게 되었다.",
          stats: { Fel: 7, Int: 6, Inf: 7 },
          align: { ruthless: 9, dogmatic: -5 },
          addTags: ["met_trazyn", "solemnace_debt", "xenos_contact"]
        },
        fail: {
          text: "트라진이 '흥정 솜씨가 투박하군'이라며 입방체를 아무렇게나 던져 버리는 통에, 풀려난 혼전과 천장 붕괴에 휘말려 부상을 입고 간신히 빠져나왔다.",
          wounds: -18,
          stats: { Inf: -2, Ag: 3 },
          align: { ruthless: 6, dogmatic: -3 },
          addTags: ["met_trazyn", "solemnace_debt", "xenos_contact"]
        }
      },
      {
        label: "[의지 판정] 외계 도굴꾼의 거래를 일축하고 유물을 사수하며 자력으로 포위망을 뚫는다",
        check: { stat: "WP", diff: -8 },
        success: {
          text: "트라진과 문밖의 적 모두에게 총구를 겨누자, 은빛 군주는 '고집스러운 역사적 진정성이군!'이라며 손뼉을 치고는 빈손으로 사라졌다. 불타는 기세로 역습을 감행해 매복 적군을 자력으로 분쇄했다.",
          stats: { WP: 7, WS: 5, Inf: 6 },
          faith: 10,
          align: { dogmatic: 9, ruthless: -3 },
          addTags: ["met_trazyn"]
        },
        fail: {
          text: "원조 없이 포위망을 뚫다 치명적인 교전에 휘말려 큰 상처를 입었다. 그 혼란 틈에 트라진은 여유롭게 웃으며 소형 성유물 하나를 챙겨 사라지고 말았다.",
          wounds: -22,
          stats: { T: 2, WP: 3 },
          align: { dogmatic: 5 },
          addTags: ["met_trazyn", "solemnace_debt"]
        }
      },
      {
        label: "[지성 판정] 트라진의 시선을 복제품으로 돌린 틈에 다친 서기관들과 진품을 빼돌린다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "진열대의 정교한 모조품으로 트라진의 흥미를 끄는 사이 소화 연막을 터뜨려 갇혀 있던 서기관들과 진짜 성유물을 비상 갱도로 대피시켰다! 등 뒤로 들려온 트라진의 유쾌한 기계 웃음이 언젠가 이 장난의 값을 받으러 오겠다는 예고처럼 남았다.",
          stats: { Int: 8, Ag: 5, Fel: 4 },
          align: { humane: 9, ruthless: -2 },
          addTags: ["met_trazyn", "solemnace_debt"]
        },
        fail: {
          text: "수천만 년 묵은 수집가의 안목을 속이지 못해 정지장 올가미에 발목이 잡혔다. 간신히 빠져나와 서기관들을 끌어냈으나 적 파편에 적잖은 부상을 입었다.",
          wounds: -20,
          stats: { Int: 2, Ag: -2 },
          align: { humane: 6 },
          addTags: ["met_trazyn", "solemnace_debt"]
        }
      },
      {
        label: "외계인의 거래에 답하지 않은 채 무너진 성유물실 비상 통로로 신속히 탈출한다",
        effect: {
          text: "능글맞은 외계 군주와 얽히지 않고 연기 자욱한 배수 갱도를 기어 빠져나왔다. 다만 등 뒤로 '다음엔 관람료와 함께 솔렘나스에서 보세'라는 서늘한 농담이 귓가에 남았다.",
          stats: { Ag: 5, WP: 4 },
          wounds: -10,
          align: { dogmatic: 3, humane: 3 },
          addTags: ["met_trazyn"]
        }
      }
    ],
    source: "Lexicanum: Trazyn the Infinite / The Infinite and the Divine / Fall of Cadia"
  }
];
