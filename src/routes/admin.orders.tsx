import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

type Order = {
  id: string; total: number; status: string; payment_method: string; payment_status: string;
  created_at: string; full_name: string; phone: string; address_line: string; city: string;
  postal_code: string; notes: string | null;
  order_items: { product_name: string; quantity: number; unit_price: number }[];
};

const STATUSES = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("orders")
      .select("id,total,status,payment_method,payment_status,created_at,full_name,phone,address_line,city,postal_code,notes,order_items(product_name,quantity,unit_price)")
      .order("created_at", { ascending: false });
    setOrders((data ?? []) as Order[]);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status: status as any }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border bg-card">
            <button
              className="grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 text-left hover:bg-muted/40"
              onClick={() => setExpanded(expanded === o.id ? null : o.id)}
            >
              <div>
                <div className="font-medium">{o.full_name} <span className="text-xs text-muted-foreground">· {o.phone}</span></div>
                <div className="font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8)} · {new Date(o.created_at).toLocaleString()}</div>
              </div>
              <Badge variant="outline" className="capitalize">{o.payment_method}</Badge>
              <Badge className="capitalize">{o.status.replace(/_/g, " ")}</Badge>
              <span className="font-display text-lg font-bold">${Number(o.total).toFixed(2)}</span>
            </button>
            {expanded === o.id && (
              <div className="space-y-4 border-t p-4">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Items</h4>
                  <ul className="space-y-1 text-sm">
                    {o.order_items.map((it, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{it.quantity}× {it.product_name}</span>
                        <span>${(it.unit_price * it.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm">
                  <h4 className="mb-1 font-semibold">Delivery to</h4>
                  <p>{o.address_line}, {o.city} {o.postal_code}</p>
                  {o.notes && <p className="mt-1 text-muted-foreground">Note: {o.notes}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Update status:</span>
                  <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                    <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s.replace(/_/g, " ")}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">No orders yet.</div>
        )}
      </div>
    </div>
  );
}