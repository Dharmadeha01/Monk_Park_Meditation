"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FALLBACK = "/hero.jpg";

/**
 * Full-bleed hero photo as a real <img> (not a CSS background), with normal
 * positive stacking so it always paints across browsers/build targets.
 * Falls back to /hero.jpg if the Sanity image URL ever fails to load.
 * Fades in gently on first load (above the fold, so not scroll-triggered).
 */
export function HeroImage({ src }: { src?: string }) {
  const [current, setCurrent] = useState(src && src.length ? src : FALLBACK);
  const reduce = useReducedMotion();

  const style: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    zIndex: 0,
  };

  const onError = () => {
    if (current !== FALLBACK) setCurrent(FALLBACK);
  };

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={current}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        onError={onError}
        style={style}
      />
    );
  }

  return (
    <motion.img
      src={current}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority="high"
      onError={onError}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}
