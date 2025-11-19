"use client";

import { EmailContactDialog } from "@/components/EmailContactDialog";
import { Button } from "@/components/ui/button";

export function EmailContactCTA() {
  return (
    <EmailContactDialog
      renderTriggerAction={({ open, status }) => (
        <Button className="w-full" onClick={open} variant="default">
          {status === "sending"
            ? "Sending..."
            : status === "success"
            ? "Sent!"
            : "Send email"}
        </Button>
      )}
      triggerLabel="Contact via email"
    />
  );
}
