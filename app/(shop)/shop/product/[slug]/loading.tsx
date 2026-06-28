const ProductLoading = () => (
  <div className="container-luxury py-10 lg:py-14">
    <div className="mb-10 flex items-center gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-3 w-16 shimmer rounded-lg" />
          <div className="h-3 w-3 shimmer rounded-full" />
        </div>
      ))}
    </div>

    <div className="grid gap-12 lg:grid-cols-[1fr_480px]">
      {/* Gallery skeleton */}
      <div className="flex flex-col gap-4">
        <div className="aspect-[4/5] w-full shimmer rounded-2xl" />
        <div className="flex gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="size-20 shimmer rounded-xl" />
          ))}
        </div>
      </div>

      {/* Info skeleton */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          <div className="h-5 w-12 shimmer rounded-full" />
          <div className="h-5 w-12 shimmer rounded-full" />
        </div>
        <div>
          <div className="mb-2 h-9 w-3/4 shimmer rounded-lg" />
          <div className="h-4 w-40 shimmer rounded-lg" />
        </div>
        <div className="h-px shimmer" />
        <div className="h-9 w-1/2 shimmer rounded-lg" />
        <div className="flex gap-2">
          <div className="h-12 w-32 shimmer rounded-xl" />
          <div className="h-12 w-32 shimmer rounded-xl" />
        </div>
        <div className="h-12 w-full shimmer rounded-xl" />
        <div className="h-12 w-full shimmer rounded-xl" />
      </div>
    </div>
  </div>
);

export default ProductLoading;
