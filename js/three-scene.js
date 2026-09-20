// Three.js background — a friendly little planet with orbiting pastel shapes.
// Cel-shaded (MeshToonMaterial) with soft outlines for a cartoon look.

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
  const PASTEL = [0xff8fb1, 0xffd23f, 0x2ec4b6, 0x7c5cff, 0xff7a3d, 0xa9d9ff];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.4, 9);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // soft toon ramp
  const ramp = new Uint8Array([140, 200, 255]);
  const gradientMap = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
  gradientMap.needsUpdate = true;

  function toon(color) {
    return new THREE.MeshToonMaterial({ color, gradientMap });
  }

  function withOutline(mesh, scale = 1.05) {
    const outline = new THREE.Mesh(
      mesh.geometry,
      new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide })
    );
    outline.scale.multiplyScalar(scale);
    mesh.add(outline);
    return mesh;
  }

  function cartoon(geometry, color, scale = 1.05) {
    return withOutline(new THREE.Mesh(geometry, toon(color)), scale);
  }

  // --- lights -----------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8caff, 1.15));
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(5, 7, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd9e8, 0.6);
  fill.position.set(-6, -4, 3);
  scene.add(fill);

  // --- the little planet ------------------------------------------------
  const world = new THREE.Group();
  world.position.set(3.1, 0.3, -1);
  scene.add(world);

  const planet = cartoon(new THREE.IcosahedronGeometry(1.5, 1), 0x2ec4b6, 1.04);
  world.add(planet);

  const eyeWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pupil = new THREE.MeshBasicMaterial({ color: INK });
  [-0.42, 0.42].forEach((x) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), eyeWhite);
    eye.position.set(x, 0.28, 1.42);
    eye.scale.z = 0.55;
    planet.add(eye);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), pupil);
    dot.position.set(x, 0.28, 1.56);
    planet.add(dot);
  });
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 24, Math.PI), pupil);
  smile.position.set(0, 0.02, 1.5);
  smile.rotation.z = Math.PI;
  planet.add(smile);

  const ring = cartoon(new THREE.TorusGeometry(2.4, 0.11, 12, 60), 0xffd23f, 1.1);
  ring.rotation.x = Math.PI / 2.3;
  world.add(ring);

  const geometries = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.ConeGeometry(0.4, 0.8, 6),
    new THREE.TorusKnotGeometry(0.28, 0.12, 64, 8),
    new THREE.DodecahedronGeometry(0.4, 0),
    new THREE.SphereGeometry(0.34, 24, 16),
    new THREE.OctahedronGeometry(0.42, 0),
  ];

  const orbiters = geometries.map((geometry, index) => {
    const mesh = cartoon(geometry, PASTEL[index % PASTEL.length], 1.12);
    mesh.userData = {
      angle: (index / geometries.length) * Math.PI * 2,
      radius: 2.9 + (index % 2) * 0.5,
      y: Math.sin(index * 1.7) * 0.8,
      speed: 0.14 + index * 0.02,
      spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.5),
    };
    world.add(mesh);
    return mesh;
  });

  // --- floating pastel dots --------------------------------------------
  const DOT_COUNT = 220;
  const positions = new Float32Array(DOT_COUNT * 3);
  const colors = new Float32Array(DOT_COUNT * 3);
  const dotPalette = PASTEL.map((hex) => new THREE.Color(hex));

  for (let i = 0; i < DOT_COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
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
    new THREE.PointsMaterial({ size: 0.11, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false })
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

    world.rotation.y = t * 0.16;
    ring.rotation.z = t * 0.24;
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

    dots.rotation.y = t * 0.02;

    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.05;
    camera.position.y += (0.4 - pointer.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!prefersReduced) requestAnimationFrame(frame);
  }

  resize();
  frame();
}
