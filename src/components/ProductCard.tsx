import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  unit: string | null;
  stock: number;
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <Card className="group flex flex-col overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block aspect-square overflow-hidden bg-muted">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">🛒</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="font-medium leading-tight hover:text-primary">
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-display text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            disabled={outOfStock}
            onClick={(e) => {
              e.preventDefault();
              add({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image_url: product.image_url,
                unit: product.unit,
                stock: product.stock,
              });
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            {outOfStock ? "Out" : "Add"}
          </Button>
        </div>
      </div>
    </Card>
  );
}