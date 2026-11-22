import type { Metadata } from "next";
import Link from "next/link";
import { DisputeLetterForm } from "../../components/DisputeModal";

export const metadata: Metadata = {
  title: "Medical Bill Dispute & Itemized Bill Request Letter",
  alternates: { canonical: "/dispute-letter" },
  description: "Create a private draft requesting an itemized medical bill, a coding review, and an explanation of charges.",
};

export default function DisputeLetterPage() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">Request an itemized bill and dispute a charge</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-slate-700">Use this letter to ask a billing office to explain a charge, review a possible error, or send a detailed statement. You can copy the letter or save it as a PDF from your browser’s print dialog.</p>
      <div className="panel mt-7 p-5 sm:p-8"><DisputeLetterForm /></div>
      <section className="mt-8 max-w-prose">
        <h2 className="text-xl font-semibold">Before sending your letter</h2>
        <p className="mt-2 leading-relaxed text-slate-700">Compare the provider’s statement with your insurer’s explanation of benefits, if you have one. Add the specific line and date you want reviewed. The draft is an informal request to the billing office. Formal appeals and federal disputes have their own steps and deadlines.</p>
        <Link href="/guides/no-surprises-act" className="mt-3 inline-block text-teal-900 underline">Read about surprise billing protections</Link>
      </section>
    </>
  );
}
