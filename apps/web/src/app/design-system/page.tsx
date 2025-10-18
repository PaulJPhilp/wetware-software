import { Callout } from "@/components/Callout";
import { ColorSystemExamples, ExampleSVG } from "@/components/ColorSystemExamples";
import { CustomTag } from "@/components/CustomTag";
import { Figure } from "@/components/Figure";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sans font-bold text-brand mb-4">Design System</h1>
          <p className="text-muted max-w-2xl mx-auto">
            A comprehensive design system with semantic utilities, reusable components, and
            theme-aware styling for consistent, accessible user interfaces.
          </p>
        </div>

        {/* Semantic Utilities Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-sans font-bold text-brand mb-8">Semantic Utilities</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-elevated border-brand">
              <CardHeader>
                <CardTitle className="text-brand">Text Utilities</CardTitle>
                <CardDescription className="text-muted">
                  Semantic text color classes that adapt to themes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-brand">Primary text (.text-brand)</p>
                <p className="text-muted">Secondary text (.text-muted)</p>
                <p className="text-subtle">Subtle text (.text-subtle)</p>
                <a href="/" className="link-brand">
                  Brand link (.link-brand)
                </a>
                <br />
                <a href="/" className="link-brand-subtle">
                  Subtle link (.link-brand-subtle)
                </a>
              </CardContent>
            </Card>

            <Card className="bg-elevated border-brand">
              <CardHeader>
                <CardTitle className="text-brand">Background & Border</CardTitle>
                <CardDescription className="text-muted">
                  Consistent background and border utilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-brand rounded border border-brand">
                  <p className="text-brand text-sm">Brand background (.bg-brand)</p>
                </div>
                <div className="p-3 bg-elevated rounded border border-subtle">
                  <p className="text-brand text-sm">Elevated background (.bg-elevated)</p>
                </div>
                <div className="p-3 bg-orange/5 rounded border-l-4 border-orange/60">
                  <p className="text-brand text-sm">Accent border example</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-sans font-bold text-brand mb-8">Reusable Components</h2>

          {/* Callout Examples */}
          <div className="mb-8">
            <h3 className="text-2xl font-sans font-bold text-brand mb-4">Callouts</h3>
            <div className="space-y-4">
              <Callout variant="info" title="Information">
                This is an informational callout using the info variant with orange accent.
              </Callout>

              <Callout variant="tip" title="Pro Tip">
                This is a tip callout with slightly stronger orange background for emphasis.
              </Callout>

              <Callout variant="warning" title="Warning">
                This is a warning callout with the strongest orange accent for important notices.
              </Callout>
            </div>
          </div>

          {/* CustomTag Examples */}
          <div className="mb-8">
            <h3 className="text-2xl font-sans font-bold text-brand mb-4">CustomTag Variants</h3>
            <div className="space-y-4">
              <p className="text-muted">
                Flexible tag component with multiple visual variants for different contexts and
                meanings.
              </p>
              <div className="flex flex-wrap gap-2">
                <CustomTag variant="default">Default</CustomTag>
                <CustomTag variant="primary">Primary</CustomTag>
                <CustomTag variant="secondary">Secondary</CustomTag>
                <CustomTag variant="success">Success</CustomTag>
                <CustomTag variant="warning">Warning</CustomTag>
              </div>
              <div className="text-sm text-muted space-y-2">
                <p>
                  <strong>Usage:</strong> Use different variants to convey meaning:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <code>default</code>: General purpose tags (backwards compatible)
                  </li>
                  <li>
                    <code>primary</code>: Featured or important content
                  </li>
                  <li>
                    <code>secondary</code>: Less prominent categories
                  </li>
                  <li>
                    <code>success</code>: Positive states like "Published" or "Approved"
                  </li>
                  <li>
                    <code>warning</code>: Alerts or error states like "Draft" or "Urgent"
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Figure Example */}
          <div className="mb-8">
            <h3 className="text-2xl font-sans font-bold text-brand mb-4">Figure Component</h3>
            <Figure caption="Example diagram showing the new Figure component with consistent styling">
              <div className="bg-silver dark:bg-charcoal rounded-lg p-8 text-center">
                <p className="text-muted">Your diagram or image content goes here</p>
              </div>
            </Figure>
          </div>
        </section>

        {/* Focus States Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-sans font-bold text-brand mb-8">Accessibility</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-sans font-bold text-brand">Focus States</h3>
            <p className="text-muted">
              All interactive elements use the .focus-ring utility for consistent, accessible focus
              indicators.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="focus-ring">Button with focus ring</Button>
              <Button variant="outline" className="focus-ring">
                Outline button
              </Button>
              <a href="/" className="link-brand focus-ring px-3 py-2 rounded">
                Link with focus ring
              </a>
            </div>
          </div>
        </section>

        {/* Typography Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-sans font-bold text-brand mb-8">Typography</h2>

          <div className="prose max-w-none dark:prose-invert prose-headings:font-sans prose-p:font-serif">
            <h1>Heading 1 with Montserrat</h1>
            <p>
              Body text using Merriweather for optimal readability. This demonstrates the
              <span className="emphasis-brand">inline emphasis</span> styling with orange
              background.
            </p>

            <h2>Code Examples</h2>
            <p>
              Inline code uses <code>orange background</code> for emphasis, while code blocks use a
              dark theme with proper contrast.
            </p>

            <pre>
              <code>
                {/* Code blocks use dark background with silver text */}
                const example = "theme-aware styling";
              </code>
            </pre>

            <h2>Links and Interactive Elements</h2>
            <p>
              Here's a{" "}
              <a href="/" className="link-brand">
                branded link
              </a>{" "}
              that uses the orange accent color with hover effects. The link styling includes
              underline offset and opacity changes.
            </p>
          </div>
        </section>

        {/* SVG Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-sans font-bold text-brand mb-8">Theme-Aware SVGs</h2>
          <ExampleSVG />
        </section>

        {/* Color System */}
        <ColorSystemExamples />

        {/* Implementation Notes */}
        <section className="mt-16 bg-charcoal text-silver rounded-lg p-8">
          <h2 className="text-2xl font-sans font-bold mb-4">Implementation Notes</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              This design system provides a comprehensive foundation for building consistent,
              accessible user interfaces. All components and utilities automatically adapt to light
              and dark themes.
            </p>

            <h3>Key Features:</h3>
            <ul>
              <li>
                <strong>Semantic Utilities:</strong> .text-brand, .text-muted, .bg-elevated, etc.
              </li>
              <li>
                <strong>Focus States:</strong> .focus-ring for accessible keyboard navigation
              </li>
              <li>
                <strong>Link Variants:</strong> .link-brand and .link-brand-subtle for different
                contexts
              </li>
              <li>
                <strong>Reusable Components:</strong> CustomTag, Figure, Callout, Epigraph for
                consistent content
              </li>
              <li>
                <strong>Theme Awareness:</strong> Automatic light/dark mode switching
              </li>
              <li>
                <strong>SVG Support:</strong> CSS accent handling with [&_.accent]:text-orange
              </li>
            </ul>

            <h3>Usage Guidelines:</h3>
            <ul>
              <li>Use semantic utilities instead of hardcoded colors</li>
              <li>Apply .focus-ring to all interactive elements</li>
              <li>Use .link-brand-subtle for prose content, .link-brand for navigation</li>
              <li>
                Use CustomTag variants to convey meaning (default for general, primary for featured,
                success/warning for states)
              </li>
              <li>Wrap SVGs with accent classes for theme-aware styling</li>
              <li>Reserve orange for 10-15% of visual elements for maximum impact</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
