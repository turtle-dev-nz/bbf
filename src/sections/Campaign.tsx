import "./Campaign.css";
import { FeaturedEventSpotlight } from "../components/ui/campaign/FeaturedEventSpotlight";
import { ROUTES } from "../app/routes";
import samRunningHero from "../assets/campaigns/bigBrainRun/sam-running-hero.webp";
import samBigBrainBadge from "../assets/campaigns/bigBrainRun/sams-bigbrainrun27-badge-ochre.webp";

const bigBrainRunStats = [
  { value: "25", label: "Ultra-marathons" },
  { value: "North Island", label: "Route" },
  { value: "NZ's first", label: "Brain tumour registry" },
];

const Campaign = () => {
  return (
    <section className="home-section" id="campaigns">
      <div className="container featured-section">
        <p className="home-eyebrow">Featured event</p>
        {/* Future events grid sits below this spotlight */}
        <FeaturedEventSpotlight
          title="Sam's Big Brain Run"
          description="25 consecutive ultra-marathons down New Zealand's North Island to raise awareness and funding to build NZ's first brain tumour registry."
          href={ROUTES.bigBrain2}
          imageSrc={samRunningHero}
          imageAlt="Sam running through New Zealand's North Island"
          badgeSrc={samBigBrainBadge}
          badgeAlt="Sam's Big Brain Run 2027 badge"
          stats={bigBrainRunStats}
          tag="Active campaign"
        />
      </div>
    </section>
  );
};
export default Campaign;
