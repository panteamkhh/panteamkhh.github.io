# panteamkhh.github.io

Personal portfolio for **Pantea Mohamadkhani** — Data Analyst / BI / Machine Learning.
Dark, project-first single page: dashboards and code are the content, the resume sits underneath.

Live at **https://panteamkhh.github.io**

## What's on the page

- **Hero** — positioning, four hard numbers, and a compact profile card (stack, availability, links).
- **Selected work (01)** — three case studies, each with a dashboard preview, impact bullets, three
  metrics and an expandable, syntax-highlighted code snippet.
- **Dashboards (02)** — the six BI / Streamlit / Excel reports with tool badges and headline metrics.
- **Models & pipelines (03)** — 18 filterable projects (ML, NLP, vision, forecasting, analytics, labs),
  each with a real figure and a metric. Below the grid, **Inside the query** shows the star schema,
  a Power BI model view and two real T-SQL windows with syntax highlighting.
- **Resume (04)** — experience, education, brand-marked certifications, publication, teaching,
  and a full-width six-card toolbox.
- **Contact (05)** — email, LinkedIn, GitHub.

## Design system

- Near-black surface (`#070910`) with pastel accents only: mint `#a7f3d0`, lavender `#c4b5fd`,
  pink `#fbcfe8`, sky, peach, butter. No thick outlines, no emoji, no offset shadows.
- **Inter** for text, **JetBrains Mono** for numbers, metrics, labels and code.
- Cards use a 1px hairline border, a faint top-lit gradient, and a soft glow on hover.
- **Background reacts to the page:** each section declares `data-glow` (e.g. `sky-mint`,
  `butter-peach`); the two glow layers cross-fade between them as you scroll, and the Three.js
  particles and wireframe floors lerp to the same palette. A soft spotlight trails the cursor.
- **Certifications** use brand marks (Microsoft, DeepLearning.AI, Udemy, Coursera, LinkedIn
  Learning) instead of initials.

## Three.js background

`js/three-scene.js` renders three point clouds (620 + 220 + 90 points) plus **two undulating
wireframe floors** at different depths — a near, brighter grid and a far, calmer one — so the
background has real parallax and height instead of a flat gradient. Everything is tinted with the
pastel palette and with the current section; the scene drifts slowly, follows the pointer and the
scroll position, pauses when the tab is hidden, and renders one static frame when
`prefers-reduced-motion` is set. If WebGL or the CDN import fails, the canvas is hidden and the page
is unaffected.

## Structure

```
.
├── index.html          # markup: hero, sections, resume, contact
├── css/style.css       # dark/pastel theme, responsive, print styles
├── js/
│   ├── three-scene.js  # pastel particle field (Three.js via import map)
│   ├── projects.js     # featured case studies, dashboards, projects, toolbox
│   └── main.js         # rendering, SVG project art, filters, reveal, nav
├── assets/
│   ├── favicon.svg
│   ├── cv.pdf
│   └── portrait.jpg
└── .nojekyll
```

## Editing content

All project content lives in `js/projects.js`:

- `featured` — the three case studies (chips, impact bullets, metrics, code snippet, art type).
- `dashboards` — the dashboard gallery cards (`tool`, `metric`, `art`).
- `projects` — the filterable grid (`cat` drives the filter chips, `metric`, `stars`, `art`).
- `toolbox` — the skill groups in the resume column.

**Visuals are real.** Each entry points at a chart or dashboard screenshot pulled from the
repository into `assets/projects/<slug>/` (27 figures, ~3.9 MB). `img` renders the real image on a
light "figure plate"; `art` (`bars`, `line`, `donut`, `heat`, `scatter`, `kpi`, `matrix`) is only the
fallback for repos without a usable figure. Featured cases can add `thumbs` for two extra figures.

To refresh a figure, re-export it from the project and drop it in `assets/projects/`, then update the
`img` path in `js/projects.js`. Every figure opens in a lightbox (`data-full`).

Resume text lives directly in `index.html` (experience, education, certifications, publication).

## Local preview

ES modules and the import map need HTTP, not `file://`:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

Append `?noreveal` to skip the scroll-reveal animation (handy for screenshots).

## Accessibility & performance

- Decorative background is `aria-hidden` and disabled without WebGL; motion respects
  `prefers-reduced-motion`.
- Sections are anchor-linked, keyboard focus is visible, and content is revealed with a
  failsafe so nothing can stay hidden.
- No framework, no build step. Three.js is the only external runtime dependency (CDN import map).
- Print stylesheet strips the background, nav and dashboard art so the page saves as a clean PDF.
