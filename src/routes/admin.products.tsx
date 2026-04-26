import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

type Product = {
  id: string; name: string; slug: string; description: string | null;
  price: number; stock: number; unit: string | null; image_url: string | null;
  category_id: string | null; is_active: boolean;
};
type Cat = { id: string; name: string };

const empty: Omit<Product, "id"> = {
  name: "", slug: "", description: "", price: 0, stock: 0, unit: "each",
  image_url: "", category_id: null, is_active: true,
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<Product, "id">>(empty);

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("name");
    setItems((data ?? []) as Product[]);
  };

  useEffect(() => {
    load();
    supabase.from("categories").select("id,name").then(({ data }) => setCats((data ?? []) as Cat[]));
  }, []);

  const startNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const startEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name, slug: p.slug, description: p.description, price: p.price,
      stock: p.stock, unit: p.unit, image_url: p.image_url, category_id: p.category_id, is_active: p.is_active,
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = { ...form, slug: form.slug || slugify(form.name), price: Number(form.price), stock: Number(form.stock) };
    const { error } = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Product updated" : "Product added");
    setOpen(false); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Products</h1>
        <Button onClick={startNew}><Plus className="mr-2 h-4 w-4" />Add product</Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Active</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded bg-muted">
                      {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.unit}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-medium">${Number(p.price).toFixed(2)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.is_active ? "✅" : "—"}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => del(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div><Label>Unit</Label><Input value={form.unit ?? ""} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
            <div><Label>Price ($)</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} /></div>
            <div className="sm:col-span-2">
              <Label>Category</Label>
              <Select value={form.category_id ?? ""} onValueChange={(v) => setForm({ ...form, category_id: v || null })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {cats.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2"><Label>Image URL</Label><Input value={form.image_url ?? ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Description</Label><Textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <label className="flex items-center gap-2 sm:col-span-2 text-sm">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              Active (visible in store)
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? "Save changes" : "Add product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}