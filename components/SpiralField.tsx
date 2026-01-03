"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Size = { w: number; h: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function SpiralField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.4, 3.2);

    const group = new THREE.Group();
    scene.add(group);

    // --- spiral points
    const POINTS = 1200;
    const spiral = new Float32Array(POINTS * 3);

    // log-ish spiral / helix blend
    for (let i = 0; i < POINTS; i++) {
      const t = i / (POINTS - 1);
      const a = t * 18.0 * Math.PI; // turns
      const r = 0.12 + t * 0.95;
      const y = (t - 0.5) * 1.15;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r * 0.75;
      spiral[i * 3 + 0] = x;
      spiral[i * 3 + 1] = y;
      spiral[i * 3 + 2] = z;
    }

    // lines: connect pairs (LineSegments)
    const SEGMENTS = 900;
    const lineVerts = new Float32Array(SEGMENTS * 2 * 3);
    for (let i = 0; i < SEGMENTS; i++) {
      const idx = Math.floor((i / SEGMENTS) * (POINTS - 6));
      const j = idx + 4;

      // segment A -> B (slightly skipping makes it "vector" / faceted)
      lineVerts[i * 6 + 0] = spiral[idx * 3 + 0];
      lineVerts[i * 6 + 1] = spiral[idx * 3 + 1];
      lineVerts[i * 6 + 2] = spiral[idx * 3 + 2];

      lineVerts[i * 6 + 3] = spiral[j * 3 + 0];
      lineVerts[i * 6 + 4] = spiral[j * 3 + 1];
      lineVerts[i * 6 + 5] = spiral[j * 3 + 2];
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lineVerts, 3));

    const green = new THREE.LineBasicMaterial({
      color: new THREE.Color("#00ff8a"),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orange = new THREE.LineBasicMaterial({
      color: new THREE.Color("#ff6a00"),
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesA = new THREE.LineSegments(lineGeo, green);
    const linesB = new THREE.LineSegments(lineGeo, orange);
    linesB.rotation.y = 0.6;
    linesB.rotation.x = -0.25;

    group.add(linesA, linesB);

    // points
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(spiral, 3));

    const ptsMat = new THREE.PointsMaterial({
      size: 0.012,
      color: new THREE.Color("#e9eef2"),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(ptsGeo, ptsMat);
    group.add(points);

    // rings (HUD-like)
    const rings = new THREE.Group();
    group.add(rings);

    for (let k = 0; k < 4; k++) {
      const radius = 0.45 + k * 0.28;
      const ringGeo = new THREE.RingGeometry(radius - 0.002, radius + 0.002, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: k % 2 === 0 ? new THREE.Color("#00ff8a") : new THREE.Color("#ffffff"),
        transparent: true,
        opacity: k === 0 ? 0.12 : 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.08 + k * 0.06;
      rings.add(ring);
    }

    // lighting-ish cheat (subtle)
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    // sizing
    let size: Size = { w: 1, h: 1 };
    const setSize = () => {
      const rect = wrap.getBoundingClientRect();
      size = { w: Math.max(1, rect.width), h: Math.max(1, rect.height) };
      camera.aspect = size.w / size.h;
      camera.updateProjectionMatrix();
      renderer.setSize(size.w, size.h, false);
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(wrap);

    // interaction
    let targetRX = 0;
    let targetRY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height;
      targetRY = (x - 0.5) * 0.9;
      targetRX = (y - 0.5) * 0.55;
    };

    wrap.addEventListener("pointermove", onMove);

    // loop
    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();

      // base motion
      group.rotation.y += 0.0025;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRX, 0.04);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, group.rotation.y + targetRY * 0.02, 0.08);

      // pulse
      const pulse = (Math.sin(t * 1.25) + 1) * 0.5; // 0..1
      (ptsMat as THREE.PointsMaterial).opacity = 0.38 + pulse * 0.24;

      // ring breathing
      rings.children.forEach((c: THREE.Object3D, i: number) => {
        c.scale.setScalar(1 + Math.sin(t * 0.8 + i) * 0.01);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      ro.disconnect();

      lineGeo.dispose();
      ptsGeo.dispose();
      green.dispose();
      orange.dispose();
      ptsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
