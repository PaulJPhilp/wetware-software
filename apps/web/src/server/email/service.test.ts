import { Effect } from "effect";
import { EnvService, fromRecord } from "effect-env";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import {
  ContactEmailParseError,
  ContactEmailService,
  ContactEmailServiceLayer,
  EmailProviderError,
  emailEnvSchema,
  parseContactRequest,
  type ContactEmailInput,
} from "./service";

const BASE_ENV = {
  RESEND_API_KEY: "test-key",
  CONTACT_EMAIL_FROM: "Contact <contact@example.com>",
  CONTACT_EMAIL_TO: "owner@example.com",
};

const makeEnvLayer = (overrides?: Partial<typeof BASE_ENV>) => {
  const env = { ...BASE_ENV };
  if (overrides) {
    for (const [key, value] of Object.entries(overrides)) {
      if (value !== undefined) {
        // @ts-expect-error - safe key access
        env[key] = value;
      }
    }
  }
  return fromRecord(emailEnvSchema, env);
};

const runSend = (input: ContactEmailInput, envOverrides?: Partial<typeof BASE_ENV>) => {
  const program = Effect.flatMap(ContactEmailService, (service) => service.sendContactEmail(input));

  return Effect.runPromise(
    program.pipe(
      Effect.provide(ContactEmailServiceLayer),
      Effect.provide(makeEnvLayer(envOverrides) as any)
    ) as unknown as Effect.Effect<void, any, never>
  );
};

const sampleInput: ContactEmailInput = {
  fullName: "Ada Lovelace",
  workEmail: "ada@example.com",
  company: "Analytical Engines",
  subject: "Coaching",
  body: "Hello!\n\nI'd love to chat about applied AI.",
};

describe("contact email service", () => {
  const originalFetch = global.fetch;
  let fetchMock: Mock<Parameters<typeof fetch>, ReturnType<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("sends payloads to Resend with reply-to metadata", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));

    await expect(runSend(sampleInput)).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [endpoint, options] = fetchMock.mock.calls[0] ?? [];
    expect(endpoint).toBe("https://api.resend.com/emails");
    expect(options?.method).toBe("POST");
    expect(options?.headers).toMatchObject({
      Authorization: `Bearer ${BASE_ENV.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    });
    const payload = JSON.parse(String(options?.body ?? "{}"));
    expect(payload.reply_to).toBe(sampleInput.workEmail);
    expect(payload.subject).toBe(sampleInput.subject);
    expect(payload.text).toContain(sampleInput.body.split("\n\n")[0]);
  });

  it("maps provider failures into EmailProviderError", async () => {
    fetchMock.mockResolvedValue(new Response("boom", { status: 500 }));

    await expect(runSend(sampleInput)).rejects.toBeInstanceOf(EmailProviderError);
  });

  it("surfaces network failures as EmailProviderError", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));

    await expect(runSend(sampleInput)).rejects.toBeInstanceOf(EmailProviderError);
  });

  it("rejects contact requests with short bodies", () => {
    expect(() => parseContactRequest({ body: "too short" })).toThrow(ContactEmailParseError);
  });

  it("loads email env via EnvService", async () => {
    const envLayer = makeEnvLayer();

    const program = Effect.gen(function* () {
      const env = (yield* EnvService as any) as any; // Cast to any to avoid type checks on require
      const apiKey = yield* env.require("RESEND_API_KEY");
      const fromEmail = yield* env.require("CONTACT_EMAIL_FROM");
      const toEmail = yield* env.require("CONTACT_EMAIL_TO");

      return {
        apiKey,
        fromEmail,
        toEmail,
      };
    });

    await expect(Effect.runPromise(program.pipe(Effect.provide(envLayer as any)) as unknown as Effect.Effect<any, any, never>)).resolves.toEqual({
      apiKey: BASE_ENV.RESEND_API_KEY,
      fromEmail: BASE_ENV.CONTACT_EMAIL_FROM,
      toEmail: BASE_ENV.CONTACT_EMAIL_TO,
    });
  });
});
