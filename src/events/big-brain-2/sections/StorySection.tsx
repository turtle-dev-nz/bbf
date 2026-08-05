import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ROUTES } from "../../../app/routes";
import { bbr_STORY } from "../data/content";

const PREVIEW_COUNT = 2;

interface StorySectionProps {
  onReadMore: () => void;
}

export function StorySection({ onReadMore }: StorySectionProps) {
  return (
    <section className="bbr-story-section">
      <div className="bbr-story-inner">
        <div className="bbr-story-meta">
          <p className="bbr-section-label">The Story</p>
          <h2>
            Why Sam
            <br />
            Runs
          </h2>
          <blockquote className="bbr-pull-quote">{bbr_STORY.pullQuote}</blockquote>
        </div>

        <div className="bbr-story-body">
          {bbr_STORY.paragraphs.slice(0, PREVIEW_COUNT).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className="bbr-story-actions">
            <button className="bbr-story-read-more" onClick={onReadMore} type="button">
              Read the full story <FiArrowRight />
            </button>
            <Link className="bbr-georgie-link" to={ROUTES.georgiesStory}>
              Read Georgie&apos;s Story <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
