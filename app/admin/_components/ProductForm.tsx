"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createProduct, updateProduct } from "../_actions/products";
import { CATEGORIES } from "@/types/database";
import type { Product, Category } from "@/types/database";

interface Props {
  product?: Product;
}

type ImageEntry =
  | { kind: "existing"; url: string }
  | { kind: "new"; file: File; preview: string };

export default function ProductForm({ product }: Props) {
  const isEdit = !!product;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name:        product?.name        ?? "",
    description: product?.description ?? "",
    price:       product?.price       ? String(product.price) : "",
    category:    product?.category    ?? "puske" as Category,
    in_stock:    product?.in_stock    ?? true,
  });

  const [images, setImages] = useState<ImageEntry[]>(
    (product?.images ?? []).map((url) => ({ kind: "existing", url }))
  );

  function handleField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const newEntries: ImageEntry[] = files.map((file) => ({
      kind: "new",
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newEntries]);
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadAllImages(): Promise<string[]> {
    const supabase = createClient();
    const urls: string[] = [];

    for (const entry of images) {
      if (entry.kind === "existing") {
        urls.push(entry.url);
        continue;
      }
      const ext = entry.file.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error: uploadErr } = await supabase.storage
        .from("product-images")
        .upload(path, entry.file, { upsert: true });
      if (uploadErr) throw new Error("Greška pri uploadu: " + uploadErr.message);
      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(data.path);
      urls.push(publicUrl);
    }

    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.category) {
      setError("Popuni sva obavezna polja.");
      return;
    }

    setUploading(true);
    let imageUrls: string[];
    try {
      imageUrls = await uploadAllImages();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Greška pri uploadu.");
      setUploading(false);
      return;
    }
    setUploading(false);

    const payload = {
      name:        form.name.trim(),
      description: form.description.trim() || null,
      price:       parseFloat(form.price),
      category:    form.category,
      in_stock:    form.in_stock,
      images:      imageUrls,
    };

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateProduct(product.id, payload);
        } else {
          await createProduct(payload);
        }
        router.push("/admin");
        router.refresh();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Greška. Pokušaj ponovo.");
      }
    });
  }

  const busy = isPending || uploading;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">

      {/* ── Image upload ── */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}>
          Slike proizvoda
          <span className="ml-2 text-mil-border normal-case tracking-normal">({images.length} dodato)</span>
        </label>

        {/* Thumbnails grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-3">
            {images.map((entry, i) => {
              const src = entry.kind === "existing" ? entry.url : entry.preview;
              return (
                <div key={i} className="relative group aspect-square bg-mil-surface clip-corner overflow-hidden border border-mil-border">
                  <Image src={src} alt="" fill className="object-cover" sizes="160px" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 text-[8px] bg-mil-green-mid text-white px-1.5 py-0.5 tracking-wider uppercase"
                      style={{ fontFamily: "var(--font-rajdhani)" }}>
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-mil-dark/80 border border-mil-border text-mil-muted hover:text-red-400 hover:border-red-400/50 text-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              );
            })}

            {/* Add more */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-mil-border hover:border-mil-green-mid transition-colors clip-corner flex flex-col items-center justify-center gap-1 text-mil-muted hover:text-mil-green-light"
            >
              <span className="text-xl leading-none">+</span>
              <span className="text-[9px] tracking-wider uppercase" style={{ fontFamily: "var(--font-rajdhani)" }}>Dodaj</span>
            </button>
          </div>
        )}

        {/* Empty state drop zone */}
        {images.length === 0 && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-mil-border hover:border-mil-green-mid transition-colors cursor-pointer clip-corner h-36 flex flex-col items-center justify-center gap-2 text-mil-muted"
          >
            <span className="text-3xl opacity-30">⬡</span>
            <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Klikni za upload slika
            </span>
            <span className="text-[10px] opacity-50">JPG, PNG, WEBP — više slika odjednom</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />

        {images.length > 0 && (
          <p className="text-[10px] text-mil-muted mt-1.5">
            Prva slika je cover. Povuci za promjenu redosljeda nije podržano — ukloni i ponovo dodaj.
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Naziv *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleField("name", e.target.value)}
          required
          placeholder="npr. AEG M4A1 Carbine"
          className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors clip-corner-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Opis</label>
        <textarea
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          rows={3}
          placeholder="Kratki opis proizvoda..."
          className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors clip-corner-sm resize-none"
        />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Cijena (€) *</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleField("price", e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors clip-corner-sm"
          />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Kategorija *</label>
          <select
            value={form.category}
            onChange={(e) => handleField("category", e.target.value as Category)}
            className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm transition-colors clip-corner-sm appearance-none cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* In stock */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => handleField("in_stock", !form.in_stock)}
          className={`relative w-12 h-6 transition-colors clip-corner-sm ${
            form.in_stock ? "bg-mil-green-mid" : "bg-mil-surface border border-mil-border"
          }`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white transition-all clip-corner-sm ${
            form.in_stock ? "left-7" : "left-1"
          }`} />
        </button>
        <span className="text-sm text-mil-text/70">
          {form.in_stock ? "Na stanju" : "Nije na stanju"}
        </span>
      </div>

      {error && (
        <p className="text-red-400 text-xs tracking-wide border border-red-400/20 bg-red-400/10 px-4 py-3">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="px-8 py-3 bg-mil-green-mid hover:bg-mil-green-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {busy ? "Čuvanje..." : isEdit ? "Sačuvaj izmjene" : "Dodaj proizvod"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-3 border border-mil-border hover:border-mil-gold text-mil-text/50 hover:text-mil-gold font-semibold tracking-[0.15em] uppercase clip-corner transition-all text-sm"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Otkaži
        </button>
      </div>
    </form>
  );
}
