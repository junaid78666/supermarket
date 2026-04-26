import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

type Cat = { id: string; name: string; slug: string; image_url: string | null };

function slugify(s: string) { return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"); }

function AdminCategories() {
  const [items, setItems] = useState<Cat[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const load = () => supabase.from("categories").select("*").order("name").then(({ data }) => setItems((data ?? []) as Cat[]));
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) return;
    const { error } = await supabase.from("categories").insert({ name, slug: slugify(name), image_url: image || null });
    if (error) return toast.error(error.message);
    toast.success("Category added"); setName(""); setImage(""); load();
  };
  const del = async (id: string) => {
    if (!confirm("Delete category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Categories</h1>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Add new category</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Image URL</Label><Input value={image} onChange={(e) => setImage(e.target.value)} /></div>
          <Button className="self-end" onClick={add}><Plus className="mr-2 h-4 w-4" />Add</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="p-3">Category</th><th className="p-3">Slug</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3"><div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded bg-muted">{c.image_url && <img src={c.image_url} className="h-full w-full object-cover" alt="" />}</div>
                  <span className="font-medium">{c.name}</span>
                </div></td>
                <td className="p-3 text-muted-foreground">{c.slug}</td>
                <td className="p-3 text-right"><Button variant="ghost" size="sm" onClick={() => del(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}