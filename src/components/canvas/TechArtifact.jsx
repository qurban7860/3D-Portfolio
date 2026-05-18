/* eslint-disable react/no-unknown-property */
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useTheme } from "../../context/ThemeContext";

const TechShape = () => {
  const group = useRef();
  const { activeTheme } = useTheme();
  const accentColor = activeTheme?.config?.colors?.accent || "#915EFF";
  const secondaryColor = activeTheme?.config?.colors?.secondary || "#56ccf2";

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
        {/* Outer Wireframe Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial 
            color={secondaryColor} 
            wireframe 
            transparent 
            opacity={0.3}
            emissive={secondaryColor}
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Orbital Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#fff" emissive={accentColor} emissiveIntensity={1} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
          <torusGeometry args={[2.6, 0.015, 16, 100]} />
          <meshStandardMaterial color="#fff" emissive={secondaryColor} emissiveIntensity={1} />
        </mesh>
      </Float>
    </group>
  );
};

const TechArtifactCanvas = () => {
  const { activeTheme } = useTheme();
  const accentColor = activeTheme?.config?.colors?.accent || "#915EFF";
  const secondaryColor = activeTheme?.config?.colors?.secondary || "#56ccf2";

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
          <directionalLight position={[10, 10, 5]} intensity={1.5} color={accentColor} />
          <pointLight position={[-10, -10, -10]} intensity={1} color={secondaryColor} />
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
