// 일상 연대기 — 네임드 20인 후일담 · 명예 태그 · 3대 오르도 · 카오스 4대 신 · 핵심 이력 태그 회수
window.IMPERIUM_DATA = window.IMPERIUM_DATA || {};
(window.IMPERIUM_DATA.CHRONICLES = window.IMPERIUM_DATA.CHRONICLES || []).push(
  {
    id: "ch_arc_ordo_hereticus",
    badge: "오르도 헤레티쿠스",
    priority: 3,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], allTags: ["ordo_hereticus"] },
    text: "오르도 헤레티쿠스 서고에서 관할 주교구 설교문 검열 보고서를 검토하고, 아뎁타 소로리타스 수녀원과 합동 단속 일정을 조율했다.",
    effect: { stats: { WP: 1, Inf: 1 }, faith: 2 }
  },
  {
    id: "ch_arc_ordo_xenos",
    badge: "오르도 제노스",
    priority: 3,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], allTags: ["ordo_xenos"] },
    text: "격리 실험실에서 포획한 외계 생체 표본과 무기를 정밀 분석한 뒤, 인근 데스워치 워치 포트리스로 암호 첩보를 송신했다.",
    effect: { stats: { Int: 1, BS: 1 } }
  },
  {
    id: "ch_arc_ordo_malleus",
    badge: "오르도 말레우스",
    priority: 3,
    req: { anyCareers: ["inquisitor", "lord_inquisitor", "inquisitor_representative"], allTags: ["ordo_malleus"] },
    text: "성수로 축성한 은제 탄환과 육망성 봉인함을 점검하며, 워프 너머에서 엿보는 악마들의 기척에 대비해 정신을 벼렸다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_arc_mark_khorne",
    badge: "코른의 낙인",
    priority: 3,
    req: { allTags: ["mark_khorne"], excludeTags: ["custodes", "grey_knight"] },
    text: "피부 아래 놋쇠빛 코른의 낙인이 맥박에 맞춰 뜨겁게 고동쳤다. 무기를 쥐지 않은 손이 이유 모를 살의로 미세하게 떨렸다.",
    effect: { stats: { WS: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_mark_tzeentch",
    badge: "젠취의 낙인",
    priority: 3,
    req: { allTags: ["mark_tzeentch"], excludeTags: ["custodes", "grey_knight"] },
    text: "창문에 비친 그림자가 잠깐 아홉 갈래로 갈라져 속삭였다. 변화의 군주가 보여 준 단편적 미래를 암호 노트에 급히 받아 적었다.",
    effect: { stats: { Int: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_mark_nurgle",
    badge: "너글의 낙인",
    priority: 3,
    req: { allTags: ["mark_nurgle"], excludeTags: ["custodes", "grey_knight"] },
    text: "아물지 않은 상처 위로 검은 파리 몇 마리가 앉았으나 전혀 아프지 않았다. 기괴한 무감각 속에 묵직한 끈기가 몸을 채웠다.",
    effect: { stats: { T: 1 }, wounds: 3, corruption: 2 }
  },
  {
    id: "ch_arc_mark_slaanesh",
    badge: "슬라네쉬의 낙인",
    priority: 3,
    req: { allTags: ["mark_slaanesh"], excludeTags: ["custodes", "grey_knight"] },
    text: "평범한 잡음마저 날카로운 현악기 선율처럼 귓가를 파고들었다. 더 완벽한 움직임과 더 강렬한 자극을 향한 갈증이 깊어졌다.",
    effect: { stats: { Ag: 1, Fel: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_stc_finder",
    badge: "STC 발견자",
    priority: 3,
    req: { allTags: ["stc_finder"], excludeTags: ["heretic"] },
    text: "화성 재무 서기관이 보낸 정기 STC 공로 배당금과 함께, 복원된 설계도가 성계 전역의 보급창에서 가동 중이라는 경의 서신이 도착했다.",
    effect: { stats: { Inf: 2 } }
  },
  {
    id: "ch_arc_inquisition_favor",
    badge: "심문소 신임",
    priority: 3,
    req: { allTags: ["inquisition_favor"], excludeTags: ["inquisitor", "heretic"] },
    text: "까다로운 아르비테스 검문소에서 검은 인장 암호를 제시하자, 담당 장교가 표정을 굳히며 아무 질문 없이 즉시 통행을 허가했다.",
    effect: { stats: { Inf: 1, Fel: 1 } }
  },
  {
    id: "ch_arc_wanted",
    badge: "심문소 수배",
    priority: 3,
    req: { allTags: ["wanted_by_inquisition"] },
    text: "항구 검문소 벽면에 붙은 수배 전단을 지나치며 후드를 깊게 눌러썼다. 매일 밤 비상 탈출 경로를 확인하는 습관이 몸에 배었다.",
    effect: { stats: { Ag: 1, Int: 1 } }
  },
  {
    id: "ch_arc_rogue_psyker",
    badge: "무등록 사이커",
    priority: 3,
    req: { allTags: ["rogue_psyker"], excludeTags: ["sanctioned_psyker", "grey_knight", "custodes"] },
    text: "궤도에 검은 함선이 입항했다는 소문이 돌자 서둘러 거처를 옮겼다. 머릿속을 스치는 워프의 잡음을 억누르며 숨을 죽였다.",
    effect: { stats: { WP: 1, Ag: 1 }, corruption: 2 }
  },
  {
    id: "ch_arc_tech_heresy",
    badge: "기술 이단",
    priority: 3,
    req: { allTags: ["tech_heresy"], excludeTags: ["custodes", "grey_knight"] },
    text: "표면적으로는 정통 옴니시아 기도문을 읊으면서도, 서보 스컬의 시야 밖에서 비인가 연산 회로를 은밀히 조율했다.",
    effect: { stats: { Int: 2 }, corruption: 1 }
  },
  {
    id: "ch_arc_xenos_contact",
    badge: "외계인 접촉",
    priority: 3,
    req: { allTags: ["xenos_contact"], excludeTags: ["custodes", "grey_knight"] },
    text: "제국 교본에는 결코 실리지 않는 외계 종족의 관습과 약점을 되짚어 보았다. 알아서는 안 될 지식이 오히려 생존의 무기가 된다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_arc_penal",
    badge: "징벌 부대",
    priority: 3,
    req: { allTags: ["penal_mark"], excludeTags: ["astartes", "custodes", "grey_knight", "inquisitor"] },
    text: "목덜미에 남은 폭발 목걸이의 흉터를 문지르며 무기를 손질했다. 낙인이 찍힌 병사에게 남은 길은 오직 더 악착같이 살아남는 것뿐이다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_arc_dreadnought_2",
    badge: "고대 드레드노트",
    priority: 3,
    req: { allTags: ["astartes", "dreadnought"] },
    text: "동면 직전의 흐릿한 꿈속에서 수백 년 전 모성의 바람 냄새를 떠올렸다가, 기계령의 차가운 경고음과 함께 강철 석관의 현실로 깨어났다.",
    effect: { stats: { WP: 1, T: 1 } }
  },
  {
    id: "ch_arc_primaris",
    badge: "프라이머리스",
    priority: 3,
    req: { allTags: ["astartes", "primaris"] },
    text: "신형 마크 X 파워 아머의 관절 서보를 점검하는 동안, 가슴속 벨리사리우스 용광로 장기가 묵직하고 강인한 활력을 뿜어냈다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_arc_living_miracle",
    badge: "기적의 증인",
    priority: 3,
    req: { allTags: ["living_miracle"], excludeTags: ["heretic", "custodes"] },
    text: "거리를 지날 때마다 행인들이 걸음을 멈추고 경외의 눈빛으로 아퀼라 성호를 그었다. 기대와 신앙의 무게를 묵묵히 짊어졌다.",
    effect: { stats: { Fel: 1, Inf: 1 }, faith: 3 }
  },
  {
    id: "ch_arc_lost_home",
    badge: "고향의 기억",
    priority: 3,
    req: { anyTags: ["cadia_stands", "baal_survivor", "tanith_survivor"], excludeTags: ["heretic"] },
    text: "밤하늘의 낯선 별자리를 올려다보며 이제는 돌아갈 수 없는 고향 행성의 이름을 조용히 읊조렸다. 슬픔은 곧 흔들리지 않는 투지가 되었다.",
    effect: { stats: { WP: 2 }, faith: 2 }
  },
  {
    id: "ch_arc_war_vet",
    badge: "대전역 베테랑",
    priority: 3,
    req: {
      anyTags: ["vraks_veteran", "badab_veteran", "rift_survivor", "deathwatch_vet", "space_hulk_vet"],
      excludeTags: ["heretic"]
    },
    text: "전역 약장이 꽂힌 가슴을 바라보며 신병들이 경례를 올렸다. 살아남은 고참 병사의 침착한 한마디가 부대의 공포를 가라앉혔다.",
    effect: { stats: { Inf: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_guilliman",
    badge: "섭정의 여운",
    priority: 3,
    req: { allTags: ["met_guilliman"] },
    text: "복잡한 서류 더미 앞에서 지칠 때마다, 밤을 새워 은하의 병참표를 검토하던 로부테 길리먼의 지친 푸른 눈동자가 떠올라 다시 펜을 고쳐 잡았다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_yarrick",
    badge: "철의 눈의 기억",
    priority: 3,
    req: { allTags: ["met_yarrick"] },
    text: "사기가 흔들리는 참호 끝에서 커미사르 세바스찬 야릭의 불굴의 연설을 회상했다. 철의 눈이 지켜본다는 생각만으로 병사들의 어깨가 곧추섰다.",
    effect: { stats: { WP: 1, Fel: 1 } }
  },
  {
    id: "ch_s4_met_creed",
    badge: "카디아의 전술가",
    priority: 3,
    req: { allTags: ["met_creed"] },
    text: "작전 지도 위에서 막다른 길에 몰릴 때마다, 짙은 시가 연기 너머로 판을 뒤집던 우르사카르 E. 크리드의 냉철한 시선을 떠올리며 돌파구를 찾았다.",
    effect: { stats: { Int: 1, BS: 1 } }
  },
  {
    id: "ch_s4_met_gaunt",
    badge: "유령들의 기억",
    priority: 3,
    req: { allTags: ["met_gaunt"] },
    text: "모닥불 옆에서 들려오던 이브람 건트와 타니스 퍼스트 앤드 온리의 백파이프 선율이 문득 귓가에 맴돌았다. 부하를 끝까지 포기하지 않던 그의 등 뒤를 잊지 못했다.",
    effect: { stats: { Fel: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_cain",
    badge: "타나 차의 여운",
    priority: 3,
    req: { allTags: ["met_cain"] },
    text: "후일 전해 들은 소문에 따르면 카이아파스 케인의 회고록 초고 각주에 그대와 스쳤던 전선 이야기가 유쾌하게 실렸다고 한다. 씁쓸한 미소와 함께 따뜻한 차를 마셨다.",
    effect: { stats: { Fel: 1, Ag: 1 } }
  },
  {
    id: "ch_s4_met_dante",
    badge: "천오백 년의 무게",
    priority: 3,
    req: { allTags: ["met_dante"] },
    text: "황금 데스 마스크 너머로 천오백 년의 피로를 짊어지고도 끝내 검을 내려놓지 않던 사령관 단테의 모습을 떠올리며 고단한 의무를 묵묵히 이어 갔다.",
    effect: { stats: { WP: 2 }, faith: 1 }
  },
  {
    id: "ch_s4_met_cawl",
    badge: "대현자의 기묘한 잔향",
    priority: 3,
    req: { allTags: ["met_cawl"] },
    text: "기계장치를 다룰 때마다 다성 음성으로 천 년 전 농담을 내뱉던 아크마고스 벨리사리우스 카울의 기괴한 천재성이 불현듯 스쳐 지나갔다.",
    effect: { stats: { Int: 2 } }
  },
  {
    id: "ch_s4_met_grimnar",
    badge: "늙은 늑대의 포효",
    priority: 3,
    req: { allTags: ["met_grimnar"] },
    text: "모르카이의 도끼를 휘두르며 적진을 갈라 버리던 그레이트 울프 로간 그림나르의 호쾌한 웃음소리가 겨울바람 속에서 문득 되살아났다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s4_met_calgar",
    badge: "울트라마의 철권",
    priority: 3,
    req: { allTags: ["met_calgar"] },
    text: "포화 속에서도 흔들리지 않던 마르네우스 칼가의 위엄을 떠올리며, 오늘도 무질서한 전선에 《코덱스》 같은 단정한 규율을 세웠다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_met_celestine",
    badge: "황금 날개의 잔광",
    priority: 3,
    req: { allTags: ["met_celestine"] },
    text: "칠흑 같은 어둠을 가르며 강림했던 살아 있는 성녀 셀레스틴의 눈부신 빛을 떠올리자, 가슴속 의심과 워프의 냉기가 깨끗이 씻겨 내려갔다.",
    effect: { stats: { WP: 1 }, faith: 3, corruption: -2 }
  },
  {
    id: "ch_s4_met_eisenhorn",
    badge: "그림자 심판자의 흔적",
    priority: 3,
    req: { allTags: ["met_eisenhorn"] },
    text: "이단심문관 그레고르 아이젠혼이 남긴 '인내와 의심은 생존의 두 기둥'이라는 차가운 충고가 오늘도 수상한 거래를 단번에 간파하게 해 주었다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s4_met_marbo",
    badge: "밀림의 유령",
    priority: 3,
    req: { allTags: ["met_marbo"] },
    text: "누구에게도 슬라이 마보를 직접 보았다고 말해도 믿어 주지 않지만, 숲 그림자가 일렁일 때마다 그의 침묵과 단검의 기척을 잊을 수 없다.",
    effect: { stats: { Ag: 1, WS: 1 } }
  },
  {
    id: "ch_s4_met_valoris",
    badge: "황금 옥좌의 위엄",
    priority: 3,
    req: { allTags: ["met_valoris"] },
    text: "와처스 액스를 쥐고 서 있던 트라얀 발로리스의 압도적인 고요함을 겪고 난 뒤, 웬만한 귀족이나 장군의 호통에는 눈 하나 깜짝하지 않게 되었다.",
    effect: { stats: { WP: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_met_tushan",
    badge: "불꽃 속의 온기",
    priority: 3,
    req: { allTags: ["met_tushan"] },
    text: "숯처럼 검은 피부 너머로 필멸자 피난민의 손을 정중히 잡아 주던 투샨의 모습을 기억하며, 아무리 잔혹한 제국 안에서도 지켜야 할 인간미를 되새겼다.",
    effect: { stats: { Fel: 1, T: 1 }, faith: 1 }
  },
  {
    id: "ch_s4_met_ghazghkull",
    badge: "와아아의 잔향",
    priority: 3,
    req: { allTags: ["met_ghazghkull"] },
    text: "멀리서 천둥소리만 울려도 가즈쿨 막 우룩 스라카의 짐승 같은 포효가 귓가에 되살아나 무의식중에 무기 손잡이를 꽉 쥐게 된다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s4_met_abaddon",
    badge: "검은 군단의 악몽",
    priority: 3,
    req: { allTags: ["met_abaddon"] },
    text: "약탈자 아바돈의 황금빛 눈동자와 드라크니옌의 비명을 기억하는 자는 밤의 침묵조차 쉽게 믿지 못한다. 악몽을 밀어내며 새벽까지 무구를 손질했다.",
    effect: { stats: { WP: 1, WS: 1 } }
  },
  {
    id: "ch_s4_met_lion",
    badge: "숲에서 돌아온 사자",
    priority: 3,
    req: { allTags: ["met_lion"] },
    text: "안개 속에서 황제의 방패를 들고 나타나던 라이온 엘 존슨의 말없는 위엄이 떠올랐다. 칠흑 같은 암흑 제국에도 아직 사자의 발톱이 살아 있음을 믿는다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 1 }
  },
  {
    id: "ch_s4_met_amberley_vail",
    badge: "각주 너머의 시선",
    priority: 3,
    req: { allTags: ["met_amberley_vail"] },
    text: "공식 문서의 행간을 읽어 내던 이단심문관 앰벌리 베일의 날카로운 유머를 떠올리며, 상부 포고령의 숨은 속내를 단박에 짚어 냈다.",
    effect: { stats: { Int: 1, Fel: 1 } }
  },
  {
    id: "ch_s4_met_grimaldus",
    badge: "헬스리치의 메아리",
    priority: 3,
    req: { allTags: ["met_grimaldus"] },
    text: "잿더미 속에서 '나는 헬스리치에 있었노라'고 외치던 수석 채플린 메렉 그리말두스의 웅변이 귓가에 울려 퍼지며 쓰러지려던 의지를 일으켜 세웠다.",
    effect: { stats: { WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s4_met_azrael",
    badge: "사자의 투구와 침묵",
    priority: 3,
    req: { allTags: ["met_azrael"] },
    text: "더 락의 어두운 회랑에서 마주한 슈프림 그랜드 마스터 아즈라엘의 깊은 침묵을 떠올렸다. 어떤 진실은 끝까지 입을 다무는 것이 충성임을 안다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s4_tag_emperors_champion",
    badge: "황제의 투사",
    priority: 3,
    req: { allTags: ["emperors_champion"] },
    text: "검은 검의 칼날에 성유를 바르며 밤새 무릎 꿇고 기도했다. 황제의 계시가 내린 투사에게 두려움이란 존재하지 않는다.",
    effect: { stats: { WS: 1, WP: 1 }, faith: 2 }
  },
  {
    id: "ch_s4_tag_wolf_guard",
    badge: "울프 가드",
    priority: 3,
    req: { allTags: ["wolf_guard"] },
    text: "울프 가드의 털가죽 망토를 여미며 대중대 형제들과 사냥의 노래를 나눴다. 다음 원정에서도 가장 앞줄은 우리의 몫이다.",
    effect: { stats: { WS: 1, T: 1 } }
  },
  {
    id: "ch_s4_tag_huscarl_oath",
    badge: "허스칼",
    priority: 3,
    req: { allTags: ["huscarl_oath"] },
    text: "요새 성벽의 미세한 균열 하나까지 손끝으로 점검하며 허스칼의 서약을 되새겼다. 우리가 서 있는 한 이 성문은 열리지 않는다.",
    effect: { stats: { T: 1, Int: 1 } }
  },
  {
    id: "ch_s4_tag_promethean_smith",
    badge: "프로메테우스 장인",
    priority: 3,
    req: { allTags: ["promethean_smith"] },
    text: "전투가 없는 밤이면 대장간 모루 앞에서 형제들의 볼터와 갑주를 손수 벼렸다. 불길 속에서 단련된 무구는 결코 주인을 배신하지 않는다.",
    effect: { stats: { Int: 1, T: 1 } }
  },
  {
    id: "ch_s4_tag_shadow_master",
    badge: "그림자 마스터",
    priority: 3,
    req: { allTags: ["shadow_master"] },
    text: "발소리 한 점 없이 초소 그림자 사이를 스쳐 지나갔다. 적이 그대의 존재를 깨달았을 때는 이미 전투가 끝난 뒤다.",
    effect: { stats: { Ag: 2 } }
  },
  {
    id: "ch_s4_tag_khan_rider",
    badge: "칸의 기수",
    priority: 3,
    req: { allTags: ["khan_rider"] },
    text: "질주하는 엔진 굉음과 얼굴을 때리는 거센 맞바람 속에서 초고리스 초원의 자유를 느꼈다. 멈추는 순간이 곧 죽음이다.",
    effect: { stats: { Ag: 1, BS: 1 } }
  },
  {
    id: "ch_s4_tag_ultramar_scholar",
    badge: "울트라마 학자",
    priority: 3,
    req: { allTags: ["ultramar_scholar"] },
    text: "군사 교본과 행정 법전을 나란히 펼쳐 두고 성계 보급 효율을 다듬었다. 칼만큼이나 정교한 장부가 제국을 지탱한다.",
    effect: { stats: { Int: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_tag_librarius_trained",
    badge: "라이브러리우스",
    priority: 3,
    req: { allTags: ["librarius_trained"] },
    text: "사이킥 후드의 수정 회로가 푸르게 맥동하는 가운데 워프의 변동을 감시했다. 지식과 절제가 없다면 힘은 곧 파멸이다.",
    effect: { stats: { WP: 1, Int: 1 }, corruption: -1 }
  },
  {
    id: "ch_s4_tag_chapter_serf",
    badge: "챕터 서프",
    priority: 3,
    req: {
      allTags: ["chapter_serf"],
      excludeTags: ["astartes", "custodes", "grey_knight"]
    },
    text: "거대한 파워 아머의 세라마이트 장갑판에서 탄흔을 닦아 내며 묵묵히 소임을 다했다. 아스타르테스의 승리는 이름 없는 서프들의 손끝에서 시작된다.",
    effect: { stats: { Int: 1, WP: 1 } }
  },
  {
    id: "ch_s4_tag_krieg_grenadier",
    badge: "크리그 척탄병",
    priority: 3,
    req: { allTags: ["krieg_grenadier"] },
    text: "해골 문양이 새겨진 방독면 여과기와 지옥불 라스건 배터리를 말없이 점검했다. 돌격 호각이 울리면 가장 먼저 철조망을 넘을 뿐이다.",
    effect: { stats: { T: 1, BS: 1 } }
  },
  {
    id: "ch_s4_tag_catachan_blooded",
    badge: "카타찬의 피",
    priority: 3,
    req: { allTags: ["catachan_blooded"] },
    text: "습한 공기 냄새와 꺾인 나뭇가지 하나로 매복 지점을 단박에 간파했다. 카타찬 밀림에서 살아남은 자에게 낯선 전장은 없다.",
    effect: { stats: { Ag: 1, T: 1 } }
  },
  {
    id: "ch_s4_tag_fenris_blood",
    badge: "펜리스의 혈통",
    priority: 3,
    req: { allTags: ["fenris_blood"] },
    text: "매서운 추위가 뼈를 에어도 외투 한 벌 걸치지 않은 채 웃어넘겼다. 펜리스의 빙해가 벼려 낸 피는 쉽게 식지 않는다.",
    effect: { stats: { T: 1, WS: 1 } }
  },
  {
    id: "ch_s4_tag_daemon_bane",
    badge: "악마 살해자",
    priority: 3,
    req: { allTags: ["daemon_bane"] },
    text: "워프의 냉기가 스며드는 밤에도 그대가 지나가면 어둠 속 속삭임이 먼저 물러났다. 악마의 피를 묻혀 본 의지는 결코 흔들리지 않는다.",
    effect: { stats: { WP: 1 }, faith: 2, corruption: -2 }
  },
  {
    id: "ch_s4_tag_rift_touched",
    badge: "대균열 감응자",
    priority: 3,
    req: { allTags: ["rift_touched"] },
    text: "시카트릭스 말레딕툼이 맥동하는 밤이면 관자놀이가 서늘하게 울린다. 멀리 떨어진 성계의 조난 신호 같은 기묘한 예감이 스쳐 지나갔다.",
    effect: { stats: { WP: 1, Int: 1 } }
  },
  {
    id: "ch_s4_tag_vigilus_veteran",
    badge: "비질루스 참전",
    priority: 3,
    req: { allTags: ["vigilus_veteran"] },
    text: "나흐문드 회랑의 잿빛 먼지가 아직도 군장 주름에 남아 있다. 비질루스의 생지옥을 통과한 베테랑의 눈빛에 신병들이 절로 옷깃을 여몄다.",
    effect: { stats: { T: 1, Inf: 1 } }
  },
  {
    id: "ch_s4_tag_tyranic_war_vet",
    badge: "4차 타이라니드 전쟁",
    priority: 3,
    req: { allTags: ["tyranic_war_vet"] },
    text: "바스티오르 서브섹터에서 마주했던 끝없는 키틴질 파도를 떠올리며 산성 방호구와 화염 탄약을 한 번 더 꼼꼼히 점검했다.",
    effect: { stats: { BS: 1, WP: 1 } }
  },
  {
    id: "ch_s4_tag_tyrannic_veteran",
    badge: "타이라니드 베테랑",
    priority: 3,
    req: { allTags: ["tyrannic_veteran"] },
    text: "하이브 함대의 시냅스 지휘 체계를 끊어 냈던 경험을 후배 병사들에게 전수했다. 거대한 포식자를 꺾는 법은 머리부터 자르는 것이다.",
    effect: { stats: { Int: 1, BS: 1 } }
  }
);
