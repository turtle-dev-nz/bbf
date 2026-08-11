import { BBR_CAMPAIGN } from "../data/content";
import "./HeroSection.css";

export function HeroSection() {
  return (
    <section className="bbr-hero">
      <div className="bbr-hero-inner">
        {/* <p className="bbr-hero-eyebrow">{BBR_CAMPAIGN.eyebrow}</p> */}

        <h1 className="bbr-hero-title">
          Every step south funds New Zealand's
          <br />
          <em>{" First brain tumour registry."}</em>
        </h1>

        <div className="bbr-hero-desc">{BBR_CAMPAIGN.description}</div>
      </div>
    </section>
  );
}
