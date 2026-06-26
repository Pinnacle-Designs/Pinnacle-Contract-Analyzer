import Link from "next/link";
import { assetPath } from "@/lib/app-url";

type LogoProps = {
  className?: string;
  linked?: boolean;
  /** Marketing header — large readable wordmark */
  variant?: "nav" | "footer" | "compact" | "default";
};

/** Full wordmark on dark card (marketing). */
const LOGO_MARK = "/logo.png";
/** Transparent background — readable on dark app/preview nav bars. */
const LOGO_TRANSPARENT = "/logo-original.png";

const variantClass = {
  nav: "h-20 sm:h-28 md:h-36 lg:h-40 w-auto max-w-[min(100%,560px)] sm:max-w-[min(560px,88vw)] object-contain object-center sm:object-left",
  footer:
    "h-32 sm:h-40 md:h-48 lg:h-52 w-auto max-w-[min(100%,680px)] object-contain object-center sm:object-left",
  /** App / preview toolbars — small inline logo (~44px tall) */
  compact: "h-11 w-auto max-w-[11rem] object-contain object-left",
  default: "h-24 sm:h-32 w-auto max-w-full object-contain",
};

const variantSrc: Record<NonNullable<LogoProps["variant"]>, string> = {
  nav: LOGO_MARK,
  footer: LOGO_MARK,
  compact: LOGO_TRANSPARENT,
  default: LOGO_MARK,
};

export function Logo({ className, linked = true, variant = "default" }: LogoProps) {
  const sizeClass = className ?? variantClass[variant];
  const image = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={assetPath(variantSrc[variant])}
      alt="Pinnacle Contract Analyzer"
      width={560}
      height={280}
      className={`block bg-transparent ${sizeClass}`}
      draggable={false}
    />
  );

  if (!linked) {
    return <span className="inline-flex shrink-0 max-w-full items-center bg-transparent">{image}</span>;
  }

  return (
    <Link href="/" className="inline-flex shrink-0 max-w-full items-center bg-transparent">
      {image}
    </Link>
  );
}
