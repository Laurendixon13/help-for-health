import Link from "next/link";
import { Logo } from "./logo";
import { AuthControls } from "./auth-controls";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/joy-visits", label: "Joy Visits" },
  { href: "/start-a-chapter", label: "Start a chapter" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="page-container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden flex-1 md:flex md:justify-center">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-navy hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <AuthControls />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
