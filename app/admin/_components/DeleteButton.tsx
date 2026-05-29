"use client";

import { useState, useTransition } from "react";
import { deleteProduct } from "../_actions/products";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirm) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-red-400 text-[10px] mr-1">Sigurno?</span>
        <button
          onClick={() => startTransition(() => deleteProduct(id))}
          disabled={isPending}
          className="px-2 py-1.5 bg-red-500/20 border border-red-500/40 text-red-400 text-xs tracking-[0.1em] uppercase transition-all hover:bg-red-500/30 disabled:opacity-50"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {isPending ? "..." : "Da"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="px-2 py-1.5 border border-mil-border text-mil-muted text-xs tracking-[0.1em] uppercase transition-all hover:text-white"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Ne
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="px-3 py-1.5 border border-mil-border hover:border-red-400/50 text-mil-text/40 hover:text-red-400 text-xs tracking-[0.1em] uppercase transition-all"
      style={{ fontFamily: "var(--font-rajdhani)" }}
    >
      Briši
    </button>
  );
}
