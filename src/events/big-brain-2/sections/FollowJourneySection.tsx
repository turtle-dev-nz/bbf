import type { IconType } from "react-icons";
import { FiInstagram, FiFacebook, FiGlobe } from "react-icons/fi";
import { bbr_SOCIAL } from "../data/content";

type SocialPlatform = (typeof bbr_SOCIAL)[number]["platform"];

const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  instagram: FiInstagram,
  facebook: FiFacebook,
  web: FiGlobe,
};

export function FollowJourneySection() {
  return (
    <section className="bbr-follow-section">
      <div className="bbr-follow-inner">
        <div className="bbr-follow-links-col">
          <p className="bbr-follow-title">Follow the Journey</p>
          <ul className="bbr-follow-links">
            {bbr_SOCIAL.map((s) => {
              const Icon = SOCIAL_ICONS[s.platform];
              return (
                <li key={s.platform}>
                  <a href={s.href} className="bbr-follow-link" target="_blank" rel="noopener noreferrer">
                    <Icon size={16} aria-hidden="true" />
                    <span>{s.handle}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="bbr-follow-tagline">
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
