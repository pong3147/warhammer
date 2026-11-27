// 조건 평가 · 파티션 버킷 인덱싱 · 3대 계층 축 컨텍스트 모듈 (무순환 DAG · createEngine 분리)
import {
  computeBodyClass,
  computeLifeRealm,
  computeSocialTier,
  getAlignmentInfo,
  normalizeAlignment
} from "./formatters.js";

export const SOCIAL_TIER_RANK = { underclass: 0, common: 1, elite: 2, apex: 3 };

export function buildPoolIndex(items) {
  const byChapter = new Map();
  const byWorld = new Map();
  const byCareer = new Map();
  const byTag = new Map();
  const general = [];
  const pushTo = (map, key, item) => {
    let arr = map.get(key);
    if (!arr) {
      arr = [];
      map.set(key, arr);
    }
    arr.push(item);
  };
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const req = item.req;
    if (req && Array.isArray(req.anyChapters) && req.anyChapters.length) {
      const uniq = new Set(req.anyChapters);
      uniq.forEach((k) => pushTo(byChapter, k, item));
    } else if (req && Array.isArray(req.anyWorlds) && req.anyWorlds.length) {
      const uniq = new Set(req.anyWorlds);
      uniq.forEach((k) => pushTo(byWorld, k, item));
    } else if (req && Array.isArray(req.anyCareers) && req.anyCareers.length) {
      const uniq = new Set(req.anyCareers);
      uniq.forEach((k) => pushTo(byCareer, k, item));
    } else if (req && Array.isArray(req.allTags) && req.allTags.length) {
      pushTo(byTag, req.allTags[0], item);
    } else {
      general.push(item);
    }
  }
  return { count: items.length, byChapter, byWorld, byCareer, byTag, general };
}

export function createReqEvaluatorModule({ DATA, getWorld, getCareer }) {
  const WORLD_TAG_SET_BY_ID = new Map((DATA.WORLDS || []).map((w) => [w.id, new Set(w.tags || [])]));
  const EVENT_BY_ID = new Map((DATA.EVENTS || []).map((e) => [e.id, e]));

  let EVENT_INDEX = buildPoolIndex(DATA.EVENTS || []);
  let CHRONICLE_INDEX = buildPoolIndex(DATA.CHRONICLES || []);

  function getEventBuckets(state) {
    if (EVENT_INDEX.count !== (DATA.EVENTS || []).length) EVENT_INDEX = buildPoolIndex(DATA.EVENTS || []);
    const buckets = [EVENT_INDEX.general];
    const bw = EVENT_INDEX.byWorld.get(state.worldId);
    if (bw) buckets.push(bw);
    const bc = EVENT_INDEX.byCareer.get(state.careerId);
    if (bc) buckets.push(bc);
    if (state.chapterId) {
      const bch = EVENT_INDEX.byChapter.get(state.chapterId);
      if (bch) buckets.push(bch);
    }
    const tags = state.tags || [];
    for (let i = 0; i < tags.length; i++) {
      const bt = EVENT_INDEX.byTag.get(tags[i]);
      if (bt) buckets.push(bt);
    }
    return buckets;
  }

  function getChronicleBuckets(state) {
    if (CHRONICLE_INDEX.count !== (DATA.CHRONICLES || []).length) CHRONICLE_INDEX = buildPoolIndex(DATA.CHRONICLES || []);
    const buckets = [CHRONICLE_INDEX.general];
    const bw = CHRONICLE_INDEX.byWorld.get(state.worldId);
    if (bw) buckets.push(bw);
    const bc = CHRONICLE_INDEX.byCareer.get(state.careerId);
    if (bc) buckets.push(bc);
    if (state.chapterId) {
      const bch = CHRONICLE_INDEX.byChapter.get(state.chapterId);
      if (bch) buckets.push(bch);
    }
    const tags = state.tags || [];
    for (let i = 0; i < tags.length; i++) {
      const bt = CHRONICLE_INDEX.byTag.get(tags[i]);
      if (bt) buckets.push(bt);
    }
    return buckets;
  }

  function getStratification(state) {
    const world = getWorld(state.worldId);
    const career = getCareer(state.careerId);
    const tagSet = new Set(state.tags || []);
    return {
      socialTier: computeSocialTier(state, career, tagSet),
      lifeRealm: computeLifeRealm(state, career, world, tagSet),
      bodyClass: computeBodyClass(state, career, tagSet)
    };
  }

  function makeReqContext(state) {
    const world = getWorld(state.worldId);
    const career = getCareer(state.careerId);
    const tagSet = new Set(state.tags || []);
    const align = normalizeAlignment(state);
    const alignInfo = getAlignmentInfo(state);
    return {
      world,
      career,
      worldTagSet: WORLD_TAG_SET_BY_ID.get(world.id) || new Set(world.tags || []),
      tagSet,
      pastCareerSet: new Set(state.careerHistory || [state.careerId]),
      align,
      alignInfo,
      alignDominant: alignInfo.dominant,
      socialTier: computeSocialTier(state, career, tagSet),
      lifeRealm: computeLifeRealm(state, career, world, tagSet),
      bodyClass: computeBodyClass(state, career, tagSet)
    };
  }

  function checkReq(state, req, ctx) {
    if (!req) return true;

    if (req.minAge !== undefined && state.age < req.minAge) return false;
    if (req.maxAge !== undefined && state.age > req.maxAge) return false;
    if (req.minYear !== undefined && state.year < req.minYear) return false;
    if (req.maxYear !== undefined && state.year > req.maxYear) return false;
    if (req.difficulty && (state.difficulty || "standard") !== req.difficulty) return false;
    if (req.gender && state.gender !== req.gender) return false;
    if (req.minFaith !== undefined && state.faith < req.minFaith) return false;
    if (req.maxFaith !== undefined && state.faith > req.maxFaith) return false;
    if (req.minCorruption !== undefined && state.corruption < req.minCorruption) return false;
    if (req.maxCorruption !== undefined && state.corruption > req.maxCorruption) return false;
    if (req.minWounds !== undefined && state.wounds < req.minWounds) return false;
    if (req.maxWounds !== undefined && state.wounds > req.maxWounds) return false;

    if (req.anyCareers) {
      if (!req.anyCareers.includes(state.careerId)) return false;
    }

    if (req.anyTrees || req.excludeTrees || req.maxCareerTier !== undefined) {
      const careerObj = (ctx && ctx.career) || getCareer(state.careerId);
      if (req.anyTrees && !req.anyTrees.includes(careerObj.tree)) return false;
      if (req.excludeTrees && req.excludeTrees.includes(careerObj.tree)) return false;
      if (req.maxCareerTier !== undefined && (careerObj.tier || 0) > req.maxCareerTier) return false;
    }

    if (req.minSocialTier || req.maxSocialTier || req.anySocialTiers) {
      const stTier = (ctx && ctx.socialTier) || computeSocialTier(state, (ctx && ctx.career) || getCareer(state.careerId), ctx && ctx.tagSet);
      const rank = SOCIAL_TIER_RANK[stTier] ?? 1;
      if (req.minSocialTier && rank < (SOCIAL_TIER_RANK[req.minSocialTier] ?? 0)) return false;
      if (req.maxSocialTier && rank > (SOCIAL_TIER_RANK[req.maxSocialTier] ?? 3)) return false;
      if (req.anySocialTiers && !req.anySocialTiers.includes(stTier)) return false;
    }

    if (req.anyRealms || req.excludeRealms) {
      const realm = (ctx && ctx.lifeRealm) || computeLifeRealm(state, (ctx && ctx.career) || getCareer(state.careerId), (ctx && ctx.world) || getWorld(state.worldId), ctx && ctx.tagSet);
      if (req.anyRealms && !req.anyRealms.includes(realm)) return false;
      if (req.excludeRealms && req.excludeRealms.includes(realm)) return false;
    }

    if (req.anyBodyClasses || req.excludeBodyClasses) {
      const body = (ctx && ctx.bodyClass) || computeBodyClass(state, (ctx && ctx.career) || getCareer(state.careerId), ctx && ctx.tagSet);
      if (req.anyBodyClasses && !req.anyBodyClasses.includes(body)) return false;
      if (req.excludeBodyClasses && req.excludeBodyClasses.includes(body)) return false;
    }

    if (req.anyPastCareers) {
      const pastSet = ctx ? ctx.pastCareerSet : new Set(state.careerHistory || [state.careerId]);
      let ok = false;
      for (let i = 0; i < req.anyPastCareers.length; i++) {
        if (pastSet.has(req.anyPastCareers[i])) {
          ok = true;
          break;
        }
      }
      if (!ok) return false;
    }

    if (req.excludePastCareers) {
      const pastSet = ctx ? ctx.pastCareerSet : new Set(state.careerHistory || [state.careerId]);
      for (let i = 0; i < req.excludePastCareers.length; i++) {
        if (pastSet.has(req.excludePastCareers[i])) return false;
      }
    }

    if (req.anyChapters) {
      if (!state.chapterId || !req.anyChapters.includes(state.chapterId)) return false;
    }

    if (req.excludeChapters) {
      if (state.chapterId && req.excludeChapters.includes(state.chapterId)) return false;
    }

    if (req.anyWorlds) {
      if (!req.anyWorlds.includes(state.worldId)) return false;
    }

    if (req.anyHomeWorlds) {
      if (!req.anyHomeWorlds.includes(state.homeWorldId)) return false;
    }

    if (req.excludeWorlds) {
      if (req.excludeWorlds.includes(state.worldId)) return false;
    }

    if (req.excludeHomeWorlds) {
      if (req.excludeHomeWorlds.includes(state.homeWorldId)) return false;
    }

    if (req.anySegmenta) {
      if (!req.anySegmenta.includes(state.segmentum)) return false;
    }

    if (req.anyFocus) {
      if (!req.anyFocus.includes(state.focus)) return false;
    }

    if (req.greatRift !== undefined) {
      const opened = Boolean(state.globalFlags && state.globalFlags.greatRiftOpened);
      if (opened !== req.greatRift) return false;
    }

    if (req.stats) {
      for (const k in req.stats) {
        if ((state.stats[k] || 0) < req.stats[k]) return false;
      }
    }

    const tagSet = ctx ? ctx.tagSet : null;
    if (req.allTags) {
      for (let i = 0; i < req.allTags.length; i++) {
        const t = req.allTags[i];
        if (tagSet ? !tagSet.has(t) : !state.tags.includes(t)) return false;
      }
    }

    if (req.anyTags) {
      let ok = false;
      for (let i = 0; i < req.anyTags.length; i++) {
        const t = req.anyTags[i];
        if (tagSet ? tagSet.has(t) : state.tags.includes(t)) {
          ok = true;
          break;
        }
      }
      if (!ok) return false;
    }

    if (req.excludeTags) {
      for (let i = 0; i < req.excludeTags.length; i++) {
        const t = req.excludeTags[i];
        if (tagSet ? tagSet.has(t) : state.tags.includes(t)) return false;
      }
    }

    if (req.anyWorldTags || req.excludeWorldTags) {
      const wTagSet = ctx ? ctx.worldTagSet : (WORLD_TAG_SET_BY_ID.get(state.worldId) || new Set((getWorld(state.worldId).tags) || []));
      if (req.anyWorldTags) {
        let ok = false;
        for (let i = 0; i < req.anyWorldTags.length; i++) {
          if (wTagSet.has(req.anyWorldTags[i])) {
            ok = true;
            break;
          }
        }
        if (!ok) return false;
      }
      if (req.excludeWorldTags) {
        for (let i = 0; i < req.excludeWorldTags.length; i++) {
          if (wTagSet.has(req.excludeWorldTags[i])) return false;
        }
      }
    }

    if (req.minAlign || req.maxAlign || req.anyDominantAlign) {
      const al = ctx && ctx.align ? ctx.align : normalizeAlignment(state);
      if (req.minAlign) {
        for (const k in req.minAlign) {
          if ((al[k] || 0) < req.minAlign[k]) return false;
        }
      }
      if (req.maxAlign) {
        for (const k in req.maxAlign) {
          if ((al[k] || 0) > req.maxAlign[k]) return false;
        }
      }
      if (req.anyDominantAlign) {
        const dom = ctx && ctx.alignDominant ? ctx.alignDominant : getAlignmentInfo(state).dominant;
        if (!req.anyDominantAlign.includes(dom)) return false;
      }
    }

    if (req.or && Array.isArray(req.or)) {
      let ok = false;
      for (let i = 0; i < req.or.length; i++) {
        if (checkReq(state, req.or[i], ctx)) {
          ok = true;
          break;
        }
      }
      if (!ok) return false;
    }

    return true;
  }

  return {
    WORLD_TAG_SET_BY_ID,
    EVENT_BY_ID,
    getEventBuckets,
    getChronicleBuckets,
    getStratification,
    makeReqContext,
    checkReq
  };
}
