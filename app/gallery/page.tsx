"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stagger, StaggerItem, Animate } from "@/components/Animate";

const images = [
  { src: "/images/gallery_99.jpg", alt: "Fabrija OBOD — Cetinje",          category: "Mape",    span: "col-span-2 row-span-2" },
  { src: "/images/gallery_98.jpg", alt: "Motel Glava Zete — Danilovgrad",  category: "Mape",    span: "" },
  { src: "/images/gallery_97.jpg", alt: "Sportska Dvorana — Zeta",         category: "Mape",    span: "" },
  { src: "/images/gallery_91.jpg", alt: "Yarilo airsoft event 1",          category: "Eventi",  span: "" },
  { src: "/images/gallery_92.jpg", alt: "Yarilo airsoft event 2",          category: "Eventi",  span: "" },
  { src: "/images/gallery_93.jpg", alt: "Yarilo airsoft akcija 3",         category: "Eventi",  span: "col-span-2" },
  { src: "/images/gallery_94.jpg", alt: "Yarilo airsoft akcija 4",         category: "Eventi",  span: "" },
  { src: "/images/gallery_71.jpg", alt: "Yarilo teren — slider 1",         category: "Tereni",  span: "" },
  { src: "/images/gallery_72.jpg", alt: "Yarilo teren — slider 2",         category: "Tereni",  span: "col-span-2" },
  { src: "/images/gallery_73.jpg", alt: "Yarilo teren — slider 3",         category: "Tereni",  span: "" },
  { src: "/images/person_12.jpg",  alt: "Yarilo član 1",                   category: "Članovi", span: "" },
  { src: "/images/person_15.jpg",  alt: "Yarilo član 2",                   category: "Članovi", span: "" },
];

const categories = ["Svi", "Mape", "Tereni", "Eventi", "Članovi"];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GalleryPage() {
  const [active, setActive] = useState("Svi");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "Svi" ? images : images.filter((i) => i.category === active);

  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-dark/0 to-mil-dark" />
        <div className="relative max-w-7xl mx-auto">
          <Animate variant="fadeIn">
            <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Fotogalerija</span>
          </Animate>
          <Animate variant="slideUp" delay={0.1}>
            <h1 className="section-title text-5xl sm:text-7xl font-bold text-white mb-4">GALERIJA</h1>
          </Animate>
          <Animate variant="slideLeft" delay={0.2}>
            <div className="w-16 h-0.5 bg-mil-gold mb-6" />
          </Animate>
          <Animate variant="fadeIn" delay={0.3}>
            <p className="text-mil-text/60 max-w-xl text-sm leading-relaxed">
              Slike sa naših eventi, terena i opreme. Pogledajte akcije sa
              airsoft mečeva Yarilo kluba.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <section className="px-4 sm:px-6 py-6 border-b border-mil-border bg-mil-card">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase font-semibold clip-corner-sm transition-all duration-200 ${
                active === cat
                  ? "bg-mil-green-mid text-white scale-105"
                  : "bg-mil-surface border border-mil-border text-mil-muted hover:border-mil-green-mid hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Gallery grid ── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  className={`relative clip-corner overflow-hidden cursor-pointer group img-shimmer ${img.span}`}
                  onClick={() => setLightbox(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-mil-dark/40 group-hover:bg-mil-dark/10 transition-colors duration-300" />
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-mil-gold bg-mil-dark/80 px-2 py-1"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {img.category}
                    </span>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-mil-dark/80 border border-mil-border flex items-center justify-center clip-corner-sm">
                      <span className="text-mil-text text-xs">+</span>
                    </div>
                  </div>
                  {/* Bottom border animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mil-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state when filter has no results */}
          {filtered.length === 0 && (
            <div className="border border-dashed border-mil-border p-16 text-center clip-corner mt-4">
              <p className="text-mil-muted text-xs tracking-[0.2em] uppercase">Nema slika u ovoj kategoriji</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Instagram CTA ── */}
      <section className="py-10 px-4 sm:px-6 bg-mil-card border-t border-mil-border text-center">
        <Animate variant="slideUp">
          <p className="text-mil-text/50 text-sm mb-6">
            Pratite nas na Instagramu za najnovije fotografije sa terena.
          </p>
          <a
            href="https://www.instagram.com/yarilo_airsoft/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-mil-border hover:border-mil-gold text-mil-text/50 hover:text-mil-gold text-xs font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all hover:scale-105"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            @yarilo_airsoft
          </a>
        </Animate>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-mil-dark/95 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative max-w-4xl w-full max-h-[85vh] clip-corner overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={lightbox}
                  alt="Zarilo airsoft"
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-mil-dark/80 border border-mil-border flex items-center justify-center text-mil-text hover:text-mil-gold hover:border-mil-gold transition-colors clip-corner-sm text-sm"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
