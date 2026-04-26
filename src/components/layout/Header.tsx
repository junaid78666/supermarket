import { Link } from "@tanstack/react-router";
import { ShoppingCart, User as UserIcon, LogOut, ShieldCheck, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { count } = useCart();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-secondary text-secondary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            🛒
          </span>
          <span>
            Daily<span className="text-primary">Basket</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-5 text-sm md:flex">
          <Link to="/" activeOptions={{ exact: true }} className="opacity-90 hover:opacity-100" activeProps={{ className: "text-primary opacity-100 font-medium" }}>
            Home
          </Link>
          <Link to="/shop" className="opacity-90 hover:opacity-100" activeProps={{ className: "text-primary opacity-100 font-medium" }}>
            Shop
          </Link>
          <Link to="/categories" className="opacity-90 hover:opacity-100" activeProps={{ className: "text-primary opacity-100 font-medium" }}>
            Categories
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/cart" className="relative rounded-md p-2 hover:bg-white/10" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-secondary-foreground hover:bg-white/10 hover:text-secondary-foreground">
                  <UserIcon className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/orders"><Package className="mr-2 h-4 w-4" />My Orders</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin"><ShieldCheck className="mr-2 h-4 w-4" />Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" variant="default">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}