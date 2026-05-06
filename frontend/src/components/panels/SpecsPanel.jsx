import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ChevronUp } from "lucide-react";
import { specs } from "../../data/piData";

export default function SpecsPanel() {
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      data-testid="panel-specs"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="pointer-events-auto absolute left-4 top-1/2 z-20 hidden w-[320px] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:block"
    >
      <button
        type="button"
        data-testid="specs-toggle-btn"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-6 pt-6 pb-4 text-left outline-none transition-colors hover:bg-white/[0.02]"
        aria-expanded={open}
      >
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
        <motion.span
          animate={{ rotate: open ? 0 : 180 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-slate-400"
        >
          <ChevronUp size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="specs-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
