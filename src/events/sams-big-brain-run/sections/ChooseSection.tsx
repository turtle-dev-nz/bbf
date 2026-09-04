import type { IconType } from "react-icons";
import { FiBookOpen, FiHeart, FiActivity, FiGift, FiStar, FiUsers } from "react-icons/fi";

import { FaRunning } from "react-icons/fa";
import { BBR_CHOICES } from "../data/content";
import "./ChooseSection.css";
import { BBRButton } from "../../../components/ui/campaign/samsBigBrainRun/BBRButton";

type ChoiceIcon = (typeof BBR_CHOICES)[number]["icon"];

const ICONS: Record<ChoiceIcon, IconType> = {
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
  const featuredChoice = { icon: "compass", text: "Sam chooses to run." };

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
        <div className="bbr-choose-featured">
          <div className="bbr-choose-item bbr-choose-item-featured">
            <FaRunning className="bbr-choose-icon" size={22} />
            <span className="bbr-choose-text">{featuredChoice.text}</span>
          </div>
        </div>
        <div className="bbr-choose-cta">
          <span className="bbr-choose-text">Today, you can choose</span>
          <BBRButton size="sm" onClick={onDonate}>
            to donate
          </BBRButton>
        </div>
      </div>
    </section>
  );
}
