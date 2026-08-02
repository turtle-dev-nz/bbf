import type { IconType } from "react-icons";
import { FiCompass, FiBookOpen, FiHeart, FiActivity, FiGift, FiStar } from "react-icons/fi";
import { BB2_CHOICES } from "../data/content";

type ChoiceIcon = (typeof BB2_CHOICES)[number]["icon"];

const ICONS: Record<ChoiceIcon, IconType> = {
  compass: FiCompass,
  book: FiBookOpen,
  heart: FiHeart,
  activity: FiActivity,
  gift: FiGift,
  award: FiStar,
};

interface ChooseSectionProps {
  onDonate: () => void;
}

export function ChooseSection({ onDonate }: ChooseSectionProps) {
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
          {BB2_CHOICES.map((choice) => {
            const Icon = ICONS[choice.icon];
            return (
              <div key={choice.icon} className="bb2-choose-item">
                <Icon className="bb2-choose-icon" size={22} />
                <span className="bb2-choose-text">{choice.text}</span>
              </div>
            );
          })}
        </div>
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
