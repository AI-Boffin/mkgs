import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:site.publicIndexing?{userAgent:'*',allow:'/'}:{userAgent:'*',disallow:'/'},sitemap:`${site.url}/sitemap.xml`};}
