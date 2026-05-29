"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloaderDone } from "@/context/PreloaderContext";

const LETTERS = ["Y", "A", "R", "I", "L", "O"];
const DURATION = 1800;
// Exit animation is 600ms — backup fires after that + buffer
const EXIT_BACKUP_MS = 1200;

function finish() {
  document.body.classList.add("preloader-done");
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { markDone } = usePreloaderDone();
  const backupRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Progress counter — uses setInterval (reliable on all mobile browsers,
  // unlike requestAnimationFrame which pauses when tab is in background)
  useEffect(() => {
    // Remove the static HTML overlay — React takes over from here
    const staticEl = document.getElementById("preloader-static");
    if (staticEl) staticEl.remove();

    setMounted(true);
    const start = Date.now();

    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t >= 1) {
        clearInterval(id);
        setTimeout(() => setDone(true), 400);
      }
    }, 16);

    return () => clearInterval(id);
  }, []);

  // When local `done` flips, start backup timer.
  // If onExitComplete doesn't fire (mobile Safari quirk),
  // this guarantees markDone() is still called.
  useEffect(() => {
    if (!done) return;
    backupRef.current = setTimeout(() => {
      markDone();
      finish();
    }, EXIT_BACKUP_MS);
    return () => {
      if (backupRef.current) clearTimeout(backupRef.current);
    };
  }, [done, markDone]);

  if (!mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Primary path — clear backup and fire immediately
        if (backupRef.current) clearTimeout(backupRef.current);
        markDone();
        finish();
      }}
    >
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="fixed inset-0 z-[9999] bg-mil-dark flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 military-grid opacity-40" />

          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-mil-green-light/40 to-transparent"
            initial={{ top: "-2%" }}
            animate={{ top: "102%" }}
            transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
          />

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

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="relative w-20 h-20 clip-corner overflow-hidden"
            >
              <Image src="/yariloLogo.jpg" alt="Yarilo" fill className="object-cover" sizes="80px" priority />
              <motion.div
                className="absolute inset-0 border-2 border-mil-green-light/60 clip-corner"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="text-mil-gold text-xs tracking-[0.45em] uppercase"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Airsoft Klub · Crna Gora
            </motion.p>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "240px" }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative h-px bg-mil-border overflow-hidden"
              style={{ width: 240 }}
            >
              <div
                className="absolute inset-y-0 left-0 bg-mil-green-light transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute inset-y-0 w-6 bg-gradient-to-r from-transparent to-mil-green-light/60"
                style={{ left: `calc(${progress}% - 24px)` }}
              />
            </motion.div>

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
