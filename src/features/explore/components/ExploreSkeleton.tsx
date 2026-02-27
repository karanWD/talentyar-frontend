import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import FeedCardSekelton from "@/features/feed/components/FeedCardSekelton";

const ExploreSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-5 pt-5 pb-30">
      <div>
        <InputGroup aria-readonly={true}>
          <InputGroupInput id="inline-start-input" placeholder="جستجو..." />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <FeedCardSekelton />
      <FeedCardSekelton />
    </div>
  );
};

export default ExploreSkeleton;
