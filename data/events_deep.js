window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || [];

window.IMPERIUM_DATA.EVENTS.push(
  // =========================================================================
  // 1. 스페이스 마린 유명 챕터 고유 이벤트 9종 (anyChapters)
  // =========================================================================
  {
    id: "ev_chap_ultramarines",
    title: "울트라마린 — 《코덱스 아스타르테스》 교리 이탈 논쟁",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["ultramarines"] },
    reqLabel: "챕터: 울트라마린",
    weight: 34,
    text: "타이라니드 돌연변이 무리가 아군 방어선의 측면을 파고들었다. 1중대 선배는 《코덱스 아스타르테스》 정석대로 사각 방진을 유지하라 명하지만, 그대의 전술안은 교리에 없는 우회 역포위가 훨씬 적은 피해를 낳는다고 가리킨다.",
    choices: [
      {
        label: "[지성 판정] 코덱스의 정신을 유연하게 재해석해 변칙 역포위 기동을 감행한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "'용기와 명예로!' 기습 우회가 적 시냅스 괴수를 단칼에 절단했다! 챕터 지휘부도 로부테 길리먼이 원한 진정한 실용주의라며 그대의 전술안을 공식 주석에 등재했다.",
          stats: { Int: 6, Inf: 6, BS: 3 },
          addTags: ["tyrannic_veteran"]
        },
        fail: {
          text: "변칙 기동이 엇갈려 아군 측면이 뚫렸다. 전투는 승리했으나 코덱스 위반 심문회에서 엄중한 견책을 받았다.",
          wounds: -18,
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "[사격 판정] 《코덱스 아스타르테스》 정석 방진으로 교본 같은 화력 집중을 지휘한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "단 한 치의 흔들림도 없는 3열 교대 볼터 사격이 외계인 무리를 갈아 버렸다. 전형적인 울트라마린의 완벽한 승전보였다.",
          stats: { BS: 5, WP: 4, Inf: 4 }
        },
        fail: {
          text: "교리대로 버티다 측면이 눌려 상당한 피해를 입은 뒤에야 증원군과 합류했다.",
          wounds: -16,
          stats: { T: 3 }
        }
      }
    ],
    source: "Lexicanum: Ultramarines / Codex: Space Marines"
  },
  {
    id: "ev_chap_blood_angels",
    title: "블러드 엔젤 — '붉은 갈증'과 '검은 분노'의 속삭임",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["blood_angels"] },
    reqLabel: "챕터: 블러드 엔젤",
    weight: 34,
    text: "치열한 근접전 한복판, 시야가 온통 선홍빛으로 물들며 1만 년 전 프라이마크 생귀니우스가 호루스에게 쓰러지던 최후의 기억이 뇌리를 찢고 밀려든다. 적 병사들이 모두 반역자 호루스로 보이기 시작했다!",
    choices: [
      {
        label: "[의지 판정] 생귀니우스의 고귀한 예술과 기도를 떠올리며 검은 분노를 스스로 억누른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "격렬한 피의 갈증을 철의 의지로 잠재우고 냉철한 전사의 품격을 되찾았다. 채플린이 그대의 영혼에 깊은 경의를 표했다.",
          stats: { WP: 7, Fel: 4, WS: 3 },
          faith: 10
        },
        fail: {
          text: "잠시 이성을 잃고 적진을 도륙했다. 전투 후 며칠간 고독의 탑에 갇혀 피의 갈증을 진정시켜야 했다.",
          wounds: -15,
          stats: { WS: 6, Fel: -4 }
        }
      },
      {
        label: "[백병 판정] 붉은 갈증을 해방해 적 지휘부를 일격에 분쇄하고 채플린의 인도를 받는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "황제와 생귀니우스를 위하여! 검은 분노의 문턱에서 폭발한 초인적 맹공이 적군을 전멸시켰다. 전투 후 채플린의 축성 아래 데스 컴퍼니의 위험한 영광을 가슴에 새겼다.",
          stats: { WS: 8, Ag: 4, T: 3 },
          wounds: -10,
          addTags: ["death_company"]
        },
        fail: {
          text: "분노에 눈이 멀어 적의 집중 포화에 정면으로 뛰어들었다가 간신히 아포세카리에게 회수되었다.",
          wounds: -28,
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: Black Rage / Codex: Blood Angels"
  },
  {
    id: "ev_chap_space_wolves",
    title: "스페이스 울프 — 카니스 헬릭스와 심문소의 시민 숙청령",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["space_wolves"] },
    reqLabel: "챕터: 스페이스 울프",
    weight: 34,
    text: "악마 침공을 막아 낸 직후, 오르도 말레우스 심문관이 '카오스를 목격한 행성 방위군과 민간인 전원을 처형하라'는 냉혹한 명령을 내렸다. 늑대의 피가 끓어오른다. 펜리스의 전사들은 용감히 싸운 필멸자를 배신하지 않는다!",
    choices: [
      {
        label: "[백병/위압 판정] 프로스트 액스를 뽑아 민간인 피난선을 몸으로 막아선다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'펜리스 효르다!' 압도적인 기세 앞에 심문관의 수행원들이 뒷걸음질쳤다. 민간인 수송선은 무사히 성계를 이탈했고, 그대의 이름은 펜리스의 사가에 새겨졌다!",
          stats: { WS: 5, Fel: 6, WP: 5 },
          addTags: ["wolf_guard"]
        },
        fail: {
          text: "심문소 폭풍병들과의 충돌 끝에 부상을 입었으나, 그 틈에 민간인 절반은 목숨을 건졌다.",
          wounds: -20,
          stats: { Inf: -4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 룬 프리스트와 함께 워프의 흔적을 정화해 숙청의 명분을 없앤다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "펜리스 룬의 바람이 잔여 오염을 깨끗이 씻어 내자 심문관도 어쩔 수 없이 처형 명령을 철회했다.",
          stats: { WP: 6, Int: 4, Inf: 4 }
        },
        fail: {
          text: "정화가 불완전해 일부 격리 수용을 막지 못했다. 차가운 분노를 가슴에 묻었다.",
          stats: { WP: 3, Fel: -2 }
        }
      }
    ],
    source: "Lexicanum: Months of Shame / Codex: Space Wolves"
  },
  {
    id: "ev_chap_dark_angels",
    title: "다크 엔젤 — '폴른(The Fallen)'의 그림자와 이너 서클",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["dark_angels"] },
    reqLabel: "챕터: 다크 엔젤",
    weight: 34,
    text: "제국군 연합 작전 도중, 무너진 성당 폐허에서 1만 년 전 대성전 시절의 검은 파워 아머를 입은 정체불명의 아스타르테스가 포착되었다. 채플린-인터로게이터가 암호 채널로 속삭인다. '우군에게 알리지 마라. 지금 당장 그 자를 생포하라.'",
    choices: [
      {
        label: "[지성/의지 판정] 제국 동맹군을 속여 현장을 봉쇄하고 검은 갑주의 배반자를 생포한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "'회개하라! 내일이면 그대는 죽으리니!' 극비리에 목표를 생포해 '더 락' 지하 감방으로 이송했다. 챕터 고위층이 그대의 침묵을 인정해 비밀 결사 '이너 서클'의 문턱을 열어 주었다!",
          stats: { WP: 6, Int: 6, Inf: 6 },
          addTags: ["inner_circle"]
        },
        fail: {
          text: "치열한 플라즈마 교전 끝에 목표를 놓쳤고, 잿더미만 남은 현장에 의구심 어린 동맹군 장교들의 시선이 쏟아졌다.",
          wounds: -20,
          stats: { Inf: -4, BS: 3 }
        }
      },
      {
        label: "비밀 사냥보다 현재 아군 전선의 사수를 우선해 정면 돌파를 지휘한다",
        effect: {
          text: "제국군 수만 명을 구해 냈으나, 채플린-인터로게이터의 싸늘한 눈초리가 오랫동안 등 뒤에 머물렀다.",
          stats: { BS: 4, Fel: 4, Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: The Fallen / Codex: Dark Angels"
  },
  {
    id: "ev_chap_imperial_fists",
    title: "임페리얼 피스트 — 고통의 장갑(Pain Glove)과 무너지지 않는 성벽",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["imperial_fists"] },
    reqLabel: "챕터: 임페리얼 피스트",
    weight: 34,
    text: "아이언 워리어 공성군의 맹포격 속에 외곽 요새 성벽 하나가 붕괴해 아군 포대가 후퇴했다. 임페리얼 피스트에게 후퇴는 수치다. 채플린이 신경기계 고문 장치 '고통의 장갑'을 가리키며 묻는다. '네 결함을 고통으로 태울 것인가, 성벽의 설계로 갚을 것인가?'",
    choices: [
      {
        label: "[강인 판정] 고통의 장갑에 몸을 맡겨 순수한 신경 고통 속에서 영혼을 단련한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "'테라와 돈을 위하여!' 뼈를 깎는 전류 속에서 단 한 번의 비명도 내지 않고 깨달음을 얻었다. 육신과 의지가 강철 요새처럼 단단해졌다!",
          stats: { T: 7, WP: 7, Inf: 4 },
          wounds: -12,
          addTags: ["huscarl_oath"]
        },
        fail: {
          text: "신경계 과부하로 기절해 아포세카리움으로 실려 갔다. 부끄러움 속에 재기를 다짐했다.",
          wounds: -24,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격/지성 판정] 붕괴된 요새의 화망을 재설계하고 최선두 참호에서 직접 역포격을 지휘한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "완벽한 교차 사격망이 반역 공성 전차대를 고철로 만들었다! 챕터 지휘부가 그대의 공성학 식견을 높이 평가했다.",
          stats: { BS: 6, Int: 5, Inf: 4 }
        },
        fail: {
          text: "적 박격포의 집중 사격을 받아 방패가 부서졌으나 끝내 성벽을 사수했다.",
          wounds: -18,
          stats: { T: 4 }
        }
      }
    ],
    source: "Lexicanum: Pain Glove / Codex: Imperial Fists"
  },
  {
    id: "ev_chap_salamanders",
    title: "샐러맨더 — 프로메테우스 교단: 화염 속의 피난 열차",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["salamanders"] },
    reqLabel: "챕터: 샐러맨더",
    weight: 34,
    text: "오크 기갑 부대가 하이브 외곽의 민간인 피난 열차를 포위했다. 상급 사령부는 '민간인은 포기하고 적 탄약고부터 타격하라'고 무전하지만, 녹턴의 아들이자 불칸의 후예로서 아이들을 불길 속에 버려둘 수는 없다!",
    choices: [
      {
        label: "[강인 판정] 화염방사기와 썬더 해머를 들고 오크 한복판에 뛰어들어 피난민을 전원 구출한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "'전투의 불길 속으로, 모루 위로!' 그을린 초록빛 파워 아머로 피난민 수천 명을 끝까지 감싸 안았다. 살아남은 시민들이 눈물로 황제와 샐러맨더를 찬양했다!",
          stats: { T: 6, Fel: 7, WP: 5 },
          faith: 10,
          addTags: ["promethean_smith"]
        },
        fail: {
          text: "화염과 파편을 온몸으로 막아 내다 중상을 입었으나, 피난 열차만은 무사히 성문 안으로 들어갔다.",
          wounds: -24,
          stats: { T: 4, Fel: 5 }
        }
      },
      {
        label: "[지성 판정] 직접 단조한 마스터 크래프트 멜타탄으로 적 선두 전차를 폭파해 우회로를 연다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "정밀하게 조정된 열선 폭발이 오크 대열을 둘로 가르고 피난 열차의 탈출로를 확보했다! 녹턴 대장간의 긍지가 빛났다.",
          stats: { Int: 6, BS: 5, Fel: 4 }
        },
        fail: {
          text: "멜타 탄두가 조기 과열되어 화상을 입었으나 적의 진격을 지연시키는 데는 성공했다.",
          wounds: -15,
          stats: { Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Promethean Cult / Codex: Salamanders"
  },
  {
    id: "ev_chap_black_templars",
    title: "블랙 템플러 — '황제의 투사(Emperor's Champion)'의 계시",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["black_templars"] },
    reqLabel: "챕터: 블랙 템플러",
    weight: 34,
    text: "성전 출정 전야의 철야 기도 도중, 눈부신 황금빛 환상이 눈앞에 펼쳐졌다! 1만 년 전 지기스문트가 휘둘렀던 흑검(Black Sword)과 황제의 천둥 같은 음성이 적 카오스 군주의 목을 베라 명하고 있다!",
    choices: [
      {
        label: "[백병 판정] 채플린에게 계시를 고하고 흑검을 하사받아 '황제의 투사'로 적장 일기토에 나선다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "'자비도, 후회도, 두려움도 없다!' 검은 갑주와 흑검의 일섬이 카오스 군주의 투구를 두 동강 냈다! 전 성전군이 그대의 이름으로 승전의 성가를 외쳤다!",
          stats: { WS: 9, WP: 7, Inf: 8 },
          faith: 18,
          addTags: ["emperors_champion"]
        },
        fail: {
          text: "적장의 악마 검에 옆구리를 깊게 베였으나 끝내 적을 후퇴시키고 살아 돌아왔다.",
          wounds: -28,
          stats: { WS: 4, WP: 5 },
          faith: 8
        }
      },
      {
        label: "겸허히 계시를 성전 서약의 징표로 삼아 검 형제단의 최선두 돌격대를 이끈다",
        effect: {
          text: "체인을 팔뚝에 감아 묶고 성전 군기를 높이 치켜든 채 적진을 뚫고 나아갔다.",
          stats: { WS: 5, WP: 5, T: 3 },
          faith: 12
        }
      }
    ],
    source: "Lexicanum: Emperor's Champion / Codex: Black Templars"
  },
  {
    id: "ev_chap_raven_guard",
    title: "레이븐 가드 — 그림자 걸음과 침묵의 참수 작전",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["raven_guard"] },
    reqLabel: "챕터: 레이븐 가드",
    weight: 34,
    text: "반역 행성 총독의 철옹성 요새에 정면으로 돌격하면 아스트라 밀리타룸 3개 연대가 전멸할 상황이다. 제국군 장군은 포격 소모전을 고집하지만, 코르부스 코락스의 아들들에게는 더 우아하고 치명적인 방법이 있다.",
    choices: [
      {
        label: "[민첩 판정] 그림자 걸음(Shadow-Walk)으로 단신 잠입해 반역 총독의 목을 조용히 벤다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "'그림자로부터 승리를!' 단 한 발의 경보도 울리지 않은 채 반역 지휘부가 몰살당했다. 동틀 녘 요새 성문이 스스로 열리며 무혈 입성이 이뤄졌다!",
          stats: { Ag: 8, WS: 5, Int: 5 },
          addTags: ["shadow_master"]
        },
        fail: {
          text: "레이저 경보망에 발각되어 수십 명의 경비대와 난전을 벌인 끝에 간신히 폭파만 마치고 탈출했다.",
          wounds: -22,
          stats: { Ag: 4, WS: 3 }
        }
      },
      {
        label: "[사격 판정] 점프팩 소대를 이끌고 야간에 적 중화기 발전소와 통신탑을 동시 절단한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "눈과 귀가 먼 적군은 새벽 총공세 앞에 순식간에 무너졌다. 아군 피해는 1% 미만이었다.",
          stats: { BS: 6, Ag: 4, Int: 4 }
        },
        fail: {
          text: "대공포 사격에 점프팩이 손상되어 추락했으나, 끝내 발전소를 폭파해 임무는 완수했다.",
          wounds: -18,
          stats: { Ag: 3 }
        }
      }
    ],
    source: "Lexicanum: Raven Guard / Codex: Raven Guard"
  },
  {
    id: "ev_chap_white_scars",
    title: "화이트 스카 — 폭풍의 바이크 돌격과 스톰시어의 시(詩)",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["white_scars"] },
    reqLabel: "챕터: 화이트 스카",
    weight: 34,
    text: "끝없이 펼쳐진 잿빛 평원 너머로 오크 스피드 프릭 대부대가 먼지 구름을 일으키며 몰려온다. 아군 요새에 갇혀 방어하는 것은 초고리스의 전사에게 죽음보다 못하다. 폭풍은 기다리는 것이 아니라 먼저 몰아치는 법이다!",
    choices: [
      {
        label: "[민첩 판정] 아웃라이더 바이크의 가속기를 끝까지 당겨 적 측면을 번개처럼 베고 지나간다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "'칸과 황제를 위하여!' 시속 200km의 기동 사격과 파워 란스 일격이 오크 버기 대열을 잿더미로 만들었다. 바람 속에서 터져 나온 웃음소리가 평원을 울렸다!",
          stats: { Ag: 7, WS: 6, BS: 4 },
          addTags: ["khan_rider"]
        },
        fail: {
          text: "적 지뢰에 바이크가 전복되어 수십 미터를 굴렀으나, 초인의 체력으로 일어나 검을 뽑고 전선을 지켰다.",
          wounds: -20,
          stats: { T: 4, Ag: 3 }
        }
      },
      {
        label: "[의지/교섭 판정] 스톰시어와 함께 출정 전야의 시(詩)와 서예 의식으로 형제들의 기세를 다스린다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "붓끝에서 흘러나온 고요한 절제가 다음 날 전장의 광풍을 완벽히 통제했다. 자가타이 칸이 사랑한 문무겸비의 경지였다.",
          stats: { WP: 6, Fel: 6, Int: 4 }
        },
        fail: {
          text: "전투를 향한 조급함을 다스리지 못해 붓을 부러뜨리고 말았으나, 전장에서는 누구보다 사납게 싸웠다.",
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: White Scars / Codex: White Scars"
  },

  // =========================================================================
  // 2. 네임드 인물 고유 조우 스토리 이벤트 12종 (네임드 스포트라이트 연동!)
  // =========================================================================
  {
    id: "ev_named_guilliman",
    title: "섭정의 밤샘 전략실 — 로부테 길리먼과의 조우",
    category: "네임드 조우",
    once: true,
    characters: ["guilliman"],
    req: {
      minAge: 16,
      minYear: 1001,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["terra", "macragge"] },
        { anyTags: ["indomitus_crusader", "astartes", "inquisitor", "custodes", "officer"] }
      ]
    },
    reqLabel: "001.M42+ · 테라/마크라그 또는 성전·정예",
    weight: 28,
    text: "거대한 성도(星圖) 홀로그램 앞에 3미터가 넘는 푸른 황금 갑주의 반신, 제국 섭정 로부테 길리먼이 깊은 피로를 감춘 채 서 있다. 수백 개의 보급 보고서가 허공에 떠도는 가운데, 프라이마크의 날카로운 시선이 그대의 보고서와 눈동자에 머문다. '솔직히 말하라. 이 성계의 민심과 보급선은 진실로 어떠한가?'",
    choices: [
      {
        label: "[지성 판정] 미사여구를 버리고 냉철한 데이터와 병참 결함을 직언한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "길리먼이 희미한 미소를 지으며 고개를 끄덕였다. '1만 년 만에 아첨이 아닌 진실을 듣는군.' 섭정의 친필 인장이 찍힌 표창장이 수여되었다!",
          stats: { Int: 6, Inf: 10, WP: 5 },
          addTags: ["met_guilliman", "indomitus_crusader"]
        },
        fail: {
          text: "반신의 위압감에 말문이 막혀 수치를 더듬고 말았으나, 길리먼은 묵묵히 어깨를 두드리며 격려해 주었다.",
          stats: { WP: 3, Inf: 4 },
          addTags: ["met_guilliman"]
        }
      },
      {
        label: "황제와 섭정을 향한 변함없는 충성과 불굴의 각오를 맹세한다",
        effect: {
          text: "프라이마크의 장엄한 격려가 가슴 깊이 새겨졌다. 어둠 속에서도 이성과 질서는 꺼지지 않으리라.",
          stats: { WP: 5, Fel: 4, Inf: 6 },
          faith: 8,
          addTags: ["met_guilliman"]
        }
      }
    ],
    source: "Dark Imperium / Watchers of the Throne"
  },
  {
    id: "ev_named_yarrick",
    title: "하데스 하이브의 철의 눈 — 커미사르 세바스찬 야릭",
    category: "네임드 조우",
    once: true,
    characters: ["yarrick"],
    req: {
      minAge: 16,
      minYear: 940,
      maxYear: 1005,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["armageddon"] },
        { anyTags: ["militarum", "commissar", "lord_commissar", "officer"] }
      ]
    },
    reqLabel: "940.M41~005.M42 · 아마겟돈 또는 제국군",
    weight: 28,
    text: "잿빛 폭우가 쏟아지는 참호선을 따라 붉은 레이저 의안이 번뜩이고, 육중한 오크 파워 클로를 의수로 단 노장 커미사르 세바스찬 야릭이 걸어온다. 사기가 꺾여 있던 병사들이 그의 모습만 보고도 라스건을 고쳐 쥐며 자세를 바로잡는다. 야릭이 그대 앞에 멈춰 서서 라스건 총열을 살핀다.",
    choices: [
      {
        label: "[의지 판정] 야릭의 매서운 시선을 정면으로 마주하며 최전선 사수를 보고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "'훌륭하군. 영웅이 되려 하지 마라. 그저 제 자리를 지켜라.' 야릭이 직접 그대의 전술 지도를 보정해 주고 어깨를 두드렸다!",
          stats: { WP: 7, BS: 5, Inf: 6 },
          faith: 8,
          addTags: ["met_yarrick"]
        },
        fail: {
          text: "레이저 의안의 위압감에 등줄기가 서늘해졌으나, 야릭은 실수한 탄약 배치만 짧게 지적하고 다음 참호로 향했다.",
          stats: { WP: 3, BS: 2 },
          addTags: ["met_yarrick"]
        }
      },
      {
        label: "묵묵히 경례를 올리고 야릭의 전설적인 오크 방어 교리를 기록한다",
        effect: {
          text: "하데스 하이브의 영웅이 남긴 단 한마디가 평생 전장의 나침반이 되었다.",
          stats: { Int: 4, WP: 4, Inf: 3 },
          addTags: ["met_yarrick"]
        }
      }
    ],
    source: "Lexicanum: Sebastian Yarrick / Helsreach"
  },
  {
    id: "ev_named_cain",
    title: "타나 차 한 잔의 기적 — 커미사르 카이아파스 케인",
    category: "네임드 조우",
    once: true,
    characters: ["cain"],
    req: {
      minAge: 16,
      minYear: 919,
      maxYear: 1018,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["valhalla"] },
        { anyTags: ["militarum", "commissar", "inquisition_agent", "navy", "arbites"] }
      ]
    },
    reqLabel: "919.M41~018.M42 · 발할라 또는 제국 군·기관",
    weight: 26,
    text: "쾌활하고 품위 있는 커미사르 카이아파스 케인과 정체 모를 퀴퀴한 냄새를 풍기는 부관 유르겐이 타나 차를 건네며 다가온다. 케인은 '안전한 후방 배수로 점검'을 같이 가자며 웃었지만, 그가 배수로 문을 열자마자 하필이면 진스틸러 컬트 비밀 아지트가 눈앞에 나타났다!",
    choices: [
      {
        label: "[백병/사격 판정] 케인의 현란한 체인소드 검술과 유르겐의 멜타건에 합류해 소굴을 일망타진한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "케인이 허허 웃으며 '모든 것이 계획대로였소!'라 외치는 사이, 유르겐의 멜타건이 괴물을 증발시켰다! 그대 역시 '제국의 영웅과 함께 싸운 용사'로 훈장을 받았다!",
          stats: { BS: 5, WS: 4, Fel: 6, Inf: 7 },
          addTags: ["met_cain"]
        },
        fail: {
          text: "진스틸러의 발톱에 스쳐 부상을 입었으나, 기묘한 우연으로 무너진 파이프가 적을 덮치며 케인과 함께 기적적으로 살아남았다!",
          wounds: -14,
          stats: { Ag: 4, Inf: 4 },
          addTags: ["met_cain"]
        }
      },
      {
        label: "유르겐이 건넨 씁쓸한 타나 차를 한 모금 마시며 침착하게 후방 증원을 호출한다",
        effect: {
          text: "묘하게 워프 기운마저 잠잠해지는 이상한 부관 옆에서 완벽한 지원을 해냈다. 케인이 진심으로 고마워하며 저녁 포커판에 초대했다.",
          stats: { Fel: 5, Int: 4, Inf: 4 },
          corruption: -5,
          addTags: ["met_cain"]
        }
      }
    ],
    source: "Ciaphas Cain: For the Emperor"
  },
  {
    id: "ev_named_gaunt",
    title: "유령들의 모닥불 — 대령-커미사르 이브람 건트",
    category: "네임드 조우",
    once: true,
    characters: ["gaunt"],
    req: {
      minAge: 15,
      minYear: 755,
      maxYear: 795,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["tanith"] },
        { anySegmenta: ["pacificus"] },
        { anyTags: ["sabbat_veteran", "tanith_ghost"] }
      ]
    },
    reqLabel: "755~795.M41 · 사바트 성전·파시피쿠스",
    weight: 30,
    text: "짙은 야간 안개 속, 위장 망토를 두른 정찰병들이 백파이프를 낮게 연주하는 야영지에 대령-커미사르 이브람 건트가 앉아 있다. 공포로 병사를 다스리는 여느 커미사르와 달리, 그는 부하 한 명 한 명의 이름을 부르며 직접 탄창을 챙겨 주고 있다.",
    choices: [
      {
        label: "[교섭 판정] 건트와 야간 정찰 경로를 상의하며 부대원들의 신뢰를 얻는다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "'유령들이여, 영원히 살고 싶은가!' 건트가 그대의 공정함과 담력을 높이 사며 스승 옥타르 총커미사르에게 물려받은 지휘 철학과 체인소드 검술을 전해 주었다.",
          stats: { Fel: 6, WS: 5, WP: 5, Inf: 5 },
          addTags: ["met_gaunt", "sabbat_veteran"]
        },
        fail: {
          text: "고된 행군에 말이 짧아졌으나 건트는 묵묵히 군용 담배를 건네며 다음 날 전투의 선봉을 맡겼다.",
          stats: { WP: 4, Ag: 3 },
          addTags: ["met_gaunt"]
        }
      },
      {
        label: "타니스 정찰병들의 은신술과 백파이프 선율에 귀 기울이며 밤을 보낸다",
        effect: {
          text: "고향을 잃고도 끝까지 싸우는 이들의 품격이 가슴을 울렸다. 은신과 사격 감각이 한결 예리해졌다.",
          stats: { Ag: 5, BS: 4, WP: 3 },
          addTags: ["met_gaunt"]
        }
      }
    ],
    source: "Gaunt's Ghosts: First and Only"
  },
  {
    id: "ev_named_dante",
    title: "황금 데스 마스크의 천오백 년 — 사령관 단테",
    category: "네임드 조우",
    once: true,
    characters: ["dante"],
    req: {
      minAge: 16,
      minYear: 940,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["baal"] },
        { anyChapters: ["blood_angels"] },
        { allTags: ["imperial_nihilus"] }
      ]
    },
    reqLabel: "940.M41+ · 바알 / 블러드 엔젤 / 니힐루스",
    weight: 28,
    text: "눈부신 황금 파워 아머와 생귀니우스의 고뇌를 본뜬 데스 마스크를 쓴 최고령 스페이스 마린, 사령관 단테가 폐허가 된 성채 난간에 홀로 서 있다. 천오백 년을 싸우고도 쉴 수 없는 고독한 영웅이 고개를 돌려 그대에게 묻는다. '이 암흑 속에서도 그대는 아직 희망을 보는가?'",
    choices: [
      {
        label: "[의지 판정] '천사께서 버티시는 한, 인류도 결코 무릎 꿇지 않습니다'라고 답한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "황금 가면 너머로 깊은 한숨과 함께 다시 타오르는 결의가 느껴졌다. 단테가 직접 황금 핏방울 인장을 그대에게 하사했다!",
          stats: { WP: 7, Fel: 6, Inf: 8 },
          faith: 12,
          addTags: ["met_dante"]
        },
        fail: {
          text: "지쳐 버린 진심이 새어 나왔으나, 단테는 꾸짖지 않고 '피로는 죄가 아니다. 멈추지 않는 것이 의무일 뿐'이라며 조용히 격려했다.",
          stats: { WP: 4, Inf: 4 },
          addTags: ["met_dante"]
        }
      },
      {
        label: "말없이 경례를 올리고 단테가 지휘하는 다음 강습 작전의 최선봉을 자원한다",
        effect: {
          text: "천오백 년의 전사와 나란히 섰다는 사실만으로 영혼의 두려움이 사라졌다.",
          stats: { WS: 5, WP: 5, Inf: 5 },
          addTags: ["met_dante"]
        }
      }
    ],
    source: "Dante / The Devastation of Baal"
  },
  {
    id: "ev_named_cawl",
    title: "화성의 이단아인가 구원자인가 — 아크마고스 벨리사리우스 카울",
    category: "네임드 조우",
    once: true,
    characters: ["cawl"],
    req: {
      minAge: 16,
      minYear: 995,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["mars", "cadia", "terra"] },
        { anyTags: ["mechanicus", "tech_priest", "magos", "astartes"] }
      ]
    },
    reqLabel: "995.M41+ · 화성·카디아·테라 또는 기계교·아스타르테스",
    weight: 26,
    text: "거대한 곤충형 다리와 수십 개의 기계팔, 그리고 여러 개의 목소리가 교차하는 괴짜 대현자 벨리사리우스 카울이 반중력 실험실 한가운데서 그대를 부른다! '오호, 마침 적당한 조수가 왔군! 정통파 꼰대들이 보면 기절할 새 플라즈마 코일 시험을 도와 보겠나?'",
    choices: [
      {
        label: "[지성 판정] 카울의 대담한 기술 가설에 맞장구치며 연산 코일 조정을 돕는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'브라보! 역시 혁신이야말로 옴니시아의 참뜻이지!' 카울이 기뻐하며 최신형 마스터 크래프트 장구류와 화성 최고위 추천서를 건넸다!",
          stats: { Int: 8, BS: 4, Inf: 7 },
          addTags: ["met_cawl"]
        },
        fail: {
          text: "플라즈마 코일이 역화해 눈썹이 그을렸다! 카울은 '훌륭한 실패 데이터군!'이라며 껄껄 웃고 치료 연고를 던져 주었다.",
          wounds: -14,
          stats: { Int: 4 },
          addTags: ["met_cawl"]
        }
      },
      {
        label: "기술 이단의 소지를 경계하며 정통 기계교 교리대로 안전 점검만 수행한다",
        effect: {
          text: "카울은 '재미없는 정통파로군'이라며 혀를 찼지만, 그대의 꼼꼼한 안전 기록 덕에 실험 사고를 막았다.",
          stats: { Int: 4, WP: 4, Inf: 3 },
          addTags: ["met_cawl"]
        }
      }
    ],
    source: "Belisarius Cawl: The Great Work"
  },
  {
    id: "ev_named_celestine",
    title: "황금 날개의 강림 — 살아 있는 성녀 셀레스틴",
    category: "네임드 조우",
    once: true,
    characters: ["celestine"],
    req: {
      minAge: 14,
      minYear: 995,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["ophelia7", "cadia"] },
        { anyTags: ["sororitas", "canoness", "ecclesiarchy", "pious", "saint_spark"] },
        { minFaith: 72 }
      ]
    },
    reqLabel: "995.M41+ · 높은 신앙 또는 국교·수녀회·성지",
    weight: 26,
    text: "검은 구름과 절망이 전장을 덮은 순간, 하늘이 갈라지며 순백의 비둘기 떼와 함께 황금 날개를 펼친 살아 있는 성녀 셀레스틴이 강림했다! 그녀가 불타는 성검 '아던트 블레이드'를 들어 올리자, 주변의 워프 냉기와 상처가 눈 녹듯 사라지기 시작한다.",
    choices: [
      {
        label: "[의지 판정] 성녀의 불길 옆으로 달려 나가 무너진 전열을 다시 일으켜 세운다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "성녀의 눈부신 축복이 온몸을 감쌌다! 상처가 기적처럼 아물고 워프의 오염이 완전히 정화되었다!",
          stats: { WP: 7, WS: 4, Fel: 6 },
          wounds: 30,
          faith: 22,
          corruption: -25,
          addTags: ["met_celestine", "living_miracle"]
        },
        fail: {
          text: "눈부신 성광에 무릎을 꿇고 눈물을 흘렸으나, 그 영적인 여운이 영혼을 굳건히 붙들어 주었다.",
          stats: { WP: 4 },
          faith: 15,
          corruption: -12,
          addTags: ["met_celestine"]
        }
      },
      {
        label: "경건히 무릎 꿇고 부상당한 동료들을 위해 황제의 기적을 간구한다",
        effect: {
          text: "성녀의 따스한 빛이 야전 의무실까지 퍼져 나가 수많은 전우가 목숨을 건졌다.",
          stats: { Fel: 5, WP: 4 },
          wounds: 15,
          faith: 16,
          corruption: -15,
          addTags: ["met_celestine"]
        }
      }
    ],
    source: "Celestine: The Living Saint / Fall of Cadia"
  },
  {
    id: "ev_named_eisenhorn",
    title: "그림자 속의 심판자 — 이단심문관 그레고르 아이젠혼",
    category: "네임드 조우",
    once: true,
    characters: ["eisenhorn"],
    req: {
      minAge: 18,
      minYear: 240,
      maxYear: 510,
      excludeTags: ["heretic", "astartes", "custodes"],
      or: [
        { anyTags: ["inquisition_agent", "inquisitor", "arbites"] },
        { stats: { Int: 48, WP: 46 } }
      ]
    },
    reqLabel: "240~510.M41 · 이단심문소·아르비테스 또는 지성48+ 의지46+",
    weight: 26,
    text: "비 내리는 낡은 고서점 골목에서 긴 검은 코트를 걸치고 고대 룬 검을 찬 이단심문관 그레고르 아이젠혼이 조용히 길을 막아선다. 그의 얼굴에는 오랜 세월의 상처와 꺾이지 않는 의지가 서려 있다. '오르도 제노스의 이름으로 묻겠소. 제국을 구하기 위해서라면, 당신은 어디까지 선을 넘을 수 있소?'",
    choices: [
      {
        label: "[지성 판정] 아이젠혼이 추적 중인 외계 유물 밀수망의 암호 장부를 해독해 건넨다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "아이젠혼이 짧게 고개를 끄덕였다. '예리하군. 이단심문소에는 자네 같은 눈이 필요하오.' 비밀 연락 인장과 깊은 신임을 얻었다!",
          stats: { Int: 6, WP: 5, Inf: 8 },
          addTags: ["met_eisenhorn", "inquisition_favor"]
        },
        fail: {
          text: "암호의 함정에 걸려 정신적 역풍을 맞았으나, 아이젠혼이 사이킥 제어로 그대를 구해 주었다.",
          wounds: -12,
          corruption: 4,
          stats: { Int: 3 },
          addTags: ["met_eisenhorn"]
        }
      },
      {
        label: "어떠한 목적도 이단을 정당화할 수 없다며 청교도적 원칙을 당당히 밝힌다",
        effect: {
          text: "아이젠혼이 씁쓸한 미소를 지었다. '나 역시 한때는 그리 확신했지. 그 순수함을 부디 오래 지키시오.'",
          stats: { WP: 6, Inf: 4 },
          faith: 8,
          corruption: -6,
          addTags: ["met_eisenhorn"]
        }
      }
    ],
    source: "Eisenhorn: Xenos / Malleus / Hereticus"
  },
  {
    id: "ev_named_grimnar",
    title: "펜리스의 늙은 늑대 — 그레이트 울프 로간 그림나르",
    category: "네임드 조우",
    once: true,
    characters: ["grimnar"],
    req: {
      minAge: 16,
      minYear: 900,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["fenris", "armageddon"] },
        { anyChapters: ["space_wolves"] },
        { anyTags: ["astartes", "militarum", "officer"] }
      ]
    },
    reqLabel: "900.M41+ · 펜리스·아마겟돈 또는 스페이스 울프·제국군",
    weight: 26,
    text: "거대한 늑대 모피를 두른 터미네이터 갑주 차림의 전사왕 로간 그림나르가 모닥불 앞에서 호탕하게 웃으며 커다란 뿔잔을 내민다! '어이, 작은 전사! 펜리스의 독주 묠드를 한 모금 마시고 네 무용담을 들려주지 않겠나? 겁먹으면 늑대 사가에 못 오른다!'",
    choices: [
      {
        label: "[강인 판정] 필멸자의 장기를 녹일 듯한 펜리스 독주 묠드를 단숨에 들이켠다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "불덩이 같은 술을 버텨 내자 그림나르가 폭소를 터뜨리며 커다란 손으로 등을 두드렸다! '하하하! 늑대의 심장을 가졌군!'",
          stats: { T: 6, Fel: 6, WP: 5, Inf: 6 },
          addTags: ["met_grimnar"]
        },
        fail: {
          text: "한 모금 만에 눈앞이 핑 돌며 쓰러졌으나, 다음 날 아침 그림나르가 '배짱만큼은 합격이다'라며 늑대 송곳니 부적을 남겨 두었다.",
          wounds: -10,
          stats: { T: 3, Fel: 3 },
          addTags: ["met_grimnar"]
        }
      },
      {
        label: "전투에서 목격한 전우들의 희생담을 진중하게 읊으며 늑대왕에게 예를 갖춘다",
        effect: {
          text: "로간 그림나르가 웃음을 거두고 진지하게 고개를 숙였다. '죽은 전사들의 이름을 잊지 않는 자가 진정한 영웅이다.'",
          stats: { WP: 5, Fel: 5, Inf: 5 },
          addTags: ["met_grimnar"]
        }
      }
    ],
    source: "Lexicanum: Logan Grimnar / The Emperor's Gift"
  },
  {
    id: "ev_named_tushan",
    title: "불꽃 속의 거인 — 샐러맨더 챕터 마스터 투샨",
    category: "네임드 조우",
    once: true,
    characters: ["tushan"],
    req: {
      minAge: 14,
      minYear: 941,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["nocturne", "armageddon"] },
        { anyChapters: ["salamanders"] },
        { anyTags: ["armageddon_3_vet", "armageddon_hero"] }
      ]
    },
    reqLabel: "941.M41+ · 녹턴·아마겟돈 또는 샐러맨더",
    weight: 28,
    text: "잿빛 화염과 붉은 눈빛을 지닌 거대한 아스타르테스, 샐러맨더 챕터 마스터 투샨이 무너진 대피소 대들보를 맨손으로 떠받친 채 피난민들을 대피시키고 있다! 그가 그대를 향해 낮고 따뜻한 목소리로 외친다. '이쪽이다! 아직 아이들이 남아 있다. 함께 길을 열자!'",
    choices: [
      {
        label: "[강인/민첩 판정] 화염이 덮친 대피소 안으로 들어가 남은 부상자들을 끝까지 끌어낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "투샨이 그대의 용기에 감탄하며 직접 녹턴식 화염 내성 망토를 둘러 주었다. '황제의 가장 귀한 보물은 강철이 아니라 바로 이 생명들이다.'",
          stats: { T: 6, Fel: 6, WP: 5, Inf: 6 },
          faith: 10,
          addTags: ["met_tushan"]
        },
        fail: {
          text: "연기를 마시고 화상을 입었으나, 투샨이 거대한 팔로 그대와 피난민을 함께 끌어안고 화염 밖으로 뛰쳐나왔다!",
          wounds: -14,
          stats: { T: 3, Fel: 4 },
          addTags: ["met_tushan"]
        }
      },
      {
        label: "대피소 밖 화망을 통제하며 오크 습격대가 접근하지 못하게 엄호 사격을 퍼붓는다",
        effect: {
          text: "빈틈없는 엄호 덕에 피난민 대열이 무사히 빠져나갔다. 투샨이 가슴에 주먹을 대며 깊은 감사를 표했다.",
          stats: { BS: 5, WP: 4, Inf: 4 },
          addTags: ["met_tushan"]
        }
      }
    ],
    source: "Helsreach / Codex: Salamanders"
  },
  {
    id: "ev_named_valoris",
    title: "황금 옥좌의 수호자 — 캡틴-제너럴 트라얀 발로리스",
    category: "네임드 조우",
    once: true,
    characters: ["valoris"],
    req: {
      minAge: 18,
      minYear: 999,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["terra"] },
        { anyTags: ["custodes", "inquisitor", "hero_of_imperium", "lions_gate_vet"] }
      ]
    },
    reqLabel: "999.M41+ · 신성한 테라 또는 쿠스토데스·고위 영웅",
    weight: 26,
    text: "황궁 영원의 문 앞, 사자 가죽 망토와 고대 파워 도끼 '와처스 액스'를 든 아뎁투스 쿠스토데스 최고 사령관 트라얀 발로리스가 황금빛 침묵 속에 걸음을 멈춘다. 그의 손목에서는 시간을 조작하는 고대 유물 '모멘트 샤클'이 희미하게 맥동한다. '옥좌의 뜻은 논쟁이 아니라 집행이다. 네가 본 테라의 위협을 고하라.'",
    choices: [
      {
        label: "[지성/의지 판정] 황궁 외곽의 수상한 잠입 흔적과 안보 허점을 침착하게 브리핑한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "발로리스가 고개를 끄덕이며 '황금 근위대의 눈이 닿지 못한 틈을 잘 짚었군'이라 치하했다. 테라 하이 로드 회의에서도 통하는 황궁 출입 인장이 하사되었다!",
          stats: { Int: 6, WP: 6, Inf: 12 },
          addTags: ["met_valoris"]
        },
        fail: {
          text: "황금 근위대 총사령관의 냉철한 반문에 말문이 막혔으나, 그는 이미 모든 변수를 파악하고 있었다는 듯 미동 없이 돌아섰다.",
          stats: { WP: 4, Inf: 3 },
          addTags: ["met_valoris"]
        }
      },
      {
        label: "황금 옥좌를 향해 경건히 예를 올리고 부여된 수비 임무에 매진한다",
        effect: {
          text: "만 명의 수호자를 이끄는 반신의 위용을 목격한 기억이 영원한 자부심이 되었다.",
          stats: { WP: 5, Inf: 6 },
          faith: 10,
          addTags: ["met_valoris"]
        }
      }
    ],
    source: "Watchers of the Throne / Codex: Adeptus Custodes"
  },
  {
    id: "ev_named_lion",
    title: "안개 숲에서 돌아온 사자 — 라이온 엘 존슨",
    category: "네임드 조우",
    once: true,
    characters: ["lion"],
    req: {
      minAge: 15,
      minYear: 1015,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { allTags: ["imperial_nihilus"] },
        { anyChapters: ["dark_angels"] }
      ]
    },
    reqLabel: "015.M42+ · 임페리움 니힐루스 또는 다크 엔젤",
    weight: 30,
    text: "카오스 약탈자들에게 포위되어 끝장나려던 찰나, 잿빛 전장에 기이한 고대 칼리반의 숲 안개가 피어오르더니 황제의 방패와 대검 '피얼티'를 든 백발의 프라이마크, 라이온 엘 존슨이 안개를 뚫고 걸어 나왔다! 단 몇 번의 검격으로 적 카오스 터미네이터들이 쓰러진 뒤, 사자가 그대를 향해 손을 내민다. '일어나라. 암흑 속에서도 인류는 버려지지 않았다.'",
    choices: [
      {
        label: "[백병/의지 판정] 사자의 곁에서 검을 들고 포위된 성채의 잔적을 함께 소탕한다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "프라이마크의 방패에서 뿜어져 나온 황금 충격파가 적군을 날려 버렸다! 라이온 엘 존슨이 그대의 용맹을 인정해 '라이온의 보호령' 수호 기사단 증표를 내렸다!",
          stats: { WS: 7, WP: 7, Inf: 10 },
          faith: 12,
          addTags: ["met_lion"]
        },
        fail: {
          text: "반신의 속도를 따라잡다 부상을 입었으나, 프라이마크가 직접 방패로 포화를 막아 주며 그대를 구해 냈다!",
          wounds: -12,
          stats: { WS: 4, WP: 5, Inf: 6 },
          addTags: ["met_lion"]
        }
      },
      {
        label: "고립된 인근 행성들의 좌표와 생존자 명단을 프라이마크에게 바친다",
        effect: {
          text: "라이온이 지도를 품에 넣고 고개를 끄덕였다. '다음 포레스트워크의 목적지는 그곳이다.'",
          stats: { Int: 5, Fel: 6, Inf: 8 },
          addTags: ["met_lion"]
        }
      }
    ],
    source: "The Lion: Son of the Forest / Arks of Omen: The Lion"
  },

  // =========================================================================
  // 3. 직군별 고유 분기 이벤트 12종 (직업마다 확연히 다른 재미!)
  // =========================================================================
  {
    id: "ev_career_pdf_drill",
    title: "행성 방위군(PDF) — 총독의 열병식 vs 진짜 반란 첩보",
    category: "직군 고유",
    req: { anyCareers: ["pdf_trooper"] },
    reqLabel: "직군: 행성 방위군(PDF)",
    weight: 26,
    text: "행성 총독의 화려한 승천 기념 열병식을 하루 앞두고, 하수도 초소에서 수상한 변이체 무장 집단이 발견되었다는 무전이 들어왔다. 연대장은 '총독 각하의 심기를 건드리지 말고 열병식 군화나 닦으라'며 첩보를 묵살하려 한다!",
    choices: [
      {
        label: "[사격 판정] 명령을 어기고 분대를 이끌어 하수도 반란 거점을 선제 타격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "열병식 폭탄 테러를 미연에 막아 냈다! 아스트라 밀리타룸 징병관이 그대의 실전 감각을 극찬하며 추천장을 써 주었다.",
          stats: { BS: 5, WP: 4, Inf: 6 }
        },
        fail: {
          text: "화력 부족으로 부상을 입고 후퇴했다. 상부에서는 '열병식 무단 이탈'로 영창 처분까지 내렸다!",
          wounds: -18,
          stats: { Inf: -4, T: 3 }
        }
      },
      {
        label: "상관의 명령대로 군화를 광내고 열병식 사열대에 완벽하게 선다",
        effect: {
          text: "총독의 호평을 받아 포상 휴가를 받았지만, 며칠 뒤 외곽 발전소가 괴한의 습격으로 불타올랐다.",
          stats: { Fel: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Planetary Defence Forces / Only War"
  },
  {
    id: "ev_career_menial_guild",
    title: "행성 노동자 · 길드원 — 작업반장 자리와 배급권 암투",
    category: "직군 고유",
    req: { anyCareers: ["menial_worker"] },
    reqLabel: "직군: 행성 노동자·길드원",
    weight: 24,
    text: "공장 4교대 작업반장이 프레스 사고로 팔을 잃고 퇴출되자 그 자리가 비었다. 길드 감독은 '누구든 동료들의 불평불만 명단을 바치거나 생산 할당량을 140% 달성하면 반장 완장을 주겠다'고 공언했다.",
    choices: [
      {
        label: "[강인 판정] 피를 토하는 18시간 연속 작업으로 순수하게 할당량 140%를 돌파한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "동료들의 존경과 길드의 인정을 모두 거머쥐고 작업반장으로 승진했다! 깨끗한 식량 배급과 작은 인맥이 생겼다.",
          stats: { T: 5, Inf: 6, Fel: 4 },
          wounds: -6
        },
        fail: {
          text: "과로로 컨베이어 벨트 옆에 쓰러져 사흘간 임금을 몰수당했다.",
          wounds: -16,
          stats: { T: 2 }
        }
      },
      {
        label: "[교섭 판정] 불만 세력을 밀고하는 대신, 길드 감독에게 효율 개선안을 제안해 타협한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "기계 마모를 줄이면서 생산량을 늘리는 안이 채택되어 서무 감독관 보좌로 발탁되었다!",
          stats: { Int: 5, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "'주제넘은 일꾼이 감히 기계 공정을 논하느냐'며 뺨을 맞고 석탄 창고로 좌천되었다.",
          wounds: -10,
          stats: { Inf: -3 }
        }
      },
      {
        label: "출세 욕심을 접고 동료들과 조용히 몫을 나눠 가지며 살아남는 데 집중한다",
        effect: {
          text: "권력은 얻지 못했으나 힘든 날 서로 빵을 나눠 줄 든든한 작업반 동료들을 얻었다.",
          stats: { Fel: 3, T: 2 },
          wounds: 5
        }
      }
    ],
    source: "Imperium Maledictum / Hive World Labor Lore"
  },
  {
    id: "ev_career_ganger_turf",
    title: "언더하이브 갱단원 — 고대 아키오테크 밀수 화물 쟁탈전",
    category: "직군 고유",
    req: { anyCareers: ["underhive_ganger"] },
    reqLabel: "직군: 언더하이브 갱단원",
    weight: 26,
    text: "폐쇄된 하층 배수관 아래에서 황금빛 에너지 셀이 달린 고대 아키오테크 상자가 발견되었다! 적대 갱단 20여 명이 샷건과 도끼를 들고 몰려오고 있으며, 저편에서는 아르비테스 순찰대의 사이렌 소리마저 울려 퍼진다.",
    choices: [
      {
        label: "[민첩 판정] 적대 갱단과 치안대 사이에 유탄을 던져 혼전을 유도하고 상자만 챙겨 튄다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "완벽한 어부지리! 암시장 거상에게 아키오테크를 넘겨 막대한 자금과 하층 구역의 명성을 거머쥐었다!",
          stats: { Ag: 5, Inf: 7, Int: 3 }
        },
        fail: {
          text: "도주로가 막혀 샷건 파편을 어깨에 맞고 빈손으로 하수구로 기어 도망쳤다.",
          wounds: -20,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[백병 판정] 정면으로 들이받아 적 갱단 두목을 꺾고 이 구역의 패권을 차지한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "피투성이 혈투 끝에 하층 3개 구역의 지배권을 차지했다! 공포와 존경이 동시에 뒤따른다.",
          stats: { WS: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "수적 열세에 밀려 쓰러졌다가 겨우 동료들의 부축으로 목숨만 건졌다.",
          wounds: -24,
          stats: { T: 3 }
        }
      },
      {
        label: "위험한 물건에 손을 떼고 안전하게 본거지로 철수한다",
        effect: {
          text: "언더하이브에서 오래 사는 비결은 욕심을 버릴 때를 아는 것이다.",
          stats: { Int: 3, Ag: 2 }
        }
      }
    ],
    source: "Necromunda: Underhive / Dark Heresy"
  },
  {
    id: "ev_career_guard_salvage",
    title: "아스트라 밀리타룸 — 포격 뒤 무주지의 보급품과 전우의 군번줄",
    category: "직군 고유",
    req: { anyCareers: ["astra_militarum"] },
    reqLabel: "직군: 아스트라 밀리타룸",
    weight: 25,
    text: "양측의 포격이 잠시 멎은 틈, 철조망 너머 무주지에 부서진 보급 수송차와 쓰러진 선임 병사의 시신이 보인다. 적 저격수가 노리고 있을 것이 분명하지만, 분대에는 탄약과 깨끗한 붕대가 바닥난 상태다.",
    choices: [
      {
        label: "[민첩 판정] 포탄 구덩이를 포복으로 기어가 탄약 상자와 선임의 군번줄을 모두 회수한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "저격탄 두 발이 철모를 스쳤으나 기어이 탄약과 군번줄을 품고 돌아왔다! 분대원들이 그대를 진정한 베테랑으로 대우하기 시작했다.",
          stats: { Ag: 5, WP: 4, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "종아리에 저격탄을 스치고 간신히 철조망 아래로 굴러 떨어졌다.",
          wounds: -20,
          stats: { T: 3 }
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
    id: "ev_career_navy_boarding",
    title: "임페리얼 네이비 — 워프 출구 앞 해적 강습정 방어전",
    category: "직군 고유",
    req: { anyCareers: ["imperial_navy"] },
    reqLabel: "직군: 임페리얼 네이비",
    weight: 26,
    text: "순양함이 워프에서 빠져나와 겔러 필드를 끄는 바로 그 순간, 소행성대 뒤에 숨어 있던 드루카리 해적 강습정 세 척이 선체 측면에 강제 도킹했다! 기관실과 함교 중 어느 쪽을 먼저 막아야 할지 단 몇 초 안에 결단해야 한다.",
    choices: [
      {
        label: "[민첩/사격 판정] 퓨리 요격기 편대를 긴급 발진시켜 적 모함의 엔진을 먼저 찢어 놓는다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "화려한 무중력 기동으로 외계 약탈선을 격침했다! 해군 제독이 직접 은빛 날개 훈장을 달아 주었다.",
          stats: { Ag: 6, BS: 5, Inf: 6 }
        },
        fail: {
          text: "외계 다크 랜스에 기체 날개가 녹아내려 비상 탈출 포드로 간신히 생환했다.",
          wounds: -20,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[백병 판정] 해군 육전대와 함께 샷건을 들고 기관실 격벽에서 백병전으로 적을 밀어낸다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "좁은 통로에서 압도적인 산탄 화력으로 해적들을 진공 우주로 날려 버렸다! 선원들의 사기가 하늘을 찔렀다.",
          stats: { WS: 6, T: 4, Fel: 4 }
        },
        fail: {
          text: "독침 탄환에 팔을 맞고 쓰러졌으나 격벽 폐쇄 레버를 당겨 기관실만은 지켜 냈다.",
          wounds: -22,
          stats: { WP: 4 }
        }
      },
      {
        label: "침입 구획 전체의 대기압을 강제 배출해 외계인들을 우주로 쓸어 버린다",
        effect: {
          text: "그 구획에 있던 하급 선원 40명도 함께 희생되었으나, 순양함과 승무원 수만 명은 무사했다. 이것이 임페리얼 네이비의 냉혹한 계산이다.",
          stats: { Int: 5, WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Battlefleet Gothic / Execution Hour"
  },
  {
    id: "ev_career_arbites_tithe",
    title: "아뎁투스 아르비테스 — 십일조 체납 행성 총독궁 강제 진입",
    category: "직군 고유",
    req: { anyCareers: ["arbites"] },
    reqLabel: "직군: 아뎁투스 아르비테스",
    weight: 26,
    text: "행성 총독이 사치에 빠져 3년째 제국 십일조 곡물과 병력 납부를 지연시키고 있다. 행성 경찰들은 총독 편에 서서 길을 막았지만, 제국법(Lex Imperialis) 아래 행성 총독이라 해도 반역자일 뿐이다.",
    choices: [
      {
        label: "[백병/위압 판정] 쇼크 마울과 컴뱃 샷건을 장전하고 아르비테스 장갑차로 총독궁 정문을 부순다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'제국법의 이름으로 체포한다!' 사병 부대를 순식간에 진압하고 총독을 공개 처형했다. 제국 치안대의 절대 권위가 행성 전역에 각인되었다!",
          stats: { WS: 5, BS: 4, Inf: 8, WP: 4 }
        },
        fail: {
          text: "총독 사병대의 중화기 매복에 장갑차가 대파되어 중상을 입었으나, 결국 궤도 증원군이 내려와 총독을 끌어냈다.",
          wounds: -22,
          stats: { T: 4, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 총독의 비밀 계좌와 밀수 장부를 먼저 압수해 귀족 의회가 스스로 총독을 내치게 만든다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "피 한 방울 흘리지 않고 십일조 전액을 회수하고 부패 관료 일당을 일망타진했다!",
          stats: { Int: 6, Inf: 7, Fel: 4 }
        },
        fail: {
          text: "장부 일부가 소각되어 증거가 부족해졌고, 결국 지루한 시가전 진압으로 넘어갔다.",
          wounds: -12,
          stats: { Int: 2 }
        }
      }
    ],
    source: "Enforcer: Shira Calpurnia / Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_career_admin_munitorum",
    title: "아드미니스트라툼 — 데파트멘토 무니토룸 전시 징발 분쟁",
    category: "직군 고유",
    req: { anyCareers: ["administratum"] },
    reqLabel: "직군: 아드미니스트라툼",
    weight: 26,
    text: "인접 전선의 아스트라 밀리타룸 장군과 포지 월드 마고스가 동시에 같은 수송 선단과 프로메튬 연료 할당량을 요구하며 청원서를 들이밀었다! 어느 쪽에 우선 배정 도장을 찍느냐에 따라 한 전선이 무너지거나 기계교와 원수가 된다.",
    choices: [
      {
        label: "[지성 판정] 50년째 항구 창고에 방치된 잉여 예비 보급 명부를 찾아내 양쪽 수요를 모두 충족한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'황제의 놀라운 행정 기적!' 전선과 기계교 양쪽 모두에서 찬사가 쏟아졌고, 그대는 성역 수석 아뎁트로 파격 승진했다!",
          stats: { Int: 7, Inf: 8, Fel: 4 }
        },
        fail: {
          text: "창고 열쇠를 찾느라 사흘을 허비하는 사이 양측 사절이 서로 주먹다짐을 벌여 징계 경고를 받았다.",
          stats: { Inf: -5, Int: 3 }
        }
      },
      {
        label: "정치적 파장이 적은 쪽으로 표준 순번 규정만 적용해 깔끔히 결재 도장을 찍는다",
        effect: {
          text: "아드미니스트라툼에서 살아남는 비결은 오직 규정 번호 뒤에 숨는 것이다. 상급자의 신임을 지켰다.",
          stats: { Inf: 5, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Departmento Munitorum / Adeptus Administratum"
  },
  {
    id: "ev_career_sororitas_trial",
    title: "아뎁타 소로리타스 — 화형대 앞 회개자와 전투 수녀의 신념",
    category: "직군 고유",
    req: { anyCareers: ["adepta_sororitas"] },
    reqLabel: "직군: 아뎁타 소로리타스",
    weight: 26,
    text: "반역 하이브를 탈환한 뒤, 이단 설교에 잠시 휘말렸던 하층 시민 수백 명이 광장에 끌려 나왔다. 국교 추기경은 전원 화형을 명하지만, 그중 수많은 아이들과 진심으로 눈물 흘리며 황제 찬송가를 부르는 회개자들이 보인다.",
    choices: [
      {
        label: "[의지 판정] 황제의 빛 아래 영혼을 직접 심문해 진짜 이단자만 가려내고 무고한 자들을 지켜 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "흔들리지 않는 순수한 신앙의 눈에 숨어 있던 컬트 간부 셋이 저절로 발각되었다! 무고한 시민들은 참회 노동으로 구명되었고 수녀회의 품격이 빛났다.",
          stats: { WP: 6, Fel: 6, Inf: 5 },
          faith: 12,
          corruption: -6
        },
        fail: {
          text: "심문 중 숨어 있던 광신도가 폭탄을 터뜨려 부상을 입었으나, 그대는 끝내 쓰러지지 않고 적을 정화했다.",
          wounds: -18,
          faith: 8
        }
      },
      {
        label: "자비는 이단의 씨앗이다. 추기경의 칙령대로 화염방사기로 광장을 완전히 정화한다",
        effect: {
          text: "불길과 찬송가가 하늘을 뒤덮었다. 국교 고위층은 그대의 무자비한 순결을 칭송했다.",
          stats: { WP: 4, BS: 4, Inf: 5, Fel: -4 },
          faith: 10
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Faith and Fire"
  },
  {
    id: "ev_career_techpriest_stc",
    title: "테크프리스트 — 깨어난 고대 기계령과 교리의 경계",
    category: "직군 고유",
    req: { anyCareers: ["tech_priest"] },
    reqLabel: "직군: 테크프리스트",
    weight: 26,
    text: "지하 폐허의 고대 발전기를 정비하던 중, 표준 설계도에 없는 고효율 냉각 회로가 스스로 가동하며 이진법으로 대화를 걸어왔다! 정통 교리대로라면 '규격 외 자율 연산(기술 이단)'으로 즉시 파괴해야 하지만, 이대로 분석하면 행성 전체의 에너지난을 단번에 끝낼 수 있다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 성스러운 축성 기름을 붓고 안전하게 고대 STC 단편으로 공식 등록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기계령을 정통 성전 코드로 완벽히 감싸 화성 의회의 공인을 받아 냈다! 마고스 승진에 결정적인 업적이 되었다.",
          stats: { Int: 8, Inf: 8 },
          addTags: ["stc_finder"]
        },
        fail: {
          text: "감찰 마고스가 이단적 코드 변형을 눈치채고 징계를 내렸다! 겨우 회로를 봉인해 처형은 면했다.",
          stats: { Inf: -6, Int: 3 },
          addTags: ["tech_heresy"]
        }
      },
      {
        label: "오염된 혐오 지능(Abominable Intelligence)의 위험을 원천 차단하고자 즉시 용광로에 폐기한다",
        effect: {
          text: "화성 정통파 상급자들이 그대의 흔들림 없는 기계 교리 수호를 높이 칭찬했다.",
          stats: { WP: 5, Inf: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Tech-Heresy / Forges of Mars"
  },
  {
    id: "ev_career_rogue_xenos",
    title: "로그 트레이더 — 변경 정거장의 아엘다리 해적선장과 거래",
    category: "직군 고유",
    req: { anyCareers: ["rogue_trader"] },
    reqLabel: "직군: 로그 트레이더",
    weight: 26,
    text: "제국 국경 너머 코로누스 성계 외곽의 무법 우주정거장. 유려한 아엘다리(엘다) 커세어 선장이 고대 성간 항로 지도를 내놓으며 제국산 희귀 광물과 교환하자고 제안했다. 황제의 무역 영장이 있으니 합법이지만, 선내 성직자의 눈초리가 매섭다.",
    choices: [
      {
        label: "[교섭 판정] 무역 영장의 절대 권위를 내세워 아엘다리 선장과 배짱 두둑한 대거래를 성사시킨다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "미지의 보물 성계 항로를 손에 넣었다! 가문의 국고가 넘쳐나고 외계 항법 지식까지 얻었다.",
          stats: { Fel: 6, Inf: 10, Int: 4 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "오만한 외계인이 함정을 파 두었다! 정거장 총격전 끝에 화물 절반을 잃고 겨우 기함으로 탈출했다.",
          wounds: -18,
          stats: { Inf: -4, Ag: 3 }
        }
      },
      {
        label: "[사격 판정] 거래를 가장해 기함의 거포 사거리 안으로 유인한 뒤 외계 해적선을 격침·노획한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "선내 국교 사제와 제국 해군 모두 환호했다! 부서진 외계선 잔해에서 귀한 전리품까지 건졌다.",
          stats: { BS: 6, Inf: 7, WP: 4 },
          faith: 8
        },
        fail: {
          text: "아엘다리 함선의 믿기 힘든 기동력에 역습당해 선체 방어막이 크게 손상되었다.",
          wounds: -16,
          stats: { Ag: 3 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Koronus Expanse"
  },
  {
    id: "ev_career_psyker_whisper",
    title: "생션드 사이커 — 아스트로패스 합창단의 폭주",
    category: "직군 고유",
    req: { anyCareers: ["sanctioned_psyker"] },
    reqLabel: "직군: 생션드 사이커",
    weight: 26,
    text: "성간 텔레파시 송신을 진행하던 중, 워프 해류가 갑자기 소용돌이치며 아스트로패스 합창단원 셋의 눈에서 보랏빛 불꽃이 뿜어져 나왔다! 이대로 방치하면 합창실 전체가 악마의 차원문으로 찢어질 판이다.",
    choices: [
      {
        label: "[의지 판정] 황제의 영혼 결속을 끌어올려 자신의 정신 방벽으로 폭주 파동을 전부 받아 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "코피를 쏟으며 끝내 워프의 균열을 닫았다! 합창단 수십 명의 목숨과 기밀 전문을 모두 지켜 내고 최고위 아스트로패스로 추대되었다.",
          stats: { WP: 8, Int: 5, Inf: 6 },
          wounds: -8,
          corruption: -5
        },
        fail: {
          text: "워프의 비명이 머릿속을 찢고 지나가며 정신적 상처와 오염을 남겼다. 그래도 차원문만은 가까스로 막았다.",
          wounds: -20,
          corruption: 12,
          stats: { WP: 3 }
        }
      },
      {
        label: "규정대로 합창실 비상 차단기를 내려 폭주한 단원들을 즉각 처분하고 송신을 중단한다",
        effect: {
          text: "참혹하지만 제국 규정상 가장 정확한 조치였다. 호위 커미사르가 권총을 집어넣으며 냉정히 고개를 끄덕였다.",
          stats: { Int: 4, WP: 3, Inf: 4 }
        }
      }
    ],
    source: "Dark Heresy / Astra Telepathica Lore"
  },
  {
    id: "ev_career_custodes_dark_cells",
    title: "아뎁투스 쿠스토데스 — 황궁 지하 '어둠의 감방(Dark Cells)' 봉인 경보",
    category: "직군 고유",
    req: { anyCareers: ["adeptus_custodes"] },
    reqLabel: "직군: 아뎁투스 쿠스토데스",
    weight: 28,
    text: "황궁 지하 수 킬로미터 아래, 투쟁의 시대부터 봉인되어 온 끔찍한 아키오테크와 고대 괴물들을 가둔 '어둠의 감방' 41번 격벽에서 정지장 출력 저하 경보가 울렸다! 섀도우키퍼(Shadowkeepers) 방패 부대의 긴급 출동이 요청되었다.",
    choices: [
      {
        label: "[의지/지성 판정] 정지장 핵심실로 단독 진입해 고대 육방정계 룬 봉인을 수동으로 재가동한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "현실을 뒤트는 속삭임을 반신적 의지로 묵살하고 봉인을 복구했다! 테라 전체가 알지도 못한 채 또 하나의 멸망을 비껴갔다.",
          stats: { WP: 7, Int: 6, Inf: 8 }
        },
        fail: {
          text: "새어 나온 시공간 왜곡에 황금 아우라마이트 갑주 일부가 부식되며 깊은 상처를 입었으나, 봉인만은 가까스로 지켜 냈다.",
          wounds: -18,
          stats: { WP: 4, T: 3 }
        }
      },
      {
        label: "[백병 판정] 가디언 스피어를 비껴 들고 격벽 앞에서 빠져나오려는 그림자 개체를 무력으로 밀어 넣는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "번개 같은 창술과 볼터 연사가 이름 모를 괴물을 다시 어둠 속으로 쳐 넣었다! 섀도우키퍼 선임이 침묵 속에 경의를 표했다.",
          stats: { WS: 7, T: 5, WP: 4 }
        },
        fail: {
          text: "기괴한 반격에 부상을 입었으나 지원 온 형제 쿠스토데스들과 합세해 격벽을 완전히 봉쇄했다.",
          wounds: -16,
          stats: { WS: 3 }
        }
      }
    ],
    source: "Lexicanum: Dark Cells / Codex: Adeptus Custodes"
  },

  // =========================================================================
  // 4. 시기 x 장소 전용 이벤트 10종 (minYear / maxYear + 장소/세그멘툼!)
  // =========================================================================
  {
    id: "ev_era_sabbat_bloodpact",
    title: "사바트 성전기 — '피의 서약(Blood Pact)' 카오스 정규군의 야습",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 755,
      maxYear: 790,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [{ anySegmenta: ["pacificus"] }, { anyTags: ["sabbat_veteran", "tanith_ghost"] }]
    },
    reqLabel: "755~790.M41 · 세그멘툼 파시피쿠스",
    weight: 30,
    text: "오합지졸 광신도가 아니다! 코른을 섬기면서도 제국군 못지않은 규율과 기갑 전술을 갖춘 '피의 서약' 정예 보병들이 붉은 철제 가면을 쓰고 아군 보급 기지를 야습했다!",
    choices: [
      {
        label: "[사격 판정] 조명탄을 쏘아 올려 십자 포화로 피의 서약 선봉대를 저지한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "철저한 사격 통제로 카오스 정예군의 기습을 분쇄했다! 사바트 성전 사령부의 표창과 훈장을 받았다.",
          stats: { BS: 6, WP: 5, Inf: 5 },
          addTags: ["sabbat_veteran"]
        },
        fail: {
          text: "적의 맹렬한 박격포 반격에 참호가 무너져 부상을 입었으나 새벽까지 버텨 냈다.",
          wounds: -20,
          stats: { T: 3 },
          addTags: ["sabbat_veteran"]
        }
      },
      {
        label: "보급 탄약고에 방화벽을 치고 비전투 인원을 안전 구역으로 대피시킨다",
        effect: {
          text: "탄약고 폭발을 막아 연대 전체의 보급선을 지켜 냈다.",
          stats: { Int: 4, Fel: 4, WP: 3 },
          addTags: ["sabbat_veteran"]
        }
      }
    ],
    source: "Lexicanum: Blood Pact / Sabbat Worlds Crusade"
  },
  {
    id: "ev_era_badab_blockade",
    title: "바답 전쟁기 — 마엘스트롬 십일조 봉쇄와 계엄령",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 901,
      maxYear: 912,
      anySegmenta: ["ultima"]
    },
    reqLabel: "901~912.M41 · 울티마 세그멘툼",
    weight: 28,
    text: "아스트랄 클로 챕터 마스터 루프트 휴론이 제국 십일조 납부를 거부하고 마엘스트롬 일대를 봉쇄하면서 울티마 세그멘툼 전역에 계엄령이 떨어졌다! 스페이스 마린끼리 서로 총부리를 겨누는 충격적인 내전 소식에 상선 항로가 끊기고 식량과 탄약이 폭등했다.",
    choices: [
      {
        label: "[지성/교섭 판정] 봉쇄망을 피해 우회 보급 항로를 개척하고 충성파 함대에 물자를 조달한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "충성파 챕터와 제국 해군의 보급난을 크게 덜어 주었다! 성역 총독부로부터 훈장과 두둑한 보상을 받았다.",
          stats: { Int: 5, Inf: 7, Fel: 4 },
          addTags: ["badab_veteran"]
        },
        fail: {
          text: "타이거 클로 해적 함대의 기습을 받아 화물선 일부를 잃고 간신히 귀환했다.",
          wounds: -15,
          stats: { Inf: -2 }
        }
      },
      {
        label: "계엄령 수칙을 엄격히 준수하며 지역 방어와 비축 물자 관리에 집중한다",
        effect: {
          text: "혼란스러운 마린 내전의 불똥을 피하며 묵묵히 치안을 지켜 냈다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Imperial Armour Vol. 9 & 10: The Badab War"
  },
  {
    id: "ev_era_armageddon_aftermath",
    title: "2차 아마겟돈 직후 — 하데스 하이브 폐허와 오크 포자 소각",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 12,
      minYear: 942,
      maxYear: 958,
      anyWorlds: ["armageddon"]
    },
    reqLabel: "942~958.M41 · 아마겟돈",
    weight: 30,
    text: "가즈쿨의 대군은 물러났지만, 잿더미가 된 하데스 하이브 외곽 적도 밀림에서는 죽은 오크들이 남긴 포자가 끊임없이 야생 페럴 오크로 자라나고 있다! 화염방사 소각대와 재건 작업반이 매일 목숨을 걸고 잿빛 황무지로 나선다.",
    choices: [
      {
        label: "[사격/강인 판정] 화염 소각대에 합류해 야생 오크 둥지를 뿌리째 불태운다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "유독 가스와 페럴 오크의 매복을 뚫고 세 구역의 포자를 완전히 정화했다! 강철 군단 베테랑의 인정을 받았다.",
          stats: { T: 6, BS: 4, WS: 4 }
        },
        fail: {
          text: "불길 속에서 튀어나온 야생 오크의 도끼에 어깨를 베여 후송되었다.",
          wounds: -18,
          stats: { T: 3 }
        }
      },
      {
        label: "파괴된 하이브 정화 필터와 방벽 재건 공사에 매진한다",
        effect: {
          text: "머지않아 오크가 다시 돌아오리라는 불안 속에서도 도시의 숨통을 다시 열어 놓았다.",
          stats: { Int: 4, T: 3, Inf: 3 }
        }
      }
    ],
    source: "Codex: Armageddon / War for Armageddon"
  },
  {
    id: "ev_era_cadia_omen",
    title: "13차 블랙 크루세이드 전야 — 붉게 팽창하는 공포의 눈",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 12,
      minYear: 990,
      maxYear: 998,
      or: [{ anyWorlds: ["cadia"] }, { anySegmenta: ["obscurus"] }]
    },
    reqLabel: "990~998.M41 · 카디아 / 세그멘툼 옵스쿠루스",
    weight: 30,
    text: "밤하늘을 가득 채운 공포의 눈(Eye of Terror)이 전례 없이 붉고 거대하게 부풀어 올랐다. 아스트로패스들이 매일 밤 피눈물을 흘리며 비명을 지르고, 카디안 게이트 전역에 최후의 결전을 앞둔 총동원령이 내려졌다!",
    choices: [
      {
        label: "[의지 판정] 폭풍 전야의 광기를 억누르고 요새 방어선 점검과 탄약 비축을 주도한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "불안이 극에 달한 시민과 병사들을 다독이며 완벽한 전시 태세를 갖췄다. 폭풍이 몰아쳐도 무너지지 않을 것이다.",
          stats: { WP: 6, BS: 4, Inf: 4 },
          faith: 8
        },
        fail: {
          text: "공포의 눈에서 스며든 악몽에 시달려 밤잠을 설쳤으나, 끝내 초소를 지키며 버텨 냈다.",
          wounds: -8,
          corruption: 5,
          stats: { WP: 3 }
        }
      },
      {
        label: "성당에 모여 다가올 암흑에 맞설 기도와 유언장을 준비한다",
        effect: {
          text: "두려움 대신 차분한 결의가 가슴에 내려앉았다. 카디아는 서 있으리라.",
          stats: { WP: 4, Fel: 3 },
          faith: 10
        }
      }
    ],
    source: "Gathering Storm I: Fall of Cadia"
  },
  {
    id: "ev_era_noctis_aeterna",
    title: "영원한 밤(Noctis Aeterna) — 아스트로노미칸이 꺼진 33일",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 10,
      minYear: 999,
      maxYear: 1001
    },
    reqLabel: "999.M41~001.M42 · 대균열 직후 전 제국",
    weight: 34,
    text: "대균열(시카트릭스 말레딕툼)이 은하를 가른 직후, 1만 년 동안 단 한 번도 꺼진 적 없던 테라의 아스트로노미칸 등불이 소멸했다! 33일 동안 모든 성간 항해와 통신이 끊기고, 행성 곳곳에서 종말론 폭동과 악마의 속삭임이 터져 나온다!",
    choices: [
      {
        label: "[의지 판정] 칠흑 같은 절망 속에서 등불을 높이 들고 치안과 신앙을 사수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "33일 만에 마침내 황금 등불이 다시 타올랐을 때, 그대가 지켜 낸 구역만은 광기에 삼켜지지 않고 살아남았다!",
          stats: { WP: 7, Fel: 5, Inf: 6 },
          faith: 12,
          addTags: ["rift_survivor"]
        },
        fail: {
          text: "폭도들과 워프 환각 속에서 극심한 부상을 입었으나 기어이 33일째의 새벽을 맞이했다.",
          wounds: -20,
          corruption: 6,
          stats: { WP: 3 },
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "견고한 성당 지하 대피소에 식량과 물을 모으고 문이 열릴 때까지 버틴다",
        effect: {
          text: "바깥에서 비명이 울려 퍼지는 33일을 간신히 견뎌 내고 대균열 이후의 새 시대를 맞았다.",
          stats: { T: 4, WP: 3 },
          addTags: ["rift_survivor"]
        }
      }
    ],
    source: "Lexicanum: Noctis Aeterna / Watchers of the Throne"
  },
  {
    id: "ev_era_terra_hexarchy",
    title: "신성한 테라 — 육두정치(Hexarchy) 쿠데타 음모",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 1001,
      maxYear: 1006,
      anyWorlds: ["terra"]
    },
    reqLabel: "001~006.M42 · 신성한 테라",
    weight: 34,
    text: "로부테 길리먼이 인도미투스 성전을 떠나자, 권력을 잃은 구(舊) 테라 하이 로드 6명이 '육두정치' 반란을 꾸미며 황궁 외곽의 치안군과 어쌔신들을 은밀히 움직이기 시작했다! 테라 상층 구역 전체에 살벌한 첩보전이 벌어지고 있다.",
    choices: [
      {
        label: "[지성 판정] 육두정치 반역파의 비밀 전령을 추적해 섭정 충성파와 황궁 사령부에 보고한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "길리먼이 미리 심어 둔 오피시오 어쌔시노룸이 번개처럼 반역파를 숙청했다! 충성파의 숨은 공로자로 테라 내 막대한 권위를 얻었다.",
          stats: { Int: 6, Inf: 10, WP: 5 }
        },
        fail: {
          text: "반역 귀족 사병들에게 정체가 들켜 추격전 끝에 큰 부상을 입었으나, 결국 쿠데타는 실패로 끝났다.",
          wounds: -20,
          stats: { Ag: 4 }
        }
      },
      {
        label: "하이 로드들의 피비린내 나는 권력 투쟁에 휘말리지 않게 철저히 몸을 낮춘다",
        effect: {
          text: "며칠 뒤 황궁 첨탑에 반역 귀족들의 수급이 걸렸다는 소식이 전해졌다. 테라에서 오래 사는 법을 다시 한 번 깨달았다.",
          stats: { WP: 4, Int: 3 }
        }
      }
    ],
    source: "Watchers of the Throne: The Regent's Shadow"
  },
  {
    id: "ev_era_indomitus_muster",
    title: "인도미투스 성전 대집결 — 프라이머리스 함대의 궤도 보급령",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 1001,
      maxYear: 1016,
      excludeTags: ["imperial_nihilus", "heretic", "chaos_aligned"]
    },
    reqLabel: "001~016.M42 · 임페리움 상크투스",
    weight: 28,
    text: "수백 척의 거대 전함과 새로운 회색 갑주의 프라이머리스 스페이스 마린을 실은 인도미투스 성전 함대가 행성 궤도에 집결했다! 제국 역사상 대성전 이후 최대 규모의 반격 작전이 시작되며 막대한 병력과 자원, 지원자를 끌어모으고 있다.",
    choices: [
      {
        label: "[교섭/의지 판정] 성전 함대의 선봉 보급·작전 지원에 자원해 '인도미투스 성전군' 휘장을 받는다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "새로운 시대의 반격에 이름을 올렸다! 거대한 성전 함대의 위용 아래 사기와 권위가 크게 치솟았다.",
          stats: { WP: 5, BS: 4, Inf: 7 },
          faith: 8,
          addTags: ["indomitus_crusader"]
        },
        fail: {
          text: "살인적인 출정 준비와 사고 속에 부상을 입었으나, 끝내 성전 출정 명단에 이름을 올렸다.",
          wounds: -12,
          stats: { T: 3, Inf: 3 },
          addTags: ["indomitus_crusader"]
        }
      },
      {
        label: "후방 행성의 보급선과 생산 라인을 정비하며 성전군의 든든한 배후를 지탱한다",
        effect: {
          text: "전선의 승리는 후방의 탄약 상자에서 나온다. 묵묵한 공헌으로 지역 내 높은 신뢰를 얻었다.",
          stats: { Int: 4, Inf: 5 }
        }
      }
    ],
    source: "Dawn of Fire: Avenging Son / Codex: Space Marines"
  },
  {
    id: "ev_era_nihilus_corsairs",
    title: "임페리움 니힐루스 — 빛 없는 하늘의 보급 단절과 약탈 함대",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 1000,
      maxYear: 1045,
      allTags: ["imperial_nihilus"]
    },
    reqLabel: "000~045.M42 · 임페리움 니힐루스 (암흑 고립)",
    weight: 32,
    text: "아스트로노미칸의 빛이 완전히 차단된 임페리움 니힐루스. 테라의 지원이 끊긴 지 수년째, 궤도에 정체불명의 카오스 약탈선과 아엘다리 해적이 번갈아 나타나 물자를 뜯어 가고 있다. 이제 이 성계의 생존은 오직 자신들의 손에 달렸다.",
    choices: [
      {
        label: "[사격/전술 판정] 행성 잔존 궤도 포대와 민병대를 규합해 약탈 함대에 피비린내 나는 매복을 건다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "방심하고 저궤도로 내려온 해적 호위함 두 척을 격추했다! 노획한 워프 엔진 부품으로 성계가 수년 더 버틸 숨통을 텄다!",
          stats: { BS: 6, WP: 6, Inf: 7 }
        },
        fail: {
          text: "궤도 보복 폭격으로 방어 진지가 무너져 큰 상처를 입었으나, 약탈선도 피해를 입고 물러났다.",
          wounds: -22,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "지하 방공호에 시민과 식량을 숨기고 해적들이 지나갈 때까지 인내하며 버틴다",
        effect: {
          text: "치욕스러웠지만 암흑 제국에서는 살아남아 내일을 기약하는 자가 결국 승리한다.",
          stats: { T: 4, Int: 3 }
        }
      }
    ],
    source: "Spear of the Emperor / Imperium Nihilus Lore"
  },
  {
    id: "ev_era_pariah_stilling",
    title: "파리아 넥서스의 '정적(The Stilling)' — 영혼이 메마르는 파동",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 12,
      minYear: 1016,
      maxYear: 1040,
      anySegmenta: ["ultima", "tempestus"]
    },
    reqLabel: "016~040.M42 · 울티마·템페스투스 세그멘툼",
    weight: 28,
    text: "네크론의 거대한 흑요석 파일런들이 성역 어딘가에서 깨어나며 워프를 완전히 억누르는 기괴한 반(反)사이킥 파동 '정적(The Stilling)'이 밀려왔다! 거리마다 시민들이 의욕을 잃고 멍하니 주저앉아 죽어 가고, 사이커들은 끔찍한 고통을 호소한다.",
    choices: [
      {
        label: "[의지 판정] 황제에 대한 불타는 신앙과 의지로 영혼의 무기력을 정면으로 뚫고 나아간다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "기적처럼 내면의 불꽃이 꺼지지 않았다! 무기력에 빠진 동료들을 일으켜 세우자 신앙의 기운이 파일런의 냉기를 밀어냈다!",
          stats: { WP: 8, Fel: 5 },
          faith: 14,
          corruption: -10
        },
        fail: {
          text: "뼈 속까지 시린 공허감에 쓰러져 며칠간 앓아누웠으나, 워프 오염만큼은 기묘하게 씻겨 나갔다.",
          wounds: -14,
          corruption: -10,
          stats: { WP: 2 }
        }
      },
      {
        label: "[블랭크/기계교 전용] 영혼 공허 파동의 주파수를 역측정해 대항 차폐막 데이터를 확보한다",
        req: { anyTags: ["blank", "mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "남들이 쓰러지는 동안 냉정히 네크론 흑요석 파장을 분석해 제국 학술부에 귀중한 자료를 넘겼다!",
          stats: { Int: 8, Inf: 6 },
          corruption: -8
        }
      },
      {
        label: "강제 기상 나팔과 교대 보초를 돌려 서로 잠들지 않게 붙들며 파동이 잦아들기를 기다린다",
        effect: {
          text: "서로 뺨을 때리고 찬송가를 외치며 가까스로 최악의 무기력에서 살아남았다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Psychic Awakening: Pariah / Crusade: Pariah Nexus"
  },
  {
    id: "ev_era_lions_protectorate",
    title: "라이온의 보호령 — 안개 속에서 도착한 제1군단의 구원",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 12,
      minYear: 1015,
      maxYear: 1050,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [{ allTags: ["imperial_nihilus"] }, { anyChapters: ["dark_angels"] }]
    },
    reqLabel: "015~050.M42 · 임페리움 니힐루스 / 다크 엔젤",
    weight: 28,
    text: "빛 없는 암흑 제국에 기적 같은 소식이 퍼졌다. 전설 속 프라이마크 라이온 엘 존슨이 깨어나 고립된 행성들을 묶어 '라이온의 보호령'을 세우고 있으며, 오늘 밤 제1군단 기사단의 깃발 아래 이 행성의 방어망을 재건하는 작전이 시작된다!",
    choices: [
      {
        label: "[교섭/의지 판정] 행성 방어 지도와 생존자 명단을 정비해 보호령 수비 협정 수립에 앞장선다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "제1군단의 깃발이 궤도에 걸리며 식량과 탄약 보급선이 다시 열렸다! 그대는 보호령 수호 연락관으로 임명되었다.",
          stats: { Fel: 6, Inf: 8, WP: 4 },
          faith: 10
        },
        fail: {
          text: "엄격한 보안 심문에 진땀을 뺐으나, 행성 방어 지원만은 무사히 확보했다.",
          stats: { WP: 4, Inf: 3 }
        }
      },
      {
        label: "기사단이 건넨 무기와 탄약을 챙겨 곧바로 외곽 방어선 구축 작업에 뛰어든다",
        effect: {
          text: "10년 만에 처음으로 암흑 제국 하늘 아래서 희망이라는 단어를 입에 올릴 수 있었다.",
          stats: { T: 4, BS: 4, WP: 4 },
          faith: 8
        }
      }
    ],
    source: "The Lion: Son of the Forest / Codex: Dark Angels (10e)"
  },

  // =========================================================================
  // 5. 추가 네임드 인물 고유 조우 이벤트 3종 (앰벌리 베일 · 그리말두스 · 아즈라엘)
  // =========================================================================
  {
    id: "ev_named_amberley_vail",
    title: "각주 속의 진실 — 오르도 제노스 이단심문관 앰벌리 베일",
    category: "네임드 조우",
    once: true,
    characters: ["amberley_vail"],
    req: {
      minAge: 18,
      minYear: 919,
      maxYear: 1018,
      excludeTags: ["heretic", "chaos_aligned", "astartes", "custodes"],
      or: [
        { anyTags: ["inquisition_agent", "inquisitor", "commissar", "militarum", "noble"] },
        { anyWorlds: ["valhalla"] }
      ]
    },
    reqLabel: "919.M41~018.M42 · 이단심문소·군·귀족 또는 발할라",
    weight: 28,
    text: "총독궁 연회장에서 오페라 가수로 위장해 있던 우아한 여인이 샴페인 잔 너머로 은밀히 로제트를 비춘다. 오르도 제노스 이단심문관 앰벌리 베일이다! '어머, 커미사르 케인의 선전 포스터만 믿고 계신 건 아니시겠죠? 저쪽 무역상 일행 중에 타우·진스틸러 밀수책이 섞여 있답니다. 잠시 눈과 귀가 되어 주시겠어요?'",
    choices: [
      {
        label: "[교섭/지성 판정] 사교계 대화를 유도해 밀수책의 암호 문양과 접선 장소를 파악한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "완벽한 연기로 용의자들의 입을 열게 만들었다! 앰벌리 베일이 흡족하게 웃으며 이단심문소 비밀 추천서와 고급 아마섹 한 병을 선물했다.",
          stats: { Fel: 6, Int: 5, Inf: 8 },
          addTags: ["met_amberley_vail", "inquisition_favor"]
        },
        fail: {
          text: "용의자에게 눈치를 채여 소동이 벌어졌으나, 베일의 수행원들이 순식간에 제압해 주었다.",
          wounds: -10,
          stats: { Int: 3 },
          addTags: ["met_amberley_vail"]
        }
      },
      {
        label: "위장 수사의 후방 경계를 맡아 도주로만 철저히 차단한다",
        effect: {
          text: "조용하지만 확실한 지원 덕에 오르도 제노스 체포 작전이 깔끔하게 마무리되었다.",
          stats: { BS: 4, WP: 4, Inf: 5 },
          addTags: ["met_amberley_vail"]
        }
      }
    ],
    source: "Lexicanum: Amberley Vail / Ciaphas Cain: For the Emperor"
  },
  {
    id: "ev_named_grimaldus",
    title: "헬스리치의 웅변 — 블랙 템플러 수석 채플린 메렉 그리말두스",
    category: "네임드 조우",
    once: true,
    characters: ["grimaldus"],
    req: {
      minAge: 15,
      minYear: 998,
      maxYear: 1040,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["armageddon"] },
        { anyChapters: ["black_templars"] },
        { anyTags: ["militarum", "armageddon_3_vet", "sororitas"] }
      ]
    },
    reqLabel: "998.M41+ · 아마겟돈·블랙 템플러·제국군",
    weight: 28,
    text: "잿더미가 된 성벽 위로 해골 투구를 쓴 블랙 템플러 수석 채플린(레클루시아크) 메렉 그리말두스가 올라섰다! 압도적인 적 대군 앞에 얼어붙은 병사들을 향해 그의 복스 확성기가 우레처럼 울려 퍼진다. '나는 헬스리치의 영웅이 아니다! 영웅은 여기 서 있는 너희 모두다! 오늘 이 자리에서 나와 함께 싸우겠는가!'",
    choices: [
      {
        label: "[의지 판정] 그리말두스의 포효에 화답해 크로지우스의 빛을 따라 최선두로 돌격한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "공포가 흔적도 없이 타올라 사라졌다! 해골 투구의 수석 채플린 곁에서 성벽을 사수해 내며 불굴의 신앙을 가슴에 새겼다.",
          stats: { WP: 8, WS: 5, Inf: 7 },
          faith: 16,
          addTags: ["met_grimaldus"]
        },
        fail: {
          text: "적의 집중 포화에 휩쓸려 부상을 입었으나, 그리말두스가 외친 맹세를 되뇌며 끝내 전선을 이탈하지 않았다.",
          wounds: -18,
          stats: { WP: 5 },
          faith: 10,
          addTags: ["met_grimaldus"]
        }
      },
      {
        label: "탄약 보급과 부상병 후송을 독려하며 수석 채플린의 연설이 꺼지지 않게 방어선을 지탱한다",
        effect: {
          text: "성벽이 무너지기 직전까지 단 한 발의 볼터 탄약도 끊기지 않았다. 전투 후 그리말두스가 말없이 가슴에 주먹을 얹어 경의를 표했다.",
          stats: { Fel: 5, T: 4, Inf: 5 },
          faith: 10,
          addTags: ["met_grimaldus"]
        }
      }
    ],
    source: "Helsreach / Codex: Black Templars"
  },
  {
    id: "ev_named_azrael",
    title: "비밀의 검과 사자의 투구 — 슈프림 그랜드 마스터 아즈라엘",
    category: "네임드 조우",
    once: true,
    characters: ["azrael"],
    req: {
      minAge: 18,
      minYear: 939,
      maxYear: 1045,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyChapters: ["dark_angels"] },
        { anyTags: ["astartes", "inquisitor", "officer", "hero_of_imperium"] }
      ]
    },
    reqLabel: "939.M41+ · 다크 엔젤 또는 아스타르테스·고위 지휘관",
    weight: 28,
    text: "이동 요새 '더 락'의 침묵 어린 전략실. 작은 로브를 두른 정체불명의 '어둠 속의 감시자(Watcher in the Dark)'가 사자의 투구를 받쳐 든 곁에 다크 엔젤 슈프림 그랜드 마스터 아즈라엘이 서 있다. 그의 날카로운 시선이 그대의 작전 보고서를 꿰뚫는다. '이 성계의 진실 가운데, 네가 입 밖으로 꺼내지 말아야 할 것이 무엇인지 알고 있겠지?'",
    choices: [
      {
        label: "[지성/의지 판정] 제1군단의 기밀에 대한 철저한 침묵을 서약하고 완벽한 협동 공성안을 제시한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "아즈라엘이 비밀의 검 자루에 손을 얹고 묵직하게 고개를 끄덕였다. '침묵과 정밀함이야말로 승리의 열쇠다.' 다크 엔젤 최고 사령관의 신뢰를 얻었다!",
          stats: { Int: 6, WP: 6, BS: 4, Inf: 8 },
          addTags: ["met_azrael"]
        },
        fail: {
          text: "무심코 금기된 단어를 입에 올릴 뻔해 실내의 공기가 얼어붙었다. 아즈라엘의 차가운 경고 속에 가까스로 회의를 마쳤다.",
          stats: { WP: 4, Inf: -2 },
          addTags: ["met_azrael"]
        }
      },
      {
        label: "묻지도 캐묻지도 않은 채 제1군단이 지목한 적 거점 타격 임무에만 전념한다",
        effect: {
          text: "군더더기 없는 복종과 플라즈마 화력 지원으로 합동 작전을 완수했다.",
          stats: { BS: 5, WP: 4, Inf: 4 },
          addTags: ["met_azrael"]
        }
      }
    ],
    source: "Lexicanum: Azrael / Codex: Dark Angels"
  },

  // =========================================================================
  // 6. 스페이스 마린 9대 챕터 고유 이벤트 2차 확장 (챕터당 2개 고유 서사!)
  // =========================================================================
  {
    id: "ev_chap2_ultramarines",
    title: "울트라마린 — 울트라마 500 행성 테트라크 행정 순찰",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["ultramarines"] },
    reqLabel: "챕터: 울트라마린",
    weight: 28,
    text: "전투가 끝난 울트라마 변경 행성의 재건 현장. 여타 챕터라면 즉시 철수했겠지만, 울트라마린은 로부테 길리먼의 가르침대로 행성의 식량 배급과 방위군(울트라마 보조군) 재편까지 검수한다. 지역 귀족 의회가 재건 예산을 빼돌린 정황이 포착되었다!",
    choices: [
      {
        label: "[지성/교섭 판정] 귀족 의회 장부를 직접 감사해 횡령범을 파면하고 시민 재건 기금을 복구한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "전사일 뿐 아니라 통치자이기도 한 울트라마린의 품격! 행성 전체가 3년 앞당겨 복구되며 울트라마의 질서가 빛났다.",
          stats: { Int: 6, Fel: 6, Inf: 7 }
        },
        fail: {
          text: "부패 귀족들의 복잡한 서류 술수에 시간을 허비해 결국 강제 군정으로 수습해야 했다.",
          stats: { Int: 3, Inf: 2 }
        }
      },
      {
        label: "행정 감사는 테트라크 보좌관에게 맡기고 행성 방위군 정예 사격 훈련을 직접 지도한다",
        effect: {
          text: "울트라마 보조군의 실전 전투력이 눈에 띄게 상승했다. '용기와 명예로!'",
          stats: { BS: 5, Fel: 4, Inf: 4 }
        }
      }
    ],
    source: "Codex: Ultramarines / Dark Imperium"
  },
  {
    id: "ev_chap2_blood_angels",
    title: "블러드 엔젤 — 바알 황금 탑의 조각과 고귀한 절제",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["blood_angels"] },
    reqLabel: "챕터: 블러드 엔젤",
    weight: 28,
    text: "연속된 혈전 끝에 아스타르테스 형제들의 혈관에 '붉은 갈증'이 거세게 맥동한다. 생귀너리 사제가 그대에게 대리석 끌과 붓을 건네며 말한다. '생귀니우스께서는 아름다움을 빚는 손으로 내면의 야수를 다스리라 가르치셨다. 전투 전까지 네 영혼을 예술로 정화하라.'",
    choices: [
      {
        label: "[의지 판정] 밤을 새워 생귀니우스의 천사상을 조각하며 내면의 갈증을 고요히 승화시킨다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "피 묻은 전사의 손끝에서 눈부신 성상이 태어났다! 붉은 갈증이 잦아들고 고귀한 평정심이 깃들었다.",
          stats: { WP: 6, Fel: 6, Ag: 4 },
          faith: 10,
          corruption: -8
        },
        fail: {
          text: "치밀어 오른 갈증에 대리석을 산산조각 내고 말았으나, 그 격정을 훈련장 검술 대련으로 쏟아부었다.",
          stats: { WS: 5, WP: 2 }
        }
      },
      {
        label: "조각 대신 형제들과 생귀너리 성배 의식에 참여해 전사한 선배들의 이름을 기린다",
        effect: {
          text: "바알의 유대가 한층 깊어졌으며, 다가올 강습전에서의 결의가 불타올랐다.",
          stats: { WP: 4, WS: 4, Fel: 3 },
          faith: 8
        }
      }
    ],
    source: "Dante / Codex: Blood Angels"
  },
  {
    id: "ev_chap2_space_wolves",
    title: "스페이스 울프 — 더 팽(The Fang)의 대연회와 묠드 사가 경연",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["space_wolves"] },
    reqLabel: "챕터: 스페이스 울프",
    weight: 28,
    text: "거대한 화산 요새 '더 팽'의 대연회장. 늑대 모피와 불꽃이 넘실대는 가운데, 울프 로드와 형제들이 아스타르테스의 독극물 면역마저 취하게 만드는 펜리스 독주 '묠드(Mjod)'를 들이켜며 무용담 사가(Saga)와 팔씨름을 겨루고 있다!",
    choices: [
      {
        label: "[강인 판정] 묠드 두 통을 들이켠 채 베테랑 울프 가드와 정면 대련 및 팔씨름을 겨룬다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "'펜리스 효르다!' 대연회장이 떠나갈 듯한 함성 속에 베테랑을 꺾고 그대의 이름이 새로운 사가에 올라갔다!",
          stats: { T: 6, WS: 6, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "강철 탁자를 부수며 바닥에 나뒹굴었으나, 형제들의 호탕한 웃음 속에 더 진한 전우애를 얻었다.",
          wounds: -10,
          stats: { T: 4, Fel: 4 }
        }
      },
      {
        label: "[교섭/의지 판정] 스칼드(음유시인)처럼 쓰러진 형제들의 위대한 사가를 장엄하게 읊어 올린다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "거친 늑대 전사들이 일제히 잔을 높이 들며 경의를 표했다. 룬 프리스트가 그대의 목소리에 깊은 영혼이 담겼다고 평했다.",
          stats: { Fel: 6, WP: 5, Inf: 5 }
        },
        fail: {
          text: "운율이 어긋나 야유와 폭소가 터졌지만, 묠드 한 잔에 모든 것이 유쾌하게 넘어갔다.",
          stats: { Fel: 3, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: The Fang / Codex: Space Wolves"
  },
  {
    id: "ev_chap2_dark_angels",
    title: "다크 엔젤 — 데스윙(Deathwing) 골백색 터미네이터의 시험",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["dark_angels"] },
    reqLabel: "챕터: 다크 엔젤",
    weight: 28,
    text: "제1중대 '데스윙'의 골백색 터미네이터 갑주들이 침묵 속에 그대를 둘러쌌다. 챕터 최고 정예 중대인 데스윙의 전사는 최악의 적진에 텔레포트 강습할 무위뿐만 아니라, 제1군단이 1만 년간 짊어진 비밀을 무덤까지 지킬 철의 의지를 증명해야 한다.",
    choices: [
      {
        label: "[의지 판정] 심문관 채플린의 혹독한 정신 감찰과 데스윙 근접 시험을 정면 돌파한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "티끌 없는 충성과 강철 같은 침묵을 증명했다! 골백색 터미네이터 갑주에 버금가는 제1중대 영예 표식을 하사받았다!",
          stats: { WP: 7, WS: 6, T: 5, Inf: 6 },
          addTags: ["inner_circle"]
        },
        fail: {
          text: "모의 텔레포트 강습 시험에서 치명적인 반격을 허용해 다음 기회를 기약해야 했다.",
          wounds: -18,
          stats: { WP: 4, WS: 3 }
        }
      },
      {
        label: "데스윙 입단 대신 고속 추격 중대 '레이븐윙(Ravenwing)'의 기동 정찰 훈련에 자원한다",
        effect: {
          text: "칠흑 같은 바이크와 랜드 스피더 편대 속에서 번개 같은 추적 감각을 익혔다.",
          stats: { Ag: 6, BS: 5, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Deathwing / Codex: Dark Angels"
  },
  {
    id: "ev_chap2_imperial_fists",
    title: "임페리얼 피스트 — 이동 요새 '팔랑크스(Phalanx)'의 방어전",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["imperial_fists"] },
    reqLabel: "챕터: 임페리얼 피스트",
    weight: 28,
    text: "인류제국 최대의 고대 이동 요새이자 달만 한 크기의 성간 성채 '팔랑크스'. 워프 폭풍을 뚫고 출현한 카오스 강습선들이 팔랑크스 외곽 3번 도킹 베이에 달라붙어 내부로 침투를 시도하고 있다!",
    choices: [
      {
        label: "[사격 판정] 황금 갑판의 자동 방어 포탑망과 볼터 화력을 통합 지휘해 적 강습정을 분쇄한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "'테라와 돈을 위하여!' 단 한 명의 이단자도 성스러운 팔랑크스 내벽을 넘지 못하고 우주로 쓸려 나갔다!",
          stats: { BS: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "도킹 베이 격벽이 뚫려 치열한 백병전 끝에 부상을 입었으나 끝내 침입자를 전멸시켰다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[백병 판정] 폭풍 방패를 맞대고 좁은 격벽 통로에서 한 걸음도 물러서지 않는 철벽 방진을 세운다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "로갈 돈의 방패처럼 미동조차 없는 방어선 앞에 카오스 광전사들이 차례로 쓰러졌다!",
          stats: { T: 6, WS: 6, WP: 5 }
        },
        fail: {
          text: "적의 멜타 폭약에 방패가 깨지며 중상을 입었으나, 쓰러질 때까지 통로를 내주지 않았다.",
          wounds: -22,
          stats: { T: 4 }
        }
      }
    ],
    source: "Lexicanum: Phalanx / Codex: Imperial Fists"
  },
  {
    id: "ev_chap2_salamanders",
    title: "샐러맨더 — 녹턴 고향 마을의 대장간과 필멸자 가족",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["salamanders"] },
    reqLabel: "챕터: 샐러맨더",
    weight: 28,
    text: "대부분의 스페이스 마린이 필멸자 시절의 가족을 잊는 것과 달리, 샐러맨더는 작전이 없을 때 녹턴의 일곱 성소 도시로 돌아가 부족민들과 어울리며 스스로 무구를 단조한다. 지진으로 무너진 마을 대장간에서 노장 대장장이가 그대의 거대한 망치를 반긴다.",
    choices: [
      {
        label: "[지성/강인 판정] 용암 화덕 앞에서 사흘 밤낮을 두드려 자신만의 마스터 크래프트 무구를 단조한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "불칸의 장인 정신이 깃든 걸작 무구가 탄생했다! 전장에서 단 한 번도 오작동하지 않을 완벽한 동반자다.",
          stats: { Int: 6, T: 5, WS: 5, BS: 4 },
          addTags: ["promethean_smith"]
        },
        fail: {
          text: "담금질 온도가 어긋나 칼날에 미세한 금이 갔으나, 불완전함을 다듬는 과정 자체가 프로메테우스 교단의 수행이다.",
          stats: { Int: 3, T: 4 }
        }
      },
      {
        label: "무너진 마을 방벽과 수로를 복구하며 녹턴 아이들에게 인류를 지키는 이유를 들려준다",
        effect: {
          text: "초인이면서도 인간성을 잃지 않은 샐러맨더의 따뜻한 유대가 영혼의 상처를 어루만졌다.",
          stats: { Fel: 7, WP: 5 },
          wounds: 15,
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Salamanders / Codex: Salamanders"
  },
  {
    id: "ev_chap2_black_templars",
    title: "블랙 템플러 — 영원한 성전 함대와 네오파이트 도제 서약",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["black_templars"] },
    reqLabel: "챕터: 블랙 템플러",
    weight: 28,
    text: "블랙 템플러에는 코덱스식 스카웃 중대가 없다. 대신 정식 이니시에이트가 신참 네오파이트 한 명을 직접 제자로 거두어 전장의 불길 속에서 가르친다. 성전선 '이터널 크루세이더' 예배당에서 패기 넘치는 소년 네오파이트가 그대 앞에 무릎 꿇고 쇠사슬을 바친다.",
    choices: [
      {
        label: "[백병/교섭 판정] 네오파이트를 직접 제자로 받아들여 최전선 돌격에서 검술과 신앙을 전수한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'자비도, 후회도, 두려움도 없다!' 스승과 제자가 함께 쇠사슬로 무기를 묶고 적진을 뚫었다! 훗날 훌륭한 검 형제로 성장할 인재를 길러 냈다.",
          stats: { WS: 6, Fel: 5, WP: 5, Inf: 5 },
          faith: 12
        },
        fail: {
          text: "너무 앞서 나간 제자를 감싸다 적의 체인액스에 어깨를 베였으나, 두 사람 모두 살아남아 교훈을 새겼다.",
          wounds: -18,
          stats: { WP: 5 },
          faith: 8
        }
      },
      {
        label: "채플린과 함께 성전 함대 전 장병 앞에서 '불경한 자를 혐오하라'는 철야 서약을 낭송한다",
        effect: {
          text: "천 명 넘는 흑갑 기사들의 함성이 성전함 선체를 울렸다. 어떠한 워프의 유혹도 뚫지 못할 광신이 깃들었다.",
          stats: { WP: 6, T: 3 },
          faith: 16,
          corruption: -10
        }
      }
    ],
    source: "Lexicanum: Black Templars / Codex: Black Templars"
  },
  {
    id: "ev_chap2_raven_guard",
    title: "레이븐 가드 — 칠흑 눈동자의 저주 '세이블 브랜드(Sable Brand)'",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["raven_guard"] },
    reqLabel: "챕터: 레이븐 가드",
    weight: 28,
    text: "거울 속 자신의 눈동자가 완전한 칠흑으로 물들며 말수가 줄어들고 죽음만을 갈망하는 유전적 우울, '세이블 브랜드'의 전조가 찾아왔다! 이 저주에 사로잡힌 레이븐 가드 전사는 침묵의 암살 부대 '모리타트(Moritat)'가 되어 홀로 죽음을 찾아 적진으로 뛰어든다.",
    choices: [
      {
        label: "[의지 판정] 코르부스 코락스의 가르침을 되새기며 어둠의 충동을 차가운 집중력으로 제어한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "죽음의 유혹을 정면으로 이겨 내고 그림자보다 고요한 암살자의 경지에 도달했다!",
          stats: { WP: 7, Ag: 6, BS: 4 },
          addTags: ["shadow_master"]
        },
        fail: {
          text: "한동안 동료들과 단 한마디도 나누지 못한 채 그림자 속에 틀어박혀 홀로 고통을 삭여야 했다.",
          stats: { Fel: -4, Ag: 4, WP: 3 }
        }
      },
      {
        label: "[민첩 판정] 어차피 타오르는 죽음의 갈망이라면 적 폭군 지휘부 한복판에 쏟아붓는다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "쌍권총과 라이트닝 클로가 어둠을 가르고 적 사령관 셋을 단신으로 베어 냈다! 피로써 세이블 브랜드의 열병을 식혔다.",
          stats: { Ag: 7, WS: 6, BS: 5 },
          wounds: -12
        },
        fail: {
          text: "무모한 단독 돌입 끝에 중상을 입고 섀도우 캡틴의 구조로 간신히 철수했다.",
          wounds: -24,
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: Sable Brand / Codex: Raven Guard"
  },
  {
    id: "ev_chap2_white_scars",
    title: "화이트 스카 — 초고리스 콴 저우(Quan Zhou)의 매 사냥 의식",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes"], anyChapters: ["white_scars"] },
    reqLabel: "챕터: 화이트 스카",
    weight: 28,
    text: "구름 위의 요새 수도원 '콴 저우' 첨탑 아래 광활한 초고리스 초원이 펼쳐져 있다. 스톰시어가 그대에게 사나운 초원 검독수리(버크트)를 건네며 말한다. '묶어 두면 매는 날개를 잃고, 놓아주면 바람을 타고 돌아온다. 칸의 아들들이 싸우는 이치도 이와 같느니라.'",
    choices: [
      {
        label: "[민첩/교섭 판정] 바이크를 몰아 초원을 질주하며 하늘의 사냥매와 호흡을 맞춰 거대 야수를 추적한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "바람과 매, 그리고 전사가 하나가 되었다! 전장 전체를 조감하는 화이트 스카 고유의 사냥 본능이 완성되었다.",
          stats: { Ag: 7, Int: 5, Fel: 5 },
          addTags: ["khan_rider"]
        },
        fail: {
          text: "사나운 매의 발톱에 장갑이 찢겼으나, 호탕하게 웃으며 다시 고삐를 잡았다.",
          wounds: -8,
          stats: { Ag: 4, WP: 3 }
        }
      },
      {
        label: "초원의 바람 속에서 전쟁과 자유를 노래하는 서예 족자를 써 내려가며 마음을 가다듬는다",
        effect: {
          text: "격렬한 돌격과 고요한 시심의 조화. 자가타이 칸이 가르친 진정한 자유인의 정신이 깃들었다.",
          stats: { WP: 5, Int: 5, Fel: 5 }
        }
      }
    ],
    source: "Lexicanum: Quan Zhou / Codex: White Scars"
  },

  // =========================================================================
  // 7. 계급별 심화 고유 이벤트 10종 (신참 → 중간 간부 → 최고위 지휘관!)
  // =========================================================================
  {
    id: "ev_rank_scout_black_carapace",
    title: "네오파이트 최종 관문 — 검은 갑각(Black Carapace) 이식 전 실전",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["astartes_scout"] },
    reqLabel: "계급: 아스타르테스 네오파이트",
    weight: 30,
    text: "스카웃 중대장이 그대를 호출했다. '18개 초인 장기가 자리 잡았으나, 파워 아머와 신경을 잇는 마지막 19번째 장기 — 검은 갑각은 살아 돌아온 자에게만 허락된다. 적 오크 워보스의 전초기지 좌표를 직접 확보해 오라.'",
    choices: [
      {
        label: "[민첩 판정] 카멜레올린 망토에 의지해 적진 한복판까지 잠입하여 정밀 타격 비콘을 설치한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "궤도 포격이 정확히 적 전초기지를 증발시켰다! 아포세카리가 그대에게 검은 갑각 이식 대기자 명단 최상단을 부여했다.",
          stats: { Ag: 6, BS: 5, WP: 5, Inf: 5 }
        },
        fail: {
          text: "오크 스퀴그 사냥개에게 발각되어 피투성이 백병전 끝에 겨우 좌표만 송신하고 복귀했다.",
          wounds: -20,
          stats: { WS: 5, T: 4 }
        }
      },
      {
        label: "[사격 판정] 고지대 폐허에서 스나이퍼 볼터로 적 통신병과 장교들을 차례로 저격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "단 한 발의 빗나감도 없는 저격으로 적 지휘망을 마비시켰다! 정식 배틀 브라더 승급이 눈앞에 다가왔다.",
          stats: { BS: 7, Int: 4, WP: 4 }
        },
        fail: {
          text: "적 박격포 반격에 엄폐물이 무너져 부상을 입었으나 끝까지 임무 데이터를 지켜 냈다.",
          wounds: -18,
          stats: { T: 3 }
        }
      }
    ],
    source: "Lexicanum: Black Carapace / Codex: Space Marines"
  },
  {
    id: "ev_rank_brother_sergeant_pick",
    title: "배틀 브라더 — 쓰러진 베테랑 하사와 분대의 명예",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["astartes_brother"] },
    reqLabel: "계급: 아스타르테스 배틀 브라더",
    weight: 28,
    text: "적 카오스 하복 분대의 집중 사격에 100년간 분대를 이끌어 온 베테랑 하사가 치명상을 입고 쓰러졌다. 중대 통신은 두절되었고, 남은 형제 여덟 명의 시선이 일제히 그대를 향한다. 누군가 하사의 체인소드를 이어받아 분대를 지휘해야 한다!",
    choices: [
      {
        label: "[의지/교섭 판정] 하사의 지휘 표식을 이어받고 완벽한 측면 교차 돌격을 호령한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 명의 추가 전사자 없이 적 중화기 진지를 붕괴시켰다! 전투 후 중대장이 그대를 정식 분대장(서전트)으로 승격시켰다.",
          stats: { WP: 6, Fel: 6, WS: 5, Inf: 8 }
        },
        fail: {
          text: "돌격 타이밍이 어긋나 큰 피해를 입었으나, 쓰러진 하사의 진시드만은 끝까지 회수해 돌아왔다.",
          wounds: -22,
          stats: { WP: 4, Inf: 2 }
        }
      },
      {
        label: "[백병 판정] 말보다 몸이 앞선다. 직접 선봉에 서서 적 화망을 끌어안고 형제들의 길을 연다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "파워 아머에 수십 발의 탄흔을 새기며 적진을 뚫었다! 살아남은 형제들이 그대의 용맹을 챕터 연대기에 기록했다.",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "라스캐논 직격을 스쳐 중상을 입었으나 형제들의 엄호로 구출되었다.",
          wounds: -26,
          stats: { T: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Deathwatch Core"
  },
  {
    id: "ev_rank_captain_chapter_master",
    title: "아스타르테스 중대장 — 성전 함대 총사령관 대행의 무게",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["astartes_captain"] },
    reqLabel: "계급: 아스타르테스 중대장(캡틴)",
    weight: 28,
    text: "성계 탈환전 도중 챕터 마스터가 대악마의 일격에 중상을 입고 아포세카리움으로 후송되었다! 3개 중대 300명의 아스타르테스와 제국 해군 호위 함대, 아스트라 밀리타룸 10개 연대의 지휘권이 임시로 중대장인 그대의 어깨에 떨어졌다.",
    choices: [
      {
        label: "[지성/권위 판정] 궤도 강습과 지면 기갑 공세를 초 단위로 맞물린 대반격 작전을 총지휘한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "압도적인 전술 지휘로 반역 성계 전체를 14일 만에 해방했다! 차기 챕터 마스터 유력 후보로 제국 전역에 이름이 드높아졌다.",
          stats: { Int: 7, Fel: 6, Inf: 12, WP: 5 }
        },
        fail: {
          text: "아스트라 밀리타룸과 해군 간 협조가 어긋나 뼈아픈 소모전 끝에 겨우 승리를 거뒀다.",
          wounds: -18,
          stats: { WP: 4, Inf: 3 }
        }
      },
      {
        label: "[백병 판정] 제1중대 베테랑들과 함께 드롭 포드로 적 사령함에 직접 강습해 전쟁을 단칼에 끝낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "적 카오스 군주의 머리를 베어 함교에 내걸었다! 전 함대가 그대의 이름을 외치며 승리를 선포했다!",
          stats: { WS: 8, WP: 6, Inf: 10 },
          wounds: -14
        },
        fail: {
          text: "적 터미네이터 친위대의 반격에 중상을 입고 텔레포트로 긴급 철수했으나 적 기함은 무력화했다.",
          wounds: -28,
          stats: { WS: 4, T: 4 }
        }
      }
    ],
    source: "Codex: Space Marines"
  },
  {
    id: "ev_rank_officer_court_martial",
    title: "야전 장교 — 무능한 귀족 연대장의 자살 돌격 명령",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["militarum_officer"] },
    reqLabel: "계급: 아스트라 밀리타룸 장교",
    weight: 28,
    text: "후방에서 포도주나 마시던 귀족 출신 사단장이 '내일 새벽 포병 지원 없이 지뢰밭 정면으로 총검 돌격하라'는 미친 명령을 하달했다. 그대로 따르면 휘하 장병 4,000명이 10분 만에 갈려 나가고, 거역하면 군법회의와 커미사르의 총구가 기다린다!",
    choices: [
      {
        label: "[교섭/권위 판정] 연대 커미사르에게 냉정한 전술 손실 데이터를 제시해 합법적인 작전 수정권을 얻어 낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "합리적인 커미사르가 그대의 야간 우회 포격안에 서명했다! 4,000명의 목숨을 구하고 적 고지까지 완벽히 점령했다!",
          stats: { Fel: 7, Int: 6, Inf: 8 }
        },
        fail: {
          text: "귀족 사단장의 노여움을 사 징계 기록이 남았으나, 그래도 최소한의 연막탄 지원만은 받아 냈다.",
          stats: { Inf: -5, WP: 4 }
        }
      },
      {
        label: "명령은 절대다. 병사들 맨 앞에 서서 직접 파워 소드를 뽑아 들고 지뢰밭 돌파를 선도한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "처참한 피해 속에서도 장교가 선두에서 쓰러지지 않자 병사들이 악귀처럼 돌격해 기어이 참호를 탈환했다!",
          stats: { WP: 7, WS: 5, Inf: 6 },
          wounds: -22
        },
        fail: {
          text: "지뢰 파편을 맞고 야전 병원으로 실려 갔다. 부대는 절반을 잃고 후퇴했다.",
          wounds: -30,
          stats: { T: 3 }
        }
      }
    ],
    source: "Only War Core / Gaunt's Ghosts"
  },
  {
    id: "ev_rank_commissar_friendly_fire",
    title: "커미사르 — '후방 오발 사고'의 소문과 가드맨들의 시선",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["commissar"] },
    reqLabel: "계급: 제국 커미사르",
    weight: 28,
    text: "새로 배속된 카타찬·하이브 혼성 연대. 전임 커미사르는 너무 가혹하게 병사들을 즉결 처형하다가 야간 전투 중 '원인 불명의 아군 오발 사고'로 전사했다고 한다. 막사 천막 뒤편에서 병사들이 날 선 눈초리로 새 커미사르인 그대를 지켜보고 있다.",
    choices: [
      {
        label: "[교섭 판정] 불필요한 공포 대신 보급 비리를 척결하고 최전선에서 병사들과 같은 식량을 나눈다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "건트와 케인의 방식이 통했다! 부패한 병참 장교를 즉결 처분하자 병사들이 환호하며 그대를 '우리 커미사르'로 인정했다.",
          stats: { Fel: 7, WP: 5, Inf: 6 }
        },
        fail: {
          text: "유약한 커미사르로 오해받아 군기가 해이해질 뻔했으나, 야간 전투에서 직접 적을 베어 신뢰를 되찾았다.",
          stats: { WS: 4, WP: 3 }
        }
      },
      {
        label: "[의지/백병 판정] 반항적인 고참 병사와 정면으로 마주 서서 흔들림 없는 카리스마로 군기를 바로잡는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 발의 처형도 없이 압도적인 위엄과 실력으로 연대 전체의 존경과 복종을 끌어냈다!",
          stats: { WP: 7, WS: 5, Inf: 6 }
        },
        fail: {
          text: "다음 날 야간 순찰 중 어둠 속에서 날아온 '유탄'에 팔을 스쳤다. 이 연대에서는 등을 절대 보이지 말아야 한다.",
          wounds: -18,
          stats: { Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: Commissar / Catachan Jungle Fighters Lore"
  },
  {
    id: "ev_rank_lord_commissar_duel",
    title: "로드 커미사르 — 무너지는 전선 앞 카오스 챔피언 일기토",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["lord_commissar"] },
    reqLabel: "계급: 로드 커미사르",
    weight: 28,
    text: "전구 방어선의 최후 보루가 무너지기 일보 직전, 거대한 카오스 마린 챔피언이 피 묻은 파워 액스를 들고 참호 위로 뛰어내렸다! 가드맨 수천 명이 공포에 질려 뒷걸음질치는 순간, 로드 커미사르인 그대가 붉은 휘장을 휘날리며 앞을 가로막는다.",
    choices: [
      {
        label: "[백병 판정] 파워 피스트와 볼트 피스톨을 쥐고 필멸자의 몸으로 카오스 챔피언과 정면 일기토를 벌인다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "기적적인 틈을 찔러 볼트탄을 챔피언의 투구 렌즈에 박아 넣었다! 수천 가드맨의 함성과 함께 무너지던 전선이 역공으로 뒤집혔다!",
          stats: { WS: 7, WP: 8, Inf: 12 },
          faith: 15,
          wounds: -14
        },
        fail: {
          text: "거인의 일격에 갈비뼈가 부러지며 날아갔으나, 쓰러지며 던진 멜타 폭탄이 적을 날려 버리며 전선을 지켜 냈다!",
          wounds: -30,
          stats: { WP: 6, Inf: 6 }
        }
      },
      {
        label: "[교섭/사격 판정] '제1열 사격! 제2열 착검!' 일사불란한 집중 일제 사격으로 거인을 벌집으로 만든다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "로드 커미사르의 우레 같은 호령 아래 수백 정의 라스건과 플라즈마 건이 동시에 불을 뿜어 카오스 챔피언을 증발시켰다!",
          stats: { Fel: 7, BS: 5, Inf: 8 }
        },
        fail: {
          text: "사격이 흩어져 상당한 피해를 입었으나 끝내 대전차포 지원으로 적을 쓰러뜨렸다.",
          wounds: -16,
          stats: { WP: 4 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Sebastian Yarrick Lore"
  },
  {
    id: "ev_rank_sororitas_repentia",
    title: "아뎁타 소로리타스 — 시스터 레펜티아(참회 수녀)의 돌격",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["adepta_sororitas"] },
    reqLabel: "계급: 아뎁타 소로리타스",
    weight: 28,
    text: "신앙의 과오를 씻기 위해 갑주조차 벗고 거대한 양손 체인소드 '에비스서레이터'만 든 시스터 레펜티아(참회 수녀) 부대가 적 카오스 중전차 방어선을 향해 찬송가를 부르며 돌격하고 있다! 이대로면 전멸하지만, 그녀들의 길을 열어 주면 성전 전체가 돌파구를 얻는다.",
    choices: [
      {
        label: "[사격 판정] 볼터와 멜타 화력으로 적 기관총 둥지를 먼저 분쇄해 참회 수녀들의 돌격로를 연다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "완벽한 엄호 사격 속에 참회 수녀들이 적 중전차 세 대를 두 동강 냈다! 수많은 자매가 속죄를 이루고 살아남았다.",
          stats: { BS: 6, WP: 5, Fel: 5 },
          faith: 12
        },
        fail: {
          text: "적 중화기 반격에 파워 아머가 뚫려 부상을 입었으나, 끝까지 자매들의 측면을 지켜 냈다.",
          wounds: -20,
          faith: 8
        }
      },
      {
        label: "신앙의 기적을 기원하며 황제의 성가를 소리 높여 부르며 레펜티아 대열 바로 뒤를 따른다",
        effect: {
          text: "광신적인 성가가 전장을 울리며 공포에 떨던 아군 전체의 사기를 되살렸다.",
          stats: { WP: 5, WS: 4 },
          faith: 14,
          corruption: -8
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_rank_canoness_synod",
    title: "캐노네스 — 콘벤트 상크토룸 회의와 신앙의 성전(War of Faith)",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["canoness"] },
    reqLabel: "계급: 캐노네스(수녀원장)",
    weight: 28,
    text: "오펠리아 VII의 콘벤트 상크토룸 대성당 회의. 부패한 추기경 파벌이 개인 영지를 넓히기 위해 아뎁타 소로리타스의 출병을 강요하고 있다. 수녀원장인 그대에게는 추기경의 정치 놀음에 맞서 진정한 황제의 뜻을 가려낼 영적 권위가 있다.",
    choices: [
      {
        label: "[의지/교섭 판정] 시노드 미니스트라 앞에서 추기경의 탐욕을 공개 탄핵하고 진정한 구원 성전을 선포한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "수백 명의 전투 수녀가 일제히 볼터를 들어 올리며 그대의 편에 섰다! 타락한 추기경이 실각하고 진정한 '신앙의 성전'이 열렸다!",
          stats: { WP: 7, Fel: 7, Inf: 12 },
          faith: 16
        },
        fail: {
          text: "국교 원로들의 정치적 견제로 징계 심문을 받았으나, 수녀회 내부의 절대적 신망만은 지켜 냈다.",
          stats: { Inf: -4, WP: 5 },
          faith: 8
        }
      },
      {
        label: "정치 논쟁 대신 가장 절박한 변경 성지 행성으로 독자적인 구원 원정대를 출정시킨다",
        effect: {
          text: "행동으로 신앙을 증명했다. 수많은 성당과 순례자들이 그대의 이름을 성인전에 비견하며 칭송했다.",
          stats: { WS: 4, WP: 6, Inf: 7 },
          faith: 12
        }
      }
    ],
    source: "Lexicanum: Convent Sanctorum / Codex: Adepta Sororitas"
  },
  {
    id: "ev_rank_inquisitor_conclave",
    title: "이단심문관 — 성역 비밀 회의(Conclave)와 급진파 탄핵 표결",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["inquisitor"] },
    reqLabel: "계급: 제국 이단심문관(인퀴지터)",
    weight: 28,
    text: "성역 이단심문관 12명이 모인 극비 콘클라베(회의). 같은 오르도 소속 선배 이단심문관이 악마 무기를 사용해 카오스 침공을 막아 낸 사건을 두고 '이단 선고(익스커뮤니케이트 트레이터리스)' 찬반 표결이 6 대 5로 팽팽하다. 마지막 한 표가 그대의 손에 달렸다!",
    choices: [
      {
        label: "[의지 판정] 청교도파의 이름으로 '카오스의 도구는 결국 주인을 삼킨다'며 단호히 탄핵에 표를 던진다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "청교도파 다수의 지지를 얻어 성역 내 오염된 급진파 인맥을 일소했다! 오르도 내 권위와 순결함이 드높아졌다.",
          stats: { WP: 7, Inf: 9 },
          faith: 12,
          corruption: -10
        },
        fail: {
          text: "표결 후 급진파 자객의 암살 시도를 가까스로 막아 냈다. 이단심문소 내부 전쟁은 언제나 그림자 속에서 벌어진다.",
          wounds: -18,
          stats: { WS: 4, Inf: 4 }
        }
      },
      {
        label: "[지성 판정] 현실적 급진파의 입장에서 '인류를 구한 공적과 금단의 지식을 회수·통제하자'고 중재한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "탄핵 대신 비밀 봉인 및 감시 조건으로 타협안을 이끌어 내고, 막강한 급진파 정보망의 빚을 받아 냈다!",
          stats: { Int: 7, Inf: 10, Fel: 5 },
          corruption: 6
        },
        fail: {
          text: "청교도파 원로들이 그대마저 의심의 눈초리로 기록부에 올렸다.",
          stats: { Inf: -5, Int: 3 },
          corruption: 5
        }
      }
    ],
    source: "Dark Heresy / Eisenhorn & Ravenor Lore"
  },
  {
    id: "ev_rank_archmagos_ark",
    title: "마고스 · 아크마고스 — 아크 메카니쿠스 탐사선의 미지 성계 강행군",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["archmagos"] },
    reqLabel: "계급: 마고스·아크마고스",
    weight: 28,
    text: "그대가 지휘하는 대륙급 탐사 모함 '아크 메카니쿠스'의 장거리 점술기가 헤일로 스타 변경에서 완전한 암흑기 기술(DAoT) 발신 신호를 포착했다! 단, 신호 근원지는 네크론 툼 월드와 워프 암초 한가운데다.",
    choices: [
      {
        label: "[지성 판정] 고대 누스피어 암호 프로토콜을 동원해 네크론 방어망을 교란하고 유물을 원격 회수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "손상되지 않은 고대 STC 공업 설계 단편을 손에 넣었다! 화성 대의회가 그대의 이름으로 새 포지 신전을 헌정했다!",
          stats: { Int: 9, Inf: 12 },
          addTags: ["stc_finder"]
        },
        fail: {
          text: "네크론 가우스 포화에 함선 외곽이 크게 파손되어 스키타리 2개 대대를 잃고 철수했다.",
          wounds: -20,
          stats: { Int: 4 }
        }
      },
      {
        label: "위험 부담을 계산해 좌표만 암호화 봉인한 채 안정적인 성계 광물 채굴과 함대 보강을 우선한다",
        effect: {
          text: "옴니시아의 논리에 따른 합리적 결정이었다. 탐사 함대의 전력과 재정이 크게 불어났다.",
          stats: { Int: 4, Inf: 7, T: 4 }
        }
      }
    ],
    source: "Forges of Mars Trilogy / Codex: Adeptus Mechanicus"
  },

  // =========================================================================
  // 8. 추가 시기 × 장소 전용 이벤트 8종 (아이젠혼 시대·마카리우스·브락스·헬스리치·바스티오르 등!)
  // =========================================================================
  {
    id: "ev_era_scarus_xenos",
    title: "스카루스 섹터 격동기 — 외계 종족 사루티(Saruthi) 유물 밀수망",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 225,
      maxYear: 520,
      excludeTags: ["heretic", "chaos_aligned"]
    },
    reqLabel: "225~520.M41 · 아이젠혼 시대",
    weight: 30,
    text: "M41 초중반, 스카루스 섹터 전역에서 기하학적으로 뒤틀린 정체불명의 외계 유물과 금지된 서적 '네크로테크(Necroteuch)' 관련 밀수 소문이 퍼지고 있다! 오르도 제노스 요원들이 항구마다 비밀 검문을 강화하는 중이다.",
    choices: [
      {
        label: "[지성 판정] 수상한 골동품 상인의 거래 장부를 추적해 오르도 제노스 지부에 제보한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "사루티 외계 밀수 조직의 거점을 일망타진하는 데 결정적 단서를 제공했다! 이단심문소의 두터운 신임을 얻었다.",
          stats: { Int: 6, Inf: 7, WP: 4 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "밀수단 청부업자의 습격을 받아 부상을 입었으나, 제보 서류만은 무사히 치안대에 넘겼다.",
          wounds: -16,
          stats: { Int: 3 }
        }
      },
      {
        label: "위험한 외계 유물 소문에서 철저히 거리를 두고 일상과 치안 수칙에 충실한다",
        effect: {
          text: "호기심은 이단의 첫걸음이다. 스카루스 섹터의 대숙청 폭풍을 무사히 비껴갔다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Eisenhorn: Xenos / Lexicanum: Saruthi"
  },
  {
    id: "ev_era_macharian_echo",
    title: "마카리우스 대성전과 이단 내전의 메아리",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 392,
      maxYear: 465
    },
    reqLabel: "392~465.M41 · 마카리우스 성전 및 내전기",
    weight: 30,
    text: "전설적인 로드 솔라 마카리우스가 단 7년 만에 1,000여 행성을 정복한 위대한 대성전이 막을 내린 뒤, 그의 후계 장군들이 패권을 다투며 70년에 걸친 참혹한 '마카리우스 이단 내전'의 불길이 은하 서부와 보급로에 번지고 있다!",
    choices: [
      {
        label: "[의지/사격 판정] 테라 중앙 충성파 수비대에 합류해 군벌들의 십일조 약탈을 저지한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "혼란한 군벌 내전 속에서도 제국 충성파의 보급선을 지켜 내며 훈장과 공적을 인정받았다!",
          stats: { BS: 5, WP: 5, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "반란 장군 휘하 용병대의 포격에 부상을 입었으나 끝내 진지를 사수했다.",
          wounds: -18,
          stats: { T: 3 }
        }
      },
      {
        label: "마카리우스의 전설적인 기동 전술 기록서를 탐독하며 지역 방위 태세를 다진다",
        effect: {
          text: "인류제국 역사상 가장 위대한 필멸자 명장의 교훈을 가슴에 새겼다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Macharian Crusade / Macharian Heresy"
  },
  {
    id: "ev_era_vraks_gas",
    title: "브락스 공성전기 — 17년 참호전의 보급 징발과 독가스 경보",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 813,
      maxYear: 830,
      or: [{ anyWorlds: ["krieg"] }, { anySegmenta: ["obscurus", "tempestus"] }]
    },
    reqLabel: "813~830.M41 · 크리그 / 옵스쿠루스·템페스투스",
    weight: 28,
    text: "무기고 행성 브락스의 17년 참호전이 너글의 역병 독가스와 카오스 타이탄까지 얽힌 지옥으로 번지면서, 주변 성역과 크리그 전역에 끝없는 병력·포탄·방독면 추가 징발령이 떨어졌다!",
    choices: [
      {
        label: "[강인 판정] 화학 방호복을 입고 전선 보급 및 오염 제독 작업에 뛰어든다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "끔찍한 독성 분진 속에서도 보급 라인을 지켜 내며 브락스 공성전 공로 표창을 받았다!",
          stats: { T: 6, WP: 5, Inf: 5 },
          addTags: ["vraks_veteran"]
        },
        fail: {
          text: "방독면 필터가 파손되어 화학 화상을 입고 야전 의무실에 실려 갔다.",
          wounds: -18,
          stats: { T: 3 }
        }
      },
      {
        label: "전시 배급 수칙을 엄수하며 지역 방어선과 탄약 생산 할당량을 묵묵히 완수한다",
        effect: {
          text: "포탄 한 발이 참호의 생사를 가르는 시절이었다. 지독한 과로 끝에 임무를 마쳤다.",
          stats: { T: 3, Int: 3, Inf: 3 }
        }
      }
    ],
    source: "Imperial Armour Vol. 5-7: The Siege of Vraks"
  },
  {
    id: "ev_era_armageddon_helsreach",
    title: "제3차 아마겟돈 전쟁 — 헬스리치 부두의 최후 방어선",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 998,
      maxYear: 999,
      anyWorlds: ["armageddon"]
    },
    reqLabel: "998~999.M41 · 아마겟돈",
    weight: 34,
    text: "아마겟돈의 생명줄인 거대 항만 도시 '헬스리치' 부두에 수십만 오크 대군이 밀려들었다! 블랙 템플러와 강철 군단, 심지어 민간 부두 노동자 민병대까지 용접기와 샷건을 들고 불타는 성당 앞 최후의 바리케이드를 세우고 있다.",
    choices: [
      {
        label: "[백병/사격 판정] 부두 민병대와 스틸 리전 곁에서 오크 가간트의 발밑까지 맞서 싸운다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "인페르누스급 타이탄 '스톰헤럴드'의 포효와 함께 오크 선봉을 꺾어 놓았다! 헬스리치는 무너지지 않았다!",
          stats: { BS: 6, WP: 7, Inf: 7 },
          faith: 12,
          addTags: ["armageddon_3_vet"]
        },
        fail: {
          text: "무너진 성당 잔해에 깔려 중상을 입었으나, 끝까지 총을 놓지 않은 채 구원군을 맞이했다.",
          wounds: -24,
          stats: { WP: 5 },
          addTags: ["armageddon_3_vet"]
        }
      },
      {
        label: "화염에 휩싸인 헬스리치 지하 병원에서 부상병과 탄약 수송선을 지켜 낸다",
        effect: {
          text: "그을린 잿더미 속에서 끝내 수백 명의 전우와 시민을 살려 냈다.",
          stats: { T: 4, Fel: 5, WP: 4 },
          addTags: ["armageddon_3_vet"]
        }
      }
    ],
    source: "Helsreach / Third War for Armageddon"
  },
  {
    id: "ev_era_baal_red_thirst",
    title: "바알의 파괴 전야 — 아르크스 안젤리쿰의 후계 챕터 대집결",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 12,
      minYear: 998,
      maxYear: 1000,
      anyWorlds: ["baal"]
    },
    reqLabel: "998~1000.M41 · 바알",
    weight: 32,
    text: "하이브 함대 레비아탄의 그림자가 바알 성계를 덮기 직전, 생귀니우스의 피를 이은 30여 개 블러드 엔젤 후계 챕터 — 플레시 티어러, 엔젤스 버밀리온, 라멘터의 남은 전사들까지 — 가 모두 바알의 붉은 하늘 아래 집결했다!",
    choices: [
      {
        label: "[의지 판정] 붉은 천사들의 거대한 요새 방어선 구축과 탄약 운반에 전력을 바친다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "수만 명의 아스타르테스가 한곳에 모인 경이로운 광경 속에서 공포를 떨치고 성채 방어의 핵심 인원이 되었다!",
          stats: { WP: 6, T: 5, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "살인적인 방사능 폭풍과 과로로 쓰러졌으나, 생귀너리 의무대의 처치로 전선에 복귀했다.",
          wounds: -14,
          stats: { T: 4 }
        }
      },
      {
        label: "바알 유목민 부족들을 지하 방사능 방공호로 인도하고 식수를 비축한다",
        effect: {
          text: "곧 다가올 대재앙 속에서도 생귀니우스의 고향 백성들이 살아남을 씨앗을 지켜 냈다.",
          stats: { T: 4, Fel: 5 }
        }
      }
    ],
    source: "The Devastation of Baal"
  },
  {
    id: "ev_era_vigilus_nachmund",
    title: "나흐문드 회랑 봉쇄 위기 — 암흑 제국으로 통하는 바늘구멍",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 1006,
      maxYear: 1014,
      anySegmenta: ["obscurus"]
    },
    reqLabel: "006~014.M42 · 세그멘툼 옵스쿠루스",
    weight: 28,
    text: "임페리움 상크투스와 암흑의 니힐루스를 잇는 거의 유일한 안정 워프 통로 '나흐문드 회랑'에 블랙 리전과 해적 함대가 몰려들며 성역 전체의 항로가 마비 직전이다! 구원 물자를 실은 호송 선단이 긴급 호위와 항법 지원을 요청한다.",
    choices: [
      {
        label: "[사격/지성 판정] 나흐문드 회랑 호송 선단 방어 작전에 참여해 암흑 제국행 보급로를 뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "카오스 약탈선의 기습을 격퇴하고 수송선을 통과시켰다! 니힐루스 전선 사령부가 깊은 감사를 표했다.",
          stats: { BS: 5, Int: 4, Inf: 7 },
          addTags: ["vigilus_veteran"]
        },
        fail: {
          text: "워프 암초와 적 포화에 선단이 큰 타격을 입으며 부상을 입었으나 핵심 화물만은 지켜 냈다.",
          wounds: -18,
          stats: { WP: 4 }
        }
      },
      {
        label: "관문 정거장의 항법 신호등 정비와 피난선 수용 업무에 집중한다",
        effect: {
          text: "극심한 혼란 속에서도 수많은 제국 함선이 길을 잃지 않도록 등불을 지켜 냈다.",
          stats: { Int: 4, Fel: 4, Inf: 4 }
        }
      }
    ],
    source: "War Zone Nachmund / Imperium Nihilus: Vigilus Defiant"
  },
  {
    id: "ev_era_psychic_witchhunt",
    title: "사이킥 각성기 — 거리의 돌발 발현과 마녀사냥 광풍",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 1010,
      maxYear: 1020
    },
    reqLabel: "010~020.M42 · 사이킥 각성기 전 제국",
    weight: 28,
    text: "대균열 이후 인류 종 전체에서 사이커 발현율이 폭증하면서, 시장 한복판에서 어린 소녀의 손끝에 푸른 워프 불꽃이 튀어 올랐다! 공포에 질린 군중이 쇠파이프를 들고 몰려들며 폭동 직전의 마녀사냥이 벌어지고 있다.",
    choices: [
      {
        label: "[의지/권위 판정] 폭도를 진정시키고 규정대로 아뎁투스 아스트라 텔레파티카 검은 함선 인계 절차에 넘긴다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "소녀가 공포로 폭주해 악마를 소환하기 전에 침착하게 제압·인계했다! 구역 전체를 워프 재앙에서 구해 냈다.",
          stats: { WP: 6, Inf: 6, Fel: 4 },
          faith: 6
        },
        fail: {
          text: "순간적인 사이킥 충격파에 튕겨 나가 타박상을 입었으나, 곧 출동한 아르비테스가 상황을 정리했다.",
          wounds: -16,
          corruption: 4
        }
      },
      {
        label: "[사이커 전용] 워프 공명으로 소녀의 폭주하는 정신을 진정시켜 안전한 통제 상태로 이끈다",
        req: { allTags: ["psyker"] },
        effect: {
          text: "같은 고통을 아는 사이커의 손길이 악마의 속삭임을 차단했다. 아스트로패스 지부가 그대의 숙련도를 높이 샀다.",
          stats: { WP: 7, Int: 5 },
          corruption: -6
        }
      },
      {
        label: "위험천만한 워프 현상에서 재빨리 거리를 두고 아르비테스 진압대에 신고한다",
        effect: {
          text: "제국 시민의 첫 번째 생존 수칙은 미등록 사이커 곁에 서지 않는 것이다. 안전하게 목숨을 지켰다.",
          stats: { Ag: 3, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Psychic Awakening"
  },
  {
    id: "ev_era_tyranic_bastior",
    title: "제4차 타이라니드 전쟁 — 바스티오르(Bastior) 서브섹터의 워프 그림자",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 14,
      minYear: 1025,
      maxYear: 1045,
      anySegmenta: ["pacificus", "solar"]
    },
    reqLabel: "025~045.M42 · 파시피쿠스·솔라 (4차 타이라니드 전쟁)",
    weight: 30,
    text: "서부 은하 바스티오르 서브섹터로부터 거대한 '워프의 그림자(Shadow in the Warp)'가 밀려오며 아스트로패스 통신이 일제히 끊어졌다! 하이브 함대 레비아탄의 서부 대촉수가 테라를 향해 진격하는 가운데, 솔블레이드(Solblade) 긴급 대응 함대가 전 성역에서 병력과 물자를 징집하고 있다.",
    choices: [
      {
        label: "[사격/의지 판정] 솔블레이드 기동 방어선에 합류해 레비아탄 선봉 생체 괴수들과 맞선다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "거대한 노른 에미서리(Norn Emissary)급 생체 괴수의 기습을 막아 내며 테라 방면 최후 방어선을 지켜 냈다!",
          stats: { BS: 6, WP: 6, Inf: 8 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "산성 생체 탄환에 중상을 입고 후송되었으나, 그대가 번 시간 덕에 궤도 포대가 적 모함을 격추했다.",
          wounds: -22,
          stats: { T: 4 },
          addTags: ["tyranic_war_vet"]
        }
      },
      {
        label: "통신이 끊긴 고립 행성들의 방공호 보급과 민간인 대피령 집행을 지휘한다",
        effect: {
          text: "아스트로패스마저 침묵한 공포 속에서 침착하게 피난선을 띄워 수많은 생명을 구했다.",
          stats: { Int: 5, Fel: 5, Inf: 5 }
        }
      }
    ],
    source: "Warhammer 40k 10th Edition Core / Crusade: Tyrannic War"
  },

  // =========================================================================
  // 6. 1단계 서사 보강 — 3대 오르도 · 카오스 4대 신 · 미회수 태그 연작 · 삶의 초점 (27종)
  // =========================================================================
  // 6-1. 이단심문관 3대 오르도 고유 수사 연작 (3종)
  {
    id: "ev_arc_ordo_hereticus",
    title: "오르도 헤레티쿠스 — 주교구 성유물 조작과 배교 추기경의 음모",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor"], allTags: ["ordo_hereticus"] },
    reqLabel: "이단심문관 · 오르도 헤레티쿠스",
    weight: 38,
    text: "관할 성역의 대주교구가 '새로운 황제의 성유물'이라며 대규모 순례세를 거두어들이고 있다. 비밀 첩보에 따르면, 추기경의 지하 예배당에서 금지된 워프 의식과 세금 횡령이 동시에 벌어지고 있다는 증언이 입수되었다.",
    choices: [
      {
        label: "[지성 판정] 아뎁타 소로리타스 전투 수녀 분견대와 함께 대성당 지하 서고를 급습해 이단 장부를 압수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "지하 납골당에서 가짜 성유물과 배교 추기경의 카오스 서약서를 찾아냈다! 오르도 헤레티쿠스 의회가 그대의 단호한 정화를 찬사했다.",
          stats: { Int: 6, WP: 5, Inf: 8 },
          faith: 10
        },
        fail: {
          text: "추기경 측 무장 광신도들의 매복에 휘말려 부상을 입었으나, 결국 성당을 진압하고 잔당을 심문소에 압송했다.",
          wounds: -18,
          stats: { WP: 3, Inf: -2 }
        }
      },
      {
        label: "[교섭 판정] 행성 총독과 시노드 원로들에게 증거를 들이밀어 내전 없이 이단 추기경을 조용히 숙청하게 만든다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "민중의 신앙이 흔들리기 전에 주교구 스스로 배교자를 단죄하도록 압박했다. 한 방울의 내전 피도 흘리지 않고 성역을 정화했다.",
          stats: { Fel: 6, Int: 4, Inf: 9 }
        },
        fail: {
          text: "정치적 흥정 도중 정보가 새어 추기경이 워프 밀수선으로 도주했다. 뒤늦게 추격령을 내렸으나 위신에 흠집이 남았다.",
          wounds: -10,
          stats: { Inf: -4 },
          corruption: 3
        }
      },
      {
        label: "성당 구역 전체를 봉쇄하고 이단심문관 로제트의 권한으로 공개 화형 심판을 집행한다",
        effect: {
          text: "불길과 공포 속에 배교자들은 재가 되었고, 행성 전역에 오르도 헤레티쿠스의 엄혹한 이름이 각인되었다.",
          stats: { Inf: 6, WP: 4, Fel: -3 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Ordo Hereticus / Codex: Imperial Agents"
  },
  {
    id: "ev_arc_ordo_xenos",
    title: "오르도 제노스 — 광산 위성의 진스틸러 교단과 데스워치 소집령",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor"], allTags: ["ordo_xenos"] },
    reqLabel: "이단심문관 · 오르도 제노스",
    weight: 38,
    text: "변방 광산 위성의 노동자 조합이 3대에 걸쳐 '네 팔의 황제'를 숭배하며 외부 감찰관을 살해했다는 보고가 올라왔다. 전형적인 진스틸러 교단의 봉기 직전 징후이며, 방치하면 하이브 함대를 불러들일 재앙이다.",
    choices: [
      {
        label: "[권위 판정] 인근 워치 포트리스에 데스워치 킬 팀 파견을 요청해 패트리아크 둥지를 직접 소탕한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "검은 갑주의 데스워치 베테랑들과 합동 강습을 감행해 지하 패트리아크의 머리를 베어 냈다! 성계 전체를 포식의 위기에서 구해 냈다.",
          stats: { Inf: 8, BS: 5, WS: 4 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "패트리아크의 발톱에 중상을 입었으나 데스워치 킬 팀의 엄호로 둥지를 멜타 폭탄으로 붕괴시키는 데 성공했다.",
          wounds: -20,
          stats: { T: 4, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 위성으로 흘러든 외계 무기 밀수망을 역추적해 배후의 드루카리 해적 접선까지 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "진스틸러 봉기를 부추겨 노예를 낚아채려던 드루카리 약탈선까지 궤도 함포로 격침했다! 오르도 제노스 교과서에 실릴 수사였다.",
          stats: { Int: 8, Ag: 4, Inf: 7 }
        },
        fail: {
          text: "추적 도중 외계 독침 함정에 걸려 부상을 입었으나, 교단 지휘부의 암호 장부는 확보했다.",
          wounds: -16,
          stats: { Int: 3 }
        }
      },
      {
        label: "궤도 함대에 광산 구역 정밀 폭격을 명령해 하이브 함대 유인 신호를 원천 차단한다",
        effect: {
          text: "수십만 명의 광부가 붕괴한 갱도와 함께 묻혔으나, 성역은 외계 포식자의 시선을 피했다. 이것이 오르도 제노스의 냉혹한 계산이다.",
          stats: { Inf: 5, Int: 4, Fel: -4 }
        }
      }
    ],
    source: "Lexicanum: Ordo Xenos / Deathwatch RPG"
  },
  {
    id: "ev_arc_ordo_malleus",
    title: "오르도 말레우스 — 악마숙주 소환 의식과 타이탄의 은빛 전사들",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor"], allTags: ["ordo_malleus"] },
    reqLabel: "이단심문관 · 오르도 말레우스",
    weight: 38,
    text: "고위 귀족 저택 지하에서 워프 균열이 찢어지며 거대한 그레이터 데몬이 현실 우주로 발을 내딛고 있다! 공기 중의 촛불이 거꾸로 타오르고 호위 병사들의 눈에서 피눈물이 흐르기 시작한다.",
    choices: [
      {
        label: "[의지 판정] 그레이 나이트 타격 분대와 공조해 악마의 진명을 영창하며 워프로 추방한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "은빛 네메시스 포스 웨폰과 그대의 성스러운 진명 봉인이 맞물리며 악마가 비명을 지르고 흩어졌다! 악마의 천적으로 이름을 새겼다.",
          stats: { WP: 9, Inf: 8 },
          faith: 10,
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "워프 화염에 심각한 화상과 정신 타격을 입었으나, 그레이 나이트 형제들이 최후의 일격으로 균열을 닫았다.",
          wounds: -24,
          stats: { WP: 4 },
          corruption: 8
        }
      },
      {
        label: "[지성 판정] 급진파 교리에 따라 소환진을 역설계해 악마를 구속하고 카오스 워밴드의 다음 침공 좌표를 뽑아낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금지된 사슬로 악마의 자백을 뜯어낸 뒤 소각했다! 수많은 행성을 구할 기밀을 얻었으나 영혼에 짙은 그림자가 스며들었다.",
          stats: { Int: 9, WP: 4, Inf: 7 },
          corruption: 14
        },
        fail: {
          text: "구속진이 순간 풀리며 악마의 저주가 정신을 할퀴고 지나갔다. 간신히 봉인했으나 끔찍한 오염이 남았다.",
          wounds: -22,
          corruption: 18
        }
      },
      {
        label: "봉쇄 작전 후 악마를 목격한 행성 방위군 전원의 기억 소거와 비밀 격리 명령서에 서명한다",
        effect: {
          text: "공포스러운 진실은 비밀 기록고에 봉인되었고, 목격자들은 침묵 속으로 사라졌다. 오르도 말레우스의 의무는 자비를 허락하지 않는다.",
          stats: { WP: 5, Inf: 5, Fel: -5 },
          faith: -4
        }
      }
    ],
    source: "Lexicanum: Ordo Malleus / Codex: Grey Knights"
  },

  // 6-2. 카오스 4대 신 낙인 후속 연작 (4종)
  {
    id: "ev_arc_mark_khorne",
    title: "코른의 시험 — 해골 옥좌가 요구하는 피의 공물",
    category: "오염",
    once: true,
    req: { allTags: ["mark_khorne"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 코른의 낙인",
    weight: 38,
    text: "피부 아래 새겨진 놋쇠빛 코른의 문양이 쇠붙이처럼 달아오른다. 귓가에서 울리는 전쟁 북소리가 비겁한 계략과 원거리 포격을 경멸하며, 오직 강자의 두개골을 직접 베어 바치라고 포효한다.",
    choices: [
      {
        label: "[백병 판정] 중장갑 적 지휘관에게 정면 일기토를 걸어 피의 신에게 어울리는 두개골을 취한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "'피의 신에게 피를!' 압도적인 일격으로 강적의 목을 베자 끓어오르던 갈증이 잔혹한 환희로 변하며 육신이 더욱 강인해졌다.",
          stats: { WS: 10, T: 6 },
          wounds: -8,
          corruption: 12
        },
        fail: {
          text: "무모한 돌격 끝에 깊은 자상을 입었으나, 분노의 힘으로 기어이 상대를 쓰러뜨리고 살아남았다.",
          wounds: -24,
          stats: { WS: 4 },
          corruption: 8
        }
      },
      {
        label: "[의지 판정] 폭발하려는 살의를 철의 자제력으로 억눌러 전술적 전투 본능으로만 승화시킨다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "광기에 잡아먹히지 않고 코른의 분노를 날카로운 검술의 집중력으로 제어해 냈다. 붉은 안개가 잠시 물러났다.",
          stats: { WP: 6, WS: 5 },
          corruption: -5
        },
        fail: {
          text: "정신력으로 억누르려다 오히려 혈압이 치솟아 발작을 일으키며 이성을 잃고 날뛰었다.",
          wounds: -18,
          stats: { Int: -4 },
          corruption: 14
        }
      },
      {
        label: "감시자를 피해 하층 구역 불법 투기장에서 피의 난투를 벌여 갈증을 달랜다",
        effect: {
          text: "투기장 바닥을 붉게 적신 뒤에야 손의 떨림이 멎었다. 인간성은 한 겹 더 벗겨져 나갔다.",
          stats: { WS: 5, Fel: -4 },
          wounds: -6,
          corruption: 10
        }
      }
    ],
    source: "Lexicanum: Khorne / Black Crusade"
  },
  {
    id: "ev_arc_mark_tzeentch",
    title: "젠취의 미궁 — 아홉 갈래 예언과 변이의 대가",
    category: "오염",
    once: true,
    req: { allTags: ["mark_tzeentch"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 젠취의 낙인",
    weight: 38,
    text: "거울 속 그대의 눈동자가 푸른 워프 불꽃으로 일렁이며 아직 일어나지 않은 아홉 가지 미래를 동시에 비춘다. 변화의 군주는 서로를 배신하도록 짜인 거대한 음모의 실타래를 그대의 손끝에 쥐여 주었다.",
    choices: [
      {
        label: "[지성 판정] 아홉 갈래 음모를 역으로 설계해 행성 행정부와 심문소 추격대가 서로를 물도록 조종한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 한 통의 위조 전보로 정적들이 스스로 파멸하는 장관을 지켜보았다! 젠취의 웃음소리가 머릿속에 메아리쳤다.",
          stats: { Int: 10, Fel: 6, Inf: 6 },
          corruption: 12
        },
        fail: {
          text: "지나치게 꼬인 계략이 부메랑처럼 되돌아와 은신처가 발각되었고, 워프 역류로 육체가 뒤틀렸다.",
          wounds: -18,
          stats: { T: -4 },
          corruption: 16
        }
      },
      {
        label: "[의지 판정] 팔뚝에 돋아나려는 푸른 깃털과 수정 변이를 정신력으로 억제하고 예언의 단서만 취한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "변화의 군주가 숨겨 둔 함정을 간파하고 육체의 붕괴를 가까스로 막아 냈다. 금지된 지혜만 차갑게 가라앉았다.",
          stats: { WP: 8, Int: 5 },
          corruption: -4
        },
        fail: {
          text: "손끝이 기괴하게 변형되는 고통 속에 쓰러졌다. 변화의 군주는 공짜 지식을 주지 않는다.",
          wounds: -16,
          stats: { T: -5 },
          corruption: 14
        }
      },
      {
        label: "운명의 설계자가 내민 은빛 두루마리를 펼치고 다가올 변화에 몸을 맡긴다",
        effect: {
          text: "금지된 문자가 눈동자에 스며들며 남들은 보지 못하는 비밀이 열렸으나, 육신은 서서히 인간과 멀어져 갔다.",
          stats: { Int: 6, WP: 4, T: -4 },
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Tzeentch / Black Crusade"
  },
  {
    id: "ev_arc_mark_nurgle",
    title: "너글의 정원 — 자비로운 역병의 전파",
    category: "오염",
    once: true,
    req: { allTags: ["mark_nurgle"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 너글의 낙인",
    weight: 38,
    text: "상처에서 번진 녹빛 종기가 더 이상 쓰리지 않고 오히려 따뜻한 안도감을 준다. 귓가에 윙윙거리는 파리 떼의 합창이 '고통과 죽음의 공포를 끝내는 할아버지의 선물을 하층 정수조에 나누어 주라'고 다정히 속삭인다.",
    choices: [
      {
        label: "[강인 판정] 하층 하이브 정수조에 부패의 포자를 풀어 '할아버지의 자비'를 퍼뜨리며 기괴한 내구를 얻는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "역병의 꽃이 피어오르며 그대의 육신은 탄환조차 쉽게 뚫지 못하는 부패한 방벽으로 변모했다!",
          stats: { T: 10, Fel: -6 },
          wounds: 25,
          woundsBonus: 10,
          corruption: 14
        },
        fail: {
          text: "포자 배양 도중 독기가 역류해 피부가 심하게 짓물렀으나 고통만은 이상할 정도로 느껴지지 않았다.",
          wounds: -14,
          stats: { Fel: -8 },
          corruption: 12
        }
      },
      {
        label: "[의지 판정] 역병의 유혹을 거부하고 전염이 퍼지지 않도록 자신의 육신 안에만 부패를 봉쇄한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "끔찍한 오한을 견뎌 내며 정수조를 오염시키지 않았다. 육신은 쇠약해졌으나 마지막 양심의 조각을 지켜 냈다.",
          stats: { WP: 7, T: 4 },
          corruption: -6
        },
        fail: {
          text: "버텨 내는 동안 관절이 굳어 움직임이 둔해졌고, 할아버지의 웃음소리가 더욱 짙어졌다.",
          stats: { Ag: -5 },
          corruption: 12
        }
      },
      {
        label: "썩어 가는 상처 위에 두꺼운 붕대를 감고 고통 없는 고요 속에 하루를 보낸다",
        effect: {
          text: "어떤 피로도 슬픔도 느껴지지 않는 나른한 부패가 온몸에 자리 잡았다.",
          stats: { T: 6, Ag: -4 },
          wounds: 15,
          corruption: 10
        }
      }
    ],
    source: "Lexicanum: Nurgle / Black Crusade"
  },
  {
    id: "ev_arc_mark_slaanesh",
    title: "슬라네쉬의 향연 — 완벽을 향한 끝없는 갈증",
    category: "오염",
    once: true,
    req: { allTags: ["mark_slaanesh"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 슬라네쉬의 낙인",
    weight: 38,
    text: "평범한 음식도, 평범한 승리도 이제는 재처럼 무미건조하다. 쾌락과 완벽의 군주가 속삭이는 기묘한 현악 선율이 심장을 파고들며, 단 하나의 흠결도 없는 극치의 감각과 예술적 학살을 갈망하게 만든다.",
    choices: [
      {
        label: "[교섭 판정] 상류층 비밀 사교계에 스며들어 매혹적인 화술과 선율로 귀족들을 쾌락 교단의 포로로 만든다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "가면무도회 하룻밤 만에 행성 상류층 인사 절반이 그대의 손짓에 취해 무릎을 꿇었다! 황홀한 권력이 손에 들어왔다.",
          stats: { Fel: 10, Inf: 8, Ag: 4 },
          corruption: 12
        },
        fail: {
          text: "지나친 탐닉이 이단 감찰관의 의심을 사 연회장이 급습당했고, 도주 도중 깊은 상처를 입었다.",
          wounds: -16,
          stats: { Inf: -5 },
          corruption: 12
        }
      },
      {
        label: "[민첩 판정] 단 한 치의 오차도 없는 완벽한 검무로 적의 포위망을 예술 작품처럼 베어 넘긴다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "탄환 사이를 춤추듯 스쳐 지나며 적들의 급소만을 정확히 그어 냈다! 극한의 쾌감이 척추를 타고 흘렀다.",
          stats: { Ag: 9, WS: 7 },
          corruption: 12
        },
        fail: {
          text: "더 완벽한 동작에 집착하다 순간 방심해 반격을 허용했다. 피의 맛마저 이상하리만치 달콤하게 느껴졌다.",
          wounds: -20,
          corruption: 10
        }
      },
      {
        label: "감각을 극한으로 끌어올리는 금지된 향료를 태우며 찰나의 도취에 몸을 맡긴다",
        effect: {
          text: "현실의 고통이 눈부신 색채 속에 녹아내렸으나, 깨어난 뒤에는 더욱 깊은 공허가 남았다.",
          stats: { Fel: 5, Ag: 4, WP: -5 },
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Slaanesh / Black Crusade"
  },

  // 6-3. 핵심 미회수 이력 태그 연작 아크 (14종)
  {
    id: "ev_arc_stc_conclave",
    title: "STC 발견자의 운명 — 화성 탐색대와 이단심문소의 쟁탈전",
    category: "메카니쿠스",
    once: true,
    req: { allTags: ["stc_finder"], excludeTags: ["heretic"] },
    reqLabel: "이력: 고대 STC 발견자",
    weight: 42,
    text: "그대가 과거 복원해 낸 고대 STC 파편의 가치가 화성 대의회에 보고되자 성계 전체가 들썩이고 있다! 붉은 로브의 익스플로레이터 마고스 사절단이 성대한 연금과 작위를 제시하는 한편, 이단심문소 감찰관도 기술 오염 여부를 확인하겠다며 면담을 요구했다.",
    choices: [
      {
        label: "[지성 판정] 화성 사절단과 정식 기술 봉헌 계약을 맺고 행성급 연금과 최상급 의료 지원을 협상한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "화성 의회가 설계 단편의 순수성을 공인하며 막대한 종신 연금과 호화로운 영지 권리를 하사했다! 제국 역사에 이름이 남을 포상이다.",
          stats: { Inf: 14, Int: 6 },
          lifeBonusExtra: 15,
          addTags: ["wealthy"]
        },
        fail: {
          text: "까다로운 이진법 계약 조항에 밀려 연금의 상당 부분을 화성에 양보했으나, 여전히 평생 부족함 없는 명예를 얻었다.",
          stats: { Inf: 6 },
          wounds: -8
        }
      },
      {
        label: "[교섭 판정] 기계교와 이단심문소 사이에서 균형을 잡아 양측의 공식 보호령과 두터운 신임을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "화성의 기술 권위와 이단심문소의 감찰 권한을 모두 존중하는 절묘한 합의를 이끌어 냈다. 두 거대 기관이 그대의 든든한 방패가 되었다.",
          stats: { Inf: 12, Fel: 6 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "양측의 신경전 사이에 끼어 한동안 강도 높은 심문을 받았으나, 혐의 없음으로 풀려났다.",
          stats: { Inf: -3, WP: 4 }
        }
      },
      {
        label: "화성 사절단의 권위에 조용히 복종해 공적을 봉헌하고 소박한 종신 서훈만 받는다",
        effect: {
          text: "욕심을 내려놓은 겸손한 태도에 마고스가 흡족해하며 옴니시아의 축복장과 안정된 보상을 내렸다.",
          stats: { Inf: 7, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Standard Template Construct / Gaunt's Ghosts"
  },
  {
    id: "ev_arc_inquisition_debt",
    title: "심문소 신임의 대가 — 검은 인장이 찍힌 비밀 소환장",
    category: "이단심문소",
    once: true,
    req: { allTags: ["inquisition_favor"], excludeTags: ["inquisitor", "custodes", "grey_knight", "heretic"] },
    reqLabel: "이력: 심문소 신임",
    weight: 34,
    text: "이단심문소의 호의는 결코 공짜가 아니다. 한밤중 문틈으로 검은 밀랍 인장이 찍힌 암호 서신이 밀려 들어왔다. '그대가 과거 쌓은 신임을 증명할 때가 왔다. 부패한 성계 징세관의 비밀 장부를 회수하라.'",
    choices: [
      {
        label: "[지성 판정] 소환에 응해 심야의 행정관 저택에서 이단 자금 거래 장부를 흔적 없이 빼내어 바친다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "경비 서비터의 순찰 주기를 정확히 파고들어 장부를 확보했다! 이단심문관이 그대의 역량에 깊은 만족을 표했다.",
          stats: { Int: 6, Ag: 4, Inf: 8 }
        },
        fail: {
          text: "경보 장치가 울려 호위대와 총격전을 벌인 끝에 부상을 입고 겨우 장부 사본만 챙겨 빠져나왔다.",
          wounds: -18,
          stats: { Inf: -2, Ag: 2 }
        }
      },
      {
        label: "[교섭 판정] 직접 잠입하는 대신 현지 인맥을 가동해 밀수선 항로와 접선자 명단만 정교하게 넘긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "손에 피를 묻히지 않고도 심문소가 원하는 핵심 고리를 정확히 짚어 주었다. 정보원으로서의 가치가 한층 높아졌다.",
          stats: { Fel: 6, Inf: 6 }
        },
        fail: {
          text: "중간 정보원이 배신해 엉뚱한 창고를 짚는 실수를 저질렀다. 심문소의 차가운 경고를 받았다.",
          stats: { Inf: -4, WP: 3 }
        }
      },
      {
        label: "[특별 청원] 정식으로 이단심문소 어콜라이트 수행단에 합류하겠다고 서약한다",
        req: {
          excludeTags: [
            "astartes",
            "custodes",
            "grey_knight",
            "inquisition_agent",
            "inquisitor",
            "mechanicus",
            "abhuman",
            "sororitas",
            "canoness",
            "rogue_trader",
            "commissar",
            "lord_commissar",
            "officer",
            "scion"
          ]
        },
        effect: {
          text: "비밀 연락관이 조용히 고개를 끄덕이며 어콜라이트 식별 문장을 건넸다. 이제 그대는 그림자 속의 심판자로 새 삶을 시작한다.",
          forceCareer: "inquisition_acolyte",
          addTags: ["inquisition_agent"],
          stats: { Inf: 10, WP: 5, Int: 4 }
        }
      },
      {
        label: "적법한 범위 안에서만 목격 진술서를 제출하고 조용히 거리를 유지한다",
        effect: {
          text: "지나치게 깊이 얽히지 않으려는 신중함이 목숨을 지켰다. 심문소는 더 이상 묻지 않고 어둠 속으로 물러났다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Dark Heresy: Core Rulebook / Imperium Maledictum"
  },
  {
    id: "ev_arc_wanted_manhunt",
    title: "심문소 수배령 — 우주 항구의 포위망과 암살자 추격",
    category: "위기",
    once: true,
    req: { allTags: ["wanted_by_inquisition"] },
    reqLabel: "이력: 심문소 수배",
    weight: 38,
    text: "우주 항구 전광판과 아르비테스 검문소마다 그대의 얼굴과 체포 영장이 송출되고 있다! 설상가상으로 어두운 골목 위 난간에서 정체를 알 수 없는 검은 신스스킨 차림의 추적자가 저격 조준경을 맞춘 섬광이 번쩍였다.",
    choices: [
      {
        label: "[민첩 판정] 항구 하수 배관과 폐열 통로를 타고 검문망을 뚫어 밀수 화물선에 몰래 올라탄다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "총탄이 철판을 긁는 아슬아슬한 순간에 화물칸 틈새로 몸을 던져 포위망을 완벽히 따돌렸다!",
          stats: { Ag: 7, Int: 5 },
          wounds: -8
        },
        fail: {
          text: "어깨를 스친 저격탄에 큰 피를 흘리며 겨우 폐기물 슈트로 굴러 떨어져 목숨만 건졌다.",
          wounds: -24,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[교섭 판정] 언더하이브 암시장 정보상에게 거액을 건네 사망 위조 기록을 만들어 신분을 세탁한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행정국 부고 장부에 '화재로 신원 불명 사망' 기록을 심어 넣는 데 성공했다! 당분간 추적자들의 눈을 돌릴 수 있게 되었다.",
          stats: { Fel: 7, Inf: 5 }
        },
        fail: {
          text: "정보상이 현상금을 노리고 밀고하는 바람에 매복을 당했다. 간신히 피를 보고 빠져나왔다.",
          wounds: -18,
          stats: { Inf: -6 }
        }
      },
      {
        label: "폐쇄된 동력 구역으로 추적자를 유인해 증기 밸브를 터뜨리고 어둠 속으로 흩어진다",
        effect: {
          text: "하얀 고압 증기 속에 시야가 차단된 틈을 타 현장을 벗어났다. 화상은 남았으나 목숨은 부지했다.",
          stats: { WS: 4, T: 2 },
          wounds: -14,
          corruption: 4
        }
      }
    ],
    source: "Dark Heresy: Radicals Handbook / Lexicanum: Inquisition"
  },
  {
    id: "ev_arc_rogue_psyker_hunt",
    title: "무등록 사이커의 밤 — 워프 포식자와 마녀 사냥꾼",
    category: "사이커",
    once: true,
    req: { allTags: ["rogue_psyker"], excludeTags: ["sanctioned_psyker", "grey_knight", "custodes"] },
    reqLabel: "이력: 무등록 사이커",
    weight: 38,
    text: "훈련받지 않은 사이킥 감각이 폭주하며 잠들 때마다 워프 너머의 엔슬레이버와 악마들이 영혼의 틈새를 두드린다. 바깥 골목에서는 사이커 탐지견을 앞세운 마녀 사냥꾼들의 발소리가 점점 가까워지고 있다.",
    choices: [
      {
        label: "[의지 판정] 꿈속으로 파고드는 워프 포식자의 손아귀를 스스로의 정신 장벽으로 베어 낸다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "코피를 쏟으며 끔찍한 정신 침식을 밀어냈다! 비록 제도권 밖이지만 스스로 힘을 제어하는 독자적 규율을 터득했다.",
          stats: { WP: 9, Int: 5 },
          corruption: -8
        },
        fail: {
          text: "정신 방벽이 찢어지며 거실 유리가 일제히 산산조각 났다. 워프의 냉기가 뼛속까지 스며들었다.",
          wounds: -22,
          corruption: 16
        }
      },
      {
        label: "[의지 판정] 더 늦기 전에 아뎁투스 아스트라 텔레파티카에 자진 출두해 생션드 사이커 성별 의식을 치른다",
        req: { maxCorruption: 55, excludeTags: ["astartes", "inquisitor", "heretic"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "죽음과도 같은 영혼 결속과 가혹한 검사를 버텨 내고 마침내 제국 공인 생션드 사이커로 갱생했다!",
          forceCareer: "sanctioned_psyker",
          addTags: ["sanctioned_psyker"],
          stats: { WP: 7, Int: 4 },
          faith: 10,
          corruption: -15
        },
        fail: {
          text: "혹독한 정신 결속 과정에서 큰 상처를 입어 정식 발령은 보류되었으나, 악마의 속삭임만은 한풀 꺾였다.",
          wounds: -24,
          corruption: -6
        }
      },
      {
        label: "마녀 사냥꾼의 눈을 피해 폐공장 지하로 거처를 옮기고 숨을 죽여 버틴다",
        effect: {
          text: "검은 함선의 수색망은 또 한 번 피했으나, 통제되지 않은 워프의 속삭임은 여전히 귓가를 맴돈다.",
          stats: { Ag: 4, WP: 3 },
          corruption: 6
        }
      }
    ],
    source: "Lexicanum: Rogue Psyker / Dark Heresy"
  },
  {
    id: "ev_arc_tech_heresy_audit",
    title: "기술 이단 감찰 — 옴니시아의 심판관과 금지된 회로",
    category: "메카니쿠스",
    once: true,
    req: { allTags: ["tech_heresy"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 기술 이단",
    weight: 36,
    text: "과거 손댔던 금지된 기술 개조의 흔적이 기계교 내부 감사망에 포착되었다! 다연장 플라즈마 서보암을 펼친 심판 마고스가 데이터 슬레이트를 들이밀며 '정통 STC에 없는 불경한 혁신'의 출처를 추궁한다.",
    choices: [
      {
        label: "[지성 판정] 금지된 회로 구조를 고대 STC 주석의 정통 파생 해석으로 완벽히 위장해 마고스의 논리를 꺾는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 이진법 문헌 구절을 줄줄 읊어 대며 감찰단을 설득했다! 오히려 탁월한 고증 학자로 칭찬받으며 위기를 기회로 뒤집었다.",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "논리의 허점이 들통나 전기 채찍 징계와 서열 강등 처분을 받았다. 겨우 서비터 개조만은 면했다.",
          wounds: -18,
          stats: { Inf: -8 },
          corruption: 6
        }
      },
      {
        label: "[의지 판정] 이단적 데이터 회로를 스스로 용광로에 소각하고 기계령 정화 기도를 집전해 결백을 보인다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "타오르는 회로 앞에서 경건히 옴니시아 찬가를 읊자 감찰 마고스가 묵묵히 고개를 끄덕이며 혐의를 종결했다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -10
        },
        fail: {
          text: "폐기 과정에서 방전 사고로 손에 화상을 입었고, 감찰단은 여전히 의심의 눈초리를 거두지 않았다.",
          wounds: -12,
          stats: { Inf: -5 }
        }
      },
      {
        label: "감사가 들이닥치기 전에 금지된 설계 슬레이트를 암시장 밀수상에게 팔아넘기고 증거를 인멸한다",
        effect: {
          text: "물증은 사라져 처벌을 피했으나, 그대의 손에서 빠져나간 이단 기술이 어둠 속에서 어디로 흘러갈지는 아무도 모른다.",
          stats: { Ag: 4, Inf: 4 },
          corruption: 8
        }
      }
    ],
    source: "Lexicanum: Tech-Heresy / Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_arc_xenos_contact_echo",
    title: "외계인 접촉의 여파 — 오르도 제노스의 시선과 암거래 항로",
    category: "외계",
    once: true,
    req: { allTags: ["xenos_contact"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "이력: 외계인 접촉",
    weight: 34,
    text: "과거 외계 종족과 얽혔던 기억이 다시 발목을 잡았다. 변방 항구 주점에서 낯선 자유 무역상이 그대만 알아볼 수 있는 외계 문양 메달을 꺼내 보이며 '콜드 트레이드(Cold Trade)' 비밀 거래를 제안하는 동시에, 저편에서는 이단심문소 첩자의 시선이 느껴진다.",
    choices: [
      {
        label: "[지성 판정] 과거 얻은 외계 성계도와 기술 첩보를 역으로 오르도 제노스에 전략 보고서로 바쳐 공로를 세운다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "적의 약점을 꿰뚫은 귀중한 외계 분석 자료에 심문소가 감탄했다! 과거의 의심은 씻기고 오히려 든든한 신임을 얻었다.",
          stats: { Int: 6, Inf: 7 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "보고서의 출처를 추궁받다 구금되어 며칠간 혹독한 심문을 겪은 뒤에야 풀려났다.",
          wounds: -14,
          stats: { Inf: -6 }
        }
      },
      {
        label: "[교섭 판정] 감시자의 눈을 피해 아엘다리 영석과 외계 희귀 물자를 중개해 막대한 이윤을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "치명적인 위험을 뚫고 거래를 성사시켜 평생 쓸 재물과 지하 인맥을 거머쥐었다. 물론 심문소에 들키면 즉시 화형감이다.",
          stats: { Fel: 7, Inf: 8 },
          corruption: 6
        },
        fail: {
          text: "거래 현장이 아르비테스 급습을 받아 난장판이 되었다. 물건을 버리고 피투성이로 도망쳤다.",
          wounds: -16,
          stats: { Inf: -5 },
          corruption: 8
        }
      },
      {
        label: "밀거래 제안을 단칼에 거절하고 남아 있던 외계 흔적을 모두 불태워 버린다",
        effect: {
          text: "미지의 유혹을 끊어 내고 인류의 길로 돌아섰다. 밤잠을 설치게 하던 불길한 감시도 차츰 잦아들었다.",
          stats: { WP: 5 },
          faith: 5,
          corruption: -5
        }
      }
    ],
    source: "Rogue Trader RPG / Lexicanum: Cold Trade"
  },
  {
    id: "ev_arc_penal_redemption",
    title: "징벌 연대의 속죄 — 폭발 목걸이를 찬 최전선 돌격",
    category: "군사",
    once: true,
    req: { allTags: ["penal_mark"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    reqLabel: "이력: 징벌 부대 낙인",
    weight: 38,
    text: "목덜미에 채워진 징벌 부대 폭발 목걸이가 차갑게 빛난다. 지휘관은 지뢰밭 너머 적 중화기 벙커를 가리키며 외친다. '저 진지를 날려 버리고 살아 돌아오는 자에게는 황제의 사면을 내린다. 뒤돌아서는 자는 목이 날아갈 뿐이다!'",
    choices: [
      {
        label: "[백병 판정] 포연을 뚫고 적 벙커 총안에 수류탄을 꽂아 넣어 전과로 당당히 사면장을 쟁취한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "지옥 같은 탄막을 돌파해 벙커를 폭파시켰다! 커미사르가 직접 폭발 목걸이를 풀어 주며 '황제께서 네 죄를 씻으셨다'고 선언했다.",
          stats: { WS: 7, T: 6, Inf: 8 },
          faith: 8
        },
        fail: {
          text: "철조망과 파편에 온몸이 찢겼으나, 죽을힘으로 벙커를 무력화한 공을 인정받아 목숨만은 건졌다.",
          wounds: -24,
          stats: { T: 4 }
        }
      },
      {
        label: "[민첩 판정] 정면 돌격 대신 무너진 배수로를 기어 우회해 적 탄약고를 폭파하고 생환한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "단 한 발의 총탄도 맞지 않고 적의 후방 탄약고를 날려 버렸다! 징벌병들 사이에서 살아남는 귀신으로 통하게 되었다.",
          stats: { Ag: 7, BS: 5, Inf: 5 }
        },
        fail: {
          text: "배수로 천장이 포격에 무너져 내려 큰 타박상을 입은 채 겨우 아군 참호로 기어 돌아왔다.",
          wounds: -20,
          stats: { Ag: 2 }
        }
      },
      {
        label: "폭발 목걸이가 작동하지 않도록 명령대로 최전선 탄약 상자를 나르며 묵묵히 하루를 버틴다",
        effect: {
          text: "화려한 사면은 얻지 못했으나, 수많은 징벌병이 쓰러지는 포화 속에서 오늘도 살아남았다.",
          stats: { T: 5, WP: 4 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Penal Legion / Last Chancers"
  },
  {
    id: "ev_arc_dreadnought_awakening",
    title: "고대 석관의 각성 — 기억이 풍화되는 수백 년의 전장",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes", "dreadnought"] },
    reqLabel: "아스타르테스 · 드레드노트 안치",
    weight: 42,
    text: "차가운 양수 석관에 전류가 흐르며 기나긴 동면에서 깨어났다. 테크마린이 경건히 향을 피우며 전황을 보고하지만, 한때 함께 웃던 옛 형제들은 이미 수 세기 전 별이 되었고 바깥의 챕터 신병들은 그대를 살아 있는 전설이자 낯선 고대 유물처럼 올려다본다.",
    choices: [
      {
        label: "[의지 판정] 희미해져 가는 인간 시절의 이름을 끝까지 붙잡고 젊은 배틀 브라더들에게 고대 전술을 전수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "강철 확성기 너머로 울려 퍼진 고대 영웅의 훈시에 중대 전체의 사기가 하늘을 찔렀다! 그대는 챕터의 살아 있는 기억으로 추앙받았다.",
          stats: { WP: 8, Int: 7, Inf: 10 },
          faith: 8
        },
        fail: {
          text: "수백 년 전 전장과 현재가 겹쳐 보이는 극심한 혼란 속에 신경 인터페이스가 과부하를 일으켰으나, 곧 의식을 다잡았다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[사격 판정] 어썰트 캐논과 파워 피스트를 전개해 챕터 군기를 노리는 적 기갑 열을 단독으로 분쇄한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "'죽음 속에서도 의무는 끝나지 않는다!' 압도적인 중화기와 장갑으로 적 전차 중대를 고철 더미로 만들며 후배 형제들을 구해 냈다.",
          stats: { BS: 8, WS: 6, Inf: 8 }
        },
        fail: {
          text: "적 대전차 멜타 포격에 장갑판이 크게 녹아내렸으나, 테크마린의 긴급 봉합으로 석관의 불꽃은 꺼지지 않았다.",
          wounds: -20,
          stats: { T: 5 }
        }
      },
      {
        label: "말없이 거신 병기의 기계령과 호흡을 맞추며 다음 전장이 부를 때까지 고요히 석관을 지킨다",
        effect: {
          text: "분노도 슬픔도 강철의 정적 속에 가라앉았다. 오직 황제를 향한 영원한 충성만이 석관 안에서 박동한다.",
          stats: { T: 7, WP: 5 },
          wounds: 15
        }
      }
    ],
    source: "Lexicanum: Space Marine Dreadnought / Codex: Space Marines"
  },
  {
    id: "ev_arc_primaris_tension",
    title: "루비콘의 너머 — 퍼스트본과 프라이머리스 사이의 균열",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes", "primaris"] },
    reqLabel: "아스타르테스 · 프라이머리스",
    weight: 38,
    text: "루비콘 프라이머리스 시술 이후 더 거대해진 체구와 벨리사리우스 카울의 신형 마크 X 아머를 두르고 있지만, 챕터 일부 고참 퍼스트본 베테랑들은 '화성 기계사제가 만든 신형 전사가 우리 챕터의 1만 년 영혼을 진정 이해하는가'라며 차가운 시선을 보낸다.",
    choices: [
      {
        label: "[백병 판정] 챕터의 전통 명예 결투장에 자진해 서서 신형 장기가 아닌 형제애와 기량으로 인정을 받는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "치열한 대련 끝에 고참 베테랑이 웃으며 그대의 팔을 맞잡았다! '껍데기가 달라졌어도 피는 같은 형제군.' 챕터의 균열이 봉합되었다.",
          stats: { WS: 7, Fel: 7, Inf: 8, WP: 4 }
        },
        fail: {
          text: "노련한 고참 형제의 변칙 일격에 무릎을 꿇었으나, 끝까지 포기하지 않는 투지에 상대도 묵묵히 경의를 표했다.",
          wounds: -18,
          stats: { T: 4, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 신형 볼트 라이플의 화력 교리와 챕터 고유의 전통 전술을 융합한 합동 작전안을 정립한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "퍼스트본의 노련함과 프라이머리스의 화력이 완벽히 맞물린 합동 작전이 대승을 거두며 중대 전체의 신뢰를 얻었다!",
          stats: { Int: 7, BS: 5, Inf: 7 }
        },
        fail: {
          text: "교리 조율 회의에서 보수파 베테랑들과 언쟁이 길어지며 한동안 냉랭한 분위기가 이어졌다.",
          stats: { Inf: -3, Int: 3 }
        }
      },
      {
        label: "변명 대신 가장 위험한 최선봉 드롭 포드에 올라 묵묵히 전장에서 챕터의 이름을 증명한다",
        effect: {
          text: "말보다 앞선 피와 탄환이 의심을 잠재웠다. 상처투성이 갑주 위에 챕터 문장이 당당히 빛난다.",
          stats: { T: 5, WP: 5, Inf: 5 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Primaris Space Marines / Dark Imperium"
  },
  {
    id: "ev_arc_death_company_last_charge",
    title: "검은 갑주의 성가 — 채플린의 인도와 호루스의 환영",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes", "death_company"], anyChapters: ["blood_angels"] },
    reqLabel: "블러드 엔젤 · 데스 컴퍼니 분노 극복",
    weight: 40,
    text: "전투 전야, 다시금 귀울림과 함께 테라 공성전의 불바다가 시야를 뒤덮는다. 채플린이 붉은 X자 문장이 그려진 검은 갑주 앞에서 그대의 어깨에 손을 얹고 묻는다. '형제여, 지금 내 얼굴이 보이는가, 아니면 반역자 호루스가 보이는가?'",
    choices: [
      {
        label: "[의지 판정] 채플린의 영창에 정신을 집중해 검은 분노의 광기를 정확한 적 지휘관 참수로 승화시킨다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "생귀니우스의 눈물마저 강철의 의지로 다스렸다! 검은 분노의 문턱에서 돌아온 희귀한 전사로 챕터 기록서에 등재되었다.",
          stats: { WP: 9, WS: 7, Inf: 8 },
          faith: 10
        },
        fail: {
          text: "환영 속에서 적진 깊숙이 홀로 돌진해 치명상을 입었으나, 채플린의 결사적인 구출로 간신히 목숨을 건졌다.",
          wounds: -26,
          stats: { WS: 5 }
        }
      },
      {
        label: "[백병 판정] 타오르는 분노를 적 최정예 포위망 한복판에 쏟아부어 아군의 돌파구를 열어 젖힌다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "검은 갑주의 사신이 되어 적의 방어선을 단숨에 도륙했다! 전우들이 그대의 광기 어린 희생에 고개를 숙였다.",
          stats: { WS: 10, T: 5, Inf: 7 },
          wounds: -14
        },
        fail: {
          text: "사방에서 쏟아진 집중 사격에 갑주가 뚫렸으나, 피투성이가 되어서도 마지막 적의 숨통을 끊었다.",
          wounds: -28,
          stats: { WS: 4 }
        }
      },
      {
        label: "생귀너리 사제의 진정 의식을 받아들이고 침묵의 기도실에서 핏빛 환상을 잠재운다",
        effect: {
          text: "차가운 석실에 앉아 대리석 천사상을 어루만지며 호흡을 가다듬었다. 오늘도 야수는 사슬 안에 머물렀다.",
          stats: { WP: 5 },
          faith: 6,
          wounds: 10
        }
      }
    ],
    source: "Lexicanum: Death Company / Codex: Blood Angels"
  },
  {
    id: "ev_arc_inner_circle_hunt",
    title: "이너 서클의 비밀 칙령 — '더 락' 최심부의 회개 심문",
    category: "챕터 고유",
    once: true,
    req: { allTags: ["astartes", "inner_circle"], anyChapters: ["dark_angels"] },
    reqLabel: "다크 엔젤 · 이너 서클",
    weight: 40,
    text: "이동 요새 '더 락'의 빛 한 점 들지 않는 지하 석실로 비밀 소집령이 떨어졌다. 제국 심문관조차 눈치채지 못하게 생포해 온 고대의 폴른 한 명이 철제 의자에 묶인 채, 1만 년 전 칼리반 파괴의 진실을 비웃으며 입을 다물고 있다.",
    choices: [
      {
        label: "[의지 판정] 인테로게이터-채플린을 보좌해 폴른의 기만과 회개를 가려내며 제1군단의 명예를 지킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "흔들림 없는 신념으로 폴른의 궤변을 꺾고 마침내 회개의 자백과 배후 워밴드의 좌표를 받아 냈다! 이너 서클 내 위상이 굳건해졌다.",
          stats: { WP: 8, Int: 6, Inf: 8 }
        },
        fail: {
          text: "폴른이 뱉어 낸 칼리반의 저주와 기습적인 사이킥 발악에 큰 충격을 입었으나, 비밀만은 새어 나가지 않았다.",
          wounds: -16,
          corruption: 5
        }
      },
      {
        label: "[사격 판정] 데스윙 텔레포트 타격대를 이끌어 제국 동맹군이 도착하기 전에 폴른의 잔여 은신처를 완전히 지운다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "골백색 터미네이터 갑주의 압도적인 스톰 볼터 화력으로 흔적 하나 남기지 않고 비밀 작전을 완수했다!",
          stats: { BS: 7, WS: 5, Inf: 8 }
        },
        fail: {
          text: "은신처 자폭 함정에 휘말려 부상을 입었고, 철수 과정에서 제국군 사령관의 의심을 가까스로 무마했다.",
          wounds: -20,
          stats: { Inf: -3 }
        }
      },
      {
        label: "어떤 제국 기관에도 비밀이 새지 않도록 작전 기록 전체를 봉인하고 침묵의 서약을 되새긴다",
        effect: {
          text: "어둠 속의 감시자가 조용히 문서를 수거해 사라졌다. 비밀을 지키는 것이 곧 다크 엔젤의 영원한 속죄다.",
          stats: { WP: 5, Int: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Inner Circle / Codex: Dark Angels"
  },
  {
    id: "ev_arc_living_miracle_trial",
    title: "기적의 증인 — 국교 성지화 열풍과 심문소의 성흔 검증",
    category: "신앙",
    once: true,
    req: { allTags: ["living_miracle"], excludeTags: ["heretic", "custodes"] },
    reqLabel: "이력: 살아 있는 기적",
    weight: 38,
    text: "그대가 체험한 성스러운 기적의 소문이 성역 전역에 퍼지자, 수천 명의 순례자들이 거처 앞에 몰려들어 옷자락이라도 만지려 울부짖고 있다. 그 군중을 뚫고 오르도 헤레티쿠스 검증관이 차가운 표정으로 다가와 '황제의 은총인지 교묘한 워프 기만인지 지금 입증하라'고 명한다.",
    choices: [
      {
        label: "[의지 판정] 심문소 검증관과 순결의 성수 앞에서 흔들림 없는 신앙으로 기적의 진정성을 입증한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "사이킥 탐지기조차 고요한 가운데 그대의 기도 소리에 성당의 촛불이 일제히 타올랐다! 국교와 심문소 모두가 공식 축복을 인정했다.",
          stats: { WP: 8, Inf: 10 },
          faith: 15,
          corruption: -12
        },
        fail: {
          text: "며칠간 이어진 가혹한 고행 검증 끝에 탈진해 쓰러졌으나, 이단 혐의만은 깨끗이 벗어났다.",
          wounds: -18,
          stats: { Inf: -3, WP: 3 }
        }
      },
      {
        label: "[교섭 판정] 광신으로 치닫는 순례 군중을 차분히 달래고 모인 헌금을 전선 부상병 구호 물자로 돌린다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "우상 숭배 대신 이웃과 전선을 돕는 실질적 자선으로 신앙을 이끌어 국교와 행정부 양쪽의 찬사를 받았다.",
          stats: { Fel: 8, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "헌금 배분을 두고 지역 성직자들과 마찰이 빚어져 구설에 올랐다.",
          stats: { Inf: -3, Fel: 2 }
        }
      },
      {
        label: "세속의 숭배를 단호히 거절하고 소박한 신도로서 본연의 직무에 묵묵히 복귀한다",
        effect: {
          text: "'영광은 오직 황금 옥좌의 주인께만 돌리라.' 겸허한 물러남에 검증관도 경의를 표하며 발길을 돌렸다.",
          stats: { WP: 5 },
          faith: 8,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Living Saint / Codex: Adepta Sororitas"
  },
  {
    id: "ev_arc_lost_home_vigil",
    title: "부서진 고향의 추모제 — 살아남은 자의 무게",
    category: "생존자",
    once: true,
    req: { anyTags: ["cadia_stands", "baal_survivor", "tanith_survivor"], excludeTags: ["heretic"] },
    reqLabel: "이력: 카디아·바알·타니스 생존자",
    weight: 34,
    text: "고향 행성이 불타거나 쪼개진 날로부터 세월이 흘렀다. 주둔지 외곽의 소박한 석비 앞에 같은 별에서 살아남은 생존자들이 하나둘 모여들어, 주머니 깊숙이 간직해 온 고향의 흙과 전사한 전우들의 인식표를 올려두고 있다.",
    choices: [
      {
        label: "[교섭 판정] 생존자들과 함께 고향의 이름을 외치며 신병들에게 결코 꺾이지 않는 의지를 물려준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'행성은 부서졌어도 우리는 여전히 서 있다!' 떨리는 목소리로 이어진 합창이 부대 전체의 가슴에 지워지지 않는 불씨를 지폈다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "목이 메어 연설을 끝맺지 못했으나, 침묵 속에 어깨를 두드려 주는 생존자들의 눈빛이 깊은 위안이 되었다.",
          stats: { WP: 4, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 밤마다 찾아오는 궤도 포격과 비명의 악몽을 정면으로 마주하고 산 자의 책임을 맹세한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "생존자의 죄책감을 강철 같은 결의로 벼려 냈다! 워프의 절망조차 비집고 들어올 틈 없는 정신력을 얻었다.",
          stats: { WP: 9, T: 4 },
          corruption: -8
        },
        fail: {
          text: "지독한 악몽과 불면이 며칠간 이어지며 기력이 쇠했으나, 다시 총을 쥐고 일어섰다.",
          wounds: -10,
          stats: { WP: 3 }
        }
      },
      {
        label: "말없이 아퀼라 성호를 긋고 추모비 앞에 낡은 탄피 하나를 내려둔 채 자리로 돌아간다",
        effect: {
          text: "떠나간 이들의 이름은 영원히 잊히지 않을 것이다. 가슴속 무거운 침묵이 오늘도 그대를 앞으로 걷게 한다.",
          stats: { WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Fall of Cadia / Devastation of Baal / Gaunt's Ghosts"
  },
  {
    id: "ev_arc_veteran_relic_recall",
    title: "전장의 증표 — 옛 전우가 남긴 암호 상자",
    category: "베테랑",
    once: true,
    req: {
      anyTags: ["vraks_veteran", "badab_veteran", "rift_survivor", "deathwatch_vet", "space_hulk_vet"],
      excludeTags: ["heretic"]
    },
    reqLabel: "이력: 대전역·특수작전 베테랑",
    weight: 32,
    text: "생사를 넘나들던 과거 대전역에서 등을 맞대고 싸웠던 옛 전우의 유품 상자가 아드미니스트라툼 지연 우편으로 수년 만에 배달되었다. 녹슨 자물쇠 안에는 손상된 전술 기록 슬레이트와 정교하게 손질된 마스터 크래프트 무기 부속품이 들어 있다.",
    choices: [
      {
        label: "[지성 판정] 손상된 전술 기록을 복원해 당시 작전의 보급 누락과 은폐된 공훈을 바로잡는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "전우가 목숨 걸고 기록한 좌표를 복구해 부대의 명예와 누락된 훈장을 되찾아 주었다! 상급 사령부도 그대의 집념을 높이 샀다.",
          stats: { Int: 6, Inf: 8, WP: 4 }
        },
        fail: {
          text: "행정 문서의 절반은 이미 파기되어 공식 정정은 무산되었으나, 진실만은 그대의 기억 속에 온전히 남았다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 옛 전우의 명품 무기 부속을 직접 정비·장착해 사격장에서 실전 감각을 극한까지 되살린다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "손에 착 감기는 완벽한 조준 감각이 되살아났다! 옛 전우의 몫까지 한 발도 헛되이 쏘지 않으리라 다짐했다.",
          stats: { BS: 6, WS: 4, WP: 4 }
        },
        fail: {
          text: "노후화된 공이치기가 오작동해 손등을 다쳤으나, 정성껏 수리해 끝내 무기를 되살려 냈다.",
          wounds: -8,
          stats: { BS: 2 }
        }
      },
      {
        label: "유품을 기름천으로 닦아 소중히 간직하며 전우의 영혼이 황금 옥좌 곁에서 안식하길 기도한다",
        effect: {
          text: "수조 명의 병사가 스쳐 가는 제국에서 누군가를 끝까지 기억해 주는 것 자체가 작은 기적이다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Only War / Imperial Armour: Siege of Vraks & Badab War"
  },

  // 6-4. 삶의 초점(anyFocus) 6대 전용 분기 사건 (6종)
  {
    id: "ev_focus_survival",
    title: "생존의 법칙 — 오염 구역의 정수 필터와 비상 약품",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["survival"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "삶의 초점: 생존과 보양",
    weight: 26,
    text: "몸을 돌보며 하루하루를 버티는 데 전념하던 중, 거주 구역 상수도관에 공업 폐수가 섞여 들며 주민들 사이에서 기침병이 돌기 시작했다. 미리 모아 둔 예비 부품과 약품이 생사를 가를 순간이 왔다.",
    choices: [
      {
        label: "[강인 판정] 직접 호흡 필터와 비상 약품을 조합해 독기를 이겨 내는 완벽한 보양 체계를 갖춘다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "오염된 공기와 물 속에서도 끄떡없는 강철 같은 체력을 다졌다! 장기 생존에 큰 밑천을 확보했다.",
          stats: { T: 6 },
          wounds: 18,
          lifeBonusExtra: 6
        },
        fail: {
          text: "여과 필터 교체 도중 유독 가스를 마셔 며칠간 앓아누웠으나, 덕분에 독성에 대한 요령은 몸에 배었다.",
          wounds: -10,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 배급 정제수와 시체 녹말의 오염 성분을 분석해 구역 주민들에게 안전한 끓임 수칙을 알린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "간단한 침전 여과법만으로 수십 명의 목숨을 구했다! 이웃들이 감사의 뜻으로 귀한 식량과 약초를 나누어 주었다.",
          stats: { Int: 5, Fel: 4 },
          wounds: 12
        },
        fail: {
          text: "임시 분석 도구가 망가져 소소한 손해를 보았으나, 스스로의 식수만은 안전하게 걸러 냈다.",
          wounds: -6,
          stats: { Int: 2 }
        }
      },
      {
        label: "무리하지 않고 미리 비축해 둔 정제수와 식량으로 조용히 체력을 아끼며 고비를 넘긴다",
        effect: {
          text: "욕심내지 않고 몸을 보전한 덕에 유행병이 휩쓸고 간 뒤에도 멀쩡히 살아남았다.",
          stats: { T: 3 },
          wounds: 14
        }
      }
    ],
    source: "Imperium Maledictum / Warhammer 40k Daily Life"
  },
  {
    id: "ev_focus_combat",
    title: "피와 강철의 연마 — 베테랑 교관의 실전 대련장",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["combat"] },
    reqLabel: "삶의 초점: 무예와 전투 훈련",
    weight: 26,
    text: "쉬지 않고 무예를 갈고닦던 훈련장에 백전노장 교관이 나타나 팔짱을 꼈다. '허수아비만 베어서는 진짜 전장에서 삼 초도 못 버틴다. 진짜 살기를 견딜 배짱이 있다면 내 실전 코스에 올라와 보라.'",
    choices: [
      {
        label: "[백병 판정] 둔화 날을 씌운 모의 체인블레이드로 교관과 정면 근접 대련을 벌인다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불꽃이 튀는 공방 끝에 교관의 빈틈을 찔러 무기를 쳐 냈다! 훈련장 전체에 환호가 터지며 실전 감각이 한 단계 도약했다.",
          stats: { WS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "교관의 노련한 반격에 바닥을 굴러 멍투성이가 되었으나, 뼈아픈 실전 교훈이 근육에 새겨졌다.",
          wounds: -14,
          stats: { WS: 3 }
        }
      },
      {
        label: "[사격 판정] 연막과 이동 표적이 뒤섞인 실탄 장애물 코스를 단 한 발의 오차 없이 돌파한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "연막 너머로 튀어나온 표적 열두 개를 숨 쉴 틈 없이 꿰뚫었다! 교관이 말없이 탄창 하나를 던져 주며 엄지를 세웠다.",
          stats: { BS: 7, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "도탄 파편에 팔을 스쳐 상처를 입었으나, 끝까지 코스를 완주해 사격 리듬을 다잡았다.",
          wounds: -10,
          stats: { BS: 3 }
        }
      },
      {
        label: "무리한 대결을 피하고 기본 방어 자세와 보법을 천 번씩 반복 숙달한다",
        effect: {
          text: "화려하진 않지만 전장에서 목숨을 지켜 주는 것은 결국 뼈에 밴 기본기다. 흔들림 없는 자세가 몸에 익었다.",
          stats: { WS: 3, BS: 3, T: 3 }
        }
      }
    ],
    source: "Only War / Dark Heresy: Martial Drill"
  },
  {
    id: "ev_focus_faith",
    title: "황제 신앙의 시험 — 성소 촛불과 의심의 밤",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["faith"], excludeTags: ["heretic"] },
    reqLabel: "삶의 초점: 황제 신앙과 기도",
    weight: 26,
    text: "끝없는 전쟁과 부조리가 가득한 은하계 속에서 기도에 매달리던 어느 폭풍우 치는 밤, 성소의 촛불이 일제히 흔들리며 '황제께서 정말 우리처럼 미천한 자의 기도를 들으시는가' 하는 서늘한 의심이 마음속을 파고든다.",
    choices: [
      {
        label: "[의지 판정] 차가운 석조 바닥에 밤새 무릎 꿇고 성가를 암송하며 내면의 의심과 워프 잔재를 씻어 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "동이 틀 무렵 마음속의 안개가 말끔히 걷히고 흔들리지 않는 황금빛 확신이 자리 잡았다! 정신의 오염까지 크게 정화되었다.",
          stats: { WP: 7 },
          faith: 14,
          corruption: -10
        },
        fail: {
          text: "밤샘 고행 끝에 무릎과 몸살로 탈진했으나, 새벽 종소리와 함께 신앙의 불씨만은 지켜 냈다.",
          wounds: -10,
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 폭풍에 겁먹어 성소에 모여든 시민과 병사들 앞에서 황제의 가호를 힘차게 설파한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "그대의 진심 어린 기도가 군중의 공포를 용기로 바꾸어 놓았다! 지역 사제가 그대의 신심을 크게 치하했다.",
          stats: { Fel: 6, Inf: 5 },
          faith: 10
        },
        fail: {
          text: "목소리가 갈라져 크게 호응을 얻진 못했으나, 함께 기도한 소수의 이들과 따뜻한 연대를 나누었다.",
          stats: { Fel: 2 },
          faith: 4
        }
      },
      {
        label: "묵묵히 아퀼라 성호를 긋고 소박한 밀랍 초 하나를 봉헌하며 고요한 위안을 얻는다",
        effect: {
          text: "거창한 기적은 없었으나, 작은 불꽃을 바라보는 사이 흔들리던 마음이 잔잔히 가라앉았다.",
          stats: { WP: 3 },
          faith: 8,
          corruption: -4
        }
      }
    ],
    source: "Lexicanum: Imperial Cult / Ecclesiarchy"
  },
  {
    id: "ev_focus_lore",
    title: "잊혀진 서고의 단편 — 고대 하이 고딕 사본 해독",
    category: "삶의 초점",
    once: true,
    req: { minAge: 14, anyFocus: ["lore"], excludeWorldTags: ["feral"] },
    reqLabel: "삶의 초점: 학문과 기계 교리",
    weight: 26,
    text: "학문과 기계 교리에 몰두하던 중, 먼지 쌓인 아드미니스트라툼 폐기 서고 구석에서 3천 년 전 성계 항로와 기계 정비 주석이 뒤섞인 고대 하이 고딕 양피지 묶음을 발견했다. 다만 마지막 장에는 붉은 인장으로 검열 표시가 찍혀 있다.",
    choices: [
      {
        label: "[지성 판정] 난해한 고대 약어와 이진법 주석을 정밀 해독해 잊혀진 보급 항로와 정비 기법을 복원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "고대 항해 수칙과 정밀 정비 공식을 완벽히 복원해 학계와 행정부의 주목을 한 몸에 받았다!",
          stats: { Int: 8, Inf: 6 }
        },
        fail: {
          text: "며칠 밤을 새우다 곰팡이 포자를 들이마셔 눈과 폐를 상했으나, 귀한 필사 메모 몇 장은 건졌다.",
          wounds: -6,
          stats: { Int: 3 }
        }
      },
      {
        label: "[의지 판정] 붉은 검열 장에 숨겨진 불경한 워프 주석을 즉시 식별해 규정대로 봉인·신고한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "유혹적인 금서를 읽지 않고 즉시 정화 절차를 밟았다! 서고 감찰관이 그대의 철저한 정통성을 높이 평가했다.",
          stats: { WP: 6, Int: 4 },
          faith: 6,
          corruption: -5
        },
        fail: {
          text: "봉인 도중 기괴한 도형을 잠깐 들여다보는 바람에 며칠간 머릿속에서 불쾌한 숫자가 맴돌았다.",
          stats: { Int: 4 },
          corruption: 6
        }
      },
      {
        label: "위험해 보이는 검열 장은 아예 펼치지 않고 안전한 실무 행정과 기계 교리 부분만 필사한다",
        effect: {
          text: "쓸데없는 화를 피하면서도 실무에 당장 쓰일 탄탄한 지식을 차곡차곡 쌓아 올렸다.",
          stats: { Int: 5, WP: 2 }
        }
      }
    ],
    source: "Dark Heresy: Scholastic Lore / Adeptus Administratum"
  },
  {
    id: "ev_focus_politics",
    title: "권력의 연회장 — 파벌 청탁과 비밀 서신",
    category: "삶의 초점",
    once: true,
    req: {
      minAge: 14,
      anyFocus: ["politics"],
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "삶의 초점: 인맥과 출세 도모",
    weight: 26,
    text: "인맥을 넓히며 출세를 도모하던 중, 상층 첨탑의 비공개 연회에 초대받았다. 상인 길드장과 행정국 서기관 파벌이 십일조 운송권을 두고 은밀히 칼날을 겨누는 가운데, 양쪽 모두 그대에게 자기편의 메신저가 되어 달라며 금화 주머니와 승진 추천서를 내민다.",
    choices: [
      {
        label: "[교섭 판정] 양측의 체면을 모두 세워 주는 절묘한 공동 배분안을 제안해 든든한 후원자를 얻는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "노련한 중재 솜씨에 길드장과 고위 행정관 모두가 감탄하며 그대를 핵심 인맥으로 끌어들였다! 출세의 문이 활짝 열렸다.",
          stats: { Fel: 7, Inf: 9 }
        },
        fail: {
          text: "어느 쪽도 완전히 만족시키지 못해 양쪽의 냉대를 받으며 연회장을 빠져나와야 했다.",
          stats: { Inf: -4, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 청탁 서신에 숨은 허위 수치를 간파해 상대 파벌의 횡령 약점을 조용히 손에 쥔다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치명적인 장부 조작 증거를 쥐고 협상 테이블을 주도했다! 그대의 이름 석 자가 상층 사교계에 무게 있게 오르내린다.",
          stats: { Int: 6, Inf: 8 }
        },
        fail: {
          text: "함정 서신에 걸려 정적이 보낸 청부업자의 습격을 받고 겨우 빠져나왔다.",
          wounds: -12,
          stats: { Inf: -4 }
        }
      },
      {
        label: "어느 파벌에도 깊이 얽히지 않고 예의 바른 미소와 중립으로 안전하게 인맥만 다진다",
        effect: {
          text: "권력 다툼의 피바람을 피하면서도 여러 유력 인사들과 무난한 안면을 트는 데 성공했다.",
          stats: { Fel: 4, Inf: 4 }
        }
      }
    ],
    source: "Imperium Maledictum: Patronage & Factions"
  },
  {
    id: "ev_focus_forbidden",
    title: "금단의 서가 — 자정의 밀매상과 봉인된 워프 두루마리",
    category: "삶의 초점",
    once: true,
    req: { minAge: 16, anyFocus: ["forbidden"], excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "삶의 초점: 금단의 지식 탐구",
    weight: 30,
    text: "제국이 금기시한 지식을 파고들던 소문이 어둠 속까지 흘러 들어갔다. 자정이 넘은 뒷골목에서 얼굴을 가린 금서 밀매상이 납 상자를 열어 보이며, 고대 워프 항법과 외계 비술이 적힌 두루마리를 건네려 한다.",
    choices: [
      {
        label: "[지성 판정] 밀매상이 내민 금지된 두루마리를 해독해 필멸자의 상식을 뛰어넘는 통찰을 흡수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "불타는 듯한 문자가 뇌리에 각인되며 워프와 현실의 이면에 대한 경이로운 지혜를 얻었다! 단, 영혼에 짙은 그림자가 달라붙었다.",
          stats: { Int: 10, WP: 5 },
          corruption: 14
        },
        fail: {
          text: "두루마리에 걸린 정신 저주가 폭발해 코피를 쏟으며 쓰러졌고, 끔찍한 환청이 한동안 사라지지 않았다.",
          wounds: -14,
          corruption: 18
        }
      },
      {
        label: "[의지 판정] 이단심문소의 함정 수사일 가능성을 간파하고 밀매상을 제압해 감찰관에게 넘긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "밀매상을 묶어 심문소 지부에 인계했다! 오히려 철저한 위장 수사로 호평받으며 그간의 의혹을 털어 내고 신임까지 얻었다.",
          stats: { WP: 7, Inf: 8 },
          corruption: -10,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "밀매상이 숨겨 둔 독단검에 찔려 부상을 입은 사이 어둠 속으로 도망치고 말았다.",
          wounds: -18,
          corruption: 6
        }
      },
      {
        label: "위험한 거래를 단칼에 거절하고 서둘러 어두운 골목을 빠져나온다",
        effect: {
          text: "지식의 유혹보다 목숨이 중하다. 차가운 밤바람을 맞으며 위험한 호기심을 잠시 억눌렀다.",
          stats: { WP: 4, Ag: 3 },
          corruption: -4
        }
      }
    ],
    source: "Dark Heresy: Forbidden Lore"
  },

  // =========================================================================
  // 7. 2단계 서사 보강 — 생애 주기(유년·노년·초장수기) · 소외 직군 · 특수 출신/자질 (33종)
  // =========================================================================
  // 7-1. 유년기(6~13세) 성장 분기 사건 (8종)
  {
    id: "ev_s2_child_ration_line",
    title: "유년기 — 하이브 배급소 줄과 녹슨 공구의 유혹",
    category: "유년기",
    once: true,
    req: {
      minAge: 6,
      maxAge: 13,
      anyWorldTags: ["hive", "industrial", "civilised", "agri"],
      excludeTags: ["noble", "schola"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "6~13세 · 일반/하층 유년기",
    weight: 34,
    text: "끝없이 늘어선 시체 녹말 배급소 줄 옆으로 고장 난 기계 계수기와 버려진 공구 상자가 눈에 들어온다. 감독관이 딴청을 피우는 찰나, 어린 손끝이 어떤 길을 고르느냐에 따라 앞으로의 생존 방식이 갈릴 것이다.",
    choices: [
      {
        label: "[민첩 판정] 감독관의 시선을 피해 버려진 공구와 예비 배급표를 재빨리 챙긴다",
        check: { stat: "Ag", diff: 10 },
        success: {
          text: "들키지 않고 묵직한 공구와 이틀 치 식량을 손에 넣었다! 제국 하층에서 살아남는 약삭빠른 감각이 일찍 눈떴다.",
          stats: { Ag: 5, Int: 3 },
          addTags: ["streetwise"]
        },
        fail: {
          text: "경비 서비터의 경고음에 놀라 달아나다 무릎을 심하게 긁혔다. 도둑질도 요령이 필요하다는 뼈아픈 교훈을 얻었다.",
          wounds: -8,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[지성 판정] 삐걱거리는 배급 계수기의 태엽을 손봐 길드 견습공의 눈에 띈다",
        check: { stat: "Int", diff: 10 },
        success: {
          text: "멈춰 있던 계수기가 다시 돌아가자 길드 감독관이 감탄하며 따뜻한 식량과 함께 칭찬을 건넸다!",
          stats: { Int: 5, Fel: 3, Inf: 3 }
        },
        fail: {
          text: "태엽이 튕겨 나와 손가락을 찧고 호통을 들었으나, 기계 구조를 들여다본 경험만은 남았다.",
          wounds: -6,
          stats: { Int: 2 }
        }
      },
      {
        label: "줄을 지키며 차례를 기다려 가족과 나눌 배급 식량을 성실히 받아 든다",
        effect: {
          text: "회색 영양 죽은 텁텁했지만, 정직하게 버텨 내는 인내심이 어린 몸에 단단히 자리 잡았다.",
          stats: { T: 4, WP: 3 }
        }
      }
    ],
    source: "Imperium Maledictum / Warhammer 40k Hive Daily Life"
  },
  {
    id: "ev_s2_child_blackship_sky",
    title: "유년기 — 궤도를 가로지른 검은 함선의 그림자",
    category: "유년기",
    once: true,
    req: { minAge: 6, maxAge: 13, excludeWorldTags: ["feral", "krieg"] },
    reqLabel: "6~13세 · 비야만 행성 유년기",
    weight: 30,
    text: "갑자기 하늘빛이 서늘하게 가라앉더니, 구름 너머로 거대한 검은 전함들이 정박하는 그림자가 드리워졌다. 어른들은 '아뎁투스 아스트라 텔레파티카의 검은 함선이 십일조를 거두러 왔다'며 굳은 얼굴로 아퀼라 성호를 긋는다.",
    choices: [
      {
        label: "[의지 판정] 공포에 숨지 않고 성당 광장에 서서 황제 찬송가를 목청껏 따라 부른다",
        check: { stat: "WP", diff: 10 },
        success: {
          text: "어린 나이에도 흔들리지 않는 눈빛을 본 사제가 머리에 손을 얹고 축복을 내렸다! 강인한 신심이 싹텄다.",
          stats: { WP: 5 },
          faith: 10
        },
        fail: {
          text: "궤도에서 내려오는 사이킥 억제 파동에 어지럼증을 느껴 주저앉았으나, 곧 정신을 추슬렀다.",
          wounds: -6,
          stats: { WP: 2 }
        }
      },
      {
        label: "[지성 판정] 검은 함선의 문장과 호송 대열의 규율을 유심히 관찰하며 제국의 체계를 익힌다",
        check: { stat: "Int", diff: 10 },
        success: {
          text: "수백만 행성을 묶어 세우는 제국 기구의 냉엄한 이치를 어린 머릿속에 또렷이 새겼다.",
          stats: { Int: 5, WP: 3 }
        },
        fail: {
          text: "아르비테스 순찰대의 매서운 호통에 놀라 골목으로 뒷걸음질쳤다.",
          stats: { Ag: 2, Int: 2 }
        }
      },
      {
        label: "어른들의 당부대로 창문을 닫고 검은 함선이 성계를 떠날 때까지 조용히 숨을 죽인다",
        effect: {
          text: "제국에서는 눈에 띄지 않는 것이 가장 안전한 처세다. 무사히 불길한 주간을 넘겼다.",
          stats: { T: 3, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: League of Blackships"
  },
  {
    id: "ev_s2_child_schola_duel",
    title: "유년기 — 스콜라 프로제니움의 교관 회초리와 기숙사 서열",
    category: "유년기",
    once: true,
    req: { minAge: 7, maxAge: 13, allTags: ["schola"] },
    reqLabel: "7~13세 · 스콜라 프로제니움 생도",
    weight: 38,
    text: "스콜라 프로제니움의 차가운 석조 기숙사에서 상급 생도들이 신입 기수의 구두를 빼앗으며 복종을 강요한다. 드릴 아보트 교관은 '약자는 황제의 엘리트 자리를 차지할 자격이 없다'며 못 본 척 팔짱을 끼고 있다.",
    choices: [
      {
        label: "[백병 판정] 훈련용 목검을 들고 상급생의 도발에 정면으로 맞서 결투를 벌인다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "코피를 터뜨리면서도 끝내 상급생을 바닥에 눕혔다! 교관이 처음으로 입꼬리를 올리며 그대의 이름을 수첩에 적었다.",
          stats: { WS: 6, WP: 4, Inf: 4 }
        },
        fail: {
          text: "체격 차이에 밀려 호되게 두들겨 맞았으나, 눈빛만은 꺾이지 않아 동기들의 존중을 얻었다.",
          wounds: -10,
          stats: { T: 3, WS: 2 }
        }
      },
      {
        label: "[의지 판정] 연대 책임 체벌을 자청해 동기들 대신 차가운 성당 돌바닥에 밤새 무릎을 꿇는다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "혹독한 추위를 눈 하나 깜짝 않고 버텨 내자 상급생들마저 혀를 내둘렀다! 타고난 지휘관의 기개가 드러났다.",
          stats: { WP: 6, Fel: 5 },
          faith: 6
        },
        fail: {
          text: "새벽 무렵 저체온으로 쓰러져 의무실에 실려 갔으나, 의리만큼은 기숙사 전체에 각인되었다.",
          wounds: -8,
          stats: { WP: 3 }
        }
      },
      {
        label: "쓸데없는 다툼을 피하고 밤새 제국 전술 교본과 성가를 완벽히 암송해 성적으로 압도한다",
        effect: {
          text: "다음 날 구술 시험에서 단 한 글자도 틀리지 않아 교관의 호평을 받았다.",
          stats: { Int: 4, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Schola Progenium"
  },
  {
    id: "ev_s2_child_noble_tutor",
    title: "유년기 — 첨탑 저택의 가정교사와 독이 든 과자 상자",
    category: "유년기",
    once: true,
    req: { minAge: 7, maxAge: 13, allTags: ["noble"], excludeTags: ["schola"], excludeWorlds: ["krieg"] },
    reqLabel: "7~13세 · 귀족 가문 유년기",
    weight: 36,
    text: "상층 첨탑의 호화로운 저택 서재로 방계 숙부가 보낸 고급 설탕 과자 상자가 도착했다. 귀족 가문의 어린 후계자에게 호의는 언제나 칼날을 품고 있는 법이다.",
    choices: [
      {
        label: "[지성 판정] 은수저와 향기만으로 과자 속 미세한 독약을 간파해 가문 경비대에 고발한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "가문 약사가 독 성분을 확인하자 가주가 크게 경탄하며 그대를 조기 후계자 교육 과정에 올렸다!",
          stats: { Int: 6, Inf: 6, WP: 3 }
        },
        fail: {
          text: "독은 없었으나 지나친 경계심 탓에 작은 소동이 벌어졌다. 그래도 가문 어른들은 방심하지 않는 태도를 나쁘게 보지 않았다.",
          stats: { Int: 2, Fel: -2, WP: 2 }
        }
      },
      {
        label: "[교섭 판정] 가문 연회에서 유창한 하이 고딕 인사법으로 유력 길드 후원자의 환심을 산다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "'이 아이는 장차 성계를 호령할 재목이군!' 어른들의 찬사 속에 일찍부터 귀족 사교계의 감각을 터득했다.",
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "예법 호칭을 한 마디 헷갈려 가정교사의 냉엄한 꾸중을 들었으나 귀한 공부가 되었다.",
          stats: { Fel: 2, Int: 2 }
        }
      },
      {
        label: "화려한 과자와 사교 대신 가문 무기고에서 검술 사범에게 몰래 칼 다루는 법을 익힌다",
        effect: {
          text: "비단옷에 땀을 적시며 쥔 연습용 레이피어가 장차 목숨을 지킬 든든한 밑천이 되었다.",
          stats: { WS: 4, Ag: 4 }
        }
      }
    ],
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "ev_s2_child_feral_trial",
    title: "유년기 — 야만 행성의 첫 밤사냥과 뼈 부적",
    category: "유년기",
    once: true,
    req: { minAge: 7, maxAge: 13, anyWorldTags: ["feral", "death"], excludeWorlds: ["krieg"] },
    reqLabel: "7~13세 · 야만/죽음 행성 유년기",
    weight: 36,
    text: "성인식까지는 아직 몇 해가 남았지만, 부족의 아이들은 열 살 안팎이면 횃불 하나만 들고 정착지 바깥 암벽에서 홀로 첫 밤을 버텨야 한다. 어둠 속에서 포식자의 울음이 메아리친다.",
    choices: [
      {
        label: "[강인 판정] 불씨가 꺼진 뒤에도 떨지 않고 차가운 바위 절벽을 새벽까지 지켜 낸다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "서리가 내린 아침, 굳건히 걸어 내려온 그대의 목에 부족 장로가 맹수 이빨 부적을 걸어 주었다!",
          stats: { T: 6, WP: 5 }
        },
        fail: {
          text: "독충에 물려 열병을 앓으며 겨우 귀환했으나, 덕분에 야생 독기에 대한 저항력이 한층 강해졌다.",
          wounds: -10,
          stats: { T: 3 }
        }
      },
      {
        label: "[민첩 판정] 돌창을 깎아 어둠 속 맹수의 발자국을 추적해 작은 사냥감을 잡아 돌아온다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "어린 사냥꾼의 민첩한 솜씨에 부족 전사들이 환호하며 모닥불 옆 상석을 내어 주었다!",
          stats: { Ag: 5, WS: 5, BS: 3 }
        },
        fail: {
          text: "가시덤불에 발을 헛디뎌 상처를 입었으나, 맹수의 시야를 따돌리는 법을 몸으로 익혔다.",
          wounds: -9,
          stats: { Ag: 3 }
        }
      },
      {
        label: "부족 주술사 곁에서 '별 너머 하늘의 신황제'에 관한 고대 구전을 밤새 귀담아듣는다",
        effect: {
          text: "투박한 신화 속에서도 황금 옥좌의 빛을 향한 경외심이 어린 가슴에 깊이 뿌리내렸다.",
          stats: { WP: 4 },
          faith: 8
        }
      }
    ],
    source: "Dark Heresy: Feral World Origin"
  },
  {
    id: "ev_s2_child_forge_spark",
    title: "유년기 — 포지 신전의 첫 성유 세례와 기계령의 속삭임",
    category: "유년기",
    once: true,
    req: {
      minAge: 7,
      maxAge: 13,
      or: [{ allTags: ["mechanicus_blood"] }, { anyWorldTags: ["forge", "mechanicus"] }],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "7~13세 · 기계교 도제/포지 월드 유년기",
    weight: 36,
    text: "거대한 증기 프레스가 굉음을 내는 하층 포지 공방에서 보조 톱니바퀴 하나가 불꽃을 튀기며 멈춰 섰다. 선임 테크프리스트의 광학 렌즈가 어린 도제들을 차갑게 훑는다.",
    choices: [
      {
        label: "[지성 판정] 축성 성유를 붓고 배운 대로 이진법 진정 기도문을 읊어 기계령을 되살린다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "톱니가 매끄럽게 다시 맞물리며 가동되었다! 테크프리스트가 '옴니시아의 감각이 깃든 아이'라며 상급 견습 반에 추천했다.",
          stats: { Int: 6, Inf: 4 },
          faith: 4
        },
        fail: {
          text: "전류 스파크에 손끝을 데어 뒤로 물러났으나, 기계령의 까다로운 성질을 일찍 체감했다.",
          wounds: -8,
          stats: { Int: 2 }
        }
      },
      {
        label: "[강인 판정] 뜨거운 용광로 열기를 견디며 12시간 연속 예비 부품 운반을 완수한다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "어른도 지쳐 쓰러질 열기 속에서 한 번도 쓰러지지 않아 포지 감독관의 인정을 받았다.",
          stats: { T: 5, BS: 3 }
        },
        fail: {
          text: "열기에 탈진해 쓰러졌으나, 차가운 강철 바닥 위에서 육신의 나약함을 절감했다.",
          wounds: -9,
          stats: { T: 2 }
        }
      },
      {
        label: "선임 견습생의 뒤를 조용히 따르며 '육신은 약하고 강철은 영원하다'는 첫 교리를 필사한다",
        effect: {
          text: "기름때 묻은 양피지 위에 옴니시아의 교리가 반듯하게 새겨졌다.",
          stats: { Int: 4, WP: 3 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Imperium Maledictum"
  },
  {
    id: "ev_s2_child_krieg_vat",
    title: "유년기 — 크리그 지하 훈련소의 방독면 적합 시험",
    category: "유년기",
    once: true,
    req: { minAge: 6, maxAge: 13, anyHomeWorlds: ["krieg"] },
    reqLabel: "6~13세 · 크리그 출생 유년기",
    weight: 40,
    text: "비타-움 배양실에서 깨어나 지정 번호를 부여받은 뒤 몇 해가 지났다. 오늘 지하 훈련소 교관은 어린 후보생 전원을 모의 독가스 밀실로 몰아넣고, 어른 크기 라스건과 낡은 방독면 필터 하나씩을 던져 주었다.",
    choices: [
      {
        label: "[강인 판정] 필터가 절반쯤 막힌 숨 막히는 가스실에서도 부동자세를 흐트러뜨리지 않고 버틴다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "교관이 기록판에 '우수 소모 자원 — 척탄병 적성'이라 기입했다. 고통을 묵묵히 견디는 크리그의 영혼이 빚어졌다.",
          stats: { T: 6, WP: 5 },
          faith: 6
        },
        fail: {
          text: "모의 자극 가스에 폐가 타는 듯한 기침을 쏟았으나, 끝까지 방독면을 벗지 않고 버텨 냈다.",
          wounds: -10,
          stats: { T: 3, WP: 2 }
        }
      },
      {
        label: "[사격 판정] 무거운 라스건을 어깨에 단단히 받치고 모의 반역자 표적의 정중앙을 꿰뚫는다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "열 발 연속 정중앙 명중! 교관이 말없이 새 탄창을 지급하며 다음 참호 조준 훈련으로 넘겼다.",
          stats: { BS: 6, WS: 3 }
        },
        fail: {
          text: "반동에 어깨를 멍들었으나, 다시 총을 고쳐 쥐고 사격 자세를 교정했다.",
          wounds: -6,
          stats: { BS: 3 }
        }
      },
      {
        label: "지정 번호를 복창하며 묵묵히 참호 삽질과 속죄 교리 암송을 완수한다",
        effect: {
          text: "크리그의 아이에게 이름이나 안락은 필요 없다. 오직 황제께 바칠 속죄의 날을 준비할 뿐이다.",
          stats: { T: 3, WP: 4 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Death Korps of Krieg / Imperial Armour"
  },
  {
    id: "ev_s2_child_void_hull",
    title: "유년기 — 성간 함선의 공허 창문과 중력 격벽의 아이들",
    category: "유년기",
    once: true,
    req: { minAge: 6, maxAge: 13, or: [{ allTags: ["voidborn"] }, { anyWorldTags: ["voidborn"] }] },
    reqLabel: "6~13세 · 보이드본 함선 유년기",
    weight: 36,
    text: "거대한 성간 함선의 하층 갑판에서 워프 도약 예비 경보가 울렸다. 중력 발생기가 잠시 흔들리며 아이들이 공중으로 붕 뜨는 사이, 격벽 너머 창문으로 기괴한 빛이 번쩍인다.",
    choices: [
      {
        label: "[민첩 판정] 저중력 환기 통로를 날렵하게 헤엄쳐 비상 산소 밸브를 제때 잠근다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "갑판장도 놓친 미세 누출을 어린 몸으로 막아 냈다! 선원들이 진짜 보이드본의 핏줄이라며 등을 두드렸다.",
          stats: { Ag: 6, Int: 4 }
        },
        fail: {
          text: "격벽 모서리에 이마를 부딪쳐 피가 났으나, 무중력에서 몸을 가누는 감각을 체득했다.",
          wounds: -8,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[의지 판정] 워프 창문을 바라보지 말고 눈을 감으라며 겁에 질린 갑판 아이들을 진정시킨다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "겔러 필드의 가호를 함께 읊조리는 사이 도약이 무사히 끝났다. 함선 사제가 그대의 담력을 높이 샀다.",
          stats: { WP: 5, Fel: 4 },
          faith: 6
        },
        fail: {
          text: "잠깐 스친 워프 빛에 지독한 악몽을 꿨으나, 곧 정신을 차리고 함선 규율을 새겼다.",
          wounds: -6,
          corruption: 3
        }
      },
      {
        label: "선배 갑판원 곁에 꼭 붙어 선체 진동 소리로 엔진 상태를 분별하는 법을 배운다",
        effect: {
          text: "행성의 땅은 밟아 보지 못했어도 강철 함선의 맥박만큼은 누구보다 잘 이해하게 되었다.",
          stats: { Int: 3, T: 3, Ag: 2 }
        }
      }
    ],
    source: "Dark Heresy / Rogue Trader: Voidborn"
  },

  // 7-2. 노년기(55세+) 및 초장수기(100세+) 서사 사건 (6종)
  {
    id: "ev_s2_elder_mortal_twilight",
    title: "노년기 — 닳아 버린 관절과 늙은 종복의 회고",
    category: "노년기",
    once: true,
    req: { minAge: 55, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought", "rejuvenat"] },
    reqLabel: "55세+ · 필멸자 노년기",
    weight: 34,
    text: "거울 속 머리칼은 어느새 서리처럼 하얗게 세었고, 비가 내리는 날이면 수십 년 전 입은 상처와 굳은 관절이 욱신거린다. 인류제국에서 쉰다섯을 넘겨 살아남았다는 사실 자체가 이미 드문 기적이다.",
    choices: [
      {
        label: "[의지 판정] 쑤시는 노구를 달래며 젊은 후배들에게 평생 체득한 생존과 실무의 요령을 전수한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "경험이 담긴 노장의 한마디가 수많은 신참의 실수를 막아 주었다! 구역 전체에서 존경받는 원로로 자리 잡았다.",
          stats: { WP: 6, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "변화한 젊은 세대의 방식과 부딪쳐 씁쓸한 기분이 들었으나, 진심만은 일부 후배들에게 전해졌다.",
          stats: { WP: 3, Fel: 2 }
        }
      },
      {
        label: "[강인 판정] 아직 황제께 바칠 기력이 남았다며 일선 현장의 자리를 끝까지 물러서지 않는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "젊은이들도 혀를 내두르는 노익장으로 임무를 완수해 냈다! 쇠락 앞에서도 고개 숙이지 않는 긍지다.",
          stats: { T: 5, WP: 5, Inf: 4 },
          wounds: -6
        },
        fail: {
          text: "무리를 하다 호흡이 가빠져 며칠간 몸져누웠다. 세월의 무게가 뼈저리게 다가왔다.",
          wounds: -14,
          stats: { WP: 3 }
        }
      },
      {
        label: "한발 물러나 후방 기록 정리와 조용한 보양으로 남은 생애를 차분히 갈무리한다",
        effect: {
          text: "격렬했던 세월을 뒤로하고 숨을 고르며, 황금 옥좌의 평온이 마지막 날까지 함께하길 기도했다.",
          wounds: 12,
          stats: { WP: 3 },
          faith: 6
        }
      }
    ],
    source: "Imperium Maledictum / Warhammer 40k Mortal Life"
  },
  {
    id: "ev_s2_elder_rejuvenat_solitude",
    title: "장수기 — 리주버냇의 고독, 모든 옛 벗이 흙으로 돌아간 뒤",
    category: "장수기",
    once: true,
    req: { minAge: 65, allTags: ["rejuvenat"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "65세+ · 리주버냇 수명 연장자",
    weight: 38,
    text: "값비싼 리주버냇 수명 연장 시술 덕에 그대의 얼굴은 여전히 중년의 윤기를 유지하고 있다. 하지만 오늘 아침 도착한 마지막 옛 동기의 부고장 앞에서, 함께 젊은 날을 보낸 평범한 벗들이 이제 단 한 명도 남지 않았다는 사실을 깨달았다.",
    choices: [
      {
        label: "[교섭 판정] 옛 벗들의 손주 세대를 불러 모아 지난 시대의 기억을 들려주며 새로운 인연을 잇는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "세월이 흘러도 인연은 다음 세대로 이어진다. 젊은 후손들의 눈빛 속에서 떠난 벗들의 웃음을 다시 보았다.",
          stats: { Fel: 6, Inf: 7, WP: 4 }
        },
        fail: {
          text: "세대 간의 거리감은 쉽게 좁혀지지 않았으나, 가문과 조직의 원로로서 예우는 굳건히 지켰다.",
          stats: { Inf: 4, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 필멸의 감상을 끊어 내고 한 세기를 내다보는 장기 안목으로 권력과 정책을 설계한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "짧은 생을 사는 자들은 결코 보지 못하는 수십 년 단위의 흐름을 꿰뚫어 거대한 권위를 구축했다!",
          stats: { Int: 7, Inf: 8, Fel: -3 }
        },
        fail: {
          text: "지나치게 냉혹한 태도가 주변의 반감을 사 한동안 고립감이 더 짙어졌다.",
          stats: { Int: 3, Fel: -4 }
        }
      },
      {
        label: "먼지 낀 장부 속 이미 세상을 떠난 이름들을 한 번씩 부른 뒤 조용히 술잔을 비운다",
        effect: {
          text: "오래 산다는 것은 더 많은 작별을 견딘다는 뜻이다. 고독을 삼키며 다시 내일을 향해 걸어갔다.",
          stats: { WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Rejuvenat / Eisenhorn & Ravenor"
  },
  {
    id: "ev_s2_elder_bionic_humanity",
    title: "기계화의 경계 — 기억 슬롯에서 지워야 할 고향의 냄새",
    category: "장수기",
    once: true,
    req: { minAge: 45, allTags: ["bionic"], excludeTags: ["custodes"] },
    reqLabel: "45세+ · 기계 의체 시술자",
    weight: 34,
    text: "세월과 부상이 쌓이며 육신의 상당 부분이 차가운 강철과 전선으로 대체되었다. 보조 연산 칩을 증설하던 테크프리스트가 묻는다. '비효율적인 어린 시절의 감각 기억과 슬픔의 회로를 삭제하시겠습니까? 연산 효율이 14퍼센트 상승합니다.'",
    choices: [
      {
        label: "[지성 판정] 불필요한 감정 회로를 절제하고 연산 코어를 증설해 강철의 완벽에 다가선다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "두려움도 망설임도 사라진 냉철한 지성이 깨어났다! 육신의 쇠락마저 늦추며 기계적 효율을 극대화했다.",
          stats: { Int: 8, WP: 5, Fel: -5 },
          lifeBonusExtra: 12
        },
        fail: {
          text: "신경 접합부가 거부 반응을 일으켜 극심한 두통을 앓았으나, 보조 연산 장치만은 무사히 안착했다.",
          wounds: -12,
          stats: { Int: 4, Fel: -3 }
        }
      },
      {
        label: "[의지 판정] 비효율적일지라도 고향의 바람 냄새와 인간이었던 기억만은 끝까지 삭제하지 않는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 강철 가슴 속에서도 꺼지지 않는 인간성의 온기를 지켜 냈다! 주변 사람들이 그대의 의지에 깊이 감명받았다.",
          stats: { WP: 7, Fel: 5 },
          faith: 6
        },
        fail: {
          text: "신경 간섭으로 일부 기억이 흐릿해졌으나, 소중한 이름 몇 개만은 끝내 붙들어 두었다.",
          wounds: -8,
          stats: { WP: 4 }
        }
      },
      {
        label: "기억에 손을 대지 말고 낡은 의체 관절의 윤활유와 동력 셀만 차분히 교체한다",
        effect: {
          text: "강철은 도구일 뿐 주인이 아니다. 피와 기계 사이의 균형을 묵묵히 지켜 냈다.",
          stats: { T: 4, Int: 3 },
          wounds: 8
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Rite of Pure Thought"
  },
  {
    id: "ev_s2_centenarian_mortal_lineage",
    title: "초장수기 — 백 년 전 전우의 증손자를 마주하다",
    category: "장수기",
    once: true,
    req: {
      minAge: 100,
      or: [
        { allTags: ["astartes"] },
        { allTags: ["custodes"] },
        { allTags: ["grey_knight"] },
        { allTags: ["rejuvenat"] },
        { allTags: ["magos"] }
      ]
    },
    reqLabel: "100세+ · 초장수기",
    weight: 42,
    text: "백 년을 훌쩍 넘겨 살아온 그대의 앞에 낯익은 성씨와 가문 문장을 단 젊은 장교가 경례를 올린다. 알고 보니 한 세기 전 피비린내 나는 공성전에서 그대의 등 뒤를 지켜 주었던 필멸자 전우의 증손자였다.",
    choices: [
      {
        label: "[교섭 판정] 백 년 전 선조가 보여 주었던 용기를 직접 증언해 젊은 후손의 가슴에 긍지를 심어 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'그대의 증조부는 불바다 속에서도 단 한 발짝도 물러서지 않았다.' 눈시울을 붉힌 젊은 장교가 선조에 부끄럽지 않은 헌신을 맹세했다!",
          stats: { Fel: 6, Inf: 7 },
          faith: 8
        },
        fail: {
          text: "세월을 초월한 존재의 위압감에 젊은이가 얼어붙었으나, 잊혀 가던 선조의 명예만은 확실히 전해졌다.",
          stats: { Inf: 4, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 필멸자의 삶이 불꽃처럼 짧다는 냉엄한 진리를 되새기며 수호자의 영원한 의무를 다짐한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "수많은 세대가 스러져도 제국은 계속 이어져야 한다. 시간의 흐름조차 흔들지 못하는 초연한 의지가 완성되었다.",
          stats: { WP: 8, Int: 4 }
        },
        fail: {
          text: "지나간 세월의 무게가 잠시 어깨를 눌렀으나, 곧 냉철한 평정심을 되찾았다.",
          stats: { WP: 4 }
        }
      },
      {
        label: "백 년 전 전역의 낡은 약장을 조용히 후손의 손에 쥐여 주고 말없이 돌아선다",
        effect: {
          text: "긴 말은 필요 없다. 손바닥에 남은 차가운 금속의 무게가 한 세기를 건너 두 사람을 이었다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Warhammer 40k Lore / Space Marine & Rejuvenat Longevity"
  },
  {
    id: "ev_s2_centenarian_ancient_scars",
    title: "초장수기 — 두 세기 전 전장의 파편과 세대의 간극",
    category: "장수기",
    once: true,
    req: { minAge: 140, anyTags: ["astartes", "custodes", "grey_knight", "dreadnought"] },
    reqLabel: "140세+ · 초인 고참기",
    weight: 42,
    text: "어느덧 한 세기 반을 살아온 고참 전사가 되었다. 요즘 배치되는 신세대 형제들은 그대가 젊은 날 피를 흘렸던 전쟁을 고대 역사서 속 일화처럼 이야기한다. 오래된 갑주의 흉터 하나하나가 이제는 살아 있는 전설이다.",
    choices: [
      {
        label: "[백병 판정] 신세대 전사들에게 수백 년 전 잊혀진 고대 검술과 포위 돌파 전법을 직접 몸으로 가르친다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "백전노장의 빈틈없는 일격에 젊은 전사들이 탄성을 터뜨렸다! 그대의 기량이 새로운 세대의 칼날로 계승되었다.",
          stats: { WS: 6, Inf: 8, Fel: 4 }
        },
        fail: {
          text: "격렬한 시범 도중 오래된 고질 상처가 잠시 욱신거렸으나, 후배들의 존경심은 조금도 줄지 않았다.",
          wounds: -10,
          stats: { WS: 3, Inf: 4 }
        }
      },
      {
        label: "[지성 판정] 챕터와 황궁 서고에 수 세기 동안 직접 목격한 전역의 교훈을 구술해 영구 기록으로 남긴다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "그대의 구술 전술서가 서고 핵심 교본으로 등재되어 앞으로 천 년간 후배들의 지침이 되었다!",
          stats: { Int: 7, Inf: 7, WP: 4 }
        },
        fail: {
          text: "너무 오래된 기억의 일부 연도가 엇갈렸으나, 전장의 본질을 담은 기록만은 빛을 발했다.",
          stats: { Int: 4, Inf: 3 }
        }
      },
      {
        label: "오래된 무구와 갑주의 긁힌 자국을 정비하며 숨이 붙어 있는 한 끝없이 싸우리라 다짐한다",
        effect: {
          text: "세월은 육신에 흉터를 남겼지만, 황제를 향한 서약에는 단 하나의 흠집도 내지 못했다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s2_elder_veteran_story",
    title: "노년기 — 출정 전야의 늙은 참전용사와 신병들의 눈빛",
    category: "노년기",
    once: true,
    req: {
      minAge: 55,
      anyTags: ["militarum", "navy", "officer", "commissar", "arbites"],
      excludeTags: ["astartes", "custodes", "grey_knight", "heretic"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "55세+ · 제국 무관·치안 노병",
    weight: 34,
    text: "전선 출정을 하루 앞둔 주둔지 주점에서 앳된 신병들이 잔뜩 긴장한 얼굴로 늙은 백전노장인 그대의 주변으로 모여든다. '선배님, 진짜 첫 전투에 들어가면 어떻게 살아남습니까?'",
    choices: [
      {
        label: "[교섭 판정] 영웅담 대신 라스건 습기 관리와 포격 시 엎드리는 실전 요령을 꼼꼼히 가르쳐 준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "신병들의 덜덜 떨리던 손이 진정되었다. 그대의 실질적인 조언이 내일 전장에서 몇 명의 목숨은 틀림없이 구할 것이다.",
          stats: { Fel: 6, Int: 5, Inf: 5 }
        },
        fail: {
          text: "잔소리가 길어져 신병들이 다소 주눅 들었으나, 중요한 수칙 몇 가지는 단단히 새겨 두었다.",
          stats: { Int: 3, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 전쟁의 화려한 선전 뒤에 가려진 참호의 진흙과 전우애의 무게를 담담히 들려준다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "거짓 없는 노병의 고백이 헛된 허세를 걷어 내고 진짜 용기를 일깨웠다.",
          stats: { WP: 7 },
          faith: 6
        },
        fail: {
          text: "오래전 잃은 전우들의 얼굴이 떠올라 잠시 말을 잇지 못했으나, 신병들은 조용히 경례로 화답했다.",
          stats: { WP: 4 }
        }
      },
      {
        label: "빈 잔을 내려놓고 내일 떠날 신병들의 등 뒤로 말없이 아퀼라 성호를 그어 준다",
        effect: {
          text: "부디 이들 중 절반이라도 살아서 돌아오기를. 노병의 짧은 기도가 주점의 소음 속으로 스며들었다.",
          stats: { WP: 4 },
          faith: 5
        }
      }
    ],
    source: "Only War / Gaunt's Ghosts"
  },

  // 7-3. 소외 직군 보강 분기 사건 (11종)
  {
    id: "ev_s2_cultist_cell",
    title: "카오스 컬티스트 — 하층 하이브의 지하 교단 포섭",
    category: "오염",
    once: true,
    req: { anyCareers: ["chaos_cultist"] },
    reqLabel: "병종: 카오스 컬티스트",
    weight: 34,
    text: "18시간 교대 노동과 시체 녹말 배급에 지친 하층 하이브 공장 인부들 사이에 절망이 짙게 깔려 있다. 어둠의 교단을 키울 절호의 토양이지만, 아르비테스 밀정이 섞여 있을 위험도 크다.",
    choices: [
      {
        label: "[교섭 판정] 제국의 거짓된 구원을 폭로하고 암흑 신의 해방을 설파해 수십 명 규모의 지하 세포를 구축한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "절망한 인부들이 팔각별 아래 무릎 꿇고 비밀 서약을 맺었다! 교단의 영향력이 구역 전체로 번져 나간다.",
          stats: { Fel: 7, Inf: 8 },
          corruption: 8
        },
        fail: {
          text: "인부 중 한 명이 아르비테스에 밀고해 집회소가 급습당했다. 피를 흘리며 겨우 탈출했다.",
          wounds: -16,
          corruption: 5
        }
      },
      {
        label: "[지성 판정] 치안국 순찰 시간표와 부패한 하급 서기관을 포섭해 교단 거점을 완벽히 위장한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "합법적인 구호 단체로 위장한 비밀 예배당이 완성되었다! 이단 감찰의 눈을 완벽히 따돌렸다.",
          stats: { Int: 7, Ag: 4, Inf: 6 },
          corruption: 6
        },
        fail: {
          text: "서기관이 겁을 먹고 자수하는 바람에 거점을 버리고 하수구로 급히 옮겨야 했다.",
          wounds: -14,
          stats: { Inf: -4 }
        }
      },
      {
        label: "무리하게 조직을 불리지 않고 소규모 비밀 제단만 유지하며 밤마다 금지된 표식을 퍼뜨린다",
        effect: {
          text: "작지만 들키지 않는 불씨가 어둠 속에서 서서히 행성의 기반을 갉아먹기 시작했다.",
          stats: { WP: 4, Ag: 3 },
          corruption: 8
        }
      }
    ],
    source: "Dark Heresy: Disciples of the Dark Gods / Black Crusade"
  },
  {
    id: "ev_s2_cultist_warband",
    title: "카오스 컬티스트 — 반역자 워밴드의 강림과 잔혹한 거래",
    category: "오염",
    once: true,
    req: { anyCareers: ["chaos_cultist"], minAge: 18 },
    reqLabel: "병종: 카오스 컬티스트 · 18세+",
    weight: 34,
    text: "교단의 소환 신호에 응답해 궤도에서 가시 돋친 강습정이 내려왔다! 1만 년 증오에 절은 반역자 카오스 스페이스 마린 워밴드 군주가 필멸자 교단원들을 소모품 보듯 내려다보며 방어 포대 좌표를 요구한다.",
    choices: [
      {
        label: "[권위 판정] 행성 대공 포대의 비밀 암호 코드를 넘기는 대가로 워밴드 산하 교단 총지휘권을 협상한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "반역자 군주가 거칠게 웃으며 그대의 담력을 인정했다! 카오스 무기와 막대한 배교자 지휘권을 하사받았다.",
          stats: { Inf: 10, WS: 5, BS: 5 },
          corruption: 10
        },
        fail: {
          text: "'벌레 주제에 흥정을 거는가!' 반역자 마린의 파워 피스트에 내동댕이쳐져 갈비뼈가 부러진 채 명령을 받들어야 했다.",
          wounds: -24,
          stats: { Inf: -4 },
          corruption: 8
        }
      },
      {
        label: "[민첩 판정] 워밴드가 교단을 미끼로 던질 속셈임을 간파하고 궤도 폭격 직전에 핵심 신도들과 빠져나온다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "예상대로 선봉에 선 필멸자 부대가 몰살당하는 사이, 그대는 무사히 약탈 물자를 챙겨 살아남았다!",
          stats: { Ag: 7, Int: 6 },
          corruption: 6
        },
        fail: {
          text: "탈출 도중 반역자 척후병의 볼터 사격에 중상을 입고 간신히 잔해 속으로 숨어들었다.",
          wounds: -22,
          corruption: 8
        }
      },
      {
        label: "거대한 뿔 투구의 워밴드 전사들 앞에서 납작 엎드려 선봉 보급 임무를 묵묵히 받든다",
        effect: {
          text: "악마의 전사들 발밑에서 살아남는 유일한 길은 쓸모를 증명하는 것뿐이다. 상처투성이로 목숨을 부지했다.",
          stats: { T: 5, WS: 4 },
          wounds: -12,
          corruption: 10
        }
      }
    ],
    source: "Black Crusade / Codex: Chaos Space Marines"
  },
  {
    id: "ev_s2_cultist_apotheosis",
    title: "카오스 컬티스트 — 승천의 제단과 카오스 스폰의 벼랑",
    category: "오염",
    once: true,
    req: { anyCareers: ["chaos_cultist"], minCorruption: 50 },
    reqLabel: "병종: 카오스 컬티스트 · 오염도 50+",
    weight: 38,
    text: "피와 촛농으로 물든 지하 제단 위로 워프의 축복이 폭포처럼 쏟아져 내린다. 모든 배교자가 꿈꾸는 '데몬 프린스 승천'의 문턱이지만, 필멸자의 육신이 그 힘을 버티지 못하면 이성을 잃은 끔찍한 카오스 스폰으로 붕괴할 뿐이다.",
    choices: [
      {
        label: "[의지 판정] 폭주하는 암흑의 축복을 철의 자아로 억눌러 변이를 제어하고 어둠의 투사로 각성한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "뼈가 뒤틀리는 고통 끝에 자아를 지켜 냈다! 필멸자의 한계를 뛰어넘은 어둠의 투사로 거듭났다.",
          stats: { WP: 9, WS: 7, T: 6 },
          woundsBonus: 15,
          corruption: 8
        },
        fail: {
          text: "팔과 등이 기괴하게 부풀어 오르며 이성이 흔들렸다! 간신히 의식을 붙잡았으나 육신이 크게 망가졌다.",
          wounds: -28,
          stats: { T: -4 },
          corruption: 16
        }
      },
      {
        label: "[지성 판정] 과도한 변이가 곧 파멸임을 계산하고 의식진 외곽으로 힘을 분산해 안전하게 일부만 취한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "암흑 신들의 변덕스러운 함정을 영리하게 피해 내며 지혜와 제어력을 동시에 챙겼다!",
          stats: { Int: 7, WP: 5 },
          corruption: -8
        },
        fail: {
          text: "의식진이 역류해 제단이 폭발하며 심각한 워프 화상을 입었다.",
          wounds: -20,
          corruption: 12
        }
      },
      {
        label: "승천의 제단에서 한 발 물러서서 인간의 형상과 이성만은 끝까지 잃지 않으려 버틴다",
        effect: {
          text: "신들의 비웃음이 귓가를 스쳤지만, 괴물이 되지 않은 채 스스로의 의지로 밤을 버텨 냈다.",
          stats: { WP: 4 },
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Chaos Spawn / Black Crusade"
  },
  {
    id: "ev_s2_gk_titan_hall",
    title: "그레이 나이트 — 타이탄 요새의 영웅의 전당과 네메시스 각성",
    category: "그레이 나이트",
    once: true,
    req: { anyCareers: ["grey_knight"] },
    reqLabel: "병종: 그레이 나이트",
    weight: 36,
    text: "토성의 위성 타이탄에 자리한 요새 수도원 지하, 백만 명의 악마 진명이 봉인된 수정 서고와 전사한 형제들의 이름이 새겨진 '영웅의 전당'에 소집되었다. 다가올 대원정에 앞서 영혼의 무구를 다시 벼려야 한다.",
    choices: [
      {
        label: "[의지 판정] 수정 서고의 금지된 악마 진명록을 직시하며 티끌 없는 정신 방벽을 세운다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "속삭이는 수천 악마의 저주를 단숨에 침묵시켰다! 666챕터의 살아 있는 방패로서 의지가 한층 견고해졌다.",
          stats: { WP: 9, Int: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "금서에서 새어 나온 사이킥 충격에 코피를 쏟았으나, 단 한 점의 오염도 허락하지 않고 버텨 냈다.",
          wounds: -20,
          stats: { WP: 3 }
        }
      },
      {
        label: "[백병 판정] 은빛 네메시스 포스 할버드에 자신의 사이킥 의지를 주입해 악마 정화 검술을 연마한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "칼날 위로 눈부신 푸른 사이킥 불꽃이 완벽히 공명했다! 어떤 악마의 갑각도 갈라 버릴 경지에 올랐다.",
          stats: { WS: 8, WP: 5, T: 4 }
        },
        fail: {
          text: "포스 회로가 과열되어 장갑 손목에 화상을 입었으나, 교정 의식을 거쳐 무기를 길들였다.",
          wounds: -18,
          stats: { WS: 3 }
        }
      },
      {
        label: "전사한 선배 형제들의 석벽 앞에서 침묵의 기도를 올리며 영원한 순결을 맹세한다",
        effect: {
          text: "'우리는 망치다.' 이름 없이 싸우고 이름 없이 스러지는 666챕터의 긍지가 가슴에 차올랐다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Titan (Moon) / Codex: Grey Knights"
  },
  {
    id: "ev_s2_gk_daemon_banish",
    title: "그레이 나이트 — 워프 균열의 그레이터 데몬 추방전",
    category: "그레이 나이트",
    once: true,
    req: { anyCareers: ["grey_knight"], minAge: 22 },
    reqLabel: "병종: 그레이 나이트 · 22세+",
    weight: 38,
    text: "변방 성지 행성의 대성당 지하에서 거대한 워프 균열이 열리며 산더미 같은 그레이터 데몬이 강림했다! 일반 제국 병사들이 바라보기만 해도 발광하는 지옥 한가운데로, 은빛 터미네이터 형제단이 텔레포트 강습을 개시한다.",
    choices: [
      {
        label: "[의지 판정] 형제단과 함께 666 성가를 합창하며 대악마의 심장에 진명 추방식을 꽂아 넣는다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "찬란한 은빛 섬광과 함께 대악마가 찢어지는 비명을 지르며 워프로 추방되었다! 타이탄의 연대기에 불멸의 전공이 새겨졌다.",
          stats: { WP: 9, WS: 6, Inf: 8 },
          addTags: ["daemon_bane"]
        },
        fail: {
          text: "대악마의 워프 채찍에 흉갑이 찢어지는 중상을 입었으나, 형제들의 합동 영창으로 끝내 균열을 닫았다.",
          wounds: -26,
          stats: { WP: 4 }
        }
      },
      {
        label: "[사격 판정] 축성된 사이캐논과 스톰 볼터의 은빛 탄막으로 악마 호위대를 일제히 소멸시킨다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "은빛 탄환이 워프의 육신을 불태우며 지휘 형제단이 대악마에게 접근할 완벽한 활로를 열었다!",
          stats: { BS: 7, T: 5, Inf: 6 }
        },
        fail: {
          text: "악마 무리의 역습에 포위되어 큰 피해를 입었으나, 이지스 갑주의 가호로 끝까지 전선을 지켰다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "이지스 터미네이터 갑주의 수호 룬을 전개해 균열이 완전히 봉인될 때까지 방벽을 사수한다",
        effect: {
          text: "지옥의 불길이 갑주를 핥았으나 단 한 걸음도 물러서지 않았다. 이윽고 균열은 고요히 닫혔다.",
          stats: { T: 6, WP: 5 },
          wounds: -14
        }
      }
    ],
    source: "Codex: Grey Knights / Lexicanum: Grey Knights"
  },
  {
    id: "ev_s2_custodes_solar_watch",
    title: "아뎁투스 쿠스토데스 — 솔라 워치의 태양계 초계와 침투선 요격",
    category: "쿠스토데스",
    once: true,
    req: { anyCareers: ["adeptus_custodes"] },
    reqLabel: "병종: 아뎁투스 쿠스토데스",
    weight: 36,
    text: "황금 옥좌로 향하는 태양계 관문을 지키는 방패 중대 '솔라 워치'로부터 비상 신호가 울렸다. 소행성대 그림자에 숨어 테라 궤도로 스며들려던 정체불명의 스텔스 강습정이 포착된 것이다.",
    choices: [
      {
        label: "[민첩 판정] 도나투스 제트바이크 편대를 이끌고 적 스텔스선의 추진기를 단신으로 베어 무력화한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "황금빛 유성처럼 적함 선체를 가르며 침투 부대 전원을 10분 만에 제압했다! 태양계의 관문에는 티끌 하나 허락되지 않는다.",
          stats: { Ag: 7, WS: 6, Inf: 7 }
        },
        fail: {
          text: "적함의 자폭 방어 포탑에 어깨 장갑이 크게 긁혔으나, 테라에 닿기 전에 위협을 완벽히 소각했다.",
          wounds: -18,
          stats: { Ag: 3 }
        }
      },
      {
        label: "[지성 판정] 태양계 방위 궤도망의 미세한 통신 잡음을 역추적해 배후 밀수 함선까지 일망타진한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "표면의 침투선뿐 아니라 화성 궤도 외곽에 숨어 있던 공범 화물선까지 한 번에 포위 나포했다!",
          stats: { Int: 7, BS: 5, Inf: 8 }
        },
        fail: {
          text: "배후 함선은 긴급 워프 도약으로 도주했으나, 테라를 노린 침투선 자체는 흔적 없이 파괴했다.",
          wounds: -12,
          stats: { Int: 3 }
        }
      },
      {
        label: "황금 오라미트 갑주를 빛내며 태양계 외곽 요새의 방어망을 빈틈없이 점검하고 경계를 이어 간다",
        effect: {
          text: "만 년 동안 테라의 관문은 단 한 번도 뚫리지 않았다. 그대의 침묵 어린 감시가 그 역사를 잇는다.",
          stats: { WP: 5, T: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Solar Watch / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s2_custodes_inquisitor_clash",
    title: "아뎁투스 쿠스토데스 — 오만한 이단심문관과 마기스테리움 렉스 울티마",
    category: "쿠스토데스",
    once: true,
    req: { anyCareers: ["adeptus_custodes"], minAge: 25 },
    reqLabel: "병종: 아뎁투스 쿠스토데스 · 25세+",
    weight: 36,
    text: "황궁 외곽의 기밀 수사 현장에서 강경파 이단심문관이 로제트를 치켜들며 '황제의 이름으로 이 구역의 통제권과 기밀 문서를 내게 넘기라'고 요구한다. 그러나 아뎁투스 쿠스토데스는 이단심문소마저 초월해 오직 황제 한 분의 명령만 받든다.",
    choices: [
      {
        label: "[권위 판정] 마기스테리움 렉스 울티마의 절대 권한을 선언해 오만한 이단심문관을 단숨에 압도한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "'우리는 황제의 이름으로 말하지 않는다. 우리가 곧 황제의 뜻이다.' 이단심문관이 창백한 얼굴로 로제트를 내리고 물러났다.",
          stats: { Inf: 10, WP: 6, Fel: 4 }
        },
        fail: {
          text: "심문관이 테라 의회에 항의 서한을 올리는 소동이 일었으나, 쿠스토데스의 권한을 꺾을 자는 아무도 없었다.",
          stats: { Inf: 4, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 이단심문관의 성급한 수사가 초래할 외교적 허점을 짚어 내고 필요한 첩보만 정교히 징발한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉철한 논리와 철학적 식견에 심문관마저 고개를 숙이며 모든 수사 자료를 자진 헌납했다.",
          stats: { Int: 8, Inf: 7 }
        },
        fail: {
          text: "길어진 문답 끝에 심문관이 불만을 품고 물러났으나 핵심 기밀만큼은 무사히 회수했다.",
          stats: { Int: 3, Inf: 2 }
        }
      },
      {
        label: "긴 설전을 생략하고 가디언 스피어의 끝으로 경계선을 그어 보이며 냉엄한 침묵으로 물러나게 한다",
        effect: {
          text: "황금 거인의 침묵은 천 마디 훈령보다 무거웠다. 심문소 수행원들이 소리 없이 자리를 비웠다.",
          stats: { WS: 4, WP: 5, Inf: 5 }
        }
      }
    ],
    source: "Lexicanum: Magisterium Lex Ultima / Watchers of the Throne"
  },
  {
    id: "ev_s2_skitarii_noosphere",
    title: "스키타리 — 누스피어(Noosphere) 전술 동기화와 방사능 돌격",
    category: "메카니쿠스",
    once: true,
    req: { anyCareers: ["skitarii"] },
    reqLabel: "병종: 스키타리 병사",
    weight: 34,
    text: "치명적인 방사능 안개가 자욱한 고대 포지 폐허 위로 마고스의 누스피어 전술 데이터망이 쏟아져 들어온다. 일반 인간이라면 몇 분 만에 쓰러질 오염 지대 너머에 적 중장갑과 손상된 고대 코지테이터가 동시에 포착되었다.",
    choices: [
      {
        label: "[사격 판정] 아크 라이플과 라듐 카빈의 조준선을 누스피어 표적망에 동기화해 적 기갑을 정밀 타격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "0.01초 오차 없는 일제 사격이 적 전차의 동력로를 단숨에 관통했다! 마고스가 그대의 전투 연산 효율을 높이 평가했다.",
          stats: { BS: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "전파 교란으로 조준망이 일시 단절되어 파편을 맞았으나, 수동 사격으로 임무를 완수했다.",
          wounds: -18,
          stats: { BS: 3 }
        }
      },
      {
        label: "[강인 판정] 방사능 폭풍 속을 기계 다리로 돌파해 파손된 성스러운 코지테이터를 회수한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "방사선 수치가 경보 한계를 넘었으나 기계화된 육신으로 끝까지 버텨 유물을 온전히 바쳤다!",
          stats: { T: 7, Int: 5, Inf: 6 }
        },
        fail: {
          text: "방사능 폭풍에 생체 장기가 손상되어 긴급 교체 수술을 받아야 했으나 코지테이터 코어만은 지켰다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "마고스의 이진법 명령에 한 치도 어긋남 없이 방어 진지를 사수하며 순수한 기계 효율을 증명한다",
        effect: {
          text: "두려움도 망설임도 없는 완벽한 규율이었다. 옴니시아의 의지가 강철 대열 속에 구현되었다.",
          stats: { T: 4, BS: 4 },
          wounds: -8
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus / Skitarius"
  },
  {
    id: "ev_s2_scion_orbital_drop",
    title: "템페스투스 사이온 — 발키리 고공 강하와 적 사령관 참수",
    category: "군사",
    once: true,
    req: { anyCareers: ["tempestus_scion"] },
    reqLabel: "병종: 템페스투스 사이온",
    weight: 34,
    text: "대공포화가 밤하늘을 찢는 적 요새 상공에서 발키리 수송선의 후방 램프가 열렸다. 템페스터 프라임이 무전으로 짧게 지시한다. '목표는 적 사령부 벙커. 착지 후 90초 안에 지휘 체계를 절단한다.'",
    choices: [
      {
        label: "[사격 판정] 중력 낙하산이 접히자마자 핫샷 라스건 정밀 사격으로 적 사령관과 호위대를 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "단 74초 만에 적 지휘부가 붕괴되었다! 밀리타룸 템페스투스의 정예 기량을 유감없이 증명했다.",
          stats: { BS: 7, Ag: 5, Inf: 6 },
          addTags: ["elite_troop"]
        },
        fail: {
          text: "착지 지점에 매복한 중기관총 사격에 캐러페이스 갑주가 뚫려 중상을 입었으나, 기어이 목표를 사살했다.",
          wounds: -20,
          stats: { BS: 3 }
        }
      },
      {
        label: "[민첩 판정] 야간 연막과 열화상 교란기를 뿌려 적 방공 레이더 기지를 우회 폭파한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "적 대공망이 일순간 먹통이 되며 제국 본대 강습 함대가 무손실로 상륙하는 쾌거를 이루었다!",
          stats: { Ag: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "레이더 폭발 파편에 다리를 다쳤으나 아군 증원군이 도착할 때까지 은폐 지점을 지켜 냈다.",
          wounds: -18,
          stats: { Ag: 2 }
        }
      },
      {
        label: "스콜라 프로제니움의 완벽한 전술 교본대로 지정된 교두보만 한 치 오차 없이 확보한다",
        effect: {
          text: "냉혹하고 무결한 임무 완수였다. 템페스투스 사이온은 칭찬이 아니라 명령을 위해 존재한다.",
          stats: { WP: 5, BS: 4, T: 3 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Lexicanum: Tempestus Scions"
  },
  {
    id: "ev_s2_psyker_sanction_burden",
    title: "생션드 사이커 — 전장의 워프 번개와 억제 고리의 한계",
    category: "사이커",
    once: true,
    req: { anyCareers: ["sanctioned_psyker"] },
    reqLabel: "병종: 생션드 사이커",
    weight: 34,
    text: "적 중전차 부대가 아군 보병 참호를 짓밟기 직전, 연대 지휘관이 무전으로 외친다. '사이커! 지금 당장 워프 화력을 퍼부어 저 쇳덩이들을 멈춰라!' 목에 찬 사이킥 억제 고리가 과열되며 불길한 쇳소리를 낸다.",
    choices: [
      {
        label: "[의지 판정] 워프의 번개를 정밀하게 끌어내려 적 전차를 태워 버리고도 정신 균형을 지켜 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "푸른 섬광이 적 선두 전차 세 대를 단숨에 녹여 버렸다! 경계하던 병사들마저 환호하며 그대를 영웅처럼 바라보았다.",
          stats: { WP: 8, Int: 5, Inf: 6 },
          corruption: -5
        },
        fail: {
          text: "워프 에너지가 역류해 코와 귀에서 피가 터져 나왔고, 잠시 악마의 웃음소리가 머릿속을 할퀴었다.",
          wounds: -20,
          corruption: 12
        }
      },
      {
        label: "[지성 판정] 사이킥 후드의 출력 한계를 정밀 계산해 적의 사격 조준만 교란하는 안전한 술식을 택한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "적 전차병들의 시야를 워프 안개로 가려 아군 대전차포가 안전하게 적을 격파하도록 도왔다!",
          stats: { Int: 6, WP: 5, Inf: 4 }
        },
        fail: {
          text: "집중이 끊기며 경미한 정신 충격과 편두통을 입었으나 폭주만은 막아 냈다.",
          wounds: -12,
          corruption: 6
        }
      },
      {
        label: "폭주 위험을 감수하지 않고 억제 고리를 조이며 황제께 정신의 안정을 빈다",
        effect: {
          text: "가장 무서운 적은 바깥의 전차가 아니라 내면의 워프다. 철저한 자제로 오늘도 이성을 지켰다.",
          stats: { WP: 4 },
          faith: 6,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Primaris Psyker / Codex: Astra Militarum"
  },
  {
    id: "ev_s2_priest_crusade_sermon",
    title: "에클레시아키 사제 — 포화 속의 설교와 체인에비스서레이터",
    category: "신앙",
    once: true,
    req: { anyCareers: ["ecclesiarchy_priest"] },
    reqLabel: "병종: 에클레시아키 사제",
    weight: 34,
    text: "이단 반군의 맹공에 아군 방어선이 무너지기 직전이다. 겁에 질린 병사들이 참호 뒤로 물러서려 하자, 확성기를 쥔 사제의 입에서 어떤 말씀이 터져 나오느냐에 전선 전체의 운명이 걸려 있다.",
    choices: [
      {
        label: "[교섭 판정] 무너진 바리케이드 위로 올라서서 황제의 성구를 목청껏 외쳐 병사들의 사기를 되살린다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "'황제께서 지켜보신다! 두려움을 불태워라!' 달아나던 병사들이 일제히 총검을 고쳐 쥐고 역습에 나서 승리를 거머쥐었다!",
          stats: { Fel: 8, WP: 5, Inf: 7 },
          faith: 12
        },
        fail: {
          text: "포탄 파편에 어깨를 다쳐 확성기를 놓쳤으나, 피를 흘리며 외친 기도 소리가 일부 병사들을 붙들어 세웠다.",
          wounds: -14,
          faith: 4
        }
      },
      {
        label: "[백병 판정] 성스러운 에비스서레이터의 시동을 걸고 찬송가를 부르며 적 선봉대 한복판으로 돌격한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "광신적인 기세로 이단 지휘관을 두 동강 내자 아군 전체가 열광하며 진격했다!",
          stats: { WS: 7, WP: 6 },
          faith: 10
        },
        fail: {
          text: "적의 집중 사격에 쓰러져 야전 의무실로 실려 갔으나, 순교를 두려워하지 않은 용기에 성당의 찬사가 쏟아졌다.",
          wounds: -22,
          faith: 6
        }
      },
      {
        label: "야전 구호소에서 임종을 앞둔 부상병들의 손을 잡아 주며 마지막 황제의 축복을 베푼다",
        effect: {
          text: "전장의 광기 속에서도 마지막 자비를 지켰다. 병사들이 평온한 얼굴로 황제의 품에 눈을 감았다.",
          stats: { WP: 5, Fel: 4 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Ministorum Priest / Codex: Adepta Sororitas"
  },

  // 7-4. 특수 출신 · 선천 자질 보강 분기 사건 (8종)
  {
    id: "ev_s2_origin_navigator_warp",
    title: "나비스 노빌리테 — 제3의 눈으로 마주한 워프 폭풍과 가문 암투",
    category: "특수 혈통",
    once: true,
    req: { minAge: 16, allTags: ["navigator"] },
    reqLabel: "출신: 나비스 노빌리테 항해사",
    weight: 40,
    text: "이마의 비단 띠를 풀고 워프의 격랑을 직시하는 순간, 거대한 워프 폭풍이 함선을 집어삼키려 달려든다. 설상가상으로 항해실 밖에서는 독점 항해 계약을 노리는 경쟁 나비스 노빌리테 가문의 암살 첩보까지 전해졌다.",
    choices: [
      {
        label: "[의지 판정] 찢어지는 워프 폭풍 너머 아스트로노미칸의 미약한 불빛을 끝까지 붙들어 함대를 구해 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "제3의 눈에서 피눈물이 흐르는 고통을 견뎌 내고 함선 전체를 무사히 실우주로 이끌었다! 선장과 가문 원로가 무릎 꿇고 경의를 표했다.",
          stats: { WP: 9, Int: 6, Inf: 10 }
        },
        fail: {
          text: "워프의 광기가 제3의 눈을 할퀴어 심각한 두통과 돌연변이 징후가 심화되었으나, 함선만은 무사히 빠져나왔다.",
          wounds: -20,
          corruption: 8
        }
      },
      {
        label: "[교섭 판정] 경쟁 가문의 독살 시도를 역이용해 해군 제독과의 최우선 항해 독점 계약을 따낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "테라 항해사 의회에 증거를 들이밀어 정적 가문을 실각시키고 막대한 영예와 지분을 거머쥐었다!",
          stats: { Fel: 7, Int: 5, Inf: 10 }
        },
        fail: {
          text: "가문 간 암투 도중 호위병을 잃고 부상을 입었으나, 항해사로서의 위신은 지켜 냈다.",
          wounds: -16,
          stats: { Inf: -4 }
        }
      },
      {
        label: "제3의 눈을 단단히 감추고 검증된 단거리 안전 항로만 택해 혈통과 목숨을 보전한다",
        effect: {
          text: "성급한 모험보다 나비스 노빌리테의 고귀한 혈통을 이어 가는 것이 먼저다. 안전하게 목적지에 닿았다.",
          stats: { WP: 5, Inf: 5 }
        }
      }
    ],
    source: "Lexicanum: Navis Nobilite / Rogue Trader RPG"
  },
  {
    id: "ev_s2_trait_blank_isolation",
    title: "블랭크의 고독 — 본능적 혐오와 침묵의 자매들의 시선",
    category: "선천 자질",
    once: true,
    req: { minAge: 14, allTags: ["blank"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "자질: 블랭크(퍼라이어)",
    weight: 38,
    text: "영혼의 메아리가 없는 블랭크의 기운 때문에 평범한 시민들은 이유도 모른 채 그대 곁에서 본능적인 구역질과 혐오를 느끼며 피해 간다. 그러던 어느 날, 시장에서 미등록 사이커가 폭주해 불길을 뿜자 오직 그대만이 아무렇지 않게 걸어 들어갈 수 있었다.",
    choices: [
      {
        label: "[의지 판정] 공허의 오라로 폭주한 사이커의 워프 불꽃을 단숨에 꺼뜨리고 당당히 제압한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "사이커가 비명을 지르며 무릎 꿇는 광경에 군중이 경악했다! 혐오받던 저주가 수많은 목숨을 구한 축복으로 증명되었다.",
          stats: { WP: 8, Inf: 7 },
          corruptionReset: true
        },
        fail: {
          text: "사이커가 휘두른 쇠파이프에 맞아 다쳤으나, 워프 폭주 자체는 완벽히 무력화했다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 사건 직후 침묵의 수화(Thoughtmark)로 다가온 '침묵의 자매들' 연락관과 비밀 협력을 약조한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "황금 갑주의 여전사가 조용히 고개를 끄덕이며 공허의 동족에게 깊은 경의와 보호 인장을 남겼다!",
          stats: { Fel: 6, Inf: 9, WP: 5 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "수화의 뜻을 절반밖에 이해하지 못했으나, 적어도 혼자가 아니라는 깊은 위안을 얻었다.",
          stats: { WP: 4, Inf: 3 }
        }
      },
      {
        label: "사람들의 웅성거림을 뒤로하고 조용히 군중 틈을 빠져나와 고독한 평온을 지킨다",
        effect: {
          text: "누구도 그대를 이해하지 못하지만, 어떤 악마도 그대의 영혼에 손댈 수 없다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Blank / Sisters of Silence"
  },
  {
    id: "ev_s2_trait_ratling_sniper",
    title: "래틀링 — 야전 취사장의 밀수 향신료와 팔백 미터 저격",
    category: "선천 자질",
    once: true,
    req: { minAge: 14, allTags: ["ratling"] },
    reqLabel: "자질: 래틀링(앱휴먼)",
    weight: 38,
    text: "작은 키와 곱슬머리 때문에 순수 인류 병사들에게 종종 놀림받지만, 래틀링의 매서운 저격 솜씨와 천재적인 요리·조달 능력은 전선에서 누구도 대신할 수 없다. 오늘도 적 저격수가 아군 참호를 묶어 놓고 있다.",
    choices: [
      {
        label: "[사격 판정] 800미터 너머 폐허 창문 틈으로 숨은 적 저격수의 이마를 롱 라스 한 발로 꿰뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "바람 계산까지 완벽한 단 한 발! 환호하는 병사들이 그대를 목마 태우며 두둑한 배급을 몰아 주었다.",
          stats: { BS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "적의 반격탄이 엄폐물 옆을 스쳐 팔을 다쳤으나, 재장전 끝내 적 저격수를 쫓아냈다.",
          wounds: -14,
          stats: { BS: 3 }
        }
      },
      {
        label: "[교섭 판정] 어디서 구했는지 모를 진짜 향신료와 고기로 장교단 만찬을 차려 주고 특권을 챙긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'이 래틀링 없으면 연대가 굶어 죽는다!' 장교단의 총애 속에 합법적 휴가와 넉넉한 비상 식량을 얻었다.",
          stats: { Fel: 7, Inf: 7 },
          wounds: 10
        },
        fail: {
          text: "보급 창고에서 슬쩍한 향신료 출처가 들통나 사흘간 감자 깎기 징계를 받았다.",
          stats: { Inf: -4, Ag: 3 }
        }
      },
      {
        label: "작은 체구로 포탄이 닿지 않는 참호 구석에 숨어 따뜻한 스튜를 끓이며 여유를 즐긴다",
        effect: {
          text: "래틀링의 철학은 단순하다. 배부르게 먹고, 절대 탄환 앞에 서지 말 것!",
          stats: { Ag: 4, T: 4 },
          wounds: 8
        }
      }
    ],
    source: "Lexicanum: Ratling / Codex: Astra Militarum"
  },
  {
    id: "ev_s2_trait_ogryn_bonehead",
    title: "오그린 — 본헤드(BONEhead) 지능 보조 시술 제안",
    category: "선천 자질",
    once: true,
    req: { minAge: 16, allTags: ["ogryn"] },
    reqLabel: "자질: 오그린(앱휴먼)",
    weight: 38,
    text: "거대한 덩치와 순박한 충성심을 눈여겨본 의무 장교와 커미사르가 그대를 불렀다. '자네는 아주 훌륭한 오그린이야. 머리에 작은 장치를 심어 주는 본헤드 시술을 받으면 숫자를 열까지 셀 수 있고, 작은 전우들을 이끄는 분대장이 될 수 있네.'",
    choices: [
      {
        label: "[강인 판정] '황제 폐하가 똑똑해지라 하셨다!' 두개골 시술을 꾹 참고 견뎌 본헤드 분대장이 된다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "머리가 조금 지끈거렸지만 이제 지도도 읽고 명령도 또렷이 이해한다! 커미사르가 빛나는 분대장 약장을 달아 주었다.",
          stats: { T: 6, Int: 8, WP: 6, Inf: 6 }
        },
        fail: {
          text: "수술이 너무 아파 병원 침대를 부숴 버리는 소동이 일었으나, 강철 같은 몸 덕에 금방 툴툴 털고 일어났다.",
          wounds: -18,
          stats: { T: 4 }
        }
      },
      {
        label: "[백병 판정] 복잡한 기계보다 내 립퍼 건이 최고라며 적의 기습을 맨몸으로 막아 내 전우들을 지킨다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'작은 친구들 건드리지 마!' 거대한 팔뚝으로 적을 날려 버리자 분대원 전원이 감격해 환호했다.",
          stats: { WS: 7, T: 6, Fel: 5 }
        },
        fail: {
          text: "온몸으로 파편을 막아 내다 큰 상처를 입었으나, 작은 전우들만은 한 명도 다치지 않았다.",
          wounds: -20,
          stats: { WS: 3 }
        }
      },
      {
        label: "커미사르가 칭찬으로 준 빛나는 훈장을 가슴에 꼭 쥐고 배급 고기를 두 그릇 먹으며 환하게 웃는다",
        effect: {
          text: "황제 폐하께서 오늘도 지켜보고 계신다. 오그린의 단순하고 순수한 충성심은 그 무엇보다 단단하다.",
          stats: { T: 5 },
          wounds: 12,
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Ogryn / BONEhead Implant"
  },
  {
    id: "ev_s2_trait_prodigy_wargame",
    title: "전술 천재의 도박 — 사령부 모의 전쟁의 금기 기동",
    category: "선천 자질",
    once: true,
    req: { minAge: 16, allTags: ["prodigy"] },
    reqLabel: "자질: 전술 천재",
    weight: 36,
    text: "성계 방위 모의 전쟁 훈련에서 기존의 낡은 참호 고수 교리대로 배치하면 아군이 전멸할 것이 그대의 눈에는 첫눈에 보인다. 하지만 고위 참모들은 하급자의 파격적인 역기동 제안을 오만하다며 비웃고 있다.",
    choices: [
      {
        label: "[지성 판정] 홀로맵 위에 3중 양동 포위 기동을 펼쳐 보이며 모의전을 단 십 분 만에 완승으로 끝낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시뮬레이션 코지테이터가 '아군 피해 82퍼센트 감소'를 띄우자 장성들의 비웃음이 침묵과 경탄으로 뒤바뀌었다!",
          stats: { Int: 8, Inf: 9, BS: 4 }
        },
        fail: {
          text: "변칙 기동이 지나치게 과감해 참모장에게 불경한 독단이라는 견책을 받았으나, 날카로운 재능만은 각인시켰다.",
          stats: { Inf: -4, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 자존심 강한 상급 장교의 이름으로 전술안을 올려 공을 양보하는 대신 실전 반영과 후원을 얻는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "현명한 처세 덕분에 수많은 병사의 목숨을 살릴 작전이 채택되었고, 상급 장교가 그대를 핵심 참모로 발탁했다!",
          stats: { Fel: 6, Inf: 8, Int: 4 }
        },
        fail: {
          text: "공적만 가로채이고 변변한 보상은 받지 못했으나, 전술적 안목은 한층 깊어졌다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "참모들의 자존심을 건드리지 않고 개인 기록 슬레이트에만 완벽한 해법을 정리해 둔다",
        effect: {
          text: "진짜 전장은 모의 지도가 아니라 피가 흐르는 현장이다. 언젠가 결정적 순간에 꺼낼 칼날을 갈아 두었다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Only War / Imperium Maledictum: Tactical Prodigy"
  },
  {
    id: "ev_s2_trait_saint_spark_aura",
    title: "성흔의 기질 — 워프 안개 속 꺼지지 않는 촛불",
    category: "선천 자질",
    once: true,
    req: { minAge: 14, allTags: ["saint_spark"], excludeTags: ["heretic", "custodes"] },
    reqLabel: "자질: 성흔의 기질",
    weight: 38,
    text: "원인을 알 수 없는 워프 안개가 구역을 뒤덮으며 등불이 일제히 꺼지고 사람들이 공포에 휩싸였다. 그런데 유독 그대의 발치에 놓인 작은 촛불만은 황금빛으로 꼿꼿이 타오르며 손바닥에서 뜨거운 성흔의 온기가 피어오른다.",
    choices: [
      {
        label: "[의지 판정] 황제의 이름을 부르며 어둠 속 부상자와 절망한 시민들을 황금빛 기도로 일으켜 세운다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 목소리가 울려 퍼지자 불길한 워프 안개가 순식간에 걷혔다! 목격자들이 '살아 있는 기적'이라 외치며 무릎 꿇었다.",
          stats: { WP: 8, Fel: 6, Inf: 7 },
          faith: 15,
          corruption: -10,
          addTags: ["living_miracle"]
        },
        fail: {
          text: "온 힘을 쏟아 기도하다 코피를 흘리며 쓰러졌으나, 어둠이 물러날 때까지 단 한 사람도 광기에 빠지지 않았다.",
          wounds: -16,
          faith: 6
        }
      },
      {
        label: "[교섭 판정] 성흔의 징조를 떠벌리지 않고 조용히 촛불을 나누어 주며 이웃들의 불안을 달랜다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "과장된 광신 대신 잔잔한 희망이 퍼져 나가며, 국교와 이웃 모두의 깊은 신뢰를 얻었다.",
          stats: { Fel: 6, WP: 5 },
          faith: 10
        },
        fail: {
          text: "일부 주민이 소문을 퍼뜨려 잠시 시끌벅적했으나 별탈 없이 밤을 넘겼다.",
          faith: 5
        }
      },
      {
        label: "뜨겁게 달아오른 손바닥을 붕대로 감싸고 오직 황제께 겸허히 감사 기도를 올린다",
        effect: {
          text: "기적은 오직 옥좌의 주인으로부터 온다. 겸손한 신심이 내면의 오염까지 깨끗이 씻어 냈다.",
          stats: { WP: 4 },
          faith: 8,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Living Saint / Imperial Cult"
  },
  {
    id: "ev_s2_origin_rt_blood",
    title: "로그 트레이더 방계 — 가문 무역 영장 계승권 분쟁",
    category: "특수 혈통",
    once: true,
    req: { minAge: 18, allTags: ["rogue_trader_blood"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "출신: 로그 트레이더 방계 혈통",
    weight: 38,
    text: "황제의 무역 영장을 지닌 본가 원로가 급사하자, 거대한 성간 함대와 변경 성계 채굴권을 두고 방계와 직계 친척들 사이에 피비린내 나는 계승권 다툼이 벌어졌다. 방계 혈손인 그대에게도 원로회의 소집장이 날아왔다.",
    choices: [
      {
        label: "[교섭 판정] 원로회의에서 미개척 변경 성계 개척 수익안을 제시해 방계 지분과 쾌속정 권한을 따낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "대담한 항해 사업안에 원로들이 매료되었다! 막대한 배당금과 변경 성계 인맥을 단숨에 거머쥐었다.",
          stats: { Fel: 7, Int: 4, Inf: 10 }
        },
        fail: {
          text: "본가 파벌의 야유에 밀려 회의장에서 쫓겨났고, 항의 과정에서 경비원과 충돌해 상처를 입었다.",
          wounds: -10,
          stats: { Inf: -5 }
        }
      },
      {
        label: "[민첩 판정] 본가 경쟁자가 밤중에 보낸 사설 용병의 암살 기도를 역습해 가문의 실력자로 인정받는다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "암살자의 단검을 빼앗아 본가 회의 탁자에 꽂아 넣었다! 이제 가문 안에서 그대를 함부로 건드릴 자는 없다.",
          stats: { Ag: 6, WS: 5, Inf: 8 }
        },
        fail: {
          text: "어깨에 깊은 자상을 입고 간신히 비상 셔틀로 탈출했다. 로그 트레이더 가문의 정치는 전쟁터보다 잔혹하다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "피비린내 나는 본가 권력 다툼에서 한 발 물러나 안정적인 방계 연금과 성계 인맥만 챙긴다",
        effect: {
          text: "영장의 왕좌는 독이 든 잔이다. 목숨과 실리를 모두 지키는 영리한 후퇴였다.",
          stats: { Inf: 5, Fel: 4 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook (FFG)"
  },
  {
    id: "ev_s2_origin_terra_elite",
    title: "테라 상류층 — 황궁 외곽 하이 로드 연회와 칙령 서명",
    category: "특수 혈통",
    once: true,
    req: { minAge: 16, allTags: ["terra_elite"] },
    reqLabel: "출신: 테라 상류층 혈통",
    weight: 38,
    text: "은하계 전역의 운명이 오가는 테라 상원 구역의 대리석 연회장에 가문 대표로 초대받았다. 대성전 보급 칙령 서명을 둘러싸고 고위 행정관과 귀족 가문들이 화려한 미소 뒤에 칼을 숨긴 채 눈치를 보고 있다.",
    choices: [
      {
        label: "[권위 판정] 테라 명문가의 인장을 당당히 찍어 대성전 보급 청원안을 통과시키고 상원의 주목을 받는다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "은하계 수천 행성의 물자를 움직이는 서명 한 번으로 테라 상류 사회에 확고한 입지를 다졌다!",
          stats: { Inf: 10, Fel: 6, Int: 4 }
        },
        fail: {
          text: "절차상 결함을 물고 늘어진 정적 가문에게 체면을 구겼으나, 제국 수도 정치의 생리를 뼈저리게 배웠다.",
          stats: { Inf: -4, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 퇴폐한 귀족 사교의 공허함을 외면하고 황궁 외곽에서 실무와 무예 수련에 매진한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "향락에 젖은 다른 귀족 자제들과 다른 굳건한 기상에 황궁 수비 장교들마저 깊은 호감을 보였다.",
          stats: { WP: 7, WS: 4, Int: 5 },
          faith: 8
        },
        fail: {
          text: "가문 어른들로부터 사교를 소홀히 한다는 핀잔을 들었으나 스스로의 신념만은 꺾지 않았다.",
          stats: { WP: 3, Int: 2 }
        }
      },
      {
        label: "테라 최상류 가문의 우아한 의전을 완벽히 소화하며 정중히 연회 석상에 얼굴만 비추고 물러난다",
        effect: {
          text: "품위와 절제는 테라 명문가의 가장 오래된 무기다. 무난하게 가문의 위상을 지켜 냈다.",
          stats: { Inf: 5, Fel: 4 }
        }
      }
    ],
    source: "Watchers of the Throne / Codex: Adeptus Custodes"
  },

  // =========================================================================
  // 8. 3단계 서사 보강 — 미등장 네임드 3인 · 소외 행성 4곳 · 인간관계 연작 6종 · 대균열 후유증 2종 (15종)
  // =========================================================================
  // 8-1. 단독 조우 미구현 네임드 3인 (크리드 · 가즈쿨 · 아바돈)
  {
    id: "ev_named_creed",
    title: "카스르 타이로크의 천재 전술가 — 로드 카스텔란 우르사카르 E. 크리드",
    category: "네임드 조우",
    once: true,
    characters: ["creed"],
    req: {
      minAge: 14,
      minYear: 985,
      maxYear: 999,
      excludeTags: ["heretic", "chaos_aligned"],
      or: [
        { anyWorlds: ["cadia"] },
        { anyTags: ["militarum", "officer", "commissar", "scion"] }
      ]
    },
    reqLabel: "985~999.M41 · 카디아 또는 제국 군무",
    weight: 34,
    text: "포연 자욱한 카디아 방어선 지휘소, 굵은 시가를 문 떡 벌어진 어깨의 사령관 우르사카르 E. 크리드가 홀로그램 전술판을 내려다보고 있다. 카오스 기갑 사단이 측면을 돌파하려는 절체절명의 순간, 크리드가 씩 웃으며 덤불 뒤에 숨겨 두었던 초중전차 베인블레이드 중대의 기습 기동을 명한다!",
    choices: [
      {
        label: "[지성 판정] 크리드의 변칙 역포위 전술을 즉각 이해하고 인접 연대에 완벽한 합동 사격 좌표를 전달한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "'기막힌 눈썰미군!' 크리드의 기습 기동이 적 선봉대를 순식간에 분쇄했고, 로드 카스텔란이 직접 그대의 어깨를 두드리며 치하했다.",
          stats: { Int: 7, BS: 4, Inf: 9 },
          addTags: ["met_creed"]
        },
        fail: {
          text: "지시 전달이 한 박자 늦어 적 포격에 부상을 입었으나, 크리드의 천재적인 예비대 투입 덕분에 전선은 끝내 버텨 냈다.",
          wounds: -18,
          stats: { Int: 3 },
          addTags: ["met_creed"]
        }
      },
      {
        label: "[사격 판정] 크리드의 지휘 기치가 펄럭이는 최전선 방벽에서 흔들리지 않는 일제 사격으로 적을 몰아낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "'카디아는 서 있다!' 사령관과 나란히 선 방벽에서 쏟아진 라스건 화망이 적 돌격대를 갈아 버렸다.",
          stats: { BS: 6, WP: 6, Inf: 6 },
          faith: 8,
          addTags: ["met_creed"]
        },
        fail: {
          text: "파편에 다리를 스쳤으나, 한 치도 물러서지 않는 크리드의 기세에 힘입어 끝까지 자리를 지켰다.",
          wounds: -16,
          stats: { WP: 4 },
          addTags: ["met_creed"]
        }
      },
      {
        label: "로드 카스텔란의 전술 지시에 따라 보급 탄약과 전령선을 빈틈없이 유지한다",
        effect: {
          text: "명장의 전술은 현장의 성실한 손발이 있어야 완성된다. 그대의 헌신 속에 카디아의 방벽은 오늘도 버텨 냈다.",
          stats: { WP: 4, Int: 3, Inf: 4 },
          addTags: ["met_creed"]
        }
      }
    ],
    source: "Lexicanum: Ursarkar E. Creed / Fall of Cadia"
  },
  {
    id: "ev_named_ghazghkull",
    title: "와아아!의 예언자 — 가즈쿨 막 우룩 스라카의 광포한 진격",
    category: "네임드 조우",
    once: true,
    characters: ["ghazghkull"],
    req: {
      minAge: 16,
      minYear: 941,
      or: [
        { anyWorlds: ["armageddon"] },
        { anyTags: ["militarum", "astartes", "sororitas", "commissar", "officer", "scion"] }
      ]
    },
    reqLabel: "941.M41+ · 아마겟돈 또는 제국 전투 직군",
    weight: 30,
    text: "대지가 찢어질 듯한 굉음과 함께 전차만 한 거구의 오크 워보스가 강철 방벽을 맨손으로 뜯어내며 걸어 나온다! '와아아!의 예언자' 가즈쿨 막 우룩 스라카다! 그의 메가 아머가 탄환을 튕겨 내며 거대한 파워 클로가 그대의 방어선을 향해 내리꽂힌다!",
    choices: [
      {
        label: "[사격 판정] 중화기와 대전차 포대의 집중 사격을 가즈쿨의 발밑에 퍼부어 진격 속도를 늦춘다",
        check: { stat: "BS", diff: -10 },
        success: {
          text: "초대형 오크 군주의 얼굴에 멜타 광선을 정통으로 꽂아 넣어 잠시 주춤하게 만들었다! 가즈쿨이 '오호, 꽤 쏠 줄 아는 쪼그만 놈이네!'라며 호탕하게 웃고 지나간 사이 전선이 재정비되었다!",
          stats: { BS: 7, WP: 7, Inf: 9 },
          wounds: -12,
          addTags: ["met_ghazghkull", "armageddon_hero"]
        },
        fail: {
          text: "충격파와 모크의 포효 탄막에 날아가 중상을 입었으나, 기적적으로 살아남아 공포의 목격자가 되었다.",
          wounds: -28,
          stats: { T: 4, WP: 4 },
          addTags: ["met_ghazghkull"]
        }
      },
      {
        label: "[의지 판정] 공포에 얼어붙은 아군 병사들을 다독여 가즈쿨의 직격 경로를 피해 측면 방어선으로 질서 있게 철수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "무모한 옥쇄 대신 수백 명의 아군을 살려 내어 다음 반격의 불씨를 지켰다! 냉철한 판단력에 사령부가 경의를 표했다.",
          stats: { WP: 7, Int: 5, Fel: 5 },
          addTags: ["met_ghazghkull"]
        },
        fail: {
          text: "철수 도중 오크 놉 무리의 추격에 큰 상처를 입었으나 끝내 포위망을 빠져나왔다.",
          wounds: -22,
          stats: { Ag: 3 },
          addTags: ["met_ghazghkull"]
        }
      },
      {
        label: "폐허 참호 깊숙이 몸을 숨긴 채 거대한 오크 대군주의 그림자가 지나가길 이를 악물고 버틴다",
        effect: {
          text: "고막이 터질 듯한 '와아아아!' 함성이 지나간 뒤에도 손끝의 떨림이 한동안 멎지 않았다. 살아남은 것 자체가 기적이다.",
          stats: { T: 4, WP: 4 },
          wounds: -12,
          addTags: ["met_ghazghkull"]
        }
      }
    ],
    source: "Lexicanum: Ghazghkull Mag Uruk Thraka / Codex: Orks"
  },
  {
    id: "ev_named_abaddon",
    title: "호루스의 발톱과 드라크니옌 — 약탈자 아바돈의 강림",
    category: "네임드 조우",
    once: true,
    characters: ["abaddon"],
    req: {
      minAge: 16,
      minYear: 990,
      or: [
        { anyWorlds: ["cadia"] },
        { anySegmenta: ["obscurus"] },
        { anyTags: ["astartes", "inquisitor", "custodes", "grey_knight", "chaos_aligned"] }
      ]
    },
    reqLabel: "990.M41+ · 카디아·옵스쿠루스 또는 고위/카오스 직군",
    weight: 30,
    text: "검은 번개가 하늘을 가르고, 1만 년 증오를 두른 블랙 리전의 총사령관 '약탈자 아바돈'이 터미네이터 친위대 브링어 오브 디스페어를 거느리고 전장에 강림했다! 한 손에는 프라이마크를 벤 호루스의 발톱, 다른 손에는 악마검 드라크니옌이 절규하고 있다.",
    choices: [
      {
        label: "[의지 판정] 워마스터의 압도적 살기 앞에서도 무릎 꿇지 않고 황제의 이름을 외치며 지연 방어전을 지휘한다",
        req: { excludeTags: ["heretic", "chaos_aligned"] },
        check: { stat: "WP", diff: -15 },
        success: {
          text: "아바돈의 차가운 시선 앞에서 끝내 버텨 내며 아군 증원 함대가 궤도 포격을 내릴 시간을 벌었다! 전설적인 불굴의 영웅으로 기록되었다.",
          stats: { WP: 9, Inf: 10 },
          faith: 14,
          wounds: -18,
          addTags: ["met_abaddon", "hero_of_imperium"]
        },
        fail: {
          text: "드라크니옌이 뿜어 낸 워프 파동에 치명상을 입고 쓰러졌으나, 아군 의무병이 기적적으로 끌어내어 목숨을 건졌다.",
          wounds: -32,
          stats: { WP: 5 },
          corruption: 6,
          addTags: ["met_abaddon"]
        }
      },
      {
        label: "[이단 전용] 카오스의 워마스터 앞에 한쪽 무릎을 꿇고 은하를 불태울 블랙 크루세이드에 서약한다",
        req: { anyTags: ["heretic", "chaos_aligned"] },
        effect: {
          text: "아바돈이 냉혹한 눈빛으로 그대의 쓸모를 저울질한 뒤 블랙 리전의 선봉 표식을 던져 주었다. 암흑의 권위가 크게 치솟았다.",
          stats: { Inf: 12, WS: 6, WP: 5 },
          corruption: 18,
          addTags: ["met_abaddon", "chaos_aligned"]
        }
      },
      {
        label: "정면 대결은 필멸자의 자살 행위다. 엄폐물 사이로 퇴로를 열어 핵심 지휘부와 병력을 구출한다",
        effect: {
          text: "검은 군단의 학살 속에서 살아남아 워마스터의 진격 방향을 사령부에 보고했다. 살아남은 증언이 천 명의 병사보다 귀하다.",
          stats: { Ag: 5, Int: 5, WP: 4 },
          wounds: -14,
          addTags: ["met_abaddon"]
        }
      }
    ],
    source: "Lexicanum: Ezekyle Abaddon / Fall of Cadia"
  },

  // 8-2. 소외 행성 4곳 고유 보강 사건 (보스트로야 · 타니스 · 오펠리아 VII · 네크로문다)
  {
    id: "ev_s3_world_vostroya_forge",
    title: "보스트로야 — 혹한 군수 공장의 장자 징집령과 공예 라스건",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["vostroya"], excludeTags: ["astartes", "custodes", "grey_knight"] },
    reqLabel: "행성: 보스트로야",
    weight: 34,
    text: "눈보라가 휘몰아치는 보스트로야의 거대 고딕 군수 공장에 '보스트로얀 퍼스트본' 신규 보충 징집령이 내려졌다. 1만 년 전 호루스 헤러시 당시 병력을 보내지 못한 죄를 갚기 위해, 보스트로야의 가문들은 지금도 장자와 황동 세공 라스건을 바친다.",
    choices: [
      {
        label: "[지성 판정] 가문 대대로 내려온 공예 라스건의 정밀 집속 렌즈를 직접 조율해 명품 무구로 완성한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "화려한 황동 문양과 뛰어난 사격 정확도를 겸비한 걸작을 빚어 내어 공장 장인 길드의 극찬을 받았다!",
          stats: { Int: 6, BS: 5, Inf: 5 }
        },
        fail: {
          text: "혹한 속에 손이 곱아 공정이 지연되었으나, 성실히 마감해 군수 납품 기한을 맞추었다.",
          wounds: -8,
          stats: { Int: 2 }
        }
      },
      {
        label: "[교섭 판정] 징집 행렬을 앞두고 떨고 있는 젊은 장자 병사들과 가족들 앞에서 보스트로야의 긍지를 설파한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "붉은 외투와 곰털 모자를 쓴 장자 병사들이 당당히 고개를 들고 수송선에 올랐다! 지역 원로들이 깊은 감사를 표했다.",
          stats: { Fel: 6, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "이별의 슬픔은 쉽게 가시지 않았으나, 묵묵히 배웅하며 보스트로야의 의무를 되새겼다.",
          stats: { WP: 3 }
        }
      },
      {
        label: "눈보라 속 교대 근무를 성실히 마치고 보스트로얀 퍼스트본 연대의 무운을 기원한다",
        effect: {
          text: "혹한과 쇳가루 속에서도 보스트로야의 맹세는 천 년째 꺾이지 않는다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Vostroya / Vostroyan Firstborn"
  },
  {
    id: "ev_s3_world_tanith_nalwood",
    title: "타니스 — 움직이는 날우드(Nalwood) 숲의 길잡이",
    category: "행성 고유",
    once: true,
    req: { minAge: 12, maxYear: 764, anyWorlds: ["tanith"], excludeTags: ["astartes", "custodes"] },
    reqLabel: "행성: 타니스 (765.M41 멸망 이전)",
    weight: 38,
    text: "타니스의 거대한 날우드 숲은 계절과 바람에 따라 뿌리를 옮기며 길을 바꾼다. 숲 깊은 곳에서 길을 잃은 외지 행정관의 수송 마차가 안개 속에 갇혔고, 백파이프의 은은한 음색이 멀리서 울려 퍼진다.",
    choices: [
      {
        label: "[민첩 판정] 이끼 방향과 바람 소리만으로 이동하는 숲길을 읽어 조난당한 수송대를 안전히 이끌어 낸다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "타니스인만의 천부적인 방향 감각과 은신술에 외지 행정관이 혀를 내둘렀다! 감사의 뜻으로 정교한 은빛 단검 '스트레이트 실버'를 선물받았다.",
          stats: { Ag: 6, BS: 4, Inf: 5 }
        },
        fail: {
          text: "안개 속에서 가시덩굴에 긁히며 밤새 헤맸으나, 동틀 무렵 끝내 숲 밖으로 모두를 안내했다.",
          wounds: -10,
          stats: { Ag: 3, T: 2 }
        }
      },
      {
        label: "[의지 판정] 밤안개 속에서 날우드 사냥꾼들과 모닥불을 피우고 고향의 옛 노래와 전승을 익힌다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "푸른 숲의 기억과 타니스의 백파이프 선율이 평생 잊히지 않을 영혼의 뿌리로 자리 잡았다.",
          stats: { WP: 6, Fel: 4 },
          faith: 5
        },
        fail: {
          text: "밤이슬에 젖어 감기에 걸렸으나, 고향 숲의 정취만은 가슴에 깊이 남았다.",
          wounds: -6,
          stats: { WP: 2 }
        }
      },
      {
        label: "표식 리본을 나무에 묶으며 안전한 외곽 임도로 돌아가 조용히 하루를 마친다",
        effect: {
          text: "평화롭고 푸른 타니스의 숲이 영원히 곁에 있을 것만 같은 고요한 저녁이었다.",
          stats: { Ag: 3, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Tanith / Gaunt's Ghosts"
  },
  {
    id: "ev_s3_world_ophelia7_convent",
    title: "오펠리아 VII — 콘벤트 상크토룸의 성유물 행렬과 시노드 미니스트라",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["ophelia7"], excludeTags: ["heretic", "chaos_aligned"] },
    reqLabel: "행성: 오펠리아 VII",
    weight: 34,
    text: "세그멘툼 템페스투스의 성지 행성 오펠리아 VII, 아뎁타 소로리타스 2대 본산 중 하나인 '콘벤트 상크토룸'과 국교 의회 '시노드 미니스트라'를 잇는 황금 대로를 따라 장엄한 성유물 행렬이 펼쳐진다. 구름 같은 순례 인파 틈에서 수상한 폭파 음모의 기척이 포착되었다.",
    choices: [
      {
        label: "[지성 판정] 순례자 대열 속에 숨어든 이단 방화범의 기폭 장치를 행렬 도착 전에 은밀히 찾아내 제압한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "콘벤트 상크토룸 전투 수녀들이 달려오기 전에 방화범을 묶어 넘겼다! 시노드 미니스트라 추기경이 직접 축복장과 높은 권위를 하사했다.",
          stats: { Int: 6, Inf: 8, WP: 4 },
          faith: 10
        },
        fail: {
          text: "격투 도중 이단자의 단검에 부상을 입었으나, 다행히 폭탄만은 터지지 않고 수녀대에 인계되었다.",
          wounds: -16,
          faith: 6
        }
      },
      {
        label: "[의지 판정] 경건한 성가 행렬에 동참해 대성당 제단 앞에서 온 영혼을 다해 정화 기도를 올린다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "만 개의 파이프오르간이 울려 퍼지는 장엄한 기도 속에 마음의 오염과 피로가 눈 녹듯 씻겨 내려갔다.",
          stats: { WP: 6 },
          faith: 14,
          corruption: -10
        },
        fail: {
          text: "인파에 떠밀려 탈진했으나, 성지의 뜨거운 신앙심만은 온몸으로 체감했다.",
          wounds: -8,
          faith: 6
        }
      },
      {
        label: "황금 대로 한쪽에서 경건히 무릎을 꿇고 지나가는 성유물 행렬에 아퀼라 성호를 올린다",
        effect: {
          text: "테라 다음가는 제국 제2의 성지에서 올린 짧은 기도가 오래도록 마음을 든든히 지탱해 주었다.",
          stats: { WP: 3 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Ophelia VII / Convent Sanctorum"
  },
  {
    id: "ev_s3_world_necromunda_turf",
    title: "네크로문다 — 골리앗과 에셔의 하층 돔 항쟁",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["necromunda"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    reqLabel: "행성: 네크로문다",
    weight: 34,
    text: "하이브 프리무스 하층 공업 돔의 정제수 파이프를 두고, 근육 강화 약물에 취한 하우스 골리앗 투사들과 독날 검을 든 하우스 에셔 암살자들이 전면 총격전을 벌이고 있다! 양쪽 모두 중립 길드의 물자와 통로를 탐내며 압박을 가한다.",
    choices: [
      {
        label: "[교섭 판정] 길드 상인 대표로 나서 두 클랜 하우스 사이의 정수 배분 휴전 협정을 중재하고 통행세를 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "총알 대신 이익으로 두 갱단을 설득했다! 네크로문다 하층 돔에서 누구도 함부로 못 건드리는 노련한 중재자로 이름을 날렸다.",
          stats: { Fel: 7, Inf: 8, Int: 4 }
        },
        fail: {
          text: "골리앗 두목이 협상 탁자를 뒤엎으며 난장판이 되어 도망치다 타박상을 입었다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[백병 판정] 난전 틈새로 기어들어 온 약탈자들을 직접 물리치고 구역 방어선을 지켜 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "무자비한 난투 끝에 약탈자들을 몰아내고 값비싼 암시장 장비까지 전리품으로 챙겼다!",
          stats: { WS: 6, T: 5, Inf: 5 }
        },
        fail: {
          text: "에셔의 독침과 골리앗의 쇠파이프에 크게 다쳤으나, 질긴 생명력으로 끝내 살아남았다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "강철 셔터를 단단히 내리고 두 클랜 하우스가 서로 지쳐 물러날 때까지 조용히 숨을 죽인다",
        effect: {
          text: "네크로문다에서 오래 사는 비결은 남의 구역 싸움에 공짜로 끼어들지 않는 것이다.",
          stats: { Ag: 4, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Necromunda / House Goliath & House Escher"
  },

  // 8-3. 이름 없는 인연(전우 · 스승 · 정적) 2단계 연작 아크 (6종)
  {
    id: "ev_s3_bond_comrade_meet",
    title: "이름 없는 인연 — 포화 속 참호에서 나눈 마지막 물통",
    category: "인연",
    once: true,
    req: {
      minAge: 16,
      maxAge: 45,
      excludeTags: ["bond_comrade", "custodes", "dreadnought"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "16~45세 · 인연 시작 (전우)",
    weight: 28,
    text: "위험한 현장 작업과 교전이 길어지며 사방이 먼지와 비명으로 뒤덮인 밤, 옆자리의 이름 없는 동료가 자신의 마지막 정제수 물통을 말없이 그대에게 건넨다. '혼자 버티면 여기서 끝장이야. 등 뒤는 내가 볼 테니 네 앞만 지켜.'",
    choices: [
      {
        label: "[교섭 판정] 물통을 반씩 나누어 마시고 어떤 지옥에서도 서로를 버리지 않겠다고 굳게 손을 맞잡는다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "수천조 인류가 스쳐 가는 차가운 제국에서 목숨을 맡길 진짜 전우를 얻었다! 훗날 이 인연은 큰 울림으로 돌아올 것이다.",
          stats: { Fel: 5, WP: 5 },
          addTags: ["bond_comrade"]
        },
        fail: {
          text: "어색한 침묵이 흘렀지만, 위기를 함께 넘긴 뒤 두 사람 사이에는 말없는 연대가 싹텄다.",
          stats: { WP: 3, T: 2 },
          addTags: ["bond_comrade"]
        }
      },
      {
        label: "감상에 젖지 않고 물통만 감사히 받아 마신 뒤 냉정하게 각자의 임무에 집중한다",
        effect: {
          text: "제국에서는 정을 줄수록 잃을 것도 많아진다. 냉철한 거리를 유지하며 밤을 넘겼다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Only War"
  },
  {
    id: "ev_s3_bond_comrade_fate",
    title: "오래된 전우의 소식 — 잿빛 인식표와 마지막 편지",
    category: "인연",
    once: true,
    req: { allTags: ["bond_comrade"] },
    reqLabel: "이력: 등을 맡긴 전우 (후속 회수)",
    weight: 34,
    text: "세월이 흘러 각자의 전선과 구역으로 흩어진 뒤, 옛날 마지막 물통을 나누었던 전우가 치열한 붕괴 구역에 고립되어 위독하다는 다급한 전갈이 도착했다! 지금 달려가면 위험하지만, 외면하면 평생 그 얼굴이 눈에 밟힐 것이다.",
    choices: [
      {
        label: "[백병/강인 판정] 위험한 봉쇄 구역으로 몸소 뛰어들어 피투성이가 된 옛 전우를 등에 업고 끌어낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "'역시 올 줄 알았어, 이 고집쟁이야.' 포연 속에서 다시 맞잡은 손이 그 어떤 훈장보다 뜨거웠다! 두 사람의 우정이 전설이 되었다.",
          stats: { T: 6, WP: 7, Fel: 6, Inf: 5 },
          faith: 8,
          wounds: -12
        },
        fail: {
          text: "겨우 전우의 곁에 닿았을 때 이미 숨은 멎어가고 있었다. 마지막으로 건네받은 낡은 인식표를 가슴에 품고 피투성이로 돌아왔다.",
          wounds: -20,
          stats: { WP: 8 },
          faith: 6
        }
      },
      {
        label: "[권위 판정] 인맥과 행정 권한을 총동원해 긴급 구조 수송선을 급파하도록 상부를 압박한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "그대의 끈질긴 청원 끝에 구조 셔틀이 가까스로 도착해 전우를 살려 냈다! 며칠 뒤 도착한 감사 편지에 눈시울이 뜨거워졌다.",
          stats: { Inf: 6, Fel: 6, WP: 5 }
        },
        fail: {
          text: "관료주의의 서류 절차에 막혀 구조선은 하루 늦게 도착했다. 잿빛 인식표와 짧은 유언장만이 우편으로 돌아왔다.",
          stats: { WP: 6, Int: 3 }
        }
      },
      {
        label: "직접 갈 수 없는 현실을 삼키며 성당에 촛불을 켜고 옛 전우의 생환을 밤새 기도한다",
        effect: {
          text: "며칠 뒤 전우가 중상을 딛고 살아남았다는 짧은 소식이 전해졌다. 멀리서나마 안도의 한숨을 내쉬었다.",
          stats: { WP: 5 },
          faith: 8
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Gaunt's Ghosts"
  },
  {
    id: "ev_s3_bond_mentor_meet",
    title: "이름 없는 인연 — 늙은 장인의 꾸지람과 낡은 수첩",
    category: "인연",
    once: true,
    req: {
      minAge: 14,
      maxAge: 35,
      excludeTags: ["bond_mentor", "custodes"],
      excludeWorlds: ["krieg"]
    },
    reqLabel: "14~35세 · 인연 시작 (스승)",
    weight: 28,
    text: "서툰 실수로 큰 문책을 당할 뻔한 순간, 백발이 성성한 베테랑 선배가 말없이 뒤처리를 막아 주더니 호된 꾸지람과 함께 손때 묻은 낡은 수첩을 던져 주었다. '제국에서 멍청한 놈은 일찍 죽는다. 살아서 제 몫을 하려거든 내 밑에서 제대로 배워.'",
    choices: [
      {
        label: "[지성 판정] 고개를 숙이고 늙은 선배의 까다로운 가르침과 실전 요령을 하나도 놓치지 않고 흡수한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "엄격하지만 속정 깊은 평생의 스승을 얻었다! 교본에는 결코 적히지 않는 현장의 지혜가 뼈에 새겨졌다.",
          stats: { Int: 6, WP: 4 },
          addTags: ["bond_mentor"]
        },
        fail: {
          text: "수차례 호통을 들으며 진땀을 뺐으나, 끝까지 포기하지 않는 성실함을 인정받아 제자로 받아들여졌다.",
          stats: { Int: 3, T: 2 },
          addTags: ["bond_mentor"]
        }
      },
      {
        label: "남의 밑에 얽매이기보다 스스로 부딪쳐 익히겠다며 정중히 수첩을 돌려준다",
        effect: {
          text: "노인은 혀를 차며 돌아섰지만, 독립적인 자립심만은 한층 단단해졌다.",
          stats: { WP: 4, Ag: 2 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Imperium Maledictum"
  },
  {
    id: "ev_s3_bond_mentor_legacy",
    title: "스승의 마지막 부탁 — 황금 옥좌로 떠나는 길목에서",
    category: "인연",
    once: true,
    req: { allTags: ["bond_mentor"] },
    reqLabel: "이력: 인생의 스승 (후속 회수)",
    weight: 34,
    text: "어느덧 기력이 다해 병상에 누운 옛 스승이 그대를 조용히 불렀다. 야윈 손으로 오래된 개인 기록과 아끼던 도구를 건네며 희미하게 웃는다. '내가 평생 지키려다 못 다한 약속이 하나 있네. 이제 자네가 내 대신 끝맺어 주겠나?'",
    choices: [
      {
        label: "[지성 판정] 스승이 평생 정리한 비전 지식과 미완의 과업을 완벽히 계승해 마무리한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "스승의 필생의 업적을 훌륭히 완성해 바쳤다! 노인은 평온한 미소와 함께 황제의 품으로 눈을 감았고, 그대의 명망이 크게 높아졌다.",
          stats: { Int: 8, Inf: 7, WP: 5 },
          faith: 6
        },
        fail: {
          text: "과업은 험난해 일부만 이루었으나, 마지막까지 애쓴 제자의 진심에 스승은 고맙다는 말을 남기고 영면했다.",
          stats: { Int: 4, WP: 5 }
        }
      },
      {
        label: "[의지 판정] 거창한 업적보다 임종의 밤을 끝까지 지키며 스승의 마지막 길을 외롭지 않게 배웅한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 제국에서 누군가의 손을 끝까지 잡아 준 그 밤의 기억이 평생 흔들리지 않는 정신의 기둥이 되었다.",
          stats: { WP: 8, Fel: 6 },
          faith: 10
        },
        fail: {
          text: "상실감에 며칠간 기력을 잃었으나, 스승의 가르침을 되새기며 다시 일어섰다.",
          wounds: -6,
          stats: { WP: 5 }
        }
      },
      {
        label: "스승이 남긴 낡은 수첩을 정중히 품에 넣고 묵묵히 영결식을 치러 드린다",
        effect: {
          text: "한 세대의 지혜가 고요히 다음 세대로 건너왔다. 그대의 손끝에 여전히 스승의 습관이 살아 숨 쉰다.",
          stats: { Int: 4, WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Warhammer 40k Original Narrative"
  },
  {
    id: "ev_s3_bond_rival_meet",
    title: "이름 없는 인연 — 승진 명단 앞의 차가운 시선, 숙명의 정적",
    category: "인연",
    once: true,
    req: {
      minAge: 16,
      maxAge: 50,
      excludeTags: ["bond_rival", "astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral", "krieg"]
    },
    reqLabel: "16~50세 · 인연 시작 (정적)",
    weight: 26,
    text: "중요한 포상과 승진 추천 명단 앞에서, 늘 사사건건 방식이 부딪치던 동기가 그대의 공적을 교묘히 깎아내리며 차갑게 웃는다. '선한 척 굴어 봐야 이 제국에선 살아남지 못해. 누가 끝까지 올라가는지 두고 보자고.'",
    choices: [
      {
        label: "[교섭 판정] 날카로운 언변으로 정면 맞받아치며 결코 물러서지 않겠다고 선전포고한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "팽팽한 긴장감 속에 둘 사이의 치열한 경쟁이 시작되었다! 날 선 라이벌 의식이 그대를 더욱 단련시킨다.",
          stats: { Fel: 5, Inf: 5, Int: 3 },
          addTags: ["bond_rival"]
        },
        fail: {
          text: "상대의 교묘한 말재간에 잠시 밀렸으나, 이를 갈며 설욕을 다짐하는 숙명의 정적이 생겼다.",
          stats: { WP: 4, Inf: -2 },
          addTags: ["bond_rival"]
        }
      },
      {
        label: "쓸데없는 감정 소모에 말려들지 않고 무표정하게 등을 돌려 자기 일에만 집중한다",
        effect: {
          text: "시비에 휘말리지 않은 냉정함이 오히려 상급자들의 좋은 인상을 남겼다.",
          stats: { WP: 4, Int: 2 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative / Imperium Maledictum"
  },
  {
    id: "ev_s3_bond_rival_reckoning",
    title: "정적과의 결판 — 위기의 밤, 적이 내민 뜻밖의 손",
    category: "인연",
    once: true,
    req: { allTags: ["bond_rival"] },
    reqLabel: "이력: 숙명의 정적 (후속 회수)",
    weight: 34,
    text: "수년간 치열하게 부딪쳐 온 숙명의 정적과 예기치 못한 위기 현장에 함께 고립되었다! 무너지는 천장과 적의 포위망 사이에서, 상처 입은 정적이 치명적인 부패 증거를 손에 쥔 채 이를 악물고 말한다. '여기서 죽기 싫으면 잠시만 손을 잡자. 아니면 지금 나를 버리고 네가 다 차지하든가!'",
    choices: [
      {
        label: "[교섭 판정] 낡은 원한을 잠시 접고 완벽한 호흡으로 위기를 돌파해 평생의 경쟁자를 든든한 동맹으로 바꾼다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "'제법이군, 역시 내 적수다워.' 사선을 함께 넘은 뒤 두 사람은 서로의 실력을 누구보다 잘 아는 유능한 협력자가 되었다!",
          stats: { Fel: 7, Inf: 8, WP: 5 }
        },
        fail: {
          text: "탈출에는 성공했으나 끝내 앙금은 완전히 풀리지 않았다. 그래도 서로의 등 뒤에 칼을 꽂지 않는 암묵적 존중은 남았다.",
          wounds: -12,
          stats: { Fel: 3, Inf: 3 }
        }
      },
      {
        label: "[지성 판정] 위기를 기회로 삼아 정적의 모든 비리와 약점을 깔끔히 회수해 완전히 실각시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "냉혹하지만 완벽한 승리였다! 정적은 변방으로 좌천되었고, 그대의 권위는 구역 내에서 흔들리지 않게 되었다.",
          stats: { Int: 7, Inf: 10 }
        },
        fail: {
          text: "정적의 거센 반격에 휘말려 함께 중상을 입고 겨우 현장을 빠져나왔다.",
          wounds: -20,
          stats: { Inf: -3 }
        }
      },
      {
        label: "승부도 복수도 덮어 두고 각자 살길을 찾아 조용히 어둠 속으로 갈라선다",
        effect: {
          text: "이 잔혹한 은하에서 오래 미워할 힘조차 사치다. 두 사람은 말없이 각자의 길로 돌아섰다.",
          stats: { WP: 5, Ag: 4 }
        }
      }
    ],
    source: "Warhammer 40k Original Narrative"
  },

  // 8-4. 대균열(greatRift) & 암흑 제국(imperial_nihilus) 범용 후유증 사건 (2종)
  {
    id: "ev_s3_great_rift_sky",
    title: "찢어진 밤하늘 — 시카트릭스 말레딕툼 아래 무너진 별자리",
    category: "대균열 후유증",
    once: true,
    req: { minAge: 14, greatRift: true, excludeWorldTags: ["feral"] },
    reqLabel: "대균열(999.M41) 개방 이후",
    weight: 28,
    text: "카디아 붕괴 이후 밤하늘을 동서로 가른 거대한 핏빛 상처, '시카트릭스 말레딕툼'이 오늘 밤따라 기괴하게 맥동한다. 천문대 시계탑들이 서로 다른 시각을 가리키며 멈춰 섰고, 아스트로패스 탑에서는 사이커들의 비명이 끊이지 않는다.",
    choices: [
      {
        label: "[의지 판정] 찢어진 하늘을 똑바로 바라보며 동요하는 구역 사람들에게 황제의 빛은 꺼지지 않았다고 외친다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "시간조차 뒤틀리는 대균열의 공포 속에서 굳건한 중심을 잡아 구역의 폭동을 막아 냈다!",
          stats: { WP: 7, Fel: 5, Inf: 6 },
          faith: 10,
          corruption: -6
        },
        fail: {
          text: "핏빛 하늘에서 스며 나온 워프 현기증에 쓰러져 며칠간 악몽에 시달렸다.",
          wounds: -12,
          corruption: 8
        }
      },
      {
        label: "[지성 판정] 엇갈린 표준 제국력과 통신 지연을 정밀 보정해 행성 행정과 보급 일정의 마비를 막는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "수주씩 어긋나던 수송선 일정을 재조정해 기아와 혼란을 예방했다! 행정부가 그대의 침착한 실무 능력을 극찬했다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "시간 왜곡이 계산 범위를 넘어 일부 보급 창고가 혼선에 빠졌으나, 큰 참사만은 막았다.",
          stats: { Int: 3 }
        }
      },
      {
        label: "창문을 굳게 닫고 찢어진 하늘을 쳐다보지 않은 채 묵묵히 하루의 소임을 다한다",
        effect: {
          text: "하늘이 갈라져도 내일의 배급과 의무는 계속된다. 평범한 일상이야말로 광기에 맞서는 방패다.",
          stats: { WP: 4, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Great Rift / Warhammer 40k 8th~10th Edition"
  },
  {
    id: "ev_s3_nihilus_darkness",
    title: "암흑 제국의 겨울 — 테라의 빛이 끊긴 고립 행성의 배급 붕괴",
    category: "대균열 후유증",
    once: true,
    req: { minAge: 14, greatRift: true, allTags: ["imperial_nihilus"] },
    reqLabel: "대균열 이후 · 임페리움 니힐루스 고립",
    weight: 34,
    text: "아스트로노미칸의 등불이 닿지 않는 암흑 제국(임페리움 니힐루스)에 고립된 지 오래다. 제국 식량 수송선이 3년째 끊기며 비축 창고가 바닥을 드러냈고, 일부 절망한 구역에서는 총독을 몰아내려는 반란의 불씨가 피어오르고 있다.",
    choices: [
      {
        label: "[교섭 판정] 귀족 비축고와 길드 창고를 개방하게 설득해 공정한 전시 배급 체계를 세운다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "굶주림으로 터질 뻔한 폭동을 가까스로 막아 냈다! 고립된 행성에서 그대의 이름은 생존의 희망이 되었다.",
          stats: { Fel: 7, Inf: 8, WP: 5 },
          faith: 8
        },
        fail: {
          text: "비축고 개방을 거부한 무장 경비대와 충돌해 부상을 입었으나, 일부 식량만은 빈민가로 풀어냈다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[지성 판정] 맹목적 단거리 워프 도약을 감행하는 독립 상선단과 비상 자급자족 교역망을 구축한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "등불 없는 어둠 속에서도 인근 충성 행성 세 곳과 비상 보급로를 연결하는 기적을 이루었다!",
          stats: { Int: 7, Inf: 7, Ag: 4 }
        },
        fail: {
          text: "보낸 수송선 절반이 워프에 삼켜지는 비극을 겪었으나, 돌아온 한 척의 식량이 겨울을 버티게 해 주었다.",
          wounds: -10,
          corruption: 4
        }
      },
      {
        label: "비상 배급을 최대한 아끼며 언젠가 단테의 함대나 구원군이 닿을 날을 기다리며 버틴다",
        effect: {
          text: "빛 없는 하늘 아래서도 제국의 깃발은 내려가지 않았다. 혹독한 굶주림을 견디며 생존력을 다졌다.",
          stats: { T: 5, WP: 5 },
          wounds: -8
        }
      }
    ],
    source: "Lexicanum: Imperium Nihilus / Spear of the Emperor"
  }
);
