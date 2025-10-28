import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail, MessageCircle, Twitter, Users } from "lucide-react";

export default function ConnectPage() {
  const contactMethods = [
    {
      title: "Email",
      description: "For opportunities, collaboration, or detailed discussions",
      icon: <Mail className="h-6 w-6" />,
      action: "Send Email",
      href: "mailto:paul@paulphilp.com",
      display: "paul@paulphilp.com",
    },
    {
      title: "LinkedIn",
      description: "Professional networking and career opportunities",
      icon: <Linkedin className="h-6 w-6" />,
      action: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/pauljphilp/",
      display: "linkedin.com/in/pauljphilp",
    },
    {
      title: "X (Twitter)",
      description: "Quick questions and ongoing conversations",
      icon: <Twitter className="h-6 w-6" />,
      action: "Follow on X",
      href: "https://twitter.com/PaulJPhilp",
      display: "@PaulJPhilp",
    },
    {
      title: "Bluesky",
      description: "Emerging social platform for tech discussions",
      icon: <MessageCircle className="h-6 w-6" />,
      action: "Follow on Bluesky",
      href: "https://bsky.app/profile/pauljphilp.com",
      display: "pauljphilp.com",
    },
  ];

  return (
    <main className="space-y-12">
      {/* Header Section */}
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">Connect</h1>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Let's explore human-AI collaboration together
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Whether you're interested in collaboration, have questions about my work, or want to
            discuss opportunities in AI and software engineering, I'd love to hear from you. Choose
            the best way to connect based on your needs.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="mx-auto grid max-w-3xl gap-6 px-4 md:grid-cols-2">
        {contactMethods.map((method) => (
          <Card className="group border-border transition-all hover:shadow-lg" key={method.title}>
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2 text-foreground transition-colors">
                  {method.icon}
                </div>
                <CardTitle className="font-bold text-foreground text-lg">{method.title}</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                {method.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="rounded bg-muted p-3 font-mono text-muted-foreground text-sm">
                {method.display}
              </p>
              <Button asChild className="w-full" variant="default">
                <a href={method.href} rel="noopener noreferrer" target="_blank">
                  {method.action}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* What to Expect */}
      <section className="mx-auto max-w-3xl space-y-6 rounded-lg bg-muted p-8 px-4">
        <h2 className="text-center font-bold text-2xl text-foreground">What to Expect</h2>
        <div className="grid gap-6 text-center md:grid-cols-3">
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Mail className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Quick Response</h3>
            <p className="text-muted-foreground text-sm">
              I typically respond to emails within 24-48 hours and engage actively on social
              platforms.
            </p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <MessageCircle className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Thoughtful Discussion</h3>
            <p className="text-muted-foreground text-sm">
              I love diving deep into complex topics and exploring new perspectives on human-AI
              collaboration.
            </p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Users className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Meaningful Connections</h3>
            <p className="text-muted-foreground text-sm">
              Whether for collaboration, learning, or professional opportunities, I value authentic
              connections.
            </p>
          </div>
        </div>
      </section>

      {/* Topics of Interest */}
      <section className="mx-auto max-w-3xl space-y-6 px-4 text-center">
        <h2 className="font-bold text-2xl text-foreground">Great Conversation Starters</h2>
        <div className="grid gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
          {[
            "Human-AI collaboration frameworks",
            "Effect-TS and functional programming patterns",
            "Building robust AI agent systems",
            "Complex systems thinking in software",
            "LLM application architecture",
            "Philosophy of technology and human connection",
          ].map((topic) => (
            <div
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              key={topic}
            >
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-foreground" />
              <p className="text-foreground">{topic}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
