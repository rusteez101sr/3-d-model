import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <motion.header
      data-testid="top-bar"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pointer-events-auto absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300">
          Interactive Teardown
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
        Rev. 1.2 · BCM2837
      </span>
    </motion.header>
  );
}

export function BottomBar() {
  return (
    <motion.div
      data-testid="bottom-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.6 }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500"
    >
      <span>Drag · Scroll · Click hotspots</span>
      <span className="hidden sm:inline">85.60 × 56.50 mm · 45 g</span>
    </motion.div>
  );
}
