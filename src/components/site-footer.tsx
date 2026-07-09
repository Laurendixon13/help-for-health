import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    heading: "Help 4 Health",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/donate", label: "Donate" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { href: "/sign-up", label: "Volunteer" },
      { href: "/start-a-chapter", label: "Start a chapter" },
      { href: "/chapters", label: "Chapter directory" },
      { href: "/joy-visits", label: "Joy Visits" },
      { href: "/dashboard", label: "Student dashboard" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="page-container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-xs leading-5 text-muted">
            A student-led movement bringing comfort, joy, and hope to children
            in hospitals.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-bold uppercase tracking-wide text-navy">
              {col.heading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={`${col.heading}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="page-container flex flex-col gap-2 py-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Help 4 Health. A student-led
            organization.
          </p>
          <p>Made with 💚 by students.</p>
        </div>
      </div>
    </footer>
  );
}
