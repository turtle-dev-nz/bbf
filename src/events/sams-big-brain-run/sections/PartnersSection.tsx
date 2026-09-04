import { BBR_PARTNERS } from "../data/content";
import "./PartnersSection.css";

export function PartnersSection() {
  return (
    <section className="bbr-partners-section">
      <div className="bbr-partners-inner">
        <div className="bbr-partners-header">
          <h2>
            Together We're
            <br />
            Stronger
          </h2>
        </div>

        <div className="bbr-partners-grid">
          {BBR_PARTNERS.map((partner, i) => (
            <div key={partner.name}>
              <p className="bbr-section-label">{i ? "Research Donee" : "Charity Partner"}</p>
              <a className="bbr-partner-card" href={partner.href} target="_blank" rel="noopener noreferrer">
                <div className="bbr-partner-logo-wrap">
                  <img className="bbr-partner-logo" src={partner.logo} alt={partner.name} width={80} height={80} />
                  {/* <span className="bbr-partner-initials">{partner.initials}</span> */}
                </div>
                <div className="bbr-partner-info">
                  <p className="bbr-partner-name">{partner.name}</p>
                  <p className="bbr-partner-desc">{partner.description}</p>
                  <span className="bbr-partner-link">Visit ↗</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
