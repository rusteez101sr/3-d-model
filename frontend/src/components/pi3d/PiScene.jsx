import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import RaspberryPi from "./RaspberryPi";
import CircuitFloor from "./CircuitFloor";

function SceneLoader() {
  return (
    <Html center>
      <div
        data-testid="scene-loader"
        className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-black/60 px-3 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">
          Booting board…
        </span>
      </div>
    </Html>
  );
}

export default function PiScene({ onSelect }) {
  const [hoveredKey] = useState(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [8, 7, 9], fov: 35, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* --- Three-point cinematic lighting --- */}
      <ambientLight intensity={0.3} />
      {/* Key light: upper-left 45° */}
      <directionalLight
        position={[-6, 9, 4]}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      {/* Cool rim light from behind-right */}
      <directionalLight
        position={[8, 5, -6]}
        intensity={1.2}
        color="#00d9ff"
      />
      {/* Fill light low-front */}
      <directionalLight
        position={[2, 2, 8]}
        intensity={0.5}
        color="#d0e8ff"
      />
      {/* Accent cyan point under-glow */}
      <pointLight
        position={[0, -0.6, 0]}
        intensity={2.2}
        distance={6}
        color="#00F0FF"
      />

      <Suspense fallback={<SceneLoader />}>
        <Environment preset="city" />
        <group position={[0, 0.4, 0]}>
          <RaspberryPi onSelect={onSelect} hoveredKey={hoveredKey} />
        </group>

        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.6}
          blur={2.6}
          scale={18}
          far={3}
          color="#001b24"
        />
        <CircuitFloor />
      </Suspense>

      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.6}
        enablePan={false}
        minDistance={7}
        maxDistance={18}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
