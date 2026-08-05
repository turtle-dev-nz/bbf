import { useEffect } from "react";
import "./DonationModal.css";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    RaiselyEmbed?: {
      render?: () => void;
    };
  }
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Load Raisely embed script once, then let it hydrate the container below.
  useEffect(() => {
    if (!isOpen) return;

    const hydrateEmbed = () => {
      window.RaiselyEmbed?.render?.();
    };

    const existing = document.querySelector('script[src="https://cdn.raisely.com/v3/public/embed.js"]');
    if (existing) {
      hydrateEmbed();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.raisely.com/v3/public/embed.js";
    script.async = true;
    script.onload = hydrateEmbed;
    document.body.appendChild(script);
  }, [isOpen]);

  return (
    <div
      className={`bb2-modal-overlay${isOpen ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div className="bb2-modal" role="dialog" aria-modal="true" aria-label="Donate to Sam's Big Brain Run">
        <div className="bb2-modal-header">
          <span className="bb2-modal-title">Make a donation</span>
          <button className="bb2-modal-close" onClick={onClose} aria-label="Close donation modal" type="button">
            ✕
          </button>
        </div>

        <div className="bb2-modal-body">
          {/* <p className="bb2-modal-step-label">Secure payment powered by Raisely</p> */}

          <div
            className="raisely-donate"
            data-campaign-path="sams-big-brain-run"
            data-profile=""
            data-width="100%"
            data-height="560"
            data-max-height="600px"
          />

          {/* <div className="bb2-impact-hint">
            Every gift helps unlock the next milestone. Thank you for backing Sam's Big Brain Run.
          </div>

          <p className="bb2-modal-secure-note">Secure payment via Raisely</p> */}
        </div>
      </div>
    </div>
  );
}
