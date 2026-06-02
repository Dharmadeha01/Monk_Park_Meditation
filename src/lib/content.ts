import { getTranslations } from "next-intl/server";
import { getSiteSettings, loc, type SiteSettings } from "@/sanity/queries";

/**
 * Builds the fully-localized content for the page by merging Sanity's
 * siteSettings (editable in Studio) over the next-intl message files
 * (hardcoded fallback). A Sanity field wins whenever it is non-empty;
 * otherwise the message-file value is used, so the site always renders.
 */
export type PageContent = {
  hero: {
    title: string;
    tagline: string;
    pills: { day: string; time: string; place: string; price: string };
  };
  form: {
    title: string;
    nameLabel: string;
    phoneLabel: string;
    button: string;
    success: string;
    note: string;
  };
  about: {
    lead: string;
    steps: { dur: string; title: string; desc: string }[];
    bringHeading: string;
    bringItems: string[];
    donationNote: string;
  };
  teacher: {
    name: string;
    bio: string[];
    linkLabel: string;
    imageUrl?: string;
    monasteryUrl: string;
  };
  location: { lead: string; mapEmbedSrc?: string };
  faq: { items: { q: string; a: string }[] };
  cta: { h2: string; button: string };
  footer: { monasteryUrl: string; instagramUrl: string };
};

export async function getPageContent(locale: string): Promise<PageContent> {
  const settings = await getSiteSettings();
  const t = await getTranslations({ locale });

  // Sanity value (if non-empty) else the next-intl fallback string.
  const pick = (field: string, fallbackKey: string) =>
    loc(settings, field, locale) || t(fallbackKey);

  const s = settings as SiteSettings | null;

  // Steps: prefer Sanity array, fall back to message array.
  const fallbackSteps = t.raw("about.steps") as {
    dur: string;
    title: string;
    desc: string;
  }[];
  const steps =
    s?.steps && s.steps.length
      ? s.steps.map((step, i) => ({
          dur: fallbackSteps[i]?.dur ?? "20 min",
          title:
            (locale === "sv" ? step.titleSv : step.titleEn) ||
            (locale === "sv" ? step.titleEn : step.titleSv) ||
            fallbackSteps[i]?.title ||
            "",
          desc:
            (locale === "sv" ? step.descSv : step.descEn) ||
            (locale === "sv" ? step.descEn : step.descSv) ||
            fallbackSteps[i]?.desc ||
            "",
        }))
      : fallbackSteps;

  const fallbackBring = t.raw("about.bringItems") as string[];
  const bringItems =
    s?.bringItems && s.bringItems.length
      ? s.bringItems.map(
          (b, i) =>
            (locale === "sv" ? b.textSv : b.textEn) ||
            (locale === "sv" ? b.textEn : b.textSv) ||
            fallbackBring[i] ||
            ""
        )
      : fallbackBring;

  const fallbackFaq = t.raw("faq.items") as { q: string; a: string }[];
  const faqItems =
    s?.faq && s.faq.length
      ? s.faq.map((f, i) => ({
          q:
            (locale === "sv" ? f.questionSv : f.questionEn) ||
            (locale === "sv" ? f.questionEn : f.questionSv) ||
            fallbackFaq[i]?.q ||
            "",
          a:
            (locale === "sv" ? f.answerSv : f.answerEn) ||
            (locale === "sv" ? f.answerEn : f.answerSv) ||
            fallbackFaq[i]?.a ||
            "",
        }))
      : fallbackFaq;

  // Teacher bio: Sanity stores a single field; split on blank lines into paragraphs.
  const sanityBio = loc(s, "teacherBio", locale);
  const bio = sanityBio
    ? sanityBio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [t("teacher.bio1"), t("teacher.bio2")];

  return {
    hero: {
      title: pick("heroTitle", "hero.h1"),
      tagline: pick("heroTagline", "hero.tagline"),
      pills: {
        day: pick("eventDay", "hero.pills.day"),
        time: s?.eventTime || t("hero.pills.time"),
        place: pick("eventPlace", "hero.pills.place"),
        price: pick("eventPrice", "hero.pills.price"),
      },
    },
    form: {
      title: pick("formTitle", "form.title"),
      nameLabel: pick("formNameLabel", "form.nameLabel"),
      phoneLabel: pick("formPhoneLabel", "form.phoneLabel"),
      button: pick("formButton", "form.button"),
      success: pick("formSuccess", "form.successTitle"),
      note: pick("formNote", "form.note"),
    },
    about: {
      lead: pick("aboutIntro", "about.lead"),
      steps,
      bringHeading: pick("bringHeading", "about.bringHeading"),
      bringItems,
      donationNote: pick("donationNote", "about.donationNote"),
    },
    teacher: {
      name: s?.teacherName || t("teacher.name"),
      bio,
      linkLabel: pick("teacherLinkLabel", "teacher.linkLabel"),
      imageUrl: s?.teacherImageUrl,
      monasteryUrl:
        s?.teacherLinkUrl || s?.monasteryUrl || "https://yogamonastery.org/",
    },
    location: {
      lead: pick("locationText", "location.lead"),
      mapEmbedSrc: s?.mapEmbedSrc || undefined,
    },
    faq: { items: faqItems },
    cta: {
      h2: pick("closingCtaText", "cta.h2"),
      button: pick("closingCtaButton", "cta.button"),
    },
    footer: {
      monasteryUrl: s?.monasteryUrl || "https://yogamonastery.org/",
      instagramUrl:
        s?.instagramUrl || "https://www.instagram.com/yoga.monastery/",
    },
  };
}
