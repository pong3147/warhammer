# 1 / QUADRILLION : IMPERIALIS VITA — 프로젝트 아키텍처 · 수록 현황 · 진행 보고서

> 본 문서는 프로젝트의 기획 의도, 디렉토리 구조, 파일별 콘텐츠 수록 현황, 게임 시스템·엔진 스키마 레퍼런스, 그리고 **서사 보강 로드맵 및 단계별 완료 보고서**를 기록하는 현황 기준 문서다.
> AI 에이전트가 준수해야 할 불변 규칙, 스크린 리더 접근성 원칙, 서사 보강 5대 작업 방향, 나무위키 번역명 기준표, 사실관계 고증 기준 및 QA 게이트는 [`AGENTS.md`](./AGENTS.md)를 정본으로 삼는다.

---

## 1. 프로젝트 개요 및 기획 의도

* **작품명:** `1 / QUADRILLION : IMPERIALIS VITA` (인류제국 생존 시뮬레이터)
* **장르:** 무작위 출생·생애 연대기 텍스트 시뮬레이션 웹 게임 (Unofficial Fan Project)
* **핵심 영감 및 설계 철학:**
  1. **《80억 분의 1》의 감상 경험 + 워해머 40k TRPG 메커니즘:** 무작위로 인류제국 100만 행성 중 한 곳에 태어나 흘러가는 생애 기록을 감상하되, 일자 진행에 그치지 않고 *Dark Heresy* / *Imperium Maledictum* 기반 **8대 특성치(d100 판정)**와 연간 **삶의 초점(Focus)** 관리로 숨겨진 분기·직군·역사 사건을 해금한다.
  2. **선택지 원툴 탈피 — 연대기 중심 몰입:** 선택지 분기 사건(432종, 역사 대사건 24종 포함)뿐 아니라, 인류제국 특유의 인간 경시·관료제 부조리·행성 풍토·계급별 일상을 담은 **패시브 연대기 로그(525종)**가 본인 상황에 정확히 맞춰 흘러가며 읽는 재미를 제공한다.
  3. **워해머 입문자 배려 + 설정 고증 조화:** 모든 선택지를 한꺼번에 늘어놓지 않고 우측 `자율 선택` 패널에 **지금 당장 가능한 선택지만** 정리해 노출한다. 성간 이동도 플레이어가 아무 행성이나 클릭해 순간이동하는 대신, 계급에 따라 상부의 강제 파견·전출 승인율·자율 함대 출항이 차등 적용된다.
  4. **IP 안전 원칙 (비공식 팬 창작물):** Games Workshop의 공식 아트워크·로고·룰북 원문 복사 없이 자체 작성한 한국어 산문과 순수 CSS/SVG 기하학 그래픽으로만 구성하며, 모든 데이터에 Lexicanum·공식 코덱스·소설 출처 표기를 병기한다.

---

## 2. 전체 디렉토리 구조 및 스크립트 로드 순서

```text
워해머/
├── index.html                        # 메인 SPA 문서 (4대 뷰 + 부고 모달 + 병렬 웹폰트 + 39개 스크립트)
├── styles.css                        # 고딕 데이터슬레이트 UI · 도감/조서 스타일 · 접근성 포커스 링
├── README.md                         # 사용자용 실행·배포·개요 안내서
├── AGENTS.md                         # AI 에이전트 작업 방향 · 불변 규칙 · 고증/표기 표준 · QA 게이트
├── PROJECT_GUIDE.md                  # (본 문서) 아키텍처 · 파일별 수록 현황 · 스키마 · 진행 보고서
├── scripts/
│   ├── qa.js                         # Node.js 전용 상설 자동 QA 검증 스위트 (6대 게이트 + 고아/용량 감시)
│   └── sync-scripts.js               # data/events/** · data/chronicles/** 자동 스캔 -> index.html 동기화
├── js/
│   ├── engine.js                     # 핵심 시뮬레이션 엔진 (window.ImperiumEngine, Map·파티션 최적화)
│   └── ui.js                         # DOM 렌더링·자동저장·접근성·텍스트 내보내기·코덱스·영혼의 전당 도감
└── data/
    ├── worlds.js                     # 5대 세그멘툼 + 22개 행성 (네임드 15 + 일반/보이드본 7)
    ├── origins.js                    # 출생 신분 10종 + 선천 자질 8종 + 이름 생성 풀
    ├── careers.js                    # 28개 직군 (child + 선택 병종 27종)
    ├── chapters.js                   # 스페이스 마린 9대 유명 챕터 데이터
    ├── characters.js                 # 20인 네임드 인물 프로필 (스포트라이트 + 코덱스용)
    ├── timeline.js                   # M41~M42 실제 역사 대사건 24종 + 은하/성역 원격 속보
    ├── tags.js                       # TAG_LABELS(128종) + WORLD_TAG_LABELS(46종) 한글 라벨 사전
    ├── events/                       # 분기 사건 408종 — 도메인(세력·챕터·권역·주제)별 21개 파일
    │   ├── careers/                  # 직군 계열·1:1 승격 9파일 (astartes, civil_void, ecclesiarchy, guardsman, inquisition, mechanicus, militarum, rogue_trader, talons_knights)
    │   ├── chapters/                 # 챕터별 1파일 (chapters_core; 14단계에서 9대 챕터 1:1 승격 예정)
    │   ├── worlds/                   # 행성 권역별 4파일 (solar, ultima, frontier, generic; 13단계에서 핵심 행성 1:1 승격 예정)
    │   └── themes/                   # 횡단 주제별 7파일 (arcs_focus, chaos_warp, crises, eras, lifecycle, named, xenos)
    └── chronicles/                   # 일상 연대기 525종 — 주제별 9개 파일 (향후 하위 폴더 승격 지원)
        ├── arcs_named.js             # 네임드 20인 · 명예/이력 태그 회수 (56종)
        ├── careers.js                # 27개 직군 · 계급 기본 일상 (101종)
        ├── careers_specialists.js    # 6대 연대 · 아스타르테스 4대 직책 · 승격 태그 · 얇은 직군 심화 (40종)
        ├── chapters.js               # 9대 챕터 · 숙원/공조 (33종)
        ├── childhood.js              # 유아(1~5세)·아동(6~13세) 22행성 성장 일상 (105종)
        ├── eras.js                   # M41~M42 시대 · 대균열 · 니힐루스 · 베테랑 (23종)
        ├── general.js                # 제국 부조리 · 삶의 초점 · 자질/혈통 · 외계/배신자/오염 (70종)
        ├── lifecycle.js              # 초년·노년·리주버냇·기계화·초장수·인연/가족 (18종)
        └── worlds.js                 # 22개 행성 풍토·생활상 (79종)
```

**`index.html` 스크립트 로드 순서 (반드시 유지):**
1. `worlds.js` -> `origins.js` -> `careers.js` -> `chapters.js` -> `characters.js` -> `timeline.js` -> `tags.js`
2. `data/events/**/*.js` (21개 파일, 순서 독립적 자기 등록 `EVENTS.push(...)`, `<!-- DATA-EVENTS:START/END -->` 마커 자동 동기화)
3. `data/chronicles/**/*.js` (9개 파일, 순서 독립적 자기 등록 `CHRONICLES.push(...)`, `<!-- DATA-CHRONICLES:START/END -->` 마커 자동 동기화)
4. `js/engine.js` -> `js/ui.js`

---

## 3. 파일별 역할 및 현재 수록 현황

### 3.1 프론트엔드 코어 · 자동화 스크립트
* **`index.html` (~396줄):**
  * Google Fonts(`Cinzel`, `Noto Serif KR`, `JetBrains Mono`) `<link rel="preconnect">` 병렬 로드 (`display=swap`).
  * 4개 메인 탭 뷰: `view-game`(생애 시뮬레이션 + `#resume-banner` 이어하기 배너 + 편의 토글 3종), `view-chronicle`(전체 인생 기록서 + 텍스트 복사/`.txt` 저장), `view-codex`(제국 코덱스 5개 탭), `view-hall`(영혼의 전당 + 도감 수집 현황 및 미수집 힌트).
  * 3단 플레이 대시보드, 사망 부고 모달(`#obit-backdrop`, `role="dialog"`, 배경 `inert` + `Tab` 트랩 + 부고 복사), 단일 라이브 영역(`#sr-live`), 자동 동기화 마커(`DATA-EVENTS` · `DATA-CHRONICLES`, 총 39개 `<script>`).
* **`styles.css` (~1,667줄):**
  * 황동·검정·진홍·코지테이터 녹색의 제국 데이터슬레이트 테마, `.sr-only`, 고대비 금색 `:focus-visible` 포커스 링, 네임드 스포트라이트 펼침 애니메이션(`prefers-reduced-motion` 존중), 이어하기 배너·영혼의 전당 도감/조서 스타일, 1200px/820px 반응형 그리드.
* **`js/engine.js` (~2,685줄):**
  * **메타 상수 & O(1) 인덱스:** `STAT_META`(8대 특성치), `FOCUSES`(6대 연간 초점), `ERA_PRESETS`(7개 시대), `data/tags.js` 연동 `TAG_LABELS`(128종) · `WORLD_TAG_LABELS`(46종), 8종 `Map` 인덱스 및 `EVENTS`/`CHRONICLES` 무손실 파티션 버킷(`byChapter`/`byWorld`/`byCareer`/`general`).
  * **조건·판정·동기화 엔진:** `checkReq(state, req, ctx)`(`excludeChapters` 포함) / `describeReq(req)`(전 조건 키·복합 `or` 한글화) / `syncImperialNihilus(state)` / `rollD100(state, check)` / `evaluateLifeGrade(state)`(아스타르테스 4대 전문 직책 포함 맞춤 부고 19종 + 범용 4종 + 동적 추모 에필로그).
  * **분기 진행 파이프라인 (`advanceQuarter`):**
    1. 분기 증가(1 -> 2 -> 3 -> 새해 1; 선택형 `fastChildhood` 시 0~12세 연 1분기). 새해 정산 시 14세 자동 직무 편입, 18세 `schola` 졸업 자동 배치 폴백, 초점+직군 스탯 성장, 하이브리드 체력 회복·비선형 노화, 환경 위험 판정.
    2. 아스타르테스 중상(생명력 38 이하) 시 드레드노트 안치(`EVENT_BY_ID` O(1)) 긴급 발동 및 사망/오염 100 체크.
    3. **1순위:** `TIMELINE` 역사 대사건 직접 체험 및 원격 아스트로패스 속보(`heardNews`) 전파.
    4. **2순위:** `EVENTS` 확률 선판정(28~34%) 후 파티션 버킷 기반 동적 분기 사건 발동(생애 최대 2회 상한 + 최근 14개 방지 + 챕터/네임드 3.0배 · 행성/직군/시기 2.6배 우대).
    5. **2.5순위:** `createDynamicTransitEvent` 계급별 강제 파견/배치 선택/순례선 이벤트(워프 항해 이상 변주 포함).
    6. **3순위:** `applyChronicle` 파티션 버킷 기반 일상·부조리 연대기 로그 출력(최근 28개 방지, `MAX_LOGS = 2,400`건 스마트 보존).
  * **자율 행동 & 이동:** `getCareerAction(state)`(27개 선택 직군별 고유 행동, 4년 재사용), `canUsePenance`/`canUseAugmetics`/`canUseRejuvenat`, `getTravelProfile`/`evaluateTravelAttempt`/`getTravelCandidateWorlds`, `getContextualOptions`(단일 패스 `unlockedCareers`/`lockedCareers` 반환).
* **`js/ui.js` (~1,681줄):**
  * 100ms 틱 진행 바, `announce()` 타이머 안전 비가시 공백 교차 알림, `#focus-grid`/`#sel-travel-world` 포커스 보존 부분 갱신, 이벤트 위임(`#active-event-wrap`·`#auto-*`) 및 `#all-careers-preview` 지연 렌더링, 부고 모달 `inert`·포커스 트랩·복원.
  * `localStorage` 3중 저장: `imperium_vita_active_v1`(진행 중 생애 자동 저장·이어하기), `imperium_vita_prefs_v1`(알림·유년기 빠른 진행·새 진로 해금 알림/일시정지), `imperium_vita_hall_v1`(영혼의 전당 최대 60생애 + 도감 수집률·미수집 힌트·상세 조서).
  * 순수 텍스트 생애 기록서 복사(클립보드 + `file://` 폴백) 및 `.txt` 파일 저장.
* **`scripts/sync-scripts.js` (~101줄, Node.js 전용):**
  * `data/events/**` 및 `data/chronicles/**`의 `.js` 파일을 재귀 스캔·정렬해 `index.html`의 마커 구간을 자동 동기화(`--check` 검사 모드 지원). 향후 신규 직군/행성/챕터 1:1 승격 파일 및 외계 종족 스타팅 폴더 추가 시 자동 반영.
* **`scripts/qa.js` (~553줄, Node.js 전용):**
  * `node scripts/qa.js` 단일 명령으로 `AGENTS.md` 6대 게이트(스크립트·로드 순서·고아 파일 탐지·구문·파일 용량 상한 경고·CSS·DOM `#id`·표기/기호/크리그·출처별 ID 충돌/참조/태그/`describeReq`/연표/`forceCareer`·소프트락/유년기 풀/중복률/로그 보존·300생애 멀티-초점 시뮬레이션·1,000분기 벤치마크)를 일괄 검증.

### 3.2 데이터 파일별 수록 내용
| 파일 | 건수 | 수록 내용 요약 |
| --- | --- | --- |
| `data/worlds.js` | 5성역 · 22행성 | **네임드 15:** `terra`, `mars`, `cadia`(999 파괴), `krieg`, `armageddon`, `necromunda`, `macragge`, `baal`(니힐루스), `fenris`, `catachan`, `vostroya`, `valhalla`, `tanith`(765 파괴), `nocturne`, `ophelia7`. **일반 7:** `generic_hive`, `generic_agri`, `generic_civilised`, `generic_forge`, `generic_feral`, `generic_paradise`, `voidborn`. |
| `data/origins.js` | 신분 10 · 자질 8 | 하층민, 일반 시민, 군인 가문, 스콜라 프로제니움, 기계교 도제, 국교 수련생, 행성 귀족, 로그 트레이더 방계, 나비스 노빌리테, 테라 고위 귀족 영아(테라 한정). 행성 정합성 필터(`excludeWorlds`/`excludeWorldTags`) 적용. 자질 8종. |
| `data/careers.js` | 28직군 | `child` + 선택 27종: 노동자, 갱단, PDF, 가드맨, 장교, 사이온, 커미사르, 로드 커미사르, 소로리타스, 캐노네스, 아스타르테스(네오파이트/배틀 브라더/중대장), 그레이 나이트, 쿠스토데스, 어콜라이트, 이단심문관, 스키타리, 테크프리스트, 아크마고스, 네이비, 아르비테스, 아드미니스트라툼, 에클레시아키, 로그 트레이더, 생션드 사이커, 카오스 컬티스트. |
| `data/chapters.js` | 9챕터 | `ultramarines`, `blood_angels`, `space_wolves`, `dark_angels`, `imperial_fists`, `salamanders`, `black_templars`(`allowPsyker: false`), `raven_guard`, `white_scars`. |
| `data/characters.js` | 20인물 | `guilliman`, `yarrick`, `creed`, `gaunt`, `cain`, `dante`, `cawl`, `grimnar`, `calgar`, `celestine`, `eisenhorn`, `marbo`, `valoris`, `tushan`, `ghazghkull`, `abaddon`, `lion`, `amberley_vail`, `grimaldus`, `azrael`. |
| `data/timeline.js` | 24대사건 | 아이젠혼 스카루스(240), 콜룸누스 위어드와아아!(260), 트라시안 프리마리스·말레우스(345), 마카리우스 대성전(392), 다모클레스 만 성전(742), 1차 타이라니드·마크라그 전투(745), 사바트 성전(755), 타니스 멸망(765), 브락스 공성전(813), 바답 전쟁(901), 케인·발할라 597연대(931), 2차 아마겟돈(941), 2차 타이라니드·크라켄(992), 3차 아마겟돈(998), 카디아 붕괴(999), 대균열(999), 바알의 파괴(999), 사자의 문(000.M42), 인도미투스 성전(001.M42), 비질루스(008.M42), 사이킥 각성(012.M42), 파리아 넥서스(016.M42), 징조의 방주·라이온 귀환(020.M42), 4차 타이라니드 전쟁(028.M42). |
| `data/tags.js` | 태그 128 · 행성태그 46 | 이력·신분·자질·직군·명예·직책·인연 한글 라벨 사전(`TAG_LABELS`) 및 `describeReq`용 행성 유형 라벨 사전(`WORLD_TAG_LABELS`). |
| `data/events/careers/*.js` | 9파일 · 155사건 | `guardsman`(15: 6대 연대 특화 + 일반 보병), `militarum`(23), `astartes`(24: 4대 전문 직책 포함), `talons_knights`(15), `inquisition`(16), `mechanicus`(16), `ecclesiarchy`(13), `rogue_trader`(8), `civil_void`(25). |
| `data/events/chapters/*.js` | 1파일 · 31사건 | `chapters_core`(31) — 9대 챕터 고유(20)·챕터 숙원/공조(4)·챕터 명예 태그 아크(7). |
| `data/events/worlds/*.js` | 4파일 · 50사건 | `solar`(15: 테라·화성·아마겟돈·네크로문다), `ultima`(10: 마크라그·바알·카타찬·발할라·녹턴), `frontier`(11: 카디아·펜리스·보스트로야·크리그·오펠리아·타니스), `generic`(14: 무명 6행성·보이드본·행성 유형 공용). |
| `data/events/themes/*.js` | 7파일 · 172사건 | `lifecycle`(33: 유년·초년·노년·초장수·인연/가족), `named`(23: 네임드 20인 조우 & 후일담), `eras`(20: 시기×장소·대균열·니힐루스), `xenos`(16: 외계 종족), `chaos_warp`(22: 4대 신·컬티스트·배신자·워프/사이커), `arcs_focus`(34: 삶의 초점 1·2막·명예 태그·출신/자질), `crises`(24: 전선·환경·비전투 치명 위기). |
| `data/chronicles/*.js` | 9파일 · 525연대기 | `childhood`(105), `careers`(101), `careers_specialists`(40), `worlds`(79), `general`(70), `arcs_named`(56), `chapters`(33), `eras`(23), `lifecycle`(18) — 전체 525종 상황 맞춤형 일상·부조리 연대기. |


---

## 4. 핵심 게임 시스템 규격 및 엔진 스키마 레퍼런스

### 4.1 계급별 이동 · 특수 시술 · 원격 속보 규격
* **강제 파견/이동 3단계 위계:** 하급 의무 직군(`astra_militarum`, `skitarii`, `astartes_scout`, `tempestus_scion`, `inquisition_acolyte`, `sanctioned_psyker`)은 거부권 없는 강제 파견, 중간 계급은 2개 작전 구역 택1+잔류, 최고위 지휘권자(`inquisitor`, `rogue_trader`, `astartes_captain`, `archmagos`, `lord_commissar`, `canoness`, `adeptus_custodes`)는 자율 원정 결정 및 100% 즉시 출항(`custodes`는 캡틴-제너럴 칙령 85%).
* **기계교 의체 개조:** 기계교 소속은 16세+(무료, 8년 간격), 비기계교는 18세+·고위 계급(Tier 3+, 권위 42+) 또는 귀족(권위 55+) 또는 부상 재활 여건 필요. 크리그 일반 병사 및 야만 행성 하급민(Tier 3 미만) 금지.
* **리주버냇 수명 연장:** 50세+·고위 계급(Tier 3+)/귀족·권위 50+, 아스타르테스/쿠스토데스 불필요.
* **성당 정화 고행:** 14세+·비야만 행성·비이단자·오염 1+·재사용 3년.
* **은하·성역 원격 속보:** 타 행성 체류 중에도 제국 전역(`galaxy`) 또는 같은 성역(`sector`)의 대형 역사 사건이 발생하면 아스트로패스 속보(`heardNews`)가 연대기에 수신됨(야만 행성 제외).

### 4.2 `checkReq(state, req)` 지원 조건 키
`minAge`, `maxAge`, `minYear`, `maxYear`, `gender` (`"male"`/`"female"`), `stats` (`{ WS, BS, T, Ag, Int, WP, Fel, Inf }`), `minFaith`, `maxFaith`, `minCorruption`, `maxCorruption`, `minWounds`, `maxWounds`, `allTags`, `anyTags`, `excludeTags`, `anyCareers`, `anyChapters`, `anyWorlds`, `anyHomeWorlds`, `excludeWorlds`, `anyWorldTags`, `excludeWorldTags`, `anySegmenta`, `anyFocus`, `greatRift` (`true`/`false`), `or` (재귀 배열).

### 4.3 `applyOutcome(state, outcome)` 지원 효과 키
`text`, `stats`, `wounds`, `woundsBonus`, `faith`, `corruption`, `corruptionReset`, `lifeBonusExtra` (또는 `extraLifeBonus`), `addTags` (`met_<charId>` 자동 `metCharacters` 등록), `moveWorld`, `warpYearShift` (생물학적 연령 유지한 워프 시간 도약), `forceCareer`, `chooseChapter`, `instantDeath` (사망 사유 문자열).

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

## 9. 5차 인류제국 대확장 로드맵 (12~16단계) 및 단계별 진행 보고서

> **목표:** 11단계 계층형 데이터 구조와 1:1 단독 파일 승격 체계를 활용해, 인류제국의 기존 27개 직군 · 네임드 15행성 · 9대 챕터 · 초인 장수기 · 신규 4대 상징 세력 · M41~M42 역사 연표 및 네임드 인물 밀도를 전면 확충한다.
> **확정 설계 결정 (사용자 승인 — 추천안 A 일괄 채택):**
> 1. **아스타르테스 4대 전문 직책(12단계):** `astartes_brother` 유지 상태에서 전용 임명 분기 및 태그(`role_chaplain`, `role_apothecary`, `role_techmarine`, `role_librarian` — 블랙 템플러 라이브러리안 차단)로 확장.
> 2. **임페리얼 나이트 출생 행성(15단계):** 신규 기사 행성 `generic_knight` 추가(총 22 -> 23행성) + 유년기 연대기 6종+ 동시 확보.
> 3. **리빙 세인트(15단계):** 5티어 전설 선택 직군 `living_saint` 추가(신규 4직군: `navis_navigator`, `officio_assassinorum`, `imperial_knight`, `living_saint` -> 총 31개 선택 직군).
> 4. **1:1 파일 승격 & GitHub 단계별 보고:** 15~20건 이상 커지는 직군·행성·챕터는 즉시 단독 파일로 승격하며, 매 단계 완료 시 본 문서 갱신 + QA 6대 게이트 0오류 통과 후 GitHub(`origin/main`)에 즉시 커밋·푸시한다.

### 전체 진행 현황 요약

| 단계 | 구분 | 상태 | 완성도 | 핵심 목표 및 실적/예정 규모 |
| --- | --- | --- | --- | --- |
| **12단계 (5차 1단계)** | 기존 27개 직군 전면 심화 · 아스타르테스 4대 직책 · 가드맨 연대 특화 | `[완료]` | 100% (목표 +54 초과 달성: **+64사건 · +40연대기 · +12태그 · QA 0오류**) | 얇은 직군 14종 집중 보강, 가드맨 6대 연대 특화(`guardsman.js` 1:1 승격), `rogue_trader.js` 단독 승격, 아스타르테스 4대 직책 분화 + 맞춤 부고 4종 |
| **13단계 (5차 2단계)** | 네임드 15행성 & 파견 전용 연작 대확장 | `[예정]` | 0% | 테라 외 14개 네임드 행성 최소 5~7건+ 보강, 핵심 행성(`terra`/`cadia`/`krieg`/`armageddon`) 1:1 승격, 파견(`anyWorlds`) 체감 극대화 (`+48사건 · +45연대기`) |
| **14단계 (5차 3단계)** | 9대 챕터 1:1 승격 · 초인 장수기 · 카오스 4대 신 엔드게임 | `[예정]` | 0% | 9대 챕터별 단독 파일 승격 + 다단계 아크(각 7~8건+), 150~500세 초장수기 연작, 카오스 4대 신 투사 엔드게임 (`+45사건 · +36연대기`) |
| **15단계 (5차 4단계)** | 인류제국 신규 4대 세력/직군 & 기사 행성 추가 | `[예정]` | 0% | `navis_navigator`, `officio_assassinorum`(4대 클레이드), `imperial_knight`(+`generic_knight` 행성), `living_saint` 추가 + 엔진 행동/이동/부고 & 도감 동적화 (`+4직군 · +1행성 · +36사건 · +32연대기`) |
| **16단계 (5차 5단계)** | M41~M42 핵심 역사 5종 · 신규 네임드 8인 · 시대 프리셋 2종 | `[예정]` | 0% | 고딕 전쟁·1차 아마겟돈(수치의 달들)·3차 타이라니드·옥타리우스·역병 전쟁 추가, 네임드 8인(28인 체제) 단독 조우·후일담 완비, 시대 프리셋 2종 (`+5역사 · +8인물 · +24사건 · +28연대기`) |

* **5차 인류제국 대확장 전체 누적 완성도:** `1 / 5 단계 완료 (20% · 12단계 완료, 잔여: 13~16단계)`

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

### 다음 작업 대기열 (Next Up — 13단계 착수 예정)
* **다음 목표 (13단계: 네임드 15행성 & 파견 전용 연작 대확장 · `+48사건 · +45연대기`):**
  1. **핵심 상징 행성 1:1 단독 파일 승격:** `data/events/worlds/` 아래 `terra.js`(12건), `cadia.js`(6건+, `maxYear: 999` 엄수), `krieg.js`(7건+, 비타-움 정합성 엄수), `armageddon.js`(7건+) 단독 승격.
  2. **소외 네임드 행성 집중 보강 (`solar.js`, `ultima.js`, `frontier.js`):** `valhalla`(+5), `tanith`(+4, `maxYear: 764` 엄수), `vostroya`(+4), `ophelia7`(+4), `necromunda`(+4), `mars`/`macragge`/`baal`/`catachan`/`nocturne`/`fenris`(각 +3)로 전 15개 네임드 행성 파견(`anyWorlds`) 체감 극대화.
  3. **행성 파견·생활 연대기 +45종 보강:** `data/chronicles/worlds.js` 또는 `data/chronicles/worlds/` 권역 분할 승격으로 전 행성 일상 밀도 확충.
  4. `sync-scripts.js` · `qa.js` 6대 게이트 0오류 + 신규 전 항목 도달 가능성 검증 → 본 문서 13단계 `[완료]` 갱신 및 GitHub 푸시.



