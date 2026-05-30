import { NextRequest, NextResponse } from "next/server";

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, locale } = body as { name?: string; phone?: string; locale?: string };

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }

    const apiToken = process.env.AIRTABLE_API_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiToken || !baseId || apiToken === "placeholder" || baseId === "placeholder") {
      console.log("[register] Airtable not configured — mock success", { name, phone, locale });
      return NextResponse.json({ ok: true });
    }

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/Registrations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: name.trim(),
          Phone: phone.trim(),
          Locale: locale || "sv",
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[register] Airtable error", err);
      return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register] Unexpected error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
