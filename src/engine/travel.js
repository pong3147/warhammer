// 성간 이동 · 행성 출입 자격 매트릭스 · 파견/순례/워프 항해 이상 동적 이벤트 모듈
import {
  clamp,
  formatImperialYear,
  getWorldShortTag
} from "./formatters.js";

export const SEGMENTUM_ADJ = {
  solar: ["obscurus", "ultima", "tempestus", "pacificus"],
  obscurus: ["solar", "ultima", "pacificus"],
  ultima: ["solar", "obscurus", "tempestus"],
  tempestus: ["solar", "ultima", "pacificus"],
  pacificus: ["solar", "obscurus", "tempestus"]
};

export function getSegmentumDistance(fromSeg, targetWorld) {
  const toSeg = targetWorld.segmentum === "random" ? fromSeg : targetWorld.segmentum;
  if (fromSeg === toSeg) return { level: "same", label: "같은 성역", bonus: 15 };
  if ((SEGMENTUM_ADJ[fromSeg] || []).includes(toSeg)) return { level: "near", label: "인접 성역", bonus: 0 };
  return { level: "far", label: "원거리 성역", bonus: -20 };
}

export function createTravelModule(deps) {
  const {
    DATA,
    getWorld,
    getCareer,
    randInt
  } = deps;

  function canAccessWorld(state, worldOrId) {
    const world = typeof worldOrId === "string" ? getWorld(worldOrId) : worldOrId;
    if (!state || !world) return { allowed: false, reason: "유효하지 않은 행성이다." };
    if (world.destroyedYear && state.year >= world.destroyedYear) {
      return { allowed: false, reason: `${world.name} 행성은 ${formatImperialYear(world.destroyedYear)}에 이미 파괴되었다.` };
    }

    const career = getCareer(state.careerId);
    const tags = state.tags || [];
    const tree = career ? career.tree : "civilian";
    const tier = career ? career.tier : 1;
    const isNative = state.homeWorldId === world.id;
    const isHeretic = tree === "chaos" || tags.includes("heretic") || tags.includes("chaos_aligned");
    const isInq = tree === "inquisition" || tags.includes("inquisitor") || tags.includes("inquisition_agent");
    const isHighRank = tier >= 4;
    const isCmdT5 = tier >= 5 || (career && career.transitTier === "autonomous");
    const isDevout = (state.faith || 0) >= 65;
    const isNoblePetition = tags.includes("noble") && ((state.stats && state.stats.Inf) || 0) >= 45;

    // 이단·카오스 낙인 신분은 제국 핵심 성역과 챕터 모성 정상 입항 불가
    if (isHeretic && ["terra", "mars", "baal", "fenris", "nocturne", "ophelia7"].includes(world.id)) {
      return { allowed: false, reason: "이단 낙인 신분으로는 제국 핵심 성역과 챕터 모성에 정상 입항할 수 없다." };
    }

    // 1. 아스타르테스 챕터 모성 (바알 · 펜리스 · 녹턴)
    if (world.id === "baal" || world.id === "fenris" || world.id === "nocturne") {
      const chapterMatch =
        (world.id === "baal" && state.chapterId === "blood_angels") ||
        (world.id === "fenris" && state.chapterId === "space_wolves") ||
        (world.id === "nocturne" && state.chapterId === "salamanders");
      const wartimeRelief =
        (world.id === "baal" && state.year >= 995 && state.year <= 1000) ||
        (world.id === "fenris" && ((state.year >= 444 && state.year <= 448) || (state.year >= 999 && state.year <= 1002)));
      const militaryReliefTree = [
        "militarum", "navy", "astartes", "grey_knights", "sororitas",
        "custodes", "imperial_knight", "inquisition", "mechanicus", "commissariat"
      ].includes(tree);

      if (chapterMatch || isInq || isCmdT5 || isNative || (wartimeRelief && militaryReliefTree)) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "아스타르테스 챕터 모성은 소속 챕터·이단심문소·고위 지휘관(Tier 5+/무역 영장)·출신자·전시 구원군만 출입할 수 있다."
      };
    }

    // 2. 신성한 테라 (소속 기관 · 임페리얼 피스트 · 고위직 Tier 4+ · 성직 순례자 신앙 65+ · 귀족 권위 45+)
    if (world.id === "terra") {
      const terraAffiliated =
        [
          "custodes", "administratum", "ecclesiarchy", "sororitas", "inquisition",
          "officio_assassinorum", "navis_navigator", "psyker", "arbites", "living_saint"
        ].includes(tree) ||
        state.chapterId === "imperial_fists" ||
        tags.includes("high_lord_terra") ||
        tags.includes("terra_elite");
      if (terraAffiliated || isHighRank || isDevout || isNoblePetition || isNative) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "신성한 테라는 소속 기관·고위직(Tier 4+)·성직 순례자(신앙 65+)·귀족(권위 45+)만 출입할 수 있다."
      };
    }

    // 3. 화성 포지 월드 (화성 조약 준수: 국교 순례 불가 — 기계교 · 해군 궤도 조선소 · 기사 가문 · 심문소 · 고위직 · 귀족 권위 45+)
    if (world.id === "mars") {
      const marsAffiliated =
        tree === "mechanicus" ||
        tree === "navy" ||
        tree === "imperial_knight" ||
        isInq ||
        tags.includes("mechanicus") ||
        tags.includes("mechanicus_blood") ||
        tags.includes("role_techmarine");
      if (marsAffiliated || isHighRank || isNoblePetition || isNative) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "화성은 기계교·제국 해군·기사 가문·심문소·고위직(Tier 4+)·귀족(권위 45+)만 출입할 수 있다."
      };
    }

    // 4. 데스 월드 · 군사 통제 행성 (크리그 · 카타찬)
    if (world.id === "krieg" || world.id === "catachan") {
      const militaryAccess = [
        "militarum", "commissariat", "inquisition", "mechanicus", "astartes",
        "navy", "rogue_trader", "imperial_knight", "officio_assassinorum", "grey_knights"
      ].includes(tree);
      if (militaryAccess || isHighRank || isNative || isHeretic) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "데스 월드·군사 통제 행성은 군·해군·기계교·심문소·고위직(Tier 4+) 또는 출신자만 출입할 수 있다."
      };
    }

    // 5. 기사 행성 (기사 가문 · 기계교 · 제국 정규 기관 · 고위직 · 귀족 권위 45+)
    if (world.id === "generic_knight") {
      const knightAccess = [
        "imperial_knight", "mechanicus", "inquisition", "rogue_trader",
        "administratum", "ecclesiarchy", "militarum", "commissariat", "navy", "astartes"
      ].includes(tree);
      if (knightAccess || isHighRank || isNoblePetition || isNative || isHeretic) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: "기사 행성은 기사 가문·기계교·제국 정규 기관·고위직(Tier 4+)·귀족(권위 45+)만 입항할 수 있다."
      };
    }

    return { allowed: true };
  }

  function getTravelProfile(state) {
    const career = getCareer(state.careerId);
    const tt = career.transitTier || "civilian";
    if (state.age < 16) {
      return { canAttempt: false, reason: "16세 이상부터 성간 이동·파견 청원이 가능하다.", authority: "미성년 제한", autoApprove: false, baseChance: 0, scope: "none" };
    }

    // 의무 복무 계급(forced · astartes_scout)은 수동 행성 선택 자체를 잠금하고 상부 파견 사건으로 일관 이동
    if (tt === "astartes_scout") {
      return {
        canAttempt: false,
        forcedLock: true,
        authority: "챕터 명령 전속 (수동 이동 잠금)",
        reason: "네오파이트 수련병은 목적지를 임의로 선택할 수 없다. 챕터 마스터와 중대장의 강제 출격령 사건으로만 파견된다.",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }

    if (tt === "forced") {
      const forcedAuth =
        career.id === "skitarii" ? "누스피어 명령 전속 (수동 이동 잠금)" :
        career.id === "inquisition_acolyte" ? "이단심문관 직속 지령 (수동 이동 잠금)" :
        career.id === "assassin_initiate" ? "암살청 사원 통제 (수동 이동 잠금)" :
        career.id === "sanctioned_psyker" ? "아스트라 텔레파티카 호송 통제 (수동 이동 잠금)" :
        "상급 지휘부 배치 전속 (수동 이동 잠금)";
      return {
        canAttempt: false,
        forcedLock: true,
        authority: forcedAuth,
        reason: "의무 복무 계급은 임의로 목적 행성을 고를 수 없다. 상부 파견 명령 사건으로 이동하며, 장교·정규 독립 계급으로 승급하면 파견 청원이 열린다.",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }

    const travelCooldown = tt === "autonomous" ? 3 : 4;
    if (state.year - state.lastTravelYear < travelCooldown) {
      const left = travelCooldown - (state.year - state.lastTravelYear);
      return { canAttempt: false, reason: `워프 항행 정비 중 (${left}년 후 가능)`, authority: "항행 대기", autoApprove: false, baseChance: 0, scope: "none" };
    }

    // 1. 절대 지휘권/무역 영장/하이 로드/군주 티어 (100% 자율 결정)
    if (tt === "autonomous") {
      return {
        canAttempt: true,
        autoApprove: true,
        baseChance: 100,
        authority: "본인 지휘권 · 영장 (즉시 출항)",
        scope: "galaxy",
        actionLabel: "즉시 함대 출항"
      };
    }

    // 2. 쿠스토데스 (황궁 칙령)
    if (tt === "custodes") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 85,
        statKey: "Inf",
        authority: "캡틴-제너럴 칙령 승인",
        scope: "galaxy",
        actionLabel: "출정 칙령 청원",
        denyText: "캡틴-제너럴이 '황금 옥좌 수호가 우선이다'라며 외부 출정을 보류했다."
      };
    }

    // 3. 아스타르테스 배틀 브라더 · 서전트 · 1중대 베테랑 (중대장 승인)
    if (tt === "astartes_brother") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 34,
        maxChance: 72,
        statKey: "Inf",
        authority: "챕터 중대장(캡틴) 승인",
        scope: "galaxy",
        actionLabel: "작전 파견 자원",
        denyText: "중대장이 '현 성계의 정화가 우선이다, 형제여'라며 타 성계 파견 요청을 반려했다."
      };
    }

    // 4. 그레이 나이트 · 팔라딘
    if (tt === "grey_knight") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 45,
        maxChance: 80,
        statKey: "WP",
        authority: "그랜드 마스터 지령 승인",
        scope: "galaxy",
        actionLabel: "악마 토벌 출정 청원",
        denyText: "타이탄의 예언자들이 아직 워프 징후가 무르익지 않았다며 출격을 보류했다."
      };
    }

    // 5. 중간 장교 / 정예 / 심문자 / 테크프리스트 / 해군 / 수녀 / 판관 / 프리펙트 / 세네샬 / 거두
    if (tt === "mid") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: 44,
        maxChance: 86,
        statKey: "Inf",
        authority: "상급 사령부 / 담당 기관 승인",
        scope: "galaxy",
        actionLabel: "파견 · 전출 요청",
        denyText: "상부 사령부에서 '대체 인력 부족 및 워프 항로 불안정'을 사유로 파견 신청을 기각했다."
      };
    }

    // 6. 이단자 · 배신자 워밴드 (밀항선/약탈선 편승)
    if (tt === "heretic") {
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: career.isTranshuman ? 52 : 32,
        maxChance: career.isTranshuman ? 86 : 78,
        statKey: career.isTranshuman ? "Inf" : "Ag",
        authority: career.isTranshuman ? "배신자 약탈선 워프 도약 (발각 위험)" : "암시장 밀항선 편승 (민첩 판정 · 발각 위험)",
        scope: career.isTranshuman ? "galaxy" : "near",
        actionLabel: career.isTranshuman ? "약탈선 출항 시도" : "밀항 시도",
        denyText: "제국 순찰 함대와 치안대의 검문에 걸려 이탈에 실패하고 격투 끝에 부상을 입었다!",
        denyWounds: -14
      };
    }

    // 7. 귀족 출신 시민/관료/성직자 (권위 45 미만 인접 성역, 45 이상 은하 전역; 의절 귀족 제외)
    if (!state.tags.includes("disowned_noble") && (state.tags.includes("noble") || state.tags.includes("rogue_trader_blood"))) {
      const canGalaxy = (state.stats && state.stats.Inf ? state.stats.Inf : 0) >= 45;
      return {
        canAttempt: true,
        autoApprove: false,
        baseChance: canGalaxy ? 58 : 42,
        maxChance: canGalaxy ? 90 : 75,
        statKey: "Inf",
        authority: canGalaxy ? "가문 사설 상선 · 은하 전역 귀족 통행" : "가문 사설 선박 · 인접 성역 귀족 통행",
        scope: canGalaxy ? "galaxy" : "near",
        actionLabel: "성간 선박 편승",
        denyText: "우주항 세관과 나비스 노빌리테의 워프 폭풍 경보로 출항 허가가 연기되었다."
      };
    }

    // 8. 일반 시민/노동자/관료/성직자 (야만 행성 민간 이탈 불가, 권위 20+ 필요, 인접 성역 순례선/화물선만)
    const curWorld = getWorld(state.worldId);
    if (curWorld && Array.isArray(curWorld.tags) && curWorld.tags.includes("feral")) {
      return {
        canAttempt: false,
        reason: "야만 행성에는 정규 우주항이 없어 정규 제국 기관 소속이나 고위 귀족이 아니면 성간 선박을 청원할 수 없다.",
        authority: "야만 행성 우주항 부재",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }
    if (state.stats.Inf < 20) {
      return {
        canAttempt: false,
        reason: "일반 시민은 권위 20+이거나 해군·기계교·심문소 등 정규 기관 중견 이상이 되어야 성간 이동을 청원할 수 있다.",
        authority: "행성 이탈 금지 (민간 통제)",
        autoApprove: false,
        baseChance: 0,
        scope: "none"
      };
    }
    return {
      canAttempt: true,
      autoApprove: false,
      baseChance: 18,
      maxChance: 55,
      statKey: "Inf",
      authority: "아드미니스트라툼 통행 허가 & 순례선 탑승",
      scope: "near",
      actionLabel: "순례선 · 화물선 탑승 청원",
      denyText: "출국 심사 서기관이 '하급 시민의 무단 행성 이탈 불가' 도장을 찍고 대기표를 압수했다."
    };
  }

  function evaluateTravelAttempt(state, targetWorldId) {
    const profile = getTravelProfile(state);
    const target = getWorld(targetWorldId);
    if (!target || target.id === state.worldId) {
      return Object.assign({}, profile, { valid: false, chance: 0, reason: "현재 거주 중인 행성이다." });
    }
    const access = canAccessWorld(state, target);
    if (!access.allowed) {
      return Object.assign({}, profile, { valid: false, chance: 0, reason: access.reason });
    }
    if (!profile.canAttempt) {
      return Object.assign({}, profile, { valid: false, chance: 0 });
    }

    const dist = getSegmentumDistance(state.segmentum, target);
    if (profile.scope === "near" && dist.level === "far") {
      return Object.assign({}, profile, {
        valid: false,
        chance: 0,
        distanceLabel: dist.label,
        reason: "현재 계급으로는 같은 성역 또는 인접 성역으로만 이동을 청원할 수 있다."
      });
    }

    if (profile.autoApprove) {
      return Object.assign({}, profile, { valid: true, chance: 100, distanceLabel: dist.label });
    }

    const statVal = state.stats[profile.statKey || "Inf"] || 25;
    const statBonus = Math.round((statVal - 30) * 0.45);
    const nihilusPen = state.globalFlags.greatRiftOpened && (target.nihilusOverride || (DATA.SEGMENTA[target.segmentum] && DATA.SEGMENTA[target.segmentum].nihilusAfterRift)) ? -12 : 0;
    const raw = profile.baseChance + statBonus + dist.bonus + nihilusPen;
    const chance = clamp(raw, 5, profile.maxChance || 90);

    return Object.assign({}, profile, {
      valid: true,
      chance,
      distanceLabel: dist.label
    });
  }

  function getTravelCandidateWorlds(state) {
    const profile = getTravelProfile(state);
    if (!profile.canAttempt) return [];
    return DATA.WORLDS.filter((w) => {
      if (w.id === state.worldId) return false;
      if (!w.named && w.id !== "voidborn" && w.id !== "generic_knight") return false;
      if (!canAccessWorld(state, w).allowed) return false;
      const dist = getSegmentumDistance(state.segmentum, w);
      if (profile.scope === "near" && dist.level === "far") return false;
      return true;
    }).sort((a, b) => {
      const da = getSegmentumDistance(state.segmentum, a).bonus;
      const db = getSegmentumDistance(state.segmentum, b).bonus;
      return db - da;
    });
  }

  function pickHotspotOrNearbyWorlds(state) {
    const valid = DATA.WORLDS.filter((w) => {
      if (w.id === state.worldId || !w.named) return false;
      if (!canAccessWorld(state, w).allowed) return false;
      return true;
    });
    if (valid.length < 2) return [];

    // 역사 격전지 임박 시 최우선 파견 후보로 반영!
    const hotIds = [];
    if (state.year >= 136 && state.year <= 151) hotIds.push("cadia");
    if (state.year >= 441 && state.year <= 446) hotIds.push("armageddon", "fenris");
    if (state.year >= 938 && state.year <= 941) hotIds.push("armageddon");
    if (state.year >= 995 && state.year <= 997) hotIds.push("baal", "macragge");
    if (state.year >= 995 && state.year <= 998) hotIds.push("armageddon");
    if (state.year >= 996 && state.year <= 999) hotIds.push("cadia", "baal");
    if (state.year >= 999 && state.year <= 1001) hotIds.push("terra", "macragge");
    if (state.year >= 1011 && state.year <= 1015) hotIds.push("macragge");
    if (state.year >= 754 && state.year <= 764) hotIds.push("tanith");

    const hotWorlds = valid.filter((w) => hotIds.includes(w.id));
    const nearby = valid.filter((w) => {
      const dist = getSegmentumDistance(state.segmentum, w);
      return dist.level === "same" || dist.level === "near";
    });

    const pool = nearby.length >= 2 ? nearby : valid;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    if (hotWorlds.length > 0 && Math.random() < 0.65) {
      const primary = hotWorlds[randInt(0, hotWorlds.length - 1)];
      const secondary = shuffled.find((w) => w.id !== primary.id) || shuffled[0];
      return [primary, secondary];
    }
    return [shuffled[0], shuffled[1]];
  }

  function createWarpAnomalyTransitEvent(state, destWorld, forcedVariant = null) {
    if (!destWorld) return null;
    const maxShift = state.globalFlags.greatRiftOpened ? 3 : 2;
    const canTimeShift =
      (state.year < 995 || state.year >= 1002) &&
      (!destWorld.destroyedYear || state.year + maxShift < destWorld.destroyedYear);
    const variant = forcedVariant || (canTimeShift && Math.random() < 0.5 ? "dilation" : "geller");
    const wTag = getWorldShortTag(destWorld);

    if (variant === "dilation") {
      const shift = state.globalFlags.greatRiftOpened ? 3 : 2;
      return {
        id: `dyn_warp_dilation_${state.year}`,
        isTimeline: false,
        category: "워프 항해 이상",
        reqLabel: "성간 이동 · 워프 시간 왜곡",
        title: `워프 시간 왜곡 — [${destWorld.name}] 궤도에 도착한 미래의 달력`,
        text: `[${destWorld.name}](${wTag}) 성계로 향하던 워프 항해가 기묘한 조류에 휘말렸다. 함선 시계로는 고작 몇 주가 흘렀을 뿐인데, 실우주로 복귀해 아스트로패스 표준시와 동기화한 순간 함교 전체가 경악했다. 바깥 은하에서는 이미 ${shift}년의 세월이 흘러가 있었다!`,
        choices: [
          {
            label: "[지성 판정] 어긋난 항해 일지와 최신 성계 전황 보고서를 신속히 대조해 바뀐 정세에 적응한다",
            check: { stat: "Int", diff: 0 },
            success: {
              text: `시간 도약(+${shift}년 · 생물학적 연령 유지)의 혼란을 단숨에 정리하고 [${destWorld.name}]의 바뀐 판세를 정확히 읽어 냈다!`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { Int: 5, Inf: 4 }
            },
            fail: {
              text: `예전 기밀 암호가 전부 만료되어 입항 검문소에서 한동안 곤욕을 치른 뒤에야 [${destWorld.name}]에 상륙했다.`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { Int: 2, Inf: -2 }
            }
          },
          {
            label: "[의지 판정] 고향 식구들이 훌쩍 늙어 버렸다는 충격에 패닉에 빠진 선원들을 진정시킨다",
            check: { stat: "WP", diff: 0 },
            success: {
              text: `워프의 변덕 앞에서도 흔들리지 않는 중심을 세워 선내 소동을 잠재우고 [${destWorld.name}]에 무사히 하선했다!`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { WP: 5, Fel: 4 }
            },
            fail: {
              text: `시간 감각의 괴리와 불면증에 시달리며 지친 몸으로 [${destWorld.name}] 부두에 발을 디뎠다.`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              wounds: -8,
              stats: { WP: 3 }
            }
          },
          {
            label: "워프의 조류는 필멸자가 거스를 수 없는 법이라며 침묵 속에 하선 절차를 밟는다",
            effect: {
              text: `어느새 ${shift}년 뒤의 시간대로 건너와 [${destWorld.name}](${wTag})에 착임했다. 세월을 건너뛴 기묘한 여운이 남았다.`,
              moveWorld: destWorld.id,
              warpYearShift: shift,
              stats: { WP: 3 }
            }
          }
        ],
        source: "Lexicanum: Warp Travel / Time Dilation Lore"
      };
    }

    return {
      id: `dyn_warp_geller_${state.year}`,
      isTimeline: false,
      category: "워프 항해 이상",
      reqLabel: "성간 이동 · 겔러 필드 요동",
      title: `겔러 필드 요동 — [${destWorld.name}] 항로의 공포스러운 3초`,
      text: `[${destWorld.name}](${wTag}) 방면으로 워프 항해하던 도중, 갑판의 모든 조명이 핏빛으로 꺼졌다 켜지며 겔러 필드가 3초간 격렬하게 요동쳤다! 방화 격벽 너머로 기괴한 웃음소리가 스며들고, 하부 기관실의 경보 사이렌이 미친 듯이 울부짖는다.`,
      choices: [
        {
          label: "[의지 판정] 황제 찬송가를 목청껏 외치며 흔들리는 갑판 선원들을 붙들어 광기의 전염을 막는다",
          check: { stat: "WP", diff: -5 },
          success: {
            text: `불굴의 신앙이 선실의 공포를 억눌렀다! 겔러 필드가 안정을 되찾고 무사히 [${destWorld.name}] 궤도에 도달했다.`,
            moveWorld: destWorld.id,
            stats: { WP: 6, Fel: 4 },
            faith: 6,
            corruption: -3
          },
          fail: {
            text: `찰나의 워프 환청이 정신을 긁고 지나가 악몽과 오염의 흔적을 남긴 채 [${destWorld.name}]에 도착했다.`,
            moveWorld: destWorld.id,
            wounds: -12,
            corruption: 7,
            stats: { WP: 2 }
          }
        },
        {
          label: "[지성 판정] 엔지니어들과 함께 보조 플라즈마 도관을 수동 절체해 겔러 필드 출력을 긴급 복구한다",
          check: { stat: "Int", diff: -5 },
          success: {
            text: `번개 같은 회로 절체로 겔러 필드의 균열을 봉합했다! 함장이 그대를 함선의 은인으로 치하하며 [${destWorld.name}]에 상륙시켰다.`,
            moveWorld: destWorld.id,
            stats: { Int: 6, Inf: 5 }
          },
          fail: {
            text: `과전류 방전에 손을 데었으나, 다행히 겔러 필드가 완전히 붕괴하기 전에 출력이 복구되어 [${destWorld.name}]에 닿았다.`,
            moveWorld: destWorld.id,
            wounds: -14,
            stats: { Int: 3 }
          }
        },
        {
          label: "즉시 기밀 방화 격벽 안으로 대피해 실우주 복귀 신호가 울릴 때까지 눈을 감고 기도한다",
          effect: {
            text: `공포스러운 진동 끝에 함선이 가까스로 실우주로 빠져나와 [${destWorld.name}](${wTag}) 궤도에 정박했다.`,
            moveWorld: destWorld.id,
            stats: { WP: 3 },
            corruption: 2
          }
        }
      ],
      source: "Lexicanum: Geller Field / Rogue Trader Core Rulebook"
    };
  }

  function createDynamicTransitEvent(state) {
    const pair = pickHotspotOrNearbyWorlds(state);
    if (pair.length < 2) return null;
    const [w1, w2] = pair;
    const c = state.careerId;
    const career = getCareer(c);
    const tt = career.transitTier || "civilian";
    const isHeretic = tt === "heretic" || career.tree === "chaos" || state.tags.includes("heretic") || state.tags.includes("chaos_aligned");

    const isForced = !isHeretic && (tt === "forced" || tt === "astartes_scout");
    const isAutonomous = !isHeretic && (tt === "autonomous" || tt === "custodes");
    const isMidOfficer = !isHeretic && (tt === "mid" || tt === "astartes_brother" || tt === "grey_knight");
    const isInstitutionalCivil = !isHeretic && (career.tree === "administratum" || career.tree === "ecclesiarchy");

    // 0) 카오스 · 이단자 전용 성간 이동 (제국 사령부·순례선·징발선 이벤트 노출 원천 차단)
    if (isHeretic) {
      const isWarbandApex = Boolean(career.isTranshuman) || career.id === "chaos_champion" || career.id === "chaos_lord" || career.id === "daemon_prince";
      if (isWarbandApex) {
        return {
          id: `dyn_chaos_raid_${state.year}`,
          isTimeline: false,
          category: "워밴드 원정",
          reqLabel: "배신자 약탈 함대 · 워프 항로",
          title: "워밴드 약탈 함대 — 워프 침공 항로 개방",
          text: `워프의 틈새가 열리며 제국 성계의 방어선이 흔들리고 있다. 배신자 약탈 함대의 기함에서 [${w1.name}] 또는 [${w2.name}] 성계를 향한 약탈·침공 출정 명령을 내릴 수 있다.`,
          choices: [
            {
              label: `[${w1.name}] 성계로 워밴드 함대를 몰아 약탈 원정에 나선다 (${getWorldShortTag(w1)})`,
              effect: {
                text: `워프 폭풍을 뚫고 [${w1.name}](${getWorldShortTag(w1)}) 궤도에 기습 출현했다.`,
                moveWorld: w1.id,
                stats: { WS: 1, Inf: 1 }
              }
            },
            {
              label: `[${w2.name}] 성계로 약탈 함대를 돌려 제국 보급선을 유린한다 (${getWorldShortTag(w2)})`,
              effect: {
                text: `검은 깃발을 내건 약탈선이 [${w2.name}](${getWorldShortTag(w2)}) 성계 외곽에 침투했다.`,
                moveWorld: w2.id,
                stats: { BS: 1, Inf: 1 }
              }
            },
            {
              label: "현재 거점에서 워밴드 세력과 의식을 더욱 결집한다",
              effect: {
                text: "현 거점의 지하 제단과 약탈 물자를 정리하며 다음 성전을 준비했다.",
                stats: { WP: 1 }
              }
            }
          ],
          source: "Codex: Chaos Space Marines / Black Crusade"
        };
      }
      return {
        id: `dyn_heretic_smuggle_${state.year}`,
        isTimeline: false,
        category: "암시장 밀항",
        reqLabel: "이단 비밀 항로 · 밀항선",
        title: "이단 심문망을 피해 출항하는 암시장 밀항선",
        text: `치안대와 이단심문소의 수사망이 좁혀 오자 밀교단 접선책이 은밀한 화물선 밀항 경로를 마련했다. [${w1.name}] 또는 [${w2.name}] 방면으로 거처를 옮길 기회다.`,
        choices: [
          {
            label: `[${w1.name}] 방면 암시장 밀항선에 몸을 싣는다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `화물칸 깊은 곳에 숨어 워프 항해를 견딘 끝에 [${w1.name}](${getWorldShortTag(w1)}) 하층 구역에 잠입했다.`,
              moveWorld: w1.id,
              stats: { Ag: 1 }
            }
          },
          {
            label: `[${w2.name}] 방면 암시장 밀항선에 몸을 싣는다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `검문망을 따돌리고 [${w2.name}](${getWorldShortTag(w2)}) 외곽 우주항에 몰래 발을 디뎠다.`,
              moveWorld: w2.id,
              stats: { Ag: 1 }
            }
          },
          {
            label: "위험한 밀항을 포기하고 현 하층 은신처에 더 깊이 숨는다",
            effect: {
              text: "발각 위험을 피해 현재 거점의 지하 비밀 결사에 머물기로 했다.",
              stats: { Int: 1 }
            }
          }
        ],
        source: "Dark Heresy / Black Crusade Lore"
      };
    }

    // 민간/시민/귀족 이동 가능성 사전 점검 (야만 행성·극빈층 원천 차단, 행정청·국교 기관 파견은 예외)
    if (!isForced && !isAutonomous && !isMidOfficer && !isInstitutionalCivil) {
      const curWorld = getWorld(state.worldId);
      if (curWorld.tags.includes("feral") || (state.stats.Inf < 18 && !state.tags.includes("noble") && !state.tags.includes("voidborn"))) {
        return null;
      }
    }

    // 워프 항해 이상 변주 (평시 10%, 대균열 개방 후 16% 확률로 겔러 필드 요동 / 워프 시간 왜곡 발생)
    const warpAnomalyChance = state.globalFlags.greatRiftOpened ? 0.16 : 0.10;
    if (Math.random() < warpAnomalyChance) {
      return createWarpAnomalyTransitEvent(state, w1);
    }

    // 1) 말단·하급 의무 파견 직군 (거부권 없음 — 강제 성간 파견!)
    if (isForced) {
      const absoluteObey =
        c === "astartes_scout" ||
        c === "skitarii" ||
        c === "tempestus_scion" ||
        c === "inquisition_acolyte" ||
        c === "knight_squire" ||
        c === "assassin_initiate" ||
        c === "sororitas_novitiate" ||
        state.homeWorldId === "krieg";
      let title, text, badge;
      if (c === "astartes_scout") {
        title = `강제 출격령 — [${w1.name}] 성계 선봉 정찰 파견`;
        text = `챕터 마스터와 중대장의 작전 명령이 하달되었다. 10중대 네오파이트에게 선택권은 없다. 즉시 타격 순양함에 승선해 [${w1.name}](${getWorldShortTag(w1)}) 작전 구역으로 출격한다.`;
        badge = "강제 파견";
      } else if (c === "skitarii") {
        title = `누스피어 파견 칙령 — [${w1.name}] 강제 배치`;
        text = `상급 마고스의 이진법 전송 명령이 신경 회로에 각인되었다. 스키타리 군단 소속으로 [${w1.name}](${getWorldShortTag(w1)}) 주둔지에 즉시 배치된다.`;
        badge = "강제 파견";
      } else if (c === "inquisition_acolyte") {
        title = `이단심문관의 밀명 — [${w1.name}] 급파 지령`;
        text = `스승 이단심문관으로부터 거절 불가한 암호 명령이 떨어졌다. 오늘 밤 비밀 셔틀을 타고 [${w1.name}](${getWorldShortTag(w1)})의 이단 첩보 현장으로 급파된다.`;
        badge = "강제 파견";
      } else if (c === "assassin_initiate") {
        title = `암살청 사원 급파령 — [${w1.name}] 표적 추적`;
        text = `사원 마스터의 봉인된 작전 지령서가 하달되었다. 침묵 속에 고속 잠입정에 올라 [${w1.name}](${getWorldShortTag(w1)}) 성계로 즉각 투입된다.`;
        badge = "강제 파견";
      } else if (c === "sanctioned_psyker") {
        title = `아스트라 텔레파티카 배속령 — [${w1.name}] 전선 호송`;
        text = `스콜라스티카 사이카나의 배속 통지서가 떨어졌다. 감시관의 호위 아래 [${w1.name}](${getWorldShortTag(w1)}) 전선 사령부로 강제 이송된다.`;
        badge = "강제 파견";
      } else if (c === "sororitas_novitiate") {
        title = `수녀원 성전 동원령 — [${w1.name}] 수련단 파견`;
        text = `수녀원장의 명령으로 수련단 전원이 순례 수송선에 집결했다. 황제의 이름을 높이 들며 [${w1.name}](${getWorldShortTag(w1)}) 성계 방어전에 투입된다.`;
        badge = "강제 파견";
      } else if (c === "knight_squire") {
        title = `기사 가문 출정령 — [${w1.name}] 종자 호위 배치`;
        text = `가문의 남작 기사가 출정을 선포했다. 아미저 조종석에 오른 종자는 주군의 측면을 지키며 [${w1.name}](${getWorldShortTag(w1)}) 전선으로 강하한다.`;
        badge = "강제 파견";
      } else {
        title = `군부 파견 명령서 — [${w1.name}] 전선 강제 수송`;
        text = `아스트라 밀리타룸 사령부의 재배치 칙령이 떨어졌다. 연대 전원이 병력 수송선에 강제 승선해 [${w1.name}](${getWorldShortTag(w1)}) 전선으로 투입된다!`;
        badge = "강제 파견";
      }

      const choices = [
        {
          label: `명령에 복종해 선봉 강습 편대로 [${w1.name}]행 수송선에 오른다`,
          effect: {
            text: `상부의 강제 파견 명령에 따라 [${w1.name}](${getWorldShortTag(w1)}) 전선에 도착해 최전방에 배치되었다.`,
            moveWorld: w1.id,
            stats: { WP: 2, WS: 1, BS: 1 }
          }
        },
        {
          label: `명령에 복종해 정찰·지원 편대로 [${w1.name}]행 수송선에 오른다`,
          effect: {
            text: `워프 항해를 거쳐 [${w1.name}](${getWorldShortTag(w1)})에 도착해 정찰 및 보급 지원 임무를 부여받았다.`,
            moveWorld: w1.id,
            stats: { Ag: 2, Int: 1 }
          }
        }
      ];

      if (!absoluteObey) {
        choices.push({
          label: "[권위 판정 · 극난이도] 행정 착오와 부상을 호소하며 파견 보류를 탄원한다",
          check: { stat: "Inf", diff: -20 },
          success: {
            text: "기적적으로 병참 서류 틈새를 파고들어 이번 파견 명단에서 겨우 제외되었다!",
            stats: { Int: 2, Inf: -2 }
          },
          fail: {
            text: "커미사르와 상급 장교에게 '군무 기피 시도'로 태형 처분을 받은 뒤 결국 사슬에 묶여 강제로 수송선에 실렸다!",
            moveWorld: w1.id,
            wounds: -18,
            stats: { Inf: -4 }
          }
        });
      }

      return {
        id: `dyn_deploy_${state.year}`,
        isTimeline: false,
        category: badge,
        reqLabel: "의무 복무 파견 (상부 명령)",
        title,
        text,
        choices,
        source: "Astra Militarum / Imperial Chain of Command"
      };
    }

    // 2) 최고위 지휘권자 (완전 자율 선택권 — 지원 요청 수락/거절 자유!)
    if (isAutonomous) {
      return {
        id: `dyn_cmd_transit_${state.year}`,
        isTimeline: false,
        category: "지휘관 원정",
        reqLabel: "최고위 지휘권자 자율 결정",
        title: "성역 사령부의 원정 지원 요청",
        text: `고위 지휘권자인 그대에게 두 행성으로부터 긴급 지원·시찰 요청이 올라왔다. 물론 최종 항로 결정권은 전적으로 그대에게 있다.`,
        choices: [
          {
            label: `[${w1.name}] 방면으로 함대를 출항시킨다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `지휘권을 행사해 기함을 몰고 [${w1.name}](${getWorldShortTag(w1)}) 궤도에 당도했다!`,
              moveWorld: w1.id,
              stats: { Inf: 2 }
            }
          },
          {
            label: `[${w2.name}] 방면으로 함대를 출항시킨다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `지휘권을 행사해 기함을 몰고 [${w2.name}](${getWorldShortTag(w2)}) 궤도에 당도했다!`,
              moveWorld: w2.id,
              stats: { Inf: 2 }
            }
          },
          {
            label: "요청을 반려하고 현재 거점에서 독자 작전을 이어간다",
            effect: {
              text: "현재 성계의 현안을 우선하기로 결단했다.",
              stats: { Int: 1, Inf: 1 }
            }
          }
        ],
        source: "Imperial High Command Lore"
      };
    }

    // 3) 중간 계급 (소속 기관 성격에 따른 파견지 택1 + 잔류 보고)
    if (isMidOfficer) {
      if (career.tree === "ecclesiarchy" || career.tree === "sororitas") {
        return {
          id: `dyn_transit_faith_${state.year}`,
          isTimeline: false,
          category: "성지 파견 선택",
          reqLabel: "국교 · 성전 교구 순회 소환",
          title: "대교구 성지 순례 · 교구 시찰 소환",
          text: "추기경 회의에서 이단 척결과 신앙 재건을 위해 두 성계 중 한 곳으로 순회 파견을 맡길 수석 봉사자를 지명했다.",
          choices: [
            {
              label: `[${w1.name}] 교구 순례 및 신앙 시찰을 택한다 (${getWorldShortTag(w1)})`,
              effect: {
                text: `성가대의 축복 속에 워프 항해를 마치고 [${w1.name}](${getWorldShortTag(w1)}) 대성당에 부임했다!`,
                moveWorld: w1.id,
                faith: 4,
                stats: { WP: 2, Fel: 1 }
              }
            },
            {
              label: `[${w2.name}] 교구 순례 및 신앙 시찰을 택한다 (${getWorldShortTag(w2)})`,
              effect: {
                text: `성가대의 축복 속에 워프 항해를 마치고 [${w2.name}](${getWorldShortTag(w2)}) 대성당에 부임했다!`,
                moveWorld: w2.id,
                faith: 4,
                stats: { WP: 2, Fel: 1 }
              }
            },
            {
              label: "현 교구의 이단 색출이 시급하다며 잔류를 청원한다",
              effect: {
                text: "대교구가 현지의 위급함을 인정해 교구 잔류를 승인했다.",
                faith: 2,
                stats: { WP: 1 }
              }
            }
          ],
          source: "Adeptus Ministorum / Ecclesiarchy Lore"
        };
      }

      if (career.tree === "administratum") {
        return {
          id: `dyn_transit_audit_${state.year}`,
          isTimeline: false,
          category: "행정 감사 파견",
          reqLabel: "아드미니스트라툼 성계 십일조 감사",
          title: "아드미니스트라툼 성계 십일조 특별 감사령",
          text: "성역 행정 본부에서 누적된 십일조 미납분을 조사하고 양피지 기록을 대조하기 위해 두 성계 중 한 곳의 감사단장을 맡아 달라는 통첩이 왔다.",
          choices: [
            {
              label: `[${w1.name}] 성계 십일조 감사단으로 출항한다 (${getWorldShortTag(w1)})`,
              effect: {
                text: `봉인된 행정 인장을 휴대하고 [${w1.name}](${getWorldShortTag(w1)}) 성계 행정청 감사에 착수했다!`,
                moveWorld: w1.id,
                stats: { Int: 2, Inf: 1 }
              }
            },
            {
              label: `[${w2.name}] 성계 십일조 감사단으로 출항한다 (${getWorldShortTag(w2)})`,
              effect: {
                text: `봉인된 행정 인장을 휴대하고 [${w2.name}](${getWorldShortTag(w2)}) 성계 행정청 감사에 착수했다!`,
                moveWorld: w2.id,
                stats: { Int: 2, Inf: 1 }
              }
            },
            {
              label: "현 성계 결산 문서를 먼저 마무리하겠다며 파견 연기를 보고한다",
              effect: {
                text: "상부가 문서 결산의 중요성을 인정해 현지 잔류를 허가했다.",
                stats: { Int: 1 }
              }
            }
          ],
          source: "Adeptus Administratum / Imperial Tithe Lore"
        };
      }

      return {
        id: `dyn_transit_${state.year}`,
        isTimeline: false,
        category: "작전 배치 선택",
        reqLabel: "중간 계급 · 파견지 택1",
        title: "상급 사령부의 작전 구역 배치 통보",
        text: "그대의 계급과 전공을 참작해 상부에서 두 곳의 파견지 중 자원 배속을 선택할 재량을 주었다. 어느 성계로 향할 것인가?",
        choices: [
          {
            label: `[${w1.name}] 전선 파견을 선택한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `작전 배치 명령을 수령하고 [${w1.name}](${getWorldShortTag(w1)})에 착임했다!`,
              moveWorld: w1.id,
              stats: { WP: 2, Inf: 1 }
            }
          },
          {
            label: `[${w2.name}] 전선 파견을 선택한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `작전 배치 명령을 수령하고 [${w2.name}](${getWorldShortTag(w2)})에 착임했다!`,
              moveWorld: w2.id,
              stats: { WP: 2, Inf: 1 }
            }
          },
          {
            label: "현 주둔지 방어 임무의 중요성을 보고하고 잔류를 승인받는다",
            effect: {
              text: "상부가 그대의 의견을 받아들여 현 거점 수비 임무를 연장했다.",
              stats: { Inf: 1 }
            }
          }
        ],
        source: "Imperial Void Transit / Battlefleet Lore"
      };
    }

    // 4) 비군사 정규 기관 소환 (행정청 감사 파견 · 국교 성지 순례)
    if (career.tree === "administratum") {
      return {
        id: `dyn_admin_audit_${state.year}`,
        isTimeline: false,
        category: "행정 감사 소환",
        reqLabel: "아드미니스트라툼 실사단 파견",
        title: "아드미니스트라툼 십일조 장부 대조 파견령",
        text: `행정청 상급 서기국에서 타 성계 행정청의 세수 장부를 대조할 실사 서기관 차출 통첩이 내려왔다. [${w1.name}] 또는 [${w2.name}] 감사선에 승선할 수 있다.`,
        choices: [
          {
            label: `[${w1.name}] 행정 감사선에 승선한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `행정청 호송선을 타고 [${w1.name}](${getWorldShortTag(w1)})에 도착해 십일조 실사 업무에 착수했다.`,
              moveWorld: w1.id,
              stats: { Int: 2, Inf: 1 }
            }
          },
          {
            label: `[${w2.name}] 행정 감사선에 승선한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `행정청 호송선을 타고 [${w2.name}](${getWorldShortTag(w2)})에 도착해 십일조 실사 업무에 착수했다.`,
              moveWorld: w2.id,
              stats: { Int: 2, Inf: 1 }
            }
          },
          {
            label: "현 청사의 미결 문서가 산적했다며 보류 신청서를 제출한다",
            effect: {
              text: "복잡한 서류 절차 끝에 이번 순회 감사 명단에서 빠지고 현 근무지에 남았다.",
              stats: { Int: 1 }
            }
          }
        ],
        source: "Adeptus Administratum Lore"
      };
    }

    if (career.tree === "ecclesiarchy") {
      return {
        id: `dyn_eccl_pilgrim_${state.year}`,
        isTimeline: false,
        category: "성지 순례 소환",
        reqLabel: "에클레시아키 순례 · 선교 소환",
        title: "에클레시아키 성지 순례 및 교구 선교 소환",
        text: `대성당 주교좌에서 타 행성 신도들의 신앙을 독려할 순례 선교단을 꾸렸다. [${w1.name}] 또는 [${w2.name}] 방면 순례선에 합류할 소명이 내려왔다.`,
        choices: [
          {
            label: `[${w1.name}] 성지 순례 선교단에 합류한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `성가대의 찬송 속에 워프 항해를 마치고 [${w1.name}](${getWorldShortTag(w1)}) 교구에 도착했다.`,
              moveWorld: w1.id,
              faith: 4,
              stats: { WP: 1, Fel: 1 }
            }
          },
          {
            label: `[${w2.name}] 성지 순례 선교단에 합류한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `성가대의 찬송 속에 워프 항해를 마치고 [${w2.name}](${getWorldShortTag(w2)}) 교구에 도착했다.`,
              moveWorld: w2.id,
              faith: 4,
              stats: { WP: 1, Fel: 1 }
            }
          },
          {
            label: "현 본당의 신도들을 지키는 것이 우선이라며 남는다",
            effect: {
              text: "현 교구의 성당을 굳건히 지키며 봉사를 이어 갔다.",
              faith: 2
            }
          }
        ],
        source: "Adeptus Ministorum / Imperial Pilgrimage Lore"
      };
    }

    // 5) 귀족 가문 · 성역 궁정 알현 소환 (의절 귀족 제외)
    if (!state.tags.includes("disowned_noble") && (state.tags.includes("noble") || state.tags.includes("rogue_trader_blood"))) {
      return {
        id: `dyn_noble_court_${state.year}`,
        isTimeline: false,
        category: "궁정 알현 · 사절",
        reqLabel: "귀족 가문 성역 사절단",
        title: "성역 궁정 알현 및 귀족 가문 사절단 출항",
        text: `가문의 명예를 드높이고 교역 협정을 갱신할 성역 귀족 회의 소집장이 날아들었다. 사설 쾌속선을 타고 [${w1.name}] 또는 [${w2.name}]의 상층 궁정으로 향할 기회다.`,
        choices: [
          {
            label: `[${w1.name}] 궁정 사절단으로 출항한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `가문 문장을 단 쾌속선을 타고 [${w1.name}](${getWorldShortTag(w1)}) 상층 첨탑 궁정에 입성했다.`,
              moveWorld: w1.id,
              stats: { Inf: 2, Fel: 1 }
            }
          },
          {
            label: `[${w2.name}] 궁정 사절단으로 출항한다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `가문 문장을 단 쾌속선을 타고 [${w2.name}](${getWorldShortTag(w2)}) 상층 첨탑 궁정에 입성했다.`,
              moveWorld: w2.id,
              stats: { Inf: 2, Fel: 1 }
            }
          },
          {
            label: "대리 사절을 보내고 현재 영지 기반을 다진다",
            effect: {
              text: "직접 출항하는 대신 가신단을 보내고 현지 영향력을 관리했다.",
              stats: { Inf: 1 }
            }
          }
        ],
        source: "Rogue Trader / Imperial Nobility Lore"
      };
    }

    // 6) 전시 비상 동원 · 구호 선단 (대규모 역사 전선 임박 시)
    const isWarHotspot =
      (w1.id === "armageddon" && ((state.year >= 938 && state.year <= 941) || (state.year >= 995 && state.year <= 998))) ||
      (w1.id === "cadia" && state.year >= 995 && state.year <= 999) ||
      (w1.id === "macragge" && ((state.year >= 995 && state.year <= 1001) || (state.year >= 1011 && state.year <= 1015)));
    if (isWarHotspot) {
      return {
        id: `dyn_wartime_levy_${state.year}`,
        isTimeline: false,
        category: "전시 비상 동원",
        reqLabel: "성역 전시 보급 · 구호 선단",
        title: `성역 전시 비상 동원 — [${w1.name}] 보급 · 구호 수송 선단`,
        text: `[${w1.name}] 성계의 전황이 급박해지면서 성역 전체에 전시 보급·기술·구호 인력 비상 징발령이 선포되었다. 수송 선단에 합류해 전선 후방 지원에 참여할 것인가?`,
        choices: [
          {
            label: `[${w1.name}] 전시 보급·구호 선단에 자원 합류한다 (${getWorldShortTag(w1)})`,
            effect: {
              text: `전시 수송 선단을 타고 [${w1.name}](${getWorldShortTag(w1)}) 성계 후방 보급 기지에 도착했다.`,
              moveWorld: w1.id,
              stats: { WP: 2, Inf: 1 }
            }
          },
          {
            label: `상대적으로 안전한 [${w2.name}] 방면 중계 수송선에 오른다 (${getWorldShortTag(w2)})`,
            effect: {
              text: `중계 수송선을 타고 [${w2.name}](${getWorldShortTag(w2)})에 도착해 후방 군수 업무를 맡았다.`,
              moveWorld: w2.id,
              stats: { Int: 1 }
            }
          },
          {
            label: "현 행성의 전시 생산 할당량을 지키는 쪽을 택한다",
            effect: {
              text: "현지 공장과 시설에 남아 전시 생산 할당량을 채우는 데 매진했다.",
              stats: { T: 1 }
            }
          }
        ],
        source: "Departmento Munitorum / Imperial War Effort Lore"
      };
    }

    // 7) 일반 민간 순례선 · 차티스트 상선단
    const curWorld = getWorld(state.worldId);
    if (curWorld.tags.includes("feral") || (state.stats.Inf < 18 && !state.tags.includes("noble") && !state.tags.includes("voidborn"))) {
      return null;
    }

    return {
      id: `dyn_transit_${state.year}`,
      isTimeline: false,
      category: "성간 항해",
      reqLabel: "민간 순례선 · 차티스트 상선단",
      title: "궤도에 정박한 성간 순례선 · 차티스트 상선단",
      text: "수십 년 만에 대형 성간 상선단이 행성 궤도에 기항했다. 인접 성역의 유명 행성으로 향하는 선실과 수행원 자리가 열렸다.",
      choices: [
        {
          label: `[${w1.name}] 방면 상선단에 탑승한다 (${getWorldShortTag(w1)})`,
          effect: {
            text: `워프 항해를 거쳐 [${w1.name}](${getWorldShortTag(w1)})에 도착했다!`,
            moveWorld: w1.id,
            stats: { WP: 1 }
          }
        },
        {
          label: `[${w2.name}] 방면 상선단에 탑승한다 (${getWorldShortTag(w2)})`,
          effect: {
            text: `워프 항해를 거쳐 [${w2.name}](${getWorldShortTag(w2)})에 도착했다!`,
            moveWorld: w2.id,
            stats: { WP: 1 }
          }
        },
        {
          label: "낯선 워프 항해는 위험하다. 현재 행성에 남는다",
          effect: {
            text: "정든 터전에 남아 생업을 이어 가기로 했다.",
            stats: { T: 1 }
          }
        }
      ],
      source: "Chartist Captains / Imperial Pilgrimage"
    };
  }


  return {
    getSegmentumDistance,
    canAccessWorld,
    getTravelProfile,
    evaluateTravelAttempt,
    getTravelCandidateWorlds,
    pickHotspotOrNearbyWorlds,
    createWarpAnomalyTransitEvent,
    createDynamicTransitEvent
  };
}
