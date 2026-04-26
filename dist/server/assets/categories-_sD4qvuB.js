import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-RvXzK_OZ.js";
import { s as supabase, L as Link } from "./router-EmVj5R-A.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Categories() {
  const [cats, setCats] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({
      data
    }) => setCats(data ?? []));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 font-display text-3xl font-bold", children: "Categories" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", search: {
      category: c.slug
    }, className: "group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-muted", children: c.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.name, loading: "lazy", className: "h-full w-full object-cover transition-transform group-hover:scale-110" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-medium", children: c.name })
    ] }, c.id)) })
  ] });
}
export {
  Categories as component
};
