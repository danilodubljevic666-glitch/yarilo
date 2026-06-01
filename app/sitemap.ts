import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yarilo-airsoft.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/events`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/shop`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/gallery`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
