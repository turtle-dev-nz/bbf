import { BBR_PARTNERS } from "../data/content";

export function PartnersSection() {
  return (
    <section className="bbr-partners-section">
      <div className="bbr-partners-inner">
        <div className="bbr-partners-header">
          <div>
            <p className="bbr-section-label">Charity Partners</p>
            <h2>
              Together We're
              <br />
              Stronger
            </h2>
          </div>
        </div>

        <div className="bbr-partners-grid">
          {BBR_PARTNERS.map((partner) => (
            <a
              key={partner.name}
              className="bbr-partner-card"
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bbr-partner-logo-wrap">
                <span className="bbr-partner-initials">{partner.initials}</span>
              </div>
              <div className="bbr-partner-info">
                <p className="bbr-partner-name">{partner.name}</p>
                <p className="bbr-partner-desc">{partner.description}</p>
                <span className="bbr-partner-link">Visit ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
