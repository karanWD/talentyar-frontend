"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { setToken } from "@/core/auth/token";

import { login, sendOtp } from "../api";

import OtpMaskedInput from "./OtpMaskedInput";
import ResendTimer from "./ResendTimer";

type OtpFormValues = {
  otp: string;
};

export default function OtpStep({
  phone,
  onEditPhone,
}: {
  phone: string;
  onEditPhone: () => void;
}) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OtpFormValues>({
    defaultValues: { otp: "" },
  });

  const loginMutation = useMutation({
    mutationFn: ({ otp }: OtpFormValues) => login({ phone, otp }),

    onSuccess: (data) => {
      setToken(data.token);

      toast.success("ورود با موفقیت انجام شد", {
        position: "top-center",
        richColors: true,
      });

      router.push(data.first_user ? "/onboarding" : "/");
    },

    onError: (error) => {
      setError("otp", {
        type: "server",
        message: error?.message || "کد وارد شده صحیح نیست",
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
      toast.error(error.message, {
        position: "top-center",
        richColors: true,
      });
    },
  });

  const onSubmit = (data: OtpFormValues) => {
    loginMutation.mutate(data);
  };

  const handleComplete = useCallback(
    (code: string) => {
      loginMutation.mutate({ otp: code });
    },
    [loginMutation],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-1 flex-col gap-8 pb-7"
    >
      <div className="flex flex-col gap-4">
        <p className="text-foreground font-bold">تایید شماره همراه</p>

        <p className="text-muted-foreground text-sm">
          کد تایید برای شماره {phone} پیامک شد
          <Button
            type="button"
            onClick={onEditPhone}
            variant="link"
            className="px-2"
          >
            ویرایش
          </Button>
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <Field data-invalid={!!errors.otp}>
          <FieldLabel>کد تایید</FieldLabel>

          <Controller
            name="otp"
            control={control}
            rules={{
              required: "کد تایید الزامی است",
              minLength: {
                value: 4,
                message: "کد تایید کامل نیست",
              },
            }}
            render={({ field }) => (
              <OtpMaskedInput
                value={field.value}
                invalid={!!errors.otp}
                onChange={(val) => {
                  field.onChange(val);
                  if (errors.otp) clearErrors("otp");
                }}
                onComplete={handleComplete}
                disabled={loginMutation.isPending}
              />
            )}
          />

          {errors.otp && (
            <FieldDescription className="text-destructive">
              {errors.otp.message}
            </FieldDescription>
          )}
        </Field>

        <ResendTimer onResend={() => resendMutation.mutate()} />
      </div>

      <Button type="submit" size="lg" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "در حال بررسی..." : "ثبت"}
      </Button>
    </form>
  );
}
