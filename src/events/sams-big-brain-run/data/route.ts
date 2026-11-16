/**
 * Planned route, from "01_SBBR_Daily_route-291026-DRAFT" (Route_Maps, WORKING DRAFT, 29 Oct 2026).
 * Town to town only; dates are deliberately not published while the route is a draft.
 *
 * `coords` is optional and left for the D3 map component to fill in ([longitude, latitude]).
 */
export type RouteStage = {
  day: number;
  from: string;
  to: string;
  /** Estimated distance in km */
  km: number;
  note?: string;
  coords?: { from?: [number, number]; to?: [number, number] };
};

export const ROUTE_STATUS = "Planned route, subject to change";

export const ROUTE: RouteStage[] = [
  { day: 1, from: "Cape Reinga", to: "Te Kao", km: 50 },
  { day: 2, from: "Te Kao", to: "Awanui", km: 51 },
  { day: 3, from: "Awanui", to: "Mākene Road", km: 51, note: "via Raetea Forest" },
  { day: 4, from: "Mākene Road", to: "Kaikohe", km: 50, note: "route TBC" },
  { day: 5, from: "Kaikohe", to: "Titoki", km: 45 },
  { day: 6, from: "Titoki", to: "Whangārei", km: 47 },
  { day: 7, from: "Whangārei", to: "Kaiwaka", km: 43, note: "via Waipū" },
  { day: 8, from: "Kaiwaka", to: "Puhoi", km: 50, note: "via Warkworth" },
  { day: 9, from: "Puhoi", to: "Devonport", km: 50 },
  { day: 10, from: "Auckland", to: "Pukekohe", km: 51 },
  { day: 11, from: "Pukekohe", to: "Rangiriri", km: 43 },
  { day: 12, from: "Rangiriri", to: "Hamilton", km: 52 },
  { day: 13, from: "Hamilton", to: "Ōtorohanga", km: 54 },
  { day: 14, from: "Ōtorohanga", to: "Kopaki", km: 48, note: "via Te Kūiti" },
  { day: 15, from: "Kopaki", to: "Ongarue", km: 44 },
  { day: 16, from: "Ongarue", to: "Owhango", km: 44, note: "via Taumarunui" },
  { day: 17, from: "Owhango", to: "National Park", km: 47 },
  { day: 18, from: "National Park", to: "Horopito", km: 45 },
  { day: 19, from: "Horopito", to: "Rangiwaea", km: 48 },
  { day: 20, from: "Rangiwaea", to: "Hunterville", km: 48 },
  { day: 21, from: "Hunterville", to: "Bulls", km: 48, note: "via Marton" },
  { day: 22, from: "Bulls", to: "Foxton", km: 45 },
  { day: 23, from: "Foxton", to: "Te Horo", km: 45, note: "via Ōtaki" },
  { day: 24, from: "Te Horo", to: "Pukerua Bay", km: 44, note: "via Paekākāriki" },
  { day: 25, from: "Pukerua Bay", to: "Wellington", km: 46, note: "via Porirua" },
];

export const ROUTE_TOTAL_KM = ROUTE.reduce((sum, stage) => sum + stage.km, 0);

/** Rounded figure for blurbs ("about 1,200 km"). */
export const ROUTE_TOTAL_KM_ROUNDED = Math.round(ROUTE_TOTAL_KM / 100) * 100;
