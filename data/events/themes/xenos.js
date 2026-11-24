// 분기 사건 — 외계(Xenos) 종족 조우 · 교전 · 교섭 (오크 · 타이라니드 · 타우 · 드루카리 · 네크론 · 아엘다리 · 보탄 연맹)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
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
    id: "ev_s5_xenos_tau_diplomat",
    title: "타우 제국 물 카스트 사절 — '대의(Greater Good)'의 달콤한 회유",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 16,
      anySegmenta: ["ultima"],
      excludeTags: ["astartes", "custodes", "grey_knight"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "세그멘툼 울티마 · 동부 변경 교역지",
    weight: 28,
    text: "동부 변경의 중립 교역 정거장에서 푸른 피부에 정갈한 비단 예복을 걸친 타우 제국 물 카스트 사절이 그대에게 정중히 차를 권했다. 그는 제국의 끝없는 징집과 기아를 지적하며, 타우 제국의 '대의(Greater Good)' 아래 합류하면 가족의 안전과 첨단 의료를 보장하겠다고 속삭인다.",
    choices: [
      {
        label: "[의지 판정] 외계인의 감언이설을 단호히 꾸짖고 사절단의 밀수 접선 명단을 파악해 제국 정보부에 넘긴다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "달콤한 유혹에 흔들리지 않은 충성심과 날카로운 첩보 덕분에 변절 공작망 전체가 뿌리 뽑혔다!",
          stats: { WP: 7, Int: 5, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "사절단의 크루트 호위병들과 실랑이를 벌이며 부상을 입었으나, 제국에 대한 충성만은 지켜 냈다.",
          wounds: -14,
          stats: { WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 변절은 거절하되 물 카스트의 위생·정수 기술 정보만 교역 조건으로 교묘히 빼내 온다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "위험한 줄타기 끝에 변경 정착지 수만 명을 살릴 실용 기술을 손에 넣었다. 다만 외계인과의 접촉 기록이 남았다.",
          stats: { Fel: 7, Int: 6, Inf: 4 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "교섭 현장이 오르도 제노스 감시망에 포착되어 한동안 엄중한 신원 조사를 받아야 했다.",
          stats: { Inf: -4, WP: 3 },
          addTags: ["xenos_contact"]
        }
      },
      {
        label: "외계인이 건넨 찻잔에 입도 대지 않은 채 침묵 속에 자리를 박차고 나온다",
        effect: {
          text: "외계인의 미소 뒤에는 언제나 지배의 사슬이 숨어 있다. 혐오와 경계심을 더욱 단단히 했다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Water Caste / Gue'vesa / Codex: T'au Empire"
  },
  {
    id: "ev_s5_xenos_tau_battlesuit",
    title: "동부 변경의 푸른 섬광 — 타우 크라이시스 배틀슈트 기습전",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      anySegmenta: ["ultima"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "세그멘툼 울티마 · 동부 변경 전선",
    weight: 28,
    text: "안개 낀 협곡 위에서 푸른 펄스 광선이 빗발처럼 쏟아졌다! 제트팩으로 절벽을 뛰어넘는 타우 제국 불 카스트의 크라이시스 배틀슈트 편대가 표적 지시 드론을 앞세워 아군 수송 종대를 완벽한 사거리 밖에서 유린하고 있다.",
    choices: [
      {
        label: "[사격 판정] 배틀슈트보다 먼저 공중에 떠 있는 마커라이트 표적 드론을 정밀 사격으로 격추해 적 화망을 눈멀게 한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "조준 연계가 끊기자 타우 기동대의 정밀 사격이 급격히 흐트러졌다! 그 틈을 타 아군 중화기 반격이 배틀슈트 두 기를 격추했다.",
          stats: { BS: 8, Int: 5, Inf: 6 }
        },
        fail: {
          text: "플라스마 사격의 열풍에 화상을 입었으나, 드론 몇 기를 떨어뜨려 수송 차량 일부를 살려 냈다.",
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
    source: "Lexicanum: XV8 Crisis Battlesuit / Damocles Gulf Lore"
  },
  {
    id: "ev_s5_xenos_drukhari_slavers",
    title: "어둠 속의 비명 — 드루카리 코모라 노예 습격선",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 16,
      excludeWorlds: ["terra", "mars"],
      excludeTags: ["custodes"]
    },
    reqLabel: "제국 변경 · 밤의 외계 습격",
    weight: 28,
    text: "행성의 전력망이 일순간 먹통이 되더니, 찢어진 웹웨이 차원문 너머로 가시 돋친 칠흑의 함정들이 미끄러져 내려왔다. 드루카리(다크 엘다) 카발 약탈단이다! 그들은 행성을 정복할 생각 따위는 없다. 오직 산 채로 주민들을 사슬에 묶어 코모라의 고문장으로 끌고 가려는 것이다.",
    choices: [
      {
        label: "[사격 판정] 저공 비행하는 레이더 강습정의 반중력 엔진을 집중 사격해 노예 포획선을 격추한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "약탈선이 불길에 휩싸여 추락하자 갇혀 있던 수백 명의 주민이 풀려났다! 드루카리들은 손실이 커지자 서둘러 차원문 너머로 철수했다.",
          stats: { BS: 8, WP: 5, Inf: 7 }
        },
        fail: {
          text: "독침 파편탄(스플린터)에 스쳐 극심한 고통에 시달렸으나 끝내 구역 방어선은 지켜 냈다.",
          wounds: -20,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[민첩 판정] 어둠 속 기습 칼날을 피해 지하 방공호 통로를 열어 주민 수백 명을 재빨리 피신시킨다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "눈 깜짝할 새에 피난민들을 철문 뒤로 대피시켰다! 산 채로 끌려가는 지옥보다 나은 길을 열어 주었다.",
          stats: { Ag: 8, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "후미를 지키다 갈고리 채찍에 깊은 상처를 입었으나, 방공호 빗장은 끝내 잠갔다.",
          wounds: -18,
          stats: { Ag: 4, WP: 4 }
        }
      },
      {
        label: "단 한 명의 생포도 허용하지 않겠다는 각오로 최후의 방어 진지에 틀어박혀 새벽까지 버틴다",
        effect: {
          text: "코모라에 끌려가느니 싸우다 죽겠다는 냉혹한 결의가 어둠 속 공포를 이겨 내게 했다.",
          stats: { WP: 6, T: 4 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Drukhari / Commorragh Realspace Raid"
  },
  {
    id: "ev_s5_xenos_drukhari_haemonculus",
    title: "뒤틀린 살점의 거래 — 드루카리 호문쿨루스 전초 기지",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 20,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "20세 이상 · 제국 전역 (테라·화성·야만 제외)",
    weight: 24,
    text: "실종자 수색 끝에 폐쇄된 지하 도축장 깊숙한 곳에서 섬뜩한 유리 배양관들과 기괴한 수술 기구가 늘어선 드루카리 호문쿨루스의 비밀 실험실을 발견했다. 뼈로 만든 가면을 쓴 외계 외과의는 황홀한 웃음을 흘리며, 아군 포로를 돌려주는 대가로 그대의 생명력이나 비밀 표본을 요구한다.",
    choices: [
      {
        label: "[의지 판정] 역겨운 외계인의 농간에 흔들리지 않고 소이탄과 화염으로 실험실 전체를 정화 소각한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불길 속에서 포로들을 구출하고 괴물 같은 외계 외과의를 퇴각시켰다! 오르도 제노스가 그대의 단호한 정화를 높이 샀다.",
          stats: { WP: 8, BS: 4, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "기괴한 육체 개조 괴물 그로테스크의 반격에 중상을 입었으나, 실험실 폭파에는 성공했다.",
          wounds: -22,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 거래에 응하는 척 시선을 끌면서 외계 생체 잠금장치의 약점을 파악해 포로 감옥만 일제히 개방한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "오만한 외계 외과의의 허를 완벽히 찔렀다! 풀려난 포로들과 합세해 적의 기지를 뒤엎고 무사히 탈출했다.",
          stats: { Int: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "신경 마비 독가스에 중독되어 간신히 기어 나왔으나, 포로 몇 명만은 구해 냈다.",
          wounds: -18,
          stats: { Int: 4 }
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
      excludeWorlds: ["terra", "mars"]
    },
    reqLabel: "18세 이상 · 행성 지하 유적 지대",
    weight: 28,
    text: "광산 발파 작업 도중 수천만 년 동안 잠들어 있던 검은 석재 피라미드가 드러났다. 이내 대지가 에메랄드빛 녹색 섬광으로 물들더니, 말 한마디 없는 살아 있는 금속 해골 전사들이 완벽한 대열을 이루어 걸어 나온다. 가우스 광선이 닿은 장갑차는 원자 단위로 벗겨지며 사라졌다.",
    choices: [
      {
        label: "[지성 판정] 찢어진 금속 육신이 스스로 재생하는 현상을 간파하고 지하 중앙 동력탑(모놀리스)의 위상 회로를 집중 타격한다",
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
          text: "스카라브 떼와 가우스 포화 속에서도 한 치도 물러서지 않았다! 수송선 전원이 무사히 이륙하는 기적을 이루었다.",
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
      excludeWorlds: ["terra"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "22세 이상 · 고대 유물·전장 지대",
    weight: 22,
    text: "전투가 멎은 고대 폐허 한가운데, 시간이 멈춘 듯한 테서랙트 미궁의 불빛 사이로 은빛 외계 군주 한 명이 우아하게 지팡이를 짚고 나타났다. 스스로를 '무한한 자 트라진(Trazyn the Infinite)'이라 밝힌 네크론 오버로드는 그대의 사소한 유품 하나를 자신의 박물관에 기증하면, 이 성계를 덮칠 치명적인 재앙의 좌표 하나를 알려 주겠다고 흥미롭게 제안한다.",
    choices: [
      {
        label: "[교섭 판정] 박물관 전시품으로 갇히지 않도록 교묘한 말솜씨로 낡은 제국 연대 깃발 조각만 건네고 핵심 정보를 챙긴다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "은빛 수집가가 만족스러운 기계 웃음을 흘리며 성계 지하의 진스틸러 소굴 좌표를 남기고 사라졌다! 덕분에 행성이 구원받았다.",
          stats: { Fel: 8, Int: 6, Inf: 6 },
          addTags: ["xenos_contact"]
        },
        fail: {
          text: "트라진이 흥미를 잃고 정지장 구체로 위협하는 통에 혼비백산하여 겨우 도망쳤다.",
          wounds: -14,
          stats: { Ag: 4, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 외계인의 조롱과 거래를 일축하고 즉시 화기를 겨누어 제국 신민의 기개를 보인다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "트라진은 '인류 특유의 고집도 참 흥미롭군'이라며 감탄하더니 공격하지 않고 녹색 섬광 속으로 물러났다.",
          stats: { WP: 8, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "네크론 호위병의 충격파에 날아가 부상을 입었으나, 끝내 외계인의 수집품이 되지는 않았다.",
          wounds: -18,
          stats: { WP: 5 }
        }
      },
      {
        label: "절대 시선을 마주치지 않고 뒷걸음질로 폐허를 빠져나가 기이한 만남을 가슴속에 묻어 둔다",
        effect: {
          text: "수천만 년을 살아온 수집가와 엮여 좋을 일은 없다. 무사히 살아 돌아온 것만으로 천운이다.",
          stats: { WP: 5, Ag: 4 }
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
      excludeWorlds: ["terra", "mars"]
    },
    reqLabel: "18세 이상 · 제국 전역 (테라·화성 제외)",
    weight: 26,
    text: "안개 속에서 정교한 레이스본(Wraithbone) 갑주를 걸친 아엘다리 크래프트월드 파시어와 호위대가 홀연히 나타났다. 오만한 외계 예언자는 공명하는 목소리로 '인류여, 오늘 밤 동쪽 발전소를 멈추지 않으면 열흘 뒤 악마가 이 성계를 삼킬 것이다'라는 난해한 경고를 던지고는 침묵한다.",
    choices: [
      {
        label: "[지성 판정] 아엘다리의 속셈을 그대로 믿지 않고 동쪽 발전소 지하의 실제 워프 수치와 배관을 정밀 조사한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "과연 발전소 지하에 카오스 교단의 소환진이 숨겨져 있었다! 아엘다리의 의도는 불명하나 어쨌든 대참사를 미연에 막아 냈다.",
          stats: { Int: 8, WP: 5, Inf: 6 },
          addTags: ["xenos_contact"]
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
          faith: 6
        },
        fail: {
          text: "인간의 눈으로 쫓기 힘든 아엘다리의 기동과 수리검 사격에 상처를 입고 놓치고 말았다.",
          wounds: -18,
          stats: { BS: 3, Ag: 3 }
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
    source: "Lexicanum: Farseer / Craftworld Aeldari Lore"
  },
  {
    id: "ev_s5_xenos_votann_prospect",
    title: "보탄 연맹 자원 탐사대 — 킨(Kin) 무장 상단과의 위험한 교섭",
    category: "외계 조우",
    once: true,
    req: {
      minAge: 18,
      excludeWorlds: ["terra", "krieg"],
      excludeWorldTags: ["feral"]
    },
    reqLabel: "18세 이상 · 은하 핵 인접 변경 · 소행성대",
    weight: 26,
    text: "성계 외곽 소행성 채굴 기지에 땅딸막하고 중무장한 이방인들의 묵직한 탐사 함선이 접안했다. 제국 기록에서 '스쿼트' 혹은 '보탄 연맹의 킨(Kin)'이라 불리는 독자 세력의 자원 탐사대다. 그들은 제국법 따위는 안중에도 없지만, 공정한 거래와 희귀 광물 교환만큼은 철저히 지킨다고 제안한다.",
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
          text: "기술을 엿본다는 의심을 사 킨 전사들의 볼카이트 총구 앞에서 서둘러 물러나야 했다.",
          stats: { Ag: 3, Int: 3 }
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
);
