import { Callout } from "@/components/Callout";
import { Figure } from "@/components/Figure";
import { useId } from "react";

export default function ContentImprovementsPage() {
  const exampleHeadingId = useId();
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sans font-bold text-brand mb-4">Content Improvements</h1>
          <p className="text-muted">
            Demonstrating the final polish improvements for better accessibility and user
            experience.
          </p>
        </div>

        {/* Last Updated Date */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Last Updated Date</h2>
          <div className="bg-elevated rounded-lg p-6 border border-brand">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted mb-4">
              <time>December 15, 2024</time>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>Last updated: December 15, 2024</span>
            </div>
            <p className="text-muted text-center">
              Essays now include a "Last updated" date to help readers understand content freshness,
              especially important for time-sensitive topics like AI developments.
            </p>
          </div>
        </section>

        {/* Linkable Callouts */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Linkable Callouts</h2>

          <div className="space-y-6">
            <Callout variant="info" title="What to Watch">
              <p>
                Falling GPU lead times and queue lengths, sustained $/token and $/train declines,
                and the emergence of new AI infrastructure patterns.
              </p>
              <p className="mt-2">
                <a href="#what-to-watch" className="link-brand-subtle">
                  Link to this callout: #what-to-watch
                </a>
              </p>
            </Callout>

            <Callout variant="warning" title="AI Factory Risk">
              <p>
                The risk of over-optimization for specific AI workloads without considering broader
                system resilience and human oversight requirements.
              </p>
              <p className="mt-2">
                <a href="#ai-factory-risk" className="link-brand-subtle">
                  Link to this callout: #ai-factory-risk
                </a>
              </p>
            </Callout>

            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h3 className="text-lg font-sans font-bold text-brand mb-3">How It Works</h3>
              <p className="text-muted mb-3">
                Callouts automatically generate IDs based on their content:
              </p>
              <ul className="text-muted space-y-1 list-disc pl-5">
                <li>
                  "What to watch" →{" "}
                  <code className="bg-orange/10 px-1 rounded">#what-to-watch</code>
                </li>
                <li>
                  "AI Factory risk" →{" "}
                  <code className="bg-orange/10 px-1 rounded">#ai-factory-risk</code>
                </li>
                <li>
                  "Key takeaway" → <code className="bg-orange/10 px-1 rounded">#key-takeaway</code>
                </li>
                <li>
                  Fallback: First 3 words →{" "}
                  <code className="bg-orange/10 px-1 rounded">#first-three-words</code>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Improved Alt Text */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Descriptive Alt Text</h2>

          <div className="space-y-6">
            <Figure caption="Diagram of Perez's installation → turning point → deployment with notes on investment/speculation and diffusion">
              <div className="bg-silver dark:bg-charcoal rounded-lg p-8 text-center">
                <p className="text-muted">Example diagram content</p>
              </div>
            </Figure>

            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h3 className="text-lg font-sans font-bold text-brand mb-3">Alt Text Improvements</h3>
              <p className="text-muted mb-3">
                Images now have more descriptive alt text instead of generic "Content illustration":
              </p>
              <ul className="text-muted space-y-1 list-disc pl-5">
                <li>Captions with "diagram", "chart", "graph" → Use caption as alt text</li>
                <li>No caption → Extract meaningful info from filename</li>
                <li>Fallback → "Content illustration" with filename context</li>
              </ul>
              <p className="text-muted mt-3">
                Example:{" "}
                <code className="bg-orange/10 px-1 rounded">
                  "Diagram of Perez's installation → turning point → deployment with notes on
                  investment/speculation and diffusion"
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* Linkable Headings */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Linkable Headings</h2>

          <div className="space-y-4">
            <h3
              id={exampleHeadingId}
              className="text-2xl font-sans font-bold text-brand group scroll-mt-24"
            >
              <a
                href={`#${exampleHeadingId}`}
                className="inline-flex items-center gap-2 no-underline hover:text-orange transition-colors"
              >
                Example Heading
                <span className="invisible ml-2 inline-flex h-4 w-4 items-center justify-center rounded text-orange opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  #
                </span>
              </a>
            </h3>
            <p className="text-muted">
              All headings (H1, H2, H3) now automatically generate IDs for direct linking and show
              anchor icons on hover.
            </p>

            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h4 className="text-lg font-sans font-bold text-brand mb-3">How It Works</h4>
              <p className="text-muted mb-3">Heading IDs are generated by:</p>
              <ul className="text-muted space-y-1 list-disc pl-5">
                <li>Converting to lowercase</li>
                <li>Removing special characters</li>
                <li>Replacing spaces with hyphens</li>
              </ul>
              <p className="text-muted mt-3">
                Example: "What to Watch" →{" "}
                <code className="bg-orange/10 px-1 rounded">#what-to-watch</code>
              </p>
            </div>
          </div>
        </section>

        {/* New Features Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">New Interactive Features</h2>

          <div className="space-y-6">
            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h3 className="text-lg font-sans font-bold text-brand mb-3">
                Anchor Icons on Headings
              </h3>
              <p className="text-muted mb-4">
                Hover over any heading to see a subtle # anchor icon that allows direct linking to
                that section.
              </p>
              <div className="bg-silver dark:bg-charcoal rounded p-4">
                <h4 className="text-base font-sans font-bold text-brand group scroll-mt-24">
                  <a
                    href="#demo-heading"
                    className="inline-flex items-center gap-2 no-underline hover:text-orange transition-colors"
                  >
                    Demo Heading (hover to see anchor)
                    <span className="invisible ml-2 inline-flex h-4 w-4 items-center justify-center rounded text-orange opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      #
                    </span>
                  </a>
                </h4>
              </div>
            </div>

            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h3 className="text-lg font-sans font-bold text-brand mb-3">
                Share Links on Callouts
              </h3>
              <p className="text-muted mb-4">
                Callouts now include "Copy link" buttons to easily share specific sections.
              </p>
              <div className="bg-orange/5 border-l-4 border-orange/60 p-4 rounded-r-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">💡</span>
                  <div className="text-brand flex-1">
                    <p>This is a demo callout with a share link button on the right.</p>
                  </div>
                  <button
                    type="button"
                    className="focus-ring ml-auto inline-flex items-center gap-2 rounded bg-orange px-2 py-1 text-xs font-medium text-white hover:bg-orange/90 transition-colors"
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
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Usage Examples</h2>

          <div className="space-y-6">
            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h3 className="text-lg font-sans font-bold text-brand mb-3">Linking to Callouts</h3>
              <p className="text-muted mb-3">
                You can now link directly to specific callouts in your essays:
              </p>
              <code className="block bg-charcoal text-silver p-3 rounded text-sm">
                {`<a href="#what-to-watch">See what to watch</a>
<a href="#ai-factory-risk">Learn about AI factory risks</a>`}
              </code>
            </div>

            <div className="bg-elevated rounded-lg p-6 border border-brand">
              <h3 className="text-lg font-sans font-bold text-brand mb-3">Linking to Headings</h3>
              <p className="text-muted mb-3">Link to specific sections within your content:</p>
              <code className="block bg-charcoal text-silver p-3 rounded text-sm">
                {`<a href="#example-heading">Jump to example section</a>
<a href="#conclusion">Go to conclusion</a>`}
              </code>
            </div>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Implementation Notes</h2>

          <div className="bg-charcoal text-silver rounded-lg p-8">
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
