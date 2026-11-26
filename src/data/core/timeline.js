// 역사 대사건 통합 배럴 (M41 초중반 · M41 말기 · M42 인도미투스 3권역 분할 정본)
// absYear: 139 = 139.M41, 240 = 240.M41, 755 = 755.M41, 999 = 999.M41, 1000 = 000.M42, 1001 = 001.M42
import { TIMELINE_M41_EARLY } from "./timeline/m41_early.js";
import { TIMELINE_M41_LATE } from "./timeline/m41_late.js";
import { TIMELINE_M42_INDOMITUS } from "./timeline/m42_indomitus.js";

export const TIMELINE = [
  ...TIMELINE_M41_EARLY,
  ...TIMELINE_M41_LATE,
  ...TIMELINE_M42_INDOMITUS
];
