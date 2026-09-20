import { projects, skills } from "./projects.js";

/* ============================================================
   The whole page is a jigsaw puzzle. Each piece is a section.
   ============================================================ */

const CHARACTERS = {
  about: `<circle cx="60" cy="64" r="40" fill="#a9d9ff" stroke="#1b1b2f" stroke-width="5"/><path d="M34 44 q10 -22 26 -22 q16 0 26 22" fill="#7c5cff" stroke="#1b1b2f" stroke-width="5" stroke-linejoin="round"/><circle cx="47" cy="62" r="10" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="73" cy="62" r="10" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="47" cy="63" r="4.5" fill="#1b1b2f"/><circle cx="73" cy="63" r="4.5" fill="#1b1b2f"/><path d="M50 82 q10 8 20 0" fill="none" stroke="#1b1b2f" stroke-width="4" stroke-linecap="round"/>`,
  education: `<ellipse cx="60" cy="68" rx="38" ry="40" fill="#cdc0ff" stroke="#1b1b2f" stroke-width="5"/><circle cx="47" cy="60" r="13" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="73" cy="60" r="13" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="47" cy="61" r="6" fill="#1b1b2f"/><circle cx="73" cy="61" r="6" fill="#1b1b2f"/><path d="M60 70 l-6 8 h12 z" fill="#ffd23f" stroke="#1b1b2f" stroke-width="4" stroke-linejoin="round"/><path d="M30 34 L60 18 L90 34 Z" fill="#7c5cff" stroke="#1b1b2f" stroke-width="5" stroke-linejoin="round"/><rect x="34" y="32" width="52" height="9" rx="4" fill="#1b1b2f"/><line x1="86" y1="36" x2="86" y2="52" stroke="#1b1b2f" stroke-width="4"/><circle cx="86" cy="55" r="4.5" fill="#ffd23f" stroke="#1b1b2f" stroke-width="3"/>`,
  experience: `<path d="M46 50 v-9 a9 9 0 0 1 9 -9 h10 a9 9 0 0 1 9 9 v9" fill="none" stroke="#1b1b2f" stroke-width="5"/><rect x="22" y="50" width="76" height="52" rx="14" fill="#ffd6ba" stroke="#1b1b2f" stroke-width="5"/><rect x="22" y="66" width="76" height="6" fill="#1b1b2f" opacity="0.18"/><circle cx="50" cy="80" r="8" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="72" cy="80" r="8" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="50" cy="81" r="3.5" fill="#1b1b2f"/><circle cx="72" cy="81" r="3.5" fill="#1b1b2f"/><path d="M53 92 q7 5 14 0" fill="none" stroke="#1b1b2f" stroke-width="4" stroke-linecap="round"/>`,
  projects: `<rect x="30" y="40" width="60" height="52" rx="16" fill="#a9d9ff" stroke="#1b1b2f" stroke-width="5"/><line x1="60" y1="40" x2="60" y2="24" stroke="#1b1b2f" stroke-width="5"/><circle cx="60" cy="20" r="6" fill="#ff8fb1" stroke="#1b1b2f" stroke-width="4"/><rect x="16" y="54" width="11" height="24" rx="5" fill="#a9d9ff" stroke="#1b1b2f" stroke-width="4"/><rect x="93" y="54" width="11" height="24" rx="5" fill="#a9d9ff" stroke="#1b1b2f" stroke-width="4"/><circle cx="48" cy="62" r="9" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="72" cy="62" r="9" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="48" cy="62" r="4" fill="#1b1b2f"/><circle cx="72" cy="62" r="4" fill="#1b1b2f"/><path d="M48 80 q12 8 24 0" fill="none" stroke="#1b1b2f" stroke-width="4" stroke-linecap="round"/>`,
  skills: `<path d="M46 56 v-10 h28 v10" fill="none" stroke="#1b1b2f" stroke-width="5"/><rect x="24" y="56" width="72" height="44" rx="12" fill="#4cc38a" stroke="#1b1b2f" stroke-width="5"/><rect x="24" y="56" width="72" height="13" rx="7" fill="#2ec4b6" stroke="#1b1b2f" stroke-width="5"/><circle cx="50" cy="82" r="7" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="70" cy="82" r="7" fill="#fff" stroke="#1b1b2f" stroke-width="4"/><circle cx="50" cy="83" r="3" fill="#1b1b2f"/><circle cx="70" cy="83" r="3" fill="#1b1b2f"/>`,
  extras: `<path d="M60 18 l11 24 26 3 -19 18 5 26 -23 -12 -23 12 5 -26 -19 -18 26 -3 z" fill="#ffd23f" stroke="#1b1b2f" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="58" r="4.5" fill="#1b1b2f"/><circle cx="70" cy="58" r="4.5" fill="#1b1b2f"/><path d="M52 68 q8 6 16 0" fill="none" stroke="#1b1b2f" stroke-width="4" stroke-linecap="round"/>`,
};

const SECTIONS = [
  { key: "about", label: "About me", color: "#dbeafe" },
  { key: "education", label: "Education", color: "#e6ddff" },
  { key: "experience", label: "Experience", color: "#ffe0cc" },
  { key: "projects", label: "Projects", color: "#d6f2ff" },
  { key: "skills", label: "Skills", color: "#d8f7e6" },
  { key: "extras", label: "Extras", color: "#fff0c2" },
];

const COLS = 3;
const ROWS = 2;
const CW = 240;
const CH = 220;
const W = COLS * CW;
const H = ROWS * CH;
const SVG_NS = "http://www.w3.org/2000/svg";

/* --- deterministic interlocking edges --- */
function buildEdges() {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const vertical = []; // [r][c] edge between column c-1 and c
  const horizontal = []; // [r][c] edge between row r-1 and r
  for (let r = 0; r < ROWS; r += 1) {
    vertical[r] = [];
    for (let c = 0; c < COLS; c += 1) vertical[r][c] = rand() > 0.5 ? 1 : -1;
  }
  for (let r = 0; r < ROWS; r += 1) {
    horizontal[r] = [];
    for (let c = 0; c < COLS; c += 1) horizontal[r][c] = rand() > 0.5 ? 1 : -1;
  }
  return { vertical, horizontal };
}

const EDGES = buildEdges();

function edgeSegment(ax, ay, bx, by, nx, ny, tab) {
  if (!tab) return ` L ${bx} ${by}`;
  const bump = Math.min(CW, CH) * 0.24;
  const point = (t) => [ax + (bx - ax) * t, ay + (by - ay) * t];
  const [ax2, ay2] = point(0.38);
  const [bx2, by2] = point(0.62);
  const [c1x, c1y] = point(0.45);
  const [c2x, c2y] = point(0.55);
  const o = tab * bump;
  return ` L ${ax2} ${ay2} C ${c1x + nx * o} ${c1y + ny * o} ${c2x + nx * o} ${c2y + ny * o} ${bx2} ${by2} L ${bx} ${by}`;
}

function piecePath(c, r) {
  const x0 = c * CW;
  const y0 = r * CH;
  const x1 = x0 + CW;
  const y1 = y0 + CH;
  const top = r > 0 ? -EDGES.horizontal[r][c] : 0;
  const bottom = r < ROWS - 1 ? EDGES.horizontal[r + 1][c] : 0;
  const left = c > 0 ? -EDGES.vertical[r][c] : 0;
  const right = c < COLS - 1 ? EDGES.vertical[r][c + 1] : 0;

  let d = `M ${x0} ${y0}`;
  d += edgeSegment(x0, y0, x1, y0, 0, -1, top);
  d += edgeSegment(x1, y0, x1, y1, 1, 0, right);
  d += edgeSegment(x1, y1, x0, y1, 0, 1, bottom);
  d += edgeSegment(x0, y1, x0, y0, -1, 0, left);
  return `${d} Z`;
}

/* --- build the board --- */
const puzzle = document.getElementById("puzzle");

function buildPuzzle() {
  if (!puzzle) return;

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("class", "puzzle-svg");
  svg.setAttribute("aria-hidden", "true");

  const icons = document.createElement("div");
  icons.className = "puzzle-icons";

  SECTIONS.forEach((section, index) => {
    const c = index % COLS;
    const r = Math.floor(index / COLS);

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", piecePath(c, r));
    path.setAttribute("class", "puzzle-piece");
    path.setAttribute("fill", section.color);
    path.setAttribute("data-target", section.key);
    path.setAttribute("tabindex", "-1");
    path.addEventListener("click", () => openSection(section.key));
    svg.appendChild(path);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "piece-btn";
    button.dataset.target = section.key;
    button.style.setProperty("--x", `${((c + 0.5) / COLS) * 100}%`);
    button.style.setProperty("--y", `${((r + 0.5) / ROWS) * 100}%`);
    button.innerHTML = `
      <span class="piece-art">
        <svg viewBox="0 0 120 120" aria-hidden="true">${CHARACTERS[section.key]}</svg>
        <span class="piece-check" aria-hidden="true">✓</span>
      </span>
      <span class="piece-label">${section.label}</span>
    `;
    button.addEventListener("click", () => openSection(section.key));
    icons.appendChild(button);
  });

  puzzle.appendChild(svg);
  puzzle.appendChild(icons);
}

/* ---------- shared renderers (inside the modal) ---------- */
function renderProjects(container) {
  if (!container) return;
  container.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
        <div class="project-top">
          <div class="project-emoji" style="background:${project.color}">${project.emoji}</div>
          <h3>${project.name}</h3>
        </div>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <a class="project-link" href="${project.url}" target="_blank" rel="noopener">View on GitHub ↗</a>
      </article>`
    )
    .join("");
}

function renderSkills(container) {
  if (!container) return;
  container.innerHTML = skills
    .map(
      (group) => `
      <div class="skill-card">
        <h3>${group.title}</h3>
        <div class="skill-chips">${group.items.map((i) => `<span class="chip">${i}</span>`).join("")}</div>
      </div>`
    )
    .join("");
}

/* ---------- discovery + modal ---------- */
const FOUND_KEY = "pantea-found-sections";

function loadFound() {
  try {
    return new Set(JSON.parse(localStorage.getItem(FOUND_KEY) || "[]"));
  } catch (error) {
    return new Set();
  }
}

function saveFound(set) {
  try {
    localStorage.setItem(FOUND_KEY, JSON.stringify([...set]));
  } catch (error) {
    /* storage unavailable — discovery just won't persist */
  }
}

const found = loadFound();
const progressEl = document.getElementById("progress");

function updateProgress() {
  if (progressEl) progressEl.textContent = `${found.size} / ${SECTIONS.length} discovered`;
}

function markFound(name) {
  found.add(name);
  saveFound(found);
  updateProgress();
  document.querySelectorAll(`.piece-btn[data-target="${name}"]`).forEach((el) => el.classList.add("is-found"));
  document.querySelectorAll(`.puzzle-piece[data-target="${name}"]`).forEach((el) => el.classList.add("is-found"));
}

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
let lastFocused = null;

function openSection(name) {
  const template = document.getElementById(`tpl-${name}`);
  if (!template || !modal || !modalBody) return;

  lastFocused = document.activeElement;
  modalBody.innerHTML = "";
  modalBody.appendChild(template.content.cloneNode(true));

  if (name === "projects") renderProjects(modalBody.querySelector("#projects-grid"));
  if (name === "skills") renderSkills(modalBody.querySelector("#skills-grid"));

  modal.hidden = false;
  document.body.classList.add("modal-open");
  markFound(name);
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (modalBody) modalBody.innerHTML = "";
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.close !== undefined) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeModal();
});

buildPuzzle();

/* restore discovery state from a previous visit */
found.forEach((name) => {
  document.querySelectorAll(`.piece-btn[data-target="${name}"]`).forEach((el) => el.classList.add("is-found"));
  document.querySelectorAll(`.puzzle-piece[data-target="${name}"]`).forEach((el) => el.classList.add("is-found"));
});
updateProgress();

/* ---------- portrait fallback ---------- */
const portrait = document.getElementById("portrait");
const portraitImg = document.getElementById("portrait-img");

if (portrait && portraitImg) {
  portraitImg.addEventListener("error", () => portrait.classList.add("is-missing"));
}

/* ---------- scroll reveal ---------- */
const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

/* ---------- toolbar ---------- */
const toggle = document.getElementById("toolbar-toggle");
const links = document.getElementById("toolbar-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- print / save as PDF ---------- */
document.getElementById("print-btn")?.addEventListener("click", () => window.print());

/* ---------- footer year ---------- */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
