"use client";

import { useState } from "react";

const FALLBACK = "/hero.jpg";

/**
 * Full-bleed hero photo as a real <img> (not a CSS background), with normal
 * positive stacking so it always paints across browsers/build targets.
 * Falls back to /hero.jpg if the Sanity image URL ever fails to load.
 */
export function HeroImage({ src }: { src?: string }) {
  const [current, setCurrent] = useState(src && src.length ? src : FALLBACK);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority="high"
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        zIndex: 0,
      }}
    />
  );
}
