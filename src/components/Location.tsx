import { useTranslations } from "next-intl";
import { FadeInView } from "./FadeInView";

type Props = { location: { lead: string; mapEmbedSrc?: string } };

export function Location({ location }: Props) {
  const t = useTranslations("location");
  const { lead, mapEmbedSrc } = location;

  return (
    <section className="section-pad" id="location" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <FadeInView>
          <div className="section-head">
            <span className="kicker">{t("kicker")}</span>
            <h2>{t("h2")}</h2>
            <p className="lead">{lead}</p>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div style={{
            marginTop: "clamp(28px,4vw,40px)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--hairline)",
            position: "relative",
            aspectRatio: "16/7",
          }}>
            {mapEmbedSrc ? (
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            ) : (
              /* Decorative placeholder map */
              <>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `
                    radial-gradient(60% 80% at 30% 40%, rgba(94,115,85,0.18), transparent 70%),
                    linear-gradient(180deg, #eef1e6 0%, #e3e9d8 100%)
                  `,
                }} />
                <svg
                  viewBox="0 0 800 350"
                  fill="none"
                  stroke="#c4cdb4"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }}
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <path d="M-20 90 Q200 70 380 140 T820 130" strokeWidth="10" />
                  <path d="M120 -20 Q150 160 90 380" strokeWidth="8" />
                  <path d="M620 -20 Q580 170 660 380" strokeWidth="8" />
                  <path d="M-20 250 Q300 230 820 270" strokeWidth="6" strokeDasharray="2 14" strokeLinecap="round" />
                  <circle cx="400" cy="175" r="120" stroke="#bcccac" strokeWidth="3" strokeDasharray="3 12" />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)", textAlign: "center", color: "var(--orange)" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.6" />
                  </svg>
                  <span style={{ marginTop: 8, background: "var(--card)", color: "var(--ink)", fontSize: 13.5, fontWeight: 600, padding: "7px 14px", borderRadius: 999, boxShadow: "var(--shadow-sm)", whiteSpace: "nowrap", display: "inline-block", transform: "translateX(-50%)", position: "absolute", left: "50%", top: "100%" }}>
                    {t("pinLabel")}
                  </span>
                </div>
              </>
            )}

            {/* "Same spot every week" pill */}
            <div style={{
              position: "absolute", left: 18, bottom: 18,
              background: "rgba(255,252,246,0.92)",
              backdropFilter: "blur(4px)",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--ink)",
              boxShadow: "var(--shadow-sm)",
            }}>
              {t("mapNote")}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
