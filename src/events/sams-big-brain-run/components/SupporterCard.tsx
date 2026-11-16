import { useCampaignModals } from "../context/campaignModals";
import { supporterKey, timeAgo, type CampaignStats } from "../hooks/useCampaignStats";
import { usePrefersReducedMotion } from "../hooks/motion";
import { useFlipList } from "../hooks/useFlipList";
import { Odometer } from "./Odometer";
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
  const reduced = usePrefersReducedMotion();
  const { listRef, itemRef } = useFlipList<HTMLUListElement, HTMLLIElement>(latest.map(supporterKey), reduced);

  return (
    <aside className="bbr-supporters" aria-label="Campaign progress">
      {stats.isLoading ? (
        <div className="bbr-supporters-skeleton" role="status" aria-label="Loading supporters">
          <span />
          <span />
        </div>
      ) : hasCount ? (
        <div className="bbr-supporters-count">
          <Odometer className="bbr-supporters-number" value={stats.supporterCount!.toLocaleString("en-NZ")} />
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
        <ul ref={listRef} className="bbr-supporters-list" aria-label="Latest supporters" aria-live="polite">
          {latest.map((s) => (
            <li key={supporterKey(s)} ref={itemRef(supporterKey(s))}>
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
