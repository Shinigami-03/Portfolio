import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "./Home.css";

const Home = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // REMOVE: Add a 3D object (realistic football)
    // const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);
    // const textureLoader = new THREE.TextureLoader();
    // const footballTexture = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/football/football_diffuse.jpg");
    // const footballBump = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/football/football_bump.jpg");
    // const footballSpec = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/football/football_spec.jpg");
    // const sphereMaterial = new THREE.MeshStandardMaterial({ map: footballTexture, bumpMap: footballBump, bumpScale: 0.15, metalness: 0.3, roughness: 0.4 });
    // const football = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // football.castShadow = true;
    // football.receiveShadow = true;
    // scene.add(football);

    // Add ground for shadow
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Add a 3D object (Rubik's Cube)
    const cubeSize = 0.6;
    const gap = 0.04;
    const cubies = [];
    // Colors: [right, left, top, bottom, front, back]
    const colors = [0xff3d3d, 0xffa500, 0x009b48, 0x0046ad, 0xffff00, 0xffffff];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          let materials;
          if (x === 0 && y === 0 && z === 0) {
            materials = [
              new THREE.MeshStandardMaterial({ color: colors[0] }),
              new THREE.MeshStandardMaterial({ color: colors[1] }),
              new THREE.MeshStandardMaterial({ color: colors[2] }),
              new THREE.MeshStandardMaterial({ color: colors[3] }),
              new THREE.MeshStandardMaterial({ color: colors[4] }),
              new THREE.MeshStandardMaterial({ color: colors[5] })
            ];
          } else if (x === 0 && y === 0 && z !== 0) {
            materials = [
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: z === 1 ? colors[4] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: z === -1 ? colors[5] : 0xcccccc })
            ];
          } else if (x === 0 && z === 0 && y !== 0) {
            materials = [
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: y === 1 ? colors[2] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: y === -1 ? colors[3] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc })
            ];
          } else if (y === 0 && z === 0 && x !== 0) {
            materials = [
              new THREE.MeshStandardMaterial({ color: x === 1 ? colors[0] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: x === -1 ? colors[1] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: 0xcccccc })
            ];
          } else {
            materials = [
              new THREE.MeshStandardMaterial({ color: x === 1 ? colors[0] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: x === -1 ? colors[1] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: y === 1 ? colors[2] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: y === -1 ? colors[3] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: z === 1 ? colors[4] : 0xcccccc }),
              new THREE.MeshStandardMaterial({ color: z === -1 ? colors[5] : 0xcccccc })
            ];
          }
          const cubie = new THREE.Mesh(geometry, materials);
          cubie.position.set(x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap));
          scene.add(cubie);
          cubies.push(cubie);
          // Add black outline
          const edgeGeometry = new THREE.EdgesGeometry(geometry);
          const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
          const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
          edges.position.copy(cubie.position);
          scene.add(edges);
        }
      }
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 8, 5);
    scene.add(pointLight);
    renderer.shadowMap.enabled = false;

    // Animate with GSAP (rotation + solving sequence)
    gsap.to(scene.rotation, { y: Math.PI * 2, duration: 8, repeat: -1, ease: "power1.inOut" });
    // Simulate a simple solving animation by rotating a layer
    function solveStep() {
      gsap.to(cubies.filter(c => Math.abs(c.position.y - (cubeSize + gap)) < 0.01).map(c => c.rotation), {
        z: "+=" + Math.PI / 2,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(cubies.filter(c => Math.abs(c.position.x + (cubeSize + gap)) < 0.01).map(c => c.rotation), {
            x: "+=" + Math.PI / 2,
            duration: 1,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.to(cubies.filter(c => Math.abs(c.position.z - (cubeSize + gap)) < 0.01).map(c => c.rotation), {
                y: "+=" + Math.PI / 2,
                duration: 1,
                ease: "power1.inOut",
                onComplete: solveStep
              });
            }
          });
        }
      });
    }
    solveStep();

    // Mouse interaction for rotation
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event) => {
      mouseX = (event.clientX / width) * 2 - 1;
      mouseY = -(event.clientY / height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Render loop
    const animate = () => {
      scene.rotation.x += (mouseY * 0.2 - scene.rotation.x) * 0.05;
      scene.rotation.y += (mouseX * 0.2 - scene.rotation.y) * 0.05;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="App" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
      <div className="overlay">
        <div className="glass-card">
          <h1 className="hero-title">Welcome to My 3D Portfolio</h1>
          <p className="hero-subtitle">Creative Developer & 3D Enthusiast</p>
          <button className="cta-btn">View My Work</button>
        </div>
      </div>
    </div>
  );
};

export default Home;