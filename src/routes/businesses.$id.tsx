import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  BadgeCheck,
  Facebook,
  Instagram,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Star,
  ChevronLeft,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InquiryForm } from "@/components/InquiryForm";
import { businesses, type Business } from "@/data/businesses";

export const Route = createFileRoute("/businesses/$id")({
  loader: ({ params }) => {
    const business = businesses.find((b) => b.id === params.id);
    if (!business) throw notFound();
    return { business };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.business;
    if (!b) return { meta: [{ title: "Business — KovaiConnect" }] };
    return {
      meta: [
        { title: `${b.name} — ${b.category} in ${b.area} | KovaiConnect` },
        { name: "description", content: b.tagline },
        { property: "og:title", content: `${b.name} — KovaiConnect` },
        { property: "og:description", content: b.tagline },
        { property: "og:image", content: b.image },
        { name: "twitter:image", content: b.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Business not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't locate this business in our directory.
        </p>
        <Link
          to="/businesses"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to discover
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Couldn't load this business</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
      <SiteFooter />
    </div>
  ),
  component: BusinessDetail,
});

function BusinessDetail() {
  const { business: b } = Route.useLoaderData() as { business: Business };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Banner */}
      <section className="relative h-72 w-full overflow-hidden sm:h-96">
        <img
          src={b.image}
          alt={`${b.name} cover`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.04_35/0.9)] via-[oklch(0.22_0.04_35/0.4)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <Link
            to="/businesses"
            className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/25"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> All businesses
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="animate-[fade-in_0.4s_ease-out]">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                {b.category}
              </div>
              <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">{b.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/85">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {b.area}, Coimbatore
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {b.rating}
                  <span className="text-white/60"> ({b.reviewCount} reviews)</span>
                </span>
                {b.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            {/* About */}
            <div className="animate-[fade-in_0.4s_ease-out]">
              <h2 className="text-xl font-bold">About</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">{b.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.about}</p>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-xl font-bold">Services offered</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {b.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-[var(--shadow-card)]"
                  >
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            {b.gallery.length > 0 && (
              <div>
                <h2 className="text-xl font-bold">Gallery</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {b.gallery.map((src, i) => (
                    <div
                      key={src}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                    >
                      <img
                        src={src}
                        alt={`${b.name} gallery photo ${i + 1}`}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold">Ratings & Reviews</h2>
              <div className="mt-4 flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div>
                  <div className="text-4xl font-bold">{b.rating}</div>
                  <div className="mt-1 flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(b.rating) ? "fill-current" : ""}`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {b.reviewCount} reviews
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Reviews are collected from verified customers across KovaiConnect.
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {b.reviews.map((r, i) => (
                  <article
                    key={i}
                    className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{r.name}</div>
                      <div className="flex gap-0.5 text-accent">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3.5 w-3.5 ${j < r.rating ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-foreground/85">"{r.text}"</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Contact */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-bold">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <a href={`tel:${b.phone.replace(/\s+/g, "")}`} className="hover:text-primary">
                    {b.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <a href={`mailto:${b.email}`} className="hover:text-primary">
                    {b.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{b.address}</span>
                </li>
              </ul>

              {(b.social.instagram || b.social.facebook || b.social.whatsapp) && (
                <>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Social
                  </div>
                  <div className="mt-3 flex gap-2">
                    {b.social.instagram && (
                      <a
                        href={b.social.instagram}
                        aria-label={`${b.name} on Instagram`}
                        className="rounded-full border border-border bg-background p-2 transition hover:bg-primary hover:text-primary-foreground"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                    {b.social.facebook && (
                      <a
                        href={b.social.facebook}
                        aria-label={`${b.name} on Facebook`}
                        className="rounded-full border border-border bg-background p-2 transition hover:bg-primary hover:text-primary-foreground"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    )}
                    {b.social.whatsapp && (
                      <a
                        href={b.social.whatsapp}
                        aria-label={`${b.name} on WhatsApp`}
                        className="rounded-full border border-border bg-background p-2 transition hover:bg-primary hover:text-primary-foreground"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>

            <InquiryForm businessName={b.name} />
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
