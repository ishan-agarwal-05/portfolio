import { notFound } from "next/navigation";
import Article from "@/components/article/Article";
import { articlePath, articles } from "@/lib/data";

const pages = articles.filter((c) => c.kind === "project");

export function generateStaticParams() {
  return pages.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = pages.find((c) => c.slug === params.slug);
  if (!cs) return { title: "Not found" };
  const url = articlePath(cs);
  return {
    title: cs.title,
    description: cs.oneLiner,
    alternates: { canonical: url },
    openGraph: {
      title: `${cs.title} · Ishan Agarwal`,
      description: cs.oneLiner,
      url,
      siteName: "Ishan Agarwal",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} · Ishan Agarwal`,
      description: cs.oneLiner,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const cs = pages.find((c) => c.slug === params.slug);
  if (!cs) notFound();
  return <Article cs={cs} />;
}
