"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { HeroForm } from "./HeroForm";
import { HeroImage } from "./HeroImage";

type HeroProps = {
  hero: {
    title: string;
    tagline: string;
    imageUrl?: string;
    pills: { day: string; time: string; place: string; price: string };
  };
  form: {
    title: string;
    nameLabel: string;
    phoneLabel: string;
    button: string;
    success: string;
    note: string;
  };
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ hero, form }: HeroProps) {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  // Above-the-fold load animation: fadeUp with a per-element delay.
  // When reduced motion is on, returns no animation props (renders static).
  const up = (delay: number, duration = 0.6) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: EASE },
        };

  const cardAnim = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, delay: 0.4, ease: EASE },
      };

  const pills = [
    {
      label: hero.pills.day,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" />
        </svg>
      ),
    },
    {
      label: hero.pills.time,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
        </svg>
      ),
    },
    {
      label: hero.pills.place,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.6" />
        </svg>
      ),
    },
    {
      label: hero.pills.price,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="register"
      style={{
        position: "relative",
        paddingBlock: "clamp(32px,5vw,64px) clamp(36px,5.5vw,72px)",
        overflow: "hidden",
      }}
    >
      {/* Layer order via DOM order, all at z-index 0 (no negative z-index,
          no isolation) so the photo paints reliably in every browser. */}
      {/* 1. Dappled forest-sunrise gradient — also the fallback if the photo fails */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `
            radial-gradient(120% 90% at 78% 18%, rgba(243,178,92,0.55) 0%, rgba(243,178,92,0) 46%),
            radial-gradient(80% 70% at 85% 8%, rgba(232,104,26,0.42) 0%, rgba(232,104,26,0) 40%),
            linear-gradient(180deg, #cdd6bd 0%, #b7c5a4 38%, #93a77f 72%, #6f855f 100%)
          `,
        }}
      />
      {/* 2. Hero photo (Sanity-editable, falls back to /hero.jpg) — fades in on load */}
      <HeroImage src={hero.imageUrl} />
      {/* 3. Legibility scrim */}
      <div
        aria-hidden="true"
        className="hero-scrim"
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `
            linear-gradient(180deg, rgba(250,244,234,0.35) 0%, rgba(250,244,234,0) 30%),
            linear-gradient(105deg, rgba(42,33,24,0.40) 0%, rgba(42,33,24,0.16) 42%, rgba(42,33,24,0) 68%)
          `,
        }}
      />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          alignItems: "center",
          gap: "clamp(28px,4vw,64px)",
        }}
          className="hero-grid"
        >
          {/* Copy */}
          <div style={{ color: "#fff", maxWidth: 600 }}>
            <motion.span
              {...up(0.2)}
              className="kicker"
              style={{ color: "#ffe6cf", marginBottom: 16, display: "inline-flex" }}
            >
              {t("kicker")}
            </motion.span>
            <motion.h1
              {...up(0.35, 0.8)}
              style={{
                fontSize: "clamp(34px,8vw,74px)",
                fontVariationSettings: '"SOFT" 60, "WONK" 0, "opsz" 130',
                color: "#fff",
                textShadow: "0 2px 24px rgba(42,33,24,0.28)",
                marginBottom: 18,
              }}
            >
              {hero.title}
            </motion.h1>
            <motion.p
              {...up(0.5)}
              style={{
                fontSize: "clamp(17px,2vw,21px)",
                color: "rgba(255,255,255,0.94)",
                maxWidth: "30ch",
                marginBottom: 26,
                textShadow: "0 1px 10px rgba(42,33,24,0.3)",
              }}
            >
              {hero.tagline}
            </motion.p>
            {/* Pills */}
            <motion.div {...up(0.6)} style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {pills.map(({ label, icon }) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,252,246,0.92)",
                    color: "var(--ink)",
                    borderRadius: 999,
                    padding: "9px 15px",
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: "var(--shadow-sm)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span style={{ color: "var(--orange)", display: "flex" }}>{icon}</span>
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Registration card — gently settles into place */}
          <motion.div {...cardAnim}>
            <HeroForm content={form} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          /* The angled scrim only darkens the top-left corner, which leaves the
             white copy unreadable over the brighter parts of the photo once the
             layout stacks. Add a top-down dark wash over the copy column. */
          .hero-scrim {
            background:
              linear-gradient(180deg, rgba(42,33,24,0.55) 0%, rgba(42,33,24,0.30) 38%, rgba(42,33,24,0.05) 64%, rgba(42,33,24,0) 100%) !important;
          }
        }
      `}</style>
    </section>
  );
}
