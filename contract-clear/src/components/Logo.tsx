import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <Link href="/" className="inline-block shrink-0">
      <Image
        src="/logo.png"
        alt="Pinnacle Contract Analyzer"
        width={280}
        height={112}
        className={className}
        priority
      />
    </Link>
  );
}
