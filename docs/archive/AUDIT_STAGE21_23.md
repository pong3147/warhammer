# Stage 21~23 전방위 검수보고서 & Stage 23.5 통합 안정화 인계서

> **작성 배경:** `2858b66`(Stage 21), `027800e`(Stage 21.5 · 21.6 · 22 일괄 커밋), 그리고 `fix/stage23-5-stabilization` 브랜치의 Stage 23 변경분 전체를 대상으로, **메인 오케스트레이터 엔진 9모듈 직접 판독** + **독립 읽기 전용 감사관 3종(`iv_redteam_reviewer` · `iv_lore_auditor` · `iv_prose_a11y_critic`) 병렬 교차 검수**를 수행해 도출한 공식 결함 체크리스트 및 수습 실행 명세서다.
>
> **작업 브랜치 안내:**
> **완료 상태:** `fix/stage23-5-stabilization` 브랜치에서 `23.5-A` → `23.5-B` → `23.5-C` → `23.5-D` → `23.5-E` 전량을 완료했으며, `npm run verify && npm run qa:deep && npm run coverage` **0오류 · 0경고** 및 독립 읽기 전용 감사관 3인 전원 **`PASS` (`P0`/`P1` 0건)** 확인 후 `main` 병합을 완료했다.

---

## 1. 검수 요약 (최초 판정: `FIX_REQUIRED` → Stage 23.5 최종 판정: **전원 `PASS`**)

| 감사 주체 | 최초 판정 | 최종 판정 | 핵심 발견 및 해소 요약 |
| :--- | :---: | :---: | :--- |
| **`iv_redteam_reviewer`** (엔진 · UI · 세이브 · QA) | `FIX_REQUIRED` | **`PASS`** (`P0` 0 · `P1` 0) | 최초 `P0` 1 · `P1` 6 · 구조 리스크 3 전량 해소 + 재감사 추가 발견 `P1` 2건(`ev_s21_anom_13` Choice 0 `maxCareerTier: 3`, Vitest #27 거짓 양성 단언) 및 `migrateState` `null` 방어까지 완결. |
| **`iv_lore_auditor`** (40k 고증 · 연대기 · 표기 · 조건) | `FIX_REQUIRED` | **`PASS`** (`P0` 0 · `P1` 0 · `P2` 0) | 최초 `P0` 11그룹 · `P1` 9그룹 · `P2` 5 전량 해소 + 재감사 추가 발견 `P1` 2건(`ev_s21_anom_13` Choice 0, `navigator_house` 항법사 검은 함선/`sanctioned_psyker` 면제) 및 `P2` 4건 완결. |
| **`iv_prose_a11y_critic`** (문체 · 정합성 · 스크린 리더 UX) | `FIX_REQUIRED` | **`PASS`** (`P0` 0 · `P1` 0 · `P2` 0) | 최초 `P0` 3 · `P1` 13 · `P2` 11 전량 해소 + 재감사 추가 발견 `P1` 2건(`ev_s22_guard_03` 크리그 제외, `centenarianOps` `isKrieg`/`isOgryn`/`isAssassin` 가드) 및 `P2` 4건 완결. |

---

## 2. 심각도별 전수 결함 체크리스트 (전량 완료)

### 2.1 `[P0]` 치명적 런타임 버그 · 스키마 파손 · 심각 오고증 · 연령/신분 붕괴

- [x] **`[P0-01]` `src/engine/centenarianOps.js` — 14종 전량 Choice 0 스키마 파손 + 심각 오고증 (L14-567)**
  * **현상 1 (치명 무음 실패):** `TRANSHUMAN_OPS`(5종) · `MORTAL_ELDER_OPS`(5종) · `CHAOS_IMMORTAL_OPS`(4종) 14건 전부의 `choices[0]` `success`/`critSuccess`/`fail`/`critFail` 평탄화 완료 + `GameApp.tsx` `prevTopLog` 가드 추가.
  * **현상 2 (고증·정합성 오류):** `"블랙스톤 파편과 워프 합금 공물"`·`"다크 메카니쿰"`·`"외계 둥지"`, `isLivingSaint` 교정, `isCustodes`/`isDreadnought`/`isTerraOrMars`/`isOgryn`/`isAssassin`/`isKrieg`/`isInNihilus`/`isVoidCapable` 자격 가드 완비, 14건 전부 `[${statName} 판정]` 접두어 추가 완료.

- [x] **`[P0-02]` `src/data/chronicles/wear_tradeoff.js` — 미존재 스탯 키 `S`/`Per` 11건 + `"ice"` + 리빙 세인트 장기 오묘사**
  * 11건(12속성) `S`/`Per` → 8대 `STAT_META`(`T`/`WS`/`Ag`/`BS`) 치환, `ch_s21_wt_30` `"ice"` → `"cold"`, `ch_s21_wt_37` `anyTags` 한정 및 `custodes`/`living_saint`/`dreadnought` 제외 완료.

- [x] **`[P0-03]` `src/data/events/themes/anomalies_s21.js` — 12건 `minAge` 전면 누락 + 침묵의 자매들 고증 충돌**
  * `ev_s21_anom_02~14` 전량 `minAge >= 14` 적용(`05`: `14`, `02~04/06~08/12/14`: `16`, `09~11`: `18`, `13`: `16~35` + Choice 0 `forceCareer: "assassin_initiate"` & `maxCareerTier: 3` + Tier 4/폐쇄 서약 태그 제외), `ev_s21_anom_03` 침묵의 자매들/무혼 장막 설정 전면 개고, 전 14건 세력·행성·신분 누수 가드 완료.

- [x] **`[P0-04]` `src/data/events/themes/bonds_s21_6.js` & `src/data/chronicles/bonds_s21_6.js` — 이브람 건트 `"총커미사르"` 오고증 + 갱단 배교 오분류**
  * `ev_bond_named_gaunt_comrade` `"대령-커미사르"` 교정 및 `pacificus`/보병·사이온/크리그 제외 적용; `ev_bond_underhive_pact`, `ev_bond_heretic_betrayal`, `ch_bond_heretic_1` CSM·DP 제외 및 오염 0 충성파 갱단과 배교 혈맹 분리 완료.

- [x] **`[P0-05]` `src/data/core/careers/faith_shadow.js` & `transhuman_chaos.js` — 국교 아인류/사이커 즉위 허용 & 필멸자 `"다크 아포슬"` 오고증**
  * `ecclesiarchy_priest`, `ministorum_confessor`, `ecclesiarchy_cardinal`, `ecclesiarch`에 `"abhuman", "psyker", "navigator", "mutant_sanctioned"` 제외 추가; `chaos_champion` `"다크 데마고그"` 교정 완료.

- [x] **`[P0-06]` `src/data/events/careers/guardsman_grimdark.js` (10건) — 크리그 · 야만 행성 전면 누수**
  * 전 10건 `excludeWorldTags: ["feral"]`, `01, 02, 03, 04, 05, 07, 08, 10` `excludeWorlds/excludeHomeWorlds: ["krieg"]` 적용, `06`/`09` 크리그 충돌 문구·부채 정합화 완료.

- [x] **`[P0-07]` `src/data/events/themes/grimdark_misfortune.js` (10건) — 야만 행성 · 하이 로드(최고위) · 소속 기관 전면 누수**
  * 전 10건 `excludeWorldTags: ["feral"]`, `02/04/05/06/09/10` `maxCareerTier: 3`, `03` `maxCareerTier: 2` + 비민간 제외, `05`/`09` `anyWorldTags: ["hive"]`, `06` 이단/민간/크리그 제외, `07`/`08` 소속 기관 `excludeTrees` 적용 완료.

- [x] **`[P0-08]` `src/data/events/themes/grimdark_factions.js` (6건+) — 최고위(하이 로드) · 드레드노트 누수**
  * `01/02/06` `maxCareerTier: 3`(`01` `tech_priest` 정합화, `02` 중복 `bionic` 대체), `03/04` `maxCareerTier: 4` + `high_lord_terra` 제외, `07` `high_lord_terra` 제외, `08` `dreadnought`/`chapter_master` 제외 완료.

- [x] **`[P0-09]` `src/data/chronicles/grimdark_s22.js` — 귀족 유아 시체 전분 · 야만/크리그 · 수행원 소각 칙령**
  * `02` `maxSocialTier: "common"` + `excludeRealms: ["cloistered", "heretic"]`, `04` `hive`/`industrial`/`forge` + 크리그 제외, `05`/`08` `feral`/크리그 제외, `18` `inquisition_acolyte` 제거 완료.

- [x] **`[P0-10]` `src/data/events/themes/acquired_traits_s21.js` (12건+) — 초인 · 오염면역 · 무혼 · 야만행성 · 이단자 가드 누락**
  * 전 14건 `excludeWorldTags: ["feral"]`, `03` 오염면역/무혼/오그린/비전투/하이로드 제외, `01`/`05` 군사·보이드 정합화 및 `05` `ruthless` 정렬, `04`/`11`/`12` 이단/크리그/초인/암살청 제외, `06` 초인/드레드노트/악마 제외 완료.

- [x] **`[P0-11]` Stage 23-C 추가분 초인 `shell_shocked` · 면역자 `warp_scarred` · 드레드노트 `chronic_toxins`/`crippled_limb` 유입**
  * `crises_warfare.js` `ev_s8_crisis_ork_breakthrough` 초인·크리그 전용 분기 및 `artillery_barrage` `feral` 제외, `chaos_warp.js` `ev_geller_flicker` 무혼/면역자 전용 분기, `xenos.js` `ev_ork_waaagh`·`ev_tyranid_scouts` 드레드노트/`feral` 제외 및 `chronic_toxins` 초인 분기 완료.

---

### 2.2 `[P1]` 엔진 · UI · 접근성 · QA 사각지대 · 잔여 고증/정합성 결함

- [x] **`[P1-01]` 치유 막힘(`canUsePenance`) & 초인/블랭크/오메가-마이너스 면역 엔진 누락**
  * `careerActions.js` 오염 0 정신 트라우마(`shell_shocked`/`warp_scarred`) 정화 개방 + `createEngine.js` 행동 설명 반영; `statCaps.js`/`createEngine.js` `scalePositiveCorruption`(`omega_pariah`×0.15, `blank`×0.50, `ophelia7`×0.85) 및 `isTraitImmune`(`shell_shocked` 초인·크리그, `warp_scarred` 오염면역·무혼) 전 경로 통합 완료.

- [x] **`[P1-02]` 모성 특전 · 선천 재능 UI 표기와 실제 엔진 구현 100% 일치화**
  * `geneseedTrial` +8%, `abhuman_ogryn` 물리 부상 ×0.80, `armageddon` 위험 ×0.85, `necromunda` 자연 회복 +1, `ophelia7` 오염 ×0.85, `vostroya` BS +3, `ratling`/`cadia`/`krieg`/`tanith`/`voidborn` 보정 수치 100% 일치화; `origins.js` `mechanicus_menial` 크리그 제외 및 `freak_physique` 쿠스토데스 제거 완료.

- [x] **`[P1-03]` `FullChronicleView` 필터 오분류 & `applyChronicle` `removeTags` 거짓 로그 & `GameApp` `prevTopLog` 가드**
  * 3건 전량 수정 완료.

- [x] **`[P1-04]` 코덱스 5개 페이지 `client:idle` 지연 하이드레이션 초점 탈취 해소**
  * `pages/codex/*.astro` `client:load` 복원 + `CodexExplorer.tsx` 초기 해시 포커스 안전 가드 + `codex/index.astro` `메렉 그리말두스` 정정 완료.

- [x] **`[P1-05]` `DossierPanel` 후천 각성 특이점 표시 · `StartScreen` 라디오 접근성/속어 제거 · `HallOfSoulsApp`/`storage.ts`/`migrateState` 방어**
  * `ANOMALY_TAG_EFFECTS.summary` + `getAwakenedAnomalies(state)` 표시, `StartScreen.tsx` 라디오별 정적 `aria-describedby` + `"불운·부조리"`, `HallOfSoulsApp.tsx` `c.id === "living_saint"`, `storage.ts` 24태그 상한, `migrateState` 유한 수치/`null` 비강제 변환/포커스/`pendingEvent.choices` 방어 완료.

- [x] **`[P1-06]` QA 스위트 거짓 양성 사각지대 영구 봉쇄 (`scripts/qa.mjs`, `personaGate.mjs`, `audit-health.mjs`, `tests/game-a11y.test.tsx`)**
  * `validateEventChoices`(정적 + 4대 동적 생성기 전수), 연대기 `effect.stats`/월드태그, Stage 23.5 회귀 단언, Gate 3 비표준 판정 라벨 차단, `personaGate.mjs` 양 난이도 스캔, `audit-health.mjs` 100+100 혼합 퍼징·무음 선택지 단언, Vitest #25~#27(27/27 PASS) 완료.

- [x] **`[P1-07]` 코어 직군 `offerPitch` M41 초중반 시대착오 4건 & 직군 자격 `excludeTags` 누수**
  * 4건 시대착오 제거, `blank`/`abhuman`/`psyker`/`navigator` 직군 가드 보강, 항법사 검은 함선/`sanctioned_psyker` 면제(`faith_shadow.js` · `careerRules.js` · `createEngine.js`) 완료.

- [x] **`[P1-08]` 판정 라벨 불일치 10곳 통일 & 잔여 사건/연대기 정합성·출처 수정**
  * 판정 라벨 10곳 통일, `bonds_s21_6.js`·`anomalies_s21.js`·`wear_tradeoff.js`·`grimdark_s22.js`·`xenos.js`·`crises_*`·`alignment_dilemmas.js`·`chaos_warp.js`·`lifecycle_elder.js`·`grimdark_misfortune.js`·`guardsman_grimdark.js` 정합성 및 출처 전량 교정 완료.

---

### 2.3 `[P2]` 표기 통일 · 오탈자 · UX/문서 다듬기

- [x] **`[P2-01]` 비표준 표기 및 오탈자 일괄 교정:** `코지테이터`, `플라즈마`, `겔러 필드`, `독한 리카프`, `육성 대화`, `검은 함선`, `이를 악물고`, `"그대"`, `낙하산 줄이`, `선봉 차량의`, 메타 괄호 제거, `손에 쥐여 있었다`, `야만 행성`, `이름을 높였다`, `강철 대들보`, `유전적 특이점`, `철필`, `메디카에`, `오크 놉`/`메가놉`/`초파`*(나무위키 `놉(워해머 40,000)`·`메가놉` 기준 전 코퍼스 8파일 28곳 일괄 교정 및 `AGENTS.md` §5.1 · `qa.mjs` Gate 3 등록)*, `황제의 발톱`, `Geller Field Lore`, `외계 둥지` 전량 통일 완료 (`travel.js`·`childhood*.js`·`chronicles/worlds.js` 레거시 포함).
- [x] **`[P2-02]` UI 접근성 미세 다듬기:** `ActiveEventPanel.tsx` 보유/면역 예고 필터, `ObituaryModal.tsx` `aria-labelledby="obit-rank obit-title"`, `DossierPanel.tsx` `<dl>` 직계 `<dt>`/`<dd>` 완료.
- [x] **`[P2-03]` 출생 조합 고증 & 문서 동기화:** `navigator_house` 양립 불가 자질 제외(`blank`/`omega_pariah`/`abhuman_*`/`psyker`/`alpha_plus_psyker`), `worlds.js`·`faith_shadow.js` 주석, `glossary.js` 게임 시스템 2항목, `PROJECT_GUIDE.md`·`README.md`·본 문서 동기화 완료.

---

## 3. 실행 Phase 및 파일 배타적 소유권 맵 (이행 완료)

1. **`23.5-A` (메인 단독 소유 — 엔진 & 코어):** 완료
2. **`23.5-B` (메인 단독 소유 — UI & 스토리지):** 완료
3. **`23.5-C` (메인 — QA · 퍼징 · Vitest):** 완료
4. **`23.5-D` (`iv_data_writer` 5트랙 병렬 D1~D5):** 완료
5. **`23.5-E` (최종 통합 검증 · 3인 읽기 전용 재감사 `PASS` · 문서/Git 마감):** 완료

---

## 4. Stage 23.5 최종 재감사 통과 기록 (`PASS`)

* **최종 통합 검증 (`npm run verify && npm run qa:deep && npm run coverage`):** 전 항목 **0오류 · 0경고**
  * `qa`: 6대 게이트 0오류 (`Gate 4P` 17페르소나 × 2난이도 `collisions=0`)
  * `audit` (`seed=886717141`, `standard=100, grimdark=100`): `crashes=0, softlocks=0, emptyOutcomes=0, silentChoices=0, incorruptibleLeaks=0, retireExecOK=1/1, maxSave=709.8KB, nearLimit=0`
  * `typecheck`: 0오류 · `vitest`: **27 / 27 PASS** · `astro build` + `qa:dist` Gate 8: 0오류
  * `qa:deep`: 7대 게이트 0오류 (`2,186 req specs`, `91/91 directCareerMatch`, `120 edges / 0 cap deadlocks`, 1,500 표준 + 300 그림다크 `standardLeaks=0`)
* **독립 3인 읽기 전용 최종 재감사 (`enable_write_tools: false`, `Model: "inherit"`):**
  * `iv_lore_auditor`: **`PASS`** (`P0` 0건 · `P1` 0건 · `P2` 0건)
  * `iv_prose_a11y_critic`: **`PASS`** (`P0` 0건 · `P1` 0건 · `P2` 0건)
  * `iv_redteam_reviewer`: **`PASS`** (`P0` 0건 · `P1` 0건)
