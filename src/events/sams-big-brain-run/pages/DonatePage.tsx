import { Link } from "react-router-dom";
import { ROUTES } from "../../../app/routes";
import { CampaignLayout } from "../components/CampaignLayout";
import { SupporterCard } from "../components/SupporterCard";
import { MessagesWall } from "../components/MessagesWall";
import { NoBrainer } from "../components/NoBrainer";
import { DocumentarySection } from "../sections/DocumentarySection";
import { StatsGrid } from "../sections/StatsGrid";
import { useCampaignModals } from "../context/campaignModals";
import { useCampaignStats } from "../hooks/useCampaignStats";
import { BBR_FACTS, BBR_REGISTRY_POINTS, BBR_WHY_SAM_RUNS } from "../data/content";
import samPortrait from "../../../assets/campaigns/bigBrainRun/sam-hero.jpeg";
import "./DonatePage.css";

export function DonatePage() {
  return (
    <CampaignLayout>
      <DonateContent />
    </CampaignLayout>
  );
}

function DonateContent() {
  const stats = useCampaignStats();
  const { openDonate, openStory } = useCampaignModals();
  const km = BBR_FACTS.distanceKm.toLocaleString("en-NZ");

  return (
    <>
      {/* HERO */}
      <section className="bbr-donate-hero">
        <div className="bbr-wrap bbr-donate-hero-inner">
          <div className="bbr-donate-hero-copy bbr-stack">
            <p className="bbr-donate-hero-eyebrow">
              {BBR_FACTS.when} · {BBR_FACTS.start} to {BBR_FACTS.finish}
            </p>
            <h1 className="bbr-donate-hero-title">Back Sam.</h1>
            <NoBrainer size="lg" tone="light" />
            <p className="bbr-donate-hero-sub">
              {BBR_FACTS.ultras} ultramarathons in {BBR_FACTS.days} days.
              <br />
              Every dollar goes to NANOS.
            </p>
            <p className="bbr-donate-hero-body">
              Sam's running the length of the North Island to give New Zealand's brain tumour registry a running start.
            </p>
          </div>
          <div className="bbr-donate-hero-card">
            <SupporterCard stats={stats} />
          </div>
        </div>
      </section>

      {/* WHY SAM RUNS */}
      <section className="bbr-section" aria-labelledby="bbr-why-title">
        <div className="bbr-wrap bbr-split">
          <img className="bbr-why-photo" src={samPortrait} alt="Sam" loading="lazy" />
          <div className="bbr-stack">
            <p className="bbr-eyebrow">Why Sam runs</p>
            <h2 id="bbr-why-title" className="bbr-h2">
              {BBR_WHY_SAM_RUNS.heading}
            </h2>
            {BBR_WHY_SAM_RUNS.paragraphs.map((p) => (
              <p className="bbr-body" key={p}>
                {p}
              </p>
            ))}
            <div className="bbr-actions">
              <button className="bbr-btn bbr-btn--dark" type="button" onClick={openStory}>
                Sam's story →
              </button>
              <Link className="bbr-btn bbr-btn--ghost" to={ROUTES.georgiesStory}>
                Georgie's story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="bbr-section--tight bbr-section--rule">
        <div className="bbr-wrap bbr-numbers">
          <div className="bbr-stat">
            <span className="bbr-stat-value">{BBR_FACTS.ultras}</span>
            <p className="bbr-stat-label">ultramarathons</p>
          </div>
          <div className="bbr-stat">
            <span className="bbr-stat-value">{BBR_FACTS.days}</span>
            <p className="bbr-stat-label">days in a row</p>
          </div>
          <div className="bbr-stat">
            <span className="bbr-stat-value">~{km}</span>
            <p className="bbr-stat-label">kilometres</p>
          </div>
          <div className="bbr-stat">
            <span className="bbr-stat-value">1</span>
            <p className="bbr-stat-label">family behind him</p>
          </div>
        </div>
      </section>

      <DocumentarySection />

      {/* WHY IT MATTERS */}
      <section className="bbr-section bbr-section--mid" aria-labelledby="bbr-matters-title">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <div className="bbr-stack">
            <p className="bbr-eyebrow">Why it matters</p>
            <h2 id="bbr-matters-title" className="bbr-h2">
              Brain tumours can affect anyone, at any age.
            </h2>
          </div>
          <StatsGrid />

          <div className="bbr-registry-panel">
            <div className="bbr-stack">
              <h3 className="bbr-h3">What your donation helps build</h3>
              <p className="bbr-body">
                NANOS, the New Zealand Aotearoa Neuro-Oncology Society, is working to develop a national brain tumour
                registry: better information about people diagnosed here, brought together in one place.
              </p>
              <Link className="bbr-text-link" to={ROUTES.registry}>
                More about the registry →
              </Link>
            </div>
            <ul className="bbr-registry-points">
              {BBR_REGISTRY_POINTS.map((pt) => (
                <li key={pt.title}>
                  <strong>{pt.title}</strong> {pt.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MessagesWall messages={stats.recent} />

      {/* TAGLINE BAND + FINAL ASK */}
      <section className="bbr-tagline-band" aria-labelledby="bbr-final-title">
        <div className="bbr-wrap bbr-stack bbr-center">
          <NoBrainer size="xl" as="h2" />
          <p id="bbr-final-title">
            Sam's running about {km} km. All you have to do is back him. Every donation goes to NANOS to help get the
            registry moving.
          </p>
          <div className="bbr-actions" style={{ justifyContent: "center" }}>
            <button className="bbr-btn bbr-btn--white bbr-btn--lg" type="button" onClick={openDonate}>
              Back Sam — donate
            </button>
          </div>
          <Link className="bbr-final-faq" to={ROUTES.faq}>
            Questions about your donation? Read the FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
