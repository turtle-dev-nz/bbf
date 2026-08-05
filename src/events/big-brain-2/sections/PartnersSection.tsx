import { BB2_PARTNERS } from "../data/content";
import "./PartnersSection.css";

export function PartnersSection() {
  return (
    <section className="bb2-partners-section">
      <div className="bb2-partners-inner">
        <div className="bb2-partners-header">
          <div>
            <p className="bb2-section-label">Charity Partners</p>
            <h2>
              Together We're
              <br />
              Stronger
            </h2>
          </div>
        </div>

        <div className="bb2-partners-grid">
          {BB2_PARTNERS.map((partner) => (
            <a
              key={partner.name}
              className="bb2-partner-card"
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bb2-partner-logo-wrap">
                <span className="bb2-partner-initials">{partner.initials}</span>
              </div>
              <div className="bb2-partner-info">
                <p className="bb2-partner-name">{partner.name}</p>
                <p className="bb2-partner-desc">{partner.description}</p>
                <span className="bb2-partner-link">Visit ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
