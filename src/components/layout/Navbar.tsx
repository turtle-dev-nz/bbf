import { useState, useEffect } from "react";
import "./Navbar.css";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useActiveSection } from "../../hooks/useActiveSection";

interface NavLink {
  label: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Become a Partner", id: "become-a-partner" },
  { label: "Contact", id: "contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function Navbar() {
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection(SECTION_IDS);
  const isScrolled = scrollY > 40;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && <div className="navbar__backdrop" aria-hidden="true" onClick={() => setMenuOpen(false)} />}
      <header className={`navbar${isScrolled ? " navbar--scrolled" : ""}${menuOpen ? " navbar--menu-open" : ""}`}>
        <div className="container navbar__inner">
          <a href="#about" className="navbar__logo" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <span className="navbar__logo-name">Big Brain Foundation</span>
          </a>

          <nav className="navbar__nav" aria-label="Primary navigation">
            <ul className="navbar__links">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`navbar__link${activeSection === id ? " navbar__link--active" : ""}`}
                    onClick={() => scrollTo(id)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`navbar__mobile-menu${menuOpen ? " navbar__mobile-menu--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <ul className="navbar__mobile-links">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`navbar__mobile-link${activeSection === id ? " navbar__mobile-link--active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
