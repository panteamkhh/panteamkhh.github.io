// Three.js hero scene — a cartoon "data planet" with orbiting shapes.
// Cel-shaded (MeshToonMaterial) with inverted-hull outlines for a hand-drawn look.

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
  const PALETTE = [0xff5d8f, 0xffd23f, 0x2ec4b6, 0x7c5cff, 0xff7a3d, 0x4cc38a];

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.4, 8.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  // --- toon shading ramp ------------------------------------------------
  const ramp = new Uint8Array([70, 150, 255]);
  const gradientMap = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
  gradientMap.needsUpdate = true;

  function toon(color) {
    return new THREE.MeshToonMaterial({ color, gradientMap });
  }

  // Inverted-hull outline: a slightly larger back-face copy in ink.
  function withOutline(mesh, scale = 1.06) {
    const outline = new THREE.Mesh(
      mesh.geometry,
      new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide })
    );
    outline.scale.multiplyScalar(scale);
    mesh.add(outline);
    return mesh;
  }

  function cartoon(geometry, color, scale = 1.06) {
    return withOutline(new THREE.Mesh(geometry, toon(color)), scale);
  }

  // --- lights -----------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9ec9ff, 1.0));
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(4, 6, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd23f, 0.7);
  fill.position.set(-6, -3, -4);
  scene.add(fill);

  // --- world ------------------------------------------------------------
  const world = new THREE.Group();
  scene.add(world);

  const planet = cartoon(new THREE.IcosahedronGeometry(1.5, 1), 0x2ec4b6, 1.05);
  world.add(planet);

  // cartoon face on the planet
  const eyeWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pupilMat = new THREE.MeshBasicMaterial({ color: INK });
  [-0.42, 0.42].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), eyeWhite);
    eye.position.set(x, 0.28, 1.42);
    eye.scale.z = 0.55;
    planet.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), pupilMat);
    pupil.position.set(x, 0.28, 1.56);
    planet.add(pupil);
  });
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 24, Math.PI), pupilMat);
  smile.position.set(0, 0.02, 1.5);
  smile.rotation.z = Math.PI;
  planet.add(smile);

  const ring = cartoon(new THREE.TorusGeometry(2.5, 0.12, 12, 64), 0xffd23f, 1.1);
  ring.rotation.x = Math.PI / 2.3;
  world.add(ring);

  const geometries = [
    new THREE.BoxGeometry(0.55, 0.55, 0.55),
    new THREE.ConeGeometry(0.42, 0.85, 6),
    new THREE.TorusKnotGeometry(0.3, 0.13, 64, 8),
    new THREE.DodecahedronGeometry(0.42, 0),
    new THREE.SphereGeometry(0.36, 24, 16),
    new THREE.OctahedronGeometry(0.44, 0),
  ];

  const orbiters = geometries.map((geometry, index) => {
    const mesh = cartoon(geometry, PALETTE[index % PALETTE.length], 1.12);
    mesh.userData = {
      angle: (index / geometries.length) * Math.PI * 2,
      radius: 3.1 + (index % 2) * 0.55,
      y: Math.sin(index * 1.7) * 0.9,
      speed: 0.14 + index * 0.02,
      spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.6),
    };
    world.add(mesh);
    return mesh;
  });

  // scattered background dots
  const dots = new THREE.Group();
  const dotColors = [0xffffff, 0xffd23f, 0xff5d8f, 0x7c5cff];
  for (let i = 0; i < 46; i += 1) {
    const size = 0.05 + Math.random() * 0.13;
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(size, 10, 8),
      new THREE.MeshBasicMaterial({
        color: dotColors[i % dotColors.length],
        transparent: true,
        opacity: 0.85,
      })
    );
    dot.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8 - 3
    );
    dot.userData.phase = Math.random() * Math.PI * 2;
    dots.add(dot);
  }
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

    world.rotation.y = t * 0.16;
    ring.rotation.z = t * 0.25;
    planet.rotation.y = Math.sin(t * 0.5) * 0.45;

    orbiters.forEach((mesh) => {
      const data = mesh.userData;
      const angle = data.angle + t * data.speed;
      mesh.position.set(
        Math.cos(angle) * data.radius,
        data.y + Math.sin(t * 0.8 + data.angle) * 0.35,
        Math.sin(angle) * data.radius
      );
      mesh.rotation.x += data.spin.x * 0.01;
      mesh.rotation.y += data.spin.y * 0.01;
    });

    dots.children.forEach((dot) => {
      dot.position.y += Math.sin(t + dot.userData.phase) * 0.0015;
    });

    // ease toward the pointer for a parallax feel
    world.rotation.x += (pointer.y * 0.25 - world.rotation.x) * 0.05;
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!prefersReduced) requestAnimationFrame(frame);
  }

  resize();
  frame();
}
