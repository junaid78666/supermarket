import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    postal_code: "",
    notes: "",
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("full_name,phone").eq("id", user.id).maybeSingle().then(({ data }) => {
        if (data) setForm((f) => ({ ...f, full_name: data.full_name ?? "", phone: data.phone ?? "" }));
      });
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild className="mt-4"><Link to="/shop">Shop now</Link></Button>
      </div>
    );
  }

  const delivery = total > 30 ? 0 : 3.99;
  const grand = total + delivery;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: grand,
        payment_method: "cod",
        payment_status: "pending",
        status: "pending",
        ...form,
      })
      .select()
      .single();

    if (error || !order) {
      setSubmitting(false);
      toast.error(error?.message ?? "Could not place order");
      return;
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id,
        product_id: i.id,
        product_name: i.name,
        unit_price: i.price,
        quantity: i.quantity,
        subtotal: i.price * i.quantity,
      })),
    );

    if (itemsError) {
      toast.error(itemsError.message);
      setSubmitting(false);
      return;
    }

    clear();
    toast.success("Order placed! We'll deliver soon.");
    navigate({ to: "/orders" });
  };

  return (
    <div className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_400px]">
      <form onSubmit={submit} className="space-y-6">
        <h1 className="font-display text-3xl font-bold">Checkout</h1>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="full_name">Full name</Label><Input id="full_name" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label htmlFor="address_line">Address</Label><Input id="address_line" required value={form.address_line} onChange={(e) => setForm({ ...form, address_line: e.target.value })} /></div>
            <div><Label htmlFor="city">City</Label><Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
            <div><Label htmlFor="postal_code">Postal code</Label><Input id="postal_code" required value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label htmlFor="notes">Delivery notes (optional)</Label><Textarea id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Payment</h2>
          <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
            <div className="font-medium">Cash on delivery</div>
            <p className="text-sm text-muted-foreground">Pay our delivery driver in cash on arrival.</p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Online card payments coming soon.</p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Placing order..." : `Place order — $${grand.toFixed(2)}`}
        </Button>
      </form>

      <aside className="h-fit rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
        <h2 className="font-display text-lg font-bold">Order summary</h2>
        <div className="mt-4 max-h-72 space-y-2 overflow-auto text-sm">
          {items.map((i) => (
            <div key={i.id} className="flex justify-between gap-2">
              <span className="truncate">{i.quantity}× {i.name}</span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="my-4 border-t" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span></div>
        </div>
        <div className="mt-3 flex justify-between font-display text-lg font-bold">
          <span>Total</span>
          <span>${grand.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}