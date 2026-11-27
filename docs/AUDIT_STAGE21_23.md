# Stage 21~23 전방위 검수보고서 & Stage 23.5 통합 안정화 인계서

> **작성 배경:** `2858b66`(Stage 21), `027800e`(Stage 21.5 · 21.6 · 22 일괄 커밋), 그리고 `fix/stage23-5-stabilization` 브랜치의 Stage 23 변경분 전체를 대상으로, **메인 오케스트레이터 엔진 9모듈 직접 판독** + **독립 읽기 전용 감사관 3종(`iv_redteam_reviewer` · `iv_lore_auditor` · `iv_prose_a11y_critic`) 병렬 교차 검수**를 수행해 도출한 공식 결함 체크리스트 및 수습 실행 명세서다.
>
> **작업 브랜치 안내:**
> * `main` 브랜치는 `027800e` 상태 그대로 보존되어 있다(`deploy.yml` GitHub Pages 프로덕션 배포 보호).
> * 본 브랜치 **`fix/stage23-5-stabilization`**에 Stage 23 변경분 + 본 검수보고서 + `PROJECT_GUIDE.md` Section 15 계획이 커밋되어 있다.
> * **새 세션 작업 절차:** `fix/stage23-5-stabilization` 브랜치에서 `23.5-A` → `23.5-B` → `23.5-C` → `23.5-D` → `23.5-E` 순으로 수습 완료 후, `npm run verify && npm run qa:deep` 0오류 및 3인 읽기 전용 재감사 `PASS`를 확인하고 `main`에 병합·푸시한다.

---

## 1. 검수 요약 (최초 판정: `FIX_REQUIRED`)

| 감사 주체 | 판정 | 핵심 발견 요약 |
| :--- | :---: | :--- |
| **`iv_redteam_reviewer`** (엔진 · UI · 세이브 · QA) | `FIX_REQUIRED` | **`P0` 1건 · `P1` 6건 · 구조 리스크 3건:** `centenarianOps.js` 14종 Choice 0 스키마 중첩 무음 증발 + `#sr-live` 구 로그 오낭독, `canUsePenance` 오염 0 차단, 모성/재능 특전 수치·미구현 괴리, 그림다크 QA 맹점, `FullChronicleView` `chronicle-grim` 필터 오류, `applyChronicle` `removeTags` 거짓 로그, 코덱스 `client:idle` 초점 탈취, `storage.ts` `tags` 24→20 재절단 및 `migrateState` 미검증. |
| **`iv_lore_auditor`** (40k 고증 · 연대기 · 표기 · 조건) | `FIX_REQUIRED` | **`P0` 11건 그룹 · `P1` 9건 그룹 · `P2` 5건:** `centenarianOps.js` `워프석`·`saint_vessel` 오분류·쿠스토데스/드레드노트/테라 모순, `wear_tradeoff.js` 미존재 스탯 `S`/`Per` 11건·`"ice"`·리빙세인트 블랙카라페이스, `anomalies_s21.js` 12건 `minAge` 누락·침묵의 자매들/사이킥 후드 모순, `bonds_s21_6.js` 이브람 건트 `"총커미사르"` 오고증, 국교 아인류/사이커 진입 및 필멸자 `"다크 아포슬"` 오기, Stage 21~23 대규모 크리그/야만행성/하이로드/초인·면역자 누수, 최고위 `offerPitch` M41 초중반 시대착오 4건. |
| **`iv_prose_a11y_critic`** (문체 · 정합성 · 스크린 리더 UX) | `FIX_REQUIRED` | **`P0` 3건 · `P1` 13건 · `P2` 11건:** 상기 스키마·연령·신분 결함 교차 확인 + `DossierPanel` 후천 각성 특이점 미표시, `StartScreen` 라디오 `aria-describedby` 갱신 타이밍 및 속어 `"억까"` 노출, `ActiveEventPanel` 특성 예고 보유/면역 미필터, `ObituaryModal` `#obit-rank` 레이블 누락, 판정 라벨 불일치 10곳(`[친교/사교/영향/근접 판정]`) 및 `centenarianOps.js` 14건 `[XX 판정]` 접두어 누락, 비표준 표기·오탈자(`코기타토르`, `플라스마`, `갤러 필드`, `블랙 쉽`, `"당신"` 호칭 혼용 등). |

---

## 2. 심각도별 전수 결함 체크리스트

### 2.1 `[P0]` 치명적 런타임 버그 · 스키마 파손 · 심각 오고증 · 연령/신분 붕괴

- [ ] **`[P0-01]` `src/engine/centenarianOps.js` — 14종 전량 Choice 0 스키마 파손 + 심각 오고증 (L14-567)**
  * **현상 1 (치명 무음 실패):** `TRANSHUMAN_OPS`(5종) · `MORTAL_ELDER_OPS`(5종) · `CHAOS_IMMORTAL_OPS`(4종) 14건 전부의 `choices[0]`이 `success`/`critSuccess`/`fail`/`critFail`을 `choice` 직속이 아니라 `choice.check` 객체 내부에 중첩 선언함(L14-37, 60-76, 98-111, 134-147, 171-184, 210-226, 249-260, 284-296, 319-330, 353-365, 390-407, 430-442, 465-478, 500-513). `createEngine.js:1033-1037`은 `choice.success`/`choice.fail`만 읽으므로 선택 시 `outcome === undefined`로 `applyOutcome`이 무반응 종료되고, `GameApp.tsx:495-501`이 `#sr-live`에 직전 분기 구(舊) 로그를 오낭독함.
  * **현상 2 (고증·정합성 오류):**
    1. `dyn_cent_daemon_forge` (L461): 워해머 판타지 광물 `"워프석 공물"` 및 `"다크 메카니쿠스"` → `"블랙스톤 파편과 워프 합금 공물"`, `"다크 메카니쿰"`.
    2. `isLivingSaint` (L548): `career.tree === "living_saint"`로 인해 미승천 필멸자 `saint_vessel`이 `TRANSHUMAN_OPS`에 편입 → `career.id === "living_saint" || tagSet.has("living_saint")`로 교정.
    3. 쿠스토데스(`isCustodes`)가 `dyn_cent_neophyte_drill`(L128: 네오파이트 신병 훈련), `dyn_cent_space_hulk`(L68: 챕터 찬사), `dyn_cent_ordo_joint`(L165: 심문관 합동 토벌 요청)을 수행하는 설정 충돌 차단.
    4. `dyn_cent_relic_escort` (L92, L116): 드레드노트·리빙 세인트가 `"그림자처럼 움직여"`(`Ag +1`) → `!ctx.isDreadnought && !ctx.isLivingSaint`.
    5. `dyn_cent_warp_patrol` (L10): `terra`/`mars`에서 외곽 성계 이단 전초기지 출현 → `!ctx.isTerraOrMars`.
    6. `MORTAL_ELDER_OPS` (`frontier_tithe` L204, `forbidden_codex` L243, `dynasty_heir` L313, `void_charter` L347): `!ctx.isFeral && !ctx.isKrieg`, `frontier_tithe`는 `!ctx.isTerraOrMars && ctx.careerTier >= 3 && !ctx.isOgryn && !ctx.isAssassin`(테라는 십일조 면제 왕좌 행성), `void_charter`는 `!ctx.isInNihilus` + 함대/항법사/로그 트레이더/고위직 조건 적용.
    7. 14건 전부 `choices[0].label` 선두에 `[${statName} 판정]` 접두어 추가(TTS 앞 5어절 규칙).

- [ ] **`[P0-02]` `src/data/chronicles/wear_tradeoff.js` — 미존재 스탯 키 `S`/`Per` 11건 + `"ice"` + 리빙 세인트 장기 오묘사**
  * **대상 (11건 스탯 키 파손):** `ch_s21_wt_03`(L25 `S: 1`), `04`(L33 `S: -1`), `06`(L49 `Per: -1`), `10`(L81 `Per: 2`), `18`(L145 `S: -1`), `20`(L161 `Per: 1, S: -1`), `22`(L177 `S: -1`), `23`(L185 `S: -1`), `29`(L233 `S: -1`), `32`(L257 `Per: -1`), `34`(L273 `S: -1`).
  * **원인:** `STAT_META`는 `WS/BS/T/Ag/Int/WP/Fel/Inf` 8종만 지원. `createEngine.js:1111`이 `S`/`Per`를 무시해 트레이드오프가 전면 파손됨 → 문맥에 맞춰 `S` → `T` 또는 `WS`, `Per` → `Int` 또는 `BS`/`Ag`로 치환.
  * **추가 P0:** `ch_s21_wt_30` (L239) `"ice"` → `"cold"` (`tags.js` 정본); `ch_s21_wt_37` (L295-296) `living_saint` 미제외로 `"두 개의 심장과 블랙 카라페이스"` 출력 → `anyTags: ["astartes", "grey_knight", "renegade_marine", "chaos_lord"]` 또는 `excludeTags: ["custodes", "living_saint"]`.

- [ ] **`[P0-03]` `src/data/events/themes/anomalies_s21.js` — 12건 `minAge` 전면 누락 + 침묵의 자매들 고증 충돌**
  * **연령 붕괴 (`minAge` 누락 12건):** `ev_s21_anom_02, 03, 04, 06, 07, 08, 09, 10, 11, 12, 13, 14` (L82, 152, 221, 353, 417, 469, 533, 594, 660, 717, 779, 851). 0~10세 영유아가 오크 노브 맨손 격살(`06`), 트윈 헤비 볼터(`08`), 성역 사령부(`09~11`), **3세에 Tier 4 `assassin_operative` 강제 전직(`13` L798)**하는 결함 → `02, 03, 04, 06, 07, 08, 12, 14`에 `minAge: 16`, `09, 10, 11`에 `minAge: 18`, `13`에 `minAge: 16, maxAge: 35`(Choice 0은 `forceCareer: "assassin_initiate"` 권장 + `abhuman`/`navigator`/`mutant_sanctioned`/`mechanicus`/`imperial_knight`/`sororitas`/`living_saint`/`saint_vessel` 제외) 부여.
  * **`ev_s21_anom_03` (L152-182) 침묵의 자매들 모순:** `"이단심문관과 공허의 무녀들인 침묵의 자매들이... 마녀 사냥관의 사이킥 후드가 푸르게 빛나며"`, `"심문소 무녀"`, `"사이킥 후드를 공명시켜"` → 침묵의 자매들은 황제의 발톱/아스트라 텔레파티카 소속이며 무혼 장막 반경 내 모든 사이킥(아군 사이킥 후드 포함)을 무효화함. 문구 개고 + `astartes`, `inquisitor`, `lord_inquisitor`, `high_lord_terra`, `chapter_master`, `sector_lord`, `planetary_governor`, `warmaster`, `living_saint`, `dreadnought` 제외 추가.
  * **세력·행성 누수 보강:** `01`(L11-20, L66) `heretic`/`chaos_aligned` 제외 및 `sanctioned_psyker` 또는 미공인용 산문 정렬; `02`(L82-88) `anyWorldTags: ["hive", "industrial", "forge"]` + `excludeRealms: ["heretic"]` + `excludeWorlds: ["krieg"]` + 초인/드레드노트 제외; `04`(L221) `heretic`/`chaos_aligned`/`living_saint` 제외; `06, 07, 08, 09, 10, 12, 14`에 `excludeRealms: ["heretic"]`, `excludeWorldTags: ["feral"]`, 비전투/초인/하층민(`09, 10` `minSocialTier: "common"`) 정합화.

- [ ] **`[P0-04]` `src/data/events/themes/bonds_s21_6.js` & `src/data/chronicles/bonds_s21_6.js` — 이브람 건트 `"총커미사르"` 오고증 + 갱단 배교 오분류**
  * `ev_bond_named_gaunt_comrade` (L354-364): `"총커미사르"` → **`"대령-커미사르"`** (`AGENTS.md` 5.2장 & `characters.js:41`), `req`에 `anySegmenta: ["pacificus"]`, `anyCareers: ["pdf_trooper", "astra_militarum", "militarum_sergeant", "tempestus_scion"]`, `excludeHomeWorlds: ["krieg"]` 추가.
  * `ev_bond_underhive_pact` (L212, L225) · `ev_bond_heretic_betrayal` (L442-472) · `ch_bond_heretic_1` (L91-97): `renegade_marine`/`daemon_prince`/`chaos_lord` 제외, 오염 0 충성파 갱단과 카오스 배교자 분리(`ch_bond_heretic_1` `anyRealms: ["heretic"]` 또는 암흑 거래 중립 문구화).

- [ ] **`[P0-05]` `src/data/core/careers/faith_shadow.js` & `transhuman_chaos.js` — 국교 아인류/사이커 즉위 허용 & 필멸자 `"다크 아포슬"` 오고증**
  * `faith_shadow.js` `ecclesiarchy_priest`(L176), `ecclesiarchy_cardinal`(L231), `ecclesiarch`(L260): `excludeTags`에 `"abhuman", "psyker", "navigator", "mutant_sanctioned"` 추가.
  * `transhuman_chaos.js` `chaos_champion`(L479): `"다크 아포슬"`(워드 베어러 CSM 전용) → `"다크 데마고그"`(`en` 필드와 일치).

- [ ] **`[P0-06]` `src/data/events/careers/guardsman_grimdark.js` (10건) — 크리그 · 야만 행성 전면 누수**
  * 10건 전부에 `excludeWorldTags: ["feral"]` 추가(야만 행성 PDF 라스건·바실리스크·보급 트럭 차단).
  * `ev_s22_guard_01, 02, 04, 05, 07, 08, 10`에 `excludeWorlds: ["krieg"], excludeHomeWorlds: ["krieg"]` 추가(크리그 시체 행세·탈영·동료 밀고·전역 후 급여 압류 빚 차단). `06`/`09`는 크리그 분기 유지 시 채무/탈영 문구를 크리그와 충돌 없게 분기하거나 크리그 제외.

- [ ] **`[P0-07]` `src/data/events/themes/grimdark_misfortune.js` (10건) — 야만 행성 · 하이 로드(최고위) · 소속 기관 전면 누수**
  * 10건 전부에 `excludeWorldTags: ["feral"]` 추가.
  * `02, 04, 05, 06, 09, 10`에 누락된 `maxCareerTier: 3` 추가(`03`은 `maxCareerTier: 2` + `excludeRealms: ["cloistered", "military", "mechanicus", "void"]`).
  * `05`/`09`에 `anyWorldTags: ["hive"]` 추가(`05`는 `minSocialTier: "common"` 포함).
  * `06`에 `excludeTags: ["heretic", "chaos_aligned"]` + 우주 항행/비민간 조건 + `excludeHomeWorlds: ["krieg"]`.
  * `07`에 `excludeTrees: ["arbites", "inquisition", "sororitas", "commissariat", "imperial_knight", "officio_assassinorum"]`.
  * `08`에 `excludeTrees: ["ecclesiarchy", "sororitas", "inquisition", "arbites", "commissariat", "officio_assassinorum"]`.

- [ ] **`[P0-08]` `src/data/events/themes/grimdark_factions.js` (6건) — 최고위(하이 로드) · 드레드노트 누수**
  * `01, 02, 06`: `maxCareerTier: 3` 추가(`01`은 `anyCareers: ["tech_priest", "archmagos"]`로 `skitarii` 메카덴드라이트 정합화, `02` `critSuccess` 중복 `bionic` 보상 대체).
  * `03, 04`: `maxCareerTier: 4` 및 `excludeTags`에 `"high_lord_terra"` 추가.
  * `07`: `excludeTags`에 `"high_lord_terra"` 추가 권장.
  * `08`: `excludeBodyClasses: ["dreadnought"]` 및 `excludeTags`에 `"chapter_master"` 추가.

- [ ] **`[P0-09]` `src/data/chronicles/grimdark_s22.js` — 귀족 유아 시체 전분 · 야만/크리그 · 수행원 소각 칙령**
  * `ch_s22_grim_02` (L25-36): `maxSocialTier: "common"` + `excludeRealms: ["cloistered"]` 추가.
  * `ch_s22_grim_04` (L59-64): `anyWorldTags: ["hive", "industrial", "forge"]` + `excludeWorlds: ["krieg"]`.
  * `ch_s22_grim_05` (L70-75), `08` (L103-108): `excludeWorldTags: ["feral"]` + `excludeWorlds: ["krieg"]` (`08` `excludeHomeWorlds: ["krieg"]`).
  * `ch_s22_grim_18` (L216-218): `anyCareers`에서 `"inquisition_acolyte"` 제거(`["inquisition_interrogator", "inquisitor", "lord_inquisitor"]`).

- [ ] **`[P0-10]` `src/data/events/themes/acquired_traits_s21.js` (12건) — 초인 · 오염면역 · 무혼 · 야만행성 · 이단자 가드 누락**
  * `01~12` 전 항목 `excludeWorldTags: ["feral"]` 보강.
  * `03` (L157-191): `excludeTags`에 `"custodes", "grey_knight", "living_saint", "blank", "omega_pariah", "ogryn"` 추가.
  * `01`, `05`: 군사/지휘 `anyRealms: ["military", "void"]` 또는 `anyTags` 보강(`05` `fail`/`critFail`에 `ruthless` 증감 정렬).
  * `04`, `11`, `12`: `excludeRealms: ["heretic"]` + `excludeTags`(`04`: `ogryn`, `assassin`; `11`: `krieg`, `custodes`, `astartes`, `grey_knight`, `daemon_prince`, `assassin`; `12`: 초인/이단).
  * `06`: `excludeBodyClasses: ["transhuman", "dreadnought", "daemonic"]`.

- [ ] **`[P0-11]` Stage 23-C 추가분 초인 `shell_shocked` · 면역자 `warp_scarred` · 드레드노트 `chronic_toxins`/`crippled_limb` 유입**
  * `crises_warfare.js` `ev_s8_crisis_ork_breakthrough` (L166, L221-225): `astartes` 및 `krieg`에 `shell_shocked` 유입 차단(엔진 면역 + 사건 조건 정비); `ev_s8_crisis_artillery_barrage` (L8-14) `excludeWorldTags: ["feral"]` 추가.
  * `chaos_warp.js` `ev_geller_flicker` (L161-165, L214-219): `grey_knight`/`custodes`/`living_saint`/`blank`/`omega_pariah`에 `warp_scarred` 유입 차단.
  * `xenos.js` `ev_ork_waaagh` (L8-15, L46) · `ev_tyranid_scouts` (L88-97, L103, L120): `excludeTags: [..., "dreadnought"]` 및 `excludeWorldTags: ["feral"]` 추가(`tyranid_scouts` `chronic_toxins` 비아스타르테스/비초인 분기).

---

### 2.2 `[P1]` 엔진 · UI · 접근성 · QA 사각지대 · 잔여 고증/정합성 결함

- [ ] **`[P1-01]` 치유 막힘(`canUsePenance`) & 초인/블랭크/오메가-마이너스 면역 엔진 누락**
  * `src/engine/careerActions.js:75-78`: `canUsePenance`가 `state.corruption <= 0`이면 무조건 차단 → `corruption <= 0 && !shell_shocked && !warp_scarred`일 때만 차단하도록 개방 + `createEngine.js:1713-1741` 행동 설명에 치유 가능 특성 표시.
  * `src/engine/createEngine.js:846-853, 1135-1142`: `applyOutcome` 및 `applyChronicle`의 양(+) 오염 적용에 `omega_pariah`(`×0.15`), `blank`(`×0.50`), `ophelia7` 모성(`×0.85`) 감쇠 일관 적용(`deltaText` 실반영치 동기화).
  * `src/engine/createEngine.js:871`: `shell_shocked` 면역을 `krieg` + 초인(`astartes`/`custodes`/`grey_knight`/`dreadnought`/`living_saint`/`daemon_prince`)으로 확장하고, `warp_scarred` 면역을 `isIncorruptibleState(state) || blank || omega_pariah`에 적용.

- [ ] **`[P1-02]` 모성 특전 · 선천 재능 UI 표기와 실제 엔진 구현 100% 일치화**
  * `src/engine/createEngine.js:298-310, 1312-1372` & `src/engine/careerRules.js` & `src/data/core/{worlds,origins}.js`:
    * `geneseed_compatible`: `astartes`/`grey_knights` 선발 시련(`trialCheck`) `+8%` 실구현.
    * `abhuman_ogryn`: 물리 부상(`wounds < 0`) `20%` 경감 실구현.
    * `armageddon` 환경 위험 `×0.85`, `necromunda` 자연 회복 `+1`, `ophelia7` 오염 감쇠 `×0.85`, `vostroya` 사격(`BS`) `+3` 실구현.
    * 수치 일치화: `ratling` `+6`, `cadia` `+6`, `krieg` `+5`, `tanith` `+5`, `voidborn` `+6` (`worlds.js`/`origins.js` 설명과 `computeCheckPreview` 100% 일치).
    * `origins.js:59, 64` (`mechanicus_menial`) `excludeWorlds: ["krieg"]` 추가(자장가 차단), `origins.js:290` (`freak_physique`) 설명에서 `"쿠스토데스"` 제거.

- [ ] **`[P1-03]` `FullChronicleView` 필터 오분류 & `applyChronicle` `removeTags` 거짓 로그 & `GameApp` `prevTopLog` 가드**
  * `src/components/game/FullChronicleView.tsx:33-34`: `chronicle-grim`을 `"일상 · 부조리"`로 분류.
  * `src/engine/createEngine.js:1157-1164`: `applyChronicle` `effForDelta`에 `{ removeTags: removedChronTags }`를 항상 덮어씌워 미보유 태그 거짓 `"특성 치유"` 출력 차단.
  * `src/components/game/GameApp.tsx:477-501`: `handleChooseEvent`에 `prevTopLog = cur.logs[0]` 비교 가드 추가.

- [ ] **`[P1-04]` 코덱스 5개 페이지 `client:idle` 지연 하이드레이션 초점 탈취 해소**
  * `src/pages/codex/{worlds,careers,chapters,timeline,characters}.astro`: `<CodexExplorer client:load ... />` 복원(0KB narrative 격리 불변) + `src/components/codex/CodexExplorer.tsx:77-92` 초기 해시 포커스에 `document.activeElement === document.body || document.activeElement === null` 안전 가드 추가.

- [ ] **`[P1-05]` `DossierPanel` 후천 각성 특이점 표시 · `StartScreen` 라디오 접근성/속어 제거 · `HallOfSoulsApp`/`storage.ts`/`migrateState` 방어**
  * `src/engine/statCaps.js` + `src/components/game/DossierPanel.tsx:174-194`: `ANOMALY_TAG_EFFECTS`에 `summary` 추가 및 `getAwakenedAnomalies(state)`를 `#trait-perks-list`에 표시.
  * `src/components/game/StartScreen.tsx:182-225`: 각 라디오에 정적 `aria-describedby` 개별 연결 + `"공략형 억까 사건"` → `"공략형 불운·부조리 사건"`.
  * `src/components/hall/HallOfSoulsApp.tsx:173`: `apex_transcendent`에서 `c.tree === "living_saint"` → `c.id === "living_saint"` (`saint_vessel` 오인정 수정).
  * `src/lib/storage.ts:222`: `sanitizeHallEntry` `tags` 상한 `20` → `24` (`saveToHall`과 일치).
  * `src/engine/createEngine.js:559-676`: `migrateState`에서 `age`/`year`/`quarter`/`wounds`/`maxWounds`/`faith`/`corruption` 유한 수치 검증, `FOCUSES[st.focus]` 검증, `pendingEvent.choices` 비객체 원소 필터링 추가.

- [ ] **`[P1-06]` QA 스위트 거짓 양성 사각지대 영구 봉쇄 (`scripts/qa.mjs`, `personaGate.mjs`, `audit-health.mjs`, `tests/game-a11y.test.tsx`)**
  * `scripts/qa.mjs`:
    1. 공용 선택지 검증기 `validateEventChoices(ev, owner)` 추출 → 정적 `EVENTS`/`TIMELINE` + 4대 동적 생성기(`centenarianOps` 3진영 전 템플릿, `careerRules`, `travel`, `endings`) 출력 전수 검증.
    2. `DATA.CHRONICLES` `effect.stats` 키(8대 `STAT_META`) 및 `anyWorldTags`/`excludeWorldTags`(`WORLD_TAG_LABELS`) 검증 추가.
    3. `canUsePenance` 오염 `0` + `shell_shocked` 치유 회귀 테스트, 초인 `shell_shocked` 및 `blank`/`omega_pariah` 오염 감쇠/`warp_scarred` 면역 테스트, `ev_s21_anom_02~14` `minAge >= 14` 검증, 비표준 판정 라벨(`[친교/사교/영향/근접 판정]`) 차단 정규식 추가.
  * `scripts/qa/personaGate.mjs`: 17종 페르소나 전원을 `standard` + `grimdark` 양쪽 난이도로 모두 스캔.
  * `scripts/audit-health.mjs`: 200생애를 `standard` 100 + `grimdark` 100 혼합 실행 + 매 `resolvePendingChoice` 호출에 `res && res.outcome` 실존 및 `st.logs[0] !== prevTop` 신규 로그 단언 추가.
  * `tests/game-a11y.test.tsx`: Stage 23.5 회귀 테스트(#25~#27) 추가 (`centenarianOps` Choice 0 실제 `resolvePendingChoice` 실행, `canUsePenance` 오염 0 치유, `FullChronicleView` `chronicle-grim`, `DossierPanel` 후천 각성 특이점, `ActiveEventPanel` 보유/면역 예고 필터).

- [ ] **`[P1-07]` 코어 직군 `offerPitch` M41 초중반 시대착오 4건 & 직군 자격 `excludeTags` 누수**
  * `civil_militarum.js:393` (`warmaster`: 마카리우스·슬레이도·마카로스 제거), `faith_shadow.js:154` (`abbess_sanctorum`: 모르벤 발 제거), `transhuman_chaos.js:318` (`gk_supreme_grand_master`: 드라이고 제거), `transhuman_chaos.js:440` (`custodes_captain_general`: 발로리스 제거) → 전 시대 통용 인물·문구로 교체.
  * `transhuman_chaos.js` `astartes_scout`/`adeptus_custodes`/`chaos_cultist`/`chaos_champion`/`daemon_prince`에 `"blank"` 제외, `civil_militarum.js` `rt_*`에 `"abhuman"` 제외 & `tempestus_scion`에 `"psyker"` 제외, `faith_shadow.js` `skitarii`/`tech_priest`에 `abhuman`/`psyker`/`navigator` 제외 추가.

- [ ] **`[P1-08]` 판정 라벨 불일치 10곳 통일 & 잔여 사건/연대기 정합성·출처 수정**
  * 판정 라벨 통일: `[친교 판정]` (`acquired_traits_s21.js:240,660,707`, `grimdark_misfortune.js:89,483`) → `[교섭 판정]`, `[사교 판정]` (`grimdark_factions.js:148,374`) → `[교섭 판정]`, `[영향 판정]` (`acquired_traits_s21.js:335`) → `[권위 판정]`, `[근접 판정]` (`guardsman_grimdark.js:20,583`) → `[백병 판정]`.
  * `bonds_s21_6.js` & `chronicles/bonds_s21_6.js`: `ev_bond_named_dante_brother` (`grey_knight`/`dreadnought`/`terra`/`mars` 제외, `"수백 년"`→`"천 년 가까이"`), `childhood_pact`/`reunion`/`guard_squad`/`astartes_brother`/`void_forge`/`comrade_sacrifice`/`legacy_keepsake` + 연대기 14건의 크리그·야만행성·드레드노트·지상행정관 함선 누수 차단.
  * `chronicles/anomalies_s21.js`: `01`(`grey_knight`), `04`(초인/고위/이단), `06`(초인/오그린), `09`(이단/크리그/초인), `10`(`feral`/하층민) 가드 보강.
  * `chronicles/wear_tradeoff.js`: `01, 02, 07, 10, 17, 18, 27, 36`의 `feral`/`krieg`/`cloistered` 초인·암살자/오염면역/이단 가드 보강.
  * `chronicles/grimdark_s22.js`: `12` `commissar_cadet` 제거, `24` `astartes_scout`/`dreadnought` 제외, `30` `daemon_prince` 제외.
  * `events/themes/xenos.js`: `ev_s5_xenos_necron_awakening` 비툼 네임드 행성 제외, `ev_s5_xenos_tau_propaganda` `astartes` 제외, `ev_xenos_trade`/`ev_drukhari_night_raid`/`ev_s5_xenos_aeldari_farseer` `feral`/`voidborn` 제외.
  * `events/themes/{crises_warfare,crises_imperial,alignment_dilemmas,chaos_warp,lifecycle_elder}.js`: `chaos_raiders`(`krieg`/`voidborn`), `admin_audit`(`menial_worker` 제거), `noble_poison`(`voidborn`/`baal`/`catachan`), `blackmail_syndicate`(`sororitas`/`assassin`/`living_saint`/`saint_vessel`), `forbidden_archive`(`living_saint`/`saint_vessel`/`blank`), `dilemma_03`(`anyWorldTags: ["hive"]`), `dilemma_04`(`krieg`/`feral`), `dilemma_05`(`astartes_scout`), `cultist_warband`(`feral`/`krieg`), `death_guard`/`night_lords`(`voidborn`), `rejuvenat_offer`/`mortal_twilight`/`bond_*`(`feral`/`krieg`/`navigator`) 보강.
  * `grimdark_misfortune.js` `ev_s22_theme_05` (L291) `critSuccess` 특성 보상 `battle_hardened` → `tactician_eye` 또는 `silver_tongue`.
  * 출처 교정: `guardsman_grimdark.js:315` `Codex: Militarum Tempestus` (+ L269 `"반역군의 히드라 대공포"`), `anomalies_s21.js:346` `Lexicanum: Abhuman` 제거, `bonds_s21_6.js:517` `Gaunt's Ghosts / Only War`.

---

### 2.3 `[P2]` 표기 통일 · 오탈자 · UX/문서 다듬기 (일괄 포함 권장)

- [ ] **`[P2-01]` 비표준 표기 및 오탈자 일괄 교정:**
  * `grimdark_factions.js`: `코기타토르` → `코지테이터` (L32, 45, 114, 392), `플라스마` → `플라즈마` (L77), `로컬` → `지역` (L198).
  * `wear_tradeoff.js`: `갤러 필드` → `겔러 필드` (L248), `독한 카페인` → `독한 리카프` (L72), `육성의 회화` → `육성 대화` (L88).
  * `grimdark_s22.js`: `블랙 쉽` → `검은 함선` (L309).
  * `grimdark_misfortune.js`: `이악물고` → `이를 악물고` (L157), 2인칭 `"당신"` → `"그대"` 일괄 통일.
  * `guardsman_grimdark.js`: `낙하산 삭이` → `낙하산 줄이` (L291), `선봉차량의` → `선봉 차량의` (L399).
  * `bonds_s21_6.js`: 메타 괄호 `(혹은 ...)` 3곳(L138, 260, 448) 자연 산문 개고, `쥐여져 있었다` → `손에 쥐여 있었다` (L331).
  * `acquired_traits_s21.js`: `원시 행성` → `야만 행성` (L235), `이름 높였다` → `이름을 높였다` (L243).
  * `anomalies_s21.js` / `chronicles/anomalies_s21.js`: `I-빔 철골` → `강철 대들보` (L303), `돌연변이 정점` → `유전적 특이점` (L303), `연필` → `철필` (L545), `메디케` → `메디카에` (`ch_s21_anom_06` L48).
  * 횡단 용어 통일: `오크 놉`/`초퍼` → `오크 노브`/`초파`.
- [ ] **`[P2-02]` UI 접근성 미세 다듬기:**
  * `ActiveEventPanel.tsx:129-167`: 특성 미리보기 보유/미보유/면역 필터 적용.
  * `ObituaryModal.tsx:127`: `aria-labelledby="obit-rank obit-title"` 연결.
  * `DossierPanel.tsx:150-172`: `<dl id="stats-grid">` 내부 `<dt>`/`<dd>` 직계 구조 정리.
- [ ] **`[P2-03]` 출생 조합 고증 & 문서 동기화:**
  * `createEngine.js:458`: `navigator_house` 출생 시 양립 불가 자질(`blank`, `omega_pariah`, `abhuman_*`) 제외.
  * `worlds.js` 주석(`14곳→15곳`, `7종→8종`), `faith_shadow.js:662` `master_of_astronomicum` 의석 통합 주석.
  * `PROJECT_GUIDE.md` 상단 개요(`777종/892종`, `엔진 8모듈`, `20테스트` 등)와 하단 보고서 전면 동기화(`에버소어→에버서`, `쿨렉서스→쿨렉수스`, `knight_high_king WS 62` 포함) + `README.md:35` (`선천 자질 8종` → `12종`) + `glossary.js` (`statCaps`/`grimdark` 반영 검토).

---

## 3. 실행 Phase 및 파일 배타적 소유권 맵 (새 세션 오케스트레이션용)

`imperialis-vita-orchestrator` `L4` 규약에 따라 아래 순서로 진행한다:

1. **`23.5-A` (메인 단독 소유 — 엔진 & 코어):**
   `src/engine/{centenarianOps,createEngine,careerActions,careerRules,statCaps}.js`, `src/data/core/{worlds,origins}.js`, `src/data/core/careers/{civil_militarum,faith_shadow,transhuman_chaos}.js`
2. **`23.5-B` (메인 단독 소유 — UI & 스토리지):**
   `src/components/game/{GameApp,FullChronicleView,DossierPanel,ActiveEventPanel,StartScreen,ObituaryModal}.tsx`, `src/components/hall/HallOfSoulsApp.tsx`, `src/components/codex/CodexExplorer.tsx`, `src/pages/codex/*.astro`, `src/lib/storage.ts`
3. **`23.5-C` (메인 또는 `iv_qa_balance` — QA · 퍼징 · Vitest):**
   `scripts/qa.mjs`, `scripts/qa/personaGate.mjs`, `scripts/audit-health.mjs`, `tests/game-a11y.test.tsx`
4. **`23.5-D` (`iv_data_writer` 5트랙 병렬 — 서로 겹치지 않는 데이터 파일 배타 할당):**
   * **Track D1:** `src/data/chronicles/wear_tradeoff.js`, `src/data/chronicles/anomalies_s21.js`
   * **Track D2:** `src/data/events/themes/anomalies_s21.js`, `src/data/events/themes/acquired_traits_s21.js`
   * **Track D3:** `src/data/events/themes/bonds_s21_6.js`, `src/data/chronicles/bonds_s21_6.js`
   * **Track D4:** `src/data/events/careers/guardsman_grimdark.js`, `src/data/events/themes/grimdark_misfortune.js`, `src/data/events/themes/grimdark_factions.js`, `src/data/chronicles/grimdark_s22.js`
   * **Track D5:** `src/data/events/themes/{crises_warfare,crises_imperial,alignment_dilemmas,chaos_warp,xenos,lifecycle_elder}.js`
5. **`23.5-E` (최종 통합 검증 · 3인 읽기 전용 재감사 · 문서/Git 마감):**
   * `npm run verify && npm run qa:deep && npm run coverage` 전 항목 **0오류 · 0경고** 확인.
   * `iv_lore_auditor`, `iv_prose_a11y_critic`, `iv_redteam_reviewer` (`enable_write_tools: false`, `Model: "inherit"`) 재검수 → **전원 `PASS` (`P0`/`P1` 0건)** 확인.
   * `PROJECT_GUIDE.md` · `README.md` 동기화, 본 문서 체크박스 완료 갱신(또는 정리), `fix/stage23-5-stabilization`을 `main`에 병합하고 `origin/main` 푸시.
