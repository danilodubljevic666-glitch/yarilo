export type Category = "puske" | "pistolji" | "metci" | "odijela" | "kacige" | "dodaci";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: Category;
  images: string[];
  in_stock: boolean;
  created_at: string;
}

export type ProductInsert = Omit<Product, "id" | "created_at">;
export type ProductUpdate = Partial<ProductInsert>;

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "puske",    label: "Puške" },
  { value: "pistolji", label: "Pištolji" },
  { value: "metci",    label: "Metci (BB)" },
  { value: "odijela",  label: "Odijela & Oprema" },
  { value: "kacige",   label: "Kacige & Zaštita" },
  { value: "dodaci",   label: "Dodaci" },
];
