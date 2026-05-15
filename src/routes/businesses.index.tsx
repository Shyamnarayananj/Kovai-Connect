import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, MapPin, Search, Star } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BusinessCardSkeleton } from "@/components/BusinessCardSkeleton";
import { businesses, categories } from "@/data/businesses";

type SearchParams = { q?: string; category?: string };

export const Route = createFileRoute("/businesses/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Discover Local Businesses in Coimbatore — KovaiConnect" },
      { name: "description", content: "Search and filter verified bakers, doctors, tailors, startups and more across Coimbatore." },
    ],
  }),
  component: BusinessesPage,
});

function BusinessesPage() {
  const params = Route.useSearch();
  const [q, setQ] = useState(params.q ?? "");
  const [category, setCategory] = useState(params.category ?? "All");
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 6;

  // Simulated initial load — shows skeletons briefly.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  // Reset page when filters change.
  useEffect(() => {
    setPage(1);
  }, [q, category, minRating, verifiedOnly]);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const term = q.trim().toLowerCase();
      const matchesQ =
        !term ||
        b.name.toLowerCase().includes(term) ||
        b.category.toLowerCase().includes(term) ||
        b.area.toLowerCase().includes(term);
      const matchesCat = category === "All" || b.category === category;
      const matchesRating = b.rating >= minRating;
      const matchesVerified = !verifiedOnly || b.verified;
      return matchesQ && matchesCat && matchesRating && matchesVerified;
    });
  }, [q, category, minRating, verifiedOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="border-b border-border bg-[image:var(--gradient-warm)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Discover Kovai businesses</h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} results across Coimbatore</p>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-background px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, category or area"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none"
            >
              <option>All</option>
              {categories.map((c) => (
                <option key={c.slug}>{c.title}</option>
              ))}
              <option>Chartered Accountants</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <label className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
              Verified only
            </label>
            {[0, 4, 4.5, 4.8].map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(r)}
                className={`rounded-full border px-3 py-1.5 ${
                  minRating === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                }`}
              >
                {r === 0 ? "Any rating" : `${r}+ ★`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
            No businesses match your filters yet. Try widening your search.
          </div>
        ) : (
          <>
          <div className="grid animate-[fade-in_0.4s_ease-out] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((b) => (
              <article key={b.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {b.verified && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-warm)]">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">{b.category}</div>
                  <h3 className="mt-1 text-lg font-bold">{b.name}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {b.area}</span>
                    <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {b.rating}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-foreground/80">{b.tagline}</p>
                  <Link
                    to="/businesses/$id"
                    params={{ id: b.id }}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-10 flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === currentPage;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    aria-current={active ? "page" : undefined}
                    aria-label={`Go to page ${n}`}
                    className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold transition ${
                      active
                        ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                        : "border border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
          </>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}