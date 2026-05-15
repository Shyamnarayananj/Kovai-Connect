export function BusinessCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-9 w-full animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}
