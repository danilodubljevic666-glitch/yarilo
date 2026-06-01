"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createGalleryImage(data: {
  url: string;
  alt: string;
  category: string;
  span: string;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("gallery_images").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImage(id: string, url: string) {
  const supabase = createAdminClient();
  const marker = "/storage/v1/object/public/product-images/";
  const path = url.includes(marker) ? url.split(marker)[1] : null;
  if (path) {
    await supabase.storage.from("product-images").remove([path]);
  }
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
