import { ColorSystemExamples, ExampleSVG } from "@/components/ColorSystemExamples";

export default function ColorSystemPage() {
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold font-sans text-4xl text-brand">Brand Color System</h1>
          <p className="mx-auto max-w-2xl text-brand-muted">
            A comprehensive color system using CSS variables for consistent theming across light and
            dark modes. All colors automatically adapt based on the current theme.
          </p>
        </div>

        <ColorSystemExamples />

        <div className="mt-16">
          <h2 className="mb-8 text-center font-bold font-sans text-2xl text-brand">
            Theme-Aware SVG Example
          </h2>
          <ExampleSVG />
        </div>

        <div className="mt-16 rounded-lg bg-charcoal p-8 text-silver">
          <h2 className="mb-4 font-bold font-sans text-2xl">Implementation Notes</h2>
          <div className="prose prose-invert max-w-none">
            <p>
              This color system uses CSS variables defined in <code>globals.css</code> and mapped to
              Tailwind utilities. The system automatically switches between light and dark variants
              when the theme changes.
            </p>
            <h3>Key Features:</h3>
            <ul>
              <li>
                <strong>CSS Variables:</strong> RGB values for alpha channel support
              </li>
              <li>
                <strong>Semantic Classes:</strong> text-brand, bg-brand, etc. for consistent usage
              </li>
              <li>
                <strong>Theme Awareness:</strong> Automatic light/dark mode switching
              </li>
              <li>
                <strong>Accessibility:</strong> WCAG AA compliant contrast ratios
              </li>
              <li>
                <strong>SVG Support:</strong> currentColor for theme-aware graphics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
