import { BB2_SPONSORS } from "../data/content";

export function SponsorsSection() {
  // Duplicate for seamless infinite scroll
  const looped = [...BB2_SPONSORS, ...BB2_SPONSORS];

  return (
    <section className="bb2-sponsors-section">
      <p className="bb2-sponsors-label">Proudly supported by</p>
      <div className="bb2-ticker-wrap">
        <div className="bb2-ticker-track">
          {looped.map((sponsor, i) => (
            <div className="bb2-ticker-item" key={i}>
              <span className="bb2-sponsor-chip" aria-label={sponsor.name}>
                <img className="bb2-sponsor-logo" src={sponsor.logoSrc} alt={`${sponsor.name} logo`} loading="lazy" />
              </span>
              <div className="bb2-ticker-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
