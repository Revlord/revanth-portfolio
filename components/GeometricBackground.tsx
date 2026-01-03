"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GeometricBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 40;
    // Shift camera slightly to the left so the center of the scene (0,0,0) appears on the right
    camera.position.x = -10; 

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. The Core Sphere (Dense Points)
    const coreGeo = new THREE.SphereGeometry(8, 64, 64);
    const coreMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const coreSphere = new THREE.Points(coreGeo, coreMat);
    group.add(coreSphere);

    // 2. The Outer Network (Icosahedron Wireframe)
    const outerGeo = new THREE.IcosahedronGeometry(14, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
    });
    const outerMesh = new THREE.LineSegments(outerWireframe, outerMat);
    group.add(outerMesh);

    // 3. Orbital Rings (Torus)
    const ringGeo = new THREE.TorusGeometry(18, 0.1, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    group.add(ring2);

    // 4. Floating Data Points (Random)
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 600;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    group.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Complex rotation
      coreSphere.rotation.y += 0.002;
      outerMesh.rotation.y -= 0.001;
      outerMesh.rotation.x += 0.0005;
      
      ring1.rotation.z += 0.001;
      ring1.rotation.x += 0.0005;
      ring2.rotation.z -= 0.001;
      ring2.rotation.y += 0.0005;

      particlesMesh.rotation.y += 0.0005;

      // Mouse parallax
      group.rotation.x += (mouseY * 0.1 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.1 - group.rotation.y) * 0.05;

      // Gentle floating
      const time = Date.now() * 0.0005;
      group.position.y = Math.sin(time) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Cleanup
      coreGeo.dispose();
      coreMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage: "radial-gradient(circle at 70% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(circle at 70% 50%, black 40%, transparent 100%)"
      }}
    />
  );
}
