import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some fresh groceries to get started.</p>
        <Button asChild className="mt-6">
          <Link to="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 font-display text-3xl font-bold">Your cart</h1>
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                {i.image_url && <img src={i.image_url} alt={i.name} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <Link to="/product/$slug" params={{ slug: i.slug }} className="font-medium hover:text-primary">{i.name}</Link>
                <p className="text-xs text-muted-foreground">{i.unit}</p>
                <p className="mt-1 font-bold text-primary">${i.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center rounded-md border">
                <button onClick={() => setQty(i.id, i.quantity - 1)} className="p-2 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                <span className="w-10 text-center text-sm font-medium">{i.quantity}</span>
                <button onClick={() => setQty(i.id, i.quantity + 1)} className="p-2 hover:bg-muted"><Plus className="h-3 w-3" /></button>
              </div>
              <div className="w-20 text-right font-semibold">${(i.price * i.quantity).toFixed(2)}</div>
              <button onClick={() => remove(i.id)} className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-bold">Order summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{total > 30 ? "Free" : "$3.99"}</span></div>
        </div>
        <div className="my-4 border-t" />
        <div className="flex justify-between font-display text-lg font-bold">
          <span>Total</span>
          <span>${(total + (total > 30 ? 0 : 3.99)).toFixed(2)}</span>
        </div>
        <Button asChild size="lg" className="mt-6 w-full">
          <Link to="/checkout">Proceed to checkout</Link>
        </Button>
      </aside>
    </div>
  );
}