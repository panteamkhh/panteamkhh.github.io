import { projects, skills } from "./projects.js";

/* ---------- shared renderers (used inside the modal) ---------- */
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

/* ---------- adventure: stations, discovery + modal ---------- */
const STATIONS = ["about", "education", "experience", "projects", "skills", "extras", "contact"];
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
const stationEls = Array.from(document.querySelectorAll(".station"));

function updateProgress() {
  if (progressEl) progressEl.textContent = `${found.size} / ${STATIONS.length} discovered`;
}

function markFound(name) {
  found.add(name);
  saveFound(found);
  updateProgress();
  stationEls
    .filter((el) => el.dataset.target === name)
    .forEach((el) => el.classList.add("is-found"));
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

stationEls.forEach((button) => {
  button.addEventListener("click", () => openSection(button.dataset.target));
});

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.close !== undefined) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeModal();
});

/* restore discovery state from a previous visit */
found.forEach((name) =>
  stationEls.filter((el) => el.dataset.target === name).forEach((el) => el.classList.add("is-found"))
);
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
