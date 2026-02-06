"use client";

import { useState } from "react";

import PersonalInfoStep from "./components/PersonalInfoStep";
import SkillInfoStep from "./components/SkillInfoStep";
import { Step, Stepper } from "./components/Stepper";
import UserInfoStep from "./components/UserInfoStep";

const steps: Step[] = [
  { id: 1, name: "مشخصات کاربر" },
  { id: 2, name: "اطلاعات شخصی" },
  { id: 3, name: "اطلاعات تخصصی" },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const newCompleted = completedSteps.filter(
        (step) => step !== currentStep - 1,
      );
      setCompletedSteps(newCompleted);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserInfoStep onNext={handleNext} />;
      case 2:
        return <PersonalInfoStep onNext={handleNext} onBack={handlePrev} />;
      case 3:
        return <SkillInfoStep onBack={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-4 pt-5 pb-7">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      {getStepContent()}
    </main>
  );
};

export default Onboarding;
