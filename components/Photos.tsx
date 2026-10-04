import Image from "next/image";
import type { Photo } from "@/lib/data";

// Real photos with short captions. "row" scrolls sideways at a fixed height,
// for mixed portrait and landscape shots; "grid" fills the column, for articles.
export default function Photos({
  photos,
  layout = "row",
  className = "",
}: {
  photos: Photo[];
  layout?: "row" | "grid";
  className?: string;
}) {
  if (layout === "grid") {
    return (
      <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
        {photos.map((p) => (
          <figure key={p.src}>
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              sizes="(max-width: 640px) 100vw, 380px"
              className="h-auto w-full border border-line"
            />
            {p.caption && <figcaption className="microlabel mt-2">{p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className={`flex gap-3 overflow-x-auto pb-2 ${className}`}>
      {photos.map((p) => (
        <figure key={p.src} className="shrink-0">
          <Image
            src={p.src}
            alt={p.alt}
            width={p.w}
            height={p.h}
            sizes="(max-width: 640px) 70vw, 360px"
            className="h-56 w-auto border border-line object-cover sm:h-64"
          />
          {p.caption && <figcaption className="microlabel mt-2 w-0 min-w-full">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
