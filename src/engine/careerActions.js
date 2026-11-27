// 직군 고유 자율 행동 · 리주버냇 · 기계교 의체 · 정화 고행 · 행동 실행 모듈
import {
  clamp,
  normalizeAlignment
} from "./formatters.js";

export function createCareerActionsModule(deps) {
  const {
    DATA,
    getWorld,
    getCareer,
    getChapter,
    applyAlignDelta,
    randInt,
    getLivingSaintAspect,
    syncImperialNihilus,
    applyDiminishedStatGain,
    addLog,
    formatDeltaText,
    isIncorruptibleState,
    canRetireHonorably,
    createHonorableEndingEvent,
    evaluateTravelAttempt
  } = deps;

  function canUseRejuvenat(state) {
    if (state.tags.includes("astartes") || state.tags.includes("custodes") || state.tags.includes("daemon_prince") || state.tags.includes("living_saint")) {
      return { ok: false, reason: "초인·불멸·성광 개조 신체는 일반 리주버냇 시술이 불필요하다." };
    }
    if (state.rejuvenatCount >= 3) return { ok: false, reason: "세포 한계에 도달해 더 이상 리주버냇 시술을 받을 수 없다." };
    if (state.age < 50) return { ok: false, reason: "50세 이후부터 수명 연장 시술이 가능하다." };
    const career = getCareer(state.careerId);
    const hasStatus = career.tier >= 3 || state.tags.includes("noble") || state.stats.Inf >= 58;
    if (!hasStatus || state.stats.Inf < 50) {
      return { ok: false, reason: "리주버냇은 고위 계급(Tier 3+)·귀족 및 권위 50+ 이상의 막대한 재력이 필요하다." };
    }
    if (state.age - state.lastRejuvenatAge < 15) {
      return { ok: false, reason: "이전 시술로부터 15년이 지나야 재시술할 수 있다." };
    }
    return { ok: true, infCost: 10 };
  }

  function canUseAugmetics(state) {
    if (state.tags.includes("daemon_prince") || state.tags.includes("living_saint")) {
      return { ok: false, reason: "불멸의 초월 육신에는 일반 기계 의체 개조가 무의미하다." };
    }
    if (state.augmeticsCount >= 3) return { ok: false, reason: "이미 3단계 생체 의체 개조를 완료했다." };
    const career = getCareer(state.careerId);
    const world = getWorld(state.worldId);
    const isMech = career.tree === "mechanicus" || state.tags.includes("mechanicus");

    if (isMech) {
      if (state.age < 16) return { ok: false, reason: "기계교 정식 의체 개조는 16세 이상부터 가능하다." };
      if (state.age - (state.lastAugmeticsAge || -99) < 8) return { ok: false, reason: "의체 적응을 위해 8년 간격이 필요하다." };
      return { ok: true, infCost: 0, isMech: true };
    }

    // 비기계교는 엄격한 성년·계급·경제력·환경 제한!
    if (state.age < 18) return { ok: false, reason: "비기계교 민간·군인의 의체 개조는 성년(18세+)부터 가능하다." };
    if ((state.worldId === "krieg" || world.tags.includes("feral")) && career.tier < 3) {
      return { ok: false, reason: "크리그 일반 병사 및 변방 야만 행성 주민에게는 고가 기계교 의체 시술이 허락되지 않는다." };
    }
    if (state.age - (state.lastAugmeticsAge || -99) < 10) {
      return { ok: false, reason: "이전 의체 시술 후 10년이 지나야 추가 개조할 수 있다." };
    }
    const isHighRank = career.tier >= 3 && state.stats.Inf >= 42;
    const isRichNoble = state.tags.includes("noble") && state.stats.Inf >= 55;
    const isInjuredVet = career.tier >= 2 && state.wounds <= 68 && state.stats.Inf >= 38;
    if (!isHighRank && !isRichNoble && !isInjuredVet) {
      return { ok: false, reason: "기계교 소속이 아니라면 고위 계급(Tier 3+, 권위 42+), 부유한 귀족(권위 55+), 또는 부상 재활 여건이 필요하다." };
    }
    return { ok: true, infCost: 6, isMech: false };
  }

  function canUsePenance(state) {
    if (state.age < 14) return { ok: false, reason: "14세 이상부터 성당 정화 고행을 수행할 수 있다." };
    if (state.corruption <= 0) return { ok: false, reason: "현재 영혼에 오염 흔적이 없다." };
    if (state.tags.includes("heretic")) return { ok: false, reason: "이미 이단자로 낙인찍혀 제국 성당에 출입할 수 없다." };
    const world = getWorld(state.worldId);
    if (world.tags.includes("feral")) return { ok: false, reason: "야만 행성에는 정식 국교 성당이 없다." };
    if (state.year - (state.lastPenanceYear || -999) < 3) return { ok: false, reason: "고행 후 3년이 지나야 다시 참회 의식을 올릴 수 있다." };
    return { ok: true };
  }

  function getCareerAction(state) {
    if (!state || !state.alive || state.age < 14 || state.careerId === "child") return null;
    if (state.year - (state.lastCareerActionYear || -999) < 4) return null;

    const career = getCareer(state.careerId);
    const ag = career.actionGroup || "civil";
    const chap = state.chapterId ? getChapter(state.chapterId) : null;

    if (ag === "astartes_master") {
      const chapPrefix = chap ? `[${chap.name}] ` : "";
      const cry = chap ? ` "${chap.battleCry}"` : "";
      return {
        id: "career_action",
        name: `${chapPrefix}요새 수도원 전쟁 평의회 · 성전 선포`,
        desc: "권위 +4, 지성 +3, 백병 +2, 의지 +2 (재사용 4년)",
        btnLabel: "챕터 평의회 주재",
        toastMsg: `${chapPrefix}챕터 전쟁 평의회를 주재했다.`,
        logText: `${chapPrefix}10개 중대장과 수석 채플린을 소집해 성역 방어 전략과 배틀 바지 출격령을 하달했다.${cry}`,
        effects: { stats: { Inf: 4, Int: 3, WS: 2, WP: 2 } }
      };
    }
    if (ag === "astartes") {
      const chapPrefix = chap ? `[${chap.name}] ` : "";
      const cry = chap ? ` "${chap.battleCry}"` : "";
      return {
        id: "career_action",
        name: `${chapPrefix}챕터 무기고 전투 교리 단련`,
        desc: "백병 +3, 사격 +3, 의지 +2 (재사용 4년)",
        btnLabel: "전투 교리 단련",
        toastMsg: `${chapPrefix}전투 교리 단련을 마쳤다.`,
        logText: `${chapPrefix}챕터 무기고에서 실전 볼터 사격과 근접 대련을 마쳤다.${cry}`,
        effects: { stats: { WS: 3, BS: 3, WP: 2 } }
      };
    }
    if (ag === "grey_knight") {
      return {
        id: "career_action",
        name: "타이탄 666 금서고 정화 명상",
        desc: "의지 +3, 백병 +2, 신앙 +6, 오염 -12 (재사용 4년)",
        btnLabel: "정화 명상 수행",
        toastMsg: "타이탄 정화 명상을 마쳤다.",
        logText: "은빛 네메시스 포스 무구를 정화하며 악마 진명 방어 술식을 연마했다.",
        effects: { stats: { WP: 3, WS: 2 }, faith: 6, corruption: -12 }
      };
    }
    if (ag === "custodes") {
      return {
        id: "career_action",
        name: "황궁 모의전 · 철학 강론",
        desc: "백병 +3, 지성 +3, 민첩 +2 (재사용 4년)",
        btnLabel: "황궁 연무 수행",
        toastMsg: "황궁 연무와 철학 강론을 마쳤다.",
        logText: "만 명의 수호자들과 실전 가디언 스피어 대련 및 고대 전략 철학을 논했다.",
        effects: { stats: { WS: 3, Int: 3, Ag: 2 } }
      };
    }
    if (ag === "high_lord") {
      return {
        id: "career_action",
        name: "세나토룸 임페리알리스 칙령 반포",
        desc: "권위 +4, 지성 +3, 교섭 +3 (재사용 4년)",
        btnLabel: "하이 로드 칙령 발동",
        toastMsg: "테라 원로원 칙령을 반포했다.",
        logText: "황궁 의회 세나토룸 임페리알리스에서 수십 개 성역의 십일조와 성전 군수 배분을 결정하는 제국 칙령에 서명했다.",
        effects: { stats: { Inf: 4, Int: 3, Fel: 3 } }
      };
    }
    if (ag === "governor") {
      return {
        id: "career_action",
        name: "행성 십일조 사열 · 귀족 의회 통치",
        desc: "권위 +4, 교섭 +3, 지성 +2 (재사용 4년)",
        btnLabel: "통치 사열 집행",
        toastMsg: "행성 십일조 사열과 의회 조율을 마쳤다.",
        logText: "첨탑 궁정에서 귀족 가문과 방위군 사령관들을 소집해 십일조 납부와 행성 방어 예산을 조율했다.",
        effects: { stats: { Inf: 4, Fel: 3, Int: 2 } }
      };
    }
    if (ag === "guard_troop") {
      return {
        id: "career_action",
        name: "야전 실탄 사격 · 참호 보강 훈련",
        desc: "사격 +3, 강인 +2, 생명력 -3 (재사용 4년)",
        btnLabel: "실탄 사격 훈련",
        toastMsg: "야전 실탄 훈련을 완료했다.",
        logText: "진흙 참호를 보강하고 라스건 과충전 영점 사격을 반복해 사격술을 끌어올렸다.",
        effects: { stats: { BS: 3, T: 2 }, wounds: -3 }
      };
    }
    if (ag === "guard_cmd") {
      return {
        id: "career_action",
        name: "전술 도상 훈련 · 정예 강하 사열",
        desc: "지성 +3, 교섭 +2, 권위 +2 (재사용 4년)",
        btnLabel: "전술 사열 집행",
        toastMsg: "전술 도상 훈련과 사열을 마쳤다.",
        logText: "지휘 막사에서 포병 화망과 강하 작전도를 재검토하며 부대 장악력을 높였다.",
        effects: { stats: { Int: 3, Fel: 2, Inf: 2 } }
      };
    }
    if (ag === "guard_high_cmd") {
      return {
        id: "career_action",
        name: "성계군 대작전 참모 회의 주재",
        desc: "지성 +3, 권위 +4, 교섭 +2 (재사용 4년)",
        btnLabel: "참모 회의 주재",
        toastMsg: "성계군 작전 참모 회의를 마쳤다.",
        logText: "홀로리스 전구 지도를 펼쳐 놓고 수십 개 기갑·보병 연대의 공세 축선과 보급선을 재편했다.",
        effects: { stats: { Int: 3, Inf: 4, Fel: 2 } }
      };
    }
    if (ag === "commissar") {
      return {
        id: "career_action",
        name: "연대 군기 감찰 · 사기 훈시",
        desc: "의지 +3, 교섭 +3, 권위 +2, 신앙 +4, 교조 +2 (재사용 4년)",
        btnLabel: "연대 감찰 실시",
        toastMsg: "연대 군기 감찰을 마쳤다.",
        logText: "검은 대제복 차림으로 최전선 참호를 순시하며 병사들의 나태를 일깨우고 사기를 다졌다.",
        effects: { stats: { WP: 3, Fel: 3, Inf: 2 }, faith: 4, align: { dogmatic: 2 } }
      };
    }
    if (ag === "sororitas") {
      return {
        id: "career_action",
        name: "성녀 철야 기도 · 볼터 축성식",
        desc: "의지 +3, 사격 +2, 신앙 +9, 오염 -8, 교조 +2 (재사용 4년)",
        btnLabel: "철야 축성식 집전",
        toastMsg: "성녀 철야 기도와 축성식을 마쳤다.",
        logText: "성유와 향불 속에서 볼터에 순결의 인장을 봉인하며 흔들림 없는 신앙을 다졌다.",
        effects: { stats: { WP: 3, BS: 2 }, faith: 9, corruption: -8, align: { dogmatic: 2 } }
      };
    }
    if (ag === "inquisition") {
      return {
        id: "career_action",
        name: "비밀 심문 · 지하 첩보망 해독",
        desc: "지성 +3, 권위 +3, 의지 +2, 오염 +2 (재사용 4년)",
        btnLabel: "비밀 첩보 해독",
        toastMsg: "심문소 암호 첩보를 해독했다.",
        logText: "암호화된 이단 결사 명단과 지하 정보원의 보고를 대조해 성계 내 음모를 파악했다.",
        effects: { stats: { Int: 3, Inf: 3, WP: 2 }, corruption: 2 }
      };
    }
    if (ag === "mechanicus") {
      return {
        id: "career_action",
        name: "누스피어 고대 데이터 해독 의례",
        desc: "지성 +4, 강인 +2, 권위 +1 (재사용 4년)",
        btnLabel: "누스피어 해독",
        toastMsg: "누스피어 데이터 해독 의례를 마쳤다.",
        logText: "이진법 찬가를 읊으며 기계교 데이터 저장소의 파손된 고대 설계도를 복구했다.",
        effects: { stats: { Int: 4, T: 2, Inf: 1 } }
      };
    }
    if (ag === "navy") {
      return {
        id: "career_action",
        name: "함대 기동 연산 · 보이드 조종 훈련",
        desc: "민첩 +3, 지성 +2, 사격 +2 (재사용 4년)",
        btnLabel: "보이드 훈련 수행",
        toastMsg: "보이드 기동 훈련을 완료했다.",
        logText: "소행성대 회피 기동과 현측 거포 탄도 계산 모의 훈련에서 우수한 성적을 거뒀다.",
        effects: { stats: { Ag: 3, Int: 2, BS: 2 } }
      };
    }
    if (ag === "arbites") {
      return {
        id: "career_action",
        name: "하층 구역 제국법 일제 검문",
        desc: "백병 +2, 사격 +2, 권위 +3, 생명력 -4, 교조 +2 (재사용 4년)",
        btnLabel: "일제 검문 출동",
        toastMsg: "제국법 일제 검문 작전을 마쳤다.",
        logText: "아르비테스 장갑차를 몰고 무법 구역을 급습해 불법 무기상과 탈세범을 대거 체포했다.",
        effects: { stats: { WS: 2, BS: 2, Inf: 3 }, wounds: -4, align: { dogmatic: 2 } }
      };
    }
    if (ag === "administratum") {
      return {
        id: "career_action",
        name: "십일조 장부 감사 · 인맥 로비",
        desc: "지성 +3, 권위 +3, 교섭 +1 (재사용 4년)",
        btnLabel: "장부 감사 수행",
        toastMsg: "십일조 장부 감사를 완료했다.",
        logText: "밀린 행성 십일조 서류 3,000권을 야간에 처리해 상급 아뎁트의 눈도장을 확실히 찍었다.",
        effects: { stats: { Int: 3, Inf: 3, Fel: 1 } }
      };
    }
    if (ag === "ecclesiarchy") {
      return {
        id: "career_action",
        name: "대성당 광장 야외 부흥 설교",
        desc: "교섭 +3, 의지 +2, 신앙 +9, 오염 -6 (재사용 4년)",
        btnLabel: "부흥 설교 집전",
        toastMsg: "대성당 야외 부흥 설교를 마쳤다.",
        logText: "수천 명의 순례자 앞에서 황제의 영광을 열변해 시민들의 불안을 신앙으로 승화시켰다.",
        effects: { stats: { Fel: 3, WP: 2 }, faith: 9, corruption: -6 }
      };
    }
    if (ag === "rogue_trader") {
      return {
        id: "career_action",
        name: "변경 성계 비밀 교역 · 영장 행사",
        desc: "권위 +4, 교섭 +3, 민첩 +1 (재사용 4년)",
        btnLabel: "비밀 교역 실행",
        toastMsg: "변경 성계 교역을 성사시켰다.",
        logText: "황제의 무역 영장을 앞세워 변방 총독들과 희귀 향신료·고대 유물 독점 계약을 체결했다.",
        effects: { stats: { Inf: 4, Fel: 3, Ag: 1 } }
      };
    }
    if (ag === "guild_magnate") {
      return {
        id: "career_action",
        name: "차티스트 상선 계약 · 길드 독점 조율",
        desc: "권위 +3, 교섭 +3, 지성 +2 (재사용 4년)",
        btnLabel: "상단 계약 체결",
        toastMsg: "성간 교역 독점 계약을 성사시켰다.",
        logText: "궤도 화물선 항로 지분과 매뉴팩토룸 원자재 독점 납품 계약을 체결해 가문 금고를 불렸다.",
        effects: { stats: { Inf: 3, Fel: 3, Int: 2 } }
      };
    }
    if (ag === "psyker") {
      return {
        id: "career_action",
        name: "황제의 타로 명상 · 정신 방벽 훈련",
        desc: "의지 +4, 지성 +2, 오염 -6 (재사용 4년)",
        btnLabel: "타로 명상 수행",
        toastMsg: "황제의 타로 명상을 마쳤다.",
        logText: "사이킥 억제 후드를 점검하며 워프의 잡음을 차단하고 황제의 타로 계시를 읽었다.",
        effects: { stats: { WP: 4, Int: 2 }, corruption: -6 }
      };
    }
    if (ag === "navigator") {
      return {
        id: "career_action",
        name: "아스트로노미칸 성도 측량 · 제3의 눈 조율",
        desc: "의지 +3, 지성 +3, 권위 +2, 오염 -4 (재사용 4년)",
        btnLabel: "워프 성도 측량",
        toastMsg: "아스트로노미칸 등불과 워프 조류를 측량했다.",
        logText: "항법탑의 황동 천구의 앞에서 제3의 눈을 열어 격동하는 워프 조류의 안전한 항로를 새로 기록했다.",
        effects: { stats: { WP: 3, Int: 3, Inf: 2 }, corruption: -4 }
      };
    }
    if (ag === "assassin") {
      return {
        id: "career_action",
        name: "신전 살상 의례 · 표적 동선 분석",
        desc: "민첩 +3, 백병 +2, 사격 +2, 의지 +2, 암흑 +2 (재사용 4년)",
        btnLabel: "살상 의례 수행",
        toastMsg: "암살 신전의 살상 의례와 표적 분석을 마쳤다.",
        logText: "정지장 보관소에서 무구와 독극물을 점검하며 제국 고위 표적의 경비 허점을 냉철하게 계산했다.",
        effects: { stats: { Ag: 3, WS: 2, BS: 2, WP: 2 }, align: { ruthless: 2 } }
      };
    }
    if (ag === "knight") {
      const isSquire = state.careerId === "knight_squire" && !state.tags.includes("knight_scion");
      return {
        id: "career_action",
        name: isSquire ? "헬름 메카니쿰 교감 · 아미저 무장 조율" : "스론 메카니쿰 교감 · 이온 실드 조율",
        desc: "백병 +3, 사격 +2, 의지 +3, 권위 +1 (재사용 4년)",
        btnLabel: isSquire ? "아미저 무장 조율" : "기사 장갑 조율",
        toastMsg: isSquire ? "헬름 메카니쿰 교감과 아미저 무장 점검을 마쳤다." : "스론 메카니쿰 교감과 무장 점검을 마쳤다.",
        logText: isSquire
          ? "사크리스탄 사제들의 향불 속에서 아미저의 헬름 메카니쿰과 리퍼 체인클리버의 신경 반응을 조율했다."
          : "사크리스탄 사제들의 향불 속에서 나이트 아머의 이온 실드와 선조 기계령의 기억을 조화시켰다.",
        effects: { stats: { WS: 3, BS: 2, WP: 3, Inf: 1 } }
      };
    }
    if (ag === "knight_lord") {
      return {
        id: "career_action",
        name: "기사 대의회 소집 · 기사단 출정 사열",
        desc: "권위 +4, 교섭 +3, 의지 +2, 백병 +2 (재사용 4년)",
        btnLabel: "기사 대의회 소집",
        toastMsg: "기사 가문 대의회와 출정 사열을 주재했다.",
        logText: "기사 행성의 깃발 아래 수십 기의 임페리얼 나이트 랜스를 사열하고 가문 간 동맹 서약을 갱신했다.",
        effects: { stats: { Inf: 4, Fel: 3, WP: 2, WS: 2 } }
      };
    }
    if (ag === "living_saint") {
      const aspect = getLivingSaintAspect(state);
      const isWrath = aspect === "wrath";
      const isVessel = state.careerId === "saint_vessel" && !state.tags.includes("living_saint");
      return {
        id: "career_action",
        name: isWrath ? "심판의 성광 현현 · 이단 정화 축복" : "자비의 성광 현현 · 전선 치유 축복",
        desc: isWrath
          ? "의지 +4, 백병 +3, 권위 +3, 신앙 +10, 오염 -12, 교조 +3 (재사용 4년)"
          : "의지 +4, 교섭 +3, 권위 +3, 신앙 +10, 오염 -12, 자비 +3, 생명력 +12 (재사용 4년)",
        btnLabel: "황금 성광 현현",
        toastMsg: isWrath ? "심판의 성광으로 전선의 이단과 어둠을 불태웠다." : "자비의 성광으로 절망에 빠진 장병과 피난민을 어루만졌다.",
        logText: isWrath
          ? (isVessel
              ? "황금빛 불꽃이 검과 두 손에 서리며 전선의 공포를 단숨에 몰아내고 이단의 그림자를 정화했다."
              : "황금빛 불꽃이 검과 날개에 서리며 전선의 공포를 단숨에 몰아내고 이단의 그림자를 정화했다.")
          : "따스한 황금빛 성광이 잿빛 전장을 감싸자 부상병의 고통이 잦아들고 병사들이 다시 눈물을 닦고 일어섰다.",
        effects: isWrath
          ? { stats: { WP: 4, WS: 3, Inf: 3 }, faith: 10, corruption: -12, align: { dogmatic: 3 } }
          : { stats: { WP: 4, Fel: 3, Inf: 3 }, wounds: 12, faith: 10, corruption: -12, align: { humane: 3 } }
      };
    }
    if (ag === "daemon_prince") {
      return {
        id: "career_action",
        name: "워프 폭풍 소환 · 악마 군세 사열",
        desc: "백병 +4, 의지 +4, 권위 +3, 신앙 -10, 암흑 +4 (재사용 4년)",
        btnLabel: "워프 권능 행사",
        toastMsg: "불멸의 워프 권능으로 악마 군세를 사열했다.",
        logText: "현실의 막을 찢고 암흑 신의 축복을 끌어내려 필멸자 성계에 공포의 징조를 새겼다.",
        effects: { stats: { WS: 4, WP: 4, Inf: 3 }, faith: -10, align: { ruthless: 4 } }
      };
    }
    if (ag === "chaos_csm") {
      return {
        id: "career_action",
        name: "배신자 워밴드 약탈 · 투기장 결투",
        desc: "백병 +4, 강인 +2, 권위 +2, 오염 +5, 암흑 +4 (재사용 4년)",
        btnLabel: "워밴드 약탈 출격",
        toastMsg: "배신자 워밴드 투기장 결투와 약탈을 마쳤다.",
        logText: "전함 투기장에서 도전자들을 제압하고 제국 보급 수송선을 습격해 탄약과 노예를 확보했다.",
        effects: { stats: { WS: 4, T: 2, Inf: 2 }, corruption: 5, faith: -5, align: { ruthless: 4 } }
      };
    }
    if (ag === "chaos_cult") {
      return {
        id: "career_action",
        name: "지하 암흑 제단 비밀 의식",
        desc: "의지 +3, 백병 +2, 오염 +7, 신앙 -6, 암흑 +3 (재사용 4년)",
        btnLabel: "암흑 의식 집전",
        toastMsg: "지하 제단의 비밀 의식을 마쳤다.",
        logText: "아르비테스의 눈을 피해 지하 폐허에서 금단의 주문을 읊으며 워프의 불경한 기운을 끌어당겼다.",
        effects: { stats: { WP: 3, WS: 2 }, corruption: 7, faith: -6, align: { ruthless: 3 } }
      };
    }
    if (ag === "ganger") {
      return {
        id: "career_action",
        name: "언더하이브 밀수 · 구역 순찰",
        desc: "민첩 +3, 백병 +2, 권위 +2, 생명력 -4, 암흑 +3 (재사용 4년)",
        btnLabel: "밀수 순찰 출동",
        toastMsg: "언더하이브 밀수 거래를 마쳤다.",
        logText: "하층 배수관 암시장에서 탄약과 정제수를 빼돌려 구역 내 입지를 넓혔다.",
        effects: { stats: { Ag: 3, WS: 2, Inf: 2 }, wounds: -4, align: { ruthless: 3 } }
      };
    }
    return {
      id: "career_action",
      name: "야간 연장 할당량 완수 · 길드 청탁",
      desc: "강인 +2, 권위 +2, 지성 +1, 생명력 -4 (재사용 4년)",
      btnLabel: "연장 작업 수행",
      toastMsg: "야간 연장 할당량을 완수했다.",
      logText: "기계 소음 속에서 연장 근무를 버텨 내며 작업반장과 길드 서기에게 작은 공로를 인정받았다.",
      effects: { stats: { T: 2, Inf: 2, Int: 1 }, wounds: -4 }
    };
  }

  function performAction(state, actionId, param) {
    if (!state.alive || state.pendingEvent) return { ok: false, msg: "사건을 먼저 해결해야 한다." };

    if (actionId === "career_action") {
      const act = getCareerAction(state);
      if (!act) return { ok: false, msg: "현재 직군 고유 행동을 수행할 수 없다 (재사용 대기 4년)." };
      state.lastCareerActionYear = state.year;
      const eff = act.effects || {};
      let appliedStats = null;
      if (eff.stats) {
        appliedStats = {};
        for (const [k, d] of Object.entries(eff.stats)) {
          if (state.stats[k] !== undefined) {
            const actual = applyDiminishedStatGain(state, k, d, "event");
            if (actual !== 0) appliedStats[k] = actual;
          }
        }
      }
      if (eff.wounds) {
        const floor = eff.wounds < 0 ? Math.min(state.wounds, 5) : 1;
        state.wounds = clamp(state.wounds + eff.wounds, floor, state.maxWounds);
      }
      if (eff.faith) state.faith = clamp(state.faith + eff.faith, 0, 100);
      if (eff.corruption) {
        if (!(eff.corruption > 0 && isIncorruptibleState(state))) {
          state.corruption = clamp(state.corruption + eff.corruption, 0, 99);
        }
      }
      if (eff.align) applyAlignDelta(state, eff.align);
      const effForDelta = appliedStats ? Object.assign({}, eff, { stats: appliedStats }) : eff;
      addLog(state, act.logText, "success", null, {
        badge: "직군 고유 행동",
        deltaText: formatDeltaText(effForDelta)
      });
      return { ok: true, msg: act.toastMsg };
    }

    if (actionId === "rejuvenat") {
      const chk = canUseRejuvenat(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };

      state.rejuvenatCount += 1;
      state.lastRejuvenatAge = state.age;
      state.extraLifeBonus += 55;
      state.stats.Inf = clamp(state.stats.Inf - chk.infCost, 5, 100);
      state.stats.T = clamp(state.stats.T + 4, 5, 100);
      state.wounds = clamp(state.wounds + 30, 1, state.maxWounds);
      if (!state.tags.includes("rejuvenat")) state.tags.push("rejuvenat");
      addLog(state, `막대한 재력과 인맥을 동원해 리주버냇 수명 연장 시술(${state.rejuvenatCount}/3회)을 받았다.`, "success", null, {
        badge: "수명 연장",
        deltaText: `기대수명 +55년 · 생명력 +30 · 권위 -${chk.infCost}`
      });
      return { ok: true };
    }

    if (actionId === "augmetics") {
      const chk = canUseAugmetics(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };

      state.augmeticsCount += 1;
      state.lastAugmeticsAge = state.age;
      if (chk.infCost) state.stats.Inf = clamp(state.stats.Inf - chk.infCost, 5, 100);
      state.stats.T = clamp(state.stats.T + 5, 5, 100);
      state.stats.WS = clamp(state.stats.WS + 3, 5, 100);
      state.stats.Int = clamp(state.stats.Int + 3, 5, 100);
      state.stats.Fel = clamp(state.stats.Fel - 2, 5, 100);
      state.maxWounds += 10;
      state.wounds = clamp(state.wounds + 15, 1, state.maxWounds);
      state.extraLifeBonus += 18;
      if (!state.tags.includes("bionic")) state.tags.push("bionic");
      const via = chk.isMech ? "기계교 성소의 교리 의례로" : "막대한 비용과 계급 특권을 들여";
      addLog(state, `${via} 생체 의체 개조(${state.augmeticsCount}/3단계)를 시술받았다.`, "success", null, {
        badge: "의체 개조",
        deltaText: `강인 +5 · 백병 +3 · 지성 +3${chk.infCost ? " · 권위 -" + chk.infCost : ""}`
      });
      return { ok: true };
    }

    if (actionId === "penance") {
      const chk = canUsePenance(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };

      state.lastPenanceYear = state.year;
      state.corruption = clamp(state.corruption - 14, 0, 100);
      state.faith = clamp(state.faith + 7, 0, 100);
      state.wounds = clamp(state.wounds - 7, 5, state.maxWounds);
      let deltaText = "오염 -14 · 신앙 +7 · 생명력 -7";
      if (normalizeAlignment(state).ruthless > 0) {
        applyAlignDelta(state, { ruthless: -3, dogmatic: 1 });
        deltaText += " · 암흑 -3 · 교조 +1";
      }
      addLog(state, "성당에서 혹독한 고행과 참회 기도를 올려 워프 오염을 정화했다.", "event", null, {
        badge: "정화 고행",
        deltaText
      });
      return { ok: true };
    }

    if (actionId === "travel") {
      const evalRes = evaluateTravelAttempt(state, param);
      if (!evalRes.valid) return { ok: false, msg: evalRes.reason || "이동할 수 없다." };

      const target = getWorld(param);
      state.lastTravelYear = state.year;

      if (!evalRes.autoApprove) {
        const roll = randInt(1, 100);
        const success = roll <= evalRes.chance;
        const rollMeta = {
          statKey: evalRes.statKey || "Inf",
          statName: evalRes.authority,
          target: evalRes.chance,
          roll,
          success,
          critSuccess: roll <= 5,
          critFail: roll >= 96,
          diff: 0
        };
        state.lastRoll = rollMeta;

        if (!success) {
          if (evalRes.denyStats) {
            for (const [k, d] of Object.entries(evalRes.denyStats)) {
              if (state.stats[k] !== undefined) state.stats[k] = clamp(state.stats[k] + d, 5, 100);
            }
          }
          if (evalRes.denyWounds) {
            state.wounds = clamp(state.wounds + evalRes.denyWounds, 5, state.maxWounds);
          }
          const denyText = evalRes.denyText || "상부의 불허로 성간 이동 청원이 기각되었다.";
          addLog(state, `[${target.name} 이동 청원 기각] ${denyText}`, "danger", rollMeta, { badge: "이동 불허" });
          return { ok: false, denied: true, roll: rollMeta, msg: `이동 청원 기각! (주사위 ${roll} / 승인율 ${evalRes.chance}%)` };
        }
      }

      state.worldId = target.id;
      if (!state.visitedWorlds.includes(target.id)) state.visitedWorlds.push(target.id);
      if (target.segmentum !== "random") state.segmentum = target.segmentum;

      syncImperialNihilus(state);

      const modeText = evalRes.autoApprove ? "자율 지휘권으로" : `(${evalRes.authority} 승인)을 받아`;
      addLog(
        state,
        `${modeText} 워프 항해를 거쳐 [${target.name}](${DATA.SEGMENTA[state.segmentum].name})(으)로 파견·이동했다.`,
        "career",
        evalRes.autoApprove ? null : state.lastRoll,
        { badge: "성간 이동" }
      );
      return { ok: true, target, autoApprove: evalRes.autoApprove };
    }

    if (actionId === "retire_honorable") {
      const chk = canRetireHonorably(state);
      if (!chk.ok) return { ok: false, msg: chk.reason };
      const ev = createHonorableEndingEvent(state);
      state.pendingEvent = ev;
      return { ok: true, openedEvent: ev, msg: "생애를 갈무리할 최후의 결단을 열었다." };
    }

    return { ok: false, msg: "알 수 없는 행동이다." };
  }


  return {
    canUseRejuvenat,
    canUseAugmetics,
    canUsePenance,
    getCareerAction,
    performAction
  };
}
