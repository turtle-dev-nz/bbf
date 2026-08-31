import bigbrainLogo from "../assets/bigbrain-logo-dk_bg-web.webp";
import { Navbar, type NavbarLink } from "../components/layout/Navbar";
import { SiteFooter } from "../components/layout/SiteFooter";
import "./HomePage.css";
import Hero from "../sections/Hero";
import Mission from "../sections/Mission";

const homeNavLinks: NavbarLink[] = [
  { label: "Home", id: "home" },
  { label: "Events", id: "campaigns" },
  { label: "Mission", id: "mission" },
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
        // primaryAction={{ label: "Sam's Run", href: ROUTES.samBigBrainRun }}
      />

      <main className="home-page__main">
        <Hero />
        <Mission />
        {/* <section className="home-section" id="campaigns">
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
        </section> */}
      </main>

      <SiteFooter />
    </div>
  );
}
