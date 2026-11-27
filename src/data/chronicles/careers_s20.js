// 일상 연대기 — Stage 20-B: Tier 2~3 중견 직군 6종 전용 일상 밀도 보강 (8건)
export default [
  {
    id: "ch_s20_mid_01",
    badge: "종자의 문장 수련",
    priority: 3,
    req: {
      anyCareers: ["knight_squire"]
    },
    text: "새벽 안개가 깔린 성채 중정에서 아미저의 어깨 장갑에 새겨진 가문 문장의 긁힌 자국을 성유로 닦아 낸 뒤, 선배 기사의 호령 아래 모의 창술과 측면 돌파 대형을 수십 차례 반복했다. 아직 퀘스토리스 옥좌에 오를 날은 멀었지만, 단단히 여민 강철 장갑 끝에는 기사 가문의 오래된 명예가 묵직하게 자리 잡았다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 1 }
  },
  {
    id: "ch_s20_mid_02",
    badge: "변경 초계의 발자국",
    priority: 3,
    req: {
      anyCareers: ["knight_squire"]
    },
    text: "해 질 녘 변경 삼림 외곽을 아미저로 순찰하며 열감지 오스펙스에 잡힌 거대 야수 무리의 이동 경로를 지도 판독기에 기록했다. 선배 기사단 본대로 정찰 신호를 송신하고 조종석에서 밤바람 소리를 듣는 사이, 기체의 기계령과 호흡을 맞추는 감각이 한층 날카로워졌다.",
    effect: { stats: { BS: 1, Ag: 1 } }
  },
  {
    id: "ch_s20_mid_03",
    badge: "생도의 감찰 수첩",
    priority: 3,
    req: {
      anyCareers: ["commissar_cadet"]
    },
    text: "찬 비가 쏟아지는 연병장 가장자리에 홀로 서서 배속 보병 중대의 라스건 점검과 탄약 배분 절차를 말없이 관찰했다. 병사들의 농담이 그대의 그림자가 닿자마자 뚝 끊어지는 싸늘한 침묵 속에서, 사기가 흔들릴 조짐이 보이는 분대 번호를 검은 가죽 수첩에 차분히 적어 내려갔다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s20_mid_04",
    badge: "검은 외투의 무게",
    priority: 3,
    req: {
      anyCareers: ["commissar_cadet"]
    },
    text: "야간 등불 아래서 견습 장식띠의 황동 문장을 닦고 정치국 군법 조항과 전선 독려 교범을 소리 내어 암송했다. 정식 커미사르의 대제복을 물려받기까지는 아직 수많은 시험이 남았으나, 두려움을 억누르고 먼저 방아쇠를 당겨야 할 냉엄한 책임감이 밤마다 단단히 굳어 갔다.",
    effect: { stats: { WP: 1, Inf: 1 }, faith: 1 }
  },
  {
    id: "ch_s20_mid_05",
    badge: "수련원의 성가 행렬",
    priority: 3,
    req: {
      anyCareers: ["sororitas_novitiate"]
    },
    text: "동트기 전 성당 회랑을 따라 수련생 대열을 맞추어 행진하며 순교 성녀의 전술 성가를 한목소리로 합창했다. 무거운 훈련용 방패를 내려놓고 성유물 제단의 밀랍 촛불을 갈아 끼우는 동안, 아직 가냘픈 수련 수녀의 어깨 위로도 꺾이지 않는 신앙의 기율이 깊게 배어들었다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 2 }
  },
  {
    id: "ch_s20_mid_06",
    badge: "프리펙트의 붉은 밀랍",
    priority: 3,
    req: {
      anyCareers: ["admin_prefect_rank"]
    },
    text: "자동 깃펜 수백 자루가 쉴 새 없이 긁어 대는 감사원 홀에서 행성 광물 징발표와 군수 수송 장부의 숫자를 대조하며 붉은 밀랍 인장을 찍어 내렸다. 하급 서기관이 삼십 년 전 잘못 옮겨 적은 단위 오차 하나를 날카롭게 짚어 내자, 회의실 안의 늙은 서기들이 일제히 숨을 죽이며 고개를 숙였다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s20_mid_07",
    badge: "길드 장인의 검인",
    priority: 3,
    req: {
      anyCareers: ["guild_artisan"],
      excludeWorldTags: ["feral", "krieg"]
    },
    text: "주황빛 용광로 불빛 아래서 도제들이 깎아 낸 황동 터빈 날개의 미세한 균열을 돋보기로 가려내고, 합격품에만 묵직한 길드 장인의 검인을 찍어 넣었다. 깐깐한 품질 기준 덕분에 상층 교역 중개인이 다음 분기 합금 배정량을 넉넉히 늘려 주기로 약조했다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s20_mid_08",
    badge: "하층 구역의 야간 순찰",
    priority: 3,
    req: {
      anyCareers: ["underhive_boss"],
      excludeWorldTags: ["feral", "krieg"]
    },
    text: "녹슨 배수관 다리를 따라 중무장한 부하들을 거느리고 야간 경계 순찰을 돌며, 무기 중개상이 들여온 개조 오토건의 약실 상태를 직접 격발해 검수했다. 인접 구역 패거리가 슬그머니 물러선 경계벽 위에 그대 조직의 분필 표식을 새로 그어 넣자, 어두운 통로의 거래상들이 공손히 길을 비켰다.",
    effect: { stats: { WS: 1, Inf: 1 } }
  }
];
