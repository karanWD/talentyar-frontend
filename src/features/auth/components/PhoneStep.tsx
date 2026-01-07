"use client";

import { useMutation } from "@tanstack/react-query";
import { PhoneCallIcon } from "lucide-react";
import { useForm } from "react-hook-form";

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
  const form = useForm<FormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (_, variables) => {
      onSuccess(variables.phone);
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => mutate(data))}
      className="flex h-full flex-1 flex-col gap-4 pb-7"
    >
      <div className="flex flex-col gap-4">
        <p className="text-foreground leading-7 font-bold">
          ورود یا ثبت نام در تلنت‌یار
        </p>
        <p className="text-muted-foreground text-sm leading-5 font-medium">
          یک قدم تا دیده شدن فاصله داری،وارد شو و استعداد فوتبالیت رو نشون
          بده،برای ورود شماره همراه خود را وارد کنید
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="" className="text-sm leading-5 font-medium">
          شماره همراه
        </label>
        <InputGroup>
          <InputGroupInput type="number" placeholder="09*********" />
          <InputGroupAddon>
            <PhoneCallIcon />
          </InputGroupAddon>
        </InputGroup>
        {/* <input
          {...form.register("phone", { required: true })}
          placeholder="شماره موبایل"
          className="h-12 rounded-md border px-3"
        /> */}
      </div>

      <Button size={"lg"} type="submit" disabled={isPending}>
        ورود
      </Button>
    </form>
  );
}
