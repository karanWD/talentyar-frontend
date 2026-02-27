import { Skeleton } from "@/components/ui/skeleton";

const FeedCardSekelton = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3">
        <Skeleton className="size-10.5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>

      {/* Media */}
      <div className="pb-2">
        <Skeleton className="aspect-video w-full" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-1">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="size-5 rounded-full" />
      </div>

      {/* Caption */}
      <div className="flex w-full max-w-xs flex-col gap-2 py-2">
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="w-full max-w-25">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default FeedCardSekelton;
