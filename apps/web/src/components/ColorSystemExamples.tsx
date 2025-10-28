import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example components demonstrating the new brand color system
 * These show how to use the CSS variables and semantic color classes
 */
export function ColorSystemExamples() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Color Palette Display */}
      <section className="space-y-6">
        <h2 className="font-bold font-sans text-2xl text-brand">Brand Color Palette</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-brand bg-silver" />
            <p className="text-muted text-sm">Silver</p>
            <code className="text-subtle text-xs">rgb(var(--color-silver))</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-brand bg-charcoal" />
            <p className="text-muted text-sm">Charcoal</p>
            <code className="text-subtle text-xs">rgb(var(--color-charcoal))</code>
          </div>
          <div className="space-y-2">
            <div className="h-20 rounded-lg border border-brand bg-orange" />
            <p className="text-muted text-sm">Orange</p>
            <code className="text-subtle text-xs">rgb(var(--color-orange))</code>
          </div>
        </div>
      </section>

      {/* Button Examples */}
      <section className="space-y-6">
        <h2 className="font-bold font-sans text-2xl text-brand">Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-orange text-white hover:bg-orange/90">Primary Button</Button>
          <Button
            className="border border-charcoal/10 bg-silver text-charcoal hover:border-charcoal/20 dark:bg-[#181818] dark:text-silver"
            variant="outline"
          >
            Secondary Button
          </Button>
          <Button className="text-orange hover:bg-orange/10" variant="ghost">
            Ghost Button
          </Button>
        </div>
      </section>

      {/* Card Examples */}
      <section className="space-y-6">
        <h2 className="font-bold font-sans text-2xl text-brand">Card Components</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-brand bg-silver text-charcoal dark:bg-[#181818] dark:text-silver">
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

          <Card className="border-orange/70 border-l-4 bg-orange/5 text-charcoal dark:text-silver">
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
        <h2 className="font-bold font-sans text-2xl text-brand">Typography</h2>
        <div className="prose dark:prose-invert max-w-none prose-headings:font-sans prose-p:font-serif">
          <h1>Heading with Montserrat</h1>
          <p>
            Body text using Merriweather for readability. This demonstrates the
            <span className="emphasis-brand">inline emphasis</span> styling with orange background.
          </p>
          <h2>Links and Interactive Elements</h2>
          <p>
            Here's a{" "}
            <a className="link-brand" href="https://example.com">
              branded link
            </a>{" "}
            that uses the orange accent color with hover effects. The link styling includes
            underline offset and opacity changes.
          </p>
        </div>
      </section>

      {/* Badge Examples */}
      <section className="space-y-6">
        <h2 className="font-bold font-sans text-2xl text-brand">Badges and Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-orange text-white">Primary</Badge>
          <Badge
            className="border-charcoal/20 text-charcoal dark:border-white/20 dark:text-silver"
            variant="outline"
          >
            Secondary
          </Badge>
          <Badge
            className="bg-silver text-charcoal dark:bg-charcoal dark:text-silver"
            variant="secondary"
          >
            Neutral
          </Badge>
        </div>
      </section>

      {/* Diagram Color Examples */}
      <section className="space-y-6">
        <h2 className="font-bold font-sans text-2xl text-brand">Diagram Colors</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded bg-diagram-line" />
            <span className="text-muted">diagram-line (charcoal)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded bg-diagram-subtle" />
            <span className="text-muted">diagram-subtle (charcoal/60)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded bg-diagram-accent" />
            <span className="text-muted">diagram-accent (orange)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded border border-brand bg-diagram-bg" />
            <span className="text-muted">diagram-bg (silver)</span>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <h2 className="font-bold font-sans text-2xl text-brand">Usage Guidelines</h2>
        <div className="rounded-lg border border-orange/20 bg-orange/5 p-6">
          <h3 className="mb-3 font-sans font-semibold text-brand text-lg">
            Accessibility & Contrast
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-muted">
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
          fill="none"
          viewBox="0 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Example theme-aware diagram</title>
          {/* Background */}
          <rect fill="currentColor" fillOpacity="0.08" height="200" width="400" />

          {/* Main flow lines */}
          <path
            d="M50 100 L150 100 L200 50 L350 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Accent arrow */}
          <path
            className="accent"
            d="M200 50 L200 100 L250 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

          {/* Nodes */}
          <circle cx="50" cy="100" fill="currentColor" r="8" />
          <circle cx="150" cy="100" fill="currentColor" r="8" />
          <circle className="accent" cx="200" cy="50" fill="currentColor" r="8" />
          <circle cx="350" cy="50" fill="currentColor" r="8" />

          {/* Labels */}
          <text className="fill-current text-xs opacity-60" textAnchor="middle" x="50" y="120">
            Start
          </text>
          <text className="fill-current text-xs opacity-60" textAnchor="middle" x="150" y="120">
            Process
          </text>
          <text
            className="accent fill-current text-xs opacity-60"
            textAnchor="middle"
            x="200"
            y="35"
          >
            Decision
          </text>
          <text className="fill-current text-xs opacity-60" textAnchor="middle" x="350" y="35">
            End
          </text>
        </svg>
        <figcaption className="mt-2 text-center text-muted text-sm">
          Example theme-aware SVG with CSS accent handling: Installation period → turning point →
          deployment period.
        </figcaption>
      </figure>
    </div>
  );
}
