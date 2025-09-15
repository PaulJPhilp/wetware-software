import dynamic from "next/dynamic";

// Lazy load social icons since they're not critical for initial page load
const Github = dynamic(() => import("lucide-react").then((mod) => ({ default: mod.Github })));
const Mail = dynamic(() => import("lucide-react").then((mod) => ({ default: mod.Mail })));
const Twitter = dynamic(() => import("lucide-react").then((mod) => ({ default: mod.Twitter })));

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 bg-silver dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-sans">
        <div className="text-[10px] text-gray-600 dark:text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} Paul J Philp. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/PaulJPhilp"
            className="text-gray-600 dark:text-gray-400 hover:text-orange transition-colors p-2 rounded-md hover:bg-orange/10 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-silver dark:focus:ring-offset-gray-900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-3 h-3" />
          </a>
          <a
            href="mailto:paul@paulphilp.com"
            className="text-gray-600 dark:text-gray-400 hover:text-orange transition-colors p-2 rounded-md hover:bg-orange/10 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-silver dark:focus:ring-offset-gray-900"
            aria-label="Email"
          >
            <Mail className="w-3 h-3" />
          </a>
          <a
            href="https://x.com/PaulPhilp624972"
            className="text-gray-600 dark:text-gray-400 hover:text-orange transition-colors p-2 rounded-md hover:bg-orange/10 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-silver dark:focus:ring-offset-gray-900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter/X"
          >
            <Twitter className="w-3 h-3" />
          </a>
          <a
            href="https://bsky.app/profile/paulphilp.com"
            className="text-gray-600 dark:text-gray-400 hover:text-orange transition-colors p-2 rounded-md hover:bg-orange/10 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-silver dark:focus:ring-offset-gray-900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bluesky"
          >
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bluesky</title>
              <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
