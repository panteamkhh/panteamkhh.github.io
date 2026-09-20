# panteamkhh.github.io

My personal portfolio & resume site — a dark, editorial single page with a
Three.js particle background and my full resume.

Live at **https://panteamkhh.github.io**

## Sections

The page is a scannable resume with a sticky **toolbar**, ordered the way a
resume reads:

`Home · About · Education · Experience · Projects · Skills · Extras`

- **Home** — intro plus a portrait card (with a graceful fallback if the image
  is missing).
- **About** — a card with the professional summary and an "at a glance" panel.
- **Education** — MBA, M.Sc. AI & Robotics, B.Sc. Industrial Engineering.
- **Experience** — timeline of roles (Adrin Darou Iranian, MAPNA/TUGA).
- **Projects** — data-driven cards for my data / ML / AI repositories.
- **Skills** — grouped skill chips.
- **Extras** — certifications, publication, teaching and languages.
- **Contact** — email, LinkedIn and GitHub.
- A **CV ↓** button in the toolbar opens the browser print dialog with a print
  stylesheet, so the page can be saved as a clean PDF.

## Tech

- **Three.js** (`r160`, loaded from a CDN via an import map) — a subtle neon
  particle field with faint wireframe globes and pointer parallax.
- **Vanilla HTML/CSS/JS** — no build step, deployed straight from the `main`
  branch with GitHub Pages.
- **Google Fonts** — Space Grotesk + Inter.

## Structure

```
.
├── index.html          # markup: toolbar + resume sections
├── css/style.css       # dark theme + print styles
├── js/
│   ├── three-scene.js  # Three.js particle background
│   ├── projects.js     # project + skills data
│   └── main.js         # cards, scrollspy, portrait fallback, print, reveal
├── assets/
│   ├── favicon.svg
│   └── portrait.jpg    # ← add your portrait here
└── .nojekyll           # tell GitHub Pages to skip Jekyll
```

## Adding the portrait

Save your photo as **`assets/portrait.jpg`** (portrait orientation, roughly
3:4). If the file is missing the card falls back to a neon gradient with your
initials, so the layout never breaks.

## Editing content

- **Resume text** (education, experience, certifications, publication,
  teaching, languages) lives directly in `index.html` so it is easy to edit and
  indexable by search engines.
- **Project cards and skill groups** are data-driven — edit `js/projects.js`:

```js
{
  name: "repo-name",
  url: "https://github.com/panteamkhh/repo-name",
  emoji: "🛡️",
  color: "#35d0c8",
  description: "One or two sentences.",
  tags: ["Python", "pandas"],
}
```

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
- Animations respect `prefers-reduced-motion`.
- The canvas is capped at 2× device pixel ratio.
