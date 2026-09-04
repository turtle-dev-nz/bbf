// import { Link } from "react-router-dom";
// import { ROUTES } from "../app/routes";
import "./Hero.css";
import { FeaturedEventSpotlight } from "../components/ui/campaign/FeaturedEventSpotlight";
import { ROUTES } from "../app/routes";
import samRunningHero from "../assets/campaigns/bigBrainRun/sam-running-hero.webp";
import samBigBrainBadge from "../assets/campaigns/bigBrainRun/sams-bigbrainrun27-badge-ochre.webp";

const bigBrainRunStats = [
  { value: "25", label: "Ultra-marathons" },
  { value: "North Island", label: "Route" },
  { value: "NZ's first", label: "Brain tumour registry" },
];

const Hero = () => {
  return (
    <section className="home-hero" id="home">
      <div className="container home-hero__inner">
        <div className="home-hero__copy">
          <h1>
            Connecting people, research and communities to <span>improve brain health across New Zealand.</span>
          </h1>
          {/* <div className="home-actions">
            <Link className="home-button home-button--primary" to={ROUTES.samsBigBrainRun}>
              View Sam&apos;s Big Brain Run
            </Link>
            <a className="home-button home-button--secondary" href="#campaigns">
              Explore campaigns
            </a>
          </div> */}
        </div>

        <div className="home-hero__support" id="campaigns">
          <p className="home-eyebrow">Featured event</p>
          <FeaturedEventSpotlight
            title="Sam's Big Brain Run"
            description="25 consecutive ultra-marathons down New Zealand's North Island to raise awareness and funding to build NZ's first brain tumour registry."
            href={ROUTES.samsBigBrainRun}
            imageSrc={samRunningHero}
            imageAlt="Sam running through New Zealand's North Island"
            badgeSrc={samBigBrainBadge}
            badgeAlt="Sam's Big Brain Run 2027 badge"
            stats={bigBrainRunStats}
            tag="Active campaign"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
