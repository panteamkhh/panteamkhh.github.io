import { featured, dashboards, projects, toolbox, stack, queries } from "./projects.js";

/* ---------------- helpers ---------------- */

const PALETTE = ["#34d399", "#a78bfa", "#f472b6", "#fdba74", "#38bdf8", "#fbbf24"];

function rng(seedStr) {
  let h = 2166136261;
  const s = String(seedStr);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const svgOpen = `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`;
const svgGrid = `<g stroke="rgba(255,255,255,.055)" stroke-width="1">
  <line x1="14" y1="44" x2="306" y2="44"/><line x1="14" y1="84" x2="306" y2="84"/>
  <line x1="14" y1="124" x2="306" y2="124"/><line x1="14" y1="164" x2="306" y2="164"/>
</g>`;

function artBars(r, accent) {
  const n = 11, pad = 14, gap = 7;
  const w = (320 - pad * 2 - gap * (n - 1)) / n;
  let out = "";
  for (let i = 0; i < n; i++) {
    const h = 22 + r() * 118;
    const y = 164 - h;
    const hi = i === 4 || i === 8;
    out += `<rect x="${(pad + i * (w + gap)).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="2.5" fill="${hi ? accent : "rgba(255,255,255,.14)"}"/>`;
  }
  return out;
}

function artLine(r, accent, id) {
  let p1 = [], p2 = [];
  for (let i = 0; i <= 12; i++) {
    const x = 14 + (i * 292) / 12;
    p1.push(`${x.toFixed(1)},${(150 - r() * 96 - i * 2).toFixed(1)}`);
    p2.push(`${x.toFixed(1)},${(158 - r() * 60 - i * 1.4).toFixed(1)}`);
  }
  const area = `M${p1.join(" L")} L306,164 L14,164 Z`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${accent}" stop-opacity=".28"/>
    <stop offset="100%" stop-color="${accent}" stop-opacity="0"/></linearGradient></defs>
    <path d="${area}" fill="url(#${id})"/>
    <polyline points="${p1.join(" ")}" fill="none" stroke="${accent}" stroke-width="2.2" stroke-linecap="round"/>
    <polyline points="${p2.join(" ")}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.6" stroke-dasharray="4 5"/>`;
}

function artDonut(r, accent) {
  const cx = 96, cy = 88, R = 46, SW = 14;
  const c = 2 * Math.PI * R;
  const seg = [0.46, 0.28, 0.16, 0.10];
  const cols = [accent, "rgba(255,255,255,.30)", "rgba(255,255,255,.16)", "rgba(255,255,255,.08)"];
  let off = 0, arcs = "";
  seg.forEach((s, i) => {
    arcs += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${cols[i]}" stroke-width="${SW}"
      stroke-dasharray="${(c * s - 7).toFixed(1)} ${(c * (1 - s) + 7).toFixed(1)}"
      stroke-dashoffset="${(-c * off).toFixed(1)}" stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>`;
    off += s;
  });
  let legend = "";
  for (let k = 0; k < 4; k++) {
    const y = 52 + k * 24;
    legend += `<rect x="176" y="${y}" width="8" height="8" rx="2" fill="${cols[k]}"/>
      <rect x="192" y="${y + 1}" width="${54 - k * 8}" height="6" rx="3" fill="rgba(255,255,255,.16)"/>
      <rect x="252" y="${y + 1}" width="${20 + k * 6}" height="6" rx="3" fill="rgba(255,255,255,.09)"/>`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${R - SW / 2 - 3}" fill="none" stroke="rgba(255,255,255,.06)"/>${arcs}${legend}`;
}

function artHeat(r, accent) {
  const cols = 9, rows = 4, cw = 28, ch = 22, gx = 8, gy = 9;
  const x0 = (320 - (cols * cw + (cols - 1) * gx)) / 2;
  const y0 = (180 - (rows * ch + (rows - 1) * gy)) / 2;
  let out = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = r();
      const hi = v > 0.72;
      out += `<rect x="${(x0 + x * (cw + gx)).toFixed(1)}" y="${(y0 + y * (ch + gy)).toFixed(1)}"
        width="${cw}" height="${ch}" rx="3"
        fill="${hi ? accent : "#ffffff"}" opacity="${hi ? 0.85 : (0.05 + v * 0.16).toFixed(2)}"/>`;
    }
  }
  return out;
}

function artScatter(r, accent) {
  const centers = [
    [88, 70, accent],
    [196, 108, "rgba(167,139,250,.9)"],
    [248, 58, "rgba(244,114,182,.9)"],
  ];
  let out = "";
  centers.forEach(([cx, cy, col], ci) => {
    for (let i = 0; i < 16; i++) {
      const a = r() * Math.PI * 2, d = r() * (ci === 0 ? 46 : 30);
      out += `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d * 0.7).toFixed(1)}"
        r="${(1.6 + r() * 1.8).toFixed(1)}" fill="${col}" opacity="${(0.35 + r() * 0.55).toFixed(2)}"/>`;
    }
  });
  return out;
}

function artKpi(r, accent) {
  let tiles = "";
  for (let i = 0; i < 3; i++) {
    const x = 16 + i * 98;
    tiles += `<rect x="${x}" y="18" width="90" height="52" rx="6" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.07)"/>
      <rect x="${x + 10}" y="28" width="30" height="5" rx="2.5" fill="rgba(255,255,255,.18)"/>
      <rect x="${x + 10}" y="42" width="${34 + r() * 24}" height="9" rx="3" fill="${i === 1 ? accent : "rgba(255,255,255,.42)"}"/>
      <rect x="${x + 10}" y="57" width="${18 + r() * 16}" height="4" rx="2" fill="rgba(255,255,255,.10)"/>`;
  }
  let spark = [];
  for (let i = 0; i <= 14; i++) spark.push(`${14 + i * 20.8},${(158 - r() * 46).toFixed(1)}`);
  return `${tiles}<polyline points="${spark.join(" ")}" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
}

function artMatrix(r, accent) {
  const n = 5, cell = 26, gap = 6;
  const x0 = (320 - (n * cell + (n - 1) * gap)) / 2;
  const y0 = (180 - (n * cell + (n - 1) * gap)) / 2;
  let out = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const strong = x === y;
      const v = strong ? 0.55 + r() * 0.4 : r() * 0.4;
      out += `<rect x="${(x0 + x * (cell + gap)).toFixed(1)}" y="${(y0 + y * (cell + gap)).toFixed(1)}"
        width="${cell}" height="${cell}" rx="3"
        fill="${strong ? accent : "#ffffff"}" opacity="${(strong ? v * 0.9 : v * 0.55).toFixed(2)}"/>`;
    }
  }
  return out;
}

function artSVG(type, seed) {
  const r = rng(seed);
  const accent = PALETTE[Math.floor(r() * PALETTE.length)];
  const id = `g${type}${seed.replace(/[^a-z0-9]/gi, "").slice(0, 14)}`;
  let inner = "";
  switch (type) {
    case "line": inner = artLine(r, accent, id); break;
    case "donut": inner = artDonut(r, accent); break;
    case "heat": inner = artHeat(r, accent); break;
    case "scatter": inner = artScatter(r, accent); break;
    case "kpi": inner = artKpi(r, accent); break;
    case "matrix": inner = artMatrix(r, accent); break;
    default: inner = artBars(r, accent);
  }
  return svgOpen + svgGrid + inner + `</svg>`;
}

const shotBtn = (src, cap, cls) =>
  `<button type="button" class="${cls}" data-full="${src}" data-cap="${cap}" aria-label="Enlarge: ${cap}">
    <img src="${src}" alt="${cap}" loading="lazy" decoding="async" />
  </button>`;

/* ---------------- render: featured case studies ---------------- */

const casesEl = document.getElementById("cases");
if (casesEl) {
  casesEl.innerHTML = featured
    .map(
      (p) => `
    <article class="case reveal">
      <div class="case-body">
        <div class="case-top">
          <span class="case-num">${p.num}</span>
          <div class="chips">${p.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
        </div>
        <h3>${p.title}</h3>
        <p class="case-desc">${p.desc}</p>
        <ul class="impact">${p.impact.map((i) => `<li>${i}</li>`).join("")}</ul>
        <div class="case-metrics">
          ${p.metrics.map((m) => `<div><b>${m.v}</b><span>${m.k}</span></div>`).join("")}
        </div>
        <div class="case-actions">
          <a class="link-arrow" href="${p.url}" target="_blank" rel="noopener">Repository ↗</a>
          <span class="case-repo mono">${p.repo}</span>
        </div>
      </div>
      <div class="case-visual">
        <div class="viz">
          <div class="viz-head">
            <span class="viz-dot"></span>
            <span class="viz-title mono">${p.repo}</span>
            <span class="viz-badge">figure</span>
          </div>
          <div class="viz-art">${shotBtn(p.img, p.title, "viz-shot")}</div>
          ${
            p.thumbs && p.thumbs.length
              ? `<div class="viz-thumbs">${p.thumbs
                  .map((t) => shotBtn(t.src, t.cap, "viz-thumb"))
                  .join("")}</div>`
              : ""
          }
        </div>
        <details class="code-peek">
          <summary><span class="cp-file mono">${p.code.file}</span> <span class="cp-lang">${p.code.lang}</span><span class="cp-hint">view code</span></summary>
          <pre class="cp-body"><code>${p.code.html}</code></pre>
        </details>
      </div>
    </article>`
    )
    .join("");
}

/* ---------------- render: dashboards ---------------- */

const dashEl = document.getElementById("dashboards-grid");
if (dashEl) {
  const dashCard = (d) => {
    if (d.placeholder) {
      return `
    <article class="dash-card is-placeholder reveal">
      <div class="dash-slot" aria-label="${d.title} — dashboard slot in progress">
        <span class="tool-badge">${d.tool}</span>
        <div class="dash-slot-inner">
          <span class="slot-ring">+</span>
          <span class="slot-title">Dashboard in progress</span>
          <span class="slot-note">slot reserved</span>
        </div>
      </div>
      <div class="dash-body">
        <span class="dash-title is-static">${d.title}</span>
        <p>${d.desc}</p>
        <div class="tags">${d.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="dash-foot"><b>${d.metric.v}</b><em>${d.metric.k}</em></div>
      </div>
    </article>`;
    }
    return `
    <article class="dash-card reveal">
      ${shotBtn(d.img, d.title, "dash-media")}
      <span class="tool-badge">${d.tool}</span>
      <div class="dash-body">
        <a class="dash-title" href="${d.url}" target="_blank" rel="noopener">${d.title} <span>↗</span></a>
        <p>${d.desc}</p>
        <div class="tags">${d.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="dash-foot"><b>${d.metric.v}</b><em>${d.metric.k}</em></div>
      </div>
    </article>`;
  };
  dashEl.innerHTML = dashboards.map(dashCard).join("");
}

/* ---------------- render: project cards ---------------- */

const cardsEl = document.getElementById("cards");
const filtersEl = document.getElementById("filters");

function cardHTML(p) {
  const visual = p.img
    ? `<div class="card-art plate"><img src="${p.img}" alt="${p.title}" loading="lazy" decoding="async" /></div>`
    : `<div class="card-art">${artSVG(p.art, p.name)}</div>`;
  return `
    <article class="card reveal" data-cat="${p.cat}">
      <a class="card-link" href="${p.url}" target="_blank" rel="noopener" aria-label="${p.title}"></a>
      ${visual}
      <div class="card-body">
        <div class="card-head">
          <span class="cat">${p.cat}</span>
          ${p.stars ? `<span class="stars mono">★ ${p.stars}</span>` : ""}
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="card-foot">
          <span class="metric"><b>${p.metric.v}</b> <em>${p.metric.k}</em></span>
          <span class="repo-name mono">${p.name}</span>
        </div>
      </div>
    </article>`;
}

if (cardsEl) cardsEl.innerHTML = projects.map(cardHTML).join("");

if (filtersEl) {
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.cat)))];
  filtersEl.innerHTML = cats
    .map(
      (c, i) =>
        `<button class="filter${i === 0 ? " is-active" : ""}" data-filter="${c}" type="button">${c}<span>${
          c === "All" ? projects.length : projects.filter((p) => p.cat === c).length
        }</span></button>`
    )
    .join("");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filtersEl.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    cardsEl.querySelectorAll(".card").forEach((card) => {
      card.classList.toggle("is-hidden", !(f === "All" || card.dataset.cat === f));
    });
  });
}

/* ---------------- render: toolbox + stack ---------------- */

const toolboxEl = document.getElementById("toolbox");
if (toolboxEl) {
  toolboxEl.innerHTML = toolbox
    .map(
      (g) => `<div class="tb-group"><h4>${g.title}<span class="tb-count">${g.items.length}</span></h4><div class="tags">${g.items
        .map((i) => `<span class="tag">${i}</span>`)
        .join("")}</div></div>`
    )
    .join("");
}

const stackEl = document.getElementById("stack-list");
if (stackEl) stackEl.innerHTML = stack.map((s) => `<li>${s}</li>`).join("");

/* ---------------- render: query workspace ---------------- */

const SQL_KW = /\b(WITH|SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP|BY|ORDER|HAVING|UNION|ALL|AS|CASE|WHEN|THEN|ELSE|END|OVER|PARTITION|AND|OR|NOT|IN|IS|NULL|DESC|ASC|DISTINCT|TOP|USE|GO|CAST|DECIMAL|ROUND|SUM|COUNT|AVG|MIN|MAX|LAG|LEAD|RANK|NULLIF)\b/gi;

function escHTML(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sqlToHTML(code) {
  return code
    .split("\n")
    .map((line, i) => {
      const ci = line.indexOf("--");
      const codePart = ci >= 0 ? line.slice(0, ci) : line;
      const comment = ci >= 0 ? line.slice(ci) : "";
      let body = escHTML(codePart)
        .replace(SQL_KW, '<span class="kw">$1</span>')
        .replace(/('[^']*')/g, '<span class="st">$1</span>')
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="nu">$1</span>');
      if (comment) body += '<span class="cm">' + escHTML(comment) + "</span>";
      const n = String(i + 1).padStart(2, "0");
      return `<span class="ql"><span class="ln">${n}</span><span class="lc">${body || "&nbsp;"}</span></span>`;
    })
    .join("");
}

const queryEl = document.getElementById("query-grid");
if (queryEl) {
  queryEl.innerHTML = queries
    .map((q) =>
      q.kind === "image"
        ? `<figure class="q-card">
            <button type="button" class="q-media" data-full="${q.img}" data-cap="${q.cap}" aria-label="Enlarge: ${q.cap}">
              <img src="${q.img}" alt="${q.cap}" loading="lazy" decoding="async" />
            </button>
            <figcaption><span class="q-tag">${q.tag}</span><span class="q-cap">${q.cap}</span></figcaption>
          </figure>`
        : `<figure class="q-card q-sql">
            <div class="q-bar"><span class="dots"><i></i><i></i><i></i></span><span class="q-file">${q.file}</span><span class="q-tag">${q.tag}</span></div>
            <pre class="q-code">${sqlToHTML(q.code)}</pre>
            <figcaption><span class="q-cap">${q.cap}</span></figcaption>
          </figure>`
    )
    .join("");
}

/* ---------------- lightbox ---------------- */

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCap = document.getElementById("lightbox-cap");
const lbClose = document.getElementById("lb-close");

function openLightbox(src, cap) {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = cap || "";
  if (lbCap) lbCap.textContent = cap || "";
  lightbox.hidden = false;
  document.body.classList.add("lb-open");
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove("lb-open");
  if (lbImg) lbImg.src = "";
}

document.addEventListener("click", (e) => {
  const shot = e.target.closest("[data-full]");
  if (shot) {
    e.preventDefault();
    openLightbox(shot.dataset.full, shot.dataset.cap);
    return;
  }
  if (lightbox && !lightbox.hidden && (e.target === lightbox || e.target === lbClose)) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});

/* ---------------- per-section background theme ---------------- */

const GLOWS = {
  "mint-lav": { a: "52,211,153", b: "167,139,250" },
  "lav-mint": { a: "167,139,250", b: "52,211,153" },
  "sky-mint": { a: "56,189,248", b: "52,211,153" },
  "pink-lav": { a: "244,114,182", b: "167,139,250" },
  "mint-sky": { a: "52,211,153", b: "56,189,248" },
  "butter-peach": { a: "251,191,36", b: "253,186,116" },
  "pink-mint": { a: "244,114,182", b: "52,211,153" },
};

const glowLayers = Array.from(document.querySelectorAll(".glow"));
let glowIdx = 0;
let currentGlow = "";

function glowCSS(kind) {
  const g = GLOWS[kind] || GLOWS["mint-lav"];
  return (
    `radial-gradient(720px 640px at 12% 2%, rgba(${g.a},.22), transparent 62%),` +
    `radial-gradient(800px 660px at 88% 8%, rgba(${g.b},.20), transparent 64%)`
  );
}

function setGlow(kind) {
  if (!glowLayers.length || kind === currentGlow) return;
  currentGlow = kind;
  const next = glowLayers[glowIdx ^ 1];
  const prev = glowLayers[glowIdx];
  next.style.backgroundImage = glowCSS(kind);
  next.classList.add("is-on");
  prev.classList.remove("is-on");
  glowIdx ^= 1;
  const g = GLOWS[kind] || GLOWS["mint-lav"];
  window.dispatchEvent(
    new CustomEvent("bg-theme", { detail: { a: g.a.split(","), b: g.b.split(",") } })
  );
}

if (glowLayers.length) {
  glowLayers[0].style.backgroundImage = glowCSS("mint-lav");
  currentGlow = "mint-lav";
}

const glowSections = document.querySelectorAll("[data-glow]");
if ("IntersectionObserver" in window && glowSections.length) {
  const glowIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setGlow(entry.target.dataset.glow);
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  glowSections.forEach((s) => glowIO.observe(s));
}

/* ---------------- cursor spotlight ---------------- */

const cursorGlow = document.getElementById("cursor-glow");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cursorGlow && finePointer && !reduceMotion) {
  const state = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: 0, ty: 0, on: false };
  state.tx = state.x;
  state.ty = state.y;

  window.addEventListener(
    "pointermove",
    (e) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
      if (!state.on) {
        state.on = true;
        cursorGlow.classList.add("is-on");
      }
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => cursorGlow.classList.remove("is-on"));

  (function loop() {
    state.x += (state.tx - state.x) * 0.12;
    state.y += (state.ty - state.y) * 0.12;
    cursorGlow.style.transform = `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------------- header, nav, year ---------------- */

const header = document.getElementById("site-header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------------- reveal ---------------- */

const revealEls = document.querySelectorAll(".reveal");
const forceVisible = new URLSearchParams(location.search).has("noreveal");
if (forceVisible) revealEls.forEach((el) => el.classList.add("is-visible"));
if (reduceMotion || forceVisible || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => el.classList.add("is-visible"), i * 60);
        io.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  revealEls.forEach((el) => io.observe(el));

  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 120 && r.bottom > -120) el.classList.add("is-visible");
    });
  }, 1200);
}
