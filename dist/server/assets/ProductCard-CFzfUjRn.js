import { U as jsxRuntimeExports } from "./worker-entry-Dw1rLXyd.js";
import { b as useCart, L as Link, B as Button, n as ShoppingCart, t as toast } from "./router-Dqk9ImY4.js";
import { C as Card } from "./card-Dfv0ueva.js";
function ProductCard({ product }) {
  const { add } = useCart();
  const outOfStock = product.stock <= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group flex flex-col overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: { slug: product.slug }, className: "block aspect-square overflow-hidden bg-muted", children: product.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: product.image_url,
        alt: product.name,
        loading: "lazy",
        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-4xl", children: "🛒" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-2 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: { slug: product.slug }, className: "font-medium leading-tight hover:text-primary", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.unit }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold text-foreground", children: [
          "$",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            disabled: outOfStock,
            onClick: (e) => {
              e.preventDefault();
              add({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image_url: product.image_url,
                unit: product.unit,
                stock: product.stock
              });
              toast.success(`${product.name} added to cart`);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "mr-1 h-4 w-4" }),
              outOfStock ? "Out" : "Add"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
