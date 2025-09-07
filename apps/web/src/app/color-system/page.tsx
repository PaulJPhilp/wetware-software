import { ColorSystemExamples, ExampleSVG } from "@/components/ColorSystemExamples";

export default function ColorSystemPage() {
  return (
    <main className="min-h-screen bg-brand">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sans font-bold text-brand mb-4">Brand Color System</h1>
          <p className="text-brand-muted max-w-2xl mx-auto">
            A comprehensive color system using CSS variables for consistent theming across light and
            dark modes. All colors automatically adapt based on the current theme.
          </p>
        </div>

        <ColorSystemExamples />

        <div className="mt-16">
          <h2 className="text-2xl font-sans font-bold text-brand mb-8 text-center">
            Theme-Aware SVG Example
          </h2>
          <ExampleSVG />
        </div>

        <div className="mt-16 bg-charcoal text-silver rounded-lg p-8">
          <h2 className="text-2xl font-sans font-bold mb-4">Implementation Notes</h2>
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
