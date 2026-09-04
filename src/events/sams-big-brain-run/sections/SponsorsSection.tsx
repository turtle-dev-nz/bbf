import { BBR_SPONSORS } from "../data/content";
import "./SponsorsSection.css";

export function SponsorsSection() {
  // Duplicate for seamless infinite scroll
  const looped = [...BBR_SPONSORS, ...BBR_SPONSORS];

  // On small screens, split into two disjoint rows so duplicate brands are not visible at once.
  const mobilePrimary = BBR_SPONSORS.filter((_, i) => i % 2 === 0);
  const mobileSecondaryRaw = BBR_SPONSORS.filter((_, i) => i % 2 === 1);
  const mobileSecondary = mobileSecondaryRaw.length > 0 ? mobileSecondaryRaw : mobilePrimary;
  const loopedMobilePrimary = [...mobilePrimary, ...mobilePrimary];
  const loopedMobileSecondary = [...mobileSecondary, ...mobileSecondary];

  return (
    <section className="bbr-sponsors-section">
      <p className="bbr-sponsors-label">Proudly supported by</p>

      <div className="bbr-ticker-wrap bbr-ticker-wrap--desktop">
        <div className="bbr-ticker-track">
          {looped.map((sponsor, i) => (
            <div className="bbr-ticker-item" key={i}>
              <a
                className="bbr-sponsor-chip"
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name}`}
              >
                <img className="bbr-sponsor-logo" src={sponsor.logoSrc} alt={`${sponsor.name} logo`} loading="lazy" />
              </a>
              <div className="bbr-ticker-dot" />
            </div>
          ))}
        </div>
      </div>

      <div className="bbr-ticker-mobile">
        <div className="bbr-ticker-wrap bbr-ticker-wrap--mobile-primary">
          <div className="bbr-ticker-track bbr-ticker-track--mobile-primary">
            {loopedMobilePrimary.map((sponsor, i) => (
              <div className="bbr-ticker-item" key={`mobile-primary-${i}`}>
                <a
                  className="bbr-sponsor-chip"
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name}`}
                >
                  <img className="bbr-sponsor-logo" src={sponsor.logoSrc} alt={`${sponsor.name} logo`} loading="lazy" />
                </a>
                <div className="bbr-ticker-dot" />
              </div>
            ))}
          </div>
        </div>

        <div className="bbr-ticker-wrap bbr-ticker-wrap--secondary" aria-hidden="true">
          <div className="bbr-ticker-track bbr-ticker-track--secondary">
            {loopedMobileSecondary.map((sponsor, i) => (
              <div className="bbr-ticker-item" key={`mobile-secondary-${i}`}>
                <a
                  className="bbr-sponsor-chip"
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name}`}
                  tabIndex={-1}
                >
                  <img className="bbr-sponsor-logo" src={sponsor.logoSrc} alt="" loading="lazy" />
                </a>
                <div className="bbr-ticker-dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
