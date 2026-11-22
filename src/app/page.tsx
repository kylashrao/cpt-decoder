import type { Metadata } from "next";
import Link from "next/link";
import { guidePath, topGuides } from "../lib/guides";
import { AdSlot } from "../components/AdSlot";
import { CodeSearch } from "../components/CodeSearch";
import { codes, cptPath, source } from "../lib/cpt";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const searchTerms: Record<string, string> = {
  "99213": "doctor appointment checkup cold cough sick visit",
  "99214": "doctor appointment follow up high blood pressure diabetes checkup",
  "99203": "first appointment new doctor",
  "99284": "er emergency room urgent chest pain",
  "99285": "er emergency room emergency evaluation",
  "71046": "chest xray cough lung shortness of breath",
  "71045": "chest xray cough portable lung",
  "70551": "head MRI headache brain scan",
  "70450": "head CT headache head injury brain scan",
  "73721": "knee pain hip pain ankle pain joint MRI",
  "73562": "knee pain knee xray",
  "72148": "lower back pain lumbar MRI",
  "93000": "chest pain palpitations ekg electrocardiogram",
  "93306": "echocardiogram heart murmur echo",
  "45378": "colonoscopy colon screening bowel",
  "45380": "colonoscopy bowel biopsy",
  "45385": "colonoscopy bowel polyp",
  "27447": "knee pain knee surgery joint replacement",
  "90834": "anxiety depression counseling talk therapy",
  "90837": "anxiety depression counseling talk therapy",
  "97110": "physical therapy rehab exercises stiffness",
  "85025": "cbc anemia blood test",
  "80053": "cmp bloodwork blood test",
  "83036": "diabetes a1c blood sugar",
};
const featured = ["99213", "99214", "99285", "71046", "45378", "90837"];

export default function Home() {
  return (
    <>
      <section className="rounded-3xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 px-6 py-10 sm:p-12">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Understand the charges on your medical bill</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">Look up a CPT code, compare the clinician charge with the 2026 Medicare benchmark, and draft an itemized bill request if something needs a closer look.</p>
        <div className="mt-7 max-w-xl">
          <CodeSearch entries={codes.map((item) => ({
            code: item.code, category: item.category, description: item.description,
            href: cptPath(item), keywords: searchTerms[item.code] ?? "",
          }))} />
        </div>
        <Link className="mt-5 inline-block text-sm font-semibold text-teal-900 underline underline-offset-4" href="/dispute-letter">Draft an itemized bill request</Link>
      </section>
      <section className="mt-12" aria-labelledby="featured">
        <h2 id="featured" className="text-2xl font-semibold tracking-tight">Common CPT lookups</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {codes.filter((item) => featured.includes(item.code)).map((item) => (
            <li key={item.code}>
              <Link href={cptPath(item)} className="panel block h-full p-4 hover:border-teal-600">
                <span className="font-mono font-semibold text-teal-800">{item.code}</span>
                <span className="mt-1 block text-sm font-medium">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <details className="mt-5">
          <summary className="cursor-pointer font-semibold text-teal-900">Browse all {codes.length} CPT codes</summary>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {codes.map((item) => <li key={item.code}><Link className="text-sm text-teal-900 underline" href={cptPath(item)}>{item.code} · {item.description}</Link></li>)}
          </ul>
        </details>
      </section>
      <AdSlot />
      <section className="panel mt-12 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">How the Medicare benchmark works</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-slate-700">Medicare measures the clinician’s work, practice expense, and malpractice cost for each service. It adjusts each component for local costs, then applies the 2026 conversion factor of $33.4009 for nonqualifying APM clinicians. Office and facility settings can have different practice expense values.</p>
        <p className="mt-3 max-w-prose leading-relaxed text-slate-700">For covered Original Medicare Part B care subject to standard coinsurance, the estimate assumes the deductible is met and the provider accepts assignment. A clinician fee is separate from a hospital facility charge. <a className="text-teal-900 underline" href={source}>CMS January 2026 release</a></p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Billing guides</h2>
        <ul className="mt-4 space-y-2">
          {topGuides.map((guide) => <li key={guide.slug}><Link className="text-teal-900 underline" href={guidePath(guide)}>{guide.title}</Link></li>)}
        </ul>
        <Link className="mt-4 inline-block font-semibold text-teal-900 underline" href="/guides">Browse all eight guides</Link>
      </section>
    </>
  );
}
