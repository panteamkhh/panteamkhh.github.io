// Three.js background: pastel particle field over two undulating wireframe
// "data floors" at different depths, which gives the scene real parallax.
// Tints per section via the "bg-theme" event. Degrades quietly without WebGL.

import * as THREE from "three";

const canvas = document.getElementById("bg-canvas");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PASTELS = [0x34d399, 0xa78bfa, 0xf472b6, 0x38bdf8, 0xfdba74, 0xfbbf24];

let renderer, scene, camera, group;
let frames = 0;
let paused = false;
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
let scrollY = 0;

const tintTargets = [];
const grids = [];

function glowTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function cloud({ count, spreadX, spreadY, zNear, zFar, size, opacity, colorBias }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spreadX;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
    positions[i * 3 + 2] = zNear + Math.random() * (zFar - zNear);

    const a = PASTELS[colorBias % PASTELS.length];
    const b = PASTELS[(colorBias + 2 + Math.floor(Math.random() * 2)) % PASTELS.length];
    color.setHex(a).lerp(new THREE.Color(b), Math.random() * 0.6);
    color.multiplyScalar(0.6 + Math.random() * 0.4);

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size,
    map: glowTexture(),
    vertexColors: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
}

function makeFloor({ width, depth, segX, segY, y, z, opacity, hex, amp, phase }) {
  const geo = new THREE.PlaneGeometry(width, depth, segX, segY);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    color: hex,
    wireframe: true,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, y, z);
  scene.add(mesh);

  grids.push({
    mesh,
    geo,
    base: Float32Array.from(geo.attributes.position.array),
    color: new THREE.Color(hex),
    amp,
    phase,
  });
}

function init() {
  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070910, 0.012);

  camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 220);
  camera.position.set(0, 0, 17);

  group = new THREE.Group();
  scene.add(group);

  group.add(
    cloud({ count: 620, spreadX: 64, spreadY: 42, zNear: -34, zFar: -6, size: 0.11, opacity: 0.55, colorBias: 0 })
  );
  group.add(
    cloud({ count: 220, spreadX: 46, spreadY: 32, zNear: -8, zFar: 7, size: 0.2, opacity: 0.3, colorBias: 2 })
  );
  group.add(
    cloud({ count: 90, spreadX: 28, spreadY: 20, zNear: 3, zFar: 9, size: 0.34, opacity: 0.16, colorBias: 4 })
  );

  group.children.forEach(() => tintTargets.push(new THREE.Color(0xffffff)));

  // two wireframe floors: a near, bright one and a far, calm one
  makeFloor({ width: 180, depth: 150, segX: 64, segY: 48, y: -8.6, z: -18, opacity: 0.11, hex: 0x34d399, amp: 1.6, phase: 0 });
  makeFloor({ width: 320, depth: 260, segX: 52, segY: 40, y: -17, z: -46, opacity: 0.062, hex: 0xa78bfa, amp: 3.6, phase: 1.9 });

  window.addEventListener("bg-theme", (e) => {
    const { a, b } = e.detail || {};
    if (!a || !b) return;
    const ca = new THREE.Color();
    ca.setRGB(+a[0] / 255, +a[1] / 255, +a[2] / 255);
    const cb = new THREE.Color();
    cb.setRGB(+b[0] / 255, +b[1] / 255, +b[2] / 255);

    const n = group.children.length;
    group.children.forEach((child, i) => {
      const t = n > 1 ? i / (n - 1) : 0;
      tintTargets[i].copy(ca).lerp(cb, t).multiplyScalar(0.85);
    });

    if (grids[0]) grids[0].color.copy(ca).multiplyScalar(0.9);
    if (grids[1]) grids[1].color.copy(cb).multiplyScalar(0.8);
  });

  resize();
  bindEvents();

  if (reduceMotion) {
    renderer.render(scene, camera);
  } else {
    requestAnimationFrame(tick);
  }
}

function resize() {
  if (!renderer) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
  if (reduceMotion) renderer.render(scene, camera);
}

function bindEvents() {
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "scroll",
    () => {
      scrollY = window.scrollY || 0;
    },
    { passive: true }
  );

  if (reduceMotion) return;

  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    paused = document.hidden;
    if (!paused) requestAnimationFrame(tick);
  });
}

function tick() {
  if (paused) return;
  frames += 1;
  const t = frames / 60;

  pointer.x += (pointer.tx - pointer.x) * 0.045;
  pointer.y += (pointer.ty - pointer.y) * 0.045;

  camera.position.x = pointer.x * 1.2;
  camera.position.y = -pointer.y * 0.8 - scrollY * 0.0009 + Math.sin(t * 0.22) * 0.18;
  camera.lookAt(0, -1.5 - scrollY * 0.0006, 0);

  group.rotation.y = t * 0.012 + pointer.x * 0.05;
  group.rotation.x = Math.sin(t * 0.16) * 0.02 - pointer.y * 0.03;

  group.children.forEach((child, i) => {
    if (tintTargets[i] && child.material) child.material.color.lerp(tintTargets[i], 0.03);
  });

  for (let gi = 0; gi < grids.length; gi++) {
    const g = grids[gi];
    const pos = g.geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = g.base[i * 3];
      const z = g.base[i * 3 + 2];
      pos.array[i * 3 + 1] =
        Math.sin(x * 0.09 + t * 0.3 + g.phase) * Math.cos(z * 0.12 + t * 0.18 + g.phase) * g.amp +
        Math.sin((x + z) * 0.045 - t * 0.14) * g.amp * 0.4;
    }
    pos.needsUpdate = true;
    g.mesh.material.color.lerp(g.color, 0.02);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

try {
  init();
} catch (err) {
  if (canvas) canvas.style.display = "none";
  console.warn("Background scene disabled:", err && err.message);
}
