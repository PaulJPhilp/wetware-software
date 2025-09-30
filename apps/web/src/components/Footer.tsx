import type { LucideProps } from "lucide-react";
import { Github, Mail, Rss, Twitter } from "lucide-react";
import type { ComponentType } from "react";

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
  return (
    <footer
      className="z-footer fixed bottom-0 inset-x-0 w-full border-t border-border bg-brand text-foreground overflow-hidden"
      style={{ zIndex: 99998, isolation: "isolate", maxHeight: "4em" }}
    >
      <div className="w-full px-2 xs:px-2 py-0 xs:py-0 flex flex-col xs:flex-col sm:flex-row justify-between items-center gap-0.5 xs:gap-0.5 font-sans">
        <div className="flex flex-col items-start text-muted-foreground text-left transition-colors hover:text-foreground">
          <div style={{ fontSize: "0.5em" }}>© {new Date().getFullYear()} Paul J Philp. All rights reserved.</div>
        </div>
        <div className="flex flex-col items-center text-muted-foreground text-center transition-colors hover:text-foreground flex-1">
          <div style={{ fontSize: "0.5em" }}>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="flex items-center gap-1.5 xs:gap-1 ml-auto">
          {links.map(({ href, label, Icon, target, rel }) => (
            <a
              key={label}
              href={href}
              className="text-muted-foreground hover:text-orange transition-colors p-0.5 xs:p-0 rounded-md"
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
            href="/feed.xml"
            className="text-muted-foreground hover:text-orange transition-colors p-0.5 xs:p-0 rounded-md"
            aria-label="RSS Feed"
            title="RSS Feed"
          >
            <RssIcon style={{ width: "0.5em", height: "0.5em" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
