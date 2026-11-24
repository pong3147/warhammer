(function () {
  const DATA = window.IMPERIUM_DATA;
  const Engine = window.ImperiumEngine;
  const STORAGE_KEY = "imperium_vita_hall_v1";
  const ACTIVE_SAVE_KEY = "imperium_vita_active_v1";
  const PREFS_KEY = "imperium_vita_prefs_v1";
  const SPEED_MS = { 1: 10000, 2: 5000, 4: 2500 };

  let state = null;
  let tickIntervalId = null;
  let currentSpeed = 0; // 0=pause, 1(10s), 2(5s), 4(2.5s)
  let yearElapsedMs = 0;
  let activeCodexTab = "worlds";
  let fullLogFilter = "all";
  let chronOrder = "asc"; // asc: 0세 -> 현재, desc: 최신 -> 0세
  let selectedTravelWorldId = null;
  let lastFocusedBeforeModal = null;
  let focusGridInitialized = false;
  let lastTravelSignature = "";
  let lastTravelProfile = null;
  let lastLockedCareers = [];
  let knownUnlockedCareerIds = new Set();

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function showToast(msg, speak = true) {
    const el = $("#toast-msg");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2800);
    if (speak) announce(msg);
  }

  let _announceSeq = 0;
  let _announceTimer = null;
  function announce(msg) {
    const live = $("#sr-live");
    if (!live || !msg) return;
    _announceSeq += 1;
    clearTimeout(_announceTimer);
    // 동일 문장 반복 시에도 스크린 리더가 인식하도록 비가시 공백 교차
    live.textContent = "";
    const seq = _announceSeq;
    _announceTimer = setTimeout(() => {
      live.textContent = msg + (seq % 2 === 0 ? "\u200B" : "");
    }, 30);
  }

  function loadPrefs() {
    const defaults = { srAnnounce: true, fastChildhood: false, careerAlert: false };
    try {
      const saved = JSON.parse(localStorage.getItem(PREFS_KEY) || "null");
      return saved && typeof saved === "object" ? Object.assign(defaults, saved) : defaults;
    } catch {
      return defaults;
    }
  }

  let prefs = loadPrefs();

  function savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {}
  }

  function applyPrefsToUI() {
    const srChk = $("#chk-sr-announce");
    if (srChk) srChk.checked = prefs.srAnnounce !== false;
    const fcChk = $("#chk-fast-childhood");
    if (fcChk) fcChk.checked = Boolean(prefs.fastChildhood);
    const caChk = $("#chk-career-alert");
    if (caChk) caChk.checked = Boolean(prefs.careerAlert);
  }

  function isAutoAnnounceEnabled() {
    const chk = $("#chk-sr-announce");
    return chk ? chk.checked : prefs.srAnnounce !== false;
  }

  function isFastChildhoodEnabled() {
    const chk = $("#chk-fast-childhood");
    return chk ? chk.checked : Boolean(prefs.fastChildhood);
  }

  function isCareerAlertEnabled() {
    const chk = $("#chk-career-alert");
    return chk ? chk.checked : Boolean(prefs.careerAlert);
  }

  function syncKnownUnlockedCareers(charState) {
    knownUnlockedCareerIds = new Set();
    if (!charState || !charState.alive) return;
    const ctx = Engine.getContextualOptions(charState);
    ctx.unlockedCareers.forEach((c) => knownUnlockedCareerIds.add(c.id));
    (ctx.readyEventCareers || []).forEach((c) => knownUnlockedCareerIds.add(c.id));
  }

  function detectNewCareerUnlocks(charState) {
    if (!charState || !charState.alive) return [];
    const curCareer = Engine.getCareer(charState.careerId);
    const ctx = Engine.getContextualOptions(charState);
    const newly = [];
    const allReady = [...ctx.unlockedCareers, ...(ctx.readyEventCareers || [])];
    allReady.forEach((c) => {
      if (!knownUnlockedCareerIds.has(c.id)) {
        knownUnlockedCareerIds.add(c.id);
        if (charState.careerId === "child" || c.tier >= (curCareer ? curCareer.tier : 0)) {
          newly.push(c);
        }
      }
    });
    return newly;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ===== 로컬 스토리지: 진행 중 생애 자동 저장 =====
  function saveActiveState() {
    try {
      if (state && state.alive) {
        localStorage.setItem(ACTIVE_SAVE_KEY, JSON.stringify(state));
      } else {
        localStorage.removeItem(ACTIVE_SAVE_KEY);
      }
    } catch {}
  }

  function loadActiveState() {
    try {
      const raw = JSON.parse(localStorage.getItem(ACTIVE_SAVE_KEY) || "null");
      if (!raw || !raw.id || !raw.alive || !raw.stats || !Array.isArray(raw.logs)) return null;
      return raw;
    } catch {
      return null;
    }
  }

  function clearActiveState() {
    try {
      localStorage.removeItem(ACTIVE_SAVE_KEY);
    } catch {}
  }

  function renderResumeBanner() {
    const banner = $("#resume-banner");
    if (!banner) return;
    const saved = loadActiveState();
    if (!saved) {
      banner.style.display = "none";
      banner.innerHTML = "";
      return;
    }
    const w = Engine.getWorld(saved.worldId);
    const title = Engine.getCareerDisplayTitle(saved);
    banner.style.display = "flex";
    banner.innerHTML = `
      <div class="resume-banner-info">
        <h3>진행 중인 생애 기록 발견</h3>
        <p>${escapeHtml(saved.name)} (${saved.age}세 · ${Engine.formatImperialDate(saved.year, saved.quarter)}) · ${escapeHtml(title)} · ${escapeHtml(w.name)}</p>
      </div>
      <div class="resume-banner-actions">
        <button id="btn-resume-save" class="btn-gold">이전 생애 이어하기</button>
        <button id="btn-discard-save" class="btn-ghost">저장본 삭제</button>
      </div>
    `;
    const btnResume = $("#btn-resume-save");
    const btnDiscard = $("#btn-discard-save");
    if (btnResume) btnResume.addEventListener("click", () => resumeSavedGame());
    if (btnDiscard) {
      btnDiscard.addEventListener("click", () => {
        clearActiveState();
        renderResumeBanner();
        showToast("저장된 진행 기록을 삭제했다.");
      });
    }
  }

  function resumeSavedGame() {
    const saved = loadActiveState();
    if (!saved) {
      renderResumeBanner();
      showToast("이어할 수 있는 진행 기록이 없다.");
      return;
    }
    setSpeed(0);
    yearElapsedMs = 0;
    selectedTravelWorldId = null;
    lastTravelSignature = "";
    state = saved;
    syncKnownUnlockedCareers(state);
    $("#start-screen").style.display = "none";
    $("#play-dashboard").style.display = "grid";
    closeObituaryModal(false);
    switchMainView("game");
    renderAll();
    const targetHead = state.pendingEvent ? $("#active-event-heading") : $("#recent-chronicle-heading");
    if (targetHead) targetHead.focus();
    showToast(`${state.name} (${state.age}세)의 생애를 이어서 불러왔다. 일시정지 상태다.`);
  }

  // ===== 로컬 스토리지: 영혼의 전당 =====
  function loadHall() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveToHall(charState) {
    const list = loadHall();
    if (list.some((x) => x.id === charState.id)) return;
    list.unshift({
      id: charState.id,
      name: charState.name,
      gender: charState.gender,
      birthYear: charState.birthYear,
      deathYear: charState.year,
      age: charState.age,
      homeWorldId: charState.homeWorldId,
      finalWorldId: charState.worldId,
      visitedWorlds: charState.visitedWorlds || [charState.homeWorldId],
      careerId: charState.careerId,
      careerHistory: Array.from(new Set([...(charState.careerHistory || []), charState.careerId].filter(Boolean))),
      careerTitle: Engine.getCareerDisplayTitle(charState),
      chapterId: charState.chapterId || null,
      tags: (charState.tags || []).filter((t) => !t.startsWith("met_")).slice(0, 12),
      deathCause: charState.deathCause,
      grade: charState.finalGrade,
      seenTimeline: charState.seenTimeline,
      metCharacters: charState.metCharacters,
      stats: charState.stats,
      corruption: charState.corruption,
      faith: charState.faith
    });
    if (list.length > 60) list.pop();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }

  // ===== 커스텀 시작 폼 초기화 =====
  function initCustomSelectors() {
    $("#sel-era").innerHTML = Engine.ERA_PRESETS.map(
      (e) => `<option value="${e.id}">${escapeHtml(e.name)}</option>`
    ).join("");

    $("#sel-world").innerHTML =
      `<option value="random">무작위 행성</option>` +
      DATA.WORLDS.map(
        (w) => `<option value="${w.id}">${escapeHtml(w.name)} (${escapeHtml(Engine.getWorldShortTag(w))})</option>`
      ).join("");

    $("#sel-origin").innerHTML =
      `<option value="random">무작위 출생 신분</option>` +
      DATA.ORIGINS.map((o) => `<option value="${o.id}">${escapeHtml(o.name)}</option>`).join("");

    $("#sel-trait").innerHTML =
      `<option value="random">무작위 선천 자질</option>` +
      DATA.TRAITS.map((t) => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join("");
  }

  // ===== 시간 제어 (1년 = 10초 기본, 부드러운 게이지 진행) =====
  function updateProgressUI() {
    const labelEl = $("#year-progress-label");
    const secEl = $("#year-progress-sec");
    const fillEl = $("#year-progress-fill");
    if (!labelEl || !state) return;

    if (!state.alive) {
      labelEl.textContent = "생애 종료";
      secEl.textContent = "-";
      fillEl.style.width = "100%";
      return;
    }
    if (state.pendingEvent) {
      labelEl.textContent = "사건 발생 · 선택 대기 중 (자동 일시정지)";
      secEl.textContent = "대기";
      return;
    }

    const targetMs = SPEED_MS[currentSpeed] || 10000;
    const pct = Math.min(100, (yearElapsedMs / targetMs) * 100);
    fillEl.style.width = `${pct.toFixed(1)}%`;

    const fastKidActive = isFastChildhoodEnabled() && state.age < 13;
    if (currentSpeed === 0) {
      labelEl.textContent = `${Engine.formatImperialDate(state.year, state.quarter)} · 일시정지 중`;
      secEl.textContent = `${(yearElapsedMs / 1000).toFixed(1)} / ${(targetMs / 1000).toFixed(1)}초`;
    } else if (fastKidActive) {
      labelEl.textContent = `${Engine.formatImperialDate(state.year, state.quarter)} · 유년기 빠른 진행 (${currentSpeed}x, 1년 ${(targetMs / 1000).toFixed(1).replace(".0", "")}초)`;
      secEl.textContent = `${(yearElapsedMs / 1000).toFixed(1)} / ${(targetMs / 1000).toFixed(1)}초`;
    } else {
      labelEl.textContent = `${Engine.formatImperialDate(state.year, state.quarter)} · 다음 분기까지 (${currentSpeed}x, 1년 ${(targetMs * 3 / 1000).toFixed(1).replace(".0", "")}초)`;
      secEl.textContent = `${(yearElapsedMs / 1000).toFixed(1)} / ${(targetMs / 1000).toFixed(1)}초`;
    }
  }

  function setSpeed(speed) {
    currentSpeed = speed;
    clearInterval(tickIntervalId);
    tickIntervalId = null;

    const speedBtns = [
      ["#btn-pause", speed === 0],
      ["#btn-speed-1", speed === 1],
      ["#btn-speed-2", speed === 2],
      ["#btn-speed-4", speed === 4]
    ];
    speedBtns.forEach(([id, isOn]) => {
      const el = $(id);
      el.classList.toggle("active", isOn);
      el.setAttribute("aria-pressed", isOn ? "true" : "false");
    });

    if (speed > 0 && state && state.alive && !state.pendingEvent) {
      const targetMs = SPEED_MS[speed];
      tickIntervalId = setInterval(() => {
        if (!state || !state.alive || state.pendingEvent) {
          setSpeed(0);
          return;
        }
        yearElapsedMs += 100;
        if (yearElapsedMs >= targetMs) {
          yearElapsedMs = 0;
          stepOneYear();
        } else {
          updateProgressUI();
        }
      }, 100);
    }
    updateProgressUI();
  }

  function stepOneYear() {
    if (!state || !state.alive) {
      setSpeed(0);
      return;
    }
    if (state.pendingEvent) {
      setSpeed(0);
      showToast("먼저 발생한 사건의 선택지를 결정해야 한다.");
      return;
    }

    yearElapsedMs = 0;
    const prevTopLog = state.logs[0];
    const res = Engine.advanceQuarter(state, { fastChildhood: isFastChildhoodEnabled() });
    let newlyUnlocked = [];
    if (res.status === "event") {
      setSpeed(0);
    } else if (res.status === "dead") {
      setSpeed(0);
      saveToHall(state);
      clearActiveState();
      openObituaryModal();
    } else if (res.status === "ok" && state.alive) {
      newlyUnlocked = detectNewCareerUnlocks(state);
      if (newlyUnlocked.length > 0 && isCareerAlertEnabled()) {
        setSpeed(0);
      }
    }
    if (state.alive) saveActiveState();
    renderAll();

    if (res.status === "event" && state.pendingEvent) {
      const evHead = $("#active-event-heading");
      if (evHead) evHead.focus();
      const namedNames = (state.pendingEvent.characters || [])
        .map((cid) => Engine.getCharacter(cid))
        .filter(Boolean)
        .map((c) => c.name);
      const namedNote = namedNames.length ? ` 네임드 인물 조우: ${namedNames.join(", ")}.` : "";
      announce(`사건 발생, ${state.age}세.${namedNote} ${state.pendingEvent.title}`);
    } else if (res.status === "ok" && newlyUnlocked.length > 0 && isCareerAlertEnabled()) {
      const names = newlyUnlocked.map((c) => Engine.getCareerDisplayTitle(state, c)).slice(0, 3).join(", ");
      const extra = newlyUnlocked.length > 3 ? ` 외 ${newlyUnlocked.length - 3}종` : "";
      showToast(`새 진로 해금: ${names}${extra}. 자동 일시정지했다.`);
    } else if (res.status === "ok" && isAutoAnnounceEnabled() && state.logs[0] && state.logs[0] !== prevTopLog) {
      const latest = state.logs[0];
      const badge = latest.badge ? `${latest.badge}. ` : "";
      const delta = latest.deltaText ? ` (${latest.deltaText})` : "";
      announce(`${latest.age}세, ${badge}${latest.text}${delta}`);
    }
  }

  // ===== 게임 시작 =====
  function startNewGame(config) {
    setSpeed(0);
    yearElapsedMs = 0;
    selectedTravelWorldId = null;
    lastTravelSignature = "";
    state = Engine.createCharacter(config);
    syncKnownUnlockedCareers(state);
    saveActiveState();
    $("#start-screen").style.display = "none";
    $("#play-dashboard").style.display = "grid";
    closeObituaryModal(false);
    switchMainView("game");
    renderAll();
    setSpeed(1); // 1년 = 30초 (분기당 10초, 1년에 3건 기록/사건)
    const recHead = $("#recent-chronicle-heading");
    if (recHead) recHead.focus();
    const w = Engine.getWorld(state.worldId);
    const o = Engine.getOrigin(state.originId);
    const t = Engine.getTrait(state.traitId);
    const birthMsg = w.id === "krieg"
      ? `${state.name}, 크리그 비타-움(인공 배양실)에서 배양·등록(${o.name}). 자질 ${t.name}. 1년당 30초, 분기당 10초로 진행.`
      : `${state.name}, ${w.name}의 ${o.name} 가정에서 탄생. 자질 ${t.name}. 1년당 30초, 분기당 10초로 진행.`;
    showToast(birthMsg);
  }

  // ===== 화면 렌더링 =====
  function renderHeader() {
    if (!state) {
      $("#hdr-year").textContent = "대기 중 · M41";
      $("#hdr-realm").textContent = "임페리움 상크투스";
      $("#hdr-realm").classList.remove("nihilus");
      return;
    }
    $("#hdr-year").textContent = `${Engine.formatImperialDate(state.year, state.quarter)} · ${state.age}세`;
    const isNihilus = state.tags.includes("imperial_nihilus");
    const realmEl = $("#hdr-realm");
    if (isNihilus) {
      realmEl.textContent = "임페리움 니힐루스 (암흑 고립)";
      realmEl.classList.add("nihilus");
    } else if (state.globalFlags.greatRiftOpened) {
      realmEl.textContent = "인도미투스 시대 · 상크투스";
      realmEl.classList.remove("nihilus");
    } else {
      realmEl.textContent = "인류제국 · 41번째 천년기";
      realmEl.classList.remove("nihilus");
    }
  }

  function renderDossier() {
    const world = Engine.getWorld(state.worldId);
    const seg = DATA.SEGMENTA[state.segmentum];
    const origin = Engine.getOrigin(state.originId);
    const trait = Engine.getTrait(state.traitId);
    const lifeExp = Engine.computeLifeExpectancy(state);

    $("#lbl-mode-badge").textContent = state.mode === "random" ? "운명 모드" : "지정 출생";
    $("#char-name").textContent = `${state.name} (${state.gender === "male" ? "남" : "여"})`;
    $("#char-career").textContent = Engine.getCareerDisplayTitle(state);

    const chapEl = $("#char-chapter-cry");
    if (chapEl) {
      const chap = state.chapterId ? Engine.getChapter(state.chapterId) : null;
      if (chap) {
        chapEl.style.display = "block";
        chapEl.textContent = `${chap.name} · "${chap.battleCry}"`;
      } else {
        chapEl.style.display = "none";
        chapEl.textContent = "";
      }
    }

    $("#meta-age").textContent = `${Engine.formatImperialDate(state.year, state.quarter)} (${state.age}세)`;
    $("#meta-lifespan").textContent = `약 ${lifeExp}세`;
    $("#meta-world").textContent = `${world.name} · ${seg ? seg.name : ""}`;
    $("#meta-origin").textContent = `${origin.name.split(" ")[0]} / ${trait.name.split(" ")[0]}`;

    const woundPct = Math.round((state.wounds / state.maxWounds) * 100);
    $("#val-wounds").textContent = `${state.wounds} / ${state.maxWounds}`;
    $("#bar-wounds").style.width = `${Engine.clamp(woundPct, 0, 100)}%`;

    $("#val-faith").textContent = `${state.faith} / 100`;
    $("#bar-faith").style.width = `${state.faith}%`;

    $("#val-corruption").textContent = `${state.corruption} / 100`;
    $("#bar-corruption").style.width = `${state.corruption}%`;

    $("#stats-grid").innerHTML = Object.values(Engine.STAT_META).map((m) => {
      const val = state.stats[m.key];
      return `
        <div class="stat-item" title="${escapeHtml(m.desc)}">
          <div class="stat-top">
            <dt><span class="stat-key" aria-hidden="true">${m.key}</span>${m.name}</dt>
            <dd class="stat-num">${val}</dd>
          </div>
          <div class="stat-mini-bar" aria-hidden="true"><div class="stat-mini-fill" style="width:${val}%"></div></div>
        </div>
      `;
    }).join("");

    const dangerTags = new Set([
      "heretic", "chaos_aligned", "chaos_champion", "renegade_marine", "chaos_lord", "daemon_prince",
      "mark_khorne", "mark_tzeentch", "mark_nurgle", "mark_slaanesh",
      "wanted_by_inquisition", "rogue_psyker", "imperial_nihilus", "tech_heresy"
    ]);
    const visibleTags = state.tags.filter((t) => !t.startsWith("met_"));
    $("#tag-cloud").innerHTML = visibleTags.length
      ? visibleTags.map((t) => `<li class="tag-chip ${dangerTags.has(t) ? "danger" : ""}">${escapeHtml(Engine.TAG_LABELS[t] || t)}</li>`).join("")
      : `<li style="font-size:11.5px;color:var(--text-muted);">특이 이력 없음</li>`;
  }

  function renderFocuses() {
    const grid = $("#focus-grid");
    if (!grid) return;
    if (!focusGridInitialized) {
      grid.innerHTML = Object.values(Engine.FOCUSES).map((f) => {
        const forbidden = f.id === "forbidden" ? "forbidden" : "";
        return `
          <button class="focus-card ${forbidden}" data-focus="${f.id}" aria-pressed="false">
            <div class="focus-title">${escapeHtml(f.name)}</div>
            <div class="focus-desc">${escapeHtml(f.desc)}</div>
          </button>
        `;
      }).join("");
      focusGridInitialized = true;
    }

    $$("#focus-grid .focus-card").forEach((btn) => {
      const isActive = Boolean(state && state.focus === btn.dataset.focus);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function renderRollBanner() {
    const el = $("#roll-banner");
    if (!state.lastRoll) {
      el.style.display = "none";
      return;
    }
    const r = state.lastRoll;
    el.style.display = "flex";
    el.className = `roll-banner ${r.success ? "" : "fail"}`;
    const tag = r.critSuccess ? "치명적 대성공!" : r.critFail ? "치명적 대실패!" : (r.success ? "성공" : "실패");
    el.innerHTML = `
      <span>d100 판정 [${escapeHtml(r.statName)}${r.diff ? (r.diff > 0 ? `+${r.diff}` : r.diff) : ""}]</span>
      <strong>주사위 ${r.roll} ${r.success ? "≤" : ">"} 목표 ${r.target} · ${tag}</strong>
    `;
  }

  function renderActiveEvent() {
    const wrap = $("#active-event-wrap");
    if (!state.pendingEvent) {
      wrap.innerHTML = "";
      return;
    }
    const ev = state.pendingEvent;
    const namedChars = (ev.characters || [])
      .map((cid) => Engine.getCharacter(cid))
      .filter(Boolean);

    const charBadges = namedChars
      .map((c) => `<span class="ev-badge character">인물: ${escapeHtml(c.name)}</span>`)
      .join("");

    const spotlightHtml = namedChars.length
      ? `
        <details open class="named-spotlight" aria-label="조우한 네임드 인물 소개">
          <summary class="named-spotlight-summary">
            <span class="named-spotlight-kicker">네임드 인물 조우 기록</span>
            <span class="named-spotlight-names">${escapeHtml(namedChars.map((c) => c.name).join(" · "))}</span>
          </summary>
          <div class="named-spotlight-body">
            ${namedChars.map((c) => `
              <article class="named-profile-card">
                <div class="named-profile-head">
                  <h3 class="named-profile-name">${escapeHtml(c.name)}</h3>
                  <span class="named-profile-en" aria-hidden="true">${escapeHtml(c.en)}</span>
                </div>
                <div class="named-profile-meta">${escapeHtml(c.title)} · ${escapeHtml(c.faction)} · 활동기 ${escapeHtml(c.era)}</div>
                <blockquote class="named-profile-quote">"${escapeHtml(c.quote)}"</blockquote>
                <p class="named-profile-desc">${escapeHtml(c.desc)}</p>
                <div class="named-profile-source">출처: ${escapeHtml(c.source)}</div>
              </article>
            `).join("")}
          </div>
        </details>
      `
      : "";

    const reqBadge = ev.reqLabel
      ? `<span class="ev-badge">조건: ${escapeHtml(ev.reqLabel)}</span>`
      : (ev.scope ? `<span class="ev-badge">범위: ${escapeHtml(ev.scope)}</span>` : "");

    const choicesHtml = ev.choices.map((ch, idx) => {
      const unlocked = Engine.checkReq(state, ch.req);
      let oddsHtml = `<span class="choice-odds">확정</span>`;
      if (!unlocked) {
        oddsHtml = `<span class="choice-odds locked">잠김 · ${escapeHtml(Engine.describeReq(ch.req))}</span>`;
      } else if (ch.check) {
        const target = Engine.clamp(Math.round((state.stats[ch.check.stat] || 20) + (ch.check.diff || 0)), 5, 95);
        const meta = Engine.STAT_META[ch.check.stat];
        oddsHtml = `<span class="choice-odds">${meta ? meta.name : ch.check.stat} 성공률 ${target}%</span>`;
      }
      return `
        <button class="choice-btn" data-choice="${idx}" ${unlocked ? "" : "disabled"}>
          <span>${escapeHtml(ch.label)}</span>
          ${oddsHtml}
        </button>
      `;
    }).join("");

    wrap.innerHTML = `
      <section class="event-box ${ev.isTimeline ? "timeline-event" : ""}" aria-labelledby="active-event-heading">
        <div class="event-badges">
          <span class="ev-badge ${ev.isTimeline ? "timeline" : ""}">${ev.isTimeline ? "역사 대사건 · " + Engine.formatImperialYear(ev.year) : escapeHtml(ev.category || "분기 사건")}</span>
          ${reqBadge}
          ${charBadges}
        </div>
        <h2 id="active-event-heading" class="event-title" tabindex="-1">진행 중인 사건: ${escapeHtml(ev.title)}</h2>
        ${spotlightHtml}
        <p class="event-text">${escapeHtml(ev.text)}</p>
        <div class="event-choices">${choicesHtml}</div>
        ${ev.source ? `<div class="event-source">참조 출처: ${escapeHtml(ev.source)}</div>` : ""}
      </section>
    `;
  }

  function renderLogItemHtml(item) {
    const rollTag = item.meta
      ? `<span>d100 ${item.meta.roll}/${item.meta.target} ${item.meta.success ? "성공" : "실패"}</span>`
      : "";
    const badgeHtml = item.badge ? `<span class="log-badge">${escapeHtml(item.badge)}</span>` : "";
    const deltaHtml = item.deltaText ? `<div class="log-delta">${escapeHtml(item.deltaText)}</div>` : "";
    return `
      <li class="log-item ${item.kind}">
        <div class="log-head">
          <span>${escapeHtml(item.year)}, ${item.age}세${badgeHtml}</span>
          ${rollTag}
        </div>
        <div>${escapeHtml(item.text)}</div>
        ${deltaHtml}
      </li>
    `;
  }

  function renderRecentLogs() {
    $("#recent-log-total").textContent = `${state.logs.length}건`;
    const recent = state.logs.slice(0, 12);
    $("#recent-log-list").innerHTML = recent.map(renderLogItemHtml).join("");
  }

  function updateTravelPreview(targetId) {
    if (!state || !targetId) return;
    const evRes = Engine.evaluateTravelAttempt(state, targetId);
    const oddsEl = $("#travel-odds-preview");
    const distEl = $("#travel-dist-label");
    const chanceEl = $("#travel-chance-label");
    const goBtn = $("#btn-travel-go");
    if (oddsEl) oddsEl.className = `travel-odds-preview ${evRes.chance < 45 ? "low" : ""}`;
    if (distEl) distEl.textContent = `${evRes.distanceLabel || ""} 이동`;
    if (chanceEl) chanceEl.textContent = evRes.autoApprove ? "즉시 승인 (100%)" : `예상 승인율 ${evRes.chance}%`;
    if (goBtn) {
      goBtn.className = evRes.autoApprove ? "btn-gold" : "btn-ghost";
      goBtn.disabled = !state.alive || Boolean(state.pendingEvent);
      goBtn.textContent = (lastTravelProfile && lastTravelProfile.actionLabel) || "이동 청원";
    }
  }

  function groupCareersByTree(careers) {
    const groups = new Map();
    for (const c of careers) {
      const key = c.treeName || c.faction || "기타";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    }
    return Array.from(groups.entries()).map(([treeName, list]) => ({
      treeName,
      list: [...list].sort((a, b) => a.tier - b.tier)
    }));
  }

  function renderLockedCareersPreview() {
    const wrap = $("#all-careers-preview");
    if (!wrap) return;
    const grouped = groupCareersByTree(lastLockedCareers);
    wrap.innerHTML = grouped.map((g) => `
      <details class="career-tree-group">
        <summary>${escapeHtml(g.treeName)} (${g.list.length}종)</summary>
        <div class="career-tree-body">
          ${g.list.map((c) => {
            const modeTag = c.entryMode === "event" ? " · 발탁 이벤트 전용" : "";
            return `
              <div class="career-card">
                <div class="career-top">
                  <div>
                    <div class="career-name">${escapeHtml(c.name)}</div>
                    <div class="career-faction">${escapeHtml(c.faction)} · Tier ${c.tier}${modeTag}</div>
                  </div>
                </div>
                <div class="career-req">조건: ${escapeHtml(Engine.describeReq(c.req) || "조건 없음")}</div>
              </div>
            `;
          }).join("")}
        </div>
      </details>
    `).join("");
  }

  // ===== 우측 통합 자율 선택 패널 (상황에 맞는 항목만 노출!) =====
  function renderAutonomousPanel() {
    const ctx = Engine.getContextualOptions(state);
    const busy = !state.alive || Boolean(state.pendingEvent);

    // 1. 지금 지원 가능한 진로/승급 + 발탁 이벤트 대기 안내
    const cWrap = $("#auto-careers-wrap");
    const readyOffers = ctx.readyEventCareers || [];
    const readyBannerHtml = readyOffers.length > 0
      ? `
        <div class="ready-offer-box">
          <strong>상위 · 특임 발탁 조건 달성 (${readyOffers.length}종)</strong>
          <p>${escapeHtml(readyOffers.slice(0, 3).map((c) => Engine.getCareerDisplayTitle(state, c)).join(", "))}${readyOffers.length > 3 ? ` 외 ${readyOffers.length - 3}종` : ""} — 시간이 흐르면 임명·발탁 사건이 도착한다.</p>
        </div>
      `
      : "";

    if (ctx.unlockedCareers.length > 0) {
      cWrap.innerHTML = readyBannerHtml + ctx.unlockedCareers.map((c) => {
        const displayName = Engine.getCareerDisplayTitle(state, c);
        const trialNote = c.trialCheck ? ` · [시련: ${Engine.STAT_META[c.trialCheck.stat].name}]` : "";
        return `
          <div class="career-card unlocked" style="margin-bottom:8px;">
            <div class="career-top">
              <div>
                <div class="career-name">${escapeHtml(displayName)}</div>
                <div class="career-faction">${escapeHtml(c.faction)} · Tier ${c.tier}${trialNote}</div>
              </div>
              <span class="ev-badge">수명 ${c.lifeBonus >= 0 ? "+" + c.lifeBonus : c.lifeBonus}</span>
            </div>
            <div class="career-desc">${escapeHtml(c.desc)}</div>
            <button class="btn-gold btn-apply-career" data-cid="${c.id}" ${busy ? "disabled" : ""} style="width:100%;">
              ${c.trialCheck ? "선발 시련 도전" : "이 진로로 지원 / 승급"}
            </button>
          </div>
        `;
      }).join("");
    } else {
      const hintHtml = ctx.nearCareers.length
        ? `<div class="near-goal-list">
            ${ctx.nearCareers.map((c) => {
              const modeHint = c.entryMode === "event" ? " [발탁 이벤트]" : "";
              return `
                <div class="near-goal-item">
                  <strong>다음 목표 힌트 · ${escapeHtml(c.name)}${modeHint}</strong>
                  <span style="color:var(--text-muted);">필요: ${escapeHtml(Engine.describeReq(c.req))}</span>
                </div>
              `;
            }).join("")}
          </div>`
        : "";
      cWrap.innerHTML = readyBannerHtml + `
        <div class="empty-hint-box">
          지금 직접 지원할 수 있는 진로가 없다. <strong>삶의 초점</strong>으로 스탯을 키우거나 공훈을 쌓으면 승급·횡단 발탁 사건이 자연스럽게 찾아온다.
          ${hintHtml}
        </div>
      `;
    }

    // 2. 현재 조건이 맞는 자율 행동만 노출
    const aSec = $("#auto-actions-section");
    const aWrap = $("#auto-actions-wrap");
    if (ctx.actions.length > 0) {
      aSec.style.display = "block";
      aWrap.innerHTML = ctx.actions.map((a) => `
        <div class="action-card">
          <h4>${escapeHtml(a.name)}</h4>
          <p>${escapeHtml(a.desc)}</p>
          <button class="btn-ghost btn-auto-action" data-aid="${a.id}" ${busy ? "disabled" : ""} style="width:100%;">${escapeHtml(a.btnLabel)}</button>
        </div>
      `).join("");
    } else {
      aSec.style.display = "none";
      aWrap.innerHTML = "";
    }

    // 3. 계급 기반 성간 이동 / 파견 청원 (드롭다운 포커스 유실 방지를 위한 부분 갱신)
    const tWrap = $("#auto-travel-wrap");
    const tp = ctx.travelProfile;
    lastTravelProfile = tp;

    if (!tp.canAttempt || ctx.travelWorlds.length === 0) {
      lastTravelSignature = "";
      tWrap.innerHTML = `
        <div class="empty-hint-box">
          <div class="travel-auth-label">${escapeHtml(tp.authority)}</div>
          <div>${escapeHtml(tp.reason || "현재 이동할 수 있는 인접 행성이 없다.")}</div>
          <div class="travel-note">※ 직접 청원하지 않아도 시간이 흐르면 상황에 맞는 파견·순례 이벤트가 자연스럽게 찾아온다.</div>
        </div>
      `;
    } else {
      if (!selectedTravelWorldId || !ctx.travelWorlds.some((w) => w.id === selectedTravelWorldId)) {
        selectedTravelWorldId = ctx.travelWorlds[0].id;
      }
      const sig = `${tp.authority}|${ctx.travelWorlds.map((w) => w.id).join(",")}`;
      const existingSel = $("#sel-travel-world");

      if (existingSel && lastTravelSignature === sig) {
        existingSel.value = selectedTravelWorldId;
        updateTravelPreview(selectedTravelWorldId);
      } else {
        lastTravelSignature = sig;
        const evalMap = new Map();
        ctx.travelWorlds.forEach((w) => evalMap.set(w.id, Engine.evaluateTravelAttempt(state, w.id)));
        const evalRes = evalMap.get(selectedTravelWorldId) || Engine.evaluateTravelAttempt(state, selectedTravelWorldId);
        const oddsClass = evalRes.chance < 45 ? "low" : "";

        tWrap.innerHTML = `
          <div class="travel-authority-box">
            <div class="travel-auth-label">결재 권한: ${escapeHtml(tp.authority)}</div>
            <div class="travel-row" style="margin-top:6px;">
              <label for="sel-travel-world" class="sr-only">이동 대상 행성 선택</label>
              <select id="sel-travel-world">
                ${ctx.travelWorlds.map((w) => {
                  const evW = evalMap.get(w.id);
                  const sel = w.id === selectedTravelWorldId ? "selected" : "";
                  return `<option value="${w.id}" ${sel}>${escapeHtml(w.name)} (${escapeHtml(Engine.getWorldShortTag(w))} · ${escapeHtml(evW.distanceLabel)})</option>`;
                }).join("")}
              </select>
            </div>
            <div id="travel-odds-preview" class="travel-odds-preview ${oddsClass}">
              <span id="travel-dist-label">${escapeHtml(evalRes.distanceLabel || "")} 이동</span>
              <strong id="travel-chance-label">${evalRes.autoApprove ? "즉시 승인 (100%)" : `예상 승인율 ${evalRes.chance}%`}</strong>
            </div>
            <button id="btn-travel-go" class="${evalRes.autoApprove ? "btn-gold" : "btn-ghost"}" ${busy ? "disabled" : ""} style="width:100%;">
              ${escapeHtml(tp.actionLabel || "이동 청원")}
            </button>
            <div class="travel-note">※ 높은 계급일수록 승인율이 오르며, 최고위 지휘관·하이 로드·행성 총독·로그 트레이더는 즉시 출항할 수 있다.</div>
          </div>
        `;
      }
    }

    // 4. 접이식 전체 병종 도감 미리보기 (아코디언이 열려 있을 때만 지연 렌더링)
    lastLockedCareers = ctx.lockedCareers || DATA.CAREERS.filter((c) => c.selectable && c.id !== state.careerId && !Engine.checkReq(state, c.req));
    $("#locked-career-count").textContent = `${lastLockedCareers.length}종`;
    const detailsEl = $("#locked-careers-details");
    if (detailsEl && detailsEl.open) {
      renderLockedCareersPreview();
    }

    $("#btn-step").disabled = busy;
  }

  // ===== 인생 기록서 전용 뷰 (전체 연대기 몰아보기) =====
  function getLifeChapter(age) {
    if (age <= 13) return { key: "child", title: "제1장 · 유년기 (0~13세)" };
    if (age <= 29) return { key: "youth", title: "제2장 · 청년기와 입문 (14~29세)" };
    if (age <= 59) return { key: "prime", title: "제3장 · 성년과 전성기 (30~59세)" };
    if (age <= 149) return { key: "elder", title: "제4장 · 황혼과 노련기 (60~149세)" };
    return { key: "immortal", title: "제5장 · 필멸을 초월한 불멸의 세기 (150세+)" };
  }

  function renderFullChronicle() {
    const body = $("#full-chronicle-body");
    if (!state) {
      $("#chron-char-title").textContent = "전체 인생 기록서";
      $("#chron-char-sub").textContent = "아직 탄생한 인물이 없다. 생애 시뮬레이션 탭에서 새 운명을 시작하라.";
      $("#full-log-count").textContent = "0건";
      body.innerHTML = `<div class="empty-hint-box">진행 중인 생애 기록이 없다.</div>`;
      return;
    }

    const homeW = Engine.getWorld(state.homeWorldId);
    const curW = Engine.getWorld(state.worldId);
    $("#chron-char-title").textContent = `${state.name}의 인생 기록서 (${Engine.getCareerDisplayTitle(state)})`;
    $("#chron-char-sub").textContent = `${Engine.formatImperialYear(state.birthYear)} 출생(${homeW.name}) · 현재 ${Engine.formatImperialYear(state.year)} (${state.age}세, ${curW.name}) · ${state.alive ? "생존" : "사망"}`;
    $("#btn-chron-order").textContent = chronOrder === "asc" ? "정렬: 출생순 (0세부터)" : "정렬: 최신순 (현재부터)";

    let logs = state.logs.filter((item) => {
      if (fullLogFilter === "chronicle") return item.kind === "chronicle" || item.kind === "chronicle-grim" || item.kind === "normal";
      if (fullLogFilter === "major") return item.kind !== "chronicle" && item.kind !== "chronicle-grim" && item.kind !== "normal";
      return true;
    });

    if (chronOrder === "asc") {
      logs = [...logs].reverse();
    }

    $("#full-log-count").textContent = `${logs.length} / 전체 ${state.logs.length}건`;
    if (!logs.length) {
      body.innerHTML = `<div class="empty-hint-box">선택한 필터에 해당하는 기록이 아직 없다.</div>`;
      return;
    }

    let html = "";
    let lastChapKey = null;
    for (const item of logs) {
      const chap = getLifeChapter(item.age);
      if (chap.key !== lastChapKey) {
        if (lastChapKey !== null) html += `</ul>`;
        html += `<h3 class="chapter-heading">${escapeHtml(chap.title)}</h3><ul class="log-list">`;
        lastChapKey = chap.key;
      }
      html += renderLogItemHtml(item);
    }
    if (lastChapKey !== null) html += `</ul>`;
    body.innerHTML = html;
  }

  function buildPlainTextChronicle(charState) {
    if (!charState) return "";
    const homeW = Engine.getWorld(charState.homeWorldId);
    const curW = Engine.getWorld(charState.worldId);
    const origin = Engine.getOrigin(charState.originId);
    const trait = Engine.getTrait(charState.traitId);
    const chap = charState.chapterId ? Engine.getChapter(charState.chapterId) : null;
    const grade = charState.finalGrade || (!charState.alive ? Engine.evaluateLifeGrade(charState) : null);

    const lines = [
      "============================================================",
      "1 / QUADRILLION : IMPERIALIS VITA — 제국 생애 기록서",
      "============================================================",
      `이름: ${charState.name} (${charState.gender === "male" ? "남성" : "여성"})`,
      `직책: ${Engine.getCareerDisplayTitle(charState)}`,
      `생몰/시점: ${Engine.formatImperialYear(charState.birthYear)} ~ ${Engine.formatImperialYear(charState.year)} (${charState.age}세, ${charState.alive ? "생존" : "사망"})`,
      `출생/현재 행성: ${homeW.name} -> ${curW.name}`,
      `출신/선천 자질: ${origin.name} / ${trait.name}`
    ];
    const careerPath = (charState.careerHistory || [])
      .filter((id) => id && id !== "child")
      .map((id) => Engine.getCareerDisplayTitle(charState, Engine.getCareer(id)));
    if (careerPath.length > 1) {
      lines.push(`거쳐 간 계급 경력: ${careerPath.join(" -> ")}`);
    }
    if (chap) {
      lines.push(`소속 챕터: ${chap.name} ("${chap.battleCry}")`);
    }
    if (!charState.alive && charState.deathCause) {
      lines.push(`사망 사유: ${charState.deathCause}`);
    }
    if (grade) {
      lines.push(`최종 등급: [${grade.rank}] ${grade.title}`);
      lines.push(`평가: ${grade.verdict}`);
    }

    const statLine = Object.values(Engine.STAT_META)
      .map((m) => `${m.name}(${m.key}) ${charState.stats[m.key]}`)
      .join(" | ");
    lines.push("");
    lines.push(`[특성치] ${statLine}`);
    lines.push(`[상태] 생명력 ${charState.wounds}/${charState.maxWounds} | 황제 신앙 ${charState.faith}/100 | 워프 오염 ${charState.corruption}/100`);

    const visibleTags = (charState.tags || []).filter((t) => !t.startsWith("met_")).map((t) => Engine.TAG_LABELS[t] || t);
    if (visibleTags.length) lines.push(`[보유 이력] ${visibleTags.join(", ")}`);

    const visitedNames = (charState.visitedWorlds || [charState.homeWorldId]).map((id) => Engine.getWorld(id).name);
    lines.push(`[방문 행성 (${visitedNames.length})] ${visitedNames.join(", ")}`);

    const tlNames = (charState.seenTimeline || [])
      .map((id) => DATA.TIMELINE.find((t) => t.id === id))
      .filter(Boolean)
      .map((t) => `${Engine.formatImperialYear(t.year)} ${t.title}`);
    if (tlNames.length) lines.push(`[목격한 역사 사건 (${tlNames.length})] ${tlNames.join(" / ")}`);

    const charNames = (charState.metCharacters || [])
      .map((id) => Engine.getCharacter(id))
      .filter(Boolean)
      .map((c) => c.name);
    if (charNames.length) lines.push(`[조우한 네임드 인물 (${charNames.length})] ${charNames.join(", ")}`);

    lines.push("");
    lines.push("------------------------------------------------------------");
    lines.push(`생애 연대기 전문 (총 ${charState.logs.length}건, 출생순)`);
    lines.push("------------------------------------------------------------");

    const orderedLogs = [...charState.logs].reverse();
    let lastChapKey = null;
    for (const item of orderedLogs) {
      const ch = getLifeChapter(item.age);
      if (ch.key !== lastChapKey) {
        lines.push("");
        lines.push(`## ${ch.title}`);
        lastChapKey = ch.key;
      }
      const badge = item.badge ? `[${item.badge}] ` : "";
      const roll = item.meta ? ` (d100 ${item.meta.roll}/${item.meta.target} ${item.meta.success ? "성공" : "실패"})` : "";
      const delta = item.deltaText ? ` {${item.deltaText}}` : "";
      lines.push(`- [${item.year}, ${item.age}세] ${badge}${item.text}${roll}${delta}`);
    }
    return lines.join("\n");
  }

  function copyTextWithFallback(text) {
    const fallbackCopy = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    };
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy());
    }
    return Promise.resolve(fallbackCopy());
  }

  function copyCurrentChronicle() {
    if (!state) {
      showToast("복사할 생애 기록이 없다.");
      return;
    }
    const text = buildPlainTextChronicle(state);
    copyTextWithFallback(text).then((ok) => {
      showToast(ok ? `${state.name}의 전체 생애 기록서(${state.logs.length}건)를 클립보드에 복사했다.` : "클립보드 복사에 실패했다. .txt 파일 저장을 이용해 보라.");
    });
  }

  function exportCurrentChronicleTxt() {
    if (!state) {
      showToast("저장할 생애 기록이 없다.");
      return;
    }
    const text = buildPlainTextChronicle(state);
    const safeName = String(state.name || "imperial_soul").replace(/[\\/:*?"<>|\s]+/g, "_");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName}_${state.age}y_chronicle.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`${state.name}의 생애 기록서를 텍스트 파일로 저장했다.`);
  }

  function renderAll() {
    if (!state) return;
    renderHeader();
    renderDossier();
    renderFocuses();
    renderRollBanner();
    renderActiveEvent();
    renderRecentLogs();
    renderAutonomousPanel();
    updateProgressUI();
  }

  // ===== 사망 부고 모달 =====
  function setBackgroundInert(flag) {
    const targets = [$(".top-header"), ...$$(".view-section")].filter(Boolean);
    targets.forEach((el) => {
      el.inert = Boolean(flag);
      if (flag) el.setAttribute("aria-hidden", "true");
      else el.removeAttribute("aria-hidden");
    });
  }

  function openObituaryModal() {
    const obitBackdrop = $("#obit-backdrop");
    if (!obitBackdrop.classList.contains("open")) {
      const active = document.activeElement;
      lastFocusedBeforeModal = active && !obitBackdrop.contains(active) ? active : null;
    }

    const grade = state.finalGrade || Engine.evaluateLifeGrade(state);
    $("#obit-rank").textContent = grade.rank;
    $("#obit-title").textContent = `${state.name} — ${grade.title}`;
    $("#obit-verdict").textContent = grade.verdict;

    const tlNames = state.seenTimeline
      .map((id) => DATA.TIMELINE.find((t) => t.id === id))
      .filter(Boolean)
      .map((t) => `${Engine.formatImperialYear(t.year)} ${t.title}`);

    const charNames = state.metCharacters
      .map((id) => Engine.getCharacter(id))
      .filter(Boolean)
      .map((c) => c.name);

    const worldsVisited = state.visitedWorlds.map((id) => Engine.getWorld(id).name);
    const careerPath = (state.careerHistory || [])
      .filter((id) => id && id !== "child")
      .map((id) => Engine.getCareerDisplayTitle(state, Engine.getCareer(id)));

    $("#obit-body").innerHTML = `
      <div class="meta-box" style="margin-bottom:12px;">
        <span class="meta-label">사망 사유 및 생몰 연도</span>
        <span class="meta-val">${Engine.formatImperialYear(state.birthYear)} ~ ${Engine.formatImperialYear(state.year)} (향년 ${state.age}세) · ${escapeHtml(state.deathCause)}</span>
      </div>
      <div class="meta-box" style="margin-bottom:12px;">
        <span class="meta-label">최종 병종 / 직책</span>
        <span class="meta-val">${escapeHtml(Engine.getCareerDisplayTitle(state))}</span>
      </div>
      ${careerPath.length > 1 ? `
      <div class="meta-box" style="margin-bottom:12px;">
        <span class="meta-label">거쳐 간 계급 경력 (${careerPath.length}단계)</span>
        <span class="meta-val">${escapeHtml(careerPath.join(" -> "))}</span>
      </div>
      ` : ""}
      <div class="obit-stats-row">
        ${Object.values(Engine.STAT_META).map((m) => `
          <div class="meta-box">
            <span class="meta-label">${m.key} ${m.name}</span>
            <span class="meta-val" style="color:var(--gold-bright);">${state.stats[m.key]}</span>
          </div>
        `).join("")}
      </div>
      <div class="meta-box" style="margin-bottom:10px;">
        <span class="meta-label">거쳐 간 행성 (${worldsVisited.length})</span>
        <span class="meta-val">${escapeHtml(worldsVisited.join(", "))}</span>
      </div>
      <div class="meta-box" style="margin-bottom:10px;">
        <span class="meta-label">목격한 실제 역사 대사건 (${tlNames.length})</span>
        <span class="meta-val">${tlNames.length ? escapeHtml(tlNames.join(" / ")) : "역사의 변방에서 조용히 생을 마쳤다."}</span>
      </div>
      <div class="meta-box">
        <span class="meta-label">조우한 전설적 인물 (${charNames.length})</span>
        <span class="meta-val">${charNames.length ? escapeHtml(charNames.join(", ")) : "없음"}</span>
      </div>
    `;

    setBackgroundInert(true);
    obitBackdrop.classList.add("open");
    obitBackdrop.setAttribute("aria-hidden", "false");
    const obitTitle = $("#obit-title");
    if (obitTitle) obitTitle.focus();
    announce(`생애 종료. 향년 ${state.age}세. ${state.deathCause}`);
  }

  function closeObituaryModal(restoreFocus = true) {
    const obitBackdrop = $("#obit-backdrop");
    const wasOpen = obitBackdrop.classList.contains("open");
    obitBackdrop.classList.remove("open");
    obitBackdrop.setAttribute("aria-hidden", "true");
    setBackgroundInert(false);
    if (wasOpen && restoreFocus) {
      const target = lastFocusedBeforeModal && document.contains(lastFocusedBeforeModal)
        ? lastFocusedBeforeModal
        : $("#recent-chronicle-heading");
      if (target && typeof target.focus === "function") target.focus();
    }
    lastFocusedBeforeModal = null;
  }

  // ===== 제국 코덱스 & 출처 대조관 =====
  function lexicanumUrl(query) {
    return `https://wh40k.lexicanum.com/mediawiki/index.php?search=${encodeURIComponent(query)}`;
  }

  function renderCodex() {
    const q = ($("#codex-search").value || "").trim().toLowerCase();
    const grid = $("#codex-grid");

    if (activeCodexTab === "worlds") {
      const items = DATA.WORLDS.filter((w) =>
        `${w.name} ${w.en} ${w.worldClass} ${w.desc} ${w.guardRegiment || ""} ${w.astartesChapter || ""} ${w.source}`.toLowerCase().includes(q)
      );
      grid.innerHTML = items.map((w) => `
        <div class="codex-card">
          <div>
            <h3>${escapeHtml(w.name)}</h3>
            <div class="codex-en">${escapeHtml(w.en)} · ${escapeHtml(w.classCode)} · ${escapeHtml(w.worldClass)}</div>
            <div class="codex-body">
              <p style="margin-bottom:6px;">${escapeHtml(w.desc)}</p>
              <div style="font-size:11.5px;color:var(--text-sub);">
                인구: ${escapeHtml(w.population)} · 기본 수명: ${w.baseLifeExpectancy}세<br/>
                고유 연대: ${escapeHtml(w.guardRegiment || "-")}${w.astartesChapter ? `<br/>징병 챕터: ${escapeHtml(w.astartesChapter)}` : ""}
              </div>
            </div>
          </div>
          <div class="codex-foot">
            <span>${escapeHtml(w.source)}</span>
            <a class="codex-link" href="${lexicanumUrl(w.en)}" target="_blank" rel="noopener">Lexicanum 대조 (새 창)</a>
          </div>
        </div>
      `).join("");
      return;
    }

    if (activeCodexTab === "careers") {
      const items = DATA.CAREERS.filter((c) => c.selectable).filter((c) =>
        `${c.name} ${c.en} ${c.faction} ${c.treeName || ""} ${c.desc} ${c.source}`.toLowerCase().includes(q)
      );
      const grouped = groupCareersByTree(items);
      if (!grouped.length) {
        grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">검색 조건에 맞는 병종·계급이 없다.</p>`;
        return;
      }
      grid.innerHTML = grouped.map((g, idx) => `
        <details class="codex-tree-group" ${q.length > 0 || idx === 0 ? "open" : ""}>
          <summary>${escapeHtml(g.treeName)} (${g.list.length}종 · Tier ${g.list[0].tier}~${g.list[g.list.length - 1].tier})</summary>
          <div class="codex-grid codex-tree-grid">
            ${g.list.map((c) => {
              const modeLabel = c.entryMode === "event" ? "발탁 이벤트 전용" : "직접 지원 가능";
              return `
                <div class="codex-card">
                  <div>
                    <h3>${escapeHtml(c.name)}</h3>
                    <div class="codex-en">${escapeHtml(c.en)} · ${escapeHtml(c.faction)} · Tier ${c.tier} · ${modeLabel}</div>
                    <div class="codex-body">
                      <p style="margin-bottom:6px;">${escapeHtml(c.desc)}</p>
                      <div style="font-size:11.5px;color:var(--gold);">
                        해금 조건: ${escapeHtml(Engine.describeReq(c.req) || "조건 없음")} · 수명 보정 ${c.lifeBonus >= 0 ? "+" + c.lifeBonus : c.lifeBonus}년
                      </div>
                    </div>
                  </div>
                  <div class="codex-foot">
                    <span>${escapeHtml(c.source)}</span>
                    <a class="codex-link" href="${lexicanumUrl(c.en)}" target="_blank" rel="noopener">Lexicanum 대조 (새 창)</a>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </details>
      `).join("");
      return;
    }

    if (activeCodexTab === "chapters") {
      const items = (DATA.CHAPTERS || []).filter((ch) =>
        `${ch.name} ${ch.en} ${ch.primarch} ${ch.homeworld} ${ch.battleCry} ${ch.desc} ${ch.source}`.toLowerCase().includes(q)
      );
      grid.innerHTML = items.map((ch) => {
        const mods = Object.entries(ch.statMods || {})
          .map(([k, v]) => `${(Engine.STAT_META[k] && Engine.STAT_META[k].name) || k} ${v > 0 ? "+" + v : v}`)
          .join(", ");
        const extra = [
          ch.faithBonus ? `신앙 +${ch.faithBonus}` : "",
          ch.allowPsyker === false ? "사이커 입단 불가" : ""
        ].filter(Boolean).join(" · ");
        return `
          <div class="codex-card">
            <div>
              <h3>${escapeHtml(ch.name)}</h3>
              <div class="codex-en">${escapeHtml(ch.en)} · 프라이마크 ${escapeHtml(ch.primarch)} · 모성 ${escapeHtml(ch.homeworld)}</div>
              <div class="codex-body">
                <p style="margin-bottom:6px;font-style:italic;color:var(--gold);">"${escapeHtml(ch.battleCry)}"</p>
                <p style="margin-bottom:6px;">${escapeHtml(ch.desc)}</p>
                <div style="font-size:11.5px;color:var(--cogitator);">보정: ${escapeHtml(mods)}${extra ? " · " + escapeHtml(extra) : ""}</div>
              </div>
            </div>
            <div class="codex-foot">
              <span>${escapeHtml(ch.source)}</span>
              <a class="codex-link" href="${lexicanumUrl(ch.en)}" target="_blank" rel="noopener">Lexicanum 대조 (새 창)</a>
            </div>
          </div>
        `;
      }).join("");
      return;
    }

    if (activeCodexTab === "timeline") {
      const items = DATA.TIMELINE.filter((t) =>
        `${t.title} ${t.en} ${t.scope} ${t.summary} ${t.source}`.toLowerCase().includes(q)
      );
      grid.innerHTML = items.map((t) => `
        <div class="codex-card">
          <div>
            <h3>${Engine.formatImperialYear(t.year)} — ${escapeHtml(t.title)}</h3>
            <div class="codex-en">${escapeHtml(t.en)} · 범위: ${escapeHtml(t.scope)}</div>
            <div class="codex-body"><p>${escapeHtml(t.summary)}</p></div>
          </div>
          <div class="codex-foot">
            <span>${escapeHtml(t.source)}</span>
            <a class="codex-link" href="${lexicanumUrl(t.en)}" target="_blank" rel="noopener">Lexicanum 대조 (새 창)</a>
          </div>
        </div>
      `).join("");
      return;
    }

    if (activeCodexTab === "characters") {
      const items = DATA.CHARACTERS.filter((c) =>
        `${c.name} ${c.en} ${c.title} ${c.faction} ${c.desc} ${c.source}`.toLowerCase().includes(q)
      );
      grid.innerHTML = items.map((c) => `
        <div class="codex-card">
          <div>
            <h3>${escapeHtml(c.name)}</h3>
            <div class="codex-en">${escapeHtml(c.en)} · ${escapeHtml(c.title)}</div>
            <div class="codex-body">
              <p style="margin-bottom:6px;font-style:italic;color:var(--gold);">"${escapeHtml(c.quote)}"</p>
              <p>${escapeHtml(c.desc)}</p>
            </div>
          </div>
          <div class="codex-foot">
            <span>${escapeHtml(c.source)}</span>
            <a class="codex-link" href="${lexicanumUrl(c.en)}" target="_blank" rel="noopener">Lexicanum 대조 (새 창)</a>
          </div>
        </div>
      `).join("");
    }
  }

  // ===== 영혼의 전당 =====
  function renderHall() {
    const list = loadHall();
    const selectableCareers = DATA.CAREERS.filter((c) => c.selectable);
    const totalChapters = (DATA.CHAPTERS || []).length;

    const uniqueWorlds = new Set(list.flatMap((x) => (Array.isArray(x.visitedWorlds) && x.visitedWorlds.length ? x.visitedWorlds : [x.homeWorldId])).filter(Boolean));
    const uniqueCareers = new Set(
      list
        .flatMap((x) => (Array.isArray(x.careerHistory) && x.careerHistory.length ? x.careerHistory : [x.careerId]))
        .filter((id) => id && id !== "child")
    );
    const uniqueChapters = new Set(list.map((x) => x.chapterId).filter(Boolean));
    const uniqueTimeline = new Set(list.flatMap((x) => x.seenTimeline || []));
    const uniqueChars = new Set(list.flatMap((x) => x.metCharacters || []));

    const totalTargets = DATA.WORLDS.length + selectableCareers.length + totalChapters + DATA.TIMELINE.length + DATA.CHARACTERS.length;
    const totalCollected = uniqueWorlds.size + uniqueCareers.size + uniqueChapters.size + uniqueTimeline.size + uniqueChars.size;
    const totalPct = totalTargets > 0 ? Math.round((totalCollected / totalTargets) * 100) : 0;

    $("#hall-summary").innerHTML = `
      <div class="meta-box"><span class="meta-label">기록된 생애 수</span><span class="meta-val">${list.length}명</span></div>
      <div class="meta-box"><span class="meta-label">탐방한 행성</span><span class="meta-val">${uniqueWorlds.size} / ${DATA.WORLDS.length}</span></div>
      <div class="meta-box"><span class="meta-label">달성한 병종·계급</span><span class="meta-val">${uniqueCareers.size} / ${selectableCareers.length}</span></div>
      <div class="meta-box"><span class="meta-label">서약한 챕터</span><span class="meta-val">${uniqueChapters.size} / ${totalChapters}</span></div>
      <div class="meta-box"><span class="meta-label">목격한 역사 / 인물</span><span class="meta-val">역사 ${uniqueTimeline.size}/${DATA.TIMELINE.length} · 인물 ${uniqueChars.size}/${DATA.CHARACTERS.length}</span></div>
    `;

    const missingCareers = selectableCareers.filter((c) => !uniqueCareers.has(c.id));
    const missingChapters = (DATA.CHAPTERS || []).filter((ch) => !uniqueChapters.has(ch.id));
    const missingChars = DATA.CHARACTERS.filter((c) => !uniqueChars.has(c.id));
    const missingTimeline = DATA.TIMELINE.filter((t) => !uniqueTimeline.has(t.id));
    const missingWorlds = DATA.WORLDS.filter((w) => !uniqueWorlds.has(w.id));

    const renderHintGroup = (title, itemsHtml, doneText) => `
      <div class="hall-codex-group">
        <h3>${escapeHtml(title)}</h3>
        ${itemsHtml.length ? `<ul class="hall-hint-list">${itemsHtml.join("")}</ul>` : `<p style="font-size:12px;color:var(--cogitator);">${escapeHtml(doneText)}</p>`}
      </div>
    `;

    const codexWrap = $("#hall-codex-wrap");
    if (codexWrap) {
      codexWrap.innerHTML = `
        <details class="hall-codex-box">
          <summary>제국 도감 달성 현황 및 미수집 해금 힌트 — 전체 수집률 ${totalPct}% (${totalCollected} / ${totalTargets})</summary>
          <div class="hall-codex-body">
            ${renderHintGroup(
              `미달성 병종·계급 (${missingCareers.length}종 남음)`,
              missingCareers.map((c) => `<li><strong>${escapeHtml(c.name)}</strong> (${escapeHtml(c.treeName || c.faction)} · Tier ${c.tier}${c.entryMode === "event" ? " · 발탁 이벤트" : ""}) — ${escapeHtml(Engine.describeReq(c.req) || "조건 없음")}</li>`),
              `모든 선택 가능 병종·계급(${selectableCareers.length}종)을 달성했다.`
            )}
            ${renderHintGroup(
              `미서약 챕터 (${missingChapters.length}개 남음)`,
              missingChapters.map((ch) => `<li><strong>${escapeHtml(ch.name)}</strong> — 프라이마크 ${escapeHtml(ch.primarch)} · 모성 ${escapeHtml(ch.homeworld)}</li>`),
              `${totalChapters}대 아스타르테스 챕터를 모두 서약했다.`
            )}
            ${renderHintGroup(
              `미조우 네임드 인물 (${missingChars.length}명 남음)`,
              missingChars.map((c) => `<li><strong>${escapeHtml(c.name)}</strong> — ${escapeHtml(c.faction)} (${escapeHtml(c.era)})</li>`),
              `${DATA.CHARACTERS.length}인의 전설적 인물을 모두 조우했다.`
            )}
            ${renderHintGroup(
              `미목격 역사 대사건 (${missingTimeline.length}건 남음)`,
              missingTimeline.map((t) => `<li><strong>${Engine.formatImperialYear(t.year)} ${escapeHtml(t.title)}</strong> — ${escapeHtml(t.scope)}</li>`),
              `M41~M42 ${DATA.TIMELINE.length}대 역사 사건을 모두 목격했다.`
            )}
            ${renderHintGroup(
              `미방문 행성 (${missingWorlds.length}곳 남음)`,
              missingWorlds.map((w) => `<li><strong>${escapeHtml(w.name)}</strong> — ${escapeHtml(w.worldClass)} (${escapeHtml(Engine.getWorldShortTag(w))})</li>`),
              `${DATA.WORLDS.length}개 제국 행성을 모두 탐방했다.`
            )}
          </div>
        </details>
      `;
    }

    if (!list.length) {
      $("#hall-list").innerHTML = `<p style="color:var(--text-muted);">아직 기록된 영혼이 없다. 인류제국에서 첫 생애를 살아 보라.</p>`;
      return;
    }

    $("#hall-list").innerHTML = list.map((item) => {
      const visitedNames = (Array.isArray(item.visitedWorlds) && item.visitedWorlds.length ? item.visitedWorlds : [item.homeWorldId])
        .filter(Boolean)
        .map((id) => Engine.getWorld(id).name);
      const careerPathNames = (Array.isArray(item.careerHistory) && item.careerHistory.length ? item.careerHistory : [item.careerId])
        .filter((id) => id && id !== "child")
        .map((id) => Engine.getCareer(id).name);
      const tlNames = (item.seenTimeline || [])
        .map((id) => DATA.TIMELINE.find((t) => t.id === id))
        .filter(Boolean)
        .map((t) => `${Engine.formatImperialYear(t.year)} ${t.title}`);
      const charNames = (item.metCharacters || [])
        .map((id) => Engine.getCharacter(id))
        .filter(Boolean)
        .map((c) => c.name);
      const chap = item.chapterId ? Engine.getChapter(item.chapterId) : null;
      const tagNames = (item.tags || []).map((t) => Engine.TAG_LABELS[t] || t);
      const statsHtml = item.stats
        ? `<div class="hall-mini-stats">${Object.values(Engine.STAT_META).map((m) => `<span class="hall-mini-stat"><span>${m.name}</span><strong>${item.stats[m.key] !== undefined ? item.stats[m.key] : "-"}</strong></span>`).join("")}</div>`
        : "";
      const verdictHtml = item.grade && item.grade.verdict
        ? `<p class="hall-verdict">${escapeHtml(item.grade.verdict)}</p>`
        : "";

      return `
        <article class="codex-card">
          <div>
            <h3>${escapeHtml(item.name)} (${item.age}세)</h3>
            <div class="codex-en">${Engine.formatImperialYear(item.birthYear)} ~ ${Engine.formatImperialYear(item.deathYear)} · ${escapeHtml(item.careerTitle)}</div>
            <div class="codex-body">
              <p style="color:var(--gold);margin-bottom:4px;">${escapeHtml(item.grade ? item.grade.title : "")}</p>
              <p style="font-size:12px;color:var(--text-sub);">${escapeHtml(item.deathCause)}</p>
              <details class="hall-detail">
                <summary>상세 생애 조서 펼치기</summary>
                <div class="hall-detail-body">
                  ${verdictHtml}
                  ${statsHtml}
                  ${careerPathNames.length > 1 ? `<div><strong>거쳐 간 계급 (${careerPathNames.length}):</strong> ${escapeHtml(careerPathNames.join(" -> "))}</div>` : ""}
                  ${chap ? `<div><strong>소속 챕터:</strong> ${escapeHtml(chap.name)}</div>` : ""}
                  <div><strong>방문 행성 (${visitedNames.length}):</strong> ${escapeHtml(visitedNames.join(", "))}</div>
                  <div><strong>목격한 역사 (${tlNames.length}):</strong> ${tlNames.length ? escapeHtml(tlNames.join(" / ")) : "없음"}</div>
                  <div><strong>조우한 인물 (${charNames.length}):</strong> ${charNames.length ? escapeHtml(charNames.join(", ")) : "없음"}</div>
                  ${tagNames.length ? `<div><strong>주요 이력:</strong> ${escapeHtml(tagNames.join(", "))}</div>` : ""}
                </div>
              </details>
            </div>
          </div>
          <div class="codex-foot">
            <span>출생: ${escapeHtml(Engine.getWorld(item.homeWorldId).name)}</span>
            <span>역사 ${(item.seenTimeline || []).length}건 · 인물 ${(item.metCharacters || []).length}명</span>
          </div>
        </article>
      `;
    }).join("");
  }

  // ===== 네비게이션 (다른 탭 열람 시 자동 일시정지해 기록 감상 보호!) =====
  function switchMainView(viewName) {
    if (viewName !== "game" && currentSpeed > 0) {
      setSpeed(0);
    }
    $$(".view-section").forEach((v) => v.classList.remove("active"));
    $(`#view-${viewName}`).classList.add("active");
    $$(".top-header .nav-btn").forEach((b) => {
      const isActive = b.dataset.view === viewName;
      b.classList.toggle("active", isActive);
      if (isActive) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    if (viewName === "chronicle") {
      renderFullChronicle();
      const chTitle = $("#chron-char-title");
      if (chTitle) chTitle.focus();
    }
    if (viewName === "codex") renderCodex();
    if (viewName === "hall") renderHall();
  }

  // ===== 이벤트 바인딩 =====
  function bindEvents() {
    $$(".top-header .nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => switchMainView(btn.dataset.view));
    });

    $("#btn-start-random").addEventListener("click", () => startNewGame({ mode: "random" }));
    $("#btn-start-custom").addEventListener("click", () => {
      startNewGame({
        mode: "custom",
        eraId: $("#sel-era").value,
        worldId: $("#sel-world").value,
        originId: $("#sel-origin").value,
        traitId: $("#sel-trait").value,
        gender: $("#sel-gender").value,
        customName: $("#inp-name").value
      });
    });

    $("#btn-pause").addEventListener("click", () => setSpeed(0));
    $("#btn-speed-1").addEventListener("click", () => setSpeed(1));
    $("#btn-speed-2").addEventListener("click", () => setSpeed(2));
    $("#btn-speed-4").addEventListener("click", () => setSpeed(4));
    $("#btn-step").addEventListener("click", () => stepOneYear());

    $("#btn-new-life").addEventListener("click", () => {
      setSpeed(0);
      if (state && state.alive) saveActiveState();
      $("#play-dashboard").style.display = "none";
      $("#start-screen").style.display = "block";
      renderResumeBanner();
    });

    // 삶의 초점 선택 (이벤트 위임 — 포커스 유실 방지)
    $("#focus-grid").addEventListener("click", (e) => {
      const btn = e.target.closest(".focus-card");
      if (!btn || !state || !state.alive) return;
      const focusId = btn.dataset.focus;
      if (!Engine.FOCUSES[focusId] || state.focus === focusId) return;
      state.focus = focusId;
      saveActiveState();
      renderFocuses();
      announce(`삶의 초점 변경: ${Engine.FOCUSES[focusId].name}`);
    });

    // 활성 사건 선택지 (이벤트 위임)
    $("#active-event-wrap").addEventListener("click", (e) => {
      const btn = e.target.closest(".choice-btn");
      if (!btn || btn.disabled || !state || !state.alive || !state.pendingEvent) return;
      const idx = Number(btn.dataset.choice);
      const res = Engine.resolvePendingChoice(state, idx);
      if (!state.alive) {
        setSpeed(0);
        saveToHall(state);
        clearActiveState();
        openObituaryModal();
      } else if (state.pendingEvent) {
        setSpeed(0);
        syncKnownUnlockedCareers(state);
        saveActiveState();
      } else {
        syncKnownUnlockedCareers(state);
        saveActiveState();
      }
      renderAll();
      if (state.alive && state.pendingEvent) {
        const evHead = $("#active-event-heading");
        if (evHead) evHead.focus();
        const prevTxt = res && res.outcome ? `${res.outcome.text} ` : "";
        announce(`${prevTxt}이어지는 사건: ${state.pendingEvent.title}`);
      } else if (state.alive && res && res.outcome) {
        const rTxt = res.rollResult
          ? `판정 ${res.rollResult.success ? "성공" : "실패"}(${res.rollResult.roll}/${res.rollResult.target}). `
          : "";
        announce(`${rTxt}${res.outcome.text}`);
        const recHead = $("#recent-chronicle-heading");
        if (recHead) recHead.focus();
      }
    });

    // 우측 자율 선택 패널: 진로 · 행동 · 성간 이동 (이벤트 위임)
    $("#auto-careers-wrap").addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-apply-career");
      if (!btn || btn.disabled || !state || !state.alive) return;
      const res = Engine.attemptCareerChange(state, btn.dataset.cid);
      if (!res.ok) {
        showToast(res.msg);
        if (res.dead) {
          setSpeed(0);
          saveToHall(state);
          clearActiveState();
          openObituaryModal();
        } else {
          syncKnownUnlockedCareers(state);
          saveActiveState();
        }
        renderAll();
      } else if (state.pendingEvent) {
        setSpeed(0);
        syncKnownUnlockedCareers(state);
        saveActiveState();
        renderAll();
        const evHead = $("#active-event-heading");
        if (evHead) evHead.focus();
        announce(`전직 성공. ${state.pendingEvent.title}`);
      } else {
        syncKnownUnlockedCareers(state);
        saveActiveState();
        showToast(`${Engine.getCareerDisplayTitle(state, res.career)}(으)로 전직/승급했다!`);
        renderAll();
      }
    });

    $("#auto-actions-wrap").addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-auto-action");
      if (!btn || btn.disabled || !state || !state.alive) return;
      const res = Engine.performAction(state, btn.dataset.aid);
      syncKnownUnlockedCareers(state);
      saveActiveState();
      showToast(res.ok ? (res.msg || "행동을 완료했다!") : res.msg);
      renderAll();
    });

    $("#auto-travel-wrap").addEventListener("change", (e) => {
      if (e.target && e.target.id === "sel-travel-world") {
        selectedTravelWorldId = e.target.value;
        updateTravelPreview(selectedTravelWorldId);
      }
    });

    $("#auto-travel-wrap").addEventListener("click", (e) => {
      const goBtn = e.target.closest("#btn-travel-go");
      if (!goBtn || goBtn.disabled || !state || !state.alive) return;
      const res = Engine.performAction(state, "travel", selectedTravelWorldId);
      if (res.ok) {
        showToast(`${res.target.name}(으)로 성간 이동을 마쳤다!`);
        selectedTravelWorldId = null;
        lastTravelSignature = "";
      } else {
        showToast(res.msg);
      }
      syncKnownUnlockedCareers(state);
      saveActiveState();
      renderAll();
    });

    // 잠긴 전체 진로 아코디언: 열 때만 지연 렌더링
    const lockedDetails = $("#locked-careers-details");
    if (lockedDetails) {
      lockedDetails.addEventListener("toggle", () => {
        if (lockedDetails.open) renderLockedCareersPreview();
      });
    }

    // 편의 옵션 토글 저장
    const chkSr = $("#chk-sr-announce");
    if (chkSr) {
      chkSr.addEventListener("change", () => {
        prefs.srAnnounce = chkSr.checked;
        savePrefs();
      });
    }
    const chkFast = $("#chk-fast-childhood");
    if (chkFast) {
      chkFast.addEventListener("change", () => {
        prefs.fastChildhood = chkFast.checked;
        savePrefs();
        updateProgressUI();
        announce(chkFast.checked ? "유년기 빠른 진행을 켰다. 0세에서 12세까지 연 1분기로 진행한다." : "유년기 빠른 진행을 껐다.");
      });
    }
    const chkCareerAlert = $("#chk-career-alert");
    if (chkCareerAlert) {
      chkCareerAlert.addEventListener("change", () => {
        prefs.careerAlert = chkCareerAlert.checked;
        savePrefs();
        if (state && state.alive) syncKnownUnlockedCareers(state);
        announce(chkCareerAlert.checked ? "새 진로 해금 시 자동 알림과 일시정지를 켰다." : "새 진로 해금 시 자동 알림을 껐다.");
      });
    }

    // 인생 기록서 바로가기 & 컨트롤
    $("#btn-open-full-chronicle").addEventListener("click", () => switchMainView("chronicle"));
    $("#btn-back-to-game").addEventListener("click", () => switchMainView("game"));
    $("#btn-chron-order").addEventListener("click", () => {
      chronOrder = chronOrder === "asc" ? "desc" : "asc";
      renderFullChronicle();
    });
    $("#btn-copy-chronicle").addEventListener("click", () => copyCurrentChronicle());
    $("#btn-export-chronicle").addEventListener("click", () => exportCurrentChronicleTxt());
    $$("#full-log-filters button").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("#full-log-filters button").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        fullLogFilter = btn.dataset.flfilter;
        renderFullChronicle();
      });
    });

    // 코덱스 탭 & 검색
    $$("#codex-tabs .nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("#codex-tabs .nav-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        activeCodexTab = btn.dataset.ctab;
        renderCodex();
      });
    });
    $("#codex-search").addEventListener("input", renderCodex);

    // 영혼의 전당 초기화
    $("#btn-clear-hall").addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      renderHall();
      showToast("영혼의 전당 기록을 초기화했다.");
    });

    // 부고 모달 버튼
    $("#btn-obit-chronicle").addEventListener("click", () => {
      closeObituaryModal(false);
      switchMainView("chronicle");
    });
    $("#btn-obit-copy").addEventListener("click", () => {
      copyCurrentChronicle();
    });
    $("#btn-obit-random").addEventListener("click", () => {
      closeObituaryModal(false);
      startNewGame({ mode: "random" });
    });
    $("#btn-obit-custom").addEventListener("click", () => {
      closeObituaryModal(false);
      $("#play-dashboard").style.display = "none";
      $("#start-screen").style.display = "block";
      renderResumeBanner();
    });
    $("#btn-obit-close").addEventListener("click", () => {
      closeObituaryModal(true);
    });

    // 모달 접근성: Escape 닫기 및 Tab 포커스 트랩
    document.addEventListener("keydown", (e) => {
      const backdrop = $("#obit-backdrop");
      if (!backdrop || !backdrop.classList.contains("open")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeObituaryModal(true);
        return;
      }
      if (e.key === "Tab") {
        const focusables = Array.from(
          backdrop.querySelectorAll("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])")
        );
        if (!focusables.length) {
          e.preventDefault();
          const title = $("#obit-title");
          if (title) title.focus();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || active === $("#obit-title") || !backdrop.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !backdrop.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function updateCodexTabCounts() {
    const wBtn = $("#codex-tabs [data-ctab='worlds']");
    const cBtn = $("#codex-tabs [data-ctab='careers']");
    const chapBtn = $("#codex-tabs [data-ctab='chapters']");
    const tBtn = $("#codex-tabs [data-ctab='timeline']");
    const chBtn = $("#codex-tabs [data-ctab='characters']");
    if (wBtn) wBtn.textContent = `행성 (${DATA.WORLDS.length})`;
    if (cBtn) cBtn.textContent = `병종·직군 (${DATA.CAREERS.filter((c) => c.selectable).length})`;
    if (chapBtn) chapBtn.textContent = `챕터 (${(DATA.CHAPTERS || []).length})`;
    if (tBtn) tBtn.textContent = `M41~M42 역사 연표 (${DATA.TIMELINE.length})`;
    if (chBtn) chBtn.textContent = `네임드 인물 (${DATA.CHARACTERS.length})`;
  }

  // ===== 초기화 =====
  initCustomSelectors();
  updateCodexTabCounts();
  applyPrefsToUI();
  bindEvents();
  renderResumeBanner();
  renderCodex();
})();
