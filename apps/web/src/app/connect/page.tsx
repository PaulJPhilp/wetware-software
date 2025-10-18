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
    <main className="space-y-12">
      {/* Header Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Connect</h1>
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
      <section className="max-w-3xl mx-auto px-4 grid gap-6 md:grid-cols-2">
        {contactMethods.map((method) => (
          <Card
            key={method.title}
            className="group border-border hover:shadow-lg transition-all"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg text-foreground transition-colors">
                  {method.icon}
                </div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {method.title}
                </CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                {method.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-mono text-muted-foreground bg-muted p-3 rounded">
                {method.display}
              </p>
              <Button variant="default" asChild className="w-full">
                <a href={method.href} target="_blank" rel="noopener noreferrer">
                  {method.action}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* What to Expect */}
      <section className="max-w-3xl mx-auto px-4 bg-muted rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center">
          What to Expect
        </h2>
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">
              Quick Response
            </h3>
            <p className="text-sm text-muted-foreground">
              I typically respond to emails within 24-48 hours and engage actively on social
              platforms.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">
              Thoughtful Discussion
            </h3>
            <p className="text-sm text-muted-foreground">
              I love diving deep into complex topics and exploring new perspectives on human-AI
              collaboration.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">
              Meaningful Connections
            </h3>
            <p className="text-sm text-muted-foreground">
              Whether for collaboration, learning, or professional opportunities, I value authentic
              connections.
            </p>
          </div>
        </div>
      </section>

      {/* Topics of Interest */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl font-bold text-foreground">
          Great Conversation Starters
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-left">
          {[
            "Human-AI collaboration frameworks",
            "Effect-TS and functional programming patterns",
            "Building robust AI agent systems",
            "Complex systems thinking in software",
            "LLM application architecture",
            "Philosophy of technology and human connection",
          ].map((topic) => (
            <div
              key={topic}
              className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border"
            >
              <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0" />
              <p className="text-foreground">{topic}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
