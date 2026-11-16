import { useState } from "react";
import { Modal } from "./Modal";
import { BBR_MONEY_LINE } from "../data/content";
import { RAISELY_EMBED_URL } from "../config";
import "./DonationModal.css";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Raisely form in a full-screen sheet.
 *
 * Uses a plain iframe rather than Raisely's embed.js: the embed script sizes its iframe from a fixed
 * data-height, which is what made it fight the modal. A plain iframe can simply fill the sheet, and the
 * form scrolls inside it at any viewport height.
 */
export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setLoaded(false);
        onClose();
      }}
      title="Back Sam"
      variant="sheet"
      flush
    >
      <p className="bbr-donate-note">{BBR_MONEY_LINE} · Secure payment via Raisely</p>
      <div className="bbr-donate-frame-wrap">
        {!loaded && (
          <div className="bbr-donate-loading" role="status">
            Loading donation form…
          </div>
        )}
        <iframe
          className="bbr-donate-frame"
          src={RAISELY_EMBED_URL}
          title="Donation form"
          onLoad={() => setLoaded(true)}
          allow="payment"
        />
      </div>
      <p className="bbr-donate-fallback">
        Form not loading?{" "}
        <a href={RAISELY_EMBED_URL.replace(/\/embed$/, "")} target="_blank" rel="noopener noreferrer">
          Donate on Raisely instead
        </a>
      </p>
    </Modal>
  );
}
