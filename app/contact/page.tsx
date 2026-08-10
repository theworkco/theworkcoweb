import type {Metadata} from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {client, sanityConfigured} from '@/sanity/lib/client'

export const metadata: Metadata = {
  title: 'Contact | theworkco',
  description: 'Get in touch with theworkco to discuss your next project.',
}

const fallbackEmail = 'info@theworkco.com'

async function getContactEmail() {
  if (!sanityConfigured) return fallbackEmail

  try {
    return await client.fetch<string | null>(
      `*[_type == "siteSettings"][0].contactEmail`,
      {},
      {next: {revalidate: 60}},
    ) || fallbackEmail
  } catch {
    return fallbackEmail
  }
}

export default async function ContactPage() {
  const email = await getContactEmail()

  return (
    <>
      <Header />
      <main>
        <section className="contact-hero">
          <div className="wrap contact-grid">
            <div className="contact-intro">
              <div className="eyebrow">Start a conversation</div>
              <h1>Let&apos;s make something meaningful.</h1>
              <p>
                Have a project in mind, a problem worth solving, or simply want
                to explore what&apos;s possible? We&apos;d love to hear from you.
              </p>
            </div>

            <div className="contact-card">
              <span className="contact-card-number">01 / CONTACT</span>
              <div>
                <p>Tell us a little about what you&apos;re working on.</p>
                <Link href={`mailto:${email}`} className="contact-email">
                  {email}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <p className="contact-note">
                We&apos;ll get back to you as soon as we can.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-details">
          <div className="wrap contact-details-grid">
            <div className="eyebrow">What happens next</div>
            <div className="contact-steps">
              <div>
                <span>01</span>
                <h2>Say hello</h2>
                <p>Share your goals, timeline, and anything else that matters.</p>
              </div>
              <div>
                <span>02</span>
                <h2>Let&apos;s talk</h2>
                <p>We&apos;ll arrange a conversation to learn more and explore the fit.</p>
              </div>
              <div>
                <span>03</span>
                <h2>Move forward</h2>
                <p>If it feels right, we&apos;ll map out a clear path for the work ahead.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
