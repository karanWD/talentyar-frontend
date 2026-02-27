import { Skeleton } from "@/components/ui/skeleton";
import FeedCardSekelton from "@/features/feed/components/FeedCardSekelton";

const HomeSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-5 pt-8 pb-30">
      <Skeleton className="h-33 w-full" />
      <FeedCardSekelton />
      <FeedCardSekelton />
    </div>
  );
};

export default HomeSkeleton;
