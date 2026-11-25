// 분기 사건 — 울티마 세그멘툼 행성 고유 (마크라그 · 바알 · 카타찬 · 발할라 · 녹턴 / 향후 행성별 단독 승격 가능)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_catachan_rite",
    title: "카타찬 밀림 성인식 — 카타찬 데블과의 조우",
    category: "행성",
    once: true,
    req: {
      minAge: 12,
      maxAge: 20,
      anyWorlds: ["catachan"],
      anyHomeWorlds: ["catachan"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
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
    id: "ev_macragge_forum",
    title: "마크라그 원로원의 시민 강연과 전술 시험",
    category: "행성",
    once: true,
    req: {
      minAge: 12,
      maxAge: 35,
      minYear: 700,
      anyWorlds: ["macragge"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 마크라그 · 12~35세 · 700.M41 이후",
    weight: 22,
    characters: ["calgar"],
    text: "헤라의 요새 아래 대리석 광장에서 울트라마 행정관들과 울트라마린 베테랑들이 시민들을 대상으로 위대한 프라이마크 로부테 길리먼이 남긴 《코덱스 아스타르테스》와 고전 통치론을 강연한다. 1만 년 전 울트라마의 기틀을 세운 군주의 가르침을 놓고 젊은 학도들 사이에 열띤 전술 문답이 오간다.",
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
          text: "울트라마 교관의 매서운 반박에 논리가 무너져 청중 앞에서 체면을 구겼지만, 냉철한 전술의 기초만은 뼈저리게 깨달았다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "연단에 나서기보다 광장 대리석 계단에 앉아 강연을 끝까지 필기하며 통치와 병법의 토대를 다진다",
        effect: {
          text: "질서와 합리 위에 세워진 울트라마의 통치 철학을 차분히 흡수했다. 화려한 주목은 없었으나 내실이 깊어졌다.",
          stats: { Int: 3, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Macragge"
  },
  {
    id: "ev_world_valhalla_ice_orks",
    title: "발할라 — 빙하 지하 터널의 동면 오크 둥지",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["valhalla"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 발할라",
    weight: 24,
    text: "지열 발전관 확장 공사 도중 영구 동토층 아래 수천 년 전 침공 당시 얼어붙었던 오크들이 열기에 녹아 깨어나고 말았다! 지하 도시 전체가 위험하다.",
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
    title: "녹턴 — 화산 대장간과 파이어드레이크 사냥",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      maxAge: 35,
      anyWorlds: ["nocturne"],
      anyHomeWorlds: ["nocturne"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 녹턴 · 14~35세",
    weight: 25,
    text: "용암 강이 흐르는 데스파이어 산기슭에서 거대한 화염 파충류 파이어드레이크가 성소 마을을 위협하고 있다. 뜨거운 흑요석 바위를 딛고 거수를 물리치는 일은 녹턴의 모든 전사에게 최고의 명예이자, 젊은 소년들에게는 샐러맨더 아스타르테스 후보생으로 발탁될 시련이기도 하다.",
    choices: [
      {
        label: "[백병 판정 · 남성 후보생 전용] 직접 벼린 흑요석 창으로 파이어드레이크의 심장을 노려 샐러맨더 선발 시련에 응한다",
        req: { gender: "male", maxAge: 17 },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "용암 비늘을 뚫고 거수를 쓰러뜨렸다! 샐러맨더 대장장이가 그대의 강인함과 자비로운 용기를 칭송하며 아스타르테스 후보생 명단에 이름을 올렸다.",
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
        label: "[백병 판정] 직접 벼린 흑요석 창을 들고 성소 마을을 지키기 위해 파이어드레이크와 정면으로 맞선다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "용암 비늘을 뚫고 거수를 쓰러뜨려 마을을 지켜 냈다! 녹턴의 장로들과 대장장이들이 그대를 성소 마을의 수호자로 칭송했다.",
          stats: { WS: 7, T: 6, WP: 5, Inf: 6 }
        },
        fail: {
          text: "화염 숨결에 심각한 화상을 입었지만 주민들을 대피시키는 데는 성공했다.",
          wounds: -26,
          stats: { T: 4, Fel: 3 }
        }
      },
      {
        label: "[지성 판정] 대장간의 쇠사슬 그물과 용암 수로를 이용해 파이어드레이크를 몰아낸다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "뛰어난 장인 기술로 마을 피해 없이 괴수를 쫓아냈다!",
          stats: { Int: 5, Fel: 5, T: 3 }
        },
        fail: {
          text: "용암이 튀어 팔을 크게 데었다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Nocturne / Codex Supplement: Salamanders"
  },
  {
    id: "ev_baal_red_thirst_pilgrim",
    title: "바알 — 방사능 사막의 천사 석상과 변이 약탈단",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["baal"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 바알 · 필멸자",
    weight: 26,
    text: "바알 세쿤두스 위성의 붉은 방사능 사막 한가운데 우뚝 선 생귀니우스 석상 아래 오아시스에서 방사능에 미쳐 버린 돌연변이 약탈단이 식수를 독차지하고 있다!",
    choices: [
      {
        label: "[백병 판정] 창과 칼을 빼 들고 오아시스를 되찾기 위해 돌격한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "약탈단 두목을 쓰러뜨리고 귀한 물을 지켜 냈다! 부족 전사들이 그대를 기렸다.",
          stats: { WS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "방사능 쇠창에 찔려 중상을 입었으나 간신히 물 주머니는 챙겨 도망쳤다.",
          wounds: -24
        }
      },
      {
        label: "[민첩 판정] 모래폭풍을 틈타 밤중에 조용히 식수만 길어 빠져나온다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "피 한 방울 흘리지 않고 일주일 치 정제수를 확보했다.",
          stats: { Ag: 5, Int: 3 },
          wounds: 6
        },
        fail: {
          text: "돌연변이 파수병에게 들켜 투석 세례를 맞고 도주했다.",
          wounds: -16
        }
      }
    ],
    source: "Lexicanum: Baal / Dante"
  },
  {
    id: "ev_catachan_brainleaf",
    title: "카타찬 — 밀림의 악몽, 정신 기생 덩굴 '브레인리프'",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["catachan"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카타찬",
    weight: 26,
    text: "밀림 정찰 중 기괴한 덩굴 '브레인리프'가 나뭇가지에서 떨어져 동료의 목덜미를 감았다! 신경계에 뿌리를 내리면 동료를 꼭두각시로 조종해 아군을 공격하게 만든다.",
    choices: [
      {
        label: "[민첩 판정] 기생 뿌리가 척수에 닿기 전 단검으로 번개같이 덩굴을 쳐낸다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "0.5초의 판단으로 동료의 목숨을 구했다! 카타찬 밀림에서 믿을 것은 서로의 등뿐이다.",
          stats: { Ag: 6, WS: 4, Fel: 5 }
        },
        fail: {
          text: "덩굴 가시에 팔을 찔려 독기로 며칠간 고열에 시달렸다.",
          wounds: -22
        }
      },
      {
        label: "[사격 판정] 화염방사기와 개인 화기로 주변 덩굴 군락을 통째로 소각한다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "화염의 장벽으로 기생 식물을 모조리 태워 야영지 안전을 확보했다.",
          stats: { BS: 5, T: 3 }
        },
        fail: {
          text: "불길에 놀란 독벌레 떼가 쏟아져 온몸을 쏘였다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Catachan Flora"
  },
  {
    id: "ev_s6_world_macragge_hera",
    title: "마크라그 헤라의 요새 — 대리석 광장의 시민 평의회와 울트라마의 자부심",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["macragge"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 마크라그",
    weight: 30,
    text: "눈 덮인 봉우리 아래 대리석 기둥과 프라이마크의 거대한 석상이 늘어선 마크라그 시비타스. 제국의 하이브 월드들과 달리 질서와 실용주의가 살아 숨 쉬는 이곳 시민 평의회에서, 전란으로 몰려든 울트라마 외곽 피난민들의 정착 예산과 방위군 증편안을 놓고 격론이 벌어지고 있다.",
    choices: [
      {
        label: "[교섭 판정] 피난민의 기술 인력을 즉시 방어선 보수와 공방 생산에 편입하는 상생 법안을 발의해 통과시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "질서와 자비가 조화를 이룬 울트라마다운 해법! 평의회 의원들이 기립 박수를 보내며 그대의 이름을 시정에 새겼다.",
          stats: { Fel: 7, Int: 5, Inf: 7 }
        },
        fail: {
          text: "예산 분배를 둘러싼 구역 대표들의 거센 반발에 법안이 후퇴하며 체면을 구겼으나, 최소한의 구호소 설치만은 관철했다.",
          stats: { Fel: 2, Inf: -3 }
        }
      },
      {
        label: "[지성 판정] 울트라마 표준 병참표를 대조해 낭비되는 관청 지출을 도려내고 방위군 장비 현대화 재원을 마련한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "흠잡을 데 없는 효율성에 울트라마 보좌관들이 감탄했다! 고대 프라이마크 길리먼이 남긴 《코덱스》와 행정 철학이 여전히 살아 있음을 증명했다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "감사 과정에서 자료 오류를 지적받아 일부 관료들의 반감을 사고 입지가 좁아졌으나, 방위군 예산 증액만은 이루어 냈다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "평의회 방청석에서 묵묵히 토론을 경청하며 마크라그의 법과 질서가 지탱되는 원리를 배운다",
        effect: {
          text: "광신만이 아니라 체계와 합리가 제국을 지킬 수 있음을 눈으로 확인했다.",
          stats: { Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Macragge / Codex: Space Marines"
  },
  {
    id: "ev_s6_world_macragge_polar",
    title: "마크라그 북극 요새 추모 — 제1중대 전원 옥쇄의 절벽",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 18,
      minYear: 746,
      anyWorlds: ["macragge"],
      excludeTags: [
        "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 마크라그 · 746.M41 이후",
    weight: 30,
    text: "칼바람이 휘몰아치는 마크라그 북극 방어 요새 유적. 745.M41 제1차 타이라니드 전쟁 당시, 울트라마린 제1중대 베테랑 전원 한 명도 물러서지 않고 최후까지 싸워 전멸했던 전설의 절벽 앞에 그대가 섰다. 눈보라 속에서 고대 볼터 탄피 하나가 발끝에 걸렸다.",
    choices: [
      {
        label: "[강인 판정] 영하의 빙벽을 맨손으로 올라 제1중대 추모비 정상에 경건히 헌화하고 밤새 불침번을 선다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "동상 직전의 추위를 이겨 내고 새벽빛 속에 경례를 올렸다. '용기와 명예'의 뜻이 뼛속까지 각인되었다!",
          stats: { T: 6, WP: 7, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "빙판에 미끄러져 다리를 다쳤으나 끝내 추모비 앞에 무릎을 꿇고 경의를 바쳤다.",
          wounds: -12,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 전멸 직전까지 방진을 지켰던 제1중대의 최후 방어 기록을 낭독하며 후배 장병들의 결의를 다진다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "눈보라를 뚫고 울려 퍼진 추모사에 함께 오른 참배객 모두가 숙연하게 눈시울을 적셨다.",
          stats: { WP: 7, Fel: 6 },
          faith: 8
        },
        fail: {
          text: "매서운 눈보라에 숨이 턱 막히고 목소리가 흩어져 냉기에 크게 떨었으나, 마음속 다짐만큼은 단단해졌다.",
          wounds: -8,
          stats: { WP: 2 },
          faith: 2
        }
      },
      {
        label: "탄피를 제자리에 조용히 돌려놓고 말없이 목례한 뒤 빙원을 내려온다",
        effect: {
          text: "영웅들의 희생 위에 오늘의 평온이 서 있음을 조용히 되새겼다.",
          stats: { WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Battle for Macragge / Polar Fortress"
  },
  {
    id: "ev_s6_world_nocturne_time_of_trial",
    title: "녹턴의 '시련의 계절' — 갈라지는 용암 지각과 지하 피난처",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["nocturne"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 녹턴",
    weight: 32,
    text: "거대한 위성 프로메테우스가 녹턴에 최근접하며 15년 주기의 대격변 '시련의 계절'이 시작되었다! 대지가 갈라지고 화산재가 하늘을 가리는 가운데, 외곽 광산 마을의 피난 행렬이 흘러내리는 용암 줄기에 가로막혀 고립되었다.",
    choices: [
      {
        label: "[강인 판정] 뜨거운 화산재 폭풍과 유독 가스를 견디며 직접 밧줄 다리를 매어 고립된 주민들을 건너오게 한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "피부가 벗겨지는 열기를 이겨 내고 마을 사람 전원을 성채 도시 안으로 이끌었다! 녹턴인의 불굴의 의지였다.",
          stats: { T: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "튀어 오른 용암 불티에 심한 화상을 입었으나 마지막 아이까지 안전지대로 넘겨 보냈다.",
          wounds: -18,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 지각 균열의 방향을 읽어 내어 용암 흐름을 빈 협곡 쪽으로 돌릴 비상 방화 제방을 급조한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "폭약과 흑요석 바위로 용암의 진로를 정확히 틀어 마을의 대장간과 식량 창고까지 온전히 지켜 냈다!",
          stats: { Int: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "제방 일부가 무너지며 열풍에 휩쓸렸으나, 주민들이 대피할 귀중한 시간을 벌어 주었다.",
          wounds: -14,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "성채 지하 피난처의 산소 여과기와 식수 탱크를 지키며 화산 겨울을 버틸 준비에 집중한다",
        effect: {
          text: "녹턴의 주민은 자연의 분노 앞에서 패닉에 빠지지 않는다. 침착한 대비로 시련의 계절을 넘겼다.",
          stats: { T: 5, WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Nocturne / Time of Trial"
  },
  {
    id: "ev_s6_world_nocturne_salamander_kin",
    title: "녹턴의 성채 마을 — 숯빛 거인이 고향 대장간을 찾아온 밤",
    category: "행성 고유 심화",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["nocturne"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "거주 행성: 녹턴 · 필멸자 주민",
    weight: 32,
    text: "다른 수많은 챕터와 달리 샐러맨더는 고향의 필멸자 씨족과 연을 끊지 않는다. 화산재가 날리는 저녁, 숯처럼 검은 피부에 붉게 빛나는 눈동자를 지닌 거대한 배틀 브라더 한 명이 파워 아머를 벗고 평범한 가죽 앞치마를 두른 채 마을 대장간에 찾아와 낡은 농기구와 방벽 경첩 수리를 돕고 있다.",
    choices: [
      {
        label: "[지성 판정] 거인의 옆에서 풀무질을 도우며 프로메테우스 교단의 금속 제련과 화염 단조의 비결을 정중히 묻는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "샐러맨더 전사가 굵고 따뜻한 웃음을 터뜨리며 강철의 결을 읽는 법을 손수 가르쳐 주었다! 평생의 기술이 몸에 배었다.",
          stats: { Int: 7, T: 5, Inf: 4 }
        },
        fail: {
          text: "초인의 묵직한 망치질을 따라가다 손목이 삐고 뜨거운 불티에 팔을 데었지만, 거인의 넉넉한 격려에 용기를 얻었다.",
          wounds: -10,
          stats: { T: 2, Int: 2 }
        }
      },
      {
        label: "[교섭 판정] 바깥 은하의 전쟁 이야기와 녹턴 마을이 버텨 낸 소식을 나누며 진심 어린 감사를 전한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "천사 같은 초인이 필멸자의 손을 조심스럽게 맞잡으며 '우리가 싸우는 이유는 바로 이 마을의 불빛 때문'이라 답했다.",
          stats: { Fel: 7, WP: 6 },
          faith: 8
        },
        fail: {
          text: "초인의 압도적인 체격 앞에서 혀가 꼬여 어색한 침묵이 흘렀으나, 따뜻한 눈빛 덕분에 겨우 긴장이 풀렸다.",
          stats: { Fel: -2, WP: 2 }
        }
      },
      {
        label: "대장간 한쪽에 신선한 물과 말린 고기를 말없이 놓아두고 묵묵히 자신의 일감을 다듬는다",
        effect: {
          text: "샐러맨더 전사가 떠나기 전 그대의 공구를 손수 벼려 두고 갔다. 녹턴만의 소중한 유대였다.",
          stats: { T: 4, WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Salamanders / Nocturne Sanctuary Cities"
  },
  {
    id: "ev_s15_su_macragge_1",
    title: "마크라그 산악 훈련장 — 외지 파견 장병과 울트라마 보조군 합동 기동",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["macragge"],
      excludeHomeWorlds: ["macragge"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "마크라그 파견 · 마크라그 외 출신 · 비초인",
    weight: 32,
    text: "마크라그 북부 고원 훈련장에서 외지 파견 인원과 울트라마 보조군 정예 중대가 합동 모의 기동훈련에 들어갔다. 《코덱스 아스타르테스》의 분초 단위 교전 시간표에 맞춰 움직이는 마크라그 장병들 사이에서, 험지 즉흥 기동에 익숙한 외지 분대가 연막 지대 돌파 시점을 두고 보조군 지휘관과 신경전을 벌인다.",
    choices: [
      {
        label: "[제국군 지휘관 전용] 울트라마 교범의 화력 축선에 외지 부대의 우회 기동을 결합한 합동 작전안을 현장에서 완성한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "commissar", "lord_commissar"] },
        effect: {
          text: "원칙과 유연함이 완벽히 맞물린 합동 기동에 울트라마 교관단이 기립해 경례를 보냈다!",
          stats: { Int: 6, Inf: 6, BS: 4 }
        }
      },
      {
        label: "[지성 판정] 고원의 지형 고저차와 포격 예정 좌표를 암산해 울트라마 교관조차 인정할 완벽한 기동 경로를 증명한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 한 치의 오차도 없는 기동 계산으로 모의 목표를 조기 탈취했다! 외지 장병의 실력을 마크라그 훈련장에 각인시켰다.",
          stats: { Int: 7, BS: 4, Inf: 6 }
        },
        fail: {
          text: "모의 포격 판정 구역에 진입해 훈련 실격 기록을 남기고 교관의 혹독한 강평을 들었다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "[강인 판정] 영하의 설원 경사면을 완전 군장으로 선두 돌파해 외지 장병의 끈기를 몸으로 보여 준다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "거친 눈바람을 뚫고 가장 먼저 고지 깃발을 꽂아 울트라마 보조군 장병들의 진심 어린 박수를 받았다!",
          stats: { T: 6, Ag: 4, Fel: 5 }
        },
        fail: {
          text: "빙판 경사면에서 미끄러져 발목을 접질리고 저체온증으로 의무 천막에 실려 갔다.",
          wounds: -14,
          stats: { T: 2 }
        }
      },
      {
        label: "울트라마 보조군의 표준 신호 체계와 교범을 겸허히 익히며 합동 대열의 보조 임무를 성실히 수행한다",
        effect: {
          text: "자존심보다 협동을 택한 태도 덕분에 마크라그식 정밀 병참과 부대 운용의 기본기를 깊이 배웠다.",
          stats: { WP: 4, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Ultramar Auxilia / Codex: Space Marines"
  },
  {
    id: "ev_s15_su_macragge_2",
    title: "마크라그 대도서관 군사 사료실 — 고대 성전 기록 대조",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["macragge"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 마크라그 · 비초인 필멸자",
    weight: 30,
    text: "마크라그 시비타스 대도서관의 군사 사료실에서 수천 년 전 대성전과 동부 변방 방어전 당시의 양피지 두루마리와 데이터 판독본을 대조하는 작업이 진행 중이다. 사서장이 훼손된 성계 보급로 사본에서 현재 울트라마 외곽 방위망에도 그대로 적용할 수 있는 잊힌 항로 좌표를 발견했지만, 해독 과정에서 두 기록이 정면으로 모순된다.",
    choices: [
      {
        label: "[학자/관료/기계교/심문관 전용] 고대 하이 고딕 각주와 군수 관청 연표를 교차 대조해 정확한 보급 좌표를 즉시 복원한다",
        req: { anyTags: ["ultramar_scholar", "administratum", "mechanicus", "inquisitor"] },
        effect: {
          text: "후대 필사본의 착오를 단번에 짚어 내어 잃어버린 성계 보급로를 복원했다! 마크라그 원로원 사료실에 그대의 이름이 기록되었다.",
          stats: { Int: 8, Inf: 6, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 낡은 양피지의 마모된 항성 기호와 부대 이동 일수를 계산해 진짜 사료와 후대 오기를 가려낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "치밀한 교차 검증으로 고대 성전 항로를 완벽히 밝혀 냈다! 사서장이 그대를 울트라마 명예 장학생 명단에 올렸다.",
          stats: { Int: 7, Inf: 6, Fel: 3 },
          addTags: ["ultramar_scholar"]
        },
        fail: {
          text: "잘못된 사본을 정본으로 보고해 원로원 사료 위원회의 공식 정정 경고장을 받았다.",
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "[의지 판정] 사흘 밤낮을 등불 아래 틀어박혀 수천 줄의 군수 명부를 한 글자씩 빠짐없이 검증한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "지독한 인내심 끝에 훼손된 구절의 단서를 찾아내어 사료실 학자들의 탄성을 자아냈다!",
          stats: { WP: 6, Int: 5, Inf: 4 }
        },
        fail: {
          text: "사흘 밤낮의 과로 끝에 집중력이 꺾여 결정적인 오기를 놓치고 사서장의 질책을 받았다.",
          wounds: -8,
          stats: { Inf: -2 }
        }
      },
      {
        label: "모순된 대목에 주석 표시만 달아 두고 정식 사서단의 최종 검증을 기다리며 주변 서고를 정리한다",
        effect: {
          text: "섣불리 단정하지 않는 신중함 덕분에 귀중한 고문서의 훼손을 막고 성전사의 흐름을 차분히 익혔다.",
          stats: { Int: 4, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Macragge / Know No Fear"
  },
  {
    id: "ev_s15_su_macragge_3",
    title: "울트라마 성간 항만 세관 — 위조 울트라마 군수 공납 화물 적발",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["macragge"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 마크라그 · 비초인 필멸자",
    weight: 30,
    text: "마크라그 궤도 엘리베이터와 이어진 성간 항만 세관에서 외곽 성계발 상선 한 척이 군수 탄약으로 신고한 화물 상자에 불량 합금과 사치품 밀수 화물을 섞어 둔 정황이 포착되었다. 화주인 거대 상단의 대리인은 마크라그 일부 상업 귀족과의 친분을 과시하며 조용히 통관 도장을 찍어 달라고 압박해 온다.",
    choices: [
      {
        label: "[법집행/관료/심문소 전용] 성전 군수품 사기죄 영장을 즉시 발부해 선박을 압류하고 배후 귀족 계좌까지 동결한다",
        req: { anyTags: ["arbites", "administratum", "inquisitor", "inquisition_agent", "commissar"] },
        effect: {
          text: "추상같은 법 집행 앞에 거대 상단의 허세가 순식간에 무너졌다! 압수된 물자는 즉시 방위군 보급창으로 이관되었다.",
          stats: { Inf: 8, Int: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 선하증권의 미세한 무게 오차와 봉인 밀랍의 성분 차이를 낱낱이 밝혀 내어 법정 증거로 굳힌다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "반박할 여지 없는 물증을 제시해 밀수 일당을 전원 체포했다! 울트라마 세관 감찰국에서 포상 서한이 내려왔다.",
          stats: { Int: 6, Inf: 7, WP: 3 }
        },
        fail: {
          text: "상단 변호인단이 검사 절차의 하자를 물고 늘어져 오히려 세관 감사를 받으며 입지가 좁아졌다.",
          stats: { Inf: -4, Fel: -2 }
        }
      },
      {
        label: "[권위 판정] 항만 경비대를 소집해 상단 대리인의 협박을 정면으로 꺾고 즉석 개장 검사를 강행한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "울트라마의 법 앞에 특권은 없다는 일갈에 대리인이 무릎을 꿇었다! 위조 화물이 만천하에 드러났다.",
          stats: { Inf: 8, Fel: 4, WP: 4 }
        },
        fail: {
          text: "화물창 수색 중 고용된 밀수꾼 경호원들과 난투가 벌어져 부상을 입고 상선 일부를 놓쳤다.",
          wounds: -12,
          stats: { Inf: -3 }
        }
      },
      {
        label: "직접 충돌을 피하되 의심 화물의 일련번호를 익명 보고서로 마크라그 항만 감찰국에 넘긴다",
        effect: {
          text: "몸을 사리면서도 성전 군수품의 도둑질을 묵과하지 않았다. 며칠 뒤 상선이 외곽 검문소에서 적발되었다는 소식이 들렸다.",
          stats: { Int: 4, WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Macragge / Ultramar"
  },
  {
    id: "ev_s15_su_baal_1",
    title: "바알 방사능 사막 — 외곽 보급 기지 방어와 전갈형 변이 짐승 떼",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["baal"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 바알 · 비초인 필멸자",
    weight: 30,
    text: "붉은 방사능 모래가 끝없이 펼쳐진 바알 외곽의 물자 중계 기지에 밤이 찾아오자, 모래 언덕 너머에서 거대한 전갈형 변이 포식자 무리가 기지 발전기의 진동을 따라 몰려들었다! 철조망 외벽 일부가 이미 부식되어 뚫렸고, 식수 탱크를 지키지 못하면 기지 전원이 말라 죽는다.",
    choices: [
      {
        label: "[전투 전문가/바알 생존자 전용] 조명탄으로 붉은 사구를 대낮처럼 밝히고 교차 사격 지대를 형성해 변이 짐승 떼를 일소한다",
        req: { anyTags: ["militarum", "imperial_military", "sororitas", "baal_survivor"] },
        effect: {
          text: "빈틈없는 화망에 전갈 괴수 무리가 모래 언덕 너머로 뿔뿔이 흩어졌다! 기지의 식수 탱크와 보급고를 온전히 지켜 냈다.",
          stats: { BS: 6, WS: 5, Inf: 5 }
        }
      },
      {
        label: "[사격 판정] 감시탑 방어 화기에 매달려 외벽 틈새로 기어오르는 전갈 괴수의 갑각 약점을 집중 사격한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정확한 관절 조준 사격으로 선두 거수들을 차례로 쓰러뜨려 기지 방어선을 사수했다!",
          stats: { BS: 7, WP: 4, Inf: 5 }
        },
        fail: {
          text: "부서진 방벽 너머로 튄 거대 독침에 방어구가 뚫려 큰 부상을 입었다.",
          wounds: -20,
          stats: { BS: 2 }
        }
      },
      {
        label: "[백병 판정] 화염 토치와 단창을 들고 뚫린 철조망 앞에 버텨 서서 괴수들이 식수 탱크로 접근하지 못하게 막는다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "불꽃과 창끝으로 외벽 틈새를 틀어막아 동이 틀 때까지 식수 탱크를 지켜 냈다!",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "거대한 집게발에 옆구리를 베여 피투성이가 된 채 동이 틀 때까지 가까스로 버텨 냈다.",
          wounds: -24,
          stats: { T: 2 }
        }
      },
      {
        label: "외곽 초소를 포기하고 기지 인원과 식수통을 중앙 방공 벙커로 철수시켜 철문을 용접해 봉쇄한다",
        effect: {
          text: "외곽 설비 일부는 잃었으나 기지 전원의 목숨과 비상 식수만은 무사히 보존했다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Baal / Dante"
  },
  {
    id: "ev_s15_su_baal_2",
    title: "바알 프라임 위성 — 채굴 정착촌의 정수기 고장과 방사선 차폐 수리",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      maxYear: 999,
      greatRift: false,
      anyWorlds: ["baal"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 바알 · 바알의 파괴 이전 · 비초인 필멸자",
    weight: 30,
    text: "바알의 쌍둥이 위성 중 하나인 바알 프라임의 협곡 채굴 정착촌에서 강렬한 태양풍 직후 핵심 방사능 정수기와 납 차폐막 구동축이 동시에 멈춰 섰다. 오염된 지하수를 마시면 며칠 안에 피폭으로 쓰러지고, 수리실에서는 지금도 치명적인 방사선 수치를 알리는 경보음이 울리고 있다.",
    choices: [
      {
        label: "[기계교 전용] 방사선 내성 의체와 정밀 공구로 고온 정수 코어에 직접 진입해 차폐 구동축을 완벽히 복구한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "기계교의 성스러운 정밀 수리 덕분에 정수기와 차폐막이 다시 힘차게 돌아갔다! 정착촌 주민들이 깊이 고개를 숙였다.",
          stats: { Int: 7, T: 4, Inf: 6 }
        }
      },
      {
        label: "[강인 판정] 두꺼운 납 앞치마만 걸친 채 방사선 구역에 뛰어들어 뒤틀린 차폐막 기어를 강제로 맞물린다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "피폭의 공포를 이겨 내고 묵직한 차폐막을 닫아 올려 정착촌 전체를 방사선 폭풍에서 구했다!",
          stats: { T: 8, WP: 5, Inf: 5 }
        },
        fail: {
          text: "극심한 방사선 화상과 구토 증세로 며칠간 사경을 헤매며 간신히 수리를 마쳤다.",
          wounds: -22,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 광산 환기 팬과 예비 구리 코일을 뜯어 임시 여과 회로를 짜서 방사선 구역 진입 시간을 절반으로 줄인다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "기발한 우회 배선으로 피폭을 최소화하면서 정수기를 되살려 정착촌의 찬사를 받았다!",
          stats: { Int: 7, Fel: 4, Inf: 5 }
        },
        fail: {
          text: "임시 회로가 과열되어 스파크에 손을 크게 데고 여과 효율도 크게 떨어졌다.",
          wounds: -14,
          stats: { Inf: -2 }
        }
      },
      {
        label: "비상 비축수를 엄격히 계량 배급하며 방사선 폭풍이 잦아들 때까지 정착촌 주민들을 깊은 지하 갱도로 대피시킨다",
        effect: {
          text: "갈증은 혹독했으나 무모한 희생 없이 정착촌 주민 전원이 폭풍을 넘겼다.",
          stats: { WP: 5, Fel: 3 }
        }
      }
    ],
    source: "Lexicanum: Baal Primus / Codex: Blood Angels"
  },
  {
    id: "ev_s15_su_baal_3",
    title: "바알의 붉은 천사 추모 성소 — 외지인이 마주한 침묵과 갈증",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["baal"],
      excludeHomeWorlds: ["baal"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "바알 파견 · 바알 외 출신 · 비초인",
    weight: 32,
    text: "외지에서 바알로 파견된 그대가 붉은 사막 협곡에 세워진 생귀니우스 추모 성소 앞에 섰다. 황금빛 날개를 펼친 천사 부조 아래로 뜨거운 열풍이 스쳐 가고, 순례자와 사막 부족민들이 말없이 피 묻은 붕대와 물 한 모금을 제단에 바친다. 극심한 탈수와 열기 속에서 바알 사람들이 왜 이 척박한 땅에서도 숭고함을 잃지 않는지 깨닫게 되는 순간이다.",
    choices: [
      {
        label: "[성직자/전투 수녀/사이커 전용] 날개 달린 프라이마크의 희생을 기리는 장엄한 기도문을 낭송해 성소의 순례자들을 위로한다",
        req: { anyTags: ["ecclesiarchy", "sororitas", "psyker"] },
        effect: {
          text: "협곡을 울리는 경건한 기도에 지친 순례자들과 사막 부족민들이 눈물을 흘리며 다시 일어섰다.",
          stats: { WP: 7, Fel: 5, Inf: 5 },
          faith: 10
        }
      },
      {
        label: "[의지 판정] 타는 듯한 갈증을 참아 내며 남은 정제수의 절반을 지친 순례자들에게 나누고 해 질 녘까지 석상 앞에서 묵념한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "외지인의 숭고한 절제와 자비에 바알 부족민들이 붉은 모래 축복을 올리며 존경을 표했다!",
          stats: { WP: 7, Fel: 6, T: 3 },
          faith: 8
        },
        fail: {
          text: "극심한 일사병과 탈수로 성소 돌계단에 쓰러져 바알 원주민들의 부축을 받았다.",
          wounds: -12,
          stats: { WP: 2 }
        }
      },
      {
        label: "[강인 판정] 바람에 파묻힌 성소 외벽의 붉은 모래를 홀로 파내며 바알의 혹독한 시련을 몸소 견뎌 낸다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "해가 저물도록 땀을 쏟으며 성소의 천사 날개 부조를 온전히 드러냈다! 바알의 열기마저 그대의 의지를 꺾지 못했다.",
          stats: { T: 6, WP: 5, Inf: 4 },
          faith: 6
        },
        fail: {
          text: "뜨거운 돌가루에 피부가 벗겨지고 기력이 바닥나 작업을 끝마치지 못한 채 쓰러졌다.",
          wounds: -14,
          stats: { T: 2 }
        }
      },
      {
        label: "성소 그늘에서 잠시 숨을 고르며 천사 석상에 경건히 고개를 숙인 뒤 본래 임무지로 발걸음을 돌린다",
        effect: {
          text: "생귀니우스의 고향이 품은 고요한 슬픔과 품격을 가슴 깊이 새겼다.",
          stats: { WP: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Baal / Sanguinius"
  },
  {
    id: "ev_s15_su_baal_4",
    title: "임페리움 니힐루스의 바알 — 대균열 너머 재건 보급선 호송",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 1000,
      greatRift: true,
      anyWorlds: ["baal"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 바알 · 대균열 이후",
    weight: 34,
    text: "시카트릭스 말레딕툼이 은하를 가르고 아스트로노미칸의 빛이 끊긴 암흑의 제국 임페리움 니힐루스. 타이라니드 하이브 함대의 대침공으로 잿더미가 된 바알 궤도에 마침내 재건용 건축 자재와 의약품을 실은 소규모 보급선단이 도착했다. 그러나 궤도 잔해 사이에 숨어 있던 해적선과 잔존 외계 포자 무리가 착륙선 항로를 덮쳐 왔다!",
    choices: [
      {
        label: "[함대/아스타르테스/지휘관 전용] 잔해 지대의 사각 항로를 꿰뚫는 정밀 기동으로 착륙선단을 엄호하며 습격자들을 격파한다",
        req: { anyTags: ["navy", "rogue_trader", "astartes", "baal_survivor", "officer"] },
        effect: {
          text: "암흑 속에서도 흔들리지 않는 항해 지휘로 보급선단 전원을 지표에 안착시켰다! 바알 재건의 귀중한 불씨를 지켰다.",
          stats: { BS: 6, Ag: 5, Inf: 7 },
          faith: 5
        }
      },
      {
        label: "[사격 판정] 보급선 대공 포좌에 올라 암흑 속 잔해 사이로 파고드는 습격정과 외계 포자를 차례로 격추한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "불타는 포좌 위에서 습격정을 몰아내고 의약품과 건축 자재를 온전히 지켜 냈다! 바알의 생존자로 이름을 새겼다.",
          stats: { BS: 7, WP: 5, Inf: 6 },
          addTags: ["baal_survivor"]
        },
        fail: {
          text: "적의 집중 사격에 포좌 장갑이 뚫려 깊은 파편상을 입고 보급선 한 척을 잃었다.",
          wounds: -22,
          stats: { BS: 2 }
        }
      },
      {
        label: "[지성 판정] 끊긴 워프 등대 대신 바알 위성의 중력 궤도를 계산해 착륙선들이 안전하게 강하할 비상 항로를 지정한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "위성의 중력 그림자를 이용한 기적의 강하 궤도로 적의 포화를 따돌렸다! 암흑의 제국에서도 인류의 지혜는 꺼지지 않았다.",
          stats: { Int: 7, Inf: 7, WP: 4 },
          addTags: ["baal_survivor"]
        },
        fail: {
          text: "항로 계산 오차로 착륙선 착지 지점이 어긋나 충격에 다치고 재건 물자 일부가 손실되었다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "지표 착륙장의 유도 등불을 끝까지 지켜 내어 무사히 내려온 보급 상자들을 벙커 안으로 실어 나른다",
        effect: {
          text: "어둠에 잠긴 바알 하늘 아래 마지막 등불을 지키며 재건의 첫 삽을 거들었다.",
          stats: { T: 4, WP: 5 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Devastation of Baal / Imperium Nihilus"
  },
  {
    id: "ev_s15_su_catachan_1",
    title: "카타찬 밀림 행군 — 외지 장교의 제식 고집과 현지 안내인의 경고",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["catachan"],
      excludeHomeWorlds: ["catachan"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "카타찬 파견 · 카타찬 외 출신 · 비초인",
    weight: 32,
    text: "카타찬에 파견된 외지 연대의 신임 중대장이 광택 나는 제복 차림으로 2열 종대 제식 행군을 고집하며 이끼 낀 계곡을 정면 돌파하려 한다. 옆에 선 카타찬 현지 안내인이 침을 뱉으며 앞쪽 늪지대에 짖는 개구리 독포자와 식인 덩굴이 깔려 있으니 즉각 대형을 풀고 능선으로 우회하라고 경고하지만, 장교는 명령 불복종이라며 핏대를 세운다.",
    choices: [
      {
        label: "[지휘관/커미사르/심문관 전용] 전술 판단 오류를 현장에서 즉시 바로잡아 현지 안내인에게 선두 정찰 지휘권을 넘긴다",
        req: { anyTags: ["officer", "commissar", "lord_commissar", "inquisitor"] },
        effect: {
          text: "교범보다 실전을 택한 단호한 명령에 카타찬 안내인이 씨익 웃으며 선두에 섰다! 부대 전원이 무사히 능선을 돌파했다.",
          stats: { Inf: 7, Int: 5, Fel: 5 }
        }
      },
      {
        label: "[교섭 판정] 외지 장교의 체면을 살려 주면서 능선 우회가 전술적 고지 점령에 유리하다고 설득해 부대를 구한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "장교의 자존심을 건드리지 않고 행군로를 돌려 전멸 위기를 넘겼다! 현지 안내인도 그대의 눈치를 높이 샀다.",
          stats: { Fel: 7, Int: 5, Inf: 5 }
        },
        fail: {
          text: "장교가 분노해 강행군을 밀어붙인 탓에 계곡 독포자에 휩쓸려 호흡기를 크게 다쳤다.",
          wounds: -16,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[민첩 판정] 대열 선두로 뛰어나가 소형 독개구리가 남긴 맹독 포자 주머니에 돌을 던져 멀리서 터뜨려 위험을 눈앞에서 증명한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "시퍼런 독연기가 솟구치자 안색이 창백해진 장교가 즉각 우회 명령을 내렸다! 대담한 행동으로 중대를 살렸다.",
          stats: { Ag: 7, T: 4, Fel: 4 }
        },
        fail: {
          text: "돌을 던지던 순간 바람이 바뀌어 독성 포자 연기가 팔뚝에 스쳐 살이 짓무르는 대가를 치르고서야 부대가 발걸음을 멈췄다.",
          wounds: -20,
          stats: { Ag: 2 }
        }
      },
      {
        label: "언쟁에 끼어들지 않고 방독면 끈을 단단히 조인 채 늪지 가장자리의 단단한 나무뿌리만 밟으며 스스로 살아남을 길을 찾는다",
        effect: {
          text: "카타찬 밀림에서는 멍청한 명령보다 발밑을 보는 눈이 목숨을 지킨다는 교훈을 뼈저리게 배웠다.",
          stats: { T: 5, Ag: 3 }
        }
      }
    ],
    source: "Lexicanum: Catachan Jungle Fighters / Codex: Catachans"
  },
  {
    id: "ev_s15_su_catachan_2",
    title: "카타찬 밀림 전초기지 — 맹독 식충 식물 군락 침식과 야간 방화선",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["catachan"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카타찬 · 비초인 필멸자",
    weight: 30,
    text: "야간 습기가 피어오르는 카타찬 밀림 전초기지의 철조망을 뚫고, 산성 수액을 뿜어내는 거대한 식충 덩굴 군락이 하룻밤 사이에 수 미터나 자라 들어왔다! 발전기 막사와 탄약고가 덩굴에 감기기 일보 직전이며, 프로메튬 연료통은 단 세 통뿐이다.",
    choices: [
      {
        label: "[밀림 전사/제국군 전용] 바람 방향과 수액의 인화점을 계산해 최소한의 프로메튬으로 완벽한 원형 방화선을 그어 낸다",
        req: { anyTags: ["catachan_blooded", "militarum", "imperial_military"] },
        effect: {
          text: "단 한 통의 연료로 덩굴 뿌리 전체를 잿더미로 만들었다! 전초기지 장병들이 그대의 솜씨에 환호했다.",
          stats: { BS: 5, Int: 5, T: 5, Inf: 4 }
        }
      },
      {
        label: "[사격 판정] 중형 화염방사기를 메고 철조망 외곽을 따라 정밀하게 불길을 뿌려 덩굴 뿌리 줄기만 태워 낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "탄약고에 불티 하나 튀지 않게 하면서 맹독 식충 군락을 말끔히 소각해 전초기지를 지켜 냈다!",
          stats: { BS: 6, T: 4, Inf: 5 }
        },
        fail: {
          text: "불길에 놀란 식충 식물이 사방으로 뿜어낸 강산 수액에 방어구와 어깨를 크게 데었다.",
          wounds: -18,
          stats: { BS: 2 }
        }
      },
      {
        label: "[백병 판정] 밀림 정글도로 발전기 막사를 휘감은 주 줄기를 직접 쳐내고 동료들이 불을 놓을 틈을 연다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "팔뚝만 한 식충 줄기를 단칼에 베어 내고 발전기를 살려 내어 기지 전체의 야간 조명을 지켜 냈다!",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "가시 덩굴이 다리를 휘감고 파고들어 큰 출혈을 입고 의무병에게 끌려 나왔다.",
          wounds: -22,
          stats: { WS: 2 }
        }
      },
      {
        label: "탄약고 주변의 마른 풀과 나무만 서둘러 베어 내어 불길이 기지 안쪽으로 번지지 않도록 방화벽을 다진다",
        effect: {
          text: "외곽 철조망 일부는 내주었으나 탄약고 폭발이라는 최악의 참사만은 확실히 막아 냈다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Catachan Flora / Codex: Astra Militarum"
  },
  {
    id: "ev_s15_su_catachan_3",
    title: "카타찬 폭우 밀림 강 — 급류 도하와 수중 포식자 습격",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["catachan"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 카타찬 · 비초인 필멸자",
    weight: 28,
    text: "앞이 보이지 않는 열대 폭우가 쏟아지는 가운데 보급품과 통신 장비를 실은 수송대가 불어난 밀림 강을 도하해야 한다. 강 한가운데 임시 밧줄 다리를 건너던 순간, 흙탕물 아래에서 거대한 비늘 등지느러미가 솟구치며 수중 포식자 무리가 도하 대열을 향해 달려들었다!",
    choices: [
      {
        label: "[밀림 베테랑/제국군/전투 수녀 전용] 수면 아래 움직임을 간파하고 파편 수류탄으로 물길을 뒤흔들어 포식자 떼를 단숨에 흩어 버린다",
        req: { anyTags: ["catachan_blooded", "militarum", "sororitas"] },
        effect: {
          text: "수중 충격파에 포식자 무리가 허옇게 배를 드러내고 떠내려갔다! 수송대 전원이 흠집 없이 강을 건넜다.",
          stats: { WS: 5, Ag: 6, T: 5 }
        }
      },
      {
        label: "[민첩 판정] 출렁이는 밧줄 위에서 균형을 잡으며 물 밖으로 솟구친 포식자의 아가리를 피하고 통신 장비를 건너편으로 넘긴다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "폭우와 급류 속에서도 고양이처럼 밧줄을 건너 핵심 통신 장비와 보급품을 무사히 안착시켰다!",
          stats: { Ag: 7, T: 4, Inf: 5 }
        },
        fail: {
          text: "급류에 휩쓸려 바위에 부딪히고 수중 포식자의 이빨에 종아리를 물려 겨우 강둑으로 기어 올라왔다.",
          wounds: -20,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[사격 판정] 강둑 나무 위에 올라 흙탕물 속 파문을 겨냥해 포식자 우두머리의 숨통을 끊어 도하 시간을 번다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "빗줄기를 가르는 정확한 사격으로 우두머리를 쓰러뜨려 동료들이 안전하게 도하할 틈을 열었다!",
          stats: { BS: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "미끄러운 나뭇가지에서 추락해 갈비뼈에 타박상을 입고 탄약도 잃었다.",
          wounds: -16,
          stats: { BS: 2 }
        }
      },
      {
        label: "강둑 위 안전한 밧줄 고정 말뚝을 끝까지 붙잡고 동요하는 동료들의 도하 줄을 단단히 유지한다",
        effect: {
          text: "눈에 띄지 않는 자리에서 밧줄이 풀리지 않게 온몸으로 버텨 내어 수송대의 붕괴를 막았다.",
          stats: { T: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Catachan Fauna / Jungle Fighters"
  },
  {
    id: "ev_s15_su_valhalla_1",
    title: "발할라 지하 빙하 도시 — 중앙 열교환소 압력 이상과 동결 위기",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["valhalla"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 발할라 · 비초인 필멸자",
    weight: 30,
    text: "영구 동토 아래 깊숙이 파인 발할라 지하 하이브의 중앙 지열 열교환소에서 굉음과 함께 증기 압력이 급락했다. 주 배관이 얼어붙어 파열되면 하위 주거 구역 세 개가 불과 몇 시간 만에 영하 70도의 얼음 무덤으로 변한다. 증기와 성에가 뒤섞인 기계실 안에서 비상 수동 전환 작업이 시급하다.",
    choices: [
      {
        label: "[기계교 전용] 지열 펌프의 압력 곡선을 즉시 재조정하고 막힌 응축 밸브를 기계령 의례로 되살린다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "성스러운 기계령 진정 절차로 열교환 압력이 단숨에 정상화되었다! 수만 주민이 동사의 위기를 넘겼다.",
          stats: { Int: 7, Inf: 6, T: 3 }
        }
      },
      {
        label: "[지성 판정] 열교환 도면을 머릿속으로 복기해 보조 증기관으로 열기를 역순환시켜 얼어붙은 주 배관을 녹여 낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "단 한 구역의 난방도 끊지 않고 주 배관의 얼음 마개를 완벽히 녹여 내어 도시 관리국의 표창을 받았다!",
          stats: { Int: 7, Inf: 6, WP: 4 }
        },
        fail: {
          text: "압력 조절 실수로 고온 증기가 터져 나와 화상을 입고 구역 난방 복구가 지연되었다.",
          wounds: -16,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[강인 판정] 얼음 결정이 달라붙은 외벽 냉각통로로 들어가 얼어붙은 수동 차단 레버를 온몸의 힘으로 꺾어 돌린다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "뼈가 시린 혹한을 견디며 수동 전환을 완료해 지하 도시의 생명줄을 다시 이어 놓았다!",
          stats: { T: 7, WP: 5, Inf: 5 }
        },
        fail: {
          text: "손가락과 뺨에 심한 동상을 입었으나 간신히 레버를 돌려 도시의 동결만은 막아 냈다.",
          wounds: -20,
          stats: { T: 2 }
        }
      },
      {
        label: "주거 구역의 단열 격벽을 서둘러 닫고 주민들에게 비상 보온 담요와 뜨거운 배급을 나누며 복구를 지원한다",
        effect: {
          text: "차분한 대피와 보온 조치 덕분에 수리가 끝날 때까지 단 한 명의 동사자도 나오지 않았다.",
          stats: { Fel: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Valhalla / Codex: Astra Militarum"
  },
  {
    id: "ev_s15_su_valhalla_2",
    title: "발할라 영구 동토 지표 — 빙하 관측 초소와 설상 장갑차 보급 호송",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["valhalla"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 발할라 · 비초인 필멸자",
    weight: 30,
    text: "지하 도시 바깥의 영구 동토 지표에 세워진 외곽 빙하 관측 초소로 난방 연료와 탄약을 실어 나르는 설상 장갑차 호송대에 합류했다. 가파른 빙하 능선을 넘던 중 굉음과 함께 거대한 눈사태가 쏟아져 앞길을 막았고, 무너진 얼음층 아래로 깊이를 알 수 없는 빙하 크레바스가 입을 벌린 사이 폭설 너머에서 빙원 약탈 짐승 무리가 냄새를 맡고 다가온다!",
    choices: [
      {
        label: "[제국군 전용] 설상 장갑차의 탐조등으로 크레바스 가장자리를 비추며 경계 사격망과 휴대용 빙하 다리 가설을 동시에 지휘한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "commissar"] },
        effect: {
          text: "혹한 속에서도 흔들리지 않는 현장 지휘로 빙하 틈새를 넘어 관측 초소에 보급품을 무사히 인계했다!",
          stats: { BS: 5, Int: 5, Inf: 6 }
        }
      },
      {
        label: "[강인 판정] 시야가 2미터도 안 되는 폭설 속에서 얼음 갈고리를 박아 설상 장갑차가 건널 휴대용 강철 다리를 직접 고정한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "손이 곱아드는 살인적인 눈보라를 버텨 내고 크레바스 위로 강철 다리를 고정해 호송대를 통과시켰다!",
          stats: { T: 7, Int: 4, Inf: 5 }
        },
        fail: {
          text: "살을 에는 강풍에 심한 저체온증과 동상을 얻어 장갑차 난방 구획으로 실려 갔다.",
          wounds: -22,
          stats: { T: 2 }
        }
      },
      {
        label: "[사격 판정] 장갑차 상부 포탑에서 눈보라 속 그림자를 침착하게 겨냥해 크레바스 건너편으로 몰려드는 짐승 무리를 꺾어 놓는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "하얀 폭풍을 뚫는 정확한 점사로 가설 작업반의 등을 완벽히 지켜 냈다!",
          stats: { BS: 7, WP: 5, Inf: 4 }
        },
        fail: {
          text: "강풍에 탄도가 흔들리며 선두 짐승의 돌진 충격으로 포탑 난간에 부딪혀 어깨뼈에 금이 갔다.",
          wounds: -18,
          stats: { BS: 2 }
        }
      },
      {
        label: "설상 장갑차 내부의 난방 연료통과 비상 신호탄을 지키며 눈사태가 가라앉을 때까지 관측 초소와 무선 교신을 유지한다",
        effect: {
          text: "호송대의 핵심 연료와 통신망을 지켜 낸 덕분에 단 한 명의 동사자도 없이 초소 구원대와 합류했다.",
          stats: { WP: 4, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Valhalla / Codex: Astra Militarum"
  },
  {
    id: "ev_s15_su_valhalla_3",
    title: "발할라 동계 참호전 훈련장 — 외지 장병 합동 훈련과 타나 차 한 잔",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["valhalla"],
      excludeHomeWorlds: ["valhalla", "krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "발할라 파견 · 발할라·크리그 외 출신 · 비초인",
    weight: 32,
    text: "발할라에 파견된 그대가 빙원 위 얼음 참호에서 발할라 아이스 워리어 분대와 동계 방어전 합동 훈련에 참가했다. 매서운 칼바람에 외지인의 손가락은 방아쇠도 당기기 어려울 만큼 굳어 가는데, 현지 고참병들은 태연하게 눈 구덩이 안에서 주전자를 끓이며 진하고 쌉쌀한 발할라 전통 타나 차를 건넨다.",
    choices: [
      {
        label: "[제국군/커미사르 전용] 현지 고참병들과 어깨를 맞대고 혹한기 탄약 관리법과 빙벽 사격술을 교류하며 합동 사기를 끌어올린다",
        req: { anyTags: ["commissar", "lord_commissar", "officer", "militarum"] },
        effect: {
          text: "외지 부대와 발할라 연대의 장점을 하나로 엮어 내며 혹한기 훈련을 최우수 성적으로 마쳤다!",
          stats: { Fel: 5, BS: 4, T: 3, Inf: 4 }
        }
      },
      {
        label: "[강인 판정] 외지인은 한 시간도 못 버틴다는 발할라 병사들의 농담에 웃으며 눈보라 속 야간 초소 교대를 끝까지 완수한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "새벽까지 얼음 참호를 지켜 낸 배짱에 발할라 아이스 워리어 분대장이 털모자를 눌러 씌워 주며 전우로 인정했다!",
          stats: { T: 7, WP: 5, Fel: 5 }
        },
        fail: {
          text: "오기를 부리다 발끝에 동상이 들어 의무실 신세를 졌지만, 발할라 병사들은 그 배짱만은 인정해 주었다.",
          wounds: -14,
          stats: { T: 2 }
        }
      },
      {
        label: "[교섭 판정] 쌉쌀한 타나 차를 단숨에 비우고 각자가 겪은 전선의 이야기를 나누며 발할라 연대와의 두터운 전우애를 쌓는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "타나 차의 깊은 향을 즐길 줄 아는 외지인이라며 발할라 고참병들이 진심으로 마음을 열었다!",
          stats: { Fel: 7, Inf: 5, WP: 4 }
        },
        fail: {
          text: "강렬한 타나 차 향에 사레가 들어 기침을 쏟는 바람에 참호 전체의 웃음거리가 되었다.",
          stats: { Fel: -2, WP: -1 }
        }
      },
      {
        label: "현지 병사들이 알려 주는 방한포 감는 법과 총기 결빙 방지 요령을 꼼꼼히 익히며 조용히 따뜻한 차로 몸을 녹인다",
        effect: {
          text: "실전적인 동계 생존 요령을 몸에 익히며 혹독한 발할라의 추위를 무사히 견뎌 냈다.",
          stats: { T: 4, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Valhallan Ice Warriors / Ciaphas Cain: For the Emperor"
  },
  {
    id: "ev_s15_su_valhalla_4",
    title: "발할라 빙하 폐허 창고 — 빙하기 이전 보급품 발굴과 배급 분쟁",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["valhalla"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 발할라 · 비초인 필멸자",
    weight: 28,
    text: "발할라가 혜성 충돌로 얼어붙기 전 녹색 대지 시절에 건설되었던 고대 저장고 하나가 빙하 균열 아래서 발견되었다. 완벽히 냉동 보존된 고대 발전 부품과 정밀 공구가 쏟아져 나오자, 전선 보급을 우선하려는 연대 병참관과 지하 도시 난방 설비 교체를 외치는 시민 대표단이 창고 입구에서 험악하게 대치하기 시작했다.",
    choices: [
      {
        label: "[관료/법집행/장교 전용] 제국 전시 징발령과 도시 생존 조항을 함께 적용해 부품은 도시로, 군수품은 연대로 즉시 분할 집행한다",
        req: { anyTags: ["administratum", "arbites", "officer", "commissar"] },
        effect: {
          text: "명확한 법적 근거와 공정한 분할 집행에 양측 모두 승복하며 창고 물자가 지체 없이 필요한 곳으로 옮겨졌다!",
          stats: { Inf: 7, Int: 5, Fel: 5 }
        }
      },
      {
        label: "[교섭 판정] 지하 도시가 얼어붙으면 신병도 나오지 못한다는 논리로 양측을 설득해 공평한 공동 분배 합의문을 끌어낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "전선과 후방이 하나라는 호소가 양쪽의 고집을 꺾었다! 연대와 지하 도시 모두에서 두터운 신망을 얻었다.",
          stats: { Fel: 7, Inf: 6, Int: 4 }
        },
        fail: {
          text: "양측 모두 양보를 거부해 소란이 커졌고 중재 실패의 책임까지 떠안았다.",
          stats: { Fel: -2, Inf: -4 }
        }
      },
      {
        label: "[지성 판정] 고대 물자 목록을 현장에서 재분류해 군용과 민간용으로 겹치지 않는 대체 규격품을 찾아내 갈등을 해소한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "고대 규격표를 정확히 해독해 양측 모두가 만족할 물자 배정안을 도출해 냈다!",
          stats: { Int: 7, Inf: 5, Fel: 3 }
        },
        fail: {
          text: "빙하 창고 천장에서 떨어진 고드름 파편에 다치고 물자 대장 정리에도 실패했다.",
          wounds: -12,
          stats: { Inf: -3 }
        }
      },
      {
        label: "배급 분쟁에서 한발 물러서서 발굴된 창고의 빙벽 붕괴를 막는 지지대 보강 작업에 집중한다",
        effect: {
          text: "말다툼 대신 빙벽을 지탱하는 묵묵한 작업 덕분에 귀중한 고대 저장고가 매몰되지 않았다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Valhalla / Codex: Astra Militarum"
  },
  {
    id: "ev_s15_su_nocturne_1",
    title: "녹턴 성소 도시 흑요석 공방 — 외지 파견자의 고중력 적응",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["nocturne"],
      excludeHomeWorlds: ["nocturne"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "녹턴 파견 · 녹턴 외 출신 · 비초인",
    weight: 32,
    text: "화산재가 흩날리는 녹턴의 성소 도시 헤시오드 외곽에 파견된 그대는 발걸음마다 납덩이를 매단 듯 짓누르는 강한 중력과 후끈한 유황 열기에 숨이 턱 막혔다. 장비를 수리하러 들른 흑요석 대장간에서 녹턴의 노장인이 외지인의 헐떡이는 호흡을 보고는, 녹턴에서 버티려면 힘으로 중력과 싸우지 말고 모루 위 쇠처럼 리듬을 타야 한다며 무거운 단조 망치를 건넨다.",
    choices: [
      {
        label: "[기계교/길드 장인 전용] 녹턴의 고열 흑요석 합금 제련법을 세심히 관찰하며 외지 제국 장비의 내열 강화 비법을 익힌다",
        req: { anyTags: ["mechanicus", "tech_priest", "guild_artisan"] },
        effect: {
          text: "노장인과 뜨거운 불꽃 앞에서 기술을 나누며 화산 행성의 가혹한 환경에도 끄떡없는 장비 개조법을 터득했다!",
          stats: { Int: 6, T: 6, Inf: 4 }
        }
      },
      {
        label: "[강인 판정] 무거운 중력 속에서 노장인의 박자에 맞춰 땀이 비 오듯 쏟아질 때까지 직접 쇠를 두드려 몸을 길들인다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "팔이 떨어져 나갈 듯한 무게를 견뎌 낸 끝에 호흡과 중심이 하나로 맞물렸다! 녹턴의 고중력이 오히려 근력을 단련시켜 주었다.",
          stats: { T: 8, WS: 4, Fel: 4 }
        },
        fail: {
          text: "고중력 아래 무리하게 망치를 휘두르다 어깨 근육을 크게 다치고 열기에 탈진했다.",
          wounds: -14,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 녹턴 장인들의 호흡법과 무게 중심 이동을 분석해 고중력 환경에 맞는 보폭과 장비 배분법을 터득한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "체중 이동과 군장 무게 중심을 정밀하게 조절해 고중력 속에서도 체력 소모를 절반으로 줄였다!",
          stats: { Int: 6, T: 5, Ag: 4 }
        },
        fail: {
          text: "이론만 앞세우다 화로 옆 흑요석 단차에 발이 걸려 넘어지며 무릎을 크게 찧었다.",
          wounds: -10,
          stats: { Ag: -2 }
        }
      },
      {
        label: "노장인의 조언대로 수분을 충분히 섭취하며 장비 보수가 끝날 때까지 녹턴의 중력과 열기에 천천히 몸을 적응시킨다",
        effect: {
          text: "조급함을 버리고 녹턴의 묵직한 대지에 순응하자 점차 숨결이 안정되었다.",
          stats: { T: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Nocturne / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s15_su_nocturne_2",
    title: "녹턴 용암 협곡 — 흑요석 현수교 붕괴 위기와 피난 물자 호송",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      anyWorlds: ["nocturne"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 녹턴 · 비초인 필멸자",
    weight: 30,
    text: "녹턴의 성소 도시들을 잇는 깊은 용암 협곡 위, 거대한 흑요석 현수교를 건너던 식량과 의약품 수송 행렬이 갑작스러운 화산 지진에 발이 묶였다! 교각의 강철 주 케이블 한 가닥이 굉음과 함께 끊어지며 다리 상판이 붉은 용암 강 쪽으로 기우는 가운데, 수송대 주민들과 물자 수레가 협곡 한가운데 고립되었다.",
    choices: [
      {
        label: "[전투 요원/전투 수녀/길드 장인 전용] 예비 강철 닻줄로 기운 상판의 하중을 즉시 분산시키고 통제 대열을 세워 주민과 물자를 안전히 대피시킨다",
        req: { anyTags: ["militarum", "imperial_military", "sororitas", "guild_artisan"] },
        effect: {
          text: "침착한 하중 분산과 질서 정연한 대피 지휘 덕분에 단 한 명의 추락자도 없이 수송 행렬 전원을 성소 도시로 이끌었다!",
          stats: { T: 5, Int: 5, Inf: 6 }
        }
      },
      {
        label: "[강인 판정] 아래에서 치솟는 용암 열풍을 견디며 보조 강철 케이블을 어깨에 메고 협곡 건너편 흑요석 말뚝에 힘껏 감아 고정한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "숨이 턱 막히는 열기와 무게를 버텨 내고 현수교의 붕괴를 멈춰 세워 성소 도시 주민들의 뜨거운 감사를 받았다!",
          stats: { T: 8, WP: 5, Inf: 5 }
        },
        fail: {
          text: "달아오른 쇠사슬에 손과 어깨를 크게 데고 근육이 찢어지는 고통을 겪었으나 끝내 주민들은 건너편으로 보냈다.",
          wounds: -20,
          stats: { T: 2 }
        }
      },
      {
        label: "[민첩 판정] 요동치는 현수교 난간을 내달려 기울어진 물자 수레의 제동 장치를 풀고 고립된 주민들을 건너편 안전 지대로 먼저 끌어낸다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "무너지는 상판 위에서 민첩하게 움직여 주민 전원과 핵심 의약품 상자를 협곡 밖으로 빼냈다!",
          stats: { Ag: 7, Fel: 4, Inf: 5 }
        },
        fail: {
          text: "여진에 상판이 크게 흔들리며 흑요석 난간에 세게 부딪혀 팔과 옆구리에 깊은 상처를 입었다.",
          wounds: -18,
          stats: { Ag: 2 }
        }
      },
      {
        label: "협곡 입구 초소에서 추가 진입 차량을 통제하고 구난대가 설치할 도르래 밧줄의 고정 지점을 단단히 확보한다",
        effect: {
          text: "2차 추락 사고를 막고 구난 작업의 발판을 지켜 내어 현장의 혼란을 최소화했다.",
          stats: { Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Nocturne / Salamanders Omnibus"
  },
  {
    id: "ev_s15_su_nocturne_3",
    title: "녹턴 지열 제련소 — 마그마 수로 과열과 장인 길드 방호벽 보수",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 16,
      anyWorlds: ["nocturne"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 녹턴 · 비초인 필멸자",
    weight: 30,
    text: "화산 지각의 열기를 직접 끌어다 쓰는 녹턴 성소 도시의 대형 지열 제련소에서 지하 마그마 수로의 압력이 갑자기 치솟았다! 용광로 방호벽에 붉은 균열이 번지며 뜨거운 용암이 작업장으로 넘쳐흐르기 일보 직전이다. 장인 길드 수장은 도제들과 마을 주거지를 지키기 위해 수동 냉각 수문을 열 지원자를 외치고 있다.",
    choices: [
      {
        label: "[길드 장인/기계교 전용] 내열 합금 판재를 즉석에서 용접하고 지열 압력 배출구를 단계적으로 열어 제련소를 완벽히 살려 낸다",
        req: { anyTags: ["guild_artisan", "mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "장인 정신과 정밀 공학이 결합된 완벽한 복구 작업이었다! 제련소와 성소 마을 모두 단 한 곳의 피해도 입지 않았다.",
          stats: { Int: 7, T: 5, Inf: 7 }
        }
      },
      {
        label: "[지성 판정] 마그마 수로의 분기 밸브 순서를 계산해 과열된 용암을 빈 흑요석 냉각조로 안전하게 돌려 보낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "열압력을 완벽히 분산시켜 제련소를 지켜 냈다! 장인 길드가 그대에게 명예 장인의 표식을 수여했다.",
          stats: { Int: 7, T: 4, Inf: 6 }
        },
        fail: {
          text: "밸브 개방 순서가 어긋나 튄 용암 불티에 화상을 입고 제련소 작업대 절반이 소실되었다.",
          wounds: -16,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[강인 판정] 내열 방패를 앞세우고 균열 난 방호벽 앞으로 돌진해 흑요석 쐐기와 내화 모르타르를 힘껏 박아 넣는다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "숨이 막히는 복사열 속에서 방호벽 균열을 틀어막아 용암 범람을 저지했다! 장인 길드 전원이 뜨거운 경의를 바쳤다.",
          stats: { T: 8, WS: 4, Inf: 6 }
        },
        fail: {
          text: "극심한 용암 복사열과 튀어 오른 불티에 방호구 틈새로 피부를 크게 데었으나, 균열 확장은 끝내 막아 냈다.",
          wounds: -22,
          stats: { T: 2 }
        }
      },
      {
        label: "제련소 하부 작업장의 도제들과 귀중한 공구 상자들을 신속히 상층 대피소로 옮겨 인명 피해를 막는다",
        effect: {
          text: "화염보다 사람의 목숨을 우선한 녹턴다운 선택이었다. 도제 전원이 무사히 대피했다.",
          stats: { Fel: 4, WP: 5 }
        }
      }
    ],
    source: "Lexicanum: Nocturne / Promethean Cult"
  }
);
