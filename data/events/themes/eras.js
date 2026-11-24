// 분기 사건 — 시기×장소 고유 · 대균열(greatRift) 및 임페리움 니힐루스 후유증
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
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
