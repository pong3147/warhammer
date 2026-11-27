import { formatRollOutcomeLabel } from "../engine/formatters.js";

export function getLifeChapter(age: number): string {
  if (age <= 5) return "제1장 · 유아기 (0~5세)";
  if (age <= 13) return "제2장 · 아동기 (6~13세)";
  if (age <= 25) return "제3장 · 청년과 입문기 (14~25세)";
  if (age <= 49) return "제4장 · 장년과 전선 (26~49세)";
  if (age <= 89) return "제5장 · 노년과 관록 (50~89세)";
  return "제6장 · 초장수·전설기 (90세 이상)";
}

export function buildPlainTextChronicle(charState: any, engine: any, data: any): string {
  if (!charState) return "";
  const homeWorld = engine.getWorld(charState.homeWorldId);
  const curWorld = engine.getWorld(charState.worldId);
  const origin = engine.getOrigin(charState.originId);
  const trait = engine.getTrait(charState.traitId);
  const chap = charState.chapterId ? engine.getChapter(charState.chapterId) : null;
  const grade = charState.finalGrade || (!charState.alive ? engine.evaluateLifeGrade(charState) : null);

  const lines: string[] = [];
  lines.push("================================================================");
  lines.push("  1 / QUADRILLION : IMPERIALIS VITA — 제국 생애 기록서");
  lines.push("================================================================");
  lines.push(`이름: ${charState.name} (${charState.gender === "male" ? "남성" : "여성"})${charState.difficulty === "grimdark" ? " [그림다크 모드]" : ""}`);
  lines.push(`신분·직책: ${engine.getCareerDisplayTitle(charState)}`);
  if (chap) lines.push(`소속 챕터: ${chap.name} ("${chap.battleCry}")`);
  lines.push(
    `생애 기간: ${engine.formatImperialYear(charState.birthYear)} ~ ${engine.formatImperialDate(charState.year, charState.quarter)} (${charState.age}세 · ${charState.alive ? "생존" : "사망"})`
  );
  lines.push(`출생 행성: ${homeWorld.name} / 최종 행성: ${curWorld.name}`);
  lines.push(`출생 신분: ${origin.name} / 선천 자질: ${trait.name}`);
  lines.push(`생명력: ${charState.wounds}/${charState.maxWounds} | 황제 신앙: ${charState.faith}/100 | 워프 오염: ${charState.corruption}/100`);
  const alignInfo = engine.getAlignmentInfo(charState);
  lines.push(`도덕 성향: ${alignInfo.fullLabel} (${alignInfo.detail})`);
  const statStr = Object.values(engine.STAT_META)
    .map((m: any) => `${m.name} ${Math.round(charState.stats[m.key] || 0)}`)
    .join(" · ");
  lines.push(`8대 특성치: ${statStr}`);
  const careerTrail = (charState.careerHistory || [charState.careerId])
    .filter((id: string) => id && id !== "child")
    .map((id: string) => engine.getCareer(id).name);
  if (careerTrail.length > 0) lines.push(`거쳐 온 진로: ${careerTrail.join(" -> ")}`);

  const visited = (charState.visitedWorlds || [charState.homeWorldId])
    .map((id: string) => engine.getWorld(id).name)
    .join(", ");
  lines.push(`방문 행성: ${visited}`);

  if ((charState.metCharacters || []).length > 0) {
    const names = charState.metCharacters
      .map((id: string) => engine.getCharacter(id))
      .filter(Boolean)
      .map((c: any) => c.name)
      .join(", ");
    lines.push(`조우한 네임드 인물: ${names}`);
  }
  if ((charState.seenTimeline || []).length > 0) {
    const tls = charState.seenTimeline
      .map((id: string) => data.TIMELINE.find((t: any) => t.id === id))
      .filter(Boolean)
      .map((t: any) => `${engine.formatImperialYear(t.year)} ${t.title}`)
      .join(" / ");
    lines.push(`목격한 역사 대사건: ${tls}`);
  }
  if ((charState.tags || []).length > 0) {
    lines.push(`보유 이력: ${charState.tags.map((t: string) => engine.TAG_LABELS[t] || t).join(", ")}`);
  }
  if (grade) {
    lines.push("----------------------------------------------------------------");
    lines.push(`최종 부고: ${grade.rank} — ${grade.title}`);
    lines.push(`사인: ${charState.deathCause}`);
    lines.push(`평결: ${grade.verdict}`);
  }

  lines.push("");
  lines.push("----------------------------------------------------------------");
  const truncatedNote =
    charState.logs.length >= 2400 ? " · 보존 상한 2,400건 도달(일부 중반기 일상 기록 생략됨)" : "";
  lines.push(`전체 생애 연대기 (출생순 · 총 ${charState.logs.length}건${truncatedNote})`);
  lines.push("----------------------------------------------------------------");

  const ascLogs = [...charState.logs].reverse();
  let lastChap = "";
  for (const item of ascLogs) {
    const chTitle = getLifeChapter(item.age);
    if (chTitle !== lastChap) {
      lastChap = chTitle;
      lines.push("");
      lines.push(`[${chTitle}]`);
    }
    const badge = item.badge ? ` [${item.badge}]` : "";
    const roll = item.meta ? ` (d100 ${item.meta.roll}/${item.meta.target} ${formatRollOutcomeLabel(item.meta)})` : "";
    lines.push(`- ${item.year}, ${item.age}세${badge}${roll}: ${item.text}`);
    if (item.deltaText) lines.push(`  변화: ${item.deltaText}`);
  }
  lines.push("");
  return lines.join("\n");
}

export async function copyTextWithFallback(text: string): Promise<boolean> {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through
    }
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
