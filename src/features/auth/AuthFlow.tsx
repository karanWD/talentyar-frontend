"use client";

import Image from "next/image";
import { useState } from "react";

import OtpStep from "./components/OtpStep";
import PhoneStep from "./components/PhoneStep";

export default function AuthFlow() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");

  return (
    <main className="flex min-h-dvh flex-col gap-11 px-5 pt-13">
      <div className="flex justify-center">
        <Image
          alt="logo-talentyar"
          src={"/images/logo.svg"}
          width={84}
          height={84}
        />
      </div>

      {step === "phone" && (
        <PhoneStep
          onSuccess={(phone) => {
            setPhone(phone);
            setStep("otp");
          }}
        />
      )}

      {step === "otp" && (
        <OtpStep phone={phone} onEditPhone={() => setStep("phone")} />
      )}
    </main>
  );
}
