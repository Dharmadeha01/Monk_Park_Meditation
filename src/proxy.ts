import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal proxy: just pass through.
// Root "/" → "/sv" is handled by redirects in next.config.ts.
// Locale is read from the URL [locale] segment by next-intl.
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
