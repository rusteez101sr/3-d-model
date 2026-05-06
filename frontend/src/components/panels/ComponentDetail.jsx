import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { components } from "../../data/piData";

export default function ComponentDetail({ componentKey, onClose }) {
  const data = componentKey ? components[componentKey] : null;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={componentKey}
          data-testid={`detail-${componentKey}`}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="pointer-events-auto absolute bottom-8 left-1/2 z-30 w-[min(420px,92vw)] -translate-x-1/2 rounded-2xl border border-cyan-400/20 bg-black/70 p-5 shadow-[0_12px_48px_rgba(0,240,255,0.12)] backdrop-blur-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            data-testid="detail-close-btn"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            aria-label="Close detail"
          >
            <X size={14} />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400">
            {data.tag}
          </p>
          <h3 className="mt-1 text-xl font-medium text-white">{data.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {data.desc}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
