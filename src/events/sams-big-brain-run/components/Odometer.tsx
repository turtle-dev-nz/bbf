import { useInViewOnce, usePrefersReducedMotion } from "../hooks/motion";
import "./Odometer.css";

interface OdometerProps {
  /** Final value as displayed, e.g. "25", "~1,200", "312". Non-digits are shown as-is. */
  value: string;
  className?: string;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Digits roll up like a watch face the first time the number scrolls into view,
 * and roll again whenever the value changes (e.g. a new supporter).
 * Screen readers get the plain value.
 */
export function Odometer({ value, className }: OdometerProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLSpanElement>(0.6);
  const settled = inView || reduced;
  const chars = value.split("");
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let digitIndex = 0;

  return (
    <span ref={ref} className={`bbr-odo${reduced ? " bbr-odo--static" : ""} ${className ?? ""}`}>
      <span className="bbr-visually-hidden">{value}</span>
      <span className="bbr-odo-visual" aria-hidden="true">
        {chars.map((ch, i) => {
          if (!/\d/.test(ch)) {
            return (
              <span key={`s${i}`} className="bbr-odo-sym">
                {ch}
              </span>
            );
          }
          // Rightmost digits travel furthest, so let them start slightly later.
          const order = digitIndex++;
          const delay = (digitCount - 1 - order) * 70;
          const target = settled ? Number(ch) : 0;
          return (
            <span key={`d${i}`} className="bbr-odo-digit">
              <span className="bbr-odo-sizer">0</span>
              <span
                className="bbr-odo-strip"
                style={{ transform: `translateY(-${target * 10}%)`, transitionDelay: `${delay}ms` }}
              >
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
