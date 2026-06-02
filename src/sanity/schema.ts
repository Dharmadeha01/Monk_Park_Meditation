export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // Hero
    { name: "heroTitleSv", title: "Hero Title (SV)", type: "string" },
    { name: "heroTitleEn", title: "Hero Title (EN)", type: "string" },
    { name: "heroTaglineSv", title: "Hero Tagline (SV)", type: "string" },
    { name: "heroTaglineEn", title: "Hero Tagline (EN)", type: "string" },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    // Event facts
    { name: "eventDaySv", title: "Event Day (SV)", type: "string" },
    { name: "eventDayEn", title: "Event Day (EN)", type: "string" },
    { name: "eventTime", title: "Event Time", type: "string" },
    { name: "eventPlaceSv", title: "Event Place (SV)", type: "string" },
    { name: "eventPlaceEn", title: "Event Place (EN)", type: "string" },
    { name: "eventPriceSv", title: "Event Price (SV)", type: "string" },
    { name: "eventPriceEn", title: "Event Price (EN)", type: "string" },
    // About
    { name: "aboutIntroSv", title: "About Intro (SV)", type: "text" },
    { name: "aboutIntroEn", title: "About Intro (EN)", type: "text" },
    {
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          title: "Step",
          fields: [
            { name: "titleSv", title: "Title (SV)", type: "string" },
            { name: "titleEn", title: "Title (EN)", type: "string" },
            { name: "descSv", title: "Description (SV)", type: "text" },
            { name: "descEn", title: "Description (EN)", type: "text" },
          ],
          preview: {
            select: { title: "titleEn" },
            prepare: ({ title }: { title: string }) => ({ title: title || "Untitled step" }),
          },
        },
      ],
    },
    { name: "bringHeadingSv", title: "Bring Heading (SV)", type: "string" },
    { name: "bringHeadingEn", title: "Bring Heading (EN)", type: "string" },
    {
      name: "bringItems",
      title: "Bring Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "bringItem",
          title: "Bring Item",
          fields: [
            { name: "textSv", title: "Text (SV)", type: "string" },
            { name: "textEn", title: "Text (EN)", type: "string" },
          ],
          preview: {
            select: { title: "textEn" },
            prepare: ({ title }: { title: string }) => ({ title: title || "Untitled item" }),
          },
        },
      ],
    },
    { name: "donationNoteSv", title: "Donation Note (SV)", type: "text" },
    { name: "donationNoteEn", title: "Donation Note (EN)", type: "text" },
    // Teacher
    { name: "teacherName", title: "Teacher Name", type: "string" },
    { name: "teacherBioSv", title: "Teacher Bio (SV)", type: "text" },
    { name: "teacherBioEn", title: "Teacher Bio (EN)", type: "text" },
    { name: "teacherImage", title: "Teacher Image", type: "image", options: { hotspot: true } },
    { name: "teacherLinkLabelSv", title: "Teacher Link Label (SV)", type: "string" },
    { name: "teacherLinkLabelEn", title: "Teacher Link Label (EN)", type: "string" },
    { name: "teacherLinkUrl", title: "Teacher Link URL", type: "url" },
    // Location
    { name: "locationTextSv", title: "Location Text (SV)", type: "text" },
    { name: "locationTextEn", title: "Location Text (EN)", type: "text" },
    { name: "mapEmbedSrc", title: "Map Embed URL", type: "string" },
    // Form
    { name: "formTitleSv", title: "Form Title (SV)", type: "string" },
    { name: "formTitleEn", title: "Form Title (EN)", type: "string" },
    { name: "formNameLabelSv", title: "Form Name Label (SV)", type: "string" },
    { name: "formNameLabelEn", title: "Form Name Label (EN)", type: "string" },
    { name: "formPhoneLabelSv", title: "Form Phone Label (SV)", type: "string" },
    { name: "formPhoneLabelEn", title: "Form Phone Label (EN)", type: "string" },
    { name: "formButtonSv", title: "Form Button (SV)", type: "string" },
    { name: "formButtonEn", title: "Form Button (EN)", type: "string" },
    { name: "formSuccessSv", title: "Form Success (SV)", type: "string" },
    { name: "formSuccessEn", title: "Form Success (EN)", type: "string" },
    { name: "formNoteSv", title: "Form Note (SV)", type: "string" },
    { name: "formNoteEn", title: "Form Note (EN)", type: "string" },
    // FAQ
    {
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            { name: "questionSv", title: "Question (SV)", type: "string" },
            { name: "questionEn", title: "Question (EN)", type: "string" },
            { name: "answerSv", title: "Answer (SV)", type: "text" },
            { name: "answerEn", title: "Answer (EN)", type: "text" },
          ],
          preview: {
            select: { title: "questionEn" },
            prepare: ({ title }: { title: string }) => ({ title: title || "Untitled FAQ" }),
          },
        },
      ],
    },
    // CTA
    { name: "closingCtaTextSv", title: "Closing CTA Text (SV)", type: "string" },
    { name: "closingCtaTextEn", title: "Closing CTA Text (EN)", type: "string" },
    { name: "closingCtaButtonSv", title: "Closing CTA Button (SV)", type: "string" },
    { name: "closingCtaButtonEn", title: "Closing CTA Button (EN)", type: "string" },
    // Social
    { name: "instagramUrl", title: "Instagram URL", type: "url" },
    { name: "monasteryUrl", title: "Monastery URL", type: "url" },
  ],
};
