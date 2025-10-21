import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default function WorkPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Briefcase className="w-6 h-6 text-orange" />
          <h1 className="text-2xl font-sans font-bold text-charcoal dark:text-white leading-tight">
            Work & Portfolio
          </h1>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          <p className="text-sm font-serif text-charcoal/80 dark:text-gray-300">
            Exploring the intersection of human creativity and AI innovation
          </p>
          <p className="text-sm text-charcoal/60 dark:text-gray-400 leading-snug">
            Currently focused on building tools and frameworks that enhance human-AI collaboration.
            My work spans from experimental research to production-ready applications.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white">
            Projects Coming Soon
          </h2>
          <p className="text-charcoal/60 dark:text-gray-400">
            Building something interesting? Check back soon.
          </p>
        </div>

        <div className="bg-silver/30 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-charcoal/20 dark:border-gray-700 p-12 text-center">
          <p className="text-charcoal/60 dark:text-gray-400">
            I'm currently working on several projects that I'll be sharing here soon.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-charcoal text-white rounded-lg p-8 text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-sans font-bold">Let's Connect</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Interested in collaborating or learning more about my work? I'd love to hear from you.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="outline" asChild className="bg-white text-charcoal hover:bg-white/90">
            <a href="https://github.com/PaulJPhilp" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub Profile
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="text-white border-white/40 hover:bg-white/10"
          >
            <Link href="/connect">
              <ExternalLink className="w-4 h-4 mr-2" />
              Get in Touch
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
