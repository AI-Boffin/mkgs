import type { MetadataRoute } from 'next';
import { areas, site } from '@/lib/site';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return [{url:site.url+'/',changeFrequency:'monthly',priority:1},...areas.map(area=>({url:`${site.url}/areas/${area.slug}/`,changeFrequency:'monthly' as const,priority:.8})),{url:site.url+'/privacy/',changeFrequency:'yearly',priority:.2}];}
