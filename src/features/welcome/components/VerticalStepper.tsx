type VerticalStepperProps = {
  steps: string[];
};

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="flex flex-col gap-1.25">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="relative flex gap-4">
            <div className="relative flex flex-col items-center">
              <div className="flex size-8 items-center justify-center rounded-full border border-neutral-400 text-sm font-medium text-neutral-400">
                {index + 1}
              </div>

              {!isLast && <span className="mt-2 h-5 w-px bg-neutral-400" />}
            </div>

            <p className="text-lg leading-7 text-white">{step}</p>
          </div>
        );
      })}
    </div>
  );
}
