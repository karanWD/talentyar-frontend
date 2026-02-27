import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 px-5 py-4">
        <Skeleton className="mx-auto h-4 w-40" />
        <div className="flex items-center gap-4">
          <Skeleton className="size-18 rounded-full" />
          <div className="flex flex-1 flex-col">
            <div className="flex justify-around gap-2">
              <div className="flex cursor-pointer flex-col items-center gap-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-15" />
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-15" />
              </div>
              <div className="flex cursor-pointer flex-col items-center gap-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-15" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-30" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-70" />
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 p-1">
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
