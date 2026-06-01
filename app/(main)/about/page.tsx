import type { Metadata } from "next";
import Image from "next/image";
import { Animate, Stagger, StaggerItem } from "@/components/Animate";

export const metadata: Metadata = {
  title: "O Klubu",
  description:
    "Upoznajte Yarilo Airsoft Klub — naš tim, misiju i vrijednosti. Airsoft klub iz Podgorice koji okuplja strastvene igrače širom Crne Gore.",
  keywords:
    "yarilo airsoft tim, yarilo airsoft klub crna gora, airsoft crna gora, yarilo, o klubu, airsoft podgorica tim",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "O Klubu | Yarilo Airsoft Klub",
    description:
      "Upoznajte Yarilo Airsoft Klub — naš tim, misiju i vrijednosti. Airsoft klub iz Podgorice.",
    url: "/about",
  },
};

const team = [
  {
    name: "Nemanja Glavatović",
    role: "Osnivač",
    initials: "NG",
    photo: "/images/person_12.jpg",
    desc: "Osnivač i vođa kluba. Odgovoran za koordinaciju, strategiju i viziju razvoja Yarilo airsoft kluba.",
    accentColor: "bg-mil-green-mid",
    borderColor: "hover:border-mil-green-mid",
    tagColor: "text-mil-green-light",
  },
  {
    name: "Ivan Jovanović",
    role: "Koordinator",
    initials: "IJ",
    photo: "/images/person_15.jpg",
    desc: "Koordinira događaje, organizuje termine mečeva i vodi komunikaciju sa igračima.",
    accentColor: "bg-mil-gold/80",
    borderColor: "hover:border-mil-gold",
    tagColor: "text-mil-gold",
  },
  {
    name: "Nina Glavatović",
    role: "Vođa tima — Napad",
    initials: "NiG",
    photo: null,
    desc: "Predvodi napadačku liniju na terenu. Fokus na taktičku ofenzivu i koordinaciju pod pritiskom.",
    accentColor: "bg-mil-green-light/70",
    borderColor: "hover:border-mil-green-light",
    tagColor: "text-mil-green-light",
  },
  {
    name: "Luka Damjanović",
    role: "Vođa tima — Odbrana",
    initials: "LD",
    photo: null,
    desc: "Specijalizovan za defanzivne taktike i pozicioniranje. Osigurava zaštitu strateških tačaka.",
    accentColor: "bg-mil-gold-light/60",
    borderColor: "hover:border-mil-gold-light",
    tagColor: "text-mil-gold-light",
  },
];

const leaderDuties = [
  "Koordinacija i motivacija tima na terenu",
  "Obezbeđivanje poštovanja bezbjednosnih pravila",
  "Organizovanje redovnih treninga i vježbi",
  "Razvoj taktičkih strategija za mečeve",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 border-b border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-dark/0 to-mil-dark" />
        <div className="relative max-w-7xl mx-auto">
          <Animate variant="fadeIn">
            <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Tim & Klub</span>
          </Animate>
          <Animate variant="slideUp" delay={0.1}>
            <h1 className="section-title text-5xl sm:text-7xl font-bold text-white mb-4">O NAMA</h1>
          </Animate>
          <Animate variant="slideLeft" delay={0.2}>
            <div className="w-16 h-0.5 bg-mil-gold mb-6" />
          </Animate>
          <Animate variant="fadeIn" delay={0.3}>
            <p className="text-mil-text/60 max-w-xl text-sm leading-relaxed">
              Yarilo je više od airsoft kluba — to je zajednica igrača koji
              dijele strast prema taktičkim igrama i fer-plej kulturi.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Misija kluba</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-4xl sm:text-5xl font-bold text-white mb-6">
                Zašto <span className="text-mil-green-light">Yarilo?</span>
              </h2>
            </Animate>
            <Animate variant="slideLeft" delay={0.15}>
              <div className="w-16 h-0.5 bg-mil-gold mb-8" />
            </Animate>
            <Animate variant="slideUp" delay={0.2}>
              <p className="text-mil-text/70 leading-relaxed mb-6">
                Yarilo je osnovan sa idejom da airsoft u Crnoj Gori dobije
                organizovanu i profesionalnu zajednicu — od početnika do
                naprednih igrača.
              </p>
            </Animate>
            <Animate variant="slideUp" delay={0.3}>
              <p className="text-mil-text/70 leading-relaxed mb-6">
                Naš fokus je na timskom radu, taktičkoj igri i bezbjednosti
                svakog igrača. Organizujemo redovne mečeve na raznim terenima
                širom Crne Gore.
              </p>
            </Animate>
            <Animate variant="slideUp" delay={0.4}>
              <blockquote className="border-l-2 border-mil-gold pl-6 py-2">
                <p className="text-mil-text/80 text-sm italic leading-relaxed">
                  &ldquo;Zabava je na samom vrhu kluba jer na kraju dana je najbitnije
                  da svi doma odemo srećni i zadovoljni sa utiscima koje možemo
                  prepričati rodbini i prijateljima.&rdquo;
                </p>
                <span className="text-mil-gold text-xs tracking-[0.2em] uppercase mt-3 block">
                  — Yarilo Klub
                </span>
              </blockquote>
            </Animate>
          </div>

          <Animate variant="slideRight" delay={0.2}>
            <div className="bg-mil-card border border-mil-border p-8 clip-corner">
              <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-6"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                Odgovornosti lidera
              </h3>
              <ul className="space-y-4">
                {leaderDuties.map((duty, i) => (
                  <li key={duty} className="flex items-start gap-4 group">
                    <span className="text-mil-green-light text-xs mt-1 font-bold flex-shrink-0"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-mil-text/70 text-sm leading-relaxed group-hover:text-mil-text transition-colors">
                      {duty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 px-4 sm:px-6 bg-mil-card border-y border-mil-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Admin tim</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-4xl sm:text-5xl font-bold text-white">
                Naš <span className="text-mil-green-light">tim</span>
              </h2>
            </Animate>
            <Animate variant="scaleIn" delay={0.2}>
              <div className="w-16 h-0.5 bg-mil-gold mx-auto mt-6" />
            </Animate>
          </div>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {team.map((member) => (
              <StaggerItem key={member.name} variant="scaleUp">
                <div className={`bg-mil-surface border border-mil-border ${member.borderColor} p-6 clip-corner group transition-all duration-300 overflow-hidden glow-on-hover`}>
                  {/* Avatar / Photo */}
                  <div className="mb-5">
                    {member.photo ? (
                      <div className="relative w-16 h-16 clip-corner overflow-hidden">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          sizes="64px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mil-dark/40" />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 ${member.accentColor} clip-corner-sm flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg tracking-widest"
                          style={{ fontFamily: "var(--font-rajdhani)" }}>
                          {member.initials}
                        </span>
                      </div>
                    )}
                  </div>

                  <span className={`${member.tagColor} text-[10px] tracking-[0.3em] uppercase block mb-2 font-semibold`}
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {member.role}
                  </span>
                  <h3 className="text-white font-bold text-lg tracking-wide mb-3 group-hover:text-mil-green-light transition-colors"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {member.name}
                  </h3>
                  <p className="text-mil-text/50 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Locations ── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <Animate variant="fadeIn">
              <span className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Tereni</span>
            </Animate>
            <Animate variant="slideUp" delay={0.1}>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-white">
                Gdje <span className="text-mil-green-light">igramo</span>
              </h2>
            </Animate>
          </div>
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4" staggerDelay={0.1}>
            {[
              { name: "Fabrija OBOD",    city: "Cetinje",     cap: "Do 100 igrača", img: "/images/gallery_99.jpg" },
              { name: "Motel Glava Zete", city: "Danilovgrad", cap: "Do 70 igrača",  img: "/images/gallery_98.jpg" },
              { name: "Sportska Dvorana", city: "Zeta",        cap: "Do 16 igrača",  img: "/images/gallery_97.jpg" },
            ].map((loc) => (
              <StaggerItem key={loc.name}>
                <div className="bg-mil-card border border-mil-border clip-corner hover:border-mil-green-mid transition-all duration-300 group glow-on-hover overflow-hidden">
                  {/* Location image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={loc.img}
                      alt={loc.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mil-card via-mil-dark/30 to-transparent" />
                  </div>
                  {/* Text */}
                  <div className="p-5">
                    <div className="w-6 h-0.5 bg-mil-green-light mb-3 group-hover:w-full transition-all duration-500" />
                    <h3 className="text-white font-bold tracking-wide uppercase mb-1"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {loc.name}
                    </h3>
                    <p className="text-mil-gold text-xs mb-1 tracking-wide">{loc.city}</p>
                    <p className="text-mil-muted text-xs">{loc.cap}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
