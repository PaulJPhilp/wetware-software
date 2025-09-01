import { NotionContent } from "@/components/NotionContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostContent, getPublishedPosts } from "@/lib/notion-utils";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Brain, ExternalLink, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

// Refresh the About page content from Notion regularly
export const revalidate = 60;

export default async function AboutPage() {
  // Try to load a published About page from Notion (slug: "about"). Fallback to local content.
  const posts = await getPublishedPosts();
  const aboutPost = posts.find((p) => p.slug === "about");
  const aboutBlocks = aboutPost ? await getPostContent(aboutPost.id) : null;
  const skills = [
    "TypeScript",
    "React/Next.js",
    "Tailwind CSS",
    "Effect-TS",
    "AI Agents/Frameworks",
    "LangChain",
    "LangGraph",
    "Vercel AI SDK",
    "Node.js",
    "PostgreSQL",
    "Notion API",
    "Human-AI Collaboration",
  ];

  const blogTopics = [
    "Building robust AI agents and conversational UIs",
    "Architecting large language model (LLM) applications for scale",
    "Effect-TS patterns and functional programming in TypeScript",
    "Human-AI collaboration frameworks and methodologies",
    "Complex systems thinking in software development",
    "The philosophical implications of AI integration",
  ];

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
      {/* Left profile rail (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div className="border border-charcoal/10 bg-white rounded-lg p-6 text-center">
            <Avatar className="w-28 h-28 mx-auto">
              <AvatarImage src="/images/avatar.jpeg" alt="Paul Philp" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <div className="mt-4 space-y-1">
              <h1 className="text-xl font-sans font-bold text-charcoal leading-tight">
                Paul Philp
              </h1>
              <p className="text-xs font-serif text-charcoal/70 leading-snug">
                Software/AI Engineer, Founder, Executive
              </p>
            </div>
          </div>
          <div className="border border-charcoal/10 bg-white rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-sans font-semibold text-charcoal">Connect</h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                asChild
                className="justify-start text-charcoal border-charcoal/20 hover:bg-charcoal/5"
              >
                <a
                  href="https://www.linkedin.com/in/pauljphilp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Profile
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="justify-start text-charcoal border-charcoal/20 hover:bg-charcoal/5"
              >
                <Link href="/connect">
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
          <div className="border border-charcoal/10 bg-white rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-sans font-semibold text-charcoal">Current Focus</h3>
            <ul className="space-y-1 text-sm text-charcoal/80">
              <li>• Human-AI collaboration frameworks</li>
              <li>• Large-scale LLM application architecture</li>
              <li>• Effect-TS and functional programming patterns</li>
              <li>• Conversational AI and agent development</li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="space-y-12">
        {/* Header Section (mobile/tablet) */}
        <section className="lg:hidden text-center space-y-4">
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src="/images/avatar.jpeg" alt="Paul Philp" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-sans font-bold text-charcoal leading-tight">
              Paul Philp
            </h1>
            <p className="text-sm font-serif text-charcoal/80 leading-snug">
              Software/AI Engineer, Founder, Executive
            </p>
            <p className="text-xs text-charcoal/60 max-w-2xl mx-auto leading-snug">
              Engineering human-AI collaboration at the intersection of complex systems and emerging
              technology
            </p>
          </div>
        </section>

        {/* Main Bio Section */}
        <section className="prose max-w-none">
          <div className="border border-charcoal/10 bg-white rounded-lg p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-orange" />
              <h2 className="text-xl font-sans font-bold text-charcoal m-0">About Paul</h2>
            </div>
            {aboutBlocks ? (
              <div className="space-y-4 text-charcoal/80">
                <NotionContent blocks={aboutBlocks.results as BlockObjectResponse[]} />
              </div>
            ) : (
              <div className="space-y-4 text-charcoal/80">
                <p>
                  Welcome to Wetware & Software! I'm Paul Philp, a software engineer, AI researcher,
                  and founder exploring the profound intersection of human systems (wetware) and
                  artificial intelligence (software). This blog serves as both a platform for
                  sharing insights and a living portfolio of my work in human-AI collaboration.
                </p>
                <p>
                  My journey spans building scalable AI applications, developing conversational UIs,
                  and architecting large language model systems for production. I'm particularly
                  passionate about Effect-TS patterns, functional programming paradigms, and the
                  philosophical implications of AI integration in human workflows.
                </p>
                <p>
                  Through this platform, I share structured explorations of complex topics via
                  series content, practical articles on technical implementation, and reflective
                  essays on the transformative potential of human-AI collaboration. My approach
                  combines deep technical insight with accessible explanations and a seriously
                  whimsical tone.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Essay Callout */}
        <section className="bg-orange/10 border border-orange/20 rounded-lg p-8">
          <div className="space-y-4">
            <h3 className="text-lg font-sans font-bold text-charcoal">Featured Essay</h3>
            <p className="text-charcoal/80">
              "What My Marriage Falling Apart Taught Me About LLMs" - A deeply personal exploration
              of complex systems, failure modes, and the surprising parallels between human
              relationships and AI architectures.
            </p>
            <Button asChild className="bg-orange hover:bg-orange/90 text-white">
              <Link href="/posts/my-marriage-and-ai">
                Read the Essay
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="space-y-6">
          <h2 className="text-2xl font-sans font-bold text-charcoal">
            Technical Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-silver text-charcoal">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Blog Topics */}
        <section className="space-y-6">
          <h2 className="text-2xl font-sans font-bold text-charcoal">What I Write About</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {blogTopics.map((topic) => (
              <div key={topic} className="flex items-start gap-3 p-4 bg-silver/30 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-orange mt-2 flex-shrink-0" />
                <p className="text-charcoal/80">{topic}</p>
              </div>
            ))}
          </div>
        </section>

        {/* At a Glance & Contact (mobile/tablet) */}
        <section className="lg:hidden bg-charcoal text-white rounded-lg p-8 space-y-6">
          <h2 className="text-xl font-sans font-bold">Paul Philp: At a Glance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-base font-sans font-semibold text-orange">Current Focus</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Human-AI collaboration frameworks</li>
                <li>• Large-scale LLM application architecture</li>
                <li>• Effect-TS and functional programming patterns</li>
                <li>• Conversational AI and agent development</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-sans font-semibold text-orange">Connect</h3>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="justify-start text-white border-white/20 hover:bg-white/10"
                >
                  <a
                    href="https://www.linkedin.com/in/pauljphilp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn Profile
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="justify-start text-white border-white/20 hover:bg-white/10"
                >
                  <Link href="/connect">
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
