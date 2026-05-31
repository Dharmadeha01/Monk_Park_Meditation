"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = { monasteryUrl?: string; instagramUrl?: string };

export function Footer({
  monasteryUrl = "https://yogamonastery.org/",
  instagramUrl = "https://www.instagram.com/yoga.monastery/",
}: Props) {
  const t = useTranslations("footer");

  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "rgba(255,252,246,0.7)",
        paddingBlock: "clamp(46px,6vw,68px)",
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <Image
              src="/ym_logo.png"
              alt="Yoga Monastery logo"
              width={44}
              height={44}
              style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, opacity: 0.92 }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 19,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Weekly Meditation
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,252,246,0.45)",
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                WITH YOGA MONASTERY
              </div>
            </div>
          </div>

          {/* Links */}
          <nav style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
            <a
              href={monasteryUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,252,246,0.72)",
                textDecoration: "none",
                fontSize: 15,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--orange)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,252,246,0.72)";
              }}
            >
              {t("links.monastery")}
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,252,246,0.72)",
                textDecoration: "none",
                fontSize: 15,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--orange)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,252,246,0.72)";
              }}
            >
              {t("links.instagram")}
            </a>
          </nav>
        </div>

        <p
          style={{
            marginTop: 22,
            fontSize: 13,
            color: "rgba(255,252,246,0.4)",
          }}
        >
          {t("fine")}
        </p>
      </div>
    </footer>
  );
}
