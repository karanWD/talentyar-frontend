"use client";

import { useMutation } from "@tanstack/react-query";
import { PhoneCallIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";

import { sendOtp } from "../api";

type FormValues = {
  phone: string;
};

export default function PhoneStep({
  onSuccess,
}: {
  onSuccess: (phone: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const sendOtpMutation = useMutation({
    mutationFn: (payload: FormValues) => sendOtp(payload),

    onSuccess: (_, variables) => {
      onSuccess(variables.phone);
    },

    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => sendOtpMutation.mutate(data))}
      className="flex h-full flex-1 flex-col gap-4 pb-7"
    >
      <div className="flex flex-col gap-4">
        <p className="text-foreground leading-7 font-bold">
          ورود یا ثبت نام در تلنت‌یار
        </p>

        <p className="text-muted-foreground text-sm leading-5 font-medium">
          یک قدم تا دیده شدن فاصله داری، وارد شو و استعداد فوتبالیت رو نشون بده،
          برای ورود شماره همراه خود را وارد کنید
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label className="text-sm leading-5 font-medium">شماره همراه</label>

        <InputGroup>
          <InputGroupInput
            type="tel"
            placeholder="*********09"
            {...register("phone", {
              required: "شماره موبایل الزامی است",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل معتبر نیست",
              },
            })}
            aria-invalid={!!errors?.phone}
          />

          <InputGroupAddon>
            <PhoneCallIcon />
          </InputGroupAddon>
        </InputGroup>

        {errors.phone && (
          <p className="text-destructive text-xs">{errors.phone.message}</p>
        )}
      </div>

      <Button size="lg" type="submit" disabled={sendOtpMutation.isPending}>
        {sendOtpMutation.isPending ? "در حال ارسال..." : "ورود"}
      </Button>
    </form>
  );
}
