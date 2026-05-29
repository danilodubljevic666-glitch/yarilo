"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Pogrešan email ili lozinka.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-mil-dark flex items-center justify-center px-4">
      <div className="absolute inset-0 military-grid opacity-20" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-mil-green-mid/40" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-mil-green-mid/40" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-mil-green-mid/40" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-mil-green-mid/40" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="relative w-12 h-12 clip-corner overflow-hidden">
            <Image src="/yariloLogo.jpg" alt="Yarilo" fill className="object-cover" sizes="48px" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-[0.2em] text-white uppercase block"
              style={{ fontFamily: "var(--font-rajdhani)" }}>YARILO</span>
            <span className="text-[9px] tracking-[0.3em] text-mil-gold uppercase">Admin Panel</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-mil-card border border-mil-border clip-corner p-8">
          <h1 className="text-mil-text/60 text-xs tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "var(--font-rajdhani)" }}>
            Prijava
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors"
                placeholder="admin@yarilo.me"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.25em] uppercase text-mil-muted block mb-2"
                style={{ fontFamily: "var(--font-rajdhani)" }}>
                Lozinka
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-mil-surface border border-mil-border focus:border-mil-green-mid outline-none px-4 py-3 text-mil-text text-sm placeholder:text-mil-muted/40 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs tracking-wide">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-mil-green-mid hover:bg-mil-green-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-[0.2em] uppercase clip-corner transition-all text-sm mt-2"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              {loading ? "Prijava..." : "Prijavi se →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
