# 1 / QUADRILLION : IMPERIALIS VITA — 프로젝트 아키텍처 · 수록 현황 · 진행 보고서

> 본 문서는 프로젝트의 기획 의도, 디렉토리 구조, 파일별 콘텐츠 수록 현황, 게임 시스템·엔진 스키마 레퍼런스, 그리고 **서사 보강 로드맵 및 단계별 완료 보고서**를 기록하는 현황 기준 문서다.
> AI 에이전트가 준수해야 할 불변 규칙, 스크린 리더 접근성 원칙, 서사 보강 5대 작업 방향, 나무위키 번역명 기준표, 사실관계 고증 기준 및 QA 게이트는 [`AGENTS.md`](./AGENTS.md)를 정본으로 삼는다.

---

## 1. 프로젝트 개요 및 기획 의도

* **작품명:** `1 / QUADRILLION : IMPERIALIS VITA` (인류제국 생존 시뮬레이터)
* **장르:** 무작위 출생·생애 연대기 텍스트 시뮬레이션 웹 게임 (Unofficial Fan Project)
* **핵심 영감 및 설계 철학:**
  1. **《80억 분의 1》의 감상 경험 + 워해머 40k TRPG 메커니즘:** 무작위로 인류제국 100만 행성 중 한 곳에 태어나 흘러가는 생애 기록을 감상하되, 일자 진행에 그치지 않고 *Dark Heresy* / *Imperium Maledictum* 기반 **8대 특성치(d100 판정)**와 연간 **삶의 초점(Focus)** 관리로 숨겨진 분기·직군·역사 사건을 해금한다.
  2. **선택지 원툴 탈피 — 연대기 중심 몰입:** 선택지 분기 사건(630종, 역사 대사건 24종 포함)뿐 아니라, 인류제국 특유의 인간 경시·관료제 부조리·행성 풍토·계급별·3대 도덕 성향(`자비·교조·암흑`) 일상을 담은 **패시브 연대기 로그(700종)**가 본인 상황에 정확히 맞춰 흘러가며 읽는 재미를 제공한다.
  3. **워해머 입문자 배려 + 설정 고증 조화:** 17개 세력 **78종 풀 계급도**를 모두 늘어놓는 대신, 우측 `자율 선택` 패널에는 **지금 즉시 진입 가능한 일반 직군(`entryMode: "open"`)**만 노출하고, 상위 계급·공훈 횡단(행성 총독/로그 트레이더/심문관)·최고위 추대(하이 로드/워마스터/챕터 마스터/데몬 프린스)는 조건 달성 시 **동적 발탁·임명 이벤트**로 자연스럽게 제안한다. 성간 이동도 계급의 `transitTier`에 따라 강제 파견·전출 승인율·자율 함대 출항이 차등 적용된다.
  4. **IP 안전 원칙 (비공식 팬 창작물):** Games Workshop의 공식 아트워크·로고·룰북 원문 복사 없이 자체 작성한 한국어 산문과 순수 CSS/SVG 기하학 그래픽으로만 구성하며, 모든 데이터에 Lexicanum·공식 코덱스·소설 출처 표기를 병기한다.

---

## 2. 전체 디렉토리 구조 및 스크립트 로드 순서

```text
워해머/
├── index.html                        # 메인 SPA 문서 (4대 뷰 + 부고 모달 + 병렬 웹폰트 + 63개 스크립트)
├── styles.css                        # 고딕 데이터슬레이트 UI · 3대 성향 게이지 · 17개 세력 계급도/도감/조서 · 접근성 포커스 링
├── README.md                         # 사용자용 실행·배포·개요 안내서
├── AGENTS.md                         # AI 에이전트 작업 방향 · 불변 규칙 · 고증/표기 표준 · QA 게이트
├── PROJECT_GUIDE.md                  # (본 문서) 아키텍처 · 파일별 수록 현황 · 스키마 · 진행 보고서
├── scripts/
│   ├── qa.js                         # Node.js 전용 상설 자동 QA 검증 스위트 (6대 게이트 + --deep 심층 감사)
│   ├── audit-health.js               # 200생애 무작위 플레이·세이브 왕복 퍼징 · 초장수 탈출성 · UI 접근성 정적 헬스 감사
│   └── sync-scripts.js               # data/events/** · data/chronicles/** 자동 스캔 -> index.html 동기화
├── js/
│   ├── engine.js                     # 핵심 시뮬레이션 엔진 (window.ImperiumEngine, 3대 성향·동적 진로 오퍼·데이터 주도화)
│   └── ui.js                         # DOM 렌더링·자동저장·접근성·전 패널 포커스 보존·텍스트/백업 내보내기·영혼의 전당 도감
└── data/
    ├── worlds.js                     # 5대 세그멘툼 + 22개 행성 (네임드 15 + 일반/보이드본 7)
    ├── origins.js                    # 출생 신분 10종 + 선천 자질 8종 + 이름 생성 풀
    ├── careers.js                    # 79개 직군 (child + 17개 세력 선택 직군 78종, 하이 로드 10석 · 성향 우대 지름길 포함)
    ├── chapters.js                   # 스페이스 마린 9대 유명 챕터 데이터
    ├── characters.js                 # 20인 네임드 인물 프로필 (스포트라이트 + 코덱스용)
    ├── timeline.js                   # M41~M42 실제 역사 대사건 24종 + 은하/성역 원격 속보
    ├── tags.js                       # TAG_LABELS(170종) + WORLD_TAG_LABELS(46종) 한글 라벨 사전
    ├── events/                       # 분기 사건 606종 — 도메인(세력·챕터·권역·주제)별 41개 파일
    │   ├── careers/                  # 직군 계열·1:1 승격 14파일 (astartes, chaos_ranks, civil_void, ecclesiarchy, governor, guardsman, high_lords, inquisition, mechanicus, militarum, militarum_ranks, rogue_trader, talons_knights, transhuman_faith_ranks)
    │   ├── chapters/                 # 9대 챕터 1:1 승격 9파일 + 합동 공조 1파일 = 10파일 (ultramarines, blood_angels, space_wolves, dark_angels, imperial_fists, salamanders, black_templars, raven_guard, white_scars, chapters_core)
    │   ├── worlds/                   # 행성 1:1 승격 4파일 + 권역 4파일 = 8파일 (armageddon, cadia, frontier, generic, krieg, solar, terra, ultima)
    │   └── themes/                   # 횡단 주제별 9파일 (alignment, arcs_focus, chaos_warp, crises, eras, lifecycle, longevity, named, xenos)
    └── chronicles/                   # 일상 연대기 700종 — 주제별 13개 파일 (향후 하위 폴더 승격 지원)
        ├── alignment.js              # 3대 도덕 성향(자비·교조·암흑) · 세속적 악인 · 정점 태그 3종 회수 (27종)
        ├── arcs_named.js             # 네임드 20인 · 명예/이력 태그 회수 (56종)
        ├── careers.js                # 17개 세력 · 78종 직군 · 계급/최고위 기본 일상 (105종)
        ├── careers_ranks.js          # 전 계급 대비(anyPastCareers) 18종 · 하이 로드 10석/계급별·특수 혈통 43종 (61종)
        ├── careers_specialists.js    # 6대 연대 · 아스타르테스 4대 직책 · 승격 태그 · 얇은 직군 심화 (40종)
        ├── chaos_endgame.js          # 카오스 4대 신 상위 낙인 · 배신자 군단 장구한 전쟁 · 데몬 프린스 (10종)
        ├── chapters.js               # 9대 챕터 · 숙원/공조 심화 (51종)
        ├── childhood.js              # 유아(1~5세)·아동(6~13세) 22행성 성장 일상 (105종)
        ├── eras.js                   # M41~M42 시대 · 대균열 · 니힐루스 · 베테랑 (23종)
        ├── general.js                # 제국 부조리 · 삶의 초점 · 자질/혈통 · 외계/배신자/오염 (70종)
        ├── lifecycle.js              # 초년·노년·리주버냇·기계화·초장수·드레드노트·인연/가족 (28종)
        ├── worlds.js                 # 22개 행성 기본 풍토·생활상 (79종)
        └── worlds_dispatch.js        # 네임드 15행성 파견·풍토·시대 심화 일상 (45종)
```

**`index.html` 스크립트 로드 순서 (반드시 유지):**
1. `worlds.js` -> `origins.js` -> `careers.js` -> `chapters.js` -> `characters.js` -> `timeline.js` -> `tags.js`
2. `data/events/**/*.js` (41개 파일, 순서 독립적 자기 등록 `EVENTS.push(...)`, `<!-- DATA-EVENTS:START/END -->` 마커 자동 동기화)
3. `data/chronicles/**/*.js` (13개 파일, 순서 독립적 자기 등록 `CHRONICLES.push(...)`, `<!-- DATA-CHRONICLES:START/END -->` 마커 자동 동기화)
4. `js/engine.js` -> `js/ui.js`

---

## 3. 파일별 역할 및 현재 수록 현황

### 3.1 프론트엔드 코어 · 자동화 스크립트
* **`index.html` (~443줄):**
  * Google Fonts(`Cinzel`, `Noto Serif KR`, `JetBrains Mono`) `<link rel="preconnect">` 병렬 로드 (`display=swap`).
  * 4개 메인 탭 뷰: `view-game`(생애 시뮬레이션 + `#resume-banner` 이어하기 배너 + `#btn-status-summary` 상태 요약 듣기 + `#btn-fast-forward` 다음 사건까지 진행 + 좌측 3대 도덕 성향 게이지 + 편의 토글 3종), `view-chronicle`(전체 인생 기록서 + 텍스트 복사/`.txt` 저장), `view-codex`(제국 코덱스 5개 탭, 17개 세력 계급도 아코디언), `view-hall`(영혼의 전당 + `.json` 저장본 백업 내보내기/불러오기 + 2단계 초기화 확인 + `careerHistory` 누적 도감 수집 현황 및 미수집 힌트).
  * 3단 플레이 대시보드(`#start-heading`/`#heading-auto` 포커스 폴백 포함), 사망 부고 모달(`#obit-backdrop`, `role="dialog"`, 배경 `inert` + `Tab` 트랩 + 부고 복사), 단일 라이브 영역(`#sr-live`), 자동 동기화 마커(`DATA-EVENTS` · `DATA-CHRONICLES`, 총 63개 `<script>`).
* **`styles.css` (~1,791줄):**
  * 황동·검정·진홍·코지테이터 녹색의 제국 데이터슬레이트 테마, `.sr-only`, 고대비 금색 `:focus-visible` 포커스 링, 3대 도덕 성향 3분할 비율 막대(`.align-tri-bar`)·사건 성향 배지(`.ev-badge.align-*`), 네임드 스포트라이트 펼침 애니메이션(`prefers-reduced-motion` 존중), `.ready-offer-box` 발탁 대기 배너 · `.career-tree-group`/`.codex-tree-group` 17개 세력 아코디언 · `.header-btn-group` · 이어하기 배너 · 영혼의 전당 도감/조서 스타일, 1200px/820px 반응형 그리드.
* **`js/engine.js` (~3,674줄):**
  * **메타 상수 & O(1) 인덱스:** `SAVE_VERSION = 3`, `ALIGNMENT_KEYS`·`ALIGNMENT_META`(3대 도덕 성향 `humane` 자비 / `dogmatic` 교조 / `ruthless` 암흑), `STAT_META`(8대 특성치), `FOCUSES`(6대 연간 초점), `ERA_PRESETS`(7개 시대), `data/tags.js` 연동 `TAG_LABELS`(170종) · `WORLD_TAG_LABELS`(46종), 8종 `Map` 인덱스 및 `EVENTS`/`CHRONICLES` 무손실 파티션 버킷(`byChapter`/`byWorld`/`byCareer`/`general`), `warnUnknownId` 미등록 커스텀 ID 개발 경고, `migrateState(raw)` 구세이브 마이그레이션(성향 자동 초기화 포함).
  * **조건·판정·동기화 엔진:** `checkReq(state, req, ctx)`(`minAlign`, `maxAlign`, `anyDominantAlign`, `excludeChapters`, `anyPastCareers`, `excludePastCareers`, `excludeHomeWorlds` 포함) / `describeReq(req)`(전 조건 키·복합 `or` 한글화) / `getAlignmentInfo(state)`(3단계 칭호·동점 `갈등하는 신념` 판별) / `syncImperialNihilus(state)` / `rollD100(state, check)` / `evaluateLifeGrade(state)`(최상위 맞춤 부고 27종+ 및 인연·네임드·3대 도덕 성향 결합 동적 추모 에필로그, 쿠스토데스·그레이 나이트 비밀 수호자 예외 포함).
  * **분기 진행 파이프라인 (`advanceQuarter`):**
    1. 분기 증가(1 -> 2 -> 3 -> 새해 1; 선택형 `fastChildhood` 시 0~12세 연 1분기). 새해 정산 시 14세 자동 직무 편입, 18세 `schola` 졸업 자동 배치 폴백, 초점+직군 스탯 성장(12세 미만 `forbidden` 오염 상한 `+2/년` · 이단자 고오염 구간 자동 감쇠 · 쿠스토데스/그레이 나이트 양(+) 오염 전면 면역), 하이브리드 체력 회복·비선형 노화, 환경 위험 판정.
    2. 아스타르테스 중상(생명력 38 이하) 시 드레드노트 안치(`EVENT_BY_ID` O(1)) 긴급 발동 및 사망/오염 100 체크(데몬 프린스·쿠스토데스·그레이 나이트 스폰화 사망 면역).
    3. **1순위:** `TIMELINE` 역사 대사건 직접 체험 및 원격 아스트로패스 속보(`heardNews`) 전파.
    4. **1.5순위:** `createDynamicCareerOfferEvent` 동적 승급·공훈 횡단·최고위 추대·초인 소환·카오스 유혹 제안 이벤트(성향 일치 진로 가중치 우대, `humane`/`dogmatic` 주성향의 암흑가 두목·거두 오퍼 차단, 거절 8년 / Tier 6 시련 실패 16년 쿨다운).
    5. **2순위:** `EVENTS` 확률 선판정(28~34%) 후 파티션 버킷 기반 동적 분기 사건 발동(생애 최대 2회 상한 + 최근 14개 방지 + `alignBias` 단계별 `x1.7/2.1/2.6` 우대·불일치 `x0.4` 감쇠 + 챕터/네임드 3.0배 · `anyPastCareers` 2.8배 · 행성/직군/시기 2.6배 · 미낙인 이단자 `ev_chaos_whispers` 5.0배).
    6. **2.5순위:** `createDynamicTransitEvent` `transitTier` 기반 강제 파견/배치 선택/순례선 이벤트(워프 항해 이상 변주 포함).
    7. **3순위:** `applyChronicle` 파티션 버킷 기반 일상·부조리 연대기 로그 출력(`alignBias` 일치 `x2.0`/불일치 `x0.45`, 최근 28개 방지, `MAX_LOGS = 2,400`건 스마트 보존).
  * **자율 행동 · 이동 · 접근성 요약:** `getCareerAction(state)`(25종 `actionGroup` 프로필 기반 78개 직군 고유 행동 · 교조/암흑 성향 보조 연동, 4년 재사용), `canUsePenance`(암흑 1+ 시 암흑 -3 · 교조 +1)/`canUseAugmetics`/`canUseRejuvenat`, `canRetireHonorably`/`createHonorableEndingEvent`, `buildStatusSummary(state)`(도덕 성향 포함 스크린 리더 1클릭 요약), `getTravelProfile`/`evaluateTravelAttempt`/`getTravelCandidateWorlds`, `getContextualOptions`.
* **`js/ui.js` (~2,147줄):**
  * 100ms 틱 진행 바, `announce()` 타이머 안전 비가시 공백 교차 알림, **전 패널 포커스 보존 렌더링**(`#focus-grid`·`#sel-travel-world`·`#auto-careers-wrap`·`#auto-actions-wrap`·`#stats-grid`·`#tag-cloud`·`#all-careers-preview`·`#roll-banner` 시그니처 비교 + `[data-cid]`/`[data-aid]` 복원 및 소진 시 `#heading-auto` 폴백 + 시작 화면 복귀 시 `#start-heading` 포커스 + `#recent-log-list` 증분 `prepend`), 좌측 3대 도덕 성향 게이지·사건 `alignBias` 배지, `fastForwardToEvent`, `announceStatusSummary`, 부고 모달 `inert`·포커스 트랩·복원.
  * `localStorage` 3중 저장 + 견고화: `imperium_vita_active_v1`(`saveVersion: 3`·`migrateState`·저장 최적화·실패 1회 경고), `imperium_vita_prefs_v1`, `imperium_vita_hall_v1`(성향 스냅샷 저장 + 2단계 5초 확인 초기화 가드) + **`.json` 통합 백업 내보내기·불러오기**.
  * 순수 텍스트 생애 기록서 복사 및 `.txt` 파일 저장(도덕 성향 · 거쳐 온 진로 궤적 포함).
* **`scripts/sync-scripts.js` (~101줄, Node.js 전용):**
  * `data/events/**` 및 `data/chronicles/**`의 `.js` 파일을 재귀 스캔·정렬해 `index.html`의 마커 구간을 자동 동기화(`--check` 검사 모드 지원).
* **`scripts/qa.js` (~1,500줄, Node.js 전용) · `scripts/audit-health.js` (~180줄) & `.github/workflows/qa.yml`:**
  * `node scripts/qa.js` 단일 명령으로 `AGENTS.md` 6대 게이트(63스크립트·로드 순서·고아 파일·구문·파일 용량 상한·CSS·DOM `#id` 103종·표기/기호/크리그·ID/참조/78직군 메타데이터/성향 스키마/태그/`describeReq`/연표/`forceCareer`/동적 오퍼/`migrateState`/명예 마감/상태 요약/초인 오염 면역 회귀 테스트·소프트락/유년기 풀/중복률/로그 보존·300생애 멀티-초점 시뮬레이션·1,000분기 벤치마크) 일괄 검증.
  * `node scripts/qa.js --deep`: **Gate 7A**(79직군 전직 도달 그래프 기반 `anyPastCareers` 모순 감사) · **Gate 7B**(전체 1,620개 조건식 전수 합성 도달성 증명 · 3성향 조건 포함) · **Gate 7C**(6대 초점 1,500생애 분포 + 3대 성향 대조 롤플레이 시뮬레이션).
  * `node scripts/audit-health.js`: 200생애 무작위 플레이·7분기마다 JSON/`migrateState` 왕복 퍼징, 초장수 명예 마감 탈출성, UI 포커스 정적 위험, 파일 용량 근접 경고를 자동 검사.
  * `.github/workflows/qa.yml`: `main` 브랜치 push/PR마다 `sync-scripts --check && qa.js && audit-health.js --lives=100` 자동 회귀 검증 실행.

### 3.2 데이터 파일별 수록 내용
| 파일 | 건수 | 수록 내용 요약 |
| --- | --- | --- |
| `data/worlds.js` | 5성역 · 22행성 | **네임드 15:** `terra`, `mars`, `cadia`(999 파괴), `krieg`, `armageddon`, `necromunda`, `macragge`, `baal`(니힐루스), `fenris`, `catachan`, `vostroya`, `valhalla`, `tanith`(765 파괴), `nocturne`, `ophelia7`. **일반 7:** `generic_hive`, `generic_agri`, `generic_civilised`, `generic_forge`, `generic_feral`, `generic_paradise`, `voidborn`. |
| `data/origins.js` | 신분 10 · 자질 8 | 하층민, 일반 시민, 군인 가문, 스콜라 프로제니움, 기계교 도제, 국교 수련생, 행성 귀족, 로그 트레이더 방계, 나비스 노빌리테, 테라 고위 귀족 영아(테라 한정). 행성 정합성 필터(`excludeWorlds`/`excludeWorldTags`) 적용. 자질 8종. |
| `data/careers.js` | 79직군 (선택 78 · 17트리) | `child` + **17개 세력 풀 계급도 78종:** 시민/길드/언더하이브(6), 밀리타룸·방위군·템페스투스(9 · 워마스터/로드 커맨더 밀리탄트), 커미사르(4), 소로리타스(5 · 아베스 상크토룸), 국교회(4 · 에클레시아크), 아스타르테스(6 · 1중대 터미네이터/챕터 마스터), 그레이 나이트(4 · 슈프림 그랜드 마스터), 쿠스토데스(4 · 캡틴-제너럴), 이단심문소(5 · 테라 대표), 메카니쿠스(6 · 화성 파브리케이터-제너럴), 네이비(4 · 로드 하이 애드미럴), 아르비테스(4 · 그랜드 프로보스트 마셜), 아드미니스트라툼(4 · 제국 행정장관), 행성 총독·섹터 로드(2 · 공훈 횡단), 로그 트레이더(3 · 공훈 횡단), 공인 사이커(3 · 아스트라 텔레파티카 총관), 암흑의 신들(5 · 필멸 컬트 vs CSM/카오스 로드 분리 · 데몬 프린스 승천). 10개 상징 직군에 3대 도덕 성향 `or` 우대 지름길 연동. |
| `data/chapters.js` | 9챕터 | `ultramarines`, `blood_angels`, `space_wolves`, `dark_angels`, `imperial_fists`, `salamanders`, `black_templars`(`allowPsyker: false`), `raven_guard`, `white_scars`. |
| `data/characters.js` | 20인물 | `guilliman`, `yarrick`, `creed`, `gaunt`, `cain`, `dante`, `cawl`, `grimnar`, `calgar`, `celestine`, `eisenhorn`, `marbo`, `valoris`, `tushan`, `ghazghkull`, `abaddon`, `lion`, `amberley_vail`, `grimaldus`, `azrael`. |
| `data/timeline.js` | 24대사건 | 아이젠혼 스카루스(240), 콜룸누스 위어드와아아!(260), 트라시안 프리마리스·말레우스(345), 마카리우스 대성전(392), 다모클레스 만 성전(742), 1차 타이라니드·마크라그 전투(745), 사바트 성전(755), 타니스 멸망(765), 브락스 공성전(813), 바답 전쟁(901), 케인·발할라 597연대(931), 2차 아마겟돈(941), 2차 타이라니드·크라켄(992), 3차 아마겟돈(998), 카디아 붕괴(999), 대균열(999), 바알의 파괴(999), 사자의 문(000.M42), 인도미투스 성전(001.M42), 비질루스(008.M42), 사이킥 각성(012.M42), 파리아 넥서스(016.M42), 징조의 방주·라이온 귀환(020.M42), 4차 타이라니드 전쟁(028.M42). |
| `data/tags.js` | 태그 170 · 행성태그 46 | 이력·신분·자질·직군·계급·직책·명예·인연·3대 성향 정점 태그 한글 라벨 사전(`TAG_LABELS` 170/170 전량 회수) 및 `describeReq`용 행성 유형 라벨 사전(`WORLD_TAG_LABELS`). |
| `data/events/careers/*.js` | 14파일 · 233사건 | `guardsman`(15), `militarum`(23), `militarum_ranks`(15), `astartes`(24), `talons_knights`(15), `inquisition`(16), `mechanicus`(16), `ecclesiarchy`(13), `rogue_trader`(8), `civil_void`(25), `high_lords`(12: 하이 로드 10석 + 원로원·섭정 갈등), `governor`(14: 총독·섹터 로드·로그 트레이더 왕조·길드/암흑가 거두), `transhuman_faith_ranks`(17: 초인·신앙·심문·기계교 중상위 계급), `chaos_ranks`(20: 필멸 챔피언 · 4대 신 상위 시련 · 배신자 군단 · 카오스 로드 · 데몬 프린스 엔드게임). 핵심 7개 파일 51건 성향 레트로 태깅 적용. |
| `data/events/chapters/*.js` | 10파일 · 60사건 | 9대 챕터 1:1 승격(`ultramarines` 6, `blood_angels` 6, `space_wolves` 6, `dark_angels` 6, `imperial_fists` 6, `salamanders` 6, `black_templars` 6, `raven_guard` 6, `white_scars` 6) + 합동 공조 `chapters_core`(6: 챕터 숙원 4 · 데스워치 복귀 · 퍼스트본/프라이머리스 합동 서약). |
| `data/events/worlds/*.js` | 8파일 · 101사건 | 1:1 승격 4파일(`terra` 10, `cadia` 6, `krieg` 6, `armageddon` 6) + 권역 4파일(`solar` 13: 화성 7·네크로문다 6, `ultima` 27: 마크라그 6·바알 5·카타찬 5·발할라 5·녹턴 6, `frontier` 19: 펜리스 5·보스트로야 5·타니스 4·오펠리아 VII 5, `generic` 14: 무명 6행성·보이드본·행성 유형 공용). |
| `data/events/themes/*.js` | 9파일 · 212사건 | `alignment`(30: 자비 8 · 교조 8 · 암흑 8 · 3성향 딜레마/속죄/초인/고위직 6), `lifecycle`(33: 유년·초년·노년·인연/가족), `longevity`(10: 140~400세+ 초인·드레드노트·쿠스토데스·필멸자 초장수기 연작), `named`(23: 네임드 20인 조우 & 후일담), `eras`(20: 시기×장소·대균열·니힐루스), `xenos`(16: 외계 종족), `chaos_warp`(22: 4대 신·컬티스트·배신자·워프/사이커), `arcs_focus`(34: 삶의 초점 1·2막·명예 태그·출신/자질), `crises`(24: 전선·환경·비전투 치명 위기). 핵심 5개 파일 62건 성향 레트로 태깅 적용. |
| `data/chronicles/*.js` | 13파일 · 700연대기 | `alignment`(27: 자비 7 · 교조 7 · 암흑 7 · 교차/세속적 악인/초인 3 · 정점 태그 3종 회수 3), `childhood`(105), `careers`(105), `careers_ranks`(61), `careers_specialists`(40), `worlds`(79), `worlds_dispatch`(45: 네임드 15행성 파견·풍토·시대), `general`(70), `arcs_named`(56), `chapters`(51: 9대 챕터 심화), `eras`(23), `lifecycle`(28: 초장수·드레드노트 포함), `chaos_endgame`(10: 카오스 4대 신·장구한 전쟁·데몬 프린스) — 전체 700종 상황 맞춤형 일상·부조리 연대기. |


---

## 4. 핵심 게임 시스템 규격 및 엔진 스키마 레퍼런스

### 4.1 계급별 진입 · 이동 · 특수 시술 · 원격 속보 규격
* **직군 진입 2단계 (`entryMode`):** `open`(입문·기초 직군)은 우측 패널에서 수동 지원 가능하며, `event`(상위 계급·공훈 횡단·하이 로드 10석·워마스터·챕터 마스터·데몬 프린스)는 조건 달성 시 `createDynamicCareerOfferEvent`로 임명·발탁 사건이 발생한다(거절 시 8년, Tier 6 시련 실패 시 16년 쿨다운).
* **강제 파견/이동 선언적 위계 (`transitTier`):** `forced`/`astartes_scout`는 거부권 없는 강제 파견, `mid`/`astartes_brother`/`grey_knight`는 2개 작전 구역 택1+잔류, `autonomous`는 자율 원정 결정 및 100% 즉시 출항(`custodes`는 캡틴-제너럴 칙령 85%, `heretic`은 워프 밀항/배신자 함대).
* **기계교 의체 개조:** 기계교 소속은 16세+(무료, 8년 간격), 비기계교는 18세+·고위 계급(Tier 3+, 권위 42+) 또는 귀족(권위 55+) 또는 부상 재활 여건 필요. 크리그 일반 병사 및 야만 행성 하급민(Tier 3 미만), 데몬 프린스 제외.
* **리주버냇 수명 연장:** 50세+·고위 계급(Tier 3+)/귀족·권위 50+, 아스타르테스/쿠스토데스/데몬 프린스 불필요.
* **성당 정화 고행:** 14세+·비야만 행성·비이단자·오염 1+·재사용 3년(암흑 1+ 시 암흑 -3 · 교조 +1 병행).
* **은하·성역 원격 속보:** 타 행성 체류 중에도 제국 전역(`galaxy`) 또는 같은 성역(`sector`)의 대형 역사 사건이 발생하면 아스트로패스 속보(`heardNews`)가 연대기에 수신됨(야만 행성 제외).

### 4.2 `checkReq(state, req)` 지원 조건 키
`minAge`, `maxAge`, `minYear`, `maxYear`, `gender` (`"male"`/`"female"`), `stats` (`{ WS, BS, T, Ag, Int, WP, Fel, Inf }`), `minFaith`, `maxFaith`, `minCorruption`, `maxCorruption`, `minWounds`, `maxWounds`, `minAlign` (`{ humane, dogmatic, ruthless }`), `maxAlign`, `anyDominantAlign` (`["humane"|"dogmatic"|"ruthless"|"neutral"]`), `allTags`, `anyTags`, `excludeTags`, `anyCareers`, `anyPastCareers`, `excludePastCareers`, `anyChapters`, `excludeChapters`, `anyWorlds`, `anyHomeWorlds`, `excludeWorlds`, `excludeHomeWorlds`, `anyWorldTags`, `excludeWorldTags`, `anySegmenta`, `anyFocus`, `greatRift` (`true`/`false`), `or` (재귀 배열).

### 4.3 `applyOutcome(state, outcome)` 지원 효과 키
`text`, `stats`, `wounds`, `woundsBonus`, `faith`, `corruption`, `corruptionReset`, `align` (`{ humane, dogmatic, ruthless }`), `lifeBonusExtra` (또는 `extraLifeBonus`), `incrementRejuvenat`, `addTags` (`met_<charId>` 자동 `metCharacters` 등록), `moveWorld`, `warpYearShift` (생물학적 연령 유지한 워프 시간 도약), `forceCareer`, `acceptCareerOffer`, `declineCareerOffer`, `trialFailFor`, `chooseChapter`, `instantDeath` (사망 사유 문자열).

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
| **17단계 (5차 6단계)** | 인류제국 신규 4대 세력 풀 트리 & 기사 행성 추가 | `[예정]` | 0% | `navis_navigator`(파테르노발 특사 하이 로드 포함), `officio_assassinorum`(4대 클레이드·그랜드 마스터 하이 로드 포함), `imperial_knight`(+`generic_knight` 행성), `living_saint`(16.5단계 3대 성향 연동) 풀 트리 + 엔진/도감 연동 (`+4세력 · +1행성 · +36사건 · +32연대기`) |
| **18단계 (5차 7단계)** | M41~M42 핵심 역사 5종 · 신규 네임드 8인 · 정사 크로스오버 · 거시 파장 | `[예정]` | 0% | 고딕 전쟁·1차 아마겟돈(수치의 달들)·3차 타이라니드·옥타리우스·역병 전쟁 추가, 네임드 8인(28인 체제) 단독 조우·정사 크로스오버·거시 결단 파장 연계, 시대 프리셋 2종 (`+5역사 · +8인물 · +28사건 · +28연대기`) |

* **5차 인류제국 대확장 전체 누적 완성도:** `9 / 11 단계 완료 (81.8% · 12~16.5단계 완료, 잔여: 17~18단계)`

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

### 다음 작업 대기열 (Next Up — 17~18단계 상세 계획)

* **17단계 (5차 6단계 — 다음 예정): 인류제국 신규 4대 세력 풀 트리 & 기사 행성 추가 (`+4세력 · +1행성 · +36사건 · +32연대기`)**
  * `navis_navigator`(견습 항법사 → 선임 항법사 → 노빌리테 가주 → 파테르노발 특사 하이 로드), `officio_assassinorum`(4대 클레이드 견습·정예 → 그랜드 마스터 오브 어쌔신 하이 로드), `imperial_knight`(기사 행성 `generic_knight` 신설 + 23행성 체제 · 자유기사/하이 킹), `living_saint`(기적 각성 특수 승천 트리 · 16.5단계 3대 성향 연동) 추가.
  * **16.5단계 레드팀 선제 리스크 반영 체크리스트:** ① 신규 4세력 사건은 `data/events/careers/` 하위 독립 파일 4종으로 신설해 대형 테마 파일(`arcs_focus`/`alignment`) 용량 상한(110KB) 침범 방지, ② `onJoin` 처리에 `faith`/`align`/`lifeBonusExtra` 지원 선행 확장, ③ `generic_knight` 성간 이동·유년기 연대기(2세/10세 각 4+)·`WORLD_TAG_LABELS` 및 `navigator_house` 진입 확률 정합화.

* **18단계 (5차 7단계): M41~M42 핵심 역사 5종 · 신규 네임드 8인 · 정사 크로스오버 · 거시 파장 (`+5역사 · +8인물 · +28사건 · +28연대기`)**
  * 고딕 전쟁(139~151.M41), 1차 아마겟돈·수치의 달들(444.M41), 3차 타이라니드·옥타리우스, 역병 전쟁(울트라마) `TIMELINE` 5종 및 시대 프리셋 2종 추가, 네임드 8인 추가(28인 체제) + 정사 크로스오버 및 거시 결단 파장 연계(16.5단계 3대 성향 선택지 반영).
