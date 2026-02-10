"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/ui/button";

import { login, sendOtp } from "../api";

import OtpMaskedInput from "./OtpMaskedInput";
import ResendTimer from "./ResendTimer";

export default function OtpStep({
  phone,
  onEditPhone,
}: {
  phone: string;
  onEditPhone: () => void;
}) {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) =>
      login({ phone, otp }),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      toast.success("ورود با موفقیت انجام شد");

      if (data.first_user) {
        router.push("/onboarding");
      } else {
        router.push("/");
      }
    },

    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        richColors: true,
      });
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => sendOtp({ phone }),

    onSuccess: () => {
      toast.success("کد تایید مجدداً ارسال شد", {
        position: "top-center",
        richColors: true,
      });
    },

    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });

  return (
    <div className="flex h-full flex-1 flex-col gap-8 pb-7">
      <div className="flex flex-col gap-4">
        <p className="text-foreground font-bold">تایید شماره همراه</p>

        <p className="text-muted-foreground text-sm">
          کد تایید برای شماره {phone} پیامک شد
          <Button onClick={onEditPhone} variant="link" className="px-2">
            ویرایش
          </Button>
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <label className="text-sm font-medium">کد تایید</label>
        <OtpMaskedInput
          value={otp}
          onChange={setOtp}
          onComplete={(code) => {
            loginMutation.mutate({ phone, otp: code });
          }}
        />
        <ResendTimer onResend={() => resendMutation.mutate()} />
      </div>

      <Button
        size="lg"
        disabled={otp.length !== 4 || loginMutation.isPending}
        onClick={() => loginMutation.mutate({ phone, otp })}
      >
        {loginMutation.isPending ? "در حال بررسی..." : "ثبت"}
      </Button>
    </div>
  );
}
