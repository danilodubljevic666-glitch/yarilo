import { Animate, Stagger, StaggerItem } from "@/components/Animate";

const contactInfo = [
  { label: "Lokacija",         value: "Podgorica, Crna Gora",                  href: null },
  { label: "Telefon / Viber",  value: "+382 69 566 781",                        href: "tel:+38269566781" },
  { label: "Email",            value: "glavatovic.nemanja2000@gmail.com",        href: "mailto:glavatovic.nemanja2000@gmail.com" },
  { label: "Instagram",        value: "@yarilo_airsoft",                         href: "https://www.instagram.com/yarilo_airsoft/" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-dark/0 to-mil-dark" />
        <div className="relative max-w-7xl mx-auto">
          <Animate variant="fadeIn">
            <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Stupite u kontakt</span>
          </Animate>
          <Animate variant="slideUp" delay={0.1}>
            <h1 className="section-title text-5xl sm:text-7xl font-bold text-white mb-4">KONTAKT</h1>
          </Animate>
          <Animate variant="slideLeft" delay={0.2}>
            <div className="w-16 h-0.5 bg-mil-gold mb-6" />
          </Animate>
          <Animate variant="fadeIn" delay={0.3}>
            <p className="text-mil-text/60 max-w-xl text-sm leading-relaxed">
              Imate pitanja o airsoft opremi, igrama ili željite da se pridružite
              klubu? Javite nam se putem bilo kojeg kanala.
            </p>
          </Animate>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Contact info ── */}
          <div>
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Informacije</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-white mb-8">
                Pronađite nas
              </h2>
            </Animate>

            <Stagger className="space-y-4 mb-10" staggerDelay={0.08}>
              {contactInfo.map((item) => (
                <StaggerItem key={item.label} variant="slideLeft">
                  <div className="bg-mil-card border border-mil-border p-5 clip-corner hover:border-mil-green-mid transition-all duration-200 group glow-on-hover">
                    <span className="text-mil-muted text-[10px] tracking-[0.3em] uppercase block mb-2">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white font-semibold text-sm group-hover:text-mil-gold transition-colors break-all"
                        style={{ fontFamily: "var(--font-rajdhani)" }}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white font-semibold text-sm"
                        style={{ fontFamily: "var(--font-rajdhani)" }}>
                        {item.value}
                      </span>
                    )}
                    <div className="mt-3 h-px bg-mil-green-mid scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Animate variant="slideUp" delay={0.3}>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/yarilo_airsoft/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-4 bg-mil-surface border border-mil-border hover:border-mil-gold text-center text-mil-text/60 hover:text-mil-gold text-xs tracking-[0.2em] uppercase font-semibold clip-corner transition-all hover:scale-105"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  Instagram
                </a>
                <a href="https://invite.viber.com/?g=kUuxjNS7M1NsP9Gn7y4d5IVKle9h2dpN"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-4 bg-mil-green-mid hover:bg-mil-green-light text-center text-white text-xs tracking-[0.2em] uppercase font-semibold clip-corner transition-all hover:scale-105"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  Viber Grupa
                </a>
              </div>
            </Animate>
          </div>

          {/* ── Message form ── */}
          <Animate variant="slideRight" delay={0.2}>
            <div>
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Pošaljite poruku</span>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-white mb-8">
                Pišite nam
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {["Ime", "Prezime"].map((lbl) => (
                    <div key={lbl}>
                      <label className="text-[10px] tracking-[0.3em] uppercase text-mil-muted block mb-2"
                        style={{ fontFamily: "var(--font-rajdhani)" }}>
                        {lbl}
                      </label>
                      <input type="text" placeholder={`Vaše ${lbl.toLowerCase()}`}
                        className="w-full bg-mil-card border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/50 transition-colors clip-corner-sm" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-mil-muted block mb-2"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>Email</label>
                  <input type="email" placeholder="vas@email.com"
                    className="w-full bg-mil-card border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/50 transition-colors clip-corner-sm" />
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-mil-muted block mb-2"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>Poruka</label>
                  <textarea rows={5} placeholder="Vaša poruka..."
                    className="w-full bg-mil-card border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/50 transition-colors clip-corner-sm resize-none" />
                </div>

                <button type="button"
                  className="w-full py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  Pošalji poruku →
                </button>

                <p className="text-mil-muted text-xs text-center">
                  Forma će biti aktivna nakon povezivanja sa email servisom.
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>
    </>
  );
}
