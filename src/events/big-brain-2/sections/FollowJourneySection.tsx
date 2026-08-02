import type { IconType } from "react-icons";
import { FiInstagram, FiFacebook, FiGlobe } from "react-icons/fi";
import { BB2_SOCIAL } from "../data/content";

type SocialPlatform = (typeof BB2_SOCIAL)[number]["platform"];

const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  instagram: FiInstagram,
  facebook: FiFacebook,
  web: FiGlobe,
};

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
                  <a href={s.href} className="bb2-follow-link" target="_blank" rel="noopener noreferrer">
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
      </div>
    </section>
  );
}
