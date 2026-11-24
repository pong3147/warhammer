// 분기 사건 — 옵스쿠루스 · 템페스투스 · 파시피쿠스 행성 고유 (카디아 · 펜리스 · 보스트로야 · 크리그 · 오펠리아 VII · 타니스 / 향후 행성별 단독 승격 가능)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
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
    id: "ev_cadia_pylon_hum",
    title: "카디아 — 고대 블랙스톤 파일런의 기이한 정적",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["cadia"] },
    reqLabel: "행성: 카디아",
    weight: 26,
    text: "카디아 평원 한복판에 솟은 정체불명의 고대 검은 석주(파일런) 근처를 순찰하던 중, 갑자기 세상의 모든 소리가 기묘하게 먹먹해지고 가슴속에서 알 수 없는 공허감이 차오른다. 공포의 눈을 막아 주는 수수께끼의 유물이다.",
    choices: [
      {
        label: "[사이커 전용] 워프 차단 장막의 극심한 두통을 의지로 견뎌 낸다",
        req: { allTags: ["psyker"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "사이킥 능력이 잠시 봉인되는 고통을 이겨 내며 오히려 오염이 씻겨 나가는 기이한 정화를 겪었다!",
          stats: { WP: 6 },
          corruption: -12
        },
        fail: {
          text: "극심한 편두통과 구토에 시달리며 의무실로 후송되었다.",
          wounds: -18
        }
      },
      {
        label: "[지성 판정] 석주 표면의 기하학적 외계 문양을 유심히 관찰해 기록한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "이 석주들이 무너지면 은하계 전체가 워프에 삼켜지리라는 불길한 직감을 얻었다.",
          stats: { Int: 5, WP: 3 }
        },
        fail: {
          text: "알 수 없는 공허감과 무기력에 빠져 사흘간 앓아누웠다.",
          wounds: -10
        }
      },
      {
        label: "기분 나쁜 고대 물건이다. 발걸음을 재촉해 순찰을 마친다",
        effect: {
          text: "카디아 병사에게 중요한 것은 석주의 정체가 아니라 적을 향해 쏠 라스건뿐이다.",
          stats: { WP: 3 }
        }
      }
    ],
    source: "Lexicanum: Cadian Pylons / Fall of Cadia"
  },
  {
    id: "ev_krieg_surface_march",
    title: "크리그 — 지상 방사능 황무지의 실전 행군",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["krieg"] },
    reqLabel: "행성: 크리그",
    weight: 26,
    text: "지하 벙커의 육중한 방폭문이 열리고, 잿빛 핵겨울과 방사능 진흙탕이 끝없이 펼쳐진 크리그 지상으로 120km 강행군이 선포되었다. 방독면 필터 수명은 딱 48시간뿐이다.",
    choices: [
      {
        label: "[강인 판정] 거친 숨을 고르며 단 한 번도 대열에서 이탈하지 않고 완주한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "방사능 폭풍을 맨몸으로 뚫고 대열 선두로 귀환했다! 진정한 크리그의 강철 육체로 거듭났다.",
          stats: { T: 6, WP: 5 },
          faith: 6
        },
        fail: {
          text: "필터 균열로 방사능 먼지를 들이마셔 피를 토했으나 끝까지 기어 돌아왔다.",
          wounds: -22,
          stats: { T: 3 }
        }
      },
      {
        label: "[의지 판정] 쓰러진 동료의 군장과 탄약까지 짊어지고 묵묵히 행진한다",
        check: { stat: "WP", diff: 5 },
        success: {
          text: "장비 손실률 0%! 크리그 장교에게 '가장 효율적인 속죄의 도구'라는 최고의 찬사를 들었다.",
          stats: { WP: 5, T: 4, Inf: 4 }
        },
        fail: {
          text: "과중한 무게에 무릎 인대가 상해 의무동으로 옮겨졌다.",
          wounds: -18
        }
      }
    ],
    source: "Lexicanum: Krieg"
  },
  {
    id: "ev_fenris_kraken",
    title: "펜리스 — 빙하 해빙기와 거대 바다 괴수 크라켄",
    category: "행성 고유",
    req: { minAge: 14, anyWorlds: ["fenris"] },
    reqLabel: "행성: 펜리스",
    weight: 26,
    text: "얼음 바다가 갈라지며 섬만 한 거대 바다 괴수 '펜리스 크라켄'의 촉수가 부족의 용선(Longship)을 휘감았다! 차가운 파도 속에서 전사들의 용기가 시험대에 오른다.",
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
    req: { minAge: 14, anyWorlds: ["vostroya"], excludeTags: ["astartes", "custodes", "grey_knight"] },
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
          text: "이별의 슬픔은 쉽게 가시지 않았으나, 묵묵히 배웅하며 보스트로야의 의무를 되새겼다.",
          stats: { WP: 3 }
        }
      },
      {
        label: "눈보라 속 교대 근무를 성실히 마치고 보스트로얀 퍼스트본 연대의 무운을 기원한다",
        effect: {
          text: "혹한과 쇳가루 속에서도 보스트로야의 맹세는 천 년째 꺾이지 않는다.",
          stats: { T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Vostroya / Vostroyan Firstborn"
  },
  {
    id: "ev_s3_world_tanith_nalwood",
    title: "타니스 — 움직이는 날우드(Nalwood) 숲의 길잡이",
    category: "행성 고유",
    once: true,
    req: { minAge: 12, maxYear: 764, anyWorlds: ["tanith"], excludeTags: ["astartes", "custodes"] },
    reqLabel: "행성: 타니스 (765.M41 멸망 이전)",
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
    req: { minAge: 14, anyWorlds: ["ophelia7"], excludeTags: ["heretic", "chaos_aligned"] },
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
  }
);
