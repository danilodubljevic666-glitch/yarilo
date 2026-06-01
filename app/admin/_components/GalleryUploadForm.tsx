"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { createGalleryImage } from "../_actions/gallery";

const CATEGORIES = ["Mape", "Tereni", "Eventi", "Članovi"];
const SPANS = [
  { label: "Normalno",          value: "" },
  { label: "Široko (2 kolone)", value: "col-span-2" },
  { label: "Veliko (2×2)",      value: "col-span-2 row-span-2" },
];

export default function GalleryUploadForm() {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Eventi");
  const [span, setSpan] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setSuccess(false);
    setError("");
  }

  function clearFile() {
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Odaberi sliku."); return; }
    if (!alt.trim()) { setError("Unesi opis slike."); return; }
    setError("");
    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error: uploadErr } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      setError("Greška pri uploadu: " + uploadErr.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(data.path);

    setUploading(false);

    startTransition(async () => {
      try {
        await createGalleryImage({ url: publicUrl, alt: alt.trim(), category, span });
        setSuccess(true);
        clearFile();
        setAlt("");
        setCategory("Eventi");
        setSpan("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Greška. Pokušaj ponovo.");
      }
    });
  }

  const busy = uploading || isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image picker */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-3"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Slika *</label>
        {preview ? (
          <div className="relative w-full h-44 clip-corner overflow-hidden border border-mil-border mb-2 group">
            <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px" />
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 right-2 w-7 h-7 bg-mil-dark/80 border border-mil-border text-mil-muted hover:text-red-400 hover:border-red-400/50 flex items-center justify-center text-xs clip-corner-sm"
            >✕</button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-mil-border hover:border-mil-green-mid transition-colors cursor-pointer clip-corner h-36 flex flex-col items-center justify-center gap-2 text-mil-muted"
          >
            <span className="text-3xl opacity-30">⬡</span>
            <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Klikni za upload
            </span>
            <span className="text-[10px] opacity-50">JPG, PNG, WEBP</span>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>

      {/* Alt text */}
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Opis slike *</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="npr. Yarilo airsoft event — Cetinje"
          className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors clip-corner-sm"
        />
      </div>

      {/* Category + Span */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Kategorija</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm transition-colors clip-corner-sm appearance-none cursor-pointer"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Veličina</label>
          <select
            value={span}
            onChange={(e) => setSpan(e.target.value)}
            className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm transition-colors clip-corner-sm appearance-none cursor-pointer"
          >
            {SPANS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs tracking-wide border border-red-400/20 bg-red-400/10 px-4 py-3">{error}</p>
      )}
      {success && (
        <p className="text-mil-green-light text-xs tracking-wide border border-mil-green-mid/20 bg-mil-green-mid/10 px-4 py-3">
          Slika uspješno dodana u galeriju.
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full px-8 py-3 bg-mil-green-mid hover:bg-mil-green-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        {busy ? "Dodavanje..." : "Dodaj u galeriju"}
      </button>
    </form>
  );
}
