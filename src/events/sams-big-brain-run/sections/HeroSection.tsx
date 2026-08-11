import { FiMapPin } from "react-icons/fi";

export function HeroSection() {
  return (
    <section id="about" className="run-hero">
      <div className="container run-hero__grid">
        <div className="run-hero__content">
          <p className="run-eyebrow">Sam's Big Brain Run</p>
          {/* <h1>Sam&apos;s Big Brain Run</h1>
          <p className="run-hero__lede">
            Placeholder campaign landing page for the run, sponsorship outreach, story, and fundraising calls to action.
          </p> */}
          {/* <h1 className="run-hero__title">Every tep south funds NZ's first National Brain Tumour Registry.</h1> */}
          <h1>
            Every step south <br />
            funds <span className="run-hero__accent">NZ's first National Brain Tumour Registry.</span>
          </h1>
          <p className="run-hero__lede">
            In January 2027, Sam Saunt-Lord runs 25 consecutive ultramarathons down New Zealand's North Island - filmed
            for documentary, backed by leading Kiwi brands, and raising NZ$100k for brain cancer research.
          </p>
          <div className="run-actions">
            <a className="run-button run-button--primary" href="#contact">
              Donate Placeholder
            </a>
            <a className="run-button run-button--secondary" href="#partner">
              Partner Placeholder
            </a>
          </div>
        </div>

        <div className="run-hero__panel" aria-hidden="true">
          <div className="run-hero__route">
            <FiMapPin className="run-hero__route-icon" />
            <span>Route / visual placeholder</span>
          </div>
          <div className="run-hero__route-line"></div>
          <div className="run-hero__route-points">
            <span>Day 1</span>
            <span>Day 25</span>
          </div>
        </div>
      </div>
    </section>
  );
}
