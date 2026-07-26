import { Navbar } from "./components/layout/Navbar";
import { FiBriefcase, FiMail, FiTool } from "react-icons/fi";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="site-main">
        <section id="about" className="site-section site-section--hero">
          <div className="container site-section__inner">
            <h1>Big Brain Foundation</h1>
            <p>Site scaffold in progress.</p>
          </div>
        </section>

        <section id="events" className="site-section">
          <div className="container site-section__inner">
            <h2>
              <FiBriefcase className="site-section__icon" aria-hidden="true" />
              Events
            </h2>
            <p className="site-section__placeholder">Content coming soon.</p>
          </div>
        </section>

        <section id="become-a-partner" className="site-section">
          <div className="container site-section__inner">
            <h2>
              <FiTool className="site-section__icon" aria-hidden="true" />
              Become a Partner
            </h2>
            <p className="site-section__placeholder">Content coming soon.</p>
          </div>
        </section>

        <section id="contact" className="site-section">
          <div className="container site-section__inner">
            <h2>
              <FiMail className="site-section__icon" aria-hidden="true" />
              Contact
            </h2>
            <p className="site-section__placeholder">Content coming soon.</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
