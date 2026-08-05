import { useEffect, useRef, useState } from "react";
import { BB2_CAMPAIGN, BB2_CURRENT_PHASE_INDEX, BB2_PHASES } from "../data/content";
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

  const currentPhase = BB2_PHASES[BB2_CURRENT_PHASE_INDEX];
  const phasePct = Math.min((BB2_CAMPAIGN.raised / currentPhase.goal) * 100, 100);

  useEffect(() => {
    let cancelled = false;

    setDisplayRaised(0);
    setProgressWidth(0);

    const timeout = setTimeout(() => {
      if (cancelled) return;
      setProgressWidth(phasePct);

      const start = performance.now();
      const duration = 1200;
      const target = BB2_CAMPAIGN.raised;

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
    <section className="bb2-hero" ref={sectionRef}>
      <div className="bb2-hero-inner">
        {/* <p className="bb2-hero-eyebrow">{BB2_CAMPAIGN.eyebrow}</p> */}

        <h1 className="bb2-hero-title">
          Every step south funds New Zealand's
          <br />
          <em>{" First brain tumour registry."}</em>
        </h1>
        <div className="bb2-hero-desc-wrapper">
          <p className="bb2-hero-desc">{BB2_CAMPAIGN.description}</p>
        </div>

        <div className="bb2-fund-widget">
          {/* ── Top: metrics ── */}
          <div className="bb2-fund-top">
            <p className="bb2-fund-widget-title">Help Build the Foundation</p>
            {/* <p className="bb2-fund-phase-eyebrow">Current Phase</p> */}
            <p className="bb2-fund-phase-name">
              <strong>
                Phase {currentPhase.number} · {currentPhase.name}
              </strong>
              <span className="bb2-fund-phase-goal">{fmt(currentPhase.goal)} Goal</span>
            </p>
            <div className="bb2-fund-bar-wrap">
              <div className="bb2-progress-track">
                <div className="bb2-progress-fill" style={{ width: `${progressWidth}%` }} />
              </div>
            </div>
            <div className="bb2-fund-amounts">
              <span className="bb2-fund-raised">
                {fmt(displayRaised)} <em>Raised</em>
              </span>
              <span className="bb2-fund-goal-label">{fmt(currentPhase.goal)}</span>
            </div>
            <p className="bb2-fund-body-desc">
              Every contribution helps lay the foundation for New Zealand's first brain tumour registry.
            </p>
          </div>

          {/* ── Bottom: phases toggle ── */}
          <div className="bb2-phases-section">
            <button
              className={`bb2-phases-toggle${phasesOpen ? " open" : ""}`}
              type="button"
              aria-expanded={phasesOpen}
              onClick={() => setPhasesOpen((v) => !v)}
            >
              <span>Phases</span>
              <span className="bb2-phase-chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            <div className={`bb2-phases-list-wrap${phasesOpen ? " open" : ""}`}>
              <div>
                <div className="bb2-phases-list">
                  {BB2_PHASES.map((phase) => {
                    const isCurrent = phase.number === currentPhase.number;
                    return (
                      <div key={phase.number} className={`bb2-phase-row${isCurrent ? " current" : ""}`}>
                        <div className="bb2-phase-btn">
                          <span className="bb2-phase-num">{phase.number}</span>
                          <div className="bb2-phase-info">
                            <span className="bb2-phase-tag">
                              Phase {phase.number} · {phase.name}
                            </span>
                            <span className="bb2-phase-amount">{fmt(phase.goal)}</span>
                          </div>
                        </div>
                        <p className="bb2-phase-desc">{phase.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bb2-hero-cta-row" ref={ctaRef}>
          <button className="bb2-hero-cta" onClick={onOpenModal} type="button">
            Make a Donation &nbsp;→
          </button>
        </div>
      </div>
    </section>
  );
}
