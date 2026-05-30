"use client";

import { useTranslations } from "next-intl";
import { FadeInView } from "./FadeInView";

type Props = { teacherImageUrl?: string; monasteryUrl?: string };

export function Teacher({ teacherImageUrl, monasteryUrl = "https://yogamonastery.org/" }: Props) {
  const t = useTranslations("teacher");

  return (
    <section className="section-pad" id="teacher" style={{ background: "var(--cream-deep)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "clamp(30px,5vw,70px)", alignItems: "center" }} className="teacher-grid">
          {/* Portrait */}
          <FadeInView>
            <div style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-md)",
              background: "var(--green-soft)",
              overflow: "hidden",
            }}>
              {teacherImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={teacherImageUrl} alt={t("name")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#d9ddcd" }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
              )}
            </div>
          </FadeInView>

          {/* Copy */}
          <FadeInView delay={0.1}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 }}>
                {t("role")}
              </div>
              <h2 style={{ fontSize: "clamp(32px,4vw,46px)", marginBottom: 18 }}>{t("name")}</h2>
              <p style={{ color: "var(--ink-soft)", fontSize: 17, marginBottom: 16 }}>{t("bio1")}</p>
              <p style={{ color: "var(--ink-soft)", fontSize: 17, marginBottom: 24 }}>{t("bio2")}</p>
              <a
                href={monasteryUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--orange)", fontWeight: 600, textDecoration: "none", fontSize: 15.5, transition: "gap 0.18s ease, color 0.18s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "11px"; (e.currentTarget as HTMLElement).style.color = "var(--orange-deep)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "7px"; (e.currentTarget as HTMLElement).style.color = "var(--orange)"; }}
              >
                <span>{t("linkLabel")}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </FadeInView>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .teacher-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .teacher-grid > div:first-child { aspect-ratio: 4/3; max-height: 420px; }
        }
      `}</style>
    </section>
  );
}
