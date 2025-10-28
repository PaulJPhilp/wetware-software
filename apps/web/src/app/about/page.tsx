import { NotionContent } from "@/components/NotionContent";
import { getAboutPage } from "@/lib/notion-utils";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ExternalLink, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load UI components that are not immediately visible
const Avatar = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => ({ default: mod.Avatar }))
);
const AvatarFallback = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => ({ default: mod.AvatarFallback }))
);
const AvatarImage = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => ({ default: mod.AvatarImage }))
);
const Badge = dynamic(() =>
  import("@/components/ui/badge").then((mod) => ({ default: mod.Badge }))
);
const Button = dynamic(() =>
  import("@/components/ui/button").then((mod) => ({ default: mod.Button }))
);

// Refresh the About page content from Notion regularly
export default async function AboutPage() {
  // Load the About page from Notion. Fallback to local content.
  const aboutData = await getAboutPage();
  const _aboutPost = aboutData?.post ?? null;
  const aboutBlocks = aboutData?.blocks ?? null;

  const skills: string[] = [
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

  const blogTopics: string[] = [
    "Building robust AI agents and conversational UIs",
    "Architecting large language model (LLM) applications for scale",
    "Effect-TS patterns and functional programming in TypeScript",
    "Human-AI collaboration frameworks and methodologies",
    "Complex systems thinking in software development",
    "The philosophical implications of AI integration",
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-12 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 lg:space-y-0">
      {/* Page Title (desktop only) */}
      <h1 className="col-start-2 hidden font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:block">
        About
      </h1>

      {/* Left profile rail (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <Avatar className="mx-auto h-28 w-28">
              <AvatarImage alt="Paul Philp" src="/images/avatar.jpeg" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <div className="mt-4 space-y-1">
              <h2 className="font-bold text-foreground text-lg leading-tight">Paul Philp</h2>
              <p className="text-muted-foreground text-sm leading-snug">
                Software/AI Engineer, Founder, Executive
              </p>
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground text-sm">Connect</h3>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <a
                  href="https://www.linkedin.com/in/pauljphilp/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn Profile
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/connect">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground text-sm">Current Focus</h3>
            <ul className="space-y-1 text-muted-foreground text-sm">
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
        <section className="space-y-4 text-center lg:hidden">
          <Avatar className="mx-auto h-32 w-32">
            <AvatarImage alt="Paul Philp" src="/images/avatar.jpeg" />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">About</h1>
            <h2 className="font-bold text-foreground text-xl md:text-2xl">Paul Philp</h2>
            <p className="text-muted-foreground text-sm leading-snug">
              Software/AI Engineer, Founder, Executive
            </p>
            <p className="mx-auto max-w-2xl text-base text-foreground leading-relaxed">
              Engineering human-AI collaboration at the intersection of complex systems and emerging
              technology
            </p>
          </div>
        </section>

        {/* Main Bio Section */}
        <section className="prose max-w-none">
          <div className="space-y-6 rounded-lg border border-border bg-card p-8">
            <h2 className="m-0 font-bold text-2xl text-foreground">About Paul</h2>
            {aboutBlocks ? (
              <div className="space-y-4 text-foreground">
                <NotionContent blocks={aboutBlocks.results as BlockObjectResponse[]} />
              </div>
            ) : (
              <div className="space-y-4 text-foreground">
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
        <section className="rounded-lg border border-border bg-muted p-8">
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-lg">Featured Essay</h3>
            <p className="text-foreground">
              "What My Marriage Falling Apart Taught Me About LLMs" - A deeply personal exploration
              of complex systems, failure modes, and the surprising parallels between human
              relationships and AI architectures.
            </p>
            <Button asChild variant="default">
              <Link href="/posts/my-marriage-and-ai">
                Read the Essay
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="space-y-6">
          <h2 className="font-bold text-2xl text-foreground">Technical Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Blog Topics */}
        <section className="space-y-6">
          <h2 className="font-bold text-2xl text-foreground">What I Write About</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {blogTopics.map((topic: string) => (
              <div className="flex items-start gap-3 rounded-lg bg-muted p-4" key={topic}>
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-foreground" />
                <p className="text-foreground">{topic}</p>
              </div>
            ))}
          </div>
        </section>

        {/* At a Glance & Contact (mobile/tablet) */}
        <section className="space-y-6 lg:hidden">
          <div className="space-y-3">
            <h3 className="font-bold text-foreground text-lg">Current Focus</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Human-AI collaboration frameworks</li>
              <li>• Large-scale LLM application architecture</li>
              <li>• Effect-TS and functional programming patterns</li>
              <li>• Conversational AI and agent development</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-foreground text-lg">Connect</h3>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline">
                <a
                  href="https://www.linkedin.com/in/pauljphilp/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn Profile
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/connect">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
