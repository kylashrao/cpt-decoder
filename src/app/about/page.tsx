import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage } from "../../components/TrustPage";
import { source } from "../../lib/cpt";

export const metadata: Metadata = {
  title: "About CPT Decoder and our Medicare methodology",
  description: "Learn how CPT Decoder uses CMS RVU26A data to make US medical bills and Medicare physician fee estimates easier to understand.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <TrustPage title="About CPT Decoder" intro="We built CPT Decoder to make US medical bills easier to read and to give patients a public benchmark for professional charges they want to understand.">
      <section>
        <h2>Why we use a public benchmark</h2>
        <p>An itemized bill can show codes and sticker prices without explaining what a service means, how a payer calculated a balance, or why multiple entities billed for one encounter. We explain common procedure codes in plain English and give readers a way to compare an eligible clinician line with an estimate based on public Medicare data.</p>
      </section>
      <section>
        <h2>Where the numbers come from</h2>
        <p>Our estimates use the January 2026 CMS Physician Fee Schedule release, RVU26A. We import work, practice expense, and malpractice relative value units and the geographic adjustment factors. We select the practice expense value for the care setting, multiply each component by its corresponding locality factor, and apply $33.4009, the 2026 conversion factor for clinicians who are outside the qualifying APM participant group.</p>
        <p>The national benchmark uses geographic factors of 1.000. For an eligible service, our 80/20 illustration assumes covered Original Medicare Part B, standard coinsurance, a met deductible, and acceptance of assignment. Codes and settings that lack applicable pricing display an unavailable estimate. <a href={source}>CMS January 2026 data and documentation</a></p>
      </section>
      <section>
        <h2>How we write and correct guides</h2>
        <p>We use CMS, Medicare, and other primary sources to explain billing terms and procedures. Guide examples use illustrative amounts unless they explicitly identify an official figure. The sources at the end of each guide let readers check the underlying rules. Guidelines and fee schedules can change, so use the service date and the applicable payer’s instructions when checking your own bill.</p>
        <p>If you find an outdated rule or a mismatch between our estimate and the source file, tell us which page, code, locality, and care setting you used. Include the source you compared against and leave out patient identifiers. <Link href="/contact">Contact and corrections</Link></p>
      </section>
      <section>
        <h2>Scope and independence</h2>
        <p>CPT Decoder is an independent educational resource. Medicare benchmarks here cover the clinician service, and a hospital may bill its facility charge separately. We encourage readers to verify actual coverage and balances with their provider or insurer. <Link href="/medical-disclaimer">Read the medical and billing disclaimer</Link></p>
      </section>
    </TrustPage>
  );
}
