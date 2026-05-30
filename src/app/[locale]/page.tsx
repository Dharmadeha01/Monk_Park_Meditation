import { getSiteSettings, loc } from "@/sanity/queries";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Teacher } from "@/components/Teacher";
import { Location } from "@/components/Location";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Teacher
          teacherImageUrl={settings?.teacherImageUrl}
          monasteryUrl={settings?.monasteryUrl || loc(settings, "monasteryUrl", locale) || "https://yogamonastery.org/"}
        />
        <Location mapEmbedSrc={settings?.mapEmbedSrc} />
        <FAQ />
        <CtaBand />
      </main>
      <Footer
        monasteryUrl={settings?.monasteryUrl || "https://yogamonastery.org/"}
        instagramUrl={settings?.instagramUrl || "https://www.instagram.com/yoga.monastery/"}
      />
    </>
  );
}
