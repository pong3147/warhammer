// 분기 사건 — 스페이스 마린 9대 유명 챕터 고유 · 챕터 숙원/공조 · 챕터 명예 태그 연작 (향후 개별 챕터 15~20건 이상 시 chapters/<chapter_id>.js로 승격)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
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
    id: "ev_s4_tag_emperors_champion",
    title: "황제의 투사 — 검은 검이 가리킨 적 군주와의 일기토",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["emperors_champion"] },
    reqLabel: "이력: 황제의 투사 (블랙 템플러)",
    weight: 38,
    text: "황제의 계시를 받아 검은 갑주와 검은 검을 수여받은 그대의 눈앞에, 전장 한복판에서 붉은 깃발을 휘두르는 적의 카오스 군주가 나타났다. 성전군 형제들이 일제히 길을 터 주며 황제의 투사가 치를 신성한 일기토를 지켜본다.",
    choices: [
      {
        label: "[백병 판정] 어떠한 주저도 없이 돌진해 검은 검으로 적 군주의 목을 베어 낸다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "황제의 이름이 전장에 울려 퍼지며 검은 검이 적 군주의 갑주를 양단했다! 성전군 전체가 광신적인 환호와 함께 적진을 붕괴시켰다.",
          stats: { WS: 9, WP: 6, Inf: 8 },
          faith: 12,
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "적 군주의 흉악한 반격에 치명상을 입었으나, 끝내 상대의 무기를 부러뜨리고 전선에서 몰아냈다.",
          wounds: -24,
          stats: { WS: 5, T: 4 },
          faith: 6
        }
      },
      {
        label: "[의지 판정] 성가를 외치며 적의 워프 저주를 정면으로 튕겨 내고 틈을 노려 찌른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불굴의 신앙이 사악한 마법을 무력화시켰고, 당황한 적 군주를 단칼에 쓰러뜨렸다!",
          stats: { WP: 8, WS: 6, Inf: 6 },
          faith: 10,
          corruption: -10
        },
        fail: {
          text: "워프 화염에 갑주가 그을렸으나 신앙으로 버텨 내며 적의 진격을 멈추었다.",
          wounds: -18,
          stats: { WP: 5 }
        }
      },
      {
        label: "무리한 단독 돌격 대신 형제들과 쐐기 진형을 짜 적 지휘부를 함께 분쇄한다",
        effect: {
          text: "화려한 일기토 대신 성전군 전체의 승리를 택했다. 채플린이 그대의 냉정한 헌신을 높이 샀다.",
          stats: { WS: 4, T: 4, Inf: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Emperor's Champion / Codex: Black Templars"
  },
  {
    id: "ev_s4_tag_wolf_guard",
    title: "울프 가드의 서약 — 대연회장의 룬 점괘와 출정 명령",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["wolf_guard"] },
    reqLabel: "이력: 울프 가드 (스페이스 울프)",
    weight: 38,
    text: "대중대 연회장에서 묠드(Mjod) 술잔이 부딪히는 가운데, 룬 프리스트가 뼈 조각을 던져 불길한 사냥의 예언을 읽어 냈다. 울프 로드 직속 친위대인 울프 가드로서 그대가 선봉 타격대를 이끌 차례가 다가왔다.",
    choices: [
      {
        label: "[백병 판정] 프로스트 블레이드를 치켜들고 가장 거대한 적 괴수의 숨통을 끊는 사냥을 선포한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "서리 칼날이 적 괴수의 심장을 꿰뚫었다! 그대의 무용담은 대연회장의 스칼드 서사시에 새로운 장으로 노래되었다.",
          stats: { WS: 8, T: 5, Inf: 7 }
        },
        fail: {
          text: "괴수의 발톱에 깊은 흉터를 얻었으나 사냥감의 머리는 끝내 베어 돌아왔다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 혹독한 눈보라 속 궤도 강하를 강행해 적 포병 진지를 통째로 짓밟는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "펜리스의 겨울보다 매서운 전장은 없다는 기개로 적 후방을 완벽히 유린했다!",
          stats: { T: 8, BS: 5, Inf: 6 }
        },
        fail: {
          text: "거센 대공 포화에 큰 피해를 입었으나 끝까지 진지를 무너뜨리고 귀환했다.",
          wounds: -18,
          stats: { T: 5 }
        }
      },
      {
        label: "젊은 블러드 클로 신병들을 친히 이끌어 사냥의 기본과 동료애를 가르친다",
        effect: {
          text: "거친 신병들이 그대의 지휘 아래 진정한 늑대 전사로 거듭났다. 대중대의 결속이 한층 단단해졌다.",
          stats: { Fel: 6, WP: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Wolf Guard / Codex: Space Wolves"
  },
  {
    id: "ev_s4_tag_huscarl_oath",
    title: "후스카를의 맹세 — 무너지는 성벽과 강철의 최후 방벽",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["huscarl_oath"] },
    reqLabel: "이력: 후스카를 (임페리얼 피스트)",
    weight: 38,
    text: "로갈 돈의 방어 철학을 계승한 후스카를로서 그대가 보강을 지휘하던 요새 성벽에 적의 공성 포화가 집중되었다. 외벽 제3보루에 균열이 번지며 지휘부가 2선 철수를 건의한다.",
    choices: [
      {
        label: "[지성 판정] 붕괴 각도를 즉석 계산해 무너지는 외벽 잔해를 역으로 살상 지대 바리케이드로 전환한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "성벽의 파편마저 요새의 일부로 삼는 완벽한 방어 공학! 적 공성대는 좁아진 병목에서 한 걸음도 나아가지 못했다.",
          stats: { Int: 8, T: 5, Inf: 7 }
        },
        fail: {
          text: "폭파 시점이 미세하게 어긋나 잔해에 부딪혔으나, 돌파구 봉쇄에는 성공했다.",
          wounds: -16,
          stats: { Int: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 스톰 실드를 들고 균열 한복판에 직접 서서 증원이 올 때까지 한 발자국도 물러서지 않는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "포연이 걷힌 뒤에도 황금빛 갑주는 단 한 걸음도 뒤로 밀리지 않았다! '프라이마크와 황제를 위하여!'라는 외침이 성벽을 덮었다.",
          stats: { T: 8, WP: 6, WS: 4, Inf: 7 }
        },
        fail: {
          text: "연속 포격에 중상을 입었으나 끝까지 방패를 내려놓지 않아 보루를 지켜 냈다.",
          wounds: -22,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "예비 방어선으로 질서 정연하게 후퇴해 적을 미리 설치한 화망 안으로 유인한다",
        effect: {
          text: "자존심보다 요새 전체의 보존을 택한 냉철한 판단이었다. 아군 손실을 최소화하며 공세를 꺾었다.",
          stats: { Int: 5, BS: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Huscarls / Codex: Imperial Fists"
  },
  {
    id: "ev_s4_tag_promethean_smith",
    title: "프로메테안 대장장이 — 용암로의 명검 주조와 불의 시련",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["promethean_smith"] },
    reqLabel: "이력: 프로메테안 대장장이 (샐러맨더)",
    weight: 38,
    text: "전투가 끝난 뒤에도 샐러맨더의 사명은 끝나지 않는다. 프로메테안 교단의 장인으로서 그대는 손상된 고대 유물 무구와 새 마스터크래프트 병기를 벼려 내기 위해 화산 용광로 앞에 섰다. 동시에 인근 민간 정착지가 약탈자들의 습격을 받고 있다는 긴급 구조 신호가 날아들었다.",
    choices: [
      {
        label: "[강인 판정] 밤새 용광로의 열기를 견뎌 유물 무구를 완성한 뒤 즉시 구원군 선봉으로 출격한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "갓 식힌 마스터크래프트 망치가 약탈자들의 장갑을 박살 냈다! 장인의 땀과 전사의 헌신이 정착지를 구했다.",
          stats: { T: 7, WS: 6, Int: 5, Inf: 7 }
        },
        fail: {
          text: "화상과 피로를 안고 출격해 부상을 입었으나, 민간인 대피선은 무사히 이륙시켰다.",
          wounds: -18,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 주조 작업을 잠시 멈추고 민간인 방어용 방열 장벽과 화염 방어망을 현장에서 즉석 제작한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "불칸의 자비와 장인 정신이 완벽히 어우러졌다! 정착지 주민들은 화염의 방패 뒤에서 단 한 명의 희생도 없이 살아남았다.",
          stats: { Int: 8, Fel: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "급조한 방벽 일부가 녹아내려 화상을 입었으나, 주민 대다수는 지켜 냈다.",
          wounds: -14,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "형제들에게 구원 출동을 맡기고 흔들림 없이 고대 유물 무구의 복원을 완벽히 마무리한다",
        effect: {
          text: "완벽하게 되살아난 유물 무기가 챕터 무기고에 봉안되었다. 다음 성전에서 수많은 생명을 구할 병기가 탄생했다.",
          stats: { Int: 6, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Promethean Cult / Codex: Salamanders"
  },
  {
    id: "ev_s4_tag_shadow_master",
    title: "그림자 마스터 — 적 사령부 심장부로의 무음 침투",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["shadow_master"] },
    reqLabel: "이력: 그림자 마스터 (레이븐 가드)",
    weight: 38,
    text: "정면 공성전으로 치르면 수만 명의 필멸자 병사가 희생될 난공불락의 반란 요새. 그림자 걸음의 극의에 오른 그대에게 야음을 틈타 적 총사령관의 목만 조용히 거두고 방어망을 무력화하라는 단독 임무가 하달되었다.",
    choices: [
      {
        label: "[민첩 판정] 감시 서보스컬과 레이저 격자 사이를 그림자처럼 스쳐 지나가 적 지휘관을 단신 암살한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "경보 한 번 울리지 않은 채 적 사령부가 침묵했다! 다음 날 새벽, 아군 정규군은 총 한 발 쏘지 않고 요새를 접수했다.",
          stats: { Ag: 9, WS: 5, Inf: 8 }
        },
        fail: {
          text: "경비대의 탐조등에 포착되어 난전 끝에 겨우 탈출했으나, 핵심 통신탑만은 폭파해 적을 혼란에 빠뜨렸다.",
          wounds: -18,
          stats: { Ag: 5, BS: 3 }
        }
      },
      {
        label: "[지성 판정] 암살 대신 적 보급망과 암호 통신을 교란해 반란군 내부에서 서로 총구를 겨누게 만든다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "코락스의 계략이 빛을 발했다! 의심에 사로잡힌 반란군 분파들이 자중지란을 일으키며 스스로 무너졌다.",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "기만 공작이 일부 간파되었으나, 시간을 벌어 아군 기습 강하를 성공시켰다.",
          wounds: -12,
          stats: { Int: 4, Ag: 3 }
        }
      },
      {
        label: "요새 내부 취약 지점의 좌표만 완벽히 정찰해 본대 정밀 폭격에 넘긴다",
        effect: {
          text: "불필요한 모험 대신 확실한 정보를 가져왔다. 본대의 정밀 타격으로 요새의 동력로가 순식간에 증발했다.",
          stats: { Ag: 5, Int: 5 }
        }
      }
    ],
    source: "Lexicanum: Shadowmasters / Codex: Raven Guard"
  },
  {
    id: "ev_s4_tag_khan_rider",
    title: "칸의 기수 — 모래 폭풍을 가르는 기갑 섬멸전",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["khan_rider"] },
    reqLabel: "이력: 칸의 기수 (화이트 스카)",
    weight: 38,
    text: "광활한 평원에 거대한 모래 폭풍이 몰아치며 시야가 완전히 닫혔다. 다른 제국 부대들이 진격을 멈추고 참호에 숨어든 사이, 칸의 기수로 인정받은 그대는 폭풍을 방패 삼아 적 중기갑 사단의 측면을 베어 낼 절호의 기회를 포착했다.",
    choices: [
      {
        label: "[민첩 판정] 아웃라이더 바이크의 엔진을 한계까지 끌어올려 폭풍 한가운데로 고속 돌파한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "웃음소리와 함께 번개처럼 스쳐 지나간 기습이 적 기갑 행렬을 산산조각 냈다! 적들은 무엇에게 당했는지조차 알지 못했다.",
          stats: { Ag: 8, WS: 6, Inf: 7 }
        },
        fail: {
          text: "바이크가 지뢰 파편에 튕겨 나가 큰 충격을 받았으나, 도보로 잔적을 쓸어 버리고 귀환했다.",
          wounds: -18,
          stats: { Ag: 4, T: 4 }
        }
      },
      {
        label: "[사격 판정] 시속 백 킬로미터로 질주하며 멜타와 볼터 정밀 사격으로 적 지휘 전차를 꿰뚫는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "질주하는 말 위에서 활을 쏘던 초고리스 사냥꾼의 혼이 되살아났다! 적 지휘 전차가 거대한 불기둥을 뿜으며 멈춰 섰다.",
          stats: { BS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "모래바람에 조준이 흔들려 반격 포화를 맞았으나, 적의 보급 트럭 대열은 전멸시켰다.",
          wounds: -15,
          stats: { BS: 4, Ag: 3 }
        }
      },
      {
        label: "폭풍 가장자리를 선회하며 적을 협곡 안쪽으로 몰아넣어 아군 본대의 포위망에 가둔다",
        effect: {
          text: "초원의 사냥법 그대로 먹잇감을 그물로 몰아넣었다. 완벽한 기동 협동 작전이었다.",
          stats: { Ag: 5, Int: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: White Scars / Codex: White Scars"
  },
  {
    id: "ev_s4_tag_ultramar_scholar",
    title: "울트라마르 학자 — 500세계 행정 재건과 썩은 총독의 장부",
    category: "명예 태그 연작",
    once: true,
    req: { allTags: ["ultramar_scholar"] },
    reqLabel: "이력: 울트라마르 학자",
    weight: 36,
    text: "울트라마르의 실용 행정과 법학을 익힌 그대의 명성이 알려져, 보급난에 시달리는 인근 행성의 전시 행정 감사 위원으로 초빙되었다. 감사 첫날 밤, 그대는 현지 총독 가문이 군량미를 암시장에 빼돌려 온 이중 장부를 발견하고 말았다.",
    choices: [
      {
        label: "[지성 판정] 10년 치 세금과 수송 기록을 완벽히 대조해 반박 불가능한 탄핵 조서를 작성한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "총독의 변명이 한 줄도 통하지 않았다! 부패한 관리들이 일제히 숙청되고, 압수한 군량미가 전선으로 즉시 수송되었다.",
          stats: { Int: 8, Inf: 8, WP: 4 }
        },
        fail: {
          text: "증거 일부가 방화로 소실되어 완전한 숙청엔 실패했으나, 군량미 유출만은 틀어막았다.",
          stats: { Int: 4, Inf: -2 },
          wounds: -10
        }
      },
      {
        label: "[교섭 판정] 총독의 목숨은 살려 주는 조건으로 가문 사재 전액을 전시 구호 기금으로 헌납하게 압박한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "행성 행정 마비 없이 막대한 군자금과 식량을 단숨에 확보했다! 울트라마르다운 실리적 해결이었다.",
          stats: { Fel: 8, Inf: 7, Int: 4 }
        },
        fail: {
          text: "총독 측과 거친 신경전을 벌이다 정치적 앙금을 남겼으나, 일부 물자는 회수했다.",
          stats: { Fel: 3, Inf: -3 }
        }
      },
      {
        label: "장부 사본을 봉인해 상급 아드미니스트라툼 감사국에 정식 이관하고 절차대로 처분을 맡긴다",
        effect: {
          text: "개인적 복수나 정치 개입을 피하고 법과 절차의 원칙을 지켰다.",
          stats: { Int: 5, WP: 4, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Ultramar / Codex: Ultramarines"
  },
  {
    id: "ev_s6_chap_rivalry_da_sw",
    title: "라이온과 늑대의 전통 — 다크 엔젤과 스페이스 울프의 명예 결투",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["dark_angels", "space_wolves"]
    },
    reqLabel: "챕터: 다크 엔젤 또는 스페이스 울프",
    weight: 36,
    text: "합동 원정 작전 직전, 다크 엔젤과 스페이스 울프 타격 순양함이 같은 궤도에 나란히 정박했다. 1만 년 전 두 프라이마크 라이온 엘 존슨과 리만 러스의 격돌 이래 내려온 오래된 관습에 따라, 양 챕터 대표 전사가 첫 피가 흐를 때까지 겨루는 의례적 명예 결투의 차례가 돌아왔다. 형제들의 시선이 그대에게 모였다.",
    choices: [
      {
        label: "[백병 판정] 챕터의 자존심을 걸고 검을 뽑아 상대 챕터 투사와 정정당당한 첫 피(First Blood) 결투에 나선다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불꽃 튀는 공방 끝에 상대의 어깨 장갑을 정확히 베어 냈다! 두 챕터 형제들 모두 호쾌한 환호와 함께 서로의 무예에 경의를 표했다.",
          stats: { WS: 8, WP: 5, Inf: 7 }
        },
        fail: {
          text: "상대의 거센 반격에 뺨에 첫 피를 내어 주며 패배했으나, 굴복 없는 기백을 인정받아 굳건한 전우애를 맺었다.",
          wounds: -12,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 치명적 부상을 피하기 위해 무장 대신 맨손 격투로 승부를 제안해 두 프라이마크의 혈투를 재현한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "수십 분의 난타전 끝에 두 거인이 나란히 웃음을 터뜨리며 쓰러졌다! 1만 년 묵은 앙금이 유쾌한 연대로 녹아내렸다.",
          stats: { T: 8, WS: 5, Fel: 5, Inf: 6 }
        },
        fail: {
          text: "갈비뼈에 금이 가는 묵직한 강타를 맞았으나 끝까지 웃으며 버텨 상대의 존중을 얻었다.",
          wounds: -15,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "전통의 예를 갖춘 뒤 실전 작전 브리핑으로 화제를 돌려 두 챕터의 협동 타격 계획을 조율한다",
        effect: {
          text: "허영보다 승리를 앞세운 냉철한 자세 덕분에 합동 강하 작전이 완벽한 호흡으로 전개되었다.",
          stats: { Int: 5, WP: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Lion El'Jonson & Leman Russ Honor Duel"
  },
  {
    id: "ev_s6_chap_rivalry_um_bt",
    title: "코덱스냐 성전이냐 — 울트라마린과 블랙 템플러의 합동 작전 충돌",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["ultramarines", "black_templars"]
    },
    reqLabel: "챕터: 울트라마린 또는 블랙 템플러",
    weight: 36,
    text: "이단 요새 공략을 앞두고 울트라마린 중대와 블랙 템플러 성전군이 합동 작전실에 마주 앉았다. 《코덱스 아스타르테스》의 정밀 포위·보급 차단 교리를 고집하는 측과, 지기스문트의 정신을 이어 즉각적인 쇄도와 적 수괴 참수를 외치는 측이 팽팽하게 맞서며 회의가 얼어붙었다.",
    choices: [
      {
        label: "[지성 판정] 울트라마린의 정밀 포격으로 성벽을 붕괴시키는 동시에 블랙 템플러가 돌파구로 쇄도하는 절충안을 설계한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "이성과 광신이 완벽한 망치와 모루로 결합했다! 이단 요새가 반나절 만에 함락되며 양 챕터 모두가 그대의 전략안을 극찬했다.",
          stats: { Int: 8, Inf: 7, BS: 4 }
        },
        fail: {
          text: "작전 개시 시점이 엇갈려 혼선이 빚어졌으나, 양 챕터의 압도적 무력으로 가까스로 승리했다.",
          wounds: -14,
          stats: { Int: 4, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 교리 논쟁을 일갈하며 '우리 모두 황제의 아들이자 같은 인류의 방패'라는 대의로 지휘부를 다잡는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "서로 날을 세우던 두 챕터의 지휘관이 고개를 끄덕이며 공동 출격을 선포했다!",
          stats: { WP: 8, Fel: 6, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "끝내 서로의 방식을 존중한 채 독자 구역으로 갈라져 싸워야 했으나, 내분만은 막았다.",
          stats: { WP: 5 }
        }
      },
      {
        label: "소속 챕터의 교리에 충실하게 맡은 구역의 전투만 묵묵히 완수해 결과로 증명한다",
        effect: {
          text: "말다툼 대신 완벽한 전과로 상대 챕터의 말없는 경의를 이끌어 냈다.",
          stats: { WS: 4, BS: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Codex Astartes / Black Templars & Ultramarines Lore"
  },
  {
    id: "ev_s6_chap_rivalry_sal_civilians",
    title: "필멸자 피난선과 요새 방어 — 아스타르테스 합동 지휘부의 윤리 충돌",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders", "imperial_fists", "blood_angels"]
    },
    reqLabel: "챕터: 샐러맨더 · 임페리얼 피스트 · 블러드 엔젤",
    weight: 34,
    text: "궤도 폭격이 임박한 하이브 도시의 최후 방어전. 냉혹한 제국 사령부는 민간 피난 공항을 포기하고 궤도 방어 포대 하나에 전 병력을 집중하라고 권고한다. 그러나 그대의 챕터는 인류를 지키기 위해 태어난 천사들이다. 공항에는 아직 수만 명의 피난민이 수송선을 기다리고 있다.",
    choices: [
      {
        label: "[강인 판정] 분대를 둘로 나누어 스스로 공항 방어선에 남아 마지막 피난선이 대기권을 벗어날 때까지 버틴다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "포연 속으로 마지막 수송선이 솟아올랐고, 궤도 포대마저 지켜 냈다! 생존한 시민들이 챕터의 문장을 향해 눈물로 경배했다.",
          stats: { T: 8, WP: 7, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "집중 포화에 갑주가 반파되는 중상을 입었으나, 피난선 대다수가 탈출할 시간을 벌어 냈다.",
          wounds: -22,
          stats: { T: 5, WP: 5 },
          faith: 6
        }
      },
      {
        label: "[사격 판정] 궤도 방어 포대의 대공 사격을 정밀 조율해 적 폭격 편대를 공항 상공 진입 전에 요격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "전략 요충지와 민간인 공항을 동시에 지키는 완벽한 방공 화망이었다! 합동 지휘부가 경탄을 금치 못했다.",
          stats: { BS: 8, Int: 5, Inf: 6 }
        },
        fail: {
          text: "적 요격기 일부가 돌파해 피해가 발생했으나, 공항 활주로 파괴만은 막아 냈다.",
          wounds: -14,
          stats: { BS: 4, Int: 3 }
        }
      },
      {
        label: "전술적 손실을 냉정히 계산해 궤도 포대 사수를 최우선으로 두고 공항 쪽은 잔여 방위군에 엄호를 맡긴다",
        effect: {
          text: "가슴 아픈 결단이었으나 궤도 방어망을 지켜 행성 전체의 함락을 막아 냈다.",
          stats: { WP: 6, Int: 5 }
        }
      }
    ],
    source: "Lexicanum: Salamanders / Blood Angels / Imperial Fists Lore"
  },
  {
    id: "ev_s6_chap_rivalry_rg_ws",
    title: "그림자와 번개의 협공 — 레이븐 가드와 화이트 스카의 합동 기습전",
    category: "챕터 숙원 · 공조",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard", "white_scars"]
    },
    reqLabel: "챕터: 레이븐 가드 또는 화이트 스카",
    weight: 36,
    text: "거대한 반란군 기갑 사단을 상대로 레이븐 가드와 화이트 스카가 합동 타격 작전에 돌입했다. 정면 공성전 대신, 어둠 속 침투와 번개 같은 기동 기습이 맞물리는 완벽한 2중 함정 작전이다. 단 1초라도 타이밍이 어긋나면 선봉대가 적 중전차 포화에 갈려 나갈 절체절명의 기동전이다.",
    choices: [
      {
        label: "[민첩 판정] 무선 침묵을 지킨 채 정확한 초 단위 호흡으로 적 통신탑 폭파와 기갑 돌격을 완벽히 동기화한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "그림자가 눈을 가리고 번개가 심장을 꿰뚫었다! 적 기갑 사단이 반격 한 번 제대로 못 해 보고 와해되었다.",
          stats: { Ag: 8, WS: 5, Inf: 7 }
        },
        fail: {
          text: "적 대공포의 예기치 못한 사격에 궤도가 흔들려 부상을 입었으나, 기습 돌파 자체는 성공시켰다.",
          wounds: -16,
          stats: { Ag: 5, T: 3 }
        }
      },
      {
        label: "[지성 판정] 적 지휘부가 예상할 퇴로에 미리 기만 신호를 흘려 적 예비대까지 통째로 살상 지대로 유인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "코락스의 계략과 자가타이 칸의 속도가 완벽히 결합한 전설적 섬멸전으로 코덱스 전사에 기록되었다!",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "기만 신호 일부가 들통나 치열한 추격전을 치렀으나, 적 지휘부 붕괴에는 성공했다.",
          wounds: -14,
          stats: { Int: 4, Ag: 4 }
        }
      },
      {
        label: "무리한 추격을 멈추고 적 보급 창고와 연료 탱크만 깔끔하게 불태운 뒤 흔적 없이 이탈한다",
        effect: {
          text: "발이 묶인 적 기갑 사단은 사흘 만에 스스로 항복했다. 최소 피해로 최대 전과를 올린 교본 같은 기습전이었다.",
          stats: { Ag: 5, Int: 5, BS: 3 }
        }
      }
    ],
    source: "Lexicanum: Raven Guard / White Scars / Damocles Campaign"
  }
);
