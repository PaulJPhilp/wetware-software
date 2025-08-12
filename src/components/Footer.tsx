import { Github, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 mt-16 bg-white w-full fixed bottom-0 left-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-[0.45rem] text-sm flex justify-between items-center font-sans">
        <div className="text-[0.3rem]">
          © {new Date().getFullYear()} Paul J Philp. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/PaulJPhilp"
            className="hover:text-orange transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-2.5 h-2.5" />
          </a>
          <a
            href="mailto:paul@paulphilp.com"
            className="hover:text-orange transition-colors"
            aria-label="Email"
          >
            <Mail className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://x.com/PaulPhilp624972"
            className="hover:text-orange transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter/X"
          >
            <Twitter className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://bsky.app/profile/paulphilp.com"
            className="hover:text-orange transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky"
          >
            {/* Official Bluesky logo SVG from Wikipedia (Bluesky_Logo.svg) */}
            <svg
              className="w-2.5 h-2.5"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bluesky</title>
              <path
                d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 480c-123.712 0-224-100.288-224-224S132.288 32 256 32s224 100.288 224 224-100.288 224-224 224zm0-416c-105.868 0-192 86.132-192 192s86.132 192 192 192 192-86.132 192-192-86.132-192-192-192zm0 352c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160 160-71.776 160-160 160z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
