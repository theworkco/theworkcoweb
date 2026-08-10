import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {client, sanityConfigured} from '@/sanity/lib/client'
import {imageUrl} from '@/sanity/lib/image'

export const revalidate = 60

type Button = {label?: string; href?: string}
type Project = {number?: string; title?: string; tag?: string; href?: string; tone?: string; size?: string; image?: unknown}
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
  {number: '01', title: 'Lorem ipsum dolor', tag: 'Consectetur', tone: 'lime', size: 'wide'},
  {number: '02', title: 'Sit amet elit', tag: 'Adipiscing', tone: 'forest', size: 'standard'},
  {number: '03', title: 'Sed do eiusmod', tag: 'Tempor', tone: 'paper', size: 'standard'},
  {number: '04', title: 'Incididunt ut labore', tag: 'Dolore', tone: 'olive', size: 'tall'},
  {number: '05', title: 'Magna aliqua enim', tag: 'Veniam', tone: 'ink', size: 'standard'},
  {number: '06', title: 'Quis nostrud', tag: 'Exercitation', tone: 'mist', size: 'wide'},
]

const fallback: Homepage = {
  eyebrow: 'Lorem ipsum dolor sit', heroTitle: 'Lorem ipsum', heroAccent: 'dolor sit amet.',
  heroBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  primaryButton: {label: 'Lorem ipsum', href: '#grid'}, secondaryButton: {label: 'Dolor sit amet', href: '#about'},
  services: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit', 'Sed do eiusmod'],
  projectsEyebrow: 'Lorem ipsum', projectsTitle: 'Dolor sit amet, consectetur elit.',
  projectsIntro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  projects: fallbackProjects, statementEyebrow: 'Dolor sit amet',
  statementQuote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  statementBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  statementButton: {label: 'Consectetur elit', href: '#contact'}, processEyebrow: 'Sed do eiusmod',
  processTitle: 'Lorem ipsum, dolor sit amet.', processSteps: [
    {number: '01', title: 'Lorem ipsum', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {number: '02', title: 'Dolor sit amet', copy: 'Sed do eiusmod tempor incididunt ut labore et dolore magna.'},
    {number: '03', title: 'Consectetur elit', copy: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.'},
  ], ctaEyebrow: 'Lorem ipsum dolor', ctaTitle: 'Consectetur adipiscing elit?', ctaButton: {label: "Let's ipsum", href: '#'},
}

async function getHomepage(): Promise<Homepage> {
  if (!sanityConfigured) return fallback
  try {
    const data = await client.fetch<Homepage | null>(`*[_type == "homepage"][0]{..., projects[]{...}, processSteps[]{...}}`)
    return data ? {...fallback, ...data} : fallback
  } catch {
    return fallback
  }
}

function lines(value?: string) {
  return (value || '').split(/\n|,\s+/).filter(Boolean)
}

export default async function Home() {
  const content = await getHomepage()
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
          const visualUrl = imageUrl(project.image)
          return <Link href={project.href || '#'} className={`project-card ${project.size || 'standard'}`} key={`${project.number}-${index}`}>
            <div className={`project-visual ${project.tone || 'lime'}`} style={visualUrl ? {backgroundImage: `url(${visualUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'} : undefined}>
              {!visualUrl && <><span className="visual-mark">{project.number}</span><div className="visual-orbit"/><div className="visual-block"/></>}
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
