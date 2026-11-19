"use client";

import type { KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import { LINK } from "@/constants/links";

const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  if (
    event.key === "Enter" &&
    !event.shiftKey &&
    !event.nativeEvent.isComposing
  ) {
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }
};

/**
 * Contact message form submitting inquiries via FormSubmit and supporting Enter
 * to submit from the message field.
 */
export const ContactForm = () => (
  <form
    action={`https://formsubmit.co/${LINK.EMAIL}`}
    method="POST"
    className="flex flex-col gap-4"
  >
    <input
      type="hidden"
      name="_subject"
      value="New message from Ruth Yeneneh's portfolio"
    />
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        aria-label="Name"
        name="name"
        placeholder="John Doe"
        required
        type="text"
      />
      <Input
        aria-label="Email"
        name="email"
        placeholder="john@doe.com"
        required
        type="email"
      />
    </div>
    <Textarea
      aria-label="Message"
      className="min-h-40"
      name="message"
      onKeyDown={handleTextareaKeyDown}
      placeholder="Enter your message"
      required
      rows={6}
    />
    <div className="flex items-center justify-between gap-4">
      <Button type="submit">Send message</Button>
      <span className="text-muted-foreground text-sm">
        {"or "}
        <Kbd>↵ Enter</Kbd>
        {" to send"}
      </span>
    </div>
  </form>
);
