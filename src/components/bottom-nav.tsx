"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/opportunities", label: "Opportunities", icon: "search" },
  { href: "/dashboard/hours", label: "Hours", icon: "clock" },
  { href: "/dashboard/community", label: "Community", icon: "users" },
  { href: "/dashboard/profile", label: "Profile", icon: "user" },
];

function NavIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active ? "#0d9488" : "#94a3b8";

  if (icon === "home") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill={active ? color : "none"} stroke={color} strokeWidth="2">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="3" width="8" height="10" rx="1.5" />
        <rect x="13" y="3" width="8" height="6" rx="1.5" />
        <rect x="3" y="15" width="8" height="6" rx="1.5" />
        <rect x="13" y="11" width="8" height="10" rx="1.5" />
      </svg>
    );
  }
  if (icon === "search") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "clock") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "users") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2">
        <path d="M16 20v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1" strokeLinecap="round" />
        <circle cx="9" cy="7" r="3" />
        <path d="M22 20v-1a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0116 0" strokeLinecap="round" />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-white">
      <ul className="page-container grid grid-cols-6 py-2">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[9px] font-medium sm:text-[10px] ${
                  active ? "text-teal" : "text-muted"
                }`}
              >
                <NavIcon icon={item.icon} active={active} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
