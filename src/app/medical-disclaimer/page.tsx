import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage } from "../../components/TrustPage";
import { source } from "../../lib/cpt";

export const metadata: Metadata = {
  title: "Medical, legal, and billing disclaimer",
  description: "Understand the limits of CPT Decoder’s educational content, projected Medicare fees, and dispute templates.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <TrustPage title="Medical and billing disclaimer" intro="CPT Decoder provides educational information for US healthcare billing transparency. Its content and tools do not constitute medical or legal advice.">
      <section>
        <h2>Medical decisions and coverage</h2>
        <p>Code descriptions and symptom search help you understand labels on a bill. They cannot diagnose a condition or determine which service you need. For medical decisions, consult a qualified clinician. For claim coverage, coding details, an appeal deadline, or the amount due, contact the provider or insurer using the verified information on your documents.</p>
      </section>
      <section>
        <h2>What the estimate covers</h2>
        <p>We use the 2026 nonqualifying APM Medicare Physician Fee Schedule inputs from CMS RVU26A. An estimate applies to a selected code, locality, and setting and represents a professional service benchmark. Hospital facility charges, payer contracts, additional services, claim edits, modifiers, units, and benefit rules can all change an actual price or balance. Standard Part B coinsurance estimates assume covered care, a met deductible, and acceptance of assignment.</p>
        <p>A difference between a billed charge and the benchmark can prompt a question about that bill. It does not establish an overcharge, violation, or binding price. <a href={source}>CMS RVU26A source release</a> · <Link href="/about">Read our methodology</Link></p>
      </section>
      <section>
        <h2>Disputes and legal rights</h2>
        <p>The letter generator prepares a draft for the billing office. It does not submit an appeal or federal dispute, suspend collection, or extend deadlines. Review the appropriate official procedure, especially if you received an appeal, payment, or collection notice. Ask a qualified legal professional about your specific rights and obligations. <a href="https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights">CMS medical bill rights</a></p>
      </section>
      <section>
        <h2>CPT trademark and affiliation</h2>
        <p>CPT® is a registered trademark of the American Medical Association (AMA). CPT Decoder is independent and is not affiliated with or endorsed by the AMA, CMS, or Medicare. <a href="https://www.ama-assn.org/about/cpt-editorial-panel/faq-editorial-panel-cpt-overview">AMA CPT overview</a></p>
      </section>
    </TrustPage>
  );
}
