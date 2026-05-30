import Image from "next/image";
import { Animate, Stagger, StaggerItem } from "@/components/Animate";

const events = [
  {
    id: 1,
    title: "Fabrija OBOD",
    location: "Cetinje",
    date: "07. Nov 2024",
    capacity: "50 vs 50",
    status: "upcoming",
    image: "/images/gallery_99.jpg",
    description:
      "Stara fabrika OBOD na Cetinju je jedan od većih mapa u Crnoj Gori. Napušteni industrijski kompleks pruža izuzetno taktičke mogućnosti — uski hodnici, otvorena dvorišta i višespratni objekti. Predviđeni broj igrača na mapi je 50 vs 50.",
    tags: ["Mil-sim", "Industrijsko", "Veliki tim"],
    type: "MIL-SIM",
  },
  {
    id: 2,
    title: "Motel Glava Zete",
    location: "Danilovgrad",
    date: "11. Jul 2024",
    capacity: "35 vs 35 / 15 vs 15",
    status: "past",
    image: "/images/gallery_98.jpg",
    description:
      "Motel Glava Zete je stari napušteni hotel koji nudi dva terena — veći za 35 vs 35 igrača i manji za 15 vs 15. Idealno za iskusne timove koji žele raznovrsnu taktiku na jednoj lokaciji.",
    tags: ["2 terena", "Hotel", "Scenariji"],
    type: "SKIRMISH",
  },
  {
    id: 3,
    title: "Sportska Dvorana Zeta",
    location: "Zeta",
    date: "11. Jul 2024",
    capacity: "8 vs 8",
    status: "past",
    image: "/images/gallery_97.jpg",
    description:
      "Nedovršena sportska dvorana u Zeti — kompaktan teren koji podržava 8 vs 8 igrača. Savršeno za brze, intenzivne mečeve sa kratkim distancama i konstantnim akcijama.",
    tags: ["CQB", "Indoor", "Brza igra"],
    type: "CQB",
  },
];

const eventTypes = [
  { type: "Skirmish", desc: "Kraći, brži mečevi između dva tima na manjim terenima — od nekoliko minuta do nekoliko sati." },
  { type: "Mil-sim",  desc: "Simuliraju vojnu misiju sa realističnim scenarijima, opremom i pravilima. Mogu trajati danima." },
  { type: "Scenario", desc: "Igre temeljene na scenarijima: zaštita objekta, sabotiranje, spasavanje talaca i slično." },
  { type: "Turniri",  desc: "Takmičenja između timova sa detaljnim pravilima i sistem bodovanja." },
];

export default function EventsPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-dark/0 to-mil-dark" />
        <div className="relative max-w-7xl mx-auto">
          <Animate variant="fadeIn">
            <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Tereni & Mečevi</span>
          </Animate>
          <Animate variant="slideUp" delay={0.1}>
            <h1 className="section-title text-5xl sm:text-7xl font-bold text-white mb-4">EVENTI</h1>
          </Animate>
          <Animate variant="slideLeft" delay={0.2}>
            <div className="w-16 h-0.5 bg-mil-gold mb-6" />
          </Animate>
          <Animate variant="fadeIn" delay={0.3}>
            <p className="text-mil-text/60 max-w-xl text-sm leading-relaxed">
              Pratite nadolazeće mečeve, skirmish eventi i mil-sim operacije
              Yarilo Airsoft kluba širom Crne Gore.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── Events list ── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Stagger className="space-y-6" staggerDelay={0.12}>
            {events.map((event) => (
              <StaggerItem key={event.id} variant="slideLeft">
                <div className={`relative bg-mil-card border border-mil-border clip-corner overflow-hidden group hover:border-mil-green-mid transition-all duration-300 glow-on-hover ${
                  event.status === "upcoming"
                    ? "border-l-4 border-l-mil-green-light"
                    : "border-l-2 border-l-mil-border"
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">

                    {/* ── Map image ── */}
                    <div className="relative h-48 md:h-auto min-h-[200px] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={`${event.title} — airsoft teren`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-mil-card/80 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-mil-card/80 to-transparent md:hidden" />

                      {/* Type badge on image */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-[10px] px-2 py-1 tracking-[0.2em] uppercase font-semibold bg-mil-dark/80 border border-mil-gold/40 text-mil-gold"
                          style={{ fontFamily: "var(--font-rajdhani)" }}
                        >
                          {event.type}
                        </span>
                      </div>

                      {/* Status badge */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className={`text-[10px] px-2 py-1 tracking-[0.2em] uppercase font-semibold ${
                            event.status === "upcoming"
                              ? "bg-mil-green-mid/90 text-white"
                              : "bg-mil-dark/80 text-mil-muted border border-mil-border"
                          }`}
                          style={{ fontFamily: "var(--font-rajdhani)" }}
                        >
                          {event.status === "upcoming" ? "● Nadolazeći" : "Odigrano"}
                        </span>
                      </div>
                    </div>

                    {/* ── Content ── */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <h2
                          className="text-white text-2xl sm:text-3xl font-bold tracking-wide mb-1 group-hover:text-mil-green-light transition-colors duration-300"
                          style={{ fontFamily: "var(--font-rajdhani)" }}
                        >
                          {event.title}
                        </h2>
                        <p className="text-mil-gold text-sm mb-4 tracking-wide flex items-center gap-2">
                          <span className="text-mil-green-light text-[10px]">▸</span>
                          {event.location}
                        </p>
                        <p className="text-mil-text/60 text-sm leading-relaxed mb-5">{event.description}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-mil-surface border border-mil-border text-mil-muted text-[10px] tracking-[0.15em] uppercase"
                              style={{ fontFamily: "var(--font-rajdhani)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex gap-8 pt-4 border-t border-mil-border">
                        <div>
                          <span className="text-mil-muted text-[10px] tracking-[0.2em] uppercase block mb-1">Datum</span>
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-rajdhani)" }}>
                            {event.date}
                          </span>
                        </div>
                        <div>
                          <span className="text-mil-muted text-[10px] tracking-[0.2em] uppercase block mb-1">Kapacitet</span>
                          <span className="text-mil-green-light font-semibold text-sm" style={{ fontFamily: "var(--font-rajdhani)" }}>
                            {event.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom hover line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-mil-green-mid scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Event types ── */}
      <section className="py-16 px-4 sm:px-6 bg-mil-card border-t border-mil-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Formati igre</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-white">
                Tipovi <span className="text-mil-green-light">eventi</span>
              </h2>
            </Animate>
          </div>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
            {eventTypes.map((et, i) => (
              <StaggerItem key={et.type} variant="scaleIn">
                <div className="bg-mil-surface border border-mil-border p-6 clip-corner hover:border-mil-green-mid transition-all duration-200 group glow-on-hover h-full">
                  <span className="text-[10px] tracking-[0.3em] text-mil-muted block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-mil-green-light font-bold text-lg tracking-wide uppercase mb-3 group-hover:tracking-[0.25em] transition-all duration-300"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {et.type}
                  </h3>
                  <p className="text-mil-text/50 text-xs leading-relaxed">{et.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="py-14 px-4 sm:px-6 text-center">
        <Animate variant="slideUp">
          <p className="text-mil-text/50 text-sm mb-6 leading-relaxed">
            Zainteresovan za učešće? Pridruži se Viber grupi ili nas kontaktiraj putem Instagrama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://invite.viber.com/?g=kUuxjNS7M1NsP9Gn7y4d5IVKle9h2dpN"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 bg-mil-green-mid hover:bg-mil-green-light text-white text-sm font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all hover:scale-105"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              Pridruži se Viber grupi
            </a>
            <a href="https://www.instagram.com/yarilo_airsoft/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 border border-mil-border hover:border-mil-gold text-mil-text/60 hover:text-mil-gold text-sm font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all hover:scale-105"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              @yarilo_airsoft
            </a>
          </div>
        </Animate>
      </section>
    </>
  );
}
