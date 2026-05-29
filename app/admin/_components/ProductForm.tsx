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

export default function ProductForm({ product }: Props) {
  const isEdit = !!product;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name:        product?.name        ?? "",
    description: product?.description ?? "",
    price:       product?.price       ? String(product.price) : "",
    category:    product?.category    ?? "puske" as Category,
    in_stock:    product?.in_stock    ?? true,
  });

  const [imageFile, setImageFile]       = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null);
  const [uploading, setUploading]       = useState(false);

  function handleField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return product?.image_url ?? null;
    setUploading(true);
    const supabase = createClient();
    const ext = imageFile.name.split(".").pop();
    const path = `products/${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(path, imageFile, { upsert: true });

    setUploading(false);
    if (error) { setError("Greška pri uploadu slike: " + error.message); return null; }

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(data.path);

    return publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.category) {
      setError("Popuni sva obavezna polja.");
      return;
    }

    const imageUrl = await uploadImage();
    if (uploading) return;

    const payload = {
      name:        form.name.trim(),
      description: form.description.trim() || null,
      price:       parseFloat(form.price),
      category:    form.category,
      in_stock:    form.in_stock,
      image_url:   imageUrl,
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
      {/* Image upload */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}>
          Slika proizvoda
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-mil-border hover:border-mil-green-mid transition-colors cursor-pointer clip-corner overflow-hidden"
          style={{ height: imagePreview ? 240 : 140 }}
        >
          {imagePreview ? (
            <>
              <Image src={imagePreview} alt="Preview" fill className="object-contain p-2" sizes="672px" />
              <div className="absolute inset-0 bg-mil-dark/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-rajdhani)" }}>Promijeni sliku</span>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-mil-muted">
              <span className="text-3xl opacity-30">⬡</span>
              <span className="text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-rajdhani)" }}>Klikni za upload</span>
              <span className="text-[10px] opacity-50">JPG, PNG, WEBP</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      {/* Name */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
          style={{ fontFamily: "var(--font-rajdhani)" }}>
          Naziv *
        </label>
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
          style={{ fontFamily: "var(--font-rajdhani)" }}>
          Opis
        </label>
        <textarea
          value={form.description}
          onChange={(e) => handleField("description", e.target.value)}
          rows={3}
          placeholder="Kratki opis proizvoda..."
          className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors clip-corner-sm resize-none"
        />
      </div>

      {/* Price + Category row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
            style={{ fontFamily: "var(--font-rajdhani)" }}>
            Cijena (€) *
          </label>
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
            style={{ fontFamily: "var(--font-rajdhani)" }}>
            Kategorija *
          </label>
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
