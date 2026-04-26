import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-RvXzK_OZ.js";
import { B as Button, s as supabase, t as toast } from "./router-EmVj5R-A.js";
import { I as Input } from "./input-CvhxglK7.js";
import { L as Label } from "./label-NUMgtn5Z.js";
import { P as Plus } from "./plus-BZSkw5rW.js";
import { T as Trash2 } from "./trash-2-DLXvqiW-.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}
function AdminCategories() {
  const [items, setItems] = reactExports.useState([]);
  const [name, setName] = reactExports.useState("");
  const [image, setImage] = reactExports.useState("");
  const load = () => supabase.from("categories").select("*").order("name").then(({
    data
  }) => setItems(data ?? []));
  reactExports.useEffect(() => {
    load();
  }, []);
  const add = async () => {
    if (!name.trim()) return;
    const {
      error
    } = await supabase.from("categories").insert({
      name,
      slug: slugify(name),
      image_url: image || null
    });
    if (error) return toast.error(error.message);
    toast.success("Category added");
    setName("");
    setImage("");
    load();
  };
  const del = async (id) => {
    if (!confirm("Delete category?")) return;
    const {
      error
    } = await supabase.from("categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Categories" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-semibold", children: "Add new category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: image, onChange: (e) => setImage(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "self-end", onClick: add, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 overflow-hidden rounded bg-muted", children: c.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, className: "h-full w-full object-cover", alt: "" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: c.slug }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => del(c.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
      ] }, c.id)) })
    ] }) })
  ] });
}
export {
  AdminCategories as component
};
