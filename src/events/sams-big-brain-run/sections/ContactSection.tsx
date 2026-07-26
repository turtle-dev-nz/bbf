import { FiHeart, FiMail } from "react-icons/fi";

export function ContactSection() {
  return (
    <section id="contact" className="run-section run-section--contact">
      <div className="container run-section__inner">
        <div className="run-section__heading">
          <p className="run-eyebrow">Get in touch</p>
          <h2>Two clear next steps</h2>
        </div>

        <div className="run-contact-grid">
          <article className="run-contact-card">
            <FiHeart className="run-section__icon" aria-hidden="true" />
            <h3>Donate</h3>
            <p>Placeholder donation copy and future external link.</p>
            <a className="run-button run-button--primary" href="#contact">
              Donate Placeholder
            </a>
          </article>
          <article className="run-contact-card">
            <FiMail className="run-section__icon" aria-hidden="true" />
            <h3>Partner with us</h3>
            <p>Placeholder sponsorship enquiry copy and future contact path.</p>
            <a className="run-button run-button--secondary" href="mailto:hello@bigbrainfoundation.org">
              Enquiry Placeholder
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
