// 인류제국 21개 세력 92직군 계급도 통합 배럴 (4개 도메인 모듈 무손실 분할 정본)
import { CAREERS_CIVIL_MILITARUM_FRONT, CAREERS_IMPERIAL_STATE } from "./careers/civil_militarum.js";
import { CAREERS_FAITH, CAREERS_INQ_MECH, CAREERS_PSYKER } from "./careers/faith_shadow.js";
import { CAREERS_TRANSHUMAN, CAREERS_CHAOS } from "./careers/transhuman_chaos.js";
import { CAREERS_SPECIALIST_FACTIONS } from "./careers/specialist_factions.js";

export const CAREERS = [
  ...CAREERS_CIVIL_MILITARUM_FRONT,
  ...CAREERS_FAITH,
  ...CAREERS_TRANSHUMAN,
  ...CAREERS_INQ_MECH,
  ...CAREERS_IMPERIAL_STATE,
  ...CAREERS_PSYKER,
  ...CAREERS_CHAOS,
  ...CAREERS_SPECIALIST_FACTIONS
];
