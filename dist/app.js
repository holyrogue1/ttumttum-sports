"use strict";

const form = document.querySelector("#filters");
const result = document.querySelector("#results");
const status = document.querySelector("#match-count");
const dayError = document.querySelector("#day-error");
const chartCenter = document.querySelector("#chart-center");
const chartAudience = document.querySelector("#chart-audience");
const dayLabels = [..."월화수목금토일"];
const timeBands = [
  { id: "morning", name: "오전", from: 0, to: 12 },
  { id: "afternoon", name: "오후", from: 12, to: 18 },
  { id: "evening", name: "저녁", from: 18, to: 24 },
];
const centers = new Map(TT_DATA.centers.map(center => [center.id, center]));
const money = new Intl.NumberFormat("ko-KR");

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

function preferences() {
  const values = new FormData(form);
  return { mode: values.get("mode"), days: values.getAll("day"), time: values.get("time"), center: values.get("center") };
}

function timeBand(start) {
  const hour = Number(start.slice(0, 2));
  return timeBands.find(band => hour >= band.from && hour < band.to).id;
}

function companionFits(course) {
  if (course.center !== TT_DATA.companion.center) return false;
  return course.days.every(day => {
    const [opens, closes] = TT_DATA.companion.hours[day];
    return opens <= course.start && course.end <= closes;
  });
}

function rank(a, b) {
  return b.seats / b.capacity - a.seats / a.capacity
    || b.seats - a.seats
    || a.start.localeCompare(b.start)
    || a.officialTitle.localeCompare(b.officialTitle, "ko");
}

function candidates(prefs) {
  const family = prefs.mode === "family";
  const needed = prefs.mode === "pair" ? 2 : 1;
  return TT_DATA.courses.filter(course =>
    (!prefs.center || course.center === prefs.center)
    && (!prefs.time || timeBand(course.start) === prefs.time)
    && course.audience === (family ? "child" : "adult")
    && course.seats >= needed
    && (!family || companionFits(course)));
}

function prettyDays(days) {
  return days.join("·");
}

function displayName(course) {
  return course.name.replace("(토.자유수영)", "").replace("접영발차기", "접영 발차기").replace("배영팔동작", "배영 팔동작");
}

function card(course, mode) {
  const center = centers.get(course.center);
  const node = element("article", "card");
  node.dataset.center = course.center;
  node.dataset.seats = String(course.seats);
  node.append(
    element("p", "center-label", `${center.name} / ${center.district}`),
    element("h4", "", `${course.start} ${displayName(course)}`),
    element("p", "schedule", `${prettyDays(course.days)} ${course.start}–${course.end}`),
  );
  const details = element("div", "details");
  details.append(
    element("span", "pill", `잔여 ${course.seats}석 / 정원 ${course.capacity}명`),
    element("span", "", `월 수강료 ${money.format(course.fee)}원`),
  );
  node.append(details);

  const actions = element("div", "actions");
  actions.append(link("공식 등록현황", center.registry), link("공식 강좌 안내", center.program),
    link("온라인 수강신청", TT_DATA.online));
  if (mode === "family") {
    node.append(element("p", "family-overlap", "아이 수업 시간 전체가 보호자 일일 헬스 운영시간에 포함됩니다. 이용 조건과 당일 입장 여부는 센터에 확인하세요."));
    actions.append(link("보호자 일일 헬스 안내", TT_DATA.companion.source));
  }
  node.append(actions);
  return node;
}

function emptyMessage(pool, prefs) {
  if (prefs.mode === "family" && prefs.center && prefs.center !== TT_DATA.companion.center) {
    return "보호자 일일 헬스와의 동시 이용 확인은 현재 올림픽수영장 자료를 기준으로 제공합니다.";
  }
  const alternative = pool.map(course => ({
    course, missing: course.days.filter(day => !prefs.days.includes(day)),
  })).sort((a, b) => a.missing.length - b.missing.length || rank(a.course, b.course))[0];
  if (!alternative?.missing.length) return "이 시연에서 확인된 범위에 맞는 강좌가 없습니다. 조회할 시간대나 센터를 바꿔 보세요.";
  const { course, missing } = alternative;
  return `조건에 맞는 강좌가 없습니다. ${prettyDays(missing)}요일도 참석할 수 있다면 ${centers.get(course.center).name} ${course.start} ${displayName(course)} 반을 확인할 수 있습니다.`;
}

function updateResults({ focus = false } = {}) {
  const prefs = preferences();
  result.replaceChildren();
  result.removeAttribute("aria-busy");
  dayError.hidden = prefs.days.length > 0;
  if (dayError.hidden === false) {
    status.textContent = "";
    if (focus) form.querySelector("[name=day]").focus();
    return;
  }
  const pool = candidates(prefs);
  const matches = pool.filter(course => course.days.every(day => prefs.days.includes(day))).sort(rank);
  status.textContent = matches.length ? `${matches.length}개 강좌가 조건에 맞습니다.` : "조건에 맞는 강좌 0개";
  if (matches.length === 0) result.append(element("p", "result-note", emptyMessage(pool, prefs)));
  for (const course of matches.slice(0, 4)) result.append(card(course, prefs.mode));
  if (matches.length > 4) {
    const disclosure = element("details", "more");
    const grid = element("div", "result-grid");
    grid.append(...matches.slice(4).map(course => card(course, prefs.mode)));
    disclosure.append(element("summary", "", `다른 강좌 ${matches.length - 4}개 보기`), grid);
    result.append(disclosure);
  }
  if (focus) document.querySelector("#matches-title").focus();
}

function chartCell(courses) {
  const td = element("td");
  if (!courses.length) {
    td.dataset.state = "empty";
    td.append(element("span", "", "—"), element("span", "sr-only", "확인 강좌 없음"));
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

form.addEventListener("submit", event => {
  event.preventDefault();
  updateResults({ focus: true });
});
form.addEventListener("change", event => {
  if (event.target.name === "mode" && event.target.value === "family") {
    document.querySelector("#time").value = "afternoon";
  }
  updateResults();
});
chartCenter.addEventListener("change", updateChart);
chartAudience.addEventListener("change", updateChart);
updateResults();
updateChart();
