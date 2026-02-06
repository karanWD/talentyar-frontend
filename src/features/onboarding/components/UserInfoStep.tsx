"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
};

export default function UserInfoStep({ onNext }: { onNext: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    console.log("User Info:", data);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex h-full flex-1 flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold">مشخصات کاربر</h2>
        <p className="text-muted-foreground text-xs">
          جهت ساخت حساب کاربری فرم مشخصات خود را تکمیل کنید.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">نام</label>
        <Input
          {...register("firstName", {
            required: "نام الزامی است",
          })}
          aria-invalid={!!errors.firstName}
        />
        {errors.firstName && (
          <p className="text-destructive text-xs">{errors.firstName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">نام خانوادگی</label>
        <Input
          {...register("lastName", {
            required: "نام خانوادگی الزامی است",
          })}
          aria-invalid={!!errors.lastName}
        />
        {errors.lastName && (
          <p className="text-destructive text-xs">{errors.lastName.message}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label className="text-sm font-medium">نام کاربری</label>
        <Input
          dir="ltr"
          {...register("username", {
            required: "نام کاربری الزامی است",
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "نام کاربری باید فقط شامل حروف انگلیسی، عدد یا _ باشد",
            },
          })}
          placeholder="نام کاربری انگلیسی"
          aria-invalid={!!errors.username}
        />
        {errors.username && (
          <p className="text-destructive text-xs">{errors.username.message}</p>
        )}
      </div>

      <Button size="lg" type="submit" disabled={isSubmitting}>
        ثبت و ادامه
      </Button>
    </form>
  );
}
