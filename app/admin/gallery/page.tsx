import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/server";
import GalleryUploadForm from "../_components/GalleryUploadForm";
import GalleryDeleteButton from "../_components/GalleryDeleteButton";

export default async function AdminGalleryPage() {
  const supabase = createAdminClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-mil-border pb-6">
          <span className="text-mil-gold text-[10px] tracking-[0.35em] uppercase block mb-1"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Admin</span>
          <h1 className="text-white text-2xl font-bold tracking-wide"
            style={{ fontFamily: "var(--font-rajdhani)" }}>Galerija</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Images grid */}
          <div>
            <p className="text-mil-muted text-[10px] tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--font-rajdhani)" }}>
              {images?.length ?? 0} {(images?.length ?? 0) === 1 ? "slika" : "slika"}
            </p>

            {!images || images.length === 0 ? (
              <div className="border border-dashed border-mil-border p-12 text-center clip-corner">
                <p className="text-mil-muted text-xs tracking-[0.2em] uppercase">Nema slika u galeriji</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                  <div key={img.id} className="relative group aspect-square bg-mil-surface clip-corner overflow-hidden border border-mil-border">
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="240px" />
                    <div className="absolute inset-0 bg-mil-dark/0 group-hover:bg-mil-dark/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 bg-mil-dark/90 px-2 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <p className="text-[9px] text-mil-text/80 truncate leading-tight">{img.alt}</p>
                      <p className="text-[8px] text-mil-gold uppercase tracking-wider mt-0.5">{img.category}</p>
                    </div>
                    <GalleryDeleteButton id={img.id} url={img.url} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload form */}
          <div className="bg-mil-card border border-mil-border p-6 clip-corner sticky top-8">
            <h2 className="text-white font-bold text-sm tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "var(--font-rajdhani)" }}>Dodaj sliku</h2>
            <GalleryUploadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
