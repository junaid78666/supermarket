import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-RvXzK_OZ.js";
import { s as supabase, t as toast } from "./router-EmVj5R-A.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CxmMpyfN.js";
import { B as Badge } from "./badge-F2KvKA8D.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STATUSES = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];
function AdminOrders() {
  const [orders, setOrders] = reactExports.useState([]);
  const [expanded, setExpanded] = reactExports.useState(null);
  const load = async () => {
    const {
      data
    } = await supabase.from("orders").select("id,total,status,payment_method,payment_status,created_at,full_name,phone,address_line,city,postal_code,notes,order_items(product_name,quantity,unit_price)").order("created_at", {
      ascending: false
    });
    setOrders(data ?? []);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const updateStatus = async (id, status) => {
    const {
      error
    } = await supabase.from("orders").update({
      status
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Orders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 text-left hover:bg-muted/40", onClick: () => setExpanded(expanded === o.id ? null : o.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              o.full_name,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "· ",
                o.phone
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
              "#",
              o.id.slice(0, 8),
              " · ",
              new Date(o.created_at).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: o.payment_method }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "capitalize", children: o.status.replace(/_/g, " ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold", children: [
            "$",
            Number(o.total).toFixed(2)
          ] })
        ] }),
        expanded === o.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-sm font-semibold", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: o.order_items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                it.quantity,
                "× ",
                it.product_name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                (it.unit_price * it.quantity).toFixed(2)
              ] })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-1 font-semibold", children: "Delivery to" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              o.address_line,
              ", ",
              o.city,
              " ",
              o.postal_code
            ] }),
            o.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
              "Note: ",
              o.notes
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Update status:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: o.status, onValueChange: (v) => updateStatus(o.id, v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s.replace(/_/g, " ") }, s)) })
            ] })
          ] })
        ] })
      ] }, o.id)),
      orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed p-12 text-center text-muted-foreground", children: "No orders yet." })
    ] })
  ] });
}
export {
  AdminOrders as component
};
