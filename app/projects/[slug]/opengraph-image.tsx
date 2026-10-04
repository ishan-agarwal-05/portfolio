import { articles } from "@/lib/data";
import { articleCard, ogSize } from "@/lib/og";

export const alt = "An article by Ishan Agarwal";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.filter((c) => c.kind === "project").map((c) => ({ slug: c.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const cs = articles.find((c) => c.slug === params.slug)!;
  return articleCard({
    kind: cs.kind,
    title: cs.title,
    org: cs.org,
    period: cs.period,
    metric: cs.metrics[0],
  });
}
