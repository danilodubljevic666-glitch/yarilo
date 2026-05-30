import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/types/database";
import type { Product } from "@/types/database";
import DeleteButton from "./_components/DeleteButton";
import StockToggle from "./_components/StockToggle";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products: Product[] = (data ?? []) as Product[];
  const total    = products.length;
  const inStock  = products.filter((p) => p.in_stock).length;

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-mil-gold text-xs tracking-[0.3em] uppercase block mb-1"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Admin Panel</span>
          <h1 className="text-3xl font-bold text-white uppercase tracking-wide"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Proizvodi</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-3 bg-mil-green-mid hover:bg-mil-green-light text-white text-sm font-semibold tracking-[0.15em] uppercase clip-corner transition-all"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          + Novi proizvod
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Ukupno",    value: total },
          { label: "Na stanju", value: inStock },
          { label: "Nema",      value: total - inStock },
          { label: "Kategorija", value: CATEGORIES.length },
        ].map((s) => (
          <div key={s.label} className="bg-mil-card border border-mil-border p-4 clip-corner">
            <span className="text-2xl font-bold text-mil-green-light block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>{s.value}</span>
            <span className="text-mil-muted text-xs tracking-[0.15em] uppercase">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Products table */}
      {products.length === 0 ? (
        <div className="border border-dashed border-mil-border p-16 text-center clip-corner">
          <p className="text-mil-muted text-sm mb-4">Još nema proizvoda.</p>
          <Link href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2 bg-mil-green-mid hover:bg-mil-green-light text-white text-xs font-semibold tracking-[0.15em] uppercase clip-corner-sm transition-all"
            style={{ fontFamily: "var(--font-rajdhani)" }}>
            Dodaj prvi proizvod
          </Link>
        </div>
      ) : (
        <div className="bg-mil-card border border-mil-border clip-corner overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-mil-border">
                {["Slika", "Naziv", "Kategorija", "Cijena", "Na stanju", ""].map((h) => (
                  <th key={h}
                    className="px-4 py-3 text-left text-[10px] tracking-[0.25em] uppercase text-mil-muted font-medium"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}
                  className="border-b border-mil-border/50 hover:bg-mil-surface/50 transition-colors">
                  {/* Image */}
                  <td className="px-4 py-3 w-16">
                    <div className="w-12 h-12 bg-mil-surface clip-corner-sm overflow-hidden relative flex-shrink-0">
                      {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill
                          className="object-cover" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-mil-border text-lg">⬡</span>
                        </div>
                      )}
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-4 py-3">
                    <span className="text-white font-medium">{product.name}</span>
                    {product.description && (
                      <span className="block text-mil-muted text-xs mt-0.5 truncate max-w-[200px]">
                        {product.description}
                      </span>
                    )}
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-mil-surface border border-mil-border text-mil-muted text-[10px] tracking-[0.1em] uppercase"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      {CATEGORIES.find((c) => c.value === product.category)?.label ?? product.category}
                    </span>
                  </td>
                  {/* Price */}
                  <td className="px-4 py-3 text-mil-gold font-semibold whitespace-nowrap"
                    style={{ fontFamily: "var(--font-rajdhani)" }}>
                    €{Number(product.price).toFixed(2)}
                  </td>
                  {/* Stock toggle */}
                  <td className="px-4 py-3">
                    <StockToggle id={product.id} inStock={product.in_stock} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3 py-1.5 border border-mil-border hover:border-mil-gold text-mil-text/50 hover:text-mil-gold text-xs tracking-[0.1em] uppercase transition-all"
                        style={{ fontFamily: "var(--font-rajdhani)" }}>
                        Edit
                      </Link>
                      <DeleteButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
