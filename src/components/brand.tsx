export function Flame({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 80 100" fill="none" aria-hidden="true">
    <path d="M49 3C29 25 48 39 57 59c6 13 2 25-7 33 23-5 29-23 21-42C65 35 48 23 49 3Z" fill="#F7A530"/>
    <path d="M49 3c-2 20 8 30 17 46 7 12 10 23 3 34 16-21-1-43-11-58C52 17 50 10 49 3Z" fill="#F46B40"/>
    <path d="M27 24C23 45 5 48 5 67c0 8 4 16 11 21-5-14 2-23 10-33 9-12 6-20 1-31Z" fill="#E74459"/>
    <path d="M5 56C-3 79 9 95 28 97l7-14C16 85 9 74 5 56Z" fill="#9D5BA8"/>
    <path d="M11 84c8 14 26 20 42 11l-3-16C35 89 23 90 11 84Z" fill="#49A9D1"/>
    <path d="M50 79c-3 7-6 14-7 20 15-1 27-10 29-25l-15-7c0 4-3 9-7 12Z" fill="#80AC52"/>
  </svg>;
}
export function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/" aria-label="MK Gas Safety home"><Flame/><span><strong>MK<span className="brand-dot">.</span></strong><span className="brand-sub">GAS SAFETY</span></span></a>;
}
