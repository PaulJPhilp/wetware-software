import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Bot, Brain, ExternalLink, Users, Zap } from "lucide-react";

interface Resource {
  title: string;
  source: string;
  description: string;
  uniqueTake: string;
  url: string;
  tags: string[];
  category: "Human Systems" | "AI/Technology" | "Collaboration" | "Philosophy" | "Tools";
  icon: "brain" | "bot" | "lighthouse" | "users" | "book";
}

export default function ResourcesPage() {
  const resources: Resource[] = [
    {
      title: "Heidi Priebe's Lighthouse Series",
      source: "Heidi Priebe",
      description:
        "Deep explorations of human personality systems, attachment theory, and personal development through the lens of complex adaptive systems.",
      uniqueTake:
        "Priebe's work on personality as emergent patterns perfectly parallels how I think about AI system architectures - both are complex adaptive systems with emergent behaviors that can't be fully predicted from their components.",
      url: "https://www.youtube.com/@HeidiPriebe",
      tags: ["Human Systems", "Complex Systems", "Psychology", "Emergence"],
      category: "Human Systems",
      icon: "lighthouse",
    },
    {
      title: "Anthropic's Constitutional AI Papers",
      source: "Anthropic",
      description:
        "Research on training AI systems to be helpful, harmless, and honest through constitutional methods and human feedback.",
      uniqueTake:
        "The constitutional approach to AI alignment mirrors human moral development - both require iterative refinement of principles through experience and feedback, not just rule-following.",
      url: "https://www.anthropic.com/research",
      tags: ["AI Safety", "Alignment", "Constitutional AI", "Research"],
      category: "AI/Technology",
      icon: "bot",
    },
    {
      title: "Effect-TS Documentation",
      source: "Effect-TS Team",
      description:
        "Comprehensive guide to functional programming patterns in TypeScript, focusing on composable, type-safe effect management.",
      uniqueTake:
        "Effect-TS isn't just a library - it's a paradigm for thinking about program composition that directly translates to designing robust human-AI workflows. The same patterns that make code predictable make AI systems trustworthy.",
      url: "https://effect.website",
      tags: ["TypeScript", "Functional Programming", "Effect Systems", "Composition"],
      category: "Tools",
      icon: "bot",
    },
    {
      title: "LangChain Expression Language (LCEL)",
      source: "LangChain",
      description:
        "Declarative way to compose LangChain components into complex AI workflows and pipelines.",
      uniqueTake:
        "LCEL demonstrates how declarative composition can make AI systems more transparent and debuggable - crucial for human-AI collaboration where humans need to understand and trust the AI's process.",
      url: "https://python.langchain.com/docs/concepts/#langchain-expression-language-lcel",
      tags: ["LangChain", "AI Frameworks", "Composition", "Declarative"],
      category: "AI/Technology",
      icon: "bot",
    },
    {
      title: "Cynefin Framework",
      source: "Dave Snowden",
      description:
        "Decision-making framework for understanding the complexity and context of different types of problems and situations.",
      uniqueTake:
        "The Cynefin framework is essential for human-AI collaboration because it helps determine when to rely on AI (complicated/complex domains) versus human judgment (chaotic/disorder domains). Most AI failures happen when we apply AI to the wrong complexity domain.",
      url: "https://en.wikipedia.org/wiki/Cynefin_framework",
      tags: ["Complexity", "Decision Making", "Systems Thinking", "Framework"],
      category: "Philosophy",
      icon: "brain",
    },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "brain":
        return <Brain className="w-5 h-5 text-orange" />;
      case "bot":
        return <Bot className="w-5 h-5 text-orange" />;
      case "lighthouse":
        return <Zap className="w-5 h-5 text-orange" />;
      case "users":
        return <Users className="w-5 h-5 text-orange" />;
      case "book":
        return <BookOpen className="w-5 h-5 text-orange" />;
      default:
        return <BookOpen className="w-5 h-5 text-orange" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Human Systems":
        return "bg-blue-100 text-blue-800";
      case "AI/Technology":
        return "bg-green-100 text-green-800";
      case "Collaboration":
        return "bg-purple-100 text-purple-800";
      case "Philosophy":
        return "bg-amber-100 text-amber-800";
      case "Tools":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <BookOpen className="w-6 h-6 text-orange" />
          <h1 className="text-2xl font-sans font-bold text-charcoal leading-tight">Resources</h1>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          <p className="text-sm font-serif text-charcoal/80">
            Curated insights for human-AI collaboration
          </p>
          <p className="text-sm text-charcoal/60 leading-snug">
            A carefully curated collection of resources, frameworks, and content that have shaped my
            understanding of human systems, AI technology, and their intersection. Each resource
            includes my unique perspective on why it matters for human-AI collaboration.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-sans font-bold text-charcoal">Essential Resources</h2>
          <p className="text-charcoal/60">
            Key insights across human systems, AI technology, and collaboration
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {resources.map((resource) => (
            <Card
              key={resource.title}
              className="group hover:shadow-lg transition-all hover:border-orange/30"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(resource.icon)}
                    <Badge className={getCategoryColor(resource.category)}>
                      {resource.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl font-sans text-charcoal group-hover:text-orange transition-colors">
                  {resource.title}
                </CardTitle>
                <CardDescription className="text-sm text-charcoal/60">
                  <span className="font-medium">Source:</span> {resource.source}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-charcoal/80">{resource.description}</p>

                <div className="bg-orange/10 border border-orange/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-charcoal mb-2">My Take:</h4>
                  <p className="text-sm text-charcoal/80 italic">{resource.uniqueTake}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" size="sm" asChild className="w-full mt-4">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explore Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-silver/30 rounded-lg p-8 text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-sans font-bold text-charcoal">More Resources Coming Soon</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            I'm continuously discovering and curating new resources that illuminate the intersection
            of human systems and AI. Future additions will include interactive demos, research
            papers, and community-contributed insights.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-charcoal/60">
            Want to suggest a resource or see something specific covered?
          </p>
          <Button
            variant="outline"
            asChild
            className="border-orange text-orange hover:bg-orange hover:text-white"
          >
            <a href="/connect">Get in Touch</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
