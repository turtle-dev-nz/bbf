import { BBR_TAGLINE } from "../data/content";
import { useInViewOnce, usePrefersReducedMotion } from "../hooks/motion";
import "./NoBrainer.css";

interface NoBrainerProps {
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "accent" | "light" | "dark";
  as?: "p" | "h2";
  /** Wipe the line in left to right the first time it scrolls into view. Use in one place only. */
  reveal?: boolean;
}

/** The campaign tagline, as a consistent sign-off: condensed italic caps in the display face. */
export function NoBrainer({ size = "md", tone = "accent", as: Tag = "p", reveal = false }: NoBrainerProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLParagraphElement & HTMLHeadingElement>(0.6);
  const animate = reveal && !reduced;
  const revealClass = animate ? ` bbr-nobrainer--reveal${inView ? " is-written" : ""}` : "";

  // The observer watches the outer element; the clip-path goes on the inner span, because a fully
  // clipped element never reports as intersecting.
  return (
    <Tag ref={ref} className={`bbr-nobrainer bbr-nobrainer--${size} bbr-nobrainer--${tone}${revealClass}`}>
      {animate ? <span className="bbr-nobrainer-ink">{BBR_TAGLINE}</span> : BBR_TAGLINE}
    </Tag>
  );
}
