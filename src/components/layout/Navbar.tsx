import { useEffect, useState } from "react";
import "./Navbar.css";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export interface NavbarLink {
  label: string;
  id: string;
}

export interface NavbarAction {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
}

interface NavbarProps {
  logoSrc: string;
  logoAlt: string;
  homeHref?: string;
  ariaLabel?: string;
  navLinks: NavbarLink[];
  mobileMenuId?: string;
  primaryAction?: NavbarAction;
  secondaryAction?: NavbarAction;
}

export function Navbar({
  logoSrc,
  logoAlt,
  ariaLabel = "Primary navigation",
  navLinks,
  mobileMenuId = "mobile-navigation",
  primaryAction,
  secondaryAction,
}: NavbarProps) {
  const sectionIds = navLinks.map((link) => link.id);
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);
  const isScrolled = scrollY > 40;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && <div className="navbar__backdrop" aria-hidden="true" onClick={() => setMenuOpen(false)} />}
      <header className={`navbar${isScrolled ? " navbar--scrolled" : ""}${menuOpen ? " navbar--menu-open" : ""}`}>
        <div className="container navbar__inner">
          <a href={"/"} className="navbar__logo" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <img src={logoSrc} alt={logoAlt} className="navbar__logo-image" />
          </a>

          <nav className="navbar__nav" aria-label={ariaLabel}>
            <ul className="navbar__links">
              {navLinks.map(({ label, id }) => (
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

          {(secondaryAction || primaryAction) && (
            <div className="navbar__actions">
              {secondaryAction && (
                <a
                  className={`navbar__cta${secondaryAction.variant === "ghost" ? " navbar__cta--ghost" : ""}`}
                  href={secondaryAction.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {secondaryAction.label}
                </a>
              )}
              {primaryAction && (
                <a className="navbar__cta" href={primaryAction.href} onClick={() => setMenuOpen(false)}>
                  {primaryAction.label}
                </a>
              )}
            </div>
          )}

          <button
            type="button"
            className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          id={mobileMenuId}
          className={`navbar__mobile-menu${menuOpen ? " navbar__mobile-menu--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <ul className="navbar__mobile-links">
            {secondaryAction && (
              <li>
                <a className="navbar__mobile-cta" href={secondaryAction.href} onClick={() => setMenuOpen(false)}>
                  {secondaryAction.label}
                </a>
              </li>
            )}
            {primaryAction && (
              <li>
                <a
                  className="navbar__mobile-cta navbar__mobile-cta--primary"
                  href={primaryAction.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {primaryAction.label}
                </a>
              </li>
            )}
            {navLinks.map(({ label, id }) => (
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
