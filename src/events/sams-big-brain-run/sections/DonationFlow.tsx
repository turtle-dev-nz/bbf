import { FiLock } from "react-icons/fi";
import btsLogo from "../../../assets/campaigns/bigBrainRun/sponsors/brain-tumour-support-logo.png";
import nanosLogo from "../../../assets/campaigns/bigBrainRun/sponsors/nano-logo.png";
import { BBR_DONATION_FLOW } from "../data/content";
import "./DonationFlow.css";

interface DonationFlowProps {
  /** "light" sits on cream/white sections, "dark" on the ink panels. */
  tone?: "light" | "dark";
  /** Optional heading; omit when the surrounding section already has one. */
  title?: string;
}

const LOGOS: Record<string, string | undefined> = { bts: btsLogo, nanos: nanosLogo };

/** Raisely → Brain Tumour Support NZ → NANOS, so donors can see who handles their money. */
export function DonationFlow({ tone = "light", title }: DonationFlowProps) {
  return (
    <div className={`bbr-flow bbr-flow--${tone}`}>
      {title && <h3 className="bbr-flow-title">{title}</h3>}
      <ol className="bbr-flow-steps">
        {BBR_DONATION_FLOW.map((step) => {
          const logo = LOGOS[step.id];
          return (
            <li className="bbr-flow-step" key={step.id}>
              <span className="bbr-flow-mark" aria-hidden="true">
                {logo ? <img src={logo} alt="" /> : <FiLock size={22} />}
              </span>
              <span className="bbr-flow-text">
                {step.href ? (
                  <a className="bbr-flow-name" href={step.href} target="_blank" rel="noopener noreferrer">
                    {step.name}
                  </a>
                ) : (
                  <span className="bbr-flow-name">{step.name}</span>
                )}
                <span className="bbr-flow-role">{step.role}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
