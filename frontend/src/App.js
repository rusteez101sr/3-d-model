import { useState } from "react";
import PiScene from "./components/pi3d/PiScene";
import SpecsPanel from "./components/panels/SpecsPanel";
import HistoryPanel from "./components/panels/HistoryPanel";
import ImplementationsPanel from "./components/panels/ImplementationsPanel";
import ComponentDetail from "./components/panels/ComponentDetail";
import TopBar, { BottomBar } from "./components/panels/TopBar";
import Hero from "./components/panels/Hero";
import "@/App.css";

function App() {
  const [active, setActive] = useState(null);

  return (
    <div
      data-testid="landing-root"
      className="relative h-screen w-screen overflow-hidden bg-[#030712] text-white"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,46,74,0.55) 0%, rgba(3,7,18,1) 70%)",
        }}
      />
      {/* Subtle noise / grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      {/* 3D scene */}
      <div className="absolute inset-0 z-[1]">
        <PiScene onSelect={setActive} />
      </div>

      {/* UI overlays */}
      <TopBar />
      <Hero />
      <SpecsPanel />
      <HistoryPanel />
      <ImplementationsPanel />
      <ComponentDetail
        componentKey={active}
        onClose={() => setActive(null)}
      />
      <BottomBar />
    </div>
  );
}

export default App;
