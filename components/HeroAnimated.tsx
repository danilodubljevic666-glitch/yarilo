"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePreloaderDone } from "@/context/PreloaderContext";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fade = (delay: number, y = 20) => ({
  initial: { opacity: 0, y },
  variants: {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  },
  transition: { duration: 0.7, delay, ease },
});

export default function HeroAnimated() {
  const { done } = usePreloaderDone();
  const show = done ? "visible" : "hidden";

  return (
    <>
      {/* Corner accents */}
      {([
        "top-24 left-6 sm:left-10 border-l-2 border-t-2",
        "top-24 right-6 sm:right-10 border-r-2 border-t-2",
        "bottom-16 left-6 sm:left-10 border-l-2 border-b-2",
        "bottom-16 right-6 sm:right-10 border-r-2 border-b-2",
      ] as const).map((cls, i) => (
        <motion.div
          key={cls}
          className={`absolute w-16 h-16 border-mil-green-mid ${cls}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={done ? { opacity: 0.4, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.55, delay: i * 0.06, ease }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        {/* Badge row */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial="hidden"
          animate={show}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.div
            className="h-px w-12 sm:w-20 bg-mil-gold"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 0.6 } }}
            transition={{ duration: 0.6, ease }}
            style={{ originX: "right" }}
          />
          <motion.span
            className="text-mil-gold text-xs sm:text-sm tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-rajdhani)" }}
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
          >
            Crna Gora
          </motion.span>
          <motion.div
            className="h-px w-12 sm:w-20 bg-mil-gold"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 0.6 } }}
            transition={{ duration: 0.6, ease }}
            style={{ originX: "left" }}
          />
        </motion.div>

        {/* YARILO */}
        <motion.h1
          className="text-6xl sm:text-8xl md:text-[10rem] font-bold text-white leading-none mb-2"
          style={{ fontFamily: "var(--font-rajdhani)", letterSpacing: "0.15em" }}
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.93, y: 24 }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          YARILO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-mil-green-light text-lg sm:text-2xl tracking-[0.3em] uppercase mb-8 font-medium"
          style={{ fontFamily: "var(--font-rajdhani)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
        >
          Airsoft Klub
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-mil-text/60 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
        >
          U polju u kojem je svaki udarac i svaki manevar nadmetanje za
          superiornost, isticanje nije samo vještina — to je i strategija.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
        >
          <a
            href="https://www.instagram.com/yarilo_airsoft/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-semibold tracking-[0.15em] uppercase clip-corner transition-all duration-200 hover:scale-105"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            <span>Pridruži se timu</span>
            <span className="text-mil-gold">→</span>
          </a>
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-mil-border hover:border-mil-gold text-mil-text/70 hover:text-mil-gold font-semibold tracking-[0.15em] uppercase clip-corner transition-all duration-200 hover:scale-105"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Nadolazeći eventi
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2, ease }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-mil-text">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-mil-green-light to-transparent" />
      </motion.div>
    </>
  );
}
