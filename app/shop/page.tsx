import { Animate, Stagger, StaggerItem } from "@/components/Animate";

const categories = [
  { id: "rifles",      label: "Puške",                  icon: "⬡", desc: "AEG, Spring i Gas puške — M4, AK, snajperi i više" },
  { id: "pistols",     label: "Pištolji",               icon: "⬡", desc: "CO₂ i Green Gas pištolji za CQB i backup" },
  { id: "ammo",        label: "Metci (BB)",              icon: "⬡", desc: "BB kuglice 6mm raznih gramatura — 0.20g, 0.25g, 0.28g" },
  { id: "gear",        label: "Odijela & Taktička oprema", icon: "⬡", desc: "Woodland, multicam, urban — odijela i prsluci" },
  { id: "helmets",     label: "Kacige & Zaštita",        icon: "⬡", desc: "Taktičke kacige, zaštitne naočare i maske" },
  { id: "accessories", label: "Dodaci",                  icon: "⬡", desc: "Silenceri, rukovati, optika, baterije i punjači" },
];

export default function ShopPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-dark/0 to-mil-dark" />
        <div className="relative max-w-7xl mx-auto">
          <Animate variant="fadeIn">
            <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Oprema & Oružje</span>
          </Animate>
          <Animate variant="slideUp" delay={0.1}>
            <h1 className="section-title text-5xl sm:text-7xl font-bold text-white mb-4">SHOP</h1>
          </Animate>
          <Animate variant="slideLeft" delay={0.2}>
            <div className="w-16 h-0.5 bg-mil-gold mb-6" />
          </Animate>
          <Animate variant="fadeIn" delay={0.3}>
            <p className="text-mil-text/60 max-w-xl text-sm leading-relaxed">
              Airsoft replike, oprema, zaštita i dodaci — sve na jednom
              mjestu. Shop dolazi uskoro.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── Coming Soon Banner ── */}
      <Animate variant="slideDown">
        <section className="py-4 px-4 sm:px-6 bg-mil-green-mid/10 border-b border-mil-green-mid/30">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="w-2 h-2 bg-mil-green-light rounded-full pulse-dot" />
            <p className="text-mil-green-light text-sm tracking-[0.15em] uppercase font-semibold"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              Online prodavnica — u pripremi. Kontaktirajte nas direktno za kupovinu opreme.
            </p>
          </div>
        </section>
      </Animate>

      {/* ── Categories ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Kategorije</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-white">
                Šta ćemo <span className="text-mil-green-light">nuditi</span>
              </h2>
            </Animate>
          </div>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
            {categories.map((cat) => (
              <StaggerItem key={cat.id} variant="scaleUp">
                <div className="relative bg-mil-card border border-mil-border p-8 clip-corner group overflow-hidden transition-all duration-200 hover:border-mil-border/60 glow-on-hover">
                  {/* Disabled overlay on hover */}
                  <div className="absolute inset-0 bg-mil-dark/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="text-mil-text/40 text-xs tracking-[0.3em] uppercase"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>Uskoro dostupno</span>
                  </div>
                  <span className="text-mil-green-light text-3xl block mb-4 opacity-40 group-hover:opacity-20 transition-opacity">
                    {cat.icon}
                  </span>
                  <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-3"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {cat.label}
                  </h3>
                  <p className="text-mil-text/40 text-xs leading-relaxed">{cat.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Empty product area ── */}
      <section className="py-16 px-4 sm:px-6 bg-mil-card border-t border-mil-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Animate variant="fadeIn">
              <h2 className="section-title text-2xl font-bold text-white uppercase">Proizvodi</h2>
            </Animate>
            <Animate variant="fadeIn">
              <span className="text-mil-muted text-xs tracking-[0.2em] uppercase">0 proizvoda</span>
            </Animate>
          </div>

          <Animate variant="scaleIn" delay={0.1}>
            <div className="border border-dashed border-mil-border p-16 sm:p-24 text-center clip-corner">
              <div className="w-16 h-16 border-2 border-mil-border mx-auto mb-6 flex items-center justify-center float-anim">
                <span className="text-mil-border text-2xl">⬡</span>
              </div>
              <h3 className="text-mil-text/30 text-lg font-bold uppercase tracking-[0.2em] mb-3"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                Proizvodi dolaze uskoro
              </h3>
              <p className="text-mil-muted text-xs leading-relaxed max-w-sm mx-auto mb-8">
                Radimo na postavljanju online prodavnice. Za sada, kontaktirajte
                nas direktno za informacije o dostupnoj opremi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+38269566781"
                  className="inline-flex items-center justify-center px-6 py-3 bg-mil-green-mid hover:bg-mil-green-light text-white text-xs font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all hover:scale-105"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  +382 69 566 781
                </a>
                <a href="https://www.instagram.com/yarilo_airsoft/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-mil-border hover:border-mil-gold text-mil-text/50 hover:text-mil-gold text-xs font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all hover:scale-105"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  Instagram DM
                </a>
              </div>
            </div>
          </Animate>
        </div>
      </section>
    </>
  );
}
