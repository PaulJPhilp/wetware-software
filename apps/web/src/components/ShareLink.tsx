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
      aria-label="Copy link to this section"
      className="focus-ring ml-auto inline-flex items-center gap-2 rounded bg-orange px-2 py-1 font-medium text-primary-foreground text-xs transition-colors hover:bg-orange/90"
      onClick={handleCopy}
      type="button"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
