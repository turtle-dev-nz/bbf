import { Link } from "react-router-dom";
import { ROUTES } from "../app/routes";
import "./Hero.css";
const Hero = () => {
  return (
    <section className="home-hero" id="home">
      <div className="container home-hero__inner">
        <div className="home-hero__copy">
          <h1>
            Connecting people, research and communities to <span>improve brain health across New Zealand.</span>
          </h1>
          <div className="home-actions">
            <Link className="home-button home-button--primary" to={ROUTES.samBigBrainRun}>
              View Sam&apos;s Big Brain Run
            </Link>
            <a className="home-button home-button--secondary" href="#campaigns">
              Explore campaigns
            </a>
          </div>
        </div>

        <div className="home-hero__support"></div>
      </div>
    </section>
  );
};

export default Hero;
