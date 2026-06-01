"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface OrderForm {
  ime: string;
  prezime: string;
  telefon: string;
  grad: string;
}

const emptyForm: OrderForm = { ime: "", prezime: "", telefon: "", grad: "" };

export default function KorpaPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<OrderForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<OrderForm>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  function validate(): boolean {
    const e: Partial<OrderForm> = {};
    if (!form.ime.trim()) e.ime = "Obavezno";
    if (!form.prezime.trim()) e.prezime = "Obavezno";
    if (!form.telefon.trim()) e.telefon = "Obavezno";
    if (!form.grad.trim()) e.grad = "Obavezno";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // TODO: Implement emailjs here
    // await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
    //   customer_name: `${form.ime} ${form.prezime}`,
    //   customer_phone: form.telefon,
    //   customer_city: form.grad,
    //   order_list: items
    //     .map(i => `${i.name} x${i.quantity} — €${(i.price * i.quantity).toFixed(2)}`)
    //     .join('\n'),
    //   order_total: `€${totalPrice.toFixed(2)}`,
    // });

    await new Promise((r) => setTimeout(r, 700));
    clearCart();
    setSubmitted(true);
    setLoading(false);
  }

  if (!mounted) return null;

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-32 text-center">
        <div className="w-20 h-20 border-2 border-mil-gold mb-8 flex items-center justify-center">
          <span className="text-mil-gold text-3xl leading-none">✓</span>
        </div>
        <span
          className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-4 block"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Narudžba primljena
        </span>
        <h1
          className="text-4xl font-bold text-white mb-4 tracking-[0.1em] uppercase"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Hvala vam!
        </h1>
        <p className="text-mil-text/60 text-sm max-w-sm mb-10 leading-relaxed">
          Vaša narudžba je uspješno primljena. Kontaktiraćemo vas uskoro na navedeni broj telefona.
        </p>
        <Link
          href="/shop"
          className="px-8 py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Nazad na shop
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-32 text-center">
        <div className="w-20 h-20 border-2 border-mil-border mb-8 flex items-center justify-center float-anim">
          <span className="text-mil-border text-3xl leading-none">⬡</span>
        </div>
        <h1
          className="text-2xl font-bold text-mil-text/30 uppercase tracking-[0.2em] mb-4"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Korpa je prazna
        </h1>
        <p className="text-mil-muted text-xs mb-10">
          Pregledajte shop i dodajte željene proizvode.
        </p>
        <Link
          href="/shop"
          className="px-8 py-4 bg-mil-green-mid hover:bg-mil-green-light text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          Idi na Shop
        </Link>
      </div>
    );
  }

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 border-b border-mil-border overflow-hidden">
        <div className="absolute inset-0 military-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-mil-dark/0 to-mil-dark" />
        <div className="relative max-w-7xl mx-auto">
          <span
            className="text-mil-gold text-xs tracking-[0.4em] uppercase mb-3 block"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Narudžba
          </span>
          <h1 className="section-title text-5xl sm:text-7xl font-bold text-white mb-4">KORPA</h1>
          <div className="w-16 h-0.5 bg-mil-gold" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

            {/* Left: Cart items */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-sm font-bold tracking-[0.25em] uppercase text-mil-text/50"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Stavke ({totalItems})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-[10px] text-mil-muted hover:text-red-400 tracking-[0.15em] uppercase transition-colors"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Isprazni korpu
                </button>
              </div>

              <div className="space-y-3">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-mil-card border border-mil-border p-4 clip-corner"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-mil-surface shrink-0 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-mil-border text-xl">⬡</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-white font-bold text-sm truncate mb-1"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-mil-gold font-bold text-base"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-mil-muted text-[11px]">
                        €{item.price.toFixed(2)} / kom
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-mil-muted hover:text-red-400 text-[11px] transition-colors"
                        aria-label="Ukloni stavku"
                      >
                        ✕
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-mil-border hover:border-mil-gold text-mil-text hover:text-mil-gold transition-colors flex items-center justify-center text-sm"
                        >
                          −
                        </button>
                        <span
                          className="w-8 text-center text-white text-sm font-bold"
                          style={{ fontFamily: "var(--font-rajdhani)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-mil-border hover:border-mil-gold text-mil-text hover:text-mil-gold transition-colors flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-8 flex items-center justify-between border-t border-mil-border pt-6">
                <span
                  className="text-xs tracking-[0.2em] uppercase text-mil-text/60"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Ukupno
                </span>
                <span
                  className="text-3xl font-bold text-mil-gold"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  €{totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="mt-6">
                <Link
                  href="/shop"
                  className="text-xs text-mil-muted hover:text-mil-gold tracking-[0.2em] uppercase transition-colors"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  ← Nastavi kupovinu
                </Link>
              </div>
            </div>

            {/* Right: Order form */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-mil-card border border-mil-border clip-corner p-6">
                <h2
                  className="text-sm font-bold tracking-[0.25em] uppercase text-white mb-6"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  Podaci za narudžbu
                </h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {(
                    [
                      { key: "ime",     label: "Ime",     type: "text", placeholder: "Vaše ime" },
                      { key: "prezime", label: "Prezime", type: "text", placeholder: "Vaše prezime" },
                      { key: "telefon", label: "Telefon", type: "tel",  placeholder: "+382 XX XXX XXX" },
                      { key: "grad",    label: "Grad",    type: "text", placeholder: "Vaš grad" },
                    ] as const
                  ).map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label
                        className="block text-[10px] tracking-[0.2em] uppercase text-mil-muted mb-1.5"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        {label} <span className="text-mil-gold">*</span>
                      </label>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className={`w-full bg-mil-surface border px-4 py-3 text-white text-sm placeholder:text-mil-muted/40 focus:outline-none transition-colors ${
                          errors[key]
                            ? "border-red-500 focus:border-red-400"
                            : "border-mil-border focus:border-mil-gold"
                        }`}
                      />
                      {errors[key] && (
                        <p className="text-red-400 text-[10px] mt-1">{errors[key]}</p>
                      )}
                    </div>
                  ))}

                  {/* Summary */}
                  <div className="border-t border-mil-border pt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-mil-muted">Broj stavki</span>
                      <span className="text-mil-text">{totalItems} kom</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className="text-xs tracking-[0.15em] uppercase text-mil-muted"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        Ukupno
                      </span>
                      <span
                        className="text-2xl font-bold text-mil-gold"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm ${
                      loading
                        ? "bg-mil-border text-mil-muted cursor-not-allowed"
                        : "bg-mil-green-mid hover:bg-mil-green-light text-white"
                    }`}
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {loading ? "Slanje..." : "Poruči →"}
                  </button>

                  <p className="text-[10px] text-mil-muted text-center leading-relaxed">
                    Kontaktiraćemo vas na navedeni broj radi potvrde narudžbe.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
