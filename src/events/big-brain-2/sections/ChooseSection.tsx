import type { IconType } from "react-icons";
import { FiCompass, FiBookOpen, FiHeart, FiActivity, FiGift, FiStar, FiUsers } from "react-icons/fi";
import { BBR_CHOICES } from "../data/content";

type ChoiceIcon = (typeof BBR_CHOICES)[number]["icon"];

const ICONS: Record<ChoiceIcon, IconType> = {
  compass: FiCompass,
  book: FiBookOpen,
  heart: FiHeart,
  activity: FiActivity,
  gift: FiGift,
  award: FiStar,
  people: FiUsers,
};

interface ChooseSectionProps {
  onDonate: () => void;
}

export function ChooseSection({ onDonate }: ChooseSectionProps) {
  const featuredChoice = BBR_CHOICES.find((choice) => choice.icon === "compass");
  const gridChoices = BBR_CHOICES.filter((choice) => choice.icon !== "compass");

  return (
    <section className="bbr-choose-section">
      <div className="bbr-choose-inner">
        <div className="bbr-choose-header">
          <p className="bbr-choose-preamble">
            When faced with something you cannot change&hellip;
            <br />
            <span>Choose what you can.</span>
          </p>
        </div>
        <div className="bbr-choose-grid">
          {BBR_CHOICES.map((choice) => {
            const Icon = ICONS[choice.icon];
            return (
              <div key={choice.icon} className="bbr-choose-item">
                <Icon className="bbr-choose-icon" size={22} />
                <span className="bbr-choose-text">{choice.text}</span>
              </div>
            );
          })}
        </div>
        {featuredChoice ? (
          <div className="bb2-choose-featured">
            <div className="bb2-choose-item bb2-choose-item-featured">
              <FiCompass className="bb2-choose-icon" size={22} />
              <span className="bb2-choose-text">{featuredChoice.text}</span>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bbr-choose-banner">
        <button className="bbr-choose-banner-action" type="button" onClick={onDonate}>
          <FiHeart aria-hidden="true" /> Today, you can choose to donate.
        </button>
        <p className="bbr-choose-banner-text">
          Together, we&apos;re building the future of brain cancer research in New Zealand.
        </p>
      </div>
    </section>
  );
}
