import ProductForm from "../../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <span className="text-mil-gold text-xs tracking-[0.3em] uppercase block mb-1"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Admin Panel</span>
        <h1 className="text-3xl font-bold text-white uppercase tracking-wide"
          style={{ fontFamily: "var(--font-rajdhani)" }}>Novi proizvod</h1>
        <div className="w-12 h-0.5 bg-mil-gold mt-3" />
      </div>
      <ProductForm />
    </div>
  );
}
