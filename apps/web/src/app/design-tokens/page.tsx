import { Callout } from "@/components/Callout";
import { Figure } from "@/components/Figure";

export default function DesignTokensPage() {
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-sans text-4xl text-brand">Design Tokens</h1>
          <p className="text-muted">
            Complete reference for semantic utilities, color values, and usage guidelines.
          </p>
        </div>

        {/* Color Tokens */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Color Tokens</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-bold font-sans text-brand text-xl">Light Theme</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded border border-brand bg-silver" />
                  <div>
                    <p className="font-medium text-brand">Silver</p>
                    <code className="text-sm text-subtle">rgb(248, 248, 248)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded border border-brand bg-charcoal" />
                  <div>
                    <p className="font-medium text-brand">Charcoal</p>
                    <code className="text-sm text-subtle">rgb(33, 33, 33)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded border border-brand bg-orange" />
                  <div>
                    <p className="font-medium text-brand">Orange</p>
                    <code className="text-sm text-subtle">rgb(255, 122, 0)</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold font-sans text-brand text-xl">Dark Theme</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded border border-brand bg-charcoal" />
                  <div>
                    <p className="font-medium text-brand">Silver (Dark)</p>
                    <code className="text-sm text-subtle">rgb(24, 24, 24)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded border border-brand bg-silver" />
                  <div>
                    <p className="font-medium text-brand">Charcoal (Dark)</p>
                    <code className="text-sm text-subtle">rgb(248, 248, 248)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded border border-brand bg-orange" />
                  <div>
                    <p className="font-medium text-brand">Orange (Dark)</p>
                    <code className="text-sm text-subtle">rgb(255, 150, 60)</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Utilities */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Semantic Utilities</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Text Utilities</h3>
              <div className="space-y-2 rounded-lg bg-elevated p-4">
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.text-brand</code>
                  <span className="text-brand">Primary text color</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.text-muted</code>
                  <span className="text-muted">Secondary text color (60% opacity)</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.text-subtle</code>
                  <span className="text-subtle">Subtle text color (40% opacity)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Background Utilities</h3>
              <div className="space-y-2 rounded-lg bg-elevated p-4">
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.bg-brand</code>
                  <span className="text-brand">Primary background color</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.bg-elevated</code>
                  <span className="text-brand">Elevated background (cards, modals)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Border Utilities</h3>
              <div className="space-y-2 rounded-lg bg-elevated p-4">
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.border-brand</code>
                  <span className="text-brand">Standard border (10% opacity)</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.border-subtle</code>
                  <span className="text-brand">Subtle border (5% opacity)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Link Utilities</h3>
              <div className="space-y-2 rounded-lg bg-elevated p-4">
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.link-brand</code>
                  <a className="link-brand" href="/">
                    Primary link styling
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.link-brand-subtle</code>
                  <a className="link-brand-subtle" href="/">
                    Subtle link for prose
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Interactive Utilities</h3>
              <div className="space-y-2 rounded-lg bg-elevated p-4">
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.focus-ring</code>
                  <span className="text-brand">Accessible focus indicator</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="rounded bg-orange/10 px-2 py-1 text-sm">.emphasis-brand</code>
                  <span className="emphasis-brand">Inline emphasis styling</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Typography Scale</h2>

          <div className="space-y-4">
            <div className="rounded-lg bg-elevated p-4">
              <h1 className="mb-2 font-bold font-sans text-4xl text-brand">Heading 1</h1>
              <code className="text-sm text-subtle">text-4xl font-sans font-bold</code>
            </div>

            <div className="rounded-lg bg-elevated p-4">
              <h2 className="mb-2 font-bold font-sans text-3xl text-brand">Heading 2</h2>
              <code className="text-sm text-subtle">text-3xl font-sans font-bold</code>
            </div>

            <div className="rounded-lg bg-elevated p-4">
              <h3 className="mb-2 font-bold font-sans text-2xl text-brand">Heading 3</h3>
              <code className="text-sm text-subtle">text-2xl font-sans font-bold</code>
            </div>

            <div className="rounded-lg bg-elevated p-4">
              <p className="mb-2 font-serif text-brand leading-relaxed">
                Body text using Merriweather for optimal readability in long-form content. This
                demonstrates the serif font choice for prose content.
              </p>
              <code className="text-sm text-subtle">font-serif leading-relaxed</code>
            </div>

            <div className="rounded-lg bg-elevated p-4">
              <code className="font-mono text-brand text-sm">
                Code text using Fira Code monospace font
              </code>
              <br />
              <code className="text-sm text-subtle">font-mono text-sm</code>
            </div>
          </div>
        </section>

        {/* Component Usage */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Component Usage</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Callout Component</h3>
              <div className="space-y-3">
                <Callout title="Info Callout" variant="info">
                  Use for informational content with subtle orange accent.
                </Callout>
                <div className="rounded-lg bg-elevated p-4">
                  <code className="text-sm text-subtle">
                    {`<Callout variant="info" title="Info Callout">
  Content goes here
</Callout>`}
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-bold font-sans text-brand text-xl">Figure Component</h3>
              <Figure caption="Example figure with consistent styling">
                <div className="rounded-lg bg-silver p-8 text-center dark:bg-charcoal">
                  <p className="text-muted">Your content here</p>
                </div>
              </Figure>
              <div className="rounded-lg bg-elevated p-4">
                <code className="text-sm text-subtle">
                  {`<Figure caption="Your caption">
  <YourContent />
</Figure>`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* SVG Guidelines */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">SVG Guidelines</h2>

          <div className="space-y-4">
            <Callout title="Theme-Aware SVGs" variant="tip">
              Use <code>currentColor</code> for strokes and fills, then apply Tailwind text color
              classes to the SVG element.
            </Callout>

            <div className="rounded-lg bg-elevated p-4">
              <h4 className="mb-2 font-bold font-sans text-brand text-lg">Basic SVG</h4>
              <code className="mb-2 block text-sm text-subtle">
                {`<svg className="text-charcoal dark:text-silver">
  <path stroke="currentColor" />
</svg>`}
              </code>
            </div>

            <div className="rounded-lg bg-elevated p-4">
              <h4 className="mb-2 font-bold font-sans text-brand text-lg">SVG with Accents</h4>
              <code className="mb-2 block text-sm text-subtle">
                {`<div className="[&_.accent]:text-orange">
  <svg className="text-charcoal dark:text-silver">
    <path className="accent" stroke="currentColor" />
  </svg>
</div>`}
              </code>
            </div>
          </div>
        </section>

        {/* Accessibility Guidelines */}
        <section className="mb-12">
          <h2 className="mb-6 font-bold font-sans text-3xl text-brand">Accessibility Guidelines</h2>

          <div className="space-y-4">
            <Callout title="Contrast Requirements" variant="warning">
              All color combinations meet WCAG AA contrast requirements. Charcoal on Silver provides
              excellent readability.
            </Callout>

            <div className="rounded-lg bg-elevated p-4">
              <h4 className="mb-2 font-bold font-sans text-brand text-lg">Focus States</h4>
              <p className="mb-2 text-muted">
                Always apply <code>.focus-ring</code> to interactive elements for keyboard
                navigation.
              </p>
              <code className="text-sm text-subtle">
                {`<button className="focus-ring">Button</button>
<a href="#" className="link-brand focus-ring">Link</a>`}
              </code>
            </div>

            <div className="rounded-lg bg-elevated p-4">
              <h4 className="mb-2 font-bold font-sans text-brand text-lg">Color Usage</h4>
              <ul className="space-y-1 text-muted">
                <li>• Use Orange for accents only (10-15% of visual field)</li>
                <li>• Never use Orange as body text</li>
                <li>• Ensure sufficient contrast for all text combinations</li>
                <li>• Test with color blindness simulators</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
