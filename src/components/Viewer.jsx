import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Center,
  ContactShadows,
  useGLTF,
  Bounds,
} from "@react-three/drei";
import { Suspense } from "react";
import Loader from "./Loader.jsx";

function Shoe() {
  const { scene } = useGLTF("./Test_Model_Shoe.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} scale={70} />;
}

export default function Viewer() {
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [0, 1, 2] }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[2, 4, 3]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1}>
            <Center>
              <Shoe />
            </Center>
          </Bounds>

          <Suspense fallback={<Loader />}>
            <Environment preset="studio" />
          </Suspense>

          {/* Soft shadows under the shoe */}
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.5}
            scale={10}
            blur={2.5}
            far={4}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan
          enableZoom
          minDistance={0.4}
          maxDistance={3}
          maxPolarAngle={Math.PI * 0.9}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </>
  );
}
