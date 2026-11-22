import articles from "../../../../data/guide_articles.json";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "../../../components/AdSlot";
import { guidePath, guides } from "../../../lib/guides";
import { siteName, siteOrigin } from "../../../lib/site";

type GuideProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

async function getGuide(params: GuideProps["params"]) {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  return guide;
}

export async function generateMetadata({ params }: GuideProps): Promise<Metadata> {
  const guide = await getGuide(params);
  const { title, description } = guide;
  return { title, description, alternates: { canonical: guidePath(guide) }, openGraph: { type: "article", title, description, url: guidePath(guide) } };
}

export default async function GuidePage({ params }: GuideProps) {
  const guide = await getGuide(params);
  const sections = articles[guide.slug];
  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: new URL(guidePath(guide), siteOrigin).href,
    author: { "@type": "Organization", name: siteName, url: new URL("/about", siteOrigin).href },
    citation: guide.sources.map(([, url]) => url),
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
      <Link href="/guides" className="text-sm font-semibold text-teal-800 underline">All billing guides</Link>
      <h1 className="mt-5 text-4xl font-bold tracking-tight">{guide.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-700">{guide.description}</p>
      <p className="mt-3 text-sm text-slate-600">By the <Link className="underline" href="/about">{siteName} editorial team</Link></p>
      {sections.map(({ heading, paragraphs }, index) => (
        <section key={heading} className="mt-8">
          {index === 3 && <AdSlot />}
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          {paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-relaxed text-slate-700">{paragraph}</p>)}
        </section>
      ))}
      <section className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-xl font-semibold">Sources</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {guide.sources.map(([label, url]) => <li key={url}><a className="text-teal-900 underline" href={url}>{label}</a></li>)}
        </ul>
      </section>
      <nav aria-label="Related billing resources" className="mt-8 flex flex-wrap gap-3">
        <Link className="primary-action" href="/dispute-letter">Draft a billing letter</Link>
        <Link className="secondary-action" href="/guides">Browse all guides</Link>
        <Link className="secondary-action" href="/contact">Suggest a correction</Link>
      </nav>
    </article>
  );
}
