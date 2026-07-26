import { runTiers } from "../data/content";

export function TiersSection() {
  return (
    <section id="tiers" className="run-section run-section--dark">
      <div className="container run-section__inner">
        <div className="run-section__heading">
          <p className="run-eyebrow">Packages</p>
          <h2>Sponsorship tiers scaffold</h2>
          <p className="run-section__placeholder">Keep real pricing and deliverables for later. This just gives you the structure.</p>
        </div>

        <div className="run-tier-grid">
          {runTiers.map((tier) => (
            <article className={`run-tier-card${tier.featured ? " run-tier-card--featured" : ""}`} key={tier.title}>
              <p className="run-tier-card__eyebrow">{tier.eyebrow}</p>
              <h3>{tier.title}</h3>
              <p>{tier.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}