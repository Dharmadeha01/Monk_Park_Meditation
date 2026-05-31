import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://meditation-monk-park.vercel.app";
  const metadataBase = new URL(siteUrl);

  const titles = {
    sv: "Meditation med en munk i parken",
    en: "Meditation with a Monk in a Park",
  };
  const descs = {
    sv: "En timme av stillhet varje torsdag kl 18:30 i Linköping. Gratis, öppet för alla.",
    en: "One hour of stillness every Thursday at 18:30 in Linköping. Free, open to all.",
  };

  const title = titles[locale as "sv" | "en"] || titles.en;
  const desc = descs[locale as "sv" | "en"] || descs.en;

  return {
    metadataBase,
    title,
    description: desc,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { sv: `${siteUrl}/sv`, en: `${siteUrl}/en` },
    },
    openGraph: {
      title,
      description: desc,
      url: `${siteUrl}/${locale}`,
      siteName: "Meditation with a Monk in a Park",
      locale,
      type: "website",
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "sv" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:wght@400;500;600;700&display=swap&subset=latin,latin-ext"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
