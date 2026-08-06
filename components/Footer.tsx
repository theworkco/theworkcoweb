import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-logo">
              the<span>work</span>co
            </Link>
            <p className="footer-tag">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
              eiusmod.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Lorem</h4>
              <Link href="/#grid">Lorem ipsum</Link>
              <Link href="#">Dolor sit amet</Link>
              <Link href="#">Consectetur</Link>
              <Link href="#">Adipiscing elit</Link>
            </div>
            <div className="footer-col">
              <h4>Ipsum</h4>
              <Link href="/posts">Posts</Link>
              <Link href="#">Lorem ipsum</Link>
              <Link href="#">Dolor sit amet</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} theworkco</span>
          <span>Lorem ipsum dolor sit</span>
        </div>
      </div>
    </footer>
  );
}
