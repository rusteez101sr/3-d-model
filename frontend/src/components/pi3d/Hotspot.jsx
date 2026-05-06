import { Html } from "@react-three/drei";

// 3D hotspot marker - a small clickable cyan dot attached to a 3D position.
export default function Hotspot({ position, componentKey, label, onSelect }) {
  return (
    <group position={position}>
      <Html center distanceFactor={8} zIndexRange={[20, 0]}>
        <button
          type="button"
          data-testid={`hotspot-${componentKey}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(componentKey);
          }}
          className="group relative flex items-center gap-2 outline-none"
          aria-label={label}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/70"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-cyan-200/60 shadow-[0_0_12px_rgba(0,240,255,0.9)]"></span>
          </span>
          <span className="pointer-events-none whitespace-nowrap rounded-md border border-cyan-400/30 bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {label}
          </span>
        </button>
      </Html>
    </group>
  );
}
