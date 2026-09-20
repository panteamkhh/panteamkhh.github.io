// Three.js background — soft pastel shapes floating on a light canvas.
// Cel-shaded with MeshToonMaterial for a gentle cartoon look (no gimmicks).

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
  const PASTEL = [0xffb3c7, 0xa8e6cf, 0xcdc0ff, 0xffe6a7, 0xa9d9ff, 0xffd6ba];

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // soft toon ramp (3 steps)
  const ramp = new Uint8Array([130, 195, 255]);
  const gradientMap = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
  gradientMap.needsUpdate = true;

  function toon(color) {
    return new THREE.MeshToonMaterial({ color, gradientMap });
  }

  // --- lights -----------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8caff, 1.15));
  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(5, 7, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd9e8, 0.6);
  fill.position.set(-6, -4, 3);
  scene.add(fill);

  // --- floating pastel shapes ------------------------------------------
  const world = new THREE.Group();
  scene.add(world);

  const geometries = [
    new THREE.SphereGeometry(0.95, 40, 28),
    new THREE.TorusGeometry(0.75, 0.32, 24, 48),
    new THREE.TorusKnotGeometry(0.46, 0.19, 90, 14),
    new THREE.IcosahedronGeometry(0.85, 1),
    new THREE.DodecahedronGeometry(0.72, 0),
    new THREE.SphereGeometry(0.55, 32, 22),
  ];

  const spread = [
    [-3.4, 1.5, -1],
    [3.5, 1.9, -1.5],
    [-2.9, -1.6, -0.5],
    [3.1, -1.2, -0.8],
    [0.4, 2.4, -2.4],
    [-0.6, -2.3, -1.2],
  ];

  const shapes = geometries.map((geometry, index) => {
    const mesh = new THREE.Mesh(geometry, toon(PASTEL[index % PASTEL.length]));
    mesh.position.set(...spread[index]);
    mesh.userData = {
      base: mesh.position.clone(),
      phase: index * 0.9,
      speed: 0.5 + (index % 3) * 0.15,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.2
      ),
    };
    world.add(mesh);
    return mesh;
  });

  // --- soft pastel dots -------------------------------------------------
  const DOT_COUNT = 260;
  const positions = new Float32Array(DOT_COUNT * 3);
  const colors = new Float32Array(DOT_COUNT * 3);
  const dotPalette = PASTEL.map((hex) => new THREE.Color(hex));

  for (let i = 0; i < DOT_COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;

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
    new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })
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

    shapes.forEach((mesh) => {
      const data = mesh.userData;
      mesh.position.y = data.base.y + Math.sin(t * data.speed + data.phase) * 0.35;
      mesh.position.x = data.base.x + Math.cos(t * data.speed * 0.6 + data.phase) * 0.18;
      mesh.rotation.x += data.spin.x * 0.01;
      mesh.rotation.y += data.spin.y * 0.01;
      mesh.rotation.z += data.spin.z * 0.01;
    });

    dots.rotation.y = t * 0.02;

    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.05;
    camera.position.y += (-pointer.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!prefersReduced) requestAnimationFrame(frame);
  }

  resize();
  frame();
}
