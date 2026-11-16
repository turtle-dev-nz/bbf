import { Link } from "react-router-dom";
import { ROUTES } from "../../../app/routes";
import { CampaignLayout } from "../components/CampaignLayout";
import { NoBrainer } from "../components/NoBrainer";
import { StatsGrid } from "../sections/StatsGrid";
import { DonationFlow } from "../sections/DonationFlow";
import { useCampaignModals } from "../context/campaignModals";
import { BBR_GEORGIE, BBR_REGISTRY_CARE, BBR_REGISTRY_WHAT_IF } from "../data/content";
import georgieFamily from "../../../assets/campaigns/bigBrainRun/georgie-family.webp";
import "./RegistryPage.css";

export function RegistryPage() {
  return (
    <CampaignLayout>
      <RegistryContent />
    </CampaignLayout>
  );
}

function RegistryContent() {
  const { openDonate } = useCampaignModals();

  return (
    <>
      <section className="bbr-page-hero">
        <div className="bbr-wrap bbr-wrap--narrow bbr-stack">
          <p className="bbr-eyebrow">The registry</p>
          <h1 className="bbr-h1">Give the registry a running start.</h1>
          <p className="bbr-lead">
            NANOS, the New Zealand Aotearoa Neuro-Oncology Society, is working to develop a national brain tumour
            registry. Every dollar donated through Sam's run goes to that work.
          </p>
        </div>
      </section>

      <section className="bbr-section" aria-labelledby="bbr-reg-why">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <h2 id="bbr-reg-why" className="bbr-h2" style={{ maxWidth: "20ch" }}>
            Brain tumours can affect anyone, at any age, without warning.
          </h2>
          <StatsGrid />
          <p className="bbr-body">
            Much of the brain tumour research done in New Zealand leans on data from overseas registries, which don't
            reflect our population. A registry built here changes that.
          </p>
        </div>
      </section>

      <section className="bbr-section bbr-section--mid">
        <div className="bbr-wrap bbr-split" style={{ alignItems: "flex-start" }}>
          <div className="bbr-stack">
            <p className="bbr-eyebrow">The starting point</p>
            <h2 className="bbr-h3">Better information, brought together.</h2>
            <p className="bbr-body">
              The first goal is a strong clinical foundation: consistent, connected information about people diagnosed
              with brain tumours in New Zealand. It builds on the cancer data already collected here, and it's built in
              stages.
            </p>
          </div>
          <div className="bbr-stack">
            <p className="bbr-eyebrow">The ambition</p>
            <ul className="bbr-whatif">
              {BBR_REGISTRY_WHAT_IF.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bbr-section" aria-labelledby="bbr-reg-care">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <h2 id="bbr-reg-care" className="bbr-h2">
            Built with care
          </h2>
          <div className="bbr-grid">
            {BBR_REGISTRY_CARE.map((c) => (
              <div className="bbr-care" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bbr-section bbr-section--dark">
        <div className="bbr-wrap bbr-split">
          <img className="bbr-reg-georgie" src={georgieFamily} alt="Georgie with her family" loading="lazy" />
          <figure className="bbr-stack" style={{ margin: 0 }}>
            <p className="bbr-eyebrow">Why the family started</p>
            <blockquote className="bbr-reg-quote">{BBR_GEORGIE.pullQuote}</blockquote>
            <figcaption className="bbr-body">
              Georgie, Sam's cousin, lives with glioblastoma in the UK. Her story is why the family asked what they could
              do here at home.{" "}
              <Link className="bbr-text-link" to={ROUTES.georgiesStory}>
                Read her story <span className="bbr-arrow" aria-hidden="true">→</span>
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bbr-section bbr-section--mid" aria-labelledby="bbr-reg-flow">
        <div className="bbr-wrap bbr-stack bbr-stack--lg">
          <div className="bbr-stack">
            <p className="bbr-eyebrow">Where your money goes</p>
            <h2 id="bbr-reg-flow" className="bbr-h3">
              From your donation to the registry
            </h2>
          </div>
          <DonationFlow />
        </div>
      </section>

      <section className="bbr-section">
        <div className="bbr-wrap bbr-wrap--narrow bbr-stack bbr-center">
          <h2 className="bbr-h2">Something lasting, built here.</h2>
          <p className="bbr-lead bbr-muted">Sam's run lasts 25 days. What it helps start will last much longer.</p>
          <button className="bbr-btn bbr-btn--lg" type="button" onClick={openDonate}>
            Back Sam — donate
          </button>
          <NoBrainer size="lg" />
        </div>
      </section>
    </>
  );
}
