// Subtle pastel particle field behind the page.
// Two flat point clouds at different depths, gentle drift, mouse + scroll parallax.
// Degrades to an empty canvas if WebGL or the CDN module is unavailable.

import * as THREE from "three";

const canvas = document.getElementById("bg-canvas");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PASTELS = [0xa7f3d0, 0xc4b5fd, 0xfbcfe8, 0xa8d5f2, 0xfbd5b5, 0xfae8a0];

let renderer, scene, camera, group;
let frames = 0;
let paused = false;
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
let scrollY = 0;
const tintTargets = [];
let terrain, terrainBase;
const terrainTarget = new THREE.Color(0x34d399);

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

    // mix two pastels so the field reads as a soft gradient, not confetti
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
  scene.fog = new THREE.FogExp2(0x070910, 0.018);

  camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 16);

  group = new THREE.Group();
  scene.add(group);

  group.add(
    cloud({ count: 620, spreadX: 60, spreadY: 40, zNear: -32, zFar: -6, size: 0.11, opacity: 0.55, colorBias: 0 })
  );
  group.add(
    cloud({ count: 220, spreadX: 44, spreadY: 30, zNear: -8, zFar: 6, size: 0.2, opacity: 0.3, colorBias: 2 })
  );
  group.add(
    cloud({ count: 90, spreadX: 26, spreadY: 18, zNear: 2, zFar: 8, size: 0.34, opacity: 0.16, colorBias: 4 })
  );

  group.children.forEach(() => tintTargets.push(new THREE.Color(0xffffff)));

  // undulating wireframe "data grid" below the particle field
  const gridGeo = new THREE.PlaneGeometry(130, 96, 46, 34);
  gridGeo.rotateX(-Math.PI / 2);
  const gridMat = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    wireframe: true,
    transparent: true,
    opacity: 0.085,
    depthWrite: false,
  });
  terrain = new THREE.Mesh(gridGeo, gridMat);
  terrain.position.set(0, -9.5, -14);
  terrainBase = Float32Array.from(gridGeo.attributes.position.array);
  scene.add(terrain);
  window.addEventListener("bg-theme", (e) => {
    const { a, b } = e.detail || {};
    if (!a || !b) return;
    const ca = new THREE.Color(); ca.setRGB(+a[0] / 255, +a[1] / 255, +a[2] / 255);
    const cb = new THREE.Color(); cb.setRGB(+b[0] / 255, +b[1] / 255, +b[2] / 255);
    const n = group.children.length;
    group.children.forEach((child, i) => {
      const t = n > 1 ? i / (n - 1) : 0;
      tintTargets[i].copy(ca).lerp(cb, t).multiplyScalar(0.85);
    });
    terrainTarget.copy(ca).multiplyScalar(0.95);
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

  camera.position.x = pointer.x * 1.1;
  camera.position.y = -pointer.y * 0.8 - scrollY * 0.0009;
  camera.lookAt(0, -scrollY * 0.0006, 0);

  group.rotation.y = t * 0.012 + pointer.x * 0.05;
  group.rotation.x = Math.sin(t * 0.16) * 0.02 - pointer.y * 0.03;

  group.children.forEach((child, i) => {
    if (tintTargets[i] && child.material) child.material.color.lerp(tintTargets[i], 0.03);
  });

  if (terrain) {
    const pos = terrain.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = terrainBase[i * 3];
      const z = terrainBase[i * 3 + 2];
      pos.array[i * 3 + 1] =
        Math.sin(x * 0.11 + t * 0.32) * Math.cos(z * 0.14 + t * 0.2) * 0.9 +
        Math.sin((x + z) * 0.05 - t * 0.16) * 0.55;
    }
    pos.needsUpdate = true;
    terrain.material.color.lerp(terrainTarget, 0.02);
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
