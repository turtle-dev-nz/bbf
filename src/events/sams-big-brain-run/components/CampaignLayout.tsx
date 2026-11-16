import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiInstagram, FiFacebook } from "react-icons/fi";
import { ROUTES } from "../../../app/routes";
import { CampaignModalsContext, type CampaignModals } from "../context/campaignModals";
import { DonationModal } from "./DonationModal";
import { ContactModal, type ContactTopic } from "./ContactModal";
import { StoryModal } from "./StoryModal";
import { NoBrainer } from "./NoBrainer";
import { BBR_MONEY_LINE, BBR_SOCIAL } from "../data/content";
import { PEOPLE_WITH_IDEAS_URL } from "../config";
import badge from "../../../assets/campaigns/bigBrainRun/sams-bigbrainrun27-badge-ochre.webp";
import "../styles/base.css";
import "../styles/campaign.css";
import "./CampaignLayout.css";

const NAV_LINKS = [
  { to: ROUTES.theRun, label: "The run" },
  { to: ROUTES.follow, label: "Follow Sam" },
  { to: ROUTES.registry, label: "The registry" },
  { to: ROUTES.faq, label: "FAQ" },
] as const;

/** Shell for every Sam's Big Brain Run page: nav, footer and the shared modals. */
export function CampaignLayout({ children }: { children: ReactNode }) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<ContactTopic | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Start each page at the top (unless linking to an anchor).
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const modals = useMemo<CampaignModals>(
    () => ({
      openDonate: () => setDonateOpen(true),
      openContact: (topic = "general") => setContactTopic(topic),
      openStory: () => setStoryOpen(true),
    }),
    [],
  );

  return (
    <CampaignModalsContext.Provider value={modals}>
      <div className="bbr">
        <a className="bbr-skip" href="#bbr-main">
          Skip to content
        </a>

        <header className="bbr-header">
          <nav className="bbr-header-inner" aria-label="Main">
            <Link className="bbr-brand" to={ROUTES.samsBigBrainRun}>
              <img src={badge} alt="" width={40} height={40} />
              <span>
                <span className="bbr-brand-accent">Sam&apos;s</span> Big Brain Run
              </span>
            </Link>

            <button
              className="bbr-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="bbr-nav-links"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
              <span className="bbr-visually-hidden">Menu</span>
            </button>

            <div id="bbr-nav-links" className={`bbr-nav-links${menuOpen ? " open" : ""}`}>
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className="bbr-nav-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <button
                className="bbr-btn bbr-btn--sm"
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  modals.openDonate();
                }}
              >
                Back Sam
              </button>
            </div>
          </nav>
        </header>

        <main id="bbr-main">{children}</main>

        <footer className="bbr-site-footer">
          <div className="bbr-site-footer-top">
            <NoBrainer size="md" tone="light" />
            <button className="bbr-btn" type="button" onClick={modals.openDonate}>
              Back Sam — donate
            </button>
          </div>

          <div className="bbr-site-footer-grid">
            <div>
              <h2>Follow Sam</h2>
              <Link to={ROUTES.follow}>Follow the run</Link>
              {BBR_SOCIAL.map((s) => (
                <a key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.platform === "instagram" ? <FiInstagram aria-hidden="true" /> : <FiFacebook aria-hidden="true" />}{" "}
                  {s.handle}
                </a>
              ))}
            </div>
            <div>
              <h2>The run</h2>
              <Link to={ROUTES.theRun}>Route &amp; documentary</Link>
              <Link to={ROUTES.theRun + "#sponsors"}>Run sponsors</Link>
              <a href={PEOPLE_WITH_IDEAS_URL} target="_blank" rel="noopener noreferrer">
                Documentary by People With Ideas
              </a>
            </div>
            <div>
              <h2>Where donations go</h2>
              <span>{BBR_MONEY_LINE}</span>
              <a href="https://www.nanos.co.nz" target="_blank" rel="noopener noreferrer">
                NANOS: NZ Aotearoa Neuro-Oncology Society
              </a>
              <a href="https://www.braintumoursupport.org.nz" target="_blank" rel="noopener noreferrer">
                Funds managed by Brain Tumour Support NZ
              </a>
              <Link to={ROUTES.faq}>FAQ</Link>
            </div>
            <div>
              <h2>Contact</h2>
              <button type="button" className="bbr-link-button" onClick={() => modals.openContact("general")}>
                Get in touch
              </button>
              <button type="button" className="bbr-link-button" onClick={() => modals.openContact("media")}>
                Media enquiries
              </button>
              <span>Payments powered by Raisely</span>
            </div>
          </div>
        </footer>

        <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
        <StoryModal
          isOpen={storyOpen}
          onClose={() => setStoryOpen(false)}
          onDonate={() => {
            setStoryOpen(false);
            setDonateOpen(true);
          }}
        />
        <ContactModal
          isOpen={contactTopic !== null}
          topic={contactTopic ?? "general"}
          onClose={() => setContactTopic(null)}
        />
      </div>
    </CampaignModalsContext.Provider>
  );
}
