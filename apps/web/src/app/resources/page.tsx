import { ResourceCard } from "@/components/ResourceCard";
import { CURATED_RESOURCES } from "@/lib/data/curatedResources";

export const metadata = {
  title: "Curated Resources",
  description:
    "A curated collection of high-quality learning materials for Effect-TS and AI Coding. Official documentation, community guides, tutorials, and video content to help you master these technologies.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
            Curated Resources
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            A curated collection of high-quality learning materials for Effect-TS and AI Coding.
            From official documentation to community guides, tutorials, and video content.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      {CURATED_RESOURCES.map((category) => (
        <section key={category.title} className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl text-foreground">{category.title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>

          {category.resources.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.resources.map((resource) => (
                <ResourceCard key={resource.url} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-subtle bg-elevated p-8 text-center">
              <p className="text-muted-foreground text-sm">
                Resources coming soon. Check back later!
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

