import { setRequestLocale } from "next-intl/server";
import { getPageContent } from "@/lib/content";
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

  // Required without middleware — tells next-intl the locale for this request
  setRequestLocale(locale);

  const content = await getPageContent(locale);

  return (
    <>
      <Header />
      <main id="top">
        <Hero hero={content.hero} form={content.form} />
        <About about={content.about} />
        <Teacher teacher={content.teacher} />
        <Location location={content.location} />
        <FAQ faq={content.faq} />
        <CtaBand cta={content.cta} />
      </main>
      <Footer
        monasteryUrl={content.footer.monasteryUrl}
        instagramUrl={content.footer.instagramUrl}
      />
    </>
  );
}
