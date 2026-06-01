import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Prodavnica Airsoft Opreme",
  description:
    "Kupite airsoft opremu u Crnoj Gori — puške, pištolje, metke, odijela, kacige i dodatke. Yarilo Airsoft Klub nudi kvalitetnu opremu za sve igrače.",
  keywords:
    "airsoft oprema crna gora, airsoft puške crna gora, airsoft pištolji crna gora, airsoft kupovina crna gora, yarilo airsoft shop, airsoft metci crna gora, airsoft odijela crna gora",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Prodavnica Airsoft Opreme | Yarilo Airsoft Klub",
    description:
      "Airsoft oprema u Crnoj Gori — puške, pištolje, metke i dodaci. Yarilo Airsoft Klub.",
    url: "/shop",
  },
};
import { Animate, Stagger, StaggerItem } from "@/components/Animate";
import { CATEGORIES } from "@/types/database";
import type { Product } from "@/types/database";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const supabase = await createClient();
  const { data: products = [] } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const hasProducts = products && products.length > 0;

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
              Airsoft replike, oprema, zaštita i dodaci. Za kupovinu nas kontaktirajte
              direktno putem telefona ili Instagrama.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── Contact banner ── */}
      <Animate variant="slideDown">
        <section className="py-4 px-4 sm:px-6 bg-mil-green-mid/10 border-b border-mil-green-mid/30">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="w-2 h-2 bg-mil-green-light rounded-full pulse-dot" />
            <p className="text-mil-green-light text-sm tracking-[0.1em]"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              Za narudžbu nas kontaktirajte:&nbsp;
              <a href="tel:+38269566781" className="underline hover:text-white transition-colors">
                +382 69 566 781
              </a>
              &nbsp;ili putem&nbsp;
              <a href="https://www.instagram.com/yarilo_airsoft/" target="_blank" rel="noopener noreferrer"
                className="underline hover:text-white transition-colors">
                Instagrama
              </a>
            </p>
          </div>
        </section>
      </Animate>

      {/* ── Products ── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {!hasProducts ? (
            /* Empty state */
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
                  <a href="https://www.instagram.com/yarilo_airsoft/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-mil-border hover:border-mil-gold text-mil-text/50 hover:text-mil-gold text-xs font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all hover:scale-105"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    Instagram DM
                  </a>
                </div>
              </div>
            </Animate>
          ) : (
            /* Product grid grouped by category */
            <div className="space-y-14">
              {CATEGORIES.map((cat) => {
                const catProducts = (products as Product[]).filter(
                  (p) => p.category === cat.value
                );
                if (catProducts.length === 0) return null;

                return (
                  <div key={cat.value}>
                    <Animate variant="slideLeft">
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="section-title text-xl font-bold text-white">
                          {cat.label}
                        </h2>
                        <div className="flex-1 h-px bg-mil-border" />
                        <span className="text-mil-muted text-xs tracking-[0.2em]">
                          {catProducts.length} proizvoda
                        </span>
                      </div>
                    </Animate>

                    <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.07}>
                      {catProducts.map((product) => (
                        <StaggerItem key={product.id} variant="scaleUp">
                          <div className="bg-mil-card border border-mil-border clip-corner overflow-hidden group hover:border-mil-green-mid transition-all duration-300 glow-on-hover flex flex-col">
                            {/* Clickable area → product page */}
                            <Link href={`/shop/${product.id}`} className="flex flex-col flex-1">
                              {/* Image */}
                              <div className="relative h-52 bg-mil-surface overflow-hidden">
                                {product.images?.[0] ? (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-mil-border/40 text-4xl">⬡</span>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-mil-card/60 to-transparent" />

                                {/* Stock badge */}
                                <div className="absolute top-3 left-3">
                                  <span className={`text-[9px] px-2 py-1 font-semibold tracking-[0.15em] uppercase ${
                                    product.in_stock
                                      ? "bg-mil-green-mid/90 text-white"
                                      : "bg-mil-dark/80 text-mil-muted border border-mil-border"
                                  }`} style={{ fontFamily: "var(--font-rajdhani)" }}>
                                    {product.in_stock ? "Na stanju" : "Nema"}
                                  </span>
                                </div>

                                {/* Multiple images indicator */}
                                {product.images?.length > 1 && (
                                  <div className="absolute bottom-3 right-3">
                                    <span className="text-[9px] bg-mil-dark/80 border border-mil-border text-mil-muted px-2 py-0.5 tracking-wider"
                                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                                      {product.images.length} slike
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-white font-bold text-base mb-1 group-hover:text-mil-green-light transition-colors"
                                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                                  {product.name}
                                </h3>
                                {product.description && (
                                  <p className="text-mil-text/50 text-xs leading-relaxed line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                              </div>
                            </Link>

                            {/* Action row */}
                            <div className="px-5 pb-5 flex items-center justify-between border-t border-mil-border pt-4">
                              <span className="text-xl font-bold text-mil-gold"
                                style={{ fontFamily: "var(--font-rajdhani)" }}>
                                €{Number(product.price).toFixed(2)}
                              </span>
                              {product.in_stock ? (
                                <AddToCartButton product={product} size="sm" />
                              ) : (
                                <Link
                                  href={`/shop/${product.id}`}
                                  className="px-4 py-2 border border-mil-border hover:border-mil-gold text-mil-muted hover:text-mil-gold text-xs font-semibold tracking-[0.1em] uppercase clip-corner-sm transition-all"
                                  style={{ fontFamily: "var(--font-rajdhani)" }}
                                >
                                  Pogledaj →
                                </Link>
                              )}
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
