import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { ROUTES } from "../../../app/routes";
import { CampaignLayout } from "../components/CampaignLayout";
import { useCampaignModals } from "../context/campaignModals";
import { BBR_GEORGIE } from "../data/content";
import georgieFamily from "../../../assets/campaigns/bigBrainRun/georgie-family.webp";
import "./GeorgiesStoryPage.css";

export function GeorgiesStoryPage() {
  return (
    <CampaignLayout>
      <GeorgieContent />
    </CampaignLayout>
  );
}

function GeorgieContent() {
  const { openDonate } = useCampaignModals();

  return (
    <article className="bbr-georgie-page">
      <div className="bbr-georgie-page-inner">
        <Link to={ROUTES.samsBigBrainRun} className="bbr-georgie-back">
          <FiArrowLeft size={14} aria-hidden="true" />
          Back to Sam&apos;s run
        </Link>

        <p className="bbr-eyebrow">Georgie&apos;s story</p>
        <h1 className="bbr-georgie-title">
          In her
          <br />
          own words
        </h1>

        <p className="bbr-georgie-context">{BBR_GEORGIE.context}</p>

        <blockquote className="bbr-pull-quote">{BBR_GEORGIE.pullQuote}</blockquote>

        <figure className="bbr-georgie-figure">
          <img className="bbr-georgie-image" src={georgieFamily} alt="Georgie with her family" />
        </figure>

        <div className="bbr-georgie-body">
          {BBR_GEORGIE.paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <blockquote className="bbr-pull-quote bbr-georgie-second-quote">{BBR_GEORGIE.secondQuote}</blockquote>

        <div className="bbr-georgie-cta-block">
          <p>
            Georgie&apos;s story is why the family started. Sam&apos;s run supports NANOS&apos;s work to develop a
            brain tumour registry here in New Zealand.
          </p>
          <button className="bbr-btn" type="button" onClick={openDonate}>
            Back Sam →
          </button>
        </div>
      </div>
    </article>
  );
}
