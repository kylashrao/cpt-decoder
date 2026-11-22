import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "../../../components/AdSlot";
import { siteOrigin } from "../../../lib/site";
import { PriceCalculator } from "../../../components/PriceCalculator";
import { codes, cptPath, cptSlug, source, type CptCode } from "../../../lib/cpt";

const categoryNotes: Record<string, string> = {
  "Office visits": "The code can reflect how complex the clinician’s decisions were or how much qualifying time the clinician spent on the visit date.",
  "Emergency care": "An emergency department bill may include separate lines for professional care, the hospital, and tests.",
  "Hospital visits": "Look for whether this line describes the first evaluation or follow-up care during a hospital stay.",
  "Preventive care": "Check whether the bill shows a routine physical, a Medicare wellness visit, or a separate visit for a specific problem.",
  "Lab tests": "The lab that tests a sample may bill separately from the clinician or facility that collected it.",
  "Imaging": "Creating the images and interpreting them can be billed together or as separate components.",
  "Cardiology": "Check whether the line represents recording, interpretation, or a combined service.",
  "Endoscopy": "The procedure report can help distinguish an examination from tissue sampling or removal.",
  "Surgery": "The surgeon’s line may appear separately from anesthesia, hospital, or implant charges.",
  "Maternity": "Check which prenatal, delivery, and postpartum services the line includes.",
  "Behavioral health": "An evaluation and a psychotherapy session are different services. For therapy, check the documented session time.",
  "Rehabilitation": "Check the documented therapy minutes and billed units, especially when several treatments happened in one session.",
};

type CodePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return codes.map((item) => ({ slug: cptSlug(item) }));
}

async function getCode(params: CodePageProps["params"]) {
  const { slug } = await params;
  const item = codes.find((entry) => cptSlug(entry) === slug);
  if (!item) notFound();
  return item;
}

function pageDescription(item: CptCode) {
  return `Understand CPT ${item.code}, ${item.description.toLowerCase()}, and check billing details and 2026 Medicare physician fee estimates.`;
}

export async function generateMetadata({ params }: CodePageProps): Promise<Metadata> {
  const item = await getCode(params);
  const title = `CPT ${item.code} — ${item.description}`;
  const description = pageDescription(item);
  return { title, description, alternates: { canonical: cptPath(item) }, openGraph: { title, description } };
}

export default async function CptPage({ params }: CodePageProps) {
  const item = await getCode(params);
  const related = codes.filter((entry) => entry.code !== item.code && entry.category === item.category).slice(0, 4);
  const faqSection = {
    "@type": "FAQPage",
    mainEntity: item.faqs.map(({ question, answer }) => ({
      "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "MedicalWebPage",
      url: new URL(cptPath(item), siteOrigin).href,
      name: `CPT ${item.code} — ${item.description}`,
      description: pageDescription(item),
      about: { "@type": "MedicalEntity", name: item.description, code: { "@type": "MedicalCode", code: item.code, codingSystem: "CPT" } },
      citation: source,
    }, faqSection],
  };

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }} />
      <header>
        <Link href="/" className="text-sm font-semibold text-teal-800 underline">Browse CPT codes</Link>
        <p className="mt-5 text-sm font-semibold text-teal-800">CPT {item.code} · {item.category}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{item.description}</h1>
      </header>
      <PriceCalculator code={item.code} rvus={{
        workRvu: item.workRvu,
        mpRvu: item.mpRvu,
        facilityPeRvu: item.facilityAvailable ? item.facilityPeRvu : null,
        nonFacilityPeRvu: item.nonFacilityAvailable ? item.nonFacilityPeRvu : null,
      }} />
      <section className="panel p-6">
        <h2 className="text-xl font-semibold">What this service means</h2>
        <p className="mt-3 text-slate-700">On an itemized bill or explanation of benefits, CPT {item.code} describes {item.description.charAt(0).toLowerCase() + item.description.slice(1)}.</p>
        <p className="mt-2 text-slate-700">{categoryNotes[item.category]}</p>
        <h3 className="mt-5 font-semibold">What to check on your bill</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-700">
          {item.billingPitfalls.map((pitfall) => <li key={pitfall}>{pitfall}</li>)}
        </ul>
      </section>
      <section className="panel p-6">
        <h2 className="text-xl font-semibold">Modifiers to check</h2>
        <dl className="mt-3 space-y-3 text-slate-700">
          <div><dt className="font-semibold">−25 · Separate evaluation or management visit</dt>
            <dd>When a visit and procedure appear on the same date, ask which evaluation was significant and separately documented. Modifier 25 applies to the evaluation and management line.</dd></div>
          <div><dt className="font-semibold">−59 · Distinct procedure</dt>
            <dd>When two procedures usually billed together appear separately, ask what made them distinct, such as different sites or encounters. This modifier applies to procedures and requires supporting documentation.</dd></div>
        </dl>
        <a className="mt-4 inline-block text-sm text-teal-900 underline" href="https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-faq-library">CMS coding guidance</a>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common questions about CPT {item.code}</h2>
        <dl className="mt-3 grid gap-3">
          {item.faqs.map(({ question, answer }) => <div className="panel p-4" key={question}>
            <dt className="font-semibold">{question}</dt><dd className="mt-1 text-slate-700">{answer}</dd>
          </div>)}
        </dl>
      </section>
      <AdSlot />
      {related.length > 0 && <section>
        <h2 className="text-xl font-semibold">Related CPT codes</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {related.map((entry) => <li key={entry.code}><Link className="text-teal-900 underline" href={cptPath(entry)}>{entry.code} · {entry.description}</Link></li>)}
        </ul>
      </section>}
      <p className="text-sm text-slate-600">Rate data from the <a href={source} className="text-teal-900 underline">CMS January 2026 release (RVU26A)</a>.</p>
    </article>
  );
}
