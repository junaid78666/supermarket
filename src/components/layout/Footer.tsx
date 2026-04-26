import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-display text-lg font-bold">
            Daily<span className="text-primary">Basket</span>
          </div>
          <p className="mt-2 text-sm opacity-75">
            Fresh groceries delivered to your door, every day.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/shop" className="hover:text-primary">All products</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Account</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/auth" className="hover:text-primary">Sign in</Link></li>
            <li><Link to="/orders" className="hover:text-primary">My orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Delivery</h4>
          <p className="text-sm opacity-75">Door delivery in 60 minutes within city limits.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} DailyBasket. All rights reserved.
      </div>
    </footer>
  );
}