import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load UI components that are not immediately visible
const Badge = dynamic(() =>
  import("@/components/ui/badge").then((mod) => ({ default: mod.Badge }))
);

const skills: string[] = [
  "TypeScript",
  "Effect-TS",
  "React/Next.js",
  "Vercel AI SDK",
  "LangGraph",
  "AI agents & orchestration",
  "Node.js",
  "PostgreSQL",
  "Observability & evals",
  "Human–AI collaboration",
];

const blogTopics: string[] = [
  "Building robust AI agents and conversational UIs",
  "Architecting large language model (LLM) applications for scale",
  "Effect-TS patterns and functional programming in TypeScript",
  "Human–AI collaboration frameworks and methodologies",
  "Complex systems thinking in software development",
  "The trade-offs and failure modes of real AI systems in production",
];

export default async function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-12 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 lg:space-y-0">
      {/* Page Title (desktop only) */}
      <h1 className="col-start-2 hidden font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:block">
        About
      </h1>

      {/* Left profile rail (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <span
              className="relative mx-auto flex size-8 shrink-0 overflow-hidden rounded-full h-28 w-28"
              data-slot="avatar"
            >
              <img
                alt="Paul Philp, greybeard software engineer, riding a robotic horse while working on a laptop."
                className="h-full w-full object-cover"
                src="/images/avatar.jpeg"
              />
            </span>
            <div className="mt-4 space-y-1">
              <h2 className="font-bold text-foreground text-lg leading-tight">
                Paul Philp
              </h2>
              <p className="text-muted-foreground text-sm leading-snug">
                Senior Software Engineer & AI Systems Architect
              </p>
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground text-sm">Connect</h3>
            <div className="flex flex-col gap-2">
              <a
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 font-medium text-sm text-foreground shadow-xs transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[>svg]:px-3"
                data-slot="button"
                href="https://www.linkedin.com/in/pauljphilp/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>LinkedIn Profile</span>
              </a>
              <Link
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 font-medium text-sm text-foreground shadow-xs transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[>svg]:px-3"
                data-slot="button"
                href="/connect"
              >
                <span>Get in touch</span>
              </Link>
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground text-sm">
              Current focus
            </h3>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• Sound AI systems for real products</li>
              <li>• Effect-TS & modern TypeScript architecture</li>
              <li>• LLM feature design & observability</li>
              <li>• Team uplift in AI-assisted development</li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="space-y-12">
        {/* Header Section (mobile/tablet) */}
        <section className="space-y-4 text-center lg:hidden">
          <span
            className="relative mx-auto flex size-8 shrink-0 overflow-hidden rounded-full h-32 w-32"
            data-slot="avatar"
          >
            <img
              alt="Paul Philp, greybeard software engineer, riding a robotic horse while working on a laptop."
              className="h-full w-full object-cover"
              src="/images/avatar.jpeg"
            />
          </span>
          <div className="space-y-2">
            <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
              About
            </h1>
            <h2 className="font-bold text-foreground text-xl md:text-2xl">
              Paul Philp
            </h2>
            <p className="text-muted-foreground text-sm leading-snug">
              Senior Software Engineer & AI Systems Architect
            </p>
            <p className="mx-auto max-w-2xl text-base text-foreground leading-relaxed">
              Greybeard engineer with a modern AI stack. I help teams ship
              sound AI systems — real features you can observe, debug, and
              trust in production.
            </p>
          </div>
        </section>

        {/* Main Bio Section */}
        <section className="prose max-w-none">
          <div className="space-y-6 rounded-lg border border-border bg-card p-8">
            <h2 className="m-0 font-bold text-2xl text-foreground">
              About Paul
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                I’m Paul Philp — a greybeard software engineer and AI systems
                architect. I’ve spent decades building and scaling software,
                and in the last few years I’ve gone deep on modern TypeScript,
                Effect, Next.js, and AI tooling.
              </p>

              <p>
                Today I help product teams ship sound AI systems: real features
                built on LLMs and modern web stacks that you can observe, debug,
                and trust in production.
              </p>

              <h3 className="font-bold text-xl text-foreground mt-6">
                From leadership back to building
              </h3>

              <p>
                Earlier in my career I moved from hands-on engineering into
                leadership roles — tech lead, executive, and eventually
                co-founding CEO of a B2B SaaS startup. After that company
                failed, I made a deliberate choice: step away from the
                executive track and return to what I’ve always loved most:
                building systems.
              </p>

              <p>
                I retooled from the ground up: modern TypeScript, React/Next.js,
                Tailwind, Effect-TS, LangGraph, Vercel AI SDK, and
                production-grade AI patterns. I shipped small projects, CLIs,
                and internal tools to rebuild the habits that matter: clear
                invariants, strong typing, tests, observability, and honest
                post-mortems.
              </p>

              <h3 className="font-bold text-xl text-foreground mt-6">
                What that experience taught me
              </h3>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Systems thinking.</strong> Whether it’s a codebase, a
                  team, or a business, failures are almost never about a single
                  line of code. They’re about the interactions and feedback
                  loops.
                </li>
                <li>
                  <strong>Humility in front of the code.</strong> Specs, decks,
                  and roadmaps are useful, but the running system is the final
                  truth.
                </li>
                <li>
                  <strong>Clarity over heroics.</strong> Sound systems come from
                  clear contracts, well-understood failure modes, and steady
                  delivery — not 2 a.m. saves.
                </li>
                <li>
                  <strong>Good boundaries make good systems.</strong> The same
                  clarity that keeps human relationships healthy makes software
                  easier to reason about: explicit interfaces, explicit
                  ownership, explicit trade-offs.
                </li>
              </ul>

              <h3 className="font-bold text-xl text-foreground mt-6">
                How I work with teams
              </h3>

              <p>
                I usually join as a senior IC or staff-level partner to your
                existing tech lead or CTO. My job is to:
              </p>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Design or refine the architecture for AI-powered features in
                  your product.
                </li>
                <li>
                  Take fragile prototypes and harden them for production with
                  proper logging, tracing, evals, and guardrails.
                </li>
                <li>
                  Raise the bar for the whole team’s engineering practice —
                  especially around TypeScript, Effect, and AI-assisted
                  workflows.
                </li>
                <li>
                  Leave behind patterns, documentation, and observability so you
                  can keep moving fast after I’m gone.
                </li>
              </ul>

              <h3 className="font-bold text-xl text-foreground mt-6">
                A note on failure and rebuilding
              </h3>

              <p>
                I’ve been through a startup failure and a personal reset. It
                forced me to examine not just how systems fail, but how people
                and teams fail together. That history shapes how I show up now:
                calm under pressure, direct about risk, and serious about
                building teams and systems that don’t quietly drift into bad
                states.
              </p>

              <p>
                If you’re curious about the personal side and the parallels with
                complex systems and AI, there are essays on the blog. If you’re
                here because you need reliable AI features in production, we can
                start there and stay there.
              </p>

              <h3 className="font-bold text-xl text-foreground mt-6">
                Where to go next
              </h3>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Homepage:</strong> overview of how I help teams ship
                  sound AI systems.
                </li>
                <li>
                  <strong>Blog:</strong> deep dives on Effect-TS, AI
                  architecture, and building reliable LLM-powered features.
                </li>
                <li>
                  <strong>Connect:</strong> if you’re shipping AI features and
                  need them to behave in the real world, I’d be happy to hear
                  what you’re building.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Essay Callout */}
        <section className="rounded-lg border border-border bg-muted p-8">
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-lg">Personal essay</h3>
            <p className="text-foreground">
              “What My Marriage Falling Apart Taught Me About LLMs” — a deeply
              personal exploration of complex systems, failure modes, and the
              parallels between human relationships and AI architectures.
            </p>
            <Link
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-sm text-primary-foreground shadow-xs transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[>svg]:px-3"
              data-slot="button"
              href="/blog/posts/my-marriage-and-ai"
            >
              <span>Read the essay</span>
            </Link>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="space-y-6">
          <h2 className="font-bold text-2xl text-foreground">
            Technical skills & expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge data-slot="badge" key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Blog Topics */}
        <section className="space-y-6">
          <h2 className="font-bold text-2xl text-foreground">
            What I write about
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {blogTopics.map((topic) => (
              <div className="flex items-start gap-3 rounded-lg bg-muted p-4" key={topic}>
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-foreground" />
                <p className="text-foreground">{topic}</p>
              </div>
            ))}
          </div>
        </section>

        {/* At a Glance & Contact (mobile/tablet) */}
        <section className="space-y-6 lg:hidden">
          <div className="space-y-3">
            <h3 className="font-bold text-foreground text-lg">Current focus</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Sound AI systems for real products</li>
              <li>• Effect-TS & modern TypeScript architecture</li>
              <li>• LLM feature design & observability</li>
              <li>• Team uplift in AI-assisted development</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-foreground text-lg">Connect</h3>
            <div className="flex flex-col gap-2">
              <a
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 font-medium text-sm text-foreground shadow-xs transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[>svg]:px-3"
                data-slot="button"
                href="https://www.linkedin.com/in/pauljphilp/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>LinkedIn Profile</span>
              </a>
              <Link
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 font-medium text-sm text-foreground shadow-xs transition-all hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[>svg]:px-3"
                data-slot="button"
                href="/connect"
              >
                <span>Get in touch</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
