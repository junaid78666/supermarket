import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Dw1rLXyd.js";
import { u as useAuth, a as useNavigate, s as supabase, P as Package, L as Link } from "./router-Dqk9ImY4.js";
import { B as Badge } from "./badge-Demwk4c7.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const statusColor = {
  pending: "bg-warning/20 text-warning-foreground border-warning/40",
  confirmed: "bg-primary/15 text-primary border-primary/30",
  preparing: "bg-primary/15 text-primary border-primary/30",
  out_for_delivery: "bg-chart-3/20 text-foreground border-chart-3/30",
  delivered: "bg-success/20 text-success border-success/40",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30"
};
function Orders() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth"
    });
  }, [user, loading, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      supabase.from("orders").select("id,total,status,payment_method,payment_status,created_at,order_items(product_name,quantity,unit_price)").eq("user_id", user.id).order("created_at", {
        ascending: false
      }).then(({
        data
      }) => setOrders(data ?? []));
    }
  }, [user]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 font-display text-3xl font-bold", children: "My orders" }),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "You haven't placed any orders yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-4 inline-block text-primary hover:underline", children: "Start shopping →" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
            "Order #",
            o.id.slice(0, 8)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: new Date(o.created_at).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: statusColor[o.status], children: o.status.replace(/_/g, " ") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-1 text-sm", children: o.order_items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          it.quantity,
          "× ",
          it.product_name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "$",
          (it.unit_price * it.quantity).toFixed(2)
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm capitalize text-muted-foreground", children: [
          o.payment_method.replace("_", " "),
          " · ",
          o.payment_status
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold", children: [
          "$",
          Number(o.total).toFixed(2)
        ] })
      ] })
    ] }, o.id)) })
  ] });
}
export {
  Orders as component
};
