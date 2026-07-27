import "./Campaign.css";
import BigBrainRunCard from "../components/ui/campaign/samsBigBrain/BigBrainRunCard";

const Campaign = () => {
  return (
    <section className="home-section container" id="campaigns">
      <div className="campaign-wrapper">
        <p className="home-eyebrow">Campaigns</p>
        <div className="campaigns">
          <BigBrainRunCard />
        </div>
      </div>
    </section>
  );
};
export default Campaign;
