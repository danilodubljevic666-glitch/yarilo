import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./_actions/auth";

const navItems = [
  { href: "/admin",               label: "Dashboard",       icon: "⬡" },
  { href: "/admin/products/new",  label: "Dodaj proizvod",  icon: "+" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware handles redirect for most cases, this is a safety net
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-mil-dark flex">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-mil-card border-r border-mil-border flex flex-col fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="p-5 border-b border-mil-border flex items-center gap-3">
          <div className="relative w-9 h-9 clip-corner-sm overflow-hidden flex-shrink-0">
            <Image src="/yariloLogo.jpg" alt="Yarilo" fill className="object-cover" sizes="36px" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-[0.15em] text-white uppercase block leading-none"
              style={{ fontFamily: "var(--font-rajdhani)" }}>YARILO</span>
            <span className="text-[9px] tracking-[0.25em] text-mil-gold uppercase">Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-mil-text/60 hover:text-white hover:bg-mil-surface border border-transparent hover:border-mil-border transition-all text-sm tracking-wide group"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              <span className="text-mil-green-light text-xs w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-mil-border">
          <p className="text-mil-muted text-[10px] tracking-wide truncate mb-3 px-1">{user.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full px-4 py-2 text-mil-text/50 hover:text-red-400 border border-mil-border hover:border-red-400/30 text-xs tracking-[0.15em] uppercase transition-all text-left"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Odjava
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 ml-60 min-h-screen">
        {children}
      </div>
    </div>
  );
}
