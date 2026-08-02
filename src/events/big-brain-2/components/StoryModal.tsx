import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiArrowRight } from "react-icons/fi";
import { ROUTES } from "../../../app/routes";
import { BB2_STORY } from "../data/content";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: () => void;
}

export function StoryModal({ isOpen, onClose, onDonate }: StoryModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bb2-story-modal-overlay" role="dialog" aria-modal="true" aria-label="Sam's Story">
      <div className="bb2-story-modal-bar">
        <span className="bb2-story-modal-label">Sam&apos;s Story</span>
        <button className="bb2-story-modal-close" onClick={onClose} type="button" aria-label="Close story">
          <FiX size={16} />
          <span>Close</span>
        </button>
      </div>

      <div className="bb2-story-modal-body">
        <p className="bb2-section-label">The Story</p>
        <h2 className="bb2-story-modal-title">
          Why I<br />
          Run
        </h2>
        <blockquote className="bb2-story-modal-quote">{BB2_STORY.pullQuote}</blockquote>

        <div className="bb2-story-modal-text">
          {BB2_STORY.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="bb2-story-modal-georgie">
          <p>This run is inspired by Sam&apos;s cousin Georgie, who was diagnosed with Glioblastoma in 2023.</p>
          <Link className="bb2-story-modal-georgie-link" to={ROUTES.georgiesStory} onClick={onClose}>
            Read Georgie&apos;s Story <FiArrowRight />
          </Link>
        </div>

        <div className="bb2-story-modal-footer">
          <button
            className="bb2-story-modal-cta"
            type="button"
            onClick={() => {
              onClose();
              onDonate();
            }}
          >
            Donate Now <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
