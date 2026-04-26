import { r as reactExports, U as jsxRuntimeExports, a0 as Outlet } from "./worker-entry-RvXzK_OZ.js";
import { c as createLucideIcon, u as useAuth, a as useNavigate, P as Package, L as Link } from "./router-EmVj5R-A.js";
import { S as ShoppingBag } from "./shopping-bag-BYB6FL13.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function AdminLayout() {
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading) {
      if (!user) navigate({
        to: "/auth"
      });
      else if (!isAdmin) navigate({
        to: "/"
      });
    }
  }, [user, isAdmin, loading, navigate]);
  if (loading || !user || !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-12 text-center text-muted-foreground", children: "Loading admin..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid gap-6 px-4 py-6 md:grid-cols-[220px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Admin" }),
      [{
        to: "/admin",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true
      }, {
        to: "/admin/products",
        label: "Products",
        icon: Package
      }, {
        to: "/admin/categories",
        label: "Categories",
        icon: Tag
      }, {
        to: "/admin/orders",
        label: "Orders",
        icon: ShoppingBag
      }].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: i.to, activeOptions: {
        exact: i.exact
      }, className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted", activeProps: {
        className: "bg-primary/10 text-primary font-medium"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(i.icon, { className: "h-4 w-4" }),
        i.label
      ] }, i.to))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
