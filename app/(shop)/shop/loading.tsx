import { SkeletonProductGrid } from "@/components/ui/skeleton";

const ShopLoading = () => (
  <div className="container-luxury py-10 lg:py-14">
    <div className="mb-8 h-4 w-32 shimmer rounded-lg" />
    <div className="mb-10">
      <div className="mb-3 h-8 w-48 shimmer rounded-lg" />
      <div className="h-4 w-20 shimmer rounded-lg" />
    </div>
    <div className="flex gap-14">
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 shimmer rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-7 h-5 w-full shimmer rounded-lg" />
        <SkeletonProductGrid count={12} />
      </div>
    </div>
  </div>
);

export default ShopLoading;
