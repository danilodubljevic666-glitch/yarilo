"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["Y", "A", "R", "I", "L", "O"];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Progress bar fills from 0 to 100 over ~1.8s with easing
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Small pause at 100% before hiding
        setTimeout(() => setDone(true), 400);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // Don't render on server
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-mil-dark flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 military-grid opacity-40" />

          {/* Scanline */}
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-mil-green-light/40 to-transparent"
            initial={{ top: "-2%" }}
            animate={{ top: "102%" }}
            transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
          />

          {/* Corner accents */}
          {[
            "top-8 left-8 border-l-2 border-t-2",
            "top-8 right-8 border-r-2 border-t-2",
            "bottom-8 left-8 border-l-2 border-b-2",
            "bottom-8 right-8 border-r-2 border-b-2",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-10 h-10 border-mil-green-mid/50 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            />
          ))}

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-20 h-20 clip-corner overflow-hidden"
            >
              <Image
                src="/yariloLogo.jpg"
                alt="Yarilo"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
              {/* Green border glow */}
              <motion.div
                className="absolute inset-0 border-2 border-mil-green-light/60 clip-corner"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* YARILO — letters stagger in */}
            <div className="flex items-end gap-1 sm:gap-2">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={letter + i}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="text-5xl sm:text-7xl font-bold text-white tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="text-mil-gold text-xs tracking-[0.45em] uppercase"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Airsoft Klub · Crna Gora
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "240px" }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative h-px bg-mil-border overflow-hidden"
              style={{ width: 240 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-mil-green-light"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
              {/* Glow on leading edge */}
              <motion.div
                className="absolute inset-y-0 w-6 bg-gradient-to-r from-transparent to-mil-green-light/60"
                style={{ left: `calc(${progress}% - 24px)` }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-mil-muted text-xs tracking-[0.3em] tabular-nums"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              {String(progress).padStart(3, "0")}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
