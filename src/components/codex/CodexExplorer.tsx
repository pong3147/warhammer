import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORE_DATA } from "../../data/core/index.js";
import { createCoreFormatters } from "../../engine/formatters.js";
import { groupCareersByTree } from "../../lib/codexMeta";
import { lexicanumUrl, withBase } from "../../lib/links";

export type CodexSection = "worlds" | "careers" | "chapters" | "timeline" | "characters";

const coreFmt = createCoreFormatters(CORE_DATA);

interface Props {
  section: CodexSection;
}

export default function CodexExplorer({ section }: Props) {
  const [query, setQuery] = useState("");
  const [openTrees, setOpenTrees] = useState<Set<string>>(() => new Set(["civil"]));
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  const [liveMsg, setLiveMsg] = useState("");
  const didMountRef = useRef(false);
  const seqRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const q = query.trim().toLowerCase();

  const requestHashFocus = useCallback(
    (rawHash: string) => {
      let hash = (rawHash || "").replace(/^#/, "");
      if (!hash) return;
      try {
        hash = decodeURIComponent(hash);
      } catch {
        // keep raw hash if malformed
      }
      if (section === "careers") {
        if (hash.startsWith("tree-")) {
          const treeId = hash.slice("tree-".length);
          setOpenTrees((prev) => new Set([...prev, treeId]));
          setQuery("");
          setPendingHash(hash);
          return;
        }
        const found = CORE_DATA.CAREERS.find((c: any) => c.id === hash);
        if (found && found.tree) {
          setOpenTrees((prev) => new Set([...prev, found.tree]));
          setQuery("");
          setPendingHash(hash);
        }
        return;
      }

      const pool =
        section === "worlds"
          ? CORE_DATA.WORLDS
          : section === "chapters"
          ? CORE_DATA.CHAPTERS
          : section === "timeline"
          ? CORE_DATA.TIMELINE
          : CORE_DATA.CHARACTERS;

      if (pool.some((item: any) => item.id === hash)) {
        setQuery("");
        setPendingHash(hash);
      }
    },
    [section]
  );

  // 전 5개 코덱스 섹션 해시 진입 및 hashchange 시 필터 해제 · 아코디언 개방 후 대상 <h3>/<summary> 포커스
  useEffect(() => {
    if (typeof window === "undefined") return;
    requestHashFocus(window.location.hash);
    const onHashChange = () => requestHashFocus(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [requestHashFocus]);

  useEffect(() => {
    if (!pendingHash || typeof document === "undefined") return;
    const el = document.getElementById(pendingHash);
    if (!el) return;
    if (typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const target =
      section === "careers" && pendingHash.startsWith("tree-")
        ? el.querySelector("summary")
        : el.querySelector("h3") || el;
    if (target instanceof HTMLElement) {
      target.focus();
    }
    setPendingHash(null);
  }, [pendingHash, section, query, openTrees]);

  const worlds = useMemo(
    () =>
      CORE_DATA.WORLDS.filter((w: any) =>
        `${w.name} ${w.en} ${w.worldClass} ${w.desc} ${w.guardRegiment || ""} ${w.astartesChapter || ""} ${w.source}`
          .toLowerCase()
          .includes(q)
      ),
    [q]
  );

  const careerGroups = useMemo(() => {
    const items = CORE_DATA.CAREERS.filter((c: any) => c.selectable).filter((c: any) =>
      `${c.name} ${c.en} ${c.faction} ${c.treeName || ""} ${c.desc} ${c.source}`
        .toLowerCase()
        .includes(q)
    );
    return groupCareersByTree(items);
  }, [q]);

  const chapters = useMemo(
    () =>
      CORE_DATA.CHAPTERS.filter((ch: any) =>
        `${ch.name} ${ch.en} ${ch.primarch} ${ch.homeworld} ${ch.battleCry} ${ch.desc} ${ch.source}`
          .toLowerCase()
          .includes(q)
      ),
    [q]
  );

  const timeline = useMemo(
    () =>
      CORE_DATA.TIMELINE.filter((t: any) =>
        `${t.title} ${t.en} ${t.scope} ${t.summary} ${t.source}`.toLowerCase().includes(q)
      ),
    [q]
  );

  const characters = useMemo(
    () =>
      CORE_DATA.CHARACTERS.filter((c: any) =>
        `${c.name} ${c.en} ${c.title} ${c.faction} ${c.desc} ${c.source}`.toLowerCase().includes(q)
      ),
    [q]
  );

  const count =
    section === "worlds"
      ? worlds.length
      : section === "careers"
      ? careerGroups.reduce((s, g) => s + g.list.length, 0)
      : section === "chapters"
      ? chapters.length
      : section === "timeline"
      ? timeline.length
      : characters.length;

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      seqRef.current += 1;
      setLiveMsg(`코덱스 검색 결과 ${count}건이 표시되었다.${seqRef.current % 2 === 0 ? "\u200B" : ""}`);
    }, 350);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q, count]);

  const toggleTree = (treeId: string, isOpen: boolean) => {
    setOpenTrees((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(treeId);
      else next.delete(treeId);
      return next;
    });
  };

  return (
    <section className="panel" aria-label="제국 코덱스 목록">
      <div id="sr-live" className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </div>

      <div className="codex-toolbar">
        <label htmlFor="codex-search" className="sr-only">
          코덱스 항목 검색
        </label>
        <input
          id="codex-search"
          className="codex-search"
          type="search"
          placeholder="이름, 영문명, 세력, 출처 키워드 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="glossary-result-count">검색 결과 {count}건</span>
        <a className="btn-ghost" style={{ textDecoration: "none" }} href={withBase("/glossary/")}>
          워해머 개념 사전 보기
        </a>
      </div>

      {section === "worlds" && (
        <div className="codex-grid">
          {worlds.length === 0 ? (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
              검색 조건에 맞는 행성이 없다.
            </p>
          ) : (
            worlds.map((w: any) => {
              const seg = (CORE_DATA.SEGMENTA as any)[w.segmentum];
              const segLabel = seg
                ? seg.name
                : w.segmentum === "random"
                ? "은하 전역 (무작위 성역)"
                : w.segmentum;
              return (
                <article key={w.id} id={w.id} className="codex-card">
                  <div>
                    <h3 tabIndex={-1}>{w.name}</h3>
                    <div className="codex-en">
                      <span aria-hidden="true">
                        {w.en} · {w.classCode} ·{" "}
                      </span>
                      <span>{w.worldClass}</span>
                    </div>
                    <div className="codex-body">
                      <p style={{ marginBottom: "6px" }}>{w.desc}</p>
                      <div style={{ fontSize: "11.5px", color: "var(--text-sub)" }}>
                        성역: {segLabel} · 인구: {w.population} · 기본 수명:{" "}
                        {w.baseLifeExpectancy}세
                        <br />
                        고유 연대: {w.guardRegiment || "-"}
                        {w.astartesChapter ? (
                          <>
                            <br />
                            징병 챕터: {w.astartesChapter}
                          </>
                        ) : null}
                        {w.perk ? (
                          <>
                            <br />
                            모성 평생 특전: {w.perk.name} ({w.perk.desc})
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="codex-foot">
                    <span>{w.source}</span>
                    <a
                      className="codex-link"
                      href={lexicanumUrl(w.en)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lexicanum 대조 (새 창)
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}

      {section === "careers" && (
        <div className="codex-grid">
          {careerGroups.length === 0 ? (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
              검색 조건에 맞는 병종·계급이 없다.
            </p>
          ) : (
            careerGroups.map((g) => (
              <details
                key={g.tree}
                id={`tree-${g.tree}`}
                className="codex-tree-group"
                open={q.length > 0 || openTrees.has(g.tree)}
                onToggle={(e) => {
                  if (q.length === 0) {
                    toggleTree(g.tree, (e.currentTarget as HTMLDetailsElement).open);
                  }
                }}
              >
                <summary>
                  {g.treeName} ({g.list.length}종 · Tier {g.list[0].tier}~
                  {g.list[g.list.length - 1].tier})
                </summary>
                <div className="codex-grid codex-tree-grid">
                  {g.list.map((c: any) => {
                    const modeLabel = c.entryMode === "event" ? "발탁 이벤트 전용" : "직접 지원 가능";
                    return (
                      <article key={c.id} id={c.id} className="codex-card">
                        <div>
                          <h3 tabIndex={-1}>{c.name}</h3>
                          <div className="codex-en">
                            <span aria-hidden="true">{c.en} · </span>
                            <span>
                              {c.faction} · Tier {c.tier} · {modeLabel}
                            </span>
                          </div>
                          <div className="codex-body">
                            <p style={{ marginBottom: "6px" }}>{c.desc}</p>
                            <div style={{ fontSize: "11.5px", color: "var(--gold)" }}>
                              해금 조건: {coreFmt.describeReq(c.req) || "조건 없음"} · 수명 보정{" "}
                              {c.lifeBonus >= 0 ? `+${c.lifeBonus}` : c.lifeBonus}년
                            </div>
                          </div>
                        </div>
                        <div className="codex-foot">
                          <span>{c.source}</span>
                          <a
                            className="codex-link"
                            href={lexicanumUrl(c.en)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Lexicanum 대조 (새 창)
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </details>
            ))
          )}
        </div>
      )}

      {section === "chapters" && (
        <div className="codex-grid">
          {chapters.length === 0 ? (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
              검색 조건에 맞는 챕터가 없다.
            </p>
          ) : (
            chapters.map((ch: any) => {
              const mods = Object.entries(ch.statMods || {})
                .map(
                  ([k, v]: [string, any]) =>
                    `${(coreFmt.STAT_META[k] && coreFmt.STAT_META[k].name) || k} ${v > 0 ? `+${v}` : v}`
                )
                .join(", ");
              const extra = [
                ch.faithBonus ? `신앙 +${ch.faithBonus}` : "",
                ch.allowPsyker === false ? "사이커 입단 불가" : ""
              ]
                .filter(Boolean)
                .join(" · ");
              return (
                <article key={ch.id} id={ch.id} className="codex-card">
                  <div>
                    <h3 tabIndex={-1}>{ch.name}</h3>
                    <div className="codex-en">
                      <span aria-hidden="true">{ch.en} · </span>
                      <span>
                        프라이마크 {ch.primarch} · 모성 {ch.homeworld}
                      </span>
                    </div>
                    <div className="codex-body">
                      <p style={{ marginBottom: "6px", fontStyle: "italic", color: "var(--gold)" }}>
                        "{ch.battleCry}"
                      </p>
                      <p style={{ marginBottom: "6px" }}>{ch.desc}</p>
                      <div style={{ fontSize: "11.5px", color: "var(--cogitator)" }}>
                        보정: {mods}
                        {extra ? ` · ${extra}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="codex-foot">
                    <span>{ch.source}</span>
                    <a
                      className="codex-link"
                      href={lexicanumUrl(ch.en)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lexicanum 대조 (새 창)
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}

      {section === "timeline" && (
        <div className="codex-grid">
          {timeline.length === 0 ? (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
              검색 조건에 맞는 역사 사건이 없다.
            </p>
          ) : (
            timeline.map((t: any) => (
              <article key={t.id} id={t.id} className="codex-card">
                <div>
                  <h3 tabIndex={-1}>
                    {coreFmt.formatImperialYear(t.year)} — {t.title}
                  </h3>
                  <div className="codex-en">
                    <span aria-hidden="true">{t.en} · </span>
                    <span>범위: {t.scope}</span>
                  </div>
                  <div className="codex-body">
                    <p>{t.summary}</p>
                  </div>
                </div>
                <div className="codex-foot">
                  <span>{t.source}</span>
                  <a
                    className="codex-link"
                    href={lexicanumUrl(t.en)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lexicanum 대조 (새 창)
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {section === "characters" && (
        <div className="codex-grid">
          {characters.length === 0 ? (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1" }}>
              검색 조건에 맞는 네임드 인물이 없다.
            </p>
          ) : (
            characters.map((c: any) => (
              <article key={c.id} id={c.id} className="codex-card">
                <div>
                  <h3 tabIndex={-1}>{c.name}</h3>
                  <div className="codex-en">
                    <span aria-hidden="true">{c.en} · </span>
                    <span>{c.title}</span>
                  </div>
                  <div className="codex-body">
                    <p style={{ marginBottom: "6px", fontStyle: "italic", color: "var(--gold)" }}>
                      "{c.quote}"
                    </p>
                    <p style={{ marginBottom: "6px" }}>{c.desc}</p>
                    <div style={{ fontSize: "11.5px", color: "var(--text-sub)" }}>
                      소속: {c.faction} · 활동기: {c.era}
                    </div>
                  </div>
                </div>
                <div className="codex-foot">
                  <span>{c.source}</span>
                  <a
                    className="codex-link"
                    href={lexicanumUrl(c.en)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lexicanum 대조 (새 창)
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
