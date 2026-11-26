// 분기 사건 — 옵스쿠루스 · 템페스투스 · 파시피쿠스 행성 고유 (펜리스 · 보스트로야 · 타니스 · 오펠리아 VII / 카디아·크리그는 1:1 단독 승격)
export default [
  {
    id: "ev_fenris_hunt",
    title: "펜리스 빙원의 피의 사냥",
    category: "행성",
    once: true,
    req: {
      minAge: 12,
      maxAge: 22,
      anyWorlds: ["fenris"],
      anyHomeWorlds: ["fenris"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 펜리스 · 나이 12~22세",
    weight: 26,
    text: "얼음 대륙이 갈라지는 해빙기, 거대한 펜리스 늑대 무리가 부족의 야영지를 덮쳤다. 하늘 멀리서 스페이스 울프의 울프 프리스트가 전사들의 용맹을 내려다보고 있다는 소문이 돈다.",
    choices: [
      {
        label: "[백병 판정 · 남성 후보생 전용] 울프 프리스트의 시선 아래 도끼를 치켜들고 알파 늑대와 일대일로 맞붙는다",
        req: { gender: "male", maxAge: 17 },
        check: { stat: "WS", diff: 0 },
        success: {
          text: "거대한 빙원 늑대를 맨손과 도끼로 제압했다! 스페이스 울프의 울프 프리스트가 고개를 끄덕이며 그대를 아스타르테스 후보생으로 기억했다.",
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
        label: "[백병 판정] 부족의 명예를 걸고 도끼를 휘둘러 알파 늑대와 정면으로 맞선다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "거대한 빙원 늑대를 쓰러뜨리고 야영지를 지켜 냈다! 부족 전사들이 뿔피리를 불며 그대를 펜리스의 맹수로 찬양했다.",
          stats: { WS: 7, T: 6, WP: 5, Inf: 6 },
          addTags: ["fenris_blood"]
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
    id: "ev_world_vostroya_firstborn",
    title: "보스트로야 — 보스트로얀 퍼스트본 가문의 가보 승계",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 15,
      maxAge: 35,
      anyWorlds: ["vostroya"],
      anyHomeWorlds: ["vostroya"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 보스트로야 · 15~35세",
    weight: 24,
    text: "호루스 헤러시 시절의 빚을 갚기 위해 모든 가문의 장자를 보스트로얀 퍼스트본 연대에 바치는 보스트로야의 오랜 서약. 가문의 어른이 대대로 물려 내려온 황금 장식 수공예 라스건과 플라즈마 코일을 그대 앞에 내놓는다.",
    choices: [
      {
        label: "[사격 판정] 장인 정신이 깃든 가보 총기의 사격 의식을 완벽히 치른다",
        check: { stat: "BS", diff: 5 },
        success: {
          text: "과열 없이 정교한 명중률을 보여 가문의 명예와 보스트로얀 퍼스트본 연대의 자긍심을 높였다!",
          stats: { BS: 6, WP: 5, Inf: 5 }
        },
        fail: {
          text: "오래된 플라즈마 코일이 과열되어 손등에 화상을 입었지만 끝내 총을 놓지 않았다.",
          wounds: -18,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 사격 전에 낡은 황동 총열과 플라즈마 코일을 분해해 정밀 정비한 뒤 맹세를 올린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "수백 년 묵은 미세 균열을 미리 바로잡아 가보 무기를 새것처럼 되살렸다! 가문의 대장장이와 원로들이 그대의 솜씨에 깊이 감탄했다.",
          stats: { Int: 6, BS: 4, Inf: 5 }
        },
        fail: {
          text: "정밀 부품을 조립하다 냉각 핀이 부러져 가문의 장로에게 엄한 질책을 받았다.",
          stats: { Int: 2, Inf: -3 }
        }
      }
    ],
    source: "Lexicanum: Vostroyan Firstborn"
  },
  {
    id: "ev_world_ophelia7_tribunal",
    title: "오펠리아 VII — 추기경 대성당의 이단 고발 함",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "canoness", "cardinal",
        "lord_commissar", "commissar_general", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
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
    id: "ev_fenris_kraken",
    title: "펜리스 — 빙하 해빙기와 거대 바다 괴수 크라켄",
    category: "행성 고유",
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      anyHomeWorlds: ["fenris"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank", "commissar_general", "lord_commissar",
        "inquisitor", "lord_inquisitor", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "navy_admiral",
        "arbites_marshal", "departmento_head", "planetary_governor", "sector_lord", "rt_lord_captain",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 펜리스",
    weight: 26,
    text: "얼음 바다가 갈라지며 섬만 한 거대 바다 괴수 '펜리스 크라켄'의 촉수가 부족의 전투 용선을 휘감았다! 차가운 파도 속에서 전사들의 용기가 시험대에 오른다.",
    choices: [
      {
        label: "[백병 판정] 뱃머리로 뛰어올라 도끼와 칼로 크라켄의 촉수를 베어 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "괴수의 촉수를 잘라 내어 전사들과 배를 구했다! 그날 밤 스칼드들이 그대의 이름을 노래로 지었다.",
          stats: { WS: 7, T: 5, Fel: 4, Inf: 6 }
        },
        fail: {
          text: "촉수에 휩쓸려 빙하 바다에 빠졌다가 간신히 끌어올려졌다. 심한 동상과 타박상을 입었다.",
          wounds: -26,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 작살포로 괴수의 거대한 눈을 정조준해 몰아낸다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "정확한 작살 사격에 비명을 지른 크라켄이 심해로 잠적했다!",
          stats: { BS: 6, Int: 3, Inf: 5 }
        },
        fail: {
          text: "갑판이 뒤집히며 돛대에 부딪혀 다쳤다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Fenrisian Kraken"
  },
  {
    id: "ev_s3_world_vostroya_forge",
    title: "보스트로야 — 혹한 군수 공장의 장자 징집령과 공예 라스건",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      anyHomeWorlds: ["vostroya"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
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
          text: "이별의 슬픔에 잠긴 가족들의 원성을 사며 연설이 어수선하게 끝났으나, 묵묵히 배웅하며 보스트로야의 의무를 되새겼다.",
          stats: { Fel: -2, WP: 2 }
        }
      },
      {
        label: "눈보라 속 교대 근무를 성실히 마치고 보스트로얀 퍼스트본 연대의 무운을 기원한다",
        effect: {
          text: "혹한과 쇳가루 속에서도 보스트로야의 맹세는 1만 년째 꺾이지 않는다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Vostroya / Vostroyan Firstborn"
  },
  {
    id: "ev_s3_world_tanith_nalwood",
    title: "타니스 — 움직이는 날우드 숲의 길잡이",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 12,
      maxYear: 764,
      anyWorlds: ["tanith"],
      anyHomeWorlds: ["tanith"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 타니스 · 765.M41 멸망 이전",
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
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeTags: [
        "cardinal", "high_lord_terra", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
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
  // ===== 15단계 확장: 펜리스 · 보스트로야 · 타니스 · 오펠리아 VII 파견 · 행성 고유 12종 =====
  {
    id: "ev_s15_fr_fenris_1",
    title: "펜리스 — 아사이하임 외곽 정박지의 카얼 보조대 검문",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeHomeWorlds: ["fenris"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 펜리스 · 외지 파견",
    weight: 32,
    text: "스페이스 울프의 모성 펜리스에서 유일하게 사계절 내내 가라앉지 않는 북극 대륙 아사이하임. 얼음 절벽 아래 외곽 정박지에 내리자마자, 늑대 가죽 망토를 두른 펜리스 카얼 보조대가 묵직한 라스건을 겨누며 외지인의 신원과 통행 허가서를 매섭게 추궁했다. 뼈를 에는 냉기 속에서 이들의 경계심을 풀지 못하면 항구 밖으로 한 걸음도 내디딜 수 없다.",
    choices: [
      {
        label: "[심문소·함대·행정·개척상인 전용] 제국 공식 인장과 성역 통행 문서를 내보이며 정박지 규율을 존중하겠다고 천명한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "navy", "rogue_trader", "administratum"] },
        effect: {
          text: "카얼 보조대 지휘관이 룬 문자가 새겨진 판독기로 인장을 확인한 뒤 고개를 끄덕였다. 아사이하임 외곽 보급 구역 출입과 빙원 안내를 정식으로 허가받았다.",
          stats: { Inf: 6, Fel: 4, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 외지인의 허세를 버리고 솔직한 임무 목적과 챕터에 대한 경의를 밝히며 통행을 청한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "솔직하고 당당한 태도에 카얼 보조대 장교가 껄껄 웃으며 무기를 거두었다. 훈제 고기와 따뜻한 약초차를 대접받으며 펜리스 생존 수칙까지 상세히 전해 들었다.",
          stats: { Fel: 6, Inf: 4, WP: 3 }
        },
        fail: {
          text: "불필요한 말실수로 카얼 경비병들의 심기를 건드려, 혹한 속 검문소 바깥에 반나절 동안 억류된 채 동상과 굴욕을 겪었다.",
          wounds: -10,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[강인 판정] 영하의 바닷바람 속에서도 미동 없이 서서 정밀 신체검사와 장비 대조를 끝까지 버텨 낸다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "외지인답지 않은 끈기와 강인한 체력에 카얼 전사들이 경외의 눈빛을 보냈다. 정박지 보급 창고 이용과 방한 장비 우선 지급을 인정받았다.",
          stats: { T: 6, WP: 4, Inf: 3 }
        },
        fail: {
          text: "매서운 극지 강풍을 맨몸으로 견디다 저체온증으로 쓰러져 의무 막사로 실려 갔다.",
          wounds: -16,
          stats: { T: 2 }
        }
      },
      {
        label: "항구 검역 수칙에 따라 모든 무기를 임시 영치하고 지정된 보급 구역 안에서만 차분히 대기한다",
        effect: {
          text: "불필요한 마찰 없이 검문을 통과해 아사이하임 외곽의 거친 풍광과 챕터 보조대의 철통 같은 경계 태세를 눈여겨보았다.",
          stats: { WP: 3, Int: 2 }
        }
      }
    ],
    source: "Lexicanum: Asaheim / Kaerls / Codex: Space Wolves"
  },
  {
    id: "ev_s15_fr_fenris_2",
    title: "펜리스 — 해빙기 지각 변동과 빙하 균열 속 보급대 구조",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 펜리스",
    weight: 31,
    text: "펜리스의 극단적인 타원 궤도가 별에 가까워지며 대륙 전체를 뒤흔드는 해빙기 지각 변동이 시작되었다. 굉음과 함께 해안 빙하가 두 동강 나며, 식량과 탄약을 싣고 이동하던 보급 수송대가 깊은 얼음 균열 가장자리에 아슬아슬하게 매달린 채 구조 신호를 쏘아 올렸다.",
    choices: [
      {
        label: "[기계교 전용] 빙하 하중과 단층 진동을 즉시 연산해 견인 윈치의 안전 각도를 잡아 수송 차량을 끌어올린다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos"] },
        effect: {
          text: "정밀한 구조 계산과 기계령에 올린 축복 기도 덕분에 수송대와 화물이 단 하나의 손실도 없이 안전한 암반 위로 인양되었다.",
          stats: { Int: 6, Inf: 5, T: 2 }
        }
      },
      {
        label: "[민첩 판정] 갈라지는 빙판 위로 밧줄을 던지고 무너지는 눈더미 사이를 누벼 고립된 대원들을 끌어낸다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "얼음 절벽이 붕괴하기 직전 마지막 대원까지 안전 지대로 끌어올렸다! 구출된 수송대원들이 그대의 기민한 판단력에 깊이 감사했다.",
          stats: { Ag: 6, WP: 4, Inf: 5 }
        },
        fail: {
          text: "발밑 얼음이 무너지며 차가운 바닷물과 얼음 파편에 휩쓸려 큰 타박상과 동상을 입었다.",
          wounds: -18,
          stats: { T: 2 }
        }
      },
      {
        label: "[강인 판정] 허리에 구명줄을 묶고 균열 아래로 내려가 얼어붙은 화물과 부상자를 어깨에 메고 올라온다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "살을 에는 빙하 바람 속에서도 초인적인 근력으로 버텨 내며 부상자와 핵심 보급 상자를 모두 건져 올렸다.",
          stats: { T: 6, WS: 3, Inf: 4 }
        },
        fail: {
          text: "얼음 벽에서 떨어져 내린 암석 파편에 어깨를 정통으로 맞아 심하게 다쳤다.",
          wounds: -20,
          stats: { WP: 2 }
        }
      },
      {
        label: "안전한 암반 지대에 복스 중계기와 조명탄을 설치해 후속 구조선이 정확한 좌표를 찾도록 유도한다",
        effect: {
          text: "침착한 유도 덕분에 본진 구조정이 제때 도착해 생존자 대부분을 수습할 수 있었다.",
          stats: { Int: 4, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Fenris / Codex: Space Wolves"
  },
  {
    id: "ev_s15_fr_fenris_3",
    title: "펜리스 — 긴 겨울밤 해안 망루의 눈트롤 야수 방어전",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["fenris"],
      excludeTags: [
        "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 펜리스",
    weight: 32,
    text: "태양이 수평선 너머로 자취를 감춘 긴 겨울밤, 펜리스 해안 망루 바깥 빙판에서 살기를 띤 포효가 울려 퍼졌다. 얼음 갑각을 두른 거대 눈트롤들과 굶주린 빙원 야수 무리가 눈보라를 뚫고 방벽을 향해 쇄도해 온다. 망루가 무너지면 배후의 보급 기지와 피난처까지 통째로 짓밟히고 만다.",
    choices: [
      {
        label: "[아스타르테스 전용] 방벽 너머 빙원으로 뛰어내려 거대 눈트롤 우두머리의 목을 단숨에 끊고 야수 무리를 궤멸시킨다",
        req: { anyTags: ["astartes"] },
        effect: {
          text: "초인의 일격에 산더미 같은 눈트롤 우두머리가 눈보라 속으로 쓰러졌다. 망루 수비대가 환호하며 하늘 전사의 위용을 찬양했다.",
          stats: { WS: 6, T: 4, Inf: 6 }
        }
      },
      {
        label: "[백병 판정] 방벽 틈을 뚫고 올라온 눈트롤의 앞길을 가로막고 불붙은 무기로 근접 격퇴전을 벌인다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "괴수의 육중한 팔을 피해 급소를 정확히 찔러 쓰러뜨렸다! 거대 괴물이 무너지자 뒤따르던 야수 무리도 어둠 속으로 흩어졌다.",
          stats: { WS: 7, T: 4, WP: 4, Inf: 5 }
        },
        fail: {
          text: "눈트롤의 거대한 주먹에 휩쓸려 성벽 안쪽으로 내동댕이쳐지며 갈비뼈에 심한 부상을 입었다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 망루 상단 포좌에서 화염탄과 집중 사격을 퍼부어 야수 떼의 돌격을 빙판 위에서 저지한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "눈보라 속에서도 불꽃이 솟는 지점을 겨냥해 선두 눈트롤을 정확히 쓰러뜨렸다. 망루는 아침까지 단 한 치도 밀리지 않았다.",
          stats: { BS: 6, Int: 3, Inf: 4 }
        },
        fail: {
          text: "혹한에 노리쇠가 얼어붙는 순간 파편이 튀어 손과 얼굴에 상처를 입었고, 방벽 외곽 일부가 파손되었다.",
          wounds: -14,
          stats: { Inf: -2 }
        }
      },
      {
        label: "방벽 안쪽 화로와 프로메튬 기름통을 잇달아 점화해 야수 무리가 가까이 접근하지 못하도록 방어선을 지킨다",
        effect: {
          text: "거센 불길과 연기 덕분에 눈트롤 무리가 정면 돌파를 포기해, 망루는 밤새 버텨 낼 수 있었다.",
          stats: { Int: 3, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Fenris / Fenrisian Ice Troll / Codex: Space Wolves"
  },
  {
    id: "ev_s15_fr_vostroya_1",
    title: "보스트로야 — 대공장 정밀 무기 수령과 장인 길드 검수 갈등",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      excludeHomeWorlds: ["vostroya"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 보스트로야 · 외지 파견",
    weight: 32,
    text: "매연과 눈발이 뒤섞인 보스트로야의 거대 고딕 군수 공장에 외지 파견 인원으로 도착해 전선 보급용 정밀 화기 인수를 맡았다. 그러나 자부심 강한 보스트로야 장인 길드의 원로가 외지인은 황동 세공 라스건과 플라즈마 화기의 섬세한 정비법을 모른다며 납품 서명을 완강히 거부한다.",
    choices: [
      {
        label: "[기계교·행정 전용] 공식 군수 규격서와 정비 의례를 완벽히 낭송해 장인 길드의 까다로운 검수 기준을 정면 돌파한다",
        req: { anyTags: ["mechanicus", "tech_priest", "magos", "administratum"] },
        effect: {
          text: "기계 교리와 보급 규정을 빈틈없이 꿰뚫는 모습에 장인 원로가 고개를 숙이며 최상급 검수 도장을 찍어 주었다. 예비 부품까지 넉넉히 배정받았다.",
          stats: { Int: 6, Inf: 6, Fel: 2 }
        }
      },
      {
        label: "[지성 판정] 장인들 앞에서 수공예 라스건과 냉각 장치를 직접 분해하고 재조립해 정비 실력을 증명한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "황동 나사 하나 흠집 내지 않고 완벽히 재조립하자 공장 안에 감탄의 탄성이 퍼졌다! 장인 원로가 흡족하게 웃으며 최상급 무기를 인도했다.",
          stats: { Int: 6, BS: 4, Inf: 5 }
        },
        fail: {
          text: "생소한 보스트로야식 수동 잠금장치를 다루다 부품을 긁어 버려, 길드의 매서운 질책 속에 납품 일정이 며칠이나 지연되었다.",
          stats: { Inf: -4, Int: 2 }
        }
      },
      {
        label: "[교섭 판정] 보스트로야 장인들의 만 년 명예를 치켜세우고 전선에서 이 무기들이 얼마나 절실한지 정중히 설득한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "진심 어린 경의에 마음이 누그러진 장인 길드가 서명을 마치고, 전선에서 쓸 수 있는 맞춤형 정비 지침서까지 함께 챙겨 주었다.",
          stats: { Fel: 6, Inf: 5 }
        },
        fail: {
          text: "설득이 아첨으로 비치며 오히려 장인들의 반발을 샀고, 한참을 눈보라 속 검수장 밖에서 기다린 뒤에야 일반 규격품만 겨우 수령했다.",
          wounds: -8,
          stats: { Fel: -2, Inf: -3 }
        }
      },
      {
        label: "고급 공예 화기 인수 권한을 현지 보급 장교에게 일임하고 표준 규격 탄약과 예비 부품만 절차대로 확인한다",
        effect: {
          text: "큰 성과는 없었지만 군수 사고 없이 무사히 보급 인수를 마치고 보스트로야 공업 길드의 까다로운 기풍을 익혔다.",
          stats: { Int: 3, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Vostroya / Codex: Imperial Guard"
  },
  {
    id: "ev_s15_fr_vostroya_2",
    title: "보스트로야 — 눈보라 속 장갑 증기 철도 탈선 위기와 파괴 공작",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 보스트로야",
    weight: 31,
    text: "얼어붙은 하이브와 외곽 용광로를 잇는 보스트로야의 거대한 장갑 증기 철도. 매서운 눈보라를 가르며 전선용 탄약을 싣고 달리던 열차가 급정거했다. 선로 전환기 아래에 폭약이 설치되어 있고, 설원 능선 너머에서 파괴 공작원들이 불빛을 끄고 접근하는 기척이 포착되었다.",
    choices: [
      {
        label: "[치안·심문·커미사르 전용] 호위 병력을 즉각 산개시켜 공작원들의 퇴로를 차단하고 배후 심문용 생포 작전을 지휘한다",
        req: { anyTags: ["arbites", "inquisitor", "inquisition_agent", "commissar", "lord_commissar"] },
        effect: {
          text: "기민한 포위망에 걸린 공작원들을 산 채로 붙잡아 선로 파괴 음모의 배후까지 캐냈다! 철도청과 행성 수비대의 두터운 신임을 얻었다.",
          stats: { Int: 5, Inf: 7, WP: 3 }
        }
      },
      {
        label: "[사격 판정] 장갑 화차 지붕에 올라 눈보라 속 섬광을 추적하며 공작원 저격수와 기폭 요원을 제압한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "폭약에 불을 붙이려던 공작원을 정확한 사격으로 쓰러뜨렸다! 나머지 침입자들이 설원 너머로 도주하며 보급 열차가 무사히 살아남았다.",
          stats: { BS: 6, Ag: 3, Inf: 5 }
        },
        fail: {
          text: "적의 반격 탄환에 어깨를 스치고 눈보라 속에 시야를 잃어 선로 일부가 폭파되고 말았다.",
          wounds: -18,
          stats: { Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 혹한 속에 꽁꽁 언 선로 전환기 밑으로 기어들어 폭발물의 신관 배선을 침착하게 해체한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "손끝이 얼어붙는 악조건에서도 주 도화선과 보조 뇌관을 깔끔하게 끊어 냈다! 열차가 굉음을 내며 다시 출발했다.",
          stats: { Int: 6, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "보조 뇌관이 먼저 터지며 파편과 화염에 휩쓸려 화상과 타박상을 입었다.",
          wounds: -20,
          stats: { T: 2 }
        }
      },
      {
        label: "열차 기관실과 연계해 비상 경적과 조명탄을 쏘아 올려 인근 방위 초소에 즉각 증원을 요청한다",
        effect: {
          text: "신호를 본 인근 장갑 순찰대가 신속히 출동해 공작원들을 몰아냈고, 열차는 지연 끝에 무사히 보급을 마쳤다.",
          stats: { WP: 3, Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Vostroya / Rebel Winter"
  },
  {
    id: "ev_s15_fr_vostroya_3",
    title: "보스트로야 — 붉은 외투의 퍼스트본 귀환병과 탄약고 화재",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["vostroya"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 보스트로야",
    weight: 32,
    text: "변방 전선에서 수많은 전투를 치르고 보충병 인솔차 잠시 돌아온 붉은 외투와 곰털 모자의 보스트로얀 퍼스트본 베테랑들과 함께 보급창 야간 경계에 섰다. 바로 그때, 과열된 난방 보일러가 터지며 불길이 인접한 포탄 및 프로메튬 저장고로 번지기 시작했다!",
    choices: [
      {
        label: "[군·장교 전용] 보스트로얀 퍼스트본 베테랑들과 호흡을 맞춰 구역별 방화벽 폐쇄와 탄약 반출 대열을 일사불란하게 지휘한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "commissar", "lord_commissar"] },
        effect: {
          text: "숙련된 전선 지휘 솜씨 덕분에 연쇄 폭발을 완벽히 막아 냈다. 베테랑 하사관이 전우의 증표로 황동 문장이 새겨진 아마섹 술병을 건네며 경의를 표했다.",
          stats: { Fel: 5, Inf: 6, WP: 4 }
        }
      },
      {
        label: "[강인 판정] 매캐한 연기와 열기를 뚫고 들어가 과열된 프로메튬 통을 눈밭 밖으로 직접 굴려 낸다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "팔뚝에 그을음이 앉도록 버텨 내며 핵심 연료통을 격리했다! 보스트로얀 퍼스트본 병사들이 그대의 담력에 박수를 보냈다.",
          stats: { T: 6, WS: 3, Inf: 5 }
        },
        fail: {
          text: "터져 나온 고온 증기에 팔과 얼굴을 데었다. 다행히 대폭발은 면했으나 한동안 의무 치료를 받아야 했다.",
          wounds: -20,
          stats: { WP: 2 }
        }
      },
      {
        label: "[의지 판정] 화염 앞에서 동요하는 신병들을 다잡아 소화 포말 분사기와 모래 포대 투입선을 끝까지 유지한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "흔들리지 않는 구령 아래 신병과 베테랑이 하나 되어 불길을 잡았다. 그날 밤 모닥불 곁에서 퍼스트본의 전선 경험담을 값지게 배웠다.",
          stats: { WP: 6, Fel: 4, Inf: 4 },
          faith: 4
        },
        fail: {
          text: "소폭발의 충격파에 밀려 넘어지며 연기를 심하게 들이마셨고, 저장고 한쪽 탄약 상자가 소실되었다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "규정에 따라 즉시 대피 경보를 울리고 안전선 바깥으로 장병들과 차량을 신속히 철수시킨다",
        effect: {
          text: "저장고 일부는 불탔지만 인명 피해 없이 사태를 수습해 지휘부의 합리적인 평가를 받았다.",
          stats: { Int: 3, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Vostroyan Firstborn / Codex: Astra Militarum"
  },
  {
    id: "ev_s15_fr_tanith_1",
    title: "타니스 — 움직이는 날우드 숲에 갇힌 외지 파견대와 정찰병",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      maxYear: 764,
      anyWorlds: ["tanith"],
      excludeHomeWorlds: ["tanith"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 타니스 · 외지 파견 · 765.M41 이전",
    weight: 34,
    text: "타니스의 전설적인 날우드 거목들이 밤사이 뿌리를 옮기면서 어제 표시해 둔 정찰로가 감쪽같이 사라졌다. 짙은 안개 속에서 나침반마저 시시각각 변하는 지형 탓에 소용없어진 순간, 덤불 뒤에서 위장망토를 두른 타니스 현지 정찰병이 은빛 단검을 손에 쥔 채 소리 없이 모습을 드러냈다.",
    choices: [
      {
        label: "[군·함대·개척상인 전용] 현지 정찰병에게 제국 표준 수송 경로 대조를 요청하며 상호 협력을 정중히 제안한다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "navy", "rogue_trader"] },
        effect: {
          text: "외지인답지 않게 타니스 숲의 법칙을 존중하는 태도에 정찰병이 미소 지으며 앞장섰다. 안전히 외곽 임도로 복귀해 귀중한 삼림 지형도를 얻었다.",
          stats: { Fel: 5, Int: 4, Ag: 3 }
        }
      },
      {
        label: "[교섭 판정] 무기를 내리고 솔직히 길을 잃었음을 인정하며, 타니스 정찰병에게 길 안내와 숲의 지혜를 청한다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "정찰병이 백파이프 가락을 낮게 흥얼거리며 이동하는 나무들의 바람길을 짚어 주었다. 해 질 녘 무사히 숙영지에 닿아 깊은 우정을 나누었다.",
          stats: { Fel: 6, Ag: 4, WP: 3 }
        },
        fail: {
          text: "말투가 오만하게 들려 정찰병이 대충 큰 방향만 일러 주고 안개 속으로 사라져 버렸다. 가시덤불을 헤치며 밤새 고생해 몸이 만신창이가 되었다.",
          wounds: -12,
          stats: { Fel: -2 }
        }
      },
      {
        label: "[지성 판정] 햇빛이 스미는 수관 방향과 이끼 분포를 기록해 정찰병의 조언과 대조하며 스스로 탈출 경로를 계산한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "날우드 숲의 이동 주기를 체계적으로 파악해 정확히 계곡 하류로 빠져나왔다! 타니스 정찰병마저 외지인의 관찰력에 감탄했다.",
          stats: { Int: 6, Ag: 4, Inf: 4 }
        },
        fail: {
          text: "판독 착오로 늪지대에 발이 빠져 장비를 적시고 심한 탈진과 찰과상을 입은 뒤에야 정찰병의 도움으로 빠져나왔다.",
          wounds: -14,
          stats: { Int: 2 }
        }
      },
      {
        label: "섣불리 숲속을 헤매지 않고 정찰병의 지시대로 제자리에 야영하며 날이 밝고 안개가 걷히기를 기다린다",
        effect: {
          text: "안개가 걷힌 아침, 정찰병이 남겨 둔 나무 껍질 표식을 따라 무사히 본대로 귀환할 수 있었다.",
          stats: { WP: 3, Ag: 2 }
        }
      }
    ],
    source: "Lexicanum: Tanith / Gaunt's Ghosts: First and Only"
  },
  {
    id: "ev_s15_fr_tanith_2",
    title: "타니스 — 안개 계곡의 날우드 목재 십일조 호송과 밀수단 습격",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      maxYear: 764,
      anyWorlds: ["tanith"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 타니스 · 765.M41 이전",
    weight: 34,
    text: "타니스의 핵심 제국 십일조인 최고급 날우드 원목을 우주공항으로 운반하는 수송 마차 행렬이 짙은 안개 계곡에 들어섰다. 바로 그 순간, 값비싼 날우드 목재를 노린 무장 밀수업자 무리가 협곡 위 나무 그늘에서 사격을 퍼부으며 호송대를 포위해 왔다!",
    choices: [
      {
        label: "[치안·행정·심문소 전용] 십일조 약탈은 제국 중죄임을 확성기로 선포하고 호송 경비대의 반격과 밀수단 색출을 주도한다",
        req: { anyTags: ["arbites", "administratum", "inquisition_agent", "inquisitor"] },
        effect: {
          text: "제국 권위의 위엄과 정확한 포위 지시에 밀수단의 사기가 꺾여 투항자가 속출했다. 날우드 목재 십일조를 온전히 우주공항까지 지켜 냈다.",
          stats: { Inf: 7, Int: 4, Fel: 3 }
        }
      },
      {
        label: "[민첩 판정] 안개와 거목 줄기 사이로 은밀히 우회해 협곡 위 밀수업자들의 측면을 기습한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "소리 없이 등 뒤로 파고들어 지휘관을 제압하자 밀수단이 순식간에 무너졌다! 현지 수송 감독관이 타니스산 은빛 장식 단검을 답례로 전했다.",
          stats: { Ag: 6, WS: 4, Inf: 5 }
        },
        fail: {
          text: "젖은 낙엽에 미끄러지며 위치를 들켜 산탄 파편에 다리를 다쳤다.",
          wounds: -18,
          stats: { Ag: 2 }
        }
      },
      {
        label: "[사격 판정] 거대한 날우드 통나무 수레 뒤에 몸을 숨기고 안개 속 총구 화염을 겨냥해 정밀 응사한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "침착한 저격으로 밀수단 사수들을 차례로 무력화해 호송 행렬의 돌파구를 열었다!",
          stats: { BS: 6, WP: 4, Inf: 4 }
        },
        fail: {
          text: "빗발치는 총탄에 나무 파편이 튀어 얼굴과 어깨를 다쳤고, 수레 한 대의 목재가 불길에 손상되었다.",
          wounds: -14,
          stats: { Inf: -3 }
        }
      },
      {
        label: "수송 마부들을 엄호하며 전속력으로 안개 계곡을 빠져나가 가장 가까운 방위군 검문소로 직행한다",
        effect: {
          text: "일부 짐수레가 훼손되었으나 인명 피해 없이 핵심 십일조 목재를 무사히 검문소 안으로 옮겨 놓았다.",
          stats: { Ag: 3, WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Tanith / Nalwood / Gaunt's Ghosts"
  },
  {
    id: "ev_s15_fr_tanith_3",
    title: "타니스 — 타니스 마그나 외곽 민병대 야간 사격과 위장망토 시험",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      maxYear: 764,
      anyWorlds: ["tanith"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 타니스 · 765.M41 이전",
    weight: 34,
    text: "수도 타니스 마그나 시 외곽의 깊은 밤숲 훈련장에서 타니스 민병대와 합동 야간 사격 훈련이 열렸다. 빛과 그림자에 맞춰 무늬가 흐려지는 신형 위장망토를 두른 교관이 어둠 속으로 스며든 뒤, 실전과 다름없는 모의 침투와 야간 사격 시험을 선포했다.",
    choices: [
      {
        label: "[군·장교 전용] 제국 방위 교리와 타니스식 산병 위장 전술을 결합한 합동 기동 계획을 세워 훈련을 완벽히 이끈다",
        req: { anyTags: ["militarum", "imperial_military", "officer", "commissar", "lord_commissar"] },
        effect: {
          text: "타니스 민병대 지휘관들이 제국 정규군의 규율과 숲의 은신술이 절묘하게 어우러졌다며 극찬했다. 사격술과 야전 지휘 감각이 한층 날카로워졌다.",
          stats: { BS: 5, Ag: 4, Inf: 5 }
        }
      },
      {
        label: "[사격 판정] 안개와 나뭇잎 흔들림만으로 어둠 속 위장 표적의 위치를 간파해 단발 정밀 사격을 퍼붓는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "거의 보이지 않는 야간 표적들을 한 치의 오차도 없이 명중시켰다! 타니스 민병대 사수들이 혀를 내두르며 경의를 표했다.",
          stats: { BS: 7, Int: 3, Inf: 4 }
        },
        fail: {
          text: "위장망토의 착시에 속아 헛발을 쏘는 사이 모의 침투 조에게 불의의 일격을 맞아 타박상을 입고 자존심을 구겼다.",
          wounds: -10,
          stats: { Inf: -2 }
        }
      },
      {
        label: "[민첩 판정] 직접 위장망토를 둘러쓰고 숨소리까지 죽인 채 민병대 감시망을 뚫고 지휘 천막에 표식을 남긴다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "노련한 타니스 정찰병들마저 눈치채지 못할 만큼 완벽히 숲에 녹아들었다! 훈련이 끝난 뒤 백파이프 연주 속에 뜨거운 환대를 받았다.",
          stats: { Ag: 7, WP: 4, Inf: 4 }
        },
        fail: {
          text: "젖은 나무뿌리에 발이 걸려 덤불 아래로 구르며 발목을 삐고 말았다.",
          wounds: -12,
          stats: { Ag: 2 }
        }
      },
      {
        label: "훈련 교관의 지시에 따라 위장망토 관리법과 야간 방위 표식 판독법을 차근차근 익힌다",
        effect: {
          text: "화려한 기록은 남기지 못했으나, 어둠과 숲 속에서 살아남는 타니스 특유의 정찰 기초를 탄탄히 다졌다.",
          stats: { Ag: 3, BS: 3 }
        }
      }
    ],
    source: "Lexicanum: Tanith / Tanith Magna / Gaunt's Ghosts: First and Only"
  },
  {
    id: "ev_s15_fr_ophelia7_1",
    title: "오펠리아 VII — 궤도 순례선 검역과 위조 성유물 단속",
    category: "파견 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeHomeWorlds: ["ophelia7"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 오펠리아 VII · 외지 파견",
    weight: 32,
    text: "세그멘툼 템페스투스의 대성지 오펠리아 VII 궤도 정거장은 매일 수십만 명의 순례자와 외지 파견선이 몰려드는 관문이다. 상륙 검역을 기다리던 중, 바로 옆 승객 구역에서 가짜 성인 유골함과 불경한 부적을 밀반입하던 위조 성유물 상단이 국교 심문대의 검문에 걸리며 순식간에 구역 전체가 봉쇄되었다.",
    choices: [
      {
        label: "[심문·치안·국교 전용] 검역 당국에 신분을 밝히고 화물 목록을 대조해 위조 성유물 밀수망의 주모자를 즉각 지목한다",
        req: { anyTags: ["inquisitor", "inquisition_agent", "arbites", "sororitas", "ecclesiarchy"] },
        effect: {
          text: "불경한 위조품과 숨겨진 이단 문서를 한꺼번에 압수하는 데 결정적인 공을 세웠다! 오펠리아 VII 성지 입국 우선 통행권과 축복장을 수여받았다.",
          stats: { Int: 5, Inf: 6, WP: 3 },
          faith: 10
        }
      },
      {
        label: "[지성 판정] 궤도 검역관 곁에서 압수된 유골함의 봉랍과 성구 오탈자를 짚어 내 진짜와 위조품을 가려낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "교묘한 위조 수법을 명쾌히 입증해 억울한 순례자들의 혐의를 벗기고 밀수꾼만 정확히 색출했다! 성지 관료들의 깊은 신뢰를 얻었다.",
          stats: { Int: 6, Fel: 3, Inf: 5 },
          faith: 6
        },
        fail: {
          text: "성급한 판별이 빗나가 진품 성유물에 흠집을 낼 뻔했고, 불경 혐의를 벗기 위해 사흘간 격리 심문과 태형 참회를 치러야 했다.",
          wounds: -12,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[교섭 판정] 봉쇄 소동에 동요하는 외지 순례자들을 진정시키고 검역 절차가 질서 있게 진행되도록 중재한다",
        check: { stat: "Fel", diff: 5 },
        success: {
          text: "압사 사고와 폭동을 미연에 막아 내어 궤도 검역 사령관의 감사를 받고 빠른 상륙 허가를 얻어 냈다.",
          stats: { Fel: 6, WP: 3, Inf: 4 },
          faith: 5
        },
        fail: {
          text: "격앙된 인파와 밀수단 공범들이 일으킨 소동에 떠밀려 넘어지며 큰 타박상을 입었다.",
          wounds: -14,
          stats: { Fel: -2 }
        }
      },
      {
        label: "지정된 검역 대기선에 무릎을 꿇고 묵묵히 아퀼라 성호를 올리며 모든 소지품 검사를 순순히 받는다",
        effect: {
          text: "오랜 대기 끝에 결백을 인정받고 황금 대성당이 빛나는 오펠리아 VII 지표면으로 무사히 내려섰다.",
          stats: { WP: 3 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Ophelia VII / Ecclesiarchy"
  },
  {
    id: "ev_s15_fr_ophelia7_2",
    title: "오펠리아 VII — 시노드 미니스트라 재무 서고 감사와 부패 색출",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 오펠리아 VII",
    weight: 31,
    text: "국교 의회 시노드 미니스트라 산하의 거대한 대리석 재무 서고. 수백 개 성계의 신앙 십일조 장부가 쌓인 이곳에 호위 및 감사 지원 인원으로 배치되었다. 그런데 야간 장부 대조 도중, 전선 보급용 성지 기금을 빼돌려 사치품으로 돌린 고위 부제의 이중 장부와 은밀한 매수 시도가 포착되었다.",
    choices: [
      {
        label: "[행정·치안·심문·귀족 전용] 회계 장부의 누락 항목과 인장 위조 흔적을 완벽히 묶어 시노드 감사관에게 직보한다",
        req: { anyTags: ["administratum", "arbites", "inquisitor", "inquisition_agent", "noble"] },
        effect: {
          text: "꼼짝없는 증거 앞에 부패한 부제와 결탁 상인들이 전원 체포되었다! 시노드 미니스트라 감사단이 정직함과 통찰을 높이 기렸다.",
          stats: { Int: 6, Inf: 7, WP: 3 },
          faith: 8
        }
      },
      {
        label: "[지성 판정] 촛불 아래 양피지 수백 권을 대조해 숨겨진 암호 장부와 자금 유출 경로를 끝까지 추적한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "십일조 누락액을 한 푼까지 정확히 계산해 내어 부패 조직을 일망타진했다! 추기경단 서기국이 특별 포상을 내렸다.",
          stats: { Int: 7, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "증거를 모으던 중 눈치챈 부제의 사병들에게 서고 복도에서 습격당해 깊은 상처를 입고 일부 장부를 빼앗겼다.",
          wounds: -16,
          stats: { Inf: -3 }
        }
      },
      {
        label: "[의지 판정] 달콤한 뇌물과 승진 약속을 단호히 물리치고 부패 성직자의 죄상을 대성당 법정에 고발한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "황제의 이름으로 외친 고발에 서고 경비대가 즉각 움직여 부패한 부제를 결박했다! 꺾이지 않는 청렴함이 성지 전역에 회자되었다.",
          stats: { WP: 6, Inf: 5 },
          faith: 12
        },
        fail: {
          text: "부패 부제의 교묘한 모함에 휘말려 맞고소를 당했고, 결백이 밝혀지기까지 징벌방에서 채찍질과 고초를 겪었다.",
          wounds: -14,
          stats: { Inf: -4 },
          faith: 4
        }
      },
      {
        label: "사적인 대립을 피하고 감사 규정대로 이상 징후 기록만 밀봉해 시노드 공식 우편함에 접수한다",
        effect: {
          text: "몇 주 뒤 조용히 부제가 경질되었다는 소식이 들려왔고, 그대는 화를 입지 않고 서고 임무를 마쳤다.",
          stats: { Int: 3, WP: 3 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Ophelia VII / Synod Ministra / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s15_fr_ophelia7_3",
    title: "오펠리아 VII — 호스피탈러 야전 치유소의 순례자 역병 봉쇄",
    category: "행성 고유",
    once: true,
    req: {
      minAge: 14,
      anyWorlds: ["ophelia7"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "sector_lord", "planetary_governor", "fabricator_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "행성: 오펠리아 VII",
    weight: 34,
    text: "콘벤트 상크토룸 외곽의 거대한 순례자 야영지에 아뎁타 소로리타스 호스피탈러 수녀회의 야전 치유소가 급히 세워졌다. 수백만 순례자 인파 사이에서 고열과 검은 반점을 일으키는 정체불명의 역병이 번지기 시작한 것이다. 불경한 워프 역병인지 단순한 항해 풍토병인지 판별하고 확산을 막지 못하면 성지 전체가 마비될 위기다.",
    choices: [
      {
        label: "[소로리타스·국교회 전용] 호스피탈러 치유 수녀들과 함께 격리 성역을 선포하고 성유와 정화 의례로 오염원을 봉쇄한다",
        req: { anyTags: ["sororitas", "ecclesiarchy"] },
        effect: {
          text: "흔들림 없는 신앙과 엄격한 격리 집행으로 역병의 번짐을 조기에 차단했다! 호스피탈러 수녀 원장이 순례자들을 지켜 낸 헌신에 깊은 축복을 내렸다.",
          stats: { WP: 6, Int: 4, Inf: 7 },
          faith: 14,
          corruption: -6
        }
      },
      {
        label: "[지성 판정] 환자 기록과 식수 공급로를 샅샅이 역학 추적해 최초 감염원과 전파 경로를 밝혀낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "오염된 하역장 저수조와 역병 매개 화물을 정확히 찾아내어 대유행을 원천 차단했다! 메디카에 학자들과 수녀회가 그대의 통찰에 찬사를 보냈다.",
          stats: { Int: 7, WP: 3, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "표본을 채취하던 도중 오염된 식수 비말을 들이마셔 고열에 시달렸고, 며칠간 격리 병동에서 혹독한 해독 치료를 받아야 했다.",
          wounds: -16,
          corruption: 4
        }
      },
      {
        label: "[강인 판정] 방독면과 향로만 의지한 채 야전 치유소 안으로 들어가 환자 이송과 의약품 보급을 온몸으로 지원한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "밤낮없는 고된 간호와 방호 지원 끝에도 끝내 쓰러지지 않고 수많은 순례자의 목숨을 건져 냈다. 수녀회가 정화의 인장과 높은 신망을 안겨 주었다.",
          stats: { T: 6, WP: 4, Inf: 5 },
          faith: 10
        },
        fail: {
          text: "극심한 과로와 독기 탓에 열병에 감염되어 사경을 헤매다 호스피탈러 수녀들의 응급 시술로 간신히 목숨을 건졌다.",
          wounds: -20,
          stats: { T: -2 }
        }
      },
      {
        label: "치유소 외곽 경계선에 방역 표식을 세우고 격리선 안팎의 출입을 엄격히 통제해 추가 확산을 막는다",
        effect: {
          text: "질서 정연한 경계선 봉쇄 덕분에 성지 중심부로 역병이 번지지 않고 무사히 사태가 진정되었다.",
          stats: { WP: 3, Int: 3 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Orders Hospitaller / Ophelia VII / Codex: Adepta Sororitas"
  }
];
