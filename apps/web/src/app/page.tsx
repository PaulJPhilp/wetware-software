import { EmailContactDialog } from "@/components/EmailContactDialog";
import { Button } from "@wetware/design-system";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-10 md:gap-y-10">
        <div className="fade-in slide-in-from-bottom-4 flex animate-in flex-col gap-y-6 fill-mode-both duration-700 md:col-span-7 md:gap-y-8">
          <header className="space-y-2 sm:space-y-3">
            <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
              <span className="text-primary">Sound AI systems</span> — from prototype to production.
            </h1>
            <p className="text-lg text-muted-foreground">
              I transform early-stage velocity into disciplined, scalable execution.
            </p>
            <p className="text-base text-muted-foreground">
              Greybeard engineer with a next‑gen AI stack (TypeScript, Effect), building AI architectures you can trust.
            </p>
          </header>

          <div className="relative mt-4">
            <Image
              alt="Stack of coloured bricks labeled TS, Effect, React, Next.js, Tailwind CSS, and AI SDK, representing Paul Philp's modern tech stack."
              className="h-auto w-full max-w-[300px] md:max-w-[390px] opacity-90"
              height={80}
              loading="lazy"
              sizes="(min-width: 768px) 390px, 300px"
              src="/images/tech_stack.png"
              width={256}
            />
          </div>
        </div>

        <div className="fade-in slide-in-from-bottom-4 mt-4 flex animate-in flex-col items-end fill-mode-both delay-150 duration-700 md:col-span-5 md:mt-0">
          <div className="w-full max-w-md overflow-hidden rounded-lg border border-muted bg-elevated shadow-md">
            <Image
              alt="Paul Philp collaborating with an AI assistant in a modern workspace."
              className="h-auto w-full object-cover"
              height={640}
              priority
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 100vw"
              src="/images/hero-shot.png"
              width={960}
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mt-16 space-y-8">
        <header className="max-w-xl space-y-2">
          <h2 className="font-bold font-sans text-2xl text-foreground sm:text-3xl">My Philosophy: Smooth {">"}{">"}{">"} Chaos</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            I’ve shipped systems long enough to know that initial velocity often leads to hidden complexity. My entire approach is about preventing that.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-lg border border-subtle bg-elevated p-5 shadow-xs">
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-md border border-subtle bg-background">
              <Image
                alt="Team of engineers collaboratively working on a clean, organized whiteboard. Whiteboard header shows 'Smooth' and tasks are clearly prioritized. Desks are tidy, reflecting a calm and productive environment."
                className="h-full w-full object-cover"
                height={640}
                loading="lazy"
                src="/images/smooth_team.png"
                width={960}
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-sans font-semibold text-base text-foreground">Smooth: Disciplined Velocity</h3>
            </div>
            <p className="mt-3 text-muted-foreground text-sm">
              This is where speed emerges from clarity, not chaos. Systems are built with explicit contracts, robust error handling, and predictable behavior. AI tools amplify productivity within guardrails, enabling the team to move fast without breaking down.
            </p>
            <ul className="mt-4 space-y-1 text-muted-foreground text-sm">
              <li>• Clear domain models &amp; schemas</li>
              <li>• Explicit error channels &amp; resource management</li>
              <li>• AI-assisted dev with validation loops</li>
              <li>• Observable systems for proactive debugging</li>
            </ul>
          </article>

          <article className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-xs">
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-md border border-subtle bg-background">
              <Image
                alt="Team of engineers stressed and surrounded by clutter, facing a whiteboard with 'CHAOS' written prominently. Desks are messy with energy drink cans, reflecting a high-pressure, unorganized environment."
                className="h-full w-full object-cover"
                height={640}
                loading="lazy"
                src="/images/chaos_team.png"
                width={960}
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-sans font-semibold text-base text-foreground">Chaos: Hidden Costs &amp; Burnout</h3>
            </div>
            <p className="mt-3 text-muted-foreground text-sm">
              Without sound architecture, early velocity quickly turns into technical debt. Systems are brittle, debugging is constant, and features are slow to ship. Teams spend more time fighting complexity than building product, leading to burnout and missed deadlines.
            </p>
            <ul className="mt-4 space-y-1 text-muted-foreground text-sm">
              <li>• Ambiguous types &amp; implicit state</li>
              <li>• Unhandled exceptions &amp; resource leaks</li>
              <li>• Unverified AI code causing subtle bugs</li>
              <li>• Reactive firefighting in complex systems</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-16 space-y-8">
        <header className="max-w-xl space-y-2">
          <h2 className="font-bold font-sans text-2xl text-foreground sm:text-3xl">
            Why clients choose me
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {/* No Drama */}
          <article className="hover:-translate-y-1 flex flex-col rounded-lg border border-subtle bg-elevated p-5 shadow-xs transition-shadow transition-transform duration-150 hover:shadow-sm">
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-md border border-subtle bg-background">
              <Image
                alt="Calm, confident avatar of Paul representing no-drama execution."
                className="h-full w-full object-cover"
                height={512}
                loading="lazy"
                sizes="(min-width: 768px) 220px, 100vw"
                src="/images/confident_avatar.png"
                width={512}
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-sans font-semibold text-base text-foreground">No Drama</h3>
              <p className="text-[0.7rem] text-muted-foreground">
                Calm, clear, relentless execution.
              </p>
            </div>
            <p className="mt-3 text-muted-foreground text-sm">
              No surprises. No excuses. Steady delivery from first prototype to
              production — with clear trade‑offs and <strong>preventing the hidden chaos</strong> often found in early systems.
            </p>
          </article>

          {/* Force Multiplier */}
          <article className="hover:-translate-y-1 flex flex-col rounded-lg border border-subtle bg-elevated p-5 shadow-xs transition-shadow transition-transform duration-150 hover:shadow-sm">
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-md border border-subtle bg-background">
              <Image
                alt="Avatar of Paul collaborating at a whiteboard, representing team amplification."
                className="h-full w-full object-cover"
                height={512}
                loading="lazy"
                sizes="(min-width: 768px) 220px, 100vw"
                src="/images/whiteboard_avatar.png"
                width={512}
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-sans font-semibold text-base text-foreground">
                Force Multiplier
              </h3>
              <p className="text-[0.7rem] text-muted-foreground">Multiply the team's impact.</p>
            </div>
            <p className="mt-3 text-muted-foreground text-sm">
              Senior AI engineering leadership that raises the bar on design,
              code quality, and AI‑assisted workflows — so your whole team
              ships more, with fewer regressions, <strong>transforming chaotic sprints into predictable progress.</strong>
            </p>
          </article>

          {/* Sound Systems */}
          <article className="hover:-translate-y-1 flex flex-col rounded-lg border border-subtle bg-elevated p-5 shadow-xs transition-shadow transition-transform duration-150 hover:shadow-sm">
            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-md border border-subtle bg-background">
              <Image
                alt="Avatar of Paul in a clean, controlled environment representing sound systems."
                className="h-full w-full object-cover"
                height={512}
                loading="lazy"
                sizes="(min-width: 768px) 220px, 100vw"
                src="/images/cleanroom_avatar.png"
                width={512}
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-sans font-semibold text-base text-foreground">Sound Systems</h3>
              <p className="text-[0.7rem] text-muted-foreground">
                Built for reliability, not demos.
              </p>
            </div>
            <p className="mt-3 text-muted-foreground text-sm">
              Effect‑powered backends and modern TypeScript that are quick to
              launch, observable in production, and predictable under load, <strong>effectively turning chaos into disciplined outcomes.</strong>
            </p>
          </article>
        </div>
      </section>

      {/* Capabilities / What I Offer */}
      <section className="mt-16 grid gap-8 border-subtle border-t pt-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <h2 className="font-bold font-sans text-2xl text-foreground sm:text-3xl">
            Where I plug into your team
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            I work with product teams that need real, shippable AI features
            — not just demos. These are the kinds of problems I'm usually
            brought in to solve.
          </p>
        </div>

        <ul className="space-y-3 text-muted-foreground text-sm sm:text-base">
          <li className="flex gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
            <span><strong>Architecture for real AI products</strong> – end‑to‑end
            design of LLM‑driven features using TypeScript, Effect, Next.js,
            and modern orchestration (Vercel AI SDK / LangGraph).</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
            <span><strong>From prototype to production</strong> – hardening
            existing POCs with logging, tracing, evals, and guardrails so
            leadership can trust them in production.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
            <span><strong>Release pipelines and observability</strong> – CI/CD,
            canarying, and monitoring tuned for AI features, not just the
            main app.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
            <span><strong>Team uplift in AI‑assisted development</strong> –
            mentoring seniors and mids to use AI tools effectively while
            keeping quality and correctness high.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
            <span><strong>Scaling and reliability under load</strong> – designing
            for concurrency, backpressure, and failure modes in AI workloads
            under real traffic.</span>
          </li>
        </ul>
      </section>

      {/* Call to Action / Contact */}
      <section className="mt-16 mb-4 rounded-lg border border-subtle bg-elevated px-6 py-8 shadow-xs sm:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="font-bold font-sans text-2xl text-foreground sm:text-3xl">
              Ready to move fast and soundly? Let's talk.
            </h2>
            <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
              If you're a hiring manager or founder shipping AI features you
              need to trust in production, I can help you design, ship, and
              harden those systems. Want to see how I think? Browse my writing
              on building sound AI systems.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <EmailContactDialog triggerClassName="bg-gray-100 dark:bg-gray-800 px-6 py-3 border border-transparent transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-orange-500 active:scale-95" />
            <Button asChild size="lg" variant="ghost" className="bg-gray-100 dark:bg-gray-800 px-6 py-3 border border-transparent transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-orange-500 active:scale-95">
              <Link href="/blog">Read the blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
