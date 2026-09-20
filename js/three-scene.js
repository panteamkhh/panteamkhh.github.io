// Three.js background — real jigsaw pieces (extruded from tab/blank shapes)
// floating on a light canvas. Pastel palette, no orange.

import * as THREE from "three";

const container = document.getElementById("scene-container");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const smallScreen = window.innerWidth < 760;

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
  const COLORS = [0xff8fb1, 0xffd23f, 0x2ec4b6, 0x7c5cff, 0xa9d9ff, 0xcdc0ff, 0x4cc38a, 0xa8e6cf];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 12);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, smallScreen ? 1.5 : 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const ramp = new Uint8Array([150, 205, 255]);
  const gradientMap = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
  gradientMap.needsUpdate = true;

  function toon(color) {
    return new THREE.MeshToonMaterial({ color, gradientMap });
  }

  // --- build a jigsaw piece outline (unit cell with tabs/blanks) --------
  function addEdge(shape, ax, ay, bx, by, nx, ny, tab) {
    if (!tab) {
      shape.lineTo(bx, by);
      return;
    }
    const bump = 0.22;
    const point = (t) => [ax + (bx - ax) * t, ay + (by - ay) * t];
    const [ax2, ay2] = point(0.38);
    const [bx2, by2] = point(0.62);
    const [c1x, c1y] = point(0.45);
    const [c2x, c2y] = point(0.55);
    const o = tab * bump;
    shape.lineTo(ax2, ay2);
    shape.bezierCurveTo(c1x + nx * o, c1y + ny * o, c2x + nx * o, c2y + ny * o, bx2, by2);
    shape.lineTo(bx, by);
  }

  function makePieceGeometry() {
    const shape = new THREE.Shape();
    const tabs = [
      Math.random() > 0.5 ? 1 : -1, // top
      Math.random() > 0.5 ? 1 : -1, // right
      Math.random() > 0.5 ? 1 : -1, // bottom
      Math.random() > 0.5 ? 1 : -1, // left
    ];

    shape.moveTo(0, 0);
    addEdge(shape, 0, 0, 1, 0, 0, -1, tabs[0]);
    addEdge(shape, 1, 0, 1, 1, 1, 0, tabs[1]);
    addEdge(shape, 1, 1, 0, 1, 0, 1, tabs[2]);
    addEdge(shape, 0, 1, 0, 0, -1, 0, tabs[3]);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.035,
      bevelSegments: 2,
      curveSegments: 10,
    });
    geometry.center();
    return geometry;
  }

  // --- lights -----------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8caff, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(5, 7, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd9e8, 0.6);
  fill.position.set(-6, -4, 4);
  scene.add(fill);

  // --- floating jigsaw pieces ------------------------------------------
  const world = new THREE.Group();
  scene.add(world);

  const pieces = [];
  const COUNT = smallScreen ? 6 : 12;
  for (let i = 0; i < COUNT; i += 1) {
    const mesh = new THREE.Mesh(makePieceGeometry(), toon(COLORS[i % COLORS.length]));
    const scale = 0.9 + Math.random() * 1.0;
    mesh.scale.setScalar(scale);
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 13,
      (Math.random() - 0.5) * 8 - 3
    );
    mesh.rotation.set(
      (Math.random() - 0.5) * 0.9,
      (Math.random() - 0.5) * 0.9,
      (Math.random() - 0.5) * 0.7
    );
    mesh.userData = {
      base: mesh.position.clone(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
      spin: new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.2
      ),
    };
    world.add(mesh);
    pieces.push(mesh);
  }

  // --- soft pastel dots -------------------------------------------------
  const DOT_COUNT = smallScreen ? 60 : 150;
  const positions = new Float32Array(DOT_COUNT * 3);
  const colors = new Float32Array(DOT_COUNT * 3);
  const dotPalette = COLORS.map((hex) => new THREE.Color(hex));
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
