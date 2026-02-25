"use client";

import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  onClose?: () => void;
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  avatar_url?: string;
};

export default function Search({ onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<User[]>([]);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/explore");
    }
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // 🔥 mock api call
    const timer = setTimeout(() => {
      const fakeData = [
        {
          id: 1,
          first_name: "محمد",
          last_name: "سلیمی",
          full_name: "محمد سلیمی",
          username: "mohamad",
          avatar_url: "test-avatar.jpg",
        },
        {
          id: 2,
          first_name: "کارن",
          last_name: "شمس",
          full_name: "کارن شمس",
          username: "karan_shams",
          avatar_url: "test-avatar.jpg",
        },
        {
          id: 3,
          first_name: "سینا",
          last_name: "حسینی",
          full_name: "سینا حسینی",
          username: "sina.h",
          avatar_url: "test-avatar.jpg",
        },
      ];

      const filtered = fakeData.filter((item) =>
        item.full_name.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );

      setResults(filtered);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  return (
    <div className="bg-background mx-auto flex min-h-dvh max-w-125 flex-col gap-2 p-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <InputGroup autoFocus>
            <InputGroupInput
              id="inline-start-input"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو ..."
              type="search"
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pt-7">
        {isSearching && (
          <p className="text-muted-foreground text-sm">در حال جستجو...</p>
        )}

        {!isSearching && debouncedQuery && results.length === 0 && (
          <p className="text-muted-foreground text-sm">نتیجه‌ای پیدا نشد</p>
        )}

        {!isSearching &&
          results.map((item) => (
            <>
              <Link
                key={item.username}
                href={`/profile/${item.username}`}
                className="border-border flex border-b"
              >
                <div className="flex items-center gap-2 pb-3">
                  <Avatar size="lg">
                    <AvatarImage src={item.avatar_url} alt={item.username} />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {item.username}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {item.first_name} {item.last_name}
                    </span>
                  </div>
                </div>
              </Link>
            </>
          ))}
      </div>

      <div className="flex w-full items-center">
        <Button variant={"secondary"} onClick={handleClose} className="w-full">
          بستن
        </Button>
      </div>
    </div>
  );
}
