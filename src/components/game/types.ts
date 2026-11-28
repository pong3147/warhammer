export const SPEED_MS: Record<number, number> = {
  1: 20000, // 1년 60초 (1분기 20.0초)
  2: 10000, // 1년 30초 (1분기 10.0초)
  4: 5000,  // 1년 15초 (1분기 5.0초)
  8: 2500,  // 1년 7.5초 (1분기 2.5초)
  16: 1250  // 1년 3.75초 (1분기 1.25초)
};

export const SPEED_OPTIONS = [
  { speed: 1, id: "btn-speed-1", label: "1배속 (1년 60초)" },
  { speed: 2, id: "btn-speed-2", label: "2배속 (1년 30초)" },
  { speed: 4, id: "btn-speed-4", label: "4배속 (1년 15초)" },
  { speed: 8, id: "btn-speed-8", label: "8배속 (1년 7.5초)" },
  { speed: 16, id: "btn-speed-16", label: "16배속 (1년 3.75초)" }
] as const;

export interface StartConfig {
  mode: "random" | "custom";
  difficulty?: "standard" | "grimdark";
  eraId?: string;
  worldId?: string;
  originId?: string;
  traitId?: string;
  gender?: string;
  customName?: string;
}

export interface LogEntry {
  year: string;
  age: number;
  text: string;
  kind: string;
  meta?: Record<string, unknown> | null;
  badge?: string | null;
  deltaText?: string | null;
  chronicleId?: string | null;
}
