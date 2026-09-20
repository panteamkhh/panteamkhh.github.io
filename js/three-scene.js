// Three.js background — a calm neon particle field with faint wireframe globes.
// Kept abstract and subtle so it reads as atmosphere, not decoration.

import * as THREE from "three";

const container = document.getElementById("scene-container");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (error) {
    return false;
  }
}

if (container && supportsWebGL()) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 8.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // --- particle field ---------------------------------------------------
  const COUNT = 1200;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const palette = [
    new THREE.Color(0x35d0c8),
    new THREE.Color(0x8b5cf6),
    new THREE.Color(0xff3d8b),
    new THREE.Color(0xffffff),
  ];

  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // --- faint wireframe globes ------------------------------------------
  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.5, 1),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.14 })
  );
  globe.position.set(2.6, 0.4, -1.5);
  scene.add(globe);

  const globeOuter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.4, 0),
    new THREE.MeshBasicMaterial({ color: 0x35d0c8, wireframe: true, transparent: true, opacity: 0.08 })
  );
  globeOuter.position.set(-3.2, -0.8, -2.5);
  scene.add(globeOuter);

  // --- interaction ------------------------------------------------------
  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener("resize", resize);

  // --- animation --------------------------------------------------------
  const clock = new THREE.Clock();

  function frame() {
    const t = clock.getElapsedTime();

    points.rotation.y = t * 0.025;
    points.rotation.x = Math.sin(t * 0.1) * 0.05;

    globe.rotation.x = t * 0.08;
    globe.rotation.y = t * 0.12;
    globeOuter.rotation.y = -t * 0.06;

    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!prefersReduced) requestAnimationFrame(frame);
  }

  resize();
  frame();
}
