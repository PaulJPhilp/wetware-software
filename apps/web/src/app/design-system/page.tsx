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
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-sans text-4xl text-brand">Design System</h1>
          <p className="mx-auto max-w-2xl text-muted">
            A comprehensive design system with semantic utilities, reusable components, and
            theme-aware styling for consistent, accessible user interfaces.
          </p>
        </div>

        {/* Semantic Utilities Demo */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold font-sans text-3xl text-brand">Semantic Utilities</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-brand bg-elevated">
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
                <a className="link-brand" href="/">
                  Brand link (.link-brand)
                </a>
                <br />
                <a className="link-brand-subtle" href="/">
                  Subtle link (.link-brand-subtle)
                </a>
              </CardContent>
            </Card>

            <Card className="border-brand bg-elevated">
              <CardHeader>
                <CardTitle className="text-brand">Background & Border</CardTitle>
                <CardDescription className="text-muted">
                  Consistent background and border utilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded border border-brand bg-brand p-3">
                  <p className="text-brand text-sm">Brand background (.bg-brand)</p>
                </div>
                <div className="rounded border border-subtle bg-elevated p-3">
                  <p className="text-brand text-sm">Elevated background (.bg-elevated)</p>
                </div>
                <div className="rounded border-orange/60 border-l-4 bg-orange/5 p-3">
                  <p className="text-brand text-sm">Accent border example</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold font-sans text-3xl text-brand">Reusable Components</h2>

          {/* Callout Examples */}
          <div className="mb-8">
            <h3 className="mb-4 font-bold font-sans text-2xl text-brand">Callouts</h3>
            <div className="space-y-4">
              <Callout title="Information" variant="info">
                This is an informational callout using the info variant with orange accent.
              </Callout>

              <Callout title="Pro Tip" variant="tip">
                This is a tip callout with slightly stronger orange background for emphasis.
              </Callout>

              <Callout title="Warning" variant="warning">
                This is a warning callout with the strongest orange accent for important notices.
              </Callout>
            </div>
          </div>

          {/* CustomTag Examples */}
          <div className="mb-8">
            <h3 className="mb-4 font-bold font-sans text-2xl text-brand">CustomTag Variants</h3>
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
              <div className="space-y-2 text-muted text-sm">
                <p>
                  <strong>Usage:</strong> Use different variants to convey meaning:
                </p>
                <ul className="list-inside list-disc space-y-1">
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
            <h3 className="mb-4 font-bold font-sans text-2xl text-brand">Figure Component</h3>
            <Figure caption="Example diagram showing the new Figure component with consistent styling">
              <div className="rounded-lg bg-silver p-8 text-center dark:bg-charcoal">
                <p className="text-muted">Your diagram or image content goes here</p>
              </div>
            </Figure>
          </div>
        </section>

        {/* Focus States Demo */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold font-sans text-3xl text-brand">Accessibility</h2>

          <div className="space-y-4">
            <h3 className="font-bold font-sans text-brand text-xl">Focus States</h3>
            <p className="text-muted">
              All interactive elements use the .focus-ring utility for consistent, accessible focus
              indicators.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="focus-ring">Button with focus ring</Button>
              <Button className="focus-ring" variant="outline">
                Outline button
              </Button>
              <a className="link-brand focus-ring rounded px-3 py-2" href="/">
                Link with focus ring
              </a>
            </div>
          </div>
        </section>

        {/* Typography Demo */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold font-sans text-3xl text-brand">Typography</h2>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-sans prose-p:font-serif">
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
              <a className="link-brand" href="/">
                branded link
              </a>{" "}
              that uses the orange accent color with hover effects. The link styling includes
              underline offset and opacity changes.
            </p>
          </div>
        </section>

        {/* SVG Demo */}
        <section className="mb-16">
          <h2 className="mb-8 font-bold font-sans text-3xl text-brand">Theme-Aware SVGs</h2>
          <ExampleSVG />
        </section>

        {/* Color System */}
        <ColorSystemExamples />

        {/* Implementation Notes */}
        <section className="mt-16 rounded-lg bg-charcoal p-8 text-silver">
          <h2 className="mb-4 font-bold font-sans text-2xl">Implementation Notes</h2>
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
