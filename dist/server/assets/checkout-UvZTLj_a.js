import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-Dw1rLXyd.js";
import { a as useNavigate, b as useCart, u as useAuth, s as supabase, B as Button, L as Link, t as toast } from "./router-Dqk9ImY4.js";
import { I as Input } from "./input-DDmu345p.js";
import { L as Label } from "./label-DGY6uJ_I.js";
import { T as Textarea } from "./textarea-CW3kRwf8.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    total,
    clear
  } = useCart();
  const {
    user,
    loading
  } = useAuth();
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    postal_code: "",
    notes: ""
  });
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth"
    });
  }, [user, loading, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      supabase.from("profiles").select("full_name,phone").eq("id", user.id).maybeSingle().then(({
        data
      }) => {
        if (data) setForm((f) => ({
          ...f,
          full_name: data.full_name ?? "",
          phone: data.phone ?? ""
        }));
      });
    }
  }, [user]);
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: "Shop now" }) })
    ] });
  }
  const delivery = total > 30 ? 0 : 3.99;
  const grand = total + delivery;
  const submit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const {
      data: order,
      error
    } = await supabase.from("orders").insert({
      user_id: user.id,
      total: grand,
      payment_method: "cod",
      payment_status: "pending",
      status: "pending",
      ...form
    }).select().single();
    if (error || !order) {
      setSubmitting(false);
      toast.error(error?.message ?? "Could not place order");
      return;
    }
    const {
      error: itemsError
    } = await supabase.from("order_items").insert(items.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      product_name: i.name,
      unit_price: i.price,
      quantity: i.quantity,
      subtotal: i.price * i.quantity
    })));
    if (itemsError) {
      toast.error(itemsError.message);
      setSubmitting(false);
      return;
    }
    clear();
    toast.success("Order placed! We'll deliver soon.");
    navigate({
      to: "/orders"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_400px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-lg font-bold", children: "Delivery details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "full_name", children: "Full name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "full_name", required: true, value: form.full_name, onChange: (e) => setForm({
              ...form,
              full_name: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", required: true, value: form.phone, onChange: (e) => setForm({
              ...form,
              phone: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address_line", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "address_line", required: true, value: form.address_line, onChange: (e) => setForm({
              ...form,
              address_line: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "city", required: true, value: form.city, onChange: (e) => setForm({
              ...form,
              city: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "postal_code", children: "Postal code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "postal_code", required: true, value: form.postal_code, onChange: (e) => setForm({
              ...form,
              postal_code: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Delivery notes (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "notes", value: form.notes, onChange: (e) => setForm({
              ...form,
              notes: e.target.value
            }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-lg font-bold", children: "Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border-2 border-primary bg-primary/5 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Cash on delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pay our delivery driver in cash on arrival." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Online card payments coming soon." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: submitting, children: submitting ? "Placing order..." : `Place order — $${grand.toFixed(2)}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "h-fit rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Order summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 max-h-72 space-y-2 overflow-auto text-sm", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          i.quantity,
          "× ",
          i.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "$",
          (i.price * i.quantity).toFixed(2)
        ] })
      ] }, i.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: delivery === 0 ? "Free" : `$${delivery.toFixed(2)}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex justify-between font-display text-lg font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "$",
          grand.toFixed(2)
        ] })
      ] })
    ] })
  ] });
}
export {
  Checkout as component
};
