import type { Metadata } from "next";
import Link from "next/link";
import { guidePath, guides } from "../../lib/guides";

export const metadata: Metadata = {
  title: "Medical billing guides",
  description: "Read eight source-linked guides to itemized bills, insurance EOBs, Medicare coinsurance, and medical billing disputes.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">Medical billing guides</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-slate-700">
        Start with the document in front of you. These guides explain how to check individual charges,
        reconcile them with insurance, and ask for a review when a balance needs an explanation.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link className="panel block h-full p-5 hover:border-teal-700" href={guidePath(guide)}>
              <h2 className="text-lg font-semibold text-teal-900">{guide.title}</h2>
              <p className="mt-2 text-slate-700">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
