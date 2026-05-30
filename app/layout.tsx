import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yarilo Airsoft Klub | Crna Gora",
  description:
    "Yarilo je airsoft klub iz Crne Gore koji organizuje skirmish mečeve, mil-sim operacije i treninge. Pridruži se našem timu u Podgorici.",
  keywords: "airsoft, klub, Crna Gora, Podgorica, skirmish, mil-sim, Yarilo",
  icons: {
    icon: "/yariloLogo.jpg",
    shortcut: "/yariloLogo.jpg",
    apple: "/yariloLogo.jpg",
  },
  openGraph: {
    title: "Yarilo Airsoft Klub",
    description: "Airsoft klub iz Crne Gore — skirmish, mil-sim, treninzi.",
    locale: "sr_ME",
    type: "website",
    images: [{ url: "/yariloLogo.jpg", width: 800, height: 600 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr" className={rajdhani.variable}>
      <body className="min-h-screen flex flex-col bg-mil-dark text-mil-text antialiased">
        {children}
      </body>
    </html>
  );
}
