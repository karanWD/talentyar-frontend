"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  invalid?: boolean;
};

export default function OtpMaskedInput({
  value,
  onChange,
  onComplete,
  length = 4,
  disabled,
  invalid,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (
      value.length === length &&
      prevLengthRef.current !== length &&
      !disabled
    ) {
      onComplete?.(value);
    }

    prevLengthRef.current = value.length;
  }, [value, length, onComplete, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, length);
    onChange(onlyDigits);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "relative flex h-12 w-full items-center rounded-full border px-3 transition-colors",
        invalid
          ? "border-destructive focus-within:ring-destructive focus-within:ring-2"
          : "border-input focus-within:ring-ring focus-within:ring-2",
        disabled && "opacity-50",
      )}
    >
      <Input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-invalid={invalid}
        autoFocus
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
