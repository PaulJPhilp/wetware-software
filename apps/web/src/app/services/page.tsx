import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "How we can work together — embedded AI systems, architecture " +
    "reviews, and team uplift.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-12">
      {/* Hero Section */}
      <section className="space-y-4 text-center">
        <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
          How we can work together
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          I embed as a senior IC or staff‑level partner to help your team
          design, ship, and harden real AI features — not just demos.
        </p>
      </section>

      {/* Services Grid */}
      <section className="space-y-8">
        {/* Service 1 */}
        <article className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="font-bold text-2xl text-foreground">
              1. Embedded AI Systems Partner
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              2–3 months
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                When it's for
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • You have prototypes or half‑shipped AI features.
                </li>
                <li>
                  • You need them production‑ready, observable, and safe
                  under real traffic.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                What I do
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Audit current architecture, prompts, and data flows.
                </li>
                <li>
                  • Design or refine the system around LLMs (TypeScript,
                  Effect, Next.js, Vercel AI SDK / LangGraph).
                </li>
                <li>
                  • Add logging, tracing, evals, and guardrails.
                </li>
                <li>
                  • Pair with your engineers to raise the bar on TS,
                  Effect, and AI‑assisted workflows.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                Outcome
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One or more AI features live in production, with dashboards
                and docs your team can own.
              </p>
            </div>
          </div>
        </article>

        {/* Service 2 */}
        <article className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="font-bold text-2xl text-foreground">
              2. Architecture & Soundness Review
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              4–6 weeks
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                When it's for
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • You're planning new AI features or a refactor and want
                  to avoid expensive mistakes.
                </li>
                <li>
                  • You want a second set of senior eyes on design and
                  failure modes.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                What I do
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Review your product goals and constraints.
                </li>
                <li>
                  • Propose an end‑to‑end architecture for AI features.
                </li>
                <li>
                  • Identify risks: data leakage, latency, cost,
                  reliability, eval coverage, and operational load.
                </li>
                <li>
                  • Deliver a written design doc plus implementation
                  roadmap.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                Outcome
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Clear architecture, trade‑offs, and a practical path to
                ship soundly.
              </p>
            </div>
          </div>
        </article>

        {/* Service 3 */}
        <article className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="font-bold text-2xl text-foreground">
              3. Team Uplift in AI‑Assisted Development
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ongoing / part‑time
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                When it's for
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Your team is using AI tools, but quality is uneven.
                </li>
                <li>
                  • You want engineers to move faster without sacrificing
                  correctness.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                What I do
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Introduce patterns for using AI in day‑to‑day
                  development (tests, refactors, docs).
                </li>
                <li>
                  • Run focused sessions on Effect, typed APIs, and
                  failure‑first design.
                </li>
                <li>
                  • Pair on real tickets to turn patterns into habits.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                Outcome
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A team that ships more with less rework — and a shared
                language for sound engineering with AI.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* What I'm a good fit for */}
      <section className="space-y-4">
        <h2 className="font-bold text-2xl text-foreground">
          What I'm a good fit for
        </h2>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li>
            • Seed to Series B teams building or hardening AI features.
          </li>
          <li>
            • Products using TypeScript, Effect, React/Next.js, Vercel AI
            SDK, or LangGraph.
          </li>
          <li>
            • Teams that want calm senior judgment, not heroics.
          </li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg border border-border bg-card p-8 text-center space-y-4">
        <h2 className="font-bold text-2xl text-foreground">
          Tell me what you're building
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          If one of these models fits what you need — or you're not sure
          which applies — share a few lines about your product, stack, and
          current AI challenges. I'll reply with whether I can help and
          what an engagement could look like.
        </p>
        <Link
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-primary px-6 py-3 font-medium text-sm text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          href="/connect"
        >
          Start a conversation
        </Link>
      </section>
    </main>
  );
}
