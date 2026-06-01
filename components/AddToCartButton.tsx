"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    in_stock: boolean;
  };
  size?: "sm" | "lg";
}

export default function AddToCartButton({ product, size = "sm" }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (!product.in_stock) {
    if (size === "lg") {
      return (
        <div
          className="flex items-center justify-center w-full py-4 border border-mil-border text-mil-muted text-sm tracking-[0.15em] uppercase clip-corner"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Nije dostupno
        </div>
      );
    }
    return null;
  }

  if (size === "lg") {
    return (
      <button
        onClick={handleAdd}
        className={`flex items-center justify-center gap-2 w-full py-4 font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm ${
          added
            ? "bg-mil-gold text-mil-dark"
            : "bg-mil-green-mid hover:bg-mil-green-light text-white"
        }`}
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        {added ? "✓ Dodato u korpu" : "Dodaj u korpu"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase clip-corner-sm transition-all whitespace-nowrap ${
        added
          ? "bg-mil-gold text-mil-dark"
          : "bg-mil-green-mid hover:bg-mil-green-light text-white"
      }`}
      style={{ fontFamily: "var(--font-rajdhani)" }}
    >
      {added ? "✓ Dodato" : "+ Korpa"}
    </button>
  );
}
