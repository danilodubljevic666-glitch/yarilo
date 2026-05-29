"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/",        label: "Početna" },
  { href: "/events",  label: "Eventi" },
  { href: "/gallery", label: "Galerija" },
  { href: "/shop",    label: "Shop" },
  { href: "/about",   label: "O nama" },
  { href: "/contact", label: "Kontakt" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={mounted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-mil-dark/95 backdrop-blur-sm border-b border-mil-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 clip-corner-sm overflow-hidden relative">
              <Image
                src="/yariloLogo.jpg"
                alt="Yarilo Logo"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-mil-gold" />
          </motion.div>
          <div>
            <span className="text-xl font-bold tracking-[0.2em] text-white uppercase block leading-none"
              style={{ fontFamily: "var(--font-rajdhani)" }}>YARILO</span>
            <span className="text-[9px] tracking-[0.3em] text-mil-gold uppercase leading-none">
              Airsoft Klub
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }, i) => {
            const active = pathname === href;
            return (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: -10 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }}
              >
                <Link
                  href={href}
                  className={`px-4 py-2 text-sm tracking-[0.1em] uppercase font-medium transition-colors relative group ${
                    active ? "text-mil-gold" : "text-mil-text/70 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {label}
                  <span className={`absolute bottom-0 left-4 right-4 h-px bg-mil-gold transition-transform origin-left ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* CTA button */}
        <motion.div
          className="hidden md:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65, ease }}
        >
          <a
            href="https://invite.viber.com/?g=kUuxjNS7M1NsP9Gn7y4d5IVKle9h2dpN"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-mil-green-mid hover:bg-mil-green-light text-white text-xs tracking-[0.15em] uppercase font-semibold clip-corner-sm transition-all hover:scale-105"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Pridruži se
          </a>
        </motion.div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-mil-text origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-6 h-0.5 bg-mil-text"
          />
          <motion.span
            animate={open ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-mil-text origin-center"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden overflow-hidden bg-mil-card border-t border-mil-border"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }, i) => {
                const active = pathname === href;
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      className={`block px-4 py-3 text-sm tracking-[0.1em] uppercase font-medium border-l-2 transition-colors ${
                        active
                          ? "text-mil-gold border-mil-gold"
                          : "text-mil-text/70 border-transparent hover:text-white hover:border-mil-green-mid"
                      }`}
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                className="pt-2"
              >
                <a
                  href="https://invite.viber.com/?g=kUuxjNS7M1NsP9Gn7y4d5IVKle9h2dpN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-mil-green-mid text-white text-sm tracking-[0.15em] uppercase font-semibold text-center clip-corner-sm"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Pridruži se timu
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
