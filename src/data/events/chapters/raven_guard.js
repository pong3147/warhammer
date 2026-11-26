// 분기 사건 — 레이븐 가드 전용 (1:1 단독 승격)
export default [
  {
    id: "ev_chap_raven_guard",
    title: "레이븐 가드 — 그림자 걸음과 침묵의 참수 작전",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 레이븐 가드",
    weight: 34,
    text: "반역 행성 총독의 철옹성 요새에 정면으로 돌격하면 아스트라 밀리타룸 3개 연대가 전멸할 상황이다. 제국군 장군은 포격 소모전을 고집하지만, 코르부스 코락스의 아들들에게는 더 우아하고 치명적인 방법이 있다.",
    choices: [
      {
        label: "[민첩 판정] 그림자 걸음으로 단신 잠입해 반역 총독의 목을 조용히 벤다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "'그림자로부터 승리를!' 단 한 발의 경보도 울리지 않은 채 반역 지휘부가 몰살당했다. 동틀 녘 요새 성문이 스스로 열리며 무혈 입성이 이뤄졌다!",
          stats: { Ag: 8, WS: 5, Int: 5 },
          addTags: ["shadow_master"]
        },
        fail: {
          text: "레이저 경보망에 발각되어 수십 명의 경비대와 난전을 벌인 끝에 간신히 폭파만 마치고 탈출했다.",
          wounds: -22,
          stats: { Ag: 4, WS: 3 }
        }
      },
      {
        label: "[사격 판정] 점프팩 소대를 이끌고 야간에 적 중화기 발전소와 통신탑을 동시 절단한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "눈과 귀가 먼 적군은 새벽 총공세 앞에 순식간에 무너졌다. 아군 피해는 1% 미만이었다.",
          stats: { BS: 6, Ag: 4, Int: 4 }
        },
        fail: {
          text: "대공포 사격에 점프팩이 손상되어 추락했으나, 끝내 발전소를 폭파해 임무는 완수했다.",
          wounds: -18,
          stats: { Ag: 3 }
        }
      }
    ],
    source: "Lexicanum: Raven Guard / Codex Supplement: Raven Guard"
  },
  {
    id: "ev_chap2_raven_guard",
    title: "레이븐 가드 — 칠흑 눈동자의 저주 세이블 브랜드",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 레이븐 가드",
    weight: 28,
    text: "거울 속 자신의 눈동자가 완전한 칠흑으로 물들며 말수가 줄어들고 죽음만을 갈망하는 유전적 우울, 세이블 브랜드의 전조가 찾아왔다! 이 저주에 사로잡힌 레이븐 가드 전사는 침묵의 암살 부대 섀도우 킬러가 되어 홀로 죽음을 찾아 적진으로 뛰어든다.",
    choices: [
      {
        label: "[의지 판정] 코르부스 코락스의 가르침을 되새기며 어둠의 충동을 차가운 집중력으로 제어한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "죽음의 유혹을 정면으로 이겨 내고 그림자보다 고요한 암살자의 경지에 도달했다!",
          stats: { WP: 7, Ag: 6, BS: 4 },
          addTags: ["shadow_master"]
        },
        fail: {
          text: "한동안 동료들과 단 한마디도 나누지 못한 채 그림자 속에 틀어박혀 홀로 고통을 삭여야 했다.",
          stats: { Fel: -4, Ag: 4, WP: 3 }
        }
      },
      {
        label: "[민첩 판정] 어차피 타오르는 죽음의 갈망이라면 적 폭군 지휘부 한복판에 쏟아붓는다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "쌍권총과 라이트닝 클로가 어둠을 가르고 적 사령관 셋을 단신으로 베어 냈다! 피로써 세이블 브랜드의 열병을 식혔다.",
          stats: { Ag: 7, WS: 6, BS: 5 },
          wounds: -12
        },
        fail: {
          text: "무모한 단독 돌입 끝에 중상을 입고 섀도우 캡틴의 구조로 간신히 철수했다.",
          wounds: -24,
          stats: { WS: 4 }
        }
      }
    ],
    source: "Lexicanum: Sable Brand / Codex Supplement: Raven Guard"
  },
  {
    id: "ev_s4_tag_shadow_master",
    title: "그림자 마스터 — 적 궤도 기함 사령부로의 무음 침투",
    category: "명예 태그 연작",
    once: true,
    req: {
      allTags: ["shadow_master"],
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "이력: 레이븐 가드 그림자 마스터",
    weight: 38,
    text: "제국 수송 항로를 봉쇄한 반란 함대의 궤도 기함. 정면 함대전으로 부딪히면 아군 호위함대 절반이 부서질 위기에서, 그림자 걸음의 극의에 오른 그대에게 무음 침투 셔틀로 적 기함 함교에 단독 잠입해 함대 사령관을 제거하고 방어막을 무력화하라는 극비 임무가 하달되었다.",
    choices: [
      {
        label: "[민첩 판정] 기함 내부 감시 서보스컬과 레이저 격자 사이를 그림자처럼 스쳐 지나가 적 함대 사령관을 단신 암살한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "경보 한 번 울리지 않은 채 적 기함 함교가 침묵했다! 다음 날 새벽, 지휘를 잃은 반란 함대는 아군 정규 함대 앞에 무릎을 꿇었다.",
          stats: { Ag: 9, WS: 5, Inf: 8 }
        },
        fail: {
          text: "선내 경비대의 탐조등에 포착되어 난전 끝에 겨우 탈출했으나, 핵심 통신 안테나만은 폭파해 적을 혼란에 빠뜨렸다.",
          wounds: -18,
          stats: { Ag: 5, BS: 3 }
        }
      },
      {
        label: "[지성 판정] 암살 대신 적 함대의 보이드 실드 제어망과 암호 통신을 교란해 반란 함선들이 서로 포격을 퍼붓게 만든다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "코락스의 계략이 빛을 발했다! 의심에 사로잡힌 반란 함장들이 자중지란을 일으키며 스스로 무너졌다.",
          stats: { Int: 8, Ag: 5, Inf: 7 }
        },
        fail: {
          text: "기만 공작이 일부 간파되었으나, 시간을 벌어 아군 강습정의 기습 접현을 성공시켰다.",
          wounds: -12,
          stats: { Int: 4, Ag: 3 }
        }
      },
      {
        label: "기함 내부 보이드 실드 발전기의 취약 좌표만 완벽히 정찰해 아군 본대의 정밀 랜스 포격에 넘긴다",
        effect: {
          text: "불필요한 모험 대신 확실한 정보를 가져왔다. 본대의 정밀 타격으로 적 기함의 동력로가 순식간에 증발했다.",
          stats: { Ag: 5, Int: 5 }
        }
      }
    ],
    source: "Lexicanum: Shadowmasters / Codex Supplement: Raven Guard"
  },
  {
    id: "ev_s16_ch2_rg_1",
    title: "레이븐 가드 — 레이븐스파이어 야간 무음 침투 훈련",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes", "battle_brother"],
      anyChapters: ["raven_guard"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "배틀 브라더 · 챕터: 레이븐 가드",
    weight: 30,
    text: "모성 딜리버런스의 칠흑 같은 밤하늘을 찌르는 첨탑 요새 레이븐스파이어. 검은 암석 평원 위로 독안개가 깔린 자정, 섀도우 캡틴이 실탄 감시 포탑과 서보스컬 탐지망을 모두 가동한 채 첨탑 최상층 종탑까지 흔적 없이 오르라는 야간 무음 침투 훈련을 선포했다. 세라마이트 갑주의 무게를 지닌 채 바람 소리조차 내지 말아야 한다.",
    choices: [
      {
        label: "[민첩 판정] 동력 배낭 출력을 최저치로 낮추고 첨탑 외벽의 칠흑 그림자만 밟으며 최상층 종탑까지 단숨에 잠입한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "단 한 개의 열감지 센서도 울리지 않았다! 새벽 종이 울리기 직전 섀도우 캡틴의 등 뒤에 검은 깃털 표식을 남겨 두고 유령처럼 사라지며 챕터의 찬사를 받았다.",
          stats: { Ag: 8, WS: 5, Inf: 5 },
          addTags: ["shadow_master"]
        },
        fail: {
          text: "젖은 암벽에서 발이 미끄러지며 자동 감시 포탑의 탐조등에 포착되었고, 연습용 충격탄을 정면으로 맞고 추락해 타박상을 입었다.",
          wounds: -16,
          stats: { Ag: 2, Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 레이븐스파이어의 감시 서보스컬 순찰 주기와 환기구 사각지대를 분석해 완벽한 은신 경로를 설계한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "정밀한 계산 끝에 서보스컬 렌즈 바로 아래 사각을 유유히 통과했다! 은신은 단순한 몸놀림이 아니라 냉철한 지략에서 완성됨을 입증했다.",
          stats: { Int: 7, Ag: 5, BS: 4 }
        },
        fail: {
          text: "예비 센서망의 불규칙 가동 주기를 놓쳐 보안 격벽에 갇히고 말았고, 훈련 교관으로부터 가혹한 질책을 들었다.",
          wounds: -10,
          stats: { Int: -2, Inf: -2 }
        }
      },
      {
        label: "[지성 판정] 요새의 탐지 파장을 교란하거나 그림자 장막으로 자신의 기척을 지워 감시망을 무력화한다",
        req: { anyTags: ["role_techmarine", "role_librarian"] },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "기계령의 눈도, 적외선 감시망도 그대의 존재를 전혀 감지하지 못했다! 첨탑 정상에 가장 먼저 도달해 전문 직책의 진가를 증명했다.",
          stats: { Int: 8, Ag: 6, WP: 5 }
        },
        fail: {
          text: "교란 신호가 역으로 탐지망의 경보를 울려 집중 사격을 받으며 부상을 입고 말았다.",
          wounds: -15,
          stats: { WP: -2 }
        }
      },
      {
        label: "최단 돌파 경쟁 대신 외곽 암벽에 매복해 다른 형제들의 침투 동선과 포탑 사각을 세밀히 관찰한다",
        effect: {
          text: "서두르지 않고 사냥감의 호흡을 읽듯 요새의 방어망을 머릿속에 새겼다. 실전에서 살아남는 데 가장 값진 인내의 훈련이었다.",
          stats: { Ag: 4, Int: 5, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Ravenspire / Codex Supplement: Raven Guard"
  },
  {
    id: "ev_s16_ch2_rg_2",
    title: "레이븐 가드 — 지하 광산 노예 저항군 해방과 폭군 통치부 교란",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 레이븐 가드",
    weight: 34,
    text: "반란을 일으킨 폭군이 광산 행성의 주민들을 지하 갱도에 가두고 철권으로 억누르고 있다. 옛날 프라이마크 코르부스 코락스가 압제자들로부터 딜리버런스의 노예들을 해방했듯, 레이븐 가드는 적 수괴를 쓰러뜨리는 것만으로 멈추지 않는다. 어둠을 틈타 지하 광산에 잠입해 억압받던 현지 노예 저항군을 무장시키고, 지상 통치부의 감시망과 탄약고를 교란해 행성 스스로 사슬을 끊게 할 기회가 열렸다.",
    choices: [
      {
        label: "[민첩 판정] 지상 통치부의 감시탑과 통신 중계소에 소리 없이 침투해 폭군의 진압 명령망을 완전히 마비시킨다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "어둠 속에서 라이트닝 클로가 통신선과 경보 회로를 단숨에 절단했다! 눈과 귀가 먼 지상 통치부가 혼란에 빠진 틈을 타 지하 광산의 해방 봉기가 행성 전역으로 번졌다.",
          stats: { Ag: 8, WS: 6, Inf: 7 }
        },
        fail: {
          text: "통치부 친위대의 야간 순찰대에 발각되어 좁은 지하 통로에서 격전을 치르며 깊은 부상을 입었으나, 핵심 중계탑만은 폭파하고 이탈했다.",
          wounds: -22,
          stats: { Ag: 3, WS: 3 }
        }
      },
      {
        label: "[교섭 판정] 지하 광산 갱도에 직접 잠입해 노예 저항군에게 유격전술을 전수하고 탈취한 무기를 분배한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "코락스의 해방 서사가 되살아났다! 스스로 무기를 든 광부 저항군이 요충지 발전소와 수송로를 동시에 점거하며 폭군의 통치부를 안에서부터 무너뜨렸다.",
          stats: { Fel: 7, Int: 6, Inf: 7 },
          faith: 8
        },
        fail: {
          text: "저항군 내부에 숨어 있던 폭군의 밀고자에게 기습당해 큰 상처를 입었고, 겨우 포위망을 뚫어 내며 지하 세포 조직을 재정비해야 했다.",
          wounds: -18,
          stats: { Fel: -2, Inf: -2 }
        }
      },
      {
        label: "[사격 판정] 광산 지구 감시 초소 지붕에 은신한 채 저격용 볼터로 폭군의 집행관들과 중화기 진지를 차례로 제거한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "안개 속에서 발사된 정밀 탄환이 감시탑의 중화기 사수들과 통치부 집행관들을 소리 없이 쓰러뜨렸다! 길이 열린 노예 저항군이 함성을 지르며 광산 봉쇄선을 돌파했다.",
          stats: { BS: 8, Ag: 5, Int: 5 }
        },
        fail: {
          text: "탐조등에 위치가 노출되어 장갑차의 집중 기관포 사격을 받았고, 지붕에서 뛰어내려 철수하다 갑주가 크게 손상되었다.",
          wounds: -18,
          stats: { BS: 3 }
        }
      },
      {
        label: "지하 광산 환기구를 통해 비밀 무기고를 열어 주고 지상 통치부 순찰 시간표만 저항군 지도부에 넘긴 뒤 그림자로 물러난다",
        effect: {
          text: "어둠 속에서 건넨 무기와 정보가 행성 전체를 뒤엎는 해방의 불길로 번졌다. 코락스가 꿈꾼 자력 해방의 정신을 최소한의 개입으로 실현했다.",
          stats: { Int: 5, Ag: 4, Fel: 4 }
        }
      }
    ],
    source: "Lexicanum: Corvus Corax / Codex Supplement: Raven Guard"
  },
  {
    id: "ev_s16_ch2_rg_3",
    title: "레이븐 가드 — 키아바르 장비 협상과 모르데이탄 저격 분대 배치",
    category: "챕터 고유",
    once: true,
    req: {
      allTags: ["astartes"],
      anyChapters: ["raven_guard"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought"]
    },
    reqLabel: "챕터: 레이븐 가드",
    weight: 30,
    text: "위성 딜리버런스가 공전하는 공업 행성 키아바르의 기계교 요새에서 긴급 사절단이 찾아왔다. 챕터에 공급할 무음 점프팩과 카멜레올린 망토, 유전자 보관 장치의 조달을 두고 키아바르 기술 길드가 까다로운 조건을 내걸고 있다. 한편 최전선에서는 재의 실명과 세이블 브랜드의 어두운 유산을 안고도 얼음 같은 정밀함을 유지하는 모르데이탄의 전통을 잇는 정예 저격 분대의 투입 구역을 서둘러 확정해야 한다.",
    choices: [
      {
        label: "[교섭 판정] 코락스 시대부터 이어진 딜리버런스와 키아바르의 상호 방위 조약을 상기시키며 최신 스텔스 장비 조달을 관철한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "수천 년 묵은 의구심을 차분한 위엄으로 잠재웠다! 키아바르 기계교 요새가 최상급 카멜레올린 망토와 저격용 소음 볼터 물량을 기한보다 앞서 납품하기로 서약했다.",
          stats: { Fel: 8, Int: 6, Inf: 7 }
        },
        fail: {
          text: "키아바르 기술 사제들이 과거 해방 전쟁의 앙금을 들추며 협상을 결렬시켰고, 예비 보급선 확보에 차질이 빚어져 지휘부의 질책을 받았다.",
          stats: { Fel: -2, Inf: -3 }
        }
      },
      {
        label: "[사격 판정] 모르데이탄 저격 분대와 함께 전선 최전방의 사각지대에 직접 매복해 적 지휘관 암살 좌표를 확립한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "재의 실명 같은 어두운 격정조차 차가운 조준경 너머 한 점의 살의로 승화되었다! 첫 일제 저격만으로 적 야전 지휘부 전체가 소리 없이 무너졌다.",
          stats: { BS: 8, Ag: 6, WP: 5, Inf: 6 }
        },
        fail: {
          text: "적 대포병 탐지망에 저격 은신처가 포착되어 박격포 집중 포화를 맞고 부상을 입은 채 급히 진지를 옮겨야 했다.",
          wounds: -20,
          stats: { BS: 2, Ag: 2 }
        }
      },
      {
        label: "[지성 판정] 키아바르 공방의 장비를 직접 검수해 유전자 보관 장치의 결함을 바로잡고 스텔스 코팅 효율을 끌어올린다",
        req: { anyTags: ["role_techmarine", "role_apothecary"] },
        check: { stat: "Int", diff: 0 },
        success: {
          text: "기계교 기술자들도 놓친 미세 출력 누설을 찾아내어 완벽히 교정했다! 챕터의 소중한 진시드 보관 안정성과 모르데이탄 분대의 은신 성능이 동시에 한 단계 도약했다.",
          stats: { Int: 8, T: 5, Inf: 6 }
        },
        fail: {
          text: "검수 도중 불안정한 스텔스 장막 발전기가 과열 폭발해 화상을 입었고, 키아바르 기술 사제와의 관계가 한층 서먹해졌다.",
          wounds: -15,
          stats: { Int: -2, Inf: -2 }
        }
      },
      {
        label: "장비 협상은 챕터 병기창 장로들에게 맡기고, 모르데이탄 분대의 보급선과 야간 철수로만 치밀하게 점검한다",
        effect: {
          text: "소리 없는 전쟁은 철저한 후방 준비에서 시작된다. 단 하나의 누설도 없는 보급과 철수 계획 덕분에 저격 분대가 전 작전을 무사히 마쳤다.",
          stats: { Int: 5, BS: 4, Ag: 4 }
        }
      }
    ],
    source: "Lexicanum: Kiavahr / Lexicanum: Mor Deythan / Codex Supplement: Raven Guard"
  }
];
