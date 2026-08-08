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
                The Big Brain Foundation exists to improve the lives of individuals, families, and communities affected
                by neurological challenges.
              </p>
              <p>
                Inspired by lived family experiences, we are committed to supporting initiatives around the brain and
                its complexity.
              </p>
              <p>
                By turning personal challenge into collective action, we aim to inspire, mobilise, and accelerate
                discoveries in brain research that makes a meaningful difference in people’s lives now and for
                generations to come.
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
