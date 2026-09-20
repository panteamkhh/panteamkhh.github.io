# panteamkhh.github.io

My personal portfolio & resume site — the whole page is a **jigsaw puzzle**.
Click a piece and that part of my resume snaps into place, with floating 3D
puzzle pieces in the background.

Live at **https://panteamkhh.github.io**

## How it works

The page is an interactive **puzzle board** (generated as an SVG jigsaw, so the
pieces really interlock):

- **Home** — intro plus a portrait card (with a graceful fallback if the image
  is missing).
- **Solve the puzzle** — six interlocking pieces, each with a cartoon character.
  Clicking a piece opens a panel with that section:
  - 🙂 **About me** — the professional summary
  - 🦉 **Education** — MBA, M.Sc. AI & Robotics, B.Sc. Industrial Engineering
  - 💼 **Experience** — Adrin Darou Iranian, MAPNA/TUGA
  - 🤖 **Projects** — data / ML / AI repositories
  - 🧰 **Skills** — grouped skill chips
  - ⭐ **Extras** — certifications, publication, teaching, languages
- Each solved piece gets a ✓ and a **discovery counter** (`n / 6`), so it feels
  like a game. Progress is remembered in `localStorage`.
- A **CV ↓** button opens the browser print dialog with a print stylesheet, so
  the page can be saved as a clean PDF.

## Tech

- **Three.js** (`r160`, CDN via import map) — floating 3D puzzle pieces with
  toon shading.
- **Vanilla HTML/CSS/JS** — no build step, deployed straight from `main` with
  GitHub Pages. The jigsaw is generated as SVG; characters are inline SVG.
- **Google Fonts** — Fredoka + Nunito.

## Structure

```
.
├── index.html          # markup: hero, puzzle board, modal + section templates
├── css/style.css       # cartoon theme + print styles
├── js/
│   ├── three-scene.js  # Three.js floating puzzle pieces
│   ├── projects.js     # project + skills data
│   └── main.js         # jigsaw generation, discovery, modal, print
├── assets/
│   ├── favicon.svg
│   └── portrait.jpg    # ← your portrait
└── .nojekyll           # tell GitHub Pages to skip Jekyll
```

## Editing content

- **Resume text** lives in `<template id="tpl-...">` blocks in `index.html`
  (about, education, experience, extras), so it is easy to edit and indexable
  by search engines.
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

- **Puzzle pieces and characters** are defined by the `SECTIONS` array and
  `CHARACTERS` map at the top of `js/main.js`. Add a section by adding an entry
  (and a matching `<template id="tpl-...">`).

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
- Puzzle pieces are real `<button>`s; the modal closes with `Esc` and returns
  focus to the piece you clicked.
- Animations respect `prefers-reduced-motion`.


