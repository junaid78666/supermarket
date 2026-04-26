import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/client";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

type Order = {
  id: string;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  order_items: { product_name: string; quantity: number; unit_price: number }[];
};

const statusColor: Record<string, string> = {
  pending: "bg-warning/20 text-warning-foreground border-warning/40",
  confirmed: "bg-primary/15 text-primary border-primary/30",
  preparing: "bg-primary/15 text-primary border-primary/30",
  out_for_delivery: "bg-chart-3/20 text-foreground border-chart-3/30",
  delivered: "bg-success/20 text-success border-success/40",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

function Orders() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("orders")
        .select("id,total,status,payment_method,payment_status,created_at,order_items(product_name,quantity,unit_price)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => setOrders((data ?? []) as Order[]));
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-display text-3xl font-bold">My orders</h1>
      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">You haven't placed any orders yet.</p>
          <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">Start shopping →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-xl border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-muted-foreground">Order #{o.id.slice(0, 8)}</div>
                  <div className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                </div>
                <Badge variant="outline" className={statusColor[o.status]}>{o.status.replace(/_/g, " ")}</Badge>
              </div>
              <div className="mt-4 space-y-1 text-sm">
                {o.order_items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{it.quantity}× {it.product_name}</span>
                    <span className="text-muted-foreground">${(it.unit_price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-sm capitalize text-muted-foreground">{o.payment_method.replace("_", " ")} · {o.payment_status}</span>
                <span className="font-display text-lg font-bold">${Number(o.total).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}