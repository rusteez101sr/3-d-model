import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      data-testid="hero-title"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="pointer-events-none absolute inset-x-0 top-[18%] z-10 flex flex-col items-center px-6 text-center md:top-auto md:bottom-24"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-300/90">
        Est. February 29, 2016
      </p>
      <h1
        className="mt-3 font-light text-white"
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "clamp(2.25rem, 6.5vw, 4.75rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
        }}
      >
        Raspberry Pi
        <span className="text-cyan-300/90"> 3 </span>
        Model B
      </h1>
      <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-slate-400 md:text-base">
        The board that put a 64-bit, Wi-Fi-enabled quad-core Linux computer into
        the hands of nine million makers — for thirty-five dollars.
      </p>
    </motion.div>
  );
}
