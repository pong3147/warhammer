// 분기 사건 — Stage 20-B: Tier 2~4 중견 직군 10종 심화 및 카오스 초인 중후반 정적 해소 (12건)
export default [
  {
    id: "ev_s20_mid_01",
    title: "공백이 된 교두보 — 쓰러진 선임 대신 무단 철수 장교를 막아 세워라",
    category: "계급 심화",
    once: true,
    req: {
      anyCareers: ["commissar_cadet"]
    },
    reqLabel: "직군: 커미사르 생도",
    weight: 36,
    text: "적 중포의 직격탄에 지도 커미사르가 중상을 입고 쓰러지자, 최전방 교두보의 군기를 붙들던 마지막 쐐기가 사라졌다. 포화가 쏟아지는 틈을 타 겁에 질린 귀족 출신 대대 장교가 사령부 허가도 없이 전 대대 철수 나팔을 불려 하고 있다. 아직 견습 장식띠만 두른 생도 신분이지만, 지금 그대가 쓰러진 선임의 볼트 피스톨과 감찰 권한을 대행해 장교를 제지하지 않으면 교두보 전체가 허무하게 붕괴할 판이다. 참호 속 수백 명의 가드맨과 당황한 참모들이 일제히 어린 생도의 입술을 바라본다.",
    choices: [
      {
        label: "[의지 판정] 선임의 볼트 피스톨로 무단 철수 장교를 즉결 처형하고 대대 지휘권을 인수한다",
        check: { stat: "WP", diff: -5 },
        critSuccess: {
          text: "단 한 발의 볼트 총성이 포격을 가르고 울려 퍼지자, 흔들리던 대대 전원이 얼어붙듯 멈춰 서며 황제의 이름을 외치고 화망을 되살렸다! 후송되었던 지도 커미사르가 복귀한 뒤 생도의 대행 지휘를 극찬하며 평가서에 최고 등급 인장을 찍었다.",
          stats: { WP: 8, Inf: 9, BS: 4 },
          faith: 6,
          align: { dogmatic: 10, humane: -4 }
        },
        success: {
          text: "냉혹한 볼트 총성이 패주 명령을 끊어 놓자, 중대장들이 즉시 사격 진지를 복구해 교두보를 지켜 냈다. 연대 정치국은 생도의 서릿발 같은 규율 대행을 높이 평가했다.",
          stats: { WP: 6, Inf: 6 },
          faith: 3,
          align: { dogmatic: 8, humane: -3 }
        },
        fail: {
          text: "손끝이 미세하게 흔들리며 탄환이 장교의 견장만 스쳐 지났고, 격앙된 호위병들과 실랑이를 벌이는 사이 외곽 참호 하나를 적에게 내주었다.",
          wounds: -10,
          stats: { WP: 3, Inf: -3 },
          align: { dogmatic: 4 }
        },
        critFail: {
          text: "급히 격발한 볼트 피스톨의 반동을 제어하지 못해 탄환이 지휘 참호의 탄약 상자를 스치며 폭발을 일으켰다! 파편을 뒤집어쓴 채 대대가 일시 혼란에 빠졌고, 연대 감찰 보고서에 치명적인 오점이 새겨졌다.",
          wounds: -22,
          stats: { Inf: -6, Fel: -4, WP: 2 },
          faith: -4,
          align: { dogmatic: 2 }
        }
      },
      {
        label: "[교섭 판정] 처형 대신 장교의 책임을 일깨우고 직접 흉벽에 올라 반격을 독려한다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "생도의 흔들림 없는 눈빛과 먼저 흉벽 위로 뛰어오르는 기개에 창백하던 장교마저 정신을 차리고 칼을 뽑아 들었다! 단 한 명의 아군 희생도 없이 적 돌파조를 격퇴한 기적에 지도 커미사르와 대대 전원이 깊은 경의를 표했다.",
          stats: { Fel: 9, WP: 7, Inf: 8 },
          faith: 7,
          align: { humane: 10, dogmatic: -2 }
        },
        success: {
          text: "장교의 팔을 붙들고 포병 엄호 좌표와 예비 탄약 위치를 차분히 짚어 주자, 패닉이 가라앉고 대대가 다시 방어선을 굳혔다.",
          stats: { Fel: 7, WP: 5, Inf: 5 },
          faith: 4,
          align: { humane: 8, dogmatic: -2 }
        },
        fail: {
          text: "호령이 포성에 묻히며 장교가 일부 중대를 이끌고 후방으로 밀려났고, 뒤늦게 투입된 예비대 덕분에 교두보만 간신히 막아 냈다.",
          stats: { Fel: 2, Inf: -4, WP: 3 },
          align: { humane: 4 }
        },
        critFail: {
          text: "장교를 설득하던 찰나 적 박격포탄이 지휘 참호에 떨어졌고, 무너진 토사와 패주 병사들에게 휩쓸려 중상을 입었다. 연대 정치국은 지휘 공백 수습 실패를 이유로 생도 자격 재심사를 통보했다.",
          wounds: -20,
          stats: { Fel: -4, Inf: -6, WP: 2 },
          align: { humane: 3 }
        }
      },
      {
        label: "[지성 판정] 장교의 후퇴 시도를 눈감아 주는 대가로 서면 자백서를 받아내 정치적 약점으로 쥔다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "목숨을 건진 귀족 장교가 두려움 속에 서명한 자술서를 손에 넣었다. 병력을 예비 참호로 재정렬해 전선 붕괴도 막고, 향후 정치국 출세길에 쓸 강력한 지렛대까지 확보했다.",
          stats: { Int: 6, Inf: 7, Fel: -2 },
          corruption: 2,
          align: { ruthless: 8, dogmatic: -3 }
        },
        fail: {
          text: "흥정에 시간을 지체하는 사이 전방 초소가 무너졌고, 사령부 감찰관에게 미온적인 대처로 호된 문책을 받았다.",
          wounds: -10,
          stats: { Int: 3, Inf: -4 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "정치국 야전 규범대로 장교의 지휘권을 정식 정지하고 선임 부관에게 방어선 유지를 위임한다",
        effect: {
          text: "과도한 유혈 없이 규정대로 장교를 후방 구금하고 경험 많은 부관에게 화력 통제를 넘겼다. 화려하지는 않았으나 교두보와 정치국의 원칙을 모두 지킨 침착한 대행이었다.",
          stats: { WP: 3, Int: 2, Inf: 2 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Ciaphas Cain: For the Emperor / Lexicanum: Commissar Cadet"
  },
  {
    id: "ev_s20_mid_02",
    title: "붉은 감사 수첩 — 생도 동기와 귀족 장교의 군수 횡령",
    category: "계급 심화",
    once: true,
    req: {
      anyCareers: ["commissar_cadet"]
    },
    reqLabel: "직군: 커미사르 생도",
    weight: 34,
    text: "보급 기지의 야간 규율 감사를 수행하던 중, 훈련 시절부터 등을 맞대고 자란 생도 동기가 귀족 출신 대대장의 라스건 파워팩과 의약품 횡령 장부에 서명해 눈감아 준 정황을 포착했다. 추궁을 받은 동기는 창백한 얼굴로 '저 대대장 가문은 성역 정치국 고위층에 연줄이 닿아 있으니, 지금 들추면 우리 둘 다 징벌 연대로 쫓겨난다'며 보고서를 덮자고 매달린다. 스콜라의 서릿발 같은 교리와 야전 정치가 정면으로 충돌하는 밤, 그대의 깃펜이 감사 장부 위에서 멈춰 선다.",
    choices: [
      {
        label: "[지성 판정] 횡령 장부와 실물 창고를 밤새 대조해 정치국 본부에 직보한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "반박할 여지 없는 출납 증거를 본부 감찰관에게 직통으로 전달했다. 부패 대대장은 즉각 보직 해임되었고 동기는 징계위에 회부되었으나, 정치국은 그대의 강철 같은 청렴함을 높이 평가했다.",
          stats: { Int: 6, WP: 5, Inf: 7 },
          faith: 4,
          align: { dogmatic: 8, ruthless: 2 }
        },
        fail: {
          text: "귀족 가문의 연줄이 먼저 움직여 창고 기록 일부가 분실되었고, 그대는 상부 지휘 체계를 건너뛴 월권 보고를 이유로 엄중한 경고를 받았다.",
          stats: { Int: 3, Inf: -4, WP: 4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[교섭 판정] 동기에게 정정 보고 기회를 주고 대대장에게 횡령품 전량 반환을 압박한다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "은밀하고도 단호한 압박 끝에 대대장이 빼돌린 의약품과 탄약을 밤사이 최전방 병영으로 되돌려 놓았다. 동기의 목숨도 구하고 장병들의 보급도 지켜 낸 절묘한 중재였다.",
          stats: { Fel: 7, Int: 5, Inf: 5 },
          align: { humane: 8, dogmatic: -2 }
        },
        fail: {
          text: "대대장이 시간을 끌며 책임을 동기에게 떠넘기는 바람에 사태가 커졌고, 그대 역시 감독 소홀로 훈계 처분을 받았다.",
          stats: { Fel: 2, Inf: -3 },
          align: { humane: 4 }
        }
      },
      {
        label: "[스콜라 출신 전용 · 의지 판정] 스콜라의 맹세를 읊으며 동기까지 즉각 구속해 군법회의에 세운다",
        req: { allTags: ["schola"] },
        check: { stat: "WP", diff: 0 },
        success: {
          text: "사적인 정을 칼같이 베어 낸 생도의 결단에 감찰단이 깊은 인상을 받았다. '진정한 커미사르는 벗도 적도 아닌 오직 의무만을 본다'는 찬사가 인사 기록부에 남았다.",
          stats: { WP: 8, Inf: 7, Fel: -2 },
          faith: 5,
          align: { dogmatic: 9, humane: -3 }
        },
        fail: {
          text: "강경한 체포 도중 대대장 측 호위병들과 충돌해 타박상을 입었으나, 끝내 감사 보고서만은 봉인해 상부에 제출했다.",
          wounds: -12,
          stats: { WP: 4, Inf: 3 },
          align: { dogmatic: 6 }
        }
      },
      {
        label: "감사 장부에 실물 재검토 보류를 기록하고 지도 커미사르에게 정식 판단을 일임한다",
        effect: {
          text: "독단적인 폭로나 은폐 대신 규정 절차대로 보류 인장을 찍어 상급 감찰관에게 장부를 넘겼다. 정치국의 위계와 원칙을 지키는 신중한 처신에 선임도 고개를 끄덕였다.",
          stats: { WP: 3, Int: 2, Inf: 2 },
          align: { dogmatic: 2 }
        }
      }
    ],
    source: "Only War: Hammer of the Emperor / Codex: Astra Militarum / Lexicanum: Commissariat"
  },
  {
    id: "ev_s20_mid_03",
    title: "헬름 메카니쿰의 사냥 본능 — 아미저 모의 신경 접속 시련",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_squire"]
    },
    reqLabel: "직군: 기사 가문 종자",
    weight: 36,
    text: "기사 성채 지하의 신경 조율실, 차가운 강철 조종석에 오른 그대의 후두부에 아미저 기체의 헬름 메카니쿰 신경 단자가 맞물린다. 소형 동력로가 깨어나는 순간, 사냥개처럼 공격적이고 거친 아미저 기계령의 사냥 본능과 격렬한 신경 과부하의 압박이 뇌리를 강타한다. 동시에 천장 중계기를 통해 상위 퀘스토리스 기사의 스론 메카니쿰에서 흘러드는 본즈맨 복종 파형이 그대의 정신을 짓누르며 대형 편입을 강요한다. 시련을 지켜보는 수석 사크리스탄과 선배 기사들이 숨을 죽인 채 생체 계측기의 붉은 파형을 주시한다.",
    choices: [
      {
        label: "[의지 판정] 야수 같은 기계령의 사냥 본능과 본즈맨 복종 파형을 정면으로 버텨 내며 제압한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "거칠게 요동치던 신경 파형이 순식간에 일직선으로 안정되었다! 날뛰던 아미저의 기계령이 마침내 고개를 숙이며 종자를 주인으로 인정했고, 조율실에 경건한 전투 나팔이 울려 퍼졌다.",
          stats: { WP: 7, WS: 4, Inf: 6 },
          faith: 4,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "거센 신경 과부하에 코피를 쏟으며 잠시 시야가 암전되었으나, 끝까지 조종석에서 물러서지 않은 오기만으로 시련을 가까스로 넘겼다.",
          wounds: -14,
          stats: { WP: 4, T: 3 },
          align: { dogmatic: 3 }
        }
      },
      {
        label: "[지성 판정] 억누르는 대신 기계령의 사냥 충동과 상위 기사의 본즈맨 신호를 정교하게 조율한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "거친 사냥 본능이 날카로운 전술 감각으로 다듬어지며 상위 기사의 지령망과 완벽히 맞물렸다. 기체의 발걸음이 자신의 팔다리처럼 부드럽게 움직이자 사크리스탄이 탄성을 터뜨렸다.",
          stats: { Int: 7, Ag: 5, WP: 4 },
          align: { humane: 6, dogmatic: 2 }
        },
        fail: {
          text: "신호 동조에 지나치게 집중하다 신경 과부하로 극심한 편두통을 앓았으나, 아미저의 균형 제어권만은 끝까지 붙들었다.",
          wounds: -10,
          stats: { Int: 3, WP: 3 },
          align: { humane: 3 }
        }
      },
      {
        label: "[사크리스탄 맹약 전용 · 지성 판정] 이진법 진정 기도로 신경 과부하를 잠재우고 기계령과 공명한다",
        req: { allTags: ["sacristan_oath"] },
        check: { stat: "Int", diff: 5 },
        success: {
          text: "정밀한 이진법 성가가 헬름 메카니쿰 회로를 타고 흐르자 사납던 사냥 본능이 충직한 군견처럼 가라앉았다. 성소 장로들이 그대를 차세대 기사의 귀감으로 치켜세웠다.",
          stats: { Int: 6, BS: 5, Inf: 6 },
          faith: 3,
          align: { dogmatic: 5 }
        },
        fail: {
          text: "기도 억양이 한 박자 어긋나며 미세한 신경 전류 충격을 입었으나, 빠르게 회로를 복구해 접속을 완수했다.",
          wounds: -8,
          stats: { Int: 3, WP: 3 }
        }
      },
      {
        label: "교범의 표준 안전 출력으로 본즈맨 복종 파형을 묵묵히 수용하고 기계령을 차분히 진정시킨다",
        effect: {
          text: "무리하게 주도권을 다투지 않고 상위 스론 메카니쿰의 유도 파형에 호흡을 맞추며 아미저를 안정화했다. 겸허하고 절제된 종자의 태도에 선배 기사들이 만족스럽게 고개를 끄덕였다.",
          stats: { WP: 3, T: 2, Int: 2 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Imperial Knights / Assassinorum: Kingmaker / Lexicanum: Helm Mechanicum"
  },
  {
    id: "ev_s20_mid_04",
    title: "기사 종자 — 대마상 시합 전야, 경쟁 가문의 아미저 관절 사보타주 적발",
    category: "임페리얼 나이트",
    once: true,
    req: {
      anyCareers: ["knight_squire"]
    },
    reqLabel: "직군: 기사 가문 종자",
    weight: 34,
    text: "기사 행성의 대마상 시합을 하루 앞둔 깊은 밤, 그대는 자신이 몰 아미저 워글레이브의 유압 다리 관절과 서멀 스피어 연결부를 마지막으로 점검하기 위해 격납고에 들렀다. 그런데 어두운 기둥 뒤에서 경쟁 대가문의 시종 둘이 유압 밸브에 미세한 산성 윤활유를 흘려 넣고 재빨리 빠져나가는 광경을 목격했다! 내일 시합장에서 전속력으로 돌격하는 순간 다리 관절이 잠겨 기체가 전복되고, 가문의 명예는 진흙탕에 처박힐 흉계였다. 격납고 바깥에서는 사크리스탄 당직 순찰대의 발소리가 멀리서 울려 온다.",
    choices: [
      {
        label: "[백병 판정] 도주하는 경쟁 가문 시종들을 즉각 추격해 제압하고 원로원 앞에서 자백을 받아낸다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "날렵한 제압으로 시종 둘과 산성 기름병을 현장에서 붙잡았다! 다음 날 시합 개막 전 경쟁 가문의 비열한 음모가 만천하에 드러났고, 그대는 워글레이브로 시합에서도 당당히 승리를 거두었다.",
          stats: { WS: 7, WP: 4, Inf: 6 },
          faith: 3,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "어둠 속에서 시종들이 휘두른 정비 공구에 옆구리를 다치고 놓쳐 버렸다. 간신히 밸브만 세척해 시합에는 나섰으나 증거가 없어 원한만 삼켜야 했다.",
          wounds: -14,
          stats: { WS: 3, T: 2 },
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[지성 판정] 사크리스탄과 밤새 관절을 비밀리에 수리한 뒤 정정당당한 시합으로 경쟁자를 꺾는다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "손상된 유압 밸브를 완벽히 복원하고, 다음 날 워글레이브의 리퍼 체인클리버 모의 일격으로 경쟁 가문 기체를 무릎 꿇렸다! 폭로 대신 침묵의 경고만 건네는 기사도에 원로들이 깊이 탄복했다.",
          stats: { Int: 6, WS: 5, Fel: 6 },
          faith: 4,
          align: { humane: 9, dogmatic: 2 }
        },
        fail: {
          text: "밤샘 정비 여파로 시합 도중 워글레이브 출력이 미세하게 떨어지며 판정패를 겪었으나, 기체 파손과 가문 추문만은 막아 냈다.",
          stats: { Int: 3, Fel: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[민첩 판정] 사보타주 물증을 조용히 확보해 경쟁 가문 장로에게 비밀 양보와 정비 물자를 뜯어낸다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "산성 기름병과 시종의 인장을 들이밀자 경쟁 가문 장로가 얼굴이 하얗게 질려 귀한 합금 부품과 시합 기권을 헌납했다. 기사도의 가면 뒤에 숨은 봉건 정치의 냉혹한 승자였다.",
          stats: { Ag: 5, Int: 5, Inf: 7 },
          align: { ruthless: 8, dogmatic: -3 }
        },
        fail: {
          text: "역으로 경쟁 가문이 먼저 종자가 타 가문을 모함했다며 선수를 쳐, 영지 내 평판에 뼈아픈 흠집이 났다.",
          stats: { Ag: 2, Inf: -4 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "즉시 사크리스탄 당직 사제와 시합 심판단을 불러 현장을 봉인하고 정식 조사를 요청한다",
        effect: {
          text: "사적인 보복 대신 기사령의 법도에 따라 유압 관절을 봉인하고 시합 연기와 정밀 감식을 요청했다. 원로원은 종자의 신중하고 공정한 처신을 높이 샀다.",
          stats: { Int: 3, WP: 2, Inf: 2 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Imperial Knights / Kingsblade / Lexicanum: Armiger Warglaive"
  },
  {
    id: "ev_s20_mid_05",
    title: "콘벤트의 철야 실기 — 암흑 속 볼터 조립과 치유의 붕대",
    category: "전투 수녀회",
    once: true,
    req: {
      anyCareers: ["sororitas_novitiate"]
    },
    reqLabel: "직군: 소로리타스 노비티에이트",
    weight: 35,
    text: "촛불만 흔들리는 콘벤트의 차가운 석조 강당에서, 사흘째 이어진 철야 성가 끝에 수련 수녀들의 눈꺼풀이 납덩이처럼 무거워졌다. 그때 엄격하기로 이름난 교관 수녀가 강단 위로 분해된 볼터 부품 궤짝과 야전 의무낭을 내려놓으며 선언한다. '순교 성가를 한 음절도 틀리지 않고 암송하는 동시에, 눈을 가린 채 성스러운 볼터를 완전 조립하고 모의 중상자의 지혈 처치까지 끝내라. 정식 전투 수녀의 갑주는 오직 흔들림 없는 손과 영혼에만 허락된다.'",
    choices: [
      {
        label: "[의지 판정] 떨리는 숨을 가다듬고 성가 암송과 암흑 속 볼터 조립을 완벽히 완수한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "묵직한 노리쇠가 제자리에 맞물리는 소리와 성가의 마지막 절이 정확히 겹쳐 울렸다! 교관 수녀는 묵묵히 고개를 끄덕이며 그대의 카라페이스 견갑에 우수 수련생의 붉은 리본을 매어 주었다.",
          stats: { WP: 7, BS: 5, Inf: 5 },
          faith: 7,
          align: { dogmatic: 8 }
        },
        fail: {
          text: "극심한 피로에 손끝이 미끄러져 공이 스프링이 돌바닥으로 튕겨 나갔고, 그대는 새벽까지 차가운 회랑에 무릎을 꿇고 참회 기도를 바쳐야 했다.",
          wounds: -8,
          stats: { WP: 4 },
          faith: 2,
          align: { dogmatic: 4 }
        }
      },
      {
        label: "[지성 판정] 볼터 조립을 간결히 마친 뒤 모의 중상자 응급 처치에 정성을 쏟아 자비를 보인다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "능숙한 지혈과 상처 소독, 부상당한 자매를 다독이는 차분한 기도까지 빈틈없이 해냈다. 교관 수녀는 '검을 드는 손이 자비의 붕대까지 감을 줄 안다면 그것이 참된 제국의 딸'이라며 깊이 치하했다.",
          stats: { Int: 7, Fel: 5, WP: 4 },
          faith: 5,
          align: { humane: 8, dogmatic: 2 }
        },
        fail: {
          text: "지혈 매듭에 시간을 너무 쏟다 볼터 조립 마감 종소리를 놓쳐 감점을 받았으나, 응급 처치 솜씨만은 동급생들 사이에서 오래 기억되었다.",
          stats: { Int: 3, Fel: 3 },
          faith: 2,
          align: { humane: 5 }
        }
      },
      {
        label: "[신앙 75+ 전용 · 강인 판정] 철야의 갈증과 손의 찰과상을 봉헌으로 삼아 최속으로 돌파한다",
        req: { minFaith: 75 },
        check: { stat: "T", diff: 0 },
        success: {
          text: "피가 배어 나온 손가락으로도 한 번도 눈살을 찌푸리지 않고 시험 전 과정을 수석으로 통과했다. 수도원 회랑에 그대의 불굴의 신심이 본보기로 회자되었다.",
          stats: { T: 6, WP: 6, Inf: 5 },
          faith: 8,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "무리하게 서두르다 장전 손잡이에 손등을 깊게 베였으나, 멈추지 않고 성가를 끝까지 불러 수련생의 체면만은 지켜 냈다.",
          wounds: -12,
          stats: { T: 3, WP: 3 },
          faith: 4
        }
      },
      {
        label: "속도 경쟁을 욕심내지 않고 교본의 안전 수칙대로 차분히 볼터 조립과 기본 지혈을 마무리한다",
        effect: {
          text: "선두로 나서지는 않았으나 단 하나의 부품 오차도 없이 조립과 지혈을 정직하게 끝마쳤다. 교관 수녀는 화려함보다 원칙을 지키는 신중함을 조용히 기록했다.",
          stats: { WP: 3, Int: 2, BS: 2 },
          faith: 3,
          align: { dogmatic: 2, humane: 2 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Kill Team: Chalnath / Lexicanum: Sister Novitiate"
  },
  {
    id: "ev_s20_mid_06",
    title: "성지 순례길의 이단 전단 — 연좌 처벌과 정밀 심문 사이",
    category: "전투 수녀회",
    once: true,
    req: {
      anyCareers: ["sororitas_novitiate"]
    },
    reqLabel: "직군: 소로리타스 노비티에이트",
    weight: 34,
    text: "성지 행성의 가파른 석조 순례길을 따라 수천 명의 피곤한 순례자 행렬을 호위하던 도중, 휴식처 우물 벽면에서 불경한 팔각 낙서와 이단 전단지가 발견되었다. 인솔 중인 선임 수녀는 '오염된 씨앗 하나가 성지 전체를 썩게 만든다. 의심 구역의 순례자 서른 명 전원을 즉각 격리하고 태형과 혹독한 심문에 회부하라'고 명한다. 그러나 겁에 질려 떨고 있는 무리 속에는 먼 항로에서 전 재산을 바쳐 성지를 찾은 노약자와 독실한 신도들도 섞여 있다.",
    choices: [
      {
        label: "[지성 판정] 안료와 종이 결을 추적해 순례자 틈에 숨은 진짜 이단 선동자 한 명만 색출한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "손톱 밑에 검은 석탄 안료가 묻어 있던 위장 상인을 순식간에 붙잡아 자백을 받아 냈다! 무고한 순례자 서른 명이 눈물로 감사를 올렸고, 선임 수녀 역시 그대의 냉철한 분별력을 인정했다.",
          stats: { Int: 7, Fel: 6, Inf: 5 },
          faith: 6,
          align: { humane: 9, dogmatic: 2 }
        },
        fail: {
          text: "단서를 추적하는 사이 진짜 선동자가 군중 틈으로 달아나 버렸고, 선임 수녀의 싸늘한 꾸중 속에 행렬 전체가 사흘간 봉쇄 조사를 받아야 했다.",
          stats: { Int: 3, Inf: -3 },
          faith: 2,
          align: { humane: 5 }
        }
      },
      {
        label: "[의지 판정] 교단의 철칙대로 의심 구역 순례자 전원을 구금하고 강경한 교리 심문을 집행한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "서슬 퍼런 심문 끝에 공포에 질린 선동자가 스스로 정체를 드러냈고, 남은 순례자들도 불경의 여지를 남기지 않도록 엄혹한 참회 의식을 치렀다. 선임 수녀는 망설임 없는 교조적 결단을 극찬했다.",
          stats: { WP: 7, Inf: 6 },
          faith: 6,
          align: { dogmatic: 9, humane: -4 }
        },
        fail: {
          text: "지나친 강압에 반발한 순례자 일부가 소란을 일으켜 진압 도중 상처를 입었으나, 끝내 이단 선동자만은 잡아들였다.",
          wounds: -12,
          stats: { WP: 4, Fel: -3 },
          faith: 3,
          align: { dogmatic: 6, humane: -3 }
        }
      },
      {
        label: "[교섭 판정] 수색을 빌미로 부유한 순례 상인단의 짐수레를 검문해 교단 헌금과 밀고망을 챙긴다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "심문의 공포 앞에서 상인들은 자발적이라는 이름의 거액 헌금을 내놓았고, 진짜 선동자는 하층 숙소에서 밀고자의 제보로 조용히 처리되었다. 수녀원의 곳간은 넉넉해졌으나 순례길의 신뢰는 식어 갔다.",
          stats: { Fel: 5, Inf: 6, Int: 4 },
          faith: -3,
          align: { ruthless: 8, humane: -4 }
        },
        fail: {
          text: "노련한 교역 조합장이 순례국 추기경실에 강압 징수를 탄원하는 바람에 선임 수녀에게 엄중한 훈계를 받았다.",
          stats: { Fel: 2, Inf: -4 },
          align: { ruthless: 4 }
        }
      },
      {
        label: "선임 수녀의 지시에 따라 우물 일대를 즉시 봉쇄하고 정식 심문단이 도착할 때까지 경계를 선다",
        effect: {
          text: "섣부른 처벌도 방임도 피한 채 행렬을 차분히 통제하고 오염 구역을 격리했다. 이튿날 도착한 교단 심문단이 사건을 인계받으며 수련 수녀의 절제된 경계 임무를 치하했다.",
          stats: { WP: 3, T: 2, Inf: 2 },
          faith: 2,
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Adepta Sororitas / Dark Heresy: Blood of Martyrs / Lexicanum: Shrine World"
  },
  {
    id: "ev_s20_mid_07",
    title: "성역 사령부의 충돌 — 기계교 탄약 배급과 국교 성전군의 지휘권",
    category: "계급 심화",
    once: true,
    req: {
      anyCareers: ["militarum_general"]
    },
    reqLabel: "직군: 아스트라 밀리타룸 장군",
    weight: 38,
    text: "대륙 총공세를 사흘 앞둔 성역 사령부 작전 회의실에 팽팽한 살기가 감돈다. 아뎁투스 메카니쿠스 병참 마고스는 '포지 성소 탈환전에 중포 탄약과 연료의 70퍼센트를 우선 배정하지 않으면 수송 서비터단을 철수시키겠다'고 기계음으로 통첩했고, 맞은편의 국교 성전 사절단은 '성지 해방이 최우선이며 성전군 지휘권에 밀리타룸 장군이 간섭할 수 없다'며 언성을 높인다. 제국의 두 거대 권력이 작전 지도를 두고 정면 충돌한 가운데, 전역 사령관인 그대의 결단에 수백만 장병의 명운이 달렸다.",
    choices: [
      {
        label: "[권위 판정] 전역 사령관의 군령권을 선포해 병참과 성전군을 단일 작전표 아래 강제 통합한다",
        check: { stat: "Inf", diff: -10 },
        critSuccess: {
          text: "서릿발 같은 군령과 빈틈없는 제국 병법 논리 앞에 기계교 마고스도, 국교 대사제도 동시에 침묵하며 인장을 찍었다! 사령부 역사에 남을 완벽한 합동 공세로 포지 성소와 성지가 모두 일주일 만에 해방되었고, 성역 전체가 그대를 전설의 명장으로 우러렀다.",
          stats: { Inf: 10, WP: 7, Int: 6 },
          faith: 6,
          align: { dogmatic: 9 }
        },
        success: {
          text: "단호한 지휘권 행사 끝에 양측이 불만을 품고서도 작전 시간표에 서명했다. 공세는 계획대로 개시되어 핵심 교두보를 확보했다.",
          stats: { Inf: 7, WP: 5 },
          faith: 3,
          align: { dogmatic: 7 }
        },
        fail: {
          text: "마고스와 사절단 모두가 성역 원로원에 항의 서한을 보내며 협조를 지연시켰고, 그대는 반쪽짜리 탄약으로 힘겨운 공세를 치러야 했다.",
          stats: { Inf: -4, WP: 4 },
          align: { dogmatic: 4 }
        },
        critFail: {
          text: "양측이 동시에 협조 중단을 선언하며 회의장이 아수라장이 되었고, 보급이 끊긴 전방 연대가 적 역습에 대파당하는 참사가 벌어졌다! 성역 감찰부에 문책 보고서가 올라가며 사령관 권위가 심각하게 흔들렸다.",
          stats: { Inf: -9, Fel: -5, WP: 3 },
          faith: -5,
          align: { dogmatic: 2 }
        }
      },
      {
        label: "[교섭 판정] 기계교에 노획 병기 회수권을, 국교에 포교권을 약속해 병사들의 보급을 지킨다",
        check: { stat: "Fel", diff: -5 },
        critSuccess: {
          text: "명분과 실리를 절묘하게 나눈 중재안에 기계교는 예비 탄약고까지 개방했고, 국교는 전선 야전 병원에 치유 성직자단을 총동원했다! 아군 사상률이 예상의 절반 이하로 떨어지며 전군 장병이 그대의 이름을 환호했다.",
          stats: { Fel: 10, Int: 7, Inf: 8 },
          faith: 7,
          align: { humane: 10, dogmatic: 2 }
        },
        success: {
          text: "각 세력이 원하는 전리품과 명분을 정확히 보장해 합의안을 이끌어 냈다. 최전방 보병 연대들이 충분한 탄약과 의무 지원을 받으며 전진할 수 있었다.",
          stats: { Fel: 7, Int: 5, Inf: 6 },
          faith: 3,
          align: { humane: 8 }
        },
        fail: {
          text: "협상 도중 양측의 요구가 눈덩이처럼 불어나 공세 개시가 나흘 늦어졌고, 예비 비축 탄약이 크게 소모되었다.",
          stats: { Fel: 3, Inf: -3 },
          align: { humane: 4 }
        },
        critFail: {
          text: "양측에 약속한 이권 조항이 서로 충돌한다는 사실이 공세 전날 폭로되면서, 기계교 수송대와 국교 민병대가 보급 기지에서 충돌하는 대망신이 터졌다. 사령부 참모진마저 그대의 조정 능력에 의문을 품었다.",
          stats: { Fel: -7, Inf: -7, Int: 2 },
          faith: -4,
          align: { humane: 3 }
        }
      },
      {
        label: "[지성 판정] 국교 성전군을 적 요새 정면 선봉에 세우고 기계교 탄약으로 주력 기갑 사단을 우회 돌파시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "광신적인 성전군이 피를 뿌리며 적 화력을 빨아들이는 동안, 충분한 포탄을 지원받은 밀리타룸 기갑 사단이 적 측면을 완벽히 꿰뚫었다. 냉혹하기 그지없는 승리였으며, 살아남은 국교 사절들은 그대를 차가운 눈으로 기억했다.",
          stats: { Int: 7, Inf: 7, Fel: -4 },
          faith: -4,
          align: { ruthless: 9, humane: -5 }
        },
        fail: {
          text: "국교 사절단이 함정을 눈치채고 성전군 투입을 막판에 거부하는 바람에 기갑 사단 측면이 노출되어 큰 손실을 입었다.",
          stats: { Int: 3, Inf: -4, Fel: -3 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "공세 개시를 이틀 미루고 기계교와 국교 양측에 동등한 최소 배급을 배정해 표준 합동 작전안을 확정한다",
        effect: {
          text: "어느 쪽의 독주도 허락하지 않고 표준 병참 비율대로 보급을 균등 분배했다. 화려한 속전속결은 미뤄졌으나 제국 연합군의 균열을 막고 안정적인 전선 전진을 일궈 냈다.",
          stats: { Int: 3, WP: 3, Inf: 2 },
          align: { dogmatic: 2, humane: 2 }
        }
      }
    ],
    source: "Codex: Astra Militarum / Imperial Armour / Lexicanum: General"
  },
  {
    id: "ev_s20_mid_08",
    title: "이중 암호 지령 — 인질 구출과 심문소 증거 말소의 교차로",
    category: "계급 심화",
    once: true,
    req: {
      anyCareers: ["tempestus_prime_cmd"]
    },
    reqLabel: "직군: 템페스투스 프라임",
    weight: 36,
    text: "반역 행성 총독부의 지하 기록 보관소로 침투하기 직전, 그대의 암호 데이터슬레이트에 서로 정면으로 모순되는 최상위 기밀 지령 두 통이 동시에 수신되었다. 아스트라 밀리타룸 성역 사령부는 지하 감옥에 갇힌 충성파 연대 참모진과 암호 장교들을 전원 구출하라고 지시했지만, 직후 도착한 이단심문소 인장 전문은 '참모진이 이미 금지된 외계·워프 문서에 노출되었으니 인질과 기록 보관소를 멜타 폭탄으로 통째로 소각하라'고 명한다. 적 순찰대의 발소리가 복도 너머로 다가오는 가운데, 정예 사이온 소대는 프라임의 수신호만 기다리고 있다.",
    choices: [
      {
        label: "[민첩 판정] 기록 보관소만 정밀 폭파하고 붕괴 직전 충성파 인질들을 전원 구출한다",
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "1초의 오차도 없는 동시 기동으로 금지 문서고를 소각하는 동시에 열두 명의 참모진을 안전하게 발키리로 빼냈다! 군부는 극찬을 보냈고, 심문소 측도 감시 하에 인질 심문을 수용하며 물러섰다.",
          stats: { Ag: 7, Int: 6, Fel: 4, Inf: 6 },
          align: { humane: 9, dogmatic: -2 }
        },
        fail: {
          text: "인질 호송 중 무너지는 천장 파편과 적 경비대의 역습에 휘말려 부상을 입었고, 이단심문소에는 명령 불이행 경고 기록이 남았다.",
          wounds: -18,
          stats: { Ag: 3, Inf: -3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[사격 판정] 이단심문소 칙령에 따라 감옥과 기록 보관소를 완전 봉쇄·소각해 증거를 말소한다",
        check: { stat: "BS", diff: 0 },
        success: {
          text: "핫샷 라스건의 정밀 사격으로 경비망을 지워 낸 뒤 멜타 폭탄을 가동해 지하층 전체를 한 줌의 재로 만들었다. 군부 사령관은 격노했으나 이단심문소는 그대의 절대적 보안 의식에 깊은 신임을 보냈다.",
          stats: { BS: 7, WP: 6, Inf: 7 },
          addTags: ["inquisition_favor"],
          align: { dogmatic: 8, ruthless: 4, humane: -5 }
        },
        fail: {
          text: "지하층 봉쇄 도중 적 화력조와 근접전이 벌어져 상처를 입었으나, 임무 목표인 완전 말소만큼은 끝내 달성했다.",
          wounds: -14,
          stats: { BS: 4, WP: 4 },
          align: { dogmatic: 5, ruthless: 3 }
        }
      },
      {
        label: "[지성 판정] 인질은 군부에 넘기되 핵심 기밀 데이터 코어를 몰래 챙겨 양측의 약점을 모두 쥔다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "폭발의 연막 속에 인질은 군부에 인도하고 가장 민감한 기록 사본은 장갑 주머니에 숨겼다. 군부도 심문소도 섣불리 그대의 지휘 소대를 건드리지 못하는 은밀한 지렛대가 생겼다.",
          stats: { Int: 7, Inf: 7, Ag: 4 },
          corruption: 2,
          align: { ruthless: 9, dogmatic: -4 }
        },
        fail: {
          text: "데이터 코어를 빼내던 흔적이 이단심문소 감찰 어콜라이트에게 포착되어 혹독한 보안 심문을 겪고 계급 평점에 상처를 입었다.",
          wounds: -12,
          stats: { Int: 3, Inf: -5 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "교전 수칙대로 지하층 외곽을 완전 봉쇄하고 군부·심문소 합동 확인 전문이 내려올 때까지 사수한다",
        effect: {
          text: "상충하는 상급 명령 앞에서 독단적 판단을 피하고 적 증원을 끊으며 현장을 철통같이 봉쇄했다. 사흘 뒤 합동 수습반이 인계를 마친 뒤 프라임의 냉정한 규율 준수를 높이 평가했다.",
          stats: { WP: 3, Int: 2, BS: 2 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Codex: Militarum Tempestus / Dark Heresy: Ascension / Lexicanum: Tempestor Prime"
  },
  {
    id: "ev_s20_mid_09",
    title: "암흑가 거두 — 언더하이브 비밀 경매장의 콜드 트레이드 패권 담판",
    category: "암흑가",
    once: true,
    req: {
      anyCareers: ["hive_crime_lord"]
    },
    reqLabel: "직군: 하이브 암흑가 거두",
    weight: 35,
    text: "하층 하이브의 폐쇄된 냉각탑 내부, 어두운 등불 아래 각 구역 밀수 조직의 두목들과 외성계 자유 상인들이 비밀 경매장에 모여들었다. 오늘의 핵심 물건은 변방 성계에서 흘러들어온 희귀 콜드 트레이드 유물 상자와 위조 통관 인장 일체로, 낙찰자는 향후 십 년간 언더하이브 밀수 항로의 패권을 쥐게 된다. 경쟁 신디케이트 거두가 막대한 쓰론 겔트를 앞세워 입찰가를 끌어올리는 가운데, 경매장 바깥 환기구에서는 매수되지 않은 총독부 치안 집행관대 기동대가 포위망을 좁히고 있다는 은밀한 전갈이 날아들었다.",
    choices: [
      {
        label: "[교섭 판정] 치안 집행관대 출동 소식을 역이용해 경쟁 거두들을 압박하고 헐값에 패권을 독점한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "경매장이 술렁이는 틈을 타 냉철한 조건과 황금 쓰론 어음을 던져 경쟁자들을 일제히 물러나게 했다! 비상 화물 승강기로 물건을 빼돌리며 언더하이브 암흑가의 진정한 지배자로 우뚝 섰다.",
          stats: { Fel: 8, Int: 5, Inf: 8 },
          addTags: ["wealthy"],
          align: { ruthless: 6 }
        },
        fail: {
          text: "경쟁 거두가 오히려 그대를 밀고자로 몰아세우는 바람에 경매장이 총격전으로 번졌고, 빈손으로 빠져나오다 총상을 입었다.",
          wounds: -16,
          stats: { Fel: 3, Inf: -3 },
          align: { ruthless: 3 }
        }
      },
      {
        label: "[지성 판정] 위조 통관 인장만 확보하고 치안 집행관대에 위험한 외계 유물 위치만 익명 제보한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "오염 우려가 큰 콜드 트레이드 상자는 총독부 치안 집행관대가 압수하게 유도하고, 그대는 합법 화물선을 위장할 통관 인장과 하층 구역 생필품 유통망을 손에 넣었다. 무모한 참화를 피한 수완에 부하들의 신뢰가 깊어졌다.",
          stats: { Int: 8, Fel: 6, Inf: 6 },
          align: { humane: 8, ruthless: 2 }
        },
        fail: {
          text: "총독부 치안 집행관대가 예상보다 빠르게 경매장 내부까지 들이닥쳐 통관 인장 일부를 잃고 급히 철수해야 했다.",
          wounds: -10,
          stats: { Int: 4 },
          align: { humane: 4 }
        }
      },
      {
        label: "[백병 판정] 조명 전원을 끊고 무장 경호대를 지휘해 경매장 금고의 쓰론 겔트와 물건을 통째로 강탈한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "암흑 속 총성이 멎었을 때 바닥에는 경쟁 신디케이트의 호위대만 쓰러져 있었고, 황금 쓰론 궤짝과 밀수품은 전부 그대의 화물 트럭에 실렸다! 공포로 세운 패권 앞에 누구도 반기를 들지 못했다.",
          stats: { WS: 7, Inf: 8, T: 4 },
          corruption: 3,
          addTags: ["wealthy"],
          align: { ruthless: 9, humane: -5 }
        },
        fail: {
          text: "경매장 경비대의 산탄 세례와 치안 집행관대의 최루탄에 협공당해 큰 부상을 입고 도주했다.",
          wounds: -22,
          stats: { WS: 3, Inf: -4 },
          align: { ruthless: 5 }
        }
      },
      {
        label: "무리한 입찰 경쟁에서 한 발 물러나 기존 구역 밀수망과 부하들의 안전을 지키며 조용히 철수한다",
        effect: {
          text: "총독부 치안 집행관대가 냉각탑을 덮치는 소란을 등지고 단 한 명의 손실도 없이 하층 아지트로 복귀했다. 살아남은 조직이 결국 다음 날 암흑가의 실속을 챙기는 법이다.",
          stats: { Int: 3, Ag: 2, WP: 2 },
          align: { humane: 2 }
        }
      }
    ],
    source: "Necromunda: Underhive / Dark Heresy: Book of Judgement / Lexicanum: Cold Trade"
  },
  {
    id: "ev_s20_mid_10",
    title: "70년 치 십일조 오차 — 네 행성의 운명을 가르는 프리펙트의 인장",
    category: "행정",
    once: true,
    req: {
      anyCareers: ["admin_prefect_rank"]
    },
    reqLabel: "직군: 아드미니스트라툼 감사관(프리펙트)",
    weight: 35,
    text: "세그멘툼 감사원 지하 서고의 곰팡이 낀 양피지 더미를 대조하던 중, 그대는 관할 4개 행성의 광물·인력 십일조 원장에 무려 70년 치의 복리 계산 오차가 누적되어 막대한 미납분이 숨겨져 있었음을 발견했다. 규정대로라면 당장 이번 분기에 4개 행성 총독부로부터 전량 강제 징발을 집행해야 하지만, 그렇게 하면 공장 지대와 징집 구역이 한꺼번에 무너져 대규모 폭동이 불가피하다. 소식을 접한 네 행성의 귀족 대리인들이 은밀히 감사관실 문 앞을 서성이는 가운데, 프리펙트의 인장이 떨어질 순간을 서고 전체가 숨죽여 지켜본다.",
    choices: [
      {
        label: "[권위 판정] 제국 십일조의 절대성을 선포하고 아르비테스를 동원해 미납분을 즉시 강제 징발한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "70년 묵은 체납 물자가 순식간에 제국 화물선에 채워졌다! 하층 구역 곳곳에서 통곡과 소요가 터져 나왔으나, 아드미니스트라툼 국장실은 한 치의 사정도 두지 않는 강철 감사를 치하했다.",
          stats: { Inf: 8, WP: 6, Fel: -3 },
          faith: 3,
          align: { dogmatic: 9, humane: -5 }
        },
        fail: {
          text: "무리한 징발에 반발한 행성 총독들이 운송을 지연시키고 항의 청원을 올렸으며, 현장을 시찰하던 그대의 호송 차량이 폭도의 투석에 습격당했다.",
          wounds: -12,
          stats: { Inf: 3, Fel: -4 },
          align: { dogmatic: 5 }
        }
      },
      {
        label: "[지성 판정] 70년 전 행정부 필기 오류를 입증해 15년 분할 상환 특례 보고서를 통과시킨다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "수천 장의 고문서에서 70년 전 서기관의 숫자 전사 오류를 찾아내 완벽한 법리적 근거를 세웠다! 네 행성은 파멸을 면했고 제국 국고 역시 안정적인 장기 상환을 확보했다.",
          stats: { Int: 8, Fel: 6, Inf: 6 },
          align: { humane: 9, dogmatic: 2 }
        },
        fail: {
          text: "특례 심사 과정에서 상급 부서의 반발을 사며 보고서가 반려 직전까지 몰렸으나, 밤샘 수정 끝에 간신히 징발 유예만은 얻어 냈다.",
          stats: { Int: 4, WP: 3 },
          align: { humane: 5 }
        }
      },
      {
        label: "[교섭 판정] 네 행성 귀족 대리인들과 비밀 거래를 맺고 70년 오차를 통신 유실로 소각 처리한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "곰팡이 낀 구원장이 소각로에서 재로 변하는 순간, 그대의 개인 금고에는 네 개 행성 영주의 감사 인장과 막대한 황금 쓰론이 쌓였다. 감사원의 출세길은 탄탄대로가 되었지만 양심은 서류철과 함께 타 버렸다.",
          stats: { Inf: 7, Fel: 5 },
          faith: -5,
          corruption: 4,
          addTags: ["wealthy"],
          align: { ruthless: 9, dogmatic: -5 }
        },
        fail: {
          text: "비밀 회동 첩보가 상급 감사국에 흘러 들어가 거액의 거래가 수포로 돌아갔고, 내부 징계 조사를 간신히 빠져나오며 권위가 실추되었다.",
          stats: { Inf: -5, Fel: 2 },
          corruption: 2,
          align: { ruthless: 5 }
        }
      },
      {
        label: "규정에 따라 70년 오차 원장을 그대로 봉인해 세그멘툼 상급 감사위원회로 정식 이관한다",
        effect: {
          text: "독단적인 강행도 회유도 거부하고 아드미니스트라툼의 철칙대로 원장 사본을 첨부해 상급 위원회에 결정을 맡겼다. 느리지만 흠잡을 데 없는 관료의 정석이었다.",
          stats: { Int: 3, WP: 3, Inf: 1 },
          align: { dogmatic: 3 }
        }
      }
    ],
    source: "Dark Heresy: Core Rulebook / Warhammer 40k Core Rulebook / Lexicanum: Adeptus Administratum & Imperial Tithe"
  },
  {
    id: "ev_s20_mid_11",
    title: "흔들리는 겔러 필드 — 워프 도약 2시간 전의 출항 명령",
    category: "제국 해군",
    once: true,
    req: {
      anyCareers: ["navy_captain"]
    },
    reqLabel: "직군: 임페리얼 네이비 함장",
    weight: 38,
    text: "성계 외곽 맨드빌 포인트에 집결한 순양함대의 워프 도약 시각이 불과 두 시간 앞으로 다가왔다. 바로 그때 엔진시어 프라임(기관장 테크프리스트)이 함교로 긴급 경보를 올려 보낸다. '함장님, 주 겔러 필드 방출기의 공명 코일이 14퍼센트 이상 열화되어 출력 저하가 감지되었습니다! 최소 사흘간 정비가 필요합니다.' 그러나 기함에서 내려온 성계 함대 제독의 명령서는 냉혹하다. '포위된 전선에 지원군을 제때 넣지 못하면 성계 전체가 함락된다. 단 한 시간의 지연도 항명으로 간주하겠다.' 9만 명 승무원의 영혼을 지키는 얇은 보호막과 제독의 군령 사이에서 함장의 결단이 울려 퍼져야 한다.",
    choices: [
      {
        label: "[지성 판정] 보조 포대와 선체 조명을 차단해 겔러 필드에 비상 전력을 우회 집중시켜 정시 도약한다",
        check: { stat: "Int", diff: -10 },
        critSuccess: {
          text: "함교 지휘석에서 직접 전력 분배표를 재설계하자 겔러 필드가 오히려 정격의 112퍼센트까지 찬란하게 안정되었다! 함대는 단 한 명의 광기 환자도 없이 기록적인 속도로 워프를 횡단해 포위망을 돌파했고, 제독과 엔진시어 프라임 모두가 그대의 기량에 경의를 표했다.",
          stats: { Int: 10, WP: 7, Inf: 9 },
          faith: 6,
          align: { dogmatic: 6, humane: 6 }
        },
        success: {
          text: "하층 갑판이 칠흑 같은 암흑에 잠기고 승무원들이 숨을 죽였으나, 비상 전력 우회 덕분에 겔러 필드가 워프의 긁힘을 끝까지 견뎌 내며 정시에 목적지에 도착했다.",
          stats: { Int: 7, WP: 5, Inf: 6 },
          faith: 3,
          align: { dogmatic: 5, humane: 4 }
        },
        fail: {
          text: "워프 항해 중반 전력 변동으로 하층 포갑판 일부에서 기이한 속삭임과 환각 소동이 터져 무장 경비대를 투입해 간신히 진압했다.",
          wounds: -12,
          stats: { Int: 3, WP: 4 },
          corruption: 4
        },
        critFail: {
          text: "우회 회로가 과부하로 폭발하며 겔러 필드가 3초간 깜빡였다! 그 짧은 찰나 하층 기관실에 워프의 그림자가 스며들어 끔찍한 유혈 진압전을 치러야 했고, 함교의 그대 역시 역류한 콘솔 폭발에 큰 화상을 입었다.",
          wounds: -24,
          stats: { Int: 2, Inf: -5, WP: 3 },
          corruption: 10,
          faith: -4
        }
      },
      {
        label: "[권위 판정] 군법회의를 감수하고 출항을 연기시켜 겔러 필드 코일 교체와 승무원 안전을 확보한다",
        check: { stat: "Inf", diff: -5 },
        critSuccess: {
          text: "엔진시어 프라임의 기술 진단서와 항법사의 증언을 묶어 올린 정연한 상신에 제독이 마음을 돌렸다! 예비 호위함대가 정비를 엄호해 준 덕분에 완벽히 수리된 순양함이 합류해 전선의 승기를 굳혔고, 9만 승무원은 그대를 생명의 은인으로 받들었다.",
          stats: { Inf: 9, Fel: 9, WP: 6 },
          faith: 5,
          align: { humane: 10, dogmatic: -2 }
        },
        success: {
          text: "사흘간의 지연 탓에 제독의 서릿발 같은 경고장을 받았으나, 온전한 겔러 필드로 안전하게 항해를 마쳐 승무원 전원의 깊은 충성을 얻었다.",
          stats: { Fel: 7, WP: 5, Inf: 4 },
          align: { humane: 8, dogmatic: -3 }
        },
        fail: {
          text: "출항 지연 책임으로 함대 서열에서 크게 밀려났고, 보급 우선권 삭감과 엄중한 감봉 징계를 받아야 했다.",
          stats: { Inf: -5, Fel: 3 },
          align: { humane: 5 }
        },
        critFail: {
          text: "분노한 제독이 군법회의 회부와 임시 지휘권 정지를 선언했다! 결국 참모회의의 탄원으로 함장직만은 간신히 보전했으나, 해군 장교단 내에서 명령 불복종자라는 뼈아픈 낙인이 오래도록 따라붙었다.",
          stats: { Inf: -9, Fel: -3, WP: 4 },
          faith: -3,
          align: { humane: 4, dogmatic: -5 }
        }
      },
      {
        label: "[의지 판정] 하층 노역 갑판의 방폭문을 미리 봉쇄해 핵심 구역만 보전한 채 정시 도약을 강행한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "두꺼운 격벽 너머 하층 갑판에서 비명이 들려왔으나 함교와 기관실, 주포갑판은 티끌 하나 상하지 않고 정시에 전선에 도착했다. 제독은 임무 완수를 치하했고, 함장은 하층 갑판 정리 보고서를 표정 없이 소각했다.",
          stats: { WP: 6, Inf: 7, Fel: -4 },
          corruption: 4,
          faith: -4,
          align: { ruthless: 9, humane: -6 }
        },
        fail: {
          text: "봉쇄된 하층 노역병들이 광기에 휩싸여 통풍구를 통해 중층 갑판까지 난입했고, 함교 경비대와 치열한 진압전을 치르다 상처를 입었다.",
          wounds: -18,
          stats: { WP: 3, Inf: -3 },
          corruption: 5,
          align: { ruthless: 5, humane: -4 }
        }
      },
      {
        label: "안전 항로 규정에 따라 출력 한계치 내에서 단거리 워프 도약을 분할 수행해 함선을 보전한다",
        effect: {
          text: "본대보다 반나절 늦게 전선에 합류했으나, 구간마다 코일을 식혀 가며 항해한 덕분에 겔러 필드 파손도 승무원 희생도 없이 전투 태세를 온전히 지켜 냈다.",
          stats: { Int: 3, WP: 3, Ag: 2 },
          align: { humane: 2, dogmatic: 2 }
        }
      }
    ],
    source: "Battlefleet Gothic Rulebook / Rogue Trader: Navis Primer / Lexicanum: Geller Field"
  },
  {
    id: "ev_s20_mid_12",
    title: "진시드 저장고의 피의 거래 — 워밴드 약탈 분쟁과 소서러의 음모",
    category: "카오스 군단",
    once: true,
    req: {
      anyCareers: ["renegade_marine", "chaos_lord"],
      minAge: 35
    },
    reqLabel: "직군: 배신자 아스타르테스 · 카오스 로드 (35세+)",
    weight: 36,
    text: "공포의 눈과 마엘스트롬 변방의 약탈 함선 하층 격납고, 충성파 성전함에서 뜯어낸 순수한 진시드 정지장 용기와 고대 아다만티움 병기 창고를 두고 워밴드 내부에 살기가 폭발했다. 피에 굶주린 돌격 분대장들은 약탈품의 즉각적인 분할을 요구하며 체인액스의 시동을 걸었고, 음습한 워프 룬을 두른 워밴드의 소서러는 '진시드의 절반을 암흑 소환 제단에 바치면 더 강대한 워프 축복을 내리겠다'며 은밀히 경쟁 세력과 내통한 정황마저 드러났다. 장구한 전쟁의 세월 속에 강자만이 살아남는 반역자 군단에서, 약탈품과 부하들의 목줄을 한 번에 제압할 군벌의 냉혹한 심판이 필요하다.",
    choices: [
      {
        label: "[백병 판정] 소서러의 주술진을 정면으로 짓밟고 목을 베어 진시드 저장고를 무력으로 장악한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "푸른 워프 번개를 세라마이트 견갑으로 튕겨 내며 소서러의 투구를 두 동강 냈다! 피로 물든 약탈품 창고 앞에서 돌격 분대장들이 일제히 무릎을 꿇으며 절대적 패권에 복종했다.",
          stats: { WS: 8, T: 5, Inf: 9 },
          corruption: 6,
          align: { ruthless: 8, dogmatic: 3 }
        },
        fail: {
          text: "소서러가 최후에 터뜨린 워프 화염에 갑주가 녹아내리며 깊은 화상을 입었으나, 끝내 진시드 용기만은 강철 손아귀에 지켜 냈다.",
          wounds: -20,
          stats: { WS: 4, T: 4, Inf: 4 },
          corruption: 5
        }
      },
      {
        label: "[지성 판정] 소서러의 내통 증거를 분대장들에게 폭로해 자중지란을 유도한 뒤 양측을 제압한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "교묘히 흘린 암호 석판 하나에 워밴드 내부의 야심가들이 서로 칼을 겨누며 자멸했다. 손에 피 한 방울 묻히지 않고 순수한 진시드와 충성스러운 정예 전사들만 선별해 거머쥐었다.",
          stats: { Int: 8, WP: 6, Inf: 9 },
          corruption: 5,
          align: { ruthless: 9 }
        },
        fail: {
          text: "눈치 빠른 소서러가 워프 균열을 열어 저장고 일부를 들고 도주하는 바람에 막대한 전리품을 잃었으나, 남은 워밴드의 지휘권은 지켜 냈다.",
          stats: { Int: 4, Inf: -3 },
          corruption: 4
        }
      },
      {
        label: "[의지 판정] 진시드 일부를 의식에 내어 주는 대신 소서러의 영혼을 강철 맹약 룬으로 속박한다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "소서러의 검은 주술보다 더 차갑고 압도적인 초인의 의지가 의식진을 집어삼켰다! 암흑 권능의 축복과 함께 소서러의 목줄까지 완전히 쥔 채 워밴드의 전력을 비약적으로 끌어올렸다.",
          stats: { WP: 8, Int: 5, Inf: 8 },
          corruption: 8,
          align: { dogmatic: 6, ruthless: 6 }
        },
        fail: {
          text: "주술 역류가 정신을 찢으며 격심한 고통이 밀려왔고, 기세를 탄 소서러에게 약탈품 분배권 일부를 양보해야 했다.",
          wounds: -16,
          stats: { WP: 4, Inf: -3 },
          corruption: 7
        }
      },
      {
        label: "병기와 진시드 배분권을 전장 공적대로 나누어 주되 다음 요새 강습에서 피로 충성을 증명하게 한다",
        effect: {
          text: "야심에 불타던 분대장들도, 음모를 꾸미던 소서러도 확실한 전리품과 약탈 명분 앞에서는 칼을 거두었다. 장구한 전쟁의 냉철한 규칙 아래 워밴드가 다시 하나의 침공 함대로 결속되었다.",
          stats: { Inf: 4, WP: 3 },
          corruption: 4,
          align: { ruthless: 6 }
        }
      }
    ],
    source: "Codex: Chaos Space Marines / Black Crusade Core / Night Lords Omnibus"
  }
];
