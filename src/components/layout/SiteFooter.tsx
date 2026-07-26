import "./SiteLayout.css";

export function SiteFooter() {
  return (
    <footer className="site-global-footer">
      <div className="container site-global-footer__inner">
        <span>© Big Brain Foundation</span>
        <a className="site-global-footer__contact" href="mailto:hello@bigbrainfoundation.org">
          hello@bigbrainfoundation.org
        </a>
      </div>
    </footer>
  );
}
