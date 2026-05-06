import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { implementations } from "../../data/piData";

export default function ImplementationsPanel() {
  return (
    <motion.aside
      data-testid="panel-implementations"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="pointer-events-auto absolute right-4 top-1/2 z-20 hidden w-[320px] -translate-y-1/2 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:block"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
          <Sparkles size={16} />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400">
            Popular Builds
          </p>
          <h2 className="text-base font-medium text-white">
            What makers do with it
          </h2>
        </div>
      </div>
      <ul className="space-y-2">
        {implementations.map((impl) => (
          <li
            key={impl.title}
            data-testid={`impl-${impl.tag.toLowerCase()}`}
            className="group cursor-pointer rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-400/80">
                {impl.tag}
              </span>
              <ArrowUpRight
                size={12}
                className="text-slate-500 transition-colors group-hover:text-cyan-300"
              />
            </div>
            <h3 className="mt-1 text-sm font-medium text-white">
              {impl.title}
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
              {impl.desc}
            </p>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
