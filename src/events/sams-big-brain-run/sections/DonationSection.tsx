import { useEffect, useRef, useState } from "react";
import { BBR_CAMPAIGN, BBR_CURRENT_PHASE_INDEX, BBR_PHASES } from "../data/content";
import { useDonationTotal } from "../../../hooks/useDonationTotal";
import "./DonationSection.css";

interface DonationSectionProps {
  onOpenModal: () => void;
}

export function DonationSection({ onOpenModal }: DonationSectionProps) {
  const [displayRaised, setDisplayRaised] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [phasesOpen, setPhasesOpen] = useState(false);
  const rafId = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { total: raised, isLoading: raisedLoading } = useDonationTotal(BBR_CAMPAIGN.raised);
  const currentPhase = BBR_PHASES[BBR_CURRENT_PHASE_INDEX];
  const phasePct = Math.min((raised / currentPhase.goal) * 100, 100);

  useEffect(() => {
    if (!phasesOpen) return;
    const id = setTimeout(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const targetScrollTop = window.scrollY + rect.bottom - window.innerHeight;

      if (targetScrollTop <= window.scrollY) return;

      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }, 150); // wait for the grid transition to finish
    return () => clearTimeout(id);
  }, [phasesOpen]);

  useEffect(() => {
    if (raisedLoading) return;

    let cancelled = false;

    setDisplayRaised(0);
    setProgressWidth(0);

    const timeout = setTimeout(() => {
      if (cancelled) return;
      setProgressWidth(phasePct);

      const start = performance.now();
      const duration = 1200;
      const target = raised;

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
  }, [phasePct, raised, raisedLoading]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-NZ");

  return (
    <section className="bbr-donation-section" ref={sectionRef}>
      <div className="bbr-donation-inner">
        <div className="bbr-hero-cta-row">
          <button className="bbr-hero-cta" onClick={onOpenModal} type="button">
            Donate Today &nbsp;→
          </button>
        </div>

        <div className="bbr-fund-widget">
          <div className="bbr-fund-top">
            <p className="bbr-fund-widget-title">Be at the starting line</p>
            <div className="bbr-fund-phase-row">
              <p className="bbr-fund-phase-name">Phase {currentPhase.number}</p>
              <span className="bbr-fund-phase-target">Target: {currentPhase.deadline}</span>
            </div>
            <div className="bbr-fund-bar-wrap">
              <div className="bbr-progress-track">
                <div className="bbr-progress-fill" style={{ width: `${progressWidth}%` }} />
              </div>
            </div>
            <div className="bbr-fund-amounts">
              <span className="bbr-fund-raised">
                {raisedLoading ? (
                  <span className="bbr-fund-pulse" role="status" aria-label="Loading donation total">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  fmt(displayRaised)
                )}{" "}
                <em>Raised</em>
              </span>
              <span className="bbr-fund-goal-label">{fmt(currentPhase.goal)}</span>
            </div>
            <p className="bbr-fund-body-desc">
              Every contribution helps lay the foundation for New Zealand's first brain tumour registry.
            </p>
          </div>

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
                            <span className="bbr-phase-tag">Phase {phase.number}</span>
                            <span className="bbr-phase-target">Target {phase.deadline}</span>
                          </div>
                          <span className="bbr-phase-amount">{fmt(phase.goal)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
