import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Procedural pulsing circuit grid floor - shader based
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;

  float gridLine(float v, float thickness){
    float g = abs(fract(v) - 0.5);
    return smoothstep(thickness, 0.0, g);
  }

  void main(){
    vec2 p = (vUv - 0.5) * 40.0; // scale grid
    float g1 = gridLine(p.x, 0.02) + gridLine(p.y, 0.02);
    float g2 = gridLine(p.x * 0.25, 0.01) + gridLine(p.y * 0.25, 0.01);

    // Pulse waves from center
    float d = length(p);
    float pulse = sin(d * 0.6 - uTime * 1.2) * 0.5 + 0.5;
    pulse = pow(pulse, 4.0);

    // Vignette
    float vignette = smoothstep(22.0, 4.0, d);

    float grid = clamp(g1 * 0.6 + g2 * 0.25, 0.0, 1.0);
    float intensity = grid * vignette * (0.35 + pulse * 0.9);

    vec3 col = uColor * intensity;
    gl_FragColor = vec4(col, intensity * 0.9);
  }
`;

export default function CircuitFloor() {
  const matRef = useRef();
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]} receiveShadow>
      <planeGeometry args={[60, 60, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#00F0FF") },
        }}
      />
    </mesh>
  );
}
