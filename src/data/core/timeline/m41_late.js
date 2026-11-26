// 역사 대사건 — M41 말기 (901.M41~999.M41 · 바답 전쟁 ~ 바알의 파괴, 9건)
// absYear: 901 = 901.M41, 941 = 941.M41, 999 = 999.M41
export const TIMELINE_M41_LATE = [
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
    characters: ["cain"],
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
    characters: ["yarrick"],
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
    characters: ["tushan"],
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
    characters: ["creed"],
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
    characters: [],
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
    characters: ["dante"],
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
  }
];
