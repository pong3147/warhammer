// 분기 사건 — 초장수기(140~400세+ 초인 · 드레드노트 · 최고 사령관 · 극한 장수 필멸자)
export default [
  {
    id: "ev_s16_long_1",
    title: "초장수기 — 한 세기 반 만의 재방문, 성당 광장의 옛 석상",
    category: "초장수기",
    once: true,
    req: {
      minAge: 185,
      anyTags: ["astartes"],
      excludeTags: [
        "grey_knight", "custodes", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "185세+ · 아스타르테스",
    weight: 34,
    text: "한 세기 반 전 멸망 직전에서 구해 냈던 변경 행성에 다시 발을 디뎠다. 폐허였던 성당 광장은 어느새 거대한 대리석 광장으로 재건되어 있었고, 그 한가운데에는 젊은 날의 그대를 본뜬 웅장한 석상이 서 있다. 풍화된 투구와 무구의 윤곽만이 희미하게 그날의 모습을 닮았을 뿐, 순례자들이 읊조리는 로우 고딕은 이미 알아듣기 어려울 만큼 변했고 비문에는 실재와 동떨어진 신화만이 새겨져 있다.",
    choices: [
      {
        label: "[지성 판정] 한 세기 반 사이 변모한 현지 방언과 성당 고문서를 대조해 그날 전투의 실제 기록을 복원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "변형된 방언의 어근을 추적해 성당 지하 서고에 묻혀 있던 원전 기록을 찾아냈다. 신화로 덧칠된 과장 아래 숨어 있던 그날의 전술적 교훈과 지형 변화가 온전히 되살아났다.",
          stats: { Int: 7, WP: 4, Inf: 6 }
        },
        fail: {
          text: "수세대에 걸쳐 겹겹이 덧붙은 구전과 훼손된 양피지 사이에서 끝내 원본 기록을 찾지 못했다. 세월이 진실을 삼키는 속도에 깊은 정신적 피로와 허무가 스며들었다.",
          wounds: -8,
          stats: { Int: 2, Inf: -3 }
        }
      },
      {
        label: "[교섭 판정] 비공개 접견에서 수석 사제와 행성 지휘관에게 신화 대신 그날 전선을 지탱했던 필멸자 수비병들의 희생을 증언한다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "오래된 초인이 읊어 준 이름 없는 옛 수비병들의 행적에 접견실이 숙연한 침묵에 잠겼다. 다음 날, 석상 아래로 한 세기 반 전 함께 싸웠던 필멸자 전우들의 추모비가 새로 세워졌다.",
          stats: { Fel: 7, Inf: 7, WP: 4 },
          faith: 8
        },
        fail: {
          text: "변해 버린 방언과 세월의 간극 탓에 행성 지도부는 그대의 증언을 성인의 신탁처럼 오해해 도리어 과장된 소문만 키웠다. 진실을 바로잡으려던 뜻이 헛돌며 씁쓸한 거리감만 남았다.",
          stats: { Fel: -3, Inf: -2 }
        }
      },
      {
        label: "석상 아래 놓인 시든 꽃다발을 잠시 바라본 뒤, 정체를 밝히지 않고 조용히 궤도 수송정으로 돌아선다",
        effect: {
          text: "필멸자는 잊고, 다시 신화를 빚고, 끝내 흙으로 돌아간다. 그날의 진실을 온전히 기억하는 것 또한 오래 살아남은 수호자의 몫이다.",
          stats: { WP: 6, T: 3 },
          faith: 5
        }
      }
    ],
    source: "Codex: Space Marines / Helsreach"
  },
  {
    id: "ev_s16_long_2",
    title: "초장수기 — 두 세기를 버틴 고대 갑주와 선대 형제들의 이름",
    category: "초장수기",
    once: true,
    req: {
      minAge: 220,
      anyTags: ["astartes", "grey_knight"],
      excludeTags: [
        "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "220세+ · 아스타르테스 · 그레이 나이트",
    weight: 35,
    text: "근 두 세기 동안 수백 번의 강하와 혈전을 함께 견뎌 낸 그대의 파워 아머와 주무기가 마침내 대규모 수복 시기를 맞았다. 장갑판 안쪽 세라마이트 표면을 열자, 그대가 물려받기 전 이 갑주를 입고 전사한 선대 형제들의 이름과 그대가 직접 새겨 넣은 전역 표식이 빼곡히 드러난다. 오랜 세월로 거칠어진 갑주의 기계령이 신경 접속구 너머로 낮게 으르렁거린다.",
    choices: [
      {
        label: "[테크마린 전용] 화성에서 전수받은 성유 의례로 갑주의 기계령을 직접 조율하고 세라마이트 판을 재주조한다",
        req: { anyTags: ["role_techmarine"] },
        effect: {
          text: "기계령의 노여움을 이진법 찬가로 차분히 달래고, 선대 형제들의 이름 위로 새로운 가호 인장을 정밀하게 새겨 넣었다. 근 두 세기를 버틴 갑주가 안정적으로 깨어나며 그대의 몸과 조화를 이루었다.",
          stats: { Int: 5, T: 4, WS: 3, Inf: 3 },
          wounds: 10
        }
      },
      {
        label: "[의지 판정] 검은 갑각 신경 접속을 최대치로 개방해 근 두 세기 동안 쌓인 기계령의 투쟁 본능을 정면으로 길들인다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "선대 전사들이 남긴 전장의 잔향과 분노를 흔들림 없는 의지로 품어 안았다. 기계령이 깊은 공명으로 화답하며 갑주의 반응 속도와 방호력이 한 단계 끌어올려졌다.",
          stats: { WP: 7, T: 6, WS: 5 },
          wounds: 12
        },
        fail: {
          text: "성난 기계령이 신경 접속구로 역전류를 쏟아내며 극심한 신경 화상을 입혔다. 아포세카리의 응급 처치를 받은 뒤에야 겨우 재동조를 마칠 수 있었다.",
          wounds: -18,
          stats: { Ag: -2, WP: 3 }
        }
      },
      {
        label: "[지성 판정] 병기창 장인들과 밤을 새워 고대 합금 부품의 도면을 대조하고 손상된 서보 관절을 정밀 복원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "대성전 시대의 정밀 공법을 되살려 마모된 동력 코어와 서보 모터를 완벽히 복구했다. 낡은 갑주가 다시금 전장의 살아 있는 성유물로 거듭났다.",
          stats: { Int: 6, BS: 5, Ag: 5, Inf: 5 }
        },
        fail: {
          text: "복원 도중 고대 동력 도관이 과열되어 손등에 화상을 입고, 결국 일부 장갑을 표준 신형 부품으로 임시 교체해야 했다.",
          wounds: -14,
          stats: { Inf: -2, Int: 2 }
        }
      },
      {
        label: "선대 형제들의 이름이 지워지지 않게 촛불 아래 조용히 닦아 낸 뒤, 표준 수복 의례에 따라 무구를 정비한다",
        effect: {
          text: "갑주 안쪽에 새겨진 이름들을 한 사람씩 묵념으로 불렀다. 이제 그대 또한 언젠가 후배에게 물려줄 살아 있는 유산의 일부다.",
          stats: { WP: 5, T: 4 },
          faith: 6
        }
      }
    ],
    source: "Codex: Space Marines / Deathwatch: Rites of Battle"
  },
  {
    id: "ev_s16_long_3",
    title: "초장수기 — 세 번째 황금 복무 못과 사라진 필멸의 이름",
    category: "초장수기",
    once: true,
    req: {
      minAge: 315,
      allTags: ["astartes", "battle_brother"],
      excludeTags: [
        "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "315세+ · 아스타르테스",
    weight: 36,
    text: "세 세기의 복무를 기리는 의식에서 아포세카리가 그대의 이마뼈에 세 번째 황금 복무 못을 단단히 박아 넣었다. 수술대의 차가운 금속 거울을 들여다보는 순간, 기묘한 정적이 찾아왔다. 진시드 시술을 받기 전 필멸자 소년이었던 시절의 고향 하늘과 목소리, 심지어 그때 불리던 본명조차 이제는 모래처럼 완전히 풍화되어 아무것도 떠오르지 않는다.",
    choices: [
      {
        label: "[채플린·아포세카리 전용] 챕터 서약록 앞에 무릎을 꿇고 필멸의 잔재를 내려놓은 뒤 형제들의 영혼과 진시드를 위한 봉헌 기도를 올린다",
        req: { anyTags: ["role_chaplain", "role_apothecary"] },
        effect: {
          text: "필멸자의 과거는 이미 오래전에 바쳐졌다. 이제 그대의 존재 이유는 오직 챕터의 신념과 유산을 다음 천 년으로 잇는 것뿐이다. 깊은 평온과 권위가 가슴을 채웠다.",
          stats: { WP: 5, Inf: 5, Fel: 3 },
          faith: 8
        }
      },
      {
        label: "[의지 판정] 사라져 버린 과거에 미련을 두지 않고 오직 황제의 무기이자 전투 형제로서의 정체성을 더욱 단단히 벼린다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "필멸자 소년은 300년 전에 이미 죽고 천사로 다시 태어났다. 일말의 흔들림도 없는 강철의 자아가 완성되며 세 번째 황금 못이 전장의 빛을 머금었다.",
          stats: { WP: 8, WS: 5, T: 5 },
          faith: 6
        },
        fail: {
          text: "억지로 과거를 지우려 할수록 이름 모를 잔상이 두통처럼 파고들어 시술 부위가 욱신거렸다. 며칠간 침묵의 명상실에 머물며 정신을 추슬러야 했다.",
          wounds: -12,
          stats: { WP: 3, Fel: -3 }
        }
      },
      {
        label: "[지성 판정] 챕터 징병 기록고로 내려가 300년 전 자신의 입단 서류를 열어 보며 잊힌 뿌리를 객관적 사료로 확인한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "바래진 양피지 위에서 낯선 타인처럼 적힌 어린 시절의 기록을 차분히 읽어 내려갔다. 그대가 어디에서 와서 무엇을 지키고 있는지 냉철한 시선으로 다시 정립했다.",
          stats: { Int: 7, Fel: 5, WP: 4 }
        },
        fail: {
          text: "수세기의 전란과 기록실 이전 과정에서 해당 연도의 신병 명부는 이미 소실되어 있었다. 빈 서가 앞에서 세월의 냉혹함을 실감하며 허탈한 발걸음을 돌렸다.",
          stats: { Fel: -3, WP: -2 }
        }
      },
      {
        label: "이마의 붉은 핏자국을 닦아 내고 거울을 덮은 채, 다음 출격을 준비하는 사격 훈련장으로 곧장 향한다",
        effect: {
          text: "과거의 이름이 무엇이었든 중요하지 않다. 그대는 지금 여기에 서 있는 황제의 전사이며, 그것으로 충분하다.",
          stats: { BS: 4, WS: 4, WP: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Service Studs / Dante"
  },
  {
    id: "ev_s16_long_4",
    title: "초장수기 — 두 세기 반의 간극, 네 번째 세대의 행성 총독",
    category: "초장수기",
    once: true,
    req: {
      minAge: 330,
      anyTags: ["astartes"],
      excludeTags: [
        "grey_knight", "custodes", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "330세+ · 아스타르테스",
    weight: 35,
    text: "중요 요새 성계의 방위 협약을 갱신하기 위해 총독부 대접견실에 들어섰다. 화려한 예복을 차려입고 경건히 머리를 숙이는 젊은 행성 총독의 얼굴에서, 그대는 두 세기 반 전 처음 이 방위선을 함께 짰던 초대 총독의 눈매를 발견했다. 필멸자의 가문이 네 번째 세대로 이어지며 왕조의 초상화가 벽면을 가득 채우는 동안, 그대는 여전히 같은 서약을 짊어진 채 이 자리에 서 있다.",
    choices: [
      {
        label: "[권위 판정] 두 세기 반 전 초대 총독과 맺었던 최초의 방위 서약을 직접 낭독하며 성계 십일조와 방공망을 즉각 정비시킨다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "살아 있는 역사의 증인이 읊어 내는 두 세기 반 전 조약 문구 앞에 총독과 원로원 전원이 숨을 죽이고 복종했다. 성계의 방위 체계가 단숨에 전시 수준으로 끌어올려졌다.",
          stats: { Inf: 8, Int: 5, WP: 4 }
        },
        fail: {
          text: "두 세기 반 동안 누적된 귀족 파벌의 이해관계와 관료주의가 예상보다 뿌리 깊었다. 강경한 압박 끝에 행정 마찰이 벌어져 협약 갱신이 지연되고 정치적 부담을 떠안았다.",
          stats: { Inf: -4, Fel: -2 }
        }
      },
      {
        label: "[교섭 판정] 긴장한 젊은 총독에게 선대 가주들이 위기 속에서 내렸던 현명한 결단들을 들려주며 통치의 무게를 일깨운다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "증조부와 조부의 육성을 직접 기억하는 초인의 조언에 젊은 총독이 깊은 감명을 받았다. 총독부가 자발적으로 군수 지원과 정찰망 협력을 대폭 확대했다.",
          stats: { Fel: 7, Inf: 7, WP: 4 },
          faith: 5
        },
        fail: {
          text: "세대 간의 아득한 간극과 초인의 냉엄한 화법 탓에 대화는 의례적인 침묵으로 굳어 버렸다. 협약은 체결되었으나 총독부와의 거리는 더욱 멀어졌다.",
          stats: { Fel: -3, Inf: -2 }
        }
      },
      {
        label: "필멸자 왕조의 흥망에 마음을 두지 않고, 방위 협약의 갱신 인장만 승인한 뒤 묵묵히 성계 순찰 임무로 복귀한다",
        effect: {
          text: "총독은 바뀌어도 요새 성계의 전략적 가치는 변하지 않는다. 시간의 흐름을 초월한 수호자의 시선으로 다시 별바다를 응시했다.",
          stats: { WP: 6, Int: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Lexicanum: Space Marines"
  },
  {
    id: "ev_s16_long_5",
    title: "초장수기 — 350세의 황혼, 납골당의 관과 바랜 깃발",
    category: "초장수기",
    once: true,
    req: {
      minAge: 350,
      anyTags: ["astartes", "custodes", "grey_knight"],
      excludeTags: [
        "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "350세+ · 초인",
    weight: 36,
    text: "서늘한 향 연기가 감도는 요새 수도원과 성소의 지하 납골당을 홀로 찾았다. 어둠 속에 길게 늘어선 석관들과 해진 전투 깃발마다, 세 세기 전 같은 전열에서 등을 맞대고 싸웠던 형제들의 이름이 새겨져 있다. 한때 어깨를 나란히 했던 동기들은 이제 모두 차가운 대리석 아래 잠들었고, 그 시대를 온전히 기억하는 자는 거대한 회랑에 오직 그대뿐이다.",
    choices: [
      {
        label: "[채플린 전용] 납골당 제단에 서서 세 세기 전 동기들의 영광을 기리는 장엄한 추모 연도를 봉헌한다",
        req: { anyTags: ["role_chaplain"] },
        effect: {
          text: "그대의 장중한 음성이 어두운 회랑 끝까지 울려 퍼지자, 뒤따라온 젊은 형제들이 일제히 무릎을 꿇었다. 떠난 동기들의 이름은 이제 새로운 세대의 전가로 영원히 살아남을 것이다.",
          stats: { WP: 5, Fel: 4, Inf: 5 },
          faith: 8
        }
      },
      {
        label: "[의지 판정] 끝없는 고독을 억누르고 모든 동기들의 이름과 마지막 전투를 빠짐없이 암송하며 서약을 갱신한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "수백 명의 이름 중 단 하나도 잊지 않고 끝까지 읊어 냈다. 먼저 떠난 형제들의 몫까지 짊어진 초인의 의지가 그 어떤 어둠도 꿰뚫을 반석으로 굳어졌다.",
          stats: { WP: 9, T: 5, Inf: 5 },
          faith: 8
        },
        fail: {
          text: "가장 아끼던 동기의 마지막 순간이 생생히 되살아나며 오래된 심신의 피로가 무겁게 덮쳐 왔다. 차가운 석관 앞에 선 채 한동안 발걸음을 떼지 못했다.",
          wounds: -14,
          stats: { WP: 3, Fel: -3 }
        }
      },
      {
        label: "[백병 판정] 해진 옛 중대 깃발 아래에 서서 세 세기 전 동기들과 연마했던 고대 백병전 전법을 되새기며 무기를 휘두른다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "공허한 회랑을 가르는 완벽한 일격 속에 옛 전우들의 호흡이 되살아났다. 세월이 흘러도 무디지 않은 무위의 정수가 몸에 더욱 깊이 새겨졌다.",
          stats: { WS: 7, Ag: 4, WP: 5 }
        },
        fail: {
          text: "세 세기 넘는 전투로 마모된 관절과 오래된 상흔이 격렬한 일격 도중 날카로운 통증을 일으켜 동작을 멈출 수밖에 없었다.",
          wounds: -16,
          stats: { Ag: -2, WS: 2 }
        }
      },
      {
        label: "동기들이 잠든 회랑과 바랜 깃발 앞에 짧은 묵념을 바친 뒤 무기고로 발걸음을 돌린다",
        effect: {
          text: "영면은 아직 그대의 몫이 아니다. 먼저 간 형제들이 지켜 낸 제국을 위해 오늘도 다시 전장으로 나아간다.",
          stats: { WP: 6, T: 4 },
          faith: 6
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Grey Knights / Dante"
  },
  {
    id: "ev_s16_long_6",
    title: "초장수기 — 4세기의 살아 있는 전설, 왜곡된 전술 교범",
    category: "초장수기",
    once: true,
    req: {
      minAge: 400,
      anyTags: ["astartes"],
      excludeTags: [
        "grey_knight", "custodes", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "400세+ · 아스타르테스",
    weight: 38,
    text: "합동 작전 참모부에서 제국 사관학교의 최신 전술 교범을 검토하던 중, 낯익은 행성 이름과 전투 도표가 눈에 들어왔다. 세 세기 반 전 그대가 처절한 진흙탕 속에서 가까스로 버텨 냈던 방어전이었다. 그러나 교범 속 기록은 실제의 참혹한 오판과 희생을 모두 지워 버린 채, '황제의 가호 아래 단 한 번의 영광스러운 돌격으로 대승을 거둔 기적의 모범 전술'로 왜곡되어 장교 후보생들에게 가르쳐지고 있었다.",
    choices: [
      {
        label: "[지성 판정] 사관학교 교관단과 참모본부에 직접 소견서를 보내, 보급 착오와 지형 함정을 포함한 실제 전훈을 교범에 반영시킨다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "4세기를 살아온 당사자의 생생한 지형 분석과 사상자 수치 앞에 참모부가 즉각 교범을 전면 개정했다. 헛된 신화에 속아 낭비될 수많은 미래 장병의 목숨을 미리 구해 냈다.",
          stats: { Int: 8, Inf: 8, WP: 5 }
        },
        fail: {
          text: "제국 선전국과 사관학교 편찬위원회는 황제의 천사가 보낸 소견서를 극진히 접수했으나, 교리 검증과 원로원 심의 절차를 명목으로 끝없는 행정 지연 속에 개정을 미루어 두었다. 두꺼운 관료주의의 벽 앞에서 씁쓸한 무력감만 남았다.",
          stats: { Inf: -4, Fel: -2 }
        }
      },
      {
        label: "[권위 판정] 성역 참모본부와 사관학교 원로 교관단 회의에 임석해 그날 전장의 진짜 무게를 증언하며 안일한 환상을 깨뜨린다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "4세기를 살아온 전설이 직접 들려준 피와 진흙의 증언 앞에 고위 장교단과 교관들이 일제히 자세를 고쳐 앉았다. 헛된 영광이 아니라 냉철한 대비가 승리를 만든다는 진리가 사관 교육의 기조로 자리 잡았다.",
          stats: { Inf: 8, Fel: 6, WP: 5 }
        },
        fail: {
          text: "교범의 신화를 권위의 기둥으로 삼아 온 원로 교관단은 겉으로만 정중히 고개를 숙였을 뿐, 완곡한 의례와 관례 절차를 내세워 실제 교과 개편을 끝내 미루었다. 회의는 차가운 정적 속에 끝맺었고 군부 내 미묘한 불화만 남았다.",
          stats: { Inf: -4, Fel: -2 }
        }
      },
      {
        label: "제국에는 때로 잔혹한 진실보다 빛나는 신화가 필요하다는 사실을 인정하고 교범의 기록을 조용히 덮어 둔다",
        effect: {
          text: "어차피 진짜 전장에 발을 들이면 누구나 스스로 진실을 깨닫게 된다. 4세기를 견뎌 온 전설은 말없이 전술 도표에서 시선을 거두었다.",
          stats: { WP: 7, Int: 4 }
        }
      }
    ],
    source: "Codex: Space Marines / Imperial Armour / Ciaphas Cain"
  },
  {
    id: "ev_s16_long_7",
    title: "고대인 의회 — 드레드노트 고대인의 역사 증언",
    category: "초장수기",
    once: true,
    req: {
      minAge: 150,
      allTags: ["dreadnought"],
      excludeTags: [
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "150세+ · 드레드노트 안치",
    weight: 38,
    text: "챕터 의회당에 모인 젊은 지휘관들과 채플린, 챕터 기록관들이 한 세기 전 치러진 피의 전역과 그 동맹 서약을 두고 거센 논쟁을 벌이고 있다. 챕터 역사서에는 당시 선대 지휘관이 오직 정면 돌파만으로 승리를 거두었다고 미화되어 있으나, 그날 진흙탕 속에서 치명상을 입고 강철 석관에 안치된 그대만은 실제로 벌어진 배신과 쓰라린 전술적 대가를 똑똑히 기억한다. 의회가 마침내 살아 있는 역사의 증인인 고대인에게 발언을 청했다.",
    choices: [
      {
        label: "[권위 판정] 복스 확성기를 울려 왜곡된 챕터 역사서의 허구를 정면으로 질타하고 그날의 참혹한 진실을 의회에 증언한다",
        check: { stat: "Inf", diff: -5 },
        success: {
          text: "수백 년을 살아온 고대인의 우레 같은 증언 앞에 의회당이 일순 숨을 죽였다. 중대장들은 헛된 자만을 접고 챕터 연대기를 바로잡았으며, 그대의 말 한마디가 다음 세기 전략의 기준이 되었다.",
          stats: { Inf: 9, WP: 6, Fel: 5 }
        },
        fail: {
          text: "챕터의 명예로운 신화를 수호하려는 보수파 채플린과 원로들이 진실의 공개 범위를 두고 거세게 맞섰다. 논쟁 끝에 기록은 밀실 서고에 봉인되었고 의회 내 냉기만 짙어졌다.",
          stats: { Inf: -4, Fel: -3 }
        }
      },
      {
        label: "[지성 판정] 석관 기억 장치에 저장된 당시의 전술 기록과 아군 피해 수치를 의회 투영기에 직접 연결해 냉철하게 분석한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "선명한 전술 기록과 지형 데이터가 의회당 허공에 펼쳐지자 모든 논쟁이 단숨에 정리되었다. 챕터 기록관들이 그대의 증언을 정식 비밀 주석으로 등재하며 깊은 경의를 바쳤다.",
          stats: { Int: 8, Inf: 7, WP: 5 }
        },
        fail: {
          text: "오래된 기억 회로를 의회 투영기에 무리하게 접속하다 신경 과부하가 일어나며 과거의 포화 환청이 쏟아졌다. 테크마린이 급히 연결을 끊을 때까지 격심한 고통을 견뎌야 했다.",
          wounds: -16,
          stats: { Int: 2, WP: -2 }
        }
      },
      {
        label: "화려한 전설 아래 묻힌 전우들의 이름을 하나씩 부르며, 오직 과오를 반복하지 말라는 짧은 경고만 남기고 침묵으로 돌아간다",
        effect: {
          text: "역사는 승자의 펜으로 윤색되지만, 강철 석관 속의 기억만큼은 거짓을 말하지 않는다. 젊은 중대장들이 말없이 고개를 숙이며 고대인의 경고를 가슴에 새겼다.",
          stats: { WP: 7, T: 4, Inf: 4 },
          faith: 6
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Space Wolves / Bjorn the Fell-Handed / The Emperor's Gift"
  },
  {
    id: "ev_s16_long_8",
    title: "최고 사령관의 2세기 고독 — 전사자 명부와 다음 세대의 유산",
    category: "초장수기",
    once: true,
    req: {
      minAge: 180,
      anyCareers: ["chapter_master", "gk_supreme_grand_master", "custodes_captain_general"],
      excludeTags: [
        "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "180세+ · 챕터 마스터 · 슈프림 그랜드 마스터 · 캡틴-제너럴",
    weight: 38,
    text: "모두가 잠들거나 순찰에 나선 깊은 밤, 최고 사령관 집무실의 성유 등불 아래 두꺼운 전사자 명부가 펼쳐져 있다. 두 세기에 가까운 복무와 최고 사령관 재임 기간 동안 그대의 지휘 아래 사지에 뛰어들어 돌아오지 못한 수백 명의 정예 전사들이 그 페이지마다 빼곡하다. 정상에 선 자의 고독은 그 누구와도 나눌 수 없으며, 언젠가 이 무거운 왕관과 검을 다음 세대에 넘겨줄 날 또한 다가오고 있다.",
    choices: [
      {
        label: "[권위 판정] 차기 지휘관 후보들을 집무실로 불러 전사자 명부의 무게를 직접 보여 주며 냉혹한 전략적 결단력을 전수한다",
        check: { stat: "Inf", diff: -10 },
        success: {
          text: "영광이 아니라 희생의 장부를 펼쳐 보인 그대의 가르침에 차세대 지휘관들이 깊은 각성을 얻었다. 그대가 떠난 뒤에도 흔들리지 않을 단단한 지휘 계보가 세워졌다.",
          stats: { Inf: 9, Fel: 6, WP: 6 }
        },
        fail: {
          text: "전사자 명부의 엄혹한 진실 앞에서 일부 젊은 지휘관들 사이에 전략 노선을 둘러싼 팽팽한 긴장이 일었다. 갈등을 봉합하느라 적잖은 정치적 대가를 치렀다.",
          stats: { Inf: -4, Fel: -3 }
        }
      },
      {
        label: "[지성 판정] 두 세기 동안 쌓아 올린 전술 비기와 은밀한 외교 약정, 비상 계획을 암호화된 후계자 유언서로 정리한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "수백 년의 혈전과 암투에서 얻어 낸 통찰이 한 치의 빈틈도 없이 집대성되었다. 이 기록은 향후 천 년간 조직을 지탱할 가장 귀중한 전략 자산이 될 것이다.",
          stats: { Int: 8, Inf: 7, WP: 5 }
        },
        fail: {
          text: "며칠 밤을 새우며 방대한 암호 기록을 정리하던 중 오래된 신경 과로가 겹쳐 깊은 피로에 시달렸고, 일부 민감한 비망록은 결국 파기해야 했다.",
          wounds: -12,
          stats: { Int: 3, Inf: -3 }
        }
      },
      {
        label: "새로 전사한 전사의 이름을 명부 맨 마지막 줄에 엄숙히 올린 뒤, 등불 아래 다시 홀로 내일의 전황 지도를 펼친다",
        effect: {
          text: "이 고독은 오직 정점에 선 자만이 감당해야 할 왕관의 무게다. 단 한 명의 이름도 가볍게 여기지 않겠다는 서약을 다시 가슴에 새겼다.",
          stats: { WP: 8, Int: 4 },
          faith: 8
        }
      }
    ],
    source: "Codex: Space Marines / Codex: Grey Knights / Codex: Adeptus Custodes / Dante"
  },
  {
    id: "ev_s16_long_9",
    title: "필멸자 초장수기의 한계 — 140년의 신경망과 흐려지는 목소리",
    category: "초장수기",
    once: true,
    req: {
      minAge: 140,
      anyTags: ["rejuvenat", "bionic", "magos", "fabricator_locum", "fabricator_general"],
      excludeHomeWorlds: ["krieg"],
      excludeTags: [
        "astartes", "custodes", "grey_knight", "dreadnought",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "140세+ · 필멸자 수명 연장 · 기계 의체",
    weight: 36,
    text: "반복된 수명 연장 시술과 겹겹이 덧붙인 기계 의체로 필멸자의 자연 수명을 아득히 넘어 140년을 버텨 냈다. 그러나 이제는 메디카에의 최고급 배양액조차 세포의 노화를 완전히 막지 못하고, 낡은 신경망 너머에서는 한 세기 전 함께 웃고 싸웠던 옛 지인들의 목소리가 잡음처럼 흐려져 간다. 더 깊은 기계 개조와 위험한 회춘 처치에 몸을 맡길 것인가, 아니면 인간으로 남은 마지막 감각을 붙들 것인가.",
    choices: [
      {
        label: "[기계교 고위직 전용] 쇠락한 생체 기억 피질을 성스러운 데이터 코어로 전이해 육신의 한계를 넘어선다",
        req: { anyTags: ["magos", "fabricator_locum", "fabricator_general"] },
        effect: {
          text: "썩어 가는 신경 다발 대신 순금 데이터 회로 속에 백사십 년의 지혜와 옛 목소리의 파형을 영구 보존했다. 강철은 쇠하지 않으며, 옴니시아의 연산은 멈추지 않는다.",
          stats: { Int: 7, T: 5, WP: 4, Fel: -3 },
          lifeBonusExtra: 25
        }
      },
      {
        label: "[강인 판정] 극한의 거부 반응을 버텨 내며 차세대 세포 재생과 신경 접합 보강 시술을 감행한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "뼈가 타는 듯한 고통을 이겨 내고 낡은 신경망과 장기가 다시 안정을 되찾았다! 흐려지던 시야가 또렷해지며 수십 년은 더 제국을 섬길 기력을 얻었다.",
          stats: { T: 7, WP: 5, Inf: 4 },
          wounds: 16,
          lifeBonusExtra: 20
        },
        fail: {
          text: "반복된 시술 탓에 혈관과 의체 접합부가 심한 거부 반응을 일으켰다. 간신히 고비는 넘겼으나 육신에 깊은 후유증이 남았다.",
          wounds: -20,
          stats: { T: -2, Ag: -2 }
        }
      },
      {
        label: "[의지 판정] 추가 개조를 멈추고 낡은 녹음 수정과 일지를 밤새 되새기며 옛 지인들의 목소리와 인간성을 끝까지 지켜 낸다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "차가운 기계 잡음 속에서도 한 세기 전 들었던 다정한 웃음소리를 끝내 되살려 냈다. 140년을 살면서도 끝까지 인간의 마음을 잃지 않은 그대의 눈빛에 깊은 품격이 서렸다.",
          stats: { WP: 8, Fel: 6 },
          faith: 8
        },
        fail: {
          text: "끝내 몇몇 소중한 얼굴의 윤곽은 잡음 너머로 흩어져 버렸다. 상실감에 밤새 잠을 이루지 못해 기력이 크게 쇠했다.",
          wounds: -10,
          stats: { WP: 2, Fel: -3 }
        }
      },
      {
        label: "무리한 연명과 과거의 집착을 모두 내려놓고, 현재의 신경 보철만 최소한으로 정비하며 남은 세월을 담담히 맞는다",
        effect: {
          text: "필멸자에게 140년은 이미 기적 같은 선물이다. 잡음 섞인 기억마저 세월의 훈장으로 받아들이며 조용히 호흡을 가다듬었다.",
          stats: { WP: 5, Int: 4 },
          wounds: 8
        }
      }
    ],
    source: "Lexicanum: Rejuvenat / Dark Heresy / Eisenhorn & Ravenor"
  },
  {
    id: "ev_s16_long_10",
    title: "황금 친위대의 결단 — 찰나의 지연과 황제의 눈 심사",
    category: "초장수기",
    once: true,
    req: {
      minAge: 220,
      anyTags: ["custodes"],
      excludeTags: [
        "dreadnought", "captain_general",
        "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince"
      ]
    },
    reqLabel: "220세+ · 아뎁투스 쿠스토데스",
    weight: 38,
    text: "두 세기가 넘도록 황금 옥좌의 불침번과 은하의 방패 역할을 수행해 왔다. 오늘 황궁 대련장에서 동료 쿠스토데스와 가디언 스피어를 맞부딪친 순간, 그대는 누구도 눈치채지 못할 찰나의 시간만큼 자신의 반격이 늦어졌음을 스스로 감지했다. 만 명의 수호자에게는 천 분의 일 초의 둔화마저 옥좌의 치명적 허점이다. 황금 갑주를 무기고에 봉납하고 은하 전역의 그림자 첩보망 '황제의 눈'으로 헌신할 것인지, 극한의 정진으로 완벽을 되찾을 것인지 스스로 심판할 시간이다.",
    choices: [
      {
        label: "[지성 판정] 황궁의 전열에 집착하지 않고, 그림자 첩보망 '황제의 눈'과 연계해 변방의 위협을 선제 차단하는 임무로 헌신한다",
        check: { stat: "Int", diff: -10 },
        success: {
          text: "황제의 눈 첩보망을 은밀히 지휘·연계하며 성계 너머의 감시망을 완벽히 장악했다. 테라를 노리던 이단과 외계인의 음모가 싹트기도 전에 뿌리 뽑혔고, 만 명의 동료들은 그림자 속에서도 멈추지 않는 그대의 헌신에 경의를 표했다.",
          stats: { Int: 9, Inf: 8, Fel: 6, Ag: 4 }
        },
        fail: {
          text: "변방 성계에 침투해 배후 조직을 추적하던 중 매복에 걸려 깊은 상처를 입었다. 핵심 경고문은 황궁으로 전송했으나 오랜 첩보 거점 하나를 잃어야 했다.",
          wounds: -18,
          stats: { Inf: -3, Int: 3 }
        }
      },
      {
        label: "[민첩 판정] 황궁 경비의 자리를 놓지 않은 채, 극한의 신경 재조율과 연속 실전 대련으로 찰나의 지연마저 완전히 극복한다",
        check: { stat: "Ag", diff: -10 },
        success: {
          text: "사흘 밤낮 쉬지 않고 이어진 극한의 대련 끝에 반응 속도의 미세한 오차를 완전히 지워 냈다! 황금 창날이 다시금 번개 같은 완벽함을 되찾으며 만 명의 동료들이 찬탄을 보냈다.",
          stats: { Ag: 8, WS: 8, T: 5, Inf: 6 }
        },
        fail: {
          text: "한계를 밀어붙인 무리한 연속 대련 끝에 미세한 근육 파열과 신경 과부하를 입어 수일간 연금술 치유실에 머물러야 했다. 그래도 현역의 의지만큼은 꺾이지 않았다.",
          wounds: -20,
          stats: { Ag: -2, WP: 4 }
        }
      },
      {
        label: "성급히 물러나거나 무리하지 않고, 황금 옥좌 앞 불침번의 규율을 더욱 엄격히 다지며 하루하루 자신의 한계를 냉정히 점검한다",
        effect: {
          text: "자신의 미세한 틈새를 스스로 직시할 줄 아는 절제야말로 쿠스토데스의 진정한 강함이다. 흔들리지 않는 평정심으로 다시 가디언 스피어를 고쳐 쥐었다.",
          stats: { WP: 7, WS: 4, Int: 4 },
          faith: 6
        }
      }
    ],
    source: "Codex: Adeptus Custodes / Lexicanum: Eyes of the Emperor"
  }
];
