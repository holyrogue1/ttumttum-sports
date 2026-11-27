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

  const normalize = (value) => value.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
  const centerNames = { olympic: "올림픽수영장", ilsan: "일산올림픽스포츠센터" };
  const terms = {
    child: /아동|유아|미취학|초등|자녀|어린이|아이(?!디)|[0-9]+개월|[0-9]+살|140cm/,
    guardian: /보호자|부모|엄마|아빠|동성/,
    account: /계정|아이디|가입|인증|휴대폰|핸드폰|휴대전화|명의|미성년/,
    registration: /신규|기초반|초보반|처음배우|처음시작|재등록|접수|등록(?!가능인원|현황)|신청|결원보충/,
    entry: /입장|동성|동반|자유수영|탈의실|들어|데려|[0-9]+개월|140cm/,
    hours: /운영|이용시간|몇시|열어요|여나요|개장/,
    holiday: /성탄|크리스마스|공휴일|christmas/,
    closure: /휴관|휴무|쉬나요|둘째(?:주)?일요일|두번째일요일/,
    lesson: /강습|수업|레슨/,
    lanes: /레인|강사배치/,
    rental: /레인(?:을|를)?(?:대여|예약|빌)/,
    refund: /취소|환불|미이용|노쇼|불참/,
    availability: /잔여|빈자리|남은자리|남은인원|등록가능인원|자리남|정원|실시간등록/,
    attendance: /혼잡|붐비|방문인원|실제이용|출석|출입인원|결석|노쇼|사람이?많/,
  };

  function conceptSet(text) {
    return new Set(Object.entries(terms).filter(([, expression]) => expression.test(text)).map(([concept]) => concept));
  }

  const index = records.map((record) => ({
    record,
    title: conceptSet(normalize(record.title)),
    content: conceptSet(normalize(record.body)),
  }));
  const documentFrequency = new Map(Object.keys(terms).map((term) => [term,
    index.filter(({ title, content }) => title.has(term) || content.has(term)).length,
  ]));

  function queryConditions(query, center) {
    const queryText = normalize(query);
    const concepts = conceptSet(queryText);
    const mentionsOlympic = /올림픽수영장|올팍수영장|송파|방이동/.test(queryText.replace(/일산올림픽수영장/g, "일산"));
    const mentionsIlsan = /일산|고양/.test(queryText);
    const selected = Object.hasOwn(centerNames, center) ? center : "";
    const scope = mentionsOlympic !== mentionsIlsan ? (mentionsOlympic ? "olympic" : "ilsan") : selected;
    const year = queryText.match(/20\d{2}/)?.[0];
    const date = queryText.match(/(?:20\d{2}[./-])?(\d{1,2})[./-](\d{1,2})(?!\d)|([0-9]{1,2})월([0-9]{1,2})일/);
    const month = date ? Number(date[1] ?? date[3]) : Number(queryText.match(/(\d{1,2})월/)?.[1] ?? 0);
    const day = date ? Number(date[2] ?? date[4]) : 0;
    const namedChristmas = /성탄|크리스마스|christmas/.test(queryText);
    const regularClosure = /정기휴관|둘째(?:주)?일요일|두번째일요일/.test(queryText);
    const age = queryText.match(/(\d{1,3})개월|(?:만)?(\d{1,2})(?:세|살)/);
    const childAge = age ? Number(age[1] ?? age[2]) * (age[1] ? 1 : 12) : null;
    const preschool = /미취학/.test(queryText) || (childAge !== null && childAge < 60);
    const dateSpecific = date || namedChristmas;
    const target = dateSpecific ? `${year ?? "2026"}-${String(month || 12).padStart(2, "0")}-${String(day || 25).padStart(2, "0")}` : "";
    return { concepts, scope, year, month, day, regularClosure, target, childAge, preschool };
  }

  function eligibleTopics({ concepts, year, month, day, regularClosure, target }) {
    const has = (...options) => options.some((value) => concepts.has(value));
    const child = has("child", "guardian");
    const childAccount = child && (has("account") || (has("registration") && !has("entry")));
    const childEntry = child && has("entry") && !childAccount;
    const rental = has("rental");
    const availability = has("availability", "attendance") && !rental;
    const publicHoliday = has("holiday");
    const holiday = (!year || year === "2026") && (!month || month === 12) &&
      (!day || day === 13 || day === 25) && (has("holiday", "closure") || Boolean(target));
    const topics = new Map();
    if (childAccount) topics.set("childAccount", 12);
    if (childEntry) {
      topics.set("childEntry", 12);
      topics.set("childSafety", 8);
    }
    if (holiday) {
      topics.set("holiday", 13);
      if (day !== 13 && (!regularClosure || day === 25)) topics.set("publicHoliday", 13);
      if (day !== 25 && !target.endsWith("-12-25") && (!publicHoliday || day === 13)) topics.set("regularClosure", 13);
    }
    if (availability) topics.set("availability", 9);
    if (has("registration") && !childAccount && !rental) topics.set("registration", 7);
    if (has("lanes") && !rental && (!year || year === "2026") && (!month || month === 11)) topics.set("lanes", 8);
    if (rental) topics.set("laneRental", 12);
    return topics;
  }

  function retrieve(conditions) {
    const topics = eligibleTopics(conditions);
    const ranked = index.flatMap(({ record, title, content }) => {
      if ((conditions.scope && conditions.scope !== record.center) || !topics.has(record.topic)) return [];
      let relevance = topics.get(record.topic);
      for (const term of conditions.concepts) {
        const matches = Number(title.has(term)) * 2 + Number(content.has(term));
        const rarity = Math.log1p(index.length / (1 + documentFrequency.get(term)));
        relevance += matches * rarity;
      }
      return [{ record, relevance }];
    });
    return ranked.sort((a, b) => b.relevance - a.relevance).map(({ record }) => record);
  }

  function find(query, center) {
    if (typeof query !== "string") return [];
    return retrieve(queryConditions(query, center)).slice(0, 3).map(({ id }) => byId.get(id));
  }

  function holidayAnswer(record, target) {
    const status = exception(record.center, target);
    if (status?.docId !== record.id) return null;
    if (record.id === "olympic-holiday") {
      return status.dayEntryOpen
        ? "2026년 12월 25일에는 강습이 쉽니다. 유료 일일 자유수영은 09:00~12:50과 14:00~17:50에 이용할 수 있습니다."
        : "2026년 12월 13일은 정기휴관일입니다. 강습과 일일입장이 모두 운영되지 않습니다.";
    }
    return record.body;
  }

  function answer(query, center) {
    if (typeof query !== "string" || !query.trim()) return { state: "empty", items: [] };
    const conditions = queryConditions(query, center);
    const retrieved = retrieve(conditions);
    const named = centerNames[conditions.scope];
    if (!retrieved.length) return { state: "unknown", center: named, items: [] };

    const best = retrieved.slice(0, 3);
    const hasIlsanEntry = best.some(({ id }) => id === "ilsan-toddler");
    const items = best.flatMap((record) => {
      if (hasIlsanEntry && record.id === "ilsan-swim-safety") return [];
      const sources = [byId.get(record.id)];
      const olympicPreschool = record.id === "olympic-toddler" && conditions.preschool;
      const ilsanUnder36 = record.id === "ilsan-toddler" && conditions.childAge !== null && conditions.childAge < 36;
      const compare = record.id === "ilsan-toddler" && !ilsanUnder36;
      if (compare) sources.push(byId.get("ilsan-swim-safety"));
      const checkCenter = compare || record.id === "ilsan-public-holiday" || (record.id === "olympic-toddler" && !olympicPreschool);
      let text = holidayAnswer(record, conditions.target) ?? record.body;
      if (olympicPreschool) text = "올림픽수영장 일일 자유수영은 초등학생부터 이용할 수 있습니다. 보호자 동반 예외는 취학한 어린이 중 키 140cm 미만인 경우에 적용됩니다.";
      if (ilsanUnder36) text = "일산센터 일일입장 안내의 유아 자유수영 최소 기준은 36개월입니다. 36개월 미만은 이 기준을 충족하지 않습니다.";
      return [{
        title: record.title,
        center: centerNames[record.center],
        text,
        status: checkCenter ? "센터 확인" : "",
        sources,
      }];
    });
    return { state: "answered", center: named, items };
  }

  function exception(center, isoDate) {
    const entry = exceptions.get(center + ":" + isoDate);
    return entry ? { lessonsClosed: true, ...entry } : null;
  }

  return Object.freeze({ find, answer, get: (id) => byId.get(id) ?? null, exception });
})();
