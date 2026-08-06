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
          <Link href="#" className="nav-cta">
            Lorem ipsum
          </Link>
        </nav>
      </div>
    </header>
  );
}
