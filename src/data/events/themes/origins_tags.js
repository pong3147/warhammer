// 분기 사건 — 특수 출신 · 선천 자질 · 명예/전역 태그 연작 (22종)
export default [
  {
    id: "ev_blank_recruit",
    title: "영혼 없는 자를 찾는 검은 인장",
    category: "특수",
    once: true,
    req: {
      minAge: 16,
      allTags: ["blank"],
      excludeTags: [
        "inquisition_agent", "interrogator_rank", "inquisitor", "lord_inquisitor",
        "astartes", "custodes", "grey_knight", "dreadnought", "sister_of_silence",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "general_rank",
        "commissar_general", "lord_commissar", "navy_admiral", "cardinal", "canoness",
        "celestian", "magos", "fabricator_locum", "fabricator_general",
        "rogue_trader", "rt_lord_captain", "arbites_marshal", "departmento_head",
        "tempestus_prime", "psyker_primaris",
        "assassin", "grand_master_assassins", "living_saint", "saint_vessel"
      ]
    },
    reqLabel: "자질: 블랭크 · 16세+",
    weight: 28,
    text: "평생 주변 사람들에게 이유 없는 혐오를 받아 왔던 그대 앞에, 로제트를 품은 오르도 말레우스 이단심문관이 나타났다. '워프의 괴물들 앞에서 흔들리지 않는 너의 공허한 영혼은 제국의 가장 귀한 무기다. 나와 함께하겠느냐?'",
    choices: [
      {
        label: "[이단심문소 합류] 이단심문관의 제안을 수락해 이단심문소 어콜라이트가 된다",
        req: {
          excludeTags: [
            "inquisition_agent", "interrogator_rank", "inquisitor", "lord_inquisitor",
            "astartes", "custodes", "grey_knight", "dreadnought", "sister_of_silence",
            "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
            "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "general_rank",
            "commissar_general", "lord_commissar", "commissar", "navy_admiral", "navy_captain",
            "cardinal", "confessor", "canoness", "celestian", "sororitas",
            "magos", "fabricator_locum", "fabricator_general", "tech_priest", "skitarii_marshal",
            "rogue_trader", "rt_lord_captain", "rt_seneschal", "arbites_marshal", "arbites_judge",
            "departmento_head", "admin_prefect", "tempestus_prime", "scion", "officer",
            "guild_magnate", "crime_lord", "sanctioned_psyker", "psyker_primaris",
            "navigator", "navis_officer", "nav_novator", "paternoval_envoy",
            "imperial_knight", "knight_scion", "knight_high_king", "abhuman",
            "assassin", "grand_master_assassins", "living_saint", "saint_vessel"
          ]
        },
        effect: {
          text: "평생의 저주였던 블랭크 체질이 최고의 축복으로 바뀌었다! 악마와 이단 사냥꾼의 길에 들어섰다.",
          forceCareer: "inquisition_acolyte",
          stats: { WP: 8, Int: 5, Inf: 12 },
          addTags: ["inquisition_agent", "daemon_bane"]
        }
      },
      {
        label: "지금 맡은 본분과 삶의 자리를 지키겠다며 정중히 거절한다",
        effect: {
          text: "이단심문관은 아쉬운 눈빛으로 고개를 끄덕이더니, 훗날 워프의 위협을 마주하면 사용하라며 비밀 연락 암호만 남기고 떠났다.",
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
    req: {
      minAge: 16,
      allTags: ["ogryn"],
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "자질: 오그린 · 아스트라 밀리타룸",
    weight: 18,
    text: "적의 중화기 진지가 아군 소대를 향해 맹렬히 불을 뿜고 있다! 빗발치는 탄막에 일반 병사들이 참호 바닥에 엎드려 고개를 들지 못하는 사이, 커미사르가 손가락으로 벙커를 가리키며 우렁차게 외친다. '저기 나쁜 놈들을 치워라, 황제 폐하께서 보신다!'",
    choices: [
      {
        label: "[강인 판정] 리퍼 건을 쏘며 벙커 벽을 맨몸으로 들이받아 부순다",
        check: { stat: "T", diff: 10 },
        success: {
          text: "철근 콘크리트 벽을 어깨로 뚫고 들어가 적을 전부 날려 버렸다! 커미사르가 특대형 배급과 빛나는 공로 훈장을 가슴에 달아 주었다.",
          stats: { T: 6, WS: 6, Inf: 6 },
          faith: 10, align: { dogmatic: 5 }
        },
        fail: {
          text: "총탄을 수십 발 맞고 쓰러졌지만 튼튼한 가죽 덕분에 며칠 만에 벌떡 일어났다.",
          wounds: -20,
          stats: { T: 4 }
        }
      },
      {
        label: "커미사르와 작은 전우들 앞을 거대한 몸으로 가로막고 리퍼 건으로 제압 사격을 퍼붓는다",
        effect: {
          text: "적탄이 두꺼운 장갑과 어깨를 때렸지만 한 걸음도 물러서지 않았다! 그 사이 소대가 무사히 우회해 적 벙커를 폭파했다.",
          wounds: -10,
          stats: { T: 4, WP: 4 },
          faith: 6, align: { humane: 7 }
        }
      }
    ],
    source: "Lexicanum: Ogryn / Codex: Astra Militarum"
  },
  {
    id: "ev_arc_penal_redemption",
    title: "징벌 연대의 속죄 — 폭발 목걸이를 찬 최전선 돌격",
    category: "군사",
    once: true,
    req: {
      allTags: ["penal_mark"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "inquisitor", "lord_inquisitor", "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster", "general_rank",
        "commissar_general", "lord_commissar", "navy_admiral", "cardinal", "canoness",
        "magos", "fabricator_locum", "fabricator_general", "rt_lord_captain",
        "arbites_marshal", "departmento_head"
      ]
    },
    reqLabel: "이력: 징벌 부대 낙인",
    weight: 38,
    text: "목덜미에 채워진 징벌 부대 폭발 목걸이가 차갑게 빛난다. 지휘관은 지뢰밭 너머 적 중화기 벙커를 가리키며 외친다. '저 진지를 날려 버리고 살아 돌아오는 자에게는 황제의 사면을 내린다. 뒤돌아서는 자는 목이 날아갈 뿐이다!'",
    choices: [
      {
        label: "[백병 판정] 포연을 뚫고 적 벙커 총안에 수류탄을 꽂아 넣어 전과로 당당히 사면장을 쟁취한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "지옥 같은 탄막을 돌파해 벙커를 폭파시켰다! 커미사르가 직접 폭발 목걸이를 풀어 주며 '황제께서 네 죄를 씻으셨다'고 선언했다.",
          stats: { WS: 7, T: 6, Inf: 8 },
          faith: 8
        },
        fail: {
          text: "철조망과 파편에 온몸이 찢겼으나, 죽을힘으로 벙커를 무력화한 공을 인정받아 목숨만은 건졌다.",
          wounds: -24,
          stats: { T: 4 }
        }
      },
      {
        label: "[민첩 판정] 정면 돌격 대신 무너진 배수로를 기어 우회해 적 탄약고를 폭파하고 생환한다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "단 한 발의 총탄도 맞지 않고 적의 후방 탄약고를 날려 버렸다! 징벌병들 사이에서 살아남는 귀신으로 통하게 되었다.",
          stats: { Ag: 7, BS: 5, Inf: 5 }
        },
        fail: {
          text: "배수로 천장이 포격에 무너져 내려 큰 타박상을 입은 채 겨우 아군 참호로 기어 돌아왔다.",
          wounds: -20,
          stats: { Ag: 2 }
        }
      },
      {
        label: "폭발 목걸이가 작동하지 않도록 명령대로 최전선 탄약 상자를 나르며 묵묵히 하루를 버틴다",
        effect: {
          text: "화려한 사면은 얻지 못했으나, 수많은 징벌병이 쓰러지는 포화 속에서 오늘도 살아남았다.",
          stats: { T: 5, WP: 4 },
          wounds: -10
        }
      }
    ],
    source: "Lexicanum: Penal Legion / Last Chancers"
  },
  {
    id: "ev_arc_lost_home_vigil",
    title: "부서진 고향의 추모제 — 살아남은 자의 무게",
    category: "생존자",
    once: true,
    req: {
      anyTags: ["cadia_stands", "baal_survivor", "tanith_survivor", "tanith_ghost"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 카디아·바알·타니스 생존자",
    weight: 34,
    text: "고향 행성이 산산조각 나거나 참혹한 전화에 휩쓸렸던 그날로부터 세월이 흘렀다. 주둔지 외곽의 소박한 석비 앞에 같은 전선에서 살아남은 동향인들이 하나둘 모여들어, 품속 깊숙이 간직해 온 고향의 흙과 전사한 전우들의 인식표를 조용히 올려두고 있다. 바알처럼 잿더미 속에서 간신히 살아남은 별이든, 카디아와 타니스처럼 영원히 잃어버린 별이든 생존자의 어깨에 남은 무게는 다르지 않다.",
    choices: [
      {
        label: "[교섭 판정] 생존자들과 함께 고향의 이름을 외치며 신병들에게 결코 꺾이지 않는 의지를 물려준다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'고향은 무너졌어도 우리는 여전히 서 있다!' 떨리는 목소리로 이어진 합창이 부대 전체의 가슴에 지워지지 않는 불씨를 지폈다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "북받치는 슬픔에 목이 메어 연설을 끝맺지 못한 채 고개를 숙였다. 연설자로서의 체면은 구겼으나, 침묵 속에 어깨를 두드려 주는 생존자들의 눈빛이 깊은 위안이 되었다.",
          stats: { Inf: -2, WP: 3 }
        }
      },
      {
        label: "[의지 판정] 밤마다 찾아오는 궤도 포격과 비명의 악몽을 정면으로 마주하고 산 자의 책임을 맹세한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "생존자의 죄책감을 강철 같은 결의로 벼려 냈다! 워프의 절망조차 비집고 들어올 틈 없는 정신력을 얻었다.",
          stats: { WP: 9, T: 4 },
          corruption: -8
        },
        fail: {
          text: "지독한 악몽과 불면이 며칠간 이어지며 기력이 쇠했으나, 다시 총을 쥐고 일어섰다.",
          wounds: -10,
          stats: { WP: 3 }
        }
      },
      {
        label: "말없이 아퀼라 성호를 긋고 추모비 앞에 낡은 탄피 하나를 내려둔 채 자리로 돌아간다",
        effect: {
          text: "떠나간 이들의 이름은 영원히 잊히지 않을 것이다. 가슴속 무거운 침묵이 오늘도 그대를 앞으로 걷게 한다.",
          stats: { WP: 5 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Fall of Cadia / Devastation of Baal / Gaunt's Ghosts"
  },
  {
    id: "ev_arc_veteran_relic_recall",
    title: "전장의 증표 — 옛 전우가 남긴 암호 상자",
    category: "베테랑",
    once: true,
    req: {
      anyTags: ["vraks_veteran", "badab_veteran", "rift_survivor", "deathwatch_vet", "space_hulk_vet"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "custodes", "grey_knight", "dreadnought", "high_lord_terra"]
    },
    reqLabel: "이력: 대전역·특수작전 베테랑",
    weight: 32, alignBias: "humane",
    text: "생사를 넘나들던 과거 대전역에서 등을 맞대고 싸웠던 옛 전우의 유품 상자가 제국 병참국의 지연 우편으로 수년 만에 배달되었다. 녹슨 자물쇠 안에는 손상된 전술 기록 슬레이트와 정교하게 손질된 마스터 크래프트 무기 부속품이 들어 있다.",
    choices: [
      {
        label: "[지성 판정] 손상된 전술 기록을 복원해 당시 작전의 보급 누락과 은폐된 공훈을 바로잡는다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "전우가 목숨 걸고 기록한 좌표를 복구해 부대의 명예와 누락된 훈장을 되찾아 주었다! 상급 사령부도 그대의 집념을 높이 샀다.",
          stats: { Int: 6, Inf: 8, WP: 4 }, align: { humane: 7 }
        },
        fail: {
          text: "행정 문서의 절반은 이미 파기되어 공식 정정은 무산되었으나, 진실만은 그대의 기억 속에 온전히 남았다.",
          stats: { Int: 3, Inf: -2 }, align: { humane: 4 }
        }
      },
      {
        label: "[사격 판정] 옛 전우의 명품 무기 부속을 직접 정비·장착해 사격장에서 실전 감각을 극한까지 되살린다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "손에 착 감기는 완벽한 조준 감각이 되살아났다! 옛 전우의 몫까지 한 발도 헛되이 쏘지 않으리라 다짐했다.",
          stats: { BS: 6, WS: 4, WP: 4 }
        },
        fail: {
          text: "노후화된 공이치기가 오작동해 손등을 다쳤으나, 정성껏 수리해 끝내 무기를 되살려 냈다.",
          wounds: -8,
          stats: { BS: 2 }
        }
      },
      {
        label: "유품을 기름천으로 닦아 소중히 간직하며 전우의 영혼이 황금 옥좌 곁에서 안식하길 기도한다",
        effect: {
          text: "수조 명의 병사가 스쳐 가는 제국에서 누군가를 끝까지 기억해 주는 것 자체가 작은 기적이다.",
          stats: { WP: 5 },
          faith: 6, align: { humane: 4 }
        }
      }
    ],
    source: "Only War / Imperial Armour: Siege of Vraks & Badab War"
  },
  {
    id: "ev_s2_origin_navigator_warp",
    title: "나비스 노빌리테 — 제3의 눈으로 마주한 워프 폭풍과 가문 암투",
    category: "특수 혈통",
    once: true,
    req: {
      minAge: 16,
      allTags: ["navigator"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "출신: 나비스 노빌리테 항해사",
    weight: 40,
    text: "이마의 비단 띠를 풀고 워프의 격랑을 직시하는 순간, 거대한 워프 폭풍이 함선을 집어삼키려 달려든다. 설상가상으로 항해실 밖에서는 독점 항해 계약을 노리는 경쟁 나비스 노빌리테 가문의 암살 첩보까지 전해졌다.",
    choices: [
      {
        label: "[의지 판정] 찢어지는 워프 폭풍 너머 아스트로노미칸의 미약한 불빛을 끝까지 붙들어 함대를 구해 낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "제3의 눈에서 피눈물이 흐르는 고통을 견뎌 내고 함선 전체를 무사히 실우주로 이끌었다! 선장과 가문 원로가 무릎 꿇고 경의를 표했다.",
          stats: { WP: 9, Int: 6, Inf: 10 }, align: { humane: 6 }
        },
        fail: {
          text: "워프의 광기가 제3의 눈을 할퀴어 심각한 두통과 돌연변이 징후가 심화되었으나, 함선만은 무사히 빠져나왔다.",
          wounds: -20,
          corruption: 8, align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 경쟁 가문의 독살 시도를 역이용해 해군 제독과의 최우선 항해 독점 계약을 따낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "테라 항해사 의회에 증거를 들이밀어 정적 가문을 실각시키고 막대한 영예와 지분을 거머쥐었다!",
          stats: { Fel: 7, Int: 5, Inf: 10 }, align: { ruthless: 7 }
        },
        fail: {
          text: "가문 간 암투 도중 호위병을 잃고 부상을 입었으나, 항해사로서의 위신은 지켜 냈다.",
          wounds: -16,
          stats: { Inf: -4 }, align: { ruthless: 4 }
        }
      },
      {
        label: "제3의 눈을 단단히 감추고 검증된 단거리 안전 항로만 택해 혈통과 목숨을 보전한다",
        effect: {
          text: "성급한 모험보다 나비스 노빌리테의 고귀한 혈통을 이어 가는 것이 먼저다. 안전하게 목적지에 닿았다.",
          stats: { WP: 5, Inf: 5 }
        }
      }
    ],
    source: "Lexicanum: Navis Nobilite / Rogue Trader Core Rulebook"
  },
  {
    id: "ev_s2_trait_blank_isolation",
    title: "블랭크의 고독 — 본능적 혐오와 침묵의 자매들의 시선",
    category: "선천 자질",
    once: true,
    req: {
      minAge: 14,
      allTags: ["blank"],
      excludeWorldTags: ["feral", "krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "daemon_prince", "high_lord_terra", "sister_of_silence"
      ]
    },
    reqLabel: "자질: 블랭크",
    weight: 38,
    text: "영혼의 메아리가 없는 블랭크의 기운 때문에 평범한 시민들은 이유도 모른 채 그대 곁에서 본능적인 구역질과 혐오를 느끼며 피해 간다. 그러던 어느 날, 시장에서 미등록 사이커가 폭주해 불길을 뿜자 오직 그대만이 아무렇지 않게 걸어 들어갈 수 있었다.",
    choices: [
      {
        label: "[의지 판정] 공허의 오라로 폭주한 사이커의 워프 불꽃을 단숨에 꺼뜨리고 당당히 제압한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "사이커가 비명을 지르며 무릎 꿇는 광경에 군중이 경악했다! 혐오받던 저주가 수많은 목숨을 구한 축복으로 증명되었다.",
          stats: { WP: 8, Inf: 7 },
          corruptionReset: true, align: { humane: 8 }
        },
        fail: {
          text: "사이커가 휘두른 쇠파이프에 맞아 다쳤으나, 워프 폭주 자체는 완벽히 무력화했다.",
          wounds: -14,
          stats: { WP: 4 }, align: { humane: 5 }
        }
      },
      {
        label: "[교섭 판정] 사건 직후 침묵의 수화로 다가온 '침묵의 자매들' 연락관과 비밀 협력을 약조한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "황금 갑주의 여전사가 조용히 고개를 끄덕이며 공허의 동족에게 깊은 경의와 보호 인장을 남겼다!",
          stats: { Fel: 6, Inf: 9, WP: 5 },
          addTags: ["inquisition_favor"], align: { dogmatic: 6 }
        },
        fail: {
          text: "복잡한 침묵의 수화를 오해해 연락관이 고개를 저으며 발길을 돌렸다. 협력 기회는 무산되었으나, 적어도 이 은하에 혼자가 아니라는 사실만은 마음에 남았다.",
          stats: { Inf: -2, WP: 2 }, align: { dogmatic: 3 }
        }
      },
      {
        label: "사람들의 웅성거림을 뒤로하고 조용히 군중 틈을 빠져나와 고독한 평온을 지킨다",
        effect: {
          text: "누구도 그대를 이해하지 못하지만, 어떤 악마도 그대의 영혼에 손댈 수 없다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Blank / Watchers of the Throne: The Emperor's Legion"
  },
  {
    id: "ev_s2_trait_ratling_sniper",
    title: "래틀링 — 야전 취사장의 밀수 향신료와 팔백 미터 저격",
    category: "선천 자질",
    once: true,
    req: {
      minAge: 14,
      allTags: ["ratling"],
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "자질: 래틀링 · 아스트라 밀리타룸",
    weight: 38,
    text: "작은 키와 곱슬머리 때문에 순수 인류 병사들에게 종종 놀림받지만, 래틀링의 매서운 저격 솜씨와 천재적인 요리·조달 능력은 전선에서 누구도 대신할 수 없다. 오늘도 적 저격수가 아군 참호를 묶어 놓고 있다.",
    choices: [
      {
        label: "[사격 판정] 800미터 너머 폐허 창문 틈으로 숨은 적 저격수의 이마를 롱 라스 한 발로 꿰뚫는다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "바람 계산까지 완벽한 단 한 발! 환호하는 병사들이 그대를 목마 태우며 두둑한 배급을 몰아 주었다.",
          stats: { BS: 8, Ag: 5, Inf: 6 }
        },
        fail: {
          text: "적의 반격탄이 엄폐물 옆을 스쳐 팔을 다쳤으나, 재장전 끝에 적 저격수를 쫓아냈다.",
          wounds: -14,
          stats: { BS: 3 }
        }
      },
      {
        label: "[교섭 판정] 어디서 구했는지 모를 진짜 향신료와 고기로 장교단 만찬을 차려 주고 특권을 챙긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "'이 래틀링 없으면 연대가 굶어 죽는다!' 장교단의 총애 속에 합법적 휴가와 넉넉한 비상 식량을 얻었다.",
          stats: { Fel: 7, Inf: 7 },
          wounds: 10
        },
        fail: {
          text: "보급 창고에서 슬쩍한 향신료 출처가 들통나 사흘간 감자 깎기 징계를 받았다.",
          stats: { Inf: -4, Ag: 3 }
        }
      },
      {
        label: "작은 체구로 포탄이 닿지 않는 참호 구석에 숨어 따뜻한 스튜를 끓이며 여유를 즐긴다",
        effect: {
          text: "래틀링의 철학은 단순하다. 배부르게 먹고, 절대 탄환 앞에 서지 말 것!",
          stats: { Ag: 4, T: 4 },
          wounds: 8
        }
      }
    ],
    source: "Lexicanum: Ratling / Codex: Astra Militarum"
  },
  {
    id: "ev_s2_trait_ogryn_bonehead",
    title: "오그린 — 본헤드 지능 보조 시술 제안",
    category: "선천 자질",
    once: true,
    req: {
      minAge: 16,
      allTags: ["ogryn"],
      anyCareers: ["astra_militarum", "militarum_sergeant"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "자질: 오그린 · 아스트라 밀리타룸",
    weight: 38,
    text: "거대한 덩치와 순박한 충성심을 눈여겨본 의무 장교와 커미사르가 그대를 불렀다. '자네는 아주 훌륭한 오그린이야. 머리에 작은 장치를 심어 주는 본헤드 시술을 받으면 숫자를 열까지 셀 수 있고, 다른 오그린 전우들을 이끄는 분대장이 될 수 있네.'",
    choices: [
      {
        label: "[강인 판정] '황제 폐하가 똑똑해지라 하셨다!' 두개골 시술을 꾹 참고 견뎌 본헤드 분대장이 된다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "머리가 조금 지끈거렸지만 이제 지도도 읽고 명령도 또렷이 이해한다! 커미사르가 빛나는 분대장 약장을 달아 주었다.",
          stats: { T: 6, Int: 8, WP: 6, Inf: 6 }
        },
        fail: {
          text: "수술이 너무 아파 병원 침대를 부숴 버리는 소동이 일었으나, 강철 같은 몸 덕에 금방 툴툴 털고 일어났다.",
          wounds: -18,
          stats: { T: 4 }
        }
      },
      {
        label: "[백병 판정] 복잡한 기계보다 내 리퍼 건이 최고라며 적의 기습을 맨몸으로 막아 내 전우들을 지킨다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'작은 친구들 건드리지 마!' 거대한 팔뚝으로 적을 날려 버리자 일반 병사 전우들이 감격해 환호했다.",
          stats: { WS: 7, T: 6, Fel: 5 }
        },
        fail: {
          text: "온몸으로 파편을 막아 내다 큰 상처를 입었으나, 일반 병사 전우들만은 한 명도 다치지 않았다.",
          wounds: -20,
          stats: { WS: 3 }
        }
      },
      {
        label: "커미사르가 칭찬으로 준 빛나는 훈장을 가슴에 꼭 쥐고 배급 고기를 두 그릇 먹으며 환하게 웃는다",
        effect: {
          text: "황제 폐하께서 오늘도 지켜보고 계신다. 오그린의 단순하고 순수한 충성심은 그 무엇보다 단단하다.",
          stats: { T: 5 },
          wounds: 12,
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Bone 'ead / Codex: Astra Militarum"
  },
  {
    id: "ev_s2_trait_prodigy_wargame",
    title: "전술 천재의 도박 — 사령부 모의 전쟁의 금기 기동",
    category: "선천 자질",
    once: true,
    req: {
      minAge: 16,
      allTags: ["prodigy"],
      excludeWorldTags: ["feral"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster",
        "general_rank", "navy_admiral", "commissar_general", "lord_inquisitor", "fabricator_general"
      ]
    },
    reqLabel: "자질: 전술 천재",
    weight: 36,
    text: "성계 방위 모의 전쟁 훈련에서 기존의 낡은 참호 고수 교리대로 배치하면 아군이 전멸할 것이 그대의 눈에는 첫눈에 보인다. 하지만 고위 참모들은 하급자의 파격적인 역기동 제안을 오만하다며 비웃고 있다.",
    choices: [
      {
        label: "[지성 판정] 홀로맵 위에 3중 양동 포위 기동을 펼쳐 보이며 모의전을 단 십 분 만에 완승으로 끝낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시뮬레이션 코지테이터가 '아군 피해 82퍼센트 감소'를 띄우자 장성들의 비웃음이 침묵과 경탄으로 뒤바뀌었다!",
          stats: { Int: 8, Inf: 9, BS: 4 }
        },
        fail: {
          text: "변칙 기동이 지나치게 과감해 참모장에게 불경한 독단이라는 견책을 받았으나, 날카로운 재능만은 각인시켰다.",
          stats: { Inf: -4, Int: 3 }
        }
      },
      {
        label: "[교섭 판정] 자존심 강한 상급 장교의 이름으로 전술안을 올려 공을 양보하는 대신 실전 반영과 후원을 얻는다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "현명한 처세 덕분에 수많은 병사의 목숨을 살릴 작전이 채택되었고, 상급 장교가 그대를 핵심 참모로 발탁했다!",
          stats: { Fel: 6, Inf: 8, Int: 4 }
        },
        fail: {
          text: "공적만 가로채이고 변변한 보상은 받지 못했으나, 전술적 안목은 한층 깊어졌다.",
          stats: { Int: 3, Inf: -2 }
        }
      },
      {
        label: "참모들의 자존심을 건드리지 않고 개인 기록 슬레이트에만 완벽한 해법을 정리해 둔다",
        effect: {
          text: "진짜 전장은 모의 지도가 아니라 피가 흐르는 현장이다. 언젠가 결정적 순간에 꺼낼 칼날을 갈아 두었다.",
          stats: { Int: 5, WP: 4 }
        }
      }
    ],
    source: "Only War Core Rulebook / Imperium Maledictum"
  },
  {
    id: "ev_s2_trait_saint_spark_aura",
    title: "성흔의 기질 — 워프 안개 속 꺼지지 않는 촛불",
    category: "선천 자질",
    once: true,
    req: {
      minAge: 14,
      allTags: ["saint_spark"],
      excludeWorldTags: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "custodes", "grey_knight", "dreadnought", "blank"]
    },
    reqLabel: "자질: 성흔의 기질",
    weight: 38,
    text: "원인을 알 수 없는 워프 안개가 구역을 뒤덮으며 등불이 일제히 꺼지고 사람들이 공포에 휩싸였다. 그런데 유독 그대의 발치에 놓인 작은 촛불만은 황금빛으로 꼿꼿이 타오르며 손바닥에서 뜨거운 성흔의 온기가 피어오른다.",
    choices: [
      {
        label: "[의지 판정] 황제의 이름을 부르며 어둠 속 부상자와 절망한 시민들을 황금빛 기도로 일으켜 세운다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 목소리가 울려 퍼지자 불길한 워프 안개가 순식간에 걷혔다! 목격자들이 '살아 있는 기적'이라 외치며 무릎 꿇었다.",
          stats: { WP: 8, Fel: 6, Inf: 7 },
          faith: 15,
          corruption: -10,
          addTags: ["living_miracle"], align: { dogmatic: 7 }
        },
        fail: {
          text: "온 힘을 쏟아 기도하다 코피를 흘리며 쓰러졌으나, 어둠이 물러날 때까지 단 한 사람도 광기에 빠지지 않았다.",
          wounds: -16,
          faith: 6, align: { dogmatic: 4 }
        }
      },
      {
        label: "[교섭 판정] 성흔의 징조를 떠벌리지 않고 조용히 촛불을 나누어 주며 이웃들의 불안을 달랜다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "과장된 광신 대신 잔잔한 희망이 퍼져 나가며, 국교와 이웃 모두의 깊은 신뢰를 얻었다.",
          stats: { Fel: 6, WP: 5 },
          faith: 10, align: { humane: 8 }
        },
        fail: {
          text: "일부 주민이 거짓 기적이라 수군대며 소동이 일어 체면을 구겼으나, 어둠이 걷힐 때까지 큰 탈 없이 밤을 넘겼다.",
          stats: { Inf: -2 },
          faith: 2, align: { humane: 4 }
        }
      },
      {
        label: "뜨겁게 달아오른 손바닥을 붕대로 감싸고 오직 황제께 겸허히 감사 기도를 올린다",
        effect: {
          text: "기적은 오직 옥좌의 주인으로부터 온다. 겸손한 신심이 내면의 오염까지 깨끗이 씻어 냈다.",
          stats: { WP: 4 },
          faith: 8,
          corruption: -5, align: { dogmatic: 5 }
        }
      }
    ],
    source: "Lexicanum: Living Saint / Codex: Adepta Sororitas"
  },
  {
    id: "ev_s2_origin_rt_blood",
    title: "로그 트레이더 방계 — 가문 무역 영장 계승권 분쟁",
    category: "특수 혈통",
    once: true,
    req: {
      minAge: 18,
      allTags: ["rogue_trader_blood"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "rt_lord_captain"
      ]
    },
    reqLabel: "출신: 로그 트레이더 방계 혈통",
    weight: 38,
    text: "황제의 무역 영장을 지닌 본가 원로가 급사하자, 거대한 성간 함대와 변경 성계 채굴권을 두고 방계와 직계 친척들 사이에 피비린내 나는 계승권 다툼이 벌어졌다. 방계 혈손인 그대에게도 원로회의 소집장이 날아왔다.",
    choices: [
      {
        label: "[교섭 판정] 원로회의에서 미개척 변경 성계 개척 수익안을 제시해 방계 지분과 쾌속정 권한을 따낸다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "대담한 항해 사업안에 원로들이 매료되었다! 막대한 배당금과 변경 성계 인맥을 단숨에 거머쥐었다.",
          stats: { Fel: 7, Int: 4, Inf: 10 }
        },
        fail: {
          text: "본가 파벌의 야유에 밀려 회의장에서 쫓겨났고, 항의 과정에서 경비원과 충돌해 상처를 입었다.",
          wounds: -10,
          stats: { Inf: -5 }
        }
      },
      {
        label: "[민첩 판정] 본가 경쟁자가 밤중에 보낸 사설 용병의 암살 기도를 역습해 가문의 실력자로 인정받는다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "암살자의 단검을 빼앗아 본가 회의 탁자에 꽂아 넣었다! 이제 가문 안에서 그대를 함부로 건드릴 자는 없다.",
          stats: { Ag: 6, WS: 5, Inf: 8 }
        },
        fail: {
          text: "어깨에 깊은 자상을 입고 간신히 비상 셔틀로 탈출했다. 로그 트레이더 가문의 정치는 전쟁터보다 잔혹하다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "피비린내 나는 본가 권력 다툼에서 한 발 물러나 안정적인 방계 연금과 성계 인맥만 챙긴다",
        effect: {
          text: "영장의 왕좌는 독이 든 잔이다. 목숨과 실리를 모두 지키는 영리한 후퇴였다.",
          stats: { Inf: 5, Fel: 4 }
        }
      }
    ],
    source: "Rogue Trader Core Rulebook / Lexicanum: Rogue Trader"
  },
  {
    id: "ev_s2_origin_terra_elite",
    title: "테라 상류층 — 황궁 외곽 하이 로드 연회와 칙령 서명",
    category: "특수 혈통",
    once: true,
    req: {
      minAge: 16,
      allTags: ["terra_elite"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "heretic", "chaos_aligned", "daemon_prince"
      ]
    },
    reqLabel: "출신: 테라 상류층 혈통",
    weight: 38,
    text: "은하계 전역의 운명이 오가는 테라 상원 구역의 대리석 연회장에 가문 대표로 초대받았다. 대성전 보급 칙령 서명을 둘러싸고 고위 행정관과 귀족 가문들이 화려한 미소 뒤에 칼을 숨긴 채 눈치를 보고 있다.",
    choices: [
      {
        label: "[권위 판정] 테라 명문가의 인장을 당당히 찍어 대성전 보급 청원안을 통과시키고 상원의 주목을 받는다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "은하계 수천 행성의 물자를 움직이는 서명 한 번으로 테라 상류 사회에 확고한 입지를 다졌다!",
          stats: { Inf: 10, Fel: 6, Int: 4 }
        },
        fail: {
          text: "절차상 결함을 물고 늘어진 정적 가문에게 체면을 구겼으나, 제국 수도 정치의 생리를 뼈저리게 배웠다.",
          stats: { Inf: -4, Fel: 2 }
        }
      },
      {
        label: "[의지 판정] 퇴폐한 귀족 사교의 공허함을 외면하고 황궁 외곽에서 실무와 무예 수련에 매진한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "향락에 젖은 다른 귀족 자제들과 다른 굳건한 기상에 황궁 수비 장교들마저 깊은 호감을 보였다.",
          stats: { WP: 7, WS: 4, Int: 5 },
          faith: 8
        },
        fail: {
          text: "가문 어른들로부터 사교를 소홀히 한다는 매서운 질책을 받아 사교계 입지가 다소 좁아졌으나, 스스로의 신념만은 꺾지 않았다.",
          stats: { Inf: -3, WP: 2 }
        }
      },
      {
        label: "테라 최상류 가문의 우아한 의전을 완벽히 소화하며 정중히 연회 석상에 얼굴만 비추고 물러난다",
        effect: {
          text: "품위와 절제는 테라 명문가의 가장 오래된 무기다. 무난하게 가문의 위상을 지켜 냈다.",
          stats: { Inf: 5, Fel: 4 }
        }
      }
    ],
    source: "Watchers of the Throne / Codex: Adeptus Custodes"
  },
  {
    id: "ev_s4_tag_librarius_trained",
    title: "챕터 라이브러리우스 — 워프 폭풍 속 사이킥 차폐와 마도서 봉인",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["librarius_trained"],
      excludeChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 챕터 라이브러리우스",
    weight: 38,
    text: "배틀 바지가 워프 난기류에 휘말린 찰나, 챕터 라이브러리우스 금서고에 봉인되어 있던 카오스 마도서 한 권이 쇠사슬을 끊고 핏빛 속삭임을 토해 내기 시작했다. 함교의 네비게이터가 비명을 지르며 시야를 잃어 가는 절체절명의 순간이다.",
    choices: [
      {
        label: "[의지 판정] 사이킥 후드를 최대 출력으로 가동해 마도서의 사념을 정면으로 짓눌러 재봉인한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "푸른 사이킥 번개가 사악한 속삭임을 태워 버리며 마도서를 완벽히 침묵시켰다! 챕터의 수석 라이브러리안이 그대의 정신력을 경외했다.",
          stats: { WP: 9, Int: 6, Inf: 7 },
          corruption: -8
        },
        fail: {
          text: "워프 역류로 코피를 쏟으며 정신적 타격을 입었으나, 마도서가 함선에 풀려나는 것만은 막았다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 챕터 고대 의례서의 대항 룬을 즉석에서 새겨 워프 파동을 함선 밖으로 방출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정교한 룬 결계가 저주의 에너지를 공허로 흘려보냈다! 네비게이터가 항로를 되찾으며 배틀 바지가 무사히 실우주로 복귀했다.",
          stats: { Int: 8, WP: 5, Inf: 6 }
        },
        fail: {
          text: "결계가 흔들리며 서고 일부가 불탔으나, 함선 전체는 위기에서 벗어났다.",
          wounds: -14,
          corruption: 4,
          stats: { Int: 4 }
        }
      },
      {
        label: "마도서가 담긴 봉인 금고째 에어록으로 사출해 실우주 항성의 중력권에 던져 버린다",
        effect: {
          text: "귀중한 연구 자료를 잃었으나, 형제들의 영혼을 지키는 것이 그 무엇보다 우선이다.",
          stats: { WP: 5, T: 3 },
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Librarius / Codex: Space Marines"
  },
  {
    id: "ev_s4_tag_chapter_serf",
    title: "챕터 서프의 충성 — 배틀 바지 침입자와 천사의 무기고",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["chapter_serf"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "daemon_prince",
        "high_lord_terra", "sector_lord", "planetary_governor", "warmaster"
      ]
    },
    reqLabel: "이력: 챕터 서프",
    weight: 36,
    text: "비록 진시드 선발에서는 고배를 마셨으나 아스타르테스의 곁에서 평생을 봉사하는 챕터 서프가 된 그대. 배틀 브라더들이 행성 표면에 강하한 사이, 해적 강습정이 배틀 바지 하부 무기고로 침투해 천사들의 예비 파워 아머와 볼터를 노리고 있다.",
    choices: [
      {
        label: "[사격 판정] 서프 방어 소대를 규합해 무기고 통로에서 오토건과 방어 포탑으로 침입자를 저지한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "아스타르테스 못지않은 규율과 화망으로 해적들을 전멸시켰다! 귀환한 중대장이 그대의 어깨에 친히 손을 얹으며 '우리의 형제나 다름없다'고 치하했다.",
          stats: { BS: 7, WP: 6, Inf: 7 }
        },
        fail: {
          text: "치열한 백병전 끝에 중상을 입었으나, 귀환한 스페이스 마린들이 도착할 때까지 무기고 문만은 열어 주지 않았다.",
          wounds: -18,
          stats: { T: 4, WP: 5 }
        }
      },
      {
        label: "[지성 판정] 함선 내부 방화 격벽과 진공 배기 밸브를 원격 조작해 침입 구역을 통째로 봉쇄한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "무기고를 누구보다 잘 아는 종복의 기지였다! 해적 강습대가 진공 통로에 갇혀 손쉽게 제압되었다.",
          stats: { Int: 7, Inf: 6 }
        },
        fail: {
          text: "격벽 폐쇄가 한 박자 늦어 무기고 외곽이 파손되었으나 유물 갑주는 무사했다.",
          wounds: -10,
          stats: { Int: 4 }
        }
      },
      {
        label: "유물 갑주를 내부 금고로 대피시키고 함교에 긴급 경보를 송신해 보안대의 진압을 지원한다",
        effect: {
          text: "필멸자의 몸으로도 천사들의 무구를 끝까지 지켜 냈다. 서프 동료들 사이에서 깊은 존경을 얻었다.",
          stats: { WP: 5, T: 4 }
        }
      }
    ],
    source: "Lexicanum: Chapter Serf / Codex: Space Marines"
  },
  {
    id: "ev_s4_tag_krieg_grenadier",
    title: "크리그 척탄병 — 해골 가면 돌격대의 독가스 참호 돌파",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["krieg_grenadier"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "astartes", "custodes", "grey_knight", "dreadnought", "high_lord_terra"]
    },
    reqLabel: "이력: 크리그 척탄병",
    weight: 36,
    text: "지옥불 라스건과 중장갑 카라페이스 아머, 그리고 해골 문양 방독면을 착용한 크리그 척탄병으로서 최전선 돌파조에 배치되었다. 맹독성 포격 연기가 무인지대를 뒤덮은 가운데, 아군 공병대의 참호 폭파가 절반만 성공해 철조망 틈새가 좁게 열렸다.",
    choices: [
      {
        label: "[강인 판정] 독가스 구름 속으로 가장 먼저 뛰어들어 지옥불 라스건으로 적 중기관총 진지를 제압한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "죽음을 두려워하지 않는 해골 가면의 전진에 적 방어병들이 공포에 질려 무너졌다! 후속 연대가 단숨에 적 1차 참호를 점령했다.",
          stats: { T: 8, BS: 5, WP: 5, Inf: 5 }
        },
        fail: {
          text: "방독면 여과기가 손상되어 폐에 독기를 마셨으나, 끝내 적 벙커를 폭파하고 임무를 완수했다.",
          wounds: -20,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[사격 판정] 연막 너머의 적 총구 화염만 보고 정확히 유탄과 고출력 사격을 꽂아 넣는다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "기계처럼 냉정한 사격이 적 기관총 사수들을 차례로 침묵시켰다. 병참 장교가 그대의 번호를 최우수 척탄병 기록에 올렸다.",
          stats: { BS: 8, Int: 4, Inf: 5 }
        },
        fail: {
          text: "탄창이 과열되어 팔에 화상을 입었으나 돌파구만은 끝까지 열어 두었다.",
          wounds: -14,
          stats: { BS: 4, T: 3 }
        }
      },
      {
        label: "파괴되지 않은 철조망 아래로 몸을 밀어 넣어 후속 보병들이 밟고 지나갈 발판과 통로를 확보한다",
        effect: {
          text: "개인의 생사는 의미 없다. 연대가 전진하고 속죄가 이루어졌으니 그것으로 충분하다.",
          stats: { WP: 6, T: 5 },
          wounds: -10,
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Death Korps Grenadier / Imperial Armour: Siege of Vraks"
  },
  {
    id: "ev_s4_tag_catachan_blooded",
    title: "카타찬 성인식 통과자 — 외지 귀족 장교의 무모한 돌격 명령",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["catachan_blooded"],
      excludeTags: [
        "heretic", "chaos_aligned", "daemon_prince",
        "astartes", "custodes", "grey_knight", "dreadnought",
        "high_lord_terra", "warmaster", "general_rank"
      ]
    },
    reqLabel: "이력: 카타찬 성인식 통과",
    weight: 36,
    text: "카타찬 밀림에서 살아남은 그대의 야생 직감이 날카로운 경고를 울린다. 늪지 숲 너머의 고요함이 비정상적이다. 분명 적의 매복이 도사리고 있건만, 새로 부임한 외지 귀족 출신 장교는 정면 개활지로 일렬 행군을 강행하라고 소리친다.",
    choices: [
      {
        label: "[민첩 판정] 대열을 벗어나 단독 우회 정찰로 적 매복조의 지뢰선과 저격수를 먼저 칼로 정리한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "카타찬 단검이 소리 없이 매복조 전원을 침묵시켰다! 전우들은 그대의 목숨을 건 정찰에 열광했고, 콧대 높던 장교마저 말을 잃었다.",
          stats: { Ag: 8, WS: 6, Inf: 5 }, align: { humane: 6 }
        },
        fail: {
          text: "함정에 걸려 다리를 다쳤으나, 신호탄을 쏘아 올려 본대 전체가 학살당하는 참사를 막았다.",
          wounds: -18,
          stats: { Ag: 4, T: 4 }, align: { humane: 4 }
        }
      },
      {
        label: "[교섭 판정] 카타찬의 지형 판독 근거를 조목조목 들이대며 부하들의 목숨을 걸고 우회 기동을 관철한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "장교가 마지못해 우회로를 허락했고, 직후 원 경로에 쏟아진 적의 포격을 보며 그대에게 정식으로 사과했다.",
          stats: { Fel: 7, Int: 5, Inf: 6 }, align: { humane: 8 }
        },
        fail: {
          text: "항명 직전까지 가는 언쟁 끝에 징계 경고를 받았으나, 최소한 선발대만이라도 경계 태세를 갖추게 만들었다.",
          stats: { Inf: -3, WP: 4 }, align: { humane: 5 }
        }
      },
      {
        label: "명령은 따르되 분대원들에게 간격을 넓히고 엄폐 준비를 시켜 기습이 터지는 즉시 반격한다",
        effect: {
          text: "역시나 매복이 터졌으나 미리 대비한 덕분에 분대 피해는 극소수에 그쳤다.",
          stats: { T: 5, BS: 4 },
          wounds: -8, align: { dogmatic: 4 }
        }
      }
    ],
    source: "Lexicanum: Catachan Jungle Fighters / Codex: Astra Militarum"
  },
  {
    id: "ev_s4_tag_fenris_blood",
    title: "펜리스 빙원의 피 — 혹한의 전선과 늑대의 사가",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["fenris_blood"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "custodes", "grey_knight", "dreadnought", "high_lord_terra"]
    },
    reqLabel: "이력: 펜리스 빙원 생존자",
    weight: 36,
    text: "영하 50도의 혹한이 몰아친 전선에서 다른 행성 출신 병사들은 손가락이 얼어붙어 방아쇠조차 당기지 못하고 있다. 그러나 갈라지는 빙해와 얼음 늑대 사이에서 자란 그대의 혈관에는 오히려 뜨거운 전의가 끓어오른다.",
    choices: [
      {
        label: "[강인 판정] 동상에 쓰러진 전우들을 들쳐 업고 눈보라를 뚫어 최전방 보온 벙커까지 돌파한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "펜리스인의 괴력과 내한성에 동료들이 경악했다! 그대 덕분에 한 개 소대 전원이 동사를 면하고 반격에 나섰다.",
          stats: { T: 8, WS: 4, Fel: 5, Inf: 5 }
        },
        fail: {
          text: "혹독한 냉기에 동상을 입었으나 끝까지 전우들을 놓지 않고 벙커에 도착했다.",
          wounds: -16,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[백병 판정] 눈보라를 이용해 총기가 얼어붙은 적 초소에 육박전으로 돌격해 난방 발전기를 탈취한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "포효와 함께 도끼와 단검으로 적 초소를 휩쓸었다! 빼앗은 발전기 불빛 아래 그대의 이름이 새로운 사가로 불렸다.",
          stats: { WS: 7, T: 5, Inf: 5 }
        },
        fail: {
          text: "격투 끝에 부상을 입었으나 발전기와 식량을 확보해 아군을 살려 냈다.",
          wounds: -15,
          stats: { WS: 4, T: 3 }
        }
      },
      {
        label: "빙원에서 익힌 체온 유지법과 동상 예방 요령을 동료들에게 차근차근 전수한다",
        effect: {
          text: "펜리스의 생존 지혜가 낯선 행성의 겨울을 이겨 내게 해 주었다.",
          stats: { Int: 4, Fel: 5, T: 3 }
        }
      }
    ],
    source: "Lexicanum: Fenris / Codex: Space Wolves"
  },
  {
    id: "ev_s4_tag_daemon_bane",
    title: "악마 살해자 — 워프 너머에서 날아온 원한의 진명",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["daemon_bane"],
      excludeTags: ["custodes", "grey_knight", "blank", "dreadnought", "heretic", "chaos_aligned", "daemon_prince"]
    },
    reqLabel: "이력: 악마 살해자",
    weight: 38,
    text: "과거 그대가 추방하거나 베어 낸 워프 악마는 결코 그대의 영혼 냄새를 잊지 않는다. 성소의 촛불이 일제히 푸른빛으로 뒤집히더니, 그림자 속에서 그대의 이름을 저주하는 사악한 현현이 다시 현실의 막을 찢고 손을 뻗어 온다.",
    choices: [
      {
        label: "[의지 판정] 황제의 순결한 기도문과 진명 추방 의식으로 악마의 원념을 영구히 찢어 발긴다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "비명과 함께 워프의 틈이 완전히 닫혔다! 악마마저 두려워하는 진정한 퇴마사의 명성이 제국 비밀 기록에 각인되었다.",
          stats: { WP: 9, Inf: 7 },
          faith: 12,
          corruption: -12
        },
        fail: {
          text: "악마의 저주가 정신을 훑고 지나가 깊은 상처를 남겼으나, 현현 자체는 가까스로 쫓아냈다.",
          wounds: -20,
          corruption: 8,
          stats: { WP: 4 }
        }
      },
      {
        label: "[백병 판정] 축복받은 무기를 쥐고 현실로 기어 나오는 악마의 팔을 망설임 없이 베어 낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "은빛 성유를 바른 칼날이 악마의 육신을 태워 버렸다! 두 번 다시 그대 앞에 나타나지 못할 치명타였다.",
          stats: { WS: 8, T: 4, WP: 5 },
          faith: 6,
          corruption: -6
        },
        fail: {
          text: "지옥불 발톱에 가슴을 베였으나 끝내 사악한 형체를 조각내어 추방했다.",
          wounds: -22,
          stats: { WS: 5 }
        }
      },
      {
        label: "즉시 은과 소금으로 방어 원을 그리고 인근 성직자와 심문소 요원에게 정화 지원을 요청한다",
        effect: {
          text: "혼자 영웅심을 부리지 않고 정화반과 합동으로 악마의 잔재를 안전하게 소각했다.",
          stats: { Int: 5, WP: 4 },
          faith: 5,
          corruption: -5
        }
      }
    ],
    source: "Lexicanum: Daemon / Codex: Grey Knights"
  },
  {
    id: "ev_s4_tag_rift_touched",
    title: "대균열 감응자 — 꿈속에서 울리는 천 개 성계의 비명",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["rift_touched"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "custodes", "grey_knight", "dreadnought", "blank", "high_lord_terra"]
    },
    reqLabel: "이력: 대균열 감응자",
    weight: 36,
    text: "시카트릭스 말레딕툼이 하늘을 찢던 날 워프 파동에 감응한 이후, 그대의 꿈에는 간혹 아직 닥치지 않은 재앙의 단편이 스쳐 지나간다. 오늘 새벽, 그대는 인근 궤도 정거장에 숨어든 이단 함대의 기습 시각을 기이할 만큼 생생하게 보았다.",
    choices: [
      {
        label: "[의지 판정] 환상의 유혹에 흔들리지 않고 핵심 좌표만 추려 성계 방어 사령부에 익명 경고를 보낸다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "그대의 경고 덕분에 방어 함대가 미리 매복해 이단 기습 함대를 전멸시켰다! 누구도 출처를 몰랐으나 수많은 생명을 구했다.",
          stats: { WP: 8, Int: 6, Inf: 5 },
          faith: 6,
          corruption: -5, align: { humane: 7 }
        },
        fail: {
          text: "환상 속에 섞인 워프의 속임수 때문에 두통과 오염을 겪었으나, 경계 강화만은 이끌어 냈다.",
          wounds: -12,
          corruption: 8,
          stats: { WP: 3 }, align: { humane: 4 }
        }
      },
      {
        label: "[지성 판정] 꿈의 단편을 실제 아스트로패스 통신 잡음과 대조해 과학적 예측 보고서로 포장한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "이단 심문의 의심을 완벽히 피하면서도 기습을 차단하는 데 성공했다! 상부가 그대의 탁월한 정보 분석력을 극찬했다.",
          stats: { Int: 8, Inf: 7 }
        },
        fail: {
          text: "보고서의 근거가 석연치 않다는 지적을 받아 감찰관의 면담을 치러야 했다.",
          stats: { Int: 3, Inf: -3 }
        }
      },
      {
        label: "워프가 보여 주는 예지는 언제나 독이 든 잔이라며 성당에서 정화 기도를 올리고 환상을 덮는다",
        effect: {
          text: "금단의 감각에 의지하지 않고 영혼의 순결을 지켰다. 머릿속을 울리던 비명이 한결 잦아들었다.",
          stats: { WP: 6 },
          faith: 8,
          corruption: -8, align: { dogmatic: 7 }
        }
      }
    ],
    source: "Lexicanum: Great Rift / Psychic Awakening"
  },
  {
    id: "ev_s4_tag_vigilus_veteran",
    title: "비질루스 방어전 베테랑 — 나흐문드 회랑의 산증인",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["vigilus_veteran"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "custodes", "grey_knight", "dreadnought"]
    },
    reqLabel: "이력: 비질루스 방어전 참전",
    weight: 36,
    text: "임페리움 상크투스와 암흑 제국을 잇는 좁은 숨통, 비질루스의 처절한 방어전에서 살아 돌아온 그대. 나흐문드 회랑으로 파견될 신편 성전군 지휘부가 오크 스피드 프릭과 진스틸러 교단, 블랙 리전이 뒤엉켰던 복합 시가전의 교훈을 전해 달라며 그대를 강단에 세웠다.",
    choices: [
      {
        label: "[지성 판정] 3중 전선에서 살아남은 도심 봉쇄 전술과 진스틸러 지하 색출 요령을 체계적으로 강의한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "실전의 피로 쓴 교본에 신편 지휘관들이 기립 박수를 보냈다! 그대의 전술안이 회랑 수비대의 표준 교리로 채택되었다.",
          stats: { Int: 7, Inf: 7, BS: 3 }
        },
        fail: {
          text: "복잡한 시가전 교훈을 짧은 시간에 체계적으로 정리하지 못해 지휘부의 신뢰를 다소 잃었으나, 핵심 매복 회피법만은 각인시켰다.",
          stats: { Inf: -2, Int: 2 }
        }
      },
      {
        label: "[교섭 판정] 탁상공론에 빠진 신임 장교들에게 비질루스의 참혹한 현실을 직설적으로 일깨워 정신을 차리게 한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "거친 진실이 오만한 장교들의 허영을 깨뜨렸다! 부대가 훨씬 단단한 각오로 나흐문드 회랑을 향해 출항했다.",
          stats: { Fel: 7, WP: 6, Inf: 6 }
        },
        fail: {
          text: "사기를 떨어뜨렸다는 항의를 받았으나, 현장에 나간 병사들은 나중에 그대의 경고가 옳았음을 깨달았다.",
          stats: { Inf: -2, WP: 4 }
        }
      },
      {
        label: "강단 대신 무기고로 내려가 파견될 병사들의 장비 점검과 생존 노하우를 묵묵히 도와준다",
        effect: {
          text: "화려한 훈장보다 신병 한 명이라도 더 살려 보내는 것이 비질루스 생존자의 도리다.",
          stats: { T: 4, Fel: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: War of Beasts / Vigilus Defiant"
  },
  {
    id: "ev_s4_tag_tyrannic_veterans",
    title: "타이라니드 전쟁 베테랑 — 워프의 그림자를 알아본 자의 경고",
    category: "명예 태그 연작",
    once: true,
    req: {
      anyTags: ["tyranic_war_vet", "tyrannic_veteran"],
      excludeTags: ["heretic", "chaos_aligned", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 타이라니드 전쟁 베테랑",
    weight: 36,
    text: "아스트로패스 통신이 사흘째 잡음 속에 끊기고, 성계 외곽 농장의 가축들이 까닭 없이 날뛰기 시작했다. 현지 관료들은 단순한 태양 흑점 이상이라 치부하지만, 하이브 함대와 싸워 본 그대는 온몸의 털이 곤두서는 그 감각을 안다. '워프의 그림자'가 다가오고 있다.",
    choices: [
      {
        label: "[지성 판정] 과거 타이라니드 전쟁의 생체 정찰 패턴을 제시하며 즉시 궤도 초계망과 지하 진스틸러 수색을 발동시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "그대의 경고로 조기 탐지된 하이브 선봉 촉수와 지하 교단 세포가 상륙 전에 격멸되었다! 행성 전체가 포식의 악몽을 피했다.",
          stats: { Int: 8, Inf: 8, WP: 5 },
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "관료들이 늑장 대응하는 사이 정찰 생체 괴수 릭터가 침투해 격전 끝에 간신히 사살했다.",
          wounds: -18,
          stats: { WS: 4, Int: 4 }
        }
      },
      {
        label: "[사격 판정] 직접 정예 수색대를 이끌고 외곽 숲에 떨어진 포자 낭종을 화염방사기와 볼터로 소각한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "시냅스 개체의 머리를 정확히 꿰뚫어 무리의 통제를 끊었다! 베테랑의 노련한 대처가 전염을 원천 봉쇄했다.",
          stats: { BS: 8, T: 4, Inf: 6 }
        },
        fail: {
          text: "산성 생체액에 화상을 입었으나 마지막 포자 낭종까지 완전히 불태웠다.",
          wounds: -16,
          stats: { BS: 4, T: 4 }
        }
      },
      {
        label: "비상 대피 절차와 식수 격리 매뉴얼을 배포해 행성이 장기 포위전에 대비하도록 돕는다",
        effect: {
          text: "최악의 포식자 앞에서 살아남는 법은 공포에 흔들리지 않는 철저한 대비뿐이다.",
          stats: { WP: 5, T: 4, Int: 4 }
        }
      }
    ],
    source: "Lexicanum: Tyrannic Wars / Codex: Space Marines"
  }
];
