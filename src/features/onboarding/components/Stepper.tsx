import { Check } from "lucide-react";
import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  name: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
  orientation?: "horizontal" | "vertical";
  rtl?: boolean;
}

export function Stepper({
  steps,
  currentStep,
  completedSteps = [],
  orientation = "horizontal",
  rtl = true,
}: StepperProps) {
  const sortedSteps = [...steps].sort((a, b) => a.id - b.id);

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <div
        className={cn(
          "flex items-center",
          orientation === "vertical" && "h-auto flex-col space-y-4",
        )}
      >
        {sortedSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id && !isCompleted;

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "mt-4 flex flex-col items-center",
                  orientation === "vertical" && "flex-row",
                )}
              >
                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 outline transition-all duration-300",
                    isCompleted &&
                      "bg-primary outline-primary text-primary-foreground border-transparent",
                    isCurrent &&
                      "bg-primary outline-primary border-background text-primary-foreground",
                    isUpcoming &&
                      "bg-background outline-muted-foreground text-muted-foreground border-transparent",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>

                <p
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCompleted || isCurrent
                      ? "text-primary"
                      : "text-muted-foreground",
                    orientation === "vertical" && "mt-0 mr-2",
                  )}
                >
                  {step.name}
                </p>
              </div>

              {index < sortedSteps.length - 1 && (
                <Separator
                  className={cn(
                    "h-px flex-1 rounded-full",
                    (isCompleted && isCurrent) || isCompleted
                      ? "bg-primary"
                      : "bg-muted-foreground",
                    orientation === "vertical" && "mx-0 my-2 h-8 w-0.5",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
