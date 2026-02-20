import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const InfoCard = () => {
  return (
    <div className="bg-muted g flex flex-col gap-1 rounded-2xl px-2.5 py-2">
      <div className="flex items-center gap-2">
        <Image
          alt="logo-talentyar"
          src={"/images/logo.svg"}
          width={56}
          height={56}
          className="rounded-full"
        />

        <div className="flex flex-col gap-1">
          <span className="text-xs leading-4 font-bold">TalentYar</span>
          <span className="text-muted-foreground text-xs leading-4">
            تلنت‌یار
          </span>
          <span className="text-muted-foreground line-clamp-1 text-xs leading-4">
            مارو دنبال کن و ویدیو های آموزشی رو از دست نده...
          </span>
        </div>
      </div>
      <div className="text-primary flex items-center justify-end gap-1.5 py-2 pl-1 text-xs leading-4">
        <Button variant={"link"}>
          مشاهده
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export default InfoCard;
