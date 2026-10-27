import images from "@/content/images.json";

type Manifest = typeof images;
export type ImageKey = keyof Manifest;

type Variant = {
  width: number;
  height: number;
  aspect: number;
  focus: string;
  files: { w: number; h: number; avif: string; webp: string }[];
};

type Entry = { alt: string; variants: Partial<Record<"desktop" | "mobile", Variant>> };

const MOBILE_QUERY = "(max-width: 47.99rem)";

function srcset(v: Variant, format: "avif" | "webp") {
  return v.files.map((f) => `${f[format]} ${f.w}w`).join(", ");
}

/**
 * Art-directed photo from the generated manifest (scripts/images.mjs).
 * Below 768px it uses the mobile crop when one exists, or the mobile crop of `mobileImage`.
 * The wrapper controls size; the image always covers it.
 */
export function Photo({
  image,
  mobileImage,
  sizes,
  mobileSizes = "100vw",
  priority = false,
  alt,
  className = "",
  imgClassName = "",
}: {
  image: ImageKey;
  mobileImage?: ImageKey;
  sizes: string;
  mobileSizes?: string;
  priority?: boolean;
  alt?: string;
  className?: string;
  imgClassName?: string;
}) {
  const entry = images[image] as Entry;
  const desktop = entry.variants.desktop ?? entry.variants.mobile!;
  const mobileEntry = mobileImage ? (images[mobileImage] as Entry) : entry;
  const mobile = mobileEntry.variants.mobile;
  const fallback = desktop.files[Math.min(1, desktop.files.length - 1)];

  return (
    <picture className={className}>
      {mobile && (
        <>
          <source media={MOBILE_QUERY} type="image/avif" srcSet={srcset(mobile, "avif")} sizes={mobileSizes} />
          <source media={MOBILE_QUERY} type="image/webp" srcSet={srcset(mobile, "webp")} sizes={mobileSizes} />
        </>
      )}
      <source type="image/avif" srcSet={srcset(desktop, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(desktop, "webp")} sizes={sizes} />
      <img
        src={fallback.webp}
        width={fallback.w}
        height={fallback.h}
        alt={alt ?? entry.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className={`block h-full w-full object-cover ${imgClassName}`}
        style={{ objectPosition: desktop.focus }}
      />
    </picture>
  );
}
