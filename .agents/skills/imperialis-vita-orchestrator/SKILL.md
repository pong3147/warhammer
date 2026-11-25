---
name: imperialis-vita-orchestrator
description: 'Project-specific orchestrator for 1 / QUADRILLION : IMPERIALIS VITA (pong3147/warhammer). Routes work by L1-L4 complexity across hybrid parallel data authoring and 2-Phase closed-loop engineering, enforces hard read-only gating for auditors, structured handoff/handback packets, circuit breakers, 6-gate QA, and 2-tier post-stage Red-Team holistic review.'
---
# Imperialis Vita Orchestrator (Warhammer 40k 전용 오케스트레이터)

본 스킬은 `1 / QUADRILLION : IMPERIALIS VITA` (`pong3147/warhammer`) 저장소 전용 실행 오케스트레이터다.
불변 규칙·접근성·표기표·연대기 정본은 항상 워크스페이스의 `AGENTS.md`를 참조하고, 현재 수록 건수와 단계별 로드맵은 `PROJECT_GUIDE.md`를 기준으로 삼는다. (`AGENTS.md`의 표를 중복 복사하지 않고 조항 번호로 인용한다.)

---

## 1. 난이도별 4단계 라우팅 (`L1` ~ `L4`)

요청을 받으면 먼저 작업 범위를 `L1`~`L4`로 분류한다. 사소한 작업에 과잉 계획이나 서브에이전트를 띄우지 않는다.

| 등급 | 대상 작업 예시 | 실행 모드 | 서브에이전트 편성 | 최종 감사(`FINAL_AUDIT` + `POST_STAGE_REDTEAM`) |
| :--- | :--- | :--- | :--- | :--- |
| **`L1`** | 질문 답변, 단일 오타·표기 수정, 1~2줄 패치 | 메인 즉시 처리 (서브에이전트 생략) | 없음 | 생략 (필요 시 `node scripts/qa.js`만 실행) |
| **`L2`** | 단일 파일 버그 수정, 소규모 사건/연대기 추가(1~10건), 단일 UI 개선 | 직렬 2-Phase (조사 -> 1-Shot 명세 -> 구현 -> 검증) | 메인이 직접 수행하거나 `iv_data_writer` / `iv_engine_ui` 1명 위임 | `node scripts/qa.js` 0오류 1-Shot 완료 시 생략; 실행 중 1회 이상 오류 발생 시 필수 |
| **`L3`** | 대규모 서사·연대기 확충 (20건+ 추가, 1:1 파일 승격) | **병렬 집필 + 독립 교차 감사 + 2단 레드팀 종합 검수** | 메인(공유 파일 단독 소유) + `iv_data_writer` 3~5명 병렬 + `iv_lore_auditor`(읽기 전용) + `iv_prose_a11y_critic`(읽기 전용) + `iv_redteam_reviewer`(읽기 전용) | **필수** (`sync-scripts` + `qa.js --deep` + 감사관 2종 0결함 + `audit-health.js` + 레드팀 4단 리포트) |
| **`L4`** | 엔진·UI 대개편, 성향 시스템, 신규 세력/행성/역사·네임드 추가 (16.5·17·18단계 등) | **선행 조사 -> 사용자 확정 -> 코어 직렬 고정 -> 콘텐츠 병렬 집필 -> 정밀 감사 -> 2단 레드팀 종합 검수** | `iv_lore_auditor` 선행 브리프 -> 필요 시 `AWAITING_USER` 설계 확정 -> `iv_engine_ui` 또는 메인 코어 직렬 구현 -> `iv_data_writer` 병렬 집필 -> 감사관 2종 + `iv_qa_balance` + `iv_redteam_reviewer` | **필수** (`sync-scripts` + `qa.js --deep` + 신규 전 항목 도달성 100% + `audit-health.js` + 레드팀 4단 리포트 + 메인 취사선택 소견 보고) |

---

## 2. 5대 핵심 제어 안전장치

### 안전장치 1: 공유 파일 단일 소유권 (파일 충돌 원천 차단)
* 병렬 실행 중 아래 **공유 파일은 메인 오케스트레이터 1명만 단독으로 수정**한다. 서브에이전트에게 절대 동시 편집을 맡기지 않는다:
  * `data/tags.js`, `data/careers.js`, `data/worlds.js`, `data/origins.js`, `data/chapters.js`, `data/characters.js`, `data/timeline.js`
  * `js/engine.js`, `js/ui.js`, `styles.css`, `index.html`, `PROJECT_GUIDE.md`, `README.md`, `AGENTS.md`
* 병렬 작성 서브에이전트(`iv_data_writer`)에게는 **서로 겹치지 않는 독립 데이터 파일**(`data/events/**`, `data/chronicles/**`)과 **고유 ID 접두사**(`ev_s165_*`, `ev_s17_*`, `ch_s165_*` 등)만 배타적으로 할당한다.
* 신규 태그가 필요하면 메인 오케스트레이터가 병렬 실행 **전에** `data/tags.js`에 먼저 등록하거나, 작성자가 반환한 `needed_tags` 목록을 메인이 일괄 통합 등록한다.

### 안전장치 2: 물리적 권한 분리 (`Hard Tool Gating`)
* 서브에이전트는 아래 역할 테이블에 따라 `define_subagent`의 `enable_write_tools`를 엄격히 분리한다.
* `iv_lore_auditor`, `iv_prose_a11y_critic`, `iv_redteam_reviewer`, `iv_coverage_planner`는 반드시 **`enable_write_tools: false`**로 정의해 파일 수정 자체를 물리적으로 차단한다. 감사관·리뷰어·공백 분석가는 리포트만 반환하고, 수정과 채택 판단은 메인 오케스트레이터와 사용자가 수행한다.
* 모델 선택은 항상 `Model: "inherit"`를 유지한다(사용자가 명시적으로 티어 변경을 요청한 경우 제외).

### 안전장치 3: 구조화된 5필드 핸드오프 패킷 (서브에이전트 호출 규격)
서브에이전트를 호출할 때 모호한 지시("적절히 보강하라")를 금지한다. 프롬프트에 아래 5개 블록을 반드시 명시한다:
1. **`target_files`:** 생성·수정 가능한 배타적 파일 경로 목록 (이 외 파일 수정 금지).
2. **`id_prefix_and_refs`:** 사용할 ID 접두사, 사용 가능한 정확한 `careerId`/`worldId`/`chapterId`/`tag` 목록(코드에서 직접 확인된 ID만 기재).
3. **`instructions`:** 목표 건수, 핵심 서사 축, 가중치/우선순위, 적용할 `AGENTS.md` 조항(4장 상황 정합성, 5장 표기·연대기, 2.2장 장식 기호 금지).
4. **`verification_commands`:** 작업 완료 전 서브에이전트가 직접 실행해야 할 구문·정합성 점검 명령 (예: `node -e "new (require('vm').Script)(require('fs').readFileSync('...','utf8'))"`).
5. **`replan_conditions`:** 임의로 우회하지 말고 즉시 `[HANDBACK]`해야 하는 조건 최소 2개 (예: 명세에 없는 ID/태그 필요, 동일 오류 2회 연속 실패, 대상 파일이 110KB/70KB 용량 상한 초과).

### 안전장치 4: 조용한 우회 금지 & 2회 실패 `[HANDBACK]` 규약
* 어떤 서브에이전트도 테스트나 QA를 통과시키기 위해 요구된 조건(`anyPastCareers`, `excludeWorlds`, `check` 난이도 등)을 몰래 삭제·완화하거나 `qa.js` 검증 로직을 약화해서는 안 된다.
* 경미한 오타·문법 오류 1회는 자가 수정 후 재시도한다.
* **동일 검증 2회 연속 실패** 또는 **가정 불일치(`ASSUMPTION_VIOLATED`)** 발생 시 즉시 중단하고 아래 `[HANDBACK]` 패킷으로 메인에 보고한다:
  * `reason_code`: `ASSUMPTION_VIOLATED` | `VERIFICATION_FAILED` | `DESIGN_DECISION_NEEDED` | `REPLAN_CONDITION_MET` | `FILE_SIZE_LIMIT`
  * `issue_summary`: 막힌 원인과 발견한 불일치 요약
  * `completed_steps` / `remaining_steps`: 완료 항목과 잔여 항목
  * `evidence_logs`: 실제 오류 메시지 또는 확인한 파일 줄 번호
  * `proposed_options`: 결정 자체를 내리지 말고 메인에 선택지만 제시

### 안전장치 5: 회로 차단기 (`Circuit Breaker`)
* 동일한 결함이나 검증 실패로 재계획·재실행이 **연속 3회**에 도달하면 추가 토큰을 소모하지 않고 즉시 루프를 멈춘다.
* `AWAITING_USER` 상태로 전환해 지금까지 시도한 해법 3가지, 실측 에러 로그, 차단 원인을 사용자에게 보고하고 결정을 요청한다.

---

## 3. 역할별 서브에이전트 카탈로그 (`references/` 점진적 로딩)

작업에 필요한 역할만 `get_skill_resources`로 불러와 해당 내용을 `define_subagent`의 `system_prompt` 기반으로 사용한다.

| 역할명 (`define_subagent` 이름) | 리소스 파일 | `enable_write_tools` | 주 용도 |
| :--- | :--- | :---: | :--- |
| `iv_data_writer` | `references/role-data-writer.md` | `true` | `data/events/**`, `data/chronicles/**` 병렬 집필 및 1:1 파일 승격 |
| `iv_engine_ui` | `references/role-engine-ui.md` | `true` | `js/engine.js`, `js/ui.js`, `styles.css`, `index.html` 개발 및 접근성 보강 |
| `iv_lore_auditor` | `references/role-lore-auditor.md` | `false` | 워해머 40k 고증, 연대기, 나무위키 표준 표기, Lexicanum 웹 검색 팩트체크 |
| `iv_prose_a11y_critic` | `references/role-prose-a11y-critic.md` | `false` | 한국어 조사 호응, 신분·크리그 정합성, 플롯 중복, 스크린 리더 청취 UX 감사 |
| `iv_qa_balance` | `references/role-qa-balance.md` | `true` | `scripts/qa.js`·`scripts/audit-health.js` 유지·확장, 합성 도달성 검증, 몬테카를로 밸런스 감사 |
| `iv_redteam_reviewer` | `references/role-redteam-reviewer.md` | `false` | `L3`/`L4` 단계 완료 시 전체 시스템·런타임 UX·청취 리듬·저장/복원·다음 단계 리스크 적대적 종합 검수 |
| `iv_coverage_planner` | `references/role-coverage-planner.md` | `false` | **[온디맨드 기획 전용]** `scripts/coverage-report.js` 기반 직군·행성·연령대·서사 편식 공백 진단 및 다음 확장 후보 브리프 (매 단계 강제 호출 금지) |

---

## 4. `L3` / `L4` 단계 실행 및 마감 프로토콜

1. **착수 전 동기화:** `PROJECT_GUIDE.md`에서 현재 단계 목표와 직전 실적을 확인한다. 신규 다단계 계획이라면 구현 전에 `PROJECT_GUIDE.md`에 먼저 기록한다(`AGENTS.md` 1장).
2. **코어·태그 선행 확정 (메인 단독):** 신규 직군·행성·태그·엔진 조건 키가 필요하면 메인이 먼저 코어 파일(`data/tags.js`, `data/careers.js`, `js/engine.js` 등)을 확정하고 `node scripts/qa.js`로 베이스라인 0오류를 확인한다.
3. **병렬 집필 (`iv_data_writer`):** 5필드 핸드오프 패킷으로 파일 소유권이 겹치지 않게 동시 실행한다. `[HANDBACK]`이 오면 이전 실패를 반복 지시하지 말고 수정된 잔여 계획으로 재지시한다(최대 3회 회로 차단기).
4. **1차 통합 및 자동 게이트:**
   * `node scripts/sync-scripts.js` 실행해 `index.html` 동기화.
   * `node scripts/qa.js --deep` 실행해 7대 게이트(기본 6대 + `anyPastCareers` 정적 모순 + 전수 합성 도달성 + 대규모 밸런스 분포) 확인.
5. **독립 교차 감사 (`FINAL_AUDIT`):**
   * `git diff --stat`과 신규/수정 파일 목록을 `iv_lore_auditor`와 `iv_prose_a11y_critic`(둘 다 읽기 전용)에게 병렬 전달한다.
   * 두 감사관이 보고한 `P0`/`P1` 결함을 메인 또는 작성자가 전량 수정한다.
6. **2단 레드팀 종합 검수 (`POST_STAGE_REDTEAM` — `L3`/`L4` 필수, `L1`/`L2` 생략):**
   * **1단 (기계적 퍼징·헬스 체크):** `node scripts/audit-health.js`를 실행해 200생애 무작위 플레이·세이브/마이그레이션 왕복 퍼징, 초장수 명예 마감 탈출성, UI 포커스 정적 위험, 파일 용량 근접 경고를 수집한다.
   * **2단 (읽기 전용 레드팀 리뷰어):** `iv_redteam_reviewer`(`enable_write_tools: false`)에게 `audit-health.js` 원시 출력, `git diff --stat`, 코어 파일(`js/engine.js`, `js/ui.js`, `index.html`, `scripts/qa.js`, `PROJECT_GUIDE.md`)을 전달해 4단 압축 보고서를 수령한다.
   * **주체성 게이트:** 명백한 `P0` 결함(크래시·포커스 유실·저장 손상·소프트락)은 즉시 수정하고 재검증한다. 반면 개선 아이디어나 `P2` 제안은 메인 오케스트레이터가 프로젝트 철학·로드맵 기준으로 옥석을 가린 소견을 덧붙여 사용자에게 보고하고, 사용자가 채택한 항목만 후속 반영한다(무단 범위 확장 금지).
7. **최종 재검증 및 문서·Git 마감:**
   * `node scripts/sync-scripts.js --check && node scripts/qa.js --deep && node scripts/audit-health.js` 0오류·0경고 최종 확인.
   * `PROJECT_GUIDE.md`의 디렉토리 수록 건수, 단계 `[완료]` 상태, 실제 추가 건수, QA 실측 결과, 누적 달성률을 갱신한다(`README.md` 총 수록 건수도 필요 시 동기화).
   * 변경 내역을 확인(`git status`, `git diff --stat`)한 뒤 명확한 커밋 메시지로 커밋하고 `origin/main`에 푸시하며, 사용자 최종 보고에 레드팀 검수 요약 + 메인 취사선택 소견을 함께 첨부한다.
