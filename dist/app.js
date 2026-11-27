"use strict";

const form = document.querySelector("#filters");
const result = document.querySelector("#results");
const status = document.querySelector("#match-count");
const dayError = document.querySelector("#day-error");
const chartCenter = document.querySelector("#chart-center");
const chartAudience = document.querySelector("#chart-audience");
const partyInputs = [...document.querySelectorAll('#filters [name="party"]')];
const childCount = document.querySelector("#children");
const toddlerCount = document.querySelector("#toddlers");
const partySummary = document.querySelector("#party-summary");
const partyNote = document.querySelector("#party-note");
const visitDate = document.querySelector("#visit-date");
const criteria = document.querySelector("#criteria-summary");
const editCriteria = document.querySelector("#edit-criteria");
const dayLabels = [..."월화수목금토일"];
const courseLevels = {
  beginner: /신기초|초보|입문/,
  basic: /기초/,
  elementary: /초급/,
  intermediate: /중급/,
  advanced: /상급|고급/,
  training: /연수|교정/,
};
const timeBands = [
  { id: "morning", name: "오전", from: 0, to: 12 },
  { id: "afternoon", name: "오후", from: 12, to: 18 },
  { id: "evening", name: "저녁", from: 18, to: 24 },
];
const centers = new Map(TT_DATA.centers.map(center => [center.id, center]));
const money = new Intl.NumberFormat("ko-KR");
const groupLabels = { adult: "성인", couple: "부부", family: "가족", toddler: "보호자·유아" };
const levelLabels = { beginner: "입문", basic: "기초", elementary: "초급", intermediate: "중급", advanced: "상급·고급", training: "연수·교정" };
const [, snapshotYear, snapshotMonth] = TT_DATA.month.match(/^(\d{4})년\s*(\d{1,2})월$/);
const monthPrefix = snapshotYear + "-" + snapshotMonth.padStart(2, "0");
const firstVisit = monthPrefix + "-01";
const lastVisit = new Date(Date.UTC(Number(snapshotYear), Number(snapshotMonth), 0)).toISOString().slice(0, 10);

function element(tag, className, copy) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (copy !== undefined) node.textContent = copy;
  return node;
}

function link(copy, url) {
  const node = element("a", "", copy);
  node.href = url;
  return node;
}

function partyRange(group) {
  return { minimum: group === "adult" ? 1 : 2, maximum: group === "couple" ? 2 : 6 };
}

function count(value, fallback) {
  if (value === null) return fallback;
  return /^[0-6]$/.test(value) ? Number(value) : NaN;
}

function normalizeDays(days) {
  return dayLabels.filter(day => days.includes(day));
}

function validVisitDate(date) {
  return !date || (/^\d{4}-\d{2}-\d{2}$/.test(date) && date >= firstVisit && date <= lastVisit);
}

function readPreferences(values) {
  const singleFields = ["group", "party", "children", "toddlers", "time", "center", "level", "date"];
  if (singleFields.some(key => values.getAll(key).length > 1)) return null;
  const group = values.get("group");
  if (!Object.hasOwn(groupLabels, group)) return null;
  const { minimum, maximum } = partyRange(group);
  const party = count(values.get("party"), NaN);
  const children = count(values.get("children"), 0);
  const toddlers = count(values.get("toddlers"), 0);
  if (![party, children, toddlers].every(Number.isFinite) || party < minimum || party > maximum ||
      children + toddlers >= party || (group !== "family" && children > 0) ||
      (group === "toddler" && toddlers === 0) || (!["family", "toddler"].includes(group) && toddlers > 0)) return null;
  const pickedDays = values.getAll("day");
  if (!pickedDays.length || pickedDays.some(day => !dayLabels.includes(day))) return null;
  const time = values.get("time") ?? "";
  const center = values.get("center") ?? "";
  const level = values.get("level") ?? "";
  const date = values.get("date") ?? "";
  if ((time && !timeBands.some(band => band.id === time)) || (center && !centers.has(center)) ||
      (level && !Object.hasOwn(levelLabels, level)) || !validVisitDate(date)) return null;
  return { group, party, children, toddlers, days: normalizeDays(pickedDays), time, center, level, date };
}

function plannerUrl(page, prefs) {
  if (!prefs) return page;
  const query = new URLSearchParams({ group: prefs.group, party: prefs.party });
  if (prefs.group === "family") query.set("children", prefs.children);
  if (prefs.group === "family" || prefs.group === "toddler") query.set("toddlers", prefs.toddlers);
  for (const day of prefs.days) query.append("day", day);
  for (const key of ["time", "center", "level", "date"]) {
    if (prefs[key]) query.set(key, prefs[key]);
  }
  return page + "?" + query;
}

function partyDescription({ party, children, toddlers }) {
  const breakdown = [((children || toddlers) ? "보호자 " : "성인 ") + (party - children - toddlers) + "명"];
  if (children) breakdown.push("어린이 " + children + "명");
  if (toddlers) breakdown.push("유아 " + toddlers + "명");
  return "총 " + party + "명 (" + breakdown.join(", ") + ")";
}

function setCount(select, minimum, maximum, selected) {
  select.replaceChildren(...Array.from({ length: maximum - minimum + 1 },
    (_, index) => new Option(`${minimum + index}명`, minimum + index)));
  select.value = String(selected);
}

function updateParty(changed = "", composition = null) {
  const group = form.elements.group.value;
  const isFamily = group === "family";
  const isToddler = group === "toddler";
  const { minimum, maximum } = partyRange(group);
  const current = Number(form.elements.party.value);
  const party = Math.min(maximum, Math.max(minimum, current));
  for (const radio of partyInputs) {
    const count = Number(radio.value);
    radio.checked = count === party;
    radio.disabled = count < minimum || count > maximum;
  }

  const showToddlers = isFamily || isToddler;
  document.querySelector("#party-composition").hidden = !showToddlers;
  document.querySelector("#children-field").hidden = !isFamily;
  document.querySelector("#toddlers-field").hidden = !showToddlers;
  childCount.disabled = !isFamily;
  toddlerCount.disabled = !showToddlers;

  const reset = changed === "group" || !childCount.options.length;
  const toddlerMinimum = isToddler ? 1 : 0;
  const toddlersBefore = composition?.toddlers ?? (reset ? toddlerMinimum : Number(toddlerCount.value));
  const childrenBefore = composition?.children ?? (reset ? 1 : Number(childCount.value));
  const children = isFamily ? Math.min(childrenBefore, party - 1) : 0;
  const toddlers = showToddlers ? Math.min(Math.max(toddlerMinimum, toddlersBefore), party - 1 - children) : 0;
  setCount(childCount, 0, party - 1 - toddlers, children);
  setCount(toddlerCount, toddlerMinimum, Math.max(toddlerMinimum, party - 1 - children), toddlers);

  partySummary.textContent = partyDescription({ party, children, toddlers });
  partyNote.textContent = group === "couple" ? "부부는 성인 2명으로 검색합니다."
    : toddlers ? "유아가 함께 가면 센터별 연령과 보호자 기준을 안내합니다."
      : children ? "어린이 수영과 보호자 운동의 운영시간을 비교합니다." : "";
}

function timeBand(start) {
  const hour = Number(start.slice(0, 2));
  return timeBands.find(band => hour >= band.from && hour < band.to).id;
}

function companionFits(course) {
  if (course.center !== TT_DATA.companion.center) return false;
  return course.days.every(day => {
    const hours = TT_DATA.companion.hours[day];
    return hours && hours[0] <= course.start && course.end <= hours[1];
  });
}

function rank(a, b) {
  return b.seats / b.capacity - a.seats / a.capacity
    || b.seats - a.seats
    || a.start.localeCompare(b.start)
    || a.officialTitle.localeCompare(b.officialTitle, "ko");
}

function courseLevel(course) {
  return Object.entries(courseLevels).find(([, pattern]) => pattern.test(course.name))?.[0];
}

function weekday(isoDate) {
  return [..."일월화수목금토"][new Date(`${isoDate}T00:00:00Z`).getUTCDay()];
}

function eligibleOn(course, isoDate) {
  return course.days.includes(weekday(isoDate)) && !TT_GUIDANCE.exception(course.center, isoDate)?.lessonsClosed;
}

function evaluateCourses(prefs) {
  const audience = prefs.children ? "child" : "adult";
  return TT_DATA.courses.filter(course => course.audience === audience).map(course => {
    const issues = [];
    if (prefs.center && course.center !== prefs.center) issues.push("center");
    if (prefs.time && timeBand(course.start) !== prefs.time) issues.push("time");
    if (prefs.level && courseLevel(course) !== prefs.level) issues.push("level");
    if (course.days.some(day => !prefs.days.includes(day))) issues.push("days");
    if (prefs.date && !eligibleOn(course, prefs.date)) issues.push("date");
    if (course.seats < (prefs.children || prefs.party)) issues.push("seats");
    if (prefs.children && !companionFits(course)) issues.push("companion");
    return { course, issues };
  }).sort((a, b) => a.issues.length - b.issues.length || rank(a.course, b.course));
}

function prettyDays(days) {
  return days.join("·");
}

function displayName(course) {
  return course.name.replace("(토.자유수영)", "").replace("접영발차기", "접영 발차기").replace("배영팔동작", "배영 팔동작");
}

function card(course, prefs) {
  const center = centers.get(course.center);
  const node = element("article", "card");
  node.dataset.center = course.center;
  node.dataset.seats = String(course.seats);
  node.append(
    element("p", "center-label", `${center.name} / ${center.district}`),
    element("h4", "", `${course.start} ${displayName(course)}`),
    element("p", "schedule", `${prettyDays(course.days)} ${course.start} ~ ${course.end}`),
  );
  const details = element("div", "details");
  details.append(
    element("span", "pill", `잔여 ${course.seats}석 / 정원 ${course.capacity}명`),
    element("span", "", prefs.children ? `어린이 ${prefs.children}명 수강 기준` : `성인 ${prefs.party}명 수강 기준`),
    element("span", "", `1인 월 수강료 ${money.format(course.fee)}원`),
  );
  node.append(details);

  const actions = element("div", "actions");
  actions.append(link("공식 등록현황", center.registry), link("공식 강좌 안내", center.program),
    link("온라인 수강신청", TT_DATA.online));
  if (prefs.children) {
    const adults = prefs.party - prefs.children;
    node.append(element("p", "family-overlap", `어린이 수영과 보호자 ${adults}명의 일일 헬스 운영시간이 겹칩니다. 보호자 입장 가능 인원은 센터에 확인하세요.`));
    actions.append(link("보호자 일일 헬스 안내", TT_DATA.companion.source));
  }
  node.append(actions);
  return node;
}

const issueCopy = {
  center: "선택한 센터 밖에 있는 강좌입니다.",
  time: "가능한 시간대와 강좌 시작 시각이 맞지 않습니다.",
  level: "이 강좌의 수영 수준이 선택한 조건과 다릅니다.",
  days: "강좌의 필수 수업 요일 중 참석하기 어려운 날이 있습니다.",
  date: "선택한 방문일이 수업 요일 또는 운영일과 맞지 않습니다.",
  seats: "확인한 잔여석이 수강 인원보다 적습니다.",
  companion: "보호자 운동시간과 겹친다는 근거가 확인되지 않습니다.",
};

function nextCourseDate(course, date) {
  const start = new Date(`${date}T00:00:00Z`);
  for (start.setUTCDate(start.getUTCDate() + 1); start.toISOString().slice(0, 10) <= lastVisit;
    start.setUTCDate(start.getUTCDate() + 1)) {
    const iso = start.toISOString().slice(0, 10);
    if (eligibleOn(course, iso)) return iso;
  }
  return "";
}

function alternativeChange({ course, issues }, prefs) {
  if (issues.length !== 1) return null;
  const [key] = issues;
  if (key === "center") return { key, value: course.center, label: `${centers.get(course.center).name} 선택하기` };
  if (key === "time") {
    const value = timeBand(course.start);
    return { key, value, label: `${timeBands.find(band => band.id === value).name} 시간대로 바꾸기` };
  }
  if (key === "days") {
    const value = course.days.filter(day => !prefs.days.includes(day));
    return { key, value, label: `${prettyDays(value)}요일 추가하기` };
  }
  if (key === "date") {
    const value = nextCourseDate(course, prefs.date);
    if (value) return { key, value, label: `${Number(value.slice(5, 7))}월 ${Number(value.slice(8))}일로 바꾸기` };
  }
  return null;
}

function alternativeUrl(change, prefs) {
  const updated = { ...prefs, [change.key]: change.value };
  if (change.key === "days") updated.days = normalizeDays([...prefs.days, ...change.value]);
  return plannerUrl("results.html", updated);
}

function renderNoMatches(entries, prefs) {
  const relevantCenters = prefs.center ? [prefs.center] : [...centers.keys()];
  const holidays = relevantCenters.flatMap(center => {
    const holiday = TT_GUIDANCE.exception(center, prefs.date);
    return holiday?.lessonsClosed ? [{ center, ...holiday }] : [];
  });
  const nearest = entries[0];
  const note = element("div", "result-note");
  note.append(element("h4", "", "조건이 맞지 않는 이유"));
  if (!holidays.length && nearest) {
    const { course } = nearest;
    note.append(element("p", "young-child-guide", `비교한 강좌 ${centers.get(course.center).name} ${course.start} ${displayName(course)}`));
  }
  const issues = element("ul", "match-issues");
  for (const holiday of holidays) {
    const doc = TT_GUIDANCE.get(holiday.docId);
    const text = holiday.dayEntryOpen === true ? "이날 강습은 쉽니다. 일일입장은 별도 시간으로 운영합니다."
      : holiday.dayEntryOpen === false ? "이날은 강습과 일일입장을 모두 쉽니다."
        : "이날 강습은 쉽니다. 일일입장 운영은 센터 공지를 확인해 주세요.";
    const item = element("li", "", `${centers.get(holiday.center).name} · ${text} `);
    item.append(link("공식 운영 공지", doc.url));
    issues.append(item);
  }
  for (const key of nearest?.issues ?? []) {
    if (key !== "date" || !holidays.some(holiday => holiday.center === nearest.course.center)) {
      issues.append(element("li", "", issueCopy[key]));
    }
  }
  if (!issues.children.length) issues.append(element("li", "", "현재 시연에서 일치하는 강좌를 확인하기 어렵습니다."));
  note.append(issues);
  result.append(note);

  const alternatives = element("div", "alternative-grid");
  alternatives.append(element("h4", "", "조건 하나를 바꾸면 가능한 강좌"));
  const seen = new Set();
  for (const entry of entries) {
    const change = alternativeChange(entry, prefs);
    if (!change) continue;
    const id = `${change.key}:${change.value}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const choice = element("article", "card");
    const { course } = entry;
    choice.append(
      element("p", "center-label", centers.get(course.center).name),
      element("p", "schedule", `${prettyDays(course.days)} ${course.start} ${displayName(course)}`),
    );
    const apply = link(change.label, alternativeUrl(change, prefs));
    apply.className = "primary";
    apply.dataset.alternative = change.key;
    choice.append(apply);
    alternatives.append(choice);
    if (seen.size === 2) break;
  }
  if (seen.size) result.append(alternatives);
  else note.append(element("p", "young-child-guide", "확인한 강좌 중 한 가지 조건만 바꿔서 갈 수 있는 대안은 없습니다."));
}

function renderYoungChildGuidance(prefs) {
  status.textContent = "유아 동반 시 센터별 이용 안내를 확인해 주세요.";
  const notice = element("div", "result-note");
  notice.append(element("p", "", "시연 자료에서 유아 동반 입장 가능 인원과 함께 이용할 수 있는 시간을 확인하기 어렵습니다."));
  for (const doc of TT_GUIDANCE.find("보호자와 유아 자유수영", prefs.center)) {
    const detail = element("p", "young-child-guide", doc.body + " ");
    detail.append(link(doc.title, doc.url));
    notice.append(detail);
  }
  const guideParams = new URLSearchParams({ query: "보호자와 유아 자유수영" });
  if (prefs.center) guideParams.set("center", prefs.center);
  const guide = link("유아 동반 이용 안내 더 보기", "guide.html?" + guideParams);
  guide.className = "secondary";
  notice.append(guide);
  result.append(notice);
}

function renderResults(prefs) {
  result.removeAttribute("aria-busy");
  if (editCriteria) {
    editCriteria.href = plannerUrl("find.html", prefs);
    if (!prefs) editCriteria.textContent = "조건 선택";
  }
  if (!prefs) {
    status.textContent = "검색 조건을 다시 선택해 주세요.";
    result.append(element("p", "result-note", "참석 가능한 요일과 동행 인원을 입력하면 맞는 운동 시간을 확인할 수 있어요."));
    return;
  }
  renderCriteria(prefs);
  if (prefs.toddlers) {
    renderYoungChildGuidance(prefs);
    return;
  }
  const evaluated = evaluateCourses(prefs);
  const matches = evaluated.filter(entry => !entry.issues.length).map(entry => entry.course);
  status.textContent = matches.length
    ? (prefs.children ? `보호자 운동시간과 겹치는 어린이 강좌 ${matches.length}개` : `${matches.length}개 강좌가 조건에 맞습니다.`)
    : "조건에 맞는 강좌 0개";
  if (matches.length === 0) renderNoMatches(evaluated, prefs);
  for (const course of matches.slice(0, 4)) result.append(card(course, prefs));
  if (matches.length > 4) {
    const disclosure = element("details", "more");
    const grid = element("div", "result-grid");
    grid.append(...matches.slice(4).map(course => card(course, prefs)));
    disclosure.append(element("summary", "", `다른 강좌 ${matches.length - 4}개 보기`), grid);
    result.append(disclosure);
  }
}

function renderCriteria(prefs) {
  if (!criteria) return;
  const list = element("ul", "criteria-list");
  const specs = [
    ["동행", groupLabels[prefs.group] + " · " + partyDescription(prefs)],
    ["요일", prettyDays(prefs.days)],
    ["시간대", timeBands.find(band => band.id === prefs.time)?.name ?? "모든 시간대"],
    ["수영 수준", levelLabels[prefs.level] ?? "모든 수준"],
    ["센터", centers.get(prefs.center)?.name ?? "두 센터 모두"],
    ["방문일", prefs.date ? Number(prefs.date.slice(5, 7)) + "월 " + Number(prefs.date.slice(8)) + "일" : "미지정"],
  ];
  for (const [label, value] of specs) {
    const row = element("li");
    row.append(element("strong", "", label + " "), element("span", "", value));
    list.append(row);
  }
  criteria.replaceChildren(list);
}

function formFields(prefs) {
  form.elements.group.value = prefs.group;
  form.elements.party.value = String(prefs.party);
  updateParty("", prefs);
  for (const day of form.querySelectorAll('[name="day"]')) day.checked = prefs.days.includes(day.value);
  for (const key of ["time", "center", "level", "date"]) form.elements[key].value = prefs[key];
  validateDays();
}

function loadScenario(kind) {
  if (!["worker", "family"].includes(kind)) return;
  const family = kind === "family";
  formFields({
    group: family ? "family" : "adult",
    party: family ? 4 : 1,
    children: family ? 2 : 0,
    toddlers: 0,
    days: ["화", "목"],
    time: family ? "afternoon" : "evening",
    center: family ? "olympic" : "",
    level: family ? "" : "elementary",
    date: "",
  });
}

function validateDays(focus = false) {
  const first = form.querySelector('[name="day"]');
  const available = Boolean(form.querySelector('[name="day"]:checked'));
  dayError.hidden = available;
  if (available) first.removeAttribute("aria-invalid");
  else {
    first.setAttribute("aria-invalid", "true");
    if (focus) first.focus();
  }
  return available;
}

function bindFind(params) {
  visitDate.min = firstVisit;
  visitDate.max = lastVisit;
  const restored = readPreferences(params);
  if (restored) formFields(restored);
  else {
    updateParty();
    loadScenario(params.get("scenario"));
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateDays(true)) return;
    const prefs = readPreferences(new FormData(form));
    if (!prefs) return;
    try {
      history.replaceState(history.state, "", plannerUrl("find.html", prefs));
    } catch {
      // A local file can restrict History API URL changes.
    }
    window.location.assign(plannerUrl("results.html", prefs));
  });
  form.addEventListener("change", event => {
    if (event.target.name === "group" && event.target.value === "family") form.elements.time.value = "afternoon";
    if (["group", "party", "children", "toddlers"].includes(event.target.name)) updateParty(event.target.name);
    if (event.target.name === "day") validateDays();
  });
  for (const example of document.querySelectorAll("[data-scenario]")) {
    example.addEventListener("click", () => loadScenario(example.dataset.scenario));
  }
}

function chartCell(courses) {
  const td = element("td");
  if (!courses.length) {
    td.dataset.state = "empty";
    td.append(element("span", "", "·"), element("span", "sr-only", "확인 강좌 없음"));
    return td;
  }
  const totals = courses.reduce((acc, row) => ({ seats: acc.seats + row.seats, capacity: acc.capacity + row.capacity }), { seats: 0, capacity: 0 });
  const percentage = Math.round(totals.seats / totals.capacity * 100);
  td.dataset.band = percentage >= 25 ? "high" : percentage >= 10 ? "middle" : "low";
  td.append(element("strong", "", `${percentage}%`), element("small", "", `${totals.seats}/${totals.capacity}`));
  td.setAttribute("aria-label", `잔여 ${totals.seats}석, 정원 ${totals.capacity}명, 잔여석 비율 ${percentage}%`);
  return td;
}

function updateChart() {
  const selectedCenter = chartCenter.value;
  const selectedAudience = chartAudience.value;
  const courses = TT_DATA.courses.filter(course =>
    course.center === selectedCenter && (selectedAudience === "all" || course.audience === selectedAudience));
  const table = element("table");
  const headerRow = element("tr");
  const times = element("th", "", "시작");
  times.scope = "col";
  headerRow.append(times);
  for (const day of dayLabels) {
    const th = element("th", "", day);
    th.scope = "col";
    headerRow.append(th);
  }
  table.append(element("caption", "sr-only", `${centers.get(selectedCenter).name} 요일과 시간대별 잔여석`));
  table.createTHead().append(headerRow);
  const body = table.createTBody();
  for (const band of timeBands) {
    const row = element("tr");
    const heading = element("th", "", band.name);
    heading.scope = "row";
    row.append(heading);
    for (const day of dayLabels) {
      row.append(chartCell(courses.filter(course => course.days.includes(day) && timeBand(course.start) === band.id)));
    }
    body.append(row);
  }
  document.querySelector("#chart").replaceChildren(table);
  document.querySelector("#chart-status").textContent = `${centers.get(selectedCenter).name} 잔여석 지도. 확인한 강좌 ${courses.length}개.`;
}

const pageParams = new URLSearchParams(window.location.search);
if (form) bindFind(pageParams);
if (result) renderResults(readPreferences(pageParams));
if (chartCenter && chartAudience) {
  const requestedCenter = pageParams.get("center");
  if (centers.has(requestedCenter)) chartCenter.value = requestedCenter;
  chartCenter.addEventListener("change", updateChart);
  chartAudience.addEventListener("change", updateChart);
  updateChart();
}
