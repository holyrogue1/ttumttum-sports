# 틈틈이 시연 웹

## Atmosphere

A Korean public sports service with an editorial opening, a single working search panel and an evidence-backed schedule. The approved crane welcomes visitors from the right side of the home image. The display should feel like a contemporary recreation-center guide with a warm background and clear data labels.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F7F8F2` | Hero and page tint |
| `--white` | `#FFFFFF` | Forms and results |
| `--ink` | `#182A22` | Main text |
| `--muted` | `#50635B` | Supporting text |
| `--line` | `#D5DDD5` | Quiet rules |
| `--outline` | `#728578` | Control borders |
| `--pine` | `#164A38` | Primary actions, links and focus |
| `--deep` | `#0F382C` | Hover and hero block |
| `--mint` | `#E5EFE5` | Selected and art field |
| `--lime` | `#D4EAAD` | Hero accent |
| `--gold` | `#F5E5B6` | Data caveat |
| `--umber` | `#674B16` | Data caveat text |
| `--heat-1` | `#EBF2E4` | Lower observed seat availability |
| `--heat-2` | `#D8E9C9` | Middle observed seat availability |
| `--heat-3` | `#BAD7A8` | Higher observed seat availability |

## Typography

Spoqa Han Sans Neo 400 and 700 with Korean system fallback. Hero 60/46/38, section 32/26, card 21, body 16, labels 14, minimum size 13. Tabular digits for times and counts.

## Spacing

4px scale (4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80), container 1200, outer gutters 32/24/16. Radio and select control minimum height 44. Use radii 8, 16 and 24. Desktop and mobile breakpoints 900 and 620.

## Components

Split portrait hero, readable one-sentence lead, one CTA. The first form row uses radio groups for companion type and total attendance. It shows up to six attendance options, with the companion type setting which options are available. A family composition row uses native child-count selects and a text summary. On mobile, these groups stack above weekday, time and center controls. Results display center, actual time, all required days, seat needs and official links. Family cards identify an overlap between gym hours and child swimming. Preschool visits show official eligibility information in the result area. Analytics cells carry percentage and raw numerators, with a clear empty state. Status text accompanies any color. Mobile chart retains all seven weekdays.

Two example searches open the planner with real conditions filled in. Level and optional first visit date retain the existing select and input treatment. When a search returns zero matches, show the blocking condition, then only alternatives that satisfy all the other selected conditions. Include source links in cards and results. A separate official guide search uses matching fonts, borders and controls. The filter rows wrap at 1000px. Mobile center selection has its own full-width row to show the long center name.

## Motion

Immediate state changes and visible focus. No entrance motion or autoplay.

## Depth

Use background color fields, dividers and type sizes. No decorative charts, invented metrics or raised boxes.
