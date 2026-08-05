import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ROUTES } from "../../../app/routes";
import { BB2_STORY } from "../data/content";
import "./StorySection.css";

const PREVIEW_COUNT = 2;

interface StorySectionProps {
  onReadMore: () => void;
}

export function StorySection({ onReadMore }: StorySectionProps) {
  return (
    <section className="bb2-story-section">
      <div className="bb2-story-inner">
        <div className="bb2-story-meta">
          <p className="bb2-section-label">The Story</p>
          <h2>
            Why Sam
            <br />
            Runs
          </h2>
          <blockquote className="bb2-pull-quote">{BB2_STORY.pullQuote}</blockquote>
        </div>

        <div className="bb2-story-body">
          {BB2_STORY.paragraphs.slice(0, PREVIEW_COUNT).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className="bb2-story-actions">
            <button className="bb2-story-read-more" onClick={onReadMore} type="button">
              Read the full story <FiArrowRight />
            </button>
            <Link className="bb2-georgie-link" to={ROUTES.georgiesStory}>
              Read Georgie&apos;s Story <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
