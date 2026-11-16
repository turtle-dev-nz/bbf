import { BBR_TAGLINE } from "../data/content";
import "./NoBrainer.css";

interface NoBrainerProps {
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "accent" | "light" | "dark";
  as?: "p" | "h2";
}

/** The campaign tagline, set in the script face so it reads as a sign-off wherever it appears. */
export function NoBrainer({ size = "md", tone = "accent", as: Tag = "p" }: NoBrainerProps) {
  return <Tag className={`bbr-nobrainer bbr-nobrainer--${size} bbr-nobrainer--${tone}`}>{BBR_TAGLINE}</Tag>;
}
