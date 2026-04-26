import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchParams = { category?: string; q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    category: typeof s.category === "string" ? s.category : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop all groceries — DailyBasket" },
      { name: "description", content: "Browse all fresh products available for door delivery." },
    ],
  }),
  component: Shop,
});

type Cat = { id: string; name: string; slug: string };

function Shop() {
  const { category, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("categories").select("id,name,slug").then(({ data }) => setCats((data ?? []) as Cat[]));
  }, []);

  useEffect(() => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("id,name,slug,price,image_url,unit,stock,category_id,categories(slug)")
      .eq("is_active", true)
      .order("name");
    if (q) query = query.ilike("name", `%${q}%`);
    query.then(({ data }) => {
      let rows = (data ?? []) as any[];
      if (category) rows = rows.filter((r) => r.categories?.slug === category);
      setProducts(rows as Product[]);
      setLoading(false);
    });
  }, [category, q]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-display text-3xl font-bold">
          {category ? cats.find((c) => c.slug === category)?.name ?? "Shop" : "All Products"}
        </h1>
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q ?? ""}
            onChange={(e) => {
              const v = e.target.value || undefined;
              navigate({ search: (prev: SearchParams) => ({ ...prev, q: v }) });
            }}
            placeholder="Search products..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <aside className="space-y-1">
          <button
            onClick={() => navigate({ search: (p: SearchParams) => ({ ...p, category: undefined }) })}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${!category ? "bg-primary/10 font-medium text-primary" : ""}`}
          >
            All categories
          </button>
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate({ search: (p: SearchParams) => ({ ...p, category: c.slug }) })}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${category === c.slug ? "bg-primary/10 font-medium text-primary" : ""}`}
            >
              {c.name}
            </button>
          ))}
        </aside>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
              No products found. <Link to="/shop" className="text-primary hover:underline">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}