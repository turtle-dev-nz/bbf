import { runStats } from "../data/content";

export function EventStatsSection() {
  return (
    <section id="events" className="run-section run-section--stats">
      <div className="container run-section__inner">
        <div className="run-section__heading">
          <p className="run-eyebrow">Event snapshot</p>
          <h2>Quick campaign stats</h2>
        </div>

        <div className="run-stats-grid">
          {runStats.map((stat) => (
            <article className="run-stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
