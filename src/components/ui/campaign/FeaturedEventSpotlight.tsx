import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./FeaturedEventSpotlight.css";

interface SpotlightStat {
  value: string;
  label: string;
}

interface FeaturedEventSpotlightProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  badgeSrc?: string;
  badgeAlt?: string;
  stats?: SpotlightStat[];
  tag?: string;
}

export function FeaturedEventSpotlight({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  badgeSrc,
  badgeAlt,
  stats,
  tag = "Active campaign",
}: FeaturedEventSpotlightProps) {
  return (
    <div className="featured-spotlight">
      <div className="featured-spotlight__media">
        {badgeSrc && <img src={badgeSrc} alt={badgeAlt ?? ""} className="spotlight-badge" />}
        <div className="spotlight-image-wrapper">
          <img src={imageSrc} alt={imageAlt} className="spotlight-image" />
        </div>
      </div>

      <div className="featured-spotlight__content">
        <span className="spotlight-tag">{tag}</span>
        <h3 className="spotlight-title">{title}</h3>
        <p className="spotlight-description">{description}</p>

        {stats && stats.length > 0 && (
          <div className="featured-stats">
            {stats.map((stat) => (
              <div className="featured-stat" key={stat.label}>
                <strong className="featured-stat__value">{stat.value}</strong>
                <span className="featured-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="spotlight-actions">
          <Button href={href}>View campaign</Button>
        </div>
      </div>
    </div>
  );
}
