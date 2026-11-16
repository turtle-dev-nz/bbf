import { CampaignLayout } from "../components/CampaignLayout";
import { useCampaignModals } from "../context/campaignModals";
import { BBR_FAQS } from "../data/content";
import "./FaqPage.css";

export function FaqPage() {
  return (
    <CampaignLayout>
      <FaqContent />
    </CampaignLayout>
  );
}

function FaqContent() {
  const { openContact, openDonate } = useCampaignModals();

  return (
    <section className="bbr-section">
      <div className="bbr-wrap bbr-wrap--narrow bbr-stack bbr-stack--lg">
        <div className="bbr-stack">
          <p className="bbr-eyebrow">Your questions</p>
          <h1 className="bbr-h1">Straight answers.</h1>
        </div>

        <div className="bbr-faq">
          {BBR_FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <div className="bbr-faq-ask">
          <div className="bbr-stack" style={{ gap: 6 }}>
            <h2 className="bbr-h3">Still got a question?</h2>
            <p className="bbr-body">We'll get back to you by email.</p>
          </div>
          <div className="bbr-actions">
            <button className="bbr-btn bbr-btn--white" type="button" onClick={() => openContact("question")}>
              Ask a question
            </button>
            <button className="bbr-btn" type="button" onClick={openDonate}>
              Back Sam
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
