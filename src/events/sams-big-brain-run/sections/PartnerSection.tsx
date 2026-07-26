import { FiFlag, FiHeart, FiTrendingUp } from "react-icons/fi";

export function PartnerSection() {
  return (
    <section id="partner" className="run-section">
      <div className="container run-section__inner">
        <div className="run-section__heading">
          <p className="run-eyebrow">For sponsors</p>
          <h2>Why partner with the campaign</h2>
          <p className="run-section__placeholder">Use this area for your business-facing pitch and high-level value points.</p>
        </div>

        <div className="run-card-grid">
          <article className="run-info-card">
            <FiTrendingUp className="run-section__icon" aria-hidden="true" />
            <h3>Exposure placeholder</h3>
            <p>Brief description of reach, content, or media value.</p>
          </article>
          <article className="run-info-card">
            <FiFlag className="run-section__icon" aria-hidden="true" />
            <h3>Impact placeholder</h3>
            <p>Brief description of research outcomes or community benefit.</p>
          </article>
          <article className="run-info-card">
            <FiHeart className="run-section__icon" aria-hidden="true" />
            <h3>Story placeholder</h3>
            <p>Brief description of the human story behind the campaign.</p>
          </article>
        </div>
      </div>
    </section>
  );
}