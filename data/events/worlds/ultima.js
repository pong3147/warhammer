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
  }
);
