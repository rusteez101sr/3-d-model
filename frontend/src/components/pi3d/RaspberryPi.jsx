import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Hotspot from "./Hotspot";

/* ---------------------------------------------------------
   Procedural Raspberry Pi 3 Model B
   Board oriented flat on XZ plane, Y = up.
   Length (X): 8.56, Width (Z): 5.65, Thickness (Y): 0.15
   +Z edge  = GPIO header (top long edge)
   -Z edge  = HDMI / microUSB / audio (bottom long edge)
   +X edge  = Ethernet + 2×USB (right short edge)
   -X edge  = microSD underside / left short edge
--------------------------------------------------------- */

// ---- materials ----
const MAT = {
  pcb: { color: "#0d3b1f", roughness: 0.72, metalness: 0.12 },
  pcbTop: { color: "#0e4624", roughness: 0.78, metalness: 0.08 },
  silver: { color: "#c0c7cf", roughness: 0.35, metalness: 0.95 },
  darkSilver: { color: "#6b7380", roughness: 0.45, metalness: 0.9 },
  gold: { color: "#e6c26a", roughness: 0.3, metalness: 0.95 },
  black: { color: "#0b0b0d", roughness: 0.6, metalness: 0.3 },
  usbBlue: { color: "#1753c7", roughness: 0.55, metalness: 0.2 },
  heatspread: { color: "#2a2f3a", roughness: 0.45, metalness: 0.85 },
  redLed: {
    color: "#ff2b2b",
    emissive: "#ff2b2b",
    emissiveIntensity: 1.8,
    roughness: 0.3,
  },
  greenLed: {
    color: "#30ff6e",
    emissive: "#30ff6e",
    emissiveIntensity: 1.6,
    roughness: 0.3,
  },
  white: { color: "#e9edf2", roughness: 0.5, metalness: 0.1 },
  yellow: { color: "#d9b24a", roughness: 0.55, metalness: 0.15 },
};

function Port({ position, size, material = MAT.silver, children }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial {...material} />
      </mesh>
      {children}
    </group>
  );
}

// GPIO 40-pin header: 2 rows x 20 cols of small gold pins on a black base.
function GPIOHeader({ position }) {
  const cols = 20;
  const rows = 2;
  const pitch = 0.254; // ~2.54mm
  const baseW = cols * pitch + 0.1;
  const baseD = rows * pitch + 0.1;
  const pins = useMemo(() => {
    const arr = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = -baseW / 2 + pitch / 2 + 0.05 + c * pitch;
        const z = -baseD / 2 + pitch / 2 + 0.05 + r * pitch;
        arr.push([x, 0.24, z]);
      }
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group position={position}>
      {/* plastic base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[baseW, 0.15, baseD]} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
      {/* pins */}
      {pins.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.08, 0.32, 0.08]} />
          <meshStandardMaterial {...MAT.gold} />
        </mesh>
      ))}
    </group>
  );
}

function USBDouble({ position }) {
  // Double USB stack: metal shell with two blue inserts
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.35, 1.15]} />
        <meshStandardMaterial {...MAT.silver} />
      </mesh>
      {/* blue inserts on +X face */}
      {[0.33, -0.33].map((zy, i) => (
        <mesh key={i} position={[0.76, zy, 0]} castShadow>
          <boxGeometry args={[0.05, 0.5, 0.9]} />
          <meshStandardMaterial {...MAT.usbBlue} />
        </mesh>
      ))}
    </group>
  );
}

function Ethernet({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.35, 1.6]} />
        <meshStandardMaterial {...MAT.silver} />
      </mesh>
      {/* black opening */}
      <mesh position={[0.76, -0.15, 0]} castShadow>
        <boxGeometry args={[0.05, 0.7, 1.15]} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
      {/* status leds */}
      <mesh position={[0.76, -0.55, -0.55]}>
        <boxGeometry args={[0.04, 0.08, 0.12]} />
        <meshStandardMaterial {...MAT.greenLed} />
      </mesh>
      <mesh position={[0.76, -0.55, 0.55]}>
        <boxGeometry args={[0.04, 0.08, 0.12]} />
        <meshStandardMaterial {...MAT.yellow} />
      </mesh>
    </group>
  );
}

function HDMI({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 0.5, 0.75]} />
        <meshStandardMaterial {...MAT.silver} />
      </mesh>
      <mesh position={[0, 0, -0.38]} castShadow>
        <boxGeometry args={[1.35, 0.34, 0.04]} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
    </group>
  );
}

function MicroUSB({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.3, 0.6]} />
        <meshStandardMaterial {...MAT.silver} />
      </mesh>
      <mesh position={[0, 0, -0.31]}>
        <boxGeometry args={[0.6, 0.18, 0.04]} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
    </group>
  );
}

function AudioJack({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.9, 32]} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
      {/* opening facing -Z */}
      <mesh position={[0, 0, -0.46]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.06, 24]} />
        <meshStandardMaterial {...MAT.silver} />
      </mesh>
    </group>
  );
}

function CPU({ position, hovered }) {
  // BCM2837 with silver metallic heatspreader
  return (
    <group position={position}>
      {/* package substrate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.12, 1.4]} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
      {/* metal heatspreader on top */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[1.22, 0.1, 1.22]} />
        <meshStandardMaterial
          {...MAT.heatspread}
          emissive={hovered ? "#00F0FF" : "#000"}
          emissiveIntensity={hovered ? 0.45 : 0}
        />
      </mesh>
    </group>
  );
}

function MicroSD({ position }) {
  // visible slot protruding from -X edge on underside
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.2, 1.55]} />
        <meshStandardMaterial {...MAT.darkSilver} />
      </mesh>
      {/* sd card sticking out -X */}
      <mesh position={[-0.9, 0, 0]} castShadow>
        <boxGeometry args={[0.9, 0.08, 1.15]} />
        <meshStandardMaterial {...MAT.white} />
      </mesh>
      <mesh position={[-0.88, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.6]} />
        <meshStandardMaterial color="#c9d3dd" roughness={0.8} />
      </mesh>
    </group>
  );
}

function WiFiChip({ position, hovered }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.08, 0.72]} />
        <meshStandardMaterial
          {...MAT.darkSilver}
          emissive={hovered ? "#00F0FF" : "#000"}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>
      {/* antenna pad silkscreen */}
      <mesh position={[-0.7, -0.06, 0]}>
        <boxGeometry args={[0.6, 0.01, 0.5]} />
        <meshStandardMaterial color="#e8e3c1" roughness={0.9} />
      </mesh>
    </group>
  );
}

function FlatConnector({ position, size, rotation = [0, 0, 0] }) {
  // CSI / DSI flex connectors - low black rectangle with brown stripe
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial {...MAT.black} />
      </mesh>
      <mesh position={[0, size[1] / 2 + 0.005, 0]}>
        <boxGeometry args={[size[0] * 0.92, 0.01, size[2] * 0.55]} />
        <meshStandardMaterial color="#6b4320" roughness={0.8} />
      </mesh>
    </group>
  );
}

function RamChip({ position }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.55, 0.08, 0.55]} />
      <meshStandardMaterial {...MAT.black} />
    </mesh>
  );
}

function MountingHole({ position }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.1, 0.2, 24]} />
      <meshStandardMaterial {...MAT.silver} side={2} />
    </mesh>
  );
}

export default function RaspberryPi({ onSelect, hoveredKey }) {
  const group = useRef();
  const [t, setT] = useState(0);
  useFrame((_, dt) => {
    setT((v) => v + dt);
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.6) * 0.06 + 0.05;
    }
  });

  const boardW = 8.56;
  const boardD = 5.65;
  const boardH = 0.15;
  const top = boardH / 2;

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* PCB */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[boardW, boardH, boardD]} />
        <meshStandardMaterial {...MAT.pcb} />
      </mesh>
      {/* Slight top layer for silkscreen hint */}
      <mesh position={[0, top + 0.001, 0]} receiveShadow>
        <boxGeometry args={[boardW - 0.02, 0.002, boardD - 0.02]} />
        <meshStandardMaterial {...MAT.pcbTop} />
      </mesh>

      {/* Mounting holes (4 corners inset) */}
      <MountingHole position={[-3.8, top + 0.01, -2.2]} />
      <MountingHole position={[3.45, top + 0.01, -2.2]} />
      <MountingHole position={[-3.8, top + 0.01, 2.2]} />
      <MountingHole position={[3.45, top + 0.01, 2.2]} />

      {/* GPIO 40-pin header at +Z (top) edge */}
      <GPIOHeader position={[-0.6, top, 2.45]} />

      {/* CPU (BCM2837) center */}
      <CPU position={[-0.3, top + 0.06, -0.1]} hovered={hoveredKey === "cpu"} />

      {/* RAM-ish chips (on Pi 3B RAM is PoP; add a small companion chip for visual) */}
      <RamChip position={[1.4, top + 0.04, -0.1]} />
      <RamChip position={[-2.0, top + 0.04, 0.5]} />

      {/* Ethernet (right edge, top) */}
      <group position={[3.55, top + 0.68, 1.65]}>
        <Ethernet position={[0, 0, 0]} />
      </group>

      {/* USB double stacks (right edge, middle + bottom) */}
      <group position={[3.55, top + 0.68, -0.1]}>
        <USBDouble position={[0, 0, 0]} />
      </group>
      <group position={[3.55, top + 0.68, -1.8]}>
        <USBDouble position={[0, 0, 0]} />
      </group>

      {/* HDMI (bottom -Z edge, left-center) */}
      <HDMI position={[-0.4, top + 0.25, -2.65]} />

      {/* microUSB power (-Z edge, far left) */}
      <MicroUSB position={[-3.25, top + 0.15, -2.65]} />

      {/* 3.5mm audio (-Z edge, right) */}
      <AudioJack position={[2.55, top + 0.3, -2.6]} />

      {/* WiFi/BT chip (upper-left) */}
      <WiFiChip
        position={[-3.1, top + 0.04, 1.3]}
        hovered={hoveredKey === "wifi"}
      />

      {/* DSI connector (left of CPU) */}
      <FlatConnector
        position={[-1.9, top + 0.06, 0.1]}
        size={[0.3, 0.12, 1.4]}
      />
      {/* CSI connector (right of CPU) */}
      <FlatConnector
        position={[1.15, top + 0.06, 0.5]}
        size={[0.3, 0.12, 1.4]}
      />

      {/* microSD underside */}
      <MicroSD position={[-3.5, -top - 0.08, 0]} />

      {/* LEDs */}
      <mesh position={[-3.85, top + 0.03, -1.2]}>
        <boxGeometry args={[0.1, 0.05, 0.18]} />
        <meshStandardMaterial {...MAT.redLed} />
      </mesh>
      <mesh position={[-3.85, top + 0.03, -1.5]}>
        <boxGeometry args={[0.1, 0.05, 0.18]} />
        <meshStandardMaterial {...MAT.greenLed} />
      </mesh>

      {/* Raspberry silkscreen fake: small framed rect near top-right */}
      <mesh position={[2.6, top + 0.002, 1.9]}>
        <boxGeometry args={[1.1, 0.004, 0.6]} />
        <meshStandardMaterial color="#d9dcc8" roughness={0.9} />
      </mesh>

      {/* ===== Hotspots (clickable) ===== */}
      <Hotspot
        position={[-0.3, top + 0.3, -0.1]}
        componentKey="cpu"
        label="CPU"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-0.6, top + 0.6, 2.45]}
        componentKey="gpio"
        label="GPIO"
        onSelect={onSelect}
      />
      <Hotspot
        position={[3.55, top + 1.6, -0.95]}
        componentKey="usb"
        label="USB 2.0"
        onSelect={onSelect}
      />
      <Hotspot
        position={[3.55, top + 1.6, 1.65]}
        componentKey="ethernet"
        label="Ethernet"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-0.4, top + 0.7, -2.7]}
        componentKey="hdmi"
        label="HDMI"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-3.25, top + 0.5, -2.7]}
        componentKey="power"
        label="Power"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-3.5, -top - 0.3, 0]}
        componentKey="microsd"
        label="microSD"
        onSelect={onSelect}
      />
      <Hotspot
        position={[-3.1, top + 0.4, 1.3]}
        componentKey="wifi"
        label="Wi-Fi/BT"
        onSelect={onSelect}
      />
      <Hotspot
        position={[2.55, top + 0.7, -2.7]}
        componentKey="audio"
        label="3.5mm A/V"
        onSelect={onSelect}
      />
    </group>
  );
}
