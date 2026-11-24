// 분기 사건 — 직군 계열: 카오스 2트랙(필멸 컬트 · 배신자 아스타르테스) · 데몬 프린스 승천 (14단계)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_s14_ch_cult_uprising",
    title: "카오스 컬티스트 — 하이브 발전소 봉기 전야와 암흑의 징표",
    category: "카오스 교단",
    once: true,
    req: {
      anyCareers: ["chaos_cultist"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 카오스 컬티스트",
    weight: 36,
    text: "하층 하이브의 녹슨 배수관 아래, 수백 개의 밀랍 초가 팔각별의 제단을 붉게 비추고 있다. 구역 전역에 숨어 있던 일곱 개 지하 교단 세포가 마침내 하이브 주 발전소를 점거할 봉기 전야에 집결했다. 아르비테스 진압대의 철화망이 사방에서 조여 오는 가운데, 광신도들은 검은 제단 앞에서 어느 암흑 권능의 징표를 높이 들 것인지 그대의 선언을 기다린다. 이 밤의 피와 속삭임이 곧 행성 전체를 집어삼킬 반란의 신호탄이 될 것이다.",
    choices: [
      {
        label: "[백병 판정] 피의 제단에 쇠망치를 내리찍어 코른의 징표를 선포하고 무장 돌격대를 이끌어 발전소 정문을 돌파한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "끓어오르는 분노 속에 발전소 철문이 뜯겨 나갔다! 놋쇠빛 코른의 낙인이 피부 아래 새겨지며 무장 교단원들이 광기 어린 함성으로 그대를 따랐다.",
          stats: { WS: 7, T: 5, Inf: 6 },
          faith: -10,
          corruption: 9,
          addTags: ["mark_khorne", "wanted_by_inquisition"]
        },
        fail: {
          text: "아르비테스 진압대의 산탄 세례에 깊은 상처를 입었으나, 피의 신에게 바친 투지가 헛되지 않아 발전소 외곽을 점거하고 낙인을 얻었다.",
          wounds: -18,
          stats: { WS: 4 },
          corruption: 8,
          addTags: ["mark_khorne"]
        }
      },
      {
        label: "[지성 판정] 발전소 전력망과 복스 통신에 젠취의 아홉 갈래 암호를 심어 방위군이 서로를 쏘도록 공작한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "조명이 일제히 꺼지고 거짓 경보가 울리자 수비대가 자중지란에 빠졌다! 푸른 불꽃과 함께 젠취의 낙인이 눈동자에 새겨지며 발전소가 손에 들어왔다.",
          stats: { Int: 7, WP: 5, Inf: 6 },
          faith: -10,
          corruption: 9,
          addTags: ["mark_tzeentch", "wanted_by_inquisition"]
        },
        fail: {
          text: "암호 역류로 단말기가 폭발해 화상을 입었으나, 혼란 틈에 세포들을 침투시키고 변화의 군주가 내린 낙인을 받아들였다.",
          wounds: -14,
          stats: { Int: 4 },
          corruption: 8,
          addTags: ["mark_tzeentch"]
        }
      },
      {
        label: "[강인 판정] 냉각수 배관에 너글의 부패 포자를 풀어 수비대의 호흡기를 마비시키고 역병의 깃발을 올린다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "녹빛 안개가 터빈실로 번지자 방위군 병사들이 기침 속에 쓰러졌다! 고통을 지우는 너글의 낙인이 육신에 스며들며 발전소가 교단의 요새가 되었다.",
          stats: { T: 8, WP: 4, Inf: 5 },
          wounds: 12,
          faith: -10,
          corruption: 9,
          addTags: ["mark_nurgle", "wanted_by_inquisition"]
        },
        fail: {
          text: "독기가 역류해 피부가 짓물렀으나 이상하리만치 통증이 멎었다. 부패의 군주가 내린 낙인과 함께 발전소 하층을 장악했다.",
          wounds: -12,
          stats: { T: 5 },
          corruption: 8,
          addTags: ["mark_nurgle"]
        }
      },
      {
        label: "[교섭 판정] 슬라네쉬의 황홀한 선동과 금지된 향료로 구역 감독관과 경비병의 이성을 녹여 문을 열게 한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "달콤한 속삭임과 현악 선율에 취한 경비대장이 스스로 보안 격벽을 열었다! 슬라네쉬의 낙인이 감각을 벼려 주며 피 한 방울 없이 제어실을 장악했다.",
          stats: { Fel: 7, Ag: 5, Inf: 6 },
          faith: -10,
          corruption: 9,
          addTags: ["mark_slaanesh", "wanted_by_inquisition"]
        },
        fail: {
          text: "경비병 일부가 정신을 차려 난투가 벌어졌으나, 감각을 찌르는 도취 속에서 끝내 제어실을 확보하고 슬라네쉬의 낙인을 얻었다.",
          wounds: -16,
          stats: { Fel: 4 },
          corruption: 8,
          addTags: ["mark_slaanesh"]
        }
      },
      {
        label: "어느 한 신에게도 종속되지 않고 팔각별의 이름으로 교단 세포들을 분산 침투시켜 안전하게 발전소를 마비시킨다",
        effect: {
          text: "단일 권능의 변덕에 영혼을 저당 잡히지 않은 채 칠흑의 정전을 일으켰다. 하층 하이브 전역에 그대의 이단 세포망이 뿌리를 내렸다.",
          stats: { Int: 5, Fel: 4, Inf: 6 },
          corruption: 6,
          addTags: ["wanted_by_inquisition"]
        }
      }
    ],
    source: "Dark Heresy: Disciples of the Dark Gods / Black Crusade Core"
  },
  {
    id: "ev_s14_ch_champion_warband",
    title: "카오스 챔피언 — 하수구의 촛불에서 수천 워밴드의 군주로",
    category: "카오스 대비",
    once: true,
    req: {
      anyCareers: ["chaos_champion"],
      anyPastCareers: ["chaos_cultist"],
      allTags: ["chaos_champion"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 카오스 챔피언 · 경력: 카오스 컬티스트",
    weight: 38,
    text: "한때는 아르비테스의 군화 소리에 숨을 죽이며 하수구 구석에서 밀랍 초를 켜던 말단 컬티스트였다. 그러나 이제 그대의 발아래에는 변절한 방위군 연대와 광신도 수천 명으로 이루어진 거대한 필멸자 워밴드가 무릎을 꿇고 있다. 바로 그때, 낡은 사제복을 찢어 두른 경쟁 설교자가 '저 자는 여전히 쥐새끼처럼 숨어 살던 하층 신도에 불과하다'며 군중 앞에서 그대의 지휘권에 도전장을 던졌다. 피와 공포로 세운 암흑의 왕좌를 증명할 차례다.",
    choices: [
      {
        label: "[백병 판정] 수천 신도가 지켜보는 제단 위로 경쟁 설교자를 끌어올려 단칼에 목을 베고 워밴드의 공포를 각인한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "검은 제단 위로 피가 흩뿌려지자 수천 명의 변절 병사와 광신도가 일제히 무기를 치켜들며 그대의 칭호를 연호했다! 더 이상 하수구의 그림자는 남아 있지 않다.",
          stats: { WS: 7, Inf: 9, WP: 4 },
          corruption: 8
        },
        fail: {
          text: "경쟁 설교자가 숨겨 둔 독 단검에 옆구리를 베였으나, 끝내 상대의 목을 꺾어 쓰러뜨리며 피로 물든 권좌를 지켜 냈다.",
          wounds: -20,
          stats: { WS: 4, Inf: 4 },
          corruption: 6
        }
      },
      {
        label: "[교섭 판정] 한낱 지하 세포에서 시작해 제국 수비대를 무너뜨린 자신의 전설을 포효하며 경쟁자의 추종자들까지 단숨에 흡수한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "천둥 같은 웅변이 광장을 집어삼키자 경쟁자의 호위병들마저 창끝을 돌려 옛 주인을 결박했다! 워밴드 전체가 완벽한 광신으로 결속되었다.",
          stats: { Fel: 8, Inf: 10, WP: 5 },
          corruption: 6
        },
        fail: {
          text: "양측 추종자들 사이에 유혈 충돌이 벌어져 적지 않은 피해를 입었으나, 결국 그대의 이름이 광장을 제압했다.",
          wounds: -14,
          stats: { Fel: 4, Inf: 4 },
          corruption: 6
        }
      },
      {
        label: "[사이커 전용 · 의지 판정] 워프의 불길로 경쟁자의 성대를 태워 침묵시키고 암흑 신의 대행자임을 현현한다",
        req: { allTags: ["psyker"] },
        check: { stat: "WP", diff: 0 },
        success: {
          text: "손끝에서 뻗어 나온 보랏빛 번개가 설교자의 입을 봉하자, 군중 전체가 공포와 경외 속에 이마를 땅에 찧었다!",
          stats: { WP: 8, Inf: 10, Int: 4 },
          corruption: 9
        },
        fail: {
          text: "워프 반동으로 코피를 흘리며 잠시 휘청였으나, 불타오른 설교자의 비명 덕분에 군중의 복종만은 확실히 거머쥐었다.",
          wounds: -16,
          stats: { WP: 4 },
          corruption: 8
        }
      },
      {
        label: "경쟁자의 목숨을 당장 거두는 대신 가장 치명적인 제국 요새 돌격의 선봉장으로 몰아넣어 피로 충성을 증명하게 한다",
        effect: {
          text: "이겨도 그대의 공이고 죽어도 정적이 사라지는 냉혹한 계책이었다. 사흘 뒤 요새 외벽이 무너진 자리에는 그대의 깃발만이 남았다.",
          stats: { Int: 6, Inf: 7, Fel: 4 },
          corruption: 5
        }
      }
    ],
    source: "Lexicanum: Champion of Chaos / Black Crusade Core"
  },
  {
    id: "ev_s14_ch_fallen_lord",
    title: "타락한 제국의 기둥 — 한때 황제의 이름으로 다스리던 성채의 화염",
    category: "카오스 대비",
    once: true,
    req: {
      anyCareers: ["chaos_champion"],
      anyPastCareers: [
        "planetary_governor",
        "militarum_general",
        "inquisitor",
        "ecclesiarchy_cardinal",
        "admin_departmento_head",
        "rogue_trader"
      ],
      allTags: ["chaos_champion"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 카오스 챔피언 · 전직 제국 고위 통치자/장성/심문관/추기경",
    weight: 40,
    text: "붉은 연기가 치솟는 성채 너머로 한때 그대가 서명하고 축복했던 제국의 쌍두 독수리 깃발이 불길에 휩싸여 무너져 내린다. 불과 몇 해 전만 해도 황제의 이름으로 행성과 군대, 교구와 함대를 호령하던 제국 고위층이었으나, 이제 그대는 암흑의 군기 아래 옛 부하들의 성채를 포위하고 있다. 항복을 거부한 수비대 지휘관이 복스 통신 너머로 떨리는 목소리를 보낸다. '각하, 어찌하여 스스로 세우신 맹세와 제국을 불태우십니까!'",
    choices: [
      {
        label: "[지성 판정] 과거 직접 설계했던 방어선과 보급로의 사각을 정확히 찔러 단 하루 만에 성채를 무너뜨린다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "성채의 비밀 수로와 예비 발전소 위치를 꿰뚫고 있던 그대의 지휘 앞에 방어선은 종잇장처럼 무너졌다! 옛 권좌의 무기고가 통째로 암흑 워밴드의 것이 되었다.",
          stats: { Int: 8, Inf: 10, WP: 5 },
          corruption: 7,
          addTags: ["wanted_by_inquisition"]
        },
        fail: {
          text: "옛 부하들이 그대의 전술을 예측하고 지하 통로에 매복 폭탄을 심어 두어 큰 타격을 입었으나, 결국 성채를 점령했다.",
          wounds: -18,
          stats: { Int: 4, Inf: 5 },
          corruption: 6
        }
      },
      {
        label: "[교섭 판정] 옛 부하들의 이름과 테라가 저지른 냉혹한 착취를 조목조목 읊으며 성문을 열고 암흑의 깃발 아래 합류하라 회유한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "한때 존경하던 상관의 위엄 어린 목소리에 흔들린 수비대 중대 절반이 스스로 성문을 열었다! 제국의 정예 병력이 그대로 그대의 변절 군단으로 편입되었다.",
          stats: { Fel: 9, Inf: 10, WP: 4 },
          corruption: 8,
          addTags: ["wanted_by_inquisition"]
        },
        fail: {
          text: "충성파 커미사르가 즉시 통신망을 끊고 수비대를 독려해 치열한 시가전을 치러야 했다.",
          wounds: -16,
          stats: { Fel: 4, Inf: 4 },
          corruption: 6
        }
      },
      {
        label: "[권위 판정] 복스 채널을 끊고 중포병대에 전면 소이 포격을 명해 과거의 명예와 감상을 성채와 함께 재로 묻어 버린다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "한 치의 망설임도 없는 명령에 성채 첨탑이 화염 기둥 속으로 붕괴했다! 워밴드 전사들은 과거마저 불태우는 군주의 냉혹함에 전율했다.",
          stats: { Inf: 9, WP: 7, WS: 4 },
          corruption: 9,
          addTags: ["wanted_by_inquisition"]
        },
        fail: {
          text: "수비대의 최후 대포병 사격이 지휘소 인근에 떨어져 파편상을 입었으나, 끝내 성채의 깃발을 끌어내렸다.",
          wounds: -18,
          stats: { WP: 5, Inf: 4 },
          corruption: 7
        }
      },
      {
        label: "옛 부하들에게 마지막 침묵의 경의를 남기고, 탈취한 제국 암호 장부와 군수 창고만 챙겨 다음 성계로 진군한다",
        effect: {
          text: "불타는 성채를 등지고 함선에 올랐다. 한때 제국을 떠받치던 기둥은 이제 그 내부 구조를 가장 잘 아는 치명적인 칼날이 되었다.",
          stats: { WP: 6, Int: 5, Inf: 7 },
          corruption: 5
        }
      }
    ],
    source: "Lexicanum: Siege of Vraks / Badab War / Black Crusade"
  },
  {
    id: "ev_s14_ch_csm_long_war",
    title: "배신자 아스타르테스 — 긁어 낸 순결의 인장과 옛 형제들과의 강습전",
    category: "배신자 군단",
    once: true,
    req: {
      anyCareers: ["renegade_marine"],
      anyPastCareers: [
        "astartes_brother",
        "astartes_sergeant",
        "astartes_veteran",
        "astartes_captain"
      ],
      allTags: ["renegade_marine"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 배신자 아스타르테스 · 전직 제국 스페이스 마린",
    weight: 40,
    text: "어깨갑주에 새겨졌던 옛 챕터의 문장과 순결의 인장은 이미 사슬칼로 거칠게 긁어 낸 지 오래다. 강습정 발톱이 제국 타격 순양함의 외벽을 찢고 승선하자, 자욱한 연기 너머로 익숙한 도색의 파워 아머를 두른 옛 전투 형제들이 볼터를 겨눈 채 통로를 가로막는다. 한때 등을 맞대고 외계인과 싸웠던 형제가 복스 확성기를 통해 분노 어린 목소리로 그대의 옛 이름을 외친다. 장구한 전쟁의 피비린내 속에서 과거의 형제애는 이제 베어 넘겨야 할 족쇄에 불과하다.",
    choices: [
      {
        label: "[백병 판정] 옛 챕터의 검술 습관과 빈틈을 꿰뚫어 보고 체인액스로 옛 형제의 파워 소드를 부러뜨리며 함교로 돌파한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "수십 년간 함께 수련했던 검법의 사각을 정확히 베어 넘겼다! 옛 형제의 투구가 갑판에 구르는 순간, 워밴드의 전사들이 포효하며 순양함 함교를 점령했다.",
          stats: { WS: 9, T: 5, Inf: 8 },
          corruption: 8,
          addTags: ["wanted_by_inquisition"]
        },
        fail: {
          text: "옛 형제의 맹렬한 반격에 흉갑이 깊이 찢어지는 중상을 입었으나, 분노와 워프의 힘으로 끝내 포위망을 뚫고 퇴로를 열었다.",
          wounds: -24,
          stats: { WS: 5, T: 4 },
          corruption: 6
        }
      },
      {
        label: "[사격 판정] 순양함 내부 격벽 구조와 무기고 배치를 기억해 둔 채 치명적인 볼터 교차 사격으로 충성파 방어선을 붕괴시킨다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "어느 격벽이 얇고 어느 감압 밸브가 약한지 그대만큼 잘 아는 자는 없었다! 정밀한 사격으로 충성파 분대를 고립시키고 군수품과 볼터를 대거 노획했다.",
          stats: { BS: 8, Int: 6, Inf: 7 },
          corruption: 7
        },
        fail: {
          text: "충성파 형제들이 비상 화망을 펼쳐 어깨 장갑이 꿰뚫렸으나, 무기고 일부를 폭파하며 전세를 뒤집는 데 성공했다.",
          wounds: -20,
          stats: { BS: 4, Int: 3 },
          corruption: 6
        }
      },
      {
        label: "[교섭 판정] 챕터 전용 암호 주파수로 옛 형제들에게 하이 로드의 배신과 거짓 황제의 사슬을 폭로하며 동참을 유혹한다",
        check: { stat: "Fel", diff: -10 },
        success: {
          text: "오랜 원정과 테라의 냉대에 지쳐 있던 젊은 배틀 브라더 셋이 총구를 내리고 순결의 인장을 찢어 던졌다! 값진 배신자 동지를 얻었다.",
          stats: { Fel: 8, WP: 6, Inf: 9 },
          corruption: 8
        },
        fail: {
          text: "'배신자의 혀를 뽑아라!' 옛 형제들의 분노가 오히려 배가되어 맹렬한 볼터 세례를 받으며 후퇴해야 했다.",
          wounds: -22,
          stats: { WP: 4 },
          corruption: 7
        }
      },
      {
        label: "옛 형제들과의 정면 혈전을 피해 약탈조와 함께 진시드 보관고와 무기고만 탈취한 뒤 강습정으로 신속히 이탈한다",
        effect: {
          text: "감정에 휘둘려 목숨을 걸 이유는 없다. 순양함에서 빼앗은 순수 진시드와 유물 갑주만으로도 배신자 워밴드의 전력은 크게 불어났다.",
          stats: { Int: 6, Ag: 5, Inf: 7 },
          wounds: -10,
          corruption: 5
        }
      }
    ],
    source: "Lexicanum: Renegade Space Marines / Codex: Chaos Space Marines"
  },
  {
    id: "ev_s14_ch_csm_daemon_engine",
    title: "다크 메카니쿰 헤레텍 마고스 — 사슬에 묶인 데몬 엔진의 거래",
    category: "배신자 군단",
    once: true,
    req: {
      anyCareers: ["renegade_marine", "chaos_lord"],
      allTags: ["renegade_marine"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 배신자 아스타르테스 · 카오스 로드",
    weight: 36,
    text: "유황 연기가 자욱한 지옥 대장간 한가운데, 놋쇠 갑각과 생체 근육이 뒤엉킨 거대한 헬드레이크와 마울러핀드가 쇠사슬을 물어뜯으며 포효한다. 강철 촉수를 늘어뜨린 다크 메카니쿰 헤레텍 마고스가 쇳소리 섞인 이진법 음성으로 거래를 제안한다. 다음 제국 포지 월드 약탈전에서 노획할 고대 진시드와 정지장 코어 절반을 넘긴다면, 악마를 용광로에 봉인한 이 데몬 엔진을 그대의 워밴드 선봉에 배속하겠다는 것이다. 통제에 실패하면 아군 갑판마저 찢어발길 괴물이지만, 길들이기만 한다면 요새 성벽을 단숨에 부술 절대 병기가 된다.",
    choices: [
      {
        label: "[의지 판정] 용광로 앞으로 걸어 들어가 데몬 엔진 내부에 깃든 워프 악마의 의지를 초인의 기백으로 직접 굴복시킨다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "헬드레이크의 불타는 눈동자가 그대의 시선 앞에 고개를 숙였다! 악마 병기가 완벽히 길들여지자 헤레텍 마고스마저 경외 속에 거래 조건을 낮추었다.",
          stats: { WP: 8, WS: 6, Inf: 9 },
          corruption: 9
        },
        fail: {
          text: "마울러핀드가 내뿜은 워프 화염에 파워 아머가 검게 그을리고 중상을 입었으나, 결국 강철 고삐를 틀어쥐었다.",
          wounds: -24,
          stats: { WP: 4, T: 4 },
          corruption: 8
        }
      },
      {
        label: "[지성 판정] 헤레텍 마고스의 영혼 봉인 회로에 숨겨 둔 원격 제어 장치를 간파하고 역으로 유리한 무기 공급 계약을 끌어낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "다크 메카니쿰의 얄팍한 배신 회로를 단숨에 지적하자 헤레텍 마고스의 메카덴드라이트가 움찔 굳었다! 데몬 엔진과 포병 탄약을 헐값에 확보했다.",
          stats: { Int: 8, BS: 5, Inf: 8 },
          corruption: 7
        },
        fail: {
          text: "봉인 회로를 강제로 해체하려다 워프 방전이 터져 화상을 입었으나, 최소한의 전투 통제권은 확보했다.",
          wounds: -18,
          stats: { Int: 4 },
          corruption: 7
        }
      },
      {
        label: "[코른의 낙인 전용] 피의 신의 이름으로 마울러핀드의 사슬을 끊어 제국 요새 정면으로 곧장 투하한다",
        req: { allTags: ["mark_khorne"] },
        effect: {
          text: "해방된 강철 야수가 핏빛 포효를 지르며 제국 요새 성문을 통째로 뜯어냈다! 피와 쇳덩이의 축제가 워밴드의 사기를 정점으로 끌어올렸다.",
          stats: { WS: 8, T: 6, Inf: 7 },
          corruption: 8
        }
      },
      {
        label: "위험한 악마 병기에 함선을 맡기는 대신 헤레텍 마고스에게서 타락 볼터 탄약과 파워 아머 보수 부품만 실속 있게 거래한다",
        effect: {
          text: "통제 불능의 괴물보다 믿을 수 있는 강철과 탄약이 장구한 전쟁에서 오래 살아남는 법이다. 워밴드의 무장이 완벽히 정비되었다.",
          stats: { T: 5, BS: 5, Inf: 5 },
          wounds: 10,
          corruption: 4
        }
      }
    ],
    source: "Lexicanum: Daemon Engine / Dark Mechanicum / Codex: Chaos Space Marines"
  },
  {
    id: "ev_s14_ch_lord_black_crusade",
    title: "카오스 로드 — 공포의 눈 출정 함대와 블랙 리전의 약탈 협상",
    category: "배신자 군단",
    once: true,
    req: {
      anyCareers: ["chaos_lord"],
      allTags: ["chaos_lord"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 카오스 로드",
    weight: 38,
    text: "공포의 눈 가장자리, 보랏빛 워프 폭풍을 등진 채 수백 척의 배신자 전함이 검은 성전을 앞두고 집결했다. 황금 테두리의 검은 갑주를 두른 블랙 리전의 사절이 워마스터 약탈자 아바돈의 인장을 내밀며 그대의 기함 함교로 걸어 들어온다. 사절은 그대의 워밴드가 제국 성계 방어망의 최선봉을 뚫어 주면 정복한 하이브 월드의 노예와 무기고 절반을 할양하겠다고 제안하지만, 그 오만한 눈빛 뒤에는 소모품 취급의 계산이 번득인다. 배신자 군단 사이에서 약자의 몫은 오직 강자의 발밑에 짓밟힐 뿐이다.",
    choices: [
      {
        label: "[권위 판정] 워밴드의 전투 기록과 함대 화력을 과시하며 최선봉 투입 조건으로 제국 궤도 조선소 독점 약탈권을 당당히 관철한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "블랙 리전 사절이 마침내 고개를 숙이며 궤도 조선소 독점 약탈 조항에 서명했다! 출정 함대 전역에 그대의 워밴드 위명이 울려 퍼졌다.",
          stats: { Inf: 10, Fel: 6, BS: 5 },
          corruption: 7,
          addTags: ["wanted_by_inquisition"]
        },
        fail: {
          text: "사절이 워마스터의 이름을 앞세워 강경하게 맞서며 교섭이 험악해졌고, 소규모 함선 충돌까지 빚어진 뒤에야 원안에 합의했다.",
          stats: { Inf: -4, WP: 4 },
          wounds: -16,
          corruption: 6
        }
      },
      {
        label: "[백병 판정] 오만한 블랙 리전 사절의 호위 터미네이터를 함교 한복판에서 일격에 무릎 꿇려 대등한 동맹의 위엄을 각인한다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "파워 액스 일격에 호위 터미네이터의 방패가 두 동강 나자 함교가 침묵에 잠겼다! 사절은 태도를 완전히 바꾸어 최고 대우의 전리품 배분을 약속했다.",
          stats: { WS: 9, Inf: 10, T: 5 },
          corruption: 8
        },
        fail: {
          text: "블랙 리전 베테랑 터미네이터의 맹렬한 반격에 깊은 상처를 입었으나, 끝내 물러서지 않은 기백으로 무리한 요구를 꺾었다.",
          wounds: -24,
          stats: { WS: 5, T: 4 },
          corruption: 7
        }
      },
      {
        label: "[지성 판정] 블랙 리전의 진격 축선 뒤에 숨겨진 진정한 목표 성계를 간파하고, 사절보다 먼저 알짜배기 성지 행성을 선점한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "함대 배치도만 보고도 진짜 보물이 숨겨진 성지 행성을 꿰뚫어 보았다! 블랙 리전이 방어 함대를 묶어 둔 사이 성물고와 보급선을 통째로 휩쓸었다.",
          stats: { Int: 9, Inf: 9, Ag: 4 },
          corruption: 7
        },
        fail: {
          text: "제국 순찰 함대의 매복에 걸려 함체 손상과 부상을 입었으나, 상당한 전리품을 챙겨 귀환하는 데는 성공했다.",
          wounds: -18,
          stats: { Int: 4 },
          corruption: 6
        }
      },
      {
        label: "워마스터의 대군에 정면으로 맞서는 대신 표면상 협약에 서명하고, 전황이 혼란해진 틈을 타 전리품만 챙겨 독자 기동한다",
        effect: {
          text: "장구한 전쟁에서 살아남는 군주는 거인의 싸움에 휘말리지 않는다. 적당히 출정 함대의 위세를 빌린 뒤 실속 있는 약탈물만 챙겼다.",
          stats: { Int: 5, Fel: 5, Inf: 7 },
          corruption: 5
        }
      }
    ],
    source: "Lexicanum: Black Crusade / Black Legion / Codex: Chaos Space Marines"
  },
  {
    id: "ev_s14_ch_lord_duel",
    title: "카오스 로드 — 피의 투기장, 야심 찬 아스파이어링 챔피언의 결투",
    category: "카오스 대비",
    once: true,
    req: {
      anyCareers: ["chaos_lord"],
      anyPastCareers: ["renegade_marine"],
      allTags: ["chaos_lord"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 카오스 로드 · 경력: 배신자 아스타르테스",
    weight: 38,
    text: "한낱 배신자 아스타르테스 전사로 출발해 수많은 선임의 투구를 쪼개고 마침내 워밴드의 절대 군주가 되었건만, 암흑의 권좌에는 잠시도 안식이 없다. 붉은 증기가 피어오르는 기함 투기장 한복판에서, 그대가 직접 길러 낸 젊은 아스파이어링 챔피언이 사슬도끼를 바닥에 내리찍으며 피의 결투를 청했다. 수백 명의 배신자 마린들이 갑주를 두드리며 환호하는 가운데, 도전자의 눈빛에는 과거 그대 자신이 옛 수장을 쓰러뜨리던 날의 똑같은 야망이 타오른다.",
    choices: [
      {
        label: "[백병 판정] 어떠한 속임수도 없이 데몬 웨폰을 뽑아 들고 정면 일기토로 도전자의 야망을 산산조각 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "불꽃 튀는 검격 끝에 도전자의 사슬도끼가 두 동강 나고 투구가 갈라졌다! 압도적인 무위 앞에 워밴드 전원이 다시 한번 절대 복종을 맹세했다.",
          stats: { WS: 9, T: 6, Inf: 10 },
          corruption: 8
        },
        fail: {
          text: "젊은 챔피언의 필사적인 돌격에 어깨와 옆구리에 중상을 입었으나, 노련한 마무기로 기어이 승리를 거머쥐었다.",
          wounds: -26,
          stats: { WS: 5, T: 5 },
          corruption: 7
        }
      },
      {
        label: "[의지 판정] 도전자의 목숨을 끊는 대신 무기를 꺾어 무릎 꿇린 뒤, 공포와 위엄으로 자신의 최강 직속 부관으로 길들인다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "칼끝을 목전에 대고도 죽이지 않는 여유와 압도적 기백 앞에 도전자가 완전히 굴복했다! 반란의 싹을 가장 충직한 사냥개로 바꾸어 놓았다.",
          stats: { WP: 8, Fel: 7, Inf: 10 },
          corruption: 6
        },
        fail: {
          text: "자비를 보인 찰나 도전자가 최후 발악을 감행해 상처를 입었으나, 곧장 처결하며 권위를 회복했다.",
          wounds: -22,
          stats: { WP: 5, Inf: 4 },
          corruption: 6
        }
      },
      {
        label: "[사격 판정] 도전자가 허세 어린 도전사를 읊는 찰나, 플라즈마 피스톨을 뽑아 투구 정중앙을 꿰뚫으며 장구한 전쟁의 냉혹함을 가르친다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "푸른 플라즈마 섬광과 함께 도전자가 말도 끝맺지 못하고 쓰러졌다! '명예는 죽은 자들이나 찾는 것이다.' 투기장에 서늘한 침묵과 복종이 깔렸다.",
          stats: { BS: 8, Int: 5, Inf: 8 },
          corruption: 7
        },
        fail: {
          text: "플라즈마 피스톨이 과열되어 장갑에 화상을 입고 도전자의 반격까지 허용했으나, 결국 결투를 승리로 마무리했다.",
          wounds: -18,
          stats: { BS: 4, Inf: 4 },
          corruption: 6
        }
      },
      {
        label: "친위 터미네이터 분대에 결투장 외곽을 봉쇄시킨 뒤 도전자의 파벌까지 함께 숙청하여 워밴드의 철권 지배를 굳힌다",
        effect: {
          text: "군주의 자리는 공정한 결투가 아니라 힘과 통제로 지키는 것이다. 반역 파벌의 피로 함교를 씻어 내며 지배력을 공고히 했다.",
          stats: { Inf: 8, WP: 5, Int: 4 },
          wounds: -8,
          corruption: 6
        }
      }
    ],
    source: "Lexicanum: Aspiring Champion / Chaos Lord / Codex: Chaos Space Marines"
  },
  {
    id: "ev_s14_ch_dp_warp_realm",
    title: "데몬 프린스 — 워프 심연에 빚어 올린 불멸의 악마 영토",
    category: "악마 승천",
    once: true,
    req: {
      anyCareers: ["daemon_prince"],
      allTags: ["daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 데몬 프린스",
    weight: 38,
    text: "필멸자의 수명과 물리 법칙은 이미 발아래 짓밟은 지 오래다. 공포의 눈과 마엘스트롬 너머 소용돌이치는 에테르의 바다 위에서, 그대의 사념 하나가 산맥을 뒤틀고 흑요석 첨탑과 피의 강을 빚어 자신만의 악마 행성, 곧 데몬 월드를 세우고 있다. 수호 신의 시선이 워프의 하늘에서 내려다보는 가운데, 물질 우주 경계 너머 제국 성계들의 약한 장막이 종잇장처럼 얇아진 틈새가 눈에 들어온다. 불멸의 군주로서 영원을 새길 영토의 법칙을 선포할 시각이다.",
    choices: [
      {
        label: "[의지 판정] 워프 해류 전체를 의지로 굴복시켜 데몬 월드의 흑요석 성채를 완성하고 인접 제국 성계에 영구적 워프 폭풍을 연다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "하늘이 보랏빛으로 갈라지며 불멸의 흑요석 성채가 워프 심연에 우뚝 솟았다! 물질 우주의 세 개 제국 행성이 그대의 폭풍 아래 영원히 고립되었다.",
          stats: { WP: 9, Inf: 12, T: 6 },
          wounds: 25,
          corruption: 12
        },
        fail: {
          text: "변덕스러운 워프 해류가 성채 첨탑 일부를 집어삼키며 영적 반동을 남겼으나, 이내 군주의 권능으로 영토의 경계를 바로 세웠다.",
          wounds: -18,
          stats: { WP: 5, Inf: 6 },
          corruption: 10
        }
      },
      {
        label: "[백병 판정] 그대의 새 영토를 넘보며 경계로 기어들어 온 경쟁 악마 군주의 군단을 직접 도륙해 해골과 영혼으로 성벽을 쌓는다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "경쟁자의 악마 군단이 그대의 거대한 발톱과 검 아래 에테르 불꽃으로 흩어졌다! 패배한 군주의 진명을 영토의 주춧돌에 새겨 불멸의 권위를 증명했다.",
          stats: { WS: 9, T: 8, Inf: 10 },
          corruption: 12
        },
        fail: {
          text: "악마 군단 간의 처절한 혈전 끝에 현신 육신에 깊은 균열이 갔으나, 끝내 침입자들을 심연 바깥으로 추방했다.",
          wounds: -20,
          stats: { WS: 5, T: 5 },
          corruption: 10
        }
      },
      {
        label: "[지성 판정] 데몬 월드의 시간을 뒤틀어 물질 우주의 수십 년이 이곳에서는 하룻밤처럼 흐르게 조율하고 불경한 성전 함대를 주조한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시간마저 그대의 법령에 굴복했다! 필멸자 워밴드들과 다크 메카니쿰 장인들이 시간의 틈새에서 거대한 침공 함대를 완성해 바쳤다.",
          stats: { Int: 9, Inf: 10, WP: 6 },
          corruption: 12
        },
        fail: {
          text: "시간 왜곡이 잠시 어긋나 영토 외곽이 뒤틀렸으나, 냉철한 조율 끝에 침공 발판을 온전히 굳혔다.",
          wounds: -14,
          stats: { Int: 5, Inf: 5 },
          corruption: 10
        }
      },
      {
        label: "수호 암흑 신의 찬가를 워프 전역에 울려 퍼뜨리며 필멸자 워밴드들이 순례할 불멸의 암흑 옥좌를 선포한다",
        effect: {
          text: "수많은 배신자 군단과 이단 교단이 그대의 진명을 부르며 흑요석 영토로 모여들었다. 불멸의 영역이 워프 지도에 영원히 각인되었다.",
          stats: { Inf: 10, WP: 6, T: 5 },
          wounds: 20,
          corruption: 10
        }
      }
    ],
    source: "Lexicanum: Daemon World / Daemon Prince / Codex: Chaos Daemons"
  },
  {
    id: "ev_s14_ch_dp_summon",
    title: "데몬 프린스 — 천 명의 제물과 진명의 소환, 은빛 사냥꾼의 강습",
    category: "악마 승천",
    once: true,
    req: {
      anyCareers: ["daemon_prince"],
      allTags: ["daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 데몬 프린스",
    weight: 38,
    text: "수천 광년 떨어진 제국 하이브 월드의 지하 대성당에서 천 명의 산 제물이 바쳐지며, 그대의 진명을 부르는 피의 합창이 워프의 장막을 찢었다. 거대한 날개와 뿔을 드리운 불멸의 현신이 물질 우주로 강림하자 대성당의 석주가 산산이 무너지고 제국 수비대는 비명조차 지르지 못한 채 무릎을 꿇는다. 바로 그 순간, 천장 너머에서 눈부신 은빛 텔레포트 섬광이 터지며 네메시스 포스 할버드를 비껴 든 제666챕터 그레이 나이트 정예 타격대가 추방 의식을 외치며 쇄도해 들어온다. 필멸자 제국이 보낸 가장 날카로운 은빛 칼날 앞에서 불멸 군주의 위엄을 보여 줄 때다.",
    choices: [
      {
        label: "[백병 판정] 워프 불꽃이 감긴 악마 검을 휘둘러 그레이 나이트 정예대의 텔레포트 진형을 정면으로 분쇄하고 은빛 갑주를 짓밟는다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "은빛 터미네이터 갑주가 지옥의 일격 아래 찢어지며 성당 바닥에 나뒹굴었다! 제666챕터의 정예마저 꺾어 버린 공포가 성계 전체의 아스트로패스들을 발광하게 만들었다.",
          stats: { WS: 10, T: 7, Inf: 12 },
          corruption: 12
        },
        fail: {
          text: "축성된 네메시스 칼날이 불멸의 육신에 타는 듯한 상처를 새겼으나, 압도적인 괴력으로 은빛 사냥꾼들을 밀어내고 대성당을 장악했다.",
          wounds: -28,
          stats: { WS: 5, T: 5 },
          corruption: 10
        }
      },
      {
        label: "[의지 판정] 그레이 나이트들이 외치는 666 추방 성가를 압도적인 워프 포효로 덮어 누르고 대성당의 신도 수만 명을 악마 군세의 통로로 바꾼다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "추방 의식의 성가가 불멸 군주의 진명 포효에 산산조각 났다! 열린 차원문으로 하위 악마 군세가 쏟아져 나오며 하이브 전체가 지옥의 영토로 전복되었다.",
          stats: { WP: 10, Inf: 12, Int: 6 },
          corruption: 12
        },
        fail: {
          text: "사이킥 추방 파동이 현신의 결속을 크게 흔들었으나, 막대한 영혼 제물을 삼키며 끝내 물질 우주에 발을 붙였다.",
          wounds: -24,
          stats: { WP: 6, Inf: 6 },
          corruption: 10
        }
      },
      {
        label: "[지성 판정] 그레이 나이트와의 소모전 대신 대성당 지하의 플라즈마 반응로를 워프 번개로 연쇄 폭파해 하이브 전체를 악마의 제물로 삼킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "지하 반응로가 붉은 태양처럼 터져 오르며 그레이 나이트 타격대와 하이브 첨탑이 한꺼번에 붕괴했다! 수백만 영혼의 절규가 워프의 공물로 바쳐졌다.",
          stats: { Int: 9, BS: 6, Inf: 11 },
          corruption: 12
        },
        fail: {
          text: "폭발 여파가 현신의 외피까지 휩쓸어 상처를 남겼으나, 은빛 사냥꾼들의 추방 의식만큼은 완벽히 좌절시켰다.",
          wounds: -20,
          stats: { Int: 5, Inf: 5 },
          corruption: 10
        }
      },
      {
        label: "은빛 사냥꾼들에게 파괴된 대성당과 광기의 잔해를 남겨 둔 채, 탈취한 영혼의 제물만 거두어 당당히 워프 영토로 귀환한다",
        effect: {
          text: "불멸의 군주에게 물질 우주의 성패는 영원한 게임의 한 수일 뿐이다. 수확한 영혼의 힘을 품고 여유롭게 워프의 옥좌로 돌아갔다.",
          stats: { Inf: 9, WP: 6, T: 5 },
          wounds: 15,
          corruption: 10
        }
      }
    ],
    source: "Lexicanum: Daemon Prince / Codex: Grey Knights / Codex: Chaos Daemons"
  },
  {
    id: "ev_s14_ch_dp_mortal_echo",
    title: "데몬 프린스 — 옛 필멸의 검과 마지막 인간성의 소각",
    category: "악마 승천",
    once: true,
    req: {
      anyCareers: ["daemon_prince"],
      anyPastCareers: ["chaos_champion", "chaos_lord"],
      allTags: ["daemon_prince"],
      excludeTags: ["custodes", "grey_knight"]
    },
    reqLabel: "직군: 데몬 프린스 · 경력: 카오스 챔피언/카오스 로드",
    weight: 40,
    text: "워프의 뒤틀린 시간을 건너 물질 우주의 정복 행성 폐허에 내려서자, 무너진 암흑 신전 한가운데서 아득한 과거 필멸의 챔피언 혹은 배신자 군주 시절에 직접 휘두르던 낡은 검과 찢어진 군기를 마주했다. 그 시절에는 뼈가 부러지고 피가 식을까 경계하며 권좌를 지키려 싸웠건만, 이제 그 무기들은 불멸의 발톱 아래 놓인 보잘것없는 장난감처럼 작아 보인다. 신전 주위에 모인 후대의 카오스 전사들이 그대의 옛 이름을 신화처럼 읊조리며 엎드린 가운데, 기억의 저편에서 희미하게 남아 있던 인간 시절의 마지막 잔향이 스쳐 지나간다.",
    choices: [
      {
        label: "[카오스 로드 경력 전용 · 백병 판정] 배신자 군단 시절의 차가운 전술 지성만은 영원히 벼려 내고, 옛 파워 소드를 녹여 데몬 웨폰의 새로운 룬으로 봉인한다",
        req: { anyPastCareers: ["chaos_lord"] },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "장구한 전쟁을 함께했던 옛 검신이 워프 불꽃 속에 녹아들어 불멸의 악마 검과 하나가 되었다! 초인 군주의 무위와 악마의 권능이 완벽히 융합했다.",
          stats: { WS: 9, Int: 8, Inf: 12 },
          corruption: 12
        },
        fail: {
          text: "옛 검에 깃든 피의 원념이 거칠게 저항하며 상처를 남겼으나, 불멸의 힘으로 끝내 칼날을 굴복시켜 새로운 룬을 새겼다.",
          wounds: -14,
          stats: { WS: 5, Int: 5 },
          corruption: 10
        }
      },
      {
        label: "[카오스 챔피언 경력 전용 · 교섭 판정] 한낱 필멸자에서 불멸로 오른 증표인 옛 단검과 군기를 엎드린 워밴드 수장에게 하사해 새 암흑 성전을 명한다",
        req: { anyPastCareers: ["chaos_champion"] },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "필멸의 껍데기를 깨고 신격에 오른 전설의 유물을 받아 든 워밴드 수장이 광희 속에 피의 맹세를 올렸다! 수십 개 교단이 그대의 진명 아래 새로운 성전을 선포했다.",
          stats: { Fel: 9, Inf: 12, WP: 6 },
          corruption: 12
        },
        fail: {
          text: "유물의 권능을 감당하지 못한 수장이 카오스 스폰으로 폭주해 달려들었으나, 일격에 소각한 뒤 공포에 질린 워밴드 전원의 복종을 받아 냈다.",
          wounds: -12,
          stats: { Fel: 5, Inf: 6 },
          corruption: 10
        }
      },
      {
        label: "[의지 판정] 워프의 불길로 옛 신전과 낡은 검을 흔적도 없이 태워 버리고 필멸의 기억 마지막 한 점까지 완전한 불멸의 권능으로 승화시킨다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "보랏빛 화염이 과거의 모든 흔적을 삼키며 필멸의 미련이 영원히 소멸했다! 한층 순수하고 장엄한 불멸의 존재로 거듭났다.",
          stats: { WP: 10, T: 7, Inf: 12 },
          wounds: 20,
          corruption: 14
        },
        fail: {
          text: "불타는 신전의 잔향 속에서 옛 기억의 파편이 잠시 정신을 찔렀으나, 이내 냉혹한 웃음과 함께 재로 밟아 끄며 권능을 다잡았다.",
          wounds: -16,
          stats: { WP: 6, Inf: 6 },
          corruption: 10
        }
      },
      {
        label: "말없이 옛 군기를 발밑에 짓밟고 날개를 펼쳐 궤도의 워프 균열로 비상하며 영원한 전쟁의 다음 별을 향해 나아간다",
        effect: {
          text: "과거의 이름은 필멸자들의 제단에나 남겨 두라. 불멸의 군주는 오직 영원한 파괴와 정복의 미래만을 내려다볼 뿐이다.",
          stats: { WP: 7, WS: 6, Inf: 9 },
          wounds: 15,
          corruption: 10
        }
      }
    ],
    source: "Lexicanum: Daemon Prince / Black Crusade: Tome of Fate"
  }
);
