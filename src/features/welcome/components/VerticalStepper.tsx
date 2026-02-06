"use client";

import { motion } from "framer-motion";

type VerticalStepperProps = {
  steps: string[];
};

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <motion.div
      className="flex flex-col gap-1.25"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <motion.div
            key={index}
            className="relative flex gap-4"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="flex size-8 items-center justify-center rounded-full border border-neutral-400 text-sm font-medium text-neutral-400">
                {index + 1}
              </div>

              {!isLast && <span className="mt-2 h-5 w-px bg-neutral-400" />}
            </div>

            <p className="text-lg leading-7 text-white">{step}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
