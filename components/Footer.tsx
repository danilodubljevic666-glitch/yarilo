import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "Početna" },
  { href: "/events", label: "Eventi" },
  { href: "/gallery", label: "Galerija" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "O nama" },
  { href: "/contact", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-mil-card border-t border-mil-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 clip-corner-sm overflow-hidden relative">
                  <Image
                    src="/yariloLogo.jpg"
                    alt="Yarilo Logo"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-mil-gold" />
              </div>
              <div>
                <span
                  className="text-xl font-bold tracking-[0.2em] text-white uppercase block leading-none"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  YARILO
                </span>
                <span className="text-[9px] tracking-[0.3em] text-mil-gold uppercase leading-none">
                  Airsoft Klub
                </span>
              </div>
            </div>
            <p className="text-mil-text/50 text-sm leading-relaxed max-w-xs">
              Airsoft sportsko udruženje iz Crne Gore. Zabava, fer-plej i
              taktika na svakom terenu.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase text-mil-gold font-semibold mb-4"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Navigacija
            </h4>
            <ul className="space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-mil-text/50 hover:text-mil-gold text-sm transition-colors tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase text-mil-gold font-semibold mb-4"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-mil-text/50">
              <li className="flex items-start gap-2">
                <span className="text-mil-green-light mt-0.5">&#9679;</span>
                Podgorica, Crna Gora
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mil-green-light mt-0.5">&#9679;</span>
                <a href="tel:+38269566781" className="hover:text-mil-gold transition-colors">
                  +382 69 566 781
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mil-green-light mt-0.5">&#9679;</span>
                <a
                  href="mailto:glavatovic.nemanja2000@gmail.com"
                  className="hover:text-mil-gold transition-colors break-all"
                >
                  glavatovic.nemanja2000@gmail.com
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/yarilo_airsoft/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-mil-surface border border-mil-border hover:border-mil-gold text-mil-text/60 hover:text-mil-gold text-xs tracking-[0.15em] uppercase transition-colors"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                Instagram
              </a>
              <a
                href="https://invite.viber.com/?g=kUuxjNS7M1NsP9Gn7y4d5IVKle9h2dpN"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-mil-surface border border-mil-border hover:border-mil-green-light text-mil-text/60 hover:text-mil-green-light text-xs tracking-[0.15em] uppercase transition-colors"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                Viber
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-mil-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-mil-text/30">
          <span>© 2024 Yarilo Airsoft Klub. Sva prava zadržana.</span>
          <span>Dizajn: Nemanja Glavatović</span>
        </div>
      </div>
    </footer>
  );
}
