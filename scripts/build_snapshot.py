"""Build a reproducible, verified demo snapshot from retained official source files."""

import argparse
import csv
import json
from pathlib import Path

from lxml import html

CENTERS = {
    "olympic": ("올림픽수영장", "서울 송파", "6"),
    "ilsan": ("일산올림픽스포츠센터", "경기 고양", "5"),
}

# Only include rows whose required days were checked against the official
# program, including the distinction between lessons and free-swim benefits.
REVIEWED = {
    "olympic": [
        ("07시 중급1", "월화수목금", "adult"),
        ("14시 고급2", "월화수목금", "adult"),
        ("20시 상급1", "월화수목금", "adult"),
        ("16시 어린이 중급2 (화목)", "화목", "child"),
        ("17시 어린이 초급3(월수금)", "월수금", "child"),
        ("17시 어린이 상급2(월수금)", "월수금", "child"),
    ],
    "ilsan": [
        ("09시 중급1(접영발차기)(토.자유수영)", "화목", "adult"),
        ("11시 기초2(배영팔동작)(토.자유수영)", "화목", "adult"),
        ("11시 신기초(초보자)", "월수금", "adult"),
        ("14시 교정A(접영.오리발=화)(토.자유수영)", "화목", "adult"),
        ("14시 초급1(평영발차기)(토.자유수영)", "화목", "adult"),
        ("15시 기초2(배영종합동작)", "월수금", "adult"),
        ("16시 기초2(배영종합동작)", "월수금", "adult"),
        ("16시 초급3(평영종합동작)", "월수금", "adult"),
        ("17시 신기초(초보자)(토.자유수영)", "화목", "adult"),
        ("17시 중급2(접영팔동작)", "월수금", "adult"),
        ("20시 교정B(접영.오리발=화.목)", "월화수목금", "adult"),
        ("21시 기초1(자유형.배영)", "월화수목금", "adult"),
        ("11시 교정A(초등1~접영.입수.턴)", "토일", "child"),
        ("11시 초급1(초등1~평영발차기)", "토일", "child"),
        ("16시 기초3(초등.배영종합동작)", "화목", "child"),
    ],
}


def normalized(value):
    return "".join(value.split())


def collect(source):
    with (source / "courses-20260825.csv").open(encoding="cp949", newline="") as file:
        programs = {
            row[0]: row[3]
            for row in csv.reader(file)
            if row[1] == "수영" and row[0] in {item[0] for item in CENTERS.values()}
        }

    centers, courses = [], []
    for key, (name, district, scid) in CENTERS.items():
        registry = f"https://www.ksponco.or.kr/spm/reservationStatus/waitList.do?scId={scid}&itemCode=040"
        centers.append(dict(id=key, name=name, district=district, program=programs[name], registry=registry))
        page = html.fromstring((source / f"dec-{key}.html").read_text(encoding="utf8"))
        table_rows = []
        for row in page.xpath("//tbody/tr[td[contains(@class,'popup_tbtitle')]]"):
            cells = [" ".join(td.text_content().strip().split()) for td in row.xpath("./td")]
            if len(cells) == 7:
                table_rows.append(cells)
        for title, required_days, audience in REVIEWED[key]:
            matches = [row for row in table_rows if normalized(row[0]) == normalized(title)]
            if len(matches) != 1:
                raise ValueError(f"Expected one registry row for {key} {title} and found {len(matches)}")
            actual, starts, ends, _, fee, capacity, seats = matches[0]
            fee, capacity, seats = (int(value.replace(",", "")) for value in (fee, capacity, seats))
            if not 0 <= seats <= capacity or capacity == 0:
                raise ValueError(f"Invalid seats for {actual}")
            courses.append(dict(center=key, name=actual.split(" ", 1)[1], officialTitle=actual,
                                audience=audience, days=list(required_days), start=starts, end=ends,
                                fee=fee, capacity=capacity, seats=seats))

    courses.sort(key=lambda row: (row["center"], row["start"], row["officialTitle"]))
    return dict(
        collected="2026-11-25",
        month="2026년 12월",
        dataset="https://www.data.go.kr/data/15147992/fileData.do",
        online="https://www.ksponco.or.kr/spm/index.do",
        centers=centers,
        courses=courses,
        companion={
            "center": "olympic",
            "name": "보호자 일일 헬스",
            "source": "https://www.ksponco.or.kr/menu.es?mid=a50204000000",
            "hours": {
                day: ["06:00", "21:50"] if day in "월화수목금" else ["09:00", "17:50"]
                for day in "월화수목금토일"
            },
        },
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    snapshot = collect(args.source)
    payload = json.dumps(snapshot, ensure_ascii=False, separators=(",", ":"))
    args.destination.write_text(f"const TT_DATA = {payload};\n", encoding="utf8")
    print(len(snapshot["courses"]), "verified course rows")
