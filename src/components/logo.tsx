import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Help 4 Health"
      width={1036}
      height={409}
      priority
      className={`h-9 w-auto sm:h-10 ${className}`}
    />
  );
}
