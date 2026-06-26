import Link from "next/link";

type PageHeaderProps = {
  title: string;
  backHref?: string;
  rightIcon?: "heart";
};

export function PageHeader({
  title,
  backHref = "/",
  rightIcon,
}: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-white">
      <div className="page-container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            aria-label="Go back"
            className="rounded-lg p-1 text-navy hover:bg-surface"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-navy">{title}</h1>
        </div>
        {rightIcon === "heart" && (
          <div className="text-coral">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </header>
  );
}
