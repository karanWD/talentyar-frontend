"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns-jalali";
import { faIR } from "react-day-picker/persian";
import { useForm, Controller, useWatch } from "react-hook-form";

import { queryKeys } from "@/core/react-query/keys";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { DrawerSelect } from "@/ui/drawer-select";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

import { getProvinces, getCities } from "../api";
import { genderOption } from "../constants/onboarding-constants";
import { PersonalInfoType } from "../types";

export default function PersonalInfoStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { profileDraft, updateDraft } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoType>({
    defaultValues: {
      birth_date: profileDraft?.birth_date,
      province_id: profileDraft?.province_id,
      city_id: profileDraft?.city_id,
      gender: profileDraft?.gender,
      height: profileDraft?.height,
      weight: profileDraft?.weight,
    },
  });

  const provinceId = useWatch({
    control,
    name: "province_id",
  });

  const { data: provincesData } = useQuery({
    queryKey: queryKeys.location.provinces,
    queryFn: () => getProvinces(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: citiesData } = useQuery({
    queryKey: queryKeys.location.cities(provinceId),
    queryFn: () => getCities(+provinceId),
    enabled: !!provinceId,
    staleTime: 10 * 60 * 1000,
  });

  const provinces =
    provincesData?.data?.provinces.map((p) => ({
      label: p.name,
      value: p.id.toString(),
    })) ?? [];

  const cities =
    citiesData?.data?.cities.map((c) => ({
      label: c.name,
      value: c.id.toString(),
    })) ?? [];

  const onSubmit = (data: PersonalInfoType) => {
    updateDraft(data);
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-1 flex-col gap-6"
    >
      <Field data-invalid={!!errors.province_id}>
        <FieldLabel>استان</FieldLabel>
        <Controller
          control={control}
          name="province_id"
          rules={{ required: "استان الزامی است" }}
          render={({ field }) => (
            <DrawerSelect
              {...field}
              options={provinces}
              placeholder="انتخاب استان"
              onChange={(value: string) => {
                field.onChange(value);
                setValue("city_id", "");
              }}
              error={!!errors.province_id}
            />
          )}
        />

        {errors.province_id && (
          <FieldDescription className="text-destructive">
            {errors.province_id.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.city_id}>
        <FieldLabel>شهر</FieldLabel>
        <Controller
          control={control}
          name="city_id"
          rules={{ required: "شهر الزامی است" }}
          render={({ field }) => (
            <DrawerSelect
              {...field}
              options={cities}
              placeholder="انتخاب شهر"
              disabled={!provinceId}
              error={!!errors.city_id}
            />
          )}
        />

        {errors.city_id && (
          <FieldDescription className="text-destructive">
            {errors.city_id.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.gender}>
        <FieldLabel>جنسیت</FieldLabel>
        <Controller
          control={control}
          name="gender"
          rules={{ required: "جنسیت الزامی است" }}
          render={({ field }) => (
            <DrawerSelect
              {...field}
              options={genderOption}
              title="انتخاب جنسیت"
              placeholder="انتخاب جنسیت"
              error={!!errors.gender}
            />
          )}
        />

        {errors.gender && (
          <FieldDescription className="text-destructive">
            {errors.gender.message}
          </FieldDescription>
        )}
      </Field>

      <Field className="mx-auto">
        <FieldLabel htmlFor="date">تاریخ تولد</FieldLabel>
        <Controller
          control={control}
          name={"birth_date"}
          rules={{ required: "تاریخ تولد الزامی است" }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className={`${field.value ? "" : "text-muted-foreground"} justify-start font-normal`}
                  size={"lg"}
                >
                  {field.value
                    ? format(field.value, "yyyy/MM/dd")
                    : "****/**/**"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  dir="rtl"
                  locale={faIR}
                  selected={field.value as Date | undefined}
                  defaultMonth={field.value as Date | undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => field.onChange(date)}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </Field>

      <Field data-invalid={!!errors.weight}>
        <FieldLabel>وزن</FieldLabel>
        <Input
          type="number"
          inputMode="numeric"
          {...register("weight", {
            required: "وزن الزامی است",
            valueAsNumber: true,
            min: { value: 20, message: "وزن معتبر وارد کنید" },
          })}
          aria-invalid={!!errors.weight}
        />
        {errors.weight && (
          <FieldDescription className="text-destructive">
            {errors.weight.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.height} className="flex-1">
        <FieldLabel>قد</FieldLabel>
        <Input
          type="number"
          inputMode="numeric"
          {...register("height", {
            required: "قد الزامی است",
            valueAsNumber: true,
            min: { value: 100, message: "قد معتبر وارد کنید" },
          })}
          aria-invalid={!!errors.height}
        />
        {errors.height && (
          <FieldDescription className="text-destructive">
            {errors.height.message}
          </FieldDescription>
        )}
      </Field>

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
