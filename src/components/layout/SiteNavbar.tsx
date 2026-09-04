import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import bigbrainLogo from "../../assets/bigbrain-logo-dk_bg-web.webp";
import "./SiteLayout.css";

export function SiteNavbar() {
  return (
    <header className="site-nav">
      <div className="container site-nav__inner">
        <Link className="site-nav__brand" to={ROUTES.home}>
          <img src={bigbrainLogo} alt="Big Brain Foundation logo" />
          <span>Big Brain Foundation</span>
        </Link>

        <nav className="site-nav__links" aria-label="Site navigation">
          <a className="site-nav__link" href="#mission">
            Mission
          </a>
          <a className="site-nav__link" href="#campaigns">
            Campaigns
          </a>
          <Link className="site-nav__button" to={ROUTES.samsBigBrainRun}>
            Sam&apos;s Run
          </Link>
        </nav>
      </div>
    </header>
  );
}
