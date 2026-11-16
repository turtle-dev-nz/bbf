/**
 * Live-run data model for the (hidden) dashboard.
 *
 * Source of truth will be Sam's Garmin account. Garmin's personal API key is pull-only and must stay
 * server-side, so the browser never talks to Garmin: a small proxy (Apps Script or a Cloudflare Worker)
 * pulls completed activities on a schedule, normalises them to `LiveSnapshot`, and serves that JSON.
 * Until LIVE_DATA_URL is set, the dashboard runs on mock data derived from the planned route.
 */
import { ROUTE, ROUTE_TOTAL_KM, type RouteStage } from "../data/route";

export type StageStatus = "upcoming" | "in-progress" | "complete";

export type StageResult = {
  day: number;
  status: StageStatus;
  /** Distance actually covered, km */
  actualKm?: number;
  /** Moving time, seconds */
  movingTimeSec?: number;
  /** Total ascent, metres */
  elevationGainM?: number;
  avgHeartRate?: number;
  /** ISO timestamp the activity started */
  startedAt?: string;
};

export type LiveSnapshot = {
  /** ISO timestamp the proxy last pulled from Garmin */
  updatedAt: string;
  /** Optional Garmin LiveTrack share link for the current session (pasted daily by the crew) */
  liveTrackUrl?: string;
  /** Latest known position, [longitude, latitude] */
  lastPosition?: [number, number];
  stages: StageResult[];
};

export type StageView = RouteStage & StageResult;

export type LiveSummary = {
  stages: StageView[];
  completedDays: number;
  kmDone: number;
  kmPlanned: number;
  current?: StageView;
  next?: StageView;
  totalMovingSec: number;
  totalElevationM: number;
};

export function summarise(snapshot: LiveSnapshot): LiveSummary {
  const byDay = new Map(snapshot.stages.map((s) => [s.day, s]));
  const stages: StageView[] = ROUTE.map((r) => ({ ...r, status: "upcoming", ...byDay.get(r.day) }));

  const complete = stages.filter((s) => s.status === "complete");
  const current = stages.find((s) => s.status === "in-progress");
  const next = stages.find((s) => s.status === "upcoming");

  return {
    stages,
    completedDays: complete.length,
    kmDone: stages.reduce((sum, s) => sum + (s.actualKm ?? 0), 0),
    kmPlanned: ROUTE_TOTAL_KM,
    current,
    next,
    totalMovingSec: stages.reduce((sum, s) => sum + (s.movingTimeSec ?? 0), 0),
    totalElevationM: stages.reduce((sum, s) => sum + (s.elevationGainM ?? 0), 0),
  };
}

/** Deterministic mock: first `daysDone` days complete, the next one in progress. */
export function mockSnapshot(daysDone: number): LiveSnapshot {
  const stages: StageResult[] = ROUTE.map((r, i) => {
    if (i < daysDone) {
      const variance = ((r.day * 37) % 11) / 10 - 0.5; // -0.5..+0.5 km, stable per day
      const km = Math.round((r.km + variance) * 10) / 10;
      return {
        day: r.day,
        status: "complete",
        actualKm: km,
        movingTimeSec: Math.round(km * 6.4 * 60), // ~6:24 /km
        elevationGainM: 300 + ((r.day * 53) % 700),
        avgHeartRate: 128 + ((r.day * 7) % 14),
        startedAt: new Date(Date.UTC(2027, 0, 15 + r.day, 18, 0)).toISOString(),
      };
    }
    if (i === daysDone) {
      return { day: r.day, status: "in-progress", actualKm: Math.round(r.km * 0.4 * 10) / 10 };
    }
    return { day: r.day, status: "upcoming" };
  });

  return {
    updatedAt: new Date().toISOString(),
    stages,
  };
}

export async function fetchSnapshot(url: string, signal?: AbortSignal): Promise<LiveSnapshot> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Live data request failed: ${res.status}`);
  const data = (await res.json()) as LiveSnapshot;
  if (!Array.isArray(data.stages)) throw new Error("Live data missing stages");
  return data;
}

export function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

export function formatPace(sec: number, km: number): string {
  if (!km) return "–";
  const perKm = sec / km;
  const m = Math.floor(perKm / 60);
  const s = Math.round(perKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}
