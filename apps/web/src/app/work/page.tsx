import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-12">
      {/* Header Section */}
      <section className="space-y-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Briefcase className="h-6 w-6 text-orange" />
          <h1 className="font-bold font-sans text-2xl text-charcoal leading-tight dark:text-white">
            Work & Portfolio
          </h1>
        </div>
        <div className="mx-auto max-w-3xl space-y-2">
          <p className="font-serif text-charcoal/80 text-sm dark:text-gray-300">
            Exploring the intersection of human creativity and AI innovation
          </p>
          <p className="text-charcoal/60 text-sm leading-snug dark:text-gray-400">
            Currently focused on building tools and frameworks that enhance human-AI collaboration.
            My work spans from experimental research to production-ready applications.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-bold font-sans text-2xl text-charcoal dark:text-white">
            Projects Coming Soon
          </h2>
          <p className="text-charcoal/60 dark:text-gray-400">
            Building something interesting? Check back soon.
          </p>
        </div>

        <div className="rounded-lg border-2 border-charcoal/20 border-dashed bg-silver/30 p-12 text-center dark:border-gray-700 dark:bg-gray-800/30">
          <p className="text-charcoal/60 dark:text-gray-400">
            I'm currently working on several projects that I'll be sharing here soon.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="space-y-6 rounded-lg bg-charcoal p-8 text-center text-white">
        <div className="space-y-4">
          <h2 className="font-bold font-sans text-2xl">Let's Connect</h2>
          <p className="mx-auto max-w-2xl text-white/80">
            Interested in collaborating or learning more about my work? I'd love to hear from you.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Button asChild className="bg-white text-charcoal hover:bg-white/90" variant="outline">
            <a href="https://github.com/PaulJPhilp" rel="noopener noreferrer" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              GitHub Profile
            </a>
          </Button>
          <Button
            asChild
            className="border-white/40 text-white hover:bg-white/10"
            variant="outline"
          >
            <Link href="/connect">
              <ExternalLink className="mr-2 h-4 w-4" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
