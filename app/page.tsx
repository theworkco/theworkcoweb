import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Button = {label?: string; href?: string}
type BrowserShowcase = {front: string; back: string; label: string; alt: string; cropChrome?: boolean}
type Project = {number?: string; title?: string; tag?: string; href?: string; tone?: string; size?: string; imageUrl?: string; browser?: BrowserShowcase}
type ProcessStep = {number?: string; title?: string; copy?: string}
type Homepage = {
  eyebrow?: string; heroTitle?: string; heroAccent?: string; heroBody?: string
  primaryButton?: Button; secondaryButton?: Button; services?: string[]
  projectsEyebrow?: string; projectsTitle?: string; projectsIntro?: string; projects?: Project[]
  statementEyebrow?: string; statementQuote?: string; statementBody?: string; statementButton?: Button
  processEyebrow?: string; processTitle?: string; processSteps?: ProcessStep[]
  ctaEyebrow?: string; ctaTitle?: string; ctaButton?: Button
}

const fallbackProjects: Project[] = [
  {number: '01', title: 'mrktimes.com - A dashboard view of your portfolio, seamlessly connected to Robinhood. Showing News and stock prices in one dynamic view', tag: 'Digital Product Launch', href: 'https://mrktimes.com', tone: 'lime', size: 'wide', browser: {front: '/images/mrktimes-overview.png', back: '/images/mrktimes-dashboard.png', label: 'mrktimes.com', alt: 'MRKTIMES market intelligence dashboard', cropChrome: true}},
  {number: '02', title: 'olla.studio', tag: 'Digital Design', href: 'https://olla.studio', tone: 'forest', size: 'standard', browser: {front: '/images/olla-home.png', back: '/images/olla-contact.png', label: 'olla.studio', alt: 'Olla digital studio website'}},
  {number: '03', title: 'Sed do eiusmod', tag: 'Tempor', tone: 'paper', size: 'standard'},
  {number: '04', title: 'Incididunt ut labore', tag: 'Dolore', tone: 'olive', size: 'tall'},
  {number: '05', title: 'Magna aliqua enim', tag: 'Veniam', tone: 'ink', size: 'standard'},
  {number: '06', title: 'Quis nostrud', tag: 'Exercitation', tone: 'mist', size: 'wide'},
]

const content: Homepage = {
  eyebrow: 'Recent Work', heroTitle: 'The stories', heroAccent: 'moving your market.',
  heroBody: 'A single pane of glass to view your portfolio, the news making an impact to it, and its performance.',
  primaryButton: {label: 'Read More', href: '#grid'}, secondaryButton: {label: 'Visit MRKTIMES', href: 'https://mrktimes.com'},
  services: ['Branding & Marketing', 'Product Development', 'Strategy & Design'],
  projectsEyebrow: 'Our Work', projectsTitle: "Recent projects we're\nexcited about",
  projectsIntro: "From product development to strategy, design and marketing. Here you'll find an overview of some of what we have been focusing on lately.",
  projects: fallbackProjects, statementEyebrow: 'Dolor sit amet',
  statementQuote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  statementBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  statementButton: {label: 'Consectetur elit', href: '#contact'}, processEyebrow: 'Sed do eiusmod',
  processTitle: 'Lorem ipsum, dolor sit amet.', processSteps: [],
  ctaEyebrow: 'Lorem ipsum dolor', ctaTitle: 'Consectetur adipiscing elit?', ctaButton: {label: "Let's ipsum", href: '/contact'},
}

function lines(value?: string) {
  return (value || '').split(/\n|,\s+/).filter(Boolean)
}

export default function Home() {
  const titleLines = lines(content.heroTitle)
  const projectTitleLines = lines(content.projectsTitle)
  const processTitleLines = lines(content.processTitle)

  return <>
    <Header />
    <main>
      <section className="home-hero"><div className="wrap hero-grid">
        <div className="hero-copy"><div className="eyebrow">{content.eyebrow}</div>
          <h1>{titleLines.map((line, i) => <span key={line}>{line}{i < titleLines.length - 1 && <br />}</span>)}<br /><span>{content.heroAccent}</span></h1>
          <p>{content.heroBody}</p>
          <div className="hero-actions">
            <Link href={content.primaryButton?.href || '#grid'} className="button-primary">{content.primaryButton?.label || 'Explore'} <span>↘</span></Link>
            <Link href={content.secondaryButton?.href || '#about'} className="button-secondary">{content.secondaryButton?.label || 'About'}</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="hero-art-index">01 / 03</div><div className="hero-shape hero-shape-one"/><div className="hero-shape hero-shape-two"/><div className="hero-shape hero-shape-three"/><div className="hero-art-caption"><span>{content.eyebrow}</span><span>{content.heroAccent}</span></div></div>
      </div></section>

      <div className="ticker" aria-label="Services"><div className="ticker-track">{(content.services || []).map(service => <span key={service}>{service}<i>✳</i></span>)}</div></div>

      <section className="projects-section" id="grid"><div className="wrap">
        <div className="section-heading"><div><div className="eyebrow">{content.projectsEyebrow}</div><h2>{projectTitleLines.map((line, i) => <span key={line}>{line}{i < projectTitleLines.length - 1 && <br />}</span>)}</h2></div><p>{content.projectsIntro}</p></div>
        <div className="project-grid">{(content.projects?.length ? content.projects : fallbackProjects).map((project, index) => {
          const visualUrl = project.imageUrl || null
          return <Link href={project.href || '#'} className={`project-card ${project.size || 'standard'}`} key={`${project.number}-${index}`}>
            <div className={`project-visual ${project.tone || 'lime'} ${project.browser ? `browser-project-visual browser-project-visual-${project.size || 'standard'}` : ''}`} style={visualUrl ? {backgroundImage: `url(${visualUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'} : undefined}>
              {project.browser ? <div className={`browser-showcase ${project.browser.cropChrome ? 'browser-showcase-cropped' : ''}`}>
                <span className="visual-mark">{project.number}</span>
                <div className="browser-window browser-window-back">
                  <div className="browser-toolbar"><i/><i/><i/><span>{project.browser.label}</span></div>
                  <div className="browser-canvas"><Image src={project.browser.back} alt={`${project.browser.alt} alternate view`} fill sizes="(max-width: 900px) 82vw, 680px" /></div>
                </div>
                <div className="browser-window browser-window-front">
                  <div className="browser-toolbar"><i/><i/><i/><span>{project.browser.label}</span></div>
                  <div className="browser-canvas"><Image src={project.browser.front} alt={project.browser.alt} fill sizes="(max-width: 900px) 88vw, 760px" /></div>
                </div>
              </div> : !visualUrl && <><span className="visual-mark">{project.number}</span><div className="visual-orbit"/><div className="visual-block"/></>}
            </div><div className="project-info"><div><span>{project.tag}</span><h3>{project.title}</h3></div><span className="project-arrow">↗</span></div>
          </Link>
        })}</div>
      </div></section>

      <section className="statement-section" id="about"><div className="wrap statement-grid"><div className="statement-number">02</div><div className="statement-copy"><div className="eyebrow light">{content.statementEyebrow}</div><h2>“{content.statementQuote}”</h2><p>{content.statementBody}</p><Link href={content.statementButton?.href || '#contact'} className="button-light">{content.statementButton?.label || 'Learn more'} <span>→</span></Link></div></div></section>

      <section className="process-section"><div className="wrap"><div className="section-heading compact"><div><div className="eyebrow">{content.processEyebrow}</div><h2>{processTitleLines.map((line, i) => <span key={line}>{line}{i < processTitleLines.length - 1 && <br />}</span>)}</h2></div></div><div className="process-grid">{(content.processSteps || []).map(step => <div className="process-card" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></div>)}</div></div></section>

      <section className="home-cta" id="contact"><div className="wrap cta-inner"><div><div className="eyebrow">{content.ctaEyebrow}</div><h2>{content.ctaTitle}</h2></div><Link href={content.ctaButton?.href || '#'} className="cta-circle" aria-label={content.ctaButton?.label}><span>{content.ctaButton?.label}</span><b>↗</b></Link></div></section>
    </main>
    <Footer />
  </>
}
