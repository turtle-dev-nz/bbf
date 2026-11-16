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
          25 consecutive ultramarathons down New Zealand's North Island to help give NZ's brain tumour registry a
          running start.
        </p>
        <div className="cta-row">
          <Button href="/sams-big-brain-run">Learn More</Button>
        </div>
      </div>
    </CampaignCard>
  );
}
