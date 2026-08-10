import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="wrap header-inner">
        <Link href="/" className="logo">
          the<span>work</span>co
        </Link>
        <nav>
          <Link href="/#grid">Lorem</Link>
          <Link href="/">Ipsum</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/contact" className="nav-cta">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
