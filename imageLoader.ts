// Custom next/image loader for static export with a non-root basePath.
// NEXT_PUBLIC_BASEPATH is set to e.g. "/gold-shop" in CI; empty locally.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = process.env.NEXT_PUBLIC_BASEPATH ?? "";
  return `${base}${src}`;
}
