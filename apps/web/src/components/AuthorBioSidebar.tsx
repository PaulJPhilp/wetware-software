import Image from "next/image";
import type { BaseComponentProps } from "@/lib/component-types";

/**
 * AuthorBioSidebar Component
 *
 * Displays author bio with avatar in a sticky sidebar.
 * Responsive: stacks on mobile, sidebar on desktop.
 */
export function AuthorBioSidebar({ className = "", testId }: BaseComponentProps) {
  const avatarSrc = "/images/avatar.jpeg";
  const avatarAlt = "Paul Philp Avatar";

  return (
    <aside
      className={`mb-6 rounded-xl bg-card p-6 shadow-lg lg:sticky lg:top-20 lg:mb-0 ${className}`}
      data-testid={testId}
    >
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <Image
          alt={avatarAlt}
          className="rounded-full border-4 border-orange/20 object-cover shadow-md"
          height={128}
          priority
          src={avatarSrc}
          width={128}
        />
      </div>

      <h3 className="mb-3 text-center font-bold font-sans text-foreground text-xl">
        About Paul Philp
      </h3>

      <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
        <p>
          <strong className="font-semibold text-foreground">Paul Philp</strong> is an experienced
          software and AI engineer and former founder/CEO with a track record of leading teams,
          shipping products, and architecting robust systems. He's a team Oscar winner for technical
          innovation and currently works across the modern AI engineering stack: TypeScript,
          Effect-TS, Next.js, Vercel AI SDK, and AI orchestration frameworks.
        </p>
        <p>
          Paul writes <strong className="font-semibold text-foreground">Wetware & Software</strong>,
          sharing practical insights on AI engineering and software architecture. He's available for
          advisory and senior engineering roles focused on AI architecture, system design, and
          production-ready AI integration.
        </p>
      </div>
    </aside>
  );
}
