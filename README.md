# panteamkhh.github.io

My personal portfolio site — a cartoon-styled single page with a Three.js hero
scene and a grid of my data / ML / AI projects.

Live at **https://panteamkhh.github.io**

## Tech

- **Three.js** (`r160`, loaded from a CDN via an import map) — a cel-shaded
  "data planet" with inverted-hull outlines, orbiting low-poly shapes and
  pointer parallax.
- **Vanilla HTML/CSS/JS** — no build step, deployed straight from the `main`
  branch with GitHub Pages.
- **Google Fonts** — Fredoka + Nunito for the playful look.

## Structure

```
.
├── index.html          # markup
├── css/style.css       # cartoon theme (chunky borders, hard shadows, bright palette)
├── js/
│   ├── three-scene.js  # Three.js hero scene
│   ├── projects.js     # project + skills data
│   └── main.js         # renders cards, marquee, scroll reveal, nav
├── assets/favicon.svg
└── .nojekyll           # tell GitHub Pages to skip Jekyll
```

## Editing content

Project cards, skill groups and the marquee are data-driven — edit
`js/projects.js` and the page updates. Each project is:

```js
{
  name: "repo-name",
  url: "https://github.com/panteamkhh/repo-name",
  emoji: "🛡️",
  color: "#2ec4b6",
  description: "One or two sentences.",
  tags: ["Python", "pandas"],
}
```

## Local preview

The site is fully static, but it uses ES modules and an import map, so open it
through a tiny local server rather than `file://`:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Accessibility & performance

- The 3D scene is decorative (`aria-hidden`) and skipped when WebGL is missing.
- Animations respect `prefers-reduced-motion`.
- The canvas is capped at 2× device pixel ratio and pauses are left to the
  browser when the tab is hidden.
