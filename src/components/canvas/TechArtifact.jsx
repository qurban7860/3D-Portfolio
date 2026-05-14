/* eslint-disable react/no-unknown-property */
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from "three";

const TechShape = () => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.4;
      group.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Core Glowing Sphere */}
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial 
            color="#915EFF" 
            attach="material" 
            distort={0.4} 
            speed={2} 
            roughness={0.2} 
            metalness={0.8}
            emissive="#915EFF"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Outer Wireframe Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial 
            color="#56ccf2" 
            wireframe 
            transparent 
            opacity={0.3}
            emissive="#56ccf2"
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Orbital Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#fff" emissive="#915EFF" emissiveIntensity={1} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.015, 16, 100]} />
          <meshStandardMaterial color="#fff" emissive="#56ccf2" emissiveIntensity={1} />
        </mesh>
      </Float>
    </group>
  );
};

const TechArtifactCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#915EFF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#56ccf2" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={3}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minPolarAngle={Math.PI / 2 - 0.3}
          />
          <TechShape />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechArtifactCanvas;
