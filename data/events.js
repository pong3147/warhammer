window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};

window.IMPERIUM_DATA.EVENTS = [
  // =========================================================================
  // 1. 유년기 · 성장 · 선발 이벤트
  // =========================================================================
  {
    id: "ev_schola_scout",
    title: "스콜라 프로제니움의 검은 마차",
    category: "성장",
    once: true,
    req: { minAge: 8, maxAge: 14, excludeWorlds: ["krieg"], excludeWorldTags: ["feral"], excludeTags: ["schola", "astartes", "custodes", "abhuman"], or: [{ stats: { WP: 34 } }, { stats: { Int: 34 } }, { anyTags: ["military_blood", "pious"] }] },
    reqLabel: "나이 8~14세 · 의지 또는 지성 34+",
    weight: 18,
    text: "아뎁투스 미니스토룸의 드릴-애벗(교관 수도사)이 그대의 또렷한 눈빛과 기개를 눈여겨보았다. 스콜라 프로제니움 편입 시험에 응시하면 커미사르, 소로리타스, 템페스투스 사이온, 심지어 이단심문관으로 가는 엘리트 관문이 열린다.",
    choices: [
      {
        label: "[의지 판정] 가혹한 교관의 시련을 견디고 스콜라에 입학한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "채찍과 기도문 암송, 실탄 훈련을 버텨 내고 정식 스콜라 프로제니움 생도가 되었다!",
          stats: { WP: 6, WS: 4, BS: 4, Int: 4, Inf: 6 },
          faith: 15,
          addTags: ["schola", "elite_track"]
        },
        fail: {
          text: "체벌과 혹독한 훈련을 견디지 못하고 탈락해 멍든 몸으로 돌아왔다. 그래도 기초 체력은 다져졌다.",
          wounds: -12,
          stats: { T: 3, WP: 2 }
        }
      },
      {
        label: "자유를 잃기 싫다. 정중히 물러나 고향에 남는다",
        effect: {
          text: "교관은 혀를 차며 떠났다. 그대는 덜 가혹하지만 덜 영광스러운 평범한 길을 택했다.",
          stats: { Ag: 2, Fel: 2 }
        }
      }
    ],
    source: "Lexicanum: Schola Progenium"
  },
  {
    id: "ev_astartes_recruiter",
    title: "하늘에서 내려온 거인들 — 챕터 징병관의 방문",
    category: "선발",
    once: true,
    req: {
      minAge: 11,
      maxAge: 16,
      gender: "male",
      excludeTags: ["astartes", "custodes", "abhuman", "heretic"],
      or: [{ anyTags: ["geneseed_compatible"] }, { anyWorldTags: ["astartes_recruit"] }]
    },
    reqLabel: "소년기(11~16세) · 진시드 적합 또는 챕터 징병 행성",
    weight: 28,
    text: "강철 썬더호크 강습정이 굉음과 함께 내려앉고, 2.5미터 거구의 아뎁투스 아스타르테스 채플린과 아포세카리가 소년들을 사열한다. '인류의 가장 어두운 시대에 맞설 천사의 후보를 찾노라. 죽음을 각오한 자만 앞으로 나서라!'",
    choices: [
      {
        label: "[강인 판정 · 목숨을 건 도전] 아스타르테스 선발 시련과 진시드 수술에 지원한다",
        req: { stats: { T: 34, WS: 32 } },
        check: { stat: "T", diff: -5 },
        success: {
          text: "수백 명의 지원자 중 극소수만 살아남은 혈전과 19개 초인 장기 이식을 견뎌 냈다! 그대는 아스타르테스 네오파이트가 되었다!",
          forceCareer: "astartes_scout",
          stats: { T: 14, WS: 12, BS: 10, WP: 10, Inf: 10 },
          woundsBonus: 40,
          addTags: ["astartes", "transhuman"]
        },
        fail: {
          text: "혹독한 시련 끝에 진시드 거부 반응을 일으켰다. 죽음 직전 챕터 아포세카리가 생명을 건져 주었고, 그대는 평생 챕터를 섬기는 챕터 서프의 표식을 얻었다.",
          wounds: -35,
          stats: { T: 4, WP: 5, Inf: 4 },
          addTags: ["chapter_serf"]
        }
      },
      {
        label: "[의지 55+ & 사이커 해금] 은빛 갑주의 비밀 사절 — 타이탄(그레이 나이트)의 부름에 응한다",
        req: { allTags: ["psyker"], stats: { WP: 55, T: 42 }, maxCorruption: 5 },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "보통 챕터가 아니었다. 은빛 갑주의 사절이 그대를 토성의 위성 타이탄으로 데려갔고, 666가지 시련을 넘어 그레이 나이트가 되었다!",
          forceCareer: "grey_knight",
          stats: { WP: 16, WS: 14, T: 12, Inf: 14 },
          woundsBonus: 45,
          corruption: -50,
          addTags: ["astartes", "grey_knight", "transhuman", "power_armor"]
        },
        fail: {
          text: "타이탄의 정신 심문을 통과하지 못하고 기억이 소거된 채 행성으로 돌려보내졌다.",
          wounds: -20,
          stats: { WP: 3 }
        }
      },
      {
        label: "두려움에 발을 떼지 못하고 관중 속에 남는다",
        effect: {
          text: "하늘 전사들이 떠난 뒤에도 거대한 파워 아머의 잔상이 평생 머릿속에 남았다.",
          stats: { WP: -2 }
        }
      }
    ],
    source: "Lexicanum: Creation of a Space Marine / Grey Knights"
  },
  {
    id: "ev_catachan_rite",
    title: "카타찬 밀림 성인식 — 카타찬 데블과의 조우",
    category: "행성",
    once: true,
    req: { minAge: 12, maxAge: 20, anyWorlds: ["catachan"], anyHomeWorlds: ["catachan"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 카타찬 · 나이 12~20세",
    weight: 26,
    text: "식인 덩굴과 독개구리가 우글거리는 밀림 한복판, 거대한 절지 괴수 '카타찬 데블'이 앞을 가로막았다. 여기서 살아 돌아와야 비로소 카타찬의 어른으로 인정받는다.",
    choices: [
      {
        label: "[백병 판정] 정글 단검을 쥐고 급소 관절을 노려 쓰러뜨린다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "괴수의 갑각 틈새에 단검을 꽂아 넣었다! 부족 전체가 그대에게 붉은 반다나를 매어 주었다.",
          stats: { WS: 7, T: 6, Ag: 4, Inf: 5 },
          addTags: ["catachan_blooded"]
        },
        fail: {
          text: "독침에 스쳐 사경을 헤매다 기어코 기지로 기어 돌아왔다. 흉터가 훈장이 되었다.",
          wounds: -26,
          stats: { T: 5 }
        }
      },
      {
        label: "[민첩 판정] 포식자의 사각으로 몸을 숨겨 함정으로 유인한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "유독 늪지대로 괴수를 유인해 털끝 하나 다치지 않고 빠져나왔다. 밀림의 사냥꾼들이 혀를 내둘렀다.",
          stats: { Ag: 6, Int: 4, BS: 3 }
        },
        fail: {
          text: "식인 이끼 덫을 밟아 다리를 크게 다쳤다.",
          wounds: -20
        }
      }
    ],
    source: "Lexicanum: Catachan"
  },
  {
    id: "ev_fenris_hunt",
    title: "펜리스 빙원의 피의 사냥",
    category: "행성",
    once: true,
    req: { minAge: 12, maxAge: 22, anyWorlds: ["fenris"], anyHomeWorlds: ["fenris"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 펜리스 · 나이 12~22세",
    weight: 26,
    text: "얼음 대륙이 갈라지는 해빙기, 거대한 펜리스 늑대 무리가 부족의 야영지를 덮쳤다. 하늘 멀리서 늑대 사제(Wolf Priest)가 전사들의 용맹을 내려다보고 있다는 소문이 돈다.",
    choices: [
      {
        label: "[백병 판정] 도끼를 치켜들고 알파 늑대와 일대일로 맞붙는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "거대한 빙원 늑대를 맨손과 도끼로 제압했다! 스페이스 울프 늑대 사제가 고개를 끄덕이며 그대의 이름을 기억했다.",
          stats: { WS: 8, T: 6, WP: 5, Inf: 6 },
          addTags: ["geneseed_compatible", "fenris_blood"]
        },
        fail: {
          text: "어깨를 깊게 물렸지만 늑대를 쫓아내는 데 성공했다. 펜리스인에게 상처는 노래의 재료일 뿐이다.",
          wounds: -24,
          stats: { WS: 3, T: 4 }
        }
      },
      {
        label: "[사격 판정] 작살과 창을 던져 부족민들의 퇴로를 엄호한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "정확한 투창으로 늑대 무리를 흩어 놓고 아이들과 노인을 구했다.",
          stats: { BS: 5, Fel: 5, Inf: 4 }
        },
        fail: {
          text: "얼어붙은 빙판에 미끄러져 타박상을 입었다.",
          wounds: -14
        }
      }
    ],
    source: "Lexicanum: Fenris / Codex: Space Wolves"
  },
  {
    id: "ev_krieg_drill",
    title: "크리그 지하 훈련소의 속죄 서약",
    category: "행성",
    once: true,
    req: { minAge: 13, maxAge: 19, anyWorlds: ["krieg"], anyHomeWorlds: ["krieg"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 크리그 · 나이 13~19세",
    weight: 28,
    text: "방독면 너머로 차가운 교관의 음성이 울린다. '우리 조상은 황제를 배신했다. 오직 전선에서의 헌신만이 죄를 씻는다.' 실탄이 빗발치는 방사능 폐허 생존 훈련이 시작된다.",
    choices: [
      {
        label: "[의지 판정] 한 치의 주저도 없이 포격 지대를 향해 전진한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "우수한 성적으로 훈련을 마치고 데스 코어 정예 척탄병 후보로 지목되었다.",
          stats: { WP: 7, T: 5, BS: 5, WS: 4 },
          faith: 12,
          addTags: ["krieg_grenadier"]
        },
        fail: {
          text: "파편에 부상을 입었지만 멈추지 않고 완주했다. 크리그에서 부상은 핑계가 되지 못한다.",
          wounds: -20,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 공병 참호 설계와 화생방 장비 정비에 두각을 나타낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "지하 요새와 공성 포병대 운용 적성을 인정받아 전문 공병으로 배치되었다.",
          stats: { Int: 6, BS: 4, T: 3 }
        },
        fail: {
          text: "지뢰 해체 훈련 중 경미한 폭발에 휘말렸다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Death Korps of Krieg"
  },
  {
    id: "ev_noble_poison",
    title: "상층 첨탑의 만찬과 독잔",
    category: "정치",
    once: true,
    req: { minAge: 14, maxAge: 45, excludeTags: ["astartes", "custodes", "grey_knight", "sororitas", "dreadnought"], or: [{ allTags: ["noble"] }, { stats: { Inf: 48 } }] },
    reqLabel: "귀족 출신 또는 권위 48+ (필멸자)",
    weight: 16,
    text: "경쟁 가문이 주최한 화려한 만찬장. 고급 아마섹 포도주 잔에서 미세한 금속성 향이 스친다. 제국 귀족 사회에서 독살은 그저 일상적인 인사치레일 뿐이다.",
    choices: [
      {
        label: "[이단심문소/아르비테스 전용] 로제트와 제국법의 이름으로 독살 음모 가문을 현장에서 압송한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites"] },
        effect: {
          text: "제국 요원에게 독을 먹이려 한 대역죄! 경쟁 가문의 저택이 통째로 압수되고 그대의 위엄이 행성에 떨쳤다.",
          stats: { Inf: 12, WP: 5 }
        }
      },
      {
        label: "[지성 42+ 해금] 독의 성분을 간파하고 경쟁 가문의 잔과 은밀히 바꿔치기한다",
        req: { stats: { Int: 42 } },
        check: { stat: "Int", diff: 5 },
        success: {
          text: "정적이 제 꾀에 넘어가 쓰러졌고, 가문의 위상과 그대의 냉혹한 평판이 하늘을 찔렀다!",
          stats: { Inf: 12, Int: 5, Fel: 4 }
        },
        fail: {
          text: "눈치챈 경호원들과 소동이 벌어져 간신히 몸을 피했다.",
          stats: { Inf: -4 },
          wounds: -12
        }
      },
      {
        label: "[교섭 판정] 공개적으로 축배를 거절하며 외교적 역공을 펼친다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "우아한 언변으로 상대 가문을 망신 주고 행성 총독의 신임을 얻었다.",
          stats: { Fel: 6, Inf: 8 }
        },
        fail: {
          text: "체면을 구기고 사교계 입지가 다소 좁아졌다.",
          stats: { Inf: -6 }
        }
      },
      {
        label: "[강인 판정] 이미 한 모금 마셔 버렸다! 해독제를 삼키며 버틴다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "강인한 체질로 치명독을 이겨 냈다. 암살자는 공포에 질려 도주했다.",
          stats: { T: 5, WP: 4 },
          wounds: -12
        },
        fail: {
          text: "극심한 중독 증세로 몇 달간 병석에 누워 있어야 했다.",
          wounds: -30
        }
      }
    ],
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "ev_underhive_gang",
    title: "언더하이브 구역 쟁탈전",
    category: "지하세계",
    req: { minAge: 13, maxAge: 35, excludeTags: ["astartes", "custodes", "grey_knight", "dreadnought"], or: [{ anyWorldTags: ["hive", "underhive"] }, { anyCareers: ["underhive_ganger"] }] },
    reqLabel: "하이브 월드 거주 또는 갱단원 (필멸자)",
    weight: 14,
    text: "정수 파이프 아래 녹슨 다리 위에서 라이벌 갱단이 오토건과 쇠파이프를 들고 포위해 왔다. 아르비테스는 이 깊은 하층까지 내려오지 않는다.",
    choices: [
      {
        label: "[이단심문관/커미사르/아르비테스/소로리타스 전용] 제국의 인장과 볼터를 꺼내 갱단 전원을 즉각 무릎 꿇린다",
        req: { anyTags: ["inquisitor", "commissar", "lord_commissar", "arbites", "sororitas"] },
        effect: {
          text: "제국 권위의 상징을 보자 오합지졸 갱단원들이 그 자리에서 무기를 던지고 엎드렸다! 유용한 지하 정보망을 손에 넣었다.",
          stats: { Inf: 6, WP: 4 }
        }
      },
      {
        label: "[백병 판정] 쇠파이프와 칼날을 휘둘러 선봉을 쓰러뜨린다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "갱단 두목을 쓰러뜨리고 구역의 전리품과 명성을 손에 넣었다!",
          stats: { WS: 5, T: 3, Inf: 4 }
        },
        fail: {
          text: "집단 구타를 당해 늑골이 부러졌으나 목숨만은 건졌다.",
          wounds: -22
        }
      },
      {
        label: "[민첩 판정] 환기구와 폐기물 슈트를 타고 감쪽같이 탈출한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "추격자들을 따돌리고 암시장 밀수꾼들의 비밀 창고를 우연히 발견했다!",
          stats: { Ag: 5, Int: 3, Inf: 3 }
        },
        fail: {
          text: "독성 슬러지 웅덩이에 빠져 피부에 심한 화상을 입었다.",
          wounds: -16,
          corruption: 3
        }
      }
    ],
    source: "Lexicanum: Necromunda"
  },

  // =========================================================================
  // 2. 사이커 · 블랭크 · 특수 자질 이벤트
  // =========================================================================
  {
    id: "ev_black_ships",
    title: "궤도에 뜬 검은 함선 (The Black Ships)",
    category: "사이커",
    once: true,
    req: { minAge: 14, allTags: ["psyker"], excludeTags: ["sanctioned_psyker", "grey_knight", "astartes", "custodes", "heretic"] },
    reqLabel: "자질: 잠재 사이커 (미공인)",
    weight: 30,
    text: "하늘에 불길한 칠흑빛 거함이 떴다. 침묵의 자매들과 아뎁투스 아스트라 텔레파티카의 십일조 징수대가 행성의 모든 사이커를 수색하고 있다! 끌려가면 대다수는 테라 황금 옥좌의 양분이 되지만, 강한 의지를 증명하면 공인 사이커로 거듭날 수 있다.",
    choices: [
      {
        label: "[의지 판정] 당당히 자수해 테라 영혼 결속 의식에 도전한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "황제의 빛과 맞닿는 영혼 결속의 고통을 버텨 냈다! 그대는 제국이 공인한 생션드 사이커·아스트로패스가 되었다!",
          forceCareer: "sanctioned_psyker",
          stats: { WP: 10, Int: 6, Inf: 8 },
          faith: 15,
          corruption: -8,
          addTags: ["sanctioned_psyker"]
        },
        fail: {
          text: "영혼 결속 도중 극심한 신경 손상을 입어 시력 일부를 잃었으나, 간신히 옥좌 제물 행은 면하고 하급 아스트로패스로 살아남았다.",
          forceCareer: "sanctioned_psyker",
          wounds: -30,
          stats: { WP: 6, Int: 3 },
          addTags: ["sanctioned_psyker"]
        }
      },
      {
        label: "[민첩 판정] 검은 함선의 수색망을 피해 지하로 잠적한다 (위험)",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "수색대를 따돌리고 무등록 사이커로 숨어 지내는 데 성공했다. 하지만 워프의 속삭임은 날로 거세진다.",
          stats: { Ag: 5, Int: 4 },
          corruption: 14,
          addTags: ["rogue_psyker"]
        },
        fail: {
          text: "침묵의 자매들에게 포박되어 검은 함선 선창에 갇혔다. 테라로 향하는 항해 도중 정신이 무너져 황금 옥좌의 불꽃을 지피는 천 명의 제물 중 하나가 되었다.",
          instantDeath: "검은 함선에 연행된 뒤 테라 황금 옥좌의 영혼 연료로 바쳐짐"
        }
      }
    ],
    source: "Lexicanum: League of Blackships"
  },
  {
    id: "ev_perils_of_warp",
    title: "워프의 위험 (Perils of the Warp)",
    category: "사이커",
    req: { minAge: 16, allTags: ["psyker"], excludeTags: ["grey_knight"] },
    reqLabel: "자질: 사이커",
    weight: 16,
    text: "사이킥 능력을 행사하던 찰나, 현실의 장막이 찢어지며 차가운 서리가 온 방을 뒤덮었다! 그림자 속에서 다채로운 악마의 눈동자가 그대의 영혼을 엿본다.",
    choices: [
      {
        label: "[아스타르테스 전용] 챕터의 전투 함성을 내지르고 사이킥 정신 장벽으로 악마를 짓밟는다",
        req: { allTags: ["astartes"] },
        check: { stat: "WP", diff: 15 },
        success: {
          text: "'그들은 공포를 알지 못하리라!' 초인의 정신 장벽에 부딪힌 워프 악마가 비명을 지르며 추방되었다. 챕터 라이브러리우스의 품격을 증명했다!",
          stats: { WP: 6, Int: 4 },
          corruption: -6
        },
        fail: {
          text: "강력한 반동이 파워 아머 내부를 울렸으나, 끝내 악마에게 영혼의 틈을 내어 주지 않았다.",
          wounds: -12,
          stats: { WP: 3 }
        }
      },
      {
        label: "[신앙 65+ 전용] 공포 대신 《렉티티오 디비니타투스》 성가를 외워 워프의 불길을 정화한다",
        req: { minFaith: 65, excludeTags: ["heretic"] },
        check: { stat: "WP", diff: 10 },
        success: {
          text: "흔들림 없는 황제 신앙의 빛이 서리를 태워 버렸다! 악마의 속삭임은 재가 되어 흩어졌고 영혼은 더욱 순결해졌다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -8
        },
        fail: {
          text: "잠시 정신이 흔들려 코피를 흘렸으나, 신앙의 방패 덕분에 오염은 크게 번지지 않았다.",
          wounds: -14,
          corruption: 4
        }
      },
      {
        label: "[의지 판정] 황제의 이름을 외치며 워프 균열을 억지로 닫는다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "악마의 속삭임을 몰아내고 사이킥 통제력이 한층 정교해졌다!",
          stats: { WP: 6, Int: 3 },
          faith: 6
        },
        fail: {
          text: "사이킥 역류로 피를 토하며 쓰러졌고, 영혼에 지워지지 않는 워프의 균열이 남았다.",
          wounds: -24,
          corruption: 14
        }
      },
      {
        label: "[금단] 악마가 건네는 지식을 대가로 균열을 받아들인다",
        effect: {
          text: "순간적으로 엄청난 지혜와 워프의 힘이 뇌리를 스쳤지만, 신앙의 빛이 급격히 식어 갔다.",
          stats: { Int: 8, WP: 4 },
          faith: -18,
          corruption: 22
        }
      }
    ],
    source: "Dark Heresy: Perils of the Warp"
  },
  {
    id: "ev_blank_recruit",
    title: "영혼 없는 자를 찾는 검은 인장",
    category: "특수",
    once: true,
    req: { minAge: 16, allTags: ["blank"], excludeTags: ["inquisition_agent", "inquisitor", "astartes", "custodes", "grey_knight", "magos", "rogue_trader", "canoness", "lord_commissar"] },
    reqLabel: "자질: 블랭크(퍼라이어) · 16세+",
    weight: 28,
    text: "평생 주변 사람들에게 이유 없는 혐오를 받아 왔던 그대 앞에, 로제트를 품은 오르도 말레우스 이단심문관이 나타났다. '워프의 괴물들 앞에서 흔들리지 않는 너의 공허한 영혼은 제국의 가장 귀한 무기다. 나와 함께하겠느냐?'",
    choices: [
      {
        label: "이단심문관의 제안을 수락해 이단심문소 어콜라이트가 된다",
        effect: {
          text: "평생의 저주였던 블랭크 체질이 최고의 축복으로 바뀌었다! 악마와 이단 사냥꾼의 길에 들어섰다.",
          forceCareer: "inquisition_acolyte",
          stats: { WP: 8, Int: 5, Inf: 12 },
          addTags: ["inquisition_agent", "daemon_bane"]
        }
      },
      {
        label: "자유로운 용병·방랑자의 삶을 고집하며 거절한다",
        effect: {
          text: "이단심문관은 아쉬워하며 비밀 연락 암호만 남기고 떠났다.",
          stats: { WP: 4, Inf: 4 },
          addTags: ["inquisition_favor"]
        }
      }
    ],
    source: "Lexicanum: Blank / Eisenhorn & Ravenor"
  },
  {
    id: "ev_ogryn_loyalty",
    title: "오그린의 묵직한 충성",
    category: "특수",
    req: { minAge: 16, allTags: ["ogryn"] },
    reqLabel: "자질: 앱휴먼(오그린)",
    weight: 18,
    text: "적의 중화기 진지가 아군 소대를 향해 불을 뿜고 있다! 커미사르가 손가락으로 벙커를 가리키며 외친다. '저기 나쁜 놈들을 치워라, 황제 폐하께서 보신다!'",
    choices: [
      {
        label: "[강인 판정] 리퍼 건을 쏘며 벙커 벽을 맨몸으로 들이받아 부순다",
        check: { stat: "T", diff: 10 },
        success: {
          text: "철근 콘크리트 벽을 어깨로 뚫고 들어가 적을 전부 날려 버렸다! 커미사르가 특대형 배급과 황금 스티커 훈장을 안겨 주었다.",
          stats: { T: 6, WS: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "총탄을 수십 발 맞고 쓰러졌지만 튼튼한 가죽 덕분에 며칠 만에 벌떡 일어났다.",
          wounds: -20,
          stats: { T: 4 }
        }
      }
    ],
    source: "Lexicanum: Ogryn"
  },

  // =========================================================================
  // 3. 군사 · 아스트라 밀리타룸 · 커미사르 · 소로리타스 이벤트
  // =========================================================================
  {
    id: "ev_imperial_tithe",
    title: "아스트라 밀리타룸 십일조 징집령",
    category: "군사",
    req: { minAge: 16, maxAge: 34, anyCareers: ["menial_worker", "pdf_trooper", "underhive_ganger"] },
    reqLabel: "16~34세 · 시민/방위군/갱단원",
    weight: 18,
    text: "행성 궤도에 거대한 제국 병력 수송선이 정박했다. 아드미니스트라툼의 십일조 징집 포고문이 행성 전역에 울려 퍼진다. 가장 건장한 청년 10%가 아스트라 밀리타룸 연대로 차출된다!",
    choices: [
      {
        label: "황제의 부름에 응해 행성 고유 연대에 입대한다",
        effect: {
          text: "제식 라스건과 플래크 갑옷, 그리고 《제국 보병 입문서》를 지급받았다! 은하계 전선으로의 행군이 시작된다.",
          forceCareer: "astra_militarum",
          stats: { BS: 5, WS: 4, T: 4, WP: 3 },
          faith: 6,
          addTags: ["militarum", "imperial_military"]
        }
      },
      {
        label: "[권위 40+ 해금] 인맥과 뇌물을 동원해 징집 명단에서 이름을 뺀다",
        req: { stats: { Inf: 40 } },
        check: { stat: "Inf", diff: 5 },
        success: {
          text: "행정관의 서류철에서 그대의 이름이 감쪽같이 사라졌다. 전쟁터 대신 안전한 후방에 남았다.",
          stats: { Inf: 2, Int: 2 }
        },
        fail: {
          text: "뇌물이 발각되어 징벌 부대급 최전선 연대로 강제 배속되고 말았다!",
          forceCareer: "astra_militarum",
          stats: { Inf: -8, T: 3 },
          addTags: ["militarum", "penal_mark"]
        }
      },
      {
        label: "[민첩 판정] 하층 구역으로 도주해 징집을 피한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "아르비테스 검문소를 따돌리고 가까스로 도망쳤다. 당분간 신분을 숨겨야 한다.",
          stats: { Ag: 4, Inf: -6 }
        },
        fail: {
          text: "도주 중 체포되어 곤봉 세례를 받은 뒤 최전방 보병으로 끌려갔다.",
          forceCareer: "astra_militarum",
          wounds: -18,
          stats: { Inf: -6 },
          addTags: ["militarum"]
        }
      }
    ],
    source: "Lexicanum: Imperial Tithe / Codex: Astra Militarum"
  },
  {
    id: "ev_ork_waaagh",
    title: "녹색 파도 — 오크 와아아! 습격",
    category: "전투",
    req: { minAge: 16, anyTags: ["militarum", "imperial_military", "astartes", "sororitas", "mechanicus"] },
    reqLabel: "제국 군사/전투 직군",
    weight: 17,
    text: "지평선 너머로 귀청이 터질 듯한 '와아아아!!' 함성과 함께 녹색 오크 보이즈 무리가 붉은 트럭을 몰고 쇄도해 온다! 라스건 총열이 달아오른다.",
    choices: [
      {
        label: "[사격 판정] 침착하게 일제 사격을 퍼부어 선두 오크 노브를 저격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 집중 사격으로 지휘관 오크의 머리를 날려 버렸다! 지휘 체계를 잃은 오크들이 서로 싸우며 무너졌다.",
          stats: { BS: 5, Inf: 4, WP: 3 }
        },
        fail: {
          text: "오크 슈타의 난사에 어깨를 관통당했으나 간신히 전선을 유지했다.",
          wounds: -22,
          stats: { T: 2 }
        }
      },
      {
        label: "[백병 판정] 착검 돌격! 체인소드와 총검으로 오크 무리에 뛰어든다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "피와 포자가 튀는 백병전 끝에 오크 무리를 궤멸시켰다! 연대의 사기가 하늘을 찔렀다.",
          stats: { WS: 6, T: 4, WP: 4, Inf: 5 }
        },
        fail: {
          text: "괴력을 지닌 오크의 쵸파에 깊은 상처를 입고 야전 병원으로 실려 갔다.",
          wounds: -28
        }
      },
      {
        label: "[지성 48+ 해금] 오크 포병대의 연료 저장고를 역산해 궤도 포격을 유도한다",
        req: { stats: { Int: 48 } },
        check: { stat: "Int", diff: 5 },
        success: {
          text: "단 한 발의 정밀 포격으로 오크 진영 전체가 연쇄 폭발했다! 사단 사령부에서 훈장을 수여했다.",
          stats: { Int: 5, Inf: 8, BS: 3 }
        },
        fail: {
          text: "좌표 오차로 적을 완전히 잡지 못해 잔여 오크들과 난전을 치렀다.",
          wounds: -15
        }
      }
    ],
    source: "Codex: Astra Militarum / Codex: Orks"
  },
  {
    id: "ev_sly_marbo_encounter",
    title: "밀림의 유령 — 슬라이 마보의 흔적",
    category: "인물",
    once: true,
    req: { minAge: 16, or: [{ anyWorlds: ["catachan"] }, { anyTags: ["militarum"] }] },
    reqLabel: "카타찬 출신 또는 아스트라 밀리타룸",
    characters: ["marbo"],
    weight: 12,
    text: "적 요새에 야간 기습을 가하려던 그대의 소대가 도착했을 때, 이미 적 수비대 120명 전원이 소리 없이 도륙되어 있었다. 타오르는 탄약고 앞에서 붉은 두건을 두른 과묵한 사내가 칼날을 닦고 돌아본다. 카타찬의 전설, 슬라이 마보다!",
    choices: [
      {
        label: "[백병/민첩] 말없이 경례하고 그가 남긴 적 사령관의 암호 문서를 회수한다",
        check: { stat: "Ag", diff: 10 },
        success: {
          text: "마보는 짧은 눈짓만 남기고 1초 만에 어둠 속으로 사라졌다. 문서 덕에 그대의 부대는 대승을 거두었다!",
          stats: { Ag: 5, WS: 4, Inf: 6 },
          addTags: ["met_marbo"]
        },
        fail: {
          text: "그가 설치해 둔 부비트랩을 하마터면 밟을 뻔했으나 겨우 피했다. 등골이 서늘하다.",
          stats: { Ag: 3 },
          addTags: ["met_marbo"]
        }
      }
    ],
    source: "Lexicanum: Sly Marbo"
  },
  {
    id: "ev_commissar_dilemma",
    title: "커미사르의 방아쇠 — 공포인가, 자비인가",
    category: "병종",
    req: { anyCareers: ["commissar", "lord_commissar"] },
    reqLabel: "병종: 커미사르",
    weight: 22,
    text: "카오스 컬티스트의 포격에 겁에 질린 신병 소대가 참호 뒤로 패주하려 한다. 볼트 피스톨에 손이 올라간다. 《오피시오 프리펙투스 교범》은 즉결 처형을 명하지만, 부대 전체의 사기는 칼날 위를 걷고 있다.",
    choices: [
      {
        label: "[교섭 48+ 해금] 처형 대신 몸소 참호 위로 올라가 돌격을 선도한다",
        req: { stats: { Fel: 48 } },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "병사들이 감동과 경외에 휩싸여 일제히 함성을 지르며 반격했다! 이브람 건트에 비견될 명성을 얻었다.",
          stats: { Fel: 6, WP: 5, Inf: 8 },
          faith: 8
        },
        fail: {
          text: "선두에 섰다가 적 저격수의 탄환에 어깨를 맞았으나 병사들은 끝내 도망치지 않았다.",
          wounds: -22,
          stats: { Fel: 4, Inf: 4 }
        }
      },
      {
        label: "[의지 판정] 규율대로 선동자 1명을 즉결 처형해 철의 군기를 세운다",
        check: { stat: "WP", diff: 10 },
        success: {
          text: "차가운 총성 한 발에 전선이 즉시 정렬되었다. 병사들은 두려움에 떨면서도 적진으로 돌격했다.",
          stats: { WP: 5, Inf: 5, Fel: -2 },
          faith: 5
        },
        fail: {
          text: "분노한 병사들 사이에서 '아군 오사' 사고를 가장한 암살 시도가 벌어져 다쳤다.",
          wounds: -20,
          stats: { Fel: -5 }
        }
      }
    ],
    source: "Lexicanum: Commissar"
  },
  {
    id: "ev_sororitas_miracle",
    title: "살아 있는 신앙의 기적 (Act of Faith)",
    category: "신앙",
    req: { minAge: 16, minFaith: 72, maxCorruption: 10, excludeTags: ["astartes", "custodes", "dreadnought", "heretic"] },
    reqLabel: "신앙 72+ · 오염 10 이하 (필멸 신도)",
    weight: 16,
    text: "절체절명의 위기 속, 황금빛 광채가 그대의 손끝과 성상을 감싸 안는다! 포탄이 기적처럼 빗나가고, 쓰러졌던 아군들이 눈물을 흘리며 다시 일어선다.",
    choices: [
      {
        label: "[의지 판정] 황제의 이름을 찬양하며 기적의 빛을 전장에 쏟아낸다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "이단과 악마들이 성광 앞에서 재가 되어 흩어졌다! 국교가 그대를 '축복받은 자'로 기록하기 시작했다.",
          stats: { WP: 8, Fel: 6, Inf: 10 },
          wounds: 25,
          faith: 12,
          corruption: -15,
          addTags: ["living_miracle"]
        },
        fail: {
          text: "과도한 신앙의 열기를 필멸의 육신이 감당하지 못해 실신했으나, 부상은 말끔히 치유되었다.",
          wounds: 15,
          stats: { WP: 4 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_tyranid_scouts",
    title: "그림자 속의 낫발톱 — 타이라니드 선봉대",
    category: "전투",
    req: { minAge: 16, anyTags: ["militarum", "astartes", "sororitas", "inquisition_agent", "inquisitor", "mechanicus"] },
    reqLabel: "전투/수사 직군",
    weight: 14,
    text: "갑자기 통신망이 정적으로 먹통이 되며 워프의 그림자가 내려앉았다. 숲과 폐허 사이로 카멜레온처럼 숨어든 타이라니드 릭터와 진스틸러 선봉대가 덮쳐 온다!",
    choices: [
      {
        label: "[민첩 판정] 기습 발톱을 피하고 화염방사기와 볼터로 교전한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "괴수의 은신을 간파해 처치하고 하이브 함대의 침공 경보를 제때 발신했다!",
          stats: { Ag: 5, BS: 4, Inf: 6 }
        },
        fail: {
          text: "릭터의 낫발톱에 옆구리를 깊게 베였으나 지원 부대 덕분에 생존했다.",
          wounds: -28,
          stats: { T: 3 }
        }
      },
      {
        label: "[의지 판정] 워프의 그림자가 주는 정신 압박을 견디고 수비진을 지휘한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "공포에 질린 대원들을 진정시켜 완벽한 십자포화로 외계 괴수들을 섬멸했다.",
          stats: { WP: 5, Fel: 4, Inf: 5 }
        },
        fail: {
          text: "정신적 압박에 순간 판단이 늦어져 부상을 입었다.",
          wounds: -20
        }
      }
    ],
    source: "Codex: Tyranids"
  },

  // =========================================================================
  // 4. 아스타르테스 · 쿠스토데스 초인 전용 이벤트
  // =========================================================================
  {
    id: "ev_deathwatch_vigil",
    title: "데스워치(Deathwatch) 파견 소집령",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes"], minAge: 25, excludeTags: ["grey_knight", "deathwatch_vet"] },
    reqLabel: "아스타르테스 · 나이 25세+",
    weight: 22,
    text: "오르도 제노스의 전투 조직 '데스워치'로부터 그대의 챕터로 파견 요청이 도착했다. 왼쪽 견갑을 은빛으로 물들이고 다른 챕터의 형제들과 함께 최악의 외계인 위협을 사냥하는 영광스러운 철야 근무다.",
    choices: [
      {
        label: "[백병/사격 판정] 파견을 수락하고 킬 팀(Kill-Team) 작전을 수행한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "네크론 무덤 행성과 엘다 해적선을 제압하고 은빛 견갑을 찬 채 명예롭게 챕터로 복귀했다!",
          stats: { WS: 7, BS: 7, Int: 6, Inf: 10 },
          addTags: ["deathwatch_vet"]
        },
        fail: {
          text: "외계 무기에 치명상을 입었으나 초인의 육체로 버텨 내고 귀환했다.",
          wounds: -35,
          stats: { T: 5, WS: 4 },
          addTags: ["deathwatch_vet"]
        }
      },
      {
        label: "챕터의 당면한 성전에 집중하기 위해 정중히 사양한다",
        effect: {
          text: "챕터 마스터는 그대의 헌신을 높이 샀다.",
          stats: { WP: 3, Inf: 3 }
        }
      }
    ],
    source: "Lexicanum: Deathwatch / Deathwatch Core Rulebook"
  },
  {
    id: "ev_space_hulk",
    title: "저주받은 스페이스 헐크 강습 작전",
    category: "아스타르테스",
    req: { or: [{ allTags: ["astartes"] }, { allTags: ["custodes"] }, { anyCareers: ["tempestus_scion", "inquisitor"] }] },
    reqLabel: "아스타르테스 / 쿠스토데스 / 사이온 / 이단심문관",
    weight: 16,
    text: "수천 년간 워프를 표류하던 거대 난파선 집합체 '스페이스 헐크'가 행성계에 출현했다. 내부에는 고대 유물과 진스틸러 둥지가 동시에 도사리고 있다.",
    choices: [
      {
        label: "[백병 판정] 좁은 격벽 통로를 돌파해 고대 챕터 성물과 데이터를 회수한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "진스틸러 브루드로드의 목을 베고 고대 아키오테크 성물을 되찾았다! 전설로 남을 무공이다.",
          stats: { WS: 8, T: 5, Inf: 12, Int: 4 },
          addTags: ["space_hulk_vet"]
        },
        fail: {
          text: "아다만티움 갑주마저 찢는 진스틸러의 발톱에 치명상을 입고 긴급 텔레포트로 탈출했다.",
          wounds: -40,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 원자로에 멜타 폭탄을 설치해 헐크 전체를 통째로 정화한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "아군 손실 없이 헐크의 플라즈마 노심을 폭파해 외계 위협을 뿌리 뽑았다.",
          stats: { Int: 6, BS: 4, Inf: 6 }
        },
        fail: {
          text: "폭발 직전 탈출정이 파손되며 심한 충격을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: Space Hulk"
  },
  {
    id: "ev_dreadnought_choice",
    title: "죽음마저 끝나지 않는 의무 — 드레드노트 안치",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes"], maxWounds: 38, excludeTags: ["dreadnought"] },
    reqLabel: "아스타르테스 · 생명력 38 이하 위독 상태",
    weight: 45,
    text: "그대의 육신은 수많은 전투로 만신창이가 되어 더 이상 파워 아머조차 지탱하기 어렵다. 아포세카리와 테크마린이 고대의 석관, '드레드노트'를 열고 묻는다. '형제여, 영면에 들겠는가, 아니면 강철 거신 속에서 영원히 싸우겠는가?'",
    choices: [
      {
        label: "'죽음 속에서도 나의 의무는 끝나지 않는다!' — 드레드노트에 안치된다",
        effect: {
          text: "양수 석관에 연결되어 거대한 장갑 보행병기로 부활했다! 기대수명이 수백 년 더 늘어나고 압도적인 내구와 화력을 얻었다.",
          stats: { T: 20, WS: 12, BS: 12, Ag: -15, Inf: 15 },
          woundsBonus: 80,
          lifeBonusExtra: 400,
          addTags: ["dreadnought"]
        }
      },
      {
        label: "강철 관을 거부하고, 남은 육신으로 끝까지 전장을 밟는다",
        effect: {
          text: "아포세카리가 생체 의수로 응급 처치를 마쳤다. 형제들이 그대의 고집스러운 긍지에 경례한다.",
          wounds: 20,
          stats: { WP: 8 }
        }
      }
    ],
    source: "Lexicanum: Space Marine Dreadnought"
  },
  {
    id: "ev_blood_games",
    title: "황궁의 블러드 게임 (The Blood Games)",
    category: "쿠스토데스",
    req: { allTags: ["custodes"] },
    reqLabel: "병종: 아뎁투스 쿠스토데스",
    weight: 22,
    text: "황궁 방어 체계의 허점을 찾기 위해 쿠스토데스 스스로 암살자가 되어 황금 옥좌로 침투하는 실전 훈련, '블러드 게임'의 주자로 지명되었다.",
    choices: [
      {
        label: "[지성/민첩 판정] 완벽한 위장과 허점 분석으로 황궁 최심부 문턱까지 침투한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "방어선의 미세한 사각을 증명해 내어 캡틴-제너럴 트라얀 발로리스의 극찬을 받았다!",
          stats: { Int: 8, Ag: 6, Inf: 10, WP: 5 },
          addTags: ["met_valoris"]
        },
        fail: {
          text: "형제 쿠스토데스의 가디언 스피어에 막혀 제압되었으나 귀중한 전술 교훈을 얻었다.",
          wounds: -18,
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: Blood Games / Codex: Adeptus Custodes"
  },

  // =========================================================================
  // 5. 이단심문소 · 메카니쿠스 · 행정 · 로그 트레이더 이벤트
  // =========================================================================
  {
    id: "ev_inquisition_recruit",
    title: "그림자 속의 로제트 — 이단심문관의 비밀 지령",
    category: "이단심문소",
    once: true,
    req: {
      minAge: 18,
      stats: { Int: 42, WP: 42 },
      maxCorruption: 25,
      excludeTags: ["inquisition_agent", "inquisitor", "astartes", "custodes", "grey_knight", "abhuman", "heretic", "magos", "rogue_trader", "canoness", "lord_commissar"]
    },
    reqLabel: "18세+ · 지성 42+ · 의지 42+",
    weight: 20,
    text: "그대의 예리한 통찰력과 굳건한 정신력을 지켜본 이단심문소 요원이 밀실로 초대했다. 책상 위에는 황금 로제트와 오르도의 기밀 수사 교본이 놓여 있다. '인류를 갉아먹는 내부의 적을 사냥할 어콜라이트가 필요하다.'",
    choices: [
      {
        label: "[지성 판정] 시험 과제로 주어진 이단 암호를 해독하고 어콜라이트로 발탁된다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "숨겨진 컬트 접선 장소를 단번에 짚어 냈다! 그대는 이제 이단심문소 어콜라이트로서 비밀 전쟁에 뛰어든다.",
          forceCareer: "inquisition_acolyte",
          stats: { Int: 6, WP: 6, Inf: 12 },
          addTags: ["inquisition_agent"]
        },
        fail: {
          text: "암호 해독은 미완이었으나 충성심은 인정받아 심문소의 비공식 정보원으로 이름을 올렸다.",
          stats: { Int: 3, Inf: 5 },
          addTags: ["inquisition_favor"]
        }
      },
      {
        label: "이단심문소에 얽히는 건 너무 위험하다. 모른 척 물러난다",
        effect: {
          text: "요원은 침묵의 서약서를 내민 뒤 어둠 속으로 사라졌다.",
          stats: { WP: 2 }
        }
      }
    ],
    source: "Dark Heresy / Eisenhorn Trilogy"
  },
  {
    id: "ev_inquisitor_ordo",
    title: "로제트 수여와 오르도(Ordo) 선택",
    category: "이단심문소",
    once: true,
    req: { anyCareers: ["inquisitor"], excludeTags: ["ordo_hereticus", "ordo_xenos", "ordo_malleus"] },
    reqLabel: "병종: 정식 이단심문관",
    weight: 50,
    text: "이제 절대 권력의 인장인 이단심문관 로제트가 그대의 손에 쥐어졌다. 은하계의 수많은 적 가운데 어떤 성스러운 오르도(Ordo)에 평생을 바칠 것인가?",
    choices: [
      {
        label: "오르도 헤레티쿠스 (마녀·이단·반역자 사냥꾼)",
        effect: {
          text: "제국 내부의 부패와 이단을 불태우는 심판자가 되었다. 국교와 소로리타스와의 연대가 강화된다.",
          stats: { WP: 6, Fel: 5, Inf: 8 },
          faith: 12,
          addTags: ["ordo_hereticus"]
        }
      },
      {
        label: "오르도 제노스 (외계인 위협 근절자)",
        effect: {
          text: "타이라니드, 오크, 네크론, 엘다의 음모를 추적하는 외계 전문가로 거듭났다. 데스워치 소집 권한을 확보했다.",
          stats: { Int: 6, BS: 5, Inf: 8 },
          addTags: ["ordo_xenos"]
        }
      },
      {
        label: "오르도 말레우스 (카오스 악마 사냥꾼)",
        effect: {
          text: "워프의 악마와 정면으로 맞서는 가장 위험한 길을 택했다. 그레이 나이트와 비밀리에 공조한다.",
          stats: { WP: 10, WS: 5, Inf: 8 },
          corruption: 4,
          addTags: ["ordo_malleus"]
        }
      }
    ],
    source: "Lexicanum: Inquisition"
  },
  {
    id: "ev_stc_discovery",
    title: "잊혀진 암흑기 유적 — 고대 STC 파편 발견!",
    category: "메카니쿠스",
    once: true,
    req: { minAge: 18, or: [{ anyTags: ["mechanicus"] }, { stats: { Int: 52 } }] },
    reqLabel: "기계교 소속 또는 지성 52+",
    weight: 16,
    text: "폐허가 된 지하 시설 깊은 곳에서 암흑의 기술 시대(Dark Age of Technology)에 제작된 온전한 STC(표준 주형 설계도) 데이터 코어를 발견했다! 화성의 마고스들이 행성 하나를 통째로 바쳐서라도 탐낼 국보급 유물이다.",
    choices: [
      {
        label: "[지성 판정] 오염 여부를 검증해 아뎁투스 메카니쿠스에 정식 헌납한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "순수한 고대 합금과 무기 설계도가 복원되었다! 화성으로부터 막대한 포상과 종신 권위, 최고급 생체 개조를 하사받았다!",
          stats: { Int: 8, Inf: 18, T: 6 },
          addTags: ["stc_finder", "bionic"]
        },
        fail: {
          text: "방어 자동포탑이 작동해 부상을 입었지만, 데이터 파편 일부는 건져 냈다.",
          wounds: -20,
          stats: { Int: 4, Inf: 6 }
        }
      },
      {
        label: "[금단 · 지성 55+] 제국에 보고하지 않고 숨겨진 AI(실리카 아니무스)의 지식을 훔쳐본다",
        req: { stats: { Int: 55 } },
        check: { stat: "Int", diff: -10 },
        success: {
          text: "금지된 기술 이단의 지식을 흡수해 경이로운 통찰을 얻었다! 다만 메카니쿠스가 눈치챈다면 즉시 서비터 신세다.",
          stats: { Int: 14, Inf: 4 },
          corruption: 18,
          addTags: ["tech_heresy"]
        },
        fail: {
          text: "고대 기계령의 방화벽이 뇌신경을 태워 버렸다!",
          wounds: -30,
          corruption: 12
        }
      }
    ],
    source: "Lexicanum: Standard Template Construct"
  },
  {
    id: "ev_xenos_trade",
    title: "제국 국경 너머 — 외계인 상단과의 비밀 접촉",
    category: "교섭",
    req: {
      minAge: 20,
      excludeTags: ["astartes", "custodes", "grey_knight", "sororitas", "commissar", "lord_commissar"],
      or: [{ anyCareers: ["rogue_trader", "inquisitor"] }, { stats: { Fel: 48, Inf: 45 } }]
    },
    reqLabel: "로그 트레이더/이단심문관 또는 교섭 48+ & 권위 45+",
    weight: 15,
    text: "성계 외곽 소행성대에서 아엘다리(엘다) 커세어 선장이 밀거래를 제안해 왔다. 황제의 법은 외계인과의 접촉을 이단으로 규정하지만, 저들이 내민 고대 기술과 정보는 거부하기 어렵다.",
    choices: [
      {
        label: "[교섭 판정] 치열한 수싸움 끝에 외계 유물과 성간 지도를 유리하게 거래한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "막대한 부와 희귀 무구, 그리고 다가올 재앙에 대한 엘다의 예언을 손에 넣었다!",
          stats: { Inf: 12, Int: 6, Fel: 5 },
          corruption: 6,
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "오만한 외계인들에게 기만당해 매복 공격을 당하고 간신히 탈출했다.",
          wounds: -22,
          stats: { Inf: -5 }
        }
      },
      {
        label: "[신앙] 외계인과의 타협 따윈 없다! 즉시 함포와 무기로 사냥한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "배신감에 찬 외계 해적선을 격침시키고 제국 순수파의 뜨거운 찬사를 받았다!",
          stats: { BS: 5, Inf: 8, WP: 4 },
          faith: 12
        },
        fail: {
          text: "민첩한 엘다 함선의 반격에 큰 피해를 입고 물러났다.",
          wounds: -20
        }
      }
    ],
    source: "Rogue Trader Core Rulebook"
  },
  {
    id: "ev_administratum_typo",
    title: "양피지 위 숫자 하나의 대참사",
    category: "행정",
    req: {
      minAge: 18,
      excludeTags: ["astartes", "custodes", "grey_knight", "sororitas", "heretic"],
      or: [{ anyCareers: ["administratum", "militarum_officer", "inquisition_acolyte", "inquisitor"] }, { stats: { Int: 44 }, anyTags: ["citizen", "noble"] }]
    },
    reqLabel: "관료·장교·심문소 또는 지성 44+ 시민/귀족",
    weight: 15,
    text: "십일조 장부를 검수하던 중, 30년 전 선임 서기관의 잉크 번짐 때문에 인접 아그리 월드의 식량 할당량이 10배로 잘못 청구되어 반란이 임박했다는 사실을 발견했다!",
    choices: [
      {
        label: "[지성 판정] 14단계 관료 절차와 78개의 도장을 밤새 돌파해 오류를 바로잡는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "수억 명의 기아와 내전을 펜촉 하나로 막아 냈다! 고위 아뎁트가 그대의 유능함을 극찬했다.",
          stats: { Int: 6, Inf: 10, Fel: 3 }
        },
        fail: {
          text: "과로로 쓰러졌고 서류는 결국 '재검토 보류(예상 대기 42년)' 서랍에 처박혔다.",
          wounds: -12,
          stats: { WP: 2 }
        }
      },
      {
        label: "전임자의 실수를 덮어 두고 내 책상 위로 불똥이 튀지 않게 은폐한다",
        effect: {
          text: "행성 하나가 폭동에 휩싸였다는 소식이 3년 뒤 들려왔지만, 그대의 평온한 출세길엔 흠집이 없었다.",
          stats: { Inf: 4 },
          faith: -5,
          corruption: 4
        }
      }
    ],
    source: "Lexicanum: Adeptus Administratum"
  },
  {
    id: "ev_geller_flicker",
    title: "성간 항해 중 겔러 필드의 깜빡임",
    category: "우주",
    req: { minAge: 14, or: [{ anyTags: ["voidborn", "navy", "rogue_trader", "militarum", "astartes"] }, { anyWorlds: ["voidborn"] }] },
    reqLabel: "우주 항행 경험자/군인/해군/보이드본",
    weight: 15,
    text: "워프 항해 도중 선체 전체의 조명이 0.8초간 꺼졌다! 겔러 필드가 흔들리는 찰나, 복도 벽면에서 피가 흐르고 기관실 승무원들이 미쳐 날뛰기 시작한다!",
    choices: [
      {
        label: "[아스타르테스/쿠스토데스 전용] 챕터 전투 함성과 볼터 사격으로 빙의자들을 단숨에 일소한다",
        req: { anyTags: ["astartes", "custodes"] },
        effect: {
          text: "초인의 전투 함성이 복도를 울리자 악마적 환영은 산산조각 났다! 볼터와 체인소드로 선내 위협을 2분 만에 평정했다.",
          stats: { WS: 4, WP: 4, Inf: 5 }
        }
      },
      {
        label: "[기계교 전용] 누스피어 논리 방화벽을 띄워 메카덴드라이트로 겔러 발전기를 즉시 복구한다",
        req: { anyTags: ["mechanicus"] },
        effect: {
          text: "감정의 흔들림 없이 이진법 성유 의식을 집전해 12초 만에 겔러 필드를 정상 출력으로 복원했다!",
          stats: { Int: 6, Inf: 6 }
        }
      },
      {
        label: "[의지 판정] 악마적 환영을 뿌리치고 겔러 필드 보조 발전기를 재가동한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "기계령의 기도를 외며 방어막을 복구해 수만 명 승무원의 영혼을 구했다!",
          stats: { WP: 6, Int: 4, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "워프의 광기에 휩쓸린 승무원들과 난투극을 벌이며 부상과 오염을 입었다.",
          wounds: -22,
          corruption: 12
        }
      },
      {
        label: "[백병 판정] 무기를 들고 방화 격벽을 사수하며 악마 빙의자들을 처단한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "함교로 돌진하던 빙의자들을 모두 막아 내어 선장에게 표창을 받았다.",
          stats: { WS: 5, T: 3, Inf: 5 }
        },
        fail: {
          text: "변이된 승무원의 괴력에 뼈가 부러졌다.",
          wounds: -26,
          corruption: 6
        }
      }
    ],
    source: "Lexicanum: Geller Field"
  },
  {
    id: "ev_hive_plague",
    title: "하층 하이브의 유독 매연과 역병",
    category: "일상",
    req: {
      anyWorldTags: ["hive", "industrial", "forge"],
      excludeTags: ["astartes", "custodes", "dreadnought", "inquisitor", "rogue_trader", "magos", "lord_commissar", "canoness"]
    },
    reqLabel: "하이브/포지 월드 일반 거주자",
    weight: 15,
    text: "공기 정화탑 필터가 3개월째 교체되지 않아 구역 전체에 붉은 기침 역병이 번졌다. 메디케아(의무소)의 약품은 상층 첨탑에만 우선 공급된다.",
    choices: [
      {
        label: "[강인 판정] 독한 합성 식량과 빗물을 버텨 내며 자력으로 회복한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "지독한 면역력을 얻어 멀쩡히 살아남았다!",
          stats: { T: 5 }
        },
        fail: {
          text: "폐에 깊은 손상을 입고 긴 병치레를 치렀다.",
          wounds: -20
        }
      },
      {
        label: "[권위 35+ 해금] 연줄을 써서 상층 첨탑의 정제 항생제를 구한다",
        req: { stats: { Inf: 35 } },
        effect: {
          text: "값비싼 약품을 손에 넣어 무사히 넘겼을 뿐 아니라 남은 약으로 주변의 호의까지 샀다.",
          stats: { Fel: 4, Inf: 3 },
          wounds: 8
        }
      }
    ],
    source: "Imperium Maledictum Core"
  },
  {
    id: "ev_shrine_pilgrimage",
    title: "황금 성당의 대순례 행렬",
    category: "일상",
    req: { minAge: 12, excludeTags: ["heretic", "astartes", "custodes", "dreadnought"] },
    reqLabel: "비이단 필멸 제국인",
    weight: 13,
    text: "수십만 순례자들이 횃불을 들고 황제 탄신 성절 행렬을 이루고 있다. 성직자가 기적의 성유를 나누어 주며 신앙의 맹세를 촉구한다.",
    choices: [
      {
        label: "[소로리타스/성직자/커미사르 전용] 행렬의 선두에 서서 황제 신앙의 설교를 주도한다",
        req: { anyTags: ["sororitas", "ecclesiarchy", "commissar", "lord_commissar", "canoness"] },
        effect: {
          text: "수십만 군중이 그대의 열변에 눈물을 흘리며 황제의 이름을 연호했다! 성당의 존경과 권위가 치솟았다.",
          stats: { Fel: 6, WP: 5, Inf: 6 },
          faith: 15,
          corruption: -12
        }
      },
      {
        label: "행렬에 동참해 진심으로 기도하며 영혼을 정화한다",
        effect: {
          text: "마음을 어지럽히던 어두운 상념이 씻겨 내려가고 신앙과 의지가 충만해졌다.",
          stats: { WP: 4, Fel: 2 },
          faith: 12,
          corruption: -10
        }
      },
      {
        label: "[교섭 판정] 순례 행렬에 섞인 상인과 귀족들과 교류해 인맥을 넓힌다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "유력한 길드 상단과 연을 맺어 적잖은 지원과 정보를 얻었다.",
          stats: { Fel: 4, Inf: 6 }
        },
        fail: {
          text: "인파에 떠밀려 소매치기를 당하고 타박상을 입었다.",
          wounds: -8,
          stats: { Inf: -2 }
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy"
  },

  // =========================================================================
  // 6. 카오스 오염 · 금단의 유혹 · 이단심문소 추격 이벤트
  // =========================================================================
  {
    id: "ev_forbidden_tome",
    title: "금서고의 속삭이는 양피지",
    category: "오염",
    req: { minAge: 16, excludeTags: ["custodes", "grey_knight"], or: [{ stats: { Int: 42 } }, { minCorruption: 15 }] },
    reqLabel: "지성 42+ 또는 오염 15+",
    weight: 15,
    text: "낡은 기록 보관소 구석에서 인피로 제본된 듯한 기묘한 서적을 발견했다. 표지의 여덟 갈래 별 문양이 눈을 뗄 수 없게 만든다.",
    choices: [
      {
        label: "[이단심문관/아스타르테스/소로리타스 전용] 한 치의 유혹도 없이 즉각 성화로 소각하거나 챕터·오르도 금고에 영구 봉인한다",
        req: { anyTags: ["inquisitor", "astartes", "sororitas", "canoness"] },
        effect: {
          text: "불경한 속삭임은 단단한 신념과 훈련 앞에서 아무 힘도 쓰지 못했다. 이단 유물을 완벽히 처리했다.",
          stats: { WP: 5, Inf: 6 },
          faith: 10,
          corruption: -10
        }
      },
      {
        label: "[신앙] 지체 없이 불태우고 지역 이단심문관이나 사제에게 신고한다",
        effect: {
          text: "검은 연기와 비명을 내며 책이 재가 되었다. 국교와 심문소가 그대의 경계심을 높이 평가했다.",
          stats: { WP: 4, Inf: 5 },
          faith: 12,
          corruption: -8,
          addTags: ["inquisition_favor"]
        }
      },
      {
        label: "[금단] 아무도 몰래 금서의 내용을 탐독해 비밀을 훔친다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "우주의 숨겨진 법칙과 끔찍한 진실의 단편을 깨우쳤다! 지성은 크게 늘었으나 영혼에 어둠이 깃들었다.",
          stats: { Int: 9, WP: 4 },
          faith: -18,
          corruption: 22
        },
        fail: {
          text: "글자들이 눈앞에서 살아 움직이며 정신을 물어뜯었다!",
          wounds: -18,
          faith: -15,
          corruption: 26
        }
      }
    ],
    source: "Dark Heresy: Corruption & Heresy"
  },
  {
    id: "ev_chaos_whispers",
    title: "암흑 사대신(Four Ruinous Powers)의 유혹",
    category: "오염",
    req: { minAge: 16, minCorruption: 35, excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "오염도 35+ (금단 분기)",
    weight: 26,
    text: "꿈과 현실의 경계가 무너진다. 워프 너머의 위대한 네 권능이 그대에게 속삭인다. '거짓 시체 황제는 너를 버렸다. 우리의 축복을 택하라!'",
    choices: [
      {
        label: "[코른의 부름] 피의 신에게 분노를 바치고 압도적 무력을 얻는다",
        effect: {
          text: "혈관이 끓어오르며 두려움이 사라졌다! 무력과 강인함이 폭증했으나 피의 갈증이 시작된다.",
          stats: { WS: 12, T: 10, Int: -6 },
          faith: -25,
          corruption: 20,
          addTags: ["mark_khorne", "heretic"]
        }
      },
      {
        label: "[젠취의 부름] 변화의 군주와 거래해 금지된 지혜와 권모를 얻는다",
        effect: {
          text: "운명의 실타래가 눈에 보이기 시작했다! 지성과 사이킥 감각이 날카로워졌다.",
          stats: { Int: 12, WP: 8, Fel: 6 },
          faith: -25,
          corruption: 20,
          addTags: ["mark_tzeentch", "heretic", "psyker"]
        }
      },
      {
        label: "[너글의 부름] 부패의 할아버지 품에서 고통과 죽음을 잊는다",
        effect: {
          text: "육신이 썩어 가지만 더 이상 어떤 고통도, 질병도 느끼지 못한다! 기괴한 생명력이 샘솟는다.",
          stats: { T: 16, Fel: -10, Ag: -6 },
          wounds: 35,
          faith: -25,
          corruption: 20,
          addTags: ["mark_nurgle", "heretic"]
        }
      },
      {
        label: "[슬라네쉬의 부름] 쾌락과 완벽의 군주에게 감각을 바치고 치명적인 우아함을 얻는다",
        effect: {
          text: "세상의 모든 소리와 색채가 칼날처럼 선명해졌다! 감각이 극도로 예민해지며 탐닉의 갈증이 깨어난다.",
          stats: { Ag: 12, Fel: 10, WS: 6, WP: -6 },
          faith: -25,
          corruption: 20,
          addTags: ["mark_slaanesh", "heretic"]
        }
      },
      {
        label: "[의지 58+ 해금] 악마의 유혹을 끝까지 거부하고 영혼을 되찾는다!",
        req: { stats: { WP: 58 } },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "피를 토하는 고통 끝에 속삭임을 끊어 냈다! 오염이 크게 정화되고 황제의 빛이 다시 돌아왔다.",
          stats: { WP: 10 },
          faith: 20,
          corruption: -25
        },
        fail: {
          text: "저항했지만 정신이 크게 손상되고 말았다.",
          wounds: -20,
          corruption: 10
        }
      }
    ],
    source: "Lexicanum: Chaos Gods / Black Crusade"
  },
  {
    id: "ev_inquisition_purge",
    title: "이단심문소의 새벽 급습!",
    category: "위기",
    req: { minAge: 16, minCorruption: 42, excludeTags: ["custodes", "grey_knight"] },
    reqLabel: "오염도 42+ (이단 의혹 경고)",
    weight: 28,
    text: "거처의 철문이 폭음과 함께 뜯겨 나갔다! 아르비테스와 이단심문소 스톰트루퍼들이 핫샷 라스건을 겨눈 채 외친다. '무릎 꿇어라, 이단자여! 오르도 헤레티쿠스의 이름으로 심문을 집행한다!'",
    choices: [
      {
        label: "[백병/사격 판정] 무기를 뽑고 포위망을 뚫어 지하로 도주한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "추격대를 쓰러뜨리고 도시 하층으로 잠적했다! 이제 돌이킬 수 없는 배교자·컬티스트의 길뿐이다.",
          forceCareer: "chaos_cultist",
          stats: { WS: 6, Ag: 5, Inf: -20 },
          wounds: -18,
          addTags: ["heretic", "wanted_by_inquisition"]
        },
        fail: {
          text: "이단심문소의 십자포화에 벌집이 되어 쓰러졌다. 기록부에는 '이단 정화 완료' 한 줄만 남았다.",
          instantDeath: "이단심문소의 급습에 저항하다 핫샷 라스건 세례로 즉결 처형"
        }
      },
      {
        label: "[권위 58+ 또는 교섭 55+ 해금] 정치적 연줄과 완벽한 알리바이로 무고를 주장한다",
        req: { or: [{ stats: { Inf: 58 } }, { stats: { Fel: 55 } }] },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "교묘한 말재주와 배후의 권력으로 혐의를 다른 희생양에게 떠넘겼다! 심문소는 물러났다.",
          stats: { Fel: 5, Inf: -6 },
          corruption: -10
        },
        fail: {
          text: "변명이 통하지 않아 고문실에서 몇 달간 참혹한 '참회 심문'을 받은 뒤 간신히 풀려났다.",
          wounds: -35,
          stats: { Inf: -15 },
          corruption: -18
        }
      },
      {
        label: "순순히 무릎을 꿇고 자백하며 자비로운 처분을 구한다",
        effect: {
          text: "이단심문소에 '무고함은 아무것도 증명하지 못한다.' 고문 끝에 그대는 아코-플래젤런트나 화장터로 보내졌다.",
          instantDeath: "이단 혐의로 이단심문소에 체포되어 정화의 화형에 처해짐"
        }
      }
    ],
    source: "Lexicanum: Inquisition"
  },
  {
    id: "ev_rejuvenat_offer",
    title: "상층 첨탑의 비술 — 수명 연장 시술 제안",
    category: "일상",
    once: true,
    req: { minAge: 52, stats: { Inf: 58 }, excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "나이 52세+ · 권위 58+ (필멸자 고위층)",
    weight: 18,
    text: "황혼기에 접어든 그대에게 저명한 마고스 바이올로기스가 은밀히 '리주버냇(Rejuvenat)' 세포 회춘 시술을 제안했다. 제국의 평민은 꿈도 꾸지 못할 200년 수명의 특권이다.",
    choices: [
      {
        label: "막대한 영향력을 지불하고 수명 연장 시술을 받는다",
        effect: {
          text: "백발이 다시 검어지고 쇠약했던 심장이 힘차게 뛰기 시작했다! 기대수명이 크게 연장되었다.",
          stats: { T: 6, Inf: -6 },
          wounds: 30,
          lifeBonusExtra: 65,
          incrementRejuvenat: true,
          addTags: ["rejuvenat"]
        }
      },
      {
        label: "부자연스러운 연명을 거부하고 황제께서 정하신 수명을 받아들인다",
        effect: {
          text: "담담한 태도가 주변의 깊은 존경을 불러일으켰다.",
          stats: { WP: 5, Fel: 4 },
          faith: 10
        }
      }
    ],
    source: "Lexicanum: Rejuvenat"
  },
  {
    id: "ev_forge_machine_spirit",
    title: "용광로의 분노 — 타이탄 기계령 폭주",
    category: "메카니쿠스",
    req: { minAge: 15, or: [{ anyWorldTags: ["forge", "mechanicus"] }, { anyTags: ["mechanicus"] }] },
    reqLabel: "포지 월드 거주 또는 기계교 소속",
    weight: 16,
    text: "거대한 조립 도크에서 수리 중이던 워하운드 타이탄의 원자로가 굉음을 내며 과열되었다! 기계령이 진노해 성유 파이프가 터지고 사제들이 흩어진다.",
    choices: [
      {
        label: "[지성 판정] 옴니시아의 진정 찬가를 이진법으로 입력해 노심을 안정시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기계령이 경건하게 잠잠해졌다! 마고스가 그대의 기술적 경외심을 크게 칭찬하며 생체 의수를 하사했다.",
          stats: { Int: 6, Inf: 7, T: 3 },
          addTags: ["bionic"]
        },
        fail: {
          text: "고압 증기와 방사선에 노출되어 심각한 화상을 입었다.",
          wounds: -24,
          stats: { T: 2 }
        }
      },
      {
        label: "[강인 판정] 방열복을 입고 수동 냉각 밸브를 끝까지 잠근다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "뜨거운 증기를 버텨 내고 대폭발을 막아 냈다. 공장 전체가 그대를 기렸다.",
          stats: { T: 6, WP: 4, Inf: 5 }
        },
        fail: {
          text: "폭압에 튕겨 나가 큰 부상을 입었다.",
          wounds: -28
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_navy_pirate_battle",
    title: "소행성대의 교전 — 드루카리 해적선 기습",
    category: "우주",
    req: { minAge: 16, or: [{ anyCareers: ["imperial_navy", "rogue_trader"] }, { anyTags: ["voidborn"] }] },
    reqLabel: "임페리얼 네이비 / 로그 트레이더 / 보이드본",
    weight: 16,
    text: "근거리 오스펙스에 날카로운 가시 모양의 드루카리(다크 엘다) 습격선 편대가 포착되었다! 붙잡히면 죽음보다 끔찍한 코모라의 노예 신세다.",
    choices: [
      {
        label: "[사격 판정] 랜스 포대와 매크로 캐논의 일제 사격으로 적 기함을 격침한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "교묘한 기동을 예측한 포격이 적 순양함을 두 동강 냈다! 성계 함대에 명성이 떨쳤다.",
          stats: { BS: 6, Int: 4, Inf: 7 }
        },
        fail: {
          text: "적 강습 포드가 갑판을 뚫고 들어와 백병전 끝에 큰 부상을 입었다.",
          wounds: -26,
          stats: { WS: 3 }
        }
      },
      {
        label: "[민첩 판정] 급격한 선체 기동으로 소행성대 방어선 뒤로 빠져나간다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "환상적인 항해술로 드루카리 추격을 따돌리고 화물과 승무원을 온전히 지켰다.",
          stats: { Ag: 6, Int: 3, Inf: 5 }
        },
        fail: {
          text: "선체 외벽이 찢기며 감압 사고에 휘말려 다쳤다.",
          wounds: -20
        }
      }
    ],
    source: "Battlefleet Gothic / Rogue Trader"
  },
  {
    id: "ev_arbites_riot",
    title: "배급 축소와 하층 구역 대폭동",
    category: "치안",
    req: { minAge: 16, excludeTags: ["astartes", "custodes", "grey_knight"], or: [{ anyCareers: ["arbites", "pdf_trooper", "militarum_officer"] }, { stats: { Inf: 42 } }] },
    reqLabel: "아르비테스 / PDF / 장교 또는 권위 42+ (필멸자)",
    weight: 14,
    text: "십일조 증액으로 시체 녹말 배급이 반 토막 나자 분노한 노동자 수만 명이 총독궁으로 몰려들었다. 군중 속에는 정체불명의 이단 선동가가 섞여 있다는 첩보가 있다.",
    choices: [
      {
        label: "[이단심문관/커미사르 전용] 광장 연단에 올라 배후 컬트 선동가를 즉석 색출·처단해 폭동을 5분 만에 잠재운다",
        req: { anyTags: ["inquisitor", "commissar", "lord_commissar"] },
        effect: {
          text: "단 한 발의 볼트 탄환이 선동가의 가면을 꿰뚫자 군중이 일제히 무릎을 꿇었다! 압도적 위엄으로 사태를 종결했다.",
          stats: { WP: 5, Inf: 8 }
        }
      },
      {
        label: "[교섭 판정] 선동가만 정확히 색출해 체포하고 비상 식량을 풀어 민심을 달랜다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "최소한의 유혈로 폭동을 가라앉히고 배후의 카오스 세포까지 일망타진했다!",
          stats: { Fel: 6, Int: 4, Inf: 8 }
        },
        fail: {
          text: "군중의 투석과 화염병에 휘말려 부상을 입고 체면을 구겼다.",
          wounds: -18,
          stats: { Inf: -4 }
        }
      },
      {
        label: "[백병 판정] 제국법(Lex Imperialis)의 이름으로 무자비하게 진압 작전을 감행한다",
        check: { stat: "WS", diff: 5 },
        success: {
          text: "쇼크 마울과 샷건의 벽 앞에 폭동은 3시간 만에 진압되었다. 냉혹한 질서가 회복되었다.",
          stats: { WS: 5, WP: 4, Inf: 5, Fel: -3 }
        },
        fail: {
          text: "은신해 있던 무장 갱단의 반격에 중상을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_agri_harvest",
    title: "아그리 월드의 풍년과 궤도 십일조 수확",
    category: "일상",
    req: { anyWorldTags: ["agri", "civilised", "paradise"], excludeTags: ["astartes", "custodes", "dreadnought", "inquisitor", "rogue_trader", "magos"] },
    reqLabel: "아그리/문명/낙원 행성 일반 거주자",
    weight: 13,
    text: "올해도 거대한 콤바인이 끝없는 황금빛 곡창 지대를 가로지른다. 제국에서는 드물게 평온한 계절이 찾아왔지만, 궤도의 징세선은 한 톨의 오차도 용납하지 않는다.",
    choices: [
      {
        label: "건강을 돌보며 맑은 대기와 신선한 식량으로 원기를 회복한다",
        effect: {
          text: "하이브 월드의 독가스와는 비교할 수 없는 평온 속에 육신이 튼튼해졌다.",
          stats: { T: 4, WP: 2 },
          wounds: 15
        }
      },
      {
        label: "[지성 판정] 수확 물류와 궤도 수송 일정을 최적화해 공적을 쌓는다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "십일조 납기를 앞당긴 공로로 지역 길드와 행정부의 표창을 받았다.",
          stats: { Int: 4, Inf: 6 }
        },
        fail: {
          text: "거대 콤바인 정비 사고로 팔을 다쳤다.",
          wounds: -14
        }
      }
    ],
    source: "Lexicanum: Agri World"
  },
  {
    id: "ev_macragge_forum",
    title: "마크라그 원로원의 시민 강연과 전술 시험",
    category: "행성",
    once: true,
    req: { minAge: 12, anyWorlds: ["macragge"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 마크라그",
    weight: 22,
    characters: ["calgar"],
    text: "헤라의 요새 아래 대리석 광장에서 울트라마 행정관들과 울트라마린 베테랑들이 시민들을 대상으로 로부테 길리먼의 《코덱스 아스타르테스》와 통치론을 강연한다.",
    choices: [
      {
        label: "[지성 판정] 모의 전술 반론에 참여해 날카로운 전략안을 발표한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "강연을 참관하던 마르네우스 칼가의 보좌진이 그대의 전술안을 높이 사 울트라마 영지 장학생으로 천거했다!",
          stats: { Int: 7, Fel: 5, Inf: 8 },
          addTags: ["ultramar_scholar", "met_calgar"]
        },
        fail: {
          text: "엄격한 울트라마 교관의 지적을 받았지만 귀중한 학문적 기초를 다졌다.",
          stats: { Int: 3, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Macragge"
  },
  {
    id: "ev_chaos_raid",
    title: "배교자의 습격 — 암흑 신들을 향한 제물",
    category: "오염",
    req: { anyCareers: ["chaos_cultist"] },
    reqLabel: "병종: 카오스 컬티스트 (타락 루트)",
    weight: 24,
    text: "제국 군수 창고와 성당을 습격할 비밀 의식이 준비되었다. 성공하면 워프의 축복이 쏟아지지만, 제국 치안대와 소로리타스가 이미 낌새를 챘다.",
    choices: [
      {
        label: "[백병 판정] 성당을 불태우고 암흑의 제단을 세운다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "워프의 축복이 쏟아지며 초자연적 힘이 깃들었다! 다만 오염이 깊어져 육신이 조금씩 변이하기 시작한다.",
          stats: { WS: 8, WP: 6, T: 5 },
          corruption: 15
        },
        fail: {
          text: "급파된 아뎁타 소로리타스의 볼터 화력에 큰 중상을 입고 겨우 도망쳤다!",
          wounds: -34
        }
      },
      {
        label: "[교섭 판정] 언더하이브의 굶주린 노동자들을 선동해 세력을 불린다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "수백 명의 추종자가 그대의 깃발 아래 모였다. 행성 반란의 불씨가 커진다.",
          stats: { Fel: 6, Int: 4, Inf: 8 },
          corruption: 10
        },
        fail: {
          text: "밀고자 때문에 은신처가 발각되어 부상을 입었다.",
          wounds: -22
        }
      }
    ],
    source: "Black Crusade Core Rulebook"
  },

  // =========================================================================
  // 7. 행성별 고유 스토리 이벤트 (모든 네임드 행성 커버!)
  // =========================================================================
  {
    id: "ev_world_terra_pilgrim",
    title: "신성한 테라 — 순례자의 길과 압사 행렬",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["terra"], excludeTags: ["custodes", "astartes", "dreadnought"] },
    reqLabel: "행성: 신성한 테라",
    weight: 24,
    text: "황궁 영원의 문을 향해 3세대째 줄을 서 온 수백만 순례자 행렬이 갑자기 무너졌다! 성스러운 관문을 보려는 군중이 서로를 짓밟는 가운데, 아드미니스트라툼 서기관은 위층 발코니에서 사망자 수만 차분히 세고 있다.",
    choices: [
      {
        label: "[강인 판정] 짓밟히는 노인과 아이를 일으켜 세우며 행렬을 버텨 낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "기적적으로 순례자 대여섯을 구하고 황궁 첨탑의 황금빛을 두 눈으로 마주했다! 가슴 깊이 신앙이 타오른다.",
          stats: { T: 4, WP: 6, Fel: 4 },
          faith: 14
        },
        fail: {
          text: "군중에 깔려 늑골이 부러졌으나, 순례 행렬은 멈추지 않고 그대의 등을 밟고 지나갔다.",
          wounds: -24,
          faith: 4
        }
      },
      {
        label: "[권위 40+ 해금] 귀족·관료 전용 우회 회랑 통행증을 제시해 빠져나간다",
        req: { stats: { Inf: 40 } },
        effect: {
          text: "비명 소리를 발밑에 둔 채 대리석 회랑을 우아하게 걸어 황궁 성소에 참배했다.",
          stats: { Inf: 4, WP: 3 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Terra / Vaults of Terra"
  },
  {
    id: "ev_world_mars_archaeotech",
    title: "화성 적색 사막 — 녹티스 미궁 외곽의 금지된 진동",
    category: "행성 고유",
    once: true,
    req: { minAge: 15, anyWorlds: ["mars"] },
    reqLabel: "행성: 화성",
    weight: 24,
    text: "화성 최심부 금지 구역 '녹티스 미궁' 외곽에서 원인을 알 수 없는 고대 기계의 맥동이 감지되었다. 상급 테크프리스트는 '호기심은 반역'이라며 봉쇄를 명했지만, 스캐너에는 인류 암흑기 이전의 기이한 파형이 찍혀 있다.",
    choices: [
      {
        label: "[테크프리스트/마고스 전용] 고위 기계교 암호와 누스피어 스캐너로 파형의 근원을 정밀 해독한다",
        req: { anyTags: ["tech_priest", "magos"] },
        effect: {
          text: "성스러운 고위 권한으로 접근해 미궁 외곽의 고대 발전기 설계 일부를 안전하게 추출했다! 화성 의회에서 이름이 거론되었다.",
          stats: { Int: 8, Inf: 10 }
        }
      },
      {
        label: "[지성 판정] 옴니시아의 이름으로 탐사 서보스컬을 보내 고대 회로를 기록한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "금지된 경계를 넘지 않고도 고대 합금 제련 수식을 확보해 화성 주조소의 큰 포상을 받았다!",
          stats: { Int: 7, Inf: 8 }
        },
        fail: {
          text: "고대 방어 체계의 전자기 펄스에 신경 회로가 타 버려 큰 부상을 입었다.",
          wounds: -24,
          stats: { Int: 2 }
        }
      },
      {
        label: "규율에 복종해 즉시 봉쇄선 뒤로 물러나 기계령 진정 기도를 올린다",
        effect: {
          text: "화성에서는 궁금해하지 않는 자가 가장 오래 산다. 기계교 상부가 그대의 순명을 치하했다.",
          stats: { WP: 4, Inf: 3 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Mars / Mechanicum"
  },
  {
    id: "ev_world_cadia_kasrkin",
    title: "카디아 — 카스르킨(Kasrkin) 정예 선발 사열",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, maxAge: 26, anyWorlds: ["cadia"], anyHomeWorlds: ["cadia"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 카디아 · 14~26세",
    weight: 26,
    text: "카디아 유년 군사단(Whiteshields) 가운데 가장 냉철하고 정밀한 사격수를 뽑아 정예 척탄병 '카스르킨'으로 훈련시키는 실탄 사열이 열렸다. 표적 대신 실제로 움직이는 포획 돌연변이들이 투입된다.",
    choices: [
      {
        label: "[사격 판정] 헬건(핫샷 라스건)을 받아 들고 한 발의 낭비 없이 표적을 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "보랏빛 눈동자가 흔들림 없이 표적을 꿰뚫었다! 카디아 사령부가 그대에게 정예 표창을 수여했다.",
          stats: { BS: 7, WP: 5, T: 4, Inf: 6 },
          addTags: ["elite_troop"]
        },
        fail: {
          text: "과열된 전지팩이 손에서 터져 화상을 입었지만, 눈물을 보이지 않고 사격을 마쳤다.",
          wounds: -18,
          stats: { BS: 3, WP: 3 }
        }
      },
      {
        label: "[백병 판정] 총검을 착검하고 근접 제압 시범에 지원한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "빈틈없는 총검술로 교관의 찬사를 받았다. '카디아의 아이는 요람에서부터 병사다.'",
          stats: { WS: 6, T: 4, Inf: 4 }
        },
        fail: {
          text: "어깨를 베여 의무실에 실려 갔다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Kasrkin / Codex: Astra Militarum"
  },
  {
    id: "ev_world_armageddon_ash",
    title: "아마겟돈 — 잿빛 황무지(Ash Wastes) 포자 소각전",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["armageddon"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 아마겟돈",
    weight: 24,
    text: "헬스리치 하이브 외곽의 유독성 잿빛 황무지에서 지난 전쟁 때 흩어진 오크 포자가 야생 페럴 오크 무리로 자라났다! 산성 폭풍이 몰려오기 전에 화염방사기로 둥지를 태워야 한다.",
    choices: [
      {
        label: "[강인 판정] 방독면을 고쳐 쓰고 화염방사기를 메어 오크 둥지로 진격한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "맹렬한 프로메슘 불길로 오크 둥지를 완전히 재로 만들었다! 하이브 방위청이 공로를 인정했다.",
          stats: { T: 5, BS: 4, Inf: 5 }
        },
        fail: {
          text: "산성 모래바람에 방독면 필터가 녹아내려 폐에 심한 손상을 입었다.",
          wounds: -24,
          stats: { T: 2 }
        }
      },
      {
        label: "[민첩 판정] 키메라 장갑차 정찰대로 우회해 외곽 잔당만 정리한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "기동력을 살려 무사히 정찰과 소탕을 완수했다.",
          stats: { Ag: 4, BS: 4 }
        },
        fail: {
          text: "황무지 함정에 차량이 전복되어 타박상을 입었다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Armageddon"
  },
  {
    id: "ev_world_necromunda_house",
    title: "네크로문다 — 6대 클랜 하우스의 암거래 의뢰",
    category: "행성 고유",
    once: true,
    req: { minAge: 15, anyWorlds: ["necromunda"], excludeTags: ["astartes", "custodes", "grey_knight", "sororitas", "dreadnought"] },
    reqLabel: "행성: 네크로문다 (필멸자 · 비초인)",
    weight: 24,
    text: "하이브 프리무스의 거대 세력인 하우스 반 사르(첨단 기술)와 하우스 에셔(독극물·화공)가 동시에 밀수 화물 호위를 제안해 왔다. 네크로문다에서 중립이란 곧 양쪽 모두의 표적이 된다는 뜻이다.",
    choices: [
      {
        label: "[이단심문관/아르비테스/커미사르 전용] 밀수 접선지를 통째로 급습해 양쪽 클랜 수장을 심문·압수한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 법집행의 철퇴 앞에 하이브 클랜들이 고개를 숙였다! 밀수된 금지 장비와 막대한 첩보를 압수했다.",
          stats: { Inf: 10, Int: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 하우스 반 사르의 고대 방사능 슈트 밀반입을 돕는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "정밀한 보안 해제로 보수를 두둑이 챙기고 첨단 기술 지식까지 훔쳐 배웠다!",
          stats: { Int: 6, Inf: 6, BS: 3 }
        },
        fail: {
          text: "반 사르 슈트의 방사선 누출에 피폭되어 병석에 누웠다.",
          wounds: -22
        }
      },
      {
        label: "[교섭 판정] 양쪽의 정보를 슬쩍 맞교환해 더 큰 몫을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "능숙한 양다리 협상으로 언더하이브와 미드하이브 양쪽에서 막대한 연줄을 얻었다!",
          stats: { Fel: 6, Inf: 8 }
        },
        fail: {
          text: "속임수가 탄로 나 에셔 갱단의 독침 암살자에게 습격당했다!",
          wounds: -26,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Lexicanum: Necromunda"
  },
  {
    id: "ev_world_vostroya_firstborn",
    title: "보스트로야 — 장자(Firstborn) 가문의 보물 승계",
    category: "행성 고유",
    once: true,
    req: { minAge: 15, anyWorlds: ["vostroya"], anyHomeWorlds: ["vostroya"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 보스트로야",
    weight: 24,
    text: "호루스 헤러시 시절의 빚을 갚기 위해 모든 가문의 장자를 군에 바치는 보스트로야의 오랜 서약. 가문의 어른이 대대로 물려 내려온 황금 장식 수공예 라스건과 플라즈마 코일을 그대 앞에 내놓는다.",
    choices: [
      {
        label: "[사격 판정] 장인 정신이 깃든 가보 총기의 사격 의식을 완벽히 치른다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "과열 없이 정교한 명중률을 보여 가문의 명예와 보스트로얀 연대의 자긍심을 높였다!",
          stats: { BS: 6, WP: 5, Inf: 5 }
        },
        fail: {
          text: "오래된 플라즈마 코일이 과열되어 손등에 화상을 입었지만 끝내 총을 놓지 않았다.",
          wounds: -18,
          stats: { WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Vostroyan Firstborn"
  },
  {
    id: "ev_world_valhalla_ice_orks",
    title: "발할라 — 빙하 지하 터널의 동면 오크 둥지",
    category: "행성 고유",
    once: true,
    req: { minAge: 15, anyWorlds: ["valhalla"] },
    reqLabel: "행성: 발할라",
    weight: 24,
    text: "지열 발전관 확장 공사 도중 영구 동토층 아래 수백 년 전 침공 당시 얼어붙었던 오크들이 열기에 녹아 깨어나고 말았다! 지하 도시 전체가 위험하다.",
    choices: [
      {
        label: "[사격 판정] 좁은 얼음 터널에 방어선을 치고 집중 사격으로 막아 낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "발할라 특유의 냉철한 탄막 사격으로 오크 무리를 얼음 벽 앞에 고정해 전멸시켰다!",
          stats: { BS: 6, T: 4, WP: 4, Inf: 5 }
        },
        fail: {
          text: "동상과 오크의 난입 속에 큰 부상을 입고 가까스로 격벽을 닫았다.",
          wounds: -24,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 지열 파이프를 역류시켜 터널 전체를 영하 90도로 급속 동결시킨다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "피 한 방울 흘리지 않고 오크 둥지를 다시 영구 빙벽에 가두었다! 다만 난방이 사흘 끊겨 시민들이 원망했다.",
          stats: { Int: 6, Inf: 5, Fel: -2 }
        },
        fail: {
          text: "밸브 폭발로 냉각수에 심한 동상을 입었다.",
          wounds: -20
        }
      }
    ],
    source: "Lexicanum: Valhalla"
  },
  {
    id: "ev_world_nocturne_salamander",
    title: "녹턴 — 화산 대장간과 불도마뱀(Firedrake) 사냥",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["nocturne"], anyHomeWorlds: ["nocturne"], excludeTags: ["astartes", "custodes", "dreadnought"] },
    reqLabel: "행성: 녹턴",
    weight: 25,
    text: "용암 강이 흐르는 데스파이어 산기슭에서 거대한 화염 파충류 '파이어드레이크'가 성소 마을을 위협하고 있다. 녹턴의 전사들과 샐러맨더 아스타르테스 후보생에게는 최고의 시련이다.",
    choices: [
      {
        label: "[백병 판정] 직접 벼린 흑요석 창을 들고 불도마뱀의 심장을 노린다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "용암 비늘을 뚫고 거수를 쓰러뜨렸다! 샐러맨더 대장장이가 그대의 강인함과 자비로운 용기를 칭송했다.",
          stats: { WS: 7, T: 6, WP: 5, Inf: 6 },
          addTags: ["geneseed_compatible"]
        },
        fail: {
          text: "화염 숨결에 심각한 화상을 입었지만 주민들을 대피시키는 데는 성공했다.",
          wounds: -26,
          stats: { T: 4, Fel: 3 }
        }
      },
      {
        label: "[지성 판정] 대장간의 쇠사슬 그물과 용암 수로를 이용해 괴수를 몰아낸다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "뛰어난 장인 기술로 마을 피해 없이 괴수를 쫓아냈다!",
          stats: { Int: 5, Fel: 5, T: 3 }
        },
        fail: {
          text: "용암이 튀어 팔을 크게 데였다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Nocturne / Codex: Salamanders"
  },
  {
    id: "ev_world_ophelia7_tribunal",
    title: "오펠리아 VII — 추기경 대성당의 이단 고발 함",
    category: "행성 고유",
    once: true,
    req: { minAge: 14, anyWorlds: ["ophelia7"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor", "canoness", "lord_commissar"] },
    reqLabel: "행성: 오펠리아 VII",
    weight: 24,
    text: "오펠리아 VII의 모든 광장에는 이웃의 불경한 언행을 익명으로 적어 넣는 '신앙의 고발 함'이 놓여 있다. 오늘 아침 그대의 이름이 적힌 쪽지가 익명으로 접수되었다는 소환장이 날아왔다!",
    choices: [
      {
        label: "[소로리타스/성직자/커미사르 전용] 심문단 앞에서 필적을 역추적해 거짓 밀고자 이단을 색출한다",
        req: { anyTags: ["sororitas", "ecclesiarchy", "commissar"] },
        effect: {
          text: "오히려 대성당 내부의 위선적 밀고자를 꿰뚫어 보고 추기경단의 깊은 신뢰를 얻었다!",
          stats: { WP: 6, Int: 4, Inf: 8 },
          faith: 12
        }
      },
      {
        label: "[의지 판정] 심문단 앞에서 한 치의 떨림 없이 성인전 300구절을 완벽히 암송한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "추기경이 감탄하며 무고함을 선포했고, 반대로 허위 밀고자를 색출해 화형에 처했다!",
          stats: { WP: 6, Inf: 6 },
          faith: 14
        },
        fail: {
          text: "사소한 발음 실수를 트집 잡혀 채찍 참회형과 사흘 금식 벌을 받았다.",
          wounds: -18,
          faith: 4
        }
      },
      {
        label: "[교섭 판정] 재빠르게 더 그럴듯한 다른 용의자의 불경 행위를 고발해 시선을 돌린다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "심문관의 관심이 순식간에 경쟁 상인에게로 쏠렸다. 제국 신앙 정치의 비정한 생존술을 배웠다.",
          stats: { Fel: 5, Inf: 4 },
          corruption: 4
        },
        fail: {
          text: "오히려 교활한 변명으로 찍혀 공개 태형을 당했다.",
          wounds: -20,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Lexicanum: Ophelia VII / Ecclesiarchy"
  },
  {
    id: "ev_world_paradise_hunt",
    title: "낙원 행성의 은밀한 여흥 — 귀족들의 '인간 사냥'",
    category: "부조리",
    once: true,
    req: { minAge: 15, anyWorldTags: ["paradise"] },
    reqLabel: "행성: 낙원 행성",
    weight: 24,
    text: "에메랄드빛 해변 너머 비공개 사유림. 제국 고위 귀족들이 '사냥감이 말을 하면 더 스릴 있다'며 죄수복을 입힌 하층민을 풀어놓고 사냥총을 겨누고 있다. 그대는 우연히 이 추악한 축제를 목격했다.",
    choices: [
      {
        label: "[아스타르테스/이단심문관/소로리타스/커미사르 전용] 슬라네쉬 타락의 징후로 간주하고 사냥꾼 귀족 일당을 그 자리에서 즉결 처단한다",
        req: { anyTags: ["astartes", "custodes", "inquisitor", "sororitas", "canoness", "commissar", "lord_commissar"] },
        effect: {
          text: "제국 귀족들의 비명 속에 볼터와 심판의 검이 번뜩였다! 방탕과 타락에 물든 사교 모임을 단숨에 정화하고 죄수들을 해방했다.",
          stats: { WP: 6, Inf: 8 },
          faith: 14
        }
      },
      {
        label: "[신앙/정의] 이단적 잔혹 행위로 국교와 아르비테스에 고발한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "마침 순찰 중이던 이단심문소 요원에게 첩보가 닿아 타락한 귀족 일당이 슬라네쉬 컬트 혐의로 일망타진되었다!",
          stats: { WP: 6, Inf: 8 },
          faith: 12,
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "고발장은 총독의 책상에서 찢겨 버렸고, 그대는 귀족 사병들에게 구타당해 쫓겨났다.",
          wounds: -26,
          stats: { Inf: -6 }
        }
      },
      {
        label: "이 제국에서 귀족의 취미에 참견하는 건 자살 행위다. 못 본 척 침묵한다",
        effect: {
          text: "숲속에서 울려 퍼지는 비명과 샴페인 터지는 소리를 뒤로하고 발걸음을 재촉했다.",
          stats: { Int: 2 },
          faith: -5,
          corruption: 5
        }
      }
    ],
    source: "Dark Heresy / Imperial Nobility Lore"
  },

  // =========================================================================
  // 8. 병종·직업별 고유 스토리 & 제국의 인간경시 이벤트
  // =========================================================================
  {
    id: "ev_job_menial_press",
    title: "매뉴팩토룸의 용광로 사고 — '기계부터 구해라!'",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["menial_worker"] },
    reqLabel: "직업: 행성 노동자 · 길드원",
    weight: 24,
    text: "탄약 조립 라인의 압력 밸브가 터지며 뜨거운 쇳물이 쏟아졌다! 동료 둘이 쇳물 앞에 고립되었지만, 공장 감독관과 기계교 사제가 고함을 지른다. '멍청이들아, 사람보다 성스러운 4번 프레스 기계령부터 냉각시켜! 노동자는 내일 다시 뽑으면 된다!'",
    choices: [
      {
        label: "[민첩 판정] 감독관의 명령을 무시하고 고립된 동료들을 먼저 끌어낸다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "동료 둘을 살려 냈지만 기계가 손상되었다는 죄목으로 한 달 치 배급이 삭감되고 태형을 맞았다. 그래도 동료들의 눈빛이 달라졌다.",
          stats: { Ag: 4, Fel: 6, WP: 4 },
          wounds: -12
        },
        fail: {
          text: "쇳물에 화상을 입고 동료도 구하지 못한 채 작업 태만으로 매질까지 당했다.",
          wounds: -28
        }
      },
      {
        label: "차갑게 명령에 복종해 냉각 밸브를 돌려 성스러운 기계령을 먼저 지킨다",
        effect: {
          text: "동료들의 비명이 멎은 뒤, 기계교 사제가 그대의 '올바른 우선순위'를 치하하며 반장 직책과 약간의 권위를 내렸다.",
          stats: { Int: 4, Inf: 6, Fel: -4 },
          faith: -3
        }
      }
    ],
    source: "Warhammer Crime / Imperium Maledictum"
  },
  {
    id: "ev_job_guard_primer",
    title: "《제국 보병 입문서》와 병참의 부조리",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["astra_militarum"] },
    reqLabel: "직업: 아스트라 밀리타룸 보병",
    weight: 24,
    text: "전선 투입 직전, 병참부에서 지급한 라스건 전지팩 절반이 불량품이고 탄약 상자에는 300년 전 봉건 행성용 화살촉이 들어 있었다! 그런데도 대대장은 《제국 보병 입문서》의 '제국 보급품에 의심을 품는 자는 총살' 조항을 낭독하고 있다.",
    choices: [
      {
        label: "[지성 판정] 밤새 불량 전지팩을 뜯어 정상 부품을 조합해 분대 무기를 살려 낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "테크프리스트 눈을 피해 라스건 출력을 되살려 냈다! 덕분에 다음 날 기습전에서 분대 전원이 살아남았다.",
          stats: { Int: 5, BS: 4, Fel: 4 }
        },
        fail: {
          text: "기계령 무단 개조 혐의로 엔지니어 사제에게 고발당해 징계 노역을 치렀다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[민첩 판정] 인접 연대 보급 창고에서 정상 전지팩을 몰래 '전략적 재배치'한다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "아무도 모르게 최상급 탄약과 군화를 확보했다! 병사들이 그대를 전설의 보급 마술사로 떠받든다.",
          stats: { Ag: 5, Fel: 5, Inf: 3 }
        },
        fail: {
          text: "헌병대에게 걸려 일주일간 영창에 갇힌 채 빵과 물만 먹었다.",
          wounds: -12,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "The Imperial Infantryman's Uplifting Primer"
  },
  {
    id: "ev_job_officer_attrition",
    title: "장교의 결단 — '병사 8,000명과 포탄 300발의 가격'",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["militarum_officer"] },
    reqLabel: "직업: 아스트라 밀리타룸 장교",
    weight: 24,
    text: "적 요새를 함락시킬 두 가지 작전안이 탁자 위에 올랐다. 사단 참모는 냉정하게 말한다. '정면 인해전술을 쓰면 병사 8,000명이 죽지만 귀한 바실리스크 포탄을 아끼고 6시간 빨리 점령해 승진할 수 있소.'",
    choices: [
      {
        label: "[지성 판정] 참모의 비웃음을 무릅쓰고 야간 우회 기동 작전을 직접 설계한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 400명의 손실만으로 요새를 함락시켰다! 병사들은 그대를 살아 있는 성자처럼 따르기 시작했다.",
          stats: { Int: 6, Fel: 8, Inf: 6 }
        },
        fail: {
          text: "우회로가 들켜 작전이 지연되자 상부로부터 '우유부단한 지휘'라는 경고를 받았다.",
          stats: { Inf: -6 },
          wounds: -14
        }
      },
      {
        label: "제국 군부의 계산법대로 정면 돌격 명령서에 서명한다",
        effect: {
          text: "8,000명의 시체 위로 제국 깃발이 꽂혔다. 군 사령부는 '모범적이고 신속한 제국식 승리'라며 훈장과 진급 점수를 내렸다.",
          stats: { Inf: 10, WP: 4, Fel: -6 },
          faith: -4
        }
      }
    ],
    source: "Codex: Astra Militarum / Only War"
  },
  {
    id: "ev_job_mechanicus_emotion",
    title: "기계교 의식 — 감정 영역 절제 (Rite of Clear Thought)",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["tech_priest", "archmagos"] },
    reqLabel: "직업: 테크프리스트 / 마고스",
    weight: 26,
    text: "상급 마고스가 그대의 뇌 피질에서 공포·슬픔·연민 같은 '비효율적 유기체 감정'을 제거하고 논리 연산 칩으로 대체하는 성스러운 수술을 권유한다.",
    choices: [
      {
        label: "살점은 나약하다! 감정 영역을 절제하고 순수 논리의 기계 사제가 된다",
        effect: {
          text: "인간적인 따스함과 눈물은 영원히 사라졌지만, 연산 속도와 공포 내성이 경이로운 수준으로 치솟았다!",
          stats: { Int: 10, WP: 8, Fel: -10 },
          lifeBonusExtra: 35,
          addTags: ["bionic"]
        }
      },
      {
        label: "인간의 직관 역시 옴니시아가 주신 설계의 일부라며 수술을 보류한다",
        effect: {
          text: "보수파 사제들은 의심스러운 눈초리를 보냈으나, 일반 제국군과 소통할 수 있는 드문 현자로 남았다.",
          stats: { Fel: 5, WP: 4 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_job_arbites_governor",
    title: "제국법(Lex Imperialis)의 저울 — 총독 아들의 폭주",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["arbites"] },
    reqLabel: "직업: 아뎁투스 아르비테스",
    weight: 24,
    text: "만취한 행성 총독의 장남이 고급 반중력 차량으로 십일조 노동자 행렬을 들이받아 40명이 즉사했다! 총독은 막대한 금괴를 보내며 사건 무마를 요구하고 있다. 하지만 죽은 자들은 '황제의 십일조 생산 자산'이었다.",
    choices: [
      {
        label: "[의지 판정] 총독궁 문을 부수고 들어가 '제국 십일조 자산 훼손죄'로 아들을 체포한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "제국법은 행성 총독 위에도 군림한다! 하이 마샬이 그대의 철두철미한 법 집행을 극찬했다.",
          stats: { WP: 6, Inf: 10, WS: 4 }
        },
        fail: {
          text: "총독 사병대와의 총격전에서 중상을 입었지만 끝내 영장을 집행했다.",
          wounds: -24,
          stats: { WP: 5, Inf: 6 }
        }
      },
      {
        label: "사망자를 '노후 자산 자연 손실'로 처리하고 총독의 정치적 후원을 받는다",
        effect: {
          text: "총독 가문의 막대한 후원금이 들어왔지만, 제국법의 수호자라는 양심에는 검은 얼룩이 졌다.",
          stats: { Inf: 8, Fel: 4 },
          corruption: 10,
          faith: -6
        }
      }
    ],
    source: "Lexicanum: Adeptus Arbites"
  },
  {
    id: "ev_job_navy_mutiny",
    title: "임페리얼 네이비 — 하층 포갑판 노예 선원의 반란",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["imperial_navy"] },
    reqLabel: "직업: 임페리얼 네이비",
    weight: 24,
    text: "18개월째 항구 없는 성간 항해에 내몰린 하층 포갑판 강제 징발 노역자 2,000명이 쇠사슬을 끊고 무기고를 점거했다! 함장은 차갑게 말한다. '해병대를 투입할 필요 없소. 4번 구역의 공기 배출 레버만 당기시오.'",
    choices: [
      {
        label: "[백병/교섭] 진공 사살 대신 직접 해병대를 이끌고 진입해 주동자만 제압한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "유혈을 최소화하고 폭동을 진압했다! 살아남은 노역자들 덕분에 다음 전투에서 함포 장전 속도가 오히려 빨라졌다.",
          stats: { WS: 5, Fel: 6, Inf: 5 }
        },
        fail: {
          text: "분노한 노역자들의 렌치 공격에 큰 부상을 입고 간신히 진압을 마쳤다.",
          wounds: -24,
          stats: { WS: 3 }
        }
      },
      {
        label: "함장의 명령대로 4번 구역의 격벽을 닫고 우주 공간으로 공기를 배출한다",
        effect: {
          text: "30초 만에 반란이 끝났다. 새 노역자는 다음 하이브 월드 정박 때 다시 징발하면 그만이다. 냉혹한 효율이 함대의 신임을 얻었다.",
          stats: { Inf: 8, WP: 3, Fel: -5 },
          faith: -3
        }
      }
    ],
    source: "Battlefleet Gothic / Rogue Trader"
  },
  {
    id: "ev_job_psyker_commissar",
    title: "생션드 사이커 — 등 뒤의 장전된 볼트 피스톨",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["sanctioned_psyker"] },
    reqLabel: "직업: 생션드 사이커 · 아스트로패스",
    weight: 24,
    text: "적 중전차 부대가 아군 지휘부를 덮치기 직전이다! 한계치를 넘어 워프 번개를 끌어내면 전차대를 날려 버릴 수 있지만, 등 뒤에 붙은 감시 커미사르가 안전장치를 풀며 경고한다. '조금이라도 눈빛이 흔들리면 네 머리를 먼저 날리겠다, 마녀.'",
    choices: [
      {
        label: "[의지 판정] 생명을 걸고 극한의 워프 번개를 쏟아내 적 기갑대를 초토화한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "푸른 섬광이 적 전차 5대를 녹여 버렸다! 커미사르는 혀를 차며 권총을 집어넣었고 연대장이 경의를 표했다.",
          stats: { WP: 8, Int: 4, Inf: 8 },
          corruption: 6
        },
        fail: {
          text: "사이킥 역류로 코피를 쏟으며 쓰러졌고, 커미사르의 개머리판에 기절해 의무실로 실려 갔다. 목숨만 붙은 게 기적이었다.",
          wounds: -28,
          corruption: 12
        }
      },
      {
        label: "안전한 출력 범위 안에서 아군 사기 진작과 정찰 지원만 수행한다",
        effect: {
          text: "아군 피해는 커졌지만 워프 폭주도, 즉결 처형도 피했다. 사이커가 오래 사는 유일한 길이다.",
          stats: { WP: 3, Int: 3 }
        }
      }
    ],
    source: "Dark Heresy / Codex: Astra Militarum"
  },
  {
    id: "ev_job_grey_knight_purge",
    title: "666챕터의 잔혹한 규율 — 충성스러운 목격자들의 운명",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["grey_knight"] },
    reqLabel: "직업: 그레이 나이트",
    weight: 28,
    text: "코른의 대악마를 추방하고 행성을 구해 냈다. 피투성이로 살아남은 제국 가드맨 3,000명이 은빛 갑주를 향해 눈물을 흘리며 환호한다. 그때 오르도 말레우스 이단심문관이 무전으로 명한다. '악마와 그레이 나이트를 목격한 필멸자는 전원 정화하라.'",
    choices: [
      {
        label: "잔혹한 비밀 규율에 따라 침묵 속에 숙청을 승인한다",
        effect: {
          text: "악마의 존재가 퍼져 행성 열 개가 타락하는 것을 막기 위해, 영웅적으로 싸운 충성파 병사들이 역사에서 지워졌다. 영원한 죄책감과 철의 의지가 남는다.",
          stats: { WP: 8, Inf: 6 },
          faith: -5
        }
      },
      {
        label: "[의지/교섭 판정] 스페이스 울프의 선례처럼 처형 대신 기억 소거와 명예 전속을 관철한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "압도적인 위엄으로 이단심문관을 설득해 병사들의 목숨을 살리고 사이킥 기억 소거로 마무리했다.",
          stats: { WP: 6, Fel: 6, Inf: 4 },
          faith: 10
        },
        fail: {
          text: "이단심문소와 날카로운 갈등만 빚은 채 결국 규율대로 집행되고 말았다.",
          stats: { Inf: -6, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Months of Shame / Codex: Grey Knights"
  },
  {
    id: "ev_job_inquisition_exterminatus",
    title: "이단심문관의 서명 — 익스터미나투스(행성 정화) 딜레마",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["inquisitor"] },
    reqLabel: "직업: 제국 이단심문관",
    weight: 26,
    text: "인구 40억의 하이브 월드 하층부 60%에 진스틸러 컬트와 카오스 변이가 동시에 퍼졌다. 궤도 순양함 함장이 사이클론 어뢰 발사 승인 코드를 기다리고 있다. 40억의 목숨인가, 성계 전체의 감염인가.",
    choices: [
      {
        label: "황제의 자비로운 화염으로 행성을 정화한다 — 익스터미나투스 집행",
        effect: {
          text: "행성 지표 전체가 불길에 삼켜졌다. 수십억 영혼의 무게가 어깨를 짓누르지만, 성계 전체의 재앙은 단 한 번의 서명으로 차단되었다.",
          stats: { Inf: 12, WP: 6, Fel: -6 },
          faith: -4
        }
      },
      {
        label: "[지성/무력 판정] 폭격을 보류하고 직접 정예 강습대를 이끌어 컬트 수장을 암살한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "기적적인 참수 작전으로 하이브 월드의 40억 시민을 구해 냈다! 이단심문소 내 청교도파의 영웅이 되었다.",
          stats: { Int: 8, WS: 5, Inf: 14, Fel: 6 },
          faith: 15
        },
        fail: {
          text: "작전 도중 치명상을 입고 퇴각했으며, 결국 행성은 끝없는 내전 지옥에 빠졌다.",
          wounds: -34,
          stats: { Inf: -6 }
        }
      }
    ],
    source: "Lexicanum: Exterminatus"
  },
  {
    id: "ev_job_priest_relic",
    title: "에클레시아키 — 의심스러운 성유물과 광신도 군중",
    category: "직업 고유",
    once: true,
    req: { anyCareers: ["ecclesiarchy_priest"] },
    reqLabel: "직업: 에클레시아키 사제",
    weight: 24,
    text: "지역 대성당에 모셔진 '성자 마카리우스의 황금 뼈'가 사실은 100년 전 사기꾼 상인이 팔아넘긴 그록스(외계 가축) 뼈라는 비밀 기록을 발견했다! 지금 밖에서는 순례자 10만 명이 성유물 행렬을 기다리며 눈물을 흘리고 있다.",
    choices: [
      {
        label: "진실보다 중요한 것은 인류의 신앙이다! 비밀을 덮고 더욱 장엄하게 설교한다",
        effect: {
          text: "10만 순례자의 환호와 엄청난 봉헌금이 쏟아졌다. 어차피 기적은 뼈가 아니라 믿음에서 나오는 법이다.",
          stats: { Fel: 6, Inf: 8 },
          faith: 4,
          corruption: 4
        }
      },
      {
        label: "[의지 판정] 거짓 성유물을 폐기하고 순수한 황제 교리만을 설파한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "분노하던 군중을 압도적인 설교로 감화시켜 대성당의 부패를 정화했다!",
          stats: { WP: 7, Fel: 5, Inf: 5 },
          faith: 16
        },
        fail: {
          text: "성유물 장사로 배를 불리던 상급 사제들에게 미운털이 박혀 변방 교구로 좌천되었다.",
          stats: { Inf: -8 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Ecclesiarchy / Ciaphas Cain"
  },

  // =========================================================================
  // 9. 직종 계급(Tier)별 고유 스토리 & 초인 행성 고증 이벤트
  // =========================================================================
  {
    id: "ev_astartes_recruiting_visit",
    title: "징병 행성 사열 — 하늘에서 내려다보는 옛 필멸자의 땅",
    category: "아스타르테스",
    once: true,
    req: { anyCareers: ["astartes_brother", "astartes_captain"], anyWorldTags: ["astartes_recruit"] },
    reqLabel: "배틀 브라더/중대장 · 챕터 징병 행성 방문",
    weight: 30,
    text: "썬더호크에서 내린 2.5미터 파워 아머의 위용 앞에, 한때 그대 역시 속해 있었을 언더하이브 갱단원들과 부족 소년들이 숨을 죽이고 무릎을 꿇는다. 채플린과 함께 새로운 챕터 후보생(Aspirant)들을 선발할 차례다.",
    choices: [
      {
        label: "[의지/지성 판정] 가장 거칠고 끝까지 눈을 피하지 않은 하층민 소년을 직접 지목한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "날카로운 안목으로 탁월한 유전 적성의 신병 3명을 발굴했다! 챕터 마스터가 그대의 안목을 높이 평가했다.",
          stats: { Int: 4, Inf: 8, WP: 4 }
        },
        fail: {
          text: "선발된 후보생 대다수가 시련을 넘기지 못했지만, 그것이 아스타르테스의 냉혹한 법칙이다.",
          stats: { WP: 3 }
        }
      },
      {
        label: "아포세카리의 유전 수치 기준에만 따라 냉정하게 후보생을 선별한다",
        effect: {
          text: "감정 없는 효율로 챕터의 신병 할당량을 완수했다. 필멸자의 세계는 이제 발밑의 먼지처럼 아득하다.",
          stats: { WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Space Marine Recruitment / Necromunda & Imperial Fists"
  },
  {
    id: "ev_astartes_librarius",
    title: "챕터 라이브러리우스 — 전투 사이킥과 정신 두건의 시련",
    category: "아스타르테스",
    once: true,
    req: { allTags: ["astartes", "psyker"], excludeTags: ["grey_knight", "librarius_trained"] },
    reqLabel: "아스타르테스 + 사이커 자질",
    weight: 36,
    text: "아스타르테스 내의 사이커는 검은 함선이 아니라 챕터 치프 라이브러리안의 직속 시련을 거친다. 푸른 갑주의 선배들이 그대의 정신에 워프 폭풍을 직접 투사하며 묻는다. '너는 이 힘을 지배할 것인가, 아니면 지배당해 형제들의 볼터에 죽을 것인가!'",
    choices: [
      {
        label: "[의지 판정] 챕터 전투 함성을 내질러 워프 폭풍을 찢고 사이킥 두건(Psychic Hood)을 수여받는다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "악마의 환상을 산산조각 내고 정식 챕터 라이브러리안 수련을 통과했다! 이제 워프 오염 저항과 전투 사이킥이 비약적으로 강화된다.",
          stats: { WP: 10, Int: 8, Inf: 8 },
          corruption: -15,
          addTags: ["librarius_trained", "sanctioned_psyker"]
        },
        fail: {
          text: "혹독한 정신 충격으로 며칠간 의식을 잃었으나, 치프 라이브러리안은 포기하지 않고 다음 시련을 기약했다.",
          wounds: -20,
          stats: { WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Librarian / Codex: Space Marines"
  },
  {
    id: "ev_rank_scout_infiltration",
    title: "네오파이트의 증명 — 파워 아머 없는 적진 잠입",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["astartes_scout"] },
    reqLabel: "계급: 아스타르테스 네오파이트(스카웃)",
    weight: 26,
    text: "아직 검은 갑각과 파워 아머를 받지 못한 신참 네오파이트. 200년 경력의 베테랑 스카웃 병장이 차갑게 명령한다. '적 반역파 포병대 레이더를 소리 없이 폭파하라. 들키면 구원 따윈 없다.'",
    choices: [
      {
        label: "[민첩 판정] 카멜레온 망토에 몸을 숨기고 단검만으로 보초를 제거해 폭탄을 설치한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "완벽한 무음 침투로 포병 진지를 날려 버렸다! 스카웃 병장이 처음으로 고개를 끄덕이며 배틀 브라더 추천서를 써 주었다.",
          stats: { Ag: 6, BS: 5, WS: 4, Inf: 6 }
        },
        fail: {
          text: "경보가 울려 집중 포화 속에 간신히 탈출했다. 병장은 '아직 갑주를 입을 자격이 멀었다'며 혹독히 질책했다.",
          wounds: -26,
          stats: { T: 3, WP: 3 }
        }
      },
      {
        label: "[사격 판정] 장거리 스나이퍼 볼터로 적 지휘관과 탄약고를 원거리 저격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "1.2km 거리에서 탄약고 뇌관을 정밀 타격해 대폭발을 일으켰다!",
          stats: { BS: 6, Int: 4, Inf: 5 }
        },
        fail: {
          text: "역포격에 진지가 무너져 부상을 입고 철수했다.",
          wounds: -20
        }
      }
    ],
    source: "Codex: Space Marines (10th Company Scouts)"
  },
  {
    id: "ev_rank_captain_council",
    title: "중대장의 결단 — 타격 순양함 함교의 전략 회의",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["astartes_captain"] },
    reqLabel: "계급: 아스타르테스 중대장(캡틴)",
    weight: 28,
    text: "타격 순양함 함교의 홀로그램 성도 앞. 행성 총독이 눈물로 민간인 하이브 방어를 애원하는 한편, 궤도에는 적 카오스 기함을 급습해 성계 전쟁을 단번에 끝낼 10분의 틈이 열렸다. 100명 형제의 목숨과 행성의 운명이 중대장의 명령에 달렸다.",
    choices: [
      {
        label: "[지성 판정] 1개 분대만 방어선에 남기고 주력 드롭 포드로 적 기함 함교를 직접 참수한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "번개 같은 강습으로 적 기함을 격침해 성계 전체를 구원했다! 챕터의 전설로 기록될 완벽한 지휘였다.",
          stats: { Int: 6, WS: 5, Inf: 12, WP: 5 }
        },
        fail: {
          text: "적 함선의 함정에 걸려 중대에 큰 손실과 부상을 입었으나 끝내 승리를 쟁취했다.",
          wounds: -30,
          stats: { WP: 5, Inf: 4 }
        }
      },
      {
        label: "민간인 하이브 방어선에 중대 전력을 투입해 단 한 명의 시민도 포기하지 않는다",
        effect: {
          text: "전쟁은 길어졌으나 수백만 제국 시민이 살아남아 그대의 이름을 성자처럼 기렸다.",
          stats: { Fel: 8, WP: 6, Inf: 6 },
          faith: 12
        }
      }
    ],
    source: "Codex: Space Marines (Company Captain)"
  },
  {
    id: "ev_rank_acolyte_undercover",
    title: "어콜라이트의 그림자 — 버려질 수 있는 장기말",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["inquisition_acolyte"] },
    reqLabel: "계급: 이단심문소 어콜라이트",
    weight: 26,
    text: "스승 이단심문관이 암호 전문으로 하층 귀족 사교계에 숨어든 진스틸러·카오스 혼합 컬트에 위장 잠입하라고 명했다. '정체가 탄로 나면 나는 너를 모른다고 답할 것이다. 로제트를 원한다면 살아서 증거를 가져오라.'",
    choices: [
      {
        label: "[교섭 판정] 타락한 귀족 행세를 완벽히 연기해 컬트 간부 명단을 통째로 빼낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "아무 의심도 받지 않고 핵심 명단을 탈취했다! 스승 이단심문관이 그대를 차기 심문관 후보(인터로게이터)로 격상했다.",
          stats: { Fel: 6, Int: 6, Inf: 10 }
        },
        fail: {
          text: "정체가 발각되어 암살자들의 포위망을 피투성이로 뚫고 겨우 탈출했다.",
          wounds: -28,
          stats: { WS: 4 }
        }
      },
      {
        label: "[지성 판정] 직접 잠입 대신 통신 감청과 회계 장부 추적만으로 배후를 밝혀낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "치밀한 데스크 수사로 3개 은신처를 정확히 특정해 깔끔한 급습을 이끌었다.",
          stats: { Int: 7, Inf: 7 }
        },
        fail: {
          text: "역정보에 속아 헛다리를 짚는 바람에 스승에게 차가운 질책을 받았다.",
          stats: { Inf: -5 }
        }
      }
    ],
    source: "Dark Heresy / Imperium Maledictum"
  },
  {
    id: "ev_rank_lord_commissar_front",
    title: "로드 커미사르의 위엄 — 무너지는 전구 사령부",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["lord_commissar"] },
    reqLabel: "계급: 로드 커미사르",
    weight: 28,
    text: "전선 전체가 카오스 공세에 밀리자, 겁에 질린 귀족 출신 사단장이 후퇴 명령서에 서명하려 한다! 3개 연대 4만 명 장병의 시선이 붉은 장식띠를 두른 로드 커미사르에게 쏠린다.",
    choices: [
      {
        label: "[권위/교섭 판정] 사단장을 현장에서 직위 해제하고 직접 전군 반격 나팔을 불게 한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "로드 커미사르의 우렁찬 연설에 4만 가드맨이 일제히 함성을 지르며 적진을 돌파했다! 제국 역사에 남을 대역전이었다.",
          stats: { Fel: 7, Inf: 10, WP: 6 },
          faith: 10
        },
        fail: {
          text: "귀족 장군파의 방해 속에 최선두에서 직접 싸우다 중상을 입었지만 전선만은 끝내 지켜 냈다.",
          wounds: -26,
          stats: { WS: 4, Inf: 5 }
        }
      }
    ],
    source: "Codex: Astra Militarum (Lord Commissar)"
  },
  {
    id: "ev_rank_skitarii_override",
    title: "스키타리의 굴레 — 마고스의 강제 전파 명령",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["skitarii"] },
    reqLabel: "계급: 메카니쿠스 스키타리",
    weight: 26,
    text: "전방에 적 중기갑대가 포진해 있음에도, 후방의 마고스 도미누스가 누스피어 신경망으로 그대의 사지를 직접 제어하며 '귀중한 아키오테크 잔해 회수를 위한 자살적 전진'을 강제 송신한다!",
    choices: [
      {
        label: "[강인 판정] 기계교의 뜻에 완벽히 복종해 포화 속으로 한 치의 망설임 없이 전진한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "방사능 카빈을 쏘며 포화를 뚫고 유물 코어를 회수했다! 마고스가 그대의 기계적 충성을 치하하며 상급 개조를 내렸다.",
          stats: { T: 6, BS: 5, Inf: 7 }
        },
        fail: {
          text: "반파된 상태로 수거되어 대대적인 기계 의체 재조립을 거쳤다.",
          wounds: -30,
          stats: { T: 4 }
        }
      },
      {
        label: "[지성 판정] 0.2초의 연산 여유를 찾아 포탄 사각지대로 미세하게 경로를 보정한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "명령을 완수하면서도 분대 생존율을 41% 끌어올렸다! 테크프리스트 승급 적성이 기록되었다.",
          stats: { Int: 7, Ag: 4, Inf: 5 }
        },
        fail: {
          text: "전파 명령 미세 불복종 경고가 기록되어 신경 징계 충격을 받았다.",
          wounds: -16,
          stats: { Inf: -4 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus (Skitarii)"
  },
  {
    id: "ev_rank_archmagos_synod",
    title: "화성 대의회 — 탐색 함대 편성권 쟁탈전",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["archmagos"] },
    reqLabel: "계급: 마고스 · 아크마고스",
    weight: 28,
    text: "기계교 최고 의회에서 보수파 파브리케이터들이 그대의 신형 원자로 개량안을 '기술 이단(Tech-Heresy)에 근접한 위험한 혁신'이라며 공격하고 있다.",
    choices: [
      {
        label: "[지성 판정] 1만 년 전 STC 주석 구절을 4만 줄 인용해 보수파의 논리를 완벽히 분쇄한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "의회 전체가 이진법 찬가로 승복했다! 독자적인 아크 메카니쿠스 탐색 함대와 막대한 포지 지분을 확보했다.",
          stats: { Int: 8, Inf: 12 }
        },
        fail: {
          text: "교리 논쟁이 교착되어 일부 연구 예산이 동결되고 말았다.",
          stats: { Inf: -6 }
        }
      }
    ],
    source: "Codex: Adeptus Mechanicus"
  },
  {
    id: "ev_rank_canoness_crusade",
    title: "캐노네스의 결단 — 추기경의 정치적 출병 요구",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["canoness"] },
    reqLabel: "계급: 캐노네스 (수녀원장)",
    weight: 28,
    text: "교구의 부패한 추기경이 정적 귀족 가문을 숙청하기 위해 수녀원 군단(Order)의 출동을 명령해 왔다. 그러나 그대의 정찰대는 인접 성계에 진짜 카오스 컬트가 창궐하고 있음을 보고했다.",
    choices: [
      {
        label: "[의지 판정] 추기경의 사사로운 요구를 단호히 일축하고 진짜 이단이 들끓는 전선으로 출병한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "성스러운 볼터와 화염으로 카오스 의식을 분쇄하고 국교 총본산으로부터 살아 있는 귀감으로 칭송받았다!",
          stats: { WP: 8, Inf: 10, Fel: 5 },
          faith: 15
        },
        fail: {
          text: "성전은 승리했으나 보복에 나선 추기경의 방해로 보급이 끊겨 힘든 시기를 겪었다.",
          wounds: -18,
          stats: { Inf: -5 },
          faith: 10
        }
      }
    ],
    source: "Codex: Adepta Sororitas"
  },
  {
    id: "ev_rank_scion_drop",
    title: "템페스투스 사이온 — 스콜라 기억의 균열과 강하",
    category: "계급 고유",
    once: true,
    req: { anyCareers: ["tempestus_scion"] },
    reqLabel: "계급: 템페스투스 사이온",
    weight: 26,
    text: "발키리 수송기가 대공포화를 뚫고 강하 구역으로 진입하는 순간, 스콜라 프로제니움에서 지워졌던 어린 시절 가족의 얼굴이 희미하게 뇌리를 스쳤다. 강하 신호등이 녹색으로 켜진다!",
    choices: [
      {
        label: "[의지 판정] 모든 사사로운 기억을 교리로 덮어 버리고 완벽한 제국의 무기로서 강하한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "단 한 치의 오차도 없는 기습 강하로 적 사령부를 3분 만에 섬멸했다! 템페스터 프라임으로 추대될 만한 전과였다.",
          stats: { WP: 6, BS: 6, Ag: 4, Inf: 6 }
        },
        fail: {
          text: "찰나의 망설임으로 착지 지점이 빗나가 대공 파편에 부상을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Codex: Militarum Tempestus"
  }
];

