/* Verified summaries of public KSPO&CO operational guidance. */
const TT_GUIDANCE = (() => {
  const source = "https://www.ksponco.or.kr";
  const records = [
    {
      id: "ilsan-child-account", center: "ilsan", topic: "childAccount",
      title: "자녀 명의로 온라인 등록하는 방법",
      body: "온라인 수강신청은 자녀 이름으로 가입한 계정에서 진행합니다. 14세 미만은 어린이 회원가입을 선택하고 부모 명의 휴대전화로 인증할 수 있다는 일산센터 안내가 있습니다.",
      url: source + "/customQna/view?cbxSearch_Type=&currentPage=1&mid=a20702000000&txtID_VOC_ORG=VB0000133152&txtSearch_Word=&txtTP_BIZ=24",
      date: "2026-08-21",
    },
    {
      id: "olympic-child-account", center: "olympic", topic: "childAccount",
      title: "수강신청에 사용하는 회원 명의",
      body: "대리인이 신청할 수 있지만 수강생 본인의 회원 명의로 등록해야 합니다. 온라인 신청에는 홈페이지 가입이 필요합니다. 어린이 계정의 본인인증 방법은 센터에 확인해 주세요.",
      url: source + "/menu.es?mid=a50201000000",
    },
    {
      id: "olympic-toddler", center: "olympic", topic: "childEntry",
      title: "어린이 일일 자유수영 입장 기준",
      body: "일일 자유수영 대상은 초등학생 이상입니다. 취학한 어린이가 키 140cm 미만이면 보호자 동반 입장 예외가 안내되어 있습니다. 같은 페이지에 2019년생부터 입장이 제한된다는 안내도 있으니 기준이 겹치면 방문 전에 센터에 확인해 주세요.",
      url: source + "/menu.es?mid=a50204000000",
    },
    {
      id: "ilsan-toddler", center: "ilsan", topic: "childEntry",
      title: "일일 자유수영 어린이와 보호자 안내",
      body: "일일입장 안내에는 36개월 이상 유아의 이용과 탈의실에 동성 보호자가 동반해야 한다는 조건이 나옵니다. 별도의 수영장 안전수칙은 미취학 아동과 140cm 이하 어린이의 입장을 제한한다고 안내하므로, 어린이와 함께 방문하려면 해당 시간대의 적용 기준을 센터에 확인해 주세요.",
      url: source + "/sports/menu.es?mid=a90204000000",
    },
    {
      id: "ilsan-swim-safety", center: "ilsan", topic: "childSafety",
      title: "수영장 안전수칙 원문",
      body: "일산 수영장의 안전수칙에는 미취학 아동과 키 140cm 이하 어린이의 입장 제한이 안내되어 있습니다. 일일입장 페이지의 유아 안내와 범위가 달라 센터 확인이 필요합니다.",
      url: source + "/sports/menu.es?mid=a90202020000",
    },
    {
      id: "olympic-holiday", center: "olympic", topic: "holiday",
      title: "2026년 12월 휴관일과 성탄절 운영",
      body: "12월 13일에는 강습과 일일입장이 모두 쉽니다. 12월 25일에는 강습이 없으며 유료 일일 자유수영은 운영합니다. 성탄절 일일 자유수영은 09:00~12:50과 14:00~17:50입니다.",
      url: source + "/sports/board.es?act=view&bid=0001&list_no=85955&mid=a50301000000&nPage=3",
      date: "2026-11-26",
    },
    {
      id: "ilsan-public-holiday", center: "ilsan", topic: "publicHoliday",
      title: "성탄절 강습 기준",
      body: "일산센터 회원약관 제20조에 따르면 수강일과 공휴일이 겹치면 원칙적으로 강습이 없으며 종목에 따라 예외가 있을 수 있습니다. 2026년 12월 25일 수업은 별도 안내에서 확인해 주세요. 성탄절 일일입장 운영 여부는 확인되지 않았습니다.",
      url: source + "/sports/menu.es?mid=a90601000000",
    },
    {
      id: "ilsan-regular-closure", center: "ilsan", topic: "regularClosure",
      title: "둘째 일요일 정기휴관",
      body: "일산센터 회원약관과 일일입장 안내는 매월 둘째 일요일을 휴관일로 안내합니다. 2026년 12월에는 13일이 둘째 일요일이므로 정기휴관 기준상 강습과 일일입장을 이용할 수 없습니다.",
      url: source + "/sports/menu.es?mid=a90204000000",
    },
    {
      id: "olympic-registration", center: "olympic", topic: "registration",
      title: "신규 강습과 재등록 접수 기준",
      body: "기존 회원의 재등록은 매월 20~26일, 신규 회원 접수는 27일부터 말일까지입니다. 수영을 처음 배우는 신규기초반과 신설강습반은 20일부터 신청할 수 있습니다. 신청 가능한 실제 강좌와 일자는 해당 월 모집 공지에서 확인해 주세요.",
      url: source + "/menu.es?mid=a50201000000",
    },
    {
      id: "ilsan-registration", center: "ilsan", topic: "registration",
      title: "신규 회원과 기초반 접수 기준",
      body: "일반 신규 회원은 매월 25일부터 선착순으로 접수합니다. 수영 신규기초반과 신설강습반은 20일부터 온라인과 현장에서 접수합니다. 재등록 시작일은 같은 공식 페이지에서도 일반 안내와 온라인 안내가 다르므로 해당 월 공지에서 확인해 주세요.",
      url: source + "/sports/menu.es?mid=a90201000000",
    },
    {
      id: "olympic-lanes", center: "olympic", topic: "lanes",
      title: "2026년 11월 레인별 강사배치도",
      body: "공식 배치도에서 시간별로 풀과 레인, 강습반, 담당 강사를 확인할 수 있습니다. 11월 배치 자료이므로 다른 달에는 해당 월 배치도를 확인해 주세요.",
      url: source + "/gallery.es?act=view&b_list_cnt=9&bid=0039&keyField=&keyWord=&list_no=8083&mid=a50103000000&nPage=1&ord=&vlist_no_npage=1",
      date: "2026-10-30",
    },
    {
      id: "olympic-availability", center: "olympic", topic: "availability",
      title: "등록 가능 인원 확인",
      body: "공식 실시간 등록현황은 강좌의 정원과 등록 가능한 인원을 표시합니다. 강좌 잔여석을 나타내는 수치로, 수영장에 실제 입장한 인원이나 강습 결석 인원은 확인할 수 없습니다.",
      url: source + "/spm/reservationStatus/waitList.do?scId=6&textSize=normal",
    },
    {
      id: "ilsan-availability", center: "ilsan", topic: "availability",
      title: "등록 기간 중 강좌 잔여인원 확인",
      body: "일산센터는 등록 기간에 공식 실시간 등록현황으로 강좌별 등록 가능 인원을 안내합니다. 잔여석은 등록 기준이며 시간대별 실제 출석이나 시설 혼잡도를 나타내지 않습니다.",
      url: source + "/sports/menu.es?mid=a90201000000",
    },
    {
      id: "olympic-lane-rental", center: "olympic", topic: "laneRental",
      title: "레인 대여 예약 취소와 미이용",
      body: "올림픽수영장 레인 대여는 이용 당일 시작 전에 취소하면 10%를 공제하고 환불받을 수 있습니다. 당일 사전에 알리지 않고 이용하지 않으면 환불받을 수 없습니다. 강습 등록이나 자유수영 일일입장에는 각각의 규정이 적용됩니다.",
      url: source + "/online/swimming/usage_guide.do?tab_no=2",
    },
  ];

  const byId = new Map(records.map(({ topic, ...doc }) => [doc.id, Object.freeze(doc)]));
  const exceptions = new Map([
    ["olympic:2026-12-13", { dayEntryOpen: false, docId: "olympic-holiday" }],
    ["olympic:2026-12-25", { dayEntryOpen: true, docId: "olympic-holiday" }],
    ["ilsan:2026-12-13", { dayEntryOpen: false, docId: "ilsan-regular-closure" }],
    ["ilsan:2026-12-25", { dayEntryOpen: null, docId: "ilsan-public-holiday" }],
  ]);

  function topicScores(query) {
    const child = /아동|유아|미취학|초등|자녀|어린이|아이|[0-9]+개월|[0-9]+살|140cm/.test(query);
    const guardian = /보호자|부모|엄마|아빠|동성/.test(query);
    const account = /계정|아이디|가입|인증|휴대폰|핸드폰|명의|미성년/.test(query);
    const registration = /신규|기초반|초보반|처음배우|처음시작|재등록|접수|등록(?!가능인원|현황)|신청|결원보충/.test(query);
    const childAccount = (child || guardian) && (account || registration);
    const childEntry = (child || guardian) && /입장|동성|동반|자유수영|탈의실|들어|데려|가능|[0-9]+개월|140cm/.test(query);
    const year = query.match(/20\d{2}/)?.[0];
    const knownYear = !year || year === "2026";
    const month = query.match(/(\d{1,2})월/)?.[1];
    const exactDate = query.match(/(?:20\d{2}[./-])?(\d{1,2})[./-](\d{1,2})(?!\d)|([0-9]{1,2})월([0-9]{1,2})일/);
    const day = exactDate && Number(exactDate[2] ?? exactDate[4]);
    const holidayDate = !exactDate || (Number(exactDate[1] ?? exactDate[3]) === 12 && [13, 25].includes(day));
    const holiday = knownYear && (!month || Number(month) === 12) && holidayDate &&
      /(?:12[./-](?:13|25)|12월(?:13|25)|성탄|크리스마스|공휴일|휴관|휴무|쉬나요|둘째일요일|둘째주일요일|두번째일요일|christmas)/.test(query);
    const regularClosure = /정기휴관|둘째일요일|둘째주일요일|두번째일요일/.test(query);
    const namedHoliday = /성탄|크리스마스|공휴일|christmas/.test(query);
    const laneRental = /레인대여|레인예약/.test(query) && /취소|환불|미이용|노쇼|대여/.test(query);
    const lanes = knownYear && (!month || Number(month) === 11) && /레인|강사배치/.test(query) && !laneRental;
    const availability = /잔여|빈자리|남은자리|남은인원|등록가능인원|자리남|정원|실시간등록|혼잡|노쇼|결석/.test(query);

    return {
      childAccount: childAccount ? 12 : 0,
      childEntry: childEntry && !childAccount ? 11 : 0,
      childSafety: childEntry && !childAccount ? 8 : 0,
      holiday: holiday ? 13 : 0,
      publicHoliday: holiday && day !== 13 && (!regularClosure || day === 25) ? 13 : 0,
      regularClosure: holiday && day !== 25 && (!namedHoliday || day === 13) ? 13 : 0,
      registration: registration && !childAccount && !laneRental ? 7 : 0,
      lanes: lanes ? 8 : 0,
      availability: availability && !laneRental ? 9 : 0,
      laneRental: laneRental ? 12 : 0,
    };
  }

  function find(query, center) {
    if (typeof query !== "string") return [];
    const normalized = query.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
    const mentionsOlympic = /올림픽수영장|올팍수영장|송파|방이동/.test(normalized.replace(/일산올림픽수영장/g, "일산"));
    const mentionsIlsan = /일산|고양/.test(normalized);
    const fallback = ["olympic", "ilsan"].includes(center) ? center : "";
    const scope = mentionsOlympic !== mentionsIlsan ? (mentionsOlympic ? "olympic" : "ilsan") : fallback;
    const scores = topicScores(normalized);
    return records.filter((record) => (!scope || record.center === scope) && scores[record.topic] > 0)
      .sort((a, b) => scores[b.topic] - scores[a.topic])
      .slice(0, 3)
      .map((record) => byId.get(record.id));
  }

  function exception(center, isoDate) {
    const entry = exceptions.get(center + ":" + isoDate);
    return entry ? { lessonsClosed: true, ...entry } : null;
  }

  return Object.freeze({ find, get: (id) => byId.get(id) ?? null, exception });
})();
