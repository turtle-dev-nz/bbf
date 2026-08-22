import { useEffect, useState } from "react";

const DONATION_TOTAL_URL =
  "https://script.google.com/macros/s/AKfycbxaa74fDnM3RfBfCH-sEscrcNkMvoS212XpiI_07LcaRyv0XSnBowLoeMSeoVBXzcF8/exec";

interface DonationTotalResponse {
  success: boolean;
  total: number;
}

interface UseDonationTotalResult {
  total: number;
  isLoading: boolean;
}

/** Fetches the live donation total from the Apps Script endpoint, falling back to `fallback` until it resolves. */
export function useDonationTotal(fallback: number): UseDonationTotalResult {
  const [total, setTotal] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(DONATION_TOTAL_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Donation total request failed: ${res.status}`);
        return res.json() as Promise<DonationTotalResponse>;
      })
      .then((data) => {
        if (!cancelled && data.success && typeof data.total === "number") {
          setTotal(data.total);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch donation total", err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { total, isLoading };
}
