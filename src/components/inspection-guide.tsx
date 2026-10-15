import { ArrowUpRight, Check, Info } from 'lucide-react';

const checks = [
  { image: '/images/boiler-check.webp', alt: 'Domestic gas boiler and handheld testing equipment, shown for illustration', title: 'Boilers & gas appliances', number: '01', text: 'The engineer assesses safe operation, the relevant operating pressure or heat input, and the appliance’s safety devices.', points: ['Boiler and other agreed gas appliances', 'Operating conditions and safety controls'], className: 'boiler' },
  { image: '/images/boiler-flue.webp', alt: 'A white domestic boiler flue terminal on an exterior brick wall, shown for illustration', title: 'Flues & ventilation', number: '02', text: 'Checks cover the flue’s condition and effectiveness, plus the ventilation needed by the appliance. The exact tests depend on the installation.', points: ['Safe removal of combustion gases', 'Required air supply and clear ventilation'], className: 'flue' },
  { image: '/images/gas-hob.webp', alt: 'An unbranded domestic gas hob with a blue burner flame, shown for illustration', title: 'Hobs, cookers & gas fires', number: '03', text: 'A landlord check is not just a boiler check. Tell Ram about any gas hob, cooker or fire so the relevant appliances are included in the quote.', points: ['Confirm every appliance before the visit', 'Include landlord-provided appliances'], className: 'hob' },
];

export function InspectionGuide() {
  return <section id="whats-checked" className="inspection-section"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">WHAT A GAS SAFETY CHECK COVERS</p><h2>Appliances. Flues.<br />Ventilation. Safety controls.</h2></div><p>The checks depend on the appliances and installation. Ram will agree the scope before your visit; any safety issues are recorded and explained.</p></div>
    <div className="inspection-grid">{checks.map(check => <article className={`inspection-card ${check.className}`} key={check.number}><div className="inspection-image"><img src={check.image} alt={check.alt} width="800" height="600" loading="lazy" /><span>{check.number} / THE CHECK</span></div><div className="inspection-copy"><h3>{check.title}</h3><p>{check.text}</p><ul>{check.points.map(point => <li key={point}><Check size={14} />{point}</li>)}</ul></div></article>)}</div>
    <div className="inspection-note"><Info size={18} /><p><strong>A check records the findings.</strong> A gas safety record can show defects; receiving one does not mean an unsafe appliance has passed. Repairs and boiler servicing are separate.</p></div>
    <p className="inspection-source">Based on <a href="https://www.hse.gov.uk/gas/landlords/safetycheckswhat.htm" target="_blank" rel="noreferrer">HSE landlord guidance <ArrowUpRight size={11} /></a> and <a href="https://www.thanet.gov.uk/info-pages/gas-safety/" target="_blank" rel="noreferrer">UK council guidance on checks <ArrowUpRight size={11} /></a>. Images are illustrative and do not show Ram or completed MK Gas Safety work.</p>
  </div></section>;
}
