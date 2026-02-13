"use client";

import { format } from "date-fns-jalali";
import * as React from "react";
import { faIR } from "react-day-picker/persian";

import { Button } from "@/ui/button";
import { Field, FieldLabel } from "@/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

import { Calendar } from "./calendar";

export function DatePickerSimple() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date">Date of birth</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal"
          >
            {date ? format(date, "yyyy/MM/dd") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            dir="rtl"
            locale={faIR}
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
