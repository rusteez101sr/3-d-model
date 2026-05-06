import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Hotspot from "./Hotspot";

const MODEL_URL = "/models/raspberry_pi_3.glb";

// Target length (X axis) of the board in scene units.
const TARGET_LENGTH = 8.56;

useGLTF.preload(MODEL_URL);

export default function RaspberryPi({ onSelect, hoveredKey: _hoveredKey }) {
  const group = useRef();
  const { scene } = useGLTF(MODEL_URL);

  // Clone + auto center/scale the GLB so existing camera, hotspots and floor
  // all line up with the original coordinate system.
  const [modelScene, modelOffset, modelScale] = useMemo(() => {
    const cloned = scene.clone(true);

    // Ensure all meshes cast/receive shadows.
    cloned.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        // Encourage correct color space on maps bundled in GLB.
        if (obj.material) {
          obj.material.needsUpdate = true;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Longest horizontal axis of the incoming model.
    const longest = Math.max(size.x, size.z, size.y);
    const scale = TARGET_LENGTH / (longest || 1);

    return [cloned, center, scale];
  }, [scene]);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (modelScene) setReady(true);
  }, [modelScene]);

  // Gentle floating animation on the outer group.
  const t = useRef(0);
  useFrame((_, dt) => {
    t.current += dt;
    if (group.current) {
      group.current.position.y = Math.sin(t.current * 0.6) * 0.06 + 0.05;
    }
  });

  // Board-top Y after centering+scaling. The GLB is centered at origin inside
  // its inner group, then we scale it. We lift hotspots a bit above the top
  // face — since we don't know exact thickness, use a small fixed offset.
  const topY = 0.35;

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* The GLB itself: centered, uniformly scaled, slightly tilted up */}
      {ready && (
        <group scale={modelScale}>
          <primitive
            object={modelScene}
            position={[-modelOffset.x, -modelOffset.y, -modelOffset.z]}
          />
        </group>
      )}

      {/* ===== Hotspots (clickable) =====
          Positions tuned to sit above the equivalent components on the board.
          If the GLB is rotated differently, tweak X/Z here only. */}
      <Hotspot
        position={[-0.3, topY + 0.25, -0.1]}
        componentKey="cpu"
        label="CPU"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-0.6, topY + 0.55, 2.35]}
        componentKey="gpio"
        label="GPIO"
        onSelect={onSelect}
      />
      <Hotspot
        position={[3.45, topY + 1.35, -0.95]}
        componentKey="usb"
        label="USB 2.0"
        onSelect={onSelect}
      />
      <Hotspot
        position={[3.45, topY + 1.35, 1.55]}
        componentKey="ethernet"
        label="Ethernet"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-0.4, topY + 0.6, -2.55]}
        componentKey="hdmi"
        label="HDMI"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-3.25, topY + 0.45, -2.55]}
        componentKey="power"
        label="Power"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-3.5, -topY - 0.2, 0]}
        componentKey="microsd"
        label="microSD"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-3.1, topY + 0.35, 1.25]}
        componentKey="wifi"
        label="Wi-Fi/BT"
        onSelect={onSelect}
      />
      <Hotspot
        position={[2.55, topY + 0.65, -2.55]}
        componentKey="audio"
        label="3.5mm A/V"
        onSelect={onSelect}
      />
    </group>
  );
}
