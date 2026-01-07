"use client";

import { Button } from "@/ui/button";

export default function OtpStep({
  phone,
  onEditPhone,
}: {
  phone: string;
  onEditPhone: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        کد تایید به شماره {phone} ارسال شد
        <button
          type="button"
          onClick={onEditPhone}
          className="text-primary mr-2"
        >
          ویرایش
        </button>
      </p>

      {/* OTP input بعداً */}
      <Button>تایید</Button>
    </div>
  );
}
