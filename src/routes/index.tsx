import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, Search, Sparkles, Star, Heart, Users, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-coimbatore.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { categories, plans, testimonials } from "@/data/businesses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KovaiConnect — Discover Local Businesses in Coimbatore" },
      { name: "description", content: "A localized business directory & digital marketing platform for Coimbatore's home entrepreneurs, professionals, startups and retail shops." },
      { property: "og:title", content: "KovaiConnect — Coimbatore's Local Business Directory" },
      { property: "og:description", content: "Discover trusted bakers, doctors, tailors, startups and more across Kovai." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Aerial view of Coimbatore at sunset" width={1536} height={1024} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.04_35/0.85)] via-[oklch(0.22_0.04_35/0.65)] to-[oklch(0.22_0.04_35/0.35)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Made for Coimbatore (Kovai)
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover the <span className="text-accent">heart of Kovai</span>, one local business at a time.
            </h1>
            <p className="mt-5 text-lg text-white/85">
              From home bakers in RS Puram to architects on Avinashi Road — find, trust, and connect with verified local businesses across Coimbatore.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/businesses", search: { q } as never });
              }}
              className="mt-8 flex flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-[var(--shadow-warm)] sm:flex-row"
            >
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-background px-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search bakers, doctors, area…"
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                Search Kovai
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/businesses" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5">
                Explore Businesses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/businesses" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                List Your Business
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-white/90">
              <Stat icon={<Users className="h-5 w-5" />} value="800+" label="Local listings" />
              <Stat icon={<BadgeCheck className="h-5 w-5" />} value="92%" label="Verified profiles" />
              <Stat icon={<TrendingUp className="h-5 w-5" />} value="12k+" label="Inquiries / month" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Featured Categories"
          title="Find what Kovai needs, every day"
          subtitle="Browse trusted neighbourhood businesses by category."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/businesses"
              search={{ category: c.title } as never}
              className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-warm)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-2xl shadow-[var(--shadow-warm)]">
                {c.icon}
              </div>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                Browse <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="bg-[image:var(--gradient-warm)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Subscription Plans"
            title="Simple plans for every Kovai business"
            subtitle="Start free with a basic listing. Upgrade when you're ready to grow."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl border bg-card p-8 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 ${
                  p.recommended ? "border-primary shadow-[var(--shadow-warm)] lg:scale-105" : "border-border"
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/businesses"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    p.recommended
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                      : "border border-border bg-background text-foreground hover:border-primary/50"
                  }`}
                >
                  Choose {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Trusted by Kovai"
          title="Real businesses. Real growth."
          subtitle="Verified Trust Badges, ethical practices, and a portion of revenue reinvested into MSME enablement & student internships."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BadgeCheck className="h-5 w-5 text-primary" /> Verified Listings
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Heart className="h-5 w-5 text-primary" /> Revenue reinvested in MSMEs
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-5 w-5 text-primary" /> Student internships
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-accent backdrop-blur">{icon}</div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-xs uppercase tracking-widest text-white/70">{label}</div>
      </div>
    </div>
  );
}
