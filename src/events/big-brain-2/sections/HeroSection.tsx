import { useEffect, useRef, useState } from "react";
import { BBR_CAMPAIGN, BBR_CURRENT_PHASE_INDEX, BBR_PHASES } from "../data/content";
import "./HeroSection.css";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [displayRaised, setDisplayRaised] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [phasesOpen, setPhasesOpen] = useState(false);
  const rafId = useRef<number | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!phasesOpen) return;
    const id = setTimeout(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.bottom - window.innerHeight, behavior: "smooth" });
    }, 150); // wait for the 0.38s grid transition to finish
    return () => clearTimeout(id);
  }, [phasesOpen]);

  const currentPhase = BBR_PHASES[BBR_CURRENT_PHASE_INDEX];
  const phasePct = Math.min((BBR_CAMPAIGN.raised / currentPhase.goal) * 100, 100);

  useEffect(() => {
    let cancelled = false;

    setDisplayRaised(0);
    setProgressWidth(0);

    const timeout = setTimeout(() => {
      if (cancelled) return;
      setProgressWidth(phasePct);

      const start = performance.now();
      const duration = 1200;
      const target = BBR_CAMPAIGN.raised;

      const step = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplayRaised(Math.round(eased * target));
        if (p < 1) {
          rafId.current = requestAnimationFrame(step);
          return;
        }
        setDisplayRaised(target);
      };
      rafId.current = requestAnimationFrame(step);
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [phasePct]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-NZ");

  return (
    <section className="bbr-hero" ref={sectionRef}>
      <div className="bbr-hero-inner">
        {/* <p className="bbr-hero-eyebrow">{BBR_CAMPAIGN.eyebrow}</p> */}

        <h1 className="bbr-hero-title">
          Every step south funds New Zealand's
          <br />
          <em>{" First brain tumour registry."}</em>
        </h1>

        <p className="bbr-hero-desc">{BBR_CAMPAIGN.description}</p>

        <div className="bbr-fund-widget">
          {/* ── Top: metrics ── */}
          <div className="bbr-fund-top">
            <p className="bbr-fund-widget-title">Help Build the Foundation</p>
            {/* <p className="bbr-fund-phase-eyebrow">Current Phase</p> */}
            <p className="bbr-fund-phase-name">
              <strong>
                Phase {currentPhase.number} · {currentPhase.name}
              </strong>
              {/* <span className="bbr-fund-phase-goal">{fmt(currentPhase.goal)} Goal</span> */}
            </p>
            <div className="bbr-fund-bar-wrap">
              <div className="bbr-progress-track">
                <div className="bbr-progress-fill" style={{ width: `${progressWidth}%` }} />
              </div>
            </div>
            <div className="bbr-fund-amounts">
              <span className="bbr-fund-raised">
                {fmt(displayRaised)} <em>Raised</em>
              </span>
              <span className="bbr-fund-goal-label">{fmt(currentPhase.goal)}</span>
            </div>
            <p className="bbr-fund-body-desc">
              Every contribution helps lay the foundation for New Zealand's first brain tumour registry.
            </p>
          </div>

          {/* ── Bottom: phases toggle ── */}
          <div className="bbr-phases-section">
            <button
              className={`bbr-phases-toggle${phasesOpen ? " open" : ""}`}
              type="button"
              aria-expanded={phasesOpen}
              onClick={() => setPhasesOpen((v) => !v)}
            >
              <span>Phases</span>
              <span className="bbr-phase-chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            <div className={`bbr-phases-list-wrap${phasesOpen ? " open" : ""}`}>
              <div>
                <div className="bbr-phases-list">
                  {BBR_PHASES.map((phase) => {
                    const isCurrent = phase.number === currentPhase.number;
                    return (
                      <div key={phase.number} className={`bbr-phase-row${isCurrent ? " current" : ""}`}>
                        <div className="bbr-phase-btn">
                          <span className="bbr-phase-num">{phase.number}</span>
                          <div className="bbr-phase-info">
                            <span className="bbr-phase-tag">
                              Phase {phase.number} · {phase.name}
                            </span>
                            <span className="bbr-phase-amount">{fmt(phase.goal)}</span>
                          </div>
                        </div>
                        <p className="bbr-phase-desc">{phase.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bbr-hero-cta-row" ref={ctaRef}>
          <button className="bbr-hero-cta" onClick={onOpenModal} type="button">
            Make a Donation &nbsp;→
          </button>
        </div>
      </div>
    </section>
  );
}
