import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Fotogalerija Yarilo Airsoft Kluba — slike sa skirmish mečeva, mil-sim operacija i terena širom Crne Gore. Pogledajte akcije u Podgorici, Cetinju i Danilovgradu.",
  keywords:
    "yarilo airsoft galerija, airsoft crna gora slike, airsoft eventi slike, airsoft yarilo foto, skirmish crna gora galerija",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Galerija | Yarilo Airsoft Klub",
    description:
      "Slike sa airsoft mečeva i terena Yarilo kluba u Crnoj Gori.",
    url: "/gallery",
  },
};
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
