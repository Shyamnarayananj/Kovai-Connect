import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-warm)]">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight">KovaiConnect</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Coimbatore Local
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/businesses" activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">
            Discover
          </Link>
          <a href="/#plans" className="transition-colors hover:text-primary">Plans</a>
          <a href="/#about" className="transition-colors hover:text-primary">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/businesses"
            className="hidden items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            List Your Business
          </Link>
        </div>
      </div>
    </header>
  );
}