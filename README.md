# Loop

A three-page marketing site for **Loop** — a monthly gathering for international designers new to Berlin. Each visitor gets a small printed card with a question; the card makes strangers approachable.

Built from a Figma design as a static, hand-written HTML/CSS/JS site (no framework, no build step).

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, the format (3 steps), why Berlin, CTA |
| Meet the team | `team.html` | Six team members + volunteer recruitment band |
| Open Events | `events.html` | Three upcoming 2026 events with venue details |

## Design system

- **Typography** — Unbounded (display & nav), Inter (body & italic quotes), DM Sans (small/footer text), all served from Google Fonts.
- **Palette** — `#fffcf8` cream background · `#ff5b4a` accent orange · `#6e76e8` indigo · `#1c1814` ink · `#6b6358` muted.
- **Layout** — 1280px design baseline; content centered in a 1152px container with 24px gutters.

## Micro-interactions

- Hover states on nav links (underline sweep), buttons (lift + shadow + arrow slide), team & event cards (image zoom, color shifts).
- Scroll-triggered fade-up reveals via `IntersectionObserver`, with staggered delays per section.
- Animated stat counters (24+, 340+, 3 yrs) that count up when scrolled into view.
- Sticky header that compacts and gains a soft shadow once you scroll past the top.
- All animations gated on `prefers-reduced-motion: no-preference` — visitors who request reduced motion see content immediately, with no movement.

## Run locally

Either open `index.html` directly in your browser, or use the tiny dev server:

```bash
python3 server.py
# → http://localhost:8090/
```

Set `PORT` to use a different port:

```bash
PORT=3000 python3 server.py
```

## File map

```
carte-berlin/
├── index.html        ← Home
├── team.html         ← Meet the team
├── events.html       ← Open Events
├── styles.css        ← Single shared stylesheet
├── script.js         ← Scroll reveal + counters + smooth scroll
├── server.py         ← Optional local dev server
└── assets/
    └── images/       ← Logo, hero, team photos, venue photos
```

## Credits

- **Design** — Figma file `Final Assignment (E P D)`
- **Implementation** — Hand-written HTML, CSS, and JavaScript
