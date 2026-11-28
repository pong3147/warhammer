# 1 / QUADRILLION : IMPERIALIS VITA — 프로젝트 아키텍처 · 수록 현황 · 진행 보고서

> 본 문서는 프로젝트의 기획 의도, 디렉토리 구조, 파일별 콘텐츠 수록 현황, 게임 시스템·엔진 스키마 레퍼런스, **완료 로드맵 아카이브 인덱스 및 차기 진행 예정 계획**을 기록하는 현행 기준 문서다.
> AI 에이전트가 준수해야 할 불변 규칙, 스크린 리더 접근성 원칙, 서사 보강 5대 작업 방향, 나무위키 번역명 기준표, 사실관계 고증 기준 및 QA 게이트는 [`AGENTS.md`](./AGENTS.md)를 정본으로 삼는다.
> 100% 완료된 과거 단계(Stage 1 ~ Stage 24)의 상세 로드맵·보고서 및 감사 체크리스트는 [`docs/archive/`](./docs/archive/)에 무손실 보관한다.

---

## 1. 프로젝트 개요 및 기획 의도

* **작품명:** `1 / QUADRILLION : IMPERIALIS VITA` (인류제국 생존 시뮬레이터)
* **장르:** 무작위 출생·생애 연대기 텍스트 시뮬레이션 웹 게임 · 워해머 40k 개념 사전 · 정적 제국 코덱스 (Unofficial Fan Project)
* **기술 스택 및 배포:** **Astro 7 (SSG · Rust 컴파일러 · Vite 8/Rolldown) + React 19 (Islands Architecture) + 표준 ESM + Vitest 5** · GitHub Actions 자동 검증 후 Public GitHub Pages(`https://pong3147.github.io/warhammer/`, `base: "/warhammer"`) 정적 배포
* **핵심 영감 및 설계 철학:**
  1. **《80억 분의 1》의 감상 경험 + 워해머 40k TRPG 메커니즘:** 무작위로 인류제국 100만 행성 중 한 곳에 태어나 흘러가는 생애 기록을 감상하되, 일자 진행에 그치지 않고 *Dark Heresy* / *Imperium Maledictum* 기반 **8대 특성치(d100 판정)**와 연간 **삶의 초점(Focus)** 관리로 숨겨진 분기·직군·역사 사건을 해금한다. 기본 1배속 `1년 = 60초`(분기당 20.0초)부터 **16배속(`1년 = 3.75초`)**까지 5단계 배속을 지원한다.
  2. **선택지 원툴 탈피 — 연대기 중심 몰입:** 선택지 분기 사건(837종 = 일반 분기 808종 + 역사 대사건 29종 · 마키 및 특이점/후천 특성/그림다크 다수 `critSuccess`/`critFail` 극단 판정 분기 + 조건부 지문 변주 `leadVariants`/`textVariants` + 100세+ 장수기 동적 작전 16종 지원)뿐 아니라, 인류제국 특유의 인간 경시·관료제 부조리·행성 풍토·4대 직교 계층(`originClass`/`habitat`/`socialTier`/`bodyClass`)·3대 도덕 성향(`자비·교조·암흑`)·28인 네임드·M41~M42 거시 전쟁 일상·트레이드오프/상황 마모·그림다크 전용 기록을 담은 **패시브 연대기 로그(970종)**가 본인 출신·거주 공간·지위·신체 분류에 정확히 맞춰 흘러가며 읽는 재미를 제공한다.
  3. **워해머 입문자 배려 + 정적 지식 베이스 + 설정 고증 조화:** 8대 카테고리 **48종 워해머 40k 개념 사전(`/glossary/`)**과 **5대 정적 제국 코덱스(`/codex/**`)**를 빌드 타임 SSG로 분리 제공(2.6MB급 서사 번들 0KB 격리)하며, 21개 세력 **91종 풀 계급도(테라의 하이 로드 12석 완비)** 중 우측 `자율 선택` 패널에는 **지금 즉시 진입 가능한 일반·승급 직군(`entryMode: "open"`, 입단 심사·정규 서약 기관 소속 고정·귀족 하위 직군 필터 적용)**만 노출하고, 상위 계급·타 기관 특별 초빙(스카우트)·공훈 횡단(행성 총독/로그 트레이더/심문관)·최고위 추대(하이 로드 12석/워마스터/챕터 마스터/살아 있는 성인/데몬 프린스)는 조건 달성 시 **동적 발탁·임명 이벤트**로 자연스럽게 제안한다.
  4. **IP 안전 원칙 (비공식 팬 창작물):** Games Workshop의 공식 아트워크·로고·룰북 원문 복사 없이 자체 작성한 한국어 산문과 순수 CSS/SVG 기하학 그래픽으로만 구성하며, 모든 데이터·개념 사전에 Lexicanum·공식 코덱스·소설 출처 표기를 병기한다.

---

## 2. 전체 디렉토리 구조 및 모듈 · 번들 구성

```text
warhammer/
├── astro.config.mjs                  # Astro 7 SSG 설정 (site/base: "/warhammer", compressHTML: true, React 아일랜드, Vite chunkLimit 3200kB)
├── package.json                      # 의존성(Astro 7, React 19, Vitest 5, RTL, Node >=22.23.4) 및 verify/qa/audit/typecheck/test/build 스크립트
├── tsconfig.json · vitest.config.ts  # TypeScript(vitest/globals + astro/client) · jsdom Vitest 테스트 설정
├── README.md                         # 사용자용 실행·GitHub Pages 배포·개요 안내서
├── AGENTS.md                         # AI 에이전트 작업 방향 · 불변 규칙 · 고증/표기 표준 · QA 게이트
├── PROJECT_GUIDE.md                  # (본 문서) 현행 아키텍처 · 파일별 수록 현황 · 스키마 · 아카이브 인덱스 · 차기 후보
├── docs/archive/                     # 완료 단계 무손실 아카이브 (ROADMAP_STAGE01_18_6.md · ROADMAP_STAGE19_23_5.md · AUDIT_STAGE21_23.md · ROADMAP_STAGE24.md)
├── .github/workflows/
│   ├── qa.yml                        # PR·수동 자동 검증 (qa.mjs + audit-health.mjs --lives=100 + typecheck + npm test + astro build + qa:dist)
│   └── deploy.yml                    # main 브랜치 자동 검증 + GitHub Pages 정적 배포
├── scripts/
│   ├── _loadNodeData.mjs             # Node.js용 ESM 데이터·엔진 공통 로더 (fileURLToPath 크로스플랫폼 ROOT + 0건 로드 즉시 실패 가드)
│   ├── qa.mjs                        # 상설 자동 QA 검증 스위트 (7대 게이트 + Gate 1 전 파일 110KB 통일 + Gate 2 10모듈 임포트 격리 + Gate 3 변주·표기·기호 스캔 + Gate 4 정적+5대 동적 생성기 검증/0~5세 불변식/지표면-공허 린터 + Stage 17~24 회귀 + --deep 1,500+300생애 감사)
│   ├── qa/                           # QA 게이트 분리 모듈 3종 (`distGate.mjs` Gate 8 10모듈 격리 · `personaGate.mjs` Gate 4P 22페르소나×2난이도 + 500조합 퍼저 · `careerGate.mjs` Gate 7A/7B/7D/7E)
│   ├── audit-health.mjs              # 200생애(standard 100 + grimdark 100) 결정론적 퍼징 · 무음 선택지/결과 누락 단언 · 청취 리듬/스포트라이트 · 저장 크기·초인 오염 면역·명예 마감·전 파일 110KB 통일 용량 감시
│   └── coverage-report.mjs           # 직군·행성·챕터·연령대·성향·네임드·시대(`endYear` 반영) 7축 콘텐츠 밀도 매트릭스
├── tests/
│   ├── setup.ts                      # Testing Library jest-dom 셋업
│   └── game-a11y.test.tsx            # 행동형 스크린 리더 접근성·포커스·1~16배속·개념 사전·Stage 19~24 회귀 Vitest 스위트 (30개 테스트)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro          # 공통 HTML 셸 · 병렬 웹폰트 · 스킵 링크 · 상단 내비게이션(4대 메뉴) · 푸터
    ├── pages/                        # 9개 정적 SSG 라우트 (정적 도감·사전은 narrative.js 0KB 격리)
    │   ├── index.astro               # 생애 시뮬레이션 메인 (GameApp client:load)
    │   ├── glossary/index.astro      # 워해머 40k 개념 사전 48종 정적 페이지 (GlossaryExplorer client:load)
    │   ├── hall/index.astro          # 영혼의 전당 · 91종 누적 도감 · JSON 백업 (HallOfSoulsApp client:load)
    │   └── codex/
    │       ├── index.astro           # 제국 코덱스 개요 (0KB JS 순수 정적 HTML)
    │       ├── worlds.astro          # 23개 행성 · 5대 성역 도감 (`client:load`)
    │       ├── careers.astro         # 21개 세력 91종 계급도 도감 (`client:load`)
    │       ├── chapters.astro        # 9대 아스타르테스 챕터 도감 (`client:load`)
    │       ├── timeline.astro        # M41~M42 29대 역사 연표 도감 (`client:load`)
    │       └── characters.astro      # 28인 네임드 인물 도감 (`client:load`)
    ├── components/
    │   ├── game/                     # 생애 시뮬레이션 React 아일랜드 11모듈 (GameApp, StartScreen, TimeControlPanel, YearProgressBar, DossierPanel, FocusGrid, ActiveEventPanel, RecentChronicleList, FullChronicleView, AutonomousPanel, ObituaryModal, types.ts[`LogEntry`])
    │   ├── glossary/GlossaryExplorer.tsx  # 개념 사전 카테고리·키워드 필터 + 디바운스 #sr-live + 해시 헤딩 포커스
    │   ├── codex/                    # CodexSubnav.astro + CodexExplorer.tsx (5대 도감 필터·아코디언·초기 해시 포커스 안전 가드)
    │   └── hall/HallOfSoulsApp.tsx   # 영혼의 전당 · 91종 직군 수집 현황 · 2단계 초기화 · JSON 백업/복원
    ├── lib/
    │   ├── codexMeta.ts              # 21개 세력 TREE_ORDER · groupCareersByTree · CODEX_COUNTS 단일 정본
    │   ├── contextualGlossary.js     # 좌측 인물 상태 패널용 경량 상황별 개념 사전 매핑 (31종 · 21세력 완비)
    │   ├── links.ts                  # GitHub Pages base("/warhammer") 안전 경로 헬퍼
    │   ├── storage.ts                # localStorage 3키 하위 호환 저장/복원/JSON 백업(24태그 상한 일치) + 지연 narrative 런타임 로더(재시도 가능)
    │   └── chronicleText.ts          # 순수 텍스트 생애 기록서 생성·복사·.txt 다운로드
    ├── styles/
    │   ├── global.css                # 고딕 데이터슬레이트 테마 · 3대 성향 게이지 · 고대비 포커스 링 · 반응형 그리드
    │   └── astro-pages.css           # 정적 페이지(개념 사전 · 코덱스 · 영혼의 전당 · 상단 내비) 전용 스타일
    ├── engine/                       # 시뮬레이션 엔진 ESM 10모듈 (전 파일 < 66KB / < 1,670줄)
    │   ├── formatters.js             # 경량 공통 포매터 · 메타 상수 · 4대 직교 축(`originClass`/`habitat`/`socialTier`/`bodyClass`) · resolveFactionEndingKey · describeReq (SSOT)
    │   ├── statCaps.js               # 종족·계급·전공·23모성·12재능·12후천특성 이중 스탯 상한 · 각성 특이점 · 오염/부상 감쇠 · 특성 면역 SSOT (Stage 21 · 23.5)
    │   ├── reqEvaluator.js           # 파티션 버킷 인덱싱(`buildPoolIndex`) · 4대 직교 계층 산출 · `makeReqContext` · `checkReq` · `resolveEventText`(`leadVariants`/`textVariants`)
    │   ├── stateLifecycle.js         # `ERA_PRESETS` · 이름 생성 · 기대 수명 · `createCharacter`(보이드본 출생 일원화) · `migrateState` 무순환 분리 (Stage 24-A)
    │   ├── centenarianOps.js         # 100세+ 초장수자 전용 동적 순찰 · 유물 회수 · 패권 작전 풀 16종 (쿠스토데스 혈전 유희 · 리빙 세인트 기적 포함)
    │   ├── createEngine.js           # 코어 시뮬레이션 엔진 팩토리 (createImperiumEngine · d100 판정 · 극단 판정 분기 · 영아기 차단/목격 · 진행 루프)
    │   ├── careerRules.js            # 직군 서약 격리 · 입단 심사 · 귀족 하위 직군 필터 · `createComingOfAgeEvent`(18세 성년 결단/의절) · 동적 발탁/스카우트 · 수동 전직 (QA Gate 7A SSOT)
    │   ├── careerActions.js          # 91종 직군 고유 자율 행동 · 리주버냇 · 기계교 의체 · 정화 고행(오염 0 트라우마 치유 포함) · 행동 실행
    │   ├── endings.js                # 명예 마감 · 상태 요약 · 동적 추모 에필로그 · 부고 등급 판정 · 사망 처리
    │   └── travel.js                 # 성간 이동 · 행성 출입 자격 매트릭스 · 의절 귀족 사설 선박 차단 · 파견/순례/워프 항해 이상 동적 이벤트
    └── data/
        ├── index.js                  # 전체 데이터 조합 진입점 (CORE_DATA + NARRATIVE_DATA)
        ├── narrative.js              # import.meta.glob 기반 사건(64파일)·연대기(24파일) 비동기 청크 진입점
        ├── glossary.js               # 워해머 40k 주요 개념 사전 (8대 카테고리 · 48종 핵심 용어)
        ├── core/                     # 코어 메타데이터 ESM 15파일 (index.js + worlds/origins/chapters/characters/tags + careers.js 배럴 + careers/{civil_militarum,faith_shadow,transhuman_chaos,specialist_factions}.js + timeline.js 배럴 + timeline/{m41_early,m41_late,m42_indomitus}.js)
        ├── events/                   # 분기 사건 808종 — 도메인(세력·챕터·권역·주제)별 64개 ESM 파일
        │   ├── careers/              # 직군 계열·1:1 승격 20파일 (+`guardsman_grimdark.js`)
        │   ├── chapters/             # 9대 챕터 1:1 승격 9파일 + 합동 공조 1파일 = 10파일
        │   ├── worlds/               # 행성 1:1 승격 4파일 + 권역/심층 6파일 = 10파일 (+`voidborn_deep.js`)
        │   └── themes/               # 횡단 주제별 24파일 (`origin_crossover_s24.js` 포함)
        └── chronicles/               # 일상 연대기 970종 — 주제별 24개 ESM 파일 (`voidborn_s24.js` · `origin_crossover_s24.js` 포함)
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
  * `GameApp.tsx`: `localStorage` 3중 저장(`imperium_vita_active_v1`, `imperium_vita_hall_v1`, `imperium_vita_prefs_v1` 기존 키 100% 하위 호환), 페이지 이탈·내비게이션 시 자동 일시정지·저장, `handleChooseEvent` 시 `prevTopLog` 비교 가드 및 `#sr-live` 압축 판정 라벨·수치(`대성공(3/58). `) 선행 안내, `LogEntry` 타입 기반 분기 `#sr-live` 4단 우선순위(`death > career / 유아기 역사 목격 > danger > event > chronicle`) 자동 낭독, `현재 상태 요약 듣기`, `다음 사건까지 진행`, 전체 인생 기록서 뷰 전환(`chronicle-grim` 일상 필터 포함).
  * `DossierPanel.tsx`: 좌측 인물 상태 패널 · 3대 게이지 · 3대 도덕 성향 · `<dl>` 직계 `<dt>`/`<dd>` 8대 특성치(`현재 / 상한`) · 모성 특전/선천 재능/후천 각성 특이점/후천 특성 1줄 효과 목록(`#trait-perks-list`) · 이력 태그 + 하단 고정 단일 구역(`#dossier-glossary`)에 현재 세력·출신·자질·체류 행성에 맞춘 개념 사전 새 탭 링크 1~2개 제공(사건·직군 카드 내부 링크 0건 유지).
  * `TimeControlPanel.tsx` & `YearProgressBar.tsx`: **1배속(60초/년 · 분기당 20.0초) ~ 2배속(30초) · 4배속(15초) · 8배속(7.5초) · 16배속(3.75초 · 분기당 1.25초)** 5단계 배속과 `performance.now()` 기반 50ms 고정밀 진행 바(`aria-hidden="true"`), 새 탭 개념 사전·코덱스 빠른 링크.
  * `AutonomousPanel.tsx`: React 안정 키 기반 DOM 보존 + 버튼 순서 변동·비활성 전환·소진 시 포커스 안전 복원(`:not(:disabled)` 탐색 및 `#heading-auto` 폴백), 14~18세 귀족(하위·사병 직군 숨김, 이단·앱휴먼 분기 및 18세 낙하산·성년 결단 안내)·스콜라 수습 안내, 비치명적 입단 심사(`40~88%`, 그림다크 `-12%`)·선발 시련 성공률/위험 안내, 2년 최소 복무·재지원 대기 표시, 21개 세력 트리 그룹화, 성간 이동 출입 자격·강제 파견 잠금·승인율 표기.
  * `ActiveEventPanel.tsx` & `ObituaryModal.tsx`: 사건 발생 시 `#active-event-heading`(`tabindex="-1"`) 포커스 이동, `computeCheckPreview` SSOT 기반 실시간 최종 성공률·상황 보정·90% 상한 및 보유/미보유/면역 필터링된 후천 특성 획득/치유 사전 예고 표기, 네임드 스포트라이트 `<details key=... open={!isRepeatEncounter} class="named-spotlight">`(초회·부분초회 전개 / 재조우 기본 접힘, 시각용 `.ev-badge.character` `aria-hidden="true"` 및 `<details>` 중복 `aria-label` 제거로 3중·이중 낭독 차단), 부고 모달 `aria-labelledby="obit-rank obit-title"` + 배경 및 `.skip-link` `inert` 처리 + `Tab`/`Shift+Tab` 트랩 + `Escape` 닫기·포커스 복원.
* **`src/styles/global.css` (~1,880줄) & `src/styles/astro-pages.css` (~347줄):**
  * 황동·검정·진홍·코지테이터 녹색의 제국 데이터슬레이트 테마, `.sr-only`, 고대비 금색 `:focus-visible` 포커스 링, 3대 도덕 성향 3분할 비율 막대(`.align-tri-bar`)·사건 성향 배지(`.ev-badge.align-*`), `.dossier-glossary` 고정 개념 링크, `.trait-perks-list` 모성·재능·각성 특이점·후천 특성 카드, 순수 CSS border 꺾쇠(`.named-spotlight-summary::after`) 및 `prefers-reduced-motion` `.named-spotlight[open]` 복구, `.sanctum-hero::before` 빈 대체 텍스트(`/ ""`), 개념 사전·코덱스 카드 및 반응형 그리드.
* **`src/engine/**` (10개 ESM 모듈 · 전 파일 `< 66KB / < 1,670줄`):**
  * **경량 공통 포매터(`formatters.js` ~779줄 · `27.6KB`):** `SAVE_VERSION = 4`, `ALIGNMENT_KEYS`·`ALIGNMENT_META`, **4대 직교 계층 축(`ORIGIN_CLASS_KEYS`, `HABITAT_KEYS`, `SOCIAL_TIER_ORDER`, `BODY_CLASS_KEYS` 및 `LIFE_REALM_KEYS` 하위 호환 — `computeOriginClass`/`computeHabitat`/`computeSocialTier`/`computeLifeRealm`/`computeBodyClass`)**, **명예 마감·부고 공용 세력 분기(`FACTION_ENDING_KEYS`, `resolveFactionEndingKey(state, career)`)**, `STAT_META`, `FOCUSES`, `QUARTER_LABELS`, `formatImperialYear`/`Date`, `formatRollOutcomeLabel`, `getWorldShortTag`, `normalizeAlignment`/`getAlignmentInfo`, `createCoreFormatters(DATA)`(`describeReq` 13개 계층·공간 키 및 다중 제외 축 포함, 6종 O(1) 조회) 단일 정본 제공.
  * **이중 스탯 상한 · 후천 특성 · 면역/감쇠 SSOT(`statCaps.js` ~423줄 · `14.0KB`):** `ACQUIRED_TRAIT_EFFECTS`(12종) · `ANOMALY_TAG_EFFECTS`(4종, `summary` 포함) · `getStatCap` · `getAllStatCaps` · `getAcquiredTraits` · `getAwakenedAnomalies` · `scalePositiveCorruption` · `scaleWoundDamage` · `isTraitImmune` · `getSpecialtyStatSet`.
  * **조건·버킷·지문 변주 평가기(`reqEvaluator.js` ~370줄 · `13.4KB`) + 생애 생성·마이그레이션(`stateLifecycle.js` ~404줄 · `17.1KB`) + 장수기 동적 작전(`centenarianOps.js` ~744줄 · `29.3KB`, 16종 3진영 풀) + 코어 엔진(`createEngine.js` ~1,666줄 · `65.7KB`) + 4대 도메인 모듈(`careerRules.js` ~937줄 · `41.3KB`, `careerActions.js` ~676줄 · `32.1KB`, `endings.js` ~755줄 · `44.7KB`, `travel.js` ~1,107줄 · `50.3KB`):** `ERA_PRESETS`(9개 시대)·보이드본 출생 일원화(`createCharacter`)·`migrateState`(`stateLifecycle.js`), `EVENTS`/`CHRONICLES` 무손실 파티션 버킷·`makeReqContext`·`checkReq`·`resolveEventText`(`leadVariants`/`textVariants`, `reqEvaluator.js`), `captureAndRegisterEventCharacters`, 선택적 `choice.critSuccess`/`choice.critFail` 극단 판정 서사 분기, `removeTags` 치유/극복/상실, `applyChronicle` 일상 스탯 발동 리밸런싱 및 거짓 치유 로그 차단, 직군 서약/스카우트/귀족 하위 직군 필터/`createComingOfAgeEvent`(`careerRules.js`), 자율 행동(`careerActions.js`), 명예 마감·부고(`endings.js`), 성간 이동·파견·의절 귀족 사설 선박 차단(`travel.js`)을 무순환 DAG 10모듈로 분리했다.
  * **조건 · 서약 격리 · 판정 · 부고 엔진:** `checkReq(state, req, ctx)` / `resolveEventText(ev, state, ctx)` / `describeReq(req)` / `getStratification(state)` / `getAlignmentInfo(state)` / `getLivingSaintAspect(state)` / `isCareerTransitionBlocked` / `isUnboundCareer` / `isManualCareerAllowed` / `evaluateDynamicOfferEligibilityPure` / `getAdmissionPreview` / `canAccessWorld` / `applyDiminishedStatGain`(이중 상한 `getStatCap` 전 경로 강제 · `cur/cap` 비율 수확 체감) / `computeCheckPreview`(d100 상황 보정 + 모성/자질/진시드 시련 +8/후천 특성 보정 + 70% 초과 완만 압축 · 90% 상한 SSOT) / `syncImperialNihilus(state)` / `rollD100(state, check)` / `canRetireHonorably`·`createHonorableEndingEvent`·`evaluateLifeGrade(state)`(`resolveFactionEndingKey` 공유 헬퍼 기반 15대 세력 분기 · 최상위 맞춤 부고 31종+ 및 인연·직접 조우 `met_<id>` 우선 네임드 28인·3대 도덕 성향 결합 동적 추모 에필로그, 쿠스토데스·그레이 나이트·암살청·침묵의 자매들 비밀 수호자 예외 포함).
  * **분기 진행 파이프라인 (`advanceQuarter`):**
    1. 분기 증가(1 -> 2 -> 3 -> 새해 1; 선택형 `fastChildhood` 시 0~12세 연 1분기). 새해 정산 시 14세 자동 직무 편입(`navigator` -> 견습 항법사, `knight_blood` -> 기사 가문 종자, `mechanicus_blood` -> 스키타리, **`krieg` -> 데스 코어 오브 크리그(`astra_militarum`)**; 반면 `planetary_noble`·`rogue_trader_scion`·`terra_high_blood`·`schola`는 14~18세 수습 기간 유지), 19세 진입 시 미선택 수습생 자동 배치(`rogue_trader_blood` 비의절 -> `rt_seneschal`, 일반 귀족 -> `administratum`, 앱휴먼 `pdf_trooper`, 이단자 `chaos_cultist`, 스콜라 비앱휴먼·비사이커·비항법사 `ecclesiarchy_priest`), 초점+직군 수확 체감 스탯 성장, 하이브리드 체력 회복·비선형 노화, 환경 위험 판정.
    2. 아스타르테스 중상(생명력 38 이하) 시 드레드노트 안치(`EVENT_BY_ID` O(1)) 긴급 발동 및 사망/오염 100 체크(데몬 프린스·쿠스토데스·그레이 나이트·살아 있는 성인 스폰화 사망 면역).
    3. **1순위:** `TIMELINE` 역사 대사건 29종(0~5세 영아기에는 직접 선택지 원천 차단 후 `tl.infantLog` 목격 로그 기록 및 카디아·타니스 자동 탈출 / 바알 지하 대피소 생존 처리, 6세+ 직접 체험 및 원격 아스트로패스 속보 `heardNews` 전파).
    4. **1.2순위:** 18세 2분기 비의절 귀족·로그 트레이더·테라 고위 귀족 미배치 수습생 대상 `createComingOfAgeEvent` 성년 진로 결단 분기(가문 승계 · 행정/함대/낙하산 임관 `noble_commission` · 이단 도피 · 가문 의절 `disowned_noble`).
    5. **1.5순위:** `createDynamicCareerOfferEvent` 동적 승급·타 기관 특별 초빙(스카우트)·공훈 횡단·최고위 추대·초인 소환·암살청 비밀 징발(`allowLateralOffer`)·성인 각성·카오스 유혹 제안 이벤트 + 수락 시 `applyCareerJoinEffects` 및 챕터/템플 서약 연쇄 발동.
    6. **2순위:** 6세 이상(`state.age >= 6`) `EVENTS` 확률 선판정(28~34%) 후 파티션 버킷 기반 동적 분기 사건 발동(`resolveEventText` 적용 · 생애 최대 2회 상한 + 최근 14개 방지) 및 100세+ `createDynamicCentenarianEvent` 장수기 동적 작전 16종(4년 쿨다운 · 최근 6종 제외).
    7. **2.5순위:** `createDynamicTransitEvent` `transitTier` 기반 강제 파견/배치 선택/비군사 기관 소환(의절 귀족 제외)/카오스 배신자 약탈·밀항 분기 및 워프 항해 이상 변주.
    8. **3순위:** `applyChronicle` 파티션 버킷 기반 일상·부조리·그림다크 연대기 로그 출력(유아기 역사 목격 발생 분기 생략 · `alignBias`·최근 28개 방지, `MAX_LOGS = 2,400`건 스마트 보존).
  * **자율 행동 · 이동 · 접근성 요약:** `getCareerAction(state)`(30종 `actionGroup` 프로필 기반 91개 직군 고유 행동, 4년 재사용), `canUsePenance`/`canUseAugmetics`/`canUseRejuvenat`, `canRetireHonorably`/`createHonorableEndingEvent`/`resolveFactionEndingKey`, `buildStatusSummary(state)`, `canAccessWorld`/`getTravelProfile`/`evaluateTravelAttempt`/`getTravelCandidateWorlds`, `getContextualOptions`.
* **`scripts/qa.mjs` (~2,710줄) · `scripts/qa/{distGate,personaGate,careerGate}.mjs` · `scripts/audit-health.mjs` (~410줄) · `scripts/coverage-report.mjs` (~150줄) · `tests/game-a11y.test.tsx` (~1,967줄) & `.github/workflows/{qa,deploy}.yml`:**
  * `node scripts/qa.mjs` (`--deep` / `--check-dist` / `--only-dist`): `AGENTS.md` 7대 게이트 + **Gate 1 전 파일 110KB/2,200줄(연대기 70KB/1,400줄) 하드 상한** + **Gate 2 정적 페이지 분할 엔진 10모듈 import 격리** + **Gate 3 금지 구표기·장식 기호·`leadVariants`/`textVariants`·비표준 판정 라벨 차단** + **Gate 4 공용 선택지 검증기(정적 + 5대 동적 생성기 `centenarianOps` 16종·`createComingOfAgeEvent`·`careerRules`·`travel`·`endings`), 0~5세 선택지 0건 불변식, 정적 지표면-공허 공간 린터, Stage 17~24 회귀 단언** + **Gate 4G(개념 사전 48종·31종 매핑)** + **Gate 4P(`personaGate.mjs`: 22페르소나 × 2난이도 + 500개 카테시안 조합 퍼저 · 충돌 0건 · 최소 풀 하한 `>= 8`)** + **Gate 7A/7B/7D/7E(`careerGate.mjs`: `2,256 req` 도달성 · 120 승급 간선 0데드락 · 실존 프로브/태그 검증 기반 비카오스 `forceCareer` 강등/폐쇄서약/`abhuman`/`gender` 정적 가드 · 변주 도달성)** + **Gate 8(`distGate.mjs`: `dist/` 10모듈 번들 격리 · SSR 카드 수량 일치)**.
  * `node scripts/audit-health.mjs` (`--lives=N`, `--seed=S`): 결정론적 `mulberry32` 시드 기반 **200생애(`standard` 100 + `grimdark` 100)** 무작위 플레이(전직·자율행동·성간이동·매 `resolvePendingChoice` `outcome`/신규 로그 단언·7분기마다 JSON/`migrateState` 왕복·500세+ 명예 마감·초인 오염 면역·비초인 300세 이상치·저장 2,048KB 상한·청취 리듬·전 파일 통일 용량 감시).
  * `npm test` (`tests/game-a11y.test.tsx`): React Testing Library + jsdom 기반 행동형 스크린 리더 접근성·포커스·1~16배속·개념 사전·코덱스 5섹션·네임드 스포트라이트·Stage 19~24 회귀 **30개 테스트 스위트**.
  * `node scripts/coverage-report.mjs`: 직군·행성·챕터·연령대·성향/초점·네임드(28인 100%)·시대(9개, `endYear` 반영) 7축 콘텐츠 밀도 매트릭스 출력.
  * `.github/workflows/qa.yml` & `.github/workflows/deploy.yml`: PR·수동(`qa.yml`) 및 `main` 푸시(`deploy.yml`) 시 `qa.mjs` + `audit-health.mjs --lives=100` + `typecheck` + `npm test` + `npm run build` + `qa.mjs --only-dist`(Gate 8)를 자동 검증하고, `main` 브랜치 통과 시 GitHub Pages로 정적 배포.

### 3.2 데이터 파일별 수록 내용
| 파일 | 건수 | 수록 내용 요약 |
| --- | --- | --- |
| `src/data/glossary.js` | 8카테고리 · 48용어 | 인류제국의 기둥(7), 워프·사이커·카오스(7), 제국 군대·초인(8), 기계교·심문소·행정(6), 행성 분류·인류 사회(5), 주요 외계 종족(7), 제국 연대기·M41~M42(5), 게임 시스템(3 · `statCaps`/`grimdark`/`centenarianOps` 최신화) — 자체 작성 한국어 해설 · 게임 연계 안내 · 코덱스 상호 링크 · Lexicanum 출처 완비. |
| `src/data/core/worlds.js` | 5성역 · 23행성 | **네임드 15** + **일반/특수 8** — **전 23개 행성 평생 특전(`capMods` + `perk`)** 엔진 실구현 100% 동기화. |
| `src/data/core/origins.js` | 신분 11 · 자질 12 | 11종 출신 신분(`rogue_trader_scion` 보이드본 태그 일원화 완료) + **12종 선천 자질(`capMods` + `talent`):** 기존 8종(`none` 63.5%) + **극희귀 4대 규격 외 특이점(합계 2.5%: `alpha_plus_psyker`, `freak_physique`, `savant_genius`, `omega_pariah`)**. |
| `src/data/core/careers.js` (+ `careers/*.js`) | 5파일 · 92직군 (선택 91 · 21트리) | 배럴(`0.7KB`) + 4개 도메인 모듈(`civil_militarum.js` 37직군, `faith_shadow.js` 23직군, `transhuman_chaos.js` 19직군, `specialist_factions.js` 13직군) — 승급-상한 0데드락 · 고증 자격 가드(낙하산 임관·혈통 세네샬·아르비테스 적성) 완비. |
| `src/data/core/chapters.js` | 9챕터 | `ultramarines`, `blood_angels`, `space_wolves`, `dark_angels`, `imperial_fists`, `salamanders`, `black_templars`(`allowPsyker: false`), `raven_guard`, `white_scars`. |
| `src/data/core/characters.js` | 28인물 | 28인 전원 단독 조우·`met_*` 선택지 생산·4대 후일담 사건·연대기 100% 완비. |
| `src/data/core/timeline.js` (+ `timeline/*.js`) | 4파일 · 29대사건 | 배럴(`0.5KB`) + 시대별 3분할(`m41_early.js` 11, `m41_late.js` 9, `m42_indomitus.js` 9). 전 항목 0~1인 대표 스포트라이트 원칙 준수 + 9건 영아기 `minAge: 6`·`infantLog`·자동 탈출/바알 지하 대피소 완비. |
| `src/data/core/tags.js` | 태그 228 · 행성태그 49 | 이력·신분·자질·직군·계급·직책·명예·인연·성향·신규 세력·거시 전쟁·노년/변경·Stage 21 특이점/후천 특성·Stage 21.6 인연 태그 8종·**Stage 24 3종(`disowned_noble`, `noble_commission`, `shore_leave_void`)** 한글 라벨 사전(`TAG_LABELS` 228/228 전량 회수) 및 `WORLD_TAG_LABELS`. |
| `src/data/events/careers/*.js` | 20파일 · 291사건 | 직군 계열·1:1 승격 20파일 (Stage 24 핵심 11사건 `leadVariants` + TTS-우선 출신 선택지 업그레이드, `ev_astartes_recruiter`·`inquisition.js` 폐쇄 서약 가드 포함). |
| `src/data/events/chapters/*.js` | 10파일 · 60사건 | 9대 챕터 1:1 승격(`6*9=54`) + 합동 공조 `chapters_core`(6). |
| `src/data/events/worlds/*.js` | 10파일 · 123사건 | 1:1 승격 4파일(`terra` 10, `cadia` 6, `krieg` 6, `armageddon` 6) + 권역/심층 6파일(`solar` 13, `ultima` 27, `frontier` 19, `generic` 14, `generic_deep` 12, **Stage 24 `voidborn_deep` 10**). |
| `src/data/events/themes/*.js` | 24파일 · 334사건 | 기존 23파일(324건) + **Stage 24 `origin_crossover_s24.js`(10건)** (`lifecycle_early.js` 검은 함선 어조 교정 및 `origins_tags.js` Gate 7E 가드 포함). |
| `src/data/chronicles/*.js` | 24파일 · 970연대기 | 기존 22파일(936건) + **Stage 24 `voidborn_s24.js`(18건) · `origin_crossover_s24.js`(16건)** — 전체 970종 상황 맞춤형 일상·부조리·그림다크 연대기. |


---

## 4. 핵심 게임 시스템 규격 및 엔진 스키마 레퍼런스

### 4.1 계급별 진입 · 이동 · 페이싱 · 특수 시술 · 원격 속보 규격
* **진행 페이싱 (5단계 배속):** 기본 1배속 기준 `1년 = 60초` (`1년 = 3분기`, 분기당 20.0초). 2배속 30초(분기 10.0초), 4배속 15초(분기 5.0초), 8배속 7.5초(분기 2.5초), **16배속 3.75초(분기 1.25초)**. `YearProgressBar.tsx`에서 `performance.now()` 50ms 단위로 정밀 보간한다.
* **영아기(0~5세) 차단 & 계급별 운명 궤도:** 0~5세에는 선택지 분기 사건(`EVENTS`)과 직접 선택형 `TIMELINE`을 원천 차단하고, 전역·행성 대격변은 `유아기 역사 목격` 패시브 로그와 자동 탈출(카디아 -> `voidborn`, 타니스 -> `generic_civilised`; 바알은 지하 대피소 생존)로 처리한다. 14세 자동 편입 시 크리그는 데스 코어(`astra_militarum`)로 배치되며, 상위 귀족(`!disowned_noble`)은 14~18세 수습 중 하위·사병 5직군이 숨겨지고 18세 2분기 `createComingOfAgeEvent`(가문 승계 · 행정/함대/낙하산 임관 `noble_commission` · 이단 도피 · 가문 의절 `disowned_noble`)로 진로를 결단한다. 아르비테스는 `schola` 또는 교조(`dogmatic >= 20`) / 의지(`WP >= 44`) 적성이 필요하다.
* **직군 진입 · 서약 · 입단 심사 (`entryMode`, `UNBOUND_CAREERS`, `CLOSED_VOW_TREES`):** `open` 직군은 비구속 민간·초년에서 첫 정규 서약 기관 지원 시 비치명적 d100 입단 심사(`40~88%`, 그림다크 `-12%`, 탈락 시 2년 재지원 대기, 취임 후 2년 최소 복무)가 적용된다. 정규 서약 기관 복무 중에는 같은 트리 승급·카오스·초인/동급 이상 사이커(항법사 제외, 비폐쇄 직계 연계/항법사->세네샬)만 수동 전환이 열리며, 타 기관 이동은 명성(`Inf >= 52`)·성향·적합성 기반 **타 기관 특별 초빙(스카우트)** 및 `event` 전용 동적 발탁·임명 사건으로 이뤄진다(소로리타스·기계교·항법사·기사 가문·사이커 종신 폐쇄 서약 격리 적용; 거절 시 8년, 시련 실패 2년 재지원 + Tier 6 16년 쿨다운).
* **강제 파견/이동 선언적 위계 (`transitTier`, `canAccessWorld`):** `forced`/`astartes_scout`는 수동 행성 선택이 잠기며(`forcedLock: true`) 상부 명령에 따른 강제 파견으로만 이동한다. `mid`/`astartes_brother`/`grey_knight`는 2개 작전 구역 택1+잔류 및 4년 이동 쿨다운, `autonomous`는 자율 원정 100% 즉시 출항 및 3년 쿨다운, 비의절 귀족은 `Inf < 45` 인접 성역 / `45+` 은하 전역(의절 귀족 `disowned_noble`은 가문 사설 선박·궁정 사절단 차단), 야만 행성 일반 시민은 이탈 불가다. `canAccessWorld`가 파괴 행성·아스타르테스 모성·테라·화성(화성 조약)·크리그/카타찬·기사 행성 출입 자격을 일괄 검증한다.
* **스탯 수확 체감 & 투명 d100 판정 (`applyDiminishedStatGain`, `computeCheckPreview`):** 임의 스탯 하락 없이 이중 상한(`getStatCap`) 대비 잔여 비율(`cur / cap`) 기반 수확 체감을 적용하며, 분기 사건 보상은 최소 `+1`(상한 도달 시 `0`)로 Tier 6 도달성을 보존한다. d100 판정은 `computeCheckPreview` 단일 정본으로 부상(`-8/-16`)·워프 오염(`-8/-15`, 카오스 트리/데몬 프린스/무혼 면제)·임페리움 니힐루스(`-5`)·고위 난제(`-5/-9`)·모성/자질/진시드 시련(+8)/후천 특성 보정과 70% 초과 완만 압축(`max 90%`)을 선택지 미리보기와 실제 굴림에 동일 적용한다.
* **기계교 의체 개조:** 기계교 소속은 16세+(무료, 8년 간격), 비기계교는 18세+·고위 계급(Tier 3+, 권위 42+) 또는 귀족(권위 55+) 또는 부상 재활 여건 필요. 크리그 일반 병사 및 야만 행성 하급민(Tier 3 미만), 데몬 프린스 제외(`crippled_limb`/`chronic_toxins` 치유 연동).
* **리주버냇 수명 연장:** 50세+·고위 계급(Tier 3+)/귀족·권위 50+, 아스타르테스/쿠스토데스/살아 있는 성인/데몬 프린스 불필요(`chronic_toxins` 치유 연동).
* **성당 정화 고행:** 14세+·비야만 행성·비이단자·(오염 1+ 또는 `shell_shocked`/`warp_scarred` 보유)·재사용 3년(암흑 1+ 시 암흑 -3 · 교조 +1 병행, 정신 트라우마 치유 연동).
* **은하·성역 원격 속보:** 타 행성 체류 중에도 제국 전역(`galaxy`) 또는 같은 성역(`sector`)의 대형 역사 사건이 발생하면 아스트로패스 속보(`heardNews`)가 연대기에 수신됨(야만 행성 제외).

### 4.2 `checkReq(state, req)` 지원 조건 키 및 조건부 지문 변주
* **`checkReq` 지원 키:** `minAge`, `maxAge`, `minYear`, `maxYear`, `gender` (`"male"`/`"female"`), `difficulty` (`"standard"`/`"grimdark"`), `stats` (`{ WS, BS, T, Ag, Int, WP, Fel, Inf }`), `minFaith`, `maxFaith`, `minCorruption`, `maxCorruption`, `minWounds`, `maxWounds`, `minAlign` (`{ humane, dogmatic, ruthless }`), `maxAlign`, `anyDominantAlign` (`["humane"|"dogmatic"|"ruthless"|"neutral"]`), **`anyOriginClasses`**, **`excludeOriginClasses`** (`"underclass"|"common"|"military_caste"|"schola"|"noble"|"high_noble"|"disowned"`), **`anyHabitats`**, **`excludeHabitats`** (`"void"|"surface"|"frontline"|"cloister"`), **`minSocialTier`**, **`maxSocialTier`**, **`anySocialTiers`** (`"underclass"|"common"|"elite"|"apex"`), **`anyRealms`**, **`excludeRealms`** (`"civilian"|"cloistered"|"military"|"void"|"mechanicus"|"heretic"`), **`anyBodyClasses`**, **`excludeBodyClasses`** (`"mortal"|"augmetic"|"transhuman"|"dreadnought"|"daemonic"`), **`excludeTrees`**, **`maxCareerTier`**, `allTags`, `anyTags`, `excludeTags`, `anyCareers`, `anyPastCareers`, `excludePastCareers`, `anyChapters`, `excludeChapters`, `anyWorlds`, `anyHomeWorlds`, `excludeWorlds`, `excludeHomeWorlds`, `anyWorldTags`, `excludeWorldTags`, `anySegmenta`, `anyFocus`, `greatRift` (`true`/`false`), `or` (재귀 배열).
* **조건부 지문 변주 (`resolveEventText`):** 사건 객체에 선택적으로 `leadVariants: [{ req, lead }]` 또는 `textVariants: [{ req, text }]`를 지정하면 `pendingEvent` 생성 시점에 캐릭터 상태에 최초로 일치하는 변주를 결합(`lead + " " + text` 또는 대체 `text`)해 확정한다.

### 4.3 `applyOutcome(state, outcome)` 지원 효과 키 및 선택지 극단 판정 분기
* **`outcome` 효과 키:** `text`, `stats`, `wounds`, `woundsBonus`, `faith`, `corruption`, `corruptionReset`, `align` (`{ humane, dogmatic, ruthless }`), `lifeBonusExtra` (또는 `extraLifeBonus`), `incrementRejuvenat`, `addTags` (`met_<charId>` 자동 `metCharacters` 등록), `removeTags` (후천 특성 치유·극복·상실 및 의절 특권 회수), `moveWorld`, `warpYearShift` (생물학적 연령 유지한 워프 시간 도약), `forceCareer`, `acceptCareerOffer`, `declineCareerOffer`, `trialFailFor`, `chooseChapter`, `instantDeath` (사망 사유 문자열).
* **선택적 극단 판정 분기 (`choice.critSuccess` / `choice.critFail`):** `choice.check`가 있는 선택지에 선택적으로 `critSuccess` 또는 `critFail` 결과 객체를 지정하면 `resolvePendingChoice`가 d100 대성공(`roll <= 5` 및 성공) / 대실패(`roll >= 96` 및 실패) 시 전용 산문·보상·패널티를 적용한다. 미지정 시 기존과 동일하게 `check.success` / `check.fail`로 무손실 폴백한다.

---

## 5. 완료 로드맵 아카이브 인덱스 (Stage 1 ~ Stage 24 · 100% 달성)

> 100% 완료·검증·`main` 병합까지 마감된 Stage 1 ~ Stage 24의 모든 상세 설계 명세, 단계별 완료 보고서 및 감사 체크리스트는 아래 아카이브 문서에 무손실 보관되어 있다.

### 5.1 아카이브 문서 목록
* **[`docs/archive/ROADMAP_STAGE01_18_6.md`](./docs/archive/ROADMAP_STAGE01_18_6.md):** Stage 1 ~ Stage 18.6 상세 로드맵 및 완료 보고서 (1~5차 서사·시스템 대확장, 91직군 풀 계급도, 3대 도덕 성향, Astro 7 + React 19 SSG 전환, 개념 사전 48종 · 정적 코덱스 · Gate 8 번들 격리).
* **[`docs/archive/ROADMAP_STAGE19_23_5.md`](./docs/archive/ROADMAP_STAGE19_23_5.md):** Stage 19 ~ Stage 23.5 상세 로드맵 및 완료 보고서 (신분/생활권/신체 3대 계층 · 서약 격리 · 110KB 모듈화 · M41 시대/극단 판정 · 이중 스탯 캡/특이점/후천 특성 · 인연 연작 · 표준 vs 그림다크 · 100세+ 동적 작전 · Stage 23.5 통합 안정화).
* **[`docs/archive/AUDIT_STAGE21_23.md`](./docs/archive/AUDIT_STAGE21_23.md):** Stage 21 ~ 23 최초 3인 읽기 전용 감사 전수 체크리스트(`[P0]` 11그룹 · `[P1]` 8그룹 · `[P2]` 3그룹) 및 Stage 23.5 전량 해소·최종 재감사 `PASS` 기록.
* **[`docs/archive/ROADMAP_STAGE24.md`](./docs/archive/ROADMAP_STAGE24.md):** Stage 24 (`24-A ~ 24-D`) 상세 설계 명세, 완료 보고서 및 3인 독립 읽기 전용 감사 Round 1~3 전량 해소·최종 `PASS` 기록.

### 5.2 단계별 누적 달성 요약표 (Stage 1 ~ Stage 24)

| 단계 | 상태 | 핵심 달성 내역 | 상세 아카이브 |
| --- | :---: | --- | --- |
| **Stage 1 ~ 3** (1차 서사 보강) | `[완료]` | 미회수 이력 태그 연작·3대 오르도·카오스 4대 신·`anyFocus`·생애 주기 곡선·M41 초중반·네임드 단독 조우·맞춤 부고 구축 | [Stage 1~18.6](./docs/archive/ROADMAP_STAGE01_18_6.md) |
| **Stage 4 ~ 6** (2차 서사 보강) | `[완료]` | `met_*` 20인 후일담·명예 태그 17종·초년병기·가족/후계자 연작·M41~M42 역사 대사건·워프 항해 변주 확충 | [Stage 1~18.6](./docs/archive/ROADMAP_STAGE01_18_6.md) |
| **Stage 7 ~ 10** (3차 안정화·UX) | `[완료]` | P0 버그/고증 수정·스크린 리더 접근성·자동 저장·위기 24종·상설 QA 자동화·기록 내보내기·영혼의 전당 도감화 | [Stage 1~18.6](./docs/archive/ROADMAP_STAGE01_18_6.md) |
| **Stage 11** (4차 계층 분할) | `[완료]` | 데이터 도메인 계층형 분할(`core/`·`events/`·`chronicles/`)·태그 사전 분리·QA 자동화 확립 | [Stage 1~18.6](./docs/archive/ROADMAP_STAGE01_18_6.md) |
| **Stage 12 ~ 18** (5차 제국 대확장) | `[완료]` | 21개 세력 91종 풀 계급도(하이 로드 12석)·계급 대비(`anyPastCareers`)·15행성/9챕터 1:1 승격·3대 도덕 성향·28인 네임드·전수 검수(14.5)·접근성 안정화(16.2) | [Stage 1~18.6](./docs/archive/ROADMAP_STAGE01_18_6.md) |
| **Stage 18.5 ~ 18.6** (Astro SSG 전환) | `[완료]` | Astro 7 + React 19 아일랜드 전환·개념 사전 48종·정적 코덱스 5섹션·1~16배속·경량 포매터 분리·Gate 8 번들 격리 | [Stage 1~18.6](./docs/archive/ROADMAP_STAGE01_18_6.md) |
| **Stage 19** (`19-S1/S2 · A~D · M1/M2`) | `[완료]` | 3대 계층 축(`socialTier/lifeRealm/bodyClass`)·Gate 4P·서약 격리/입단 심사/성간 출입 자격·네임드 스포트라이트 1인 원칙/재조우 접힘·전 파일 110KB 상한 통일·Vitest/typecheck 정착 | [Stage 19~23.5](./docs/archive/ROADMAP_STAGE19_23_5.md) |
| **Stage 20** (`20-A ~ 20-C`) | `[완료]` | `reqEvaluator.js`/QA 게이트 분리·M41 연표 병목 해소·`critSuccess`/`critFail` 극단 판정 활성화·4대 공백(중노년/무명 8행성/Tier 2~4/초점 3막) +44사건/+44연대기 보강 | [Stage 19~23.5](./docs/archive/ROADMAP_STAGE19_23_5.md) |
| **Stage 21 ~ 21.6** | `[완료]` | 이중 스탯 캡(`statCaps.js`)·23모성 특전·12선천 재능(4대 특이점)·12후천 특성(`removeTags`)·연대기 리밸런싱·접근성 핫픽스(21.5)·도전 마일스톤 & 인연 연작(21.6) | [Stage 19~23.5](./docs/archive/ROADMAP_STAGE19_23_5.md) |
| **Stage 22** (`22-A ~ 22-C`) | `[완료]` | 「표준 vs 그림다크(1 / QUADRILLION 하드코어)」 모드 분리·공략형 불운/부조리 사건 28종 + 그림다크 전용 연대기 30종·이중 모드 검증 | [Stage 19~23.5](./docs/archive/ROADMAP_STAGE19_23_5.md) |
| **Stage 23** (`23-A ~ 23-D`) | `[완료]` | `scripts/qa/careerGate.mjs` 분리·3대 테마 파일 2분할·100세+ 초장수 동적 작전 풀 14종(`centenarianOps.js`)·기존 핵심 사건 후천 특성/극단 판정 15건 확장 | [Stage 19~23.5](./docs/archive/ROADMAP_STAGE19_23_5.md) |
| **Stage 23.5** (`23.5-A ~ 23.5-E`) | `[완료]` | Stage 21~23 3인 감사 `P0`(11)·`P1`(8+5)·`P2`(3) 전량 해소·4대 동적 생성기/양 난이도 퍼징·페르소나 QA 봉쇄·독립 3인 재감사 전원 `PASS` + 나무위키 `오크 놉/메가놉` 정정(`c2aa3bc`) | [Stage 19~23.5](./docs/archive/ROADMAP_STAGE19_23_5.md) · [Audit](./docs/archive/AUDIT_STAGE21_23.md) |
| **Stage 24** (`24-A ~ 24-D`) | `[완료]` | `stateLifecycle.js` 10모듈 분리·4대 직교 축(`originClass`/`habitat`)·보이드본 출생 일원화·`resolveEventText` 변주·0~5세 영아기 차단/목격·계급별 운명 궤도/18세 성년 결단/의절 특권 회수·장수기 16종·Gate 4P 22페르소나+500조합 퍼저·강화 Gate 7E·보이드본/출신 교차 팩(+20사건/+34연대기)·독립 3인 감사 전원 `PASS` | [Stage 24](./docs/archive/ROADMAP_STAGE24.md) |

### 5.3 최신 완료 기준선 스냅샷 (Stage 24 마감 기준)
* **누적 코퍼스:** `WORLDS=23`, `ORIGINS=11`, `TRAITS=12`, `CAREERS=91 (+child)`, `CHAPTERS=9`, `CHARACTERS=28 (100% 커버)`, `TIMELINE=29`, `EVENTS=808 (역사 포함 837)`, `CHRONICLES=970`, `GLOSSARY=48`, `TAG_LABELS=228`, `WORLD_TAG_LABELS=49`, 엔진 **10모듈**(`maxEngine=65.7KB`, `createEngine.js=1,666줄`), 사건 **64파일**(`maxEv=87.0KB`), 연대기 **24파일**(`maxCh=45.0KB`), 장수기 동적 작전 **16종**, Vitest **30/30 PASS**.
* **최종 통합 검증 (`npm run verify && npm run qa:deep && npm run coverage`):** 전 항목 **0오류 · 0경고** (QA 6/7게이트, `Gate 4P` 22페르소나 × 2난이도 + 500조합 퍼저 `collisions=0, fuzzLeaks=0, minChroniclePool=9 >= 8`, `audit` 200생애 `standard=100, grimdark=100` 0결함 · `mortalOver300=0` · `maxSave=385.2KB <= 2048KB`, `qa:deep` 1,500 표준 + 300 그림다크 · `2,256 req` 도달성 · 120 승급 간선 0데드락 · 강화 Gate 7E `17 forceCareer / 4 closedVow / 54 variants` 0오류, Astro 9페이지 빌드 0경고 + Gate 8 번들 격리 0오류).
* **독립 3인 읽기 전용 최종 재감사:** `iv_lore_auditor` `PASS`(`P0/P1/P2=0`), `iv_prose_a11y_critic` `PASS`(`P0/P1/P2=0`), `iv_redteam_reviewer` `PASS`(`P0/P1=0`).

---

## 6. 차기 단계 진행 예정 계획 `[대기 · 사용자 확정 후 착수]`

> **운영 규약 (`AGENTS.md` 1장):** Stage 24까지 100% 완료·아카이브 이관이 마감되었다. 차기 Stage 25는 아래 Red-Team `[후순위 보류 후보]` 및 커버리지 매트릭스 공백 중 사용자 승인을 거쳐 본 절에 정식 단계 계획을 선기록한 뒤 착수한다.

### 6.1 Stage 24 레드팀 감리 도출 차기 정비·확장 후보 (`[후순위 보류 후보]`)
1. **QA·테스트 단일 파일 분할 정비:** `scripts/qa.mjs`(`2,710줄 / 141.3KB`)의 Stage 17~24 회귀 테스트를 `scripts/qa/regressionGate.mjs`로 분리하고, `tests/game-a11y.test.tsx`(`1,967줄 / 93.4KB`)도 도메인별 스위트로 분할해 유지보수 안전성을 높이는 선행 정비.
2. **UI 공용 타입 계약 확장:** `src/components/game/types.ts`에 `RollMeta` 및 공용 `LogEntry`·상태 요약 타입을 정밀화해 `RecentChronicleList.tsx` · `FullChronicleView.tsx`까지 컴파일 타임 계약을 확장.
3. **저밀도 상위 직군 · 배신자 중장년기 서사 밀도 보강:** `coverage-report.mjs` 하위 직군(`ecclesiarchy_cardinal`, `rt_seneschal`, `admin_departmento_head`, `guild_magnate`, `tempestus_prime_cmd`, `inquisition_interrogator` 등 `directEv=1~2`) 및 `renegade_marine` 70~99세 구간 전용 사건·연대기 확충으로 후반부 청취 리듬 균형화.


