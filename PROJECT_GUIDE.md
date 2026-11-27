# 1 / QUADRILLION : IMPERIALIS VITA — 프로젝트 아키텍처 · 수록 현황 · 진행 보고서

> 본 문서는 프로젝트의 기획 의도, 디렉토리 구조, 파일별 콘텐츠 수록 현황, 게임 시스템·엔진 스키마 레퍼런스, 그리고 **서사 보강 로드맵 및 단계별 완료 보고서**를 기록하는 현황 기준 문서다.
> AI 에이전트가 준수해야 할 불변 규칙, 스크린 리더 접근성 원칙, 서사 보강 5대 작업 방향, 나무위키 번역명 기준표, 사실관계 고증 기준 및 QA 게이트는 [`AGENTS.md`](./AGENTS.md)를 정본으로 삼는다.

---

## 1. 프로젝트 개요 및 기획 의도

* **작품명:** `1 / QUADRILLION : IMPERIALIS VITA` (인류제국 생존 시뮬레이터)
* **장르:** 무작위 출생·생애 연대기 텍스트 시뮬레이션 웹 게임 · 워해머 40k 개념 사전 · 정적 제국 코덱스 (Unofficial Fan Project)
* **기술 스택 및 배포:** **Astro 7 (SSG · Rust 컴파일러 · Vite 8/Rolldown) + React 19 (Islands Architecture) + 표준 ESM + Vitest 5** · GitHub Actions 자동 검증 후 Public GitHub Pages(`https://pong3147.github.io/warhammer/`, `base: "/warhammer"`) 정적 배포
* **핵심 영감 및 설계 철학:**
  1. **《80억 분의 1》의 감상 경험 + 워해머 40k TRPG 메커니즘:** 무작위로 인류제국 100만 행성 중 한 곳에 태어나 흘러가는 생애 기록을 감상하되, 일자 진행에 그치지 않고 *Dark Heresy* / *Imperium Maledictum* 기반 **8대 특성치(d100 판정)**와 연간 **삶의 초점(Focus)** 관리로 숨겨진 분기·직군·역사 사건을 해금한다. 기본 1배속 `1년 = 60초`(분기당 20.0초)부터 **16배속(`1년 = 3.75초`)**까지 5단계 배속을 지원한다.
  2. **선택지 원툴 탈피 — 연대기 중심 몰입:** 선택지 분기 사건(777종, 역사 대사건 29종 포함 · 마키 및 특이점/후천 특성 다수 `critSuccess`/`critFail` 극단 판정 분기 지원)뿐 아니라, 인류제국 특유의 인간 경시·관료제 부조리·행성 풍토·계급별·3대 도덕 성향(`자비·교조·암흑`)·28인 네임드·M41~M42 거시 전쟁 일상·트레이드오프/상황 마모를 담은 **패시브 연대기 로그(892종)**가 본인 신분·생활권·신체 분류에 정확히 맞춰 흘러가며 읽는 재미를 제공한다.
  3. **워해머 입문자 배려 + 정적 지식 베이스 + 설정 고증 조화:** 8대 카테고리 **48종 워해머 40k 개념 사전(`/glossary/`)**과 **5대 정적 제국 코덱스(`/codex/**`)**를 빌드 타임 SSG로 분리 제공(2MB급 서사 번들 0KB 격리)하며, 21개 세력 **91종 풀 계급도(테라의 하이 로드 12석 완비)** 중 우측 `자율 선택` 패널에는 **지금 즉시 진입 가능한 일반·승급 직군(`entryMode: "open"`, 입단 심사·정규 서약 기관 소속 고정 적용)**만 노출하고, 상위 계급·타 기관 특별 초빙(스카우트)·공훈 횡단(행성 총독/로그 트레이더/심문관)·최고위 추대(하이 로드 12석/워마스터/챕터 마스터/살아 있는 성인/데몬 프린스)는 조건 달성 시 **동적 발탁·임명 이벤트**로 자연스럽게 제안한다.
  4. **IP 안전 원칙 (비공식 팬 창작물):** Games Workshop의 공식 아트워크·로고·룰북 원문 복사 없이 자체 작성한 한국어 산문과 순수 CSS/SVG 기하학 그래픽으로만 구성하며, 모든 데이터·개념 사전에 Lexicanum·공식 코덱스·소설 출처 표기를 병기한다.

---

## 2. 전체 디렉토리 구조 및 모듈 · 번들 구성

```text
warhammer/
├── astro.config.mjs                  # Astro 7 SSG 설정 (site/base: "/warhammer", compressHTML: true, React 아일랜드, Vite chunkLimit 2500kB)
├── package.json                      # 의존성(Astro 7, React 19, Vitest 5, RTL, Node >=22.23.4) 및 verify/qa/audit/typecheck/test/build 스크립트
├── tsconfig.json · vitest.config.ts  # TypeScript(vitest/globals + astro/client) · jsdom Vitest 테스트 설정
├── README.md                         # 사용자용 실행·GitHub Pages 배포·개요 안내서
├── AGENTS.md                         # AI 에이전트 작업 방향 · 불변 규칙 · 고증/표기 표준 · QA 게이트
├── PROJECT_GUIDE.md                  # (본 문서) 아키텍처 · 파일별 수록 현황 · 스키마 · 진행 보고서
├── .github/workflows/
│   ├── qa.yml                        # PR·수동 자동 검증 (qa.mjs + audit-health.mjs --lives=100 + typecheck + npm test + astro build + qa:dist)
│   └── deploy.yml                    # main 브랜치 자동 검증 + GitHub Pages 정적 배포
├── scripts/
│   ├── _loadNodeData.mjs             # Node.js용 ESM 데이터·엔진 공통 로더 (fileURLToPath 크로스플랫폼 ROOT + 0건 로드 즉시 실패 가드)
│   ├── qa.mjs                        # 상설 자동 QA 검증 스위트 (7대 게이트 + Gate 1 전 파일 110KB 통일 + Gate 2 스포트라이트/임포트 격리 + Gate 4G/4P + 데드 필드 차단·성인 크리그 사건·Stage 17~20A 불변식 + Gate 7A careerRules SSOT + --deep 1,500생애 감사)
│   ├── qa/                           # QA 게이트 분리 모듈 2종 (`distGate.mjs` Gate 8 분할 엔진 6모듈 격리 · `personaGate.mjs` Gate 4P 17페르소나+선택지/타행성 사건 스캔)
│   ├── audit-health.mjs              # 200생애 결정론적 퍼징 · 청취 리듬/스포트라이트 재조우·previouslyMetCharacters 계약/17~18단계 최고위 프로브 · 저장 크기·초인 오염 면역·명예 마감·전 파일 110KB 통일 용량 감시
│   └── coverage-report.mjs           # 직군·행성·챕터·연령대·성향·네임드·시대(`endYear` 반영) 7축 콘텐츠 밀도 매트릭스
├── tests/
│   ├── setup.ts                      # Testing Library jest-dom 셋업
│   └── game-a11y.test.tsx            # 행동형 스크린 리더 접근성·포커스·1~16배속·개념 사전·Stage 19-S2/M1/M2/A/B/C/D1 스포트라이트·Stage 20-A `critSuccess`/`critFail`·`#sr-live` 판정 안내·`migrateState` 방어 Vitest 스위트 (19개 테스트)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro          # 공통 HTML 셸 · 병렬 웹폰트 · 스킵 링크 · 상단 내비게이션(4대 메뉴) · 푸터
    ├── pages/                        # 9개 정적 SSG 라우트 (정적 도감·사전은 narrative.js 0KB 격리)
    │   ├── index.astro               # 생애 시뮬레이션 메인 (GameApp client:load)
    │   ├── glossary/index.astro      # 워해머 40k 개념 사전 48종 정적 페이지 (GlossaryExplorer client:load)
    │   ├── hall/index.astro          # 영혼의 전당 · 91종 누적 도감 · JSON 백업 (HallOfSoulsApp client:load)
    │   └── codex/
    │       ├── index.astro           # 제국 코덱스 개요 (0KB JS 순수 정적 HTML)
    │       ├── worlds.astro          # 23개 행성 · 5대 성역 도감
    │       ├── careers.astro         # 21개 세력 91종 계급도 도감
    │       ├── chapters.astro        # 9대 아스타르테스 챕터 도감
    │       ├── timeline.astro        # M41~M42 29대 역사 연표 도감
    │       └── characters.astro      # 28인 네임드 인물 도감
    ├── components/
    │   ├── game/                     # 생애 시뮬레이션 React 아일랜드 11모듈 (GameApp, StartScreen, TimeControlPanel, YearProgressBar, DossierPanel, FocusGrid, ActiveEventPanel, RecentChronicleList, FullChronicleView, AutonomousPanel, ObituaryModal, types.ts)
    │   ├── glossary/GlossaryExplorer.tsx  # 개념 사전 카테고리·키워드 필터 + 디바운스 #sr-live + 해시 헤딩 포커스
    │   ├── codex/                    # CodexSubnav.astro + CodexExplorer.tsx (5대 도감 필터·아코디언·해시 포커스)
    │   └── hall/HallOfSoulsApp.tsx   # 영혼의 전당 · 91종 직군 수집 현황 · 2단계 초기화 · JSON 백업/복원
    ├── lib/
    │   ├── codexMeta.ts              # 21개 세력 TREE_ORDER · groupCareersByTree · CODEX_COUNTS 단일 정본
    │   ├── contextualGlossary.js     # 좌측 인물 상태 패널용 경량 상황별 개념 사전 매핑 (31종 · 21세력 완비)
    │   ├── links.ts                  # GitHub Pages base("/warhammer") 안전 경로 헬퍼
    │   ├── storage.ts                # localStorage 3키 하위 호환 저장/복원/JSON 백업 + 지연 narrative 런타임 로더(재시도 가능)
    │   └── chronicleText.ts          # 순수 텍스트 생애 기록서 생성·복사·.txt 다운로드
    ├── styles/
    │   ├── global.css                # 고딕 데이터슬레이트 테마 · 3대 성향 게이지 · 고대비 포커스 링 · 반응형 그리드
    │   └── astro-pages.css           # 정적 페이지(개념 사전 · 코덱스 · 영혼의 전당 · 상단 내비) 전용 스타일
    ├── engine/                       # 시뮬레이션 엔진 ESM 8모듈 (전 파일 < 72KB / < 1,800줄)
    │   ├── formatters.js             # 경량 공통 포매터 · 메타 상수 · 3대 계층 축 · resolveFactionEndingKey · describeReq (SSOT · 코덱스/전당용)
    │   ├── statCaps.js               # 종족·계급·전공·23모성·12재능·12후천특성 이중 스탯 상한 & ACQUIRED_TRAIT_EFFECTS SSOT (Stage 21)
    │   ├── reqEvaluator.js           # 파티션 버킷 인덱싱(`buildPoolIndex`) · 3대 계층 산출 · `makeReqContext` · `checkReq` (무순환 분리)
    │   ├── createEngine.js           # 코어 시뮬레이션 엔진 팩토리 (createImperiumEngine · d100 판정 · 선택적 `critSuccess`/`critFail` 분기 · `removeTags` · `migrateState` · 진행 루프)
    │   ├── careerRules.js            # 직군 서약 격리 · 입단 심사 · 동적 발탁/스카우트 · 수동 전직 · 챕터/템플 서약 (엔진·QA Gate 7A SSOT)
    │   ├── careerActions.js          # 91종 직군 고유 자율 행동 · 리주버냇 · 기계교 의체 · 정화 고행(부정 특성 치유 연동) · 행동 실행
    │   ├── endings.js                # 명예 마감 · 상태 요약 · 동적 추모 에필로그 · 부고 등급 판정 · 사망 처리
    │   └── travel.js                 # 성간 이동 · 행성 출입 자격 매트릭스 · 파견/순례/워프 항해 이상 동적 이벤트
    └── data/
        ├── index.js                  # 전체 데이터 조합 진입점 (CORE_DATA + NARRATIVE_DATA)
        ├── narrative.js              # import.meta.glob 기반 사건(55파일)·연대기(20파일) 비동기 청크 진입점
        ├── glossary.js               # 워해머 40k 주요 개념 사전 (8대 카테고리 · 48종 핵심 용어)
        ├── core/                     # 코어 메타데이터 ESM 15파일 (index.js + worlds/origins/chapters/characters/tags + careers.js 배럴 + careers/{civil_militarum,faith_shadow,transhuman_chaos,specialist_factions}.js + timeline.js 배럴 + timeline/{m41_early,m41_late,m42_indomitus}.js)
        ├── events/                   # 분기 사건 748종 — 도메인(세력·챕터·권역·주제)별 55개 ESM 파일
        │   ├── careers/              # 직군 계열·1:1 승격 19파일 (+`mid_ranks_s20.js`)
        │   ├── chapters/             # 9대 챕터 1:1 승격 9파일 + 합동 공조 1파일 = 10파일
        │   ├── worlds/               # 행성 1:1 승격 4파일 + 권역 5파일 = 9파일 (+`generic_deep.js`)
        │   └── themes/               # 횡단 주제별 17파일 (+`anomalies_s21.js`, `acquired_traits_s21.js`)
        └── chronicles/               # 일상 연대기 892종 — 주제별 20개 ESM 파일 (+`wear_tradeoff.js`, `anomalies_s21.js`)
```

**모듈 로딩 및 번들 분리 구조:**
1. **정적 SSG 페이지 (`/codex/`, `/codex/*`, `/glossary/`, `/hall/`):** `src/data/core/index.js`, `src/engine/formatters.js`, `src/data/glossary.js`만 참조하며, 2MB급 사건·연대기 청크(`narrative.js`)와 시뮬레이션 엔진(`createEngine.js`)을 초기 번들에서 완전 격리한다(`/codex/` 개요는 클라이언트 JS `0KB`, `/hall/` 백업 기능만 `createEngine.js` 클릭 시 지연 로드).
2. **생애 시뮬레이션 (`/`):** `CORE_DATA`로 시작 화면과 저장본 이어하기 배너를 즉시 렌더링하고, `src/data/narrative.js`를 백그라운드 비동기 청크(`import()`)로 지연 로드한다. 67KB 개념 사전 산문(`glossary.js`)은 로드하지 않고 2KB 매핑(`contextualGlossary.js`)만 사용해 좌측 인물 상태 패널 하단에 고정 1~2개 새 탭 링크를 제공한다.
3. **자동 인식 및 Gate 8 격리 검증:** `src/data/events/**/*.js`와 `src/data/chronicles/**/*.js`에 `export default [...]` 파일을 추가하면 Vite `import.meta.glob`과 `scripts/_loadNodeData.mjs`가 자동 수집하며, 빌드 후 `node scripts/qa.mjs --only-dist`(Gate 8)가 번들 격리와 SSR 카드 수량을 자동 검증한다.

---

## 3. 파일별 역할 및 현재 수록 현황

### 3.1 프론트엔드 코어 · 테스트 · 자동화 스크립트
* **`src/layouts/BaseLayout.astro` & `src/pages/**` (9개 정적 라우트):**
  * Google Fonts(`Cinzel`, `Noto Serif KR`, `JetBrains Mono`) `<link rel="preconnect">` 병렬 로드 (`display=swap`), `본문으로 건너뛰기` 스킵 링크, 4대 상단 내비게이션(`생애 시뮬레이션`, `워해머 개념 사전`, `제국 코덱스`, `영혼의 전당`).
  * 각 페이지 셸마다 단일 라이브 영역(`#sr-live`, `aria-live="polite"`, `aria-atomic="true"`) 1개만 유지한다.
* **`src/components/game/**` (React 19 아일랜드 11모듈):**
  * `GameApp.tsx`: `localStorage` 3중 저장(`imperium_vita_active_v1`, `imperium_vita_hall_v1`, `imperium_vita_prefs_v1` 기존 키 100% 하위 호환), 페이지 이탈·내비게이션 시 자동 일시정지·저장, `handleChooseEvent` 시 `#sr-live` 압축 판정 라벨·수치(`대성공(3/58). `) 선행 안내, `현재 상태 요약 듣기`, `다음 사건까지 진행`, 전체 인생 기록서 뷰 전환.
  * `DossierPanel.tsx`: 좌측 인물 상태 패널 · 3대 게이지 · 3대 도덕 성향 · 8대 특성치(`현재 / 상한`) · 모성 특전/선천 재능/후천 특성 1줄 효과 목록(`#trait-perks-list`) · 이력 태그 + 하단 고정 단일 구역(`#dossier-glossary`)에 현재 세력·출신·자질·체류 행성에 맞춘 개념 사전 새 탭 링크 1~2개 제공(사건·직군 카드 내부 링크 0건 유지).
  * `TimeControlPanel.tsx` & `YearProgressBar.tsx`: **1배속(60초/년 · 분기당 20.0초) ~ 2배속(30초) · 4배속(15초) · 8배속(7.5초) · 16배속(3.75초 · 분기당 1.25초)** 5단계 배속과 `performance.now()` 기반 50ms 고정밀 진행 바(`aria-hidden="true"`), 새 탭 개념 사전·코덱스 빠른 링크.
  * `AutonomousPanel.tsx`: React 안정 키 기반 DOM 보존 + 버튼 순서 변동·비활성 전환·소진 시 포커스 안전 복원(`:not(:disabled)` 탐색 및 `#heading-auto` 폴백), 14~18세 귀족·스콜라 수습 안내, 비치명적 입단 심사(`40~88%`)·선발 시련 성공률/위험 안내, 2년 최소 복무·재지원 대기 표시, 21개 세력 트리 그룹화, 성간 이동 출입 자격·강제 파견 잠금·승인율 표기.
  * `ActiveEventPanel.tsx` & `ObituaryModal.tsx`: 사건 발생 시 `#active-event-heading`(`tabindex="-1"`) 포커스 이동, `computeCheckPreview` SSOT 기반 실시간 최종 성공률·상황 보정·90% 상한 및 `대성공`/`대실패`·후천 특성 획득/치유 사전 예고 표기, 네임드 스포트라이트 `<details key=... open={!isRepeatEncounter} class="named-spotlight">`(초회·부분초회 전개 / 재조우 기본 접힘, 시각용 `.ev-badge.character` `aria-hidden="true"` 및 `<details>` 중복 `aria-label` 제거로 3중·이중 낭독 차단), 부고 모달 배경 및 `.skip-link` `inert` 처리 + `Tab`/`Shift+Tab` 트랩 + `Escape` 닫기·포커스 복원.
* **`src/styles/global.css` (~1,883줄) & `src/styles/astro-pages.css` (~347줄):**
  * 황동·검정·진홍·코지테이터 녹색의 제국 데이터슬레이트 테마, `.sr-only`, 고대비 금색 `:focus-visible` 포커스 링, 3대 도덕 성향 3분할 비율 막대(`.align-tri-bar`)·사건 성향 배지(`.ev-badge.align-*`), `.dossier-glossary` 고정 개념 링크, `.trait-perks-list` 모성·재능·후천 특성 카드, 순수 CSS border 꺾쇠(`.named-spotlight-summary::after`) 및 `prefers-reduced-motion` `.named-spotlight[open]` 복구, `.sanctum-hero::before` 빈 대체 텍스트(`/ ""`), 개념 사전·코덱스 카드 및 반응형 그리드.
* **`src/engine/**` (8개 ESM 모듈 · 전 파일 `< 72KB / < 1,800줄`):**
  * **경량 공통 포매터(`formatters.js` ~657줄 · `23.7KB`):** `SAVE_VERSION = 4`, `ALIGNMENT_KEYS`·`ALIGNMENT_META`, **3대 계층 축(`SOCIAL_TIER_ORDER`, `LIFE_REALM_KEYS`, `BODY_CLASS_KEYS` 및 `computeSocialTier`/`computeLifeRealm`/`computeBodyClass`)**, **명예 마감·부고 공용 세력 분기(`FACTION_ENDING_KEYS`, `resolveFactionEndingKey(state, career)`)**, `STAT_META`, `FOCUSES`, `QUARTER_LABELS`, `formatImperialYear`/`Date`, `formatRollOutcomeLabel`, `getWorldShortTag`, `normalizeAlignment`/`getAlignmentInfo`, `createCoreFormatters(DATA)`(`describeReq` 9개 계층 키 및 다중 제외 축 포함, 6종 O(1) 조회) 단일 정본 제공.
  * **이중 스탯 상한 · 후천 특성 SSOT(`statCaps.js` ~290줄 · `11.1KB`):** `ACQUIRED_TRAIT_EFFECTS`(12종) · `ANOMALY_TAG_EFFECTS`(4종) · `getStatCap` · `getAllStatCaps` · `getAcquiredTraits` · `getSpecialtyStatSet`.
  * **조건·버킷 평가기(`reqEvaluator.js` ~319줄 · `11.1KB`) + 코어 엔진(`createEngine.js` ~1,750줄 · `71.4KB`) + 4대 도메인 모듈(`careerRules.js` ~791줄 · `34.7KB`, `careerActions.js` ~635줄 · `30.8KB`, `endings.js` ~755줄 · `44.7KB`, `travel.js` ~1,107줄 · `50.2KB`):** `ERA_PRESETS`(9개 시대), `EVENTS`/`CHRONICLES` 무손실 파티션 버킷·`makeReqContext`·`checkReq`(`reqEvaluator.js`), `captureAndRegisterEventCharacters`(`previouslyMetCharacters` 사전 스냅샷), `migrateState(raw)`(`v1~v3 -> v4` 및 손상 `pendingEvent`/`lastRoll` 방어), 선택적 `choice.critSuccess`/`choice.critFail` 극단 판정 서사 분기, `removeTags` 치유/극복/상실, `applyChronicle` 일상 스탯 발동 리밸런싱, 오염 면역 초인 거짓 `오염 +N` `deltaText` 차단, 직군 서약/스카우트/전직(`careerRules.js` — QA Gate 7A SSOT 직결), 자율 행동(`careerActions.js`), 명예 마감·부고(`endings.js`), 성간 이동·파견(`travel.js`)을 무순환 DAG 모듈로 분리했다.
  * **조건 · 서약 격리 · 판정 · 부고 엔진:** `checkReq(state, req, ctx)` / `describeReq(req)` / `getStratification(state)` / `getAlignmentInfo(state)` / `getLivingSaintAspect(state)` / `isCareerTransitionBlocked` / `isUnboundCareer` / `isManualCareerAllowed` / `evaluateDynamicOfferEligibilityPure` / `getAdmissionPreview` / `canAccessWorld` / `applyDiminishedStatGain`(이중 상한 `getStatCap` 전 경로 강제 · `cur/cap` 비율 수확 체감) / `computeCheckPreview`(d100 상황 보정 + 모성/자질/후천 특성 보정 + 70% 초과 완만 압축 · 90% 상한 SSOT) / `syncImperialNihilus(state)` / `rollD100(state, check)` / `canRetireHonorably`·`createHonorableEndingEvent`·`evaluateLifeGrade(state)`(`resolveFactionEndingKey` 공유 헬퍼 기반 15대 세력 분기 · 최상위 맞춤 부고 31종+ 및 인연·직접 조우 `met_<id>` 우선 네임드 28인·3대 도덕 성향 결합 동적 추모 에필로그, 쿠스토데스·그레이 나이트·암살청·침묵의 자매들 비밀 수호자 예외 포함).
  * **분기 진행 파이프라인 (`advanceQuarter`):**
    1. 분기 증가(1 -> 2 -> 3 -> 새해 1; 선택형 `fastChildhood` 시 0~12세 연 1분기). 새해 정산 시 14세 자동 직무 편입(`navigator` -> 견습 항법사, `knight_blood` `checkReq` 검증 -> 기사 가문 종자, `mechanicus_blood` -> 스키타리; 반면 `planetary_noble`·`rogue_trader_scion`·`terra_high_blood`·`schola`는 14~18세 수습 기간 유지), 19세 진입 시 미선택 수습생 자동 배치(`administratum`, 아인종 `pdf_trooper`, 이단자 `chaos_cultist`), 초점+직군 수확 체감 스탯 성장(쿠스토데스/그레이 나이트/리빙 세인트 양(+) 오염 전면 면역), 하이브리드 체력 회복·비선형 노화, 환경 위험 판정.
    2. 아스타르테스 중상(생명력 38 이하) 시 드레드노트 안치(`EVENT_BY_ID` O(1)) 긴급 발동 및 사망/오염 100 체크(데몬 프린스·쿠스토데스·그레이 나이트·살아 있는 성인 스폰화 사망 면역).
    3. **1순위:** `TIMELINE` 역사 대사건 29종(전 항목 0~1인 스포트라이트 원칙 준수, `previouslyMetCharacters` 사전 스냅샷 기록) 직접 체험 및 원격 아스트로패스 속보(`heardNews`) 전파.
    4. **1.5순위:** `createDynamicCareerOfferEvent` 동적 승급·타 기관 특별 초빙(스카우트)·공훈 횡단·최고위 추대·초인 소환·암살청 비밀 징발(`allowLateralOffer`)·성인 각성·카오스 유혹 제안 이벤트(성향 일치 진로 및 4대 특이점 스카우트 가중치 우대, `isCareerTransitionBlocked` + `CLOSED_VOW_TREES` 종신 서약 격리, 거절 8년 / 시련 실패 2년 재지원 + Tier 6 16년 쿨다운) + 수락 시 `applyCareerJoinEffects` 전체 효과 및 아스타르테스 챕터/암살청 4대 템플 서약 연쇄 발동.
    5. **2순위:** `EVENTS` 확률 선판정(28~34%) 후 파티션 버킷 기반 동적 분기 사건 발동(생애 최대 2회 상한 + 최근 14개 방지 + `alignBias`·챕터/네임드·`anyPastCareers`·행성/직군/시기 가중치 + `previouslyMetCharacters` 기록).
    6. **2.5순위:** `createDynamicTransitEvent` `transitTier` 기반 강제 파견/배치 선택/비군사 기관 소환(행정청 감사·국교 순례·귀족 알현·전시 동원)/카오스 배신자 약탈·밀항 분기 및 워프 항해 이상(파괴 행성 시간 도약 방지) 변주.
    7. **3순위:** `applyChronicle` 파티션 버킷 기반 일상·부조리 연대기 로그 출력(`alignBias`·최근 28개 방지, `MAX_LOGS = 2,400`건 스마트 보존).
  * **자율 행동 · 이동 · 접근성 요약:** `getCareerAction(state)`(30종 `actionGroup` 프로필 기반 91개 직군 고유 행동, 4년 재사용), `canUsePenance`/`canUseAugmetics`/`canUseRejuvenat`, `canRetireHonorably`/`createHonorableEndingEvent`/`resolveFactionEndingKey`, `buildStatusSummary(state)`, `canAccessWorld`/`getTravelProfile`/`evaluateTravelAttempt`/`getTravelCandidateWorlds`, `getContextualOptions`.
* **`scripts/qa.mjs` (~2,753줄) · `scripts/qa/{distGate,personaGate}.mjs` · `scripts/audit-health.mjs` (~387줄) · `scripts/coverage-report.mjs` (~150줄) · `tests/game-a11y.test.tsx` (~1,303줄) & `.github/workflows/{qa,deploy}.yml`:**
  * `node scripts/qa.mjs` (`--deep` / `--check-dist` / `--only-dist`): `AGENTS.md` 7대 게이트 + **Gate 1 코어·사전·사건·엔진 전 파일 통일 110KB/2,200줄 하드 상한(95KB/1,950줄 경고) · 연대기 70KB/1,400줄** + **Gate 2 스포트라이트 다중 줄 정적 접근성 & 정적 페이지 소스 레벨 분할 엔진 7모듈 import 격리** + **Gate 4(데드 필드 `ch.outcome` 금지 · `o.text`/`check.stat`/`o.stats`/`critSuccess`·`critFail`·`removeTags` 검증 · 아동/성인 크리그 사건 스캔 · 오염 면역 `deltaText` 회귀 · Stage 21 `statCaps`/모성 특전/12재능/`removeTags` 치유 불변식)** + **Gate 4G(개념 사전 48종 · 21세력 상황별 매핑 무결성)** + **Gate 4P(`scripts/qa/personaGate.mjs`: 대표 페르소나 17종 + 적격 선택지·결과문·타 행성 방문 사건 스캔 · 금칙어 충돌 0건 · 최소 풀 하한 `>= 8`)** + **Gate 7A(`src/engine/careerRules.js` 순수 SSOT 직접 import)** + **Gate 7D(91직군 120개 직계 승급 간선 `getStatCap(A, stat) >= B.req.stats[stat]` 0데드락 정적 전수 증명)** + **Gate 8(`scripts/qa/distGate.mjs`: `dist/` 번들 격리 · 분할 엔진 7모듈/서사/사전 누수 0건 · 동적 SSR 카드 수량 일치)**.
  * `node scripts/audit-health.mjs` (`--lives=N`, `--seed=S`): 결정론적 `mulberry32` 시드 기반 200생애 무작위 플레이(전직·자율행동·성간이동·7분기마다 JSON/`migrateState` 왕복·500세+ 명예 마감 실실행·초인 오염 면역·비초인 필멸자 300세 이상치·저장 2,048KB 상한·청취 리듬·네임드 스포트라이트 재조우 접힘 집계·전 파일 통일 용량 감시 검증).
  * `npm test` (`tests/game-a11y.test.tsx`): React Testing Library + jsdom 기반 행동형 스크린 리더 접근성·포커스·1~16배속·개념 사전 필터·전 5개 코덱스 해시 앵커·네임드 스포트라이트·`critSuccess`/`critFail`·**Stage 21 3중 명시 특성 UI(선택지 미리보기·획득/치유 로그·상태창 특성/상한) 및 `removeTags` 치유** 20개 테스트 스위트.
  * `node scripts/coverage-report.mjs`: 직군·행성·챕터·연령대·성향/초점·네임드(28인 100%)·시대(9개, `endYear` 반영) 7축 콘텐츠 밀도 매트릭스 출력.
  * `.github/workflows/qa.yml` & `.github/workflows/deploy.yml`: PR·수동(`qa.yml`) 및 `main` 푸시(`deploy.yml`) 시 `qa.mjs` + `audit-health.mjs --lives=100` + `typecheck` + `npm test` + `npm run build` + `qa.mjs --only-dist`(Gate 8)를 자동 검증하고, `main` 브랜치 통과 시 GitHub Pages로 정적 배포.

### 3.2 데이터 파일별 수록 내용
| 파일 | 건수 | 수록 내용 요약 |
| --- | --- | --- |
| `src/data/glossary.js` | 8카테고리 · 48용어 | 인류제국의 기둥(7), 워프·사이커·카오스(7), 제국 군대·초인(8), 기계교·심문소·행정(6), 행성 분류·인류 사회(5), 주요 외계 종족(7), 제국 연대기·M41~M42(5), 게임 시스템(3) — 자체 작성 한국어 해설 · 게임 연계 안내 · 코덱스 상호 링크 · Lexicanum 출처 완비. |
| `src/data/core/worlds.js` | 5성역 · 23행성 | **네임드 15** + **일반/특수 8** — **Stage 21 전 23개 행성 평생 특전(`capMods` + `perk`)** 완비. |
| `src/data/core/origins.js` | 신분 11 · 자질 12 | 11종 출신 신분 + **12종 선천 자질(`capMods` + `talent`):** 기존 8종(`none` 63.5%) + **극희귀 4대 규격 외 특이점(합계 2.5%: `alpha_plus_psyker`, `freak_physique`, `savant_genius`, `omega_pariah`)**. |
| `src/data/core/careers.js` (+ `careers/*.js`) | 5파일 · 92직군 (선택 91 · 21트리) | 배럴(`0.7KB`) + 4개 도메인 모듈(`civil_militarum.js` 37직군, `faith_shadow.js` 23직군, `transhuman_chaos.js` 19직군, `specialist_factions.js` 13직군) — Stage 21 승급-상한 정합 정렬(0데드락). |
| `src/data/core/chapters.js` | 9챕터 | `ultramarines`, `blood_angels`, `space_wolves`, `dark_angels`, `imperial_fists`, `salamanders`, `black_templars`(`allowPsyker: false`), `raven_guard`, `white_scars`. |
| `src/data/core/characters.js` | 28인물 | 28인 전원 단독 조우·`met_*` 선택지 생산·4대 후일담 사건·연대기 100% 완비. |
| `src/data/core/timeline.js` (+ `timeline/*.js`) | 4파일 · 29대사건 | 배럴(`0.5KB`) + 시대별 3분할(`m41_early.js` 11, `m41_late.js` 9, `m42_indomitus.js` 9). 전 항목 0~1인 대표 스포트라이트 원칙 준수(`AGENTS.md` 2.2.6). |
| `src/data/core/tags.js` | 태그 225 · 행성태그 49 | 이력·신분·자질·직군·계급·직책·명예·인연·성향·신규 세력·거시 전쟁·노년/변경·Stage 21 특이점/후천 특성·**Stage 21.6 인연 태그 8종** 한글 라벨 사전(`TAG_LABELS` 225/225 전량 회수) 및 `WORLD_TAG_LABELS`. |
| `src/data/events/careers/*.js` | 20파일 · 291사건 | 기존 19파일(281건) + **22단계 `guardsman_grimdark.js`(10건)**. |
| `src/data/events/chapters/*.js` | 10파일 · 60사건 | 9대 챕터 1:1 승격(`6*9=54`) + 합동 공조 `chapters_core`(6). |
| `src/data/events/worlds/*.js` | 9파일 · 113사건 | 1:1 승격 4파일(`terra` 10, `cadia` 6, `krieg` 6, `armageddon` 6) + 권역 5파일(`solar` 13, `ultima` 27, `frontier` 19, `generic` 14, `generic_deep` 12). |
| `src/data/events/themes/*.js` | 20파일 · 324사건 | 기존 17파일(294건) + **21.6단계 `bonds_s21_6.js`(12건)** + **22단계 `grimdark_misfortune.js`(10건) · `grimdark_factions.js`(8건)**. |
| `src/data/chronicles/*.js` | 22파일 · 936연대기 | 기존 20파일(892건) + **21.6단계 `bonds_s21_6.js`(14건)** + **22단계 `grimdark_s22.js`(30건)** — 전체 936종 상황 맞춤형 일상·부조리·그림다크 연대기. |


---

## 4. 핵심 게임 시스템 규격 및 엔진 스키마 레퍼런스

### 4.1 계급별 진입 · 이동 · 페이싱 · 특수 시술 · 원격 속보 규격
* **진행 페이싱 (5단계 배속):** 기본 1배속 기준 `1년 = 60초` (`1년 = 3분기`, 분기당 20.0초). 2배속 30초(분기 10.0초), 4배속 15초(분기 5.0초), 8배속 7.5초(분기 2.5초), **16배속 3.75초(분기 1.25초)**. `YearProgressBar.tsx`에서 `performance.now()` 50ms 단위로 정밀 보간한다.
* **직군 진입 · 서약 · 입단 심사 (`entryMode`, `UNBOUND_CAREERS`, `CLOSED_VOW_TREES`):** `open` 직군은 비구속 민간·초년에서 첫 정규 서약 기관 지원 시 비치명적 d100 입단 심사(`40~88%`, 탈락 시 2년 재지원 대기, 취임 후 2년 최소 복무)가 적용된다. 정규 서약 기관 복무 중에는 같은 트리 승급·카오스·초인/동급 이상 사이커(및 비폐쇄 직계 연계/항법사→세네샬)만 수동 전환이 열리며, 타 기관 이동은 명성(`Inf >= 52`)·성향·적합성 기반 **타 기관 특별 초빙(스카우트)** 및 `event` 전용 동적 발탁·임명 사건으로 이뤄진다(소로리타스·기계교·항법사·기사 가문·사이커 종신 폐쇄 서약 격리 적용; 거절 시 8년, 시련 실패 2년 재지원 + Tier 6 16년 쿨다운).
* **강제 파견/이동 선언적 위계 (`transitTier`, `canAccessWorld`):** `forced`/`astartes_scout`는 수동 행성 선택이 잠기며(`forcedLock: true`) 상부 명령에 따른 강제 파견으로만 이동한다. `mid`/`astartes_brother`/`grey_knight`는 2개 작전 구역 택1+잔류 및 4년 이동 쿨다운, `autonomous`는 자율 원정 100% 즉시 출항 및 3년 쿨다운, 귀족은 `Inf < 45` 인접 성역 / `45+` 은하 전역, 야만 행성 일반 시민은 이탈 불가다. `canAccessWorld`가 파괴 행성·아스타르테스 모성·테라·화성(화성 조약)·크리그/카타찬·기사 행성 출입 자격을 일괄 검증한다.
* **스탯 수확 체감 & 투명 d100 판정 (`applyDiminishedStatGain`, `computeCheckPreview`):** 임의 스탯 하락 없이 고스탯 패시브 성장만 완만히 체감(`<55: 1.0x`, `55~71: 전문 0.75x/비전문 0.45x`, `72~84: 전문 0.50x/비전문 0.20x`, `85+: Tier 5+ 전문·초인·기계교 Int 0.35x / 비전문 0x`)하며, 분기 사건 보상은 `<75: 1.0x`, `75~87: 0.75x`, `88+: 0.50x`(최소 `+1`)으로 Tier 6 도달성을 보존한다. d100 판정은 `computeCheckPreview` 단일 정본으로 부상(`-8/-16`)·워프 오염(`-8/-15`, 카오스 트리/데몬 프린스 면제)·임페리움 니힐루스(`-5`)·고위 난제(`-5/-9`)와 70% 초과 완만 압축(`max 90%`)을 선택지 미리보기와 실제 굴림에 동일 적용한다.
* **기계교 의체 개조:** 기계교 소속은 16세+(무료, 8년 간격), 비기계교는 18세+·고위 계급(Tier 3+, 권위 42+) 또는 귀족(권위 55+) 또는 부상 재활 여건 필요. 크리그 일반 병사 및 야만 행성 하급민(Tier 3 미만), 데몬 프린스 제외.
* **리주버냇 수명 연장:** 50세+·고위 계급(Tier 3+)/귀족·권위 50+, 아스타르테스/쿠스토데스/살아 있는 성인/데몬 프린스 불필요.
* **성당 정화 고행:** 14세+·비야만 행성·비이단자·오염 1+·재사용 3년(암흑 1+ 시 암흑 -3 · 교조 +1 병행).
* **은하·성역 원격 속보:** 타 행성 체류 중에도 제국 전역(`galaxy`) 또는 같은 성역(`sector`)의 대형 역사 사건이 발생하면 아스트로패스 속보(`heardNews`)가 연대기에 수신됨(야만 행성 제외).

### 4.2 `checkReq(state, req)` 지원 조건 키
`minAge`, `maxAge`, `minYear`, `maxYear`, `gender` (`"male"`/`"female"`), `stats` (`{ WS, BS, T, Ag, Int, WP, Fel, Inf }`), `minFaith`, `maxFaith`, `minCorruption`, `maxCorruption`, `minWounds`, `maxWounds`, `minAlign` (`{ humane, dogmatic, ruthless }`), `maxAlign`, `anyDominantAlign` (`["humane"|"dogmatic"|"ruthless"|"neutral"]`), **`minSocialTier`**, **`maxSocialTier`**, **`anySocialTiers`** (`"underclass"|"common"|"elite"|"apex"`), **`anyRealms`**, **`excludeRealms`** (`"civilian"|"cloistered"|"military"|"void"|"mechanicus"|"heretic"`), **`anyBodyClasses`**, **`excludeBodyClasses`** (`"mortal"|"augmetic"|"transhuman"|"dreadnought"|"daemonic"`), **`excludeTrees`**, **`maxCareerTier`**, `allTags`, `anyTags`, `excludeTags`, `anyCareers`, `anyPastCareers`, `excludePastCareers`, `anyChapters`, `excludeChapters`, `anyWorlds`, `anyHomeWorlds`, `excludeWorlds`, `excludeHomeWorlds`, `anyWorldTags`, `excludeWorldTags`, `anySegmenta`, `anyFocus`, `greatRift` (`true`/`false`), `or` (재귀 배열).

### 4.3 `applyOutcome(state, outcome)` 지원 효과 키 및 선택지 극단 판정 분기
* **`outcome` 효과 키:** `text`, `stats`, `wounds`, `woundsBonus`, `faith`, `corruption`, `corruptionReset`, `align` (`{ humane, dogmatic, ruthless }`), `lifeBonusExtra` (또는 `extraLifeBonus`), `incrementRejuvenat`, `addTags` (`met_<charId>` 자동 `metCharacters` 등록), `moveWorld`, `warpYearShift` (생물학적 연령 유지한 워프 시간 도약), `forceCareer`, `acceptCareerOffer`, `declineCareerOffer`, `trialFailFor`, `chooseChapter`, `instantDeath` (사망 사유 문자열).
* **선택적 극단 판정 분기 (`choice.critSuccess` / `choice.critFail`):** `choice.check`가 있는 선택지에 선택적으로 `critSuccess` 또는 `critFail` 결과 객체를 지정하면 `resolvePendingChoice`가 d100 대성공(`roll <= 5` 및 성공) / 대실패(`roll >= 96` 및 실패) 시 전용 산문·보상·패널티를 적용한다. 미지정 시 기존과 동일하게 `check.success` / `check.fail`로 무손실 폴백한다.

---

## 5. 서사 보강 로드맵 및 단계별 진행 보고서

작업 규칙 및 QA 게이트는 [`AGENTS.md`](./AGENTS.md)를 따른다. 본 절에서는 3단계 서사 보강 계획과 각 단계의 실제 완료 보고 내역을 추적한다.

### 1단계: 미회수 이력 태그 연작 아크 · 3대 오르도 · 카오스 4대 신 · 삶의 초점(`anyFocus`) 분기 구축 `[완료]`
* **목표:** 사건·역사 선택으로 얻은 단발성(미회수) 이력 태그를 실제 후속 분기 사건과 연대기로 회수하고, 엔진에 이미 구현된 `anyFocus` 조건을 분기 사건에 적극 연동한다.
* **완료 내역 (수정 파일 및 추가 콘텐츠):**
  1. **`data/events.js` & `js/engine.js` 보완:**
     * `ev_chaos_whispers`(암흑 사대신의 유혹)에 누락되어 있던 **슬라네쉬의 부름(`mark_slaanesh`)** 선택지를 추가해 카오스 4대 신 체제를 완성했다.
     * `js/engine.js`의 `TAG_LABELS`에 `mark_slaanesh`와 기존 누락 라벨 4종(`penal_mark`, `elite_troop`, `tanith_survivor`, `rift_touched`)을 등록했다.
  2. **`data/events_deep.js` 분기 사건 27종 추가 (73종 -> 100종, 전체 `EVENTS` 172 -> 199종):**
     * **이단심문관 3대 오르도 고유 수사 연작 (3종):** `ev_arc_ordo_hereticus`(배교 추기경·소로리타스 공조), `ev_arc_ordo_xenos`(진스틸러 교단·데스워치 소집·드루카리 역추적), `ev_arc_ordo_malleus`(그레이터 데몬 소환·그레이 나이트 공조·기억 소거).
     * **카오스 4대 신 낙인 후속 연작 (4종):** `ev_arc_mark_khorne`(해골 공물 일기토), `ev_arc_mark_tzeentch`(아홉 갈래 음모·변이 억제), `ev_arc_mark_nurgle`(정수조 역병 전파·봉쇄), `ev_arc_mark_slaanesh`(상류층 가면무도회·완벽한 검무).
     * **핵심 미회수 이력 태그 후속 아크 (14종):** `ev_arc_stc_conclave`(`stc_finder`), `ev_arc_inquisition_debt`(`inquisition_favor`), `ev_arc_wanted_manhunt`(`wanted_by_inquisition`), `ev_arc_rogue_psyker_hunt`(`rogue_psyker`), `ev_arc_tech_heresy_audit`(`tech_heresy`), `ev_arc_xenos_contact_echo`(`xenos_contact`), `ev_arc_penal_redemption`(`penal_mark`), `ev_arc_dreadnought_awakening`(`dreadnought`), `ev_arc_primaris_tension`(`primaris`), `ev_arc_death_company_last_charge`(`death_company`), `ev_arc_inner_circle_hunt`(`inner_circle`), `ev_arc_living_miracle_trial`(`living_miracle`), `ev_arc_lost_home_vigil`(`cadia_stands`/`baal_survivor`/`tanith_survivor`), `ev_arc_veteran_relic_recall`(`vraks_veteran`/`badab_veteran`/`rift_survivor`/`deathwatch_vet`/`space_hulk_vet`).
     * **삶의 초점(`anyFocus`) 6대 전용 분기 사건 (6종):** `ev_focus_survival`, `ev_focus_combat`, `ev_focus_faith`, `ev_focus_lore`, `ev_focus_politics`, `ev_focus_forbidden`.
  3. **`data/chronicles_deep.js` 심화 연대기 21종 추가 (70종 -> 91종, 전체 `CHRONICLES` 274 -> 295종):**
     * 3대 오르도(`ch_arc_ordo_*` 3종), 카오스 4대 신 낙인(`ch_arc_mark_*` 4종), 핵심 이력 태그(`stc_finder`, `inquisition_favor`, `wanted_by_inquisition`, `rogue_psyker`, `tech_heresy`, `xenos_contact`, `penal_mark`, `dreadnought`, `primaris`, `death_company`, `inner_circle`, `living_miracle`, 고향 붕괴 생존자, 대전역 베테랑) 일상 연대기 14종.
  4. **문서 분리 정리:**
     * 에이전트 지시사항·불변 규칙·나무위키 표준 표기표·연대기 고증 기준·QA 게이트를 [`AGENTS.md`](./AGENTS.md)로 독립 분리하고, `PROJECT_GUIDE.md`는 아키텍처·수록 현황·진행 보고서 역할로 정돈했다.
  5. **QA 자동 검증 결과:**
     * `index.html` 14개 스크립트 실존·`vm.Script` 구문 통과, `ui.js` 누락 `#id` 0건, 금지 구표기·장식 기호·조사 불일치 0건, ID 중복·참조 무결성 오류·소프트락 사건 0건.
     * 250생애 `advanceQuarter` 스트레스 시뮬레이션 오류 0건, `maxRepeat = 2`, 신규 1단계 사건 27종 및 연대기 21종 전 항목 도달 가능성 검증 완료.

### 2단계: 생애 주기(유년·노년·초장수기) 곡선 완성 & 소외 직군·출신·자질 보강 `[완료]`
* **목표:** 기존 0건이던 유년기(13세 이하) 분기 사건 및 노년·초장수기(55세+/100세+) 사건·연대기 공백을 메우고, 상대적으로 분량이 적은 최상위 직군·타락 루트·특수 출신을 집중 보강한다.
* **완료 내역 (수정 파일 및 추가 콘텐츠):**
  1. **`data/events_deep.js` 분기 사건 33종 추가 (100종 -> 133종, 전체 `EVENTS` 199 -> 232종 / 역사 포함 247종):**
     * **유년기(6~13세) 성장 분기 사건 (8종):** `ev_s2_child_ration_line`(하이브 배급·공구), `ev_s2_child_blackship_sky`(검은 함선 목격), `ev_s2_child_schola_duel`(스콜라 프로제니움 기숙사 서열), `ev_s2_child_noble_tutor`(귀족 가문 독과자·가정교사), `ev_s2_child_feral_trial`(야만 행성 첫 밤사냥), `ev_s2_child_forge_spark`(포지 신전 첫 성유), `ev_s2_child_krieg_vat`(크리그 비타-움 전용 방독면 시험), `ev_s2_child_void_hull`(보이드본 함선 격벽).
     * **노년기(55세+)·초장수기(100세+) 서사 사건 (6종):** `ev_s2_elder_mortal_twilight`(필멸자 노년 회고), `ev_s2_elder_rejuvenat_solitude`(`rejuvenat` 세대 단절 고독), `ev_s2_elder_bionic_humanity`(`bionic` 기계화 기억 삭제 갈등), `ev_s2_centenarian_mortal_lineage`(100세+ 백 년 전 전우의 증손자 대면), `ev_s2_centenarian_ancient_scars`(140세+ 초인 고참기), `ev_s2_elder_veteran_story`(출정 전야 노병과 신병).
     * **소외 직군 보강 사건 (11종):** `chaos_cultist` 3단계 타락(`ev_s2_cultist_cell`, `ev_s2_cultist_warband`, `ev_s2_cultist_apotheosis`), `grey_knight` 2종(`ev_s2_gk_titan_hall`, `ev_s2_gk_daemon_banish`), `adeptus_custodes` 2종(`ev_s2_custodes_solar_watch`, `ev_s2_custodes_inquisitor_clash`), `skitarii`(`ev_s2_skitarii_noosphere`), `tempestus_scion`(`ev_s2_scion_orbital_drop`), `sanctioned_psyker`(`ev_s2_psyker_sanction_burden`), `ecclesiarchy_priest`(`ev_s2_priest_crusade_sermon`).
     * **특수 출신·선천 자질 보강 사건 (8종):** `ev_s2_origin_navigator_warp`(`navigator`), `ev_s2_trait_blank_isolation`(`blank`·침묵의 자매들), `ev_s2_trait_ratling_sniper`(`ratling`), `ev_s2_trait_ogryn_bonehead`(`ogryn` 본헤드 시술), `ev_s2_trait_prodigy_wargame`(`prodigy`), `ev_s2_trait_saint_spark_aura`(`saint_spark`), `ev_s2_origin_rt_blood`(`rogue_trader_blood`), `ev_s2_origin_terra_elite`(`terra_elite`).
  2. **`data/chronicles_deep.js` 심화 연대기 26종 추가 (91종 -> 117종, 전체 `CHRONICLES` 295 -> 321종):**
     * **노년·장수·기계화 일상 (8종):** `ch_s2_elder_mortal_1~2`, `ch_s2_rejuvenat_1~2`, `ch_s2_bionic_1~2`, `ch_s2_centenarian_1~2`.
     * **소외 직군 일상 (9종):** `ch_s2_cultist_1~2`, `ch_s2_gk_1~2`, `ch_s2_custodes_1`, `ch_s2_skitarii_1`, `ch_s2_scion_1`, `ch_s2_psyker_1`, `ch_s2_priest_1`.
     * **특수 출신·자질 일상 (9종):** `ch_s2_navigator_1`, `ch_s2_blank_1`, `ch_s2_ogryn_1`, `ch_s2_ratling_1`, `ch_s2_prodigy_1`, `ch_s2_saint_spark_1`, `ch_s2_rt_blood_1`, `ch_s2_mechanicus_blood_1`, `ch_s2_terra_elite_1`.
  3. **QA 자동 검증 결과 (`AGENTS.md` 6장 기준):**
     * `index.html` 14개 스크립트 실존·`vm.Script` 구문 통과, `ui.js` 누락 `#id` 0건, 금지 구표기·장식 기호·한국어 조사 불일치 0건, ID 중복·참조 무결성 오류·`TAG_LABELS` 누락·소프트락 0건.
     * 크리그 10세 출생자 전 출신 정합성 검증 완료(`ev_s2_child_krieg_vat`만 발동), 신규 2단계 사건 33종 및 연대기 26종 전 항목 도달 가능성 100% 통과.
     * 250생애 `advanceQuarter` 스트레스 시뮬레이션 오류 0건, `maxRepeat = 2` 확인.

### 3단계: M41 초중반 시대 밀도 · 미등장 네임드 단독 조우 · 인간관계 아크 · 맞춤 부고 `[완료]`
* **목표:** `아이젠혼 시대(225.M41)` 등 M41 초중반 시대 프리셋의 역사 밀도를 높이고, 이름 없는 인연의 여운과 죽음의 품격을 완성한다.
* **완료 내역 (수정 파일 및 추가 콘텐츠):**
  1. **`data/timeline.js` M41 초중반 역사 대사건 4종 추가 (15종 -> 19종):**
     * `tl_eisenhorn_xenos`(240.M41 스카루스 섹터 사루티·네크로텍 음모, 아이젠혼 시대 프리셋 직결), `tl_macharian_crusade`(392~399.M41 마카리우스 대성전), `tl_damocles_crusade`(742~745.M41 다모클레스 만 성전·타우 제국 최초 전면전), `tl_battle_of_macragge`(745.M41 제1차 타이라니드 전쟁·마크라그 전투·마르네우스 칼가).
  2. **`data/events_deep.js` 분기 사건 15종 추가 (133종 -> 148종, 전체 `EVENTS` 232 -> 247종 / 역사 포함 266종):**
     * **단독 조우 미구현 네임드 3인 완비 (3종):** `ev_named_creed`(우르사카르 E. 크리드), `ev_named_ghazghkull`(가즈쿨 막 우룩 스라카), `ev_named_abaddon`(약탈자 아바돈, 이단 전용 서약 포함). 이로써 `characters.js` 20인 전원 단독 조우 사건 확보.
     * **소외 행성 4곳 보강 (4종):** `ev_s3_world_vostroya_forge`(보스트로야 장자 징집·공예 라스건), `ev_s3_world_tanith_nalwood`(764.M41 이전 타니스 날우드 숲), `ev_s3_world_ophelia7_convent`(오펠리아 VII 콘벤트 상크토룸·시노드 미니스트라), `ev_s3_world_necromunda_turf`(네크로문다 골리앗 vs 에셔).
     * **이름 없는 인연 2단계 연작 아크 (6종):** `ev_s3_bond_comrade_meet` -> `ev_s3_bond_comrade_fate`(전우), `ev_s3_bond_mentor_meet` -> `ev_s3_bond_mentor_legacy`(스승), `ev_s3_bond_rival_meet` -> `ev_s3_bond_rival_reckoning`(숙명의 정적).
     * **대균열(`greatRift: true`) 및 암흑 제국 후유증 사건 (2종):** `ev_s3_great_rift_sky`(찢어진 밤하늘·시간 왜곡), `ev_s3_nihilus_darkness`(임페리움 니힐루스 고립 배급 붕괴).
  3. **`data/chronicles_deep.js` 심화 연대기 14종 추가 (117종 -> 131종, 전체 `CHRONICLES` 321 -> 335종):**
     * M41 초중반·베테랑(4종: `ch_s3_macharian_vet`, `ch_s3_damocles_vet`, `ch_s3_era_damocles_rumor`, `ch_s3_era_behemoth_shock`), 대균열·니힐루스(3종: `ch_s3_great_rift_1~2`, `ch_s3_nihilus_2`), 소외 행성 4곳(4종: `ch_s3_vostroya_1`, `ch_s3_tanith_1`, `ch_s3_ophelia7_1`, `ch_s3_necromunda_1`), 인간관계 인연(3종: `ch_s3_bond_comrade`, `ch_s3_bond_mentor`, `ch_s3_bond_rival`).
  4. **`js/engine.js` 소규모 보강 — `TAG_LABELS` 5종 등록 & `evaluateLifeGrade` 맞춤 부고 세분화:**
     * 신규 태그 5종(`macharian_veteran`, `damocles_veteran`, `bond_comrade`, `bond_mentor`, `bond_rival`)을 `TAG_LABELS`에 등록했다.
     * `evaluateLifeGrade(state)`를 카오스 스폰 붕괴, 4대 신 낙인 배교자, 고대 드레드노트 안식, 국교 시성 청원, 쿠스토데스 황금 갑주 진명, 그레이 나이트 타이탄 영웅의 전당, 이단심문관 급진파/청교도파 분기, 아스타르테스 전설, 로그 트레이더 헤일로 스타 개척, STC/아크마고스 화성 대서고, 크리그 속죄 완수, 부서진 고향 생존자 영웅 등 14종 특화 판정 + 4종 범용 판정으로 세분화했다.
  5. **QA 자동 검증 결과 (`AGENTS.md` 6장 기준):**
     * `index.html` 14개 스크립트 실존·`vm.Script` 구문 통과, `ui.js` 누락 `#id` 0건, 금지 구표기·장식 기호·한국어 조사 불일치 0건, ID 중복·참조 무결성 오류·`TAG_LABELS` 누락·소프트락 0건.
     * `characters.js` 20인 전원 단독 조우 달성(미보유 0명), 신규 3단계 사건 15종·역사 대사건 4종·연대기 14종 도달 가능성 100%, `evaluateLifeGrade` 14개 특화 부고 분기 전원 동작 검증 완료.
     * 250생애 스트레스 시뮬레이션(무작위 200생애 + 아이젠혼 시대 50생애) 오류 0건, `maxRepeat = 2`, 아이젠혼 시대 프리셋 역사 대사건 발동 정상 확인.

---

## 6. 2차 서사 보강 로드맵 (4~6단계) 및 단계별 완성도 추적

> **진행 기록 규칙 (`AGENTS.md` 1장 연계):** 본 2차 보강 로드맵의 각 단계를 완료할 때마다 상태(`[예정]` -> `[진행 중]` -> `[완료]`), 실제 구현 내역, QA 통과 여부, 그리고 목표 대비 어느 정도까지 완성되었는지(단계 달성도 및 전체 누적 진행률·잔여 범위)를 즉시 기록한다.

### 전체 진행 현황 요약

| 단계 | 구분 | 상태 | 완성도 | 핵심 목표 |
| --- | --- | --- | --- | --- |
| **4단계 (2차 1단계)** | 네임드 후일담 · 명예 태그 · 초년병기 · 무명 행성 | `[완료]` | 100% (목표 4개 축 · 사건 37종 · 연대기 47종 전량 완료) | `met_*` 20인 후일담 전면 회수, 미회수 챕터·전역 명예 태그 17종 전량 회수, 14~22세 초년병기 통과 의례, 무명 행성 6종 및 핵심 하급 직군 보강 |
| **5단계 (2차 2단계)** | 가족·부고 연동 · 삶의 초점 2막 · 외계/배신자 균형 | `[완료]` | 100% (목표 4개 축 · 사건 22종 · 연대기 21종 · 엔진 부고 연동 완료) | 필멸자 가족·혼인·자녀 연작, `evaluateLifeGrade` 인연/네임드 추모 문구 결합, `anyFocus` 2막 심화, 타우·드루카리·네크론·아엘다리·보탄·배신자 군단 확장 |
| **6단계 (2차 3단계)** | 시대 밀도 · 성별/소외 행성/챕터 숙원 · 워프 변주 | `[완료]` | 100% (목표 3개 축 · 역사 5종 · 사건 14종 · 연대기 14종 · 워프 변주 완료) | M41 초중반·M42(`파리아 넥서스`, `징조의 방주/라이온 귀환` 등) `TIMELINE` 확장, 침묵의 자매들·화성/마크라그/녹턴·챕터 숙원, `createDynamicTransitEvent` 워프 항해 변주 |

* **2차 서사 보강 전체 누적 완성도:** `3 / 3 단계 완료 (100% · 4~6단계 전량 완료)`

### 4단계 (2차 1단계): `met_*` 20인 후일담 · 미회수 명예 태그 17종 · 14~22세 초년병기 · 무명 행성 보강 `[완료]`
* **완성도:** **100% 완료** (계획된 4대 축 — 분기 사건 37종, 일상 연대기 47종, `index.html` 스크립트 등록, 6대 QA 게이트 전 항목 0오류 통과)
* **완료 내역 (수정·신설 파일 및 추가 콘텐츠):**
  1. **`data/events_saga.js` 신설 & `index.html` 등록 (분기 사건 37종 추가 · 전체 `EVENTS` 247 -> 284종 / 역사 포함 266 -> 303종):**
     * **네임드 20인 조우 후일담 분기 사건 (4종 · `met_*` 20종 전원 포괄):** `ev_s4_met_primarchs_echo`(길리먼·라이온·발로리스·단테·칼가·그림나르·투샨·아즈라엘), `ev_s4_met_commanders_echo`(야릭·크리드·건트·케인·마보·그리말두스), `ev_s4_met_shadows_echo`(아이젠혼·앰벌리 베일·카울·셀레스틴), `ev_s4_met_nemesis_echo`(아바돈·가즈쿨).
     * **미회수 챕터·직책·전역 최상위 명예 태그 17종 전량 회수 사건 (16종):** `ev_s4_tag_emperors_champion`, `ev_s4_tag_wolf_guard`, `ev_s4_tag_huscarl_oath`, `ev_s4_tag_promethean_smith`, `ev_s4_tag_shadow_master`, `ev_s4_tag_khan_rider`, `ev_s4_tag_ultramar_scholar`, `ev_s4_tag_librarius_trained`, `ev_s4_tag_chapter_serf`, `ev_s4_tag_krieg_grenadier`, `ev_s4_tag_catachan_blooded`, `ev_s4_tag_fenris_blood`, `ev_s4_tag_daemon_bane`, `ev_s4_tag_rift_touched`, `ev_s4_tag_vigilus_veteran`, `ev_s4_tag_tyrannic_veterans`(`tyranic_war_vet`·`tyrannic_veteran` 통합 회수).
     * **14~22세 사회 초년기·신병 통과 의례 사건 (7종):** `ev_s4_youth_factory_shift`, `ev_s4_youth_first_watch`, `ev_s4_youth_scribe_error`, `ev_s4_youth_noosphere_link`, `ev_s4_youth_first_warp`, `ev_s4_youth_arbites_baton`, `ev_s4_youth_spire_debut`.
     * **무명 행성 6종 생활밀착 + 얇은 핵심 직군 보강 사건 (10종):** 농업(`ev_s4_world_agri_tithe`), 낙원(`ev_s4_world_paradise_hunt`), 야만(`ev_s4_world_feral_skyiron`), 하이브(`ev_s4_world_hive_water`), 문명(`ev_s4_world_civilised_census`), 보이드본(`ev_s4_world_voidborn_air`), 가드맨(`ev_s4_career_guard_ration`), 스키타리(`ev_s4_career_skitarii_override`), 테크프리스트(`ev_s4_career_techpriest_relic`), 아스타르테스(`ev_s4_career_astartes_drop`).
  2. **`data/chronicles_deep.js` 심화 연대기 47종 추가 (131종 -> 178종 · 전체 `CHRONICLES` 335 -> 382종):**
     * **네임드 20인 전원 개별 후일담 연대기 (20종, `priority: 3`):** `ch_s4_met_guilliman` ~ `ch_s4_met_azrael` (20인 전원 1:1 완비).
     * **미회수 명예 태그 17종 개별 일상 연대기 (17종, `priority: 3`):** `ch_s4_tag_emperors_champion` ~ `ch_s4_tag_tyrannic_veteran`.
     * **14~22세 초년기 일상 연대기 (4종) & 무명 행성 6종 일상 연대기 (6종):** `ch_s4_youth_*` 4종, `ch_s4_world_*` 6종.
  3. **QA 자동 검증 결과 (`AGENTS.md` 6장 기준):**
     * **1~4게이트:** `index.html` 15개 스크립트 실존·`vm.Script` 구문 오류 0건, `js/ui.js` `#id` 셀렉터 78종 누락 0건, 금지 구표기·장식 기호·한국어 조사 불일치 0건, ID 중복·참조 무결성·`TAG_LABELS` 누락 0건.
     * **5게이트:** 전체 303종 분기·역사 사건 소프트락 0건, 신규 4단계 분기 사건 37종 및 연대기 47종 도달 가능성 100%, `met_*` 20종 및 명예 태그 17종 전원 사건·연대기 회수 완료, 크리그 출생자 정합성 검증 통과.
     * **6게이트:** 250생애 `advanceQuarter` 스트레스 시뮬레이션 오류 0건, `maxRepeat = 2` 확인(신규 4단계 분기 사건 31종 · 연대기 36종 자연 발동 실측).

### 5단계 (2차 2단계): 필멸자 가족·후계자 연작 · 부고 동적 추모 · 삶의 초점 2막 · 외계/배신자 균형 `[완료]`
* **완성도:** **100% 완료** (계획된 4대 축 — 분기 사건 22종, 일상 연대기 21종, `js/engine.js` `TAG_LABELS` 2종 및 `evaluateLifeGrade` 동적 추모 에필로그 결합, 6대 QA 게이트 전 항목 0오류 통과)
* **완료 내역 (수정 파일 및 추가 콘텐츠):**
  1. **`js/engine.js` 소규모 엔진 보강 — 신규 태그 2종 & `evaluateLifeGrade` 동적 추모 결합:**
     * `TAG_LABELS`에 `bond_family`("가정과 배우자"), `bond_heir`("후계자·자녀")를 등록했다(총 115종).
     * `buildObituaryEpilogue(state, mode)`를 추가해 사망 시 보유한 인연 태그(`bond_heir`/`bond_family`/`bond_comrade`/`bond_mentor`/`bond_rival`)와 네임드 조우 이력(`metCharacters`), 그리고 충성/배교/카오스 스폰 여부에 따라 부고 판정문 말미에 추모 에필로그를 동적 결합했다.
  2. **`data/events_saga.js` 분기 사건 22종 추가 (37종 -> 59종 · 전체 `EVENTS` 284 -> 306종 / 역사 포함 303 -> 325종):**
     * **필멸자 가족·혼인·자녀(후계자) 연작 아크 (4종):** `ev_s5_bond_family_meet`(혼약·귀족 정략결혼 분기 포함, 초인·수도회·기계교·크리그 제외), `ev_s5_bond_heir_birth`(자녀 탄생·진로), `ev_s5_bond_family_conscription`(전시 징집 영장과 마지막 식사), `ev_s5_bond_heir_legacy`(후계자 출정·유품 계승).
     * **삶의 초점(`anyFocus`) 2막 심화 분기 사건 (6종):** `ev_s5_focus_survival_2`(역병 약재 윤리), `ev_s5_focus_combat_2`(고참 무인과 젊은 도전자), `ev_s5_focus_faith_2`(기적 사칭 설교자 논파), `ev_s5_focus_lore_2`(암흑기 데이터 코어와 AI 경계), `ev_s5_focus_politics_2`(총독 대행 암살 밀서), `ev_s5_focus_forbidden_2`(이단심문소 불시 가택 수색).
     * **외계(Xenos) 서사 균형 확장 사건 (8종):** 타우 제국 2종(`ev_s5_xenos_tau_diplomat`, `ev_s5_xenos_tau_battlesuit`), 드루카리 2종(`ev_s5_xenos_drukhari_slavers`, `ev_s5_xenos_drukhari_haemonculus`), 네크론 2종(`ev_s5_xenos_necron_awakening`, `ev_s5_xenos_necron_trazyn`), 아엘다리(`ev_s5_xenos_aeldari_farseer`), 보탄 연맹(`ev_s5_xenos_votann_prospect`).
     * **카오스 배신자 아스타르테스 군단 특화 사건 (4종):** 데스 가드(`ev_s5_traitor_death_guard`), 알파 리전(`ev_s5_traitor_alpha_legion`), 나이트 로드(`ev_s5_traitor_night_lords`), 사우전드 선(`ev_s5_traitor_thousand_sons`).
  3. **`data/chronicles_deep.js` 심화 연대기 21종 추가 (178종 -> 199종 · 전체 `CHRONICLES` 382 -> 403종):**
     * 필멸자 가족·후계자 일상(3종: `ch_s5_bond_*`), 삶의 초점 2막 일상(6종: `ch_s5_focus_*`), 외계·배신자 군단 일상(12종: 타우 2 · 드루카리 2 · 아엘다리 2 · 네크론 1 · 보탄 1 · 배신자 4대 군단 4).
  4. **QA 자동 검증 결과 (`AGENTS.md` 6장 기준):**
     * **1~4게이트:** `index.html` 15개 스크립트 실존·`vm.Script` 구문 오류 0건, `js/ui.js` `#id` 셀렉터 78종 누락 0건, 금지 구표기·장식 기호·한국어 조사 불일치 0건, ID 중복·참조 무결성·`TAG_LABELS` 누락 0건.
     * **5게이트:** 전체 325종 분기·역사 사건 소프트락 0건, 신규 5단계 분기 사건 22종 및 연대기 21종 도달 가능성 100%, 크리그·아스타르테스·쿠스토데스·소로리타스·기계교의 가족 이벤트 오발동 차단 검증, `evaluateLifeGrade` 동적 추모 에필로그 8개 분기 단위 테스트 전원 통과.
     * **6게이트:** 250생애 `advanceQuarter` 스트레스 시뮬레이션 오류 0건, `maxRepeat = 2` 확인(신규 5단계 분기 사건 17종 · 연대기 16종 자연 발동 실측).

### 6단계 (2차 3단계): M41 초중반·M42 `TIMELINE` 대사건 · 성별/소외 행성/챕터 숙원 · 워프 항해 변주 `[완료]`
* **완성도:** **100% 완료** (계획된 3대 축 — 역사 대사건 5종, 분기 사건 14종, 일상 연대기 14종, `js/engine.js` `sister_of_silence` 부고·`warpYearShift`·워프 항해 변주 구현, 6대 QA 게이트 전 항목 0오류 통과)
* **완료 내역 (수정 파일 및 추가 콘텐츠):**
  1. **`data/timeline.js` M41 초중반 · M42 정식 역사 대사건 5종 추가 (19종 -> 24종 · 은하 원격 속보 완비):**
     * `tl_weirdwaaagh_columnus`(260.M41 콜룸누스 포지 월드 위어드와아아!), `tl_eisenhorn_malleus`(345.M41 트라시안 프리마리스 대승전식 참사와 케루바엘 봉인), `tl_second_tyranic`(992~993.M41 제2차 타이라니드 전쟁·하이브 함대 크라켄), `tl_pariah_nexus`(016.M42 파리아 넥서스 전역·정적), `tl_arks_of_omen_lion`(020.M42 징조의 방주와 라이온 엘 존슨 귀환).
  2. **`data/events_saga.js` 분기 사건 14종 추가 (59종 -> 73종 · 전체 `EVENTS` 306 -> 320종 / 역사 포함 325 -> 344종):**
     * **성별 · 침묵의 자매들 · 소로리타스 교단 (4종):** `ev_s6_sisters_of_silence_call`(여성 블랭크 전용 영입·`sister_of_silence` 부여), `ev_s6_sisters_of_silence_hunt`(침묵의 자매들 후속 알파급 사이커 사냥), `ev_s6_sororitas_order_choice`(아워 마터드 레이디/블러디 로즈/발로러스 하트 교단 선택), `ev_s6_gender_mortal_frontline`(제국 정규 무관 여성 전선 서사).
     * **소외 네임드 행성 3곳 집중 보강 (6종):** 화성 2종(`ev_s6_world_mars_noctis`, `ev_s6_world_mars_titan_walk`), 마크라그 2종(`ev_s6_world_macragge_hera`, `ev_s6_world_macragge_polar`), 녹턴 2종(`ev_s6_world_nocturne_time_of_trial`, `ev_s6_world_nocturne_salamander_kin`).
     * **9대 챕터 간 숙원 · 교차 공조 (4종):** 다크 엔젤 대 스페이스 울프 명예 결투(`ev_s6_chap_rivalry_da_sw`), 울트라마린 대 블랙 템플러 코덱스·성전 충돌(`ev_s6_chap_rivalry_um_bt`), 샐러맨더·임페리얼 피스트·블러드 엔젤 피난선 윤리 충돌(`ev_s6_chap_rivalry_sal_civilians`), 레이븐 가드·화이트 스카 합동 기습(`ev_s6_chap_rivalry_rg_ws`).
  3. **`data/chronicles_deep.js` 심화 연대기 14종 추가 (199종 -> 213종 · 전체 `CHRONICLES` 403 -> 417종):**
     * 성별·침묵의 자매들·소로리타스 4종(`ch_s6_sister_of_silence`, `ch_s6_sororitas_order`, `ch_s6_gender_frontline`, `ch_s6_blank_female_hush`), 화성·마크라그·녹턴 3종(`ch_s6_world_*`), 챕터 숙원·공조 4종(`ch_s6_chap_*`), 신규 역사 시대 3종(`ch_s6_era_columnus`, `ch_s6_era_kraken`, `ch_s6_era_arks_of_omen`).
  4. **`js/engine.js` 소규모 엔진 보강 — 워프 항해 이상 변주 & 침묵의 자매들 부고:**
     * `TAG_LABELS`에 `sister_of_silence`("침묵의 자매들")를 등록(총 116종)하고 `evaluateLifeGrade`에 전용 부고(`TALONS OF THE EMPEROR — ANATHEMA PSYKANA`, 맞춤 부고 15종 체제)를 추가했다.
     * `applyOutcome`과 `formatDeltaText`에 `warpYearShift`(생물학적 연령을 유지한 채 은하 표준 연도만 +2~3년 도약)를 추가하고, `createWarpAnomalyTransitEvent(state, destWorld)`를 신설해 `createDynamicTransitEvent`에 평시 10% / 대균열 이후 16% 확률로 **겔러 필드 요동** 또는 **워프 시간 왜곡**(995~1001 구간 대균열 건너뜀 방지 가드 포함)이 끼어들도록 결합했다.
  5. **QA 자동 검증 결과 (`AGENTS.md` 6장 기준):**
     * **1~4게이트:** `index.html` 15개 스크립트 실존·`vm.Script` 구문 오류 0건, `js/ui.js` `#id` 셀렉터 78종 누락 0건, 금지 구표기·장식 기호·한국어 조사 불일치 0건, ID 중복·참조 무결성·`TAG_LABELS` 누락 0건.
     * **5게이트:** 전체 344종 분기·역사 사건 소프트락 0건, 신규 역사 대사건 5종·분기 사건 14종·연대기 14종 도달 가능성 100%, 침묵의 자매들 남성 차단·전용 부고 검증, 워프 항해 이상 2종(`geller`·`dilation`) 및 `warpYearShift` 연도 도약/연령 보존 단위 테스트 전원 통과.
     * **6게이트:** 250생애 `advanceQuarter` 스트레스 시뮬레이션(무작위 180 + 아이젠혼 35 + 인도미투스 35) 오류 0건, `maxRepeat = 2`, 신규 역사 대사건 5종 전원(`5/5`) 자연 발동, 신규 분기 사건 12종·연대기 11종 및 워프 항해 이상 389회(생애당 평균 1.56회) 정상 발동 실측.

---

## 7. 3차 종합 안정화 · 밸런스 · 최적화 · UX 확장 로드맵 (7~10단계)

> **진행 기록 규칙 (`AGENTS.md` 1장 연계):** 코드 리뷰 및 시뮬레이션 진단을 바탕으로 도출된 P0~P3 개선 과제를 4개 단계로 분할해 순차 구현하며, 매 단계 완료 시 상태·실측 QA 결과·달성도를 즉시 동기화한다.

### 전체 진행 현황 요약

| 단계 | 구분 | 상태 | 완성도 | 핵심 목표 |
| --- | --- | --- | --- | --- |
| **7단계 (P0)** | 버그 · 상태/로어 정합성 수정 | `[완료]` | 100% (7대 결함 전량 해소 · QA 0오류) | `imperial_nihilus` 동기화, `describeReq` 누락 키(16건) 수정, `archmagos`->`magos`, `schola` 18세 졸업, `forceCareer` 강등/태그 보완, 크리그 출생 정합성, 연표 순서·UI 수치 동기화 |
| **8단계 (P1)** | 접근성 · 자동저장 · 하이브리드 생존(위기 24종) · 유년기 보강 | `[완료]` | 100% (전 항목 완료 · QA 0오류 · 유년기 중복 21.3%) | 포커스 유실 2건 해결, 부고 모달 `inert`/트랩, 장식 기호 제거, 자동 저장·이어하기, 2,400건 로그 보존, 전선·환경·비전투 치명 위기 사건 24종 + 회복/노화 경량 보정, 유년기 연대기 68종 + 유년기 빠른 진행 |
| **9단계 (P2)** | 성능 최적화 · GitHub Pages 웹폰트 · QA 자동화 | `[완료]` | 100% (1,000분기 67.1% 단축 · `scripts/qa.js` 0오류) | `Map` O(1) 인덱싱, `checkReq` 컨텍스트 캐시, 파티션 버킷, 이벤트 확률 선판정, UI 이벤트 위임·지연 렌더링, `index.html` 병렬 웹폰트 로드·레거시 CSS 정리, `scripts/qa.js` 상설화 |
| **10단계 (P3)** | 기록 내보내기 · 영혼의 전당 도감 · 편의 옵션 | `[완료]` | 100% (전 항목 완료 · `scripts/qa.js` 91종 `#id`·300생애 0오류) | 생애 기록서 텍스트 복사/`.txt` 저장, 영혼의 전당 도감 달성률·미해금 힌트·영혼 상세 열람, `새 진로 해금 알림/일시정지` 등 편의 설정 영구 저장 |

* **3차 종합 개선 전체 누적 완성도:** `4 / 4 단계 완료 (100%)`

### 7단계 (P0): 버그 · 상태/로어 정합성 전면 수정 `[완료]`
* **완성도:** **100% 완료** (7대 결함 전량 해소, 단위 테스트 및 40생애 검증 0오류)
* **완료 내역:**
  1. **`js/engine.js`:** `syncImperialNihilus(state)` 신설 및 탄생·이동·워프 도약·대균열 개방 전 경로 연동(`imperial_nihilus` 불일치 3,855분기 -> **0분기**), `WORLD_TAG_LABELS` 및 `describeReq(req)` 전 조건 키(`anyTags`·복합 `or` 등) 완전 지원(빈 출력 16건 -> **0건**), `forceCareer` 상위 티어·초인 강등 차단 및 `onJoin.addTags` 자동 병합, `schola` 18세 졸업 자동 배치 폴백, 크리그 비타-움 탄생 로그 분기, `incrementRejuvenat` 횟수 연동.
  2. **`data/origins.js`:** 크리그·야만·낙원 행성에 부적합한 무작위 출신 배제(`excludeWorlds`·`excludeWorldTags`).
  3. **`data/events.js`, `data/events_saga.js`, `data/chronicles_deep.js`, `data/timeline.js`:** `"archmagos"` -> `"magos"`(2건), `ev_blank_recruit`/`ev_inquisition_recruit`/`ev_schola_scout` 정합성 보강, `ev_rejuvenat_offer` 시술 횟수 연동, `tl_cain_valhalla`(931)↔`tl_armageddon_2`(941) 연대순 교정, `tl_tanith_fall` `'타니스 퍼스트 앤드 온리'` 표준명 통일.
  4. **`js/ui.js`, `index.html`:** `dangerTags`에 `mark_slaanesh` 추가, 크리그 탄생 토스트 분기, 시작 화면 수록 건수 현행화.

### 8단계 (P1): 스크린 리더 접근성 · 자동 저장 · 하이브리드 생존(위기 24종) · 유년기 보강 `[완료]`
* **완성도:** **100% 완료** (접근성·자동저장·로그 보존·24종 치명 위기·68종 유년기 연대기 구현, QA 6대 게이트 0오류 통과)
* **완료 내역:**
  1. **스크린 리더 접근성 & 포커스 보존 (`js/ui.js`, `index.html`, `styles.css`, `js/engine.js`):**
     * `#focus-grid` 최초 1회 DOM 생성 후 `classList`/`aria-pressed` 부분 갱신 + 위임 클릭으로 초점 전환 시 포커스 유실 제거.
     * `#sel-travel-world`에 `<label class="sr-only">` 추가 및 행성 변경 시 승인율·버튼만 부분 갱신해 드롭다운 포커스 유실 제거.
     * 부고 모달 개방 시 배경 `.top-header`/`.view-section`에 `inert` + `aria-hidden` 부여, `Tab`/`Shift+Tab` 포커스 트랩, 닫기 시 이전 포커스 복원.
     * `announce()` 타이머 충돌 방지(`clearTimeout`), `MAX_LOGS` 도달 시에도 `prevTopLog` 비교로 자동 알림 유지, `FOCUSES.forbidden.desc` 화살표 기호 제거 및 `.feature-list li::before` 스크린 리더 발화 차단(`content: "▸ " / ""`).
  2. **진행 중 생애 자동 저장 & 장수 로그 영구 보존 (`js/ui.js`, `js/engine.js`, `index.html`, `styles.css`):**
     * `localStorage` 키 `imperium_vita_active_v1`(진행 중 생애 자동 저장) 및 `imperium_vita_prefs_v1`(편의 옵션) 도입, 시작 화면 `#resume-banner`(이어하기/삭제) 추가.
     * `addLog` 상한 `480` -> `2,400`건 확대 및 초과 시 핵심 기록(`birth`/`career`/`death`/`event`/`success`/`danger`) 영구 보존·일반 일상 로그만 선별 정리(2,550분기 장기 테스트 `birthPreserved = true`).
  3. **하이브리드 생존 밸런스 (`data/events_saga.js`, `data/events.js`, `js/engine.js`):**
     * `data/events_saga.js`에 치명적 위기·참사 분기 사건 **24종** 추가(전선·데스월드 8종 + 행성·환경 다중해법 8종 + **비전투 루트 전용 위기 8종**, 전체 `EVENTS` 320 -> **344종** / 역사 포함 **368종**).
     * `computeLifeExpectancy` 강인(T) 보정 상한(`-8~+18`), 청·장년 기본 자연 회복(`+3/년`), 고령 회복 점감 및 비선형 노화, `ev_rejuvenat_offer` 고위층 권위 기준(`Inf 58+`) 정렬.
  4. **유년기 연대기 대폭 보강 + 선택형 유년기 빠른 진행 (`data/chronicles_deep.js`, `js/engine.js`, `js/ui.js`, `index.html`):**
     * 소외 행성(바알·카타찬·녹턴·야만·보이드본·포지·크리그·낙원·표준) 및 중첩 연령대(1~8세/4~13세) 유년기 연대기 **68종** 추가(`CHRONICLES` 417 -> **485종**).
     * `#chk-fast-childhood`(`유년기 빠른 진행 (0~13세 연 1분기)`) 추가(0~13세 13틱 돌파 검증).
  5. **QA 검증 결과:**
     * 정적·구문·DOM `#id`·금지 표기·장식 기호·크리그 정합성·소프트락 **전 항목 0오류**.
     * 전 22개 행성 2세·10세 최소 풀 각 **6종+**, 100생애 유년기 중복률 **71% -> 21.3%** 달성(목표 30% 이하 대폭 초과 달성).
     * 150생애 멀티-초점 시뮬레이션: `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, 비생존 초점 필멸자 중위 수명 `combat 42세 / politics 49세 / lore 57세 / faith 57세`(위기 치사율 50~67%).

### 9단계 (P2): 성능 최적화 · GitHub Pages 병렬 웹폰트 · CSS 정리 · 상설 QA 자동화 `[완료]`
* **완성도:** **100% 완료** (1,000분기 처리 시간 **67.1~80.3% 단축**, `scripts/qa.js` 6대 게이트·300생애 시뮬레이션 **0오류**)
* **완료 내역:**
  1. **`js/engine.js` 엔진 최적화:**
     * `WORLD_BY_ID`, `WORLD_TAG_SET_BY_ID`, `ORIGIN_BY_ID`, `TRAIT_BY_ID`, `CAREER_BY_ID`, `CHAR_BY_ID`, `CHAPTER_BY_ID`, `EVENT_BY_ID` O(1) `Map` 인덱스 구축.
     * `buildPoolIndex`로 `EVENTS`·`CHRONICLES`를 무손실 파티션(`byChapter` / `byWorld` / `byCareer` / `general`)으로 분할하고, `makeReqContext(state)`를 `checkReq(state, req, ctx)`에 전달해 중복 조회 제거.
     * `advanceQuarter`에서 `Math.random() < eventChance`를 `EVENTS` 필터 이전으로 선판정해 미발동 분기(~72%)의 이벤트 스캔을 생략하고, `getContextualOptions`를 단일 패스로 통합해 `lockedCareers`를 함께 반환.
     * **실측 벤치마크:** 1,000분기 `advanceQuarter` 실행 시간 **981.8ms -> 193.5~323.5ms (67~80% 단축, 3~5배 가속)**.
  2. **`js/ui.js` 이벤트 위임 & 지연 렌더링:**
     * `#active-event-wrap`, `#auto-careers-wrap`, `#auto-actions-wrap`, `#auto-travel-wrap`(`change`/`click`)의 모든 리스너를 `bindEvents()` 1회 위임으로 전환.
     * `#all-careers-preview`는 `#locked-careers-details`가 열려 있을 때(`open === true`) 및 `toggle` 시에만 지연 렌더링하도록 전환.
  3. **`index.html`, `styles.css` 웹폰트 병렬화 및 레거시 CSS 정리:**
     * `styles.css` 1행의 렌더 차단 `@import`를 제거하고 `index.html` `<head>`에 `<link rel="preconnect">` + 병렬 `<link rel="stylesheet" ... &display=swap>`으로 이전.
     * 개편 전 미사용 레거시 CSS 셀렉터(`.hero-top h1`, `.mode-card h2`, `.log-filter-row`, `.sub-tabs`, `.sub-tab-btn`, `.career-filter-row`) 제거.
  4. **`scripts/qa.js` 상설 자동 검증 스위트 신설:**
     * 브라우저에 로드되지 않는 Node.js 전용 `scripts/qa.js`를 추가해 `node scripts/qa.js` 한 번으로 6대 게이트 + 300생애 멀티-초점 시뮬레이션 + 1,000분기 성능 벤치마크를 자동 실행.

### 10단계 (P3): 기록 텍스트 내보내기 · 영혼의 전당 도감화 · 편의 옵션 확장 `[완료]`
* **완성도:** **100% 완료** (전 기능 구현 및 `node scripts/qa.js` 6대 게이트 최종 **0오류** 통과)
* **완료 내역:**
  1. **생애 기록서 텍스트 복사 & `.txt` 파일 저장 (`index.html`, `js/ui.js`):**
     * `#view-chronicle`에 `#btn-copy-chronicle`·`#btn-export-chronicle`, 부고 모달에 `#btn-obit-copy` 추가.
     * `buildPlainTextChronicle(charState)`로 프로필·8대 특성치·최종 등급·방문 행성·목격 역사·네임드 인물·장별 전체 연대기를 순수 한국어 텍스트로 포맷팅(장식 기호 0건).
     * `copyTextWithFallback()`으로 최신 Clipboard API와 `file://` 환경용 `<textarea>` 폴백을 모두 지원하고, Blob 기반 `.txt` 다운로드를 제공.
  2. **영혼의 전당 도감화 & 과거 영혼 상세 조서 (`index.html`, `js/ui.js`, `styles.css`):**
     * `#hall-summary`를 5개 지표(생애 수 / 탐방 행성 22 / 달성 병종 27 / 서약 챕터 9 / 역사 24·인물 20)로 확장.
     * `#hall-codex-wrap`에 접이식 `<details class="hall-codex-box">`를 추가해 전체 도감 수집률 및 미달성 병종·챕터·네임드·역사·행성 해금 힌트를 표시.
     * 각 영혼 카드 하단에 `<details class="hall-detail">`을 추가해 부고 판정문·8대 특성치·소속 챕터·방문 행성·목격 역사·조우 인물·주요 이력을 펼쳐 볼 수 있게 확장(기존 `imperium_vita_hall_v1` 레코드 100% 하위 호환).
  3. **새 진로 해금 알림 및 자동 일시정지 (`index.html`, `js/ui.js`):**
     * `.pref-toggles`에 `#chk-career-alert`(`새 진로 해금 시 알림·일시정지`) 추가(`imperium_vita_prefs_v1` 영구 저장).
     * `knownUnlockedCareerIds` Set으로 분기 진행 중 신규 해금된 동급·상위 진로를 감지하면 자동 일시정지 후 `#sr-live` 및 토스트로 즉시 안내.
  4. **최종 QA 통합 검증 (`node scripts/qa.js`):**
     * 15개 스크립트 구문·로드 순서·CSS 0오류, `js/ui.js` **91종 `#id`** DOM 대조 0오류, 금지 표기·장식 기호·크리그 정합성 0오류, ID/참조/태그/`describeReq`/연표/`forceCareer` 0오류, 소프트락 0건, 전 22개 행성 유년기 최소 풀 **6종+**·중복률 **19.8%**, 300생애 스트레스 시뮬레이션(`nihilusMismatch = 0`, `scholaStuck = 0`, `maxRepeat = 2`, `1,000분기 = 193.5ms`) **전 항목 0오류 통과**.

---

## 8. 4차 내부 아키텍처 효율화 로드맵 (11단계: 데이터 계층형 분할 · 확장 자동화)

> **목표:** 향후 대규모 콘텐츠 추가(직군·행성·챕터별 심화 및 외계 종족 스타팅 등)에 대비해, `file://` 무서버 · 클래식 `<script>` 원칙을 100% 유지하면서 비대해진 단일 사건·연대기 JS 파일을 **도메인(세력·권역·주제)별 계층 폴더**로 무손실 분리하고, `<script>` 자동 동기화 및 QA 용량/고아 파일 감시 체계를 구축한다.

### 전체 진행 현황 요약

| 단계 | 구분 | 상태 | 완성도 | 핵심 목표 |
| --- | --- | --- | --- | --- |
| **11단계** | 데이터 계층형 분할 · 태그 사전 분리 · 스크립트/QA 자동화 | `[완료]` | 100% (5대 목표 전량 완료 · 등가성 0 diff · QA 0오류/0경고) | `data/tags.js` 분리, `data/events/`(19파일)·`data/chronicles/`(8파일) 무손실 계층 분할, `scripts/sync-scripts.js` 신설, `scripts/qa.js` 고아 파일·용량 감시 확장, 100% 등가성 및 6대 QA 게이트 검증 |

* **4차 내부 아키텍처 효율화 전체 누적 완성도:** `1 / 1 단계 완료 (100% · 잔여 범위 없음)`

### 11단계: 데이터 계층형 분할 · 태그 사전 분리 · 스크립트/QA 자동화 `[완료]`
* **완성도:** **100% 완료** (사건 344건·연대기 485건 무손실 이관 `diff = 0`, 최대 사건 파일 `326KB -> 80.1KB`(75.4% 축소), 최대 연대기 파일 `112KB -> 40.2KB`(64.1% 축소), `sync-scripts --check` 및 `qa.js` 6대 게이트 0오류·0경고 통과)
* **완료 내역:**
  1. **`data/tags.js` 신설 & `js/engine.js` 경량화:**
     * `js/engine.js`에 내장되어 있던 `TAG_LABELS`(116종)와 `WORLD_TAG_LABELS`(46종)를 `data/tags.js`로 독립 분리(`engine.js` 2,812줄 -> 2,648줄).
     * 향후 신규 이벤트·이력 태그·외계 종족 태그 추가 시 `engine.js` 수정 없이 `data/tags.js`에서만 완결 가능.
  2. **분기 사건 도메인별 계층 분할 (`data/events/` 4개 하위 폴더 · 19개 파일, 총 344건 무손실 이관):**
     * 구 단일 파일 4종(`events.js`, `events_extra.js`, `events_deep.js`, `events_saga.js`) 제거 및 순서 독립적 자기 등록 헤더 통일.
     * `careers/`(7파일 · 97건): `militarum`(17 · 32.7KB), `astartes`(15 · 30.2KB), `talons_knights`(9 · 20.1KB), `inquisition`(12 · 26.8KB), `mechanicus`(12 · 23.6KB), `ecclesiarchy`(10 · 18.3KB), `civil_void`(18 · 32.7KB).
     * `chapters/`(1파일 · 31건): `chapters_core`(31 · 66.3KB).
     * `worlds/`(4파일 · 50건): `solar`(15 · 28.2KB), `ultima`(10 · 19.2KB), `frontier`(11 · 21.5KB), `generic`(14 · 29.9KB).
     * `themes/`(7파일 · 166건): `arcs_focus`(34 · 80.1KB), `lifecycle`(33 · 75.7KB), `crises`(24 · 68.1KB), `named`(23 · 53.3KB), `chaos_warp`(20 · 48.0KB), `eras`(20 · 37.6KB), `xenos`(16 · 36.0KB).
  3. **일상 연대기 주제별 분할 (`data/chronicles/` 8개 파일, 총 485건 무손실 이관):**
     * 구 단일 파일 3종(`chronicles.js`, `chronicles_extra.js`, `chronicles_deep.js`) 제거 및 자기 등록 헤더 통일.
     * `childhood`(105 · 40.2KB), `careers`(101 · 38.9KB), `worlds`(79 · 31.0KB), `general`(70 · 30.0KB), `arcs_named`(56 · 21.2KB), `chapters`(33 · 12.2KB), `eras`(23 · 9.1KB), `lifecycle`(18 · 8.0KB).
  4. **확장 자동화 & QA 감시 강화 (`scripts/sync-scripts.js`, `scripts/qa.js`, `index.html`):**
     * `scripts/sync-scripts.js` 신설: `data/events/**`와 `data/chronicles/**`를 재귀 스캔해 `index.html`의 `DATA-EVENTS`/`DATA-CHRONICLES` 마커 구간을 자동 동기화(`--check` 검증 모드 포함). 향후 1:1 승격 파일(`careers/guardsman.js`, `worlds/cadia.js`, `chapters/ultramarines.js`)이나 외계 종족 스타팅 폴더(`data/events/xenos_start/`, `data/chronicles/xenos_start/`) 추가 시 자동 인식.
     * `scripts/qa.js` 확장: `data/tags.js` 로드 순서 검증, `data/events/`·`data/chronicles/` 미등록 고아 `.js` 탐지, 파일 크기/줄수 상한 경고(`110KB/2,200줄`, `70KB/1,400줄`), 출처 파일 기반 중복 ID 진단 추가.
  5. **무손실 등가성 & 최종 QA 검증 (`node scripts/sync-scripts.js --check && node scripts/qa.js`):**
     * 이관 전후 `EVENTS`(344건)·`CHRONICLES`(485건) 정규화 객체 비교 **`0 diffs`**.
     * 36개 스크립트 실존·순서·고아 0건·구문·CSS 0오류(`maxEv = 80.1KB`, `maxCh = 40.2KB`), `js/ui.js` 91종 `#id` 0오류, 금지 표기·장식 기호·크리그 정합성 0오류, ID/참조/태그/`describeReq`/연표/`forceCareer` 0오류, 소프트락 0건, 유년기 최소 풀 `6종+`·중복률 `20.7%`, 300생애 멀티-초점 시뮬레이션(`maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `1,000분기 = 154.2ms`) **전 항목 0오류·0경고 통과**.
     * `AGENTS.md`, `PROJECT_GUIDE.md`, `README.md` 최신 구조 동기화 완료.

---

## 9. 5차 인류제국 대확장 로드맵 (12~18단계) 및 단계별 진행 보고서

> **목표:** 11단계 계층형 데이터 구조와 1:1 단독 파일 승격 체계를 활용해, 인류제국 전 세력 풀 계급도(78종 선택 직군 · 하이 로드 10석 · 행성 총독/섹터 로드 공훈 횡단 · CSM/컬트 분리 · 데몬 프린스) 및 이벤트 기반 진로 제안 엔진을 구축하고, 계급·전 계급 대비(`anyPastCareers`) 서사 · 네임드 15행성 · 9대 챕터 · **3대 도덕 성향(`자비 · 교조 · 암흑`)** · 신규 4대 상징 세력 · M41~M42 역사 연표 및 네임드 크로스오버 밀도를 전면 확충한다.
> **확정 설계 결정 (사용자 승인):**
> 1. **아스타르테스 4대 전문 직책(12단계 완료):** `astartes_brother` 계열에서 전용 임명 분기 및 태그(`role_chaplain`, `role_apothecary`, `role_techmarine`, `role_librarian` — 블랙 템플러 라이브러리안 차단)로 확장.
> 2. **전 세력 풀 계급도 · 이벤트 기반 진로 제안 · 평행 횡단(13단계 완료):** 기존 27개 직군 ID를 100% 보존하면서 17개 트리 **78종 선택 직군(유년기 포함 79종)**으로 확장. 하이 로드 10석, 워마스터, 챕터 마스터, 슈프림 그랜드 마스터, 행성 총독→섹터 로드 공훈 횡단, 로그 트레이더·이단심문소 평행 횡단, 필멸자 카오스 컬트 vs 배신자 아스타르테스(CSM)/카오스 로드 분리 및 데몬 프린스 승천 루트를 구축하고, 상위·횡단 직책은 `createDynamicCareerOfferEvent`로 자연스럽게 제시한다.
> 3. **계급별 · 전 계급 대비 서사(14단계 완료):** `anyPastCareers`/`excludePastCareers`를 활용해 옛 계급과 새 계급의 시야·권한·책임 차이를 대비하는 계급 승급·횡단 전용 사건과 연대기를 대폭 확충했다.
> 4. **워해머 40k 정통 3대 성향 시스템(16.5단계 완료):** 기존 `황제 신앙(faith)`·`워프 오염(corruption)`과 역할을 분리한 3축 독립 누적 성향(`humane` 자비 · `dogmatic` 교조 · `ruthless` 암흑, 각 0~100)을 도입했다. 공통 이벤트 풀을 유지하면서 `alignBias` 소프트 가중치 + 성향 전용 루트 + 평판 연대기 + 특수 진로 `or` 우대·오퍼 정합성 필터 + 3성향 맞춤 부고 에필로그까지 구축해 17·18단계 콘텐츠와 즉시 연동한다.
> 5. **임페리얼 나이트 출생 행성 & 리빙 세인트(17단계 예정):** 신규 기사 행성 `generic_knight` 추가(총 22 -> 23행성) + 유년기 연대기 6종+ 확보, 신규 4대 세력(`navis_navigator`, `officio_assassinorum`, `imperial_knight`, `living_saint`) 풀 트리 추가(16.5단계 3대 성향과 연계).
> 6. **1:1 파일 승격 & GitHub 단계별 보고:** 15~20건 이상 커지는 직군·행성·챕터는 즉시 단독 파일로 승격하며, 매 단계 완료 시 본 문서 갱신 + QA 6대 게이트 0오류 통과 후 GitHub(`origin/main`)에 즉시 커밋·푸시한다.

### 전체 진행 현황 요약

| 단계 | 구분 | 상태 | 완성도 | 핵심 목표 및 실적/예정 규모 |
| --- | --- | --- | --- | --- |
| **12단계 (5차 1단계)** | 기존 27개 직군 전면 심화 · 아스타르테스 4대 직책 · 가드맨 연대 특화 | `[완료]` | 100% (목표 +54 초과 달성: **+64사건 · +40연대기 · +12태그 · QA 0오류**) | 얇은 직군 14종 집중 보강, 가드맨 6대 연대 특화(`guardsman.js` 1:1 승격), `rogue_trader.js` 단독 승격, 아스타르테스 4대 직책 분화 + 맞춤 부고 4종 |
| **13단계 (5차 2단계)** | 전 세력 풀 계급도(78종) · 이벤트 기반 진로 제안 · 평행 횡단 · 엔진/UI 개편 | `[완료]` | 100% (**78종 선택 직군 · 17개 트리 · +39태그 · +4연대기 · 6대 QA 0오류/0경고**) | 17개 트리 78종 선택 직군(하이 로드 10석·워마스터·행성 총독/섹터 로드·CSM/컬트 분리·데몬 프린스), `createDynamicCareerOfferEvent`, `anyPastCareers`/`excludePastCareers`, 엔진 데이터 주도화, UI `<details>` 그룹화·`careerHistory` 도감 집계·기존 `anyCareers` 호환 보정 · 밸런스 튜닝 |
| **13.5단계 (선행 보정)** | 1,500생애 심층 감사 기반 밸런스 · 도달성 정밀 보정 | `[완료]` | 100% (**하이 로드 22.8% -> 4.0% · T6 44.6% -> 9.7% · forbidden 이단 1% -> 77% · 데몬 프린스 0 -> 38명 · QA `--deep` 0오류**) | `forbidden` 유년기(12세 미만) 오염 완화·고오염 제어, 길드/심문소/국교/총독/하이 로드 인플레이션 차단, `ev_chaos_whispers` 미낙인 이단자 우선도·저항 조건 교정, `adeptus_custodes`·`daemon_prince` 도달 창 보정, `anyPastCareers` 사건 가중치 우대 |
| **14단계 (5차 3단계)** | 계급별 · 전 계급 대비(`anyPastCareers`) 전용 서사 & 연대기 대확장 | `[완료]` | 100% (목표 +60/+55 초과 달성: **+68사건 · +61연대기 · 78/78 직군 100% · 167/167 태그 100% 회수 · 2종 독립 감사 P0/P1 전량 해소 · QA `--deep` 0오류**) | 신규 사건 5파일(`high_lords`, `governor`, `militarum_ranks`, `transhuman_faith_ranks`, `chaos_ranks`) + 연대기 1파일(`careers_ranks`) 신설, 직접 사건 0건이던 19개 직군 및 미회수 태그 전량 해소, 하이 로드 10석·총독/섹터 로드·로그 트레이더·초인/신앙/카오스 중상위 및 `anyPastCareers` 대비 연작 완비 |
| **14.5단계 (전수 검수)** | 전체 500사건 · 590연대기 고증 · 연대기 · 신분 정합 · 문체 · TTS 일괄 교정 | `[완료]` | 100% (**33개 파일 교정 · 기존 ID 100% 보존 · 발화 괄호/약어/오표기 0건 · `qa.js --deep` 7대 게이트 0오류·0경고**) | Read-Only 독립 교차 감사 8기 전수 분석 후 7개 병렬 작성 슬라이스 + 공유 파일 일괄 교정: `excludeHomeWorlds` 엔진/QA 가드, 쿠스토데스·그레이 나이트 오염 면역, 카오스 상위 강등 차단, M41~M42 연대기·신분 누수·중복 플롯·동음이의어·표준 표기·단일 판정 라벨 전면 정비 |
| **15단계 (5차 4단계)** | 네임드 15행성 & 파견 전용 연작 대확장 | `[완료]` | 100% (목표 +48 초과 달성: **+51사건 · +45연대기 · 핵심 4행성 1:1 승격 · 15행성 파견 3건+ · 2종 독립 감사 PASS · QA `--deep` 0오류**) | 핵심 4행성(`terra`/`cadia`/`krieg`/`armageddon`) 1:1 단독 파일 승격 + 15개 네임드 행성 파견(`anyWorlds`) 연작·연대기(`worlds_dispatch.js`) 대확충 |
| **16단계 (5차 5단계)** | 9대 챕터 1:1 승격 · 초인 초장수기 · 카오스 4대 신/CSM 엔드게임 | `[완료]` | 100% (목표 +45/+36 초과 달성: **+49사건 · +38연대기 · 9대 챕터 1:1 승격 · 총 600사건 돌파 · 2종 독립 교차 감사 전량 해소 · QA `--deep` 0오류**) | 9대 챕터 1:1 단독 파일 승격(각 6종 + 합동 공조 6종), 140~400세+ 초장수기(`longevity.js`), 카오스 4대 신 2막·배신자 군단·데몬 프린스 엔드게임(`chaos_ranks.js` · `chaos_endgame.js`) 완비 |
| **16.2단계 (접근성 · 안정화)** | 전 패널 포커스 보존 · 상태 요약 듣기 · 초장수 명예 마감 · 저장 견고화 · CI | `[완료]` | 100% (**6대 핵심 결함 전량 해소 · UI `#id` 96종 0오류 · `qa.js --deep` 7대 게이트 0오류·0경고 · GitHub Actions CI 신설**) | 진로/행동/스탯/태그/잠긴 진로 시그니처 비교+포커스 복원 & 실시간 기록 증분 `prepend`, `현재 상태 요약 듣기`, 초장수 자발적 명예 마감(`retire_honorable`) & `다음 사건까지 진행`, `saveVersion: 2`·`migrateState`·실패 경고·`.json` 백업, `qa.js` 무효 ID 10곳 교정, `.github/workflows/qa.yml` |
| **16.5단계 (선행 확장)** | 워해머 40k 정통 3대 성향 시스템 (`자비 · 교조 · 암흑`) 도입 | `[완료]` | 100% (**+3태그 · +30사건 · +27연대기 · 기존 113건 선별 태깅 · 2종 교차 감사 및 2단 레드팀 결함 전량 해소 · `qa.js --deep` & `audit-health.js` 0오류**) | 3축 누적 성향(`humane`/`dogmatic`/`ruthless`, `SAVE_VERSION = 3`), `alignBias` 소프트 가중치 + 성향 전용 루트 + 10직군 `or` 지름길·오퍼 필터 + 좌측 3분할 게이지/배지/기록서/부고 연동 + 레드팀 발견 초인 오염 면역 우회·포커스 폴백·전당 2단계 초기화 가드 동시 해소 |
| **17단계 (5차 6단계)** | 인류제국 신규 4대 세력 풀 트리 & 기사 행성 추가 | `[완료]` | 100% (**+4세력/+13직군[21트리·91직군·12하이 로드] · +1행성 · +1출신 · +19태그 · +36사건 · +33연대기 · 2종 교차 감사 및 2단 레드팀 P0/P1 전량 해소 · `qa.js --deep` & `audit-health.js` 0오류**) | `navis_navigator`(파테르노발 특사), `officio_assassinorum`(4대 템플·그랜드 마스터), `imperial_knight`(+`generic_knight` 행성·`knight_house` 출신), `living_saint`(3대 성향 위상 연동·오염 면역) 풀 트리 + 전직 격리 SSOT + 이동 패널 포커스 보존 + `byTag` 버킷 최적화 |
| **18단계 (5차 7단계)** | M41~M42 핵심 역사 5종 · 신규 네임드 8인 · 정사 크로스오버 · 거시 파장 | `[완료]` | 100% (**+5역사[29대] · +2시대[9개] · +8인물[28인 100%] · +10태그[199/199] · +28사건[670/699] · +29연대기[762] · 2종 교차 감사 및 2단 레드팀 P1 4건 전량 해소 · `qa.js --deep` & `audit-health.js` 0오류**) | 고딕 전쟁·1차 아마겟돈(수치의 달들)·3차 타이라니드·옥타리우스·역병 전쟁 추가, 네임드 8인(28인 체제) 단독 조우·정사 크로스오버 8종·거시 결단 파장 12종·연대기 29종, 시대 프리셋 2종, 직접 조우 부고 우선화 및 실전 시뮬레이션 QA 강화 |
| **18.5단계 (아키텍처 · 개념 사전)** | Astro + React 아일랜드 전환 · 워해머 40k 개념 사전 48종 · 정적 코덱스 · 1~16배속 | `[완료]` | 100% (**9개 정적 SSG 라우트 · 개념 사전 8카테고리 48종 · 정적 페이지 번들 0KB 격리 · 1~16배속[1년=60초~3.75초] · 2종 교차 감사 및 2단 레드팀 전 결함 해소 · `qa.mjs --deep` · `audit-health.mjs` · Vitest 8/8 · `astro build` 0오류/0경고**) | 클래식 SPA -> Astro 5 + React 19 + 표준 ESM 무손실 전환(17~18단계 100% 통합), 48종 워해머 40k 개념 사전(`/glossary/`), 5대 정적 제국 코덱스(`/codex/**`), 영혼의 전당(`/hall/`), GitHub Pages CI/CD(`.github/workflows/deploy.yml`), Vitest 행동형 접근성 스위트 구축 |
| **18.6단계 (레드팀 후속 개선)** | 경량 포매터 분리 · Gate 8 번들 격리 · 전 5섹션 코덱스 포커스 · 인물 상태 고정 개념 링크 | `[완료]` | 100% (**코덱스·전당 초기 번들 `-119.2KB(-42.1KB gz)` 경량화 · Gate 8 `dist/` 자동 격리 검증 · 코덱스 5섹션 해시 포커스 · 인물 상태 고정 1~2개 개념 링크 · Vitest 10/10 · 0오류/0경고**) | `src/engine/formatters.js` SSOT 분리, `qa.mjs --only-dist`(Gate 8) CI/CD 편입, `CodexExplorer` 5개 전체 섹션 해시·`hashchange` `<h3>` 포커스, `DossierPanel` 하단 고정 1~2개 개념 사전 링크(`contextualGlossary.js`, 사건/직군 카드 링크 0건 유지) |

* **5차 인류제국 대확장 + 아키텍처 전환 전체 누적 완성도:** `13 / 13 단계 완료 (100% · 12~18.6단계 전량 완료, 차기 19단계 예정)`

### 12단계 (5차 1단계): 기존 27개 직군 전면 심화 · 아스타르테스 4대 직책 · 가드맨 연대 특화 `[완료]`
* **완성도:** **100% 완료** (예정 목표 `+54사건`을 초과해 **+64사건 · +40연대기 · +12태그 · 1:1 파일 승격 2종 · 아스타르테스 4대 직책 부고 4종** 구현, `sync-scripts --check` 및 `qa.js` 6대 게이트 0오류·0경고, 신규 전 항목 도달 가능성 100% 검증 완료)
* **완료 내역 (신설·수정 파일 및 추가 콘텐츠):**
  1. **`data/tags.js` & `js/engine.js` & `scripts/qa.js`:**
     * 신규 태그 12종(`role_chaplain`, `role_apothecary`, `role_techmarine`, `role_librarian`, `rogue_warrant_charter`, `interrogator_rank`, `arbites_judge`, `navy_commodore`, `admin_prefect`, `ganger_baron`, `tempestus_prime`, `psyker_primaris`)을 `data/tags.js`에 등록(`TAG_LABELS` 116 -> **128종**).
     * `js/engine.js` `checkReq`/`describeReq` 및 `scripts/qa.js`에 `excludeChapters` 조건 키를 추가(블랙 템플러의 라이브러리안 진입 원천 차단).
     * `evaluateLifeGrade(state)`에 아스타르테스 4대 전문 직책(채플린·아포세카리·테크마린·라이브러리안) 전용 맞춤 부고 4종 추가(맞춤 부고 15 -> **19종**).
  2. **1:1 단독 파일 승격 2종 신설 & `data/events/careers/`·`themes/chaos_warp.js` 분기 사건 +64종 추가 (전체 `EVENTS` 344 -> 408종 / 역사 포함 432종):**
     * **`data/events/careers/guardsman.js` [NEW · 1:1 승격 · 15건]:** 기존 가드맨 3건 이관 + **6대 유명 연대 특화 6종**(카디안·크리그·카타찬·발할라·타니스·보스트로야) + 일반 보병 심화 6종(리만 러스 호위, 야간 보초, 중화기 라스캐논, 토치카 사수, 오그린 분대원, 야전 분대장 대행).
     * **`data/events/careers/rogue_trader.js` [NEW · 1:1 승격 · 8건]:** 기존 2건 이관 + 신규 6종(변경 성계 식민지 선포, 콜드 트레이드 경매, 경쟁 가문 사략선, 보이드 괴수, 테라 영장 감사, 하층 갑판 봉기).
     * **`data/events/careers/militarum.js` (+9건 · 총 23건):** `tempestus_scion`(3: 프라임 시험·심문관 징발·타우록스 강습), `militarum_officer`(2), `pdf_trooper`(2), `commissar`/`lord_commissar`(2).
     * **`data/events/careers/astartes.js` (+9건 · 총 24건):** 아스타르테스 4대 직책 임명 분기(`ev_s12_astartes_specialist_call`) + 채플린·아포세카리·테크마린·라이브러리안 전용 연작 4종 + 스카웃(2)·중대장(2).
     * **`data/events/careers/talons_knights.js` (+6건 · 총 15건):** 그레이 나이트(3: 프로그노스티카·진명 해독·급진 심문관 충돌) + 쿠스토데스(3: 아퀼란 실드·섀도우키퍼·하이 로드 회의실).
     * **`data/events/careers/inquisition.js` (+4건 · 총 16건):** 어콜라이트(3: 심문자 승격·안전가옥 습격·스승의 금단 실험) + 이단심문관(1: 새 수행단 편성).
     * **`data/events/careers/mechanicus.js` (+4건 · 총 16건):** 아크마고스(2: 익스플로레이터 고대 조선소·파브리케이터 선거) + 테크프리스트(1: 기억 잔향 서비터) + 스키타리(1: 방사능 뱅가드).
     * **`data/events/careers/ecclesiarchy.js` (+3건 · 총 13건):** 소로리타스(1: 참회 엔진) + 캐노네스(1: 주교구 성유물 분쟁) + 국교 사제(1: 지하 공장 이단 논쟁).
     * **`data/events/careers/civil_void.js` (+9건 · 총 25건):** 갱단(2: 구역 두목·현상금), 아드미니스트라툼(2: 감사관·400년 전 사라진 행성), 아르비테스(2: 판관·요새 사수), 네이비(2: 함대 준장·표류 순양함), 노동자(1: 18시간 연장 노역).
     * **`data/events/themes/chaos_warp.js` (+2건 · 총 22건):** 생션드 사이커(프리마리스 인가 시험·아스트로패스 원격 비명 해독).
  3. **`data/chronicles/careers_specialists.js` [NEW · +40연대기] (전체 `CHRONICLES` 485 -> 525종):**
     * 6대 유명 연대 전용 일상(6종), 아스타르테스 4대 직책 일상(8종), 신규 승격·명예 태그 8종 회수 일상(8종), 얇은 직군 18개 집중 보강 일상(18종).
  4. **QA 자동 검증 & 단위 테스트 결과:**
     * `node scripts/sync-scripts.js --check` 통과 (`index.html` 39개 스크립트: 사건 21 + 연대기 9).
     * `node scripts/qa.js` **6대 게이트 0오류·0경고** (`maxEv = 80.1KB`, `maxCh = 40.2KB`, `orphans = 0`, 91종 `#id` 일치, 금지 표기·장식 기호·크리그 정합성·소프트락 0건, 300생애 시뮬레이션 `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `1,000분기 = 210.9ms`).
     * 단위 테스트: 신규 사건 64종·연대기 40종 **도달 가능성 100%**, 블랙 템플러 라이브러리안 차단 검증 통과, 아스타르테스 4대 직책 맞춤 부고 4종 전원 동작 검증 통과.

### 13단계 (5차 2단계): 전 세력 풀 계급도(78종) · 이벤트 기반 진로 제안 · 평행 횡단 · 엔진/UI 개편 `[완료]`
* **완성도:** **100% 완료** (기존 27개 직군 ID 100% 보존 + 신규 51개 계급·최고위 추가 = **17개 세력 트리 78종 선택 직군(유년기 포함 79종)**, `TAG_LABELS` +39종(128 -> **167종**), 최상위 기본 연대기 +4종(525 -> **529종**), 이벤트 기반 승급·평행 횡단·시련 판정 엔진 및 UI 그룹화·도감 누적 집계·밸런스 튜닝 완료, `sync-scripts --check` 및 `qa.js` 6대 게이트 **0오류·0경고** 통과)
* **완료 내역 (수정 파일 및 추가 시스템):**
  1. **전 세력 17개 트리 78종 풀 계급도 (`data/careers.js`, `data/tags.js`):**
     * **기존 28개 ID 100% 유지 + 51종 신규 계급 추가 (`CAREERS = 79`, 선택 가능 `78종`):**
       * `civil`(6): 노동자 → 길드 장인 → 상업 길드 거두 / 언더하이브 갱단원 → 갱단 두목 → 하이브 암흑가 거두
       * `militarum`(9): PDF → 가드맨 → 분대장(서전트) → 장교 → 장군 → **성전 워마스터** · **로드 커맨더 밀리탄트(하이 로드)** / 템페스투스 사이온 → 템페스투스 프라임
       * `commissariat`(4): 커미사르 생도 → 커미사르 → 로드 커미사르 → 총커미사르
       * `sororitas`(5): 노비티에이트 → 전투 수녀 → 셀레스티안·팔라틴 → 캐노네스 → **아베스 상크토룸(하이 로드)**
       * `ecclesiarchy`(4): 사제 → 고해사·선교사 → 성역 추기경 → **에클레시아크(하이 로드)**
       * `astartes`(6): 네오파이트 → 배틀 브라더 → 스쿼드 서전트 → 1중대 베테랑·터미네이터 → 중대장(캡틴) → **챕터 마스터**
       * `grey_knights`(4): 그레이 나이트 → 팔라딘 → 그랜드 마스터 → **슈프림 그랜드 마스터**
       * `custodes`(4): 쿠스토데스 → 워든·알라루스 → 실드-캡틴 → **캡틴-제너럴(하이 로드)**
       * `inquisition`(5): 어콜라이트 → 심문자(인터로게이터) → 이단심문관 → 로드 이단심문관 → **이단심문소 테라 대표(하이 로드)**
       * `mechanicus`(6): 스키타리 → 스키타리 마셜 / 테크프리스트 → 아크마고스 → 파브리케이터-로쿰 → **화성 파브리케이터-제너럴(하이 로드)**
       * `navy`(4): 사관 → 순양함 함장 → 전투함대 제독 → **로드 하이 애드미럴(하이 로드)**
       * `arbites`(4): 치안대 → 판관(저지) → 마셜 → **그랜드 프로보스트 마셜(하이 로드)**
       * `administratum`(4): 서기관 → 프리펙트 → 데파르트멘토 국장 → **마스터 오브 디 아드미니스트라툼(하이 로드)**
       * `governor`(2 · 공훈 횡단): **행성 총독(임페리얼 커맨더)** → **섹터 로드**
       * `rogue_trader`(3 · 공훈 횡단): 세네샬 → **로그 트레이더** → 왕조 총수(로드 캡틴)
       * `psyker`(3): 생션드 사이커 → 프리마리스 사이커 → **마스터 오브 디 아스트라 텔레파티카(하이 로드)**
       * `chaos`(5 · 필멸자/초인 분리): [필멸자] 카오스 컬티스트 → 카오스 챔피언 / [아스타르테스] 카오스 스페이스 마린(`renegade_marine`) → 카오스 로드 → **데몬 프린스 승천**
     * 전 직군 선언적 메타데이터(`tree`, `treeName`, `entryMode`, `transitTier`, `actionGroup`, `isTranshuman`, `titleSuffix`, `offerTitle`, `offerPitch`) 완비 및 `data/tags.js` 신규 계급·직책 태그 39종 등록(`TAG_LABELS = 167종`).
  2. **이벤트 기반 진로 제안 · 전 계급 대비 조건 · 데이터 주도 엔진 (`js/engine.js`):**
     * `checkReq`/`describeReq`에 `anyPastCareers`·`excludePastCareers` 추가(14단계 전 계급 대비 서사 기반 확보).
     * `advanceQuarter` 1.5순위에 `createDynamicCareerOfferEvent(state, reqCtx, options)` 신설: 동일 트리 승급, 공훈 평행 횡단(행성 총독·로그 트레이더·이단심문소 심문자), 초인 소환, 카오스 유혹 및 테라 하이 로드 인준 시련(`trialCheck`)을 동적 사건으로 제시하고, 거절 시 8년(`declinedCareers`), Tier 6 시련 실패 시 12년 쿨다운 적용. `attemptCareerChange`에서 `entryMode === "event"` 수동 우회 차단.
     * `getCareerDisplayTitle`, `getCareerAction`(25종 `actionGroup` 프로필), `getTravelProfile`, `createDynamicTransitEvent`, `canUseRejuvenat`, `canUseAugmetics`를 100% 선언적 메타데이터 주도 구조로 리팩토링.
     * `forceCareer` 아스타르테스→`renegade_marine` 자동 리다이렉트, 쿠스토데스·그레이 나이트 카오스 타락 면역, 데몬 프린스 오염 100 스폰화 사망 면역 구현.
     * `evaluateLifeGrade`에 데몬 프린스, 카오스 로드/CSM, 테라의 하이 로드, 성전 워마스터, 챕터 마스터, 슈프림 그랜드 마스터, 캡틴-제너럴, 행성 총독/섹터 로드 등 최상위 맞춤 부고 대폭 확충.
  3. **기존 사건·연대기 호환 보정 & 최상위 기본 연대기 (`data/events/**`, `data/chronicles/**`):**
     * 기존 9개 직군 사건 파일·`chaos_warp.js`·3개 연대기 파일의 `anyCareers`를 상위 계급까지 호환 확장(하수구 은신 컬티스트 연대기는 필멸자 `chaos_cultist`/`chaos_champion`으로 엄격 제한해 상황 정합성 유지).
     * 최상위 계급 기본 연대기 4종(`ch_s13_high_lord_council`, `ch_s13_governor_tithe`, `ch_s13_csm_warband`, `ch_s13_daemon_prince_warp`) 추가(`CHRONICLES` 525 -> **529종**).
  4. **UI 경량화 · 17개 세력 `<details>` 그룹화 · 영혼의 전당 누적 집계 (`js/ui.js`, `styles.css`, `index.html`):**
     * 우측 자율 선택 패널에는 즉시 전환 가능한 `entryMode !== "event"` 직군만 노출하고, 조건을 달성한 발탁·승급 대기 직책은 `.ready-offer-box` 배너로 안내(스크린 리더 및 `새 진로 해금 알림` 연동).
     * `#all-careers-preview`와 제국 코덱스 `careers` 탭을 17개 세력 트리별 `<details>` 아코디언으로 그룹화해 78종 계급도의 탐색성과 스크린 리더 접근성 확보.
     * `saveToHall`/`renderHall`이 `careerHistory` 전체를 보존·집계(기존 저장분 100% 하위 호환)하며, 부고 모달·전체 인생 기록서(`.txt` 내보내기)·영혼의 전당 상세 조서에 `거쳐 온 진로 궤적`을 출력.
  5. **밸런스 튜닝 · 78종 전수 감사 · QA 6대 게이트 결과 (`scripts/qa.js`):**
     * 필멸자 Tier 2~6 `lifeBonus`를 워해머 40k 고증에 맞게 보정(리주버냇 시술의 의미 복원), `inquisition_favor`/`rogue_trader`/`planetary_governor`/`master_of_administratum` 무분별한 횡단 에스컬레이터 차단, Tier 6 하이 로드 `trialCheck` 난이도(`diff: -32 ~ -35`) 및 오퍼 페이싱 조정.
     * 78종 선택 직군 전수 감사: `describeReq`·`getCareerAction`·`getTravelProfile`·직접 매칭 사건/연대기 누락 **0건**.
     * `node scripts/sync-scripts.js --check` 통과 (`index.html` 39개 스크립트), `node scripts/qa.js` **6대 게이트 0오류·0경고** (`maxEv = 80.1KB`, `maxCh = 44.5KB`, 91종 `#id` 일치, Gate 4 신규 단위 테스트 전원 통과, 유년기 중복률 `20.3%`, 300생애 멀티-초점 시뮬레이션 `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 1,272`, `reachedCareers = 53/78`, 필멸자 중위 수명 `31~57세`, 치명 사망률 `50~73%`, `1,000분기 = 279.5ms`).

### 13.5단계 (선행 보정): 1,500생애 심층 감사 기반 밸런스 · 도달성 정밀 보정 `[완료]`
* **완성도:** **100% 완료** (13단계 완료 직후 신설한 `node scripts/qa.js --deep` 1,500생애 감사에서 드러난 6대 구조적 편차를 전면 보정, `--deep` 7대 게이트 **0오류·0경고** 통과)
* **완료 내역 (수정 파일 및 핵심 보정 수치):**
  1. **`js/engine.js` (`FOCUSES.forbidden`, `advanceQuarter`, `createDynamicCareerOfferEvent`):**
     * `FOCUSES.forbidden`을 `woundsDelta: -1`, `corruptionDelta: 5`, `hazardMult: 1.2`로 조정하고, 12세 미만 유년기의 패시브 오염 상한을 연 `+2`, 이미 이단에 투신한 캐릭터(`heretic`/`chaos_aligned`)의 고오염 구간(`>= 80` 연 `+2`, `>= 92` 연 `0`)을 자동 감쇠해 미성년 조기 스폰화 사망을 막으면서도 사건·시련을 통한 카오스 최상위 승천 경로를 열었다.
     * `advanceQuarter` 사건 가중치에서 미낙인 이단자의 `ev_chaos_whispers` 가중치를 `5.0배`, 전 계급 대비(`anyPastCareers`) 사건 가중치를 `2.8배`로 우대했다.
     * `createDynamicCareerOfferEvent` 오퍼 간격(`minOfferGap`: 유년기 1년 / Tier 5+ 7년 / 기타 4년), Tier 4+ 고위직의 `chaos_cultist` 오퍼 차단, Tier 6 시련 실패 쿨다운 16년(`state.year + 8` + 기본 8년), 계열별 제안 확률(`daemon_prince: 0.28`, Tier 6: `0.025`, `isTranshuman: 0.24`, `chaos: 0.12`, 동일 트리 event `0.11`, 평행 횡단 Tier 5+ `0.022` / 기타 `0.032`)을 정밀 조율했다.
  2. **`data/careers.js` & `data/origins.js` & `data/events/themes/{chaos_warp,lifecycle}.js`:**
     * 하이 로드 10석, 워마스터, 행성 총독/섹터 로드, 길드 장인·거두, 이단심문관 계보, 국교/소로리타스 상위직, 로그 트레이더, 쿠스토데스, 카오스 챔피언·데몬 프린스 진입 요건 및 시련 난이도 보정(`terra_high_blood` 테라 한정 가중치 `0.5 -> 2.0`, `ev_rejuvenat_offer` `minAge: 54`·`Inf: 74`·`lifeBonusExtra: 45`).
     * `ev_chaos_whispers` 가중치 `26 -> 34`, 사대신 낙인 오염 `+20 -> +12`, 저항 선택지에 `excludeTags: ["heretic", "chaos_aligned"]`를 추가해 이단 루트의 낙인 획득 성공률을 현실화했다.
  3. **1,500생애 `--deep` 보정 전후 대조 결과:**
     * **Tier 6 도달:** `669명 (44.6%) -> 145명 (9.7%)` · **하이 로드 도달:** `342명 (22.8%) -> 60명 (4.0%)`
     * **데몬 프린스 승천:** `0명 -> 38명 (2.5%)` · **테라 200생애 쿠스토데스 단위 검증:** 귀족 영아 19명 -> 자격 3명 -> 오퍼 4회 -> 선발 1명
     * **`Focus=forbidden` 생존·이단 전환:** 중위 수명 `15세 -> 25세`, 이단 전환율 `1% -> 77%`
     * **비금단 초점 이단 오염 누수 억제:** `survival 24%->6%`, `combat 20%->4%`, `lore 20%->4%`, `politics 27%->6%`, `faith 0%`

### 14단계 (5차 3단계): 계급별 · 전 계급 대비(`anyPastCareers`) 전용 서사 & 연대기 대확장 `[완료]`
* **완성도:** **100% 완료** (예정 목표 `+60사건 · +55연대기`를 초과해 **+68사건 · +61연대기** 구현, 전체 `EVENTS = 476종`[역사 포함 **500종**] · `CHRONICLES = 590종` 달성, 78/78 직군 직접 사건·연대기 **100%**, `TAG_LABELS` 167/167 **100% 회수**, 독립 Read-Only 교차 감사 2종 P0/P1 전량 해소, `sync-scripts --check` 및 `qa.js --deep` 7대 게이트 **0오류·0경고** 통과)
* **완료 내역 (신설 파일, 감사 수정 및 QA 검증 결과):**
  1. **신규 계급별 · 전 계급 대비 분기 사건 5개 파일 신설 (`+68사건` · `EVENTS` 408 -> 476종 / 역사 포함 432 -> 500종):**
     * **`data/events/careers/high_lords.js` [NEW · 12건 · 51.3KB]:** 테라의 하이 로드 10석 개별 고유 사건 10종 + 원로원 공성·예산 암투(`ev_s14_hl_senatorum_deadlock`) + 길리먼 섭정과의 갈등·협조(`ev_s14_hl_regent_guilliman`, `minYear: 1001`). 각 의석별 하급 경력(`anyPastCareers`) 전용 선택지 및 `captain_general`·`fabricator_general` 태그 회수 연동.
     * **`data/events/careers/governor.js` [NEW · 14건 · 54.9KB]:** 행성 총독(4)·섹터 로드(3)·로그 트레이더 왕조(세네샬/로그 트레이더/로드 캡틴 3)·길드 장인/상업 거두(2)·언더하이브 두목/암흑가 거두(2) 전용 분기 및 군사·행정·하층 출신 `anyPastCareers` 대비 서사.
     * **`data/events/careers/militarum_ranks.js` [NEW · 15건 · 51.5KB]:** 밀리타룸 분대장·템페스투스 프라임·장군·워마스터(5), 커미사르 생도·총커미사르(2), 해군 함장·제독(2), 아르비테스 판관·마셜(2), 행정부 프리펙트·국장(3), 프리마리스 사이커(1) 계급 심화 및 사병/말단 대비 연작.
     * **`data/events/careers/transhuman_faith_ranks.js` [NEW · 17건 · 55.5KB]:** 아스타르테스 분대장·1중대 터미네이터·챕터 마스터·갱단 출신 마린 단절(4), 그레이 나이트 팔라딘·그랜드 마스터·슈프림 그랜드 마스터(3), 쿠스토데스 워든·실드-캡틴(2), 소로리타스 노비티에이트·셀레스티안(2), 국교 고해사·추기경(2), 심문소 심문자·로드 이단심문관(2), 기계교 스키타리 마셜·파브리케이터-로쿰(2).
     * **`data/events/careers/chaos_ranks.js` [NEW · 10건 · 42.9KB]:** 필멸자 카오스 챔피언(3) vs 타락 아스타르테스(CSM)·카오스 로드(4, 충성파 시절 `anyPastCareers` 대비 포함) vs 데몬 프린스(3, 워프 영토·필멸 신도 소환·위대한 게임) 2트랙 분리 및 엔드게임.
  2. **신규 계급·전 계급 대비 일상 연대기 파일 신설 (`data/chronicles/careers_ranks.js` [NEW · +61연대기 · 44.2KB] · `CHRONICLES` 529 -> 590종):**
     * 파트 A: `anyPastCareers` 전 계급 대비 일상 18종(`ch_s14_past_01~18`: 하층 노동자→길드 거두, 사병→분대장/장군/워마스터, 수련 수녀→셀레스티안/아베스, 충성파 마린→배신자 CSM, 서기관→국장/행정장관 등).
     * 파트 B: 테라 하이 로드 10석 개별 일상(10종), 행성 총독·섹터 로드(4종), 로그 트레이더 왕조(3종), 시민/길드/언더하이브(4종), 군사/커미사르/해군/아르비테스/행정/사이커 중상위(13종), 초인/신앙/카오스 정예·정점(8종) 및 테라 상류 귀족 영아(`custodes_candidate`) 전용 혈통 순도 심사(`ch_s14_rank_43`)까지 총 61종.
  3. **독립 Read-Only 교차 감사(고증/연대기 + 산문/스크린 리더 접근성) P0·P1 전량 해소:**
     * 연대기·고증 보정: 길리먼 섭정 사건 `minYear: 1001` 제한, 아베스/캡틴-제너럴/워마스터/그레이 나이트 사건의 시대착오적 특정 인물·사건(모르벤 발·트라얀 발로리스·마카리우스/슬레이도·수치의 달) 일반화, 루나급 순양함 무장(노바 캐논 근접전->매크로·랜스·선수 어뢰), 아스트라 텔레파티카 총관의 황금 옥좌·아스트로노미칸 역할 구분, `ch_s14_rank_12` 신분 누출 분리(`ch_s14_rank_43` 신설), `ch_s14_rank_15` 니힐루스 차단 및 직군 정합화, `ch_s14_rank_26` 스콜라 생도 연령·직군 정합화, 로드 이단심문관·파브리케이터-로쿰 실패 분기 실질 비용 보정.
     * 스크린 리더 접근성·표기 보정: TTS 괄호 병기(`(誤記)`, `(死地)`, `(Treaty of Mars)`, `(Vox)`, `(True Name)`, `(PDF)`, `(다크 셀)`, `(콜드 트레이드)`) 100% 제거, 동음이의어·오탈자(`분장`->`분담`, `수다`->`숫자다`, `성명`->`성호`, `옵스큐루스`->`옵스쿠루스`, `다크 메카니쿠스`->`다크 메카니쿰`, `프로메슘`->`프로메튬`, `마크로`->`매크로`, `프린켑스`->`프린셉스`, `마엘스톰`->`마엘스트롬`, `잊혀진`->`잊힌`) 일괄 교정.
  4. **최종 QA `--deep` 7대 게이트 검증 결과 (`node scripts/sync-scripts.js --check && node scripts/qa.js --deep`):**
     * **Gate 1~5:** `index.html` 45개 스크립트(사건 26 + 연대기 10) 동기화 일치, 고아 파일 0건, `maxEv = 80.1KB`, `maxCh = 44.5KB`, UI `#id` 91종 0오류, 금지 표기·장식 기호·크리그 정합성·소프트락 0건, 유년기 중복률 `18.7%`, `TAG_LABELS` **167/167 미회수 0건**.
     * **Gate 7A/7B:** 79직군 전직 도달 그래프 `65 anyPastCareers` 모순 0건, 전체 조건식 **1,288종** 합성 도달성 증명 완료, **`directCareerMatch(events = 78/78, chronicles = 78/78)` 100% 달성**.
     * **Gate 6/7C (1,500생애 멀티-초점):** `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 5,711`, `reachedCareers = 59/78`, `naturalEvents = 417/476`, `1,000분기 = 264.7ms`.
     * 분포 지표: `T4+ = 969`, `T5+ = 868`, `T6 = 147 (9.8%)`, `HighLord = 74 (4.9%)`, `Gov = 283`, `RT = 292`, `Astartes = 71`, `Custodes = 1`, `GK = 7`, `Chaos = 261`, `DaemonPrince = 25 (1.7%)`, `Focus=forbidden (allMed = 26세, heretic = 85%)`. **0 ERRORS · 0 WARNINGS.**

### 14.5단계 (전수 검수): 전체 500사건 · 590연대기 고증 · 연대기 · 신분 정합 · 문체 · TTS 일괄 교정 `[완료]`
* **완성도:** **100% 완료** (전체 분기 사건 476종 + 역사 대사건 24종 = **500사건** 및 일상 연대기 **590종** 대상 독립 Read-Only 감사 8기 교차 전수 분석 후 33개 파일 일괄 수정 완료, 기존 ID 100% 보존, 발화 텍스트 영문/한자 괄호·영문 약어·단위 약어·비표준 표기·이중 판정 라벨·장식 기호 **전 항목 0건**, `sync-scripts --check` 및 `qa.js --deep` 7대 게이트 **0오류·0경고** 통과)
* **완료 내역 (엔진·QA 보강, 33개 파일 교정 및 최종 QA 검증 결과):**
  1. **시스템 레벨 3대 원천 가드 구축 (`js/engine.js`, `scripts/qa.js`):**
     * `checkReq`/`describeReq` 및 QA Gate 4·7B에 `excludeHomeWorlds` 지원 추가: 타 행성 파견 중인 크리그 출생자(`homeWorldId === "krieg"`)에게도 비타-움 정합성 보호 적용.
     * `applyOutcome`에서 쿠스토데스(`custodes`) 및 그레이 나이트(`grey_knight`)의 양(+) 오염 면역 강제, 카오스 상위 계급(`daemon_prince`/`chaos_lord`/`chaos_champion`)의 `forceCareer` 하위 강등 원천 차단.
  2. **전수 고증 · 연대기 · 신분 정합성 · 플롯 중복 교정 (`data/events/**` 22파일, `data/timeline.js`, `data/chronicles/**` 8파일):**
     * **연대기 보정:** 타이라니드(`minYear: 745`), 타우(`minYear: 742`·울티마), 네크론(`minYear: 897`), 아마겟돈 전후 사건·연대기(`minYear: 942`), 보탄 연맹(`minYear: 999`), 카디아 존속 사건(`maxYear: 999`), 타니스 멸망(`exactYear: true`·`765.M41`), 아이젠혼(`maxYear: 495`), 라이온 귀환(`minYear: 1020`), 바스티오르(`minYear: 1028`), 대균열 상크투스 33일 vs 니힐루스 영구 암흑, 바알 시간 왜곡, 비질루스 80일 악몽 공성전, 루비콘 프라이머리스 제외 조건, 테라 통합 전쟁(`1만 년 전`) 및 보스트로야 서약(`1만 년째`) 고증 정합화.
     * **신분·세력 누수 차단 & 밸런스:** 78직군 체계에서 잔류 태그로 발생하던 카오스·데몬 프린스·드레드노트·하이 로드·쿠스토데스·그레이 나이트·상위 지휘관 신분 불일치 전면 차단, 유년기 8사건 `anyCareers: ["child"]` 고정, 아스타르테스 성별(남성 `geneseed_compatible`) 분기 분리, `ev_inquisition_purge` 무조건 즉사 완화, 중복 플롯 15쌍 현장 차별화, 무위험 실패 분기 실질 페널티 보정.
  3. **한국어 문체 · 표준 표기 · 스크린 리더(TTS) 접근성 전면 정비:**
     * 치명적 오역·동음이의어 교정(`테라와 돈을 위하여` -> `테라와 로갈 돈을 위하여`, `무고한 고발자가` -> `거짓 고발을 꾸민 정적이`, `성별 의식` -> `영혼 결속 의식`, `함정들이` -> `강습정들이`, `수석 라이브러리` -> `수석 라이브러리안`, `육방정계` -> `육망성`, `추서되었다` -> `승진했다`, `무명이 떨쳤다` -> `명성을 떨쳤다`, `교관 수도사이` -> `드릴-애벗이`).
     * 발화 영역 영문·한자 괄호 병기(125건+), 영문 약어(`PDF`/`DAoT`/`AI`/`vs`), 단위 약어(`km`/`mm` -> `킬로미터`/`밀리미터`) 전량 제거 및 표준 표기(`시체 전분`, `울트라마`, `누스피어`, `플라즈마`, `프로메튬`, `매크로`, `아마섹`, `메디카에`, `릭터`, `스캐럽`, `리퍼 건`, `초파`, `마셜`, `아우라마이트`, `데파르트멘토`, `인터로게이터-채플린`, `허스칼`, `프로메테우스`, `스카웃`, `아포세카리움`, `잊힌`, `데었다` 등) 통일.
     * 전체 500사건의 모든 판정 선택지 라벨을 실제 `check.stat`과 일치하는 단일 브래킷(`[XX 판정]`)으로 100% 정렬.
  4. **최종 QA `--deep` 7대 게이트 검증 결과 (`node scripts/sync-scripts.js --check && node scripts/qa.js --deep`):**
     * **Gate 1~5:** `index.html` 45개 스크립트(사건 26 + 연대기 10) 동기화 일치, 고아 파일 0건, `maxEv = 90.0KB`, `maxCh = 44.5KB`, UI `#id` 91종 0오류, 소프트락 0건, 유년기 중복률 `18.8%`, `TAG_LABELS` **167/167 미회수 0건**.
     * **Gate 7A/7B:** 79직군 전직 그래프 `65 anyPastCareers` 모순 0건, 전체 조건식 **1,300종** 합성 도달성 증명 완료, **`directCareerMatch(events = 78/78, chronicles = 78/78)` 100% 유지**.
     * **Gate 6/7C (1,500생애 멀티-초점):** `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 5,751`, `reachedCareers = 55/78`, `naturalEvents = 402/476`, `1,000분기 = 326.9ms`.
     * 분포 지표: `T4+ = 880`, `T5+ = 811`, `T6 = 129`, `HighLord = 77`, `Gov = 287`, `RT = 304`, `Astartes = 56`, `GK = 7`, `Chaos = 243`, `DaemonPrince = 9`, `Focus=forbidden (allMed = 23세, heretic = 80%)`, 비금단 초점 이단 `0~6%`. **0 ERRORS · 0 WARNINGS.**

### 15단계 (5차 4단계): 네임드 15행성 & 파견 전용 연작 대확장 `[완료]`
* **완성도:** **100% 완료** (예정 목표 `+48사건 · +45연대기`를 초과해 **+51사건 · +45연대기** 구현, 전체 `EVENTS = 527종`[역사 포함 **551종**] · `CHRONICLES = 635종` 달성, 핵심 4행성 1:1 단독 파일 무손실 승격[`diffs = 0`], 네임드 15행성 전원 파견 가능 사건 **3~10건** · 성인 연대기 **5~14건** 확보, 독립 Read-Only 교차 감사 2종 최종 **`PASS` [P0 0건 · P1 0건]**, `sync-scripts --check` 및 `qa.js --deep` 7대 게이트 **0오류·0경고** 통과)
* **완료 내역 (1:1 승격·신설 파일, 감사 교정 및 최종 QA 검증 결과):**
  1. **핵심 상징 4행성 1:1 단독 파일 승격 및 확장 (`+16사건` · 기존 12종 무손실 이관 `diffs = 0`):**
     * **`data/events/worlds/terra.js` [NEW · 10건 · 23.0KB]:** 기존 테라 7종 이관 + 신규 3종(`ev_s15_core_terra_1~3`: 황궁 외성문 루시퍼 블랙 검문소, 아스트로패스 성가대 텔레파시 폭풍, 하층 대성당 성유물 호송과 상원 파벌 암투).
     * **`data/events/worlds/cadia.js` [NEW · 6건 · 16.2KB · 전 항목 `maxYear: 999`]:** 기존 카디아 2종 이관 + 신규 4종(`ev_s15_core_cadia_1~4`: 외지 지원 연대 카스르 합동 훈련, 카스르 타이록 보급선 습격, 지하 방공호 카오스 점조직 색출, 궤도 방어 포대 정비와 암흑 성전 전조).
     * **`data/events/worlds/krieg.js` [NEW · 6건 · 16.4KB · 비타-움 정합성 엄수]:** 기존 크리그 2종 이관 + 신규 4종(`ev_s15_core_krieg_1~4`: 외지 군수부 병기창 검수, 방사능 참호선 독가스 누출 봉쇄, 어스셰이커 공성 포대 실사격, 크리그 출생 밀리타룸 병사 출정 점호).
     * **`data/events/worlds/armageddon.js` [NEW · 6건 · 17.2KB]:** 기존 아마겟돈 1종 이관 + 신규 5종(`ev_s15_core_armageddon_1~5`: 잿빛 황무지 스틸 리전 호송, 하이브 인페르누스 매연과 리만 러스 할당량, 적도 정글 페럴 오크 매복[`minYear: 942`], 헬스리치 항만 하역 방공, 템페스토라 산성비 홍수 방어).
  2. **권역별 나머지 11개 네임드 행성 파견·풍토 사건 대확장 (`+35사건` · `EVENTS` 476 -> 527종 / 역사 포함 500 -> 551종):**
     * **`data/events/worlds/solar.js` (13건 · 38.1KB):** `mars`(+3: 철의 고리 조선소 사고, 포지 외곽 이탈 서비터·성유 탱크, 대서고 외지 기술 사절) · `necromunda`(+3: 하이브 프리무스 화물 승강기 올록 파업 봉쇄, 하우스 카우도르 폭동 진압, 잿빛 황무지 화물 열차 매복).
     * **`data/events/worlds/ultima.js` (27건 · 79.5KB):** `macragge`(+3: 울트라마 보조군 합동 훈련, 대도서관 사료실 대조, 항만 위조 울트라마 군수 공납 화물 적발) · `baal`(+4: 방사능 사막 보급 기지, 바알 프라임 위성 채굴 정착촌[`maxYear: 999, greatRift: false`], 붉은 천사 추모 성소, 니힐루스 재건 보급선[`minYear: 1000, greatRift: true`]) · `catachan`(+3: 외지 장교 제식 행군 경고, 맹독 식충 식물 방화선, 밀림 강 도하) · `valhalla`(+4: 중앙 열교환소 압력 이상, 영구 동토 빙하 관측 초소 설상 장갑차 호송, 동계 참호 합동 훈련, 빙하 폐허 고대 저장고) · `nocturne`(+3: 성소 도시 흑요석 공방, 용암 협곡 흑요석 현수교 붕괴 위기, 지열 제련소 마그마 수로 과열).
     * **`data/events/worlds/frontier.js` (19건 · 59.0KB):** `fenris`(+3: 아사이하임 외곽 카얼 보조대 검문, 해빙기 빙하 균열 구조, 해안 망루 눈트롤 방어전) · `vostroya`(+3: 대공장 정밀 무기 수령, 눈보라 장갑 증기 철도 파괴 공작 저지, 보스트로얀 퍼스트본 탄약고 화재 진압) · `tanith`(+3 · 전 항목 `maxYear: 764`: 외지 파견대 날우드 숲 조난, 안개 계곡 목재 십일조 호송, 타니스 마그나 합동 야간 사격) · `ophelia7`(+3: 궤도 순례선 위조 성유물 검역, 시노드 미니스트라 재무 감사 호위, 호스피탈러 수녀회 야전 치유소 역병 봉쇄).
  3. **네임드 15행성 파견·풍토·시대 심화 연대기 신설 (`data/chronicles/worlds_dispatch.js` [NEW · +45연대기 · 32.9KB] · `CHRONICLES` 590 -> 635종):**
     * 15개 네임드 행성 각 3종(외지 파견자 시점 `excludeHomeWorlds`, 현지·파견 공용 생활상, 시대·계급 특화 일상)으로 총 45종을 추가해 모든 네임드 행성 성인 연대기 `5~14건` 체제를 완성.
  4. **독립 Read-Only 교차 감사 2종(`iv_lore_auditor` + `iv_prose_a11y_critic`) P0·P1 전량 교정 및 최종 `PASS`:**
     * 고증·연대기 보정: 테라 황궁 외성문(루시퍼 블랙) vs 내성 영원의 문 구분, `ch_s15_wd_macragge_3` 길리먼 섭정 `minYear: 1001`, 울트라마 면세(`Aptus Non`) 군수 공납 화물 정합화, 바알 프라임 `maxYear: 999, greatRift: false` 가드, `템페스트 대양`·`만 년 명예`·`옛 500년 내전` 교정.
     * 신분·태그·문체·중복 보정: `ev_s15_su_nocturne_3`의 `promethean_smith` 챕터 태그 오염 제거 및 `guild_artisan` 정렬, 초인·최고위·기계교 신분 누수 전면 차단, 한국어 조사·피동·맞춤법 교정, 교차 슬라이스 플롯 중복 5종(`mars_2`, `necromunda_1`, `valhalla_2`, `nocturne_2`, `ophelia7_3`) 전면 차별화.
  5. **최종 QA `--deep` 7대 게이트 검증 결과 (`node scripts/sync-scripts.js --check && node scripts/qa.js --deep`):**
     * **Gate 1~5:** `index.html` 50개 스크립트(사건 30 + 연대기 11) 동기화 일치, 고아 파일 0건, `maxEv = 90.0KB`, `maxCh = 44.5KB`, UI `#id` 91종 0오류, 소프트락 0건, 유년기 중복률 `20.0%`, `TAG_LABELS` **167/167 미회수 0건**.
     * **Gate 7A/7B:** 79직군 전직 그래프 `65 anyPastCareers` 모순 0건, 전체 조건식 **1,444종** 합성 도달성 증명 완료, **`directCareerMatch(events = 78/78, chronicles = 78/78)` 100% 유지**.
     * **Gate 6/7C (1,500생애 멀티-초점):** `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 5,792`, `reachedCareers = 55/78`, `naturalEvents = 450/527`, `1,000분기 = 348.9ms`.
     * 분포 지표: `T4+ = 906`, `T5+ = 835`, `T6 = 119`, `HighLord = 76`, `Gov = 320`, `RT = 323`, `Astartes = 68`, `GK = 4`, `Chaos = 238`, `DaemonPrince = 3`, `Focus=forbidden (allMed = 23세, heretic = 77%)`, 비금단 초점 이단 `0~6%`. **0 ERRORS · 0 WARNINGS.**

### 16단계 (5차 5단계): 9대 챕터 1:1 승격 · 초인 초장수기 · 카오스 4대 신/CSM 엔드게임 `[완료]`
* **완성도:** **100% 완료** (예정 목표 `+45사건 · +36연대기`를 초과해 **+49사건 · +38연대기** 구현, 전체 `EVENTS = 576종`[역사 포함 **600종** 돌파] · `CHRONICLES = 673종` 달성, 9대 챕터 1:1 단독 파일 무손실 승격[`diffs = 0`], 독립 Read-Only 교차 감사 2종 2회 검증 P0·P1 전량 해소, `sync-scripts --check` 및 `qa.js --deep` 7대 게이트 **0오류·0경고** 통과)
* **완료 내역 (1:1 승격·신설 파일, 감사 교정 및 최종 QA 검증 결과):**
  1. **9대 챕터 1:1 단독 파일 승격 및 합동 공조 확장 (`data/events/chapters/` 1파일 -> 10파일 · 기존 31종 무손실 이관 `diffs = 0` + 신규 29종 = 총 60종):**
     * **1:1 단독 파일 9종 (각 6종 · 17.2~19.0KB):** `ultramarines.js`(타이라니드 베테랑 사열[`minYear: 746`]·울트라마 영지 외곽·코덱스 개정[`minYear: 1001`]), `blood_angels.js`(생귀너리 가드·성혈 사제 성배 의식[`maxYear: 998`]·니힐루스 섭정령 방어[`minYear: 1001`]), `space_wolves.js`(울프 프리스트 송곳니 시련과 울펜 저주·블러드 클로 통솔·더 팽 카얼 방어), `dark_angels.js`(레이븐윙 추격·와처스 인 더 다크·라이온 귀환 리즌 전사[`minYear: 1020`]), `imperial_fists.js`(팔랑크스 함교·강철 우리 추모·제1중대 스톰 실드 공성 돌파), `salamanders.js`(불칸 성유물·파이어드레이크 갑주 수복과 기계교 교리 갈등·녹턴 시련의 계절 지하 피난처 사수), `black_templars.js`(성전 맹세·이터널 크루세이더 강습·이단 사이커 결투 · 라이브러리안/사이커 0건), `raven_guard.js`(레이븐스파이어 무음 침투·지하 광산 노예 저항군 해방·키아바르 장비 협상과 모르데이탄 전통 저격 분대), `white_scars.js`(초고리스 고속 바이크 편대·스톰시어 번개 의식과 서예·거짓 후퇴 협곡 섬멸).
     * **`data/events/chapters/chapters_core.js` (6종 · 19.3KB):** 기존 챕터 숙원 4종 + 데스워치 복귀 베테랑의 오르도 제노스 기밀 서약 연작(`ev_s16_ch2_core_1`, `deathwatch_vet` 회수) + 대균열 이후 퍼스트본·프라이머리스 합동 서약(`ev_s16_ch2_core_2`, `minYear: 1001, greatRift: true`).
  2. **초인·드레드노트·초장수 필멸자 연작 신설 (`data/events/themes/longevity.js` [NEW · +10사건 · 35.0KB]):**
     * 185~400세+ 아스타르테스(옛 구원 행성 석상, 220세+ 무구 기계령, 315세+ 세 번째 황금 복무 못 300년 서사, 330세+ 네 번째 세대 행성 총독, 350세+ 납골당 황혼, 400세+ 왜곡된 사관학교 교범), 150세+ 드레드노트 고대인 의회 역사 증언(비요른 모티프 · 전 챕터 중립), 180세+ 최고 사령관 2세기 고독, 140세+ 필멸자 리주버냇·기계 의체 초장수(`excludeHomeWorlds: ["krieg"]`), 220세+ 쿠스토데스 '황제의 눈' 첩보망 심사(`captain_general` 제외).
  3. **카오스 4대 신 2막 · 배신자 군단 · 데몬 프린스 엔드게임 (`data/events/careers/chaos_ranks.js` +10사건 -> 총 20종 · 87.0KB):**
     * 4대 신 낙인 상위 시련 4종(월드 이터·사우전드 선[`blank` 제외]·데스 가드·엠퍼러스 칠드런 · `daemon_prince` 위상 분리), 배신자 군단 3종(아이언 워리어 공성전·워드 베어러 다크 어포슬·나이트 로드와 알파 리전 이중 첩보), 카오스 로드 지옥 대장간 패권 1종, 데몬 프린스 위대한 게임·물질 우주 강습전 2종(전 `fail` 실질 `wounds`/스탯 비용 부여).
  4. **심화 일상 연대기 38종 추가 (`CHRONICLES` 635 -> 673종):**
     * `data/chronicles/chapters.js` (+18종 -> 총 51종 · 26.8KB: 9대 챕터 각 2종), `data/chronicles/lifecycle.js` (+10종 -> 총 28종 · 16.6KB: 초인 160~420세 4종·드레드노트 2종·쿠스토데스/그레이 나이트 2종·필멸자 초장수 2종), `data/chronicles/chaos_endgame.js` [NEW · +10종 · 7.9KB: 4대 신 상위 4종·장구한 전쟁 4종·데몬 프린스 2종].
  5. **독립 Read-Only 교차 감사 2종(`iv_lore_auditor` + `iv_prose_a11y_critic`) 2회 교차 검증 및 전량 교정:**
     * `grey_knight`(`astartes` 태그 겸유)·`dreadnought`·`astartes_scout`(`battle_brother` 보강)·`captain_general`·기계교 고위직·`daemon_prince` 신분 누수 전면 차단, 황금 복무 못(100년/개) 및 0세 입단 산술 모순 교정, 블랙 템플러 라이브러리안 중립화(`ev_s16_long_7`), 위성 딜리버런스-키아바르 공전 관계 교정(`ev_s16_ch2_rg_3`), 여성 쿠스토데스 성중립화(`ch_s16_long_transhuman_320`), 확정 선택지 밸런스 역전 3건 및 플롯 중복 7종 전면 해소, 한국어 조사·자동사·호응 전량 교정.
  6. **최종 QA `--deep` 7대 게이트 검증 결과 (`node scripts/sync-scripts.js --check && node scripts/qa.js --deep`):**
     * **Gate 1~5:** `index.html` 61개 스크립트(사건 40 + 연대기 12) 동기화 일치, 고아 파일 0건, `maxEv = 90.0KB`, `maxCh = 44.5KB`, UI `#id` 91종 0오류, 소프트락 0건, 유년기 중복률 `21.5%`, `TAG_LABELS` **167/167 미회수 0건**.
     * **Gate 7A/7B:** 79직군 전직 그래프 `65 anyPastCareers` 모순 0건, 전체 조건식 **1,562종** 합성 도달성 증명 완료, **`directCareerMatch(events = 78/78, chronicles = 78/78)` 100% 유지**.
     * **Gate 6/7C (1,500생애 멀티-초점):** `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 5,904`, `reachedCareers = 56/78`, `naturalEvents = 487/576`, `1,000분기 = 391.1ms`.
     * 분포 지표: `T4+ = 933`, `T5+ = 856`, `T6 = 120`, `HighLord = 79`, `Gov = 324`, `RT = 335`, `Astartes = 58`, `GK = 8`, `Chaos = 254`, `DaemonPrince = 4`, `Focus=forbidden (allMed = 24세, heretic = 83%)`, 비금단 초점 이단 `0~6%`. **0 ERRORS · 0 WARNINGS.**

### 16.2단계 (접근성 · 안정화): 전 패널 포커스 보존 · 상태 요약 듣기 · 초장수 명예 마감 · 저장 견고화 · QA/CI 정비 `[완료]`
* **완성도:** **100% 완료** (독립 코드 검수에서 도출된 핵심 결함 6대 축 — 스크린 리더 포커스 유실, 상태 요약 부재, 초장수 캐릭터 자발적 엔딩 부재, 저장 버전 관리·실패 안내·백업 이관, `qa.js` 무효 ID 10곳, CI 부재 — 전량 해소, `sync-scripts --check` 및 `qa.js --deep` 7대 게이트 **0오류·0경고** 통과)
* **완료 내역 (수정·신설 파일 및 핵심 개선 내역):**
  1. **전 패널 스크린 리더 포커스 유실 완전 차단 (`js/ui.js`):**
     * `#auto-careers-wrap`(진로), `#auto-actions-wrap`(자율 행동), `#auto-travel-wrap`(빈 상태 포함), `#stats-grid`, `#tag-cloud`, `#all-careers-preview`에 시그니처 캐싱을 적용해 내용 변동이 없을 때 DOM을 전혀 덮어쓰지 않도록 개선했다.
     * 진로·행동 내용이 실제로 변경되어 재렌더링할 때도 현재 포커스가 놓인 `[data-cid]`/`[data-aid]` 버튼을 기억해 자동 복원한다.
     * `#recent-log-list`를 매 분기 `innerHTML` 통째 교체에서 **증분 `prepend` + 12건 초과 끝 노드 제거** 방식으로 전환해 스크린 리더 탐색 커서가 초기화되지 않게 보호했다.
  2. **스크린 리더 1클릭 `현재 상태 요약 듣기` (`js/engine.js`, `js/ui.js`, `index.html`, `styles.css`):**
     * `Engine.buildStatusSummary(state)` 및 `#btn-status-summary` 버튼을 추가해 이름·나이·시점·직책·행성·생명력·기대수명·신앙·오염·초점·현재 사건 또는 다음 진로 힌트를 장식 기호 없이 단 한 번의 클릭으로 `#sr-live`에 명료히 안내한다.
  3. **초장수 · 최고위 자발적 명예 생애 마감 & `다음 사건까지 진행` (`js/engine.js`, `js/ui.js`, `index.html`):**
     * `canRetireHonorably(state)` · `createHonorableEndingEvent(state)` · `performAction("retire_honorable")`를 신설해 100세 이상 초장수, Tier 6 최고위(55세+), 기대수명 85% 도달 고령자(65세+)가 자율 행동 패널에서 확인 분기를 거쳐 직군별 고증 엔딩(쿠스토데스 '황제의 눈' 은퇴, 아스타르테스 최후의 성전, 드레드노트 영면, 기계교 대서고 합일, 데몬 프린스 위대한 게임 승천, 필멸자 명예 퇴임)으로 영혼의 전당에 정상 등재하며 생애를 마감할 수 있게 했다(취소 선택지로 실수 방지).
     * `#btn-fast-forward`(`다음 사건까지 진행`)를 추가해 최대 30분기(10년) 동안 사건·발탁·사망·(옵션 ON 시) 새 진로 해금 시점까지 즉시 진행해 초장수 구간의 불필요한 대기 시간을 해소했다.
  4. **저장 구조 견고화 · 버전 마이그레이션 · `.json` 백업 이관 (`js/engine.js`, `js/ui.js`, `index.html`):**
     * `SAVE_VERSION = 2` 및 `Engine.migrateState(raw)`를 도입해 구버전 저장본의 누락 필드·`imperial_nihilus` 동기화·유효 ID를 자동 복원하며, 커스텀 출생에 미등록 ID가 넘어오면 `warnUnknownId`로 개발 콘솔 경고를 남긴다.
     * `localStorage` 저장 실패 시 최초 1회 사용자 경고(`notifyStorageFailureOnce`)를 출력하고, 분기 진행 중 자동 저장을 새해·사건·일시정지·전직/행동·`beforeunload` 중심으로 최적화해 2,400로그 초장수 세이브의 불필요한 반복 직렬화를 줄였다.
     * 영혼의 전당 상단에 `#btn-export-save` · `#btn-import-save`(`.json` 통합 백업 내보내기·불러오기)를 추가해 로컬(`file://`)과 GitHub Pages 간 세이브 이관·복원을 지원한다(진행 중 생애 포함 시 즉시 일시정지 복원해 기존 세션 덮어쓰기 차단).
  5. **`scripts/qa.js` 무효 ID 10곳 교정 · 신규 단위 테스트 · GitHub Actions CI (`.github/workflows/qa.yml`):**
     * `scripts/qa.js`의 존재하지 않던 `eraId`(`m41_late`/`m41_early`), `originId`(`terra_highborn`/`hive_worker`/`military_family`), `traitId`(`iron_will`) 10곳을 정식 ID로 전량 교정했다.
     * Gate 4에 `saveVersion` · `migrateState` · `canRetireHonorably` · 명예 마감 취소/확정 · `buildStatusSummary` 단위 테스트를 추가했다.
     * `.github/workflows/qa.yml`을 신설해 `main` 브랜치 push/PR마다 Node.js 22에서 `sync-scripts --check && qa.js` 회귀 검증을 자동 실행한다.
  6. **최종 QA `--deep` 7대 게이트 검증 결과 (`node scripts/sync-scripts.js --check && node scripts/qa.js --deep`):**
     * **Gate 1~5:** `index.html` 61개 스크립트 동기화 일치, 고아 파일 0건, UI `#id` **96종** 0오류, 금지 표기·장식 기호·미등록 ID 경고·소프트락 0건, 유년기 중복률 `21.0%`, `TAG_LABELS` **167/167 미회수 0건**.
     * **Gate 7A/7B:** 79직군 전직 그래프 `65 anyPastCareers` 모순 0건, 전체 조건식 **1,562종** 합성 도달성 증명 완료, `directCareerMatch(events = 78/78, chronicles = 78/78)` 100% 유지.
     * **Gate 6/7C (1,500생애 멀티-초점):** `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 5,920`, `reachedCareers = 59/78`, `naturalEvents = 496/576`, `1,000분기 = 362.3ms`. **0 ERRORS · 0 WARNINGS.**

---

### 16.5단계 (선행 확장): 워해머 40k 정통 3대 도덕 성향 (`자비 · 교조 · 암흑`) 도입 `[완료]`
* **완성도:** **100% 완료** (예정 목표 `+3태그 · +30사건 · +27연대기 · 기존 ~110건 선별 태깅`을 **+3태그 · +30사건 · +27연대기 · 기존 113건 선별 태깅**으로 100% 달성, 전체 `EVENTS = 606종`[역사 포함 **630종**] · `CHRONICLES = 700종` · `TAG_LABELS = 170/170` 전량 회수, 독립 교차 감사 2종 + **최초 2단 레드팀 종합 검수(`audit-health.js` + `iv_redteam_reviewer`)** 결함 전량 해소, `sync-scripts --check`, `qa.js --deep`, `audit-health.js` **0오류·0경고** 통과)
* **완료 내역 (엔진·UI·신규/선별 콘텐츠, 교차 감사, 2단 레드팀 수정 및 최종 QA 결과):**
  1. **3축 독립 누적 도덕 성향 엔진 · 진로 연동 · 부고 (`js/engine.js`, `data/tags.js`, `data/careers.js`):**
     * `SAVE_VERSION = 3`, `state.alignment = { humane: 0, dogmatic: 0, ruthless: 0 }`(각 `0~100`, 기존 `황제 신앙`·`워프 오염`과 역할 분리, 구세이브 `migrateState` 자동 보정). 3단계 칭호(중립 `실리적 중립` · 1단계 `15+` · 2단계 `35+` · 3단계 `60+` `자비의 성자`/`광신의 화신`/`무자비한 암흑 군주`, 동점 `15+` `갈등하는 신념`).
     * `checkReq`/`describeReq`에 `minAlign`, `maxAlign`, `anyDominantAlign` 지원 추가, `applyOutcome`/`formatDeltaText`/`applyChronicle`에 `align` 증감 반영, `advanceQuarter` 사건 가중치(`alignBias` 일치 `x1.7/2.1/2.6`, 불일치 `x0.4`) 및 연대기 가중치(일치 `x2.0`, 불일치 `x0.45`) 연동.
     * `data/careers.js` 10개 상징 직군(`underhive_boss`, `hive_crime_lord`, `commissar_cadet`/`commissar`, `sororitas_novitiate`/`adepta_sororitas`, `ecclesiarchy_priest`, `inquisition_acolyte`, `chaos_cultist`, `renegade_marine`)에 기존 78종 경로를 100% 보존하는 `or` 지름길 추가(카오스 2직군은 `minCorruption` 하한 유지해 세속적 악인 분리) 및 `createDynamicCareerOfferEvent` 오퍼 가중치·`humane`/`dogmatic` 암흑가 제안 차단 구현.
     * `data/tags.js` 정점 태그 3종(`align_beacon_mercy`, `align_iron_dogma`, `align_shadow_broker`) 등록(`TAG_LABELS` 167 -> **170종**).
     * 직군 고유 행동(커미사르/소로리타스/아르비테스 `교조 +2`, 갱단/컬트/CSM/데몬 프린스 `암흑 +3/+4`), 정화 고행(암흑 1+ 시 `암흑 -3 · 교조 +1`), `buildStatusSummary` 성향 요약, `buildObituaryEpilogue` 성향×신앙×오염 추모 에필로그(쿠스토데스·그레이 나이트 비밀 수호자 예외 포함) 통합.
  2. **UI · 스크린 리더 접근성 (`index.html`, `styles.css`, `js/ui.js`):**
     * 좌측 인물 상태 패널 3대 게이지 아래에 정적 DOM 성향 칭호·수치(`#val-alignment`, `#val-alignment-detail`) 및 시각 전용(`aria-hidden="true"`) 3분할 비율 막대(`.align-tri-bar`) 추가.
     * 사건 카드 `alignBias` 배지 출력, 부고 모달·`.txt` 생애 기록서·영혼의 전당 상세 조서(구 레코드 100% 하위 호환)에 도덕 성향 표시.
  3. **신규 성향 콘텐츠 & 기존 핵심 12개 파일 선별 레트로 태깅:**
     * **`data/events/themes/alignment.js` [NEW · +30사건 · 89.3KB · 1,677줄]:** 자비 8종 · 교조 8종 · 암흑 8종(각 성향 반작용 위기 및 정점 태그 3종 획득·회수 포함) + 3성향 딜레마·속죄·아스타르테스·고위직 결단 6종 (`EVENTS` 576 -> **606종** / 역사 포함 **630종**).
     * **`data/chronicles/alignment.js` [NEW · +27연대기 · 19.5KB · 399줄]:** 자비 7종 · 교조 7종 · 암흑 7종 + 교차(철혈 광신·세속적 악인·아스타르테스 대비) 3종 + 정점 태그 3종 1:1 회수 3종 (`CHRONICLES` 673 -> **700종**).
     * **기존 핵심 12개 사건 파일 선별 레트로 태깅 (`113건`):** `themes/` 5파일(`lifecycle` 15, `arcs_focus` 16, `crises` 12, `chaos_warp` 11, `xenos` 8 = 62건) + `careers/` 7파일(`civil_void` 10, `guardsman` 7, `militarum` 9, `inquisition` 8, `ecclesiarchy` 6, `governor` 7, `rogue_trader` 4 = 51건).
  4. **독립 교차 감사 2종 + 최초 2단 레드팀 종합 검수(`audit-health.js` + `iv_redteam_reviewer`) 결함 전량 해소:**
     * **교차 감사 수정:** 황금 옥좌 연대기(`수만 년`->`일만 년`), 한국어 문법·호응(`암흑가의 척`->`암흑가와 척`, `상징을 웅얼거리던`->`이단 구호를 웅얼거리던`, `비밀 통로만 받아 들고`->`비밀 통로 열쇠만 받아 들고`, `당신`->`그대`, TTS 동음이의어 `자비의 성인`->`자비의 성자`), 초인·이단자·고위직·야만 행성 가드 전면 보강, `ev_s165_align_humane_02` 격벽 중복 플롯 전면 개편(징병 검문선 피난 열차), `ev_s165_align_ruthless_06` 판정 보상 역전 해소, `ev_arc_ordo_xenos` C3 교조 정렬, `reqLabel` 스크린 리더 중복 배지 정리.
     * **2단 레드팀 실코드 결함 4건 즉시 해소:** ① `applyChronicle`·`advanceQuarter`(`FOCUSES.forbidden`)에서 쿠스토데스·그레이 나이트 양(+) 오염 면역 우회 및 카오스 스폰 사망 차단(+Gate 4 회귀 테스트 추가), ② `ev_s165_align_humane_04` 고위직 제외 정렬 및 `qa.js` `pickAlignedChoice` 순성향 판별식 교정(`dogmatic` 대조 마진 `53 vs 51` -> `83 vs 56`), ③ `#start-heading`/`#heading-auto` `tabindex="-1"` 포커스 복원 폴백 및 `renderRollBanner` 시그니처 가드 추가, ④ `#btn-clear-hall` 영혼의 전당 2단계(5초 재클릭) 초기화 안전 가드 도입.
  5. **최종 QA `--deep` 7대 게이트 & 레드팀 퍼징 실측 결과:**
     * **`sync-scripts --check`:** `index.html` 63개 스크립트(사건 41 + 연대기 13) 동기화 일치.
     * **`qa.js --deep`:** Gate 1~5(`maxEv = 91.5KB`, `maxCh = 44.5KB`, UI `#id` **103종** 0오류, 소프트락 0건, 유년기 중복률 `20.3%`, `TAG_LABELS` **170/170**), Gate 7A/7B(79직군 `65 anyPastCareers` 모순 0건, **1,620개 조건식 전수 합성 도달성 증명**, `directCareerMatch = 78/78`), Gate 6/7C(1,500생애 `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `careerOffers = 5,897`, `naturalEvents = 515/606`, `Align(H=737, D=185, R=194, N=384)`, `1,000q = 550.8ms`).
     * **3대 성향 비교 롤플레이 시뮬레이션 (각 45생애):** 자비(`dom=35/45`, `H:129/D:26/R:17`) · 교조(`dom=37/45`, `H:56/D:83/R:18`) · 암흑(`dom=38/45`, `H:70/D:17/R:97`). **0 ERRORS · 0 WARNINGS.**
     * **`audit-health.js` (200생애 퍼징):** `crashes = 0`, `softlocks = 0`, `migrateFailures = 0`, `unknownIdWarnings = 0`, `retireExitOK = 10/10`, `UI-A11y risks = 0`, `Size Watch nearLimit = 0`.

---

### 17단계 (5차 6단계): 인류제국 신규 4대 세력 풀 트리 & 기사 행성 추가 `[완료]`
* **완성도:** **100% 완료** (목표 `+4세력/+13직군 · +1행성 · +1출신 · +36사건 · +32연대기`를 **+4세력/+13직군[21트리·91선택 직군·테라 12하이 로드 완비] · +1행성[23행성] · +1출신[11출신] · +19태그[189/189 전량 회수] · +36사건[642종/역사 포함 666종] · +33연대기[733종]**으로 초과 달성, 2종 Read-Only 교차 감사 및 2단 레드팀 종합 검수 P0 1건·P1 4건 전량 해소, `sync-scripts --check` · `qa.js --deep` · `audit-health.js --lives=200` **0오류·0경고** 통과)
* **완료 내역 (신설·수정 파일, 교차 감사, 2단 레드팀 해소 및 최종 QA 실측):**
  1. **신규 4대 상징 세력(+13직군 · 12하이 로드 완비) · 기사 행성 · 기사 가문 출신 (`data/careers.js`, `data/worlds.js`, `data/origins.js`, `data/tags.js`, `data/events/careers/high_lords.js`):**
     * **나비스 노빌리테(`navis_navigator`, 4직군):** 견습 항법사(`nav_apprentice`) → 선임 항법사(`nav_senior`) → 대가주 노바토르(`nav_novator`) → **파테르노발 특사(`paternoval_envoy`, 11번째 하이 로드)**. `navigator_house` 출생 가중치 `0.7 -> 1.8` 상향.
     * **오피시오 아사시노룸(`officio_assassinorum`, 3직군 + 4대 템플 서약):** 암살청 수련생(`assassin_initiate`, `allowLateralOffer: true`, 입단 시 `createAssassinCladeEvent`로 `빈디카레/칼리두스/에버서/쿨렉수스[블랭크 전용]` 서약 연쇄 발동) → 정예 어쌔신(`assassin_operative`) → **그랜드 마스터 오브 어쌔신(`grand_master_of_assassins`, 12번째 하이 로드)**.
     * **임페리얼 나이트(`imperial_knight`, 4직군) + `generic_knight` + `knight_house`:** 기사 행성 `generic_knight`(23번째 행성 · 성간 이동 편입) 및 `knight_house`(`worldFilter: ["generic_knight"]`) 신설; 종자/아미저(`knight_squire`) → 퀘스토리스 기사(`knight_scion`) → 프리블레이드(`knight_freeblade`) → 하이 킹·하이 퀸(`knight_high_king`, 성별 표기 분기).
     * **살아 있는 성인(`living_saint`, 2직군 · 3대 성향 직결):** 기적의 그릇(`saint_vessel`, 희귀·상징적 진입 조건 튜닝) → 살아 있는 성인(`living_saint`, `isTranshuman: true`, `lifeBonus: 600`, 양(+) 오염·스폰화 전면 면역, 성별 무관·자비/심판 위상 분기).
     * `data/tags.js` 신규 태그 19종(`TAG_LABELS = 189종`) + 행성 태그 3종(`WORLD_TAG_LABELS = 49종`) 등록, `high_lords.js` 원로원·섭정 사건에 11·12번째 하이 로드 연동.
  2. **신규 4대 세력 단독 사건 파일 4종(+36사건) & 연대기 33종 (`EVENTS = 642종[666 w/TL]` · `CHRONICLES = 733종`):**
     * `data/events/careers/navis_navigator.js`(9건 · 40.8KB), `officio_assassinorum.js`(9건 · 41.6KB), `imperial_knight.js`(10건 · 45.0KB), `living_saint.js`(8건 · 40.6KB).
     * `data/chronicles/careers_factions_s17.js`(24건 · 20.2KB: 4대 세력 일상 + 신규 태그 회수 + `anyPastCareers` 대비 5종) + `childhood.js`(+6건 `generic_knight` 유년기) + `worlds.js`(+3건 기사 행성 풍토).
  3. **엔진 · 접근성 · 성능 보강 (`js/engine.js`, `js/ui.js`, `index.html`):**
     * `buildPoolIndex`에 `byTag`(`req.allTags[0]`) 무손실 버킷과 `makeReqContext` 성향 캐싱을 도입해 1,000분기 처리 속도를 약 2.3~2.8배 개선(`1,178ms -> 415~506ms`).
     * `applyCareerJoinEffects` 전면 지원, 4대 세력 고유 행동 5종(`navigator`, `assassin`, `knight`, `knight_lord`, `living_saint`), 명예 마감 4종, 맞춤 부고 4계열(`knight_squire`/`nav_apprentice` 계급 분기 포함), `#obit-rank` `aria-hidden="true"` 반영.
  4. **2종 Read-Only 교차 감사 + 2단 레드팀 종합 검수(`iv_redteam_reviewer`) P0 1건·P1 4건 전량 해소:**
     * **교차 감사 교정:** `data/careers.js` 미등록 태그(`"priest"`) 교체 및 라틴 병기 정리, `officio_assassinorum.js` 헥사키·파딕스 시대착오 수정, `imperial_knight.js` 타이라니드 `minYear: 745` 추가, `living_saint.js` 오펠리아 VII 표기·자비/심판 위상 상호 배타 및 무조건 5번 선택지 확보·니힐루스 플롯 차별화.
     * **레드팀 P0-1 해소:** `isCareerTransitionBlocked` 단일 진실 공급원 도입으로 `createDynamicCareerOfferEvent`·`attemptCareerChange`·`getContextualOptions`·`forceCareer` 전체에 암살청/리빙 세인트 이탈 차단 및 항법사 초인·수녀회 오진입 차단 통일 + `data/careers.js` 17개 직군·`ev_blank_recruit` `excludeTags` 정렬.
     * **레드팀 P1-1~P1-4 해소:** `assassin_initiate` `allowLateralOffer: true` 도입(1,500생애 `Ass` `3 -> 41건` 정상화), 14세 `knight_squire` `checkReq` 검증(`minAge: 14`), `getLivingSaintAspect` 단일 위상 헬퍼, `wanted_by_inquisition` 최상위 부고 보호, 카오스/이단 명예 마감 우선순위 교정, 기존 7개 사건/연대기 파일의 17단계 신분 누수 차단, `js/ui.js` `#auto-travel-wrap` 포커스 보존/폴백 및 `careersSig` 위상·템플·성향 갱신, `qa.js` Gate 4 실전직·격리·위상 테스트/Gate 7A 금지 경계 단언 및 `audit-health.js` 10번째 행동형 이동 포커스 테스트 추가.
  5. **최종 QA `--deep` 7대 게이트 & 레드팀 헬스 실측 결과:**
     * **`sync-scripts --check`:** `index.html` 68개 스크립트(사건 45 + 연대기 14) 동기화 일치.
     * **`qa.js --deep`:** Gate 1~5(`maxEv = 92.4KB`, `maxCh = 44.5KB`, UI `#id` 103종 0오류, 소프트락 0건, 유년기 중복률 `18.3%`, `TAG_LABELS` **189/189**), Gate 7A/7B(92직군 `78 anyPastCareers` 모순 0건, **1,732개 조건식 합성 도달성 증명**, `directCareerMatch = 91/91`), Gate 6/7C(1,500생애 `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `reachedCareers = 68/91`, `naturalEvents = 536/642`, `HighLord = 118, Astartes = 69, GK = 10, Nav = 27, Ass = 41, Knight = 5, Saint = 7, DaemonPrince = 5`, `1,000q = 506.3ms`).
     * **3대 성향 비교 롤플레이 (각 45생애):** 자비(`dom=37/45`) · 교조(`dom=38/45`) · 암흑(`dom=39/45`). **0 ERRORS · 0 WARNINGS.**
     * **`audit-health.js` (200생애, `seed=1285285314`):** `crashes=0`, `softlocks=0`, `migrateFailures=0`, `unknownIdWarnings=0`, `incorruptibleLeaks=0`, `mortalOver300=0`, `retireExecOK=6/6`, `maxSave=927.8KB<=2048KB`, **10/10 행동형 UI 테스트 PASS**, 청취 리듬 `utterances=165, avgChars=90, maxChars=214, eventHeadingFocus=34/34`, `Size Watch nearLimit=0`.

---

### 18단계 (5차 7단계): M41~M42 핵심 역사 5종 · 신규 네임드 8인 · 정사 크로스오버 · 거시 파장 `[완료]`
* **완성도:** **100% 완료** (목표 `+5역사 · +2시대 · +8인물 · +10태그 · +28사건 · +28연대기`를 **+5역사[29대] · +2시대[9개] · +8인물[28인 100%] · +10태그[199/199 전량 회수] · +28사건[670종 / 역사 포함 699종] · +29연대기[762종]**으로 초과 달성, 2종 Read-Only 교차 감사 및 2단 레드팀 종합 검수 P1 4건 전량 해소, `sync-scripts --check` · `qa.js --deep` · `audit-health.js --lives=200` **0오류·0경고** 통과, **5차 인류제국 대확장 11/11단계(100%) 완결**)
* **완료 내역 (신설·수정 파일, 교차 감사, 2단 레드팀 해소 및 최종 QA 실측):**
  1. **M41~M42 핵심 역사 5종(+2시대 프리셋) · 신규 네임드 8인 · 10대 거시 태그 (`data/timeline.js`, `data/characters.js`, `data/tags.js`, `js/engine.js`):**
     * **신규 역사 대사건 5종 (24 -> 29대사건):** `tl_gothic_war`(139~151.M41 제12차 블랙 크루세이드·고딕 전쟁, 게스세마네 대승·신델가이스트 결전), `tl_first_armageddon_shame`(444~446.M41 제1차 아마겟돈 전쟁과 수치의 달들, `shame_protector`/`shame_purger` 상호 배타 분기), `tl_third_tyranic`(997~998.M41 제3차 타이라니드 전쟁·하이브 함대 레비아탄과 크립트만의 방화선), `tl_octarius_war`(004~007.M42 옥타리우스 전쟁), `tl_plague_wars`(013~015.M42 울트라마 역병 전쟁·이악스, 충성/카오스/중립 폴백 완비). 기존 `tl_macharian_crusade`(392.M41)에도 `macharius` 및 `met_macharius` 연동.
     * **신규 시대 프리셋 2종 (7 -> 9시대):** `gothic_war`(120.M41 출생 → 139.M41 고딕 전쟁 실전 도달) · `first_armageddon`(424.M41 출생 → 444.M41 수치의 달들 실전 도달) 추가 및 `pickHotspotOrNearbyWorlds` 격전지 파견 핫스팟 연동.
     * **신규 네임드 8인 (20 -> 28인 체제, 100% 출현·선택지 `met_*` 생산·후일담 연대기 완비):** `ravensburg`(코르넬리우스 폰 레이븐스버그), `macharius`(로드 솔라 마카리우스), `kaldor_draigo`(칼도르 드라이고 · 코르노빈 전투/엠카르 저주), `morvenn_vahl`(모르벤 발), `kryptman`(피두스 크립트만), `canis_rex`(서 헤크투르 세르베란 · 카니스 렉스), `mortarion`(모타리온), `trazyn`(무한의 트라진 · 니힐라크 왕조 솔렘나스; 기존 `ev_s5_xenos_necron_trazyn` 연동·중복 방지).
     * **`data/tags.js` 신규 태그 10종 (`TAG_LABELS = 199/199` 전량 회수):** `gothic_war_vet`, `kryptman_cordon_vet`, `octarius_survivor`, `plague_war_vet`, `shame_protector`, `shame_purger`, `macro_exterminatus_scar`, `macro_mercy_sanctuary`, `crossover_oath`, `solemnace_debt`.
  2. **신규 분기 사건 3파일(+28사건) & 연대기 29종 (`EVENTS = 670종[699 w/TL]` · `CHRONICLES = 762종`):**
     * `data/events/themes/named_s18.js`(8건 · 40.3KB): 신규 8인 전원 정사 시대창 단독 조우(`139~151`, `392~400`, `901+`, `1001+`, `997~1003`, `980+`, `1013~1020`, `897+`).
     * `data/events/themes/named_crossover.js`(8건 · 44.3KB): 정사 크로스오버 8종(`그림나르×수치의 달들[445~449]`, `카울×트라진[998~999 대균열 전 카디아 파일런]`, `길리먼×모르벤 발[테라 황궁 전쟁 의회]`, `셀레스틴×모르벤 발`, `드라이고×모타리온`, `크립트만×가즈쿨[004~007.M42]`, `건트×마카리우스 군기 유산[770~795]`, `케인×앰벌리 베일[17단계 특화 공조]`).
     * `data/events/themes/eras_macro.js`(12건 · 53.5KB): 5대 거시 전쟁·M42 4대 신규 세력 합동 동원 전선 6종 + 10대 거시 태그 100% 회수 후속 파장 연작 6종.
     * `data/chronicles/named_s18.js`(17건 · 9.2KB): 신규 8인 `met_*` 개별 후일담 8종 + 10대 거시/크로스오버/솔렘나스 태그 회수 9종(`crossover_oath`·`solemnace_debt` 분리).
     * `data/chronicles/eras.js`(+12건 → 총 35건 · 15.8KB): 고딕 전쟁·마카리우스·1차 아마겟돈·레비아탄·옥타리우스·역병 전쟁·M42 기사/항법사/모르벤 발 시대 일상 연대기.
  3. **2종 Read-Only 교차 감사 + 2단 레드팀 종합 검수(`iv_redteam_reviewer`) 전 결함 해소:**
     * **교차 감사 수정:** `코른바엘` 오기→`코르노빈 전투` 및 아크랄렘 엠카르 저주·`백 년의 원한` 교정, 게스세마네(`143.M41`) vs 신델가이스트(`151.M41`) 전후 순서 교정, 조로스 사망 시점·건트 `770~795`·크립트만 `997~1003`·모타리온 `1013~1020`·크립트만 인용 스케일·니힐라크 왕조 정정, 크립트만 방화선/수치의 달들/트라진/고딕 호송대 중복 상호 배제, Part B 6종 카오스 제외, `ch_s18_tag_crossover_oath`↔`solemnace_debt` 분리, `index.html` 스크린 리더 발화(`760여 종`)·조사·동음이의어(`축성 성가`)·`익스터미나투스` 표기 통일.
     * **레드팀 P1 4건 전량 해소:** ① `buildObituaryEpilogue`에서 전역 속보로 오염된 `state.metCharacters` 대신 실제 선택지 획득 `met_<id>` 태그를 우선 판별해 Stage 18 8인 부고 마스킹 해소, ② `tl_first_armageddon_shame` 선택지 1·2 상호 배제 및 `ev_s18_xover_shame_grimnar` `minYear: 445` 조정으로 `shame_protector`/`shame_purger` 동시 획득·시계열 역전 차단, ③ `ev_s18_xover_cawl_trazyn` `greatRift: false`·`cadia_stands`·위치/직군 `or` 게이트(카디아 붕괴 후 역설 차단)·`ev_s18_xover_guilliman_vahl` 황궁 출입 게이트·`tl_plague_wars` Choice 4 진영 중립 폴백·Stage 18 전 사건/연대기 `feral`/`terra`/`mars`/`imperial_nihilus`/`custodes`/`high_lord_terra` 가드 정렬, ④ `qa.js`의 무조건 `met_*` 선주입 제거(28인 전원 실제 선택지 `addTags` 생산 검증) + `gothic_war`/`first_armageddon` 프리셋 실전 시뮬레이션 + 부고 직접 조우 우선 테스트 추가, `audit-health.js` `parseHtmlFragment`에 `<summary>` 파싱 추가로 `avgTabsToChoice1` 실측 정상화(`1.00 -> 1.09`).
  4. **최종 QA `--deep` 7대 게이트 & 레드팀 헬스 실측 결과:**
     * **`sync-scripts --check`:** `index.html` 72개 스크립트(사건 48 + 연대기 15) 동기화 일치.
     * **`qa.js --deep`:** Gate 1~5(`maxEv = 92.4KB`, `maxCh = 44.5KB`, UI `#id` 103종 0오류, 소프트락 0건, 유년기 중복률 `19.7%`, `TAG_LABELS` **199/199**, 28인 네임드 출현·실생산·연대기 100%, 신규 프리셋 실전 시뮬레이션·부고 직접 조우 우선 통과), Gate 7A/7B(92직군 `78 anyPastCareers` 모순 0건, **1,830개 조건식 전수 합성 도달성 증명**, `directCareerMatch = 91/91`), Gate 6/7C(1,500생애 `maxRepeat = 2`, `nihilusMismatch = 0`, `scholaStuck = 0`, `reachedCareers = 68/91`, `naturalEvents = 559/670`, `HighLord = 123, Astartes = 56, GK = 7, Nav = 35, Ass = 50, Knight = 3, Saint = 6, DaemonPrince = 6`, `1,000q = 433.6ms`).
     * **3대 성향 비교 롤플레이 (각 45생애):** 자비(`dom=38/45`) · 교조(`dom=34/45`) · 암흑(`dom=38/45`). **0 ERRORS · 0 WARNINGS.**
      * **`audit-health.js` (200생애, `seed=4115930122`):** `crashes=0`, `softlocks=0`, `migrateFailures=0`, `unknownIdWarnings=0`, `incorruptibleLeaks=0`, `mortalOver300=0`, `retireExecOK=7/7`, `maxSave=932.1KB<=2048KB`, **10/10 행동형 UI 테스트 PASS**, 청취 리듬 `utterances=157, avgChars=83, maxChars=242, maxQuietStreak=18q, eventHeadingFocus=45/45, avgTabsToChoice1=1.09`, `Size Watch nearLimit=0`.

---

### 18.5단계 (아키텍처 · 개념 사전 · 페이싱 개편): Astro + React 아일랜드 전환 · 워해머 40k 개념 사전 48종 · 정적 제국 코덱스 · 1~16배속 `[완료]`
* **완성도:** **100% 완료** (클래식 72스크립트 SPA -> **Astro 5 SSG + React 19 아일랜드 + 표준 ESM** 무손실 전환[17~18단계 23행성 · 11출신 · 21세력 91직군 · 12하이 로드 · 29역사 · 28네임드 · 670사건 · 762연대기 100% 통합], 신규 **워해머 40k 개념 사전 8카테고리 48종(`/glossary/`)**, **5대 정적 제국 코덱스(`/codex/**`)**, **영혼의 전당(`/hall/`)**, **1배속(1년=60초)~16배속(3.75초)** 고정밀 페이싱, GitHub Pages 자동 CI/CD 구축, 2종 Read-Only 교차 감사 + 2단 레드팀 종합 검수 P0/P1/P2 전량 해소, `qa.mjs --deep` · `audit-health.mjs --lives=200` · `npm test` · `npm run build` **0오류·0경고** 통과)
* **완료 내역 (아키텍처·콘텐츠·접근성·감사 교정 및 최종 검증 실측):**
  1. **단일 정본 ESM 무손실 전환 (`src/data/**`, `src/engine/createEngine.js`, `scripts/*.mjs`):**
     * 코어 8파일(`src/data/core/*`), 분기 사건 48파일(670종), 연대기 15파일(762종), 엔진(`createEngine.js`)을 표준 ESM으로 무손실 이관하고 `src/data/narrative.js`(`import.meta.glob`)를 통한 비동기 지연 청크로 분리했다.
     * `scripts/_loadNodeData.mjs`, `scripts/qa.mjs`(Gate 4G 개념 사전 검증 및 Astro/React 정적 접근성 게이트 포함), `scripts/audit-health.mjs`, `scripts/coverage-report.mjs`를 ESM으로 정비하고 구형 `index.html`, `styles.css`, `js/`, `data/`, `scripts/*.js`를 정리했다.
  2. **워해머 40k 주요 개념 사전 48종 신설 (`src/data/glossary.js`, `src/pages/glossary/index.astro`, `src/components/glossary/GlossaryExplorer.tsx`):**
     * 8대 카테고리(인류제국의 기둥 7, 워프·사이커·카오스 7, 군대·초인 8, 기계교·심문소·행정 6, 행성·인류 사회 5, 외계 종족 7, 제국 연대기·M41~M42 5, 게임 시스템 3) 48종 용어를 자체 한국어 산문·게임 연계 안내(`inGameNote`)·사전/코덱스 상호 링크·Lexicanum 출처와 함께 수록했다.
     * 카테고리/키워드 실시간 필터, 디바운스 `#sr-live` 안내, 연관 개념 점프 시 대상 용어 `<h3>` 포커스 이동을 구현했다.
  3. **Astro SSG + React 아일랜드 9개 정적 라우트 · 번들 격리 · 1~16배속 (`src/pages/**`, `src/components/**`, `src/lib/**`):**
     * `/codex/` 개요(클라이언트 JS `0KB`), `/codex/{worlds,careers,chapters,timeline,characters}/`(`2.81kB gz`), `/glossary/`(`2.15kB gz`), `/hall/`(`3.68kB gz`)에서 2MB급 `narrative.js`(`2,027.23kB` / `632.04kB gz`)를 **완전 격리(0KB 로드)**했다.
     * 생애 시뮬레이션(`/`, `GameApp` `16.06kB gz`)은 기존 `localStorage` 3키(`imperium_vita_active_v1`, `imperium_vita_hall_v1`, `imperium_vita_prefs_v1`) 100% 하위 호환, 페이지 이탈 시 자동 일시정지·저장, `1배속(60초/년)`~`16배속(3.75초/년 · 분기당 1.25초)` `performance.now()` 50ms 고정밀 진행 바, `src/lib/codexMeta.ts`(21개 세력 `TREE_ORDER` · `CODEX_COUNTS` 단일 정본)를 적용했다.
     * `.github/workflows/qa.yml` 및 `.github/workflows/deploy.yml`을 신설해 PR/push 자동 검증 및 `main` 브랜치 GitHub Pages(`https://pong3147.github.io/warhammer/`) 자동 배포 파이프라인을 완성했다.
  4. **독립 Read-Only 교차 감사 2종(`iv_lore_auditor` + `iv_prose_a11y_critic`) + 2단 레드팀 검수(`iv_redteam_reviewer`) P0/P1/P2 전량 해소:**
     * **고증 교정:** 카타찬 성역(`tempestus` -> `ultima`, `worlds.js`·`glossary.js` 동시 교정), `glossary.js` P1 7건·P2 7건 교정 및 17~18단계 최신 수치(12하이 로드·21세력 91직군·23행성·11출신·9시대·파테르노발 특사·제3차 타이라니드·무한의 트라진) 반영.
     * **접근성·엔진 계약 교정:** `ObituaryModal` `Shift+Tab` 트랩·`.skip-link` `inert`·`onCloseRef`, `AutonomousPanel` 안정 키·재정렬·소진 폴백·`selfActionInitiatedRef` 커밋 리셋·`travelEval` 의존성 정렬, `StartScreen` 중복 `role="status"` 제거 및 `customName` 바인딩, `ActiveEventPanel` `lastRoll.statName`/`statKey`, `DossierPanel` 성명·직책 절단 방지, `FocusGrid` 영문 약어 `aria-hidden="true"`, `.sanctum-hero::before` 빈 대체 텍스트(`/ ""`), `CodexExplorer` `"random"` 성역 한글화(`은하 전역 (무작위 성역)`), `loadFullGameRuntime()` 실패 재시도·로딩 중 버튼 비활성화·오류 안내.
  5. **최종 통합 QA `--deep` · 퍼징 · Vitest · 정적 빌드 실측 결과 (17~18단계 통합 후):**
     * **`node scripts/qa.mjs --deep`:** Gate 1~5(`8 core, 48 events, 15 chronicles, glossary=48; maxEv=92.3KB, maxCh=44.4KB`, 25 Astro/React 파일 정적 접근성, 98파일 표기/기호 0오류, `Gate 4G` 8카테고리 48종 상호 링크 100%, 소프트락 0건, 유년기 중복률 `20.2%`, `TAG_LABELS 199/199`, 28인 네임드 100%), Gate 7A/7B(92직군 `78 anyPastCareers` 모순 0건, **1,830개 조건식 합성 도달성 증명**, `directCareerMatch = 91/91`), Gate 6/7C(1,500생애 `maxRepeat=2`, `nihilusMismatch=0`, `scholaStuck=0`, `careerOffers=6,045`, `reachedCareers=68/91`, `naturalEvents=569/670`, `HighLord=113, Gov=349, RT=357, Astartes=71, GK=7, Nav=23, Ass=42, Knight=5, Saint=4, Chaos=259, DaemonPrince=6`, `1,000q=459.3ms`), 3대 성향 비교 롤플레이(`humane 39/45`, `dogmatic 35/45`, `ruthless 35/45`). **0 ERRORS.**
     * **`node scripts/audit-health.mjs --lives=200` (`seed=3628982695`):** `crashes=0`, `softlocks=0`, `migrateFailures=0`, `unknownIdWarnings=0`, `incorruptibleLeaks=0`, `retireExecOK=12/12`, `mortalOver300=0`, `maxSave=949.8KB <= 2048KB`, `Size Watch nearLimit=0`.
     * **`npm test` (`tests/game-a11y.test.tsx`):** **8 / 8 PASS** (1~16배속, 단일 `#sr-live`, 포커스 보존/재정렬/폴백, 사건 헤딩 포커스·네임드 `<details open>`, 부고 모달 `Shift+Tab`/`Escape`, 개념 사전 디바운스 필터·해시 점프).
     * **`npm run build` (Astro 5.18.2):** **9페이지 정적 빌드 완료(9.57s, 0오류 · 0경고)**, `dist/` 번들 격리 검증 통과(`narrative` 청크는 `/` 전용, `/codex/` 0 `<script>`, 정적 카드 48·23·91·9·29·28 일치).

---

### 18.6단계 (레드팀 후속 개선): 경량 포매터 분리 · Gate 8 번들 격리 · 코덱스 5섹션 포커스 · 인물 상태 고정 개념 링크 `[완료]`
* **완성도:** **100% 완료** (18.5단계 레드팀 후속 제안 1·2번 및 3번 안전 대안 전량 반영 — 코덱스·전당 초기 번들 `-119.2KB(-42.1KB gz)` 경량화, Gate 8 프로덕션 `dist/` 격리 자동화 및 CI/CD 편입, 코덱스 전 5섹션 해시 앵커 `<h3>`/`<summary>` 포커스, 좌측 인물 상태 패널 하단 고정 1~2개 상황별 개념 사전 링크, `qa.mjs` · `audit-health.mjs` · Vitest `10/10` · `astro build` · `qa.mjs --only-dist` **0오류·0경고** 통과)
* **완료 내역 (신설·수정 파일 및 검증 실측):**
  1. **경량 공통 포매터 분리 & Gate 8 프로덕션 번들 격리 자동화 (`src/engine/formatters.js`, `src/engine/createEngine.js`, `CodexExplorer.tsx`, `HallOfSoulsApp.tsx`, `scripts/qa.mjs`, `package.json`, `.github/workflows/{qa,deploy}.yml`):**
     * `SAVE_VERSION`, `ALIGNMENT_*`, `STAT_META`, `FOCUSES`, `formatImperialYear`/`Date`, `getWorldShortTag`, `normalizeAlignment`/`getAlignmentInfo`, `createCoreFormatters(DATA)`(`describeReq` + 6종 O(1) 조회)를 [`src/engine/formatters.js`](./src/engine/formatters.js)로 단일 정본 분리해 `createEngine.js`와 공유했다.
     * `CodexExplorer.tsx`와 `HallOfSoulsApp.tsx`에서 `createEngine.js`·`src/data/index.js` 즉시 임포트를 제거(`HallOfSoulsApp`은 `.json` 백업 내보내기/불러오기 클릭 시에만 `createEngine.js` 지연 로드)해, `/codex/**`와 `/hall/` 초기 JS에서 `createEngine.js`(`119.20KB` / `42.07KB gz`)를 완전히 분리했다.
     * `scripts/qa.mjs`에 **Gate 8(`--only-dist` / `--check-dist`)**을 신설해 9개 라우트 존재, `/codex/` 0KB JS, 비게임 페이지 `narrative`/`createEngine` 누수 0건, 메인 게임(`/`)의 `narrative` 지연 로딩 및 67KB `glossary.js` 산문 비번들링, SSR 카드 수량(`48/23/91/9/29/28`)을 `npm run verify` 및 GitHub Actions(`qa.yml`, `deploy.yml`)에서 자동 검증한다.
  2. **코덱스 전 5개 섹션 해시 앵커 `<h3>` 자동 포커스 확대 (`src/components/codex/CodexExplorer.tsx`):**
     * 기존 `careers` 전용 해시 처리를 `worlds`, `careers`(트리 `<summary>` + 직군 카드 `<h3>`), `chapters`, `timeline`, `characters` 전 5개 섹션으로 확대하고, 초기 진입과 `hashchange` 이벤트 모두에서 검색 필터를 자동 해제한 뒤 대상 헤딩으로 스크롤 및 포커스를 이동하게 구현했다.
  3. **좌측 인물 상태 패널 고정 1~2개 상황별 개념 사전 링크 (`src/lib/contextualGlossary.js`, `src/components/game/DossierPanel.tsx`, `src/styles/global.css`):**
     * 사건·직군 카드마다 `<details>`를 추가할 때 생기는 스크린 리더 `Tab` 정지 폭증과 67KB `glossary.js` 번들 유입을 막기 위해, 2KB 경량 매핑(`contextualGlossary.js`, 31종 용어 · 21개 전체 직군 트리 완비, `qa.mjs` Gate 4G 전수 검증)으로 좌측 `DossierPanel` 하단 단일 고정 구역(`#dossier-glossary`)에만 현재 세력·출신·자질·체류 행성에 맞는 새 탭 링크 1~2개를 배치했다.
  4. **최종 자동 검증 실측 결과:**
     * **`node scripts/qa.mjs`:** Gate 1~6 0오류 (`100 files` 표기/기호 0건, `Gate 4G` 48종 + 31종 상황별 매핑 · 21세력 트리 100% 유효, 300생애 `maxRepeat=2`, `1000q=452.8ms`).
     * **`node scripts/audit-health.mjs --lives=100` (`seed=2179392311`):** 크래시·소프트락·마이그레이션·오염 누수 0건, 명예 마감 `2/2`, `maxSave=931.4KB <= 2048KB`.
     * **`npm test` (`tests/game-a11y.test.tsx`):** **10 / 10 PASS** (전 5섹션 코덱스 해시·`hashchange` 포커스 + 좌측 인물 상태 고정 링크 및 사건/직군 카드 내 링크 0건 검증 추가).
     * **`npm run build && npm run qa:dist`:** Astro 9페이지 빌드 완료(8.53s, 0오류 · 0경고) + **Gate 8 0오류** (`codexOverviewJS=0KB`, `narrativeLeaks=0`, `engineLeaks=0`, `glossaryProseInGame=0`, SSR 카드 `48/23/91/9/29/28`).

---

## 10. 차기 정비 · 고도화 계획 (19단계 예정 · 사용자 확정 반영)

5차 인류제국 대확장(12~18단계) 및 Astro + React 아일랜드 전환·후속 고도화(18.5~18.6단계)는 100% 완료되었다. 향후 착수할 19단계는 **① 실플레이 기반 4대 시뮬레이션 몰입감·정합성 대개편(`19-S1` · `19-S2`, 사용자 확정 완료)**과 **② 기존 확정 정비 과제(`19-A` · `19-B` · `19-C`)**로 구성하며, 독립 커밋·검증이 가능하도록 단계별로 순차 수행한다.

### 10.1 시뮬레이션 정합성 · 진로 · 이동 · 스탯 4대 대개편 (`19-S1` / `19-S2` · 사용자 권장안 확정)

> **확정된 3대 핵심 규칙 (사용자 승인 · 실구현 고증 반영):**
> 1. **14세 귀족 출신 초기 배치:** `planetary_noble` · `rogue_trader_scion` · `terra_high_blood`는 `schola_progenium`과 동일하게 **14~18세 가문 수습 기간(미확정)**을 두어 `minAge: 18` 정규 기관(`arbites`, `commissar`, `inquisition_acolyte`, `tech_priest` 등)까지 온전한 1년간 직접 선택하게 하고, **19세 진입 시** 미선택이면 `administratum`(아인종 `pdf_trooper`, 이단자 `chaos_cultist`)에 자동 편입한다(세습 가문 `knight_blood` -> 종자, `navigator` -> 견습 항법사, `mechanicus_blood` -> 스키타리는 14세 자동 편입 유지).
> 2. **입단 심사 & 복무 쿨다운:** 일반 기관 입단 심사(비치명적 d100) 탈락 또는 선발 시련 생존 탈락 시 **2년 재지원 대기**, 정규 서약 기관 취임 후 타 수동 전직까지 **2년 최소 복무 기간** 적용(동적 발탁·스카우트 이벤트, 사건 `forceCareer` 및 초인·카오스 전환은 예외).
> 3. **행성 출입 자격 기준:** 아스타르테스 모성(`baal`, `fenris`, `nocturne`)은 해당 챕터·이단심문소·Tier 5+ 지휘관·전시 구원군으로 격리하고, `terra`는 소속 기관·임페리얼 피스트·고위직·성직 순례(`faith >= 65`)·**귀족 권위 45+** 청원을, `mars`는 화성 조약 고증에 따라 국교 순례 대신 기계교·제국 해군·기사 가문·이단심문소·테크마린·고위직·**귀족 권위 45+** 청원을 허용한다.

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **19-S1 (Phase A). 신분·생활권 정합성 개편 & 14종 페르소나 자동 QA** | `[완료]` | **① 선언적 계층 축 도입 (`src/engine/formatters.js`, `createEngine.js`):** `makeReqContext`에서 `socialTier`(`underclass`/`common`/`elite`/`apex`), `lifeRealm`(`civilian`/`cloistered`/`military`/`void`/`mechanicus`/`heretic`), `bodyClass`(`mortal`/`augmetic`/`transhuman`/`dreadnought`/`daemonic`) 자동 산출 및 `checkReq`/`describeReq` 지원(`minSocialTier`, `maxSocialTier`, `anySocialTiers`, `anyRealms`, `excludeRealms`, `anyBodyClasses`, `excludeBodyClasses`, `excludeTrees`, `maxCareerTier`). **② Gate 4P 신설 (`scripts/qa.mjs`):** 대표 페르소나 14종(테라 고위 귀족/하이브 귀족/스콜라/기사/항법사/크리그/보이드본 유아 + 아스타르테스/드레드노트/쿠스토데스/그레이 나이트/하이 로드/리빙 세인트/데몬 프린스)에 대해 전체 사건·연대기 금칙어 충돌 0건 및 유년기/성인기 최소 풀 하한(`>= 8`) 자동 검증. **③ 데이터 정합화 & 유년기 보강:** 배급소 통조림·하층민·생활권·신체 누수 일괄 교정 + [`src/data/chronicles/childhood_elite.js`](./src/data/chronicles/childhood_elite.js) `+24종` 및 `chaos_endgame.js` `+4종`(총 `790건`, 16개 파일) 확충. |
| **19-S2 (Phase B). 진로 서약·스카우트 · 성간 이동 현실화 · 무하락 스탯 인플레 억제** | `[완료]` | **① 정규 기관 소속 고정 & 입단 심사 & 스카우트 초빙 (`createEngine.js`, `AutonomousPanel.tsx`):** `SAVE_VERSION = 4`(`careerRetryAfter`, `lastCareerChangeYear` 자동 마이그레이션). 비구속 초년·민간(`child`, `menial_worker`, `underhive_ganger`, `underhive_boss`, `guild_artisan`, `pdf_trooper`)에서 정규 서약 기관 입단 시 비치명적 입단 심사 d100(목표 40~88%, 탈락 2년 대기, 합격 2년 최소 복무) 적용, 입단 후 수동 목록은 같은 트리 승급·카오스·초인/동급 이상 사이커만 노출해 수평 이직 쇼핑 차단(`CLOSED_VOW_TREES` 종신 서약 격리). 단, 고권위(`Inf >= 52`) 또는 성향·스탯 정합성 충족 시 타 기관에서 먼저 찾아오는 **동적 초빙·차출(스카우트) 이벤트** 신설. **② 성간 이동 현실화 (`createEngine.js`, `AutonomousPanel.tsx`):** `canAccessWorld(state, world)` 출입 자격 매트릭스 적용(아스타르테스 모성·화성 조약·크리그/카타찬·테라·기사 행성 격리), 말단 의무 복무자(`forced` · `astartes_scout`) 수동 행성 선택 잠금(강제 파견 일관화), 야만 행성 일반 시민 이탈 불가, 귀족 `Inf < 45` 인접 성역 / `45+` 은하 전역, 이동 쿨다운 4년(`autonomous` 3년), `createDynamicTransitEvent`에 카오스/이단 전용 분기 및 행정청 감사·국교 순례·귀족 알현·전시 비상 동원 등 비군사 강제 소환 확대. **③ 억지 하락 없는 스탯 인플레 억제 (`createEngine.js`, `ActiveEventPanel.tsx`):** 스탯 임의 감소 0건 유지; `applyDiminishedStatGain`으로 패시브·사건·입단 수확 체감 도입; `computeCheckPreview` 단일 정본 도입(부상 `-8/-16`, 오염 `-8/-15`[카오스 면제], 임페리움 니힐루스 `-5`, 고위 난제 `-5/-9` 투명 표시 + 70% 초과 완만 압축 `max 90%`). **④ QA·테스트·교차 감사·레드팀:** `qa.mjs` Gate 4/4P(15종 페르소나+타 행성 방문·성인 귀족)·Gate 7A/7C 1,500생애 검증 · Vitest 12/12 · 독립 교차 감사 + 2단 레드팀(P0 1·P1 5·P2 5) 전량 해소. |

#### 10.1.1 19-S1 (Phase A) 완료 보고서 (달성도 100% · 19단계 누적 진행률 1/2)

* **구현 및 교차 감사 보완 내역:**
  1. **선언적 계층 엔진 (`src/engine/formatters.js`, `src/engine/createEngine.js`):** `computeSocialTier` · `computeLifeRealm`(보이드본 모성 우선 판정으로 함선 아동의 행성 야외·날씨 누수 차단) · `computeBodyClass` 및 `getStratification(state)` 추가. `checkReq` · `describeReq`(다중 제외 축 병렬 표기 수정 포함)에 9종 조건 키 전량 지원.
  2. **신규 전용 연대기 (+28건, 762 -> 790건 / 16개 파일):** [`src/data/chronicles/childhood_elite.js`](./src/data/chronicles/childhood_elite.js) `+24건`(테라 고위 귀족 5 · 하이브 귀족 5 · 스콜라 프로제니움 6 · 나비스 노빌리테 4 · 기사 가문 2 · 보이드본 2, `priority: 3`) + [`src/data/chronicles/chaos_endgame.js`](./src/data/chronicles/chaos_endgame.js) 데몬 프린스 전용 `+4건`(14건).
  3. **전수 정합성·고증 교정 (12개 데이터 파일 + `GameApp.tsx`):** 유년기·일반·행성·성향·직군·계급·생애 연대기 및 4개 사건 파일의 신분/생활권/신체 누수 일괄 차단, 독립 읽기 전용 감사(`iv_lore_auditor`, `iv_prose_a11y_critic`)에서 지적된 드레드노트·하이 로드·리빙 세인트·데몬 프린스·소로리타스 수련생·길드 거상·타우 다모클레스 연대(`minYear: 745`)·카디아 모성(`anyHomeWorlds`)·`세라마이트`/`바알 프리무스` 표기·`ev_underhive_gang`/`ev_s165_align_humane_04` 도달성·`GameApp` 언마운트 타이머 정리까지 전량 해결.
  4. **최종 자동 검증 실측 결과:**
     * **`node scripts/qa.mjs`:** ALL 6 QA GATES + Gate 4G + **Gate 4P** 0오류 (`14종 페르소나 collisions=0, minChroniclePool=9 >= 8`, `EVENTS=670, CHRONICLES=790`, `maxRepeat=2`, `1000q=793.2ms`).
     * **`node scripts/audit-health.mjs --lives=100` (`seed=3224311827`):** 크래시·소프트락·마이그레이션·오염 누수 0건, 명예 마감 `9/9`, `maxSave=1087.4KB <= 2048KB`.
     * **`npm test`:** **10 / 10 PASS** (미처리 타이머/오류 0건).
     * **`npm run build && npm run qa:dist`:** Astro 9페이지 빌드(7.64s, 0오류) + **Gate 8 0오류** (`narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0`).

#### 10.1.2 19-S2 (Phase B) 완료 보고서 (달성도 100% · 19-S1/S2 대개편 2/2 완료)

* **구현 내역 (`SAVE_VERSION = 4`, 엔진 · UI · 데이터 · QA):**
  1. **귀족·스콜라 14~18세 수습 · 정규 서약 기관 고정 · 입단 심사 · 타 기관 특별 초빙 (`src/engine/formatters.js`, `src/engine/createEngine.js`, `src/components/game/AutonomousPanel.tsx`, `src/components/game/GameApp.tsx`):**
     * `SAVE_VERSION = 4` 상향 및 `migrateState`(`v1~v3 -> v4` `careerRetryAfter`/`lastCareerChangeYear` 자동 마이그레이션 및 `Array.isArray` 방어) 적용.
     * `planetary_noble`·`rogue_trader_scion`·`terra_high_blood`·`schola_progenium`에 **14~18세 수습 기간**을 부여하고 `19세` 진입 시 미선택 자동 배치(`administratum`, 아인종 `pdf_trooper`, 이단자 `chaos_cultist`)를 구현해 `minAge: 18` 기관 지원 창구를 온전히 보장했다.
     * `UNBOUND_CAREERS` / `CLOSED_VOW_TREES` / `isManualCareerAllowed` / `getAdmissionPreview`를 도입해 첫 정규 서약 입단 시 비치명적 d100 입단 심사(`40~88%`, 출신 가산 `+8%`), 탈락·생존 시련 실패 시 **2년 재지원 대기**, 정규 기관 취임 시 **2년 최소 복무**, 기역임 직군 재진입 차단, 그리고 `createDynamicCareerOfferEvent`의 **타 기관 특별 초빙·차출(스카우트)** 및 종신 폐쇄 서약 기관(소로리타스·기계교·항법사·기사 가문·사이커) 격리를 구현했다.
     * `AutonomousPanel.tsx`에 입단 심사·선발 시련 성공률 및 순직 위험 안내, 비활성 쿨다운 버튼 포커스 안전 복원(`:not(:disabled)` 탐색 및 `#heading-auto` 폴백), 14~18세 수습 안내(이단자·아인종 분기 포함)를 추가하고, `GameApp.tsx`의 `careerAlert` 자동 일시정지가 쿨다운 잠금 버튼에 오발동하지 않도록 필터링했다.
  2. **성간 이동 출입 자격 매트릭스 · 말단 강제 파견 잠금 · 비군사/카오스 파견 (`src/engine/createEngine.js`, `src/components/game/AutonomousPanel.tsx`):**
     * `canAccessWorld(state, world)`로 파괴 행성·이단자 제국 성지 출입 차단, 아스타르테스 모성(`baal`/`fenris`/`nocturne`)·테라·화성(화성 조약 준수: 국교 순례 제외)·크리그/카타찬·기사 행성 출입 자격을 통합 판정한다.
     * `forced`/`astartes_scout` 말단 복무자 수동 행성 선택 잠금(`forcedLock: true`), 야만 행성 일반 시민 이탈 불가, 귀족 `Inf < 45` 인접 성역 / `45+` 은하 전역, 4년(`autonomous` 3년) 이동 쿨다운을 적용했다.
     * `createDynamicTransitEvent`에 카오스/이단자 전용 약탈·밀항 분기와 비군사 기관 소환(행정청 감사·국교 순례·귀족 알현·전시 비상 동원)을 추가하고, `createWarpAnomalyTransitEvent`가 타니스 등 파괴 임박 행성으로 시간 도약하지 않도록 `destroyedYear` 가드를 추가했다.
  3. **억지 하락 없는 스탯 수확 체감 & `computeCheckPreview` SSOT (`src/engine/createEngine.js`, `src/components/game/ActiveEventPanel.tsx`, `src/data/events/careers/chaos_ranks.js`):**
     * `applyDiminishedStatGain`으로 임의 스탯 감소 0건을 유지하면서 패시브/사건/입단 구간별 완만한 수확 체감을 적용하고 실제 반영 수치만 로그에 표기한다.
     * `computeCheckPreview` 단일 정본으로 부상(`-8/-16`)·워프 오염(`-8/-15`, 카오스 트리/데몬 프린스 면제)·임페리움 니힐루스(`-5`)·고위 난제(`-5/-9`)와 70% 초과 압축(`max 90%`)을 `rollD100`과 `ActiveEventPanel.tsx`(TTS 공백 경계 포함)에 동기화했다.
     * `src/data/events/careers/chaos_ranks.js` 핵심 CSM·카오스 로드 사건 6종에 `alignBias: "ruthless"`를 보강해 3대 성향 비교 롤플레이의 암흑 성향 우위를 확보했다.
  4. **독립 교차 감사 2종 + 2단 레드팀 종합 검수(`iv_redteam_reviewer` — P0 1건 · P1 5건 · P2 5건) 선별 판정 및 전량 해소:**
     * **P0-1 해소 (`src/data/chronicles/childhood_elite.js` `+6종` -> 총 `796종`, `childhood.js`):** 비보이드본 19개 행성에서 태어난 `rogue_trader_scion`(`socialTier: elite`, `lifeRealm: void`)의 유년기 연대기 기아를 전용 연대기 6종(`ch_s19_kid_rt_inf_1~3`, `ch_s19_kid_rt_1~3`)과 함선 공용 조건 확장·`ch_s8_kid_void_ch_3` `maxSocialTier: "common"` 가드로 완전 해소하고, Gate 4P에 15번째 페르소나(`rt_scion_kid`)로 상시 편입했다.
     * **P1-1~P1-5 전량 해소:** ① `makeReqContext`에 `alignInfo`를 노출하고 `getContextualOptions`의 `reqCtx.align` 버그(선량/교조 갱단원 유령 버튼·`readyEventCareers` 오표시) 수정, ② `CLOSED_VOW_TREES`를 `createDynamicCareerOfferEvent`의 `lateralAllowed` 이전 및 `readyEventCareers`에 선제 적용하고 `careers.js`(`hive_crime_lord`/`militarum_general`/`planetary_governor`) `excludeTags` 및 수동 `rt_seneschal` 폐쇄 서약 차단 강화, ③ `applyOutcome` `trialFailFor` 시 `careerRetryAfter` 2년 기록으로 동분기 수동 재도전 우회 차단, ④ `worlds.js`(화성·크리그·바알·펜리스·카타찬 등)·`civil_void.js`(`ev_absurd_servitor_sentence`) 타 행성 방문 초인·성인 귀족 누수 차단 및 Gate 4P 타 행성 방문·성인 귀족 스윕 추가, ⑤ `glossary.js`(`eight_stats_d100`, `career_tiers_transit`), `StartScreen.tsx`, `index.astro`, `README.md`의 `5%~90%` 규칙 및 `796종` 연대기 수치 전면 동기화.
     * **P2-1~P2-5 선별 반영:** `ecclesiarch`·`inquisitor_representative` `trialCheck.diff` `-62 -> -50` 형평 조정(단, `terra_high_blood` 출생 가중치는 원작 희소성 보존을 위해 `2.0` 유지), `qa.mjs` `pickSmartChoice`의 `computeCheckPreview` SSOT 반영, `GameApp.tsx` `careerAlert` 쿨다운 필터링, 14세 서약 편입(`nav_apprentice`/`knight_squire`/`skitarii`) `lastCareerChangeYear` 동기화, 타니스 `destroyedYear` 시간 도약·야만 행성 민간 이탈 가드, `AutonomousPanel.tsx` 선발 시련 확률·이단 수습 문구 및 `migrateState` `Array.isArray` 가드까지 전량 반영했다.
  5. **최종 통합 QA `--deep` · 200생애 퍼징 · Vitest · Gate 8 정적 빌드 실측 결과:**
     * **`npm run qa:deep` (`node scripts/qa.mjs --deep`):** **ALL 7 QA GATES PASSED WITH 0 ERRORS.**
       * Gate 1~5: `8 core, 48 events, 16 chronicles, glossary=48; maxEv=92.3KB, maxCh=44.9KB`, 25 Astro/React 정적 접근성, `101 files` 표기/기호 0오류, `EVENTS=670, CHRONICLES=796`, Gate 4G 48종·31종 매핑 0오류, **Gate 4P `15-persona + cross-world/adult-elite collisions=0, minChroniclePool=9 >= 8`**, Gate 5 `Softlocks=0, min(age2=6, age10=6), dupRate=24.6%`.
       * Gate 7A/7B: `92 nodes, 78 anyPastCareers checks`, **`1,864 req specs` 합성 도달성 증명**, **`directCareerMatch(events=91/91, chronicles=91/91)`**.
       * Gate 6/7C (1,500생애): `maxRepeat=2, nihilusMismatch=0, childStuck=0, careerOffers=5,136, reachedCareers=74/91, naturalEvents=569/670, 1000q=752.5ms`, `T4+=772, T5+=641, T6=64, HighLord=17, Gov=145, RT=184, Astartes=60, GK=8, Nav=20, Ass=29, Knight=1, Saint=2, Chaos=235, DaemonPrince=4`.
       * 3대 성향 비교 롤플레이 (각 45생애): `humane(41/45, H:123/D:15/R:19)` · `dogmatic(29/45, H:39/D:66/R:11)` · `ruthless(32/45, H:14/D:10/R:89)`.
     * **`node scripts/audit-health.mjs --lives=200` (`seed=2085004747`):** `crashes=0, softlocks=0, migrateFailures=0, unknownIdWarnings=0, incorruptibleLeaks=0, actions=1,507, travels=648, retireExecOK=4/4, mortalOver300=0, maxSave=948.0KB <= 2048KB, nearLimit=0`.
     * **`npm test` (`tests/game-a11y.test.tsx`):** **12 / 12 PASS**.
     * **`npm run build && npm run qa:dist`:** Astro 9페이지 정적 빌드 완료(14.58s, 0오류) + **Gate 8 0오류** (`codexOverviewJS=0KB, narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28`).


### 10.2 기존 확정 정비 과제 (`19-A` · `19-B` · `19-C`)

| 항목 | 상태 | 확정 방향 및 작업 범위 |
| --- | --- | --- |
| **19-A. 네임드 출연 원칙 정돈 (1번 대안 확정)** | `[완료]` | **「기본 1사건 = 핵심 네임드 1인 스포트라이트, 다중 출연(<=2인)은 협동·대면 전용 크로스오버 스토리 한정」** 원칙([`AGENTS.md`](./AGENTS.md) 2.2장 6항)을 전면 구현·자동화. `TIMELINE` 다중 스포트라이트 13건을 대표 핵심 1인 중심으로 정돈하고 본문 미등장 전역 속보 2건(`tl_great_rift`, `tl_fourth_tyranic`)의 불일치 스포트라이트를 제거했으며, 분리된 핵심 대면 6건을 `src/data/events/themes/named_crossover.js`에 정사 2인 크로스오버(+6종 -> 총 14종, `EVENTS 670 -> 676` / 역사 포함 `699 -> 705`)로 신설했다. |
| **19-B. 코어 파일 크기 감시 확장 및 구조 리팩토링 (2번 확정)** | `[완료]` | `src/data/core/timeline.js`(91.9KB)를 시대별 3모듈(`src/data/core/timeline/{m41_early,m41_late,m42_indomitus}.js`, 각 28.9~33.8KB) + `0.5KB` 배럴로 무손실 분할하고, `scripts/qa.mjs` Gate 1과 `scripts/audit-health.mjs` `[Size Watch]` 대상을 코어(`timeline`/`careers`) 및 `createEngine.js`까지 확장했다. 아울러 `src/engine/formatters.js`에 공용 헬퍼 `FACTION_ENDING_KEYS` · `resolveFactionEndingKey(state, career)`를 도입해 `canRetireHonorably` · `createHonorableEndingEvent` · `evaluateLifeGrade` 3중 세력 분기를 단일 정본으로 통합했다. |
| **19-C. 신규 8인 네임드 후일담 연동 및 청취 텔레메트리 확장 (3번 확정)** | `[완료]` | `src/data/events/themes/named.js`의 4대 네임드 후일담(`ev_s4_met_*_echo`)에 18단계 신규 8인 전원을 편입(`met_kaldor_draigo`는 기밀 고증에 맞춰 `ev_s4_met_shadows_echo` 배치, 28/28인 100% 달성)하고, `named_s18.js` 6종 누락 및 `ultima.js`(`ev_macragge_forum`) `met_<id>` 중복 가드를 비크로스오버 전수 검사로 일관화했다. `scripts/audit-health.mjs`(`[Listening Rhythm]` `unshift` 헤드 로그 샘플링 · 스포트라이트 상한 · 17~18단계 최고위 8종 프로브)와 `tests/game-a11y.test.tsx`(테스트 #16·#17, 총 17개)에 청취·포커스·명예 마감 텔레메트리를 확장했다. |

#### 10.2.1 19-A · 19-B · 19-C 완료 보고서 (달성도 100% · 19단계 확정 정비 3/3 완료 · 잔여 미완 과제 0건)

* **구현 및 독립 3인 교차 감사(`iv_lore_auditor`, `iv_prose_a11y_critic`, `iv_redteam_reviewer` — 전원 읽기 전용) 교정 내역:**
  1. **Stage 19-A — 네임드 1-스포트라이트 원칙 정립 및 정사 2인 크로스오버 +6종 (`src/data/core/timeline/*.js`, `src/data/events/themes/named_crossover.js`, `scripts/qa.mjs`):**
     * 다중 네임드 `TIMELINE` 13건을 핵심 1인 중심으로 정돈(`tl_gothic_war` `ravensburg`, `tl_cain_valhalla` `cain`, `tl_armageddon_2` `yarrick`, `tl_armageddon_3` `tushan`, `tl_fall_of_cadia` `creed`, `tl_devastation_baal` `dante`, `tl_lions_gate` `valoris`, `tl_guilliman_return` `guilliman`, `tl_octarius_war` `ghazghkull`, `tl_vigilus_war` `calgar`, `tl_plague_wars` `mortarion`, `tl_arks_of_omen_lion` `lion`, `tl_fourth_tyranic` `[]`), 전역 `filter: {}` 비등장 스포트라이트(`tl_great_rift`, `tl_fourth_tyranic`)를 `[]`로 정리하고 `tl_octarius_war` 산문·선택지를 가즈쿨 선봉 지휘와 일치시켰다.
     * 분리된 정사 대면 6건을 `src/data/events/themes/named_crossover.js`에 추가(`ev_s19a_xover_yarrick_ghazghkull`, `ev_s19a_xover_creed_celestine`, `ev_s19a_xover_dante_guilliman`, `ev_s19a_xover_guilliman_cawl`, `ev_s19a_xover_calgar_abaddon`, `ev_s19a_xover_guilliman_mortarion`; 파일 총 14종, `EVENTS 670 -> 676` / 전체 사건 `699 -> 705`).
     * `scripts/qa.mjs` Gate 4에 `TIMELINE`/비크로스오버 `characters.length <= 1`, `named_crossover.js` `<= 2` 영구 불변식을 편입했다.
  2. **Stage 19-B — `timeline.js` 시대별 3분할 · 코어/엔진 크기 감시 · `resolveFactionEndingKey` SSOT (`src/data/core/timeline/**`, `src/engine/formatters.js`, `src/engine/createEngine.js`, `scripts/qa.mjs`, `scripts/audit-health.mjs`):**
     * `timeline.js`를 `m41_early.js`(11건 · `33.8KB`), `m41_late.js`(9건 · `29.5KB`), `m42_indomitus.js`(9건 · `28.9KB`) + 배럴(`0.5KB`)로 무손실 분할하고 연대기 순서 회귀 검증을 추가했다.
     * `qa.mjs` Gate 1과 `audit-health.mjs` `[Size Watch]`에 `src/data/core/**/*.js`(`careers.js` 165KB/145KB, 기타 95KB/80KB)와 `src/engine/createEngine.js`(260KB/240KB) 상시 감시를 확장했다.
     * `FACTION_ENDING_KEYS` · `resolveFactionEndingKey(state, career)`를 `formatters.js`에 신설하고 `canRetireHonorably` · `createHonorableEndingEvent` · `evaluateLifeGrade` 3곳의 세력 분기를 단일 정본으로 통합했다.
  3. **Stage 19-C — 28인 네임드 후일담 100% 연동 · 단독 중복 가드 전수 일관화 · 청취 텔레메트리 (`src/data/events/themes/named.js`, `named_s18.js`, `worlds/ultima.js`, `scripts/qa.mjs`, `scripts/audit-health.mjs`, `tests/game-a11y.test.tsx`):**
     * `ev_s4_met_primarchs_echo`(+`met_morvenn_vahl`), `ev_s4_met_commanders_echo`(+`met_ravensburg`, `met_macharius`, `met_canis_rex`), `ev_s4_met_shadows_echo`(+`met_kryptman`, `met_kaldor_draigo`), `ev_s4_met_nemesis_echo`(+`met_mortarion`, `met_trazyn`)로 28인 100% 커버리지를 완성하고 드레드노트/초인 가드를 추가했다.
     * `named_s18.js` 6종 누락 및 `ultima.js`(`ev_macragge_forum`)에 `met_<id>` 중복 가드를 보강하고, `qa.mjs` Gate 4를 비크로스오버 단일 인물 전체(의도적 재조우 화이트리스트 `ev_s14_hl_regent_guilliman`만 예외) 검사로 확장했다.
     * `audit-health.mjs`에 `[Listening Rhythm]`(헤드 `unshift` 로그 길이 · 성인 최장 무사건 공백 직군/연령 · 네임드 스포트라이트 상한 · 17~18단계 최고위 8종 프로브)을 추가하고, `tests/game-a11y.test.tsx`에 행동형 테스트 #16·#17(총 17개)을 추가했다.
  4. **독립 3인 읽기 전용 감사(P0 7건 · P1 14건 + 주요 P2) 전량 해소:**
     * **`iv_redteam_reviewer` (P1 4건 전량 해소):** ① `resolveFactionEndingKey`에서 `tree === "living_saint"`를 제거해 미승천 필멸자 `saint_vessel`의 `GOLDEN APOTHEOSIS` 오분류 차단, ② `inquisition`/`rogue_trader`/`governor`/`navis_navigator`/`mechanicus` 현역 `career.tree`를 과거 태그(`navis_officer`/`planetary_governor`)보다 우선 판정하도록 수정 + 회귀 테스트 추가, ③ `audit-health.mjs` `sampleNewLogs`가 `addLog`의 `unshift` 구조에 맞게 배열 헤드(`0..prevTop`)를 샘플링하도록 수정, ④ `qa.mjs` 단독 네임드 가드 검사를 접두사 제한에서 전수 검사로 확장하고 `ev_macragge_forum` `met_calgar` 추가.
     * **`iv_lore_auditor` (P0 4건 · P1 6건 전량 해소):** ① `yarrick_ghazghkull`을 3차 아마겟돈(`998~999.M41`, 타르타루스 하이브) 및 정확한 출처(*The Pyres of Armageddon* / *Gunheads*)로 정사화, ② `dante_guilliman`을 `001~015.M42`로 맞추고 단테의 날개 오기를 "피 묻은 데스 마스크와 부서진 황금 점프 팩"으로 교정, ③ `guilliman_cawl`에서 *The Great Work* 정사에 맞춰 카울 본인의 제조장관 요구 모순과 원격 장치 동석 오류를 해소, ④ `calgar_abaddon`의 칼가 갑주를 루비콘 프라이머리스 그라비스 아머('헤라클루스의 갑주') 및 아엘다리(사임-한) 은폐 자폭 화선으로 교정, ⑤ `creed_celestine` `998.M41` 전야 조건(`greatRift: false` 엔진 정합) 및 `tl_great_rift`/`tl_fourth_tyranic`/`tl_octarius_war` 스포트라이트·산문 정합화.
     * **`iv_prose_a11y_critic` (P0 3건 · P1 4건 + P2 전량 해소):** ① 양진영 크로스오버(`calgar_abaddon`, `guilliman_mortarion`) 무조건 선택지의 `dogmatic`/`humane` 편향·`"방독 봉인"` 제거 및 완전 중립화, ② `guilliman_cawl`/`dante_guilliman`/`calgar_abaddon`/`guilliman_mortarion`/4대 후일담/`named_s18.js` 6종의 `dreadnought`/`feral`/`fabricator_general`/`abhuman`/초인·고위직 가드 일괄 강화, ③ `met_kaldor_draigo` 기밀 후일담 이동, ④ `guilliman_mortarion`(쿠가스 역병 가마솥·데스슈라우드)과 `calgar_abaddon`(궤도 은폐 화선 유도 표식) 소재 전면 차별화 및 선택지 위험-보상·TTS 앞 5어절·중복 태그 축약 반영.
     * **레드팀 선제 리스크 메모 (후속 대형 확장 시 참고):** `createEngine.js`(`223.9KB / 4,815L`), `careers.js`(`133.6KB / 2,737L`), `arcs_focus.js`(`92.3KB / 1,853L`)는 현재 `nearLimit=0`으로 여유 범위 내이나, 외계 종족 스타팅 등 L4 확장 착수 시 `endings.js`/`careerRules.js` 및 `careers/` 분할을 선행하는 것이 안전하다.
  5. **최종 통합 검증 실측 결과 (P0/P1 전량 수정 후):**
     * **`npm run qa` (300생애):** ALL 6 QA GATES PASSED WITH 0 ERRORS (`11 core, 48 events, 16 chronicles, glossary=48; maxCore=133.6KB, engine=223.9KB, maxEv=92.3KB, maxCh=44.9KB`, `105 files` 표기·기호 0건, `EVENTS=676, CHRONICLES=796`, `maxRepeat=2`, `1000q=788.2ms`).
     * **`npm run qa:deep` (1,500생애):** **ALL 7 QA GATES PASSED WITH 0 ERRORS** (`Gate 4P collisions=0, minChroniclePool=9 >= 8`, `Gate 7A/7B: 92 nodes, 78 anyPastCareers, 1,880 req specs synthetic reachability proved, directCareerMatch 91/91`, `maxRepeat=2, nihilusMismatch=0, childStuck=0, reachedCareers=77/91, naturalEvents=597/676, 1000q=718.1ms`, 3대 성향 비교 `humane 41/45 · dogmatic 37/45 · ruthless 34/45`).
     * **`node scripts/audit-health.mjs` (`seed=1422937870`, 200생애):** `crashes=0, softlocks=0, migrateFailures=0, unknownIdWarnings=0, incorruptibleLeaks=0, retireExecOK=2/2, mortalOver300=0`, **`[Listening Rhythm] avgLogChars=79.6, maxLogChars=217, maxAdultQuietQ=51(daemon_prince@89), namedSpotlights=1742, maxSpotlightCards=2, timelineMultiSpotlights=0, apexProbesOK=8/8`**, `maxSave=1014.1KB <= 2048KB`, `nearLimit=0`.
     * **`npm run typecheck`:** **0 ERRORS.**
     * **`npm test` (`vitest@5.1.2`, `tests/game-a11y.test.tsx`):** **17 / 17 PASS** (8.85s).
     * **`npm run build && npm run qa:dist` (`astro@7.4.13`):** **9페이지 정적 빌드 완료(3.18s, 0오류·0경고)** + **Gate 8 0오류** (`codexOverviewJS=0KB, narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28`).
     * **`npm audit --audit-level=low`:** **`0 vulnerabilities`**.

### 10.3 크로스플랫폼 QA 가드 · 전당 백업 방어 · 타입체크 · Astro 7 업그레이드 (`19-M1`)

| 항목 | 상태 | 목표 범위 및 세부 명세 |
| --- | --- | --- |
| **19-M1. Windows QA 경로 수정 · 0건 가드 · 전당 백업 방어 · 타입체크 · Astro 7 / Vitest 5 업그레이드** | `[완료]` | **① 크로스플랫폼 경로 수정 (`scripts/_loadNodeData.mjs`):** `fileURLToPath(import.meta.url)` 전환으로 Windows `C:\C:\...` 경로 깨짐 해소. **② 0건 로드 즉시 실패 가드 (`scripts/_loadNodeData.mjs`, `scripts/qa.mjs` Gate 1·2·8, `scripts/audit-health.mjs`):** 코어/사건/연대기/CSS/UI/수화 엔트리 청크가 0건이면 즉시 실패 처리해 거짓 양성 차단. **③ 영혼의 전당 백업/로드 스키마 방어 (`src/lib/storage.ts`, `src/components/hall/HallOfSoulsApp.tsx`, `src/engine/createEngine.js`, `tests/game-a11y.test.tsx`):** `sanitizeHallEntry` + 원자적 `applyImportedBackup` + `migrateState` 평문 객체 가드 + `TAG_LABELS` 고유 속성 검사 + 유효 `CORE_DATA` 도감 집계 필터 + Vitest 회귀 테스트 2종 추가(총 14개). **④ 타입체크 표준화 (`package.json`, `tsconfig.json`, `.github/workflows/{qa,deploy}.yml`):** `npm run typecheck`(`astro sync && tsc --noEmit`) 및 `tsconfig.json` `astro/client` 등록으로 클린 체크아웃 단독 `tsc --noEmit` 0오류 확보. **⑤ Astro 7 + `@astrojs/react` 7 + `vitest` 5 업그레이드 (`package.json`, `astro.config.mjs`, `scripts/qa.mjs` Gate 8):** Rust 컴파일러·Vite 8(Rolldown) 백틱 동적 임포트 Gate 8 추적·`compressHTML: true` 인라인 공백 보존·`engines.node >=22.23.4` 선언 및 `npm audit` 취약점 `8 -> 0건` 해소. |
| **19-M2. 저장본 2단계 보호 · 동적 수록 건수 · 대성공/대실패 표기 · 문서/CI 정리** | `[완료]` | **① 저장본 보호 2단계 재확인 (`StartScreen.tsx`, `GameApp.tsx`):** 진행 중 저장본 존재 시 `#btn-discard-saved`·`#btn-start-random`·`#btn-start-custom`에 5초 2단계 재확인 + `#sr-live` 음성 안내 + 저장 삭제 시 `#start-heading` 포커스 안전 복원 적용. **② 수록 건수 동적 자동화(번들 0KB 누수 유지) (`index.astro`, `GameApp.tsx`, `StartScreen.tsx`):** 코어 수치는 `CODEX_COUNTS`, 분기·역사 사건 및 연대기 수치는 빌드 타임 SSG `index.astro`(`await import("../data/narrative.js")`)에서 계산해 숫자 `narrativeCounts` prop으로 전달(빌드 경고 0건 · Gate 8 격리 유지). **③ d100 `대성공`/`대실패` UI 표기 (`formatters.js`, `ActiveEventPanel.tsx`, `RecentChronicleList.tsx`, `FullChronicleView.tsx`, `chronicleText.ts`):** 추후 콘텐츠 확장을 위해 엔진 `critSuccess`/`critFail` 필드를 보존하면서 판정 배너·실시간/전체 연대기·`.txt` 내보내기에 `대성공`/`대실패` 표기를 일관 반영(밸런스 무변경). **④ 문서·CI 정리 (`README.md`, `.github/workflows/qa.yml`):** `Node.js 22.23.4+` 요구 사양 동기화 및 `qa.yml` `main` 푸시 중복 트리거 제거(`pull_request` + `workflow_dispatch` 전용). |

#### 10.3.1 19-M1 완료 보고서 (달성도 100% · 목표 5대 항목 + 독립 레드팀 리뷰 P1 4건·P2 4건 전량 완료)

* **구현 및 독립 읽기 전용 리뷰(`research`) 교정 내역:**
  1. **Windows 크로스플랫폼 경로 수정 및 0건 로드 가드 (`scripts/_loadNodeData.mjs`, `scripts/qa.mjs`, `scripts/audit-health.mjs`):**
     * `scripts/_loadNodeData.mjs` 8행의 `new URL(import.meta.url).pathname`을 `fileURLToPath(import.meta.url)`로 교체해 Windows 환경의 경로 이중 드라이브 버그를 해결했다.
     * `loadNodeImperiumRuntime()`에서 코어·사건·연대기 파일/레코드가 0건이면 즉시 예외를 던지게 하고, `qa.mjs` Gate 1(데이터·`global.css`), Gate 2(`uiFiles.length === 0`), Gate 3(`src/lib/storage.ts` 편입), Gate 8(수화 페이지 엔트리 청크 0건 가드), `audit-health.mjs` 빈 데이터셋 즉시 실패 가드를 추가했다(임시 빈 디렉토리 음성 테스트로 예외 발생 실증).
  2. **영혼의 전당 백업/로드 스키마 방어 & 레드팀 P1 4건 전량 해소 (`src/lib/storage.ts`, `src/components/hall/HallOfSoulsApp.tsx`, `src/engine/createEngine.js`):**
     * `sanitizeHallEntry()`를 신설해 `loadHall()`, `saveToHall()`, `applyImportedBackup()` 전 경로에서 필드 타입·범위·배열 여부를 정규화하고, 손상된 백업은 `localStorage` 기록 전 단계에서 원자적으로 검증·차단한다(`skippedHallCount` 토스트·스크린 리더 안내 포함).
     * 독립 리뷰 P1 4건 전량 교정: ① `grade.rank` 상한 `40 -> 100`자로 상향해 41자 엔드게임 등급(`SENATORUM IMPERIALIS — HIGH LORD OF TERRA`, `IMPERIAL LIVING SAINT — GOLDEN APOTHEOSIS`) 절단 방지, ② `asStringList` 프로토타입 키(`__proto__`/`constructor`/`prototype`) 차단 및 `HallOfSoulsApp` `Object.prototype.hasOwnProperty.call(coreFmt.TAG_LABELS, t)` 적용으로 스크린 리더 프로토타입 누수 차단, ③ `createEngine.js` `migrateState` 평문 객체 `stats` 가드 + `applyImportedBackup` `try/catch` 및 비정상 `activeState`/`prefs` 거짓 성공 차단, ④ `HallOfSoulsApp` 5대 도감 수집 `Set`을 유효 `CORE_DATA` ID로 필터링해 100% 초과 차단 및 카드 푸터·상세 건수 일치(`careerTitle` 빈 값 폴백 포함).
  3. **Astro 7.4.13 · `@astrojs/react` 7.1.9 · Vitest 5.1.2 업그레이드 & 타입체크 표준화 (`package.json`, `astro.config.mjs`, `tsconfig.json`, `.github/workflows/{qa,deploy}.yml`, `README.md`):**
     * `astro@^7.4.13`, `@astrojs/react@^7.1.9`, `vitest@^5.1.2`로 업그레이드하고 `engines.node >=22.23.4`를 명시했다(`node_modules` 414 -> 274패키지 경량화, **`npm audit` 취약점 8건 -> 0건**).
     * Astro 7 기본값 `compressHTML: 'jsx'`로 푸터 인라인 링크 사이 공백이 붙던 현상을 `astro.config.mjs` `compressHTML: true`로 보정하고, Vite 8(Rolldown)의 백틱 동적 임포트(``import(`./...js`)``)에 맞춰 `scripts/qa.mjs` Gate 8 `traceChunks` 정규식과 양성 지연 청크 탐색 검증(`dist/index.html` `narrative`, `dist/hall/index.html` `createEngine`)을 보강했다.
     * `tsconfig.json` `types`에 `"astro/client"`를 추가하고 `package.json`·CI(`qa.yml`, `deploy.yml`)에 `npm run typecheck`(`astro sync && tsc --noEmit`)를 편입해 `.astro/` 생성 전후 모두 0오류를 확보했다.
  4. **최종 통합 검증 실측 결과:**
     * **클린 `npx tsc --noEmit` (`.astro/` 삭제 상태) & `npm run typecheck`:** **0 ERRORS.**
     * **`npm run qa`:** ALL 6 QA GATES PASSED WITH 0 ERRORS (`102 files` 표기/기호 0건, 300생애 `maxRepeat=2`, `1000q=729.4ms`).
     * **`npm run qa:deep` (1,500생애):** ALL 7 QA GATES PASSED WITH 0 ERRORS (`1,864 req specs`, `directCareerMatch=91/91`, `maxRepeat=2`, `nihilusMismatch=0`, `childStuck=0`, `reachedCareers=78/91`, `naturalEvents=577/670`, 3대 성향 비교 `humane 39/45 · dogmatic 35/45 · ruthless 34/45`).
     * **`node scripts/audit-health.mjs --lives=200` (`seed=363749227`):** `crashes=0, softlocks=0, migrateFailures=0, unknownIdWarnings=0, incorruptibleLeaks=0, actions=1,755, travels=869, retireExec=7/7, mortalOver300=0, maxSave=967.5KB <= 2048KB, nearLimit=0`.
     * **`npm test` (`vitest@5.1.2`, `tests/game-a11y.test.tsx`):** **14 / 14 PASS** (5.45s, 전당 백업·`localStorage` 손상 방어 및 P1 4건 회귀 테스트 포함).
     * **`npm run build && npm run qa:dist` (`astro@7.4.13`):** **9페이지 정적 빌드 완료(2.49s, 기존 8.5~14.5s 대비 약 3.5~5.8배 고속화, 0오류·0경고)** + **Gate 8 0오류** (`codexOverviewJS=0KB, narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28`).
     * **`npm audit`:** **`0 vulnerabilities`** (업그레이드 전 8건: critical 3, high 3, moderate 1, low 1 -> 전량 해소).

#### 10.3.2 19-M2 완료 보고서 (달성도 100% · 4대 개선 전량 완료)

* **구현 내역:**
  1. **저장본 보호 2단계 재확인 (`src/components/game/StartScreen.tsx`, `src/components/game/GameApp.tsx`):** 진행 중인 저장본(`savedSummary`)이 존재할 때 `#btn-discard-saved`(저장 삭제), `#btn-start-random`(운명 모드), `#btn-start-custom`(지정 출생)에 5초 2단계 재확인 + `#sr-live` 안내를 적용해 오입력으로 인한 무경고 삭제·덮어쓰기를 차단했고, 저장 삭제 후 사라진 버튼 대신 `#start-heading`으로 초점을 안전 복원한다.
  2. **수록 건수 동적 자동화 & 0KB 번들 격리 (`src/pages/index.astro`, `src/components/game/GameApp.tsx`, `src/components/game/StartScreen.tsx`):** 코어 수치는 `CODEX_COUNTS`로, 분기·역사 사건(699) 및 연대기(796) 수치는 빌드 타임 SSG `index.astro`의 `await import("../data/narrative.js")`로 산출해 숫자 `narrativeCounts` prop으로 전달함으로써 빌드 경고 0건·클라이언트 초기 번들 누수 0KB를 유지했다.
  3. **d100 `대성공` / `대실패` 일관 표기 (`src/engine/formatters.js`, `ActiveEventPanel.tsx`, `RecentChronicleList.tsx`, `FullChronicleView.tsx`, `src/lib/chronicleText.ts`):** 추후 콘텐츠 확장을 위해 엔진 `critSuccess`/`critFail` 필드를 그대로 유지하면서 공용 `formatRollOutcomeLabel()`로 직전 판정 배너·실시간 기록·전체 기록서·`.txt` 내보내기에 `대성공`/`대실패`를 표기한다(밸런스 무변경).
  4. **문서·CI 정리 (`README.md`, `.github/workflows/qa.yml`):** 로컬 요구 버전을 `Node.js 22.23.4+`로 갱신하고, `qa.yml`의 중복 `main` 푸시 트리거를 제거(`pull_request` + `workflow_dispatch` 전용)해 `deploy.yml`과의 이중 검증 실행을 해소했다.
* **검증 결과:** `npm run qa` 6대 게이트 0오류, `npm run audit` 200생애 통과(`crashes=0, softlocks=0`), `npm run typecheck` 0오류, `npm test` **15 / 15 PASS**, `npm run build` 9페이지 **2.79s 0오류·0경고** + `npm run qa:dist` Gate 8 0오류(`narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0`, `dist/index.html` SSR 메타·시작 화면 수록 건수 `699종·796종` 동적 출력 확인).

---

### 10.4 스크린 리더 스포트라이트 개편 및 3대 비대 파일 분할 · 110KB 상한 통일 (`19-D`)

> **완료 보고 (`AGENTS.md` 1장 준수):** 예외적으로 완화해 두었던 `careers.js`(165KB)·`createEngine.js`(260KB) 크기 상한을 철회하고 프로젝트 전체 JS 파일(`core`/`glossary`/`events`/`engine`)에 일관된 **110KB / 2,200줄 상한(95KB / 1,950줄 근접 경고)** 규율을 확립했으며, 시각장애인 스크린 리더 청취 효율을 높이기 위해 네임드 스포트라이트 초회 전개·재조우 접힘 정책 및 3중/이중 낭독 차단을 전면 반영했다.

| 항목 | 상태 | 목표 범위 및 세부 명세 |
| --- | --- | --- |
| **19-D1. 스크린 리더 네임드 스포트라이트 정책 개편** | `[완료]` | **① 정책 정본 개정 (`AGENTS.md` 2.2장 6항):** 네임드 스포트라이트 `<details class="named-spotlight">`는 **초회 조우 시 자동 전개(`open`)**, 이벤트 내 모든 네임드가 이미 기조우(`previouslyMetCharacters` 또는 `met_<id>`)인 **재조우 시 기본 접힘(원할 때 펼침)**으로 개편하고, 배지·요약·헤딩 3중 이름 낭독을 금지한다. **② 기조우 판정 정확도 확보 (`src/engine/createEngine.js`):** `advanceQuarter` 내 `captureAndRegisterEventCharacters`가 `state.metCharacters`를 갱신하기 직전 기조우 목록(`previouslyMetCharacters`)을 `state.pendingEvent`에 기록해 초회 조우 오판을 차단했다. **③ UI·CSS 반영 (`ActiveEventPanel.tsx`, `global.css`):** 시각용 `.ev-badge.character`에 `aria-hidden="true"`를 부여하고 `<details>` 중복 `aria-label`을 제거했으며, `<details key=... open={!isRepeatEncounter}>`, 간결 `<summary>`(`인물 소개` / `재조우 인물 소개`), 순수 CSS border 꺾쇠 affordance·`:hover` 및 `@media (prefers-reduced-motion: reduce)` `.named-spotlight[open]` 복구까지 완료했다. **④ 행동형 테스트 갱신 (`tests/game-a11y.test.tsx`):** 테스트 #18로 초회 전개·부분초회 2인 크로스오버 전개·재조우 접힘+클릭 펼침+재렌더 유지·구저장본 폴백·배지/그룹 중복 낭독 차단·실제 `advanceQuarter` 계약을 검증했다. |
| **19-D2. `arcs_focus.js` 2분할 및 `careers.js` 4분할 (전 데이터 파일 < 110KB)** | `[완료]` | **① `src/data/events/themes/arcs_focus.js`(92.3KB · 34건) 2분할:** `src/data/events/themes/focus.js`(삶의 초점 1·2막 12건, `34.8KB · 701L`)와 `src/data/events/themes/origins_tags.js`(특수 출신·선천 자질·명예/전역 태그 연작 22건, `57.6KB · 1,156L`)로 무손실 분리 후 기존 `arcs_focus.js` 삭제(`assert.deepStrictEqual` 34건 100% 일치 확인). **② `src/data/core/careers.js`(133.6KB · 92직군) 4분할 + 배럴:** `src/data/core/careers.js`(`0.7KB` 배럴) + `src/data/core/careers/` 4개 도메인 모듈(`civil_militarum.js` 37직군 `50.2KB`, `faith_shadow.js` 23직군 `33.0KB`, `transhuman_chaos.js` 19직군 `29.7KB`, `specialist_factions.js` 13직군 `21.9KB`)로 무손실 분할(`assert.deepStrictEqual` 원본 92직군 순서·내용 100% 일치 확인). |
| **19-D3. `createEngine.js` 4개 도메인 모듈 분리 및 전 파일 110KB 상한 일관화** | `[완료]` | **① 엔진 도메인 분리 (`src/engine/createEngine.js` 223.9KB -> `74.4KB · 1,886L` + 4모듈):** `src/engine/careerRules.js`(`33.2KB · 781L`: 순수 SSOT `UNBOUND_CAREERS`, `CLOSED_VOW_TREES`, `isUnboundCareer`, `isDirectSuccessorReq`, `isClosedVowCrossBlocked`, `isIncorruptibleTags`, `isCareerTransitionBlockedPure`, `isManualCareerAllowedPure`, `evaluateDynamicOfferEligibilityPure`, `getPrimaryAdmissionStat` + 팩토리), `src/engine/careerActions.js`(`29.4KB · 613L`), `src/engine/endings.js`(`44.7KB · 755L`), `src/engine/travel.js`(`50.2KB · 1,107L`)로 무순환 DAG 분리 완료(59개 `Engine` API 키 순서·동작 100% 동일, `formatters.js` `23.7KB` 경량 격리 유지). **② QA 규칙 SSOT 통합 (`scripts/qa.mjs` Gate 7A):** Gate 7A가 `careerRules.js`의 순수 전직·동적 발탁 판정 헬퍼를 직접 import해 엔진-QA 규칙 드리프트를 제거했다. **③ 전 파일 110KB 상한 통일 & Gate 2/8·퍼징 강화 (`scripts/qa.mjs`, `scripts/audit-health.mjs`):** `careers.js`·`createEngine.js` 예외 상한을 폐지하고 `core`/`glossary`/`events`/`engine` 전 파일에 **110KB / 2,200줄 하드 상한(95KB / 1,950줄 경고)**을 일관 적용했으며(`chronicles` 70KB / 1,400줄 유지), Gate 2 정적 페이지 소스 레벨 엔진 import 격리·Gate 8 분할 엔진 5모듈 청크 감시·`audit-health.mjs` `previouslyMetCharacters` 누락 0건 하드 가드를 확립했다. |

#### 10.4.1 19-D 완료 보고서 (달성도 100% · 19-D1/D2/D3 3/3 완료 · 19단계 전체 누적 달성률 100% · 잔여 미완 과제 0건)

* **구현 및 독립 2인 읽기 전용 교차 감사(`iv_prose_a11y_critic`, `iv_redteam_reviewer`) 교정 내역:**
  1. **Stage 19-D1 — 스크린 리더 네임드 스포트라이트 정책 개편 (`AGENTS.md`, `src/engine/createEngine.js`, `src/components/game/ActiveEventPanel.tsx`, `src/styles/global.css`, `tests/game-a11y.test.tsx`):**
     * `AGENTS.md` 2.2장 6항과 6장 용량 규율을 정본 개정하고, `advanceQuarter`의 드레드노트·`TIMELINE`·`EVENTS` 전 경로에 `captureAndRegisterEventCharacters`를 적용해 `state.metCharacters` 갱신 직전 스냅샷(`previouslyMetCharacters`)을 `state.pendingEvent`에 보존했다.
     * `ActiveEventPanel.tsx`에서 시각용 `.ev-badge.character`에 `aria-hidden="true"`를 부여하고 `<details key={...} open={!isRepeatEncounter}>`로 초회/부분초회 자동 전개·재조우 기본 접힘과 간결 `<summary>`(`인물 소개` / `재조우 인물 소개`)를 적용했다(`previouslyMetCharacters` 미포함 구저장본 폴백 포함).
  2. **Stage 19-D2 — `arcs_focus.js` 2분할 및 `careers.js` 4분할 (`src/data/events/themes/{focus,origins_tags}.js`, `src/data/core/careers.js`, `src/data/core/careers/*.js`):**
     * `arcs_focus.js`(92.3KB · 34건)를 `focus.js`(12건 · `34.8KB`) + `origins_tags.js`(22건 · `57.6KB`)로 무손실 분리하고 삭제했다(사건 파일 `48 -> 49`개, 총 676건 불변).
     * `careers.js`(133.6KB · 92직군)를 배럴(`0.7KB`) + 4개 도메인 모듈(`civil_militarum.js` `50.2KB`, `faith_shadow.js` `33.0KB`, `transhuman_chaos.js` `29.7KB`, `specialist_factions.js` `21.9KB`)로 무손실 분할해 기존 92직군 배열 순서를 100% 유지했다(코어 파일 `11 -> 15`개).
  3. **Stage 19-D3 — `createEngine.js` 4모듈 분리 · Gate 7A SSOT · 전 파일 110KB 상한 통일 (`src/engine/*.js`, `scripts/qa.mjs`, `scripts/audit-health.mjs`):**
     * `createEngine.js`(`223.9KB · 4,815L`)를 코어(`74.4KB · 1,886L`) + `careerRules.js`(`33.2KB · 781L`) + `careerActions.js`(`29.4KB · 613L`) + `endings.js`(`44.7KB · 755L`) + `travel.js`(`50.2KB · 1,107L`)로 분리해 전 엔진 파일 6종을 75KB·1,900줄 이하로 안착시켰다.
     * `scripts/qa.mjs` Gate 1·`scripts/audit-health.mjs` `[Size Watch]`의 예외 상한을 폐지해 `core`/`glossary`/`events`/`engine` 전 파일 110KB·2,200줄 하드 상한(95KB·1,950줄 경고)을 통일했고, Gate 7A가 `careerRules.js` 순수 SSOT를 직접 import하게 전환했으며, Gate 8에 분할 엔진 5모듈 청크 탐지 및 동적 SSR 카드 수량 출력을 반영했다.
  4. **독립 2인 읽기 전용 감사(`iv_prose_a11y_critic` P0 0 · P1 2 · P2 1 / `iv_redteam_reviewer` P0 0 · P1 4) 전량 해소 및 주체성 판정:**
     * **전량 해소한 `P1`/`P2`:** ① `ActiveEventPanel.tsx` `<details>` 중복 `aria-label` 제거(NVDA/JAWS/VoiceOver 그룹+요약 이중 낭독 차단) 및 테스트 #18 단언 추가, ② `global.css` `.named-spotlight-summary` 순수 CSS border 꺾쇠(`::after`) 및 `:hover` 시각 affordance 추가(장식 기호 0건 유지), ③ `global.css` `@media (prefers-reduced-motion: reduce)`에 `.named-spotlight[open]` 및 `.named-spotlight-summary::after` 명시도 복구, ④ `qa.mjs` Gate 2 다중 줄/속성 순서 무관 스포트라이트 정적 가드 및 정적 페이지 소스 레벨 엔진 import 격리 추가(Rolldown 난독화·tree-shaking 우회 차단), ⑤ `careerRules.js` `evaluateDynamicOfferEligibilityPure` SSOT 추출 및 Gate 7A 조기 `return false` 단락 제거, ⑥ `glossary.js` 110KB 감시 편입 및 `audit-health.mjs` `previouslyMetCharacters` 누락 0건 하드 가드·재조우 접힘 집계 추가.
     * **차기 L4 확장 시 `[후순위 보류 후보]` (레드팀 리스크 메모):** `createEngine.js`(`1,886L`, 1,950L 경고까지 64줄 여유)·`alignment.js`(`91.0KB`)·`lifecycle.js`(`1,830L`)·`scripts/qa.mjs`(`2,804L`)는 현재 `nearLimit=0`으로 안정적이나, 차기 대형 확장(외계 종족 스타팅 등 L4) 착수 전 `reqEvaluator.js` 추가 분리와 `qa.mjs` 게이트 모듈화를 선행하는 것이 안전하다.
  5. **최종 통합 검증 실측 결과 (감사 지적 전량 수정 후):**
     * **`npm run qa` (300생애):** **ALL 6 QA GATES PASSED WITH 0 ERRORS · 0 WARNINGS** (`15 core, 49 events, 16 chronicles, 6 engine, glossary=48; maxCore=66.9KB, maxEngine=74.4KB, maxEv=91.0KB, maxCh=44.9KB`, Gate 2 25파일 정적 접근성+소스 임포트 격리, Gate 3 `114 files` 0건, Gate 4/4G/4P `collisions=0, minChroniclePool=9 >= 8`, `maxRepeat=2`, `1000q=686.4ms`).
     * **`npm run qa:deep` (1,500생애):** **ALL 7 QA GATES PASSED WITH 0 ERRORS · 0 WARNINGS** (`Gate 7A/7B: 92 nodes, 78 anyPastCareers, 1,880 req specs synthetic reachability proved, directCareerMatch 91/91`, `maxRepeat=2, nihilusMismatch=0, childStuck=0, reachedCareers=75/91, naturalEvents=581/676, 1000q=681.5ms`, 3대 성향 비교 `humane 36/45 · dogmatic 37/45 · ruthless 38/45`).
     * **`node scripts/audit-health.mjs` (`seed=1054357116`, 200생애):** `crashes=0, softlocks=0, migrateFailures=0, unknownIdWarnings=0, incorruptibleLeaks=0, retireExecOK=4/4, mortalOver300=0`, **`[Listening Rhythm] avgLogChars=80.8, maxLogChars=217, maxAdultQuietQ=55(renegade_marine@71), namedSpotlights=1729(repeat=294, missingPrevMet=0), maxSpotlightCards=2, timelineMultiSpotlights=0, apexProbesOK=8/8`**, `maxSave=998.5KB <= 2048KB`, **`nearLimit=0`**.
     * **`npm run typecheck`:** **0 ERRORS.**
     * **`npm test` (`vitest@5.1.2`, `tests/game-a11y.test.tsx`):** **18 / 18 PASS** (6.08s).
     * **`npm run build && npm run qa:dist` (`astro@7.4.13`):** **9페이지 정적 빌드 완료(2.48s, 0오류·0경고)** + **Gate 8 0오류** (`codexOverviewJS=0KB, codexStaticJS=479.7KB, hallStaticJS=489.4KB, narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28`).
     * **`npm audit --audit-level=low`:** **`0 vulnerabilities`**.

---

## 11. 20단계 고도화 완료: 구조 선제 모듈화 · M41 시대 병목 해소 · d100 극단 판정 활성화 & 4대 핵심 공백 대보강 (`Stage 20`)

> **완료 보고 (`AGENTS.md` 1장 준수):** 19단계 완료 직후 [`scripts/coverage-report.mjs`](./scripts/coverage-report.mjs) 실측과 19-D 레드팀 리스크 메모를 바탕으로, **① `createEngine.js`/`scripts/qa.mjs` 선제 모듈화 · M41 역사 연표 3대 진입 병목 교정 · `critSuccess`/`critFail` 선택적 서사 스키마 활성화(`20-A`)**, **② 플레이 체감 공백 최상위 4대 축(중노년·고령 46~100세, 무명 8행성, Tier 2~4 중견 직군, 초인·고위직 초점 3막 및 교조/자비 고위 딜레마) 대보강(`20-B`)**, **③ 독립 2인 교차 감사(`iv_lore_auditor` · `iv_prose_a11y_critic`) 및 2단 레드팀 리뷰(`iv_redteam_reviewer`) P0/P1 전량 해소(`20-C`)**를 100% 완수했다. (외계 종족 스타팅 등 L4 방향 전환은 사용자 사전 확정 영역으로 본 단계 범위에서 제외했다.)

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **20-A (Phase A). 엔진·QA 선제 분리 · M41 시대 병목 교정 · `critSuccess`/`critFail` 엔진 활성화** | `[완료]` | **① `src/engine/reqEvaluator.js` 무순환 분리 (`318L · 11.1KB`):** `createEngine.js`(`1,886L -> 1,643L · 65.1KB`)에서 버킷 인덱싱·계층 산출·`makeReqContext`·`checkReq`를 분리해 경고선(`1,950L`) 대비 307줄 여유를 확보하고 Gate 2/8 6모듈 격리 감시를 동기화했다. **② `scripts/qa.mjs` 게이트 모듈화:** Gate 8(`scripts/qa/distGate.mjs` `208L · 9.5KB`)과 Gate 4P(`scripts/qa/personaGate.mjs` `147L · 15.2KB`, 고령 필멸자 75세·야만 행성 성인 2종 편입 -> 17페르소나 + 적격 선택지·타 행성 방문 사건 스캔)를 무손실 분리했다. **③ M41 연표 3대 진입 병목 교정:** `tl_sabbat_crusade`(`endYear: 775` — `sabbat` 프리셋 도달 가능 전쟁 `0 -> 2` 해소), `tl_vraks_siege`(`endYear: 830`), `tl_badab_war`(`endYear: 912`) 고증 연도폭 반영 및 회귀 테스트를 추가했다. **④ d100 `critSuccess`/`critFail` 선택적 서사 스키마 활성화:** 기존 705종 밸런스 무변경으로 `choice.critSuccess`/`choice.critFail` 선택적 결과 분기를 `resolvePendingChoice`·QA 전수 검증·Vitest #19에 편입했다. **⑤ 신규 이력 태그 2종 선행 등록 (`src/data/core/tags.js`):** `silver_legacy`(노년의 유산), `frontier_patron`(변경의 후원자) (`TAG_LABELS 199 -> 201`). |
| **20-B (Phase B). 4대 핵심 공백 대보강 (분기 사건 `+44종` · 일상 연대기 `+44종`)** | `[완료]` | **① 중노년·고령 생애 곡선 (`events/themes/lifecycle_mature.js` `+12 · 48.1KB`, `chronicles/lifecycle.js` `+12 -> 40 · 29.5KB`):** 23~45세 2 · 46~65세 4 · 66~100세 6(`0ev -> 6ev`, `silver_legacy` 생산·회수, 마키 3건 `critSuccess`/`critFail`) + 전용 연대기 12종. **② 무명 8행성 대보강 (`events/worlds/generic_deep.js` `+12 · 50.2KB`, `chronicles/worlds_generic.js` `+18 · 12.6KB`):** `generic_knight`/`civilised`/`agri`/`paradise`/`feral`/`forge`/`voidborn` 사건 12종(`frontier_patron` 생산·회수, 마키 3건 `critSuccess`/`critFail`) + 성인 연대기 18종(`generic_feral` +5 · `generic_knight` +4 · `voidborn` +3 · `generic_paradise` +2 · `agri`/`forge` 각 1 · `frontier_patron` +2). **③ Tier 2~4 중견 직군 10종 + 카오스 초인 정적 해소 (`events/careers/mid_ranks_s20.js` `+12 · 56.4KB`, `chronicles/careers_s20.js` `+8 · 4.7KB`):** `commissar_cadet`(2)/`knight_squire`(2)/`sororitas_novitiate`(2)/`militarum_general`(비사병 경력 개방)/`tempestus_prime_cmd`/`hive_crime_lord`/`admin_prefect_rank`/`navy_captain`/`renegade_marine·chaos_lord` 군단 분쟁(마키 3건 `critSuccess`/`critFail`) + 연대기 8종. **④ 초인·고위직 초점 3막 + 교조/자비·M41 비전투 딜레마 (`events/themes/focus_align_high.js` `+8 · 36.5KB`, `chronicles/general.js` `+6 -> 76 · 39.6KB`):** 기존 `focus.js` 배제 계층(초인·고위직·특수세력·크리그/야만행성)용 6대 초점 3막 6종 + 교조/자비 고위·M41 시대 딜레마 2종(마키 3건 `critSuccess`/`critFail`) + 초점 심화 연대기 6종. |
| **20-C (Phase C). 통합 검증 · 독립 교차 감사 2종 · 2단 레드팀 종합 검수 및 마감** | `[완료]` | `npm run verify`(QA 6게이트 + 200생애 퍼징 + typecheck + Vitest 19/19 + Astro 빌드 + Gate 8) 및 `npm run qa:deep`(1,500생애) 0오류 통과, 읽기 전용 `iv_lore_auditor` · `iv_prose_a11y_critic` · `iv_redteam_reviewer` 3인 독립 감사 P0/P1 전량 해소, `PROJECT_GUIDE.md` · `README.md` 동기화 및 `origin/main` 커밋·푸시 완료. |

#### 11.1 Stage 20 완료 보고서 (달성도 100% · 20-A/20-B/20-C 3/3 완료 · 잔여 미완 과제 0건)

* **핵심 수록 변동 요약:**
  * **분기 사건 (`EVENTS`):** `676종 -> 720종` (`+44종`, 역사 대사건 29종 포함 총 **`749종`**; 신규 파일 4종 `49 -> 53파일`, 마키 12건 선택적 `critSuccess`/`critFail` 극단 판정 분기 도입).
  * **일상 연대기 (`CHRONICLES`):** `796종 -> 840종` (`+44종`; 신규 파일 2종 `16 -> 18파일`).
  * **엔진 · QA · 태그 · 테스트:** 엔진 `6 -> 7모듈`(`reqEvaluator.js` 분리, `createEngine.js` `65.1KB · 1,643L`), QA 모듈 `scripts/qa/{distGate,personaGate}.mjs` 신설(Gate 4P `15 -> 17페르소나`), `TAG_LABELS` `199 -> 201종`(`silver_legacy`, `frontier_patron` 전량 회수), Vitest 행동형 접근성 테스트 `18 -> 19개`.
* **독립 3인 읽기 전용 감사 (`iv_lore_auditor` · `iv_prose_a11y_critic` · `iv_redteam_reviewer`) 교정 내역 (P0/P1 전량 해소):**
  1. **고증·정합성 교차 감사 (`iv_lore_auditor` P0 9 · P1 14 · P2 8 전량 교정):**
     * `ev_s20_mid_03` 아미저 `헬름 메카니쿰` 조상 환청 오고증을 대공·고위 기사단의 정신 링크 잔향으로 교정, `ev_s20_mid_04` 워글레이브/헬베린 무장 혼용 정리, `ev_s20_mid_09` 워해머 판타지 화폐(`황금 크라운`) 및 아르비테스 관할 오류 수정, `ev_s20_mid_10` 미존재 서적 출처(`Codex: Adeptus Administratum`) 정정, `ev_s20_mid_12` M41 초중반 대균열 시대착오 차단 및 `"아이 오브 테러"` -> `"공포의 눈"` 표준화.
     * `tl_sabbat_crusade` 슬레이도 사후(755~775) 시제·부제 정돈, 크리그 비타-움·야만 행성(레거시 `careers.js`, `careers_specialists.js`, `civil_void.js`, `alignment.js`, `crises.js`, `xenos.js` 포함 `excludeWorldTags: ["feral"]` 보강)·초인·이단·기계교·암살청 계층 가드 전수 교정.
  2. **문체·중복·접근성 교차 감사 (`iv_prose_a11y_critic` P0 6 · P1 9 · P2 6 전량 교정):**
     * 병렬 작성 및 기존 사건 간 플롯 중복(`ev_s20_fah_07` vs `ev_s20_gw_11`, `ev_s20_mid_01/04/09`, `ev_s20_gw_04`) 전면 개고, 무조건 선택지의 `ruthless` 편향·과보상 균형 조정, `generic_deep.js` `critSuccess`/`critFail` 본문 내 `"대성공! "`/`"대실패! "` 접두어 제거(스크린 리더 2중 낭독 차단), 오타·표기(`볼트 총성`, `불굴의`, `비켜 서고`, `플라즈마`, `코지테이터`) 일괄 교정, `focus_align_high.js` `anySocialTiers: ["apex"]` 과포함(일반 배틀 브라더·`saint_vessel`) 정밀 분리.
  3. **2단 레드팀 종합 검수 (`iv_redteam_reviewer` P0 0 · P1 3 · 구조 리스크 2건 중 1건 즉시 해소):**
     * **`P1-1` (스크린 리더 d100 극단 판정 알림):** `GameApp.tsx` `handleChooseEvent`가 `#sr-live`에 간결 판정 라벨·수치(`${formatRollOutcomeLabel(top.meta)}(${roll}/${target}). `)를 선행 송출하도록 개선하고 Vitest #19로 검증했다.
     * **`P1-2` (QA 사각지대 봉쇄):** `scripts/qa.mjs`에 데드 필드 `ch.outcome` 차단, `o.text`/`check.stat`/`o.stats`/`critSuccess`/`critFail` 스키마 검증, 성인 크리그 `DATA.EVENTS` 비타-움 스캔을 추가하고, `scripts/qa/personaGate.mjs`에 적격 선택지 라벨·결과문 및 타 행성 방문 사건 전수 스캔(17페르소나)을 편입했다.
     * **`P1-3` (오염 면역 초인 거짓 로그 차단):** `src/engine/createEngine.js`(`applyOutcome`, `applyChronicle`) 및 `src/engine/careerActions.js`(`performAction`)에서 쿠스토데스·그레이 나이트·살아 있는 성인의 양(+) 오염 `deltaText`·`kind` 거짓 노출을 차단하고 QA 회귀 테스트를 추가했다.
     * **구조 리스크 #2 (`migrateState` 손상 방어):** `migrateState`가 손상된 `pendingEvent`·`lastRoll` 필드를 안전 정화하도록 보강하고 Vitest #19에 회귀 단언을 추가했다.
  4. **차기 Stage 21 사전 메모 (`[후순위 보류 후보]` · 주체성 판정):**
     * **100세+ 초장수 초인 정적 구간 해소(`maxAdultQuietQ` ~53~59분기):** 정적 `once: true` 사건 풀 소진 후 장수 후반부에 발동하는 경량 동적 작전·임무 풀(예: 순찰·원정·유물 회수 변주) 도입은 L3 구조 확장으로 차기 단계 사용자 승인 후 착수한다.
     * **엔진/QA/파일 용량 유지보수 여유:** `scripts/qa.mjs`(`2,646L · 128.4KB`)의 Gate 6/7 추가 모듈화 및 중대형 테마 사건 파일(`alignment.js` `91.0KB`, `lifecycle.js` `84.8KB · 1,830L`, `crises.js` `83.1KB · 1,700L`)의 차기 확장 시 선제 분할을 권장한다.
* **최종 통합 검증 실측 결과 (`npm run verify && npm run qa:deep && npm run coverage`, 전 항목 0오류):**
  * **`npm run qa` (300생애):** **ALL 6 QA GATES PASSED WITH 0 ERRORS · 0 WARNINGS** (`15 core, 53 events, 18 chronicles, 7 engine, glossary=48; maxCore=66.9KB, maxEngine=65.1KB, maxEv=91.0KB, maxCh=44.9KB`, Gate 2 25파일, Gate 3 `121 files` 0건, Gate 4P 17페르소나 `collisions=0, minChroniclePool=9 >= 8`, Gate 5 `Softlocks=0, dupRate=23.3%`, Gate 6 `maxRepeat=2, nihilusMismatch=0, childStuck=0, reachedCareers=67/91, 1000q=834.3ms`).
  * **`npm run qa:deep` (1,500생애):** **ALL 7 QA GATES PASSED WITH 0 ERRORS · 0 WARNINGS** (`Gate 7A/7B: 92 nodes, 78 anyPastCareers, 1,980 req specs synthetic reachability proved, directCareerMatch 91/91`, `maxRepeat=2, nihilusMismatch=0, childStuck=0, reachedCareers=75/91, naturalEvents=628/720, 1000q=824.4ms`, 3대 성향 비교 `humane 38/45 · dogmatic 36/45 · ruthless 34/45`).
  * **`node scripts/audit-health.mjs` (`seed=3436884780`, 200생애):** `crashes=0, softlocks=0, migrateFailures=0, unknownIdWarnings=0, incorruptibleLeaks=0, actions=1355, travels=537, retireExecOK=3/3, mortalOver300=0`, **`[Listening Rhythm] avgLogChars=80.2, maxLogChars=217, maxAdultQuietQ=59(daemon_prince@85), namedSpotlights=1607(repeat=244, missingPrevMet=0), maxSpotlightCards=2, timelineMultiSpotlights=0, apexProbesOK=8/8`**, `maxSave=1002.7KB <= 2048KB`, **`nearLimit=0`**.
  * **`npm run typecheck`:** **0 ERRORS.**
  * **`npm test` (`vitest@5.1.2`, `tests/game-a11y.test.tsx`):** **19 / 19 PASS** (7.23s).
  * **`npm run build && npm run qa:dist` (`astro@7.4.13`):** **9페이지 정적 빌드 완료(2.41s, 0오류·0경고)** + **Gate 8 0오류** (`codexOverviewJS=0KB, codexStaticJS=479.9KB, hallStaticJS=489.6KB, narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28`).
  * **`npm run coverage`:** `WORLDS=23, ORIGINS=11, CAREERS=91(+child), CHAPTERS=9, CHARACTERS=28, TIMELINE=29, EVENTS=720(w/TL=749), CHRONICLES=840, GLOSSARY=48`; `sabbat` 프리셋 도달 가능 전쟁 **`2건`**(`tl_sabbat_crusade(755-775)`, `tl_tanith_fall(765)`).

---

## 12. 21단계 고도화 계획: 종족·승급 해금 스탯 캡(`statCaps`) · 극희귀 「규격 외 특이점」 돌파 & 일상 연대기 리밸런싱 (`Stage 21`)

> **착수 전 계획 선기록 (`AGENTS.md` 1장 준수):** 20단계 완료 직후 실측 감사 결과, ① 현행 8대 스탯 상한이 전 직군 공통 `100` 고정이고 `19-S2`의 `85` 감속이 `passive` 경로에만 묶여 있어 분기 사건(전체 상승의 53.1%)을 통해 **일반 필멸자(Tier 3 이하)도 40세 평균 `78.6` · 60세 평균 `86.4`(`85+` 스탯 5.6/8개)**로 만능 초인화되는 허점이 확인되었고, ② 일상 연대기 840종 중 **97.6%(820종)**가 무조건 스탯 상승(`+1,584` vs `-1`)에 편중되어 있다. 이에 **① 평소 97~98%의 삶에는 신체(종족·초인 등급 넘사벽 + 승급 해금)와 정신·권위(계급·전공 승급 해금)의 이중 하드 상한을 엄격히 적용하되(`21-A`)**, **② 작품명 `1 / QUADRILLION`에 걸맞게 약 2.5% 극희귀 확률로 기본 상한을 뚫고 주변을 압도하다가 스페이스 마린·아뎁투스 쿠스토데스·그레이 나이트·암살청·이단심문소의 눈에 띄는 「규격 외 특이점(Anomaly)」 로망 루트와 능동 스카우트 연작을 결합하고(`21-A`·`21-B`)**, **③ 일상 연대기 인플레 억제 및 트레이드오프·상황 마모 보강(`21-B`) + `Gate 7D` 전 91직군 승급-상한 무결성 증명(`21-C`)**을 3단계로 설계한다.

### 12.1 확정 설계 규격: 이중 상한제(`statCaps`) · 승급 해금 매트릭스 & 규격 외 특이점

* **공통 원칙:** `src/engine/statCaps.js`(신규 SSOT)가 산출하는 `getStatCap(state, statKey)`를 **`passive`(연간 성장·연대기) · `event`(분기·역사 사건) · `join`(전직 보너스) · `action`(자율 행동) 전 경로에 일괄 강제**한다. 단, 특수 전환 등으로 이미 상한을 초과한 스탯을 보유 중일 때는 강제 삭감하지 않고 **추가 상승만 `+0`으로 차단**해 역체감을 방지한다.
* **승급 해금 & 능동 스카우트 리듬:** 각 단계의 스탯 상한을 다음 직계 승급 요구치보다 `2~8점` 여유 있게 배치해 **현재 단계 상한 직전까지 성장 -> 다음 계급 승급 해금 -> 취임 시 차상위 상한 돌파**가 자연스럽게 체감되게 하며, 유년·청년기 상한 90%+ 도달자나 특이점 보유자는 `createDynamicCareerOfferEvent`의 초인·특수기관 스카우트 가중치를 우대한다.

#### A. 신체 스탯 (`백병 WS` · `사격 BS` · `강인 T` · `민첩 Ag`) — 종족·초인 등급 넘사벽
| 구분 | 단계별 신체 상한 | 승급 해금 흐름 및 특수 보정 |
| --- | --- | --- |
| **유년기 · 수습기 (`child`)** | 0~13세 **`44`** / 14~18세 귀족·스콜라 수습 **`54`** | 14세 조기 인플레(현행 최고 66) 차단 · 스카우트(`T 38`)·쿠스토데스(`WS 38`)·암살청(`Ag 44~52`) 유년/수습 진입 보존 |
| **일반 필멸자 (`mortal`)** | T1~2 **`55`** -> T3 **`62`** -> T4~5 **`66`** -> T6 **`70`** | 필멸자 육체 한계선(`70`). 의체 개조(`bionic`·기계교) `T/BS +5`, 파워 아머 전투 정예(`sororitas` T4+·`imperial_knight` T4+) `WS/BS +2`, 오그린 `WS/T +10 · Int -15`, 래틀링 `BS/Ag +6 · WS/T -8` |
| **암살청 (`officio_assassinorum`)** | 수련생 **`66`** -> 요원 **`78`**(`Ag/WS` **`80`**) -> 대총장 **`82`** | 생체 강화 필멸자(`grand_master_of_assassins` `Ag 78` 도달 보장) |
| **카오스 필멸자 -> 데몬 프린스** | 컬티스트 **`58`** -> 챔피언 **`66`** -> **데몬 프린스 `100`** | 필멸 한계(`66`)에서 `WS 58/WP 66` 달성 후 워프 승천 시 신적 상한(`100`) 완전 돌파 |
| **성녀 그릇 -> 살아 있는 성인** | 성녀 그릇 **`74`** -> **리빙 세인트 `92`** | 황제의 권능 강림 시 신체 `92` / 정신·권위 `100` 해금 |
| **아스타르테스 · 카오스 스마** | 스카우트 **`74`** -> 브라더·서전트·카스마 **`82`** -> 베테랑·캡틴·카오스 로드 **`88`** -> 챕터 마스터·드레드노트 **`92`** | `primaris` 시술 보유 시 `+2`(최대 **`94`**). 브라더(`82`) 직전 -> 베테랑/캡틴/카오스 로드(`88`) -> 챕터 마스터(`92`) 순차 해금 |
| **그레이 나이트 (`grey_knights`)** | 배틀 브라더 **`84`** -> 팔라딘·그랜드 마스터 **`90`** -> 슈프림 그랜드 마스터 **`94`** | 일반 스페이스 마린보다 한 급 상위 신체 + `의지(WP)` 전용 상한 **`86 -> 94 -> 98`** |
| **아뎁투스 쿠스토데스 (`custodes`)** | 쿠스토디안 가드 **`90`** -> 워든·실드-캡틴 **`95`** -> **캡틴-제너럴 `100`** | 인류 유전 공학 최정점 — 말단 가드부터 챕터 마스터급 신체 상한, 총사령관 취임 시 `100` 해금 |

#### B. 정신·사회 스탯 (`지성 Int` · `의지 WP` · `교섭 Fel` · `권위 Inf`) — 계급 티어·전공 기반 승급 해금
| 계급 티어 | 비전공 상한 | 전공 상한 | 비고 및 특화 보정 |
| --- | --- | --- | --- |
| **유년기 (`child`, 0~13세)** | **`42`** | **`46`** | 14~18세 귀족·스콜라 수습기는 **`56`** (`psyker`/`emperor_blessed` `WP +6`, `tactical_prodigy` `Int +4`) |
| **Tier 1~2 (하층민·병졸·수습)** | **`50`** | **`60`** | T2->T3 직계(`guild_magnate` 등) 요구치 `58` 이하 정렬 |
| **Tier 3 (장교·기술사제·길드장)** | **`58`** | **`72`** | T3->T4/T5 진입(`rogue_trader`, `archmagos`, `ecclesiarchy_cardinal` `70` 정렬) 보장 |
| **Tier 4 (장군·로드 커미사르·심문관 보좌)** | **`66`** | **`82`** | T5 없이 T6 직행하는 `militarum_general`·`primaris_psyker`·`assassin_operative` 3종은 전공 상한 **`88`** 부여 |
| **Tier 5 (총독·추기경·대심문관·아크마고스·초인 지휘관)** | **`74`** | **`92`** | 그레이 나이트 `WP`·기계교 `Int`·성녀 그릇 `WP` 특화 **`94`**; T6 하이 로드 요구치 `86~90` 정렬로 캡 직전 해금 |
| **Tier 6 (하이 로드 12석·챕마·커가 총사령관·리빙 세인트·데몬 프린스)** | **`80`** | **`100`** | 비전공은 `80` 억제, 직군 핵심 영역만 `100` 해금 |

#### C. 극희귀 「규격 외 특이점 (1 / QUADRILLION Anomaly)」 — 한계 돌파 & 초인·특수기관 스카우트
평소 97.5%의 삶이 엄격한 상한 위계 안에서 굴러가기에, **약 2.5% 확률(출생 자질 `TRAITS` 8 -> 12종 + 유년·청년기 극희귀 각성 경로)**로 등장하는 4대 규격 외 변종이 진정한 하이리스크 로망(갓생)을 제공한다. (단, 필멸자 특이점도 초인 최정점 `90~100`의 넘사벽을 무너뜨리지 않고, 오히려 **초인·특수기관의 능동 발탁과 추격의 기폭제**로 작동한다.)

| 특이점 자질 / 태그 | 출생 확률 · 각성 | 상한 돌파 & 리스크 | 전용 서사 & 초인·특수기관 스카우트 연결 |
| --- | --- | --- | --- |
| **`alpha_plus_psyker` (알파 플러스급 사이커)** | 출생 `~0.6%` 또는 `psyker` 극희귀 폭주 각성 | **`WP` 상한 `+20`**(유년기 66 · 필멸 상태 `92~96` 돌파) · `Int +8` / 시작 오염 `+10` · 워프 폭주 위험 | 염동력으로 하이브 구역·분대를 찢는 재앙 사건 -> **검은 함선 최우선 수색 · 그레이 나이트 예언관 긴급 소환(남성) · 오르도 말레우스/헤레티쿠스 대심문관 직접 추격 · 카오스 신 직통 유혹** |
| **`freak_physique` (규격 외 피지컬 괴물 · 슬라이 마보형)** | 출생 `~0.8%` 또는 유년·청년기 대성공 각성 | **필멸자 신체 상한 `+14`**(유년 58 · T1~2 69 · T3 76 · T4~6 80~82, 일반 마린급 야성 · 초인 전직 시 빠른 최정점 도달) | 맨손·단검으로 갱단 보스·오크 놉을 도륙하는 괴담 -> **아스타르테스 채플린·징병관의 모성 외 직접 시련 제안(유전 적성 미보유도 개방) · 아뎁투스 쿠스토데스 '황제의 눈' 감찰(테라/유년) · 암살청 에버소어/빈디카레 납치 스카우트** |
| **`savant_genius` (천년만의 전략·지성 사반트 · 마카리우스형)** | 출생 `~0.7%` | **`Int`·`Fel` 상한 `+16`**(말단 티어에서도 `76~88` 돌파) / 상관의 시기·암살 위협 | 말단의 전술안·십일조 감사가 성역 위기를 구함 -> **이단심문관·아크마고스·로그 트레이더·가드 사령관 직통 티어 점프 발탁** 및 테라 하이 로드 계보 조기 진입 |
| **`omega_pariah` (절대 무혼 · 오메가-마이너스 블랭크)** | 출생 `~0.4%` | **`WP` 상한 `+18`** · 워프 오염 극강 저항 / 대신 **`Fel` 상한 `-20`**(주변의 본능적 공포·배척) | 접근한 사이커·악마가 피를 토하며 붕괴 -> **침묵의 자매들(여성) · 쿨렉서스 암살청 · 쿠스토데스 탈론즈 합동 소환 · 오르도 말레우스 전속 차출** |

#### D. 23개 모성 평생 특전(`homeworldPerk`) & 12개 선천 재능(`TRAITS` 8+4) 실질화
기존 `WORLDS`(23종)와 `TRAITS`(8종)가 0세 출생 시 단발성 초기 스탯(`statMods`)만 주고 성인기 이후 체감이 증발하던 한계를 해결하기 위해, **모든 모성과 자질에 평생 유효한 `capMods`(상한 보정) + 고유 패시브 특전(`perk`/`talent`) 1종**을 선언적으로 부여한다(`state.homeWorldId` · `state.traitId` 기반 파생 적용으로 구저장본 100% 하위 호환).
* **중첩 상한 안전선:** 모성 `capMods` + 자질 `capMods` 중첩 시에도 종족별 하드 상한선을 유지(비특이점 필멸자 신체 절대 상한 `76~78`, `freak_physique` 필멸자 절대 상한 `84~86` — 쿠스토데스 `90~100` · 데몬 프린스 `100` 위계 보존).
* **23개 모성 평생 특전 대표 명세 (`src/data/core/worlds.js` `capMods` + `perk`):**
  * **카타찬 (`catachan`):** `T +6, WS +5, Ag +4, Fel -3` · **「정글의 생존자」** (데스월드·야만 환경 위험 절반 감소, `WS`/`T` 판정 시 중상 패널티 경감)
  * **크리그 (`krieg`):** `WP +6, T +5, Fel -8` · **「비타-움의 무감각」** (공포·사기·참호전 `WP` 판정 `+5`, 방사능·오염 환경 피해 경감)
  * **카디아 (`cadia`):** `BS +5, WP +5` · **「카디아는 버틴다」** (카오스·워프 관련 판정 `+6`, 밀리타룸 입단·승급 우대)
  * **타니스 (`tanith`):** `Ag +6, BS +5` · **「유령의 발걸음」** (잠입·정찰·사격 `Ag`/`BS` 판정 `+5`)
  * **펜리스 (`fenris`) / 바알 (`baal`) / 녹턴 (`nocturne`):** 펜리스 `WS +6, T +5, Int -3`(**「얼음 늑대의 피」** 백병 성장 가속·스페이스 울프 우대) · 바알 `T +4, Ag +4, WP +4`(**「방사능 사막의 인내」** 블러드 엔젤 우대) · 녹턴 `T +5, Int +4, WP +4`(**「화산 대장장이의 의지」** 공방·장비·고열 내성)
  * **테라 (`terra`) / 마크라그 (`macragge`) / 화성 (`mars`) / 오펠리아 VII (`ophelia7`):** 테라 `Inf +6, WP +4, T -3`(**「황금 옥좌의 그늘」** 권위·고위 기관 입단 `+5`) · 마크라그 `Int +5, Fel +4, Inf +4`(**「울트라마의 규율」** 행정·전술 성장 우대) · 화성 `Int +6, T +3, Fel -4`(**「옴니시아의 성유」** 기계교·의체 호환 우대) · 오펠리아 VII `WP +6, Fel +4`(**「성소의 찬가」** 신앙 성장 가속·오염 저항)
  * **네크로문다 (`necromunda`) / 아마겟돈 (`armageddon`) / 보스트로야 (`vostroya`) / 발할라 (`valhalla`):** 네크로문다 `Ag +5, WS +4, Inf -3`(언더하이브 생존·회복) · 아마겟돈 `T +5, BS +4`(장기전·오크전 생존) · 보스트로야 `BS +5, Int +3`(명품 가보 사격 정밀도) · 발할라 `T +5, WP +5`(혹한·소모전 인내)
  * **무명 8행성 (`generic_*` · `voidborn`):** `generic_knight`(`WS +4, WP +4, Inf +3` 기사도 맹세) · `generic_paradise`(`Fel +6, Inf +5, T -3, WS -3` 사교계·수명 `+8`) · `generic_feral`(`WS +6, T +5, Int -4` 야생 사냥꾼·아스타르테스 선발 우대) · `voidborn`(`Int +4, Ag +4, WP +4, T -3` 우주·워프 항해 이상 판정 `+6`) · `generic_forge`(`Int +4, T +2, Fel -4`) · `generic_hive`(`Ag +3, T +3`) · `generic_agri`(`T +5, WP +3`, 수명 `+5`) · `generic_civilised`(`Int +3, Fel +3`, 전 직군 입단 유연성).
* **기존 8개 선천 자질(`TRAITS`) 평생 재능 격상 (`src/data/core/origins.js` `capMods` + `talent`):**
  * `none`(순수 인류 표준형): **「평범함의 방패」**(이단심문소·마녀사냥 의심 회피 기준선)
  * `geneseed_compatible`(진시드 적합): `T +4, WS +3` · **「강인한 재생력」**(연간 자연 회복 `+1`, 아스타르테스/그레이 나이트 선발 시련 `+8%`)
  * `psyker`(잠재 사이커): `WP +8, Int +4` · **「워프 감응」**(`WP` 성장 가속 · 사이킥 판정 우대)
  * `blank`(블랭크 · 퍼라이어): `WP +10, Fel -10` · **「무혼의 장막」**(워프 오염 축적 50% 감쇠 · 오염 d100 판정 페널티 무시)
  * `tactical_prodigy`(냉철한 전술안): `Int +8, BS +4, Fel +4` · **「전장의 수읽기」**(`Int`/`BS` 성장 `+25%` · 장교/장군/해군/심문관 입단 심사 `+8%`)
  * `emperor_blessed`(살아 있는 성흔의 기질): `WP +8, Fel +6` · **「불굴의 기적」**(신앙 70+ 시 환경 위험 경감 · `saint_vessel` 각성 우대)
  * `abhuman_ogryn`(오그린): `WS +10, T +10, Int -15, BS -6` · **「거인의 맷집」**(최대 체력 `+20` · 물리 부상 경감)
  * `abhuman_ratling`(래틀링): `BS +8, Ag +8, WS -8, T -8` · **「매의 눈과 민첩함」**(사격·잠입 d100 판정 `+6`).

#### E. 동적 후천 특성(긍정 6종 · 부정 6종) · `removeTags` 치유/극복/상실 & 특성 전용 선택지 체계
출생 시 고정되는 선천 재능에 더해, 생애 도중 사건·대성공·대실패·전투·정치·워프 접촉을 통해 **긍정/부정 후천 특성 12종**을 동적으로 얻고(`addTags`), 의체 개조·성당 정화·리주버냇·극복/상실 사건으로 **치유하거나 잃을 수 있게(`removeTags` 엔진 정식 지원)** 확장한다(`state.tags`와 100% 통합, 구저장본 무손실 하위 호환).
* **엔진 스키마 확장:** `applyOutcome` · `applyChronicle` · `formatDeltaText`에 **`removeTags: [...]`**를 정식 도입하고, `src/engine/statCaps.js`에 **`ACQUIRED_TRAIT_EFFECTS`** 단일 정본 사전을 배치해 보유 중 실시간으로 상한(`capMods`)·판정 보정(`checkMods`)·회복/오염에 작동하다가 제거 시 즉시 해제되게 한다.
* **긍정 후천 특성 6종 (`TAG_LABELS` 등록 · 획득/상실·전용 선택지 연동):**
  1. `iron_nerves` (**강철의 신경**): `WP cap +4`, 공포·워프·위기 판정 `+5` (극한 전선·대성공 획득 / 워프 정신 붕괴 대실패 시 상실 가능)
  2. `blade_master` (**검성의 경지**): `WS cap +5`, 백병 판정 `+5` (일기토 대성공 획득 / `crippled_limb` 중상 시 상실 가능)
  3. `deadeye_marksman` (**백발백중 명사수**): `BS cap +5`, 사격 판정 `+5` (저격·포격 대성공 획득 / 시력·팔 손상 시 상실 가능)
  4. `silver_tongue` (**은빛 혀**): `Fel cap +5, Inf cap +4`, 외교·정치 판정 `+5` (궁정·길드·심문소 외교 성공 획득 / 추방·누명 시 상실 가능)
  5. `tactician_eye` (**백전노장의 전술안**): `Int cap +5`, 전략·지휘 판정 `+5` (전역 지휘 생존 획득 / 전술 기습 전용 선택지 해금)
  6. `battle_hardened` (**백전의 생존자**): `T cap +5`, 환경 위험 `-25%` (다수 전역·데스월드 생존 획득)
* **부정 후천 특성 6종 (핸디캡 + 극복·치유 아크 + 기존 자율 행동 시너지):**
  1. `crippled_limb` (**불구 · 관절 손상**): `Ag cap -8, WS cap -5` (중상·전투 대실패 획득 -> **기계교 의체 개조(`augmetics`)** 또는 의료/성녀 사건 시 `removeTags` 치유)
  2. `shell_shocked` (**포탄 충격 · 트라우마**): `WP cap -8`, 공포·위기 판정 `-6` (대포격·악마 조우 획득, 초인/크리그 면역 -> **성당 정화 고행(`penance`)** 또는 전우 위로/신앙 대성공 시 `removeTags` 극복)
  3. `warp_scarred` (**워프 흉터**): `Fel cap -6`, 연간 오염 압박 `+1` + 대신 워프 감지 전용 선택지 해금 (워프 항해 이상·유물 획득 -> 성당 정화·심문소 의식·리빙 세인트 가호 시 `removeTags` 정화)
  4. `chronic_toxins` (**만성 독소 · 폐질환**): `T cap -7`, 연간 자연 회복 `-1` (포지 스모그·하층·너글 역병 획득 -> **리주버냇(`rejuvenat`) · 의체 개조(`augmetics`)** 시 `removeTags` 치유)
  5. `notorious_ruthless` (**악명 높은 냉혈한**): `Fel cap -6`, 대신 `Inf cap +4` + 위협·심문 전용 선택지 해금 (냉혹 학살·숙청 누적 -> 사면·속죄 사건 시 `removeTags` 해소)
  6. `imperial_debt` (**거액의 채무 · 상부의 약점**): `Inf cap -8`, 귀족·행정 협상 `-5` (정치 패배·뇌물 적발 획득 -> 공훈 청산·전리품 상환·정적 제거 사건 시 `removeTags` 해소)
* **특성 절제 · 투명 고지 원칙 (남발 금지 & 3중 명시):**
  * **희소성 유지 (연대기 남발 금지):** 일반 일상 연대기(`CHRONICLES`)에는 후천 특성을 부여·제거하지 않으며, **한 생애당 긍정 1~2개 · 부정 0~2개**가 자연스럽게 각인되도록 개연성이 높은 핵심 분기 사건·전용 아크·`critSuccess`/`critFail`에만 엄선 배치한다. 기존 720종 사건은 일괄 개조하지 않고 Stage 21에서 가장 개연성 높은 소수(10~15종 특성 전용 선택지 + 소수 극단 판정)만 선별 보강한 뒤 향후 단계에서 검수하며 점진 확장한다.
  * **이중 난수 배제 (d100 판정 일원화) & 대성공/대실패 특성 승화:** 특성 획득·제거에 별도의 숨겨진 추가 확률을 덧씌우지 않고 기존의 스탯 기반 **d100 성공/실패 및 `critSuccess`/`critFail`**에 깔끔히 연동한다. 특히 **`critSuccess`**는 단순 수치 증폭이나 부정 특성 치유(`removeTags`)에 그치지 않고, **전화위복 승화(부정 특성 제거 + 연관 긍정 특성 동시 부여 — 예: `shell_shocked` 극복 + `iron_nerves` 각성, `crippled_limb` 재활 + `battle_hardened`, `imperial_debt` 청산 + `silver_tongue`)** 및 **차별화된 전용 서사·후속 사건 해금**으로 이어지게 설계한다(`critFail`은 연관 긍정 특성 상실 + 부정 특성 각인·파국 분기).
  * **특성명 · 효과 3중 명시 (UI · 로그 · 상태창):**
    1. **선택지 미리보기 (`ActiveEventPanel.tsx`):** 후천 특성 획득/제거가 걸린 선택지는 버튼 보조 문구에 간결히 사전 예고(예: `성공 시 특성 치유: 포탄 충격 · 대성공 시 승화: 강철의 신경 · 대실패 시: 불구`).
    2. **획득/제거 로그 (`formatDeltaText`):** 실제 변동 시 `특성 획득: 불구(민첩 상한 -8 · 백병 상한 -5)` / `특성 치유: 포탄 충격` 형태로 특성명과 핵심 효과를 명시.
    3. **인물 상태창 (`DossierPanel.tsx`):** 보유 중인 모성 특전 · 선천 재능 · 후천 특성(긍정/부정) 각각에 **특성명과 구체적 효과 1줄 설명**을 상시 표시해 별도 탐색 없이 즉시 파악 가능하게 한다(장식 기호 0건 · 스크린 리더 간결성 유지).

### 12.2 단계별 실행 로드맵 (`21-A` · `21-B` · `21-C`)

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **21-A (Phase A). `statCaps.js` 이중 상한 엔진 · 23모성 특전 & 12선천 재능 · `removeTags` & 12후천 특성 엔진 · 직군 정렬 · 3중 명시 UI** | `[완료]` | **① `src/engine/statCaps.js` 신설 및 `applyDiminishedStatGain` 개편:** 신체/정신 이중 상한 `getStatCap(state, statKey)` + `getAllStatCaps(state)` 구현(23모성 `capMods` + 12선천 자질/4대 특이점 `capMods` + 12후천 긍정·부정 특성 `ACQUIRED_TRAIT_EFFECTS`[이름·구분·효과 요약 포함] + 종족 중첩 안전선 포함), `passive`/`event`/`join`/`action` 전 경로 하드 캡 적용, `cur / cap` 잔여 비율 기반 수확 체감 재설계, 유년기(0~13세) 성장 폭 정상화. **② `removeTags` 정식 도입 & 자율 행동 치유 연동 (`createEngine.js`, `careerActions.js`, `formatters.js`):** `applyOutcome`·`applyChronicle`·`formatDeltaText`에 `removeTags` 지원 및 `특성 획득/치유/상실: 특성명(핵심 효과)` 포맷 추가, 의체 개조(`augmetics`) 시 `crippled_limb`/`chronic_toxins` 치유, 성당 정화(`penance`) 시 `shell_shocked`/`warp_scarred` 극복, 리주버냇(`rejuvenat`) 시 `chronic_toxins` 치유 연동. **③ 23모성 특전 · 12선천 재능(4대 특이점 포함) · 12후천 특성 태그 등록 (`worlds.js`, `origins.js`, `tags.js`, `careerRules.js`):** `TRAITS` 8 -> 12종(`none` 66 -> 63.5) + `TAG_LABELS` 16종(4특이점 + 12후천 특성) 등록 + `computeCheckPreview`·`advanceQuarter`·입단 심사·오염 감쇠·`createDynamicCareerOfferEvent`(상한 90%+ 및 특이점 능동 스카우트) 연동. **④ 극소수 직군 요구치 정합 보정 (`src/data/core/careers/*.js`):** 필멸자 신체 한계 초과 3종(`abbess_sanctorum` `WS 76 -> 64`, `grand_provost_marshal` `WS 76 -> 64`, `knight_high_king` `WS 72 -> 64`)과 T5->T6 경계 요구치(`guild_magnate`, `ecclesiarchy_cardinal`, `rt_lord_captain`, 하이 로드 `92~96 -> 86~90`) 정렬. **⑤ 3중 명시 UI·코덱스·접근성 연동 (`ActiveEventPanel.tsx`, `DossierPanel.tsx`, `endings.js`, `codex/worlds.astro`):** 선택지 미리보기에 특성 획득/치유/대성공 승화 사전 예고, 상태창에 모성 특전·선천 재능·보유 후천 특성(긍정/부정) 각각의 **특성명+효과 1줄** 및 특성치 상한 표기(`82 / 82, 현재 계급 상한`, 장식 기호 0건), `/codex/worlds` 23모성 특전 노출(구저장본 100% 하위 호환). |
| **21-B (Phase B). 일상 연대기 리밸런싱 · 트레이드오프/마모 · 4대 특이점 & 12후천 특성 절제 배치(점진 확장 기반)** | `[완료]` | **① `applyChronicle` 일상 스탯 발동 리밸런싱 (`createEngine.js`):** 기존 840종 연대기의 97.6% 양(+) 스탯 편향을 해소하기 위해 일반 연대기의 양(+) 스탯 반영 확률·규모를 절제(전공 스탯 위주 소폭 반영, 비전공 억제; 트레이드오프·하락·신앙·성향·체력·오염·서사 100% 유지)하고 과도한 `+3~+4` 연대기(97종)를 `+1~+2` 또는 교환형으로 정돈한다. **② 신규 트레이드오프·상황 마모 연대기 (`src/data/chronicles/wear_tradeoff.js` `+38종`):** 대가형 전문화 트레이드오프 + 납득 가능한 조건부 상황 마모(필멸자 52세+ 노쇠·중상 후유증·고오염·니힐루스/포지 피로 — 일반 연대기에서는 후천 특성 남발 금지, 초인 면역·크리그·야만 정합성 준수). **③ 4대 특이점 전용 사건·연대기 (`src/data/events/themes/anomalies_s21.js` `+14사건`, `src/data/chronicles/anomalies_s21.js` `+14연대기`):** 알파 플러스·피지컬 괴물·전략 사반트·절대 무혼의 폭주/전설화 및 스마·쿠스토데스·그나·암살청·심문소 능동 스카우트/추격 연작 + 후천 각성 경로. **④ 12후천 특성 절제 배치 · `critSuccess` 승화/후속 아크 & 선별 전용 선택지 (`src/data/events/themes/acquired_traits_s21.js` `+14사건` + 기존 핵심 사건 9종 엄선 보강):** 6긍정·6부정 후천 특성의 획득(`addTags`), 치유·극복·상실(`removeTags`), **`critSuccess` 전화위복 승화(부정 제거 + 연관 긍정 특성 각성 + 차별화 후속 사건)** 및 `critFail` 반전 서사를 **한 생애 긍정 1~2 · 부정 0~2** 체감 빈도로 정밀 설계하고, 나머지 기존 사건은 향후 단계에서 검수하며 점진 확장한다(`AGENTS.md` 3장 1·6항 준수). |
| **21-C (Phase C). `Gate 7D` 승급-상한 무결성 증명 · `removeTags` QA 검증 · 1,500생애 밸런스 캘리브레이션 · 교차 감사 · 2단 레드팀** | `[완료]` | **① QA `Gate 7D` 신설 & `removeTags` 검증 (`scripts/qa.mjs`, `scripts/qa/distGate.mjs`):** 91개 전 직군의 모든 승급 간선(`A -> B`) `getStatCap(A, stat) >= B.req.stats[stat]` 정적 전수 증명(승급 데드락 0건) + 12계층 · 23모성 특전 · 12선천 재능 · 12후천 특성 전 경로 캡·중첩 안전선·`removeTags` 라벨/동작 회귀 테스트 + Gate 2/8 분할 엔진 8모듈(`statCaps.js`) 격리 추가. **② 1,500생애 목표 스탯·특성 빈도 캘리브레이션:** 일반 필멸자(14세 평균 `~32~38`, T1~3 40~60세 평균 `~45~56`) vs 아스타르테스(`75~92`) vs 쿠스토데스(`88~100`) vs 데몬 프린스(`90~100`) 위계, 모성·재능 조합별 분화, 2.5% 특이점 스카우트 및 생애당 평균 후천 특성 수(긍정 `~1~2` · 부정 `~0~2` 과밀 방지) 실측 검증(91/91 도달성 보존). **③ Vitest #20 + 독립 교차 감사(`iv_lore_auditor`, `iv_prose_a11y_critic`) + 2단 레드팀(`iv_redteam_reviewer`):** 선택지 특성 미리보기·획득/치유 로그·상태창 특성명/효과/상한 표기 접근성 및 승급 해금·`removeTags` 치유 테스트 #20 추가, P0/P1 전량 해소, 문서 동기화 및 `origin/main` 반영. |

#### 12.3 Stage 21 완료 보고서

* **단계 달성도 및 전체 누적 진행률:** Stage 21(`21-A` · `21-B` · `21-C`) 목표 **100% 완료**. 누적 코퍼스: `EVENTS=748`(역사 대사건 29 포함 `777`), `CHRONICLES=892`, `TRAITS=12`, `TAG_LABELS=217`, `GLOSSARY=48`, `CAREERS=92`, `WORLDS=23`, Vitest `20/20`. (잔여 로드맵: Stage 22 표준 vs 그림다크 모드 분리 및 공략형 억까 팩 착수 대기)
* **신규·핵심 변경 내역:**
  * **엔진 (`src/engine/statCaps.js`, `createEngine.js`, `careerRules.js`, `careerActions.js`):** 신체/정신 이중 상한 SSOT `statCaps.js` 신설, `applyDiminishedStatGain` 잔여 비율 수확 체감 및 전 경로 하드 캡 적용, `applyOutcome`·`applyChronicle`·`formatDeltaText`에 `removeTags` 및 `크리그` 비타-움 출신 `shell_shocked` 면역 통합, 의체 개조(`augmetics`)·성당 정화(`penance`)·리주버냇(`rejuvenat`) 치유 연동, 4대 특이점 능동 스카우트 가중치 적용.
  * **코어 데이터 (`worlds.js`, `origins.js`, `tags.js`, `careers/*.js`):** 23모성 `capMods`·`perk` 부여, `TRAITS` 12종(기존 8종 `capMods`·`talent` + 4대 특이점 2.5%), `TAG_LABELS` 16종 추가, T3/T5/T6 직군 요구치 및 `astartes_scout` `freak_physique` 허용 정렬.
  * **UI & 코덱스 (`DossierPanel.tsx`, `ActiveEventPanel.tsx`, `CodexExplorer.tsx`, `global.css`):** `val / cap` 상한 표기, `#trait-perks-list` 3중 명시(모성 특전·선천 재능·후천 특성), 선택지 특성 예고, `/codex/worlds` 모성 특전 노출.
  * **서사 콘텐츠 (`wear_tradeoff.js` +38, `chronicles/anomalies_s21.js` +14, `events/themes/anomalies_s21.js` +14, `acquired_traits_s21.js` +14, 기존 핵심 사건 9종 보강):** 특이점 4종 폭주/스카우트 아크, 12후천 특성 획득·치유·`critSuccess` 전화위복 승화, 트레이드오프/상황 마모 연대기 구축.
* **교차 감사 & 2단 레드팀 리뷰 반영 결과:**
  * `iv_lore_auditor` / `iv_prose_a11y_critic`: 시노드 미니스트라·크리그 비타-움 정합성·특수 출신(`ogryn`/`blank` 등) 분기 누락 및 선택지 미리보기 중복 표기 P1/P2 전량 수정.
  * `iv_redteam_reviewer`: `PROJECT_GUIDE.md` 동기화, `augmetics` `교섭 -2` 로그 표기 누락, `DossierPanel.tsx` `grey_knight`/`living_saint` `isSupernatural` 및 `notorious_ruthless` 위험 태그 칩 정합성 보완 완료.
  * **메인 오케스트레이터 수용 판단:** `scripts/qa.mjs`의 `Gate 7`을 `scripts/qa/careerGate.mjs`로 분리하는 제안과 `-12%` 입단 페널티의 `difficulty === "grimdark"` 한정 유지 권고는 Stage 22 착수 전 선행 작업으로 채택하고, 100세 이상 초장수자 전용 동적 순찰/유물 풀 확장은 현재 `maxAdultQuietQ=44` 양호 수준임을 확인해 `[후순위 보류 후보]`로 분류.
* **최종 검증 결과 (`npm run verify && npm run qa:deep`):**
  * `qa`: 6개 게이트 0오류 (`maxCore=66.9KB`, `maxEngine=71.4KB`, `maxEv=91.0KB`, `maxCh=44.9KB`).
  * `audit-health.mjs`: 200생애 (`seed=487604875`) 크래시 0, 소프트락 0, `avgLogChars=76.0`, `maxAdultQuietQ=44`, `maxSpotlightCards=2`, `maxSave=916.4KB <= 2048KB`.
  * `typecheck` 0오류, `vitest` `20/20 PASS`, `astro build` 9페이지 `2.76s`, `qa:dist` Gate 8 0오류 (`codexOverviewJS=0KB`, `narrativeLeaks=0`, `engineLeaks=0`, `glossaryProseInGame=0`).
  * `qa:deep`: 7개 게이트 0오류, `Gate 7D` 120개 직통 승급 간선 데드락 0건, 1,500생애 `maxRepeat=2`, `nihilusMismatch=0`, `childStuck=0`, `reachedCareers=69/91`, `naturalEvents=585/748`, `1000q=1028.1ms`.

---

### 12.4 보수 단계 (`Stage 21.5`): 접근성 · 엔진 안전성 핫픽스 & 코덱스 하이드레이션 경량화

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **21.5-A. 스크린 리더 2,400로그 상한 낭독 버그 · 엔진/문서 정합성 수정** | `[완료]` | `GameApp.tsx` `prevLogCount` -> `prevTopLog` 객체 비교 전환, `createEngine.js` `pickWeighted` `?? 1` & `migrateState` `logs` 원소 방어, `chronicleText.ts` 2,400건 상한 생략 안내, `README.md` 수량(`748`/`892`) 동기화, Vitest 회귀 테스트 2종(`22/22 PASS`) 추가 완료. |
| **21.5-B. 제국 코덱스 5개 하위 페이지 하이드레이션 경량화** | `[완료]` | `src/pages/codex/{worlds,careers,chapters,timeline,characters}.astro`의 `CodexExplorer`를 `client:load` -> `client:idle`로 전환 완료 (`npm run verify` 0오류: `qa` 6게이트, `audit` 200생애, `typecheck`, `vitest 22/22`, `astro build` 9페이지, `qa:dist` Gate 8 통과). |

* **Stage 21.5 달성도:** 목표 **100% 완료** (잔여 범위: Stage 21.6 도전정신·인연 연작 및 Stage 22 표준 vs 그림다크 모드 분리 대기).

---

### 12.5 보수·심화 단계 (`Stage 21.6`): 도전정신 마일스톤 & 유년기 인연 · 직군별 동료 · 네임드 교차 연작

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **21.6-A. 영혼의 전당 도전 마일스톤 & 진로 안내 (`HallOfSoulsApp.tsx`)** | `[완료]` | `HallOfSoulsApp.tsx`에 역대 생애 기반 **제국 도전 마일스톤(10종 업적)** 섹션 추가 완료(장식 기호 0건, `[달성]`/`[미달성]` 표기). |
| **21.6-B. 유년기 인연 · 직군별 동료 · 네임드 교차 연작 (`tags.js`, `bonds_s21_6.js` +12사건 / +14연대기)** | `[완료]` | `TAG_LABELS`에 8종 인연 태그(`bond_childhood_friend`, `bond_guard_comrade`, `bond_battle_brother`, `bond_ordo_partner`, `bond_void_companion`, `bond_heretic_pact`, `bond_fallen_comrade`, `bond_oath_fulfilled`) 등록, `src/data/events/themes/bonds_s21_6.js`(12사건: 유년기 발단->성인 재회, 5대 직군 동료, 이브람 건트·단테 네임드 교차, 전우의 유품·노년기 결산) 및 `src/data/chronicles/bonds_s21_6.js`(14연대기 `priority: 3`) 구축 완료. |

* **Stage 21.6 달성도:** 목표 **100% 완료** (누적 코퍼스: `EVENTS=760`(역사 포함 `789`), `CHRONICLES=906`, `TAG_LABELS=225`, `npm run verify` 0오류: `qa` 6게이트, `audit` 200생애 `seed=1097904777`, `typecheck`, `vitest 22/22`, `astro build` 9페이지, `qa:dist` Gate 8 통과). 잔여 범위: Stage 22 표준 vs 그림다크 모드 분리.

---

## 13. 22단계 고도화 계획: 「표준 vs 그림다크(1 / QUADRILLION 하드코어)」 모드 분리 & 워해머 공략형 억까 사건 팩 (`Stage 22`)

> **착수 전 계획 선기록 (`AGENTS.md` 1장 준수):** 21단계에서 구축한 이중 스탯 캡·모성 특전·선천/후천 특성 토대 위에, 워해머 40k 특유의 잔혹한 계급 장벽과 절망적 생존률("일반 시민은 대부분 평생 노동자 · 가드맨 15시간 생존률 · 행정 착오·오인 포격·무능 상관·마녀사냥 억까")을 **취향별 선택형 모드(`표준` vs `그림다크`)**와 **"비겁·대가·특성으로 뚫을 수 있는 공략형 억까(Fair Grimdark)"**로 구현한다.

### 13.1 핵심 설계 원칙: 공략 가능한 억까 (Fair Grimdark)

1. **선택지 없는 무작위 즉사 금지:** 가혹한 억까가 터지더라도 반드시 **① 정면 돌파(고난도 스탯 판정 · 성공 시 큰 공훈 / 실패 시 즉사 또는 `불구`), ② 비겁·대가 감수 생존(무조건 생존 대신 `포탄 충격`/`거액의 채무`/`암흑` 증가·승진 기회 포기), ③ 특성·재능·모성 우회(전술안·카디아/크리그·은빛 혀·블랭크 등)** 3갈래 공략 구조를 갖춰 억까를 전략적 딜레마로 전환한다.
2. **좁은 정문 + 위험한 뒷문 (계급 탈출 메타):** 그림다크 모드에서는 하층민·일반 시민 출생 비중과 정규 기관 입단 심사 문턱을 크게 높여 대다수가 평생 노동자·말단 병졸로 살게 하되, 의도적 초점 관리·길드/행정 정문 공략 또는 목숨 거는 뒷문(언더하이브 갱단·밀수·로그 트레이더 징발·가드맨 생환 공훈·카오스 유혹)으로 뚫을 수 있게 설계한다.
3. **2대 난이도 모드 분리 (`state.difficulty`: `"standard"` | `"grimdark"`):**
   * **표준 모드 (`standard`, 기본값 · 구저장본 자동 폴백):** Stage 21 기준의 균형 잡힌 제국 생애 체험.
   * **그림다크 모드 (`grimdark`, `1 / QUADRILLION` 하드코어):** 시작 화면 라디오/토글로 선택 가능. 하층민·일반 시민 출생 가중치 강화, 정규 기관 입단 심사 난이도 보정(`-12%`, `grimdark` 전용 엄격 격리), 가드맨 초년기·전선 환경 치사율 및 공략형 억까 사건 가중치 대폭 상향, 영혼의 전당(`HallOfSoulsApp.tsx`)과 부고(`ObituaryModal.tsx`)에 **`[그림다크 생환]`** 기록·명예 표기를 별도 보존한다.
4. **사건-연대기 역할 분리 & 동반 작성 원칙 (Stage 22 이후 상시 규칙):**
   * **분기 사건(`EVENTS`) = 공략 가능한 억까:** 선택지 없는 즉사 금지, 3갈래 공략 구조 담당.
   * **그림다크 전용 연대기(`CHRONICLES`, `req.difficulty: "grimdark"`) = 비정함·현장감·압박감:** 선택지가 없는 일상 로그에서는 즉사·치명적 불가역 페널티를 금지하고, 직군 특유의 냉혹한 일상 묘사와 소소한 마모(체력·신앙·부채·오염 압박)만 누적한다. `priority: 2`를 기본으로 하되 핵심 전환점만 `priority: 3`으로 절제해 기존 이력 태그·시대 연대기 풀을 덮지 않게 한다.
   * **동반 작성 워크플로:** 향후 신규 사건 팩을 작성할 때는 병렬 작성 단계에 **그림다크 전용 연대기 작성 트랙**을 함께 배치해 사건과 일상 기록의 서사 톤을 일치시킨다.

### 13.2 단계별 실행 로드맵 (`22-A` · `22-B` · `22-C`)

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **22-A (Phase A). `difficulty` (`standard`/`grimdark`) & `req.difficulty` · `req.anyTrees` 엔진 · UI · 영혼의 전당 연동** | `[완료]` | **① 엔진 난이도 프로파일 & `req.difficulty`/`req.anyTrees` (`createEngine.js`, `reqEvaluator.js`, `formatters.js`, `careerRules.js`, `storage.ts`):** `state.difficulty`(`"standard"`/`"grimdark"`, `migrateState` 구저장본 `"standard"` 폴백), 그림다크 하층민/시민 출생 가중치 강화(`×2.6`), 입단 심사 `-12%` 페널티(`difficulty === "grimdark"` 한정, `28~80%` 클램프), 환경 위험 배수(`×1.55`/`×1.25`) 및 `grimdarkMisfortune` 가중치(`×1.65`), `HallEntry.difficulty` 보존 구현 완료. **② UI·접근성 (`StartScreen.tsx`, `DossierPanel.tsx`, `ObituaryModal.tsx`, `HallOfSoulsApp.tsx`, `GameApp.tsx`, `chronicleText.ts`):** `#difficulty-fieldset`(`aria-describedby="difficulty-desc"`) 라디오 선택 UI, 부고 모달 재시작 시 난이도 승계, `[그림다크]` 표기 및 `그림다크 생환` 마일스톤 추가 완료 (`scripts/qa.mjs` Gate 7 모듈 분리는 후속 유지보수 과제로 이월). |
| **22-B (Phase B). 직군 계열별 그림다크 공략형 억까 사건 팩 · 그림다크 전용 연대기 동반 작성 (`+28사건` · `+30연대기`)** | `[완료]` | **① 가드맨 15시간 생존 억까 팩 (`src/data/events/careers/guardsman_grimdark.js` `+10사건`):** 전 항목 3갈래 공략(정면 돌파 + `critSuccess`/`critFail` + 무조건 대가 생존 + 특성/모성 우회) 완비. **② 제국 관료제·계급 장벽·마녀사냥 억까 팩 (`src/data/events/themes/grimdark_misfortune.js` `+10사건`):** `maxCareerTier: 3` 및 `excludeTags: ["heretic", "chaos_aligned"]` 신분·진영 정합성 가드 적용. **③ 직군 계열별 그림다크 사건 팩 (`src/data/events/themes/grimdark_factions.js` `+8사건`):** 기계교·성직/심문소/아르비테스·해군/로그 트레이더/행정청·사이커·아스타르테스 8건. **④ 그림다크 전용 연대기 (`src/data/chronicles/grimdark_s22.js` `+30연대기`):** `req.difficulty: "grimdark"`, `priority: 2` 기본, 즉사·치명 페널티 0건. |
| **22-C (Phase C). 이중 모드 1,500+300생애 검증 · Vitest · 교차 감사 · 2단 레드팀** | `[완료]` | **① 이중 모드 시뮬레이션 검증 (`scripts/qa.mjs`):** `Gate 7B` `difficulty`/`anyTrees` 합성 도달성(`2,178 req specs`, `91/91` 직군), `Gate 7D`(120간선 0데드락), 1,500 표준 생애 + **Grimdark Probe 300생애**(`grimdarkEvents=1,267`, `standardLeaks=0`) 검증 완료. **② Vitest (`tests/game-a11y.test.tsx`):** Stage 22 난이도 토글·구저장본 폴백·`-12%` 페널티 테스트 포함 `23/23 PASS`. **③ 독립 교차 감사(`iv_lore_auditor`, `iv_prose_a11y_critic`) + 2단 레드팀(`iv_redteam_reviewer`):** `ch_s22_grim_27` 하이 로드 제외·`세라마이트`·`허점`·`grimdark_misfortune` `heretic`/`maxCareerTier: 3` 가드·`handleRestartRandom` 난이도 승계·`StartScreen` `aria-describedby` 전량 수정 완료. |

* **Stage 22 달성도:** 목표 **100% 완료** (누적 코퍼스: `EVENTS=788`(역사 포함 `817`), `CHRONICLES=936`, `TAG_LABELS=225`, Vitest `23/23 PASS`).








