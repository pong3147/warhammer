// 현재 인물(소속 세력 · 출신 · 자질 · 체류 행성 · 대균열 상태)에 맞는
// 핵심 개념 사전 링크 1~2개를 경량 매핑으로 반환한다.
// 주의: 67KB 규모의 src/data/glossary.js 본문을 메인 게임 번들(/)에 끌어들이지 않도록
// ID와 짧은 제목만 유지하며, 모든 ID의 실존 여부는 scripts/qa.mjs Gate 4G에서 자동 검증한다.

export const CONTEXTUAL_GLOSSARY_LABELS = {
  imperium_of_man: "인류제국",
  emperor_golden_throne: "인류의 황제와 황금 옥좌",
  high_lords_of_terra: "테라의 하이 로드",
  segmenta_majoris: "세그멘툼 (5대 은하 성역)",
  imperial_tithe: "제국 십일조",
  ecclesiarchy_creed: "임페리얼 크리드와 국교회",
  navis_nobilite: "나비스 노빌리테 (항해사 가문)",
  psykers_black_ships: "사이커와 검은 함선",
  blank_pariah: "블랭크 · 퍼라이어",
  chaos_gods: "카오스 4대 신",
  eye_of_terror_black_crusade: "공포의 눈과 블랙 크루세이드",
  astra_militarum_commissar: "아스트라 밀리타룸과 커미사르",
  schola_progenium_scions: "스콜라 프로제니움과 템페스투스 사이온",
  imperial_navy: "임페리얼 네이비 (제국 해군)",
  adepta_sororitas: "아뎁타 소로리타스 (전투 수녀회)",
  adeptus_astartes_geneseed: "아뎁투스 아스타르테스와 진시드",
  primaris_rubicon: "퍼스트본 · 프라이머리스 마린",
  grey_knights_deathwatch: "그레이 나이트와 데스워치",
  adeptus_custodes: "아뎁투스 쿠스토데스와 침묵의 자매들",
  adeptus_mechanicus: "아뎁투스 메카니쿠스와 옴니시아",
  inquisition_ordos: "이단심문소와 3대 오르도",
  adeptus_arbites: "아뎁투스 아르비테스와 렉스 임페리알리스",
  administratum_rogue_trader: "아드미니스트라툼과 로그 트레이더",
  hive_world: "하이브 월드와 언더하이브",
  forge_world: "포지 월드 (대장간 행성)",
  death_fortress_world: "데스 월드와 요새 행성",
  agri_shrine_paradise_world: "농업 · 문명 · 성지 · 낙원 행성",
  voidborn_abhumans: "보이드본과 앱휴먼",
  great_rift: "카디아 붕괴와 시카트릭스 말레딕툼",
  sanctus_and_nihilus: "임페리움 상크투스와 니힐루스",
  career_tiers_transit: "진로 계급 · 발탁 이벤트 · 성간 이동"
};

export const CAREER_TREE_GLOSSARY = {
  militarum: "astra_militarum_commissar",
  commissariat: "astra_militarum_commissar",
  sororitas: "adepta_sororitas",
  ecclesiarchy: "ecclesiarchy_creed",
  living_saint: "ecclesiarchy_creed",
  astartes: "adeptus_astartes_geneseed",
  grey_knights: "grey_knights_deathwatch",
  custodes: "adeptus_custodes",
  inquisition: "inquisition_ordos",
  mechanicus: "adeptus_mechanicus",
  navy: "imperial_navy",
  arbites: "adeptus_arbites",
  administratum: "administratum_rogue_trader",
  rogue_trader: "administratum_rogue_trader",
  governor: "imperial_tithe",
  psyker: "psykers_black_ships",
  navis_navigator: "navis_nobilite",
  officio_assassinorum: "high_lords_of_terra",
  imperial_knight: "imperium_of_man",
  chaos: "chaos_gods",
  civil: "career_tiers_transit"
};

export const ORIGIN_GLOSSARY = {
  schola_progenium: "schola_progenium_scions",
  navigator_house: "navis_nobilite",
  mechanicus_menial: "adeptus_mechanicus",
  ecclesiarchy_novice: "ecclesiarchy_creed",
  rogue_trader_scion: "administratum_rogue_trader",
  terra_high_blood: "emperor_golden_throne",
  militarum_family: "astra_militarum_commissar",
  underhive_scum: "hive_world"
};

export const TRAIT_GLOSSARY = {
  psyker: "psykers_black_ships",
  blank: "blank_pariah",
  abhuman_ogryn: "voidborn_abhumans",
  abhuman_ratling: "voidborn_abhumans",
  geneseed_compatible: "adeptus_astartes_geneseed"
};

function pickPrimaryGlossaryId(state, career) {
  const tags = (state && state.tags) || [];
  if (tags.includes("high_lord_terra")) return "high_lords_of_terra";
  if (career && career.id && career.id !== "child") {
    if (career.id === "tempestus_scion" || career.id === "tempestus_prime_cmd") {
      return "schola_progenium_scions";
    }
    if (career.tree === "astartes" && tags.includes("primaris")) {
      return "primaris_rubicon";
    }
    if (career.tree && CAREER_TREE_GLOSSARY[career.tree]) {
      return CAREER_TREE_GLOSSARY[career.tree];
    }
  }
  if (state && state.originId && ORIGIN_GLOSSARY[state.originId]) {
    return ORIGIN_GLOSSARY[state.originId];
  }
  if (state && state.traitId && TRAIT_GLOSSARY[state.traitId]) {
    return TRAIT_GLOSSARY[state.traitId];
  }
  return "imperium_of_man";
}

function pickSecondaryGlossaryId(state, world) {
  const tags = (state && state.tags) || [];
  const wTags = (world && world.tags) || [];
  if (tags.includes("imperial_nihilus")) return "sanctus_and_nihilus";
  if (world && world.id === "terra") return "emperor_golden_throne";
  if ((world && world.id === "mars") || wTags.includes("forge")) return "forge_world";
  if (world && world.id === "cadia") {
    return state && state.globalFlags && state.globalFlags.greatRiftOpened
      ? "great_rift"
      : "eye_of_terror_black_crusade";
  }
  if (world && world.id === "voidborn") return "voidborn_abhumans";
  if (wTags.includes("death") || wTags.includes("fortress") || wTags.includes("krieg")) {
    return "death_fortress_world";
  }
  if (wTags.includes("hive")) return "hive_world";
  if (
    (world && world.id === "ophelia7") ||
    wTags.includes("shrine") ||
    wTags.includes("agri") ||
    wTags.includes("civilised") ||
    wTags.includes("paradise")
  ) {
    return "agri_shrine_paradise_world";
  }
  return "segmenta_majoris";
}

/**
 * 현재 생애 상태에 맞춰 최대 2개의 개념 사전 ID·라벨 목록을 반환한다.
 * @param {any} state
 * @param {any} career
 * @param {any} world
 * @returns {{ id: string, label: string }[]}
 */
export function getContextualGlossaryRefs(state, career, world) {
  const ids = [];
  const first = pickPrimaryGlossaryId(state, career);
  if (first && CONTEXTUAL_GLOSSARY_LABELS[first]) ids.push(first);

  const second = pickSecondaryGlossaryId(state, world);
  if (second && CONTEXTUAL_GLOSSARY_LABELS[second] && !ids.includes(second)) {
    ids.push(second);
  }
  return ids.slice(0, 2).map((id) => ({
    id,
    label: CONTEXTUAL_GLOSSARY_LABELS[id]
  }));
}
