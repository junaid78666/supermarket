import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Dw1rLXyd.js";
import { c as createLucideIcon, s as supabase, B as Button, L as Link, S as ShieldCheck } from "./router-Dqk9ImY4.js";
import { P as ProductCard } from "./ProductCard-CFzfUjRn.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./card-Dfv0ueva.js";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$1);
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const heroImage = "/assets/hero-groceries-kkCAEEPw.jpg";
function Home() {
  const [featured, setFeatured] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("products").select("id,name,slug,price,image_url,unit,stock").eq("is_active", true).order("created_at", {
      ascending: false
    }).limit(8).then(({
      data
    }) => setFeatured(data ?? []));
    supabase.from("categories").select("id,name,slug,image_url").then(({
      data
    }) => setCats(data ?? []));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden", style: {
      background: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-3.5 w-3.5 text-success" }),
          "Fresh from local farms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-4xl font-bold leading-tight md:text-6xl", children: [
          "Groceries at your door in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "60 minutes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-base text-muted-foreground md:text-lg", children: "Shop thousands of fresh products from your neighborhood supermarket. Pay online or cash on delivery." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: "Shop now" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/categories", children: "Browse categories" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "Fresh groceries in a paper bag", width: 1600, height: 1024, className: "rounded-2xl shadow-[var(--shadow-elegant)]" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto grid gap-6 px-4 py-8 sm:grid-cols-2 md:grid-cols-4", children: [{
      icon: Truck,
      t: "Free delivery",
      s: "On orders over $30"
    }, {
      icon: Clock,
      t: "60-min delivery",
      s: "From order to door"
    }, {
      icon: ShieldCheck,
      t: "Secure payment",
      s: "Card or cash on delivery"
    }, {
      icon: Leaf,
      t: "Always fresh",
      s: "Quality guaranteed"
    }].map(({
      icon: Icon,
      t,
      s
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s })
      ] })
    ] }, t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold md:text-3xl", children: "Shop by category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/categories", className: "text-sm font-medium text-primary hover:underline", children: "View all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", search: {
        category: c.slug
      }, className: "group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted", children: c.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.name, loading: "lazy", className: "h-full w-full object-cover transition-transform group-hover:scale-110" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 text-center text-sm font-medium", children: c.name })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold md:text-3xl", children: "Fresh picks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "text-sm font-medium text-primary hover:underline", children: "Shop all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
    ] })
  ] });
}
export {
  Home as component
};
