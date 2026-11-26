// absYear: 139 = 139.M41, 240 = 240.M41, 755 = 755.M41, 999 = 999.M41, 1000 = 000.M42, 1001 = 001.M42
export const TIMELINE = [
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
    characters: ["ravensburg", "abaddon"],
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
    title: "사바트 월드 성전 선포",
    en: "Launch of the Sabbat Worlds Crusade",
    scope: "세그멘툼 파시피쿠스",
    dispatchScope: "galaxy",
    dispatchText: "워마스터 슬레이도가 서부 파시피쿠스 성역에서 '사바트 월드 대성전'을 선포했다. 은하 전역에 대규모 십일조 징집과 군수 보급 명령이 하달되었다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anySegmenta: ["pacificus"] }, { anyTags: ["militarum", "navy", "commissar"] }]
    },
    characters: [],
    summary: "워마스터 슬레이도가 카오스에 점령된 사바트 성계를 해방하기 위해 백만 대군의 성전을 선포했다.",
    text: "은하 서부 파시피쿠스 성역 전역에 성전 징집령이 울려 퍼진다. 수백 개의 아스트라 밀리타룸 연대와 해군 함대가 카오스 군벌들의 손아귀에서 사바트 월드를 되찾기 위해 집결하고 있다.",
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
    filter: { anyWorlds: ["tanith"] },
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
    title: "브락스 무기고 행성 공성전 개전",
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
  },
  {
    id: "tl_badab_war",
    year: 901,
    title: "바답 전쟁 발발 — 마엘스트롬의 반역",
    en: "Outbreak of the Badab War",
    scope: "울티마 세그멘툼 · 아스타르테스 · 해군",
    dispatchScope: "galaxy",
    dispatchText: "울티마 성역 마엘스트롬의 아스트랄 클로 챕터가 제국 십일조를 거부하고 반란을 일으켰다. 호루스 헤러시 이후 최대의 스페이스 마린 내전 '바답 전쟁'이 발발했다.",
    filter: {
      minAge: 16,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anySegmenta: ["ultima"] }, { anyTags: ["astartes", "navy", "inquisitor", "inquisition_agent"] }]
    },
    characters: [],
    summary: "아스트랄 클로의 챕터 마스터 루프트 휴론이 제국 십일조를 거부하며 호루스 헤러시 이후 최대의 스페이스 마린 내전이 터졌다.",
    text: "바답의 폭군 루프트 휴론이 반기를 들었다! 제국 충성파 스페이스 마린 챕터들과 해군 함대가 마엘스트롬 성역으로 집결하며 동족 상잔의 참극이 막을 올린다.",
    choices: [
      {
        label: "[백병 판정] 충성파 원정군에 합류해 반역파 함대를 격파한다",
        check: { stat: "WS", diff: -5 },
        success: {
          text: "잔혹한 함선 백병전 끝에 바답 방어선을 뚫고 큰 전공을 세웠다.",
          stats: { WS: 6, BS: 4, Inf: 7, WP: 4 },
          addTags: ["badab_veteran"]
        },
        fail: {
          text: "아스트랄 클로의 매복 공격에 휘말려 심각한 부상을 입었다.",
          wounds: -26,
          stats: { T: 3 }
        }
      },
      {
        label: "[교섭 판정] 내전의 참상 속에서 보급과 정치적 입지를 다진다",
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "하이 로드들의 칙령을 대행해 물자를 배분하며 막대한 인맥과 영향력을 쌓았다.",
          stats: { Inf: 9, Fel: 4, Int: 3 }
        },
        fail: {
          text: "이단심문소의 감시망에 의심을 사 한동안 심문을 받아야 했다.",
          stats: { Inf: -5 },
          wounds: -8
        }
      }
    ],
    source: "Lexicanum: Badab War / Imperial Armour Vol. 9-10"
  },
  {
    id: "tl_cain_valhalla",
    year: 931,
    title: "발할라 제597연대와 커미사르 케인의 '우연한 영웅담'",
    en: "Ciaphas Cain & the Valhallan 597th",
    scope: "발할라 · 아스트라 밀리타룸 · 커미사르",
    dispatchScope: "galaxy",
    dispatchText: "제국 선전 홀로비드가 '제국의 영웅' 카이아파스 케인 커미사르와 새로 통합 창설된 발할라 제597연대가 또다시 압도적 외계인 침공을 분쇄했다는 영웅담을 대대적으로 방송했다.",
    filter: {
      minAge: 16,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anyWorlds: ["valhalla"] }, { anyTags: ["militarum", "commissar", "inquisition_agent"] }]
    },
    characters: ["cain", "amberley_vail"],
    summary: "931.M41 창설된 발할라 제597연대와 커미사르 카이아파스 케인이 지휘하는 그라발락스 전선에 합류했다. 어째서인지 가장 안전한 후방 정찰로를 택했는데 진스틸러 소굴이 튀어나왔다.",
    text: "훈장 가득한 커미사르 카이아파스 케인이 특유의 여유로운 미소로 '후방 안전 점검'을 명했다. 하지만 그의 묘하게 불운한 직감대로, 조용해야 할 지하 수로에서 진스틸러 컬트 매복 부대가 쏟아져 나왔다!",
    choices: [
      {
        label: "[민첩 판정] 케인 커미사르의 옆에서 체인소드와 라스건으로 돌파구를 연다",
        check: { stat: "Ag", diff: 5 },
        success: {
          text: "케인과 그의 부관 유르겐의 멜타건 세례 덕분에 컬트 수장을 처치했다! 케인이 '진정한 제국의 영웅'이라며 타나 차 한 잔을 권했다.",
          stats: { Ag: 5, WS: 4, Inf: 7, Fel: 5 },
          addTags: ["met_cain"]
        },
        fail: {
          text: "진스틸러의 발톱에 스쳐 중상을 입었지만, 부관 유르겐의 기묘한 위압감과 멜타 화력 덕에 살아 돌아왔다.",
          wounds: -20,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 이것이 더 큰 이단 음모의 일부임을 파악해 보고한다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "전선에 동행하던 오르도 제노스 이단심문관 앰벌리 베일의 눈에 띄어 높은 평가를 받았다!",
          stats: { Int: 6, Inf: 8 },
          addTags: ["inquisition_favor", "met_cain"]
        },
        fail: {
          text: "서류를 정리하다가 기습당한 탓에 타박상을 입었으나 어찌어찌 임무는 완수했다.",
          wounds: -10,
          stats: { Int: 2 }
        }
      }
    ],
    source: "Lexicanum: Ciaphas Cain / For the Emperor"
  },
  {
    id: "tl_armageddon_2",
    year: 941,
    title: "제2차 아마겟돈 전쟁 — 가즈쿨의 대침공",
    en: "Second War for Armageddon",
    scope: "아마겟돈 · 제국군",
    dispatchScope: "galaxy",
    dispatchText: "세그멘툼 솔라의 핵심 공업 행성 아마겟돈에 오크 대군주 가즈쿨 스라카의 와아아!가 상륙했다. 세바스찬 야릭 커미사르와 블러드 엔젤 단테가 하데스 하이브에서 결사항전 중이라는 소식이 전해졌다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anyWorlds: ["armageddon"] }, { anyTags: ["militarum", "commissar", "astartes"] }]
    },
    characters: ["yarrick", "dante", "ghazghkull"],
    summary: "오크 대군주 가즈쿨 스라카가 아마겟돈을 침공했다. 커미사르 세바스찬 야릭과 블러드 엔젤 사령관 단테가 하데스 하이브에서 결사항전을 벌인다.",
    text: "잿빛 하늘이 녹색 유성우로 뒤덮였다! 가즈쿨 막 우룩 스라카의 와아아! 대군이 아마겟돈에 강림했다. 하데스 하이브 성벽 위에서 기계 의안을 번뜩이며 커미사르 세바스찬 야릭이 외친다. '한 발짝도 물러서지 마라!'",
    choices: [
      {
        label: "[사격 판정] 야릭 커미사르 휘하에서 하데스 하이브 성벽을 사수한다",
        req: { minAge: 14 },
        check: { stat: "BS", diff: -5 },
        success: {
          text: "오크 보이즈의 파도를 라스건과 볼터 세례로 꺾어 놓았다! 전투 후 야릭 커미사르가 그대의 어깨를 두드리며 용맹을 치하했다.",
          stats: { BS: 6, WP: 7, Inf: 8, T: 3 },
          faith: 10,
          addTags: ["armageddon_hero", "met_yarrick"]
        },
        fail: {
          text: "오크 노브의 초파에 베여 쓰러졌으나, 하늘에서 강하한 단테와 블러드 엔젤의 구원으로 겨우 목숨을 건졌다.",
          wounds: -30,
          stats: { T: 3, WP: 4 },
          addTags: ["met_dante"]
        }
      },
      {
        label: "[지성 판정] 붕괴하는 하이브 하층에서 피난민과 군수 공장을 지켜 낸다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "무너진 지하 통로를 개척해 수만 명의 시민과 탄약고를 구해 냈다. 훗날 스틸 리전의 전설로 남을 활약이었다.",
          stats: { Int: 6, Fel: 5, Inf: 6 },
          faith: 5
        },
        fail: {
          text: "오크 스톰보이즈의 기습으로 대피소가 아수라장이 되며 큰 상처를 입었다.",
          wounds: -22
        }
      }
    ],
    source: "Lexicanum: Second War for Armageddon / Codex: Armageddon"
  },
  {
    id: "tl_second_tyranic",
    year: 992,
    endYear: 993,
    title: "제2차 타이라니드 전쟁 — 하이브 함대 크라켄의 동부 대침공",
    en: "Second Tyrannic War — Hive Fleet Kraken",
    scope: "울티마 세그멘툼 · 은하 동부 전역",
    dispatchScope: "galaxy",
    dispatchText: "하이브 함대 베헤모스보다 훨씬 거대하고 교활한 신형 타이라니드 '하이브 함대 크라켄'이 은하 동부 변경을 수많은 촉수로 갈라 덮쳤다! 이카르 IV와 크래프트월드 이얀덴까지 피바다가 되었다는 긴급 속보가 울렸다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["ultima"] },
        { anyTags: ["militarum", "astartes", "navy", "inquisitor", "inquisition_agent", "sororitas"] }
      ]
    },
    characters: ["calgar"],
    summary: "992~993.M41 하이브 함대 크라켄이 동부 변경을 분산 침공해 수많은 성계를 집어삼켰으며, 이카르 IV 전투에서 인류제국이 처절한 대가 끝에 크라켄의 주력을 꺾었다.",
    text: "은하 동부 수십 개 성계의 아스트로패스 통신이 동시에 끊겼다! '하이브 함대 크라켄'의 생체 함선들이 떼를 지어 행성 궤도를 뒤덮고, 이카르 IV 전선에서 마르네우스 칼가와 제국 연합군이 필사의 저지선을 치고 있다.",
    choices: [
      {
        label: "[사격 판정] 이카르 IV 방어선에 투입되어 끝없이 밀려드는 호마건트와 카니펙스 물결을 저지한다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: -5 },
        success: {
          text: "소화기와 중화기가 녹아내릴 때까지 방아쇠를 당겨 시냅스 지휘 개체를 쓰러뜨렸다! 크라켄의 심장을 꺾은 베테랑으로 기록되었다.",
          stats: { BS: 7, WP: 5, Inf: 7 },
          addTags: ["tyrannic_veteran", "met_calgar"]
        },
        fail: {
          text: "산성 생체탄에 중상을 입고 야전 병원으로 후송되었으나, 끝내 방어선이 버텨 냈다는 소식을 들었다.",
          wounds: -24,
          stats: { T: 4 },
          addTags: ["tyrannic_veteran"]
        }
      },
      {
        label: "전선 배후에서 행성 생체 오염 검역과 피난선 보급망을 지켜 내며 2차 확산을 막는다",
        effect: {
          text: "숨어든 진스틸러 선봉대를 색출해 피난 함대의 안전을 지켜 냈다.",
          stats: { Int: 5, WP: 4, Inf: 4 }
        }
      }
    ],
    source: "Lexicanum: Second Tyrannic War / Battle of Ichar IV (992~993.M41)"
  },
  {
    id: "tl_third_tyranic",
    year: 997,
    endYear: 998,
    title: "제3차 타이라니드 전쟁 — 레비아탄과 크립트만의 방화선",
    en: "Third Tyrannic War & Kryptman's Gambit",
    scope: "은하계 전역 · 템페스투스 · 울티마",
    dispatchScope: "galaxy",
    dispatchText: "은하 평면 아래에서 거대한 두 가닥 촉수로 솟구친 하이브 함대 레비아탄이 인류제국의 복부를 찔러 들어왔다! 이단심문관 피두스 크립트만은 외계 포식자를 굶겨 죽이겠다며 아직 살아 있는 수십 개 제국 행성에 초토화 익스터미나투스 방화선을 선포했다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["tempestus", "ultima"] },
        { anyTags: ["militarum", "astartes", "navy", "inquisitor", "inquisition_agent", "sororitas", "navigator", "imperial_knight"] }
      ]
    },
    characters: ["kryptman"],
    summary: "997.M41 하이브 함대 레비아탄이 은하 평면 아래에서 내습하자, 오르도 제노스 이단심문관 피두스 크립트만이 타이라니드의 생체 질량을 차단하기 위해 수십 개 제국 행성을 스스로 소각하는 은하 방화선을 강행했다.",
    text: "성계 관측망에 은하 평면 아래에서 솟구치는 거대한 생체 함대의 그림자가 가득 찼다. 오르도 제노스 이단심문관 피두스 크립트만이 차가운 음성으로 통첩을 내린다. 타이라니드 하이브 함대 레비아탄의 진로에 놓인 거주 행성 수십 곳을 아예 궤도에서 소각해 굶겨 죽여야만 수천억의 후방을 살릴 수 있다는 것이다.",
    choices: [
      {
        label: "[의지 판정] 크립트만의 방화선 집행 함대에 합류해 궤도 소각 명령을 완수한다",
        req: { minAge: 15 },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "불타는 행성들의 비명을 통신 너머로 삼키며 레비아탄의 진군 속도를 늦추는 데 성공했다. 피두스 크립트만은 차가운 시선으로 그대의 냉철함을 기록했고, 지워지지 않는 잿빛 낙인이 가슴에 남았다.",
          stats: { WP: 6, Int: 4, Inf: 8 },
          align: { ruthless: 8, dogmatic: 5 },
          addTags: ["kryptman_cordon_vet", "macro_exterminatus_scar", "met_kryptman"]
        },
        fail: {
          text: "포격 직전 궤도로 치솟은 타이라니드 생체탄과 반란 방어포의 역습에 크게 다쳤다. 잿더미가 된 행성만 눈앞에 남았다.",
          wounds: -24,
          stats: { WP: 3 },
          align: { ruthless: 5, dogmatic: 3 },
          addTags: ["kryptman_cordon_vet", "macro_exterminatus_scar"]
        }
      },
      {
        label: "[교섭 판정] 소각 직전까지 수송선단을 밀어 넣어 단 한 척이라도 더 피난민을 구출한다",
        req: { minAge: 15 },
        check: { stat: "Fel", diff: -5 },
        success: {
          text: "이단심문소의 봉쇄 경고를 무릅쓰고 화염이 대기를 덮기 직전까지 피난선을 띄워 수만 명의 목숨을 건져 냈다! 크립트만의 경고를 샀으나, 살아남은 이들이 그대의 이름을 기억한다.",
          stats: { Fel: 6, WP: 5, Inf: 6 },
          faith: 8,
          align: { humane: 8 },
          addTags: ["kryptman_cordon_vet", "macro_mercy_sanctuary", "met_kryptman"]
        },
        fail: {
          text: "진스틸러가 섞여 든 피난선과의 충돌과 궤도 포화 속에서 중상을 입었으나 끝내 몇 척의 수송선은 안전 지대로 보냈다.",
          wounds: -26,
          stats: { T: 3 },
          align: { humane: 6 },
          addTags: ["kryptman_cordon_vet", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "후방 방화선 외곽의 검역 궤도와 보급 중계 기지를 사수하며 타이라니드 척후대를 차단한다",
        effect: {
          text: "불타는 전선 너머로 쏟아지는 포자와 척후 생체함을 요격하며 후방 항로를 지켜 냈다.",
          stats: { BS: 4, Int: 4, WP: 4 },
          align: { dogmatic: 4 },
          addTags: ["kryptman_cordon_vet"]
        }
      }
    ],
    source: "Lexicanum: Third Tyrannic War / Fidus Kryptman (997.M41)"
  },
  {
    id: "tl_armageddon_3",
    year: 998,
    title: "제3차 아마겟돈 전쟁 — 잿빛 행성의 총력전",
    en: "Third War for Armageddon",
    scope: "아마겟돈 · 제국군 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "가즈쿨 스라카가 전보다 몇 배나 거대한 오크 대함대로 아마겟돈을 재침공했다! 제국 전역의 군단과 20여 개 스페이스 마린 챕터, 블랙 템플러와 샐러맨더가 아마겟돈 전선으로 총동원되고 있다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anyWorlds: ["armageddon"] }, { anyTags: ["militarum", "astartes", "sororitas", "commissar"] }]
    },
    characters: ["yarrick", "tushan", "grimaldus", "ghazghkull"],
    summary: "가즈쿨 스라카가 이전보다 몇 배나 거대한 오크 대함대로 아마겟돈을 재침공했다. 노장 야릭, 샐러맨더 챕터 마스터 투샨, 블랙 템플러 수석 채플린 그리말두스가 맞선다.",
    text: "아마겟돈 전역이 다시 불길에 휩싸였다! 20여 개 스페이스 마린 챕터와 수백만 가드맨이 행성 전역의 하이브에서 사투를 벌인다. 녹턴에서 달려온 샐러맨더 챕터 마스터 투샨이 민간인 대피선 앞에서 방패를 세운다.",
    choices: [
      {
        label: "[백병 판정] 샐러맨더와 함께 오크 가간트의 진격을 저지한다",
        req: { minAge: 15 },
        check: { stat: "WS", diff: -5 },
        success: {
          text: "화염과 볼터의 장벽 속에서 수천의 민간인을 지켜 냈다! 투샨이 그대의 희생정신에 경의를 표했다.",
          stats: { WS: 6, T: 5, WP: 6, Inf: 7 },
          faith: 10,
          addTags: ["armageddon_3_vet", "met_tushan"]
        },
        fail: {
          text: "오크 스톰파의 포격에 휘말려 사경을 헤맸으나 의무대의 극진한 치료로 되살아났다.",
          wounds: -32,
          stats: { T: 3 }
        }
      },
      {
        label: "[사격 판정] 스틸 리전 기계화 사단과 함께 잿빛 평원 기갑전을 치른다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: 0 },
        success: {
          text: "키메라 장갑차와 리만 러스 전차의 포화로 오크 배틀왜건 부대를 섬멸했다!",
          stats: { BS: 6, Int: 4, Inf: 5 },
          addTags: ["armageddon_3_vet"]
        },
        fail: {
          text: "전차 피격으로 탈출하던 중 심한 화상을 입었다.",
          wounds: -25
        }
      },
      {
        label: "[강인 판정] 지하 하이브 방공호로 대피해 샐러맨더의 엄호 아래 버텨 낸다",
        check: { stat: "T", diff: 5 },
        success: {
          text: "잿빛 폭격 속에서도 무사히 대피소를 지켜 냈다. 샐러맨더 병사가 나눠 준 식량과 격려가 평생의 기억으로 남았다.",
          stats: { T: 3, WP: 4 },
          faith: 5,
          addTags: ["met_tushan"]
        },
        fail: {
          text: "방공호 붕괴로 잔해에 깔려 부상을 입었으나 기적적으로 구조되었다.",
          wounds: -20
        }
      }
    ],
    source: "Lexicanum: Third War for Armageddon"
  },
  {
    id: "tl_fall_of_cadia",
    year: 999,
    exactYear: true,
    title: "제13차 블랙 크루세이드 — 카디아의 붕괴",
    en: "The Fall of Cadia",
    scope: "카디아 (행성 한정 · 필수 역사 격변)",
    dispatchScope: "galaxy",
    dispatchText: "아스트로패스 합창대가 피를 토하며 참혹한 비보를 전했다. 공포의 눈을 막아 서던 요새 행성 '카디아'가 약탈자 아바돈의 블랙스톤 요새 충돌로 산산조각 났다고 한다. 카디아는 부서졌으나 가드는 굴복하지 않았다.",
    filter: { anyWorlds: ["cadia"] },
    characters: ["creed", "celestine", "cawl", "abaddon"],
    summary: "약탈자 아바돈이 파괴된 블랙스톤 요새를 카디아 지표에 추락시켰다. 행성이 갈라지는 순간까지 가드는 무너지지 않았다.",
    text: "공포의 눈에서 쏟아진 카오스 대군이 카디아를 덮쳤다! 하늘에 황금 날개를 펼친 성녀 셀레스틴이 강림하고, 아크마고스 카울이 고대 파일런을 가동하려 분투하는 사이… 약탈자 아바돈이 거대한 블랙스톤 요새의 잔해를 행성으로 떨어뜨렸다! 대지가 갈라지고 대기가 불탄다! 우르사카르 크리드가 최후의 철수령을 내린다.",
    choices: [
      {
        label: "[의지 판정 · 즉사 위험] 크리드 장군과 함께 마지막까지 방어선을 지키며 피난선을 엄호한다",
        req: { minAge: 14, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -15 },
        success: {
          text: "카디아의 지각이 쪼개지는 순간까지 방아쇠를 놓지 않았고, 기적적으로 성녀 셀레스틴의 광휘 속에서 최후의 수송선에 올랐다! '카디아는 서 있다!'",
          stats: { WP: 12, WS: 6, BS: 6, Inf: 12 },
          faith: 20,
          wounds: -28,
          moveWorld: "voidborn",
          addTags: ["cadia_stands", "met_creed", "met_celestine"]
        },
        fail: {
          text: "블랙스톤 요새의 충돌 충격파가 카스르 전체를 삼켰다. 그대는 행성이 부서지는 그 순간까지 총을 내려놓지 않았다. 카디아는 부서졌으나 가드는 굴복하지 않았다.",
          instantDeath: "999.M41 제13차 블랙 크루세이드, 카디아 붕괴 당시 최후 방어전에서 장렬히 전사 — 카디아는 서 있다"
        }
      },
      {
        label: "[민첩 판정] 벨리사리우스 카울과 셀레스틴의 웹웨이·함대 탈출 경로에 합류한다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "Ag", diff: -5 },
        success: {
          text: "붕괴하는 대륙을 가로질러 탈출 함대에 승선했다! 갈라진 고향 행성을 뒤로한 채, 복수를 맹세하며 테라 방면으로 항해한다.",
          stats: { Ag: 6, Int: 5, WP: 5 },
          wounds: -15,
          moveWorld: "terra",
          addTags: ["cadia_stands", "met_cawl"]
        },
        fail: {
          text: "탈출 도중 카오스 스페이스 마린의 습격으로 치명상을 입었으나, 제국 해군 구명정에 실려 간신히 목숨을 건졌다.",
          wounds: -38,
          moveWorld: "voidborn",
          addTags: ["cadia_stands"]
        }
      },
      {
        label: "[민첩 판정 · 카오스] 무너지는 카디아 궤도에서 블랙 리전 강습정에 올라 암흑의 승리를 지켜본다",
        req: { anyTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "산산조각 나는 요새 행성을 발밑에 두고 블랙 리전 함대에 합류했다! 암흑 신들의 승리가 은하를 찢어발기기 시작한다.",
          stats: { Ag: 4, WP: 6, Inf: 8 },
          corruption: 8,
          moveWorld: "voidborn",
          addTags: ["met_abaddon"]
        },
        fail: {
          text: "지각 붕괴의 여파로 강습정이 흔들리며 중상을 입었으나, 가까스로 공포의 눈 경계 함대에 회수되었다.",
          wounds: -24,
          moveWorld: "voidborn"
        }
      },
      {
        label: "갈라지는 카디아 지표에서 긴급 탈출 포드에 몸을 싣고 궤도를 벗어난다",
        effect: {
          text: "행성이 불타며 쪼개지는 충격파 속에서 간신히 우주로 튕겨 나가 표류 끝에 구조되었다.",
          wounds: -20,
          stats: { WP: 4 },
          moveWorld: "voidborn",
          addTags: ["cadia_stands"]
        }
      }
    ],
    source: "Lexicanum: Fall of Cadia / Gathering Storm I"
  },
  {
    id: "tl_great_rift",
    year: 999,
    title: "대균열 시카트릭스 말레딕툼 개방 — 암흑의 시대",
    en: "Opening of the Great Rift",
    scope: "은하계 전역 (모든 캐릭터)",
    filter: {},
    characters: ["abaddon"],
    setGlobalFlag: "greatRiftOpened",
    summary: "카디아 파일런의 파괴로 은하계 전체가 거대한 워프의 상처로 양단되었다. 인류제국은 상크투스와 암흑의 니힐루스로 갈라졌다.",
    text: "밤하늘이 핏빛과 보랏빛으로 찢어졌다! 은하계를 가로지르는 거대한 워프 균열 '시카트릭스 말레딕툼'이 열렸다. 상크투스 성역에서는 아스트로노미칸의 등불이 33일간 꺼졌고, 대균열 너머 임페리움 니힐루스는 아예 영구적인 암흑 '녹티스 아에테르나'에 잠겼다. 은하 곳곳에서 악마가 출현하며 사이커들이 폭주한다!",
    choices: [
      {
        label: "[의지 판정] 황제의 이름을 부르짖으며 악몽 같은 녹티스 아에테르나를 견딘다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: 0 },
        success: {
          text: "온 세상이 광기에 휩싸인 암흑 속에서도 정신을 붙들었다! 시련을 넘긴 신념이 한층 단단해졌다.",
          stats: { WP: 6, T: 2 },
          faith: 10,
          addTags: ["rift_survivor"]
        },
        fail: {
          text: "워프의 비명이 정신을 파고들어 심각한 광기와 오염의 흔적을 남겼다.",
          wounds: -18,
          corruption: 15,
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "[지성 판정] 혼란 속에서 생존 물자와 거점 방어선 확보에 매달린다",
        check: { stat: "Int", diff: 0 },
        success: {
          text: "폭동과 기근 속에서도 질서를 유지하고 생존 거점을 확보해 주변의 신뢰와 주도권을 얻었다.",
          stats: { Int: 5, Inf: 6 },
          addTags: ["rift_survivor"]
        },
        fail: {
          text: "약탈자와 광신도들의 폭동에 휘말려 부상을 입고 기반을 잃었다.",
          wounds: -20,
          stats: { Inf: -4 },
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "[의지 판정 · 금단] 찢어진 하늘 너머에서 들려오는 암흑 신들의 속삭임에 귀를 기울인다",
        req: { minAge: 14, excludeTags: ["custodes", "grey_knight", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: 10 },
        success: {
          text: "금지된 진실의 단편과 뒤틀린 힘을 깨달았다… 이제 제국의 빛보다 어둠이 더 친숙하게 느껴진다.",
          stats: { Int: 6, WP: 4 },
          faith: -25,
          corruption: 28,
          addTags: ["rift_touched", "rift_survivor"]
        },
        fail: {
          text: "워프의 에너지가 육신을 뒤틀어 끔찍한 고통과 오염을 안겼다.",
          wounds: -25,
          faith: -20,
          corruption: 35,
          addTags: ["rift_survivor"]
        }
      },
      {
        label: "[의지 판정 · 카오스] 찢어진 은하의 워프 폭풍을 들이마시며 암흑 신들의 시대를 찬양한다",
        req: { minAge: 14, anyTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: 0 },
        success: {
          text: "황제의 빛이 꺾인 밤하늘 아래 워프의 격류가 온몸을 감싸며 카오스의 가호가 강렬히 깃들었다!",
          stats: { WP: 7, Inf: 6 },
          corruption: 12,
          addTags: ["rift_touched", "rift_survivor"]
        },
        fail: {
          text: "폭주하는 워프 균열의 반동에 육신이 찢어지는 고통을 겪었으나 끝내 어둠 속에서 버텨 냈다.",
          wounds: -18,
          corruption: 10,
          addTags: ["rift_survivor"]
        }
      }
    ],
    source: "Lexicanum: Great Rift / Warhammer 40k 8th Edition Core"
  },
  {
    id: "tl_devastation_baal",
    year: 999,
    title: "바알의 파괴 — 하이브 함대 레비아탄 내습",
    en: "The Devastation of Baal",
    scope: "바알 (행성 한정)",
    dispatchScope: "galaxy",
    dispatchText: "타이라니드 하이브 함대 레비아탄의 거대한 촉수가 블러드 엔젤의 모성 바알을 덮쳤다. 사령관 단테와 후계 챕터들의 처절한 항전 끝에 대균열의 시간 왜곡을 뚫고 당도한 구원 함대가 바알을 구해 냈다는 소식이 전해졌다.",
    filter: { anyWorlds: ["baal"] },
    characters: ["dante", "guilliman"],
    summary: "타이라니드 하이브 함대 레비아탄의 거대한 촉수가 블러드 엔젤의 모성 바알을 집어삼키려 했다.",
    text: "생귀니우스의 고향 하늘이 수십억 타이라니드 생체 함선으로 뒤덮였다! 사령관 단테가 모든 후계 챕터와 바알 부족민들을 아르크스 안젤리쿰 성채로 소집한다. 생사의 갈림길에서 인류 최후의 날 같은 결전이 시작된다.",
    choices: [
      {
        label: "[백병 판정] 블러드 엔젤의 깃발 아래 타이라니드 무리에 맞서 싸운다",
        req: { minAge: 12, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WS", diff: -10 },
        success: {
          text: "절망적인 포위망 속에서 대균열이 하늘을 찢고 시간의 흐름마저 뒤틀린 끝자락, 마침내 길리먼의 구원 함대가 바알 궤도에 당도했다! 단테가 그대의 생존을 축복했다.",
          stats: { WS: 8, T: 6, WP: 8, Inf: 10 },
          wounds: -22,
          addTags: ["baal_survivor", "met_dante", "met_guilliman"]
        },
        fail: {
          text: "타이라니드 호마건트 떼에 짓밟혀 중상을 입었으나, 대균열의 폭풍이 걷히며 당도한 길리먼의 구원 함대에 폐허에서 기적적으로 구조되었다.",
          wounds: -42,
          stats: { T: 4 },
          addTags: ["baal_survivor"]
        }
      },
      {
        label: "[강인 판정] 방사능 사막 지하 벙커에서 끝까지 살아남는다",
        check: { stat: "T", diff: 0 },
        success: {
          text: "포자와 굶주림을 이겨 내고 전후 바알의 재건 시대를 맞이했다.",
          stats: { T: 6, WP: 4 },
          addTags: ["baal_survivor"]
        },
        fail: {
          text: "타이라니드 생체 독성에 중독되어 오랜 후유증을 앓게 되었다.",
          wounds: -30
        }
      }
    ],
    source: "Lexicanum: Devastation of Baal"
  },
  {
    id: "tl_lions_gate",
    year: 1000,
    title: "테라 사자의 문 전투 — 코른 악마군단의 황궁 침공",
    en: "Battle of Lion's Gate",
    scope: "신성한 테라 (행성 한정)",
    dispatchScope: "galaxy",
    dispatchText: "신성한 테라 황궁 사자의 문에 8명의 블러드서스터가 이끄는 88개 코른 악마 군단이 출현했으나, 캡틴-제너럴 트라얀 발로리스의 쿠스토데스와 침묵의 자매들, 그리고 테라에 도착한 로부테 길리먼이 악마들을 분쇄했다는 승전보가 울려 퍼졌다.",
    filter: { anyWorlds: ["terra"] },
    characters: ["valoris", "guilliman"],
    summary: "대균열의 여파로 8명의 블러드서스터와 88개 코른 악마 군단이 테라 황궁 사자의 문에 직접 출현했다! 쿠스토데스와 침묵의 자매들, 로부테 길리먼이 맞서 싸웠다.",
    text: "인류의 성지 신성한 테라에 피의 비가 내린다! 8명의 블러드서스터가 이끄는 88개 코른 악마 군단이 사자의 문 우주항을 덮쳤다. 캡틴-제너럴 트라얀 발로리스가 이끄는 4천 명의 황금 쿠스토데스와 마크라그에서 귀환한 로부테 길리먼이 악마들을 향해 돌격한다!",
    choices: [
      {
        label: "[의지 판정] 황금 갑주의 진군을 따라 황궁 외곽 방어선에 합류한다",
        req: { minAge: 14, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "악마의 광기를 이겨 내고 사자의 문 사수에 기여했다! 쿠스토데스와 프라이마크의 위용을 두 눈으로 목격한 영광을 얻었다.",
          stats: { WP: 10, WS: 6, Inf: 12 },
          faith: 18,
          wounds: -20,
          addTags: ["lions_gate_vet", "met_valoris", "met_guilliman"]
        },
        fail: {
          text: "코른 블러드레터의 도끼에 중상을 입었지만 침묵의 자매들의 엄호로 겨우 목숨을 부지했다.",
          wounds: -36,
          corruption: 6
        }
      },
      {
        label: "[민첩 판정] 피의 폭풍을 피해 지하 구역으로 몸을 피하며 주변 생존자들을 이끈다",
        check: { stat: "Ag", diff: 0 },
        success: {
          text: "피의 폭풍 속에서도 살아남아 수많은 테라 시민과 성물을 지켜 냈다.",
          stats: { Ag: 4, Fel: 6, Inf: 6 },
          faith: 10
        },
        fail: {
          text: "무너지는 성당 잔해에 깔려 큰 부상을 입었다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: Battle of Lion's Gate / Watchers of the Throne"
  },
  {
    id: "tl_guilliman_return",
    year: 1001,
    title: "인도미투스 성전 선포와 프라이머리스 스페이스 마린 배치",
    en: "Launch of the Indomitus Crusade",
    scope: "은하계 전역",
    filter: {},
    characters: ["guilliman", "cawl"],
    summary: "999.M41 부활해 테라 사자의 문 전투를 승리로 이끈 제국 섭정 로부테 길리먼이 대대적인 반격 '인도미투스 성전'을 선포하고 프라이머리스 스페이스 마린을 전 은하에 배치했다.",
    text: "전 은하계 아스트로패스 통신망에 경천동지할 칙령이 울려 퍼진다! 황제와 독대하고 제국 섭정에 오른 로부테 길리먼이 하이 로드들을 재편하고 '인도미투스 성전'을 선포했다. 아크마고스 카울이 1만 년간 숨겨 둔 프라이머리스 스페이스 마린이 은하 곳곳에 모습을 드러낸다.",
    choices: [
      {
        label: "[강인 판정 · 아스타르테스 전용] 루비콘 프라이머리스 시술에 지원한다",
        req: { allTags: ["astartes"], excludeTags: ["primaris", "grey_knight", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "dreadnought", "imperial_nihilus"] },
        check: { stat: "T", diff: -15 },
        success: {
          text: "생사를 넘나드는 외과 시술 끝에 3개의 신형 장기가 각성했다! 그대는 이제 더 거대하고 강인한 프라이머리스 아스타르테스로 거듭났다!",
          stats: { T: 10, WS: 8, BS: 8, WP: 6, Inf: 8 },
          woundsBonus: 35,
          addTags: ["primaris", "met_cawl"]
        },
        fail: {
          text: "시술 중 심장이 두 번이나 멈췄으나 아포세카리의 필사적인 처치로 목숨만은 건졌다. 심각한 내상과 극심한 고통의 흉터가 깊게 남았다.",
          wounds: -35,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[교섭 판정] 인도미투스 성전 함대의 일원이나 보급관으로 자원한다",
        req: { minAge: 15, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince", "imperial_nihilus"] },
        check: { stat: "Fel", diff: 0 },
        success: {
          text: "성전군 원정 편대에 이름을 올리며 제국 반격의 물결에 합류했다! 승진과 공훈의 길이 열렸다.",
          stats: { Inf: 8, WP: 5, BS: 3, Int: 3 },
          faith: 8,
          addTags: ["indomitus_crusader", "met_guilliman"]
        },
        fail: {
          text: "엄청난 성전 징발령 속에 고된 행군과 노역을 치르느라 몸이 축났다.",
          wounds: -12,
          stats: { T: 2 }
        }
      },
      {
        label: "[지성 판정] 격변하는 은하의 판도를 지켜보며 자신의 입지를 조용히 다진다",
        check: { stat: "Int", diff: 5 },
        success: {
          text: "길리먼의 행정 개혁과 전쟁의 흐름을 읽어 내고 혼란한 틈에 안정적인 기반을 구축했다.",
          stats: { Int: 5, Inf: 5 }
        },
        fail: {
          text: "테라의 정변과 세금 개혁 여파로 한동안 궁핍한 시기를 보냈다.",
          stats: { Inf: -3 }
        }
      }
    ],
    source: "Lexicanum: Indomitus Crusade / Dark Imperium"
  },
  {
    id: "tl_octarius_war",
    year: 1004,
    endYear: 1007,
    title: "옥타리우스 전쟁 — 오크와 타이라니드의 지옥 도가니",
    en: "The Octarius War",
    scope: "울티마 · 봉쇄선 · 제국군 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "피두스 크립트만이 타이라니드 하이브 함대 레비아탄을 오크 제국 옥타리우스로 유인한 도박이 끔찍한 부메랑으로 돌아왔다! 두 외계 포식자가 서로를 먹어 치우며 괴물처럼 비대해지자, 제국은 옥타리우스 봉쇄선을 지키기 위해 대군을 급파했다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["ultima"] },
        { anyTags: ["militarum", "astartes", "inquisitor", "inquisition_agent", "deathwatch_vet", "navy", "indomitus_crusader", "imperial_knight", "assassin"] }
      ]
    },
    characters: ["kryptman", "ghazghkull"],
    summary: "피두스 크립트만의 유인 작전으로 하이브 함대 레비아탄과 오크 대제국이 정면 충돌한 옥타리우스 섹터가 갈수록 거대한 외계 생체 도가니로 변질되자, 제국은 붕괴하는 봉쇄선을 막기 위해 혈전을 치렀다.",
    text: "옥타리우스 봉쇄선의 관측 위성이 핏빛 경보를 토해 낸다. 크립트만이 유인한 타이라니드 촉수와 오크 대군주들, 그리고 한때 이 도가니에서 세력을 불렸던 가즈쿨 스라카의 잔당들이 뒤엉켜 괴물 같은 진화를 거듭하며 제국 방어선으로 넘쳐흐르고 있다!",
    choices: [
      {
        label: "[사격 판정] 옥타리우스 봉쇄선 최전방에서 쏟아지는 오크와 타이라니드 혼성 돌파를 막아 낸다",
        req: { minAge: 15 },
        check: { stat: "BS", diff: -10 },
        success: {
          text: "초대형 바이오-타이탄과 오크 가간트가 맞붙는 지옥의 화망 속에서 방어 요새를 사수했다! 가즈쿨의 이름을 외치는 오크 무리와 시냅스 지휘체를 동시에 꺾은 생존자로 남았다.",
          stats: { BS: 7, T: 5, WP: 6, Inf: 8 },
          align: { dogmatic: 6, ruthless: 4 },
          addTags: ["octarius_survivor", "met_ghazghkull"]
        },
        fail: {
          text: "오크 폭주 차량과 타이라니드 산성 포자에 협공당해 큰 부상을 입고 봉쇄선 후방으로 실려 갔다.",
          wounds: -28,
          stats: { T: 4 },
          align: { dogmatic: 4 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "[지성 판정] 피두스 크립트만의 비밀 첩보팀과 합류해 옥타리우스 붕괴 궤도를 차단한다",
        req: { minAge: 15 },
        check: { stat: "Int", diff: -5 },
        success: {
          text: "파문당한 전직 이단심문관 피두스 크립트만과 은밀히 접촉해 두 외계 진영이 정면으로 충돌하도록 궤도 미끼를 재배치했다. 차가운 결단으로 인류 행성계의 시간을 벌었다.",
          stats: { Int: 7, WP: 5, Inf: 7 },
          align: { ruthless: 6, humane: 2 },
          addTags: ["octarius_survivor", "met_kryptman"]
        },
        fail: {
          text: "적진 한복판에 미끼를 설치하다 진스틸러 매복에 휘말려 중상을 입었으나, 귀중한 봉쇄선 좌표는 챙겨 나왔다.",
          wounds: -22,
          stats: { Int: 3 },
          align: { ruthless: 4 },
          addTags: ["octarius_survivor"]
        }
      },
      {
        label: "봉쇄선 외곽 항로의 민간 피난선과 보급 호송대를 엄호하며 2차 침투를 경계한다",
        effect: {
          text: "외계 포식자들이 휩쓸고 지나간 변방 성계에서 피난선들을 안전 항로로 유도하며 검역선을 지켜 냈다.",
          stats: { WP: 5, Fel: 4, T: 4 },
          align: { humane: 5 },
          addTags: ["octarius_survivor"]
        }
      }
    ],
    source: "Lexicanum: Octarius War / War Zone Octarius"
  },
  {
    id: "tl_vigilus_war",
    year: 1008,
    title: "비질루스 야수 전쟁 — 나흐문드 회랑 사수전",
    en: "War of Beasts on Vigilus",
    scope: "옵스쿠루스 · 군인 · 아스타르테스",
    dispatchScope: "galaxy",
    dispatchText: "임페리움 니힐루스로 통하는 거의 유일한 안정 항로 비질루스에서 마르네우스 칼가와 약탈자 아바돈이 정면 격돌해 야수 전쟁과 이어진 80일간의 악몽 공성전이 벌어지고 있다는 전보가 날아들었다.",
    filter: {
      minAge: 16,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [{ anySegmenta: ["obscurus"] }, { anyTags: ["militarum", "astartes", "inquisitor", "indomitus_crusader"] }]
    },
    characters: ["calgar", "abaddon"],
    summary: "임페리움 니힐루스로 통하는 거의 유일한 안정 항로 나흐문드 회랑을 두고 마르네우스 칼가와 약탈자 아바돈이 비질루스에서 격돌했다.",
    text: "오크 스피드 프릭, 진스틸러 컬트, 그리고 아바돈의 블랙 리전까지 한 행성에 몰려들었다! 울트라마린 챕터 마스터 마르네우스 칼가가 총사령관으로서 비질루스 하이브 방어전을 지휘한다.",
    choices: [
      {
        label: "[사격 판정] 칼가의 지휘 아래 하이브 스파이어 방어선을 사수한다",
        check: { stat: "BS", diff: -5 },
        success: {
          text: "80일간의 악몽 공성전 끝에 나흐문드 회랑의 생명선을 지켜 냈다! 제국 전역에 용명이 전해졌다.",
          stats: { BS: 6, WS: 5, Inf: 8, WP: 5 },
          addTags: ["vigilus_veteran", "met_calgar"]
        },
        fail: {
          text: "블랙 리전과의 시가전에서 큰 부상을 입고 궤도 의무함으로 후송되었다.",
          wounds: -28,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 하이브 지하의 진스틸러 컬트 비밀 통로를 차단한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "적의 후방 침투로를 사전에 폭파해 수많은 연대의 전멸을 막아 냈다.",
          stats: { Int: 7, Ag: 4, Inf: 7 },
          addTags: ["vigilus_veteran"]
        },
        fail: {
          text: "지하 갱도에서 컬트 암살자의 기습을 받아 크게 다쳤다.",
          wounds: -24
        }
      }
    ],
    source: "Lexicanum: War of Beasts / Imperium Nihilus: Vigilus Defiant"
  },
  {
    id: "tl_psychic_awakening",
    year: 1012,
    title: "사이킥 각성 — 워프의 범람",
    en: "The Psychic Awakening",
    scope: "은하계 전역",
    filter: {},
    characters: [],
    summary: "대균열의 여파로 인류 종 전체에서 유례없는 규모의 사이커 각성과 신앙의 기적이 동시다발적으로 터져 나왔다.",
    text: "은하계 곳곳에서 평범하던 시민들이 갑자기 염동력을 쓰거나 예언을 외치기 시작했다. 이단심문소와 검은 함선은 폭주하는 업무에 비명을 지르고, 국교 성당에서는 기적의 성광이 관측된다.",
    choices: [
      {
        label: "[의지 판정] 내면에서 일렁이는 워프의 파장을 억누르거나 신념으로 승화한다",
        check: { stat: "WP", diff: 0 },
        success: {
          text: "폭주하는 워프 에너지 앞에서도 흔들리지 않고 오히려 정신적 깨달음과 흔들리지 않는 의지를 얻었다.",
          stats: { WP: 7 },
          faith: 12,
          corruption: -5
        },
        fail: {
          text: "갑작스러운 사이킥 폭풍에 휩쓸려 정신이 혼미해지고 워프의 낙인이 스몄다.",
          wounds: -15,
          corruption: 12
        }
      },
      {
        label: "[의지 판정 · 잠재력 개방] 밀려드는 초자연적 감각을 받아들여 잠재 사이킥을 일깨운다",
        req: { excludeChapters: ["black_templars"], excludeTags: ["psyker", "blank", "custodes", "astartes", "grey_knight", "sororitas", "daemon_prince", "dreadnought"] },
        check: { stat: "WP", diff: -10 },
        success: {
          text: "눈동자에 푸른 워프 불꽃이 어른거린다! 그대는 후천적으로 사이커 자질에 눈떴다. 막대한 힘과 함께 검은 함선의 위협이 뒤따를 것이다.",
          stats: { WP: 8, Int: 5 },
          corruption: 8,
          addTags: ["psyker"]
        },
        fail: {
          text: "통제하지 못한 사이킥 역류로 코피와 발작을 일으키며 큰 내상을 입었다.",
          wounds: -25,
          corruption: 14
        }
      }
    ],
    source: "Lexicanum: Psychic Awakening"
  },
  {
    id: "tl_plague_wars",
    year: 1013,
    endYear: 1015,
    title: "역병 전쟁 — 울트라마의 정원 행성 이악스와 형제의 결전",
    en: "The Plague Wars",
    scope: "울티마 · 마크라그 · 제국군 · 아스타르테스 · 카오스",
    dispatchScope: "galaxy",
    dispatchText: "너글의 악마 프라이마크 모타리온이 데스 가드 군단과 부패 함대를 이끌고 500세계 울트라마를 침공했다! 제국 섭정 로부테 길리먼이 인도미투스 성전군을 돌려 형제와 맞섰으며, 병원 행성 이악스에서 역병과 성광이 충돌하는 대결전이 벌어졌다.",
    filter: {
      minAge: 14,
      or: [
        { anyWorlds: ["macragge"] },
        { anySegmenta: ["ultima"] },
        { anyTags: ["militarum", "astartes", "sororitas", "inquisitor", "indomitus_crusader", "imperial_knight", "living_saint", "heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] }
      ]
    },
    characters: ["guilliman", "mortarion", "calgar"],
    summary: "013~015.M42 너글의 악마 프라이마크 모타리온이 울트라마를 침공해 병원 행성 이악스를 거대한 역병의 가마솥으로 바꾸려 하자 로부테 길리먼과 마르네우스 칼가가 정면 격돌했다.",
    text: "울트라마의 옥빛 하늘이 너글의 녹색 역병 구름으로 뒤덮였다! 데스 가드와 역병 함대가 파르메니오와 정원 행성 이악스를 휩쓸고, 거대한 낫을 든 악마 프라이마크 모타리온의 그림자 앞에서 제국 섭정 로부테 길리먼과 마르네우스 칼가가 반격의 검을 뽑아 들었다.",
    choices: [
      {
        label: "[강인 판정] 길리먼과 칼가의 반격 전선에 합류해 데스 가드와 모타리온의 역병 폭풍을 뚫는다",
        req: { minAge: 15, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: -10 },
        success: {
          text: "폐를 태우는 부패 안개를 견디며 파르메니오와 이악스의 반격 돌파구를 열었다! 황제의 성광이 모타리온의 가마솥을 불태우는 순간을 두 눈으로 목격했다.",
          stats: { T: 7, WP: 7, WS: 5, Inf: 10 },
          faith: 14,
          align: { dogmatic: 7 },
          addTags: ["plague_war_vet", "met_guilliman", "met_mortarion", "met_calgar"]
        },
        fail: {
          text: "역병 해병의 부식탄과 워프 독기에 중독되어 사경을 헤맸으나, 울트라마 의무대의 정화 처치로 가까스로 살아남았다.",
          wounds: -30,
          corruption: 8,
          stats: { T: 4 },
          align: { dogmatic: 4 },
          addTags: ["plague_war_vet"]
        }
      },
      {
        label: "[의지 판정] 병원 행성 이악스의 야전 병동을 사수하며 부상병과 피난민을 끝까지 지켜 낸다",
        req: { minAge: 14, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "너글 악마들이 밀려드는 병동 입구에서 성수와 화염으로 버텨 수만 명의 부상병을 대피선에 태웠다! 부패 속에서도 꺾이지 않은 자비의 증인이 되었다.",
          stats: { WP: 7, Fel: 5, T: 4, Inf: 7 },
          faith: 12,
          align: { humane: 8 },
          addTags: ["plague_war_vet", "macro_mercy_sanctuary", "met_mortarion"]
        },
        fail: {
          text: "역병 파리의 습격으로 깊은 상처와 열병을 얻었으나, 끝까지 병동 철수선을 무너뜨리지 않았다.",
          wounds: -24,
          stats: { WP: 4 },
          align: { humane: 6 },
          addTags: ["plague_war_vet", "macro_mercy_sanctuary"]
        }
      },
      {
        label: "[강인 판정 · 카오스] 모타리온의 데스 가드 전열 뒤에서 울트라마를 삼키는 부패의 의식을 지켜본다",
        req: { minAge: 14, anyTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "T", diff: 0 },
        success: {
          text: "악마 프라이마크 모타리온의 거대한 날개 아래 500세계의 성채들이 녹아내리는 광경을 목도했다! 역병의 축복과 두려운 명성이 따라붙었다.",
          stats: { T: 6, WP: 5, Inf: 8 },
          corruption: 12,
          align: { ruthless: 8 },
          addTags: ["plague_war_vet", "met_mortarion"]
        },
        fail: {
          text: "황제의 불꽃이 이악스의 가마솥을 태울 때 역류한 성광에 큰 화상을 입고 워프 함대로 퇴각했다.",
          wounds: -26,
          corruption: 6,
          align: { ruthless: 5 },
          addTags: ["plague_war_vet"]
        }
      },
      {
        label: "울트라마 외곽 성계로 한 발 물러나 역병 폭풍과 전황의 추이를 주시하며 전력을 보전한다",
        effect: {
          text: "부패의 안개와 황금빛 반격이 뒤엉킨 대전쟁의 한복판에서 살아남아 외곽 항로에서 다음 국면을 대비했다.",
          stats: { Int: 5, T: 4, WP: 4 },
          addTags: ["plague_war_vet"]
        }
      }
    ],
    source: "Lexicanum: Plague Wars / Dark Imperium Trilogy (Revised 012~013.M42)"
  },
  {
    id: "tl_pariah_nexus",
    year: 1016,
    endYear: 1020,
    title: "파리아 넥서스 전역 — 네크론의 '정적'",
    en: "The Pariah Nexus Campaign",
    scope: "네필림 섹터 · 은하계 전역",
    dispatchScope: "galaxy",
    dispatchText: "네필림 섹터 일대에 네크론이 거대한 블랙스톤 파일런 망 '파리아 넥서스'를 가동했다! 구역 내 인류 수십억이 영혼의 활력을 잃고 산 송장처럼 얼어붙는 '정적' 현상이 번지자 인도미투스 성전 함대가 긴급 투입되었다.",
    filter: {
      minAge: 14,
      excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"],
      or: [
        { anySegmenta: ["ultima", "tempestus"] },
        { anyTags: ["militarum", "astartes", "sororitas", "mechanicus", "inquisitor", "indomitus_crusader"] }
      ]
    },
    characters: ["cawl"],
    summary: "016.M42 네크론 일루미노르 세라스가 네필림 섹터에 블랙스톤 파일런 망을 구축해 워프를 단절시키자, 영혼이 메마르는 공포 속에서 제국 성전군과 아뎁타 소로리타스가 사투를 벌였다.",
    text: "파리아 넥서스 경계에 들어서자마자 기묘한 적막이 숨통을 조여 온다. 워프 통신이 완전히 끊기고, 평범한 병사들이 이유 없는 무기력 속에 총을 떨어뜨리며 쓰러진다. 오직 맹렬한 황제 신앙과 강철 의지, 그리고 벨리사리우스 카울의 역설계 장비만이 에메랄드빛 파일런의 침묵을 뚫을 수 있다!",
    choices: [
      {
        label: "[의지 판정] 영혼을 갉아먹는 정적의 파동을 황제 신앙으로 이겨 내고 블랙스톤 파일런 폭파조에 합류한다",
        check: { stat: "WP", diff: -10 },
        success: {
          text: "찬송가를 외치며 에메랄드빛 거석을 폭파하자 주변 아군들의 눈에 다시 생기가 돌아왔다! 기적 같은 신앙의 승전보였다.",
          stats: { WP: 8, T: 4, Inf: 8 },
          faith: 12,
          corruption: -8
        },
        fail: {
          text: "영혼이 텅 비어 가는 끔찍한 무력감과 네크론 포화에 쓰러져 겨우 후송되었다.",
          wounds: -24,
          stats: { WP: 4 }
        }
      },
      {
        label: "[지성 판정] 아크마고스 카울의 블랙스톤 간섭 분석 임무를 지원해 파일런 파동의 사각지대를 찾아낸다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "정적 파동이 약해지는 회랑을 계산해 내어 성전 함대의 돌파구를 열었다! 카울이 기묘한 이진법으로 찬사를 보냈다.",
          stats: { Int: 8, Inf: 7 },
          addTags: ["met_cawl"]
        },
        fail: {
          text: "계측 장비가 네크론의 가우스 폭풍에 타 버리며 부상을 입었으나, 귀중한 파동 데이터 일부는 건졌다.",
          wounds: -16,
          stats: { Int: 4 }
        }
      },
      {
        label: "정적 구역 최외곽의 중계 기지를 사수하며 무기력증에 빠진 피난민과 부상병들을 호송한다",
        effect: {
          text: "보이지 않는 영혼의 침묵 속에서도 끝까지 동료를 포기하지 않았다.",
          stats: { T: 5, WP: 5 },
          faith: 6
        }
      }
    ],
    source: "Lexicanum: Pariah Nexus / Indomitus Crusade"
  },
  {
    id: "tl_arks_of_omen_lion",
    year: 1020,
    endYear: 1023,
    title: "징조의 방주와 숲의 사자 귀환 — 라이온 엘 존슨의 재림",
    en: "Arks of Omen & The Return of Lion El'Jonson",
    scope: "은하계 전역 · 임페리움 니힐루스",
    dispatchScope: "galaxy",
    dispatchText: "약탈자 아바돈과 영혼 대장간 반신 바쉬토르의 거대 스페이스 헐크 함대 '징조의 방주'가 은하를 유린하는 절체절명의 암흑 속에, 기적 같은 소식이 울려 퍼졌다! 제1군단의 프라이마크 라이온 엘 존슨이 1만 년의 잠에서 깨어나 암흑 제국을 수호하고 있다!",
    filter: {},
    characters: ["lion", "abaddon"],
    summary: "020.M42 아바돈과 바쉬토르의 '징조의 방주' 성전이 은하를 휩쓰는 가운데, 다크 엔젤 프라이마크 라이온 엘 존슨이 깨어나 암흑 제국에 '라이온의 보호령'을 세우고 인류를 구원하기 시작했다.",
    text: "거대한 악마 요새선 '징조의 방주'들이 성계 방어망을 짓밟으며 은하가 다시금 절망에 빠진 순간, 안개 낀 숲의 전설처럼 황제의 방패를 든 두 번째 충성파 프라이마크 '라이온 엘 존슨'이 전장에 강림했다는 아스트로패스 속보가 터져 나왔다!",
    choices: [
      {
        label: "[백병 판정] 징조의 방주 강습대에 맞서 최후의 방어선을 지키며 라이온의 구원군이 닿을 시간을 번다",
        req: { minAge: 15, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WS", diff: -10 },
        success: {
          text: "절망적인 수적 열세를 버텨 낸 그 순간, 녹색 안개 너머로 숲의 사자와 리즌 전사들이 강림해 적을 분쇄했다!",
          stats: { WS: 8, WP: 7, Inf: 9 },
          faith: 12,
          addTags: ["met_lion", "hero_of_imperium"]
        },
        fail: {
          text: "징조의 방주 악마 병기들의 포화에 중상을 입었으나, 제1군단 구원대의 포효를 들으며 목숨을 건졌다.",
          wounds: -26,
          stats: { T: 4, WP: 4 }
        }
      },
      {
        label: "[의지 판정] 라이온 귀환의 복음을 고립된 행성계에 전파하며 무너져 가던 시민들의 희망을 되살린다",
        req: { excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "WP", diff: -5 },
        success: {
          text: "황제의 아들이 다시 돌아왔다는 소식에 절망하던 행성 전체가 들끓어 반격의 불꽃을 지폈다!",
          stats: { WP: 7, Fel: 6, Inf: 7 },
          faith: 10
        },
        fail: {
          text: "혼란을 틈탄 카오스 선동꾼들의 습격을 막아 내다 상처를 입었으나, 희망의 불씨만은 꺼뜨리지 않았다.",
          wounds: -14,
          stats: { WP: 5 }
        }
      },
      {
        label: "거대 스페이스 헐크 함대의 이동 경로를 피하며 소속 거점의 방어와 생존 물자 확보에 집중한다",
        effect: {
          text: "신화 같은 영웅들의 전쟁 속에서도 자신이 지킬 자리를 끝까지 사수했다.",
          stats: { T: 5, Int: 4, WP: 4 }
        }
      }
    ],
    source: "Lexicanum: Arks of Omen / The Lion: Son of the Forest"
  },
  {
    id: "tl_fourth_tyranic",
    year: 1028,
    title: "제4차 타이라니드 전쟁 — 서부 은하의 포식자",
    en: "Fourth Tyrannic War",
    scope: "은하계 전역 · 파시피쿠스",
    filter: {},
    characters: ["guilliman", "valoris"],
    summary: "하이브 함대 레비아탄의 거대한 신형 촉수가 인류제국 서부 세그멘툼 파시피쿠스를 향해 테라 직행 코스로 밀려들어 왔다.",
    text: "모두가 동부 전선에 시선을 빼앗긴 사이, 타이라니드 하이브 함대 레비아탄의 최대 주력이 은하 서부에서 모습을 드러냈다! 테라를 향한 절체절명의 방어전 '제4차 타이라니드 전쟁'이 선포된다.",
    choices: [
      {
        label: "[사격 판정] 서부 방어선 솔블레이드 기동대에 합류해 타이라니드 생체 괴수들과 싸운다",
        req: { minAge: 16, excludeTags: ["heretic", "chaos_aligned", "renegade_marine", "chaos_lord", "daemon_prince"] },
        check: { stat: "BS", diff: -10 },
        success: {
          text: "하늘을 가리는 스포어와 카니펙스 무리를 막아 내며 제국 서부 방어선의 영웅으로 기록되었다!",
          stats: { BS: 7, WS: 5, T: 4, Inf: 10 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "타이라니드 산성 포자에 심각한 부상을 입고 전선에서 물러났다.",
          wounds: -32,
          stats: { T: 3 }
        }
      },
      {
        label: "[지성 판정] 궤도 봉쇄와 생체 함선 약점 분석으로 방어군을 지휘·지원한다",
        check: { stat: "Int", diff: -5 },
        success: {
          text: "시냅스 생물의 지휘망을 정밀 타격하도록 유도해 행성계 하나의 몰살을 막아 냈다!",
          stats: { Int: 7, Inf: 9, WP: 4 },
          addTags: ["tyranic_war_vet"]
        },
        fail: {
          text: "워프의 그림자로 성간 통신이 두절되며 아군과 고립되어 고초를 겪었다.",
          wounds: -18,
          stats: { WP: 2 }
        }
      }
    ],
    source: "Lexicanum: Fourth Tyrannic War / Warhammer 40k 10th Edition Core"
  }
];
