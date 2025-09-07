import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example components demonstrating the new brand color system
 * These show how to use the CSS variables and semantic color classes
 */
export function ColorSystemExamples() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Color Palette Display */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Brand Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-silver rounded-lg border border-brand"></div>
            <p className="text-sm text-muted">Silver</p>
            <code className="text-xs text-subtle">rgb(var(--color-silver))</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-charcoal rounded-lg border border-brand"></div>
            <p className="text-sm text-muted">Charcoal</p>
            <code className="text-xs text-subtle">rgb(var(--color-charcoal))</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-orange rounded-lg border border-brand"></div>
            <p className="text-sm text-muted">Orange</p>
            <code className="text-xs text-subtle">rgb(var(--color-orange))</code>
          </div>
        </div>
      </section>

      {/* Button Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-orange text-white hover:bg-orange/90">Primary Button</Button>
          <Button
            variant="outline"
            className="bg-silver text-charcoal border border-charcoal/10 hover:border-charcoal/20 dark:bg-[#181818] dark:text-silver"
          >
            Secondary Button
          </Button>
          <Button variant="ghost" className="text-orange hover:bg-orange/10">
            Ghost Button
          </Button>
        </div>
      </section>

      {/* Card Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Card Components</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-silver text-charcoal dark:bg-[#181818] dark:text-silver border border-brand">
            <CardHeader>
              <CardTitle className="text-brand">Standard Card</CardTitle>
              <CardDescription className="text-brand-muted">
                Using brand color utilities for consistent theming
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted">
                This card uses the semantic color classes that automatically adapt to light/dark
                themes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange/5 border-l-4 border-orange/70 text-charcoal dark:text-silver">
            <CardHeader>
              <CardTitle className="text-brand">Info Callout</CardTitle>
              <CardDescription className="text-muted">
                Highlighted with orange accent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted">
                This demonstrates how to use orange as an accent color for important information.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Typography</h2>
        <div className="prose max-w-none dark:prose-invert prose-headings:font-sans prose-p:font-serif">
          <h1>Heading with Montserrat</h1>
          <p>
            Body text using Merriweather for readability. This demonstrates the
            <span className="emphasis-brand">inline emphasis</span> styling with orange background.
          </p>
          <h2>Links and Interactive Elements</h2>
          <p>
            Here's a{" "}
            <a href="https://example.com" className="link-brand">
              branded link
            </a>{" "}
            that uses the orange accent color with hover effects. The link styling includes
            underline offset and opacity changes.
          </p>
        </div>
      </section>

      {/* Badge Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Badges and Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-orange text-white">Primary</Badge>
          <Badge
            variant="outline"
            className="border-charcoal/20 text-charcoal dark:border-white/20 dark:text-silver"
          >
            Secondary
          </Badge>
          <Badge
            variant="secondary"
            className="bg-silver text-charcoal dark:bg-charcoal dark:text-silver"
          >
            Neutral
          </Badge>
        </div>
      </section>

      {/* Diagram Color Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Diagram Colors</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-diagram-line rounded"></div>
            <span className="text-muted">diagram-line (charcoal)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-diagram-subtle rounded"></div>
            <span className="text-muted">diagram-subtle (charcoal/60)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-diagram-accent rounded"></div>
            <span className="text-muted">diagram-accent (orange)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-diagram-bg rounded border border-brand"></div>
            <span className="text-muted">diagram-bg (silver)</span>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <h2 className="text-2xl font-sans font-bold text-brand">Usage Guidelines</h2>
        <div className="bg-orange/5 border border-orange/20 rounded-lg p-6">
          <h3 className="text-lg font-sans font-semibold text-brand mb-3">
            Accessibility & Contrast
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-muted">
            <li>Charcoal on Silver easily passes WCAG AA contrast requirements</li>
            <li>Use Orange for strokes, icons, or buttons with Charcoal/White text</li>
            <li>Avoid Orange as body text - use it for accents only</li>
            <li>Reserve Orange for 10-15% of the visual field for maximum impact</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/**
 * Example SVG component showing theme-aware styling
 * This demonstrates how to make SVGs work with the color system
 */
export function ExampleSVG() {
  return (
    <div className="[&_.accent]:text-orange">
      <figure className="mx-auto w-full max-w-3xl">
        <svg
          className="h-auto w-full text-charcoal dark:text-silver"
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Example theme-aware diagram</title>
          {/* Background */}
          <rect width="400" height="200" fill="currentColor" fillOpacity="0.08" />

          {/* Main flow lines */}
          <path
            d="M50 100 L150 100 L200 50 L350 50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />

          {/* Accent arrow */}
          <path
            d="M200 50 L200 100 L250 100"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="accent"
          />

          {/* Nodes */}
          <circle cx="50" cy="100" r="8" fill="currentColor" />
          <circle cx="150" cy="100" r="8" fill="currentColor" />
          <circle cx="200" cy="50" r="8" fill="currentColor" className="accent" />
          <circle cx="350" cy="50" r="8" fill="currentColor" />

          {/* Labels */}
          <text x="50" y="120" textAnchor="middle" className="text-xs fill-current opacity-60">
            Start
          </text>
          <text x="150" y="120" textAnchor="middle" className="text-xs fill-current opacity-60">
            Process
          </text>
          <text
            x="200"
            y="35"
            textAnchor="middle"
            className="text-xs fill-current opacity-60 accent"
          >
            Decision
          </text>
          <text x="350" y="35" textAnchor="middle" className="text-xs fill-current opacity-60">
            End
          </text>
        </svg>
        <figcaption className="mt-2 text-sm text-muted text-center">
          Example theme-aware SVG with CSS accent handling: Installation period → turning point →
          deployment period.
        </figcaption>
      </figure>
    </div>
  );
}
