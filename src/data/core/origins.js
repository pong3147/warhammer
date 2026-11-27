export const ORIGINS = [
  {
    id: "underhive_scum",
    name: "하층민 · 언더하이브 출생",
    en: "Underhive / Menial Serf",
    weight: 34,
    excludeWorlds: ["krieg", "generic_paradise"],
    excludeWorldTags: ["feral"],
    statMods: { T: 5, Ag: 5, WS: 4, Int: -4, Inf: -10, Fel: -3 },
    lifeMod: -8,
    faithMod: -5,
    tags: ["lowborn"],
    desc: "재활용 영양 죽과 유독 매연 속에서 살아남아야 하는 제국 최하층의 삶. 강인한 생존 본능만이 유일한 자산이다.",
    source: "Dark Heresy 1e / Imperium Maledictum"
  },
  {
    id: "imperial_citizen",
    name: "일반 제국 시민 (노동·길드)",
    en: "Imperial Citizen",
    weight: 30,
    statMods: { T: 2, Int: 2, Fel: 2, WP: 2 },
    lifeMod: 0,
    faithMod: 5,
    tags: ["citizen"],
    desc: "하루 14시간 노동과 황제 찬송가로 채워지는 평범한 제국 시민의 가정. 평범하다는 것 자체가 이 은하에선 기적이다.",
    source: "Imperium Maledictum Core"
  },
  {
    id: "militarum_family",
    name: "군인 · 방위군 가문",
    en: "Regimental Lineage",
    weight: 12,
    statMods: { BS: 6, WS: 5, T: 4, WP: 4, Inf: 2 },
    lifeMod: -2,
    faithMod: 10,
    tags: ["military_blood"],
    desc: "대대로 행성 방위군(PDF)과 아스트라 밀리타룸에 피를 바쳐 온 무인의 가문. 어릴 적부터 제식과 사격술을 익힌다.",
    source: "Codex: Astra Militarum"
  },
  {
    id: "schola_progenium",
    name: "스콜라 프로제니움 (전쟁 고아원)",
    en: "Schola Progenium",
    weight: 5,
    excludeWorlds: ["krieg"],
    excludeWorldTags: ["feral"],
    statMods: { WP: 10, WS: 5, BS: 5, Int: 5, Inf: 6, Fel: 2 },
    lifeMod: 4,
    faithMod: 22,
    tags: ["schola", "elite_track"],
    desc: "황제를 위해 순직한 제국 영웅들의 고아를 엄혹하게 양육하는 기숙 기관. 커미사르, 소로리타스, 템페스투스 사이온, 이단심문관의 산실이다.",
    source: "Lexicanum: Schola Progenium / Dark Heresy"
  },
  {
    id: "mechanicus_menial",
    name: "기계교 견습 · 포지 도제",
    en: "Mechanicus Apprentice",
    weight: 7,
    excludeWorldTags: ["feral"],
    statMods: { Int: 10, T: 3, BS: 3, Fel: -8 },
    lifeMod: 5,
    faithMod: 0,
    tags: ["mechanicus_blood"],
    desc: "옴니시아의 이진법 찬가를 자장가 삼아 자란 기계교 견습생. 어릴 적부터 회로와 성유(聖油)의 냄새가 몸에 배어 있다.",
    source: "Codex: Adeptus Mechanicus / Imperium Maledictum"
  },
  {
    id: "ecclesiarchy_novice",
    name: "국교 수련생 · 순례자 가문",
    en: "Ecclesiarchy Ward",
    weight: 6,
    excludeWorlds: ["krieg"],
    excludeWorldTags: ["feral"],
    statMods: { WP: 9, Fel: 6, Inf: 3, WS: -2 },
    lifeMod: 3,
    faithMod: 25,
    tags: ["pious"],
    desc: "성당의 촛불과 향 연기 속에서 자라며 황제의 말씀과 성인전을 암송하는 독실한 신앙의 가정.",
    source: "Lexicanum: Ecclesiarchy / Imperium Maledictum"
  },
  {
    id: "planetary_noble",
    name: "행성 귀족 · 상층 첨탑 가문",
    en: "Highborn / Planetary Nobility",
    weight: 3.5,
    excludeWorlds: ["krieg"],
    excludeWorldTags: ["feral"],
    statMods: { Inf: 22, Fel: 10, Int: 6, WS: 3, T: -4 },
    lifeMod: 22,
    faithMod: 5,
    tags: ["noble", "wealthy"],
    desc: "오염 구름 위 상층 첨탑에서 실제 과일과 포도주를 맛보며 자라는 지배 계급. 권모술수와 수명 연장 시술이 일상이지만 암살의 표적이기도 하다.",
    source: "Dark Heresy 2e: Highborn"
  },
  {
    id: "rogue_trader_scion",
    name: "로그 트레이더 방계 가문",
    en: "Rogue Trader Dynasty Scion",
    weight: 1.3,
    excludeWorlds: ["krieg"],
    excludeWorldTags: ["feral"],
    statMods: { Inf: 20, Fel: 11, Ag: 5, BS: 4, Int: 5, WP: 2 },
    lifeMod: 18,
    faithMod: -5,
    tags: ["noble", "rogue_trader_blood", "voidborn"],
    desc: "황제의 무역 영장을 지닌 호걸 가문의 방계 혈손. 제국의 법 너머 미지의 성계와 외계 유물에 대한 야망을 품고 태어난다.",
    source: "Rogue Trader Core Rulebook (FFG)"
  },
  {
    id: "navigator_house",
    name: "나비스 노빌리테 (항해사 가문)",
    en: "Navis Nobilite",
    weight: 1.8,
    excludeWorlds: ["krieg"],
    excludeWorldTags: ["feral"],
    statMods: { WP: 14, Int: 10, Inf: 18, T: -5, Fel: -4 },
    lifeMod: 35,
    faithMod: 5,
    tags: ["noble", "navigator", "mutant_sanctioned"],
    desc: "이마에 워프를 꿰뚫어 보는 제3의 눈을 지닌 고귀한 돌연변이 혈통. 이들이 없으면 인류제국의 성간 항해 자체가 불가능하다.",
    source: "Lexicanum: Navigator / Rogue Trader"
  },
  {
    id: "terra_high_blood",
    name: "테라 고위 귀족 영아 (전설)",
    en: "Terran High-House Scion",
    weight: 2.0,
    worldFilter: ["terra"],
    statMods: { Inf: 26, WP: 10, WS: 8, T: 8, Int: 8, Fel: 8 },
    lifeMod: 35,
    faithMod: 15,
    tags: ["noble", "terra_elite", "custodes_candidate"],
    desc: "황궁 인근 최상류 귀족 가문에서 태어난 영아. 극소수는 황금 갑주의 수호자, 아뎁투스 쿠스토데스의 연금술적 개조 후보로 바쳐진다.",
    source: "Codex: Adeptus Custodes"
  },
  {
    id: "knight_house",
    name: "임페리얼 나이트 기사 가문 직계",
    en: "Imperial Knight House Scion",
    weight: 18,
    worldFilter: ["generic_knight"],
    statMods: { WS: 8, WP: 8, Fel: 6, Inf: 16, T: 4 },
    lifeMod: 18,
    faithMod: 10,
    tags: ["noble", "knight_blood", "wealthy"],
    desc: "기사 행성의 요새 성채에서 선조의 나이트 아머를 계승할 운명을 안고 태어난 고귀한 기사 가문 직계 혈손. 어려서부터 검술과 마상 창술, 그리고 스론 메카니쿰의 명예 규율을 익힌다.",
    source: "Lexicanum: Knight House / Codex: Imperial Knights"
  }
];

export const TRAITS = [
  {
    id: "none",
    name: "순수 인류 표준형",
    en: "Baseline Human",
    weight: 63.5,
    statMods: {},
    capMods: {},
    talent: {
      name: "평범함의 방패",
      desc: "이단심문소와 마녀사냥의 의심을 피해 가는 표준 인류의 안전선"
    },
    tags: [],
    desc: "돌연변이나 초자연적 징후 없는 표준 인류. 이단심문소의 눈초리를 피할 수 있는 가장 안전한 축복이다."
  },
  {
    id: "geneseed_compatible",
    name: "강인한 유전 적성 (진시드 적합)",
    en: "Astartes Gene-Compatible",
    weight: 11,
    statMods: { T: 7, WS: 6, WP: 4 },
    capMods: { T: 4, WS: 3 },
    talent: {
      name: "강인한 재생력",
      desc: "강인·백병 상한 +4/+3, 연간 자연 회복 +1, 아스타르테스·그레이 나이트 선발 시련 +8%"
    },
    tags: ["geneseed_compatible"],
    desc: "남다른 심폐 지구력과 세포 재생력을 타고났다. 챕터 징병관의 눈에 띈다면 아스타르테스 선발 시험에 도전할 자격이 열린다."
  },
  {
    id: "psyker",
    name: "잠재 사이커 (워프 감응)",
    en: "Latent Psyker",
    weight: 7,
    statMods: { WP: 10, Int: 6, T: -3 },
    capMods: { WP: 8, Int: 4 },
    talent: {
      name: "워프 감응",
      desc: "의지·지성 상한 +8/+4, 의지 성장 가속 및 사이킥·워프 판정 우대"
    },
    corruptionStart: 6,
    tags: ["psyker"],
    desc: "워프의 속삭임을 듣는 위험한 축복이자 저주. 검은 함선에 끌려가 옥좌의 제물이 될지, 생션드 사이커나 그레이 나이트로 각성할지는 의지에 달렸다."
  },
  {
    id: "blank",
    name: "블랭크 · 퍼라이어 (영혼 없음)",
    en: "Pariah / Untouchable",
    weight: 2.5,
    statMods: { WP: 14, Fel: -14, T: 3 },
    capMods: { WP: 10, Fel: -10 },
    talent: {
      name: "무혼의 장막",
      desc: "의지 상한 +10(교섭 -10), 워프 오염 축적 50% 감쇠 · 오염 판정 페널티 무시"
    },
    tags: ["blank"],
    desc: "워프에 그림자조차 남기지 않는 극희귀 체질. 타인에게는 본능적 불쾌감을 주지만 악마와 사이킥에 절대적 면역을 지녀 이단심문소가 탐낸다."
  },
  {
    id: "tactical_prodigy",
    name: "냉철한 전술안",
    en: "Tactical Savant",
    weight: 5.5,
    statMods: { Int: 8, BS: 5, Fel: 4 },
    capMods: { Int: 8, BS: 4, Fel: 4 },
    talent: {
      name: "전장의 수읽기",
      desc: "지성·사격·교섭 상한 +8/+4/+4, 지성·사격 성장 +25%, 장교·해군·심문관 입단 +8%"
    },
    tags: ["prodigy"],
    desc: "어린 나이부터 전장의 흐름과 보급선을 직관적으로 파악하는 비상한 두뇌."
  },
  {
    id: "emperor_blessed",
    name: "살아 있는 성흔의 기질",
    en: "Touched by Faith",
    weight: 4,
    statMods: { WP: 9, Fel: 6 },
    capMods: { WP: 8, Fel: 6 },
    talent: {
      name: "불굴의 기적",
      desc: "의지·교섭 상한 +8/+6, 신앙 70+ 시 환경 위험 경감 · 성녀 그릇 각성 우대"
    },
    faithBonus: 18,
    tags: ["saint_spark"],
    desc: "절체절명의 순간 기적적인 신념을 발휘하는 체질. 국교와 소로리타스가 주목할 만한 자질이다."
  },
  {
    id: "abhuman_ogryn",
    name: "앱휴먼 · 오그린",
    en: "Abhuman (Ogryn)",
    weight: 2.5,
    statMods: { T: 18, WS: 14, Int: -18, Fel: -6, BS: -6 },
    capMods: { WS: 10, T: 10, Int: -15, BS: -6 },
    talent: {
      name: "거인의 맷집",
      desc: "백병·강인 상한 +10(지성 -15, 사격 -6), 최대 생명력 +20 · 물리 부상 경감"
    },
    tags: ["abhuman", "ogryn"],
    desc: "고중력 행성 적응으로 거대한 근육과 순박한 충성심을 지닌 아인류. 머리는 단순하지만 황제와 커미사르를 향한 충성만은 산처럼 굳건하다."
  },
  {
    id: "abhuman_ratling",
    name: "앱휴먼 · 래틀링",
    en: "Abhuman (Ratling)",
    weight: 1.5,
    statMods: { BS: 15, Ag: 12, Fel: 5, T: -8, WS: -8 },
    capMods: { BS: 8, Ag: 8, WS: -8, T: -8 },
    talent: {
      name: "매의 눈과 민첩함",
      desc: "사격·민첩 상한 +8(백병·강인 -8), 사격·잠입 판정 +6"
    },
    tags: ["abhuman", "ratling"],
    desc: "작은 체구와 뛰어난 시력, 교활한 식탐을 지닌 아인류. 아스트라 밀리타룸 최고의 저격수로 활약한다."
  },
  {
    id: "alpha_plus_psyker",
    name: "알파 플러스급 사이커 (특이점)",
    en: "Alpha-Plus Psyker Anomaly",
    weight: 0.6,
    statMods: { WP: 14, Int: 8, T: -4 },
    capMods: { WP: 20, Int: 8 },
    talent: {
      name: "알파 플러스 각성",
      desc: "의지 상한 +20 · 지성 상한 +8, 초고위 사이킥·그레이 나이트·심문소 주시 대상"
    },
    corruptionStart: 10,
    tags: ["psyker", "alpha_plus_psyker"],
    desc: "천억 명 중 하나꼴로 태어나는 파멸적 초능력자. 홀로 도시 구역을 붕괴시킬 잠재력을 지녔으나 검은 함선과 카오스의 최우선 표적이다."
  },
  {
    id: "freak_physique",
    name: "규격 외 피지컬 괴물 (특이점)",
    en: "Apex Mortal Physique Anomaly",
    weight: 0.8,
    statMods: { WS: 12, T: 12, Ag: 8 },
    capMods: { WS: 14, BS: 8, T: 14, Ag: 12 },
    talent: {
      name: "규격 외 피지컬",
      desc: "필멸자 신체 상한 +14(민첩 +12, 사격 +8), 아스타르테스·쿠스토데스·암살청 스카우트"
    },
    tags: ["freak_physique"],
    desc: "유전 공학 없이도 아스타르테스 수련생에 필적하는 괴력과 반사 신경을 타고난 야성의 변종. 초인 기관의 징병관들이 혈안이 되어 추적한다."
  },
  {
    id: "savant_genius",
    name: "천년만의 전략·지성 사반트 (특이점)",
    en: "Millennial Savant Anomaly",
    weight: 0.7,
    statMods: { Int: 12, Fel: 8, Inf: 6 },
    capMods: { Int: 16, Fel: 16, Inf: 10 },
    talent: {
      name: "천년만의 사반트",
      desc: "지성·교섭 상한 +16 · 권위 상한 +10, 고위 행정·심문소·사령부 직통 발탁"
    },
    tags: ["prodigy", "savant_genius"],
    desc: "성계 단위의 병참과 적의 기동 패턴을 암산으로 꿰뚫는 전무후무한 천재. 상관의 시기와 암살 위협을 뚫고 대장군·대심문관으로 직통한다."
  },
  {
    id: "omega_pariah",
    name: "절대 무혼 · 오메가-마이너스 (특이점)",
    en: "Omega-Minus Pariah Anomaly",
    weight: 0.4,
    statMods: { WP: 16, Fel: -16, T: 4 },
    capMods: { WP: 18, Fel: -20 },
    talent: {
      name: "절대 무혼(오메가)",
      desc: "의지 상한 +18 · 교섭 상한 -20, 워프 오염 85% 감쇠, 침묵의 자매들·쿨렉수스 최우선 차출"
    },
    tags: ["blank", "omega_pariah"],
    desc: "접근하는 것만으로 사이커를 기절시키고 악마의 실체를 찢어발기는 최고 등급의 공허 체질. 고독한 배척 끝에 황궁 탈론즈나 암살청에 징발된다."
  }
];

export const NAMES = {
  male: [
    "루시우스", "카시안", "티투스", "마르쿠스", "발레리안", "세바스찬", "알라릭", "빅토르",
    "드라고", "가브리엘", "코르부스", "유리엘", "도르니안", "이그나티우스", "케일럽", "기데온",
    "라자루스", "브루투스", "토르발드", "보리스", "이반", "하르콘", "솔로몬", "제레미아"
  ],
  female: [
    "셀레스티아", "발레리아", "카타리나", "아그네스", "베로니카", "옥타비아", "세라피나", "엘레나",
    "미라벨", "아스트리드", "리디아", "마그달레나", "주디스", "클라라", "헬레나", "실비아",
    "타티아나", "카밀라", "오필리아", "율리아", "모르가나", "프레이야", "네리사", "비비안"
  ],
  surnames: [
    "반 데어", "크로우스", "스털링", "보스", "카르낙", "반 헬싱", "드라켄", "솔라리스",
    "하르코넨", "발로르", "크리거", "마르텔", "베인", "그레이", "모르티스", "칼리스",
    "로만", "아르투스", "스트라켄", "콜드웰", "페트로프", "울프슨", "산투스", "렉스"
  ],
  kriegNumbers: ["DK-4821", "DK-7094", "DK-1182", "DK-9305", "DK-3347", "DK-6219", "DK-8840"]
};
