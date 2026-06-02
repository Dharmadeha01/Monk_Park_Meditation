"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  const headerAnim = reduce
    ? {}
    : {
        initial: { y: -10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, delay: 0.1, ease: "easeOut" as const },
      };
  const btnHover = reduce
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: { duration: 0.15 } };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLocale(next: "sv" | "en") {
    router.replace(pathname, { locale: next });
  }

  function scrollToForm(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById("register");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      const input = document.getElementById("f-name");
      if (input) input.focus();
    }, 520);
  }

  return (
    <motion.header
      {...headerAnim}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250,244,234,0.82)",
        backdropFilter: "saturate(1.1) blur(12px)",
        WebkitBackdropFilter: "saturate(1.1) blur(12px)",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
        boxShadow: scrolled ? "0 6px 20px rgba(42,33,24,0.05)" : "none",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div
        className="wrap"
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Brand */}
        <a
          href="#top"
          aria-label="Weekly Meditation — home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          {/* Real logo image */}
          <Image
            src="/ym_logo.png"
            alt="Yoga Monastery logo"
            width={44}
            height={44}
            style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            priority
          />
          <span
            className="brand-text"
            style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}
          >
            <span
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 19,
                fontVariationSettings: '"SOFT" 40, "opsz" 30',
                color: "var(--ink)",
              }}
            >
              Weekly Meditation
            </span>
            <span
              className="brand-sub"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                fontWeight: 700,
              }}
            >
              WITH YOGA MONASTERY
            </span>
          </span>
        </a>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Language toggle — always visible, no hamburger */}
          <div
            role="group"
            aria-label="Language"
            style={{
              display: "inline-flex",
              background: "var(--cream-deep)",
              border: "1px solid var(--hairline)",
              borderRadius: 999,
              padding: 3,
              gap: 2,
            }}
          >
            {(["sv", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={locale === l}
                onClick={() => switchLocale(l)}
                style={{
                  border: "none",
                  background: locale === l ? "var(--card)" : "transparent",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: locale === l ? "var(--ink)" : "var(--ink-soft)",
                  padding: "6px 12px",
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "color 0.15s ease, background 0.15s ease",
                  boxShadow: locale === l ? "var(--shadow-sm)" : "none",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Register button */}
          <motion.a
            {...btnHover}
            href="#register"
            onClick={scrollToForm}
            className="btn btn-primary"
            style={{ padding: "11px 22px", fontSize: 15 }}
          >
            <span className="reg-label">{t("register")}</span>
          </motion.a>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) { .brand-sub { display: none !important; } }
        @media (max-width: 560px) {
          .brand-text { display: none !important; }
          .reg-label { display: none !important; }
          .wrap { height: 64px !important; }
        }
      `}</style>
    </motion.header>
  );
}
