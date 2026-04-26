import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-RvXzK_OZ.js";
import { p as Route, b as useCart, s as supabase, L as Link, B as Button, n as ShoppingCart, t as toast } from "./router-EmVj5R-A.js";
import { M as Minus } from "./minus-7VWXUZPk.js";
import { P as Plus } from "./plus-BZSkw5rW.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ProductDetail() {
  const {
    slug
  } = Route.useParams();
  const [product, setProduct] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [qty, setQty] = reactExports.useState(1);
  const {
    add
  } = useCart();
  reactExports.useEffect(() => {
    setLoading(true);
    supabase.from("products").select("id,name,slug,description,price,stock,unit,image_url").eq("slug", slug).eq("is_active", true).maybeSingle().then(({
      data
    }) => {
      setProduct(data);
      setLoading(false);
    });
  }, [slug]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-8", children: "Loading..." });
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-4 inline-block text-primary hover:underline", children: "← Back to shop" })
    ] });
  }
  const out = product.stock <= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid gap-10 px-4 py-10 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border bg-muted", children: product.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image_url, alt: product.name, className: "aspect-square w-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "text-sm text-muted-foreground hover:text-primary", children: "← Back to shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-bold", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: product.unit }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 font-display text-3xl font-bold text-primary", children: [
        "$",
        product.price.toFixed(2)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: out ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-destructive", children: "Out of stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success", children: [
        product.stock,
        " in stock"
      ] }) }),
      product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 leading-relaxed text-muted-foreground", children: product.description }),
      !out && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-md border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "p-2 hover:bg-muted", "aria-label": "Decrease", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-medium", children: qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty((q) => Math.min(product.stock, q + 1)), className: "p-2 hover:bg-muted", "aria-label": "Increase", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", onClick: () => {
          add({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image_url: product.image_url,
            unit: product.unit,
            stock: product.stock
          }, qty);
          toast.success(`${qty} × ${product.name} added to cart`);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mr-2 h-4 w-4" }),
          "Add to cart"
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductDetail as component
};
