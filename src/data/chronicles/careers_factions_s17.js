// 일상 연대기 — 17단계 신규 4대 세력 (나비스 노빌리테 · 오피시오 아사시노룸 · 임페리얼 나이트 · 살아 있는 성인)
export default [
  // =========================================================================
  // 파트 A. 17단계 신규 13개 직군 전용 일상 (13종)
  // =========================================================================
  {
    id: "ch_s17_nav_apprentice",
    badge: "견습 항법사의 천문탑",
    priority: 3,
    req: { anyCareers: ["nav_apprentice"] },
    text: "제국 상선의 좁은 항법탑에 홀로 앉아 이마의 제3의 눈을 조심스레 열자, 워프의 거센 소용돌이 너머 아스트로노미칸의 가느다란 등불이 시야에 잡혔다. 관자놀이를 찌르는 극심한 두통과 메스꺼움을 참아 내며 조타실에 침로 보정 수치를 전달했다. 나비스 노빌리테 가문의 피를 잇는 항법사에게 공포를 억누르는 일은 첫 숨과도 같다.",
    effect: { stats: { WP: 1, Int: 1 } },
    source: "Rogue Trader: The Navis Primer / Lexicanum: Navigator"
  },
  {
    id: "ch_s17_nav_senior",
    badge: "기함 항법탑의 주인",
    priority: 3,
    req: { anyCareers: ["nav_senior"] },
    text: "황금 성좌도가 드리워진 전투함대 기함의 항법탑에서 격랑 치는 워프 해류 사이의 좁은 안전 항로를 읽어 냈다. 함교 사관들이 보고를 올리러 들어올 때마다 비단 두건으로 제3의 눈을 가린 채 나지막한 음성으로 도약 시각을 지시했다. 워프 장막 너머에서는 수만 승무원을 거느린 함장조차 선임 항법사의 한마디에 함선의 명운을 맡긴다.",
    effect: { stats: { WP: 1, Int: 1, Inf: 1 } },
    source: "Rogue Trader: The Navis Primer / Lexicanum: Navis Nobilite"
  },
  {
    id: "ch_s17_nav_novator",
    badge: "노바토르의 혈통 장부",
    priority: 3,
    req: { anyCareers: ["nav_novator"] },
    text: "나비스 노빌리테 대가문의 밀실에서 수 세기에 걸쳐 기록된 혈통 순도 장부와 성역 독점 항로 계약서를 나란히 검수했다. 워프를 오래 응시한 대가로 손끝과 피부에 미세한 변이가 스며들고 있으나, 로브 자락 아래로 흔적을 감춘 채 전투함대 제독과 로그 트레이더 총수의 청탁을 저울질했다. 가문의 혈통과 항로 지분을 지키는 냉철한 계산이 곧 제국의 성간 혈맥을 좌우한다.",
    effect: { stats: { Int: 1, Inf: 2 } },
    source: "Rogue Trader: The Navis Primer / Lexicanum: Novator"
  },
  {
    id: "ch_s17_paternoval_envoy",
    badge: "파테르노발 특사의 의석",
    priority: 3,
    req: { anyCareers: ["paternoval_envoy"] },
    text: "신성한 테라의 항법사 지구에서 파테르노바의 밀명을 전해 받은 뒤, 세나토룸 임페리알리스 대의사당의 열한 번째 의석에 고요히 착석했다. 성전군 원수들과 해군 제독들이 항로 개방과 항법사 배치를 두고 격론을 벌였으나, 파테르노발 특사가 서류철을 가볍게 덮는 순간 의사당 전체에 서늘한 정적이 내려앉았다. 그대의 인장 하나가 찍히지 않으면 제국의 어떤 함대도 별 사이를 건널 수 없다.",
    effect: { stats: { WP: 1, Inf: 2, Fel: 1 } },
    source: "Watchers of the Throne / Lexicanum: Paternoval Envoy"
  },
  {
    id: "ch_s17_assassin_initiate",
    badge: "이름 없는 신전의 시련",
    priority: 3,
    req: { anyCareers: ["assassin_initiate"] },
    text: "신성한 테라 지하의 비밀 훈련실에서 열두 종류의 맹독 희석액을 차례로 견뎌 낸 뒤, 암흑 속에서 심장 박동을 분당 스무 번 이하로 늦추는 호흡 수련을 마쳤다. 오피시오 아사시노룸에 징발된 날 과거의 이름과 출신 기록은 이미 불에 타 사라졌다. 오직 네 개의 암살 템플 가운데 하나가 택해 줄 차가운 병기로 거듭나기 위해 오늘도 고통을 침묵 속에 삼켰다.",
    effect: { stats: { Ag: 1, WP: 1 }, align: { ruthless: 1 } },
    source: "Codex: Imperial Agents / Lexicanum: Officio Assassinorum"
  },
  {
    id: "ch_s17_assassin_operative",
    badge: "정지장 각성과 암살 칙령",
    priority: 3,
    req: { anyCareers: ["assassin_operative"] },
    text: "표식 없는 검은 수송선 내부의 정지장 동면관에서 깨어나자마자 신경 안정제를 주입하고 합성 위장복의 밀폐 상태를 점검했다. 암호 해독판 위에는 테라 원로원의 비밀 인장이 찍힌 반역 총독의 동선과 제거 기한이 간결하게 떠올라 있었다. 오피시오 아사시노룸의 정예 어쌔신 단 한 명이 움직이면 연대 열 개가 흘릴 피가 단 하룻밤 만에 끝난다.",
    effect: { stats: { Ag: 1, WS: 1, BS: 1 }, align: { ruthless: 1 } },
    source: "Assassinorum: Kingmaker / Codex: Imperial Agents"
  },
  {
    id: "ch_s17_grand_master_assassins",
    badge: "암살청 총수의 그림자",
    priority: 3,
    req: { anyCareers: ["grand_master_of_assassins"] },
    text: "세나토룸 임페리알리스의 가장 어두운 그림자 의석에 앉아 빈디카레와 칼리두스, 에버서와 쿨렉수스 네 템플이 올린 극비 작전 보고서를 차례로 승인했다. 다른 하이 로드들조차 그대의 침묵 어린 시선 앞에서는 목덜미를 스치는 서늘한 예감을 감추지 못한 채 말수를 줄였다. 제국의 심장을 갉아먹는 반역이 싹트기 전에 소리 없이 뿌리를 도려내는 것이 암살청 총수의 숙명이다.",
    effect: { stats: { Int: 1, WP: 1, Inf: 2 }, align: { ruthless: 1 } },
    source: "Watchers of the Throne / Lexicanum: Grand Master of Assassins"
  },
  {
    id: "ch_s17_knight_squire",
    badge: "아미저 측면 기동 훈련",
    priority: 3,
    req: { anyCareers: ["knight_squire"] },
    text: "경량 보행 병기 아미저의 조종석에 올라 헬름 메카니쿰과 신경을 연결하자, 육중한 강철 다리의 진동이 뼈마디까지 생생하게 전해졌다. 안개 낀 고원 훈련장을 질주하며 선배 퀘스토리스 기사의 측면을 엄호하고, 모의 포화가 쏟아지는 각도에 맞춰 이온 실드를 민첩하게 회전시켰다. 언젠가 진정한 기사 옥좌에 오를 날을 꿈꾸며 열기 뿜는 기체에서 내려섰다.",
    effect: { stats: { WS: 1, BS: 1, Ag: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Armiger"
  },
  {
    id: "ch_s17_knight_scion",
    badge: "스론 메카니쿰의 선조들",
    priority: 3,
    req: { anyCareers: ["knight_scion"] },
    text: "열 미터 높이의 퀘스토리스 나이트 내부에 자리한 스론 메카니쿰에 신경을 결속하자, 수천 년 동안 이 기체를 몰았던 선조 기사들의 위엄 어린 속삭임이 의식 깊숙이 밀려들었다. 사크리스탄의 성유 축성이 끝난 뒤 이온 실드 출력과 리퍼 체인소드의 회전음을 점검하며 출격 서약을 읊었다. 선조들의 명예를 부끄럽지 않게 지켜 내는 것이 퀘스토리스 기사의 첫째 계율이다.",
    effect: { stats: { WS: 1, WP: 1, Inf: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Knight Scion"
  },
  {
    id: "ch_s17_knight_freeblade",
    badge: "문장 없는 방랑 기사",
    priority: 3,
    req: { anyCareers: ["knight_freeblade"] },
    text: "비가 쏟아지는 야전 격납고에서 어떤 대가문의 문장도 남아 있지 않은 낡은 어깨 장갑판의 탄흔을 직접 용접하고 무채색 도료를 덧칠했다. 고향 행성의 정치와 봉건 서열을 등진 프리블레이드에게 남은 것은 오직 스스로 세운 기사도 맹세와 벼랑 끝에 몰린 전선을 향한 발걸음뿐이다. 내일 새벽 포성이 울리면 이름 모를 제국 방위군 병사들의 방패가 되어 다시 걸어 나갈 것이다.",
    effect: { stats: { WS: 1, BS: 1, WP: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Freeblade"
  },
  {
    id: "ch_s17_knight_high_king",
    badge: "고위 대의회의 대군주",
    priority: 3,
    req: { anyCareers: ["knight_high_king"] },
    text: "기사 행성 대성채의 석조 대의회당 상석에 앉아 수십 기사 가문의 기수들과 붉은 로브의 사크리스탄 원로들이 올리는 안건을 차례로 재결했다. 포지 월드의 군수 협약과 제국 성전 사령부의 증원 요청 사이에서 행성의 독립과 명예를 동시에 지키는 결단을 내리자, 대의회당에 도열한 모든 기사가 일제히 무릎을 꿇고 대군주에게 경의를 표했다. 수십 기의 임페리얼 나이트 랜스가 오직 그대의 기치 아래 하나로 움직인다.",
    effect: { stats: { Fel: 1, Inf: 2, WP: 1 } },
    source: "Codex: Imperial Knights / Assassinorum: Kingmaker"
  },
  {
    id: "ch_s17_saint_vessel",
    badge: "기적의 그릇과 황금 온기",
    priority: 3,
    req: { anyCareers: ["saint_vessel"] },
    text: "포격으로 천장이 반쯤 무너진 야전 성당을 거닐며 절망에 잠긴 부상병과 순례자들의 이마에 조용히 손을 얹었다. 상처 입은 손바닥에서 은은한 황금빛 온기가 배어 나오자 꺼져 가던 등불이 밝아지며 장병들의 눈빛에 다시 투지가 돌아왔다. 필멸의 육신으로 황제의 성광을 품어 내는 고통은 뼈를 태우듯 뜨거우나, 무너진 마음을 일으켜 세우는 기적 앞에서 발걸음을 멈출 수 없었다.",
    effect: { stats: { WP: 1, Fel: 1 }, faith: 2, corruption: -2 },
    source: "Codex: Adepta Sororitas / Lexicanum: Living Saint"
  },
  {
    id: "ch_s17_living_saint",
    badge: "황금 성광의 강림",
    priority: 3,
    req: { anyCareers: ["living_saint"] },
    text: "검은 매연이 뒤덮인 전선 성벽 위로 발을 디디는 순간, 잿빛 구름이 갈라지며 눈부신 황금빛 후광이 대지를 비추었다. 악마의 저주와 워프의 속삭임이 그대의 걸음 앞에서 맥없이 스러졌고, 절망하던 병사들이 일제히 라스건을 치켜들며 살아 있는 성인의 이름을 외쳤다. 불멸의 성광을 몸에 깃들인 채 필멸 인류의 가장 어두운 밤을 밝히는 등불로서 오늘도 전선을 지켰다.",
    effect: { stats: { WP: 2, Fel: 1, Inf: 1 }, faith: 3 },
    source: "Celestine: The Living Saint / Lexicanum: Living Saint"
  },

  // =========================================================================
  // 파트 B. 4대 암살 템플 및 17단계 특수 이력 태그 회수 (6종)
  // =========================================================================
  {
    id: "ch_s17_clade_vindicare",
    badge: "빈디카레의 일격 필살",
    priority: 3,
    req: {
      anyCareers: ["assassin_initiate", "assassin_operative"],
      allTags: ["clade_vindicare"],
      excludeTags: ["heretic", "grand_master_assassins", "high_lord_terra"]
    },
    text: "광풍이 몰아치는 고층 첨탑 철골 위에 합성 위장복 차림으로 사흘 동안 미동조차 없이 엎드려 대기했다. 방독 가면의 광학 조준경으로 수 킬로미터 너머의 풍속과 중력 편차를 계산한 뒤, 방어막 관통용 특수 탄환 단 한 발을 엑시투스 저격총 약실에 조용히 밀어 넣었다. 빈디카레 템플의 신조는 오직 하나, 헛된 사격 없이 단 한 번의 호흡으로 표적의 숨통을 끊는 것이다.",
    effect: { stats: { BS: 2, WP: 1 } },
    source: "Codex: Imperial Agents / Lexicanum: Vindicare Temple"
  },
  {
    id: "ch_s17_clade_callidus",
    badge: "칼리두스의 천의 얼굴",
    priority: 3,
    req: {
      anyCareers: ["assassin_initiate", "assassin_operative"],
      allTags: ["clade_callidus"],
      excludeTags: ["heretic", "grand_master_assassins", "high_lord_terra"]
    },
    text: "어두운 은신처에서 계량된 폴리모르핀 약제를 삼키자, 뼈와 피부가 뒤틀리는 격통 끝에 반역 귀족 측근의 얼굴과 목소리가 완벽하게 재현되었다. 화려한 연회복 소매 안쪽에 크탄 페이즈 소드를 숨긴 채 적의 경비 초소를 태연한 미소로 통과했다. 칼리두스 템플의 칼날은 정면에서 부딪치지 않고 가장 신뢰받는 곁자리에서 심장을 꿰뚫는다.",
    effect: { stats: { Fel: 1, Ag: 1, Int: 1 } },
    source: "Codex: Imperial Agents / Lexicanum: Callidus Temple"
  },
  {
    id: "ch_s17_clade_eversor",
    badge: "에버서의 광란 대기",
    priority: 3,
    req: {
      anyCareers: ["assassin_initiate", "assassin_operative"],
      allTags: ["clade_eversor"],
      excludeTags: ["heretic", "grand_master_assassins", "high_lord_terra"]
    },
    text: "장갑 강하정 내부의 동면 캡슐에 묶인 채 신경 강화 혈청과 전투 흥분제가 쉴 새 없이 혈관을 순환하는 굉음을 들었다. 해골 가면 너머로 들끓는 살육 충동을 정밀한 제어 회로가 아슬아슬하게 억누르며, 강하 해치가 열리는 순간 쏟아낼 파괴의 궤적을 뇌리에 각인시켰다. 에버서 템플의 어쌔신이 투입되는 밤, 반역자 요새에는 단 한 명의 생존자도 남지 않는다.",
    effect: { stats: { WS: 2, T: 1 }, align: { ruthless: 1 } },
    source: "Codex: Imperial Agents / Lexicanum: Eversor Temple"
  },
  {
    id: "ch_s17_clade_culexus",
    badge: "쿨렉수스의 공허한 침묵",
    priority: 3,
    req: {
      anyCareers: ["assassin_initiate", "assassin_operative"],
      allTags: ["clade_culexus"],
      excludeTags: ["heretic", "grand_master_assassins", "high_lord_terra"]
    },
    text: "아니무스 스페쿨룸 투구의 제어 렌즈를 조율하며 수송선 격납고를 가로지르자, 백전노장 호위병들조차 본능적인 한기에 몸을 떨며 황급히 고개를 돌렸다. 영혼의 메아리가 텅 빈 퍼라이어의 존재 앞에서 워프의 술법과 악마의 속삭임은 마른 재처럼 부서져 내린다. 세상의 모든 생명에게 외면받는 고독한 저주를 무기로 삼아, 쿨렉수스 템플의 사냥꾼은 오늘도 타락한 사이커의 흔적을 쫓는다.",
    effect: { stats: { WP: 2, Ag: 1 }, corruption: -2 },
    source: "Codex: Imperial Agents / Lexicanum: Culexus Temple"
  },
  {
    id: "ch_s17_tag_sacristan_oath",
    badge: "사크리스탄 성소의 맹약",
    priority: 3,
    req: {
      anyCareers: ["knight_squire", "knight_scion", "knight_freeblade", "knight_high_king"],
      allTags: ["sacristan_oath"],
      excludeTags: ["heretic"]
    },
    text: "향 연기와 윤활유 냄새가 짙게 배어 있는 사크리스탄 성소에 내려가, 붉은 로브의 수호 사제들과 함께 나이트 아머의 원자로 배관과 이온 실드 축전기를 정밀 점검했다. 아뎁투스 메카니쿠스의 이진법 찬송과 기사 가문의 고대 서약이 한 지붕 아래 맞물릴 때 비로소 거대한 기계령이 순순히 깨어난다. 맹약의 인장을 다시금 확인하며 전장에 나설 강철의 심장을 다듬었다.",
    effect: { stats: { Int: 1, T: 1, Inf: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Sacristan"
  },
  {
    id: "ch_s17_tag_saint_aspect",
    badge: "성광의 자비와 심판",
    priority: 3,
    req: { minAge: 24, anyTags: ["saint_mercy_aspect", "saint_wrath_aspect"], excludeTags: ["heretic", "chaos_aligned", "daemon_prince"] },
    text: "전선의 폐허 위로 황금빛 성광이 퍼져 나갈 때마다, 그 빛은 어떤 이에게는 상처를 어루만지는 따뜻한 자비로, 이단자와 악마에게는 뼈를 태우는 가차 없는 심판으로 현현했다. 살아 있는 신앙의 화신이 품은 서원이 깊어질수록 무너진 성당과 진흙 참호마다 새로운 기도 소리가 물결처럼 번져 나갔다. 자비이든 심판이든 오직 황제의 뜻만이 빛의 방향을 결정한다.",
    effect: { stats: { WP: 1, Fel: 1, Inf: 1 }, faith: 3, corruption: -2 },
    source: "Codex: Adepta Sororitas / Lexicanum: Living Saint"
  },

  // =========================================================================
  // 파트 C. 17단계 전 계급 대비 (anyPastCareers) 회고 연대기 (5종)
  // =========================================================================
  {
    id: "ch_s17_past_nav_apprentice",
    badge: "첫 항해의 기억과 항로장",
    priority: 3,
    req: {
      anyCareers: ["nav_novator", "paternoval_envoy"],
      anyPastCareers: ["nav_apprentice"]
    },
    text: "성역 전체의 워프 항로를 좌우하는 계약서에 밀랍 인장을 누르다 보니, 낡은 호위함의 좁은 항법탑에서 난간을 움켜쥐던 견습 시절이 겹쳐 지나갔다. 그때는 워프 폭풍의 섬광 하나에도 아스트로노미칸의 빛을 놓칠까 봐 밤새 식은땀을 흘리곤 했다. 첫 항해의 서늘한 공포를 정면으로 건너온 세월이 이제는 나비스 노빌리테 최고위 항법사의 담력이 되었다.",
    effect: { stats: { WP: 1, Int: 1, Inf: 1 } },
    source: "Rogue Trader: The Navis Primer / Lexicanum: Navis Nobilite"
  },
  {
    id: "ch_s17_past_assassin_initiate",
    badge: "지워진 이름과 신전의 칼날",
    priority: 3,
    req: {
      anyCareers: ["assassin_operative", "grand_master_of_assassins"],
      anyPastCareers: ["assassin_initiate"]
    },
    text: "신전 지하 석실의 혹독한 시련을 함께 시작했던 수련생 동기들 가운데 살아남은 자는 손에 꼽는다. 극비 암살 칙령의 암호문을 해독하는 지금도, 생체 개조와 살상 시험을 넘지 못한 채 이름 없이 사라진 그들의 마지막 숨소리가 신경망 구석에 희미하게 남아 있다. 모든 연민을 태워 버린 그 긴 밤을 통과했기에 오늘날 제국의 가장 치명적인 그림자가 완성되었다.",
    effect: { stats: { Ag: 1, WP: 1, Int: 1 } },
    source: "Codex: Imperial Agents / Assassinorum: Kingmaker"
  },
  {
    id: "ch_s17_past_knight_squire",
    badge: "아미저 종자의 발자국",
    priority: 3,
    req: {
      anyCareers: ["knight_scion", "knight_freeblade", "knight_high_king"],
      anyPastCareers: ["knight_squire"]
    },
    text: "진흙 연병장을 민첩하게 가로지르는 젊은 종자들의 아미저 편대를 망루 위에서 지켜보았다. 좁은 헬름 메카니쿰에 매달려 선배 기사들의 거대한 보폭을 악착같이 따라붙던 초년의 땀냄새가 마치 어제 일처럼 생생하다. 낮은 자리에서 측면 엄호와 방패 각도를 몸으로 익힌 세월이 지금의 기사도를 흔들림 없이 지탱한다.",
    effect: { stats: { WS: 1, WP: 1, Fel: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Armiger"
  },
  {
    id: "ch_s17_past_knight_scion",
    badge: "첫 결속과 선조의 시험",
    priority: 3,
    req: {
      anyCareers: ["knight_freeblade", "knight_high_king"],
      anyPastCareers: ["knight_scion"]
    },
    text: "목덜미 뒤편의 신경 접합부 흉터는 처음 퀘스토리스 기사로 서임되어 스론 메카니쿰에 앉았던 성인의 의식이 남긴 증표다. 의식을 찢을 듯 몰아치던 선조 기계령들의 시험을 견뎌 낸 그날 이후, 방랑의 길을 걷든 대군주의 자리에 오르든 단 한 번도 기사도의 서약을 저버린 적이 없다. 강철 옥좌의 메아리는 오늘도 영혼 깊은 곳에서 명예의 무게를 일깨운다.",
    effect: { stats: { WP: 1, WS: 1, Inf: 1 } },
    source: "Codex: Imperial Knights / Lexicanum: Ritual of Becoming"
  },
  {
    id: "ch_s17_past_saint_vessel",
    badge: "필멸의 그릇을 넘어선 성광",
    priority: 3,
    req: {
      anyCareers: ["living_saint"],
      anyPastCareers: ["saint_vessel"]
    },
    text: "기적의 그릇으로 불리던 필멸의 시절에는 성광의 열기 하나에도 무릎이 꺾여 숨을 몰아쉬며 기도문을 붙들곤 했다. 한 줌 재로 타 버릴지도 모른다는 그 두려움마저 이제는 아득한 옛일이 되어, 두 손에는 흔들리지 않는 황금빛이 고요히 감돈다. 불멸의 살아 있는 성인으로 거듭난 뒤에도 연약했던 인간의 밤을 잊지 않기에, 전장의 가장 낮은 절규가 늘 먼저 귀에 닿는다.",
    effect: { stats: { WP: 2, Fel: 1 }, faith: 2 },
    source: "Celestine: The Living Saint / Lexicanum: Living Saint"
  }
];
