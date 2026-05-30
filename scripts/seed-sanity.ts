import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("Seeding siteSettings...");

  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",

    // Hero
    heroTitleSv: "Meditation med en munk i parken",
    heroTitleEn: "Meditation with a Monk in a Park",
    heroTaglineSv: "Tryck paus på veckan. Sätt dig i gräset, andas, och känn något äkta — tillsammans.",
    heroTaglineEn: "Press pause on the week. Sit down in the grass, breathe, and feel something real — together.",

    // Event facts
    eventDaySv: "Varje torsdag",
    eventDayEn: "Every Thursday",
    eventTime: "18:30",
    eventPlaceSv: "En park i Linköping",
    eventPlaceEn: "A park in Linköping",
    eventPriceSv: "Gratis",
    eventPriceEn: "Free",

    // About
    aboutIntroSv: "En timme för att sakta ner. Ingen erfarenhet krävs, inga speciella kläder — kom precis som du är. Ta gärna med en vän.",
    aboutIntroEn: "One hour to slow down. No experience needed, no special clothes — come exactly as you are. Bring a friend if you like.",

    steps: [
      {
        _key: "step-1",
        titleSv: "Musik & mantra",
        titleEn: "Music & mantra",
        descSv: "Vi öppnar med levande musik och enkel sång för att stilla sinnet.",
        descEn: "We open with live music and simple chant to settle the mind.",
      },
      {
        _key: "step-2",
        titleSv: "Tyst meditation",
        titleEn: "Silent meditation",
        descSv: "Vägledd till stillhet, sedan tysta tillsammans under träden.",
        descEn: "Guided into stillness, then quiet together beneath the trees.",
      },
      {
        _key: "step-3",
        titleSv: "Te & fika",
        titleEn: "Tea & fika",
        descSv: "Vi avslutar med varmt te, något sött och lätt samtal.",
        descEn: "We close with warm tea, something sweet, and easy conversation.",
      },
    ],

    bringHeadingSv: "Ta med dig",
    bringHeadingEn: "What to bring",
    bringItems: [
      { _key: "bring-1", textSv: "Något att sitta på — vi har extra mattor", textEn: "Something to sit on — we bring extra mats" },
      { _key: "bring-2", textSv: "Ett varmt lager för när solen går ner", textEn: "A warm layer for when the sun dips" },
    ],

    donationNoteSv: "Eventet är gratis. Om det ger dig något får du gärna lämna en donation — helt frivilligt.",
    donationNoteEn: "The event is free. If it gives you something, you're welcome to leave a donation — fully optional.",

    // Teacher
    teacherName: "Dada Anandasvarupa",
    teacherBioSv: "Dada Anandasvarupa är en yogisk munk som har levt munklivet i över 7 år. De senaste 4+ åren har han bott och tränat här i Sverige. Han leder dessa kvällar med värme och lätthet — du känner dig välkommen från första minuten.",
    teacherBioEn: "Dada Anandasvarupa is a yogic monk who has lived the monk's life for over 7 years. For the past 4+ years he has lived and trained here in Sweden. He guides these evenings with warmth and a light touch — you'll feel welcome from the first minute.",
    teacherLinkLabelSv: "Mer om klostret & Dada",
    teacherLinkLabelEn: "More about the monastery & Dada",
    teacherLinkUrl: "https://yogamonastery.org/",

    // Location
    locationTextSv: "Vi träffas på samma plats i parken varje vecka. Exakt plats nedan — vi ses där.",
    locationTextEn: "We meet at the same spot in the park every week. Exact location below — see you there.",
    mapEmbedSrc: "",

    // Form
    formTitleSv: "Boka din plats",
    formTitleEn: "Save your spot",
    formNameLabelSv: "Ditt namn",
    formNameLabelEn: "Your name",
    formPhoneLabelSv: "Mobil (WhatsApp)",
    formPhoneLabelEn: "Mobile (WhatsApp)",
    formButtonSv: "Anmäl dig",
    formButtonEn: "Register",
    formSuccessSv: "Du är anmäld — vi väntar på dig!",
    formSuccessEn: "You're registered — waiting for you!",
    formNoteSv: "Vi skickar detaljerna till din WhatsApp.",
    formNoteEn: "We'll send the details to your WhatsApp.",

    // FAQ
    faq: [
      {
        _key: "faq-1",
        questionSv: "Vad ska jag ta med?",
        questionEn: "What should I bring?",
        answerSv: "Något att sitta på — en matta, filt eller kudde. Det är allt. Kom i vilka kläder och vilket humör som helst.",
        answerEn: "Something to sit on — a mat, blanket or cushion. That's it. Come in any clothes and any mood.",
      },
      {
        _key: "faq-2",
        questionSv: "Är det verkligen gratis?",
        questionEn: "Is it really free?",
        answerSv: "Ja. Det är donationsbaserat — ge om du vill, men inget förväntas.",
        answerEn: "Yes. It's donation based — give if you want to, but nothing is expected.",
      },
      {
        _key: "faq-3",
        questionSv: "Hur länge håller det på?",
        questionEn: "How long does it last?",
        answerSv: "Ungefär en timme: 20 min musik & mantra, 20 min tyst meditation, 20 min te & fika.",
        answerEn: "About one hour: 20 min music & mantra, 20 min silent meditation, 20 min tea & fika.",
      },
    ],

    // CTA
    closingCtaTextSv: "Vi ses i parken på torsdag",
    closingCtaTextEn: "See you Thursday in the park",
    closingCtaButtonSv: "Boka din plats",
    closingCtaButtonEn: "Save your spot",

    // Social
    instagramUrl: "https://www.instagram.com/yoga.monastery/",
    monasteryUrl: "https://yogamonastery.org/",
  });

  console.log("✓ siteSettings seeded.");
}

seed().catch(console.error);
