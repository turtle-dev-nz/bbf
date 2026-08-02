import { useScrollPosition } from "../../../hooks/useScrollPosition";

interface DonationNavProps {
  onOpenModal: () => void;
}

export function DonationNav({ onOpenModal }: DonationNavProps) {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 60;

  return (
    <nav className={`bb2-nav${isScrolled ? " scrolled" : ""}`}>
      <div className="bb2-nav-inner">
        <a className="bb2-nav-brand" href="#">
          {/* <img className="bb2-nav-badge" src={navBadge} alt="Sam's Big Brain Run badge" /> */}
          <span className="bb2-nav-marquee">
            <span className="bb2-nav-marquee-accent">Sam&apos;s</span> Big Brain Run
          </span>
          <span className="bb2-visually-hidden">Sam&apos;s Big Brain Run</span>
        </a>
        <button className="bb2-nav-cta" onClick={onOpenModal} type="button">
          Donate Now
        </button>
      </div>
    </nav>
  );
}
