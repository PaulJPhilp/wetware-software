import { Callout } from "@/components/Callout";
import { Figure } from "@/components/Figure";
import { useId } from "react";

export default function ContentImprovementsPage() {
  const exampleHeadingId = useId();
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-sans text-4xl text-brand">Content Improvements</h1>
          <p className="text-muted">
            Demonstrating the final polish improvements for better accessibility and user
            experience.
          </p>
        </div>

        {/* Last Updated Date */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Last Updated Date</h2>
          <div className="rounded-lg border border-brand bg-elevated p-6">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-muted text-sm">
              <time>December 15, 2024</time>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>Last updated: December 15, 2024</span>
            </div>
            <p className="text-center text-muted">
              Essays now include a "Last updated" date to help readers understand content freshness,
              especially important for time-sensitive topics like AI developments.
            </p>
          </div>
        </section>

        {/* Linkable Callouts */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Linkable Callouts</h2>

          <div className="space-y-6">
            <Callout title="What to Watch" variant="info">
              <p>
                Falling GPU lead times and queue lengths, sustained $/token and $/train declines,
                and the emergence of new AI infrastructure patterns.
              </p>
              <p className="mt-2">
                <a className="link-brand-subtle" href="#what-to-watch">
                  Link to this callout: #what-to-watch
                </a>
              </p>
            </Callout>

            <Callout title="AI Factory Risk" variant="warning">
              <p>
                The risk of over-optimization for specific AI workloads without considering broader
                system resilience and human oversight requirements.
              </p>
              <p className="mt-2">
                <a className="link-brand-subtle" href="#ai-factory-risk">
                  Link to this callout: #ai-factory-risk
                </a>
              </p>
            </Callout>

            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h3 className="mb-3 font-bold font-sans text-brand text-lg">How It Works</h3>
              <p className="mb-3 text-muted">
                Callouts automatically generate IDs based on their content:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted">
                <li>
                  "What to watch" →{" "}
                  <code className="rounded bg-orange/10 px-1">#what-to-watch</code>
                </li>
                <li>
                  "AI Factory risk" →{" "}
                  <code className="rounded bg-orange/10 px-1">#ai-factory-risk</code>
                </li>
                <li>
                  "Key takeaway" → <code className="rounded bg-orange/10 px-1">#key-takeaway</code>
                </li>
                <li>
                  Fallback: First 3 words →{" "}
                  <code className="rounded bg-orange/10 px-1">#first-three-words</code>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Improved Alt Text */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Descriptive Alt Text</h2>

          <div className="space-y-6">
            <Figure caption="Diagram of Perez's installation → turning point → deployment with notes on investment/speculation and diffusion">
              <div className="rounded-lg bg-silver p-8 text-center dark:bg-charcoal">
                <p className="text-muted">Example diagram content</p>
              </div>
            </Figure>

            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h3 className="mb-3 font-bold font-sans text-brand text-lg">Alt Text Improvements</h3>
              <p className="mb-3 text-muted">
                Images now have more descriptive alt text instead of generic "Content illustration":
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted">
                <li>Captions with "diagram", "chart", "graph" → Use caption as alt text</li>
                <li>No caption → Extract meaningful info from filename</li>
                <li>Fallback → "Content illustration" with filename context</li>
              </ul>
              <p className="mt-3 text-muted">
                Example:{" "}
                <code className="rounded bg-orange/10 px-1">
                  "Diagram of Perez's installation → turning point → deployment with notes on
                  investment/speculation and diffusion"
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* Linkable Headings */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Linkable Headings</h2>

          <div className="space-y-4">
            <h3
              className="group scroll-mt-24 font-bold font-sans text-2xl text-brand"
              id={exampleHeadingId}
            >
              <a
                className="inline-flex items-center gap-2 no-underline transition-colors hover:text-orange"
                href={`#${exampleHeadingId}`}
              >
                Example Heading
                <span className="invisible ml-2 inline-flex h-4 w-4 items-center justify-center rounded text-orange opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  #
                </span>
              </a>
            </h3>
            <p className="text-muted">
              All headings (H1, H2, H3) now automatically generate IDs for direct linking and show
              anchor icons on hover.
            </p>

            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h4 className="mb-3 font-bold font-sans text-brand text-lg">How It Works</h4>
              <p className="mb-3 text-muted">Heading IDs are generated by:</p>
              <ul className="list-disc space-y-1 pl-5 text-muted">
                <li>Converting to lowercase</li>
                <li>Removing special characters</li>
                <li>Replacing spaces with hyphens</li>
              </ul>
              <p className="mt-3 text-muted">
                Example: "What to Watch" →{" "}
                <code className="rounded bg-orange/10 px-1">#what-to-watch</code>
              </p>
            </div>
          </div>
        </section>

        {/* New Features Demo */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">New Interactive Features</h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h3 className="mb-3 font-bold font-sans text-brand text-lg">
                Anchor Icons on Headings
              </h3>
              <p className="mb-4 text-muted">
                Hover over any heading to see a subtle # anchor icon that allows direct linking to
                that section.
              </p>
              <div className="rounded bg-silver p-4 dark:bg-charcoal">
                <h4 className="group scroll-mt-24 font-bold font-sans text-base text-brand">
                  <a
                    className="inline-flex items-center gap-2 no-underline transition-colors hover:text-orange"
                    href="#demo-heading"
                  >
                    Demo Heading (hover to see anchor)
                    <span className="invisible ml-2 inline-flex h-4 w-4 items-center justify-center rounded text-orange opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      #
                    </span>
                  </a>
                </h4>
              </div>
            </div>

            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h3 className="mb-3 font-bold font-sans text-brand text-lg">
                Share Links on Callouts
              </h3>
              <p className="mb-4 text-muted">
                Callouts now include "Copy link" buttons to easily share specific sections.
              </p>
              <div className="rounded-r-lg border-orange/60 border-l-4 bg-orange/5 p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">💡</span>
                  <div className="flex-1 text-brand">
                    <p>This is a demo callout with a share link button on the right.</p>
                  </div>
                  <button
                    className="focus-ring ml-auto inline-flex items-center gap-2 rounded bg-orange px-2 py-1 font-medium text-white text-xs transition-colors hover:bg-orange/90"
                    type="button"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Usage Examples</h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h3 className="mb-3 font-bold font-sans text-brand text-lg">Linking to Callouts</h3>
              <p className="mb-3 text-muted">
                You can now link directly to specific callouts in your essays:
              </p>
              <code className="block rounded bg-charcoal p-3 text-silver text-sm">
                {`<a href="#what-to-watch">See what to watch</a>
<a href="#ai-factory-risk">Learn about AI factory risks</a>`}
              </code>
            </div>

            <div className="rounded-lg border border-brand bg-elevated p-6">
              <h3 className="mb-3 font-bold font-sans text-brand text-lg">Linking to Headings</h3>
              <p className="mb-3 text-muted">Link to specific sections within your content:</p>
              <code className="block rounded bg-charcoal p-3 text-silver text-sm">
                {`<a href="#example-heading">Jump to example section</a>
<a href="#conclusion">Go to conclusion</a>`}
              </code>
            </div>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Implementation Notes</h2>

          <div className="rounded-lg bg-charcoal p-8 text-silver">
            <div className="prose prose-invert max-w-none">
              <p>These improvements enhance the accessibility and usability of your content:</p>

              <h3>Benefits:</h3>
              <ul>
                <li>
                  <strong>Better Accessibility:</strong> Descriptive alt text helps screen readers
                </li>
                <li>
                  <strong>Improved Navigation:</strong> Linkable sections and callouts
                </li>
                <li>
                  <strong>Content Freshness:</strong> Last updated dates for time-sensitive topics
                </li>
                <li>
                  <strong>Enhanced UX:</strong> Readers can share specific sections
                </li>
              </ul>

              <h3>Technical Implementation:</h3>
              <ul>
                <li>Alt text generation based on captions and filenames</li>
                <li>Automatic ID generation for headings and callouts</li>
                <li>Semantic color classes for consistent theming</li>
                <li>Last updated date display in post headers</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
