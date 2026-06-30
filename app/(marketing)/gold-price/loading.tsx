const GoldPriceLoading = () => (
  <div className="min-h-screen bg-background">
    <div className="container-luxury py-10 lg:py-14">
      <div className="mb-10">
        <div className="mb-2 h-3 w-20 animate-pulse rounded-full bg-muted" />
        <div className="mb-3 h-10 w-64 animate-pulse rounded-xl bg-muted" />
        <div className="h-4 w-80 animate-pulse rounded-lg bg-muted" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <div className="flex items-end gap-4">
            <div>
              <div className="mb-1 h-3 w-32 animate-pulse rounded bg-muted" />
              <div className="h-10 w-52 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
          <div className="h-[360px] animate-pulse rounded-2xl bg-muted/30" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-64 animate-pulse rounded-2xl bg-muted/30" />
          <div className="h-40 animate-pulse rounded-2xl bg-muted/30" />
        </div>
      </div>
    </div>
  </div>
);

export default GoldPriceLoading;
