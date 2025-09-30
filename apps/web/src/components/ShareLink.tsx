"use client";

import { useState } from "react";

interface ShareLinkProps {
  id: string;
}

export function ShareLink({ id }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="focus-ring ml-auto inline-flex items-center gap-2 rounded bg-orange px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-orange/90 transition-colors"
      aria-label="Copy link to this section"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
