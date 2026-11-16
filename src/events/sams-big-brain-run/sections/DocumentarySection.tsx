import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES } from "../../../app/routes";
import { PEOPLE_WITH_IDEAS_URL } from "../config";
import "./DocumentarySection.css";

interface DocumentarySectionProps {
  /** Show the link through to The Run page (hide it when already on that page). */
  showRunLink?: boolean;
}

export function DocumentarySection({ showRunLink = true }: DocumentarySectionProps) {
  return (
    <section className="bbr-section" aria-labelledby="bbr-doc-title">
      <div className="bbr-wrap">
        <div className="bbr-doc">
          <div className="bbr-video bbr-doc-video">
            <span className="bbr-video-play" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>[Trailer or behind-the-scenes clip]</span>
          </div>
          <div className="bbr-doc-copy bbr-stack">
            <p className="bbr-eyebrow">The documentary</p>
            <h2 id="bbr-doc-title" className="bbr-h3">
              Every kilometre, every conversation.
            </h2>
            <p className="bbr-body">
              Filming has started. Along the way Sam and the family will meet patients, whānau, carers, clinicians and
              researchers, and a full-length documentary will carry their stories well beyond the run.
            </p>
            {showRunLink && (
              <Link className="bbr-text-link" to={ROUTES.theRun}>
                The run and the crew →
              </Link>
            )}
            <a className="bbr-doc-pwi" href={PEOPLE_WITH_IDEAS_URL} target="_blank" rel="noopener noreferrer">
              <span>
                Made by <strong>People With Ideas</strong>, the creative studio behind the film.
              </span>
              <span className="bbr-doc-pwi-cta">
                Learn more <FiArrowUpRight aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
