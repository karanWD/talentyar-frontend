"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useOnboardingStore } from "@/stores/onboarding.store";
import { Button } from "@/ui/button";
import { DrawerSelect } from "@/ui/drawer-select";
import { Field, FieldLabel, FieldDescription } from "@/ui/field";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { postProfile } from "../api";
import {
  footOptions,
  positionOptions,
  skillLevelOptions,
  activityHistoryOptions,
} from "../constants/onboarding-constants";
import { ProfileType, SkillInfoType } from "../types";

export default function SpecializedInfoStep({
  onBack,
}: {
  onBack: () => void;
}) {
  const router = useRouter();
  const { profileDraft, updateDraft, resetDraft } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SkillInfoType>({
    defaultValues: {
      activity_history: profileDraft?.activity_history,
      bio: profileDraft?.bio,
      favorite_foreign_team: profileDraft?.favorite_foreign_team,
      favorite_iranian_team: profileDraft?.favorite_iranian_team,
      foot_specialization: profileDraft?.foot_specialization,
      post_skill: profileDraft?.post_skill,
      shirt_number: profileDraft?.shirt_number,
      skill_level: profileDraft?.skill_level,
      team_name: profileDraft?.team_name,
    },
  });

  const [activity_history, post_skill, foot_specialization, skill_level] =
    useWatch({
      control,
      name: [
        "activity_history",
        "post_skill",
        "foot_specialization",
        "skill_level",
      ],
    });

  const profileMutation = useMutation({
    mutationFn: (payload: ProfileType) => postProfile(payload),

    onSuccess: () => {
      toast.success("پروفایل با موفقیت تکمیل شد.", {
        position: "top-center",
        richColors: true,
      });
      router.replace("/");
    },

    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });

  const onSubmit = async (data: SkillInfoType) => {
    const finalDraft = {
      ...profileDraft,
      ...data,
    };

    updateDraft(data);
    profileMutation.mutate(finalDraft as ProfileType);
    resetDraft();
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

      <Field data-invalid={!!errors.foot_specialization}>
        <FieldLabel htmlFor="foot_specialization">پای تخصصی</FieldLabel>
        <DrawerSelect
          value={foot_specialization}
          onChange={(value) =>
            setValue("foot_specialization", value, { shouldValidate: true })
          }
          title="انتخاب پای تخصصی"
          placeholder="انتخاب پای تخصصی"
          options={footOptions}
        />
        {errors.foot_specialization && (
          <FieldDescription className="text-destructive">
            {errors.foot_specialization.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.post_skill}>
        <FieldLabel htmlFor="post_skill">پست تخصصی</FieldLabel>
        <DrawerSelect
          value={post_skill}
          onChange={(value) =>
            setValue("post_skill", value, { shouldValidate: true })
          }
          title="انتخاب پست تخصصی"
          placeholder="انتخاب پست تخصصی"
          options={positionOptions}
        />
        {errors.post_skill && (
          <FieldDescription className="text-destructive">
            {errors.post_skill.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.skill_level}>
        <FieldLabel htmlFor="skillLevel">میزان مهارت</FieldLabel>
        <DrawerSelect
          value={skill_level}
          onChange={(value) =>
            setValue("skill_level", value, { shouldValidate: true })
          }
          title="انتخاب سطح مهارت"
          placeholder="انتخاب سطح مهارت"
          options={skillLevelOptions}
        />
        {errors.skill_level && (
          <FieldDescription className="text-destructive">
            {errors.skill_level.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.activity_history}>
        <FieldLabel htmlFor="activity_history">
          سابقه فعالیت در تیم یا باشگاه
        </FieldLabel>
        <Controller
          control={control}
          name="activity_history"
          render={({ field }) => (
            <DrawerSelect
              {...field}
              options={activityHistoryOptions}
              error={!!errors.activity_history}
            />
          )}
        />

        {errors.activity_history && (
          <FieldDescription className="text-destructive">
            {errors.activity_history.message}
          </FieldDescription>
        )}
      </Field>

      {activity_history && (
        <Field data-invalid={!!errors.team_name}>
          <FieldLabel htmlFor="team_name">نام تیم یا باشگاه</FieldLabel>
          <Input
            id="team_name"
            {...register("team_name", {
              required: "نام تیم الزامی است",
            })}
            aria-invalid={!!errors?.team_name}
            placeholder="اسم تیم یا باشگاه را بنویسید"
          />
          {errors.team_name && (
            <FieldDescription className="text-destructive">
              {errors.team_name.message}
            </FieldDescription>
          )}
        </Field>
      )}

      <Field data-invalid={!!errors.favorite_iranian_team}>
        <FieldLabel htmlFor="favorite_iranian_team">
          تیم مورد علاقه ایرانی
        </FieldLabel>
        <Input
          id="favorite_iranian_team"
          {...register("favorite_iranian_team")}
          aria-invalid={!!errors?.favorite_iranian_team}
          placeholder="اسم باشگاه را بنویسید"
        />
        {errors.favorite_iranian_team && (
          <FieldDescription className="text-destructive">
            {errors.favorite_iranian_team.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.favorite_foreign_team}>
        <FieldLabel htmlFor="favorite_foreign_team">
          تیم مورد علاقه خارجی
        </FieldLabel>
        <Input
          id="favorite_foreign_team"
          {...register("favorite_foreign_team")}
          aria-invalid={!!errors?.favorite_foreign_team}
          placeholder="اسم باشگاه را بنویسید"
        />
        {errors.favorite_foreign_team && (
          <FieldDescription className="text-destructive">
            {errors.favorite_foreign_team.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.shirt_number}>
        <FieldLabel htmlFor="shirt_number">شماره پیراهن مورد علاقه</FieldLabel>
        <Input
          id="shirt_number"
          type="number"
          inputMode="numeric"
          {...register("shirt_number", {
            valueAsNumber: true,
            min: { value: 1, message: "شماره معتبر وارد کنید" },
            max: { value: 99, message: "شماره معتبر وارد کنید" },
          })}
          aria-invalid={!!errors?.shirt_number}
          placeholder="عدد وارد شود"
        />
        {errors.shirt_number && (
          <FieldDescription className="text-destructive">
            {errors.shirt_number.message}
          </FieldDescription>
        )}
      </Field>

      <Field data-invalid={!!errors.bio}>
        <FieldLabel htmlFor="bio">درباره من</FieldLabel>
        <Textarea
          id="bio"
          aria-invalid={!!errors?.bio}
          rows={5}
          {...register("bio")}
          placeholder="درباره خود یک متن کوتاه بنویسید"
        />
        {errors.bio && (
          <FieldDescription className="text-destructive">
            {errors.bio.message}
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

        <Button
          type="submit"
          className="flex-1"
          disabled={profileMutation.isPending}
        >
          {profileMutation.isPending ? "در حال ارسال" : "ثبت"}
        </Button>
      </div>
    </form>
  );
}
