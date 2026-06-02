"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Variants;
};

export function FadeInView({
  children,
  delay = 0,
  className = "",
  variants = fadeUp,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
