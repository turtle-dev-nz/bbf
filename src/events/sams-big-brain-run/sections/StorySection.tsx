import { FiArrowRight } from "react-icons/fi";

export function StorySection() {
  return (
    <section id="story" className="run-section">
      <div className="container run-section__inner">
        <div className="run-story-grid">
          <div className="run-story__media">Photo / video placeholder</div>
          <div className="run-story__content">
            <p className="run-eyebrow">The story</p>
            <h2>Campaign story section</h2>
            <p className="run-section__placeholder">
              Short placeholder copy for the personal story, reason for the event, or charity context.
            </p>
            <a className="run-inline-link" href="#contact">
              Read more placeholder <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}