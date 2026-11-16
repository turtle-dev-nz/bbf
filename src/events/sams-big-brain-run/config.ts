/**
 * Runtime endpoints for Sam's Big Brain Run.
 *
 * Each value can be overridden at build time with a Vite env var (see .env.example),
 * so a redeployed Apps Script URL doesn't need a code change.
 */

const env = import.meta.env;

/** Apps Script web app: GET returns { success, total, supporterCount, recent[] }. */
export const CAMPAIGN_STATS_URL: string =
  env.VITE_CAMPAIGN_STATS_URL ??
  "https://script.google.com/macros/s/AKfycbxaa74fDnM3RfBfCH-sEscrcNkMvoS212XpiI_07LcaRyv0XSnBowLoeMSeoVBXzcF8/exec";

/** Apps Script web app that forwards contact-form messages by email. Empty = fall back to mailto. */
export const CONTACT_FORM_URL: string = env.VITE_CONTACT_FORM_URL ?? "";

/** Read-only proxy that returns normalised run data (Garmin, once access is set up). Empty = mock data. */
export const LIVE_DATA_URL: string = env.VITE_LIVE_DATA_URL ?? "";

/**
 * Raisely donation form, loaded as a plain iframe (not the embed script) so it can fill a
 * full-screen sheet on mobile. Raisely supports iframing `<campaign>.raisely.com/embed`.
 */
export const RAISELY_EMBED_URL: string = env.VITE_RAISELY_EMBED_URL ?? "https://sams-big-brain-run.raisely.com/embed";

export const CONTACT_EMAIL = "hello@bigbrainfoundation.org";

export const PEOPLE_WITH_IDEAS_URL = "https://peoplewithideas.co.nz";
