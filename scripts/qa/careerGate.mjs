// Gate 7A/7B/7D (--deep): 전직 그래프 모순 · 전수 합성 도달성 · 91직군 승급-상한 무결성 증명 모듈
import {
  UNBOUND_CAREERS,
  CLOSED_VOW_TREES,
  isUnboundCareer,
  isCareerTransitionBlockedPure,
  isManualCareerAllowedPure,
  evaluateDynamicOfferEligibilityPure
} from "../../src/engine/careerRules.js";

export function runCareerAuditGate({ DATA, Engine, eventSourceByIndex, chronSourceByIndex, fail }) {
  console.log("\n--- [Gate 7A/7B: Static Graph & Full-Corpus Reachability (--deep)] ---");

  const careerById = new Map(DATA.CAREERS.map((c) => [c.id, c]));
  const selectableCareers = DATA.CAREERS.filter((c) => c.selectable);
  const worldIds = new Set(DATA.WORLDS.map((w) => w.id));
  const chapterIds = new Set(DATA.CHAPTERS.map((c) => c.id));
  const socialTierOrder = Engine.SOCIAL_TIER_ORDER || ["underclass", "common", "elite", "apex"];

  // 7A. Career Transition Reachability Graph & anyPastCareers Contradiction Audit
  const forceCareerTargets = new Set();
  for (const ev of [...DATA.EVENTS, ...DATA.TIMELINE]) {
    for (const ch of (ev.choices || [])) {
      [ch.effect, ch.success, ch.fail, ch.critSuccess, ch.critFail].forEach((o) => {
        if (o && o.forceCareer) forceCareerTargets.add(o.forceCareer);
      });
    }
  }

  function careerPermTags(c) {
    const out = new Set();
    if (c && c.onJoin && Array.isArray(c.onJoin.addTags)) {
      for (const t of c.onJoin.addTags) {
        if (t !== "imperial_nihilus") out.add(t);
      }
    }
    return out;
  }

  function reqCompatibleWithBase(req, currId, baseGender, baseTags) {
    if (!req) return true;
    if (req.gender && baseGender && req.gender !== baseGender) return false;
    if (req.excludeTags && req.excludeTags.some((t) => baseTags.has(t))) return false;
    if (req.anyCareers && !req.anyCareers.includes(currId)) return false;
    if (req.or && req.or.length > 0) {
      const anyBranchOk = req.or.some((sub) => reqCompatibleWithBase(sub, currId, baseGender, baseTags));
      if (!anyBranchOk) return false;
    }
    return true;
  }

  // SSOT sanity check against src/engine/careerRules.js
  if (!UNBOUND_CAREERS.size || !CLOSED_VOW_TREES.size || !isUnboundCareer("child")) {
    fail(7, "careerRules.js SSOT exports (UNBOUND_CAREERS / CLOSED_VOW_TREES / isUnboundCareer) are invalid");
  }

  function canDirectStep(curr, target, baseGender, baseTags, baseTranshuman) {
    if (!curr || !target || curr.id === target.id) return false;
    const tGender = target.req && target.req.gender ? target.req.gender : null;
    if (baseGender && tGender && baseGender !== tGender) return false;

    const effTags = new Set([...baseTags, ...careerPermTags(curr)]);
    const effTranshuman = baseTranshuman || Boolean(curr.isTranshuman) ||
      effTags.has("astartes") || effTags.has("custodes") || effTags.has("grey_knight") || effTags.has("daemon_prince") || effTags.has("living_saint");

    if (isCareerTransitionBlockedPure(effTags, curr, target, null)) return false;

    // 1) Manual open transition (SSOT: src/engine/careerRules.js isManualCareerAllowedPure)
    if (target.selectable && target.entryMode === "open") {
      if (reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
        if (isManualCareerAllowedPure(effTags, curr, target)) {
          return true;
        }
      }
    }

    // 2) Dynamic career offer transition (SSOT: src/engine/careerRules.js evaluateDynamicOfferEligibilityPure)
    if (reqCompatibleWithBase(target.req, curr.id, baseGender, effTags)) {
      const offerRes = evaluateDynamicOfferEligibilityPure(effTags, curr, target, {
        checkDestOriginTags: false,
        checkScoutQualification: false
      });
      if (offerRes.allowed) return true;
    }

    // 3) Event forceCareer transition (with Astartes chaos_cultist -> renegade_marine redirect)
    const forcedDirectly = forceCareerTargets.has(target.id);
    const forcedViaRedirect = target.id === "renegade_marine" && forceCareerTargets.has("chaos_cultist") && effTags.has("astartes");
    if (forcedDirectly || forcedViaRedirect) {
      const targetIsTranshuman = Boolean(target.isTranshuman);
      const isDowngrade = (effTranshuman && !targetIsTranshuman && target.tree !== "chaos") ||
        (target.tier < curr.tier && target.tree !== "chaos");
      if (!isDowngrade) {
        if (!(target.id === "chaos_cultist" && effTags.has("astartes"))) return true;
      }
    }

    return false;
  }

  const reachableFrom = new Map();
  for (const start of DATA.CAREERS) {
    const startGender = start.req && start.req.gender ? start.req.gender : null;
    const startTags = careerPermTags(start);
    const startTranshuman = Boolean(start.isTranshuman) ||
      startTags.has("astartes") || startTags.has("custodes") || startTags.has("grey_knight") || startTags.has("daemon_prince") || startTags.has("living_saint");

    const visited = new Set([start.id]);
    const queue = [start];
    while (queue.length > 0) {
      const curr = queue.shift();
      for (const next of DATA.CAREERS) {
        if (visited.has(next.id)) continue;
        if (canDirectStep(curr, next, startGender, startTags, startTranshuman)) {
          visited.add(next.id);
          queue.push(next);
        }
      }
    }
    reachableFrom.set(start.id, visited);
  }

  // Graph sanity checks (prevents silent drift of the graph analyzer itself)
  const graphChecks = [
    ["astra_militarum", "warmaster", true],
    ["astra_militarum", "planetary_governor", true],
    ["astartes_brother", "renegade_marine", true],
    ["astartes_brother", "daemon_prince", true],
    ["adeptus_custodes", "chaos_cultist", false],
    ["adeptus_custodes", "daemon_prince", false],
    ["grey_knight", "renegade_marine", false],
    ["adepta_sororitas", "astartes_brother", false],
    ["adepta_sororitas", "hive_crime_lord", false],
    ["tech_priest", "hive_crime_lord", false],
    ["knight_scion", "planetary_governor", false],
    ["knight_scion", "militarum_general", false],
    ["astartes_brother", "planetary_governor", false],
    ["nav_apprentice", "paternoval_envoy", true],
    ["nav_apprentice", "adeptus_custodes", false],
    ["nav_apprentice", "astartes_scout", false],
    ["assassin_initiate", "grand_master_of_assassins", true],
    ["assassin_initiate", "commissar", false],
    ["assassin_initiate", "inquisition_acolyte", false],
    ["knight_squire", "knight_high_king", true],
    ["adepta_sororitas", "living_saint", true],
    ["living_saint", "chaos_cultist", false]
  ];
  for (const [fromId, toId, expected] of graphChecks) {
    const actual = reachableFrom.has(fromId) && reachableFrom.get(fromId).has(toId);
    if (actual !== expected) {
      fail(7, `Career graph sanity mismatch: ${fromId} -> ${toId} expected=${expected}, got=${actual}`);
    }
  }

  let pastCareerChecks = 0;
  function auditPastCareerReq(req, owner, parentCareers) {
    if (!req) return;
    const curList = req.anyCareers || parentCareers || null;
    if (req.anyPastCareers) {
      pastCareerChecks++;
      const excl = new Set(req.excludePastCareers || []);
      const validPast = req.anyPastCareers.filter((p) => !excl.has(p));
      if (validPast.length === 0) {
        fail(7, `Contradictory anyPastCareers vs excludePastCareers in ${owner}`);
      } else if (curList && curList.length > 0) {
        let pairOk = false;
        for (const p of validPast) {
          const reach = reachableFrom.get(p);
          for (const c of curList) {
            if (p === c || (reach && reach.has(c))) {
              pairOk = true;
              break;
            }
          }
          if (pairOk) break;
        }
        if (!pairOk) {
          fail(7, `Unreachable (anyPastCareers=[${validPast.join(",")}] -> anyCareers=[${curList.join(",")}]) in ${owner}`);
        }
      }
    }
    if (req.or) {
      req.or.forEach((sub, idx) => auditPastCareerReq(sub, `${owner}.or[${idx}]`, curList));
    }
  }

  // 7B. Full-Corpus Synthetic Reachability Prover
  function intersectArrays(a, b) {
    if (!a) return b ? [...b] : null;
    if (!b) return [...a];
    const setB = new Set(b);
    return a.filter((x) => setB.has(x));
  }

  function mergeFlatReq(a, b) {
    if (!a) return b ? Object.assign({}, b) : {};
    if (!b) return Object.assign({}, a);
    const out = Object.assign({}, a);

    const maxKeys = ["minAge", "minYear", "minFaith", "minCorruption", "minWounds"];
    const minKeys = ["maxAge", "maxYear", "maxFaith", "maxCorruption", "maxWounds", "maxCareerTier"];
    for (const k of maxKeys) {
      if (b[k] !== undefined) out[k] = out[k] !== undefined ? Math.max(out[k], b[k]) : b[k];
    }
    for (const k of minKeys) {
      if (b[k] !== undefined) out[k] = out[k] !== undefined ? Math.min(out[k], b[k]) : b[k];
    }

    if (b.minSocialTier) {
      if (!out.minSocialTier || socialTierOrder.indexOf(b.minSocialTier) > socialTierOrder.indexOf(out.minSocialTier)) {
        out.minSocialTier = b.minSocialTier;
      }
    }
    if (b.maxSocialTier) {
      if (!out.maxSocialTier || socialTierOrder.indexOf(b.maxSocialTier) < socialTierOrder.indexOf(out.maxSocialTier)) {
        out.maxSocialTier = b.maxSocialTier;
      }
    }
    if (out.minSocialTier && out.maxSocialTier && socialTierOrder.indexOf(out.minSocialTier) > socialTierOrder.indexOf(out.maxSocialTier)) {
      return null;
    }

    if (b.difficulty) {
      if (out.difficulty && out.difficulty !== b.difficulty) return null;
      out.difficulty = b.difficulty;
    }
    if (b.gender) {
      if (out.gender && out.gender !== b.gender) return null;
      out.gender = b.gender;
    }
    if (b.greatRift !== undefined) {
      if (out.greatRift !== undefined && out.greatRift !== b.greatRift) return null;
      out.greatRift = b.greatRift;
    }

    const intersectKeys = ["anyCareers", "anyTrees", "anyChapters", "anyWorlds", "anyHomeWorlds", "anySegmenta", "anyFocus", "anyDominantAlign", "anySocialTiers", "anyOriginClasses", "anyHabitats", "anyRealms", "anyBodyClasses"];
    for (const k of intersectKeys) {
      if (b[k]) {
        const merged = intersectArrays(out[k], b[k]);
        if (merged.length === 0) return null;
        out[k] = merged;
      }
    }

    out._anyTagGroups = [...(a._anyTagGroups || (a.anyTags ? [a.anyTags] : [])), ...(b._anyTagGroups || (b.anyTags ? [b.anyTags] : []))];
    out._anyWorldTagGroups = [...(a._anyWorldTagGroups || (a.anyWorldTags ? [a.anyWorldTags] : [])), ...(b._anyWorldTagGroups || (b.anyWorldTags ? [b.anyWorldTags] : []))];
    out._anyPastGroups = [...(a._anyPastGroups || (a.anyPastCareers ? [a.anyPastCareers] : [])), ...(b._anyPastGroups || (b.anyPastCareers ? [b.anyPastCareers] : []))];
    delete out.anyTags;
    delete out.anyWorldTags;
    delete out.anyPastCareers;

    const unionKeys = ["allTags", "excludeTags", "excludeWorlds", "excludeHomeWorlds", "excludeWorldTags", "excludeChapters", "excludePastCareers", "excludeOriginClasses", "excludeHabitats", "excludeRealms", "excludeBodyClasses", "excludeTrees"];
    for (const k of unionKeys) {
      if (b[k]) out[k] = [...new Set([...(out[k] || []), ...b[k]])];
    }

    if (b.stats) {
      out.stats = Object.assign({}, out.stats || {});
      for (const sk of Object.keys(b.stats)) {
        out.stats[sk] = out.stats[sk] !== undefined ? Math.max(out.stats[sk], b.stats[sk]) : b.stats[sk];
      }
    }
    if (b.minAlign) {
      out.minAlign = Object.assign({}, out.minAlign || {});
      for (const ak of Object.keys(b.minAlign)) {
        out.minAlign[ak] = out.minAlign[ak] !== undefined ? Math.max(out.minAlign[ak], b.minAlign[ak]) : b.minAlign[ak];
      }
    }
    if (b.maxAlign) {
      out.maxAlign = Object.assign({}, out.maxAlign || {});
      for (const ak of Object.keys(b.maxAlign)) {
        out.maxAlign[ak] = out.maxAlign[ak] !== undefined ? Math.min(out.maxAlign[ak], b.maxAlign[ak]) : b.maxAlign[ak];
      }
    }
    delete out.or;
    return out;
  }

  function expandClauses(req) {
    if (!req) return [{}];
    const base = Object.assign({}, req);
    const orBranches = base.or;
    delete base.or;
    const baseFlat = mergeFlatReq({}, base);
    if (!baseFlat) return [];
    if (!orBranches || orBranches.length === 0) return [baseFlat];

    const results = [];
    for (const branch of orBranches) {
      const subClauses = expandClauses(branch);
      for (const sc of subClauses) {
        const merged = mergeFlatReq(baseFlat, sc);
        if (merged) results.push(merged);
      }
    }
    return results;
  }

  function synthesizeClauseState(cl) {
    const minAge = cl.minAge !== undefined ? cl.minAge : 0;
    const maxAge = cl.maxAge !== undefined ? cl.maxAge : 400;
    if (minAge > maxAge) return null;
    const age = cl.minAge !== undefined ? cl.minAge : Math.min(25, maxAge);

    let minYear = cl.minYear !== undefined ? cl.minYear : 100;
    let maxYear = cl.maxYear !== undefined ? cl.maxYear : 1040;
    if (cl.greatRift === true) minYear = Math.max(minYear, 999);
    if (cl.greatRift === false) maxYear = Math.min(maxYear, 998);
    if (minYear > maxYear) return null;
    const year = minYear;

    const minFaith = cl.minFaith !== undefined ? cl.minFaith : 0;
    const maxFaith = cl.maxFaith !== undefined ? cl.maxFaith : 100;
    if (minFaith > maxFaith) return null;
    const faith = minFaith;

    const minCorr = cl.minCorruption !== undefined ? cl.minCorruption : 0;
    const maxCorr = cl.maxCorruption !== undefined ? cl.maxCorruption : 100;
    if (minCorr > maxCorr) return null;
    const corruption = minCorr;

    const minWounds = cl.minWounds !== undefined ? cl.minWounds : 1;
    const maxWounds = cl.maxWounds !== undefined ? cl.maxWounds : 200;
    if (minWounds > maxWounds) return null;
    const wounds = minWounds;

    const minA = { humane: 0, dogmatic: 0, ruthless: 0 };
    const maxA = { humane: 100, dogmatic: 100, ruthless: 100 };
    for (const ak of ["humane", "dogmatic", "ruthless"]) {
      if (cl.minAlign && cl.minAlign[ak] !== undefined) minA[ak] = Math.max(minA[ak], cl.minAlign[ak]);
      if (cl.maxAlign && cl.maxAlign[ak] !== undefined) maxA[ak] = Math.min(maxA[ak], cl.maxAlign[ak]);
      if (minA[ak] > maxA[ak]) return null;
    }
    let alignment = { humane: minA.humane, dogmatic: minA.dogmatic, ruthless: minA.ruthless };
    if (cl.anyDominantAlign && cl.anyDominantAlign.length > 0) {
      let solved = null;
      for (const dom of cl.anyDominantAlign) {
        if (dom === "neutral") {
          const topMin = Math.max(minA.humane, minA.dogmatic, minA.ruthless);
          if (topMin < 15) {
            solved = { humane: minA.humane, dogmatic: minA.dogmatic, ruthless: minA.ruthless };
            break;
          }
          const pairs = [["humane", "dogmatic", "ruthless"], ["humane", "ruthless", "dogmatic"], ["dogmatic", "ruthless", "humane"]];
          for (const [k1, k2, k3] of pairs) {
            const v = Math.max(15, minA[k1], minA[k2], minA[k3]);
            if (v <= maxA[k1] && v <= maxA[k2] && minA[k3] <= v) {
              const cand = { [k1]: v, [k2]: v, [k3]: minA[k3] };
              if (Engine.getAlignmentInfo({ alignment: cand }).dominant === "neutral") {
                solved = cand;
                break;
              }
            }
          }
          if (solved) break;
        } else {
          const others = ["humane", "dogmatic", "ruthless"].filter((k) => k !== dom);
          const needed = Math.max(15, minA[dom], minA[others[0]] + 1, minA[others[1]] + 1);
          if (needed <= maxA[dom]) {
            solved = { [dom]: needed, [others[0]]: minA[others[0]], [others[1]]: minA[others[1]] };
            break;
          }
        }
      }
      if (!solved) return null;
      alignment = solved;
    }

    const exclWorlds = new Set(cl.excludeWorlds || []);
    const exclHomeWorlds = new Set(cl.excludeHomeWorlds || []);
    const exclWorldTags = new Set(cl.excludeWorldTags || []);
    const worldCandidates = DATA.WORLDS.filter((w) => {
      if (cl.anyWorlds && !cl.anyWorlds.includes(w.id)) return false;
      if (exclWorlds.has(w.id)) return false;
      if (cl.anySegmenta && !cl.anySegmenta.includes(w.segmentum)) return false;
      if (exclWorldTags.size && (w.tags || []).some((t) => exclWorldTags.has(t))) return false;
      for (const grp of (cl._anyWorldTagGroups || [])) {
        if (!grp.some((t) => (w.tags || []).includes(t))) return false;
      }
      return true;
    });
    if (worldCandidates.length === 0) return null;

    const exclChapters = new Set(cl.excludeChapters || []);
    let chapterId = null;
    if (cl.anyChapters) {
      const validCh = cl.anyChapters.find((cid) => chapterIds.has(cid) && !exclChapters.has(cid));
      if (!validCh) return null;
      chapterId = validCh;
    }

    const exclTags = new Set(cl.excludeTags || []);
    const baseTagSet = new Set(cl.allTags || []);
    for (const t of baseTagSet) {
      if (exclTags.has(t)) return null;
    }
    for (const grp of (cl._anyTagGroups || [])) {
      const picked = grp.find((t) => !exclTags.has(t));
      if (!picked) return null;
      baseTagSet.add(picked);
    }

    const exclPast = new Set(cl.excludePastCareers || []);
    const exclTrees = new Set(cl.excludeTrees || []);
    const needsStratSearch = Boolean(
      cl.minSocialTier || cl.maxSocialTier || cl.anySocialTiers ||
      cl.anyOriginClasses || cl.excludeOriginClasses ||
      cl.anyHabitats || cl.excludeHabitats ||
      cl.anyRealms || cl.excludeRealms ||
      cl.anyBodyClasses || cl.excludeBodyClasses ||
      cl.excludeTrees || cl.maxCareerTier !== undefined
    );

    const buildCareerCandidates = () => {
      const list = [];
      if (cl.anyCareers) {
        for (const cid of cl.anyCareers) {
          const co = careerById.get(cid);
          if (!co || exclPast.has(cid)) continue;
          if (exclTrees.has(co.tree)) continue;
          if (cl.anyTrees && !cl.anyTrees.includes(co.tree)) continue;
          if (cl.maxCareerTier !== undefined && (co.tier || 0) > cl.maxCareerTier) continue;
          list.push(co);
        }
        return list;
      }
      if (cl.anyTrees) {
        for (const co of DATA.CAREERS) {
          if (exclPast.has(co.id) || exclTrees.has(co.tree)) continue;
          if (!cl.anyTrees.includes(co.tree)) continue;
          if (cl.maxCareerTier !== undefined && (co.tier || 0) > cl.maxCareerTier) continue;
          list.push(co);
        }
        return list;
      }
      const preferredIds = age < 14
        ? ["child"]
        : ["menial_worker", "astra_militarum", "underhive_ganger", "administratum", "imperial_navy", "rt_seneschal", "tech_priest", "ecclesiarchy_priest", "militarum_officer", "inquisitor", "astartes_brother", "adeptus_custodes", "chaos_cultist", "daemon_prince", "child"];
      const seen = new Set();
      for (const pid of preferredIds) {
        const co = careerById.get(pid);
        if (co && !exclPast.has(co.id) && !exclTrees.has(co.tree) && (cl.maxCareerTier === undefined || (co.tier || 0) <= cl.maxCareerTier)) {
          list.push(co);
          seen.add(co.id);
        }
      }
      if (needsStratSearch || list.length === 0) {
        for (const co of DATA.CAREERS) {
          if (seen.has(co.id) || exclPast.has(co.id) || exclTrees.has(co.tree)) continue;
          if (cl.maxCareerTier !== undefined && (co.tier || 0) > cl.maxCareerTier) continue;
          list.push(co);
          seen.add(co.id);
        }
      }
      return list;
    };

    const careerCandidates = buildCareerCandidates();
    if (careerCandidates.length === 0) return null;

    const extraTagVariants = needsStratSearch
      ? [
          [],
          ["lowborn"],
          ["military_blood"],
          ["schola"],
          ["noble"],
          ["terra_elite", "noble"],
          ["disowned_noble"],
          ["rogue_trader_blood", "noble"],
          ["bionic"],
          ["dreadnought"],
          ["astartes", "transhuman"],
          ["daemon_prince"],
          ["voidborn"],
          ["mechanicus_blood"],
          ["heretic"]
        ]
      : [[]];

    let worldTryList;
    if (needsStratSearch) {
      const priorityWorldIds = ["voidborn", "generic_civilised", "krieg", "terra", "necromunda", "cadia"];
      const pickedW = [];
      const seenW = new Set();
      const pushW = (w) => {
        if (!w || seenW.has(w.id)) return;
        seenW.add(w.id);
        pickedW.push(w);
      };
      for (const pid of priorityWorldIds) {
        pushW(worldCandidates.find((w) => w.id === pid && !exclHomeWorlds.has(w.id)));
      }
      for (const w of worldCandidates) {
        if (!exclHomeWorlds.has(w.id)) pushW(w);
        if (pickedW.length >= 10) break;
      }
      for (const w of worldCandidates) {
        pushW(w);
        if (pickedW.length >= 12) break;
      }
      worldTryList = pickedW;
    } else {
      worldTryList = [worldCandidates.find((w) => !exclHomeWorlds.has(w.id)) || worldCandidates[0]];
    }

    const focus = (cl.anyFocus && cl.anyFocus[0]) || "survival";
    const stats = { WS: 50, BS: 50, T: 50, Ag: 50, Int: 50, WP: 50, Fel: 50, Inf: 50 };
    if (cl.stats) {
      for (const sk of Object.keys(cl.stats)) stats[sk] = Math.max(stats[sk] || 50, cl.stats[sk]);
    }

    const stratReqOnly = needsStratSearch ? {
      minSocialTier: cl.minSocialTier,
      maxSocialTier: cl.maxSocialTier,
      anySocialTiers: cl.anySocialTiers,
      anyOriginClasses: cl.anyOriginClasses,
      excludeOriginClasses: cl.excludeOriginClasses,
      anyHabitats: cl.anyHabitats,
      excludeHabitats: cl.excludeHabitats,
      anyRealms: cl.anyRealms,
      excludeRealms: cl.excludeRealms,
      anyBodyClasses: cl.anyBodyClasses,
      excludeBodyClasses: cl.excludeBodyClasses,
      excludeTrees: cl.excludeTrees,
      maxCareerTier: cl.maxCareerTier
    } : null;

    for (const co of careerCandidates) {
      const careerId = co.id;
      const pastHistory = [careerId];
      if (!exclPast.has("child") && careerId !== "child") pastHistory.unshift("child");
      let pastOk = true;
      for (const grp of (cl._anyPastGroups || [])) {
        const pickedPast = grp.find((p) => {
          if (exclPast.has(p)) return false;
          const reach = reachableFrom.get(p);
          return p === careerId || (reach && reach.has(careerId));
        });
        if (!pickedPast) { pastOk = false; break; }
        if (!pastHistory.includes(pickedPast)) pastHistory.push(pickedPast);
      }
      if (!pastOk) continue;

      const gender = cl.gender || (co.req && co.req.gender) || "male";
      for (const chosenWorld of worldTryList) {
        let homeWorldId;
        if (cl.anyHomeWorlds && cl.anyHomeWorlds.length > 0) {
          homeWorldId = cl.anyHomeWorlds.find((id) => worldIds.has(id) && !exclHomeWorlds.has(id));
          if (!homeWorldId) continue;
        } else if (!exclHomeWorlds.has(chosenWorld.id)) {
          homeWorldId = chosenWorld.id;
        } else {
          const altHome = DATA.WORLDS.find((w) => !exclHomeWorlds.has(w.id));
          if (!altHome) continue;
          homeWorldId = altHome.id;
        }
        if (!worldIds.has(homeWorldId)) continue;

        for (const extraTags of extraTagVariants) {
          if (extraTags.some((t) => exclTags.has(t))) continue;
          const tagArr = [...new Set([...baseTagSet, ...extraTags])];
          const candidateState = {
            alive: true,
            difficulty: cl.difficulty || "standard",
            age,
            year,
            quarter: 1,
            gender,
            worldId: chosenWorld.id,
            homeWorldId,
            segmentum: chosenWorld.segmentum,
            careerId,
            careerHistory: pastHistory,
            chapterId,
            focus,
            stats,
            faith,
            corruption,
            wounds,
            maxWounds: Math.max(100, wounds),
            alignment,
            tags: tagArr,
            globalFlags: {
              greatRiftOpened: cl.greatRift !== undefined ? cl.greatRift : year >= 999
            }
          };
          if (!stratReqOnly || Engine.checkReq(candidateState, stratReqOnly)) {
            return candidateState;
          }
        }
      }
    }
    return null;
  }

  function proveReachable(req, owner, origReqForCheck) {
    if (!req) return true;
    const clauses = expandClauses(req);
    for (const cl of clauses) {
      const st = synthesizeClauseState(cl);
      if (st && Engine.checkReq(st, origReqForCheck || req)) return true;
    }
    fail(7, `Synthetically unreachable requirement in ${owner}`);
    return false;
  }

  let synthChecked = 0;
  for (let i = 0; i < DATA.EVENTS.length; i++) {
    const ev = DATA.EVENTS[i];
    const src = eventSourceByIndex[i] || "EVENTS";
    const owner = `${ev.id} (${src})`;
    auditPastCareerReq(ev.req, owner, null);
    synthChecked++;
    proveReachable(ev.req, owner, ev.req);
    (ev.choices || []).forEach((ch, idx) => {
      if (!ch.req) return;
      const chOwner = `${ev.id}:choice[${idx}] (${src})`;
      auditPastCareerReq(ch.req, chOwner, ev.req && ev.req.anyCareers ? ev.req.anyCareers : null);
      synthChecked++;
      const combined = ev.req ? { or: expandClauses(ev.req).flatMap((ec) => expandClauses(ch.req).map((cc) => mergeFlatReq(ec, cc)).filter(Boolean)) } : ch.req;
      let ok = false;
      const clauses = combined.or ? combined.or : expandClauses(combined);
      for (const cl of clauses) {
        const st = synthesizeClauseState(cl);
        if (st && Engine.checkReq(st, ev.req) && Engine.checkReq(st, ch.req)) { ok = true; break; }
      }
      if (!ok) fail(7, `Choice unreachable under parent event req in ${chOwner}`);
    });
  }

  for (const tl of DATA.TIMELINE) {
    const owner = `timeline:${tl.id}`;
    auditPastCareerReq(tl.filter, owner, null);
    synthChecked++;
    proveReachable(tl.filter, owner, tl.filter);
    (tl.choices || []).forEach((ch, idx) => {
      if (!ch.req) return;
      const chOwner = `timeline:${tl.id}:choice[${idx}]`;
      auditPastCareerReq(ch.req, chOwner, tl.filter && tl.filter.anyCareers ? tl.filter.anyCareers : null);
      synthChecked++;
      let ok = false;
      const parentClauses = expandClauses(tl.filter);
      const childClauses = expandClauses(ch.req);
      for (const ec of parentClauses) {
        for (const cc of childClauses) {
          const merged = mergeFlatReq(ec, cc);
          if (!merged) continue;
          const st = synthesizeClauseState(merged);
          if (st && Engine.checkReq(st, tl.filter) && Engine.checkReq(st, ch.req)) { ok = true; break; }
        }
        if (ok) break;
      }
      if (!ok) fail(7, `Timeline choice unreachable under parent filter in ${chOwner}`);
    });
  }

  for (let i = 0; i < DATA.CHRONICLES.length; i++) {
    const ch = DATA.CHRONICLES[i];
    const src = chronSourceByIndex[i] || "CHRONICLES";
    const owner = `${ch.id} (${src})`;
    auditPastCareerReq(ch.req, owner, null);
    synthChecked++;
    proveReachable(ch.req, owner, ch.req);
  }

  for (const c of DATA.CAREERS) {
    if (!c.req) continue;
    synthChecked++;
    proveReachable(c.req, `career:${c.id}`, c.req);
  }

  function reqMentionsCareer(req, cid) {
    if (!req) return false;
    if (req.anyCareers && req.anyCareers.includes(cid)) return true;
    if (req.or && req.or.some((sub) => reqMentionsCareer(sub, cid))) return true;
    return false;
  }

  let careersWithEvents = 0;
  let careersWithChrons = 0;
  for (const c of selectableCareers) {
    const hasEv = DATA.EVENTS.some((ev) => reqMentionsCareer(ev.req, c.id));
    const hasCh = DATA.CHRONICLES.some((ch) => reqMentionsCareer(ch.req, c.id));
    if (hasEv) careersWithEvents++;
    if (hasCh) careersWithChrons++;
  }

  console.log(
    `[Gate 7A/7B] Career graph verified (${DATA.CAREERS.length} nodes, ${pastCareerChecks} anyPastCareers checks), ` +
    `synthetic reachability proved (${synthChecked} req specs), ` +
    `directCareerMatch(events=${careersWithEvents}/${selectableCareers.length}, chronicles=${careersWithChrons}/${selectableCareers.length}).`
  );

  // Gate 7D: 전 91직군 승급 간선(A -> B) 스탯 상한 무결성 증명 (데드락 0건)
  let checkedEdges = 0;
  for (const b of selectableCareers) {
    const reqStats = (b.req && b.req.stats) || {};
    const statEntries = Object.entries(reqStats);
    if (statEntries.length === 0) continue;
    const prevSet = new Set();
    if (b.req && Array.isArray(b.req.anyCareers)) {
      b.req.anyCareers.forEach((id) => prevSet.add(id));
    }
    if (b.req && Array.isArray(b.req.or)) {
      for (const br of b.req.or) {
        if (br && Array.isArray(br.anyCareers)) br.anyCareers.forEach((id) => prevSet.add(id));
      }
    }
    if (prevSet.size === 0) continue;
    for (const prevId of prevSet) {
      const a = DATA.CAREERS.find((c) => c.id === prevId);
      if (!a) continue;
      checkedEdges++;
      const probe = {
        age: Math.max(20, (b.req && b.req.minAge) || 20),
        careerId: a.id,
        worldId: "generic_civilised",
        homeWorldId: "generic_civilised",
        traitId: "none",
        tags: [...((a.onJoin && a.onJoin.addTags) || [])],
        augmeticsCount: a.tree === "mechanicus" ? 1 : 0,
        stats: { WS: 25, BS: 25, T: 25, Ag: 25, Int: 25, WP: 25, Fel: 25, Inf: 25 }
      };
      for (const [sk, minVal] of statEntries) {
        const cap = Engine.getStatCap(probe, sk);
        if (cap < minVal) {
          fail(7, `Gate 7D promotion cap deadlock: ${a.id} (${sk} cap=${cap}) -> ${b.id} (requires ${sk}>=${minVal})`);
        }
      }
    }
  }
  console.log(`[Gate 7D] Promotion-cap integrity proved (${checkedEdges} direct edges, 0 cap deadlocks).`);

  // Gate 7E: 비카오스 forceCareer 강등 누수 · 폐쇄 서약 addTags 교차 누수 범용 정적 검사 + leadVariants/textVariants 도달성
  const CLOSED_VOW_TAG_TO_TREES = {
    sororitas: new Set(["sororitas"]),
    mechanicus: new Set(["mechanicus"]),
    navigator: new Set(["navis_navigator"]),
    imperial_knight: new Set(["imperial_knight"]),
    assassin: new Set(["officio_assassinorum"]),
    astartes: new Set(["astartes", "grey_knights", "chaos"]),
    custodes: new Set(["custodes"]),
    grey_knight: new Set(["grey_knights"]),
    living_saint: new Set(["living_saint"])
  };
  const INSTITUTION_TAGS = new Set([
    ...Object.keys(CLOSED_VOW_TAG_TO_TREES),
    "militarum",
    "imperial_military",
    "inquisition_agent",
    "inquisitor",
    "lord_inquisitor",
    "administratum",
    "ecclesiarchy",
    "rogue_trader",
    "rt_seneschal",
    "arbites",
    "commissar",
    "navy",
    "navy_captain",
    "navy_admiral"
  ]);
  const closedVowProbes = [
    { careerId: "adepta_sororitas", tree: "sororitas", tags: ["sororitas", "ecclesiarchy"], gender: "female" },
    { careerId: "tech_priest", tree: "mechanicus", tags: ["mechanicus", "bionic"], gender: "male" },
    { careerId: "nav_senior", tree: "navis_navigator", tags: ["navigator", "navis_officer", "voidborn"], gender: "male" },
    { careerId: "nav_novator", tree: "navis_navigator", tags: ["navigator", "nav_novator", "voidborn"], gender: "male" },
    { careerId: "knight_scion", tree: "imperial_knight", tags: ["imperial_knight", "knight_blood", "imperial_military"], gender: "male" },
    { careerId: "assassin_operative", tree: "officio_assassinorum", tags: ["assassin", "clade_vindicare"], gender: "male" },
    { careerId: "astartes_brother", tree: "astartes", tags: ["astartes", "transhuman", "battle_brother"], gender: "male", transhuman: true },
    { careerId: "adeptus_custodes", tree: "custodes", tags: ["custodes", "transhuman"], gender: "male", transhuman: true },
    { careerId: "grey_knight", tree: "grey_knights", tags: ["astartes", "grey_knight", "transhuman", "psyker"], gender: "male", transhuman: true },
    { careerId: "living_saint", tree: "living_saint", tags: ["living_saint", "saint_vessel", "transhuman"], gender: "female", transhuman: true }
  ];
  const highTierMortalProbes = [
    { careerId: "militarum_general", tree: "militarum", tags: ["general_rank", "militarum", "officer", "imperial_military"], gender: "male" },
    { careerId: "lord_inquisitor", tree: "inquisition", tags: ["lord_inquisitor", "inquisitor", "rosette"], gender: "male" },
    { careerId: "planetary_governor", tree: "governor", tags: ["planetary_governor", "noble"], gender: "male" },
    { careerId: "master_of_administratum", tree: "administratum", tags: ["administratum", "departmento_head", "high_lord_terra"], gender: "male" }
  ];

  // Validate probe IDs and institution tags up front so typos can never silently turn Gate 7E green
  for (const probe of [...closedVowProbes, ...highTierMortalProbes]) {
    const pc = careerById.get(probe.careerId);
    if (!pc) {
      fail(7, `Gate 7E internal probe references nonexistent careerId "${probe.careerId}"`);
    } else if (pc.tree !== probe.tree) {
      fail(7, `Gate 7E internal probe "${probe.careerId}" tree mismatch (probe=${probe.tree}, actual=${pc.tree})`);
    }
  }
  const tagLabels = DATA.TAG_LABELS || {};
  for (const instTag of INSTITUTION_TAGS) {
    if (!Object.prototype.hasOwnProperty.call(tagLabels, instTag)) {
      fail(7, `Gate 7E INSTITUTION_TAGS contains unregistered tag "${instTag}"`);
    }
  }

  function canProbeMatchChoice(evReq, chReq, probeCareerId, probeExtraTags, probeGender) {
    const evClauses = expandClauses(evReq);
    const chClauses = expandClauses(chReq);
    const pCareer = careerById.get(probeCareerId);
    if (!pCareer) return false;
    for (const ec of evClauses) {
      for (const cc of chClauses) {
        const merged = mergeFlatReq(ec, cc);
        if (!merged) continue;
        if (merged.gender && merged.gender !== probeGender) continue;
        if (merged.anyCareers && !merged.anyCareers.includes(probeCareerId)) continue;
        if (merged.anyTrees && !merged.anyTrees.includes(pCareer.tree)) continue;
        if (merged.excludeTrees && merged.excludeTrees.includes(pCareer.tree)) continue;
        if (merged.maxCareerTier !== undefined && pCareer.tier > merged.maxCareerTier) continue;
        const exclTags = new Set(merged.excludeTags || []);
        if (probeExtraTags.some((t) => exclTags.has(t))) continue;
        const forcedMerged = mergeFlatReq(merged, {
          anyCareers: [probeCareerId],
          gender: probeGender,
          allTags: probeExtraTags
        });
        if (!forcedMerged) continue;
        const st = synthesizeClauseState(forcedMerged);
        if (st && Engine.checkReq(st, evReq) && Engine.checkReq(st, chReq)) {
          return true;
        }
      }
    }
    return false;
  }

  let variantReachChecked = 0;
  let forceCareerAudited = 0;
  let closedVowTagAudited = 0;
  for (let i = 0; i < DATA.EVENTS.length; i++) {
    const ev = DATA.EVENTS[i];
    const src = eventSourceByIndex[i] || "EVENTS";
    for (const [vKey, vList] of [["leadVariants", ev.leadVariants], ["textVariants", ev.textVariants]]) {
      if (!Array.isArray(vList)) continue;
      vList.forEach((v, vi) => {
        if (!v || !v.req) return;
        variantReachChecked++;
        const parentClauses = expandClauses(ev.req);
        const varClauses = expandClauses(v.req);
        let ok = false;
        for (const ec of parentClauses) {
          for (const vc of varClauses) {
            const m = mergeFlatReq(ec, vc);
            if (!m) continue;
            const st = synthesizeClauseState(m);
            if (st && Engine.checkReq(st, ev.req) && Engine.checkReq(st, v.req)) { ok = true; break; }
          }
          if (ok) break;
        }
        if (!ok) fail(7, `Gate 7E unreachable ${vKey}[${vi}] under parent req in ${ev.id} (${src})`);
      });
    }

    (ev.choices || []).forEach((ch, ci) => {
      const chOwner = `${ev.id}:choice[${ci}] (${src})`;
      const outcomes = [ch.effect, ch.success, ch.fail, ch.critSuccess, ch.critFail].filter(Boolean);
      for (const out of outcomes) {
        const addedTags = Array.isArray(out.addTags) ? out.addTags : [];
        if (out.forceCareer) {
          const tc = careerById.get(out.forceCareer);
          if (tc && tc.tree !== "chaos") {
            forceCareerAudited++;
            const leakedInstTags = addedTags.filter((t) => INSTITUTION_TAGS.has(t));
            if (leakedInstTags.length > 0) {
              // Check higher-tier mortal downgrade leak (using live career tier from careerById)
              for (const hp of highTierMortalProbes) {
                const hpCareer = careerById.get(hp.careerId);
                if (hpCareer && hpCareer.tier > tc.tier && canProbeMatchChoice(ev.req, ch.req, hp.careerId, hp.tags, hp.gender)) {
                  fail(7, `Gate 7E non-chaos forceCareer="${tc.id}"(T${tc.tier}) + addTags=[${leakedInstTags.join(",")}] leaks to higher-tier ${hp.careerId}(T${hpCareer.tier}) in ${chOwner}`);
                }
              }
              // Check transhuman/closed-vow downgrade leak
              for (const cp of closedVowProbes) {
                const cpCareer = careerById.get(cp.careerId);
                if (cp.tree === tc.tree) continue;
                const blockedByEngine = (cp.transhuman && !tc.isTranshuman) || (cpCareer && cpCareer.tier > tc.tier) || cp.tree === "officio_assassinorum" || cp.tree === "living_saint";
                if (blockedByEngine && canProbeMatchChoice(ev.req, ch.req, cp.careerId, cp.tags, cp.gender)) {
                  fail(7, `Gate 7E non-chaos forceCareer="${tc.id}" + addTags=[${leakedInstTags.join(",")}] leaks institutional tag onto blocked order ${cp.careerId} in ${chOwner}`);
                }
              }
            }
            // Check hard biological/gender target career restrictions (abhuman / gender) cannot be bypassed by forceCareer
            const targetExclTags = (tc.req && Array.isArray(tc.req.excludeTags)) ? tc.req.excludeTags : [];
            if (targetExclTags.includes("abhuman")) {
              if (canProbeMatchChoice(ev.req, ch.req, "menial_worker", ["abhuman", "ogryn"], "male")) {
                fail(7, `Gate 7E non-chaos forceCareer="${tc.id}" (excludes abhuman) can be reached by abhuman probe in ${chOwner}`);
              }
            }
            if (tc.req && tc.req.gender) {
              const oppGender = tc.req.gender === "male" ? "female" : "male";
              if (canProbeMatchChoice(ev.req, ch.req, "menial_worker", [], oppGender)) {
                fail(7, `Gate 7E non-chaos forceCareer="${tc.id}" (gender=${tc.req.gender}) can be reached by ${oppGender} probe in ${chOwner}`);
              }
            }
          }
        }
        // Check closed-vow exclusive tag cross-leak (even without forceCareer)
        for (const t of addedTags) {
          const allowedTrees = CLOSED_VOW_TAG_TO_TREES[t];
          if (!allowedTrees) continue;
          closedVowTagAudited++;
          for (const cp of closedVowProbes) {
            if (allowedTrees.has(cp.tree)) continue;
            // Living saint can legitimately be reached from sororitas
            if (t === "living_saint" && cp.tree === "sororitas") continue;
            if (canProbeMatchChoice(ev.req, ch.req, cp.careerId, cp.tags, cp.gender)) {
              fail(7, `Gate 7E closed-vow tag "${t}" can leak onto incompatible closed-vow order ${cp.careerId} in ${chOwner}`);
            }
          }
        }
      }
    });
  }
  console.log(
    `[Gate 7E] Non-chaos forceCareer & closed-vow tag leak guard + variant reachability complete ` +
    `(forceCareerChecked=${forceCareerAudited}, closedVowTagsChecked=${closedVowTagAudited}, variantsChecked=${variantReachChecked}).`
  );
}
