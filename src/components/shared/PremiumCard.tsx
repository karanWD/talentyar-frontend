import Image from "next/image";

import { Button } from "../ui/button";
import { Card } from "../ui/card";

const PremiumCard = () => {
  return (
    <Card className="gap-3 px-4 py-5.5">
      <span className="text-center text-xl leading-7 font-bold">
        مشترکین VIP
      </span>
      <div className="flex justify-center">
        <Image
          width={167}
          height={157}
          alt="premium-card"
          src={"/images/premium-card.svg"}
        />
      </div>
      <span className="text-center leading-6">
        با خرید اشتراک از خدمات بیشتر لذت ببرید:
      </span>
      <div className="fl flex flex-col items-center gap-2 pb-2">
        <span className="text-muted-foreground text-xs leading-4">
          مشاهده ویدیوها بدون محدودیت
        </span>
        <span className="text-muted-foreground text-xs leading-4">
          آپلود پست بیشتر و دیده‌شدن بهتر
        </span>
        <span className="text-muted-foreground text-xs leading-4">
          جستجوی پیشرفته برای پیدا کردن افراد جدید
        </span>
        <span className="text-muted-foreground text-xs leading-4">
          ارتباط راحت‌تر با کاربران جدید
        </span>
      </div>
      <Button size={"lg"}>خرید اشتراک</Button>
    </Card>
  );
};

export default PremiumCard;
