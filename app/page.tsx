import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const projects = [
  { number: "01", title: "Lorem ipsum dolor", tag: "Consectetur", tone: "lime", size: "wide" },
  { number: "02", title: "Sit amet elit", tag: "Adipiscing", tone: "forest", size: "standard" },
  { number: "03", title: "Sed do eiusmod", tag: "Tempor", tone: "paper", size: "standard" },
  { number: "04", title: "Incididunt ut labore", tag: "Dolore", tone: "olive", size: "tall" },
  { number: "05", title: "Magna aliqua enim", tag: "Veniam", tone: "ink", size: "standard" },
  { number: "06", title: "Quis nostrud", tag: "Exercitation", tone: "mist", size: "wide" },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="home-hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Lorem ipsum dolor sit</div>
              <h1>
                Lorem ipsum<br />
                <span>dolor sit amet.</span>
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="hero-actions">
                <Link href="#grid" className="button-primary">Lorem ipsum <span>↘</span></Link>
                <Link href="#about" className="button-secondary">Dolor sit amet</Link>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-art-index">01 / 03</div>
              <div className="hero-shape hero-shape-one" />
              <div className="hero-shape hero-shape-two" />
              <div className="hero-shape hero-shape-three" />
              <div className="hero-art-caption">
                <span>Lorem ipsum</span>
                <span>Consectetur adipiscing</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label="Lorem ipsum services">
          <div className="ticker-track">
            <span>Lorem ipsum</span><i>✳</i><span>Dolor sit amet</span><i>✳</i>
            <span>Consectetur</span><i>✳</i><span>Adipiscing elit</span><i>✳</i>
            <span>Sed do eiusmod</span><i>✳</i>
          </div>
        </div>

        <section className="projects-section" id="grid">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Lorem ipsum</div>
                <h2>Dolor sit amet,<br />consectetur elit.</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <article className={`project-card ${project.size}`} key={project.number}>
                  <div className={`project-visual ${project.tone}`}>
                    <span className="visual-mark">{project.number}</span>
                    <div className="visual-orbit" />
                    <div className="visual-block" />
                  </div>
                  <div className="project-info">
                    <div>
                      <span>{project.tag}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <span className="project-arrow">↗</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="statement-section" id="about">
          <div className="wrap statement-grid">
            <div className="statement-number">02</div>
            <div className="statement-copy">
              <div className="eyebrow light">Dolor sit amet</div>
              <h2>
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.”
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </p>
              <Link href="#contact" className="button-light">Consectetur elit <span>→</span></Link>
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="wrap">
            <div className="section-heading compact">
              <div>
                <div className="eyebrow">Sed do eiusmod</div>
                <h2>Lorem ipsum,<br />dolor sit amet.</h2>
              </div>
            </div>
            <div className="process-grid">
              {[
                ["01", "Lorem ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
                ["02", "Dolor sit amet", "Sed do eiusmod tempor incididunt ut labore et dolore magna."],
                ["03", "Consectetur elit", "Ut enim ad minim veniam, quis nostrud exercitation ullamco."],
              ].map(([number, title, copy]) => (
                <div className="process-card" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta" id="contact">
          <div className="wrap cta-inner">
            <div>
              <div className="eyebrow">Lorem ipsum dolor</div>
              <h2>Consectetur adipiscing elit?</h2>
            </div>
            <Link href="#" className="cta-circle" aria-label="Lorem ipsum">
              <span>Let&apos;s<br />ipsum</span><b>↗</b>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
