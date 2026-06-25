import Link from "next/link";

type LogoProps = {
  className?: string;
  linked?: boolean;
};

export function Logo({ className = "h-14 w-auto", linked = true }: LogoProps) {
  const image = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logo.png"
      alt="Pinnacle Contract Analyzer"
      className={`block bg-transparent ${className}`}
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
