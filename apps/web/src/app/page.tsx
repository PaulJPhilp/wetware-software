import { Button } from "@wetware/design-system";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="relative grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
        <div className="fade-in slide-in-from-bottom-4 flex animate-in flex-col gap-y-6 fill-mode-both duration-700 md:col-span-8 md:gap-y-10">
          {/* Minimal Hero Section */}
          <section className="mb-12">
            <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
              <span className="text-primary">Sound AI systems</span>—from prototype to production.
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              <span className="text-primary">Battle-tested veteran</span>
              {", "}
              <span className="text-primary">modern stack.</span>
            </p>
            <p className="mt-5 text-base text-muted-foreground">
              Effect + TypeScript + Vercel AI SDK for reliable, maintainable, observable AI—evals,
              guardrails, and tracing from day one. Read:{" "}
              <Link
                className="text-primary underline-offset-4 hover:underline"
                href="/blog/what-soundness-means"
              >
                What 'soundness' means in practice →
              </Link>
              .
            </p>

            {/* CTA Row */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/posts">Read the Blog</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/connect">Contact</Link>
              </Button>
            </div>
          </section>

          {/* Proof Chips */}
          <p
            aria-label="Proof of recent work"
            className="mt-8 break-words text-muted-foreground text-xs"
            role="note"
          >
            Effect Patterns • 432★ | effect-notion • released | effect-mdx • 1.0 pending |
            EffectiveAgent/effect‑ai‑sdk • in progress
          </p>
        </div>

        <div className="fade-in slide-in-from-bottom-4 mt-8 flex animate-in flex-col items-end fill-mode-both delay-150 duration-700 md:col-span-4 md:mt-0">
          <Image
            alt="Paul Philp's robotic horse avatar"
            className="h-auto w-full max-w-xs rounded-lg border shadow-md"
            height={500}
            priority
            sizes="(min-width: 768px) 300px, 100vw"
            src="/images/avatar.jpeg"
            width={500}
          />
        </div>
      </div>
    </div>
  );
}
