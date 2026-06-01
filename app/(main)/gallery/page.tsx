import { createClient } from "@/lib/supabase/server";
import GalleryContent from "./_components/GalleryContent";
import type { GalleryImage } from "./_components/GalleryContent";

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("url, alt, category, span")
    .order("created_at", { ascending: false });

  const images: GalleryImage[] = (data ?? []).map((row) => ({
    src: row.url as string,
    alt: row.alt as string,
    category: row.category as string,
    span: (row.span as string) ?? "",
  }));

  return <GalleryContent images={images} />;
}
