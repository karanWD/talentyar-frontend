"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
};

export default function OtpMaskedInput({
  value,
  onChange,
  length = 4,
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, length);
    onChange(onlyDigits);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "border-input bg-background relative flex h-12 w-full items-center rounded-full border px-3",
        "focus-within:ring-ring focus-within:ring-2",
        disabled && "opacity-50",
      )}
    >
      <Input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="absolute inset-0 h-full w-full bg-transparent text-transparent caret-transparent outline-none"
      />

      {/* Mask */}
      <div className="flex w-full justify-center gap-2" dir="ltr">
        {Array.from({ length }).map((_, index) => {
          const char = value[index];

          return (
            <div
              key={index}
              className={cn(
                "flex h-full w-2 items-center justify-center text-lg font-bold",
                char ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {char ?? "–"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
