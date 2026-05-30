"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  images: string[];
  name: string;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-mil-surface clip-corner flex items-center justify-center">
        <span className="text-mil-border/30 text-6xl">⬡</span>
      </div>
    );
  }

  function prev() { setActive((i) => (i - 1 + images.length) % images.length); }
  function next() { setActive((i) => (i + 1) % images.length); }

  return (
    <>
      {/* Main image */}
      <div className="space-y-3">
        <div
          className="relative aspect-square bg-mil-surface clip-corner overflow-hidden cursor-zoom-in group"
          onClick={() => setLightbox(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={`${name} — slika ${active + 1}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-mil-dark/80 border border-mil-border flex items-center justify-center clip-corner-sm text-mil-muted text-xs">
              ⊕
            </div>
          </div>

          {/* Prev / Next arrows (only if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-mil-dark/80 border border-mil-border hover:border-mil-green-mid text-mil-text hover:text-white flex items-center justify-center clip-corner-sm transition-all opacity-0 group-hover:opacity-100 text-sm"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-mil-dark/80 border border-mil-border hover:border-mil-green-mid text-mil-text hover:text-white flex items-center justify-center clip-corner-sm transition-all opacity-0 group-hover:opacity-100 text-sm"
              >
                ›
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] bg-mil-dark/80 border border-mil-border text-mil-muted px-2 py-1 tracking-wider"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                {active + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative w-16 h-16 flex-shrink-0 clip-corner-sm overflow-hidden border-2 transition-all ${
                  i === active
                    ? "border-mil-green-mid"
                    : "border-mil-border hover:border-mil-green-mid/50"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-mil-dark/95 backdrop-blur-sm p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              className="relative max-w-4xl w-full max-h-[90vh] clip-corner overflow-hidden bg-mil-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={images[active]}
                  alt={name}
                  fill
                  className="object-contain p-4"
                  sizes="90vw"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-mil-dark/80 border border-mil-border hover:border-mil-green-mid text-white flex items-center justify-center clip-corner-sm text-lg transition-all"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-mil-dark/80 border border-mil-border hover:border-mil-green-mid text-white flex items-center justify-center clip-corner-sm text-lg transition-all"
                  >
                    ›
                  </button>
                </>
              )}

              <button
                onClick={() => setLightbox(false)}
                className="absolute top-3 right-3 w-9 h-9 bg-mil-dark/80 border border-mil-border flex items-center justify-center text-mil-text hover:text-mil-gold hover:border-mil-gold transition-colors clip-corner-sm text-sm"
              >
                ✕
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <span className="text-[10px] bg-mil-dark/80 border border-mil-border text-mil-muted px-3 py-1 tracking-wider"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  {active + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
