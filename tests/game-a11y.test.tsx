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
});
