import type { IconType } from "react-icons";
import { FiCompass, FiBookOpen, FiHeart, FiActivity, FiGift, FiStar, FiUsers } from "react-icons/fi";
import { BB2_CHOICES } from "../data/content";
import "./ChooseSection.css";

type ChoiceIcon = (typeof BB2_CHOICES)[number]["icon"];

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
  const featuredChoice = BB2_CHOICES.find((choice) => choice.icon === "compass");
  const gridChoices = BB2_CHOICES.filter((choice) => choice.icon !== "compass");

  return (
    <section className="bb2-choose-section">
      <div className="bb2-choose-inner">
        <div className="bb2-choose-header">
          <p className="bb2-choose-preamble">
            When faced with something you cannot change&hellip;
            <br />
            <span>Choose what you can.</span>
          </p>
        </div>
        <div className="bb2-choose-grid">
          {gridChoices.map((choice) => {
            const Icon = ICONS[choice.icon];
            return (
              <div key={choice.icon} className="bb2-choose-item">
                <Icon className="bb2-choose-icon" size={22} />
                <span className="bb2-choose-text">{choice.text}</span>
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
      <div className="bb2-choose-banner">
        <button className="bb2-choose-banner-action" type="button" onClick={onDonate}>
          <FiHeart aria-hidden="true" /> Today, you can choose to donate.
        </button>
        <p className="bb2-choose-banner-text">
          Together, we&apos;re building the future of brain cancer research in New Zealand.
        </p>
      </div>
    </section>
  );
}
