// 분기 사건 — 화이트 스카 전용 (1:1 단독 승격)
export default [
  {
    id: "ev_chap_white_scars",
    title: "화이트 스카 — 폭풍의 바이크 돌격과 스톰시어의 시문",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["white_scars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 화이트 스카",
    weight: 34,
    text: "끝없이 펼쳐진 잿빛 평원 너머로 오크 스피드 프릭 대부대가 먼지 구름을 일으키며 몰려온다. 아군 요새에 갇혀 방어하는 것은 초고리스의 전사에게 죽음보다 못하다. 폭풍은 기다리는 것이 아니라 먼저 몰아치는 법이다!",
    choices: [
      {
        label: "[민첩 판정] 스페이스 마린 전투 바이크의 가속기를 끝까지 당겨 적 측면을 번개처럼 베고 지나간다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "'칸과 황제를 위하여!' 시속 200킬로미터의 기동 사격과 파워 란스 일격이 오크 버기 대열을 잿더미로 만들었다. 바람 속에서 터져 나온 웃음소리가 평원을 울렸다!",
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
        label: "[의지 판정] 스톰시어와 함께 출정 전야의 시문과 서예 의식으로 형제들의 기세를 다스린다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "붓끝에서 흘러나온 고요한 절제가 다음 날 전장의 광풍을 완벽히 통제했다. 자가타이 칸이 사랑한 문무겸비의 경지였다.",
          stats: { WP: 6, Fel: 6, Int: 4 }
        },
        fail: {
          text: "전투를 향한 조급함을 다스리지 못해 붓을 부러뜨리고 말았고, 스톰시어로부터 평정심을 더 닦으라는 꾸지람을 들었다.",
          stats: { Fel: -2, WP: -2 }
        }
      }
    ],
    source: "Lexicanum: White Scars / Codex Supplement: White Scars"
  },
  {
    id: "ev_chap2_white_scars",
    title: "화이트 스카 — 초고리스 콴 저우의 매 사냥 의식",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["white_scars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 화이트 스카",
    weight: 28,
    text: "구름 위의 요새 수도원 '콴 저우' 첨탑 아래 광활한 초고리스 초원이 펼쳐져 있다. 스톰시어가 그대에게 사나운 초원 검독수리 버크트를 건네며 말한다. '묶어 두면 매는 날개를 잃고, 놓아주면 바람을 타고 돌아온다. 칸의 아들들이 싸우는 이치도 이와 같느니라.'",
    choices: [
      {
        label: "[민첩 판정] 바이크를 몰아 초원을 질주하며 하늘의 사냥매와 호흡을 맞춰 거대 야수를 추적한다",
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
    source: "Lexicanum: Quan Zhou / Codex Supplement: White Scars"
  },
  {
    id: "ev_s4_tag_khan_rider",
    title: "칸의 기수 — 모래 폭풍을 가르는 기갑 섬멸전",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["khan_rider"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 화이트 스카 칸의 기수",
    weight: 38,
    text: "광활한 평원에 거대한 모래 폭풍이 몰아치며 시야가 완전히 닫혔다. 다른 제국 부대들이 진격을 멈추고 참호에 숨어든 사이, 칸의 기수로 인정받은 그대는 폭풍을 방패 삼아 적 중기갑 사단의 측면을 베어 낼 절호의 기회를 포착했다.",
    choices: [
      {
        label: "[민첩 판정] 스페이스 마린 전투 바이크의 엔진을 한계까지 끌어올려 폭풍 한가운데로 고속 돌파한다",
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
    source: "Lexicanum: White Scars / Codex Supplement: White Scars"
  },
  {
    id: "ev_s16_ch2_ws_1",
    title: "화이트 스카 — 초고리스 번개 폭풍 속 고속 바이크 편대 기동전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["white_scars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 화이트 스카",
    weight: 32,
    text: "초고리스의 광활한 대초원 위로 하늘을 찢는 번개 폭풍과 폭우가 몰아친다. 낙뢰가 초원의 바위를 내리치고 빗물이 협곡을 집어삼키는 격렬한 악천후 속에서, 고속 바이크 편대가 전속력으로 질주하며 궤도 침투 외계 정찰대를 추격하는 고속 기동전이 벌어졌다. 속도를 늦추는 자는 폭풍에게도, 사냥감에게도 뒤처진다.",
    choices: [
      {
        label: "[민첩 판정] 낙뢰가 떨어지는 진흙 협곡을 향해 바이크 가속기를 끝까지 감고 선두에서 적 정찰 편대를 추월한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "번개보다 빠른 흰 갑주의 질주가 적 편대의 퇴로를 단숨에 잘라 냈다! 폭우 속에서 터져 나온 호탕한 웃음소리와 함께 초고리스의 바람이 승리를 알렸다.",
          stats: { Ag: 8, WS: 6, Inf: 6 },
          addTags: ["khan_rider"]
        },
        fail: {
          text: "물웅덩이 아래 숨은 바위에 바퀴가 걸려 바이크가 허공으로 튕겨 나갔고, 진흙 벌판을 굴러 큰 부상을 입었다.",
          wounds: -20,
          stats: { Ag: 3, T: 2 }
        }
      },
      {
        label: "[사격 판정] 빗줄기와 번개 섬광 사이로 드러난 적 고속정 엔진을 질주 중 연사 사격으로 정확히 꿰뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "거친 진동 속에서도 볼터 탄환이 빗나가지 않았다! 선두 고속정이 불꽃을 뿜으며 뒤집히자 뒤따르던 적 편대가 도미노처럼 무너졌다.",
          stats: { BS: 7, Ag: 5, Int: 4 }
        },
        fail: {
          text: "번개 섬광에 시야가 잠시 멀어지며 탄도가 빗나갔고, 적의 반격 플라즈마 탄이 어깨 장갑을 스쳐 화상을 입었다.",
          wounds: -16,
          stats: { BS: -2, T: 2 }
        }
      },
      {
        label: "[백병 판정] 고속 전투 바이크의 중량을 실어 체인소드와 파워 랜스로 적 지휘 차량의 측면을 단칼에 가른다",
        req: { anyTags: ["primaris", "khan_rider"] },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "천둥 같은 엔진 포효와 함께 강철 칼날이 적 지휘 차량을 두 동강 냈다! 편대 형제들이 일제히 창을 치켜들며 그대를 초원의 폭풍으로 찬양했다.",
          stats: { WS: 8, Ag: 7, Inf: 7 }
        },
        fail: {
          text: "적 차량 폭발 파편을 미처 피하지 못해 갑주 가슴판이 깊게 찢어졌으나 끝내 안장에서 떨어지지 않았다.",
          wounds: -18,
          stats: { T: 3 }
        }
      },
      {
        label: "능선 위 고지대를 따라 우회 기동하며 번개 폭풍 너머로 달아나는 적의 도주 경로를 편대에 실시간 중계한다",
        effect: {
          text: "초원의 매처럼 전장을 넓게 훑어 사냥감의 도주로를 완벽히 봉쇄했다. 본대 바이크 편대가 손쉽게 적을 포위 섬멸했다.",
          stats: { Ag: 5, Int: 5, BS: 3 }
        }
      }
    ],
    source: "Lexicanum: Chogoris / Codex Supplement: White Scars"
  },
  {
    id: "ev_s16_ch2_ws_2",
    title: "화이트 스카 — 스톰시어의 천둥 의식과 시문 서예 수련",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["white_scars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 화이트 스카",
    weight: 30,
    text: "세상은 화이트 스카를 거친 야만 전사로만 오해하지만, 자가타이 칸의 아들들은 피비린내 나는 전투가 끝나면 갑주를 벗고 바람 부는 정자에서 붓을 들어 시를 쓰고 바둑과 서예로 마음을 닦는다. 성채 마당에서 스톰시어가 번개의 힘을 불러들이되 절대 탐욕스럽게 삼키지 말라는 천둥 의식을 거행한 뒤, 그대에게 묵직한 붓과 흰 비단 두루마리를 건넸다.",
    choices: [
      {
        label: "[의지 판정] 스톰시어의 천둥 의식에 동참해 폭풍의 격정을 받아들이면서도 절제의 경계를 지켜 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "가슴을 울리는 천둥 기운 속에서도 자가타이 칸이 가르친 절도의 미덕을 잃지 않았다! 워프의 유혹을 물리치는 청명한 정신력이 완성되었다.",
          stats: { WP: 8, Int: 5, Inf: 5 },
          faith: 8,
          corruption: -10
        },
        fail: {
          text: "휘몰아치는 천둥 기운을 다스리지 못해 기력이 흩어졌고, 스톰시어의 엄중한 경고를 들으며 한동안 명상실에 머물러야 했다.",
          wounds: -12,
          stats: { WP: -2, Fel: -2 }
        }
      },
      {
        label: "[지성 판정] 전투의 광풍과 초원의 고요를 한 폭의 서예와 시문에 담아내며 문무겸비의 경지를 수련한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "거침없는 필치 속에 고아한 기품이 깃들었다! 붓을 놓는 순간 다음 전투의 기동 흐름까지 한눈에 그려지는 맑은 통찰을 얻었다.",
          stats: { Int: 7, Fel: 6, WP: 5 }
        },
        fail: {
          text: "전장의 흥분이 아직 가라앉지 않아 먹물이 번지고 비단을 찢어 버렸으며, 조급함을 꾸짖는 선배들의 웃음을 샀다.",
          stats: { Fel: -3, Int: -1 }
        }
      },
      {
        label: "[의지 판정] 폭풍의 길 교리에 따라 초고리스의 바람을 직접 부르는 의식을 주재하며 형제들의 영혼을 축복한다",
        req: { anyTags: ["role_librarian", "psyker"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "정자 위로 맑은 번개가 스쳐 지나가며 구름이 갈라졌다! 워프의 심연에 빠지지 않고 하늘의 힘만 빌리는 스톰시어의 극의를 완벽히 선보였다.",
          stats: { WP: 9, Inf: 7, Fel: 6 },
          faith: 10,
          corruption: -10
        },
        fail: {
          text: "폭풍의 기운이 잠시 역류해 의식 제단이 갈라졌고, 반동 충격으로 몸을 다쳐 의식을 중단해야 했다.",
          wounds: -16,
          corruption: 4
        }
      },
      {
        label: "전사한 형제들의 이름을 비단에 차분히 적어 추모하며 바람 소리에 귀를 기울인다",
        effect: {
          text: "야만적인 돌격 뒤에 찾아오는 고요한 애도. 그 균형이야말로 화이트 스카를 진정한 전사로 만드는 뿌리임을 깨달았다.",
          stats: { WP: 5, Fel: 5, Int: 4 },
          wounds: 10
        }
      }
    ],
    source: "Lexicanum: Stormseer / Codex Supplement: White Scars"
  },
  {
    id: "ev_s16_ch2_ws_3",
    title: "화이트 스카 — 거짓 후퇴와 협곡의 초원 사냥 전술",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["white_scars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 화이트 스카",
    weight: 34,
    text: "압도적인 화력을 자랑하는 적 중기갑 사단이 평원을 가로질러 진군한다. 정면 포격전은 어리석은 짓이다. 칸의 부대는 옛 초고리스 대초원에서 최강의 적을 사냥하던 전통 전술인 거짓 후퇴를 꺼내 들었다. 소수 바이크 편대가 패주하는 척 적 기갑 사단을 좁은 붉은 바위 협곡 깊숙이 끌어들이면, 양쪽 절벽에 매복한 고속 타격대가 그물을 닫아 섬멸할 계획이다.",
    choices: [
      {
        label: "[민첩 판정] 스스로 미끼 편대의 선두에 서서 적 주포 사거리 끝자락을 아슬아슬하게 스치며 협곡 안으로 유인한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "화이트 스카가 달아난다고 착각한 적 사단장이 전속 추격을 명하며 스스로 협곡 덫에 걸려들었다! 절벽 위에서 멜타와 플라즈마 화망이 쏟아지자 적 중기갑 사단이 단 반 시간 만에 고철 무더기로 변했다.",
          stats: { Ag: 9, Int: 6, Inf: 7 },
          addTags: ["khan_rider"]
        },
        fail: {
          text: "적 중전차의 예측 포격이 바이크 바로 옆에서 터지며 파편에 중상을 입었으나, 끝내 협곡 입구까지 적을 끌어들이는 데는 성공했다.",
          wounds: -22,
          stats: { Ag: 4, T: 3 }
        }
      },
      {
        label: "[지성 판정] 적 지휘부의 성향을 읽어 가짜 무전 혼선과 연막 후퇴 신호를 흘려 사단 전체를 완벽한 살상 지대로 유도한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "완벽한 기만에 속아 넘어간 적 예비대까지 협곡 깊숙이 진입했다! 입구와 출구가 동시에 폭파되며 단 한 대의 전차도 빠져나가지 못했다.",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "적 정찰 드론에 절벽 매복조 일부가 일찍 들통나며 포위가 느슨해졌고, 급히 측면을 메우다 포탄 파편에 부상을 입었다.",
          wounds: -16,
          stats: { Int: -2, Ag: 3 }
        }
      },
      {
        label: "[사격 판정] 협곡 절벽 위 매복조를 맡아 포위망이 닫히는 순간 적 선두와 후미 중전차의 궤도를 정확히 파괴한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "앞뒤가 막힌 강철 괴물들이 협곡 안에서 옴짝달싹 못 하게 되었다! 절벽을 타고 내려온 형제들의 파상 공세가 사냥을 완벽히 끝맺었다.",
          stats: { BS: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "적 대공 기관포의 반격에 절벽 바위가 무너지며 추락해 부상을 입었고, 적 후미 전차 몇 대를 놓치고 말았다.",
          wounds: -18,
          stats: { BS: 2 }
        }
      },
      {
        label: "협곡 외곽 능선을 지키며 포위망을 빠져나가려는 적 경장갑 정찰 차량들만 차분히 차단한다",
        effect: {
          text: "사냥감의 퇴로를 단단히 틀어막아 본대의 협곡 섬멸전이 한 치의 빈틈 없이 마무리되도록 도왔다.",
          stats: { Ag: 5, BS: 4, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: White Scars / Codex Supplement: White Scars"
  }
];
