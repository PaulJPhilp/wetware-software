"use client";

import {
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useState,
} from "react";

import { Button } from "@wetware/design-system";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";

type FormState = {
  fullName: string;
  workEmail: string;
  company: string;
  subject: string;
  body: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

type ButtonProps = ComponentProps<typeof Button>;

type EmailContactDialogProps = {
  renderTriggerAction?: (props: { open: () => void; status: FormStatus }) => ReactNode;
  triggerClassName?: string;
  triggerLabel?: string;
  triggerSize?: ButtonProps["size"];
  triggerVariant?: ButtonProps["variant"];
};

const INITIAL_FORM: FormState = {
  fullName: "",
  workEmail: "",
  company: "",
  subject: "",
  body: "",
};

export function EmailContactDialog({
  renderTriggerAction,
  triggerClassName,
  triggerLabel = "Get in touch",
  triggerSize = "lg",
  triggerVariant = "default",
}: EmailContactDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetState = () => {
    setForm(INITIAL_FORM);
    setStatus("idle");
    setErrorMessage(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") {
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      let result: { error?: string } | null = null;
      try {
        result = await response.json();
      } catch (parseError) {
        result = null;
      }

      if (!response.ok) {
        throw new Error(
          result?.error ?? "Unable to send your message. Please try again."
        );
      }

      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        resetState();
      }, 1200);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    }
  };

  const closeModal = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetState();
    }
  };

  const renderDefaultTrigger = () => (
    <Button
      className={triggerClassName}
      onClick={() => setIsOpen(true)}
      size={triggerSize}
      variant={triggerVariant}
    >
      {triggerLabel}
    </Button>
  );

  return (
    <>
      {renderTriggerAction
        ? renderTriggerAction({ open: () => setIsOpen(true), status })
        : renderDefaultTrigger()}

      <Modal onOpenChangeAction={closeModal} open={isOpen}>
        <ModalContent
          className="mt-6 mb-2 max-h-[calc(100vh-4rem)] translate-y-[10px] overflow-y-auto bg-white dark:bg-zinc-950"
          size="lg"
        >
          <div>
            <ModalHeader>
              <ModalTitle className="text-sm">Send me an email</ModalTitle>
            </ModalHeader>

            <ModalBody className="pt-4 pb-1">
              <form className="space-y-1.5" onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1">
                    <span className="font-medium text-[0.65rem] text-muted-foreground uppercase">
                      Name
                    </span>
                    <input
                    autoComplete="name"
                    className="w-full rounded-lg border border-border bg-background px-2 py-1 text-foreground text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={status === "sending"}
                    name="fullName"
                    onChange={handleChange}
                    placeholder="Ada Lovelace"
                    type="text"
                    value={form.fullName}
                  />
                </label>

                <label className="space-y-1">
                    <span className="font-medium text-[0.65rem] text-muted-foreground uppercase">
                      Work email
                    </span>
                    <input
                    autoComplete="email"
                    className="w-full rounded-lg border border-border bg-background px-2 py-1 text-foreground text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={status === "sending"}
                    name="workEmail"
                    onChange={handleChange}
                    placeholder="you@company.com"
                    type="email"
                    value={form.workEmail}
                  />
                </label>
              </div>

              <label className="space-y-1">
                <span className="font-medium text-[0.65rem] text-muted-foreground uppercase">
                  Subject
                </span>
                <input
                  className="w-full rounded-lg border border-border bg-background px-2 py-1 text-foreground text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={status === "sending"}
                  name="subject"
                  onChange={handleChange}
                  placeholder="AI platform delivery partner"
                  type="text"
                  value={form.subject}
                />
              </label>

              <label className="space-y-1">
                <span className="font-medium text-[0.65rem] text-muted-foreground uppercase">
                  Message
                </span>
                <textarea
                  className="w-full rounded-lg border border-border bg-background px-2 py-1 text-foreground text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={status === "sending"}
                  name="body"
                  onChange={handleChange}
                  placeholder="What are you building, and how can I help?"
                  rows={5}
                  value={form.body}
                />
              </label>

                <div aria-live="polite" className="text-[0.65rem] text-muted-foreground">
                  {status === "success" && "Message sent! I'll reply soon."}
                  {status === "error" && (
                    <span className="text-red-600">
                      {errorMessage ?? "Unable to send your message."}
                    </span>
                  )}
                  {status === "idle" &&
                    "I typically respond within 1-2 business days."}
                  {status === "sending" && "Sending your message..."}
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:justify-end">
                  <ModalClose className="px-1.5 py-0.5 text-[0.65rem] sm:min-w-[50px]">
                    Cancel
                  </ModalClose>
                  <Button
                    className="h-7 text-[0.65rem] sm:min-w-[72px]"
                    disabled={status === "sending"}
                    size="sm"
                    type="submit"
                  >
                    {status === "sending"
                      ? "Sending..."
                      : status === "success"
                      ? "Sent!"
                      : "Send message"}
                  </Button>
                </div>
              </form>
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
