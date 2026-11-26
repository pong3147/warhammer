import React, { useRef } from "react";
import { formatRollOutcomeLabel } from "../../engine/formatters.js";

interface Props {
  logs: any[];
  onOpenFullChronicle: () => void;
}

export default function RecentChronicleList({ logs, onOpenFullChronicle }: Props) {
  // 객체 참조별 불변 키를 부여해 새 로그 prepend 시 기존 <li> DOM 노드의 동일성을 100% 보존한다.
  const keyMapRef = useRef<WeakMap<object, number>>(new WeakMap());
  const nextIdRef = useRef(1);

  const getStableKey = (item: any, fallbackIdx: number) => {
    if (item && typeof item === "object") {
      let id = keyMapRef.current.get(item);
      if (id === undefined) {
        id = nextIdRef.current++;
        keyMapRef.current.set(item, id);
      }
      return id;
    }
    return `log-${fallbackIdx}`;
  };

  const recent = logs.slice(0, 12);

  return (
    <>
      <div className="panel-header" style={{ marginTop: "6px" }}>
        <h2 id="recent-chronicle-heading" className="panel-title" tabIndex={-1}>
          실시간 인생 기록
        </h2>
        <button
          id="btn-open-full-chronicle"
          type="button"
          className="btn-ghost"
          onClick={onOpenFullChronicle}
        >
          전체 기록 몰아보기 (<span id="recent-log-total">{logs.length}건</span>)
        </button>
      </div>

      <ul
        id="recent-log-list"
        className="log-list recent-only"
        aria-labelledby="recent-chronicle-heading"
      >
        {recent.map((item, idx) => (
          <li key={getStableKey(item, idx)} className={`log-item ${item.kind}`}>
            <div className="log-head">
              <span>
                {item.year}, {item.age}세
                {item.badge ? (
                  <>
                    {" "}
                    <span className="log-badge">{item.badge}</span>
                  </>
                ) : null}
              </span>
              {item.meta ? (
                <span>
                  d100 {item.meta.roll}/{item.meta.target} {formatRollOutcomeLabel(item.meta)}
                </span>
              ) : null}
            </div>
            <div>{item.text}</div>
            {item.deltaText ? <div className="log-delta">{item.deltaText}</div> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
