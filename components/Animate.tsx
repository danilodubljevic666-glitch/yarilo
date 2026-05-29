"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { usePreloaderDone } from "@/context/PreloaderContext";

const variants: Record<string, Variants> = {
  fadeIn:    { hidden: { opacity: 0 },                          visible: { opacity: 1 } },
  slideUp:   { hidden: { opacity: 0, y: 48 },                  visible: { opacity: 1, y: 0 } },
  slideDown: { hidden: { opacity: 0, y: -32 },                 visible: { opacity: 1, y: 0 } },
  slideLeft: { hidden: { opacity: 0, x: -48 },                 visible: { opacity: 1, x: 0 } },
  slideRight:{ hidden: { opacity: 0, x: 48 },                  visible: { opacity: 1, x: 0 } },
  scaleIn:   { hidden: { opacity: 0, scale: 0.88 },            visible: { opacity: 1, scale: 1 } },
  scaleUp:   { hidden: { opacity: 0, scale: 0.94, y: 20 },     visible: { opacity: 1, scale: 1, y: 0 } },
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AnimateProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Animate({
  children,
  variant = "slideUp",
  delay = 0,
  duration = 0.65,
  className,
  once = true,
}: AnimateProps) {
  const { done } = usePreloaderDone();

  return (
    <motion.div
      initial="hidden"
      // Only enable viewport-based animation after preloader exits
      whileInView={done ? "visible" : undefined}
      viewport={done ? { once, margin: "-60px" } : undefined}
      variants={variants[variant]}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0,
  once = true,
}: StaggerProps) {
  const { done } = usePreloaderDone();

  return (
    <motion.div
      initial="hidden"
      whileInView={done ? "visible" : undefined}
      viewport={done ? { once, margin: "-50px" } : undefined}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  duration?: number;
}

export function StaggerItem({ children, className, variant = "slideUp", duration = 0.55 }: StaggerItemProps) {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{ duration, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  scale?: number;
}

export function HoverCard({ children, scale = 1.02, className, ...props }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children, className }: { children: ReactNode; className?: string }) {
  const { done } = usePreloaderDone();

  return (
    <motion.section
      initial="hidden"
      whileInView={done ? "visible" : undefined}
      viewport={done ? { once: true, margin: "-80px" } : undefined}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
