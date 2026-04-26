import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-RvXzK_OZ.js";
import { c as createLucideIcon, R as Route, s as supabase, L as Link } from "./router-EmVj5R-A.js";
import { P as ProductCard } from "./ProductCard-CYV5fHkd.js";
import { I as Input } from "./input-CvhxglK7.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./card-WLoRe_Ec.js";
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Shop() {
  const {
    category,
    q
  } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [products, setProducts] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.from("categories").select("id,name,slug").then(({
      data
    }) => setCats(data ?? []));
  }, []);
  reactExports.useEffect(() => {
    setLoading(true);
    let query = supabase.from("products").select("id,name,slug,price,image_url,unit,stock,category_id,categories(slug)").eq("is_active", true).order("name");
    if (q) query = query.ilike("name", `%${q}%`);
    query.then(({
      data
    }) => {
      let rows = data ?? [];
      if (category) rows = rows.filter((r) => r.categories?.slug === category);
      setProducts(rows);
      setLoading(false);
    });
  }, [category, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: category ? cats.find((c) => c.slug === category)?.name ?? "Shop" : "All Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q ?? "", onChange: (e) => {
          const v = e.target.value || void 0;
          navigate({
            search: (prev) => ({
              ...prev,
              q: v
            })
          });
        }, placeholder: "Search products...", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-[200px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          search: (p) => ({
            ...p,
            category: void 0
          })
        }), className: `block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${!category ? "bg-primary/10 font-medium text-primary" : ""}`, children: "All categories" }),
        cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          search: (p) => ({
            ...p,
            category: c.slug
          })
        }), className: `block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted ${category === c.slug ? "bg-primary/10 font-medium text-primary" : ""}`, children: c.name }, c.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] animate-pulse rounded-lg bg-muted" }, i)) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-dashed p-12 text-center text-muted-foreground", children: [
        "No products found. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "text-primary hover:underline", children: "Clear filters" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) }) })
    ] })
  ] });
}
export {
  Shop as component
};
