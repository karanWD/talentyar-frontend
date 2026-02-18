"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option<T extends string> = {
  label: string;
  value: T;
};

type DrawerSelectProps<T extends string> = {
  value?: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  error?: boolean;
  placeholder?: string;
  title?: string;
  disabled?: boolean;
};

export function DrawerSelect<T extends string>({
  value,
  onChange,
  options,
  error,
  placeholder = "انتخاب کنید",
  title = "انتخاب گزینه",
  disabled = false,
}: DrawerSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <>
      <InputGroup>
        <InputGroupInput
          readOnly
          placeholder={placeholder}
          value={selectedOption?.label ?? ""}
          onClick={() => !disabled && setOpen(true)}
          className={`cursor-pointer ${disabled ? "cursor-default opacity-50" : ""}`}
          aria-invalid={error}
        />
        <InputGroupAddon align="inline-end">
          <ChevronDown />
        </InputGroupAddon>
      </InputGroup>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="mx-auto max-w-125">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>

          <div className="no-scrollbar overflow-y-auto px-4 pb-6">
            <RadioGroup
              value={value}
              onValueChange={(val) => {
                onChange(val as T);
                setOpen(false);
              }}
              className="flex flex-col gap-3"
              dir="rtl"
            >
              {options.map((option) => (
                <Field orientation="horizontal" key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={option.label}
                    disabled={disabled}
                  />
                  <FieldLabel htmlFor={option.label} className="font-normal">
                    {option.label}
                  </FieldLabel>
                </Field>
              ))}
            </RadioGroup>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
