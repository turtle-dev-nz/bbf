import CampaignCard from "../CampaignCard";
import "./BigBrainRunCard.css";
import samRunningHero from "../../../../assets/campaigns/bigBrainRun/sam-running-hero.webp";
import samBigBrainBadge from "../../../../assets/campaigns/bigBrainRun/sams-bigbrainrun27-badge-ochre.webp";
import { Button } from "../Button";

export default function BigBrainRunCard() {
  return (
    <CampaignCard>
      <img src={samBigBrainBadge} alt="Sam's Big Brain Run Badge" className="campaign-badge" />
      <div className="campaign-image-wrapper">
        <img src={samRunningHero} alt="Sam's Big Brain Run" className="campaign-image" />
      </div>

      <div className="campaign-body">
        <p>
          25 consecutive ultra-marathons down New Zealand's North Island to raise awareness and funding to build NZ's
          first brain tumour registry.
        </p>
        <div className="cta-row">
          <Button href="/events/sams-big-brain-run">Learn More</Button>
        </div>
      </div>
    </CampaignCard>
  );
}
