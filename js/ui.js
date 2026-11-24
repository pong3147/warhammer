(function () {
  const DATA = window.IMPERIUM_DATA;
  const Engine = window.ImperiumEngine;
  const STORAGE_KEY = "imperium_vita_hall_v1";
  const SPEED_MS = { 1: 10000, 2: 5000, 4: 2500 };

  let state = null;
  let tickIntervalId = null;
  let currentSpeed = 0; // 0=pause, 1(10s), 2(5s), 4(2.5s)
  let yearElapsedMs = 0;
  let activeCodexTab = "worlds";
  let fullLogFilter = "all";
  let chronOrder = "asc"; // asc: 0세 -> 현재, desc: 최신 -> 0세
  let selectedTravelWorldId = null;

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
  function announce(msg) {
    const live = $("#sr-live");
    if (!live || !msg) return;
    _announceSeq += 1;
    // 동일 문장 반복 시에도 스크린 리더가 인식하도록 비가시 공백 교차
    live.textContent = "";
    setTimeout(() => {
      live.textContent = msg + (_announceSeq % 2 === 0 ? "\u200B" : "");
    }, 30);
  }

  function isAutoAnnounceEnabled() {
    const chk = $("#chk-sr-announce");
    return !chk || chk.checked;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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
      careerId: charState.careerId,
      careerTitle: Engine.getCareerDisplayTitle(charState),
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

    if (currentSpeed === 0) {
      labelEl.textContent = `${Engine.formatImperialDate(state.year, state.quarter)} · 일시정지 중`;
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
    const prevLogCount = state.logs.length;
    const res = Engine.advanceQuarter(state);
    if (res.status === "event") {
      setSpeed(0);
    } else if (res.status === "dead") {
      setSpeed(0);
      saveToHall(state);
      openObituaryModal();
    }
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
    } else if (res.status === "ok" && isAutoAnnounceEnabled() && state.logs.length > prevLogCount) {
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
    state = Engine.createCharacter(config);
    $("#start-screen").style.display = "none";
    $("#play-dashboard").style.display = "grid";
    closeObituaryModal();
    switchMainView("game");
    renderAll();
    setSpeed(1); // 1년 = 30초 (분기당 10초, 1년에 3건 기록/사건)
    const recHead = $("#recent-chronicle-heading");
    if (recHead) recHead.focus();
    const w = Engine.getWorld(state.worldId);
    const o = Engine.getOrigin(state.originId);
    const t = Engine.getTrait(state.traitId);
    showToast(`${state.name}, ${w.name}의 ${o.name} 가정에서 탄생. 자질 ${t.name}. 1년당 30초, 분기당 10초로 진행.`);
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

    const dangerTags = new Set(["heretic", "chaos_aligned", "mark_khorne", "mark_tzeentch", "mark_nurgle", "wanted_by_inquisition", "rogue_psyker", "imperial_nihilus", "tech_heresy"]);
    const visibleTags = state.tags.filter((t) => !t.startsWith("met_"));
    $("#tag-cloud").innerHTML = visibleTags.length
      ? visibleTags.map((t) => `<li class="tag-chip ${dangerTags.has(t) ? "danger" : ""}">${escapeHtml(Engine.TAG_LABELS[t] || t)}</li>`).join("")
      : `<li style="font-size:11.5px;color:var(--text-muted);">특이 이력 없음</li>`;
  }

  function renderFocuses() {
    $("#focus-grid").innerHTML = Object.values(Engine.FOCUSES).map((f) => {
      const isActive = state.focus === f.id;
      const active = isActive ? "active" : "";
      const forbidden = f.id === "forbidden" ? "forbidden" : "";
      return `
        <button class="focus-card ${active} ${forbidden}" data-focus="${f.id}" aria-pressed="${isActive ? "true" : "false"}">
          <div class="focus-title">${escapeHtml(f.name)}</div>
          <div class="focus-desc">${escapeHtml(f.desc)}</div>
        </button>
      `;
    }).join("");

    $$("#focus-grid .focus-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!state || !state.alive) return;
        state.focus = btn.dataset.focus;
        renderFocuses();
        announce(`삶의 초점을 ${Engine.FOCUSES[state.focus].name}으로 변경했다.`);
      });
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

    $$("#active-event-wrap .choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.choice);
        const res = Engine.resolvePendingChoice(state, idx);
        if (!state.alive) {
          setSpeed(0);
          saveToHall(state);
          openObituaryModal();
        } else if (state.pendingEvent) {
          setSpeed(0);
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
    });
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

  // ===== 우측 통합 자율 선택 패널 (상황에 맞는 항목만 노출!) =====
  function renderAutonomousPanel() {
    const ctx = Engine.getContextualOptions(state);
    const busy = !state.alive || Boolean(state.pendingEvent);

    // 1. 지금 지원 가능한 진로/승급
    const cWrap = $("#auto-careers-wrap");
    if (ctx.unlockedCareers.length > 0) {
      cWrap.innerHTML = ctx.unlockedCareers.map((c) => {
        const displayName = Engine.getCareerDisplayTitle(state, c);
        const trialNote = c.trialCheck ? ` · [시련: ${Engine.STAT_META[c.trialCheck.stat].name}]` : "";
        return `
          <div class="career-card unlocked" style="margin-bottom:8px;">
            <div class="career-top">
              <div>
                <div class="career-name">${escapeHtml(displayName)}</div>
                <div class="career-faction">${escapeHtml(c.faction)}${trialNote}</div>
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
            ${ctx.nearCareers.map((c) => `
              <div class="near-goal-item">
                <strong>다음 목표 힌트 · ${escapeHtml(c.name)}</strong>
                <span style="color:var(--text-muted);">필요: ${escapeHtml(Engine.describeReq(c.req))}</span>
              </div>
            `).join("")}
          </div>`
        : "";
      cWrap.innerHTML = `
        <div class="empty-hint-box">
          지금 당장 전직할 수 있는 진로가 없다. <strong>삶의 초점</strong>으로 스탯을 키우거나 나이가 들면 자연스럽게 새로운 길이 열린다.
          ${hintHtml}
        </div>
      `;
    }

    $$("#auto-careers-wrap .btn-apply-career").forEach((btn) => {
      btn.addEventListener("click", () => {
        const res = Engine.attemptCareerChange(state, btn.dataset.cid);
        if (!res.ok) {
          showToast(res.msg);
          if (res.dead) {
            setSpeed(0);
            saveToHall(state);
            openObituaryModal();
          }
          renderAll();
        } else if (state.pendingEvent) {
          setSpeed(0);
          renderAll();
          const evHead = $("#active-event-heading");
          if (evHead) evHead.focus();
          announce(`전직 성공. ${state.pendingEvent.title}`);
        } else {
          showToast(`${Engine.getCareerDisplayTitle(state, res.career)}(으)로 전직/승급했다!`);
          renderAll();
        }
      });
    });

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

      $$("#auto-actions-wrap .btn-auto-action").forEach((btn) => {
        btn.addEventListener("click", () => {
          const res = Engine.performAction(state, btn.dataset.aid);
          showToast(res.ok ? (res.msg || "행동을 완료했다!") : res.msg);
          renderAll();
        });
      });
    } else {
      aSec.style.display = "none";
      aWrap.innerHTML = "";
    }

    // 3. 계급 기반 성간 이동 / 파견 청원
    const tWrap = $("#auto-travel-wrap");
    const tp = ctx.travelProfile;
    if (!tp.canAttempt || ctx.travelWorlds.length === 0) {
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
      const evalRes = Engine.evaluateTravelAttempt(state, selectedTravelWorldId);
      const oddsClass = evalRes.chance < 45 ? "low" : "";

      tWrap.innerHTML = `
        <div class="travel-authority-box">
          <div class="travel-auth-label">결재 권한: ${escapeHtml(tp.authority)}</div>
          <div class="travel-row" style="margin-top:6px;">
            <select id="sel-travel-world">
              ${ctx.travelWorlds.map((w) => {
                const evW = Engine.evaluateTravelAttempt(state, w.id);
                const sel = w.id === selectedTravelWorldId ? "selected" : "";
                return `<option value="${w.id}" ${sel}>${escapeHtml(w.name)} (${escapeHtml(Engine.getWorldShortTag(w))} · ${escapeHtml(evW.distanceLabel)})</option>`;
              }).join("")}
            </select>
          </div>
          <div class="travel-odds-preview ${oddsClass}">
            <span>${escapeHtml(evalRes.distanceLabel || "")} 이동</span>
            <strong>${evalRes.autoApprove ? "즉시 승인 (100%)" : `예상 승인율 ${evalRes.chance}%`}</strong>
          </div>
          <button id="btn-travel-go" class="${evalRes.autoApprove ? "btn-gold" : "btn-ghost"}" ${busy ? "disabled" : ""} style="width:100%;">
            ${escapeHtml(tp.actionLabel || "이동 청원")}
          </button>
          <div class="travel-note">※ 높은 계급일수록 승인율이 오르며, 이단심문관·중대장·로그 트레이더는 즉시 출항할 수 있다.</div>
        </div>
      `;

      $("#sel-travel-world").addEventListener("change", (e) => {
        selectedTravelWorldId = e.target.value;
        renderAutonomousPanel();
      });

      $("#btn-travel-go").addEventListener("click", () => {
        const res = Engine.performAction(state, "travel", selectedTravelWorldId);
        if (res.ok) {
          showToast(`${res.target.name}(으)로 성간 이동을 마쳤다!`);
          selectedTravelWorldId = null;
        } else {
          showToast(res.msg);
        }
        renderAll();
      });
    }

    // 4. 접이식 전체 병종 도감 미리보기
    const lockedCareers = DATA.CAREERS.filter((c) => c.selectable && c.id !== state.careerId && !Engine.checkReq(state, c.req));
    $("#locked-career-count").textContent = `${lockedCareers.length}종`;
    $("#all-careers-preview").innerHTML = lockedCareers.map((c) => `
      <div class="career-card">
        <div class="career-top">
          <div>
            <div class="career-name">${escapeHtml(c.name)}</div>
            <div class="career-faction">${escapeHtml(c.faction)} · Tier ${c.tier}</div>
          </div>
        </div>
        <div class="career-req">조건: ${escapeHtml(Engine.describeReq(c.req) || "조건 없음")}</div>
      </div>
    `).join("");

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
  function openObituaryModal() {
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

    $("#obit-body").innerHTML = `
      <div class="meta-box" style="margin-bottom:12px;">
        <span class="meta-label">사망 사유 및 생몰 연도</span>
        <span class="meta-val">${Engine.formatImperialYear(state.birthYear)} ~ ${Engine.formatImperialYear(state.year)} (향년 ${state.age}세) · ${escapeHtml(state.deathCause)}</span>
      </div>
      <div class="meta-box" style="margin-bottom:12px;">
        <span class="meta-label">최종 병종 / 직책</span>
        <span class="meta-val">${escapeHtml(Engine.getCareerDisplayTitle(state))}</span>
      </div>
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

    const obitBackdrop = $("#obit-backdrop");
    obitBackdrop.classList.add("open");
    obitBackdrop.setAttribute("aria-hidden", "false");
    const obitTitle = $("#obit-title");
    if (obitTitle) obitTitle.focus();
    announce(`생애 종료. 향년 ${state.age}세. ${state.deathCause}`);
  }

  function closeObituaryModal() {
    const obitBackdrop = $("#obit-backdrop");
    obitBackdrop.classList.remove("open");
    obitBackdrop.setAttribute("aria-hidden", "true");
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
        `${c.name} ${c.en} ${c.faction} ${c.desc} ${c.source}`.toLowerCase().includes(q)
      );
      grid.innerHTML = items.map((c) => `
        <div class="codex-card">
          <div>
            <h3>${escapeHtml(c.name)}</h3>
            <div class="codex-en">${escapeHtml(c.en)} · ${escapeHtml(c.faction)} · Tier ${c.tier}</div>
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
    const uniqueWorlds = new Set(list.map((x) => x.homeWorldId));
    const uniqueCareers = new Set(list.map((x) => x.careerId));
    const uniqueTimeline = new Set(list.flatMap((x) => x.seenTimeline || []));
    const uniqueChars = new Set(list.flatMap((x) => x.metCharacters || []));

    $("#hall-summary").innerHTML = `
      <div class="meta-box"><span class="meta-label">기록된 생애 수</span><span class="meta-val">${list.length}명</span></div>
      <div class="meta-box"><span class="meta-label">경험한 출생 행성</span><span class="meta-val">${uniqueWorlds.size} / ${DATA.WORLDS.length}</span></div>
      <div class="meta-box"><span class="meta-label">달성한 최종 병종</span><span class="meta-val">${uniqueCareers.size} / ${DATA.CAREERS.length - 1}</span></div>
      <div class="meta-box"><span class="meta-label">목격한 역사 / 인물</span><span class="meta-val">사건 ${uniqueTimeline.size} · 인물 ${uniqueChars.size}</span></div>
    `;

    if (!list.length) {
      $("#hall-list").innerHTML = `<p style="color:var(--text-muted);">아직 기록된 영혼이 없다. 인류제국에서 첫 생애를 살아 보라.</p>`;
      return;
    }

    $("#hall-list").innerHTML = list.map((item) => `
      <div class="codex-card">
        <div>
          <h3>${escapeHtml(item.name)} (${item.age}세)</h3>
          <div class="codex-en">${Engine.formatImperialYear(item.birthYear)} ~ ${Engine.formatImperialYear(item.deathYear)} · ${escapeHtml(item.careerTitle)}</div>
          <div class="codex-body">
            <p style="color:var(--gold);margin-bottom:4px;">${escapeHtml(item.grade ? item.grade.title : "")}</p>
            <p style="font-size:12px;color:var(--text-sub);">${escapeHtml(item.deathCause)}</p>
          </div>
        </div>
        <div class="codex-foot">
          <span>출생: ${escapeHtml(Engine.getWorld(item.homeWorldId).name)}</span>
          <span>역사 ${(item.seenTimeline || []).length}건 · 인물 ${(item.metCharacters || []).length}명</span>
        </div>
      </div>
    `).join("");
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
      $("#play-dashboard").style.display = "none";
      $("#start-screen").style.display = "block";
    });

    // 인생 기록서 바로가기 & 컨트롤
    $("#btn-open-full-chronicle").addEventListener("click", () => switchMainView("chronicle"));
    $("#btn-back-to-game").addEventListener("click", () => switchMainView("game"));
    $("#btn-chron-order").addEventListener("click", () => {
      chronOrder = chronOrder === "asc" ? "desc" : "asc";
      renderFullChronicle();
    });
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
      closeObituaryModal();
      switchMainView("chronicle");
    });
    $("#btn-obit-random").addEventListener("click", () => {
      closeObituaryModal();
      startNewGame({ mode: "random" });
    });
    $("#btn-obit-custom").addEventListener("click", () => {
      closeObituaryModal();
      $("#play-dashboard").style.display = "none";
      $("#start-screen").style.display = "block";
    });
    $("#btn-obit-close").addEventListener("click", () => {
      closeObituaryModal();
    });

    // Escape 키로 모달 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $("#obit-backdrop").classList.contains("open")) {
        closeObituaryModal();
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
  bindEvents();
  renderCodex();
})();
