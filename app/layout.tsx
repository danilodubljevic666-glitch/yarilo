import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/context/PreloaderContext";

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
        {/*
          Inline script — runs SYNCHRONOUSLY before any JS bundle loads.
          Creates a dark overlay that hides page content on mobile while
          the React preloader component is not yet hydrated.
          The React Preloader removes this element when it mounts.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var el=document.createElement('div');
  el.id='preloader-static';
  el.style.cssText='position:fixed;inset:0;z-index:9998;background:#0a0a0a;display:flex;align-items:center;justify-content:center;';
  el.innerHTML='<img src="/yariloLogo.jpg" style="width:72px;height:72px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);object-fit:cover;" alt="" />';
  document.body.appendChild(el);
})();`,
          }}
        />
        <PreloaderProvider>
          <Preloader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PreloaderProvider>
      </body>
    </html>
  );
}
