"use client";

import { Home, User, PlaySquare, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/explore", label: "اکسپلور", icon: PlaySquare },
  { href: "/upload", label: "بارگذاری", icon: Plus },
  { href: "/profile", label: "پروفایل", icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  const showNav = ["/", "/explore", "/profile", "/upload"].includes(
    pathname || "",
  );
  if (!showNav) return null;

  return (
    <nav className="border-border bg-background fixed right-5 bottom-7 left-5 z-50 mx-auto max-w-125 gap-2.5 rounded-2xl border px-3 py-2">
      <ul className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1 text-xs leading-5 transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
