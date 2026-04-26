import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — DailyBasket" },
      { name: "description", content: "Browse all grocery categories at DailyBasket." },
    ],
  }),
  component: Categories,
});

type Cat = { id: string; name: string; slug: string; image_url: string | null };

function Categories() {
  const [cats, setCats] = useState<Cat[]>([]);
  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => setCats((data ?? []) as Cat[]));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold">Categories</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {cats.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ category: c.slug }}
            className="group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {c.image_url && (
                <img src={c.image_url} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
              )}
            </div>
            <div className="p-4 font-medium">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}