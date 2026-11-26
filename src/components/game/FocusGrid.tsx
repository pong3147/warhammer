import React from "react";

interface Props {
  currentFocus: string;
  focuses: Record<string, any>;
  onSelectFocus: (focusId: string) => void;
}

/**
 * 영문 특성치 약어 (WS), (BS), (T), (Ag), (Int), (WP), (Fel), (Inf)는 시각 표시만 유지하고
 * 스크린 리더에서는 aria-hidden으로 차단한다 (AGENTS.md 2.2 #3).
 */
function renderDescWithHiddenAbbrs(desc: string): React.ReactNode[] {
  const parts = desc.split(/(\([A-Za-z]{1,4}\))/g);
  return parts.map((part, i) =>
    /^\([A-Za-z]{1,4}\)$/.test(part) ? (
      <span key={i} aria-hidden="true">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export default function FocusGrid({ currentFocus, focuses, onSelectFocus }: Props) {
  return (
    <>
      <h3 className="sub-panel-title" style={{ marginTop: 0 }}>
        연간 삶의 초점
      </h3>
      <div id="focus-grid" className="focus-grid" role="group" aria-label="연간 삶의 초점 선택">
        {Object.values(focuses).map((f: any) => {
          const active = currentFocus === f.id;
          return (
            <button
              key={f.id}
              type="button"
              className={`focus-card${active ? " active" : ""}${f.id === "forbidden" ? " forbidden" : ""}`}
              data-focus={f.id}
              aria-pressed={active}
              onClick={() => onSelectFocus(f.id)}
            >
              <span className="focus-title">{f.name}</span>
              <span className="focus-desc">{renderDescWithHiddenAbbrs(f.desc)}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
