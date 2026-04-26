import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetail,
});

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  unit: string | null;
  image_url: string | null;
};

function ProductDetail() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => {
    setLoading(true);
    supabase
      .from("products")
      .select("id,name,slug,description,price,stock,unit,image_url")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as Product | null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container mx-auto p-8">Loading...</div>;
  if (!product) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const out = product.stock <= 0;

  return (
    <div className="container mx-auto grid gap-10 px-4 py-10 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border bg-muted">
        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="aspect-square w-full object-cover" />
        )}
      </div>
      <div>
        <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">← Back to shop</Link>
        <h1 className="mt-2 font-display text-4xl font-bold">{product.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>
        <div className="mt-4 font-display text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
        <p className="mt-2 text-sm">
          {out ? (
            <span className="font-medium text-destructive">Out of stock</span>
          ) : (
            <span className="text-success">{product.stock} in stock</span>
          )}
        </p>
        {product.description && <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>}

        {!out && (
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-md border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-muted" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-2 hover:bg-muted" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              onClick={() => {
                add(
                  {
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    image_url: product.image_url,
                    unit: product.unit,
                    stock: product.stock,
                  },
                  qty,
                );
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}