import { BBR_STATS } from "../data/content";
import { Odometer } from "../components/Odometer";

/** The three sourced "why it matters" figures, each linked to its source. */
export function StatsGrid() {
  return (
    <div className="bbr-grid">
      {BBR_STATS.map((stat) => (
        <div className="bbr-card bbr-stat" key={stat.value}>
          {stat.animate ? (
            <Odometer className="bbr-stat-value" value={stat.value} />
          ) : (
            <span className="bbr-stat-value">{stat.value}</span>
          )}
          <p className="bbr-stat-label">{stat.label}</p>
          <a className="bbr-stat-source" href={stat.href} target="_blank" rel="noopener noreferrer">
            Source: {stat.source}
          </a>
        </div>
      ))}
    </div>
  );
}
