"use client";

import { motion } from "framer-motion";

const LUXURY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade";
  amount?: number;
}

export const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.12,
}: ScrollRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: direction === "up" ? 22 : 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount, margin: "-40px 0px" }}
    transition={{ duration: 0.55, delay, ease: LUXURY_EASE }}
  >
    {children}
  </motion.div>
);
