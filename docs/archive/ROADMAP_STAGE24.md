# 1 / QUADRILLION : IMPERIALIS VITA — 완료 로드맵 · 감사 아카이브 (Stage 24)

> 본 문서는 100% 완료·검증·3인 독립 읽기 전용 감사 `PASS`·`main` 병합까지 마감된 **Stage 24 (4대 직교 컨텍스트 · 영아기 차단 · 공간/신분 정합성 엔진 & 계급별 운명 궤도 개편)**의 상세 설계 명세, 단계별 완료 내역, 3인 감사 Round-1~3 해소 기록 및 최종 QA 실측 결과를 무손실 보존하는 아카이브다.
> 이전 완료 기록은 [`ROADMAP_STAGE01_18_6.md`](./ROADMAP_STAGE01_18_6.md) · [`ROADMAP_STAGE19_23_5.md`](./ROADMAP_STAGE19_23_5.md) · [`AUDIT_STAGE21_23.md`](./AUDIT_STAGE21_23.md), 현행 기준 문서는 [`PROJECT_GUIDE.md`](../../PROJECT_GUIDE.md)를 참조한다.

---

## 1. 배경 및 해결한 4대 구조 결함

1. **보이드본(`voidborn`) 공허 생활권 누수 & 출생 혼선:**
   * 기존 `src/data/core/origins.js`의 `rogue_trader_scion`이 일반 행성 출생 시에도 무조건 `"voidborn"` 태그를 부여해 행성·공허 정체성이 혼선되었다.
   * `worldId: "voidborn"` 체류 중에도 지표면 공용 사건(노점상, 하층 배수로, 상층 첨탑 만찬, 거주구 벽보 등)과 지표면 연대기가 공허 공간으로 누출되었다.
2. **0~5세 영아기 선택지 사건 노출:**
   * `TIMELINE` 29건 중 9건(`tl_great_rift`, `tl_guilliman_return`, `tl_psychic_awakening`, `tl_arks_of_omen_lion`, `tl_fourth_tyranic`, `tl_fall_of_cadia`, `tl_tanith_fall`, `tl_devastation_baal`, `tl_lions_gate`)에 `filter.minAge`가 없고, `EVENTS`의 `ev_hive_plague` · `ev_agri_harvest` 2건에도 `minAge`가 누락되어 영아기에 전쟁·참전·권모술수 선택지가 노출되었다.
3. **계급별 진로 위화감 · 태생 정체성 증발 · 지문–선택지 불일치 위험:**
   * 귀족 · 로그 트레이더 방계(14~18세)의 수동 전직 창에 노동자·갱단·PDF·가드 사병·스키타리가 그대로 노출되고, `rt_seneschal`은 `minAge: 20`이라 19세에 엉뚱하게 `administratum`으로 자동 배치되었다.
   * 크리그(`krieg`) 일반 시민 출생자가 14세에 데스 코어가 아닌 `menial_worker`로 배정되었다.
   * 귀족 낙하산 임관과 평민 출신 승진의 대조 서사가 부족했고, 단일 고정 `event.text`만으로는 출신별 선택지와 지문 시점이 어긋날 위험이 있었다.
4. **고정 페르소나 QA 한계 & `createEngine.js` 용량 임계:**
   * 고정 17페르소나만으로는 `23행성 x 11출신 x 12자질 x 91직군` 조합 폭발을 방어하기 어려웠다.
   * `src/engine/createEngine.js`가 `1,913줄 / 77.0KB`로 경고선(`1,950줄`)에 근접해 있었다.

---

## 2. 확정 설계 원칙 (5대 핵심 규격)

1. **4대 직교 컨텍스트 축 (`originClass` · `habitat` · `socialTier` · `bodyClass`) & 보이드본 출생 일원화:**
   * 기존 `lifeRealm`은 100% 하위 호환 유지하면서 독립 축 `originClass`(`underclass | common | military_caste | schola | noble | high_noble | disowned`)와 `habitat`(`void | surface | frontline | cloister`)를 `formatters.js` / `reqEvaluator.js`에 추가했다(`anyOriginClasses` / `excludeOriginClasses` / `anyHabitats` / `excludeHabitats` 조건 키 및 `describeReq` 완비).
   * `origins.js`의 `rogue_trader_scion`에서 무조건 `"voidborn"` 태그를 제거해 오직 `worldId === "voidborn"` 출생자만 진짜 보이드본이 되도록 일원화했다(`voidborn` 출생 시 `rogue_trader_scion` 가중치 우대).
2. **조건부 지문 변주 (`resolveEventText`: `leadVariants` / `textVariants`):**
   * `pendingEvent` 생성 시점에 캐릭터 상태(`req`)에 맞는 도입부 1~2문장(`leadVariants`) 또는 본문(`textVariants`)을 최종 `ev.text`로 확정해 지문과 출신별 선택지가 한 문맥으로 일치하게 했다(React UI · `localStorage` 저장 포맷 100% 무변경 호환).
3. **0~5세 영아기 선택지 원천 차단 + 역사 대사건 목격 로그 전환:**
   * `createEngine.js` `advanceQuarter`에서 `state.age < 6`일 때 `EVENTS` 및 직접 선택형 `TIMELINE`을 원천 차단하고, 전역·행성 대격변 연도를 지나갈 때 `tl.infantLog` 패시브 목격 로그(`badge: "유아기 역사 목격"`)만 기록한다.
   * 카디아(`tl_fall_of_cadia` -> `voidborn`) · 타니스(`tl_tanith_fall` -> `generic_civilised`) 행성 멸망 시 자동 탈출 처리하며, 바알(`tl_devastation_baal`)은 정사 고증에 맞춰 레비아탄 궤도 봉쇄 하 아르크스 안젤리쿰 지하 대피소 생존으로 처리한다.
   * 영아기 역사 목격 발생 분기에는 일상 연대기(`applyChronicle`)를 생략하고, `GameApp.tsx` `#sr-live`는 `LogEntry` 타입 기반 4단 우선순위(`death > career / 유아기 역사 목격 > danger > event > chronicle`)로 핵심 로그를 누락 없이 낭독한다.
4. **계급별 운명 궤도 + 귀족 낙하산 임관 + 의절 자립 + 흙수저 역전 경로 100% 보존:**
   * **크리그(`krieg`):** 14세 기본 편입을 데스 코어 오브 크리그(`astra_militarum`)로 전환.
   * **아르비테스(`arbites`):** `schola` 출신 또는 교조(`dogmatic >= 20`) / 의지(`WP >= 44`) 적성 충족 시 개방.
   * **상위 귀족(`noble` / `rogue_trader_blood` / `terra_elite`, `!disowned_noble`):** 수동 전직 창에서 하위·사병 5직군(`NOBLE_HIDDEN_LOW_CAREERS`) 숨김, 18세 `rt_seneschal`(혈통) 및 `militarum_officer` 낙하산 임관(`noble_commission`) 개방, 18세 2분기 성년 진로 결단 분기(`createComingOfAgeEvent`: 가문 승계 · 행정/함대/낙하산 임관 · 이단 도피 · 가문 의절 `disowned_noble` 선택 시 귀족·무역 영장 혈통 특권 일괄 회수 및 하위 직군 해금), 19세 미선택 로그 트레이더 방계는 `rt_seneschal` 자동 배치.
   * **하층민 · 일반 시민:** 자력 지원 경로 및 태생 무관 우연 발탁 루트 100% 보존 + 하이브 십일조 징집·언더하이브 갈림길 서사 확충.
5. **속성 기반(Property-Based) QA 정적 린터 · 500조합 퍼저 · 강화 Gate 7E:**
   * Gate 4P를 22페르소나 x 2난이도 + 500개 결정론적 카테시안 조합 퍼저로 확장하고, Gate 4에 0~5세 정적/런타임 불변식 및 정적 지표면-공허 린터를 추가했다.
   * Gate 7E에 실존 프로브·태그 사전 검증, 비카오스 `forceCareer` 폐쇄 서약·계급 강등 누수 및 `abhuman`/`gender` 우회 정적 가드, `leadVariants`/`textVariants` 도달성 검증을 구축했다.

---

## 3. 단계별 완료 내역 (`24-A` ~ `24-D`, 달성도 100%)

| 단계 | 상태 | 주요 완료 내역 |
| --- | :---: | --- |
| **24-A (엔진 분리 · 4직교 축 · 영아기 · 진로 궤도 · 코어/UI)** | `[완료]` | `src/engine/stateLifecycle.js`(신설, 404줄/17.1KB) 무순환 분리로 `createEngine.js` 1,666줄(65.7KB) 감량. `formatters.js`/`reqEvaluator.js` 4직교 축 + `resolveEventText` 구현. `careerRules.js` `createComingOfAgeEvent`·`NOBLE_HIDDEN_LOW_CAREERS`·의절 특권 회수, `travel.js` 의절 귀족 사설 선박 차단, `centenarianOps.js` 2종(`dyn_cent_blood_games`, `dyn_cent_living_miracle`, 총 16종) 병합. `tags.js` +3태그(`228`종), `origins.js` 보이드본 일원화, `careers/civil_militarum.js` · `timeline/*.js` 9건 `minAge`+`infantLog`, `AutonomousPanel.tsx` · `GameApp.tsx` · `types.ts`(`LogEntry`) 동기화. |
| **24-B (속성 기반 QA · 500조합 퍼저 · Gate 7E · Vitest #28~#30)** | `[완료]` | `distGate.mjs`·`qa.mjs` 10엔진 모듈 격리, `qa.mjs` Gate 3/4 변주 스캔·0~5세 불변식·정적 지표면-공허 린터·Stage 24 회귀 단언, `personaGate.mjs` 22페르소나 x 2난이도 + 500조합 카테시안 퍼저, `careerGate.mjs` 강화 Gate 7E(실존 프로브/태그 검증 + `forceCareer` 강등/폐쇄서약/`abhuman`/`gender` 가드 + 변주 도달성), `tests/game-a11y.test.tsx` Stage 24 행동형 테스트 3종(#28~#30, 총 30/30 PASS), `astro.config.mjs` `chunkSizeWarningLimit: 3200`. |
| **24-C (공허 누수 교정 · 보이드본/출신 교차 팩 · 변주 업그레이드)** | `[완료]` | 기존 19파일 155항목(102사건+53연대기) 공허 누수·`minAge: 14`·폐쇄 서약 정합화. 신규 `events/worlds/voidborn_deep.js`(+10사건), `chronicles/voidborn_s24.js`(+18연대기), `events/themes/origin_crossover_s24.js`(+10사건), `chronicles/origin_crossover_s24.js`(+16연대기). `lifecycle_early.js` `ev_s2_child_blackship_sky` 고증 어조 교정, 핵심 직군 사건 11종(`civil_void.js` 4, `militarum.js` 4, `guardsman.js` 3) `leadVariants` + TTS-우선 출신 선택지 확장. 강화 Gate 7E가 적발한 기존 레거시 3사건(`ev_inquisition_recruit`, `ev_arc_inquisition_debt`, `ev_blank_recruit`) 8건 누수 동시 교정. |
| **24-D (통합 검증 · 3인 독립 읽기 전용 감사 `PASS` · 아카이브)** | `[완료]` | Round-1 -> Round-2 -> Round-3 독립 3인 읽기 전용 감사 전량 해소 및 전원 `PASS`, `npm run verify && npm run qa:deep && npm run coverage` 전 항목 0오류·0경고 달성, `PROJECT_GUIDE.md` · `README.md` 동기화 및 본 아카이브 이관 완료. |

---

## 4. 3인 독립 읽기 전용 교차 감사 및 레드팀 해소 기록

* **Round 1 감사 적발 및 전량 해소:**
  * `iv_lore_auditor` (`P0` 6건 · `P1` 9건 · `P2` 4건): 크리그 비타-움 `military_caste` 6개소 제외, 보이드본 팩 `transhuman`/`heretic`/`cloistered`/`anyHomeWorlds` 정밀화, `ev_s24_void_08` `abhuman`/`schola`/`minAge: 17` 가드, `ev_astartes_recruiter` `blank`/`omega_pariah`/`knight_blood`/`krieg` 제외, 바알 정사 지하 대피소 복원 및 전역 `infantLog` 중립화, `ev_s24_orig_08` `"선임 워치마스터"` 정정, `origin_crossover_s24.js` 연대기 16건 출처 보강, `dyn_cent_blood_games` `"만 명의 수호자"`/`"백 년 넘게 익힌"` 정정 -> **Round 2 `PASS` (`P0: 0, P1: 0, P2: 0`)**.
  * `iv_prose_a11y_critic` (`P0` 8건 · `P1` 13건 · `P2` 7건): `AutonomousPanel.tsx` 귀족 수습 3분기 문법 수정, `ev_s2_child_blackship_sky` 및 11개 변주 사건의 `leadVariants + text` 시제·중복어·조사 교정, 신규 출신 선택지 11종 전원 TTS-우선 `[XX 판정 · 출신]` 포맷 통일, `ev_s24_orig_04` 선택지 차별화, `"흙수저"` -> `"평민 출신"`, `"패였지만"` -> `"파였지만"`, `ORIGIN_CLASS_LABELS` 간결화.
  * `iv_redteam_reviewer` (`P0` 0건 · `P1` 3건): `RT-P1-1`(영아기 역사 목격 `applyChronicle` 스킵 및 `#sr-live` 우선 낭독), `RT-P1-2`(Vitest `.btn-apply-career` `length > 0` 비공허화 + Gate 7E 실존 프로브/태그 검증 및 기존 8건 레거시 누수 적발·교정 + `personaGate.mjs` `nav_senior`/`nav_novator`), `RT-P1-3`(`disowned_noble` 시 `rogue_trader_blood` 제거 및 사설 선박·`rt_seneschal`·`ev_s24_void_02` 차단 + `ev_s24_void_08` `forceCareer` 가드).
* **Round 2 -> Round 3 최종 마감:**
  * `iv_prose_a11y_critic`과 `iv_redteam_reviewer`가 Round-2에서 공통 포착한 `GameApp.tsx` `#sr-live` 필드명 오타(`l.type` -> `l.kind`)를 `src/components/game/types.ts` `LogEntry` 타입 도입 + 4단 우선순위(`death > career / 유아기 역사 목격 > danger > event > chronicle`) + Vitest `#29`/`#30` 비공허 DOM 회귀로 완전 해결했고, P2 문체 2건(`AutonomousPanel.tsx` `"앱휴먼 신분으로"`, `m42_indomitus.js` `"순결의 인장을 두텁게 붙여 두었다."`) 및 `LogEntry.meta` 타입 정합성까지 마감했다.
  * **최종 3인 독립 읽기 전용 판정:** `iv_lore_auditor` **`PASS`** (`P0/P1/P2=0`), `iv_prose_a11y_critic` **`PASS`** (`P0/P1/P2=0`), `iv_redteam_reviewer` **`PASS`** (`P0/P1=0`).

---

## 5. 최종 통합 검증 실측 수치 (Stage 24 마감 기준)

* **누적 코퍼스:** `WORLDS=23`, `ORIGINS=11`, `TRAITS=12`, `CAREERS=91 (+child)`, `CHAPTERS=9`, `CHARACTERS=28 (100% 커버)`, `TIMELINE=29`, `EVENTS=808 (역사 포함 837)`, `CHRONICLES=970`, `GLOSSARY=48`, `TAG_LABELS=228`, `WORLD_TAG_LABELS=49`, 엔진 **10모듈**(`maxEngine=65.7KB`, `createEngine.js=1,666줄`), 사건 **64파일**(`maxEv=87.0KB`), 연대기 **24파일**(`maxCh=45.0KB`), Vitest **30/30 PASS**.
* **`npm run verify`:** 0오류 · 0경고 (`Gate 1~6` 0오류, `Gate 4P` 22페르소나 x 2난이도 + 500조합 퍼저 `collisions=0, fuzzLeaks=0, minChroniclePool=9 >= 8`, `audit-health` 200생애 `standard=100, grimdark=100` 0결함 · `mortalOver300=0` · `maxSave=385.2KB <= 2048KB`, `typecheck` 0오류, Vitest 30/30 PASS, Astro 9페이지 빌드 0경고, Gate 8 번들 격리 0오류 · `codexOverviewJS=0KB`).
* **`npm run qa:deep`:** ALL 7 QA GATES 0오류 (`Gate 7A/7B` `2,256 req specs` · `directCareerMatch 91/91`, `Gate 7D` `120 edges` 0데드락, `Gate 7E` `17 forceCareer / 4 closedVow / 54 variants` 0오류, `Gate 6/7C` 1,500 표준 + 300 그림다크 생애 `maxRepeat=2`, `childStuck=0`, `nihilusMismatch=0`, `standardLeaks=0`).
* **`npm run coverage`:** `0-5세 (유아)` `anchoredEv=0, anchoredCh=85`, 네임드 28인 100% 커버.
