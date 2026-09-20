// Three.js background — floating 3D puzzle pieces on a light canvas.
// Each piece is a toon-shaded tile with a little tab, drifting gently.

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
  const INK = 0x1b1b2f;
  const PASTEL = [0xff8fb1, 0xffd23f, 0x2ec4b6, 0x7c5cff, 0xff7a3d, 0xa9d9ff, 0xcdc0ff, 0x4cc38a];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 12);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const ramp = new Uint8Array([140, 200, 255]);
  const gradientMap = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
  gradientMap.needsUpdate = true;

  function toon(color) {
    return new THREE.MeshToonMaterial({ color, gradientMap });
  }

  function makePiece(color) {
    const group = new THREE.Group();

    const base = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.24), toon(color));
    group.add(base);

    const tab = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.24, 18), toon(color));
    tab.rotation.x = Math.PI / 2;
    tab.position.set(0.5, 0, 0);
    group.add(tab);

    const tabBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.24, 18), toon(color));
    tabBottom.rotation.x = Math.PI / 2;
    tabBottom.position.set(-0.5, 0, 0);
    group.add(tabBottom);

    return group;
  }

  // --- lights -----------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8caff, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(5, 7, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd9e8, 0.6);
  fill.position.set(-6, -4, 4);
  scene.add(fill);

  // --- floating pieces --------------------------------------------------
  const world = new THREE.Group();
  scene.add(world);

  const pieces = [];
  const COUNT = 14;
  for (let i = 0; i < COUNT; i += 1) {
    const piece = makePiece(PASTEL[i % PASTEL.length]);
    const scale = 0.7 + Math.random() * 0.7;
    piece.scale.setScalar(scale);
    piece.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 13, (Math.random() - 0.5) * 8 - 3);
    piece.rotation.set((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.6);
    piece.userData = {
      base: piece.position.clone(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.2
      ),
    };
    world.add(piece);
    pieces.push(piece);
  }

  // --- soft pastel dots -------------------------------------------------
  const DOT_COUNT = 160;
  const positions = new Float32Array(DOT_COUNT * 3);
  const colors = new Float32Array(DOT_COUNT * 3);
  const dotPalette = PASTEL.map((hex) => new THREE.Color(hex));
  for (let i = 0; i < DOT_COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    const color = dotPalette[Math.floor(Math.random() * dotPalette.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const dots = new THREE.Points(
    dotGeometry,
    new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false })
  );
  scene.add(dots);

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

    pieces.forEach((piece) => {
      const data = piece.userData;
      piece.position.y = data.base.y + Math.sin(t * data.speed + data.phase) * 0.5;
      piece.position.x = data.base.x + Math.cos(t * data.speed * 0.7 + data.phase) * 0.3;
      piece.rotation.x += data.spin.x * 0.006;
      piece.rotation.y += data.spin.y * 0.008;
      piece.rotation.z += data.spin.z * 0.005;
    });

    dots.rotation.y = t * 0.015;

    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.05;
    camera.position.y += (-pointer.y * 0.7 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!prefersReduced) requestAnimationFrame(frame);
  }

  resize();
  frame();
}
