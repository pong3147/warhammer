window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || [];

window.IMPERIUM_DATA.EVENTS.push(
  // =========================================================================
  // 1. 신성한 테라 (Holy Terra) 전용 대규모 스토리 6종
  // =========================================================================
  {
    id: "ev_terra_administratum_war",
    title: "신성한 테라 — 아드미니스트라툼 '양피지 내전'",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes", "dreadnought"] },
    reqLabel: "행성: 신성한 테라",
    weight: 28,
    text: "테라 중앙 서고 412구역에서 '고대 세금 장부 보관파'와 '소각 후 재활용파' 서기관 길드가 오토건과 인장 도장을 들고 무장 충돌을 벌였다! 수백 년 된 양피지 산더미에 불이 붙어 복도가 아수라장이 되었다.",
    choices: [
      {
        label: "[이단심문관/아르비테스/커미사르 전용] 제국 공권력을 선포해 양쪽 서기관 길드장을 즉각 체포한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 법집행의 호령 앞에 무장 서기관들이 깃펜과 총을 내려놓고 엎드렸다! 상급 아뎁트가 감사의 뜻으로 권위를 보증했다.",
          stats: { Inf: 7, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 불타는 서고에서 황금 봉인이 찍힌 핵심 칙령 원본만 골라 구출한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "800년 된 테라 성계 십일조 원본을 지켜 냈다! 아드미니스트라툼 고위 관료가 두둑한 보상을 내렸다.",
          stats: { Int: 5, Inf: 7 }
        },
        fail: {
          text: "무너지는 양피지 책장에 깔려 타박상과 연기 흡입으로 고생했다.",
          wounds: -18
        }
      },
      {
        label: "[민첩 판정] 미친 관료들의 총격전을 피해 인접 성당 회랑으로 재빨리 대피한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "유탄을 아슬아슬하게 피하고 안전 구역으로 빠져나왔다. 테라에서는 관료 싸움에 끼면 목숨이 열 개라도 모자란다.",
          stats: { Ag: 4 }
        },
        fail: {
          text: "도망치다 서기관이 던진 청동 도장에 이마를 맞아 찢어졌다.",
          wounds: -14
        }
      }
    ],
    source: "Vaults of Terra: The Carrion Throne"
  },
  {
    id: "ev_terra_water_cartel",
    title: "신성한 테라 — 마른 행성의 물 카르텔 암시장",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes", "dreadnought"] },
    reqLabel: "행성: 신성한 테라",
    weight: 26,
    text: "바다가 모두 말라 버린 테라에서 정제수 1리터는 금화보다 귀하다. 구역 수압 펌프가 고장 나자 지하 물 카르텔이 '수분 회수 탱크'를 끼고 폭리를 취하며 시민들을 쥐어짜고 있다.",
    choices: [
      {
        label: "[권위 42+ 또는 귀족 전용] 상층 수자원국에 직통 전보를 쳐 카르텔 창고를 몰수·개방한다",
        req: { or: [{ stats: { Inf: 42 } }, { allTags: ["noble"] }] },
        effect: {
          text: "귀족·관료의 위세 앞에 암시장 두목이 꽁지를 빼고 달아났다! 구역 시민들이 그대를 은인으로 기렸다.",
          stats: { Inf: 6, Fel: 6 },
          wounds: 6
        }
      },
      {
        label: "[백병 판정] 카르텔 경비원을 제압하고 갇혀 있던 공용 식수 밸브를 강제로 연다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "물줄기가 터져 나오자 환호성이 울렸다! 갈증을 해갈하고 하층 구역의 신뢰를 얻었다.",
          stats: { WS: 4, Fel: 5 },
          wounds: 8
        },
        fail: {
          text: "카르텔 사병들의 몽둥이 세례에 얻어맞고 물 한 모금 못 얻은 채 쫓겨났다.",
          wounds: -20
        }
      },
      {
        label: "비싼 값을 치르고서라도 암시장 물을 사서 버틴다",
        effect: {
          text: "재산과 인맥을 좀 잃었지만, 테라의 메마른 열기 속에서 건강만은 지켜 냈다.",
          stats: { Inf: -3 },
          wounds: 5
        }
      }
    ],
    source: "Lexicanum: Terra / Vaults of Terra"
  },
  {
    id: "ev_terra_astronomican_choir",
    title: "신성한 테라 — 아스트로노미칸 성가대의 행렬",
    category: "행성 고유",
    once: true,
    req: { minAge: 12, anyWorlds: ["terra"] },
    reqLabel: "행성: 신성한 테라",
    weight: 28,
    text: "히말라야 산맥의 거대한 아스트로노미칸 성채를 향해, 흰 로브를 걸친 수천 명의 젊은 사이커들이 경건한 찬송을 부르며 걸어간다. 저들은 등불을 지피기 위해 매일 수백 명씩 영혼을 태워 소멸할 운명이다.",
    choices: [
      {
        label: "[사이커 전용] 그들의 영혼 공명에 정신을 맞추며 황제의 등불을 깊이 느낀다",
        req: { allTags: ["psyker"] },
        check: { stat: "WP", diff: 5 },
        success: {
          text: "눈부신 황금빛 공명이 영혼의 잡음을 모조리 태워 버렸다! 사이킥 제어력이 비약적으로 상승했다.",
          stats: { WP: 7, Int: 4 },
          faith: 12,
          corruption: -10
        },
        fail: {
          text: "압도적인 황제의 빛에 감각이 과부하되어 코피를 쏟으며 쓰러졌다.",
          wounds: -16,
          stats: { WP: 3 }
        }
      },
      {
        label: "무릎을 꿇고 인류의 항로를 비추는 숭고한 희생자들에게 경의를 표한다",
        effect: {
          text: "장엄하고도 처절한 희생의 행렬을 바라보며 제국의 무게와 신앙을 깊이 새겼다.",
          stats: { WP: 4 },
          faith: 10,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Astronomican"
  },
  {
    id: "ev_terra_high_lords",
    title: "신성한 테라 — 테라의 하이 로드 행차와 도로 정화",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes"] },
    reqLabel: "행성: 신성한 테라",
    weight: 24,
    text: "테라의 하이 로드 중 한 명이 황금 반중력 가마를 타고 대로로 행차한다! 선두의 아르비테스와 군악대가 '길바닥에 3초 안에 엎드리지 않는 자는 즉결 처형'이라며 몽둥이를 휘두르고 있다.",
    choices: [
      {
        label: "[권위 50+ 또는 귀족/아스타르테스 전용] 귀빈석 회랑에서 당당히 예의를 갖추어 눈도장을 찍는다",
        req: { or: [{ stats: { Inf: 50 } }, { anyTags: ["noble", "astartes", "inquisitor", "lord_commissar", "canoness"] }] },
        effect: {
          text: "하이 로드의 수행 비서관이 그대의 품격과 신분을 눈여겨보며 황궁 만찬 초대장을 건넸다!",
          stats: { Inf: 8, Fel: 4 }
        }
      },
      {
        label: "먼지투성이 돌바닥에 재빨리 이마를 대고 행차가 지나갈 때까지 숨을 죽인다",
        effect: {
          text: "황금 가마의 반중력 열풍이 등 위를 스치고 지나갔다. 살아남았으니 그걸로 충분하다.",
          stats: { Ag: 2, WP: 2 }
        }
      }
    ],
    source: "Watchers of the Throne: The Emperor's Legion"
  },
  {
    id: "ev_terra_deep_strata",
    title: "신성한 테라 — 최하층 고대 지층의 3만 년 전 유물",
    category: "행성 고유",
    once: true,
    req: { minAge: 16, anyWorlds: ["terra"] },
    reqLabel: "행성: 신성한 테라",
    weight: 26,
    text: "테라 지표면 아래 12km, 고대 통합 전쟁(Unification Wars) 이전의 시멘트 유적이 하수도 공사 중 드러났다. 벽면에는 황제께서 인류를 통합하기 전의 낯선 고대 문양과 썬더 워리어의 부러진 갑주 조각이 박혀 있다!",
    choices: [
      {
        label: "[지성 판정] 역사적 가치를 알아보고 비밀리에 탁본과 성분을 기록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "일반 시민은 존재조차 몰라야 할 3만 년 전 인류의 진실을 엿보았다! 깊은 통찰을 얻었다.",
          stats: { Int: 8, WP: 4 }
        },
        fail: {
          text: "고대 방사능 잔류 물질에 노출되어 한동안 극심한 구토와 탈진에 시달렸다.",
          wounds: -20
        }
      },
      {
        label: "금지된 고대 유적이다. 즉시 쿠스토데스나 이단심문소 연락관에게 신고하고 봉쇄한다",
        effect: {
          text: "몇 시간 뒤 황금 갑주와 검은 제복이 유적을 통째로 밀봉했다. 충성스러운 신고에 비밀 포상이 떨어졌다.",
          stats: { Inf: 7, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Unification Wars / Terra"
  },
  {
    id: "ev_terra_pilgrim_scam",
    title: "신성한 테라 — 순례자 숙소와 가짜 황궁 통행증",
    category: "부조리",
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes", "inquisitor", "noble"] },
    reqLabel: "행성: 신성한 테라 (일반인)",
    weight: 24,
    text: "수십 광년 너머에서 전 재산을 팔아 온 순례자들에게 악덕 브로커가 '황궁 직행 급행 통행증'을 팔아넘기고 있다. 자세히 보니 300년 전 폐기된 하수도 출입증에 금칠만 덧입힌 사기다.",
    choices: [
      {
        label: "[교섭 판정] 사기극을 폭로하고 브로커를 인근 아르비테스 순찰대에 넘긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "브로커가 즉석에서 체포되었고, 감격한 순례자들이 눈물을 흘리며 축복을 빌어 주었다.",
          stats: { Fel: 5, Inf: 4 },
          faith: 8
        },
        fail: {
          text: "브로커와 결탁한 부패 경비원에게 오히려 '공무 방해'로 얻어맞았다.",
          wounds: -18
        }
      },
      {
        label: "테라에서 남의 일에 끼어들면 손해다. 조용히 제 갈 길을 간다",
        effect: {
          text: "속은 순례자들은 평생 영원의 문 문턱도 못 보고 굶어 죽겠지만, 그것이 테라의 일상이다.",
          stats: { Int: 2 }
        }
      }
    ],
    source: "Vaults of Terra"
  },

  // =========================================================================
  // 2. 주요 행성별 추가 고유 이벤트 16종
  // =========================================================================
  {
    id: "ev_mars_titan_march",
    title: "화성 — 신의 기계(God-Engine) 타이탄 군단 출격 사열",
    category: "행성 고유",
    req: { minAge: 12, anyWorlds: ["mars"] },
    reqLabel: "행성: 화성",
    weight: 26,
    text: "대지가 지진처럼 울린다! 높이 55미터의 임페라토르급 타이탄이 붉은 먼지를 가르며 대성당 같은 등짝을 드러냈다. 귀청을 찢는 워혼(Warhorn) 경적 소리에 모든 기계교도와 노동자가 무릎을 꿇는다.",
    choices: [
      {
        label: "[기계교 전용] 이진법 찬가를 합창하며 타이탄 기동 데이터 스트림에 경건히 접속한다",
        req: { anyTags: ["mechanicus"] },
        effect: {
          text: "신의 기계가 뿜어내는 장엄한 기계령의 울림이 회로를 적셨다! 기술적 영감이 폭발한다.",
          stats: { Int: 6, WP: 5, Inf: 4 }
        }
      },
      {
        label: "압도적인 전쟁 병기의 위용을 경외하며 무릎 꿇고 기도한다",
        effect: {
          text: "저 강철의 신이 인류 편에 서 있는 한 제국은 무너지지 않으리라는 확신이 가슴을 채웠다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Collegia Titanica / Mars"
  },
  {
    id: "ev_cadia_pylon_hum",
    title: "카디아 — 고대 블랙스톤 파일런의 기이한 정적",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["cadia"] },
    reqLabel: "행성: 카디아",
    weight: 26,
    text: "카디아 평원 한복판에 솟은 정체불명의 고대 검은 석주(파일런) 근처를 순찰하던 중, 갑자기 세상의 모든 소리가 기묘하게 먹먹해지고 가슴속에서 알 수 없는 공허감이 차오른다. 공포의 눈을 막아 주는 수수께끼의 유물이다.",
    choices: [
      {
        label: "[사이커 전용] 워프 차단 장막의 극심한 두통을 의지로 견뎌 낸다",
        req: { allTags: ["psyker"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "사이킥 능력이 잠시 봉인되는 고통을 이겨 내며 오히려 오염이 씻겨 나가는 기이한 정화를 겪었다!",
          stats: { WP: 6 },
          corruption: -12
        },
        fail: {
          text: "극심한 편두통과 구토에 시달리며 의무실로 후송되었다.",
          wounds: -18
        }
      },
      {
        label: "[지성 판정] 석주 표면의 기하학적 외계 문양을 유심히 관찰해 기록한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "이 석주들이 무너지면 은하계 전체가 워프에 삼켜지리라는 불길한 직감을 얻었다.",
          stats: { Int: 5, WP: 3 }
        },
        fail: {
          text: "알 수 없는 공허감과 무기력에 빠져 사흘간 앓아누웠다.",
          wounds: -10
        }
      },
      {
        label: "기분 나쁜 고대 물건이다. 발걸음을 재촉해 순찰을 마친다",
        effect: {
          text: "카디아 병사에게 중요한 것은 석주의 정체가 아니라 적을 향해 쏠 라스건뿐이다.",
          stats: { WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Cadian Pylons / Fall of Cadia"
  },
  {
    id: "ev_krieg_surface_march",
    title: "크리그 — 지상 방사능 황무지의 실전 행군",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["krieg"] },
    reqLabel: "행성: 크리그",
    weight: 26,
    text: "지하 벙커의 육중한 방폭문이 열리고, 잿빛 핵겨울과 방사능 진흙탕이 끝없이 펼쳐진 크리그 지상으로 120km 강행군이 선포되었다. 방독면 필터 수명은 딱 48시간뿐이다.",
    choices: [
      {
        label: "[강인 판정] 거친 숨을 고르며 단 한 번도 대열에서 이탈하지 않고 완주한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "방사능 폭풍을 맨몸으로 뚫고 대열 선두로 귀환했다! 진정한 크리그의 강철 육체로 거듭났다.",
          stats: { T: 6, WP: 5 },
          faith: 6
        },
        fail: {
          text: "필터 균열로 방사능 먼지를 들이마셔 피를 토했으나 끝까지 기어 돌아왔다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "[의지 판정] 쓰러진 동료의 군장과 탄약까지 짊어지고 묵묵히 행진한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "장비 손실률 0%! 크리그 장교에게 '가장 효율적인 속죄의 도구'라는 최고의 찬사를 들었다.",
          stats: { WP: 5, T: 4, Inf: 4 }
        },
        fail: {
          text: "과중한 무게에 무릎 인대가 상해 의무동으로 옮겨졌다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Krieg"
  },
  {
    id: "ev_necromunda_spyrer",
    title: "네크로문다 — 상층 스파이어러(Spyrers) 귀족 사냥단 습격!",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["necromunda"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    reqLabel: "행성: 네크로문다 (하층 거주자)",
    weight: 26,
    text: "어두운 언더하이브 복도에 번쩍이는 첨단 외계·고대 슈트를 입은 괴한들이 나타났다! 상층 첨탑 귀족 자제들이 성인식 겸 재미 삼아 하층민을 사냥하러 내려오는 '스파이어러 사냥단'이다!",
    choices: [
      {
        label: "[민첩 판정] 폐쇄된 증기 파이프 미로로 기어들어가 열화상 추적을 따돌린다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "고온 증기 속에 체온을 감추어 살인 귀족들의 추적을 완벽히 뿌리쳤다!",
          stats: { Ag: 6, Int: 4 }
        },
        fail: {
          text: "에너지 발톱에 등을 베였으나 가까스로 폐기물 슈트로 뛰어내려 목숨을 건졌다.",
          wounds: -28
        }
      },
      {
        label: "[백병/사격 판정] 어차피 죽을 바엔 부비트랩을 터뜨려 귀족 놈 하나라도 끌어내린다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "고압 화학 탱크를 터뜨려 스파이어러 한 명을 쓰러뜨렸다! 언더하이브 전역에 전설로 회자되었다!",
          stats: { WS: 7, Inf: 8, WP: 5 }
        },
        fail: {
          text: "첨단 방어막에 공격이 튕겨 나가고 치명상을 입었다.",
          wounds: -32
        }
      }
    ],
    source: "Lexicanum: Spyrer / Necromunda"
  },
  {
    id: "ev_baal_red_thirst_pilgrim",
    title: "바알 — 방사능 사막의 천사 석상과 변이 약탈단",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["baal"], excludeTags: ["astartes", "custodes"] },
    reqLabel: "행성: 바알 (부족민/방문자)",
    weight: 26,
    text: "붉은 사막 한가운데 우뚝 선 생귀니우스 석상 아래 오아시스에서 방사능에 미쳐 버린 돌연변이 약탈단이 식수를 독차지하고 있다!",
    choices: [
      {
        label: "[백병 판정] 창과 칼을 빼 들고 오아시스를 되찾기 위해 돌격한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "약탈단 두목을 쓰러뜨리고 귀한 물을 지켜 냈다! 부족 전사들이 그대를 기렸다.",
          stats: { WS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "방사능 쇠창에 찔려 중상을 입었으나 간신히 물 주머니는 챙겨 도망쳤다.",
          wounds: -24
        }
      },
      {
        label: "[민첩 판정] 모래폭풍을 틈타 밤중에 조용히 식수만 길어 빠져나온다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "피 한 방울 흘리지 않고 일주일 치 정제수를 확보했다.",
          stats: { Ag: 5, Int: 3 },
          wounds: 6
        },
        fail: {
          text: "돌연변이 파수병에게 들켜 투석 세례를 맞고 도주했다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Baal / Dante"
  },
  {
    id: "ev_fenris_kraken",
    title: "펜리스 — 빙하 해빙기와 거대 바다 괴수 크라켄",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["fenris"] },
    reqLabel: "행성: 펜리스",
    weight: 26,
    text: "얼음 바다가 갈라지며 섬만 한 거대 바다 괴수 '펜리스 크라켄'의 촉수가 부족의 용선(Longship)을 휘감았다! 차가운 파도 속에서 전사들의 용기가 시험대에 오른다.",
    choices: [
      {
        label: "[백병 판정] 뱃머리로 뛰어올라 도끼와 칼로 크라켄의 촉수를 베어 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "괴수의 촉수를 잘라 내어 전사들과 배를 구했다! 그날 밤 스칼드들이 그대의 이름을 노래로 지었다.",
          stats: { WS: 7, T: 5, Fel: 4, Inf: 6 }
        },
        fail: {
          text: "촉수에 휩쓸려 빙하 바다에 빠졌다가 간신히 끌어올려졌다. 심한 동상과 타박상을 입었다.",
          wounds: -26,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 작살포로 괴수의 거대한 눈을 정조준해 몰아낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 작살 사격에 비명을 지른 크라켄이 심해로 잠적했다!",
          stats: { BS: 6, Int: 3, Inf: 5 }
        },
        fail: {
          text: "갑판이 뒤집히며 돛대에 부딪혀 다쳤다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Fenrisian Kraken"
  },
  {
    id: "ev_catachan_brainleaf",
    title: "카타찬 — 밀림의 악몽, 정신 기생 덩굴 '브레인리프'",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["catachan"] },
    reqLabel: "행성: 카타찬",
    weight: 26,
    text: "밀림 정찰 중 기괴한 덩굴 '브레인리프'가 나뭇가지에서 떨어져 동료의 목덜미를 감았다! 신경계에 뿌리를 내리면 동료를 꼭두각시로 조종해 아군을 공격하게 만든다.",
    choices: [
      {
        label: "[민첩 판정] 기생 뿌리가 척수에 닿기 전 단검으로 번개같이 덩굴을 쳐낸다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "0.5초의 판단으로 동료의 목숨을 구했다! 카타찬 밀림에서 믿을 것은 서로의 등뿐이다.",
          stats: { Ag: 6, WS: 4, Fel: 5 }
        },
        fail: {
          text: "덩굴 가시에 팔을 찔려 독기로 며칠간 고열에 시달렸다.",
          wounds: -22
        }
      },
      {
        label: "[사격 판정] 화염방사기와 라스건으로 주변 덩굴 군락을 통째로 소각한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "화염의 장벽으로 기생 식물을 모조리 태워 야영지 안전을 확보했다.",
          stats: { BS: 5, T: 3 }
        },
        fail: {
          text: "불길에 놀란 독벌레 떼가 쏟아져 온몸을 쏘였다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Catachan Flora"
  },
  {
    id: "ev_voidborn_ghost_deck",
    title: "성간 함선 — 400년 전 봉인된 '유령 하층 갑판' 탐사",
    category: "행성 고유",
    req: { minAge: 14, or: [{ anyWorlds: ["voidborn"] }, { anyTags: ["navy", "rogue_trader"] }] },
    reqLabel: "보이드본 / 임페리얼 네이비 / 로그 트레이더",
    weight: 24,
    text: "길이 6km에 달하는 고대 순양함 최하층, 400년 전 워프 폭풍 사고 이후 용접해 닫아 두었던 78번 유령 갑판에서 미세한 구조 신호와 원자로 전력 누수가 감지되었다.",
    choices: [
      {
        label: "[지성 판정] 공학 장비를 챙겨 진입해 전력 누수를 차단하고 고대 선박 로그를 회수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "잊혀졌던 보조 플라즈마 코어와 고대 보급 창고를 발견해 함장의 큰 포상을 받았다!",
          stats: { Int: 6, Inf: 7, Ag: 3 }
        },
        fail: {
          text: "갑판 내부에 야생화되어 살던 돌연변이 밀항자 무리의 습격을 받아 부상을 입었다.",
          wounds: -24,
          corruption: 4
        }
      },
      {
        label: "[의지 판정] 불경한 기운을 정화하며 격벽 바깥에서 전력선을 안전하게 절단한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "위험한 구역을 열지 않고도 함선의 에너지 손실을 막아 냈다.",
          stats: { WP: 4, Int: 3 }
        },
        fail: {
          text: "고압 아크 방전에 감전되어 화상을 입었다.",
          wounds: -16
        }
      }
    ],
    source: "Rogue Trader: Battlefleet Koronus"
  },
  {
    id: "ev_feral_sky_ship",
    title: "야만 행성 — 불타며 추락한 '하늘 신의 강철 수레'",
    category: "행성 고유",
    once: true,
    req: { minAge: 12, anyWorldTags: ["feral"], excludeTags: ["astartes", "custodes"] },
    reqLabel: "행성: 봉건·야만 행성",
    weight: 28,
    text: "천둥소리와 함께 제국의 정찰 셔틀 한 척이 부족 숲속에 추락했다! 원시 부족민들은 '하늘 신의 사자가 분노해 떨어졌다'며 공포에 질려 엎드렸다.",
    choices: [
      {
        label: "[의지 판정] 두려움을 이기고 다가가 부상당한 제국 조종사를 구출한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "조종사가 보답으로 신비한 빛나는 칼과 성간 문명 지식을 전해 주었고, 훗날 구조 함대에 그대의 용맹을 알렸다!",
          stats: { Int: 7, WP: 5, Inf: 8 }
        },
        fail: {
          text: "누출된 플라즈마 연료에 심한 화상을 입었지만 조종사는 무사히 구출되었다.",
          wounds: -20,
          stats: { WP: 4 }
        }
      },
      {
        label: "[민첩 판정] 부족 주술사 몰래 추락 잔해에서 강철 단검과 이상한 도구만 챙긴다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "부족 최고의 강철 무기를 얻어 일약 전사장의 반열에 올랐다!",
          stats: { WS: 6, Ag: 4 }
        },
        fail: {
          text: "셔틀의 자동 경보 포탑에 쫓겨 상처를 입고 도망쳤다.",
          wounds: -18
        }
      }
    ],
    source: "Dark Heresy: Feral World"
  },

  // =========================================================================
  // 3. 은하계 외계인 · 거대 병기 · 제국 부조리 대확장 이벤트 18종
  // =========================================================================
  {
    id: "ev_xenos_necron_tomb",
    title: "에메랄드빛 각성 — 네크론 무덤 지하실의 눈뜸",
    category: "전투",
    req: { minAge: 16, anyTags: ["militarum", "imperial_military", "astartes", "custodes", "sororitas", "mechanicus", "inquisition_agent", "inquisitor", "rogue_trader"] },
    reqLabel: "군사 · 기계교 · 심문소 · 초인 · 로그 트레이더",
    weight: 16,
    text: "채굴장 지하 깊숙한 곳에서 6천만 년 동안 잠들어 있던 흑요석 피라미드가 섬뜩한 녹색 빛을 내뿜으며 깨어났다! 총탄을 맞아도 은빛 금속 몸체가 스스로 재생되는 네크론 전사 행렬이 무음으로 걸어 나온다!",
    choices: [
      {
        label: "[사격 판정] 가우스 화기가 장전되기 전 중화기 집중 사격으로 재생 회로를 과부하시킨다",
        check: { stat: "BS", diff: -10 },
        success: {
          text: "멜타와 플라즈마 집중 포화로 네크론 군주의 차원문을 닫아 버렸다! 전설적인 외계 토벌 전공이다.",
          stats: { BS: 6, WP: 5, Inf: 8 }
        },
        fail: {
          text: "가우스 광선이 갑주와 피부를 분자 단위로 벗겨 내어 극심한 중상을 입었다.",
          wounds: -32,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 무덤 행성 각성 경보를 즉시 발신하고 지하 갱도를 붕괴시켜 봉쇄한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "적절한 폭파 공학으로 수만 네크론의 지상 진출을 수년간 지연시켰다! 오르도 제노스가 극찬했다.",
          stats: { Int: 7, Inf: 7 }
        },
        fail: {
          text: "스캐럽 군체의 습격에 휘말려 부상을 입고 간신히 탈출했다.",
          wounds: -24
        }
      }
    ],
    source: "Codex: Necrons"
  },
  {
    id: "ev_xenos_tau_propaganda",
    title: "동부 국경의 속삭임 — 타우(T'au) 제국의 '대의' 전단",
    category: "이단·외계",
    req: { minAge: 15, excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "15세+ (쿠스토데스·그레이 나이트 제외)",
    weight: 14,
    text: "밀수선을 타고 정교하게 인쇄된 외계어·로우 고딕 병기 전단이 나돌고 있다. '배고픔과 채찍뿐인 썩은 제국을 떠나, 타우 제국의 대의(Greater Good) 아래 깨끗한 식량과 첨단 의료를 누리라!' 커미사르와 아르비테스가 즉각 소지자 색출에 나섰다.",
    choices: [
      {
        label: "[신앙] 외계인의 감언이설 따위는 역겨운 이단이다! 즉시 불태우고 유포자를 고발한다",
        effect: {
          text: "황제에 대한 흔들림 없는 충성을 증명해 포상과 신앙의 가호를 얻었다.",
          stats: { WP: 4, Inf: 5 },
          faith: 10,
          corruption: -4
        }
      },
      {
        label: "[지성 판정] 전단에 첨부된 타우 통신 주파수를 분석해 외계 밀수망의 좌표를 뽑아낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "밀수 거점을 정확히 찾아내 오르도 제노스에 넘겨 막대한 공훈을 세웠다!",
          stats: { Int: 5, Inf: 8 }
        },
        fail: {
          text: "전단을 오래 들여다보다 아르비테스에게 불심검문당해 한동안 취조를 받았다.",
          wounds: -10,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[금단] 솔직히 인류제국보다 나을지도… 몰래 외계 문물을 보관해 살펴본다",
        req: { excludeTags: ["astartes", "sororitas", "commissar", "lord_commissar", "canoness"] },
        effect: {
          text: "인류제국이 숨겨 온 외계 기술의 편리함에 묘한 의구심이 싹텄다. 심문소가 알면 즉시 총살감이다.",
          stats: { Int: 5 },
          faith: -14,
          corruption: 8,
          addTags: ["xenos_contact"]
        }
      }
    ],
    source: "Codex: T'au Empire / Ciaphas Cain"
  },
  {
    id: "ev_battle_titan_horn",
    title: "전장을 가르는 신의 포효 — 임페리얼 타이탄과 나이트의 진격",
    category: "전투",
    req: { minAge: 16, anyTags: ["militarum", "imperial_military", "astartes", "sororitas", "mechanicus"] },
    reqLabel: "제국 전투 · 기계교 직군",
    weight: 15,
    text: "적의 초중전차 사단에 포위되어 전멸이 눈앞에 닥친 순간, 지평선 너머로 거대한 임페리얼 나이트 기사단과 워로드 타이탄이 보이드 실드를 번뜩이며 강림했다! 10km 밖에서도 가슴 뼈가 울리는 워혼 포효가 전장을 뒤흔든다!",
    choices: [
      {
        label: "[백병/사격 판정] 타이탄의 발밑 엄호를 따라 무너진 적 전선으로 총돌격한다",
        check: { stat: "WS", diff: 10 },
        success: {
          text: "신의 기계가 쓸어버린 불길 뒤로 진격해 결정적인 적 요충지를 점령했다!",
          stats: { WS: 5, BS: 4, WP: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "타이탄 볼케이노 캐논의 충격파에 고막이 터질 듯한 부상을 입었으나 승리를 목격했다.",
          wounds: -16,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 거대 기사단과 보병대의 협동 표적 지시(오스펙스 유도)를 맡는다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "완벽한 화력 유도로 적 지휘부 3곳을 일격에 증발시켰다! 나이트 가문 기사가 경례를 보냈다.",
          stats: { Int: 5, BS: 4, Inf: 7 }
        },
        fail: {
          text: "적 저격수의 표적이 되어 어깨에 관통상을 입었다.",
          wounds: -20
        }
      }
    ],
    source: "Lexicanum: Imperial Knight / Adeptus Titanicus"
  },
  {
    id: "ev_absurd_medicae_triage",
    title: "야전 의무소의 냉혹한 분류 — '약은 장교용, 병사는 기도뿐'",
    category: "부조리",
    req: { minAge: 15, excludeTags: ["astartes", "custodes", "noble", "inquisitor", "rogue_trader", "magos"] },
    reqLabel: "일반 시민 · 하급 군인",
    weight: 16,
    text: "고열과 부상으로 제국 메디케아(의무소)에 실려 갔다. 의무관은 차트를 훑더니 덤덤히 말한다. '장교·귀족 전용 항생제는 재고가 부족하네. 하급 시민용 표준 처방은 진통제 반 알과 《황제 치유 기도문》 10회 암송이야. 아니면 바로 서비터 부서로 넘길까?'",
    choices: [
      {
        label: "[강인 판정] 치욕과 고통을 악물고 진통제 반 알만으로 자력 회복에 버틴다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "지독한 생존력으로 병마를 이겨 내고 멀쩡히 걸어 나왔다! 의무관마저 혀를 내둘렀다.",
          stats: { T: 5, WP: 3 },
          wounds: 10
        },
        fail: {
          text: "제대로 된 치료를 받지 못해 오랜 후유증에 시달렸다.",
          wounds: -18
        }
      },
      {
        label: "[교섭 판정] 비상용 담배와 암시장 화폐를 몰래 찔러 넣어 정상 약품을 얻어낸다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "의무관이 슬쩍 웃으며 장교용 정제 항생제를 꺼내 주었다. 제국을 굴리는 진짜 기름은 뇌물이다.",
          stats: { Fel: 4, Inf: -2 },
          wounds: 18
        },
        fail: {
          text: "뇌물이 적다며 면박만 당하고 복도 끝으로 밀려났다.",
          wounds: -12
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_absurd_servitor_sentence",
    title: "서비터 전환 재판 — 이웃의 사소한 죄",
    category: "부조리",
    req: { minAge: 15, excludeTags: ["astartes", "custodes"] },
    reqLabel: "15세+ (초인 제외)",
    weight: 16,
    text: "평소 알고 지내던 성실한 기술공이 '배급 빵 두 덩이 절도 및 작업 7분 지각' 죄목으로 기계교 서비터 전환형(뇌엽 절제 후 영구 기계 노예화)을 선고받았다. 탄원서를 낼 마지막 10분이 남아 있다.",
    choices: [
      {
        label: "[권위/교섭 판정] 재판관 앞에 나서 작업장 핵심 인력임을 설득해 벌금형으로 감형시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "기적적으로 서비터 개조 명령이 철회되었다! 구역 사람들 사이에서 그대의 덕망이 높아졌다.",
          stats: { Fel: 5, Inf: 5, WP: 3 }
        },
        fail: {
          text: "재판관이 '범죄자 두둔은 동조 혐의'라며 싸늘하게 경고해 입을 다물 수밖에 없었다.",
          stats: { Inf: -4, WP: 2 }
        }
      },
      {
        label: "제국의 법정은 감정을 용납하지 않는다. 다음 차례가 내가 되지 않게 고개를 돌린다",
        effect: {
          text: "일주일 뒤 공장에 새로 배치된 문지기 서비터가 텅 빈 눈으로 그대를 향해 자동문을 열어 주었다.",
          stats: { WP: 2 },
          faith: -3
        }
      }
    ],
    source: "Warhammer Crime: Flesh and Steel"
  },
  {
    id: "ev_absurd_upper_lottery",
    title: "10만 분의 1의 희망 — '상층 첨탑 이주권' 추첨 축제",
    category: "부조리",
    req: { minAge: 14, anyWorldTags: ["hive", "industrial", "civilised", "terra"], excludeTags: ["noble", "astartes", "custodes", "inquisitor"] },
    reqLabel: "도시/하이브 일반 시민",
    weight: 15,
    text: "행성 총독부가 하층민의 불만을 달래기 위해 '모범 시민 1명에게 상층 첨탑 이주권 지급' 추첨을 열었다! 하지만 소문에 따르면 당첨자는 이미 총독 친인척으로 내정되어 있거나, 실은 제국 해군 징발함으로 보낸다는 흉흉한 이야기도 돈다.",
    choices: [
      {
        label: "[지성 판정] 공고문 깨알 약관을 분석해 함정이 있는지 확인한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "역시나 하단 0.5mm 글씨에 '당첨자는 궤도 군수선 종신 봉사 영광 부여'라고 적혀 있었다! 함정을 피해 주변에 귀띔했다.",
          stats: { Int: 5, Fel: 4 }
        },
        fail: {
          text: "속는 셈 치고 응모했다가 낙첨되며 신청 수수료만 날렸다.",
          stats: { Inf: -2 }
        }
      },
      {
        label: "황제께서 굽어살피시리라 믿고 당당히 응모함에 이름을 넣는다",
        check: { stat: "WP", diff: -15 },
        success: {
          text: "뜻밖에도 진짜 소액 장려금과 작업장 반장 표창에 당첨되어 소소한 행운을 누렸다!",
          stats: { Inf: 6, Fel: 3 },
          wounds: 8
        },
        fail: {
          text: "당첨은 고사하고 응모자 명단이 세무국에 넘어가 추가 십일조 고지서만 날아왔다.",
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Warhammer Crime / Necromunda"
  },
  {
    id: "ev_absurd_pension_receipt",
    title: "제국 군부의 '120년 뒤 연금 지급 영수증'",
    category: "부조리",
    req: { minAge: 24, anyTags: ["militarum", "navy", "arbites", "administratum"] },
    reqLabel: "24세+ · 군인 / 해군 / 치안대 / 관료",
    weight: 15,
    text: "오랜 복무 공로로 아드미니스트라툼 재무국에서 '명예 공로 연금 증서'가 도착했다. 기쁜 마음으로 열어 보니 '현재 대기 순번 4억 1,200만 번, 예상 수령 시점 124년 후 (본인 사망 시 영수증 자동 말소)'라고 적혀 있다.",
    choices: [
      {
        label: "[교섭 판정] 재무 서기관에게 훈장과 언변으로 매달려 당장 쓸 수 있는 현물 보급표로 맞바꾼다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "끈질긴 협상 끝에 고급 군화와 아마섹 한 상자, 약간의 권위 보증서를 받아 내는 데 성공했다!",
          stats: { Fel: 4, Inf: 5 },
          wounds: 8
        },
        fail: {
          text: "서기관이 '불경한 재촉'이라며 대기 순번을 6억 번대로 밀어 버렸다.",
          stats: { WP: 2 }
        }
      },
      {
        label: "헛웃음을 삼키며 벽에 액자로 걸어 두고 제국의 유머 감각을 되새긴다",
        effect: {
          text: "동료들이 증서를 보며 폭소를 터뜨렸다. 이 암울한 제국에서 웃음마저 없다면 미쳐 버릴 것이다.",
          stats: { WP: 4, Fel: 2 }
        }
      }
    ],
    source: "Astra Militarum / Imperial Bureaucracy Lore"
  },
  {
    id: "ev_absurd_xenos_weapon",
    title: "전장에 떨어진 외계인 무기의 유혹",
    category: "이단·외계",
    req: { minAge: 16, anyTags: ["militarum", "imperial_military", "inquisition_agent", "inquisitor", "rogue_trader", "streetwise"] },
    reqLabel: "전투/수사/지하세계 경험자",
    weight: 15,
    text: "격전이 끝난 폐허에서 아직 작동하는 정교한 외계인 펄스 카빈을 주웠다. 제식 라스건보다 세 배는 강력하지만, 커미사르나 기계교 사제에게 들키는 순간 '외계 기술 이단'으로 즉결 처형이다.",
    choices: [
      {
        label: "즉시 개머리판으로 부수어 폐기하고 황제의 제식 무기만 신뢰한다",
        effect: {
          text: "외계인의 더러운 도구를 단호히 거부한 태도가 상급자의 칭찬을 샀다.",
          stats: { WP: 4, Inf: 4 },
          faith: 8
        }
      },
      {
        label: "[민첩/사격 판정] 몰래 배낭에 숨겨 두었다가 치명적 위기 순간에 사용한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "아무도 모르게 외계 화력을 활용해 전투에서 대활약을 펼치고 전과를 가로챘다!",
          stats: { BS: 6, Inf: 5 },
          corruption: 6,
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "군장 검사에서 적발되어 혹독한 징계와 심문을 당하고 무기를 압수당했다.",
          wounds: -20,
          stats: { Inf: -6 }
        }
      }
    ],
    source: "Dark Heresy / Only War"
  },
  {
    id: "ev_astartes_honor_duel",
    title: "아스타르테스 형제 간의 명예 결투 (Honor Duel)",
    category: "아스타르테스",
    req: { allTags: ["astartes"], minAge: 20 },
    reqLabel: "아스타르테스 · 20세+",
    weight: 22,
    text: "합동 작전 중 타 중대(또는 형제 챕터)의 베테랑 전사가 작전 주도권을 두고 명예 결투를 신청했다! 목숨을 빼앗지 않는 첫 피(First Blood) 규칙 아래 수십 명의 형제들이 원형 투기장을 에워싼다.",
    choices: [
      {
        label: "[백병 판정] 체인소드 날을 무디게 봉인하고 정면으로 검을 맞댄다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "전광석화 같은 반격으로 상대 견갑에 선명한 검흔을 남겼다! 양 챕터의 형제들이 주먹으로 가슴을 치며 환호했다.",
          stats: { WS: 7, WP: 4, Inf: 8 }
        },
        fail: {
          text: "상대의 노련한 일격에 무릎을 꿇었으나, 패배를 깨끗이 인정하고 전술 교훈을 새겼다.",
          wounds: -18,
          stats: { WS: 3, WP: 4 }
        }
      },
      {
        label: "[지성/교섭 판정] 결투 대신 모의 워게임 전술 대결로 지휘 우위를 증명하자고 제안한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "《코덱스 아스타르테스》의 전술 원리로 상대를 완벽히 설득해 명예와 지휘권을 모두 지켜 냈다.",
          stats: { Int: 6, Fel: 4, Inf: 6 }
        },
        fail: {
          text: "전사의 긍지가 부족하다는 수군거림을 들으며 결국 힘겨운 대련을 치렀다.",
          wounds: -12,
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Codex: Space Marines / Space Wolves & Dark Angels Lore"
  },
  {
    id: "ev_inquisition_radical_puritan",
    title: "이단심문소 비밀 회의 — 청교도파 vs 급진파",
    category: "이단심문소",
    req: { anyCareers: ["inquisition_acolyte", "inquisitor"] },
    reqLabel: "이단심문소 소속",
    weight: 22,
    text: "오르도 비밀 콘클라베에서 격론이 터졌다. 급진파 심문관이 '다가오는 악마 군단을 막기 위해 포획한 데몬호스트(악마 빙의체)를 역이용하자'고 주장하자 청교도파가 볼터를 빼 들며 대치한다!",
    choices: [
      {
        label: "[청교도파] 악마의 힘을 빌리는 자는 이미 이단이다! 단호히 숙청 편에 선다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "청교도파 다수의 지지를 얻어 위험한 데몬호스트 실험을 봉쇄하고 명성을 쌓았다!",
          stats: { WP: 6, Inf: 8 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "급진파의 역공에 밀려 암살 시도를 겪으며 부상을 입었다.",
          wounds: -20
        }
      },
      {
        label: "[급진파] 제국이 살아남을 수 있다면 지옥의 불이라도 훔쳐 써야 한다! 급진파에 동조한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "금지된 지식과 비밀 정보망을 공유받으며 압도적 성과를 올렸지만 영혼에 어둠이 스몄다.",
          stats: { Int: 8, Inf: 8 },
          corruption: 14,
          faith: -10
        },
        fail: {
          text: "통제에서 벗어난 워프 에너지에 휘말려 큰 내상을 입었다.",
          wounds: -24,
          corruption: 16
        }
      }
    ],
    source: "Lexicanum: Puritan & Radical / Eisenhorn"
  },
  {
    id: "ev_sororitas_relic_escort",
    title: "성녀의 유골함 호송 작전",
    category: "신앙",
    req: { anyCareers: ["adepta_sororitas", "canoness", "ecclesiarchy_priest"] },
    reqLabel: "아뎁타 소로리타스 / 국교 성직자",
    weight: 22,
    text: "순교 성녀의 심장이 담긴 황금 성유물함을 최전선 성당으로 호송하던 중, 카오스 워밴드 매복 부대가 성스러운 수송대를 포위했다!",
    choices: [
      {
        label: "[사격/신앙 판정] 성가를 합창하며 볼터와 멀티멜타의 화염으로 적진을 뚫고 성유물을 지킨다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 한 점의 흠집도 없이 성유물함을 봉안했다! 순례자 수만 명이 기적을 외치며 환호했다.",
          stats: { BS: 5, WP: 6, Inf: 8 },
          faith: 14
        },
        fail: {
          text: "성유물함은 지켜 냈으나 적 볼터탄에 중상을 입었다.",
          wounds: -24,
          faith: 10
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_rogue_trader_uncharted",
    title: "미지의 성계 — 황제의 지도에 없는 고대 문명",
    category: "탐험",
    req: { anyCareers: ["rogue_trader", "imperial_navy"] },
    reqLabel: "로그 트레이더 / 임페리얼 네이비",
    weight: 24,
    text: "제국 성도 바깥 헤일로 스타즈(Halo Stars) 경계에서 정체불명의 수정 도시가 남아 있는 무인 행성을 발견했다. 아키오테크 보물이 가득할 수도, 고대 외계 저주가 잠들어 있을 수도 있다.",
    choices: [
      {
        label: "[지성 판정] 정밀 오스펙스 탐사 후 무장 정찰대와 함께 직접 보물 창고에 강하한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 인류 식민지 시절의 순금 데이터 코어와 희귀 보석을 가득 싣고 귀환했다! 가문의 부가 배로 불어났다.",
          stats: { Inf: 12, Int: 5, Fel: 4 }
        },
        fail: {
          text: "고대 방어 드론과 정신 오염 장치에 휘말려 큰 손실을 입고 급히 이륙했다.",
          wounds: -24,
          corruption: 8
        }
      },
      {
        label: "위험한 미지의 별이다. 좌표만 기록해 제국 해군과 기계교에 비싸게 팔아넘긴다",
        effect: {
          text: "안전하게 탐색 좌표 정보료만 두둑이 챙겼다. 현명한 선장은 죽지 않는다.",
          stats: { Inf: 6, Int: 3 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook"
  },
  {
    id: "ev_commissar_deserter_hunt",
    title: "야간 순찰 — 얼어붙은 참호 뒤의 탈영병",
    category: "직업 고유",
    req: { anyCareers: ["commissar", "lord_commissar"] },
    reqLabel: "커미사르 / 로드 커미사르",
    weight: 22,
    text: "포격이 잠시 멎은 한밤중, 보급 창고 뒤에서 겁에 질려 총을 버린 채 도망치려는 17세 신병 둘을 붙잡았다. 아이들은 고향 어머니 이름을 부르며 살려 달라고 애원한다.",
    choices: [
      {
        label: "[의지 판정] 규범대로 즉결 처형을 집행해 연대 전체에 탈영은 곧 죽음임을 각인한다",
        check: { stat: "WP", diff: 10 },
        success: {
          text: "차가운 총성 이후 단 한 명의 탈영병도 나오지 않았다. 연대 군기는 강철처럼 단단해졌다.",
          stats: { WP: 5, Inf: 5, Fel: -2 }
        },
        fail: {
          text: "병사들의 원망 섞인 눈초리가 등 뒤에 꽂히며 사기가 오히려 흔들렸다.",
          stats: { Fel: -5 }
        }
      },
      {
        label: "[교섭 판정] 처형 대신 지뢰 제거 선봉대(징벌 임무)로 보내 목숨으로 속죄할 기회를 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "두 신병은 눈물을 닦고 필사적으로 싸워 다음 전투에서 훈장을 받았다! 병사들의 존경이 깊어졌다.",
          stats: { Fel: 6, Inf: 5, WP: 3 }
        },
        fail: {
          text: "상급 커미사르에게 '규율 해이' 경고를 받았다.",
          stats: { Inf: -5 }
        }
      }
    ],
    source: "Gaunt's Ghosts / Ciaphas Cain"
  },
  {
    id: "ev_admin_paper_avalanche",
    title: "아드미니스트라툼의 물리적 재앙 — '서류 산사태'",
    category: "부조리",
    req: { anyCareers: ["administratum"] },
    reqLabel: "직업: 아드미니스트라툼 관료",
    weight: 24,
    text: "100년째 쌓아 올린 높이 20미터짜리 세금 장부 탑이 진동을 견디지 못하고 무너져 내렸다! 수십만 장의 양피지 눈사태 속에 하급 서기관 셋이 파묻혔다.",
    choices: [
      {
        label: "[민첩 판정] 몸을 던져 매몰된 동료들을 끌어내고 흩어진 문서를 수습한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "동료들을 무사히 구출했다! 다만 상관은 사람보다 '300년 전 밀가루 영수증 분실'에 더 화를 냈다.",
          stats: { Ag: 4, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "무거운 철제 서류함에 발목이 깔려 한 달간 목발을 짚었다.",
          wounds: -18
        }
      },
      {
        label: "[지성 판정] 엉망이 된 서류더미를 36시간 만에 완벽히 재분류해 승진 발판으로 삼는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "경이로운 문서 정리 속도에 수석 서기관이 감탄하며 상급 직위를 내렸다!",
          stats: { Int: 6, Inf: 8 },
          wounds: -8
        },
        fail: {
          text: "철야 과로로 쓰러져 의무실 신세를 졌다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_drukhari_night_raid",
    title: "비명의 밤 — 드루카리(다크 엘다) 노예 사냥 습격!",
    category: "전투",
    req: { minAge: 15, excludeWorlds: ["terra", "mars", "krieg"], excludeTags: ["custodes"] },
    reqLabel: "15세+ (테라·화성·크리그·쿠스토데스 제외)",
    weight: 14,
    text: "하늘에 보랏빛 웹웨이 균열이 찢어지며 가시 돋친 드루카리 레이더 정들이 비명 소리와 함께 도시를 덮쳤다! 저들은 죽이기 위해서가 아니라 산 채로 코모라의 고문실로 끌고 가기 위해 사냥한다!",
    choices: [
      {
        label: "[사격 판정] 어둠 속을 질주하는 약탈정에 화력을 퍼부어 이웃들의 도주로를 연다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "레이더 추진기를 명중시켜 추락시켰다! 약탈자들이 전리품을 버리고 웹웨이로 철수했다.",
          stats: { BS: 6, WP: 5, Inf: 7 }
        },
        fail: {
          text: "독가시 소총(스플린터 라이플)에 스쳐 극심한 신경 독에 시달렸다.",
          wounds: -28
        }
      },
      {
        label: "[민첩 판정] 그림자 속 지하 벙커로 숨어들어 새벽까지 숨소리조차 죽인다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "사냥꾼들의 끔찍한 웃음소리가 멀어질 때까지 완벽히 숨어 살아남았다.",
          stats: { Ag: 5, WP: 3 }
        },
        fail: {
          text: "도주 중 파편에 크게 다쳤으나 다행히 납치만은 면했다.",
          wounds: -20
        }
      }
    ],
    source: "Codex: Drukhari"
  }
);
