import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import ProductForm from "../../../_components/ProductForm";
import type { Product } from "@/types/database";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <span className="text-mil-gold text-xs tracking-[0.3em] uppercase block mb-1"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Admin Panel</span>
        <h1 className="text-3xl font-bold text-white uppercase tracking-wide"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Uredi proizvod</h1>
        <div className="w-12 h-0.5 bg-mil-gold mt-3" />
      </div>
      <ProductForm product={data as Product} />
    </div>
  );
}
