'use client';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './brand';
export function Header() {
  const [open, setOpen] = useState(false);
  return <><div className="topbar"><span><i/> Your local gas safety specialist</span><span>Milton Keynes <b>·</b> Buckingham <b>·</b> Newport Pagnell</span></div><header className="header"><div className="container nav"><Brand/><nav aria-label="Main navigation" className={open ? 'nav-links is-open' : 'nav-links'}><a onClick={()=>setOpen(false)} href="/#services">Our services</a><a onClick={()=>setOpen(false)} href="/#pricing">Prices</a><a onClick={()=>setOpen(false)} href="/#areas">Areas we cover</a><a onClick={()=>setOpen(false)} href="/#faqs">FAQs</a><a onClick={()=>setOpen(false)} href="/#contact" className="button nav-cta">Enquire by email <ArrowUpRight size={16}/></a></nav><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header></>;
}
