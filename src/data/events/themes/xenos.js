// 분기 사건 — 외계(Xenos) 종족 조우 · 교전 · 교섭 (오크 · 타이라니드 · 타우 · 드루카리 · 네크론 · 아엘다리 · 보탄 연맹)
export default [
  {
    id: "ev_ork_waaagh",
    title: "녹색 파도 — 오크 와아아! 습격",
    category: "전투",
    req: {
      minAge: 16,
      anyTags: ["militarum", "imperial_military", "astartes", "sororitas", "mechanicus"],
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["dreadnought"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "16세 이상 · 제국 군사·전투 직군 · 테라·화성·야만 행성·드레드노트 제외",
    weight: 17,
    text: "지평선 너머로 귀청이 터질 듯한 '와아아아!' 함성과 함께 녹색 오크 보이즈 무리가 붉은 트럭을 몰고 쇄도해 온다! 흙먼지 너머로 낡은 기관총 탄환이 빗발처럼 쏟아지며 아군 화기의 총열이 뜨겁게 달아오른다. 덩치 큰 오크 놉이 초파를 치켜들며 방어선의 중앙을 향해 돌진한다.",
    choices: [
      {
        label: "[특성 전용 · 백발백중 명사수] 흔들리는 트럭 운전석의 오크 운전수와 놉을 연속 저격한다",
        req: { allTags: ["deadeye_marksman"] },
        effect: {
          text: "두 발의 정밀 사격으로 지휘 차량이 전복되며 오크 돌격 대열이 순식간에 붕괴했다.",
          stats: { BS: 4, Inf: 5 }
        }
      },
      {
        label: "[사격 판정] 침착하게 일제 사격을 퍼부어 선두 오크 놉을 저격한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 집중 사격으로 지휘관 오크의 머리를 날려 버렸다! 지휘 체계를 잃은 오크들이 서로 싸우며 무너졌다.",
          stats: { BS: 5, Inf: 4, WP: 3 }
        },
        critSuccess: {
          text: "연속 정밀 사격으로 놉과 트럭 운전수를 동시에 관통해 돌격 대열을 통째로 전복시켰다.",
          stats: { BS: 7, Inf: 6, WP: 4 },
          addTags: ["deadeye_marksman"]
        },
        fail: {
          text: "오크 슈타의 난사에 어깨를 관통당했으나 간신히 전선을 유지했다.",
          wounds: -22,
          stats: { T: 2 }
        },
        critFail: {
          text: "오크 중화기의 유탄 파편이 팔과 다리를 강타해 영구적인 관절 손상을 남겼다.",
          wounds: -30,
          addTags: ["crippled_limb"]
        }
      },
      {
        label: "[백병 판정] 착검 돌격! 체인소드와 총검으로 오크 무리에 뛰어든다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "피와 포자가 튀는 백병전 끝에 오크 무리를 궤멸시켰다! 연대의 사기가 하늘을 찔렀다.",
          stats: { WS: 6, T: 4, WP: 4, Inf: 5 }
        },
        critSuccess: {
          text: "거구의 오크 놉들의 맹공을 모두 흘려 넘기며 단칼에 도륙해 전선 최고의 검술가로 이름을 떨쳤다.",
          stats: { WS: 8, T: 5, WP: 5, Inf: 7 },
          addTags: ["blade_master"]
        },
        fail: {
          text: "괴력을 지닌 오크의 초파에 깊은 상처를 입고 야전 병원으로 실려 갔다.",
          wounds: -28
        }
      },
      {
        label: "[지성 판정 · 지성 48+] 오크 포병대의 연료 저장고를 역산해 궤도 포격을 유도한다",
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
    id: "ev_tyranid_scouts",
    title: "궤도의 생체 강하 — 타이라니드 진스틸러 선봉대",
    category: "전투",
    req: {
      minAge: 16,
      minYear: 745,
      anyTags: ["militarum", "astartes", "sororitas", "inquisition_agent", "inquisitor", "mechanicus"],
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeBodyClasses: ["dreadnought"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought", "living_saint", "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "745.M41 이후 · 16세 이상 · 전투·수사·기계교 직군 · 비야만 행성·드레드노트 제외",
    weight: 14,
    text: "행성 궤도 경계망이 정적으로 먹통이 되며 워프의 그림자가 성계 전체에 내려앉았다. 대기권을 가르고 추락한 거대한 생체 포자낭이 하층 부두 구획에 꽂히더니, 갈라진 육벽 사이로 네 팔을 번뜩이는 타이라니드 진스틸러 선봉 무리가 쏟아져 나온다! 놈들이 하이브 함대의 유도 신호를 퍼뜨리기 전에 교두보를 끊어야 한다.",
    choices: [
      {
        label: "[민첩 판정] 천장 철골을 타고 사각지대로 돌아 들어가 화염방사기와 볼터로 생체 포자낭을 집중 파괴한다",
        req: { excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"] },
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "진스틸러 무리의 급습을 피해 포자낭을 불태우고 하이브 함대 침공 경보를 제때 발신했다!",
          stats: { Ag: 5, BS: 4, Inf: 6 }
        },
        critSuccess: {
          text: "생체 포자 폭풍 속에서도 한 치의 빈틈없이 포자낭을 소각하고 진스틸러 선봉을 전멸시켰다.",
          stats: { Ag: 7, BS: 5, Inf: 7 },
          addTags: ["battle_hardened"]
        },
        fail: {
          text: "진스틸러의 예리한 발톱에 옆구리를 깊게 베였으나 지원 부대 덕분에 생존했다.",
          wounds: -28,
          stats: { T: 3 }
        },
        critFail: {
          text: "포자낭의 맹독성 산성 가스를 정면으로 들이마시며 쓰러졌다. 목숨은 건졌으나 폐에 만성적인 독소 손상이 남았다.",
          wounds: -32,
          addTags: ["chronic_toxins"]
        }
      },
      {
        label: "[민첩 판정] 초인의 다중 폐로 독성 포자를 버텨 내며 생체 포자낭에 직격 소각 강습을 감행한다",
        req: { anyBodyClasses: ["transhuman"] },
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "유독 포자 안개를 뚫고 생체 포자낭을 볼터와 소이탄으로 완파하며 하이브 함대의 신호를 끊었다!",
          stats: { Ag: 5, BS: 4, Inf: 6 }
        },
        critSuccess: {
          text: "포자 폭풍 속에서도 한 치의 오차 없이 포자낭과 진스틸러 선봉 무리를 단숨에 섬멸했다.",
          stats: { Ag: 7, BS: 5, Inf: 7 },
          addTags: ["battle_hardened"]
        },
        fail: {
          text: "진스틸러의 예리한 발톱에 세라마이트 장갑이 찢기며 깊은 외상을 입었으나 끝내 교두보를 무너뜨렸다.",
          wounds: -28,
          stats: { T: 3 }
        },
        critFail: {
          text: "고압 생체 산성액과 진스틸러의 연격에 장갑이 크게 파손되며 중상을 입었으나, 초인의 강화 장기가 맹독만큼은 끝내 걸러 냈다.",
          wounds: -32,
          stats: { T: 2 }
        }
      },
      {
        label: "[의지 판정] 워프의 그림자가 가하는 정신 압박을 견디고 부두 격벽에 십자포화 수비진을 편성한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "공포에 질린 대원들을 진정시켜 완벽한 교차 사격으로 외계 선봉 무리를 섬멸했다.",
          stats: { WP: 5, Fel: 4, Inf: 5 }
        },
        critSuccess: {
          text: "하이브 마인드의 정신 중압감마저 정면으로 뚫어 내며 부대 전체를 철벽처럼 통솔했다.",
          stats: { WP: 7, Fel: 5, Inf: 7 },
          removeTags: ["shell_shocked"],
          addTags: ["iron_nerves"]
        },
        fail: {
          text: "압도적인 정신적 중압감에 판단이 한 박자 늦어져 진스틸러의 돌격에 큰 부상을 입었다.",
          wounds: -20
        }
      }
    ],
    source: "Lexicanum: Genestealer / Codex: Tyranids"
  },
  {
    id: "ev_xenos_trade",
    title: "제국 국경 너머 — 외계인 상단과의 비밀 접촉",
    category: "교섭",
    req: {
      minAge: 20,
      excludeWorlds: ["terra", "mars", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "sororitas", "canoness", "commissar", "lord_commissar", "commissar_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "cardinal"
      ],
      or: [{ anyCareers: ["rogue_trader", "inquisitor"] }, { stats: { Fel: 48, Inf: 45 } }]
    },
    reqLabel: "20세 이상 · 로그 트레이더·이단심문관 또는 교섭 48 이상과 권위 45 이상 · 비야만 행성",
    weight: 15,
    text: "성계 외곽 소행성대에서 아엘다리 커세어 선장이 비밀 회동을 제안해 왔다. 황제의 법은 무역 영장이나 심문관의 특권이 없는 자의 외계인 접촉을 극형에 처할 이단으로 규정하지만, 저들이 내민 고대 성간 항로도와 외계 유물은 좀처럼 거부하기 어렵다. 공허 너머 정지해 있는 날렵한 외계 순양함이 그대의 답을 기다린다.",
    choices: [
      {
        label: "[특성 전용 · 은빛 혀] 아엘다리 방언과 외교 수사로 커세어 선장의 자존심을 건드려 헐값에 항로도를 넘겨받는다",
        req: { allTags: ["silver_tongue"] },
        effect: {
          text: "화려한 말솜씨에 말려든 커세어 선장이 희귀 성간 항로도를 선선히 내어주고 물러났다.",
          stats: { Inf: 10, Fel: 4 },
          addTags: ["xenos_contact"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "[교섭 판정] 치열한 수싸움 끝에 외계 유물과 성간 항로도를 유리한 조건으로 거래한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "막대한 부와 희귀 무구, 그리고 다가올 재앙에 대한 아엘다리의 예언을 손에 넣었다!",
          stats: { Inf: 12, Int: 6, Fel: 5 },
          corruption: 6,
          addTags: ["xenos_contact"],
          align: { ruthless: 8 }
        },
        fail: {
          text: "오만한 외계인들에게 기만당해 매복 공격을 당하고 간신히 탈출했다.",
          wounds: -22,
          stats: { Inf: -5 },
          align: { ruthless: 5 }
        },
        critFail: {
          text: "외계인에게 막대한 대금을 떼이고 채권단과 중개인들에게 거액의 빚을 졌다.",
          wounds: -20,
          stats: { Inf: -8 },
          addTags: ["imperial_debt"],
          align: { ruthless: 5 }
        }
      },
      {
        label: "[사격 판정] 외계인과의 타협은 없다! 즉시 함포와 무기로 커세어 해적선을 사냥한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "배신감에 찬 외계 해적선을 격침시키고 제국 순수파의 뜨거운 찬사를 받았다!",
          stats: { BS: 5, Inf: 8, WP: 4 },
          faith: 12,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "민첩한 아엘다리 함선의 반격에 큰 피해를 입고 물러났다.",
          wounds: -20,
          align: { dogmatic: 5 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Lexicanum: Aeldari Corsairs"
  },
  {
    id: "ev_xenos_necron_tomb",
    title: "에메랄드빛 석실 — 고대 네크론 지하 묘실 탐사 교전",
    category: "전투",
    req: {
      minAge: 16,
      minYear: 897,
      anyTags: ["militarum", "imperial_military", "astartes", "custodes", "sororitas", "mechanicus", "inquisition_agent", "inquisitor", "rogue_trader"],
      excludeWorlds: ["terra", "mars", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "897.M41 이후 · 16세 이상 · 군사·기계교·심문소·초인·로그 트레이더 · 비야만 행성",
    weight: 16,
    text: "변방 사막 유적의 봉인된 석실에 진입한 순간, 6천만 년 동안 잠들어 있던 흑요석 관곽들이 섬뜩한 에메랄드빛으로 점화되었다! 정지장에서 깨어난 네크론 군주와 불멸자 호위대가 차가운 녹색 차원문을 등지고 무음의 대열을 펼친다. 치명적인 가우스 화기가 일제히 장전되며 석실의 공기에서 강렬한 금속 냄새가 번진다.",
    choices: [
      {
        label: "[사격 판정] 가우스 화기가 발사되기 전 멜타와 플라즈마 집중 사격으로 네크론 군주의 차원문을 파괴한다",
        check: { stat: "BS", diff: -10 },
        success: {
          text: "집중 포화가 차원 전송 장치를 산산조각 내어 적 증원을 끊었다! 네크론 묘실의 위협을 초기에 꺾은 전설적인 외계 토벌 전공이다.",
          stats: { BS: 6, WP: 5, Inf: 8 }
        },
        fail: {
          text: "가우스 광선이 갑주와 피부를 분자 단위로 벗겨 내어 극심한 중상을 입었다.",
          wounds: -32,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 석실 지지 기둥의 구조 약점을 파악해 발파 봉쇄하고 오르도 제노스에 좌표를 송신한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정밀한 폭파 공학으로 고대 묘실 입구를 완벽히 매몰시켜 수만 네크론의 각성을 수년간 지연시켰다! 오르도 제노스가 극찬했다.",
          stats: { Int: 7, Inf: 7 }
        },
        fail: {
          text: "천장을 타고 쏟아진 스캐럽 군체의 습격에 휘말려 큰 부상을 입고 간신히 탈출했다.",
          wounds: -24
        }
      }
    ],
    source: "Codex: Necrons / Lexicanum: Sanctuary 101"
  },
  {
    id: "ev_xenos_tau_propaganda",
    title: "동부 국경의 속삭임 — 타우 제국의 대의 선전 전단",
    category: "이단·외계",
    req: {
      minAge: 15,
      minYear: 742,
      anySegmenta: ["ultima"],
      excludeWorlds: ["terra", "mars", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "living_saint", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "742.M41 이후 · 15세 이상 · 울티마 세그멘툼 · 필멸자 · 비야만 행성",
    weight: 14,
    text: "밀수선을 타고 정교하게 인쇄된 외계어와 로우 고딕 병기 전단이 항구 구역에 나돌고 있다. '배고픔과 채찍뿐인 썩은 제국을 떠나, 타우 제국의 대의 아래 깨끗한 식량과 첨단 의료를 누리라!'는 문구가 시민들을 흔들자 커미사르와 아르비테스가 즉각 소지자 색출에 나섰다.",
    choices: [
      {
        label: "[신앙] 외계인의 감언이설 따위는 역겨운 이단이다! 즉시 불태우고 유포자를 고발한다",
        effect: {
          text: "황제에 대한 흔들림 없는 충성을 증명해 포상과 신앙의 가호를 얻었다.",
          stats: { WP: 4, Inf: 5 },
          faith: 10,
          corruption: -4,
          align: { dogmatic: 8 }
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
        label: "[금단] 솔직히 인류제국보다 나을지도 모른다는 의구심 속에 몰래 외계 문물을 보관해 살펴본다",
        req: {
          excludeTags: [
            "astartes", "sororitas", "celestian", "canoness",
            "commissar", "lord_commissar", "commissar_general",
            "inquisitor", "lord_inquisitor", "cardinal"
          ]
        },
        effect: {
          text: "인류제국이 숨겨 온 외계 기술의 편리함에 묘한 의구심이 싹텄다. 심문소가 알면 즉시 총살감이다.",
          stats: { Int: 5 },
          faith: -14,
          corruption: 8,
          addTags: ["xenos_contact"],
          align: { humane: 5 }
        }
      }
    ],
    source: "Codex: T'au Empire / Ciaphas Cain: For the Emperor"
  },
  {
    id: "ev_absurd_xenos_weapon",
    title: "전장에 떨어진 외계인 무기의 유혹",
    category: "이단·외계",
    req: {
      minAge: 16,
      anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "underhive_ganger", "underhive_boss", "menial_worker", "inquisition_acolyte"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "commissar", "lord_commissar", "commissar_general",
        "inquisitor", "lord_inquisitor", "rogue_trader", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "general_rank", "warmaster"
      ]
    },
    reqLabel: "16세 이상 · 하급 군인·언더하이브·심문소 수습 인원",
    weight: 15,
    text: "격전이 끝난 폐허에서 아직 작동하는 정교한 외계인 에너지 카빈을 주웠다. 제식 라스건보다 세 배는 강력한 화력을 품고 있지만, 커미사르나 기계교 사제에게 들키는 순간 외계 기술 이단으로 즉결 처형당할 위험한 물건이다. 폐허의 먼지 속에서 낯선 금속 총열이 차갑게 빛난다.",
    choices: [
      {
        label: "즉시 개머리판으로 부수어 폐기하고 황제의 제식 무기만 신뢰한다",
        effect: {
          text: "외계인의 더러운 도구를 단호히 거부한 태도가 상급자의 칭찬을 샀다.",
          stats: { WP: 4, Inf: 4 },
          faith: 8,
          align: { dogmatic: 7 }
        }
      },
      {
        label: "[민첩 판정] 몰래 배낭에 숨겨 두었다가 치명적 위기 순간에 사용한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "아무도 모르게 외계 화력을 활용해 전투에서 대활약을 펼치고 전과를 가로챘다!",
          stats: { BS: 6, Inf: 5 },
          corruption: 6,
          addTags: ["xenos_contact"],
          align: { ruthless: 7 }
        },
        fail: {
          text: "소지품 검문에서 적발되어 혹독한 징계와 심문을 당하고 무기를 압수당했다.",
          wounds: -20,
          stats: { Inf: -6 },
          align: { ruthless: 4 }
        }
      }
    ],
    source: "Dark Heresy Core Rulebook / Only War Core Rulebook"
  },
  {
    id: "ev_drukhari_night_raid",
    title: "비명의 밤 — 드루카리 위치 컬트의 도심 사냥",
    category: "전투",
    req: {
      minAge: 15,
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "15세 이상 · 테라·화성·크리그·함선·야만 행성 제외 · 필멸자",
    weight: 14,
    text: "해 질 녘 구름을 찢고 열린 보랏빛 균열 너머로 칼날 달린 드루카리 리버 제트바이크와 위치 컬트 사냥꾼들이 광장으로 쏟아져 내렸다! 저들은 도시를 점령하려는 것이 아니라, 코모라 투기장의 유흥거리로 삼을 산 포로를 그물과 갈고리로 낚아채려 한다. 비명이 메아리치는 골목 위로 가시 돋친 강습정이 낮게 선회한다.",
    choices: [
      {
        label: "[사격 판정] 저공으로 급강하하는 리버 제트바이크 편대에 집중 사격을 퍼부어 시민들의 도주로를 연다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "선두 제트바이크의 추진기를 명중시켜 추락시켰다! 약탈자들이 맹렬한 반격에 전리품을 버리고 웹웨이로 철수했다.",
          stats: { BS: 6, WP: 5, Inf: 7 }
        },
        fail: {
          text: "드루카리의 스플린터 소총 독가시에 스쳐 극심한 신경 독에 시달렸다.",
          wounds: -28
        }
      },
      {
        label: "[특성 전용 · 악명 높은 냉혈한] 혼란에 빠진 외곽 구역을 미끼로 내어주고 중심 방어선의 제국 무기고를 확보한다",
        req: { allTags: ["notorious_ruthless"] },
        effect: {
          text: "냉혹한 희생 위에 방어선의 중화기를 가동해 드루카리 강습정을 격추하고 상부의 두려움 섞인 찬사를 받았다.",
          stats: { Inf: 6, Int: 3 },
          align: { ruthless: 8 }
        }
      },
      {
        label: "[민첩 판정] 사냥용 전기 그물을 피해 그림자 속 지하 벙커로 숨어들어 새벽까지 숨소리조차 죽인다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "사냥꾼들의 끔찍한 웃음소리가 멀어질 때까지 완벽히 숨어 살아남았다.",
          stats: { Ag: 5, WP: 3 }
        },
        fail: {
          text: "도주 중 폭발 파편에 크게 다쳤으나 다행히 생포만은 면했다.",
          wounds: -20
        }
      }
    ],
    source: "Codex: Drukhari / Lexicanum: Wych Cult"
  },
  {
    id: "ev_arc_xenos_contact_echo",
    title: "외계인 접촉의 여파 — 오르도 제노스의 시선과 암거래 항로",
    category: "외계",
    once: true,
    req: {
      allTags: ["xenos_contact"],
      excludeWorlds: ["terra", "mars", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "이력: 외계인 접촉 · 쿠스토데스·그레이 나이트 제외",
    weight: 34,
    text: "과거 외계 종족과 얽혔던 기억이 다시 발목을 잡았다. 변방 항구 주점에서 낯선 자유 무역상이 그대만 알아볼 수 있는 외계 문양 메달을 꺼내 보이며 금지된 암거래인 '콜드 트레이드'를 제안한다. 그와 동시에 구석 자리에서는 정통파 이단심문소 감시자의 차가운 시선이 등줄기를 훑고 지나간다.",
    choices: [
      {
        label: "[지성 판정] 과거 얻은 외계 성계도와 기술 첩보를 역으로 오르도 제노스에 전략 보고서로 바쳐 공로를 세운다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "적의 약점을 꿰뚫은 귀중한 외계 분석 자료에 심문소가 감탄했다! 과거의 의심은 씻기고 오히려 든든한 신임을 얻었다.",
          stats: { Int: 6, Inf: 7 },
          addTags: ["inquisition_favor"],
          align: { dogmatic: 7 }
        },
        fail: {
          text: "보고서의 출처를 추궁받다 구금되어 며칠간 혹독한 심문을 겪은 뒤에야 풀려났다.",
          wounds: -14,
          stats: { Inf: -6 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[교섭 판정] 감시자의 눈을 피해 아엘다리 영석과 외계 희귀 물자를 중개해 막대한 이윤을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "치명적인 위험을 뚫고 거래를 성사시켜 평생 쓸 재물과 지하 인맥을 거머쥐었다. 물론 정통파 심문관에게 들키면 즉시 처형감이다.",
          stats: { Fel: 7, Inf: 8 },
          corruption: 6,
          align: { ruthless: 10 }
        },
        fail: {
          text: "거래 현장이 아르비테스 급습을 받아 난장판이 되었다. 물건을 버리고 피투성이로 도망쳤다.",
          wounds: -16,
          stats: { Inf: -5 },
          corruption: 8,
          align: { ruthless: 7 }
        }
      },
      {
        label: "밀거래 제안을 단칼에 거절하고 남아 있던 외계 흔적을 모두 불태워 버린다",
        effect: {
          text: "미지의 유혹을 끊어 내고 인류의 길로 돌아섰다. 밤잠을 설치게 하던 불길한 감시도 차츰 잦아들었다.",
          stats: { WP: 5 },
          faith: 5,
          corruption: -5,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Lexicanum: Cold Trade"
  },
  {
    id: "ev_s5_xenos_tau_diplomat",
    title: "타우 제국 물 카스트 사절 — 대의의 달콤한 회유",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 16,
      minYear: 742,
      anySegmenta: ["ultima"],
      excludeWorlds: ["terra", "mars", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "transhuman", "custodes", "grey_knight", "living_saint", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor",
        "cardinal", "canoness", "lord_inquisitor"
      ]
    },
    reqLabel: "742.M41 이후 · 16세 이상 · 울티마 세그멘툼 · 동부 변경 교역지",
    weight: 28,
    text: "동부 변경의 중립 교역 정거장에서 푸른 피부에 정갈한 비단 예복을 걸친 타우 제국 물 카스트 사절이 그대에게 정중히 차를 권했다. 그는 제국의 끝없는 징집과 기아를 지적하며, 타우 제국의 대의 아래 합류하면 안락한 삶과 첨단 의료를 보장하겠다고 속삭인다. 차분한 미소 너머로 호위 중인 크루트 용병의 차가운 시선이 방 안을 맴돈다.",
    choices: [
      {
        label: "[의지 판정] 외계인의 감언이설을 단호히 꾸짖고 사절단의 밀수 접선 명단을 파악해 제국 정보부에 넘긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "달콤한 유혹에 흔들리지 않은 충성심과 날카로운 첩보 덕분에 변절 공작망 전체가 뿌리 뽑혔다!",
          stats: { WP: 7, Int: 5, Inf: 6 },
          faith: 8,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "사절단의 크루트 호위병들과 실랑이를 벌이며 부상을 입었으나, 제국에 대한 충성만은 지켜 냈다.",
          wounds: -14,
          stats: { WP: 4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 변절은 거절하되 물 카스트의 위생·정수 기술 정보만 교역 조건으로 교묘히 빼내 온다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "위험한 줄타기 끝에 변경 정착지 수만 명을 살릴 실용 기술을 손에 넣었다. 다만 외계인과의 접촉 기록이 남았다.",
          stats: { Fel: 7, Int: 6, Inf: 4 },
          addTags: ["xenos_contact"],
          align: { humane: 8 }
        },
        fail: {
          text: "교섭 현장이 오르도 제노스 감시망에 포착되어 한동안 엄중한 신원 조사를 받아야 했다.",
          stats: { Inf: -4, WP: 3 },
          addTags: ["xenos_contact"],
          align: { humane: 5 }
        }
      },
      {
        label: "외계인이 건넨 찻잔에 입도 대지 않은 채 침묵 속에 자리를 박차고 나온다",
        effect: {
          text: "외계인의 미소 뒤에는 언제나 지배의 사슬이 숨어 있다. 혐오와 경계심을 더욱 단단히 했다.",
          stats: { WP: 5 },
          faith: 6,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Water Caste / Codex: T'au Empire"
  },
  {
    id: "ev_s5_xenos_tau_battlesuit",
    title: "동부 변경의 푸른 섬광 — 타우 크라이시스 배틀슈트 기습전",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      minYear: 742,
      anySegmenta: ["ultima"],
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "742.M41 이후 · 18세 이상 · 울티마 세그멘툼 · 동부 변경 전선",
    weight: 28,
    text: "안개 낀 협곡 위에서 푸른 펄스 광선이 빗발처럼 쏟아졌다! 제트팩으로 절벽을 뛰어넘는 타우 제국 불 카스트의 크라이시스 배틀슈트 편대가 표적 지시 드론을 앞세워 아군 수송 종대를 완벽한 사거리 밖에서 유린하고 있다. 적의 정밀 화망이 선두 장갑차를 꿰뚫으며 협곡의 퇴로가 화염에 휩싸인다.",
    choices: [
      {
        label: "[사격 판정] 배틀슈트보다 먼저 공중에 떠 있는 마커라이트 표적 드론을 정밀 사격으로 격추해 적 화망을 눈멀게 한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "조준 연계가 끊기자 타우 기동대의 정밀 사격이 급격히 흐트러졌다! 그 틈을 타 아군 중화기 반격이 배틀슈트 두 기를 격추했다.",
          stats: { BS: 8, Int: 5, Inf: 6 }
        },
        fail: {
          text: "플라즈마 사격의 열풍에 화상을 입었으나, 드론 몇 기를 떨어뜨려 수송 차량 일부를 살려 냈다.",
          wounds: -18,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "[백병 판정] 연막탄을 터뜨리고 협곡 암벽을 타고 기어올라 타우가 가장 꺼리는 초근접 백병전으로 파고든다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "사격 교리에 의존하던 외계 조종사가 근접 돌격에 당황하며 추락했다! 제국 전사의 집념이 첨단 기계를 꺾었다.",
          stats: { WS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "배틀슈트의 점프 제트 역분사에 튕겨 나가 큰 타박상을 입었으나 적의 퇴각을 이끌어 냈다.",
          wounds: -20,
          stats: { WS: 4, T: 4 }
        }
      },
      {
        label: "무모한 추격을 접고 절벽 동굴 안으로 병력과 보급품을 신속히 분산 대피시킨다",
        effect: {
          text: "외계인의 살상 지대에 머무르지 않고 전력을 보존했다. 살아남아야 다음 반격도 있다.",
          stats: { Int: 5, Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: XV8 Crisis Battlesuit / Codex: T'au Empire"
  },
  {
    id: "ev_s5_xenos_drukhari_slavers",
    title: "칠흑의 정전 — 드루카리 카발 노예 수송선 강습",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 16,
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "16세 이상 · 제국 변경 지상 항구 · 테라·화성·크리그·함선 제외",
    weight: 28,
    alignBias: "humane",
    text: "행성 우주항의 전력망이 일순간 암전되더니, 궤도에서 강하한 칠흑의 드루카리 카발 강습정들이 정박장을 포위했다! 차가운 그림자 속에서 쇠사슬을 끌고 걸어 나온 카발 전사들이 격납고 노동자들을 통째로 노예선에 싣기 위해 학살극을 벌인다. 공포에 질린 군중 사이로 암흑 광선 포화가 탐조등을 하나씩 지워 나간다.",
    choices: [
      {
        label: "[사격 판정] 정박장 위에 정지해 포로를 싣고 있는 노예 수송정의 반중력 동력부를 집중 타격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "거대한 강습정이 불길에 휩싸여 기울어지자 사슬에 묶여 있던 수백 명의 주민이 풀려났다! 카발 약탈단은 손실이 커지자 서둘러 차원문 너머로 철수했다.",
          stats: { BS: 8, WP: 5, Inf: 7 },
          align: { humane: 8 }
        },
        fail: {
          text: "독침 스플린터 파편탄에 스쳐 극심한 고통에 시달렸으나 끝내 항구 방어선은 지켜 냈다.",
          wounds: -20,
          stats: { T: 4, WP: 4 },
          align: { humane: 5 }
        }
      },
      {
        label: "[민첩 판정] 어둠 속 기습 칼날을 피해 화물 승강기 비상 통로를 열어 노동자 수백 명을 지하 방공호로 대피시킨다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "눈 깜짝할 새에 피난민들을 두꺼운 방폭문 뒤로 대피시켰다! 코모라로 산 채로 끌려가는 지옥보다 나은 길을 열어 주었다.",
          stats: { Ag: 8, Fel: 5, Inf: 5 },
          align: { humane: 9 }
        },
        fail: {
          text: "후미를 지키다 갈고리 채찍에 깊은 상처를 입었으나, 방공호 빗장은 끝내 잠갔다.",
          wounds: -18,
          stats: { Ag: 4, WP: 4 },
          align: { humane: 6 }
        }
      },
      {
        label: "단 한 명의 생포도 허용하지 않겠다는 각오로 격납고 최후의 방어 진지에 틀어박혀 지원군이 올 때까지 버틴다",
        effect: {
          text: "코모라에 끌려가느니 싸우다 죽겠다는 냉혹한 결의가 암전 속 공포를 이겨 내게 했다.",
          stats: { WP: 6, T: 4 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Kabal / Codex: Drukhari"
  },
  {
    id: "ev_s5_xenos_drukhari_haemonculus",
    title: "뒤틀린 살점의 거래 — 드루카리 호문쿨루스 전초 기지",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 20,
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor"
      ]
    },
    reqLabel: "20세 이상 · 제국 전역 · 테라·화성·크리그·함선·야만 행성 제외",
    weight: 24,
    text: "실종자 수색 끝에 폐쇄된 지하 도축장 깊숙한 곳에서 섬뜩한 유리 배양관들과 기괴한 수술 기구가 늘어선 드루카리 호문쿨루스의 비밀 실험실을 발견했다. 뼈로 만든 가면을 쓴 외계 외과의는 황홀한 웃음을 흘리며, 아군 포로를 돌려주는 대가로 그대의 생명력이나 비밀 표본을 요구한다. 어둠 속에서 살점이 뒤틀린 그로테스크 경호 괴물들이 쇠사슬을 흔들며 길을 막아선다.",
    choices: [
      {
        label: "[의지 판정] 역겨운 외계인의 농간에 흔들리지 않고 소이탄과 화염으로 실험실 전체를 정화 소각한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불길 속에서 포로들을 구출하고 괴물 같은 외계 외과의를 퇴각시켰다! 오르도 제노스가 그대의 단호한 정화를 높이 샀다.",
          stats: { WP: 8, BS: 4, Inf: 6 },
          faith: 8,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "기괴한 육체 개조 괴물 그로테스크의 반격에 중상을 입었으나, 실험실 폭파에는 성공했다.",
          wounds: -22,
          stats: { T: 4, WP: 4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[지성 판정] 거래에 응하는 척 시선을 끌면서 외계 생체 잠금장치의 약점을 파악해 포로 감옥만 일제히 개방한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "오만한 외계 외과의의 허를 완벽히 찔렀다! 풀려난 포로들과 합세해 적의 기지를 뒤엎고 무사히 탈출했다.",
          stats: { Int: 8, Ag: 5, Inf: 6 },
          align: { humane: 8 }
        },
        fail: {
          text: "신경 마비 독가스에 중독되어 간신히 기어 나왔으나, 포로 몇 명만은 구해 냈다.",
          wounds: -18,
          stats: { Int: 4 },
          align: { humane: 5 }
        }
      },
      {
        label: "즉시 입구를 봉쇄하고 행성 궤도 사령부에 위치 좌표를 송신해 정밀 폭격으로 매장시킨다",
        effect: {
          text: "호문쿨루스와 대화를 나누는 순간 이미 진 것이다. 지반째 무너뜨려 끔찍한 흔적을 지웠다.",
          stats: { WP: 5, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Haemonculus Covens / Codex: Drukhari"
  },
  {
    id: "ev_s5_xenos_necron_awakening",
    title: "에메랄드빛 침묵 — 행성 지하에서 깨어난 네크론 툼 월드",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      minYear: 897,
      excludeWorlds: ["terra", "mars", "macragge", "ophelia7", "baal", "fenris", "nocturne", "cadia", "krieg", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "897.M41 이후 · 18세 이상 · 변경·공업 행성 지하 채굴 지대",
    weight: 28,
    text: "대규모 심층 광산의 지반이 굉음과 함께 갈라지더니, 행성 지하 전체를 감싸고 있던 거대한 고대 금속 회랑이 에메랄드빛으로 깨어났다! 지표가 흔들리는 가운데 채굴 기지의 수직 갱도를 타고 무수한 스캐럽 군체와 살아 있는 금속 해골 전사들이 떼를 지어 쏟아져 오른다. 방어선 앞 장갑차가 녹색 가우스 광선에 닿자 원자 단위로 벗겨지며 흔적도 없이 사라졌다.",
    choices: [
      {
        label: "[지성 판정] 찢어진 금속 육신이 스스로 재생하는 현상을 간파하고 지하 중앙 재구축 코어의 위상 회로를 집중 타격한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "위상 재구축 신호가 끊기자 불사신 같던 금속 전사들이 일제히 멈춰 섰다! 기계교가 그대의 전술 분석을 극찬했다.",
          stats: { Int: 8, BS: 5, Inf: 7 }
        },
        fail: {
          text: "녹색 가우스 광선에 팔을 스쳐 뼈가 드러나는 중상을 입었으나, 갱도 폭파로 각성을 늦추었다.",
          wounds: -22,
          stats: { Int: 4, T: 4 }
        }
      },
      {
        label: "[강인 판정] 전선 붕괴를 막기 위해 중화기 화망을 유지하며 채굴 기지 주민들이 탈출할 시간을 몸으로 번다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "스캐럽 떼와 가우스 포화 속에서도 한 치도 물러서지 않았다! 수송선 전원이 무사히 이륙하는 기적을 이루었다.",
          stats: { T: 8, WP: 6, Inf: 6 }
        },
        fail: {
          text: "치명적인 화상과 충격으로 쓰러졌으나, 후속 구원대가 그대를 끌어내며 방어선을 이어받았다.",
          wounds: -24,
          stats: { T: 5 }
        }
      },
      {
        label: "인류가 상대할 수 없는 고대 기계의 각성을 즉시 아스트로패스 긴급 경보로 타전하고 신속히 철수한다",
        effect: {
          text: "무모한 희생 대신 오르도 제노스와 성계 함대에 정확한 위협 등급을 알렸다.",
          stats: { Int: 5, Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: Necron Tomb World / Codex: Necrons"
  },
  {
    id: "ev_s5_xenos_necron_trazyn",
    title: "무한한 수집가의 초대장 — 은빛 외계 군주 트라진의 기묘한 거래",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 22,
      minYear: 897,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "living_saint", "dreadnought", "high_lord_terra", "met_trazyn"
      ]
    },
    reqLabel: "897.M41 이후 · 22세 이상 · 테라·화성·야만 행성 제외",
    characters: ["trazyn"],
    weight: 22,
    text: "전투가 멎은 고대 폐허 한가운데, 시간이 멈춘 듯한 테서랙트 미궁의 불빛 사이로 은빛 외계 군주 한 명이 우아하게 지팡이를 짚고 나타났다. 스스로를 '무한의 트라진'이라 밝힌 네크론 오버로드는 그대의 사소한 유품 하나를 자신의 박물관에 기증하면, 이 성계를 덮칠 치명적인 재앙의 좌표 하나를 알려 주겠다고 능글맞게 제안한다. 폐허의 먼지조차 공중에 정지한 기괴한 정적 속에 에메랄드빛 안광이 그대를 흥미롭게 훑는다.",
    choices: [
      {
        label: "[교섭 판정] 말솜씨로 트라진을 구슬려 낡은 연대 깃발 조각만 넘기고 재앙 좌표를 얻는다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "은빛 수집가가 만족스러운 기계 웃음을 흘리며 성계 지하의 진스틸러 소굴 좌표를 남기고 사라졌다! 덕분에 행성이 구원받았으나 기묘한 거래의 빚이 남았다.",
          stats: { Fel: 8, Int: 6, Inf: 6 },
          addTags: ["xenos_contact", "met_trazyn", "solemnace_debt"]
        },
        fail: {
          text: "트라진이 흥미를 잃고 정지장 구체로 위협하는 통에 혼비백산하여 겨우 도망쳤다.",
          wounds: -14,
          stats: { Ag: 4, WP: 3 },
          addTags: ["met_trazyn"]
        }
      },
      {
        label: "[의지 판정] 외계인의 조롱과 거래를 일축하고 즉시 화기를 겨누어 제국 신민의 기개를 보인다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "트라진은 '인류 특유의 고집도 참 흥미롭군'이라며 감탄하더니 공격하지 않고 녹색 섬광 속으로 물러났다.",
          stats: { WP: 8, Inf: 5 },
          faith: 8,
          addTags: ["met_trazyn"]
        },
        fail: {
          text: "네크론 호위병의 충격파에 날아가 부상을 입었으나, 끝내 외계인의 수집품이 되지는 않았다.",
          wounds: -18,
          stats: { WP: 5 },
          addTags: ["met_trazyn"]
        }
      },
      {
        label: "절대 시선을 마주치지 않고 뒷걸음질로 폐허를 빠져나가 기이한 만남을 가슴속에 묻어 둔다",
        effect: {
          text: "수천만 년을 살아온 수집가와 엮여 좋을 일은 없다. 무사히 살아 돌아온 것만으로 천운이다.",
          stats: { WP: 5, Ag: 4 },
          addTags: ["met_trazyn"]
        }
      }
    ],
    source: "Lexicanum: Trazyn the Infinite / The Infinite and the Divine"
  },
  {
    id: "ev_s5_xenos_aeldari_farseer",
    title: "크래프트월드 파시어의 수수께끼 — 피할 수 없는 운명의 갈림길",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "mars", "krieg", "voidborn"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "18세 이상 · 제국 전역 · 테라·화성·크리그·함선·야만 행성 제외",
    weight: 26,
    text: "안개 속에서 정교한 레이스본 갑주를 걸친 아엘다리 크래프트월드 파시어와 호위대가 홀연히 나타났다. 오만한 외계 예언자는 공명하는 목소리로 '인류여, 오늘 밤 동쪽 발전소를 멈추지 않으면 열흘 뒤 악마가 이 성계를 삼킬 것이다'라는 난해한 경고를 던지고는 침묵한다. 호위 전사들의 수리검 화기가 미세한 광채를 띤 채 그대의 다음 움직임을 주시하고 있다.",
    choices: [
      {
        label: "[지성 판정] 아엘다리의 속셈을 그대로 믿지 않고 동쪽 발전소 지하의 실제 워프 수치와 배관을 정밀 조사한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "과연 발전소 지하에 카오스 교단의 소환진이 숨겨져 있었다! 아엘다리의 의도는 불명하나 어쨌든 대참사를 미연에 막아 냈다.",
          stats: { Int: 8, WP: 5, Inf: 6 },
          addTags: ["xenos_contact"],
          align: { humane: 6 }
        },
        fail: {
          text: "조사 도중 아엘다리 측의 진짜 목표였던 고대 영혼석만 빼앗긴 채 헛탕을 쳤다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 외계인의 거짓 예언 따위는 들을 가치도 없다며 즉각 경보를 울리고 사격을 개시한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "아엘다리 척후대를 격퇴하고 외계인의 접근을 원천 봉쇄했다! 제국 지휘부가 그대의 확고한 배타 정신을 칭찬했다.",
          stats: { BS: 7, WP: 5, Inf: 6 },
          faith: 6,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "인간의 눈으로 쫓기 힘든 아엘다리의 기동과 수리검 사격에 상처를 입고 놓치고 말았다.",
          wounds: -18,
          stats: { BS: 3, Ag: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "정면 충돌을 피한 채 발전소 경비만 은밀히 두 배로 증강하고 상황을 지켜본다",
        effect: {
          text: "외계인을 믿지도, 무모하게 싸우지도 않은 신중함 덕분에 양쪽의 함정을 모두 비껴갔다.",
          stats: { WP: 5, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Farseer / Codex: Craftworlds"
  },
  {
    id: "ev_s5_xenos_votann_prospect",
    title: "보탄 연맹 자원 탐사대 — 킨 무장 상단과의 위험한 교섭",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      minYear: 999,
      excludeWorlds: ["terra", "mars", "krieg"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord"
      ]
    },
    reqLabel: "999.M41 이후 · 18세 이상 · 은하 핵 인접 변경 · 소행성대",
    weight: 26,
    text: "성계 외곽 소행성 채굴 기지에 땅딸막하고 중무장한 이방인들의 묵직한 탐사 함선이 접안했다. 제국 기록에서 '스쿼트' 혹은 '데미우르그'라 혼칭되는, 스스로를 '킨'이라 부르는 보탄 연맹의 자원 탐사대다. 그들은 제국법 따위는 안중에도 없지만, 공정한 거래와 희귀 광물 교환만큼은 철저히 지킨다고 제안한다.",
    choices: [
      {
        label: "[교섭 판정] 무력 충돌 대신 엄격한 물물교환 계약을 맺어 제국 기술로도 얻기 힘든 고강도 합금과 정밀 장비를 확보한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "킨 상단장이 껄껄 웃으며 약속 이상의 고품질 장비를 건넸다! 성계 방어군의 무장이 눈에 띄게 강화되었다.",
          stats: { Fel: 7, Inf: 7, Int: 4 }
        },
        fail: {
          text: "까다로운 보탄 연맹의 원가 계산에 말려 손해 보는 거래를 맺고 말았다.",
          stats: { Inf: -3, Int: 3 }
        }
      },
      {
        label: "[지성 판정] 킨 탐사대가 사용하는 고대 암흑기 계통 기계 장비를 유심히 관찰해 정비와 공학의 통찰을 얻는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "제국 기계교와는 전혀 다른 실용 공학의 정수를 눈여겨보아 기술적 안목이 크게 트였다!",
          stats: { Int: 8, WP: 4 }
        },
        fail: {
          text: "기술을 엿본다는 의심을 사 킨 전사들의 볼카이트 총구 앞에서 경고 사격을 피하며 서둘러 물러나야 했다.",
          wounds: -10,
          stats: { Inf: -3, Int: 2 }
        }
      },
      {
        label: "비인가 세력과의 사적 교역을 거절하고 행성 영공에서 즉각 퇴거하라는 공식 경고만 전달한다",
        effect: {
          text: "킨 탐사대는 어깨를 으쓱하고는 군말 없이 소행성대 너머로 함선을 돌렸다. 제국법의 원칙을 지켰다.",
          stats: { WP: 5, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Leagues of Votann / Codex: Leagues of Votann"
  }
];
