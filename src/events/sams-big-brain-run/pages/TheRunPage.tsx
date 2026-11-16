import { CampaignLayout } from "../components/CampaignLayout";
import { RouteSection } from "../sections/RouteSection";
import { DocumentarySection } from "../sections/DocumentarySection";
import { SponsorsSection } from "../sections/SponsorsSection";
import { useCampaignModals } from "../context/campaignModals";
import { BBR_CREW, BBR_FACTS } from "../data/content";
import { ROUTE, ROUTE_TOTAL_KM } from "../data/route";
import "./TheRunPage.css";

export function TheRunPage() {
  return (
    <CampaignLayout>
      <TheRunContent />
    </CampaignLayout>
  );
}

function TheRunContent() {
  const { openContact, openDonate } = useCampaignModals();
  const avgKm = Math.round(ROUTE_TOTAL_KM / ROUTE.length);

  return (
    <>
      <section className="bbr-page-hero">
        <div className="bbr-wrap bbr-split">
          <div className="bbr-stack" style={{ flexGrow: 999 }}>
            <p className="bbr-eyebrow">The run</p>
            <h1 className="bbr-h1">The length of the North Island. On foot. In 25 days.</h1>
            <p className="bbr-lead">
              {BBR_FACTS.start} to {BBR_FACTS.finish}, {BBR_FACTS.when}. No matter the conditions, we keep moving.
            </p>
          </div>
          <div className="bbr-run-facts">
            <div className="bbr-card bbr-card--dark">
              <span className="bbr-run-fact-value">~{BBR_FACTS.distanceKm.toLocaleString("en-NZ")} km</span>
              <span className="bbr-run-fact-label">top to bottom</span>
            </div>
            <div className="bbr-card bbr-card--dark">
              <span className="bbr-run-fact-value">~{avgKm} km</span>
              <span className="bbr-run-fact-label">a day, on average</span>
            </div>
            <div className="bbr-card bbr-card--dark">
              <span className="bbr-run-fact-value">{BBR_FACTS.days}</span>
              <span className="bbr-run-fact-label">days in a row</span>
            </div>
            <div className="bbr-card bbr-card--dark">
              <span className="bbr-run-fact-value">1</span>
              <span className="bbr-run-fact-label">family behind him</span>
            </div>
          </div>
        </div>
      </section>

      <RouteSection />

      <DocumentarySection showRunLink={false} />

      <section className="bbr-section bbr-section--dark" aria-labelledby="bbr-crew-title">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <h2 id="bbr-crew-title" className="bbr-h2">
            The crew
          </h2>
          <div className="bbr-grid">
            {BBR_CREW.map((c, i) => (
              <div className="bbr-crew-card" key={i}>
                <div className="bbr-placeholder bbr-crew-photo">[Photo]</div>
                <div className="bbr-crew-body">
                  <span className="bbr-crew-name">{c.name}</span>
                  <span className="bbr-crew-role">{c.role}</span>
                  <span className="bbr-crew-bio">{c.bio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="sponsors">
        <SponsorsSection />
      </div>

      <section className="bbr-section--tight">
        <div className="bbr-wrap">
          <div className="bbr-run-support">
            <div className="bbr-stack">
              <h2 className="bbr-h3">Want to support the run?</h2>
              <p className="bbr-body bbr-muted">
                Gear, food, transport, accommodation or physio for Sam and the crew. Get in touch and we'll talk.
              </p>
            </div>
            <button className="bbr-btn bbr-btn--dark" type="button" onClick={() => openContact("sponsor")}>
              Get in touch
            </button>
          </div>
        </div>
      </section>

      <section className="bbr-section--tight bbr-section--accent">
        <div className="bbr-wrap bbr-run-band">
          <p className="bbr-h3">Not a business? You can still back Sam.</p>
          <button className="bbr-btn bbr-btn--white" type="button" onClick={openDonate}>
            Donate <span className="bbr-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </>
  );
}
