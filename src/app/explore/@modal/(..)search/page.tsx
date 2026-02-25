"use client";

import { useRouter } from "next/navigation";

import Search from "@/features/search/Search";

export default function SearchModalPage() {
  const router = useRouter();
  return (
    <div className="bg-background fixed inset-0 z-50">
      <Search onClose={() => router.back()} />
    </div>
  );
}
