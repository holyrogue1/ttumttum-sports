(() => {
  const form = document.querySelector("#guide-form");
  const query = document.querySelector("#guide-query");
  const center = document.querySelector("#guide-center");
  const results = document.querySelector("#guide-results");
  if (!form || !query || !results) return;
  const queryLimit = query.maxLength > 0 ? query.maxLength : 160;

  function element(tagName, className, content) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  }

  function sourceLink(source) {
    const link = element("a", "", source.title);
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (!source.date) return link;
    const item = element("span", "guide-source");
    const date = element("time", "", source.date.replaceAll("-", "."));
    date.dateTime = source.date;
    item.append(link, date);
    return item;
  }

  function render(answer) {
    results.replaceChildren();
    if (answer.state === "empty") {
      results.append(element("p", "guide-empty result-note", "확인할 센터와 질문을 입력해 주세요."));
      return;
    }
    if (answer.state === "unknown") {
      const where = answer.center ? answer.center + "의 " : "";
      results.append(element("p", "guide-empty result-note",
        `${where}확인한 공식 자료에서 답을 찾지 못했습니다. 휴관일, 수강신청, 어린이 일일입장처럼 확인하려는 내용을 구체적으로 적어 주세요.`));
      return;
    }

    const block = element("section", "guide-answer");
    block.append(element("h2", "guide-answer-title", "공식 안내 검색 결과"));
    for (const item of answer.items) {
      const card = element("article", "guide-card");
      const label = [item.center, item.status].filter(Boolean).join(" / ");
      card.append(element("p", "center-label", label));
      card.append(element("h3", "", item.title), element("p", "", item.text));
      const evidence = element("ul", "guide-evidence");
      evidence.setAttribute("aria-label", "공식 안내 출처");
      for (const source of item.sources) {
        const entry = element("li");
        entry.append(sourceLink(source));
        evidence.append(entry);
      }
      card.append(evidence);
      block.append(card);
    }
    results.append(block);
  }

  function search() {
    render(TT_GUIDANCE.answer(query.value.trim().slice(0, queryLimit), center?.value || ""));
  }

  function chooseCenter(value) {
    if (center && ["", "olympic", "ilsan"].includes(value)) center.value = value;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    search();
  });
  center?.addEventListener("change", () => { if (query.value.trim()) search(); });
  for (const suggestion of document.querySelectorAll("[data-guide-query]")) {
    suggestion.addEventListener("click", (event) => {
      event.preventDefault();
      chooseCenter(suggestion.dataset.guideCenter ?? "");
      query.value = suggestion.dataset.guideQuery;
      search();
    });
  }

  const params = new URLSearchParams(location.search);
  chooseCenter(params.get("center") ?? "");
  const initialQuery = params.get("query") ?? params.get("q");
  if (initialQuery) {
    query.value = initialQuery.slice(0, queryLimit);
    search();
  }
})();
