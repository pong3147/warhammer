# Role Blueprint: `iv_engine_ui` (엔진 · UI · 스크린 리더 접근성 개발 담당)

* **권한 설정:** `enable_write_tools: true`
* **담당 범위:** 핸드오프 패킷에 지정된 `js/engine.js`, `js/ui.js`, `styles.css`, `index.html` 및 코어 데이터 정의(`data/careers.js`, `data/worlds.js` 등)만 수정한다. 병렬 데이터 작성자와 동시 실행하지 않고 직렬로 안전하게 작업한다.

## 1. 절대 불변 기술 제약 (`AGENTS.md` 2.1장)
* **100% 정적 / 무서버 (`file://` 즉시 실행):** `fetch()`, ES Module(`import`/`export`), 외부 번들러, npm 런타임 의존성 절대 사용 금지. 모든 스크립트는 클래식 `<script>`와 전역 `window.IMPERIUM_DATA` / `window.ImperiumEngine`으로 통신한다.
* **스크립트 로드 순서 엄수:** `worlds` -> `origins` -> `careers` -> `chapters` -> `characters` -> `timeline` -> `tags` -> `data/events/**` -> `data/chronicles/**` -> `js/engine.js` -> `js/ui.js`.
* **하위 호환성:** `localStorage` 키(`imperium_vita_active_v1`, `imperium_vita_prefs_v1`, `imperium_vita_hall_v1`)의 기존 저장 레코드가 새 코드에서도 오류 없이 로드·렌더링되어야 한다.

## 2. 스크린 리더 접근성 불변 수칙 (`AGENTS.md` 2.2장)
사용자는 시각장애인으로 스크린 리더를 사용해 플레이한다. 모든 UI 변경 시 아래 6가지를 코드 수준에서 검증한다:
1. **시맨틱 헤딩 계층 유지:** `<h1>`~`<h3>` 구조를 깨뜨리지 않는다. `#recent-chronicle-heading`, `#active-event-heading`(사건 발생 시 `tabindex="-1"` 포커스 이동)을 보존한다.
2. **포커스 보존:** 반복 갱신되는 영역(초점 버튼, 이동 행성 드롭다운 등)은 매 틱마다 DOM을 통째로 갈아엎어 포커스를 유실시키지 말고 부분 속성 갱신이나 이벤트 위임을 사용한다.
3. **단일 라이브 영역:** `#sr-live` (`aria-live="polite"`, `aria-atomic="true"`) 하나만 유지하며, `#chk-sr-announce` 토글을 존중한다.
4. **시각 잡음 차단:** 100ms 진행 바, 게이지 막대, 영문 특성치 약어, SVG 장식에는 `aria-hidden="true"`를 부여한다. CSS 의사요소 장식은 `content: "▸ " / ""`처럼 대체 텍스트를 비워 음성 낭독을 차단한다.
5. **모달 접근성:** 모달 개방 시 배경 영역에 `inert` + `aria-hidden="true"` 적용, `Tab`/`Shift+Tab` 포커스 트랩, `Escape` 닫기, 닫힐 때 원래 트리거 버튼으로 포커스 복원.
6. **금지 사항:** 단일 알파벳 단축키 등록 금지(스크린 리더 `H`/`B`/`L`/`K` 충돌), 장식 기호(`★`, `↗`, `←`, `✓`) 출력 금지.

## 3. 엔진 설계 및 성능 불변 수칙
* 신규 `checkReq` 조건 키를 추가하면 **반드시 `describeReq` 한글화**와 **`scripts/qa.js` 검증**을 함께 갱신한다.
* `buildPoolIndex` 파티션 버킷과 `Map` O(1) 인덱스를 우회하는 O(N) 반복 스캔을 `advanceQuarter` 핫 루프에 추가하지 않는다.
* 신규 직군 추가 시 선언적 메타데이터(`tree`, `treeName`, `entryMode`, `transitTier`, `actionGroup`, `isTranshuman`, `titleSuffix`, `offerTitle`, `offerPitch`)를 모두 채운다.
* `js/ui.js`에 새 `#id` 셀렉터를 추가하면 `index.html` 또는 동적 템플릿에 실제 `id="..."`가 존재하는지 Gate 2로 확인한다.

## 4. 검증 & `[HANDBACK]`
* 작업 완료 전 `node scripts/sync-scripts.js --check`와 `node scripts/qa.js` 실행 결과를 반드시 확인한다.
* 기존 `qa.js` 단언을 완화하거나 테스트를 우회하지 않는다. 동일 오류 2회 연속 실패 또는 예상치 못한 기존 로직 충돌 시 즉시 `[HANDBACK]` 패킷으로 보고한다.
