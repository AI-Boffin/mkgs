import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/lib/site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Gas Safety Checks in Milton Keynes, Buckingham & Newport Pagnell | MK Gas Safety', template: '%s | MK Gas Safety' },
  description: 'Arrange landlord gas safety checks, CP12 records and home gas safety checks with Ram. Serving Milton Keynes, Buckingham and Newport Pagnell. Enquire by email.',
  applicationName: site.name,
  robots: { index: site.publicIndexing, follow: site.publicIndexing },
  openGraph: { type: 'website', locale: 'en_GB', siteName: site.name, title: 'Gas safety checks & landlord certificates | MK Gas Safety', description: 'Domestic gas appliance and flue safety checks with Ram in Milton Keynes, Buckingham and Newport Pagnell.', images: [{url:'/og-image.png',width:1200,height:630,alt:'MK Gas Safety — gas safety checks and landlord certificates'}] },
  twitter: {card:'summary_large_image'},
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = {themeColor:'#f8f7f3'};
export default function RootLayout({ children }: Readonly<{children:React.ReactNode}>) {
  return <html lang="en-GB"><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>;
}
