export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="20" fill="#1e3a5f" />
        <path
          d="M12 24c2-6 6-10 8-10s6 4 8 10"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 14c-1.5 0-3 1.5-3 3.5 0 2.5 3 5.5 3 5.5s3-3 3-5.5C23 15.5 21.5 14 20 14z"
          fill="#e85d4c"
        />
      </svg>
      <div className="leading-tight">
        <p className="text-[10px] font-bold tracking-[0.2em] text-navy">HELP</p>
        <p className="text-[10px] font-bold tracking-[0.2em] text-navy">
          4 HEALTH
        </p>
      </div>
    </div>
  );
}
