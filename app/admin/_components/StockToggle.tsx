"use client";

import { useTransition } from "react";
import { toggleStock } from "../_actions/products";

export default function StockToggle({ id, inStock }: { id: string; inStock: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => toggleStock(id, !inStock))}
      disabled={isPending}
      className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold transition-all disabled:opacity-50 ${
        inStock
          ? "bg-mil-green-mid/20 border border-mil-green-mid/40 text-mil-green-light"
          : "bg-mil-surface border border-mil-border text-mil-muted"
      }`}
      style={{ fontFamily: "var(--font-rajdhani)" }}
    >
      {isPending ? "..." : inStock ? "Na stanju" : "Nema"}
    </button>
  );
}
