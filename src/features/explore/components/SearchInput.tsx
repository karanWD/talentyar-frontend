"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchInput() {
  const router = useRouter();

  const handleOpenModal = () => {
    router.push("search");
  };
  return (
    <>
      <div>
        <div onClick={handleOpenModal}>
          <InputGroup aria-readonly={true}>
            <InputGroupInput id="inline-start-input" placeholder="جستجو..." />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </>
  );
}
