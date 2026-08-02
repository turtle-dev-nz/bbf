import type { IconType } from "react-icons";
import { FiInstagram, FiFacebook, FiGlobe } from "react-icons/fi";
import { BB2_SOCIAL } from "../data/content";

type SocialPlatform = (typeof BB2_SOCIAL)[number]["platform"];

const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  instagram: FiInstagram,
  facebook: FiFacebook,
  web: FiGlobe,
};

function NZRouteMap() {
  return (
    <svg
      viewBox="0 0 140 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="bb2-nz-map"
    >
      {/* North Island outline */}
      <path
        d="M72 290 L100 255 L120 210 L132 160 L122 118 L108 96 L82 74 L70 50 L67 18 L62 28 L53 50 L44 70 L36 88 L22 130 L26 156 L36 178 L44 216 L56 258 Z"
        style={{ fill: "var(--bb2-bg-mid)", stroke: "var(--bb2-border)", strokeWidth: "1" }}
      />
      {/* Route dashed line */}
      <path
        d="M71 284 L60 248 L63 220 L67 192 L83 155 L79 128 L74 96 L70 65 L68 22"
        style={{
          stroke: "var(--bb2-accent)",
          strokeWidth: "1.5",
          strokeDasharray: "4 3",
          strokeLinecap: "round",
        }}
      />
      {/* Waypoints */}
      {(
        [
          [71, 284],
          [60, 248],
          [63, 220],
          [67, 192],
          [83, 155],
          [79, 128],
          [74, 96],
          [70, 65],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          style={{
            fill: "var(--bb2-bg-card)",
            stroke: "var(--bb2-accent)",
            strokeWidth: "1.5",
          }}
        />
      ))}
      {/* Destination flag */}
      <line
        x1="68"
        y1="22"
        x2="68"
        y2="5"
        style={{ stroke: "var(--bb2-accent)", strokeWidth: "1.5", strokeLinecap: "round" }}
      />
      <path d="M68 5 L82 9 L68 14 Z" style={{ fill: "var(--bb2-accent)" }} />
    </svg>
  );
}

export function FollowJourneySection() {
  return (
    <section className="bb2-follow-section">
      <div className="bb2-follow-inner">
        <div className="bb2-follow-links-col">
          <p className="bb2-follow-title">Follow the Journey</p>
          <ul className="bb2-follow-links">
            {BB2_SOCIAL.map((s) => {
              const Icon = SOCIAL_ICONS[s.platform];
              return (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    className="bb2-follow-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{s.handle}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="bb2-follow-tagline">
          Follow the journey.
          <br />
          Share the course.
          <br />
          Be part of something extraordinary.
        </p>

        <div className="bb2-follow-map">
          <NZRouteMap />
        </div>
      </div>
    </section>
  );
}
