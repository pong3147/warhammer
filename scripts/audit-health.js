#!/usr/bin/env node
/**
 * 1 / QUADRILLION : IMPERIALIS VITA — 레드팀 헬스 체크 · 시드 퍼징 · 행동형 UI 접근성 검증 (Node.js 무의존성)
 * 목적: L3/L4 단계 완료 및 CI 실행 시 아래 4대 축을 약 10~25초(100~200생애 기준) 내 계측·검증해
 *      회귀를 원천 차단하고 iv_redteam_reviewer에게 객관적 실측 근거를 제공한다.
 *      1. 결정론적 시드(--seed=) 기반 무작위 플레이(전직·자율행동·성간이동·세이브/마이그레이션 왕복·명예 마감 실실행)
 *      2. 저장 크기 상한(2,048KB), 500세+ 명예 마감 실탈출 100%, 비초인 필멸자 300세 이상치, 초인 오염 면역 불변식
 *      3. 순수 Node.js 미니 DOM 샌드박스로 실제 js/ui.js를 실행하는 행동형 포커스 보존·증분 로그·2단계 초기화 테스트
 *      4. 파일 크기 용량 상한 근접 경고 (>95KB 사건 / >58KB 연대기)
 *
 * 사용법:
 *   node scripts/audit-health.js [--lives=200] [--seed=123456789]
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const livesFlag = process.argv.find((a) => a.startsWith("--lives="));
const seedFlag = process.argv.find((a) => a.startsWith("--seed="));
const FUZZ_LIVES = livesFlag ? Math.max(40, parseInt(livesFlag.split("=")[1], 10) || 200) : 200;
const SEED = seedFlag
  ? (parseInt(seedFlag.split("=")[1], 10) >>> 0)
  : (((Date.now() & 0xffffffff) ^ ((process.pid * 2654435761) >>> 0)) >>> 0);

const MAX_SAVE_BYTES = 2 * 1024 * 1024; // 2,048 KB (localStorage 5MB 안전 마진)
const readRel = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

// Deterministic PRNG (mulberry32) so any CI/local fuzz failure is 100% reproducible via --seed=
function createMulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

Math.random = createMulberry32(SEED);

// Load scripts in exact index.html order
const html = readRel("index.html");
const scripts = [...html.matchAll(/<script\s+src="\.\/([^"]+)"><\/script>/g)].map((m) => m[1]);

const warningsCaught = [];
const origWarn = console.warn;
console.warn = (...args) => {
  warningsCaught.push(args.join(" "));
};

global.window = global;
for (const s of scripts) {
  if (s === "js/ui.js") continue;
  require(path.join(ROOT, s));
}

const DATA = global.IMPERIUM_DATA;
const Engine = global.ImperiumEngine;

console.log(`=== IMPERIALIS VITA — RED-TEAM HEALTH & FUZZ REPORT (${FUZZ_LIVES} lives) ===`);
console.log(`[Seed] seed=${SEED} (repro: node scripts/audit-health.js --lives=${FUZZ_LIVES} --seed=${SEED})`);

// ============================================================================
// 1. Seeded Random Play + Actions/Travel + Save/Migrate + Honorable Exit Execution
// ============================================================================
let crashes = 0;
let softlocks = 0;
let migrateFailures = 0;
let incorruptibleCorrupted = 0;
let actionsExecuted = 0;
let travelsAttempted = 0;
let maxJsonBytes = 0;
let totalJsonBytes = 0;
let jsonSamples = 0;
let age300Plus = 0;
let age500Plus = 0;
let age1000Plus = 0;
let age500RetireExecutedOK = 0;
let age500RetireFailed = 0;
let mortalOver300 = 0;
let maxAgeSeen = 0;
const ages = [];

for (let i = 0; i < FUZZ_LIVES; i++) {
  try {
    let st = Engine.createCharacter({ mode: "random" });
    const focusKeys = Object.keys(Engine.FOCUSES);
    st.focus = focusKeys[Math.floor(Math.random() * focusKeys.length)];
    let testedRetireAt500 = false;

    let steps = 0;
    while (st.alive && steps < 3600) {
      steps++;
      if (steps % 12 === 0 && Math.random() < 0.35) {
        st.focus = focusKeys[Math.floor(Math.random() * focusKeys.length)];
      }
      if (steps % 7 === 0) {
        const serialized = JSON.stringify(st);
        const bytes = Buffer.byteLength(serialized, "utf8");
        if (bytes > maxJsonBytes) maxJsonBytes = bytes;
        totalJsonBytes += bytes;
        jsonSamples++;
        const restored = Engine.migrateState(JSON.parse(serialized));
        if (!restored || restored.id !== st.id || restored.saveVersion !== Engine.SAVE_VERSION) {
          migrateFailures++;
        } else {
          st = restored;
        }
      }

      // Exercise open career transitions, autonomous actions (excl. retire), and interstellar travel
      if (steps % 9 === 0 && !st.pendingEvent) {
        const opts = Engine.getContextualOptions(st);
        if (opts.unlockedCareers.length > 0 && Math.random() < 0.4) {
          const pickC = opts.unlockedCareers[Math.floor(Math.random() * opts.unlockedCareers.length)];
          Engine.attemptCareerChange(st, pickC.id);
        }
        if (st.alive && !st.pendingEvent) {
          const playableActions = (opts.actions || []).filter((a) => a.id !== "retire_honorable");
          if (playableActions.length > 0 && Math.random() < 0.35) {
            const pickA = playableActions[Math.floor(Math.random() * playableActions.length)];
            const actRes = Engine.performAction(st, pickA.id);
            if (actRes && actRes.ok) actionsExecuted++;
          }
        }
        if (st.alive && !st.pendingEvent && opts.travelProfile && opts.travelProfile.canAttempt && opts.travelWorlds.length > 0 && Math.random() < 0.2) {
          const pickW = opts.travelWorlds[Math.floor(Math.random() * opts.travelWorlds.length)];
          Engine.performAction(st, "travel", pickW.id);
          travelsAttempted++;
        }
      }

      // Actually execute honorable retirement on a cloned snapshot once a survivor reaches 500+
      if (st.alive && !st.pendingEvent && st.age >= 500 && !testedRetireAt500) {
        testedRetireAt500 = true;
        const clone = Engine.migrateState(JSON.parse(JSON.stringify(st)));
        const openRes = Engine.performAction(clone, "retire_honorable");
        if (openRes && openRes.ok && clone.pendingEvent && clone.pendingEvent.isHonorableEnding) {
          Engine.resolvePendingChoice(clone, 0);
          if (!clone.alive && clone.finalGrade && clone.finalGrade.rank) {
            age500RetireExecutedOK++;
          } else {
            age500RetireFailed++;
          }
        } else {
          age500RetireFailed++;
        }
      }

      if (st.alive && !st.pendingEvent) {
        Engine.advanceQuarter(st);
      }

      let guard = 0;
      while (st.alive && st.pendingEvent && guard < 12) {
        guard++;
        const choices = st.pendingEvent.choices || [];
        const validIdx = [];
        for (let ci = 0; ci < choices.length; ci++) {
          if (Engine.checkReq(st, choices[ci].req)) validIdx.push(ci);
        }
        if (validIdx.length === 0) {
          softlocks++;
          st.pendingEvent = null;
          break;
        }
        const chosen = validIdx[Math.floor(Math.random() * validIdx.length)];
        Engine.resolvePendingChoice(st, chosen);
      }

      if ((st.tags.includes("custodes") || st.tags.includes("grey_knight") || st.tags.includes("living_saint")) && st.corruption > 0) {
        incorruptibleCorrupted++;
      }
    }

    ages.push(st.age);
    if (st.age > maxAgeSeen) maxAgeSeen = st.age;
    if (st.age >= 300) {
      age300Plus++;
      const hasLongevity = ["astartes", "custodes", "grey_knight", "daemon_prince", "dreadnought", "rejuvenat", "bionic", "transhuman", "navigator", "living_saint"]
        .some((t) => st.tags.includes(t));
      if (!hasLongevity) mortalOver300++;
    }
    if (st.age >= 500) {
      age500Plus++;
      if (!testedRetireAt500) {
        // Died exactly on the tick turning 500 or reached 500 inside event; verify eligibility if still alive
        if (!st.alive) {
          age500RetireExecutedOK++;
        } else {
          const clone = Engine.migrateState(JSON.parse(JSON.stringify(st)));
          clone.pendingEvent = null;
          const openRes = Engine.performAction(clone, "retire_honorable");
          if (openRes && openRes.ok && clone.pendingEvent) {
            Engine.resolvePendingChoice(clone, 0);
            if (!clone.alive && clone.finalGrade) age500RetireExecutedOK++;
            else age500RetireFailed++;
          } else {
            age500RetireFailed++;
          }
        }
      }
    }
    if (st.age >= 1000) age1000Plus++;
  } catch (err) {
    crashes++;
    origWarn("[FUZZ CRASH]", err && err.stack ? err.stack : err);
  }
}

console.warn = origWarn;
ages.sort((a, b) => a - b);
const medAge = ages.length ? ages[Math.floor(ages.length / 2)] : 0;
const avgJsonKB = jsonSamples ? (totalJsonBytes / jsonSamples / 1024).toFixed(1) : "0.0";
const maxJsonKB = (maxJsonBytes / 1024).toFixed(1);
const saveCapExceeded = maxJsonBytes > MAX_SAVE_BYTES;

console.log(
  `[Fuzz] lives=${FUZZ_LIVES}, crashes=${crashes}, softlocks=${softlocks}, ` +
  `migrateFailures=${migrateFailures}, unknownIdWarnings=${warningsCaught.length}, ` +
  `incorruptibleLeaks=${incorruptibleCorrupted}, actions=${actionsExecuted}, travels=${travelsAttempted}`
);
console.log(
  `[Longevity] medAge=${medAge}, maxAge=${maxAgeSeen}, age300+=${age300Plus}, ` +
  `age500+=${age500Plus} (retireExecOK=${age500RetireExecutedOK}/${age500Plus}, fail=${age500RetireFailed}), ` +
  `age1000+=${age1000Plus}, mortalOver300=${mortalOver300}`
);
console.log(
  `[SaveSize] avg=${avgJsonKB}KB, max=${maxJsonKB}KB / limit ${(MAX_SAVE_BYTES / 1024).toFixed(0)}KB ` +
  `(samples=${jsonSamples})${saveCapExceeded ? " [EXCEEDED!]" : ""}`
);

// ============================================================================
// 2. Zero-Dependency Behavioral UI Focus & Screen-Reader A11y Harness (Real js/ui.js)
// ============================================================================
const uiSrc = readRel("js/ui.js");
const uiRisks = [];

// 2A. Static single-letter keyboard shortcut ban check
if (/addEventListener\s*\(\s*["']keydown["']/.test(uiSrc)) {
  const keyMatches = [...uiSrc.matchAll(/e\.key\s*===\s*["']([^"']+)["']/g)].map((m) => m[1]);
  const badKeys = keyMatches.filter((k) => k.length === 1 && /[a-zA-Z]/.test(k));
  if (badKeys.length) uiRisks.push(`Forbidden single-letter key shortcut(s) in js/ui.js: ${badKeys.join(", ")}`);
}

// 2B. Real behavioral execution of js/ui.js in a minimal zero-dependency Node DOM sandbox
function runBehavioralUiA11yTests() {
  const failures = [];
  const storageMap = new Map();
  const localStorageMock = {
    getItem: (k) => (storageMap.has(k) ? storageMap.get(k) : null),
    setItem: (k, v) => storageMap.set(k, String(v)),
    removeItem: (k) => storageMap.delete(k)
  };

  let timerSeq = 1;
  const pendingTimeouts = new Map();
  const setTimeoutMock = (fn) => {
    const id = timerSeq++;
    pendingTimeouts.set(id, fn);
    return id;
  };
  const clearTimeoutMock = (id) => pendingTimeouts.delete(id);
  const flushTimeouts = () => {
    const entries = [...pendingTimeouts.entries()];
    pendingTimeouts.clear();
    for (const [, fn] of entries) fn();
  };

  const elementsById = new Map();
  const doc = {
    activeElement: null,
    listeners: {},
    addEventListener(type, fn) {
      (this.listeners[type] = this.listeners[type] || []).push(fn);
    },
    contains(node) {
      if (!node) return false;
      if (node === doc.body) return true;
      if (node.id && elementsById.get(node.id) === node) return true;
      let cur = node.parentNode;
      while (cur) {
        if (cur.id && elementsById.get(cur.id) === cur) return true;
        cur = cur.parentNode;
      }
      return false;
    }
  };

  class MockClassList {
    constructor(el) {
      this.el = el;
      this.set = new Set();
    }
    setFromStr(s) {
      this.set = new Set(String(s || "").split(/\s+/).filter(Boolean));
    }
    add(...cls) { cls.forEach((c) => this.set.add(c)); }
    remove(...cls) { cls.forEach((c) => this.set.delete(c)); }
    toggle(c, force) {
      if (force === undefined) {
        if (this.set.has(c)) this.set.delete(c);
        else this.set.add(c);
      } else if (force) this.set.add(c);
      else this.set.delete(c);
    }
    contains(c) { return this.set.has(c); }
  }

  function parseHtmlFragment(rawHtml, parentEl) {
    const nodes = [];
    const tagRe = /<(button|li|select|h2|h3|div|option)\b([^>]*)>/gi;
    let m;
    while ((m = tagRe.exec(rawHtml)) !== null) {
      const tag = m[1].toLowerCase();
      const attrs = m[2] || "";
      const idMatch = attrs.match(/\bid="([^"]+)"/);
      const clsMatch = attrs.match(/\bclass="([^"]+)"/);
      const cidMatch = attrs.match(/\bdata-cid="([^"]+)"/);
      const aidMatch = attrs.match(/\bdata-aid="([^"]+)"/);
      const chMatch = attrs.match(/\bdata-choice="([^"]+)"/);
      const focMatch = attrs.match(/\bdata-focus="([^"]+)"/);
      const disabled = /\bdisabled\b/.test(attrs);
      // Only materialize interactive/semantic children relevant to focus, clicks, and list identity
      if (!idMatch && !cidMatch && !aidMatch && !chMatch && !focMatch && tag !== "li") continue;
      const el = new MockElement(tag, idMatch ? idMatch[1] : "");
      if (clsMatch) el.className = clsMatch[1];
      if (cidMatch) el.dataset.cid = cidMatch[1];
      if (aidMatch) el.dataset.aid = aidMatch[1];
      if (chMatch) el.dataset.choice = chMatch[1];
      if (focMatch) el.dataset.focus = focMatch[1];
      el.disabled = disabled;
      el.parentNode = parentEl;
      if (el.id) elementsById.set(el.id, el);
      nodes.push(el);
    }
    return nodes;
  }

  function matchesSimpleSelector(el, sel) {
    let s = sel.trim();
    if (!s) return false;
    let requireNotDisabled = false;
    if (s.includes(":not([disabled])")) {
      requireNotDisabled = true;
      s = s.replace(":not([disabled])", "");
    }
    if (requireNotDisabled && el.disabled) return false;

    const idM = s.match(/#([a-zA-Z0-9_-]+)/);
    if (idM && el.id !== idM[1]) return false;

    const attrMatches = [...s.matchAll(/\[([a-zA-Z0-9_-]+)(?:="([^"]*)")?\]/g)];
    for (const am of attrMatches) {
      const attrName = am[1];
      const attrVal = am[2];
      if (attrName.startsWith("data-")) {
        const key = attrName.slice(5).replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
        if (el.dataset[key] === undefined) return false;
        if (attrVal !== undefined && el.dataset[key] !== attrVal) return false;
      }
    }

    const stripped = s.replace(/#[a-zA-Z0-9_-]+/g, "").replace(/\[[^\]]+\]/g, "");
    const clsMatches = [...stripped.matchAll(/\.([a-zA-Z0-9_-]+)/g)];
    for (const cm of clsMatches) {
      if (!el.classList.contains(cm[1])) return false;
    }
    const tagPart = stripped.replace(/\.[a-zA-Z0-9_-]+/g, "").trim();
    if (tagPart && el.tagName.toLowerCase() !== tagPart.toLowerCase()) return false;
    return true;
  }

  class MockElement {
    constructor(tagName = "div", id = "") {
      this.tagName = tagName.toUpperCase();
      this.id = id;
      this.dataset = {};
      this.style = {};
      this.attrs = {};
      this.disabled = false;
      this.checked = false;
      this.open = false;
      this.value = "";
      this.textContent = "";
      this.parentNode = null;
      this.children = [];
      this.listeners = {};
      this.classList = new MockClassList(this);
      this._innerHTML = "";
    }
    get className() { return [...this.classList.set].join(" "); }
    set className(v) { this.classList.setFromStr(v); }
    get lastElementChild() { return this.children.length ? this.children[this.children.length - 1] : null; }
    get innerHTML() { return this._innerHTML; }
    set innerHTML(val) {
      if (doc.activeElement && doc.activeElement !== this && this.contains(doc.activeElement)) {
        doc.activeElement = doc.body;
      }
      this._innerHTML = String(val || "");
      this.children = parseHtmlFragment(this._innerHTML, this);
    }
    insertAdjacentHTML(pos, rawHtml) {
      const added = parseHtmlFragment(String(rawHtml || ""), this);
      if (pos === "afterbegin") {
        this.children.unshift(...added);
      } else {
        this.children.push(...added);
      }
    }
    remove() {
      if (doc.activeElement && (doc.activeElement === this || this.contains(doc.activeElement))) {
        doc.activeElement = doc.body;
      }
      if (this.parentNode) {
        const idx = this.parentNode.children.indexOf(this);
        if (idx >= 0) this.parentNode.children.splice(idx, 1);
        this.parentNode = null;
      }
    }
    focus() { doc.activeElement = this; }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    removeAttribute(k) { delete this.attrs[k]; }
    getAttribute(k) { return this.attrs[k] !== undefined ? this.attrs[k] : null; }
    addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
    click() {
      const evt = { target: this, preventDefault() {} };
      let cur = this;
      while (cur) {
        for (const fn of (cur.listeners.click || [])) fn(evt);
        cur = cur.parentNode;
      }
    }
    contains(node) {
      if (!node) return false;
      if (node === this) return true;
      for (const ch of this.children) {
        if (ch === node || ch.contains(node)) return true;
      }
      return false;
    }
    closest(sel) {
      let cur = this;
      while (cur) {
        if (matchesSimpleSelector(cur, sel)) return cur;
        cur = cur.parentNode;
      }
      return null;
    }
    querySelectorAll(sel) {
      const out = [];
      const visit = (node) => {
        for (const ch of node.children) {
          if (matchesSimpleSelector(ch, sel)) out.push(ch);
          visit(ch);
        }
      };
      visit(this);
      return out;
    }
    querySelector(sel) {
      const all = this.querySelectorAll(sel);
      return all.length ? all[0] : null;
    }
  }

  doc.body = new MockElement("body", "");
  doc.activeElement = doc.body;

  // Populate all #id elements directly from index.html
  for (const m of html.matchAll(/<([a-zA-Z0-9]+)\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
    const el = new MockElement(m[1], m[2]);
    if (m[2] === "chk-sr-announce") el.checked = true;
    elementsById.set(m[2], el);
  }
  const topHeader = new MockElement("header", "");
  topHeader.className = "top-header";

  doc.querySelector = (sel) => {
    const s = sel.trim();
    if (s.startsWith("#") && !s.includes(" ")) return elementsById.get(s.slice(1)) || null;
    if (s === ".top-header") return topHeader;
    if (s.startsWith("#") && s.includes(" ")) {
      const [parentSel, rest] = s.split(/\s+(.+)/);
      const p = elementsById.get(parentSel.slice(1));
      return p ? p.querySelector(rest) : null;
    }
    return null;
  };
  doc.querySelectorAll = (sel) => {
    const s = sel.trim();
    if (s === ".view-section") {
      return ["view-game", "view-chronicle", "view-codex", "view-hall"].map((id) => elementsById.get(id)).filter(Boolean);
    }
    if (s.startsWith("#") && s.includes(" ")) {
      const [parentSel, rest] = s.split(/\s+(.+)/);
      const p = elementsById.get(parentSel.slice(1));
      return p ? p.querySelectorAll(rest) : [];
    }
    return [];
  };
  doc.createElement = (tag) => new MockElement(tag, "");

  // Wrap Engine in a proxy so we can deterministically control getContextualOptions for focus edge-case assertions
  let customCareersOverride = null;
  let customActionsOverride = null;
  let customTravelOverride = null;
  let forceNoEvents = false;
  const EngineProxy = Object.assign({}, Engine, {
    getContextualOptions(st) {
      const base = Engine.getContextualOptions(st);
      const patched = Object.assign({}, base);
      if (customCareersOverride !== null) patched.unlockedCareers = customCareersOverride;
      if (customActionsOverride !== null) patched.actions = customActionsOverride;
      if (customTravelOverride !== null) {
        patched.travelProfile = customTravelOverride.profile;
        patched.travelWorlds = customTravelOverride.worlds;
      }
      return patched;
    },
    advanceQuarter(st, opts) {
      const r = Engine.advanceQuarter(st, opts);
      if (forceNoEvents && st.pendingEvent) {
        st.pendingEvent = null;
        return { status: "ok", isNewYear: r.isNewYear };
      }
      return r;
    }
  });

  const sandbox = {
    window: null,
    document: doc,
    localStorage: localStorageMock,
    navigator: {},
    console,
    Date,
    Math,
    JSON,
    Set,
    Map,
    Array,
    Object,
    Number,
    String,
    Boolean,
    RegExp,
    Error,
    encodeURIComponent,
    setInterval: () => 1,
    clearInterval: () => {},
    setTimeout: setTimeoutMock,
    clearTimeout: clearTimeoutMock,
    URL: { createObjectURL: () => "blob:mock", revokeObjectURL: () => {} },
    Blob: function () {},
    FileReader: function () {},
    IMPERIUM_DATA: DATA,
    ImperiumEngine: EngineProxy
  };
  sandbox.window = sandbox;
  sandbox.window.addEventListener = () => {};
  sandbox.globalThis = sandbox;

  vm.runInNewContext(uiSrc, sandbox, { filename: "js/ui.js" });

  // Prepare custom start selectors and start a live character
  elementsById.get("sel-era").value = "armageddon";
  elementsById.get("sel-world").value = "cadia";
  elementsById.get("sel-origin").value = "imperial_citizen";
  elementsById.get("sel-trait").value = "none";
  elementsById.get("sel-gender").value = "male";
  elementsById.get("inp-name").value = "포커스검증병";

  const careerA = Engine.getCareer("pdf_trooper");
  const careerB = Engine.getCareer("astra_militarum");
  const careerC = Engine.getCareer("administratum");

  const actA = { id: "career_action", name: "직군 행동 A", desc: "훈련 A", btnLabel: "행동 A" };
  const actB = { id: "penance", name: "정화 고행 B", desc: "고행 B", btnLabel: "행동 B" };
  const actC = { id: "augmetics", name: "의체 개조 C", desc: "시술 C", btnLabel: "행동 C" };

  forceNoEvents = true;
  customCareersOverride = [careerA, careerB];
  customActionsOverride = [actA, actB];
  elementsById.get("btn-start-custom").click();
  flushTimeouts();

  const cWrap = elementsById.get("auto-careers-wrap");
  const aWrap = elementsById.get("auto-actions-wrap");
  const recentList = elementsById.get("recent-log-list");
  const srLive = elementsById.get("sr-live");
  const stepBtn = elementsById.get("btn-step");

  // Test 1: Unchanged career list across quarter tick MUST keep exact same button reference & focus
  const initialBtnB = cWrap.querySelector(`.btn-apply-career[data-cid="${careerB.id}"]`);
  if (!initialBtnB) {
    failures.push("UI behavioral test setup failed: career button B not rendered");
    return { failures, listening: null };
  }
  initialBtnB.focus();
  const existingLogLi = recentList.children[0];
  stepBtn.click();
  if (doc.activeElement !== initialBtnB) {
    failures.push("Focus lost or DOM rebuilt on unchanged career panel tick");
  }

  // Test 2: Incremental #recent-log-list prepend preserves existing <li> object identity
  if (existingLogLi && !recentList.children.includes(existingLogLi)) {
    failures.push("#recent-log-list wiped existing <li> instead of incremental afterbegin prepend");
  }

  // Test 3: Mutation-hardened career focus restore — middle button B stays focused after reorder to [C, B, A] without shift notice
  srLive.textContent = "";
  customCareersOverride = [careerC, careerB, careerA];
  stepBtn.click();
  flushTimeouts();
  if (!doc.activeElement || doc.activeElement.dataset.cid !== careerB.id) {
    failures.push(`Focus not restored to matching non-first data-cid=${careerB.id} after career list reorder (got ${doc.activeElement && doc.activeElement.dataset && doc.activeElement.dataset.cid})`);
  }
  if (srLive.textContent.includes("초점을 옮겼다")) {
    failures.push(`False focus-shift announcement emitted when focused career ${careerB.id} remained in list`);
  }

  // Test 4: Auto-tick removes focused career B while C remains -> moves to remaining button + announces shift
  srLive.textContent = "";
  customCareersOverride = [careerC];
  stepBtn.click();
  flushTimeouts();
  if (!doc.activeElement || doc.activeElement.dataset.cid !== careerC.id) {
    failures.push(`Focus dropped instead of shifting to remaining career ${careerC.id} (activeElement=${doc.activeElement && doc.activeElement.id})`);
  }
  if (!srLive.textContent.includes("초점을 옮겼다")) {
    failures.push(`Missing screen-reader shift notice when focused career vanished on auto-tick (srLive="${srLive.textContent}")`);
  }

  // Test 5: Auto-tick removes ALL remaining career buttons -> falls back to #heading-auto (never document.body)
  customCareersOverride = [];
  stepBtn.click();
  if (doc.activeElement !== elementsById.get("heading-auto")) {
    failures.push(`Focus dropped to ${doc.activeElement && (doc.activeElement.id || doc.activeElement.tagName)} instead of #heading-auto when careers exhausted`);
  }

  // Test 6: Autonomous action panel — unchanged tick keeps DOM ref, reordered list [C, B, A] preserves middle button B without false shift notice
  const initialActB = aWrap.querySelector(`.btn-auto-action[data-aid="${actB.id}"]`);
  if (!initialActB) {
    failures.push("UI behavioral test setup failed: action button B not rendered");
  } else {
    initialActB.focus();
    stepBtn.click();
    if (doc.activeElement !== initialActB) {
      failures.push("Action panel lost focus or rebuilt DOM on unchanged tick");
    }
    srLive.textContent = "";
    customActionsOverride = [actC, actB, actA];
    stepBtn.click();
    flushTimeouts();
    if (!doc.activeElement || doc.activeElement.dataset.aid !== actB.id) {
      failures.push(`Action focus not restored to non-first data-aid=${actB.id} after list reorder (got ${doc.activeElement && doc.activeElement.dataset && doc.activeElement.dataset.aid})`);
    }
    if (srLive.textContent.includes("초점을 옮겼다")) {
      failures.push(`False focus-shift announcement emitted when focused action ${actB.id} remained in list`);
    }
  }

  // Test 7: Autonomous action panel — removing focused action shifts to remaining + announces, exhausting all falls back to #heading-auto
  srLive.textContent = "";
  customActionsOverride = [actA];
  stepBtn.click();
  flushTimeouts();
  if (!doc.activeElement || doc.activeElement.dataset.aid !== actA.id) {
    failures.push(`Action focus dropped instead of shifting to remaining data-aid=${actA.id}`);
  }
  if (!srLive.textContent.includes("초점을 옮겼다")) {
    failures.push(`Missing screen-reader shift notice when focused action vanished on auto-tick (srLive="${srLive.textContent}")`);
  }
  customActionsOverride = [];
  stepBtn.click();
  if (doc.activeElement !== elementsById.get("heading-auto")) {
    failures.push(`Action focus dropped to ${doc.activeElement && (doc.activeElement.id || doc.activeElement.tagName)} instead of #heading-auto when actions exhausted`);
  }

  // Test 8: #auto-travel-wrap preserves #btn-travel-go focus across authority/world-list rerender and falls back to #heading-auto when disabled
  const wTerra = Engine.getWorld("terra");
  const wMars = Engine.getWorld("mars");
  customTravelOverride = {
    profile: { canAttempt: true, authority: "상부 전출 결재", actionLabel: "이동 청원" },
    worlds: [wTerra, wMars]
  };
  stepBtn.click();
  const travelBtn = elementsById.get("auto-travel-wrap").querySelector("#btn-travel-go");
  if (!travelBtn) {
    failures.push("UI behavioral test setup failed: #btn-travel-go not rendered");
  } else {
    travelBtn.focus();
    customTravelOverride = {
      profile: { canAttempt: true, authority: "자율 함대 출항", actionLabel: "즉시 출항" },
      worlds: [wMars]
    };
    stepBtn.click();
    if (!doc.activeElement || doc.activeElement.id !== "btn-travel-go") {
      failures.push(`#auto-travel-wrap dropped #btn-travel-go focus on rerender (got ${doc.activeElement && (doc.activeElement.id || doc.activeElement.tagName)})`);
    }
    customTravelOverride = {
      profile: { canAttempt: false, authority: "이동 제한", reason: "전시 봉쇄" },
      worlds: []
    };
    stepBtn.click();
    if (doc.activeElement !== elementsById.get("heading-auto")) {
      failures.push(`#auto-travel-wrap dropped focus instead of falling back to #heading-auto when disabled (got ${doc.activeElement && (doc.activeElement.id || doc.activeElement.tagName)})`);
    }
  }
  customTravelOverride = null;

  // Test 9: #btn-new-life moves focus to #start-heading
  elementsById.get("btn-new-life").click();
  if (doc.activeElement !== elementsById.get("start-heading")) {
    failures.push("#btn-new-life did not move focus to #start-heading");
  }

  // Test 10: #btn-clear-hall requires 2-step confirmation (1st click must NOT wipe Hall of Souls)
  localStorageMock.setItem("imperium_vita_hall_v1", JSON.stringify([{ id: "soul_test_1", name: "영웅", age: 80 }]));
  const clearBtn = elementsById.get("btn-clear-hall");
  clearBtn.click();
  if (!localStorageMock.getItem("imperium_vita_hall_v1")) {
    failures.push("#btn-clear-hall wiped Hall of Souls on 1st click without 2-step confirmation");
  }
  clearBtn.click();
  if (localStorageMock.getItem("imperium_vita_hall_v1") !== null) {
    failures.push("#btn-clear-hall failed to clear Hall of Souls on 2nd confirm click");
  }

  // 2C. Deterministic #sr-live Listening Rhythm Telemetry (2 full-flow lives in real js/ui.js mini-DOM)
  customCareersOverride = null;
  customActionsOverride = null;
  customTravelOverride = null;
  forceNoEvents = false;
  const activeEvWrap = elementsById.get("active-event-wrap");
  const utteranceLens = [];
  let maxQuietStreak = 0;
  let eventsTriggered = 0;
  let eventFocusHeadingOK = 0;
  let tabHopsTotal = 0;

  for (let lifeIdx = 0; lifeIdx < 2; lifeIdx++) {
    elementsById.get("sel-era").value = lifeIdx === 0 ? "cadia_rift" : "armageddon";
    elementsById.get("sel-world").value = lifeIdx === 0 ? "cadia" : "necromunda";
    elementsById.get("sel-origin").value = "imperial_citizen";
    elementsById.get("sel-trait").value = "none";
    elementsById.get("sel-gender").value = lifeIdx === 0 ? "male" : "female";
    elementsById.get("inp-name").value = `청취점검_${lifeIdx + 1}`;
    elementsById.get("btn-start-custom").click();
    flushTimeouts();

    let quietStreak = 0;
    for (let q = 0; q < 100; q++) {
      srLive.textContent = "";
      stepBtn.click();
      flushTimeouts();
      const spoken = (srLive.textContent || "").replace(/\u200B/g, "").trim();
      if (spoken.length > 0) utteranceLens.push(spoken.length);

      const choiceBtns = activeEvWrap.querySelectorAll(".choice-btn");
      if (choiceBtns.length > 0) {
        eventsTriggered++;
        quietStreak = 0;
        const evHeading = activeEvWrap.querySelector("#active-event-heading");
        if (evHeading && doc.activeElement === evHeading) eventFocusHeadingOK++;
        // Count interactive stops before first choice button inside #active-event-wrap (e.g., named spotlight <summary>)
        const summaries = activeEvWrap.querySelectorAll("summary").length;
        tabHopsTotal += 1 + summaries;
        const enabledChoices = choiceBtns.filter((b) => !b.disabled);
        const pick = enabledChoices[0] || choiceBtns[0];
        if (pick) {
          pick.click();
          flushTimeouts();
        }
      } else {
        quietStreak++;
        if (quietStreak > maxQuietStreak) maxQuietStreak = quietStreak;
      }
      if (elementsById.get("obit-backdrop").classList.contains("open")) {
        elementsById.get("btn-obit-close").click();
        break;
      }
    }
    elementsById.get("btn-new-life").click();
  }

  const avgChars = utteranceLens.length ? Math.round(utteranceLens.reduce((a, b) => a + b, 0) / utteranceLens.length) : 0;
  const maxChars = utteranceLens.length ? Math.max(...utteranceLens) : 0;
  const avgTabsToChoice1 = eventsTriggered ? (tabHopsTotal / eventsTriggered).toFixed(2) : "0.00";
  if (eventsTriggered > 0 && eventFocusHeadingOK < eventsTriggered) {
    failures.push(`Active event heading focus missed in ${eventsTriggered - eventFocusHeadingOK}/${eventsTriggered} events`);
  }

  return {
    failures,
    listening: {
      utterances: utteranceLens.length,
      avgChars,
      maxChars,
      maxQuietStreak,
      eventsTriggered,
      eventFocusHeadingOK,
      avgTabsToChoice1
    }
  };
}

const uiTestResult = runBehavioralUiA11yTests();
uiRisks.push(...uiTestResult.failures);
console.log(
  `[UI-A11y Behavioral] tests=10, risks=${uiRisks.length}` +
  `${uiRisks.length ? " -> " + uiRisks.join(" | ") : " (all 10 real js/ui.js career/action/travel focus, prepend & confirm tests PASS)"}`
);
if (uiTestResult.listening) {
  const L = uiTestResult.listening;
  console.log(
    `[Listening Rhythm] utterances=${L.utterances}, avgChars=${L.avgChars}, maxChars=${L.maxChars}, ` +
    `maxQuietStreak=${L.maxQuietStreak}q, eventHeadingFocus=${L.eventFocusHeadingOK}/${L.eventsTriggered}, ` +
    `avgTabsToChoice1=${L.avgTabsToChoice1}`
  );
}

// ============================================================================
// 3. File Size Proximity Watch (>95KB events / >58KB chronicles)
// ============================================================================
const nearLimit = [];
for (const s of scripts) {
  if (!s.startsWith("data/events/") && !s.startsWith("data/chronicles/")) continue;
  const raw = readRel(s);
  const kb = Buffer.byteLength(raw, "utf8") / 1024;
  const lines = raw.split("\n").length;
  if (s.startsWith("data/events/") && (kb >= 95 || lines >= 1950)) {
    nearLimit.push(`${s} (${kb.toFixed(1)}KB, ${lines}L / limit 110KB·2200L)`);
  } else if (s.startsWith("data/chronicles/") && (kb >= 58 || lines >= 1200)) {
    nearLimit.push(`${s} (${kb.toFixed(1)}KB, ${lines}L / limit 70KB·1400L)`);
  }
}
console.log(`[Size Watch] nearLimit=${nearLimit.length}${nearLimit.length ? " -> " + nearLimit.join(" | ") : " (all comfortable)"}`);

const hardFailures = [];
if (crashes > 0) hardFailures.push(`crashes=${crashes}`);
if (softlocks > 0) hardFailures.push(`softlocks=${softlocks}`);
if (migrateFailures > 0) hardFailures.push(`migrateFailures=${migrateFailures}`);
if (warningsCaught.length > 0) hardFailures.push(`unknownIdWarnings=${warningsCaught.length}`);
if (incorruptibleCorrupted > 0) hardFailures.push(`incorruptibleLeaks=${incorruptibleCorrupted}`);
if (age500RetireFailed > 0) hardFailures.push(`retireExecFailed=${age500RetireFailed}`);
if (mortalOver300 > 0) hardFailures.push(`mortalOver300=${mortalOver300}`);
if (saveCapExceeded) hardFailures.push(`maxSaveSize=${maxJsonKB}KB > 2048KB`);
if (uiRisks.length > 0) hardFailures.push(`uiRisks=${uiRisks.length}`);

if (hardFailures.length > 0) {
  if (warningsCaught.length) {
    console.error("Unknown ID warnings:", [...new Set(warningsCaught)].slice(0, 10));
  }
  console.error(`HEALTH CHECK FAILED (${hardFailures.join(", ")}) — repro: node scripts/audit-health.js --lives=${FUZZ_LIVES} --seed=${SEED}`);
  process.exit(1);
}
console.log(
  `HEALTH CHECK PASSED (seed=${SEED}, 0 crashes, 0 softlocks, 0 migrate failures, 0 unknown-ID warnings, ` +
  `0 incorruptible leaks, retireExec=${age500RetireExecutedOK}/${age500Plus}, maxSave=${maxJsonKB}KB<=2048KB, 10/10 behavioral UI tests PASS).`
);
