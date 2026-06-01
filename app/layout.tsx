import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yarilo-airsoft.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yarilo Airsoft Klub | Crna Gora",
    template: "%s | Yarilo Airsoft Klub",
  },
  description:
    "Yarilo Airsoft Klub iz Crne Gore — organizujemo skirmish mečeve, mil-sim operacije i treninge u Podgorici i širom Crne Gore. Pridruži se Yarilo airsoft ekipi!",
  keywords:
    "airsoft crna gora, airsoft yarilo, yarilo, yarilo airsoft klub, airsoft podgorica, airsoft klub crna gora, skirmish crna gora, mil-sim crna gora, airsoft oprema crna gora",
  authors: [{ name: "Yarilo Airsoft Klub" }],
  creator: "Yarilo Airsoft Klub",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: "/yariloLogo.jpg",
    shortcut: "/yariloLogo.jpg",
    apple: "/yariloLogo.jpg",
  },
  openGraph: {
    title: "Yarilo Airsoft Klub | Crna Gora",
    description: "Yarilo Airsoft Klub iz Crne Gore — skirmish, mil-sim, treninzi u Podgorici.",
    url: siteUrl,
    siteName: "Yarilo Airsoft Klub",
    locale: "sr_ME",
    type: "website",
    images: [{ url: "/yariloLogo.jpg", width: 800, height: 600, alt: "Yarilo Airsoft Klub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yarilo Airsoft Klub | Crna Gora",
    description: "Yarilo Airsoft Klub iz Crne Gore — skirmish, mil-sim, treninzi.",
    images: ["/yariloLogo.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Yarilo Airsoft Klub",
  description:
    "Airsoft klub iz Crne Gore koji organizuje skirmish mečeve, mil-sim operacije i treninge u Podgorici.",
  url: siteUrl,
  logo: `${siteUrl}/yariloLogo.jpg`,
  image: `${siteUrl}/yariloLogo.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Podgorica",
    addressCountry: "ME",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+382-69-566-781",
    contactType: "customer support",
  },
  sameAs: ["https://www.instagram.com/yarilo_airsoft/"],
  sport: "Airsoft",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={rajdhani.variable}>
      <body className="min-h-screen flex flex-col bg-mil-dark text-mil-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
