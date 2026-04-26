import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Package, ShoppingBag, Tag } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate({ to: "/auth" });
      else if (!isAdmin) navigate({ to: "/" });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return <div className="container mx-auto p-12 text-center text-muted-foreground">Loading admin...</div>;
  }

  return (
    <div className="container mx-auto grid gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
      <aside className="space-y-1">
        <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin</h2>
        {[
          { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
          { to: "/admin/products", label: "Products", icon: Package },
          { to: "/admin/categories", label: "Categories", icon: Tag },
          { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
        ].map((i) => (
          <Link
            key={i.to}
            to={i.to}
            activeOptions={{ exact: i.exact }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
            activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </Link>
        ))}
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
}