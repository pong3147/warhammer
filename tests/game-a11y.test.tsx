import React from "react";
import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import GameApp from "../src/components/game/GameApp";
import HallOfSoulsApp from "../src/components/hall/HallOfSoulsApp";
import GlossaryExplorer from "../src/components/glossary/GlossaryExplorer";
import CodexExplorer from "../src/components/codex/CodexExplorer";
import { SPEED_MS } from "../src/components/game/types";
import { CORE_DATA } from "../src/data/core/index.js";
import { EVENTS, CHRONICLES } from "../src/data/narrative.js";
import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from "../src/data/glossary.js";
import { createImperiumEngine } from "../src/engine/createEngine.js";
import { createDynamicCentenarianEvent } from "../src/engine/centenarianOps.js";
import { ACTIVE_SAVE_KEY, applyImportedBackup, loadHall, saveActiveState, STORAGE_KEY } from "../src/lib/storage";

const FULL_DATA = { ...CORE_DATA, EVENTS, CHRONICLES };
const realEngine = createImperiumEngine(FULL_DATA);

function startCustomCharacter(container: HTMLElement) {
  fireEvent.change(container.querySelector("#sel-era")!, { target: { value: "armageddon" } });
  fireEvent.change(container.querySelector("#sel-world")!, { target: { value: "cadia" } });
  fireEvent.change(container.querySelector("#sel-origin")!, { target: { value: "imperial_citizen" } });
  fireEvent.change(container.querySelector("#sel-trait")!, { target: { value: "none" } });
  fireEvent.change(container.querySelector("#sel-gender")!, { target: { value: "male" } });
  fireEvent.change(container.querySelector("#inp-name")!, { target: { value: "포커스검증병" } });
  fireEvent.click(container.querySelector("#btn-start-custom")!);
}

describe("Imperialis Vita — React Behavioral Screen-Reader A11y & Pacing Suite", () => {
  it("supports 1x=60s/yr base pacing up to 16x, applies customName, hides English stat abbrs, and enforces single #sr-live", () => {
    expect(SPEED_MS[1]).toBe(20000);
    expect(SPEED_MS[2]).toBe(10000);
    expect(SPEED_MS[4]).toBe(5000);
    expect(SPEED_MS[8]).toBe(2500);
    expect(SPEED_MS[16]).toBe(1250);

    const { container } = render(<GameApp engineOverride={realEngine} dataOverride={FULL_DATA} />);
    expect(container.querySelectorAll("#sr-live")).toHaveLength(1);
    expect(container.querySelectorAll('[role="status"]')).toHaveLength(0);

    startCustomCharacter(container);

    // P0-4 regression: customName must actually be applied
    expect(container.querySelector("#char-name")).toHaveTextContent("포커스검증병");
    // P1-4 regression: full Korean origin/trait labels (never mangled single word)
    expect(container.querySelector("#meta-origin")).toHaveTextContent("일반 제국 시민 / 순수 인류 표준형");

    const btn1 = container.querySelector("#btn-speed-1") as HTMLButtonElement;
    const btn8 = container.querySelector("#btn-speed-8") as HTMLButtonElement;
    const btn16 = container.querySelector("#btn-speed-16") as HTMLButtonElement;
    expect(btn1).toHaveTextContent("1배속 (1년 60초)");
    expect(btn8).toHaveTextContent("8배속 (1년 7.5초)");
    expect(btn16).toHaveTextContent("16배속 (1년 3.75초)");
    expect(btn1).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(btn16);
    expect(btn16).toHaveAttribute("aria-pressed", "true");
    expect(btn1).toHaveAttribute("aria-pressed", "false");

    // Visual progress bar MUST remain hidden from screen readers
    expect(container.querySelector(".year-progress-wrap")).toHaveAttribute("aria-hidden", "true");

    // Focus change announcement must not have broken Korean particles
    const faithFocusBtn = container.querySelector('.focus-card[data-focus="faith"]') as HTMLButtonElement;
    expect(faithFocusBtn).toBeTruthy();
    fireEvent.click(faithFocusBtn);
    expect(container.querySelector("#sr-live")?.textContent || "").toContain("연간 삶의 초점을 변경했다");
    expect(container.querySelector("#sr-live")?.textContent || "").not.toContain("기도'으로");
  });

  it("preserves career/action button DOM identity, handles reorders silently, shifts focus on vanish, and falls back to #heading-auto", () => {
    const careerA = realEngine.getCareer("pdf_trooper");
    const careerB = realEngine.getCareer("astra_militarum");
    const careerC = realEngine.getCareer("administratum");

    const actA = { id: "career_action", name: "직군 행동 A", desc: "훈련 A", btnLabel: "행동 A" };
    const actB = { id: "penance", name: "정화 고행 B", desc: "고행 B", btnLabel: "행동 B" };
    const actC = { id: "augmetics", name: "의체 개조 C", desc: "시술 C", btnLabel: "행동 C" };

    let careersOverride: any[] = [careerA, careerB];
    let actionsOverride: any[] = [actA, actB];

    const engineProxy = {
      ...realEngine,
      getContextualOptions(st: any) {
        const base = realEngine.getContextualOptions(st);
        return {
          ...base,
          unlockedCareers: careersOverride,
          actions: actionsOverride
        };
      },
      advanceQuarter(st: any, opts?: any) {
        const r = realEngine.advanceQuarter(st, opts);
        if (st.pendingEvent) {
          st.pendingEvent = null;
          return { status: "ok", isNewYear: r.isNewYear };
        }
        return r;
      }
    };

    const { container } = render(<GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    const stepBtn = container.querySelector("#btn-step") as HTMLButtonElement;
    const cWrap = container.querySelector("#auto-careers-wrap") as HTMLElement;
    const aWrap = container.querySelector("#auto-actions-wrap") as HTMLElement;
    const recentList = container.querySelector("#recent-log-list") as HTMLElement;
    const srLive = container.querySelector("#sr-live") as HTMLElement;

    // Test 1: Unchanged career list across quarter tick keeps exact DOM button & focus
    const initialBtnB = cWrap.querySelector(`.btn-apply-career[data-cid="${careerB.id}"]`) as HTMLButtonElement;
    expect(initialBtnB).toBeTruthy();
    initialBtnB.focus();
    const existingLogLi = recentList.children[0];
    fireEvent.click(stepBtn);
    expect(document.activeElement).toBe(initialBtnB);

    // Test 2: Incremental prepend preserves existing <li> DOM object identity
    if (existingLogLi) {
      expect(Array.from(recentList.children)).toContain(existingLogLi);
    }

    // Test 3: Reorder [C, B, A] keeps focus on non-first B without false focus-shift announcement
    careersOverride = [careerC, careerB, careerA];
    fireEvent.click(stepBtn);
    expect((document.activeElement as HTMLElement)?.dataset?.cid).toBe(careerB.id);
    expect(srLive.textContent || "").not.toContain("초점을 옮겼다");

    // Test 4: Auto-tick removes focused career B while C remains -> shifts to C + announces shift
    careersOverride = [careerC];
    fireEvent.click(stepBtn);
    expect((document.activeElement as HTMLElement)?.dataset?.cid).toBe(careerC.id);
    expect(srLive.textContent || "").toContain("초점을 옮겼다");

    // Test 5: Removing ALL careers falls back to #heading-auto (never document.body)
    careersOverride = [];
    fireEvent.click(stepBtn);
    expect(document.activeElement).toBe(container.querySelector("#heading-auto"));

    // Test 6: Autonomous actions — unchanged tick keeps DOM ref, reorder [C, B, A] preserves middle B silently
    const initialActB = aWrap.querySelector(`.btn-auto-action[data-aid="${actB.id}"]`) as HTMLButtonElement;
    expect(initialActB).toBeTruthy();
    initialActB.focus();
    fireEvent.click(stepBtn);
    expect(document.activeElement).toBe(initialActB);

    actionsOverride = [actC, actB, actA];
    fireEvent.click(stepBtn);
    expect((document.activeElement as HTMLElement)?.dataset?.aid).toBe(actB.id);
    expect(srLive.textContent || "").not.toContain("초점을 옮겼다");

    // Test 7: Removing focused action shifts to remaining + announces, exhausting all falls back to #heading-auto
    actionsOverride = [actA];
    fireEvent.click(stepBtn);
    expect((document.activeElement as HTMLElement)?.dataset?.aid).toBe(actA.id);
    expect(srLive.textContent || "").toContain("초점을 옮겼다");

    actionsOverride = [];
    fireEvent.click(stepBtn);
    expect(document.activeElement).toBe(container.querySelector("#heading-auto"));

    // Test 8: #btn-new-life moves focus to #start-heading
    vi.useFakeTimers();
    fireEvent.click(container.querySelector("#btn-new-life")!);
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
    expect(document.activeElement).toBe(container.querySelector("#start-heading"));
  });

  it("renders real travel authority/distanceLabel/승인율 and accurate d100 roll statName without empty parens", () => {
    const checkEvent = {
      id: "ev_test_roll_banner",
      title: "판정 배너 테스트",
      category: "테스트 사건",
      text: "지성 판정 테스트.",
      choices: [
        {
          label: "[지성 판정] 테스트 수행",
          check: { stat: "Int", diff: 10 },
          success: { text: "성공했다." },
          fail: { text: "실패했다." }
        }
      ],
      source: "Test Suite"
    };

    let fired = false;
    const engineProxy = {
      ...realEngine,
      createCharacter(cfg: any) {
        const st = realEngine.createCharacter(cfg);
        st.age = 22;
        st.worldId = "terra";
        st.segmentum = "solar";
        st.careerId = "imperial_navy";
        return st;
      },
      advanceQuarter(st: any, opts?: any) {
        if (!fired) {
          fired = true;
          st.pendingEvent = checkEvent;
          return { status: "event", isNewYear: false };
        }
        return realEngine.advanceQuarter(st, opts);
      }
    };

    const { container } = render(<GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    // P0-2 regression: travel panel uses real engine authority, actionLabel, distanceLabel, 승인율
    const travelBox = container.querySelector("#auto-travel-wrap")!;
    expect(travelBox.textContent).not.toContain("승인률");
    const travelSelect = container.querySelector("#sel-travel-world") as HTMLSelectElement;
    expect(travelSelect).toBeTruthy();
    fireEvent.change(travelSelect, { target: { value: "mars" } });
    expect(container.querySelector("#travel-preview-text")?.textContent || "").toContain("같은 성역");
    expect(container.querySelector("#travel-preview-text")?.textContent || "").toContain("승인율");

    // P0-3 regression: roll banner displays real stat name (지성), never empty ()
    fireEvent.click(container.querySelector("#btn-step")!);
    fireEvent.click(container.querySelector(".choice-btn")!);
    const rollBanner = container.querySelector("#roll-banner")!;
    expect(rollBanner.textContent).toContain("직전 판정 (지성):");
    expect(rollBanner.textContent).not.toContain("()");
  });

  it("focuses #active-event-heading, renders named spotlight <details open>, traps Shift+Tab in ObituaryModal, and closes cleanly on Escape", () => {
    const namedEvent = {
      id: "ev_test_named_focus",
      title: "테스트 네임드 조우",
      category: "테스트 사건",
      characters: ["guilliman"],
      text: "로부테 길리먼과의 짧은 회담.",
      choices: [
        {
          label: "황제를 위하여 명을 받든다",
          effect: { text: "사명을 받아들였다.", instantDeath: "영광스러운 테스트 순직" }
        }
      ],
      source: "Test Suite"
    };

    let fired = false;
    const engineProxy = {
      ...realEngine,
      advanceQuarter(st: any, opts?: any) {
        if (!fired) {
          fired = true;
          st.pendingEvent = namedEvent;
          return { status: "event", isNewYear: false };
        }
        return realEngine.advanceQuarter(st, opts);
      }
    };

    const { container } = render(<GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    fireEvent.click(container.querySelector("#btn-step")!);
    const evHeading = container.querySelector("#active-event-heading");
    expect(evHeading).toBeTruthy();
    expect(document.activeElement).toBe(evHeading);

    const spotlight = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(spotlight).toBeTruthy();
    expect(spotlight.open).toBe(true);
    expect(spotlight).toHaveTextContent("로부테 길리먼");

    // Choose fatal option -> ObituaryModal opens, focuses #obit-title
    fireEvent.click(container.querySelector(".choice-btn")!);
    const obitTitle = container.querySelector("#obit-title");
    expect(obitTitle).toBeTruthy();
    expect(document.activeElement).toBe(obitTitle);
    expect(container.querySelector("#game-surface")).toHaveAttribute("inert");

    // P0-1 regression: Shift+Tab right from #obit-title must wrap to last modal button (#btn-obit-close)
    fireEvent.keyDown(document, { key: "Escape", shiftKey: false });
    expect(container.querySelector("#obit-backdrop")).toBeNull();
    expect(container.querySelector("#game-surface")).not.toHaveAttribute("inert");
  });

  it("traps Shift+Tab from #obit-title inside ObituaryModal without escaping", () => {
    const fatalEvent = {
      id: "ev_test_trap",
      title: "모달 트랩 테스트",
      category: "테스트",
      text: "트랩 테스트.",
      choices: [{ label: "종료", effect: { text: "종료.", instantDeath: "테스트 종료" } }],
      source: "Test"
    };
    let fired = false;
    const engineProxy = {
      ...realEngine,
      advanceQuarter(st: any, opts?: any) {
        if (!fired) {
          fired = true;
          st.pendingEvent = fatalEvent;
          return { status: "event", isNewYear: false };
        }
        return realEngine.advanceQuarter(st, opts);
      }
    };
    const { container } = render(<GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);
    fireEvent.click(container.querySelector("#btn-step")!);
    fireEvent.click(container.querySelector(".choice-btn")!);

    expect(document.activeElement).toBe(container.querySelector("#obit-title"));
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(container.querySelector("#btn-obit-close"));
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });
    expect(document.activeElement).toBe(container.querySelector("#btn-obit-chronicle"));
  });

  it("enforces 2-step confirmation guard on Hall of Souls clear button", () => {
    localStorage.setItem(
      "imperium_vita_hall_v1",
      JSON.stringify([
        {
          id: "soul_test_1",
          name: "영웅",
          age: 80,
          birthYear: 920,
          deathYear: 1000,
          homeWorldId: "cadia",
          careerId: "astra_militarum",
          careerTitle: "아스트라 밀리타룸 보병",
          deathCause: "전사"
        }
      ])
    );

    const { container } = render(<HallOfSoulsApp />);
    const clearBtn = container.querySelector("#btn-clear-hall") as HTMLButtonElement;

    fireEvent.click(clearBtn);
    expect(localStorage.getItem("imperium_vita_hall_v1")).not.toBeNull();
    expect(clearBtn).toHaveTextContent("초기화 재확인");

    fireEvent.click(clearBtn);
    expect(localStorage.getItem("imperium_vita_hall_v1")).toBeNull();
  });

  it("filters Warhammer 40k Glossary with debounced #sr-live announcements and focuses target heading on related jump", () => {
    vi.useFakeTimers();
    const { container } = render(
      <GlossaryExplorer categories={GLOSSARY_CATEGORIES} terms={GLOSSARY_TERMS} />
    );
    expect(container.querySelectorAll(".glossary-card")).toHaveLength(GLOSSARY_TERMS.length);

    const search = screen.getByLabelText("워해머 40k 개념 검색");
    fireEvent.change(search, { target: { value: "아스트로노미칸" } });

    const cards = container.querySelectorAll(".glossary-card");
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBeLessThan(GLOSSARY_TERMS.length);

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(container.querySelector("#sr-live")?.textContent || "").toContain("검색 결과");

    // Reset filter restores all 48 terms and announces immediately
    fireEvent.click(screen.getByText("필터 초기화"));
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(container.querySelectorAll(".glossary-card")).toHaveLength(GLOSSARY_TERMS.length);
    expect(container.querySelector("#sr-live")?.textContent || "").toContain("전체 분야");

    // Related term jump focuses target card <h3> even when unfiltered
    const relLink = container.querySelector('a.glossary-chip[href="#astronomican"]') as HTMLAnchorElement;
    expect(relLink).toBeTruthy();
    fireEvent.click(relLink);
    expect(document.activeElement).toBe(container.querySelector("#astronomican h3"));
    vi.useRealTimers();
  });

  it("provides #sr-live search feedback and empty-state copy in CodexExplorer", () => {
    vi.useFakeTimers();
    const { container } = render(<CodexExplorer section="worlds" />);
    expect(container.querySelectorAll("#sr-live")).toHaveLength(1);
    expect(container.querySelectorAll(".codex-card")).toHaveLength(CORE_DATA.WORLDS.length);

    const search = screen.getByLabelText("코덱스 항목 검색");
    fireEvent.change(search, { target: { value: "존재하지않는행성xyz" } });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(container.textContent).toContain("검색 조건에 맞는 행성이 없다.");
    expect(container.querySelector("#sr-live")?.textContent || "").toContain("0건");
    vi.useRealTimers();
  });

  it("auto-focuses target <h3>/<summary> on hash mount and hashchange across all 5 Codex sections", () => {
    const cases: Array<{ section: "worlds" | "careers" | "chapters" | "timeline" | "characters"; hash: string; selector: string }> = [
      { section: "worlds", hash: "#terra", selector: "#terra h3" },
      { section: "careers", hash: "#tree-custodes", selector: "#tree-custodes summary" },
      { section: "careers", hash: "#custodes_warden", selector: "#custodes_warden h3" },
      { section: "chapters", hash: "#ultramarines", selector: "#ultramarines h3" },
      { section: "timeline", hash: "#tl_fall_of_cadia", selector: "#tl_fall_of_cadia h3" },
      { section: "characters", hash: "#guilliman", selector: "#guilliman h3" }
    ];

    for (const tc of cases) {
      window.location.hash = tc.hash;
      const { container, unmount } = render(<CodexExplorer section={tc.section} />);
      const target = container.querySelector(tc.selector);
      expect(target).toBeTruthy();
      expect(document.activeElement).toBe(target);
      unmount();
    }

    // Verify clearing active search filter + hashchange re-focuses target heading
    window.location.hash = "";
    const { container } = render(<CodexExplorer section="worlds" />);
    const search = screen.getByLabelText("코덱스 항목 검색");
    fireEvent.change(search, { target: { value: "화성" } });
    expect(container.querySelector("#cadia")).toBeNull();

    act(() => {
      window.location.hash = "#cadia";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(container.querySelector("#cadia h3")).toBeTruthy();
    expect(document.activeElement).toBe(container.querySelector("#cadia h3"));
    window.location.hash = "";
  });

  it("renders 1-2 fixed contextual glossary links in DossierPanel without adding links inside event or career cards", () => {
    const sampleEvent = {
      id: "ev_test_no_inline_glossary",
      title: "테스트 분기 사건",
      category: "테스트 사건",
      text: "사건 카드 내부에는 개념 사전 링크가 삽입되지 않아야 한다.",
      choices: [{ label: "진행", effect: { text: "진행했다." } }],
      source: "Test"
    };
    let fired = false;
    const engineProxy = {
      ...realEngine,
      createCharacter(cfg: any) {
        const st = realEngine.createCharacter(cfg);
        st.age = 24;
        st.worldId = "terra";
        st.segmentum = "solar";
        st.careerId = "imperial_navy";
        return st;
      },
      advanceQuarter(st: any, opts?: any) {
        if (!fired) {
          fired = true;
          st.pendingEvent = sampleEvent;
          return { status: "event", isNewYear: false };
        }
        return realEngine.advanceQuarter(st, opts);
      }
    };

    const { container } = render(<GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    const dossierNav = container.querySelector("#dossier-glossary");
    expect(dossierNav).toBeTruthy();
    const links = Array.from(dossierNav!.querySelectorAll("a.dossier-glossary-link")) as HTMLAnchorElement[];
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links.length).toBeLessThanOrEqual(2);
    expect(links[0].getAttribute("href")).toContain("/glossary/#imperial_navy");
    expect(links[0].getAttribute("target")).toBe("_blank");
    expect(links[1].getAttribute("href")).toContain("/glossary/#emperor_golden_throne");

    // Verify ZERO glossary links inside event card or autonomous career cards (preserves Tab ergonomics)
    fireEvent.click(container.querySelector("#btn-step")!);
    expect(container.querySelector("#active-event-wrap a[href*='/glossary/']")).toBeNull();
    expect(container.querySelector("#auto-careers-wrap a[href*='/glossary/']")).toBeNull();
  });

  it("displays computeCheckPreview capped at 90% with situational modifiers and synchronizes with roll banner", () => {
    const modEvent = {
      id: "ev_test_s19s2_preview",
      title: "고위 난제 판정 검증",
      category: "테스트 사건",
      text: "부상과 암흑 제국 페널티가 투명하게 표시되어야 한다.",
      choices: [
        {
          label: "[지성 판정] 위기를 분석한다",
          check: { stat: "Int", diff: 0 },
          success: { text: "성공." },
          fail: { text: "실패." }
        },
        {
          label: "[의지 판정] 극한의 의지로 버틴다",
          check: { stat: "WP", diff: 35 },
          success: { text: "성공." },
          fail: { text: "실패." }
        }
      ],
      source: "Test Suite"
    };

    let fired = false;
    const engineProxy = {
      ...realEngine,
      createCharacter(cfg: any) {
        const st = realEngine.createCharacter(cfg);
        st.age = 35;
        st.worldId = "baal";
        st.segmentum = "ultima";
        st.careerId = "inquisitor";
        st.wounds = 40;
        st.tags.push("inquisitor", "imperial_nihilus");
        st.stats.Int = 80;
        st.stats.WP = 100;
        return st;
      },
      advanceQuarter(st: any, opts?: any) {
        if (!fired) {
          fired = true;
          st.pendingEvent = modEvent;
          return { status: "event", isNewYear: false };
        }
        return realEngine.advanceQuarter(st, opts);
      }
    };

    const { container } = render(<GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);
    fireEvent.click(container.querySelector("#btn-step")!);

    const btns = Array.from(container.querySelectorAll(".choice-btn")) as HTMLButtonElement[];
    expect(btns).toHaveLength(2);
    // Int 80 - 8(부상) - 5(임페리움 니힐루스) - 9(Tier 5 고위 난제) = 58%
    expect(btns[0].textContent).toContain("위기를 분석한다 지성 성공률 58%");
    expect(btns[0].textContent).toContain("부상 -8");
    expect(btns[0].textContent).toContain("임페리움 니힐루스 -5");
    expect(btns[0].textContent).toContain("고위 난제 -9");
    // WP 100 + 35 - 22 = 113 -> compressed 91.5 -> capped at 90% (상한)
    expect(btns[1].textContent).toContain("의지 성공률 90% (상한)");

    fireEvent.click(btns[0]);
    const banner = container.querySelector("#roll-banner")!;
    expect(banner.textContent).toContain("목표 58");
  });

  it("locks manual travel for forced-duty soldiers, shows admission exam preview, and moves focus safely when a career button disables on rejection", () => {
    const origRand = Math.random;
    const engineProxy = {
      ...realEngine,
      createCharacter(cfg: any) {
        const st = realEngine.createCharacter(cfg);
        st.age = 16;
        st.year = 960;
        st.worldId = "necromunda";
        st.segmentum = "solar";
        st.originId = "planetary_noble";
        st.careerId = "child";
        st.tags = ["noble", "wealthy"];
        st.stats = { WS: 40, BS: 40, T: 40, Ag: 40, Int: 44, WP: 42, Fel: 42, Inf: 45 };
        return st;
      }
    };

    const { container, unmount } = render(
      <GameApp engineOverride={engineProxy} dataOverride={FULL_DATA} />
    );
    startCustomCharacter(container);

    // 14-18 noble apprenticeship notice & admission exam odds shown on administratum card
    const autoWrap = container.querySelector("#auto-careers-wrap")!;
    expect(autoWrap.textContent).toContain("귀족 가문 수습 기간");
    const adminBtn = autoWrap.querySelector(
      '.btn-apply-career[data-cid="administratum"]'
    ) as HTMLButtonElement;
    expect(adminBtn).toBeTruthy();
    expect(adminBtn.textContent).toContain("입단 심사 지원");

    // Focus adminBtn, force non-lethal rejection -> button becomes disabled with 2-yr retry cooldown, focus must NOT drop to body & #sr-live preserves rejection toast
    adminBtn.focus();
    Math.random = () => 0.99;
    try {
      fireEvent.click(adminBtn);
    } finally {
      Math.random = origRand;
    }
    const updatedAdminBtn = container.querySelector(
      '.btn-apply-career[data-cid="administratum"]'
    ) as HTMLButtonElement;
    expect(updatedAdminBtn.disabled).toBe(true);
    expect(updatedAdminBtn.textContent).toContain("재지원 대기 (2년 후)");
    expect(document.activeElement).not.toBe(document.body);
    expect(document.activeElement).not.toBe(updatedAdminBtn);
    expect(container.querySelector("#sr-live")?.textContent || "").toContain("입단 심사 탈락");
    unmount();
    localStorage.clear();

    // Forced-duty soldier: manual travel selector must be locked (no #sel-travel-world)
    const soldierProxy = {
      ...realEngine,
      createCharacter(cfg: any) {
        const st = realEngine.createCharacter(cfg);
        st.age = 20;
        st.worldId = "cadia";
        st.segmentum = "obscurus";
        st.careerId = "astra_militarum";
        return st;
      }
    };
    const { container: c2 } = render(
      <GameApp engineOverride={soldierProxy} dataOverride={FULL_DATA} />
    );
    startCustomCharacter(c2);
    expect(c2.querySelector("#sel-travel-world")).toBeNull();
    expect(c2.querySelector("#auto-travel-wrap")?.textContent || "").toContain("수동 이동 잠금");
  });

  it("Stage 19-M1: sanitizes malformed Hall backup & localStorage entries without crashing HallOfSoulsApp", () => {
    // 1. All-corrupt hall-only backup must be rejected without touching storage
    const allBadRes = applyImportedBackup(
      JSON.stringify({
        hall: [null, 42, { id: "missing_name" }, { id: "obj_name", name: { bad: true } }]
      }),
      realEngine
    );
    expect(allBadRes.ok).toBe(false);
    expect(allBadRes.skippedHallCount).toBe(4);
    expect(loadHall()).toHaveLength(0);

    // 2. Mixed valid + malformed backup keeps sanitized valid entries and skips broken ones
    const mixedPayload = JSON.stringify({
      hall: [
        { id: "bad_obj_name", name: { nested: 1 }, seenTimeline: "broken" },
        {
          id: "soul_valid_1",
          name: "티투스 발레리우스",
          age: "47",
          birthYear: 952,
          deathYear: 999,
          homeWorldId: "cadia",
          visitedWorlds: ["cadia", 999, null],
          careerId: "astra_militarum",
          careerHistory: "not-an-array",
          careerTitle: "아스트라 밀리타룸",
          seenTimeline: "corrupted-string",
          metCharacters: { broken: true },
          tags: 12345,
          stats: { WS: 52, BS: "nan", Inf: { bad: 1 } },
          grade: "corrupted-grade"
        }
      ]
    });
    const mixedRes = applyImportedBackup(mixedPayload, realEngine);
    expect(mixedRes.ok).toBe(true);
    expect(mixedRes.restoredHallCount).toBe(1);
    expect(mixedRes.skippedHallCount).toBe(1);

    // 3. Direct corrupted localStorage data is also sanitized on loadHall() and renders safely
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        ...loadHall(),
        { id: "bad_direct", name: ["array-name"], tags: "oops" },
        { id: "soul_legacy_2", name: "카스텔란 로렌", age: 88, homeWorldId: "terra", careerId: "inquisitor" }
      ])
    );

    const { container } = render(<HallOfSoulsApp />);
    const cards = container.querySelectorAll("#hall-list .codex-card");
    expect(cards).toHaveLength(2);
    expect(container.textContent).toContain("티투스 발레리우스 (47세)");
    expect(container.textContent).toContain("카스텔란 로렌 (88세)");
    expect(container.textContent).toContain("이단심문관");
    expect(container.textContent).not.toContain("NaN");
  });

  it("Stage 19-M1 P1 regressions: preserves 41-char endgame ranks, blocks prototype tag leakage, rejects malformed activeState/prefs, and clamps Codex counts to valid IDs", () => {
    // P1-3: non-object prefs/activeState or broken activeState must return ok:false (never false-positive ok:true)
    expect(applyImportedBackup(JSON.stringify({ activeState: 123 }), realEngine).ok).toBe(false);
    expect(applyImportedBackup(JSON.stringify({ prefs: "garbage" }), realEngine).ok).toBe(false);
    expect(applyImportedBackup(JSON.stringify({ activeState: { bad: true } }), realEngine).ok).toBe(false);

    // P1-3: valid hall + malformed activeState (string stats) must NOT throw uncaught TypeError
    const mixedActiveRes = applyImportedBackup(
      JSON.stringify({
        hall: [
          {
            id: "soul_high_lord",
            name: "아우렐리우스 하이로드",
            age: 312,
            birthYear: "687",
            deathYear: "999",
            homeWorldId: "terra",
            visitedWorlds: ["terra", "fake_world_1", "fake_world_2"],
            careerId: "high_lord_administratum",
            careerHistory: ["high_lord_administratum", "fake_career_1"],
            careerTitle: "테라의 하이 로드",
            chapterId: "fake_chapter_x",
            seenTimeline: ["tl_fall_of_cadia", "fake_tl_1", "fake_tl_2"],
            metCharacters: ["guilliman", "fake_char_1"],
            tags: ["toString", "__proto__", "constructor", "high_lord_terra"],
            grade: {
              rank: "SENATORUM IMPERIALIS — HIGH LORD OF TERRA",
              title: "테라의 하이 로드",
              score: "950"
            }
          }
        ],
        activeState: { id: "broken_active", name: "손상자", alive: true, stats: "broken", logs: [] }
      }),
      realEngine
    );
    expect(mixedActiveRes.ok).toBe(true);
    expect(mixedActiveRes.restoredActive).toBeNull();
    expect(mixedActiveRes.restoredHallCount).toBe(1);

    // P1-1: 41-char endgame rank must NOT be truncated
    const stored = loadHall();
    expect(stored).toHaveLength(1);
    expect(stored[0].grade?.rank).toBe("SENATORUM IMPERIALIS — HIGH LORD OF TERRA");
    expect(stored[0].birthYear).toBe(687);
    expect(stored[0].grade?.score).toBe(950);

    // P1-2 & P1-4: render HallOfSoulsApp -> no Object.prototype leakage, valid-only Codex totals & matching footer counts
    const { container } = render(<HallOfSoulsApp />);
    const fullText = container.textContent || "";
    expect(fullText).not.toContain("native code");
    expect(fullText).not.toContain("[object Object]");
    expect(fullText).toContain("테라의 하이 로드");
    // Only 1 real world (terra), 1 real career, 0 real chapters, 1 real timeline, 1 real character
    expect(fullText).toContain(`1 / ${CORE_DATA.WORLDS.length}`);
    expect(fullText).toContain(`0 / ${CORE_DATA.CHAPTERS.length}`);
    expect(fullText).toContain("역사 1건 · 인물 1명");
  });

  it("Stage 19-M2: guards saved life against 1-click discard/overwrite with 2-step confirm, renders dynamic counts, and displays 대성공/대실패 labels", () => {
    const { container, unmount } = render(<GameApp engineOverride={realEngine} dataOverride={FULL_DATA} />);

    // Dynamic StartScreen counts match live data (no stale hardcoded numbers)
    expect(container.textContent).toContain(`${EVENTS.length + CORE_DATA.TIMELINE.length}종 분기·역사 사건`);
    expect(container.textContent).toContain(`${CHRONICLES.length}종 연대기`);
    expect(container.textContent).toContain(`${CORE_DATA.WORLDS.length}개 행성`);

    // Start first life, then return to StartScreen via #btn-new-life (saves active run)
    startCustomCharacter(container);
    fireEvent.click(container.querySelector("#btn-new-life")!);
    expect(container.querySelector("#resume-banner")).not.toBeNull();
    expect(container.querySelector("#resume-banner")?.textContent).toContain("포커스검증병");

    // 1st click on #btn-start-random must ARM without overwriting
    const randBtn = container.querySelector("#btn-start-random") as HTMLButtonElement;
    fireEvent.click(randBtn);
    expect(container.querySelector("#resume-banner")).not.toBeNull();
    expect(randBtn.textContent).toContain("5초 내 다시 선택");
    expect(container.querySelector("#sr-live")?.textContent).toContain("덮어쓰고 새 인생을 시작하려면");

    // Switching to #btn-discard-saved arms discard instead of deleting on 1st click
    const discardBtn = container.querySelector("#btn-discard-saved") as HTMLButtonElement;
    fireEvent.click(discardBtn);
    expect(container.querySelector("#resume-banner")).not.toBeNull();
    expect(discardBtn.textContent).toContain("삭제 재확인");
    expect(randBtn.textContent).toContain("무작위 운명으로 탄생하기");

    // 2nd click on #btn-discard-saved deletes save and restores focus to #start-heading
    vi.useFakeTimers();
    fireEvent.click(discardBtn);
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
    expect(container.querySelector("#resume-banner")).toBeNull();
    expect(document.activeElement).toBe(container.querySelector("#start-heading"));

    // Create a new life again, return to StartScreen, and confirm 2-click overwrite on #btn-start-custom
    startCustomCharacter(container);
    fireEvent.click(container.querySelector("#btn-new-life")!);
    expect(container.querySelector("#resume-banner")).not.toBeNull();
    fireEvent.change(container.querySelector("#inp-name")!, { target: { value: "덮어쓰기신규병" } });
    const customBtn = container.querySelector("#btn-start-custom") as HTMLButtonElement;
    fireEvent.click(customBtn);
    expect(container.querySelector("#resume-banner")).not.toBeNull();
    expect(customBtn.textContent).toContain("5초 내 다시 선택");
    fireEvent.click(customBtn);
    expect(container.querySelector("#char-name")).toHaveTextContent("덮어쓰기신규병");
    unmount();
    localStorage.clear();

    // Verify critSuccess (대성공) and critFail (대실패) display in #roll-banner and #recent-log-list
    const origRand = Math.random;
    const critEvent = {
      id: "ev_test_crit_labels",
      title: "치명 판정 테스트",
      category: "테스트",
      text: "판정 확인.",
      choices: [
        {
          label: "[지성 판정] 시도",
          check: { stat: "Int", diff: 10 },
          success: { text: "성공했다." },
          fail: { text: "실패했다." }
        }
      ],
      source: "Test Suite"
    };
    let seq = 0;
    const critProxy = {
      ...realEngine,
      advanceQuarter(st: any) {
        if (seq < 2) {
          seq++;
          st.pendingEvent = { ...critEvent, isTimeline: false };
          return { status: "event", event: st.pendingEvent };
        }
        return realEngine.advanceQuarter(st);
      }
    };
    const { container: cCrit } = render(<GameApp engineOverride={critProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(cCrit);
    try {
      // Force roll = 1 (critSuccess -> 대성공)
      Math.random = () => 0.0;
      fireEvent.click(cCrit.querySelector("#btn-step")!);
      fireEvent.click(cCrit.querySelector(".choice-btn")!);
      expect(cCrit.querySelector("#roll-banner")?.textContent).toContain("대성공");
      expect(cCrit.querySelector("#recent-log-list")?.textContent).toContain("대성공");

      // Force roll = 100 (critFail -> 대실패)
      Math.random = () => 0.999;
      fireEvent.click(cCrit.querySelector("#btn-step")!);
      fireEvent.click(cCrit.querySelector(".choice-btn")!);
      expect(cCrit.querySelector("#roll-banner")?.textContent).toContain("대실패");
      expect(cCrit.querySelector("#recent-log-list")?.textContent).toContain("대실패");
    } finally {
      Math.random = origRand;
    }
  });

  it("Stage 19-A/19-C: enforces 1 named spotlight on trimmed TIMELINE events vs 2 on crossovers with accessible focus & choice resolution", () => {
    localStorage.clear();
    const cadiaTl = CORE_DATA.TIMELINE.find((t: any) => t.id === "tl_fall_of_cadia")!;
    const creedCelestineXover = EVENTS.find((e: any) => e.id === "ev_s19a_xover_creed_celestine")!;
    expect(CORE_DATA.TIMELINE.every((t: any) => (t.characters || []).length <= 1)).toBe(true);
    expect(
      EVENTS.filter((e: any) => e.id.startsWith("ev_s19a_xover_")).every((e: any) => (e.characters || []).length === 2)
    ).toBe(true);
    expect(cadiaTl.characters).toEqual(["creed"]);
    expect(creedCelestineXover.characters).toEqual(["creed", "celestine"]);

    let stepNum = 0;
    const spotlightProxy = {
      ...realEngine,
      advanceQuarter(st: any) {
        stepNum++;
        if (stepNum === 1) {
          st.pendingEvent = { ...cadiaTl, isTimeline: true };
          return { status: "event", event: st.pendingEvent };
        }
        if (stepNum === 2) {
          st.pendingEvent = { ...creedCelestineXover, isTimeline: false };
          return { status: "event", event: st.pendingEvent };
        }
        return realEngine.advanceQuarter(st);
      }
    };

    const { container, unmount } = render(<GameApp engineOverride={spotlightProxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    // 1. Trimmed TIMELINE event -> exactly 1 named spotlight card & focus on #active-event-heading
    fireEvent.click(container.querySelector("#btn-step")!);
    expect(document.activeElement).toBe(container.querySelector("#active-event-heading"));
    const tlDetails = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(tlDetails).not.toBeNull();
    expect(tlDetails.open).toBe(true);
    expect(tlDetails.querySelectorAll(".named-profile-card")).toHaveLength(1);
    expect(tlDetails.querySelector(".named-spotlight-names")?.textContent).toContain("우르사카르 E. 크리드");
    // English name in spotlight card must remain aria-hidden
    expect(tlDetails.querySelector(".named-profile-en")?.getAttribute("aria-hidden")).toBe("true");
    // Resolve unconditional fallback choice (last enabled choice)
    const tlChoices = [...container.querySelectorAll(".choice-btn")] as HTMLButtonElement[];
    const tlFallback = tlChoices.filter((b) => !b.disabled).at(-1)!;
    fireEvent.click(tlFallback);
    expect(container.querySelector("#active-event-heading")).toBeNull();

    // 2. Stage 19-A 2-person crossover -> exactly 2 named spotlight cards & crossover_oath/met_* tags on resolution
    fireEvent.click(container.querySelector("#btn-step")!);
    expect(document.activeElement).toBe(container.querySelector("#active-event-heading"));
    const xoverDetails = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(xoverDetails).not.toBeNull();
    expect(xoverDetails.querySelectorAll(".named-profile-card")).toHaveLength(2);
    const xoverNames = xoverDetails.querySelector(".named-spotlight-names")?.textContent || "";
    expect(xoverNames).toContain("우르사카르 E. 크리드");
    expect(xoverNames).toContain("성녀 셀레스틴");
    const xoverChoices = [...container.querySelectorAll(".choice-btn")] as HTMLButtonElement[];
    const xoverFallback = xoverChoices.filter((b) => !b.disabled).at(-1)!;
    fireEvent.click(xoverFallback);
    expect(container.querySelector("#active-event-heading")).toBeNull();
    const savedRaw = localStorage.getItem(ACTIVE_SAVE_KEY) || "";
    expect(savedRaw).toContain("met_creed");
    expect(savedRaw).toContain("met_celestine");
    expect(savedRaw).toContain("crossover_oath");

    unmount();
    localStorage.clear();
  });

  it("Stage 19-B/19-C: validates Stage 17-18 high-rank listening telemetry, resolveFactionEndingKey parity, and honorable ending flow", () => {
    localStorage.clear();
    const FORBIDDEN_SYM = /[★↗←✓↑↓]/;
    const profiles = [
      { careerId: "master_of_administratum", worldId: "terra", originId: "terra_high_blood", gender: "female", age: 68, tags: ["administratum", "high_lord_terra"], key: "imperial_standard" },
      { careerId: "living_saint", worldId: "ophelia7", originId: "ecclesiarchy_novice", gender: "female", age: 68, tags: ["living_saint", "saint_mercy_aspect"], key: "living_saint" },
      { careerId: "knight_high_king", worldId: "generic_knight", originId: "knight_house", gender: "female", age: 100, tags: ["imperial_knight", "knight_high_king"], key: "imperial_knight" },
      { careerId: "nav_novator", worldId: "terra", originId: "navigator_house", gender: "male", age: 100, tags: ["navigator", "nav_novator"], key: "navis_navigator" },
      { careerId: "grand_master_of_assassins", worldId: "terra", originId: "schola_progenium", gender: "male", age: 68, tags: ["assassin", "clade_vindicare", "grand_master_assassins", "high_lord_terra"], key: "officio_assassinorum" },
      { careerId: "daemon_prince", worldId: "cadia", originId: "imperial_citizen", gender: "male", age: 68, tags: ["heretic", "daemon_prince", "mark_khorne"], key: "daemon_prince" },
      { careerId: "saint_vessel", worldId: "ophelia7", originId: "ecclesiarchy_novice", gender: "female", age: 100, tags: ["saint_vessel", "saint_spark"], key: "imperial_standard" },
      { careerId: "inquisitor", worldId: "terra", originId: "navigator_house", gender: "male", age: 100, tags: ["navigator", "navis_officer", "inquisitor"], key: "inquisition" }
    ];

    for (const p of profiles) {
      expect(realEngine.getCareer(p.careerId).id).toBe(p.careerId);
      const st = realEngine.createCharacter({
        mode: "custom",
        worldId: p.worldId,
        originId: p.originId,
        traitId: "none",
        eraId: "indomitus",
        gender: p.gender
      });
      st.age = p.age;
      st.year = st.birthYear + p.age;
      st.careerId = p.careerId;
      st.tags = [...new Set([...st.tags, ...p.tags])];

      expect(realEngine.resolveFactionEndingKey(st)).toBe(p.key);
      const summary = realEngine.buildStatusSummary(st);
      expect(summary.length).toBeGreaterThan(40);
      expect(summary.length).toBeLessThanOrEqual(320);
      expect(summary).not.toMatch(/undefined|NaN/);
      expect(summary).not.toMatch(FORBIDDEN_SYM);

      const retChk = realEngine.canRetireHonorably(st);
      expect(retChk.ok).toBe(true);
      const honEv = realEngine.createHonorableEndingEvent(st);
      expect(honEv.title).not.toMatch(FORBIDDEN_SYM);
      expect(honEv.choices.length).toBe(2);
      const grade = realEngine.evaluateLifeGrade(st);
      expect(grade.rank).toBeTruthy();
      expect(grade.verdict).not.toMatch(/undefined|NaN/);
      expect(grade.verdict).not.toMatch(FORBIDDEN_SYM);
    }

    // Live UI verification: resume a saved High Queen state, trigger honorable ending, confirm obituary & single #sr-live
    const hqState = realEngine.createCharacter({
      mode: "custom",
      worldId: "generic_knight",
      originId: "knight_house",
      traitId: "none",
      eraId: "indomitus",
      gender: "female",
      customName: "하이퀸검증"
    });
    hqState.age = 100;
    hqState.year = hqState.birthYear + 100;
    hqState.careerId = "knight_high_king";
    hqState.tags = [...new Set([...hqState.tags, "imperial_knight", "knight_high_king"])];
    hqState.pendingEvent = realEngine.createHonorableEndingEvent(hqState);
    saveActiveState(hqState, realEngine);

    const { container, unmount } = render(<GameApp engineOverride={realEngine} dataOverride={FULL_DATA} />);
    fireEvent.click(container.querySelector("#btn-resume-saved")!);
    expect(container.querySelectorAll("#sr-live")).toHaveLength(1);
    expect(container.querySelector("#active-event-heading")?.textContent).toContain("스론 메카니쿰의 선조가 되다");
    // Choose honorable retirement (first choice) -> enters death summary with matching High Queen obituary
    const retireBtn = container.querySelector(".choice-btn") as HTMLButtonElement;
    fireEvent.click(retireBtn);
    const bodyText = container.textContent || "";
    expect(bodyText).toContain("HIGH MONARCH OF THE KNIGHT WORLD");
    expect(bodyText).toContain("하이 퀸");
    expect(bodyText).not.toMatch(FORBIDDEN_SYM);

    unmount();
    localStorage.clear();
  });

  it("Stage 19-D1: opens named spotlight on first/partial-new encounter, collapses on repeat encounter with click-to-expand, hides character badge from SR, and records previouslyMetCharacters", () => {
    localStorage.clear();
    const cadiaTl = CORE_DATA.TIMELINE.find((t: any) => t.id === "tl_fall_of_cadia")!;
    const creedCelestineXover = EVENTS.find((e: any) => e.id === "ev_s19a_xover_creed_celestine")!;
    const creedSolo = EVENTS.find((e: any) => e.id === "ev_named_creed")!;

    // 1. Real advanceQuarter contract: previouslyMetCharacters must capture state BEFORE pushing into state.metCharacters
    const firstCadia = realEngine.createCharacter({
      mode: "custom",
      worldId: "cadia",
      originId: "imperial_citizen",
      traitId: "none",
      eraId: "cadia_rift",
      gender: "male"
    });
    firstCadia.age = 20;
    firstCadia.year = 999;
    firstCadia.quarter = 1;
    firstCadia.careerId = "astra_militarum";
    const res1 = realEngine.advanceQuarter(firstCadia);
    expect(res1.status).toBe("event");
    expect(firstCadia.pendingEvent?.id).toBe("tl_fall_of_cadia");
    expect(firstCadia.metCharacters).toContain("creed");
    expect(firstCadia.pendingEvent?.previouslyMetCharacters).toEqual([]);

    const repeatCadia = realEngine.createCharacter({
      mode: "custom",
      worldId: "cadia",
      originId: "imperial_citizen",
      traitId: "none",
      eraId: "cadia_rift",
      gender: "male"
    });
    repeatCadia.age = 20;
    repeatCadia.year = 999;
    repeatCadia.quarter = 1;
    repeatCadia.careerId = "astra_militarum";
    repeatCadia.metCharacters = ["creed"];
    const res2 = realEngine.advanceQuarter(repeatCadia);
    expect(res2.status).toBe("event");
    expect(repeatCadia.pendingEvent?.id).toBe("tl_fall_of_cadia");
    expect(repeatCadia.pendingEvent?.previouslyMetCharacters).toEqual(["creed"]);

    // 2. UI behavioral flow across 4 scenarios
    let stepNum = 0;
    const proxy = {
      ...realEngine,
      advanceQuarter(st: any) {
        stepNum++;
        if (stepNum === 1) {
          // First encounter: engine already pushed "creed" into metCharacters, but previouslyMetCharacters is []
          if (!st.metCharacters.includes("creed")) st.metCharacters.push("creed");
          st.pendingEvent = { ...cadiaTl, isTimeline: true, previouslyMetCharacters: [] };
          return { status: "event", event: st.pendingEvent };
        }
        if (stepNum === 2) {
          // Mixed 2-person crossover: creed is already met, celestine is new -> MUST stay open
          if (!st.metCharacters.includes("celestine")) st.metCharacters.push("celestine");
          st.pendingEvent = { ...creedCelestineXover, isTimeline: false, previouslyMetCharacters: ["creed"] };
          return { status: "event", event: st.pendingEvent };
        }
        if (stepNum === 3) {
          // Repeat solo encounter: creed already met -> MUST start collapsed
          st.pendingEvent = { ...creedSolo, isTimeline: false, previouslyMetCharacters: ["creed"] };
          return { status: "event", event: st.pendingEvent };
        }
        if (stepNum === 4) {
          // Legacy save fallback (no previouslyMetCharacters): both met via tags/metCharacters -> MUST start collapsed
          st.pendingEvent = { ...creedCelestineXover, isTimeline: false };
          return { status: "event", event: st.pendingEvent };
        }
        return realEngine.advanceQuarter(st);
      }
    };

    const { container, unmount } = render(<GameApp engineOverride={proxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    const resolveFallback = () => {
      const btns = [...container.querySelectorAll(".choice-btn")] as HTMLButtonElement[];
      fireEvent.click(btns.filter((b) => !b.disabled).at(-1)!);
    };

    // Step 1: First encounter -> open === true, visual character badge aria-hidden="true", concise summary kicker
    fireEvent.click(container.querySelector("#btn-step")!);
    const badges1 = [...container.querySelectorAll(".ev-badge.character")];
    expect(badges1).toHaveLength(1);
    expect(badges1[0].getAttribute("aria-hidden")).toBe("true");
    const visibleBadgesText = [...container.querySelectorAll(".event-badges > :not([aria-hidden='true'])")]
      .map((el) => el.textContent || "")
      .join(" ");
    expect(visibleBadgesText).not.toContain("우르사카르 E. 크리드");
    const details1 = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(details1).not.toBeNull();
    expect(details1.getAttribute("aria-label")).toBeNull();
    expect(details1.open).toBe(true);
    expect(details1.querySelector(".named-spotlight-kicker")?.textContent).toBe("인물 소개");
    resolveFallback();

    // Step 2: Mixed crossover (1 met, 1 new) -> open === true, both visual badges aria-hidden="true"
    fireEvent.click(container.querySelector("#btn-step")!);
    const badges2 = [...container.querySelectorAll(".ev-badge.character")];
    expect(badges2).toHaveLength(2);
    expect(badges2.every((b) => b.getAttribute("aria-hidden") === "true")).toBe(true);
    const details2 = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(details2.open).toBe(true);
    expect(details2.querySelector(".named-spotlight-kicker")?.textContent).toBe("인물 소개");
    resolveFallback();

    // Step 3: Repeat encounter -> open === false, concise repeat kicker, user can click <summary> to expand & stays open across re-renders
    fireEvent.click(container.querySelector("#btn-step")!);
    const details3 = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(details3).not.toBeNull();
    expect(details3.getAttribute("aria-label")).toBeNull();
    expect(details3.open).toBe(false);
    expect(details3.querySelector(".named-spotlight-kicker")?.textContent).toBe("재조우 인물 소개");
    fireEvent.click(details3.querySelector("summary.named-spotlight-summary")!);
    expect(details3.open).toBe(true);
    // Trigger parent GameApp re-render via status summary button -> expanded state must NOT snap shut
    fireEvent.click(container.querySelector("#btn-status-summary")!);
    expect((container.querySelector("details.named-spotlight") as HTMLDetailsElement).open).toBe(true);
    resolveFallback();

    // Step 4: Legacy fallback without previouslyMetCharacters -> open === false
    fireEvent.click(container.querySelector("#btn-step")!);
    const details4 = container.querySelector("details.named-spotlight") as HTMLDetailsElement;
    expect(details4).not.toBeNull();
    expect(details4.open).toBe(false);
    expect(details4.querySelector(".named-spotlight-kicker")?.textContent).toBe("재조우 인물 소개");
    resolveFallback();

    unmount();
    localStorage.clear();
  });

  it("Stage 20-A: resolves optional critSuccess/critFail bespoke outcomes in GameApp UI and preserves fallback", () => {
    const realEngine = createImperiumEngine(FULL_DATA);
    const critEvent = {
      id: "ev_test_s20_crit",
      title: "극단 판정 테스트 사건",
      category: "테스트",
      text: "극단적 판정 분기를 검증하는 사건이다.",
      choices: [
        {
          label: "[지성 판정] 대성공과 대실패를 검증한다",
          check: { stat: "Int", diff: 0 },
          critSuccess: { text: "황금빛 기적의 대성공 산문이 기록되었다.", stats: { Int: 5 } },
          success: { text: "일반 성공 산문이 기록되었다.", stats: { Int: 1 } },
          fail: { text: "일반 실패 산문이 기록되었다.", wounds: -5 },
          critFail: { text: "치명적 대실패 산문이 기록되었다.", wounds: -12 }
        },
        {
          label: "안전하게 물러난다",
          effect: { text: "물러났다." }
        }
      ]
    };

    const fallbackEvent = {
      id: "ev_test_s20_crit_fallback",
      title: "일반 판정 폴백 사건",
      category: "테스트",
      text: "critSuccess 미지정 사건의 폴백을 검증한다.",
      choices: [
        {
          label: "[지성 판정] 일반 성공 폴백 검증",
          check: { stat: "Int", diff: 0 },
          success: { text: "일반 성공 폴백 산문이 정상 출력되었다.", stats: { Int: 1 } },
          fail: { text: "일반 실패 폴백 산문.", wounds: -5 }
        }
      ]
    };

    let step = 0;
    const proxy = {
      ...realEngine,
      advanceQuarter(st: any) {
        step++;
        st.stats.Int = 55;
        st.pendingEvent = step <= 2 ? critEvent : fallbackEvent;
        return { status: "event", event: st.pendingEvent };
      }
    };

    const randSpy = vi.spyOn(Math, "random");
    try {
      const { container, unmount } = render(<GameApp engineOverride={proxy} dataOverride={FULL_DATA} />);
      startCustomCharacter(container);

      // Step 1: force roll <= 5 (critSuccess) -> bespoke critSuccess prose + 대성공 in banner, chronicle, and #sr-live
      randSpy.mockReturnValue(0.01);
      fireEvent.click(container.querySelector("#btn-step")!);
      expect(container.querySelector("#active-event-heading")?.textContent).toContain("극단 판정 테스트 사건");
      fireEvent.click(container.querySelectorAll(".choice-btn")[0]);
      expect(container.querySelector("#roll-banner")?.textContent).toContain("대성공");
      expect(container.querySelector("#recent-log-list")?.textContent).toContain("황금빛 기적의 대성공 산문이 기록되었다.");
      expect(container.querySelector("#sr-live")?.textContent).toContain("대성공(");

      // Step 2: force roll >= 96 (critFail) -> bespoke critFail prose + 대실패 in banner, chronicle, and #sr-live
      randSpy.mockReturnValue(0.98);
      fireEvent.click(container.querySelector("#btn-step")!);
      fireEvent.click(container.querySelectorAll(".choice-btn")[0]);
      expect(container.querySelector("#roll-banner")?.textContent).toContain("대실패");
      expect(container.querySelector("#recent-log-list")?.textContent).toContain("치명적 대실패 산문이 기록되었다.");
      expect(container.querySelector("#sr-live")?.textContent).toContain("대실패(");

      // Step 3: force roll <= 5 on event without critSuccess -> falls back to choice.success prose
      randSpy.mockReturnValue(0.01);
      fireEvent.click(container.querySelector("#btn-step")!);
      fireEvent.click(container.querySelectorAll(".choice-btn")[0]);
      expect(container.querySelector("#roll-banner")?.textContent).toContain("대성공");
      expect(container.querySelector("#recent-log-list")?.textContent).toContain("일반 성공 폴백 산문이 정상 출력되었다.");
      expect(container.querySelector("#sr-live")?.textContent).toContain("대성공(");

      // Red-Team Structural Risk #2: migrateState must sanitize malformed pendingEvent / lastRoll without crashing
      const rawBroken = realEngine.createCharacter({ mode: "custom", worldId: "terra", originId: "imperial_citizen", traitId: "none", eraId: "armageddon", gender: "male" });
      rawBroken.pendingEvent = { id: "corrupt_ev", title: "손상", choices: "not_an_array" as any };
      rawBroken.lastRoll = { roll: "NaN" as any, target: null as any };
      const migrated = realEngine.migrateState(rawBroken);
      expect(migrated?.pendingEvent).toBeNull();
      expect(migrated?.lastRoll).toBeNull();

      unmount();
      localStorage.clear();
    } finally {
      randSpy.mockRestore();
    }
  });

  it("Stage 21: renders triple-explicit trait UI (choice preview, gain/heal log, dossier perks & stat caps) and heals via removeTags", () => {
    const realEngine = createImperiumEngine(FULL_DATA);
    const transmutEvent = {
      id: "ev_test_s21_transmute",
      title: "포탄 충격 극복 시련",
      category: "테스트",
      text: "트라우마를 딛고 전선으로 복귀할지 시험한다.",
      choices: [
        {
          label: "[의지 판정] 포화 속 지휘권을 되찾는다",
          check: { stat: "WP", diff: 10 },
          success: {
            text: "트라우마를 이겨 내고 평정을 되찾았다.",
            removeTags: ["shell_shocked"]
          },
          critSuccess: {
            text: "극한의 공포를 꿰뚫고 강철 같은 정신으로 각성했다.",
            removeTags: ["shell_shocked"],
            addTags: ["iron_nerves"]
          },
          fail: {
            text: "여전히 손이 떨렸다.",
            wounds: -5
          }
        },
        {
          label: "조용히 후방으로 물러난다",
          effect: { text: "물러났다." }
        }
      ]
    };

    const proxy = {
      ...realEngine,
      advanceQuarter(st: any) {
        if (!st.tags.includes("shell_shocked") && !st.tags.includes("iron_nerves")) {
          st.tags.push("shell_shocked");
        }
        st.stats.WP = 40;
        st.pendingEvent = transmutEvent;
        return { status: "event", event: st.pendingEvent };
      }
    };

    const randSpy = vi.spyOn(Math, "random");
    try {
      const { container, unmount } = render(<GameApp engineOverride={proxy} dataOverride={FULL_DATA} />);
      startCustomCharacter(container);

      // Dossier shows stat / cap and homeworld + innate trait perks
      expect(container.querySelector("#stats-grid")?.textContent).toContain(" / ");
      expect(container.querySelector("#trait-perks-list")?.textContent).toContain("모성 특전");
      expect(container.querySelector("#trait-perks-list")?.textContent).toContain("선천 재능");

      // Advance to trigger event with shell_shocked
      fireEvent.click(container.querySelector("#btn-step")!);
      expect(container.querySelector("#trait-perks-list")?.textContent).toContain("부정 특성: 포탄 충격");

      // Choice preview shows both normal heal and critSuccess transmutation
      const choiceText = container.querySelectorAll(".choice-btn")[0]?.textContent || "";
      expect(choiceText).toContain("성공 시 특성 치유: 포탄 충격");
      expect(choiceText).toContain("대성공 시 특성 획득: 강철의 신경");

      // Trigger critSuccess (roll <= 5) -> removeTags shell_shocked + addTags iron_nerves
      randSpy.mockReturnValue(0.01);
      fireEvent.click(container.querySelectorAll(".choice-btn")[0]);

      const logText = container.querySelector("#recent-log-list")?.textContent || "";
      expect(logText).toContain("특성 치유: 포탄 충격");
      expect(logText).toContain("특성 획득: 강철의 신경");

      const perksText = container.querySelector("#trait-perks-list")?.textContent || "";
      expect(perksText).toContain("긍정 특성: 강철의 신경");
      expect(perksText).not.toContain("포탄 충격");

      unmount();
      localStorage.clear();
    } finally {
      randSpy.mockRestore();
    }
  });

  it("Stage 21.5: still announces new chronicle logs to #sr-live after reaching MAX_LOGS (2400)", () => {
    const realEngine = createImperiumEngine(FULL_DATA);
    const proxy = {
      ...realEngine,
      advanceQuarter(st: any) {
        if (st.logs.length < 2400) {
          while (st.logs.length < 2400) {
            st.logs.push({
              year: "980.M41 상반기",
              age: st.age,
              text: "이전 일상 기록",
              kind: "chronicle"
            });
          }
        }
        st.age += 1;
        st.year += 1;
        // Simulate addLog at MAX_LOGS: unshift new entry and prune one old entry so length remains 2400
        st.logs.unshift({
          year: `${st.year}.M41 상반기`,
          age: st.age,
          text: "2400건 상한 이후 새 연대기 기록",
          kind: "chronicle"
        });
        st.logs.pop();
        return { status: "ok", isNewYear: true };
      }
    };

    const { container, unmount } = render(<GameApp engineOverride={proxy} dataOverride={FULL_DATA} />);
    startCustomCharacter(container);

    fireEvent.click(container.querySelector("#btn-step")!);

    const srText = container.querySelector("#sr-live")?.textContent || "";
    expect(srText).toContain("2400건 상한 이후 새 연대기 기록");

    unmount();
    localStorage.clear();
  });

  it("Stage 21.5: migrateState filters malformed entries inside logs array", () => {
    const engine = createImperiumEngine(FULL_DATA);
    const base = engine.createCharacter({ mode: "custom", eraId: "armageddon", worldId: "terra" });
    const corrupted = {
      ...base,
      logs: [
        null,
        "broken-string",
        42,
        { year: "980.M41", age: 0 },
        { year: "980.M41", age: 0, text: "정상 출생 기록", kind: "birth" }
      ]
    };
    const migrated = engine.migrateState(corrupted);
    expect(migrated).not.toBeNull();
    expect(migrated.logs).toHaveLength(1);
    expect(migrated.logs[0].text).toBe("정상 출생 기록");
  });

  it("Stage 22: supports standard vs grimdark difficulty toggle, legacy fallback, req.difficulty isolation, and -12% grimdark admission penalty", () => {
    const engine = createImperiumEngine(FULL_DATA);

    // 1. Legacy state without difficulty falls back to "standard"
    const legacy = engine.createCharacter({ mode: "custom", eraId: "armageddon", worldId: "terra" });
    delete legacy.difficulty;
    const migrated = engine.migrateState(legacy);
    expect(migrated.difficulty).toBe("standard");

    // 2. req.difficulty isolation
    const stdState = engine.createCharacter({ mode: "custom", difficulty: "standard", eraId: "armageddon", worldId: "terra", originId: "imperial_citizen", traitId: "none" });
    const grimState = engine.createCharacter({ mode: "custom", difficulty: "grimdark", eraId: "armageddon", worldId: "terra", originId: "imperial_citizen", traitId: "none" });
    expect(engine.checkReq(stdState, { difficulty: "grimdark" })).toBe(false);
    expect(engine.checkReq(grimState, { difficulty: "grimdark" })).toBe(true);

    // 3. -12% admission penalty strictly in grimdark (unclamped mid-range stats)
    stdState.careerId = "menial_worker";
    grimState.careerId = "menial_worker";
    stdState.stats = { ...stdState.stats, BS: 35, T: 35, WP: 35, Int: 35 };
    grimState.stats = { ...stdState.stats };
    const stdAdm = engine.getAdmissionPreview(stdState, "astra_militarum");
    const grimAdm = engine.getAdmissionPreview(grimState, "astra_militarum");
    expect(stdAdm).not.toBeNull();
    expect(grimAdm).not.toBeNull();
    expect(stdAdm.target - grimAdm.target).toBe(12);

    // 4. StartScreen radio group switches to grimdark and reflects in DossierPanel badge
    const { container, unmount } = render(<GameApp engineOverride={engine} dataOverride={FULL_DATA} />);
    const grimRadio = container.querySelector("#rad-diff-grimdark") as HTMLInputElement;
    expect(grimRadio).not.toBeNull();
    fireEvent.click(grimRadio);
    expect(grimRadio.checked).toBe(true);

    fireEvent.click(container.querySelector("#btn-start-custom")!);
    const modeBadge = container.querySelector("#lbl-mode-badge")?.textContent || "";
    expect(modeBadge).toContain("그림다크");

    unmount();
    localStorage.clear();
  });

  it("Stage 23: triggers centenarianOps for 100+ characters across all 3 pools with 4-year cooldown and migrateState compatibility", () => {
    const engine = createImperiumEngine(FULL_DATA);
    const base = engine.createCharacter({ mode: "custom", eraId: "armageddon", worldId: "macragge" });
    delete base.lastCentenarianOpYear;
    delete base.recentCentenarianOps;
    const migrated = engine.migrateState(base);
    expect(migrated.lastCentenarianOpYear).toBe(-999);
    expect(migrated.recentCentenarianOps).toEqual([]);

    const helpers = {
      getWorld: engine.getWorld,
      getCareer: engine.getCareer,
      isIncorruptibleState: () => false
    };

    // Under 100 returns null
    expect(createDynamicCentenarianEvent({ ...migrated, age: 99 }, null, helpers)).toBeNull();

    // 1. Transhuman 100+
    const astartes = { ...migrated, age: 120, year: 1100, careerId: "astartes_brother", tags: ["astartes", "transhuman"] };
    const ev1 = createDynamicCentenarianEvent(astartes, null, helpers);
    expect(ev1).not.toBeNull();
    expect(ev1.isDynamicCentenarian).toBe(true);
    expect(ev1.choices.some((ch: { req?: unknown }) => !ch.req)).toBe(true);
    // 4-year cooldown blocks immediate re-trigger
    expect(createDynamicCentenarianEvent({ ...astartes, year: 1102 }, null, helpers)).toBeNull();

    // 2. Mortal elder 100+
    const elder = { ...migrated, age: 105, year: 1085, careerId: "administratum", tags: ["rejuvenat"] };
    const ev2 = createDynamicCentenarianEvent(elder, null, helpers);
    expect(ev2).not.toBeNull();
    expect(ev2.choices.some((ch: { req?: unknown }) => !ch.req)).toBe(true);

    // 3. Chaos immortal 100+
    const chaos = { ...migrated, age: 150, year: 1130, careerId: "daemon_prince", tags: ["heretic", "chaos_aligned", "daemon_prince"] };
    const ev3 = createDynamicCentenarianEvent(chaos, null, helpers);
    expect(ev3).not.toBeNull();
    expect(ev3.choices.some((ch: { req?: unknown }) => !ch.req)).toBe(true);
  });
});



