import Image from "next/image";

// Game icon served straight from Roblox's CDN. `unoptimized` skips Vercel's
// image optimization, since Roblox already serves it at the right size.
export default function GameIcon({
  src,
  name,
  size,
  className = "",
}: {
  src?: string;
  name: string;
  size: number;
  className?: string;
}) {
  const classes = `shrink-0 border border-neutral-800 object-cover ${className}`;

  if (!src) {
    return <div aria-hidden="true" className={`${classes} bg-neutral-900`} />;
  }

  return (
    <Image
      src={src}
      alt={`${name} game icon`}
      width={size}
      height={size}
      unoptimized
      className={classes}
    />
  );
}
