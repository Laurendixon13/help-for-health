import Link from "next/link";
import { Logo } from "./logo";
import { AuthControls } from "./auth-controls";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="page-container flex items-center justify-between py-3">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <AuthControls />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
