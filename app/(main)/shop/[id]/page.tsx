import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/types/database";
import type { Product } from "@/types/database";
import ProductGallery from "./_components/ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();

  if (!data) notFound();

  const product = data as Product;
  const categoryLabel = CATEGORIES.find((c) => c.value === product.category)?.label ?? product.category;

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 pt-28 pb-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-mil-muted"
            style={{ fontFamily: "var(--font-rajdhani)" }}>
            <Link href="/shop" className="hover:text-mil-gold transition-colors">Shop</Link>
            <span className="text-mil-border">›</span>
            <span className="text-mil-text/60">{categoryLabel}</span>
            <span className="text-mil-border">›</span>
            <span className="text-white truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* Info */}
            <div className="lg:sticky lg:top-28">
              {/* Category tag */}
              <span className="text-[10px] tracking-[0.3em] uppercase text-mil-gold mb-3 block"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                {categoryLabel}
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                {product.name}
              </h1>

              <div className="w-12 h-0.5 bg-mil-gold mb-6" />

              {/* Price + Stock */}
              <div className="flex items-center gap-5 mb-6">
                <span className="text-4xl font-bold text-mil-gold"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>
                  €{Number(product.price).toFixed(2)}
                </span>
                <span className={`text-xs px-3 py-1.5 font-semibold tracking-[0.15em] uppercase ${
                  product.in_stock
                    ? "bg-mil-green-mid/20 border border-mil-green-mid/40 text-mil-green-light"
                    : "bg-mil-surface border border-mil-border text-mil-muted"
                }`} style={{ fontFamily: "var(--font-rajdhani)" }}>
                  {product.in_stock ? "● Na stanju" : "Nema na stanju"}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-mil-text/70 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* CTA */}
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/yarilo_airsoft/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Kontaktiraj na Instagramu →
                </a>
                <a
                  href="tel:+38269566781"
                  className="flex items-center justify-center gap-2 w-full py-4 border border-mil-border hover:border-mil-gold text-mil-text/60 hover:text-mil-gold font-semibold tracking-[0.15em] uppercase clip-corner transition-all text-sm"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  +382 69 566 781
                </a>
              </div>

              {/* Meta */}
              <div className="mt-8 pt-6 border-t border-mil-border space-y-3">
                <div className="flex items-center gap-3 text-xs text-mil-muted">
                  <span className="tracking-[0.15em] uppercase w-24" style={{ fontFamily: "var(--font-rajdhani)" }}>Kategorija</span>
                  <span className="text-mil-text/60">{categoryLabel}</span>
                </div>
                {product.images.length > 1 && (
                  <div className="flex items-center gap-3 text-xs text-mil-muted">
                    <span className="tracking-[0.15em] uppercase w-24" style={{ fontFamily: "var(--font-rajdhani)" }}>Slike</span>
                    <span className="text-mil-text/60">{product.images.length} fotografija</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="px-4 sm:px-6 py-12 border-t border-mil-border">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-mil-muted hover:text-mil-gold text-xs tracking-[0.2em] uppercase transition-colors"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            ← Nazad na shop
          </Link>
        </div>
      </div>
    </>
  );
}
