/* eslint-disable @next/next/no-img-element */
/** Photo with graceful placeholder when no image has been uploaded yet. */
export default function Img({
  src,
  alt = "",
  className = "",
}: {
  src?: string | null;
  alt?: string;
  className?: string;
}) {
  if (!src) return <div className={`ph ${className}`} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
}
