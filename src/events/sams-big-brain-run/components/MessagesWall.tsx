import type { Supporter } from "../hooks/useCampaignStats";
import { useCampaignModals } from "../context/campaignModals";
import "./MessagesWall.css";

/** Public messages left with donations (via the Raisely webhook). */
export function MessagesWall({ messages }: { messages: Supporter[] }) {
  const { openDonate } = useCampaignModals();
  const withText = messages.filter((m) => m.message.trim().length > 0).slice(0, 9);

  return (
    <section className="bbr-section" aria-labelledby="bbr-messages-title">
      <div className="bbr-wrap bbr-stack bbr-stack--lg">
        <div className="bbr-messages-head">
          <h2 id="bbr-messages-title" className="bbr-h2">
            Messages for Sam
          </h2>
          {withText.length > 0 && <span className="bbr-muted">From the people backing him</span>}
        </div>

        {withText.length > 0 ? (
          <div className="bbr-messages-grid">
            {withText.map((m, i) => (
              <figure className="bbr-message" key={`${m.createdAt}-${i}`}>
                <blockquote>“{m.message}”</blockquote>
                <figcaption>{m.name}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="bbr-placeholder bbr-messages-empty">
            <p>Leave Sam a message when you donate and it'll show up here.</p>
            <button className="bbr-btn bbr-btn--sm" type="button" onClick={openDonate}>
              Back Sam
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
