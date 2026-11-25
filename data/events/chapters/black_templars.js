// 분기 사건 — 블랙 템플러 전용 (1:1 단독 승격)
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
  {
    id: "ev_chap_black_templars",
    title: "블랙 템플러 — 황제의 투사의 계시",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "챕터: 블랙 템플러",
    weight: 34,
    text: "성전 출정 전야의 철야 기도 도중, 눈부신 황금빛 환상이 눈앞에 펼쳐졌다! 1만 년 전 지기스문트가 휘둘렀던 검은 검과 황제의 천둥 같은 음성이 적 카오스 군주의 목을 베라 명하고 있다!",
    choices: [
      {
        label: "[백병 판정] 채플린에게 계시를 고하고 검은 검을 하사받아 '황제의 투사'로 적장 일기토에 나선다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "'자비도, 후회도, 두려움도 없다!' 검은 갑주와 검은 검의 일섬이 카오스 군주의 투구를 두 동강 냈다! 전 성전군이 그대의 이름으로 승전의 성가를 외쳤다!",
          stats: { WS: 9, WP: 7, Inf: 8 },
          faith: 18,
          addTags: ["emperors_champion"]
        },
        fail: {
          text: "적장의 악마 검에 옆구리를 깊게 베였으나 끝내 적을 후퇴시키고 살아 돌아왔다.",
          wounds: -28,
          stats: { WS: 4, WP: 5 },
          faith: 8
        }
      },
      {
        label: "겸허히 계시를 성전 서약의 징표로 삼아 검 형제단의 최선두 돌격대를 이끈다",
        effect: {
          text: "체인을 팔뚝에 감아 묶고 성전 군기를 높이 치켜든 채 적진을 뚫고 나아갔다.",
          stats: { WS: 5, WP: 5, T: 3 },
          faith: 12
        }
      }
    ],
    source: "Lexicanum: Emperor's Champion / Codex Supplement: Black Templars"
  },
  {
    id: "ev_chap2_black_templars",
    title: "블랙 템플러 — 영원한 성전 함대와 네오파이트 도제 서약",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "chapter_master"]
    },
    reqLabel: "배틀 브라더 · 챕터: 블랙 템플러",
    weight: 28,
    text: "블랙 템플러에는 코덱스식 스카웃 중대가 없다. 대신 정식 이니시에이트가 신참 네오파이트 한 명을 직접 제자로 거두어 전장의 불길 속에서 가르친다. 성전선 '이터널 크루세이더' 예배당에서 패기 넘치는 소년 네오파이트가 그대 앞에 무릎 꿇고 쇠사슬을 바친다.",
    choices: [
      {
        label: "[백병 판정] 네오파이트를 직접 제자로 받아들여 최전선 돌격에서 검술과 신앙을 전수한다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "'자비도, 후회도, 두려움도 없다!' 스승과 제자가 함께 쇠사슬로 무기를 묶고 적진을 뚫었다! 훗날 훌륭한 검 형제로 성장할 인재를 길러 냈다.",
          stats: { WS: 6, Fel: 5, WP: 5, Inf: 5 },
          faith: 12
        },
        fail: {
          text: "너무 앞서 나간 제자를 감싸다 적의 체인액스에 어깨를 베였으나, 두 사람 모두 살아남아 교훈을 새겼다.",
          wounds: -18,
          stats: { WP: 5 },
          faith: 8
        }
      },
      {
        label: "채플린과 함께 성전 함대 전 장병 앞에서 '불경한 자를 혐오하라'는 철야 서약을 낭송한다",
        effect: {
          text: "천 명 넘는 흑갑 기사들의 함성이 성전함 선체를 울렸다. 어떠한 워프의 유혹도 뚫지 못할 광신이 깃들었다.",
          stats: { WP: 6, T: 3 },
          faith: 16,
          corruption: -10
        }
      }
    ],
    source: "Lexicanum: Black Templars / Codex Supplement: Black Templars"
  },
  {
    id: "ev_s4_tag_emperors_champion",
    title: "황제의 투사 — 검은 검이 가리킨 적 군주와의 일기토",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["emperors_champion"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 블랙 템플러 황제의 투사",
    weight: 38,
    text: "황제의 계시를 받아 검은 갑주와 검은 검을 수여받은 그대의 눈앞에, 전장 한복판에서 붉은 깃발을 휘두르는 적의 카오스 군주가 나타났다. 성전군 형제들이 일제히 길을 터 주며 황제의 투사가 치를 신성한 일기토를 지켜본다.",
    choices: [
      {
        label: "[백병 판정] 어떠한 주저도 없이 돌진해 검은 검으로 적 군주의 목을 베어 낸다",
        check: { stat: "WS", diff: -10 },
        success: {
          text: "황제의 이름이 전장에 울려 퍼지며 검은 검이 적 군주의 갑주를 양단했다! 성전군 전체가 광신적인 환호와 함께 적진을 붕괴시켰다.",
          stats: { WS: 9, WP: 6, Inf: 8 },
          faith: 12,
          addTags: ["hero_of_imperium"]
        },
        fail: {
          text: "적 군주의 흉악한 반격에 치명상을 입었으나, 끝내 상대의 무기를 부러뜨리고 전선에서 몰아냈다.",
          wounds: -24,
          stats: { WS: 5, T: 4 },
          faith: 6
        }
      },
      {
        label: "[의지 판정] 성가를 외치며 적의 워프 저주를 정면으로 튕겨 내고 틈을 노려 찌른다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불굴의 신앙이 사악한 마법을 무력화시켰고, 당황한 적 군주를 단칼에 쓰러뜨렸다!",
          stats: { WP: 8, WS: 6, Inf: 6 },
          faith: 10,
          corruption: -10
        },
        fail: {
          text: "워프 화염에 갑주가 그을렸으나 신앙으로 버텨 내며 적의 진격을 멈추었다.",
          wounds: -18,
          stats: { WP: 5 }
        }
      },
      {
        label: "무리한 단독 돌격 대신 형제들과 쐐기 진형을 짜 적 지휘부를 함께 분쇄한다",
        effect: {
          text: "화려한 일기토 대신 성전군 전체의 승리를 택했다. 채플린이 그대의 냉정한 헌신을 높이 샀다.",
          stats: { WS: 4, T: 4, Inf: 4 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Emperor's Champion / Codex Supplement: Black Templars"
  },
  {
    id: "ev_s16_ch2_bt_1",
    title: "블랙 템플러 — 성전 출격 전야의 신성한 맹세",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 블랙 템플러",
    weight: 32,
    text: "새 성전군이 반역 성계로 강하하기 전날 밤, 성전함 대예배당에 수백 자루의 성촉이 타오른다. 해골 투구를 쓴 채플린이 성유물함을 높이 치켜들고 전 장병에게 이번 성전에서 피로써 지켜 낼 신성한 맹세를 택하라고 외친다. 팔뚝에 쇠사슬을 감은 형제들의 눈빛이 광신적인 결의로 불타오른다.",
    choices: [
      {
        label: "[의지 판정] 마녀를 혐오하며 불경한 요술을 짓밟겠다는 맹세를 택해 워프의 저주에 맞설 강철 신앙을 다진다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "'마녀의 생존을 허락지 말라!' 맹세의 외침이 예배당 아치를 뒤흔들었다. 어떠한 사악한 마법과 환상도 뚫지 못할 불굴의 증오가 영혼에 새겨졌다.",
          stats: { WP: 8, T: 5, Inf: 5 },
          faith: 15,
          corruption: -12
        },
        fail: {
          text: "철야 금식과 격렬한 맹세 의식 도중 과도한 고행으로 체력이 소진되어 출격 전부터 피를 토했다.",
          wounds: -14,
          stats: { T: -2 },
          faith: 6
        }
      },
      {
        label: "[백병 판정] 이단자의 머리를 분쇄하겠다는 맹세를 외치며 검 형제들과 피의 모의 대련을 벌인다",
        check: { stat: "WS", diff: 0 },
        success: {
          text: "사슬에 묶인 검이 불꽃을 튀기며 대련 상대를 단숨에 제압했다! 채플린이 그대의 무기에 축성 기름을 부으며 선봉 돌격의 영광을 허락했다.",
          stats: { WS: 7, T: 5, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "성급한 맹공에 빈틈을 내어 주어 상대의 체인소드 칼등에 어깨를 깊게 다쳤다.",
          wounds: -16,
          stats: { WS: -2, WP: 2 }
        }
      },
      {
        label: "[권위 판정] 제단 앞에 직접 올라 지기스문트의 고대 성전 서약을 낭독하며 전 성전군의 광신을 하나로 묶는다",
        req: { anyTags: ["role_chaplain", "emperors_champion"] },
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "수백 명의 흑갑 기사가 일제히 무릎 꿇고 황제의 이름을 포효했다! 성전군 전체가 죽음조차 두려워하지 않는 무적의 십자군으로 거듭났다.",
          stats: { Inf: 8, Fel: 7, WP: 6 },
          faith: 18,
          corruption: -8
        },
        fail: {
          text: "강경파 형제들과 성전 목표를 둘러싼 교리 해석이 어긋나 예배당의 열기가 어수선하게 식어 버렸다.",
          stats: { Inf: -3, Fel: -2 },
          faith: -4
        }
      },
      {
        label: "어떠한 대가를 치르더라도 황제의 명예를 수호하겠다는 맹세를 조용히 가슴에 새기며 갑주를 정비한다",
        effect: {
          text: "화려한 구호 대신 묵묵히 순결 인장을 갑주에 봉인하고 검은 십자가 문장을 닦아 냈다. 지기스문트가 보여 준 흔들림 없는 기사도가 깃들었다.",
          stats: { WP: 5, WS: 4, T: 4 },
          faith: 12
        }
      }
    ],
    source: "Lexicanum: Templar Vows / Codex Supplement: Black Templars"
  },
  {
    id: "ev_s16_ch2_bt_2",
    title: "블랙 템플러 — 기함 이터널 크루세이더 궤도 강습전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 블랙 템플러",
    weight: 34,
    text: "블랙 템플러의 거대한 기함 이터널 크루세이더가 적 궤도 요새의 방어 화망 한가운데로 돌진했다! 선체 포격이 적 방어막을 찢어 놓은 찰나, 강습 어뢰와 드롭 포드 사출 경보가 울려 퍼진다. 검 형제단 돌격 소대가 성전 군기를 치켜들고 적 궤도 성채의 심장부로 곧장 내려꽂힐 찰나다.",
    choices: [
      {
        label: "[백병 판정] 검 형제단 최선두 강습 어뢰에 탑승해 적 요새 함교 격벽을 뚫고 정면 백병 돌격을 지휘한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "충돌의 폭음과 함께 붉은 망토를 두른 검 형제들이 적 함교로 쏟아져 들어갔다! 그대의 파워 소드가 적 함대 사령관의 목을 베어 내며 궤도 요새의 주포를 침묵시켰다.",
          stats: { WS: 8, T: 5, Inf: 7 },
          faith: 12
        },
        fail: {
          text: "강습 어뢰가 적 근접 방어 포화에 맞아 궤도가 틀어졌고, 격벽 파편에 중상을 입은 채 힘겨운 난전을 치러야 했다.",
          wounds: -22,
          stats: { WS: 3, T: 3 }
        }
      },
      {
        label: "[강인 판정] 대공 포화가 빗발치는 강하 구역으로 드롭 포드를 강행 착륙시켜 교두보를 확보한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "불타는 강하 충격과 적의 중화기 사격을 검은 세라마이트로 버텨 냈다! 순식간에 구축된 교두보 위로 후속 성전군이 물밀듯 쏟아져 내려왔다.",
          stats: { T: 8, WP: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "적 대공 포탄이 드롭 포드 외벽을 찢어 내며 내부에서 폭발해 뼈가 부러지는 충격을 입었다.",
          wounds: -24,
          stats: { T: 4 }
        }
      },
      {
        label: "[권위 판정] 이터널 크루세이더 함교와 실시간 연동해 검 형제단과 터미네이터 순간이동 강습을 동시 통솔한다",
        req: { anyTags: ["astartes_sergeant", "astartes_captain", "chapter_master", "terminator_honors"] },
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "기함의 매크로 포격과 검 형제단의 쐐기 돌격이 한 치의 오차 없이 맞물렸다! 난공불락이라던 적 궤도 성채가 단 두 시간 만에 성전군의 손에 떨어졌다.",
          stats: { Inf: 9, WS: 6, Int: 5 },
          faith: 12
        },
        fail: {
          text: "순간이동 신호가 적 방해장에 어긋나 돌격 부대가 분산되었고, 지휘 책임을 안고 직접 구출 작전에 뛰어들어 부상을 입었다.",
          wounds: -18,
          stats: { Inf: -3 }
        }
      },
      {
        label: "제2파 강습정을 이끌고 선봉이 뚫어 놓은 외곽 발전소와 통로를 확실히 장악하며 보급선을 굳힌다",
        effect: {
          text: "광신적인 돌격 뒤를 든든히 받쳐 적의 역습로를 완전히 틀어막았다. 마셜이 그대의 냉철한 돌파 지원을 높이 평가했다.",
          stats: { WS: 4, BS: 4, T: 4 },
          faith: 8
        }
      }
    ],
    source: "Lexicanum: Eternal Crusader / Codex Supplement: Black Templars"
  },
  {
    id: "ev_s16_ch2_bt_3",
    title: "블랙 템플러 — 이단 사이커 교주와의 사슬 체인소드 결투",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["black_templars"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 블랙 템플러",
    weight: 32,
    text: "더럽혀진 제국 대성당 광장 한가운데, 부정한 워프 번개를 두른 이단 사이커 교주가 미친 듯이 웃으며 사악한 주술을 퍼붓고 있다. 공중에서 쏟아지는 보랏빛 화염에 보병 대열이 갈려 나가는 순간, 블랙 템플러의 본능적인 증오가 혈관 속에서 끓어오른다. 그대는 헌신의 쇠사슬로 체인소드를 건틀릿에 단단히 감아 묶고 악마의 하수인을 노려보았다.",
    choices: [
      {
        label: "[의지 판정] 황제를 찬양하는 성가를 포효하며 워프 번개와 정신 지배의 속삭임을 정면으로 뚫고 돌진한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "사악한 주술이 불굴의 광신 앞에서 유리처럼 산산조각 났다! 경악한 이단 교주의 가슴팍을 사슬에 묶인 체인소드로 단숨에 갈라 버리며 광장의 저주를 끊어 냈다.",
          stats: { WP: 9, WS: 6, Inf: 7 },
          faith: 18,
          corruption: -12
        },
        fail: {
          text: "워프의 비명이 머릿속을 할퀴고 번개가 갑주를 태우며 깊은 화상과 정신적 충격을 남겼다. 가까스로 버텨 냈으나 교주는 잔당 뒤로 달아났다.",
          wounds: -20,
          corruption: 4,
          stats: { WP: 3 }
        }
      },
      {
        label: "[백병 판정] 사슬의 무게를 실은 체인소드 맹공으로 교주의 호위 광신도들을 베어 넘기며 근접 결투를 강제한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "주문을 외울 틈조차 주지 않았다! 굉음을 내며 회전하는 톱날이 교주의 지팡이와 목을 동시에 절단하자 타락한 이단 군세가 일거에 붕괴했다.",
          stats: { WS: 8, T: 5, Inf: 6 },
          faith: 12,
          corruption: -6
        },
        fail: {
          text: "호위 광신도들의 자폭 공세에 발이 묶인 사이 교주의 염동력 일격에 날아가 돌기둥에 강하게 부딪혔다.",
          wounds: -22,
          stats: { WS: 3, T: 3 }
        }
      },
      {
        label: "볼트 피스톨의 축성 탄환으로 교주의 의식 제단을 먼저 파괴해 워프의 흐름을 끊은 뒤 형제들과 협공한다",
        effect: {
          text: "불경한 의식의 뿌리를 잘라 내자 교주의 힘은 절반 이하로 시들었다. 사방에서 쇄도한 형제들의 검날 아래 이단자는 흔적도 없이 사라졌다.",
          stats: { BS: 5, WP: 5, WS: 4 },
          faith: 10,
          corruption: -6
        }
      }
    ],
    source: "Lexicanum: Black Templars / Codex Supplement: Black Templars"
  }
);

