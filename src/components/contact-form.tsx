'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { site } from '@/lib/site';
export function ContactForm() {
  const [status,setStatus] = useState<'idle'|'sending'|'draft'|'sent'|'error'>('idle');
  const [draft,setDraft] = useState('');
  const [copied,setCopied] = useState(false);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form=event.currentTarget;
    const data=new FormData(form);
    if(data.get('website')) return;
    const email=String(data.get('email')||'').trim();
    const text=`Gas safety enquiry\n\nName: ${data.get('name')}\nEmail: ${email}\nArea: ${data.get('area')}\nProperty postcode: ${String(data.get('postcode')).toUpperCase()}\nService: ${data.get('service')}\nAppliances: ${data.get('appliances')}\nPreferred timing / due date: ${data.get('timing')||'Flexible'}\n\n${data.get('message')||'Please email me to discuss a gas safety check.'}`;
    setDraft(text); setCopied(false);
    if(site.contactEndpoint) {
      setStatus('sending');
      try {
        const response=await fetch(site.contactEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(data)),signal:AbortSignal.timeout(15000)});
        if(!response.ok) throw new Error('Delivery failed');
        setStatus('sent');form.reset();
      } catch {setStatus('error');}
    } else {
      setStatus('draft');
      if(site.email) window.location.href=`mailto:${site.email}?subject=${encodeURIComponent('Gas safety enquiry — '+data.get('area'))}&body=${encodeURIComponent(text)}`;
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><span className="step-dot">↗</span><div><h3>Tell Ram about your property.</h3><p>No calls needed. No obligation.</p></div></div>
    <div className="form-grid"><label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="First and last name" maxLength={100} required/></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.co.uk" maxLength={254} required/></label><label>Property area <span>*</span><select name="area" required defaultValue=""><option value="" disabled>Select your area</option><option>Milton Keynes</option><option>Buckingham</option><option>Newport Pagnell</option></select></label><label>Property postcode <span>*</span><input name="postcode" autoComplete="postal-code" placeholder="e.g. MK9 1AA" maxLength={8} pattern="[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}" title="Enter a full UK postcode, for example MK9 1AA" required/></label><label>What can Ram help with? <span>*</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Landlord gas safety check / CP12</option><option>Homeowner gas safety check</option><option>Letting agent / multiple properties</option><option>Not sure — I’d like some advice</option></select></label><label>Number of gas appliances <span>*</span><select name="appliances" required defaultValue=""><option value="" disabled>Select number</option><option>1 appliance</option><option>2 appliances</option><option>3 or more appliances</option><option>Not sure yet</option></select></label></div>
    <label>Preferred timing or record due date <span className="optional">(optional)</span><input name="timing" placeholder="e.g. Before 30 November, weekday mornings" maxLength={150}/></label>
    <label>Anything else Ram should know? <span className="optional">(optional)</span><textarea name="message" rows={3} placeholder="Appliance types, access arrangements or any questions…" maxLength={3000}/></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this blank<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="consent"><input name="privacy" type="checkbox" value="agreed" required/><span>I’ve read the <a href="/privacy/">privacy notice</a> and understand my details will be used to respond to this enquiry.</span></label>
    <button className="button button-orange form-submit" disabled={status==='sending'} type="submit">{status==='sending'?'Sending your enquiry…':site.contactEndpoint?'Send my enquiry':'Prepare my email enquiry'} <ArrowUpRight size={19}/></button>
    <p className="form-footnote">An enquiry isn’t a confirmed booking. Ram will confirm pricing and availability by email.</p>
    {status==='draft' && <div className="form-result" role="status"><Mail size={23}/><div><strong>{site.email?'Your email draft is ready.':'Your enquiry is ready to preview.'}</strong><p>{site.email?'Your email app should open with the details filled in. Please press send there to contact Ram.':'This preview is awaiting Ram’s enquiry email. Nothing has been sent. You can copy your enquiry below.'}</p><details><summary>View your enquiry</summary><pre>{draft}</pre></details><button type="button" className="copy-button" onClick={async()=>{try{await navigator.clipboard.writeText(draft);setCopied(true);}catch{setCopied(false);}}}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?'Copied':'Copy enquiry'}</button>{site.email && <a className="copy-button" href={`mailto:${site.email}?subject=Gas%20safety%20enquiry&body=${encodeURIComponent(draft)}`}>Open email again</a>}</div></div>}
    {status==='sent'&&<div className="form-result" role="status"><Check/><div><strong>Your enquiry has been sent.</strong><p>Thank you. Ram will reply by email to discuss the next step.</p></div></div>}
    {status==='error'&&<div className="form-result form-error" role="alert"><Mail/><div><strong>Your enquiry could not be sent.</strong><p>Your details are still in the form. Please try again{site.email?<> or <a href={`mailto:${site.email}?body=${encodeURIComponent(draft)}`}>email Ram directly</a></>:'.'}.</p></div></div>}
  </form>;
}
