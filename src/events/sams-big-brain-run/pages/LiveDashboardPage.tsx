import { useEffect, useMemo, useState } from "react";
import { CampaignLayout } from "../components/CampaignLayout";
import { LIVE_DATA_URL } from "../config";
import {
  fetchSnapshot,
  formatDuration,
  formatPace,
  mockSnapshot,
  summarise,
  type LiveSnapshot,
  type StageView,
} from "../live/liveData";
import "./LiveDashboardPage.css";

/**
 * Internal dashboard (unlinked, noindex). Runs on mock data until LIVE_DATA_URL points at the Garmin proxy.
 */
export function LiveDashboardPage() {
  return (
    <CampaignLayout>
      <Dashboard />
    </CampaignLayout>
  );
}

function Dashboard() {
  const isMock = !LIVE_DATA_URL;
  const [mockDays, setMockDays] = useState(12);
  const [remote, setRemote] = useState<LiveSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isMock) return;
    const controller = new AbortController();
    const load = () =>
      fetchSnapshot(LIVE_DATA_URL, controller.signal)
        .then((s) => {
          setRemote(s);
          setError(null);
        })
        .catch((e: unknown) => {
          if (!controller.signal.aborted) setError(e instanceof Error ? e.message : String(e));
        });
    load();
    const id = window.setInterval(load, 5 * 60 * 1000);
    return () => {
      controller.abort();
      window.clearInterval(id);
    };
  }, [isMock]);

  const snapshot = useMemo(() => (isMock ? mockSnapshot(mockDays) : remote), [isMock, mockDays, remote]);
  const summary = useMemo(() => (snapshot ? summarise(snapshot) : null), [snapshot]);

  return (
    <section className="bbr-section bbr-dash">
      <div className="bbr-wrap bbr-stack bbr-stack--lg">
        <header className="bbr-dash-head">
          <div className="bbr-stack" style={{ gap: 6 }}>
            <p className="bbr-eyebrow">Internal</p>
            <h1 className="bbr-h2">Live run dashboard</h1>
          </div>
          <div className="bbr-dash-meta">
            <span className={`bbr-dash-pill${isMock ? " bbr-dash-pill--mock" : ""}`}>
              {isMock ? "Mock data" : "Garmin proxy"}
            </span>
            {snapshot && <span className="bbr-muted">Updated {new Date(snapshot.updatedAt).toLocaleString("en-NZ")}</span>}
          </div>
        </header>

        {isMock && (
          <div className="bbr-card bbr-dash-mock">
            <label htmlFor="bbr-mock-days">Simulate days completed: {mockDays}</label>
            <input
              id="bbr-mock-days"
              type="range"
              min={0}
              max={25}
              value={mockDays}
              onChange={(e) => setMockDays(Number(e.target.value))}
            />
          </div>
        )}

        {error && (
          <p className="bbr-card bbr-dash-error" role="alert">
            Couldn't load live data: {error}
          </p>
        )}

        {!summary ? (
          <p className="bbr-muted">Loading…</p>
        ) : (
          <>
            <div className="bbr-dash-kpis">
              <Kpi label="Days complete" value={`${summary.completedDays} / ${summary.stages.length}`} />
              <Kpi
                label="Distance"
                value={`${summary.kmDone.toFixed(0)} / ${summary.kmPlanned.toLocaleString("en-NZ")} km`}
                progress={summary.kmDone / summary.kmPlanned}
              />
              <Kpi label="Moving time" value={formatDuration(summary.totalMovingSec)} />
              <Kpi label="Elevation gain" value={`${summary.totalElevationM.toLocaleString("en-NZ")} m`} />
            </div>

            <div className="bbr-dash-now">
              <StageCard title="Today" stage={summary.current} />
              <StageCard title="Next" stage={summary.next} />
              <div className="bbr-card bbr-stack" style={{ gap: 8 }}>
                <span className="bbr-dash-label">Garmin LiveTrack</span>
                {snapshot?.liveTrackUrl ? (
                  <a className="bbr-text-link" href={snapshot.liveTrackUrl} target="_blank" rel="noopener noreferrer">
                    Open today's LiveTrack ↗
                  </a>
                ) : (
                  <span className="bbr-muted">No LiveTrack link for today yet.</span>
                )}
              </div>
            </div>

            <DistanceChart stages={summary.stages} />

            <div className="bbr-dash-table-wrap">
              <table className="bbr-dash-table">
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Leg</th>
                    <th scope="col">Planned</th>
                    <th scope="col">Actual</th>
                    <th scope="col">Time</th>
                    <th scope="col">Pace</th>
                    <th scope="col">Ascent</th>
                    <th scope="col">Avg HR</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.stages.map((s) => (
                    <tr key={s.day} className={`is-${s.status}`}>
                      <td>{s.day}</td>
                      <td>
                        {s.from} → {s.to}
                      </td>
                      <td>{s.km} km</td>
                      <td>{s.actualKm != null ? `${s.actualKm} km` : "–"}</td>
                      <td>{s.movingTimeSec ? formatDuration(s.movingTimeSec) : "–"}</td>
                      <td>{s.movingTimeSec && s.actualKm ? formatPace(s.movingTimeSec, s.actualKm) : "–"}</td>
                      <td>{s.elevationGainM != null ? `${s.elevationGainM} m` : "–"}</td>
                      <td>{s.avgHeartRate ?? "–"}</td>
                      <td>
                        <span className={`bbr-dash-status bbr-dash-status--${s.status}`}>{s.status.replace("-", " ")}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Kpi({ label, value, progress }: { label: string; value: string; progress?: number }) {
  return (
    <div className="bbr-card bbr-dash-kpi">
      <span className="bbr-dash-label">{label}</span>
      <span className="bbr-dash-kpi-value">{value}</span>
      {progress !== undefined && (
        <div
          className="bbr-dash-bar"
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div style={{ width: `${Math.min(100, progress * 100)}%` }} />
        </div>
      )}
    </div>
  );
}

function StageCard({ title, stage }: { title: string; stage?: StageView }) {
  return (
    <div className="bbr-card bbr-stack" style={{ gap: 6 }}>
      <span className="bbr-dash-label">{title}</span>
      {stage ? (
        <>
          <span className="bbr-dash-stage">Day {stage.day}</span>
          <span>
            {stage.from} → {stage.to}
          </span>
          <span className="bbr-muted">
            {stage.actualKm != null ? `${stage.actualKm} of ~${stage.km} km` : `~${stage.km} km planned`}
          </span>
        </>
      ) : (
        <span className="bbr-muted">–</span>
      )}
    </div>
  );
}

/** Planned vs actual km per day. Plain SVG; no chart dependency. */
function DistanceChart({ stages }: { stages: StageView[] }) {
  const w = 1000;
  const h = 220;
  const pad = { top: 16, right: 8, bottom: 28, left: 36 };
  const max = 60;
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const band = innerW / stages.length;
  const y = (km: number) => pad.top + innerH - (km / max) * innerH;

  return (
    <figure className="bbr-card bbr-dash-chart">
      <figcaption className="bbr-dash-label">Distance per day (km): planned outline, actual filled</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Planned and actual distance for each day">
        {[0, 20, 40, 60].map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={w - pad.right} y1={y(t)} y2={y(t)} className="bbr-dash-grid" />
            <text x={pad.left - 8} y={y(t) + 4} textAnchor="end" className="bbr-dash-tick">
              {t}
            </text>
          </g>
        ))}
        {stages.map((s, i) => {
          const x = pad.left + i * band + band * 0.18;
          const bw = band * 0.64;
          return (
            <g key={s.day}>
              <rect x={x} y={y(s.km)} width={bw} height={y(0) - y(s.km)} className="bbr-dash-planned" rx={3} />
              {s.actualKm != null && (
                <rect
                  x={x}
                  y={y(s.actualKm)}
                  width={bw}
                  height={y(0) - y(s.actualKm)}
                  className={s.status === "in-progress" ? "bbr-dash-actual bbr-dash-actual--live" : "bbr-dash-actual"}
                  rx={3}
                >
                  <title>
                    Day {s.day}: {s.actualKm} of {s.km} km
                  </title>
                </rect>
              )}
              {(s.day === 1 || s.day % 5 === 0) && (
                <text x={x + bw / 2} y={h - 8} textAnchor="middle" className="bbr-dash-tick">
                  {s.day}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
