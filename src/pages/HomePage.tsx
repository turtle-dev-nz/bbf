import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ROUTES } from "../app/routes";
import bigbrainLogo from "../assets/bigbrain-logo-dk_bg-web.webp";
import { Navbar, type NavbarLink } from "../components/layout/Navbar";
import { SiteFooter } from "../components/layout/SiteFooter";
import "./HomePage.css";

const homeNavLinks: NavbarLink[] = [
  { label: "Home", id: "home" },
  { label: "Mission", id: "mission" },
  { label: "Campaigns", id: "campaigns" },
];

export function HomePage() {
  return (
    <div className="home-page">
      <Navbar
        logoSrc={bigbrainLogo}
        logoAlt="Big Brain Foundation logo"
        homeHref="#home"
        ariaLabel="Homepage navigation"
        mobileMenuId="home-mobile-navigation"
        navLinks={homeNavLinks}
        primaryAction={{ label: "Sam's Run", href: ROUTES.samBigBrainRun }}
      />

      <main className="home-page__main">
        <section className="home-hero" id="home">
          <div className="container home-hero__inner">
            <div className="home-hero__copy">
              <p className="home-eyebrow">Foundation home</p>
              <h1>Big Brain Foundation</h1>
              <p>
                A clearer home for the foundation, with campaigns and fundraising experiences living as dedicated routes
                instead of being embedded in the app entry file.
              </p>
              <div className="home-actions">
                <Link className="home-button home-button--primary" to={ROUTES.samBigBrainRun}>
                  View Sam&apos;s Big Brain Run
                </Link>
                <a className="home-button home-button--secondary" href="#campaigns">
                  Explore campaigns
                </a>
              </div>
            </div>

            <div className="home-hero__panel">
              <div className="home-hero__stats">
                <div>
                  <strong>01</strong>
                  <span>Live campaign route scaffold</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Shared theme tokens</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>Future event expansion</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section" id="mission">
          <div className="container home-section__inner">
            <div className="home-section__intro">
              <p className="home-eyebrow">Structure first</p>
              <h2>Use the homepage as the front door</h2>
              <p>
                Keep the foundation story, mission, and campaign directory here. Each major campaign can then have its
                own layout, pacing, and styling without fighting the rest of the site.
              </p>
            </div>

            <ul className="home-pillars">
              <li>
                <h3>Foundation overview</h3>
                <p>High-level messaging, values, and credibility content can live here.</p>
              </li>
              <li>
                <h3>Campaign directory</h3>
                <p>Feature active and past initiatives without turning the homepage into a microsite.</p>
              </li>
              <li>
                <h3>Reusable building blocks</h3>
                <p>Keep buttons, cards, and layout primitives shared across all pages.</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="home-section" id="campaigns">
          <div className="container home-section__inner">
            <div className="home-section__intro">
              <p className="home-eyebrow">Featured campaigns</p>
              <h2>Campaigns should be their own pages</h2>
              <p>
                This keeps route-level concerns, section styling, and campaign-specific navigation isolated and easier
                to maintain.
              </p>
            </div>

            <div className="home-campaign-grid">
              <article className="home-card">
                <span className="home-card__meta">Active campaign</span>
                <h3>Sam&apos;s Big Brain Run</h3>
                <p>
                  Dedicated landing page scaffold for the run, sponsorship information, story, and fundraising calls to
                  action.
                </p>
                <Link className="home-card__link" to={ROUTES.samBigBrainRun}>
                  Open campaign page <FiArrowRight aria-hidden="true" />
                </Link>
              </article>

              <article className="home-card">
                <span className="home-card__meta">Future slot</span>
                <h3>Next foundation campaign</h3>
                <p>Reserved placeholder for another event or fundraising experience when you are ready to add it.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
