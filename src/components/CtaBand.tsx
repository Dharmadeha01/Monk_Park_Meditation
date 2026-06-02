"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./FadeInView";

type Props = { cta: { h2: string; button: string } };

export function CtaBand({ cta }: Props) {
  const t = useTranslations("cta");
  const reduce = useReducedMotion();
  const btnHover = reduce
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: { duration: 0.15 } };

  return (
    <section style={{ background: "var(--orange)", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Sunburst decoration */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        aria-hidden="true"
        style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", width: 320, height: 320, color: "rgba(255,255,255,0.16)", pointerEvents: "none" }}
      >
        <circle cx="50" cy="50" r="20" />
        <line x1="50" y1="6" x2="50" y2="20" /><line x1="50" y1="80" x2="50" y2="94" />
        <line x1="6" y1="50" x2="20" y2="50" /><line x1="80" y1="50" x2="94" y2="50" />
        <line x1="19" y1="19" x2="29" y2="29" /><line x1="71" y1="71" x2="81" y2="81" />
        <line x1="81" y1="19" x2="71" y2="29" /><line x1="29" y1="71" x2="19" y2="81" />
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
          <line key={deg} x1="50" y1="12" x2="50" y2="20" transform={`rotate(${deg} 50 50)`} />
        ))}
      </svg>

      <div className="wrap" style={{ paddingBlock: "clamp(56px,8vw,92px)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeInView>
          <span className="kicker" style={{ color: "rgba(255,255,255,0.85)", justifyContent: "center", display: "inline-flex" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 26, height: 1.5, background: "rgba(255,255,255,0.7)", opacity: 1, display: "inline-block" }} />
              {t("kicker")}
            </span>
          </span>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(34px,5vw,60px)",
              margin: "16px auto 28px",
              maxWidth: "16ch",
            }}
          >
            {cta.h2}
          </h2>
        </FadeInView>
        <FadeInView delay={0.1}>
          <motion.a
            {...btnHover}
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("register");
              if (!el) return;
              const top = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="btn btn-primary"
            style={{ background: "var(--cream)", color: "var(--ink)", boxShadow: "0 8px 22px rgba(42,33,24,0.22)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--cream)"; }}
          >
            {cta.button}
          </motion.a>
        </FadeInView>
      </div>
    </section>
  );
}
