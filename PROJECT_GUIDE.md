# 1 / QUADRILLION : IMPERIALIS VITA — 프로젝트 아키텍처 · 수록 현황 · 진행 보고서

> 본 문서는 프로젝트의 기획 의도, 디렉토리 구조, 파일별 콘텐츠 수록 현황, 게임 시스템·엔진 스키마 레퍼런스, 그리고 **서사 보강 로드맵 및 단계별 완료 보고서**를 기록하는 현황 기준 문서다.
> AI 에이전트가 준수해야 할 불변 규칙, 스크린 리더 접근성 원칙, 서사 보강 5대 작업 방향, 나무위키 번역명 기준표, 사실관계 고증 기준 및 QA 게이트는 [`AGENTS.md`](./AGENTS.md)를 정본으로 삼는다.

---

## 1. 프로젝트 개요 및 기획 의도

* **작품명:** `1 / QUADRILLION : IMPERIALIS VITA` (인류제국 생존 시뮬레이터)
* **장르:** 무작위 출생·생애 연대기 텍스트 시뮬레이션 웹 게임 (Unofficial Fan Project)
* **핵심 영감 및 설계 철학:**
  1. **《80억 분의 1》의 감상 경험 + 워해머 40k TRPG 메커니즘:** 무작위로 인류제국 100만 행성 중 한 곳에 태어나 흘러가는 생애 기록을 감상하되, 일자 진행에 그치지 않고 *Dark Heresy* / *Imperium Maledictum* 기반 **8대 특성치(d100 판정)**와 연간 **삶의 초점(Focus)** 관리로 숨겨진 분기·직군·역사 사건을 해금한다.
  2. **선택지 원툴 탈피 — 연대기 중심 몰입:** 선택지 분기 사건(344종, 역사 대사건 24종 포함)뿐 아니라, 인류제국 특유의 인간 경시·관료제 부조리·행성 풍토·계급별 일상을 담은 **패시브 연대기 로그(417종)**가 본인 상황에 정확히 맞춰 흘러가며 읽는 재미를 제공한다.
  3. **워해머 입문자 배려 + 설정 고증 조화:** 모든 선택지를 한꺼번에 늘어놓지 않고 우측 `자율 선택` 패널에 **지금 당장 가능한 선택지만** 정리해 노출한다. 성간 이동도 플레이어가 아무 행성이나 클릭해 순간이동하는 대신, 계급에 따라 상부의 강제 파견·전출 승인율·자율 함대 출항이 차등 적용된다.
  4. **IP 안전 원칙 (비공식 팬 창작물):** Games Workshop의 공식 아트워크·로고·룰북 원문 복사 없이 자체 작성한 한국어 산문과 순수 CSS/SVG 기하학 그래픽으로만 구성하며, 모든 데이터에 Lexicanum·공식 코덱스·소설 출처 표기를 병기한다.

---

## 2. 전체 디렉토리 구조 및 스크립트 로드 순서

```text
워해머/
├── index.html                  # 메인 SPA 문서 (4대 뷰 + 부고 모달 + 15개 스크립트 로드)
├── styles.css                  # 고딕 데이터슬레이트 UI · 스포트라이트 애니메이션 · 접근성 포커스 링
├── README.md                   # 사용자용 실행·배포·개요 안내서
├── AGENTS.md                   # AI 에이전트 작업 방향 · 불변 규칙 · 고증/표기 표준 · QA 게이트
├── PROJECT_GUIDE.md            # (본 문서) 아키텍처 · 파일별 수록 현황 · 스키마 · 진행 보고서
├── js/
│   ├── engine.js               # 핵심 시뮬레이션 엔진 (window.ImperiumEngine)
│   └── ui.js                   # DOM 렌더링·타이머·접근성 라이브 알림·코덱스·영혼의 전당
└── data/
    ├── worlds.js               # 5대 세그멘툼 + 22개 행성 (네임드 15 + 일반/보이드본 7)
    ├── origins.js              # 출생 신분 10종 + 선천 자질 8종 + 이름 생성 풀
    ├── careers.js              # 28개 직군 (child + 선택 병종 27종)
    ├── chapters.js             # 스페이스 마린 9대 유명 챕터 데이터
    ├── characters.js           # 20인 네임드 인물 프로필 (스포트라이트 + 코덱스용)
    ├── timeline.js             # M41~M42 실제 역사 대사건 24종 + 은하/성역 원격 속보
    ├── events.js               # 기본 분기 사건 69종
    ├── events_extra.js         # 행성별·테라 집중 확장 분기 사건 30종
    ├── events_deep.js          # 챕터(18)·네임드(18)·직군(12)·계급(10)·시기×장소(18)·1단계(27)·2단계(33)·3단계(12) 분기 사건 148종
    ├── events_saga.js          # 2차 보강 분기 사건: 4단계(37)·5단계(22)·6단계(14) 수록, 총 73종
    ├── chronicles.js           # 기본 일상·유년·행성·직군 연대기 142종
    ├── chronicles_extra.js     # 행성·테라·부조리 확장 연대기 62종
    └── chronicles_deep.js      # 9대 챕터(27)·계급별(25)·시기/부조리(18)·1단계(21)·2단계(26)·3단계(14)·4단계(47)·5단계(21)·6단계(14) 심화 연대기 213종
```

**`index.html` 스크립트 로드 순서 (반드시 유지):**
1. `worlds.js` -> `origins.js` -> `careers.js` -> `chapters.js` -> `characters.js` -> `timeline.js`
2. `events.js` -> `events_extra.js` -> `events_deep.js` -> `events_saga.js` (`events_extra`/`events_deep`/`events_saga`는 `EVENTS.push(...)`로 병합)
3. `chronicles.js` -> `chronicles_extra.js` -> `chronicles_deep.js` (`chronicles_extra`/`chronicles_deep`는 `CHRONICLES.push(...)`로 병합)
4. `js/engine.js` -> `js/ui.js`

---

## 3. 파일별 역할 및 현재 수록 현황

### 3.1 프론트엔드 코어
* **`index.html` (~349줄):**
  * 4개 메인 탭 뷰: `view-game`(생애 시뮬레이션), `view-chronicle`(전체 인생 기록서), `view-codex`(제국 코덱스: 행성/병종·직군/챕터/역사 연표/네임드 인물 5개 탭), `view-hall`(영혼의 전당).
  * 3단 플레이 대시보드: 좌측 `인물 상태`(이름·직책·챕터 전투 함성·메타·3대 수치·8대 특성치·보유 이력), 중앙 `시간 제어 및 삶의 초점` + `진행 중인 사건` + 독립 `<h2>실시간 인생 기록</h2>`, 우측 통합 `자율 선택`(진로·승급 / 직군·특수 행동 / 성간 이동·전출 청원 / 잠긴 진로 접이식 미리보기).
  * 사망 부고 모달(`#obit-backdrop`, `role="dialog"`), 단일 라이브 영역(`#sr-live`).
* **`styles.css` (~1,568줄):**
  * 황동·검정·진홍·코지테이터 녹색의 제국 데이터슬레이트 테마, `.sr-only`, 고대비 금색 `:focus-visible` 포커스 링, 네임드 조우 스포트라이트 펼침 애니메이션(`@keyframes spotlightUnfurl`, `prefers-reduced-motion` 존중), 1200px/820px 반응형 그리드.
* **`js/engine.js` (~2,528줄):**
  * **메타 상수:** `STAT_META`(8대 특성치), `FOCUSES`(6대 연간 초점: 생존/무예/신앙/학문/인맥/금단), `ERA_PRESETS`(7개 시대: 무작위 격동기, 아이젠혼 225.M41, 사바트 746.M41, 바답 882.M41, 아마겟돈 915.M41, 카디아 직전 980.M41, 인도미투스 998.M41), `TAG_LABELS`(이력 태그 한글 라벨 116종).
  * **조건·판정 엔진:** `checkReq(state, req)` / `describeReq(req)` / `rollD100(state, check)` / `evaluateLifeGrade(state)`(직군·핵심 이력 조합별 맞춤 부고 15종 + 범용 4종 + 인연·네임드 동적 추모 에필로그 결합).
  * **분기 진행 파이프라인 (`advanceQuarter`):**
    1. 분기 증가(1 -> 2 -> 3 -> 새해 1). 새해(`quarter === 1`) 시 나이/연도 +1, 14세 자동 첫 직무 편입, 초점+직군 연간 스탯 성장, 노화 및 환경 위험 판정.
    2. 아스타르테스 중상(생명력 38 이하) 시 드레드노트 안치(`ev_dreadnought_choice`) 긴급 발동.
    3. 사망/오염 100 체크.
    4. **1순위:** `TIMELINE` 역사 대사건 직접 체험(연도 유예 1년, `exactYear` 예외) 및 타 행성 원격 아스트로패스 속보(`heardNews`) 전파.
    5. **2순위:** `EVENTS` 동적 분기 사건 발동(매 분기 28~34%, 생애 최대 2회 상한 + 최근 14개 방지 + 챕터/네임드 3.0배 · 행성/직군/시기 2.6배 우대).
    6. **2.5순위:** `createDynamicTransitEvent` 계급별 강제 파견/배치 선택/순례선 이벤트.
    7. **3순위:** `applyChronicle` 본인 상황 맞춤 일상·부조리 연대기 로그 출력(최근 28개 방지 + `priority` 3/2/1 및 행성·챕터·시기 우대).
  * **챕터 서약 연쇄:** `attemptCareerChange` 또는 `applyOutcome`의 `forceCareer === "astartes_scout"` 달성 시 `state.chapterId`가 비어 있으면 즉시 `createChapterSelectionEvent(state)`를 열어 9대 챕터 중 선택하게 함(고향 징병 챕터 최상단 추천, 사이커는 블랙 템플러 잠금).
  * **자율 행동 & 이동:** `getCareerAction(state)`(27개 선택 직군별 고유 행동, 4년 재사용), `canUsePenance`/`canUseAugmetics`/`canUseRejuvenat`, `getTravelProfile`/`evaluateTravelAttempt`/`getTravelCandidateWorlds`, `getContextualOptions`.
* **`js/ui.js` (~1,106줄):**
  * 100ms 틱 진행 바(`SPEED_MS = { 1: 10000, 2: 5000, 4: 2500 }`), `announce()` 비가시 공백 교차 알림, `renderActiveEvent()` 내 네임드 스포트라이트 렌더링 및 연쇄 사건(챕터 서약 등) 포커스 제어, `renderFullChronicle()` 장별 묶음 보기, `renderCodex()` 5개 탭 + Lexicanum 검색 링크, `localStorage` 기반 `영혼의 전당`(`imperium_vita_hall_v1`, 최대 60생애 저장).

### 3.2 데이터 파일별 수록 내용
| 파일 | 건수 | 수록 내용 요약 |
| --- | --- | --- |
| `data/worlds.js` | 5성역 · 22행성 | **네임드 15:** `terra`, `mars`, `cadia`(999 파괴), `krieg`, `armageddon`, `necromunda`, `macragge`, `baal`(니힐루스), `fenris`, `catachan`, `vostroya`, `valhalla`, `tanith`(765 파괴), `nocturne`, `ophelia7`. **일반 7:** `generic_hive`, `generic_agri`, `generic_civilised`, `generic_forge`, `generic_feral`, `generic_paradise`, `voidborn`. |
| `data/origins.js` | 신분 10 · 자질 8 | 하층민, 일반 시민, 군인 가문, 스콜라 프로제니움, 기계교 도제, 국교 수련생, 행성 귀족, 로그 트레이더 방계, 나비스 노빌리테, 테라 고위 귀족 영아(테라 한정). 자질: 표준, 진시드 적합, 잠재 사이커, 블랭크, 전술안, 성흔, 오그린, 래틀링. |
| `data/careers.js` | 28직군 | `child` + 선택 27종: 노동자, 갱단, PDF, 가드맨, 장교, 사이온, 커미사르, 로드 커미사르, 소로리타스, 캐노네스, 아스타르테스(네오파이트/배틀 브라더/중대장), 그레이 나이트, 쿠스토데스, 어콜라이트, 이단심문관, 스키타리, 테크프리스트, 아크마고스, 네이비, 아르비테스, 아드미니스트라툼, 에클레시아키, 로그 트레이더, 생션드 사이커, 카오스 컬티스트. |
| `data/chapters.js` | 9챕터 | `ultramarines`, `blood_angels`, `space_wolves`, `dark_angels`, `imperial_fists`, `salamanders`, `black_templars`(`allowPsyker: false`), `raven_guard`, `white_scars`. |
| `data/characters.js` | 20인물 | `guilliman`, `yarrick`, `creed`, `gaunt`, `cain`, `dante`, `cawl`, `grimnar`, `calgar`, `celestine`, `eisenhorn`, `marbo`, `valoris`, `tushan`, `ghazghkull`, `abaddon`, `lion`, `amberley_vail`, `grimaldus`, `azrael`. |
| `data/timeline.js` | 24대사건 | 아이젠혼 스카루스(240), 콜룸누스 위어드와아아!(260), 트라시안 프리마리스·말레우스(345), 마카리우스 대성전(392), 다모클레스 만 성전(742), 1차 타이라니드·마크라그 전투(745), 사바트 성전(755), 타니스 멸망(765), 브락스 공성전(813), 바답 전쟁(901), 케인·발할라 597연대(931), 2차 아마겟돈(941), 2차 타이라니드·크라켄(992), 3차 아마겟돈(998), 카디아 붕괴(999), 대균열(999), 바알의 파괴(999), 사자의 문(000.M42), 인도미투스 성전(001.M42), 비질루스(008.M42), 사이킥 각성(012.M42), 파리아 넥서스(016.M42), 징조의 방주·라이온 귀환(020.M42), 4차 타이라니드 전쟁(028.M42). |
| `data/events.js` | 69사건 | 유년·선발·사이커·블랭크·앱휴먼·전투·아스타르테스(데스워치/스페이스 헐크/드레드노트)·쿠스토데스(블러드 게임)·이단심문소(오르도/청교도vs급진/익스터미나투스)·기계교·타락(카오스 4대 신)·기본 행성 고유·직업/계급 고유 1차 사건. |
| `data/events_extra.js` | 30사건 | 신성한 테라 집중 6종(양피지 내전, 물 카르텔, 아스트로노미칸 성가대 등) + 화성·카디아·크리그·아마겟돈·네크로문다·마크라그·바알·펜리스·카타찬·보스트로야·발할라·타니스·녹턴·오펠리아·보이드본·일반 행성 확장 사건. |
| `data/events_deep.js` | 148사건 | **9대 챕터 고유 18종** + **네임드 조우 18종**(20인 전원 단독 조우 완비) + **직군 고유 12종** + **계급 심화 10종** + **시기×장소 전용 18종** + **1단계 27종**(오르도·4대 신·태그 연작·삶의 초점) + **2단계 33종**(유년·노년/장수·소외 직군·특수 출신/자질) + **3단계 12종**(소외 행성 4 · 인간관계 연작 6 · 대균열/니힐루스 2). |
| `data/events_saga.js` | 73사건 | **4단계(37):** 네임드 20인 후일담(4) · 명예 태그 17종(16) · 초년기 통과 의례(7) · 무명 행성 6종(6) · 핵심 직군(4). **5단계(22):** 필멸자 가족·후계자(4) · `anyFocus` 2막(6) · 외계(8) · 배신자 군단(4). **6단계(14):** 침묵의 자매들/성별·소로리타스(4) · 화성/마크라그/녹턴(6) · 챕터 숙원·공조(4). |
| `data/chronicles.js` | 142연대기 | 22개 행성별 유아기(1~5세)·아동기(6~13세)·성인기 일상, 계급·신앙·초인별 워프 반응, 기본 제국 부조리 연대기. |
| `data/chronicles_extra.js` | 62연대기 | 테라 10종 및 전 행성·직군·제국 부조리 2차 확장 연대기. |
| `data/chronicles_deep.js` | 213연대기 | **9대 챕터 전용 27종** + **25개 직군·계급 정밀 연대기** + **시기·장소·부조리 심화 18종** + **1단계 21종** + **2단계 26종** + **3단계 14종** + **4단계 47종** + **5단계 21종** + **6단계 14종**(성별·침묵의 자매들 4 · 화성/마크라그/녹턴 3 · 챕터 숙원 4 · 신규 시대 3). |

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
