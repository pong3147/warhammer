// 분기 사건 — 샐러맨더 전용 (1:1 단독 승격)
export default [
  {
    id: "ev_chap_salamanders",
    title: "샐러맨더 — 프로메테우스 교단: 화염 속의 피난 열차",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 샐러맨더",
    weight: 34,
    text: "오크 기갑 부대가 하이브 외곽의 민간인 피난 열차를 포위했다. 상급 사령부는 '민간인은 포기하고 적 탄약고부터 타격하라'고 무전하지만, 녹턴의 아들이자 불칸의 후예로서 아이들을 불길 속에 버려둘 수는 없다!",
    choices: [
      {
        label: "[강인 판정] 화염방사기와 썬더 해머를 들고 오크 한복판에 뛰어들어 피난민을 전원 구출한다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "'전투의 불길 속으로, 모루 위로!' 그을린 초록빛 파워 아머로 피난민 수천 명을 끝까지 감싸 안았다. 살아남은 시민들이 눈물로 황제와 샐러맨더를 찬양했다!",
          stats: { T: 6, Fel: 7, WP: 5 },
          faith: 10,
          addTags: ["promethean_smith"]
        },
        fail: {
          text: "화염과 파편을 온몸으로 막아 내다 중상을 입었으나, 피난 열차만은 무사히 성문 안으로 들어갔다.",
          wounds: -24,
          stats: { T: 4, Fel: 5 }
        }
      },
      {
        label: "[지성 판정] 직접 단조한 마스터 크래프트 멜타탄으로 적 선두 전차를 폭파해 우회로를 연다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "정밀하게 조정된 열선 폭발이 오크 대열을 둘로 가르고 피난 열차의 탈출로를 확보했다! 녹턴 대장간의 긍지가 빛났다.",
          stats: { Int: 6, BS: 5, Fel: 4 }
        },
        fail: {
          text: "멜타 탄두가 조기 과열되어 화상을 입었으나 적의 진격을 지연시키는 데는 성공했다.",
          wounds: -15,
          stats: { Int: 3 }
        }
      }
    ],
    source: "Lexicanum: Promethean Cult / Codex Supplement: Salamanders"
  },
  {
    id: "ev_chap2_salamanders",
    title: "샐러맨더 — 녹턴 성소 도시의 대장간과 부족민의 유대",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders"],
      excludeWorlds: ["krieg"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 샐러맨더",
    weight: 28,
    text: "대부분의 스페이스 마린이 필멸자 시절의 연고를 잊는 것과 달리, 샐러맨더는 작전이 없을 때 녹턴의 일곱 성소 도시로 돌아가 부족민과 필멸자 친족들 곁에서 어울리며 스스로 무구를 단조한다. 지진으로 무너진 마을 대장간에서 노장 대장장이가 그대의 거대한 망치를 반긴다.",
    choices: [
      {
        label: "[지성 판정] 용암 화덕 앞에서 사흘 밤낮을 두드려 자신만의 마스터 크래프트 무구를 단조한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "불칸의 장인 정신이 깃든 걸작 무구가 탄생했다! 전장에서 단 한 번도 오작동하지 않을 완벽한 동반자다.",
          stats: { Int: 6, T: 5, WS: 5, BS: 4 },
          addTags: ["promethean_smith"]
        },
        fail: {
          text: "담금질 온도가 어긋나 칼날이 갈라지며 튄 쇳조각에 화상을 입었고, 처음부터 다시 단조해야 했다.",
          wounds: -8,
          stats: { Int: -2 }
        }
      },
      {
        label: "무너진 마을 방벽과 수로를 복구하며 녹턴 아이들에게 인류를 지키는 이유를 들려준다",
        effect: {
          text: "초인이면서도 인간성을 잃지 않은 샐러맨더의 따뜻한 유대가 영혼의 상처를 어루만졌다.",
          stats: { Fel: 7, WP: 5 },
          wounds: 15,
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Salamanders / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s4_tag_promethean_smith",
    title: "프로메테우스 대장장이 — 용암로의 명검 주조와 불의 시련",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["promethean_smith"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 샐러맨더 프로메테우스 대장장이",
    weight: 38,
    text: "전투가 끝난 뒤에도 샐러맨더의 사명은 끝나지 않는다. 프로메테우스 교단의 장인으로서 그대는 손상된 고대 유물 무구와 새 마스터크래프트 병기를 벼려 내기 위해 화산 용광로 앞에 섰다. 동시에 인근 민간 정착지가 약탈자들의 습격을 받고 있다는 긴급 구조 신호가 날아들었다.",
    choices: [
      {
        label: "[강인 판정] 밤새 용광로의 열기를 견뎌 유물 무구를 완성한 뒤 즉시 구원군 선봉으로 출격한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "갓 식힌 마스터크래프트 망치가 약탈자들의 장갑을 박살 냈다! 장인의 땀과 전사의 헌신이 정착지를 구했다.",
          stats: { T: 7, WS: 6, Int: 5, Inf: 7 }
        },
        fail: {
          text: "화상과 피로를 안고 출격해 부상을 입었으나, 민간인 대피선은 무사히 이륙시켰다.",
          wounds: -18,
          stats: { T: 5, WP: 4 }
        }
      },
      {
        label: "[지성 판정] 주조 작업을 잠시 멈추고 민간인 방어용 방열 장벽과 화염 방어망을 현장에서 즉석 제작한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "불칸의 자비와 장인 정신이 완벽히 어우러졌다! 정착지 주민들은 화염의 방패 뒤에서 단 한 명의 희생도 없이 살아남았다.",
          stats: { Int: 8, Fel: 5, Inf: 6 },
          faith: 6
        },
        fail: {
          text: "급조한 방벽 일부가 녹아내려 화상을 입었으나, 주민 대다수는 지켜 냈다.",
          wounds: -14,
          stats: { Int: 4, T: 3 }
        }
      },
      {
        label: "형제들에게 구원 출동을 맡기고 흔들림 없이 고대 유물 무구의 복원을 완벽히 마무리한다",
        effect: {
          text: "완벽하게 되살아난 유물 무기가 챕터 무기고에 봉안되었다. 다음 성전에서 수많은 생명을 구할 병기가 탄생했다.",
          stats: { Int: 6, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Promethean Cult / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s16_ch2_sa_1",
    title: "샐러맨더 — 불칸의 성유물 단서와 화염의 시련",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 샐러맨더",
    weight: 32,
    text: "프로메테우스 교단의 예언에 따르면, 프라이마크 불칸이 은하 곳곳에 남긴 아홉 성유물을 모두 되찾는 날 녹턴의 군주가 돌아온다. 화산재에 파묻힌 고대 제국 성소의 잿더미에서 불칸의 대장간 인장이 새겨진 탄화 석판이 발견되었다. 그러나 유적 심부는 맹독성 유황 연기와 솟구치는 용암 열기가 침입자를 불사르는 가혹한 화염의 시험장이다.",
    choices: [
      {
        label: "[강인 판정] 불타오르는 용암 회랑을 정면으로 뚫고 들어가 성유물 단서가 담긴 석판을 직접 수습한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "칠흑 같은 피부와 초록빛 세라마이트가 화염에 그을렸으나 한 걸음도 물러서지 않았다! 성소 제단 아래 숨겨진 고대 성유물 좌표와 암호 석판을 온전히 회수해 포지파더에게 봉헌했다.",
          stats: { T: 7, WP: 6, Inf: 6 },
          faith: 10,
          addTags: ["promethean_smith"]
        },
        fail: {
          text: "분출한 마그마 기둥에 갑주 밀폐 장치가 녹아내려 심한 화상을 입었다. 석판 파편 일부만 건진 채 간신히 후퇴해야 했다.",
          wounds: -22,
          stats: { T: 3, Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 석판에 새겨진 프로메테우스 교단의 고대 화염 부호를 해독해 용암 분출 주기를 계산한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "화산 지맥의 숨결을 정확히 읽어 냈다! 용암이 잠잠해진 단 삼 분의 틈을 타 유적 심부로 내려가 성유물의 행방이 적힌 고대 성궤를 손상 없이 꺼냈다.",
          stats: { Int: 7, WP: 5, Inf: 5 },
          faith: 6
        },
        fail: {
          text: "해독이 어긋나 잘못된 통로로 들어섰다가 분출한 화산 가스를 정면으로 마시고 부상을 입었다.",
          wounds: -15,
          stats: { Int: -2, T: 2 }
        }
      },
      {
        label: "[의지 판정] 프로메테우스 교단의 성가를 읊으며 불의 시련을 영혼의 정화 의식으로 승화시킨다",
        req: { anyTags: ["role_chaplain", "role_librarian"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "흔들리지 않는 신앙과 인내 속에 화염조차 길을 터 주는 듯했다! 형제들의 사기가 하늘을 찔렀고, 석판에 새겨진 숨겨진 문구까지 남김없이 기록해 냈다.",
          stats: { WP: 8, Fel: 6, Inf: 6 },
          faith: 14,
          corruption: -8
        },
        fail: {
          text: "뜨거운 열기 속에서 영혼을 다잡다 탈진해 쓰러졌고, 화염의 시험을 끝마치지 못한 채 호송되어야 했다.",
          wounds: -16,
          stats: { WP: -2 }
        }
      },
      {
        label: "유적 외곽의 열기 속에서 인내의 화염 낙인 의식만 치르고 정밀 발굴은 챕터 정찰대에 인계한다",
        effect: {
          text: "서두르지 않고 불의 시련이 가르치는 인내와 겸허를 몸에 새겼다. 불칸의 유산은 조급함이 아니라 끈기로 되찾는 법이다.",
          stats: { T: 4, WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Artefacts of Vulkan / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s16_ch2_sa_2",
    title: "샐러맨더 — 파이어드레이크 유물 갑주 수복과 기계교 교리 갈등",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["salamanders"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "배틀 브라더 · 챕터: 샐러맨더",
    weight: 30,
    text: "녹턴의 위성 프로메테우스 요새 대장간에서 제1중대 파이어드레이크가 만 년 가까이 물려 입던 고대 터미네이터 갑주의 동력로 수복 작업이 시작되었다. 그러나 공동 점검을 위해 파견된 화성 아뎁투스 메카니쿠스 사제는 샐러맨더 고유의 화염 문양 각인과 수작업 개량을 성스러운 설계도에 대한 월권이라며 즉각 중단하라고 항의한다. 대장간의 불꽃 앞에서 옴니시아의 교리와 프로메테우스 교단의 장인 전통이 정면으로 충돌했다.",
    choices: [
      {
        label: "[지성 판정] 고대 갑주의 열전도 구조와 대성전 시절 기록을 제시해 샐러맨더식 수복이 원형 보존임을 논증한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "화성의 기계 사제가 정밀한 열역학 수치와 불칸의 옛 설계 각주 앞에서 끝내 침묵을 거두고 고개를 끄덕였다! 완벽히 되살아난 파이어드레이크 유물 갑주에 양측의 축성 인장이 나란히 찍혔다.",
          stats: { Int: 8, Inf: 6, T: 5 },
          addTags: ["promethean_smith"]
        },
        fail: {
          text: "논증이 어긋나며 기계교 사제가 성전 보급 협정을 거론하며 강하게 반발했고, 수복 공정이 크게 지연되며 문책을 받았다.",
          stats: { Int: -2, Inf: -3 }
        }
      },
      {
        label: "[교섭 판정] 화성 사제의 권위를 존중하면서도 프로메테우스 교단의 불꽃 의례가 기계령을 달래는 경배임을 설득한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "기계교 사제가 대장간 화덕 앞에서 함께 찬송을 읊으며 공동 수복에 동참했다! 녹턴의 장인 정신과 화성의 기계 교리가 보기 드문 신뢰로 맞손을 잡았다.",
          stats: { Fel: 7, Inf: 7, WP: 5 }
        },
        fail: {
          text: "타협을 시도하다 양쪽 모두의 자존심을 건드려 대장간 분위기가 얼어붙었고, 결국 파이어드레이크 원로들이 직접 중재에 나서야 했다.",
          stats: { Fel: -3, Inf: -2 }
        }
      },
      {
        label: "[강인 판정] 화성 수련 의례와 프로메테우스 화덕의 열기를 동시에 견디며 고대 터미네이터 동력로를 직접 재조립한다",
        req: { anyTags: ["role_techmarine", "promethean_smith", "terminator_honors"] },
        check: { stat: "T", diff: -5 },
        success: {
          text: "붉게 달구어진 아다만티움 장갑을 맨팔이나 다름없는 감각으로 정교하게 접합해 냈다! 기계교 사제마저 경외의 이진 성가를 울리며 그대의 솜씨를 인정했다.",
          stats: { T: 8, Int: 6, Inf: 7 },
          faith: 6
        },
        fail: {
          text: "동력로 재점화 순간 열기가 역류해 양팔을 심하게 데었고, 기계교 사제의 엄중한 안전 경고 속에 작업이 중단되었다.",
          wounds: -18,
          stats: { Inf: -2 }
        }
      },
      {
        label: "기계교 사제에게 동력로 배선 검증을 맡기고, 자신은 외장 세라마이트 판과 화룡 비늘 망토 복원에만 전념한다",
        effect: {
          text: "서로의 영역을 분명히 나누자 갈등이 잦아들었다. 완벽히 수복된 파이어드레이크 터미네이터 갑주가 제1중대 무기고로 엄숙히 반환되었다.",
          stats: { Int: 4, T: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Firedrakes / Codex Supplement: Salamanders"
  },
  {
    id: "ev_s16_ch2_sa_3",
    title: "샐러맨더 — 녹턴 시련의 계절 대지진과 지하 피난처 사수",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["salamanders"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 샐러맨더",
    weight: 34,
    text: "위성 프로메테우스의 조석력이 녹턴의 지각을 뒤흔드는 시련의 계절이 돌아왔다. 거대한 대지진이 성소 도시 외벽을 갈라놓자, 지하 피난처로 대피한 수만 명의 시민을 향해 지열 균열에서 쏟아져 나온 흉포한 야생 화염 괴수 떼가 몰려든다. 녹아내리는 암석과 유황 안개 너머, 피난처 방폭문을 지탱할 힘은 오직 그대의 어깨와 화염 무기뿐이다.",
    choices: [
      {
        label: "[강인 판정] 갈라진 방폭문 앞 용암 협로에 홀로 버티고 서서 화염 괴수 떼의 쇄도를 정면으로 막아 낸다",
        check: { stat: "T", diff: -10 },
        success: {
          text: "'전투의 불길 속으로, 모루 위로!' 들끓는 화산재와 괴수들의 날카로운 발톱을 초록빛 세라마이트로 받아 내며 지진이 잦아들 때까지 단 한 걸음도 물러서지 않았다! 지하 피난처의 시민 수만 명이 무사히 밤을 넘겼다.",
          stats: { T: 9, WP: 7, Fel: 6, Inf: 7 },
          faith: 12
        },
        fail: {
          text: "거대 화염 괴수의 꼬리 강타에 가슴 장갑이 찢어지며 중상을 입었으나, 방폭문 봉쇄가 끝날 때까지 끝내 협로를 내어 주지 않았다.",
          wounds: -25,
          stats: { T: 4, WP: 4 },
          faith: 6
        }
      },
      {
        label: "[사격 판정] 멜타 라이플과 중화염방사기로 용암 동굴 천장의 암반을 정밀 붕괴시켜 괴수 무리의 진입로를 통째로 막아 버린다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "정확한 열선 집중 사격에 거대한 현무암 천장이 무너지며 지하 균열을 완벽히 봉쇄했다! 피난처 내부로 단 한 마리의 괴수도 발을 들이지 못했다.",
          stats: { BS: 8, Int: 5, Fel: 5, Inf: 6 },
          faith: 8
        },
        fail: {
          text: "연이은 여진에 조준이 흔들리며 낙석 파편을 어깨에 맞았고, 괴수 일부가 외곽 통로로 새어 들어와 힘겨운 소탕전을 치러야 했다.",
          wounds: -18,
          stats: { BS: 2, Inf: -2 }
        }
      },
      {
        label: "[교섭 판정] 공황에 빠진 성소 도시 민병대와 피난민을 직접 지휘해 내진 구역 이동과 부상자 응급 처치를 완수한다",
        req: { anyTags: ["astartes_sergeant", "astartes_captain", "chapter_master", "role_apothecary"] },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "어둠 속에서 울려 퍼진 샐러맨더의 침착한 음성에 시민들이 질서를 되찾았다! 단 한 명의 압사자도 없이 모든 주민을 안전한 심층 방공호로 옮긴 뒤 괴수 무리까지 물리쳤다.",
          stats: { Fel: 8, Inf: 8, WP: 6 },
          faith: 12
        },
        fail: {
          text: "강한 여진으로 천장 배관이 터지며 대피 행렬이 흔들렸고, 무너지는 보를 몸으로 받쳐 시민을 구하다 허리에 깊은 부상을 입었다.",
          wounds: -16,
          stats: { Fel: -2, T: 3 }
        }
      },
      {
        label: "방폭문 수동 잠금 장치를 고정한 뒤 지열 경보망을 복구해 성소 도시 수비대의 구원 포격 좌표를 잡아 준다",
        effect: {
          text: "무리한 단독 혈투 대신 성소 도시 수비대와 완벽히 호흡을 맞췄다. 정확한 지원 포격이 괴수 떼를 몰아내며 지하 피난처를 지켜 냈다.",
          stats: { Int: 5, T: 4, Fel: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Time of Trial / Codex Supplement: Salamanders"
  }
];
