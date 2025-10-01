import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail, MessageCircle, Twitter, Users } from "lucide-react";

export default function ConnectPage() {
  const contactMethods = [
    {
      title: "Email",
      description: "For opportunities, collaboration, or detailed discussions",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      href: "mailto:paul@paulphilp.com",
      display: "paul@paulphilp.com",
    },
    {
      title: "LinkedIn",
      description: "Professional networking and career opportunities",
      icon: <Linkedin className="w-6 h-6" />,
      action: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/pauljphilp/",
      display: "linkedin.com/in/pauljphilp",
    },
    {
      title: "X (Twitter)",
      description: "Quick questions and ongoing conversations",
      icon: <Twitter className="w-6 h-6" />,
      action: "Follow on X",
      href: "https://twitter.com/PaulJPhilp",
      display: "@PaulJPhilp",
    },
    {
      title: "Bluesky",
      description: "Emerging social platform for tech discussions",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "Follow on Bluesky",
      href: "https://bsky.app/profile/pauljphilp.com",
      display: "pauljphilp.com",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Users className="w-6 h-6 text-orange" />
          <h1 className="text-2xl font-sans font-bold text-charcoal dark:text-white leading-tight">Connect</h1>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          <p className="text-sm font-serif text-charcoal/80 dark:text-gray-300">
            Let's explore human-AI collaboration together
          </p>
          <p className="text-sm text-charcoal/60 dark:text-gray-400 leading-snug">
            Whether you're interested in collaboration, have questions about my work, or want to
            discuss opportunities in AI and software engineering, I'd love to hear from you. Choose
            the best way to connect based on your needs.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="grid gap-6 md:grid-cols-2">
        {contactMethods.map((method) => (
          <Card
            key={method.title}
            className="group hover:shadow-lg transition-all hover:border-orange/30"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange/10 rounded-lg text-orange group-hover:bg-orange group-hover:text-white transition-colors">
                  {method.icon}
                </div>
                <CardTitle className="text-xl font-sans text-charcoal dark:text-white">{method.title}</CardTitle>
              </div>
              <CardDescription className="text-charcoal/60 dark:text-gray-400">{method.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-mono text-charcoal/70 dark:text-gray-300 bg-silver/30 dark:bg-gray-800/30 p-3 rounded">
                {method.display}
              </p>
              <Button asChild className="w-full bg-orange hover:bg-orange/90 text-white">
                <a href={method.href} target="_blank" rel="noopener noreferrer">
                  {method.action}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* What to Expect */}
      <section className="bg-silver/30 dark:bg-gray-800/30 rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white text-center">What to Expect</h2>
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-orange" />
            </div>
            <h3 className="font-sans font-semibold text-charcoal dark:text-white">Quick Response</h3>
            <p className="text-sm text-charcoal/70 dark:text-gray-300">
              I typically respond to emails within 24-48 hours and engage actively on social
              platforms.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-orange" />
            </div>
            <h3 className="font-sans font-semibold text-charcoal dark:text-white">Thoughtful Discussion</h3>
            <p className="text-sm text-charcoal/70 dark:text-gray-300">
              I love diving deep into complex topics and exploring new perspectives on human-AI
              collaboration.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-orange" />
            </div>
            <h3 className="font-sans font-semibold text-charcoal dark:text-white">Meaningful Connections</h3>
            <p className="text-sm text-charcoal/70 dark:text-gray-300">
              Whether for collaboration, learning, or professional opportunities, I value authentic
              connections.
            </p>
          </div>
        </div>
      </section>

      {/* Topics of Interest */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-sans font-bold text-charcoal dark:text-white">Great Conversation Starters</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-left">
          {[
            "Human-AI collaboration frameworks",
            "Effect-TS and functional programming patterns",
            "Building robust AI agent systems",
            "Complex systems thinking in software",
            "LLM application architecture",
            "Philosophy of technology and human connection",
          ].map((topic) => (
            <div key={topic} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
              <div className="w-2 h-2 rounded-full bg-orange mt-2 flex-shrink-0" />
              <p className="text-charcoal/80 dark:text-gray-300">{topic}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
