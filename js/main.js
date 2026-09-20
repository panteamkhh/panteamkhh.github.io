import { projects, skills } from "./projects.js";

/* ---------- project cards ---------- */
const grid = document.getElementById("projects-grid");

function projectCard(project, index) {
  const el = document.createElement("article");
  el.className = "project-card reveal";
  el.style.transitionDelay = `${Math.min(index * 40, 320)}ms`;
  el.innerHTML = `
    <div class="project-top">
      <div class="project-emoji" style="background:${project.color}1f;border-color:${project.color}66">${project.emoji}</div>
      <h3>${project.name}</h3>
    </div>
    <p>${project.description}</p>
    <div class="project-tags">
      ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <a class="project-link" href="${project.url}" target="_blank" rel="noopener">View on GitHub ↗</a>
  `;
  return el;
}

if (grid) {
  projects.forEach((project, index) => grid.appendChild(projectCard(project, index)));
}

/* ---------- skills ---------- */
const skillsGrid = document.getElementById("skills-grid");

if (skillsGrid) {
  skills.forEach((group, index) => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
    card.innerHTML = `
      <h3>${group.title}</h3>
      <div class="skill-chips">
        ${group.items.map((item) => `<span class="chip">${item}</span>`).join("")}
      </div>
    `;
    skillsGrid.appendChild(card);
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

/* ---------- toolbar: active section (scrollspy) ---------- */
const toolbarLinks = Array.from(document.querySelectorAll(".toolbar-links a[href^='#']"));
const sections = toolbarLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        toolbarLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));
}

/* ---------- toolbar: mobile menu ---------- */
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
