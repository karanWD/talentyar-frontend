"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/ui/drawer";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";

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
};

export function DrawerSelect<T extends string>({
  value,
  onChange,
  options,
  error,
  placeholder = "انتخاب کنید",
  title = "انتخاب گزینه",
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
          onClick={() => setOpen(true)}
          className="cursor-pointer"
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

          <div className="px-4 pb-6">
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
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-1"
                >
                  <RadioGroupItem value={option.value} />
                  <span>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
