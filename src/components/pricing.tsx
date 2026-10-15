'use client';

import { useState } from 'react';
import { ArrowUpRight, BellRing, Check, FileCheck2, Info } from 'lucide-react';
import { carbonMonoxideAlarmPrice, landlordPrices, packageSelectionEvent, type PackageSelection } from '@/lib/pricing';

export function Pricing() {
  const [withAlarm, setWithAlarm] = useState(false);

  function selectPackage(appliances: PackageSelection['appliances']) {
    window.dispatchEvent(new CustomEvent<PackageSelection>(packageSelectionEvent, { detail: { appliances, withAlarm } }));
  }

  return <section id="pricing" className="pricing-section"><div className="container">
    <div className="pricing-heading"><p className="eyebrow">LANDLORD GAS SAFETY PRICES</p><h2>Choose your check.<br />Add a CO alarm if needed.</h2><p>Prices for one property, based on the number of gas appliances. Every package includes a landlord gas safety record (CP12).</p></div>
    <div className="pricing-toggle" role="group" aria-label="Carbon monoxide alarm option">
      <button type="button" aria-pressed={!withAlarm} onClick={() => setWithAlarm(false)}>Check only</button>
      <button type="button" aria-pressed={withAlarm} onClick={() => setWithAlarm(true)}><BellRing size={16} /> Check + CO alarm</button>
    </div>
    <p className="pricing-selection" role="status">{withAlarm ? `Includes one carbon monoxide alarm supplied and fitted — £${carbonMonoxideAlarmPrice} extra per property.` : 'Gas safety check only — no new carbon monoxide alarm supplied.'}</p>
    <div className="pricing-grid">{landlordPrices.map(plan => <article className={`price-card${plan.appliances === 2 ? ' price-card-featured' : ''}`} key={plan.appliances}>
      <div className="price-card-label"><FileCheck2 size={21} /><span>{plan.appliances === 1 ? 'ONE APPLIANCE' : plan.appliances === 2 ? 'TWO APPLIANCES' : 'THREE APPLIANCES'}</span></div>
      <h3>{plan.appliances} {plan.appliances === 1 ? 'appliance' : 'appliances'}</h3>
      <p className="price-amount"><span>£</span>{plan.price + (withAlarm ? carbonMonoxideAlarmPrice : 0)}<small>per property</small></p>
      <p className="price-example">{plan.example}</p>
      <ul><li><Check size={15} />Gas safety check for {plan.appliances} gas {plan.appliances === 1 ? 'appliance' : 'appliances'}</li><li><Check size={15} />Landlord gas safety record (CP12)</li><li className={withAlarm ? 'alarm-included' : 'alarm-not-included'}>{withAlarm ? <BellRing size={15} /> : <Info size={15} />}{withAlarm ? 'Supply and fit one carbon monoxide alarm' : 'No new alarm supplied or fitted'}</li></ul>
      <a className={`button ${plan.appliances === 2 ? 'button-orange' : 'price-button'}`} href="#contact" onClick={() => selectPackage(plan.appliances)} aria-label={`Enquire about ${plan.appliances} ${plan.appliances === 1 ? 'appliance' : 'appliances'} ${withAlarm ? 'with a carbon monoxide alarm' : 'without a new alarm'}`}>Enquire about this check <ArrowUpRight size={18} /></a>
    </article>)}</div>
    <div className="pricing-notes"><div><Info size={18} /><p><strong>Please arrange property access before booking.</strong> We’re currently unable to certify Powermax boilers.</p></div><p>Servicing, repairs and additional appliances are quoted separately. Ram will confirm the scope and final total before you book. For more than three appliances or multiple properties, <a href="#contact">request a quote</a>.</p></div>
  </div></section>;
}
