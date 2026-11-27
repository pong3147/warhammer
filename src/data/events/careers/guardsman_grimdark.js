// 분기 사건 — 그림다크 난이도 전용: 가드맨 15시간 생존 불운·부조리 팩 (10종)
export default [
  {
    id: "ev_s22_guard_01",
    title: "귀족 대위의 자살 돌격 명령 — 기관총 진지 정면 돌파",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 보병 계열 · 크리그/야만 행성 제외",
    weight: 30,
    text: "전선의 지형도조차 펼쳐 보지 않은 귀족 출신 대위가 붉은 포도주를 비운 뒤 개활지 정면의 적 중화기 벙커를 향해 총검 돌격을 명령했다. 비가 쏟아지는 진흙탕 너머로 4연장 스터버 교차 화망이 번득이고, 후방에서는 헌병대가 물러서는 자를 겨누고 있다.",
    choices: [
      {
        label: "[백병 판정] 포화의 사각지대로 몸을 날려 중화기 벙커 총안에 파편 수류탄을 꽂아 넣는다",
        check: { stat: "WS", diff: -12 },
        critSuccess: {
          text: "탄막의 미세한 틈을 뚫고 벙커 입구까지 단숨에 내달렸다! 터져 나간 총안 사이로 적 사수들을 제압하자, 숱한 사선을 뚫고 살아남은 백전의 생존자라는 평판이 전선에 퍼졌다.",
          stats: { WS: 6, Ag: 4, Inf: 6, WP: 4 },
          addTags: ["battle_hardened"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "어깨를 스치는 탄환을 무시하고 수류탄을 벙커 안으로 밀어 넣었다. 화망이 멎은 틈을 타 후속 소대가 고지를 점령했다.",
          wounds: -6,
          stats: { WS: 4, WP: 3, Inf: 4 },
          align: { dogmatic: 4 }
        },
        fail: {
          text: "벙커 앞 철조망에 발목이 걸리는 순간 다리에 스터버 탄환이 박혔다. 포탄 구덩이로 굴러떨어져 목숨은 건졌으나 다리에 영구적인 장애가 남았다.",
          wounds: -24,
          stats: { Ag: -3, T: 2 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "개활지 한복판에서 교차 사격의 정중앙에 갇혔다. 수십 발의 대구경 탄환이 플래크 갑옷을 찢어 놓으며 15시간 생존 통계의 또 다른 숫자로 남았다.",
          instantDeath: "귀족 장교의 무모한 자살 돌격 명령으로 적 중화기 교차 화망 정면에서 순직"
        }
      },
      {
        label: "돌격 휘슬이 울리자마자 첫 번째 포탄 구덩이에 쓰러져 시체 행세를 하며 포화가 멎기를 기다린다",
        effect: {
          text: "죽은 전우들의 틈에 얼굴을 파묻고 밤이 내릴 때까지 숨을 죽였다. 목숨은 부지했으나 비명과 포성의 공포가 신경에 깊이 새겨졌다.",
          wounds: -10,
          stats: { WP: -2, Inf: -2 },
          addTags: ["shell_shocked"],
          align: { ruthless: 6 }
        }
      },
      {
        label: "[특성 전용 · 전술안/전술 천재] 사격 주기와 지형 사각을 계산해 연막탄 한 발로 분대를 우회시킨다",
        req: { anyTags: ["tactician_eye", "prodigy"] },
        effect: {
          text: "대위의 명령을 묵살하는 대신 포연이 짙은 배수로를 따라 벙커 측면을 기습했다. 최소한의 손실로 진지를 무력화해 지휘부의 눈을 피하면서도 공훈을 챙겼다.",
          wounds: -4,
          stats: { Int: 5, BS: 3, Inf: 5 },
          align: { humane: 4 }
        }
      }
    ],
    source: "Fifteen Hours / Only War Core"
  },
  {
    id: "ev_s22_guard_02",
    title: "아드미니스트라툼 병참 오배송 — 화살촉과 불량 전지팩",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 보병 계열 · 크리그/야만 행성 제외",
    weight: 30,
    text: "적의 야간 기습이 임박해 탄약 상자를 뜯었더니, 안에 든 것은 300년 전 봉건 행성용 철제 화살촉과 누전으로 부풀어 오른 불량 라스건 전지팩뿐이었다. 병참 서류상으로는 이미 최상급 보급이 완료된 것으로 처리되어 있다.",
    choices: [
      {
        label: "[지성 판정] 불량 전지팩의 축전 코어를 해체해 임시 직렬 연결로 정상 출력을 끌어낸다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "위험천만한 야전 개조가 완벽히 먹혀들었다! 안정된 과출력 라스탄으로 선봉 적병들을 쓰러뜨리며 전장의 변수를 꿰뚫는 전술안이 한층 날카로워졌다.",
          stats: { Int: 6, BS: 4, Inf: 4 },
          addTags: ["tactician_eye"]
        },
        success: {
          text: "불꽃이 튀는 전지팩을 붕대로 감아 고정한 끝에 분대 라스건 절반을 되살려 야습을 막아 냈다.",
          stats: { Int: 4, BS: 3, WP: 2 }
        },
        fail: {
          text: "접합부 과열로 전지팩이 손 안에서 터져 나갔다. 손목 힘줄이 찢어지며 총기를 제대로 쥐기 어렵게 되었다.",
          wounds: -22,
          stats: { BS: -3, WS: -2 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "연쇄 과부하를 일으킨 불량 전지팩 상자가 통째로 폭발해 화염과 파편이 흉부를 관통했다.",
          instantDeath: "오배송된 불량 라스건 전지팩 폭발 사고로 참호 내에서 순직"
        }
      },
      {
        label: "병참 하사관의 암거래 장부에 막대한 외상을 달아 정상 전지팩 두 상자를 빌려 온다",
        effect: {
          text: "당장 싸울 탄약은 손에 넣었으나 전역 후에도 갚기 힘든 거액의 군납 채무가 목을 죄어 오기 시작했다.",
          wounds: -8,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "[모성 전용 · 카디아/카타찬] 실전 야전 수리와 화살촉 함정 개조로 적 야습을 역이용한다",
        req: { anyHomeWorlds: ["cadia", "catachan"] },
        effect: {
          text: "모성에서 뼈에 새긴 야전 생존술로 불량 코어만 골라내고, 오배송된 화살촉을 쇠뇌 부비트랩에 묶어 적 정찰대를 전멸시켰다.",
          wounds: -3,
          stats: { Int: 4, BS: 4, T: 3 }
        }
      }
    ],
    source: "The Imperial Infantryman's Uplifting Primer / Fifteen Hours"
  },
  {
    id: "ev_s22_guard_03",
    title: "아군 바실리스크 포병대의 오인 포격",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "tempestus_scion"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 전선 직군 · 크리그/야만 행성 제외",
    weight: 30,
    text: "복스 통신망의 좌표 오기입으로 아군 후방 바실리스크 포병대가 그대의 소대가 지키는 참호 구역에 어스셰이커 포탄을 쏟아붓기 시작했다! 대지가 뒤집히고 흙벽이 무너지는 가운데 2차 일제 사격 카운트다운이 시작되었다.",
    choices: [
      {
        label: "[의지 판정] 포성이 찢는 고지대로 기어올라 신호탄을 쏘아 올려 포병 관측선에 사격 중지를 알린다",
        check: { stat: "WP", diff: -12 },
        critSuccess: {
          text: "지근거리에 포탄이 꽂히는 지옥 속에서도 손끝 하나 떨지 않고 신호탄을 발사했다! 포격이 극적으로 멎었고, 어떤 폭압에도 굴하지 않는 강철의 신경이 각인되었다.",
          stats: { WP: 7, Inf: 5, T: 3 },
          addTags: ["iron_nerves"],
          align: { humane: 6 }
        },
        success: {
          text: "고막이 터질 듯한 진동을 견디며 붉은 신호탄을 띄워 올려 아군 포병대의 오인 사격을 막아 냈다.",
          wounds: -10,
          stats: { WP: 4, Inf: 4 },
          align: { humane: 4 }
        },
        fail: {
          text: "고지대 능선에서 폭압에 휩쓸려 굴러떨어졌다. 포격은 겨우 멎었으나 귓가를 맴도는 이명과 발작적인 경련이 남았다.",
          wounds: -25,
          stats: { WP: -3 },
          addTags: ["shell_shocked"]
        },
        critFail: {
          text: "고지대로 기어오르던 찰나 아군 어스셰이커 직격탄이 정면에서 작렬하며 흔적도 없이 휩쓸려 나갔다.",
          instantDeath: "아군 바실리스크 포병대의 좌표 오인 포격 직격으로 순직"
        }
      },
      {
        label: "신호탄을 포기하고 쓰러진 신병의 몸 아래 배수로 틈으로 기어들어 가 파편을 피한다",
        effect: {
          text: "포격이 멎을 때까지 차가운 시신 아래 웅크려 살아남았다. 살아남은 대가로 전선 내에서 냉혈한이라는 수군거림이 따라다닌다.",
          wounds: -12,
          stats: { Inf: -3 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 8 }
        }
      },
      {
        label: "[특성 전용 · 강철의 신경/백전의 생존자] 탄착 간격의 리듬을 읽어 사각지대 지하 방공호로 대피한다",
        req: { anyTags: ["iron_nerves", "battle_hardened"] },
        effect: {
          text: "수많은 포격을 겪으며 몸에 밴 감각으로 포탄이 비껴가는 옛 지하 배수관을 찾아내어 분대원들을 냉정히 대피시켰다.",
          wounds: -5,
          stats: { WP: 4, Int: 3, Inf: 3 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War"
  },
  {
    id: "ev_s22_guard_04",
    title: "커미사르의 즉결 처형 위기 — 패잔병 색출",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 보병 계열 · 크리그/야만 행성 제외",
    weight: 30,
    text: "인접 징집병 소대가 적의 기갑 공세에 무너져 도주하자, 검은 코트를 휘날리며 나타난 커미사르가 진흙탕 속에서 살아남은 그대의 분대까지 비겁한 도주병으로 몰아세웠다. 볼트 피스톨의 해머가 당겨지는 소리가 귓전을 때린다.",
    choices: [
      {
        label: "[교섭 판정] 총구 앞에서 눈 하나 깜짝하지 않고 탄약이 바닥난 라스건과 전우의 인식표를 내밀며 항변한다",
        check: { stat: "Fel", diff: -13 },
        critSuccess: {
          text: "조리 있고 비장한 보고에 커미사르가 볼트 피스톨을 거두었다. 죽음의 문턱에서 위기를 말로 돌파한 경험이 날카로운 은빛 혀로 굳어졌다.",
          stats: { Fel: 7, WP: 4, Inf: 5 },
          addTags: ["silver_tongue"],
          align: { dogmatic: 5 }
        },
        success: {
          text: "탄피가 수북한 참호 흔적을 확인한 커미사르가 즉결 처형을 멈추고 전열 복귀를 명했다.",
          stats: { Fel: 4, WP: 3 }
        },
        fail: {
          text: "변명은 불충으로 간주되었다. 총살은 면했으나 징계 채찍질과 최전방 지뢰 제거 노역에 처해졌다.",
          wounds: -20,
          stats: { Inf: -4, WP: -2 },
          addTags: ["shell_shocked"]
        },
        critFail: {
          text: "커미사르의 눈에는 어떠한 변명도 비겁으로만 비쳤다. 뇌관을 울린 볼트탄 한 발이 전선의 사기를 다잡는 본보기가 되었다.",
          instantDeath: "전선 붕괴 와중에 커미사르의 즉결 처형으로 순직"
        }
      },
      {
        label: "살아남기 위해 먼저 참호를 버린 옆 분대 생존자의 이름을 거짓으로 밀고해 시선을 돌린다",
        effect: {
          text: "커미사르의 총구가 다른 병사에게 돌아가는 동안 목숨을 건졌다. 살아남은 소대원들 사이에 그대의 비정함이 소문으로 퍼졌다.",
          wounds: -9,
          stats: { Fel: -2, Inf: -3 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 8 }
        }
      },
      {
        label: "[특성 전용 · 강철의 신경/백전의 생존자] 부동자세를 유지한 채 적 전차의 우회 좌표를 보고해 반격을 이끈다",
        req: { anyTags: ["iron_nerves", "battle_hardened"] },
        effect: {
          text: "죽음 앞에서도 흔들리지 않는 눈빛과 정확한 정찰 보고를 본 커미사르는 즉결 처형을 거두고 그대에게 반격 선봉을 맡겼다.",
          stats: { WP: 5, Inf: 5 },
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Gaunt's Ghosts"
  },
  {
    id: "ev_s22_guard_05",
    title: "궤도 강하 및 수송선 대공 포화 — 불타는 하늘",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["astra_militarum", "militarum_sergeant", "tempestus_scion"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 강하·보병 직군 · 크리그/야만 행성 제외",
    weight: 30,
    text: "고공 강하를 위해 발키리 수송선의 해치가 열리자마자 반역군의 히드라 대공포 화망이 편대를 찢어 놓았다! 옆 좌석의 병사들이 파편에 휩쓸려 떨어져 나가고 수송선 우측 엔진이 폭발하며 기체가 나선형으로 추락하기 시작한다.",
    choices: [
      {
        label: "[민첩 판정] 불타는 동체에서 비상 강하 와이어를 걷어차고 포화 한복판으로 뛰어내린다",
        check: { stat: "Ag", diff: -14 },
        critSuccess: {
          text: "기적적인 공중 자세 제어로 대공 파편을 피하며 적 대공 진지 바로 뒤에 착지했다! 추락의 공포를 이겨 낸 백전의 생존자로 거듭났다.",
          stats: { Ag: 6, WP: 4, Inf: 5 },
          addTags: ["battle_hardened"]
        },
        success: {
          text: "거친 착지로 무릎이 꺾였으나 갯벌 진흙이 충격을 흡수해 교두보 집결지에 무사히 합류했다.",
          wounds: -10,
          stats: { Ag: 4, T: 2 }
        },
        fail: {
          text: "그라브 슈트가 불량 작동하며 건물 잔해 위로 추락했다. 목숨은 붙었으나 다리뼈가 산산조각 나 절뚝거리게 되었다.",
          wounds: -24,
          stats: { Ag: -3 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "강하 도중 피어오른 대공포 파편 구름에 낙하산 줄이 모조리 끊어지며 불타는 폐허 위로 추락했다.",
          instantDeath: "궤도 강하 중 적 대공 포화 직격으로 추락사"
        }
      },
      {
        label: "강하 순서를 미루고 부상당한 병사의 예비 낙하 팩을 뜯어내어 내 몸에 이중으로 묶고 뛰어내린다",
        effect: {
          text: "이중 감속 덕분에 찰과상만 입고 살아남았으나, 파손된 군용 강하 장비 변상금과 군법 징계 벌금이 빚으로 남았다.",
          wounds: -12,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"],
          align: { ruthless: 7 }
        }
      },
      {
        label: "[특성 전용 · 전술 천재/전술안] 대공 화망의 사각을 계산해 조종사에게 회피 기동을 지시하고 안전히 강하한다",
        req: { anyTags: ["prodigy", "tactician_eye"] },
        effect: {
          text: "포탑 회전 속도의 빈틈을 짚어 조종간을 꺾게 한 뒤 폐허 공장 지붕 위로 깔끔하게 강하해 분대를 보존했다.",
          wounds: -4,
          stats: { Int: 5, Ag: 3, Inf: 4 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Imperial Armour"
  },
  {
    id: "ev_s22_guard_06",
    title: "독가스 참호 붕괴 — 찢어진 방독면 필터",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "tempestus_scion"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 전선 직군 · 야만 행성 제외",
    weight: 30,
    text: "적이 살포한 황록색 부식성 독가스 구름이 참호 바닥을 타고 밀려들어 왔다. 설상가상으로 흙벽이 무너지며 날아든 목재 파편에 방독면 정화 필터가 깨져 매캐한 독기가 목구멍을 태우기 시작한다.",
    choices: [
      {
        label: "[강인 판정] 숨을 멈춘 채 붕괴된 흙더미를 맨손으로 파헤쳐 바람이 부는 고지대 환기구로 기어오른다",
        check: { stat: "T", diff: -11 },
        critSuccess: {
          text: "폐가 터질 듯한 고통을 이겨 내고 맑은 공기가 흐르는 참호 상단으로 솟구쳤다! 생사의 경계를 견뎌 낸 강철의 신경이 몸에 자리 잡았다.",
          stats: { T: 6, WP: 5 },
          addTags: ["iron_nerves"]
        },
        success: {
          text: "피를 토하면서도 끝내 흙더미를 뚫고 고지대 엄폐물에 도달해 야전 메디카에의 응급 처치를 받았다.",
          wounds: -12,
          stats: { T: 4, WP: 2 }
        },
        fail: {
          text: "탈출에는 성공했으나 짙은 독가스를 깊이 들이마신 탓에 폐 조직이 손상되어 만성 독소에 시달리게 되었다.",
          wounds: -22,
          stats: { T: -3 },
          addTags: ["chronic_toxins"]
        },
        critFail: {
          text: "무너진 참호 틈에 다리가 낀 채 농축된 부식성 가스 웅덩이에 갇혀 호흡기가 녹아내렸다.",
          instantDeath: "독가스 참호 붕괴 및 방독면 파손으로 질식 순직"
        }
      },
      {
        label: "잔해 아래 깔려 기동이 불가능한 전우의 온전한 방독면 필터를 떼어 내어 내 면갑에 끼우고 빠져나온다",
        effect: {
          text: "덕분에 독가스는 피했으나, 아직 숨이 붙어 있던 전우를 외면한 냉혹한 처사가 전선에 알려져 악명 높은 냉혈한이라는 평판이 따라붙는다.",
          wounds: -10,
          stats: { Fel: -3, Inf: -2 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 9 }
        }
      },
      {
        label: "[모성 전용 · 크리그/카디아/카타찬] 젖은 외투 천과 밀봉 테이프로 즉시 간이 정화 호흡기를 제작한다",
        req: { anyHomeWorlds: ["krieg", "cadia", "catachan"] },
        effect: {
          text: "데스 월드와 요새 행성의 혹독한 환경 훈련이 빛을 발했다. 깨진 필터를 응급 밀봉하고 독가스 지대를 유유히 걸어 나왔다.",
          wounds: -4,
          stats: { T: 4, Int: 3 }
        }
      }
    ],
    source: "Imperial Armour: Siege of Vraks"
  },
  {
    id: "ev_s22_guard_07",
    title: "전선 철수 명령 번복 — 15시간의 덫",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 보병 계열 · 크리그/야만 행성 제외",
    weight: 30,
    text: "사령부의 철수 명령을 받고 짐을 싸던 찰나, 궤도 상공의 연대 지휘부가 작전 계획을 번복하며 '증원군이 도착할 때까지 현 진지를 사수하라'는 명령을 내렸다. 그러나 지평선 너머로 보이는 것은 아군 증원이 아니라 포위망을 좁히는 적 기갑대다.",
    choices: [
      {
        label: "[사격 판정] 탄약 상자를 끌어모아 과충전 일제 사격으로 적 선봉 장갑차의 관측창을 꿰뚫고 시간을 번다",
        check: { stat: "BS", diff: -12 },
        critSuccess: {
          text: "불꽃을 뿜는 라스건 연사로 적 선봉 차량의 기동력을 끊어 놓았다! 기적적으로 도착한 아군 기갑대 앞에 백전의 생존자로 서게 되었다.",
          stats: { BS: 7, WP: 4, Inf: 5 },
          addTags: ["battle_hardened"]
        },
        success: {
          text: "정확한 약점 사격으로 적 보병의 접근을 저지하며 구원 부대가 도착할 때까지 반파된 참호를 지켜 냈다.",
          wounds: -10,
          stats: { BS: 4, WP: 3 }
        },
        fail: {
          text: "적의 집중 포화에 참호 절반이 날아가며 파편에 휩쓸렸다. 목숨은 건졌으나 밤마다 포성이 들리는 환청에 시달리게 되었다.",
          wounds: -24,
          stats: { WP: -3 },
          addTags: ["shell_shocked"]
        },
        critFail: {
          text: "포위망이 완전히 닫힌 붕괴 참호 위로 적 전차의 주포탄이 직격하며 누구의 기억에도 남지 못한 채 산화했다.",
          instantDeath: "철수 명령 번복으로 고립된 전선에서 적 기갑대의 집중 포화에 순직"
        }
      },
      {
        label: "복스 수신기 고장으로 위장해 명령을 무시하고, 후방으로 빠지는 보급 트럭 난간에 매달려 이탈한다",
        effect: {
          text: "도주 처형은 면했으나 군무 이탈 의심과 파손된 보급 장비 변상 명령이 내려져 막대한 빚을 떠안았다.",
          wounds: -11,
          stats: { Inf: -3 },
          addTags: ["imperial_debt"],
          align: { ruthless: 6 }
        }
      },
      {
        label: "[특성 전용 · 백전의 생존자/전술안] 적 포위망이 닫히기 전 우회 배수로를 짚어 내어 안전히 후방으로 복귀한다",
        req: { anyTags: ["battle_hardened", "tactician_eye"] },
        effect: {
          text: "무의미한 전멸을 직감하고 지도에도 없는 구 배수관을 따라 잔여 병력을 이끌고 아군 2선 방어선으로 합류했다.",
          wounds: -4,
          stats: { Int: 4, Ag: 3, Inf: 4 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Fifteen Hours / Only War Core"
  },
  {
    id: "ev_s22_guard_08",
    title: "과열된 플라즈마 건 — 역류의 공포",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["astra_militarum", "militarum_sergeant", "tempestus_scion"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 중화기·정예 직군 · 크리그/야만 행성 제외",
    weight: 30,
    text: "적의 중장갑 수송차가 참호 흉벽을 들이받기 직전, 분대에서 유일한 대전차 화기인 플라즈마 건의 냉각 코일이 붉게 달아오르며 경고음을 뿜고 있다. 한 발만 잘못 당기면 사수부터 푸른 태양의 불길에 증발할 판이다.",
    choices: [
      {
        label: "[사격 판정] 이글거리는 과열 경고를 무시하고 최대 출력으로 방아쇠를 당겨 적 전차 장갑을 꿰뚫는다",
        check: { stat: "BS", diff: -15 },
        critSuccess: {
          text: "푸른 플라즈마 광구가 적 전차의 탄약고를 정확히 관통해 거대한 불기둥을 쏘아 올렸다! 죽음의 기계를 다스린 강철의 신경이 각인되었다.",
          stats: { BS: 7, WP: 5, Inf: 6 },
          addTags: ["iron_nerves"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "손등이 데일 듯한 열기를 참아 내며 조준 사격을 성공시켜 적 수송차의 궤도를 녹여 버렸다.",
          wounds: -10,
          stats: { BS: 4, Inf: 4 }
        },
        fail: {
          text: "전차는 막아 냈으나 배기구에서 역류한 플라즈마 열기에 왼팔 신경이 타들어 가 영구적인 장애가 남았다.",
          wounds: -26,
          stats: { WS: -2, Ag: -2 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "격발과 동시에 격납 코일이 임계점을 돌파해 폭발했다. 푸른 섬광 한 줄기만 남기고 상반신이 증발했다.",
          instantDeath: "과열된 플라즈마 건 폭발 역류로 전선에서 순직"
        }
      },
      {
        label: "과열된 플라즈마 건을 진흙 구덩이에 내던지고 파편 수류탄만 챙겨 후방 탄약고 쪽으로 슬그머니 물러난다",
        effect: {
          text: "치명적인 폭발은 피했으나 전차의 굉음과 함께 무너진 참호의 악몽이 남아 작은 섬광에도 움츠러들게 되었다.",
          wounds: -9,
          stats: { WP: -2, Inf: -2 },
          addTags: ["shell_shocked"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "[특성 전용 · 강철의 신경/전술 천재] 배기 밸브를 수동으로 꺾어 열기를 뺀 뒤 안전 사격으로 전차를 격파한다",
        req: { anyTags: ["iron_nerves", "prodigy"] },
        effect: {
          text: "폭발 직전의 압력 밸브를 침착하게 개방해 코일을 식힌 뒤 적 전차의 연료통을 정확히 꿰뚫었다.",
          wounds: -4,
          stats: { BS: 4, Int: 4, Inf: 5 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War"
  },
  {
    id: "ev_s22_guard_09",
    title: "지도에서 누락된 아군 지뢰밭",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "tempestus_scion"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 전선 직군 · 야만 행성 제외",
    weight: 30,
    text: "야간 정찰 임무 중 사령부가 지급한 구식 지도에 따라 수풀을 건너던 찰나, 발밑에서 철제 신관이 눌리는 '찰칵' 소리가 울렸다. 10년 전 다른 연대가 매설하고 기록을 잃어버린 아군 대인 지뢰밭 한복판에 들어선 것이다.",
    choices: [
      {
        label: "[민첩 판정] 신관 압력이 풀리는 찰나 몸을 날려 연쇄 파편 구역 밖으로 구른다",
        check: { stat: "Ag", diff: -10 },
        critSuccess: {
          text: "신관이 튀어 오르는 순간 폭발 파편의 궤적 아래로 완벽히 몸을 눕혔다! 지옥 문턱을 넘나든 백전의 생존자로 거듭났다.",
          stats: { Ag: 6, WP: 4 },
          addTags: ["battle_hardened"]
        },
        success: {
          text: "찰나의 반사 신경으로 도약해 흙먼지만 뒤집어쓴 채 지뢰밭을 빠져나왔다.",
          wounds: -8,
          stats: { Ag: 4, T: 2 }
        },
        fail: {
          text: "도약이 반 박자 늦어 솟구친 도약 지뢰의 강철 구슬 파편에 다리를 관통당하고 말았다.",
          wounds: -24,
          stats: { Ag: -3 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "도약하며 착지한 지점에 매설된 2차 대전차 지뢰까지 연쇄 기폭하며 어둠 속으로 흩어졌다.",
          instantDeath: "기록 누락된 아군 지뢰밭 연쇄 기폭으로 순직"
        }
      },
      {
        label: "지뢰 신관의 무게를 지탱하기 위해 끌고 오던 보급 짐승과 탄약 상자를 발판 삼아 밀어 넣고 기어 나온다",
        effect: {
          text: "귀중한 탄약과 보급 짐승을 지뢰 기폭 미끼로 희생시켜 간신히 지뢰밭을 빠져나왔다. 목숨은 부지했으나 보급품 무단 폐기에 대한 군율 문책과 냉혹한 평판이 남았다.",
          wounds: -12,
          stats: { Inf: -3 },
          addTags: ["notorious_ruthless"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "[모성 전용 · 카타찬/크리그/카디아] 총검으로 신관 핀을 찔러 무력화하고 안전 통로를 표시한다",
        req: { anyHomeWorlds: ["catachan", "krieg", "cadia"] },
        effect: {
          text: "발끝의 감각만으로 주변 매설 패턴을 읽어 내어 지뢰 3기의 신관을 연달아 고정하고 소대의 진격로를 확보했다.",
          stats: { Int: 4, Ag: 4, Inf: 3 }
        }
      }
    ],
    source: "Only War: Hammer of the Emperor"
  },
  {
    id: "ev_s22_guard_10",
    title: "오크 기습과 15시간의 고립 — 궤도 지원 없는 새벽",
    category: "그림다크 전선",
    grimdarkMisfortune: true,
    once: true,
    req: {
      difficulty: "grimdark",
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "그림다크 모드 · 16세 이상 · 제국군 보병 계열 · 크리그/야만 행성 제외",
    weight: 30,
    text: "첫 투입 후 정확히 15시간이 지나는 새벽 안개 속에서 궤도 지원도 끊긴 반파 참호를 향해 수백 명의 오크 보이즈가 함성을 지르며 밀려들었다. 탄약은 10발 남짓, 사방에서 도끼와 초파가 흉벽을 찍어 내린다.",
    choices: [
      {
        label: "[백병 판정] 라스건에 총검을 단단히 꽂고 흉벽을 넘어오는 오크의 목을 향해 최후의 백병전을 건다",
        check: { stat: "WS", diff: -13 },
        critSuccess: {
          text: "짐승 같은 괴력의 공세를 총검술로 흘려보내며 오크 선두를 찔러 눕혔다! 15시간의 마의 벽을 뚫고 살아남은 진정한 백전의 생존자가 되었다.",
          stats: { WS: 7, T: 4, Inf: 6 },
          addTags: ["battle_hardened"],
          align: { dogmatic: 6 }
        },
        success: {
          text: "피투성이 백병전 끝에 지원군이 도착할 때까지 흉벽의 빈틈을 끝내 지켜 냈다.",
          wounds: -12,
          stats: { WS: 4, T: 3, WP: 3 }
        },
        fail: {
          text: "오크의 거친 도끼 날이 어깨와 쇄골을 내려찍었다. 쓰러진 채 구원군에 실려 나갔으나 팔에 깊은 불구가 남았다.",
          wounds: -25,
          stats: { WS: -3 },
          addTags: ["crippled_limb"]
        },
        critFail: {
          text: "초파를 휘두르며 들이닥친 오크 놉의 일격에 플래크 흉갑째 두 동강 나며 15시간의 문턱을 넘지 못했다.",
          instantDeath: "고립된 참호에서 오크 기습 백병전 도중 전사"
        }
      },
      {
        label: "방어선이 뚫리자 죽은 전우들의 시신 더미 아래로 파고들어 약탈대가 물러갈 때까지 숨을 죽인다",
        effect: {
          text: "짐승들의 발굽 아래서 숨을 참으며 간신히 살아남았으나, 15시간의 공포가 영혼에 씻을 수 없는 포탄 충격을 남겼다.",
          wounds: -13,
          stats: { WP: -3, Inf: -2 },
          addTags: ["shell_shocked"],
          align: { ruthless: 7 }
        }
      },
      {
        label: "[특성 전용 · 백전의 생존자/강철의 신경] 공황에 빠진 신병들을 다잡아 교차 총검 진형과 수류탄 함정으로 선봉을 궤멸시킨다",
        req: { anyTags: ["battle_hardened", "iron_nerves"] },
        effect: {
          text: "단호한 구령으로 병사들을 일렬로 세우고 발밑의 탄약 상자 유폭 함정을 터뜨려 오크 돌격을 단숨에 꺾어 버렸다.",
          wounds: -5,
          stats: { WS: 4, WP: 4, Inf: 5 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Fifteen Hours / Codex: Astra Militarum"
  }
];
