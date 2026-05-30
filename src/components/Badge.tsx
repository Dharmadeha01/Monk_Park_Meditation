"use client";

export function Badge({ size = 46, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--orange)" }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46.5" strokeWidth="2.4" />
      <circle cx="50" cy="50" r="41" strokeWidth="1" />
      <line x1="17" y1="63" x2="83" y2="63" strokeWidth="1.8" />
      <circle cx="50" cy="52" r="9" strokeWidth="1.8" />
      <line x1="60.3" y1="48.2" x2="64.6" y2="46.7" strokeWidth="1.8" />
      <line x1="56.3" y1="43.0" x2="58.9" y2="39.3" strokeWidth="1.8" />
      <line x1="50" y1="41" x2="50" y2="36.5" strokeWidth="1.8" />
      <line x1="43.7" y1="43.0" x2="41.1" y2="39.3" strokeWidth="1.8" />
      <line x1="39.7" y1="48.2" x2="35.4" y2="46.7" strokeWidth="1.8" />
      <path d="M29 63 V55 H39 V63" strokeWidth="1.8" />
      <path d="M26.5 55.5 L34 49.5 L41.5 55.5" strokeWidth="1.8" />
      <path d="M32.5 63 V58.5 H35.8 V63" strokeWidth="1.5" />
      <path d="M66 47 L59 63 H73 Z" strokeWidth="1.8" />
      <path d="M66 54 L61 60.5 M66 54 L71 60.5" strokeWidth="1.3" />
      <path d="M76 52 L71 63 H81 Z" strokeWidth="1.8" />
      <line x1="22" y1="67" x2="26" y2="67" strokeWidth="1.2" />
      <line x1="47" y1="68" x2="53" y2="68" strokeWidth="1.2" />
      <line x1="73" y1="67" x2="77" y2="67" strokeWidth="1.2" />
    </svg>
  );
}
