# panteamkhh.github.io

My personal portfolio & resume site — a playful cartoon "adventure" where you
click characters on a map to reveal each part of my resume, with a Three.js
scene behind it.

Live at **https://panteamkhh.github.io**

## How it works

Instead of one long scroll, the site is a small **interactive map**:

- **Home** — intro plus a portrait card (with a graceful fallback if the image
  is missing).
- **Explore** — a cartoon map with seven characters. Clicking one opens a panel
  with that section:
  - 🦉 **Education** — MBA, M.Sc. AI & Robotics, B.Sc. Industrial Engineering
  - 💼 **Experience** — Adrin Darou Iranian, MAPNA/TUGA
  - 🤖 **Projects** — data / ML / AI repositories
  - 🧰 **Skills** — grouped skill chips
  - ⭐ **Extras** — certifications, publication, teaching, languages
  - ✉️ **Contact** — email, LinkedIn, GitHub
  - 🙂 **About** — the professional summary
- Each character you open gets a ✓ and a **discovery counter** (`n / 7`), so it
  feels like exploring. Progress is remembered in `localStorage`.
- A **CV ↓** button opens the browser print dialog with a print stylesheet, so
  the page can be saved as a clean PDF.

## Tech

- **Three.js** (`r160`, CDN via import map) — a friendly cel-shaded planet with
  orbiting pastel shapes.
- **Vanilla HTML/CSS/JS** — no build step, deployed straight from `main` with
  GitHub Pages. Cartoon characters are inline SVG.
- **Google Fonts** — Fredoka + Nunito.

## Structure

```
.
├── index.html          # markup: hero, adventure map, modal + section templates
├── css/style.css       # cartoon theme + print styles
├── js/
│   ├── three-scene.js  # Three.js planet scene
│   ├── projects.js     # project + skills data
│   └── main.js         # map discovery, modal, scrollspy, print
├── assets/
│   ├── favicon.svg
│   └── portrait.jpg    # ← your portrait
└── .nojekyll           # tell GitHub Pages to skip Jekyll
```

## Editing content

- **Resume text** lives in `<template id="tpl-...">` blocks in `index.html`
  (about, education, experience, extras, contact), so it is easy to edit and
  indexable by search engines.
- **Projects and skills** are data-driven — edit `js/projects.js`:

```js
{
  name: "repo-name",
  url: "https://github.com/panteamkhh/repo-name",
  emoji: "🛡️",
  color: "#ff8fb1",
  description: "One or two sentences.",
  tags: ["Python", "pandas"],
}
```

- **Characters** are inline SVG inside each `.station` in `index.html`.

## Local preview

Fully static, but it uses ES modules and an import map, so serve it over HTTP
rather than `file://`:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Accessibility & performance

- The 3D background is decorative (`aria-hidden`) and skipped when WebGL is
  missing.
- The map is a grid of real `<button>`s on small screens; the modal closes with
  `Esc` and traps focus back to the map.
- Animations respect `prefers-reduced-motion`.

