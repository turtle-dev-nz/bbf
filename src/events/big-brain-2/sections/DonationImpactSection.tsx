import { BBR_DONATION_IMPACT } from "../data/content";
import "./DonationImpactSection.css";

export function DonationImpactSection() {
  return (
    <section className="bbr-donation-impact-section">
      <div className="bbr-donation-impact-inner">
        <p className="bbr-section-label">Where Your Donation Goes</p>
        <ul className="bbr-donation-impact-list">
          {BBR_DONATION_IMPACT.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="bbr-donation-impact-copy">{BBR_DONATION_IMPACT.summary}</p>
        <p className="bbr-donation-impact-copy">
          By collecting better data in a single register, researchers will collectively improve treatments and outcomes
          for patients, their whānau (families), and future generations of New Zealanders.
        </p>
      </div>
    </section>
  );
}
