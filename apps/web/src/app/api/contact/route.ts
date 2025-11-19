import { NextResponse } from "next/server";

import { Effect } from "effect";

import type { ContactEmailInput } from "@/server/email/service";
import {
    ContactEmailParseError,
    ContactEmailService,
    ContactEmailServiceLive,
    EmailProviderError,
    parseContactRequest,
} from "@/server/email/service";

const isEmailDeliveryConfigured = () => {
  const key = process.env.RESEND_API_KEY;
  return typeof key === "string" && key.trim().length > 0;
};

const logSkippedDelivery = (input: ContactEmailInput) => {
  console.info("[contact] Email delivery disabled; captured payload", {
    subject: input.subject ?? "(no subject)",
    hasBody: input.body.length > 0,
    preview: input.body.slice(0, 80),
    fullName: input.fullName ?? null,
    workEmail: input.workEmail ?? null,
    company: input.company ?? null,
  });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = parseContactRequest(body);

    if (!isEmailDeliveryConfigured()) {
      logSkippedDelivery(input);
      return NextResponse.json({ success: true });
    }

    const program = Effect.flatMap(ContactEmailService, (service) =>
      service.sendContactEmail(input)
    ).pipe(Effect.provide(ContactEmailServiceLive as any));

    await Effect.runPromise(program as unknown as Effect.Effect<void, any, never>);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ContactEmailParseError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    const message =
      error instanceof EmailProviderError
        ? error.message
        : "Unable to send message right now. Please try again soon.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
