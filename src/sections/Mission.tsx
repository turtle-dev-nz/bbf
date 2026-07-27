import "./Mission.css";

const Mission = () => {
  return (
    <section className="home-section" id="mission">
      <div className="container home-section__inner">
        <div className="home-section__intro">
          <p className="home-eyebrow">Our mission</p>
          <div className="mission-content">
            <div>
              <h2>Why we exist</h2>
              <p>
                Every year, thousands of New Zealanders are affected by conditions that impact the brain. While many
                incredible organisations are working to improve outcomes, lasting change happens when communities,
                charities, researchers and supporters work together.
              </p>
              <p>
                The Big Brain Foundation exists to bring those people together—raising awareness, supporting meaningful
                initiatives and creating opportunities for more people to make a difference.{" "}
              </p>
              <p>
                Whether it's backing a local fundraiser, supporting a national awareness campaign or helping new ideas
                grow, our goal is simple:
              </p>
              <p>
                <strong>To create a stronger future for brain health in Aotearoa.</strong>
              </p>
            </div>

            <div className="pillars">
              <div className="pillar">
                <div className="icon">01</div>
                <div>
                  <h3>Awareness</h3>
                  <p>Helping more people understand brain health and neurological conditions.</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="pillar">
                <div className="icon">02</div>
                <div>
                  <h3>Connection</h3>
                  <p>Bringing together charities, healthcare professionals, researchers and communities.</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="pillar">
                <div className="icon">03</div>
                <div>
                  <h3>Support</h3>
                  <p>Helping campaigns and organisations create meaningful impact.</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="pillar">
                <div className="icon">04</div>
                <div>
                  <h3>Growth</h3>
                  <p>Building a sustainable foundation that can support future brain health initiatives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <ul className="home-pillars">
                  <li>
                    <h3>Foundation overview</h3>
                    <p>High-level messaging, values, and credibility content can live here.</p>
                  </li>
                  <li>
                    <h3>Campaign directory</h3>
                    <p>Feature active and past initiatives without turning the homepage into a microsite.</p>
                  </li>
                  <li>
                    <h3>Reusable building blocks</h3>
                    <p>Keep buttons, cards, and layout primitives shared across all pages.</p>
                  </li>
                </ul> */}
      </div>
    </section>
  );
};

export default Mission;
