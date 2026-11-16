import { useEffect, useState } from "react";
import { CAMPAIGN_STATS_URL } from "../config";

export type Supporter = {
  name: string;
  message: string;
  /** ISO timestamp */
  createdAt: string;
};

export type CampaignStats = {
  total: number;
  supporterCount: number | null;
  recent: Supporter[];
};

type StatsResponse = {
  success: boolean;
  total?: number;
  supporterCount?: number;
  recent?: Supporter[];
};

const EMPTY: CampaignStats = { total: 0, supporterCount: null, recent: [] };

/** How often to re-check for new supporters while the tab is visible. The script caches for 5 min anyway. */
const POLL_MS = 60_000;

/** Stable key for a supporter row (the feed has no IDs, by design). */
export function supporterKey(s: Supporter): string {
  return `${s.createdAt}|${s.name}`;
}

/**
 * Live campaign stats from the donation webhook's Apps Script, refreshed every minute while the
 * page is visible so new supporters appear without a reload.
 * Older deployments only return `total`; supporterCount/recent stay empty until the new script is live.
 */
export function useCampaignStats(): CampaignStats & { isLoading: boolean; failed: boolean } {
  const [stats, setStats] = useState<CampaignStats>(EMPTY);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let controller: AbortController | null = null;
    let timer: number | undefined;
    let disposed = false;

    const load = () => {
      controller?.abort();
      controller = new AbortController();
      const { signal } = controller;

      fetch(CAMPAIGN_STATS_URL, { signal })
        .then((res) => {
          if (!res.ok) throw new Error(`Stats request failed: ${res.status}`);
          return res.json() as Promise<StatsResponse>;
        })
        .then((data) => {
          if (!data.success) throw new Error("Stats response not successful");
          setFailed(false);
          setStats({
            total: typeof data.total === "number" ? data.total : 0,
            supporterCount: typeof data.supporterCount === "number" ? data.supporterCount : null,
            recent: Array.isArray(data.recent) ? data.recent : [],
          });
        })
        .catch((err: unknown) => {
          if (signal.aborted) return;
          console.error("Failed to fetch campaign stats", err);
          setFailed(true);
        })
        .finally(() => {
          if (!signal.aborted) setIsLoading(false);
        });
    };

    const schedule = () => {
      window.clearInterval(timer);
      if (document.visibilityState === "visible") timer = window.setInterval(load, POLL_MS);
    };

    const onVisibility = () => {
      if (disposed) return;
      if (document.visibilityState === "visible") load();
      schedule();
    };

    load();
    schedule();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return { ...stats, isLoading, failed };
}

/** "4 min ago", "3 h ago", "2 days ago" */
export function timeAgo(iso: string, now = Date.now()): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const mins = Math.max(0, Math.round((now - then) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}
