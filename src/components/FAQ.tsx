"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeInView } from "./FadeInView";
import { fadeUp } from "@/lib/animations";

type Props = { faq: { items: { q: string; a: string }[] } };

// Slightly tighter stagger than the shared container (spec: 0.08s for FAQ).
const faqContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function FAQ({ faq }: Props) {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<number | null>(null);
  const items = faq.items;
  const reduce = useReducedMotion();

  // motion.div with no animation props (reduced motion) renders static.
  const listProps = reduce
    ? {}
    : {
        variants: faqContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-60px" },
      };
  const itemProps = reduce ? {} : { variants: fadeUp };

  return (
    <section className="section-pad" id="faq" style={{ background: "var(--cream-deep)" }}>
      <div className="wrap">
        <FadeInView>
          <div className="section-head center">
            <span className="kicker">{t("kicker")}</span>
            <h2>{t("h2")}</h2>
          </div>
        </FadeInView>

        <motion.div {...listProps} style={{ maxWidth: 760, marginInline: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((item, i) => {
            const isOpen = openId === i;
            return (
              <motion.div key={i} {...itemProps}>
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--hairline)",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    boxShadow: isOpen ? "var(--shadow-sm)" : "none",
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : i)}
                    style={{
                      width: "100%", background: "none", border: "none", textAlign: "left",
                      fontFamily: "var(--font-head)", fontWeight: 400,
                      fontSize: "clamp(19px,2.2vw,23px)", color: "var(--ink)",
                      padding: "clamp(20px,2.4vw,28px) clamp(22px,3vw,32px)",
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: 18,
                    }}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <svg
                      width="26" height="26"
                      viewBox="0 0 24 24" fill="none" stroke="var(--orange)"
                      strokeWidth="2.2" strokeLinecap="round"
                      style={{ flex: "none", transition: "transform 0.25s ease", transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>

                  {reduce ? (
                    isOpen && (
                      <div style={{ padding: "0 clamp(22px,3vw,32px) clamp(22px,2.6vw,28px)", color: "var(--ink-soft)", fontSize: 16.5 }}>
                        {item.a}
                      </div>
                    )
                  ) : (
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ padding: "0 clamp(22px,3vw,32px) clamp(22px,2.6vw,28px)", color: "var(--ink-soft)", fontSize: 16.5 }}>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
