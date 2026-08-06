import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Placeholder — port the hero/grid from theworkco-landing.html here next.
export default function Home() {
  return (
    <>
      <Header />
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Lorem ipsum</div>
          <h1>theworkco</h1>
          <p>
            Landing page port from the HTML mockup goes here — hero
            slideshow, then the projects grid.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
