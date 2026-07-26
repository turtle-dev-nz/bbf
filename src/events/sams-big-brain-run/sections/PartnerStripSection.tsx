import { runPartnerNames } from "../data/content";

export function PartnerStripSection() {
  return (
    <section className="run-strip" aria-label="Supporting partners placeholder">
      <div className="container run-strip__inner">
        <span className="run-strip__label">Backed by</span>
        <div className="run-strip__items">
          {runPartnerNames.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
