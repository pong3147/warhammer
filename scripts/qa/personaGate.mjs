// Gate 4P: 대표 22페르소나 × 2난이도 4대 직교 계층 정합성 · 금칙어 누출 0건 · 최소 연대기 풀 하한(>= 8) + 500개 무작위 카테시안 조합 퍼저
export const SURFACE_ONLY_LANDMARK_RE =
  /노점상|하층\s*배수로|지하\s*배수로|상층\s*첨탑|거주구\s*벽보|선술집\s*골목|총독궁|산성비|대성당.*포위|농작물|추수|밀밭|비바람|소나기|모래폭풍|들판|숲속|하늘을\s*가르며|밤하늘을\s*가로지르는|장터\s*골목|동네\s*광장|구역\s*광장|지표면\s*행군|황무지\s*순찰|도시\s*하수도|마을\s*우물|우주공항/;

const VOID_NATIVE_TREES = new Set(["navy", "rogue_trader", "navis_navigator"]);

export function isVoidNativeReq(req) {
  if (!req) return false;
  if (Array.isArray(req.anyHabitats) && req.anyHabitats.includes("void")) return true;
  if (Array.isArray(req.anyWorlds) && req.anyWorlds.includes("voidborn")) return true;
  if (Array.isArray(req.anyHomeWorlds) && req.anyHomeWorlds.includes("voidborn")) return true;
  if (Array.isArray(req.anyWorldTags) && req.anyWorldTags.includes("voidborn")) return true;
  if (Array.isArray(req.anyRealms) && req.anyRealms.includes("void")) return true;
  if (Array.isArray(req.allTags) && (req.allTags.includes("voidborn") || req.allTags.includes("shore_leave_void"))) return true;
  if (Array.isArray(req.anyTags) && (req.anyTags.includes("voidborn") || req.anyTags.includes("shore_leave_void"))) return true;
  if (Array.isArray(req.anyTrees) && req.anyTrees.length > 0 && req.anyTrees.every((t) => VOID_NATIVE_TREES.has(t))) return true;
  if (
    Array.isArray(req.anyCareers) &&
    req.anyCareers.length > 0 &&
    req.anyCareers.every((cid) =>
      [
        "imperial_navy",
        "navy_captain",
        "navy_admiral",
        "lord_high_admiral",
        "rt_seneschal",
        "rogue_trader",
        "rt_lord_captain",
        "nav_apprentice",
        "nav_senior",
        "nav_novator",
        "paternoval_envoy"
      ].includes(cid)
    )
  ) {
    return true;
  }
  if (Array.isArray(req.or) && req.or.length > 0 && req.or.every((sub) => isVoidNativeReq(sub))) return true;
  return false;
}

export function runPersonaAuditGate({ DATA, Engine, fail }) {
  const makePersonaState = (opts) => {
    const st = Engine.createCharacter({
      mode: "custom",
      difficulty: opts.difficulty || "standard",
      worldId: opts.worldId,
      originId: opts.originId,
      traitId: opts.traitId || "none",
      eraId: opts.eraId || "armageddon",
      gender: opts.gender || "male"
    });
    st.age = opts.age;
    st.year = st.birthYear + st.age;
    if (opts.careerId) st.careerId = opts.careerId;
    if (opts.chapterId) {
      st.chapterId = opts.chapterId;
      st.chapterName = Engine.getChapter(opts.chapterId)?.name || null;
    }
    if (opts.tags) st.tags = [...new Set([...st.tags, ...opts.tags])];
    if (opts.faith !== undefined) st.faith = opts.faith;
    if (opts.corruption !== undefined) st.corruption = opts.corruption;
    if (opts.stats) st.stats = { ...st.stats, ...opts.stats };
    return st;
  };

  const NOBLE_KID_BAN = /시체 전분|배급 통조림|배급소에 줄|양철 식기|훔친.*배급빵|장터 골목|장터 구석|구역 광장|동네 광장|구역 메디카에|낡은 주사기|골목을 뛰어|물펌프|심부름을 도맡|돌팔매|새총|하층 하이브의 유독 매연|로우 고딕 낱말|합성 배급표/;
  const SCHOLA_KID_BAN = /어머니|아버지|부모님|엄마|아빠|가족 식탁|가정식|배급 통조림|배급소에 줄|양철 식기|훔친.*배급빵|장터 골목|장터 구석|동네 광장|구역 메디카에|골목을 뛰어|물펌프|심부름을 도맡|돌팔매|새총/;
  const KRIEG_KID_BAN = /어머니|아버지|부모님|자장가|가족 식탁|가정식|엄마|아빠|장터|숨바꼭질|골목을 뛰어|배급 통조림/;
  const VOID_KID_BAN = /들판|숲|산성비|비바람|계절이 바뀔|악천후|밤하늘을 가로지르는|돌팔매|새총|동네 광장|구역 광장|구역의 작은 신당|장터 골목|골목을 뛰어/;
  const VOID_ADULT_BAN = /노점상|하층\s*배수로|지하\s*배수로|상층\s*첨탑|거주구\s*벽보|선술집\s*골목|총독궁|산성비|농작물|추수|밀밭|비바람|소나기|모래폭풍|들판|숲속|하늘을\s*가르며|밤하늘을\s*가로지르는|장터\s*골목|동네\s*광장|구역\s*광장|마을\s*우물|지표면\s*행군|황무지\s*순찰/;
  const NOBLE_OFFICER_BAN = /배급소에 줄|양철 식기|구걸|결근|노점상|사흘을 굶었다/;
  const UNDERHIVE_GANGER_BAN = /황궁의 금빛 회랑|상층 첨탑 만찬|테라 상류 가문|가문의 저택 응접실/;
  const ASTARTES_BAN = /시체 전분|배급소|배급표|세입자|강제 징발|증조부|증조할아버지|구걸|결근|노점상|화장실|상관의 취향|아마섹.*상납|울부짖으며|겁에 질려 도망|혼인|결혼|동기들이 하나둘 앓아|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명/;
  const DREADNOUGHT_BAN = /시체 전분|배급소|배급표|식당|술잔|선술집|침상|침대|구두|장화|손가락|세수|거울 속 내 눈동자|전술 드레드노트 아머|크룩스 테르미나투스|파워 아머 앞에|드롭 포드 안전벨트|볼터의 약실을 직접|동기들이 하나둘 앓아|상관의 취향|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|생체 폐를 유지/;
  const CUSTODES_BAN = /시체 전분|배급소|배급표|강제 징발|증조부|증조할아버지|구걸|결근|세입자|노점상|화장실|상관의 취향|서보스컬이 골목|오염의 징후|향불 냄새가 역겹|눈동자에.*보랏빛|동기들이 하나둘 앓아|수천 년 전 포도주를 곁들이|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명|생체 폐를 유지/;
  const GK_BAN = /시체 전분|배급소|배급표|강제 징발|증조부|증조할아버지|구걸|결근|세입자|노점상|화장실|상관의 취향|서보스컬이 골목|오염의 징후|향불 냄새가 역겹|눈동자에.*보랏빛|동기들이 하나둘 앓아|순례자 가족을 보았다|순례자들을 청소 서비터|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명/;
  const HIGH_LORD_BAN = /시체 전분|배급소|배급표|배급된 회색|강제 징발|결근|세입자|증조부|증조할아버지|구걸|노점상|화장실|서보스컬이 골목|하층 4개 구역의 식수|전표 4,000장에 붉은 밀랍|전임 하이 로드의 서명|옆 책상에서 50년째|다음 책상으로 넘겼다|암시장 중개인|상관의 취향|사흘을 굶었다|배급 빵 두 덩이/;
  const SAINT_BAN = /시체 전분|배급소|배급표|강제 징발|결근|세입자|증조부|증조할아버지|구걸|노점상|화장실|서보스컬이 골목|상관의 취향|오염의 징후|향불 냄새가 역겹|눈동자에.*보랏빛|암시장 중개인|암시장 자극제|소모품 인력을 미리|동료를 제물로|난민의 마지막 재산|쉰다섯을 넘긴 노구|리주버냇|수명 연장 시술 제안|동기들이 하나둘 앓아|직무 유기로 고발|교대 근무가 끝난|배급 빵 두 덩이/;
  const DP_BAN = /시체 전분|배급소|배급표|배급된 회색|강제 징발|결근|세입자|증조부|증조할아버지|구걸|노점상|화장실|황제께 맹세|아퀼라 성호|성수를 뿌|기도문을 외|아르비테스.*끌려|쥐고기 꼬치|쉰다섯을 넘긴 노구|서툴게 경례|선술집|동기들이 하나둘 앓아|방독면 필터|탐조등 점등|성당 사제가 미사|향불 냄새가 역겹.*고개를 숙였다|교대 시각을 알|두꺼비가 튀어나와|사막 전갈을 구워|야전삽 하나로 4시간|식당에 2,000명/;
  const ELDER_MORTAL_BAN = /어른 몫의 첫 주간 배급표|신병 시절|발에 맞지 않는 새 보급 군화|스콜라 프로제니움 편입 시험|진시드 시술을 받기 전|세 번째 황금 복무 못/;
  const FERAL_ADULT_BAN = /매뉴팩토룸|유압 프레스|생산 라인|시체 전분|교대 사이렌|서비터 전환|방독면 필터|복스 채널|탐조등/;

  const personas = [
    { id: "terra_high_kid", label: "테라 고위 귀족 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", originClass: "high_noble", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "terra", originId: "terra_high_blood" }, ban: NOBLE_KID_BAN },
    { id: "hive_noble_kid", label: "하이브 귀족 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", originClass: "noble", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "necromunda", originId: "planetary_noble" }, ban: NOBLE_KID_BAN },
    { id: "rt_scion_kid", label: "로그 트레이더 방계 유아 (보이드본 출생)", ages: [2, 5, 8, 11], expected: { socialTier: "elite", originClass: "noble", habitat: "void", lifeRealm: "void", bodyClass: "mortal" }, cfg: { worldId: "voidborn", originId: "rogue_trader_scion" }, ban: new RegExp(NOBLE_KID_BAN.source + "|" + VOID_KID_BAN.source) },
    { id: "schola_kid", label: "스콜라 유아", ages: [2, 5, 8, 11], expected: { socialTier: "common", originClass: "schola", habitat: "cloister", lifeRealm: "cloistered", bodyClass: "mortal" }, cfg: { worldId: "ophelia7", originId: "schola_progenium" }, ban: SCHOLA_KID_BAN, clean: (t) => t.replace(/순직한 부모/g, "") },
    { id: "knight_kid", label: "기사 가문 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", originClass: "noble", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "generic_knight", originId: "knight_house" }, ban: NOBLE_KID_BAN },
    { id: "nav_kid", label: "항법사 가문 유아", ages: [2, 5, 8, 11], expected: { socialTier: "elite", originClass: "noble", habitat: "cloister", lifeRealm: "cloistered", bodyClass: "mortal" }, cfg: { worldId: "terra", originId: "navigator_house" }, ban: new RegExp(NOBLE_KID_BAN.source + "|정상 인류' 판정") },
    { id: "krieg_kid", label: "크리그 유아", ages: [2, 5, 8, 11], expected: { socialTier: "common", originClass: "common", habitat: "frontline", lifeRealm: "military", bodyClass: "mortal" }, cfg: { worldId: "krieg", originId: "imperial_citizen" }, ban: KRIEG_KID_BAN, clean: (t) => t.replace(/어머니의 품 대신/g, "") },
    { id: "void_kid", label: "보이드본 유아", ages: [2, 5, 8, 11], expected: { socialTier: "common", originClass: "common", habitat: "void", lifeRealm: "void", bodyClass: "mortal" }, cfg: { worldId: "voidborn", originId: "imperial_citizen" }, ban: VOID_KID_BAN },
    { id: "elder_mortal_75", label: "고령 필멸자 (75세)", ages: [75], expected: { socialTier: "common", originClass: "common", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "generic_civilised", originId: "imperial_citizen", careerId: "administratum", tags: ["administratum"], stats: { Int: 55, WP: 52, Fel: 48, Inf: 45 } }, ban: ELDER_MORTAL_BAN },
    { id: "feral_adult", label: "야만 행성 성인", ages: [28], expected: { socialTier: "common", originClass: "common", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "generic_feral", originId: "imperial_citizen", careerId: "menial_worker", stats: { WS: 38, T: 42, Ag: 36, WP: 34 } }, ban: FERAL_ADULT_BAN },
    { id: "astartes", label: "아스타르테스", ages: [80], expected: { socialTier: "apex", originClass: "common", habitat: "frontline", lifeRealm: "military", bodyClass: "transhuman" }, cfg: { worldId: "macragge", originId: "imperial_citizen", careerId: "astartes_brother", chapterId: "ultramarines", tags: ["astartes", "transhuman", "battle_brother"], stats: { WS: 75, BS: 75, T: 75, WP: 75, Inf: 55 } }, ban: ASTARTES_BAN, clean: (t) => t.replace(/그대의 증조부|증조부와 조부의 육성/g, ""), visitWorlds: ["krieg", "catachan", "baal", "mars"] },
    { id: "dreadnought", label: "드레드노트", ages: [220], expected: { socialTier: "apex", originClass: "common", habitat: "frontline", lifeRealm: "military", bodyClass: "dreadnought" }, cfg: { worldId: "macragge", originId: "imperial_citizen", careerId: "astartes_veteran", chapterId: "ultramarines", tags: ["astartes", "transhuman", "dreadnought", "battle_brother"], stats: { WS: 80, BS: 78, T: 85, WP: 82, Inf: 65 } }, ban: DREADNOUGHT_BAN, visitWorlds: ["krieg", "catachan", "baal", "mars"] },
    { id: "custodes", label: "쿠스토데스", ages: [120], expected: { socialTier: "apex", originClass: "high_noble", habitat: "cloister", lifeRealm: "cloistered", bodyClass: "transhuman" }, cfg: { worldId: "terra", originId: "terra_high_blood", careerId: "adeptus_custodes", tags: ["custodes", "transhuman"], stats: { WS: 90, BS: 85, T: 90, WP: 90, Int: 85, Inf: 80 } }, ban: CUSTODES_BAN, clean: (t) => t.replace(/그대의 증조부|증조부와 조부의 육성/g, ""), visitWorlds: ["krieg", "catachan", "baal", "mars"] },
    { id: "grey_knight", label: "그레이 나이트", ages: [90], expected: { socialTier: "apex", originClass: "common", habitat: "cloister", lifeRealm: "cloistered", bodyClass: "transhuman" }, cfg: { worldId: "terra", originId: "imperial_citizen", traitId: "psyker", careerId: "grey_knight", tags: ["astartes", "grey_knight", "transhuman"], faith: 90, stats: { WS: 80, BS: 75, T: 80, WP: 90, Int: 75, Inf: 65 } }, ban: GK_BAN, visitWorlds: ["krieg", "catachan", "baal"] },
    { id: "high_lord", label: "테라 하이 로드", ages: [62], expected: { socialTier: "apex", originClass: "noble", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "terra", originId: "planetary_noble", careerId: "master_of_administratum", tags: ["administratum", "high_lord_terra"], stats: { Int: 92, Fel: 88, WP: 84, Inf: 96 } }, ban: HIGH_LORD_BAN },
    { id: "living_saint", label: "살아 있는 성인", ages: [65], expected: { socialTier: "apex", originClass: "common", habitat: "cloister", lifeRealm: "cloistered", bodyClass: "transhuman" }, cfg: { worldId: "ophelia7", originId: "ecclesiarchy_novice", traitId: "emperor_blessed", careerId: "living_saint", gender: "female", faith: 98, tags: ["living_miracle", "saint_vessel", "living_saint", "transhuman"], stats: { WS: 85, WP: 98, Fel: 90, Inf: 88 } }, ban: SAINT_BAN },
    { id: "daemon_prince", label: "데몬 프린스", ages: [150], expected: { socialTier: "apex", originClass: "underclass", habitat: "surface", lifeRealm: "heretic", bodyClass: "daemonic" }, cfg: { worldId: "necromunda", originId: "underhive_scum", careerId: "daemon_prince", corruption: 95, faith: 0, tags: ["heretic", "chaos_aligned", "mark_khorne", "daemon_prince", "transhuman"], stats: { WS: 95, T: 92, WP: 88, Inf: 85 } }, ban: DP_BAN, visitWorlds: ["krieg", "catachan"] },
    // Stage 24 신규 5대 페르소나 (17 -> 22)
    { id: "voidborn_rt_adult", label: "보이드본 성인 로그 트레이더 세네샬", ages: [22, 30], expected: { socialTier: "elite", originClass: "noble", habitat: "void", lifeRealm: "void", bodyClass: "mortal" }, cfg: { worldId: "voidborn", originId: "rogue_trader_scion", careerId: "rt_seneschal", tags: ["rt_seneschal", "voidborn"], stats: { Fel: 56, Int: 52, Inf: 55, WP: 48 } }, ban: VOID_ADULT_BAN },
    { id: "voidborn_navy", label: "보이드본 임페리얼 네이비", ages: [24, 34], expected: { socialTier: "common", originClass: "common", habitat: "void", lifeRealm: "void", bodyClass: "mortal" }, cfg: { worldId: "voidborn", originId: "imperial_citizen", careerId: "imperial_navy", tags: ["voidborn", "imperial_military"], stats: { BS: 50, Int: 48, WP: 48, Ag: 46 } }, ban: VOID_ADULT_BAN },
    { id: "noble_parachute_officer", label: "귀족 낙하산 위관 장교", ages: [19, 26], expected: { socialTier: "elite", originClass: "noble", habitat: "frontline", lifeRealm: "military", bodyClass: "mortal" }, cfg: { worldId: "cadia", originId: "planetary_noble", careerId: "militarum_officer", tags: ["noble_commission", "officer", "militarum", "imperial_military"], stats: { WS: 48, BS: 48, WP: 52, Fel: 52, Inf: 54 } }, ban: NOBLE_OFFICER_BAN },
    { id: "krieg_14_death_korps", label: "크리그 14세 데스 코어 신병", ages: [14, 16], expected: { socialTier: "common", originClass: "common", habitat: "frontline", lifeRealm: "military", bodyClass: "mortal" }, cfg: { worldId: "krieg", originId: "imperial_citizen", careerId: "astra_militarum", tags: ["militarum", "imperial_military"], stats: { BS: 42, WS: 40, T: 44, WP: 52 } }, ban: KRIEG_KID_BAN, clean: (t) => t.replace(/어머니의 품 대신/g, "") },
    { id: "underhive_ganger", label: "언더하이브 갱단원", ages: [16, 24], expected: { socialTier: "underclass", originClass: "underclass", habitat: "surface", lifeRealm: "civilian", bodyClass: "mortal" }, cfg: { worldId: "necromunda", originId: "underhive_scum", careerId: "underhive_ganger", tags: ["streetwise"], stats: { WS: 44, BS: 40, Ag: 46, T: 42 } }, ban: UNDERHIVE_GANGER_BAN }
  ];

  const difficulties = ["standard", "grimdark"];
  let totalCollisions = 0;
  let minPersonaPool = 999;
  for (const difficulty of difficulties) {
    for (const p of personas) {
      const matchedChronIds = new Set();
      for (const age of p.ages) {
        const st = makePersonaState({ ...p.cfg, age, difficulty });
        const strat = Engine.getStratification(st);
        if (
          strat.socialTier !== p.expected.socialTier ||
          strat.originClass !== p.expected.originClass ||
          strat.habitat !== p.expected.habitat ||
          strat.lifeRealm !== p.expected.lifeRealm ||
          strat.bodyClass !== p.expected.bodyClass
        ) {
          fail("4P", `Persona ${p.id}(${difficulty}, age ${age}) stratification mismatch: got ${JSON.stringify(strat)}, expected ${JSON.stringify(p.expected)}`);
        }
        for (const ch of DATA.CHRONICLES) {
          if (!Engine.checkReq(st, ch.req)) continue;
          matchedChronIds.add(ch.id);
          const rawText = p.clean ? p.clean(ch.text || "") : (ch.text || "");
          const m = rawText.match(p.ban);
          if (m) {
            totalCollisions++;
            fail("4P", `Persona ${p.id}(${difficulty}, age ${age}) leaked chronicle ${ch.id} [matched "${m[0]}"]`);
          }
        }
        for (const ev of DATA.EVENTS) {
          if (!Engine.checkReq(st, ev.req)) continue;
          const resolvedText = Engine.resolveEventText ? Engine.resolveEventText(ev, st) : (ev.text || "");
          const parts = [ev.title || "", resolvedText];
          for (const ch of ev.choices || []) {
            if (ch.req && !Engine.checkReq(st, ch.req)) continue;
            parts.push(ch.label || "");
            for (const o of [ch.effect, ch.success, ch.fail, ch.critSuccess, ch.critFail]) {
              if (o && o.text) parts.push(o.text);
            }
          }
          const rawText = p.clean ? p.clean(parts.join(" ")) : parts.join(" ");
          const m = rawText.match(p.ban);
          if (m) {
            totalCollisions++;
            fail("4P", `Persona ${p.id}(${difficulty}, age ${age}) leaked event ${ev.id} [matched "${m[0]}"]`);
          }
        }
        for (const vw of p.visitWorlds || []) {
          const vst = makePersonaState({ ...p.cfg, age, difficulty });
          vst.worldId = vw;
          for (const ch of DATA.CHRONICLES) {
            if (!Engine.checkReq(vst, ch.req)) continue;
            const rawText = p.clean ? p.clean(ch.text || "") : (ch.text || "");
            const m = rawText.match(p.ban);
            if (m) {
              totalCollisions++;
              fail("4P", `Persona ${p.id}(${difficulty}, visiting ${vw}) leaked chronicle ${ch.id} [matched "${m[0]}"]`);
            }
          }
          for (const ev of DATA.EVENTS) {
            if (!Engine.checkReq(vst, ev.req)) continue;
            const resolvedText = Engine.resolveEventText ? Engine.resolveEventText(ev, vst) : (ev.text || "");
            const rawText = p.clean ? p.clean(`${ev.title || ""} ${resolvedText}`) : `${ev.title || ""} ${resolvedText}`;
            const m = rawText.match(p.ban);
            if (m) {
              totalCollisions++;
              fail("4P", `Persona ${p.id}(${difficulty}, visiting ${vw}) leaked event ${ev.id} [matched "${m[0]}"]`);
            }
          }
        }
      }
      const poolSize = matchedChronIds.size;
      if (poolSize < minPersonaPool) minPersonaPool = poolSize;
      if (poolSize < 8) {
        fail("4P", `Persona ${p.id} (${p.label}, ${difficulty}) chronicle pool < 8 (got ${poolSize})`);
      }
    }
  }

  // Adult elite/cloistered snapshot must never trigger common-worker servitor event
  const servEv = DATA.EVENTS.find((e) => e.id === "ev_absurd_servitor_sentence");
  if (servEv) {
    for (const difficulty of difficulties) {
      const adultElites = [
        makePersonaState({ worldId: "necromunda", originId: "planetary_noble", age: 25, careerId: "administratum", difficulty }),
        makePersonaState({ worldId: "ophelia7", originId: "schola_progenium", age: 24, gender: "female", careerId: "adepta_sororitas", tags: ["sororitas"], difficulty }),
        makePersonaState({ worldId: "generic_knight", originId: "knight_house", age: 26, careerId: "knight_scion", tags: ["imperial_knight"], difficulty })
      ];
      for (const st of adultElites) {
        if (Engine.checkReq(st, servEv.req)) {
          totalCollisions++;
          fail("4P", `Adult elite/cloistered (${st.originId}/${st.careerId}, ${difficulty}) leaked ev_absurd_servitor_sentence`);
        }
      }
    }
  }

  // Stage 24: 500-case deterministic Cartesian combination fuzzer (world x origin x trait x career x age)
  const validSocialSet = new Set(Engine.SOCIAL_TIER_ORDER || []);
  const validOriginSet = new Set(Engine.ORIGIN_CLASS_KEYS || []);
  const validHabitatSet = new Set(Engine.HABITAT_KEYS || []);
  const validRealmSet = new Set(Engine.LIFE_REALM_KEYS || []);
  const validBodySet = new Set(Engine.BODY_CLASS_KEYS || []);
  const nobleHiddenSet = Engine.NOBLE_HIDDEN_LOW_CAREERS || new Set(["menial_worker", "underhive_ganger", "pdf_trooper", "astra_militarum", "skitarii"]);
  const kriegFamilyRe = /어머니|아버지|부모님|자장가|가족 식탁|가정식|엄마|아빠/;
  const eraIds = (Engine.ERA_PRESETS || []).map((e) => e.id);
  const sampleAges = [0, 2, 4, 5, 7, 11, 14, 16, 18, 22, 28, 36, 48, 65, 90, 140, 220];

  let seed = 24040001;
  const nextRand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  const pick = (arr) => arr[Math.floor(nextRand() * arr.length)];

  let fuzzTested = 0;
  let fuzzLeaks = 0;
  for (let i = 0; i < 500; i++) {
    const world = DATA.WORLDS[i % DATA.WORLDS.length];
    const wTags = new Set(world.tags || []);
    const validOrigins = DATA.ORIGINS.filter((o) => {
      if (o.worldFilter && !o.worldFilter.includes(world.id)) return false;
      if (o.excludeWorlds && o.excludeWorlds.includes(world.id)) return false;
      if (o.excludeWorldTags && o.excludeWorldTags.some((t) => wTags.has(t))) return false;
      return true;
    });
    const origin = validOrigins.length ? pick(validOrigins) : DATA.ORIGINS[0];
    const trait = pick(DATA.TRAITS);
    const eraId = eraIds.length ? pick(eraIds) : "armageddon";
    const gender = nextRand() < 0.5 ? "male" : "female";
    const difficulty = i % 2 === 0 ? "standard" : "grimdark";
    const age = sampleAges[i % sampleAges.length];

    const st = Engine.createCharacter({
      mode: "custom",
      difficulty,
      worldId: world.id,
      originId: origin.id,
      traitId: trait.id,
      eraId,
      gender
    });
    st.age = age;
    st.year = st.birthYear + age;

    if (age >= 14) {
      const eligCareers = DATA.CAREERS.filter((c) => {
        if (!c.selectable) return false;
        if (c.req && c.req.gender && c.req.gender !== gender) return false;
        if (c.req && c.req.minAge && c.req.minAge > age) return false;
        if (c.req && c.req.excludeTags && c.req.excludeTags.some((t) => st.tags.includes(t))) return false;
        return true;
      });
      if (eligCareers.length > 0 && nextRand() < 0.85) {
        const pickedC = pick(eligCareers);
        st.careerId = pickedC.id;
        if (pickedC.onJoin && pickedC.onJoin.addTags) {
          for (const t of pickedC.onJoin.addTags) {
            if (!st.tags.includes(t)) st.tags.push(t);
          }
        }
        if (pickedC.useChapterName) {
          st.chapterId = "ultramarines";
          st.chapterName = "울트라마린";
        }
      }
    }

    fuzzTested++;
    const strat = Engine.getStratification(st);
    if (
      !validSocialSet.has(strat.socialTier) ||
      !validOriginSet.has(strat.originClass) ||
      !validHabitatSet.has(strat.habitat) ||
      !validRealmSet.has(strat.lifeRealm) ||
      !validBodySet.has(strat.bodyClass)
    ) {
      fuzzLeaks++;
      fail("4P", `Cartesian fuzzer[${i}] invalid stratification ${JSON.stringify(strat)} for ${world.id}/${origin.id}/${trait.id}/${st.careerId}/age${age}`);
    }

    // Invariant 1: Age 0~5 must match 0 choice EVENTS and 0 direct TIMELINE entries
    if (age <= 5) {
      for (const ev of DATA.EVENTS) {
        if (Engine.checkReq(st, ev.req)) {
          fuzzLeaks++;
          fail("4P", `Cartesian fuzzer[${i}] infant age=${age} (${world.id}/${origin.id}) matched event ${ev.id}`);
        }
      }
      for (const tl of DATA.TIMELINE) {
        if (Engine.checkReq(st, tl.filter)) {
          fuzzLeaks++;
          fail("4P", `Cartesian fuzzer[${i}] infant age=${age} (${world.id}/${origin.id}) matched timeline ${tl.id}`);
        }
      }
    }

    // Invariant 2: Upper-noble (!disowned_noble && !abhuman) must never see hidden low careers in unlockedCareers
    const opts = Engine.getContextualOptions(st);
    if (
      (strat.originClass === "noble" || strat.originClass === "high_noble") &&
      !st.tags.includes("disowned_noble") &&
      !st.tags.includes("abhuman")
    ) {
      const leakedLow = (opts.unlockedCareers || []).find((c) => nobleHiddenSet.has(c.id));
      if (leakedLow) {
        fuzzLeaks++;
        fail("4P", `Cartesian fuzzer[${i}] upper-noble (${origin.id}, age=${age}) exposed hidden low career "${leakedLow.id}"`);
      }
    }

    // Invariant 3: Krieg family leak & Voidborn non-void-native surface landmark leak
    if (world.id === "krieg") {
      for (const ch of DATA.CHRONICLES) {
        if (!Engine.checkReq(st, ch.req)) continue;
        const cleaned = (ch.text || "").replace(/어머니의 품 대신/g, "");
        const m = cleaned.match(kriegFamilyRe);
        if (m) {
          fuzzLeaks++;
          fail("4P", `Cartesian fuzzer[${i}] Krieg (${st.careerId}, age=${age}) leaked family term "${m[0]}" in chronicle ${ch.id}`);
        }
      }
    }
    if (world.id === "voidborn") {
      for (const ch of DATA.CHRONICLES) {
        if (isVoidNativeReq(ch.req)) continue;
        if (!Engine.checkReq(st, ch.req)) continue;
        const m = (ch.text || "").match(SURFACE_ONLY_LANDMARK_RE);
        if (m) {
          fuzzLeaks++;
          fail("4P", `Cartesian fuzzer[${i}] Voidborn (${origin.id}/${st.careerId}, age=${age}) leaked surface landmark "${m[0]}" in chronicle ${ch.id}`);
        }
      }
      for (const ev of DATA.EVENTS) {
        if (isVoidNativeReq(ev.req)) continue;
        if (!Engine.checkReq(st, ev.req)) continue;
        const resolved = Engine.resolveEventText(ev, st);
        const m = `${ev.title || ""} ${resolved}`.match(SURFACE_ONLY_LANDMARK_RE);
        if (m) {
          fuzzLeaks++;
          fail("4P", `Cartesian fuzzer[${i}] Voidborn (${origin.id}/${st.careerId}, age=${age}) leaked surface landmark "${m[0]}" in event ${ev.id}`);
        }
      }
    }
  }

  console.log(
    `[Gate 4P] ${personas.length}-persona x 2 modes (standard+grimdark) + ${fuzzTested}-case Cartesian fuzzer complete ` +
    `(collisions=${totalCollisions}, fuzzLeaks=${fuzzLeaks}, minChroniclePool=${minPersonaPool} >= 8).`
  );
}
