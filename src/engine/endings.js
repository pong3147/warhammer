// 생애 마감 · 명예 은퇴 · 상태 요약 · 동적 추모 에필로그 · 부고 등급 판정 모듈
import {
  FOCUSES,
  formatImperialDate,
  formatImperialYear,
  getAlignmentInfo,
  resolveFactionEndingKey
} from "./formatters.js";

export function createEndingsModule(deps) {
  const {
    getWorld,
    getCareer,
    getCharacter,
    getCareerShortName,
    describeReq,
    getLivingSaintAspect,
    getCareerDisplayTitle,
    computeLifeExpectancy,
    addLog,
    getContextualOptions
  } = deps;

  function canRetireHonorably(state) {
    if (!state || !state.alive || state.careerId === "child") {
      return { ok: false, reason: "성년 직무 편입 후 100세 이상, 최고위 계급 55세 이상, 또는 기대수명 85% 도달 시 생애를 명예롭게 마감할 수 있다." };
    }
    const career = getCareer(state.careerId);
    const lifeExp = computeLifeExpectancy(state);
    const isCentenarian = state.age >= 100;
    const isApexVeteran = career.tier >= 6 && state.age >= 55;
    const isElderTwilight = state.age >= 65 && state.age >= Math.floor(lifeExp * 0.85);
    if (!isCentenarian && !isApexVeteran && !isElderTwilight) {
      return { ok: false, reason: "아직 생애를 마감할 고령이나 최고위 정점에 이르지 않았다." };
    }

    const factionKey = resolveFactionEndingKey(state, career);
    switch (factionKey) {
      case "daemon_prince":
        return {
          ok: true,
          name: "위대한 게임 영구 승천 (생애 마감)",
          desc: "필멸의 은하를 뒤로하고 워프 심연의 영원한 전장으로 물러나 영혼의 전당에 기록을 남긴다.",
          btnLabel: "최후의 결단 열기"
        };
      case "chaos_heretic":
        return {
          ok: true,
          name: "공포의 눈 최후 약탈 원정 (생애 마감)",
          desc: "남은 워밴드를 이끌고 대균열 심연으로 마지막 항해에 나서 배교의 연대기를 완결한다.",
          btnLabel: "최후의 결단 열기"
        };
      case "living_saint":
        return {
          ok: true,
          name: "황금 성광으로의 승화 (생애 마감)",
          desc: "필멸의 은하에 기적의 빛을 남기고 황금 옥좌의 부름에 응해 성광 속으로 영원히 승화한다.",
          btnLabel: "최후의 결단 열기"
        };
      case "custodes":
        return {
          ok: true,
          name: "황제의 눈 은퇴 의식 (생애 마감)",
          desc: "황금 갑주를 무기고에 반납하고 제국 변방의 은밀한 감시자로 물러나 생애를 명예롭게 갈무리한다.",
          btnLabel: "최후의 결단 열기"
        };
      case "dreadnought":
        return {
          ok: true,
          name: "강철 석관의 영원한 안식 (생애 마감)",
          desc: "수세기의 봉사를 마치고 챕터 영웅의 전당에서 영구 동면에 들어 생애를 명예롭게 마감한다.",
          btnLabel: "최후의 결단 열기"
        };
      case "grey_knight":
      case "astartes":
        return {
          ok: true,
          name: "최후의 영광스러운 성전 출정 (생애 마감)",
          desc: "노쇠한 육신으로 제국 최전선에 마지막 돌격을 감행해 영혼의 전당에 불멸의 이름을 새긴다.",
          btnLabel: "최후의 결단 열기"
        };
      case "imperial_knight":
        return {
          ok: true,
          name: "스론 메카니쿰 영원한 안치 (생애 마감)",
          desc: "후계자에게 기사 갑주와 가문의 맹세를 물려주고 선조들의 기억 속으로 명예롭게 합일한다.",
          btnLabel: "최후의 결단 열기"
        };
      case "officio_assassinorum":
        return {
          ok: true,
          name: "테라 비밀 신전 영구 동면 (생애 마감)",
          desc: "모든 표적 장부를 봉인하고 이름 없는 정지장 관 속으로 들어가 영원한 침묵의 휴식에 든다.",
          btnLabel: "최후의 결단 열기"
        };
      case "navis_navigator":
        return {
          ok: true,
          name: "항법사 성소 최후의 성도 봉헌 (생애 마감)",
          desc: "일생 동안 측량한 워프 항로와 성도를 가문 대서고에 남기고 파테르노바의 품으로 물러난다.",
          btnLabel: "최후의 결단 열기"
        };
      case "mechanicus":
        return {
          ok: true,
          name: "대서고 데이터 합일 승화 (생애 마감)",
          desc: "축적한 지식과 기억을 기계교 성소 코지테이터에 영구 이관하고 옴니시아의 품으로 든다.",
          btnLabel: "최후의 결단 열기"
        };
      default:
        return {
          ok: true,
          name: "명예로운 퇴임과 생애 갈무리 (생애 마감)",
          desc: "후계자에게 직책과 유산을 물려주고 황제의 품으로 평온히 물러나 영혼의 전당에 기록을 남긴다.",
          btnLabel: "최후의 결단 열기"
        };
    }
  }

  function createHonorableEndingEvent(state) {
    const career = getCareer(state.careerId);
    const titleStr = getCareerDisplayTitle(state, career);
    const world = getWorld(state.worldId);
    const factionKey = resolveFactionEndingKey(state, career);
    let title = "생애의 갈무리 — 명예로운 퇴임의 시간";
    let text = `어느덧 ${state.age}세에 이른 [${titleStr}]로서 수십 년에 걸친 제국의 풍파를 버텨 냈다. 지금 직책을 내려놓고 후대에 기록을 남길 것인지, 아니면 끝까지 현역으로 싸울 것인지 스스로 결정할 때다.`;
    let retireLabel = "후계자에게 직책을 물려주고 명예롭게 생애를 마감한다 (영혼의 전당 등재)";
    let retireText = `긴 세월의 소임을 마친 [${titleStr}]은(는) 모든 인장과 기록을 정돈한 뒤 조용히 눈을 감았다. 그대의 생애는 제국 영혼의 전당에 영구히 등재되었다.`;
    let retireCause = `향년 ${state.age}세, ${world.name}에서 긴 소임을 완수하고 명예로운 퇴임 끝에 황제의 품으로 영면`;

    switch (factionKey) {
      case "daemon_prince":
        title = "생애의 갈무리 — 위대한 게임으로의 영구 승천";
        text = `${state.age}세의 세월 동안 필멸의 은하를 짓밟아 온 불멸의 데몬 프린스 앞에 워프 심연의 거대한 균열이 열렸다. 물질 우주에서의 연대기를 여기서 갈무리하고 암흑 신들의 위대한 게임으로 영구히 승천할 수 있다.`;
        retireLabel = "물질 우주를 뒤로하고 워프 심연의 위대한 게임으로 영구 승천한다 (영혼의 전당 등재)";
        retireText = "현실의 막 너머로 걸어 들어간 그대의 이름은 오르도 말레우스 금서고에 영원한 재앙으로 각인되었다.";
        retireCause = `향년 ${state.age}세, 물질 우주의 연대기를 마치고 워프 심연의 위대한 게임으로 영구 승천`;
        break;
      case "chaos_heretic":
        title = "생애의 갈무리 — 공포의 눈 최후 원정";
        text = `${state.age}세에 이른 배교자 [${titleStr}]은(는) 이미 은하에 지워지지 않을 피의 흔적을 남겼다. 워밴드의 기함을 몰아 대균열의 가장 깊은 폭풍 속으로 최후의 약탈 원정을 떠나 연대기를 마감할 수 있다.`;
        retireLabel = "대균열 심연으로 최후의 약탈 원정을 떠난다 (영혼의 전당 등재)";
        retireText = "붉은 워프의 폭풍 속으로 사라진 그대의 기함은 훗날 제국 함대의 공포스러운 전설로만 전해졌다.";
        retireCause = `향년 ${state.age}세, 대균열 심연으로 최후의 배신자 원정을 떠나 행방불명`;
        break;
      case "living_saint":
        title = "생애의 갈무리 — 황금 성광으로의 승화";
        text = `${state.age}세의 세월 동안 어둠 속 전장을 밝혀 온 [${titleStr}] 위로 아스트로노미칸의 따스한 빛기둥이 내려앉았다. 지금 이 순간 필멸의 형상을 내려놓고 황제의 곁으로 돌아가, 언젠가 인류가 가장 절망할 때 다시 강림할 약속으로 남을 수 있다.`;
        retireLabel = "찬란한 황금 성광 속으로 승화해 황제의 곁으로 돌아간다 (영혼의 전당 등재)";
        retireText = "황금빛 깃털과 향기만 남긴 채 그대의 형상이 빛 속으로 녹아들었다. 모든 성당의 종이 저절로 울려 퍼졌다.";
        retireCause = `향년 ${state.age}세, ${world.name} 전선 위에 황금 성광을 남기고 황제의 곁으로 영구 승화`;
        break;
      case "custodes":
        title = "생애의 갈무리 — 황제의 눈으로 물러나다";
        text = `${state.age}세에 이른 쿠스토데스로서 반사 속도가 단 0.01초 무뎌졌음을 스스로 깨달았다. 만 명의 수호자 전통에 따라 황금 갑주와 가디언 스피어를 무기고에 반납하고, 제국 변방의 위협을 감시하는 '황제의 눈'으로 은퇴할 수 있다.`;
        retireLabel = "황금 갑주를 반납하고 '황제의 눈'으로 명예 은퇴한다 (영혼의 전당 등재)";
        retireText = "황궁 영원의 회랑에 그대의 수백 개 진명이 새겨졌고, 그대는 검은 망토를 걸친 채 황금 옥좌의 그림자 너머로 조용히 떠났다.";
        retireCause = `향년 ${state.age}세, 쿠스토데스 전통에 따라 황금 갑주를 반납하고 황제의 눈으로 명예 은퇴`;
        break;
      case "dreadnought":
        title = "생애의 갈무리 — 강철 석관의 영원한 안식";
        text = `수세기를 싸워 온 고대 드레드노트의 동력로가 고요히 숨을 고른다. 테크마린과 채플린이 지켜보는 가운데 챕터 영웅의 전당으로 돌아가 영원한 안식에 들 수 있다.`;
        retireLabel = "챕터 성소의 제단에서 영원한 안식에 든다 (영혼의 전당 등재)";
        retireText = "성유와 향불 속에서 고대인의 사르코파구스가 영원히 잠들었다. 챕터의 모든 형제들이 무릎을 꿇고 경례를 올렸다.";
        retireCause = `향년 ${state.age}세, 챕터 영웅의 전당에서 강철 석관의 영원한 안식에 듦`;
        break;
      case "grey_knight":
      case "astartes":
        title = "생애의 갈무리 — 최후의 영광스러운 성전";
        text = `${state.age}세의 장구한 세월 동안 수백 개의 전장을 누빈 [${titleStr}] 앞에 마지막 결전의 부름이 울린다. 후배 형제들에게 챕터의 미래를 맡기고 가장 치열한 전선으로 최후의 출정에 나설 수 있다.`;
        retireLabel = "형제들에게 유산을 맡기고 최후의 영광스러운 성전에 출정한다 (영혼의 전당 등재)";
        retireText = "황제의 이름을 외치며 적진 한가운데로 돌격한 그대의 마지막 전투는 수천 년 동안 챕터의 서사시로 노래되었다.";
        retireCause = `향년 ${state.age}세, 최전선 최후의 성전에서 수많은 적을 쓰러뜨리고 영광스럽게 순직`;
        break;
      case "imperial_knight":
        title = "생애의 갈무리 — 스론 메카니쿰의 선조가 되다";
        text = `${state.age}세에 이른 [${titleStr}]의 기사 갑주가 사크리스탄 성소로 돌아왔다. 젊은 후계자에게 고삐를 넘겨주고 스론 메카니쿰 속 선조들의 메아리로 영원히 자리 잡을 시간이다.`;
        retireLabel = "후계자에게 기사 갑주를 물려주고 선조들의 기억 속으로 안식한다 (영혼의 전당 등재)";
        retireText = "사크리스탄의 축성 종소리 속에 그대의 인장이 기사 갑주의 제단에 봉안되었고, 다음 세대 조종사의 정신 속에 그대의 지혜가 깃들었다.";
        retireCause = `향년 ${state.age}세, 기사 가문 성소에 갑주를 봉납하고 스론 메카니쿰의 선조로 영면`;
        break;
      case "officio_assassinorum":
        title = "생애의 갈무리 — 이름 없는 정지장 관의 침묵";
        text = `${state.age}세의 세월 동안 제국의 적들을 그림자 속에서 지워 온 [${titleStr}]의 임무 장부가 마지막 줄에 다다랐다. 테라 비밀 신전의 영구 정지장 관에 몸을 눕혀 영원한 침묵으로 생애를 닫을 수 있다.`;
        retireLabel = "표적 장부를 봉인하고 테라 비밀 신전의 영구 정지장 관에 든다 (영혼의 전당 등재)";
        retireText = "차가운 정지장 뚜껑이 닫히며 어떤 공식 기록에도 남지 않은 위대한 암살자의 연대기가 완결되었다.";
        retireCause = `향년 ${state.age}세, 오피시오 아사시노룸 비밀 신전의 영구 정지장 관에 안치되어 생애 마감`;
        break;
      case "navis_navigator":
        title = "생애의 갈무리 — 최후의 워프 성도 봉헌";
        text = `${state.age}세의 세월 동안 아스트로노미칸의 빛을 따라 은하를 가로질러 온 [${titleStr}]의 제3의 눈이 깊은 평온을 맞았다. 가문 대서고에 모든 항로 성도를 봉헌하고 항법사 궁정에서 조용히 눈을 감을 수 있다.`;
        retireLabel = "가문 대서고에 워프 성도를 봉헌하고 명예롭게 은퇴한다 (영혼의 전당 등재)";
        retireText = "그대가 남긴 황금 항로도는 수백 년 동안 제국 함대와 상선들을 워프의 폭풍에서 지켜 냈다.";
        retireCause = `향년 ${state.age}세, 나비스 노빌리테 대서고에 최후의 성도를 봉헌하고 파테르노바의 품으로 영면`;
        break;
      case "mechanicus":
        title = "생애의 갈무리 — 대서고 데이터 합일 의식";
        text = `${state.age}세 동안 축적한 연산 기록과 지식의 총합이 임계점에 도달했다. 육신의 껍질을 내려놓고 화성 대서고의 신성한 코지테이터와 영구히 합일해 옴니시아의 기록으로 남을 수 있다.`;
        retireLabel = "기억과 지식을 대서고에 봉헌하고 옴니시아와 합일한다 (영혼의 전당 등재)";
        retireText = "이진법 찬가가 성소를 울리는 가운데 그대의 모든 지혜가 신성한 데이터 저장소에 영구 각인되었다.";
        retireCause = `향년 ${state.age}세, 기계교 대서고에 전 생애의 연산 기록을 봉헌하고 옴니시아와 합일`;
        break;
      default:
        break;
    }

    return {
      id: `dyn_honorable_end_${state.year}`,
      isTimeline: false,
      isHonorableEnding: true,
      category: "생애의 갈무리",
      reqLabel: `${state.age}세 · 명예 생애 마감`,
      title,
      text,
      choices: [
        {
          label: retireLabel,
          effect: {
            text: retireText,
            instantDeath: retireCause
          }
        },
        {
          label: "아직 바칠 사명이 남아 있다. 생애를 계속 이어 간다",
          effect: {
            text: "아직 물러날 때가 아니라고 다짐하고 다시 앞을 향해 걸음을 내디뎠다.",
            stats: { WP: 1 }
          }
        }
      ],
      source: "Imperium Vita Chronicle / Eyes of the Emperor & Chapter Lore"
    };
  }

  function buildStatusSummary(state) {
    if (!state) return "진행 중인 생애가 없다.";
    const world = getWorld(state.worldId);
    const focus = FOCUSES[state.focus] || FOCUSES.survival;
    const careerTitle = getCareerDisplayTitle(state);
    const lifeExp = computeLifeExpectancy(state);
    const alignInfo = getAlignmentInfo(state);
    const parts = [
      `${state.name}, ${state.age}세, ${formatImperialDate(state.year, state.quarter)}.`,
      `직책 ${careerTitle}, 현재 행성 ${world.name}.`,
      `생명력 ${state.wounds}/${state.maxWounds}, 기대수명 약 ${lifeExp}세, 황제 신앙 ${state.faith}, 워프 오염 ${state.corruption}.`,
      `도덕 성향 ${alignInfo.fullLabel}, ${alignInfo.detail}.`,
      `삶의 초점: ${focus.name}.`
    ];
    if (!state.alive) {
      parts.push(`사망 상태: ${state.deathCause || "생애 종료"}.`);
      return parts.join(" ");
    }
    if (state.pendingEvent) {
      parts.push(`현재 진행 중인 사건: ${state.pendingEvent.title}.`);
      return parts.join(" ");
    }
    const ctx = getContextualOptions(state);
    if (ctx.unlockedCareers.length > 0) {
      const names = ctx.unlockedCareers.slice(0, 2).map((c) => getCareerDisplayTitle(state, c)).join(", ");
      parts.push(`즉시 지원 가능한 진로 ${ctx.unlockedCareers.length}종: ${names}.`);
    } else if (ctx.readyEventCareers.length > 0) {
      const names = ctx.readyEventCareers.slice(0, 2).map((c) => getCareerDisplayTitle(state, c)).join(", ");
      parts.push(`발탁 이벤트 대기 중인 상위 진로 ${ctx.readyEventCareers.length}종: ${names}.`);
    } else if (ctx.nearCareers.length > 0) {
      const next = ctx.nearCareers[0];
      parts.push(`다음 목표 진로 ${next.name}, 필요 조건: ${describeReq(next.req) || "조건 없음"}.`);
    }
    return parts.join(" ");
  }

  function buildObituaryEpilogue(state, mode) {
    const tags = state.tags || [];
    const met = state.metCharacters || [];
    const alignInfo = getAlignmentInfo(state);
    const hasAnyBond =
      tags.includes("bond_heir") ||
      tags.includes("bond_family") ||
      tags.includes("bond_comrade") ||
      tags.includes("bond_mentor") ||
      tags.includes("bond_rival");

    if (mode === "spawn") {
      const spawnLines = [];
      if (hasAnyBond) {
        spawnLines.push("과거 맺었던 인연들마저 이단심문소의 기억 소거 속에 흔적 없이 지워졌다.");
      }
      if (alignInfo.dominant === "ruthless") {
        spawnLines.push("끝없는 탐욕과 무자비한 야망이 부른 참혹한 귀결이었다.");
      }
      return spawnLines.join(" ");
    }

    if (mode === "heretic") {
      const hereticLines = [];
      if (hasAnyBond) {
        hereticLines.push("남겨진 인연들 또한 그대의 배교 기록 앞에서 침묵하거나 뿔뿔이 흩어졌다.");
      }
      if (alignInfo.dominant === "ruthless") {
        hereticLines.push("권력과 약탈을 위해서라면 무엇이든 팔아넘겼던 냉혹한 삶은 결국 심연의 법칙으로 귀결되었다.");
      } else if (alignInfo.dominant === "humane") {
        hereticLines.push("제국의 폭정에 맞서 약자를 지키려던 연민마저 암흑의 속삭임에 뒤틀려 반역의 낙인으로 남았다.");
      } else if (alignInfo.dominant === "dogmatic") {
        hereticLines.push("끝없는 광신과 규율에 대한 집착이 도리어 오만과 배교의 낭떠러지로 그대를 밀어 넣었다.");
      }
      return hereticLines.join(" ");
    }

    const lines = [];

    if (tags.includes("bond_heir") && tags.includes("bond_family")) {
      lines.push("장성한 자녀와 배우자가 그대가 남긴 낡은 유품을 품에 안고 험난한 제국의 다음 세대를 이어 나갔다.");
    } else if (tags.includes("bond_heir")) {
      lines.push("그대의 피와 가르침을 물려받은 자녀가 성당의 촛불 아래 그대의 이름을 조용히 기렸다.");
    } else if (tags.includes("bond_family")) {
      lines.push("홀로 남은 배우자가 등불 아래 그대의 낡은 인식표와 반지를 고이 간직하며 긴 밤을 버텼다.");
    } else if (tags.includes("bond_comrade")) {
      lines.push("포화를 함께 견뎠던 옛 전우가 빈 술잔 하나를 더 채워 두고 그대의 몫까지 살아남으리라 맹세했다.");
    } else if (tags.includes("bond_mentor")) {
      lines.push("옛 스승의 낡은 수첩 여백에 그대의 마지막 발자취가 경건한 추모 문장으로 남았다.");
    } else if (tags.includes("bond_rival")) {
      lines.push("평생을 겨루었던 숙명의 정적만이 그대의 부고 앞에서 말없이 모자를 벗고 잔을 기울였다.");
    }

    const isSecretGuardian = tags.includes("grey_knight") || tags.includes("custodes") || tags.includes("sister_of_silence") || tags.includes("assassin");
    if (alignInfo.dominant === "humane") {
      if (isSecretGuardian) {
        lines.push("이름조차 세상에 남길 수 없는 비밀의 사명 속에서도, 필멸의 생명을 아끼던 그대의 조용한 절제는 동료 형제들의 기억 속에 남았다.");
      } else if (state.faith >= 60) {
        lines.push("황제의 자비로운 손길을 몸소 증명한 그대의 선행은 하층 구역의 등불 같은 전설로 구전되었다.");
      } else {
        lines.push("냉혹한 제국의 톱니바퀴 속에서도 끝내 인간적 양심을 버리지 않은 드문 영혼으로 조용히 기억되었다.");
      }
    } else if (alignInfo.dominant === "dogmatic") {
      if (state.faith >= 60) {
        lines.push("일말의 타협도 허용하지 않았던 철혈의 신앙과 교조는 이단자들에게 영원한 공포의 본보기로 남았다.");
      } else {
        lines.push("오직 제국법과 규율만을 잣대로 삼았던 서릿발 같은 생애는 두려움 섞인 경외 속에 기록되었다.");
      }
    } else if (alignInfo.dominant === "ruthless") {
      if (state.corruption < 35) {
        lines.push("워프의 유혹에 빠지지 않고도 순수한 탐욕과 냉혹한 수완만으로 제국의 정글을 지배했던 세속적 악인의 표본이었다.");
      } else {
        lines.push("수단과 방법을 가리지 않았던 암흑의 행적은 이단심문소 비밀 문서고의 짙은 의혹 속에 봉인되었다.");
      }
    }

    const directMet = tags.filter((t) => t.startsWith("met_")).map((t) => t.slice(4));
    const epilogueMet = directMet.length > 0 ? directMet : met;
    if (epilogueMet.length > 0) {
      if (epilogueMet.includes("guilliman") || epilogueMet.includes("lion")) {
        lines.push("살아 돌아온 프라이마크를 두 눈으로 친견했던 목격자의 기록으로 성역 서고에 별도 주석이 달렸다.");
      } else if (epilogueMet.includes("trazyn")) {
        lines.push("솔렘나스 무한 박물관의 정지장 전시 목록 한 줄에 그대의 흔적이 기묘하게 기록되었다는 소문이 은하 외곽을 떠돌았다.");
      } else if (epilogueMet.includes("kaldor_draigo")) {
        lines.push("제국 공식 역사서에서는 지워졌으나, 타이탄의 극비 서고에 그대가 마주한 은빛 방랑자와 금지된 진실의 증언이 봉인되었다.");
      } else if (epilogueMet.includes("kryptman")) {
        lines.push("제국 공식 역사서에서는 지워졌으나, 이단심문소 오르도 제노스의 극비 서고에 그대가 마주한 방화선의 진실과 증언이 봉인되었다.");
      } else if (epilogueMet.includes("abaddon") || epilogueMet.includes("ghazghkull") || epilogueMet.includes("mortarion")) {
        lines.push("은하 최악의 대적자를 마주하고도 끝내 버텨 냈던 생존자의 증언은 후대 전술 교범의 귀중한 사료로 남았다.");
      } else if (epilogueMet.includes("cain") || epilogueMet.includes("amberley_vail")) {
        lines.push("후일 이단심문소 기록보관소의 비밀 회고록 각주에 그대의 짧은 활약상이 뜻밖의 유머와 함께 수록되었다.");
      } else if (
        epilogueMet.includes("gaunt") ||
        epilogueMet.includes("yarrick") ||
        epilogueMet.includes("creed") ||
        epilogueMet.includes("grimaldus") ||
        epilogueMet.includes("macharius") ||
        epilogueMet.includes("ravensburg") ||
        epilogueMet.includes("canis_rex") ||
        epilogueMet.includes("morvenn_vahl")
      ) {
        lines.push("전장의 살아 있는 전설과 어깨를 나란히 했던 참전 이력이 추모비의 가장 높은 줄에 새겨졌다.");
      } else {
        const ch = getCharacter(epilogueMet[0]);
        if (ch) {
          lines.push(`생전에 ${ch.name}의 그림자를 직접 스쳐 지나갔던 희귀한 증인으로서 그대의 이름이 기록 끝에 병기되었다.`);
        }
      }
    }

    return lines.join(" ");
  }

  function evaluateLifeGrade(state) {
    const tags = state.tags || [];
    const career = getCareer(state.careerId);
    const factionKey = resolveFactionEndingKey(state, career);

    const withEpilogue = (res, mode = "loyal") => {
      const extra = buildObituaryEpilogue(state, mode);
      return extra ? { ...res, verdict: `${res.verdict} ${extra}` } : res;
    };

    const chaosGodNames = [];
    if (tags.includes("mark_khorne")) chaosGodNames.push("코른");
    if (tags.includes("mark_tzeentch")) chaosGodNames.push("젠취");
    if (tags.includes("mark_nurgle")) chaosGodNames.push("너글");
    if (tags.includes("mark_slaanesh")) chaosGodNames.push("슬라네쉬");

    if (factionKey === "daemon_prince") {
      const patron = chaosGodNames.length ? `${chaosGodNames.join("·")}의 ` : "암흑 사대신의 ";
      return withEpilogue({
        rank: "APOTHEOSIS — DAEMON PRINCE BANISHED",
        title: `${patron}불멸 데몬 프린스 워프 추방 기록`,
        verdict: "필멸의 육신은 끝내 파괴되었으나 영혼은 죽지 않았다. 그대의 이름은 오르도 말레우스 금서고의 가장 깊은 철제 금고에 새겨졌으며, 수백 년 뒤 워프의 균열 너머로 다시 돌아올 것이다."
      }, "heretic");
    }

    if (state.corruption >= 100) {
      return withEpilogue({
        rank: "CHAOS SPAWN TERMINATED",
        title: "뒤틀린 변이체 정화 기록",
        verdict: "워프의 축복을 감당하지 못해 육신과 이성이 카오스 스폰으로 붕괴했다. 이단심문소 정화반이 흔적조차 남기지 않고 소각했다."
      }, "spawn");
    }

    if (factionKey === "chaos_heretic" && (tags.includes("chaos_lord") || tags.includes("renegade_marine"))) {
      const title = tags.includes("chaos_lord") ? "배신자 군단의 공포 — 카오스 로드 최후" : "거짓 황제를 등진 배신자 아스타르테스";
      return withEpilogue({
        rank: "EXCOMMUNICATE TRAITORIS — LONG WAR",
        title,
        verdict: `${chaosGodNames.length ? `${chaosGodNames.join("·")}의 축복을 품고 ` : ""}수많은 제국 성계를 불태운 타락한 천사가 마침내 쓰러졌다. 과거 소속 챕터는 그대의 진명을 석비에서 영구히 지워 버렸다.`
      }, "heretic");
    }

    if ((factionKey === "chaos_heretic" || state.corruption >= 65) && chaosGodNames.length > 0) {
      return withEpilogue({
        rank: "DAMNATUS — CHAMPION OF RUIN",
        title: `${chaosGodNames[0]}의 낙인이 찍힌 배교자`,
        verdict: `암흑 신 ${chaosGodNames.join("·")}의 속삭임에 영혼을 내어 준 배교자였다. 오르도 헤레티쿠스의 칙령에 따라 생애 기록 전체가 금서고에 영구 봉인되었다.`
      }, "heretic");
    }

    if (
      factionKey === "chaos_heretic" ||
      state.corruption >= 65 ||
      (tags.includes("wanted_by_inquisition") &&
        !tags.includes("high_lord_terra") &&
        factionKey !== "living_saint" &&
        factionKey !== "custodes" &&
        factionKey !== "grey_knight")
    ) {
      return withEpilogue({
        rank: "EXCOMMUNICATE TRAITORIS",
        title: "이단 기록 말소 대상",
        verdict: "오르도 헤레티쿠스 명령에 따라 본 개체의 생애 기록은 영구 봉인 및 소각 처리되었다."
      }, "heretic");
    }

    const score =
      career.tier * 22 +
      state.seenTimeline.length * 14 +
      state.metCharacters.length * 10 +
      Math.floor(state.age * 0.4) +
      Math.floor(state.stats.Inf * 0.5);

    if (tags.includes("high_lord_terra")) {
      return withEpilogue({
        rank: "SENATORUM IMPERIALIS — HIGH LORD OF TERRA",
        title: `테라의 하이 로드 · ${getCareerShortName(state.careerId)}`,
        verdict: "인류제국 100만 행성과 수천조 영혼의 운명을 황궁 의회에서 직접 재단했던 열두 지배자 가운데 한 명이었다. 황금 옥좌의 대리인으로서 남긴 칙령들은 수천 년 동안 제국의 법전으로 남았다."
      });
    }

    if (factionKey === "living_saint") {
      const saintNoun = state.gender === "female" ? "성녀" : "성인";
      const aspect = getLivingSaintAspect(state);
      const isMercy = aspect === "mercy";
      const isWrath = aspect === "wrath";
      return withEpilogue({
        rank: "IMPERIAL LIVING SAINT — GOLDEN APOTHEOSIS",
        title: isMercy
          ? `자비의 성광을 비춘 살아 있는 ${saintNoun}`
          : isWrath
          ? `심판의 불꽃을 내린 살아 있는 ${saintNoun}`
          : `황금 날개의 살아 있는 ${saintNoun}`,
        verdict: isMercy
          ? "가장 깊은 어둠 속에서도 피난민과 부상병의 손을 놓지 않고 자비의 기적을 현현시켰던 불멸의 등불이었다. 인류가 다시 절망에 잠길 때 그대의 황금빛 날개가 어김없이 내려올 것이다."
          : isWrath
          ? "타협 없는 성광의 불길로 악마와 배교의 군세를 잿더미로 만들었던 황제의 살아 있는 심판자였다. 오펠리아 VII과 테라 대성당의 종이 그대의 이름을 영원히 기린다."
          : `필멸의 한계를 넘어 황제의 기적을 전장에 직접 구현했던 살아 있는 ${saintNoun === "성녀" ? "성녀였다" : "성인이었다"}. 시노드 대성당의 황금 성인전 첫머리에 그대의 전설이 영구 봉안되었다.`
      });
    }

    if (tags.includes("warmaster") || state.careerId === "warmaster") {
      return withEpilogue({
        rank: "WARMASTER OF THE IMPERIAL CRUSADE",
        title: "은하를 정복한 대성전 워마스터",
        verdict: "수억 명의 장병과 전함을 이끌고 암흑의 성계에 황제의 깃발을 꽂았던 불세출의 총사령관이었다. 성역의 모든 군사 사관학교가 그대의 전역을 영원한 교범으로 기린다."
      });
    }

    if (factionKey === "dreadnought") {
      return withEpilogue({
        rank: "ETERNAL SLUMBER OF THE ANCIENT",
        title: "강철 석관의 영원한 안식",
        verdict: `육신이 스러진 뒤에도 고대 드레드노트 석관 속에서 싸워 온 ${state.chapterName || "아스타르테스"}의 영웅이 마침내 영면에 들었다. 챕터 영웅의 전당에 불멸의 이름이 새겨졌다.`
      });
    }

    if (tags.includes("chapter_master") || state.careerId === "chapter_master") {
      return withEpilogue({
        rank: "LORD OF THE CHAPTER — ETERNAL GUARDIAN",
        title: `${state.chapterName || "아스타르테스"}의 위대한 챕터 마스터`,
        verdict: "천 명의 죽음의 천사와 요새 수도원을 이끌며 수세기의 암흑을 버텨 낸 불멸의 군주였다. 그대의 유품 갑주와 무구는 챕터 성소의 가장 높은 제단에 영원히 봉안되었다."
      });
    }

    if (tags.includes("living_miracle") || (tags.includes("saint_spark") && state.faith >= 80)) {
      return withEpilogue({
        rank: "BEATIFICATION PETITION — IMPERIAL SAINT",
        title: "에클레시아키 시성 청원 대상",
        verdict: "칠흑 같은 어둠 속에서 황제의 기적을 몸소 증명한 삶이었다. 시노드 원로회가 그대의 순교와 행적을 성인전에 등재하기 위한 심사에 착수했다."
      });
    }

    if (factionKey === "custodes") {
      return withEpilogue({
        rank: tags.includes("captain_general") ? "CAPTAIN-GENERAL OF THE TEN THOUSAND" : "NAMES OF THE TEN THOUSAND",
        title: tags.includes("captain_general") ? "만 명의 수호자를 이끈 캡틴-제너럴" : "황금 갑주 안쪽에 새겨진 이름",
        verdict: "황금 옥좌의 방패로 살다 간 불멸의 수호자였다. 황궁 영원의 회랑에 그대의 수백 개 진명이 경건히 각인되었다."
      });
    }

    if (tags.includes("sister_of_silence")) {
      return withEpilogue({
        rank: "TALONS OF THE EMPEROR — ANATHEMA PSYKANA",
        title: "침묵의 맹세를 지킨 황제의 발톱",
        verdict: "말 한마디 남기지 않은 채 검은 함선과 전장의 워프 폭풍을 잠재웠던 침묵의 자매였다. 오직 황궁의 소수 기록관만이 그대의 고요한 헌신을 기억한다."
      });
    }

    if (factionKey === "grey_knight") {
      return withEpilogue({
        rank: tags.includes("gk_supreme_master") ? "SUPREME GRAND MASTER OF TITAN" : "HALL OF CHAMPIONS — TITAN",
        title: tags.includes("gk_supreme_master") ? "타이탄의 불멸 슈프림 그랜드 마스터" : "타이탄 영웅의 전당 등재",
        verdict: "제국 시민 누구도 그대의 이름을 알지 못한다. 오직 토성의 위성 타이탄 지하 석벽만이 악마와 맞선 은빛 형제의 희생을 영원히 기억한다."
      });
    }

    if (factionKey === "officio_assassinorum") {
      const cladeLabel = tags.includes("clade_vindicare")
        ? "빈디카레 템플의 유령 저격수"
        : tags.includes("clade_callidus")
        ? "칼리두스 템플의 천의 얼굴"
        : tags.includes("clade_eversor")
        ? "에버서 템플의 광폭한 심판자"
        : tags.includes("clade_culexus")
        ? "쿨렉수스 템플의 영혼 없는 파멸자"
        : "오피시오 아사시노룸의 그림자 요원";
      return withEpilogue({
        rank: "OFFICIO ASSASSINORUM — REDACTED ARCHIVE",
        title: cladeLabel,
        verdict: "제국 공식 연대기 어디에도 그대의 이름은 남아 있지 않다. 그러나 단 한 발의 총성과 단 한 번의 잠입으로 무너진 반역 왕조의 폐허가 그대의 공훈을 영원히 증언한다."
      });
    }

    if (factionKey === "imperial_knight") {
      if (tags.includes("knight_high_king") || state.careerId === "knight_high_king") {
        const kingWord = state.gender === "female" ? "하이 퀸" : "하이 킹";
        return withEpilogue({
          rank: "HIGH MONARCH OF THE KNIGHT WORLD",
          title: `기사 가문 대의회를 이끈 ${kingWord}`,
          verdict: "수십 기의 임페리얼 나이트와 기사 행성의 명예를 어깨에 짊어졌던 불굴의 대군주였다. 그대의 기억과 기사도는 스론 메카니쿰의 가장 고귀한 메아리로 영원히 계승된다."
        });
      }
      if (tags.includes("knight_freeblade") || state.careerId === "knight_freeblade") {
        return withEpilogue({
          rank: "LEGEND OF THE FREEBLADE",
          title: "문장 없이 싸운 전설의 프리블레이드",
          verdict: "가문의 울타리를 떠나 가장 절망적인 제국 전선마다 홀로 강림했던 방랑 기사였다. 그대가 구해 낸 행성들의 서사시 속에 이름 없는 거신의 전설이 남았다."
        });
      }
      if (state.careerId === "knight_squire" && !tags.includes("knight_scion")) {
        return withEpilogue({
          rank: "HELM MECHANICUM — ARMIGER SQUIRE",
          title: "헬름 메카니쿰에 서약한 기사 가문 종자",
          verdict: "아미저의 리퍼 체인클리버와 이온 실드로 귀족 기사들의 측면을 엄호했던 충직한 종자였다. 비록 대기사 스론에 오르기 전에 생을 마감했으나, 가문의 종소리 속에 용맹한 서약의 이름이 새겨졌다."
        });
      }
      return withEpilogue({
        rank: "THRONE MECHANICUM — HONORED SCION",
        title: "스론 메카니쿰에 새겨진 임페리얼 나이트",
        verdict: "이온 실드와 리퍼 체인소드로 제국의 적진을 돌파했던 고귀한 기사였다. 사크리스탄 성소의 축성 종소리 속에 그대의 인장이 가문 제단에 영원히 봉안되었다."
      });
    }

    if (
      factionKey === "navis_navigator" &&
      (career.tree === "navis_navigator" || tags.includes("nav_novator") || tags.includes("navis_officer") || tags.includes("paternoval_envoy"))
    ) {
      const isNovator = tags.includes("nav_novator") || state.careerId === "nav_novator";
      const isSenior = tags.includes("navis_officer") || state.careerId === "nav_senior";
      return withEpilogue({
        rank: isNovator ? "NOVATOR OF THE NAVIS NOBILITE" : isSenior ? "CHARTMASTER OF THE ASTRONOMICAN" : "APPRENTICE OF THE THIRD EYE",
        title: isNovator
          ? "은하 항로를 지배한 항법사 대가주 노바토르"
          : isSenior
          ? "아스트로노미칸의 빛을 읽은 선임 항법사"
          : "제3의 눈으로 첫 성도를 열었던 견습 항법사",
        verdict: isNovator
          ? "수백 명의 항법사와 제국 성간 항로 지분을 통괄했던 나비스 노빌리테 대가문의 수장이었다. 그대가 개척한 황금 성도는 수세기 동안 제국 함대의 생명선이 되었다."
          : isSenior
          ? "제3의 눈으로 워프 폭풍을 꿰뚫으며 수많은 함선과 장병을 안전히 실우주로 인도했던 선임 항법사였다. 가문 대서고에 그대가 그린 성도가 영구 보존되었다."
          : "가문 탑을 떠나 제3의 눈으로 워프의 조류를 처음 읽었던 젊은 견습 항법사였다. 짧은 항해 끝에 남긴 초안 성도가 가문 서고의 한쪽 구석에 경건히 보관되었다."
      });
    }

    if (factionKey === "inquisition") {
      const isRadical = state.corruption >= 25 || tags.includes("tech_heresy") || tags.includes("xenos_contact");
      if (isRadical) {
        return withEpilogue({
          rank: "INQUISITORIAL SEAL — RADICAL ARCHIVE",
          title: "심문소 금서고 봉인 조서",
          verdict: "제국을 구하기 위해 스스로 금단의 경계를 걸었던 급진파 이단심문관이었다. 공훈은 찬란했으나 그 수단은 영구 기밀로 봉인되었다."
        });
      }
      return withEpilogue({
        rank: "ROSETTE OF UNYIELDING PURITY",
        title: tags.includes("lord_inquisitor") ? "성역 원로원의 불굴 로드 이단심문관" : "오르도의 불굴 심판관",
        verdict: "단 한 치의 타협도 없이 이단과 외계와 악마를 정화한 정통 이단심문관이었다. 그대가 남긴 로제트는 다음 세대 수행원에게 계승되었다."
      });
    }

    if (factionKey === "governor") {
      const isSector = tags.includes("sector_lord");
      return withEpilogue({
        rank: isSector ? "LORD OF THE SECTOR — IMPERIAL SOVEREIGN" : "IMPERIAL COMMANDER — RULER OF WORLDS",
        title: isSector ? "성역을 통치한 불세출의 섹터 로드" : "행성의 운명을 짊어진 임페리얼 커맨더",
        verdict: isSector
          ? "수십 개 행성과 수조 시민의 십일조와 방어를 통괄했던 성역의 대영주였다. 그대가 세운 통치 왕조는 성역 수도 첨탑의 황금 부조로 영원히 남았다."
          : "황제의 이름으로 한 행성 전체를 다스리며 십일조와 방위군을 지켜 낸 행성 총독이었다. 후계 가문이 그대의 인장과 영지를 계승했다."
      });
    }

    if (factionKey === "astartes" && tags.includes("astartes")) {
      if (tags.includes("role_chaplain") || tags.includes("role_apothecary") || tags.includes("role_techmarine") || tags.includes("role_librarian")) {
        const chapName = state.chapterName || "아스타르테스";
        if (tags.includes("role_chaplain")) {
          return withEpilogue({
            rank: "RECLUSIAM — KEEPER OF FAITH",
            title: `${chapName}의 영원한 채플린`,
            verdict: "해골 투구 아래 흔들림 없는 증오의 기도문으로 형제들의 영혼을 지킨 영적 수호자였다. 그대가 휘두른 크로지우스 아르카눔은 챕터 성소에 경건히 안치되었다."
          });
        }
        if (tags.includes("role_apothecary")) {
          return withEpilogue({
            rank: "APOTHECARION — GUARDIAN OF GENESEED",
            title: `${chapName}의 위대한 아포세카리`,
            verdict: "포화 속에서도 전사한 형제들의 진시드를 끝까지 회수해 챕터의 미래를 이어 낸 백색 갑주의 수호자였다. 수십 세대의 배틀 브라더가 그대의 헌신 덕분에 살아 숨 쉰다."
          });
        }
        if (tags.includes("role_techmarine")) {
          return withEpilogue({
            rank: "ARMOURY — MASTER OF THE FORGE",
            title: `${chapName}의 붉은 대장장이`,
            verdict: "화성의 비술과 챕터의 형제애를 함께 짊어지고 전차와 드레드노트의 기계령을 깨워 온 테크마린이었다. 챕터 무기고의 모든 화로가 그대의 안식을 위해 이진법 찬가를 울린다."
          });
        }
        return withEpilogue({
          rank: "LIBRARIUS — KEEPER OF THE VEIL",
          title: `${chapName}의 고결한 라이브러리안`,
          verdict: "워프의 광풍과 악마의 속삭임에 맞서 정신 방벽과 챕터의 역사를 지켜 낸 푸른 갑주의 현자였다. 그대의 전술 기록과 예지는 라이브러리우스 서고에 영구 보존되었다."
        });
      }
      if (tags.includes("astartes_captain") || tags.includes("terminator_honors") || state.age >= 120 || score >= 150) {
        return withEpilogue({
          rank: "CODEX HONORIS — ANGEL OF DEATH",
          title: `${state.chapterName || "아스타르테스"}의 불멸 전설`,
          verdict: "수많은 전장을 누빈 죽음의 천사였다. 아포세카리가 회수한 그대의 진시드는 다음 세대 배틀 브라더의 가슴속에서 다시 고동칠 것이다."
        });
      }
    }

    if (factionKey === "rogue_trader") {
      return withEpilogue({
        rank: "WARRANT OF TRADE — BEYOND THE HALO STARS",
        title: tags.includes("rt_lord_captain") ? "헤일로 스타를 제패한 로그 트레이더 대왕조 총수" : "무역 영장의 전설적 개척자",
        verdict: "제국의 성도 바깥 미지의 변경까지 항로를 넓힌 호걸이었다. 가문 함대의 기함 함교에는 그대의 초상화가 영원히 걸리게 되었다."
      });
    }

    if (tags.includes("stc_finder") || (factionKey === "mechanicus" && tags.includes("magos"))) {
      return withEpilogue({
        rank: "OMNISSIAH'S CHOSEN — MARS ARCHIVE",
        title: "화성 대서고 등재 현자",
        verdict: "잊혀진 암흑기 기술의 불꽃을 되살린 옴니시아의 사도였다. 화성 대성전의 이진법 찬가가 그대의 업적을 영원히 송출한다."
      });
    }

    if (state.homeWorldId === "krieg" && state.age >= 14) {
      return withEpilogue({
        rank: "ATONEMENT FULFILLED — KRIEG",
        title: "속죄 완수 기록",
        verdict: "비타-움에서 태어나 이름 대신 번호로 싸웠던 크리그의 종복은 마침내 500년 반역의 빚을 피로 갚고 황제의 용서를 얻었다."
      });
    }

    if ((tags.includes("cadia_stands") || tags.includes("tanith_ghost") || tags.includes("baal_survivor")) && score >= 100) {
      return withEpilogue({
        rank: "THE PLANET BROKE BEFORE THE GUARD DID",
        title: "부서진 별을 가슴에 품은 불굴의 생존자",
        verdict: "고향 행성이 불타고 갈라진 뒤에도 끝까지 총을 놓지 않았던 증인이었다. 그대가 남긴 발자취가 곧 무너지지 않은 고향의 증거다."
      });
    }

    if (score >= 165 || career.tier >= 5) {
      return withEpilogue({
        rank: "IMPERIAL SAINT-CLASS ARCHIVE",
        title: "인류제국 황금 기록서 등재 영웅",
        verdict: "수천조 필멸자 중 별처럼 빛난 생애였다. 아드미니스트라툼 서기관들이 황금 잉크로 그대의 이름을 새겼다."
      });
    }
    if (score >= 110 || career.tier >= 3) {
      return withEpilogue({
        rank: "HONORED SERVANT OF THE THRONE",
        title: "옥좌의 충실한 수호자",
        verdict: "험난한 41번째 천년기 속에서도 뚜렷한 공훈을 남긴 제국의 모범적 종복이었다."
      });
    }
    if (state.age < 22) {
      return withEpilogue({
        rank: "EXPENDABLE TITHE #40K",
        title: "짧고 잔혹했던 제국의 십일조",
        verdict: "인류제국에서 인간의 목숨은 가장 흔하고 값싼 화폐다. 그대는 통계표의 소수점 하나로 산화했다."
      });
    }
    return withEpilogue({
      rank: "STANDARD IMPERIAL RECORD",
      title: "제국 거대 톱니바퀴의 일원",
      verdict: "거대한 제국 기계장치 속에서 묵묵히 제 몫을 다하고 조용히 사라진 평범한 인류의 삶이었다."
    });
  }

  function finalizeDeath(state, cause) {
    if (!state.alive) return;
    state.alive = false;
    state.wounds = 0;
    state.pendingEvent = null;
    state.deathCause = cause;
    state.finalGrade = evaluateLifeGrade(state);
    addLog(state, `[사망 기록] ${formatImperialYear(state.year)} (향년 ${state.age}세) — ${cause}`, "death");
  }


  return {
    canRetireHonorably,
    createHonorableEndingEvent,
    buildStatusSummary,
    buildObituaryEpilogue,
    evaluateLifeGrade,
    finalizeDeath
  };
}
