import { FiFacebook, FiInstagram } from "react-icons/fi";
import { CampaignLayout } from "../components/CampaignLayout";
import { useCampaignModals } from "../context/campaignModals";
import { BBR_FACTS, BBR_SOCIAL } from "../data/content";
import "./FollowPage.css";

/**
 * Placeholder until the run starts in January. Live tracking slots in here once
 * the Garmin data is available (see LiveDashboardPage for the data side).
 */
export function FollowPage() {
  return (
    <CampaignLayout>
      <FollowContent />
    </CampaignLayout>
  );
}

function FollowContent() {
  const { openContact, openDonate } = useCampaignModals();

  return (
    <>
      <section className="bbr-page-hero">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <div className="bbr-stack">
            <p className="bbr-eyebrow">Follow Sam</p>
            <h1 className="bbr-h1">Live tracking starts in {BBR_FACTS.when.split(" ")[0]}.</h1>
            <p className="bbr-lead">
              When Sam sets off from {BBR_FACTS.start}, this page will show where he is, how far he's come and where
              he's headed next. Until then, follow the build-up on social.
            </p>
          </div>
          <div className="bbr-follow-live">
            <div className="bbr-placeholder bbr-follow-map">Live map and today's stage appear here during the run</div>
            <div className="bbr-follow-stats">
              <div className="bbr-card bbr-card--dark">
                <span className="bbr-follow-stat-label">Today</span>
                <span className="bbr-follow-stat-value">Day — of {BBR_FACTS.days}</span>
              </div>
              <div className="bbr-card bbr-card--dark">
                <span className="bbr-follow-stat-label">Distance so far</span>
                <span className="bbr-follow-stat-value">
                  — / {BBR_FACTS.distanceKm.toLocaleString("en-NZ")} km
                </span>
              </div>
              <div className="bbr-card bbr-card--dark">
                <span className="bbr-follow-stat-label">Next town</span>
                <span className="bbr-follow-stat-value">—</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bbr-section" aria-labelledby="bbr-social-title">
        <div className="bbr-wrap bbr-split">
          <div className="bbr-stack">
            <h2 id="bbr-social-title" className="bbr-h2">
              Follow the build-up
            </h2>
            <p className="bbr-body bbr-muted">Training, preparation and behind the scenes with the family and crew.</p>
          </div>
          <div className="bbr-follow-socials">
            {BBR_SOCIAL.map((s) => (
              <a key={s.platform} className="bbr-follow-social" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.platform === "instagram" ? (
                  <FiInstagram size={26} aria-hidden="true" />
                ) : (
                  <FiFacebook size={26} aria-hidden="true" />
                )}
                <span>
                  <span className="bbr-follow-social-platform">{s.platform}</span>
                  <span className="bbr-follow-social-handle">{s.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bbr-section bbr-section--mid" aria-labelledby="bbr-help-title">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <h2 id="bbr-help-title" className="bbr-h2">
            Ways to get involved
          </h2>
          <div className="bbr-grid">
            <div className="bbr-card bbr-follow-way">
              <h3>Cheer from the roadside</h3>
              <p>Once the run starts, check this page to see when Sam's coming through your town.</p>
            </div>
            <div className="bbr-card bbr-follow-way">
              <h3>Be at the finish</h3>
              <p>Sam finishes in {BBR_FACTS.finish}. Finish-line details will be posted here closer to the time.</p>
            </div>
            <div className="bbr-card bbr-follow-way">
              <h3>Help the crew</h3>
              <p>A bed, a meal, a physio session or a washing machine along the route.</p>
              <button className="bbr-text-link bbr-follow-way-btn" type="button" onClick={() => openContact("host")}>
                Offer help →
              </button>
            </div>
            <div className="bbr-card bbr-follow-way">
              <h3>Join Sam for a stretch</h3>
              <p>For safety, only a small number of people will run with Sam, by arrangement.</p>
              <button className="bbr-text-link bbr-follow-way-btn" type="button" onClick={() => openContact("join")}>
                Ask to join →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bbr-section--tight">
        <div className="bbr-wrap bbr-follow-cta">
          <div className="bbr-stack">
            <h2 className="bbr-h3">Questions or media enquiries?</h2>
            <div className="bbr-actions">
              <button className="bbr-btn bbr-btn--ghost bbr-btn--sm" type="button" onClick={() => openContact("general")}>
                Get in touch
              </button>
              <button className="bbr-btn bbr-btn--ghost bbr-btn--sm" type="button" onClick={() => openContact("media")}>
                Media enquiries
              </button>
            </div>
          </div>
          <div className="bbr-follow-donate">
            <p className="bbr-h3">Can't make it out there?</p>
            <button className="bbr-btn" type="button" onClick={openDonate}>
              Back Sam with a donation
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
