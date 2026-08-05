import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles/base.css";
import "./GeorgiesStoryPage.css";
import { ROUTES } from "../../app/routes";
import { BB2_GEORGIE } from "./data/content";
import { DonationNav } from "./components/DonationNav";
import { DonationModal } from "./components/DonationModal";

export function GeorgiesStoryPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bb2">
      <DonationNav onOpenModal={() => setModalOpen(true)} />

      <main>
        <article className="bb2-georgie-page">
          <div className="bb2-georgie-page-inner">
            <Link to={ROUTES.bigBrain2} className="bb2-georgie-back">
              <FiArrowLeft size={14} />
              Back to Sam&apos;s run
            </Link>

            <p className="bb2-section-label">Georgie&apos;s Story</p>
            <h1 className="bb2-georgie-title">
              In Her
              <br />
              Own Words
            </h1>

            <blockquote className="bb2-pull-quote">{BB2_GEORGIE.pullQuote}</blockquote>

            <div className="bb2-georgie-body">
              {BB2_GEORGIE.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <blockquote className="bb2-pull-quote bb2-georgie-second-quote">{BB2_GEORGIE.secondQuote}</blockquote>

            <div className="bb2-georgie-cta-block">
              <p>
                Sam is running in Georgie&apos;s honour. Every donation brings us closer to a world where a diagnosis
                like hers comes with better options.
              </p>
              <button className="bb2-hero-cta" type="button" onClick={() => setModalOpen(true)}>
                Donate in Georgie&apos;s name &nbsp;→
              </button>
            </div>
          </div>
        </article>
      </main>

      <footer className="bb2-footer">
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
