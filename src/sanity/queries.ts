import { sanityClient } from "./client";

export type SiteSettings = {
  heroTitleSv?: string; heroTitleEn?: string;
  heroTaglineSv?: string; heroTaglineEn?: string;
  heroImageUrl?: string;
  eventDaySv?: string; eventDayEn?: string;
  eventTime?: string;
  eventPlaceSv?: string; eventPlaceEn?: string;
  eventPriceSv?: string; eventPriceEn?: string;
  aboutIntroSv?: string; aboutIntroEn?: string;
  steps?: Array<{ _key: string; titleSv: string; titleEn: string; descSv: string; descEn: string }>;
  bringHeadingSv?: string; bringHeadingEn?: string;
  bringItems?: Array<{ _key: string; textSv: string; textEn: string }>;
  donationNoteSv?: string; donationNoteEn?: string;
  teacherName?: string;
  teacherBioSv?: string; teacherBioEn?: string;
  teacherImageUrl?: string;
  teacherLinkLabelSv?: string; teacherLinkLabelEn?: string;
  teacherLinkUrl?: string;
  locationTextSv?: string; locationTextEn?: string;
  mapEmbedSrc?: string;
  formTitleSv?: string; formTitleEn?: string;
  formNameLabelSv?: string; formNameLabelEn?: string;
  formPhoneLabelSv?: string; formPhoneLabelEn?: string;
  formButtonSv?: string; formButtonEn?: string;
  formSuccessSv?: string; formSuccessEn?: string;
  formNoteSv?: string; formNoteEn?: string;
  faq?: Array<{ _key: string; questionSv: string; questionEn: string; answerSv: string; answerEn: string }>;
  closingCtaTextSv?: string; closingCtaTextEn?: string;
  closingCtaButtonSv?: string; closingCtaButtonEn?: string;
  instagramUrl?: string;
  monasteryUrl?: string;
};

// Falls back to draft if no published version exists yet
const SITE_SETTINGS_QUERY = `*[_id in ["siteSettings", "drafts.siteSettings"]] | order(_id asc) [0]{
  heroTitleSv, heroTitleEn,
  heroTaglineSv, heroTaglineEn,
  "heroImageUrl": heroImage.asset->url,
  eventDaySv, eventDayEn, eventTime,
  eventPlaceSv, eventPlaceEn,
  eventPriceSv, eventPriceEn,
  aboutIntroSv, aboutIntroEn,
  steps[]{ _key, titleSv, titleEn, descSv, descEn },
  bringHeadingSv, bringHeadingEn,
  bringItems[]{ _key, textSv, textEn },
  donationNoteSv, donationNoteEn,
  teacherName,
  teacherBioSv, teacherBioEn,
  "teacherImageUrl": teacherImage.asset->url,
  teacherLinkLabelSv, teacherLinkLabelEn, teacherLinkUrl,
  locationTextSv, locationTextEn,
  mapEmbedSrc,
  formTitleSv, formTitleEn,
  formNameLabelSv, formNameLabelEn,
  formPhoneLabelSv, formPhoneLabelEn,
  formButtonSv, formButtonEn,
  formSuccessSv, formSuccessEn,
  formNoteSv, formNoteEn,
  faq[]{ _key, questionSv, questionEn, answerSv, answerEn },
  closingCtaTextSv, closingCtaTextEn,
  closingCtaButtonSv, closingCtaButtonEn,
  instagramUrl, monasteryUrl
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["settings"] } }
    );
  } catch {
    return null;
  }
}

export function loc(settings: SiteSettings | null, field: string, locale: string): string {
  if (!settings) return "";
  const svKey = `${field}Sv` as keyof SiteSettings;
  const enKey = `${field}En` as keyof SiteSettings;
  if (locale === "sv") {
    return (settings[svKey] as string) || (settings[enKey] as string) || "";
  }
  return (settings[enKey] as string) || (settings[svKey] as string) || "";
}
