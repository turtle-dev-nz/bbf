import { useEffect, useRef, useState } from "react";
import { ROUTE, ROUTE_STATUS, ROUTE_TOTAL_KM } from "../data/route";
import { usePrefersReducedMotion } from "../hooks/motion";
import "./RouteSection.css";

const PREVIEW_COUNT = 6;

/**
 * Route map slot + town-to-town list.
 *
 * As the list scrolls past the middle of the screen, a trail fills down the rail and the
 * current day is highlighted. `activeDay` is what the D3 map should use to draw the route
 * up to that point and light the matching marker.
 */
export function RouteSection() {
  const [expanded, setExpanded] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const stages = expanded ? ROUTE : ROUTE.slice(0, PREVIEW_COUNT);
  const active = ROUTE.find((s) => s.day === activeDay);
  const kmToActive = ROUTE.filter((s) => s.day <= activeDay).reduce((sum, s) => sum + s.km, 0);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === "undefined") return;

    // A 1px band across the middle of the viewport: whichever row crosses it is "today".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveDay(Number((entry.target as HTMLElement).dataset.day));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    list.querySelectorAll("li").forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, [expanded]);

  // Trail length: down to the middle of the active row (written straight to a CSS variable).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const row = list.querySelector<HTMLElement>(`li[data-day="${activeDay}"]`);
    list.style.setProperty("--trail", `${row ? row.offsetTop + row.offsetHeight / 2 : 0}px`);
  }, [activeDay, expanded]);

  return (
    <section className="bbr-section" aria-labelledby="bbr-route-title">
      <div className="bbr-wrap bbr-route">
        <div className="bbr-route-map">
          {/* TODO: mount the D3 route map here, e.g. <RouteMap stages={ROUTE} activeDay={activeDay} /> */}
          <div className="bbr-placeholder bbr-route-map-slot">
            <span>Interactive route map (D3 component goes here)</span>
            {active && (
              <span className="bbr-route-map-active" aria-live="polite">
                Day {active.day}: {active.from} → {active.to} · {kmToActive.toLocaleString("en-NZ")} km in
              </span>
            )}
          </div>
        </div>

        <div className="bbr-route-list bbr-stack">
          <h2 id="bbr-route-title" className="bbr-h2">
            The route
          </h2>
          <p className="bbr-muted">
            {ROUTE_STATUS}. About {ROUTE_TOTAL_KM.toLocaleString("en-NZ")} km over 25 days.
          </p>
          <ol
            ref={listRef}
            className={`bbr-stages${reduced ? " bbr-stages--static" : ""}`}
            id="bbr-stages"
          >
            {stages.map((s) => (
              <li
                key={s.day}
                data-day={s.day}
                className={s.day < activeDay ? "is-passed" : s.day === activeDay ? "is-active" : undefined}
              >
                <span className="bbr-stage-dot" aria-hidden="true" />
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
