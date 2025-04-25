"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Save the reference to use in cleanup
    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a medical cross
    const crossGroup = new THREE.Group();
    
    // Vertical bar
    const verticalGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    const material = new THREE.MeshStandardMaterial({ color: 0x4285f4 });
    const verticalBar = new THREE.Mesh(verticalGeometry, material);
    crossGroup.add(verticalBar);
    
    // Horizontal bar
    const horizontalGeometry = new THREE.BoxGeometry(2, 0.5, 0.5);
    const horizontalBar = new THREE.Mesh(horizontalGeometry, material);
    crossGroup.add(horizontalBar);
    
    scene.add(crossGroup);
    
    // Create a sphere representing a pill/medicine
    const pillGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const pillMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf06292,
      metalness: 0.3,
      roughness: 0.4,
    });
    const pill = new THREE.Mesh(pillGeometry, pillMaterial);
    pill.position.set(2.5, 0, 0);
    scene.add(pill);
    
    // Create a stethoscope-like shape
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.5, 0, 0),
      new THREE.Vector3(-2, 1, 0),
      new THREE.Vector3(-2.5, 2, 0),
      new THREE.Vector3(-3, 1.5, 0),
      new THREE.Vector3(-3.5, 2, 0),
    ]);
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.1, 16, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x34a853,
      metalness: 0.6,
      roughness: 0.2,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    
    // Add animation with GSAP
    const crossRotation = gsap.to(crossGroup.rotation, {
      y: Math.PI * 2,
      duration: 10,
      ease: "none",
      repeat: -1,
    });
    
    const pillAnimation = gsap.to(pill.position, {
      y: 0.5,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      cancelAnimationFrame(animationFrameId);
      
      // Kill GSAP animations
      crossRotation.kill();
      pillAnimation.kill();
      
      // Dispose of THREE.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full"></div>;
}
