import { Callout } from "@/components/Callout";
import { Figure } from "@/components/Figure";

export default function DesignTokensPage() {
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sans font-bold text-brand mb-4">Design Tokens</h1>
          <p className="text-muted">
            Complete reference for semantic utilities, color values, and usage guidelines.
          </p>
        </div>

        {/* Color Tokens */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Color Tokens</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-sans font-bold text-brand">Light Theme</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-silver rounded border border-brand"></div>
                  <div>
                    <p className="text-brand font-medium">Silver</p>
                    <code className="text-subtle text-sm">rgb(248, 248, 248)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-charcoal rounded border border-brand"></div>
                  <div>
                    <p className="text-brand font-medium">Charcoal</p>
                    <code className="text-subtle text-sm">rgb(33, 33, 33)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange rounded border border-brand"></div>
                  <div>
                    <p className="text-brand font-medium">Orange</p>
                    <code className="text-subtle text-sm">rgb(255, 122, 0)</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-sans font-bold text-brand">Dark Theme</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-charcoal rounded border border-brand"></div>
                  <div>
                    <p className="text-brand font-medium">Silver (Dark)</p>
                    <code className="text-subtle text-sm">rgb(24, 24, 24)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-silver rounded border border-brand"></div>
                  <div>
                    <p className="text-brand font-medium">Charcoal (Dark)</p>
                    <code className="text-subtle text-sm">rgb(248, 248, 248)</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange rounded border border-brand"></div>
                  <div>
                    <p className="text-brand font-medium">Orange (Dark)</p>
                    <code className="text-subtle text-sm">rgb(255, 150, 60)</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Utilities */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Semantic Utilities</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Text Utilities</h3>
              <div className="bg-elevated rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.text-brand</code>
                  <span className="text-brand">Primary text color</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.text-muted</code>
                  <span className="text-muted">Secondary text color (60% opacity)</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.text-subtle</code>
                  <span className="text-subtle">Subtle text color (40% opacity)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Background Utilities</h3>
              <div className="bg-elevated rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.bg-brand</code>
                  <span className="text-brand">Primary background color</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.bg-elevated</code>
                  <span className="text-brand">Elevated background (cards, modals)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Border Utilities</h3>
              <div className="bg-elevated rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.border-brand</code>
                  <span className="text-brand">Standard border (10% opacity)</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.border-subtle</code>
                  <span className="text-brand">Subtle border (5% opacity)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Link Utilities</h3>
              <div className="bg-elevated rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.link-brand</code>
                  <a href="/" className="link-brand">
                    Primary link styling
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.link-brand-subtle</code>
                  <a href="/" className="link-brand-subtle">
                    Subtle link for prose
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Interactive Utilities</h3>
              <div className="bg-elevated rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.focus-ring</code>
                  <span className="text-brand">Accessible focus indicator</span>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-orange/10 px-2 py-1 rounded">.emphasis-brand</code>
                  <span className="emphasis-brand">Inline emphasis styling</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Typography Scale</h2>

          <div className="space-y-4">
            <div className="bg-elevated rounded-lg p-4">
              <h1 className="text-4xl font-sans font-bold text-brand mb-2">Heading 1</h1>
              <code className="text-subtle text-sm">text-4xl font-sans font-bold</code>
            </div>

            <div className="bg-elevated rounded-lg p-4">
              <h2 className="text-3xl font-sans font-bold text-brand mb-2">Heading 2</h2>
              <code className="text-subtle text-sm">text-3xl font-sans font-bold</code>
            </div>

            <div className="bg-elevated rounded-lg p-4">
              <h3 className="text-2xl font-sans font-bold text-brand mb-2">Heading 3</h3>
              <code className="text-subtle text-sm">text-2xl font-sans font-bold</code>
            </div>

            <div className="bg-elevated rounded-lg p-4">
              <p className="text-brand font-serif leading-relaxed mb-2">
                Body text using Merriweather for optimal readability in long-form content. This
                demonstrates the serif font choice for prose content.
              </p>
              <code className="text-subtle text-sm">font-serif leading-relaxed</code>
            </div>

            <div className="bg-elevated rounded-lg p-4">
              <code className="text-brand font-mono text-sm">
                Code text using Fira Code monospace font
              </code>
              <br />
              <code className="text-subtle text-sm">font-mono text-sm</code>
            </div>
          </div>
        </section>

        {/* Component Usage */}
        <section className="mb-12">
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Component Usage</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Callout Component</h3>
              <div className="space-y-3">
                <Callout variant="info" title="Info Callout">
                  Use for informational content with subtle orange accent.
                </Callout>
                <div className="bg-elevated rounded-lg p-4">
                  <code className="text-sm text-subtle">
                    {`<Callout variant="info" title="Info Callout">
  Content goes here
</Callout>`}
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-sans font-bold text-brand mb-3">Figure Component</h3>
              <Figure caption="Example figure with consistent styling">
                <div className="bg-silver dark:bg-charcoal rounded-lg p-8 text-center">
                  <p className="text-muted">Your content here</p>
                </div>
              </Figure>
              <div className="bg-elevated rounded-lg p-4">
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
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">SVG Guidelines</h2>

          <div className="space-y-4">
            <Callout variant="tip" title="Theme-Aware SVGs">
              Use <code>currentColor</code> for strokes and fills, then apply Tailwind text color
              classes to the SVG element.
            </Callout>

            <div className="bg-elevated rounded-lg p-4">
              <h4 className="text-lg font-sans font-bold text-brand mb-2">Basic SVG</h4>
              <code className="text-sm text-subtle block mb-2">
                {`<svg className="text-charcoal dark:text-silver">
  <path stroke="currentColor" />
</svg>`}
              </code>
            </div>

            <div className="bg-elevated rounded-lg p-4">
              <h4 className="text-lg font-sans font-bold text-brand mb-2">SVG with Accents</h4>
              <code className="text-sm text-subtle block mb-2">
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
          <h2 className="text-3xl font-sans font-bold text-brand mb-6">Accessibility Guidelines</h2>

          <div className="space-y-4">
            <Callout variant="warning" title="Contrast Requirements">
              All color combinations meet WCAG AA contrast requirements. Charcoal on Silver provides
              excellent readability.
            </Callout>

            <div className="bg-elevated rounded-lg p-4">
              <h4 className="text-lg font-sans font-bold text-brand mb-2">Focus States</h4>
              <p className="text-muted mb-2">
                Always apply <code>.focus-ring</code> to interactive elements for keyboard
                navigation.
              </p>
              <code className="text-sm text-subtle">
                {`<button className="focus-ring">Button</button>
<a href="#" className="link-brand focus-ring">Link</a>`}
              </code>
            </div>

            <div className="bg-elevated rounded-lg p-4">
              <h4 className="text-lg font-sans font-bold text-brand mb-2">Color Usage</h4>
              <ul className="text-muted space-y-1">
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
