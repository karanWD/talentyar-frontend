import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="border-border flex items-center gap-2 border-b py-2">
      <Skeleton className="size-10.5 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-50" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
