"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function HeroForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverErr, setServerErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;
    if (!name.trim()) { setNameErr(true); valid = false; }
    if (!/\d{6,}/.test(phone.replace(/\s/g, ""))) { setPhoneErr(true); valid = false; }
    if (!valid) {
      const first = document.querySelector<HTMLInputElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), locale }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setServerErr(d.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerErr("Network error. Please try again.");
      setStatus("error");
    }
  }

  function reset() {
    setName(""); setPhone("");
    setNameErr(false); setPhoneErr(false);
    setStatus("idle"); setServerErr("");
  }

  const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  );

  return (
    <div style={{
      background: "var(--card)",
      borderRadius: "var(--radius-lg)",
      padding: "clamp(26px, 3vw, 38px)",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid rgba(255,255,255,0.6)",
      position: "relative",
    }}>
      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "14px 6px 8px" }} role="status" aria-live="polite">
          <svg width="76" height="76" viewBox="0 0 100 100" fill="none" stroke="var(--orange)" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 18px" }} aria-hidden="true">
            <circle cx="50" cy="50" r="30" strokeWidth="2.4" />
            <path d="M38 51 L46 59 L63 41" strokeWidth="3" />
            <g strokeWidth="2">
              <line x1="50" y1="8" x2="50" y2="15" />
              <line x1="50" y1="85" x2="50" y2="92" />
              <line x1="8" y1="50" x2="15" y2="50" />
              <line x1="85" y1="50" x2="92" y2="50" />
              <line x1="20.5" y1="20.5" x2="25.4" y2="25.4" />
              <line x1="74.6" y1="74.6" x2="79.5" y2="79.5" />
              <line x1="79.5" y1="20.5" x2="74.6" y2="25.4" />
              <line x1="25.4" y1="74.6" x2="20.5" y2="79.5" />
            </g>
          </svg>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 33px)", marginBottom: 10 }}>{t("successTitle")}</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 15.5, maxWidth: "30ch", margin: "0 auto 8px" }}>{t("successBody")}</p>
          <button
            onClick={reset}
            style={{ marginTop: 18, background: "none", border: "none", color: "var(--orange)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            {t("again")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--orange)", fontWeight: 600, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
            <SunIcon />
            <span>{t("eyebrow")}</span>
          </div>

          <h2 style={{ fontSize: "clamp(27px, 3vw, 34px)", marginBottom: 6 }}>{t("title")}</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 15.5, marginBottom: 22 }}>{t("sub")}</p>

          {/* Name */}
          <div style={{ marginBottom: 15 }}>
            <label htmlFor="f-name" style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 7 }}>
              {t("nameLabel")}
            </label>
            <input
              id="f-name"
              type="text"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => { setName(e.target.value); if (nameErr) setNameErr(false); }}
              aria-invalid={nameErr ? "true" : undefined}
              style={{
                width: "100%", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink)",
                background: "var(--cream)", border: `1.5px solid ${nameErr ? "#c0492b" : "var(--hairline)"}`,
                borderRadius: "var(--radius-sm)", padding: "14px 16px",
                outline: "none", transition: "border-color 0.18s, box-shadow 0.18s",
                boxShadow: nameErr ? "0 0 0 4px rgba(192,73,43,0.1)" : "none",
              }}
            />
            {nameErr && <p style={{ fontSize: 12.5, color: "#c0492b", marginTop: 6 }}>{t("nameError")}</p>}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="f-phone" style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 7 }}>
              {t("phoneLabel")}
            </label>
            <input
              id="f-phone"
              type="tel"
              autoComplete="tel"
              placeholder={t("phonePlaceholder")}
              value={phone}
              onChange={(e) => { setPhone(e.target.value); if (phoneErr) setPhoneErr(false); }}
              aria-invalid={phoneErr ? "true" : undefined}
              style={{
                width: "100%", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink)",
                background: "var(--cream)", border: `1.5px solid ${phoneErr ? "#c0492b" : "var(--hairline)"}`,
                borderRadius: "var(--radius-sm)", padding: "14px 16px",
                outline: "none", transition: "border-color 0.18s, box-shadow 0.18s",
                boxShadow: phoneErr ? "0 0 0 4px rgba(192,73,43,0.1)" : "none",
              }}
            />
            {phoneErr && <p style={{ fontSize: 12.5, color: "#c0492b", marginTop: 6 }}>{t("phoneError")}</p>}
          </div>

          {serverErr && (
            <p style={{ fontSize: 13, color: "#c0492b", marginBottom: 12, textAlign: "center" }}>{serverErr}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary btn-block"
            style={{ opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "…" : t("button")}
          </button>

          <p style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--ink-faint)", marginTop: 14, lineHeight: 1.45 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 1 }}>
              <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" />
            </svg>
            <span>{t("note")}</span>
          </p>
        </form>
      )}
    </div>
  );
}
