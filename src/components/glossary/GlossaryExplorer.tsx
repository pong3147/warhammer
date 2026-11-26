import React, { useEffect, useMemo, useRef, useState } from "react";
import { lexicanumUrl, withBase } from "../../lib/links";

export interface GlossaryCategory {
  id: string;
  name: string;
  en: string;
  desc: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  en: string;
  category: string;
  summary: string;
  body: string;
  inGameNote: string;
  relatedGlossaryIds?: string[];
  relatedCodexLinks?: { label: string; href: string }[];
  source: string;
}

interface Props {
  categories: GlossaryCategory[];
  terms: GlossaryTerm[];
}

export default function GlossaryExplorer({ categories, terms }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [liveMsg, setLiveMsg] = useState("");
  const [pendingJumpId, setPendingJumpId] = useState<string | null>(null);
  const announceSeqRef = useRef(0);
  const didMountRef = useRef(false);
  const queryTimerRef = useRef<number | null>(null);

  const termById = useMemo(() => {
    const m = new Map<string, GlossaryTerm>();
    for (const t of terms) m.set(t.id, t);
    return m;
  }, [terms]);

  const catCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of terms) m.set(t.category, (m.get(t.category) || 0) + 1);
    return m;
  }, [terms]);

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      if (selectedCat !== "all" && t.category !== selectedCat) return false;
      if (!q) return true;
      const hay = `${t.term} ${t.en} ${t.summary} ${t.body} ${t.inGameNote} ${t.source}`.toLowerCase();
      return hay.includes(q);
    });
  }, [terms, query, selectedCat]);

  const groupedSections = useMemo(() => {
    return categories
      .map((cat) => ({
        cat,
        items: filteredTerms.filter((t) => t.category === cat.id)
      }))
      .filter((s) => s.items.length > 0);
  }, [categories, filteredTerms]);

  const announce = (msg: string) => {
    announceSeqRef.current += 1;
    setLiveMsg(msg + (announceSeqRef.current % 2 === 0 ? "\u200B" : ""));
  };

  // 검색어 입력 시 디바운스(350ms)로 매 타건 TTS 중단 방지, 카테고리 전환 시에는 즉시 1회 안내
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (queryTimerRef.current) window.clearTimeout(queryTimerRef.current);
    const catName =
      selectedCat === "all"
        ? "전체 분야"
        : categories.find((c) => c.id === selectedCat)?.name || selectedCat;
    const delay = query.trim() ? 350 : 0;
    queryTimerRef.current = window.setTimeout(() => {
      announce(`${catName} 검색 결과 ${filteredTerms.length}개 개념이 표시되었다.`);
    }, delay);
    return () => {
      if (queryTimerRef.current) window.clearTimeout(queryTimerRef.current);
    };
  }, [query, selectedCat, filteredTerms.length]);

  const focusTermCard = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const h = el.querySelector("h3");
    if (h instanceof HTMLElement) h.focus();
  };

  useEffect(() => {
    if (!pendingJumpId) return;
    focusTermCard(pendingJumpId);
    setPendingJumpId(null);
  }, [pendingJumpId, selectedCat, query]);

  const handleJumpToTerm = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, "", `#${targetId}`);
    }
    if (selectedCat !== "all" || query.trim()) {
      setSelectedCat("all");
      setQuery("");
      setPendingJumpId(targetId);
    } else {
      focusTermCard(targetId);
    }
  };

  return (
    <div>
      <div id="sr-live" className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMsg}
      </div>

      <section className="panel" aria-labelledby="glossary-filter-heading">
        <h2 id="glossary-filter-heading" className="sr-only">
          개념 검색 및 분류 필터
        </h2>
        <div className="glossary-controls">
          <div className="glossary-search-row">
            <label htmlFor="glossary-search" className="sr-only">
              워해머 40k 개념 검색
            </label>
            <input
              id="glossary-search"
              type="search"
              className="glossary-search-input"
              placeholder="용어, 영문명, 세력, 행성, 시스템 키워드 검색 (예: 워프, 진시드, 대균열, 커미사르)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {(query || selectedCat !== "all") && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setQuery("");
                  setSelectedCat("all");
                }}
              >
                필터 초기화
              </button>
            )}
            <span className="glossary-result-count">
              표시 중: {filteredTerms.length} / {terms.length}종
            </span>
          </div>

          <div className="glossary-cat-bar" role="group" aria-label="개념 분야 선택">
            <button
              type="button"
              className={`btn-ghost${selectedCat === "all" ? " active" : ""}`}
              aria-pressed={selectedCat === "all"}
              onClick={() => setSelectedCat("all")}
            >
              전체 ({terms.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`btn-ghost${selectedCat === cat.id ? " active" : ""}`}
                aria-pressed={selectedCat === cat.id}
                onClick={() => setSelectedCat(cat.id)}
              >
                {cat.name} ({catCounts.get(cat.id) || 0})
              </button>
            ))}
          </div>
        </div>

        {groupedSections.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "12px 0" }}>
            검색 조건에 해당하는 개념이 없다. 다른 키워드나 전체 분야를 선택해 보라.
          </p>
        ) : (
          groupedSections.map(({ cat, items }) => (
            <section key={cat.id} className="glossary-section" aria-labelledby={`gcat-${cat.id}`}>
              <div className="glossary-section-head">
                <h2 id={`gcat-${cat.id}`} className="glossary-section-title">
                  {cat.name} ({items.length}종)
                </h2>
                <p className="glossary-section-desc">{cat.desc}</p>
              </div>

              <div className="glossary-grid">
                {items.map((item) => (
                  <article key={item.id} id={item.id} className="glossary-card">
                    <div>
                      <h3 className="glossary-term" tabIndex={-1}>
                        {item.term}
                      </h3>
                      <div className="glossary-en" aria-hidden="true">
                        {item.en}
                      </div>
                      <p className="glossary-summary">{item.summary}</p>
                      <p className="glossary-body">{item.body}</p>
                      <div className="glossary-ingame">
                        <strong>게임 연동 안내:</strong> {item.inGameNote}
                      </div>

                      {((item.relatedGlossaryIds && item.relatedGlossaryIds.length > 0) ||
                        (item.relatedCodexLinks && item.relatedCodexLinks.length > 0)) && (
                        <nav className="glossary-links" aria-label={`${item.term} 관련 항목`}>
                          {(item.relatedGlossaryIds || []).map((relId) => {
                            const rel = termById.get(relId);
                            if (!rel) return null;
                            return (
                              <a
                                key={relId}
                                href={`#${relId}`}
                                className="glossary-chip"
                                onClick={(e) => handleJumpToTerm(e, relId)}
                              >
                                관련 개념: {rel.term}
                              </a>
                            );
                          })}
                          {(item.relatedCodexLinks || []).map((link) => (
                            <a
                              key={link.href + link.label}
                              href={withBase(link.href)}
                              className="glossary-chip codex"
                            >
                              코덱스: {link.label}
                            </a>
                          ))}
                        </nav>
                      )}
                    </div>

                    <div className="codex-foot">
                      <span>출처: {item.source}</span>
                      <a
                        className="codex-link"
                        href={lexicanumUrl(item.en)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lexicanum 대조 (새 창)
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </section>
    </div>
  );
}
