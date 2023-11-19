import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  // Check for NaN values in the position attribute
  useEffect(() => {
    const positions = earth.nodes?.Earth?.geometry?.attributes?.position?.array;

    if (positions) {
      for (let i = 0; i < positions.length; i++) {
        if (Number.isNaN(positions[i])) {
          console.error("Position attribute contains NaN values.");
          break;
        }
      }
    }
  }, [earth]);

  return <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  const controls = useRef();

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          ref={controls}
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        {/* Use Preload with startTransition to handle synchronous input */}
        <Preload
          all
          onLoaded={() => {
            controls.current.startTransition(() => {
              controls.current.enabled = true;
            });
          }}
        />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
