"use client";

import type { LucideProps } from "lucide-react";
import { Github, Mail, Rss, Twitter } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

type IconProps = Omit<LucideProps, "ref">;
type IconComponent = ComponentType<IconProps>;

const GithubIcon: IconComponent = (props) => <Github {...props} />;
const MailIcon: IconComponent = (props) => <Mail {...props} />;
const TwitterIcon: IconComponent = (props) => <Twitter {...props} />;
const RssIcon: IconComponent = (props) => <Rss {...props} />;

type LinkDef = {
  href: string;
  label: string; // Used for aria-label
  Icon: IconComponent;
  target?: string;
  rel?: string;
};

const defaultLinks: LinkDef[] = [
  {
    href: "https://github.com/PaulJPhilp",
    label: "GitHub",
    Icon: GithubIcon,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "mailto:paul@paulphilp.com",
    label: "Email",
    Icon: MailIcon,
  },
  {
    href: "https://x.com/PaulPhilp624972",
    label: "Twitter/X",
    Icon: TwitterIcon,
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export function Footer({ links = defaultLinks }: { links?: LinkDef[] }) {
  const [currentYear, setCurrentYear] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear().toString());
    setLastUpdated(
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-footer w-full overflow-hidden border-border border-t bg-brand text-foreground"
      style={{ zIndex: 99_998, isolation: "isolate", maxHeight: "4em" }}
    >
      <div className="flex w-full flex-col xs:flex-col items-center justify-between gap-0.5 xs:gap-0.5 px-2 xs:px-2 py-0 xs:py-0 font-sans sm:flex-row">
        <div className="flex flex-col items-start text-left text-muted-foreground transition-colors hover:text-foreground">
          <div style={{ fontSize: "0.5em" }}>
            {currentYear || ""} Paul J Philp. All rights reserved.
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center text-center text-muted-foreground transition-colors hover:text-foreground">
          <div style={{ fontSize: "0.5em" }}>Last updated: {lastUpdated || ""}</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 xs:gap-1">
          {links.map(({ href, label, Icon, target, rel }) => (
            <a
              className="rounded-md p-0.5 xs:p-0 text-muted-foreground transition-colors hover:text-orange"
              href={href}
              key={label}
              {...(target ? { target } : {})}
              {...(rel ? { rel } : {})}
              aria-label={label}
              title={label}
            >
              <Icon style={{ width: "0.5em", height: "0.5em" }} />
            </a>
          ))}
          {/* RSS Feed Link */}
          <a
            aria-label="RSS Feed"
            className="rounded-md p-0.5 xs:p-0 text-muted-foreground transition-colors hover:text-orange"
            href="/feed.xml"
            title="RSS Feed"
          >
            <RssIcon style={{ width: "0.5em", height: "0.5em" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
