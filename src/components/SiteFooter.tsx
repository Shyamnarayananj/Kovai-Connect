import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-[oklch(0.22_0.04_35)] text-[oklch(0.95_0.02_70)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="text-lg font-bold">KovaiConnect</div>
          </div>
          <p className="mt-4 text-sm text-[oklch(0.78_0.03_70)]">
            A localized business directory & digital marketing platform built for Coimbatore's
            home entrepreneurs, professionals and MSMEs.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/businesses" className="hover:text-accent">Discover Businesses</Link></li>
            <li><a href="/#plans" className="hover:text-accent">Subscription Plans</a></li>
            <li><a href="/#about" className="hover:text-accent">About & Ethics</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+91 90000 12345</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>hello@kovaiconnect.in</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>RS Puram, Coimbatore</span></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Follow</h4>
          <div className="flex gap-3">
            <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-accent hover:text-accent-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-accent hover:text-accent-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-accent hover:text-accent-foreground"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-[oklch(0.7_0.02_70)]">
        © {new Date().getFullYear()} KovaiConnect. Built with ❤ in Coimbatore.
      </div>
    </footer>
  );
}