// 분기 사건 — 직군 계열: 임페리얼 나이트 (제국 기사 가문 · 기사 행성)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_s17_kni_grand_tourney",
    title: "기사 행성의 대마상 시합과 봉건 맹약",
    category: "기사 행성",
    once: true,
    req: {
      anyWorlds: ["generic_knight"],
      minAge: 14,
      excludeTags: ["astartes", "custodes", "grey_knight", "living_saint", "daemon_prince", "heretic", "high_lord_terra"]
    },
    reqLabel: "행성: 임페리얼 나이트 기사 행성 · 14세+",
    weight: 34,
    text: "고성 첨탑 아래 광활한 마상 시합장에 각 기사 대가문의 문장 깃발이 바람을 가르며 휘날리고 있다. 수십 보 너머에서 걸어 나온 10미터 높이의 퀘스토리스 나이트와 아미저 기체들이 전투 나팔을 일제히 울려 대지를 진동시키자, 관중석의 영지민과 외지 사절단 모두가 숨을 죽였다. 대마상 시합과 봉건 맹약 갱신식이 열리는 오늘은 무예와 기사도를 증명할 절호의 무대이자, 기사 가문들의 자존심과 제국 십일조 이해관계가 날카롭게 부딪치는 정치의 전장이기도 하다.",
    choices: [
      {
        label: "[백병 판정] 기사 가문 혈통의 명예를 걸고 대마상 시합의 결투장에 나서서 경쟁 가문 후보들과 무예를 겨룬다",
        req: { allTags: ["knight_blood"] },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "날카로운 검격과 완벽한 보법으로 경쟁 가문의 유력 후계자를 제압하자, 시합장 전역에서 우레와 같은 환호와 전투 나팔 소리가 터져 나왔다. 패배한 상대는 분한 눈빛으로 다시 겨룰 날을 기약하며 그대의 이름을 숙명의 상대로 새겼다.",
          stats: { WS: 6, Fel: 4, Inf: 6 },
          faith: 3,
          align: { dogmatic: 4 },
          addTags: ["bond_rival"]
        },
        fail: {
          text: "상대의 변칙적인 창술에 방어가 갈라지며 어깨 갑주가 찢어지는 부상을 입고 모래바닥에 무릎을 꿇었다. 귀족석의 냉소 어린 탄식 속에서 뼈아픈 교훈과 설욕의 다짐만을 안고 물러났다.",
          wounds: -14,
          stats: { WS: 3, Inf: -3 },
          align: { dogmatic: 2 }
        }
      },
      {
        label: "[교섭 판정] 귀빈석과 봉신 기사들의 연회를 오가며 가문 간 맹약과 제국 보급 협정의 가교를 놓는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "오래된 영지 경계 분쟁으로 날을 세우던 두 가문의 원로들을 정중한 예법과 현실적 절충안으로 설득해 냈다. 시합이 끝난 뒤 여러 가문의 집사들이 그대에게 감사의 서신과 호의를 전해 왔다.",
          stats: { Fel: 5, Inf: 5, Int: 3 },
          faith: 3,
          align: { humane: 5 }
        },
        fail: {
          text: "까다로운 봉건 궁정 예법을 어겨 한 호전적인 영주의 역린을 건드렸고, 결국 명예 회복을 위한 약식 검술 시합에 불려 나가 상처와 체면 손상을 함께 겪었다.",
          wounds: -8,
          stats: { Fel: 2, Inf: -4 }
        }
      },
      {
        label: "[의지 판정] 거대한 나이트 아머들의 행진과 선조의 서약 낭독 앞에서 외경심을 다잡고 제국 기사도의 본질을 되새긴다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "고막을 울리는 전투 나팔과 강철 거신들의 위압감 속에서도 흔들리지 않고 서약식을 끝까지 지켜보았다. 어둠의 은하를 버티는 기사도와 충성의 무게가 정신 깊숙이 각인되었다.",
          stats: { WP: 5, Int: 3 },
          faith: 6,
          align: { dogmatic: 4 }
        },
        fail: {
          text: "거대한 원자로의 열기와 고막을 찢는 전투 나팔의 공명에 압도당해 중심을 잃고 쓰러지며 경미한 타박상과 망신을 겪었다.",
          wounds: -8,
          stats: { WP: 2 },
          faith: -3
        }
      },
      {
        label: "관람석 외곽에서 사크리스탄의 정비 행렬과 장갑 수리 의식을 조용히 관찰하며 기사 행성의 질서를 익힌다",
        effect: {
          text: "화려한 귀족들의 환호 뒤편에서 묵묵히 성유를 바르고 관절을 조이는 사크리스탄들의 손길을 유심히 지켜보았다. 거신 병기가 전장에 서기까지 필요한 보이지 않는 노고를 깊이 이해했다.",
          stats: { Int: 3, WP: 2 },
          faith: 2
        }
      }
    ],
    source: "Lexicanum: Knight World / Codex: Imperial Knights / Assassinorum: Kingmaker"
  },
  {
    id: "ev_s17_kni_armiger_hunt",
    title: "아미저 측면 초계 — 거대 야수 무리와 오크 약탈대 요격",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_squire"],
      allTags: ["imperial_knight"]
    },
    reqLabel: "직군: 기사 가문 종자 · 아미저 조종사",
    weight: 35,
    text: "기사 행성 외곽의 험준한 협곡에서 경량 보행 병기 아미저의 헬름 메카니쿰에 신경을 연결한 채 선배 기사단의 측면을 초계하고 있었다. 그때 추락한 오크 약탈선의 잔당들이 요란한 굉음을 내며 계곡을 덮쳤고, 불길에 놀라 날뛰는 거대 야수 무리가 방벽 없는 영지민 농촌을 향해 돌진하기 시작했다. 본대의 헬름 메카니쿰 지령망에서는 즉시 측면 대형으로 복귀하라는 차가운 신호가 울리고 있다.",
    choices: [
      {
        label: "[백병 판정] 아미저 워글레이브의 출력을 최대로 끌어올려 리퍼 체인클리버와 서멀 스피어로 오크 선두와 거대 야수를 정면 분쇄한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "서멀 스피어의 작열하는 광선이 오크 약탈 차량을 두 동강 냈고, 회전하는 리퍼 체인클리버가 날뛰던 우두머리 야수를 단칼에 쓰러뜨렸다. 곁에서 함께 돌격한 동료 아미저 조종사와 등을 맡기며 끈끈한 전우애를 맺었다.",
          stats: { WS: 6, Ag: 4, Inf: 4 },
          align: { dogmatic: 4 },
          addTags: ["bond_comrade"]
        },
        fail: {
          text: "광포한 야수의 뿔과 오크의 조잡한 로켓포가 동시에 기체 옆구리를 강타했다. 헬름 메카니쿰을 타고 전해진 신경 충격으로 각혈하며 가까스로 기체를 세웠으나, 장갑과 체면 모두 깊은 흠집이 남았다.",
          wounds: -18,
          stats: { WS: 3, T: 2, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 아미저 헬베린의 쌍열 오토캐논으로 협곡 능선을 장악하고 촌락으로 쇄도하는 적 무리에 정밀 교차 화망을 퍼붓는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "능선 위에서 쏟아진 쌍열 오토캐논의 철갑탄이 촌락 목책 바로 앞에서 오크 약탈대와 야수 무리를 완벽히 갈라놓았다. 살아남은 영지민들이 연기 너머의 강철 수호자를 향해 무릎을 꿇고 감사를 올렸다.",
          stats: { BS: 6, Int: 4, Fel: 3 },
          faith: 3,
          align: { humane: 6 }
        },
        fail: {
          text: "급격한 연속 사격 도중 탄약 급탄기가 과열로 걸리면서 화망에 빈틈이 생겼다. 틈을 탄 약탈대가 촌락 외곽 곡창을 불태웠고, 긴급 회피 도중 조종석 충격으로 부상을 입었다.",
          wounds: -14,
          stats: { BS: 3, Inf: -3 },
          align: { humane: 3 }
        }
      },
      {
        label: "선배 퀘스토리스 기사의 헬름 메카니쿰 지령에 복종해 촌락 구원을 유보하고 본대 측면 엄호 대형을 엄격히 유지한다",
        effect: {
          text: "촌락 방향에서 피어오르는 검은 연기를 외면한 채 한 치의 흐트러짐 없이 본대 측면을 지켰다. 상급 기사는 종자의 냉엄한 복종심을 높이 평가했으나, 가슴 한편에 무거운 침묵이 가라앉았다.",
          stats: { WP: 4, Inf: 4 },
          align: { dogmatic: 5, humane: -3 }
        }
      },
      {
        label: "혼란을 틈타 오크 무리가 쌓아 둔 희귀 광석과 고철 화물만 은밀히 가로채 사적 정비 자금으로 빼돌린다",
        effect: {
          text: "전장의 먼지 속에 숨어 약탈대의 수송 차량을 가로채고 값비싼 합금 부품을 가문 창고가 아닌 은밀한 거래처로 돌렸다. 실속은 단단히 챙겼으나 기사도의 서약에서는 한 걸음 멀어졌다.",
          stats: { Ag: 3, Inf: 5 },
          faith: -3,
          align: { ruthless: 7, dogmatic: -3 }
        }
      }
    ],
    source: "Lexicanum: Armiger / Codex: Imperial Knights"
  },
  {
    id: "ev_s17_kni_sacristan_forge",
    title: "사크리스탄 대장간 성소 — 정비의 맹약과 기계령의 부름",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_squire", "knight_scion"]
    },
    reqLabel: "직군: 기사 가문 종자 · 퀘스토리스 기사",
    weight: 38,
    text: "성유 냄새와 향 연기가 자욱한 지하 사크리스탄 대장간 성소에서, 붉은 로브를 걸친 수석 사크리스탄이 거대한 정비 크레인 아래 그대를 불러 세웠다. 아뎁투스 메카니쿠스의 포지 월드에서 비전을 전수받은 사크리스탄들은 기사 가문의 나이트 아머를 지탱하는 숨은 심장이다. 수석은 전투마다 원자로와 이온 실드 출력을 과도하게 혹사하는 젊은 기사들을 우려하며, 기계령의 예법을 존중하고 전장 계측 기록을 성소에 공유하겠다는 고대의 정비 맹약을 제안했다.",
    choices: [
      {
        label: "[지성 판정] 수석 사크리스탄과 함께 밤새 이온 실드 축전기와 원자로 공명 회로를 조율하며 기계령의 이진법 성가를 암송한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "미세한 출력 불균형을 정교하게 잡아내자 나이트 아머의 원자로가 한층 부드러운 고동을 울렸다. 수석 사크리스탄은 그대의 진지한 이해력에 감복해 직접 정비 비전을 전수하는 스승이 되어 주었고, 성소의 정비 맹약 인장을 하사했다.",
          stats: { Int: 6, WP: 4, Inf: 5 },
          faith: 3,
          align: { dogmatic: 4 },
          addTags: ["sacristan_oath", "bond_mentor"]
        },
        fail: {
          text: "성급하게 고전압 축전기 회로를 만지다 거센 플라즈마 불꽃이 튀며 화상을 입었고, 분노한 기계령을 달래느라 성소 전체의 정비가 지연되었다. 수석의 싸늘한 질책 속에 맹약은 다음 기회로 미뤄졌다.",
          wounds: -14,
          stats: { Int: 2, Inf: -3 },
          corruption: 2
        }
      },
      {
        label: "[권위 판정] 아뎁투스 메카니쿠스와의 깊은 연을 앞세워 성소 금고에 봉인된 고대 서멀 캐논 냉각 코어까지 개방하게 한다",
        req: { anyTags: ["mechanicus"] },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "포지 월드의 격식과 이진법 암호를 유창히 제시하자 사크리스탄 장로들이 공손히 고개를 숙였다. 정비 맹약과 함께 최상급 냉각 코어가 기체에 장착되어 화력 지속 능력이 비약적으로 향상되었다.",
          stats: { BS: 5, Int: 5, Inf: 6 },
          align: { dogmatic: 3 },
          addTags: ["sacristan_oath"]
        },
        fail: {
          text: "성소의 자치권을 침해한다는 반발이 일며 장로들이 금고 봉인을 거부했다. 냉랭한 언쟁 끝에 고압 증기 밸브가 터지는 소동까지 벌어져 상처와 위신 실추를 겪었다.",
          wounds: -10,
          stats: { Inf: -4, Int: 2 }
        }
      },
      {
        label: "사크리스탄 성소의 고대 규율을 공손히 받아들이고, 전투 기록과 정비권을 성소에 맡기는 정비의 맹약에 서명한다",
        effect: {
          text: "성유를 묻힌 깃펜으로 양피지에 서명하자, 붉은 로브의 사크리스탄들이 일제히 이진법 축복을 읊조리며 그대의 기체에 황동 맹약 인장을 새겨 주었다. 앞으로 어느 성소를 찾더라도 기계령의 벗으로 대우받을 것이다.",
          stats: { WP: 4, Int: 3, Fel: 3 },
          faith: 4,
          align: { humane: 4, dogmatic: 3 },
          addTags: ["sacristan_oath"]
        }
      },
      {
        label: "고귀한 기사가 기계교 수리공의 간섭을 받을 수 없다며 맹약을 거부하고 가문 직속 병기창에서 강제로 출격을 준비한다",
        effect: {
          text: "수석 사크리스탄은 침묵 속에 향로를 거두며 물러났다. 가문의 독자성과 자존심은 지켰으나, 성소의 최상급 부품 지원은 당분간 기대하기 어렵게 되었다.",
          stats: { WS: 4, Inf: 4, Int: -2 },
          align: { ruthless: 6, dogmatic: -3 }
        }
      }
    ],
    source: "Lexicanum: Sacristan / Codex: Imperial Knights / Kingsblade"
  },
  {
    id: "ev_s17_kni_throne_echoes",
    title: "스론 메카니쿰의 메아리 — 충돌하는 선조 기사령들",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_scion"],
      allTags: ["knight_scion"]
    },
    reqLabel: "직군: 임페리얼 나이트 기사",
    weight: 36,
    text: "격렬한 행성 탈환전의 한복판, 퀘스토리스 나이트 조종석의 스론 메카니쿰에 연결된 신경 회로가 불길하게 요동쳤다. 수천 년간 이 거신을 몰았던 선조 기사들의 잔류 의식이 일제히 깨어나 그대의 머릿속에서 격렬하게 충돌하기 시작한 것이다. 자비로운 선대 기사는 포격에 노출된 피난민 행렬을 먼저 지키라 외치고, 준엄한 선대 영주는 희생을 무릅쓰고 이단 지휘 본부를 향해 돌격하라 호령하며, 냉혹한 정복자 선조는 혼란을 틈타 무너진 요새의 고대 유물 무기고를 가문 독점으로 확보하라 속삭인다.",
    choices: [
      {
        label: "[의지 판정] 자비로운 선대 기사의 메아리와 공명해 기계령의 살의를 가라앉히고 피난민 행렬을 엄호하는 쪽으로 거신을 돌린다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "분노로 날뛰던 전쟁 선조들의 함성을 단단한 의지로 잠재우고, 이온 실드를 활짝 펼쳐 포화 속 피난민들의 방패가 되었다. 스론 메카니쿰 안쪽에서 오랜 안도의 숨결 같은 온기가 흘러나왔다.",
          stats: { WP: 6, Fel: 5, Inf: 4 },
          faith: 5,
          align: { humane: 10, ruthless: -4 }
        },
        fail: {
          text: "전투에 굶주린 선조 의식들의 격렬한 반발이 신경 접속관을 타고 덮쳐 심한 코피와 두통에 시달렸다. 비틀거리면서도 끝내 피난민 행렬 쪽으로 방패를 돌렸으나 기체와 육신 모두 큰 타격을 입었다.",
          wounds: -18,
          stats: { WP: 3, Int: -2 },
          align: { humane: 6 }
        }
      },
      {
        label: "[권위 판정] 준엄한 선대 영주의 기사도 규율을 받아들여 망설임 없이 이단 군기의 심장부로 리퍼 체인소드를 겨눈다",
        check: { stat: "Inf", diff: -8 },
        success: {
          text: "수십 세대의 전쟁 함성이 그대의 지휘 의지 아래 하나로 결집되었다! 굉음과 함께 돌격한 퀘스토리스 나이트가 이단 지휘 진지를 단숨에 갈아엎으며 전선의 승기를 결정지었다.",
          stats: { WS: 6, WP: 5, Inf: 6 },
          faith: 6,
          align: { dogmatic: 10, humane: -3 }
        },
        fail: {
          text: "선조들의 과도한 투쟁심이 조종 계통을 잠식해 무리한 돌격을 강행하고 말았다. 적 대전차 화망에 흉갑이 찢기는 중상을 입고서야 가까스로 정신의 주도권을 되찾았다.",
          wounds: -16,
          stats: { WS: 3, Inf: -3 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[지성 판정] 냉혹한 정복자 선조의 속삭임을 역이용해 신경 동조 회로를 재분배하고 폐허의 고대 무기고를 가문 전리품으로 선점한다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "전선의 교착 상태를 냉정히 계산해 주력 전장을 우회한 뒤, 요새 지하에 숨겨진 고대 무구와 희귀 부품을 가문 수송대에 실어 냈다. 아군 사령부의 원망을 샀으나 가문의 무력은 한층 비대해졌다.",
          stats: { Int: 6, BS: 4, Inf: 7 },
          corruption: 3,
          align: { ruthless: 10, humane: -5 }
        },
        fail: {
          text: "신경 동조 회로를 억지로 비트는 과정에서 역전류가 터져 조종석에 화상을 입었고, 탐욕스러운 선조의 어두운 잔향이 정신 깊숙이 끈적하게 들러붙었다.",
          wounds: -16,
          stats: { Int: 2, Inf: -4 },
          corruption: 6,
          align: { ruthless: 6 }
        }
      },
      {
        label: "모든 선조의 목소리를 단호히 차단하고 스론 메카니쿰의 동조율을 최소 안전선으로 낮춘 채 기본 작전만 수행한다",
        effect: {
          text: "수천 년의 메아리를 차갑게 밀어낸 채 오직 현재의 계기판 수치만을 믿고 전투를 마쳤다. 극적인 영웅담은 없었으나 그대의 자아와 기체 모두 온전하게 보존되었다.",
          stats: { WP: 4, T: 3 },
          faith: 2
        }
      }
    ],
    source: "Lexicanum: Throne Mechanicum / Codex: Imperial Knights / Kingsblade"
  },
  {
    id: "ev_s17_kni_questor_tithe",
    title: "두 주인의 십일조 — 화성 마고스와 제국 성전 사령부의 갈등",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_scion", "knight_high_king"]
    },
    reqLabel: "직군: 퀘스토리스 기사 · 기사 행성 대군주",
    weight: 35,
    text: "성채의 대전당에 상반된 두 통의 봉인 칙서가 동시에 도착했다. 한편에서는 인근 포지 월드의 아크마고스가 기술의 암흑기 이래의 동맹 조약을 들먹이며, 고대 유물 회수 작전에 기사단과 희귀 광물 십일조를 전량 투입하라고 압박한다. 다른 한편에서는 제국 성전 사령부의 장군이 쌍두 독수리 인장을 내밀며, 수백만 시민이 포위된 공성 전선을 뚫기 위해 즉각 기사단을 파견하라고 요구한다. 퀘스토리스 임페리알리스와 퀘스토리스 메카니쿠스 사이의 오래된 줄다리기가 그대의 결단을 기다리고 있다.",
    choices: [
      {
        label: "[지성 판정] 사크리스탄 정비 맹약을 근거로 포지 월드와 성전 사령부를 중재해 합동 보급 및 순차 출격 협정을 관철한다",
        req: { allTags: ["sacristan_oath"] },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "사크리스탄 성소의 신뢰와 치밀한 병참 계산을 앞세워, 성전 공성전 돌파 직후 유물 회수 호위를 보장하는 이중 협약을 타결했다. 화성의 최신 부품 지원과 제국 사령부의 명예 훈장을 모두 거머쥐었다.",
          stats: { Int: 6, Inf: 7, Fel: 5 },
          faith: 3,
          align: { humane: 5, dogmatic: 3 }
        },
        fail: {
          text: "양측 사절단의 자존심이 충돌해 중재안이 결렬되었고, 화성 측의 보복성 부품 지연과 사령부의 질책 사이에서 고된 수습 비용을 치러야 했다.",
          wounds: -8,
          stats: { Int: 3, Inf: -4 }
        }
      },
      {
        label: "[교섭 판정] 퀘스토리스 임페리알리스의 충성을 선언하고 포지 월드의 요구를 물리친 채 수백만 시민을 구할 성전 공성전으로 출진한다",
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "황금 옥좌를 향한 숭고한 기사도의 웅변이 전당을 울렸다. 성전 사령부의 전폭적인 찬사 속에 출진한 기사단이 포위망을 산산조각 내며 인류의 방패임을 증명했다.",
          stats: { Fel: 6, WS: 5, Inf: 6 },
          faith: 6,
          align: { humane: 6, dogmatic: 4 }
        },
        fail: {
          text: "격분한 포지 월드 마고스가 예비 부품 공급을 전면 중단하는 바람에, 낡은 관절과 불안정한 이온 실드를 안고 무리한 전투를 치르다 큰 상처를 입었다.",
          wounds: -14,
          stats: { Inf: -4, WP: 3 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[권위 판정] 아뎁투스 메카니쿠스와의 고대 맹약을 우선해 퀘스토리스 메카니쿠스의 깃발을 올리고 유물 회수 작전을 택한다",
        check: { stat: "Inf", diff: -8 },
        success: {
          text: "성전 장군의 항의를 기사 행성의 독립 헌장으로 냉정히 일축하고 포지 월드 함대와 합류했다. 회수된 고대 유물의 대가로 최상급 서멀 캐논과 장갑판 보급권을 독점 확보했다.",
          stats: { Int: 6, BS: 5, Inf: 7 },
          align: { ruthless: 5, dogmatic: 3 }
        },
        fail: {
          text: "제국 성전 사령부가 기사 가문을 군무 태만으로 원로원에 공식 고발했고, 궤도 수송선 배정이 끊기면서 작전 도중 고립되어 상처와 막대한 위신 손상을 입었다.",
          wounds: -12,
          stats: { Inf: -5, Fel: -3 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "어느 쪽에도 영구 종속을 약속하지 않고, 기사 가문의 독립 헌장에 따라 병력을 절반씩 분할 파견해 최소한의 의무만 이행한다",
        effect: {
          text: "포지 월드와 성전 사령부 모두 노골적인 불만을 표했으나, 독립 기사 영지로서의 균형과 자치권만큼은 흔들리지 않고 지켜 냈다.",
          stats: { WP: 4, Fel: 3, Inf: 2 }
        }
      }
    ],
    source: "Lexicanum: Questor Imperialis / Questor Mechanicus / Codex: Imperial Knights"
  },
  {
    id: "ev_s17_kni_honor_duel",
    title: "명예의 일기토 — 후퇴하는 제국군 앞을 가로막은 타락한 거신",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_scion", "knight_freeblade"]
    },
    reqLabel: "직군: 퀘스토리스 기사 · 프리블레이드",
    weight: 36,
    text: "잿빛 화산재가 휘날리는 협곡 다리 위로 피투성이가 된 아스트라 밀리타룸 보병 연대가 필사적으로 철수하고 있었다. 바로 그때 무너진 성벽 연기 너머로 부서진 쇠사슬과 워프 불꽃을 휘감은 타락한 카오스 나이트가 모습을 드러냈다. 검은 투구 확성기에서 기사도를 조롱하는 찢어지는 비명과 함께 일기토 도전장이 울려 퍼진다. 저 거신이 다리 입구에 닿으면 퇴각하는 수천 명의 가드맨이 단숨에 짓밟히고 말 것이다.",
    choices: [
      {
        label: "[민첩 판정] 아미저 종자 시절 몸에 익힌 측면 기동 감각으로 거대한 기체를 과감히 선회시켜 카오스 나이트의 이온 실드 사각을 찌른다",
        req: { anyPastCareers: ["knight_squire"] },
        check: { stat: "Ag", diff: -8 },
        success: {
          text: "거대한 퀘스토리스 기체라고는 믿기지 않는 날렵한 측면 선회가 타락한 거신의 헛손질을 유도했다! 이온 실드 틈새로 파고든 일격에 적 원자로가 폭발했고, 다리를 건너던 가드맨 연대가 일제히 함성을 터뜨렸다.",
          stats: { Ag: 6, WS: 6, Inf: 6 },
          faith: 5,
          align: { humane: 5, dogmatic: 4 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "화산재 지반이 미끄러지며 선회 각도가 어긋났고, 카오스 나이트의 오염된 사슬톱이 기체 옆구리를 깊게 갈라 놓았다. 연대 대전차포의 엄호 덕분에 살아남았으나 심각한 상처와 워프 잔향을 입었다.",
          wounds: -22,
          stats: { Ag: 3, WS: 2 },
          corruption: 4
        }
      },
      {
        label: "[백병 판정] 이온 실드를 전면 최대 출력으로 집중한 채 전투 나팔을 울리며 정면 일기토를 수락하고 리퍼 체인소드로 목을 노린다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "두 거신의 사슬톱이 맞부딪칠 때마다 협곡 전체에 번개 같은 불꽃이 튀었다. 한 치도 물러서지 않은 정면 승부 끝에 타락한 기사의 투구를 양단하자, 전장 전체가 제국 기사도의 승리 앞에 전율했다.",
          stats: { WS: 8, WP: 5, Inf: 7 },
          faith: 6,
          align: { dogmatic: 7 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "막강한 카오스의 괴력에 밀려 어깨 장갑이 통째로 뜯겨 나갔고, 조종석 내부로 들이친 열폭풍에 중상을 입었다. 가까스로 버텨 퇴각 시간은 벌었으나 기체는 반파되고 말았다.",
          wounds: -26,
          stats: { WS: 3, T: 2 },
          corruption: 3
        }
      },
      {
        label: "[사격 판정] 일기토의 허례를 거부하고 협곡 능선에서 서멀 캐논과 중기관포의 집중 사격으로 적의 다리 관절부터 무너뜨린다",
        check: { stat: "BS", diff: -8 },
        success: {
          text: "모욕적인 도발을 냉정히 묵살하고 서멀 캐논의 백열 광선을 무릎 관절에 연달아 꽂아 넣었다. 무릎 꿇은 카오스 나이트가 절규하며 협곡 아래로 추락하는 사이 제국군은 무사히 다리를 건넜다.",
          stats: { BS: 7, Int: 4, Inf: 5 },
          align: { ruthless: 5, humane: 3 }
        },
        fail: {
          text: "적 거신의 워프 포격이 먼저 이온 실드를 뚫고 능선을 강타했다. 폭풍에 휩쓸려 부상을 입고 다리 교각마저 손상되어 가드맨 부대 일부를 잃고 말았다.",
          wounds: -20,
          stats: { BS: 3, Inf: -3 }
        }
      },
      {
        label: "이온 실드 방벽으로 협곡 다리 입구만을 틀어막아 가드맨 연대가 철수할 시간을 버는 방어전에 집중한다",
        effect: {
          text: "쏟아지는 적 포화를 온몸으로 받아내며 다리 입구를 끝까지 버텨 냈다. 장갑은 만신창이가 되었으나, 마지막 부상병이 안전지대에 닿는 순간까지 강철의 방패는 무너지지 않았다.",
          wounds: -12,
          stats: { T: 4, WP: 4, Fel: 3 },
          align: { humane: 7 }
        }
      }
    ],
    source: "Lexicanum: Chaos Knight / Codex: Imperial Knights / Kingsblade"
  },
  {
    id: "ev_s17_kni_freeblade_hive",
    title: "버려진 하이브의 고독한 강림 — 프리블레이드의 맹세",
    category: "임페리얼 나이트",
    once: true,
    req: {
      minYear: 745,
      anyCareers: ["knight_freeblade"],
      allTags: ["knight_freeblade"]
    },
    reqLabel: "745.M41+ · 직군: 프리블레이드 방랑 기사",
    weight: 37,
    text: "궤도 구원이 끊긴 변방 하이브 월드의 유독 안개 속으로 그대의 강하 성채가 불꽃을 흩뿌리며 내려앉았다. 행성 총독과 상층 귀족들은 이미 몇 주 전 수송선을 타고 도주했고, 굶주린 민병대와 하층 노동자들만이 무너져 가는 외곽 방벽 뒤에서 밀려오는 타이라니드 포식자 무리에 맞서고 있었다. 가문의 문장을 지운 고독한 거신이 안개를 가르고 나타나자, 절망에 잠긴 군중 사이에서 탄성과 울음이 동시에 터져 나왔다.",
    choices: [
      {
        label: "[강인 판정] 탄약이 바닥날 때까지 무너진 성문을 거신으로 틀어막고, 민병대와 피난민들이 마지막 궤도 셔틀에 오를 때까지 홀로 버텨 낸다",
        check: { stat: "T", diff: -8 },
        success: {
          text: "산성 생체 포자가 장갑을 녹이고 이온 실드가 꺼져 가는 극한 속에서도 단 한 발짝도 물러서지 않았다. 마지막 피난 셔틀이 구름을 뚫고 솟아오를 때, 생존자들은 이름 없는 방랑 기사를 영원한 수호 성인으로 기억했다.",
          stats: { T: 7, WP: 6, Fel: 5 },
          faith: 6,
          align: { humane: 12, ruthless: -4 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "거대 생체 괴수의 발톱과 산성액이 다리 장갑을 뚫고 조종석까지 스며들어 극심한 상처를 입었다. 간신히 피난선을 띄워 보낸 뒤 연기 속으로 후퇴했으나 오랜 요양이 필요했다.",
          wounds: -26,
          stats: { T: 4, WP: 3 },
          align: { humane: 8 }
        }
      },
      {
        label: "[백병 판정] 피난민의 애원은 뒤로한 채, 황제의 대지를 더럽힌 외계 포식자의 시냅스 괴수만을 정조준해 무자비한 참수 돌격을 감행한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "피난 행렬의 혼란을 가르며 곧장 괴수 무리의 중심으로 돌진해 리퍼 체인소드로 시냅스 괴수의 머리를 베어 버렸다! 지휘를 잃은 타이라니드 군집이 서로 뒤엉켜 무너지며 하이브의 함락이 저지되었다.",
          stats: { WS: 8, WP: 6, Inf: 5 },
          faith: 8,
          align: { dogmatic: 12, humane: -4 }
        },
        fail: {
          text: "시냅스 괴수를 쓰러뜨리는 데는 성공했으나 사방에서 덮쳐 온 외계 무리에게 포위되어 심각한 장갑 파손과 내상을 입고 간신히 포위망을 뚫고 나왔다.",
          wounds: -24,
          stats: { WS: 4, T: 2 },
          align: { dogmatic: 8 }
        }
      },
      {
        label: "[지성 판정] 하층 구역을 미끼로 외계 무리를 유인하고, 빈 총독 성채에서 희귀 원자로 부품을 회수한다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "무선 교란 신호로 포식자 무리를 하층 공장 지대로 돌려놓은 뒤, 텅 빈 총독 관저 지하 창고에서 최상급 플라즈마 코어와 성유를 완벽히 확보했다. 냉혹한 계산이 방랑 기사의 다음 백 년을 보장했다.",
          stats: { Int: 7, BS: 5, Inf: 6 },
          align: { ruthless: 12, humane: -6 }
        },
        fail: {
          text: "상층 성채 복도에 매복해 있던 진스틸러 무리의 기습을 받아 기체 관절이 크게 손상되었고, 도망치던 민병대의 저주 속에 부품 일부만 챙겨 탈출했다.",
          wounds: -18,
          stats: { Int: 3, Fel: -4 },
          align: { ruthless: 8 }
        }
      },
      {
        label: "민병대 지휘관에게 잔여 탄약 좌표와 화력 지원만 제공한 뒤, 외곽 방어선을 따라 단계적 지연전을 펼친다",
        effect: {
          text: "감정에 휩쓸리지 않고 지형과 화력을 계산해 야간 지연전을 지휘했다. 수많은 이들이 하이브 심부 방공호로 대피할 귀중한 시간을 벌어 준 뒤 조용히 안개 속으로 사라졌다.",
          stats: { BS: 4, Ag: 4, WP: 3 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Lexicanum: Freeblade / Codex: Imperial Knights"
  },
  {
    id: "ev_s17_kni_freeblade_oath",
    title: "무소속 기사의 대가 — 침묵하는 사크리스탄과 부서진 원자로",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_freeblade"]
    },
    reqLabel: "직군: 프리블레이드 방랑 기사",
    weight: 36,
    text: "끝없는 단독 전투가 이어진 끝에 그대의 퀘스토리스 기체는 한계에 다다랐다. 이온 실드 발생기에 깊은 균열이 갔고, 원자로 냉각 계통에서는 불길한 경고음이 멈추지 않는다. 가까스로 닿은 궤도 기계교 정비 도크에서 철가면을 쓴 사크리스탄 감독관이 차갑게 선언한다. 소속 가문도 보증인도 없는 프리블레이드에게는 단 한 방울의 성유도 줄 수 없으며, 포지 월드에 영구 종속을 맹세하지 않는 한 정비 크레인을 내리지 않겠다는 것이다.",
    choices: [
      {
        label: "[교섭 판정] 사크리스탄 정비 맹약 인장을 내보이며 성소의 서약 기사 자격으로 긴급 정비를 요청한다",
        req: { allTags: ["sacristan_oath"] },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "빛바랜 황동 맹약 인장을 확인한 감독관이 즉시 이진법 경례를 올렸다. 독립 프리블레이드의 자유를 온전히 지킨 채 원자로와 이온 실드 전체를 최상급으로 복원받았다.",
          stats: { Fel: 5, Int: 5, T: 5 },
          wounds: 18,
          align: { humane: 4, dogmatic: 3 }
        },
        fail: {
          text: "까다로운 기계교 감찰관이 맹약의 진위를 의심하며 며칠간 고된 교리 심사를 강요했다. 결국 응급 보수만 겨우 받아 낸 채 깎인 위신과 피로를 안고 출항했다.",
          wounds: -8,
          stats: { Fel: 2, Inf: -4 }
        }
      },
      {
        label: "[권위 판정] 옛 스론 메카니쿰 등록 부호를 공개해 대등한 기사 자격으로 한시적 용병 정비 계약을 맺는다",
        req: { anyPastCareers: ["knight_scion"] },
        check: { stat: "Inf", diff: -8 },
        success: {
          text: "유서 깊은 기사 가문의 정식 계승 부호가 계측기에 떠오르자 도크 책임자의 태도가 단번에 공손해졌다. 영구 종속 대신 합당한 전리품 분배 조건으로 완벽한 수리를 마쳤다.",
          stats: { Inf: 7, WP: 5, BS: 4 },
          wounds: 14,
          align: { dogmatic: 4 }
        },
        fail: {
          text: "기계교 사절은 가문을 떠난 자의 옛 등록 부호 따위는 휴지 조각이라며 냉소했고, 정비 대가로 보조 화기 일부를 압수당한 뒤에야 수리를 마칠 수 있었다.",
          wounds: -10,
          stats: { Inf: -5, WP: 2 }
        }
      },
      {
        label: "[지성 판정] 굴욕적인 종속 요구를 거부하고 궤도 폐선장에서 끌어모은 예비 코일과 도구로 직접 원자로와 실드를 야전 수리한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "기계교의 코웃음 속에서 사흘 밤낮을 매달려 직접 축전기를 갈아 끼우고 원자로 공명을 되살려 냈다! 누구에게도 빚지지 않은 프리블레이드의 긍지가 한층 단단해졌다.",
          stats: { Int: 7, T: 5, WP: 5 },
          wounds: 10,
          align: { ruthless: 4 }
        },
        fail: {
          text: "축성받지 못한 부품이 과부하를 일으키며 원자로 배기관에서 작열하는 증기가 터져 나와 큰 화상을 입었고, 성난 기계령을 진정시키느라 막대한 체력을 소모했다.",
          wounds: -20,
          stats: { Int: 3, Ag: -2 },
          corruption: 2
        }
      },
      {
        label: "영구 종속 대신 다음 세 차례의 기계교 호위 작전에 무보수로 참전하는 제한적 정비 맹약에 서명하고 기체를 복구한다",
        effect: {
          text: "자존심을 잠시 접고 제한적 정비 맹약에 날인하자, 사크리스탄들이 밤새 기체의 균열을 말끔히 봉합해 주었다. 빚은 남았으나 다시 은하의 전장으로 나설 강철의 육신을 되찾았다.",
          stats: { WP: 4, T: 4, Inf: -2 },
          wounds: 12,
          align: { dogmatic: 4 },
          addTags: ["sacristan_oath"]
        }
      }
    ],
    source: "Lexicanum: Freeblade / Sacristan / Codex: Imperial Knights"
  },
  {
    id: "ev_s17_kni_exalted_court",
    title: "고위 대의회의 도전 — 대군주의 성전 출격령",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_high_king"],
      allTags: ["knight_high_king"]
    },
    reqLabel: "직군: 기사 행성 대군주",
    weight: 38,
    text: "거대한 흑요석 기둥이 늘어선 군기의 전당에서 고위 대의회가 소집되었다. 제국 성전 사령부의 긴급 요청에 응해 기사 행성의 주력 랜스를 대규모 원정에 파병하려는 그대의 칙령에, 유력 경쟁 가문 영주들이 노골적인 반기를 들었다. 그들은 대군주가 머나먼 외지 성전을 위해 고향 행성의 방어력을 고갈시키고 있다고 규탄하며, 출격 면제와 십일조 감면을 요구하고 의전 결투권까지 들먹이며 옥좌를 압박한다.",
    choices: [
      {
        label: "[백병 판정] 대군주의 의전 퀘스토리스 기체에 직접 탑승해 반발을 주도한 경쟁 가문 영주의 도전장을 받아들이고 결투장에서 우위를 증명한다",
        check: { stat: "WS", diff: -12 },
        success: {
          text: "결투장의 모래바람 속에서 상대 기체의 무장을 단숨에 쳐내고 목전에 리퍼 체인소드를 멈춰 세웠다. 패배한 영주는 자비를 베푼 기사 군주 앞에 무릎을 꿇고 원정 참전을 맹세했으며, 평생의 호적수로 남았다.",
          stats: { WS: 7, Inf: 8, WP: 5 },
          faith: 4,
          align: { dogmatic: 6 },
          addTags: ["bond_rival"]
        },
        fail: {
          text: "상대의 예기치 못한 돌진에 의전 문장 갑주가 크게 쪼개지며 충격으로 피를 토했다. 무승부로 결투를 마감했으나 옥좌의 위엄에 흠집이 남아 경쟁 가문들의 요구를 일부 수용해야 했다.",
          wounds: -22,
          stats: { WS: 3, Inf: -6 }
        }
      },
      {
        label: "[교섭 판정] 각 가문 원로 기사들과 밤샘 협상을 벌여 본토 방위 예비 랜스를 보장하는 순환 출격안으로 만장일치를 이끌어 낸다",
        check: { stat: "Fel", diff: -12 },
        success: {
          text: "고향 행성의 안전과 제국을 향한 충성을 모두 살린 현명한 순환 출격안이 대의회의 박수를 받았다. 분열 직전이던 기사 대가문들이 다시 대군주의 깃발 아래 굳건히 단결했다.",
          stats: { Fel: 7, Inf: 8, Int: 5 },
          align: { humane: 8, dogmatic: 2 }
        },
        fail: {
          text: "강경파 영주들이 타협안을 유약함의 증거라며 조롱하면서 회의가 파행되었고, 분노한 가신들 사이의 난투를 수습하느라 정치적 입지가 크게 흔들렸다.",
          stats: { Fel: 2, Inf: -6, WP: -2 },
          align: { humane: 3 }
        }
      },
      {
        label: "[권위 판정] 반대파 가문의 밀수·십일조 축소 기록을 폭로하고 이단심문관 통보를 무기로 출격을 강제한다",
        check: { stat: "Inf", diff: -12 },
        success: {
          text: "서늘한 증거 문건이 전당 바닥에 쏟아지자 오만하던 영주들의 얼굴이 잿빛으로 굳었다. 단 한 마디의 이의도 없이 전 가문의 출격 서약서가 날인되었고, 대군주의 절대 권력이 행성을 장악했다.",
          stats: { Inf: 9, Int: 5, WP: 4 },
          align: { ruthless: 9, humane: -4 }
        },
        fail: {
          text: "궁지에 몰린 반대파 가문들이 회랑에서 자객을 보내는 극단적 반발을 일으켰다. 경호대의 분전으로 암살은 막아 냈으나 깊은 상처와 씻기 어려운 궁정 내분이 남았다.",
          wounds: -14,
          stats: { Inf: -7, Fel: -4 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "대군주 직할 랜스만 먼저 성전에 파견하고, 봉신 가문에는 병력 대신 군수 보급과 사크리스탄 인력을 분담하는 절충 칙령을 반포한다",
        effect: {
          text: "솔선수범해 직할 기사단을 먼저 출진시키자 반대파 가문들도 명분을 잃고 막대한 군수 보급을 바쳤다. 대군주의 절제된 통치력이 내분을 잠재웠다.",
          stats: { Inf: 4, WP: 4, Fel: 3 },
          align: { humane: 3 }
        }
      }
    ],
    source: "Lexicanum: High King / Exalted Court / Assassinorum: Kingmaker"
  },
  {
    id: "ev_s17_kni_keep_siege",
    title: "기사 성채의 최후 방어전 — 갈라진 하늘 아래 울리는 전투 나팔",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_high_king"]
    },
    reqLabel: "직군: 기사 행성 대군주",
    weight: 38,
    text: "검붉은 워프 폭풍이 기사 행성의 대기권을 갈라놓으며 카오스 함대와 타락한 반역 기사단이 본성 성채를 에워쌌다. 궤도 포격에 외곽 첨탑이 무너져 내리고, 거대한 악마 공성 병기와 카오스 나이트 종대가 성채 대문을 향해 땅을 울리며 진군해 온다. 고대 사크리스탄 성소와 선조들의 스론 메카니쿰, 그리고 성벽 뒤에 숨은 수백만 영지민의 운명이 이제 기사 군주인 그대의 마지막 전투 나팔 소리에 달려 있다.",
    choices: [
      {
        label: "[백병 판정] 선조들의 깃발을 등 뒤에 세우고 대군주 랜스의 선봉에 서서 카오스 나이트 지휘관과 악마 군단의 심장부로 최후의 돌격을 감행한다",
        check: { stat: "WS", diff: -14 },
        success: {
          text: "수십 기의 임페리얼 나이트가 일제히 전투 나팔을 불며 불바다를 가르자 적의 전열이 산산이 갈라졌다! 대군주의 리퍼 체인소드가 카오스 나이트 군주의 원자로를 꿰뚫는 순간, 악마 군단이 비명을 지르며 무너져 내렸다.",
          stats: { WS: 9, WP: 7, Inf: 8 },
          faith: 10,
          align: { dogmatic: 8 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "악마 군주의 워프 화염이 이온 실드를 붕괴시키며 조종석을 불태웠다. 사경을 헤매는 중상을 입고서야 근위 랜스의 합동 돌격으로 적 지휘관을 쓰러뜨리고 성채를 지켜 냈다.",
          wounds: -30,
          stats: { WS: 4, T: 3 },
          corruption: 5
        }
      },
      {
        label: "[지성 판정] 성채의 고대 방어 이온 실드 돔과 사크리스탄 공성 포탑망을 통합 지휘해 적 기갑 종대를 협곡 살상 지대로 유인 섬멸한다",
        check: { stat: "Int", diff: -12 },
        success: {
          text: "성채의 모든 포탑과 아군 서멀 캐논의 사격 각도를 한 치의 오차도 없이 조율했다. 협곡에 갇힌 반역 기사단이 교차 포화 속에 고철 더미로 변하며 기사 행성의 전설적인 완승이 기록되었다.",
          stats: { Int: 8, BS: 7, Inf: 7 },
          faith: 4,
          align: { humane: 5, dogmatic: 3 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "워프 번개가 성채 지휘 중계탑을 직격하며 방어 포탑망이 마비되었다. 무너진 외곽 성벽의 파편과 혼전 속에서 큰 부상을 입고 가까스로 내성만 사수했다.",
          wounds: -22,
          stats: { Int: 3, Inf: -4 },
          corruption: 3
        }
      },
      {
        label: "[의지 판정] 영지민을 지하 굴로 대피시키고 보조 원자로 과부하로 카오스 선봉대를 묶는다",
        check: { stat: "WP", diff: -12 },
        success: {
          text: "스스로 불타는 성벽을 떠받친 채 최후의 순간 원자로 과부하를 터뜨렸다! 카오스 선봉대가 백열의 폭풍에 통째로 증발하는 사이, 지하 피난 굴의 수많은 영지민과 아이들이 모두 살아남았다.",
          stats: { WP: 8, Fel: 6, T: 5 },
          faith: 8,
          align: { humane: 10 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "예상보다 이른 원자로 폭발 충격파가 철수하던 대군주 기체의 하부를 덮쳐 심각한 화상과 장갑 손상을 입었다. 그래도 지하 피난 굴 입구만은 끝내 지켜 냈다.",
          wounds: -26,
          stats: { WP: 4, Inf: -3 },
          align: { humane: 6 }
        }
      },
      {
        label: "본성 최상층 사크리스탄 성소와 선조 스론 메카니쿰 보관고만을 최후의 보루로 삼아 근위 랜스 전원과 결사 방어 진형을 펼친다",
        effect: {
          text: "외곽은 잿더미가 되었으나 가문의 영혼인 사크리스탄 성소와 선조들의 스론 메카니쿰만큼은 단 한 뼘도 내어 주지 않았다. 날이 밝을 무렵 궤도 구원 함대가 도착해 침공군을 몰아냈다.",
          wounds: -16,
          stats: { WP: 6, T: 5, Inf: 5 },
          faith: 6,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Knight World / Codex: Imperial Knights / Assassinorum: Kingmaker"
  }
);
