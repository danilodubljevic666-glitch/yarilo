"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ProductInsert, ProductUpdate } from "@/types/database";

export async function createProduct(data: ProductInsert) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/shop");
  revalidatePath("/admin");
}

export async function updateProduct(id: string, data: ProductUpdate) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/shop");
  revalidatePath("/admin");
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/shop");
  revalidatePath("/admin");
}

export async function toggleStock(id: string, inStock: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("products")
    .update({ in_stock: inStock })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/shop");
  revalidatePath("/admin");
}
