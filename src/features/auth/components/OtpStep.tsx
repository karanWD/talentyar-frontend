"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      // TODO:
      // save token
      // redirect based on is_new_user
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => sendOtp({ phone }),
  });

  return (
    <div className="flex h-full flex-1 flex-col gap-8 pb-7">
      <div className="flex flex-col gap-4">
        <p className="text-foreground font-bold">تایید شماره همراه</p>
        <p className="text-muted-foreground text-sm">
          کد تایید برای شماره {phone} پیامک شد
          <Button onClick={onEditPhone} variant={"link"} className="px-2">
            ویرایش
          </Button>
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <label className="text-sm font-medium">کد تایید</label>
        <OtpMaskedInput value={otp} onChange={setOtp} />
        <ResendTimer onResend={() => resendMutation.mutate()} />
      </div>

      <Button
        size="lg"
        disabled={otp.length !== 4 || loginMutation.isPending}
        onClick={() => loginMutation.mutate({ phone, otp })}
      >
        ثبت
      </Button>
    </div>
  );
}
