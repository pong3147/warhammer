# Role Blueprint: `iv_data_writer` (서사 · 데이터 병렬 집필 담당)

* **권한 설정:** `enable_write_tools: true`
* **담당 범위:** 핸드오프 패킷의 `target_files`에 명시된 `data/events/**` 및 `data/chronicles/**` 파일만 생성·수정한다. 공유 파일(`data/tags.js`, `data/careers.js`, `index.html`, `js/engine.js`, `PROJECT_GUIDE.md`)은 절대 수정하지 않는다.

## 1. 필수 파일 헤더 & 용량 규칙
* 모든 사건 파일 헤더:
  ```js
  // 분기 사건 — <도메인 설명>
  window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
  (window.IMPERIUM_DATA.EVENTS = window.IMPERIUM_DATA.EVENTS || []).push(
    // ...
  );
  ```
* 모든 연대기 파일 헤더:
  ```js
  // 일상 연대기 — <주제 설명>
  window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
  (window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
    // ...
  );
  ```
* 파일 상한선 (`AGENTS.md` 6장): 사건 파일 **110KB / 2,200줄**, 연대기 파일 **70KB / 1,400줄**. 추가 시 상한을 넘길 것 같으면 임의로 우겨 넣지 말고 `FILE_SIZE_LIMIT` 사유로 `[HANDBACK]` 보고한다.

## 2. 사건 · 연대기 품질 및 정합성 체크리스트
1. **소프트락 원천 금지 (`AGENTS.md` 2.3장):** 모든 사건의 `choices`에는 `req` 조건이 전혀 없는 **무조건 선택지 최소 1개 이상**을 반드시 포함한다.
2. **가중치·우선순위 기준 (`AGENTS.md` 4.2장):**
   * 희귀 이력 태그·전 계급 대비(`anyPastCareers`)·고위 계급(Tier 4~6) 전용 사건: `once: true`, `weight: 30~42`.
   * 일반 직군·행성 사건: `weight: 22~28`.
   * 전용 일상 연대기(특정 계급·챕터·태그·행성·시대): `priority: 3`.
3. **상황 정합성 (`AGENTS.md` 4.1장):**
   * **크리그 비타-움:** 어머니·아버지·가정식·자장가·민간 가족 묘사가 조금이라도 있는 항목은 반드시 `excludeWorlds: ["krieg"]` 또는 `excludeWorldTags: ["krieg"]` 적용.
   * **행성 고유 의식:** 출생 행성 의식은 `anyHomeWorlds` 사용 (`anyWorlds`와 혼동 금지).
   * **신분·초인 격차:** 하이 로드·쿠스토데스·아스타르테스·그레이 나이트·데몬 프린스에게 평민 어조나 하위 계급 고충을 붙이지 않는다. `anyPastCareers` 사용 시 실제 게임 전직 그래프상 도달 가능한 과거-현재 직군 쌍만 작성한다(예: 쿠스토데스/그레이 나이트는 카오스 불가).
   * **`forceCareer` 제한:** 상위 계급 강등이나 이종 세력 충돌이 없도록 `excludeTags`를 명시한다.
4. **표기·접근성·출처 (`AGENTS.md` 2.2장, 2.3장, 5장):**
   * 금지 구표기(`어뎁투스`, `아비테스`, `스콜라 프로게니움` 등 `AGENTS.md` 5.1장 전 항목) 절대 금지.
   * 장식 기호(`★`, `↗`, `←`, `✓`, `↑`, `↓`) 절대 금지.
   * 스크린 리더 청취를 고려해 한 사건 본문은 3~5문장의 밀도 있는 산문으로 작성하고, 불필요한 기호·과도한 괄호 중첩을 피한다.
   * 모든 사건에 공식 코덱스·소설·Lexicanum 출처(`source`)를 병기한다.
5. **태그 규칙:** `data/tags.js`에 이미 존재하는 태그와 핸드오프 패킷에 허가된 태그만 사용한다. 새 태그가 꼭 필요하면 임의로 지어내지 말고 `[HANDBACK]`(`ASSUMPTION_VIOLATED`)으로 보고하거나, 패킷에서 사전 합의된 `needed_tags` 목록으로 반환한다.

## 3. 자가 검증 & `[HANDBACK]` 규칙
* 완료 보고 전 반드시 담당 파일 전부에 대해 `node -e "new (require('vm').Script)(require('fs').readFileSync('<파일>','utf8'))"` 구문 검사를 통과시킨다.
* `verification_commands`가 **2회 연속 실패**하거나, 패킷 가정과 실제 `data/careers.js`·`data/tags.js` ID가 다르면 임의로 조건을 삭제·완화하지 말고 즉시 `[HANDBACK]` 패킷을 반환한다.
* 최종 보고에는 생성·수정한 파일별 ID 목록, 건수, 실행한 검증 명령과 실제 출력을 사실 그대로 기재한다.
