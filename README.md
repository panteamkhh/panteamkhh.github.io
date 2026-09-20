# panteamkhh.github.io

My personal portfolio & resume site — a cartoon-styled single page with a
Three.js hero, a "real photo → cartoon" reveal and my full resume.

Live at **https://panteamkhh.github.io**

## Sections

The page is a scannable resume with a sticky **toolbar**:

`Home · About · Experience · Projects · Education · Skills · Extras`

- **Hero** — intro plus an interactive before/after slider that morphs a
  realistic skyline into a cartoon version (drag the handle).
- **About** — short summary and "at a glance" facts.
- **Experience** — timeline of roles (Adrin Darou Iranian, MAPNA/TUGA).
- **Projects** — data-driven cards for my data / ML / AI repositories.
- **Education** — MBA, M.Sc. AI & Robotics, B.Sc. Industrial Engineering.
- **Skills** — grouped skill chips.
- **Extras** — certifications, publication, teaching and languages.
- **Contact** — email, LinkedIn and GitHub.
- A **CV ↓** button in the toolbar opens the browser print dialog with a
  print stylesheet, so the page can be saved as a clean PDF.

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
├── index.html          # markup: toolbar + resume sections
├── css/style.css       # cartoon theme + print styles
├── js/
│   ├── three-scene.js  # Three.js hero scene
│   ├── projects.js     # project + skills + marquee data
│   └── main.js         # cards, morph slider, scrollspy, print, reveal
├── assets/
│   ├── favicon.svg
│   ├── city-photo.svg      # the "realistic" side of the morph
│   └── city-cartoon.svg    # the "cartoon" side of the morph
└── .nojekyll           # tell GitHub Pages to skip Jekyll
```

## Editing content

- **Resume text** (experience, education, certifications, publication,
  teaching, languages) lives directly in `index.html` so it is easy to edit and
  indexable by search engines.
- **Project cards, skill groups and the marquee** are data-driven — edit
  `js/projects.js`:

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

### Swapping the morph images

The before/after slider uses two SVGs of the same scene
(`assets/city-photo.svg` and `assets/city-cartoon.svg`). To use real photos,
replace them with two images of the **same aspect ratio** (8:5) and update the
two `<img class="morph-img">` sources in `index.html`.

## Local preview

Fully static, but it uses ES modules and an import map, so serve it over HTTP
rather than `file://`:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Accessibility & performance

- The 3D scene is decorative (`aria-hidden`) and skipped when WebGL is missing.
- Animations respect `prefers-reduced-motion`.
- The canvas is capped at 2× device pixel ratio.
- The morph slider is a real `<input type="range">`, so it works with a keyboard.
