"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useDebounce } from "@/hooks/useDebounce";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { Button } from "@/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Spinner } from "@/ui/spinner";

import { checkUsername } from "../api";
import { UserInfoType } from "../types";

export default function UserInfoStep({ onNext }: { onNext: () => void }) {
  const { profileDraft, updateDraft } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoType>({
    mode: "onChange",
    defaultValues: {
      first_name: profileDraft?.first_name,
      last_name: profileDraft?.last_name,
      username: profileDraft?.username,
    },
  });

  const username = useWatch({
    control,
    name: "username",
  });
  const debouncedUsername = useDebounce(username, 500);

  const { mutate, data, isPending } = useMutation({
    mutationFn: ({
      username,
      signal,
    }: {
      username: string;
      signal?: AbortSignal;
    }) => checkUsername({ username }, signal),
    onSuccess: (res) => {
      if (!res.data?.available) {
        setError("username", {
          type: "manual",
          message: "این نام کاربری قبلاً استفاده شده",
        });
      } else {
        clearErrors("username");
      }
    },
  });

  useEffect(() => {
    if (
      !debouncedUsername ||
      debouncedUsername.length < 3 ||
      !!errors?.username
    )
      return;

    mutate({ username: debouncedUsername });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsername]);

  const onSubmit = (data: UserInfoType) => {
    updateDraft(data);
    onNext();
  };

  const isAvailable =
    data?.data?.available && !errors.username && debouncedUsername?.length >= 3;

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

      <Field data-invalid={!!errors.first_name}>
        <FieldLabel htmlFor="first_name">نام</FieldLabel>
        <Input
          id="first_name"
          {...register("first_name", {
            required: "نام الزامی است",
          })}
          aria-invalid={!!errors.first_name}
        />
        {errors.first_name && (
          <FieldDescription className="text-destructive">
            {errors.first_name.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.last_name}>
        <FieldLabel htmlFor="last_name">نام خانوادگی</FieldLabel>
        <Input
          id="last_name"
          {...register("last_name", {
            required: "نام خانوادگی الزامی است",
          })}
          aria-invalid={!!errors.last_name}
        />
        {errors.last_name && (
          <FieldDescription className="text-destructive">
            {errors.last_name.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.username} className="flex-1">
        <FieldLabel htmlFor="username">نام کاربری</FieldLabel>
        <Input
          id="username"
          dir="ltr"
          {...register("username", {
            required: "نام کاربری الزامی است",
            minLength: {
              value: 3,
              message: "نام کاربری باید حداقل 3 کاراکتر باشد",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "نام کاربری باید فقط شامل حروف انگلیسی، عدد یا _ باشد",
            },
          })}
          placeholder="نام کاربری انگلیسی"
          aria-invalid={!!errors.username}
        />
        <FieldDescription className={errors.username ? "text-destructive" : ""}>
          {errors.username && errors.username.message}
          {isPending && <Spinner />}
          {isAvailable && !isPending && "نام کاربری در دسترس است."}
        </FieldDescription>
      </Field>

      <Button
        size="lg"
        type="submit"
        disabled={isSubmitting || isPending || !isAvailable}
      >
        ثبت و ادامه
      </Button>
    </form>
  );
}
