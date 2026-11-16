import { useState, type FormEvent } from "react";
import { Modal } from "./Modal";
import { CONTACT_EMAIL, CONTACT_FORM_URL } from "../config";
import "./ContactModal.css";

export type ContactTopic = "general" | "question" | "join" | "host" | "sponsor" | "media";

const TOPICS: Record<ContactTopic, { title: string; intro: string; label: string }> = {
  general: { title: "Get in touch", intro: "We'll get back to you as soon as we can.", label: "General" },
  question: {
    title: "Ask a question",
    intro: "Can't find what you're looking for in the FAQ? Ask us directly.",
    label: "Question",
  },
  join: {
    title: "Join Sam for a stretch",
    intro:
      "To keep everyone safe on the road, only a small number of people will run with Sam, by arrangement. Tell us a little about yourself and which part of the route you're near.",
    label: "Run with Sam",
  },
  host: {
    title: "Help the crew",
    intro: "A bed, a meal, a physio session or a washing machine along the route. Tell us what you can offer and where.",
    label: "Help the crew",
  },
  sponsor: {
    title: "Support the run",
    intro: "Interested in supporting the run with gear, food, transport or accommodation? Let's talk.",
    label: "Sponsorship",
  },
  media: { title: "Media enquiries", intro: "For interviews, photos and press.", label: "Media" },
};

type Status = "idle" | "sending" | "sent" | "error";

interface ContactModalProps {
  isOpen: boolean;
  topic: ContactTopic;
  onClose: () => void;
}

export function ContactModal({ isOpen, topic, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const config = TOPICS[topic];

  const close = () => {
    setStatus("idle");
    onClose();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      topic: config.label,
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""), // honeypot
      page: window.location.pathname,
    };

    if (!CONTACT_FORM_URL) {
      // No backend configured yet: hand over to the visitor's email app.
      const body = `${payload.message}\n\n${payload.name}${payload.location ? ` (${payload.location})` : ""}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `[${config.label}] Sam's Big Brain Run`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      // text/plain keeps this a "simple" request, so Apps Script doesn't need a CORS preflight.
      const res = await fetch(CONTACT_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean };
      setStatus(json.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title={config.title}>
      {status === "sent" ? (
        <div className="bbr-contact-done" role="status">
          <p className="bbr-contact-done-title">Thanks, message sent.</p>
          <p>We'll reply to the email you gave us.</p>
          <button className="bbr-contact-submit" type="button" onClick={close}>
            Close
          </button>
        </div>
      ) : (
        <form className="bbr-contact-form" onSubmit={onSubmit}>
          <p className="bbr-contact-intro">{config.intro}</p>

          <label htmlFor="bbr-c-name">Name</label>
          <input id="bbr-c-name" name="name" type="text" autoComplete="name" required maxLength={120} />

          <label htmlFor="bbr-c-email">Email</label>
          <input id="bbr-c-email" name="email" type="email" autoComplete="email" required maxLength={200} />

          {(topic === "join" || topic === "host") && (
            <>
              <label htmlFor="bbr-c-location">Where are you on the route?</label>
              <input id="bbr-c-location" name="location" type="text" maxLength={120} placeholder="e.g. Taumarunui" />
            </>
          )}

          <label htmlFor="bbr-c-message">Message</label>
          <textarea id="bbr-c-message" name="message" rows={5} required maxLength={3000} />

          {/* Honeypot: hidden from people, tempting to bots. */}
          <div className="bbr-contact-hp" aria-hidden="true">
            <label htmlFor="bbr-c-website">Website</label>
            <input id="bbr-c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && (
            <p className="bbr-contact-error" role="alert">
              Sorry, that didn't send. Please try again, or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          )}

          <button className="bbr-contact-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </Modal>
  );
}
