import { Effect, Layer, Schema as S } from "effect";
import { EnvService, fromProcess, makeEnvSchema } from "effect-env";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

export type ContactEmailInput = {
  fullName?: string;
  workEmail?: string;
  company?: string;
  subject?: string;
  body: string;
};

export class ContactEmailParseError extends Error {
  constructor(readonly issues: string) {
    super(`Invalid contact request: ${issues}`);
    this.name = "ContactEmailParseError";
  }
}

export class EmailServiceError extends Error {
  override readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "EmailServiceError";
    this.cause = cause;
  }
}

export class EmailProviderError extends EmailServiceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "EmailProviderError";
  }
}

// ---------------------------------------------------------------------------
// Environment configuration (effect-env)
// ---------------------------------------------------------------------------

const rawEmailEnvSchema = S.Struct({
  RESEND_API_KEY: S.String,
  CONTACT_EMAIL_FROM: S.optionalWith({
    default: () => "Paul Philp <contact@paulphilp.com>",
  })(S.String),
  CONTACT_EMAIL_TO: S.optionalWith({
    default: () => "paul@paulphilp.com",
  })(S.String),
});

export type EmailConfig = S.Schema.Type<typeof rawEmailEnvSchema>;

export const emailEnvSchema = makeEnvSchema(rawEmailEnvSchema as any);

export const EmailConfigLive = fromProcess(emailEnvSchema);

// ---------------------------------------------------------------------------
// Contact service definition
// ---------------------------------------------------------------------------

export type ContactEmailService = {
  readonly sendContactEmail: (input: ContactEmailInput) => Effect.Effect<void, EmailServiceError>;
};

type EmailEnv = {
  require: <K extends keyof EmailConfig>(key: K) => Effect.Effect<EmailConfig[K], unknown>;
};

const contactEmailService = Effect.gen(function* () {
  // @ts-ignore - Handle effect version mismatch between app and effect-env
  const env = (yield* EnvService as any) as EmailEnv;
  return {
    sendContactEmail: (input: ContactEmailInput) => sendEmail(env, input),
  } satisfies ContactEmailService;
});

export const ContactEmailService = Effect.Service<ContactEmailService>()(
  "@wetware/ContactEmailService",
  {
    effect: contactEmailService,
  }
);

// ---------------------------------------------------------------------------
// Input parsing helpers
// ---------------------------------------------------------------------------

const normalizeField = (value: unknown, max: number) => {
  if (typeof value !== "string") {
    return;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return;
  }
  return trimmed.slice(0, max);
};

const ensureBody = (value: unknown) => {
  if (typeof value !== "string") {
    throw new ContactEmailParseError("Message body is required.");
  }
  const trimmed = value.trim();
  if (trimmed.length < 10) {
    throw new ContactEmailParseError("Message should be at least 10 characters.");
  }
  if (trimmed.length > 4000) {
    throw new ContactEmailParseError("Message must be under 4000 characters.");
  }
  return trimmed;
};

export const parseContactRequest = (input: unknown): ContactEmailInput => {
  if (typeof input !== "object" || input === null) {
    throw new ContactEmailParseError("Invalid payload.");
  }

  const data = input as Record<string, unknown>;
  const body = ensureBody(data.body);
  const fullName = normalizeField(data.fullName, 120);
  const workEmail = normalizeField(data.workEmail, 200);
  const company = normalizeField(data.company, 160);
  const subject = normalizeField(data.subject, 180);

  return {
    body,
    ...(fullName ? { fullName } : {}),
    ...(workEmail ? { workEmail } : {}),
    ...(company ? { company } : {}),
    ...(subject ? { subject } : {}),
  } satisfies ContactEmailInput;
};

// ---------------------------------------------------------------------------
// Email rendering
// ---------------------------------------------------------------------------

const renderTextBody = (input: ContactEmailInput) => {
  const lines = [
    input.body,
    "",
    "—",
    input.fullName ? `Name: ${input.fullName}` : undefined,
    input.company ? `Company: ${input.company}` : undefined,
    input.workEmail ? `Email: ${input.workEmail}` : undefined,
  ].filter(Boolean);

  return lines.join("\n");
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderHtmlBody = (input: ContactEmailInput) => {
  const meta = [
    input.fullName ? `<p><strong>Name:</strong> ${escapeHtml(input.fullName)}</p>` : "",
    input.company ? `<p><strong>Company:</strong> ${escapeHtml(input.company)}</p>` : "",
    input.workEmail ? `<p><strong>Email:</strong> ${escapeHtml(input.workEmail)}</p>` : "",
  ].join("");

  const body = input.body
    .split(/\n{2,}/)
    .map((segment) => `<p>${escapeHtml(segment.trim()).replace(/\n/g, "<br />")}</p>`) // preserve paragraphs
    .join("\n");

  return `<!doctype html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827;">
    <p style="font-size: 14px; color: #111827;">${body}</p>
    <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
    ${meta}
  </body>
</html>`;
};

type ResendPayload = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  reply_to?: string;
};

// ---------------------------------------------------------------------------
// Resend delivery
// ---------------------------------------------------------------------------

const sendEmail = (
  env: EmailEnv,
  input: ContactEmailInput
): Effect.Effect<void, EmailServiceError> => {
  const requireConfig = <K extends keyof EmailConfig>(key: K) =>
    env
      .require(key)
      .pipe(
        Effect.mapError((cause) => new EmailServiceError("Invalid email configuration", cause))
      );

  return Effect.gen(function* () {
    const apiKey = yield* requireConfig("RESEND_API_KEY");
    const fromEmail = yield* requireConfig("CONTACT_EMAIL_FROM");
    const toEmail = yield* requireConfig("CONTACT_EMAIL_TO");

    const subject =
      input.subject?.trim() ?? `New inquiry from ${input.fullName ?? "website visitor"}`;

    const payload: ResendPayload = {
      from: fromEmail,
      to: toEmail,
      subject,
      text: renderTextBody(input),
      html: renderHtmlBody(input),
      ...(input.workEmail ? { reply_to: input.workEmail.trim() } : {}),
    };

    yield* Effect.tryPromise({
      try: async () => {
        const response = await fetch(RESEND_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const detail = await response.text().catch(() => "");
          throw new EmailProviderError(
            `Email provider responded with status ${response.status}`,
            detail
          );
        }
      },
      catch: (cause) => new EmailProviderError("Failed to send contact email", cause),
    });
  });
};

// ---------------------------------------------------------------------------
// Layer wiring
// ---------------------------------------------------------------------------

export const ContactEmailServiceLayer = Layer.effect(ContactEmailService, contactEmailService);

export const ContactEmailServiceLive = ContactEmailServiceLayer.pipe(
  Layer.provide(EmailConfigLive as any)
);
