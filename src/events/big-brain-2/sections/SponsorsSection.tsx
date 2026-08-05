import { BBR_SPONSORS } from "../data/content";

export function SponsorsSection() {
  // Duplicate for seamless infinite scroll
  const looped = [...BBR_SPONSORS, ...BBR_SPONSORS];

  return (
    <section className="bbr-sponsors-section">
      <p className="bbr-sponsors-label">Proudly supported by</p>
      <div className="bbr-ticker-wrap">
        <div className="bbr-ticker-track">
          {looped.map((sponsor, i) => (
            <div className="bbr-ticker-item" key={i}>
              <span className="bbr-sponsor-chip" aria-label={sponsor.name}>
                <img className="bbr-sponsor-logo" src={sponsor.logoSrc} alt={`${sponsor.name} logo`} loading="lazy" />
              </span>
              <div className="bbr-ticker-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
