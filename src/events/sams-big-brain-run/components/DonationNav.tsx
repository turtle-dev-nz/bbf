import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { BBRButton } from "../../../components/ui/campaign/samsBigBrainRun/BBRButton";
import "./DonationNav.css";

interface DonationNavProps {
  onOpenModal: () => void;
}

export function DonationNav({ onOpenModal }: DonationNavProps) {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 60;

  return (
    <nav className={`bbr-nav${isScrolled ? " scrolled" : ""}`}>
      <div className="bbr-nav-inner">
        <a className="bbr-nav-brand" href="#">
          {/* <img className="bbr-nav-badge" src={navBadge} alt="Sam's Big Brain Run badge" /> */}
          <span className="bbr-nav-marquee">
            <span className="bbr-nav-marquee-accent">Sam&apos;s</span> Big Brain Run
          </span>
          <span className="bbr-visually-hidden">Sam&apos;s Big Brain Run</span>
        </a>
        <BBRButton size="sm" onClick={onOpenModal}>
          Donate Now
        </BBRButton>
      </div>
    </nav>
  );
}
