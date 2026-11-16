import { useState } from "react";
import { ROUTE, ROUTE_STATUS, ROUTE_TOTAL_KM } from "../data/route";
import "./RouteSection.css";

const PREVIEW_COUNT = 6;

/**
 * Route map slot + town-to-town list.
 * The map area is a placeholder for the shared D3 map component; it receives ROUTE as its data.
 */
export function RouteSection() {
  const [expanded, setExpanded] = useState(false);
  const stages = expanded ? ROUTE : ROUTE.slice(0, PREVIEW_COUNT);

  return (
    <section className="bbr-section" aria-labelledby="bbr-route-title">
      <div className="bbr-wrap bbr-route">
        <div className="bbr-route-map" aria-hidden="true">
          {/* TODO: mount the D3 route map here, e.g. <RouteMap stages={ROUTE} /> */}
          <div className="bbr-placeholder bbr-route-map-slot">Interactive route map (D3 component goes here)</div>
        </div>

        <div className="bbr-route-list bbr-stack">
          <h2 id="bbr-route-title" className="bbr-h2">
            The route
          </h2>
          <p className="bbr-muted">
            {ROUTE_STATUS}. About {ROUTE_TOTAL_KM.toLocaleString("en-NZ")} km over 25 days.
          </p>
          <ol className="bbr-stages" id="bbr-stages">
            {stages.map((s) => (
              <li key={s.day}>
                <span className="bbr-stage-day">Day {s.day}</span>
                <span className="bbr-stage-leg">
                  {s.from} → {s.to}
                  {s.note && <span className="bbr-stage-note"> {s.note}</span>}
                </span>
                <span className="bbr-stage-km">~{s.km} km</span>
              </li>
            ))}
          </ol>
          <button
            className="bbr-btn bbr-btn--ghost bbr-btn--sm"
            type="button"
            aria-expanded={expanded}
            aria-controls="bbr-stages"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : `Show all ${ROUTE.length} days`}
          </button>
        </div>
      </div>
    </section>
  );
}
