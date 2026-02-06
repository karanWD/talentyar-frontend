"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { DrawerSelect } from "@/ui/drawer-select";
import { Input } from "@/ui/input";

import { genderOption } from "../constants/onboarding-constants";

type FormValues = {
  gender: "male" | "female";
  birthDate: string;
  weight: number;
  height: number;
};

export default function PersonalInfoStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const gender = watch("gender");

  const onSubmit = (data: FormValues) => {
    console.log("Personal Info:", data);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-1 flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold">اطلاعات شخصی</h2>
        <p className="text-muted-foreground text-xs">
          اطلاعات شخصی خود را تکمیل کنید.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">جنسیت</label>

        <DrawerSelect
          {...register("gender", {
            required: "جنسیت الزامی است",
          })}
          value={gender}
          onChange={(value: "male" | "female") =>
            setValue("gender", value, { shouldValidate: true })
          }
          title="انتخاب جنسیت"
          placeholder="انتخاب جنسیت"
          options={genderOption}
          error={!!errors.gender}
        />

        {errors.gender && (
          <p className="text-destructive text-xs">{errors.gender?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">تاریخ تولد</label>
        <Input
          type="date"
          {...register("birthDate", {
            required: "تاریخ تولد الزامی است",
          })}
          aria-invalid={!!errors.birthDate}
        />
        {errors.birthDate && (
          <p className="text-destructive text-xs">{errors.birthDate.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">وزن </label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="بر حسب کیلوگرم"
          {...register("weight", {
            required: "وزن الزامی است",
            valueAsNumber: true,
            min: { value: 20, message: "وزن معتبر وارد کنید" },
          })}
          aria-invalid={!!errors.weight}
        />
        {errors.weight && (
          <p className="text-destructive text-xs">{errors.weight.message}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label className="text-sm font-medium">قد </label>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="بر حسب سانتی‌متر"
          {...register("height", {
            required: "قد الزامی است",
            valueAsNumber: true,
            min: { value: 100, message: "قد معتبر وارد کنید" },
          })}
          aria-invalid={!!errors.height}
        />
        {errors.height && (
          <p className="text-destructive text-xs">{errors.height.message}</p>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          برگشت
        </Button>

        <Button type="submit" className="flex-1">
          ثبت و ادامه
        </Button>
      </div>
    </form>
  );
}
