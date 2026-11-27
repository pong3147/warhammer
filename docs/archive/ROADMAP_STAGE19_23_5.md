# 1 / QUADRILLION : IMPERIALIS VITA — 완료 로드맵 아카이브 (Stage 19 ~ Stage 23.5)

> 본 문서는 100% 완료된 **Stage 19 ~ Stage 23.5 (시뮬레이션 4대 대개편 · 110KB 모듈화 · M41 시대/극단 판정 · 이중 스탯 캡/특이점/후천 특성 · 인연 연작 · 표준 vs 그림다크 · 100세+ 동적 작전 · 통합 안정화)**의 상세 설계·완료 보고서를 무손실 보존하는 아카이브다.
> Stage 21~23 3인 감사 및 23.5 전수 해소 체크리스트는 [`AUDIT_STAGE21_23.md`](./AUDIT_STAGE21_23.md), 이전 완료 기록은 [`ROADMAP_STAGE01_18_6.md`](./ROADMAP_STAGE01_18_6.md), 현행 기준 문서는 [`PROJECT_GUIDE.md`](../../PROJECT_GUIDE.md)를 참조한다.

---

## 10. 19단계 정비 · 고도화 완료 (19-S1/S2 · 19-A/B/C · 19-M1/M2 · 19-D) `[완료]`

5차 인류제국 대확장(12~18단계) 및 Astro + React 아일랜드 전환·후속 고도화(18.5~18.6단계)는 100% 완료되었다. 향후 착수할 19단계는 **① 실플레이 기반 4대 시뮬레이션 몰입감·정합성 대개편(`19-S1` · `19-S2`, 사용자 확정 완료)**과 **② 기존 확정 정비 과제(`19-A` · `19-B` · `19-C`)**로 구성하며, 독립 커밋·검증이 가능하도록 단계별로 순차 수행한다.

### 10.1 시뮬레이션 정합성 · 진로 · 이동 · 스탯 4대 대개편 (`19-S1` / `19-S2` · 사용자 권장안 확정)

> **확정된 3대 핵심 규칙 (사용자 승인 · 실구현 고증 반영):**
> 1. **14세 귀족 출신 초기 배치:** `planetary_noble` · `rogue_trader_scion` · `terra_high_blood`는 `schola_progenium`과 동일하게 **14~18세 가문 수습 기간(미확정)**을 두어 `minAge: 18` 정규 기관(`arbites`, `commissar`, `inquisition_acolyte`, `tech_priest` 등)까지 온전한 1년간 직접 선택하게 하고, **19세 진입 시** 미선택이면 `administratum`(아인종 `pdf_trooper`, 이단자 `chaos_cultist`)에 자동 편입한다(세습 가문 `knight_blood` -> 종자, `navigator` -> 견습 항법사, `mechanicus_blood` -> 스키타리는 14세 자동 편입 유지).
> 2. **입단 심사 & 복무 쿨다운:** 일반 기관 입단 심사(비치명적 d100) 탈락 또는 선발 시련 생존 탈락 시 **2년 재지원 대기**, 정규 서약 기관 취임 후 타 수동 전직까지 **2년 최소 복무 기간** 적용(동적 발탁·스카우트 이벤트, 사건 `forceCareer` 및 초인·카오스 전환은 예외).
> 3. **행성 출입 자격 기준:** 아스타르테스 모성(`baal`, `fenris`, `nocturne`)은 해당 챕터·이단심문소·Tier 5+ 지휘관·전시 구원군으로 격리하고, `terra`는 소속 기관·임페리얼 피스트·고위직·성직 순례(`faith >= 65`)·**귀족 권위 45+** 청원을, `mars`는 화성 조약 고증에 따라 국교 순례 대신 기계교·제국 해군·기사 가문·이단심문소·테크마린·고위직·**귀족 권위 45+** 청원을 허용한다.

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **19-S1 (Phase A). 신분·생활권 정합성 개편 & 14종 페르소나 자동 QA** | `[완료]` | **① 선언적 계층 축 도입 (`src/engine/formatters.js`, `createEngine.js`):** `makeReqContext`에서 `socialTier`(`underclass`/`common`/`elite`/`apex`), `lifeRealm`(`civilian`/`cloistered`/`military`/`void`/`mechanicus`/`heretic`), `bodyClass`(`mortal`/`augmetic`/`transhuman`/`dreadnought`/`daemonic`) 자동 산출 및 `checkReq`/`describeReq` 지원(`minSocialTier`, `maxSocialTier`, `anySocialTiers`, `anyRealms`, `excludeRealms`, `anyBodyClasses`, `excludeBodyClasses`, `excludeTrees`, `maxCareerTier`). **② Gate 4P 신설 (`scripts/qa.mjs`):** 대표 페르소나 14종(테라 고위 귀족/하이브 귀족/스콜라/기사/항법사/크리그/보이드본 유아 + 아스타르테스/드레드노트/쿠스토데스/그레이 나이트/하이 로드/리빙 세인트/데몬 프린스)에 대해 전체 사건·연대기 금칙어 충돌 0건 및 유년기/성인기 최소 풀 하한(`>= 8`) 자동 검증. **③ 데이터 정합화 & 유년기 보강:** 배급소 통조림·하층민·생활권·신체 누수 일괄 교정 + [`src/data/chronicles/childhood_elite.js`](../../src/data/chronicles/childhood_elite.js) `+24종` 및 `chaos_endgame.js` `+4종`(총 `790건`, 16개 파일) 확충. |
| **19-S2 (Phase B). 진로 서약·스카우트 · 성간 이동 현실화 · 무하락 스탯 인플레 억제** | `[완료]` | **① 정규 기관 소속 고정 & 입단 심사 & 스카우트 초빙 (`createEngine.js`, `AutonomousPanel.tsx`):** `SAVE_VERSION = 4`(`careerRetryAfter`, `lastCareerChangeYear` 자동 마이그레이션). 비구속 초년·민간(`child`, `menial_worker`, `underhive_ganger`, `underhive_boss`, `guild_artisan`, `pdf_trooper`)에서 정규 서약 기관 입단 시 비치명적 입단 심사 d100(목표 40~88%, 탈락 2년 대기, 합격 2년 최소 복무) 적용, 입단 후 수동 목록은 같은 트리 승급·카오스·초인/동급 이상 사이커만 노출해 수평 이직 쇼핑 차단(`CLOSED_VOW_TREES` 종신 서약 격리). 단, 고권위(`Inf >= 52`) 또는 성향·스탯 정합성 충족 시 타 기관에서 먼저 찾아오는 **동적 초빙·차출(스카우트) 이벤트** 신설. **② 성간 이동 현실화 (`createEngine.js`, `AutonomousPanel.tsx`):** `canAccessWorld(state, world)` 출입 자격 매트릭스 적용(아스타르테스 모성·화성 조약·크리그/카타찬·테라·기사 행성 격리), 말단 의무 복무자(`forced` · `astartes_scout`) 수동 행성 선택 잠금(강제 파견 일관화), 야만 행성 일반 시민 이탈 불가, 귀족 `Inf < 45` 인접 성역 / `45+` 은하 전역, 이동 쿨다운 4년(`autonomous` 3년), `createDynamicTransitEvent`에 카오스/이단 전용 분기 및 행정청 감사·국교 순례·귀족 알현·전시 비상 동원 등 비군사 강제 소환 확대. **③ 억지 하락 없는 스탯 인플레 억제 (`createEngine.js`, `ActiveEventPanel.tsx`):** 스탯 임의 감소 0건 유지; `applyDiminishedStatGain`으로 패시브·사건·입단 수확 체감 도입; `computeCheckPreview` 단일 정본 도입(부상 `-8/-16`, 오염 `-8/-15`[카오스 면제], 임페리움 니힐루스 `-5`, 고위 난제 `-5/-9` 투명 표시 + 70% 초과 완만 압축 `max 90%`). **④ QA·테스트·교차 감사·레드팀:** `qa.mjs` Gate 4/4P(15종 페르소나+타 행성 방문·성인 귀족)·Gate 7A/7C 1,500생애 검증 · Vitest 12/12 · 독립 교차 감사 + 2단 레드팀(P0 1·P1 5·P2 5) 전량 해소. |

#### 10.1.1 19-S1 (Phase A) 완료 보고서 (달성도 100% · 19단계 누적 진행률 1/2)

* **구현 및 교차 감사 보완 내역:**
  1. **선언적 계층 엔진 (`src/engine/formatters.js`, `src/engine/createEngine.js`):** `computeSocialTier` · `computeLifeRealm`(보이드본 모성 우선 판정으로 함선 아동의 행성 야외·날씨 누수 차단) · `computeBodyClass` 및 `getStratification(state)` 추가. `checkReq` · `describeReq`(다중 제외 축 병렬 표기 수정 포함)에 9종 조건 키 전량 지원.
  2. **신규 전용 연대기 (+28건, 762 -> 790건 / 16개 파일):** [`src/data/chronicles/childhood_elite.js`](../../src/data/chronicles/childhood_elite.js) `+24건`(테라 고위 귀족 5 · 하이브 귀족 5 · 스콜라 프로제니움 6 · 나비스 노빌리테 4 · 기사 가문 2 · 보이드본 2, `priority: 3`) + [`src/data/chronicles/chaos_endgame.js`](../../src/data/chronicles/chaos_endgame.js) 데몬 프린스 전용 `+4건`(14건).
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
| **19-A. 네임드 출연 원칙 정돈 (1번 대안 확정)** | `[완료]` | **「기본 1사건 = 핵심 네임드 1인 스포트라이트, 다중 출연(<=2인)은 협동·대면 전용 크로스오버 스토리 한정」** 원칙([`AGENTS.md`](../../AGENTS.md) 2.2장 6항)을 전면 구현·자동화. `TIMELINE` 다중 스포트라이트 13건을 대표 핵심 1인 중심으로 정돈하고 본문 미등장 전역 속보 2건(`tl_great_rift`, `tl_fourth_tyranic`)의 불일치 스포트라이트를 제거했으며, 분리된 핵심 대면 6건을 `src/data/events/themes/named_crossover.js`에 정사 2인 크로스오버(+6종 -> 총 14종, `EVENTS 670 -> 676` / 역사 포함 `699 -> 705`)로 신설했다. |
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

> **완료 보고 (`AGENTS.md` 1장 준수):** 19단계 완료 직후 [`scripts/coverage-report.mjs`](../../scripts/coverage-report.mjs) 실측과 19-D 레드팀 리스크 메모를 바탕으로, **① `createEngine.js`/`scripts/qa.mjs` 선제 모듈화 · M41 역사 연표 3대 진입 병목 교정 · `critSuccess`/`critFail` 선택적 서사 스키마 활성화(`20-A`)**, **② 플레이 체감 공백 최상위 4대 축(중노년·고령 46~100세, 무명 8행성, Tier 2~4 중견 직군, 초인·고위직 초점 3막 및 교조/자비 고위 딜레마) 대보강(`20-B`)**, **③ 독립 2인 교차 감사(`iv_lore_auditor` · `iv_prose_a11y_critic`) 및 2단 레드팀 리뷰(`iv_redteam_reviewer`) P0/P1 전량 해소(`20-C`)**를 100% 완수했다. (외계 종족 스타팅 등 L4 방향 전환은 사용자 사전 확정 영역으로 본 단계 범위에서 제외했다.)

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

## 12. 21단계 고도화 완료: 종족·승급 해금 스탯 캡(`statCaps`) · 극희귀 「규격 외 특이점」 돌파 & 일상 연대기 리밸런싱 (`Stage 21`)

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
| **`freak_physique` (규격 외 피지컬 괴물 · 슬라이 마보형)** | 출생 `~0.8%` 또는 유년·청년기 대성공 각성 | **필멸자 신체 상한 `+14`**(유년 58 · T1~2 69 · T3 76 · T4~6 80~82, 일반 마린급 야성 · 초인 전직 시 빠른 최정점 도달) | 맨손·단검으로 갱단 보스·오크 놉을 도륙하는 괴담 -> **아스타르테스 채플린·징병관의 모성 외 직접 시련 제안(유전 적성 미보유도 개방) · 아뎁투스 쿠스토데스 '황제의 눈' 감찰(테라/유년) · 암살청 에버서/빈디카레 납치 스카우트** |
| **`savant_genius` (천년만의 전략·지성 사반트 · 마카리우스형)** | 출생 `~0.7%` | **`Int`·`Fel` 상한 `+16`**(말단 티어에서도 `76~88` 돌파) / 상관의 시기·암살 위협 | 말단의 전술안·십일조 감사가 성역 위기를 구함 -> **이단심문관·아크마고스·로그 트레이더·가드 사령관 직통 티어 점프 발탁** 및 테라 하이 로드 계보 조기 진입 |
| **`omega_pariah` (절대 무혼 · 오메가-마이너스 블랭크)** | 출생 `~0.4%` | **`WP` 상한 `+18`** · 워프 오염 극강 저항 / 대신 **`Fel` 상한 `-20`**(주변의 본능적 공포·배척) | 접근한 사이커·악마가 피를 토하며 붕괴 -> **침묵의 자매들(여성) · 쿨렉수스 암살청 · 쿠스토데스 황제의 발톱 합동 소환 · 오르도 말레우스 전속 차출** |

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

## 13. 22단계 고도화 완료: 「표준 vs 그림다크(1 / QUADRILLION 하드코어)」 모드 분리 & 워해머 공략형 억까 사건 팩 (`Stage 22`)

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

---

## 14. 23단계 정비 · 고도화 완료: QA/테마 파일 선제 분할 · 100세+ 초장수 동적 작전 풀 & 후천 특성/극단 판정 점진 확장 (`Stage 23`)

> **착수 전 계획 선기록 (`AGENTS.md` 1장 준수):** Stage 22까지 이월된 구조 유지보수 과제(`scripts/qa.mjs` Gate 7 모듈 분리, 110KB 상한에 근접한 3대 테마 파일 선제 분할)와 `[후순위 보류 후보]`(100세+ 초장수자 전용 동적 순찰·유물 회수 풀, 기존 핵심 사건의 12종 후천 특성 및 `critSuccess`/`critFail` 점진 확장)를 3개 페이즈(`23-A` · `23-B` · `23-C`) + 통합 검증(`23-D`)으로 일괄 정비한다.

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **23-A (Phase A). QA `Gate 7` 모듈화 & 중대형 테마 사건 3종 선제 분할** | `[완료]` | **① `scripts/qa/careerGate.mjs` 분리:** `scripts/qa.mjs`(2,816줄 · 138KB)의 `Gate 7A/7B/7D`(~680줄)를 `runCareerAuditGate`로 무손실 분리하고, Gate 2/8 감시 목록에 `centenarianOps.js`를 추가했다. **② 3대 테마 사건 파일 2분할 (0건 차이 무손실 검증):** `alignment.js`(93.2KB · 30건) → `alignment_axes.js`(24건) + `alignment_dilemmas.js`(6건), `lifecycle.js`(86.9KB · 33건) → `lifecycle_early.js`(16건) + `lifecycle_elder.js`(17건), `crises.js`(87.4KB · 24건) → `crises_warfare.js`(12건) + `crises_imperial.js`(12건)로 분할(`deepStrictEqual` 100% 일치 검증) 후 원본 3파일을 삭제했다. |
| **23-B (Phase B). 100세+ 초장수 동적 작전 풀 (`src/engine/centenarianOps.js`)** | `[완료]` | 정적 `maxRepeat <= 2` 불변식을 유지하면서 100세 이상 초인·불멸자·장수 필멸자의 정적 구간(`maxAdultQuietQ`)을 완화하기 위해 `createDynamicCentenarianEvent(state, reqCtx, helpers)` 동적 생성기를 신설했다(4년 쿨다운 `lastCentenarianOpYear`, 최근 6종 제외 `recentCentenarianOps`, 제국 초인 5종·장수 필멸자 5종·카오스 불멸자 4종 = 14종 변주, 무조건 선택지 + d100 판정 + `critSuccess`/`critFail`). `createEngine.js` `migrateState` 하위 호환 포함. |
| **23-C (Phase C). 기존 핵심 사건 후천 특성(12종) & `critSuccess`/`critFail` 점진 확장** | `[완료]` | `AGENTS.md` 3.6항(한 생애 긍정 1~2 / 부정 0~2, 남발 금지, 전화위복 승화)에 따라 기존 핵심 테마 사건 15건(`crises_warfare.js` 3 · `alignment_dilemmas.js` 3 · `crises_imperial.js` 3 · `chaos_warp.js` 2 · `xenos.js` 2 · `lifecycle_elder.js` 2)에 `silver_tongue`/`notorious_ruthless` 전용 선택지, `removeTags` 치유·속죄, `critSuccess` 승화, `critFail` 위기 분기를 보강했다. |
| **23-D (Phase D). 테스트 · 통합 QA · 문서 동기화** | `[완료]` | `tests/game-a11y.test.tsx` Stage 23 회귀 테스트(#24) 추가, `npm run verify` + `npm run qa:deep`(1,500생애 + Grimdark 300생애) 0오류 통과, `PROJECT_GUIDE.md` 수록 현황 및 완료 보고서 갱신 완료. |

#### 14.1 Stage 23 완료 보고서

* **단계 달성도 및 전체 누적 진행률:** Stage 23(`23-A` ~ `23-D`) 1차 구현 후 `fix/stage23-5-stabilization` 브랜치에서 **Stage 23.5 통합 안정화(`23.5-A` ~ `23.5-E`)**를 100% 완료하고 3인 읽기 전용 재감사 전원 **`PASS` (`P0`/`P1` 0건)**를 확보해 `main`에 병합 완료했다.
* **Stage 23 1차 검증 실측 기록 (참고):** `qa` 6게이트 / `audit` 200생애 / `typecheck` / Vitest 24/24 / Astro 9페이지 / `qa:deep` 7게이트 0오류 통과 후, Stage 23.5에서 4대 동적 생성기·양 난이도 퍼징·페르소나 감사를 보강해 최종 통합 검증했다.

---

## 15. 23.5단계 통합 안정화 완료: Stage 21~23 엔진 · UI/접근성 · QA 맹점 · 고증/정합성 전면 수습 (`Stage 23.5`)

> **완료 보고 (`AGENTS.md` 1장 준수):** `2858b66`(Stage 21), `027800e`(Stage 21.5·21.6·22), 그리고 `fix/stage23-5-stabilization`의 Stage 23 변경분 전반에 대해 수행한 최초 3인 읽기 전용 감사(`docs/archive/AUDIT_STAGE21_23.md`)의 **모든 `[P0]`(11그룹)·`[P1]`(8그룹)·`[P2]`(3그룹) 결함**과 최종 재감사에서 추가 발견된 `P1` 5건까지 전량 해소했다.
> **상세 결함 전수 체크리스트 및 재감사 통과 기록:** [`docs/archive/AUDIT_STAGE21_23.md`](./AUDIT_STAGE21_23.md) 참조.

| 단계 | 상태 | 목표 범위 및 세부 설계 명세 |
| --- | --- | --- |
| **23.5-A (Phase A). 엔진 코어 · 치유/면역 · 모성/재능 SSOT · 코어 직군 고증 수습** | `[완료]` | **메인 단독 소유:** ① `centenarianOps.js` 14종 Choice 0 중첩 스키마 평탄화 + `[XX 판정]` 접두어 + `다크 메카니쿰`/`블랙스톤 파편과 워프 합금`/`외계 둥지` + `saint_vessel`/쿠스토데스/드레드노트/테라/야만/크리그/오그린/암살청/니힐루스 정합화. ② `careerActions.js` `canUsePenance` 오염 0 `shell_shocked`/`warp_scarred` 치유 개방. ③ `statCaps.js`/`createEngine.js` 초인·크리그 `shell_shocked` 및 오염면역·무혼 `warp_scarred` 면역 + `applyOutcome`/`applyChronicle` `blank`/`omega_pariah`/`ophelia7` 오염 감쇠 + `ogryn` 부상 20% 경감 + `applyChronicle` `removeTags` 거짓 치유 로그 차단 + `migrateState` 유한 수치/`null` 비강제 변환/포커스/`pendingEvent.choices` 방어 + `navigator_house` 출생 양립 불가 자질(`blank`/`omega_pariah`/`abhuman_*`/`psyker`/`alpha_plus_psyker`) 차단. ④ `worlds.js`/`origins.js`/`careerRules.js`/`statCaps.js` 모성·재능 특전 수치·미구현(`armageddon`/`necromunda`/`ophelia7`/`vostroya`/`geneseedTrial +8`) 100% 일치화 및 `ANOMALY_TAG_EFFECTS` `summary` 노출. ⑤ `careers/*.js` 국교 3직군 아인류/사이커 제외, `chaos_champion` `"다크 데마고그"` 교정, 최고위 `offerPitch` 4건 시대착오 제거, 항법사 검은 함선/`sanctioned_psyker` 면제(`isManualCareerAllowedPure` 일관화 포함) 및 누락 `excludeTags` 보강. |
| **23.5-B (Phase B). UI · 스크린 리더 접근성 · 세이브/전당 결함 수정** | `[완료]` | **메인 단독 소유:** `GameApp.tsx` `handleChooseEvent` `prevTopLog` 가드, `FullChronicleView.tsx` `chronicle-grim` 일상 필터 복원, `DossierPanel.tsx`·`global.css` 후천 각성 특이점 표시 및 `<dl id="stats-grid">` 직계 `<dt>`/`<dd>` 정리, `ActiveEventPanel.tsx` 특성 예고 보유/미보유/면역 필터, `StartScreen.tsx` 라디오별 정적 `aria-describedby`·`"공략형 불운·부조리 사건"` 순화, `ObituaryModal.tsx` `aria-labelledby="obit-rank obit-title"` 연결, `HallOfSoulsApp.tsx` `saint_vessel` 마일스톤 오인정 수정, `storage.ts` `tags` 상한 `20→24`, `codex/*.astro` `client:load` 복원 + `codex/index.astro` `메렉 그리말두스` 정정 + `CodexExplorer.tsx` 초기 해시 초점 탈취 가드. |
| **23.5-C (Phase C). QA 스위트 · 퍼징 · Vitest 사각지대 영구 봉쇄** | `[완료]` | `scripts/qa.mjs` 공용 선택지 검증기 `validateEventChoices`로 정적 + 4대 동적 생성기(`centenarianOps` 14종/`careerRules`/`travel`/`endings`) 전수 검증 + `CHRONICLES` `effect.stats`/월드태그 검증 + `canUsePenance` 오염 0 치유·초인/무혼 면역·`anomalies_s21` `minAge >= 14`·`ev_s21_anom_13` `maxCareerTier <= 3`·항법사 사이커 면제·`migrateState` `null` 방어·비표준 판정 라벨 차단 회귀 추가. `scripts/qa/personaGate.mjs` `standard`+`grimdark` 이중 패스 편입. `scripts/audit-health.mjs` `standard` 100 + `grimdark` 100 혼합 퍼징 + 매 `resolvePendingChoice` `outcome`·신규 로그 단언 추가. `tests/game-a11y.test.tsx` Stage 23.5 회귀 테스트(#25~#27, 총 27개) 추가. |
| **23.5-D (Phase D). 서사 · 연대기 데이터 고증 · 정합성 · 표기 5트랙 병렬 교정** | `[완료]` | **`iv_data_writer` 5트랙 배타적 파일 병렬 수정 + 레거시 표기 정리:** ① D1(`wear_tradeoff.js` `S`/`Per` 11건·`"cold"`·리빙세인트·표기, `chronicles/anomalies_s21.js`), ② D2(`events/themes/anomalies_s21.js` 12건 `minAge`·침묵의 자매들 전면 개고·`ev_s21_anom_13` `assassin_initiate`/`maxCareerTier: 3`, `acquired_traits_s21.js`), ③ D3(`bonds_s21_6.js` 사건·연대기 이브람 건트 `"대령-커미사르"`·단테·갱단 배교 분리·메타 괄호 제거·크리그/드레드노트 가드), ④ D4(`guardsman_grimdark.js`, `grimdark_misfortune.js`, `grimdark_factions.js`, `grimdark_s22.js` 크리그·야만·`maxCareerTier`·드레드노트·표기/호칭 통일), ⑤ D5(`crises_warfare.js`, `crises_imperial.js`, `alignment_dilemmas.js`, `chaos_warp.js`, `xenos.js`, `lifecycle_elder.js` 초인·면역자·드레드노트·비툼 네임드 행성·잔여 가드) + `travel.js`/`childhood.js`/`childhood_elite.js`/`chronicles/worlds.js`/`glossary.js` 잔여 표기·규칙 현행화. |
| **23.5-E (Phase E). 통합 검증 · 3인 읽기 전용 재감사 `PASS` · 문서 동기화 · `main` 병합** | `[완료]` | `npm run verify && npm run qa:deep && npm run coverage` 전 항목 **0오류 · 0경고** 확인. 독립 읽기 전용 감사관 3인(`iv_lore_auditor` · `iv_prose_a11y_critic` · `iv_redteam_reviewer`) 1차 재감사에서 추가 발견된 `P1` 5건(`ev_s21_anom_13` Choice 0 `maxCareerTier: 3`, Vitest #27 거짓 양성 단언 정정, `navigator_house` 항법사 사이커 면제, `ev_s22_guard_03` 크리그 제외, `centenarianOps` `isKrieg`/`isOgryn`/`isAssassin`/`isVoidCapable`) 및 `P2` 전량 수정 후 **3인 전원 최종 `PASS` (`P0` 0건 · `P1` 0건)** 달성. `PROJECT_GUIDE.md` · `README.md` · `docs/archive/AUDIT_STAGE21_23.md` 동기화 및 `main` 병합·푸시 완료. |

#### 15.1 Stage 23.5 완료 보고서 (달성도 100% · 23.5-A~E 5/5 완료 · 잔여 미완 과제 0건)

* **누적 코퍼스 및 검증 현황:** `WORLDS=23`, `ORIGINS=11`, `TRAITS=12`, `CAREERS=91 (+child)`, `CHAPTERS=9`, `CHARACTERS=28 (100% 커버)`, `TIMELINE=29`, `EVENTS=788 (역사 포함 817)`, `CHRONICLES=936`, `GLOSSARY=48`, 엔진 **9모듈**, Vitest **27/27 PASS**.
* **최종 통합 검증 실측 결과 (`npm run verify && npm run qa:deep && npm run coverage`, 0오류 · 0경고):**
  * **`npm run qa` (300생애):** **ALL 6 QA GATES PASSED WITH 0 ERRORS · 0 WARNINGS** (`15 core, 62 events, 22 chronicles, 9 engine, glossary=48; maxCore=67.1KB, maxEngine=77.0KB, maxEv=87.0KB, maxCh=44.9KB`, Gate 2 25파일, Gate 3 136파일 표기·기호·판정 라벨 0건, Gate 4 정적+4대 동적 생성기 전수 검증, **Gate 4P 17페르소나 × 2난이도 `collisions=0, minChroniclePool=9 >= 8`**, Gate 5 `Softlocks=0, dupRate=23.8%`, Gate 6 `maxRepeat=2, nihilusMismatch=0, childStuck=0, reachedCareers=59/91, 1000q=1095.5ms`).
  * **`npm run audit` (`seed=886717141`, 200생애: `standard=100, grimdark=100`):** `crashes=0, softlocks=0, emptyOutcomes=0, silentChoices=0, migrateFailures=0, unknownIdWarnings=0, incorruptibleLeaks=0, retireExecOK=1/1, mortalOver300=0, avgLogChars=74.1, maxLogChars=217, maxAdultQuietQ=23, namedSpotlights=996(repeat=120, missingPrevMet=0), maxSpotlightCards=2, apexProbesOK=8/8, maxSave=709.8KB <= 2048KB, nearLimit=0`.
  * **`npm run typecheck`:** **0 ERRORS.** **`npm test` (`tests/game-a11y.test.tsx`):** **27 / 27 PASS** (8.98s).
  * **`npm run build && npm run qa:dist` (`astro@7.4.13`):** 9페이지 정적 빌드 완료(2.72s, 0오류) + **Gate 8 0오류** (`codexOverviewJS=0KB, codexStaticJS=488.2KB, hallStaticJS=500.4KB, narrativeLeaks=0, engineLeaks=0, glossaryProseInGame=0, SSR cards 48/23/91/9/29/28`).
  * **`npm run qa:deep` (1,500 표준 + 300 그림다크):** **ALL 7 QA GATES PASSED WITH 0 ERRORS · 0 WARNINGS** (`Gate 7A/7B`: `92 nodes, 78 anyPastCareers, 2,186 req specs reachable, directCareerMatch=91/91`, `Gate 7D`: `120 direct edges, 0 cap deadlocks`, 1,500생애 `maxRepeat=2, reachedCareers=71/91, naturalEvents=617/788, 1000q=1071.7ms`, 3대 성향 비교 `humane 43/45 · dogmatic 40/45 · ruthless 41/45`, `Grimdark Probe` 300생애 `medAge=40, violent=86%, grimdarkEvents=723, reachedCareers=55/91, standardLeaks=0`).
* **독립 3인 읽기 전용 최종 재감사 판정:**
  * `iv_lore_auditor` (`enable_write_tools: false`): **`PASS`** (`P0` 0건 · `P1` 0건 · `P2` 0건)
  * `iv_prose_a11y_critic` (`enable_write_tools: false`): **`PASS`** (`P0` 0건 · `P1` 0건 · `P2` 0건)
  * `iv_redteam_reviewer` (`enable_write_tools: false`): **`PASS`** (`P0` 0건 · `P1` 0건)
* **차기 단계(Stage 24+) 선제 리스크 & `[후순위 보류 후보]` (레드팀 소견):**
  1. `src/engine/createEngine.js`(`1,913L / 77.0KB`)가 경고선(`1,950L`)까지 37줄 여유이므로, 차기 기능 확장 전 `migrateState`/`createCharacter` 생명주기 함수를 별도 무순환 모듈(`stateLifecycle.js`)로 선제 분리 권장.
  2. `scripts/qa/careerGate.mjs`에 `forceCareer`(비카오스 Tier `N`) + 폐쇄 서약 `addTags` 선택지의 상위 티어 강등 누수 범용 정적 검사 편입 권장.
  3. `[후순위 보류 후보]` `centenarianOps.js` 테라 주둔 쿠스토데스·살아 있는 성인 전용 100세+ 작전 2종 보강.
