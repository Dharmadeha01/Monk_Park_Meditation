"use client";

import { useTranslations } from "next-intl";
import { FadeInView } from "./FadeInView";

const icons = {
  mantra: (
    <svg className="phase-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 27 Q24 42 40 27" /><path d="M7 27 Q24 34 41 27" />
      <path d="M14 18 Q17 14 14 10" /><path d="M20 16 Q24 11 20 6" />
    </svg>
  ),
  meditation: (
    <svg className="phase-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="13" r="4.6" /><path d="M13 39 C15 27 33 27 35 39" /><path d="M15 33 Q24 29 33 33" />
    </svg>
  ),
  tea: (
    <svg className="phase-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 23 H34 L32 39 Q31.5 41 29.5 41 H15.5 Q13.5 41 13 39 Z" />
      <path d="M34 26 Q40 27 38 33 Q37 36 33 36" />
      <path d="M19 19 Q22 15 19 11" /><path d="M27 19 Q30 15 27 11" />
    </svg>
  ),
};

type AboutProps = {
  about: {
    lead: string;
    steps: { dur: string; title: string; desc: string }[];
    bringHeading: string;
    bringItems: string[];
    donationNote: string;
  };
};

export function About({ about }: AboutProps) {
  const t = useTranslations("about");

  const iconList = [icons.mantra, icons.meditation, icons.tea];

  return (
    <section className="section-pad" id="about" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <FadeInView>
          <div className="section-head center">
            <span className="kicker">{t("kicker")}</span>
            <h2>{t("h2")}</h2>
            <p className="lead">{about.lead}</p>
          </div>
        </FadeInView>

        {/* Phase cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(18px,2.4vw,28px)", alignItems: "stretch" }} className="phase-grid">
          {about.steps.map((s, i) => {
            const icon = iconList[i] ?? iconList[0];
            return (
              <FadeInView key={i} delay={i * 0.08}>
                <div
                  style={{
                    background: "var(--card)", border: "1px solid var(--hairline)",
                    borderRadius: "var(--radius)", padding: "clamp(26px,3vw,34px)",
                    boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column",
                    height: "100%", transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  <div style={{ width: 56, height: 56, color: "var(--orange)", marginBottom: 20 }}>{icon}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green)", marginBottom: 7 }}>
                    {s.dur}
                  </span>
                  <h3 style={{ fontSize: 23, marginBottom: 9 }}>{s.title}</h3>
                  <p style={{ color: "var(--ink-soft)", fontSize: 15.5, marginTop: "auto" }}>{s.desc}</p>
                </div>
              </FadeInView>
            );
          })}
        </div>

        {/* About foot */}
        <FadeInView delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "clamp(20px,3vw,40px)", marginTop: "clamp(34px,4vw,52px)", alignItems: "center" }} className="about-foot">
            {/* What to bring */}
            <div>
              <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 400, fontSize: 21, marginBottom: 14 }}>{about.bringHeading}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {about.bringItems.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: "var(--ink-soft)" }}>
                    {i === 0 ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="9" width="18" height="9" rx="3" /><path d="M6 9V7.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V9M6.5 18v2M17.5 18v2" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 4 5 6.5 6.5 12 5 21h14l-1.5-9L19 6.5 15 4l-3 2.5L9 4Z" /><path d="M9 4l3 3 3-3" />
                      </svg>
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Donation */}
            <div style={{ background: "var(--green-soft)", borderRadius: "var(--radius)", padding: "24px 26px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-head)", fontSize: 19, color: "var(--green)", marginBottom: 6 }}>
                {t("donationFreeTag")}
              </span>
              <p style={{ color: "#3f4d39", fontSize: 15 }}>{about.donationNote}</p>
            </div>
          </div>
        </FadeInView>
      </div>

      <style>{`
        @media (max-width: 720px) { .phase-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) { .about-foot { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
