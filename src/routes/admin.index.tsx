import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { Card } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, customers: 0 });
  const [chart, setChart] = useState<{ day: string; revenue: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; qty: number }[]>([]);

  useEffect(() => {
    (async () => {
      const [{ data: orders }, { count: pCount }, { count: uCount }] = await Promise.all([
        supabase.from("orders").select("id,total,created_at,status,order_items(product_name,quantity)"),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
      ]);
      const all = (orders ?? []) as any[];
      const revenue = all.reduce((s, o) => s + Number(o.total), 0);
      setStats({ revenue, orders: all.length, products: pCount ?? 0, customers: uCount ?? 0 });

      // last 7 days
      const days: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        days[d.toISOString().slice(0, 10)] = 0;
      }
      all.forEach((o) => {
        const k = o.created_at.slice(0, 10);
        if (k in days) days[k] += Number(o.total);
      });
      setChart(Object.entries(days).map(([day, revenue]) => ({ day: day.slice(5), revenue })));

      // top products
      const prodMap: Record<string, number> = {};
      all.forEach((o) =>
        (o.order_items ?? []).forEach((it: any) => {
          prodMap[it.product_name] = (prodMap[it.product_name] ?? 0) + it.quantity;
        }),
      );
      setTopProducts(
        Object.entries(prodMap)
          .map(([name, qty]) => ({ name, qty }))
          .sort((a, b) => b.qty - a.qty)
          .slice(0, 5),
      );
    })();
  }, []);

  const cards = [
    { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign },
    { label: "Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Products", value: stats.products, icon: Package },
    { label: "Customers", value: stats.customers, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-display text-2xl font-bold">{c.value}</div>
              </div>
              <c.icon className="h-8 w-8 text-primary opacity-80" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-display text-lg font-bold">Revenue (last 7 days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="revenue" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 font-display text-lg font-bold">Top selling products</h3>
          {topProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sales yet.</p>
          ) : (
            <ul className="space-y-3">
              {topProducts.map((p) => (
                <li key={p.name} className="flex items-center justify-between">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{p.qty} sold</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}