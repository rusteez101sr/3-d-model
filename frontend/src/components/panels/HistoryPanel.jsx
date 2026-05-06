import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { history } from "../../data/piData";

export default function HistoryPanel() {
  return (
    <motion.aside
      data-testid="panel-history"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="pointer-events-auto absolute left-1/2 top-4 z-20 hidden w-[440px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/55 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:block"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
          <Clock size={14} />
        </span>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400">
          History & Milestones
        </p>
      </div>
      <div className="relative">
        <span className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/15 to-transparent" />
        <ul className="space-y-3">
          {history.map((h, i) => (
            <li key={i} className="relative pl-6">
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border border-cyan-300/60 bg-black">
                <span className="absolute inset-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </span>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-medium text-white">{h.title}</h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-300/80">
                  {h.date}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">{h.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
