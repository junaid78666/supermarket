import { U as jsxRuntimeExports } from "./worker-entry-Dw1rLXyd.js";
import { b as useCart, B as Button, L as Link } from "./router-Dqk9ImY4.js";
import { S as ShoppingBag } from "./shopping-bag-uCLFJF0p.js";
import { M as Minus } from "./minus-BjapqnhR.js";
import { P as Plus } from "./plus-CGFME8s0.js";
import { T as Trash2 } from "./trash-2-BPC6sLZh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Cart() {
  const {
    items,
    setQty,
    remove,
    total
  } = useCart();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mx-auto h-16 w-16 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Add some fresh groceries to get started." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: "Browse products" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 font-display text-3xl font-bold", children: "Your cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-lg border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted", children: i.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image_url, alt: i.name, className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: {
            slug: i.slug
          }, className: "font-medium hover:text-primary", children: i.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: i.unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-bold text-primary", children: [
            "$",
            i.price.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-md border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(i.id, i.quantity - 1), className: "p-2 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-medium", children: i.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(i.id, i.quantity + 1), className: "p-2 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-20 text-right font-semibold", children: [
          "$",
          (i.price * i.quantity).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(i.id), className: "rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, i.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold", children: "Order summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: total > 30 ? "Free" : "$3.99" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display text-lg font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "$",
          (total + (total > 30 ? 0 : 3.99)).toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "mt-6 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: "Proceed to checkout" }) })
    ] })
  ] });
}
export {
  Cart as component
};
