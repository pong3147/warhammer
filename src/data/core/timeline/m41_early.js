// 역사 대사건 — M41 초중반 (139.M41~813.M41 · 고딕 전쟁 ~ 브락스 공성전, 11건)
// absYear: 139 = 139.M41, 240 = 240.M41, 755 = 755.M41, 813 = 813.M41
export const TIMELINE_M41_EARLY = [
  {
    id: "tl_gothic_war",
    year: 139,
    endYear: 151,
    title: "고딕 전쟁 — 제12차 블랙 크루세이드와 블랙스톤 요새",
    en: "The Gothic War (12th Black Crusade)",
    scope: "세그멘툼 옵스쿠루스 · 임페리얼 네이비 · 보이드본",
    dispatchScope: "galaxy",
    dispatchText: "약탈자 아바돈이 제12차 블랙 크루세이드를 일으켜 고딕 섹터를 침공하고 고대 병기 '블랙스톤 요새' 탈취에 나섰다! 배틀플리트 고딕 총사령관 코르넬리우스 폰 레이븐스버그 제독이 고립된 섹터에서 절체절명의 함대 결전을 벌이고 있다는 긴급 속보가 은하를 뒤흔든다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["obscurus"] },
        { anyWorlds: ["voidborn", "cadia"] },
        { anyTags: ["navy", "voidborn", "navigator", "rogue_trader", "militarum", "astartes"] }
      ]
    },
    characters: ["ravensburg"],
    summary: "139~151.M41 약탈자 아바돈이 고대 블랙스톤 요새를 노리고 고딕 섹터를 침공하자, 배틀플리트 고딕 총사령관 레이븐스버그 제독이 143.M41 게스세마네 대승으로 판세를 뒤집고 151.M41 신델가이스트 최종 결전에서 침공을 꺾었다.",
    text: "고딕 섹터를 감싼 사나운 워프 폭풍 속에 제국 본토의 지원이 끊겼다! 약탈자 아바돈의 카오스 함대가 고대 병기 블랙스톤 요새를 탈취해 고딕 섹터를 유린하자, 배틀플리트 고딕 총사령관 코르넬리우스 폰 레이븐스버그 제독이 남은 모든 제국 전함과 상선, 보이드본 승무원들에게 게스세마네에서 신델가이스트까지 이어질 결전의 집결령을 내렸다.",
    choices: [
      {
        label: "[사격 판정] 레이븐스버그 제독의 기함 편대에 합류해 게스세마네와 신델가이스트 함대 결전에 참전한다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: -8 },
        success: {
          text: "블랙스톤 요새의 파괴 광선과 카오스 순양함들의 포화를 뚫고 치명적 일제 사격을 꽂아 넣었다! 레이븐스버그 제독이 직접 훈장을 수여하며 고딕 전쟁의 불굴 용사로 기록했다.",
          stats: { BS: 6, WP: 6, Inf: 8 },
          faith: 8,
          align: { dogmatic: 6 },
          addTags: ["gothic_war_vet", "met_ravensburg", "met_abaddon"]
        },
        fail: {
          text: "감압된 선체 갑판에서 포격 파편에 중상을 입었으나, 제국 해군의 결사적 반격 끝에 아바돈의 함대가 워프로 물러나는 장면을 끝내 목격했다.",
          wounds: -24,
          stats: { T: 3, WP: 4 },
          addTags: ["gothic_war_vet", "met_ravensburg"]
        }
      },
      {
        label: "[교섭 판정] 봉쇄된 행성의 피난 수송선단을 규합해 워프 폭풍 틈새로 민간인 탈출로를 연다",
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "카오스 약탈선의 추격을 따돌리고 수십 척의 민간 피난선을 포트 모 항구로 인도했다! 절망에 빠졌던 고딕 섹터 난민들이 그대의 이름을 구원의 등불로 기렸다.",
          stats: { Fel: 6, Int: 4, Inf: 6 },
          align: { humane: 10 },
          addTags: ["gothic_war_vet", "macro_mercy_sanctuary", "met_ravensburg"]
        },
        fail: {
          text: "후미 수송선 몇 척을 잃는 뼈아픈 손실과 부상을 겪었으나, 끝까지 항로를 포기하지 않아 대다수 난민을 살려 냈다.",
          wounds: -18,
          stats: { WP: 4 },
          align: { humane: 6 },
          addTags: ["gothic_war_vet"]
        }
      },
      {
        label: "포트 모 조선소와 궤도 보급 기지에 남아 손상된 전함의 탄약과 장갑판 수복을 끝까지 뒷받침한다",
        effect: {
          text: "12년 전쟁 내내 꺼지지 않은 조선소 용접 불꽃 속에서 묵묵히 배틀플리트 고딕의 숨통을 이어 주었다.",
          stats: { Int: 4, T: 4, Inf: 4 },
          addTags: ["gothic_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Gothic War / Battlefleet Gothic Rulebook (139~151.M41)"
  },
  {
    id: "tl_eisenhorn_xenos",
    year: 240,
    endYear: 245,
    title: "스카루스 섹터 이단 심문 — 사루티와 네크로텍 음모",
    en: "Scarus Sector Heresy & Necroteuch Conspiracy",
    scope: "세그멘툼 옵스쿠루스 · 이단심문소 · 행정/치안",
    dispatchScope: "sector",
    dispatchSegmenta: ["obscurus", "solar", "pacificus"],
    dispatchText: "스카루스 섹터에서 외계 종족 사루티와 결탁한 금지 서적 '네크로텍' 밀수 사건이 적발되었다. 젊은 오르도 제노스 이단심문관 그레고르 아이젠혼이 대규모 추격전에 착수했다는 기밀 속보가 전해졌다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["obscurus"] },
        { anyTags: ["inquisition_agent", "inquisitor", "arbites", "administratum"] }
      ]
    },
    characters: ["eisenhorn"],
    summary: "240.M41 스카루스 섹터에서 외계 종족 사루티와 카오스 배교자들이 얽힌 '네크로텍' 음모가 발각되어 이단심문관 그레고르 아이젠혼이 추적에 나섰다.",
    text: "허브리스와 스카루스 섹터 전역에 이단심문소의 비상 봉쇄령이 떨어졌다. 이단 서적 '네크로텍'을 둘러싸고 배교 귀족과 외계 종족 사루티가 결탁했다는 첩보 속에, 오르도 제노스 이단심문관 그레고르 아이젠혼이 현지의 유능한 협력자를 찾고 있다.",
    choices: [
      {
        label: "[지성 판정] 아이젠혼의 심문 수사를 보조해 외계 유물 밀수선과 배교 귀족의 접선지를 밝혀낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "예리한 추리로 사루티 유물 은닉처를 찾아냈다! 그레고르 아이젠혼이 차분한 시선으로 그대의 공로를 치하하며 심문소 신임을 남겼다.",
          stats: { Int: 6, WP: 5, Inf: 8 },
          addTags: ["inquisition_favor", "met_eisenhorn"]
        },
        fail: {
          text: "배교자 암살단의 매복에 휘말려 큰 부상을 입었으나, 가까스로 입수한 암호 메모가 심문소 수사에 결정적 단서가 되었다.",
          wounds: -20,
          stats: { Int: 3, WP: 3 },
          addTags: ["met_eisenhorn"]
        }
      },
      {
        label: "구역 검문과 치안 유지를 맡아 이단 선동이 민간으로 번지지 않도록 차단한다",
        effect: {
          text: "소란스러운 비밀 전쟁의 바깥에서 묵묵히 질서를 지켰다. 스카루스 섹터는 끔찍한 이단 오염을 가까스로 피했다.",
          stats: { WP: 4, Inf: 4 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Gregor Eisenhorn / Eisenhorn: Xenos (240.M41)"
  },
  {
    id: "tl_weirdwaaagh_columnus",
    year: 260,
    endYear: 264,
    title: "콜룸누스 포지 월드 방어전 — '위어드와아아!' 대침공",
    en: "Battle for Columnus — The Weirdwaaagh!",
    scope: "포지 월드 · 세그멘툼 옵스쿠루스 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "광기 어린 오크 위어드보이 자그다카가 이끄는 '위어드와아아!'가 포지 월드 콜룸누스를 강타했다. 아이언 핸즈와 레이븐 가드 증원군 사이에 심각한 전술 균열이 벌어지며 제국 전역의 병참선에 비상이 걸렸다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["obscurus"] },
        { anyWorldTags: ["forge", "mechanicus"] },
        { anyTags: ["mechanicus", "astartes", "militarum", "navy"] }
      ]
    },
    characters: [],
    summary: "260.M41 오크 위어드보이 자그다카의 대침공이 포지 월드 콜룸누스를 덮쳤으며, 아이언 핸즈와 레이븐 가드 간의 비극적 마찰과 크리스토스 소회의의 도화선이 되었다.",
    text: "초록빛 와아아 번개가 포지 월드 콜룸누스의 궤도를 뒤덮었다! 기계교 방어군과 제국 원정대가 총동원되는 가운데, 아스타르테스 합동 지휘부 사이에서도 냉혹한 희생 전술을 둘러싼 날 선 갈등이 번지고 있다.",
    choices: [
      {
        label: "[사격 판정] 콜룸누스 외곽 용광로 방벽에 합류해 위어드보이의 사이킥 번개와 오크 돌격을 막아 낸다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: -5 },
        success: {
          text: "오크 사이커 무리의 집중 화력을 정면으로 뚫어 내며 포지 주 공장의 붕괴를 막아 냈다!",
          stats: { BS: 6, WP: 5, Inf: 6 }
        },
        fail: {
          text: "녹색 와아아 번개에 휘말려 큰 화상을 입고 후송되었으나, 방어선이 뚫리는 것만은 지연시켰다.",
          wounds: -22,
          stats: { T: 3, WP: 3 }
        }
      },
      {
        label: "전선 후방에서 포지 월드 보급품과 손상된 기갑 차량을 긴급 회수해 전력을 유지한다",
        effect: {
          text: "혼란스러운 합동 작전 속에서도 귀중한 병참 물자를 지켜 내며 실무 능력을 인정받았다.",
          stats: { Int: 5, T: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Battle for Columnus / Clan Raukaan (260.M41)"
  },
  {
    id: "tl_eisenhorn_malleus",
    year: 345,
    endYear: 348,
    title: "트라시안 프리마리스 대승전식 참사와 케루바엘 봉인",
    en: "Thracian Primaris Triumph & The Malleus Crisis",
    scope: "세그멘툼 옵스쿠루스 · 이단심문소 · 제국 전역",
    dispatchScope: "galaxy",
    dispatchText: "헬리칸 서브섹터 수도 트라시안 프리마리스의 대승전식 도중 33명의 알파급 포로 사이커가 탈출하는 대참사가 터졌다! 이단심문소 내부에서 청교도파와 급진파의 숙청 전쟁이 벌어지고 있다는 비보가 전해졌다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["obscurus"] },
        { anyTags: ["inquisition_agent", "inquisitor", "psyker", "arbites", "administratum", "met_eisenhorn"] }
      ]
    },
    characters: ["eisenhorn"],
    summary: "345.M41 트라시안 프리마리스 대승전식에서 알파급 사이커들이 풀려나 수많은 희생이 발생했고, 이단심문관 그레고르 아이젠혼은 금지된 데몬호스트 케루바엘을 다루며 급진의 길로 발을 디뎠다.",
    text: "승전 퍼레이드의 함성이 순식간에 지옥의 비명으로 뒤바뀌었다! 폭주한 알파급 사이커들이 수도 중심부를 초토화하는 가운데, 반역자로 몰린 이단심문관 그레고르 아이젠혼이 진범을 쫓아 금지된 경계선에 섰다는 기밀 전문이 날아들었다.",
    choices: [
      {
        label: "[의지 판정] 폭주하는 사이킥 폭풍 속에서 생존자 대피선을 지키고 심문소 내부 음모의 진실을 파헤친다",
        check: { stat: "WP", diff: -5 },
        success: {
          text: "아수라장 속에서도 이성을 지켜 수많은 시민을 구하고, 아이젠혼의 숨겨진 기록에 신뢰할 만한 협력자로 이름을 남겼다.",
          stats: { WP: 7, Int: 5, Inf: 7 },
          addTags: ["inquisition_favor", "met_eisenhorn"]
        },
        fail: {
          text: "사이킥 파동에 휘말려 정신적 내상을 입었으나, 가까스로 무너지는 광장에서 살아 나왔다.",
          wounds: -20,
          corruption: 6,
          addTags: ["met_eisenhorn"]
        }
      },
      {
        label: "이단심문소 내부 파벌 다툼에 끼어들지 않고 구역 계엄 유지와 잔해 수습에만 전념한다",
        effect: {
          text: "청교도파와 급진파의 피비린내 나는 숙청극에서 거리를 두고 제국 시민의 일상을 지켜 냈다.",
          stats: { WP: 5, T: 4 },
          faith: 5
        }
      }
    ],
    source: "Lexicanum: Eisenhorn: Malleus (345.M41)"
  },
  {
    id: "tl_macharian_crusade",
    year: 392,
    endYear: 399,
    title: "마카리우스 대성전 — 천 개 행성의 정복",
    en: "The Macharian Crusade",
    scope: "세그멘툼 파시피쿠스 · 제국 전역 징집",
    dispatchScope: "galaxy",
    dispatchText: "로드 솔라 마카리우스가 세그멘툼 파시피쿠스 서부 변경을 향해 대성전 이후 최대 규모의 원정을 선포했다. 불과 7년 만에 천 개에 가까운 행성이 제국의 품으로 수복되고 있다는 승전보가 은하를 뒤흔든다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["pacificus"] },
        { anyTags: ["militarum", "navy", "commissar", "officer", "astartes", "sororitas"] }
      ]
    },
    characters: ["macharius"],
    summary: "392~399.M41 로드 솔라 마카리우스가 대성전 이후 가장 위대한 정복 전쟁을 이끌며 은하 서부 변방의 천 개 행성을 수복했다.",
    text: "세그멘툼 파시피쿠스의 별빛 끝자락을 향해 거대한 성전 함대가 진격한다! 로드 솔라 마카리우스의 천재적 지휘 아래 인류제국의 깃발이 날마다 새로운 성계에 꽂히며 전 은하의 병력과 물자가 서부로 빨려 들어가고 있다.",
    choices: [
      {
        label: "[사격 판정] 마카리우스 대성전 선봉 연대에 합류해 서부 변경 해방전에 참전한다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: 0 },
        success: {
          text: "천 개 행성 정복의 역사적 진격에 몸을 실었다! 로드 솔라 마카리우스의 진군 사열 앞에서 직접 공훈을 인정받은 전설적 참전용사가 되었다.",
          stats: { BS: 6, WS: 4, WP: 5, Inf: 7 },
          faith: 8,
          align: { dogmatic: 5 },
          addTags: ["macharian_veteran", "met_macharius"]
        },
        fail: {
          text: "끝없이 이어지는 강행군과 변경 행성의 격렬한 저항에 깊은 상처를 입고 후송되었으나, 성전의 위대한 발자취와 마카리우스의 연설만은 가슴에 남았다.",
          wounds: -22,
          stats: { T: 3, WP: 3 },
          addTags: ["macharian_veteran", "met_macharius"]
        }
      },
      {
        label: "후방 병참 보급선과 점령지 행정 정비에 힘쓰며 거대한 원정을 뒷받침한다",
        effect: {
          text: "천 개 행성을 잇는 보급선이 끊기지 않도록 밤낮없이 장부와 수송선을 관리해 두터운 신임을 쌓았다.",
          stats: { Int: 5, Inf: 5 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: Macharian Crusade (392~399.M41)"
  },
  {
    id: "tl_first_armageddon_shame",
    year: 444,
    endYear: 446,
    title: "제1차 아마겟돈 전쟁과 수치의 달들 — 앙그론 격퇴와 숙청 갈등",
    en: "First War for Armageddon & The Months of Shame",
    scope: "아마겟돈 · 펜리스 · 세그멘툼 솔라 · 그레이 나이트 · 스페이스 울프",
    dispatchScope: "galaxy",
    dispatchText: "아마겟돈 행성에 데몬 프라이마크 앙그론과 월드 이터 대군이 강림했으나 그레이 나이트 제1형제단과 스페이스 울프의 사투 끝에 추방되었다! 그러나 직후 생존 시민과 병사들의 강제 불임 및 숙청을 둘러싸고 이단심문소와 로간 그림나르의 스페이스 울프가 무력 충돌 직전까지 치달았다는 극비 풍문이 돈다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anyWorlds: ["armageddon", "fenris"] },
        { anySegmenta: ["solar"] },
        { anyTags: ["militarum", "astartes", "grey_knight", "inquisitor", "inquisition_agent", "navy"] }
      ]
    },
    characters: ["grimnar"],
    summary: "444.M41 아마겟돈에서 데몬 프라이마크 앙그론이 격퇴된 직후, 오염 비밀을 지우려는 이단심문소의 대규모 숙청령과 무고한 생존자를 지키려는 로간 그림나르의 스페이스 울프가 정면 충돌한 '수치의 달들'이 벌어졌다.",
    text: "잿빛 화산재 아래 앙그론과 코른 악마 군단의 포효가 마침내 멎었다. 그러나 승전의 안도감은 하루도 가지 못했다. 오르도 말레우스 심문관 키스나로스가 아마겟돈 방어군과 수억 시민의 기억을 지우고 강제 수용·불임 처리하라는 숙청령을 내리자, 스페이스 울프의 그레이트 울프 로간 그림나르가 격노하며 늑대 함대로 피난 수송선들을 엄호하고 이단심문소 봉쇄선을 가로막고 나선 것이다!",
    choices: [
      {
        label: "[교섭 판정] 로간 그림나르와 스페이스 울프의 방패 아래 생존 장병과 피난 수송선의 탈출을 돕는다",
        req: { excludeTags: ["shame_purger"] },
        check: { stat: "Fel", diff: -8 },
        success: {
          text: "이단심문소 봉쇄선의 틈새로 수만 명의 아마겟돈 생존자를 빼돌렸다! 로간 그림나르가 묵직한 전사의 경례로 그대의 인간적 용기를 기렸으나, 심문소의 서늘한 눈초리가 따라붙었다.",
          stats: { Fel: 6, WP: 6, Inf: 5 },
          align: { humane: 12, dogmatic: -6 },
          addTags: ["shame_protector", "macro_mercy_sanctuary", "met_grimnar"]
        },
        fail: {
          text: "궤도 검문선과의 충돌 속에 부상을 입고 탈출선 일부를 잃었으나, 끝내 무고한 생존자들을 외면하지 않은 결단만은 꺾이지 않았다.",
          wounds: -20,
          stats: { WP: 4 },
          align: { humane: 8, dogmatic: -4 },
          addTags: ["shame_protector", "met_grimnar"]
        }
      },
      {
        label: "[의지 판정] 악마의 진실이 퍼지면 더 큰 파멸이 온다고 믿고 오르도 말레우스의 격리·숙청 작전을 집행한다",
        req: { excludeTags: ["shame_protector"] },
        check: { stat: "WP", diff: -6 },
        success: {
          text: "비명과 원망을 뒤로한 채 오염 의심 구역의 봉쇄와 기억 소거를 차갑게 완수했다. 이단심문소는 흔들림 없는 비밀 엄수를 높이 평가했으나, 손에 묻은 잿빛 죄책감은 지워지지 않았다.",
          stats: { WP: 6, Int: 4, Inf: 7 },
          faith: 6,
          align: { dogmatic: 12, humane: -6 },
          addTags: ["shame_purger", "inquisition_favor"]
        },
        fail: {
          text: "격렬한 반발과 스페이스 울프의 저지 기동 속에 큰 부상을 입고 임무를 마쳤다. 제국의 비밀을 지키는 대가는 참혹했다.",
          wounds: -18,
          stats: { WP: 3, Inf: 3 },
          align: { dogmatic: 8, humane: -4 },
          addTags: ["shame_purger"]
        }
      },
      {
        label: "두 거대 기관의 대립에서 한 발 물러서서 앙그론의 혈전으로 무너진 하이브의 생존 물자와 치안을 수습한다",
        effect: {
          text: "상공에서 전함들이 포문을 겨누는 살얼음판 같은 몇 달을 침묵 속에 버텨 내며, 폐허가 된 도시의 숨결만은 지켜 냈다.",
          stats: { WP: 5, T: 4 },
          faith: 4
        }
      }
    ],
    source: "Lexicanum: First War for Armageddon / Months of Shame / The Emperor's Gift (444.M41)"
  },
  {
    id: "tl_damocles_crusade",
    year: 742,
    endYear: 745,
    title: "다모클레스 만 성전 — 동부 변경 타우 제국과의 최초 전면전",
    en: "The Damocles Gulf Crusade",
    scope: "울티마 세그멘툼 · 동부 변경",
    dispatchScope: "galaxy",
    dispatchText: "울티마 세그멘툼 동부 변경에서 '대의'를 내세우며 제국 변경 행성을 잠식하던 신흥 외계 세력 '타우 제국'을 응징하기 위해 다모클레스 만 성전이 출정했다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["ultima"] },
        { anyTags: ["militarum", "navy", "astartes", "inquisitor", "inquisition_agent", "rogue_trader"] }
      ]
    },
    characters: [],
    summary: "742~745.M41 인류제국 성전군이 다모클레스 만을 건너 신흥 외계 세력 타우 제국과 최초로 전면 격돌했으나, 하이브 함대 베헤모스 내습 소식에 따라 급거 철수했다.",
    text: "동부 변경 다모클레스 만 너머 달리스 행성 상공에 제국 성전 함대가 진입했다. 백병전을 피한 채 초장거리 플라즈마 펄스 라이플과 기동형 크라이시스 배틀슈트로 교란전을 펼치는 신흥 외계 종족 타우의 전술에 제국 지휘부가 당혹감을 감추지 못하고 있다.",
    choices: [
      {
        label: "[사격 판정] 달리스 시가전의 치열한 플라즈마 화망을 뚫고 타우 배틀슈트 부대와 정면 격돌한다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: -5 },
        success: {
          text: "외계인의 첨단 광학 조준망을 연막과 중화기 일제 사격으로 분쇄했다! 동부 변경 최초 전면전의 산증인이 되었다.",
          stats: { BS: 6, Int: 4, WP: 5, Inf: 6 },
          addTags: ["damocles_veteran"]
        },
        fail: {
          text: "타우 레일건의 정밀 사격에 중상을 입었으나, 마침 울트라마 방면 비상 소집령이 떨어지며 철수 함대에 실려 생환했다.",
          wounds: -24,
          stats: { T: 3, Int: 2 },
          addTags: ["damocles_veteran"]
        }
      },
      {
        label: "노획한 타우 외계 교신기와 교리 선전문을 수거해 오르도 제노스 분석실에 보고한다",
        effect: {
          text: "총칼이 아닌 외교와 기술로 제국 변경을 유혹하는 타우의 위험성을 냉철히 분석해 높은 평가를 받았다.",
          stats: { Int: 6, WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Damocles Gulf Crusade (742~745.M41)"
  },
  {
    id: "tl_battle_of_macragge",
    year: 745,
    title: "제1차 타이라니드 전쟁 — 마크라그 전투와 하이브 함대 베헤모스",
    en: "First Tyrannic War — Battle for Macragge",
    scope: "마크라그 · 울티마 세그멘툼 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "은하계 바깥에서 도래한 미지의 외계 생체 군집 '타이라니드' 하이브 함대 베헤모스가 울트라마 수도 마크라그를 덮쳤다! 마르네우스 칼가와 울트라마린 제1중대의 결사 항전이 벌어지고 있다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anyWorlds: ["macragge"] },
        { anyChapters: ["ultramarines"] },
        { anySegmenta: ["ultima"] },
        { anyTags: ["astartes", "navy", "inquisitor"] }
      ]
    },
    characters: ["calgar"],
    summary: "745.M41 하이브 함대 베헤모스가 마크라그를 침공해 울트라마린 제1중대 전원이 극지 요새에서 옥쇄했으나, 도미누스 아스트라 함의 자폭으로 제국이 극적 승리를 거두었다.",
    text: "인류가 단 한 번도 마주한 적 없는 끔찍한 생체 괴수 무리가 마크라그의 하늘을 뒤덮었다! 아스트로패스들이 '워프의 그림자'에 짓눌려 비명을 지르는 가운데, 마르네우스 칼가가 북극과 남극 요새의 결사 방어를 명령한다.",
    choices: [
      {
        label: "[백병 판정] 마크라그 극지 요새 방어선에 합류해 베헤모스 생체 괴수 무리와 최후의 백병전을 벌인다",
        req: { minAge: 15 },
        check: { stat: "WS", diff: -10 },
        success: {
          text: "울트라마린 제1중대가 최후의 한 명까지 등을 맞대고 버틴 그 지옥에서 기적적으로 살아남았다! 마르네우스 칼가가 그대의 용맹을 직접 치하했다.",
          stats: { WS: 7, T: 5, WP: 7, Inf: 8 },
          wounds: -18,
          addTags: ["tyrannic_veteran", "met_calgar"]
        },
        fail: {
          text: "카니펙스의 충격에 치명상을 입고 얼음 참호에 묻혔으나, 궤도 기함 도미누스 아스트라의 자폭 섬광이 적 함대를 삼킨 뒤 극적으로 구조되었다.",
          wounds: -30,
          stats: { T: 4, WP: 4 },
          addTags: ["tyrannic_veteran"]
        }
      },
      {
        label: "궤도 방어 포대와 민간인 대피 벙커의 통신망을 끝까지 지켜 내며 화력 유도 좌표를 송신한다",
        effect: {
          text: "극심한 워프 잡음 속에서도 방어선 좌표를 지켜 낸 공로로 울트라마 행정부의 깊은 경의를 얻었다.",
          stats: { Int: 5, WP: 5, Inf: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Battle for Macragge / Codex: Tyranids (745.M41)"
  },
  {
    id: "tl_sabbat_crusade",
    year: 755,
    endYear: 775,
    title: "사바트 월드 대성전 — 파시피쿠스 해방전",
    en: "The Sabbat Worlds Crusade",
    scope: "세그멘툼 파시피쿠스",
    dispatchScope: "galaxy",
    dispatchText: "워마스터 슬레이도가 서부 파시피쿠스 성역에서 '사바트 월드 대성전'을 선포했다. 은하 전역에 대규모 십일조 징집과 군수 보급 명령이 하달되었다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anySegmenta: ["pacificus"] }, { anyTags: ["militarum", "navy", "commissar"] }]
    },
    characters: [],
    summary: "755.M41 워마스터 슬레이도의 선포로 개시된 사바트 월드 대성전이 마카로스 체제를 거쳐 카오스 점령지 해방을 위한 대규모 전선으로 이어지고 있다.",
    text: "은하 서부 파시피쿠스 성역 전역에 사바트 월드 대성전의 징집령과 군수 동원령이 울려 퍼진다. 수백 개의 아스트라 밀리타룸 연대와 제국 함대가 아콘의 카오스 군벌들로부터 사바트 성계를 되찾기 위해 끝없는 해방전에 투입되고 있다.",
    choices: [
      {
        label: "[사격 판정] 성전군 원정대에 자원하여 출정한다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: 0 },
        success: {
          text: "성전군 선봉에서 카오스 이단군과 격돌해 공훈을 세웠다! 훈장과 함께 실전 경험을 쌓았다.",
          stats: { BS: 5, WS: 4, WP: 4, Inf: 5 },
          faith: 6,
          addTags: ["sabbat_veteran"]
        },
        fail: {
          text: "포격이 빗발치는 교두보에서 간신히 목숨만 건진 채 후송되었다. 전쟁의 참혹함이 뼈에 새겨진다.",
          stats: { T: 2, WP: 2 },
          wounds: -22
        }
      },
      {
        label: "[지성 판정] 후방 군수 보급과 기도로 성전을 지원한다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "군수 물자 수송을 빈틈없이 처리해 행정부와 군부 양쪽의 신임을 얻었다.",
          stats: { Int: 4, Inf: 4 },
          faith: 4
        },
        fail: {
          text: "과중한 전쟁 십일조와 배급 축소로 극심한 피로가 누적되었다.",
          wounds: -10,
          stats: { T: -1 }
        }
      }
    ],
    source: "Lexicanum: Sabbat Worlds Crusade"
  },
  {
    id: "tl_tanith_fall",
    year: 765,
    exactYear: true,
    title: "타니스의 멸망과 '건트의 유령들'",
    en: "Destruction of Tanith",
    scope: "타니스 (행성 한정)",
    dispatchScope: "sector",
    dispatchSegmenta: ["pacificus", "solar", "obscurus", "tempestus"],
    dispatchText: "사바트 성역의 삼림 행성 타니스가 카오스 분견 함대의 기습 궤도 폭격으로 잿더미가 되었다. 이브람 건트 커미사르가 구출한 생존자 3,500명이 '타니스 퍼스트 앤드 온리'로 편성되었다고 전해진다.",
    infantEvacWorld: "generic_civilised",
    infantLog: "타니스의 하늘이 불타오르며 날우드 숲이 잿더미로 무너져 내리던 밤, 어린 몸으로 긴급 피난 수송선에 실려 겨우 궤도를 빠져나갔다. 사라진 고향의 기억은 흐릿한 불빛으로만 남았다.",
    filter: { minAge: 6, anyWorlds: ["tanith"] },
    characters: ["gaunt"],
    summary: "카오스 분견 함대가 타니스를 궤도 폭격으로 불태웠고, 커미사르 이브람 건트가 3,500여 명의 생존자를 구출했다.",
    text: "타니스 최초의 제국군 연대 창설식이 열리던 밤, 카오스 함대가 방어선을 뚫고 행성 궤도에 출현했다! 숲이 불바다로 변하는 가운데 대령-커미사르 이브람 건트가 수송선을 향해 소리친다. '탈출하라! 살아서 복수하라!'",
    choices: [
      {
        label: "[민첩 판정] 이브람 건트의 수송선에 몸을 싣고 '타니스 퍼스트 앤드 온리'에 합류한다",
        req: { minAge: 14, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "불타는 숲을 뚫고 마지막 수송선에 올라탔다! 고향은 잿더미가 되었으나 그대는 '건트의 유령들'의 일원이 되어 사바트 성전으로 떠난다.",
          stats: { Ag: 6, BS: 5, WP: 6 },
          forceCareer: "astra_militarum",
          moveWorld: "voidborn",
          addTags: ["tanith_ghost", "sabbat_veteran"]
        },
        fail: {
          text: "수송선 이륙 직전 궤도 포격의 충격파에 휩쓸렸으나 기적적으로 잔해 속에서 구조선에 건져졌다. 화상과 트라우마가 깊다.",
          wounds: -35,
          moveWorld: "generic_civilised",
          stats: { WP: 5 }
        }
      },
      {
        label: "[백병 판정 · 즉사 위험] 고향의 나무와 이웃을 지키며 끝까지 맞선다",
        req: { minAge: 14 },
        check: { stat: "WS", diff: -20 },
        success: {
          text: "기적적으로 카오스 강습정을 격퇴하고 민간인 탈출 포드에 올라 궤도를 벗어났다. 타니스의 마지막 증인이 되었다.",
          stats: { WS: 8, WP: 10, Inf: 6 },
          wounds: -30,
          moveWorld: "generic_civilised",
          addTags: ["tanith_survivor"]
        },
        fail: {
          text: "타니스의 하늘이 불타오르며 행성 지표 전체가 유리처럼 녹아내렸다. 그대는 고향의 숲과 운명을 함께했다.",
          instantDeath: "765.M41 카오스 함대의 타니스 궤도 폭격으로 고향과 함께 산화"
        }
      },
      {
        label: "긴급 피난 수송선에 몸을 싣고 불타는 타니스 궤도를 탈출한다",
        effect: {
          text: "화염에 잠긴 날우드 숲을 뒤로한 채 간신히 궤도를 벗어났다. 사라진 고향의 기억이 평생 가슴에 잿빛으로 남는다.",
          wounds: -14,
          stats: { WP: 4, Ag: 2 },
          moveWorld: "generic_civilised",
          addTags: ["tanith_survivor"]
        }
      }
    ],
    source: "Lexicanum: Tanith / Gaunt's Ghosts: First and Only"
  },
  {
    id: "tl_vraks_siege",
    year: 813,
    endYear: 830,
    title: "브락스 무기고 행성 공성전",
    en: "Siege of Vraks",
    scope: "크리그 · 아스트라 밀리타룸 · 이단심문소",
    dispatchScope: "galaxy",
    dispatchText: "배교자 추기경 자판이 무기고 행성 브락스에서 반란을 일으켰다. 데스 코어 오브 크리그 수백만 명이 투입되어 끝없는 참호 공성전이 시작되었다는 전황이 들려왔다.",
    filter: {
      minAge: 16,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anyWorlds: ["krieg"] }, { anyTags: ["militarum", "inquisition_agent", "inquisitor", "sororitas"] }]
    },
    characters: [],
    summary: "배교자 추기경 자판이 점거한 요새 행성 브락스를 되찾기 위해 데스 코어 오브 크리그가 17년에 걸친 지옥의 참호전을 개시했다.",
    text: "거대한 제국 무기고 행성 브락스가 반역에 물들었다. 1,400만 명의 데스 코어 오브 크리그와 수많은 심문소 요원들이 독가스와 참호, 카오스 악마가 들끓는 17년의 공성전으로 투입된다.",
    choices: [
      {
        label: "[강인 판정] 최전선 참호와 독가스 지대를 돌파한다",
        check: { stat: "T", diff: -5 },
        success: {
          text: "수년간의 포격과 역병을 견디고 요새 외곽을 함락시켰다. 진흙과 피 속에서 강철 같은 생존력을 얻었다.",
          stats: { T: 6, WS: 4, WP: 5, Inf: 4 },
          faith: 5,
          addTags: ["vraks_veteran"]
        },
        fail: {
          text: "너글의 부패 독가스와 중포격에 중상을 입고 야전 병원으로 실려 갔다.",
          wounds: -28,
          corruption: 8,
          stats: { T: 2 }
        }
      },
      {
        label: "[의지 판정] 배후의 카오스 의식을 추적해 정화한다",
        req: { stats: { WP: 40 } },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "오르도 말레우스 요원들과 공조해 악마 소환진을 파괴했다! 이단심문소의 주목을 받았다.",
          stats: { WP: 6, Int: 5, Inf: 8 },
          faith: 10,
          addTags: ["inquisition_favor", "vraks_veteran"]
        },
        fail: {
          text: "악마의 포효가 정신을 할퀴었다. 간신히 살아남았으나 귓가에 워프의 잔향이 남았다.",
          wounds: -18,
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Siege of Vraks / Imperial Armour Vol. 5-7"
  }
];
