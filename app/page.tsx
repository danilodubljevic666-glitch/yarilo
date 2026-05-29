import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger, StaggerItem } from "@/components/Animate";

const services = [
  { title: "Organizacija igara", desc: "Redovni skirmish mečevi i mil-sim operacije na terenima širom Crne Gore." },
  { title: "Obuka i vježbe", desc: "Treninzi i instrukcije za nove igrače koji tek ulaze u svijet airsoft sporta." },
  { title: "Oprema i savjeti", desc: "Pomoć pri izboru i održavanju opreme — replika, zaštite i odijela." },
  { title: "Fair-play kultura", desc: "Promovišemo pošteno igranje, disciplinu i poštovanje svih učesnika." },
  { title: "Timska takmičenja", desc: "Organizujemo i učestvujemo u turnirima između timova sa jasnim pravilima." },
];

const weaponTypes = [
  {
    type: "SPRING",
    label: "Opruga",
    borderColor: "border-l-mil-green-mid",
    accentColor: "text-mil-green-light",
    desc: "Funkcioniše ručnim povlačenjem klizača za napinjanje opruge. Nema potrebe za gasom ili baterijom. Idealno za početnike.",
    tags: ["Manualno", "Pouzdano", "Pristupačno"],
  },
  {
    type: "AEG",
    label: "Automatska električna puška",
    borderColor: "border-l-mil-gold",
    accentColor: "text-mil-gold",
    desc: "Najpopularniji izbor u airsoftu. Koristi električni motor za automatsko i poluautomatsko ispaljivanje BB kuglica.",
    tags: ["Automatski", "Popularan", "Baterija"],
  },
  {
    type: "CO₂",
    label: "Ugljen-dioksid",
    borderColor: "border-l-mil-green-light",
    accentColor: "text-mil-green-light",
    desc: "Koristi se pretežno u pištoljima i određenim puškama. Male kapsula od 12g oslobađaju gas pod visokim pritiskom.",
    tags: ["Pištolji", "Visoki pritisak", "12g kapsula"],
  },
  {
    type: "GREEN GAS",
    label: "Propan / Butan",
    borderColor: "border-l-mil-gold-light",
    accentColor: "text-mil-gold-light",
    desc: "Propan ili kombinacija propana i butana obogaćena silikonskim uljem. Smanjuje trenje i produžava vijek replika.",
    tags: ["Realistično", "Silikonsko ulje", "Gas magazine"],
  },
];

const stats = [
  { value: "3", label: "Terena u CG" },
  { value: "100+", label: "Max igrača po mapi" },
  { value: "4", label: "Tipa igara" },
  { value: "2024", label: "Godina osnivanja" },
];

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-scanline">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero_1.jpg"
            alt="Yarilo Airsoft"
            fill
            priority
            className="object-cover object-center"
            quality={85}
          />
          {/* Dark military overlay — reduced to let image breathe */}
          <div className="absolute inset-0 bg-gradient-to-br from-mil-dark/80 via-mil-dark/50 to-[#050f03]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-mil-dark via-transparent to-mil-dark/40" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 military-grid hero-grid" />

        {/* Corner accents */}
        <div className="hero-corner absolute top-24 left-6 sm:left-10 w-16 h-16 border-l-2 border-t-2 border-mil-green-mid" />
        <div className="hero-corner absolute top-24 right-6 sm:right-10 w-16 h-16 border-r-2 border-t-2 border-mil-green-mid" />
        <div className="hero-corner absolute bottom-16 left-6 sm:left-10 w-16 h-16 border-l-2 border-b-2 border-mil-green-mid" />
        <div className="hero-corner absolute bottom-16 right-6 sm:right-10 w-16 h-16 border-r-2 border-b-2 border-mil-green-mid" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="hero-line-left w-12 sm:w-20" />
            <span className="hero-badge text-mil-gold text-xs sm:text-sm tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              Crna Gora
            </span>
            <div className="hero-line-right w-12 sm:w-20" />
          </div>

          <h1
            className="hero-title text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-[0.15em] text-white leading-none mb-2"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            YARILO
          </h1>

          <p className="hero-subtitle text-mil-green-light text-lg sm:text-2xl tracking-[0.3em] uppercase mb-8 font-medium"
            style={{ fontFamily: "var(--font-rajdhani)" }}>
            Airsoft Klub
          </p>

          <p className="hero-desc text-mil-text/60 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            U polju u kojem je svaki udarac i svaki manevar nadmetanje za
            superiornost, isticanje nije samo vještina — to je i strategija.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/yarilo_airsoft/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-semibold tracking-[0.15em] uppercase clip-corner transition-all duration-200 hover:scale-105"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              <span>Pridruži se timu</span>
              <span className="text-mil-gold">→</span>
            </a>
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-mil-border hover:border-mil-gold text-mil-text/70 hover:text-mil-gold font-semibold tracking-[0.15em] uppercase clip-corner transition-all duration-200 hover:scale-105"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Nadolazeći eventi
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-mil-text">Scroll</span>
          <div className="hero-scroll-line w-px bg-gradient-to-b from-mil-green-light to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════
          ŠTA JE AIRSOFT
      ════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Animate variant="fadeIn" delay={0}>
                <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  01 — Uvod
                </span>
              </Animate>
              <Animate variant="slideUp" delay={0.1}>
                <h2 className="section-title text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Šta je<br />
                  <span className="text-mil-green-light">Airsoft?</span>
                </h2>
              </Animate>
              <Animate variant="slideLeft" delay={0.2}>
                <div className="w-16 h-0.5 bg-mil-gold mb-8" />
              </Animate>
              <Animate variant="slideUp" delay={0.25}>
                <p className="text-mil-text/70 leading-relaxed mb-6">
                  Airsoft je timska simulacijska igra i sport u kojoj se koriste
                  replike vatrenog oružja koje ispaljuju plastične kuglice
                  (BB-ove) prečnika 6mm ili 8mm.
                </p>
              </Animate>
              <Animate variant="slideUp" delay={0.35}>
                <p className="text-mil-text/70 leading-relaxed">
                  Replike vizuelno imitiraju pravo oružje, a igrači se bore u
                  timovima kroz razne scenarije — od kratkih skirmish mečeva do
                  višednevnih mil-sim operacija koje simuliraju stvarne vojne misije.
                </p>
              </Animate>
            </div>

            {/* Feature cards grid */}
            <Stagger className="grid grid-cols-2 gap-4" staggerDelay={0.1} delayChildren={0.1}>
              {[
                { title: "Replike oružja", desc: "Vizuelno identične pravom oružju, bez opasnosti" },
                { title: "Oprema i zaštita", desc: "Obavezne zaštitne naočare i maska na svakom terenu" },
                { title: "Tipovi igara", desc: "Skirmish, mil-sim i scenariji prema realnim misijama" },
                { title: "Bezbjednost", desc: "Strogo poštovanje pravila i fair-play kultura" },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="bg-mil-card border border-mil-border hover:border-mil-green-mid p-5 clip-corner transition-colors group glow-on-hover h-full">
                    <div className="w-6 h-0.5 bg-mil-green-light mb-4 group-hover:w-10 transition-all duration-300" />
                    <h3 className="text-white font-semibold text-sm tracking-wide mb-2 uppercase"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {item.title}
                    </h3>
                    <p className="text-mil-text/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          GALLERY PREVIEW STRIP
      ════════════════════════════════════ */}
      <section className="py-8 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" staggerDelay={0.06}>
            {[
              { file: "gallery_99.jpg", label: "OBOD" },
              { file: "gallery_98.jpg", label: "Glava Zete" },
              { file: "gallery_97.jpg", label: "Dvorana" },
              { file: "gallery_91.jpg", label: "Event" },
              { file: "gallery_71.jpg", label: "Teren" },
              { file: "gallery_72.jpg", label: "Akcija" },
            ].map(({ file, label }, i) => (
              <StaggerItem key={file} variant="scaleIn">
                <Link href="/gallery" className="block group relative overflow-hidden clip-corner aspect-square img-shimmer">
                  <Image
                    src={`/images/${file}`}
                    alt={`Yarilo airsoft — ${label}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-mil-dark/50 group-hover:bg-mil-dark/10 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 duration-300">
                    <span className="text-[9px] tracking-[0.15em] uppercase text-white bg-mil-dark/70 px-2 py-1 block text-center"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {label}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ════════════════════════════════════
          ŠTA YARILO PRUŽA
      ════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-mil-card border-y border-mil-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Animate variant="fadeIn"><span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>02 — Klub</span></Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-4xl sm:text-5xl font-bold text-white">
                Šta Yarilo <span className="text-mil-green-light">pruža</span>
              </h2>
            </Animate>
            <Animate variant="scaleIn" delay={0.2}>
              <div className="w-16 h-0.5 bg-mil-gold mx-auto mt-6" />
            </Animate>
          </div>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" staggerDelay={0.07}>
            {services.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="relative bg-mil-surface border border-mil-border hover:border-mil-green-mid p-6 clip-corner group transition-all duration-200 glow-on-hover h-full">
                  <span className="text-[10px] tracking-[0.3em] text-mil-muted block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 group-hover:text-mil-green-light transition-colors"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {s.title}
                  </h3>
                  <p className="text-mil-text/50 text-xs leading-relaxed">{s.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-mil-green-mid scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ════════════════════════════════════
          VRSTE REPLIKA
      ════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>03 — Oprema</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-4xl sm:text-5xl font-bold text-white">
                Vrste airsoft <span className="text-mil-green-light">replika</span>
              </h2>
            </Animate>
            <Animate variant="scaleIn" delay={0.2}>
              <div className="w-16 h-0.5 bg-mil-gold mx-auto mt-6" />
            </Animate>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {weaponTypes.map((w) => (
              <StaggerItem key={w.type} variant="scaleUp">
                <div className={`bg-mil-card border border-mil-border border-l-2 ${w.borderColor} p-8 clip-corner hover:bg-mil-surface transition-colors group glow-on-hover`}>
                  <div className="mb-4">
                    <span className={`text-2xl font-bold tracking-[0.2em] ${w.accentColor} block group-hover:tracking-[0.3em] transition-all duration-300`}
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {w.type}
                    </span>
                    <span className="text-mil-text/40 text-xs tracking-wide">{w.label}</span>
                  </div>
                  <p className="text-mil-text/60 text-sm leading-relaxed mb-5">{w.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {w.tags.map((tag) => (
                      <span key={tag}
                        className="px-3 py-1 bg-mil-surface border border-mil-border text-mil-muted text-[10px] tracking-[0.15em] uppercase group-hover:border-mil-border/60 transition-colors"
                        style={{ fontFamily: "var(--font-rajdhani)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════ */}
      <section className="relative py-20 px-4 sm:px-6 bg-mil-card border-y border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto text-center">
          <Animate variant="scaleIn">
            <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-4 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Pridruži se</span>
          </Animate>
          <Animate variant="slideUp" delay={0.1}>
            <h2 className="section-title text-4xl sm:text-5xl font-bold text-white mb-4">
              Spreman za teren?
            </h2>
          </Animate>
          <Animate variant="fadeIn" delay={0.2}>
            <p className="text-mil-text/60 text-sm mb-10 leading-relaxed">
              Zabava je na samom vrhu kluba — jer na kraju dana, najbitnije je
              da svi odemo kući srećni i zadovoljni.
            </p>
          </Animate>
          <Animate variant="slideUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.instagram.com/yarilo_airsoft/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-bold tracking-[0.15em] uppercase clip-corner transition-all hover:scale-105"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                Instagram
              </a>
              <a href="https://invite.viber.com/?g=kUuxjNS7M1NsP9Gn7y4d5IVKle9h2dpN" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-mil-green-mid hover:bg-mil-green-mid/20 text-mil-green-light font-bold tracking-[0.15em] uppercase clip-corner transition-all hover:scale-105"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                Viber Grupa
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS
      ════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label} variant="scaleIn">
                <div>
                  <span className="text-4xl sm:text-5xl font-bold text-mil-green-light block mb-2 float-anim"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {stat.value}
                  </span>
                  <span className="text-mil-muted text-xs tracking-[0.2em] uppercase">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
