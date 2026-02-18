"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ResendTimer({
  seconds = 60,
  onResend,
}: {
  seconds?: number;
  onResend: () => void;
}) {
  const [time, setTime] = useState(seconds);
  const minutes = Math.floor(time / 60);
  const secs = time % 60;

  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  if (time === 0) {
    return (
      <Button
        onClick={() => {
          setTime(seconds);
          onResend();
        }}
        variant={"ghost"}
        className="text-muted-foreground mx-auto w-fit"
      >
        <RefreshCcw />
        ارسال مجدد کد
      </Button>
    );
  }

  return (
    <p className="text-muted-foreground py-3 text-center text-sm">
      {minutes}:{secs.toString().padStart(2, "0")} مانده تا دریافت مجدد کد
    </p>
  );
}
