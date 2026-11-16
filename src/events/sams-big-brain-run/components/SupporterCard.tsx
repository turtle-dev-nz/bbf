import { useCampaignModals } from "../context/campaignModals";
import { timeAgo, type CampaignStats } from "../hooks/useCampaignStats";
import { BBR_MONEY_LINE } from "../data/content";
import "./SupporterCard.css";

interface SupporterCardProps {
  stats: CampaignStats & { isLoading: boolean; failed: boolean };
}

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-NZ");

function initialOf(name: string) {
  const ch = name.trim().charAt(0);
  return ch ? ch.toUpperCase() : "♥";
}

/** People-first progress: supporter count and latest backers, dollars second. */
export function SupporterCard({ stats }: SupporterCardProps) {
  const { openDonate } = useCampaignModals();
  const latest = stats.recent.slice(0, 3);
  const hasCount = stats.supporterCount !== null;

  return (
    <aside className="bbr-supporters" aria-label="Campaign progress">
      {stats.isLoading ? (
        <div className="bbr-supporters-skeleton" role="status" aria-label="Loading supporters">
          <span />
          <span />
        </div>
      ) : hasCount ? (
        <div className="bbr-supporters-count">
          <span className="bbr-supporters-number">{stats.supporterCount!.toLocaleString("en-NZ")}</span>
          <span className="bbr-supporters-label">
            {stats.supporterCount === 1 ? "person is backing Sam" : "people are backing Sam"}
          </span>
        </div>
      ) : (
        <div className="bbr-supporters-count">
          <span className="bbr-supporters-label">Be one of the first to back Sam</span>
        </div>
      )}

      {latest.length > 0 && (
        <ul className="bbr-supporters-list" aria-label="Latest supporters">
          {latest.map((s, i) => (
            <li key={`${s.createdAt}-${i}`}>
              <span className="bbr-supporters-avatar" aria-hidden="true">
                {initialOf(s.name)}
              </span>
              <span className="bbr-supporters-name">
                <strong>{s.name}</strong> backed Sam
              </span>
              <span className="bbr-supporters-when">{timeAgo(s.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}

      {!stats.isLoading && !stats.failed && stats.total > 0 && (
        <p className="bbr-supporters-total">
          <strong>{fmt(stats.total)}</strong> raised for NANOS so far
        </p>
      )}

      <button className="bbr-btn bbr-btn--lg bbr-btn--block" type="button" onClick={openDonate}>
        Back Sam — donate
      </button>
      <p className="bbr-supporters-note">{BBR_MONEY_LINE} · Secure payment via Raisely</p>
    </aside>
  );
}
