import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ChevronDown, ChevronUp } from "lucide-react";
import { specs } from "../../data/piData";

export default function SpecsPanel() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            key="specs-panel"
            data-testid="panel-specs"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto absolute left-4 top-1/2 z-20 hidden w-[320px] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:block"
          >
            <div className="flex items-center justify-between gap-2 px-6 pt-6 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  <Cpu size={16} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400">
                    Technical Specs
                  </p>
                  <h2 className="text-base font-medium text-white">
                    Raspberry Pi 3 B
                  </h2>
                </div>
              </div>
              <button
                type="button"
                data-testid="specs-toggle-btn"
                onClick={() => setOpen(false)}
                aria-label="Hide specs"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            <ul className="space-y-2.5 px-6 pb-6">
              {specs.map((s) => (
                <li
                  key={s.label}
                  className="flex items-start justify-between gap-3 border-b border-white/5 pb-2 last:border-0"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    {s.label}
                  </span>
                  <span className="max-w-[180px] text-right text-xs text-slate-200">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Dock pill — brings panel back when hidden */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="specs-dock"
            type="button"
            data-testid="specs-dock-btn"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto absolute bottom-12 left-4 z-20 hidden items-center gap-2 rounded-full border border-cyan-400/25 bg-black/60 px-4 py-2 backdrop-blur-md transition-colors hover:border-cyan-400/60 hover:bg-cyan-400/10 md:flex"
          >
            <Cpu size={13} className="text-cyan-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-200">
              Show Specs
            </span>
            <ChevronUp size={12} className="text-cyan-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
