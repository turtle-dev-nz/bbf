import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles/bbrTheme.css";
import { ROUTES } from "../../app/routes";
import { bbr_GEORGIE } from "./data/content";
import { DonationNav } from "./components/DonationNav";
import { DonationModal } from "./components/DonationModal";

export function GeorgiesStoryPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bbr">
      <DonationNav onOpenModal={() => setModalOpen(true)} />

      <main>
        <article className="bbr-georgie-page">
          <div className="bbr-georgie-page-inner">
            <Link to={ROUTES.bigBrain2} className="bbr-georgie-back">
              <FiArrowLeft size={14} />
              Back to Sam&apos;s run
            </Link>

            <p className="bbr-section-label">Georgie&apos;s Story</p>
            <h1 className="bbr-georgie-title">
              In Her
              <br />
              Own Words
            </h1>

            <blockquote className="bbr-pull-quote">{bbr_GEORGIE.pullQuote}</blockquote>

            <div className="bbr-georgie-body">
              {bbr_GEORGIE.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <blockquote className="bbr-pull-quote bbr-georgie-second-quote">{bbr_GEORGIE.secondQuote}</blockquote>

            <div className="bbr-georgie-cta-block">
              <p>
                Sam is running in Georgie&apos;s honour. Every donation brings us closer to a world where a diagnosis
                like hers comes with better options.
              </p>
              <button className="bbr-hero-cta" type="button" onClick={() => setModalOpen(true)}>
                Donate in Georgie&apos;s name &nbsp;→
              </button>
            </div>
          </div>
        </article>
      </main>

      <footer className="bbr-footer">
        <p>
          Powered by <a href="#">Raisely</a> &middot; Funds managed by the Big Brain Foundation
          <br />
          Questions? <a href="mailto:hello@bigbrainfoundation.org">hello@bigbrainfoundation.org</a>
        </p>
      </footer>

      <DonationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
