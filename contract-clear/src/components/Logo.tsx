import Link from "next/link";
import { assetPath } from "@/lib/app-url";

type LogoProps = {
  className?: string;
  linked?: boolean;
  /** Nav bar — compact but readable wordmark */
  variant?: "nav" | "footer" | "default";
};

const variantClass = {
  nav: "h-32 sm:h-40 md:h-44 w-auto min-w-[240px] max-w-[min(640px,92vw)]",
  footer: "h-44 sm:h-52 md:h-56 w-auto min-w-[280px] max-w-[min(720px,95vw)]",
  default: "h-32 w-auto",
};

export function Logo({ className, linked = true, variant = "default" }: LogoProps) {
  const sizeClass = className ?? variantClass[variant];
  const image = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={assetPath("/logo.png")}
      alt="Pinnacle Contract Analyzer"
      className={`block object-contain object-left bg-transparent ${sizeClass}`}
      draggable={false}
    />
  );

  if (!linked) {
    return <span className="inline-block shrink-0 bg-transparent">{image}</span>;
  }

  return (
    <Link href="/" className="inline-block shrink-0 bg-transparent">
      {image}
    </Link>
  );
}
