"use client";
import { Button } from "@/ui/button";

import { VerticalStepper } from "./components/VerticalStepper";

const steps = [
  "از مهارتات فیلم‌برداری کن",
  "توی تلنت‌یار آپلودشون کن",
  "و استعدادت و به همه نشون بده",
];

export default function Welcome() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between bg-[url('/images/welcome.jpg')] bg-cover bg-center px-4 py-7">
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/90"></div>

      <p className="font-display relative z-10 text-center text-[42px] text-white">
        TALENTYAR
      </p>

      <section className="flex flex-col gap-9">
        <h1 className="relative z-10 text-4xl font-bold text-white">
          به تلنت‌یار
          <br />
          خوش آمدید
        </h1>

        <p className="relative z-10 text-lg leading-6 text-white">
          اینجا جاییه که فوتبال حرف اول را میزنه
        </p>

        <VerticalStepper steps={steps} />
      </section>

      <Button className="relative z-10 rounded-full" variant="default">
        شروع
      </Button>
    </main>
  );
}
