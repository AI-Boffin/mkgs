import type { Metadata } from 'next';
import { ArrowUpRight, ArrowRight, ShieldCheck, House, FileCheck2, Mail, MapPin, Check, Layers, ClipboardCheck, CircleCheck, BadgeCheck } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { InspectionGuide } from '@/components/inspection-guide';
import { Pricing } from '@/components/pricing';
import { carbonMonoxideAlarmPrice, landlordPrices } from '@/lib/pricing';
import { areas, faqs, site } from '@/lib/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };
const services = [
  { number: '01', icon: FileCheck2, title: 'Landlord checks & CP12', tag: 'LANDLORDS', text: 'Annual checks of the gas appliances and flues you provide for tenants, with a landlord gas safety record of the findings.', link: 'Request a landlord check', className: 'orange' },
  { number: '02', icon: House, title: 'Home gas safety checks', tag: 'HOMEOWNERS', text: 'Have your domestic gas appliances checked for safe operation. Tell Ram which appliances you need checked when you enquire.', link: 'Request a home check', className: 'green' },
  { number: '03', icon: Layers, title: 'Checks for managed homes', tag: 'LETTING AGENTS', text: 'Arrange checks for rental properties in our three service areas. Send the addresses, appliances and record due dates for a quote.', link: 'Enquire about properties', className: 'purple' },
];

export default function Home() {
  const business = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${site.url}/#business`, name: site.name, url: site.url,
    description: 'Domestic gas safety checks and landlord gas safety records in Milton Keynes, Buckingham and Newport Pagnell.',
    image: `${site.url}/images/boiler-check.webp`, ...(site.email ? { email: site.email } : {}),
    areaServed: areas.map(area => ({ '@type': 'City', name: area.name })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Gas safety checks', itemListElement: [...services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title } })), ...landlordPrices.flatMap(plan => [false, true].map(withAlarm => ({ '@type': 'Offer', price: plan.price + (withAlarm ? carbonMonoxideAlarmPrice : 0), priceCurrency: 'GBP', url: `${site.url}/#pricing`, name: `${plan.appliances} gas appliance landlord check${withAlarm ? ' with one carbon monoxide alarm supplied and fitted' : ' without a new alarm'}`, itemOffered: { '@type': 'Service', name: 'Landlord gas safety check and record (CP12)' } })))] },
  };
  return <main id="main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }} />
    <section className="hero container direct-hero">
      <div className="hero-copy">
        <p className="eyebrow"><span /> MK GAS SAFETY · DOMESTIC GAS CHECKS</p>
        <h1>Gas safety checks<br />& landlord<br /><span className="hero-emphasis">certificates.</span></h1>
        <p className="hero-description">Boiler, gas appliance and flue safety checks for landlords and homeowners. <strong>Landlord checks from £50. Arrange your visit with Ram by email.</strong></p>
        <p className="hero-areas"><MapPin size={16} /><span>Milton Keynes · Buckingham · Newport Pagnell</span></p>
        <div className="hero-actions"><a className="button button-orange" href="#contact">Request a quote <ArrowUpRight size={19} /></a><a className="text-link" href="#pricing">View prices <ArrowRight size={16} /></a></div>
        <div className="hero-facts"><span><Check size={15} /> Price agreed before booking</span><span><Mail size={15} /> No phone call needed</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo"><img src="/images/boiler-check.webp" alt="A domestic wall-mounted gas boiler with a technician holding testing equipment; illustrative image" width="1200" height="1500" fetchPriority="high" /><div className="photo-shade" /><span className="photo-caption"><span /> BOILER & GAS APPLIANCE SAFETY</span></div>
        <div className="orbit-label"><ShieldCheck size={21} /><span>Domestic gas safety checks</span></div>
        <div className="hero-note"><span className="note-icon"><FileCheck2 size={25} /></span><div><small>LANDLORD GAS SAFETY RECORD</small><strong>Annual checks. Clear findings.</strong></div><span className="note-arrow">↗</span></div>
      </div>
    </section>
    <div className="trust-strip"><div className="container"><span><FileCheck2 /> Landlord gas safety records (CP12)</span><span><MapPin /> Three local service areas</span><span><Mail /> Email-first enquiries</span></div></div>
    <Pricing />

    <section id="services" className="section container services direct-services">
      <div className="section-heading"><div><p className="eyebrow">OUR SERVICES</p><h2>Gas safety checks<br />for your property.</h2></div><p>Tell Ram your postcode, the number of gas appliances and when your check is due. He’ll confirm the scope, price and availability.</p></div>
      <div className="service-grid">{services.map(service => <article className={`service-card ${service.className}`} key={service.number}><div className="service-top"><span className="service-icon"><service.icon size={27} strokeWidth={1.5} /></span><span>{service.number} /</span></div><span className="small-label">{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contact">{service.link}<ArrowUpRight size={19} /></a></article>)}</div>
      <p className="service-disclaimer"><ShieldCheck size={16} /> A gas safety check is not a boiler service. Servicing and any repairs must be agreed separately.</p>
    </section>
    <InspectionGuide />

    <section id="why-ram" className="ram-direct container"><div><p className="eyebrow">YOUR LOCAL CONTACT</p><h2>Arrange it with Ram.</h2></div><div><p>One contact for your enquiry, quote and appointment. Ram covers domestic properties in Milton Keynes, Buckingham and Newport Pagnell, with enquiries handled mainly by email.</p><div className="registration-note"><BadgeCheck size={21} /><p>{site.gasSafeNumber ? <>Gas Safe registration: <strong>{site.gasSafeNumber}</strong>. </> : <>Check your engineer’s Gas Safe ID and qualifications before work starts. </>}<a href="https://www.gassaferegister.co.uk/find-an-engineer-or-check-the-register/" target="_blank" rel="noreferrer">Check the register <ArrowUpRight size={12} /></a></p></div></div></section>

    <section className="process-section direct-process"><div className="container"><div className="section-heading"><div><p className="eyebrow">HOW TO BOOK</p><h2>Enquire. Agree a quote.<br />Get your check booked.</h2></div><a className="button button-outline" href="#contact">Request a quote <ArrowUpRight size={19} /></a></div><div className="process-grid">{[
      { icon: Mail, title: 'Send your details', text: 'Your postcode, appliances, current record due date and any access requirements.' },
      { icon: ClipboardCheck, title: 'Confirm your visit', text: 'Ram replies by email with a quote and available dates. The booking is agreed with you.' },
      { icon: FileCheck2, title: 'Receive the findings', text: 'The engineer completes the agreed checks, explains any issues and provides the relevant safety record.' },
    ].map((step, index) => <div className="process-step" key={step.title}><div className="process-number"><span>0{index + 1}</span><step.icon size={23} /></div><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>

    <section id="areas" className="section container direct-areas"><div className="section-heading"><div><p className="eyebrow">SERVICE AREAS</p><h2>Milton Keynes & two nearby towns.</h2></div><p>These are the only areas Ram covers. Include your full postcode so he can confirm your property is within his local patch.</p></div><div className="area-card-grid">{areas.map(area => <a className={`area-card ${area.colour}`} href={`/areas/${area.slug}/`} key={area.slug}><MapPin size={22} /><div><h3>{area.name}</h3><p>Gas safety checks & landlord records</p></div><ArrowUpRight size={21} /></a>)}</div></section>

    <section className="landlord-section"><div className="container landlord-grid"><div><p className="eyebrow">LANDLORD RESPONSIBILITIES IN ENGLAND</p><h2>When is a check due?</h2><p>Landlords generally need an annual gas safety check for the appliances and flues they provide. The work must be done by an appropriately qualified Gas Safe registered engineer.</p><a className="text-link" href="https://www.hse.gov.uk/gas/domestic/faqlandlord.htm" target="_blank" rel="noreferrer">Read the full HSE guidance <ArrowUpRight size={17} /></a></div><div className="legal-facts"><div><strong>12<span>months</span></strong><p>Arrange the annual check. Keep records for at least two years.</p></div><div><strong>28<span>days</span></strong><p>Normally, give existing tenants a copy within 28 days of the check.</p></div><div><strong>Before<span>move-in</span></strong><p>Give new tenants a copy of the current record before they move in.</p></div></div></div></section>

    <section id="faqs" className="section container faq-section"><div className="faq-heading"><p className="eyebrow">GAS SAFETY QUESTIONS</p><h2>What you<br /> need to know.</h2><p>Checks, certificates, costs and preparing for the visit.</p><a href="#contact" className="text-link">Ask Ram a question <ArrowUpRight size={17} /></a></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span className="faq-number">{String(index + 1).padStart(2, '0')}</span>{faq.question}<span className="faq-plus" /></summary><p>{faq.answer}</p></details>)}<p className="faq-source">General guidance for domestic properties in England. <a href="https://www.hse.gov.uk/gas/landlords/" target="_blank" rel="noreferrer">See HSE guidance</a> for your full duties.</p></div></section>

    <section id="contact" className="contact-section"><div className="container contact-grid"><div className="contact-copy"><p className="eyebrow">CONTACT RAM</p><h2>Request a<br /> <span>gas safety quote.</span></h2><p>Send your property and appliance details. Ram will reply by email to confirm the price and available appointments.</p><div className="contact-benefits"><span><CircleCheck size={19} /> Quote agreed before booking</span><span><CircleCheck size={19} /> Email replies from Ram</span><span><CircleCheck size={19} /> No phone number required</span></div>{site.email && <a className="direct-email" href={`mailto:${site.email}`}><Mail size={19} />{site.email}<ArrowUpRight size={17} /></a>}<div className="contact-inline-note"><FileCheck2 size={23} /><p>Need a landlord record?<br /><strong>Include your current check’s due date.</strong></p></div></div><ContactForm /></div></section>
    <aside className="emergency"><div className="container"><ShieldCheck size={22} /><p><strong>Smell gas or suspect a gas leak?</strong> Get to a safe place and call the National Gas Emergency Service on <a href="tel:0800111999">0800 111 999</a>. Don’t use this enquiry form for an emergency.</p><a href="https://www.gassaferegister.co.uk/gas-emergency/what-to-do-in-a-gas-emergency/" target="_blank" rel="noreferrer" aria-label="Gas emergency advice"><ArrowUpRight size={20} /></a></div></aside>
  </main>;
}

