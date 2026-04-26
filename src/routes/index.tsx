import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Truck, Clock, ShieldCheck, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-groceries.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DailyBasket — Fresh groceries delivered in 60 min" },
      { name: "description", content: "Order fresh fruits, vegetables, dairy and pantry essentials. Door delivery in under 60 minutes." },
      { property: "og:title", content: "DailyBasket — Fresh groceries delivered in 60 min" },
      { property: "og:description", content: "Order fresh groceries online with fast door delivery." },
    ],
  }),
  component: Home,
});

type Cat = { id: string; name: string; slug: string; image_url: string | null };

function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("id,name,slug,price,image_url,unit,stock")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => setFeatured((data ?? []) as Product[]));
    supabase
      .from("categories")
      .select("id,name,slug,image_url")
      .then(({ data }) => setCats((data ?? []) as Cat[]));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur">
              <Leaf className="h-3.5 w-3.5 text-success" />
              Fresh from local farms
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              Groceries at your door in <span className="text-primary">60 minutes</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              Shop thousands of fresh products from your neighborhood supermarket. Pay online or cash on delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/categories">Browse categories</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Fresh groceries in a paper bag"
              width={1600}
              height={1024}
              className="rounded-2xl shadow-[var(--shadow-elegant)]"
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y bg-card">
        <div className="container mx-auto grid gap-6 px-4 py-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: Truck, t: "Free delivery", s: "On orders over $30" },
            { icon: Clock, t: "60-min delivery", s: "From order to door" },
            { icon: ShieldCheck, t: "Secure payment", s: "Card or cash on delivery" },
            { icon: Leaf, t: "Always fresh", s: "Quality guaranteed" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by category</h2>
          <Link to="/categories" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {cats.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.slug }} className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-[var(--shadow-card)]">
              <div className="aspect-square overflow-hidden bg-muted">
                {c.image_url && (
                  <img src={c.image_url} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                )}
              </div>
              <div className="p-3 text-center text-sm font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Fresh picks</h2>
          <Link to="/shop" className="text-sm font-medium text-primary hover:underline">Shop all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
