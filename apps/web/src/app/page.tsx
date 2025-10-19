import { Button } from "@wetware/design-system";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
        <div className="flex flex-col gap-y-6 md:col-span-8 md:gap-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          {/* Minimal Hero Section */}
          <section className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
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
                href="/blog/what-soundness-means"
                className="text-primary underline-offset-4 hover:underline"
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
            className="mt-8 text-xs text-muted-foreground break-words"
            role="note"
            aria-label="Proof of recent work"
          >
            Effect Patterns • 432★ | effect-notion • released | effect-mdx • 1.0 pending |
            EffectiveAgent/effect‑ai‑sdk • in progress
          </p>
        </div>

        <div className="mt-8 flex flex-col items-end md:col-span-4 md:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <Image
            src="/images/avatar.jpeg"
            alt="Paul Philp's robotic horse avatar"
            width={500}
            height={500}
            priority
            sizes="(min-width: 768px) 300px, 100vw"
            className="h-auto w-full max-w-xs rounded-lg border shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
