import { projects, skills } from "./projects.js";

/* ============================================================
   The whole page is a jigsaw puzzle. Each piece is a section.
   ============================================================ */

const CHARACTERS = {
  about: `<circle cx="60" cy="54" r="34" fill="#ffd9c0"/><path d="M25 48 q4 -32 35 -32 q31 0 35 32 q-17 -13 -35 -13 q-18 0 -35 13 z" fill="#5a4a6a"/><circle cx="47" cy="56" r="6.5" fill="#2f2b45"/><circle cx="73" cy="56" r="6.5" fill="#2f2b45"/><circle cx="49" cy="53.5" r="2.2" fill="#fff"/><circle cx="75" cy="53.5" r="2.2" fill="#fff"/><circle cx="35" cy="65" r="6" fill="#ff9ec2" opacity="0.65"/><circle cx="85" cy="65" r="6" fill="#ff9ec2" opacity="0.65"/><path d="M52 70 q8 7 16 0" fill="none" stroke="#2f2b45" stroke-width="3.6" stroke-linecap="round"/>`,
  education: `<ellipse cx="60" cy="68" rx="35" ry="37" fill="#c9b8ff"/><ellipse cx="60" cy="76" rx="20" ry="24" fill="#e6ddff"/><circle cx="47" cy="62" r="12.5" fill="#fff"/><circle cx="73" cy="62" r="12.5" fill="#fff"/><circle cx="47" cy="63" r="5.8" fill="#2f2b45"/><circle cx="73" cy="63" r="5.8" fill="#2f2b45"/><circle cx="49" cy="60.5" r="1.9" fill="#fff"/><circle cx="75" cy="60.5" r="1.9" fill="#fff"/><path d="M60 70 l-5.5 9 h11 z" fill="#ffd23f" stroke="#2f2b45" stroke-width="3" stroke-linejoin="round"/><path d="M26 34 L60 17 L94 34 Z" fill="#7c5cff" stroke="#2f2b45" stroke-width="4" stroke-linejoin="round"/><rect x="33" y="32" width="54" height="8" rx="4" fill="#2f2b45"/><line x1="89" y1="36" x2="89" y2="53" stroke="#2f2b45" stroke-width="3.5"/><circle cx="89" cy="56" r="4" fill="#ffd23f" stroke="#2f2b45" stroke-width="2.5"/>`,
  experience: `<rect x="20" y="48" width="80" height="54" rx="14" fill="#ffcf9e" stroke="#2f2b45" stroke-width="4"/><path d="M46 48 v-8 a8 8 0 0 1 8 -8 h12 a8 8 0 0 1 8 8 v8" fill="none" stroke="#2f2b45" stroke-width="4"/><rect x="20" y="66" width="80" height="5" fill="#2f2b45" opacity="0.14"/><circle cx="50" cy="80" r="7.5" fill="#fff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="70" cy="80" r="7.5" fill="#fff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="50" cy="81" r="3.2" fill="#2f2b45"/><circle cx="70" cy="81" r="3.2" fill="#2f2b45"/><path d="M53 91 q7 5 14 0" fill="none" stroke="#2f2b45" stroke-width="3.5" stroke-linecap="round"/><circle cx="33" cy="84" r="4.5" fill="#ff9ec2" opacity="0.65"/><circle cx="87" cy="84" r="4.5" fill="#ff9ec2" opacity="0.65"/>`,
  projects: `<rect x="30" y="42" width="60" height="52" rx="16" fill="#a9d9ff" stroke="#2f2b45" stroke-width="4"/><line x1="60" y1="42" x2="60" y2="26" stroke="#2f2b45" stroke-width="4"/><circle cx="60" cy="22" r="6" fill="#ff8fb1" stroke="#2f2b45" stroke-width="3.5"/><rect x="14" y="56" width="12" height="24" rx="6" fill="#a9d9ff" stroke="#2f2b45" stroke-width="3.5"/><rect x="94" y="56" width="12" height="24" rx="6" fill="#a9d9ff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="48" cy="64" r="9" fill="#fff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="72" cy="64" r="9" fill="#fff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="48" cy="64" r="4" fill="#2f2b45"/><circle cx="72" cy="64" r="4" fill="#2f2b45"/><path d="M48 82 q12 8 24 0" fill="none" stroke="#2f2b45" stroke-width="3.5" stroke-linecap="round"/>`,
  skills: `<path d="M46 56 v-10 h28 v10" fill="none" stroke="#2f2b45" stroke-width="4"/><rect x="22" y="56" width="76" height="46" rx="12" fill="#8fe3c0" stroke="#2f2b45" stroke-width="4"/><rect x="22" y="56" width="76" height="13" rx="7" fill="#2ec4b6" stroke="#2f2b45" stroke-width="4"/><circle cx="50" cy="82" r="7" fill="#fff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="70" cy="82" r="7" fill="#fff" stroke="#2f2b45" stroke-width="3.5"/><circle cx="50" cy="83" r="3" fill="#2f2b45"/><circle cx="70" cy="83" r="3" fill="#2f2b45"/>`,
  extras: `<path d="M60 16 l12 26 28 3 -20 19 5 28 -25 -13 -25 13 5 -28 -20 -19 28 -3 z" fill="#ffe08a" stroke="#2f2b45" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="56" r="4.5" fill="#2f2b45"/><circle cx="70" cy="56" r="4.5" fill="#2f2b45"/><path d="M52 66 q8 6 16 0" fill="none" stroke="#2f2b45" stroke-width="3.5" stroke-linecap="round"/>`,
};

const SECTIONS = [
  { key: "about", label: "About me", color: "#ffa8c9" },
  { key: "education", label: "Education", color: "#b9a2ff" },
  { key: "experience", label: "Experience", color: "#ffbf8f" },
  { key: "projects", label: "Projects", color: "#8fc7ff" },
  { key: "skills", label: "Skills", color: "#7fe3bd" },
  { key: "extras", label: "Extras", color: "#ffe07a" },
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
const validKeys = new Set(SECTIONS.map((section) => section.key));
[...found].forEach((key) => {
  if (!validKeys.has(key)) found.delete(key);
});
saveFound(found);

const progressEl = document.getElementById("progress");
const completeBanner = document.getElementById("puzzle-complete");
let celebrated = false;

function celebrate() {
  const emojis = ["🎉", "🎊", "⭐", "🧩", "✨"];
  for (let i = 0; i < 26; i += 1) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.textContent = emojis[i % emojis.length];
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.animationDelay = `${Math.random() * 0.6}s`;
    bit.style.fontSize = `${0.9 + Math.random() * 1.2}rem`;
    document.body.appendChild(bit);
    setTimeout(() => bit.remove(), 3400);
  }
  showToast("🎉 Puzzle complete!");
}

function updateProgress() {
  const solved = SECTIONS.filter((section) => found.has(section.key)).length;
  const complete = solved === SECTIONS.length;

  if (progressEl) {
    progressEl.textContent = complete
      ? `🎉 ${solved} / ${SECTIONS.length} — puzzle complete!`
      : `${solved} / ${SECTIONS.length} discovered`;
    progressEl.classList.toggle("is-complete", complete);
  }

  if (completeBanner) completeBanner.hidden = !complete;

  if (complete && !celebrated) {
    celebrated = true;
    celebrate();
  }
}

let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById("puzzle-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "puzzle-toast";
    toast.className = "puzzle-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function markFound(name) {
  const isNew = !found.has(name);
  found.add(name);
  saveFound(found);
  updateProgress();
  document.querySelectorAll(`.piece-btn[data-target="${name}"]`).forEach((el) => el.classList.add("is-found"));
  document.querySelectorAll(`.puzzle-piece[data-target="${name}"]`).forEach((el) => el.classList.add("is-found"));
  const section = SECTIONS.find((item) => item.key === name);
  if (isNew && section) showToast(`✓ ${section.label} discovered!`);
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
celebrated = SECTIONS.every((section) => found.has(section.key));
updateProgress();

/* ---------- reset / play again ---------- */
const resetButton = document.getElementById("reset-puzzle");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    found.clear();
    saveFound(found);
    celebrated = false;
    document
      .querySelectorAll(".piece-btn.is-found, .puzzle-piece.is-found")
      .forEach((el) => el.classList.remove("is-found"));
    updateProgress();
    showToast("↺ Puzzle reset — have fun!");
  });
}

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

/* ---------- footer year ---------- */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
