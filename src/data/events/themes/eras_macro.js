// 분기 사건 — Stage 18 거시 시대 전선 사건 6종 & 거시 이력 후속 파장 연작 6종
export default [
  // ============================================================================
  // Part A — 거시 시대 · 권역 전선 사건 6종 (weight: 26~32)
  // ============================================================================
  {
    id: "ev_s18_macro_gothic_convoy",
    title: "고딕 전쟁기 — 워프 폭풍 속 파손 보급 호송대의 갈림길",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 139,
      maxYear: 151,
      excludeWorldTags: ["feral"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "high_lord_terra", "met_ravensburg"
      ]
    },
    reqLabel: "139~151.M41 · 고딕 전쟁기",
    weight: 30,
    text: "약탈자 아바돈의 행성 파괴함과 블랙스톤 요새가 고딕 섹터의 하늘을 불태운다는 흉보가 돌던 밤, 포트 모 항구로 향하던 제국 보급 호송대가 사나운 워프 폭풍 가장자리에 갇혔다. 추진기가 반파된 후미 피난선 세 척이 뒤처진 가운데, 암흑 너머에서 카오스 약탈 순양함대의 추적 신호가 서서히 좁혀 오고 있다.",
    choices: [
      {
        label: "[교섭 판정] 피난선들을 기함 방어막 뒤로 묶어 포트 모까지 끝까지 호송한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "혼란에 빠진 선장들을 침착하게 통솔해 방어 진형을 짜고, 카오스 약탈선의 사격을 버텨 내며 피난선 전원을 포트 모 항구로 인도했다. 수만 명의 생존자가 그대를 구원의 등불로 기억했다.",
          stats: { Fel: 6, WP: 5, Inf: 5 },
          faith: 6,
          align: { humane: 9, dogmatic: -2 },
          addTags: ["gothic_war_vet", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "적 순양함의 집중 포화에 측면 장갑이 찢어지며 큰 부상을 입었으나, 끝까지 견인 케이블을 놓지 않아 상당수 피난선을 항구로 밀어 넣었다.",
          wounds: -20,
          stats: { WP: 3, Inf: -2 },
          align: { humane: 5 },
          addTags: ["gothic_war_vet"]
        }
      },
      {
        label: "[사격 판정] 군수 탄약선을 엄호하며 후미 포대로 카오스 약탈선을 정면 저지한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "흔들리는 갑판 위에서 정확한 일제 사격을 퍼부어 적 선봉 구축함의 함교를 날려 버렸다. 배틀플리트 고딕 사령부가 보급선을 지켜 낸 불굴의 포술을 높이 치하했다.",
          stats: { BS: 6, WP: 5, Inf: 6 },
          faith: 6,
          align: { dogmatic: 8 },
          addTags: ["gothic_war_vet"]
        },
        fail: {
          text: "적의 랜스 광선이 포탑 외벽을 훑고 지나가며 화상과 파편상을 입었으나, 탄약선 주력만은 간신히 워프 도약 좌표로 빠져나갔다.",
          wounds: -22,
          stats: { T: 3 },
          align: { dogmatic: 4 },
          addTags: ["gothic_war_vet"]
        }
      },
      {
        label: "[권위 판정] 뒤처진 민간 수송선을 미끼로 분리 투기해 주력 군수선만 탈출한다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "비명이 쏟아지는 복스 채널을 끊고 후미 민간선 연결을 강제 해제했다. 주력 군수선은 손실 없이 포트 모에 닿았으나, 어둠 속에 버려진 등불들의 잔상이 지워지지 않는 낙인으로 남았다.",
          stats: { Int: 5, Inf: 7, WP: 3 },
          align: { ruthless: 9, humane: -6 },
          addTags: ["gothic_war_vet"]
        },
        fail: {
          text: "분리 명령에 반발한 호위선과의 충돌 속에 부상을 입고 명성마저 훼손되었으나, 결국 냉혹한 희생 위에 군수선만 빠져나왔다.",
          wounds: -16,
          stats: { Inf: -3 },
          align: { ruthless: 6, humane: -4 },
          addTags: ["gothic_war_vet"]
        }
      },
      {
        label: "파손된 기관실의 겔러 필드를 응급 보수하며 워프 폭풍이 걷힐 때까지 버틴다",
        effect: {
          text: "비명 대신 침착한 정비에 매달려 선체 붕괴를 막아 냈다. 호송대는 만신창이가 된 채로 끝내 고딕 전쟁의 포화 속을 뚫고 살아남았다.",
          stats: { Int: 4, T: 4, WP: 3 },
          align: { dogmatic: 3 },
          addTags: ["gothic_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Gothic War / Battlefleet Gothic Rulebook (139~151.M41)"
  },
  {
    id: "ev_s18_macro_first_armageddon_aftermath",
    title: "수치의 달들 — 아마겟돈 격리 수용소와 늑대의 방패",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 444,
      maxYear: 451,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "high_lord_terra", "shame_protector", "shame_purger"
      ]
    },
    reqLabel: "444~451.M41 · 제1차 아마겟돈 직후",
    weight: 30,
    text: "앙그론과 코른 악마 군단이 물러난 아마겟돈 잿빛 평원에 거대한 철조망 격리 수용소가 들어섰다. 오르도 말레우스 이단심문관들은 악마의 존재를 목격한 장병과 시민 전원을 불임 처리하고 강제 노동형에 처하라고 명령했으나, 궤도 상공에서는 로간 그림나르의 스페이스 울프 호위함들이 수용소 수송선을 가로막으며 팽팽히 대치하고 있다.",
    choices: [
      {
        label: "[교섭 판정] 스페이스 울프 호위선과 연계해 격리 수용소 생존자들을 빼돌린다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "검문 장부를 교묘히 고치고 밤안개 속에 피난 셔틀을 띄워 수천 명의 아마겟돈 생존자를 늑대 함대의 보호 아래로 보냈다. 이단심문소의 의심을 샀으나, 살아남은 이들이 그대를 수호자로 기렸다.",
          stats: { Fel: 6, WP: 5, Inf: 4 },
          faith: 5,
          align: { humane: 10, dogmatic: -5 },
          addTags: ["shame_protector", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "궤도 봉쇄 경비대의 저지 사격에 어깨를 관통당하며 큰 부상을 입었으나, 끝내 무고한 생존자들의 탈출선을 막아 서지 않았다.",
          wounds: -20,
          stats: { WP: 3, Inf: -3 },
          align: { humane: 7, dogmatic: -3 },
          addTags: ["shame_protector"]
        }
      },
      {
        label: "[의지 판정] 악마의 비밀을 봉인해야 한다는 교리대로 심문소의 격리령을 집행한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "억울함을 외치는 병사들의 눈빛을 외면한 채 수용소 봉쇄와 기억 소거 절차를 빈틈없이 완수했다. 이단심문소는 흔들리지 않는 교조적 충성을 높이 기록했으나, 차가운 죄책감이 가슴에 남았다.",
          stats: { WP: 6, Int: 4, Inf: 6 },
          faith: 6,
          align: { dogmatic: 10, humane: -5 },
          addTags: ["shame_purger", "inquisition_favor"]
        },
        fail: {
          text: "절망한 수비대 생존자들의 격렬한 저항 속에 중상을 입고 임무를 겨우 마무리했다. 비밀을 지키는 대가는 참혹했다.",
          wounds: -18,
          stats: { WP: 3 },
          align: { dogmatic: 6, humane: -4 },
          addTags: ["shame_purger"]
        }
      },
      {
        label: "[권위 판정] 항의하는 수용소 구역을 반란으로 규정하고 냉혹한 무력 진압을 강행한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "단 한 줄의 항명 기록도 남기지 않은 채 수용소 구역 전체를 무력으로 제압하고 명부를 소각했다. 잔혹한 효율성으로 상부의 공포 섞인 인정을 얻었다.",
          stats: { Inf: 7, WS: 4, Int: 4 },
          align: { ruthless: 10, dogmatic: 4, humane: -8 },
          addTags: ["shame_purger"]
        },
        fail: {
          text: "강경 진압에 격분한 현지 병력과 스페이스 울프 정찰대의 반격을 받아 큰 상처를 입고 지휘권에 타격을 입었다.",
          wounds: -22,
          stats: { Inf: -4 },
          align: { ruthless: 6, humane: -5 },
          addTags: ["shame_purger"]
        }
      },
      {
        label: "수용소 외곽 보급 검문만 지키며 두 거대 세력의 충돌에서 한 발 물러선다",
        effect: {
          text: "포문이 서로를 겨눈 살얼음판 같은 몇 달을 침묵 속에 버텨 냈다. 손에 동포의 피를 묻히지 않은 것만으로도 힘겨운 위안이었다.",
          stats: { WP: 4, T: 4 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Months of Shame / The Emperor's Gift (444~446.M41)"
  },
  {
    id: "ev_s18_macro_cordon_world",
    title: "크립트만의 방화선 — 궤도 소각 목록에 오른 행성",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 997,
      maxYear: 1003,
      excludeWorlds: ["terra", "mars"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "high_lord_terra", "kryptman_cordon_vet"
      ]
    },
    reqLabel: "997.M41~003.M42 · 크립트만의 방화선",
    weight: 30,
    text: "타이라니드 하이브 함대 레비아탄의 촉수가 성계 외곽에 닿기도 전에, 이단심문관 피두스 크립트만의 검은 인장을 단 심문소 순양함이 궤도에 진입했다. 이 행성은 외계 포식자를 굶겨 죽이기 위한 초토화 방화선 목록에 올라 있으며, 해가 저물기 전에 사이클로닉 어뢰 익스터미나투스가 집행될 예정이다.",
    choices: [
      {
        label: "[의지 판정] 후방 수천억을 살릴 대의를 받아들이고 익스터미나투스 좌표를 확정한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "아직 살아 숨 쉬는 도시들의 불빛 위로 소각 유도 신호를 전송했다. 레비아탄의 진격 속도는 늦춰졌으나, 불타는 행성의 잿빛 낙인이 영혼 깊이 새겨졌다.",
          stats: { WP: 6, Int: 5, Inf: 6 },
          faith: 5,
          align: { dogmatic: 9, ruthless: 5, humane: -6 },
          addTags: ["kryptman_cordon_vet", "macro_exterminatus_scar"]
        },
        fail: {
          text: "소각 명령을 막으려는 행성 방위 포대의 필사적 반격에 셔틀이 피격되어 중상을 입었으나, 결국 궤도 화염이 대지를 삼켰다.",
          wounds: -20,
          stats: { WP: 3 },
          align: { dogmatic: 5, ruthless: 4, humane: -4 },
          addTags: ["kryptman_cordon_vet", "macro_exterminatus_scar"]
        }
      },
      {
        label: "[교섭 판정] 궤도 폭격 직전까지 봉쇄선을 버텨 내며 민간 피난선을 탈출시킨다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "심문소 함장의 경고 사격을 무릅쓰고 이륙 관제탑을 사수해 마지막 순간까지 수십 척의 피난선을 띄워 올렸다. 화염 속에서 건져 낸 생명들이 그대의 이름을 기억한다.",
          stats: { Fel: 6, Ag: 4, WP: 5 },
          faith: 6,
          align: { humane: 10, dogmatic: -4 },
          addTags: ["kryptman_cordon_vet", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "몰려든 인파와 조기 점화된 소각 충격파에 휩쓸려 큰 부상을 입었으나, 끝내 몇 척의 수송선은 궤도 밖으로 보냈다.",
          wounds: -24,
          stats: { T: 3, Inf: -3 },
          align: { humane: 7 },
          addTags: ["kryptman_cordon_vet", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "[권위 판정] 반발하는 수비대를 제압하고 군수품과 기록만 빼돌린 뒤 소각을 앞당긴다",
        check: { stat: "Inf", diff: 0 },
        success: {
          text: "병력과 시민을 버리는 대신 귀중한 중화기와 성계 자금 장부만 신속히 회수해 궤도로 올렸다. 차가운 실리로 막대한 이득과 권위를 챙겼으나, 지울 수 없는 오명이 뒤따랐다.",
          stats: { Inf: 7, Int: 5 },
          align: { ruthless: 10, humane: -7 },
          addTags: ["kryptman_cordon_vet", "macro_exterminatus_scar"]
        },
        fail: {
          text: "약탈에 가까운 징발에 분노한 수비대의 습격으로 큰 상처를 입고 권위마저 실추된 채 불타는 궤도를 떠났다.",
          wounds: -20,
          stats: { Inf: -4 },
          align: { ruthless: 6, humane: -5 },
          addTags: ["kryptman_cordon_vet", "macro_exterminatus_scar"]
        }
      },
      {
        label: "비상 탈출선에 올라 대기가 불길로 뒤덮이는 광경을 뒤로한 채 궤도를 벗어난다",
        effect: {
          text: "어느 쪽의 명령도 뒤집을 수 없는 거대한 재앙 앞에서 간신히 목숨만 건져 빠져나왔다. 창밖으로 붉게 녹아내리는 지표면이 오래도록 뇌리에 박혔다.",
          wounds: -8,
          stats: { WP: 5, Ag: 3 },
          align: { humane: 2 },
          addTags: ["kryptman_cordon_vet"]
        }
      }
    ],
    source: "Lexicanum: Kryptman's Gambit / Codex: Tyranids (997.M41)"
  },
  {
    id: "ev_s18_macro_octarius_perimeter",
    title: "옥타리우스 봉쇄선 — 진화한 외계 포식자들의 감청 기지 습격",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 1004,
      maxYear: 1012,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
        "custodes", "high_lord_terra"
      ]
    },
    reqLabel: "004~012.M42 · 옥타리우스 봉쇄선",
    weight: 28,
    text: "옥타리우스 섹터의 지옥 도가니를 감시하던 최전방 감청 기지가 핏빛 경보를 울렸다. 끝없는 혈전 끝에 기형적으로 비대해진 오크 괴수들과 진스틸러 감염체, 타이라니드 생체 병기들이 한꺼번에 봉쇄선 외벽을 뚫고 밀려들어 기지 전체가 순식간에 포위망에 잠겼다.",
    choices: [
      {
        label: "[사격 판정] 감청 기지 주포를 과열시키며 외계 괴수들의 돌파 무리를 정면 저지한다",
        check: { stat: "BS", diff: -8 },
        success: {
          text: "포신이 벌겋게 달아오를 때까지 십자 포화를 퍼부어 거대 오크 보스와 타이라니드 시냅스 괴수를 동시에 쓰러뜨렸다. 옥타리우스 지옥에서 살아 돌아온 강철의 베테랑으로 기록되었다.",
          stats: { BS: 7, WP: 5, Inf: 5 },
          faith: 6,
          align: { dogmatic: 8 },
          addTags: ["octarius_survivor"]
        },
        fail: {
          text: "산성 생체탄과 오크 로켓이 포탑을 찢어 놓으며 중상을 입었으나, 증원 포격이 닿을 때까지 방어선 붕괴를 지연시켰다.",
          wounds: -24,
          stats: { T: 4 },
          align: { dogmatic: 4 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "[민첩 판정] 고립된 관측병과 부상병들을 이끌고 환기 갱도를 돌파해 셔틀로 구출한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "진스틸러가 매복한 어두운 지하 덕트를 민첩하게 돌파해 부상당한 관측병 전원을 궤도 셔틀에 태웠다. 절망적인 외계 전선에서도 동료를 버리지 않은 영웅으로 기억되었다.",
          stats: { Ag: 6, Fel: 5, WP: 4 },
          align: { humane: 9 },
          addTags: ["octarius_survivor", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "갱도 출구에서 덮쳐 든 외계 발톱에 깊은 자상을 입었으나, 끝까지 후미를 막아 동료 일부를 탈출시켰다.",
          wounds: -22,
          stats: { Ag: 3 },
          align: { humane: 5 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "[지성 판정] 기지 원자로를 의도적으로 폭주시켜 외계 무리와 외곽 초소를 함께 날린다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "외곽 초소의 철수를 기다리지 않고 원자로 안전봉을 강제 인출했다. 눈부신 플라즈마 섬광이 침공 무리를 통째로 증발시키며 봉쇄선 붕괴를 막았으나, 서늘한 희생의 대가가 남았다.",
          stats: { Int: 7, Inf: 6 },
          align: { ruthless: 9, humane: -5 },
          addTags: ["octarius_survivor"]
        },
        fail: {
          text: "폭주 시퀀스가 조기에 터지며 탈출 셔틀이 충격파에 휘말려 큰 부상을 입었으나, 기지 폭파만은 성공했다.",
          wounds: -26,
          stats: { Int: 3 },
          align: { ruthless: 6, humane: -4 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "외계 생체 표본과 감청 암호록만 챙겨 예비 탈출정으로 봉쇄선 후방에 복귀한다",
        effect: {
          text: "무모한 옥쇄 대신 귀중한 전선 첩보를 살려 들고 빠져나왔다. 기지가 삼켜지는 화염을 뒤로하며 옥타리우스의 참혹한 교훈을 뼈에 새겼다.",
          wounds: -10,
          stats: { Int: 4, WP: 4 },
          align: { dogmatic: 3 },
          addTags: ["octarius_survivor"]
        }
      }
    ],
    source: "Lexicanum: Octarius War / War Zone Octarius: Rising Tide"
  },
  {
    id: "ev_s18_macro_plague_iax",
    title: "역병 전쟁기 — 병원 행성 이악스와 걷는 역병의 야전 병동",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 16,
      minYear: 1013,
      maxYear: 1018,
      excludeWorlds: ["terra", "mars"],
      excludeWorldTags: ["feral"],
      excludeTags: ["imperial_nihilus", "custodes", "high_lord_terra"]
    },
    reqLabel: "013~018.M42 · 울트라마 역병 전쟁",
    weight: 30,
    text: "모타리온의 데스 가드가 침공한 울트라마 경계와 병원 행성 이악스의 야전 병동 위로 녹색 부패 안개가 낮게 깔렸다. 너글의 저주 '걷는 역병'이 천막 안으로 스며들자, 방금 전까지 신음하던 부상병 일부가 끔찍한 미소를 띤 역병 망자로 변해 일어나며 아수라장이 벌어졌다.",
    choices: [
      {
        label: "[의지 판정] 성수와 화염 방벽으로 병동을 지키며 감염되지 않은 부상병들을 호송한다",
        req: {
          excludeTags: [
            "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
          ]
        },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "역병 파리와 망자들의 쇄도를 성가와 화염으로 막아 내며 아직 숨 붙은 부상병 수천 명을 궤도 의무선으로 옮겼다. 부패의 절망 속에서도 자비의 성역을 지켜 낸 증인이 되었다.",
          stats: { WP: 6, Fel: 5, T: 4 },
          faith: 8,
          align: { humane: 10 },
          addTags: ["plague_war_vet", "macro_mercy_sanctuary"]
        },
        fail: {
          text: "독성 점액과 부패한 칼날에 깊은 상처와 고열을 얻었으나, 끝까지 병동 철수선을 열어 두어 수많은 생명을 건졌다.",
          wounds: -22,
          stats: { T: 3 },
          align: { humane: 6 },
          addTags: ["plague_war_vet", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "[강인 판정] 의심 병동 전체에 즉각 화염 정화령을 내려 걷는 역병을 뿌리째 태운다",
        req: {
          excludeTags: [
            "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
          ]
        },
        check: { stat: "T", diff: -5 },
        success: {
          text: "부패 독기를 견디며 소이탄으로 오염 천막 전체를 완전히 소각해 역병의 2차 확산을 원천 봉쇄했다. 무자비한 방역 결단으로 인접 도시들의 붕괴를 막아 냈다.",
          stats: { T: 6, BS: 4, Inf: 5 },
          faith: 6,
          align: { dogmatic: 9, ruthless: 4, humane: -5 },
          addTags: ["plague_war_vet"]
        },
        fail: {
          text: "불길 속에서 뛰쳐나온 데스 가드 역병 해병의 부식탄에 중상을 입었으나, 방역 저지선만은 끝내 지켜 냈다.",
          wounds: -24,
          stats: { WP: 3 },
          align: { dogmatic: 5, humane: -3 },
          addTags: ["plague_war_vet"]
        }
      },
      {
        label: "[강인 판정] 모타리온의 선봉에 호응해 병동 급수탑에 너글의 부패 포자를 풀어 놓는다",
        req: {
          anyTags: [
            "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
          ]
        },
        check: { stat: "T", diff: 0 },
        success: {
          text: "오염된 성수로 가득 찬 병동 급수탑에 부패 포자를 쏟아부어 울트라마 방어선 전체를 신음하는 역병의 정원으로 바꾸어 놓았다. 데스 가드 선봉대가 어두운 찬사를 보냈다.",
          stats: { T: 6, WP: 5, Inf: 6 },
          corruption: 10,
          align: { ruthless: 10 },
          addTags: ["plague_war_vet"]
        },
        fail: {
          text: "제국 정화 화염대의 기습 반격에 큰 화상을 입고 퇴각했으나, 이미 퍼진 포자가 병동 곳곳을 잠식하기 시작했다.",
          wounds: -22,
          stats: { T: 3 },
          corruption: 5,
          align: { ruthless: 5 },
          addTags: ["plague_war_vet"]
        }
      },
      {
        label: "비상 정화 마스크를 눌러쓰고 오염 안개가 덮치기 전에 외곽 검역 셔틀로 철수한다",
        effect: {
          text: "치솟는 녹색 안개와 비명을 뒤로한 채 간신히 외곽 검역선으로 빠져나왔다. 역병 전쟁의 참상이 뼈아픈 경계심으로 남았다.",
          wounds: -10,
          stats: { T: 4, Ag: 3 },
          align: { ruthless: 2 },
          addTags: ["plague_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Plague Wars / Dark Imperium: Plague War"
  },
  {
    id: "ev_s18_macro_m42_coalition",
    title: "인도미투스 연합 기동대 — 끊어진 워프 회랑을 여는 교차 서약",
    category: "시기·장소 고유",
    once: true,
    req: {
      minAge: 18,
      minYear: 1001,
      greatRift: true,
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "001.M42+ · 대균열 이후 · 인도미투스 연합",
    weight: 32,
    text: "시카트릭스 말레딕툼 너머 두 성역을 잇던 유일한 보급 회랑이 악마 함대의 워프 봉쇄로 끊어졌다. 인도미투스 성전 기함의 전략실에 임페리얼 나이트 기사단, 항해사 가문 특사, 오피시오 아사시노룸 요원, 살아 있는 성인의 추종자들까지 제국 각계의 정예가 한자리에 모여 전례 없는 연합 돌파 서약을 맺으려 한다.",
    choices: [
      {
        label: "[백병 판정] 이온 실드를 전개하고 최선봉 방벽이 되어 악마 포화를 정면 돌파한다",
        req: { anyTags: ["imperial_knight"] },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "푸른 이온 실드로 악마 병기의 포화를 받아 내며 리퍼 체인소드로 봉쇄 요새의 성문을 갈랐다. 연합 함대 전체가 기사 가문의 용맹 앞에 경례를 올렸다.",
          stats: { WS: 7, T: 5, Inf: 7 },
          faith: 6,
          align: { dogmatic: 7, humane: 4 },
          addTags: ["crossover_oath"]
        },
        fail: {
          text: "과부하된 이온 실드가 깨지며 기체와 몸에 큰 충격을 입었으나, 끝까지 선봉을 버텨 연합 함대의 진입로를 열었다.",
          wounds: -24,
          stats: { T: 4 },
          align: { dogmatic: 4 },
          addTags: ["crossover_oath"]
        }
      },
      {
        label: "[의지 판정] 제3의 눈을 개방해 찢어진 워프 폭풍 한복판에 연합 함대의 항로를 연다",
        req: { anyTags: ["navigator"] },
        check: { stat: "WP", diff: -8 },
        success: {
          text: "끓어오르는 워프 소용돌이 사이로 아스트로노미칸의 희미한 잔광을 포착해 연합 함대 전원을 무사히 회랑 너머로 이끌었다. 각 기관 사령관들이 항해사의 위대한 공훈에 서약으로 보답했다.",
          stats: { WP: 8, Int: 5, Inf: 7 },
          align: { dogmatic: 6, humane: 5 },
          addTags: ["crossover_oath"]
        },
        fail: {
          text: "워프 역풍이 신경을 태우며 심각한 내상을 입었으나, 끝내 함대가 표류하지 않도록 항로를 붙들어 냈다.",
          wounds: -22,
          stats: { WP: 4 },
          align: { dogmatic: 3 },
          addTags: ["crossover_oath"]
        }
      },
      {
        label: "[민첩 판정] 적 기함의 워프 교란 성소에 잠입해 카오스 주술사의 숨통을 끊는다",
        req: { anyTags: ["assassin"] },
        check: { stat: "Ag", diff: -8 },
        success: {
          text: "그림자처럼 적 함교 심장부에 스며들어 워프 폭풍을 유지하던 카오스 주술사를 일격에 제거했다. 침묵의 칼날이 회랑을 열자 연합 지휘부가 기밀 인장으로 맹약을 남겼다.",
          stats: { Ag: 8, BS: 5, Inf: 6 },
          align: { ruthless: 8, dogmatic: 4 },
          addTags: ["crossover_oath"]
        },
        fail: {
          text: "탈출로에서 카오스 호위병의 기습을 받아 깊은 상처를 입었으나, 표적 제거와 회랑 개방 임무만은 완수했다.",
          wounds: -24,
          stats: { Ag: 4 },
          align: { ruthless: 5 },
          addTags: ["crossover_oath"]
        }
      },
      {
        label: "[의지 판정] 황제의 성광을 펼쳐 절망한 장병들을 일깨우고 악마 봉쇄를 꺾는다",
        req: { anyTags: ["living_saint", "saint_vessel"] },
        check: { stat: "WP", diff: -8 },
        success: {
          text: "찬란한 황금빛 성광이 함대 전역으로 퍼져 나가자 워프의 어둠이 물러나고 연합 장병들이 일제히 반격의 함성을 터뜨렸다. 살아 있는 기적 아래 모든 전설이 하나의 서약을 맺었다.",
          stats: { WP: 8, Fel: 6, Inf: 8 },
          faith: 12,
          align: { humane: 8, dogmatic: 6 },
          addTags: ["crossover_oath"]
        },
        fail: {
          text: "악마 군단의 집중 저주에 맞서 성광을 유지하느라 육신이 크게 소진되었으나, 회랑이 열리는 순간까지 빛을 끄지 않았다.",
          wounds: -22,
          stats: { WP: 4 },
          faith: 4,
          align: { humane: 5 },
          addTags: ["crossover_oath"]
        }
      },
      {
        label: "[교섭 판정] 자존심 강한 각 기관 지휘관들을 중재해 단일 돌격 서약으로 묶는다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "서로 불신하던 제국 기관들의 이해관계를 절묘하게 조율해 완벽한 합동 돌격을 성사시켰다. 회랑이 재개통된 날 밤, 각 대표가 그대에게 언제든 응답하겠다는 교차 서약 인장을 건넸다.",
          stats: { Fel: 6, Int: 5, Inf: 7 },
          faith: 6,
          align: { humane: 8 },
          addTags: ["crossover_oath"]
        },
        fail: {
          text: "지휘 계통 혼선 속에 적의 역습을 맞아 부상을 입었으나, 끝까지 중재를 포기하지 않아 연합의 결속만은 지켜 냈다.",
          wounds: -16,
          stats: { Inf: -2, WP: 4 },
          align: { humane: 4 },
          addTags: ["crossover_oath"]
        }
      },
      {
        label: "연합 기동대의 합동 전술 서약에 서명하고 후방 화력과 보급 항로를 책임진다",
        effect: {
          text: "화려한 선봉 대신 묵묵히 보급과 화력 지원을 완수해 연합군의 돌파를 뒷받침했다. 전설들이 함께 서명한 교차 서약의 인장이 그대의 기록에 남았다.",
          stats: { WP: 5, Int: 4, Inf: 5 },
          faith: 5,
          align: { dogmatic: 4, ruthless: 2 },
          addTags: ["crossover_oath"]
        }
      }
    ],
    source: "Lexicanum: Indomitus Crusade / Codex: Imperial Agents / Codex: Imperial Knights"
  },

  // ============================================================================
  // Part B — 거시 이력 후속 파장 연작 6종 (weight: 34~42, Stage 18 10대 태그 100% 회수)
  // ============================================================================
  {
    id: "ev_s18_macro_arc_gothic_vet",
    title: "고딕 전쟁의 잔향 — 워프에서 돌아온 옛 전함과 황동 항해도",
    category: "역사 파장",
    once: true,
    req: {
      minAge: 20,
      allTags: ["gothic_war_vet"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "20세+ · 고딕 전쟁 참전",
    weight: 38,
    text: "고딕 전쟁의 포성이 멎은 지 오랜 세월이 흘렀건만, 게스세마네 성계 인근에서 실종되었던 배틀플리트 고딕 소속 고대 순양함의 뱃머리가 워프 소용돌이 너머에서 표류해 나와 조선소에 예인되었다. 부서진 함교 금고 안에는 옛 전우들의 명부와 미등록 비밀 성도가 온전히 남아 있었고, 생존 참전용사들이 그 처분을 두고 모였다.",
    choices: [
      {
        label: "[지성 판정] 전투 항해도를 복원해 해군 사관학교와 전사자 추모 회관에 헌납한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "손상된 황동 성도와 항해 일지를 정밀하게 복원해 옛 전우들의 숭고한 희생을 온전히 기록으로 남겼다. 살아남은 참전용사들과 후배 장교들이 깊은 경의를 바쳤다.",
          stats: { Int: 6, Fel: 5, Inf: 6 },
          faith: 6,
          align: { humane: 9 }
        },
        fail: {
          text: "불안정한 함체 격벽이 무너지며 추락 파편에 부상을 입었으나, 귀중한 전사자 명부만큼은 품에 안고 나왔다.",
          wounds: -14,
          stats: { Int: 2 },
          align: { humane: 5 }
        }
      },
      {
        label: "[권위 판정] 함선 수복과 기장 보존을 관철해 배틀플리트 고딕의 전통을 계승한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "고철로 해체하려던 행정부의 결정을 뒤집고 전함의 기장과 선체 일부를 신조 순양함에 계승시켰다. 고딕 전쟁의 불굴 기개가 다시 성간 항로에 울려 퍼졌다.",
          stats: { Inf: 7, WP: 6, BS: 4 },
          faith: 8,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "조선소 행정관들과의 격한 언쟁 끝에 무리하게 현장 실사에 나섰다가 잔해에 다치고 체면마저 깎였다.",
          wounds: -14,
          stats: { Inf: -3, WP: 3 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 암시장 항로 중개인에게 비밀 성도와 미등록 부품을 넘겨 이득을 챙긴다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "해군 감사관의 눈을 피해 고대 항로 좌표와 희귀 조준경 부품을 은밀히 처분해 막대한 자금과 뒷배를 손에 넣었다. 과거의 영광은 냉혹한 현실의 발판이 되었다.",
          stats: { Fel: 6, Inf: 7, Int: 4 },
          align: { ruthless: 10, dogmatic: -5 }
        },
        fail: {
          text: "밀거래 현장이 해군 헌병대의 검문에 발각되어 도주하다 부상을 입고 세평에 큰 흠집이 났다.",
          wounds: -16,
          stats: { Inf: -4 },
          align: { ruthless: 6, dogmatic: -3 }
        }
      },
      {
        label: "뱃머리에 새겨진 전우들의 이름 앞에 묵념을 올리고 정식 해군 인계 절차를 밟는다",
        effect: {
          text: "과거를 팔지도, 억지로 붙잡지도 않은 채 규정에 따라 유물과 기록을 정중히 인계했다. 오랜 전쟁의 유령이 비로소 차분히 잠들었다.",
          stats: { WP: 5, Fel: 3 },
          faith: 4,
          align: { humane: 4, dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Battlefleet Gothic / Gothic War"
  },
  {
    id: "ev_s18_macro_arc_shame_reckoning",
    title: "수치의 달들 청산 — 늑대의 인장과 심문소의 감사장",
    category: "역사 파장",
    once: true,
    req: {
      minAge: 20,
      anyTags: ["shame_protector", "shame_purger"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "20세+ · 수치의 달들 이력",
    weight: 40,
    text: "아마겟돈의 비극이 역사 속 기밀 서고에 묻힌 지 오랜 세월이 지났건만, 그날의 선택이 다시 문을 두드렸다. 늑대 룬이 새겨진 메달을 내미는 펜리스 파견 사절과, 밀봉된 아마겟돈 수용소 감사 서류를 들고 찾아온 오르도 말레우스 심문소 감찰관이 서로 다른 대가를 요구하며 그대 앞에 섰다.",
    choices: [
      {
        label: "[교섭 판정] 무고한 생존자를 지킨 선택을 당당히 증언하며 펜리스 사절과 연대한다",
        req: { allTags: ["shame_protector"] },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "펜리스 사절이 그대의 변치 않은 인간적 기개에 잔을 들어 경의를 표하고, 스페이스 울프의 후원과 굳건한 명예를 약속했다. 심문소 감찰관은 차가운 침묵 속에 물러섰다.",
          stats: { Fel: 7, WP: 6, Inf: 6 },
          faith: 5,
          align: { humane: 10, dogmatic: -4 }
        },
        fail: {
          text: "심문소 감찰관의 집요한 문책과 암습 경고 속에 부상을 입고 입지가 좁아졌으나, 끝내 그날의 양심만은 부정하지 않았다.",
          wounds: -18,
          stats: { Inf: -3, WP: 4 },
          align: { humane: 6, dogmatic: -3 }
        }
      },
      {
        label: "[권위 판정] 악마의 비밀을 막아 낸 충성을 입증해 오르도 말레우스의 신임을 굳힌다",
        req: { allTags: ["shame_purger"] },
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "감정보다 제국의 생존을 택한 냉철한 기록을 제시해 오르도 말레우스 감찰관의 전폭적인 신임과 특별 권한을 얻어 냈다. 펜리스 사절은 냉소를 남긴 채 돌아섰다.",
          stats: { Inf: 8, WP: 6, Int: 5 },
          faith: 6,
          align: { dogmatic: 10, humane: -4 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "지나친 강경 집행 기록이 오히려 내부 감사의 표적이 되며 신변의 위협과 징계 타격을 입었다.",
          wounds: -16,
          stats: { Inf: -4, WP: 3 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "[지성 판정] 양측의 과오를 쥔 기밀 사본을 지렛대로 삼아 두 기관의 추궁을 막는다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "아마겟돈 봉쇄 당시 양 진영 모두 숨기고 싶어 하는 치부를 교묘히 꺼내 들어, 감찰관과 사절 양쪽 모두의 입을 다물게 만들고 유리한 거래를 끌어냈다.",
          stats: { Int: 7, Inf: 7, Fel: 4 },
          align: { ruthless: 10, humane: -4, dogmatic: -4 }
        },
        fail: {
          text: "위험한 협박이 역풍을 불러 양측 모두의 적의를 샀고, 밤길 기습으로 중상을 입으며 영향력을 잃었다.",
          wounds: -22,
          stats: { Inf: -5 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "그날의 상처는 역사에 맡겨야 한다며 봉인된 기록서에 마지막 서명만 남긴다",
        effect: {
          text: "어느 쪽의 깃발 아래서도 과거를 변명하지 않았다. 두 방문객이 떠난 뒤, 오래된 수치의 달들이 마침내 마음속에서 막을 내렸다.",
          stats: { WP: 6, T: 3 },
          align: { humane: 3, dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Months of Shame / The Emperor's Gift"
  },
  {
    id: "ev_s18_macro_arc_exterminatus_ghosts",
    title: "잿빛 하늘의 유령 — 변경 농업 행성의 두 번째 방화선 심판",
    category: "역사 파장",
    once: true,
    req: {
      minAge: 20,
      anyTags: ["macro_exterminatus_scar", "kryptman_cordon_vet"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "20세+ · 익스터미나투스 낙인·방화선",
    weight: 38,
    text: "불타는 행성의 잿빛 하늘은 한 번 목격한 자의 꿈을 결코 놓아주지 않는다. 그런데 오늘, 변경 농업 행성 세 개 주에서 미확인 외계 포자 징후가 포착되었다는 긴급 보고가 도착했다. 궤도 함대 장교들은 이미 소각 어뢰의 봉인을 풀어 둔 채, 방화선을 겪어 본 그대의 최종 결단을 기다리고 있다.",
    choices: [
      {
        label: "[지성 판정] 궤도 소각을 막고 정밀 검역선과 지상 소탕 작전으로 정착민을 구한다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "과거의 비극을 되풀이하지 않겠다고 선언하고 정밀 방역선과 소탕 부대를 직접 지휘해 외계 포자를 완전히 뿌리 뽑았다. 잿더미가 될 뻔한 행성에 다시 곡물이 자라났다.",
          stats: { Int: 7, Fel: 6, WP: 5 },
          faith: 6,
          align: { humane: 11, dogmatic: -4 },
          addTags: ["macro_mercy_sanctuary"]
        },
        fail: {
          text: "지상 소탕전 도중 변이 포자 괴수의 매복에 큰 부상을 입고 일부 구역을 잃었으나, 행성 전체가 소각되는 최악의 참사만은 막았다.",
          wounds: -20,
          stats: { Inf: -3, WP: 4 },
          align: { humane: 7 }
        }
      },
      {
        label: "[의지 판정] 과거의 교훈대로 한 치의 자비도 없이 오염 대륙 전면 소각을 인가한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "흔들림 없는 손으로 소각 명령서에 날인했다. 대륙 하나가 화염 속에 사라졌으나, 성계 전체로 번질 외계 재앙은 단 하루 만에 완전히 차단되었다.",
          stats: { WP: 7, Inf: 7 },
          faith: 5,
          align: { dogmatic: 9, ruthless: 4, humane: -6 }
        },
        fail: {
          text: "소각 폭풍의 여파 속에 탈출하던 수비대의 저항과 사고가 겹쳐 부상을 입고 뼈아픈 문책을 감수해야 했다.",
          wounds: -16,
          stats: { WP: 3, Inf: -2 },
          align: { dogmatic: 6, humane: -4 }
        }
      },
      {
        label: "[권위 판정] 곡물 저장고와 기계 설비만 우선 징발한 뒤 남은 구역을 봉쇄 소각한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "값비싼 농기계와 비축 식량만 궤도 수송선으로 실어 올린 뒤 가차 없이 소각탄을 투하했다. 냉혈한 자산 회수 덕분에 막대한 권위와 재력을 얻었다.",
          stats: { Inf: 8, Int: 5 },
          align: { ruthless: 11, humane: -8 }
        },
        fail: {
          text: "징발을 서두르다 방역선이 뚫리며 부상을 입고 화물 절반과 지휘 신임을 함께 잃었다.",
          wounds: -18,
          stats: { Inf: -4 },
          align: { ruthless: 7, humane: -5 }
        }
      },
      {
        label: "성급한 궤도 폭격을 보류시키고 정밀 정찰 보고가 올 때까지 봉쇄만 유지한다",
        effect: {
          text: "잿빛 악몽에 휘둘리지 않고 차분히 궤도 봉쇄와 정찰을 우선시했다. 며칠 뒤 포자 확산 범위가 국지적임이 밝혀지며 헛된 멸망을 피할 수 있었다.",
          stats: { WP: 5, Int: 4 },
          align: { humane: 4, dogmatic: 2 }
        }
      }
    ],
    source: "Lexicanum: Exterminatus / Kryptman's Gambit"
  },
  {
    id: "ev_s18_macro_arc_mercy_network",
    title: "구호 성역의 징표 — 살려 낸 생존자들이 보내온 비밀 연락망",
    category: "역사 파장",
    once: true,
    req: {
      minAge: 20,
      allTags: ["macro_mercy_sanctuary"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "20세+ · 전선 구호 성역 수호",
    weight: 38,
    text: "세 차례나 중계인을 거친 낡은 황동 의무 징표가 그대의 손에 닿았다. 한때 멸망 직전의 전선에서 그대가 구해 낸 피난민과 부상병들이 여러 성계에 흩어져 서로를 돕는 비밀 구호망을 일구어 놓았으며, 언제든 물자와 첩보로 보답하겠다는 암호 장부를 보내온 것이다. 그러나 이단심문소 첩자가 이미 이 연락망의 냄새를 맡고 있다.",
    choices: [
      {
        label: "[교섭 판정] 위험을 무릅쓰고 구호망을 합법적 성당 자선 회랑으로 위장해 보호한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "에클레시아키 구호 사제들과 협력해 비밀 연락망을 정식 성당 자선 조직 아래로 편입시켰다. 감시의 눈을 피한 생존자들은 변함없는 신뢰와 보급으로 그대를 지탱해 주었다.",
          stats: { Fel: 7, Inf: 7, WP: 5 },
          faith: 8,
          align: { humane: 10 }
        },
        fail: {
          text: "심문소 첩자의 추적을 따돌리는 과정에서 습격을 받아 부상을 입었으나, 핵심 생존자들의 신원만은 끝까지 지켜 냈다.",
          wounds: -16,
          stats: { Inf: -3, Fel: 3 },
          align: { humane: 6 }
        }
      },
      {
        label: "[의지 판정] 비밀 조직은 이단의 온상이라며 행정부와 심문소에 자진 신고해 해산한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "은혜보다 제국의 법도가 우선이라 선언하며 암호 장부 전체를 심문소에 넘겼다. 구호망은 하루아침에 해체되었으나, 그대의 철저한 충성심은 심문소 기록에 높이 남았다.",
          stats: { WP: 6, Inf: 7 },
          faith: 6,
          align: { dogmatic: 10, humane: -7 },
          addTags: ["inquisition_favor"]
        },
        fail: {
          text: "배신감에 분노한 연락책의 저항에 다치고, 한때 그대를 따르던 민심마저 차갑게 돌아섰다.",
          wounds: -14,
          stats: { Inf: -2, Fel: -3 },
          align: { dogmatic: 6, humane: -5 }
        }
      },
      {
        label: "[지성 판정] 생존자들의 충성심과 밀수 항로를 비공식 첩보 자산으로 흡수해 세력을 키운다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "감시의 틈을 파고들어 구호망의 운송선과 연락책을 그대 직속의 암흑 정보망으로 재편했다. 은혜의 빚은 막강한 영향력과 은밀한 권력의 도구가 되었다.",
          stats: { Int: 7, Inf: 8, Fel: 4 },
          align: { ruthless: 10, humane: -4 }
        },
        fail: {
          text: "첩보망 장악을 서두르다 심문소 감시조와 정면으로 부딪혀 큰 상처를 입고 기반 일부를 잃었다.",
          wounds: -18,
          stats: { Inf: -4 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "짧은 안부만 전한 뒤 암호 장부를 불태워 생존자들에게 감시의 불똥이 튀지 않게 한다",
        effect: {
          text: "모든 명단을 재로 돌려보내며 조용히 인연을 갈무리했다. 살아남은 이들이 평온히 숨 쉬고 있다는 소식만으로 충분했다.",
          stats: { WP: 5, Fel: 4 },
          align: { humane: 5 }
        }
      }
    ],
    source: "Lexicanum: Imperial Refugee Convoys / Dark Imperium"
  },
  {
    id: "ev_s18_macro_arc_octarius_plague",
    title: "생체 재앙 합동 회의 — 옥타리우스와 역병 전선의 교훈",
    category: "역사 파장",
    once: true,
    req: {
      minAge: 20,
      anyTags: ["octarius_survivor", "plague_war_vet"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "20세+ · 옥타리우스·역병 전쟁 참전",
    weight: 38,
    text: "삼중 방호문으로 봉쇄된 궤도 격리 연구실에 오르도 제노스 학자, 기계교 생물학파 마고스, 야전 아포세카리들이 긴급 소집되었다. 옥타리우스의 괴이한 외계 생체 병기나 너글의 역병 전선에서 살아 돌아온 그대에게 차기 제국 검역 교리의 방향을 증언해 달라는 요청이 떨어졌다.",
    choices: [
      {
        label: "[지성 판정] 초기 감염 징후와 해독 절차를 체계화해 야전 의무대의 생존율을 높인다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "전장에서 직접 겪은 초기 변이 증상과 응급 해독법을 명쾌한 교범으로 정리했다. 새 지침이 전 성역 의무대에 배포되며 수많은 장병의 목숨을 구하게 되었다.",
          stats: { Int: 7, Fel: 5, Inf: 6 },
          faith: 5,
          align: { humane: 9 }
        },
        fail: {
          text: "격리 표본을 직접 검증하던 중 용기 균열로 독성 포자에 노출되어 한동안 심각한 병상 신세를 졌다.",
          wounds: -16,
          stats: { T: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[강인 판정] 외계 포자와 역병 앞에는 정화의 불길뿐이라며 무관용 화염 교리를 밀어붙인다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "어설픈 치료 시도가 더 큰 전멸을 부른다는 뼈아픈 실전 증언으로 의회를 압도했다. 무관용 화염 방역 교리가 공식 채택되며 강경파의 두터운 지지를 얻었다.",
          stats: { T: 6, WP: 6, Inf: 6 },
          faith: 7,
          align: { dogmatic: 9 }
        },
        fail: {
          text: "실전 방호 시연 도중 고압 소이 노즐이 역화하며 화상을 입고 학계의 차가운 비판을 감수해야 했다.",
          wounds: -18,
          stats: { T: 3, Inf: -2 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[권위 판정] 위험한 생체 표본을 비밀 병기 연구에 전용하자는 마고스의 제안을 승인한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "교조파의 반발을 직권으로 누르고 극비 연구 인가서에 서명했다. 기계교 생물학파는 금단의 효율성에 환호하며 막대한 기술 지원과 정치적 영향력을 보답했다.",
          stats: { Inf: 8, Int: 6 },
          align: { ruthless: 10, dogmatic: -5 }
        },
        fail: {
          text: "비밀 연구실의 표본이 폭주하며 경비대와 함께 큰 부상을 입었고, 원로 회의의 엄중한 문책을 받았다.",
          wounds: -20,
          stats: { Inf: -4 },
          align: { ruthless: 6, dogmatic: -3 }
        }
      },
      {
        label: "탁상공론 대신 최전방 병사들이 바로 쓸 수 있는 간결한 방독·격리 수칙만 제출한다",
        effect: {
          text: "거창한 정치 싸움에서 물러나 실전에서 피로 배운 생존 수칙만 담담히 남겼다. 야전 지휘관들이 그대의 실용적인 조언에 깊은 신뢰를 보냈다.",
          stats: { Int: 4, T: 4, WP: 4 },
          align: { humane: 3, dogmatic: 3 }
        }
      }
    ],
    source: "Lexicanum: Magos Biologis / War Zone Octarius / Dark Imperium"
  },
  {
    id: "ev_s18_macro_arc_solemnace_oath",
    title: "기한이 도래한 밀서 — 솔렘나스의 빚과 전설의 교차 서약",
    category: "역사 파장",
    once: true,
    req: {
      minAge: 20,
      anyTags: ["solemnace_debt", "crossover_oath"],
      excludeTags: ["heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"]
    },
    reqLabel: "20세+ · 솔렘나스의 빚·교차 서약",
    weight: 42,
    text: "경보 장치 하나 울리지 않은 깊은 밤, 잠긴 집무실 탁자 위에 불가능한 소환장이 놓여 있었다. 에메랄드빛으로 맥동하는 솔렘나스의 테서랙트 봉인, 혹은 붉은 밀랍에 찍힌 옛 연합 전선의 교차 서약 인장. 오래전 전장에서 남긴 약속과 빚이 마침내 오늘 밤 청산을 요구하고 있다.",
    choices: [
      {
        label: "[교섭 판정] 무한의 트라진이 보낸 은빛 사절에게 전리품 유물을 넘겨 빚을 청산한다",
        req: { allTags: ["solemnace_debt"] },
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "정지장 구체를 든 네크론 사절을 상대로 기지를 발휘해, 그대 자신 대신 희귀한 고대 전리품 유물을 기증하는 조건으로 솔렘나스의 빚을 깨끗이 청산하고 귀중한 성도 파편까지 받아 냈다.",
          stats: { Fel: 7, Int: 7, Inf: 7 },
          align: { ruthless: 6, humane: 4 }
        },
        fail: {
          text: "협상이 틀어지며 정지장 함정의 충격파를 스쳐 중상을 입었으나, 간신히 박물관 전시품 신세만은 면한 채 달아났다.",
          wounds: -22,
          stats: { Ag: 4, WP: 4 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "[의지 판정] 교차 서약의 인장에 응답해 위기에 빠진 옛 합동 전우들의 구원에 출정한다",
        req: { allTags: ["crossover_oath"] },
        check: { stat: "WP", diff: -8 },
        success: {
          text: "오래전 맺은 맹세를 저버리지 않고 즉각 구원 기동대를 이끌어 포위된 옛 연합 전우들을 사지에서 건져 냈다. 제국의 전설들 사이에 그대의 신의가 영원히 각인되었다.",
          stats: { WP: 7, WS: 5, BS: 5, Inf: 8 },
          faith: 10,
          align: { humane: 8, dogmatic: 7 }
        },
        fail: {
          text: "적의 매복 포위망을 뚫고 구원에 나섰다가 깊은 상처를 입었으나, 끝까지 서약을 지킨 기개만은 꺾이지 않았다.",
          wounds: -24,
          stats: { T: 4, WP: 4 },
          align: { humane: 5, dogmatic: 4 }
        }
      },
      {
        label: "[지성 판정] 사절의 은밀한 호출을 역추적해 배후의 전술 정보와 비밀 물자만 가로챈다",
        check: { stat: "Int", diff: -8 },
        success: {
          text: "약속에 묶이는 대신 암호 전달 경로를 역으로 파고들어, 상대가 숨겨 둔 기밀 성도와 비상 보급 좌표를 냉혹하게 손에 넣었다. 감상보다 실리가 앞서는 승리였다.",
          stats: { Int: 7, Inf: 7, Ag: 4 },
          align: { ruthless: 10, humane: -5 }
        },
        fail: {
          text: "역추적 도중 함정 보안 장치에 휘말려 큰 상처를 입고, 소중한 인맥과 평판마저 잃었다.",
          wounds: -20,
          stats: { Inf: -4 },
          align: { ruthless: 6 }
        }
      },
      {
        label: "기묘한 밀서를 불태워 흔적을 지우고 지금 맡은 제국의 본분과 경계에만 집중한다",
        effect: {
          text: "지나간 외계의 거래도, 위험한 사적 맹세도 모두 불꽃 속에 털어 버렸다. 오직 황제에 대한 본분만이 흔들리지 않는 길이다.",
          stats: { WP: 6, T: 4 },
          faith: 5,
          align: { dogmatic: 6 }
        }
      }
    ],
    source: "Lexicanum: Trazyn the Infinite / The Infinite and the Divine / Indomitus Crusade"
  }
];
