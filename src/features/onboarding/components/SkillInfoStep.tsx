"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { DrawerSelect } from "@/ui/drawer-select";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import {
  footOptions,
  positionOptions,
  skillLevelOptions,
  activityHistoryOptions,
} from "../constants/onboarding-constants";

type FormValues = {
  foot: string;
  position: string;
  skillLevel: string;
  activityHistory: "yes" | "no";
  teamName?: string;
  favoriteIranTeam?: string;
  favoriteForeignTeam?: string;
  favoriteNumber?: number;
  aboutMe?: string;
};

export default function SpecializedInfoStep({
  onBack,
}: {
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const activityHistory = watch("activityHistory");

  const onSubmit = (data: FormValues) => {
    console.log("Specialized Info:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-1 flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold">اطلاعات تخصصی</h2>
        <p className="text-muted-foreground text-xs">
          اطلاعات تخصصی شما برای مربیان و کارشناسان مفید خواهد بود{" "}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">پای تخصصی</label>

        <DrawerSelect
          value={watch("foot")}
          onChange={(value) =>
            setValue("foot", value, { shouldValidate: true })
          }
          title="انتخاب پای تخصصی"
          placeholder="انتخاب پای تخصصی"
          options={footOptions}
        />

        {errors.foot && (
          <p className="text-destructive text-xs">این فیلد الزامی است</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">پست تخصصی</label>

        <DrawerSelect
          value={watch("position")}
          onChange={(value) =>
            setValue("position", value, { shouldValidate: true })
          }
          title="انتخاب پست تخصصی"
          placeholder="انتخاب پست تخصصی"
          options={positionOptions}
        />

        {errors.position && (
          <p className="text-destructive text-xs">این فیلد الزامی است</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">میزان مهارت</label>

        <DrawerSelect
          value={watch("skillLevel")}
          onChange={(value) =>
            setValue("skillLevel", value, { shouldValidate: true })
          }
          title="انتخاب سطح مهارت"
          placeholder="انتخاب سطح مهارت"
          options={skillLevelOptions}
        />

        {errors.skillLevel && (
          <p className="text-destructive text-xs">این فیلد الزامی است</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          سابقه فعالیت در تیم یا باشگاه
        </label>

        <DrawerSelect
          value={activityHistory}
          onChange={(value: "yes" | "no") =>
            setValue("activityHistory", value, { shouldValidate: true })
          }
          title="سابقه فعالیت"
          placeholder="انتخاب کنید"
          options={activityHistoryOptions}
        />
      </div>

      {activityHistory === "yes" && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">نام تیم یا باشگاه</label>

          <Input
            {...register("teamName", {
              required: "نام تیم الزامی است",
            })}
            aria-invalid={!!errors?.teamName}
            placeholder="اسم تیم یا باشگاه را بنویسید"
          />

          {errors.teamName && (
            <p className="text-destructive text-xs">
              {errors.teamName.message}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">تیم مورد علاقه ایرانی</label>
        <Input
          {...register("favoriteIranTeam")}
          aria-invalid={!!errors?.favoriteIranTeam}
          placeholder="اسم باشگاه را بنویسید"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">تیم مورد علاقه خارجی</label>
        <Input
          {...register("favoriteForeignTeam")}
          placeholder="اسم باشگاه را بنویسید"
          aria-invalid={!!errors?.favoriteForeignTeam}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">شماره پیراهن مورد علاقه</label>

        <Input
          type="number"
          inputMode="numeric"
          {...register("favoriteNumber", {
            valueAsNumber: true,
            min: { value: 1, message: "شماره معتبر وارد کنید" },
            max: { value: 99, message: "شماره معتبر وارد کنید" },
          })}
          aria-invalid={!!errors?.favoriteNumber}
          placeholder="عدد وارد شود"
        />

        {errors.favoriteNumber && (
          <p className="text-destructive text-xs">
            {errors.favoriteNumber.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">درباره من</label>

        <Textarea
          aria-invalid={!!errors?.aboutMe}
          rows={5}
          {...register("aboutMe")}
          placeholder="درباره خود یک متن کوتاه بنویسید"
        />
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
          ثبت
        </Button>
      </div>
    </form>
  );
}
