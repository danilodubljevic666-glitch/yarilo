"use client";

import { useTransition } from "react";
import { deleteGalleryImage } from "../_actions/gallery";

export default function GalleryDeleteButton({ id, url }: { id: string; url: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Obriši ovu sliku iz galerije?")) return;
    startTransition(() => deleteGalleryImage(id, url));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="absolute top-2 right-2 w-7 h-7 bg-mil-dark/80 border border-mil-border text-mil-muted hover:text-red-400 hover:border-red-400/50 disabled:opacity-50 flex items-center justify-center text-xs clip-corner-sm opacity-0 group-hover:opacity-100 transition-all"
    >
      {isPending ? "…" : "✕"}
    </button>
  );
}
